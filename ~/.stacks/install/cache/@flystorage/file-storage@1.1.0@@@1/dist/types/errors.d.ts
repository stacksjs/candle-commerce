export type ErrorContext = {
    [index: string]: any;
};
export type OperationError = Error & {
    readonly code: string;
    readonly context: ErrorContext;
};
export declare function errorToMessage(error: unknown): string;
export declare abstract class FlystorageError extends Error implements OperationError {
    readonly context: ErrorContext;
    readonly code: string;
    constructor(message: string, context?: ErrorContext, cause?: unknown);
}
/**
 * Thrown when the checksum algo is not supported or not pre-computed. This error
 * is thrown with the intention of falling back to computing it based on a file read.
 */
export declare class ChecksumIsNotAvailable extends FlystorageError {
    readonly algo: string;
    readonly code = "flystorage.checksum_not_supported";
    constructor(message: string, algo: string, context?: ErrorContext, cause?: unknown);
    static checksumNotSupported: (algo: string, { context, cause }?: {
        context?: ErrorContext;
        cause?: unknown;
    }) => ChecksumIsNotAvailable;
    static isErrorOfType(error: unknown): error is ChecksumIsNotAvailable;
}
export declare class UnableToGetChecksum extends FlystorageError {
    readonly code = "flystorage.unable_to_get_checksum";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToGetChecksum;
}
export declare class UnableToGetMimeType extends FlystorageError {
    readonly code = "flystorage.unable_to_get_mimetype";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToGetMimeType;
}
export declare class UnableToGetLastModified extends FlystorageError {
    readonly code = "flystorage.unable_to_get_last_modified";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToGetLastModified;
}
export declare class UnableToGetFileSize extends FlystorageError {
    readonly code = "flystorage.unable_to_get_file_size";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToGetFileSize;
}
export declare class UnableToWriteFile extends FlystorageError {
    readonly code = "flystorage.unable_to_write_file";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToWriteFile;
}
export declare class UnableToReadFile extends FlystorageError {
    readonly wasFileNotFound: boolean;
    readonly context: ErrorContext;
    readonly code = "flystorage.unable_to_read_file";
    constructor(wasFileNotFound: boolean, message: string, context?: ErrorContext, cause?: unknown);
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToReadFile;
    static becauseFileWasNotFound: (error: FileWasNotFound) => UnableToReadFile;
}
export declare class FileWasNotFound extends FlystorageError {
    readonly code = "flystorage.file_was_not_found";
    static atLocation: (location: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => FileWasNotFound;
}
export declare function isFileWasNotFound(error: unknown): error is FileWasNotFound;
export declare class UnableToSetVisibility extends FlystorageError {
    readonly code = "flystorage.unable_to_set_visibility";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToSetVisibility;
}
export declare class UnableToGetVisibility extends FlystorageError {
    readonly code = "flystorage.unable_to_get_visibility";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToGetVisibility;
}
export declare class UnableToGetPublicUrl extends FlystorageError {
    readonly code = "flystorage.unable_to_get_public_url";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToGetPublicUrl;
}
export declare class UnableToGetTemporaryUrl extends FlystorageError {
    readonly code = "flystorage.unable_to_get_temporary_url";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToGetTemporaryUrl;
}
export declare class UnableToPrepareUploadRequest extends FlystorageError {
    readonly code = "flystorage.unable_to_prepare_upload_request";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToGetTemporaryUrl;
}
export declare class UnableToCopyFile extends FlystorageError {
    readonly code = "flystorage.unable_to_copy_file";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToCopyFile;
}
export declare class UnableToMoveFile extends FlystorageError {
    readonly code = "flystorage.unable_to_move_file";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToMoveFile;
}
export declare class UnableToGetStat extends FlystorageError {
    readonly code = "flystorage.unable_to_get_stat";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToGetStat;
    static noFileStatResolved: ({ context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToGetStat;
}
export declare class UnableToCreateDirectory extends FlystorageError {
    readonly code = "flystorage.unable_to_create_directory";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToCreateDirectory;
}
export declare class UnableToDeleteDirectory extends FlystorageError {
    readonly code = "flystorage.unable_to_delete_directory";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToDeleteDirectory;
}
export declare class UnableToDeleteFile extends FlystorageError {
    readonly code = "flystorage.unable_to_delete_file";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToDeleteFile;
}
export declare class UnableToCheckFileExistence extends FlystorageError {
    readonly code = "flystorage.unable_to_check_file_existence";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToCheckFileExistence;
}
export declare class UnableToCheckDirectoryExistence extends FlystorageError {
    readonly code = "flystorage.unable_to_check_directory_existence";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToCheckDirectoryExistence;
}
export declare class UnableToListDirectory extends FlystorageError {
    readonly code = "flystorage.unable_to_list_directory_contents";
    static because: (reason: string, { context, cause }: {
        context?: ErrorContext;
        cause?: unknown;
    }) => UnableToListDirectory;
}
