"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathTraversalDetected = exports.CorruptedPathDetected = exports.PathNormalizerV1 = void 0;
const node_path_1 = require("node:path");
const funkyWhiteSpaceRegex = new RegExp('\\p{C}+', 'u');
class PathNormalizerV1 {
    normalizePath(path) {
        if (funkyWhiteSpaceRegex.test(path)) {
            throw CorruptedPathDetected.unexpectedWhitespace(path);
        }
        const normalized = (0, node_path_1.join)(...(path.split('/')));
        if (normalized.indexOf('../') !== -1 || normalized == '..') {
            throw PathTraversalDetected.forPath(path);
        }
        return normalized === '.' ? '' : normalized;
    }
}
exports.PathNormalizerV1 = PathNormalizerV1;
class CorruptedPathDetected extends Error {
    static unexpectedWhitespace = (path) => new CorruptedPathDetected(`Corrupted path detected with unexpected whitespace: ${path}`);
}
exports.CorruptedPathDetected = CorruptedPathDetected;
class PathTraversalDetected extends Error {
    static forPath = (path) => new PathTraversalDetected(`Path traversal detected for: ${path}`);
}
exports.PathTraversalDetected = PathTraversalDetected;
