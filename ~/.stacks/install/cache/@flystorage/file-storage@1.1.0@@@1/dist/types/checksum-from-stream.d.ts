import { BinaryToTextEncoding } from 'crypto';
import { Readable } from 'node:stream';
export declare function checksumFromStream(stream: Readable, options: {
    algo?: string;
    encoding?: BinaryToTextEncoding;
}): Promise<string>;
