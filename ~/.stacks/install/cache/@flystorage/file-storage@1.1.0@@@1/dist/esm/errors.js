export function errorToMessage(error) {
    return error instanceof Error ? error.message : String(error);
}
export class FlystorageError extends Error {
    context;
    code = 'unknown_error';
    constructor(message, context = {}, cause = undefined) {
        const options = cause === undefined ? undefined : { cause };
        // @ts-ignore TS2554
        super(message, options);
        this.context = context;
    }
}
/**
 * Thrown when the checksum algo is not supported or not pre-computed. This error
 * is thrown with the intention of falling back to computing it based on a file read.
 */
export class ChecksumIsNotAvailable extends FlystorageError {
    algo;
    code = 'flystorage.checksum_not_supported';
    constructor(message, algo, context = {}, cause = undefined) {
        super(message, context, cause);
        this.algo = algo;
    }
    static checksumNotSupported = (algo, { context = {}, cause = undefined } = {}) => new ChecksumIsNotAvailable(`Checksum algo "${algo}" is not supported`, algo, { ...context, algo }, cause);
    static isErrorOfType(error) {
        return (typeof error === 'object' && error.code === 'flystorage.checksum_not_supported');
    }
}
export class UnableToGetChecksum extends FlystorageError {
    code = 'flystorage.unable_to_get_checksum';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToGetChecksum(`Unable to get checksum for file. Reason: ${reason}`, context, cause);
}
export class UnableToGetMimeType extends FlystorageError {
    code = 'flystorage.unable_to_get_mimetype';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToGetMimeType(`Unable to get mime-type. Reason: ${reason}`, context, cause);
}
export class UnableToGetLastModified extends FlystorageError {
    code = 'flystorage.unable_to_get_last_modified';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToGetLastModified(`Unable to get last modified. Reason: ${reason}`, context, cause);
}
export class UnableToGetFileSize extends FlystorageError {
    code = 'flystorage.unable_to_get_file_size';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToGetFileSize(`Unable to get file size. Reason: ${reason}`, context, cause);
}
export class UnableToWriteFile extends FlystorageError {
    code = 'flystorage.unable_to_write_file';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToWriteFile(`Unable to write the file. Reason: ${reason}`, context, cause);
}
export class UnableToReadFile extends FlystorageError {
    wasFileNotFound;
    context;
    code = 'flystorage.unable_to_read_file';
    constructor(wasFileNotFound, message, context = {}, cause = undefined) {
        super(message, context, cause);
        this.wasFileNotFound = wasFileNotFound;
        this.context = context;
    }
    static because = (reason, { context = {}, cause = undefined }) => new UnableToReadFile(false, `Unable to read the file. Reason: ${reason}`, context, cause);
    static becauseFileWasNotFound = (error) => new UnableToReadFile(true, `Unable to read the file. Reason: ${error.message}`, error.context, error);
}
export class FileWasNotFound extends FlystorageError {
    code = 'flystorage.file_was_not_found';
    static atLocation = (location, { context = {}, cause = undefined }) => new FileWasNotFound(`File was not found at location: ${location}`, context, cause);
}
export function isFileWasNotFound(error) {
    return (typeof error === 'object' && error.code === 'flystorage.file_was_not_found');
}
export class UnableToSetVisibility extends FlystorageError {
    code = 'flystorage.unable_to_set_visibility';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToSetVisibility(`Unable to set visibility. Reason: ${reason}`, context, cause);
}
export class UnableToGetVisibility extends FlystorageError {
    code = 'flystorage.unable_to_get_visibility';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToGetVisibility(`Unable to get visibility. Reason: ${reason}`, context, cause);
}
export class UnableToGetPublicUrl extends FlystorageError {
    code = 'flystorage.unable_to_get_public_url';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToGetPublicUrl(`Unable to get public URL. Reason: ${reason}`, context, cause);
}
export class UnableToGetTemporaryUrl extends FlystorageError {
    code = 'flystorage.unable_to_get_temporary_url';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToGetTemporaryUrl(`Unable to get temporary URL. Reason: ${reason}`, context, cause);
}
export class UnableToPrepareUploadRequest extends FlystorageError {
    code = 'flystorage.unable_to_prepare_upload_request';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToGetTemporaryUrl(`Unable to prepare upload request. Reason: ${reason}`, context, cause);
}
export class UnableToCopyFile extends FlystorageError {
    code = 'flystorage.unable_to_copy_file';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToCopyFile(`Unable to copy file. Reason: ${reason}`, context, cause);
}
export class UnableToMoveFile extends FlystorageError {
    code = 'flystorage.unable_to_move_file';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToMoveFile(`Unable to move file. Reason: ${reason}`, context, cause);
}
export class UnableToGetStat extends FlystorageError {
    code = 'flystorage.unable_to_get_stat';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToGetStat(`Unable to get stat. Reason: ${reason}`, context, cause);
    static noFileStatResolved = ({ context = {}, cause = undefined }) => new UnableToGetStat(`Stat was not a file.`, context, cause);
}
export class UnableToCreateDirectory extends FlystorageError {
    code = 'flystorage.unable_to_create_directory';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToCreateDirectory(`Unable to create directory. Reason: ${reason}`, context, cause);
}
export class UnableToDeleteDirectory extends FlystorageError {
    code = 'flystorage.unable_to_delete_directory';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToDeleteDirectory(`Unable to delete directory. Reason: ${reason}`, context, cause);
}
export class UnableToDeleteFile extends FlystorageError {
    code = 'flystorage.unable_to_delete_file';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToDeleteFile(`Unable to delete file. Reason: ${reason}`, context, cause);
}
export class UnableToCheckFileExistence extends FlystorageError {
    code = 'flystorage.unable_to_check_file_existence';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToCheckFileExistence(`Unable to check file existence. Reason: ${reason}`, context, cause);
}
export class UnableToCheckDirectoryExistence extends FlystorageError {
    code = 'flystorage.unable_to_check_directory_existence';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToCheckDirectoryExistence(`Unable to check directory existence. Reason: ${reason}`, context, cause);
}
export class UnableToListDirectory extends FlystorageError {
    code = 'flystorage.unable_to_list_directory_contents';
    static because = (reason, { context = {}, cause = undefined }) => new UnableToListDirectory(`Unable to list directory contents. Reason: ${reason}`, context, cause);
}
