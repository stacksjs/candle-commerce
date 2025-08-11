import type { DnsAnswer, DnsQuery, DnsResponse, EDNSMode, ProtocolTweaks } from './types';

declare const DNS_HEADER_SIZE: unknown;
export declare class DnsFlags {
  response = false
  opcode = 0
  authoritative = false
  truncated = false
  recursionDesired = false
  recursionAvailable = false
  authenticData = false
  checkingDisabled = false
  responseCode = 0

  static fromBuffer(buffer: Buffer): DnsFlags {
    const flags = new DnsFlags()
    const rawFlags = buffer.readUInt16BE(0)

    flags.response = (rawFlags & 0x8000) !== 0 
    flags.opcode = (rawFlags & 0x7800) >>> 11 
    flags.authoritative = (rawFlags & 0x0400) !== 0 
    flags.truncated = (rawFlags & 0x0200) !== 0 
    flags.recursionDesired = (rawFlags & 0x0100) !== 0 

    flags.recursionAvailable = (rawFlags & 0x0080) !== 0 
    flags.authenticData = (rawFlags & 0x0020) !== 0 
    flags.checkingDisabled = (rawFlags & 0x0010) !== 0 
    flags.responseCode = rawFlags & 0x000F 

    return flags
  }

  toBuffer(): Buffer {
    const buffer = Buffer.alloc(2)
    let flags = 0

    if (this.response)
      flags |= 0x8000
    flags |= (this.opcode & 0x0F) << 11
    if (this.authoritative)
      flags |= 0x0400
    if (this.truncated)
      flags |= 0x0200
    if (this.recursionDesired)
      flags |= 0x0100
    if (this.recursionAvailable)
      flags |= 0x0080
    if (this.authenticData)
      flags |= 0x0020
    if (this.checkingDisabled)
      flags |= 0x0010
    flags |= this.responseCode & 0x000F

    buffer.writeUInt16BE(flags, 0)
    return buffer
  }
}
export declare class DnsEncoder {
  private buffer: Buffer
  private offset: number
  private nameOffsets: Map<string, number>
  private verbose?: boolean

  constructor(size = 512, verbose?: boolean) {
    this.buffer = Buffer.alloc(size)
    this.offset = 0
    this.nameOffsets = new Map()
    this.verbose = verbose
  }

  writeHeader(id: number, flags: DnsFlags, counts: {
    qdcount: number
    ancount: number
    nscount: number
    arcount: number
  }): void {
    debugLog('encoder', `Writing DNS header: ${JSON.stringify({
      id,
      flags: {
        response: flags.response,
        opcode: flags.opcode,
        recursionDesired: flags.recursionDesired,
      },
      counts,
    })}`, this.verbose)

    this.writeUint16(id)
    const flagsBuffer = flags.toBuffer()
    this.buffer.set(flagsBuffer, this.offset)
    this.offset += 2
    this.writeUint16(counts.qdcount)
    this.writeUint16(counts.ancount)
    this.writeUint16(counts.nscount)
    this.writeUint16(counts.arcount)
  }

  writeName(name: string): void {
    debugLog('encoder', `Writing DNS name: ${name}`, this.verbose)
    const labels = name.split('.')

    for (const label of labels) {
      if (label.length > MAX_LABEL_LENGTH) {
        throw new Error(`Label too long: ${label}`)
      }

      this.buffer[this.offset++] = label.length
      this.buffer.write(label, this.offset)
      this.offset += label.length
    }

    this.buffer[this.offset++] = 0
  }

  writeQuestion(query: DnsQuery): void {
    this.writeName(query.name)
    this.writeUint16(query.type)
    this.writeUint16(query.class)
  }

  private writeUint16(value: number): void {
    this.buffer.writeUInt16BE(value, this.offset)
    this.offset += 2
  }

  private writeUint32(value: number): void {
    this.buffer.writeUInt32BE(value, this.offset)
    this.offset += 4
  }

  getBuffer(): Buffer {
    return this.buffer.slice(0, this.offset)
  }
}
export declare class DnsDecoder {
  private buffer: Buffer
  private offset: number

  constructor(buffer: Buffer) {
    this.buffer = buffer
    this.offset = 0
  }

  private canRead(bytes: number): boolean {
    return this.offset + bytes <= this.buffer.length
  }

