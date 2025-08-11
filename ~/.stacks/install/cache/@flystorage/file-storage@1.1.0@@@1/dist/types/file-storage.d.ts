import { BinaryToTextEncoding } from 'crypto';
import { Readable } from 'stream';
import { PathNormalizer } from './path-normalizer.js';
export type CommonStatInfo = Readonly<{
    path: string;
    lastModifiedMs?: number;
    visibility?: string;
}>;
export type FileInfo = Readonly<{
    type: 'file';
    size?: number;
    isFile: true;
    isDirectory: false;
    mimeType?: string;
} & CommonStatInfo>;
export type DirectoryInfo = Readonly<{
    type: 'directory';
    isFile: false;
    isDirectory: true;
} & CommonStatInfo>;
export declare function isFile(stat: StatEntry): stat is FileInfo;
export declare function isDirectory(stat: StatEntry): stat is DirectoryInfo;
export type StatEntry = FileInfo | DirectoryInfo;
export type AdapterListOptions = ListOptions & {
    deep: boolean;
};
export interface StorageAdapter {
    write(path: string, contents: Readable, options: WriteOptions): Promise<void>;
    read(path: string, options: MiscellaneousOptions): Promise<FileContents>;
    deleteFile(path: string, options: MiscellaneousOptions): Promise<void>;
    createDirectory(path: string, options: CreateDirectoryOptions): Promise<void>;
    copyFile(from: string, to: string, options: CopyFileOptions): Promise<void>;
    moveFile(from: string, to: string, options: MoveFileOptions): Promise<void>;
    stat(path: string, options: MiscellaneousOptions): Promise<StatEntry>;
    list(path: string, options: AdapterListOptions): AsyncGenerator<StatEntry>;
    changeVisibility(path: string, visibility: string, options: MiscellaneousOptions): Promise<void>;
    visibility(path: string, options: MiscellaneousOptions): Promise<string>;
    deleteDirectory(path: string, options: MiscellaneousOptions): Promise<void>;
    fileExists(path: string, options: MiscellaneousOptions): Promise<boolean>;
    directoryExists(path: string, options: MiscellaneousOptions): Promise<boolean>;
    publicUrl(path: string, options: PublicUrlOptions): Promise<string>;
    temporaryUrl(path: string, options: TemporaryUrlOptions): Promise<string>;
    prepareUpload?(path: string, options: UploadRequestOptions): Promise<UploadRequest>;
    checksum(path: string, options: ChecksumOptions): Promise<string>;
    mimeType(path: string, options: MimeTypeOptions): Promise<string>;
    lastModified(path: string, options: MiscellaneousOptions): Promise<number>;
    fileSize(path: string, options: MiscellaneousOptions): Promise<number>;
}
export declare class DirectoryListing implements AsyncIterable<StatEntry> {
    private readonly listing;
    private readonly path;
    private readonly deep;
    constructor(listing: AsyncGenerator<StatEntry>, path: string, deep: boolean);
    toArray(sorted?: boolean): Promise<StatEntry[]>;
    filter(filter: (entry: StatEntry) => boolean): DirectoryListing;
    [Symbol.asyncIterator](): AsyncGenerator<StatEntry, void, unknown>;
}
export type FileContents = Iterable<any> | AsyncIterable<any> | NodeJS.ReadableStream | Readable | string;
export type TimeoutOptions = {
    timout?: number;
};
export type MiscellaneousOptions = TimeoutOptions & {
    [option: string]: any;
    abortSignal?: AbortSignal;
};
export type MimeTypeOptions = MiscellaneousOptions & {
    disallowFallback?: boolean;
    fallbackMethod?: 'contents' | 'path';
};
export type VisibilityOptions = {
    visibility?: string;
    directoryVisibility?: string;
};
export type WriteOptions = VisibilityOptions & MiscellaneousOptions & {
    mimeType?: string;
    size?: number;
    cacheControl?: string;
};
export type CreateDirectoryOptions = MiscellaneousOptions & Pick<VisibilityOptions, 'directoryVisibility'> & {};
export type PublicUrlOptions = MiscellaneousOptions & {};
export type UploadRequestOptions = MiscellaneousOptions & {
    expiresAt: ExpiresAt;
    contentType?: string;
    headers?: UploadRequestHeaders;
};
export type CopyFileOptions = MiscellaneousOptions & VisibilityOptions & {
    retainVisibility?: boolean;
};
export type MoveFileOptions = MiscellaneousOptions & VisibilityOptions & {
    retainVisibility?: boolean;
};
export type ListOptions = MiscellaneousOptions & {
    deep?: boolean;
};
export type TemporaryUrlOptions = MiscellaneousOptions & {
    expiresAt: ExpiresAt;
    responseHeaders?: {
        [header: string]: string;
    };
};
export type ChecksumOptions = MiscellaneousOptions & {
    algo?: string;
    encoding?: BinaryToTextEncoding;
};
export type ConfigurationOptions = {
    visibility?: VisibilityOptions;
    writes?: WriteOptions;
    moves?: MoveFileOptions;
    copies?: CopyFileOptions;
    publicUrls?: PublicUrlOptions;
    temporaryUrls?: TemporaryUrlOptions;
    uploadRequest?: UploadRequestOptions;
    checksums?: ChecksumOptions;
    mimeTypes?: MimeTypeOptions;
    preparedUploadStrategy?: PreparedUploadStrategy;
    timeout?: TimeoutOptions;
};
export declare function toReadable(contents: FileContents): Readable;
export declare class FileStorage {
    private readonly adapter;
    private readonly pathNormalizer;
    private readonly options;
    constructor(adapter: StorageAdapter, pathNormalizer?: PathNormalizer, options?: ConfigurationOptions);
    write(path: string, contents: FileContents, options?: WriteOptions): Promise<void>;
    read(path: string, options?: MiscellaneousOptions): Promise<Readable>;
    readToString(path: string, options?: MiscellaneousOptions): Promise<string>;
    readToUint8Array(path: string, options?: MiscellaneousOptions): Promise<Uint8Array>;
    readToBuffer(path: string, options?: MiscellaneousOptions): Promise<Buffer>;
    deleteFile(path: string, options?: MiscellaneousOptions): Promise<void>;
    createDirectory(path: string, options?: CreateDirectoryOptions): Promise<void>;
    deleteDirectory(path: string, options?: MiscellaneousOptions): Promise<void>;
    stat(path: string, options?: MiscellaneousOptions): Promise<StatEntry>;
    moveFile(from: string, to: string, options?: MoveFileOptions): Promise<void>;
    copyFile(from: string, to: string, options?: CopyFileOptions): Promise<void>;
    changeVisibility(path: string, visibility: string, options?: MiscellaneousOptions): Promise<void>;
    visibility(path: string, options?: MiscellaneousOptions): Promise<string>;
    fileExists(path: string, options?: MiscellaneousOptions): Promise<boolean>;
    list(path: string, options?: ListOptions): DirectoryListing;
    statFile(path: string, options?: MiscellaneousOptions): Promise<FileInfo>;
    directoryExists(path: string, options?: MiscellaneousOptions): Promise<boolean>;
    publicUrl(path: string, options?: PublicUrlOptions): Promise<string>;
    temporaryUrl(path: string, options: TemporaryUrlOptions): Promise<string>;
    prepareUpload(path: string, options: UploadRequestOptions): Promise<UploadRequest>;
    checksum(path: string, options?: ChecksumOptions): Promise<string>;
    mimeType(path: string, options?: MimeTypeOptions): Promise<string>;
    lastModified(path: string, options?: MiscellaneousOptions): Promise<number>;
    fileSize(path: string, options?: MiscellaneousOptions): Promise<number>;
    private calculateChecksum;
}
export type TimestampMs = number;
export type ExpiresAt = Date | TimestampMs;
export declare function normalizeExpiryToDate(expiresAt: ExpiresAt): Date;
export declare function normalizeExpiryToMilliseconds(expiresAt: ExpiresAt): number;
export declare function closeReadable(body: Readable): Promise<void>;
export declare function readableToString(stream: Readable): Promise<string>;
export declare function readableToBuffer(stream: Readable): Promise<Buffer>;
export declare function readableToUint8Array(stream: Readable): Promise<Uint8Array>;
export type UploadRequestHeaders = Record<string, string | ReadonlyArray<string>>;
export type UploadRequest = {
    url: string;
    provider?: string;
    method: 'PUT' | 'POST';
    headers: UploadRequestHeaders;
};
export interface PreparedUploadStrategy {
    prepareUpload(path: string, options: UploadRequestOptions): Promise<UploadRequest>;
}
export declare class PreparedUploadsAreNotSupported implements PreparedUploadStrategy {
    prepareUpload(): Promise<UploadRequest>;
}
