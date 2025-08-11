"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChaosStorageAdapterDecorator = exports.TriggeredErrors = exports.NeverThrowError = exports.AlwaysThrowError = void 0;
class AlwaysThrowError {
    newError;
    constructor(newError) {
        this.newError = newError;
    }
    maybeGoNuts(method) {
        throw (this.newError)();
    }
}
exports.AlwaysThrowError = AlwaysThrowError;
class NeverThrowError {
    maybeGoNuts(method) {
        // do not do anything
    }
}
exports.NeverThrowError = NeverThrowError;
class TriggeredErrors {
    triggers = {};
    on(method, newError, options = {}) {
        this.triggers[method] = {
            after: options.after ?? 0,
            times: options.times ?? Number.MAX_SAFE_INTEGER,
            newError,
        };
    }
    clearTriggers() {
        this.triggers = {};
    }
    maybeGoNuts(method) {
        const trigger = this.triggers[method] ?? this.triggers['*'];
        if (trigger === undefined) {
            return;
        }
        if (trigger.after > 0) {
            trigger.after--;
        }
        else if (trigger.times > 0) {
            trigger.times--;
            throw (trigger.newError)();
        }
    }
}
exports.TriggeredErrors = TriggeredErrors;
class ChaosStorageAdapterDecorator {
    storage;
    chaos;
    constructor(storage, chaos) {
        this.storage = storage;
        this.chaos = chaos;
    }
    write(path, contents, options) {
        this.chaos.maybeGoNuts('write');
        return this.storage.write(path, contents, options);
    }
    read(path, options) {
        this.chaos.maybeGoNuts('read');
        return this.storage.read(path, options);
    }
    deleteFile(path, options) {
        this.chaos.maybeGoNuts('deleteFile');
        return this.storage.deleteFile(path, options);
    }
    createDirectory(path, options) {
        this.chaos.maybeGoNuts('createDirectory');
        return this.storage.createDirectory(path, options);
    }
    copyFile(from, to, options) {
        this.chaos.maybeGoNuts('copyFile');
        return this.storage.copyFile(from, to, options);
    }
    moveFile(from, to, options) {
        this.chaos.maybeGoNuts('moveFile');
        return this.storage.moveFile(from, to, options);
    }
    stat(path, options) {
        this.chaos.maybeGoNuts('stat');
        return this.storage.stat(path, options);
    }
    list(path, options) {
        this.chaos.maybeGoNuts('list');
        return this.storage.list(path, options);
    }
    changeVisibility(path, visibility, options) {
        this.chaos.maybeGoNuts('changeVisibility');
        return this.storage.changeVisibility(path, visibility, options);
    }
    visibility(path, options) {
        this.chaos.maybeGoNuts('visibility');
        return this.storage.visibility(path, options);
    }
    deleteDirectory(path, options) {
        this.chaos.maybeGoNuts('deleteDirectory');
        return this.storage.deleteDirectory(path, options);
    }
    fileExists(path, options) {
        this.chaos.maybeGoNuts('fileExists');
        return this.storage.fileExists(path, options);
    }
    directoryExists(path, options) {
        this.chaos.maybeGoNuts('directoryExists');
        return this.storage.directoryExists(path, options);
    }
    publicUrl(path, options) {
        this.chaos.maybeGoNuts('publicUrl');
        return this.storage.publicUrl(path, options);
    }
    temporaryUrl(path, options) {
        this.chaos.maybeGoNuts('publicUrl');
        return this.storage.publicUrl(path, options);
    }
    checksum(path, options) {
        this.chaos.maybeGoNuts('checksum');
        return this.storage.checksum(path, options);
    }
    mimeType(path, options) {
        this.chaos.maybeGoNuts('mimeType');
        return this.storage.mimeType(path, options);
    }
    lastModified(path, options) {
        this.chaos.maybeGoNuts('lastModified');
        return this.storage.lastModified(path, options);
    }
    fileSize(path, options) {
        this.chaos.maybeGoNuts('fileSize');
        return this.storage.fileSize(path, options);
    }
}
exports.ChaosStorageAdapterDecorator = ChaosStorageAdapterDecorator;
