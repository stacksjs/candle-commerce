import { ChecksumOptions, CopyFileOptions, CreateDirectoryOptions, FileContents, MimeTypeOptions, MiscellaneousOptions, MoveFileOptions, StatEntry, StorageAdapter, TemporaryUrlOptions, WriteOptions } from '@flystorage/file-storage';
import { Readable } from 'stream';
export type AnyAdapterMethodName = keyof StorageAdapter;
export interface ChaosStrategy {
    maybeGoNuts(method: AnyAdapterMethodName): void;
}
export declare class AlwaysThrowError implements ChaosStrategy {
    private readonly newError;
    constructor(newError: () => Error);
    maybeGoNuts(method: keyof StorageAdapter): void;
}
export declare class NeverThrowError implements ChaosStrategy {
    maybeGoNuts(method: keyof StorageAdapter): void;
}
export declare class TriggeredErrors implements ChaosStrategy {
    private triggers;
    on(method: AnyAdapterMethodName | '*', newError: () => unknown, options?: {
        after?: number;
        times?: number;
    }): void;
    clearTriggers(): void;
    maybeGoNuts(method: keyof StorageAdapter): void;
}
export declare class ChaosStorageAdapterDecorator implements StorageAdapter {
    private readonly storage;
    private readonly chaos;
    constructor(storage: StorageAdapter, chaos: ChaosStrategy);
    write(path: string, contents: Readable, options: WriteOptions): Promise<void>;
    read(path: string, options: MiscellaneousOptions): Promise<FileContents>;
    deleteFile(path: string, options: MiscellaneousOptions): Promise<void>;
    createDirectory(path: string, options: CreateDirectoryOptions): Promise<void>;
    copyFile(from: string, to: string, options: CopyFileOptions): Promise<void>;
    moveFile(from: string, to: string, options: MoveFileOptions): Promise<void>;
    stat(path: string, options: MiscellaneousOptions): Promise<StatEntry>;
    list(path: string, options: {
        deep: boolean;
    }): AsyncGenerator<StatEntry, any, unknown>;
    changeVisibility(path: string, visibility: string, options: MiscellaneousOptions): Promise<void>;
    visibility(path: string, options: MiscellaneousOptions): Promise<string>;
    deleteDirectory(path: string, options: MiscellaneousOptions): Promise<void>;
    fileExists(path: string, options: MiscellaneousOptions): Promise<boolean>;
    directoryExists(path: string, options: MiscellaneousOptions): Promise<boolean>;
    publicUrl(path: string, options: MiscellaneousOptions): Promise<string>;
    temporaryUrl(path: string, options: TemporaryUrlOptions): Promise<string>;
    checksum(path: string, options: ChecksumOptions): Promise<string>;
    mimeType(path: string, options: MimeTypeOptions): Promise<string>;
    lastModified(path: string, options: MiscellaneousOptions): Promise<number>;
    fileSize(path: string, options: MiscellaneousOptions): Promise<number>;
}
