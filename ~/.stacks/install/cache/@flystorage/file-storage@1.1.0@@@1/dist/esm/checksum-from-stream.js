import { createHash } from 'crypto';
import { TextEncoder } from 'util';
const encoder = new TextEncoder();
export async function checksumFromStream(stream, options) {
    return new Promise((resolve, reject) => {
        const hash = createHash(options.algo ?? 'md5');
        stream.on('error', err => reject(err));
        stream.on('data', (chunk) => {
            const type = typeof chunk;
            if (type === 'string') {
                chunk = encoder.encode(chunk);
            }
            else if (type === 'number') {
                chunk = new Uint8Array([chunk]);
            }
            hash.update(chunk);
        });
        stream.on('end', () => resolve(hash.digest(options.encoding ?? 'hex')));
    });
}
