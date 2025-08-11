export interface PathNormalizer {
    normalizePath(path: string): string;
}
export declare class PathNormalizerV1 implements PathNormalizer {
    normalizePath(path: string): string;
}
export declare class CorruptedPathDetected extends Error {
    static unexpectedWhitespace: (path: string) => CorruptedPathDetected;
}
export declare class PathTraversalDetected extends Error {
    static forPath: (path: string) => PathTraversalDetected;
}
