import { parse } from 'node:path';
import { lookup as mimeTimeForExt } from 'mime-types';
import { PassThrough } from 'node:stream';
import { dynamicallyImport } from '@flystorage/dynamic-import';
function concatUint8Arrays(input) {
    const length = input.reduce((l, a) => l + a.byteLength, 0);
    const output = new Uint8Array(length);
    let position = 0;
    input.forEach(i => {
        output.set(i, position);
        position += i.byteLength;
    });
    return output;
}
export async function streamHead(stream, size) {
    return new Promise((resolve, reject) => {
        const tunnel = new PassThrough();
        const outputStream = new PassThrough();
        let readBytes = 0;
        let buffers = [];
        let resolved = false;
        tunnel.once('error', reject);
        tunnel.on('data', (chunk) => {
            if (!resolved) {
                readBytes += chunk.byteLength;
                buffers.push(chunk);
                if (readBytes >= size) {
                    resolved = true;
                    const head = concatUint8Arrays(buffers);
                    buffers = [];
                    resolve([head, outputStream]);
                }
            }
        });
        tunnel.once('end', () => {
            if (!resolved) {
                resolve([concatUint8Arrays(buffers), outputStream]);
            }
        });
        stream.pipe(tunnel).pipe(outputStream);
    });
}
let fileTypeImport;
let fileTypes = undefined;
export async function resolveMimeType(filename, stream, fallback = undefined) {
    const [head, readable] = await streamHead(stream, 4100);
    if (fileTypeImport === undefined) {
        fileTypeImport = import('file-type');
    }
    if (fileTypes === undefined) {
        fileTypes = await fileTypeImport;
    }
    const { fileTypeFromBuffer } = fileTypes;
    const lookup = await fileTypeFromBuffer(head);
    if (lookup) {
        return [lookup.mime, readable];
    }
    const { ext } = parse(filename);
    return [mimeTimeForExt(ext) || fallback, readable];
}
