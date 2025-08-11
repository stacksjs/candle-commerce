import type { TransportType } from './transport';

export declare enum RecordType {
  A = 1,
  NS = 2,
  CNAME = 5,
  SOA = 6,
  PTR = 12,
  MX = 15,
  TXT = 16,
  AAAA = 28,
  SRV = 33,
  NAPTR = 35,
  OPT = 41,
  SSHFP = 44,
  TLSA = 52,
  DNSKEY = 48,
  CAA = 257,
}
export declare enum QClass {
  IN = 1, 
  CH = 3, 
  HS = 4, 
}
export declare enum EDNSMode {
  Disable = 'disable',
  Hide = 'hide',
  Show = 'show',
}
export declare interface ProtocolTweaks {
  authoritative?: boolean
  authenticData?: boolean
  checkingDisabled?: boolean
  udpPayloadSize?: number
}
export declare interface TransportConfig {
  type?: TransportType
  udp?: boolean
  tcp?: boolean
  tls?: boolean
  https?: boolean
  timeout?: number
  retries?: number
}
export declare interface QueryConfig {
  domains: string[] 
  types?: (RecordType | string)[] 
  classes?: (QClass | string)[] 
  nameserver?: string 
  recursive?: boolean 
}
export declare interface OutputConfig {
  short?: boolean 
  json?: boolean 
  color?: 'always' | 'auto' | 'never' 
  seconds?: boolean 
  time?: boolean 
}
export declare interface DnsOptions {
  domains?: string[] 
  type?: string | string[] 
  nameserver?: string 
  class?: string | string[] 

  edns?: EDNSMode 
  txid?: number 
  Z?: string | string[] 

  udp?: boolean 
  tcp?: boolean 
  tls?: boolean 
  https?: boolean 
  timeout?: number 
  retries?: number 

  short?: boolean 
  json?: boolean 
  color?: 'always' | 'auto' | 'never' 
  seconds?: boolean 
  time?: boolean 

  tweaks?: ProtocolTweaks 
  transport?: TransportConfig | TransportType 
  query?: QueryConfig 
  output?: OutputConfig 
  verbose?: boolean 
}
export declare interface DnsAnswer {
  name: string 
  type: RecordType 
  class: QClass 
  ttl: number 
  data: any 
}
export declare interface DnsResponse {
  id: number 
  flags: DnsFlags 
  answers: DnsAnswer[] 
  authorities: DnsAnswer[] 
  additionals: DnsAnswer[] 
}
declare interface DnsFlags {
  response: boolean 
  opcode: number 
  authoritative: boolean 
  truncated: boolean 
  recursionDesired: boolean 
  recursionAvailable: boolean 
  authenticData: boolean 
  checkingDisabled: boolean 
  responseCode: number 
}
export declare enum DnsResponseCode {
  NoError = 0, 
  FormErr = 1, 
  ServFail = 2, 
  NXDomain = 3, 
  NotImp = 4, 
  Refused = 5, 
  YXDomain = 6, 
  YXRRSet = 7, 
  NXRRSet = 8, 
  NotAuth = 9, 
  NotZone = 10, 
}
export declare enum WireError {
  TruncatedPacket = 'TRUNCATED_PACKET',
  InvalidLength = 'INVALID_LENGTH',
  InvalidFormat = 'INVALID_FORMAT',
  InvalidName = 'INVALID_NAME',
  InvalidLabel = 'INVALID_LABEL',
  InvalidPointer = 'INVALID_POINTER',
  InvalidType = 'INVALID_TYPE',
  InvalidClass = 'INVALID_CLASS',
  NetworkError = 'NETWORK_ERROR',
}
export declare interface DnsQuery {
  name: string
  type: RecordType
  class: QClass
}