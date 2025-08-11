"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamHead = streamHead;
exports.resolveMimeType = resolveMimeType;
const node_path_1 = require("node:path");
const mime_types_1 = require("mime-types");
const node_stream_1 = require("node:stream");
const dynamic_import_1 = require("@flystorage/dynamic-import");
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
async function streamHead(stream, size) {
    return new Promise((resolve, reject) => {
        const tunnel = new node_stream_1.PassThrough();
        const outputStream = new node_stream_1.PassThrough();
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
async function resolveMimeType(filename, stream, fallback = undefined) {
    const [head, readable] = await streamHead(stream, 4100);
    if (fileTypeImport === undefined) {
        fileTypeImport = (0, dynamic_import_1.dynamicallyImport)('file-type');
    }
    if (fileTypes === undefined) {
        fileTypes = await fileTypeImport;
    }
    const { fileTypeFromBuffer } = fileTypes;
    const lookup = await fileTypeFromBuffer(head);
    if (lookup) {
        return [lookup.mime, readable];
    }
    const { ext } = (0, node_path_1.parse)(filename);
    return [(0, mime_types_1.lookup)(ext) || fallback, readable];
}
