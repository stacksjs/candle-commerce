import { ChecksumOptions, CopyFileOptions, CreateDirectoryOptions, FileContents, MimeTypeOptions, MoveFileOptions, PublicUrlOptions, StatEntry, StorageAdapter, TemporaryUrlOptions, WriteOptions } from '@flystorage/file-storage';
import { Readable } from "node:stream";
export type TimestampResolver = () => number;
export declare class InMemoryStorageAdapter implements StorageAdapter {
    private readonly timestampResolver;
    private entries;
    constructor(timestampResolver?: TimestampResolver);
    deleteEverything(): void;
    write(path: string, contents: Readable, options: WriteOptions): Promise<void>;
    private ensureParentDirsExist;
    read(path: string): Promise<FileContents>;
    deleteFile(path: string): Promise<void>;
    createDirectory(path: string, options: CreateDirectoryOptions): Promise<void>;
    copyFile(from: string, to: string, options: CopyFileOptions): Promise<void>;
    moveFile(from: string, to: string, options: MoveFileOptions): Promise<void>;
    stat(path: string): Promise<StatEntry>;
    private mapToStatEntry;
    list(path: string, options: {
        deep: boolean;
    }): AsyncGenerator<StatEntry, void, StatEntry>;
    changeVisibility(path: string, visibility: string): Promise<void>;
    visibility(path: string): Promise<string>;
    deleteDirectory(path: string): Promise<void>;
    fileExists(path: string): Promise<boolean>;
    directoryExists(path: string): Promise<boolean>;
    publicUrl(path: string, options: PublicUrlOptions): Promise<string>;
    temporaryUrl(path: string, options: TemporaryUrlOptions): Promise<string>;
    checksum(path: string, options: ChecksumOptions): Promise<string>;
    mimeType(path: string, options: MimeTypeOptions): Promise<string>;
    lastModified(path: string): Promise<number>;
    fileSize(path: string): Promise<number>;
}
export declare function resolveMimeType(filename: string, contents: Uint8Array): Promise<string>;
/**
 * BC export
 *
 * @deprecated
 */
export declare class InMemoryFileStorage extends InMemoryStorageAdapter {
}
