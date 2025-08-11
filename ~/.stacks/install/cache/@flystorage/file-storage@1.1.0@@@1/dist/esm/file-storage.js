import { Readable } from 'stream';
import { checksumFromStream } from './checksum-from-stream.js';
import { PathNormalizerV1 } from './path-normalizer.js';
import { TextEncoder } from 'util';
import { ChecksumIsNotAvailable, errorToMessage, isFileWasNotFound, UnableToCheckDirectoryExistence, UnableToCheckFileExistence, UnableToCopyFile, UnableToCreateDirectory, UnableToDeleteDirectory, UnableToDeleteFile, UnableToGetChecksum, UnableToGetFileSize, UnableToGetLastModified, UnableToGetMimeType, UnableToGetPublicUrl, UnableToGetStat, UnableToGetTemporaryUrl, UnableToGetVisibility, UnableToListDirectory, UnableToMoveFile, UnableToPrepareUploadRequest, UnableToReadFile, UnableToSetVisibility, UnableToWriteFile, } from './errors.js';
import { PassThrough } from 'node:stream';
export function isFile(stat) {
    return stat.isFile;
}
export function isDirectory(stat) {
    return stat.isDirectory;
}
export class DirectoryListing {
    listing;
    path;
    deep;
    constructor(listing, path, deep) {
        this.listing = listing;
        this.path = path;
        this.deep = deep;
    }
    async toArray(sorted = true) {
        const items = [];
        for await (const item of this.listing) {
            items.push(item);
        }
        return sorted ? items.sort((a, b) => naturalSorting.compare(a.path, b.path)) : items;
    }
    filter(filter) {
        const listing = this.listing;
        const filtered = (async function* () {
            for await (const entry of listing) {
                if (filter(entry)) {
                    yield entry;
                }
            }
        })();
        return new DirectoryListing(filtered, this.path, this.deep);
    }
    async *[Symbol.asyncIterator]() {
        try {
            for await (const item of this.listing) {
                yield item;
            }
        }
        catch (error) {
            throw UnableToListDirectory.because(errorToMessage(error), { cause: error, context: { path: this.path, deep: this.deep } });
        }
    }
}
export function toReadable(contents) {
    if (contents instanceof Readable) {
        return contents;
    }
    return Readable.from(contents);
}
const naturalSorting = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
});
function instrumentAbortSignal(options) {
    let abortSignal = options.abortSignal;
    if (options.timeout !== undefined) {
        const timeoutAbort = AbortSignal.timeout(options.timeout);
        if (options.abortSignal) {
            const originalAbortSignal = options.abortSignal;
            abortSignal = AbortSignal.any([
                originalAbortSignal,
                timeoutAbort,
            ]);
        }
        else {
            abortSignal = timeoutAbort;
        }
    }
    if (abortSignal?.aborted) {
        throw abortSignal.reason;
    }
    return { ...options, abortSignal };
}
export class FileStorage {
    adapter;
    pathNormalizer;
    options;
    constructor(adapter, pathNormalizer = new PathNormalizerV1(), options = {}) {
        this.adapter = adapter;
        this.pathNormalizer = pathNormalizer;
        this.options = options;
    }
    async write(path, contents, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...this.options.visibility, ...this.options.writes, ...options });
        try {
            const body = toReadable(contents);
            await this.adapter.write(this.pathNormalizer.normalizePath(path), body, options);
            await closeReadable(body);
        }
        catch (error) {
            throw UnableToWriteFile.because(errorToMessage(error), { cause: error, context: { path, options } });
        }
    }
    async read(path, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...options });
        try {
            const stream = Readable.from(await this.adapter.read(this.pathNormalizer.normalizePath(path), options));
            const streamOut = new PassThrough();
            stream.on('error', (error) => {
                stream.unpipe(streamOut);
                streamOut.destroy(isFileWasNotFound(error)
                    ? UnableToReadFile.becauseFileWasNotFound(error)
                    : error);
            });
            stream.pipe(streamOut);
            return streamOut;
        }
        catch (error) {
            if (isFileWasNotFound(error)) {
                throw UnableToReadFile.becauseFileWasNotFound(error);
            }
            throw UnableToReadFile.because(errorToMessage(error), { cause: error, context: { path } });
        }
    }
    async readToString(path, options = {}) {
        return await readableToString(await this.read(path, options));
    }
    async readToUint8Array(path, options = {}) {
        return await readableToUint8Array(await this.read(path, options));
    }
    async readToBuffer(path, options = {}) {
        return Buffer.from(await this.readToUint8Array(path, options));
    }
    async deleteFile(path, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...options });
        try {
            await this.adapter.deleteFile(this.pathNormalizer.normalizePath(path), options);
        }
        catch (error) {
            throw UnableToDeleteFile.because(errorToMessage(error), { cause: error, context: { path } });
        }
    }
    async createDirectory(path, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...this.options.visibility, ...options });
        try {
            return await this.adapter.createDirectory(this.pathNormalizer.normalizePath(path), options);
        }
        catch (error) {
            throw UnableToCreateDirectory.because(errorToMessage(error), { cause: error, context: { path, options } });
        }
    }
    async deleteDirectory(path, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...options });
        try {
            return await this.adapter.deleteDirectory(this.pathNormalizer.normalizePath(path), options);
        }
        catch (error) {
            throw UnableToDeleteDirectory.because(errorToMessage(error), { cause: error, context: { path } });
        }
    }
    async stat(path, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...options });
        try {
            return await this.adapter.stat(this.pathNormalizer.normalizePath(path), options);
        }
        catch (error) {
            throw UnableToGetStat.because(errorToMessage(error), { cause: error, context: { path } });
        }
    }
    async moveFile(from, to, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...this.options.visibility, ...this.options.moves, ...options });
        try {
            await this.adapter.moveFile(this.pathNormalizer.normalizePath(from), this.pathNormalizer.normalizePath(to), options);
        }
        catch (error) {
            throw UnableToMoveFile.because(errorToMessage(error), { cause: error, context: { from, to } });
        }
    }
    async copyFile(from, to, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...this.options.visibility, ...this.options.copies, ...options });
        try {
            await this.adapter.copyFile(this.pathNormalizer.normalizePath(from), this.pathNormalizer.normalizePath(to), options);
        }
        catch (error) {
            throw UnableToCopyFile.because(errorToMessage(error), { cause: error, context: { from, to } });
        }
    }
    async changeVisibility(path, visibility, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...options });
        try {
            return await this.adapter.changeVisibility(this.pathNormalizer.normalizePath(path), visibility, options);
        }
        catch (error) {
            throw UnableToSetVisibility.because(errorToMessage(error), { cause: error, context: { path, visibility } });
        }
    }
    async visibility(path, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...options });
        try {
            return await this.adapter.visibility(this.pathNormalizer.normalizePath(path), options);
        }
        catch (error) {
            throw UnableToGetVisibility.because(errorToMessage(error), { cause: error, context: { path } });
        }
    }
    async fileExists(path, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...options });
        try {
            return await this.adapter.fileExists(this.pathNormalizer.normalizePath(path), options);
        }
        catch (error) {
            throw UnableToCheckFileExistence.because(errorToMessage(error), { cause: error, context: { path } });
        }
    }
    list(path, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...options });
        const adapterOptions = {
            ...options,
            deep: options.deep ?? false,
        };
        return new DirectoryListing(this.adapter.list(this.pathNormalizer.normalizePath(path), adapterOptions), path, adapterOptions.deep);
    }
    async statFile(path, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...options });
        const stat = await this.stat(path, options);
        if (isFile(stat)) {
            return stat;
        }
        throw UnableToGetStat.noFileStatResolved({ context: { path } });
    }
    async directoryExists(path, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...options });
        try {
            return await this.adapter.directoryExists(this.pathNormalizer.normalizePath(path), options);
        }
        catch (error) {
            throw UnableToCheckDirectoryExistence.because(errorToMessage(error), { cause: error, context: { path } });
        }
    }
    async publicUrl(path, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...this.options.publicUrls, ...options });
        try {
            return await this.adapter.publicUrl(this.pathNormalizer.normalizePath(path), options);
        }
        catch (error) {
            throw UnableToGetPublicUrl.because(errorToMessage(error), { cause: error, context: { path, options } });
        }
    }
    async temporaryUrl(path, options) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...this.options.temporaryUrls, ...options });
        try {
            return await this.adapter.temporaryUrl(this.pathNormalizer.normalizePath(path), options);
        }
        catch (error) {
            throw UnableToGetTemporaryUrl.because(errorToMessage(error), { cause: error, context: { path, options } });
        }
    }
    async prepareUpload(path, options) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...this.options.uploadRequest, ...options });
        if (this.options.preparedUploadStrategy !== undefined) {
            try {
                return this.options.preparedUploadStrategy.prepareUpload(path, options);
            }
            catch (error) {
                throw UnableToPrepareUploadRequest.because(errorToMessage(error), { cause: error, context: { path, options } });
            }
        }
        if (typeof this.adapter.prepareUpload !== 'function') {
            throw new Error('The used adapter does not support prepared uploads.');
        }
        try {
            return await this.adapter.prepareUpload(this.pathNormalizer.normalizePath(path), options);
        }
        catch (error) {
            throw UnableToPrepareUploadRequest.because(errorToMessage(error), { cause: error, context: { path, options } });
        }
    }
    async checksum(path, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...this.options.checksums, ...options });
        try {
            return await this.adapter.checksum(this.pathNormalizer.normalizePath(path), options);
        }
        catch (error) {
            if (ChecksumIsNotAvailable.isErrorOfType(error)) {
                return this.calculateChecksum(path, options);
            }
            throw UnableToGetChecksum.because(errorToMessage(error), { cause: error, context: { path, options } });
        }
    }
    async mimeType(path, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...this.options.mimeTypes, ...options });
        try {
            return await this.adapter.mimeType(this.pathNormalizer.normalizePath(path), options);
        }
        catch (error) {
            throw UnableToGetMimeType.because(errorToMessage(error), { cause: error, context: { path, options } });
        }
    }
    async lastModified(path, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...options });
        try {
            return await this.adapter.lastModified(this.pathNormalizer.normalizePath(path), options);
        }
        catch (error) {
            throw UnableToGetLastModified.because(errorToMessage(error), { cause: error, context: { path } });
        }
    }
    async fileSize(path, options = {}) {
        options = instrumentAbortSignal({ ...this.options.timeout, ...options });
        try {
            return await this.adapter.fileSize(this.pathNormalizer.normalizePath(path), options);
        }
        catch (error) {
            throw UnableToGetFileSize.because(errorToMessage(error), { cause: error, context: { path } });
        }
    }
    async calculateChecksum(path, options) {
        try {
            return await checksumFromStream(await this.read(path, options), options);
        }
        catch (error) {
            throw UnableToGetChecksum.because(errorToMessage(error), { cause: error, context: { path, options } });
        }
    }
}
export function normalizeExpiryToDate(expiresAt) {
    return expiresAt instanceof Date ? expiresAt : new Date(expiresAt);
}
export function normalizeExpiryToMilliseconds(expiresAt) {
    return expiresAt instanceof Date ? expiresAt.getTime() : expiresAt;
}
export async function closeReadable(body) {
    if (body.closed || body.destroyed) {
        return;
    }
    await new Promise((resolve, reject) => {
        body.on('error', reject);
        body.on('close', (err) => {
            err ? reject(err) : resolve();
        });
        body.destroy();
    });
}
const decoder = new TextDecoder();
export async function readableToString(stream) {
    const contents = decoder.decode(await readableToUint8Array(stream));
    await closeReadable(stream);
    return contents;
}
export async function readableToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const buffers = [];
        stream.on('data', chunk => buffers.push(Buffer.from(chunk)));
        stream.on('end', () => resolve(Buffer.concat(buffers)));
        stream.on('finish', () => resolve(Buffer.concat(buffers)));
        stream.on('error', err => reject(err));
    });
}
const encoder = new TextEncoder();
export function readableToUint8Array(stream) {
    return new Promise((resolve, reject) => {
        const parts = [];
        stream.on('data', (chunk) => {
            const type = typeof chunk;
            if (type === 'string') {
                chunk = encoder.encode(chunk);
            }
            else if (type === 'number') {
                chunk = new Uint8Array([chunk]);
            }
            parts.push(chunk);
        });
        stream.on('error', reject);
        stream.on('end', () => resolve(concatUint8Arrays(parts)));
    });
}
function concatUint8Arrays(input) {
    const length = input.reduce((l, a) => l + (a.byteLength), 0);
    const output = new Uint8Array(length);
    let position = 0;
    input.forEach(i => {
        output.set(i, position);
        position += i.byteLength;
    });
    return output;
}
export class PreparedUploadsAreNotSupported {
    prepareUpload() {
        throw new Error('The used adapter does not support prepared uploads.');
    }
}