  readName(): string {
    const labels: string[] = []
    let jumping = false
    let jumpOffset = this.offset

    for (let jumps = 0; jumps < 5; jumps++) { 
      if (jumpOffset >= this.buffer.length) {
        throw new Error('Out of bounds access')
      }

      const len = this.buffer[jumpOffset]
      if (len === 0) {
        if (!jumping) {
          this.offset = jumpOffset + 1
        }
        break
      }

      if ((len & 0xC0) === 0xC0) { 
        if (!this.canRead(2)) {
          throw new Error('Out of bounds access')
        }

        if (!jumping) {
          this.offset = jumpOffset + 2
          jumping = true
        }

        jumpOffset = ((len & 0x3F) << 8) | this.buffer[jumpOffset + 1]
        continue
      }

      jumpOffset++
      if (jumpOffset + len > this.buffer.length) {
        throw new Error('Out of bounds access')
      }

      const label = this.buffer.slice(jumpOffset, jumpOffset + len).toString('ascii')
      labels.push(label)
      jumpOffset += len
    }

    return labels.join('.')
  }

  readHeader(): { id: number, flags: DnsFlags, counts: { qdcount: number, ancount: number, nscount: number, arcount: number } } {
    if (!this.canRead(DNS_HEADER_SIZE)) {
      throw new Error(`Invalid DNS header size: ${this.buffer.length} bytes`)
    }

    const id = this.readUint16()
    const flags = DnsFlags.fromBuffer(this.buffer.slice(this.offset, this.offset + 2))
    this.offset += 2

    const counts = {
      qdcount: this.readUint16(),
      ancount: this.readUint16(),
      nscount: this.readUint16(),
      arcount: this.readUint16(),
    }

    return { id, flags, counts }
  }

  readQuestion(): DnsQuery {
    const name = this.readName()

    if (!this.canRead(4)) {
      throw new Error('Out of bounds access')
    }

    const type = this.readUint16()
    const qclass = this.readUint16()

    return { name, type, class: qclass }
  }

  readAnswer(): DnsAnswer {
    const name = this.readName()

    if (!this.canRead(10)) {
      throw new Error('Out of bounds access')
    }

    const type = this.readUint16()
    const qclass = this.readUint16()
    const ttl = this.readUint32()
    const rdlength = this.readUint16()

    if (!this.canRead(rdlength)) {
      throw new Error('Out of bounds access')
    }

    const data = this.readRData(type, rdlength)

    return {
      name,
      type,
      class: qclass,
      ttl,
      data,
    }
  }

  private readRData(type: number, length: number): any {
    const startOffset = this.offset
    let data: any

    switch (type) {
      case RecordType.A:
        if (length !== 4)
          throw new Error('Invalid IPv4 length')
        data = this.readIPv4()
        break
      case RecordType.AAAA:
        if (length !== 16)
          throw new Error('Invalid IPv6 length')
        data = this.readIPv6()
        break
      case RecordType.MX:
        if (length < 3)
          throw new Error('Invalid MX record length')
        data = {
          preference: this.readUint16(),
          exchange: this.readName(),
        }
        break
      case RecordType.TXT:
        data = this.readString(length)
        break
      case RecordType.CNAME:
      case RecordType.NS:
      case RecordType.PTR:
        data = this.readName()
        break
      default:
        data = this.buffer.slice(this.offset, this.offset + length).toString('hex')
        this.offset += length
    }

    const bytesRead = this.offset - startOffset
    if (bytesRead !== length) {
      this.offset = startOffset + length
    }

    return data
  }

  private readUint16(): number {
    if (!this.canRead(2)) {
      throw new Error('Out of bounds access')
    }

    const value = this.buffer.readUInt16BE(this.offset)
    this.offset += 2

    return value
  }

  private readUint32(): number {
    if (!this.canRead(4)) {
      throw new Error('Out of bounds access')
    }

    const value = this.buffer.readUInt32BE(this.offset)
    this.offset += 4

    return value
  }

  private readIPv4(): string {
    if (!this.canRead(4)) {
      throw new Error('Out of bounds access')
    }

    const parts = []
    for (let i = 0; i < 4; i++) {
      parts.push(this.buffer[this.offset++])
    }

    return parts.join('.')
  }

  private readIPv6(): string {
    if (!this.canRead(16)) {
      throw new Error('Out of bounds access')
    }

    const parts = []
    for (let i = 0; i < 8; i++) {
      parts.push(this.buffer.readUInt16BE(this.offset).toString(16))
      this.offset += 2
    }

    return parts.join(':')
  }

  private readString(length: number): string {
    if (!this.canRead(length)) {
      throw new Error('Out of bounds access')
    }

    const str = this.buffer.slice(this.offset, this.offset + length).toString()
    this.offset += length
    return str
  }
}
export declare function buildQuery(options: { id?: number, txid?: number, edns?: EDNSMode, tweaks?: ProtocolTweaks, verbose?: boolean }): Buffer;
export declare function parseResponse(buffer: Buffer): DnsResponse;