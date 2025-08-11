import { CopyObjectCommand, DeleteObjectCommand, DeleteObjectsCommand, GetObjectAclCommand, GetObjectCommand, HeadObjectCommand, ListObjectsV2Command, PutObjectAclCommand, PutObjectCommand, S3ServiceException, } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { join } from 'node:path';
import { ChecksumIsNotAvailable, closeReadable, FileWasNotFound, normalizeExpiryToMilliseconds, PathPrefixer, Visibility, } from '@flystorage/file-storage';
import { resolveMimeType } from '@flystorage/stream-mime-type';
import { Readable } from 'stream';
import { lookup } from 'mime-types';
const possibleChecksumAlgos = ['SHA1', 'SHA256', 'CRC32', 'CRC32C', 'ETAG'];
function isSupportedAlgo(algo) {
    return possibleChecksumAlgos.includes(algo);
}
export class DefaultAwsPublicUrlGenerator {
    async publicUrl(path, options) {
        const baseUrl = options.baseUrl ?? 'https://{subdomain}.amazonaws.com/{uri}';
        const subdomain = options.forcePathStyle !== true
            ? `${options.bucket}.s3`
            : options.region === undefined
                ? 's3'
                : `s3-${options.region}`;
        const uri = options.forcePathStyle !== true
            ? encodePath(path)
            : `${options.bucket}/${encodePath(path)}`;
        return baseUrl.replace('{subdomain}', subdomain).replace('{uri}', uri);
    }
}
/**
 * BC extension
 */
export class HostStyleAwsPublicUrlGenerator extends DefaultAwsPublicUrlGenerator {
}
/**
 * Some commands need URI encoded paths to work ¯\_(ツ)_/¯
 */
