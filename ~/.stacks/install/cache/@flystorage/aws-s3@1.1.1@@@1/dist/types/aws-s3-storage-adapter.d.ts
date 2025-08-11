import { _Object, CommonPrefix, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { Configuration } from '@aws-sdk/lib-storage';
import { AdapterListOptions, ChecksumOptions, CopyFileOptions, CreateDirectoryOptions, FileContents, MimeTypeOptions, MiscellaneousOptions, MoveFileOptions, PublicUrlOptions, StatEntry, StorageAdapter, TemporaryUrlOptions, UploadRequest, UploadRequestOptions, WriteOptions } from '@flystorage/file-storage';
import { Readable } from 'stream';
type PutObjectOptions = Omit<PutObjectCommandInput, 'Bucket' | 'Key' | 'Body'>;
export type WriteOptionsForS3 = Omit<PutObjectOptions, 'ACL' | 'ContentLength'>;
declare const possibleChecksumAlgos: readonly ["SHA1", "SHA256", "CRC32", "CRC32C", "ETAG"];
type ChecksumAlgo = typeof possibleChecksumAlgos[number];
export type AwsS3StorageAdapterOptions = Readonly<{
    bucket: string;
    prefix?: string;
    region?: string;
    publicUrlOptions?: PublicUrlOptions;
    uploadRequestOptions?: UploadRequestOptions;
    putObjectOptions?: PutObjectOptions;
    uploadConfiguration?: Partial<Omit<Configuration, 'abortController'>>;
    defaultChecksumAlgo?: ChecksumAlgo;
}>;
export type AwsPublicUrlOptions = PublicUrlOptions & {
    bucket: string;
    region?: string;
    forcePathStyle?: boolean;
    baseUrl?: string;
};
export type AwsPublicUrlGenerator = {
    publicUrl(path: string, options: AwsPublicUrlOptions): Promise<string>;
};
export declare class DefaultAwsPublicUrlGenerator implements AwsPublicUrlGenerator {
    publicUrl(path: string, options: AwsPublicUrlOptions): Promise<string>;
}
/**
 * BC extension
 */
export declare class HostStyleAwsPublicUrlGenerator extends DefaultAwsPublicUrlGenerator {
}
export type TimestampResolver = () => number;
export declare class AwsS3StorageAdapter implements StorageAdapter {
    private readonly client;
    private readonly options;
    private readonly publicUrlGenerator;
    private readonly timestampResolver;
    private readonly prefixer;
    constructor(client: S3Client, options: AwsS3StorageAdapterOptions, publicUrlGenerator?: AwsPublicUrlGenerator, timestampResolver?: TimestampResolver);
    copyFile(from: string, to: string, options: CopyFileOptions): Promise<void>;
    moveFile(from: string, to: string, options: MoveFileOptions): Promise<void>;
    prepareUpload(path: string, options: UploadRequestOptions): Promise<UploadRequest>;
    temporaryUrl(path: string, options: TemporaryUrlOptions): Promise<string>;
    lastModified(path: string, options: MiscellaneousOptions): Promise<number>;
    fileSize(path: string, options: MiscellaneousOptions): Promise<number>;
    mimeType(path: string, options: MimeTypeOptions): Promise<string>;
    visibility(path: string, options: MiscellaneousOptions): Promise<string>;
    list(path: string, options: AdapterListOptions): AsyncGenerator<StatEntry, any, unknown>;
    listObjects(path: string, options: {
        deep: boolean;
        includePrefixes: boolean;
        includeSelf: boolean;
        maxKeys?: number;
        abortSignal?: AbortSignal;
    }): AsyncGenerator<{
        type: 'prefix';
        item: CommonPrefix;
    } | {
        type: 'object';
        item: _Object;
    }, any, unknown>;
    read(path: string, options: MiscellaneousOptions): Promise<FileContents>;
    stat(path: string, options: MiscellaneousOptions): Promise<StatEntry>;
    createDirectory(path: string, options: CreateDirectoryOptions): Promise<void>;
    deleteDirectory(path: string): Promise<void>;
    write(path: string, contents: Readable, options: WriteOptions): Promise<void>;
    private createPutObjectParams;
    deleteFile(path: string, options: MiscellaneousOptions): Promise<void>;
    private visibilityToAcl;
    changeVisibility(path: string, visibility: string, options: MiscellaneousOptions): Promise<void>;
    fileExists(path: string, options: MiscellaneousOptions): Promise<boolean>;
    directoryExists(path: string, options: MiscellaneousOptions): Promise<boolean>;
    publicUrl(path: string, options: PublicUrlOptions): Promise<string>;
    checksum(path: string, options: ChecksumOptions): Promise<string>;
    private lookupMimeTypeFromStream;
}
/**
 * BC export
 *
 * @deprecated
 */
export declare class AwsS3FileStorage extends AwsS3StorageAdapter {
}
type ResolversForWriteOptions = {
    [K in keyof WriteOptionsForS3]-?: (value: any) => value is WriteOptionsForS3[K];
};
export declare const writeOptionResolvers: ResolversForWriteOptions;
export {};
