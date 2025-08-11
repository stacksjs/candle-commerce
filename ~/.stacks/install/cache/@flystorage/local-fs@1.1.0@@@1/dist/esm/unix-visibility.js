import { Visibility } from '@flystorage/file-storage';
export class PortableUnixVisibilityConversion {
    filePublic;
    filePrivate;
    directoryPublic;
    directoryPrivate;
    defaultDirectoryVisibility;
    constructor(filePublic = 0o644, filePrivate = 0o600, directoryPublic = 0o755, directoryPrivate = 0o700, defaultDirectoryVisibility = Visibility.PUBLIC) {
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
            return Visibility.PRIVATE;
        }
        return Visibility.PUBLIC;
    }
    filePermissionsToVisibility(permissions) {
        if (permissions === this.filePrivate) {
            return Visibility.PRIVATE;
        }
        return Visibility.PUBLIC;
    }
    visibilityToDirectoryPermissions(visibility) {
        if (visibility === Visibility.PUBLIC) {
            return this.directoryPublic;
        }
        else if (visibility === Visibility.PRIVATE) {
            return this.directoryPrivate;
        }
        throw new Error(`Unsupported visibility was provided: ${visibility}`);
    }
    visibilityToFilePermissions(visibility) {
        if (visibility === Visibility.PUBLIC) {
            return this.filePublic;
        }
        else if (visibility === Visibility.PRIVATE) {
            return this.filePrivate;
        }
        throw new Error(`Unsupported visibility was provided: ${visibility}`);
    }
}
