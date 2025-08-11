import { ChecksumIsNotAvailable, readableToBuffer, } from '@flystorage/file-storage';
import { Readable } from "node:stream";
import { dirname, parse } from 'node:path';
import { lookup as mimeTimeForExt } from "mime-types";
function cloneBuffer(input) {
    const output = Buffer.alloc(input.length);
    input.copy(output);
    return output;
}
export class InMemoryStorageAdapter {
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
            contents: await readableToBuffer(contents),
            lastModifiedMs: this.timestampResolver(),
            visibility: options.visibility,
        });
    }
    ensureParentDirsExist(path, options) {
        let parentDir = dirname(path);
        while (!['.', ''].includes(parentDir) && !this.entries.has(parentDir)) {
            this.entries.set(parentDir, {
                path: parentDir,
                type: 'directory',
                visibility: options.directoryVisibility,
            });
            parentDir = dirname(parentDir);
        }
    }
    async read(path) {
        const file = this.entries.get(path);
        if (file?.type !== 'file') {
            throw new Error(`Path "${path}" is not a file`);
        }
        return Readable.from(cloneBuffer(file.contents));
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
        throw ChecksumIsNotAvailable.checksumNotSupported(options.algo ?? 'unknown', {
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
export async function resolveMimeType(filename, contents) {
    const { fileTypeFromBuffer } = await import('file-type');
    const lookup = await fileTypeFromBuffer(contents);
    if (lookup) {
        return lookup.mime;
    }
    const { ext } = parse(filename);
    return mimeTimeForExt(ext) || 'application/octet-stream';
}
/**
 * BC export
 *
 * @deprecated
 */
export class InMemoryFileStorage extends InMemoryStorageAdapter {
}
