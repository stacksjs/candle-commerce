"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathPrefixer = void 0;
const node_path_1 = require("node:path");
class PathPrefixer {
    separator;
    joinFunc;
    prefix = '';
    constructor(prefix = '', separator = '/', joinFunc = node_path_1.join) {
        this.separator = separator;
        this.joinFunc = joinFunc;
        if (prefix.length > 0) {
            this.prefix = this.joinFunc(prefix, this.separator);
        }
    }
    prefixFilePath(path) {
        return this.prefix.length > 0 ? this.joinFunc(this.prefix, path) : path;
    }
    prefixDirectoryPath(path) {
        return this.prefix.length > 0 ? this.joinFunc(this.prefix, path, '/') : this.joinFunc(path, '/');
    }
    stripFilePath(path) {
        return path.substring(this.prefix.length);
    }
    stripDirectoryPath(path) {
        return this.stripFilePath(path).replace(/\/+$/g, '');
    }
}
exports.PathPrefixer = PathPrefixer;
