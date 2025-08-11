"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryFileStorage = exports.InMemoryStorageAdapter = void 0;
exports.resolveMimeType = resolveMimeType;
const file_storage_1 = require("@flystorage/file-storage");
const node_stream_1 = require("node:stream");
const node_path_1 = require("node:path");
const mime_types_1 = require("mime-types");
function cloneBuffer(input) {
    const output = Buffer.alloc(input.length);
    input.copy(output);
    return output;
}
class InMemoryStorageAdapter {
    timestampResolver;
    entries = new Map;
    constructor(timestampResolver = () => Date.now()) {
        this.timestampResolver = timestampResolver;
    }
    deleteEverything() {
        this.entries = new Map;
    }
    async write(path, contents, options) {
        this.ensureParentDirsExist(path, options);
        this.entries.set(path, {
            type: 'file',
            path,
            contents: await (0, file_storage_1.readableToBuffer)(contents),
            lastModifiedMs: this.timestampResolver(),
            visibility: options.visibility,
        });
    }
    ensureParentDirsExist(path, options) {
        let parentDir = (0, node_path_1.dirname)(path);
        while (!['.', ''].includes(parentDir) && !this.entries.has(parentDir)) {
            this.entries.set(parentDir, {
                path: parentDir,
                type: 'directory',
                visibility: options.directoryVisibility,
            });
            parentDir = (0, node_path_1.dirname)(parentDir);
        }
    }
    async read(path) {
        const file = this.entries.get(path);
        if (file?.type !== 'file') {
            throw new Error(`Path "${path}" is not a file`);
        }
        return node_stream_1.Readable.from(cloneBuffer(file.contents));
    }
    async deleteFile(path) {
        this.entries.delete(path);
    }
    async createDirectory(path, options) {
        path = path.replace(/\/+$/g, '');
        this.entries.set(path, {
            path,
            type: 'directory',
            visibility: options.directoryVisibility,
        });
    }
    async copyFile(from, to, options) {
        const source = this.entries.get(from);
        if (source?.type !== 'file') {
            throw new Error(`Source file ${from} does not exist`);
        }
        this.ensureParentDirsExist(to, options);
        this.entries.set(to, {
            ...source,
            path: to,
        });
    }
    async moveFile(from, to, options) {
        await this.copyFile(from, to, options);
        await this.deleteFile(from);
    }
    async stat(path) {
        const entry = this.entries.get(path);
        if (entry === undefined) {
            throw new Error(`No entry found for path "${path}"`);
        }
        return this.mapToStatEntry(entry);
    }
    mapToStatEntry(entry) {
        if (entry.type === 'directory') {
            return {
                ...entry,
                isDirectory: true,
                isFile: false,
            };
        }
        return {
            type: 'file',
            path: entry.path,
            visibility: entry.visibility,
            isFile: true,
            isDirectory: false,
            lastModifiedMs: entry.lastModifiedMs,
        };
    }
    async *list(path, options) {
        const entries = this.entries.values();
        const prefix = path === '' || path === '/'
            ? ''
            : `${path.replace(/\/+$/g, '')}/`;
        for (const entry of entries) {
            if (!entry.path.startsWith(prefix)) {
                continue;
            }
            if (options.deep !== true && entry.path.indexOf('/', prefix.length) !== -1) {
                continue;
            }
            yield this.mapToStatEntry(entry);
        }
    }
    async changeVisibility(path, visibility) {
        const entry = this.entries.get(path);
        if (entry?.type !== 'file') {
            throw new Error(`Path ${path} is not a file`);
        }
        this.entries.set(path, {
            ...entry,
            visibility,
        });
    }
    async visibility(path) {
        const entry = this.entries.get(path);
        if (entry === undefined) {
            throw new Error(`Path ${path} does not exist`);
        }
        return entry.visibility ?? 'public';
    }
    async deleteDirectory(path) {
        const entries = this.entries.values();
        const prefix = `${path.replace(/\/+$/g, '')}/`;
        for (const entry of entries) {
            if (entry.path.startsWith(prefix) || entry.path === path) {
                this.entries.delete(entry.path);
            }
        }
    }
    async fileExists(path) {
        return this.entries.get(path)?.type === 'file';
    }
    async directoryExists(path) {
        return this.entries.get(path)?.type === 'directory';
    }
    async publicUrl(path, options) {
        throw new Error("Method not implemented.");
    }
    async temporaryUrl(path, options) {
        throw new Error("Method not implemented.");
    }
    async checksum(path, options) {
        if (this.entries.get(path)?.type !== 'file') {
            // throw new Error(`File ${path} does not exists`);
        }
        throw file_storage_1.ChecksumIsNotAvailable.checksumNotSupported(options.algo ?? 'unknown', {
            context: { path },
        });
    }
    async mimeType(path, options) {
        const entry = this.entries.get(path);
        if (entry?.type !== 'file') {
            throw new Error(`File ${path} does not exist`);
        }
        return await resolveMimeType(path, Buffer.from(entry.contents));
    }
    async lastModified(path) {
        const entry = this.entries.get(path);
        if (entry?.type !== 'file') {
            throw new Error(`File ${path} does not exist`);
        }
        return entry.lastModifiedMs;
    }
    async fileSize(path) {
        const entry = this.entries.get(path);
        if (entry?.type !== 'file') {
            throw new Error(`File ${path} does not exist`);
        }
        return Buffer.byteLength(entry.contents);
    }
}
exports.InMemoryStorageAdapter = InMemoryStorageAdapter;
async function resolveMimeType(filename, contents) {
    const { fileTypeFromBuffer } = await Promise.resolve().then(() => require('file-type'));
    const lookup = await fileTypeFromBuffer(contents);
    if (lookup) {
        return lookup.mime;
    }
    const { ext } = (0, node_path_1.parse)(filename);
    return (0, mime_types_1.lookup)(ext) || 'application/octet-stream';
}
/**
 * BC export
 *
 * @deprecated
 */
class InMemoryFileStorage extends InMemoryStorageAdapter {
}
exports.InMemoryFileStorage = InMemoryFileStorage;
