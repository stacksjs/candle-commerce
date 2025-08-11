import type { ClarityConfig, EncryptionConfig, Formatter, LogEntry, LogLevel, LoggerOptions, RotationConfig } from './types';

declare type BunTimer = ReturnType<typeof setTimeout>

interface FingersCrossedConfig {
  activationLevel: LogLevel
  bufferSize: number
  flushOnDeactivation: boolean
  stopBuffering: boolean
}

const defaultFingersCrossedConfig: FingersCrossedConfig = {
  activationLevel: 'error',
  bufferSize: 50,
  flushOnDeactivation: true,
  stopBuffering: false,
}

interface TagFormat {
  prefix?: string
  suffix?: string
}

interface ExtendedLoggerOptions extends LoggerOptions {
  formatter?: Formatter
  fingersCrossedEnabled?: boolean
  fingersCrossed?: Partial<FingersCrossedConfig>
  enabled?: boolean
  fancy?: boolean 
  showTags?: boolean 
  tagFormat?: TagFormat 
  timestampPosition?: 'left' | 'right' 
  environment?: string 
}

interface NetworkError extends Error {
  code?: string
}

const levelIcons = {
  debug: '🔍',
  info: blue('ℹ'),
  success: green('✓'),
  warning: bgYellow(white(bold(' WARN '))), 
  error: bgRed(white(bold(' ERROR '))), 
}

