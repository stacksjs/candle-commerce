import { checksumFromStream, PathPrefixer, FileWasNotFound, } from '@flystorage/file-storage';
import { lookup } from "mime-types";
import { createReadStream, createWriteStream, Dirent } from 'node:fs';
import { chmod, mkdir, opendir, rm, stat, rename, copyFile } from 'node:fs/promises';
import { posix, extname } from 'node:path';
import { pipeline } from 'stream/promises';
import { PortableUnixVisibilityConversion } from './unix-visibility.js';
import { dynamicallyImport } from '@flystorage/dynamic-import';
import { PreparedUploadsAreNotSupported } from '@flystorage/file-storage';
import { PassThrough } from 'node:stream';
export class BaseUrlLocalPublicUrlGenerator {
    async publicUrl(path, options) {
        if (options.baseUrl === undefined) {
            throw new Error('No base URL defined for public URL generation');
        }
        const base = options.baseUrl.endsWith('/') ? options.baseUrl : `${options.baseUrl}/`;
        if (posix.sep === '\\' && path.includes(posix.sep)) {
            path = path.replace(posix.sep, '/');
        }
        return `${base}${path}`;
    }
}
export class FailingLocalTemporaryUrlGenerator {
    async temporaryUrl() {
        throw new Error('No temporary URL generator provided');
    }
}
let fileTypeImport;
let fileTypes = undefined;
function maybeAbort(signal) {
    if (signal?.aborted) {
        throw signal.reason;
    }
}
export class LocalStorageAdapter {
    rootDir;
    options;
    visibilityConversion;
    publicUrlGenerator;
    temporaryUrlGenerator;
    uploadPreparer;
    prefixer;
    constructor(rootDir, options = {}, visibilityConversion = new PortableUnixVisibilityConversion(), publicUrlGenerator = new BaseUrlLocalPublicUrlGenerator(), temporaryUrlGenerator = new FailingLocalTemporaryUrlGenerator(), uploadPreparer = new PreparedUploadsAreNotSupported()) {
        this.rootDir = rootDir;
        this.options = options;
        this.visibilityConversion = visibilityConversion;
        this.publicUrlGenerator = publicUrlGenerator;
        this.temporaryUrlGenerator = temporaryUrlGenerator;
        this.uploadPreparer = uploadPreparer;
        this.rootDir = posix.join(this.rootDir, posix.sep);
        this.prefixer = new PathPrefixer(this.rootDir, posix.sep, posix.join);
    }
    async copyFile(from, to, options) {
        maybeAbort(options.abortSignal);
        await this.ensureRootDirectoryExists();
        maybeAbort(options.abortSignal);
        await this.ensureParentDirectoryExists(to, options);
        maybeAbort(options.abortSignal);
        await copyFile(this.prefixer.prefixFilePath(from), this.prefixer.prefixFilePath(to));
    }
    async moveFile(from, to, options) {
        maybeAbort(options.abortSignal);
        await this.ensureRootDirectoryExists();
        maybeAbort(options.abortSignal);
        await this.ensureParentDirectoryExists(to, options);
        maybeAbort(options.abortSignal);
        await rename(this.prefixer.prefixFilePath(from), this.prefixer.prefixFilePath(to));
    }
    prepareUpload(path, options) {
        maybeAbort(options.abortSignal);
        return this.uploadPreparer.prepareUpload(path, options);
    }
    temporaryUrl(path, options) {
        maybeAbort(options.abortSignal);
        return this.temporaryUrlGenerator.temporaryUrl(path, { ...this.options.temporaryUrlOptions, ...options });
    }
    publicUrl(path, options) {
        maybeAbort(options.abortSignal);
        return this.publicUrlGenerator.publicUrl(path, { ...this.options.publicUrlOptions, ...options });
    }
    async mimeType(path, options) {
        maybeAbort(options.abortSignal);
        if (fileTypeImport === undefined) {
            fileTypeImport = import('file-type');
        }
        if (fileTypes === undefined) {
            fileTypes = await fileTypeImport;
            maybeAbort(options.abortSignal);
        }
        const { fileTypeFromFile, supportedExtensions } = fileTypes;
        const extension = extname(path);
        if (!supportedExtensions.has(extension)) {
            const mimetype = lookup(extension);
            if (mimetype === false) {
                throw new Error('Unable to resolve mime-type');
            }
            return mimetype;
        }
        const location = this.prefixer.prefixFilePath(path);
        const result = await fileTypeFromFile(location);
        if (result === undefined) {
            throw new Error('Unable to resolve mime-type');
        }
        return result.mime;
    }
    async fileSize(path, options) {
        maybeAbort(options.abortSignal);
        const stat = await this.doStat(path, 'file');
        if (!stat.isFile) {
            throw new Error(`Path ${path} is not a file.`);
        }
        if (stat.size === undefined) {
            throw new Error('Stat unexpectedly did not return file size.');
        }
        return stat.size;
    }
    async lastModified(path, options) {
        const stat = await this.doStat(path, 'file');
        if (!stat.isFile) {
            throw new Error(`Path ${path} is not a file.`);
        }
        if (stat.lastModifiedMs === undefined) {
            throw new Error('Stat unexpectedly did not return last modified.');
        }
        return stat.lastModifiedMs;
    }
    async *list(path, { deep }) {
        let entries = await opendir(this.prefixer.prefixDirectoryPath(path), {
            recursive: deep,
        });
        for await (const item of entries) {
            const itemPath = posix.join(item.parentPath, item.name);
            yield this.mapStatToEntry(item, item.isFile()
                ? this.prefixer.stripFilePath(itemPath)
                : this.prefixer.stripDirectoryPath(itemPath));
        }
    }
    async read(path, options) {
        const readStream = createReadStream(this.prefixer.prefixFilePath(path));
        const errorProxy = new PassThrough();
        readStream.on('error', error => {
            readStream.unpipe(errorProxy);
            if (error.message?.includes('ENOENT')) {
                errorProxy.destroy(FileWasNotFound.atLocation(path, {
                    cause: error,
                    context: { path, options },
                }));
            }
            else {
                errorProxy.destroy(error);
            }
        });
        readStream.pipe(errorProxy);
        return errorProxy;
    }
    async write(path, contents, options) {
        maybeAbort(options?.abortSignal);
        await this.ensureRootDirectoryExists();
        maybeAbort(options?.abortSignal);
        await this.ensureParentDirectoryExists(path, options);
        maybeAbort(options?.abortSignal);
        const writeStream = createWriteStream(this.prefixer.prefixFilePath(path), {
            flags: 'w+',
            mode: options.visibility
                ? this.visibilityConversion.visibilityToFilePermissions(options.visibility)
                : undefined,
        });
        if (options.abortSignal) {
            const signal = options.abortSignal;
            signal.addEventListener('abort', event => {
                contents.destroy(signal.reason);
                writeStream.destroy(signal.reason);
            });
        }
        await pipeline(contents, writeStream);
    }
    async deleteFile(path) {
        await rm(this.prefixer.prefixFilePath(path), {
            force: true,
        });
    }
    async createDirectory(path, options) {
        await mkdir(this.prefixer.prefixDirectoryPath(path), {
            recursive: true,
            mode: options.directoryVisibility
                ? this.visibilityConversion.visibilityToDirectoryPermissions(options.directoryVisibility)
                : undefined,
        });
    }
    async stat(path, options) {
        maybeAbort(options.abortSignal);
        return this.doStat(path, 'file');
    }
    async doStat(path, type = 'file') {
        return this.mapStatToEntry(await stat(type === 'file'
            ? this.prefixer.prefixFilePath(path)
            : this.prefixer.prefixDirectoryPath(path)), path);
    }
    async fileExists(path, options) {
        maybeAbort(options.abortSignal);
        try {
            const stat = await this.doStat(path, 'file');
            return stat.isFile;
        }
        catch (e) {
            if (typeof e === 'object' && e.code === 'ENOENT') {
                return false;
            }
            throw e;
        }
    }
    async deleteDirectory(path, options) {
        maybeAbort(options.abortSignal);
        await rm(this.prefixer.prefixDirectoryPath(path), {
            recursive: true,
            force: true,
        });
    }
    mapStatToEntry(info, path) {
        if (!info.isFile() && !info.isDirectory()) {
            throw new Error('Unsupported file entry encountered...');
        }
        const isDirent = info instanceof Dirent;
        return info.isFile() ? {
            path,
            type: 'file',
            isFile: true,
            isDirectory: false,
            visibility: isDirent ? undefined : this.visibilityConversion.filePermissionsToVisibility(info.mode & 0o777),
            lastModifiedMs: isDirent ? undefined : info.mtimeMs,
            size: isDirent ? undefined : info.size,
        } : {
            path,
            type: 'directory',
            isFile: false,
            isDirectory: true,
            visibility: isDirent ? undefined : this.visibilityConversion.directoryPermissionsToVisibility(info.mode & 0o777),
            lastModifiedMs: isDirent ? undefined : info.mtimeMs,
        };
    }
    async changeVisibility(path, visibility, options) {
        maybeAbort(options.abortSignal);
        await chmod(this.prefixer.prefixFilePath(path), this.visibilityConversion.visibilityToFilePermissions(visibility));
    }
    async visibility(path, options) {
        maybeAbort(options.abortSignal);
        const stat = await this.doStat(path, 'file');
        if (!stat.visibility) {
            throw new Error('Unable to determine visibility');
        }
        return stat.visibility;
    }
    async directoryExists(path, options) {
        maybeAbort(options.abortSignal);
        try {
            const stat = await this.doStat(path, 'directory');
            return stat.isDirectory;
        }
        catch (e) {
            if (typeof e === 'object' && ['ENOTDIR', 'ENOENT'].includes(e.code)) {
                return false;
            }
            throw e;
        }
    }
    rootDirectoryCreation = undefined;
    async ensureRootDirectoryExists() {
        if (this.rootDirectoryCreation === undefined) {
            this.rootDirectoryCreation = this.createDirectory('', {
                directoryVisibility: this.options.rootDirectoryVisibility ?? this.visibilityConversion.defaultDirectoryVisibility,
            });
        }
        return await this.rootDirectoryCreation;
    }
    async ensureParentDirectoryExists(path, options) {
        const directoryName = posix.dirname(path);
        if (directoryName !== '.' && directoryName !== '/') {
            await this.createDirectory(directoryName, {
                directoryVisibility: options.directoryVisibility,
            });
        }
    }
    async checksum(path, options) {
        maybeAbort(options.abortSignal);
        return checksumFromStream(await this.read(path, options), options);
    }
}
/**
 * BC export
 *
 * @deprecated
 */
export class LocalFileStorage extends LocalStorageAdapter {
}
