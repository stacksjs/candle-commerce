import { Visibility } from '@flystorage/file-storage';
export interface UnixVisibilityConversion {
    visibilityToFilePermissions(visibility: string): number;
    visibilityToDirectoryPermissions(visibility: string): number;
    filePermissionsToVisibility(permissions: number): string;
    directoryPermissionsToVisibility(permissions: number): string;
    defaultDirectoryPermissions: number;
    defaultDirectoryVisibility: string;
}
export declare class PortableUnixVisibilityConversion implements UnixVisibilityConversion {
    private readonly filePublic;
    private readonly filePrivate;
    private readonly directoryPublic;
    private readonly directoryPrivate;
    readonly defaultDirectoryVisibility: Visibility;
    constructor(filePublic?: number, filePrivate?: number, directoryPublic?: number, directoryPrivate?: number, defaultDirectoryVisibility?: Visibility);
    get defaultDirectoryPermissions(): number;
    directoryPermissionsToVisibility(permissions: number): string;
    filePermissionsToVisibility(permissions: number): string;
    visibilityToDirectoryPermissions(visibility: string): number;
    visibilityToFilePermissions(visibility: string): number;
}
