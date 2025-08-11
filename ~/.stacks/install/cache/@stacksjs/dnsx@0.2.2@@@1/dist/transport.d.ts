export declare enum TransportType {
  UDP = 'udp',
  TCP = 'tcp',
  TLS = 'tls',
  HTTPS = 'https',
}
export declare interface Transport {
  query: (nameserver: string, request: Buffer) => Promise<Buffer>
}
declare let client: unknown;
declare const parsedPort: unknown;
declare const data: (...args: any[]) => unknown;
declare let timeoutId: ReturnType<typeof setTimeout>
      let data;
declare const newData: unknown;
declare const view: unknown;
declare const lengthPrefix: (...args: any[]) => unknown;
declare const options: {
  host: unknown;
  port: unknown;
  servername: unknown
};
declare const socket: (...args: any[]) => unknown;
declare const newData: unknown;
declare const view: unknown;
declare const options: {
  method: 'POST';
  headers: {
    'Content-Type': unknown;
    'Content-Length': unknown;
    Accept: unknown
  };
  timeout: unknown
};
declare let chunks: Uint8Array[];
export declare function createTransport(type: TransportType): Transport;