function encodePath(path) {
    return path.split('/').map(encodeURIComponent).join('/');
}
function maybeAbort(signal) {
    if (signal?.aborted) {
        throw signal.reason;
    }
}
export class AwsS3StorageAdapter {
    client;
    options;
    publicUrlGenerator;
    timestampResolver;
    prefixer;
    constructor(client, options, publicUrlGenerator = new DefaultAwsPublicUrlGenerator(), timestampResolver = () => Date.now()) {
        this.client = client;
        this.options = options;
        this.publicUrlGenerator = publicUrlGenerator;
        this.timestampResolver = timestampResolver;
        this.prefixer = new PathPrefixer(options.prefix ?? '', '/', (...paths) => {
            const path = join(...paths);
            if (path === "." || path === "/") {
                // 1) https://nodejs.org/api/path.html#pathjoinpaths
                // Zero-length path segments are ignored. If the joined path string is a zero-length string then '.' will be
                // returned, representing the current working directory.
                // 2) In S3 we use delimiter:"/". In that case we need to remove the root-slash in order to list the
                // root-directory contents.
                return "";
            }
            else {
                return path;
            }
        });
    }
    async copyFile(from, to, options) {
        maybeAbort(options.abortSignal);
        let visibility = options.visibility;
        if (visibility === undefined && options.retainVisibility) {
            visibility = await this.visibility(from, options);
            maybeAbort(options.abortSignal);
        }
        let acl = visibility ? { ACL: this.visibilityToAcl(visibility) } : {};
        await this.client.send(new CopyObjectCommand({
            Bucket: this.options.bucket,
            CopySource: join('/', this.options.bucket, encodePath(this.prefixer.prefixFilePath(from))),
            Key: this.prefixer.prefixFilePath(to),
            ...acl,
        }), { abortSignal: options.abortSignal });
    }
    async moveFile(from, to, options) {
        await this.copyFile(from, to, options);
        await this.deleteFile(from, options);
    }
    async prepareUpload(path, options) {
        maybeAbort(options.abortSignal);
        const expiry = normalizeExpiryToMilliseconds(options.expiresAt);
        const now = (this.timestampResolver)();
        const putObjectParams = {
            Bucket: this.options.bucket,
            Key: this.prefixer.prefixFilePath(path),
        };
        const headers = {};
        const contentType = options['Content-Type'] ?? options.contentType;
        if (typeof contentType === 'string') {
            putObjectParams.ContentType = contentType;
            headers['Content-Type'] = contentType;
        }
        const url = await getSignedUrl(this.client, new PutObjectCommand(putObjectParams), {
            expiresIn: Math.floor((expiry - now) / 1000),
        });
        return {
            url,
            method: 'PUT',
            provider: 'aws-s3',
            headers,
        };
    }
    async temporaryUrl(path, options) {
        maybeAbort(options.abortSignal);
        const expiry = normalizeExpiryToMilliseconds(options.expiresAt);
        const now = (this.timestampResolver)();
        const getObjectParams = {
            Bucket: this.options.bucket,
            Key: this.prefixer.prefixFilePath(path),
        };
        if (options.responseHeaders) {
            if (options.responseHeaders['Cache-Control']) {
                getObjectParams.ResponseCacheControl = options.responseHeaders['Cache-Control'];
            }
            if (options.responseHeaders['Content-Disposition']) {
                getObjectParams.ResponseContentDisposition = options.responseHeaders['Content-Disposition'];
            }
            if (options.responseHeaders['Content-Encoding']) {
                getObjectParams.ResponseContentEncoding = options.responseHeaders['Content-Encoding'];
            }
            if (options.responseHeaders['Content-Language']) {
                getObjectParams.ResponseContentLanguage = options.responseHeaders['Content-Language'];
            }
            if (options.responseHeaders['Content-Type']) {
                getObjectParams.ResponseContentType = options.responseHeaders['Content-Type'];
            }
            if (options.responseHeaders['Expires']) {
                getObjectParams.ResponseExpires = new Date(options.responseHeaders['Expires']);
            }
        }
        return await getSignedUrl(this.client, new GetObjectCommand(getObjectParams), {
            expiresIn: Math.floor((expiry - now) / 1000),
        });
    }
    async lastModified(path, options) {
        const stat = await this.stat(path, options);
        if (stat.lastModifiedMs === undefined) {
            throw new Error('Last modified is not available in stat');
        }
        return stat.lastModifiedMs;
    }
    async fileSize(path, options) {
        const stat = await this.stat(path, options);
        if (stat.isFile === false) {
            throw new Error('Path is not a file');
        }
        if (stat.size === undefined) {
            throw new Error('File size is not available in stat.');
        }
        return stat.size;
    }
    async mimeType(path, options) {
        const response = await this.stat(path, options);
        if (!response.isFile) {
            throw new Error(`Path "${path} is not a file.`);
        }
        if (response.mimeType) {
            return response.mimeType;
        }
        if (options.disallowFallback) {
            throw new Error('Mime-type not available via HeadObject');
        }
        maybeAbort(options.abortSignal);
        const method = options.fallbackMethod ?? 'path';
        const mimeType = method === 'path'
            ? lookup(path)
            : await this.lookupMimeTypeFromStream(path, options);
        if (mimeType === undefined || mimeType === false) {
            throw new Error('Unable to resolve mime-type');
        }
        return mimeType;
    }
    async visibility(path, options) {
        maybeAbort(options.abortSignal);
        const response = await this.client.send(new GetObjectAclCommand({
            Bucket: this.options.bucket,
            Key: this.prefixer.prefixFilePath(path),
        }), {
            abortSignal: options.abortSignal,
        });
        const publicRead = response.Grants?.some(grant => grant.Grantee?.URI === 'http://acs.amazonaws.com/groups/global/AllUsers'
            && grant.Permission === 'READ') ?? false;
        return publicRead ? Visibility.PUBLIC : Visibility.PRIVATE;
    }
    async *list(path, options) {
        const listing = this.listObjects(path, {
            deep: options.deep,
            includePrefixes: true,
            includeSelf: false,
            abortSignal: options.abortSignal,
        });
        for await (const { type, item } of listing) {
            if (type === 'prefix') {
                yield {
                    type: 'directory',
                    isFile: false,
                    isDirectory: true,
                    path: this.prefixer.stripDirectoryPath(item.Prefix),
                };
            }
            else {
                const path = item.Key;
                if (path.endsWith('/')) {
                    yield {
                        type: 'directory',
                        isFile: false,
                        isDirectory: true,
                        path: this.prefixer.stripDirectoryPath(path),
                    };
                }
                else {
                    yield {
                        type: 'file',
                        isFile: true,
                        isDirectory: false,
                        path: this.prefixer.stripFilePath(path),
                        size: item.Size ?? 0,
                        lastModifiedMs: item.LastModified?.getTime(),
                    };
                }
            }
        }
    }
    async *listObjects(path, options) {
        maybeAbort(options.abortSignal);
        const prefix = this.prefixer.prefixDirectoryPath(path);
        let collectedKeys = 0;
        let shouldContinue = true;
        let continuationToken = undefined;
        while (shouldContinue && (options.maxKeys === undefined || collectedKeys < options.maxKeys)) {
            maybeAbort(options.abortSignal);
            const response = await this.client.send(new ListObjectsV2Command({
                Bucket: this.options.bucket,
                Prefix: prefix,
                Delimiter: options.deep ? undefined : '/',
                ContinuationToken: continuationToken,
                MaxKeys: options.maxKeys,
            }));
            continuationToken = response.NextContinuationToken;
            shouldContinue = response.IsTruncated ?? false;
            const prefixes = options.includePrefixes ? response.CommonPrefixes ?? [] : [];
            for (const item of prefixes) {
                if ((!options.includeSelf && item.Prefix === prefix) || item.Prefix === undefined) {
                    continue;
                }
                collectedKeys++;
                yield { type: 'prefix', item };
            }
            for (const item of response.Contents ?? []) {
                if ((!options.includeSelf && item.Key === prefix) || item.Key === undefined) {
                    // not interested in itself
                    // not interested in empty prefixes
                    continue;
                }
                collectedKeys++;
                yield { type: 'object', item };
            }
        }
    }
    async read(path, options) {
        maybeAbort(options.abortSignal);
        let response;
        try {
            response = await this.client.send(new GetObjectCommand({
                Bucket: this.options.bucket,
                Key: this.prefixer.prefixFilePath(path),
            }), {
                abortSignal: options.abortSignal,
            });
        }
        catch (err) {
            if (err instanceof S3ServiceException && err.$metadata.httpStatusCode === 404) {
                throw FileWasNotFound.atLocation(path, {
                    context: { path, options },
                    cause: err,
                });
            }
            throw err;
        }
        if (response.Body instanceof Readable || response.Body instanceof ReadableStream) {
            return response.Body;
        }
        throw new Error('No response body was provided');
    }
    async stat(path, options) {
        maybeAbort(options.abortSignal);
        const response = await this.client.send(new HeadObjectCommand({
            Bucket: this.options.bucket,
            Key: this.prefixer.prefixFilePath(path),
        }), {
            abortSignal: options.abortSignal,
        });
        return {
            path,
            type: 'file',
            isDirectory: false,
            isFile: true,
            size: response.ContentLength ?? 0,
            lastModifiedMs: response.LastModified?.getTime(),
            mimeType: response.ContentType,
        };
    }
    async createDirectory(path, options) {
        const key = this.prefixer.prefixDirectoryPath(path);
        const abortSignal = options.abortSignal;
        const abortController = new AbortController();
        if (abortSignal) {
            if (abortSignal.aborted) {
                throw abortSignal.reason;
            }
            abortSignal.addEventListener('abort', () => {
                abortController.abort(abortSignal.reason);
            });
        }
        const params = this.createPutObjectParams(key, '', {
            ContentLength: 0,
            ACL: options.directoryVisibility ? this.visibilityToAcl(options.directoryVisibility) : undefined,
        });
        maybeAbort(abortSignal);
        await this.client.send(new PutObjectCommand(params), {
            abortSignal,
        });
    }
    async deleteDirectory(path) {
        // @ts-ignore because we know it will only be objects
        let itemsToDelete = this.listObjects(path, {
            deep: true,
            includeSelf: true,
            includePrefixes: false,
        });
        const flush = async (keys) => this.client.send(new DeleteObjectsCommand({
            Bucket: this.options.bucket,
            Delete: {
                Objects: keys,
            },
        }));
        let bucket = [];
        let promises = [];
        for await (const { item } of itemsToDelete) {
            bucket.push({ Key: item.Key });
            if (bucket.length > 1000) {
                promises.push(flush(bucket));
                bucket = [];
            }
        }
        if (bucket.length > 0) {
            promises.push(flush(bucket));
        }
        await Promise.all(promises);
    }
    async write(path, contents, options) {
        let mimeType = options.mimeType;
        if (mimeType === undefined) {
            [mimeType, contents] = await resolveMimeType(path, contents);
        }
        const writeOptions = {
            ACL: options.visibility ? this.visibilityToAcl(options.visibility) : undefined,
            ContentType: mimeType,
            ContentLength: options.size,
            CacheControl: options.cacheControl,
        };
        for (const option of Object.keys(options)) {
            if (isWriteOptionKey(option)) {
                const resolver = writeOptionResolvers[option];
                const value = options[option];
                if (resolver(value)) {
                    writeOptions[option] = value;
                }
            }
        }
        const abortController = new AbortController();
        if (options.abortSignal) {
            const abortSignal = options.abortSignal;
            if (abortSignal.aborted) {
                throw abortSignal.reason;
            }
            abortSignal.addEventListener('abort', () => {
                abortController.abort(abortSignal.reason);
            });
        }
        const upload = new Upload({
            client: this.client,
            params: this.createPutObjectParams(this.prefixer.prefixFilePath(path), contents, writeOptions),
            abortController,
            ...this.options.uploadConfiguration,
        });
        await upload.done();
    }
    createPutObjectParams(key, contents, options) {
        const params = {
            Bucket: this.options.bucket,
            Key: key,
            ...Object.assign({}, this.options.putObjectOptions, options),
        };
        if (contents !== '') {
            params.Body = contents;
        }
        return params;
    }
    async deleteFile(path, options) {
        maybeAbort(options.abortSignal);
        const key = this.prefixer.prefixFilePath(path);
        await this.client.send(new DeleteObjectCommand({
            Bucket: this.options.bucket,
            Key: key,
        }), {
            abortSignal: options.abortSignal,
        });
    }
    visibilityToAcl(visibility) {
        if (visibility === Visibility.PUBLIC) {
            return 'public-read';
        }
        else if (visibility === Visibility.PRIVATE) {
            return 'private';
        }
        throw new Error(`Unrecognized visibility provided; ${visibility}`);
    }
    async changeVisibility(path, visibility, options) {
        maybeAbort(options.abortSignal);
        await this.client.send(new PutObjectAclCommand({
            Bucket: this.options.bucket,
            Key: this.prefixer.prefixFilePath(path),
            ACL: this.visibilityToAcl(visibility),
        }), {
            abortSignal: options.abortSignal,
        });
    }
    async fileExists(path, options) {
        maybeAbort(options.abortSignal);
        try {
            await this.client.send(new HeadObjectCommand({
                Bucket: this.options.bucket,
                Key: this.prefixer.prefixFilePath(path),
            }), {
                abortSignal: options.abortSignal,
            });
            return true;
        }
        catch (e) {
            if (e instanceof S3ServiceException && e.$metadata.httpStatusCode === 404) {
                return false;
            }
            throw e;
        }
    }
    async directoryExists(path, options) {
        const listing = this.listObjects(path, {
            deep: true,
            includePrefixes: true,
            includeSelf: true,
            maxKeys: 1,
            abortSignal: options.abortSignal,
        });
        for await (const _item of listing) {
            return true;
        }
        return false;
    }
    async publicUrl(path, options) {
        maybeAbort(options.abortSignal);
        return this.publicUrlGenerator.publicUrl(this.prefixer.prefixFilePath(path), {
            bucket: this.options.bucket,
            ...options,
            ...this.options.publicUrlOptions,
        });
    }
    async checksum(path, options) {
        maybeAbort(options.abortSignal);
        const algo = (options.algo || this.options.defaultChecksumAlgo || 'SHA256').toUpperCase();
        if (!isSupportedAlgo(algo)) {
            throw ChecksumIsNotAvailable.checksumNotSupported(algo);
        }
        const responseKey = algo === 'ETAG' ? 'ETag' : `Checksum${algo}`;
        const response = await this.client.send(new HeadObjectCommand({
            Bucket: this.options.bucket,
            Key: this.prefixer.prefixFilePath(path),
            ...algo === 'ETAG' ? {} : { ChecksumMode: 'ENABLED' },
        }), {
            abortSignal: options.abortSignal,
        });
        const checksum = response[responseKey];
        if (checksum === undefined) {
            throw new Error(`Unable to retrieve checksum with algo ${algo}`);
        }
        return checksum.replace(/^"(.+)"$/, '$1');
    }
    async lookupMimeTypeFromStream(path, options) {
        const [mimetype, stream] = await resolveMimeType(path, Readable.from(await this.read(path, options)));
        await closeReadable(stream);
        return mimetype;
    }
}
/**
 * BC export
 *
 * @deprecated
 */