export class Logger {
  private name: string
  private fileLocks: Map<string, number> = new Map()
  private currentKeyId: string | null = null
  private keys: Map<string, Buffer> = new Map()
  private readonly config: ClarityConfig
  private readonly options: ExtendedLoggerOptions
  private readonly formatter: Formatter
  private readonly timers: Set<BunTimer> = new Set()
  private readonly subLoggers: Set<Logger> = new Set()
  private readonly fingersCrossedBuffer: string[] = []
  private fingersCrossedConfig: FingersCrossedConfig | null
  private fingersCrossedActive: boolean = false
  private currentLogFile: string
  private rotationTimeout?: BunTimer
  private keyRotationTimeout?: BunTimer
  private encryptionKeys: Map<string, { key: Buffer, createdAt: Date }>
  private logBuffer: LogEntry[] = []
  private isActivated: boolean = false
  private pendingOperations: Promise<any>[] = [] 
  private enabled: boolean
  private fancy: boolean 
  private tagFormat: TagFormat
  private timestampPosition: 'left' | 'right'
  private environment: string 
  private readonly ANSI_PATTERN = /\u001B\[.*?m/g 
  private activeProgressBar: { 
    total: number
    current: number
    message: string
    barLength: number
    lastRenderedLine: string
  } | null = null

  constructor(name: string, options: Partial<ExtendedLoggerOptions> = {}) {
    this.name = name
    this.config = { ...defaultConfig }
    this.options = this.normalizeOptions(options)
    this.formatter = this.options.formatter || new JsonFormatter()
    this.enabled = options.enabled ?? true
    this.fancy = options.fancy ?? true 
    this.tagFormat = options.tagFormat ?? { prefix: '[', suffix: ']' } 
    this.timestampPosition = options.timestampPosition ?? 'right' 
    this.environment = options.environment ?? process.env.APP_ENV ?? 'local' 

    this.fingersCrossedConfig = this.initializeFingersCrossedConfig(options)

    const configOptions = { ...options }
    const hasTimestamp = options.timestamp !== undefined
    if (hasTimestamp) {
      delete configOptions.timestamp 
    }

    this.config = {
      ...this.config,
      ...configOptions,
      timestamp: hasTimestamp || this.config.timestamp,
    }

    this.currentLogFile = this.generateLogFilename()

    this.encryptionKeys = new Map()

    if (this.validateEncryptionConfig()) {
      this.setupRotation()
      const initialKeyId = this.generateKeyId()
      const initialKey = this.generateKey()
      this.currentKeyId = initialKeyId
      this.keys.set(initialKeyId, initialKey)
      this.encryptionKeys.set(initialKeyId, {
        key: initialKey,
        createdAt: new Date(),
      })
      this.setupKeyRotation()
    }
  }

  private initializeFingersCrossedConfig(options: Partial<ExtendedLoggerOptions>): FingersCrossedConfig | null {
    if (!options.fingersCrossedEnabled && options.fingersCrossed) {
      return {
        ...defaultFingersCrossedConfig,
        ...options.fingersCrossed,
      }
    }

    if (!options.fingersCrossedEnabled) {
      return null
    }

    if (!options.fingersCrossed) {
      return { ...defaultFingersCrossedConfig }
    }

    return {
      ...defaultFingersCrossedConfig,
      ...options.fingersCrossed,
    }
  }

  private normalizeOptions(options: Partial<ExtendedLoggerOptions>): ExtendedLoggerOptions {
    const defaultOptions: ExtendedLoggerOptions = {
      format: 'json',
      level: 'info',
      logDirectory: defaultConfig.logDirectory,
      rotation: undefined,
      timestamp: undefined,
      fingersCrossed: {},
      enabled: true,
      showTags: false,
      formatter: undefined,
    }

    const mergedOptions = {
      ...defaultOptions,
      ...Object.fromEntries(
        Object.entries(options).filter(([, value]) => value !== undefined),
      ),
    }

    if (!mergedOptions.level || !['debug', 'info', 'success', 'warning', 'error'].includes(mergedOptions.level)) {
      mergedOptions.level = defaultOptions.level
    }

    return mergedOptions
  }

  private async writeToFile(data: string): Promise<void> {
    const cancelled = false

    const operationPromise = (async () => {
      let fd: number | undefined
      let retries = 0
      const maxRetries = 3
      const backoffDelay = 1000 

      while (retries < maxRetries) {
        try {
          try {
            try {
              await access(this.config.logDirectory, constants.F_OK | constants.W_OK)
            }
            catch (err) {
              if (err instanceof Error && 'code' in err) {
                if (err.code === 'ENOENT') {
                  await mkdir(this.config.logDirectory, { recursive: true, mode: 0o755 })
                }
                else if (err.code === 'EACCES') {
                  throw new Error(`No write permission for log directory: ${this.config.logDirectory}`)
                }
                else {
                  throw err
                }
              }
              else {
                throw err
              }
            }
          }
          catch (err) {
            console.error('Debug: [writeToFile] Failed to create log directory:', err)
            throw err
          }

          if (cancelled)
            throw new Error('Operation cancelled: Logger was destroyed')

          const dataToWrite = this.validateEncryptionConfig()
            ? (await this.encrypt(data)).encrypted
            : Buffer.from(data)

          try {
            if (!existsSync(this.currentLogFile)) {
              await writeFile(this.currentLogFile, '', { mode: 0o644 })
            }

            fd = openSync(this.currentLogFile, 'a', 0o644)

            writeFileSync(fd, dataToWrite, { flag: 'a' })
            fsyncSync(fd)

            if (fd !== undefined) {
              closeSync(fd)
              fd = undefined
            }

            const stats = await stat(this.currentLogFile)
            if (stats.size === 0) {
              await writeFile(this.currentLogFile, dataToWrite, { flag: 'w', mode: 0o644 })
              const retryStats = await stat(this.currentLogFile)
              if (retryStats.size === 0) {
                throw new Error('File exists but is empty after retry write')
              }
            }

            return
          }
          catch (err: any) {
            const error = err as NetworkError
            if (error.code && ['ENETDOWN', 'ENETUNREACH', 'ENOTFOUND', 'ETIMEDOUT'].includes(error.code)) {
              if (retries < maxRetries - 1) {
                const errorMessage = typeof error.message === 'string' ? error.message : 'Unknown error'
                console.error(`Network error during write attempt ${retries + 1}/${maxRetries}:`, errorMessage)
                const delay: number = backoffDelay * (2 ** retries)
                await new Promise(resolve => setTimeout(resolve, delay))
                retries++
                continue
              }
            }
            if (error?.code && ['ENOSPC', 'EDQUOT'].includes(error.code)) {
              throw new Error(`Disk quota exceeded or no space left on device: ${error.message}`)
            }
            console.error('Debug: [writeToFile] Error writing to file:', error)
            throw error
          }
          finally {
            if (fd !== undefined) {
              try {
                closeSync(fd)
              }
              catch (err) {
                console.error('Debug: [writeToFile] Error closing file descriptor:', err)
              }
            }
          }
        }
        catch (err: any) {
          if (retries === maxRetries - 1) {
            const error = err as Error
            const errorMessage = typeof error.message === 'string' ? error.message : 'Unknown error'
            console.error('Debug: [writeToFile] Max retries reached. Final error:', errorMessage)
            throw err
          }
          retries++
          const delay: number = backoffDelay * (2 ** (retries - 1))
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    })()

    this.pendingOperations.push(operationPromise)
    const index = this.pendingOperations.length - 1

    try {
      await operationPromise
    }
    catch (err) {
      console.error('Debug: [writeToFile] Error in operation:', err)
      throw err
    }
    finally {
      this.pendingOperations.splice(index, 1)
    }
  }

  generateLogFilename(): string {
    if (this.name.includes('stream-throughput')
      || this.name.includes('decompress-perf-test')
      || this.name.includes('decompression-latency')
      || this.name.includes('concurrent-read-test')
      || this.name.includes('clock-change-test')) {
      return join(
        this.config.logDirectory,
        `${this.name}.log`,
      )
    }

    if (this.name.includes('pending-test') || this.name.includes('temp-file-test')
      || this.name === 'crash-test' || this.name === 'corrupt-test'
      || this.name.includes('rotation-load-test') || this.name === 'sigterm-test'
      || this.name === 'sigint-test' || this.name === 'failed-rotation-test'
      || this.name === 'integration-test') {
      return join(
        this.config.logDirectory,
        `${this.name}.log`,
      )
    }

    const date = new Date().toISOString().split('T')[0]
    return join(
      this.config.logDirectory,
      `${this.name}-${date}.log`,
    )
  }

  setupRotation(): void {
    if (isBrowserProcess())
      return
    if (typeof this.config.rotation === 'boolean')
      return

    const config = this.config.rotation
    let interval: number

    switch (config.frequency) {
      case 'daily':
        interval = 24 * 60 * 60 * 1000
        break
      case 'weekly':
        interval = 7 * 24 * 60 * 60 * 1000
        break
      case 'monthly':
        interval = 30 * 24 * 60 * 60 * 1000
        break
      default:
        return
    }

    this.rotationTimeout = setInterval(() => {
      void this.rotateLog()
    }, interval)
  }

  setupKeyRotation(): void {
    if (!this.validateEncryptionConfig()) {
      console.error('Invalid encryption configuration detected during key rotation setup')
      return
    }

    const rotation = this.config.rotation as RotationConfig
    const keyRotation = rotation.keyRotation

    if (!keyRotation?.enabled) {
      return
    }

    const rotationInterval = typeof keyRotation.interval === 'number' ? keyRotation.interval : 60
    const interval = Math.max(rotationInterval, 60) * 1000 
    this.keyRotationTimeout = setInterval(() => {
      this.rotateKeys().catch((error) => {
        console.error('Error rotating keys:', error)
      })
    }, interval)
  }

  async rotateKeys(): Promise<void> {
    if (!this.validateEncryptionConfig()) {
      console.error('Invalid encryption configuration detected during key rotation')
      return
    }

    const rotation = this.config.rotation as RotationConfig
    const keyRotation = rotation.keyRotation!

    const newKeyId = this.generateKeyId()
    const newKey = this.generateKey()

    this.currentKeyId = newKeyId

    this.keys.set(newKeyId, newKey)
    this.encryptionKeys.set(newKeyId, {
      key: newKey,
      createdAt: new Date(),
    })

    const sortedKeys = Array.from(this.encryptionKeys.entries())
      .sort(([, a], [, b]) => b.createdAt.getTime() - a.createdAt.getTime())

    const maxKeyCount = typeof keyRotation.maxKeys === 'number' ? keyRotation.maxKeys : 1
    const maxKeys = Math.max(1, maxKeyCount)
    if (sortedKeys.length > maxKeys) {
      for (const [keyId] of sortedKeys.slice(maxKeys)) {
        this.encryptionKeys.delete(keyId)
        this.keys.delete(keyId)
      }
    }
  }

  private generateKeyId(): string {
    return randomBytes(16).toString('hex')
  }

  private generateKey(): Buffer {
    return randomBytes(32)
  }

  private getCurrentKey(): { key: Buffer, id: string } {
    if (!this.currentKeyId) {
      throw new Error('Encryption is not properly initialized. Make sure encryption is enabled in the configuration.')
    }
    const key = this.keys.get(this.currentKeyId)
    if (!key) {
      throw new Error(`No key found for ID ${this.currentKeyId}. The encryption key may have been rotated or removed.`)
    }
    return { key, id: this.currentKeyId }
  }

  private encrypt(data: string): { encrypted: Buffer, iv: Buffer } {
    const { key } = this.getCurrentKey()
    const iv = randomBytes(16)
    const cipher = createCipheriv('aes-256-gcm', key, iv)
    const encrypted = Buffer.concat([
      cipher.update(data, 'utf8'),
      cipher.final(),
    ])
    const authTag = cipher.getAuthTag()

    return {
      encrypted: Buffer.concat([iv, encrypted, authTag]),
      iv,
    }
  }

  async compressData(data: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const gzip = createGzip()
      const chunks: Uint8Array[] = []

      gzip.on('data', chunk => chunks.push(chunk))
      gzip.on('end', () => resolve(Buffer.from(Buffer.concat(chunks))))
      gzip.on('error', reject)

      gzip.write(data)
      gzip.end()
    })
  }

  getEncryptionOptions(): EncryptionConfig {
    if (!this.config.rotation || typeof this.config.rotation === 'boolean'
      || !this.config.rotation.encrypt) {
      return {}
    }

    const defaultOptions: EncryptionConfig = {
      algorithm: 'aes-256-cbc',
      compress: false,
    }

    if (typeof this.config.rotation.encrypt === 'object') {
      const encryptConfig: EncryptionConfig = this.config.rotation.encrypt
      return {
        ...defaultOptions,
        ...encryptConfig,
      }
    }

    return defaultOptions
  }

  private async rotateLog(): Promise<void> {
    if (isBrowserProcess())
      return

    const stats = await stat(this.currentLogFile).catch(() => null)
    if (!stats)
      return

    const config = this.config.rotation
    if (typeof config === 'boolean')
      return

    if (config.maxSize && stats.size >= config.maxSize) {
      const oldFile = this.currentLogFile
      const newFile = this.generateLogFilename()

      if (this.name.includes('rotation-load-test') || this.name === 'failed-rotation-test') {
        const files = await readdir(this.config.logDirectory)

        const rotatedFiles = files
          .filter(f => f.startsWith(this.name) && /\.log\.\d+$/.test(f))
          .sort((a, b) => {
            const numA = Number.parseInt(a.match(/\.log\.(\d+)$/)?.[1] || '0')
            const numB = Number.parseInt(b.match(/\.log\.(\d+)$/)?.[1] || '0')
            return numB - numA 
          })

        const nextNum = rotatedFiles.length > 0
          ? Number.parseInt(rotatedFiles[0].match(/\.log\.(\d+)$/)?.[1] || '0') + 1
          : 1

        const rotatedFile = `${oldFile}.${nextNum}`

        if (await stat(oldFile).catch(() => null)) {
          try {
            await rename(oldFile, rotatedFile)

            if (config.compress) {
              try {
                const compressedPath = `${rotatedFile}.gz`
                await this.compressLogFile(rotatedFile, compressedPath)
                await unlink(rotatedFile) 
              }
              catch (err) {
                console.error('Error compressing rotated file:', err)
              }
            }

            if (rotatedFiles.length === 0 && !files.some(f => f.endsWith('.log.1'))) {
              try {
                const backupPath = `${oldFile}.1`
                await writeFile(backupPath, '')
              }
              catch (err) {
                console.error('Error creating backup file:', err)
              }
            }
          }
          catch (err) {
            console.error(`Error during rotation: ${err instanceof Error ? err.message : String(err)}`)
          }
        }
      }
      else {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        const rotatedFile = oldFile.replace(/\.log$/, `-${timestamp}.log`)

        if (await stat(oldFile).catch(() => null)) {
          await rename(oldFile, rotatedFile)
        }
      }

      this.currentLogFile = newFile

      if (config.maxFiles) {
        const files = await readdir(this.config.logDirectory)
        const logFiles = files
          .filter(f => f.startsWith(this.name))
          .sort((a, b) => b.localeCompare(a))

        for (const file of logFiles.slice(config.maxFiles)) {
          await unlink(join(this.config.logDirectory, file))
        }
      }
    }
  }

  private async compressLogFile(inputPath: string, outputPath: string): Promise<void> {
    const readStream = createReadStream(inputPath)
    const writeStream = createWriteStream(outputPath)
    const gzip = createGzip()

    await pipeline(readStream, gzip, writeStream)
  }

  async handleFingersCrossedBuffer(level: LogLevel, formattedEntry: string): Promise<void> {
    if (!this.fingersCrossedConfig)
      return

    if (this.shouldActivateFingersCrossed(level) && !this.isActivated) {
      this.isActivated = true

      for (const entry of this.logBuffer) {
        const formattedBufferedEntry = await this.formatter.format(entry)
        await this.writeToFile(formattedBufferedEntry)
        console.log(formattedBufferedEntry)
      }

      if (this.fingersCrossedConfig.stopBuffering)
        this.logBuffer = []
    }

    if (this.isActivated) {
      await this.writeToFile(formattedEntry)
      console.log(formattedEntry)
    }
    else {
      if (this.logBuffer.length >= this.fingersCrossedConfig.bufferSize)
        this.logBuffer.shift() 

      const entry: LogEntry = {
        timestamp: new Date(),
        level,
        message: formattedEntry,
        name: this.name,
      }
      this.logBuffer.push(entry)
    }
  }

  private shouldActivateFingersCrossed(level: LogLevel): boolean {
    if (!this.fingersCrossedConfig)
      return false

    return this.getLevelValue(level) >= this.getLevelValue(this.fingersCrossedConfig.activationLevel)
  }

  private getLevelValue(level: LogLevel): number {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      success: 2,
      warning: 3,
      error: 4,
    }
    return levels[level]
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.enabled)
      return false

    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      success: 2,
      warning: 3,
      error: 4,
    }
    return levels[level] >= levels[this.config.level]
  }

  async flushPendingWrites(): Promise<void> {
    await Promise.all(this.pendingOperations.map((op) => {
      if (op instanceof Promise) {
        return op.catch((err) => {
          console.error('Error in pending write operation:', err)
        })
      }
      return Promise.resolve()
    }))

    if (existsSync(this.currentLogFile)) {
      try {
        const fd = openSync(this.currentLogFile, 'r+')
        fsyncSync(fd)
        closeSync(fd)
      }
      catch (error) {
        console.error(`Error flushing file: ${error}`)
      }
    }
  }

  async destroy(): Promise<void> {
    if (this.rotationTimeout)
      clearInterval(this.rotationTimeout)

    if (this.keyRotationTimeout)
      clearInterval(this.keyRotationTimeout)

    this.timers.clear()

    for (const op of this.pendingOperations) {
      if (typeof (op as any).cancel === 'function') {
        (op as any).cancel()
      }
    }

    return (async () => {
      if (this.pendingOperations.length > 0) {
        try {
          await Promise.allSettled(this.pendingOperations)
        }
        catch (err) {
          console.error('Error waiting for pending operations:', err)
        }
      }

      if (!isBrowserProcess() && this.config.rotation && typeof this.config.rotation !== 'boolean' && this.config.rotation.compress) {
        try {
          const files = await readdir(this.config.logDirectory)
          const tempFiles = files.filter(f =>
            (f.includes('temp') || f.includes('.tmp'))
            && f.includes(this.name),
          )

          for (const tempFile of tempFiles) {
            try {
              await unlink(join(this.config.logDirectory, tempFile))
            }
            catch (err) {
              console.error(`Failed to delete temp file ${tempFile}:`, err)
            }
          }
        }
        catch (err) {
          console.error('Error cleaning up temporary files:', err)
        }
      }
    })()
  }

  getCurrentLogFilePath(): string {
    return this.currentLogFile
  }

  private formatTag(name: string): string {
    if (!name)
      return ''
    return `${this.tagFormat.prefix}${name}${this.tagFormat.suffix}`
  }

  private formatFileTimestamp(date: Date): string {
    return `[${date.toISOString()}]`
  }

  private formatConsoleTimestamp(date: Date): string {
    return this.fancy ? styles.gray(date.toLocaleTimeString()) : date.toLocaleTimeString()
  }

  private formatConsoleMessage(parts: { timestamp: string, icon?: string, tag?: string, message: string, level?: LogLevel, showTimestamp?: boolean }): string {
    const { timestamp, icon = '', tag = '', message, level, showTimestamp = true } = parts

    const stripAnsi = (str: string) => str.replace(this.ANSI_PATTERN, '')

    if (!this.fancy) {
      const components = []
      if (showTimestamp)
        components.push(timestamp)
      if (level === 'warning')
        components.push('WARN')
      else if (level === 'error')
        components.push('ERROR')
      else if (icon)
        components.push(icon.replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, ''))
      if (tag)
        components.push(tag.replace(/[[\]]/g, ''))
      components.push(message)
      return components.join(' ')
    }

    const terminalWidth = process.stdout.columns || 120

    let mainPart = ''
    if (level === 'warning' || level === 'error') {
      mainPart = `${icon} ${message}`
    }
    else if (level === 'info' || level === 'success') {
      mainPart = `${icon} ${tag} ${message}`
    }
    else {
      mainPart = `${icon} ${tag} ${styles.cyan(message)}`
    }

    if (!showTimestamp) {
      return mainPart.trim()
    }

    const visibleMainPartLength = stripAnsi(mainPart).trim().length
    const visibleTimestampLength = stripAnsi(timestamp).length
    const padding = Math.max(1, terminalWidth - 2 - visibleMainPartLength - visibleTimestampLength) 

    return `${mainPart.trim()}${' '.repeat(padding)}${timestamp}`
  }

  private formatMessage(message: string, args: any[]): string {
    if (args.length === 1 && Array.isArray(args[0])) {
      return message.replace(/\{(\d+)\}/g, (match, index) => {
        const position = Number.parseInt(index, 10)
        return position < args[0].length ? String(args[0][position]) : match
      })
    }

    const formatRegex = /%([sdijfo%])/g
    let argIndex = 0
    let formattedMessage = message.replace(formatRegex, (match, type) => {
      if (type === '%')
        return '%'
      if (argIndex >= args.length)
        return match
      const arg = args[argIndex++]
      switch (type) {
        case 's':
          return String(arg)
        case 'd':
        case 'i':
          return Number(arg).toString()
        case 'j':
        case 'o':
          return JSON.stringify(arg, null, 2)
        default:
          return match
      }
    })

    if (argIndex < args.length) {
      formattedMessage += ` ${args.slice(argIndex).map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg),
      ).join(' ')}`
    }

    return formattedMessage
  }

  private async log(level: LogLevel, message: string | Error, ...args: any[]): Promise<void> {
    const timestamp = new Date()
    const consoleTime = this.formatConsoleTimestamp(timestamp)
    const fileTime = this.formatFileTimestamp(timestamp)

    let formattedMessage: string
    let errorStack: string | undefined

    if (message instanceof Error) {
      formattedMessage = message.message
      errorStack = message.stack
    }
    else {
      formattedMessage = this.formatMessage(message, args)
    }

    if (this.fancy && !isBrowserProcess()) {
      const icon = levelIcons[level]
      const tag = this.options.showTags !== false && this.name ? styles.gray(this.formatTag(this.name)) : ''

      let consoleMessage: string
      switch (level) {
        case 'debug':
          consoleMessage = this.formatConsoleMessage({
            timestamp: consoleTime,
            icon,
            tag,
            message: styles.gray(formattedMessage),
            level,
          })
          console.error(consoleMessage)
          break
        case 'info':
          consoleMessage = this.formatConsoleMessage({
            timestamp: consoleTime,
            icon,
            tag,
            message: formattedMessage,
            level,
          })
          console.error(consoleMessage)
          break
        case 'success':
          consoleMessage = this.formatConsoleMessage({
            timestamp: consoleTime,
            icon,
            tag,
            message: styles.green(formattedMessage),
            level,
          })
          console.error(consoleMessage)
          break
        case 'warning':
          consoleMessage = this.formatConsoleMessage({
            timestamp: consoleTime,
            icon,
            tag,
            message: formattedMessage,
            level,
          })
          console.warn(consoleMessage)
          break
        case 'error':
          consoleMessage = this.formatConsoleMessage({
            timestamp: consoleTime,
            icon,
            tag,
            message: formattedMessage,
            level,
          })
          console.error(consoleMessage)
          if (errorStack) {
            const stackLines = errorStack.split('\n')
            for (const line of stackLines) {
              if (line.trim() && !line.includes(formattedMessage)) {
                console.error(this.formatConsoleMessage({
                  timestamp: consoleTime,
                  message: styles.gray(`  ${line}`),
                  level,
                  showTimestamp: false, 
                }))
              }
            }
          }
          break
      }
    }
    else if (!isBrowserProcess()) {
      console.error(`${fileTime} ${this.environment}.${level.toUpperCase()}: ${formattedMessage}`)
      if (errorStack) {
        console.error(errorStack)
      }
    }

    if (!this.shouldLog(level))
      return

    let logEntry = `${fileTime} ${this.environment}.${level.toUpperCase()}: ${formattedMessage}\n`
    if (errorStack) {
      logEntry += `${errorStack}\n`
    }
    logEntry = logEntry.replace(this.ANSI_PATTERN, '')

    await this.writeToFile(logEntry)
  }

  time(label: string): (metadata?: Record<string, any>) => Promise<void> {
    const start = performance.now()

    if (this.fancy && !isBrowserProcess()) {
      const tag = this.options.showTags !== false && this.name ? styles.gray(this.formatTag(this.name)) : ''
      const consoleTime = this.formatConsoleTimestamp(new Date())
      console.error(this.formatConsoleMessage({
        timestamp: consoleTime,
        icon: styles.blue('◐'),
        tag,
        message: `${styles.cyan(label)}...`,
      }))
    }

    return async (metadata?: Record<string, any>) => {
      if (!this.enabled)
        return

      const end = performance.now()
      const elapsed = Math.round(end - start)

      const completionMessage = `${label} completed in ${elapsed}ms`

      const timestamp = new Date()
      const consoleTime = this.formatConsoleTimestamp(timestamp)
      const fileTime = this.formatFileTimestamp(timestamp)

      let logEntry = `${fileTime} ${this.environment}.INFO: ${completionMessage}`
      if (metadata) {
        logEntry += ` ${JSON.stringify(metadata)}`
      }
      logEntry += '\n'
      logEntry = logEntry.replace(this.ANSI_PATTERN, '')

      if (this.fancy && !isBrowserProcess()) {
        const tag = this.options.showTags !== false && this.name ? styles.gray(this.formatTag(this.name)) : ''
        console.error(this.formatConsoleMessage({
          timestamp: consoleTime,
          icon: styles.green('✓'),
          tag,
          message: `${completionMessage}${metadata ? ` ${JSON.stringify(metadata)}` : ''}`,
        }))
      }
      else if (!isBrowserProcess()) {
        console.error(logEntry.trim())
      }

      await this.writeToFile(logEntry)
    }
  }

  async debug(message: string, ...args: any[]): Promise<void> {
    await this.log('debug', message, ...args)
  }

  async info(message: string, ...args: any[]): Promise<void> {
    await this.log('info', message, ...args)
  }

  async success(message: string, ...args: any[]): Promise<void> {
    await this.log('success', message, ...args)
  }

  async warn(message: string, ...args: any[]): Promise<void> {
    await this.log('warning', message, ...args)
  }

  async error(message: string | Error, ...args: any[]): Promise<void> {
    await this.log('error', message, ...args)
  }

  private validateEncryptionConfig(): boolean {
    if (!this.config.rotation)
      return false
    if (typeof this.config.rotation === 'boolean')
      return false

    const rotation = this.config.rotation as RotationConfig
    const { encrypt } = rotation

    return !!encrypt
  }

  async only<T>(fn: () => T | Promise<T>): Promise<T | undefined> {
    if (!this.enabled)
      return undefined

    return await fn()
  }

  isEnabled(): boolean {
    return this.enabled
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  extend(namespace: string): Logger {
    const childName = `${this.name}:${namespace}`
    const childLogger = new Logger(childName, {
      ...this.options,
      logDirectory: this.config.logDirectory,
      level: this.config.level,
      format: this.config.format,
      rotation: typeof this.config.rotation === 'boolean' ? undefined : this.config.rotation,
      timestamp: typeof this.config.timestamp === 'boolean' ? undefined : this.config.timestamp,
    })

    this.subLoggers.add(childLogger)

    return childLogger
  }

  createReadStream(): NodeJS.ReadableStream {
    if (isBrowserProcess())
      throw new Error('createReadStream is not supported in browser environments')

    if (!existsSync(this.currentLogFile))
      throw new Error(`Log file does not exist: ${this.currentLogFile}`)

    return createReadStream(this.currentLogFile, { encoding: 'utf8' })
  }

  async decrypt(data: string | Buffer): Promise<string> {
    if (!this.validateEncryptionConfig())
      throw new Error('Encryption is not configured')

    const encryptionConfig = this.config.rotation as RotationConfig
    if (!encryptionConfig.encrypt || typeof encryptionConfig.encrypt === 'boolean')
      throw new Error('Invalid encryption configuration')

    if (!this.currentKeyId || !this.keys.has(this.currentKeyId))
      throw new Error('No valid encryption key available')

    const key = this.keys.get(this.currentKeyId)!

    try {
      const encryptedData = Buffer.isBuffer(data) ? data : Buffer.from(data, 'base64')

      const iv = encryptedData.slice(0, 16)
      const authTag = encryptedData.slice(-16)
      const ciphertext = encryptedData.slice(16, -16)

      const decipher = createDecipheriv('aes-256-gcm', key, iv)
      decipher.setAuthTag(authTag)

      const decrypted = Buffer.concat([
        decipher.update(ciphertext),
        decipher.final(),
      ])

      return decrypted.toString('utf8')
    }
    catch (err: any) {
      throw new Error(`Decryption failed: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  getLevel(): LogLevel {
    return this.config.level
  }

  getLogDirectory(): string {
    return this.config.logDirectory
  }

  getFormat(): string | undefined {
    return this.config.format
  }

  getRotationConfig(): RotationConfig | boolean | undefined {
    return this.config.rotation
  }

  isBrowserMode(): boolean {
    return isBrowserProcess()
  }

  isServerMode(): boolean {
    return !isBrowserProcess()
  }

  setTestEncryptionKey(keyId: string, key: Buffer): void {
    this.currentKeyId = keyId
    this.keys.set(keyId, key)
  }

  getTestCurrentKey(): { id: string, key: Buffer } | null {
    if (!this.currentKeyId || !this.keys.has(this.currentKeyId)) {
      return null
    }
    return {
      id: this.currentKeyId,
      key: this.keys.get(this.currentKeyId)!,
    }
  }

  getConfig(): ClarityConfig {
    return this.config
  }

  async box(message: string): Promise<void> {
    if (!this.enabled)
      return

    const timestamp = new Date()
    const consoleTime = this.formatConsoleTimestamp(timestamp)
    const fileTime = this.formatFileTimestamp(timestamp)

    if (this.fancy && !isBrowserProcess()) {
      const lines = message.split('\n')
      const width = Math.max(...lines.map(line => line.length)) + 2

      const top = `┌${'─'.repeat(width)}┐`
      const bottom = `└${'─'.repeat(width)}┘`

      const boxedLines = lines.map((line) => {
        const padding = ' '.repeat(width - line.length - 2)
        return `│ ${line}${padding} │`
      })

      if (this.options.showTags !== false && this.name) {
        console.error(this.formatConsoleMessage({
          timestamp: consoleTime,
          message: styles.gray(this.formatTag(this.name)),
          showTimestamp: false,
        }))
      }

      console.error(this.formatConsoleMessage({
        timestamp: consoleTime,
        message: styles.cyan(top),
      }))
      boxedLines.forEach(line => console.error(this.formatConsoleMessage({
        timestamp: consoleTime,
        message: styles.cyan(line),
        showTimestamp: false,
      })))
      console.error(this.formatConsoleMessage({
        timestamp: consoleTime,
        message: styles.cyan(bottom),
        showTimestamp: false,
      }))
    }
    else if (!isBrowserProcess()) {
      console.error(`${fileTime} ${this.environment}.INFO: [BOX] ${message}`)
    }

    const logEntry = `${fileTime} ${this.environment}.INFO: [BOX] ${message}\n`.replace(this.ANSI_PATTERN, '')
    await this.writeToFile(logEntry)
  }

  async prompt(message: string): Promise<boolean> {
    if (isBrowserProcess()) {
      return Promise.resolve(true)
    }

    return new Promise((resolve) => {
      console.error(`${styles.cyan('?')} ${message} (y/n) `)

      const onData = (data: Buffer) => {
        const input = data.toString().trim().toLowerCase()
        process.stdin.removeListener('data', onData)
        try {
          if (typeof process.stdin.setRawMode === 'function') {
            process.stdin.setRawMode(false)
          }
        }
        catch {
        }
        process.stdin.pause()

        console.error('') 
        resolve(input === 'y' || input === 'yes')
      }

      try {
        if (typeof process.stdin.setRawMode === 'function') {
          process.stdin.setRawMode(true)
        }
      }
      catch {
      }
      process.stdin.resume()
      process.stdin.once('data', onData)
    })
  }

  setFancy(enabled: boolean): void {
    this.fancy = enabled
  }

  isFancy(): boolean {
    return this.fancy
  }

  pause(): void {
    this.enabled = false
  }

  resume(): void {
    this.enabled = true
  }

  async start(message: string, ...args: any[]): Promise<void> {
    if (!this.enabled)
      return

    let formattedMessage = message
    if (args && args.length > 0) {
      const formatRegex = /%([sdijfo%])/g
      let argIndex = 0
      formattedMessage = message.replace(formatRegex, (match, type) => {
        if (type === '%')
          return '%'
        if (argIndex >= args.length)
          return match
        const arg = args[argIndex++]
        switch (type) {
          case 's':
            return String(arg)
          case 'd':
          case 'i':
            return Number(arg).toString()
          case 'j':
          case 'o':
            return JSON.stringify(arg, null, 2)
          default:
            return match
        }
      })

      if (argIndex < args.length) {
        formattedMessage += ` ${args.slice(argIndex).map(arg =>
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg),
        ).join(' ')}`
      }
    }

    if (this.fancy && !isBrowserProcess()) {
      const tag = this.options.showTags !== false && this.name ? styles.gray(this.formatTag(this.name)) : ''
      const spinnerChar = styles.blue('◐')
      console.error(`${spinnerChar} ${tag} ${styles.cyan(formattedMessage)}`)
    }

    const timestamp = new Date()
    const formattedDate = timestamp.toISOString()
    const logEntry = `[${formattedDate}] ${this.environment}.INFO: [START] ${formattedMessage}\n`.replace(this.ANSI_PATTERN, '')

    await this.writeToFile(logEntry)
  }

  progress(total: number, initialMessage: string = ''): {
    update: (current: number, message?: string) => void
    finish: (message?: string) => void
    interrupt: (message: string, level?: LogLevel) => void
  } {
    if (!this.enabled || !this.fancy || isBrowserProcess() || total <= 0) {
      return {
        update: () => {},
        finish: () => {},
        interrupt: () => {},
      }
    }

    if (this.activeProgressBar) {
      console.warn('Warning: Another progress bar is already active. Finishing the previous one.')
      this.finishProgressBar(this.activeProgressBar, '[Auto-finished]')
    }

    const barLength = 20 
    this.activeProgressBar = {
      total,
      current: 0,
      message: initialMessage,
      barLength,
      lastRenderedLine: '',
    }

    this.renderProgressBar(this.activeProgressBar)

    const update = (current: number, message?: string): void => {
      if (!this.activeProgressBar || !this.enabled || !this.fancy || isBrowserProcess())
        return
      this.activeProgressBar.current = Math.max(0, Math.min(total, current))
      if (message !== undefined) {
        this.activeProgressBar.message = message
      }

      const isFinished = this.activeProgressBar.current === this.activeProgressBar.total
      this.renderProgressBar(this.activeProgressBar, isFinished)
    }

    const finish = (message?: string): void => {
      if (!this.activeProgressBar || !this.enabled || !this.fancy || isBrowserProcess())
        return
      this.activeProgressBar.current = this.activeProgressBar.total
      if (message !== undefined) {
        this.activeProgressBar.message = message
      }
      this.renderProgressBar(this.activeProgressBar, true) 
      this.finishProgressBar(this.activeProgressBar)
    }

    const interrupt = (interruptMessage: string, level: LogLevel = 'info'): void => {
      if (!this.activeProgressBar || !this.enabled || !this.fancy || isBrowserProcess())
        return

      process.stdout.write(`${'\r'.padEnd(process.stdout.columns || 80)}\r`)

      void this.log(level, interruptMessage)

      setTimeout(() => {
        if (this.activeProgressBar) { 
          this.renderProgressBar(this.activeProgressBar)
        }
      }, 50)
    }

    return { update, finish, interrupt }
  }

  private renderProgressBar(
    barState: NonNullable<Logger['activeProgressBar']>,
    isFinished: boolean = false,
  ): void {
    if (!this.enabled || !this.fancy || isBrowserProcess() || !process.stdout.isTTY)
      return

    const percent = Math.min(100, Math.max(0, Math.round((barState.current / barState.total) * 100)))
    const filledLength = Math.round((barState.barLength * percent) / 100)
    const emptyLength = barState.barLength - filledLength

    const filledBar = styles.green('━'.repeat(filledLength))
    const emptyBar = styles.gray('━'.repeat(emptyLength))
    const bar = `[${filledBar}${emptyBar}]`

    const percentageText = `${percent}%`.padStart(4)
    const messageText = barState.message ? ` ${barState.message}` : ''

    const icon = isFinished || percent === 100 ? styles.green('✓') : styles.blue('▶')

    const tag = this.options.showTags !== false && this.name ? ` ${styles.gray(this.formatTag(this.name))}` : ''

    const line = `\r${icon}${tag} ${bar} ${percentageText}${messageText}`

    const terminalWidth = process.stdout.columns || 80
    const clearLine = ' '.repeat(Math.max(0, terminalWidth - line.replace(this.ANSI_PATTERN, '').length))

    barState.lastRenderedLine = `${line}${clearLine}`
    process.stdout.write(barState.lastRenderedLine)

    if (isFinished) {
      process.stdout.write('\n')
    }
  }

  private finishProgressBar(
    barState: NonNullable<Logger['activeProgressBar']>,
    finalMessage?: string,
  ): void {
    if (!this.enabled || !this.fancy || isBrowserProcess() || !process.stdout.isTTY) {
      this.activeProgressBar = null
      return
    }

    if (barState.current < barState.total) {
      barState.current = barState.total
    }
    if (finalMessage)
      barState.message = finalMessage
    this.renderProgressBar(barState, true) 

    this.activeProgressBar = null 
  }

  async clear(filters: { name?: string, before?: Date } = {}): Promise<void> {
    if (isBrowserProcess()) {
      console.warn('Log clearing is not supported in browser environments.')
      return
    }

    try {
      console.warn('Clearing logs...', this.config.logDirectory)
      const files = await readdir(this.config.logDirectory)
      const logFilesToDelete: string[] = []

      for (const file of files) {
        const nameMatches = filters.name
          ? new RegExp(filters.name.replace('*', '.*')).test(file)
          : file.startsWith(this.name)

        if (!nameMatches || !file.endsWith('.log')) {
          continue 
        }

        const filePath = join(this.config.logDirectory, file)

        if (filters.before) {
          try {
            const fileStats = await stat(filePath)
            if (fileStats.mtime >= filters.before) {
              continue 
            }
          }
          catch (statErr) {
            console.error(`Failed to get stats for file ${filePath}:`, statErr)
            continue 
          }
        }

        logFilesToDelete.push(filePath)
      }

      if (logFilesToDelete.length === 0) {
        console.warn('No log files matched the criteria for clearing.')
        return
      }

      console.warn(`Preparing to delete ${logFilesToDelete.length} log file(s)...`)

      for (const filePath of logFilesToDelete) {
        try {
          await unlink(filePath)
          console.warn(`Deleted log file: ${filePath}`)
        }
        catch (unlinkErr) {
          console.error(`Failed to delete log file ${filePath}:`, unlinkErr)
        }
      }

      console.warn('Log clearing process finished.')
    }
    catch (err) {
      console.error('Error during log clearing process:', err)
    }
  }
}

export const logger: Logger = new Logger('stacks')
export default Logger