export declare type LogLevel = 'debug' | 'info' | 'success' | 'warning' | 'error'

export type RotationFrequency = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'none'

export type EncryptionAlgorithm = 'aes-256-cbc' | 'aes-256-gcm' | 'chacha20-poly1305'

export interface LogEntry {
  timestamp: Date
  level: LogLevel
  message: string
  args?: any[]
  name: string
}

export interface KeyRotationConfig {
  enabled: boolean
  interval: number 
  maxKeys: number
}

export interface EncryptionConfig {
  algorithm?: EncryptionAlgorithm
  keyId?: string
  compress?: boolean
  keyRotation?: KeyRotationConfig 
}

export interface RotationConfig {
  maxSize?: number
  maxFiles?: number
  maxAge?: number
  compress?: boolean
  frequency?: 'daily' | 'weekly' | 'monthly'
  rotateHour?: number
  rotateMinute?: number
  rotateDayOfWeek?: number
  rotateDayOfMonth?: number
  pattern?: string
  encrypt?: EncryptionConfig | boolean
  keyRotation?: {
    enabled?: boolean
    interval?: number
    maxKeys?: number
  }
}

export interface ClarityConfig {
  level: LogLevel

  defaultName: string

  timestamp: boolean

  colors: boolean

  format: 'text' | 'json'

  maxLogSize: number

  logDatePattern: string

  logDirectory: string

  rotation: boolean | RotationConfig

  verbose: boolean
}

export type ClarityOptions = Partial<ClarityConfig>

export interface Formatter {
  format: (entry: LogEntry, forFile?: boolean) => Promise<string>
  formatForFile?: (entry: LogEntry) => Promise<string>
}

export interface LoggerOptions {
  logDirectory?: string
  level?: LogLevel
  format?: 'json' | 'text'
  rotation?: RotationConfig
  timestamp?: string | number | Date
  fingersCrossed?: boolean | {
    activationLevel?: LogLevel
    bufferSize?: number
    flushOnDeactivation?: boolean
    stopBuffering?: boolean
  }
}

export interface Logger {
  debug: (message: string, ...args: any[]) => Promise<void>
  info: (message: string, ...args: any[]) => Promise<void>
  success: (message: string, ...args: any[]) => Promise<void>
  warn: (message: string, ...args: any[]) => Promise<void>
  error: (message: string, ...args: any[]) => Promise<void>
  destroy: () => Promise<void>
  createReadStream: () => NodeJS.ReadableStream
  decrypt?: (data: string) => Promise<string>
}