export class AwsS3FileStorage extends AwsS3StorageAdapter {
}
function isWriteOptionKey(key) {
    return Object.hasOwn(writeOptionResolvers, key);
}
export const writeOptionResolvers = {
    ChecksumCRC64NVME: function (value) {
        return typeof value === 'string';
    },
    IfMatch: function (value) {
        return typeof value === 'string';
    },
    WriteOffsetBytes: function (value) {
        return typeof value === 'string';
    },
    ChecksumSHA1: function (value) {
        return typeof value === 'string';
    },
    ChecksumSHA256: function (value) {
        return typeof value === 'string';
    },
    ChecksumCRC32: function (value) {
        return typeof value === 'string';
    },
    ChecksumCRC32C: function (value) {
        return typeof value === 'string';
    },
    CacheControl: function (value) {
        return typeof value === 'string';
    },
    ContentDisposition: function (value) {
        return typeof value === 'string';
    },
    ContentEncoding: function (value) {
        return typeof value === 'string';
    },
    ContentLanguage: function (value) {
        return typeof value === 'string';
    },
    ContentMD5: function (value) {
        return typeof value === 'string';
    },
    ContentType: function (value) {
        return typeof value === 'string';
    },
    ChecksumAlgorithm: function (value) {
        return typeof value === 'string';
    },
    Expires: function (value) {
        return value instanceof Date;
    },
    GrantFullControl: function (value) {
        return typeof value === 'string';
    },
    GrantRead: function (value) {
        return typeof value === 'string';
    },
    GrantReadACP: function (value) {
        return typeof value === 'string';
    },
    GrantWriteACP: function (value) {
        return typeof value === 'string';
    },
    Metadata: function (value) {
        return typeof value === 'object';
    },
    ServerSideEncryption: function (value) {
        return typeof value === 'string';
    },
    StorageClass: function (value) {
        return typeof value === 'string';
    },
    WebsiteRedirectLocation: function (value) {
        return typeof value === 'string';
    },
    SSECustomerAlgorithm: function (value) {
        return typeof value === 'string';
    },
    SSECustomerKey: function (value) {
        return typeof value === 'string';
    },
    SSECustomerKeyMD5: function (value) {
        return typeof value === 'string';
    },
    SSEKMSKeyId: function (value) {
        return typeof value === 'string';
    },
    SSEKMSEncryptionContext: function (value) {
        return typeof value === 'string';
    },
    BucketKeyEnabled: function (value) {
        return typeof value === 'string';
    },
    RequestPayer: function (value) {
        return typeof value === 'string';
    },
    Tagging: function (value) {
        return typeof value === 'string';
    },
    ObjectLockMode: function (value) {
        return typeof value === 'string';
    },
    ObjectLockRetainUntilDate: function (value) {
        return value instanceof Date;
    },
    ObjectLockLegalHoldStatus: function (value) {
        return typeof value === 'string';
    },
    ExpectedBucketOwner: function (value) {
        return typeof value === 'string';
    },
    IfNoneMatch: function (value) {
        return typeof value === 'string';
    },
};
