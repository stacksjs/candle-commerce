import type { DnsOptions, DnsQuery, DnsResponse } from './types';

export declare class DnsClient {
  private options: DnsOptions
  private static readonly DEFAULT_NAMESERVER = '1.1.1.1'
  private static readonly RESOLV_CONF_PATH = '/etc/resolv.conf'
  private static readonly WINDOWS_DNS_KEY = 'SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Nameserver'

  private validateDomainName(domain: string): void {
    if (domain.includes('..')) {
      throw new Error(`Invalid domain name: ${domain} (consecutive dots)`)
    }

    if (domain.startsWith('.') || domain.endsWith('.')) {
      throw new Error(`Invalid domain name: ${domain} (starts or ends with dot)`)
    }

    if (domain.length > 253) {
      throw new Error(`Domain name too long: ${domain}`)
    }

    const labels = domain.split('.')
    for (const label of labels) {
      if (label.length > 63) {
        throw new Error(`Label too long in domain: ${domain}`)
      }

      if (!/^[a-z0-9-]+$/i.test(label)) {
        throw new Error(`Invalid characters in domain label: ${label}`)
      }
    }
  }

  private validateRecordType(type: string | number): void {
    if (typeof type === 'string') {
      const upperType = type.toUpperCase()
      if (!(upperType in RecordType)) {
        throw new Error(`Invalid record type: ${type}`)
      }
    }
    else if (typeof type === 'number') {
      const values = Object.values(RecordType).filter(v => typeof v === 'number')
      if (!values.includes(type)) {
        throw new Error(`Invalid record type number: ${type}`)
      }
    }
    else {
      throw new TypeError('Record type must be string or number')
    }
  }

  constructor(options: DnsOptions) {
    this.options = {
      transport: {
        type: TransportType.UDP,
      },
      verbose: false,
      ...options,
    }

    this.validateOptions()
  }

