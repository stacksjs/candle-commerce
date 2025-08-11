import { ChecksumOptions, CreateDirectoryOptions, PublicUrlOptions, StatEntry, StorageAdapter, TemporaryUrlOptions, WriteOptions, CopyFileOptions, MoveFileOptions, MimeTypeOptions, UploadRequestOptions, UploadRequest, MiscellaneousOptions } from '@flystorage/file-storage';
import { Readable } from 'stream';
import { UnixVisibilityConversion } from './unix-visibility.js';
import { PreparedUploadStrategy } from '@flystorage/file-storage';
export type LocalStorageAdapterOptions = {
    rootDirectoryVisibility?: string;
    publicUrlOptions?: LocalPublicUrlOptions;
    temporaryUrlOptions?: Omit<LocalTemporaryUrlOptions, 'expiresAt'>;
};
export type LocalPublicUrlOptions = PublicUrlOptions & {
    baseUrl?: string;
};
export type LocalPublicUrlGenerator = {
    publicUrl(path: string, options: LocalPublicUrlOptions): Promise<string>;
};
export declare class BaseUrlLocalPublicUrlGenerator implements LocalPublicUrlGenerator {
    publicUrl(path: string, options: LocalPublicUrlOptions): Promise<string>;
}
export type LocalTemporaryUrlOptions = TemporaryUrlOptions & {
    baseUrl?: string;
};
export type LocalTemporaryUrlGenerator = {
    temporaryUrl(path: string, options: LocalTemporaryUrlOptions): Promise<string>;
};
export declare class FailingLocalTemporaryUrlGenerator implements LocalTemporaryUrlGenerator {
    temporaryUrl(): Promise<string>;
}
export declare class LocalStorageAdapter implements StorageAdapter {
    readonly rootDir: string;
    private readonly options;
    private readonly visibilityConversion;
    private readonly publicUrlGenerator;
    private readonly temporaryUrlGenerator;
    private readonly uploadPreparer;
    private prefixer;
    constructor(rootDir: string, options?: LocalStorageAdapterOptions, visibilityConversion?: UnixVisibilityConversion, publicUrlGenerator?: LocalPublicUrlGenerator, temporaryUrlGenerator?: LocalTemporaryUrlGenerator, uploadPreparer?: PreparedUploadStrategy);
    copyFile(from: string, to: string, options: CopyFileOptions): Promise<void>;
    moveFile(from: string, to: string, options: MoveFileOptions): Promise<void>;
    prepareUpload(path: string, options: UploadRequestOptions): Promise<UploadRequest>;
    temporaryUrl(path: string, options: TemporaryUrlOptions): Promise<string>;
    publicUrl(path: string, options: PublicUrlOptions): Promise<string>;
    mimeType(path: string, options: MimeTypeOptions): Promise<string>;
    fileSize(path: string, options: MiscellaneousOptions): Promise<number>;
    lastModified(path: string, options: MiscellaneousOptions): Promise<number>;
    list(path: string, { deep }: {
        deep: boolean;
    }): AsyncGenerator<StatEntry, any, unknown>;
    read(path: string, options: MiscellaneousOptions): Promise<Readable>;
    write(path: string, contents: Readable, options: WriteOptions): Promise<void>;
    deleteFile(path: string): Promise<void>;
    createDirectory(path: string, options: CreateDirectoryOptions): Promise<void>;
    stat(path: string, options: MiscellaneousOptions): Promise<StatEntry>;
    private doStat;
    fileExists(path: string, options: MiscellaneousOptions): Promise<boolean>;
    deleteDirectory(path: string, options: MiscellaneousOptions): Promise<void>;
    private mapStatToEntry;
    changeVisibility(path: string, visibility: string, options: MiscellaneousOptions): Promise<void>;
    visibility(path: string, options: MiscellaneousOptions): Promise<string>;
    directoryExists(path: string, options: MiscellaneousOptions): Promise<boolean>;
    private rootDirectoryCreation;
    private ensureRootDirectoryExists;
    private ensureParentDirectoryExists;
    checksum(path: string, options: ChecksumOptions): Promise<string>;
}
/**
 * BC export
 *
 * @deprecated
 */
export declare class LocalFileStorage extends LocalStorageAdapter {
}
