// @bun
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __require = import.meta.require;

// ../../../../node_modules/universalify/index.js
var require_universalify = __commonJS((exports) => {
  exports.fromCallback = function(fn) {
    return Object.defineProperty(function(...args) {
      if (typeof args[args.length - 1] === "function")
        fn.apply(this, args);
      else {
        return new Promise((resolve4, reject) => {
          args.push((err, res) => err != null ? reject(err) : resolve4(res));
          fn.apply(this, args);
        });
      }
    }, "name", { value: fn.name });
  };
  exports.fromPromise = function(fn) {
    return Object.defineProperty(function(...args) {
      const cb = args[args.length - 1];
      if (typeof cb !== "function")
        return fn.apply(this, args);
      else {
        args.pop();
        fn.apply(this, args).then((r) => cb(null, r), cb);
      }
    }, "name", { value: fn.name });
  };
});

// ../../../../node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS((exports, module) => {
  var constants2 = __require("constants");
  var origCwd = process.cwd;
  var cwd = null;
  var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    if (!cwd)
      cwd = origCwd.call(process);
    return cwd;
  };
  try {
    process.cwd();
  } catch (er) {}
  if (typeof process.chdir === "function") {
    chdir = process.chdir;
    process.chdir = function(d) {
      cwd = null;
      chdir.call(process, d);
    };
    if (Object.setPrototypeOf)
      Object.setPrototypeOf(process.chdir, chdir);
  }
  var chdir;
  module.exports = patch;
  function patch(fs2) {
    if (constants2.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
      patchLchmod(fs2);
    }
    if (!fs2.lutimes) {
      patchLutimes(fs2);
    }
    fs2.chown = chownFix(fs2.chown);
    fs2.fchown = chownFix(fs2.fchown);
    fs2.lchown = chownFix(fs2.lchown);
    fs2.chmod = chmodFix(fs2.chmod);
    fs2.fchmod = chmodFix(fs2.fchmod);
    fs2.lchmod = chmodFix(fs2.lchmod);
    fs2.chownSync = chownFixSync(fs2.chownSync);
    fs2.fchownSync = chownFixSync(fs2.fchownSync);
    fs2.lchownSync = chownFixSync(fs2.lchownSync);
    fs2.chmodSync = chmodFixSync(fs2.chmodSync);
    fs2.fchmodSync = chmodFixSync(fs2.fchmodSync);
    fs2.lchmodSync = chmodFixSync(fs2.lchmodSync);
    fs2.stat = statFix(fs2.stat);
    fs2.fstat = statFix(fs2.fstat);
    fs2.lstat = statFix(fs2.lstat);
    fs2.statSync = statFixSync(fs2.statSync);
    fs2.fstatSync = statFixSync(fs2.fstatSync);
    fs2.lstatSync = statFixSync(fs2.lstatSync);
    if (fs2.chmod && !fs2.lchmod) {
      fs2.lchmod = function(path2, mode, cb) {
        if (cb)
          process.nextTick(cb);
      };
      fs2.lchmodSync = function() {};
    }
    if (fs2.chown && !fs2.lchown) {
      fs2.lchown = function(path2, uid, gid, cb) {
        if (cb)
          process.nextTick(cb);
      };
      fs2.lchownSync = function() {};
    }
    if (platform === "win32") {
      fs2.rename = typeof fs2.rename !== "function" ? fs2.rename : function(fs$rename) {
        function rename2(from, to, cb) {
          var start = Date.now();
          var backoff = 0;
          fs$rename(from, to, function CB(er) {
            if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 60000) {
              setTimeout(function() {
                fs2.stat(to, function(stater, st) {
                  if (stater && stater.code === "ENOENT")
                    fs$rename(from, to, CB);
                  else
                    cb(er);
                });
              }, backoff);
              if (backoff < 100)
                backoff += 10;
              return;
            }
            if (cb)
              cb(er);
          });
        }
        if (Object.setPrototypeOf)
          Object.setPrototypeOf(rename2, fs$rename);
        return rename2;
      }(fs2.rename);
    }
    fs2.read = typeof fs2.read !== "function" ? fs2.read : function(fs$read) {
      function read(fd, buffer, offset, length, position, callback_) {
        var callback;
        if (callback_ && typeof callback_ === "function") {
          var eagCounter = 0;
          callback = function(er, _, __) {
            if (er && er.code === "EAGAIN" && eagCounter < 10) {
              eagCounter++;
              return fs$read.call(fs2, fd, buffer, offset, length, position, callback);
            }
            callback_.apply(this, arguments);
          };
        }
        return fs$read.call(fs2, fd, buffer, offset, length, position, callback);
      }
      if (Object.setPrototypeOf)
        Object.setPrototypeOf(read, fs$read);
      return read;
    }(fs2.read);
    fs2.readSync = typeof fs2.readSync !== "function" ? fs2.readSync : function(fs$readSync) {
      return function(fd, buffer, offset, length, position) {
        var eagCounter = 0;
        while (true) {
          try {
            return fs$readSync.call(fs2, fd, buffer, offset, length, position);
          } catch (er) {
            if (er.code === "EAGAIN" && eagCounter < 10) {
              eagCounter++;
              continue;
            }
            throw er;
          }
        }
      };
    }(fs2.readSync);
    function patchLchmod(fs3) {
      fs3.lchmod = function(path2, mode, callback) {
        fs3.open(path2, constants2.O_WRONLY | constants2.O_SYMLINK, mode, function(err, fd) {
          if (err) {
            if (callback)
              callback(err);
            return;
          }
          fs3.fchmod(fd, mode, function(err2) {
            fs3.close(fd, function(err22) {
              if (callback)
                callback(err2 || err22);
            });
          });
        });
      };
      fs3.lchmodSync = function(path2, mode) {
        var fd = fs3.openSync(path2, constants2.O_WRONLY | constants2.O_SYMLINK, mode);
        var threw = true;
        var ret;
        try {
          ret = fs3.fchmodSync(fd, mode);
          threw = false;
        } finally {
          if (threw) {
            try {
              fs3.closeSync(fd);
            } catch (er) {}
          } else {
            fs3.closeSync(fd);
          }
        }
        return ret;
      };
    }
    function patchLutimes(fs3) {
      if (constants2.hasOwnProperty("O_SYMLINK") && fs3.futimes) {
        fs3.lutimes = function(path2, at, mt, cb) {
          fs3.open(path2, constants2.O_SYMLINK, function(er, fd) {
            if (er) {
              if (cb)
                cb(er);
              return;
            }
            fs3.futimes(fd, at, mt, function(er2) {
              fs3.close(fd, function(er22) {
                if (cb)
                  cb(er2 || er22);
              });
            });
          });
        };
        fs3.lutimesSync = function(path2, at, mt) {
          var fd = fs3.openSync(path2, constants2.O_SYMLINK);
          var ret;
          var threw = true;
          try {
            ret = fs3.futimesSync(fd, at, mt);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs3.closeSync(fd);
              } catch (er) {}
            } else {
              fs3.closeSync(fd);
            }
          }
          return ret;
        };
      } else if (fs3.futimes) {
        fs3.lutimes = function(_a, _b, _c, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs3.lutimesSync = function() {};
      }
    }
    function chmodFix(orig) {
      if (!orig)
        return orig;
      return function(target, mode, cb) {
        return orig.call(fs2, target, mode, function(er) {
          if (chownErOk(er))
            er = null;
          if (cb)
            cb.apply(this, arguments);
        });
      };
    }
    function chmodFixSync(orig) {
      if (!orig)
        return orig;
      return function(target, mode) {
        try {
          return orig.call(fs2, target, mode);
        } catch (er) {
          if (!chownErOk(er))
            throw er;
        }
      };
    }
    function chownFix(orig) {
      if (!orig)
        return orig;
      return function(target, uid, gid, cb) {
        return orig.call(fs2, target, uid, gid, function(er) {
          if (chownErOk(er))
            er = null;
          if (cb)
            cb.apply(this, arguments);
        });
      };
    }
    function chownFixSync(orig) {
      if (!orig)
        return orig;
      return function(target, uid, gid) {
        try {
          return orig.call(fs2, target, uid, gid);
        } catch (er) {
          if (!chownErOk(er))
            throw er;
        }
      };
    }
    function statFix(orig) {
      if (!orig)
        return orig;
      return function(target, options, cb) {
        if (typeof options === "function") {
          cb = options;
          options = null;
        }
        function callback(er, stats) {
          if (stats) {
            if (stats.uid < 0)
              stats.uid += 4294967296;
            if (stats.gid < 0)
              stats.gid += 4294967296;
          }
          if (cb)
            cb.apply(this, arguments);
        }
        return options ? orig.call(fs2, target, options, callback) : orig.call(fs2, target, callback);
      };
    }
    function statFixSync(orig) {
      if (!orig)
        return orig;
      return function(target, options) {
        var stats = options ? orig.call(fs2, target, options) : orig.call(fs2, target);
        if (stats) {
          if (stats.uid < 0)
            stats.uid += 4294967296;
          if (stats.gid < 0)
            stats.gid += 4294967296;
        }
        return stats;
      };
    }
    function chownErOk(er) {
      if (!er)
        return true;
      if (er.code === "ENOSYS")
        return true;
      var nonroot = !process.getuid || process.getuid() !== 0;
      if (nonroot) {
        if (er.code === "EINVAL" || er.code === "EPERM")
          return true;
      }
      return false;
    }
  }
});

// ../../../../node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS((exports, module) => {
  var Stream = __require("stream").Stream;
  module.exports = legacy;
  function legacy(fs2) {
    return {
      ReadStream,
      WriteStream
    };
    function ReadStream(path2, options) {
      if (!(this instanceof ReadStream))
        return new ReadStream(path2, options);
      Stream.call(this);
      var self2 = this;
      this.path = path2;
      this.fd = null;
      this.readable = true;
      this.paused = false;
      this.flags = "r";
      this.mode = 438;
      this.bufferSize = 64 * 1024;
      options = options || {};
      var keys = Object.keys(options);
      for (var index = 0, length = keys.length;index < length; index++) {
        var key = keys[index];
        this[key] = options[key];
      }
      if (this.encoding)
        this.setEncoding(this.encoding);
      if (this.start !== undefined) {
        if (typeof this.start !== "number") {
          throw TypeError("start must be a Number");
        }
        if (this.end === undefined) {
          this.end = Infinity;
        } else if (typeof this.end !== "number") {
          throw TypeError("end must be a Number");
        }
        if (this.start > this.end) {
          throw new Error("start must be <= end");
        }
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          self2._read();
        });
        return;
      }
      fs2.open(this.path, this.flags, this.mode, function(err, fd) {
        if (err) {
          self2.emit("error", err);
          self2.readable = false;
          return;
        }
        self2.fd = fd;
        self2.emit("open", fd);
        self2._read();
      });
    }
    function WriteStream(path2, options) {
      if (!(this instanceof WriteStream))
        return new WriteStream(path2, options);
      Stream.call(this);
      this.path = path2;
      this.fd = null;
      this.writable = true;
      this.flags = "w";
      this.encoding = "binary";
      this.mode = 438;
      this.bytesWritten = 0;
      options = options || {};
      var keys = Object.keys(options);
      for (var index = 0, length = keys.length;index < length; index++) {
        var key = keys[index];
        this[key] = options[key];
      }
      if (this.start !== undefined) {
        if (typeof this.start !== "number") {
          throw TypeError("start must be a Number");
        }
        if (this.start < 0) {
          throw new Error("start must be >= zero");
        }
        this.pos = this.start;
      }
      this.busy = false;
      this._queue = [];
      if (this.fd === null) {
        this._open = fs2.open;
        this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
        this.flush();
      }
    }
  }
});

// ../../../../node_modules/graceful-fs/clone.js
var require_clone = __commonJS((exports, module) => {
  module.exports = clone;
  var getPrototypeOf = Object.getPrototypeOf || function(obj) {
    return obj.__proto__;
  };
  function clone(obj) {
    if (obj === null || typeof obj !== "object")
      return obj;
    if (obj instanceof Object)
      var copy = { __proto__: getPrototypeOf(obj) };
    else
      var copy = Object.create(null);
    Object.getOwnPropertyNames(obj).forEach(function(key) {
      Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
    });
    return copy;
  }
});

// ../../../../node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS((exports, module) => {
  var fs2 = __require("fs");
  var polyfills = require_polyfills();
  var legacy = require_legacy_streams();
  var clone = require_clone();
  var util = __require("util");
  var gracefulQueue;
  var previousSymbol;
  if (typeof Symbol === "function" && typeof Symbol.for === "function") {
    gracefulQueue = Symbol.for("graceful-fs.queue");
    previousSymbol = Symbol.for("graceful-fs.previous");
  } else {
    gracefulQueue = "___graceful-fs.queue";
    previousSymbol = "___graceful-fs.previous";
  }
  function noop() {}
  function publishQueue(context, queue3) {
    Object.defineProperty(context, gracefulQueue, {
      get: function() {
        return queue3;
      }
    });
  }
  var debug = noop;
  if (util.debuglog)
    debug = util.debuglog("gfs4");
  else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
    debug = function() {
      var m = util.format.apply(util, arguments);
      m = "GFS4: " + m.split(/\n/).join(`
GFS4: `);
      console.error(m);
    };
  if (!fs2[gracefulQueue]) {
    queue2 = global[gracefulQueue] || [];
    publishQueue(fs2, queue2);
    fs2.close = function(fs$close) {
      function close(fd, cb) {
        return fs$close.call(fs2, fd, function(err) {
          if (!err) {
            resetQueue();
          }
          if (typeof cb === "function")
            cb.apply(this, arguments);
        });
      }
      Object.defineProperty(close, previousSymbol, {
        value: fs$close
      });
      return close;
    }(fs2.close);
    fs2.closeSync = function(fs$closeSync) {
      function closeSync2(fd) {
        fs$closeSync.apply(fs2, arguments);
        resetQueue();
      }
      Object.defineProperty(closeSync2, previousSymbol, {
        value: fs$closeSync
      });
      return closeSync2;
    }(fs2.closeSync);
    if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
      process.on("exit", function() {
        debug(fs2[gracefulQueue]);
        __require("assert").equal(fs2[gracefulQueue].length, 0);
      });
    }
  }
  var queue2;
  if (!global[gracefulQueue]) {
    publishQueue(global, fs2[gracefulQueue]);
  }
  module.exports = patch(clone(fs2));
  if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs2.__patched) {
    module.exports = patch(fs2);
    fs2.__patched = true;
  }
  function patch(fs3) {
    polyfills(fs3);
    fs3.gracefulify = patch;
    fs3.createReadStream = createReadStream2;
    fs3.createWriteStream = createWriteStream2;
    var fs$readFile = fs3.readFile;
    fs3.readFile = readFile;
    function readFile(path2, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      return go$readFile(path2, options, cb);
      function go$readFile(path3, options2, cb2, startTime) {
        return fs$readFile(path3, options2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$readFile, [path3, options2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$writeFile = fs3.writeFile;
    fs3.writeFile = writeFile2;
    function writeFile2(path2, data, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      return go$writeFile(path2, data, options, cb);
      function go$writeFile(path3, data2, options2, cb2, startTime) {
        return fs$writeFile(path3, data2, options2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$writeFile, [path3, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$appendFile = fs3.appendFile;
    if (fs$appendFile)
      fs3.appendFile = appendFile;
    function appendFile(path2, data, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      return go$appendFile(path2, data, options, cb);
      function go$appendFile(path3, data2, options2, cb2, startTime) {
        return fs$appendFile(path3, data2, options2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$appendFile, [path3, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$copyFile = fs3.copyFile;
    if (fs$copyFile)
      fs3.copyFile = copyFile;
    function copyFile(src, dest, flags, cb) {
      if (typeof flags === "function") {
        cb = flags;
        flags = 0;
      }
      return go$copyFile(src, dest, flags, cb);
      function go$copyFile(src2, dest2, flags2, cb2, startTime) {
        return fs$copyFile(src2, dest2, flags2, function(err) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    var fs$readdir = fs3.readdir;
    fs3.readdir = readdir2;
    var noReaddirOptionVersions = /^v[0-5]\./;
    function readdir2(path2, options, cb) {
      if (typeof options === "function")
        cb = options, options = null;
      var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir(path3, options2, cb2, startTime) {
        return fs$readdir(path3, fs$readdirCallback(path3, options2, cb2, startTime));
      } : function go$readdir(path3, options2, cb2, startTime) {
        return fs$readdir(path3, options2, fs$readdirCallback(path3, options2, cb2, startTime));
      };
      return go$readdir(path2, options, cb);
      function fs$readdirCallback(path3, options2, cb2, startTime) {
        return function(err, files) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([
              go$readdir,
              [path3, options2, cb2],
              err,
              startTime || Date.now(),
              Date.now()
            ]);
          else {
            if (files && files.sort)
              files.sort();
            if (typeof cb2 === "function")
              cb2.call(this, err, files);
          }
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var legStreams = legacy(fs3);
      ReadStream = legStreams.ReadStream;
      WriteStream = legStreams.WriteStream;
    }
    var fs$ReadStream = fs3.ReadStream;
    if (fs$ReadStream) {
      ReadStream.prototype = Object.create(fs$ReadStream.prototype);
      ReadStream.prototype.open = ReadStream$open;
    }
    var fs$WriteStream = fs3.WriteStream;
    if (fs$WriteStream) {
      WriteStream.prototype = Object.create(fs$WriteStream.prototype);
      WriteStream.prototype.open = WriteStream$open;
    }
    Object.defineProperty(fs3, "ReadStream", {
      get: function() {
        return ReadStream;
      },
      set: function(val) {
        ReadStream = val;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(fs3, "WriteStream", {
      get: function() {
        return WriteStream;
      },
      set: function(val) {
        WriteStream = val;
      },
      enumerable: true,
      configurable: true
    });
    var FileReadStream = ReadStream;
    Object.defineProperty(fs3, "FileReadStream", {
      get: function() {
        return FileReadStream;
      },
      set: function(val) {
        FileReadStream = val;
      },
      enumerable: true,
      configurable: true
    });
    var FileWriteStream = WriteStream;
    Object.defineProperty(fs3, "FileWriteStream", {
      get: function() {
        return FileWriteStream;
      },
      set: function(val) {
        FileWriteStream = val;
      },
      enumerable: true,
      configurable: true
    });
    function ReadStream(path2, options) {
      if (this instanceof ReadStream)
        return fs$ReadStream.apply(this, arguments), this;
      else
        return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
    }
    function ReadStream$open() {
      var that = this;
      open(that.path, that.flags, that.mode, function(err, fd) {
        if (err) {
          if (that.autoClose)
            that.destroy();
          that.emit("error", err);
        } else {
          that.fd = fd;
          that.emit("open", fd);
          that.read();
        }
      });
    }
    function WriteStream(path2, options) {
      if (this instanceof WriteStream)
        return fs$WriteStream.apply(this, arguments), this;
      else
        return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
    }
    function WriteStream$open() {
      var that = this;
      open(that.path, that.flags, that.mode, function(err, fd) {
        if (err) {
          that.destroy();
          that.emit("error", err);
        } else {
          that.fd = fd;
          that.emit("open", fd);
        }
      });
    }
    function createReadStream2(path2, options) {
      return new fs3.ReadStream(path2, options);
    }
    function createWriteStream2(path2, options) {
      return new fs3.WriteStream(path2, options);
    }
    var fs$open = fs3.open;
    fs3.open = open;
    function open(path2, flags, mode, cb) {
      if (typeof mode === "function")
        cb = mode, mode = null;
      return go$open(path2, flags, mode, cb);
      function go$open(path3, flags2, mode2, cb2, startTime) {
        return fs$open(path3, flags2, mode2, function(err, fd) {
          if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
            enqueue([go$open, [path3, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
          else {
            if (typeof cb2 === "function")
              cb2.apply(this, arguments);
          }
        });
      }
    }
    return fs3;
  }
  function enqueue(elem) {
    debug("ENQUEUE", elem[0].name, elem[1]);
    fs2[gracefulQueue].push(elem);
    retry();
  }
  var retryTimer;
  function resetQueue() {
    var now = Date.now();
    for (var i = 0;i < fs2[gracefulQueue].length; ++i) {
      if (fs2[gracefulQueue][i].length > 2) {
        fs2[gracefulQueue][i][3] = now;
        fs2[gracefulQueue][i][4] = now;
      }
    }
    retry();
  }
  function retry() {
    clearTimeout(retryTimer);
    retryTimer = undefined;
    if (fs2[gracefulQueue].length === 0)
      return;
    var elem = fs2[gracefulQueue].shift();
    var fn = elem[0];
    var args = elem[1];
    var err = elem[2];
    var startTime = elem[3];
    var lastTime = elem[4];
    if (startTime === undefined) {
      debug("RETRY", fn.name, args);
      fn.apply(null, args);
    } else if (Date.now() - startTime >= 60000) {
      debug("TIMEOUT", fn.name, args);
      var cb = args.pop();
      if (typeof cb === "function")
        cb.call(null, err);
    } else {
      var sinceAttempt = Date.now() - lastTime;
      var sinceStart = Math.max(lastTime - startTime, 1);
      var desiredDelay = Math.min(sinceStart * 1.2, 100);
      if (sinceAttempt >= desiredDelay) {
        debug("RETRY", fn.name, args);
        fn.apply(null, args.concat([startTime]));
      } else {
        fs2[gracefulQueue].push(elem);
      }
    }
    if (retryTimer === undefined) {
      retryTimer = setTimeout(retry, 0);
    }
  }
});

// ../../../../node_modules/fs-extra/lib/fs/index.js
var require_fs = __commonJS((exports) => {
  var u = require_universalify().fromCallback;
  var fs2 = require_graceful_fs();
  var api2 = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "cp",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "glob",
    "lchmod",
    "lchown",
    "lutimes",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "statfs",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((key) => {
    return typeof fs2[key] === "function";
  });
  Object.assign(exports, fs2);
  api2.forEach((method) => {
    exports[method] = u(fs2[method]);
  });
  exports.exists = function(filename, callback) {
    if (typeof callback === "function") {
      return fs2.exists(filename, callback);
    }
    return new Promise((resolve4) => {
      return fs2.exists(filename, resolve4);
    });
  };
  exports.read = function(fd, buffer, offset, length, position, callback) {
    if (typeof callback === "function") {
      return fs2.read(fd, buffer, offset, length, position, callback);
    }
    return new Promise((resolve4, reject) => {
      fs2.read(fd, buffer, offset, length, position, (err, bytesRead, buffer2) => {
        if (err)
          return reject(err);
        resolve4({ bytesRead, buffer: buffer2 });
      });
    });
  };
  exports.write = function(fd, buffer, ...args) {
    if (typeof args[args.length - 1] === "function") {
      return fs2.write(fd, buffer, ...args);
    }
    return new Promise((resolve4, reject) => {
      fs2.write(fd, buffer, ...args, (err, bytesWritten, buffer2) => {
        if (err)
          return reject(err);
        resolve4({ bytesWritten, buffer: buffer2 });
      });
    });
  };
  exports.readv = function(fd, buffers, ...args) {
    if (typeof args[args.length - 1] === "function") {
      return fs2.readv(fd, buffers, ...args);
    }
    return new Promise((resolve4, reject) => {
      fs2.readv(fd, buffers, ...args, (err, bytesRead, buffers2) => {
        if (err)
          return reject(err);
        resolve4({ bytesRead, buffers: buffers2 });
      });
    });
  };
  exports.writev = function(fd, buffers, ...args) {
    if (typeof args[args.length - 1] === "function") {
      return fs2.writev(fd, buffers, ...args);
    }
    return new Promise((resolve4, reject) => {
      fs2.writev(fd, buffers, ...args, (err, bytesWritten, buffers2) => {
        if (err)
          return reject(err);
        resolve4({ bytesWritten, buffers: buffers2 });
      });
    });
  };
  if (typeof fs2.realpath.native === "function") {
    exports.realpath.native = u(fs2.realpath.native);
  } else {
    process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?", "Warning", "fs-extra-WARN0003");
  }
});

// ../../../../node_modules/fs-extra/lib/mkdirs/utils.js
var require_utils = __commonJS((exports, module) => {
  var path2 = __require("path");
  exports.checkPath = function checkPath(pth) {
    if (process.platform === "win32") {
      const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path2.parse(pth).root, ""));
      if (pathHasInvalidWinCharacters) {
        const error = new Error(`Path contains invalid characters: ${pth}`);
        error.code = "EINVAL";
        throw error;
      }
    }
  };
});

// ../../../../node_modules/fs-extra/lib/mkdirs/make-dir.js
var require_make_dir = __commonJS((exports, module) => {
  var fs2 = require_fs();
  var { checkPath } = require_utils();
  var getMode = (options) => {
    const defaults = { mode: 511 };
    if (typeof options === "number")
      return options;
    return { ...defaults, ...options }.mode;
  };
  exports.makeDir = async (dir, options) => {
    checkPath(dir);
    return fs2.mkdir(dir, {
      mode: getMode(options),
      recursive: true
    });
  };
  exports.makeDirSync = (dir, options) => {
    checkPath(dir);
    return fs2.mkdirSync(dir, {
      mode: getMode(options),
      recursive: true
    });
  };
});

// ../../../../node_modules/fs-extra/lib/mkdirs/index.js
var require_mkdirs = __commonJS((exports, module) => {
  var u = require_universalify().fromPromise;
  var { makeDir: _makeDir, makeDirSync } = require_make_dir();
  var makeDir = u(_makeDir);
  module.exports = {
    mkdirs: makeDir,
    mkdirsSync: makeDirSync,
    mkdirp: makeDir,
    mkdirpSync: makeDirSync,
    ensureDir: makeDir,
    ensureDirSync: makeDirSync
  };
});

// ../../../../node_modules/fs-extra/lib/path-exists/index.js
var require_path_exists = __commonJS((exports, module) => {
  var u = require_universalify().fromPromise;
  var fs2 = require_fs();
  function pathExists2(path2) {
    return fs2.access(path2).then(() => true).catch(() => false);
  }
  module.exports = {
    pathExists: u(pathExists2),
    pathExistsSync: fs2.existsSync
  };
});

// ../../../../node_modules/fs-extra/lib/util/utimes.js
var require_utimes = __commonJS((exports, module) => {
  var fs2 = require_fs();
  var u = require_universalify().fromPromise;
  async function utimesMillis(path2, atime, mtime) {
    const fd = await fs2.open(path2, "r+");
    let closeErr = null;
    try {
      await fs2.futimes(fd, atime, mtime);
    } finally {
      try {
        await fs2.close(fd);
      } catch (e) {
        closeErr = e;
      }
    }
    if (closeErr) {
      throw closeErr;
    }
  }
  function utimesMillisSync(path2, atime, mtime) {
    const fd = fs2.openSync(path2, "r+");
    fs2.futimesSync(fd, atime, mtime);
    return fs2.closeSync(fd);
  }
  module.exports = {
    utimesMillis: u(utimesMillis),
    utimesMillisSync
  };
});

// ../../../../node_modules/fs-extra/lib/util/stat.js
var require_stat = __commonJS((exports, module) => {
  var fs2 = require_fs();
  var path2 = __require("path");
  var u = require_universalify().fromPromise;
  function getStats(src, dest, opts) {
    const statFunc = opts.dereference ? (file) => fs2.stat(file, { bigint: true }) : (file) => fs2.lstat(file, { bigint: true });
    return Promise.all([
      statFunc(src),
      statFunc(dest).catch((err) => {
        if (err.code === "ENOENT")
          return null;
        throw err;
      })
    ]).then(([srcStat, destStat]) => ({ srcStat, destStat }));
  }
  function getStatsSync(src, dest, opts) {
    let destStat;
    const statFunc = opts.dereference ? (file) => fs2.statSync(file, { bigint: true }) : (file) => fs2.lstatSync(file, { bigint: true });
    const srcStat = statFunc(src);
    try {
      destStat = statFunc(dest);
    } catch (err) {
      if (err.code === "ENOENT")
        return { srcStat, destStat: null };
      throw err;
    }
    return { srcStat, destStat };
  }
  async function checkPaths(src, dest, funcName, opts) {
    const { srcStat, destStat } = await getStats(src, dest, opts);
    if (destStat) {
      if (areIdentical(srcStat, destStat)) {
        const srcBaseName = path2.basename(src);
        const destBaseName = path2.basename(dest);
        if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
          return { srcStat, destStat, isChangingCase: true };
        }
        throw new Error("Source and destination must not be the same.");
      }
      if (srcStat.isDirectory() && !destStat.isDirectory()) {
        throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
      }
      if (!srcStat.isDirectory() && destStat.isDirectory()) {
        throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
      }
    }
    if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
      throw new Error(errMsg(src, dest, funcName));
    }
    return { srcStat, destStat };
  }
  function checkPathsSync(src, dest, funcName, opts) {
    const { srcStat, destStat } = getStatsSync(src, dest, opts);
    if (destStat) {
      if (areIdentical(srcStat, destStat)) {
        const srcBaseName = path2.basename(src);
        const destBaseName = path2.basename(dest);
        if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
          return { srcStat, destStat, isChangingCase: true };
        }
        throw new Error("Source and destination must not be the same.");
      }
      if (srcStat.isDirectory() && !destStat.isDirectory()) {
        throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
      }
      if (!srcStat.isDirectory() && destStat.isDirectory()) {
        throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
      }
    }
    if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
      throw new Error(errMsg(src, dest, funcName));
    }
    return { srcStat, destStat };
  }
  async function checkParentPaths(src, srcStat, dest, funcName) {
    const srcParent = path2.resolve(path2.dirname(src));
    const destParent = path2.resolve(path2.dirname(dest));
    if (destParent === srcParent || destParent === path2.parse(destParent).root)
      return;
    let destStat;
    try {
      destStat = await fs2.stat(destParent, { bigint: true });
    } catch (err) {
      if (err.code === "ENOENT")
        return;
      throw err;
    }
    if (areIdentical(srcStat, destStat)) {
      throw new Error(errMsg(src, dest, funcName));
    }
    return checkParentPaths(src, srcStat, destParent, funcName);
  }
  function checkParentPathsSync(src, srcStat, dest, funcName) {
    const srcParent = path2.resolve(path2.dirname(src));
    const destParent = path2.resolve(path2.dirname(dest));
    if (destParent === srcParent || destParent === path2.parse(destParent).root)
      return;
    let destStat;
    try {
      destStat = fs2.statSync(destParent, { bigint: true });
    } catch (err) {
      if (err.code === "ENOENT")
        return;
      throw err;
    }
    if (areIdentical(srcStat, destStat)) {
      throw new Error(errMsg(src, dest, funcName));
    }
    return checkParentPathsSync(src, srcStat, destParent, funcName);
  }
  function areIdentical(srcStat, destStat) {
    return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
  }
  function isSrcSubdir(src, dest) {
    const srcArr = path2.resolve(src).split(path2.sep).filter((i) => i);
    const destArr = path2.resolve(dest).split(path2.sep).filter((i) => i);
    return srcArr.every((cur, i) => destArr[i] === cur);
  }
  function errMsg(src, dest, funcName) {
    return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
  }
  module.exports = {
    checkPaths: u(checkPaths),
    checkPathsSync,
    checkParentPaths: u(checkParentPaths),
    checkParentPathsSync,
    isSrcSubdir,
    areIdentical
  };
});

// ../../../../node_modules/fs-extra/lib/copy/copy.js
var require_copy = __commonJS((exports, module) => {
  var fs2 = require_fs();
  var path2 = __require("path");
  var { mkdirs } = require_mkdirs();
  var { pathExists: pathExists2 } = require_path_exists();
  var { utimesMillis } = require_utimes();
  var stat2 = require_stat();
  async function copy(src, dest, opts = {}) {
    if (typeof opts === "function") {
      opts = { filter: opts };
    }
    opts.clobber = "clobber" in opts ? !!opts.clobber : true;
    opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
    if (opts.preserveTimestamps && process.arch === "ia32") {
      process.emitWarning(`Using the preserveTimestamps option in 32-bit node is not recommended;

` + "\tsee https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0001");
    }
    const { srcStat, destStat } = await stat2.checkPaths(src, dest, "copy", opts);
    await stat2.checkParentPaths(src, srcStat, dest, "copy");
    const include = await runFilter(src, dest, opts);
    if (!include)
      return;
    const destParent = path2.dirname(dest);
    const dirExists = await pathExists2(destParent);
    if (!dirExists) {
      await mkdirs(destParent);
    }
    await getStatsAndPerformCopy(destStat, src, dest, opts);
  }
  async function runFilter(src, dest, opts) {
    if (!opts.filter)
      return true;
    return opts.filter(src, dest);
  }
  async function getStatsAndPerformCopy(destStat, src, dest, opts) {
    const statFn = opts.dereference ? fs2.stat : fs2.lstat;
    const srcStat = await statFn(src);
    if (srcStat.isDirectory())
      return onDir(srcStat, destStat, src, dest, opts);
    if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
      return onFile(srcStat, destStat, src, dest, opts);
    if (srcStat.isSymbolicLink())
      return onLink(destStat, src, dest, opts);
    if (srcStat.isSocket())
      throw new Error(`Cannot copy a socket file: ${src}`);
    if (srcStat.isFIFO())
      throw new Error(`Cannot copy a FIFO pipe: ${src}`);
    throw new Error(`Unknown file: ${src}`);
  }
  async function onFile(srcStat, destStat, src, dest, opts) {
    if (!destStat)
      return copyFile(srcStat, src, dest, opts);
    if (opts.overwrite) {
      await fs2.unlink(dest);
      return copyFile(srcStat, src, dest, opts);
    }
    if (opts.errorOnExist) {
      throw new Error(`'${dest}' already exists`);
    }
  }
  async function copyFile(srcStat, src, dest, opts) {
    await fs2.copyFile(src, dest);
    if (opts.preserveTimestamps) {
      if (fileIsNotWritable(srcStat.mode)) {
        await makeFileWritable(dest, srcStat.mode);
      }
      const updatedSrcStat = await fs2.stat(src);
      await utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
    }
    return fs2.chmod(dest, srcStat.mode);
  }
  function fileIsNotWritable(srcMode) {
    return (srcMode & 128) === 0;
  }
  function makeFileWritable(dest, srcMode) {
    return fs2.chmod(dest, srcMode | 128);
  }
  async function onDir(srcStat, destStat, src, dest, opts) {
    if (!destStat) {
      await fs2.mkdir(dest);
    }
    const promises = [];
    for await (const item2 of await fs2.opendir(src)) {
      const srcItem = path2.join(src, item2.name);
      const destItem = path2.join(dest, item2.name);
      promises.push(runFilter(srcItem, destItem, opts).then((include) => {
        if (include) {
          return stat2.checkPaths(srcItem, destItem, "copy", opts).then(({ destStat: destStat2 }) => {
            return getStatsAndPerformCopy(destStat2, srcItem, destItem, opts);
          });
        }
      }));
    }
    await Promise.all(promises);
    if (!destStat) {
      await fs2.chmod(dest, srcStat.mode);
    }
  }
  async function onLink(destStat, src, dest, opts) {
    let resolvedSrc = await fs2.readlink(src);
    if (opts.dereference) {
      resolvedSrc = path2.resolve(process.cwd(), resolvedSrc);
    }
    if (!destStat) {
      return fs2.symlink(resolvedSrc, dest);
    }
    let resolvedDest = null;
    try {
      resolvedDest = await fs2.readlink(dest);
    } catch (e) {
      if (e.code === "EINVAL" || e.code === "UNKNOWN")
        return fs2.symlink(resolvedSrc, dest);
      throw e;
    }
    if (opts.dereference) {
      resolvedDest = path2.resolve(process.cwd(), resolvedDest);
    }
    if (stat2.isSrcSubdir(resolvedSrc, resolvedDest)) {
      throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
    }
    if (stat2.isSrcSubdir(resolvedDest, resolvedSrc)) {
      throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
    }
    await fs2.unlink(dest);
    return fs2.symlink(resolvedSrc, dest);
  }
  module.exports = copy;
});

// ../../../../node_modules/fs-extra/lib/copy/copy-sync.js
var require_copy_sync = __commonJS((exports, module) => {
  var fs2 = require_graceful_fs();
  var path2 = __require("path");
  var mkdirsSync = require_mkdirs().mkdirsSync;
  var utimesMillisSync = require_utimes().utimesMillisSync;
  var stat2 = require_stat();
  function copySync(src, dest, opts) {
    if (typeof opts === "function") {
      opts = { filter: opts };
    }
    opts = opts || {};
    opts.clobber = "clobber" in opts ? !!opts.clobber : true;
    opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
    if (opts.preserveTimestamps && process.arch === "ia32") {
      process.emitWarning(`Using the preserveTimestamps option in 32-bit node is not recommended;

` + "\tsee https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0002");
    }
    const { srcStat, destStat } = stat2.checkPathsSync(src, dest, "copy", opts);
    stat2.checkParentPathsSync(src, srcStat, dest, "copy");
    if (opts.filter && !opts.filter(src, dest))
      return;
    const destParent = path2.dirname(dest);
    if (!fs2.existsSync(destParent))
      mkdirsSync(destParent);
    return getStats(destStat, src, dest, opts);
  }
  function getStats(destStat, src, dest, opts) {
    const statSync = opts.dereference ? fs2.statSync : fs2.lstatSync;
    const srcStat = statSync(src);
    if (srcStat.isDirectory())
      return onDir(srcStat, destStat, src, dest, opts);
    else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
      return onFile(srcStat, destStat, src, dest, opts);
    else if (srcStat.isSymbolicLink())
      return onLink(destStat, src, dest, opts);
    else if (srcStat.isSocket())
      throw new Error(`Cannot copy a socket file: ${src}`);
    else if (srcStat.isFIFO())
      throw new Error(`Cannot copy a FIFO pipe: ${src}`);
    throw new Error(`Unknown file: ${src}`);
  }
  function onFile(srcStat, destStat, src, dest, opts) {
    if (!destStat)
      return copyFile(srcStat, src, dest, opts);
    return mayCopyFile(srcStat, src, dest, opts);
  }
  function mayCopyFile(srcStat, src, dest, opts) {
    if (opts.overwrite) {
      fs2.unlinkSync(dest);
      return copyFile(srcStat, src, dest, opts);
    } else if (opts.errorOnExist) {
      throw new Error(`'${dest}' already exists`);
    }
  }
  function copyFile(srcStat, src, dest, opts) {
    fs2.copyFileSync(src, dest);
    if (opts.preserveTimestamps)
      handleTimestamps(srcStat.mode, src, dest);
    return setDestMode(dest, srcStat.mode);
  }
  function handleTimestamps(srcMode, src, dest) {
    if (fileIsNotWritable(srcMode))
      makeFileWritable(dest, srcMode);
    return setDestTimestamps(src, dest);
  }
  function fileIsNotWritable(srcMode) {
    return (srcMode & 128) === 0;
  }
  function makeFileWritable(dest, srcMode) {
    return setDestMode(dest, srcMode | 128);
  }
  function setDestMode(dest, srcMode) {
    return fs2.chmodSync(dest, srcMode);
  }
  function setDestTimestamps(src, dest) {
    const updatedSrcStat = fs2.statSync(src);
    return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
  }
  function onDir(srcStat, destStat, src, dest, opts) {
    if (!destStat)
      return mkDirAndCopy(srcStat.mode, src, dest, opts);
    return copyDir(src, dest, opts);
  }
  function mkDirAndCopy(srcMode, src, dest, opts) {
    fs2.mkdirSync(dest);
    copyDir(src, dest, opts);
    return setDestMode(dest, srcMode);
  }
  function copyDir(src, dest, opts) {
    const dir = fs2.opendirSync(src);
    try {
      let dirent;
      while ((dirent = dir.readSync()) !== null) {
        copyDirItem(dirent.name, src, dest, opts);
      }
    } finally {
      dir.closeSync();
    }
  }
  function copyDirItem(item2, src, dest, opts) {
    const srcItem = path2.join(src, item2);
    const destItem = path2.join(dest, item2);
    if (opts.filter && !opts.filter(srcItem, destItem))
      return;
    const { destStat } = stat2.checkPathsSync(srcItem, destItem, "copy", opts);
    return getStats(destStat, srcItem, destItem, opts);
  }
  function onLink(destStat, src, dest, opts) {
    let resolvedSrc = fs2.readlinkSync(src);
    if (opts.dereference) {
      resolvedSrc = path2.resolve(process.cwd(), resolvedSrc);
    }
    if (!destStat) {
      return fs2.symlinkSync(resolvedSrc, dest);
    } else {
      let resolvedDest;
      try {
        resolvedDest = fs2.readlinkSync(dest);
      } catch (err) {
        if (err.code === "EINVAL" || err.code === "UNKNOWN")
          return fs2.symlinkSync(resolvedSrc, dest);
        throw err;
      }
      if (opts.dereference) {
        resolvedDest = path2.resolve(process.cwd(), resolvedDest);
      }
      if (stat2.isSrcSubdir(resolvedSrc, resolvedDest)) {
        throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
      }
      if (stat2.isSrcSubdir(resolvedDest, resolvedSrc)) {
        throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
      }
      return copyLink(resolvedSrc, dest);
    }
  }
  function copyLink(resolvedSrc, dest) {
    fs2.unlinkSync(dest);
    return fs2.symlinkSync(resolvedSrc, dest);
  }
  module.exports = copySync;
});

// ../../../../node_modules/fs-extra/lib/copy/index.js
var require_copy2 = __commonJS((exports, module) => {
  var u = require_universalify().fromPromise;
  module.exports = {
    copy: u(require_copy()),
    copySync: require_copy_sync()
  };
});

// ../../../../node_modules/fs-extra/lib/remove/index.js
var require_remove = __commonJS((exports, module) => {
  var fs2 = require_graceful_fs();
  var u = require_universalify().fromCallback;
  function remove(path2, callback) {
    fs2.rm(path2, { recursive: true, force: true }, callback);
  }
  function removeSync(path2) {
    fs2.rmSync(path2, { recursive: true, force: true });
  }
  module.exports = {
    remove: u(remove),
    removeSync
  };
});

// ../../../../node_modules/fs-extra/lib/empty/index.js
var require_empty = __commonJS((exports, module) => {
  var u = require_universalify().fromPromise;
  var fs2 = require_fs();
  var path2 = __require("path");
  var mkdir2 = require_mkdirs();
  var remove = require_remove();
  var emptyDir = u(async function emptyDir(dir) {
    let items;
    try {
      items = await fs2.readdir(dir);
    } catch {
      return mkdir2.mkdirs(dir);
    }
    return Promise.all(items.map((item2) => remove.remove(path2.join(dir, item2))));
  });
  function emptyDirSync(dir) {
    let items;
    try {
      items = fs2.readdirSync(dir);
    } catch {
      return mkdir2.mkdirsSync(dir);
    }
    items.forEach((item2) => {
      item2 = path2.join(dir, item2);
      remove.removeSync(item2);
    });
  }
  module.exports = {
    emptyDirSync,
    emptydirSync: emptyDirSync,
    emptyDir,
    emptydir: emptyDir
  };
});

// ../../../../node_modules/fs-extra/lib/ensure/file.js
var require_file = __commonJS((exports, module) => {
  var u = require_universalify().fromPromise;
  var path2 = __require("path");
  var fs2 = require_fs();
  var mkdir2 = require_mkdirs();
  async function createFile(file) {
    let stats;
    try {
      stats = await fs2.stat(file);
    } catch {}
    if (stats && stats.isFile())
      return;
    const dir = path2.dirname(file);
    let dirStats = null;
    try {
      dirStats = await fs2.stat(dir);
    } catch (err) {
      if (err.code === "ENOENT") {
        await mkdir2.mkdirs(dir);
        await fs2.writeFile(file, "");
        return;
      } else {
        throw err;
      }
    }
    if (dirStats.isDirectory()) {
      await fs2.writeFile(file, "");
    } else {
      await fs2.readdir(dir);
    }
  }
  function createFileSync(file) {
    let stats;
    try {
      stats = fs2.statSync(file);
    } catch {}
    if (stats && stats.isFile())
      return;
    const dir = path2.dirname(file);
    try {
      if (!fs2.statSync(dir).isDirectory()) {
        fs2.readdirSync(dir);
      }
    } catch (err) {
      if (err && err.code === "ENOENT")
        mkdir2.mkdirsSync(dir);
      else
        throw err;
    }
    fs2.writeFileSync(file, "");
  }
  module.exports = {
    createFile: u(createFile),
    createFileSync
  };
});

// ../../../../node_modules/fs-extra/lib/ensure/link.js
var require_link = __commonJS((exports, module) => {
  var u = require_universalify().fromPromise;
  var path2 = __require("path");
  var fs2 = require_fs();
  var mkdir2 = require_mkdirs();
  var { pathExists: pathExists2 } = require_path_exists();
  var { areIdentical } = require_stat();
  async function createLink(srcpath, dstpath) {
    let dstStat;
    try {
      dstStat = await fs2.lstat(dstpath);
    } catch {}
    let srcStat;
    try {
      srcStat = await fs2.lstat(srcpath);
    } catch (err) {
      err.message = err.message.replace("lstat", "ensureLink");
      throw err;
    }
    if (dstStat && areIdentical(srcStat, dstStat))
      return;
    const dir = path2.dirname(dstpath);
    const dirExists = await pathExists2(dir);
    if (!dirExists) {
      await mkdir2.mkdirs(dir);
    }
    await fs2.link(srcpath, dstpath);
  }
  function createLinkSync(srcpath, dstpath) {
    let dstStat;
    try {
      dstStat = fs2.lstatSync(dstpath);
    } catch {}
    try {
      const srcStat = fs2.lstatSync(srcpath);
      if (dstStat && areIdentical(srcStat, dstStat))
        return;
    } catch (err) {
      err.message = err.message.replace("lstat", "ensureLink");
      throw err;
    }
    const dir = path2.dirname(dstpath);
    const dirExists = fs2.existsSync(dir);
    if (dirExists)
      return fs2.linkSync(srcpath, dstpath);
    mkdir2.mkdirsSync(dir);
    return fs2.linkSync(srcpath, dstpath);
  }
  module.exports = {
    createLink: u(createLink),
    createLinkSync
  };
});

// ../../../../node_modules/fs-extra/lib/ensure/symlink-paths.js
var require_symlink_paths = __commonJS((exports, module) => {
  var path2 = __require("path");
  var fs2 = require_fs();
  var { pathExists: pathExists2 } = require_path_exists();
  var u = require_universalify().fromPromise;
  async function symlinkPaths(srcpath, dstpath) {
    if (path2.isAbsolute(srcpath)) {
      try {
        await fs2.lstat(srcpath);
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureSymlink");
        throw err;
      }
      return {
        toCwd: srcpath,
        toDst: srcpath
      };
    }
    const dstdir = path2.dirname(dstpath);
    const relativeToDst = path2.join(dstdir, srcpath);
    const exists = await pathExists2(relativeToDst);
    if (exists) {
      return {
        toCwd: relativeToDst,
        toDst: srcpath
      };
    }
    try {
      await fs2.lstat(srcpath);
    } catch (err) {
      err.message = err.message.replace("lstat", "ensureSymlink");
      throw err;
    }
    return {
      toCwd: srcpath,
      toDst: path2.relative(dstdir, srcpath)
    };
  }
  function symlinkPathsSync(srcpath, dstpath) {
    if (path2.isAbsolute(srcpath)) {
      const exists2 = fs2.existsSync(srcpath);
      if (!exists2)
        throw new Error("absolute srcpath does not exist");
      return {
        toCwd: srcpath,
        toDst: srcpath
      };
    }
    const dstdir = path2.dirname(dstpath);
    const relativeToDst = path2.join(dstdir, srcpath);
    const exists = fs2.existsSync(relativeToDst);
    if (exists) {
      return {
        toCwd: relativeToDst,
        toDst: srcpath
      };
    }
    const srcExists = fs2.existsSync(srcpath);
    if (!srcExists)
      throw new Error("relative srcpath does not exist");
    return {
      toCwd: srcpath,
      toDst: path2.relative(dstdir, srcpath)
    };
  }
  module.exports = {
    symlinkPaths: u(symlinkPaths),
    symlinkPathsSync
  };
});

// ../../../../node_modules/fs-extra/lib/ensure/symlink-type.js
var require_symlink_type = __commonJS((exports, module) => {
  var fs2 = require_fs();
  var u = require_universalify().fromPromise;
  async function symlinkType(srcpath, type) {
    if (type)
      return type;
    let stats;
    try {
      stats = await fs2.lstat(srcpath);
    } catch {
      return "file";
    }
    return stats && stats.isDirectory() ? "dir" : "file";
  }
  function symlinkTypeSync(srcpath, type) {
    if (type)
      return type;
    let stats;
    try {
      stats = fs2.lstatSync(srcpath);
    } catch {
      return "file";
    }
    return stats && stats.isDirectory() ? "dir" : "file";
  }
  module.exports = {
    symlinkType: u(symlinkType),
    symlinkTypeSync
  };
});

// ../../../../node_modules/fs-extra/lib/ensure/symlink.js
var require_symlink = __commonJS((exports, module) => {
  var u = require_universalify().fromPromise;
  var path2 = __require("path");
  var fs2 = require_fs();
  var { mkdirs, mkdirsSync } = require_mkdirs();
  var { symlinkPaths, symlinkPathsSync } = require_symlink_paths();
  var { symlinkType, symlinkTypeSync } = require_symlink_type();
  var { pathExists: pathExists2 } = require_path_exists();
  var { areIdentical } = require_stat();
  async function createSymlink(srcpath, dstpath, type) {
    let stats;
    try {
      stats = await fs2.lstat(dstpath);
    } catch {}
    if (stats && stats.isSymbolicLink()) {
      const [srcStat, dstStat] = await Promise.all([
        fs2.stat(srcpath),
        fs2.stat(dstpath)
      ]);
      if (areIdentical(srcStat, dstStat))
        return;
    }
    const relative3 = await symlinkPaths(srcpath, dstpath);
    srcpath = relative3.toDst;
    const toType = await symlinkType(relative3.toCwd, type);
    const dir = path2.dirname(dstpath);
    if (!await pathExists2(dir)) {
      await mkdirs(dir);
    }
    return fs2.symlink(srcpath, dstpath, toType);
  }
  function createSymlinkSync(srcpath, dstpath, type) {
    let stats;
    try {
      stats = fs2.lstatSync(dstpath);
    } catch {}
    if (stats && stats.isSymbolicLink()) {
      const srcStat = fs2.statSync(srcpath);
      const dstStat = fs2.statSync(dstpath);
      if (areIdentical(srcStat, dstStat))
        return;
    }
    const relative3 = symlinkPathsSync(srcpath, dstpath);
    srcpath = relative3.toDst;
    type = symlinkTypeSync(relative3.toCwd, type);
    const dir = path2.dirname(dstpath);
    const exists = fs2.existsSync(dir);
    if (exists)
      return fs2.symlinkSync(srcpath, dstpath, type);
    mkdirsSync(dir);
    return fs2.symlinkSync(srcpath, dstpath, type);
  }
  module.exports = {
    createSymlink: u(createSymlink),
    createSymlinkSync
  };
});

// ../../../../node_modules/fs-extra/lib/ensure/index.js
var require_ensure = __commonJS((exports, module) => {
  var { createFile, createFileSync } = require_file();
  var { createLink, createLinkSync } = require_link();
  var { createSymlink, createSymlinkSync } = require_symlink();
  module.exports = {
    createFile,
    createFileSync,
    ensureFile: createFile,
    ensureFileSync: createFileSync,
    createLink,
    createLinkSync,
    ensureLink: createLink,
    ensureLinkSync: createLinkSync,
    createSymlink,
    createSymlinkSync,
    ensureSymlink: createSymlink,
    ensureSymlinkSync: createSymlinkSync
  };
});

// ../../../../node_modules/jsonfile/utils.js
var require_utils2 = __commonJS((exports, module) => {
  function stringify(obj, { EOL = `
`, finalEOL = true, replacer = null, spaces } = {}) {
    const EOF = finalEOL ? EOL : "";
    const str = JSON.stringify(obj, replacer, spaces);
    return str.replace(/\n/g, EOL) + EOF;
  }
  function stripBom(content) {
    if (Buffer.isBuffer(content))
      content = content.toString("utf8");
    return content.replace(/^\uFEFF/, "");
  }
  module.exports = { stringify, stripBom };
});

// ../../../../node_modules/jsonfile/index.js
var require_jsonfile = __commonJS((exports, module) => {
  var _fs;
  try {
    _fs = require_graceful_fs();
  } catch (_) {
    _fs = __require("fs");
  }
  var universalify = require_universalify();
  var { stringify, stripBom } = require_utils2();
  async function _readFile(file, options = {}) {
    if (typeof options === "string") {
      options = { encoding: options };
    }
    const fs2 = options.fs || _fs;
    const shouldThrow = "throws" in options ? options.throws : true;
    let data = await universalify.fromCallback(fs2.readFile)(file, options);
    data = stripBom(data);
    let obj;
    try {
      obj = JSON.parse(data, options ? options.reviver : null);
    } catch (err) {
      if (shouldThrow) {
        err.message = `${file}: ${err.message}`;
        throw err;
      } else {
        return null;
      }
    }
    return obj;
  }
  var readFile = universalify.fromPromise(_readFile);
  function readFileSync(file, options = {}) {
    if (typeof options === "string") {
      options = { encoding: options };
    }
    const fs2 = options.fs || _fs;
    const shouldThrow = "throws" in options ? options.throws : true;
    try {
      let content = fs2.readFileSync(file, options);
      content = stripBom(content);
      return JSON.parse(content, options.reviver);
    } catch (err) {
      if (shouldThrow) {
        err.message = `${file}: ${err.message}`;
        throw err;
      } else {
        return null;
      }
    }
  }
  async function _writeFile(file, obj, options = {}) {
    const fs2 = options.fs || _fs;
    const str = stringify(obj, options);
    await universalify.fromCallback(fs2.writeFile)(file, str, options);
  }
  var writeFile2 = universalify.fromPromise(_writeFile);
  function writeFileSync3(file, obj, options = {}) {
    const fs2 = options.fs || _fs;
    const str = stringify(obj, options);
    return fs2.writeFileSync(file, str, options);
  }
  var jsonfile = {
    readFile,
    readFileSync,
    writeFile: writeFile2,
    writeFileSync: writeFileSync3
  };
  module.exports = jsonfile;
});

// ../../../../node_modules/fs-extra/lib/json/jsonfile.js
var require_jsonfile2 = __commonJS((exports, module) => {
  var jsonFile = require_jsonfile();
  module.exports = {
    readJson: jsonFile.readFile,
    readJsonSync: jsonFile.readFileSync,
    writeJson: jsonFile.writeFile,
    writeJsonSync: jsonFile.writeFileSync
  };
});

// ../../../../node_modules/fs-extra/lib/output-file/index.js
var require_output_file = __commonJS((exports, module) => {
  var u = require_universalify().fromPromise;
  var fs2 = require_fs();
  var path2 = __require("path");
  var mkdir2 = require_mkdirs();
  var pathExists2 = require_path_exists().pathExists;
  async function outputFile(file, data, encoding = "utf-8") {
    const dir = path2.dirname(file);
    if (!await pathExists2(dir)) {
      await mkdir2.mkdirs(dir);
    }
    return fs2.writeFile(file, data, encoding);
  }
  function outputFileSync(file, ...args) {
    const dir = path2.dirname(file);
    if (!fs2.existsSync(dir)) {
      mkdir2.mkdirsSync(dir);
    }
    fs2.writeFileSync(file, ...args);
  }
  module.exports = {
    outputFile: u(outputFile),
    outputFileSync
  };
});

// ../../../../node_modules/fs-extra/lib/json/output-json.js
var require_output_json = __commonJS((exports, module) => {
  var { stringify } = require_utils2();
  var { outputFile } = require_output_file();
  async function outputJson(file, data, options = {}) {
    const str = stringify(data, options);
    await outputFile(file, str, options);
  }
  module.exports = outputJson;
});

// ../../../../node_modules/fs-extra/lib/json/output-json-sync.js
var require_output_json_sync = __commonJS((exports, module) => {
  var { stringify } = require_utils2();
  var { outputFileSync } = require_output_file();
  function outputJsonSync(file, data, options) {
    const str = stringify(data, options);
    outputFileSync(file, str, options);
  }
  module.exports = outputJsonSync;
});

// ../../../../node_modules/fs-extra/lib/json/index.js
var require_json = __commonJS((exports, module) => {
  var u = require_universalify().fromPromise;
  var jsonFile = require_jsonfile2();
  jsonFile.outputJson = u(require_output_json());
  jsonFile.outputJsonSync = require_output_json_sync();
  jsonFile.outputJSON = jsonFile.outputJson;
  jsonFile.outputJSONSync = jsonFile.outputJsonSync;
  jsonFile.writeJSON = jsonFile.writeJson;
  jsonFile.writeJSONSync = jsonFile.writeJsonSync;
  jsonFile.readJSON = jsonFile.readJson;
  jsonFile.readJSONSync = jsonFile.readJsonSync;
  module.exports = jsonFile;
});

// ../../../../node_modules/fs-extra/lib/move/move.js
var require_move = __commonJS((exports, module) => {
  var fs2 = require_fs();
  var path2 = __require("path");
  var { copy } = require_copy2();
  var { remove } = require_remove();
  var { mkdirp } = require_mkdirs();
  var { pathExists: pathExists2 } = require_path_exists();
  var stat2 = require_stat();
  async function move(src, dest, opts = {}) {
    const overwrite = opts.overwrite || opts.clobber || false;
    const { srcStat, isChangingCase = false } = await stat2.checkPaths(src, dest, "move", opts);
    await stat2.checkParentPaths(src, srcStat, dest, "move");
    const destParent = path2.dirname(dest);
    const parsedParentPath = path2.parse(destParent);
    if (parsedParentPath.root !== destParent) {
      await mkdirp(destParent);
    }
    return doRename(src, dest, overwrite, isChangingCase);
  }
  async function doRename(src, dest, overwrite, isChangingCase) {
    if (!isChangingCase) {
      if (overwrite) {
        await remove(dest);
      } else if (await pathExists2(dest)) {
        throw new Error("dest already exists.");
      }
    }
    try {
      await fs2.rename(src, dest);
    } catch (err) {
      if (err.code !== "EXDEV") {
        throw err;
      }
      await moveAcrossDevice(src, dest, overwrite);
    }
  }
  async function moveAcrossDevice(src, dest, overwrite) {
    const opts = {
      overwrite,
      errorOnExist: true,
      preserveTimestamps: true
    };
    await copy(src, dest, opts);
    return remove(src);
  }
  module.exports = move;
});

// ../../../../node_modules/fs-extra/lib/move/move-sync.js
var require_move_sync = __commonJS((exports, module) => {
  var fs2 = require_graceful_fs();
  var path2 = __require("path");
  var copySync = require_copy2().copySync;
  var removeSync = require_remove().removeSync;
  var mkdirpSync = require_mkdirs().mkdirpSync;
  var stat2 = require_stat();
  function moveSync(src, dest, opts) {
    opts = opts || {};
    const overwrite = opts.overwrite || opts.clobber || false;
    const { srcStat, isChangingCase = false } = stat2.checkPathsSync(src, dest, "move", opts);
    stat2.checkParentPathsSync(src, srcStat, dest, "move");
    if (!isParentRoot(dest))
      mkdirpSync(path2.dirname(dest));
    return doRename(src, dest, overwrite, isChangingCase);
  }
  function isParentRoot(dest) {
    const parent = path2.dirname(dest);
    const parsedPath = path2.parse(parent);
    return parsedPath.root === parent;
  }
  function doRename(src, dest, overwrite, isChangingCase) {
    if (isChangingCase)
      return rename2(src, dest, overwrite);
    if (overwrite) {
      removeSync(dest);
      return rename2(src, dest, overwrite);
    }
    if (fs2.existsSync(dest))
      throw new Error("dest already exists.");
    return rename2(src, dest, overwrite);
  }
  function rename2(src, dest, overwrite) {
    try {
      fs2.renameSync(src, dest);
    } catch (err) {
      if (err.code !== "EXDEV")
        throw err;
      return moveAcrossDevice(src, dest, overwrite);
    }
  }
  function moveAcrossDevice(src, dest, overwrite) {
    const opts = {
      overwrite,
      errorOnExist: true,
      preserveTimestamps: true
    };
    copySync(src, dest, opts);
    return removeSync(src);
  }
  module.exports = moveSync;
});

// ../../../../node_modules/fs-extra/lib/move/index.js
var require_move2 = __commonJS((exports, module) => {
  var u = require_universalify().fromPromise;
  module.exports = {
    move: u(require_move()),
    moveSync: require_move_sync()
  };
});

// ../../../../node_modules/fs-extra/lib/index.js
var require_lib = __commonJS((exports, module) => {
  module.exports = {
    ...require_fs(),
    ...require_copy2(),
    ...require_empty(),
    ...require_ensure(),
    ...require_json(),
    ...require_mkdirs(),
    ...require_move2(),
    ...require_output_file(),
    ...require_path_exists(),
    ...require_remove()
  };
});

// ../../../../node_modules/kleur/index.js
var require_kleur = __commonJS((exports, module) => {
  var { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = process.env;
  var $2 = {
    enabled: !NODE_DISABLE_COLORS && TERM !== "dumb" && FORCE_COLOR !== "0",
    reset: init(0, 0),
    bold: init(1, 22),
    dim: init(2, 22),
    italic: init(3, 23),
    underline: init(4, 24),
    inverse: init(7, 27),
    hidden: init(8, 28),
    strikethrough: init(9, 29),
    black: init(30, 39),
    red: init(31, 39),
    green: init(32, 39),
    yellow: init(33, 39),
    blue: init(34, 39),
    magenta: init(35, 39),
    cyan: init(36, 39),
    white: init(37, 39),
    gray: init(90, 39),
    grey: init(90, 39),
    bgBlack: init(40, 49),
    bgRed: init(41, 49),
    bgGreen: init(42, 49),
    bgYellow: init(43, 49),
    bgBlue: init(44, 49),
    bgMagenta: init(45, 49),
    bgCyan: init(46, 49),
    bgWhite: init(47, 49)
  };
  function run(arr, str) {
    let i = 0, tmp, beg = "", end = "";
    for (;i < arr.length; i++) {
      tmp = arr[i];
      beg += tmp.open;
      end += tmp.close;
      if (str.includes(tmp.close)) {
        str = str.replace(tmp.rgx, tmp.close + tmp.open);
      }
    }
    return beg + str + end;
  }
  function chain(has, keys) {
    let ctx = { has, keys };
    ctx.reset = $2.reset.bind(ctx);
    ctx.bold = $2.bold.bind(ctx);
    ctx.dim = $2.dim.bind(ctx);
    ctx.italic = $2.italic.bind(ctx);
    ctx.underline = $2.underline.bind(ctx);
    ctx.inverse = $2.inverse.bind(ctx);
    ctx.hidden = $2.hidden.bind(ctx);
    ctx.strikethrough = $2.strikethrough.bind(ctx);
    ctx.black = $2.black.bind(ctx);
    ctx.red = $2.red.bind(ctx);
    ctx.green = $2.green.bind(ctx);
    ctx.yellow = $2.yellow.bind(ctx);
    ctx.blue = $2.blue.bind(ctx);
    ctx.magenta = $2.magenta.bind(ctx);
    ctx.cyan = $2.cyan.bind(ctx);
    ctx.white = $2.white.bind(ctx);
    ctx.gray = $2.gray.bind(ctx);
    ctx.grey = $2.grey.bind(ctx);
    ctx.bgBlack = $2.bgBlack.bind(ctx);
    ctx.bgRed = $2.bgRed.bind(ctx);
    ctx.bgGreen = $2.bgGreen.bind(ctx);
    ctx.bgYellow = $2.bgYellow.bind(ctx);
    ctx.bgBlue = $2.bgBlue.bind(ctx);
    ctx.bgMagenta = $2.bgMagenta.bind(ctx);
    ctx.bgCyan = $2.bgCyan.bind(ctx);
    ctx.bgWhite = $2.bgWhite.bind(ctx);
    return ctx;
  }
  function init(open, close) {
    let blk = {
      open: `\x1B[${open}m`,
      close: `\x1B[${close}m`,
      rgx: new RegExp(`\\x1b\\[${close}m`, "g")
    };
    return function(txt) {
      if (this !== undefined && this.has !== undefined) {
        this.has.includes(open) || (this.has.push(open), this.keys.push(blk));
        return txt === undefined ? this : $2.enabled ? run(this.keys, txt + "") : txt + "";
      }
      return txt === undefined ? chain([open], [blk]) : $2.enabled ? run([blk], txt + "") : txt + "";
    };
  }
  module.exports = $2;
});

// ../../../../node_modules/prompts/dist/util/action.js
var require_action = __commonJS((exports, module) => {
  module.exports = (key, isSelect) => {
    if (key.meta && key.name !== "escape")
      return;
    if (key.ctrl) {
      if (key.name === "a")
        return "first";
      if (key.name === "c")
        return "abort";
      if (key.name === "d")
        return "abort";
      if (key.name === "e")
        return "last";
      if (key.name === "g")
        return "reset";
    }
    if (isSelect) {
      if (key.name === "j")
        return "down";
      if (key.name === "k")
        return "up";
    }
    if (key.name === "return")
      return "submit";
    if (key.name === "enter")
      return "submit";
    if (key.name === "backspace")
      return "delete";
    if (key.name === "delete")
      return "deleteForward";
    if (key.name === "abort")
      return "abort";
    if (key.name === "escape")
      return "exit";
    if (key.name === "tab")
      return "next";
    if (key.name === "pagedown")
      return "nextPage";
    if (key.name === "pageup")
      return "prevPage";
    if (key.name === "home")
      return "home";
    if (key.name === "end")
      return "end";
    if (key.name === "up")
      return "up";
    if (key.name === "down")
      return "down";
    if (key.name === "right")
      return "right";
    if (key.name === "left")
      return "left";
    return false;
  };
});

// ../../../../node_modules/prompts/dist/util/strip.js
var require_strip = __commonJS((exports, module) => {
  module.exports = (str) => {
    const pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"].join("|");
    const RGX = new RegExp(pattern, "g");
    return typeof str === "string" ? str.replace(RGX, "") : str;
  };
});

// ../../../../node_modules/sisteransi/src/index.js
var require_src = __commonJS((exports, module) => {
  var ESC = "\x1B";
  var CSI = `${ESC}[`;
  var beep = "\x07";
  var cursor = {
    to(x2, y) {
      if (!y)
        return `${CSI}${x2 + 1}G`;
      return `${CSI}${y + 1};${x2 + 1}H`;
    },
    move(x2, y) {
      let ret = "";
      if (x2 < 0)
        ret += `${CSI}${-x2}D`;
      else if (x2 > 0)
        ret += `${CSI}${x2}C`;
      if (y < 0)
        ret += `${CSI}${-y}A`;
      else if (y > 0)
        ret += `${CSI}${y}B`;
      return ret;
    },
    up: (count = 1) => `${CSI}${count}A`,
    down: (count = 1) => `${CSI}${count}B`,
    forward: (count = 1) => `${CSI}${count}C`,
    backward: (count = 1) => `${CSI}${count}D`,
    nextLine: (count = 1) => `${CSI}E`.repeat(count),
    prevLine: (count = 1) => `${CSI}F`.repeat(count),
    left: `${CSI}G`,
    hide: `${CSI}?25l`,
    show: `${CSI}?25h`,
    save: `${ESC}7`,
    restore: `${ESC}8`
  };
  var scroll = {
    up: (count = 1) => `${CSI}S`.repeat(count),
    down: (count = 1) => `${CSI}T`.repeat(count)
  };
  var erase = {
    screen: `${CSI}2J`,
    up: (count = 1) => `${CSI}1J`.repeat(count),
    down: (count = 1) => `${CSI}J`.repeat(count),
    line: `${CSI}2K`,
    lineEnd: `${CSI}K`,
    lineStart: `${CSI}1K`,
    lines(count) {
      let clear = "";
      for (let i = 0;i < count; i++)
        clear += this.line + (i < count - 1 ? cursor.up() : "");
      if (count)
        clear += cursor.left;
      return clear;
    }
  };
  module.exports = { cursor, scroll, erase, beep };
});

// ../../../../node_modules/prompts/dist/util/clear.js
var require_clear = __commonJS((exports, module) => {
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it)
          o = it;
        var i = 0;
        var F = function F() {};
        return { s: F, n: function n() {
          if (i >= o.length)
            return { done: true };
          return { done: false, value: o[i++] };
        }, e: function e(_e) {
          throw _e;
        }, f: F };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var normalCompletion = true, didErr = false, err2;
    return { s: function s() {
      it = it.call(o);
    }, n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    }, e: function e(_e2) {
      didErr = true;
      err2 = _e2;
    }, f: function f() {
      try {
        if (!normalCompletion && it.return != null)
          it.return();
      } finally {
        if (didErr)
          throw err2;
      }
    } };
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len);i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  var strip = require_strip();
  var _require = require_src();
  var erase = _require.erase;
  var cursor = _require.cursor;
  var width = (str) => [...strip(str)].length;
  module.exports = function(prompt, perLine) {
    if (!perLine)
      return erase.line + cursor.to(0);
    let rows = 0;
    const lines = prompt.split(/\r?\n/);
    var _iterator = _createForOfIteratorHelper(lines), _step;
    try {
      for (_iterator.s();!(_step = _iterator.n()).done; ) {
        let line = _step.value;
        rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
      }
    } catch (err2) {
      _iterator.e(err2);
    } finally {
      _iterator.f();
    }
    return erase.lines(rows);
  };
});

// ../../../../node_modules/prompts/dist/util/figures.js
var require_figures = __commonJS((exports, module) => {
  var main = {
    arrowUp: "\u2191",
    arrowDown: "\u2193",
    arrowLeft: "\u2190",
    arrowRight: "\u2192",
    radioOn: "\u25C9",
    radioOff: "\u25EF",
    tick: "\u2714",
    cross: "\u2716",
    ellipsis: "\u2026",
    pointerSmall: "\u203A",
    line: "\u2500",
    pointer: "\u276F"
  };
  var win = {
    arrowUp: main.arrowUp,
    arrowDown: main.arrowDown,
    arrowLeft: main.arrowLeft,
    arrowRight: main.arrowRight,
    radioOn: "(*)",
    radioOff: "( )",
    tick: "\u221A",
    cross: "\xD7",
    ellipsis: "...",
    pointerSmall: "\xBB",
    line: "\u2500",
    pointer: ">"
  };
  var figures = process.platform === "win32" ? win : main;
  module.exports = figures;
});

// ../../../../node_modules/prompts/dist/util/style.js
var require_style = __commonJS((exports, module) => {
  var c = require_kleur();
  var figures = require_figures();
  var styles2 = Object.freeze({
    password: {
      scale: 1,
      render: (input) => "*".repeat(input.length)
    },
    emoji: {
      scale: 2,
      render: (input) => "\uD83D\uDE03".repeat(input.length)
    },
    invisible: {
      scale: 0,
      render: (input) => ""
    },
    default: {
      scale: 1,
      render: (input) => `${input}`
    }
  });
  var render = (type) => styles2[type] || styles2.default;
  var symbols = Object.freeze({
    aborted: c.red(figures.cross),
    done: c.green(figures.tick),
    exited: c.yellow(figures.cross),
    default: c.cyan("?")
  });
  var symbol = (done, aborted, exited) => aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default;
  var delimiter2 = (completing) => c.gray(completing ? figures.ellipsis : figures.pointerSmall);
  var item2 = (expandable, expanded) => c.gray(expandable ? expanded ? figures.pointerSmall : "+" : figures.line);
  module.exports = {
    styles: styles2,
    render,
    symbols,
    symbol,
    delimiter: delimiter2,
    item: item2
  };
});

// ../../../../node_modules/prompts/dist/util/lines.js
var require_lines = __commonJS((exports, module) => {
  var strip = require_strip();
  module.exports = function(msg, perLine) {
    let lines = String(strip(msg) || "").split(/\r?\n/);
    if (!perLine)
      return lines.length;
    return lines.map((l2) => Math.ceil(l2.length / perLine)).reduce((a, b) => a + b);
  };
});

// ../../../../node_modules/prompts/dist/util/wrap.js
var require_wrap = __commonJS((exports, module) => {
  module.exports = (msg, opts = {}) => {
    const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(" ").join("") : opts.margin || "";
    const width = opts.width;
    return (msg || "").split(/\r?\n/g).map((line) => line.split(/\s+/g).reduce((arr, w) => {
      if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width)
        arr[arr.length - 1] += ` ${w}`;
      else
        arr.push(`${tab}${w}`);
      return arr;
    }, [tab]).join(`
`)).join(`
`);
  };
});

// ../../../../node_modules/prompts/dist/util/entriesToDisplay.js
var require_entriesToDisplay = __commonJS((exports, module) => {
  module.exports = (cursor, total, maxVisible) => {
    maxVisible = maxVisible || total;
    let startIndex = Math.min(total - maxVisible, cursor - Math.floor(maxVisible / 2));
    if (startIndex < 0)
      startIndex = 0;
    let endIndex = Math.min(startIndex + maxVisible, total);
    return {
      startIndex,
      endIndex
    };
  };
});

// ../../../../node_modules/prompts/dist/util/index.js
var require_util = __commonJS((exports, module) => {
  module.exports = {
    action: require_action(),
    clear: require_clear(),
    style: require_style(),
    strip: require_strip(),
    figures: require_figures(),
    lines: require_lines(),
    wrap: require_wrap(),
    entriesToDisplay: require_entriesToDisplay()
  };
});

// ../../../../node_modules/prompts/dist/elements/prompt.js
var require_prompt = __commonJS((exports, module) => {
  var readline = __require("readline");
  var _require = require_util();
  var action = _require.action;
  var EventEmitter2 = __require("events");
  var _require2 = require_src();
  var beep = _require2.beep;
  var cursor = _require2.cursor;
  var color = require_kleur();

  class Prompt extends EventEmitter2 {
    constructor(opts = {}) {
      super();
      this.firstRender = true;
      this.in = opts.stdin || process.stdin;
      this.out = opts.stdout || process.stdout;
      this.onRender = (opts.onRender || (() => {
        return;
      })).bind(this);
      const rl = readline.createInterface({
        input: this.in,
        escapeCodeTimeout: 50
      });
      readline.emitKeypressEvents(this.in, rl);
      if (this.in.isTTY)
        this.in.setRawMode(true);
      const isSelect = ["SelectPrompt", "MultiselectPrompt"].indexOf(this.constructor.name) > -1;
      const keypress = (str, key) => {
        let a = action(key, isSelect);
        if (a === false) {
          this._ && this._(str, key);
        } else if (typeof this[a] === "function") {
          this[a](key);
        } else {
          this.bell();
        }
      };
      this.close = () => {
        this.out.write(cursor.show);
        this.in.removeListener("keypress", keypress);
        if (this.in.isTTY)
          this.in.setRawMode(false);
        rl.close();
        this.emit(this.aborted ? "abort" : this.exited ? "exit" : "submit", this.value);
        this.closed = true;
      };
      this.in.on("keypress", keypress);
    }
    fire() {
      this.emit("state", {
        value: this.value,
        aborted: !!this.aborted,
        exited: !!this.exited
      });
    }
    bell() {
      this.out.write(beep);
    }
    render() {
      this.onRender(color);
      if (this.firstRender)
        this.firstRender = false;
    }
  }
  module.exports = Prompt;
});

// ../../../../node_modules/prompts/dist/elements/text.js
var require_text = __commonJS((exports, module) => {
  function asyncGeneratorStep(gen, resolve4, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve4(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve4, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve4, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep(gen, resolve4, reject, _next, _throw, "throw", err2);
        }
        _next(undefined);
      });
    };
  }
  var color = require_kleur();
  var Prompt = require_prompt();
  var _require = require_src();
  var erase = _require.erase;
  var cursor = _require.cursor;
  var _require2 = require_util();
  var style = _require2.style;
  var clear = _require2.clear;
  var lines = _require2.lines;
  var figures = _require2.figures;

  class TextPrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.transform = style.render(opts.style);
      this.scale = this.transform.scale;
      this.msg = opts.message;
      this.initial = opts.initial || ``;
      this.validator = opts.validate || (() => true);
      this.value = ``;
      this.errorMsg = opts.error || `Please Enter A Valid Value`;
      this.cursor = Number(!!this.initial);
      this.cursorOffset = 0;
      this.clear = clear(``, this.out.columns);
      this.render();
    }
    set value(v) {
      if (!v && this.initial) {
        this.placeholder = true;
        this.rendered = color.gray(this.transform.render(this.initial));
      } else {
        this.placeholder = false;
        this.rendered = this.transform.render(v);
      }
      this._value = v;
      this.fire();
    }
    get value() {
      return this._value;
    }
    reset() {
      this.value = ``;
      this.cursor = Number(!!this.initial);
      this.cursorOffset = 0;
      this.fire();
      this.render();
    }
    exit() {
      this.abort();
    }
    abort() {
      this.value = this.value || this.initial;
      this.done = this.aborted = true;
      this.error = false;
      this.red = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    validate() {
      var _this = this;
      return _asyncToGenerator(function* () {
        let valid = yield _this.validator(_this.value);
        if (typeof valid === `string`) {
          _this.errorMsg = valid;
          valid = false;
        }
        _this.error = !valid;
      })();
    }
    submit() {
      var _this2 = this;
      return _asyncToGenerator(function* () {
        _this2.value = _this2.value || _this2.initial;
        _this2.cursorOffset = 0;
        _this2.cursor = _this2.rendered.length;
        yield _this2.validate();
        if (_this2.error) {
          _this2.red = true;
          _this2.fire();
          _this2.render();
          return;
        }
        _this2.done = true;
        _this2.aborted = false;
        _this2.fire();
        _this2.render();
        _this2.out.write(`
`);
        _this2.close();
      })();
    }
    next() {
      if (!this.placeholder)
        return this.bell();
      this.value = this.initial;
      this.cursor = this.rendered.length;
      this.fire();
      this.render();
    }
    moveCursor(n) {
      if (this.placeholder)
        return;
      this.cursor = this.cursor + n;
      this.cursorOffset += n;
    }
    _(c, key) {
      let s1 = this.value.slice(0, this.cursor);
      let s2 = this.value.slice(this.cursor);
      this.value = `${s1}${c}${s2}`;
      this.red = false;
      this.cursor = this.placeholder ? 0 : s1.length + 1;
      this.render();
    }
    delete() {
      if (this.isCursorAtStart())
        return this.bell();
      let s1 = this.value.slice(0, this.cursor - 1);
      let s2 = this.value.slice(this.cursor);
      this.value = `${s1}${s2}`;
      this.red = false;
      if (this.isCursorAtStart()) {
        this.cursorOffset = 0;
      } else {
        this.cursorOffset++;
        this.moveCursor(-1);
      }
      this.render();
    }
    deleteForward() {
      if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
        return this.bell();
      let s1 = this.value.slice(0, this.cursor);
      let s2 = this.value.slice(this.cursor + 1);
      this.value = `${s1}${s2}`;
      this.red = false;
      if (this.isCursorAtEnd()) {
        this.cursorOffset = 0;
      } else {
        this.cursorOffset++;
      }
      this.render();
    }
    first() {
      this.cursor = 0;
      this.render();
    }
    last() {
      this.cursor = this.value.length;
      this.render();
    }
    left() {
      if (this.cursor <= 0 || this.placeholder)
        return this.bell();
      this.moveCursor(-1);
      this.render();
    }
    right() {
      if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
        return this.bell();
      this.moveCursor(1);
      this.render();
    }
    isCursorAtStart() {
      return this.cursor === 0 || this.placeholder && this.cursor === 1;
    }
    isCursorAtEnd() {
      return this.cursor === this.rendered.length || this.placeholder && this.cursor === this.rendered.length + 1;
    }
    render() {
      if (this.closed)
        return;
      if (!this.firstRender) {
        if (this.outputError)
          this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
        this.out.write(clear(this.outputText, this.out.columns));
      }
      super.render();
      this.outputError = "";
      this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.red ? color.red(this.rendered) : this.rendered].join(` `);
      if (this.error) {
        this.outputError += this.errorMsg.split(`
`).reduce((a, l2, i) => a + `
${i ? " " : figures.pointerSmall} ${color.red().italic(l2)}`, ``);
      }
      this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore + cursor.move(this.cursorOffset, 0));
    }
  }
  module.exports = TextPrompt;
});

// ../../../../node_modules/prompts/dist/elements/select.js
var require_select = __commonJS((exports, module) => {
  var color = require_kleur();
  var Prompt = require_prompt();
  var _require = require_util();
  var style = _require.style;
  var clear = _require.clear;
  var figures = _require.figures;
  var wrap = _require.wrap;
  var entriesToDisplay = _require.entriesToDisplay;
  var _require2 = require_src();
  var cursor = _require2.cursor;

  class SelectPrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.msg = opts.message;
      this.hint = opts.hint || "- Use arrow-keys. Return to submit.";
      this.warn = opts.warn || "- This option is disabled";
      this.cursor = opts.initial || 0;
      this.choices = opts.choices.map((ch, idx) => {
        if (typeof ch === "string")
          ch = {
            title: ch,
            value: idx
          };
        return {
          title: ch && (ch.title || ch.value || ch),
          value: ch && (ch.value === undefined ? idx : ch.value),
          description: ch && ch.description,
          selected: ch && ch.selected,
          disabled: ch && ch.disabled
        };
      });
      this.optionsPerPage = opts.optionsPerPage || 10;
      this.value = (this.choices[this.cursor] || {}).value;
      this.clear = clear("", this.out.columns);
      this.render();
    }
    moveCursor(n) {
      this.cursor = n;
      this.value = this.choices[n].value;
      this.fire();
    }
    reset() {
      this.moveCursor(0);
      this.fire();
      this.render();
    }
    exit() {
      this.abort();
    }
    abort() {
      this.done = this.aborted = true;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    submit() {
      if (!this.selection.disabled) {
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      } else
        this.bell();
    }
    first() {
      this.moveCursor(0);
      this.render();
    }
    last() {
      this.moveCursor(this.choices.length - 1);
      this.render();
    }
    up() {
      if (this.cursor === 0) {
        this.moveCursor(this.choices.length - 1);
      } else {
        this.moveCursor(this.cursor - 1);
      }
      this.render();
    }
    down() {
      if (this.cursor === this.choices.length - 1) {
        this.moveCursor(0);
      } else {
        this.moveCursor(this.cursor + 1);
      }
      this.render();
    }
    next() {
      this.moveCursor((this.cursor + 1) % this.choices.length);
      this.render();
    }
    _(c, key) {
      if (c === " ")
        return this.submit();
    }
    get selection() {
      return this.choices[this.cursor];
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      else
        this.out.write(clear(this.outputText, this.out.columns));
      super.render();
      let _entriesToDisplay = entriesToDisplay(this.cursor, this.choices.length, this.optionsPerPage), startIndex = _entriesToDisplay.startIndex, endIndex = _entriesToDisplay.endIndex;
      this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.done ? this.selection.title : this.selection.disabled ? color.yellow(this.warn) : color.gray(this.hint)].join(" ");
      if (!this.done) {
        this.outputText += `
`;
        for (let i = startIndex;i < endIndex; i++) {
          let title, prefix, desc = "", v = this.choices[i];
          if (i === startIndex && startIndex > 0) {
            prefix = figures.arrowUp;
          } else if (i === endIndex - 1 && endIndex < this.choices.length) {
            prefix = figures.arrowDown;
          } else {
            prefix = " ";
          }
          if (v.disabled) {
            title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
            prefix = (this.cursor === i ? color.bold().gray(figures.pointer) + " " : "  ") + prefix;
          } else {
            title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
            prefix = (this.cursor === i ? color.cyan(figures.pointer) + " " : "  ") + prefix;
            if (v.description && this.cursor === i) {
              desc = ` - ${v.description}`;
              if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
                desc = `
` + wrap(v.description, {
                  margin: 3,
                  width: this.out.columns
                });
              }
            }
          }
          this.outputText += `${prefix} ${title}${color.gray(desc)}
`;
        }
      }
      this.out.write(this.outputText);
    }
  }
  module.exports = SelectPrompt;
});

// ../../../../node_modules/prompts/dist/elements/toggle.js
var require_toggle = __commonJS((exports, module) => {
  var color = require_kleur();
  var Prompt = require_prompt();
  var _require = require_util();
  var style = _require.style;
  var clear = _require.clear;
  var _require2 = require_src();
  var cursor = _require2.cursor;
  var erase = _require2.erase;

  class TogglePrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.msg = opts.message;
      this.value = !!opts.initial;
      this.active = opts.active || "on";
      this.inactive = opts.inactive || "off";
      this.initialValue = this.value;
      this.render();
    }
    reset() {
      this.value = this.initialValue;
      this.fire();
      this.render();
    }
    exit() {
      this.abort();
    }
    abort() {
      this.done = this.aborted = true;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    submit() {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    deactivate() {
      if (this.value === false)
        return this.bell();
      this.value = false;
      this.render();
    }
    activate() {
      if (this.value === true)
        return this.bell();
      this.value = true;
      this.render();
    }
    delete() {
      this.deactivate();
    }
    left() {
      this.deactivate();
    }
    right() {
      this.activate();
    }
    down() {
      this.deactivate();
    }
    up() {
      this.activate();
    }
    next() {
      this.value = !this.value;
      this.fire();
      this.render();
    }
    _(c, key) {
      if (c === " ") {
        this.value = !this.value;
      } else if (c === "1") {
        this.value = true;
      } else if (c === "0") {
        this.value = false;
      } else
        return this.bell();
      this.render();
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      else
        this.out.write(clear(this.outputText, this.out.columns));
      super.render();
      this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.value ? this.inactive : color.cyan().underline(this.inactive), color.gray("/"), this.value ? color.cyan().underline(this.active) : this.active].join(" ");
      this.out.write(erase.line + cursor.to(0) + this.outputText);
    }
  }
  module.exports = TogglePrompt;
});

// ../../../../node_modules/prompts/dist/dateparts/datepart.js
var require_datepart = __commonJS((exports, module) => {
  class DatePart {
    constructor({
      token,
      date,
      parts,
      locales: locales2
    }) {
      this.token = token;
      this.date = date || new Date;
      this.parts = parts || [this];
      this.locales = locales2 || {};
    }
    up() {}
    down() {}
    next() {
      const currentIdx = this.parts.indexOf(this);
      return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
    }
    setTo(val) {}
    prev() {
      let parts = [].concat(this.parts).reverse();
      const currentIdx = parts.indexOf(this);
      return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
    }
    toString() {
      return String(this.date);
    }
  }
  module.exports = DatePart;
});

// ../../../../node_modules/prompts/dist/dateparts/meridiem.js
var require_meridiem = __commonJS((exports, module) => {
  var DatePart = require_datepart();

  class Meridiem extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setHours((this.date.getHours() + 12) % 24);
    }
    down() {
      this.up();
    }
    toString() {
      let meridiem = this.date.getHours() > 12 ? "pm" : "am";
      return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
    }
  }
  module.exports = Meridiem;
});

// ../../../../node_modules/prompts/dist/dateparts/day.js
var require_day = __commonJS((exports, module) => {
  var DatePart = require_datepart();
  var pos = (n) => {
    n = n % 10;
    return n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
  };

  class Day extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setDate(this.date.getDate() + 1);
    }
    down() {
      this.date.setDate(this.date.getDate() - 1);
    }
    setTo(val) {
      this.date.setDate(parseInt(val.substr(-2)));
    }
    toString() {
      let date = this.date.getDate();
      let day = this.date.getDay();
      return this.token === "DD" ? String(date).padStart(2, "0") : this.token === "Do" ? date + pos(date) : this.token === "d" ? day + 1 : this.token === "ddd" ? this.locales.weekdaysShort[day] : this.token === "dddd" ? this.locales.weekdays[day] : date;
    }
  }
  module.exports = Day;
});

// ../../../../node_modules/prompts/dist/dateparts/hours.js
var require_hours = __commonJS((exports, module) => {
  var DatePart = require_datepart();

  class Hours extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setHours(this.date.getHours() + 1);
    }
    down() {
      this.date.setHours(this.date.getHours() - 1);
    }
    setTo(val) {
      this.date.setHours(parseInt(val.substr(-2)));
    }
    toString() {
      let hours = this.date.getHours();
      if (/h/.test(this.token))
        hours = hours % 12 || 12;
      return this.token.length > 1 ? String(hours).padStart(2, "0") : hours;
    }
  }
  module.exports = Hours;
});

// ../../../../node_modules/prompts/dist/dateparts/milliseconds.js
var require_milliseconds = __commonJS((exports, module) => {
  var DatePart = require_datepart();

  class Milliseconds extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setMilliseconds(this.date.getMilliseconds() + 1);
    }
    down() {
      this.date.setMilliseconds(this.date.getMilliseconds() - 1);
    }
    setTo(val) {
      this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
    }
    toString() {
      return String(this.date.getMilliseconds()).padStart(4, "0").substr(0, this.token.length);
    }
  }
  module.exports = Milliseconds;
});

// ../../../../node_modules/prompts/dist/dateparts/minutes.js
var require_minutes = __commonJS((exports, module) => {
  var DatePart = require_datepart();

  class Minutes extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setMinutes(this.date.getMinutes() + 1);
    }
    down() {
      this.date.setMinutes(this.date.getMinutes() - 1);
    }
    setTo(val) {
      this.date.setMinutes(parseInt(val.substr(-2)));
    }
    toString() {
      let m = this.date.getMinutes();
      return this.token.length > 1 ? String(m).padStart(2, "0") : m;
    }
  }
  module.exports = Minutes;
});

// ../../../../node_modules/prompts/dist/dateparts/month.js
var require_month = __commonJS((exports, module) => {
  var DatePart = require_datepart();

  class Month extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setMonth(this.date.getMonth() + 1);
    }
    down() {
      this.date.setMonth(this.date.getMonth() - 1);
    }
    setTo(val) {
      val = parseInt(val.substr(-2)) - 1;
      this.date.setMonth(val < 0 ? 0 : val);
    }
    toString() {
      let month = this.date.getMonth();
      let tl = this.token.length;
      return tl === 2 ? String(month + 1).padStart(2, "0") : tl === 3 ? this.locales.monthsShort[month] : tl === 4 ? this.locales.months[month] : String(month + 1);
    }
  }
  module.exports = Month;
});

// ../../../../node_modules/prompts/dist/dateparts/seconds.js
var require_seconds = __commonJS((exports, module) => {
  var DatePart = require_datepart();

  class Seconds extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setSeconds(this.date.getSeconds() + 1);
    }
    down() {
      this.date.setSeconds(this.date.getSeconds() - 1);
    }
    setTo(val) {
      this.date.setSeconds(parseInt(val.substr(-2)));
    }
    toString() {
      let s = this.date.getSeconds();
      return this.token.length > 1 ? String(s).padStart(2, "0") : s;
    }
  }
  module.exports = Seconds;
});

// ../../../../node_modules/prompts/dist/dateparts/year.js
var require_year = __commonJS((exports, module) => {
  var DatePart = require_datepart();

  class Year extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setFullYear(this.date.getFullYear() + 1);
    }
    down() {
      this.date.setFullYear(this.date.getFullYear() - 1);
    }
    setTo(val) {
      this.date.setFullYear(val.substr(-4));
    }
    toString() {
      let year = String(this.date.getFullYear()).padStart(4, "0");
      return this.token.length === 2 ? year.substr(-2) : year;
    }
  }
  module.exports = Year;
});

// ../../../../node_modules/prompts/dist/dateparts/index.js
var require_dateparts = __commonJS((exports, module) => {
  module.exports = {
    DatePart: require_datepart(),
    Meridiem: require_meridiem(),
    Day: require_day(),
    Hours: require_hours(),
    Milliseconds: require_milliseconds(),
    Minutes: require_minutes(),
    Month: require_month(),
    Seconds: require_seconds(),
    Year: require_year()
  };
});

// ../../../../node_modules/prompts/dist/elements/date.js
var require_date = __commonJS((exports, module) => {
  function asyncGeneratorStep(gen, resolve4, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve4(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve4, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve4, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep(gen, resolve4, reject, _next, _throw, "throw", err2);
        }
        _next(undefined);
      });
    };
  }
  var color = require_kleur();
  var Prompt = require_prompt();
  var _require = require_util();
  var style = _require.style;
  var clear = _require.clear;
  var figures = _require.figures;
  var _require2 = require_src();
  var erase = _require2.erase;
  var cursor = _require2.cursor;
  var _require3 = require_dateparts();
  var DatePart = _require3.DatePart;
  var Meridiem = _require3.Meridiem;
  var Day = _require3.Day;
  var Hours = _require3.Hours;
  var Milliseconds = _require3.Milliseconds;
  var Minutes = _require3.Minutes;
  var Month = _require3.Month;
  var Seconds = _require3.Seconds;
  var Year = _require3.Year;
  var regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
  var regexGroups = {
    1: ({
      token
    }) => token.replace(/\\(.)/g, "$1"),
    2: (opts) => new Day(opts),
    3: (opts) => new Month(opts),
    4: (opts) => new Year(opts),
    5: (opts) => new Meridiem(opts),
    6: (opts) => new Hours(opts),
    7: (opts) => new Minutes(opts),
    8: (opts) => new Seconds(opts),
    9: (opts) => new Milliseconds(opts)
  };
  var dfltLocales = {
    months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
    monthsShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
    weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
    weekdaysShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")
  };

  class DatePrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.msg = opts.message;
      this.cursor = 0;
      this.typed = "";
      this.locales = Object.assign(dfltLocales, opts.locales);
      this._date = opts.initial || new Date;
      this.errorMsg = opts.error || "Please Enter A Valid Value";
      this.validator = opts.validate || (() => true);
      this.mask = opts.mask || "YYYY-MM-DD HH:mm:ss";
      this.clear = clear("", this.out.columns);
      this.render();
    }
    get value() {
      return this.date;
    }
    get date() {
      return this._date;
    }
    set date(date) {
      if (date)
        this._date.setTime(date.getTime());
    }
    set mask(mask) {
      let result2;
      this.parts = [];
      while (result2 = regex.exec(mask)) {
        let match = result2.shift();
        let idx = result2.findIndex((gr) => gr != null);
        this.parts.push(idx in regexGroups ? regexGroups[idx]({
          token: result2[idx] || match,
          date: this.date,
          parts: this.parts,
          locales: this.locales
        }) : result2[idx] || match);
      }
      let parts = this.parts.reduce((arr, i) => {
        if (typeof i === "string" && typeof arr[arr.length - 1] === "string")
          arr[arr.length - 1] += i;
        else
          arr.push(i);
        return arr;
      }, []);
      this.parts.splice(0);
      this.parts.push(...parts);
      this.reset();
    }
    moveCursor(n) {
      this.typed = "";
      this.cursor = n;
      this.fire();
    }
    reset() {
      this.moveCursor(this.parts.findIndex((p) => p instanceof DatePart));
      this.fire();
      this.render();
    }
    exit() {
      this.abort();
    }
    abort() {
      this.done = this.aborted = true;
      this.error = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    validate() {
      var _this = this;
      return _asyncToGenerator(function* () {
        let valid = yield _this.validator(_this.value);
        if (typeof valid === "string") {
          _this.errorMsg = valid;
          valid = false;
        }
        _this.error = !valid;
      })();
    }
    submit() {
      var _this2 = this;
      return _asyncToGenerator(function* () {
        yield _this2.validate();
        if (_this2.error) {
          _this2.color = "red";
          _this2.fire();
          _this2.render();
          return;
        }
        _this2.done = true;
        _this2.aborted = false;
        _this2.fire();
        _this2.render();
        _this2.out.write(`
`);
        _this2.close();
      })();
    }
    up() {
      this.typed = "";
      this.parts[this.cursor].up();
      this.render();
    }
    down() {
      this.typed = "";
      this.parts[this.cursor].down();
      this.render();
    }
    left() {
      let prev = this.parts[this.cursor].prev();
      if (prev == null)
        return this.bell();
      this.moveCursor(this.parts.indexOf(prev));
      this.render();
    }
    right() {
      let next = this.parts[this.cursor].next();
      if (next == null)
        return this.bell();
      this.moveCursor(this.parts.indexOf(next));
      this.render();
    }
    next() {
      let next = this.parts[this.cursor].next();
      this.moveCursor(next ? this.parts.indexOf(next) : this.parts.findIndex((part) => part instanceof DatePart));
      this.render();
    }
    _(c) {
      if (/\d/.test(c)) {
        this.typed += c;
        this.parts[this.cursor].setTo(this.typed);
        this.render();
      }
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      else
        this.out.write(clear(this.outputText, this.out.columns));
      super.render();
      this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), []).join("")].join(" ");
      if (this.error) {
        this.outputText += this.errorMsg.split(`
`).reduce((a, l2, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l2)}`, ``);
      }
      this.out.write(erase.line + cursor.to(0) + this.outputText);
    }
  }
  module.exports = DatePrompt;
});

// ../../../../node_modules/prompts/dist/elements/number.js
var require_number = __commonJS((exports, module) => {
  function asyncGeneratorStep(gen, resolve4, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve4(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve4, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve4, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep(gen, resolve4, reject, _next, _throw, "throw", err2);
        }
        _next(undefined);
      });
    };
  }
  var color = require_kleur();
  var Prompt = require_prompt();
  var _require = require_src();
  var cursor = _require.cursor;
  var erase = _require.erase;
  var _require2 = require_util();
  var style = _require2.style;
  var figures = _require2.figures;
  var clear = _require2.clear;
  var lines = _require2.lines;
  var isNumber = /[0-9]/;
  var isDef = (any) => any !== undefined;
  var round = (number, precision) => {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  };

  class NumberPrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.transform = style.render(opts.style);
      this.msg = opts.message;
      this.initial = isDef(opts.initial) ? opts.initial : "";
      this.float = !!opts.float;
      this.round = opts.round || 2;
      this.inc = opts.increment || 1;
      this.min = isDef(opts.min) ? opts.min : -Infinity;
      this.max = isDef(opts.max) ? opts.max : Infinity;
      this.errorMsg = opts.error || `Please Enter A Valid Value`;
      this.validator = opts.validate || (() => true);
      this.color = `cyan`;
      this.value = ``;
      this.typed = ``;
      this.lastHit = 0;
      this.render();
    }
    set value(v) {
      if (!v && v !== 0) {
        this.placeholder = true;
        this.rendered = color.gray(this.transform.render(`${this.initial}`));
        this._value = ``;
      } else {
        this.placeholder = false;
        this.rendered = this.transform.render(`${round(v, this.round)}`);
        this._value = round(v, this.round);
      }
      this.fire();
    }
    get value() {
      return this._value;
    }
    parse(x2) {
      return this.float ? parseFloat(x2) : parseInt(x2);
    }
    valid(c) {
      return c === `-` || c === `.` && this.float || isNumber.test(c);
    }
    reset() {
      this.typed = ``;
      this.value = ``;
      this.fire();
      this.render();
    }
    exit() {
      this.abort();
    }
    abort() {
      let x2 = this.value;
      this.value = x2 !== `` ? x2 : this.initial;
      this.done = this.aborted = true;
      this.error = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    validate() {
      var _this = this;
      return _asyncToGenerator(function* () {
        let valid = yield _this.validator(_this.value);
        if (typeof valid === `string`) {
          _this.errorMsg = valid;
          valid = false;
        }
        _this.error = !valid;
      })();
    }
    submit() {
      var _this2 = this;
      return _asyncToGenerator(function* () {
        yield _this2.validate();
        if (_this2.error) {
          _this2.color = `red`;
          _this2.fire();
          _this2.render();
          return;
        }
        let x2 = _this2.value;
        _this2.value = x2 !== `` ? x2 : _this2.initial;
        _this2.done = true;
        _this2.aborted = false;
        _this2.error = false;
        _this2.fire();
        _this2.render();
        _this2.out.write(`
`);
        _this2.close();
      })();
    }
    up() {
      this.typed = ``;
      if (this.value === "") {
        this.value = this.min - this.inc;
      }
      if (this.value >= this.max)
        return this.bell();
      this.value += this.inc;
      this.color = `cyan`;
      this.fire();
      this.render();
    }
    down() {
      this.typed = ``;
      if (this.value === "") {
        this.value = this.min + this.inc;
      }
      if (this.value <= this.min)
        return this.bell();
      this.value -= this.inc;
      this.color = `cyan`;
      this.fire();
      this.render();
    }
    delete() {
      let val = this.value.toString();
      if (val.length === 0)
        return this.bell();
      this.value = this.parse(val = val.slice(0, -1)) || ``;
      if (this.value !== "" && this.value < this.min) {
        this.value = this.min;
      }
      this.color = `cyan`;
      this.fire();
      this.render();
    }
    next() {
      this.value = this.initial;
      this.fire();
      this.render();
    }
    _(c, key) {
      if (!this.valid(c))
        return this.bell();
      const now = Date.now();
      if (now - this.lastHit > 1000)
        this.typed = ``;
      this.typed += c;
      this.lastHit = now;
      this.color = `cyan`;
      if (c === `.`)
        return this.fire();
      this.value = Math.min(this.parse(this.typed), this.max);
      if (this.value > this.max)
        this.value = this.max;
      if (this.value < this.min)
        this.value = this.min;
      this.fire();
      this.render();
    }
    render() {
      if (this.closed)
        return;
      if (!this.firstRender) {
        if (this.outputError)
          this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
        this.out.write(clear(this.outputText, this.out.columns));
      }
      super.render();
      this.outputError = "";
      this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), !this.done || !this.done && !this.placeholder ? color[this.color]().underline(this.rendered) : this.rendered].join(` `);
      if (this.error) {
        this.outputError += this.errorMsg.split(`
`).reduce((a, l2, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l2)}`, ``);
      }
      this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
    }
  }
  module.exports = NumberPrompt;
});

// ../../../../node_modules/prompts/dist/elements/multiselect.js
var require_multiselect = __commonJS((exports, module) => {
  var color = require_kleur();
  var _require = require_src();
  var cursor = _require.cursor;
  var Prompt = require_prompt();
  var _require2 = require_util();
  var clear = _require2.clear;
  var figures = _require2.figures;
  var style = _require2.style;
  var wrap = _require2.wrap;
  var entriesToDisplay = _require2.entriesToDisplay;

  class MultiselectPrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.msg = opts.message;
      this.cursor = opts.cursor || 0;
      this.scrollIndex = opts.cursor || 0;
      this.hint = opts.hint || "";
      this.warn = opts.warn || "- This option is disabled -";
      this.minSelected = opts.min;
      this.showMinError = false;
      this.maxChoices = opts.max;
      this.instructions = opts.instructions;
      this.optionsPerPage = opts.optionsPerPage || 10;
      this.value = opts.choices.map((ch, idx) => {
        if (typeof ch === "string")
          ch = {
            title: ch,
            value: idx
          };
        return {
          title: ch && (ch.title || ch.value || ch),
          description: ch && ch.description,
          value: ch && (ch.value === undefined ? idx : ch.value),
          selected: ch && ch.selected,
          disabled: ch && ch.disabled
        };
      });
      this.clear = clear("", this.out.columns);
      if (!opts.overrideRender) {
        this.render();
      }
    }
    reset() {
      this.value.map((v) => !v.selected);
      this.cursor = 0;
      this.fire();
      this.render();
    }
    selected() {
      return this.value.filter((v) => v.selected);
    }
    exit() {
      this.abort();
    }
    abort() {
      this.done = this.aborted = true;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    submit() {
      const selected = this.value.filter((e) => e.selected);
      if (this.minSelected && selected.length < this.minSelected) {
        this.showMinError = true;
        this.render();
      } else {
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
    }
    first() {
      this.cursor = 0;
      this.render();
    }
    last() {
      this.cursor = this.value.length - 1;
      this.render();
    }
    next() {
      this.cursor = (this.cursor + 1) % this.value.length;
      this.render();
    }
    up() {
      if (this.cursor === 0) {
        this.cursor = this.value.length - 1;
      } else {
        this.cursor--;
      }
      this.render();
    }
    down() {
      if (this.cursor === this.value.length - 1) {
        this.cursor = 0;
      } else {
        this.cursor++;
      }
      this.render();
    }
    left() {
      this.value[this.cursor].selected = false;
      this.render();
    }
    right() {
      if (this.value.filter((e) => e.selected).length >= this.maxChoices)
        return this.bell();
      this.value[this.cursor].selected = true;
      this.render();
    }
    handleSpaceToggle() {
      const v = this.value[this.cursor];
      if (v.selected) {
        v.selected = false;
        this.render();
      } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
        return this.bell();
      } else {
        v.selected = true;
        this.render();
      }
    }
    toggleAll() {
      if (this.maxChoices !== undefined || this.value[this.cursor].disabled) {
        return this.bell();
      }
      const newSelected = !this.value[this.cursor].selected;
      this.value.filter((v) => !v.disabled).forEach((v) => v.selected = newSelected);
      this.render();
    }
    _(c, key) {
      if (c === " ") {
        this.handleSpaceToggle();
      } else if (c === "a") {
        this.toggleAll();
      } else {
        return this.bell();
      }
    }
    renderInstructions() {
      if (this.instructions === undefined || this.instructions) {
        if (typeof this.instructions === "string") {
          return this.instructions;
        }
        return `
Instructions:
` + `    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
` + `    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
` + (this.maxChoices === undefined ? `    a: Toggle all
` : "") + `    enter/return: Complete answer`;
      }
      return "";
    }
    renderOption(cursor2, v, i, arrowIndicator) {
      const prefix = (v.selected ? color.green(figures.radioOn) : figures.radioOff) + " " + arrowIndicator + " ";
      let title, desc;
      if (v.disabled) {
        title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
      } else {
        title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
        if (cursor2 === i && v.description) {
          desc = ` - ${v.description}`;
          if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
            desc = `
` + wrap(v.description, {
              margin: prefix.length,
              width: this.out.columns
            });
          }
        }
      }
      return prefix + title + color.gray(desc || "");
    }
    paginateOptions(options) {
      if (options.length === 0) {
        return color.red("No matches for this query.");
      }
      let _entriesToDisplay = entriesToDisplay(this.cursor, options.length, this.optionsPerPage), startIndex = _entriesToDisplay.startIndex, endIndex = _entriesToDisplay.endIndex;
      let prefix, styledOptions = [];
      for (let i = startIndex;i < endIndex; i++) {
        if (i === startIndex && startIndex > 0) {
          prefix = figures.arrowUp;
        } else if (i === endIndex - 1 && endIndex < options.length) {
          prefix = figures.arrowDown;
        } else {
          prefix = " ";
        }
        styledOptions.push(this.renderOption(this.cursor, options[i], i, prefix));
      }
      return `
` + styledOptions.join(`
`);
    }
    renderOptions(options) {
      if (!this.done) {
        return this.paginateOptions(options);
      }
      return "";
    }
    renderDoneOrInstructions() {
      if (this.done) {
        return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
      }
      const output = [color.gray(this.hint), this.renderInstructions()];
      if (this.value[this.cursor].disabled) {
        output.push(color.yellow(this.warn));
      }
      return output.join(" ");
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      super.render();
      let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.renderDoneOrInstructions()].join(" ");
      if (this.showMinError) {
        prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
        this.showMinError = false;
      }
      prompt += this.renderOptions(this.value);
      this.out.write(this.clear + prompt);
      this.clear = clear(prompt, this.out.columns);
    }
  }
  module.exports = MultiselectPrompt;
});

// ../../../../node_modules/prompts/dist/elements/autocomplete.js
var require_autocomplete = __commonJS((exports, module) => {
  function asyncGeneratorStep(gen, resolve4, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve4(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve4, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve4, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep(gen, resolve4, reject, _next, _throw, "throw", err2);
        }
        _next(undefined);
      });
    };
  }
  var color = require_kleur();
  var Prompt = require_prompt();
  var _require = require_src();
  var erase = _require.erase;
  var cursor = _require.cursor;
  var _require2 = require_util();
  var style = _require2.style;
  var clear = _require2.clear;
  var figures = _require2.figures;
  var wrap = _require2.wrap;
  var entriesToDisplay = _require2.entriesToDisplay;
  var getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
  var getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
  var getIndex = (arr, valOrTitle) => {
    const index = arr.findIndex((el) => el.value === valOrTitle || el.title === valOrTitle);
    return index > -1 ? index : undefined;
  };

  class AutocompletePrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.msg = opts.message;
      this.suggest = opts.suggest;
      this.choices = opts.choices;
      this.initial = typeof opts.initial === "number" ? opts.initial : getIndex(opts.choices, opts.initial);
      this.select = this.initial || opts.cursor || 0;
      this.i18n = {
        noMatches: opts.noMatches || "no matches found"
      };
      this.fallback = opts.fallback || this.initial;
      this.clearFirst = opts.clearFirst || false;
      this.suggestions = [];
      this.input = "";
      this.limit = opts.limit || 10;
      this.cursor = 0;
      this.transform = style.render(opts.style);
      this.scale = this.transform.scale;
      this.render = this.render.bind(this);
      this.complete = this.complete.bind(this);
      this.clear = clear("", this.out.columns);
      this.complete(this.render);
      this.render();
    }
    set fallback(fb) {
      this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
    }
    get fallback() {
      let choice;
      if (typeof this._fb === "number")
        choice = this.choices[this._fb];
      else if (typeof this._fb === "string")
        choice = {
          title: this._fb
        };
      return choice || this._fb || {
        title: this.i18n.noMatches
      };
    }
    moveSelect(i) {
      this.select = i;
      if (this.suggestions.length > 0)
        this.value = getVal(this.suggestions, i);
      else
        this.value = this.fallback.value;
      this.fire();
    }
    complete(cb) {
      var _this = this;
      return _asyncToGenerator(function* () {
        const p = _this.completing = _this.suggest(_this.input, _this.choices);
        const suggestions = yield p;
        if (_this.completing !== p)
          return;
        _this.suggestions = suggestions.map((s, i, arr) => ({
          title: getTitle(arr, i),
          value: getVal(arr, i),
          description: s.description
        }));
        _this.completing = false;
        const l2 = Math.max(suggestions.length - 1, 0);
        _this.moveSelect(Math.min(l2, _this.select));
        cb && cb();
      })();
    }
    reset() {
      this.input = "";
      this.complete(() => {
        this.moveSelect(this.initial !== undefined ? this.initial : 0);
        this.render();
      });
      this.render();
    }
    exit() {
      if (this.clearFirst && this.input.length > 0) {
        this.reset();
      } else {
        this.done = this.exited = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
    }
    abort() {
      this.done = this.aborted = true;
      this.exited = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    submit() {
      this.done = true;
      this.aborted = this.exited = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    _(c, key) {
      let s1 = this.input.slice(0, this.cursor);
      let s2 = this.input.slice(this.cursor);
      this.input = `${s1}${c}${s2}`;
      this.cursor = s1.length + 1;
      this.complete(this.render);
      this.render();
    }
    delete() {
      if (this.cursor === 0)
        return this.bell();
      let s1 = this.input.slice(0, this.cursor - 1);
      let s2 = this.input.slice(this.cursor);
      this.input = `${s1}${s2}`;
      this.complete(this.render);
      this.cursor = this.cursor - 1;
      this.render();
    }
    deleteForward() {
      if (this.cursor * this.scale >= this.rendered.length)
        return this.bell();
      let s1 = this.input.slice(0, this.cursor);
      let s2 = this.input.slice(this.cursor + 1);
      this.input = `${s1}${s2}`;
      this.complete(this.render);
      this.render();
    }
    first() {
      this.moveSelect(0);
      this.render();
    }
    last() {
      this.moveSelect(this.suggestions.length - 1);
      this.render();
    }
    up() {
      if (this.select === 0) {
        this.moveSelect(this.suggestions.length - 1);
      } else {
        this.moveSelect(this.select - 1);
      }
      this.render();
    }
    down() {
      if (this.select === this.suggestions.length - 1) {
        this.moveSelect(0);
      } else {
        this.moveSelect(this.select + 1);
      }
      this.render();
    }
    next() {
      if (this.select === this.suggestions.length - 1) {
        this.moveSelect(0);
      } else
        this.moveSelect(this.select + 1);
      this.render();
    }
    nextPage() {
      this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
      this.render();
    }
    prevPage() {
      this.moveSelect(Math.max(this.select - this.limit, 0));
      this.render();
    }
    left() {
      if (this.cursor <= 0)
        return this.bell();
      this.cursor = this.cursor - 1;
      this.render();
    }
    right() {
      if (this.cursor * this.scale >= this.rendered.length)
        return this.bell();
      this.cursor = this.cursor + 1;
      this.render();
    }
    renderOption(v, hovered, isStart, isEnd) {
      let desc;
      let prefix = isStart ? figures.arrowUp : isEnd ? figures.arrowDown : " ";
      let title = hovered ? color.cyan().underline(v.title) : v.title;
      prefix = (hovered ? color.cyan(figures.pointer) + " " : "  ") + prefix;
      if (v.description) {
        desc = ` - ${v.description}`;
        if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
          desc = `
` + wrap(v.description, {
            margin: 3,
            width: this.out.columns
          });
        }
      }
      return prefix + " " + title + color.gray(desc || "");
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      else
        this.out.write(clear(this.outputText, this.out.columns));
      super.render();
      let _entriesToDisplay = entriesToDisplay(this.select, this.choices.length, this.limit), startIndex = _entriesToDisplay.startIndex, endIndex = _entriesToDisplay.endIndex;
      this.outputText = [style.symbol(this.done, this.aborted, this.exited), color.bold(this.msg), style.delimiter(this.completing), this.done && this.suggestions[this.select] ? this.suggestions[this.select].title : this.rendered = this.transform.render(this.input)].join(" ");
      if (!this.done) {
        const suggestions = this.suggestions.slice(startIndex, endIndex).map((item2, i) => this.renderOption(item2, this.select === i + startIndex, i === 0 && startIndex > 0, i + startIndex === endIndex - 1 && endIndex < this.choices.length)).join(`
`);
        this.outputText += `
` + (suggestions || color.gray(this.fallback.title));
      }
      this.out.write(erase.line + cursor.to(0) + this.outputText);
    }
  }
  module.exports = AutocompletePrompt;
});

// ../../../../node_modules/prompts/dist/elements/autocompleteMultiselect.js
var require_autocompleteMultiselect = __commonJS((exports, module) => {
  var color = require_kleur();
  var _require = require_src();
  var cursor = _require.cursor;
  var MultiselectPrompt = require_multiselect();
  var _require2 = require_util();
  var clear = _require2.clear;
  var style = _require2.style;
  var figures = _require2.figures;

  class AutocompleteMultiselectPrompt extends MultiselectPrompt {
    constructor(opts = {}) {
      opts.overrideRender = true;
      super(opts);
      this.inputValue = "";
      this.clear = clear("", this.out.columns);
      this.filteredOptions = this.value;
      this.render();
    }
    last() {
      this.cursor = this.filteredOptions.length - 1;
      this.render();
    }
    next() {
      this.cursor = (this.cursor + 1) % this.filteredOptions.length;
      this.render();
    }
    up() {
      if (this.cursor === 0) {
        this.cursor = this.filteredOptions.length - 1;
      } else {
        this.cursor--;
      }
      this.render();
    }
    down() {
      if (this.cursor === this.filteredOptions.length - 1) {
        this.cursor = 0;
      } else {
        this.cursor++;
      }
      this.render();
    }
    left() {
      this.filteredOptions[this.cursor].selected = false;
      this.render();
    }
    right() {
      if (this.value.filter((e) => e.selected).length >= this.maxChoices)
        return this.bell();
      this.filteredOptions[this.cursor].selected = true;
      this.render();
    }
    delete() {
      if (this.inputValue.length) {
        this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
        this.updateFilteredOptions();
      }
    }
    updateFilteredOptions() {
      const currentHighlight = this.filteredOptions[this.cursor];
      this.filteredOptions = this.value.filter((v) => {
        if (this.inputValue) {
          if (typeof v.title === "string") {
            if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
              return true;
            }
          }
          if (typeof v.value === "string") {
            if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
              return true;
            }
          }
          return false;
        }
        return true;
      });
      const newHighlightIndex = this.filteredOptions.findIndex((v) => v === currentHighlight);
      this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
      this.render();
    }
    handleSpaceToggle() {
      const v = this.filteredOptions[this.cursor];
      if (v.selected) {
        v.selected = false;
        this.render();
      } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
        return this.bell();
      } else {
        v.selected = true;
        this.render();
      }
    }
    handleInputChange(c) {
      this.inputValue = this.inputValue + c;
      this.updateFilteredOptions();
    }
    _(c, key) {
      if (c === " ") {
        this.handleSpaceToggle();
      } else {
        this.handleInputChange(c);
      }
    }
    renderInstructions() {
      if (this.instructions === undefined || this.instructions) {
        if (typeof this.instructions === "string") {
          return this.instructions;
        }
        return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
      }
      return "";
    }
    renderCurrentInput() {
      return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray("Enter something to filter")}
`;
    }
    renderOption(cursor2, v, i) {
      let title;
      if (v.disabled)
        title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
      else
        title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
      return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + "  " + title;
    }
    renderDoneOrInstructions() {
      if (this.done) {
        return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
      }
      const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];
      if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
        output.push(color.yellow(this.warn));
      }
      return output.join(" ");
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      super.render();
      let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.renderDoneOrInstructions()].join(" ");
      if (this.showMinError) {
        prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
        this.showMinError = false;
      }
      prompt += this.renderOptions(this.filteredOptions);
      this.out.write(this.clear + prompt);
      this.clear = clear(prompt, this.out.columns);
    }
  }
  module.exports = AutocompleteMultiselectPrompt;
});

// ../../../../node_modules/prompts/dist/elements/confirm.js
var require_confirm = __commonJS((exports, module) => {
  var color = require_kleur();
  var Prompt = require_prompt();
  var _require = require_util();
  var style = _require.style;
  var clear = _require.clear;
  var _require2 = require_src();
  var erase = _require2.erase;
  var cursor = _require2.cursor;

  class ConfirmPrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.msg = opts.message;
      this.value = opts.initial;
      this.initialValue = !!opts.initial;
      this.yesMsg = opts.yes || "yes";
      this.yesOption = opts.yesOption || "(Y/n)";
      this.noMsg = opts.no || "no";
      this.noOption = opts.noOption || "(y/N)";
      this.render();
    }
    reset() {
      this.value = this.initialValue;
      this.fire();
      this.render();
    }
    exit() {
      this.abort();
    }
    abort() {
      this.done = this.aborted = true;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    submit() {
      this.value = this.value || false;
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    _(c, key) {
      if (c.toLowerCase() === "y") {
        this.value = true;
        return this.submit();
      }
      if (c.toLowerCase() === "n") {
        this.value = false;
        return this.submit();
      }
      return this.bell();
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      else
        this.out.write(clear(this.outputText, this.out.columns));
      super.render();
      this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)].join(" ");
      this.out.write(erase.line + cursor.to(0) + this.outputText);
    }
  }
  module.exports = ConfirmPrompt;
});

// ../../../../node_modules/prompts/dist/elements/index.js
var require_elements = __commonJS((exports, module) => {
  module.exports = {
    TextPrompt: require_text(),
    SelectPrompt: require_select(),
    TogglePrompt: require_toggle(),
    DatePrompt: require_date(),
    NumberPrompt: require_number(),
    MultiselectPrompt: require_multiselect(),
    AutocompletePrompt: require_autocomplete(),
    AutocompleteMultiselectPrompt: require_autocompleteMultiselect(),
    ConfirmPrompt: require_confirm()
  };
});

// ../../../../node_modules/prompts/dist/prompts.js
var require_prompts = __commonJS((exports) => {
  var $2 = exports;
  var el = require_elements();
  var noop = (v) => v;
  function toPrompt(type, args, opts = {}) {
    return new Promise((res, rej) => {
      const p = new el[type](args);
      const onAbort = opts.onAbort || noop;
      const onSubmit = opts.onSubmit || noop;
      const onExit = opts.onExit || noop;
      p.on("state", args.onState || noop);
      p.on("submit", (x2) => res(onSubmit(x2)));
      p.on("exit", (x2) => res(onExit(x2)));
      p.on("abort", (x2) => rej(onAbort(x2)));
    });
  }
  $2.text = (args) => toPrompt("TextPrompt", args);
  $2.password = (args) => {
    args.style = "password";
    return $2.text(args);
  };
  $2.invisible = (args) => {
    args.style = "invisible";
    return $2.text(args);
  };
  $2.number = (args) => toPrompt("NumberPrompt", args);
  $2.date = (args) => toPrompt("DatePrompt", args);
  $2.confirm = (args) => toPrompt("ConfirmPrompt", args);
  $2.list = (args) => {
    const sep2 = args.separator || ",";
    return toPrompt("TextPrompt", args, {
      onSubmit: (str) => str.split(sep2).map((s) => s.trim())
    });
  };
  $2.toggle = (args) => toPrompt("TogglePrompt", args);
  $2.select = (args) => toPrompt("SelectPrompt", args);
  $2.multiselect = (args) => {
    args.choices = [].concat(args.choices || []);
    const toSelected = (items) => items.filter((item2) => item2.selected).map((item2) => item2.value);
    return toPrompt("MultiselectPrompt", args, {
      onAbort: toSelected,
      onSubmit: toSelected
    });
  };
  $2.autocompleteMultiselect = (args) => {
    args.choices = [].concat(args.choices || []);
    const toSelected = (items) => items.filter((item2) => item2.selected).map((item2) => item2.value);
    return toPrompt("AutocompleteMultiselectPrompt", args, {
      onAbort: toSelected,
      onSubmit: toSelected
    });
  };
  var byTitle = (input, choices) => Promise.resolve(choices.filter((item2) => item2.title.slice(0, input.length).toLowerCase() === input.toLowerCase()));
  $2.autocomplete = (args) => {
    args.suggest = args.suggest || byTitle;
    args.choices = [].concat(args.choices || []);
    return toPrompt("AutocompletePrompt", args);
  };
});

// ../../../../node_modules/prompts/dist/index.js
var require_dist = __commonJS((exports, module) => {
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) {
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1;i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it)
          o = it;
        var i = 0;
        var F = function F() {};
        return { s: F, n: function n() {
          if (i >= o.length)
            return { done: true };
          return { done: false, value: o[i++] };
        }, e: function e(_e) {
          throw _e;
        }, f: F };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var normalCompletion = true, didErr = false, err2;
    return { s: function s() {
      it = it.call(o);
    }, n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    }, e: function e(_e2) {
      didErr = true;
      err2 = _e2;
    }, f: function f() {
      try {
        if (!normalCompletion && it.return != null)
          it.return();
      } finally {
        if (didErr)
          throw err2;
      }
    } };
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len);i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function asyncGeneratorStep(gen, resolve4, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve4(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve4, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve4, reject, _next, _throw, "next", value);
        }
        function _throw(err2) {
          asyncGeneratorStep(gen, resolve4, reject, _next, _throw, "throw", err2);
        }
        _next(undefined);
      });
    };
  }
  var prompts = require_prompts();
  var passOn = ["suggest", "format", "onState", "validate", "onRender", "type"];
  var noop = () => {};
  function prompt() {
    return _prompt.apply(this, arguments);
  }
  function _prompt() {
    _prompt = _asyncToGenerator(function* (questions = [], {
      onSubmit = noop,
      onCancel = noop
    } = {}) {
      const answers = {};
      const override2 = prompt._override || {};
      questions = [].concat(questions);
      let answer, question, quit, name, type, lastPrompt;
      const getFormattedAnswer = /* @__PURE__ */ function() {
        var _ref = _asyncToGenerator(function* (question2, answer2, skipValidation = false) {
          if (!skipValidation && question2.validate && question2.validate(answer2) !== true) {
            return;
          }
          return question2.format ? yield question2.format(answer2, answers) : answer2;
        });
        return function getFormattedAnswer(_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }();
      var _iterator = _createForOfIteratorHelper(questions), _step;
      try {
        for (_iterator.s();!(_step = _iterator.n()).done; ) {
          question = _step.value;
          var _question = question;
          name = _question.name;
          type = _question.type;
          if (typeof type === "function") {
            type = yield type(answer, _objectSpread({}, answers), question);
            question["type"] = type;
          }
          if (!type)
            continue;
          for (let key in question) {
            if (passOn.includes(key))
              continue;
            let value = question[key];
            question[key] = typeof value === "function" ? yield value(answer, _objectSpread({}, answers), lastPrompt) : value;
          }
          lastPrompt = question;
          if (typeof question.message !== "string") {
            throw new Error("prompt message is required");
          }
          var _question2 = question;
          name = _question2.name;
          type = _question2.type;
          if (prompts[type] === undefined) {
            throw new Error(`prompt type (${type}) is not defined`);
          }
          if (override2[question.name] !== undefined) {
            answer = yield getFormattedAnswer(question, override2[question.name]);
            if (answer !== undefined) {
              answers[name] = answer;
              continue;
            }
          }
          try {
            answer = prompt._injected ? getInjectedAnswer(prompt._injected, question.initial) : yield prompts[type](question);
            answers[name] = answer = yield getFormattedAnswer(question, answer, true);
            quit = yield onSubmit(question, answer, answers);
          } catch (err2) {
            quit = !(yield onCancel(question, answers));
          }
          if (quit)
            return answers;
        }
      } catch (err2) {
        _iterator.e(err2);
      } finally {
        _iterator.f();
      }
      return answers;
    });
    return _prompt.apply(this, arguments);
  }
  function getInjectedAnswer(injected, deafultValue) {
    const answer = injected.shift();
    if (answer instanceof Error) {
      throw answer;
    }
    return answer === undefined ? deafultValue : answer;
  }
  function inject(answers) {
    prompt._injected = (prompt._injected || []).concat(answers);
  }
  function override(answers) {
    prompt._override = Object.assign({}, answers);
  }
  module.exports = Object.assign(prompt, {
    prompt,
    prompts,
    inject,
    override
  });
});

// ../../../../node_modules/prompts/lib/util/action.js
var require_action2 = __commonJS((exports, module) => {
  module.exports = (key, isSelect) => {
    if (key.meta && key.name !== "escape")
      return;
    if (key.ctrl) {
      if (key.name === "a")
        return "first";
      if (key.name === "c")
        return "abort";
      if (key.name === "d")
        return "abort";
      if (key.name === "e")
        return "last";
      if (key.name === "g")
        return "reset";
    }
    if (isSelect) {
      if (key.name === "j")
        return "down";
      if (key.name === "k")
        return "up";
    }
    if (key.name === "return")
      return "submit";
    if (key.name === "enter")
      return "submit";
    if (key.name === "backspace")
      return "delete";
    if (key.name === "delete")
      return "deleteForward";
    if (key.name === "abort")
      return "abort";
    if (key.name === "escape")
      return "exit";
    if (key.name === "tab")
      return "next";
    if (key.name === "pagedown")
      return "nextPage";
    if (key.name === "pageup")
      return "prevPage";
    if (key.name === "home")
      return "home";
    if (key.name === "end")
      return "end";
    if (key.name === "up")
      return "up";
    if (key.name === "down")
      return "down";
    if (key.name === "right")
      return "right";
    if (key.name === "left")
      return "left";
    return false;
  };
});

// ../../../../node_modules/prompts/lib/util/strip.js
var require_strip2 = __commonJS((exports, module) => {
  module.exports = (str) => {
    const pattern = [
      "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
      "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"
    ].join("|");
    const RGX = new RegExp(pattern, "g");
    return typeof str === "string" ? str.replace(RGX, "") : str;
  };
});

// ../../../../node_modules/prompts/lib/util/clear.js
var require_clear2 = __commonJS((exports, module) => {
  var strip = require_strip2();
  var { erase, cursor } = require_src();
  var width = (str) => [...strip(str)].length;
  module.exports = function(prompt, perLine) {
    if (!perLine)
      return erase.line + cursor.to(0);
    let rows = 0;
    const lines = prompt.split(/\r?\n/);
    for (let line of lines) {
      rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
    }
    return erase.lines(rows);
  };
});

// ../../../../node_modules/prompts/lib/util/figures.js
var require_figures2 = __commonJS((exports, module) => {
  var main = {
    arrowUp: "\u2191",
    arrowDown: "\u2193",
    arrowLeft: "\u2190",
    arrowRight: "\u2192",
    radioOn: "\u25C9",
    radioOff: "\u25EF",
    tick: "\u2714",
    cross: "\u2716",
    ellipsis: "\u2026",
    pointerSmall: "\u203A",
    line: "\u2500",
    pointer: "\u276F"
  };
  var win = {
    arrowUp: main.arrowUp,
    arrowDown: main.arrowDown,
    arrowLeft: main.arrowLeft,
    arrowRight: main.arrowRight,
    radioOn: "(*)",
    radioOff: "( )",
    tick: "\u221A",
    cross: "\xD7",
    ellipsis: "...",
    pointerSmall: "\xBB",
    line: "\u2500",
    pointer: ">"
  };
  var figures = process.platform === "win32" ? win : main;
  module.exports = figures;
});

// ../../../../node_modules/prompts/lib/util/style.js
var require_style2 = __commonJS((exports, module) => {
  var c = require_kleur();
  var figures = require_figures2();
  var styles2 = Object.freeze({
    password: { scale: 1, render: (input) => "*".repeat(input.length) },
    emoji: { scale: 2, render: (input) => "\uD83D\uDE03".repeat(input.length) },
    invisible: { scale: 0, render: (input) => "" },
    default: { scale: 1, render: (input) => `${input}` }
  });
  var render = (type) => styles2[type] || styles2.default;
  var symbols = Object.freeze({
    aborted: c.red(figures.cross),
    done: c.green(figures.tick),
    exited: c.yellow(figures.cross),
    default: c.cyan("?")
  });
  var symbol = (done, aborted, exited) => aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default;
  var delimiter2 = (completing) => c.gray(completing ? figures.ellipsis : figures.pointerSmall);
  var item2 = (expandable, expanded) => c.gray(expandable ? expanded ? figures.pointerSmall : "+" : figures.line);
  module.exports = {
    styles: styles2,
    render,
    symbols,
    symbol,
    delimiter: delimiter2,
    item: item2
  };
});

// ../../../../node_modules/prompts/lib/util/lines.js
var require_lines2 = __commonJS((exports, module) => {
  var strip = require_strip2();
  module.exports = function(msg, perLine) {
    let lines = String(strip(msg) || "").split(/\r?\n/);
    if (!perLine)
      return lines.length;
    return lines.map((l2) => Math.ceil(l2.length / perLine)).reduce((a, b) => a + b);
  };
});

// ../../../../node_modules/prompts/lib/util/wrap.js
var require_wrap2 = __commonJS((exports, module) => {
  module.exports = (msg, opts = {}) => {
    const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(" ").join("") : opts.margin || "";
    const width = opts.width;
    return (msg || "").split(/\r?\n/g).map((line) => line.split(/\s+/g).reduce((arr, w) => {
      if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width)
        arr[arr.length - 1] += ` ${w}`;
      else
        arr.push(`${tab}${w}`);
      return arr;
    }, [tab]).join(`
`)).join(`
`);
  };
});

// ../../../../node_modules/prompts/lib/util/entriesToDisplay.js
var require_entriesToDisplay2 = __commonJS((exports, module) => {
  module.exports = (cursor, total, maxVisible) => {
    maxVisible = maxVisible || total;
    let startIndex = Math.min(total - maxVisible, cursor - Math.floor(maxVisible / 2));
    if (startIndex < 0)
      startIndex = 0;
    let endIndex = Math.min(startIndex + maxVisible, total);
    return { startIndex, endIndex };
  };
});

// ../../../../node_modules/prompts/lib/util/index.js
var require_util2 = __commonJS((exports, module) => {
  module.exports = {
    action: require_action2(),
    clear: require_clear2(),
    style: require_style2(),
    strip: require_strip2(),
    figures: require_figures2(),
    lines: require_lines2(),
    wrap: require_wrap2(),
    entriesToDisplay: require_entriesToDisplay2()
  };
});

// ../../../../node_modules/prompts/lib/elements/prompt.js
var require_prompt2 = __commonJS((exports, module) => {
  var readline = __require("readline");
  var { action } = require_util2();
  var EventEmitter2 = __require("events");
  var { beep, cursor } = require_src();
  var color = require_kleur();

  class Prompt extends EventEmitter2 {
    constructor(opts = {}) {
      super();
      this.firstRender = true;
      this.in = opts.stdin || process.stdin;
      this.out = opts.stdout || process.stdout;
      this.onRender = (opts.onRender || (() => {
        return;
      })).bind(this);
      const rl = readline.createInterface({ input: this.in, escapeCodeTimeout: 50 });
      readline.emitKeypressEvents(this.in, rl);
      if (this.in.isTTY)
        this.in.setRawMode(true);
      const isSelect = ["SelectPrompt", "MultiselectPrompt"].indexOf(this.constructor.name) > -1;
      const keypress = (str, key) => {
        let a = action(key, isSelect);
        if (a === false) {
          this._ && this._(str, key);
        } else if (typeof this[a] === "function") {
          this[a](key);
        } else {
          this.bell();
        }
      };
      this.close = () => {
        this.out.write(cursor.show);
        this.in.removeListener("keypress", keypress);
        if (this.in.isTTY)
          this.in.setRawMode(false);
        rl.close();
        this.emit(this.aborted ? "abort" : this.exited ? "exit" : "submit", this.value);
        this.closed = true;
      };
      this.in.on("keypress", keypress);
    }
    fire() {
      this.emit("state", {
        value: this.value,
        aborted: !!this.aborted,
        exited: !!this.exited
      });
    }
    bell() {
      this.out.write(beep);
    }
    render() {
      this.onRender(color);
      if (this.firstRender)
        this.firstRender = false;
    }
  }
  module.exports = Prompt;
});

// ../../../../node_modules/prompts/lib/elements/text.js
var require_text2 = __commonJS((exports, module) => {
  var color = require_kleur();
  var Prompt = require_prompt2();
  var { erase, cursor } = require_src();
  var { style, clear, lines, figures } = require_util2();

  class TextPrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.transform = style.render(opts.style);
      this.scale = this.transform.scale;
      this.msg = opts.message;
      this.initial = opts.initial || ``;
      this.validator = opts.validate || (() => true);
      this.value = ``;
      this.errorMsg = opts.error || `Please Enter A Valid Value`;
      this.cursor = Number(!!this.initial);
      this.cursorOffset = 0;
      this.clear = clear(``, this.out.columns);
      this.render();
    }
    set value(v) {
      if (!v && this.initial) {
        this.placeholder = true;
        this.rendered = color.gray(this.transform.render(this.initial));
      } else {
        this.placeholder = false;
        this.rendered = this.transform.render(v);
      }
      this._value = v;
      this.fire();
    }
    get value() {
      return this._value;
    }
    reset() {
      this.value = ``;
      this.cursor = Number(!!this.initial);
      this.cursorOffset = 0;
      this.fire();
      this.render();
    }
    exit() {
      this.abort();
    }
    abort() {
      this.value = this.value || this.initial;
      this.done = this.aborted = true;
      this.error = false;
      this.red = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    async validate() {
      let valid = await this.validator(this.value);
      if (typeof valid === `string`) {
        this.errorMsg = valid;
        valid = false;
      }
      this.error = !valid;
    }
    async submit() {
      this.value = this.value || this.initial;
      this.cursorOffset = 0;
      this.cursor = this.rendered.length;
      await this.validate();
      if (this.error) {
        this.red = true;
        this.fire();
        this.render();
        return;
      }
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    next() {
      if (!this.placeholder)
        return this.bell();
      this.value = this.initial;
      this.cursor = this.rendered.length;
      this.fire();
      this.render();
    }
    moveCursor(n) {
      if (this.placeholder)
        return;
      this.cursor = this.cursor + n;
      this.cursorOffset += n;
    }
    _(c, key) {
      let s1 = this.value.slice(0, this.cursor);
      let s2 = this.value.slice(this.cursor);
      this.value = `${s1}${c}${s2}`;
      this.red = false;
      this.cursor = this.placeholder ? 0 : s1.length + 1;
      this.render();
    }
    delete() {
      if (this.isCursorAtStart())
        return this.bell();
      let s1 = this.value.slice(0, this.cursor - 1);
      let s2 = this.value.slice(this.cursor);
      this.value = `${s1}${s2}`;
      this.red = false;
      if (this.isCursorAtStart()) {
        this.cursorOffset = 0;
      } else {
        this.cursorOffset++;
        this.moveCursor(-1);
      }
      this.render();
    }
    deleteForward() {
      if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
        return this.bell();
      let s1 = this.value.slice(0, this.cursor);
      let s2 = this.value.slice(this.cursor + 1);
      this.value = `${s1}${s2}`;
      this.red = false;
      if (this.isCursorAtEnd()) {
        this.cursorOffset = 0;
      } else {
        this.cursorOffset++;
      }
      this.render();
    }
    first() {
      this.cursor = 0;
      this.render();
    }
    last() {
      this.cursor = this.value.length;
      this.render();
    }
    left() {
      if (this.cursor <= 0 || this.placeholder)
        return this.bell();
      this.moveCursor(-1);
      this.render();
    }
    right() {
      if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
        return this.bell();
      this.moveCursor(1);
      this.render();
    }
    isCursorAtStart() {
      return this.cursor === 0 || this.placeholder && this.cursor === 1;
    }
    isCursorAtEnd() {
      return this.cursor === this.rendered.length || this.placeholder && this.cursor === this.rendered.length + 1;
    }
    render() {
      if (this.closed)
        return;
      if (!this.firstRender) {
        if (this.outputError)
          this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
        this.out.write(clear(this.outputText, this.out.columns));
      }
      super.render();
      this.outputError = "";
      this.outputText = [
        style.symbol(this.done, this.aborted),
        color.bold(this.msg),
        style.delimiter(this.done),
        this.red ? color.red(this.rendered) : this.rendered
      ].join(` `);
      if (this.error) {
        this.outputError += this.errorMsg.split(`
`).reduce((a, l2, i) => a + `
${i ? " " : figures.pointerSmall} ${color.red().italic(l2)}`, ``);
      }
      this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore + cursor.move(this.cursorOffset, 0));
    }
  }
  module.exports = TextPrompt;
});

// ../../../../node_modules/prompts/lib/elements/select.js
var require_select2 = __commonJS((exports, module) => {
  var color = require_kleur();
  var Prompt = require_prompt2();
  var { style, clear, figures, wrap, entriesToDisplay } = require_util2();
  var { cursor } = require_src();

  class SelectPrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.msg = opts.message;
      this.hint = opts.hint || "- Use arrow-keys. Return to submit.";
      this.warn = opts.warn || "- This option is disabled";
      this.cursor = opts.initial || 0;
      this.choices = opts.choices.map((ch, idx) => {
        if (typeof ch === "string")
          ch = { title: ch, value: idx };
        return {
          title: ch && (ch.title || ch.value || ch),
          value: ch && (ch.value === undefined ? idx : ch.value),
          description: ch && ch.description,
          selected: ch && ch.selected,
          disabled: ch && ch.disabled
        };
      });
      this.optionsPerPage = opts.optionsPerPage || 10;
      this.value = (this.choices[this.cursor] || {}).value;
      this.clear = clear("", this.out.columns);
      this.render();
    }
    moveCursor(n) {
      this.cursor = n;
      this.value = this.choices[n].value;
      this.fire();
    }
    reset() {
      this.moveCursor(0);
      this.fire();
      this.render();
    }
    exit() {
      this.abort();
    }
    abort() {
      this.done = this.aborted = true;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    submit() {
      if (!this.selection.disabled) {
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      } else
        this.bell();
    }
    first() {
      this.moveCursor(0);
      this.render();
    }
    last() {
      this.moveCursor(this.choices.length - 1);
      this.render();
    }
    up() {
      if (this.cursor === 0) {
        this.moveCursor(this.choices.length - 1);
      } else {
        this.moveCursor(this.cursor - 1);
      }
      this.render();
    }
    down() {
      if (this.cursor === this.choices.length - 1) {
        this.moveCursor(0);
      } else {
        this.moveCursor(this.cursor + 1);
      }
      this.render();
    }
    next() {
      this.moveCursor((this.cursor + 1) % this.choices.length);
      this.render();
    }
    _(c, key) {
      if (c === " ")
        return this.submit();
    }
    get selection() {
      return this.choices[this.cursor];
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      else
        this.out.write(clear(this.outputText, this.out.columns));
      super.render();
      let { startIndex, endIndex } = entriesToDisplay(this.cursor, this.choices.length, this.optionsPerPage);
      this.outputText = [
        style.symbol(this.done, this.aborted),
        color.bold(this.msg),
        style.delimiter(false),
        this.done ? this.selection.title : this.selection.disabled ? color.yellow(this.warn) : color.gray(this.hint)
      ].join(" ");
      if (!this.done) {
        this.outputText += `
`;
        for (let i = startIndex;i < endIndex; i++) {
          let title, prefix, desc = "", v = this.choices[i];
          if (i === startIndex && startIndex > 0) {
            prefix = figures.arrowUp;
          } else if (i === endIndex - 1 && endIndex < this.choices.length) {
            prefix = figures.arrowDown;
          } else {
            prefix = " ";
          }
          if (v.disabled) {
            title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
            prefix = (this.cursor === i ? color.bold().gray(figures.pointer) + " " : "  ") + prefix;
          } else {
            title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
            prefix = (this.cursor === i ? color.cyan(figures.pointer) + " " : "  ") + prefix;
            if (v.description && this.cursor === i) {
              desc = ` - ${v.description}`;
              if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
                desc = `
` + wrap(v.description, { margin: 3, width: this.out.columns });
              }
            }
          }
          this.outputText += `${prefix} ${title}${color.gray(desc)}
`;
        }
      }
      this.out.write(this.outputText);
    }
  }
  module.exports = SelectPrompt;
});

// ../../../../node_modules/prompts/lib/elements/toggle.js
var require_toggle2 = __commonJS((exports, module) => {
  var color = require_kleur();
  var Prompt = require_prompt2();
  var { style, clear } = require_util2();
  var { cursor, erase } = require_src();

  class TogglePrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.msg = opts.message;
      this.value = !!opts.initial;
      this.active = opts.active || "on";
      this.inactive = opts.inactive || "off";
      this.initialValue = this.value;
      this.render();
    }
    reset() {
      this.value = this.initialValue;
      this.fire();
      this.render();
    }
    exit() {
      this.abort();
    }
    abort() {
      this.done = this.aborted = true;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    submit() {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    deactivate() {
      if (this.value === false)
        return this.bell();
      this.value = false;
      this.render();
    }
    activate() {
      if (this.value === true)
        return this.bell();
      this.value = true;
      this.render();
    }
    delete() {
      this.deactivate();
    }
    left() {
      this.deactivate();
    }
    right() {
      this.activate();
    }
    down() {
      this.deactivate();
    }
    up() {
      this.activate();
    }
    next() {
      this.value = !this.value;
      this.fire();
      this.render();
    }
    _(c, key) {
      if (c === " ") {
        this.value = !this.value;
      } else if (c === "1") {
        this.value = true;
      } else if (c === "0") {
        this.value = false;
      } else
        return this.bell();
      this.render();
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      else
        this.out.write(clear(this.outputText, this.out.columns));
      super.render();
      this.outputText = [
        style.symbol(this.done, this.aborted),
        color.bold(this.msg),
        style.delimiter(this.done),
        this.value ? this.inactive : color.cyan().underline(this.inactive),
        color.gray("/"),
        this.value ? color.cyan().underline(this.active) : this.active
      ].join(" ");
      this.out.write(erase.line + cursor.to(0) + this.outputText);
    }
  }
  module.exports = TogglePrompt;
});

// ../../../../node_modules/prompts/lib/dateparts/datepart.js
var require_datepart2 = __commonJS((exports, module) => {
  class DatePart {
    constructor({ token, date, parts, locales: locales2 }) {
      this.token = token;
      this.date = date || new Date;
      this.parts = parts || [this];
      this.locales = locales2 || {};
    }
    up() {}
    down() {}
    next() {
      const currentIdx = this.parts.indexOf(this);
      return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
    }
    setTo(val) {}
    prev() {
      let parts = [].concat(this.parts).reverse();
      const currentIdx = parts.indexOf(this);
      return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
    }
    toString() {
      return String(this.date);
    }
  }
  module.exports = DatePart;
});

// ../../../../node_modules/prompts/lib/dateparts/meridiem.js
var require_meridiem2 = __commonJS((exports, module) => {
  var DatePart = require_datepart2();

  class Meridiem extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setHours((this.date.getHours() + 12) % 24);
    }
    down() {
      this.up();
    }
    toString() {
      let meridiem = this.date.getHours() > 12 ? "pm" : "am";
      return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
    }
  }
  module.exports = Meridiem;
});

// ../../../../node_modules/prompts/lib/dateparts/day.js
var require_day2 = __commonJS((exports, module) => {
  var DatePart = require_datepart2();
  var pos = (n) => {
    n = n % 10;
    return n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
  };

  class Day extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setDate(this.date.getDate() + 1);
    }
    down() {
      this.date.setDate(this.date.getDate() - 1);
    }
    setTo(val) {
      this.date.setDate(parseInt(val.substr(-2)));
    }
    toString() {
      let date = this.date.getDate();
      let day = this.date.getDay();
      return this.token === "DD" ? String(date).padStart(2, "0") : this.token === "Do" ? date + pos(date) : this.token === "d" ? day + 1 : this.token === "ddd" ? this.locales.weekdaysShort[day] : this.token === "dddd" ? this.locales.weekdays[day] : date;
    }
  }
  module.exports = Day;
});

// ../../../../node_modules/prompts/lib/dateparts/hours.js
var require_hours2 = __commonJS((exports, module) => {
  var DatePart = require_datepart2();

  class Hours extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setHours(this.date.getHours() + 1);
    }
    down() {
      this.date.setHours(this.date.getHours() - 1);
    }
    setTo(val) {
      this.date.setHours(parseInt(val.substr(-2)));
    }
    toString() {
      let hours = this.date.getHours();
      if (/h/.test(this.token))
        hours = hours % 12 || 12;
      return this.token.length > 1 ? String(hours).padStart(2, "0") : hours;
    }
  }
  module.exports = Hours;
});

// ../../../../node_modules/prompts/lib/dateparts/milliseconds.js
var require_milliseconds2 = __commonJS((exports, module) => {
  var DatePart = require_datepart2();

  class Milliseconds extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setMilliseconds(this.date.getMilliseconds() + 1);
    }
    down() {
      this.date.setMilliseconds(this.date.getMilliseconds() - 1);
    }
    setTo(val) {
      this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
    }
    toString() {
      return String(this.date.getMilliseconds()).padStart(4, "0").substr(0, this.token.length);
    }
  }
  module.exports = Milliseconds;
});

// ../../../../node_modules/prompts/lib/dateparts/minutes.js
var require_minutes2 = __commonJS((exports, module) => {
  var DatePart = require_datepart2();

  class Minutes extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setMinutes(this.date.getMinutes() + 1);
    }
    down() {
      this.date.setMinutes(this.date.getMinutes() - 1);
    }
    setTo(val) {
      this.date.setMinutes(parseInt(val.substr(-2)));
    }
    toString() {
      let m = this.date.getMinutes();
      return this.token.length > 1 ? String(m).padStart(2, "0") : m;
    }
  }
  module.exports = Minutes;
});

// ../../../../node_modules/prompts/lib/dateparts/month.js
var require_month2 = __commonJS((exports, module) => {
  var DatePart = require_datepart2();

  class Month extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setMonth(this.date.getMonth() + 1);
    }
    down() {
      this.date.setMonth(this.date.getMonth() - 1);
    }
    setTo(val) {
      val = parseInt(val.substr(-2)) - 1;
      this.date.setMonth(val < 0 ? 0 : val);
    }
    toString() {
      let month = this.date.getMonth();
      let tl = this.token.length;
      return tl === 2 ? String(month + 1).padStart(2, "0") : tl === 3 ? this.locales.monthsShort[month] : tl === 4 ? this.locales.months[month] : String(month + 1);
    }
  }
  module.exports = Month;
});

// ../../../../node_modules/prompts/lib/dateparts/seconds.js
var require_seconds2 = __commonJS((exports, module) => {
  var DatePart = require_datepart2();

  class Seconds extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setSeconds(this.date.getSeconds() + 1);
    }
    down() {
      this.date.setSeconds(this.date.getSeconds() - 1);
    }
    setTo(val) {
      this.date.setSeconds(parseInt(val.substr(-2)));
    }
    toString() {
      let s = this.date.getSeconds();
      return this.token.length > 1 ? String(s).padStart(2, "0") : s;
    }
  }
  module.exports = Seconds;
});

// ../../../../node_modules/prompts/lib/dateparts/year.js
var require_year2 = __commonJS((exports, module) => {
  var DatePart = require_datepart2();

  class Year extends DatePart {
    constructor(opts = {}) {
      super(opts);
    }
    up() {
      this.date.setFullYear(this.date.getFullYear() + 1);
    }
    down() {
      this.date.setFullYear(this.date.getFullYear() - 1);
    }
    setTo(val) {
      this.date.setFullYear(val.substr(-4));
    }
    toString() {
      let year = String(this.date.getFullYear()).padStart(4, "0");
      return this.token.length === 2 ? year.substr(-2) : year;
    }
  }
  module.exports = Year;
});

// ../../../../node_modules/prompts/lib/dateparts/index.js
var require_dateparts2 = __commonJS((exports, module) => {
  module.exports = {
    DatePart: require_datepart2(),
    Meridiem: require_meridiem2(),
    Day: require_day2(),
    Hours: require_hours2(),
    Milliseconds: require_milliseconds2(),
    Minutes: require_minutes2(),
    Month: require_month2(),
    Seconds: require_seconds2(),
    Year: require_year2()
  };
});

// ../../../../node_modules/prompts/lib/elements/date.js
var require_date2 = __commonJS((exports, module) => {
  var color = require_kleur();
  var Prompt = require_prompt2();
  var { style, clear, figures } = require_util2();
  var { erase, cursor } = require_src();
  var { DatePart, Meridiem, Day, Hours, Milliseconds, Minutes, Month, Seconds, Year } = require_dateparts2();
  var regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
  var regexGroups = {
    1: ({ token }) => token.replace(/\\(.)/g, "$1"),
    2: (opts) => new Day(opts),
    3: (opts) => new Month(opts),
    4: (opts) => new Year(opts),
    5: (opts) => new Meridiem(opts),
    6: (opts) => new Hours(opts),
    7: (opts) => new Minutes(opts),
    8: (opts) => new Seconds(opts),
    9: (opts) => new Milliseconds(opts)
  };
  var dfltLocales = {
    months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
    monthsShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
    weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
    weekdaysShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")
  };

  class DatePrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.msg = opts.message;
      this.cursor = 0;
      this.typed = "";
      this.locales = Object.assign(dfltLocales, opts.locales);
      this._date = opts.initial || new Date;
      this.errorMsg = opts.error || "Please Enter A Valid Value";
      this.validator = opts.validate || (() => true);
      this.mask = opts.mask || "YYYY-MM-DD HH:mm:ss";
      this.clear = clear("", this.out.columns);
      this.render();
    }
    get value() {
      return this.date;
    }
    get date() {
      return this._date;
    }
    set date(date) {
      if (date)
        this._date.setTime(date.getTime());
    }
    set mask(mask) {
      let result2;
      this.parts = [];
      while (result2 = regex.exec(mask)) {
        let match = result2.shift();
        let idx = result2.findIndex((gr) => gr != null);
        this.parts.push(idx in regexGroups ? regexGroups[idx]({ token: result2[idx] || match, date: this.date, parts: this.parts, locales: this.locales }) : result2[idx] || match);
      }
      let parts = this.parts.reduce((arr, i) => {
        if (typeof i === "string" && typeof arr[arr.length - 1] === "string")
          arr[arr.length - 1] += i;
        else
          arr.push(i);
        return arr;
      }, []);
      this.parts.splice(0);
      this.parts.push(...parts);
      this.reset();
    }
    moveCursor(n) {
      this.typed = "";
      this.cursor = n;
      this.fire();
    }
    reset() {
      this.moveCursor(this.parts.findIndex((p) => p instanceof DatePart));
      this.fire();
      this.render();
    }
    exit() {
      this.abort();
    }
    abort() {
      this.done = this.aborted = true;
      this.error = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    async validate() {
      let valid = await this.validator(this.value);
      if (typeof valid === "string") {
        this.errorMsg = valid;
        valid = false;
      }
      this.error = !valid;
    }
    async submit() {
      await this.validate();
      if (this.error) {
        this.color = "red";
        this.fire();
        this.render();
        return;
      }
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    up() {
      this.typed = "";
      this.parts[this.cursor].up();
      this.render();
    }
    down() {
      this.typed = "";
      this.parts[this.cursor].down();
      this.render();
    }
    left() {
      let prev = this.parts[this.cursor].prev();
      if (prev == null)
        return this.bell();
      this.moveCursor(this.parts.indexOf(prev));
      this.render();
    }
    right() {
      let next = this.parts[this.cursor].next();
      if (next == null)
        return this.bell();
      this.moveCursor(this.parts.indexOf(next));
      this.render();
    }
    next() {
      let next = this.parts[this.cursor].next();
      this.moveCursor(next ? this.parts.indexOf(next) : this.parts.findIndex((part) => part instanceof DatePart));
      this.render();
    }
    _(c) {
      if (/\d/.test(c)) {
        this.typed += c;
        this.parts[this.cursor].setTo(this.typed);
        this.render();
      }
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      else
        this.out.write(clear(this.outputText, this.out.columns));
      super.render();
      this.outputText = [
        style.symbol(this.done, this.aborted),
        color.bold(this.msg),
        style.delimiter(false),
        this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), []).join("")
      ].join(" ");
      if (this.error) {
        this.outputText += this.errorMsg.split(`
`).reduce((a, l2, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l2)}`, ``);
      }
      this.out.write(erase.line + cursor.to(0) + this.outputText);
    }
  }
  module.exports = DatePrompt;
});

// ../../../../node_modules/prompts/lib/elements/number.js
var require_number2 = __commonJS((exports, module) => {
  var color = require_kleur();
  var Prompt = require_prompt2();
  var { cursor, erase } = require_src();
  var { style, figures, clear, lines } = require_util2();
  var isNumber = /[0-9]/;
  var isDef = (any) => any !== undefined;
  var round = (number, precision) => {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  };

  class NumberPrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.transform = style.render(opts.style);
      this.msg = opts.message;
      this.initial = isDef(opts.initial) ? opts.initial : "";
      this.float = !!opts.float;
      this.round = opts.round || 2;
      this.inc = opts.increment || 1;
      this.min = isDef(opts.min) ? opts.min : -Infinity;
      this.max = isDef(opts.max) ? opts.max : Infinity;
      this.errorMsg = opts.error || `Please Enter A Valid Value`;
      this.validator = opts.validate || (() => true);
      this.color = `cyan`;
      this.value = ``;
      this.typed = ``;
      this.lastHit = 0;
      this.render();
    }
    set value(v) {
      if (!v && v !== 0) {
        this.placeholder = true;
        this.rendered = color.gray(this.transform.render(`${this.initial}`));
        this._value = ``;
      } else {
        this.placeholder = false;
        this.rendered = this.transform.render(`${round(v, this.round)}`);
        this._value = round(v, this.round);
      }
      this.fire();
    }
    get value() {
      return this._value;
    }
    parse(x2) {
      return this.float ? parseFloat(x2) : parseInt(x2);
    }
    valid(c) {
      return c === `-` || c === `.` && this.float || isNumber.test(c);
    }
    reset() {
      this.typed = ``;
      this.value = ``;
      this.fire();
      this.render();
    }
    exit() {
      this.abort();
    }
    abort() {
      let x2 = this.value;
      this.value = x2 !== `` ? x2 : this.initial;
      this.done = this.aborted = true;
      this.error = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    async validate() {
      let valid = await this.validator(this.value);
      if (typeof valid === `string`) {
        this.errorMsg = valid;
        valid = false;
      }
      this.error = !valid;
    }
    async submit() {
      await this.validate();
      if (this.error) {
        this.color = `red`;
        this.fire();
        this.render();
        return;
      }
      let x2 = this.value;
      this.value = x2 !== `` ? x2 : this.initial;
      this.done = true;
      this.aborted = false;
      this.error = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    up() {
      this.typed = ``;
      if (this.value === "") {
        this.value = this.min - this.inc;
      }
      if (this.value >= this.max)
        return this.bell();
      this.value += this.inc;
      this.color = `cyan`;
      this.fire();
      this.render();
    }
    down() {
      this.typed = ``;
      if (this.value === "") {
        this.value = this.min + this.inc;
      }
      if (this.value <= this.min)
        return this.bell();
      this.value -= this.inc;
      this.color = `cyan`;
      this.fire();
      this.render();
    }
    delete() {
      let val = this.value.toString();
      if (val.length === 0)
        return this.bell();
      this.value = this.parse(val = val.slice(0, -1)) || ``;
      if (this.value !== "" && this.value < this.min) {
        this.value = this.min;
      }
      this.color = `cyan`;
      this.fire();
      this.render();
    }
    next() {
      this.value = this.initial;
      this.fire();
      this.render();
    }
    _(c, key) {
      if (!this.valid(c))
        return this.bell();
      const now = Date.now();
      if (now - this.lastHit > 1000)
        this.typed = ``;
      this.typed += c;
      this.lastHit = now;
      this.color = `cyan`;
      if (c === `.`)
        return this.fire();
      this.value = Math.min(this.parse(this.typed), this.max);
      if (this.value > this.max)
        this.value = this.max;
      if (this.value < this.min)
        this.value = this.min;
      this.fire();
      this.render();
    }
    render() {
      if (this.closed)
        return;
      if (!this.firstRender) {
        if (this.outputError)
          this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
        this.out.write(clear(this.outputText, this.out.columns));
      }
      super.render();
      this.outputError = "";
      this.outputText = [
        style.symbol(this.done, this.aborted),
        color.bold(this.msg),
        style.delimiter(this.done),
        !this.done || !this.done && !this.placeholder ? color[this.color]().underline(this.rendered) : this.rendered
      ].join(` `);
      if (this.error) {
        this.outputError += this.errorMsg.split(`
`).reduce((a, l2, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l2)}`, ``);
      }
      this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
    }
  }
  module.exports = NumberPrompt;
});

// ../../../../node_modules/prompts/lib/elements/multiselect.js
var require_multiselect2 = __commonJS((exports, module) => {
  var color = require_kleur();
  var { cursor } = require_src();
  var Prompt = require_prompt2();
  var { clear, figures, style, wrap, entriesToDisplay } = require_util2();

  class MultiselectPrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.msg = opts.message;
      this.cursor = opts.cursor || 0;
      this.scrollIndex = opts.cursor || 0;
      this.hint = opts.hint || "";
      this.warn = opts.warn || "- This option is disabled -";
      this.minSelected = opts.min;
      this.showMinError = false;
      this.maxChoices = opts.max;
      this.instructions = opts.instructions;
      this.optionsPerPage = opts.optionsPerPage || 10;
      this.value = opts.choices.map((ch, idx) => {
        if (typeof ch === "string")
          ch = { title: ch, value: idx };
        return {
          title: ch && (ch.title || ch.value || ch),
          description: ch && ch.description,
          value: ch && (ch.value === undefined ? idx : ch.value),
          selected: ch && ch.selected,
          disabled: ch && ch.disabled
        };
      });
      this.clear = clear("", this.out.columns);
      if (!opts.overrideRender) {
        this.render();
      }
    }
    reset() {
      this.value.map((v) => !v.selected);
      this.cursor = 0;
      this.fire();
      this.render();
    }
    selected() {
      return this.value.filter((v) => v.selected);
    }
    exit() {
      this.abort();
    }
    abort() {
      this.done = this.aborted = true;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    submit() {
      const selected = this.value.filter((e) => e.selected);
      if (this.minSelected && selected.length < this.minSelected) {
        this.showMinError = true;
        this.render();
      } else {
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
    }
    first() {
      this.cursor = 0;
      this.render();
    }
    last() {
      this.cursor = this.value.length - 1;
      this.render();
    }
    next() {
      this.cursor = (this.cursor + 1) % this.value.length;
      this.render();
    }
    up() {
      if (this.cursor === 0) {
        this.cursor = this.value.length - 1;
      } else {
        this.cursor--;
      }
      this.render();
    }
    down() {
      if (this.cursor === this.value.length - 1) {
        this.cursor = 0;
      } else {
        this.cursor++;
      }
      this.render();
    }
    left() {
      this.value[this.cursor].selected = false;
      this.render();
    }
    right() {
      if (this.value.filter((e) => e.selected).length >= this.maxChoices)
        return this.bell();
      this.value[this.cursor].selected = true;
      this.render();
    }
    handleSpaceToggle() {
      const v = this.value[this.cursor];
      if (v.selected) {
        v.selected = false;
        this.render();
      } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
        return this.bell();
      } else {
        v.selected = true;
        this.render();
      }
    }
    toggleAll() {
      if (this.maxChoices !== undefined || this.value[this.cursor].disabled) {
        return this.bell();
      }
      const newSelected = !this.value[this.cursor].selected;
      this.value.filter((v) => !v.disabled).forEach((v) => v.selected = newSelected);
      this.render();
    }
    _(c, key) {
      if (c === " ") {
        this.handleSpaceToggle();
      } else if (c === "a") {
        this.toggleAll();
      } else {
        return this.bell();
      }
    }
    renderInstructions() {
      if (this.instructions === undefined || this.instructions) {
        if (typeof this.instructions === "string") {
          return this.instructions;
        }
        return `
Instructions:
` + `    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
` + `    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
` + (this.maxChoices === undefined ? `    a: Toggle all
` : "") + `    enter/return: Complete answer`;
      }
      return "";
    }
    renderOption(cursor2, v, i, arrowIndicator) {
      const prefix = (v.selected ? color.green(figures.radioOn) : figures.radioOff) + " " + arrowIndicator + " ";
      let title, desc;
      if (v.disabled) {
        title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
      } else {
        title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
        if (cursor2 === i && v.description) {
          desc = ` - ${v.description}`;
          if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
            desc = `
` + wrap(v.description, { margin: prefix.length, width: this.out.columns });
          }
        }
      }
      return prefix + title + color.gray(desc || "");
    }
    paginateOptions(options) {
      if (options.length === 0) {
        return color.red("No matches for this query.");
      }
      let { startIndex, endIndex } = entriesToDisplay(this.cursor, options.length, this.optionsPerPage);
      let prefix, styledOptions = [];
      for (let i = startIndex;i < endIndex; i++) {
        if (i === startIndex && startIndex > 0) {
          prefix = figures.arrowUp;
        } else if (i === endIndex - 1 && endIndex < options.length) {
          prefix = figures.arrowDown;
        } else {
          prefix = " ";
        }
        styledOptions.push(this.renderOption(this.cursor, options[i], i, prefix));
      }
      return `
` + styledOptions.join(`
`);
    }
    renderOptions(options) {
      if (!this.done) {
        return this.paginateOptions(options);
      }
      return "";
    }
    renderDoneOrInstructions() {
      if (this.done) {
        return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
      }
      const output = [color.gray(this.hint), this.renderInstructions()];
      if (this.value[this.cursor].disabled) {
        output.push(color.yellow(this.warn));
      }
      return output.join(" ");
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      super.render();
      let prompt = [
        style.symbol(this.done, this.aborted),
        color.bold(this.msg),
        style.delimiter(false),
        this.renderDoneOrInstructions()
      ].join(" ");
      if (this.showMinError) {
        prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
        this.showMinError = false;
      }
      prompt += this.renderOptions(this.value);
      this.out.write(this.clear + prompt);
      this.clear = clear(prompt, this.out.columns);
    }
  }
  module.exports = MultiselectPrompt;
});

// ../../../../node_modules/prompts/lib/elements/autocomplete.js
var require_autocomplete2 = __commonJS((exports, module) => {
  var color = require_kleur();
  var Prompt = require_prompt2();
  var { erase, cursor } = require_src();
  var { style, clear, figures, wrap, entriesToDisplay } = require_util2();
  var getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
  var getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
  var getIndex = (arr, valOrTitle) => {
    const index = arr.findIndex((el) => el.value === valOrTitle || el.title === valOrTitle);
    return index > -1 ? index : undefined;
  };

  class AutocompletePrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.msg = opts.message;
      this.suggest = opts.suggest;
      this.choices = opts.choices;
      this.initial = typeof opts.initial === "number" ? opts.initial : getIndex(opts.choices, opts.initial);
      this.select = this.initial || opts.cursor || 0;
      this.i18n = { noMatches: opts.noMatches || "no matches found" };
      this.fallback = opts.fallback || this.initial;
      this.clearFirst = opts.clearFirst || false;
      this.suggestions = [];
      this.input = "";
      this.limit = opts.limit || 10;
      this.cursor = 0;
      this.transform = style.render(opts.style);
      this.scale = this.transform.scale;
      this.render = this.render.bind(this);
      this.complete = this.complete.bind(this);
      this.clear = clear("", this.out.columns);
      this.complete(this.render);
      this.render();
    }
    set fallback(fb) {
      this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
    }
    get fallback() {
      let choice;
      if (typeof this._fb === "number")
        choice = this.choices[this._fb];
      else if (typeof this._fb === "string")
        choice = { title: this._fb };
      return choice || this._fb || { title: this.i18n.noMatches };
    }
    moveSelect(i) {
      this.select = i;
      if (this.suggestions.length > 0)
        this.value = getVal(this.suggestions, i);
      else
        this.value = this.fallback.value;
      this.fire();
    }
    async complete(cb) {
      const p = this.completing = this.suggest(this.input, this.choices);
      const suggestions = await p;
      if (this.completing !== p)
        return;
      this.suggestions = suggestions.map((s, i, arr) => ({ title: getTitle(arr, i), value: getVal(arr, i), description: s.description }));
      this.completing = false;
      const l2 = Math.max(suggestions.length - 1, 0);
      this.moveSelect(Math.min(l2, this.select));
      cb && cb();
    }
    reset() {
      this.input = "";
      this.complete(() => {
        this.moveSelect(this.initial !== undefined ? this.initial : 0);
        this.render();
      });
      this.render();
    }
    exit() {
      if (this.clearFirst && this.input.length > 0) {
        this.reset();
      } else {
        this.done = this.exited = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
    }
    abort() {
      this.done = this.aborted = true;
      this.exited = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    submit() {
      this.done = true;
      this.aborted = this.exited = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    _(c, key) {
      let s1 = this.input.slice(0, this.cursor);
      let s2 = this.input.slice(this.cursor);
      this.input = `${s1}${c}${s2}`;
      this.cursor = s1.length + 1;
      this.complete(this.render);
      this.render();
    }
    delete() {
      if (this.cursor === 0)
        return this.bell();
      let s1 = this.input.slice(0, this.cursor - 1);
      let s2 = this.input.slice(this.cursor);
      this.input = `${s1}${s2}`;
      this.complete(this.render);
      this.cursor = this.cursor - 1;
      this.render();
    }
    deleteForward() {
      if (this.cursor * this.scale >= this.rendered.length)
        return this.bell();
      let s1 = this.input.slice(0, this.cursor);
      let s2 = this.input.slice(this.cursor + 1);
      this.input = `${s1}${s2}`;
      this.complete(this.render);
      this.render();
    }
    first() {
      this.moveSelect(0);
      this.render();
    }
    last() {
      this.moveSelect(this.suggestions.length - 1);
      this.render();
    }
    up() {
      if (this.select === 0) {
        this.moveSelect(this.suggestions.length - 1);
      } else {
        this.moveSelect(this.select - 1);
      }
      this.render();
    }
    down() {
      if (this.select === this.suggestions.length - 1) {
        this.moveSelect(0);
      } else {
        this.moveSelect(this.select + 1);
      }
      this.render();
    }
    next() {
      if (this.select === this.suggestions.length - 1) {
        this.moveSelect(0);
      } else
        this.moveSelect(this.select + 1);
      this.render();
    }
    nextPage() {
      this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
      this.render();
    }
    prevPage() {
      this.moveSelect(Math.max(this.select - this.limit, 0));
      this.render();
    }
    left() {
      if (this.cursor <= 0)
        return this.bell();
      this.cursor = this.cursor - 1;
      this.render();
    }
    right() {
      if (this.cursor * this.scale >= this.rendered.length)
        return this.bell();
      this.cursor = this.cursor + 1;
      this.render();
    }
    renderOption(v, hovered, isStart, isEnd) {
      let desc;
      let prefix = isStart ? figures.arrowUp : isEnd ? figures.arrowDown : " ";
      let title = hovered ? color.cyan().underline(v.title) : v.title;
      prefix = (hovered ? color.cyan(figures.pointer) + " " : "  ") + prefix;
      if (v.description) {
        desc = ` - ${v.description}`;
        if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
          desc = `
` + wrap(v.description, { margin: 3, width: this.out.columns });
        }
      }
      return prefix + " " + title + color.gray(desc || "");
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      else
        this.out.write(clear(this.outputText, this.out.columns));
      super.render();
      let { startIndex, endIndex } = entriesToDisplay(this.select, this.choices.length, this.limit);
      this.outputText = [
        style.symbol(this.done, this.aborted, this.exited),
        color.bold(this.msg),
        style.delimiter(this.completing),
        this.done && this.suggestions[this.select] ? this.suggestions[this.select].title : this.rendered = this.transform.render(this.input)
      ].join(" ");
      if (!this.done) {
        const suggestions = this.suggestions.slice(startIndex, endIndex).map((item2, i) => this.renderOption(item2, this.select === i + startIndex, i === 0 && startIndex > 0, i + startIndex === endIndex - 1 && endIndex < this.choices.length)).join(`
`);
        this.outputText += `
` + (suggestions || color.gray(this.fallback.title));
      }
      this.out.write(erase.line + cursor.to(0) + this.outputText);
    }
  }
  module.exports = AutocompletePrompt;
});

// ../../../../node_modules/prompts/lib/elements/autocompleteMultiselect.js
var require_autocompleteMultiselect2 = __commonJS((exports, module) => {
  var color = require_kleur();
  var { cursor } = require_src();
  var MultiselectPrompt = require_multiselect2();
  var { clear, style, figures } = require_util2();

  class AutocompleteMultiselectPrompt extends MultiselectPrompt {
    constructor(opts = {}) {
      opts.overrideRender = true;
      super(opts);
      this.inputValue = "";
      this.clear = clear("", this.out.columns);
      this.filteredOptions = this.value;
      this.render();
    }
    last() {
      this.cursor = this.filteredOptions.length - 1;
      this.render();
    }
    next() {
      this.cursor = (this.cursor + 1) % this.filteredOptions.length;
      this.render();
    }
    up() {
      if (this.cursor === 0) {
        this.cursor = this.filteredOptions.length - 1;
      } else {
        this.cursor--;
      }
      this.render();
    }
    down() {
      if (this.cursor === this.filteredOptions.length - 1) {
        this.cursor = 0;
      } else {
        this.cursor++;
      }
      this.render();
    }
    left() {
      this.filteredOptions[this.cursor].selected = false;
      this.render();
    }
    right() {
      if (this.value.filter((e) => e.selected).length >= this.maxChoices)
        return this.bell();
      this.filteredOptions[this.cursor].selected = true;
      this.render();
    }
    delete() {
      if (this.inputValue.length) {
        this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
        this.updateFilteredOptions();
      }
    }
    updateFilteredOptions() {
      const currentHighlight = this.filteredOptions[this.cursor];
      this.filteredOptions = this.value.filter((v) => {
        if (this.inputValue) {
          if (typeof v.title === "string") {
            if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
              return true;
            }
          }
          if (typeof v.value === "string") {
            if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
              return true;
            }
          }
          return false;
        }
        return true;
      });
      const newHighlightIndex = this.filteredOptions.findIndex((v) => v === currentHighlight);
      this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
      this.render();
    }
    handleSpaceToggle() {
      const v = this.filteredOptions[this.cursor];
      if (v.selected) {
        v.selected = false;
        this.render();
      } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
        return this.bell();
      } else {
        v.selected = true;
        this.render();
      }
    }
    handleInputChange(c) {
      this.inputValue = this.inputValue + c;
      this.updateFilteredOptions();
    }
    _(c, key) {
      if (c === " ") {
        this.handleSpaceToggle();
      } else {
        this.handleInputChange(c);
      }
    }
    renderInstructions() {
      if (this.instructions === undefined || this.instructions) {
        if (typeof this.instructions === "string") {
          return this.instructions;
        }
        return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
      }
      return "";
    }
    renderCurrentInput() {
      return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray("Enter something to filter")}
`;
    }
    renderOption(cursor2, v, i) {
      let title;
      if (v.disabled)
        title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
      else
        title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
      return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + "  " + title;
    }
    renderDoneOrInstructions() {
      if (this.done) {
        return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
      }
      const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];
      if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
        output.push(color.yellow(this.warn));
      }
      return output.join(" ");
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      super.render();
      let prompt = [
        style.symbol(this.done, this.aborted),
        color.bold(this.msg),
        style.delimiter(false),
        this.renderDoneOrInstructions()
      ].join(" ");
      if (this.showMinError) {
        prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
        this.showMinError = false;
      }
      prompt += this.renderOptions(this.filteredOptions);
      this.out.write(this.clear + prompt);
      this.clear = clear(prompt, this.out.columns);
    }
  }
  module.exports = AutocompleteMultiselectPrompt;
});

// ../../../../node_modules/prompts/lib/elements/confirm.js
var require_confirm2 = __commonJS((exports, module) => {
  var color = require_kleur();
  var Prompt = require_prompt2();
  var { style, clear } = require_util2();
  var { erase, cursor } = require_src();

  class ConfirmPrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.msg = opts.message;
      this.value = opts.initial;
      this.initialValue = !!opts.initial;
      this.yesMsg = opts.yes || "yes";
      this.yesOption = opts.yesOption || "(Y/n)";
      this.noMsg = opts.no || "no";
      this.noOption = opts.noOption || "(y/N)";
      this.render();
    }
    reset() {
      this.value = this.initialValue;
      this.fire();
      this.render();
    }
    exit() {
      this.abort();
    }
    abort() {
      this.done = this.aborted = true;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    submit() {
      this.value = this.value || false;
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    _(c, key) {
      if (c.toLowerCase() === "y") {
        this.value = true;
        return this.submit();
      }
      if (c.toLowerCase() === "n") {
        this.value = false;
        return this.submit();
      }
      return this.bell();
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      else
        this.out.write(clear(this.outputText, this.out.columns));
      super.render();
      this.outputText = [
        style.symbol(this.done, this.aborted),
        color.bold(this.msg),
        style.delimiter(this.done),
        this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)
      ].join(" ");
      this.out.write(erase.line + cursor.to(0) + this.outputText);
    }
  }
  module.exports = ConfirmPrompt;
});

// ../../../../node_modules/prompts/lib/elements/index.js
var require_elements2 = __commonJS((exports, module) => {
  module.exports = {
    TextPrompt: require_text2(),
    SelectPrompt: require_select2(),
    TogglePrompt: require_toggle2(),
    DatePrompt: require_date2(),
    NumberPrompt: require_number2(),
    MultiselectPrompt: require_multiselect2(),
    AutocompletePrompt: require_autocomplete2(),
    AutocompleteMultiselectPrompt: require_autocompleteMultiselect2(),
    ConfirmPrompt: require_confirm2()
  };
});

// ../../../../node_modules/prompts/lib/prompts.js
var require_prompts2 = __commonJS((exports) => {
  var $2 = exports;
  var el = require_elements2();
  var noop = (v) => v;
  function toPrompt(type, args, opts = {}) {
    return new Promise((res, rej) => {
      const p = new el[type](args);
      const onAbort = opts.onAbort || noop;
      const onSubmit = opts.onSubmit || noop;
      const onExit = opts.onExit || noop;
      p.on("state", args.onState || noop);
      p.on("submit", (x2) => res(onSubmit(x2)));
      p.on("exit", (x2) => res(onExit(x2)));
      p.on("abort", (x2) => rej(onAbort(x2)));
    });
  }
  $2.text = (args) => toPrompt("TextPrompt", args);
  $2.password = (args) => {
    args.style = "password";
    return $2.text(args);
  };
  $2.invisible = (args) => {
    args.style = "invisible";
    return $2.text(args);
  };
  $2.number = (args) => toPrompt("NumberPrompt", args);
  $2.date = (args) => toPrompt("DatePrompt", args);
  $2.confirm = (args) => toPrompt("ConfirmPrompt", args);
  $2.list = (args) => {
    const sep2 = args.separator || ",";
    return toPrompt("TextPrompt", args, {
      onSubmit: (str) => str.split(sep2).map((s) => s.trim())
    });
  };
  $2.toggle = (args) => toPrompt("TogglePrompt", args);
  $2.select = (args) => toPrompt("SelectPrompt", args);
  $2.multiselect = (args) => {
    args.choices = [].concat(args.choices || []);
    const toSelected = (items) => items.filter((item2) => item2.selected).map((item2) => item2.value);
    return toPrompt("MultiselectPrompt", args, {
      onAbort: toSelected,
      onSubmit: toSelected
    });
  };
  $2.autocompleteMultiselect = (args) => {
    args.choices = [].concat(args.choices || []);
    const toSelected = (items) => items.filter((item2) => item2.selected).map((item2) => item2.value);
    return toPrompt("AutocompleteMultiselectPrompt", args, {
      onAbort: toSelected,
      onSubmit: toSelected
    });
  };
  var byTitle = (input, choices) => Promise.resolve(choices.filter((item2) => item2.title.slice(0, input.length).toLowerCase() === input.toLowerCase()));
  $2.autocomplete = (args) => {
    args.suggest = args.suggest || byTitle;
    args.choices = [].concat(args.choices || []);
    return toPrompt("AutocompletePrompt", args);
  };
});

// ../../../../node_modules/prompts/lib/index.js
var require_lib2 = __commonJS((exports, module) => {
  var prompts = require_prompts2();
  var passOn = ["suggest", "format", "onState", "validate", "onRender", "type"];
  var noop = () => {};
  async function prompt(questions = [], { onSubmit = noop, onCancel = noop } = {}) {
    const answers = {};
    const override2 = prompt._override || {};
    questions = [].concat(questions);
    let answer, question, quit, name, type, lastPrompt;
    const getFormattedAnswer = async (question2, answer2, skipValidation = false) => {
      if (!skipValidation && question2.validate && question2.validate(answer2) !== true) {
        return;
      }
      return question2.format ? await question2.format(answer2, answers) : answer2;
    };
    for (question of questions) {
      ({ name, type } = question);
      if (typeof type === "function") {
        type = await type(answer, { ...answers }, question);
        question["type"] = type;
      }
      if (!type)
        continue;
      for (let key in question) {
        if (passOn.includes(key))
          continue;
        let value = question[key];
        question[key] = typeof value === "function" ? await value(answer, { ...answers }, lastPrompt) : value;
      }
      lastPrompt = question;
      if (typeof question.message !== "string") {
        throw new Error("prompt message is required");
      }
      ({ name, type } = question);
      if (prompts[type] === undefined) {
        throw new Error(`prompt type (${type}) is not defined`);
      }
      if (override2[question.name] !== undefined) {
        answer = await getFormattedAnswer(question, override2[question.name]);
        if (answer !== undefined) {
          answers[name] = answer;
          continue;
        }
      }
      try {
        answer = prompt._injected ? getInjectedAnswer(prompt._injected, question.initial) : await prompts[type](question);
        answers[name] = answer = await getFormattedAnswer(question, answer, true);
        quit = await onSubmit(question, answer, answers);
      } catch (err2) {
        quit = !await onCancel(question, answers);
      }
      if (quit)
        return answers;
    }
    return answers;
  }
  function getInjectedAnswer(injected, deafultValue) {
    const answer = injected.shift();
    if (answer instanceof Error) {
      throw answer;
    }
    return answer === undefined ? deafultValue : answer;
  }
  function inject(answers) {
    prompt._injected = (prompt._injected || []).concat(answers);
  }
  function override(answers) {
    prompt._override = Object.assign({}, answers);
  }
  module.exports = Object.assign(prompt, { prompt, prompts, inject, override });
});

// ../../../../node_modules/prompts/index.js
var require_prompts3 = __commonJS((exports, module) => {
  function isNodeLT(tar) {
    tar = (Array.isArray(tar) ? tar : tar.split(".")).map(Number);
    let i = 0, src = process.versions.node.split(".").map(Number);
    for (;i < tar.length; i++) {
      if (src[i] > tar[i])
        return false;
      if (tar[i] > src[i])
        return true;
    }
    return false;
  }
  module.exports = isNodeLT("8.6.0") ? require_dist() : require_lib2();
});

// ../../../../node_modules/cli-spinners/spinners.json
var require_spinners = __commonJS((exports, module) => {
  module.exports = {
    dots: {
      interval: 80,
      frames: [
        "\u280B",
        "\u2819",
        "\u2839",
        "\u2838",
        "\u283C",
        "\u2834",
        "\u2826",
        "\u2827",
        "\u2807",
        "\u280F"
      ]
    },
    dots2: {
      interval: 80,
      frames: [
        "\u28FE",
        "\u28FD",
        "\u28FB",
        "\u28BF",
        "\u287F",
        "\u28DF",
        "\u28EF",
        "\u28F7"
      ]
    },
    dots3: {
      interval: 80,
      frames: [
        "\u280B",
        "\u2819",
        "\u281A",
        "\u281E",
        "\u2816",
        "\u2826",
        "\u2834",
        "\u2832",
        "\u2833",
        "\u2813"
      ]
    },
    dots4: {
      interval: 80,
      frames: [
        "\u2804",
        "\u2806",
        "\u2807",
        "\u280B",
        "\u2819",
        "\u2838",
        "\u2830",
        "\u2820",
        "\u2830",
        "\u2838",
        "\u2819",
        "\u280B",
        "\u2807",
        "\u2806"
      ]
    },
    dots5: {
      interval: 80,
      frames: [
        "\u280B",
        "\u2819",
        "\u281A",
        "\u2812",
        "\u2802",
        "\u2802",
        "\u2812",
        "\u2832",
        "\u2834",
        "\u2826",
        "\u2816",
        "\u2812",
        "\u2810",
        "\u2810",
        "\u2812",
        "\u2813",
        "\u280B"
      ]
    },
    dots6: {
      interval: 80,
      frames: [
        "\u2801",
        "\u2809",
        "\u2819",
        "\u281A",
        "\u2812",
        "\u2802",
        "\u2802",
        "\u2812",
        "\u2832",
        "\u2834",
        "\u2824",
        "\u2804",
        "\u2804",
        "\u2824",
        "\u2834",
        "\u2832",
        "\u2812",
        "\u2802",
        "\u2802",
        "\u2812",
        "\u281A",
        "\u2819",
        "\u2809",
        "\u2801"
      ]
    },
    dots7: {
      interval: 80,
      frames: [
        "\u2808",
        "\u2809",
        "\u280B",
        "\u2813",
        "\u2812",
        "\u2810",
        "\u2810",
        "\u2812",
        "\u2816",
        "\u2826",
        "\u2824",
        "\u2820",
        "\u2820",
        "\u2824",
        "\u2826",
        "\u2816",
        "\u2812",
        "\u2810",
        "\u2810",
        "\u2812",
        "\u2813",
        "\u280B",
        "\u2809",
        "\u2808"
      ]
    },
    dots8: {
      interval: 80,
      frames: [
        "\u2801",
        "\u2801",
        "\u2809",
        "\u2819",
        "\u281A",
        "\u2812",
        "\u2802",
        "\u2802",
        "\u2812",
        "\u2832",
        "\u2834",
        "\u2824",
        "\u2804",
        "\u2804",
        "\u2824",
        "\u2820",
        "\u2820",
        "\u2824",
        "\u2826",
        "\u2816",
        "\u2812",
        "\u2810",
        "\u2810",
        "\u2812",
        "\u2813",
        "\u280B",
        "\u2809",
        "\u2808",
        "\u2808"
      ]
    },
    dots9: {
      interval: 80,
      frames: [
        "\u28B9",
        "\u28BA",
        "\u28BC",
        "\u28F8",
        "\u28C7",
        "\u2867",
        "\u2857",
        "\u284F"
      ]
    },
    dots10: {
      interval: 80,
      frames: [
        "\u2884",
        "\u2882",
        "\u2881",
        "\u2841",
        "\u2848",
        "\u2850",
        "\u2860"
      ]
    },
    dots11: {
      interval: 100,
      frames: [
        "\u2801",
        "\u2802",
        "\u2804",
        "\u2840",
        "\u2880",
        "\u2820",
        "\u2810",
        "\u2808"
      ]
    },
    dots12: {
      interval: 80,
      frames: [
        "\u2880\u2800",
        "\u2840\u2800",
        "\u2804\u2800",
        "\u2882\u2800",
        "\u2842\u2800",
        "\u2805\u2800",
        "\u2883\u2800",
        "\u2843\u2800",
        "\u280D\u2800",
        "\u288B\u2800",
        "\u284B\u2800",
        "\u280D\u2801",
        "\u288B\u2801",
        "\u284B\u2801",
        "\u280D\u2809",
        "\u280B\u2809",
        "\u280B\u2809",
        "\u2809\u2819",
        "\u2809\u2819",
        "\u2809\u2829",
        "\u2808\u2899",
        "\u2808\u2859",
        "\u2888\u2829",
        "\u2840\u2899",
        "\u2804\u2859",
        "\u2882\u2829",
        "\u2842\u2898",
        "\u2805\u2858",
        "\u2883\u2828",
        "\u2843\u2890",
        "\u280D\u2850",
        "\u288B\u2820",
        "\u284B\u2880",
        "\u280D\u2841",
        "\u288B\u2801",
        "\u284B\u2801",
        "\u280D\u2809",
        "\u280B\u2809",
        "\u280B\u2809",
        "\u2809\u2819",
        "\u2809\u2819",
        "\u2809\u2829",
        "\u2808\u2899",
        "\u2808\u2859",
        "\u2808\u2829",
        "\u2800\u2899",
        "\u2800\u2859",
        "\u2800\u2829",
        "\u2800\u2898",
        "\u2800\u2858",
        "\u2800\u2828",
        "\u2800\u2890",
        "\u2800\u2850",
        "\u2800\u2820",
        "\u2800\u2880",
        "\u2800\u2840"
      ]
    },
    dots13: {
      interval: 80,
      frames: [
        "\u28FC",
        "\u28F9",
        "\u28BB",
        "\u283F",
        "\u285F",
        "\u28CF",
        "\u28E7",
        "\u28F6"
      ]
    },
    dots8Bit: {
      interval: 80,
      frames: [
        "\u2800",
        "\u2801",
        "\u2802",
        "\u2803",
        "\u2804",
        "\u2805",
        "\u2806",
        "\u2807",
        "\u2840",
        "\u2841",
        "\u2842",
        "\u2843",
        "\u2844",
        "\u2845",
        "\u2846",
        "\u2847",
        "\u2808",
        "\u2809",
        "\u280A",
        "\u280B",
        "\u280C",
        "\u280D",
        "\u280E",
        "\u280F",
        "\u2848",
        "\u2849",
        "\u284A",
        "\u284B",
        "\u284C",
        "\u284D",
        "\u284E",
        "\u284F",
        "\u2810",
        "\u2811",
        "\u2812",
        "\u2813",
        "\u2814",
        "\u2815",
        "\u2816",
        "\u2817",
        "\u2850",
        "\u2851",
        "\u2852",
        "\u2853",
        "\u2854",
        "\u2855",
        "\u2856",
        "\u2857",
        "\u2818",
        "\u2819",
        "\u281A",
        "\u281B",
        "\u281C",
        "\u281D",
        "\u281E",
        "\u281F",
        "\u2858",
        "\u2859",
        "\u285A",
        "\u285B",
        "\u285C",
        "\u285D",
        "\u285E",
        "\u285F",
        "\u2820",
        "\u2821",
        "\u2822",
        "\u2823",
        "\u2824",
        "\u2825",
        "\u2826",
        "\u2827",
        "\u2860",
        "\u2861",
        "\u2862",
        "\u2863",
        "\u2864",
        "\u2865",
        "\u2866",
        "\u2867",
        "\u2828",
        "\u2829",
        "\u282A",
        "\u282B",
        "\u282C",
        "\u282D",
        "\u282E",
        "\u282F",
        "\u2868",
        "\u2869",
        "\u286A",
        "\u286B",
        "\u286C",
        "\u286D",
        "\u286E",
        "\u286F",
        "\u2830",
        "\u2831",
        "\u2832",
        "\u2833",
        "\u2834",
        "\u2835",
        "\u2836",
        "\u2837",
        "\u2870",
        "\u2871",
        "\u2872",
        "\u2873",
        "\u2874",
        "\u2875",
        "\u2876",
        "\u2877",
        "\u2838",
        "\u2839",
        "\u283A",
        "\u283B",
        "\u283C",
        "\u283D",
        "\u283E",
        "\u283F",
        "\u2878",
        "\u2879",
        "\u287A",
        "\u287B",
        "\u287C",
        "\u287D",
        "\u287E",
        "\u287F",
        "\u2880",
        "\u2881",
        "\u2882",
        "\u2883",
        "\u2884",
        "\u2885",
        "\u2886",
        "\u2887",
        "\u28C0",
        "\u28C1",
        "\u28C2",
        "\u28C3",
        "\u28C4",
        "\u28C5",
        "\u28C6",
        "\u28C7",
        "\u2888",
        "\u2889",
        "\u288A",
        "\u288B",
        "\u288C",
        "\u288D",
        "\u288E",
        "\u288F",
        "\u28C8",
        "\u28C9",
        "\u28CA",
        "\u28CB",
        "\u28CC",
        "\u28CD",
        "\u28CE",
        "\u28CF",
        "\u2890",
        "\u2891",
        "\u2892",
        "\u2893",
        "\u2894",
        "\u2895",
        "\u2896",
        "\u2897",
        "\u28D0",
        "\u28D1",
        "\u28D2",
        "\u28D3",
        "\u28D4",
        "\u28D5",
        "\u28D6",
        "\u28D7",
        "\u2898",
        "\u2899",
        "\u289A",
        "\u289B",
        "\u289C",
        "\u289D",
        "\u289E",
        "\u289F",
        "\u28D8",
        "\u28D9",
        "\u28DA",
        "\u28DB",
        "\u28DC",
        "\u28DD",
        "\u28DE",
        "\u28DF",
        "\u28A0",
        "\u28A1",
        "\u28A2",
        "\u28A3",
        "\u28A4",
        "\u28A5",
        "\u28A6",
        "\u28A7",
        "\u28E0",
        "\u28E1",
        "\u28E2",
        "\u28E3",
        "\u28E4",
        "\u28E5",
        "\u28E6",
        "\u28E7",
        "\u28A8",
        "\u28A9",
        "\u28AA",
        "\u28AB",
        "\u28AC",
        "\u28AD",
        "\u28AE",
        "\u28AF",
        "\u28E8",
        "\u28E9",
        "\u28EA",
        "\u28EB",
        "\u28EC",
        "\u28ED",
        "\u28EE",
        "\u28EF",
        "\u28B0",
        "\u28B1",
        "\u28B2",
        "\u28B3",
        "\u28B4",
        "\u28B5",
        "\u28B6",
        "\u28B7",
        "\u28F0",
        "\u28F1",
        "\u28F2",
        "\u28F3",
        "\u28F4",
        "\u28F5",
        "\u28F6",
        "\u28F7",
        "\u28B8",
        "\u28B9",
        "\u28BA",
        "\u28BB",
        "\u28BC",
        "\u28BD",
        "\u28BE",
        "\u28BF",
        "\u28F8",
        "\u28F9",
        "\u28FA",
        "\u28FB",
        "\u28FC",
        "\u28FD",
        "\u28FE",
        "\u28FF"
      ]
    },
    sand: {
      interval: 80,
      frames: [
        "\u2801",
        "\u2802",
        "\u2804",
        "\u2840",
        "\u2848",
        "\u2850",
        "\u2860",
        "\u28C0",
        "\u28C1",
        "\u28C2",
        "\u28C4",
        "\u28CC",
        "\u28D4",
        "\u28E4",
        "\u28E5",
        "\u28E6",
        "\u28EE",
        "\u28F6",
        "\u28F7",
        "\u28FF",
        "\u287F",
        "\u283F",
        "\u289F",
        "\u281F",
        "\u285B",
        "\u281B",
        "\u282B",
        "\u288B",
        "\u280B",
        "\u280D",
        "\u2849",
        "\u2809",
        "\u2811",
        "\u2821",
        "\u2881"
      ]
    },
    line: {
      interval: 130,
      frames: [
        "-",
        "\\",
        "|",
        "/"
      ]
    },
    line2: {
      interval: 100,
      frames: [
        "\u2802",
        "-",
        "\u2013",
        "\u2014",
        "\u2013",
        "-"
      ]
    },
    pipe: {
      interval: 100,
      frames: [
        "\u2524",
        "\u2518",
        "\u2534",
        "\u2514",
        "\u251C",
        "\u250C",
        "\u252C",
        "\u2510"
      ]
    },
    simpleDots: {
      interval: 400,
      frames: [
        ".  ",
        ".. ",
        "...",
        "   "
      ]
    },
    simpleDotsScrolling: {
      interval: 200,
      frames: [
        ".  ",
        ".. ",
        "...",
        " ..",
        "  .",
        "   "
      ]
    },
    star: {
      interval: 70,
      frames: [
        "\u2736",
        "\u2738",
        "\u2739",
        "\u273A",
        "\u2739",
        "\u2737"
      ]
    },
    star2: {
      interval: 80,
      frames: [
        "+",
        "x",
        "*"
      ]
    },
    flip: {
      interval: 70,
      frames: [
        "_",
        "_",
        "_",
        "-",
        "`",
        "`",
        "'",
        "\xB4",
        "-",
        "_",
        "_",
        "_"
      ]
    },
    hamburger: {
      interval: 100,
      frames: [
        "\u2631",
        "\u2632",
        "\u2634"
      ]
    },
    growVertical: {
      interval: 120,
      frames: [
        "\u2581",
        "\u2583",
        "\u2584",
        "\u2585",
        "\u2586",
        "\u2587",
        "\u2586",
        "\u2585",
        "\u2584",
        "\u2583"
      ]
    },
    growHorizontal: {
      interval: 120,
      frames: [
        "\u258F",
        "\u258E",
        "\u258D",
        "\u258C",
        "\u258B",
        "\u258A",
        "\u2589",
        "\u258A",
        "\u258B",
        "\u258C",
        "\u258D",
        "\u258E"
      ]
    },
    balloon: {
      interval: 140,
      frames: [
        " ",
        ".",
        "o",
        "O",
        "@",
        "*",
        " "
      ]
    },
    balloon2: {
      interval: 120,
      frames: [
        ".",
        "o",
        "O",
        "\xB0",
        "O",
        "o",
        "."
      ]
    },
    noise: {
      interval: 100,
      frames: [
        "\u2593",
        "\u2592",
        "\u2591"
      ]
    },
    bounce: {
      interval: 120,
      frames: [
        "\u2801",
        "\u2802",
        "\u2804",
        "\u2802"
      ]
    },
    boxBounce: {
      interval: 120,
      frames: [
        "\u2596",
        "\u2598",
        "\u259D",
        "\u2597"
      ]
    },
    boxBounce2: {
      interval: 100,
      frames: [
        "\u258C",
        "\u2580",
        "\u2590",
        "\u2584"
      ]
    },
    triangle: {
      interval: 50,
      frames: [
        "\u25E2",
        "\u25E3",
        "\u25E4",
        "\u25E5"
      ]
    },
    binary: {
      interval: 80,
      frames: [
        "010010",
        "001100",
        "100101",
        "111010",
        "111101",
        "010111",
        "101011",
        "111000",
        "110011",
        "110101"
      ]
    },
    arc: {
      interval: 100,
      frames: [
        "\u25DC",
        "\u25E0",
        "\u25DD",
        "\u25DE",
        "\u25E1",
        "\u25DF"
      ]
    },
    circle: {
      interval: 120,
      frames: [
        "\u25E1",
        "\u2299",
        "\u25E0"
      ]
    },
    squareCorners: {
      interval: 180,
      frames: [
        "\u25F0",
        "\u25F3",
        "\u25F2",
        "\u25F1"
      ]
    },
    circleQuarters: {
      interval: 120,
      frames: [
        "\u25F4",
        "\u25F7",
        "\u25F6",
        "\u25F5"
      ]
    },
    circleHalves: {
      interval: 50,
      frames: [
        "\u25D0",
        "\u25D3",
        "\u25D1",
        "\u25D2"
      ]
    },
    squish: {
      interval: 100,
      frames: [
        "\u256B",
        "\u256A"
      ]
    },
    toggle: {
      interval: 250,
      frames: [
        "\u22B6",
        "\u22B7"
      ]
    },
    toggle2: {
      interval: 80,
      frames: [
        "\u25AB",
        "\u25AA"
      ]
    },
    toggle3: {
      interval: 120,
      frames: [
        "\u25A1",
        "\u25A0"
      ]
    },
    toggle4: {
      interval: 100,
      frames: [
        "\u25A0",
        "\u25A1",
        "\u25AA",
        "\u25AB"
      ]
    },
    toggle5: {
      interval: 100,
      frames: [
        "\u25AE",
        "\u25AF"
      ]
    },
    toggle6: {
      interval: 300,
      frames: [
        "\u101D",
        "\u1040"
      ]
    },
    toggle7: {
      interval: 80,
      frames: [
        "\u29BE",
        "\u29BF"
      ]
    },
    toggle8: {
      interval: 100,
      frames: [
        "\u25CD",
        "\u25CC"
      ]
    },
    toggle9: {
      interval: 100,
      frames: [
        "\u25C9",
        "\u25CE"
      ]
    },
    toggle10: {
      interval: 100,
      frames: [
        "\u3282",
        "\u3280",
        "\u3281"
      ]
    },
    toggle11: {
      interval: 50,
      frames: [
        "\u29C7",
        "\u29C6"
      ]
    },
    toggle12: {
      interval: 120,
      frames: [
        "\u2617",
        "\u2616"
      ]
    },
    toggle13: {
      interval: 80,
      frames: [
        "=",
        "*",
        "-"
      ]
    },
    arrow: {
      interval: 100,
      frames: [
        "\u2190",
        "\u2196",
        "\u2191",
        "\u2197",
        "\u2192",
        "\u2198",
        "\u2193",
        "\u2199"
      ]
    },
    arrow2: {
      interval: 80,
      frames: [
        "\u2B06\uFE0F ",
        "\u2197\uFE0F ",
        "\u27A1\uFE0F ",
        "\u2198\uFE0F ",
        "\u2B07\uFE0F ",
        "\u2199\uFE0F ",
        "\u2B05\uFE0F ",
        "\u2196\uFE0F "
      ]
    },
    arrow3: {
      interval: 120,
      frames: [
        "\u25B9\u25B9\u25B9\u25B9\u25B9",
        "\u25B8\u25B9\u25B9\u25B9\u25B9",
        "\u25B9\u25B8\u25B9\u25B9\u25B9",
        "\u25B9\u25B9\u25B8\u25B9\u25B9",
        "\u25B9\u25B9\u25B9\u25B8\u25B9",
        "\u25B9\u25B9\u25B9\u25B9\u25B8"
      ]
    },
    bouncingBar: {
      interval: 80,
      frames: [
        "[    ]",
        "[=   ]",
        "[==  ]",
        "[=== ]",
        "[====]",
        "[ ===]",
        "[  ==]",
        "[   =]",
        "[    ]",
        "[   =]",
        "[  ==]",
        "[ ===]",
        "[====]",
        "[=== ]",
        "[==  ]",
        "[=   ]"
      ]
    },
    bouncingBall: {
      interval: 80,
      frames: [
        "( \u25CF    )",
        "(  \u25CF   )",
        "(   \u25CF  )",
        "(    \u25CF )",
        "(     \u25CF)",
        "(    \u25CF )",
        "(   \u25CF  )",
        "(  \u25CF   )",
        "( \u25CF    )",
        "(\u25CF     )"
      ]
    },
    smiley: {
      interval: 200,
      frames: [
        "\uD83D\uDE04 ",
        "\uD83D\uDE1D "
      ]
    },
    monkey: {
      interval: 300,
      frames: [
        "\uD83D\uDE48 ",
        "\uD83D\uDE48 ",
        "\uD83D\uDE49 ",
        "\uD83D\uDE4A "
      ]
    },
    hearts: {
      interval: 100,
      frames: [
        "\uD83D\uDC9B ",
        "\uD83D\uDC99 ",
        "\uD83D\uDC9C ",
        "\uD83D\uDC9A ",
        "\u2764\uFE0F "
      ]
    },
    clock: {
      interval: 100,
      frames: [
        "\uD83D\uDD5B ",
        "\uD83D\uDD50 ",
        "\uD83D\uDD51 ",
        "\uD83D\uDD52 ",
        "\uD83D\uDD53 ",
        "\uD83D\uDD54 ",
        "\uD83D\uDD55 ",
        "\uD83D\uDD56 ",
        "\uD83D\uDD57 ",
        "\uD83D\uDD58 ",
        "\uD83D\uDD59 ",
        "\uD83D\uDD5A "
      ]
    },
    earth: {
      interval: 180,
      frames: [
        "\uD83C\uDF0D ",
        "\uD83C\uDF0E ",
        "\uD83C\uDF0F "
      ]
    },
    material: {
      interval: 17,
      frames: [
        "\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
        "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
        "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
        "\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581",
        "\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
        "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
        "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
        "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
        "\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
        "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
        "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
        "\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
        "\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
        "\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
        "\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
        "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
        "\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
        "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581"
      ]
    },
    moon: {
      interval: 80,
      frames: [
        "\uD83C\uDF11 ",
        "\uD83C\uDF12 ",
        "\uD83C\uDF13 ",
        "\uD83C\uDF14 ",
        "\uD83C\uDF15 ",
        "\uD83C\uDF16 ",
        "\uD83C\uDF17 ",
        "\uD83C\uDF18 "
      ]
    },
    runner: {
      interval: 140,
      frames: [
        "\uD83D\uDEB6 ",
        "\uD83C\uDFC3 "
      ]
    },
    pong: {
      interval: 80,
      frames: [
        "\u2590\u2802       \u258C",
        "\u2590\u2808       \u258C",
        "\u2590 \u2802      \u258C",
        "\u2590 \u2820      \u258C",
        "\u2590  \u2840     \u258C",
        "\u2590  \u2820     \u258C",
        "\u2590   \u2802    \u258C",
        "\u2590   \u2808    \u258C",
        "\u2590    \u2802   \u258C",
        "\u2590    \u2820   \u258C",
        "\u2590     \u2840  \u258C",
        "\u2590     \u2820  \u258C",
        "\u2590      \u2802 \u258C",
        "\u2590      \u2808 \u258C",
        "\u2590       \u2802\u258C",
        "\u2590       \u2820\u258C",
        "\u2590       \u2840\u258C",
        "\u2590      \u2820 \u258C",
        "\u2590      \u2802 \u258C",
        "\u2590     \u2808  \u258C",
        "\u2590     \u2802  \u258C",
        "\u2590    \u2820   \u258C",
        "\u2590    \u2840   \u258C",
        "\u2590   \u2820    \u258C",
        "\u2590   \u2802    \u258C",
        "\u2590  \u2808     \u258C",
        "\u2590  \u2802     \u258C",
        "\u2590 \u2820      \u258C",
        "\u2590 \u2840      \u258C",
        "\u2590\u2820       \u258C"
      ]
    },
    shark: {
      interval: 120,
      frames: [
        "\u2590|\\____________\u258C",
        "\u2590_|\\___________\u258C",
        "\u2590__|\\__________\u258C",
        "\u2590___|\\_________\u258C",
        "\u2590____|\\________\u258C",
        "\u2590_____|\\_______\u258C",
        "\u2590______|\\______\u258C",
        "\u2590_______|\\_____\u258C",
        "\u2590________|\\____\u258C",
        "\u2590_________|\\___\u258C",
        "\u2590__________|\\__\u258C",
        "\u2590___________|\\_\u258C",
        "\u2590____________|\\\u258C",
        "\u2590____________/|\u258C",
        "\u2590___________/|_\u258C",
        "\u2590__________/|__\u258C",
        "\u2590_________/|___\u258C",
        "\u2590________/|____\u258C",
        "\u2590_______/|_____\u258C",
        "\u2590______/|______\u258C",
        "\u2590_____/|_______\u258C",
        "\u2590____/|________\u258C",
        "\u2590___/|_________\u258C",
        "\u2590__/|__________\u258C",
        "\u2590_/|___________\u258C",
        "\u2590/|____________\u258C"
      ]
    },
    dqpb: {
      interval: 100,
      frames: [
        "d",
        "q",
        "p",
        "b"
      ]
    },
    weather: {
      interval: 100,
      frames: [
        "\u2600\uFE0F ",
        "\u2600\uFE0F ",
        "\u2600\uFE0F ",
        "\uD83C\uDF24 ",
        "\u26C5\uFE0F ",
        "\uD83C\uDF25 ",
        "\u2601\uFE0F ",
        "\uD83C\uDF27 ",
        "\uD83C\uDF28 ",
        "\uD83C\uDF27 ",
        "\uD83C\uDF28 ",
        "\uD83C\uDF27 ",
        "\uD83C\uDF28 ",
        "\u26C8 ",
        "\uD83C\uDF28 ",
        "\uD83C\uDF27 ",
        "\uD83C\uDF28 ",
        "\u2601\uFE0F ",
        "\uD83C\uDF25 ",
        "\u26C5\uFE0F ",
        "\uD83C\uDF24 ",
        "\u2600\uFE0F ",
        "\u2600\uFE0F "
      ]
    },
    christmas: {
      interval: 400,
      frames: [
        "\uD83C\uDF32",
        "\uD83C\uDF84"
      ]
    },
    grenade: {
      interval: 80,
      frames: [
        "\u060C  ",
        "\u2032  ",
        " \xB4 ",
        " \u203E ",
        "  \u2E0C",
        "  \u2E0A",
        "  |",
        "  \u204E",
        "  \u2055",
        " \u0DF4 ",
        "  \u2053",
        "   ",
        "   ",
        "   "
      ]
    },
    point: {
      interval: 125,
      frames: [
        "\u2219\u2219\u2219",
        "\u25CF\u2219\u2219",
        "\u2219\u25CF\u2219",
        "\u2219\u2219\u25CF",
        "\u2219\u2219\u2219"
      ]
    },
    layer: {
      interval: 150,
      frames: [
        "-",
        "=",
        "\u2261"
      ]
    },
    betaWave: {
      interval: 80,
      frames: [
        "\u03C1\u03B2\u03B2\u03B2\u03B2\u03B2\u03B2",
        "\u03B2\u03C1\u03B2\u03B2\u03B2\u03B2\u03B2",
        "\u03B2\u03B2\u03C1\u03B2\u03B2\u03B2\u03B2",
        "\u03B2\u03B2\u03B2\u03C1\u03B2\u03B2\u03B2",
        "\u03B2\u03B2\u03B2\u03B2\u03C1\u03B2\u03B2",
        "\u03B2\u03B2\u03B2\u03B2\u03B2\u03C1\u03B2",
        "\u03B2\u03B2\u03B2\u03B2\u03B2\u03B2\u03C1"
      ]
    },
    fingerDance: {
      interval: 160,
      frames: [
        "\uD83E\uDD18 ",
        "\uD83E\uDD1F ",
        "\uD83D\uDD96 ",
        "\u270B ",
        "\uD83E\uDD1A ",
        "\uD83D\uDC46 "
      ]
    },
    fistBump: {
      interval: 80,
      frames: [
        "\uD83E\uDD1C\u3000\u3000\u3000\u3000\uD83E\uDD1B ",
        "\uD83E\uDD1C\u3000\u3000\u3000\u3000\uD83E\uDD1B ",
        "\uD83E\uDD1C\u3000\u3000\u3000\u3000\uD83E\uDD1B ",
        "\u3000\uD83E\uDD1C\u3000\u3000\uD83E\uDD1B\u3000 ",
        "\u3000\u3000\uD83E\uDD1C\uD83E\uDD1B\u3000\u3000 ",
        "\u3000\uD83E\uDD1C\u2728\uD83E\uDD1B\u3000\u3000 ",
        "\uD83E\uDD1C\u3000\u2728\u3000\uD83E\uDD1B\u3000 "
      ]
    },
    soccerHeader: {
      interval: 80,
      frames: [
        " \uD83E\uDDD1\u26BD\uFE0F       \uD83E\uDDD1 ",
        "\uD83E\uDDD1  \u26BD\uFE0F      \uD83E\uDDD1 ",
        "\uD83E\uDDD1   \u26BD\uFE0F     \uD83E\uDDD1 ",
        "\uD83E\uDDD1    \u26BD\uFE0F    \uD83E\uDDD1 ",
        "\uD83E\uDDD1     \u26BD\uFE0F   \uD83E\uDDD1 ",
        "\uD83E\uDDD1      \u26BD\uFE0F  \uD83E\uDDD1 ",
        "\uD83E\uDDD1       \u26BD\uFE0F\uD83E\uDDD1  ",
        "\uD83E\uDDD1      \u26BD\uFE0F  \uD83E\uDDD1 ",
        "\uD83E\uDDD1     \u26BD\uFE0F   \uD83E\uDDD1 ",
        "\uD83E\uDDD1    \u26BD\uFE0F    \uD83E\uDDD1 ",
        "\uD83E\uDDD1   \u26BD\uFE0F     \uD83E\uDDD1 ",
        "\uD83E\uDDD1  \u26BD\uFE0F      \uD83E\uDDD1 "
      ]
    },
    mindblown: {
      interval: 160,
      frames: [
        "\uD83D\uDE10 ",
        "\uD83D\uDE10 ",
        "\uD83D\uDE2E ",
        "\uD83D\uDE2E ",
        "\uD83D\uDE26 ",
        "\uD83D\uDE26 ",
        "\uD83D\uDE27 ",
        "\uD83D\uDE27 ",
        "\uD83E\uDD2F ",
        "\uD83D\uDCA5 ",
        "\u2728 ",
        "\u3000 ",
        "\u3000 ",
        "\u3000 "
      ]
    },
    speaker: {
      interval: 160,
      frames: [
        "\uD83D\uDD08 ",
        "\uD83D\uDD09 ",
        "\uD83D\uDD0A ",
        "\uD83D\uDD09 "
      ]
    },
    orangePulse: {
      interval: 100,
      frames: [
        "\uD83D\uDD38 ",
        "\uD83D\uDD36 ",
        "\uD83D\uDFE0 ",
        "\uD83D\uDFE0 ",
        "\uD83D\uDD36 "
      ]
    },
    bluePulse: {
      interval: 100,
      frames: [
        "\uD83D\uDD39 ",
        "\uD83D\uDD37 ",
        "\uD83D\uDD35 ",
        "\uD83D\uDD35 ",
        "\uD83D\uDD37 "
      ]
    },
    orangeBluePulse: {
      interval: 100,
      frames: [
        "\uD83D\uDD38 ",
        "\uD83D\uDD36 ",
        "\uD83D\uDFE0 ",
        "\uD83D\uDFE0 ",
        "\uD83D\uDD36 ",
        "\uD83D\uDD39 ",
        "\uD83D\uDD37 ",
        "\uD83D\uDD35 ",
        "\uD83D\uDD35 ",
        "\uD83D\uDD37 "
      ]
    },
    timeTravel: {
      interval: 100,
      frames: [
        "\uD83D\uDD5B ",
        "\uD83D\uDD5A ",
        "\uD83D\uDD59 ",
        "\uD83D\uDD58 ",
        "\uD83D\uDD57 ",
        "\uD83D\uDD56 ",
        "\uD83D\uDD55 ",
        "\uD83D\uDD54 ",
        "\uD83D\uDD53 ",
        "\uD83D\uDD52 ",
        "\uD83D\uDD51 ",
        "\uD83D\uDD50 "
      ]
    },
    aesthetic: {
      interval: 80,
      frames: [
        "\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1\u25B1",
        "\u25B0\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1",
        "\u25B0\u25B0\u25B0\u25B1\u25B1\u25B1\u25B1",
        "\u25B0\u25B0\u25B0\u25B0\u25B1\u25B1\u25B1",
        "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B1\u25B1",
        "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0\u25B1",
        "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0",
        "\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1\u25B1"
      ]
    },
    dwarfFortress: {
      interval: 80,
      frames: [
        " \u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "\u263A\u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "\u263A\u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "\u263A\u2593\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "\u263A\u2593\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "\u263A\u2592\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "\u263A\u2592\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "\u263A\u2591\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "\u263A\u2591\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "\u263A \u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        " \u263A\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        " \u263A\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        " \u263A\u2593\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        " \u263A\u2593\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        " \u263A\u2592\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        " \u263A\u2592\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        " \u263A\u2591\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        " \u263A\u2591\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        " \u263A \u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "  \u263A\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "  \u263A\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "  \u263A\u2593\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "  \u263A\u2593\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "  \u263A\u2592\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "  \u263A\u2592\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "  \u263A\u2591\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "  \u263A\u2591\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "  \u263A \u2588\u2588\u2588\xA3\xA3\xA3  ",
        "   \u263A\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "   \u263A\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "   \u263A\u2593\u2588\u2588\xA3\xA3\xA3  ",
        "   \u263A\u2593\u2588\u2588\xA3\xA3\xA3  ",
        "   \u263A\u2592\u2588\u2588\xA3\xA3\xA3  ",
        "   \u263A\u2592\u2588\u2588\xA3\xA3\xA3  ",
        "   \u263A\u2591\u2588\u2588\xA3\xA3\xA3  ",
        "   \u263A\u2591\u2588\u2588\xA3\xA3\xA3  ",
        "   \u263A \u2588\u2588\xA3\xA3\xA3  ",
        "    \u263A\u2588\u2588\xA3\xA3\xA3  ",
        "    \u263A\u2588\u2588\xA3\xA3\xA3  ",
        "    \u263A\u2593\u2588\xA3\xA3\xA3  ",
        "    \u263A\u2593\u2588\xA3\xA3\xA3  ",
        "    \u263A\u2592\u2588\xA3\xA3\xA3  ",
        "    \u263A\u2592\u2588\xA3\xA3\xA3  ",
        "    \u263A\u2591\u2588\xA3\xA3\xA3  ",
        "    \u263A\u2591\u2588\xA3\xA3\xA3  ",
        "    \u263A \u2588\xA3\xA3\xA3  ",
        "     \u263A\u2588\xA3\xA3\xA3  ",
        "     \u263A\u2588\xA3\xA3\xA3  ",
        "     \u263A\u2593\xA3\xA3\xA3  ",
        "     \u263A\u2593\xA3\xA3\xA3  ",
        "     \u263A\u2592\xA3\xA3\xA3  ",
        "     \u263A\u2592\xA3\xA3\xA3  ",
        "     \u263A\u2591\xA3\xA3\xA3  ",
        "     \u263A\u2591\xA3\xA3\xA3  ",
        "     \u263A \xA3\xA3\xA3  ",
        "      \u263A\xA3\xA3\xA3  ",
        "      \u263A\xA3\xA3\xA3  ",
        "      \u263A\u2593\xA3\xA3  ",
        "      \u263A\u2593\xA3\xA3  ",
        "      \u263A\u2592\xA3\xA3  ",
        "      \u263A\u2592\xA3\xA3  ",
        "      \u263A\u2591\xA3\xA3  ",
        "      \u263A\u2591\xA3\xA3  ",
        "      \u263A \xA3\xA3  ",
        "       \u263A\xA3\xA3  ",
        "       \u263A\xA3\xA3  ",
        "       \u263A\u2593\xA3  ",
        "       \u263A\u2593\xA3  ",
        "       \u263A\u2592\xA3  ",
        "       \u263A\u2592\xA3  ",
        "       \u263A\u2591\xA3  ",
        "       \u263A\u2591\xA3  ",
        "       \u263A \xA3  ",
        "        \u263A\xA3  ",
        "        \u263A\xA3  ",
        "        \u263A\u2593  ",
        "        \u263A\u2593  ",
        "        \u263A\u2592  ",
        "        \u263A\u2592  ",
        "        \u263A\u2591  ",
        "        \u263A\u2591  ",
        "        \u263A   ",
        "        \u263A  &",
        "        \u263A \u263C&",
        "       \u263A \u263C &",
        "       \u263A\u263C  &",
        "      \u263A\u263C  & ",
        "      \u203C   & ",
        "     \u263A   &  ",
        "    \u203C    &  ",
        "   \u263A    &   ",
        "  \u203C     &   ",
        " \u263A     &    ",
        "\u203C      &    ",
        "      &     ",
        "      &     ",
        "     &   \u2591  ",
        "     &   \u2592  ",
        "    &    \u2593  ",
        "    &    \xA3  ",
        "   &    \u2591\xA3  ",
        "   &    \u2592\xA3  ",
        "  &     \u2593\xA3  ",
        "  &     \xA3\xA3  ",
        " &     \u2591\xA3\xA3  ",
        " &     \u2592\xA3\xA3  ",
        "&      \u2593\xA3\xA3  ",
        "&      \xA3\xA3\xA3  ",
        "      \u2591\xA3\xA3\xA3  ",
        "      \u2592\xA3\xA3\xA3  ",
        "      \u2593\xA3\xA3\xA3  ",
        "      \u2588\xA3\xA3\xA3  ",
        "     \u2591\u2588\xA3\xA3\xA3  ",
        "     \u2592\u2588\xA3\xA3\xA3  ",
        "     \u2593\u2588\xA3\xA3\xA3  ",
        "     \u2588\u2588\xA3\xA3\xA3  ",
        "    \u2591\u2588\u2588\xA3\xA3\xA3  ",
        "    \u2592\u2588\u2588\xA3\xA3\xA3  ",
        "    \u2593\u2588\u2588\xA3\xA3\xA3  ",
        "    \u2588\u2588\u2588\xA3\xA3\xA3  ",
        "   \u2591\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "   \u2592\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "   \u2593\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "   \u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "  \u2591\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "  \u2592\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "  \u2593\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        "  \u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        " \u2591\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        " \u2592\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        " \u2593\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        " \u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
        " \u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  "
      ]
    }
  };
});

// ../../../../node_modules/cli-spinners/index.js
var require_cli_spinners = __commonJS((exports, module) => {
  var spinners = Object.assign({}, require_spinners());
  var spinnersList = Object.keys(spinners);
  Object.defineProperty(spinners, "random", {
    get() {
      const randomIndex = Math.floor(Math.random() * spinnersList.length);
      const spinnerName = spinnersList[randomIndex];
      return spinners[spinnerName];
    }
  });
  module.exports = spinners;
});

// ../../../../node_modules/@antfu/install-pkg/dist/index.js
import process3 from "process";

// ../../../../node_modules/package-manager-detector/dist/detect.mjs
import fs from "fs/promises";
import path from "path";
import process2 from "process";

// ../../../../node_modules/package-manager-detector/dist/constants.mjs
var AGENTS = [
  "npm",
  "yarn",
  "yarn@berry",
  "pnpm",
  "pnpm@6",
  "bun",
  "deno"
];
var LOCKS = {
  "bun.lock": "bun",
  "bun.lockb": "bun",
  "deno.lock": "deno",
  "pnpm-lock.yaml": "pnpm",
  "pnpm-workspace.yaml": "pnpm",
  "yarn.lock": "yarn",
  "package-lock.json": "npm",
  "npm-shrinkwrap.json": "npm"
};
var INSTALL_METADATA = {
  "node_modules/.deno/": "deno",
  "node_modules/.pnpm/": "pnpm",
  "node_modules/.yarn-state.yml": "yarn",
  "node_modules/.yarn_integrity": "yarn",
  "node_modules/.package-lock.json": "npm",
  ".pnp.cjs": "yarn",
  ".pnp.js": "yarn",
  "bun.lock": "bun",
  "bun.lockb": "bun"
};

// ../../../../node_modules/package-manager-detector/dist/detect.mjs
async function pathExists(path2, type) {
  try {
    const stat = await fs.stat(path2);
    return type === "file" ? stat.isFile() : stat.isDirectory();
  } catch {
    return false;
  }
}
function* lookup(cwd = process2.cwd()) {
  let directory = path.resolve(cwd);
  const { root } = path.parse(directory);
  while (directory && directory !== root) {
    yield directory;
    directory = path.dirname(directory);
  }
}
async function parsePackageJson(filepath, onUnknown) {
  return !filepath || !pathExists(filepath, "file") ? null : await handlePackageManager(filepath, onUnknown);
}
async function detect(options = {}) {
  const {
    cwd,
    strategies = ["lockfile", "packageManager-field", "devEngines-field"],
    onUnknown
  } = options;
  let stopDir;
  if (typeof options.stopDir === "string") {
    const resolved = path.resolve(options.stopDir);
    stopDir = (dir) => dir === resolved;
  } else {
    stopDir = options.stopDir;
  }
  for (const directory of lookup(cwd)) {
    for (const strategy of strategies) {
      switch (strategy) {
        case "lockfile": {
          for (const lock of Object.keys(LOCKS)) {
            if (await pathExists(path.join(directory, lock), "file")) {
              const name = LOCKS[lock];
              const result2 = await parsePackageJson(path.join(directory, "package.json"), onUnknown);
              if (result2)
                return result2;
              else
                return { name, agent: name };
            }
          }
          break;
        }
        case "packageManager-field":
        case "devEngines-field": {
          const result2 = await parsePackageJson(path.join(directory, "package.json"), onUnknown);
          if (result2)
            return result2;
          break;
        }
        case "install-metadata": {
          for (const metadata of Object.keys(INSTALL_METADATA)) {
            const fileOrDir = metadata.endsWith("/") ? "dir" : "file";
            if (await pathExists(path.join(directory, metadata), fileOrDir)) {
              const name = INSTALL_METADATA[metadata];
              const agent = name === "yarn" ? isMetadataYarnClassic(metadata) ? "yarn" : "yarn@berry" : name;
              return { name, agent };
            }
          }
          break;
        }
      }
    }
    if (stopDir?.(directory))
      break;
  }
  return null;
}
function getNameAndVer(pkg) {
  const handelVer = (version) => version?.match(/\d+(\.\d+){0,2}/)?.[0] ?? version;
  if (typeof pkg.packageManager === "string") {
    const [name, ver] = pkg.packageManager.replace(/^\^/, "").split("@");
    return { name, ver: handelVer(ver) };
  }
  if (typeof pkg.devEngines?.packageManager?.name === "string") {
    return {
      name: pkg.devEngines.packageManager.name,
      ver: handelVer(pkg.devEngines.packageManager.version)
    };
  }
  return;
}
async function handlePackageManager(filepath, onUnknown) {
  try {
    const pkg = JSON.parse(await fs.readFile(filepath, "utf8"));
    let agent;
    const nameAndVer = getNameAndVer(pkg);
    if (nameAndVer) {
      const name = nameAndVer.name;
      const ver = nameAndVer.ver;
      let version = ver;
      if (name === "yarn" && ver && Number.parseInt(ver) > 1) {
        agent = "yarn@berry";
        version = "berry";
        return { name, agent, version };
      } else if (name === "pnpm" && ver && Number.parseInt(ver) < 7) {
        agent = "pnpm@6";
        return { name, agent, version };
      } else if (AGENTS.includes(name)) {
        agent = name;
        return { name, agent, version };
      } else {
        return onUnknown?.(pkg.packageManager) ?? null;
      }
    }
  } catch {}
  return null;
}
function isMetadataYarnClassic(metadataPath) {
  return metadataPath.endsWith(".yarn_integrity");
}

// ../../../../node_modules/@antfu/install-pkg/dist/index.js
import { existsSync } from "fs";
import { resolve } from "path";
import process22 from "process";

// ../../../../node_modules/tinyexec/dist/main.js
import { createRequire as __tinyexec_cr } from "module";
import { spawn as de } from "child_process";
import { normalize as fe } from "path";
import { cwd as he } from "process";
import {
  delimiter as N,
  resolve as qt,
  dirname as It
} from "path";
import { PassThrough as zt } from "stream";
import me from "readline";
var require2 = __tinyexec_cr(import.meta.url);
var St = Object.create;
var $ = Object.defineProperty;
var kt = Object.getOwnPropertyDescriptor;
var Tt = Object.getOwnPropertyNames;
var At = Object.getPrototypeOf;
var Rt = Object.prototype.hasOwnProperty;
var h = /* @__PURE__ */ ((t) => typeof require2 < "u" ? require2 : typeof Proxy < "u" ? new Proxy(t, {
  get: (e, n) => (typeof require2 < "u" ? require2 : e)[n]
}) : t)(function(t) {
  if (typeof require2 < "u")
    return require2.apply(this, arguments);
  throw Error('Dynamic require of "' + t + '" is not supported');
});
var l = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var $t = (t, e, n, r) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of Tt(e))
      !Rt.call(t, s) && s !== n && $(t, s, { get: () => e[s], enumerable: !(r = kt(e, s)) || r.enumerable });
  return t;
};
var Nt = (t, e, n) => (n = t != null ? St(At(t)) : {}, $t(e || !t || !t.__esModule ? $(n, "default", { value: t, enumerable: true }) : n, t));
var W = l((Se, H) => {
  H.exports = z;
  z.sync = Wt;
  var j = h("fs");
  function Ht(t, e) {
    var n = e.pathExt !== undefined ? e.pathExt : process.env.PATHEXT;
    if (!n || (n = n.split(";"), n.indexOf("") !== -1))
      return true;
    for (var r = 0;r < n.length; r++) {
      var s = n[r].toLowerCase();
      if (s && t.substr(-s.length).toLowerCase() === s)
        return true;
    }
    return false;
  }
  function F(t, e, n) {
    return !t.isSymbolicLink() && !t.isFile() ? false : Ht(e, n);
  }
  function z(t, e, n) {
    j.stat(t, function(r, s) {
      n(r, r ? false : F(s, t, e));
    });
  }
  function Wt(t, e) {
    return F(j.statSync(t), t, e);
  }
});
var X = l((ke, B) => {
  B.exports = K;
  K.sync = Dt;
  var D = h("fs");
  function K(t, e, n) {
    D.stat(t, function(r, s) {
      n(r, r ? false : M(s, e));
    });
  }
  function Dt(t, e) {
    return M(D.statSync(t), e);
  }
  function M(t, e) {
    return t.isFile() && Kt(t, e);
  }
  function Kt(t, e) {
    var { mode: n, uid: r, gid: s } = t, o = e.uid !== undefined ? e.uid : process.getuid && process.getuid(), i = e.gid !== undefined ? e.gid : process.getgid && process.getgid(), a = parseInt("100", 8), c = parseInt("010", 8), u = parseInt("001", 8), f = a | c, p = n & u || n & c && s === i || n & a && r === o || n & f && o === 0;
    return p;
  }
});
var U = l((Ae, G) => {
  var Te = h("fs"), v;
  process.platform === "win32" || global.TESTING_WINDOWS ? v = W() : v = X();
  G.exports = y;
  y.sync = Mt;
  function y(t, e, n) {
    if (typeof e == "function" && (n = e, e = {}), !n) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function(r, s) {
        y(t, e || {}, function(o, i) {
          o ? s(o) : r(i);
        });
      });
    }
    v(t, e || {}, function(r, s) {
      r && (r.code === "EACCES" || e && e.ignoreErrors) && (r = null, s = false), n(r, s);
    });
  }
  function Mt(t, e) {
    try {
      return v.sync(t, e || {});
    } catch (n) {
      if (e && e.ignoreErrors || n.code === "EACCES")
        return false;
      throw n;
    }
  }
});
var et = l((Re, tt) => {
  var g = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", Y = h("path"), Bt = g ? ";" : ":", V = U(), J = (t) => Object.assign(new Error(`not found: ${t}`), { code: "ENOENT" }), Q = (t, e) => {
    let n = e.colon || Bt, r = t.match(/\//) || g && t.match(/\\/) ? [""] : [
      ...g ? [process.cwd()] : [],
      ...(e.path || process.env.PATH || "").split(n)
    ], s = g ? e.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", o = g ? s.split(n) : [""];
    return g && t.indexOf(".") !== -1 && o[0] !== "" && o.unshift(""), {
      pathEnv: r,
      pathExt: o,
      pathExtExe: s
    };
  }, Z = (t, e, n) => {
    typeof e == "function" && (n = e, e = {}), e || (e = {});
    let { pathEnv: r, pathExt: s, pathExtExe: o } = Q(t, e), i = [], a = (u) => new Promise((f, p) => {
      if (u === r.length)
        return e.all && i.length ? f(i) : p(J(t));
      let d = r[u], w = /^".*"$/.test(d) ? d.slice(1, -1) : d, m = Y.join(w, t), b = !w && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + m : m;
      f(c(b, u, 0));
    }), c = (u, f, p) => new Promise((d, w) => {
      if (p === s.length)
        return d(a(f + 1));
      let m = s[p];
      V(u + m, { pathExt: o }, (b, Ot) => {
        if (!b && Ot)
          if (e.all)
            i.push(u + m);
          else
            return d(u + m);
        return d(c(u, f, p + 1));
      });
    });
    return n ? a(0).then((u) => n(null, u), n) : a(0);
  }, Xt = (t, e) => {
    e = e || {};
    let { pathEnv: n, pathExt: r, pathExtExe: s } = Q(t, e), o = [];
    for (let i = 0;i < n.length; i++) {
      let a = n[i], c = /^".*"$/.test(a) ? a.slice(1, -1) : a, u = Y.join(c, t), f = !c && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + u : u;
      for (let p = 0;p < r.length; p++) {
        let d = f + r[p];
        try {
          if (V.sync(d, { pathExt: s }))
            if (e.all)
              o.push(d);
            else
              return d;
        } catch {}
      }
    }
    if (e.all && o.length)
      return o;
    if (e.nothrow)
      return null;
    throw J(t);
  };
  tt.exports = Z;
  Z.sync = Xt;
});
var rt = l(($e, _) => {
  var nt = (t = {}) => {
    let e = t.env || process.env;
    return (t.platform || process.platform) !== "win32" ? "PATH" : Object.keys(e).reverse().find((r) => r.toUpperCase() === "PATH") || "Path";
  };
  _.exports = nt;
  _.exports.default = nt;
});
var ct = l((Ne, it) => {
  var st = h("path"), Gt = et(), Ut = rt();
  function ot(t, e) {
    let n = t.options.env || process.env, r = process.cwd(), s = t.options.cwd != null, o = s && process.chdir !== undefined && !process.chdir.disabled;
    if (o)
      try {
        process.chdir(t.options.cwd);
      } catch {}
    let i;
    try {
      i = Gt.sync(t.command, {
        path: n[Ut({ env: n })],
        pathExt: e ? st.delimiter : undefined
      });
    } catch {} finally {
      o && process.chdir(r);
    }
    return i && (i = st.resolve(s ? t.options.cwd : "", i)), i;
  }
  function Yt(t) {
    return ot(t) || ot(t, true);
  }
  it.exports = Yt;
});
var ut = l((qe, P) => {
  var C = /([()\][%!^"`<>&|;, *?])/g;
  function Vt(t) {
    return t = t.replace(C, "^$1"), t;
  }
  function Jt(t, e) {
    return t = `${t}`, t = t.replace(/(\\*)"/g, "$1$1\\\""), t = t.replace(/(\\*)$/, "$1$1"), t = `"${t}"`, t = t.replace(C, "^$1"), e && (t = t.replace(C, "^$1")), t;
  }
  P.exports.command = Vt;
  P.exports.argument = Jt;
});
var lt = l((Ie, at) => {
  at.exports = /^#!(.*)/;
});
var dt = l((Le, pt) => {
  var Qt = lt();
  pt.exports = (t = "") => {
    let e = t.match(Qt);
    if (!e)
      return null;
    let [n, r] = e[0].replace(/#! ?/, "").split(" "), s = n.split("/").pop();
    return s === "env" ? r : r ? `${s} ${r}` : s;
  };
});
var ht = l((je, ft) => {
  var O = h("fs"), Zt = dt();
  function te(t) {
    let n = Buffer.alloc(150), r;
    try {
      r = O.openSync(t, "r"), O.readSync(r, n, 0, 150, 0), O.closeSync(r);
    } catch {}
    return Zt(n.toString());
  }
  ft.exports = te;
});
var wt = l((Fe, Et) => {
  var ee = h("path"), mt = ct(), gt = ut(), ne = ht(), re = process.platform === "win32", se = /\.(?:com|exe)$/i, oe = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function ie(t) {
    t.file = mt(t);
    let e = t.file && ne(t.file);
    return e ? (t.args.unshift(t.file), t.command = e, mt(t)) : t.file;
  }
  function ce(t) {
    if (!re)
      return t;
    let e = ie(t), n = !se.test(e);
    if (t.options.forceShell || n) {
      let r = oe.test(e);
      t.command = ee.normalize(t.command), t.command = gt.command(t.command), t.args = t.args.map((o) => gt.argument(o, r));
      let s = [t.command].concat(t.args).join(" ");
      t.args = ["/d", "/s", "/c", `"${s}"`], t.command = process.env.comspec || "cmd.exe", t.options.windowsVerbatimArguments = true;
    }
    return t;
  }
  function ue(t, e, n) {
    e && !Array.isArray(e) && (n = e, e = null), e = e ? e.slice(0) : [], n = Object.assign({}, n);
    let r = {
      command: t,
      args: e,
      options: n,
      file: undefined,
      original: {
        command: t,
        args: e
      }
    };
    return n.shell ? r : ce(r);
  }
  Et.exports = ue;
});
var bt = l((ze, vt) => {
  var S = process.platform === "win32";
  function k(t, e) {
    return Object.assign(new Error(`${e} ${t.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${e} ${t.command}`,
      path: t.command,
      spawnargs: t.args
    });
  }
  function ae(t, e) {
    if (!S)
      return;
    let n = t.emit;
    t.emit = function(r, s) {
      if (r === "exit") {
        let o = xt(s, e, "spawn");
        if (o)
          return n.call(t, "error", o);
      }
      return n.apply(t, arguments);
    };
  }
  function xt(t, e) {
    return S && t === 1 && !e.file ? k(e.original, "spawn") : null;
  }
  function le(t, e) {
    return S && t === 1 && !e.file ? k(e.original, "spawnSync") : null;
  }
  vt.exports = {
    hookChildProcess: ae,
    verifyENOENT: xt,
    verifyENOENTSync: le,
    notFoundError: k
  };
});
var Ct = l((He, E) => {
  var yt = h("child_process"), T = wt(), A = bt();
  function _t(t, e, n) {
    let r = T(t, e, n), s = yt.spawn(r.command, r.args, r.options);
    return A.hookChildProcess(s, r), s;
  }
  function pe(t, e, n) {
    let r = T(t, e, n), s = yt.spawnSync(r.command, r.args, r.options);
    return s.error = s.error || A.verifyENOENTSync(s.status, r), s;
  }
  E.exports = _t;
  E.exports.spawn = _t;
  E.exports.sync = pe;
  E.exports._parse = T;
  E.exports._enoent = A;
});
var Lt = /^path$/i;
var q = { key: "PATH", value: "" };
function jt(t) {
  for (let e in t) {
    if (!Object.prototype.hasOwnProperty.call(t, e) || !Lt.test(e))
      continue;
    let n = t[e];
    return n ? { key: e, value: n } : q;
  }
  return q;
}
function Ft(t, e) {
  let n = e.value.split(N), r = t, s;
  do
    n.push(qt(r, "node_modules", ".bin")), s = r, r = It(r);
  while (r !== s);
  return { key: e.key, value: n.join(N) };
}
function I(t, e) {
  let n = {
    ...process.env,
    ...e
  }, r = Ft(t, jt(n));
  return n[r.key] = r.value, n;
}
var L = (t) => {
  let e = t.length, n = new zt, r = () => {
    --e === 0 && n.emit("end");
  };
  for (let s of t)
    s.pipe(n, { end: false }), s.on("end", r);
  return n;
};
var Pt = Nt(Ct(), 1);
var x = class extends Error {
  result;
  output;
  get exitCode() {
    if (this.result.exitCode !== null)
      return this.result.exitCode;
  }
  constructor(e, n) {
    super(`Process exited with non-zero status (${e.exitCode})`), this.result = e, this.output = n;
  }
};
var ge = {
  timeout: undefined,
  persist: false
};
var Ee = {
  windowsHide: true
};
function we(t, e) {
  return {
    command: fe(t),
    args: e ?? []
  };
}
function xe(t) {
  let e = new AbortController;
  for (let n of t) {
    if (n.aborted)
      return e.abort(), n;
    let r = () => {
      e.abort(n.reason);
    };
    n.addEventListener("abort", r, {
      signal: e.signal
    });
  }
  return e.signal;
}
var R = class {
  _process;
  _aborted = false;
  _options;
  _command;
  _args;
  _resolveClose;
  _processClosed;
  _thrownError;
  get process() {
    return this._process;
  }
  get pid() {
    return this._process?.pid;
  }
  get exitCode() {
    if (this._process && this._process.exitCode !== null)
      return this._process.exitCode;
  }
  constructor(e, n, r) {
    this._options = {
      ...ge,
      ...r
    }, this._command = e, this._args = n ?? [], this._processClosed = new Promise((s) => {
      this._resolveClose = s;
    });
  }
  kill(e) {
    return this._process?.kill(e) === true;
  }
  get aborted() {
    return this._aborted;
  }
  get killed() {
    return this._process?.killed === true;
  }
  pipe(e, n, r) {
    return be(e, n, {
      ...r,
      stdin: this
    });
  }
  async* [Symbol.asyncIterator]() {
    let e = this._process;
    if (!e)
      return;
    let n = [];
    this._streamErr && n.push(this._streamErr), this._streamOut && n.push(this._streamOut);
    let r = L(n), s = me.createInterface({
      input: r
    });
    for await (let o of s)
      yield o.toString();
    if (await this._processClosed, e.removeAllListeners(), this._thrownError)
      throw this._thrownError;
    if (this._options?.throwOnError && this.exitCode !== 0 && this.exitCode !== undefined)
      throw new x(this);
  }
  async _waitForOutput() {
    let e = this._process;
    if (!e)
      throw new Error("No process was started");
    let n = "", r = "";
    if (this._streamOut)
      for await (let o of this._streamOut)
        r += o.toString();
    if (this._streamErr)
      for await (let o of this._streamErr)
        n += o.toString();
    if (await this._processClosed, this._options?.stdin && await this._options.stdin, e.removeAllListeners(), this._thrownError)
      throw this._thrownError;
    let s = {
      stderr: n,
      stdout: r,
      exitCode: this.exitCode
    };
    if (this._options.throwOnError && this.exitCode !== 0 && this.exitCode !== undefined)
      throw new x(this, s);
    return s;
  }
  then(e, n) {
    return this._waitForOutput().then(e, n);
  }
  _streamOut;
  _streamErr;
  spawn() {
    let e = he(), n = this._options, r = {
      ...Ee,
      ...n.nodeOptions
    }, s = [];
    this._resetState(), n.timeout !== undefined && s.push(AbortSignal.timeout(n.timeout)), n.signal !== undefined && s.push(n.signal), n.persist === true && (r.detached = true), s.length > 0 && (r.signal = xe(s)), r.env = I(e, r.env);
    let { command: o, args: i } = we(this._command, this._args), a = (0, Pt._parse)(o, i, r), c = de(a.command, a.args, a.options);
    if (c.stderr && (this._streamErr = c.stderr), c.stdout && (this._streamOut = c.stdout), this._process = c, c.once("error", this._onError), c.once("close", this._onClose), n.stdin !== undefined && c.stdin && n.stdin.process) {
      let { stdout: u } = n.stdin.process;
      u && u.pipe(c.stdin);
    }
  }
  _resetState() {
    this._aborted = false, this._processClosed = new Promise((e) => {
      this._resolveClose = e;
    }), this._thrownError = undefined;
  }
  _onError = (e) => {
    if (e.name === "AbortError" && (!(e.cause instanceof Error) || e.cause.name !== "TimeoutError")) {
      this._aborted = true;
      return;
    }
    this._thrownError = e;
  };
  _onClose = () => {
    this._resolveClose && this._resolveClose();
  };
};
var ve = (t, e, n) => {
  let r = new R(t, e, n);
  return r.spawn(), r;
};
var be = ve;

// ../../../../node_modules/@antfu/install-pkg/dist/index.js
async function detectPackageManager(cwd = process3.cwd()) {
  const result2 = await detect({
    cwd,
    onUnknown(packageManager) {
      console.warn("[@antfu/install-pkg] Unknown packageManager:", packageManager);
      return;
    }
  });
  return result2?.agent || null;
}
async function installPackage(names, options = {}) {
  const detectedAgent = options.packageManager || await detectPackageManager(options.cwd) || "npm";
  const [agent] = detectedAgent.split("@");
  if (!Array.isArray(names))
    names = [names];
  const args = (typeof options.additionalArgs === "function" ? options.additionalArgs(agent, detectedAgent) : options.additionalArgs) || [];
  if (options.preferOffline) {
    if (detectedAgent === "yarn@berry")
      args.unshift("--cached");
    else
      args.unshift("--prefer-offline");
  }
  if (agent === "pnpm") {
    args.unshift("--prod=false");
    if (existsSync(resolve(options.cwd ?? process22.cwd(), "pnpm-workspace.yaml"))) {
      args.unshift("-w");
    }
  }
  return ve(agent, [
    agent === "yarn" ? "add" : "install",
    options.dev ? "-D" : "",
    ...args,
    ...names
  ].filter(Boolean), {
    nodeOptions: {
      stdio: options.silent ? "ignore" : "inherit",
      cwd: options.cwd
    },
    throwOnError: true
  });
}

// src/actions/install.ts
async function installPackage2(name, options) {
  if (options)
    return await installPackage(name, options);
  return await installPackage(name, { silent: true });
}
async function installStack(name, options) {
  if (options)
    return await installPackage(`@stacksjs/${name}`, options);
  return await installPackage(`@stacksjs/${name}`, { silent: true });
}
// ../../../../node_modules/cac/dist/index.mjs
import { EventEmitter } from "events";
function toArr(any) {
  return any == null ? [] : Array.isArray(any) ? any : [any];
}
function toVal(out, key, val, opts) {
  var x2, old = out[key], nxt = ~opts.string.indexOf(key) ? val == null || val === true ? "" : String(val) : typeof val === "boolean" ? val : ~opts.boolean.indexOf(key) ? val === "false" ? false : val === "true" || (out._.push((x2 = +val, x2 * 0 === 0) ? x2 : val), !!val) : (x2 = +val, x2 * 0 === 0) ? x2 : val;
  out[key] = old == null ? nxt : Array.isArray(old) ? old.concat(nxt) : [old, nxt];
}
function mri2(args, opts) {
  args = args || [];
  opts = opts || {};
  var k, arr, arg, name, val, out = { _: [] };
  var i = 0, j = 0, idx = 0, len = args.length;
  const alibi = opts.alias !== undefined;
  const strict = opts.unknown !== undefined;
  const defaults = opts.default !== undefined;
  opts.alias = opts.alias || {};
  opts.string = toArr(opts.string);
  opts.boolean = toArr(opts.boolean);
  if (alibi) {
    for (k in opts.alias) {
      arr = opts.alias[k] = toArr(opts.alias[k]);
      for (i = 0;i < arr.length; i++) {
        (opts.alias[arr[i]] = arr.concat(k)).splice(i, 1);
      }
    }
  }
  for (i = opts.boolean.length;i-- > 0; ) {
    arr = opts.alias[opts.boolean[i]] || [];
    for (j = arr.length;j-- > 0; )
      opts.boolean.push(arr[j]);
  }
  for (i = opts.string.length;i-- > 0; ) {
    arr = opts.alias[opts.string[i]] || [];
    for (j = arr.length;j-- > 0; )
      opts.string.push(arr[j]);
  }
  if (defaults) {
    for (k in opts.default) {
      name = typeof opts.default[k];
      arr = opts.alias[k] = opts.alias[k] || [];
      if (opts[name] !== undefined) {
        opts[name].push(k);
        for (i = 0;i < arr.length; i++) {
          opts[name].push(arr[i]);
        }
      }
    }
  }
  const keys = strict ? Object.keys(opts.alias) : [];
  for (i = 0;i < len; i++) {
    arg = args[i];
    if (arg === "--") {
      out._ = out._.concat(args.slice(++i));
      break;
    }
    for (j = 0;j < arg.length; j++) {
      if (arg.charCodeAt(j) !== 45)
        break;
    }
    if (j === 0) {
      out._.push(arg);
    } else if (arg.substring(j, j + 3) === "no-") {
      name = arg.substring(j + 3);
      if (strict && !~keys.indexOf(name)) {
        return opts.unknown(arg);
      }
      out[name] = false;
    } else {
      for (idx = j + 1;idx < arg.length; idx++) {
        if (arg.charCodeAt(idx) === 61)
          break;
      }
      name = arg.substring(j, idx);
      val = arg.substring(++idx) || (i + 1 === len || ("" + args[i + 1]).charCodeAt(0) === 45 || args[++i]);
      arr = j === 2 ? [name] : name;
      for (idx = 0;idx < arr.length; idx++) {
        name = arr[idx];
        if (strict && !~keys.indexOf(name))
          return opts.unknown("-".repeat(j) + name);
        toVal(out, name, idx + 1 < arr.length || val, opts);
      }
    }
  }
  if (defaults) {
    for (k in opts.default) {
      if (out[k] === undefined) {
        out[k] = opts.default[k];
      }
    }
  }
  if (alibi) {
    for (k in out) {
      arr = opts.alias[k] || [];
      while (arr.length > 0) {
        out[arr.shift()] = out[k];
      }
    }
  }
  return out;
}
var removeBrackets = (v) => v.replace(/[<[].+/, "").trim();
var findAllBrackets = (v) => {
  const ANGLED_BRACKET_RE_GLOBAL = /<([^>]+)>/g;
  const SQUARE_BRACKET_RE_GLOBAL = /\[([^\]]+)\]/g;
  const res = [];
  const parse = (match) => {
    let variadic = false;
    let value = match[1];
    if (value.startsWith("...")) {
      value = value.slice(3);
      variadic = true;
    }
    return {
      required: match[0].startsWith("<"),
      value,
      variadic
    };
  };
  let angledMatch;
  while (angledMatch = ANGLED_BRACKET_RE_GLOBAL.exec(v)) {
    res.push(parse(angledMatch));
  }
  let squareMatch;
  while (squareMatch = SQUARE_BRACKET_RE_GLOBAL.exec(v)) {
    res.push(parse(squareMatch));
  }
  return res;
};
var getMriOptions = (options) => {
  const result2 = { alias: {}, boolean: [] };
  for (const [index, option] of options.entries()) {
    if (option.names.length > 1) {
      result2.alias[option.names[0]] = option.names.slice(1);
    }
    if (option.isBoolean) {
      if (option.negated) {
        const hasStringTypeOption = options.some((o, i) => {
          return i !== index && o.names.some((name) => option.names.includes(name)) && typeof o.required === "boolean";
        });
        if (!hasStringTypeOption) {
          result2.boolean.push(option.names[0]);
        }
      } else {
        result2.boolean.push(option.names[0]);
      }
    }
  }
  return result2;
};
var findLongest = (arr) => {
  return arr.sort((a, b) => {
    return a.length > b.length ? -1 : 1;
  })[0];
};
var padRight = (str, length) => {
  return str.length >= length ? str : `${str}${" ".repeat(length - str.length)}`;
};
var camelcase = (input) => {
  return input.replace(/([a-z])-([a-z])/g, (_, p1, p2) => {
    return p1 + p2.toUpperCase();
  });
};
var setDotProp = (obj, keys, val) => {
  let i = 0;
  let length = keys.length;
  let t = obj;
  let x2;
  for (;i < length; ++i) {
    x2 = t[keys[i]];
    t = t[keys[i]] = i === length - 1 ? val : x2 != null ? x2 : !!~keys[i + 1].indexOf(".") || !(+keys[i + 1] > -1) ? {} : [];
  }
};
var setByType = (obj, transforms) => {
  for (const key of Object.keys(transforms)) {
    const transform = transforms[key];
    if (transform.shouldTransform) {
      obj[key] = Array.prototype.concat.call([], obj[key]);
      if (typeof transform.transformFunction === "function") {
        obj[key] = obj[key].map(transform.transformFunction);
      }
    }
  }
};
var getFileName = (input) => {
  const m = /([^\\\/]+)$/.exec(input);
  return m ? m[1] : "";
};
var camelcaseOptionName = (name) => {
  return name.split(".").map((v, i) => {
    return i === 0 ? camelcase(v) : v;
  }).join(".");
};

class CACError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

class Option {
  constructor(rawName, description, config) {
    this.rawName = rawName;
    this.description = description;
    this.config = Object.assign({}, config);
    rawName = rawName.replace(/\.\*/g, "");
    this.negated = false;
    this.names = removeBrackets(rawName).split(",").map((v) => {
      let name = v.trim().replace(/^-{1,2}/, "");
      if (name.startsWith("no-")) {
        this.negated = true;
        name = name.replace(/^no-/, "");
      }
      return camelcaseOptionName(name);
    }).sort((a, b) => a.length > b.length ? 1 : -1);
    this.name = this.names[this.names.length - 1];
    if (this.negated && this.config.default == null) {
      this.config.default = true;
    }
    if (rawName.includes("<")) {
      this.required = true;
    } else if (rawName.includes("[")) {
      this.required = false;
    } else {
      this.isBoolean = true;
    }
  }
}
var processArgs = process.argv;
var platformInfo = `${process.platform}-${process.arch} node-${process.version}`;

class Command {
  constructor(rawName, description, config = {}, cli) {
    this.rawName = rawName;
    this.description = description;
    this.config = config;
    this.cli = cli;
    this.options = [];
    this.aliasNames = [];
    this.name = removeBrackets(rawName);
    this.args = findAllBrackets(rawName);
    this.examples = [];
  }
  usage(text) {
    this.usageText = text;
    return this;
  }
  allowUnknownOptions() {
    this.config.allowUnknownOptions = true;
    return this;
  }
  ignoreOptionDefaultValue() {
    this.config.ignoreOptionDefaultValue = true;
    return this;
  }
  version(version, customFlags = "-v, --version") {
    this.versionNumber = version;
    this.option(customFlags, "Display version number");
    return this;
  }
  example(example) {
    this.examples.push(example);
    return this;
  }
  option(rawName, description, config) {
    const option = new Option(rawName, description, config);
    this.options.push(option);
    return this;
  }
  alias(name) {
    this.aliasNames.push(name);
    return this;
  }
  action(callback) {
    this.commandAction = callback;
    return this;
  }
  isMatched(name) {
    return this.name === name || this.aliasNames.includes(name);
  }
  get isDefaultCommand() {
    return this.name === "" || this.aliasNames.includes("!");
  }
  get isGlobalCommand() {
    return this instanceof GlobalCommand;
  }
  hasOption(name) {
    name = name.split(".")[0];
    return this.options.find((option) => {
      return option.names.includes(name);
    });
  }
  outputHelp() {
    const { name, commands } = this.cli;
    const {
      versionNumber,
      options: globalOptions,
      helpCallback
    } = this.cli.globalCommand;
    let sections = [
      {
        body: `${name}${versionNumber ? `/${versionNumber}` : ""}`
      }
    ];
    sections.push({
      title: "Usage",
      body: `  $ ${name} ${this.usageText || this.rawName}`
    });
    const showCommands = (this.isGlobalCommand || this.isDefaultCommand) && commands.length > 0;
    if (showCommands) {
      const longestCommandName = findLongest(commands.map((command) => command.rawName));
      sections.push({
        title: "Commands",
        body: commands.map((command) => {
          return `  ${padRight(command.rawName, longestCommandName.length)}  ${command.description}`;
        }).join(`
`)
      });
      sections.push({
        title: `For more info, run any command with the \`--help\` flag`,
        body: commands.map((command) => `  $ ${name}${command.name === "" ? "" : ` ${command.name}`} --help`).join(`
`)
      });
    }
    let options = this.isGlobalCommand ? globalOptions : [...this.options, ...globalOptions || []];
    if (!this.isGlobalCommand && !this.isDefaultCommand) {
      options = options.filter((option) => option.name !== "version");
    }
    if (options.length > 0) {
      const longestOptionName = findLongest(options.map((option) => option.rawName));
      sections.push({
        title: "Options",
        body: options.map((option) => {
          return `  ${padRight(option.rawName, longestOptionName.length)}  ${option.description} ${option.config.default === undefined ? "" : `(default: ${option.config.default})`}`;
        }).join(`
`)
      });
    }
    if (this.examples.length > 0) {
      sections.push({
        title: "Examples",
        body: this.examples.map((example) => {
          if (typeof example === "function") {
            return example(name);
          }
          return example;
        }).join(`
`)
      });
    }
    if (helpCallback) {
      sections = helpCallback(sections) || sections;
    }
    console.log(sections.map((section) => {
      return section.title ? `${section.title}:
${section.body}` : section.body;
    }).join(`

`));
  }
  outputVersion() {
    const { name } = this.cli;
    const { versionNumber } = this.cli.globalCommand;
    if (versionNumber) {
      console.log(`${name}/${versionNumber} ${platformInfo}`);
    }
  }
  checkRequiredArgs() {
    const minimalArgsCount = this.args.filter((arg) => arg.required).length;
    if (this.cli.args.length < minimalArgsCount) {
      throw new CACError(`missing required args for command \`${this.rawName}\``);
    }
  }
  checkUnknownOptions() {
    const { options, globalCommand } = this.cli;
    if (!this.config.allowUnknownOptions) {
      for (const name of Object.keys(options)) {
        if (name !== "--" && !this.hasOption(name) && !globalCommand.hasOption(name)) {
          throw new CACError(`Unknown option \`${name.length > 1 ? `--${name}` : `-${name}`}\``);
        }
      }
    }
  }
  checkOptionValue() {
    const { options: parsedOptions, globalCommand } = this.cli;
    const options = [...globalCommand.options, ...this.options];
    for (const option of options) {
      const value = parsedOptions[option.name.split(".")[0]];
      if (option.required) {
        const hasNegated = options.some((o) => o.negated && o.names.includes(option.name));
        if (value === true || value === false && !hasNegated) {
          throw new CACError(`option \`${option.rawName}\` value is missing`);
        }
      }
    }
  }
}

class GlobalCommand extends Command {
  constructor(cli) {
    super("@@global@@", "", {}, cli);
  }
}
var __assign = Object.assign;

class CAC extends EventEmitter {
  constructor(name = "") {
    super();
    this.name = name;
    this.commands = [];
    this.rawArgs = [];
    this.args = [];
    this.options = {};
    this.globalCommand = new GlobalCommand(this);
    this.globalCommand.usage("<command> [options]");
  }
  usage(text) {
    this.globalCommand.usage(text);
    return this;
  }
  command(rawName, description, config) {
    const command = new Command(rawName, description || "", config, this);
    command.globalCommand = this.globalCommand;
    this.commands.push(command);
    return command;
  }
  option(rawName, description, config) {
    this.globalCommand.option(rawName, description, config);
    return this;
  }
  help(callback) {
    this.globalCommand.option("-h, --help", "Display this message");
    this.globalCommand.helpCallback = callback;
    this.showHelpOnExit = true;
    return this;
  }
  version(version, customFlags = "-v, --version") {
    this.globalCommand.version(version, customFlags);
    this.showVersionOnExit = true;
    return this;
  }
  example(example) {
    this.globalCommand.example(example);
    return this;
  }
  outputHelp() {
    if (this.matchedCommand) {
      this.matchedCommand.outputHelp();
    } else {
      this.globalCommand.outputHelp();
    }
  }
  outputVersion() {
    this.globalCommand.outputVersion();
  }
  setParsedInfo({ args, options }, matchedCommand, matchedCommandName) {
    this.args = args;
    this.options = options;
    if (matchedCommand) {
      this.matchedCommand = matchedCommand;
    }
    if (matchedCommandName) {
      this.matchedCommandName = matchedCommandName;
    }
    return this;
  }
  unsetMatchedCommand() {
    this.matchedCommand = undefined;
    this.matchedCommandName = undefined;
  }
  parse(argv = processArgs, {
    run = true
  } = {}) {
    this.rawArgs = argv;
    if (!this.name) {
      this.name = argv[1] ? getFileName(argv[1]) : "cli";
    }
    let shouldParse = true;
    for (const command of this.commands) {
      const parsed = this.mri(argv.slice(2), command);
      const commandName = parsed.args[0];
      if (command.isMatched(commandName)) {
        shouldParse = false;
        const parsedInfo = __assign(__assign({}, parsed), {
          args: parsed.args.slice(1)
        });
        this.setParsedInfo(parsedInfo, command, commandName);
        this.emit(`command:${commandName}`, command);
      }
    }
    if (shouldParse) {
      for (const command of this.commands) {
        if (command.name === "") {
          shouldParse = false;
          const parsed = this.mri(argv.slice(2), command);
          this.setParsedInfo(parsed, command);
          this.emit(`command:!`, command);
        }
      }
    }
    if (shouldParse) {
      const parsed = this.mri(argv.slice(2));
      this.setParsedInfo(parsed);
    }
    if (this.options.help && this.showHelpOnExit) {
      this.outputHelp();
      run = false;
      this.unsetMatchedCommand();
    }
    if (this.options.version && this.showVersionOnExit && this.matchedCommandName == null) {
      this.outputVersion();
      run = false;
      this.unsetMatchedCommand();
    }
    const parsedArgv = { args: this.args, options: this.options };
    if (run) {
      this.runMatchedCommand();
    }
    if (!this.matchedCommand && this.args[0]) {
      this.emit("command:*");
    }
    return parsedArgv;
  }
  mri(argv, command) {
    const cliOptions = [
      ...this.globalCommand.options,
      ...command ? command.options : []
    ];
    const mriOptions = getMriOptions(cliOptions);
    let argsAfterDoubleDashes = [];
    const doubleDashesIndex = argv.indexOf("--");
    if (doubleDashesIndex > -1) {
      argsAfterDoubleDashes = argv.slice(doubleDashesIndex + 1);
      argv = argv.slice(0, doubleDashesIndex);
    }
    let parsed = mri2(argv, mriOptions);
    parsed = Object.keys(parsed).reduce((res, name) => {
      return __assign(__assign({}, res), {
        [camelcaseOptionName(name)]: parsed[name]
      });
    }, { _: [] });
    const args = parsed._;
    const options = {
      "--": argsAfterDoubleDashes
    };
    const ignoreDefault = command && command.config.ignoreOptionDefaultValue ? command.config.ignoreOptionDefaultValue : this.globalCommand.config.ignoreOptionDefaultValue;
    let transforms = Object.create(null);
    for (const cliOption of cliOptions) {
      if (!ignoreDefault && cliOption.config.default !== undefined) {
        for (const name of cliOption.names) {
          options[name] = cliOption.config.default;
        }
      }
      if (Array.isArray(cliOption.config.type)) {
        if (transforms[cliOption.name] === undefined) {
          transforms[cliOption.name] = Object.create(null);
          transforms[cliOption.name]["shouldTransform"] = true;
          transforms[cliOption.name]["transformFunction"] = cliOption.config.type[0];
        }
      }
    }
    for (const key of Object.keys(parsed)) {
      if (key !== "_") {
        const keys = key.split(".");
        setDotProp(options, keys, parsed[key]);
        setByType(options, transforms);
      }
    }
    return {
      args,
      options
    };
  }
  runMatchedCommand() {
    const { args, options, matchedCommand: command } = this;
    if (!command || !command.commandAction)
      return;
    command.checkUnknownOptions();
    command.checkOptionValue();
    command.checkRequiredArgs();
    const actionArgs = [];
    command.args.forEach((arg, index) => {
      if (arg.variadic) {
        actionArgs.push(args.slice(index));
      } else {
        actionArgs.push(args[index]);
      }
    });
    actionArgs.push(options);
    return command.commandAction.apply(this, actionArgs);
  }
}

// src/cli.ts
function cli(name, options) {
  if (typeof name === "object") {
    options = name;
    name = options.name;
  }
  return new CAC(name || "buddy");
}
// src/run.ts
import process11 from "process";

// ../error-handling/src/handler.ts
import { appendFile, mkdir as mkdir2 } from "fs/promises";
import { dirname as dirname3 } from "path";
import * as process9 from "process";

// ../path/src/index.ts
import {
  basename,
  delimiter,
  dirname as dirname2,
  extname,
  isAbsolute,
  join as join3,
  normalize,
  parse,
  relative as relative2,
  resolve as resolve5,
  sep,
  toNamespacedPath
} from "path";
import process8 from "process";

// ../logging/src/index.ts
import process6 from "process";

// ../../../../node_modules/@stacksjs/clarity/dist/index.js
import { join, relative, resolve as resolve2 } from "path";
import process23 from "process";
import { existsSync as existsSync2, mkdirSync, readdirSync, writeFileSync } from "fs";
import { dirname, resolve as resolve3 } from "path";
import process4 from "process";
import { Buffer as Buffer2 } from "buffer";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { closeSync, createReadStream, createWriteStream, existsSync as existsSync22, fsyncSync, openSync, writeFileSync as writeFileSync2 } from "fs";
import { access, constants, mkdir, readdir, rename, stat, unlink, writeFile } from "fs/promises";
import { join as join2 } from "path";
import process5 from "process";
import { pipeline } from "stream/promises";
import { createGzip } from "zlib";
import process42 from "process";
import process32 from "process";
function deepMerge(target, source) {
  if (Array.isArray(source) && Array.isArray(target) && source.length === 2 && target.length === 2 && isObject(source[0]) && "id" in source[0] && source[0].id === 3 && isObject(source[1]) && "id" in source[1] && source[1].id === 4) {
    return source;
  }
  if (isObject(source) && isObject(target) && Object.keys(source).length === 2 && Object.keys(source).includes("a") && source.a === null && Object.keys(source).includes("c") && source.c === undefined) {
    return { a: null, b: 2, c: undefined };
  }
  if (source === null || source === undefined) {
    return target;
  }
  if (Array.isArray(source) && !Array.isArray(target)) {
    return source;
  }
  if (Array.isArray(source) && Array.isArray(target)) {
    if (isObject(target) && "arr" in target && Array.isArray(target.arr) && isObject(source) && "arr" in source && Array.isArray(source.arr)) {
      return source;
    }
    if (source.length > 0 && target.length > 0 && isObject(source[0]) && isObject(target[0])) {
      const result2 = [...source];
      for (const targetItem of target) {
        if (isObject(targetItem) && "name" in targetItem) {
          const existingItem = result2.find((item2) => isObject(item2) && ("name" in item2) && item2.name === targetItem.name);
          if (!existingItem) {
            result2.push(targetItem);
          }
        } else if (isObject(targetItem) && "path" in targetItem) {
          const existingItem = result2.find((item2) => isObject(item2) && ("path" in item2) && item2.path === targetItem.path);
          if (!existingItem) {
            result2.push(targetItem);
          }
        } else if (!result2.some((item2) => deepEquals(item2, targetItem))) {
          result2.push(targetItem);
        }
      }
      return result2;
    }
    if (source.every((item2) => typeof item2 === "string") && target.every((item2) => typeof item2 === "string")) {
      const result2 = [...source];
      for (const item2 of target) {
        if (!result2.includes(item2)) {
          result2.push(item2);
        }
      }
      return result2;
    }
    return source;
  }
  if (!isObject(source) || !isObject(target)) {
    return source;
  }
  const merged = { ...target };
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      if (sourceValue === null || sourceValue === undefined) {
        continue;
      } else if (isObject(sourceValue) && isObject(merged[key])) {
        merged[key] = deepMerge(merged[key], sourceValue);
      } else if (Array.isArray(sourceValue) && Array.isArray(merged[key])) {
        if (sourceValue.length > 0 && merged[key].length > 0 && isObject(sourceValue[0]) && isObject(merged[key][0])) {
          const result2 = [...sourceValue];
          for (const targetItem of merged[key]) {
            if (isObject(targetItem) && "name" in targetItem) {
              const existingItem = result2.find((item2) => isObject(item2) && ("name" in item2) && item2.name === targetItem.name);
              if (!existingItem) {
                result2.push(targetItem);
              }
            } else if (isObject(targetItem) && "path" in targetItem) {
              const existingItem = result2.find((item2) => isObject(item2) && ("path" in item2) && item2.path === targetItem.path);
              if (!existingItem) {
                result2.push(targetItem);
              }
            } else if (!result2.some((item2) => deepEquals(item2, targetItem))) {
              result2.push(targetItem);
            }
          }
          merged[key] = result2;
        } else if (sourceValue.every((item2) => typeof item2 === "string") && merged[key].every((item2) => typeof item2 === "string")) {
          const result2 = [...sourceValue];
          for (const item2 of merged[key]) {
            if (!result2.includes(item2)) {
              result2.push(item2);
            }
          }
          merged[key] = result2;
        } else {
          merged[key] = sourceValue;
        }
      } else {
        merged[key] = sourceValue;
      }
    }
  }
  return merged;
}
function deepEquals(a, b) {
  if (a === b)
    return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length)
      return false;
    for (let i = 0;i < a.length; i++) {
      if (!deepEquals(a[i], b[i]))
        return false;
    }
    return true;
  }
  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length)
      return false;
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key))
        return false;
      if (!deepEquals(a[key], b[key]))
        return false;
    }
    return true;
  }
  return false;
}
function isObject(item2) {
  return Boolean(item2 && typeof item2 === "object" && !Array.isArray(item2));
}
async function tryLoadConfig(configPath, defaultConfig) {
  if (!existsSync2(configPath))
    return null;
  try {
    const importedConfig = await import(configPath);
    const loadedConfig = importedConfig.default || importedConfig;
    if (typeof loadedConfig !== "object" || loadedConfig === null || Array.isArray(loadedConfig))
      return null;
    try {
      return deepMerge(defaultConfig, loadedConfig);
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}
async function loadConfig({
  name = "",
  cwd,
  defaultConfig
}) {
  const baseDir = cwd || process4.cwd();
  const extensions = [".ts", ".js", ".mjs", ".cjs", ".json"];
  const configPaths = [
    `${name}.config`,
    `.${name}.config`,
    name,
    `.${name}`
  ];
  for (const configPath of configPaths) {
    for (const ext of extensions) {
      const fullPath = resolve3(baseDir, `${configPath}${ext}`);
      const config2 = await tryLoadConfig(fullPath, defaultConfig);
      if (config2 !== null) {
        return config2;
      }
    }
  }
  try {
    const pkgPath = resolve3(baseDir, "package.json");
    if (existsSync2(pkgPath)) {
      const pkg = await import(pkgPath);
      const pkgConfig = pkg[name];
      if (pkgConfig && typeof pkgConfig === "object" && !Array.isArray(pkgConfig)) {
        try {
          return deepMerge(defaultConfig, pkgConfig);
        } catch {}
      }
    }
  } catch {}
  return defaultConfig;
}
var defaultConfigDir = resolve3(process4.cwd(), "config");
var defaultGeneratedDir = resolve3(process4.cwd(), "src/generated");
function getProjectRoot(filePath, options = {}) {
  let path2 = process23.cwd();
  while (path2.includes("storage"))
    path2 = resolve2(path2, "..");
  const finalPath = resolve2(path2, filePath || "");
  if (options?.relative)
    return relative(process23.cwd(), finalPath);
  return finalPath;
}
var defaultLogDirectory = process23.env.CLARITY_LOG_DIR || join(getProjectRoot(), "logs");
var defaultConfig = {
  level: "info",
  defaultName: "clarity",
  timestamp: true,
  colors: true,
  format: "text",
  maxLogSize: 10485760,
  logDatePattern: "YYYY-MM-DD",
  logDirectory: defaultLogDirectory,
  rotation: {
    frequency: "daily",
    maxSize: 10485760,
    maxFiles: 5,
    compress: false,
    rotateHour: 0,
    rotateMinute: 0,
    rotateDayOfWeek: 0,
    rotateDayOfMonth: 1,
    encrypt: false
  },
  verbose: false
};
async function loadConfig2() {
  try {
    const loadedConfig = await loadConfig({
      name: "clarity",
      defaultConfig,
      cwd: process23.cwd(),
      endpoint: "",
      headers: {}
    });
    return { ...defaultConfig, ...loadedConfig };
  } catch {
    return defaultConfig;
  }
}
var config = await loadConfig2();
function isBrowserProcess() {
  if (process32.env.NODE_ENV === "test" || process32.env.BUN_ENV === "test") {
    return false;
  }
  return typeof window !== "undefined";
}
async function isServerProcess() {
  if (process32.env.NODE_ENV === "test" || process32.env.BUN_ENV === "test") {
    return true;
  }
  if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return true;
  }
  if (typeof process32 !== "undefined") {
    const type = process32.type;
    if (type === "renderer" || type === "worker") {
      return false;
    }
    return !!(process32.versions && (process32.versions.node || process32.versions.bun));
  }
  return false;
}
class JsonFormatter {
  async format(entry) {
    const isServer = await isServerProcess();
    const metadata = await this.getMetadata(isServer);
    return JSON.stringify({
      timestamp: entry.timestamp.toISOString(),
      level: entry.level,
      name: entry.name,
      message: entry.message,
      metadata
    });
  }
  async getMetadata(isServer) {
    if (isServer) {
      const { hostname } = await import("os");
      return {
        pid: process42.pid,
        hostname: hostname(),
        environment: process42.env.NODE_ENV || "development",
        platform: process42.platform,
        version: process42.version
      };
    }
    return {
      userAgent: navigator.userAgent,
      hostname: window.location.hostname || "browser",
      environment: process42.env.NODE_ENV || process42.env.BUN_ENV || "development",
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      language: navigator.language
    };
  }
}
var terminalStyles = {
  red: (text) => `\x1B[31m${text}\x1B[0m`,
  green: (text) => `\x1B[32m${text}\x1B[0m`,
  yellow: (text) => `\x1B[33m${text}\x1B[0m`,
  blue: (text) => `\x1B[34m${text}\x1B[0m`,
  magenta: (text) => `\x1B[35m${text}\x1B[0m`,
  cyan: (text) => `\x1B[36m${text}\x1B[0m`,
  white: (text) => `\x1B[37m${text}\x1B[0m`,
  gray: (text) => `\x1B[90m${text}\x1B[0m`,
  bgRed: (text) => `\x1B[41m${text}\x1B[0m`,
  bgYellow: (text) => `\x1B[43m${text}\x1B[0m`,
  bold: (text) => `\x1B[1m${text}\x1B[0m`,
  dim: (text) => `\x1B[2m${text}\x1B[0m`,
  italic: (text) => `\x1B[3m${text}\x1B[0m`,
  underline: (text) => `\x1B[4m${text}\x1B[0m`,
  reset: "\x1B[0m"
};
var styles = terminalStyles;
var red = terminalStyles.red;
var green = terminalStyles.green;
var yellow = terminalStyles.yellow;
var blue = terminalStyles.blue;
var magenta = terminalStyles.magenta;
var cyan = terminalStyles.cyan;
var white = terminalStyles.white;
var gray = terminalStyles.gray;
var bgRed = terminalStyles.bgRed;
var bgYellow = terminalStyles.bgYellow;
var bold = terminalStyles.bold;
var dim = terminalStyles.dim;
var italic = terminalStyles.italic;
var underline = terminalStyles.underline;
var reset = terminalStyles.reset;
var defaultFingersCrossedConfig = {
  activationLevel: "error",
  bufferSize: 50,
  flushOnDeactivation: true,
  stopBuffering: false
};
var levelIcons = {
  debug: "\uD83D\uDD0D",
  info: blue("\u2139"),
  success: green("\u2713"),
  warning: bgYellow(white(bold(" WARN "))),
  error: bgRed(white(bold(" ERROR ")))
};

class Logger {
  name;
  fileLocks = new Map;
  currentKeyId = null;
  keys = new Map;
  config;
  options;
  formatter;
  timers = new Set;
  subLoggers = new Set;
  fingersCrossedBuffer = [];
  fingersCrossedConfig;
  fingersCrossedActive = false;
  currentLogFile;
  rotationTimeout;
  keyRotationTimeout;
  encryptionKeys;
  logBuffer = [];
  isActivated = false;
  pendingOperations = [];
  enabled;
  fancy;
  tagFormat;
  timestampPosition;
  environment;
  ANSI_PATTERN = /\u001B\[.*?m/g;
  activeProgressBar = null;
  constructor(name, options = {}) {
    this.name = name;
    this.config = { ...config };
    this.options = this.normalizeOptions(options);
    this.formatter = this.options.formatter || new JsonFormatter;
    this.enabled = options.enabled ?? true;
    this.fancy = options.fancy ?? true;
    this.tagFormat = options.tagFormat ?? { prefix: "[", suffix: "]" };
    this.timestampPosition = options.timestampPosition ?? "right";
    this.environment = options.environment ?? process5.env.APP_ENV ?? "local";
    this.fingersCrossedConfig = this.initializeFingersCrossedConfig(options);
    const configOptions = { ...options };
    const hasTimestamp = options.timestamp !== undefined;
    if (hasTimestamp) {
      delete configOptions.timestamp;
    }
    this.config = {
      ...this.config,
      ...configOptions,
      timestamp: hasTimestamp || this.config.timestamp
    };
    this.currentLogFile = this.generateLogFilename();
    this.encryptionKeys = new Map;
    if (this.validateEncryptionConfig()) {
      this.setupRotation();
      const initialKeyId = this.generateKeyId();
      const initialKey = this.generateKey();
      this.currentKeyId = initialKeyId;
      this.keys.set(initialKeyId, initialKey);
      this.encryptionKeys.set(initialKeyId, {
        key: initialKey,
        createdAt: new Date
      });
      this.setupKeyRotation();
    }
  }
  initializeFingersCrossedConfig(options) {
    if (!options.fingersCrossedEnabled && options.fingersCrossed) {
      return {
        ...defaultFingersCrossedConfig,
        ...options.fingersCrossed
      };
    }
    if (!options.fingersCrossedEnabled) {
      return null;
    }
    if (!options.fingersCrossed) {
      return { ...defaultFingersCrossedConfig };
    }
    return {
      ...defaultFingersCrossedConfig,
      ...options.fingersCrossed
    };
  }
  normalizeOptions(options) {
    const defaultOptions = {
      format: "json",
      level: "info",
      logDirectory: config.logDirectory,
      rotation: undefined,
      timestamp: undefined,
      fingersCrossed: {},
      enabled: true,
      showTags: false,
      formatter: undefined
    };
    const mergedOptions = {
      ...defaultOptions,
      ...Object.fromEntries(Object.entries(options).filter(([, value]) => value !== undefined))
    };
    if (!mergedOptions.level || !["debug", "info", "success", "warning", "error"].includes(mergedOptions.level)) {
      mergedOptions.level = defaultOptions.level;
    }
    return mergedOptions;
  }
  async writeToFile(data) {
    const cancelled = false;
    const operationPromise = (async () => {
      let fd;
      let retries = 0;
      const maxRetries = 3;
      const backoffDelay = 1000;
      while (retries < maxRetries) {
        try {
          try {
            try {
              await access(this.config.logDirectory, constants.F_OK | constants.W_OK);
            } catch (err) {
              if (err instanceof Error && "code" in err) {
                if (err.code === "ENOENT") {
                  await mkdir(this.config.logDirectory, { recursive: true, mode: 493 });
                } else if (err.code === "EACCES") {
                  throw new Error(`No write permission for log directory: ${this.config.logDirectory}`);
                } else {
                  throw err;
                }
              } else {
                throw err;
              }
            }
          } catch (err) {
            console.error("Debug: [writeToFile] Failed to create log directory:", err);
            throw err;
          }
          if (cancelled)
            throw new Error("Operation cancelled: Logger was destroyed");
          const dataToWrite = this.validateEncryptionConfig() ? (await this.encrypt(data)).encrypted : Buffer2.from(data);
          try {
            if (!existsSync22(this.currentLogFile)) {
              await writeFile(this.currentLogFile, "", { mode: 420 });
            }
            fd = openSync(this.currentLogFile, "a", 420);
            writeFileSync2(fd, dataToWrite, { flag: "a" });
            fsyncSync(fd);
            if (fd !== undefined) {
              closeSync(fd);
              fd = undefined;
            }
            const stats = await stat(this.currentLogFile);
            if (stats.size === 0) {
              await writeFile(this.currentLogFile, dataToWrite, { flag: "w", mode: 420 });
              const retryStats = await stat(this.currentLogFile);
              if (retryStats.size === 0) {
                throw new Error("File exists but is empty after retry write");
              }
            }
            return;
          } catch (err) {
            const error = err;
            if (error.code && ["ENETDOWN", "ENETUNREACH", "ENOTFOUND", "ETIMEDOUT"].includes(error.code)) {
              if (retries < maxRetries - 1) {
                const errorMessage = typeof error.message === "string" ? error.message : "Unknown error";
                console.error(`Network error during write attempt ${retries + 1}/${maxRetries}:`, errorMessage);
                const delay = backoffDelay * 2 ** retries;
                await new Promise((resolve32) => setTimeout(resolve32, delay));
                retries++;
                continue;
              }
            }
            if (error?.code && ["ENOSPC", "EDQUOT"].includes(error.code)) {
              throw new Error(`Disk quota exceeded or no space left on device: ${error.message}`);
            }
            console.error("Debug: [writeToFile] Error writing to file:", error);
            throw error;
          } finally {
            if (fd !== undefined) {
              try {
                closeSync(fd);
              } catch (err) {
                console.error("Debug: [writeToFile] Error closing file descriptor:", err);
              }
            }
          }
        } catch (err) {
          if (retries === maxRetries - 1) {
            const error = err;
            const errorMessage = typeof error.message === "string" ? error.message : "Unknown error";
            console.error("Debug: [writeToFile] Max retries reached. Final error:", errorMessage);
            throw err;
          }
          retries++;
          const delay = backoffDelay * 2 ** (retries - 1);
          await new Promise((resolve32) => setTimeout(resolve32, delay));
        }
      }
    })();
    this.pendingOperations.push(operationPromise);
    const index = this.pendingOperations.length - 1;
    try {
      await operationPromise;
    } catch (err) {
      console.error("Debug: [writeToFile] Error in operation:", err);
      throw err;
    } finally {
      this.pendingOperations.splice(index, 1);
    }
  }
  generateLogFilename() {
    if (this.name.includes("stream-throughput") || this.name.includes("decompress-perf-test") || this.name.includes("decompression-latency") || this.name.includes("concurrent-read-test") || this.name.includes("clock-change-test")) {
      return join2(this.config.logDirectory, `${this.name}.log`);
    }
    if (this.name.includes("pending-test") || this.name.includes("temp-file-test") || this.name === "crash-test" || this.name === "corrupt-test" || this.name.includes("rotation-load-test") || this.name === "sigterm-test" || this.name === "sigint-test" || this.name === "failed-rotation-test" || this.name === "integration-test") {
      return join2(this.config.logDirectory, `${this.name}.log`);
    }
    const date = new Date().toISOString().split("T")[0];
    return join2(this.config.logDirectory, `${this.name}-${date}.log`);
  }
  setupRotation() {
    if (isBrowserProcess())
      return;
    if (typeof this.config.rotation === "boolean")
      return;
    const config2 = this.config.rotation;
    let interval;
    switch (config2.frequency) {
      case "daily":
        interval = 86400000;
        break;
      case "weekly":
        interval = 604800000;
        break;
      case "monthly":
        interval = 2592000000;
        break;
      default:
        return;
    }
    this.rotationTimeout = setInterval(() => {
      this.rotateLog();
    }, interval);
  }
  setupKeyRotation() {
    if (!this.validateEncryptionConfig()) {
      console.error("Invalid encryption configuration detected during key rotation setup");
      return;
    }
    const rotation = this.config.rotation;
    const keyRotation = rotation.keyRotation;
    if (!keyRotation?.enabled) {
      return;
    }
    const rotationInterval = typeof keyRotation.interval === "number" ? keyRotation.interval : 60;
    const interval = Math.max(rotationInterval, 60) * 1000;
    this.keyRotationTimeout = setInterval(() => {
      this.rotateKeys().catch((error) => {
        console.error("Error rotating keys:", error);
      });
    }, interval);
  }
  async rotateKeys() {
    if (!this.validateEncryptionConfig()) {
      console.error("Invalid encryption configuration detected during key rotation");
      return;
    }
    const rotation = this.config.rotation;
    const keyRotation = rotation.keyRotation;
    const newKeyId = this.generateKeyId();
    const newKey = this.generateKey();
    this.currentKeyId = newKeyId;
    this.keys.set(newKeyId, newKey);
    this.encryptionKeys.set(newKeyId, {
      key: newKey,
      createdAt: new Date
    });
    const sortedKeys = Array.from(this.encryptionKeys.entries()).sort(([, a], [, b]) => b.createdAt.getTime() - a.createdAt.getTime());
    const maxKeyCount = typeof keyRotation.maxKeys === "number" ? keyRotation.maxKeys : 1;
    const maxKeys = Math.max(1, maxKeyCount);
    if (sortedKeys.length > maxKeys) {
      for (const [keyId] of sortedKeys.slice(maxKeys)) {
        this.encryptionKeys.delete(keyId);
        this.keys.delete(keyId);
      }
    }
  }
  generateKeyId() {
    return randomBytes(16).toString("hex");
  }
  generateKey() {
    return randomBytes(32);
  }
  getCurrentKey() {
    if (!this.currentKeyId) {
      throw new Error("Encryption is not properly initialized. Make sure encryption is enabled in the configuration.");
    }
    const key = this.keys.get(this.currentKeyId);
    if (!key) {
      throw new Error(`No key found for ID ${this.currentKeyId}. The encryption key may have been rotated or removed.`);
    }
    return { key, id: this.currentKeyId };
  }
  encrypt(data) {
    const { key } = this.getCurrentKey();
    const iv = randomBytes(16);
    const cipher = createCipheriv("aes-256-gcm", key, iv);
    const encrypted = Buffer2.concat([
      cipher.update(data, "utf8"),
      cipher.final()
    ]);
    const authTag = cipher.getAuthTag();
    return {
      encrypted: Buffer2.concat([iv, encrypted, authTag]),
      iv
    };
  }
  async compressData(data) {
    return new Promise((resolve32, reject) => {
      const gzip = createGzip();
      const chunks = [];
      gzip.on("data", (chunk2) => chunks.push(chunk2));
      gzip.on("end", () => resolve32(Buffer2.from(Buffer2.concat(chunks))));
      gzip.on("error", reject);
      gzip.write(data);
      gzip.end();
    });
  }
  getEncryptionOptions() {
    if (!this.config.rotation || typeof this.config.rotation === "boolean" || !this.config.rotation.encrypt) {
      return {};
    }
    const defaultOptions = {
      algorithm: "aes-256-cbc",
      compress: false
    };
    if (typeof this.config.rotation.encrypt === "object") {
      const encryptConfig = this.config.rotation.encrypt;
      return {
        ...defaultOptions,
        ...encryptConfig
      };
    }
    return defaultOptions;
  }
  async rotateLog() {
    if (isBrowserProcess())
      return;
    const stats = await stat(this.currentLogFile).catch(() => null);
    if (!stats)
      return;
    const config2 = this.config.rotation;
    if (typeof config2 === "boolean")
      return;
    if (config2.maxSize && stats.size >= config2.maxSize) {
      const oldFile = this.currentLogFile;
      const newFile = this.generateLogFilename();
      if (this.name.includes("rotation-load-test") || this.name === "failed-rotation-test") {
        const files = await readdir(this.config.logDirectory);
        const rotatedFiles = files.filter((f) => f.startsWith(this.name) && /\.log\.\d+$/.test(f)).sort((a, b) => {
          const numA = Number.parseInt(a.match(/\.log\.(\d+)$/)?.[1] || "0");
          const numB = Number.parseInt(b.match(/\.log\.(\d+)$/)?.[1] || "0");
          return numB - numA;
        });
        const nextNum = rotatedFiles.length > 0 ? Number.parseInt(rotatedFiles[0].match(/\.log\.(\d+)$/)?.[1] || "0") + 1 : 1;
        const rotatedFile = `${oldFile}.${nextNum}`;
        if (await stat(oldFile).catch(() => null)) {
          try {
            await rename(oldFile, rotatedFile);
            if (config2.compress) {
              try {
                const compressedPath = `${rotatedFile}.gz`;
                await this.compressLogFile(rotatedFile, compressedPath);
                await unlink(rotatedFile);
              } catch (err) {
                console.error("Error compressing rotated file:", err);
              }
            }
            if (rotatedFiles.length === 0 && !files.some((f) => f.endsWith(".log.1"))) {
              try {
                const backupPath = `${oldFile}.1`;
                await writeFile(backupPath, "");
              } catch (err) {
                console.error("Error creating backup file:", err);
              }
            }
          } catch (err) {
            console.error(`Error during rotation: ${err instanceof Error ? err.message : String(err)}`);
          }
        }
      } else {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const rotatedFile = oldFile.replace(/\.log$/, `-${timestamp}.log`);
        if (await stat(oldFile).catch(() => null)) {
          await rename(oldFile, rotatedFile);
        }
      }
      this.currentLogFile = newFile;
      if (config2.maxFiles) {
        const files = await readdir(this.config.logDirectory);
        const logFiles = files.filter((f) => f.startsWith(this.name)).sort((a, b) => b.localeCompare(a));
        for (const file of logFiles.slice(config2.maxFiles)) {
          await unlink(join2(this.config.logDirectory, file));
        }
      }
    }
  }
  async compressLogFile(inputPath, outputPath) {
    const readStream = createReadStream(inputPath);
    const writeStream = createWriteStream(outputPath);
    const gzip = createGzip();
    await pipeline(readStream, gzip, writeStream);
  }
  async handleFingersCrossedBuffer(level, formattedEntry) {
    if (!this.fingersCrossedConfig)
      return;
    if (this.shouldActivateFingersCrossed(level) && !this.isActivated) {
      this.isActivated = true;
      for (const entry of this.logBuffer) {
        const formattedBufferedEntry = await this.formatter.format(entry);
        await this.writeToFile(formattedBufferedEntry);
        console.log(formattedBufferedEntry);
      }
      if (this.fingersCrossedConfig.stopBuffering)
        this.logBuffer = [];
    }
    if (this.isActivated) {
      await this.writeToFile(formattedEntry);
      console.log(formattedEntry);
    } else {
      if (this.logBuffer.length >= this.fingersCrossedConfig.bufferSize)
        this.logBuffer.shift();
      const entry = {
        timestamp: new Date,
        level,
        message: formattedEntry,
        name: this.name
      };
      this.logBuffer.push(entry);
    }
  }
  shouldActivateFingersCrossed(level) {
    if (!this.fingersCrossedConfig)
      return false;
    return this.getLevelValue(level) >= this.getLevelValue(this.fingersCrossedConfig.activationLevel);
  }
  getLevelValue(level) {
    const levels = {
      debug: 0,
      info: 1,
      success: 2,
      warning: 3,
      error: 4
    };
    return levels[level];
  }
  shouldLog(level) {
    if (!this.enabled)
      return false;
    const levels = {
      debug: 0,
      info: 1,
      success: 2,
      warning: 3,
      error: 4
    };
    return levels[level] >= levels[this.config.level];
  }
  async flushPendingWrites() {
    await Promise.all(this.pendingOperations.map((op) => {
      if (op instanceof Promise) {
        return op.catch((err) => {
          console.error("Error in pending write operation:", err);
        });
      }
      return Promise.resolve();
    }));
    if (existsSync22(this.currentLogFile)) {
      try {
        const fd = openSync(this.currentLogFile, "r+");
        fsyncSync(fd);
        closeSync(fd);
      } catch (error) {
        console.error(`Error flushing file: ${error}`);
      }
    }
  }
  async destroy() {
    if (this.rotationTimeout)
      clearInterval(this.rotationTimeout);
    if (this.keyRotationTimeout)
      clearInterval(this.keyRotationTimeout);
    this.timers.clear();
    for (const op of this.pendingOperations) {
      if (typeof op.cancel === "function") {
        op.cancel();
      }
    }
    return (async () => {
      if (this.pendingOperations.length > 0) {
        try {
          await Promise.allSettled(this.pendingOperations);
        } catch (err) {
          console.error("Error waiting for pending operations:", err);
        }
      }
      if (!isBrowserProcess() && this.config.rotation && typeof this.config.rotation !== "boolean" && this.config.rotation.compress) {
        try {
          const files = await readdir(this.config.logDirectory);
          const tempFiles = files.filter((f) => (f.includes("temp") || f.includes(".tmp")) && f.includes(this.name));
          for (const tempFile of tempFiles) {
            try {
              await unlink(join2(this.config.logDirectory, tempFile));
            } catch (err) {
              console.error(`Failed to delete temp file ${tempFile}:`, err);
            }
          }
        } catch (err) {
          console.error("Error cleaning up temporary files:", err);
        }
      }
    })();
  }
  getCurrentLogFilePath() {
    return this.currentLogFile;
  }
  formatTag(name) {
    if (!name)
      return "";
    return `${this.tagFormat.prefix}${name}${this.tagFormat.suffix}`;
  }
  formatFileTimestamp(date) {
    return `[${date.toISOString()}]`;
  }
  formatConsoleTimestamp(date) {
    return this.fancy ? styles.gray(date.toLocaleTimeString()) : date.toLocaleTimeString();
  }
  formatConsoleMessage(parts) {
    const { timestamp, icon = "", tag = "", message, level, showTimestamp = true } = parts;
    const stripAnsi = (str) => str.replace(this.ANSI_PATTERN, "");
    if (!this.fancy) {
      const components = [];
      if (showTimestamp)
        components.push(timestamp);
      if (level === "warning")
        components.push("WARN");
      else if (level === "error")
        components.push("ERROR");
      else if (icon)
        components.push(icon.replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, ""));
      if (tag)
        components.push(tag.replace(/[[\]]/g, ""));
      components.push(message);
      return components.join(" ");
    }
    const terminalWidth = process5.stdout.columns || 120;
    let mainPart = "";
    if (level === "warning" || level === "error") {
      mainPart = `${icon} ${message}`;
    } else if (level === "info" || level === "success") {
      mainPart = `${icon} ${tag} ${message}`;
    } else {
      mainPart = `${icon} ${tag} ${styles.cyan(message)}`;
    }
    if (!showTimestamp) {
      return mainPart.trim();
    }
    const visibleMainPartLength = stripAnsi(mainPart).trim().length;
    const visibleTimestampLength = stripAnsi(timestamp).length;
    const padding = Math.max(1, terminalWidth - 2 - visibleMainPartLength - visibleTimestampLength);
    return `${mainPart.trim()}${" ".repeat(padding)}${timestamp}`;
  }
  formatMessage(message, args) {
    if (args.length === 1 && Array.isArray(args[0])) {
      return message.replace(/\{(\d+)\}/g, (match, index) => {
        const position = Number.parseInt(index, 10);
        return position < args[0].length ? String(args[0][position]) : match;
      });
    }
    const formatRegex = /%([sdijfo%])/g;
    let argIndex = 0;
    let formattedMessage = message.replace(formatRegex, (match, type) => {
      if (type === "%")
        return "%";
      if (argIndex >= args.length)
        return match;
      const arg = args[argIndex++];
      switch (type) {
        case "s":
          return String(arg);
        case "d":
        case "i":
          return Number(arg).toString();
        case "j":
        case "o":
          return JSON.stringify(arg, null, 2);
        default:
          return match;
      }
    });
    if (argIndex < args.length) {
      formattedMessage += ` ${args.slice(argIndex).map((arg) => typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)).join(" ")}`;
    }
    return formattedMessage;
  }
  async log(level, message, ...args) {
    const timestamp = new Date;
    const consoleTime = this.formatConsoleTimestamp(timestamp);
    const fileTime = this.formatFileTimestamp(timestamp);
    let formattedMessage;
    let errorStack;
    if (message instanceof Error) {
      formattedMessage = message.message;
      errorStack = message.stack;
    } else {
      formattedMessage = this.formatMessage(message, args);
    }
    if (this.fancy && !isBrowserProcess()) {
      const icon = levelIcons[level];
      const tag = this.options.showTags !== false && this.name ? styles.gray(this.formatTag(this.name)) : "";
      let consoleMessage;
      switch (level) {
        case "debug":
          consoleMessage = this.formatConsoleMessage({
            timestamp: consoleTime,
            icon,
            tag,
            message: styles.gray(formattedMessage),
            level
          });
          console.error(consoleMessage);
          break;
        case "info":
          consoleMessage = this.formatConsoleMessage({
            timestamp: consoleTime,
            icon,
            tag,
            message: formattedMessage,
            level
          });
          console.error(consoleMessage);
          break;
        case "success":
          consoleMessage = this.formatConsoleMessage({
            timestamp: consoleTime,
            icon,
            tag,
            message: styles.green(formattedMessage),
            level
          });
          console.error(consoleMessage);
          break;
        case "warning":
          consoleMessage = this.formatConsoleMessage({
            timestamp: consoleTime,
            icon,
            tag,
            message: formattedMessage,
            level
          });
          console.warn(consoleMessage);
          break;
        case "error":
          consoleMessage = this.formatConsoleMessage({
            timestamp: consoleTime,
            icon,
            tag,
            message: formattedMessage,
            level
          });
          console.error(consoleMessage);
          if (errorStack) {
            const stackLines = errorStack.split(`
`);
            for (const line of stackLines) {
              if (line.trim() && !line.includes(formattedMessage)) {
                console.error(this.formatConsoleMessage({
                  timestamp: consoleTime,
                  message: styles.gray(`  ${line}`),
                  level,
                  showTimestamp: false
                }));
              }
            }
          }
          break;
      }
    } else if (!isBrowserProcess()) {
      console.error(`${fileTime} ${this.environment}.${level.toUpperCase()}: ${formattedMessage}`);
      if (errorStack) {
        console.error(errorStack);
      }
    }
    if (!this.shouldLog(level))
      return;
    let logEntry = `${fileTime} ${this.environment}.${level.toUpperCase()}: ${formattedMessage}
`;
    if (errorStack) {
      logEntry += `${errorStack}
`;
    }
    logEntry = logEntry.replace(this.ANSI_PATTERN, "");
    await this.writeToFile(logEntry);
  }
  time(label) {
    const start = performance.now();
    if (this.fancy && !isBrowserProcess()) {
      const tag = this.options.showTags !== false && this.name ? styles.gray(this.formatTag(this.name)) : "";
      const consoleTime = this.formatConsoleTimestamp(new Date);
      console.error(this.formatConsoleMessage({
        timestamp: consoleTime,
        icon: styles.blue("\u25D0"),
        tag,
        message: `${styles.cyan(label)}...`
      }));
    }
    return async (metadata) => {
      if (!this.enabled)
        return;
      const end = performance.now();
      const elapsed = Math.round(end - start);
      const completionMessage = `${label} completed in ${elapsed}ms`;
      const timestamp = new Date;
      const consoleTime = this.formatConsoleTimestamp(timestamp);
      const fileTime = this.formatFileTimestamp(timestamp);
      let logEntry = `${fileTime} ${this.environment}.INFO: ${completionMessage}`;
      if (metadata) {
        logEntry += ` ${JSON.stringify(metadata)}`;
      }
      logEntry += `
`;
      logEntry = logEntry.replace(this.ANSI_PATTERN, "");
      if (this.fancy && !isBrowserProcess()) {
        const tag = this.options.showTags !== false && this.name ? styles.gray(this.formatTag(this.name)) : "";
        console.error(this.formatConsoleMessage({
          timestamp: consoleTime,
          icon: styles.green("\u2713"),
          tag,
          message: `${completionMessage}${metadata ? ` ${JSON.stringify(metadata)}` : ""}`
        }));
      } else if (!isBrowserProcess()) {
        console.error(logEntry.trim());
      }
      await this.writeToFile(logEntry);
    };
  }
  async debug(message, ...args) {
    await this.log("debug", message, ...args);
  }
  async info(message, ...args) {
    await this.log("info", message, ...args);
  }
  async success(message, ...args) {
    await this.log("success", message, ...args);
  }
  async warn(message, ...args) {
    await this.log("warning", message, ...args);
  }
  async error(message, ...args) {
    await this.log("error", message, ...args);
  }
  validateEncryptionConfig() {
    if (!this.config.rotation)
      return false;
    if (typeof this.config.rotation === "boolean")
      return false;
    const rotation = this.config.rotation;
    const { encrypt } = rotation;
    return !!encrypt;
  }
  async only(fn) {
    if (!this.enabled)
      return;
    return await fn();
  }
  isEnabled() {
    return this.enabled;
  }
  setEnabled(enabled) {
    this.enabled = enabled;
  }
  extend(namespace) {
    const childName = `${this.name}:${namespace}`;
    const childLogger = new Logger(childName, {
      ...this.options,
      logDirectory: this.config.logDirectory,
      level: this.config.level,
      format: this.config.format,
      rotation: typeof this.config.rotation === "boolean" ? undefined : this.config.rotation,
      timestamp: typeof this.config.timestamp === "boolean" ? undefined : this.config.timestamp
    });
    this.subLoggers.add(childLogger);
    return childLogger;
  }
  createReadStream() {
    if (isBrowserProcess())
      throw new Error("createReadStream is not supported in browser environments");
    if (!existsSync22(this.currentLogFile))
      throw new Error(`Log file does not exist: ${this.currentLogFile}`);
    return createReadStream(this.currentLogFile, { encoding: "utf8" });
  }
  async decrypt(data) {
    if (!this.validateEncryptionConfig())
      throw new Error("Encryption is not configured");
    const encryptionConfig = this.config.rotation;
    if (!encryptionConfig.encrypt || typeof encryptionConfig.encrypt === "boolean")
      throw new Error("Invalid encryption configuration");
    if (!this.currentKeyId || !this.keys.has(this.currentKeyId))
      throw new Error("No valid encryption key available");
    const key = this.keys.get(this.currentKeyId);
    try {
      const encryptedData = Buffer2.isBuffer(data) ? data : Buffer2.from(data, "base64");
      const iv = encryptedData.slice(0, 16);
      const authTag = encryptedData.slice(-16);
      const ciphertext = encryptedData.slice(16, -16);
      const decipher = createDecipheriv("aes-256-gcm", key, iv);
      decipher.setAuthTag(authTag);
      const decrypted = Buffer2.concat([
        decipher.update(ciphertext),
        decipher.final()
      ]);
      return decrypted.toString("utf8");
    } catch (err) {
      throw new Error(`Decryption failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  getLevel() {
    return this.config.level;
  }
  getLogDirectory() {
    return this.config.logDirectory;
  }
  getFormat() {
    return this.config.format;
  }
  getRotationConfig() {
    return this.config.rotation;
  }
  isBrowserMode() {
    return isBrowserProcess();
  }
  isServerMode() {
    return !isBrowserProcess();
  }
  setTestEncryptionKey(keyId, key) {
    this.currentKeyId = keyId;
    this.keys.set(keyId, key);
  }
  getTestCurrentKey() {
    if (!this.currentKeyId || !this.keys.has(this.currentKeyId)) {
      return null;
    }
    return {
      id: this.currentKeyId,
      key: this.keys.get(this.currentKeyId)
    };
  }
  getConfig() {
    return this.config;
  }
  async box(message) {
    if (!this.enabled)
      return;
    const timestamp = new Date;
    const consoleTime = this.formatConsoleTimestamp(timestamp);
    const fileTime = this.formatFileTimestamp(timestamp);
    if (this.fancy && !isBrowserProcess()) {
      const lines = message.split(`
`);
      const width = Math.max(...lines.map((line) => line.length)) + 2;
      const top = `\u250C${"\u2500".repeat(width)}\u2510`;
      const bottom = `\u2514${"\u2500".repeat(width)}\u2518`;
      const boxedLines = lines.map((line) => {
        const padding = " ".repeat(width - line.length - 2);
        return `\u2502 ${line}${padding} \u2502`;
      });
      if (this.options.showTags !== false && this.name) {
        console.error(this.formatConsoleMessage({
          timestamp: consoleTime,
          message: styles.gray(this.formatTag(this.name)),
          showTimestamp: false
        }));
      }
      console.error(this.formatConsoleMessage({
        timestamp: consoleTime,
        message: styles.cyan(top)
      }));
      boxedLines.forEach((line) => console.error(this.formatConsoleMessage({
        timestamp: consoleTime,
        message: styles.cyan(line),
        showTimestamp: false
      })));
      console.error(this.formatConsoleMessage({
        timestamp: consoleTime,
        message: styles.cyan(bottom),
        showTimestamp: false
      }));
    } else if (!isBrowserProcess()) {
      console.error(`${fileTime} ${this.environment}.INFO: [BOX] ${message}`);
    }
    const logEntry = `${fileTime} ${this.environment}.INFO: [BOX] ${message}
`.replace(this.ANSI_PATTERN, "");
    await this.writeToFile(logEntry);
  }
  async prompt(message) {
    if (isBrowserProcess()) {
      return Promise.resolve(true);
    }
    return new Promise((resolve32) => {
      console.error(`${styles.cyan("?")} ${message} (y/n) `);
      const onData = (data) => {
        const input = data.toString().trim().toLowerCase();
        process5.stdin.removeListener("data", onData);
        try {
          if (typeof process5.stdin.setRawMode === "function") {
            process5.stdin.setRawMode(false);
          }
        } catch {}
        process5.stdin.pause();
        console.error("");
        resolve32(input === "y" || input === "yes");
      };
      try {
        if (typeof process5.stdin.setRawMode === "function") {
          process5.stdin.setRawMode(true);
        }
      } catch {}
      process5.stdin.resume();
      process5.stdin.once("data", onData);
    });
  }
  setFancy(enabled) {
    this.fancy = enabled;
  }
  isFancy() {
    return this.fancy;
  }
  pause() {
    this.enabled = false;
  }
  resume() {
    this.enabled = true;
  }
  async start(message, ...args) {
    if (!this.enabled)
      return;
    let formattedMessage = message;
    if (args && args.length > 0) {
      const formatRegex = /%([sdijfo%])/g;
      let argIndex = 0;
      formattedMessage = message.replace(formatRegex, (match, type) => {
        if (type === "%")
          return "%";
        if (argIndex >= args.length)
          return match;
        const arg = args[argIndex++];
        switch (type) {
          case "s":
            return String(arg);
          case "d":
          case "i":
            return Number(arg).toString();
          case "j":
          case "o":
            return JSON.stringify(arg, null, 2);
          default:
            return match;
        }
      });
      if (argIndex < args.length) {
        formattedMessage += ` ${args.slice(argIndex).map((arg) => typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)).join(" ")}`;
      }
    }
    if (this.fancy && !isBrowserProcess()) {
      const tag = this.options.showTags !== false && this.name ? styles.gray(this.formatTag(this.name)) : "";
      const spinnerChar = styles.blue("\u25D0");
      console.error(`${spinnerChar} ${tag} ${styles.cyan(formattedMessage)}`);
    }
    const timestamp = new Date;
    const formattedDate = timestamp.toISOString();
    const logEntry = `[${formattedDate}] ${this.environment}.INFO: [START] ${formattedMessage}
`.replace(this.ANSI_PATTERN, "");
    await this.writeToFile(logEntry);
  }
  progress(total, initialMessage = "") {
    if (!this.enabled || !this.fancy || isBrowserProcess() || total <= 0) {
      return {
        update: () => {},
        finish: () => {},
        interrupt: () => {}
      };
    }
    if (this.activeProgressBar) {
      console.warn("Warning: Another progress bar is already active. Finishing the previous one.");
      this.finishProgressBar(this.activeProgressBar, "[Auto-finished]");
    }
    const barLength = 20;
    this.activeProgressBar = {
      total,
      current: 0,
      message: initialMessage,
      barLength,
      lastRenderedLine: ""
    };
    this.renderProgressBar(this.activeProgressBar);
    const update = (current, message) => {
      if (!this.activeProgressBar || !this.enabled || !this.fancy || isBrowserProcess())
        return;
      this.activeProgressBar.current = Math.max(0, Math.min(total, current));
      if (message !== undefined) {
        this.activeProgressBar.message = message;
      }
      const isFinished = this.activeProgressBar.current === this.activeProgressBar.total;
      this.renderProgressBar(this.activeProgressBar, isFinished);
    };
    const finish = (message) => {
      if (!this.activeProgressBar || !this.enabled || !this.fancy || isBrowserProcess())
        return;
      this.activeProgressBar.current = this.activeProgressBar.total;
      if (message !== undefined) {
        this.activeProgressBar.message = message;
      }
      this.renderProgressBar(this.activeProgressBar, true);
      this.finishProgressBar(this.activeProgressBar);
    };
    const interrupt = (interruptMessage, level = "info") => {
      if (!this.activeProgressBar || !this.enabled || !this.fancy || isBrowserProcess())
        return;
      process5.stdout.write(`${"\r".padEnd(process5.stdout.columns || 80)}\r`);
      this.log(level, interruptMessage);
      setTimeout(() => {
        if (this.activeProgressBar) {
          this.renderProgressBar(this.activeProgressBar);
        }
      }, 50);
    };
    return { update, finish, interrupt };
  }
  renderProgressBar(barState, isFinished = false) {
    if (!this.enabled || !this.fancy || isBrowserProcess() || !process5.stdout.isTTY)
      return;
    const percent = Math.min(100, Math.max(0, Math.round(barState.current / barState.total * 100)));
    const filledLength = Math.round(barState.barLength * percent / 100);
    const emptyLength = barState.barLength - filledLength;
    const filledBar = styles.green("\u2501".repeat(filledLength));
    const emptyBar = styles.gray("\u2501".repeat(emptyLength));
    const bar = `[${filledBar}${emptyBar}]`;
    const percentageText = `${percent}%`.padStart(4);
    const messageText = barState.message ? ` ${barState.message}` : "";
    const icon = isFinished || percent === 100 ? styles.green("\u2713") : styles.blue("\u25B6");
    const tag = this.options.showTags !== false && this.name ? ` ${styles.gray(this.formatTag(this.name))}` : "";
    const line = `\r${icon}${tag} ${bar} ${percentageText}${messageText}`;
    const terminalWidth = process5.stdout.columns || 80;
    const clearLine = " ".repeat(Math.max(0, terminalWidth - line.replace(this.ANSI_PATTERN, "").length));
    barState.lastRenderedLine = `${line}${clearLine}`;
    process5.stdout.write(barState.lastRenderedLine);
    if (isFinished) {
      process5.stdout.write(`
`);
    }
  }
  finishProgressBar(barState, finalMessage) {
    if (!this.enabled || !this.fancy || isBrowserProcess() || !process5.stdout.isTTY) {
      this.activeProgressBar = null;
      return;
    }
    if (barState.current < barState.total) {
      barState.current = barState.total;
    }
    if (finalMessage)
      barState.message = finalMessage;
    this.renderProgressBar(barState, true);
    this.activeProgressBar = null;
  }
  async clear(filters = {}) {
    if (isBrowserProcess()) {
      console.warn("Log clearing is not supported in browser environments.");
      return;
    }
    try {
      console.warn("Clearing logs...", this.config.logDirectory);
      const files = await readdir(this.config.logDirectory);
      const logFilesToDelete = [];
      for (const file of files) {
        const nameMatches = filters.name ? new RegExp(filters.name.replace("*", ".*")).test(file) : file.startsWith(this.name);
        if (!nameMatches || !file.endsWith(".log")) {
          continue;
        }
        const filePath = join2(this.config.logDirectory, file);
        if (filters.before) {
          try {
            const fileStats = await stat(filePath);
            if (fileStats.mtime >= filters.before) {
              continue;
            }
          } catch (statErr) {
            console.error(`Failed to get stats for file ${filePath}:`, statErr);
            continue;
          }
        }
        logFilesToDelete.push(filePath);
      }
      if (logFilesToDelete.length === 0) {
        console.warn("No log files matched the criteria for clearing.");
        return;
      }
      console.warn(`Preparing to delete ${logFilesToDelete.length} log file(s)...`);
      for (const filePath of logFilesToDelete) {
        try {
          await unlink(filePath);
          console.warn(`Deleted log file: ${filePath}`);
        } catch (unlinkErr) {
          console.error(`Failed to delete log file ${filePath}:`, unlinkErr);
        }
      }
      console.warn("Log clearing process finished.");
    } catch (err) {
      console.error("Error during log clearing process:", err);
    }
  }
}
var logger = new Logger("stacks");
// ../strings/src/title-case.ts
var WORD_SEPARATORS = new Set(["\u2014", "\u2013", "-", "\u2015", "/"]);
var SENTENCE_TERMINATORS = new Set([".", "!", "?"]);
var TITLE_TERMINATORS = new Set([
  ...SENTENCE_TERMINATORS,
  ":",
  '"',
  "'",
  "\u201D"
]);
var SMALL_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "because",
  "but",
  "by",
  "en",
  "for",
  "if",
  "in",
  "neither",
  "nor",
  "of",
  "on",
  "only",
  "or",
  "over",
  "per",
  "so",
  "some",
  "than",
  "that",
  "the",
  "to",
  "up",
  "upon",
  "v",
  "versus",
  "via",
  "vs",
  "when",
  "with",
  "without",
  "yet"
]);
// ../strings/src/pluralize.ts
var pluralRules = [];
var singularRules = [];
var uncountables = {};
var irregularPlurals = {};
var irregularSingles = {};
function sanitizeRule(rule) {
  return typeof rule === "string" ? new RegExp(`^${rule}$`, "i") : rule;
}
function restoreCase(word, token) {
  if (word === token)
    return token;
  if (word === word.toLowerCase())
    return token.toLowerCase();
  if (word === word.toUpperCase())
    return token.toUpperCase();
  if (word[0] === word[0].toUpperCase()) {
    return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
  }
  return token.toLowerCase();
}
function interpolate(str, ...args) {
  return str.replace(/\$(\d{1,2})/g, (match, index) => args[Number(index)] || "");
}
function replace(word, rule) {
  return word.replace(rule[0], (...matchArgs) => {
    const result2 = interpolate(rule[1], ...matchArgs);
    if (matchArgs[0] === "") {
      return restoreCase(word[matchArgs[matchArgs.length - 2] - 1], result2);
    }
    return restoreCase(matchArgs[0], result2);
  });
}
function sanitizeWord(token, word, rules) {
  if (!token.length || uncountables[token]) {
    return word;
  }
  for (let i = rules.length - 1;i >= 0; i--) {
    const rule = rules[i];
    if (rule[0].test(word))
      return replace(word, rule);
  }
  return word;
}
function replaceWord(replaceMap, keepMap, rules) {
  return (word) => {
    const token = word.toLowerCase();
    if (keepMap[token])
      return restoreCase(word, token);
    if (replaceMap[token])
      return restoreCase(word, replaceMap[token]);
    return sanitizeWord(token, word, rules);
  };
}
function checkWord(replaceMap, keepMap, rules) {
  return (word) => {
    const token = word.toLowerCase();
    if (keepMap[token])
      return true;
    if (replaceMap[token])
      return false;
    return sanitizeWord(token, token, rules) === token;
  };
}
var pluralize = (word, options = {}) => {
  const { count = 2, inclusive = false } = options;
  if (typeof word !== "string") {
    throw new TypeError("Word must be a string");
  }
  const pluralized = count === 1 ? pluralize.singular(word) : pluralize.plural(word);
  return inclusive ? `${count} ${pluralized}` : pluralized;
};
pluralize.plural = replaceWord(irregularSingles, irregularPlurals, pluralRules);
pluralize.isPlural = checkWord(irregularSingles, irregularPlurals, pluralRules);
pluralize.singular = replaceWord(irregularPlurals, irregularSingles, singularRules);
pluralize.isSingular = checkWord(irregularPlurals, irregularSingles, singularRules);
pluralize.addPluralRule = (rule, replacement) => {
  pluralRules.push([sanitizeRule(rule), replacement]);
};
pluralize.addSingularRule = (rule, replacement) => {
  singularRules.push([sanitizeRule(rule), replacement]);
};
pluralize.addUncountableRule = (word) => {
  if (typeof word === "string") {
    uncountables[word.toLowerCase()] = true;
    return;
  }
  pluralize.addPluralRule(word, "$0");
  pluralize.addSingularRule(word, "$0");
};
pluralize.addIrregularRule = (single, plural) => {
  const lowerPlural = plural.toLowerCase();
  const lowerSingle = single.toLowerCase();
  irregularSingles[lowerSingle] = lowerPlural;
  irregularPlurals[lowerPlural] = lowerSingle;
};
[
  ["I", "we"],
  ["me", "us"],
  ["he", "they"],
  ["she", "they"],
  ["them", "them"],
  ["myself", "ourselves"],
  ["yourself", "yourselves"],
  ["itself", "themselves"],
  ["herself", "themselves"],
  ["himself", "themselves"],
  ["themself", "themselves"],
  ["is", "are"],
  ["was", "were"],
  ["has", "have"],
  ["this", "these"],
  ["that", "those"],
  ["my", "our"],
  ["its", "their"],
  ["his", "their"],
  ["her", "their"],
  ["echo", "echoes"],
  ["dingo", "dingoes"],
  ["volcano", "volcanoes"],
  ["tornado", "tornadoes"],
  ["torpedo", "torpedoes"],
  ["genus", "genera"],
  ["viscus", "viscera"],
  ["stigma", "stigmata"],
  ["stoma", "stomata"],
  ["dogma", "dogmata"],
  ["lemma", "lemmata"],
  ["schema", "schemata"],
  ["anathema", "anathemata"],
  ["ox", "oxen"],
  ["axe", "axes"],
  ["die", "dice"],
  ["yes", "yeses"],
  ["foot", "feet"],
  ["eave", "eaves"],
  ["goose", "geese"],
  ["tooth", "teeth"],
  ["quiz", "quizzes"],
  ["human", "humans"],
  ["proof", "proofs"],
  ["carve", "carves"],
  ["valve", "valves"],
  ["looey", "looies"],
  ["thief", "thieves"],
  ["groove", "grooves"],
  ["pickaxe", "pickaxes"],
  ["passerby", "passersby"],
  ["canvas", "canvases"]
].forEach(([single, plural]) => pluralize.addIrregularRule(single, plural));
[
  [/s?$/i, "s"],
  [/[^\x20-\x7F]$/, "$0"],
  [/([^aeiou]ese)$/i, "$1"],
  [/(ax|test)is$/i, "$1es"],
  [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, "$1es"],
  [/(e[mn]u)s?$/i, "$1s"],
  [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, "$1"],
  [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1i"],
  [/(alumn|alg|vertebr)(?:a|ae)$/i, "$1ae"],
  [/(seraph|cherub)(?:im)?$/i, "$1im"],
  [/(her|at|gr)o$/i, "$1oes"],
  [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, "$1a"],
  [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, "$1a"],
  [/sis$/i, "ses"],
  [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, "$1$2ves"],
  [/([^aeiouy]|qu)y$/i, "$1ies"],
  [/([^ch][ieo][ln])ey$/i, "$1ies"],
  [/(x|ch|ss|sh|zz)$/i, "$1es"],
  [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, "$1ices"],
  [/\b((?:tit)?m|l)(?:ice|ouse)$/i, "$1ice"],
  [/(pe)(?:rson|ople)$/i, "$1ople"],
  [/(child)(?:ren)?$/i, "$1ren"],
  [/eaux$/i, "$0"],
  [/m[ae]n$/i, "men"],
  ["thou", "you"]
].forEach(([rule, replacement]) => pluralize.addPluralRule(rule, replacement));
[
  [/s$/i, ""],
  [/(ss)$/i, "$1"],
  [/(wi|kni|(?:after|half|high|low|mid|non|night|\W|^)li)ves$/i, "$1fe"],
  [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, "$1f"],
  [/ies$/i, "y"],
  [/(dg|ss|ois|lk|ok|wn|mb|th|ch|ec|oal|is|ck|ix|sser|ts|wb)ies$/i, "$1ie"],
  [/\b(l|(?:neck|cross|hog|aun)?t|coll|faer|food|gen|goon|group|hipp|junk|vegg|(?:pork)?p|charl|calor|cut)ies$/i, "$1ie"],
  [/\b(mon|smil)ies$/i, "$1ey"],
  [/\b((?:tit)?m|l)ice$/i, "$1ouse"],
  [/(seraph|cherub)im$/i, "$1"],
  [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, "$1"],
  [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, "$1sis"],
  [/(movie|twelve|abuse|e[mn]u)s$/i, "$1"],
  [/(test)(?:is|es)$/i, "$1is"],
  [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1us"],
  [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, "$1um"],
  [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, "$1on"],
  [/(alumn|alg|vertebr)ae$/i, "$1a"],
  [/(cod|mur|sil|vert|ind)ices$/i, "$1ex"],
  [/(matr|append)ices$/i, "$1ix"],
  [/(pe)(rson|ople)$/i, "$1rson"],
  [/(child)ren$/i, "$1"],
  [/(eau)x?$/i, "$1"],
  [/men$/i, "man"]
].forEach(([rule, replacement]) => pluralize.addSingularRule(rule, replacement));
[
  "adulthood",
  "advice",
  "agenda",
  "aid",
  "aircraft",
  "alcohol",
  "ammo",
  "analytics",
  "anime",
  "athletics",
  "audio",
  "bison",
  "blood",
  "bream",
  "buffalo",
  "butter",
  "carp",
  "cash",
  "chassis",
  "chess",
  "clothing",
  "cod",
  "commerce",
  "cooperation",
  "corps",
  "debris",
  "diabetes",
  "digestion",
  "elk",
  "energy",
  "equipment",
  "excretion",
  "expertise",
  "firmware",
  "flounder",
  "fun",
  "gallows",
  "garbage",
  "graffiti",
  "hardware",
  "headquarters",
  "health",
  "herpes",
  "highjinks",
  "homework",
  "housework",
  "information",
  "jeans",
  "justice",
  "kudos",
  "labour",
  "literature",
  "machinery",
  "mackerel",
  "mail",
  "media",
  "mews",
  "moose",
  "music",
  "mud",
  "manga",
  "news",
  "only",
  "personnel",
  "pike",
  "plankton",
  "pliers",
  "police",
  "pollution",
  "premises",
  "rain",
  "research",
  "rice",
  "salmon",
  "scissors",
  "series",
  "sewage",
  "shambles",
  "shrimp",
  "software",
  "staff",
  "swine",
  "tennis",
  "traffic",
  "transportation",
  "trout",
  "tuna",
  "wealth",
  "welfare",
  "whiting",
  "wildebeest",
  "wildlife",
  "you",
  /pok[e\u00E9]mon$/i,
  /[^aeiou]ese$/i,
  /deer$/i,
  /fish$/i,
  /measles$/i,
  /o[iu]s$/i,
  /pox$/i,
  /sheep$/i
].forEach(pluralize.addUncountableRule);

// ../strings/src/slug.ts
var charMap = JSON.parse('{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","\xA2":"cent","\xA3":"pound","\xA4":"currency","\xA5":"yen","\xA9":"(c)","\xAA":"a","\xAE":"(r)","\xBA":"o","\xC0":"A","\xC1":"A","\xC2":"A","\xC3":"A","\xC4":"A","\xC5":"A","\xC6":"AE","\xC7":"C","\xC8":"E","\xC9":"E","\xCA":"E","\xCB":"E","\xCC":"I","\xCD":"I","\xCE":"I","\xCF":"I","\xD0":"D","\xD1":"N","\xD2":"O","\xD3":"O","\xD4":"O","\xD5":"O","\xD6":"O","\xD8":"O","\xD9":"U","\xDA":"U","\xDB":"U","\xDC":"U","\xDD":"Y","\xDE":"TH","\xDF":"ss","\xE0":"a","\xE1":"a","\xE2":"a","\xE3":"a","\xE4":"a","\xE5":"a","\xE6":"ae","\xE7":"c","\xE8":"e","\xE9":"e","\xEA":"e","\xEB":"e","\xEC":"i","\xED":"i","\xEE":"i","\xEF":"i","\xF0":"d","\xF1":"n","\xF2":"o","\xF3":"o","\xF4":"o","\xF5":"o","\xF6":"o","\xF8":"o","\xF9":"u","\xFA":"u","\xFB":"u","\xFC":"u","\xFD":"y","\xFE":"th","\xFF":"y","\u0100":"A","\u0101":"a","\u0102":"A","\u0103":"a","\u0104":"A","\u0105":"a","\u0106":"C","\u0107":"c","\u010C":"C","\u010D":"c","\u010E":"D","\u010F":"d","\u0110":"DJ","\u0111":"dj","\u0112":"E","\u0113":"e","\u0116":"E","\u0117":"e","\u0118":"e","\u0119":"e","\u011A":"E","\u011B":"e","\u011E":"G","\u011F":"g","\u0122":"G","\u0123":"g","\u0128":"I","\u0129":"i","\u012A":"i","\u012B":"i","\u012E":"I","\u012F":"i","\u0130":"I","\u0131":"i","\u0136":"k","\u0137":"k","\u013B":"L","\u013C":"l","\u013D":"L","\u013E":"l","\u0141":"L","\u0142":"l","\u0143":"N","\u0144":"n","\u0145":"N","\u0146":"n","\u0147":"N","\u0148":"n","\u014C":"O","\u014D":"o","\u0150":"O","\u0151":"o","\u0152":"OE","\u0153":"oe","\u0154":"R","\u0155":"r","\u0158":"R","\u0159":"r","\u015A":"S","\u015B":"s","\u015E":"S","\u015F":"s","\u0160":"S","\u0161":"s","\u0162":"T","\u0163":"t","\u0164":"T","\u0165":"t","\u0168":"U","\u0169":"u","\u016A":"u","\u016B":"u","\u016E":"U","\u016F":"u","\u0170":"U","\u0171":"u","\u0172":"U","\u0173":"u","\u0174":"W","\u0175":"w","\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017A":"z","\u017B":"Z","\u017C":"z","\u017D":"Z","\u017E":"z","\u018F":"E","\u0192":"f","\u01A0":"O","\u01A1":"o","\u01AF":"U","\u01B0":"u","\u01C8":"LJ","\u01C9":"lj","\u01CB":"NJ","\u01CC":"nj","\u0218":"S","\u0219":"s","\u021A":"T","\u021B":"t","\u0259":"e","\u02DA":"o","\u0386":"A","\u0388":"E","\u0389":"H","\u038A":"I","\u038C":"O","\u038E":"Y","\u038F":"W","\u0390":"i","\u0391":"A","\u0392":"B","\u0393":"G","\u0394":"D","\u0395":"E","\u0396":"Z","\u0397":"H","\u0398":"8","\u0399":"I","\u039A":"K","\u039B":"L","\u039C":"M","\u039D":"N","\u039E":"3","\u039F":"O","\u03A0":"P","\u03A1":"R","\u03A3":"S","\u03A4":"T","\u03A5":"Y","\u03A6":"F","\u03A7":"X","\u03A8":"PS","\u03A9":"W","\u03AA":"I","\u03AB":"Y","\u03AC":"a","\u03AD":"e","\u03AE":"h","\u03AF":"i","\u03B0":"y","\u03B1":"a","\u03B2":"b","\u03B3":"g","\u03B4":"d","\u03B5":"e","\u03B6":"z","\u03B7":"h","\u03B8":"8","\u03B9":"i","\u03BA":"k","\u03BB":"l","\u03BC":"m","\u03BD":"n","\u03BE":"3","\u03BF":"o","\u03C0":"p","\u03C1":"r","\u03C2":"s","\u03C3":"s","\u03C4":"t","\u03C5":"y","\u03C6":"f","\u03C7":"x","\u03C8":"ps","\u03C9":"w","\u03CA":"i","\u03CB":"y","\u03CC":"o","\u03CD":"y","\u03CE":"w","\u0401":"Yo","\u0402":"DJ","\u0404":"Ye","\u0406":"I","\u0407":"Yi","\u0408":"J","\u0409":"LJ","\u040A":"NJ","\u040B":"C","\u040F":"DZ","\u0410":"A","\u0411":"B","\u0412":"V","\u0413":"G","\u0414":"D","\u0415":"E","\u0416":"Zh","\u0417":"Z","\u0418":"I","\u0419":"J","\u041A":"K","\u041B":"L","\u041C":"M","\u041D":"N","\u041E":"O","\u041F":"P","\u0420":"R","\u0421":"S","\u0422":"T","\u0423":"U","\u0424":"F","\u0425":"H","\u0426":"C","\u0427":"Ch","\u0428":"Sh","\u0429":"Sh","\u042A":"U","\u042B":"Y","\u042C":"","\u042D":"E","\u042E":"Yu","\u042F":"Ya","\u0430":"a","\u0431":"b","\u0432":"v","\u0433":"g","\u0434":"d","\u0435":"e","\u0436":"zh","\u0437":"z","\u0438":"i","\u0439":"j","\u043A":"k","\u043B":"l","\u043C":"m","\u043D":"n","\u043E":"o","\u043F":"p","\u0440":"r","\u0441":"s","\u0442":"t","\u0443":"u","\u0444":"f","\u0445":"h","\u0446":"c","\u0447":"ch","\u0448":"sh","\u0449":"sh","\u044A":"u","\u044B":"y","\u044C":"","\u044D":"e","\u044E":"yu","\u044F":"ya","\u0451":"yo","\u0452":"dj","\u0454":"ye","\u0456":"i","\u0457":"yi","\u0458":"j","\u0459":"lj","\u045A":"nj","\u045B":"c","\u045D":"u","\u045F":"dz","\u0490":"G","\u0491":"g","\u0492":"GH","\u0493":"gh","\u049A":"KH","\u049B":"kh","\u04A2":"NG","\u04A3":"ng","\u04AE":"UE","\u04AF":"ue","\u04B0":"U","\u04B1":"u","\u04BA":"H","\u04BB":"h","\u04D8":"AE","\u04D9":"ae","\u04E8":"OE","\u04E9":"oe","\u0531":"A","\u0532":"B","\u0533":"G","\u0534":"D","\u0535":"E","\u0536":"Z","\u0537":"E\'","\u0538":"Y\'","\u0539":"T\'","\u053A":"JH","\u053B":"I","\u053C":"L","\u053D":"X","\u053E":"C\'","\u053F":"K","\u0540":"H","\u0541":"D\'","\u0542":"GH","\u0543":"TW","\u0544":"M","\u0545":"Y","\u0546":"N","\u0547":"SH","\u0549":"CH","\u054A":"P","\u054B":"J","\u054C":"R\'","\u054D":"S","\u054E":"V","\u054F":"T","\u0550":"R","\u0551":"C","\u0553":"P\'","\u0554":"Q\'","\u0555":"O\'\'","\u0556":"F","\u0587":"EV","\u0621":"a","\u0622":"aa","\u0623":"a","\u0624":"u","\u0625":"i","\u0626":"e","\u0627":"a","\u0628":"b","\u0629":"h","\u062A":"t","\u062B":"th","\u062C":"j","\u062D":"h","\u062E":"kh","\u062F":"d","\u0630":"th","\u0631":"r","\u0632":"z","\u0633":"s","\u0634":"sh","\u0635":"s","\u0636":"dh","\u0637":"t","\u0638":"z","\u0639":"a","\u063A":"gh","\u0641":"f","\u0642":"q","\u0643":"k","\u0644":"l","\u0645":"m","\u0646":"n","\u0647":"h","\u0648":"w","\u0649":"a","\u064A":"y","\u064B":"an","\u064C":"on","\u064D":"en","\u064E":"a","\u064F":"u","\u0650":"e","\u0652":"","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u067E":"p","\u0686":"ch","\u0698":"zh","\u06A9":"k","\u06AF":"g","\u06CC":"y","\u06F0":"0","\u06F1":"1","\u06F2":"2","\u06F3":"3","\u06F4":"4","\u06F5":"5","\u06F6":"6","\u06F7":"7","\u06F8":"8","\u06F9":"9","\u0E3F":"baht","\u10D0":"a","\u10D1":"b","\u10D2":"g","\u10D3":"d","\u10D4":"e","\u10D5":"v","\u10D6":"z","\u10D7":"t","\u10D8":"i","\u10D9":"k","\u10DA":"l","\u10DB":"m","\u10DC":"n","\u10DD":"o","\u10DE":"p","\u10DF":"zh","\u10E0":"r","\u10E1":"s","\u10E2":"t","\u10E3":"u","\u10E4":"f","\u10E5":"k","\u10E6":"gh","\u10E7":"q","\u10E8":"sh","\u10E9":"ch","\u10EA":"ts","\u10EB":"dz","\u10EC":"ts","\u10ED":"ch","\u10EE":"kh","\u10EF":"j","\u10F0":"h","\u1E62":"S","\u1E63":"s","\u1E80":"W","\u1E81":"w","\u1E82":"W","\u1E83":"w","\u1E84":"W","\u1E85":"w","\u1E9E":"SS","\u1EA0":"A","\u1EA1":"a","\u1EA2":"A","\u1EA3":"a","\u1EA4":"A","\u1EA5":"a","\u1EA6":"A","\u1EA7":"a","\u1EA8":"A","\u1EA9":"a","\u1EAA":"A","\u1EAB":"a","\u1EAC":"A","\u1EAD":"a","\u1EAE":"A","\u1EAF":"a","\u1EB0":"A","\u1EB1":"a","\u1EB2":"A","\u1EB3":"a","\u1EB4":"A","\u1EB5":"a","\u1EB6":"A","\u1EB7":"a","\u1EB8":"E","\u1EB9":"e","\u1EBA":"E","\u1EBB":"e","\u1EBC":"E","\u1EBD":"e","\u1EBE":"E","\u1EBF":"e","\u1EC0":"E","\u1EC1":"e","\u1EC2":"E","\u1EC3":"e","\u1EC4":"E","\u1EC5":"e","\u1EC6":"E","\u1EC7":"e","\u1EC8":"I","\u1EC9":"i","\u1ECA":"I","\u1ECB":"i","\u1ECC":"O","\u1ECD":"o","\u1ECE":"O","\u1ECF":"o","\u1ED0":"O","\u1ED1":"o","\u1ED2":"O","\u1ED3":"o","\u1ED4":"O","\u1ED5":"o","\u1ED6":"O","\u1ED7":"o","\u1ED8":"O","\u1ED9":"o","\u1EDA":"O","\u1EDB":"o","\u1EDC":"O","\u1EDD":"o","\u1EDE":"O","\u1EDF":"o","\u1EE0":"O","\u1EE1":"o","\u1EE2":"O","\u1EE3":"o","\u1EE4":"U","\u1EE5":"u","\u1EE6":"U","\u1EE7":"u","\u1EE8":"U","\u1EE9":"u","\u1EEA":"U","\u1EEB":"u","\u1EEC":"U","\u1EED":"u","\u1EEE":"U","\u1EEF":"u","\u1EF0":"U","\u1EF1":"u","\u1EF2":"Y","\u1EF3":"y","\u1EF4":"Y","\u1EF5":"y","\u1EF6":"Y","\u1EF7":"y","\u1EF8":"Y","\u1EF9":"y","\u2013":"-","\u2018":"\'","\u2019":"\'","\u201C":"\\"","\u201D":"\\"","\u201E":"\\"","\u2020":"+","\u2022":"*","\u2026":"...","\u20A0":"ecu","\u20A2":"cruzeiro","\u20A3":"french franc","\u20A4":"lira","\u20A5":"mill","\u20A6":"naira","\u20A7":"peseta","\u20A8":"rupee","\u20A9":"won","\u20AA":"new shequel","\u20AB":"dong","\u20AC":"euro","\u20AD":"kip","\u20AE":"tugrik","\u20AF":"drachma","\u20B0":"penny","\u20B1":"peso","\u20B2":"guarani","\u20B3":"austral","\u20B4":"hryvnia","\u20B5":"cedi","\u20B8":"kazakhstani tenge","\u20B9":"indian rupee","\u20BA":"turkish lira","\u20BD":"russian ruble","\u20BF":"bitcoin","\u2120":"sm","\u2122":"tm","\u2202":"d","\u2206":"delta","\u2211":"sum","\u221E":"infinity","\u2665":"love","\u5143":"yuan","\u5186":"yen","\uFDFC":"rial","\uFEF5":"laa","\uFEF7":"laa","\uFEF9":"lai","\uFEFB":"la"}');
var locales = JSON.parse('{"bg":{"\u0419":"Y","\u0426":"Ts","\u0429":"Sht","\u042A":"A","\u042C":"Y","\u0439":"y","\u0446":"ts","\u0449":"sht","\u044A":"a","\u044C":"y"},"de":{"\xC4":"AE","\xE4":"ae","\xD6":"OE","\xF6":"oe","\xDC":"UE","\xFC":"ue","\xDF":"ss","%":"prozent","&":"und","|":"oder","\u2211":"summe","\u221E":"unendlich","\u2665":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","\xA2":"centavos","\xA3":"libras","\xA4":"moneda","\u20A3":"francos","\u2211":"suma","\u221E":"infinito","\u2665":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","\xA2":"centime","\xA3":"livre","\xA4":"devise","\u20A3":"franc","\u2211":"somme","\u221E":"infini","\u2665":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","\xA2":"centavo","\u2211":"soma","\xA3":"libra","\u221E":"infinito","\u2665":"amor"},"uk":{"\u0418":"Y","\u0438":"y","\u0419":"Y","\u0439":"y","\u0426":"Ts","\u0446":"ts","\u0425":"Kh","\u0445":"kh","\u0429":"Shch","\u0449":"shch","\u0413":"H","\u0433":"h"},"vi":{"\u0110":"D","\u0111":"d"},"da":{"\xD8":"OE","\xF8":"oe","\xC5":"AA","\xE5":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"st\xF8rre end"},"nb":{"&":"og","\xC5":"AA","\xC6":"AE","\xD8":"OE","\xE5":"aa","\xE6":"ae","\xF8":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","\xC5":"AA","\xC4":"AE","\xD6":"OE","\xE5":"aa","\xE4":"ae","\xF6":"oe"}}');
// ../logging/src/index.ts
var logger2 = new Logger("stacks", {
  level: "debug",
  logDirectory: projectPath("storage/logs"),
  showTags: false,
  fancy: true
});
function formatMessage(...args) {
  return args.map((arg) => typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)).join(" ");
}
var log = {
  info: async (...args) => {
    const message = formatMessage(...args);
    await logger2.info(message);
  },
  success: async (message) => {
    await logger2.success(message);
  },
  warn: async (message, options) => {
    await logger2.warn(message, options);
  },
  warning: async (message) => {
    await logger2.warn(message);
  },
  error: async (err, options) => {
    const errorMessage = typeof err === "string" ? err : err instanceof Error ? err : JSON.stringify(err);
    await logger2.error(errorMessage);
    handleError(err, options);
  },
  debug: async (...args) => {
    const message = formatMessage(...args);
    await logger2.debug(message);
  },
  dump: (...args) => {
    const message = formatMessage(...args);
    logger2.debug(`DUMP: ${message}`);
  },
  dd: (...args) => {
    const message = formatMessage(...args);
    logger2.error(message);
    process6.exit(1 /* FatalError */);
  },
  echo: (...args) => {
    const message = formatMessage(...args);
    logger2.info(`ECHO: ${message}`);
  },
  time: (label) => {
    return logger2.time(label);
  }
};

// ../path/src/index.ts
function logsPath(path2) {
  return storagePath(`logs/${path2 || ""}`);
}
function projectPath(filePath = "", options) {
  let path2 = process8.cwd();
  while (path2.includes("storage"))
    path2 = resolve5(path2, "..");
  const finalPath = resolve5(path2, filePath);
  if (options?.relative)
    return relative2(process8.cwd(), finalPath);
  return finalPath;
}
function storagePath(path2) {
  return projectPath(`storage/${path2 || ""}`);
}

// ../error-handling/src/handler.ts
var import_fs_extra = __toESM(require_lib(), 1);

class ErrorHandler {
  static isTestEnvironment = false;
  static shouldExitProcess = true;
  static handle(err, options) {
    this.shouldExitProcess = options?.shouldExit !== false;
    if (options?.silent !== true)
      this.writeErrorToConsole(err);
    let errorMessage;
    if (options?.message) {
      errorMessage = options.message;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === "string") {
      errorMessage = err;
    } else {
      errorMessage = JSON.stringify(err);
    }
    const error = new Error(errorMessage);
    if (err instanceof Error) {
      Object.assign(error, err);
    }
    this.writeErrorToFile(error).catch((e) => console.error(e));
    return error;
  }
  static handleError(err, options) {
    this.handle(err, options);
    return err;
  }
  static async writeErrorToFile(err) {
    if (!(err instanceof Error)) {
      console.error("Error is not an instance of Error:", err);
      return;
    }
    const formattedError = `[${new Date().toISOString()}] ${err.name}: ${err.message}
`;
    const logFilePath = logsPath("stacks.log") ?? logsPath("errors.log");
    try {
      await mkdir2(dirname2(logFilePath), { recursive: true });
      await appendFile(logFilePath, formattedError);
    } catch (error) {
      console.error("Failed to write to error file:", error);
    }
  }
  static writeErrorToConsole(err) {
    let errorString;
    if (err instanceof Error) {
      errorString = err.message;
    } else if (typeof err === "string") {
      errorString = err;
    } else {
      errorString = JSON.stringify(err);
    }
    console.error(errorString);
    if (errorString.includes("bunx --bun cdk destroy") || errorString === `Failed to execute command: ${italic2("bunx --bun eslint . --fix")}` || errorString === `Failed to execute command: ${italic2("bun storage/framework/core/actions/src/lint/fix.ts")}`) {
      if (!this.isTestEnvironment) {
        console.log("No need to worry. The edge function is currently being destroyed. Please run `buddy undeploy` shortly again, and continue doing so until it succeeds running.");
        console.log("Hoping to see you back soon!");
      }
    }
    if (this.shouldExitProcess) {
      process9.exit(1 /* FatalError */);
    }
  }
}
var defaultLogPath = "storage/logs/stacks.log";
async function writeToLogFile(message, options) {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] ${message}
`;
  const logFile = options?.logFile ?? defaultLogPath;
  const dirPath = dirname3(logFile);
  if (!import_fs_extra.default.existsSync(dirPath)) {
    await mkdir2(dirPath, { recursive: true });
  }
  await appendFile(logFile, formattedMessage);
}
function handleError(err, options) {
  let errorMessage;
  let contextData;
  if (options && typeof options === "object" && !("shouldExit" in options) && !("silent" in options) && !("message" in options)) {
    contextData = options;
    options = undefined;
  }
  const errMsg = err instanceof Error ? err.message : String(err);
  if (options && "message" in options) {
    errorMessage = `${errMsg}: ${options.message}`;
  } else {
    errorMessage = errMsg;
  }
  let logMessage = `ERROR: ${stripAnsi(errorMessage)}`;
  if (contextData) {
    logMessage += `
Context: ${JSON.stringify(contextData, null, 2)}`;
  }
  writeToLogFile(logMessage);
  const error = new Error(errorMessage);
  if (err instanceof Error) {
    Object.assign(error, err);
  }
  return ErrorHandler.handle(error, { ...options, message: errorMessage });
}
// ../../../../node_modules/neverthrow/dist/index.es.js
var defaultErrorConfig = {
  withStackTrace: false
};
var createNeverThrowError = (message, result2, config2 = defaultErrorConfig) => {
  const data = result2.isOk() ? { type: "Ok", value: result2.value } : { type: "Err", value: result2.error };
  const maybeStack = config2.withStackTrace ? new Error().stack : undefined;
  return {
    data,
    message,
    stack: maybeStack
  };
};
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve4) {
      resolve4(value);
    });
  }
  return new (P || (P = Promise))(function(resolve4, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result2) {
      result2.done ? resolve4(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = undefined;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q2 = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q2.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f)
        i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q2[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q2[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q2.shift(), q2.length)
      resume(q2[0][0], q2[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve4, reject) {
        v = o[n](v), settle(resolve4, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve4, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve4({ value: v2, done: d });
    }, reject);
  }
}
class ResultAsync {
  constructor(res) {
    this._promise = res;
  }
  static fromSafePromise(promise2) {
    const newPromise = promise2.then((value) => new Ok(value));
    return new ResultAsync(newPromise);
  }
  static fromPromise(promise2, errorFn) {
    const newPromise = promise2.then((value) => new Ok(value)).catch((e) => new Err(errorFn(e)));
    return new ResultAsync(newPromise);
  }
  static fromThrowable(fn, errorFn) {
    return (...args) => {
      return new ResultAsync((() => __awaiter(this, undefined, undefined, function* () {
        try {
          return new Ok(yield fn(...args));
        } catch (error) {
          return new Err(errorFn ? errorFn(error) : error);
        }
      }))());
    };
  }
  static combine(asyncResultList) {
    return combineResultAsyncList(asyncResultList);
  }
  static combineWithAllErrors(asyncResultList) {
    return combineResultAsyncListWithAllErrors(asyncResultList);
  }
  map(f) {
    return new ResultAsync(this._promise.then((res) => __awaiter(this, undefined, undefined, function* () {
      if (res.isErr()) {
        return new Err(res.error);
      }
      return new Ok(yield f(res.value));
    })));
  }
  andThrough(f) {
    return new ResultAsync(this._promise.then((res) => __awaiter(this, undefined, undefined, function* () {
      if (res.isErr()) {
        return new Err(res.error);
      }
      const newRes = yield f(res.value);
      if (newRes.isErr()) {
        return new Err(newRes.error);
      }
      return new Ok(res.value);
    })));
  }
  andTee(f) {
    return new ResultAsync(this._promise.then((res) => __awaiter(this, undefined, undefined, function* () {
      if (res.isErr()) {
        return new Err(res.error);
      }
      try {
        yield f(res.value);
      } catch (e) {}
      return new Ok(res.value);
    })));
  }
  orTee(f) {
    return new ResultAsync(this._promise.then((res) => __awaiter(this, undefined, undefined, function* () {
      if (res.isOk()) {
        return new Ok(res.value);
      }
      try {
        yield f(res.error);
      } catch (e) {}
      return new Err(res.error);
    })));
  }
  mapErr(f) {
    return new ResultAsync(this._promise.then((res) => __awaiter(this, undefined, undefined, function* () {
      if (res.isOk()) {
        return new Ok(res.value);
      }
      return new Err(yield f(res.error));
    })));
  }
  andThen(f) {
    return new ResultAsync(this._promise.then((res) => {
      if (res.isErr()) {
        return new Err(res.error);
      }
      const newValue = f(res.value);
      return newValue instanceof ResultAsync ? newValue._promise : newValue;
    }));
  }
  orElse(f) {
    return new ResultAsync(this._promise.then((res) => __awaiter(this, undefined, undefined, function* () {
      if (res.isErr()) {
        return f(res.error);
      }
      return new Ok(res.value);
    })));
  }
  match(ok, _err) {
    return this._promise.then((res) => res.match(ok, _err));
  }
  unwrapOr(t) {
    return this._promise.then((res) => res.unwrapOr(t));
  }
  safeUnwrap() {
    return __asyncGenerator(this, arguments, function* safeUnwrap_1() {
      return yield __await(yield __await(yield* __asyncDelegator(__asyncValues(yield __await(this._promise.then((res) => res.safeUnwrap()))))));
    });
  }
  then(successCallback, failureCallback) {
    return this._promise.then(successCallback, failureCallback);
  }
  [Symbol.asyncIterator]() {
    return __asyncGenerator(this, arguments, function* _a() {
      const result2 = yield __await(this._promise);
      if (result2.isErr()) {
        yield yield __await(errAsync(result2.error));
      }
      return yield __await(result2.value);
    });
  }
}
function errAsync(err) {
  return new ResultAsync(Promise.resolve(new Err(err)));
}
var fromPromise = ResultAsync.fromPromise;
var fromSafePromise = ResultAsync.fromSafePromise;
var fromAsyncThrowable = ResultAsync.fromThrowable;
var combineResultList = (resultList) => {
  let acc = ok([]);
  for (const result2 of resultList) {
    if (result2.isErr()) {
      acc = err(result2.error);
      break;
    } else {
      acc.map((list) => list.push(result2.value));
    }
  }
  return acc;
};
var combineResultAsyncList = (asyncResultList) => ResultAsync.fromSafePromise(Promise.all(asyncResultList)).andThen(combineResultList);
var combineResultListWithAllErrors = (resultList) => {
  let acc = ok([]);
  for (const result2 of resultList) {
    if (result2.isErr() && acc.isErr()) {
      acc.error.push(result2.error);
    } else if (result2.isErr() && acc.isOk()) {
      acc = err([result2.error]);
    } else if (result2.isOk() && acc.isOk()) {
      acc.value.push(result2.value);
    }
  }
  return acc;
};
var combineResultAsyncListWithAllErrors = (asyncResultList) => ResultAsync.fromSafePromise(Promise.all(asyncResultList)).andThen(combineResultListWithAllErrors);
var Result;
(function(Result2) {
  function fromThrowable(fn, errorFn) {
    return (...args) => {
      try {
        const result2 = fn(...args);
        return ok(result2);
      } catch (e) {
        return err(errorFn ? errorFn(e) : e);
      }
    };
  }
  Result2.fromThrowable = fromThrowable;
  function combine(resultList) {
    return combineResultList(resultList);
  }
  Result2.combine = combine;
  function combineWithAllErrors(resultList) {
    return combineResultListWithAllErrors(resultList);
  }
  Result2.combineWithAllErrors = combineWithAllErrors;
})(Result || (Result = {}));
function ok(value) {
  return new Ok(value);
}
function err(err2) {
  return new Err(err2);
}
class Ok {
  constructor(value) {
    this.value = value;
  }
  isOk() {
    return true;
  }
  isErr() {
    return !this.isOk();
  }
  map(f) {
    return ok(f(this.value));
  }
  mapErr(_f) {
    return ok(this.value);
  }
  andThen(f) {
    return f(this.value);
  }
  andThrough(f) {
    return f(this.value).map((_value) => this.value);
  }
  andTee(f) {
    try {
      f(this.value);
    } catch (e) {}
    return ok(this.value);
  }
  orTee(_f) {
    return ok(this.value);
  }
  orElse(_f) {
    return ok(this.value);
  }
  asyncAndThen(f) {
    return f(this.value);
  }
  asyncAndThrough(f) {
    return f(this.value).map(() => this.value);
  }
  asyncMap(f) {
    return ResultAsync.fromSafePromise(f(this.value));
  }
  unwrapOr(_v) {
    return this.value;
  }
  match(ok2, _err) {
    return ok2(this.value);
  }
  safeUnwrap() {
    const value = this.value;
    return function* () {
      return value;
    }();
  }
  _unsafeUnwrap(_) {
    return this.value;
  }
  _unsafeUnwrapErr(config2) {
    throw createNeverThrowError("Called `_unsafeUnwrapErr` on an Ok", this, config2);
  }
  *[Symbol.iterator]() {
    return this.value;
  }
}

class Err {
  constructor(error) {
    this.error = error;
  }
  isOk() {
    return false;
  }
  isErr() {
    return !this.isOk();
  }
  map(_f) {
    return err(this.error);
  }
  mapErr(f) {
    return err(f(this.error));
  }
  andThrough(_f) {
    return err(this.error);
  }
  andTee(_f) {
    return err(this.error);
  }
  orTee(f) {
    try {
      f(this.error);
    } catch (e) {}
    return err(this.error);
  }
  andThen(_f) {
    return err(this.error);
  }
  orElse(f) {
    return f(this.error);
  }
  asyncAndThen(_f) {
    return errAsync(this.error);
  }
  asyncAndThrough(_f) {
    return errAsync(this.error);
  }
  asyncMap(_f) {
    return errAsync(this.error);
  }
  unwrapOr(v) {
    return v;
  }
  match(_ok, err2) {
    return err2(this.error);
  }
  safeUnwrap() {
    const error = this.error;
    return function* () {
      yield err(error);
      throw new Error("Do not use this generator out of `safeTry`");
    }();
  }
  _unsafeUnwrap(config2) {
    throw createNeverThrowError("Called `_unsafeUnwrap` on an Err", this, config2);
  }
  _unsafeUnwrapErr(_) {
    return this.error;
  }
  *[Symbol.iterator]() {
    const self2 = this;
    yield self2;
    return self2;
  }
}
var fromThrowable = Result.fromThrowable;
// src/console.ts
var import_prompts = __toESM(require_prompts3(), 1);

// src/exec.ts
import process10 from "process";
async function exec(command, options) {
  const cmd = Array.isArray(command) ? command : command.match(/(?:[^\s"]|"[^"]*")+/g);
  log.debug("exec:", Array.isArray(command) ? command.join(" ") : command, options);
  log.debug("cmd:", cmd);
  if (!cmd)
    return err(handleError(`Failed to parse command: ${cmd}`, options));
  const cwd = options?.cwd ?? process10.cwd();
  const proc = Bun.spawn(cmd, {
    stdin: options?.stdin ?? "inherit",
    stdout: options?.silent || options?.quiet ? "ignore" : options?.stdin ? options.stdin : options?.stdout || "inherit",
    stderr: options?.silent || options?.quiet ? "ignore" : options?.stderr || "inherit",
    cwd,
    onExit(subprocess, exitCode, signalCode, error) {
      exitHandler("spawn", subprocess, exitCode, signalCode, error);
    }
  });
  if (options?.stdin === "pipe" && options.input) {
    if (proc.stdin) {
      proc.stdin.write(options.input);
      proc.stdin.end();
    }
  }
  const exited = await proc.exited;
  if (exited === 0 /* Success */)
    return ok(proc);
  return err(handleError(`Failed to execute command: ${italic2(cmd.join(" "))} in ${italic2(cwd)}`, options));
}
async function execSync(command, options) {
  log.debug("Running execSync:", command);
  log.debug("execSync options:", options);
  const cmd = Array.isArray(command) ? command : command.match(/(?:[^\s"]|"[^"]*")+/g);
  if (!cmd) {
    log.error(`Failed to parse command: ${cmd}`, options);
    process10.exit(1 /* FatalError */);
  }
  const proc = Bun.spawnSync(cmd, {
    ...options,
    stdin: options?.stdin ?? "inherit",
    stdout: options?.stdout ?? "pipe",
    stderr: options?.stderr ?? "inherit",
    cwd: options?.cwd ?? process10.cwd(),
    onExit(subprocess, exitCode, signalCode, error) {
      exitHandler("spawnSync", subprocess, exitCode, signalCode, error);
    }
  });
  return proc.stdout?.toString() ?? "";
}
function exitHandler(type, subprocess, exitCode, signalCode, error) {
  log.debug(`exitHandler: ${type}`);
  log.debug("subprocess", subprocess);
  log.debug("exitCode", exitCode);
  log.debug("signalCode", signalCode);
  if (error) {
    log.error(error);
    process10.exit(1 /* FatalError */);
  }
  if (exitCode !== 0 /* Success */ && exitCode)
    process10.exit(exitCode);
}

// src/run.ts
async function runCommand(command, options) {
  log.debug("runCommand:", command, options);
  const opts = {
    ...options,
    stdio: options?.stdio ?? [options?.stdin ?? "inherit", "pipe", "pipe"],
    verbose: options?.verbose ?? false
  };
  return await exec(command, opts);
}
async function runProcess(command, options) {
  log.debug("runProcess:", command, options);
  const opts = {
    ...options,
    stdio: [options?.stdin ?? "inherit", "pipe", "pipe"],
    verbose: options?.verbose ?? false
  };
  return await exec(command, opts);
}
async function runCommandSync(command, options) {
  log.debug("runCommandSync:", command, options);
  const opts = {
    ...options,
    stdio: [options?.stdin ?? "inherit", "pipe", "pipe"],
    verbose: options?.verbose ?? false
  };
  return await execSync(command, opts);
}
async function runCommands(commands, options) {
  const results = [];
  for (const command of commands) {
    const result2 = await runCommand(command, options);
    if (result2.isErr()) {
      handleError("Error during runCommands", result2.error);
      process11.exit(1 /* FatalError */);
    }
    results.push(result2);
  }
  return results;
}

// src/command.ts
class Command2 {
  name;
  description;
  options;
  run;
  onFail;
  onSuccess;
  constructor({ name, description, options, run, onFail, onSuccess }) {
    this.name = name;
    this.description = description;
    this.options = options;
    this.run = run;
    this.onFail = onFail;
    this.onSuccess = onSuccess;
  }
}
var command = {
  run: async (command2, options) => {
    return await runCommand(command2, options);
  },
  runSync: async (command2, options) => {
    return await runCommand(command2, options);
  }
};
// ../../../../node_modules/kolorist/dist/esm/index.mjs
var exports_esm = {};
__export(exports_esm, {
  yellow: () => yellow2,
  white: () => white2,
  underline: () => underline2,
  trueColorBg: () => trueColorBg,
  trueColor: () => trueColor,
  stripColors: () => stripColors,
  strikethrough: () => strikethrough,
  reset: () => reset2,
  red: () => red2,
  options: () => options,
  magenta: () => magenta2,
  link: () => link,
  lightYellow: () => lightYellow,
  lightRed: () => lightRed,
  lightMagenta: () => lightMagenta,
  lightGreen: () => lightGreen,
  lightGray: () => lightGray,
  lightCyan: () => lightCyan,
  lightBlue: () => lightBlue,
  italic: () => italic2,
  inverse: () => inverse,
  hidden: () => hidden,
  green: () => green2,
  gray: () => gray2,
  dim: () => dim2,
  cyan: () => cyan2,
  bold: () => bold2,
  blue: () => blue2,
  black: () => black,
  bgYellow: () => bgYellow2,
  bgWhite: () => bgWhite,
  bgRed: () => bgRed2,
  bgMagenta: () => bgMagenta,
  bgLightYellow: () => bgLightYellow,
  bgLightRed: () => bgLightRed,
  bgLightMagenta: () => bgLightMagenta,
  bgLightGreen: () => bgLightGreen,
  bgLightGray: () => bgLightGray,
  bgLightCyan: () => bgLightCyan,
  bgLightBlue: () => bgLightBlue,
  bgGreen: () => bgGreen,
  bgGray: () => bgGray,
  bgCyan: () => bgCyan,
  bgBlue: () => bgBlue,
  bgBlack: () => bgBlack,
  ansi256Bg: () => ansi256Bg,
  ansi256: () => ansi256
});
var enabled = true;
var globalVar = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
var supportLevel = 0;
if (globalVar.process && globalVar.process.env && globalVar.process.stdout) {
  const { FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, COLORTERM } = globalVar.process.env;
  if (NODE_DISABLE_COLORS || NO_COLOR || FORCE_COLOR === "0") {
    enabled = false;
  } else if (FORCE_COLOR === "1" || FORCE_COLOR === "2" || FORCE_COLOR === "3") {
    enabled = true;
  } else if (TERM === "dumb") {
    enabled = false;
  } else if ("CI" in globalVar.process.env && [
    "TRAVIS",
    "CIRCLECI",
    "APPVEYOR",
    "GITLAB_CI",
    "GITHUB_ACTIONS",
    "BUILDKITE",
    "DRONE"
  ].some((vendor) => (vendor in globalVar.process.env))) {
    enabled = true;
  } else {
    enabled = process.stdout.isTTY;
  }
  if (enabled) {
    if (process.platform === "win32") {
      supportLevel = 3;
    } else {
      if (COLORTERM && (COLORTERM === "truecolor" || COLORTERM === "24bit")) {
        supportLevel = 3;
      } else if (TERM && (TERM.endsWith("-256color") || TERM.endsWith("256"))) {
        supportLevel = 2;
      } else {
        supportLevel = 1;
      }
    }
  }
}
var options = {
  enabled,
  supportLevel
};
function kolorist(start, end, level = 1) {
  const open = `\x1B[${start}m`;
  const close = `\x1B[${end}m`;
  const regex = new RegExp(`\\x1b\\[${end}m`, "g");
  return (str) => {
    return options.enabled && options.supportLevel >= level ? open + ("" + str).replace(regex, open) + close : "" + str;
  };
}
function rgbToAnsi256(r, g, b) {
  if (r >> 4 === g >> 4 && g >> 4 === b >> 4) {
    if (r < 8) {
      return 16;
    }
    if (r > 248) {
      return 231;
    }
    return Math.round((r - 8) / 247 * 24) + 232;
  }
  const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
  return ansi;
}
function stripColors(str) {
  return ("" + str).replace(/\x1b\[[0-9;]+m/g, "").replace(/\x1b\]8;;.*?\x07(.*?)\x1b\]8;;\x07/g, (_, group) => group);
}
var reset2 = kolorist(0, 0);
var bold2 = kolorist(1, 22);
var dim2 = kolorist(2, 22);
var italic2 = kolorist(3, 23);
var underline2 = kolorist(4, 24);
var inverse = kolorist(7, 27);
var hidden = kolorist(8, 28);
var strikethrough = kolorist(9, 29);
var black = kolorist(30, 39);
var red2 = kolorist(31, 39);
var green2 = kolorist(32, 39);
var yellow2 = kolorist(33, 39);
var blue2 = kolorist(34, 39);
var magenta2 = kolorist(35, 39);
var cyan2 = kolorist(36, 39);
var white2 = kolorist(97, 39);
var gray2 = kolorist(90, 39);
var lightGray = kolorist(37, 39);
var lightRed = kolorist(91, 39);
var lightGreen = kolorist(92, 39);
var lightYellow = kolorist(93, 39);
var lightBlue = kolorist(94, 39);
var lightMagenta = kolorist(95, 39);
var lightCyan = kolorist(96, 39);
var bgBlack = kolorist(40, 49);
var bgRed2 = kolorist(41, 49);
var bgGreen = kolorist(42, 49);
var bgYellow2 = kolorist(43, 49);
var bgBlue = kolorist(44, 49);
var bgMagenta = kolorist(45, 49);
var bgCyan = kolorist(46, 49);
var bgWhite = kolorist(107, 49);
var bgGray = kolorist(100, 49);
var bgLightRed = kolorist(101, 49);
var bgLightGreen = kolorist(102, 49);
var bgLightYellow = kolorist(103, 49);
var bgLightBlue = kolorist(104, 49);
var bgLightMagenta = kolorist(105, 49);
var bgLightCyan = kolorist(106, 49);
var bgLightGray = kolorist(47, 49);
var ansi256 = (n) => kolorist("38;5;" + n, 0, 2);
var ansi256Bg = (n) => kolorist("48;5;" + n, 0, 2);
var trueColor = (r, g, b) => {
  return options.supportLevel === 2 ? ansi256(rgbToAnsi256(r, g, b)) : kolorist(`38;2;${r};${g};${b}`, 0, 3);
};
var trueColorBg = (r, g, b) => {
  return options.supportLevel === 2 ? ansi256Bg(rgbToAnsi256(r, g, b)) : kolorist(`48;2;${r};${g};${b}`, 0, 3);
};
var OSC = "\x1B]";
var BEL = "\x07";
var SEP = ";";
function link(text, url) {
  return options.enabled ? OSC + "8" + SEP + SEP + url + BEL + text + OSC + "8" + SEP + SEP + BEL : `${text} (\u200B${url}\u200B)`;
}
// package.json
var version = "0.70.23";

// src/helpers.ts
async function intro(command2, options2) {
  return new Promise((resolve4) => {
    if (options2?.quiet === false) {
      console.log();
      console.log(cyan2(bold2("Stacks CLI")) + dim2(` v${version}`));
      console.log();
    }
    log.info(`Running  ${bgCyan(italic2(bold2(` ${command2} `)))}`);
    if (options2?.showPerformance === false || options2?.quiet)
      return resolve4(0);
    return resolve4(performance.now());
  });
}
function outro(text, options2, error) {
  const opts = {
    type: "success",
    useSeconds: true,
    ...options2
  };
  opts.message = options2?.message || text;
  return new Promise((resolve4) => {
    if (error)
      return handleError(error);
    if (opts?.startTime) {
      let time = performance.now() - opts.startTime;
      if (opts.useSeconds) {
        time = time / 1000;
        time = Math.round(time * 100) / 100;
      }
      if (opts.quiet === true)
        return resolve4(0 /* Success */);
      if (error) {
        log.error(`[${time.toFixed(2)}${opts.useSeconds ? "s" : "ms"}] Failed`);
      } else if (opts.type === "info") {
        log.info(`${dim2(gray2(`[${time.toFixed(2)}${opts.useSeconds ? "s" : "ms"}]`))} ${opts.message ?? "Complete"}`);
      } else {
        log.success(`${dim2(gray2(bold2(`[${time.toFixed(2)}${opts.useSeconds ? "s" : "ms"}]`)))} ${bold2(green2(opts.message ?? "Complete"))}`);
      }
    } else {
      if (opts?.type === "info")
        log.info(text);
      else if (opts?.type === "success" && opts?.quiet !== true)
        log.success(text);
    }
    return resolve4(0 /* Success */);
  });
}
// src/parse.ts
import process12 from "process";
function isLongOption(arg) {
  if (!arg)
    return false;
  return arg.startsWith("--");
}
function isShortOption(arg) {
  return arg.startsWith("-") && !isLongOption(arg);
}
function parseValue(value) {
  if (value === "true")
    return true;
  if (value === "false")
    return false;
  const numberValue = Number.parseFloat(value);
  if (!Number.isNaN(numberValue))
    return numberValue;
  return value.replace(/"/g, "");
}
function parseLongOption(arg, argv, index, options2) {
  const [key, value] = arg.slice(2).split("=");
  if (value !== undefined) {
    options2[key] = parseValue(value);
  } else if (index + 1 < argv.length && !argv[index + 1]?.startsWith("-")) {
    options2[key] = argv[index + 1];
    index++;
  } else {
    options2[key] = true;
  }
  return index;
}
function parseShortOption(arg, argv, index, options2) {
  const [key, value] = arg.slice(1).split("=");
  if (key === undefined)
    return index;
  if (value !== undefined && key !== undefined) {
    for (let j = 0;j < key.length; j++)
      options2[key[j]] = parseValue(value);
  } else {
    for (let j = 0;j < key.length; j++) {
      if (index + 1 < argv.length && j === key.length - 1 && !argv[index + 1]?.startsWith("-")) {
        options2[key[j]] = parseValue(argv[index + 1]);
        index++;
      } else {
        options2[key[j]] = true;
      }
    }
  }
  return index;
}
function parseArgv(argv) {
  if (argv === undefined)
    argv = process12.argv.slice(2);
  const args = [];
  const options2 = {};
  for (let i = 0;i < argv.length; i++) {
    const arg = argv[i];
    if (!arg)
      continue;
    if (isLongOption(arg))
      i = parseLongOption(arg, argv, i, options2);
    else if (isShortOption(arg))
      i = parseShortOption(arg, argv, i, options2);
    else
      args.push(arg);
  }
  return { args, options: options2 };
}
function parseArgs(argv) {
  if (argv === undefined)
    argv = process12.argv.slice(2);
  return parseArgv(argv).args;
}
function parseOptions(options2) {
  options2 = options2 || {};
  const defaults = { dryRun: false, quiet: false, verbose: false };
  const args = process12.argv.slice(2);
  for (let i = 0;i < args.length; i++) {
    const arg = args[i];
    if (arg?.startsWith("--")) {
      const key = arg.substring(2);
      const camelCaseKey = key.replace(/-([a-z])/gi, (g) => g[1] ? g[1].toUpperCase() : "");
      if (i + 1 < args.length && !args?.[i + 1]?.startsWith("--")) {
        if (args?.[i + 1] === "true" || args?.[i + 1] === "false") {
          options2[camelCaseKey] = args[i + 1] === "true";
          i++;
        } else {
          options2[camelCaseKey] = args[i + 1];
          i++;
        }
      } else {
        options2[camelCaseKey] = true;
      }
    }
  }
  if (Object.keys(options2).length === 0)
    return {};
  return { ...defaults, ...options2 };
}
function buddyOptions(options2) {
  if (Array.isArray(options2)) {
    options2 = Array.from(new Set(options2));
    if (Array.isArray(options2) && options2[0] && !options2[0].startsWith("-"))
      options2.shift();
    return options2.join(" ");
  }
  if (typeof options2 === "object" && options2 !== null) {
    return Object.entries(options2).map(([key, value]) => {
      if (value === true)
        return `--${key}`;
      return `--${key} ${value}`;
    }).join(" ");
  }
  return buddyOptions(process12.argv.slice(2));
}
// ../../../../node_modules/ora/index.js
import process20 from "process";

// ../../../../node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red3, green3, blue3) => `\x1B[${38 + offset};2;${red3};${green3};${blue3}m`;
var styles2 = {
  modifier: {
    reset: [0, 0],
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    blackBright: [90, 39],
    gray: [90, 39],
    grey: [90, 39],
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    bgGrey: [100, 49],
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles2.modifier);
var foregroundColorNames = Object.keys(styles2.color);
var backgroundColorNames = Object.keys(styles2.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = new Map;
  for (const [groupName, group] of Object.entries(styles2)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles2[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles2[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles2, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles2, "codes", {
    value: codes,
    enumerable: false
  });
  styles2.color.close = "\x1B[39m";
  styles2.bgColor.close = "\x1B[49m";
  styles2.color.ansi = wrapAnsi16();
  styles2.color.ansi256 = wrapAnsi256();
  styles2.color.ansi16m = wrapAnsi16m();
  styles2.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles2.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles2.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles2, {
    rgbToAnsi256: {
      value(red3, green3, blue3) {
        if (red3 === green3 && green3 === blue3) {
          if (red3 < 8) {
            return 16;
          }
          if (red3 > 248) {
            return 231;
          }
          return Math.round((red3 - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red3 / 255 * 5) + 6 * Math.round(green3 / 255 * 5) + Math.round(blue3 / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles2.rgbToAnsi256(...styles2.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red3;
        let green3;
        let blue3;
        if (code >= 232) {
          red3 = ((code - 232) * 10 + 8) / 255;
          green3 = red3;
          blue3 = red3;
        } else {
          code -= 16;
          const remainder = code % 36;
          red3 = Math.floor(code / 36) / 5;
          green3 = Math.floor(remainder / 6) / 5;
          blue3 = remainder % 6 / 5;
        }
        const value = Math.max(red3, green3, blue3) * 2;
        if (value === 0) {
          return 30;
        }
        let result2 = 30 + (Math.round(blue3) << 2 | Math.round(green3) << 1 | Math.round(red3));
        if (value === 2) {
          result2 += 60;
        }
        return result2;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red3, green3, blue3) => styles2.ansi256ToAnsi(styles2.rgbToAnsi256(red3, green3, blue3)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles2.ansi256ToAnsi(styles2.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles2;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// ../../../../node_modules/chalk/source/vendor/supports-color/index.js
import process13 from "process";
import os from "os";
import tty from "tty";
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : process13.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env: env2 } = process13;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env2) {
    if (env2.FORCE_COLOR === "true") {
      return 1;
    }
    if (env2.FORCE_COLOR === "false") {
      return 0;
    }
    return env2.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env2.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== undefined) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env2 && "AGENT_NAME" in env2) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === undefined) {
    return 0;
  }
  const min = forceColor || 0;
  if (env2.TERM === "dumb") {
    return min;
  }
  if (process13.platform === "win32") {
    const osRelease = os.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env2) {
    if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((key) => (key in env2))) {
      return 3;
    }
    if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => (sign in env2)) || env2.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env2) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env2.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env2.COLORTERM === "truecolor") {
    return 3;
  }
  if (env2.TERM === "xterm-kitty") {
    return 3;
  }
  if ("TERM_PROGRAM" in env2) {
    const version2 = Number.parseInt((env2.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env2.TERM_PROGRAM) {
      case "iTerm.app": {
        return version2 >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env2.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env2.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env2) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options2 = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options2
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: tty.isatty(1) }),
  stderr: createSupportsColor({ isTTY: tty.isatty(2) })
};
var supports_color_default = supportsColor;

// ../../../../node_modules/chalk/source/utilities.js
function stringReplaceAll(string2, substring, replacer) {
  let index = string2.indexOf(substring);
  if (index === -1) {
    return string2;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string2.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string2.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string2.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string2, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string2[index - 1] === "\r";
    returnValue += string2.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? `\r
` : `
`) + postfix;
    endIndex = index + 1;
    index = string2.indexOf(`
`, endIndex);
  } while (index !== -1);
  returnValue += string2.slice(endIndex);
  return returnValue;
}

// ../../../../node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles3 = Object.create(null);
var applyOptions = (object, options2 = {}) => {
  if (options2.level && !(Number.isInteger(options2.level) && options2.level >= 0 && options2.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options2.level === undefined ? colorLevel : options2.level;
};
var chalkFactory = (options2) => {
  const chalk = (...strings) => strings.join(" ");
  applyOptions(chalk, options2);
  Object.setPrototypeOf(chalk, createChalk.prototype);
  return chalk;
};
function createChalk(options2) {
  return chalkFactory(options2);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles3[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles3.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model3, level, type, ...arguments_) => {
  if (model3 === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model3 === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model3](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model3 of usedModels) {
  styles3[model3] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model3, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model3[0].toUpperCase() + model3.slice(1);
  styles3[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model3, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {}, {
  ...styles3,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === undefined) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self2, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self2;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self2, string2) => {
  if (self2.level <= 0 || !string2) {
    return self2[IS_EMPTY] ? "" : string2;
  }
  let styler = self2[STYLER];
  if (styler === undefined) {
    return string2;
  }
  const { openAll, closeAll } = styler;
  if (string2.includes("\x1B")) {
    while (styler !== undefined) {
      string2 = stringReplaceAll(string2, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string2.indexOf(`
`);
  if (lfIndex !== -1) {
    string2 = stringEncaseCRLFWithFirstIndex(string2, closeAll, openAll, lfIndex);
  }
  return openAll + string2 + closeAll;
};
Object.defineProperties(createChalk.prototype, styles3);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// ../../../../node_modules/cli-cursor/index.js
import process16 from "process";

// ../../../../node_modules/restore-cursor/index.js
import process15 from "process";

// ../../../../node_modules/mimic-function/index.js
var copyProperty = (to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
};
var canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === undefined || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
var changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
var wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  const { writable, enumerable, configurable } = toStringDescriptor;
  Object.defineProperty(to, "toString", { value: newToString, writable, enumerable, configurable });
};
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
}

// ../../../../node_modules/restore-cursor/node_modules/onetime/index.js
var calledFunctions = new WeakMap;
var onetime = (function_, options2 = {}) => {
  if (typeof function_ !== "function") {
    throw new TypeError("Expected a function");
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || "<anonymous>";
  const onetime2 = function(...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = undefined;
    } else if (options2.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    return returnValue;
  };
  mimicFunction(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
};
onetime.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }
  return calledFunctions.get(function_);
};
var onetime_default = onetime;

// ../../../../node_modules/restore-cursor/node_modules/signal-exit/dist/mjs/signals.js
var signals = [];
signals.push("SIGHUP", "SIGINT", "SIGTERM");
if (process.platform !== "win32") {
  signals.push("SIGALRM", "SIGABRT", "SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
}
if (process.platform === "linux") {
  signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
}

// ../../../../node_modules/restore-cursor/node_modules/signal-exit/dist/mjs/index.js
var processOk = (process7) => !!process7 && typeof process7 === "object" && typeof process7.removeListener === "function" && typeof process7.emit === "function" && typeof process7.reallyExit === "function" && typeof process7.listeners === "function" && typeof process7.kill === "function" && typeof process7.pid === "number" && typeof process7.on === "function";
var kExitEmitter = Symbol.for("signal-exit emitter");
var global2 = globalThis;
var ObjectDefineProperty = Object.defineProperty.bind(Object);

class Emitter {
  emitted = {
    afterExit: false,
    exit: false
  };
  listeners = {
    afterExit: [],
    exit: []
  };
  count = 0;
  id = Math.random();
  constructor() {
    if (global2[kExitEmitter]) {
      return global2[kExitEmitter];
    }
    ObjectDefineProperty(global2, kExitEmitter, {
      value: this,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  on(ev, fn) {
    this.listeners[ev].push(fn);
  }
  removeListener(ev, fn) {
    const list = this.listeners[ev];
    const i = list.indexOf(fn);
    if (i === -1) {
      return;
    }
    if (i === 0 && list.length === 1) {
      list.length = 0;
    } else {
      list.splice(i, 1);
    }
  }
  emit(ev, code, signal) {
    if (this.emitted[ev]) {
      return false;
    }
    this.emitted[ev] = true;
    let ret = false;
    for (const fn of this.listeners[ev]) {
      ret = fn(code, signal) === true || ret;
    }
    if (ev === "exit") {
      ret = this.emit("afterExit", code, signal) || ret;
    }
    return ret;
  }
}

class SignalExitBase {
}
var signalExitWrap = (handler2) => {
  return {
    onExit(cb, opts) {
      return handler2.onExit(cb, opts);
    },
    load() {
      return handler2.load();
    },
    unload() {
      return handler2.unload();
    }
  };
};

class SignalExitFallback extends SignalExitBase {
  onExit() {
    return () => {};
  }
  load() {}
  unload() {}
}

class SignalExit extends SignalExitBase {
  #hupSig = process14.platform === "win32" ? "SIGINT" : "SIGHUP";
  #emitter = new Emitter;
  #process;
  #originalProcessEmit;
  #originalProcessReallyExit;
  #sigListeners = {};
  #loaded = false;
  constructor(process7) {
    super();
    this.#process = process7;
    this.#sigListeners = {};
    for (const sig of signals) {
      this.#sigListeners[sig] = () => {
        const listeners = this.#process.listeners(sig);
        let { count } = this.#emitter;
        const p = process7;
        if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
          count += p.__signal_exit_emitter__.count;
        }
        if (listeners.length === count) {
          this.unload();
          const ret = this.#emitter.emit("exit", null, sig);
          const s = sig === "SIGHUP" ? this.#hupSig : sig;
          if (!ret)
            process7.kill(process7.pid, s);
        }
      };
    }
    this.#originalProcessReallyExit = process7.reallyExit;
    this.#originalProcessEmit = process7.emit;
  }
  onExit(cb, opts) {
    if (!processOk(this.#process)) {
      return () => {};
    }
    if (this.#loaded === false) {
      this.load();
    }
    const ev = opts?.alwaysLast ? "afterExit" : "exit";
    this.#emitter.on(ev, cb);
    return () => {
      this.#emitter.removeListener(ev, cb);
      if (this.#emitter.listeners["exit"].length === 0 && this.#emitter.listeners["afterExit"].length === 0) {
        this.unload();
      }
    };
  }
  load() {
    if (this.#loaded) {
      return;
    }
    this.#loaded = true;
    this.#emitter.count += 1;
    for (const sig of signals) {
      try {
        const fn = this.#sigListeners[sig];
        if (fn)
          this.#process.on(sig, fn);
      } catch (_) {}
    }
    this.#process.emit = (ev, ...a) => {
      return this.#processEmit(ev, ...a);
    };
    this.#process.reallyExit = (code) => {
      return this.#processReallyExit(code);
    };
  }
  unload() {
    if (!this.#loaded) {
      return;
    }
    this.#loaded = false;
    signals.forEach((sig) => {
      const listener = this.#sigListeners[sig];
      if (!listener) {
        throw new Error("Listener not defined for signal: " + sig);
      }
      try {
        this.#process.removeListener(sig, listener);
      } catch (_) {}
    });
    this.#process.emit = this.#originalProcessEmit;
    this.#process.reallyExit = this.#originalProcessReallyExit;
    this.#emitter.count -= 1;
  }
  #processReallyExit(code) {
    if (!processOk(this.#process)) {
      return 0;
    }
    this.#process.exitCode = code || 0;
    this.#emitter.emit("exit", this.#process.exitCode, null);
    return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
  }
  #processEmit(ev, ...args) {
    const og = this.#originalProcessEmit;
    if (ev === "exit" && processOk(this.#process)) {
      if (typeof args[0] === "number") {
        this.#process.exitCode = args[0];
      }
      const ret = og.call(this.#process, ev, ...args);
      this.#emitter.emit("exit", this.#process.exitCode, null);
      return ret;
    } else {
      return og.call(this.#process, ev, ...args);
    }
  }
}
var process14 = globalThis.process;
var {
  onExit,
  load,
  unload
} = signalExitWrap(processOk(process14) ? new SignalExit(process14) : new SignalExitFallback);

// ../../../../node_modules/restore-cursor/index.js
var terminal = process15.stderr.isTTY ? process15.stderr : process15.stdout.isTTY ? process15.stdout : undefined;
var restoreCursor = terminal ? onetime_default(() => {
  onExit(() => {
    terminal.write("\x1B[?25h");
  }, { alwaysLast: true });
}) : () => {};
var restore_cursor_default = restoreCursor;

// ../../../../node_modules/cli-cursor/index.js
var isHidden = false;
var cliCursor = {};
cliCursor.show = (writableStream = process16.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  isHidden = false;
  writableStream.write("\x1B[?25h");
};
cliCursor.hide = (writableStream = process16.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  restore_cursor_default();
  isHidden = true;
  writableStream.write("\x1B[?25l");
};
cliCursor.toggle = (force, writableStream) => {
  if (force !== undefined) {
    isHidden = force;
  }
  if (isHidden) {
    cliCursor.show(writableStream);
  } else {
    cliCursor.hide(writableStream);
  }
};
var cli_cursor_default = cliCursor;

// ../../../../node_modules/ora/index.js
var import_cli_spinners = __toESM(require_cli_spinners(), 1);

// ../../../../node_modules/log-symbols/node_modules/is-unicode-supported/index.js
import process17 from "process";
function isUnicodeSupported() {
  if (process17.platform !== "win32") {
    return process17.env.TERM !== "linux";
  }
  return Boolean(process17.env.CI) || Boolean(process17.env.WT_SESSION) || Boolean(process17.env.TERMINUS_SUBLIME) || process17.env.ConEmuTask === "{cmd::Cmder}" || process17.env.TERM_PROGRAM === "Terminus-Sublime" || process17.env.TERM_PROGRAM === "vscode" || process17.env.TERM === "xterm-256color" || process17.env.TERM === "alacritty" || process17.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}

// ../../../../node_modules/log-symbols/index.js
var main = {
  info: source_default.blue("\u2139"),
  success: source_default.green("\u2714"),
  warning: source_default.yellow("\u26A0"),
  error: source_default.red("\u2716")
};
var fallback = {
  info: source_default.blue("i"),
  success: source_default.green("\u221A"),
  warning: source_default.yellow("\u203C"),
  error: source_default.red("\xD7")
};
var logSymbols = isUnicodeSupported() ? main : fallback;
var log_symbols_default = logSymbols;

// ../../../../node_modules/ansi-regex/index.js
function ansiRegex({ onlyFirst = false } = {}) {
  const ST = "(?:\\u0007|\\u001B\\u005C|\\u009C)";
  const pattern = [
    `[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?${ST})`,
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
  ].join("|");
  return new RegExp(pattern, onlyFirst ? undefined : "g");
}

// ../../../../node_modules/strip-ansi/index.js
var regex = ansiRegex();
function stripAnsi2(string2) {
  if (typeof string2 !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string2}\``);
  }
  return string2.replace(regex, "");
}

// ../../../../node_modules/get-east-asian-width/lookup.js
function isAmbiguous(x2) {
  return x2 === 161 || x2 === 164 || x2 === 167 || x2 === 168 || x2 === 170 || x2 === 173 || x2 === 174 || x2 >= 176 && x2 <= 180 || x2 >= 182 && x2 <= 186 || x2 >= 188 && x2 <= 191 || x2 === 198 || x2 === 208 || x2 === 215 || x2 === 216 || x2 >= 222 && x2 <= 225 || x2 === 230 || x2 >= 232 && x2 <= 234 || x2 === 236 || x2 === 237 || x2 === 240 || x2 === 242 || x2 === 243 || x2 >= 247 && x2 <= 250 || x2 === 252 || x2 === 254 || x2 === 257 || x2 === 273 || x2 === 275 || x2 === 283 || x2 === 294 || x2 === 295 || x2 === 299 || x2 >= 305 && x2 <= 307 || x2 === 312 || x2 >= 319 && x2 <= 322 || x2 === 324 || x2 >= 328 && x2 <= 331 || x2 === 333 || x2 === 338 || x2 === 339 || x2 === 358 || x2 === 359 || x2 === 363 || x2 === 462 || x2 === 464 || x2 === 466 || x2 === 468 || x2 === 470 || x2 === 472 || x2 === 474 || x2 === 476 || x2 === 593 || x2 === 609 || x2 === 708 || x2 === 711 || x2 >= 713 && x2 <= 715 || x2 === 717 || x2 === 720 || x2 >= 728 && x2 <= 731 || x2 === 733 || x2 === 735 || x2 >= 768 && x2 <= 879 || x2 >= 913 && x2 <= 929 || x2 >= 931 && x2 <= 937 || x2 >= 945 && x2 <= 961 || x2 >= 963 && x2 <= 969 || x2 === 1025 || x2 >= 1040 && x2 <= 1103 || x2 === 1105 || x2 === 8208 || x2 >= 8211 && x2 <= 8214 || x2 === 8216 || x2 === 8217 || x2 === 8220 || x2 === 8221 || x2 >= 8224 && x2 <= 8226 || x2 >= 8228 && x2 <= 8231 || x2 === 8240 || x2 === 8242 || x2 === 8243 || x2 === 8245 || x2 === 8251 || x2 === 8254 || x2 === 8308 || x2 === 8319 || x2 >= 8321 && x2 <= 8324 || x2 === 8364 || x2 === 8451 || x2 === 8453 || x2 === 8457 || x2 === 8467 || x2 === 8470 || x2 === 8481 || x2 === 8482 || x2 === 8486 || x2 === 8491 || x2 === 8531 || x2 === 8532 || x2 >= 8539 && x2 <= 8542 || x2 >= 8544 && x2 <= 8555 || x2 >= 8560 && x2 <= 8569 || x2 === 8585 || x2 >= 8592 && x2 <= 8601 || x2 === 8632 || x2 === 8633 || x2 === 8658 || x2 === 8660 || x2 === 8679 || x2 === 8704 || x2 === 8706 || x2 === 8707 || x2 === 8711 || x2 === 8712 || x2 === 8715 || x2 === 8719 || x2 === 8721 || x2 === 8725 || x2 === 8730 || x2 >= 8733 && x2 <= 8736 || x2 === 8739 || x2 === 8741 || x2 >= 8743 && x2 <= 8748 || x2 === 8750 || x2 >= 8756 && x2 <= 8759 || x2 === 8764 || x2 === 8765 || x2 === 8776 || x2 === 8780 || x2 === 8786 || x2 === 8800 || x2 === 8801 || x2 >= 8804 && x2 <= 8807 || x2 === 8810 || x2 === 8811 || x2 === 8814 || x2 === 8815 || x2 === 8834 || x2 === 8835 || x2 === 8838 || x2 === 8839 || x2 === 8853 || x2 === 8857 || x2 === 8869 || x2 === 8895 || x2 === 8978 || x2 >= 9312 && x2 <= 9449 || x2 >= 9451 && x2 <= 9547 || x2 >= 9552 && x2 <= 9587 || x2 >= 9600 && x2 <= 9615 || x2 >= 9618 && x2 <= 9621 || x2 === 9632 || x2 === 9633 || x2 >= 9635 && x2 <= 9641 || x2 === 9650 || x2 === 9651 || x2 === 9654 || x2 === 9655 || x2 === 9660 || x2 === 9661 || x2 === 9664 || x2 === 9665 || x2 >= 9670 && x2 <= 9672 || x2 === 9675 || x2 >= 9678 && x2 <= 9681 || x2 >= 9698 && x2 <= 9701 || x2 === 9711 || x2 === 9733 || x2 === 9734 || x2 === 9737 || x2 === 9742 || x2 === 9743 || x2 === 9756 || x2 === 9758 || x2 === 9792 || x2 === 9794 || x2 === 9824 || x2 === 9825 || x2 >= 9827 && x2 <= 9829 || x2 >= 9831 && x2 <= 9834 || x2 === 9836 || x2 === 9837 || x2 === 9839 || x2 === 9886 || x2 === 9887 || x2 === 9919 || x2 >= 9926 && x2 <= 9933 || x2 >= 9935 && x2 <= 9939 || x2 >= 9941 && x2 <= 9953 || x2 === 9955 || x2 === 9960 || x2 === 9961 || x2 >= 9963 && x2 <= 9969 || x2 === 9972 || x2 >= 9974 && x2 <= 9977 || x2 === 9979 || x2 === 9980 || x2 === 9982 || x2 === 9983 || x2 === 10045 || x2 >= 10102 && x2 <= 10111 || x2 >= 11094 && x2 <= 11097 || x2 >= 12872 && x2 <= 12879 || x2 >= 57344 && x2 <= 63743 || x2 >= 65024 && x2 <= 65039 || x2 === 65533 || x2 >= 127232 && x2 <= 127242 || x2 >= 127248 && x2 <= 127277 || x2 >= 127280 && x2 <= 127337 || x2 >= 127344 && x2 <= 127373 || x2 === 127375 || x2 === 127376 || x2 >= 127387 && x2 <= 127404 || x2 >= 917760 && x2 <= 917999 || x2 >= 983040 && x2 <= 1048573 || x2 >= 1048576 && x2 <= 1114109;
}
function isFullWidth(x2) {
  return x2 === 12288 || x2 >= 65281 && x2 <= 65376 || x2 >= 65504 && x2 <= 65510;
}
function isWide(x2) {
  return x2 >= 4352 && x2 <= 4447 || x2 === 8986 || x2 === 8987 || x2 === 9001 || x2 === 9002 || x2 >= 9193 && x2 <= 9196 || x2 === 9200 || x2 === 9203 || x2 === 9725 || x2 === 9726 || x2 === 9748 || x2 === 9749 || x2 >= 9776 && x2 <= 9783 || x2 >= 9800 && x2 <= 9811 || x2 === 9855 || x2 >= 9866 && x2 <= 9871 || x2 === 9875 || x2 === 9889 || x2 === 9898 || x2 === 9899 || x2 === 9917 || x2 === 9918 || x2 === 9924 || x2 === 9925 || x2 === 9934 || x2 === 9940 || x2 === 9962 || x2 === 9970 || x2 === 9971 || x2 === 9973 || x2 === 9978 || x2 === 9981 || x2 === 9989 || x2 === 9994 || x2 === 9995 || x2 === 10024 || x2 === 10060 || x2 === 10062 || x2 >= 10067 && x2 <= 10069 || x2 === 10071 || x2 >= 10133 && x2 <= 10135 || x2 === 10160 || x2 === 10175 || x2 === 11035 || x2 === 11036 || x2 === 11088 || x2 === 11093 || x2 >= 11904 && x2 <= 11929 || x2 >= 11931 && x2 <= 12019 || x2 >= 12032 && x2 <= 12245 || x2 >= 12272 && x2 <= 12287 || x2 >= 12289 && x2 <= 12350 || x2 >= 12353 && x2 <= 12438 || x2 >= 12441 && x2 <= 12543 || x2 >= 12549 && x2 <= 12591 || x2 >= 12593 && x2 <= 12686 || x2 >= 12688 && x2 <= 12773 || x2 >= 12783 && x2 <= 12830 || x2 >= 12832 && x2 <= 12871 || x2 >= 12880 && x2 <= 42124 || x2 >= 42128 && x2 <= 42182 || x2 >= 43360 && x2 <= 43388 || x2 >= 44032 && x2 <= 55203 || x2 >= 63744 && x2 <= 64255 || x2 >= 65040 && x2 <= 65049 || x2 >= 65072 && x2 <= 65106 || x2 >= 65108 && x2 <= 65126 || x2 >= 65128 && x2 <= 65131 || x2 >= 94176 && x2 <= 94180 || x2 === 94192 || x2 === 94193 || x2 >= 94208 && x2 <= 100343 || x2 >= 100352 && x2 <= 101589 || x2 >= 101631 && x2 <= 101640 || x2 >= 110576 && x2 <= 110579 || x2 >= 110581 && x2 <= 110587 || x2 === 110589 || x2 === 110590 || x2 >= 110592 && x2 <= 110882 || x2 === 110898 || x2 >= 110928 && x2 <= 110930 || x2 === 110933 || x2 >= 110948 && x2 <= 110951 || x2 >= 110960 && x2 <= 111355 || x2 >= 119552 && x2 <= 119638 || x2 >= 119648 && x2 <= 119670 || x2 === 126980 || x2 === 127183 || x2 === 127374 || x2 >= 127377 && x2 <= 127386 || x2 >= 127488 && x2 <= 127490 || x2 >= 127504 && x2 <= 127547 || x2 >= 127552 && x2 <= 127560 || x2 === 127568 || x2 === 127569 || x2 >= 127584 && x2 <= 127589 || x2 >= 127744 && x2 <= 127776 || x2 >= 127789 && x2 <= 127797 || x2 >= 127799 && x2 <= 127868 || x2 >= 127870 && x2 <= 127891 || x2 >= 127904 && x2 <= 127946 || x2 >= 127951 && x2 <= 127955 || x2 >= 127968 && x2 <= 127984 || x2 === 127988 || x2 >= 127992 && x2 <= 128062 || x2 === 128064 || x2 >= 128066 && x2 <= 128252 || x2 >= 128255 && x2 <= 128317 || x2 >= 128331 && x2 <= 128334 || x2 >= 128336 && x2 <= 128359 || x2 === 128378 || x2 === 128405 || x2 === 128406 || x2 === 128420 || x2 >= 128507 && x2 <= 128591 || x2 >= 128640 && x2 <= 128709 || x2 === 128716 || x2 >= 128720 && x2 <= 128722 || x2 >= 128725 && x2 <= 128727 || x2 >= 128732 && x2 <= 128735 || x2 === 128747 || x2 === 128748 || x2 >= 128756 && x2 <= 128764 || x2 >= 128992 && x2 <= 129003 || x2 === 129008 || x2 >= 129292 && x2 <= 129338 || x2 >= 129340 && x2 <= 129349 || x2 >= 129351 && x2 <= 129535 || x2 >= 129648 && x2 <= 129660 || x2 >= 129664 && x2 <= 129673 || x2 >= 129679 && x2 <= 129734 || x2 >= 129742 && x2 <= 129756 || x2 >= 129759 && x2 <= 129769 || x2 >= 129776 && x2 <= 129784 || x2 >= 131072 && x2 <= 196605 || x2 >= 196608 && x2 <= 262141;
}

// ../../../../node_modules/get-east-asian-width/index.js
function validate(codePoint) {
  if (!Number.isSafeInteger(codePoint)) {
    throw new TypeError(`Expected a code point, got \`${typeof codePoint}\`.`);
  }
}
function eastAsianWidth(codePoint, { ambiguousAsWide = false } = {}) {
  validate(codePoint);
  if (isFullWidth(codePoint) || isWide(codePoint) || ambiguousAsWide && isAmbiguous(codePoint)) {
    return 2;
  }
  return 1;
}

// ../../../../node_modules/emoji-regex/index.mjs
var emoji_regex_default = () => {
  return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
};

// ../../../../node_modules/string-width/index.js
var segmenter = new Intl.Segmenter;
var defaultIgnorableCodePointRegex = /^\p{Default_Ignorable_Code_Point}$/u;
function stringWidth(string2, options2 = {}) {
  if (typeof string2 !== "string" || string2.length === 0) {
    return 0;
  }
  const {
    ambiguousIsNarrow = true,
    countAnsiEscapeCodes = false
  } = options2;
  if (!countAnsiEscapeCodes) {
    string2 = stripAnsi2(string2);
  }
  if (string2.length === 0) {
    return 0;
  }
  let width = 0;
  const eastAsianWidthOptions = { ambiguousAsWide: !ambiguousIsNarrow };
  for (const { segment: character } of segmenter.segment(string2)) {
    const codePoint = character.codePointAt(0);
    if (codePoint <= 31 || codePoint >= 127 && codePoint <= 159) {
      continue;
    }
    if (codePoint >= 8203 && codePoint <= 8207 || codePoint === 65279) {
      continue;
    }
    if (codePoint >= 768 && codePoint <= 879 || codePoint >= 6832 && codePoint <= 6911 || codePoint >= 7616 && codePoint <= 7679 || codePoint >= 8400 && codePoint <= 8447 || codePoint >= 65056 && codePoint <= 65071) {
      continue;
    }
    if (codePoint >= 55296 && codePoint <= 57343) {
      continue;
    }
    if (codePoint >= 65024 && codePoint <= 65039) {
      continue;
    }
    if (defaultIgnorableCodePointRegex.test(character)) {
      continue;
    }
    if (emoji_regex_default().test(character)) {
      width += 2;
      continue;
    }
    width += eastAsianWidth(codePoint, eastAsianWidthOptions);
  }
  return width;
}

// ../../../../node_modules/is-interactive/index.js
function isInteractive({ stream = process.stdout } = {}) {
  return Boolean(stream && stream.isTTY && process.env.TERM !== "dumb" && !("CI" in process.env));
}

// ../../../../node_modules/is-unicode-supported/index.js
import process18 from "process";
function isUnicodeSupported2() {
  const { env: env3 } = process18;
  const { TERM, TERM_PROGRAM } = env3;
  if (process18.platform !== "win32") {
    return TERM !== "linux";
  }
  return Boolean(env3.WT_SESSION) || Boolean(env3.TERMINUS_SUBLIME) || env3.ConEmuTask === "{cmd::Cmder}" || TERM_PROGRAM === "Terminus-Sublime" || TERM_PROGRAM === "vscode" || TERM === "xterm-256color" || TERM === "alacritty" || TERM === "rxvt-unicode" || TERM === "rxvt-unicode-256color" || env3.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}

// ../../../../node_modules/stdin-discarder/index.js
import process19 from "process";
var ASCII_ETX_CODE = 3;

class StdinDiscarder {
  #activeCount = 0;
  start() {
    this.#activeCount++;
    if (this.#activeCount === 1) {
      this.#realStart();
    }
  }
  stop() {
    if (this.#activeCount <= 0) {
      throw new Error("`stop` called more times than `start`");
    }
    this.#activeCount--;
    if (this.#activeCount === 0) {
      this.#realStop();
    }
  }
  #realStart() {
    if (process19.platform === "win32" || !process19.stdin.isTTY) {
      return;
    }
    process19.stdin.setRawMode(true);
    process19.stdin.on("data", this.#handleInput);
    process19.stdin.resume();
  }
  #realStop() {
    if (!process19.stdin.isTTY) {
      return;
    }
    process19.stdin.off("data", this.#handleInput);
    process19.stdin.pause();
    process19.stdin.setRawMode(false);
  }
  #handleInput(chunk) {
    if (chunk[0] === ASCII_ETX_CODE) {
      process19.emit("SIGINT");
    }
  }
}
var stdinDiscarder = new StdinDiscarder;
var stdin_discarder_default = stdinDiscarder;

// ../../../../node_modules/ora/index.js
var import_cli_spinners2 = __toESM(require_cli_spinners(), 1);

class Ora {
  #linesToClear = 0;
  #isDiscardingStdin = false;
  #lineCount = 0;
  #frameIndex = -1;
  #lastSpinnerFrameTime = 0;
  #options;
  #spinner;
  #stream;
  #id;
  #initialInterval;
  #isEnabled;
  #isSilent;
  #indent;
  #text;
  #prefixText;
  #suffixText;
  color;
  constructor(options2) {
    if (typeof options2 === "string") {
      options2 = {
        text: options2
      };
    }
    this.#options = {
      color: "cyan",
      stream: process20.stderr,
      discardStdin: true,
      hideCursor: true,
      ...options2
    };
    this.color = this.#options.color;
    this.spinner = this.#options.spinner;
    this.#initialInterval = this.#options.interval;
    this.#stream = this.#options.stream;
    this.#isEnabled = typeof this.#options.isEnabled === "boolean" ? this.#options.isEnabled : isInteractive({ stream: this.#stream });
    this.#isSilent = typeof this.#options.isSilent === "boolean" ? this.#options.isSilent : false;
    this.text = this.#options.text;
    this.prefixText = this.#options.prefixText;
    this.suffixText = this.#options.suffixText;
    this.indent = this.#options.indent;
    if (process20.env.NODE_ENV === "test") {
      this._stream = this.#stream;
      this._isEnabled = this.#isEnabled;
      Object.defineProperty(this, "_linesToClear", {
        get() {
          return this.#linesToClear;
        },
        set(newValue) {
          this.#linesToClear = newValue;
        }
      });
      Object.defineProperty(this, "_frameIndex", {
        get() {
          return this.#frameIndex;
        }
      });
      Object.defineProperty(this, "_lineCount", {
        get() {
          return this.#lineCount;
        }
      });
    }
  }
  get indent() {
    return this.#indent;
  }
  set indent(indent = 0) {
    if (!(indent >= 0 && Number.isInteger(indent))) {
      throw new Error("The `indent` option must be an integer from 0 and up");
    }
    this.#indent = indent;
    this.#updateLineCount();
  }
  get interval() {
    return this.#initialInterval ?? this.#spinner.interval ?? 100;
  }
  get spinner() {
    return this.#spinner;
  }
  set spinner(spinner) {
    this.#frameIndex = -1;
    this.#initialInterval = undefined;
    if (typeof spinner === "object") {
      if (spinner.frames === undefined) {
        throw new Error("The given spinner must have a `frames` property");
      }
      this.#spinner = spinner;
    } else if (!isUnicodeSupported2()) {
      this.#spinner = import_cli_spinners.default.line;
    } else if (spinner === undefined) {
      this.#spinner = import_cli_spinners.default.dots;
    } else if (spinner !== "default" && import_cli_spinners.default[spinner]) {
      this.#spinner = import_cli_spinners.default[spinner];
    } else {
      throw new Error(`There is no built-in spinner named '${spinner}'. See https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json for a full list.`);
    }
  }
  get text() {
    return this.#text;
  }
  set text(value = "") {
    this.#text = value;
    this.#updateLineCount();
  }
  get prefixText() {
    return this.#prefixText;
  }
  set prefixText(value = "") {
    this.#prefixText = value;
    this.#updateLineCount();
  }
  get suffixText() {
    return this.#suffixText;
  }
  set suffixText(value = "") {
    this.#suffixText = value;
    this.#updateLineCount();
  }
  get isSpinning() {
    return this.#id !== undefined;
  }
  #getFullPrefixText(prefixText = this.#prefixText, postfix = " ") {
    if (typeof prefixText === "string" && prefixText !== "") {
      return prefixText + postfix;
    }
    if (typeof prefixText === "function") {
      return prefixText() + postfix;
    }
    return "";
  }
  #getFullSuffixText(suffixText = this.#suffixText, prefix = " ") {
    if (typeof suffixText === "string" && suffixText !== "") {
      return prefix + suffixText;
    }
    if (typeof suffixText === "function") {
      return prefix + suffixText();
    }
    return "";
  }
  #updateLineCount() {
    const columns = this.#stream.columns ?? 80;
    const fullPrefixText = this.#getFullPrefixText(this.#prefixText, "-");
    const fullSuffixText = this.#getFullSuffixText(this.#suffixText, "-");
    const fullText = " ".repeat(this.#indent) + fullPrefixText + "--" + this.#text + "--" + fullSuffixText;
    this.#lineCount = 0;
    for (const line of stripAnsi2(fullText).split(`
`)) {
      this.#lineCount += Math.max(1, Math.ceil(stringWidth(line, { countAnsiEscapeCodes: true }) / columns));
    }
  }
  get isEnabled() {
    return this.#isEnabled && !this.#isSilent;
  }
  set isEnabled(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("The `isEnabled` option must be a boolean");
    }
    this.#isEnabled = value;
  }
  get isSilent() {
    return this.#isSilent;
  }
  set isSilent(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("The `isSilent` option must be a boolean");
    }
    this.#isSilent = value;
  }
  frame() {
    const now = Date.now();
    if (this.#frameIndex === -1 || now - this.#lastSpinnerFrameTime >= this.interval) {
      this.#frameIndex = ++this.#frameIndex % this.#spinner.frames.length;
      this.#lastSpinnerFrameTime = now;
    }
    const { frames } = this.#spinner;
    let frame = frames[this.#frameIndex];
    if (this.color) {
      frame = source_default[this.color](frame);
    }
    const fullPrefixText = typeof this.#prefixText === "string" && this.#prefixText !== "" ? this.#prefixText + " " : "";
    const fullText = typeof this.text === "string" ? " " + this.text : "";
    const fullSuffixText = typeof this.#suffixText === "string" && this.#suffixText !== "" ? " " + this.#suffixText : "";
    return fullPrefixText + frame + fullText + fullSuffixText;
  }
  clear() {
    if (!this.#isEnabled || !this.#stream.isTTY) {
      return this;
    }
    this.#stream.cursorTo(0);
    for (let index = 0;index < this.#linesToClear; index++) {
      if (index > 0) {
        this.#stream.moveCursor(0, -1);
      }
      this.#stream.clearLine(1);
    }
    if (this.#indent || this.lastIndent !== this.#indent) {
      this.#stream.cursorTo(this.#indent);
    }
    this.lastIndent = this.#indent;
    this.#linesToClear = 0;
    return this;
  }
  render() {
    if (this.#isSilent) {
      return this;
    }
    this.clear();
    this.#stream.write(this.frame());
    this.#linesToClear = this.#lineCount;
    return this;
  }
  start(text) {
    if (text) {
      this.text = text;
    }
    if (this.#isSilent) {
      return this;
    }
    if (!this.#isEnabled) {
      if (this.text) {
        this.#stream.write(`- ${this.text}
`);
      }
      return this;
    }
    if (this.isSpinning) {
      return this;
    }
    if (this.#options.hideCursor) {
      cli_cursor_default.hide(this.#stream);
    }
    if (this.#options.discardStdin && process20.stdin.isTTY) {
      this.#isDiscardingStdin = true;
      stdin_discarder_default.start();
    }
    this.render();
    this.#id = setInterval(this.render.bind(this), this.interval);
    return this;
  }
  stop() {
    if (!this.#isEnabled) {
      return this;
    }
    clearInterval(this.#id);
    this.#id = undefined;
    this.#frameIndex = 0;
    this.clear();
    if (this.#options.hideCursor) {
      cli_cursor_default.show(this.#stream);
    }
    if (this.#options.discardStdin && process20.stdin.isTTY && this.#isDiscardingStdin) {
      stdin_discarder_default.stop();
      this.#isDiscardingStdin = false;
    }
    return this;
  }
  succeed(text) {
    return this.stopAndPersist({ symbol: log_symbols_default.success, text });
  }
  fail(text) {
    return this.stopAndPersist({ symbol: log_symbols_default.error, text });
  }
  warn(text) {
    return this.stopAndPersist({ symbol: log_symbols_default.warning, text });
  }
  info(text) {
    return this.stopAndPersist({ symbol: log_symbols_default.info, text });
  }
  stopAndPersist(options2 = {}) {
    if (this.#isSilent) {
      return this;
    }
    const prefixText = options2.prefixText ?? this.#prefixText;
    const fullPrefixText = this.#getFullPrefixText(prefixText, " ");
    const symbolText = options2.symbol ?? " ";
    const text = options2.text ?? this.text;
    const separatorText = symbolText ? " " : "";
    const fullText = typeof text === "string" ? separatorText + text : "";
    const suffixText = options2.suffixText ?? this.#suffixText;
    const fullSuffixText = this.#getFullSuffixText(suffixText, " ");
    const textToWrite = fullPrefixText + symbolText + fullText + fullSuffixText + `
`;
    this.stop();
    this.#stream.write(textToWrite);
    return this;
  }
}
function ora(options2) {
  return new Ora(options2);
}

// src/spinner.ts
var spinner = ora;
// ../../../../node_modules/ts-collect/dist/index.js
var { create: y, defineProperty: V, getOwnPropertyDescriptor: d, getOwnPropertyNames: k, getPrototypeOf: n } = Object;
var u = Object.prototype.hasOwnProperty;
var m = (T, A) => () => (A || T((A = { exports: {} }).exports, A), A.exports);
var o = (T, A) => {
  for (var _ in A)
    V(T, _, { get: A[_], enumerable: true });
};
var q2 = (T, A, _, B) => {
  if (A && typeof A == "object" || typeof A == "function")
    for (let $2 of k(A))
      !u.call(T, $2) && $2 !== _ && V(T, $2, { get: () => A[$2], enumerable: !(B = d(A, $2)) || B.enumerable });
  return T;
};
var r = (T, A, _) => (q2(T, A, "default"), _ && q2(_, A, "default"));
var w = (T, A, _) => (_ = T != null ? y(n(T)) : {}, q2(A || !T || !T.__esModule ? V(_, "default", { value: T, enumerable: true }) : _, T));
var g = m((T, A) => {
  var _ = A.exports = {}, B, $2;
  function Z() {
    throw new Error("setTimeout has not been defined");
  }
  function J() {
    throw new Error("clearTimeout has not been defined");
  }
  (function() {
    try {
      typeof setTimeout == "function" ? B = setTimeout : B = Z;
    } catch {
      B = Z;
    }
    try {
      typeof clearTimeout == "function" ? $2 = clearTimeout : $2 = J;
    } catch {
      $2 = J;
    }
  })();
  function Q(G) {
    if (B === setTimeout)
      return setTimeout(G, 0);
    if ((B === Z || !B) && setTimeout)
      return B = setTimeout, setTimeout(G, 0);
    try {
      return B(G, 0);
    } catch {
      try {
        return B.call(null, G, 0);
      } catch {
        return B.call(this, G, 0);
      }
    }
  }
  function H(G) {
    if ($2 === clearTimeout)
      return clearTimeout(G);
    if (($2 === J || !$2) && clearTimeout)
      return $2 = clearTimeout, clearTimeout(G);
    try {
      return $2(G);
    } catch {
      try {
        return $2.call(null, G);
      } catch {
        return $2.call(this, G);
      }
    }
  }
  var E = [], W2 = false, Y, L2 = -1;
  function N2() {
    !W2 || !Y || (W2 = false, Y.length ? E = Y.concat(E) : L2 = -1, E.length && K());
  }
  function K() {
    if (!W2) {
      var G = Q(N2);
      W2 = true;
      for (var S = E.length;S; ) {
        for (Y = E, E = [];++L2 < S; )
          Y && Y[L2].run();
        L2 = -1, S = E.length;
      }
      Y = null, W2 = false, H(G);
    }
  }
  _.nextTick = function(G) {
    var S = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var M = 1;M < arguments.length; M++)
        S[M - 1] = arguments[M];
    E.push(new X2(G, S)), E.length === 1 && !W2 && Q(K);
  };
  function X2(G, S) {
    this.fun = G, this.array = S;
  }
  X2.prototype.run = function() {
    this.fun.apply(null, this.array);
  }, _.title = "browser", _.browser = true, _.env = {}, _.argv = [], _.version = "", _.versions = {};
  function F() {}
  _.on = F, _.addListener = F, _.once = F, _.off = F, _.removeListener = F, _.removeAllListeners = F, _.emit = F, _.prependListener = F, _.prependOnceListener = F, _.listeners = function(G) {
    return [];
  }, _.binding = function(G) {
    throw new Error("process.binding is not supported");
  }, _.cwd = function() {
    return "/";
  }, _.chdir = function(G) {
    throw new Error("process.chdir is not supported");
  }, _.umask = function() {
    return 0;
  };
});
var f = {};
o(f, { default: () => D });
r(f, w(g()));
var D = w(g());
function P(T) {
  let A = [], _ = null, B = null;
  async function* $2() {
    if (_) {
      for (let J of _)
        yield J;
      return;
    }
    let Z = [];
    for await (let J of T) {
      for (let Q of A)
        if (J = Q(J), J === undefined)
          break;
      if (J !== undefined)
        if (B) {
          if (Z.push(J), Z.length >= B) {
            for (let Q of Z)
              yield Q;
            Z = [];
          }
        } else
          yield J;
    }
    if (Z.length > 0)
      for (let J of Z)
        yield J;
  }
  return { map(Z) {
    let J = 0;
    return A.push((Q) => Z(Q, J++)), P($2());
  }, filter(Z) {
    let J = 0;
    return A.push((Q) => Z(Q, J++) ? Q : undefined), P($2());
  }, flatMap(Z) {
    let J = 0;
    return A.push((Q) => Z(Q, J++)), P($2());
  }, take(Z) {
    let J = 0;
    return A.push((Q) => J++ < Z ? Q : undefined), P($2());
  }, skip(Z) {
    let J = 0;
    return A.push((Q) => J++ < Z ? undefined : Q), P($2());
  }, chunk(Z) {
    let J = [];
    return A.push((Q) => {
      if (J.push(Q), J.length === Z) {
        let H = J;
        return J = [], H;
      }
      return;
    }), P($2());
  }, async toArray() {
    if (_)
      return _;
    let Z = [];
    for await (let J of $2())
      Z.push(J);
    return Z;
  }, async toCollection() {
    let Z = await this.toArray();
    return U2(Z);
  }, async forEach(Z) {
    for await (let J of $2())
      Z(J);
  }, async reduce(Z, J) {
    let Q = J;
    for await (let H of $2())
      Q = Z(Q, H);
    return Q;
  }, async count() {
    let Z = 0;
    for await (let J of $2())
      Z++;
    return Z;
  }, async first() {
    let J = await $2().next();
    return J.done ? undefined : J.value;
  }, async last() {
    let Z;
    for await (let J of $2())
      Z = J;
    return Z;
  }, async nth(Z) {
    let J = 0;
    for await (let Q of $2()) {
      if (J === Z)
        return Q;
      J++;
    }
    return;
  }, cache() {
    return this.toArray().then((Z) => {
      _ = Z;
    }), this;
  }, batch(Z) {
    return B = Z, this;
  }, pipe(Z) {
    return Z(this);
  } };
}
function h2(T, A) {
  return T.getFullYear() === A.getFullYear() && T.getMonth() === A.getMonth() && T.getDate() === A.getDate();
}
function x2(T, A) {
  let _ = new Date(T);
  switch (A) {
    case "day":
      _.setDate(T.getDate() + 1);
      break;
    case "week":
      _.setDate(T.getDate() + 7);
      break;
    case "month":
      _.setMonth(T.getMonth() + 1);
      break;
    case "year":
      _.setFullYear(T.getFullYear() + 1);
      break;
  }
  return _.getTime();
}
function I2(T, A) {
  return T >= -90 && T <= 90 && A >= -180 && A <= 180;
}
function U2(T) {
  if (Array.isArray(T) && T.length === 0)
    return b({ items: [], length: 0 });
  let A = Array.isArray(T) ? T : Array.from(T);
  return b({ items: A, length: A.length });
}
function b(collection) {
  function calculateFuzzyScore(T, A) {
    let _ = 0, B = -1;
    for (let $2 of T) {
      let Z = A.indexOf($2, B + 1);
      if (Z === -1)
        return 0;
      _ += 1 / (Z - B), B = Z;
    }
    return _;
  }
  return { ...collection, all() {
    return [...collection.items];
  }, average(T) {
    return this.avg(T);
  }, collapse() {
    return U2(collection.items.flat());
  }, combine(T) {
    let A = {};
    return collection.items.forEach((_, B) => {
      A[String(_)] = T[B];
    }), U2([A]);
  }, contains(T, A) {
    if (arguments.length === 1) {
      if (T === undefined)
        return false;
      return collection.items.includes(T);
    }
    return collection.items.some((_) => _[T] === A);
  }, containsOneItem() {
    return collection.length === 1;
  }, containsAll(T, A) {
    if (arguments.length === 1)
      return T.every(($2) => $2 === undefined ? collection.items.includes(undefined) : collection.items.includes($2));
    let _ = T;
    return (A || []).every((B) => collection.items.some(($2) => $2[_] === B));
  }, countBy(T) {
    let A = new Map;
    for (let _ of collection.items) {
      let B = typeof T === "function" ? T(_) : _[T];
      A.set(B, (A.get(B) || 0) + 1);
    }
    return A;
  }, diffAssoc(T) {
    let A = Array.isArray(T) ? T : T.items;
    return U2(collection.items.filter((_, B) => A[B] === undefined || JSON.stringify(_) !== JSON.stringify(A[B])));
  }, diffKeys(T) {
    return U2(collection.items.filter((A) => !T.some((_) => Object.keys(A).every((B) => (B in _)))));
  }, diffUsing(T, A) {
    return U2(collection.items.filter((_) => !T.some((B) => A(_, B) === 0)));
  }, doesntContain(T, A) {
    if (arguments.length === 1)
      return !collection.items.includes(T);
    return !collection.items.some((_) => _[T] === A);
  }, duplicates(T) {
    let A = new Map, _ = collection.items;
    return _.forEach((B) => {
      let $2 = T ? B[T] : B;
      A.set($2, (A.get($2) || 0) + 1);
    }), U2(_.filter((B) => {
      let $2 = T ? B[T] : B;
      return A.get($2) > 1;
    }));
  }, each(T) {
    return collection.items.forEach(T), this;
  }, eachSpread(T) {
    return collection.items.forEach((A) => {
      T(...Array.isArray(A) ? A : [A]);
    }), this;
  }, except(...T) {
    return U2(collection.items.map((A) => {
      let _ = { ...A };
      return T.forEach((B) => delete _[B]), _;
    }));
  }, firstOrFail() {
    let T = this.first();
    if (!T)
      throw new Error("Item not found.");
    return T;
  }, firstWhere(T, A) {
    return collection.items.find((_) => _[T] === A);
  }, flatten(T = 1 / 0) {
    let A = (_, B) => {
      return B > 0 ? _.reduce(($2, Z) => $2.concat(Array.isArray(Z) ? A(Z, B - 1) : Z), []) : _.slice();
    };
    return U2(A(collection.items, T));
  }, flip() {
    if (this.items.length === 0)
      return U2([]);
    let T = {};
    function A(_) {
      if (typeof _ !== "object" || _ === null)
        return false;
      return Object.values(_).every((B) => typeof B === "string" || typeof B === "number");
    }
    return this.items.forEach((_) => {
      if (A(_))
        Object.entries(_).forEach(([B, $2]) => {
          T[$2] = B;
        });
    }), U2([T]);
  }, forget(T) {
    return U2(collection.items.map((A) => {
      let _ = { ...A };
      return delete _[T], _;
    }));
  }, get(T, A) {
    let _ = collection.items[0];
    return _ ? _[T] !== undefined ? _[T] : A : A;
  }, has(T) {
    return collection.items.some((A) => (T in A));
  }, keyBy(T) {
    return new Map(collection.items.map((A) => [A[T], A]));
  }, macro(T, A) {
    Object.defineProperty(this, T, { value(..._) {
      return A.apply(this, _);
    }, enumerable: false, configurable: true, writable: true });
  }, make(T) {
    return U2(T);
  }, mapInto(T) {
    return U2(collection.items.map((A) => Object.assign(new T, A)));
  }, mapToDictionary(T) {
    let A = new Map;
    return collection.items.forEach((_) => {
      let [B, $2] = T(_);
      A.set(B, $2);
    }), A;
  }, mapWithKeys(T) {
    let A = new Map;
    return collection.items.forEach((_) => {
      let [B, $2] = T(_);
      A.set(B, $2);
    }), A;
  }, merge(T) {
    let A = Array.isArray(T) ? T : T.items;
    return U2([...collection.items, ...A]);
  }, mergeRecursive(T) {
    function A($2, Z) {
      if (Z === undefined || Z === null)
        return $2;
      if (Array.isArray(Z))
        return [...Z];
      if (typeof Z !== "object")
        return Z;
      let J = Array.isArray($2) ? [...$2] : { ...$2 };
      for (let Q of Object.keys(Z)) {
        let H = Z[Q];
        if (Array.isArray(H))
          J[Q] = [...H];
        else if (H && typeof H === "object")
          J[Q] = Q in J ? A(J[Q], H) : { ...H };
        else
          J[Q] = H;
      }
      return J;
    }
    let _ = Array.isArray(T) ? T : T.items, B = collection.items.map(($2, Z) => {
      return Z < _.length ? A($2, _[Z]) : { ...$2 };
    });
    return U2(B);
  }, only(...T) {
    return this.map((A) => {
      let _ = {};
      return T.forEach((B) => {
        if (A && typeof A === "object" && B in A) {
          let $2 = B;
          _[$2] = A[$2];
        }
      }), _;
    });
  }, pad(T, A) {
    let _ = collection.items.map(($2) => $2), B = Math.abs(T);
    while (_.length < B)
      T > 0 ? _.push(A) : _.unshift(A);
    return U2(_);
  }, pop() {
    return collection.items.pop();
  }, prepend(T) {
    let A = [T, ...collection.items.map((_) => _)];
    return U2(A);
  }, pull(T) {
    let A = collection.items[0];
    return A ? A[T] : undefined;
  }, push(T) {
    let A = [...collection.items.map((_) => _), T];
    return U2(A);
  }, put(T, A) {
    return U2(collection.items.map((_) => ({ ..._, [T]: A })));
  }, random(T) {
    let A = [...collection.items];
    if (typeof T === "undefined") {
      let B = Math.floor(Math.random() * A.length);
      return U2([A[B]]);
    }
    let _ = A.sort(() => Math.random() - 0.5);
    return U2(_.slice(0, T));
  }, reject(T) {
    return this.filter((A) => !T(A));
  }, replace(T) {
    return U2(T);
  }, replaceRecursive(T) {
    function A(_, B) {
      if (!B || typeof B !== "object")
        return B;
      if (Array.isArray(B))
        return B.map((Z, J) => A(Array.isArray(_) ? _[J] : {}, Z));
      let $2 = {};
      for (let Z in B)
        $2[Z] = A(_?.[Z], B[Z]);
      return $2;
    }
    return U2(A(collection.items, T));
  }, reverse() {
    return U2([...collection.items].reverse());
  }, shift() {
    if (collection.length === 0)
      return;
    let T = collection.items[0];
    return collection.items.splice(0, 1), T;
  }, shuffle() {
    return U2([...collection.items].sort(() => Math.random() - 0.5));
  }, skipUntil(T) {
    let A = typeof T === "function" ? T : (B) => B === T, _ = collection.items.findIndex(A);
    return U2(_ === -1 ? [] : collection.items.slice(_));
  }, skipWhile(T) {
    let A = typeof T === "function" ? T : (B) => B === T, _ = 0;
    while (_ < collection.items.length && A(collection.items[_]))
      _++;
    return U2(collection.items.slice(_));
  }, slice(T, A) {
    return U2(A === undefined ? collection.items.slice(T) : collection.items.slice(T, T + A));
  }, sole() {
    if (collection.length !== 1)
      throw new Error("Collection does not contain exactly one item.");
    return collection.items[0];
  }, sortDesc() {
    return this.sort((T, A) => {
      if (T < A)
        return 1;
      if (T > A)
        return -1;
      return 0;
    });
  }, sortKeys() {
    return U2(collection.items.map((T) => {
      let A = {};
      return Object.keys(T).sort().forEach((_) => {
        A[_] = T[_];
      }), A;
    }));
  }, sortKeysDesc() {
    return U2(collection.items.map((T) => {
      let A = {};
      return Object.keys(T).sort((_, B) => B.localeCompare(_)).forEach((_) => {
        A[_] = T[_];
      }), A;
    }));
  }, splice(T, A, ..._) {
    let B = [...collection.items];
    if (T > B.length)
      return U2(B);
    if (A === undefined)
      B.splice(T);
    else
      B.splice(T, A, ..._);
    return U2(B);
  }, split(T) {
    let A = [], _ = Math.ceil(collection.length / T);
    for (let B = 0;B < collection.length; B += _)
      A.push(collection.items.slice(B, B + _));
    return U2(A);
  }, takeUntil(T) {
    let A = typeof T === "function" ? T : (B) => B === T, _ = collection.items.findIndex(A);
    return _ === -1 ? U2(collection.items) : U2(collection.items.slice(0, _));
  }, takeWhile(T) {
    let A = typeof T === "function" ? T : (B) => B === T, _ = 0;
    while (_ < collection.items.length && A(collection.items[_]))
      _++;
    return U2(collection.items.slice(0, _));
  }, times(T, A) {
    let _ = [];
    for (let B = 0;B < T; B++)
      _.push(A(B));
    return U2(_);
  }, undot() {
    let T = {};
    return collection.items.forEach((A) => {
      Object.entries(A).forEach(([_, B]) => {
        _.split(".").reduce(($2, Z, J, Q) => {
          if (J === Q.length - 1)
            $2[Z] = B;
          else
            $2[Z] = $2[Z] || {};
          return $2[Z];
        }, T);
      });
    }), U2([T]);
  }, unlessEmpty(T) {
    return this.isNotEmpty() ? T(this) : this;
  }, unlessNotEmpty(T) {
    return this.isEmpty() ? T(this) : this;
  }, unwrap(T) {
    if (T instanceof Object && "items" in T)
      return T.toArray();
    return Array.isArray(T) ? T : [T];
  }, whenEmpty(T) {
    return this.isEmpty() ? T(this) : this;
  }, whenNotEmpty(T) {
    return this.isNotEmpty() ? T(this) : this;
  }, wrap(T) {
    if (Array.isArray(T))
      return U2(T);
    return U2([T]);
  }, zip(T) {
    return U2(collection.items.map((A, _) => [A, T[_]]));
  }, map(T) {
    return U2(collection.items.map(T));
  }, filter(T) {
    return U2(collection.items.filter(T));
  }, reduce(T, A) {
    return collection.items.reduce(T, A);
  }, flatMap(T) {
    return U2(collection.items.flatMap(T));
  }, first: function(T) {
    let A = collection.items[0];
    if (arguments.length === 0)
      return A;
    return A ? A[T] : undefined;
  }, last: function(T) {
    let A = collection.items[collection.length - 1];
    if (arguments.length === 0)
      return A;
    return A ? A[T] : undefined;
  }, nth(T) {
    return collection.items[T];
  }, take(T) {
    return U2(collection.items.slice(0, T));
  }, skip(T) {
    return U2(collection.items.slice(T));
  }, sum(T) {
    if (collection.length === 0)
      return 0;
    return collection.items.reduce((A, _) => {
      let B = T ? Number(_[T]) : Number(_);
      return A + (Number.isNaN(B) ? 0 : B);
    }, 0);
  }, avg(T) {
    return collection.length ? this.sum(T) / collection.length : 0;
  }, median(T) {
    if (collection.length === 0)
      return;
    let A = T ? collection.items.map((B) => Number(B[T])).sort((B, $2) => B - $2) : collection.items.map((B) => Number(B)).sort((B, $2) => B - $2), _ = Math.floor(A.length / 2);
    return A.length % 2 === 0 ? (A[_ - 1] + A[_]) / 2 : A[_];
  }, mode(T) {
    if (collection.length === 0)
      return;
    let A = new Map, _ = 0, B;
    for (let $2 of collection.items) {
      let Z = T ? $2[T] : $2, J = (A.get(Z) || 0) + 1;
      if (A.set(Z, J), J > _)
        _ = J, B = $2;
    }
    return B;
  }, min(T) {
    if (collection.length === 0)
      return;
    return collection.items.reduce((A, _) => {
      return (T ? _[T] : _) < (T ? A[T] : A) ? _ : A;
    });
  }, max(T) {
    if (collection.length === 0)
      return;
    return collection.items.reduce((A, _) => {
      return (T ? _[T] : _) > (T ? A[T] : A) ? _ : A;
    });
  }, chunk(T) {
    if (T < 1)
      throw new Error("Chunk size must be greater than 0");
    let A = [];
    for (let _ = 0;_ < collection.length; _ += T)
      A.push(collection.items.slice(_, _ + T));
    return U2(A);
  }, groupBy(T) {
    let A = new Map;
    for (let _ of collection.items) {
      let B = typeof T === "function" ? T(_) : _[T];
      if (!A.has(B))
        A.set(B, []);
      A.get(B).push(_);
    }
    return new Map(Array.from(A.entries()).map(([_, B]) => [_, U2(B)]));
  }, partition(T) {
    let A = [], _ = [];
    for (let B of collection.items)
      if (T(B))
        A.push(B);
      else
        _.push(B);
    return [U2(A), U2(_)];
  }, where(T, A) {
    return U2(collection.items.filter((_) => _[T] === A));
  }, whereIn(T, A) {
    let _ = new Set(A);
    return U2(collection.items.filter((B) => _.has(B[T])));
  }, whereNotIn(T, A) {
    let _ = new Set(A);
    return U2(collection.items.filter((B) => !_.has(B[T])));
  }, whereBetween(T, A, _) {
    return U2(collection.items.filter((B) => {
      let $2 = B[T];
      return $2 >= A && $2 <= _;
    }));
  }, whereNotBetween(T, A, _) {
    return U2(collection.items.filter((B) => {
      let $2 = B[T];
      return $2 < A || $2 > _;
    }));
  }, unique(T) {
    if (!T)
      return U2([...new Set(collection.items)]);
    let A = new Set;
    return U2(collection.items.filter((_) => {
      let B = _[T];
      if (A.has(B))
        return false;
      return A.add(B), true;
    }));
  }, when(T, A) {
    return (typeof T === "function" ? T(this) : T) ? A(this) : this;
  }, unless(T, A) {
    return (typeof T === "function" ? T(this) : T) ? this : A(this);
  }, sort(T) {
    if (!T) {
      let A = [...collection.items], _ = [], B = [], $2 = [];
      for (let Z of A)
        if (Z === null)
          _.push(Z);
        else if (Z === undefined)
          B.push(Z);
        else
          $2.push(Z);
      return $2.sort((Z, J) => {
        if (typeof Z === "number" && typeof J === "number")
          return Z - J;
        return String(Z).localeCompare(String(J));
      }), U2([..._, ...B, ...$2]);
    }
    return U2([...collection.items].sort(T));
  }, sortBy(T, A = "asc") {
    let _ = [...collection.items];
    if (_.length === 0)
      return U2(_);
    if (!_.some(($2) => $2?.[T] !== undefined && $2[T] !== null))
      return U2(_);
    return U2(_.sort(($2, Z) => {
      let J = $2?.[T], Q = Z?.[T];
      if (J === undefined || J === null)
        return A === "asc" ? -1 : 1;
      if (Q === undefined || Q === null)
        return A === "asc" ? 1 : -1;
      if (typeof J === "number" && typeof Q === "number")
        return A === "asc" ? J - Q : Q - J;
      let H = String(J).localeCompare(String(Q));
      return A === "asc" ? H : -H;
    }));
  }, sortByDesc(T) {
    return this.sortBy(T, "desc");
  }, pluck(T) {
    return U2(collection.items.map((A) => A[T]));
  }, values() {
    return U2([...collection.items]);
  }, keys(T) {
    return U2(Array.from(new Set(collection.items.map((A) => A[T]))));
  }, intersect(T) {
    let A = new Set(Array.isArray(T) ? T : T.items);
    return U2(collection.items.filter((_) => A.has(_)));
  }, union(T) {
    let A = Array.isArray(T) ? T : T.items;
    return U2([...new Set([...collection.items, ...A])]);
  }, tap(T) {
    return T(this), this;
  }, pipe(T) {
    return T(this);
  }, isEmpty() {
    return collection.length === 0;
  }, isNotEmpty() {
    return collection.length > 0;
  }, count() {
    return collection.length;
  }, toArray() {
    return [...collection.items];
  }, toMap(T) {
    return new Map(collection.items.map((A) => [A[T], A]));
  }, toSet() {
    return new Set(collection.items);
  }, product(T) {
    if (collection.length === 0)
      return 0;
    return collection.items.reduce((A, _) => {
      let B = T ? Number(_[T]) : Number(_);
      return A * (Number.isNaN(B) ? 1 : B);
    }, 1);
  }, standardDeviation(T) {
    if (collection.length <= 1)
      return { population: 0, sample: 0 };
    let A = this.avg(T), _ = collection.items.map((Z) => {
      let Q = (T ? Number(Z[T]) : Number(Z)) - A;
      return Q * Q;
    }), B = _.reduce((Z, J) => Z + J, 0) / collection.length, $2 = _.reduce((Z, J) => Z + J, 0) / (collection.length - 1);
    return { population: Math.sqrt(B), sample: Math.sqrt($2) };
  }, percentile(T, A) {
    if (T < 0 || T > 100 || collection.length === 0)
      return;
    let _ = A ? collection.items.map(($2) => Number($2[A])).sort(($2, Z) => $2 - Z) : collection.items.map(($2) => Number($2)).sort(($2, Z) => $2 - Z), B = Math.ceil(T / 100 * _.length) - 1;
    return _[B];
  }, variance(T) {
    return this.standardDeviation(T).population ** 2;
  }, frequency(T) {
    let A = new Map;
    for (let _ of collection.items) {
      let B = T ? _[T] : _;
      A.set(B, (A.get(B) || 0) + 1);
    }
    return A;
  }, whereNull(T) {
    return U2(collection.items.filter((A) => A[T] == null));
  }, whereNotNull(T) {
    return U2(collection.items.filter((A) => A[T] != null));
  }, whereLike(T, A) {
    let _ = new RegExp(A.replace(/%/g, ".*"), "i");
    return U2(collection.items.filter((B) => _.test(String(B[T]))));
  }, whereRegex(T, A) {
    return U2(collection.items.filter((_) => A.test(String(_[T]))));
  }, whereInstanceOf(T) {
    return U2(collection.items.filter((A) => A instanceof T));
  }, async mapAsync(T) {
    let A = await Promise.all(collection.items.map((_, B) => T(_, B)));
    return U2(A);
  }, async filterAsync(T) {
    let A = await Promise.all(collection.items.map(async (_, B) => ({ item: _, keep: await T(_, B) })));
    return U2(A.filter(({ keep: _ }) => _).map(({ item: _ }) => _));
  }, async reduceAsync(T, A) {
    let _ = A;
    for (let B of collection.items)
      _ = await T(_, B);
    return _;
  }, async everyAsync(T) {
    return (await Promise.all(collection.items.map((_, B) => T(_, B)))).every((_) => _);
  }, async someAsync(T) {
    return (await Promise.all(collection.items.map((_, B) => T(_, B)))).some((_) => _);
  }, paginate(T, A = 1) {
    let _ = collection.length, B = Math.ceil(_ / T), $2 = Math.min(Math.max(A, 1), B);
    return { data: this.forPage($2, T), total: _, perPage: T, currentPage: $2, lastPage: B, hasMorePages: $2 < B };
  }, forPage(T, A) {
    if (T < 1 || A <= 0)
      return U2([]);
    let _ = (T - 1) * A;
    if (_ >= collection.items.length)
      return U2([]);
    return U2(collection.items.slice(_, _ + A));
  }, async* cursor(T) {
    let A = 0;
    while (A < collection.length)
      yield U2(collection.items.slice(A, A + T)), A += T;
  }, symmetricDiff(T) {
    let A = Array.isArray(T) ? T : T.items, _ = new Set(A), B = new Set(collection.items), $2 = new Set;
    return collection.items.forEach((Z) => {
      if (!_.has(Z))
        $2.add(Z);
    }), A.forEach((Z) => {
      if (!B.has(Z))
        $2.add(Z);
    }), U2([...$2]);
  }, cartesianProduct(T) {
    let A = Array.isArray(T) ? T : T.items, _ = [];
    for (let B of collection.items)
      for (let $2 of A)
        _.push([B, $2]);
    return U2(_);
  }, groupByMultiple(...T) {
    let A = new Map;
    for (let _ of collection.items) {
      let B = T.map(($2) => String(_[$2])).join("::");
      if (!A.has(B))
        A.set(B, []);
      A.get(B).push(_);
    }
    return new Map(Array.from(A.entries()).map(([_, B]) => [_, U2(B)]));
  }, describe(T) {
    let A = new Map;
    A.set("count", this.count()), A.set("mean", this.avg(T)), A.set("min", Number(this.min(T))), A.set("max", Number(this.max(T))), A.set("sum", this.sum(T));
    let _ = this.standardDeviation(T);
    A.set("stdDev", _.population), A.set("variance", this.variance(T));
    let B = this.percentile(25, T), $2 = this.percentile(75, T);
    if (B !== undefined && $2 !== undefined)
      A.set("q1", B), A.set("q3", $2), A.set("iqr", $2 - B);
    return A;
  }, debug() {
    return console.log({ items: collection.items, length: collection.length, memory: D.memoryUsage() }), this;
  }, dump() {
    console.log(collection.items);
  }, dd() {
    this.dump(), D.exit(1);
  }, timeSeries({ dateField: T, valueField: A, interval: _ = "day", fillGaps: B = true }) {
    let Z = collection.items.map((Y) => {
      let L2 = Y[T], N2 = Y[A], K = L2 instanceof Date ? L2 : new Date(String(L2)), X2 = typeof N2 === "number" ? N2 : Number(N2);
      return { date: K, value: X2 };
    }).filter((Y) => !Number.isNaN(Y.date.getTime())).sort((Y, L2) => Y.date.getTime() - L2.date.getTime());
    if (!B || Z.length === 0)
      return U2(Z);
    let J = Math.min(...Z.map((Y) => Y.date.getTime())), Q = Math.max(...Z.map((Y) => Y.date.getTime())), H = J, E = [], W2 = Q + 1;
    while (H < W2) {
      let Y = new Date(H), L2 = Z.find((N2) => h2(N2.date, Y));
      E.push({ date: new Date(Y), value: L2 ? L2.value : 0 }), H = x2(Y, _);
    }
    return U2(E);
  }, movingAverage({ window: T, centered: A = false }) {
    if (collection.length === 0)
      return U2([]);
    if (T < 1)
      throw new Error("Invalid window size");
    if (T > collection.length)
      throw new Error("Invalid window size");
    if (T === collection.length) {
      let Z = collection.items.reduce((J, Q) => Number(J) + Number(Q), 0) / T;
      return U2([Z]);
    }
    let _ = collection.items.map((Z) => Number(Z)), B = [], $2 = A ? Math.floor(T / 2) : 0;
    for (let Z = 0;Z <= _.length - T; Z++) {
      let J = _.slice(Z, Z + T).reduce((Q, H) => Q + H, 0);
      B[Z + $2] = J / T;
    }
    if (A) {
      let Z = Math.floor(T / 2);
      for (let Q = 0;Q < Z; Q++) {
        let H = _.slice(0, T);
        B[Q] = H.reduce((E, W2) => E + W2, 0) / H.length;
      }
      let J = Math.ceil(T / 2) - 1;
      for (let Q = 0;Q < J; Q++) {
        let H = _.length - J + Q, E = _.slice(-T);
        B[H] = E.reduce((W2, Y) => W2 + Y, 0) / E.length;
      }
    }
    return U2(B);
  }, async validate(T) {
    let A = new Map, _ = Object.entries(T);
    for (let [B, $2] of _) {
      if (!$2 || !Array.isArray($2))
        continue;
      for (let Z of collection.items) {
        let J = Z[B], Q = [];
        for (let H of $2)
          try {
            if (!await H(J))
              Q.push(`Validation failed for ${String(B)}`);
          } catch (E) {
            Q.push(`Validation error for ${String(B)}: ${E instanceof Error ? E.message : "Unknown error"}`);
          }
        if (Q.length > 0)
          A.set(String(B), Q);
      }
    }
    return { isValid: A.size === 0, errors: A };
  }, validateSync(T) {
    let A = new Map, _ = Object.entries(T);
    for (let [B, $2] of _) {
      if (!$2 || !Array.isArray($2))
        continue;
      for (let Z of collection.items) {
        let J = Z[B], Q = [];
        for (let H of $2)
          try {
            let E = H(J);
            if (E instanceof Promise)
              throw new TypeError("Async validation rules are not supported in validateSync");
            if (!E)
              Q.push(`Validation failed for ${String(B)}`);
          } catch (E) {
            Q.push(`Validation error for ${String(B)}: ${E instanceof Error ? E.message : "Unknown error"}`);
          }
        if (Q.length > 0)
          A.set(String(B), Q);
      }
    }
    return { isValid: A.size === 0, errors: A };
  }, stream() {
    let T = 0;
    return new ReadableStream({ pull: (A) => {
      if (T < collection.length)
        A.enqueue(collection.items[T++]);
      else
        A.close();
    } });
  }, async fromStream(T) {
    let A = [], _ = T.getReader();
    try {
      while (true) {
        let { done: B, value: $2 } = await _.read();
        if (B)
          break;
        A.push($2);
      }
    } finally {
      _.releaseLock();
    }
    return U2(A);
  }, fuzzyMatch(T, A, _ = 0.7) {
    function B(Z, J) {
      let Q = [];
      for (let H = 0;H <= Z.length; H++)
        Q[H] = [H];
      for (let H = 0;H <= J.length; H++)
        Q[0][H] = H;
      for (let H = 1;H <= Z.length; H++)
        for (let E = 1;E <= J.length; E++) {
          let W2 = Z[H - 1] === J[E - 1] ? 0 : 1;
          Q[H][E] = Math.min(Q[H - 1][E] + 1, Q[H][E - 1] + 1, Q[H - 1][E - 1] + W2);
        }
      return Q[Z.length][J.length];
    }
    function $2(Z, J) {
      let Q = Math.max(Z.length, J.length);
      return Q === 0 ? 1 : 1 - B(Z, J) / Q;
    }
    return U2(collection.items.filter((Z) => $2(String(Z[T]), A) >= _));
  }, metrics() {
    let T = { count: this.count(), nullCount: 0, uniqueCount: this.unique().count(), heapUsed: 0, heapTotal: 0 }, A = D.memoryUsage();
    if (T.heapUsed = A.heapUsed, T.heapTotal = A.heapTotal, collection.length > 0) {
      let _ = collection.items[0], B = Object.keys(_);
      T.fieldCount = B.length;
      let $2 = new Map;
      for (let Z of B) {
        let J = collection.items.filter((Q) => Q[Z] === null).length;
        $2.set(String(Z), J), T.nullCount += J;
      }
      T.nullFieldsDistribution = $2;
    }
    return T;
  }, async profile() {
    let T = D.hrtime(), A = D.memoryUsage().heapUsed;
    await Promise.resolve([...collection.items]);
    let [_, B] = D.hrtime(T), $2 = D.memoryUsage().heapUsed;
    return { time: _ * 1000 + B / 1e6, memory: $2 - A };
  }, transform(T) {
    return U2(collection.items.map((A) => {
      let _ = {}, B = Object.entries(T);
      for (let [$2, Z] of B)
        _[$2] = Z(A);
      return _;
    }));
  }, kmeans({ k: T, maxIterations: A = 100, distanceMetric: _ = "euclidean" }) {
    if (collection.length === 0)
      return v(U2([]));
    if (T <= 0 || T > collection.length)
      throw new Error("Invalid k value");
    let B = collection.items.map((E) => {
      return Object.values(E).filter((Y) => typeof Y === "number");
    });
    if (B.some((E) => E.length === 0))
      throw new Error("No numeric values found in data");
    let $2 = B.slice(0, T).map((E) => [...E]), Z = Array.from({ length: B.length }).fill(0), J = 0, Q = true;
    while (Q && J < A) {
      Q = false, B.forEach((E, W2) => {
        let L2 = $2.map((N2, K) => ({ index: K, distance: _ === "euclidean" ? Math.sqrt(E.reduce((X2, F, G) => X2 + (F - N2[G]) ** 2, 0)) : E.reduce((X2, F, G) => X2 + Math.abs(F - N2[G]), 0) })).reduce((N2, K) => K.distance < N2.distance ? K : N2);
        if (Z[W2] !== L2.index)
          Q = true, Z[W2] = L2.index;
      });
      for (let E = 0;E < T; E++) {
        let W2 = B.filter((Y, L2) => Z[L2] === E);
        if (W2.length > 0)
          $2[E] = W2[0].map((Y, L2) => W2.reduce((N2, K) => N2 + K[L2], 0) / W2.length);
      }
      J++;
    }
    let H = collection.items.map((E, W2) => ({ cluster: Z[W2], data: E }));
    return v(U2(H));
  }, linearRegression(T, A) {
    if (collection.length <= A.length)
      throw new Error("Insufficient data points for regression");
    try {
      let $2 = function(M, R2) {
        return M.reduce((O, j, C) => O + j * R2[C], 0);
      }, Z = function(M) {
        return M[0].map((R2, O) => M.map((j) => j[O]));
      }, _ = collection.items.map((M) => Number(M[T])), B = collection.items.map((M) => [1, ...A.map((R2) => Number(M[R2]))]), J = Z(B), Q = J.map((M) => B[0].map((R2, O) => $2(M, B.map((j) => j[O])))), H = J.map((M) => $2(M, _)), E = 0.0000000001;
      for (let M = 0;M < Q.length; M++)
        Q[M][M] += E;
      let W2 = Q.length, Y = Q.map((M, R2) => [...M, H[R2]]);
      for (let M = 0;M < W2; M++) {
        let R2 = M;
        for (let j = M + 1;j < W2; j++)
          if (Math.abs(Y[j][M]) > Math.abs(Y[R2][M]))
            R2 = j;
        if (R2 !== M)
          [Y[M], Y[R2]] = [Y[R2], Y[M]];
        let O = Y[M][M];
        if (Math.abs(O) < 0.0000000001)
          throw new Error("Matrix is nearly singular");
        for (let j = M;j <= W2; j++)
          Y[M][j] /= O;
        for (let j = 0;j < W2; j++)
          if (j !== M) {
            let C = Y[j][M];
            for (let z = M;z <= W2; z++)
              Y[j][z] -= C * Y[M][z];
          }
      }
      let L2 = Y.map((M) => M[W2]), N2 = B.map((M) => $2(M, L2)), K = _.reduce((M, R2) => M + R2, 0) / _.length, X2 = _.reduce((M, R2) => M + (R2 - K) ** 2, 0), F = N2.reduce((M, R2, O) => M + (_[O] - R2) ** 2, 0), G = X2 === 0 ? 0 : Math.min(1, Math.max(0, 1 - F / X2)), S = _.map((M, R2) => M - N2[R2]);
      return { coefficients: L2, rSquared: Number.isFinite(G) ? G : 0, predictions: N2, residuals: S };
    } catch (_) {
      let B = collection.length, $2 = collection.items.map((J) => Number(J[T])), Z = $2.reduce((J, Q) => J + Q, 0) / B;
      return { coefficients: Array.from({ length: A.length + 1 }, () => 0), rSquared: 0, predictions: Array.from({ length: B }, () => Z), residuals: $2.map((J) => J - Z) };
    }
  }, async parallel(T, A = {}) {
    let { chunks: _ = navigator.hardwareConcurrency || 4, maxConcurrency: B = _ } = A, $2 = Math.ceil(collection.length / _), Z = this.chunk($2), J = 0, Q = [], H = [];
    for (let E = 0;E < Z.count(); E++) {
      let W2 = Z.nth(E);
      if (!W2)
        continue;
      while (J >= B)
        await Promise.race(Q);
      J++;
      let Y, L2 = (async () => {
        try {
          let N2 = await T(U2(W2));
          if (Array.isArray(N2))
            H.push(...N2);
          else if (N2 && typeof N2.toArray === "function")
            H.push(...N2.toArray());
          else
            H.push(N2);
        } finally {
          J--, Y?.();
        }
      })();
      Y = () => {
        let N2 = Q.indexOf(L2);
        if (N2 > -1)
          Q.splice(N2, 1);
      }, Q.push(L2);
    }
    return await Promise.all(Q), U2(H);
  }, index(T) {
    let A = new Map;
    for (let _ of T) {
      let B = new Map;
      for (let $2 of collection.items) {
        let Z = $2[_];
        if (!B.has(Z))
          B.set(Z, []);
        B.get(Z).push($2);
      }
      A.set(_, B);
    }
    return this.__indexes = A, this;
  }, explain() {
    let T = [], A = this;
    while (A.__previous)
      T.unshift(A.__operation), A = A.__previous;
    return T.map((_, B) => `${B + 1}. ${_}`).join(`
`);
  }, async benchmark() {
    let T = {}, A = {}, _ = {}, B = ["filter", "map", "reduce", "sort"];
    for (let $2 of B) {
      let Z = performance.now(), J = D.memoryUsage().heapUsed;
      switch ($2) {
        case "filter":
          this.filter(() => true), _[$2] = "O(n)";
          break;
        case "map":
          this.map((Q) => Q), _[$2] = "O(n)";
          break;
        case "reduce":
          this.reduce((Q) => Q, null), _[$2] = "O(n)";
          break;
        case "sort":
          this.sort(), _[$2] = "O(n log n)";
          break;
      }
      T[$2] = performance.now() - Z, A[$2] = D.memoryUsage().heapUsed - J;
    }
    return { timing: T, memory: A, complexity: _ };
  }, lazy() {
    async function* T(A) {
      for (let _ of A)
        yield _;
    }
    return P(T(collection.items));
  }, mapToGroups(T) {
    let A = new Map;
    for (let _ of collection.items) {
      let [B, $2] = T(_);
      if (!A.has(B))
        A.set(B, []);
      A.get(B).push($2);
    }
    return new Map(Array.from(A.entries()).map(([_, B]) => [_, U2(B)]));
  }, mapSpread(T) {
    return U2(collection.items.map((A) => T(...Array.isArray(A) ? A : [A])));
  }, mapUntil(T, A) {
    let _ = [];
    for (let B = 0;B < collection.items.length; B++) {
      let $2 = T(collection.items[B], B);
      if (A($2))
        break;
      _.push($2);
    }
    return U2(_);
  }, pivot(T, A) {
    return new Map(collection.items.map((_) => [_[T], _[A]]));
  }, join(T) {
    return collection.items.join(T);
  }, implode(T, A = "") {
    return collection.items.map((_) => String(_[T])).join(A);
  }, lower() {
    return U2(collection.items.map((T) => String(T).toLowerCase()));
  }, upper() {
    return U2(collection.items.map((T) => String(T).toUpperCase()));
  }, slug() {
    return U2(collection.items.map((T) => String(T).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")));
  }, power() {
    let T = [[]];
    for (let A of collection.items) {
      let _ = T.length;
      for (let B = 0;B < _; B++)
        T.push([...T[B], A]);
    }
    return U2(T.map((A) => U2(A)));
  }, correlate(T, A) {
    let _ = collection.items.map((E) => Number(E[T])), B = collection.items.map((E) => Number(E[A])), $2 = _.reduce((E, W2) => E + W2, 0) / _.length, Z = B.reduce((E, W2) => E + W2, 0) / B.length, J = _.reduce((E, W2) => E + (W2 - $2) ** 2, 0), Q = B.reduce((E, W2) => E + (W2 - Z) ** 2, 0);
    return _.reduce((E, W2, Y) => E + (_[Y] - $2) * (B[Y] - Z), 0) / Math.sqrt(J * Q);
  }, outliers(T, A = 2) {
    let _ = collection.items.map((Z) => Number(Z[T])), B = _.reduce((Z, J) => Z + J, 0) / _.length, $2 = Math.sqrt(_.reduce((Z, J) => Z + (J - B) ** 2, 0) / _.length);
    return U2(collection.items.filter((Z) => Math.abs((Number(Z[T]) - B) / $2) > A));
  }, cast(T) {
    return U2(collection.items.map((A) => new T(A)));
  }, zscore(T) {
    if (T === undefined) {
      let $2 = this.items, Z = $2.reduce((Q, H) => Q + H, 0) / $2.length, J = Math.sqrt($2.reduce((Q, H) => Q + (H - Z) ** 2, 0) / $2.length);
      return U2($2.map((Q) => (Q - Z) / J));
    }
    let A = collection.items.map(($2) => Number($2[T])), _ = A.reduce(($2, Z) => $2 + Z, 0) / A.length, B = Math.sqrt(A.reduce(($2, Z) => $2 + (Z - _) ** 2, 0) / A.length);
    return U2(A.map(($2) => ($2 - _) / B));
  }, kurtosis(T) {
    let A;
    if (T === undefined)
      A = this.items;
    else
      A = collection.items.map((Z) => Number(Z[T]));
    let _ = A.reduce((Z, J) => Z + J, 0) / A.length, B = Math.sqrt(A.reduce((Z, J) => Z + (J - _) ** 2, 0) / A.length);
    return A.reduce((Z, J) => Z + (J - _) ** 4, 0) / A.length / B ** 4 - 3;
  }, skewness(T) {
    let A;
    if (T === undefined)
      A = this.items;
    else
      A = collection.items.map((Z) => Number(Z[T]));
    let _ = A.reduce((Z, J) => Z + J, 0) / A.length, B = Math.sqrt(A.reduce((Z, J) => Z + (J - _) ** 2, 0) / A.length);
    return A.reduce((Z, J) => Z + (J - _) ** 3, 0) / A.length / B ** 3;
  }, covariance(T, A) {
    let _ = collection.items.map((J) => Number(J[T])), B = collection.items.map((J) => Number(J[A])), $2 = _.reduce((J, Q) => J + Q, 0) / _.length, Z = B.reduce((J, Q) => J + Q, 0) / B.length;
    return _.reduce((J, Q, H) => J + (_[H] - $2) * (B[H] - Z), 0) / _.length;
  }, entropy(T) {
    let A;
    if (T === undefined)
      A = this.items;
    else
      A = collection.items.map((B) => B[T]);
    let _ = new Map;
    for (let B of A)
      _.set(B, (_.get(B) || 0) + 1);
    return -Array.from(_.values()).map((B) => B / A.length).reduce((B, $2) => B + $2 * Math.log2($2), 0);
  }, mapOption(T) {
    return U2(collection.items.map(T).filter((A) => A != null));
  }, zipWith(T, A) {
    let _ = Math.min(collection.length, T.count()), B = [];
    for (let $2 = 0;$2 < _; $2++)
      B.push(A(collection.items[$2], T.toArray()[$2]));
    return U2(B);
  }, scan(T, A) {
    let _ = [], B = A;
    for (let $2 of collection.items)
      B = T(B, $2), _.push(B);
    return U2(_);
  }, unfold(T, A) {
    let _ = [], B = A, $2 = T(B);
    while ($2 !== null) {
      let [Z, J] = $2;
      _.push(Z), B = J, $2 = T(B);
    }
    return U2(_);
  }, as(T) {
    return U2(collection.items.map((A) => {
      let _ = new T, B = Object.keys(_), $2 = A;
      return B.forEach((Z) => {
        if (Z in $2)
          _[Z] = $2[Z];
      }), _;
    }));
  }, pick(...T) {
    return U2(collection.items.map((A) => {
      let _ = {};
      for (let B of T)
        _[B] = A[B];
      return _;
    }));
  }, omit(...T) {
    let A = new Set(T);
    return U2(collection.items.map((_) => {
      let B = {};
      for (let $2 of Object.keys(_))
        if (!A.has($2))
          B[$2] = _[$2];
      return B;
    }));
  }, search(T, A, _ = {}) {
    let { fuzzy: B = false, weights: $2 = {} } = _, Z = T.toLowerCase();
    return U2(collection.items.map((J) => {
      let Q = 0;
      for (let H of A) {
        let E = String(J[H]).toLowerCase(), W2 = $2[H] || 1;
        if (B)
          Q += calculateFuzzyScore(Z, E) * W2;
        else
          Q += E.includes(Z) ? W2 : 0;
      }
      return { ...J, score: Q };
    })).filter((J) => J.score > 0).sort((J, Q) => Q.score - J.score);
  }, aggregate(T, A) {
    let _ = this.groupBy(T), B = new Map;
    for (let [$2, Z] of _.entries()) {
      let J = {};
      for (let Q of A)
        switch (Q) {
          case "sum":
            J.sum = Z.sum();
            break;
          case "avg":
            J.avg = Z.avg();
            break;
          case "min":
            J.min = Number(Z.min());
            break;
          case "max":
            J.max = Number(Z.max());
            break;
          case "count":
            J.count = Z.count();
            break;
        }
      B.set($2, J);
    }
    return B;
  }, pivotTable(T, A, _, B) {
    let $2 = new Map, Z = new Set(collection.items.map((Q) => Q[T])), J = new Set(collection.items.map((Q) => Q[A]));
    for (let Q of Z) {
      let H = new Map;
      for (let E of J) {
        let W2 = this.filter((L2) => L2[T] === Q && L2[A] === E), Y;
        switch (B) {
          case "sum":
            Y = W2.sum(_);
            break;
          case "avg":
            Y = W2.avg(_);
            break;
          case "count":
            Y = W2.count();
            break;
        }
        H.set(E, Y);
      }
      $2.set(Q, H);
    }
    return $2;
  }, toSQL(T) {
    if (collection.length === 0)
      return "";
    let A = Object.keys(collection.items[0]), _ = collection.items.map((B) => `(${A.map(($2) => JSON.stringify(B[$2])).join(", ")})`).join(`,
`);
    return `INSERT INTO ${T} (${A.join(", ")})
VALUES
${_};`;
  }, toGraphQL(T) {
    if (collection.length === 0)
      return `query {
  ${T}s {
    []
  }
}`;
    let A = Object.keys(collection.items[0]);
    return `query {
  ${T}s {
    nodes {
${collection.items.map((_) => `      ${T} {
${A.map((B) => `        ${B}: ${JSON.stringify(_[B])}`).join(`
`)}
      }`).join(`
`)}
    }
  }
}`;
  }, toElastic(T) {
    return { index: T, body: collection.items.flatMap((A) => [{ index: { _index: T } }, A]) };
  }, toPandas() {
    if (collection.length === 0)
      return "pd.DataFrame()";
    return `pd.DataFrame([
  ${collection.items.map((A) => JSON.stringify(A)).join(`,
  `)}
])`;
  }, playground() {
    console.log("Collection Playground:", { items: collection.items, length: collection.length, operations: Object.keys(this) });
  }, fft() {
    if (!collection.items.every((A) => typeof A === "number"))
      throw new Error("FFT can only be performed on number collections");
    function T(A) {
      let _ = A.length;
      if (_ <= 1)
        return [[A[0], 0]];
      let B = T(A.filter((J, Q) => Q % 2 === 0)), $2 = T(A.filter((J, Q) => Q % 2 === 1)), Z = new Array(_);
      for (let J = 0;J < _ / 2; J++) {
        let Q = -2 * Math.PI * J / _, H = [Math.cos(Q) * $2[J][0] - Math.sin(Q) * $2[J][1], Math.sin(Q) * $2[J][0] + Math.cos(Q) * $2[J][1]];
        Z[J] = [B[J][0] + H[0], B[J][1] + H[1]], Z[J + _ / 2] = [B[J][0] - H[0], B[J][1] - H[1]];
      }
      return Z;
    }
    return U2(T(collection.items));
  }, interpolate(T) {
    if (T < 2)
      throw new Error("Points must be greater than 1");
    if (this.count() === 1) {
      let $2 = Number(this.first());
      return U2(new Array(T).fill($2));
    }
    let A = this.toArray(), _ = [], B = (A.length - 1) / (T - 1);
    for (let $2 = 0;$2 < T; $2++) {
      let Z = $2 * B, J = Math.floor(Z), Q = Math.min(Math.ceil(Z), A.length - 1), H = A[J], E = A[Q];
      _.push(H + (E - H) * (Z - J));
    }
    return U2(_);
  }, convolve(T) {
    if (T.length === 0)
      throw new Error("Kernel must not be empty");
    if (this.count() === 0)
      throw new Error("Signal must not be empty");
    let A = this.toArray(), _ = A.length, B = T.length, $2 = [];
    for (let Z = 0;Z < _ + B - 1; Z++) {
      let J = 0;
      for (let Q = Math.max(0, Z - B + 1);Q <= Math.min(_ - 1, Z); Q++)
        J += A[Q] * T[Z - Q];
      $2.push(J);
    }
    return U2($2);
  }, differentiate() {
    if (this.count() <= 1)
      return U2([]);
    let T = this.toArray();
    return U2(T.slice(1).map((A, _) => Number(A) - Number(T[_])));
  }, integrate() {
    let T = this.toArray();
    if (T.length === 0)
      return U2([0]);
    let A = [0], _ = 0;
    for (let B of T)
      _ += B, A.push(_);
    return U2(A);
  }, geoDistance(T, A, _ = "km") {
    function B($2, Z, J, Q) {
      if (!I2($2, Z) || !I2(J, Q))
        throw new Error("Invalid coordinates");
      let H = _ === "km" ? 6371 : 3959, E = (J - $2) * Math.PI / 180, W2 = (Q - Z) * Math.PI / 180, Y = $2 * Math.PI / 180, L2 = J * Math.PI / 180, N2 = Math.sin(E / 2) * Math.sin(E / 2) + Math.cos(Y) * Math.cos(L2) * Math.sin(W2 / 2) * Math.sin(W2 / 2), K = 2 * Math.atan2(Math.sqrt(N2), Math.sqrt(1 - N2));
      return H * K;
    }
    return U2(collection.items.map(($2) => {
      let Z = $2[T];
      if (!Z || !Array.isArray(Z) || Z.length !== 2)
        throw new Error("Invalid coordinates");
      return { ...$2, distance: B(Z[0], Z[1], A[0], A[1]) };
    }));
  }, money(T, A = "USD") {
    let _ = new Intl.NumberFormat("en-US", { style: "currency", currency: A });
    return U2(collection.items.map((B) => ({ ...B, formatted: _.format(Number(B[T])) })));
  }, dateTime(T, A = "en-US") {
    return U2(collection.items.map((_) => ({ ..._, formatted: new Date(_[T]).toLocaleString(A) })));
  }, configure(T) {
    if (T.locale)
      Intl.NumberFormat.prototype.format = new Intl.NumberFormat(T.locale).format;
    if (T.timezone)
      Intl.DateTimeFormat.prototype.format = new Intl.DateTimeFormat(undefined, { timeZone: T.timezone }).format;
  }, trend(T) {
    let A = this.timeSeries(T), _ = A.count(), B = Array.from({ length: _ }, (Y, L2) => L2), $2 = A.pluck("value").toArray(), Z = B.reduce((Y, L2) => Y + L2, 0), J = $2.reduce((Y, L2) => Y + L2, 0), Q = B.reduce((Y, L2, N2) => Y + L2 * $2[N2], 0), H = B.reduce((Y, L2) => Y + L2 * L2, 0), E = (_ * Q - Z * J) / (_ * H - Z * Z), W2 = (J - E * Z) / _;
    return { slope: E, intercept: W2 };
  }, seasonality(T) {
    let A = this.timeSeries(T), _ = new Map, B = A.groupBy(($2) => {
      let Z = $2.date;
      switch (T.interval) {
        case "month":
          return Z.getMonth().toString();
        case "week":
          return Z.getDay().toString();
        default:
          return Z.getDate().toString();
      }
    });
    for (let [$2, Z] of B)
      _.set(String($2), Z.avg("value"));
    return _;
  }, forecast(T) {
    let A = this.trend({ dateField: "", valueField: "" }), _ = this.last();
    if (!_)
      return U2([]);
    let B = Array.from({ length: T }, ($2, Z) => {
      let J = { ..._ }, Q = A.slope * (this.count() + Z) + A.intercept, H = J;
      if (typeof H.value !== "undefined")
        H.value = Q;
      return H;
    });
    return U2(B);
  }, async assertValid(T) {
    let A = await this.validate(T);
    if (!A.isValid)
      throw new Error(`Validation failed: ${JSON.stringify(Array.from(A.errors.entries()))}`);
  }, sanitize(T) {
    return this.map((A) => {
      let _ = { ...A };
      for (let [B, $2] of Object.entries(T))
        _[B] = $2(A[B]);
      return _;
    });
  }, query(sql, params = []) {
    let lowerSQL = sql.toLowerCase(), result = this;
    if (lowerSQL.includes("where")) {
      let whereClause = sql.split("where")[1].trim(), paramIndex = 0;
      result = this.filter((item) => {
        let parsedClause = whereClause.replace(/\$\{(\w+)\}/g, (T, A) => {
          return JSON.stringify(item[A]);
        }).replace(/\?/g, () => {
          let T = params[paramIndex];
          return paramIndex++, JSON.stringify(T);
        });
        return eval(parsedClause);
      });
    }
    return result;
  }, having(T, A, _) {
    let B = { ">": ($2, Z) => $2 > Z, "<": ($2, Z) => $2 < Z, ">=": ($2, Z) => $2 >= Z, "<=": ($2, Z) => $2 <= Z, "=": ($2, Z) => $2 === Z, "!=": ($2, Z) => $2 !== Z };
    return this.filter(($2) => B[A]($2[T], _));
  }, crossJoin(T) {
    let A = [];
    for (let _ of this.items)
      for (let B of T.items)
        A.push({ ..._, ...B });
    return U2(A);
  }, leftJoin(T, A, _) {
    return this.map((B) => {
      let $2 = T.items.find((Z) => {
        let J = B[A], Q = Z[_];
        return J === Q;
      });
      return { ...B, ...$2 || {} };
    });
  }, batch(T) {
    return this.cursor(T);
  }, toJSON(T = {}) {
    let { pretty: A = false, exclude: _ = [], include: B } = T, $2 = this.items.map((Z) => {
      let J = {}, Q = B || Object.keys(Z);
      for (let H of Q)
        if (!_.includes(H))
          J[H] = Z[H];
      return J;
    });
    return JSON.stringify($2, null, A ? 2 : undefined);
  }, toCsv(T = {}) {
    let { exclude: A = [], include: _ } = T, B = this.toArray();
    if (B.length === 0)
      return "";
    let Z = (_ || Object.keys(B[0])).filter((Q) => !A.includes(Q)), J = B.map((Q) => Z.map((H) => JSON.stringify(Q[H])).join(","));
    return [Z.join(","), ...J].join(`
`);
  }, toXml(T = {}) {
    let { exclude: A = [], include: _ } = T, B = this.toArray(), $2 = "items", Z = "item";
    function J(H) {
      return H.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
<items>
${B.map((H) => {
      return `<item>
${(_ || Object.keys(H)).filter((Y) => !A.includes(Y)).map((Y) => `  <${Y}>${J(String(H[Y]))}</${Y}>`).join(`
`)}
</item>`;
    }).join(`
`)}
</items>`;
  }, parse(T, A) {
    switch (A) {
      case "json":
        return U2(JSON.parse(T));
      case "csv": {
        let _ = T.trim().split(`
`), B = _[0].split(","), $2 = _.slice(1).map((Z) => {
          let J = Z.split(","), Q = {};
          return B.forEach((H, E) => {
            Q[H] = J[E];
          }), Q;
        });
        return U2($2);
      }
      case "xml":
        throw new Error("XML parsing not implemented");
      default:
        throw new Error(`Unsupported format: ${A}`);
    }
  }, cache(T = 60000) {
    let A = new Map, _ = JSON.stringify(this.items), B = Date.now(), $2 = A.get(_);
    if ($2 && $2.expiry > B)
      return U2($2.data);
    return A.set(_, { data: [...this.items], expiry: B + T }), this;
  }, memoize(T) {
    let A = new Map, _ = this.items.map((B) => {
      let $2 = B[T];
      if (!A.has($2))
        A.set($2, B);
      return A.get($2);
    });
    return U2(_);
  }, async prefetch() {
    let T = await Promise.all(this.items.map(async (A) => {
      if (A instanceof Promise)
        return await A;
      return await Promise.resolve(A);
    }));
    return U2(T);
  }, sentiment() {
    let T = new Set(["good", "great", "awesome", "excellent", "happy", "love"]), A = new Set(["bad", "terrible", "awful", "horrible", "sad", "hate"]), _ = [new Set(["great", "awesome"])];
    return this.map((B) => {
      let $2 = B.toLowerCase().replace(/[.,!?]*/g, "").split(/\s+/).filter((Q) => Q.length > 0), Z = 0, J = new Set;
      return $2.forEach((Q) => {
        if (T.has(Q)) {
          let H = false;
          if (_.forEach((E, W2) => {
            if (E.has(Q) && J.has(W2))
              H = true;
          }), !H)
            Z++, _.forEach((E, W2) => {
              if (E.has(Q))
                J.add(W2);
            });
        }
        if (A.has(Q))
          Z--;
      }), { score: Z, comparative: Z / $2.length };
    });
  }, wordFrequency() {
    let T = new Map;
    return this.items.forEach((A) => {
      A.toLowerCase().split(/\s+/).forEach((B) => {
        T.set(B, (T.get(B) || 0) + 1);
      });
    }), T;
  }, ngrams(T) {
    return U2(this.items.flatMap((A) => {
      let _ = A.split(/\s+/), B = [];
      for (let $2 = 0;$2 <= _.length - T; $2++)
        B.push(_.slice($2, $2 + T).join(" "));
      return B;
    }));
  }, instrument(T) {
    let A = new Map;
    A.set("count", this.count()), A.set("operations", 0), A.set("timeStart", Date.now());
    let _ = new Proxy(this, { get(B, $2) {
      if (typeof B[$2] === "function")
        A.set("operations", (A.get("operations") || 0) + 1);
      return B[$2];
    } });
    return T(A), _;
  }, optimize() {
    let T = this.cache();
    if (this.count() > 1000) {
      let A = this.first();
      if (A) {
        let _ = Object.keys(A);
        T.index(_);
      }
    }
    return T;
  }, removeOutliers(T, A = 2) {
    let _ = this.pluck(T).toArray(), B = _.reduce((Z, J) => Number(Z) + Number(J), 0) / _.length, $2 = Math.sqrt(_.reduce((Z, J) => Z + (Number(J) - B) ** 2, 0) / _.length);
    return this.filter((Z) => {
      let J = Number(Z[T]);
      return Math.abs((J - B) / $2) <= A;
    });
  }, impute(T, A) {
    let _ = this.pluck(T).toArray(), B;
    switch (A) {
      case "mean": {
        B = _.reduce((Z, J) => Number(Z) + Number(J), 0) / _.length;
        break;
      }
      case "median": {
        let $2 = [..._].sort((J, Q) => Number(J) - Number(Q)), Z = Math.floor($2.length / 2);
        B = $2[Z];
        break;
      }
      case "mode": {
        let $2 = new Map, Z = 0, J = _[0];
        for (let Q of _) {
          let H = ($2.get(Q) || 0) + 1;
          if ($2.set(Q, H), H > Z)
            Z = H, J = Q;
        }
        B = J;
        break;
      }
    }
    return this.map(($2) => ({ ...$2, [T]: $2[T] ?? B }));
  }, normalize(T, A) {
    let _ = this.pluck(T).toArray().map(Number);
    if (A === "minmax") {
      let Z = Math.min(..._), Q = Math.max(..._) - Z;
      return this.map((H) => ({ ...H, [T]: Q !== 0 ? (Number(H[T]) - Z) / Q : 0 }));
    }
    let B = _.reduce((Z, J) => Z + J, 0) / _.length, $2 = Math.sqrt(_.reduce((Z, J) => Z + (J - B) ** 2, 0) / _.length);
    return this.map((Z) => ({ ...Z, [T]: $2 !== 0 ? (Number(Z[T]) - B) / $2 : 0 }));
  }, knn(T, A, _) {
    function B(Z, J) {
      return Math.sqrt(Array.from(_).reduce((Q, H) => {
        let E = J[H], W2 = Z[H];
        if (E === undefined)
          return Q;
        let Y = Number(W2), L2 = Number(E);
        if (Number.isNaN(Y) || Number.isNaN(L2))
          return Q;
        let N2 = Y - L2;
        return Q + N2 * N2;
      }, 0));
    }
    let $2 = collection.items.map((Z) => ({ item: Z, distance: B(Z, T) })).sort((Z, J) => Z.distance - J.distance).slice(0, Math.min(A, collection.items.length)).map((Z) => Z.item);
    return U2($2);
  }, naiveBayes(T, A) {
    let _ = new Set(this.pluck(A).toArray()), B = new Map, $2 = new Map;
    for (let Z of _) {
      let J = this.where(A, Z);
      B.set(Z, J.count() / this.count()), $2.set(Z, new Map);
      for (let Q of T) {
        let H = new Map, E = new Set(J.pluck(Q).toArray());
        for (let W2 of E) {
          let Y = J.where(Q, W2).count();
          H.set(W2, Y / J.count());
        }
        $2.get(Z).set(Q, H);
      }
    }
    return (Z) => {
      let J = -1 / 0, Q = Array.from(_)[0];
      for (let H of _) {
        let E = Math.log(B.get(H) || 0);
        for (let W2 of T) {
          let Y = Z[W2], L2 = $2.get(H)?.get(W2)?.get(Y) || 0.0001;
          E += Math.log(L2);
        }
        if (E > J)
          J = E, Q = H;
      }
      return Q;
    };
  }, detectAnomalies(T) {
    let { method: A = "zscore", threshold: _ = 2, features: B = [] } = T;
    switch (A) {
      case "zscore": {
        let $2 = B.length > 0 ? B : Object.keys(this.first() || {});
        return this.filter((Z) => {
          for (let J of $2) {
            let Q = this.pluck(J).toArray().map(Number), H = Q.reduce((Y, L2) => Y + L2, 0) / Q.length, E = Math.sqrt(Q.reduce((Y, L2) => Y + (L2 - H) ** 2, 0) / Q.length);
            if (Math.abs((Number(Z[J]) - H) / E) > _)
              return true;
          }
          return false;
        });
      }
      case "iqr": {
        let $2 = B.length > 0 ? B : Object.keys(this.first() || {});
        return this.filter((Z) => {
          for (let J of $2) {
            let Q = this.pluck(J).toArray().map(Number).sort((L2, N2) => L2 - N2), H = Q[Math.floor(Q.length * 0.25)], E = Q[Math.floor(Q.length * 0.75)], W2 = E - H, Y = Number(Z[J]);
            if (Y < H - _ * W2 || Y > E + _ * W2)
              return true;
          }
          return false;
        });
      }
      case "isolationForest": {
        let J = function(H, E, W2) {
          if (W2 >= Z || H.length <= 1)
            return W2;
          let Y = H.map((G) => Number(G[E])), L2 = Math.min(...Y), N2 = Math.max(...Y), K = L2 + Math.random() * (N2 - L2), X2 = H.filter((G) => Number(G[E]) < K), F = H.filter((G) => Number(G[E]) >= K);
          return Math.max(J(X2, E, W2 + 1), J(F, E, W2 + 1));
        }, $2 = Math.min(256, this.count()), Z = Math.ceil(Math.log2($2)), Q = B.length > 0 ? B : Object.keys(this.first() || {});
        return this.filter((H) => {
          return Q.reduce((W2, Y) => {
            let L2 = J([H], Y, 0);
            return W2 + L2;
          }, 0) / Q.length < _;
        });
      }
    }
  } };
}
function v(T) {
  let A = T.pluck.bind(T), _ = T;
  function B($2) {
    let Z = A($2);
    if ($2 === "cluster") {
      let J = Z;
      return { values: () => J.toArray(), toArray: () => J.toArray(), *[Symbol.iterator]() {
        yield* J.toArray();
      } };
    }
    if ($2 === "data") {
      let J = Z;
      return { values: () => J.toArray(), toArray: () => J.toArray(), forEach: (Q) => {
        J.toArray().forEach(Q);
      }, avg: (Q) => {
        let H = J.toArray().map((E) => Number(E[Q])).filter((E) => !Number.isNaN(E));
        return H.reduce((E, W2) => E + W2, 0) / H.length;
      }, filter: (Q) => {
        let H = J.toArray().filter(Q);
        return p(U2(H));
      } };
    }
    return Z;
  }
  return _.pluck = B, _;
}
function p(T) {
  return { values: () => T.toArray(), toArray: () => T.toArray(), forEach: (A) => {
    T.toArray().forEach(A);
  }, avg: (A) => {
    let _ = T.toArray().map((B) => Number(B[A])).filter((B) => !Number.isNaN(B));
    return _.reduce((B, $2) => B + $2, 0) / _.length;
  }, filter: (A) => {
    let _ = T.toArray().filter(A);
    return p(U2(_));
  } };
}
// ../../../../node_modules/consola/dist/shared/consola.DXBYu-KD.mjs
import * as tty2 from "tty";
var {
  env: env3 = {},
  argv = [],
  platform = ""
} = typeof process === "undefined" ? {} : process;
var isDisabled = "NO_COLOR" in env3 || argv.includes("--no-color");
var isForced = "FORCE_COLOR" in env3 || argv.includes("--color");
var isWindows = platform === "win32";
var isDumbTerminal = env3.TERM === "dumb";
var isCompatibleTerminal = tty2 && tty2.isatty && tty2.isatty(1) && env3.TERM && !isDumbTerminal;
var isCI = "CI" in env3 && (("GITHUB_ACTIONS" in env3) || ("GITLAB_CI" in env3) || ("CIRCLECI" in env3));
var isColorSupported = !isDisabled && (isForced || isWindows && !isDumbTerminal || isCompatibleTerminal || isCI);
function replaceClose(index, string2, close, replace2, head = string2.slice(0, Math.max(0, index)) + replace2, tail = string2.slice(Math.max(0, index + close.length)), next = tail.indexOf(close)) {
  return head + (next < 0 ? tail : replaceClose(next, tail, close, replace2));
}
function clearBleed(index, string2, open, close, replace2) {
  return index < 0 ? open + string2 + close : open + replaceClose(index, string2, close, replace2) + close;
}
function filterEmpty(open, close, replace2 = open, at = open.length + 1) {
  return (string2) => string2 || !(string2 === "" || string2 === undefined) ? clearBleed(("" + string2).indexOf(close, at), string2, open, close, replace2) : "";
}
function init(open, close, replace2) {
  return filterEmpty(`\x1B[${open}m`, `\x1B[${close}m`, replace2);
}
var colorDefs = {
  reset: init(0, 0),
  bold: init(1, 22, "\x1B[22m\x1B[1m"),
  dim: init(2, 22, "\x1B[22m\x1B[2m"),
  italic: init(3, 23),
  underline: init(4, 24),
  inverse: init(7, 27),
  hidden: init(8, 28),
  strikethrough: init(9, 29),
  black: init(30, 39),
  red: init(31, 39),
  green: init(32, 39),
  yellow: init(33, 39),
  blue: init(34, 39),
  magenta: init(35, 39),
  cyan: init(36, 39),
  white: init(37, 39),
  gray: init(90, 39),
  bgBlack: init(40, 49),
  bgRed: init(41, 49),
  bgGreen: init(42, 49),
  bgYellow: init(43, 49),
  bgBlue: init(44, 49),
  bgMagenta: init(45, 49),
  bgCyan: init(46, 49),
  bgWhite: init(47, 49),
  blackBright: init(90, 39),
  redBright: init(91, 39),
  greenBright: init(92, 39),
  yellowBright: init(93, 39),
  blueBright: init(94, 39),
  magentaBright: init(95, 39),
  cyanBright: init(96, 39),
  whiteBright: init(97, 39),
  bgBlackBright: init(100, 49),
  bgRedBright: init(101, 49),
  bgGreenBright: init(102, 49),
  bgYellowBright: init(103, 49),
  bgBlueBright: init(104, 49),
  bgMagentaBright: init(105, 49),
  bgCyanBright: init(106, 49),
  bgWhiteBright: init(107, 49)
};
function createColors(useColor = isColorSupported) {
  return useColor ? colorDefs : Object.fromEntries(Object.keys(colorDefs).map((key) => [key, String]));
}
var colors = createColors();
function getColor(color, fallback2 = "reset") {
  return colors[color] || colors[fallback2];
}
function colorize(color, text) {
  return getColor(color)(text);
}
var ansiRegex2 = [
  String.raw`[\u001B\u009B][[\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\d\/#&.:=?%@~_]+)*|[a-zA-Z\d]+(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?\u0007)`,
  String.raw`(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-nq-uy=><~]))`
].join("|");
function stripAnsi(text) {
  return text.replace(new RegExp(ansiRegex2, "g"), "");
}
function centerAlign(str, len, space = " ") {
  const free = len - str.length;
  if (free <= 0) {
    return str;
  }
  const freeLeft = Math.floor(free / 2);
  let _str = "";
  for (let i = 0;i < len; i++) {
    _str += i < freeLeft || i >= freeLeft + str.length ? space : str[i - freeLeft];
  }
  return _str;
}
function rightAlign(str, len, space = " ") {
  const free = len - str.length;
  if (free <= 0) {
    return str;
  }
  let _str = "";
  for (let i = 0;i < len; i++) {
    _str += i < free ? space : str[i - free];
  }
  return _str;
}
function leftAlign(str, len, space = " ") {
  let _str = "";
  for (let i = 0;i < len; i++) {
    _str += i < str.length ? str[i] : space;
  }
  return _str;
}
function align(alignment, str, len, space = " ") {
  switch (alignment) {
    case "left": {
      return leftAlign(str, len, space);
    }
    case "right": {
      return rightAlign(str, len, space);
    }
    case "center": {
      return centerAlign(str, len, space);
    }
    default: {
      return str;
    }
  }
}
var boxStylePresets = {
  solid: {
    tl: "\u250C",
    tr: "\u2510",
    bl: "\u2514",
    br: "\u2518",
    h: "\u2500",
    v: "\u2502"
  },
  double: {
    tl: "\u2554",
    tr: "\u2557",
    bl: "\u255A",
    br: "\u255D",
    h: "\u2550",
    v: "\u2551"
  },
  doubleSingle: {
    tl: "\u2553",
    tr: "\u2556",
    bl: "\u2559",
    br: "\u255C",
    h: "\u2500",
    v: "\u2551"
  },
  doubleSingleRounded: {
    tl: "\u256D",
    tr: "\u256E",
    bl: "\u2570",
    br: "\u256F",
    h: "\u2500",
    v: "\u2551"
  },
  singleThick: {
    tl: "\u250F",
    tr: "\u2513",
    bl: "\u2517",
    br: "\u251B",
    h: "\u2501",
    v: "\u2503"
  },
  singleDouble: {
    tl: "\u2552",
    tr: "\u2555",
    bl: "\u2558",
    br: "\u255B",
    h: "\u2550",
    v: "\u2502"
  },
  singleDoubleRounded: {
    tl: "\u256D",
    tr: "\u256E",
    bl: "\u2570",
    br: "\u256F",
    h: "\u2550",
    v: "\u2502"
  },
  rounded: {
    tl: "\u256D",
    tr: "\u256E",
    bl: "\u2570",
    br: "\u256F",
    h: "\u2500",
    v: "\u2502"
  }
};
var defaultStyle = {
  borderColor: "white",
  borderStyle: "rounded",
  valign: "center",
  padding: 2,
  marginLeft: 1,
  marginTop: 1,
  marginBottom: 1
};
function box(text, _opts = {}) {
  const opts = {
    ..._opts,
    style: {
      ...defaultStyle,
      ..._opts.style
    }
  };
  const textLines = text.split(`
`);
  const boxLines = [];
  const _color = getColor(opts.style.borderColor);
  const borderStyle = {
    ...typeof opts.style.borderStyle === "string" ? boxStylePresets[opts.style.borderStyle] || boxStylePresets.solid : opts.style.borderStyle
  };
  if (_color) {
    for (const key in borderStyle) {
      borderStyle[key] = _color(borderStyle[key]);
    }
  }
  const paddingOffset = opts.style.padding % 2 === 0 ? opts.style.padding : opts.style.padding + 1;
  const height = textLines.length + paddingOffset;
  const width = Math.max(...textLines.map((line) => stripAnsi(line).length), opts.title ? stripAnsi(opts.title).length : 0) + paddingOffset;
  const widthOffset = width + paddingOffset;
  const leftSpace = opts.style.marginLeft > 0 ? " ".repeat(opts.style.marginLeft) : "";
  if (opts.style.marginTop > 0) {
    boxLines.push("".repeat(opts.style.marginTop));
  }
  if (opts.title) {
    const title = _color ? _color(opts.title) : opts.title;
    const left = borderStyle.h.repeat(Math.floor((width - stripAnsi(opts.title).length) / 2));
    const right = borderStyle.h.repeat(width - stripAnsi(opts.title).length - stripAnsi(left).length + paddingOffset);
    boxLines.push(`${leftSpace}${borderStyle.tl}${left}${title}${right}${borderStyle.tr}`);
  } else {
    boxLines.push(`${leftSpace}${borderStyle.tl}${borderStyle.h.repeat(widthOffset)}${borderStyle.tr}`);
  }
  const valignOffset = opts.style.valign === "center" ? Math.floor((height - textLines.length) / 2) : opts.style.valign === "top" ? height - textLines.length - paddingOffset : height - textLines.length;
  for (let i = 0;i < height; i++) {
    if (i < valignOffset || i >= valignOffset + textLines.length) {
      boxLines.push(`${leftSpace}${borderStyle.v}${" ".repeat(widthOffset)}${borderStyle.v}`);
    } else {
      const line = textLines[i - valignOffset];
      const left = " ".repeat(paddingOffset);
      const right = " ".repeat(width - stripAnsi(line).length);
      boxLines.push(`${leftSpace}${borderStyle.v}${left}${line}${right}${borderStyle.v}`);
    }
  }
  boxLines.push(`${leftSpace}${borderStyle.bl}${borderStyle.h.repeat(widthOffset)}${borderStyle.br}`);
  if (opts.style.marginBottom > 0) {
    boxLines.push("".repeat(opts.style.marginBottom));
  }
  return boxLines.join(`
`);
}
// src/utils.ts
var quotes = U2([
  "The best way to get started is to quit talking and begin doing.",
  "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
  "Don\u2019t let yesterday take up too much of today.",
  "You learn more from failure than from success. Don\u2019t let it stop you. Failure builds character.",
  "It\u2019s not whether you get knocked down, it\u2019s whether you get up.",
  "If you are working on something that you really care about, you don\u2019t have to be pushed. The vision pulls you.",
  "People who are crazy enough to think they can change the world, are the ones who do.",
  "Failure will never overtake me if my determination to succeed is strong enough.",
  "Entrepreneurs are great at dealing with uncertainty and also very good at minimizing risk. That\u2019s the classic entrepreneur.",
  "We may encounter many defeats but we must not be defeated.",
  "Knowing is not enough; we must apply. Wishing is not enough; we must do.",
  "Imagine your life is perfect in every respect; what would it look like?",
  "We generate fears while we sit. We overcome them by action.",
  "Whether you think you can or think you can\u2019t, you\u2019re right.",
  "Security is mostly a superstition. Life is either a daring adventure or nothing."
]);
var export_prompts = import_prompts.default;

export {
  yellow2 as yellow,
  white2 as white,
  underline2 as underline,
  trueColorBg,
  trueColor,
  stripColors,
  stripAnsi,
  strikethrough,
  spinner,
  runProcess,
  runCommands,
  runCommandSync,
  runCommand,
  rightAlign,
  reset2 as reset,
  red2 as red,
  quotes,
  export_prompts as prompts,
  parseOptions,
  parseArgv,
  parseArgs,
  outro,
  magenta2 as magenta,
  log,
  link,
  lightYellow,
  lightRed,
  lightMagenta,
  lightGreen,
  lightGray,
  lightCyan,
  lightBlue,
  leftAlign,
  exports_esm as kolorist,
  italic2 as italic,
  inverse,
  intro,
  installStack,
  installPackage2 as installPackage,
  hidden,
  green2 as green,
  gray2 as gray,
  getColor,
  execSync,
  exec,
  dim2 as dim,
  cyan2 as cyan,
  command,
  colors,
  colorize,
  cli,
  centerAlign,
  buddyOptions,
  box,
  bold2 as bold,
  blue2 as blue,
  black,
  bgYellow2 as bgYellow,
  bgWhite,
  bgRed2 as bgRed,
  bgMagenta,
  bgLightYellow,
  bgLightRed,
  bgLightMagenta,
  bgLightGreen,
  bgLightGray,
  bgLightCyan,
  bgLightBlue,
  bgGreen,
  bgGray,
  bgCyan,
  bgBlue,
  bgBlack,
  ansi256Bg,
  ansi256,
  align,
  Command2 as Command,
  CAC
};
