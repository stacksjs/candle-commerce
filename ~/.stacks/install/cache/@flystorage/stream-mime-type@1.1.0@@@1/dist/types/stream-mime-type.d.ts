import { Readable } from 'node:stream';
export declare function streamHead(stream: Readable, size: number): Promise<[Uint8Array, Readable]>;
export declare function resolveMimeType(filename: string, stream: Readable, fallback?: string | undefined): Promise<[string | undefined, Readable]>;
