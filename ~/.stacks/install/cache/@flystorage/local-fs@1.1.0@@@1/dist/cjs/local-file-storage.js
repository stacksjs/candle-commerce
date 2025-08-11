"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalFileStorage = exports.LocalStorageAdapter = exports.FailingLocalTemporaryUrlGenerator = exports.BaseUrlLocalPublicUrlGenerator = void 0;
const file_storage_1 = require("@flystorage/file-storage");
const mime_types_1 = require("mime-types");
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const promises_2 = require("stream/promises");
const unix_visibility_js_1 = require("./unix-visibility.js");
const dynamic_import_1 = require("@flystorage/dynamic-import");
const file_storage_2 = require("@flystorage/file-storage");
const node_stream_1 = require("node:stream");
class BaseUrlLocalPublicUrlGenerator {
    async publicUrl(path, options) {
        if (options.baseUrl === undefined) {
            throw new Error('No base URL defined for public URL generation');
        }
        const base = options.baseUrl.endsWith('/') ? options.baseUrl : `${options.baseUrl}/`;
        if (node_path_1.posix.sep === '\\' && path.includes(node_path_1.posix.sep)) {
            path = path.replace(node_path_1.posix.sep, '/');
        }
        return `${base}${path}`;
    }
}
exports.BaseUrlLocalPublicUrlGenerator = BaseUrlLocalPublicUrlGenerator;
class FailingLocalTemporaryUrlGenerator {
    async temporaryUrl() {
        throw new Error('No temporary URL generator provided');
    }
}
exports.FailingLocalTemporaryUrlGenerator = FailingLocalTemporaryUrlGenerator;
let fileTypeImport;
let fileTypes = undefined;
function maybeAbort(signal) {
    if (signal?.aborted) {
        throw signal.reason;
    }
}
class LocalStorageAdapter {
    rootDir;
    options;
    visibilityConversion;
    publicUrlGenerator;
    temporaryUrlGenerator;
    uploadPreparer;
    prefixer;
    constructor(rootDir, options = {}, visibilityConversion = new unix_visibility_js_1.PortableUnixVisibilityConversion(), publicUrlGenerator = new BaseUrlLocalPublicUrlGenerator(), temporaryUrlGenerator = new FailingLocalTemporaryUrlGenerator(), uploadPreparer = new file_storage_2.PreparedUploadsAreNotSupported()) {
        this.rootDir = rootDir;
        this.options = options;
        this.visibilityConversion = visibilityConversion;
        this.publicUrlGenerator = publicUrlGenerator;
        this.temporaryUrlGenerator = temporaryUrlGenerator;
        this.uploadPreparer = uploadPreparer;
        this.rootDir = node_path_1.posix.join(this.rootDir, node_path_1.posix.sep);
        this.prefixer = new file_storage_1.PathPrefixer(this.rootDir, node_path_1.posix.sep, node_path_1.posix.join);
    }
    async copyFile(from, to, options) {
        maybeAbort(options.abortSignal);
        await this.ensureRootDirectoryExists();
        maybeAbort(options.abortSignal);
        await this.ensureParentDirectoryExists(to, options);
        maybeAbort(options.abortSignal);
        await (0, promises_1.copyFile)(this.prefixer.prefixFilePath(from), this.prefixer.prefixFilePath(to));
    }
    async moveFile(from, to, options) {
        maybeAbort(options.abortSignal);
        await this.ensureRootDirectoryExists();
        maybeAbort(options.abortSignal);
        await this.ensureParentDirectoryExists(to, options);
        maybeAbort(options.abortSignal);
        await (0, promises_1.rename)(this.prefixer.prefixFilePath(from), this.prefixer.prefixFilePath(to));
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
            fileTypeImport = (0, dynamic_import_1.dynamicallyImport)('file-type');
        }
        if (fileTypes === undefined) {
            fileTypes = await fileTypeImport;
            maybeAbort(options.abortSignal);
        }
        const { fileTypeFromFile, supportedExtensions } = fileTypes;
        const extension = (0, node_path_1.extname)(path);
        if (!supportedExtensions.has(extension)) {
            const mimetype = (0, mime_types_1.lookup)(extension);
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
        let entries = await (0, promises_1.opendir)(this.prefixer.prefixDirectoryPath(path), {
            recursive: deep,
        });
        for await (const item of entries) {
            const itemPath = node_path_1.posix.join(item.parentPath, item.name);
            yield this.mapStatToEntry(item, item.isFile()
                ? this.prefixer.stripFilePath(itemPath)
                : this.prefixer.stripDirectoryPath(itemPath));
        }
    }
    async read(path, options) {
        const readStream = (0, node_fs_1.createReadStream)(this.prefixer.prefixFilePath(path));
        const errorProxy = new node_stream_1.PassThrough();
        readStream.on('error', error => {
            readStream.unpipe(errorProxy);
            if (error.message?.includes('ENOENT')) {
                errorProxy.destroy(file_storage_1.FileWasNotFound.atLocation(path, {
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
        const writeStream = (0, node_fs_1.createWriteStream)(this.prefixer.prefixFilePath(path), {
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
        await (0, promises_2.pipeline)(contents, writeStream);
    }
    async deleteFile(path) {
        await (0, promises_1.rm)(this.prefixer.prefixFilePath(path), {
            force: true,
        });
    }
    async createDirectory(path, options) {
        await (0, promises_1.mkdir)(this.prefixer.prefixDirectoryPath(path), {
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
        return this.mapStatToEntry(await (0, promises_1.stat)(type === 'file'
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
        await (0, promises_1.rm)(this.prefixer.prefixDirectoryPath(path), {
            recursive: true,
            force: true,
        });
    }
    mapStatToEntry(info, path) {
        if (!info.isFile() && !info.isDirectory()) {
            throw new Error('Unsupported file entry encountered...');
        }
        const isDirent = info instanceof node_fs_1.Dirent;
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
        await (0, promises_1.chmod)(this.prefixer.prefixFilePath(path), this.visibilityConversion.visibilityToFilePermissions(visibility));
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
        const directoryName = node_path_1.posix.dirname(path);
        if (directoryName !== '.' && directoryName !== '/') {
            await this.createDirectory(directoryName, {
                directoryVisibility: options.directoryVisibility,
            });
        }
    }
    async checksum(path, options) {
        maybeAbort(options.abortSignal);
        return (0, file_storage_1.checksumFromStream)(await this.read(path, options), options);
    }
}
exports.LocalStorageAdapter = LocalStorageAdapter;
/**
 * BC export
 *
 * @deprecated
 */
class LocalFileStorage extends LocalStorageAdapter {
}
exports.LocalFileStorage = LocalFileStorage;
