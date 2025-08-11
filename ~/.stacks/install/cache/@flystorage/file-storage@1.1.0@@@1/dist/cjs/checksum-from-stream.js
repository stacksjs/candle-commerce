"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checksumFromStream = checksumFromStream;
const crypto_1 = require("crypto");
const util_1 = require("util");
const encoder = new util_1.TextEncoder();
async function checksumFromStream(stream, options) {
    return new Promise((resolve, reject) => {
        const hash = (0, crypto_1.createHash)(options.algo ?? 'md5');
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
