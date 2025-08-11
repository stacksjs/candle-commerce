"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortableUnixVisibilityConversion = void 0;
const file_storage_1 = require("@flystorage/file-storage");
class PortableUnixVisibilityConversion {
    filePublic;
    filePrivate;
    directoryPublic;
    directoryPrivate;
    defaultDirectoryVisibility;
    constructor(filePublic = 0o644, filePrivate = 0o600, directoryPublic = 0o755, directoryPrivate = 0o700, defaultDirectoryVisibility = file_storage_1.Visibility.PUBLIC) {
        this.filePublic = filePublic;
        this.filePrivate = filePrivate;
        this.directoryPublic = directoryPublic;
        this.directoryPrivate = directoryPrivate;
        this.defaultDirectoryVisibility = defaultDirectoryVisibility;
    }
    get defaultDirectoryPermissions() {
        return this.visibilityToDirectoryPermissions(this.defaultDirectoryVisibility);
    }
    directoryPermissionsToVisibility(permissions) {
        if (permissions === this.directoryPrivate) {
            return file_storage_1.Visibility.PRIVATE;
        }
        return file_storage_1.Visibility.PUBLIC;
    }
    filePermissionsToVisibility(permissions) {
        if (permissions === this.filePrivate) {
            return file_storage_1.Visibility.PRIVATE;
        }
        return file_storage_1.Visibility.PUBLIC;
    }
    visibilityToDirectoryPermissions(visibility) {
        if (visibility === file_storage_1.Visibility.PUBLIC) {
            return this.directoryPublic;
        }
        else if (visibility === file_storage_1.Visibility.PRIVATE) {
            return this.directoryPrivate;
        }
        throw new Error(`Unsupported visibility was provided: ${visibility}`);
    }
    visibilityToFilePermissions(visibility) {
        if (visibility === file_storage_1.Visibility.PUBLIC) {
            return this.filePublic;
        }
        else if (visibility === file_storage_1.Visibility.PRIVATE) {
            return this.filePrivate;
        }
        throw new Error(`Unsupported visibility was provided: ${visibility}`);
    }
}
exports.PortableUnixVisibilityConversion = PortableUnixVisibilityConversion;
