import type { DnsAnswer, DnsResponse } from './types';

export declare interface OutputOptions {
  json: boolean
  short: boolean
  showDuration?: number
  colors: {
    enabled: boolean
  }
  rawSeconds: boolean
}
declare const RECORD_COLORS: {
  A: 'green';
  AAAA: 'green';
  CNAME: 'yellow';
  MX: 'cyan';
  NS: 'red';
  PTR: 'red';
  SOA: 'magenta';
  SRV: 'cyan';
  TXT: 'yellow';
  CAA: 'red';
  TLSA: 'yellow'
};
export declare function formatOutput(responses: DnsResponse[], options: OutputOptions): string;
declare function formatJson(responses: DnsResponse[], duration?: number): string;
declare function formatJsonAnswer(answer: DnsAnswer): any;
declare function formatText(responses: DnsResponse[], options: OutputOptions): string;
declare function formatAnswer(answer: DnsAnswer, options: OutputOptions): string;
declare function formatTTL(seconds: number, raw: boolean): string;
declare function formatDuration(ms: number, raw: boolean): string;