  async query(): Promise<DnsResponse[]> {
    try {
      const transportType = this.determineTransportType()
      debugLog('client', `Selected transport type: ${transportType}`, this.options.verbose)

      const transport = createTransport(transportType)
      if (!transport) {
        throw new Error(`Failed to create transport for type: ${transportType}`)
      }

      const responses: DnsResponse[] = []

      const nameserver = await this.resolveNameserver()
      debugLog('client', `Resolved nameserver: ${nameserver}`, this.options.verbose)

      if (!nameserver) {
        throw new Error('Failed to resolve nameserver')
      }

      const queries = this.buildQueries()
      debugLog('client', `Built ${queries.length} queries`, this.options.verbose)

      for (const query of queries) {
        debugLog('client', `Processing query: ${JSON.stringify({
          query,
          nameserver,
          transportType,
        })}`, this.options.verbose)

        const request = buildQuery(query, {
          txid: this.options.txid,
          edns: this.options.edns,
          tweaks: this.options.tweaks,
          verbose: this.options.verbose,
        })

        debugLog('client', `Built DNS request: ${JSON.stringify({
          hexData: request.toString('hex'),
          length: request.length,
          txid: request.readUInt16BE(0),
          flags: request.readUInt16BE(2).toString(16),
        })}`, this.options.verbose)

        const maxRetries = this.options.retries || 3

        for (let attempt = 0; attempt < maxRetries; attempt++) {
          try {
            debugLog('client', `Attempt ${attempt + 1}/${maxRetries}`, this.options.verbose)
            const response = await transport.query(nameserver, request)

            debugLog('client', `Received DNS response: ${JSON.stringify({
              hexData: response.toString('hex'),
              length: response.length,
              txid: response.readUInt16BE(0),
              flags: response.readUInt16BE(2).toString(16),
            })}`, this.options.verbose)

            if (response.length < 12) { 
              throw new Error(`Response too short: ${response.length} bytes`)
            }

            const responseFlags = response.readUInt16BE(2)
            if (!(responseFlags & 0x8000)) { 
              throw new Error('Response flag not set in DNS message')
            }

            const parsed = parseResponse(response)
            debugLog('client', `Parsed DNS response: ${JSON.stringify({
              id: parsed.id,
              answerCount: parsed.answers.length,
              authorityCount: parsed.authorities.length,
              additionalCount: parsed.additionals.length,
            })}`, this.options.verbose)

            if (transportType === TransportType.UDP && parsed.flags.truncated) {
              debugLog('client', 'Response truncated, retrying with TCP', this.options.verbose)
              const tcpTransport = createTransport(TransportType.TCP)
              const tcpResponse = await tcpTransport.query(nameserver, request)
              responses.push(parseResponse(tcpResponse))
            }
            else {
              responses.push(parsed)
            }

            break 
          }
          catch (err) {
            debugLog('client', `Attempt ${attempt + 1} failed: ${(err as Error).message}`, this.options.verbose)

            if (attempt === maxRetries - 1) {
              debugLog('client', 'All retry attempts failed', this.options.verbose)
              throw err
            }

            const backoffTime = 2 ** attempt * 1000
            debugLog('client', `Waiting ${backoffTime}ms before retry`, this.options.verbose)
            await new Promise(resolve => setTimeout(resolve, backoffTime))
          }
        }
      }

      if (responses.length === 0) {
        throw new Error('No responses received')
      }

      return responses
    }
    catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      debugLog('client', `Query failed with error: ${errorMessage}`, this.options.verbose)
      debugLog('client', `Full error: ${JSON.stringify(err)}`, this.options.verbose)
      throw new Error(`DNS query failed: ${errorMessage}`)
    }
  }

  private buildQueries(): DnsQuery[] {
    const queries: DnsQuery[] = []

    if (!this.options.domains?.length) {
      throw new Error('No domains specified')
    }

    const domains = Array.isArray(this.options.domains)
      ? this.options.domains
      : [this.options.domains]

    const types = this.resolveTypes()
    const classes = this.resolveClasses()

    for (const domain of domains) {
      for (const type of types) {
        for (const qclass of classes) {
          queries.push({ name: domain, type, class: qclass })
        }
      }
    }

    debugLog('client', `Built queries: ${JSON.stringify(queries)}`, this.options.verbose)
    return queries
  }

  private resolveTypes(): RecordType[] {
    if (!this.options.type) {
      return [RecordType.A]
    }

    const types = Array.isArray(this.options.type)
      ? this.options.type
      : [this.options.type]

    return types.map((type) => {
      this.validateRecordType(type)
      if (typeof type === 'number') {
        return type
      }
      const upperType = type.toUpperCase()
      return RecordType[upperType as keyof typeof RecordType]
    })
  }

  private resolveClasses(): QClass[] {
    if (!this.options.class)
      return [QClass.IN]

    const classes = Array.isArray(this.options.class)
      ? this.options.class
      : [this.options.class]

    return classes.map((cls) => {
      if (typeof cls === 'number')
        return cls
      const upperClass = cls.toUpperCase()
      const qclass = QClass[upperClass as keyof typeof QClass]
      if (qclass === undefined) {
        throw new Error(`Invalid query class: ${cls}`)
      }
      return qclass
    })
  }

  private validateNameserver(nameserver: string): boolean {
    if (nameserver.startsWith('https:
      return true
    }

    if (nameserver.includes('%')) {
      return false
    }

    const ipv4Regex = /^(?:\d{1,3}\.){3}\d{1,3}$/
    if (ipv4Regex.test(nameserver)) {
      const parts = nameserver.split('.')
      return parts.every((part) => {
        const num = Number.parseInt(part, 10)
        return num >= 0 && num <= 255
      })
    }

    if (nameserver.includes(':')) {
      return false 
    }

    return false
  }

  private async resolveNameserver(): Promise<string> {
    try {
      if (this.options.nameserver) {
        debugLog('client', `Checking configured nameserver: ${this.options.nameserver}`, this.options.verbose)
        if (this.validateNameserver(this.options.nameserver)) {
          return this.options.nameserver
        }
      }

      const currentPlatform = platform()
      debugLog('client', `Resolving nameserver for platform: ${currentPlatform}`, this.options.verbose)

      let nameserver: string
      if (currentPlatform === 'win32') {
        nameserver = await this.resolveWindowsNameserver()
      }
      else {
        nameserver = await this.resolveUnixNameserver()
      }

      if (this.validateNameserver(nameserver)) {
        return nameserver
      }

      debugLog('client', `Using default nameserver: ${DnsClient.DEFAULT_NAMESERVER}`, this.options.verbose)
      return DnsClient.DEFAULT_NAMESERVER
    }
    catch (err) {
      debugLog('client', `Failed to resolve nameserver: ${(err as Error).message}`, this.options.verbose)
      debugLog('client', `Using default nameserver: ${DnsClient.DEFAULT_NAMESERVER}`, this.options.verbose)
      return DnsClient.DEFAULT_NAMESERVER
    }
  }

  private async resolveUnixNameserver(): Promise<string> {
    try {
      const content = await fs.readFile(DnsClient.RESOLV_CONF_PATH, 'utf-8')
      const lines = content.split('\n')
      const nameservers: string[] = []

      for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed.startsWith('nameserver')) {
          const [, nameserver] = trimmed.split(/\s+/)
          if (nameserver && !nameserver.includes('%')) { 
            nameservers.push(nameserver)
          }
        }
      }

      const ipv4Nameserver = nameservers.find(ns => !ns.includes(':'))
      if (ipv4Nameserver) {
        debugLog('client', `Using IPv4 nameserver from resolv.conf: ${ipv4Nameserver}`, this.options.verbose)
        return ipv4Nameserver
      }

      debugLog('client', `No valid nameserver found in resolv.conf, using fallback: ${DnsClient.DEFAULT_NAMESERVER}`, this.options.verbose)
      return DnsClient.DEFAULT_NAMESERVER
    }
    catch (err) {
      debugLog('client', `Failed to read resolv.conf: ${(err as Error).message}`, this.options.verbose)
      debugLog('client', `Using fallback nameserver: ${DnsClient.DEFAULT_NAMESERVER}`, this.options.verbose)
      return DnsClient.DEFAULT_NAMESERVER
    }
  }

  private async resolveWindowsNameserver(): Promise<string> {
    try {
      debugLog('client', `Using default nameserver for Windows: ${DnsClient.DEFAULT_NAMESERVER}`, this.options.verbose)
      return DnsClient.DEFAULT_NAMESERVER
    }
    catch (err) {
      debugLog('client', `Failed to get Windows nameserver: ${(err as Error).message}`, this.options.verbose)
      throw new Error('Failed to get Windows nameserver')
    }
  }

  private determineTransportType(): TransportType {
    if (this.options.https)
      return TransportType.HTTPS
    if (this.options.tls)
      return TransportType.TLS
    if (this.options.tcp)
      return TransportType.TCP
    if (this.options.udp)
      return TransportType.UDP

    if (typeof this.options.transport === 'object') {
      return this.options.transport.type || TransportType.UDP
    }

    return TransportType.UDP
  }

  private validateOptions(): void {
    if (this.options.domains) {
      for (const domain of Array.isArray(this.options.domains) ? this.options.domains : [this.options.domains]) {
        this.validateDomainName(domain)
      }
    }

    if (this.options.type) {
      const types = Array.isArray(this.options.type)
        ? this.options.type
        : [this.options.type]

      for (const type of types) {
        this.validateRecordType(type)
      }
    }

    const transportCount = [
      this.options.udp,
      this.options.tcp,
      this.options.tls,
      this.options.https,
    ].filter(Boolean).length

    if (transportCount > 1) {
      throw new Error('Only one transport type can be specified')
    }

    if (this.options.https && !this.options.nameserver?.startsWith('https:
      throw new Error('HTTPS transport requires an HTTPS nameserver URL')
    }

    debugLog('client', 'Options validation completed successfully', this.options.verbose)
  }
}