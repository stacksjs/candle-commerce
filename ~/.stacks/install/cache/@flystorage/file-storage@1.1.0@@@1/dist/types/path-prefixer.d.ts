import { join } from 'node:path';
export declare class PathPrefixer {
    private readonly separator;
    private readonly joinFunc;
    private readonly prefix;
    constructor(prefix?: string, separator?: string, joinFunc?: typeof join);
    prefixFilePath(path: string): string;
    prefixDirectoryPath(path: string): string;
    stripFilePath(path: string): string;
    stripDirectoryPath(path: string): string;
}
