import require$$0$2 from 'fs';
import require$$0 from 'constants';
import require$$0$1 from 'stream';
import require$$0$3 from 'util';
import require$$5 from 'assert';
import require$$1 from 'path';
import { config } from '@vue-email/compiler';
import { d as defineCommand, c as consola } from '../shared/cli.7b7a20ec.mjs';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import require$$0$4 from 'os';
import require$$0$5 from 'events';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var fs$p = {};

var universalify$1 = {};

universalify$1.fromCallback = function (fn) {
  return Object.defineProperty(function (...args) {
    if (typeof args[args.length - 1] === 'function') fn.apply(this, args);
    else {
      return new Promise((resolve, reject) => {
        fn.call(
          this,
          ...args,
          (err, res) => (err != null) ? reject(err) : resolve(res)
        );
      })
    }
  }, 'name', { value: fn.name })
};

universalify$1.fromPromise = function (fn) {
  return Object.defineProperty(function (...args) {
    const cb = args[args.length - 1];
    if (typeof cb !== 'function') return fn.apply(this, args)
    else fn.apply(this, args.slice(0, -1)).then(r => cb(null, r), cb);
  }, 'name', { value: fn.name })
};

var constants$5 = require$$0;

var origCwd = process.cwd;
var cwd$1 = null;

var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;

process.cwd = function() {
  if (!cwd$1)
    cwd$1 = origCwd.call(process);
  return cwd$1
};
try {
  process.cwd();
} catch (er) {}

// This check is needed until node.js 12 is required
if (typeof process.chdir === 'function') {
  var chdir = process.chdir;
  process.chdir = function (d) {
    cwd$1 = null;
    chdir.call(process, d);
  };
  if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
}

var polyfills$1 = patch$1;

function patch$1 (fs) {
  // (re-)implement some things that are known busted or missing.

  // lchmod, broken prior to 0.6.2
  // back-port the fix here.
  if (constants$5.hasOwnProperty('O_SYMLINK') &&
      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
    patchLchmod(fs);
  }

  // lutimes implementation, or no-op
  if (!fs.lutimes) {
    patchLutimes(fs);
  }

  // https://github.com/isaacs/node-graceful-fs/issues/4
  // Chown should not fail on einval or eperm if non-root.
  // It should not fail on enosys ever, as this just indicates
  // that a fs doesn't support the intended operation.

  fs.chown = chownFix(fs.chown);
  fs.fchown = chownFix(fs.fchown);
  fs.lchown = chownFix(fs.lchown);

  fs.chmod = chmodFix(fs.chmod);
  fs.fchmod = chmodFix(fs.fchmod);
  fs.lchmod = chmodFix(fs.lchmod);

  fs.chownSync = chownFixSync(fs.chownSync);
  fs.fchownSync = chownFixSync(fs.fchownSync);
  fs.lchownSync = chownFixSync(fs.lchownSync);

  fs.chmodSync = chmodFixSync(fs.chmodSync);
  fs.fchmodSync = chmodFixSync(fs.fchmodSync);
  fs.lchmodSync = chmodFixSync(fs.lchmodSync);

  fs.stat = statFix(fs.stat);
  fs.fstat = statFix(fs.fstat);
  fs.lstat = statFix(fs.lstat);

  fs.statSync = statFixSync(fs.statSync);
  fs.fstatSync = statFixSync(fs.fstatSync);
  fs.lstatSync = statFixSync(fs.lstatSync);

  // if lchmod/lchown do not exist, then make them no-ops
  if (fs.chmod && !fs.lchmod) {
    fs.lchmod = function (path, mode, cb) {
      if (cb) process.nextTick(cb);
    };
    fs.lchmodSync = function () {};
  }
  if (fs.chown && !fs.lchown) {
    fs.lchown = function (path, uid, gid, cb) {
      if (cb) process.nextTick(cb);
    };
    fs.lchownSync = function () {};
  }

  // on Windows, A/V software can lock the directory, causing this
  // to fail with an EACCES or EPERM if the directory contains newly
  // created files.  Try again on failure, for up to 60 seconds.

  // Set the timeout this long because some Windows Anti-Virus, such as Parity
  // bit9, may lock files for up to a minute, causing npm package install
  // failures. Also, take care to yield the scheduler. Windows scheduling gives
  // CPU to a busy looping process, which can cause the program causing the lock
  // contention to be starved of CPU by node, so the contention doesn't resolve.
  if (platform === "win32") {
    fs.rename = typeof fs.rename !== 'function' ? fs.rename
    : (function (fs$rename) {
      function rename (from, to, cb) {
        var start = Date.now();
        var backoff = 0;
        fs$rename(from, to, function CB (er) {
          if (er
              && (er.code === "EACCES" || er.code === "EPERM")
              && Date.now() - start < 60000) {
            setTimeout(function() {
              fs.stat(to, function (stater, st) {
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
          if (cb) cb(er);
        });
      }
      if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
      return rename
    })(fs.rename);
  }

  // if read() returns EAGAIN, then just try it again.
  fs.read = typeof fs.read !== 'function' ? fs.read
  : (function (fs$read) {
    function read (fd, buffer, offset, length, position, callback_) {
      var callback;
      if (callback_ && typeof callback_ === 'function') {
        var eagCounter = 0;
        callback = function (er, _, __) {
          if (er && er.code === 'EAGAIN' && eagCounter < 10) {
            eagCounter ++;
            return fs$read.call(fs, fd, buffer, offset, length, position, callback)
          }
          callback_.apply(this, arguments);
        };
      }
      return fs$read.call(fs, fd, buffer, offset, length, position, callback)
    }

    // This ensures `util.promisify` works as it does for native `fs.read`.
    if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
    return read
  })(fs.read);

  fs.readSync = typeof fs.readSync !== 'function' ? fs.readSync
  : (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
    var eagCounter = 0;
    while (true) {
      try {
        return fs$readSync.call(fs, fd, buffer, offset, length, position)
      } catch (er) {
        if (er.code === 'EAGAIN' && eagCounter < 10) {
          eagCounter ++;
          continue
        }
        throw er
      }
    }
  }})(fs.readSync);

  function patchLchmod (fs) {
    fs.lchmod = function (path, mode, callback) {
      fs.open( path
             , constants$5.O_WRONLY | constants$5.O_SYMLINK
             , mode
             , function (err, fd) {
        if (err) {
          if (callback) callback(err);
          return
        }
        // prefer to return the chmod error, if one occurs,
        // but still try to close, and report closing errors if they occur.
        fs.fchmod(fd, mode, function (err) {
          fs.close(fd, function(err2) {
            if (callback) callback(err || err2);
          });
        });
      });
    };

    fs.lchmodSync = function (path, mode) {
      var fd = fs.openSync(path, constants$5.O_WRONLY | constants$5.O_SYMLINK, mode);

      // prefer to return the chmod error, if one occurs,
      // but still try to close, and report closing errors if they occur.
      var threw = true;
      var ret;
      try {
        ret = fs.fchmodSync(fd, mode);
        threw = false;
      } finally {
        if (threw) {
          try {
            fs.closeSync(fd);
          } catch (er) {}
        } else {
          fs.closeSync(fd);
        }
      }
      return ret
    };
  }

  function patchLutimes (fs) {
    if (constants$5.hasOwnProperty("O_SYMLINK") && fs.futimes) {
      fs.lutimes = function (path, at, mt, cb) {
        fs.open(path, constants$5.O_SYMLINK, function (er, fd) {
          if (er) {
            if (cb) cb(er);
            return
          }
          fs.futimes(fd, at, mt, function (er) {
            fs.close(fd, function (er2) {
              if (cb) cb(er || er2);
            });
          });
        });
      };

      fs.lutimesSync = function (path, at, mt) {
        var fd = fs.openSync(path, constants$5.O_SYMLINK);
        var ret;
        var threw = true;
        try {
          ret = fs.futimesSync(fd, at, mt);
          threw = false;
        } finally {
          if (threw) {
            try {
              fs.closeSync(fd);
            } catch (er) {}
          } else {
            fs.closeSync(fd);
          }
        }
        return ret
      };

    } else if (fs.futimes) {
      fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb); };
      fs.lutimesSync = function () {};
    }
  }

  function chmodFix (orig) {
    if (!orig) return orig
    return function (target, mode, cb) {
      return orig.call(fs, target, mode, function (er) {
        if (chownErOk(er)) er = null;
        if (cb) cb.apply(this, arguments);
      })
    }
  }

  function chmodFixSync (orig) {
    if (!orig) return orig
    return function (target, mode) {
      try {
        return orig.call(fs, target, mode)
      } catch (er) {
        if (!chownErOk(er)) throw er
      }
    }
  }


  function chownFix (orig) {
    if (!orig) return orig
    return function (target, uid, gid, cb) {
      return orig.call(fs, target, uid, gid, function (er) {
        if (chownErOk(er)) er = null;
        if (cb) cb.apply(this, arguments);
      })
    }
  }

  function chownFixSync (orig) {
    if (!orig) return orig
    return function (target, uid, gid) {
      try {
        return orig.call(fs, target, uid, gid)
      } catch (er) {
        if (!chownErOk(er)) throw er
      }
    }
  }

  function statFix (orig) {
    if (!orig) return orig
    // Older versions of Node erroneously returned signed integers for
    // uid + gid.
    return function (target, options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = null;
      }
      function callback (er, stats) {
        if (stats) {
          if (stats.uid < 0) stats.uid += 0x100000000;
          if (stats.gid < 0) stats.gid += 0x100000000;
        }
        if (cb) cb.apply(this, arguments);
      }
      return options ? orig.call(fs, target, options, callback)
        : orig.call(fs, target, callback)
    }
  }

  function statFixSync (orig) {
    if (!orig) return orig
    // Older versions of Node erroneously returned signed integers for
    // uid + gid.
    return function (target, options) {
      var stats = options ? orig.call(fs, target, options)
        : orig.call(fs, target);
      if (stats) {
        if (stats.uid < 0) stats.uid += 0x100000000;
        if (stats.gid < 0) stats.gid += 0x100000000;
      }
      return stats;
    }
  }

  // ENOSYS means that the fs doesn't support the op. Just ignore
  // that, because it doesn't matter.
  //
  // if there's no getuid, or if getuid() is something other
  // than 0, and the error is EINVAL or EPERM, then just ignore
  // it.
  //
  // This specific case is a silent failure in cp, install, tar,
  // and most other unix tools that manage permissions.
  //
  // When running as root, or if other types of errors are
  // encountered, then it's strict.
  function chownErOk (er) {
    if (!er)
      return true

    if (er.code === "ENOSYS")
      return true

    var nonroot = !process.getuid || process.getuid() !== 0;
    if (nonroot) {
      if (er.code === "EINVAL" || er.code === "EPERM")
        return true
    }

    return false
  }
}

var Stream$1 = require$$0$1.Stream;

var legacyStreams = legacy$1;

function legacy$1 (fs) {
  return {
    ReadStream: ReadStream,
    WriteStream: WriteStream
  }

  function ReadStream (path, options) {
    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

    Stream$1.call(this);

    var self = this;

    this.path = path;
    this.fd = null;
    this.readable = true;
    this.paused = false;

    this.flags = 'r';
    this.mode = 438; /*=0666*/
    this.bufferSize = 64 * 1024;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.encoding) this.setEncoding(this.encoding);

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.end === undefined) {
        this.end = Infinity;
      } else if ('number' !== typeof this.end) {
        throw TypeError('end must be a Number');
      }

      if (this.start > this.end) {
        throw new Error('start must be <= end');
      }

      this.pos = this.start;
    }

    if (this.fd !== null) {
      process.nextTick(function() {
        self._read();
      });
      return;
    }

    fs.open(this.path, this.flags, this.mode, function (err, fd) {
      if (err) {
        self.emit('error', err);
        self.readable = false;
        return;
      }

      self.fd = fd;
      self.emit('open', fd);
      self._read();
    });
  }

  function WriteStream (path, options) {
    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

    Stream$1.call(this);

    this.path = path;
    this.fd = null;
    this.writable = true;

    this.flags = 'w';
    this.encoding = 'binary';
    this.mode = 438; /*=0666*/
    this.bytesWritten = 0;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.start < 0) {
        throw new Error('start must be >= zero');
      }

      this.pos = this.start;
    }

    this.busy = false;
    this._queue = [];

    if (this.fd === null) {
      this._open = fs.open;
      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
      this.flush();
    }
  }
}

var clone_1 = clone$1;

var getPrototypeOf = Object.getPrototypeOf || function (obj) {
  return obj.__proto__
};

function clone$1 (obj) {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Object)
    var copy = { __proto__: getPrototypeOf(obj) };
  else
    var copy = Object.create(null);

  Object.getOwnPropertyNames(obj).forEach(function (key) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
  });

  return copy
}

var fs$o = require$$0$2;
var polyfills = polyfills$1;
var legacy = legacyStreams;
var clone = clone_1;

var util$2 = require$$0$3;

/* istanbul ignore next - node 0.x polyfill */
var gracefulQueue;
var previousSymbol;

/* istanbul ignore else - node 0.x polyfill */
if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
  gracefulQueue = Symbol.for('graceful-fs.queue');
  // This is used in testing by future versions
  previousSymbol = Symbol.for('graceful-fs.previous');
} else {
  gracefulQueue = '___graceful-fs.queue';
  previousSymbol = '___graceful-fs.previous';
}

function noop$1 () {}

function publishQueue(context, queue) {
  Object.defineProperty(context, gracefulQueue, {
    get: function() {
      return queue
    }
  });
}

var debug = noop$1;
if (util$2.debuglog)
  debug = util$2.debuglog('gfs4');
else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
  debug = function() {
    var m = util$2.format.apply(util$2, arguments);
    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ');
    console.error(m);
  };

// Once time initialization
if (!fs$o[gracefulQueue]) {
  // This queue can be shared by multiple loaded instances
  var queue$1 = commonjsGlobal[gracefulQueue] || [];
  publishQueue(fs$o, queue$1);

  // Patch fs.close/closeSync to shared queue version, because we need
  // to retry() whenever a close happens *anywhere* in the program.
  // This is essential when multiple graceful-fs instances are
  // in play at the same time.
  fs$o.close = (function (fs$close) {
    function close (fd, cb) {
      return fs$close.call(fs$o, fd, function (err) {
        // This function uses the graceful-fs shared queue
        if (!err) {
          resetQueue();
        }

        if (typeof cb === 'function')
          cb.apply(this, arguments);
      })
    }

    Object.defineProperty(close, previousSymbol, {
      value: fs$close
    });
    return close
  })(fs$o.close);

  fs$o.closeSync = (function (fs$closeSync) {
    function closeSync (fd) {
      // This function uses the graceful-fs shared queue
      fs$closeSync.apply(fs$o, arguments);
      resetQueue();
    }

    Object.defineProperty(closeSync, previousSymbol, {
      value: fs$closeSync
    });
    return closeSync
  })(fs$o.closeSync);

  if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
    process.on('exit', function() {
      debug(fs$o[gracefulQueue]);
      require$$5.equal(fs$o[gracefulQueue].length, 0);
    });
  }
}

if (!commonjsGlobal[gracefulQueue]) {
  publishQueue(commonjsGlobal, fs$o[gracefulQueue]);
}

var gracefulFs = patch(clone(fs$o));
if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs$o.__patched) {
    gracefulFs = patch(fs$o);
    fs$o.__patched = true;
}

function patch (fs) {
  // Everything that references the open() function needs to be in here
  polyfills(fs);
  fs.gracefulify = patch;

  fs.createReadStream = createReadStream;
  fs.createWriteStream = createWriteStream;
  var fs$readFile = fs.readFile;
  fs.readFile = readFile;
  function readFile (path, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null;

    return go$readFile(path, options, cb)

    function go$readFile (path, options, cb, startTime) {
      return fs$readFile(path, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$readFile, [path, options, cb], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments);
        }
      })
    }
  }

  var fs$writeFile = fs.writeFile;
  fs.writeFile = writeFile;
  function writeFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null;

    return go$writeFile(path, data, options, cb)

    function go$writeFile (path, data, options, cb, startTime) {
      return fs$writeFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$writeFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments);
        }
      })
    }
  }

  var fs$appendFile = fs.appendFile;
  if (fs$appendFile)
    fs.appendFile = appendFile;
  function appendFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null;

    return go$appendFile(path, data, options, cb)

    function go$appendFile (path, data, options, cb, startTime) {
      return fs$appendFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$appendFile, [path, data, options, cb], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments);
        }
      })
    }
  }

  var fs$copyFile = fs.copyFile;
  if (fs$copyFile)
    fs.copyFile = copyFile;
  function copyFile (src, dest, flags, cb) {
    if (typeof flags === 'function') {
      cb = flags;
      flags = 0;
    }
    return go$copyFile(src, dest, flags, cb)

    function go$copyFile (src, dest, flags, cb, startTime) {
      return fs$copyFile(src, dest, flags, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$copyFile, [src, dest, flags, cb], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments);
        }
      })
    }
  }

  var fs$readdir = fs.readdir;
  fs.readdir = readdir;
  var noReaddirOptionVersions = /^v[0-5]\./;
  function readdir (path, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null;

    var go$readdir = noReaddirOptionVersions.test(process.version)
      ? function go$readdir (path, options, cb, startTime) {
        return fs$readdir(path, fs$readdirCallback(
          path, options, cb, startTime
        ))
      }
      : function go$readdir (path, options, cb, startTime) {
        return fs$readdir(path, options, fs$readdirCallback(
          path, options, cb, startTime
        ))
      };

    return go$readdir(path, options, cb)

    function fs$readdirCallback (path, options, cb, startTime) {
      return function (err, files) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([
            go$readdir,
            [path, options, cb],
            err,
            startTime || Date.now(),
            Date.now()
          ]);
        else {
          if (files && files.sort)
            files.sort();

          if (typeof cb === 'function')
            cb.call(this, err, files);
        }
      }
    }
  }

  if (process.version.substr(0, 4) === 'v0.8') {
    var legStreams = legacy(fs);
    ReadStream = legStreams.ReadStream;
    WriteStream = legStreams.WriteStream;
  }

  var fs$ReadStream = fs.ReadStream;
  if (fs$ReadStream) {
    ReadStream.prototype = Object.create(fs$ReadStream.prototype);
    ReadStream.prototype.open = ReadStream$open;
  }

  var fs$WriteStream = fs.WriteStream;
  if (fs$WriteStream) {
    WriteStream.prototype = Object.create(fs$WriteStream.prototype);
    WriteStream.prototype.open = WriteStream$open;
  }

  Object.defineProperty(fs, 'ReadStream', {
    get: function () {
      return ReadStream
    },
    set: function (val) {
      ReadStream = val;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(fs, 'WriteStream', {
    get: function () {
      return WriteStream
    },
    set: function (val) {
      WriteStream = val;
    },
    enumerable: true,
    configurable: true
  });

  // legacy names
  var FileReadStream = ReadStream;
  Object.defineProperty(fs, 'FileReadStream', {
    get: function () {
      return FileReadStream
    },
    set: function (val) {
      FileReadStream = val;
    },
    enumerable: true,
    configurable: true
  });
  var FileWriteStream = WriteStream;
  Object.defineProperty(fs, 'FileWriteStream', {
    get: function () {
      return FileWriteStream
    },
    set: function (val) {
      FileWriteStream = val;
    },
    enumerable: true,
    configurable: true
  });

  function ReadStream (path, options) {
    if (this instanceof ReadStream)
      return fs$ReadStream.apply(this, arguments), this
    else
      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
  }

  function ReadStream$open () {
    var that = this;
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        if (that.autoClose)
          that.destroy();

        that.emit('error', err);
      } else {
        that.fd = fd;
        that.emit('open', fd);
        that.read();
      }
    });
  }

  function WriteStream (path, options) {
    if (this instanceof WriteStream)
      return fs$WriteStream.apply(this, arguments), this
    else
      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
  }

  function WriteStream$open () {
    var that = this;
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        that.destroy();
        that.emit('error', err);
      } else {
        that.fd = fd;
        that.emit('open', fd);
      }
    });
  }

  function createReadStream (path, options) {
    return new fs.ReadStream(path, options)
  }

  function createWriteStream (path, options) {
    return new fs.WriteStream(path, options)
  }

  var fs$open = fs.open;
  fs.open = open;
  function open (path, flags, mode, cb) {
    if (typeof mode === 'function')
      cb = mode, mode = null;

    return go$open(path, flags, mode, cb)

    function go$open (path, flags, mode, cb, startTime) {
      return fs$open(path, flags, mode, function (err, fd) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$open, [path, flags, mode, cb], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments);
        }
      })
    }
  }

  return fs
}

function enqueue (elem) {
  debug('ENQUEUE', elem[0].name, elem[1]);
  fs$o[gracefulQueue].push(elem);
  retry();
}

// keep track of the timeout between retry() calls
var retryTimer;

// reset the startTime and lastTime to now
// this resets the start of the 60 second overall timeout as well as the
// delay between attempts so that we'll retry these jobs sooner
function resetQueue () {
  var now = Date.now();
  for (var i = 0; i < fs$o[gracefulQueue].length; ++i) {
    // entries that are only a length of 2 are from an older version, don't
    // bother modifying those since they'll be retried anyway.
    if (fs$o[gracefulQueue][i].length > 2) {
      fs$o[gracefulQueue][i][3] = now; // startTime
      fs$o[gracefulQueue][i][4] = now; // lastTime
    }
  }
  // call retry to make sure we're actively processing the queue
  retry();
}

function retry () {
  // clear the timer and remove it to help prevent unintended concurrency
  clearTimeout(retryTimer);
  retryTimer = undefined;

  if (fs$o[gracefulQueue].length === 0)
    return

  var elem = fs$o[gracefulQueue].shift();
  var fn = elem[0];
  var args = elem[1];
  // these items may be unset if they were added by an older graceful-fs
  var err = elem[2];
  var startTime = elem[3];
  var lastTime = elem[4];

  // if we don't have a startTime we have no way of knowing if we've waited
  // long enough, so go ahead and retry this item now
  if (startTime === undefined) {
    debug('RETRY', fn.name, args);
    fn.apply(null, args);
  } else if (Date.now() - startTime >= 60000) {
    // it's been more than 60 seconds total, bail now
    debug('TIMEOUT', fn.name, args);
    var cb = args.pop();
    if (typeof cb === 'function')
      cb.call(null, err);
  } else {
    // the amount of time between the last attempt and right now
    var sinceAttempt = Date.now() - lastTime;
    // the amount of time between when we first tried, and when we last tried
    // rounded up to at least 1
    var sinceStart = Math.max(lastTime - startTime, 1);
    // backoff. wait longer than the total time we've been retrying, but only
    // up to a maximum of 100ms
    var desiredDelay = Math.min(sinceStart * 1.2, 100);
    // it's been long enough since the last retry, do it again
    if (sinceAttempt >= desiredDelay) {
      debug('RETRY', fn.name, args);
      fn.apply(null, args.concat([startTime]));
    } else {
      // if we can't do this job yet, push it to the end of the queue
      // and let the next iteration check again
      fs$o[gracefulQueue].push(elem);
    }
  }

  // schedule our next run if one isn't already scheduled
  if (retryTimer === undefined) {
    retryTimer = setTimeout(retry, 0);
  }
}

(function (exports) {
	// This is adapted from https://github.com/normalize/mz
	// Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
	const u = universalify$1.fromCallback;
	const fs = gracefulFs;

	const api = [
	  'access',
	  'appendFile',
	  'chmod',
	  'chown',
	  'close',
	  'copyFile',
	  'fchmod',
	  'fchown',
	  'fdatasync',
	  'fstat',
	  'fsync',
	  'ftruncate',
	  'futimes',
	  'lchmod',
	  'lchown',
	  'link',
	  'lstat',
	  'mkdir',
	  'mkdtemp',
	  'open',
	  'opendir',
	  'readdir',
	  'readFile',
	  'readlink',
	  'realpath',
	  'rename',
	  'rm',
	  'rmdir',
	  'stat',
	  'symlink',
	  'truncate',
	  'unlink',
	  'utimes',
	  'writeFile'
	].filter(key => {
	  // Some commands are not available on some systems. Ex:
	  // fs.cp was added in Node.js v16.7.0
	  // fs.lchown is not available on at least some Linux
	  return typeof fs[key] === 'function'
	});

	// Export cloned fs:
	Object.assign(exports, fs);

	// Universalify async methods:
	api.forEach(method => {
	  exports[method] = u(fs[method]);
	});

	// We differ from mz/fs in that we still ship the old, broken, fs.exists()
	// since we are a drop-in replacement for the native module
	exports.exists = function (filename, callback) {
	  if (typeof callback === 'function') {
	    return fs.exists(filename, callback)
	  }
	  return new Promise(resolve => {
	    return fs.exists(filename, resolve)
	  })
	};

	// fs.read(), fs.write(), fs.readv(), & fs.writev() need special treatment due to multiple callback args

	exports.read = function (fd, buffer, offset, length, position, callback) {
	  if (typeof callback === 'function') {
	    return fs.read(fd, buffer, offset, length, position, callback)
	  }
	  return new Promise((resolve, reject) => {
	    fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
	      if (err) return reject(err)
	      resolve({ bytesRead, buffer });
	    });
	  })
	};

	// Function signature can be
	// fs.write(fd, buffer[, offset[, length[, position]]], callback)
	// OR
	// fs.write(fd, string[, position[, encoding]], callback)
	// We need to handle both cases, so we use ...args
	exports.write = function (fd, buffer, ...args) {
	  if (typeof args[args.length - 1] === 'function') {
	    return fs.write(fd, buffer, ...args)
	  }

	  return new Promise((resolve, reject) => {
	    fs.write(fd, buffer, ...args, (err, bytesWritten, buffer) => {
	      if (err) return reject(err)
	      resolve({ bytesWritten, buffer });
	    });
	  })
	};

	// Function signature is
	// s.readv(fd, buffers[, position], callback)
	// We need to handle the optional arg, so we use ...args
	exports.readv = function (fd, buffers, ...args) {
	  if (typeof args[args.length - 1] === 'function') {
	    return fs.readv(fd, buffers, ...args)
	  }

	  return new Promise((resolve, reject) => {
	    fs.readv(fd, buffers, ...args, (err, bytesRead, buffers) => {
	      if (err) return reject(err)
	      resolve({ bytesRead, buffers });
	    });
	  })
	};

	// Function signature is
	// s.writev(fd, buffers[, position], callback)
	// We need to handle the optional arg, so we use ...args
	exports.writev = function (fd, buffers, ...args) {
	  if (typeof args[args.length - 1] === 'function') {
	    return fs.writev(fd, buffers, ...args)
	  }

	  return new Promise((resolve, reject) => {
	    fs.writev(fd, buffers, ...args, (err, bytesWritten, buffers) => {
	      if (err) return reject(err)
	      resolve({ bytesWritten, buffers });
	    });
	  })
	};

	// fs.realpath.native sometimes not available if fs is monkey-patched
	if (typeof fs.realpath.native === 'function') {
	  exports.realpath.native = u(fs.realpath.native);
	} else {
	  process.emitWarning(
	    'fs.realpath.native is not a function. Is fs being monkey-patched?',
	    'Warning', 'fs-extra-WARN0003'
	  );
	} 
} (fs$p));

var makeDir$1 = {};

var utils$m = {};

const path$l = require$$1;

// https://github.com/nodejs/node/issues/8987
// https://github.com/libuv/libuv/pull/1088
utils$m.checkPath = function checkPath (pth) {
  if (process.platform === 'win32') {
    const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path$l.parse(pth).root, ''));

    if (pathHasInvalidWinCharacters) {
      const error = new Error(`Path contains invalid characters: ${pth}`);
      error.code = 'EINVAL';
      throw error
    }
  }
};

const fs$n = fs$p;
const { checkPath } = utils$m;

const getMode = options => {
  const defaults = { mode: 0o777 };
  if (typeof options === 'number') return options
  return ({ ...defaults, ...options }).mode
};

makeDir$1.makeDir = async (dir, options) => {
  checkPath(dir);

  return fs$n.mkdir(dir, {
    mode: getMode(options),
    recursive: true
  })
};

makeDir$1.makeDirSync = (dir, options) => {
  checkPath(dir);

  return fs$n.mkdirSync(dir, {
    mode: getMode(options),
    recursive: true
  })
};

const u$e = universalify$1.fromPromise;
const { makeDir: _makeDir, makeDirSync } = makeDir$1;
const makeDir = u$e(_makeDir);

var mkdirs$2 = {
  mkdirs: makeDir,
  mkdirsSync: makeDirSync,
  // alias
  mkdirp: makeDir,
  mkdirpSync: makeDirSync,
  ensureDir: makeDir,
  ensureDirSync: makeDirSync
};

const u$d = universalify$1.fromPromise;
const fs$m = fs$p;

function pathExists$6 (path) {
  return fs$m.access(path).then(() => true).catch(() => false)
}

var pathExists_1 = {
  pathExists: u$d(pathExists$6),
  pathExistsSync: fs$m.existsSync
};

const fs$l = fs$p;
const u$c = universalify$1.fromPromise;

async function utimesMillis$1 (path, atime, mtime) {
  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
  const fd = await fs$l.open(path, 'r+');

  let closeErr = null;

  try {
    await fs$l.futimes(fd, atime, mtime);
  } finally {
    try {
      await fs$l.close(fd);
    } catch (e) {
      closeErr = e;
    }
  }

  if (closeErr) {
    throw closeErr
  }
}

function utimesMillisSync$1 (path, atime, mtime) {
  const fd = fs$l.openSync(path, 'r+');
  fs$l.futimesSync(fd, atime, mtime);
  return fs$l.closeSync(fd)
}

var utimes = {
  utimesMillis: u$c(utimesMillis$1),
  utimesMillisSync: utimesMillisSync$1
};

const fs$k = fs$p;
const path$k = require$$1;
const u$b = universalify$1.fromPromise;

function getStats$1 (src, dest, opts) {
  const statFunc = opts.dereference
    ? (file) => fs$k.stat(file, { bigint: true })
    : (file) => fs$k.lstat(file, { bigint: true });
  return Promise.all([
    statFunc(src),
    statFunc(dest).catch(err => {
      if (err.code === 'ENOENT') return null
      throw err
    })
  ]).then(([srcStat, destStat]) => ({ srcStat, destStat }))
}

function getStatsSync (src, dest, opts) {
  let destStat;
  const statFunc = opts.dereference
    ? (file) => fs$k.statSync(file, { bigint: true })
    : (file) => fs$k.lstatSync(file, { bigint: true });
  const srcStat = statFunc(src);
  try {
    destStat = statFunc(dest);
  } catch (err) {
    if (err.code === 'ENOENT') return { srcStat, destStat: null }
    throw err
  }
  return { srcStat, destStat }
}

async function checkPaths (src, dest, funcName, opts) {
  const { srcStat, destStat } = await getStats$1(src, dest, opts);
  if (destStat) {
    if (areIdentical$2(srcStat, destStat)) {
      const srcBaseName = path$k.basename(src);
      const destBaseName = path$k.basename(dest);
      if (funcName === 'move' &&
        srcBaseName !== destBaseName &&
        srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
        return { srcStat, destStat, isChangingCase: true }
      }
      throw new Error('Source and destination must not be the same.')
    }
    if (srcStat.isDirectory() && !destStat.isDirectory()) {
      throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)
    }
    if (!srcStat.isDirectory() && destStat.isDirectory()) {
      throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`)
    }
  }

  if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
    throw new Error(errMsg(src, dest, funcName))
  }

  return { srcStat, destStat }
}

function checkPathsSync (src, dest, funcName, opts) {
  const { srcStat, destStat } = getStatsSync(src, dest, opts);

  if (destStat) {
    if (areIdentical$2(srcStat, destStat)) {
      const srcBaseName = path$k.basename(src);
      const destBaseName = path$k.basename(dest);
      if (funcName === 'move' &&
        srcBaseName !== destBaseName &&
        srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
        return { srcStat, destStat, isChangingCase: true }
      }
      throw new Error('Source and destination must not be the same.')
    }
    if (srcStat.isDirectory() && !destStat.isDirectory()) {
      throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)
    }
    if (!srcStat.isDirectory() && destStat.isDirectory()) {
      throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`)
    }
  }

  if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
    throw new Error(errMsg(src, dest, funcName))
  }
  return { srcStat, destStat }
}

// recursively check if dest parent is a subdirectory of src.
// It works for all file types including symlinks since it
// checks the src and dest inodes. It starts from the deepest
// parent and stops once it reaches the src parent or the root path.
async function checkParentPaths (src, srcStat, dest, funcName) {
  const srcParent = path$k.resolve(path$k.dirname(src));
  const destParent = path$k.resolve(path$k.dirname(dest));
  if (destParent === srcParent || destParent === path$k.parse(destParent).root) return

  let destStat;
  try {
    destStat = await fs$k.stat(destParent, { bigint: true });
  } catch (err) {
    if (err.code === 'ENOENT') return
    throw err
  }

  if (areIdentical$2(srcStat, destStat)) {
    throw new Error(errMsg(src, dest, funcName))
  }

  return checkParentPaths(src, srcStat, destParent, funcName)
}

function checkParentPathsSync (src, srcStat, dest, funcName) {
  const srcParent = path$k.resolve(path$k.dirname(src));
  const destParent = path$k.resolve(path$k.dirname(dest));
  if (destParent === srcParent || destParent === path$k.parse(destParent).root) return
  let destStat;
  try {
    destStat = fs$k.statSync(destParent, { bigint: true });
  } catch (err) {
    if (err.code === 'ENOENT') return
    throw err
  }
  if (areIdentical$2(srcStat, destStat)) {
    throw new Error(errMsg(src, dest, funcName))
  }
  return checkParentPathsSync(src, srcStat, destParent, funcName)
}

function areIdentical$2 (srcStat, destStat) {
  return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev
}

// return true if dest is a subdir of src, otherwise false.
// It only checks the path strings.
function isSrcSubdir (src, dest) {
  const srcArr = path$k.resolve(src).split(path$k.sep).filter(i => i);
  const destArr = path$k.resolve(dest).split(path$k.sep).filter(i => i);
  return srcArr.every((cur, i) => destArr[i] === cur)
}

function errMsg (src, dest, funcName) {
  return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`
}

var stat$5 = {
  // checkPaths
  checkPaths: u$b(checkPaths),
  checkPathsSync,
  // checkParent
  checkParentPaths: u$b(checkParentPaths),
  checkParentPathsSync,
  // Misc
  isSrcSubdir,
  areIdentical: areIdentical$2
};

const fs$j = fs$p;
const path$j = require$$1;
const { mkdirs: mkdirs$1 } = mkdirs$2;
const { pathExists: pathExists$5 } = pathExists_1;
const { utimesMillis } = utimes;
const stat$4 = stat$5;

async function copy$2 (src, dest, opts = {}) {
  if (typeof opts === 'function') {
    opts = { filter: opts };
  }

  opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now
  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber

  // Warn about using preserveTimestamps on 32-bit node
  if (opts.preserveTimestamps && process.arch === 'ia32') {
    process.emitWarning(
      'Using the preserveTimestamps option in 32-bit node is not recommended;\n\n' +
      '\tsee https://github.com/jprichardson/node-fs-extra/issues/269',
      'Warning', 'fs-extra-WARN0001'
    );
  }

  const { srcStat, destStat } = await stat$4.checkPaths(src, dest, 'copy', opts);

  await stat$4.checkParentPaths(src, srcStat, dest, 'copy');

  const include = await runFilter(src, dest, opts);

  if (!include) return

  // check if the parent of dest exists, and create it if it doesn't exist
  const destParent = path$j.dirname(dest);
  const dirExists = await pathExists$5(destParent);
  if (!dirExists) {
    await mkdirs$1(destParent);
  }

  await getStatsAndPerformCopy(destStat, src, dest, opts);
}

async function runFilter (src, dest, opts) {
  if (!opts.filter) return true
  return opts.filter(src, dest)
}

async function getStatsAndPerformCopy (destStat, src, dest, opts) {
  const statFn = opts.dereference ? fs$j.stat : fs$j.lstat;
  const srcStat = await statFn(src);

  if (srcStat.isDirectory()) return onDir$1(srcStat, destStat, src, dest, opts)

  if (
    srcStat.isFile() ||
    srcStat.isCharacterDevice() ||
    srcStat.isBlockDevice()
  ) return onFile$1(srcStat, destStat, src, dest, opts)

  if (srcStat.isSymbolicLink()) return onLink$1(destStat, src, dest, opts)
  if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`)
  if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`)
  throw new Error(`Unknown file: ${src}`)
}

async function onFile$1 (srcStat, destStat, src, dest, opts) {
  if (!destStat) return copyFile$1(srcStat, src, dest, opts)

  if (opts.overwrite) {
    await fs$j.unlink(dest);
    return copyFile$1(srcStat, src, dest, opts)
  }
  if (opts.errorOnExist) {
    throw new Error(`'${dest}' already exists`)
  }
}

async function copyFile$1 (srcStat, src, dest, opts) {
  await fs$j.copyFile(src, dest);
  if (opts.preserveTimestamps) {
    // Make sure the file is writable before setting the timestamp
    // otherwise open fails with EPERM when invoked with 'r+'
    // (through utimes call)
    if (fileIsNotWritable$1(srcStat.mode)) {
      await makeFileWritable$1(dest, srcStat.mode);
    }

    // Set timestamps and mode correspondingly

    // Note that The initial srcStat.atime cannot be trusted
    // because it is modified by the read(2) system call
    // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
    const updatedSrcStat = await fs$j.stat(src);
    await utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
  }

  return fs$j.chmod(dest, srcStat.mode)
}

function fileIsNotWritable$1 (srcMode) {
  return (srcMode & 0o200) === 0
}

function makeFileWritable$1 (dest, srcMode) {
  return fs$j.chmod(dest, srcMode | 0o200)
}

async function onDir$1 (srcStat, destStat, src, dest, opts) {
  // the dest directory might not exist, create it
  if (!destStat) {
    await fs$j.mkdir(dest);
  }

  const items = await fs$j.readdir(src);

  // loop through the files in the current directory to copy everything
  await Promise.all(items.map(async item => {
    const srcItem = path$j.join(src, item);
    const destItem = path$j.join(dest, item);

    // skip the item if it is matches by the filter function
    const include = await runFilter(srcItem, destItem, opts);
    if (!include) return

    const { destStat } = await stat$4.checkPaths(srcItem, destItem, 'copy', opts);

    // If the item is a copyable file, `getStatsAndPerformCopy` will copy it
    // If the item is a directory, `getStatsAndPerformCopy` will call `onDir` recursively
    return getStatsAndPerformCopy(destStat, srcItem, destItem, opts)
  }));

  if (!destStat) {
    await fs$j.chmod(dest, srcStat.mode);
  }
}

async function onLink$1 (destStat, src, dest, opts) {
  let resolvedSrc = await fs$j.readlink(src);
  if (opts.dereference) {
    resolvedSrc = path$j.resolve(process.cwd(), resolvedSrc);
  }
  if (!destStat) {
    return fs$j.symlink(resolvedSrc, dest)
  }

  let resolvedDest = null;
  try {
    resolvedDest = await fs$j.readlink(dest);
  } catch (e) {
    // dest exists and is a regular file or directory,
    // Windows may throw UNKNOWN error. If dest already exists,
    // fs throws error anyway, so no need to guard against it here.
    if (e.code === 'EINVAL' || e.code === 'UNKNOWN') return fs$j.symlink(resolvedSrc, dest)
    throw e
  }
  if (opts.dereference) {
    resolvedDest = path$j.resolve(process.cwd(), resolvedDest);
  }
  if (stat$4.isSrcSubdir(resolvedSrc, resolvedDest)) {
    throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`)
  }

  // do not copy if src is a subdir of dest since unlinking
  // dest in this case would result in removing src contents
  // and therefore a broken symlink would be created.
  if (stat$4.isSrcSubdir(resolvedDest, resolvedSrc)) {
    throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`)
  }

  // copy the link
  await fs$j.unlink(dest);
  return fs$j.symlink(resolvedSrc, dest)
}

var copy_1 = copy$2;

const fs$i = gracefulFs;
const path$i = require$$1;
const mkdirsSync$1 = mkdirs$2.mkdirsSync;
const utimesMillisSync = utimes.utimesMillisSync;
const stat$3 = stat$5;

function copySync$1 (src, dest, opts) {
  if (typeof opts === 'function') {
    opts = { filter: opts };
  }

  opts = opts || {};
  opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now
  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber

  // Warn about using preserveTimestamps on 32-bit node
  if (opts.preserveTimestamps && process.arch === 'ia32') {
    process.emitWarning(
      'Using the preserveTimestamps option in 32-bit node is not recommended;\n\n' +
      '\tsee https://github.com/jprichardson/node-fs-extra/issues/269',
      'Warning', 'fs-extra-WARN0002'
    );
  }

  const { srcStat, destStat } = stat$3.checkPathsSync(src, dest, 'copy', opts);
  stat$3.checkParentPathsSync(src, srcStat, dest, 'copy');
  if (opts.filter && !opts.filter(src, dest)) return
  const destParent = path$i.dirname(dest);
  if (!fs$i.existsSync(destParent)) mkdirsSync$1(destParent);
  return getStats(destStat, src, dest, opts)
}

function getStats (destStat, src, dest, opts) {
  const statSync = opts.dereference ? fs$i.statSync : fs$i.lstatSync;
  const srcStat = statSync(src);

  if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts)
  else if (srcStat.isFile() ||
           srcStat.isCharacterDevice() ||
           srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts)
  else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts)
  else if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`)
  else if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`)
  throw new Error(`Unknown file: ${src}`)
}

function onFile (srcStat, destStat, src, dest, opts) {
  if (!destStat) return copyFile(srcStat, src, dest, opts)
  return mayCopyFile(srcStat, src, dest, opts)
}

function mayCopyFile (srcStat, src, dest, opts) {
  if (opts.overwrite) {
    fs$i.unlinkSync(dest);
    return copyFile(srcStat, src, dest, opts)
  } else if (opts.errorOnExist) {
    throw new Error(`'${dest}' already exists`)
  }
}

function copyFile (srcStat, src, dest, opts) {
  fs$i.copyFileSync(src, dest);
  if (opts.preserveTimestamps) handleTimestamps(srcStat.mode, src, dest);
  return setDestMode(dest, srcStat.mode)
}

function handleTimestamps (srcMode, src, dest) {
  // Make sure the file is writable before setting the timestamp
  // otherwise open fails with EPERM when invoked with 'r+'
  // (through utimes call)
  if (fileIsNotWritable(srcMode)) makeFileWritable(dest, srcMode);
  return setDestTimestamps(src, dest)
}

function fileIsNotWritable (srcMode) {
  return (srcMode & 0o200) === 0
}

function makeFileWritable (dest, srcMode) {
  return setDestMode(dest, srcMode | 0o200)
}

function setDestMode (dest, srcMode) {
  return fs$i.chmodSync(dest, srcMode)
}

function setDestTimestamps (src, dest) {
  // The initial srcStat.atime cannot be trusted
  // because it is modified by the read(2) system call
  // (See https://nodejs.org/api/fs.html#fs_stat_time_values)
  const updatedSrcStat = fs$i.statSync(src);
  return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime)
}

function onDir (srcStat, destStat, src, dest, opts) {
  if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts)
  return copyDir(src, dest, opts)
}

function mkDirAndCopy (srcMode, src, dest, opts) {
  fs$i.mkdirSync(dest);
  copyDir(src, dest, opts);
  return setDestMode(dest, srcMode)
}

function copyDir (src, dest, opts) {
  fs$i.readdirSync(src).forEach(item => copyDirItem(item, src, dest, opts));
}

function copyDirItem (item, src, dest, opts) {
  const srcItem = path$i.join(src, item);
  const destItem = path$i.join(dest, item);
  if (opts.filter && !opts.filter(srcItem, destItem)) return
  const { destStat } = stat$3.checkPathsSync(srcItem, destItem, 'copy', opts);
  return getStats(destStat, srcItem, destItem, opts)
}

function onLink (destStat, src, dest, opts) {
  let resolvedSrc = fs$i.readlinkSync(src);
  if (opts.dereference) {
    resolvedSrc = path$i.resolve(process.cwd(), resolvedSrc);
  }

  if (!destStat) {
    return fs$i.symlinkSync(resolvedSrc, dest)
  } else {
    let resolvedDest;
    try {
      resolvedDest = fs$i.readlinkSync(dest);
    } catch (err) {
      // dest exists and is a regular file or directory,
      // Windows may throw UNKNOWN error. If dest already exists,
      // fs throws error anyway, so no need to guard against it here.
      if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return fs$i.symlinkSync(resolvedSrc, dest)
      throw err
    }
    if (opts.dereference) {
      resolvedDest = path$i.resolve(process.cwd(), resolvedDest);
    }
    if (stat$3.isSrcSubdir(resolvedSrc, resolvedDest)) {
      throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`)
    }

    // prevent copy if src is a subdir of dest since unlinking
    // dest in this case would result in removing src contents
    // and therefore a broken symlink would be created.
    if (stat$3.isSrcSubdir(resolvedDest, resolvedSrc)) {
      throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`)
    }
    return copyLink(resolvedSrc, dest)
  }
}

function copyLink (resolvedSrc, dest) {
  fs$i.unlinkSync(dest);
  return fs$i.symlinkSync(resolvedSrc, dest)
}

var copySync_1 = copySync$1;

const u$a = universalify$1.fromPromise;
var copy$1 = {
  copy: u$a(copy_1),
  copySync: copySync_1
};

const fs$h = gracefulFs;
const u$9 = universalify$1.fromCallback;

function remove$2 (path, callback) {
  fs$h.rm(path, { recursive: true, force: true }, callback);
}

function removeSync$1 (path) {
  fs$h.rmSync(path, { recursive: true, force: true });
}

var remove_1 = {
  remove: u$9(remove$2),
  removeSync: removeSync$1
};

const u$8 = universalify$1.fromPromise;
const fs$g = fs$p;
const path$h = require$$1;
const mkdir$3 = mkdirs$2;
const remove$1 = remove_1;

const emptyDir = u$8(async function emptyDir (dir) {
  let items;
  try {
    items = await fs$g.readdir(dir);
  } catch {
    return mkdir$3.mkdirs(dir)
  }

  return Promise.all(items.map(item => remove$1.remove(path$h.join(dir, item))))
});

function emptyDirSync (dir) {
  let items;
  try {
    items = fs$g.readdirSync(dir);
  } catch {
    return mkdir$3.mkdirsSync(dir)
  }

  items.forEach(item => {
    item = path$h.join(dir, item);
    remove$1.removeSync(item);
  });
}

var empty = {
  emptyDirSync,
  emptydirSync: emptyDirSync,
  emptyDir,
  emptydir: emptyDir
};

const u$7 = universalify$1.fromPromise;
const path$g = require$$1;
const fs$f = fs$p;
const mkdir$2 = mkdirs$2;

async function createFile$1 (file) {
  let stats;
  try {
    stats = await fs$f.stat(file);
  } catch { }
  if (stats && stats.isFile()) return

  const dir = path$g.dirname(file);

  let dirStats = null;
  try {
    dirStats = await fs$f.stat(dir);
  } catch (err) {
    // if the directory doesn't exist, make it
    if (err.code === 'ENOENT') {
      await mkdir$2.mkdirs(dir);
      await fs$f.writeFile(file, '');
      return
    } else {
      throw err
    }
  }

  if (dirStats.isDirectory()) {
    await fs$f.writeFile(file, '');
  } else {
    // parent is not a directory
    // This is just to cause an internal ENOTDIR error to be thrown
    await fs$f.readdir(dir);
  }
}

function createFileSync$1 (file) {
  let stats;
  try {
    stats = fs$f.statSync(file);
  } catch { }
  if (stats && stats.isFile()) return

  const dir = path$g.dirname(file);
  try {
    if (!fs$f.statSync(dir).isDirectory()) {
      // parent is not a directory
      // This is just to cause an internal ENOTDIR error to be thrown
      fs$f.readdirSync(dir);
    }
  } catch (err) {
    // If the stat call above failed because the directory doesn't exist, create it
    if (err && err.code === 'ENOENT') mkdir$2.mkdirsSync(dir);
    else throw err
  }

  fs$f.writeFileSync(file, '');
}

var file = {
  createFile: u$7(createFile$1),
  createFileSync: createFileSync$1
};

const u$6 = universalify$1.fromPromise;
const path$f = require$$1;
const fs$e = fs$p;
const mkdir$1 = mkdirs$2;
const { pathExists: pathExists$4 } = pathExists_1;
const { areIdentical: areIdentical$1 } = stat$5;

async function createLink$1 (srcpath, dstpath) {
  let dstStat;
  try {
    dstStat = await fs$e.lstat(dstpath);
  } catch {
    // ignore error
  }

  let srcStat;
  try {
    srcStat = await fs$e.lstat(srcpath);
  } catch (err) {
    err.message = err.message.replace('lstat', 'ensureLink');
    throw err
  }

  if (dstStat && areIdentical$1(srcStat, dstStat)) return

  const dir = path$f.dirname(dstpath);

  const dirExists = await pathExists$4(dir);

  if (!dirExists) {
    await mkdir$1.mkdirs(dir);
  }

  await fs$e.link(srcpath, dstpath);
}

function createLinkSync$1 (srcpath, dstpath) {
  let dstStat;
  try {
    dstStat = fs$e.lstatSync(dstpath);
  } catch {}

  try {
    const srcStat = fs$e.lstatSync(srcpath);
    if (dstStat && areIdentical$1(srcStat, dstStat)) return
  } catch (err) {
    err.message = err.message.replace('lstat', 'ensureLink');
    throw err
  }

  const dir = path$f.dirname(dstpath);
  const dirExists = fs$e.existsSync(dir);
  if (dirExists) return fs$e.linkSync(srcpath, dstpath)
  mkdir$1.mkdirsSync(dir);

  return fs$e.linkSync(srcpath, dstpath)
}

var link = {
  createLink: u$6(createLink$1),
  createLinkSync: createLinkSync$1
};

const path$e = require$$1;
const fs$d = fs$p;
const { pathExists: pathExists$3 } = pathExists_1;

const u$5 = universalify$1.fromPromise;

/**
 * Function that returns two types of paths, one relative to symlink, and one
 * relative to the current working directory. Checks if path is absolute or
 * relative. If the path is relative, this function checks if the path is
 * relative to symlink or relative to current working directory. This is an
 * initiative to find a smarter `srcpath` to supply when building symlinks.
 * This allows you to determine which path to use out of one of three possible
 * types of source paths. The first is an absolute path. This is detected by
 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
 * see if it exists. If it does it's used, if not an error is returned
 * (callback)/ thrown (sync). The other two options for `srcpath` are a
 * relative url. By default Node's `fs.symlink` works by creating a symlink
 * using `dstpath` and expects the `srcpath` to be relative to the newly
 * created symlink. If you provide a `srcpath` that does not exist on the file
 * system it results in a broken symlink. To minimize this, the function
 * checks to see if the 'relative to symlink' source file exists, and if it
 * does it will use it. If it does not, it checks if there's a file that
 * exists that is relative to the current working directory, if does its used.
 * This preserves the expectations of the original fs.symlink spec and adds
 * the ability to pass in `relative to current working direcotry` paths.
 */

async function symlinkPaths$1 (srcpath, dstpath) {
  if (path$e.isAbsolute(srcpath)) {
    try {
      await fs$d.lstat(srcpath);
    } catch (err) {
      err.message = err.message.replace('lstat', 'ensureSymlink');
      throw err
    }

    return {
      toCwd: srcpath,
      toDst: srcpath
    }
  }

  const dstdir = path$e.dirname(dstpath);
  const relativeToDst = path$e.join(dstdir, srcpath);

  const exists = await pathExists$3(relativeToDst);
  if (exists) {
    return {
      toCwd: relativeToDst,
      toDst: srcpath
    }
  }

  try {
    await fs$d.lstat(srcpath);
  } catch (err) {
    err.message = err.message.replace('lstat', 'ensureSymlink');
    throw err
  }

  return {
    toCwd: srcpath,
    toDst: path$e.relative(dstdir, srcpath)
  }
}

function symlinkPathsSync$1 (srcpath, dstpath) {
  if (path$e.isAbsolute(srcpath)) {
    const exists = fs$d.existsSync(srcpath);
    if (!exists) throw new Error('absolute srcpath does not exist')
    return {
      toCwd: srcpath,
      toDst: srcpath
    }
  }

  const dstdir = path$e.dirname(dstpath);
  const relativeToDst = path$e.join(dstdir, srcpath);
  const exists = fs$d.existsSync(relativeToDst);
  if (exists) {
    return {
      toCwd: relativeToDst,
      toDst: srcpath
    }
  }

  const srcExists = fs$d.existsSync(srcpath);
  if (!srcExists) throw new Error('relative srcpath does not exist')
  return {
    toCwd: srcpath,
    toDst: path$e.relative(dstdir, srcpath)
  }
}

var symlinkPaths_1 = {
  symlinkPaths: u$5(symlinkPaths$1),
  symlinkPathsSync: symlinkPathsSync$1
};

const fs$c = fs$p;
const u$4 = universalify$1.fromPromise;

async function symlinkType$1 (srcpath, type) {
  if (type) return type

  let stats;
  try {
    stats = await fs$c.lstat(srcpath);
  } catch {
    return 'file'
  }

  return (stats && stats.isDirectory()) ? 'dir' : 'file'
}

function symlinkTypeSync$1 (srcpath, type) {
  if (type) return type

  let stats;
  try {
    stats = fs$c.lstatSync(srcpath);
  } catch {
    return 'file'
  }
  return (stats && stats.isDirectory()) ? 'dir' : 'file'
}

var symlinkType_1 = {
  symlinkType: u$4(symlinkType$1),
  symlinkTypeSync: symlinkTypeSync$1
};

const u$3 = universalify$1.fromPromise;
const path$d = require$$1;
const fs$b = fs$p;

const { mkdirs, mkdirsSync } = mkdirs$2;

const { symlinkPaths, symlinkPathsSync } = symlinkPaths_1;
const { symlinkType, symlinkTypeSync } = symlinkType_1;

const { pathExists: pathExists$2 } = pathExists_1;

const { areIdentical } = stat$5;

async function createSymlink$1 (srcpath, dstpath, type) {
  let stats;
  try {
    stats = await fs$b.lstat(dstpath);
  } catch { }

  if (stats && stats.isSymbolicLink()) {
    const [srcStat, dstStat] = await Promise.all([
      fs$b.stat(srcpath),
      fs$b.stat(dstpath)
    ]);

    if (areIdentical(srcStat, dstStat)) return
  }

  const relative = await symlinkPaths(srcpath, dstpath);
  srcpath = relative.toDst;
  const toType = await symlinkType(relative.toCwd, type);
  const dir = path$d.dirname(dstpath);

  if (!(await pathExists$2(dir))) {
    await mkdirs(dir);
  }

  return fs$b.symlink(srcpath, dstpath, toType)
}

function createSymlinkSync$1 (srcpath, dstpath, type) {
  let stats;
  try {
    stats = fs$b.lstatSync(dstpath);
  } catch { }
  if (stats && stats.isSymbolicLink()) {
    const srcStat = fs$b.statSync(srcpath);
    const dstStat = fs$b.statSync(dstpath);
    if (areIdentical(srcStat, dstStat)) return
  }

  const relative = symlinkPathsSync(srcpath, dstpath);
  srcpath = relative.toDst;
  type = symlinkTypeSync(relative.toCwd, type);
  const dir = path$d.dirname(dstpath);
  const exists = fs$b.existsSync(dir);
  if (exists) return fs$b.symlinkSync(srcpath, dstpath, type)
  mkdirsSync(dir);
  return fs$b.symlinkSync(srcpath, dstpath, type)
}

var symlink = {
  createSymlink: u$3(createSymlink$1),
  createSymlinkSync: createSymlinkSync$1
};

const { createFile, createFileSync } = file;
const { createLink, createLinkSync } = link;
const { createSymlink, createSymlinkSync } = symlink;

var ensure = {
  // file
  createFile,
  createFileSync,
  ensureFile: createFile,
  ensureFileSync: createFileSync,
  // link
  createLink,
  createLinkSync,
  ensureLink: createLink,
  ensureLinkSync: createLinkSync,
  // symlink
  createSymlink,
  createSymlinkSync,
  ensureSymlink: createSymlink,
  ensureSymlinkSync: createSymlinkSync
};

function stringify$8 (obj, { EOL = '\n', finalEOL = true, replacer = null, spaces } = {}) {
  const EOF = finalEOL ? EOL : '';
  const str = JSON.stringify(obj, replacer, spaces);

  return str.replace(/\n/g, EOL) + EOF
}

function stripBom$1 (content) {
  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
  if (Buffer.isBuffer(content)) content = content.toString('utf8');
  return content.replace(/^\uFEFF/, '')
}

var utils$l = { stringify: stringify$8, stripBom: stripBom$1 };

let _fs;
try {
  _fs = gracefulFs;
} catch (_) {
  _fs = require$$0$2;
}
const universalify = universalify$1;
const { stringify: stringify$7, stripBom } = utils$l;

async function _readFile (file, options = {}) {
  if (typeof options === 'string') {
    options = { encoding: options };
  }

  const fs = options.fs || _fs;

  const shouldThrow = 'throws' in options ? options.throws : true;

  let data = await universalify.fromCallback(fs.readFile)(file, options);

  data = stripBom(data);

  let obj;
  try {
    obj = JSON.parse(data, options ? options.reviver : null);
  } catch (err) {
    if (shouldThrow) {
      err.message = `${file}: ${err.message}`;
      throw err
    } else {
      return null
    }
  }

  return obj
}

const readFile = universalify.fromPromise(_readFile);

function readFileSync (file, options = {}) {
  if (typeof options === 'string') {
    options = { encoding: options };
  }

  const fs = options.fs || _fs;

  const shouldThrow = 'throws' in options ? options.throws : true;

  try {
    let content = fs.readFileSync(file, options);
    content = stripBom(content);
    return JSON.parse(content, options.reviver)
  } catch (err) {
    if (shouldThrow) {
      err.message = `${file}: ${err.message}`;
      throw err
    } else {
      return null
    }
  }
}

async function _writeFile (file, obj, options = {}) {
  const fs = options.fs || _fs;

  const str = stringify$7(obj, options);

  await universalify.fromCallback(fs.writeFile)(file, str, options);
}

const writeFile = universalify.fromPromise(_writeFile);

function writeFileSync (file, obj, options = {}) {
  const fs = options.fs || _fs;

  const str = stringify$7(obj, options);
  // not sure if fs.writeFileSync returns anything, but just in case
  return fs.writeFileSync(file, str, options)
}

const jsonfile$1 = {
  readFile,
  readFileSync,
  writeFile,
  writeFileSync
};

var jsonfile_1 = jsonfile$1;

const jsonFile$1 = jsonfile_1;

var jsonfile = {
  // jsonfile exports
  readJson: jsonFile$1.readFile,
  readJsonSync: jsonFile$1.readFileSync,
  writeJson: jsonFile$1.writeFile,
  writeJsonSync: jsonFile$1.writeFileSync
};

const u$2 = universalify$1.fromPromise;
const fs$a = fs$p;
const path$c = require$$1;
const mkdir = mkdirs$2;
const pathExists$1 = pathExists_1.pathExists;

async function outputFile$1 (file, data, encoding = 'utf-8') {
  const dir = path$c.dirname(file);

  if (!(await pathExists$1(dir))) {
    await mkdir.mkdirs(dir);
  }

  return fs$a.writeFile(file, data, encoding)
}

function outputFileSync$1 (file, ...args) {
  const dir = path$c.dirname(file);
  if (!fs$a.existsSync(dir)) {
    mkdir.mkdirsSync(dir);
  }

  fs$a.writeFileSync(file, ...args);
}

var outputFile_1 = {
  outputFile: u$2(outputFile$1),
  outputFileSync: outputFileSync$1
};

const { stringify: stringify$6 } = utils$l;
const { outputFile } = outputFile_1;

async function outputJson (file, data, options = {}) {
  const str = stringify$6(data, options);

  await outputFile(file, str, options);
}

var outputJson_1 = outputJson;

const { stringify: stringify$5 } = utils$l;
const { outputFileSync } = outputFile_1;

function outputJsonSync (file, data, options) {
  const str = stringify$5(data, options);

  outputFileSync(file, str, options);
}

var outputJsonSync_1 = outputJsonSync;

const u$1 = universalify$1.fromPromise;
const jsonFile = jsonfile;

jsonFile.outputJson = u$1(outputJson_1);
jsonFile.outputJsonSync = outputJsonSync_1;
// aliases
jsonFile.outputJSON = jsonFile.outputJson;
jsonFile.outputJSONSync = jsonFile.outputJsonSync;
jsonFile.writeJSON = jsonFile.writeJson;
jsonFile.writeJSONSync = jsonFile.writeJsonSync;
jsonFile.readJSON = jsonFile.readJson;
jsonFile.readJSONSync = jsonFile.readJsonSync;

var json = jsonFile;

const fs$9 = fs$p;
const path$b = require$$1;
const { copy } = copy$1;
const { remove } = remove_1;
const { mkdirp } = mkdirs$2;
const { pathExists } = pathExists_1;
const stat$2 = stat$5;

async function move$1 (src, dest, opts = {}) {
  const overwrite = opts.overwrite || opts.clobber || false;

  const { srcStat, isChangingCase = false } = await stat$2.checkPaths(src, dest, 'move', opts);

  await stat$2.checkParentPaths(src, srcStat, dest, 'move');

  // If the parent of dest is not root, make sure it exists before proceeding
  const destParent = path$b.dirname(dest);
  const parsedParentPath = path$b.parse(destParent);
  if (parsedParentPath.root !== destParent) {
    await mkdirp(destParent);
  }

  return doRename$1(src, dest, overwrite, isChangingCase)
}

async function doRename$1 (src, dest, overwrite, isChangingCase) {
  if (!isChangingCase) {
    if (overwrite) {
      await remove(dest);
    } else if (await pathExists(dest)) {
      throw new Error('dest already exists.')
    }
  }

  try {
    // Try w/ rename first, and try copy + remove if EXDEV
    await fs$9.rename(src, dest);
  } catch (err) {
    if (err.code !== 'EXDEV') {
      throw err
    }
    await moveAcrossDevice$1(src, dest, overwrite);
  }
}

async function moveAcrossDevice$1 (src, dest, overwrite) {
  const opts = {
    overwrite,
    errorOnExist: true,
    preserveTimestamps: true
  };

  await copy(src, dest, opts);
  return remove(src)
}

var move_1 = move$1;

const fs$8 = gracefulFs;
const path$a = require$$1;
const copySync = copy$1.copySync;
const removeSync = remove_1.removeSync;
const mkdirpSync = mkdirs$2.mkdirpSync;
const stat$1 = stat$5;

function moveSync (src, dest, opts) {
  opts = opts || {};
  const overwrite = opts.overwrite || opts.clobber || false;

  const { srcStat, isChangingCase = false } = stat$1.checkPathsSync(src, dest, 'move', opts);
  stat$1.checkParentPathsSync(src, srcStat, dest, 'move');
  if (!isParentRoot(dest)) mkdirpSync(path$a.dirname(dest));
  return doRename(src, dest, overwrite, isChangingCase)
}

function isParentRoot (dest) {
  const parent = path$a.dirname(dest);
  const parsedPath = path$a.parse(parent);
  return parsedPath.root === parent
}

function doRename (src, dest, overwrite, isChangingCase) {
  if (isChangingCase) return rename(src, dest, overwrite)
  if (overwrite) {
    removeSync(dest);
    return rename(src, dest, overwrite)
  }
  if (fs$8.existsSync(dest)) throw new Error('dest already exists.')
  return rename(src, dest, overwrite)
}

function rename (src, dest, overwrite) {
  try {
    fs$8.renameSync(src, dest);
  } catch (err) {
    if (err.code !== 'EXDEV') throw err
    return moveAcrossDevice(src, dest, overwrite)
  }
}

function moveAcrossDevice (src, dest, overwrite) {
  const opts = {
    overwrite,
    errorOnExist: true,
    preserveTimestamps: true
  };
  copySync(src, dest, opts);
  return removeSync(src)
}

var moveSync_1 = moveSync;

const u = universalify$1.fromPromise;
var move = {
  move: u(move_1),
  moveSync: moveSync_1
};

var lib = {
  // Export promiseified graceful-fs:
  ...fs$p,
  // Export extra methods:
  ...copy$1,
  ...empty,
  ...ensure,
  ...json,
  ...mkdirs$2,
  ...move,
  ...outputFile_1,
  ...pathExists_1,
  ...remove_1
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};

var js = {exports: {}};

var src = {};

var javascript = {exports: {}};

var beautifier$2 = {};

var output = {};

/*jshint node:true */

var hasRequiredOutput;

function requireOutput () {
	if (hasRequiredOutput) return output;
	hasRequiredOutput = 1;

	function OutputLine(parent) {
	  this.__parent = parent;
	  this.__character_count = 0;
	  // use indent_count as a marker for this.__lines that have preserved indentation
	  this.__indent_count = -1;
	  this.__alignment_count = 0;
	  this.__wrap_point_index = 0;
	  this.__wrap_point_character_count = 0;
	  this.__wrap_point_indent_count = -1;
	  this.__wrap_point_alignment_count = 0;

	  this.__items = [];
	}

	OutputLine.prototype.clone_empty = function() {
	  var line = new OutputLine(this.__parent);
	  line.set_indent(this.__indent_count, this.__alignment_count);
	  return line;
	};

	OutputLine.prototype.item = function(index) {
	  if (index < 0) {
	    return this.__items[this.__items.length + index];
	  } else {
	    return this.__items[index];
	  }
	};

	OutputLine.prototype.has_match = function(pattern) {
	  for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
	    if (this.__items[lastCheckedOutput].match(pattern)) {
	      return true;
	    }
	  }
	  return false;
	};

	OutputLine.prototype.set_indent = function(indent, alignment) {
	  if (this.is_empty()) {
	    this.__indent_count = indent || 0;
	    this.__alignment_count = alignment || 0;
	    this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
	  }
	};

	OutputLine.prototype._set_wrap_point = function() {
	  if (this.__parent.wrap_line_length) {
	    this.__wrap_point_index = this.__items.length;
	    this.__wrap_point_character_count = this.__character_count;
	    this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
	    this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
	  }
	};

	OutputLine.prototype._should_wrap = function() {
	  return this.__wrap_point_index &&
	    this.__character_count > this.__parent.wrap_line_length &&
	    this.__wrap_point_character_count > this.__parent.next_line.__character_count;
	};

	OutputLine.prototype._allow_wrap = function() {
	  if (this._should_wrap()) {
	    this.__parent.add_new_line();
	    var next = this.__parent.current_line;
	    next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
	    next.__items = this.__items.slice(this.__wrap_point_index);
	    this.__items = this.__items.slice(0, this.__wrap_point_index);

	    next.__character_count += this.__character_count - this.__wrap_point_character_count;
	    this.__character_count = this.__wrap_point_character_count;

	    if (next.__items[0] === " ") {
	      next.__items.splice(0, 1);
	      next.__character_count -= 1;
	    }
	    return true;
	  }
	  return false;
	};

	OutputLine.prototype.is_empty = function() {
	  return this.__items.length === 0;
	};

	OutputLine.prototype.last = function() {
	  if (!this.is_empty()) {
	    return this.__items[this.__items.length - 1];
	  } else {
	    return null;
	  }
	};

	OutputLine.prototype.push = function(item) {
	  this.__items.push(item);
	  var last_newline_index = item.lastIndexOf('\n');
	  if (last_newline_index !== -1) {
	    this.__character_count = item.length - last_newline_index;
	  } else {
	    this.__character_count += item.length;
	  }
	};

	OutputLine.prototype.pop = function() {
	  var item = null;
	  if (!this.is_empty()) {
	    item = this.__items.pop();
	    this.__character_count -= item.length;
	  }
	  return item;
	};


	OutputLine.prototype._remove_indent = function() {
	  if (this.__indent_count > 0) {
	    this.__indent_count -= 1;
	    this.__character_count -= this.__parent.indent_size;
	  }
	};

	OutputLine.prototype._remove_wrap_indent = function() {
	  if (this.__wrap_point_indent_count > 0) {
	    this.__wrap_point_indent_count -= 1;
	  }
	};
	OutputLine.prototype.trim = function() {
	  while (this.last() === ' ') {
	    this.__items.pop();
	    this.__character_count -= 1;
	  }
	};

	OutputLine.prototype.toString = function() {
	  var result = '';
	  if (this.is_empty()) {
	    if (this.__parent.indent_empty_lines) {
	      result = this.__parent.get_indent_string(this.__indent_count);
	    }
	  } else {
	    result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
	    result += this.__items.join('');
	  }
	  return result;
	};

	function IndentStringCache(options, baseIndentString) {
	  this.__cache = [''];
	  this.__indent_size = options.indent_size;
	  this.__indent_string = options.indent_char;
	  if (!options.indent_with_tabs) {
	    this.__indent_string = new Array(options.indent_size + 1).join(options.indent_char);
	  }

	  // Set to null to continue support for auto detection of base indent
	  baseIndentString = baseIndentString || '';
	  if (options.indent_level > 0) {
	    baseIndentString = new Array(options.indent_level + 1).join(this.__indent_string);
	  }

	  this.__base_string = baseIndentString;
	  this.__base_string_length = baseIndentString.length;
	}

	IndentStringCache.prototype.get_indent_size = function(indent, column) {
	  var result = this.__base_string_length;
	  column = column || 0;
	  if (indent < 0) {
	    result = 0;
	  }
	  result += indent * this.__indent_size;
	  result += column;
	  return result;
	};

	IndentStringCache.prototype.get_indent_string = function(indent_level, column) {
	  var result = this.__base_string;
	  column = column || 0;
	  if (indent_level < 0) {
	    indent_level = 0;
	    result = '';
	  }
	  column += indent_level * this.__indent_size;
	  this.__ensure_cache(column);
	  result += this.__cache[column];
	  return result;
	};

	IndentStringCache.prototype.__ensure_cache = function(column) {
	  while (column >= this.__cache.length) {
	    this.__add_column();
	  }
	};

	IndentStringCache.prototype.__add_column = function() {
	  var column = this.__cache.length;
	  var indent = 0;
	  var result = '';
	  if (this.__indent_size && column >= this.__indent_size) {
	    indent = Math.floor(column / this.__indent_size);
	    column -= indent * this.__indent_size;
	    result = new Array(indent + 1).join(this.__indent_string);
	  }
	  if (column) {
	    result += new Array(column + 1).join(' ');
	  }

	  this.__cache.push(result);
	};

	function Output(options, baseIndentString) {
	  this.__indent_cache = new IndentStringCache(options, baseIndentString);
	  this.raw = false;
	  this._end_with_newline = options.end_with_newline;
	  this.indent_size = options.indent_size;
	  this.wrap_line_length = options.wrap_line_length;
	  this.indent_empty_lines = options.indent_empty_lines;
	  this.__lines = [];
	  this.previous_line = null;
	  this.current_line = null;
	  this.next_line = new OutputLine(this);
	  this.space_before_token = false;
	  this.non_breaking_space = false;
	  this.previous_token_wrapped = false;
	  // initialize
	  this.__add_outputline();
	}

	Output.prototype.__add_outputline = function() {
	  this.previous_line = this.current_line;
	  this.current_line = this.next_line.clone_empty();
	  this.__lines.push(this.current_line);
	};

	Output.prototype.get_line_number = function() {
	  return this.__lines.length;
	};

	Output.prototype.get_indent_string = function(indent, column) {
	  return this.__indent_cache.get_indent_string(indent, column);
	};

	Output.prototype.get_indent_size = function(indent, column) {
	  return this.__indent_cache.get_indent_size(indent, column);
	};

	Output.prototype.is_empty = function() {
	  return !this.previous_line && this.current_line.is_empty();
	};

	Output.prototype.add_new_line = function(force_newline) {
	  // never newline at the start of file
	  // otherwise, newline only if we didn't just add one or we're forced
	  if (this.is_empty() ||
	    (!force_newline && this.just_added_newline())) {
	    return false;
	  }

	  // if raw output is enabled, don't print additional newlines,
	  // but still return True as though you had
	  if (!this.raw) {
	    this.__add_outputline();
	  }
	  return true;
	};

	Output.prototype.get_code = function(eol) {
	  this.trim(true);

	  // handle some edge cases where the last tokens
	  // has text that ends with newline(s)
	  var last_item = this.current_line.pop();
	  if (last_item) {
	    if (last_item[last_item.length - 1] === '\n') {
	      last_item = last_item.replace(/\n+$/g, '');
	    }
	    this.current_line.push(last_item);
	  }

	  if (this._end_with_newline) {
	    this.__add_outputline();
	  }

	  var sweet_code = this.__lines.join('\n');

	  if (eol !== '\n') {
	    sweet_code = sweet_code.replace(/[\n]/g, eol);
	  }
	  return sweet_code;
	};

	Output.prototype.set_wrap_point = function() {
	  this.current_line._set_wrap_point();
	};

	Output.prototype.set_indent = function(indent, alignment) {
	  indent = indent || 0;
	  alignment = alignment || 0;

	  // Next line stores alignment values
	  this.next_line.set_indent(indent, alignment);

	  // Never indent your first output indent at the start of the file
	  if (this.__lines.length > 1) {
	    this.current_line.set_indent(indent, alignment);
	    return true;
	  }

	  this.current_line.set_indent();
	  return false;
	};

	Output.prototype.add_raw_token = function(token) {
	  for (var x = 0; x < token.newlines; x++) {
	    this.__add_outputline();
	  }
	  this.current_line.set_indent(-1);
	  this.current_line.push(token.whitespace_before);
	  this.current_line.push(token.text);
	  this.space_before_token = false;
	  this.non_breaking_space = false;
	  this.previous_token_wrapped = false;
	};

	Output.prototype.add_token = function(printable_token) {
	  this.__add_space_before_token();
	  this.current_line.push(printable_token);
	  this.space_before_token = false;
	  this.non_breaking_space = false;
	  this.previous_token_wrapped = this.current_line._allow_wrap();
	};

	Output.prototype.__add_space_before_token = function() {
	  if (this.space_before_token && !this.just_added_newline()) {
	    if (!this.non_breaking_space) {
	      this.set_wrap_point();
	    }
	    this.current_line.push(' ');
	  }
	};

	Output.prototype.remove_indent = function(index) {
	  var output_length = this.__lines.length;
	  while (index < output_length) {
	    this.__lines[index]._remove_indent();
	    index++;
	  }
	  this.current_line._remove_wrap_indent();
	};

	Output.prototype.trim = function(eat_newlines) {
	  eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;

	  this.current_line.trim();

	  while (eat_newlines && this.__lines.length > 1 &&
	    this.current_line.is_empty()) {
	    this.__lines.pop();
	    this.current_line = this.__lines[this.__lines.length - 1];
	    this.current_line.trim();
	  }

	  this.previous_line = this.__lines.length > 1 ?
	    this.__lines[this.__lines.length - 2] : null;
	};

	Output.prototype.just_added_newline = function() {
	  return this.current_line.is_empty();
	};

	Output.prototype.just_added_blankline = function() {
	  return this.is_empty() ||
	    (this.current_line.is_empty() && this.previous_line.is_empty());
	};

	Output.prototype.ensure_empty_line_above = function(starts_with, ends_with) {
	  var index = this.__lines.length - 2;
	  while (index >= 0) {
	    var potentialEmptyLine = this.__lines[index];
	    if (potentialEmptyLine.is_empty()) {
	      break;
	    } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 &&
	      potentialEmptyLine.item(-1) !== ends_with) {
	      this.__lines.splice(index + 1, 0, new OutputLine(this));
	      this.previous_line = this.__lines[this.__lines.length - 2];
	      break;
	    }
	    index--;
	  }
	};

	output.Output = Output;
	return output;
}

var token = {};

/*jshint node:true */

var hasRequiredToken;

function requireToken () {
	if (hasRequiredToken) return token;
	hasRequiredToken = 1;

	function Token(type, text, newlines, whitespace_before) {
	  this.type = type;
	  this.text = text;

	  // comments_before are
	  // comments that have a new line before them
	  // and may or may not have a newline after
	  // this is a set of comments before
	  this.comments_before = null; /* inline comment*/


	  // this.comments_after =  new TokenStream(); // no new line before and newline after
	  this.newlines = newlines || 0;
	  this.whitespace_before = whitespace_before || '';
	  this.parent = null;
	  this.next = null;
	  this.previous = null;
	  this.opened = null;
	  this.closed = null;
	  this.directives = null;
	}


	token.Token = Token;
	return token;
}

var acorn = {};

/* jshint node: true, curly: false */

var hasRequiredAcorn;

function requireAcorn () {
	if (hasRequiredAcorn) return acorn;
	hasRequiredAcorn = 1;
	(function (exports) {

		// acorn used char codes to squeeze the last bit of performance out
		// Beautifier is okay without that, so we're using regex
		// permit # (23), $ (36), and @ (64). @ is used in ES7 decorators.
		// 65 through 91 are uppercase letters.
		// permit _ (95).
		// 97 through 123 are lowercase letters.
		var baseASCIIidentifierStartChars = "\\x23\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a";

		// inside an identifier @ is not allowed but 0-9 are.
		var baseASCIIidentifierChars = "\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a";

		// Big ugly regular expressions that match characters in the
		// whitespace, identifier, and identifier-start categories. These
		// are only applied when a character is found to actually have a
		// code point above 128.
		var nonASCIIidentifierStartChars = "\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc";
		var nonASCIIidentifierChars = "\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f";
		//var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
		//var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

		var unicodeEscapeOrCodePoint = "\\\\u[0-9a-fA-F]{4}|\\\\u\\{[0-9a-fA-F]+\\}";
		var identifierStart = "(?:" + unicodeEscapeOrCodePoint + "|[" + baseASCIIidentifierStartChars + nonASCIIidentifierStartChars + "])";
		var identifierChars = "(?:" + unicodeEscapeOrCodePoint + "|[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "])*";

		exports.identifier = new RegExp(identifierStart + identifierChars, 'g');
		exports.identifierStart = new RegExp(identifierStart);
		exports.identifierMatch = new RegExp("(?:" + unicodeEscapeOrCodePoint + "|[" + baseASCIIidentifierChars + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "])+");

		// Whether a single character denotes a newline.

		exports.newline = /[\n\r\u2028\u2029]/;

		// Matches a whole line break (where CRLF is considered a single
		// line break). Used to count lines.

		// in javascript, these two differ
		// in python they are the same, different methods are called on them
		exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
		exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g'); 
	} (acorn));
	return acorn;
}

var options$3 = {};

var options$2 = {};

/*jshint node:true */

var hasRequiredOptions$3;

function requireOptions$3 () {
	if (hasRequiredOptions$3) return options$2;
	hasRequiredOptions$3 = 1;

	function Options(options, merge_child_field) {
	  this.raw_options = _mergeOpts(options, merge_child_field);

	  // Support passing the source text back with no change
	  this.disabled = this._get_boolean('disabled');

	  this.eol = this._get_characters('eol', 'auto');
	  this.end_with_newline = this._get_boolean('end_with_newline');
	  this.indent_size = this._get_number('indent_size', 4);
	  this.indent_char = this._get_characters('indent_char', ' ');
	  this.indent_level = this._get_number('indent_level');

	  this.preserve_newlines = this._get_boolean('preserve_newlines', true);
	  this.max_preserve_newlines = this._get_number('max_preserve_newlines', 32786);
	  if (!this.preserve_newlines) {
	    this.max_preserve_newlines = 0;
	  }

	  this.indent_with_tabs = this._get_boolean('indent_with_tabs', this.indent_char === '\t');
	  if (this.indent_with_tabs) {
	    this.indent_char = '\t';

	    // indent_size behavior changed after 1.8.6
	    // It used to be that indent_size would be
	    // set to 1 for indent_with_tabs. That is no longer needed and
	    // actually doesn't make sense - why not use spaces? Further,
	    // that might produce unexpected behavior - tabs being used
	    // for single-column alignment. So, when indent_with_tabs is true
	    // and indent_size is 1, reset indent_size to 4.
	    if (this.indent_size === 1) {
	      this.indent_size = 4;
	    }
	  }

	  // Backwards compat with 1.3.x
	  this.wrap_line_length = this._get_number('wrap_line_length', this._get_number('max_char'));

	  this.indent_empty_lines = this._get_boolean('indent_empty_lines');

	  // valid templating languages ['django', 'erb', 'handlebars', 'php', 'smarty']
	  // For now, 'auto' = all off for javascript, all on for html (and inline javascript).
	  // other values ignored
	  this.templating = this._get_selection_list('templating', ['auto', 'none', 'django', 'erb', 'handlebars', 'php', 'smarty'], ['auto']);
	}

	Options.prototype._get_array = function(name, default_value) {
	  var option_value = this.raw_options[name];
	  var result = default_value || [];
	  if (typeof option_value === 'object') {
	    if (option_value !== null && typeof option_value.concat === 'function') {
	      result = option_value.concat();
	    }
	  } else if (typeof option_value === 'string') {
	    result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
	  }
	  return result;
	};

	Options.prototype._get_boolean = function(name, default_value) {
	  var option_value = this.raw_options[name];
	  var result = option_value === undefined ? !!default_value : !!option_value;
	  return result;
	};

	Options.prototype._get_characters = function(name, default_value) {
	  var option_value = this.raw_options[name];
	  var result = default_value || '';
	  if (typeof option_value === 'string') {
	    result = option_value.replace(/\\r/, '\r').replace(/\\n/, '\n').replace(/\\t/, '\t');
	  }
	  return result;
	};

	Options.prototype._get_number = function(name, default_value) {
	  var option_value = this.raw_options[name];
	  default_value = parseInt(default_value, 10);
	  if (isNaN(default_value)) {
	    default_value = 0;
	  }
	  var result = parseInt(option_value, 10);
	  if (isNaN(result)) {
	    result = default_value;
	  }
	  return result;
	};

	Options.prototype._get_selection = function(name, selection_list, default_value) {
	  var result = this._get_selection_list(name, selection_list, default_value);
	  if (result.length !== 1) {
	    throw new Error(
	      "Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" +
	      selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
	  }

	  return result[0];
	};


	Options.prototype._get_selection_list = function(name, selection_list, default_value) {
	  if (!selection_list || selection_list.length === 0) {
	    throw new Error("Selection list cannot be empty.");
	  }

	  default_value = default_value || [selection_list[0]];
	  if (!this._is_valid_selection(default_value, selection_list)) {
	    throw new Error("Invalid Default Value!");
	  }

	  var result = this._get_array(name, default_value);
	  if (!this._is_valid_selection(result, selection_list)) {
	    throw new Error(
	      "Invalid Option Value: The option '" + name + "' can contain only the following values:\n" +
	      selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
	  }

	  return result;
	};

	Options.prototype._is_valid_selection = function(result, selection_list) {
	  return result.length && selection_list.length &&
	    !result.some(function(item) { return selection_list.indexOf(item) === -1; });
	};


	// merges child options up with the parent options object
	// Example: obj = {a: 1, b: {a: 2}}
	//          mergeOpts(obj, 'b')
	//
	//          Returns: {a: 2}
	function _mergeOpts(allOptions, childFieldName) {
	  var finalOpts = {};
	  allOptions = _normalizeOpts(allOptions);
	  var name;

	  for (name in allOptions) {
	    if (name !== childFieldName) {
	      finalOpts[name] = allOptions[name];
	    }
	  }

	  //merge in the per type settings for the childFieldName
	  if (childFieldName && allOptions[childFieldName]) {
	    for (name in allOptions[childFieldName]) {
	      finalOpts[name] = allOptions[childFieldName][name];
	    }
	  }
	  return finalOpts;
	}

	function _normalizeOpts(options) {
	  var convertedOpts = {};
	  var key;

	  for (key in options) {
	    var newKey = key.replace(/-/g, "_");
	    convertedOpts[newKey] = options[key];
	  }
	  return convertedOpts;
	}

	options$2.Options = Options;
	options$2.normalizeOpts = _normalizeOpts;
	options$2.mergeOpts = _mergeOpts;
	return options$2;
}

/*jshint node:true */

var hasRequiredOptions$2;

function requireOptions$2 () {
	if (hasRequiredOptions$2) return options$3;
	hasRequiredOptions$2 = 1;

	var BaseOptions = requireOptions$3().Options;

	var validPositionValues = ['before-newline', 'after-newline', 'preserve-newline'];

	function Options(options) {
	  BaseOptions.call(this, options, 'js');

	  // compatibility, re
	  var raw_brace_style = this.raw_options.brace_style || null;
	  if (raw_brace_style === "expand-strict") { //graceful handling of deprecated option
	    this.raw_options.brace_style = "expand";
	  } else if (raw_brace_style === "collapse-preserve-inline") { //graceful handling of deprecated option
	    this.raw_options.brace_style = "collapse,preserve-inline";
	  } else if (this.raw_options.braces_on_own_line !== undefined) { //graceful handling of deprecated option
	    this.raw_options.brace_style = this.raw_options.braces_on_own_line ? "expand" : "collapse";
	    // } else if (!raw_brace_style) { //Nothing exists to set it
	    //   raw_brace_style = "collapse";
	  }

	  //preserve-inline in delimited string will trigger brace_preserve_inline, everything
	  //else is considered a brace_style and the last one only will have an effect

	  var brace_style_split = this._get_selection_list('brace_style', ['collapse', 'expand', 'end-expand', 'none', 'preserve-inline']);

	  this.brace_preserve_inline = false; //Defaults in case one or other was not specified in meta-option
	  this.brace_style = "collapse";

	  for (var bs = 0; bs < brace_style_split.length; bs++) {
	    if (brace_style_split[bs] === "preserve-inline") {
	      this.brace_preserve_inline = true;
	    } else {
	      this.brace_style = brace_style_split[bs];
	    }
	  }

	  this.unindent_chained_methods = this._get_boolean('unindent_chained_methods');
	  this.break_chained_methods = this._get_boolean('break_chained_methods');
	  this.space_in_paren = this._get_boolean('space_in_paren');
	  this.space_in_empty_paren = this._get_boolean('space_in_empty_paren');
	  this.jslint_happy = this._get_boolean('jslint_happy');
	  this.space_after_anon_function = this._get_boolean('space_after_anon_function');
	  this.space_after_named_function = this._get_boolean('space_after_named_function');
	  this.keep_array_indentation = this._get_boolean('keep_array_indentation');
	  this.space_before_conditional = this._get_boolean('space_before_conditional', true);
	  this.unescape_strings = this._get_boolean('unescape_strings');
	  this.e4x = this._get_boolean('e4x');
	  this.comma_first = this._get_boolean('comma_first');
	  this.operator_position = this._get_selection('operator_position', validPositionValues);

	  // For testing of beautify preserve:start directive
	  this.test_output_raw = this._get_boolean('test_output_raw');

	  // force this._options.space_after_anon_function to true if this._options.jslint_happy
	  if (this.jslint_happy) {
	    this.space_after_anon_function = true;
	  }

	}
	Options.prototype = new BaseOptions();



	options$3.Options = Options;
	return options$3;
}

var tokenizer$2 = {};

var inputscanner = {};

/*jshint node:true */

var hasRequiredInputscanner;

function requireInputscanner () {
	if (hasRequiredInputscanner) return inputscanner;
	hasRequiredInputscanner = 1;

	var regexp_has_sticky = RegExp.prototype.hasOwnProperty('sticky');

	function InputScanner(input_string) {
	  this.__input = input_string || '';
	  this.__input_length = this.__input.length;
	  this.__position = 0;
	}

	InputScanner.prototype.restart = function() {
	  this.__position = 0;
	};

	InputScanner.prototype.back = function() {
	  if (this.__position > 0) {
	    this.__position -= 1;
	  }
	};

	InputScanner.prototype.hasNext = function() {
	  return this.__position < this.__input_length;
	};

	InputScanner.prototype.next = function() {
	  var val = null;
	  if (this.hasNext()) {
	    val = this.__input.charAt(this.__position);
	    this.__position += 1;
	  }
	  return val;
	};

	InputScanner.prototype.peek = function(index) {
	  var val = null;
	  index = index || 0;
	  index += this.__position;
	  if (index >= 0 && index < this.__input_length) {
	    val = this.__input.charAt(index);
	  }
	  return val;
	};

	// This is a JavaScript only helper function (not in python)
	// Javascript doesn't have a match method
	// and not all implementation support "sticky" flag.
	// If they do not support sticky then both this.match() and this.test() method
	// must get the match and check the index of the match.
	// If sticky is supported and set, this method will use it.
	// Otherwise it will check that global is set, and fall back to the slower method.
	InputScanner.prototype.__match = function(pattern, index) {
	  pattern.lastIndex = index;
	  var pattern_match = pattern.exec(this.__input);

	  if (pattern_match && !(regexp_has_sticky && pattern.sticky)) {
	    if (pattern_match.index !== index) {
	      pattern_match = null;
	    }
	  }

	  return pattern_match;
	};

	InputScanner.prototype.test = function(pattern, index) {
	  index = index || 0;
	  index += this.__position;

	  if (index >= 0 && index < this.__input_length) {
	    return !!this.__match(pattern, index);
	  } else {
	    return false;
	  }
	};

	InputScanner.prototype.testChar = function(pattern, index) {
	  // test one character regex match
	  var val = this.peek(index);
	  pattern.lastIndex = 0;
	  return val !== null && pattern.test(val);
	};

	InputScanner.prototype.match = function(pattern) {
	  var pattern_match = this.__match(pattern, this.__position);
	  if (pattern_match) {
	    this.__position += pattern_match[0].length;
	  } else {
	    pattern_match = null;
	  }
	  return pattern_match;
	};

	InputScanner.prototype.read = function(starting_pattern, until_pattern, until_after) {
	  var val = '';
	  var match;
	  if (starting_pattern) {
	    match = this.match(starting_pattern);
	    if (match) {
	      val += match[0];
	    }
	  }
	  if (until_pattern && (match || !starting_pattern)) {
	    val += this.readUntil(until_pattern, until_after);
	  }
	  return val;
	};

	InputScanner.prototype.readUntil = function(pattern, until_after) {
	  var val = '';
	  var match_index = this.__position;
	  pattern.lastIndex = this.__position;
	  var pattern_match = pattern.exec(this.__input);
	  if (pattern_match) {
	    match_index = pattern_match.index;
	    if (until_after) {
	      match_index += pattern_match[0].length;
	    }
	  } else {
	    match_index = this.__input_length;
	  }

	  val = this.__input.substring(this.__position, match_index);
	  this.__position = match_index;
	  return val;
	};

	InputScanner.prototype.readUntilAfter = function(pattern) {
	  return this.readUntil(pattern, true);
	};

	InputScanner.prototype.get_regexp = function(pattern, match_from) {
	  var result = null;
	  var flags = 'g';
	  if (match_from && regexp_has_sticky) {
	    flags = 'y';
	  }
	  // strings are converted to regexp
	  if (typeof pattern === "string" && pattern !== '') {
	    // result = new RegExp(pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), flags);
	    result = new RegExp(pattern, flags);
	  } else if (pattern) {
	    result = new RegExp(pattern.source, flags);
	  }
	  return result;
	};

	InputScanner.prototype.get_literal_regexp = function(literal_string) {
	  return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
	};

	/* css beautifier legacy helpers */
	InputScanner.prototype.peekUntilAfter = function(pattern) {
	  var start = this.__position;
	  var val = this.readUntilAfter(pattern);
	  this.__position = start;
	  return val;
	};

	InputScanner.prototype.lookBack = function(testVal) {
	  var start = this.__position - 1;
	  return start >= testVal.length && this.__input.substring(start - testVal.length, start)
	    .toLowerCase() === testVal;
	};

	inputscanner.InputScanner = InputScanner;
	return inputscanner;
}

var tokenizer$1 = {};

var tokenstream = {};

/*jshint node:true */

var hasRequiredTokenstream;

function requireTokenstream () {
	if (hasRequiredTokenstream) return tokenstream;
	hasRequiredTokenstream = 1;

	function TokenStream(parent_token) {
	  // private
	  this.__tokens = [];
	  this.__tokens_length = this.__tokens.length;
	  this.__position = 0;
	  this.__parent_token = parent_token;
	}

	TokenStream.prototype.restart = function() {
	  this.__position = 0;
	};

	TokenStream.prototype.isEmpty = function() {
	  return this.__tokens_length === 0;
	};

	TokenStream.prototype.hasNext = function() {
	  return this.__position < this.__tokens_length;
	};

	TokenStream.prototype.next = function() {
	  var val = null;
	  if (this.hasNext()) {
	    val = this.__tokens[this.__position];
	    this.__position += 1;
	  }
	  return val;
	};

	TokenStream.prototype.peek = function(index) {
	  var val = null;
	  index = index || 0;
	  index += this.__position;
	  if (index >= 0 && index < this.__tokens_length) {
	    val = this.__tokens[index];
	  }
	  return val;
	};

	TokenStream.prototype.add = function(token) {
	  if (this.__parent_token) {
	    token.parent = this.__parent_token;
	  }
	  this.__tokens.push(token);
	  this.__tokens_length += 1;
	};

	tokenstream.TokenStream = TokenStream;
	return tokenstream;
}

var whitespacepattern = {};

var pattern$2 = {};

/*jshint node:true */

var hasRequiredPattern;

function requirePattern () {
	if (hasRequiredPattern) return pattern$2;
	hasRequiredPattern = 1;

	function Pattern(input_scanner, parent) {
	  this._input = input_scanner;
	  this._starting_pattern = null;
	  this._match_pattern = null;
	  this._until_pattern = null;
	  this._until_after = false;

	  if (parent) {
	    this._starting_pattern = this._input.get_regexp(parent._starting_pattern, true);
	    this._match_pattern = this._input.get_regexp(parent._match_pattern, true);
	    this._until_pattern = this._input.get_regexp(parent._until_pattern);
	    this._until_after = parent._until_after;
	  }
	}

	Pattern.prototype.read = function() {
	  var result = this._input.read(this._starting_pattern);
	  if (!this._starting_pattern || result) {
	    result += this._input.read(this._match_pattern, this._until_pattern, this._until_after);
	  }
	  return result;
	};

	Pattern.prototype.read_match = function() {
	  return this._input.match(this._match_pattern);
	};

	Pattern.prototype.until_after = function(pattern) {
	  var result = this._create();
	  result._until_after = true;
	  result._until_pattern = this._input.get_regexp(pattern);
	  result._update();
	  return result;
	};

	Pattern.prototype.until = function(pattern) {
	  var result = this._create();
	  result._until_after = false;
	  result._until_pattern = this._input.get_regexp(pattern);
	  result._update();
	  return result;
	};

	Pattern.prototype.starting_with = function(pattern) {
	  var result = this._create();
	  result._starting_pattern = this._input.get_regexp(pattern, true);
	  result._update();
	  return result;
	};

	Pattern.prototype.matching = function(pattern) {
	  var result = this._create();
	  result._match_pattern = this._input.get_regexp(pattern, true);
	  result._update();
	  return result;
	};

	Pattern.prototype._create = function() {
	  return new Pattern(this._input, this);
	};

	Pattern.prototype._update = function() {};

	pattern$2.Pattern = Pattern;
	return pattern$2;
}

/*jshint node:true */

var hasRequiredWhitespacepattern;

function requireWhitespacepattern () {
	if (hasRequiredWhitespacepattern) return whitespacepattern;
	hasRequiredWhitespacepattern = 1;

	var Pattern = requirePattern().Pattern;

	function WhitespacePattern(input_scanner, parent) {
	  Pattern.call(this, input_scanner, parent);
	  if (parent) {
	    this._line_regexp = this._input.get_regexp(parent._line_regexp);
	  } else {
	    this.__set_whitespace_patterns('', '');
	  }

	  this.newline_count = 0;
	  this.whitespace_before_token = '';
	}
	WhitespacePattern.prototype = new Pattern();

	WhitespacePattern.prototype.__set_whitespace_patterns = function(whitespace_chars, newline_chars) {
	  whitespace_chars += '\\t ';
	  newline_chars += '\\n\\r';

	  this._match_pattern = this._input.get_regexp(
	    '[' + whitespace_chars + newline_chars + ']+', true);
	  this._newline_regexp = this._input.get_regexp(
	    '\\r\\n|[' + newline_chars + ']');
	};

	WhitespacePattern.prototype.read = function() {
	  this.newline_count = 0;
	  this.whitespace_before_token = '';

	  var resulting_string = this._input.read(this._match_pattern);
	  if (resulting_string === ' ') {
	    this.whitespace_before_token = ' ';
	  } else if (resulting_string) {
	    var matches = this.__split(this._newline_regexp, resulting_string);
	    this.newline_count = matches.length - 1;
	    this.whitespace_before_token = matches[this.newline_count];
	  }

	  return resulting_string;
	};

	WhitespacePattern.prototype.matching = function(whitespace_chars, newline_chars) {
	  var result = this._create();
	  result.__set_whitespace_patterns(whitespace_chars, newline_chars);
	  result._update();
	  return result;
	};

	WhitespacePattern.prototype._create = function() {
	  return new WhitespacePattern(this._input, this);
	};

	WhitespacePattern.prototype.__split = function(regexp, input_string) {
	  regexp.lastIndex = 0;
	  var start_index = 0;
	  var result = [];
	  var next_match = regexp.exec(input_string);
	  while (next_match) {
	    result.push(input_string.substring(start_index, next_match.index));
	    start_index = next_match.index + next_match[0].length;
	    next_match = regexp.exec(input_string);
	  }

	  if (start_index < input_string.length) {
	    result.push(input_string.substring(start_index, input_string.length));
	  } else {
	    result.push('');
	  }

	  return result;
	};



	whitespacepattern.WhitespacePattern = WhitespacePattern;
	return whitespacepattern;
}

/*jshint node:true */

var hasRequiredTokenizer$2;

function requireTokenizer$2 () {
	if (hasRequiredTokenizer$2) return tokenizer$1;
	hasRequiredTokenizer$2 = 1;

	var InputScanner = requireInputscanner().InputScanner;
	var Token = requireToken().Token;
	var TokenStream = requireTokenstream().TokenStream;
	var WhitespacePattern = requireWhitespacepattern().WhitespacePattern;

	var TOKEN = {
	  START: 'TK_START',
	  RAW: 'TK_RAW',
	  EOF: 'TK_EOF'
	};

	var Tokenizer = function(input_string, options) {
	  this._input = new InputScanner(input_string);
	  this._options = options || {};
	  this.__tokens = null;

	  this._patterns = {};
	  this._patterns.whitespace = new WhitespacePattern(this._input);
	};

	Tokenizer.prototype.tokenize = function() {
	  this._input.restart();
	  this.__tokens = new TokenStream();

	  this._reset();

	  var current;
	  var previous = new Token(TOKEN.START, '');
	  var open_token = null;
	  var open_stack = [];
	  var comments = new TokenStream();

	  while (previous.type !== TOKEN.EOF) {
	    current = this._get_next_token(previous, open_token);
	    while (this._is_comment(current)) {
	      comments.add(current);
	      current = this._get_next_token(previous, open_token);
	    }

	    if (!comments.isEmpty()) {
	      current.comments_before = comments;
	      comments = new TokenStream();
	    }

	    current.parent = open_token;

	    if (this._is_opening(current)) {
	      open_stack.push(open_token);
	      open_token = current;
	    } else if (open_token && this._is_closing(current, open_token)) {
	      current.opened = open_token;
	      open_token.closed = current;
	      open_token = open_stack.pop();
	      current.parent = open_token;
	    }

	    current.previous = previous;
	    previous.next = current;

	    this.__tokens.add(current);
	    previous = current;
	  }

	  return this.__tokens;
	};


	Tokenizer.prototype._is_first_token = function() {
	  return this.__tokens.isEmpty();
	};

	Tokenizer.prototype._reset = function() {};

	Tokenizer.prototype._get_next_token = function(previous_token, open_token) { // jshint unused:false
	  this._readWhitespace();
	  var resulting_string = this._input.read(/.+/g);
	  if (resulting_string) {
	    return this._create_token(TOKEN.RAW, resulting_string);
	  } else {
	    return this._create_token(TOKEN.EOF, '');
	  }
	};

	Tokenizer.prototype._is_comment = function(current_token) { // jshint unused:false
	  return false;
	};

	Tokenizer.prototype._is_opening = function(current_token) { // jshint unused:false
	  return false;
	};

	Tokenizer.prototype._is_closing = function(current_token, open_token) { // jshint unused:false
	  return false;
	};

	Tokenizer.prototype._create_token = function(type, text) {
	  var token = new Token(type, text,
	    this._patterns.whitespace.newline_count,
	    this._patterns.whitespace.whitespace_before_token);
	  return token;
	};

	Tokenizer.prototype._readWhitespace = function() {
	  return this._patterns.whitespace.read();
	};



	tokenizer$1.Tokenizer = Tokenizer;
	tokenizer$1.TOKEN = TOKEN;
	return tokenizer$1;
}

var directives = {};

/*jshint node:true */

var hasRequiredDirectives;

function requireDirectives () {
	if (hasRequiredDirectives) return directives;
	hasRequiredDirectives = 1;

	function Directives(start_block_pattern, end_block_pattern) {
	  start_block_pattern = typeof start_block_pattern === 'string' ? start_block_pattern : start_block_pattern.source;
	  end_block_pattern = typeof end_block_pattern === 'string' ? end_block_pattern : end_block_pattern.source;
	  this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, 'g');
	  this.__directive_pattern = / (\w+)[:](\w+)/g;

	  this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, 'g');
	}

	Directives.prototype.get_directives = function(text) {
	  if (!text.match(this.__directives_block_pattern)) {
	    return null;
	  }

	  var directives = {};
	  this.__directive_pattern.lastIndex = 0;
	  var directive_match = this.__directive_pattern.exec(text);

	  while (directive_match) {
	    directives[directive_match[1]] = directive_match[2];
	    directive_match = this.__directive_pattern.exec(text);
	  }

	  return directives;
	};

	Directives.prototype.readIgnored = function(input) {
	  return input.readUntilAfter(this.__directives_end_ignore_pattern);
	};


	directives.Directives = Directives;
	return directives;
}

var templatablepattern = {};

/*jshint node:true */

var hasRequiredTemplatablepattern;

function requireTemplatablepattern () {
	if (hasRequiredTemplatablepattern) return templatablepattern;
	hasRequiredTemplatablepattern = 1;

	var Pattern = requirePattern().Pattern;


	var template_names = {
	  django: false,
	  erb: false,
	  handlebars: false,
	  php: false,
	  smarty: false
	};

	// This lets templates appear anywhere we would do a readUntil
	// The cost is higher but it is pay to play.
	function TemplatablePattern(input_scanner, parent) {
	  Pattern.call(this, input_scanner, parent);
	  this.__template_pattern = null;
	  this._disabled = Object.assign({}, template_names);
	  this._excluded = Object.assign({}, template_names);

	  if (parent) {
	    this.__template_pattern = this._input.get_regexp(parent.__template_pattern);
	    this._excluded = Object.assign(this._excluded, parent._excluded);
	    this._disabled = Object.assign(this._disabled, parent._disabled);
	  }
	  var pattern = new Pattern(input_scanner);
	  this.__patterns = {
	    handlebars_comment: pattern.starting_with(/{{!--/).until_after(/--}}/),
	    handlebars_unescaped: pattern.starting_with(/{{{/).until_after(/}}}/),
	    handlebars: pattern.starting_with(/{{/).until_after(/}}/),
	    php: pattern.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),
	    erb: pattern.starting_with(/<%[^%]/).until_after(/[^%]%>/),
	    // django coflicts with handlebars a bit.
	    django: pattern.starting_with(/{%/).until_after(/%}/),
	    django_value: pattern.starting_with(/{{/).until_after(/}}/),
	    django_comment: pattern.starting_with(/{#/).until_after(/#}/),
	    smarty: pattern.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),
	    smarty_comment: pattern.starting_with(/{\*/).until_after(/\*}/),
	    smarty_literal: pattern.starting_with(/{literal}/).until_after(/{\/literal}/)
	  };
	}
	TemplatablePattern.prototype = new Pattern();

	TemplatablePattern.prototype._create = function() {
	  return new TemplatablePattern(this._input, this);
	};

	TemplatablePattern.prototype._update = function() {
	  this.__set_templated_pattern();
	};

	TemplatablePattern.prototype.disable = function(language) {
	  var result = this._create();
	  result._disabled[language] = true;
	  result._update();
	  return result;
	};

	TemplatablePattern.prototype.read_options = function(options) {
	  var result = this._create();
	  for (var language in template_names) {
	    result._disabled[language] = options.templating.indexOf(language) === -1;
	  }
	  result._update();
	  return result;
	};

	TemplatablePattern.prototype.exclude = function(language) {
	  var result = this._create();
	  result._excluded[language] = true;
	  result._update();
	  return result;
	};

	TemplatablePattern.prototype.read = function() {
	  var result = '';
	  if (this._match_pattern) {
	    result = this._input.read(this._starting_pattern);
	  } else {
	    result = this._input.read(this._starting_pattern, this.__template_pattern);
	  }
	  var next = this._read_template();
	  while (next) {
	    if (this._match_pattern) {
	      next += this._input.read(this._match_pattern);
	    } else {
	      next += this._input.readUntil(this.__template_pattern);
	    }
	    result += next;
	    next = this._read_template();
	  }

	  if (this._until_after) {
	    result += this._input.readUntilAfter(this._until_pattern);
	  }
	  return result;
	};

	TemplatablePattern.prototype.__set_templated_pattern = function() {
	  var items = [];

	  if (!this._disabled.php) {
	    items.push(this.__patterns.php._starting_pattern.source);
	  }
	  if (!this._disabled.handlebars) {
	    items.push(this.__patterns.handlebars._starting_pattern.source);
	  }
	  if (!this._disabled.erb) {
	    items.push(this.__patterns.erb._starting_pattern.source);
	  }
	  if (!this._disabled.django) {
	    items.push(this.__patterns.django._starting_pattern.source);
	    // The starting pattern for django is more complex because it has different
	    // patterns for value, comment, and other sections
	    items.push(this.__patterns.django_value._starting_pattern.source);
	    items.push(this.__patterns.django_comment._starting_pattern.source);
	  }
	  if (!this._disabled.smarty) {
	    items.push(this.__patterns.smarty._starting_pattern.source);
	  }

	  if (this._until_pattern) {
	    items.push(this._until_pattern.source);
	  }
	  this.__template_pattern = this._input.get_regexp('(?:' + items.join('|') + ')');
	};

	TemplatablePattern.prototype._read_template = function() {
	  var resulting_string = '';
	  var c = this._input.peek();
	  if (c === '<') {
	    var peek1 = this._input.peek(1);
	    //if we're in a comment, do something special
	    // We treat all comments as literals, even more than preformatted tags
	    // we just look for the appropriate close tag
	    if (!this._disabled.php && !this._excluded.php && peek1 === '?') {
	      resulting_string = resulting_string ||
	        this.__patterns.php.read();
	    }
	    if (!this._disabled.erb && !this._excluded.erb && peek1 === '%') {
	      resulting_string = resulting_string ||
	        this.__patterns.erb.read();
	    }
	  } else if (c === '{') {
	    if (!this._disabled.handlebars && !this._excluded.handlebars) {
	      resulting_string = resulting_string ||
	        this.__patterns.handlebars_comment.read();
	      resulting_string = resulting_string ||
	        this.__patterns.handlebars_unescaped.read();
	      resulting_string = resulting_string ||
	        this.__patterns.handlebars.read();
	    }
	    if (!this._disabled.django) {
	      // django coflicts with handlebars a bit.
	      if (!this._excluded.django && !this._excluded.handlebars) {
	        resulting_string = resulting_string ||
	          this.__patterns.django_value.read();
	      }
	      if (!this._excluded.django) {
	        resulting_string = resulting_string ||
	          this.__patterns.django_comment.read();
	        resulting_string = resulting_string ||
	          this.__patterns.django.read();
	      }
	    }
	    if (!this._disabled.smarty) {
	      // smarty cannot be enabled with django or handlebars enabled
	      if (this._disabled.django && this._disabled.handlebars) {
	        resulting_string = resulting_string ||
	          this.__patterns.smarty_comment.read();
	        resulting_string = resulting_string ||
	          this.__patterns.smarty_literal.read();
	        resulting_string = resulting_string ||
	          this.__patterns.smarty.read();
	      }
	    }
	  }
	  return resulting_string;
	};


	templatablepattern.TemplatablePattern = TemplatablePattern;
	return templatablepattern;
}

/*jshint node:true */

var hasRequiredTokenizer$1;

function requireTokenizer$1 () {
	if (hasRequiredTokenizer$1) return tokenizer$2;
	hasRequiredTokenizer$1 = 1;

	var InputScanner = requireInputscanner().InputScanner;
	var BaseTokenizer = requireTokenizer$2().Tokenizer;
	var BASETOKEN = requireTokenizer$2().TOKEN;
	var Directives = requireDirectives().Directives;
	var acorn = requireAcorn();
	var Pattern = requirePattern().Pattern;
	var TemplatablePattern = requireTemplatablepattern().TemplatablePattern;


	function in_array(what, arr) {
	  return arr.indexOf(what) !== -1;
	}


	var TOKEN = {
	  START_EXPR: 'TK_START_EXPR',
	  END_EXPR: 'TK_END_EXPR',
	  START_BLOCK: 'TK_START_BLOCK',
	  END_BLOCK: 'TK_END_BLOCK',
	  WORD: 'TK_WORD',
	  RESERVED: 'TK_RESERVED',
	  SEMICOLON: 'TK_SEMICOLON',
	  STRING: 'TK_STRING',
	  EQUALS: 'TK_EQUALS',
	  OPERATOR: 'TK_OPERATOR',
	  COMMA: 'TK_COMMA',
	  BLOCK_COMMENT: 'TK_BLOCK_COMMENT',
	  COMMENT: 'TK_COMMENT',
	  DOT: 'TK_DOT',
	  UNKNOWN: 'TK_UNKNOWN',
	  START: BASETOKEN.START,
	  RAW: BASETOKEN.RAW,
	  EOF: BASETOKEN.EOF
	};


	var directives_core = new Directives(/\/\*/, /\*\//);

	var number_pattern = /0[xX][0123456789abcdefABCDEF_]*n?|0[oO][01234567_]*n?|0[bB][01_]*n?|\d[\d_]*n|(?:\.\d[\d_]*|\d[\d_]*\.?[\d_]*)(?:[eE][+-]?[\d_]+)?/;

	var digit = /[0-9]/;

	// Dot "." must be distinguished from "..." and decimal
	var dot_pattern = /[^\d\.]/;

	var positionable_operators = (
	  ">>> === !== &&= ??= ||= " +
	  "<< && >= ** != == <= >> || ?? |> " +
	  "< / - + > : & % ? ^ | *").split(' ');

	// IMPORTANT: this must be sorted longest to shortest or tokenizing many not work.
	// Also, you must update possitionable operators separately from punct
	var punct =
	  ">>>= " +
	  "... >>= <<= === >>> !== **= &&= ??= ||= " +
	  "=> ^= :: /= << <= == && -= >= >> != -- += ** || ?? ++ %= &= *= |= |> " +
	  "= ! ? > < : / ^ - + * & % ~ |";

	punct = punct.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
	// ?. but not if followed by a number 
	punct = '\\?\\.(?!\\d) ' + punct;
	punct = punct.replace(/ /g, '|');

	var punct_pattern = new RegExp(punct);

	// words which should always start on new line.
	var line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export'.split(',');
	var reserved_words = line_starters.concat(['do', 'in', 'of', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof', 'yield', 'async', 'await', 'from', 'as', 'class', 'extends']);
	var reserved_word_pattern = new RegExp('^(?:' + reserved_words.join('|') + ')$');

	// var template_pattern = /(?:(?:<\?php|<\?=)[\s\S]*?\?>)|(?:<%[\s\S]*?%>)/g;

	var in_html_comment;

	var Tokenizer = function(input_string, options) {
	  BaseTokenizer.call(this, input_string, options);

	  this._patterns.whitespace = this._patterns.whitespace.matching(
	    /\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source,
	    /\u2028\u2029/.source);

	  var pattern_reader = new Pattern(this._input);
	  var templatable = new TemplatablePattern(this._input)
	    .read_options(this._options);

	  this.__patterns = {
	    template: templatable,
	    identifier: templatable.starting_with(acorn.identifier).matching(acorn.identifierMatch),
	    number: pattern_reader.matching(number_pattern),
	    punct: pattern_reader.matching(punct_pattern),
	    // comment ends just before nearest linefeed or end of file
	    comment: pattern_reader.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),
	    //  /* ... */ comment ends with nearest */ or end of file
	    block_comment: pattern_reader.starting_with(/\/\*/).until_after(/\*\//),
	    html_comment_start: pattern_reader.matching(/<!--/),
	    html_comment_end: pattern_reader.matching(/-->/),
	    include: pattern_reader.starting_with(/#include/).until_after(acorn.lineBreak),
	    shebang: pattern_reader.starting_with(/#!/).until_after(acorn.lineBreak),
	    xml: pattern_reader.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[^}]+?}|!\[CDATA\[[^\]]*?\]\]|)(\s*{[^}]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{([^{}]|{[^}]+?})+?}))*\s*(\/?)\s*>/),
	    single_quote: templatable.until(/['\\\n\r\u2028\u2029]/),
	    double_quote: templatable.until(/["\\\n\r\u2028\u2029]/),
	    template_text: templatable.until(/[`\\$]/),
	    template_expression: templatable.until(/[`}\\]/)
	  };

	};
	Tokenizer.prototype = new BaseTokenizer();

	Tokenizer.prototype._is_comment = function(current_token) {
	  return current_token.type === TOKEN.COMMENT || current_token.type === TOKEN.BLOCK_COMMENT || current_token.type === TOKEN.UNKNOWN;
	};

	Tokenizer.prototype._is_opening = function(current_token) {
	  return current_token.type === TOKEN.START_BLOCK || current_token.type === TOKEN.START_EXPR;
	};

	Tokenizer.prototype._is_closing = function(current_token, open_token) {
	  return (current_token.type === TOKEN.END_BLOCK || current_token.type === TOKEN.END_EXPR) &&
	    (open_token && (
	      (current_token.text === ']' && open_token.text === '[') ||
	      (current_token.text === ')' && open_token.text === '(') ||
	      (current_token.text === '}' && open_token.text === '{')));
	};

	Tokenizer.prototype._reset = function() {
	  in_html_comment = false;
	};

	Tokenizer.prototype._get_next_token = function(previous_token, open_token) { // jshint unused:false
	  var token = null;
	  this._readWhitespace();
	  var c = this._input.peek();

	  if (c === null) {
	    return this._create_token(TOKEN.EOF, '');
	  }

	  token = token || this._read_non_javascript(c);
	  token = token || this._read_string(c);
	  token = token || this._read_pair(c, this._input.peek(1)); // Issue #2062 hack for record type '#{'
	  token = token || this._read_word(previous_token);
	  token = token || this._read_singles(c);
	  token = token || this._read_comment(c);
	  token = token || this._read_regexp(c, previous_token);
	  token = token || this._read_xml(c, previous_token);
	  token = token || this._read_punctuation();
	  token = token || this._create_token(TOKEN.UNKNOWN, this._input.next());

	  return token;
	};

	Tokenizer.prototype._read_word = function(previous_token) {
	  var resulting_string;
	  resulting_string = this.__patterns.identifier.read();
	  if (resulting_string !== '') {
	    resulting_string = resulting_string.replace(acorn.allLineBreaks, '\n');
	    if (!(previous_token.type === TOKEN.DOT ||
	        (previous_token.type === TOKEN.RESERVED && (previous_token.text === 'set' || previous_token.text === 'get'))) &&
	      reserved_word_pattern.test(resulting_string)) {
	      if ((resulting_string === 'in' || resulting_string === 'of') &&
	        (previous_token.type === TOKEN.WORD || previous_token.type === TOKEN.STRING)) { // hack for 'in' and 'of' operators
	        return this._create_token(TOKEN.OPERATOR, resulting_string);
	      }
	      return this._create_token(TOKEN.RESERVED, resulting_string);
	    }
	    return this._create_token(TOKEN.WORD, resulting_string);
	  }

	  resulting_string = this.__patterns.number.read();
	  if (resulting_string !== '') {
	    return this._create_token(TOKEN.WORD, resulting_string);
	  }
	};

	Tokenizer.prototype._read_singles = function(c) {
	  var token = null;
	  if (c === '(' || c === '[') {
	    token = this._create_token(TOKEN.START_EXPR, c);
	  } else if (c === ')' || c === ']') {
	    token = this._create_token(TOKEN.END_EXPR, c);
	  } else if (c === '{') {
	    token = this._create_token(TOKEN.START_BLOCK, c);
	  } else if (c === '}') {
	    token = this._create_token(TOKEN.END_BLOCK, c);
	  } else if (c === ';') {
	    token = this._create_token(TOKEN.SEMICOLON, c);
	  } else if (c === '.' && dot_pattern.test(this._input.peek(1))) {
	    token = this._create_token(TOKEN.DOT, c);
	  } else if (c === ',') {
	    token = this._create_token(TOKEN.COMMA, c);
	  }

	  if (token) {
	    this._input.next();
	  }
	  return token;
	};

	Tokenizer.prototype._read_pair = function(c, d) {
	  var token = null;
	  if (c === '#' && d === '{') {
	    token = this._create_token(TOKEN.START_BLOCK, c + d);
	  }

	  if (token) {
	    this._input.next();
	    this._input.next();
	  }
	  return token;
	};

	Tokenizer.prototype._read_punctuation = function() {
	  var resulting_string = this.__patterns.punct.read();

	  if (resulting_string !== '') {
	    if (resulting_string === '=') {
	      return this._create_token(TOKEN.EQUALS, resulting_string);
	    } else if (resulting_string === '?.') {
	      return this._create_token(TOKEN.DOT, resulting_string);
	    } else {
	      return this._create_token(TOKEN.OPERATOR, resulting_string);
	    }
	  }
	};

	Tokenizer.prototype._read_non_javascript = function(c) {
	  var resulting_string = '';

	  if (c === '#') {
	    if (this._is_first_token()) {
	      resulting_string = this.__patterns.shebang.read();

	      if (resulting_string) {
	        return this._create_token(TOKEN.UNKNOWN, resulting_string.trim() + '\n');
	      }
	    }

	    // handles extendscript #includes
	    resulting_string = this.__patterns.include.read();

	    if (resulting_string) {
	      return this._create_token(TOKEN.UNKNOWN, resulting_string.trim() + '\n');
	    }

	    c = this._input.next();

	    // Spidermonkey-specific sharp variables for circular references. Considered obsolete.
	    var sharp = '#';
	    if (this._input.hasNext() && this._input.testChar(digit)) {
	      do {
	        c = this._input.next();
	        sharp += c;
	      } while (this._input.hasNext() && c !== '#' && c !== '=');
	      if (c === '#') ; else if (this._input.peek() === '[' && this._input.peek(1) === ']') {
	        sharp += '[]';
	        this._input.next();
	        this._input.next();
	      } else if (this._input.peek() === '{' && this._input.peek(1) === '}') {
	        sharp += '{}';
	        this._input.next();
	        this._input.next();
	      }
	      return this._create_token(TOKEN.WORD, sharp);
	    }

	    this._input.back();

	  } else if (c === '<' && this._is_first_token()) {
	    resulting_string = this.__patterns.html_comment_start.read();
	    if (resulting_string) {
	      while (this._input.hasNext() && !this._input.testChar(acorn.newline)) {
	        resulting_string += this._input.next();
	      }
	      in_html_comment = true;
	      return this._create_token(TOKEN.COMMENT, resulting_string);
	    }
	  } else if (in_html_comment && c === '-') {
	    resulting_string = this.__patterns.html_comment_end.read();
	    if (resulting_string) {
	      in_html_comment = false;
	      return this._create_token(TOKEN.COMMENT, resulting_string);
	    }
	  }

	  return null;
	};

	Tokenizer.prototype._read_comment = function(c) {
	  var token = null;
	  if (c === '/') {
	    var comment = '';
	    if (this._input.peek(1) === '*') {
	      // peek for comment /* ... */
	      comment = this.__patterns.block_comment.read();
	      var directives = directives_core.get_directives(comment);
	      if (directives && directives.ignore === 'start') {
	        comment += directives_core.readIgnored(this._input);
	      }
	      comment = comment.replace(acorn.allLineBreaks, '\n');
	      token = this._create_token(TOKEN.BLOCK_COMMENT, comment);
	      token.directives = directives;
	    } else if (this._input.peek(1) === '/') {
	      // peek for comment // ...
	      comment = this.__patterns.comment.read();
	      token = this._create_token(TOKEN.COMMENT, comment);
	    }
	  }
	  return token;
	};

	Tokenizer.prototype._read_string = function(c) {
	  if (c === '`' || c === "'" || c === '"') {
	    var resulting_string = this._input.next();
	    this.has_char_escapes = false;

	    if (c === '`') {
	      resulting_string += this._read_string_recursive('`', true, '${');
	    } else {
	      resulting_string += this._read_string_recursive(c);
	    }

	    if (this.has_char_escapes && this._options.unescape_strings) {
	      resulting_string = unescape_string(resulting_string);
	    }

	    if (this._input.peek() === c) {
	      resulting_string += this._input.next();
	    }

	    resulting_string = resulting_string.replace(acorn.allLineBreaks, '\n');

	    return this._create_token(TOKEN.STRING, resulting_string);
	  }

	  return null;
	};

	Tokenizer.prototype._allow_regexp_or_xml = function(previous_token) {
	  // regex and xml can only appear in specific locations during parsing
	  return (previous_token.type === TOKEN.RESERVED && in_array(previous_token.text, ['return', 'case', 'throw', 'else', 'do', 'typeof', 'yield'])) ||
	    (previous_token.type === TOKEN.END_EXPR && previous_token.text === ')' &&
	      previous_token.opened.previous.type === TOKEN.RESERVED && in_array(previous_token.opened.previous.text, ['if', 'while', 'for'])) ||
	    (in_array(previous_token.type, [TOKEN.COMMENT, TOKEN.START_EXPR, TOKEN.START_BLOCK, TOKEN.START,
	      TOKEN.END_BLOCK, TOKEN.OPERATOR, TOKEN.EQUALS, TOKEN.EOF, TOKEN.SEMICOLON, TOKEN.COMMA
	    ]));
	};

	Tokenizer.prototype._read_regexp = function(c, previous_token) {

	  if (c === '/' && this._allow_regexp_or_xml(previous_token)) {
	    // handle regexp
	    //
	    var resulting_string = this._input.next();
	    var esc = false;

	    var in_char_class = false;
	    while (this._input.hasNext() &&
	      ((esc || in_char_class || this._input.peek() !== c) &&
	        !this._input.testChar(acorn.newline))) {
	      resulting_string += this._input.peek();
	      if (!esc) {
	        esc = this._input.peek() === '\\';
	        if (this._input.peek() === '[') {
	          in_char_class = true;
	        } else if (this._input.peek() === ']') {
	          in_char_class = false;
	        }
	      } else {
	        esc = false;
	      }
	      this._input.next();
	    }

	    if (this._input.peek() === c) {
	      resulting_string += this._input.next();

	      // regexps may have modifiers /regexp/MOD , so fetch those, too
	      // Only [gim] are valid, but if the user puts in garbage, do what we can to take it.
	      resulting_string += this._input.read(acorn.identifier);
	    }
	    return this._create_token(TOKEN.STRING, resulting_string);
	  }
	  return null;
	};

	Tokenizer.prototype._read_xml = function(c, previous_token) {

	  if (this._options.e4x && c === "<" && this._allow_regexp_or_xml(previous_token)) {
	    var xmlStr = '';
	    var match = this.__patterns.xml.read_match();
	    // handle e4x xml literals
	    //
	    if (match) {
	      // Trim root tag to attempt to
	      var rootTag = match[2].replace(/^{\s+/, '{').replace(/\s+}$/, '}');
	      var isCurlyRoot = rootTag.indexOf('{') === 0;
	      var depth = 0;
	      while (match) {
	        var isEndTag = !!match[1];
	        var tagName = match[2];
	        var isSingletonTag = (!!match[match.length - 1]) || (tagName.slice(0, 8) === "![CDATA[");
	        if (!isSingletonTag &&
	          (tagName === rootTag || (isCurlyRoot && tagName.replace(/^{\s+/, '{').replace(/\s+}$/, '}')))) {
	          if (isEndTag) {
	            --depth;
	          } else {
	            ++depth;
	          }
	        }
	        xmlStr += match[0];
	        if (depth <= 0) {
	          break;
	        }
	        match = this.__patterns.xml.read_match();
	      }
	      // if we didn't close correctly, keep unformatted.
	      if (!match) {
	        xmlStr += this._input.match(/[\s\S]*/g)[0];
	      }
	      xmlStr = xmlStr.replace(acorn.allLineBreaks, '\n');
	      return this._create_token(TOKEN.STRING, xmlStr);
	    }
	  }

	  return null;
	};

	function unescape_string(s) {
	  // You think that a regex would work for this
	  // return s.replace(/\\x([0-9a-f]{2})/gi, function(match, val) {
	  //         return String.fromCharCode(parseInt(val, 16));
	  //     })
	  // However, dealing with '\xff', '\\xff', '\\\xff' makes this more fun.
	  var out = '',
	    escaped = 0;

	  var input_scan = new InputScanner(s);
	  var matched = null;

	  while (input_scan.hasNext()) {
	    // Keep any whitespace, non-slash characters
	    // also keep slash pairs.
	    matched = input_scan.match(/([\s]|[^\\]|\\\\)+/g);

	    if (matched) {
	      out += matched[0];
	    }

	    if (input_scan.peek() === '\\') {
	      input_scan.next();
	      if (input_scan.peek() === 'x') {
	        matched = input_scan.match(/x([0-9A-Fa-f]{2})/g);
	      } else if (input_scan.peek() === 'u') {
	        matched = input_scan.match(/u([0-9A-Fa-f]{4})/g);
	        if (!matched) {
	          matched = input_scan.match(/u\{([0-9A-Fa-f]+)\}/g);
	        }
	      } else {
	        out += '\\';
	        if (input_scan.hasNext()) {
	          out += input_scan.next();
	        }
	        continue;
	      }

	      // If there's some error decoding, return the original string
	      if (!matched) {
	        return s;
	      }

	      escaped = parseInt(matched[1], 16);

	      if (escaped > 0x7e && escaped <= 0xff && matched[0].indexOf('x') === 0) {
	        // we bail out on \x7f..\xff,
	        // leaving whole string escaped,
	        // as it's probably completely binary
	        return s;
	      } else if (escaped >= 0x00 && escaped < 0x20) {
	        // leave 0x00...0x1f escaped
	        out += '\\' + matched[0];
	      } else if (escaped > 0x10FFFF) {
	        // If the escape sequence is out of bounds, keep the original sequence and continue conversion
	        out += '\\' + matched[0];
	      } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
	        // single-quote, apostrophe, backslash - escape these
	        out += '\\' + String.fromCharCode(escaped);
	      } else {
	        out += String.fromCharCode(escaped);
	      }
	    }
	  }

	  return out;
	}

	// handle string
	//
	Tokenizer.prototype._read_string_recursive = function(delimiter, allow_unescaped_newlines, start_sub) {
	  var current_char;
	  var pattern;
	  if (delimiter === '\'') {
	    pattern = this.__patterns.single_quote;
	  } else if (delimiter === '"') {
	    pattern = this.__patterns.double_quote;
	  } else if (delimiter === '`') {
	    pattern = this.__patterns.template_text;
	  } else if (delimiter === '}') {
	    pattern = this.__patterns.template_expression;
	  }

	  var resulting_string = pattern.read();
	  var next = '';
	  while (this._input.hasNext()) {
	    next = this._input.next();
	    if (next === delimiter ||
	      (!allow_unescaped_newlines && acorn.newline.test(next))) {
	      this._input.back();
	      break;
	    } else if (next === '\\' && this._input.hasNext()) {
	      current_char = this._input.peek();

	      if (current_char === 'x' || current_char === 'u') {
	        this.has_char_escapes = true;
	      } else if (current_char === '\r' && this._input.peek(1) === '\n') {
	        this._input.next();
	      }
	      next += this._input.next();
	    } else if (start_sub) {
	      if (start_sub === '${' && next === '$' && this._input.peek() === '{') {
	        next += this._input.next();
	      }

	      if (start_sub === next) {
	        if (delimiter === '`') {
	          next += this._read_string_recursive('}', allow_unescaped_newlines, '`');
	        } else {
	          next += this._read_string_recursive('`', allow_unescaped_newlines, '${');
	        }
	        if (this._input.hasNext()) {
	          next += this._input.next();
	        }
	      }
	    }
	    next += pattern.read();
	    resulting_string += next;
	  }

	  return resulting_string;
	};

	tokenizer$2.Tokenizer = Tokenizer;
	tokenizer$2.TOKEN = TOKEN;
	tokenizer$2.positionable_operators = positionable_operators.slice();
	tokenizer$2.line_starters = line_starters.slice();
	return tokenizer$2;
}

/*jshint node:true */

var hasRequiredBeautifier$2;

function requireBeautifier$2 () {
	if (hasRequiredBeautifier$2) return beautifier$2;
	hasRequiredBeautifier$2 = 1;

	var Output = requireOutput().Output;
	var Token = requireToken().Token;
	var acorn = requireAcorn();
	var Options = requireOptions$2().Options;
	var Tokenizer = requireTokenizer$1().Tokenizer;
	var line_starters = requireTokenizer$1().line_starters;
	var positionable_operators = requireTokenizer$1().positionable_operators;
	var TOKEN = requireTokenizer$1().TOKEN;


	function in_array(what, arr) {
	  return arr.indexOf(what) !== -1;
	}

	function ltrim(s) {
	  return s.replace(/^\s+/g, '');
	}

	function generateMapFromStrings(list) {
	  var result = {};
	  for (var x = 0; x < list.length; x++) {
	    // make the mapped names underscored instead of dash
	    result[list[x].replace(/-/g, '_')] = list[x];
	  }
	  return result;
	}

	function reserved_word(token, word) {
	  return token && token.type === TOKEN.RESERVED && token.text === word;
	}

	function reserved_array(token, words) {
	  return token && token.type === TOKEN.RESERVED && in_array(token.text, words);
	}
	// Unsure of what they mean, but they work. Worth cleaning up in future.
	var special_words = ['case', 'return', 'do', 'if', 'throw', 'else', 'await', 'break', 'continue', 'async'];

	var validPositionValues = ['before-newline', 'after-newline', 'preserve-newline'];

	// Generate map from array
	var OPERATOR_POSITION = generateMapFromStrings(validPositionValues);

	var OPERATOR_POSITION_BEFORE_OR_PRESERVE = [OPERATOR_POSITION.before_newline, OPERATOR_POSITION.preserve_newline];

	var MODE = {
	  BlockStatement: 'BlockStatement', // 'BLOCK'
	  Statement: 'Statement', // 'STATEMENT'
	  ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
	  ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
	  ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
	  Conditional: 'Conditional', //'(COND-EXPRESSION)',
	  Expression: 'Expression' //'(EXPRESSION)'
	};

	function remove_redundant_indentation(output, frame) {
	  // This implementation is effective but has some issues:
	  //     - can cause line wrap to happen too soon due to indent removal
	  //           after wrap points are calculated
	  // These issues are minor compared to ugly indentation.

	  if (frame.multiline_frame ||
	    frame.mode === MODE.ForInitializer ||
	    frame.mode === MODE.Conditional) {
	    return;
	  }

	  // remove one indent from each line inside this section
	  output.remove_indent(frame.start_line_index);
	}

	// we could use just string.split, but
	// IE doesn't like returning empty strings
	function split_linebreaks(s) {
	  //return s.split(/\x0d\x0a|\x0a/);

	  s = s.replace(acorn.allLineBreaks, '\n');
	  var out = [],
	    idx = s.indexOf("\n");
	  while (idx !== -1) {
	    out.push(s.substring(0, idx));
	    s = s.substring(idx + 1);
	    idx = s.indexOf("\n");
	  }
	  if (s.length) {
	    out.push(s);
	  }
	  return out;
	}

	function is_array(mode) {
	  return mode === MODE.ArrayLiteral;
	}

	function is_expression(mode) {
	  return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
	}

	function all_lines_start_with(lines, c) {
	  for (var i = 0; i < lines.length; i++) {
	    var line = lines[i].trim();
	    if (line.charAt(0) !== c) {
	      return false;
	    }
	  }
	  return true;
	}

	function each_line_matches_indent(lines, indent) {
	  var i = 0,
	    len = lines.length,
	    line;
	  for (; i < len; i++) {
	    line = lines[i];
	    // allow empty lines to pass through
	    if (line && line.indexOf(indent) !== 0) {
	      return false;
	    }
	  }
	  return true;
	}


	function Beautifier(source_text, options) {
	  options = options || {};
	  this._source_text = source_text || '';

	  this._output = null;
	  this._tokens = null;
	  this._last_last_text = null;
	  this._flags = null;
	  this._previous_flags = null;

	  this._flag_store = null;
	  this._options = new Options(options);
	}

	Beautifier.prototype.create_flags = function(flags_base, mode) {
	  var next_indent_level = 0;
	  if (flags_base) {
	    next_indent_level = flags_base.indentation_level;
	    if (!this._output.just_added_newline() &&
	      flags_base.line_indent_level > next_indent_level) {
	      next_indent_level = flags_base.line_indent_level;
	    }
	  }

	  var next_flags = {
	    mode: mode,
	    parent: flags_base,
	    last_token: flags_base ? flags_base.last_token : new Token(TOKEN.START_BLOCK, ''), // last token text
	    last_word: flags_base ? flags_base.last_word : '', // last TOKEN.WORD passed
	    declaration_statement: false,
	    declaration_assignment: false,
	    multiline_frame: false,
	    inline_frame: false,
	    if_block: false,
	    else_block: false,
	    class_start_block: false, // class A { INSIDE HERE } or class B extends C { INSIDE HERE }
	    do_block: false,
	    do_while: false,
	    import_block: false,
	    in_case_statement: false, // switch(..){ INSIDE HERE }
	    in_case: false, // we're on the exact line with "case 0:"
	    case_body: false, // the indented case-action block
	    case_block: false, // the indented case-action block is wrapped with {}
	    indentation_level: next_indent_level,
	    alignment: 0,
	    line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
	    start_line_index: this._output.get_line_number(),
	    ternary_depth: 0
	  };
	  return next_flags;
	};

	Beautifier.prototype._reset = function(source_text) {
	  var baseIndentString = source_text.match(/^[\t ]*/)[0];

	  this._last_last_text = ''; // pre-last token text
	  this._output = new Output(this._options, baseIndentString);

	  // If testing the ignore directive, start with output disable set to true
	  this._output.raw = this._options.test_output_raw;


	  // Stack of parsing/formatting states, including MODE.
	  // We tokenize, parse, and output in an almost purely a forward-only stream of token input
	  // and formatted output.  This makes the beautifier less accurate than full parsers
	  // but also far more tolerant of syntax errors.
	  //
	  // For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
	  // MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
	  // encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
	  // most full parsers would die, but the beautifier gracefully falls back to
	  // MODE.BlockStatement and continues on.
	  this._flag_store = [];
	  this.set_mode(MODE.BlockStatement);
	  var tokenizer = new Tokenizer(source_text, this._options);
	  this._tokens = tokenizer.tokenize();
	  return source_text;
	};

	Beautifier.prototype.beautify = function() {
	  // if disabled, return the input unchanged.
	  if (this._options.disabled) {
	    return this._source_text;
	  }

	  var sweet_code;
	  var source_text = this._reset(this._source_text);

	  var eol = this._options.eol;
	  if (this._options.eol === 'auto') {
	    eol = '\n';
	    if (source_text && acorn.lineBreak.test(source_text || '')) {
	      eol = source_text.match(acorn.lineBreak)[0];
	    }
	  }

	  var current_token = this._tokens.next();
	  while (current_token) {
	    this.handle_token(current_token);

	    this._last_last_text = this._flags.last_token.text;
	    this._flags.last_token = current_token;

	    current_token = this._tokens.next();
	  }

	  sweet_code = this._output.get_code(eol);

	  return sweet_code;
	};

	Beautifier.prototype.handle_token = function(current_token, preserve_statement_flags) {
	  if (current_token.type === TOKEN.START_EXPR) {
	    this.handle_start_expr(current_token);
	  } else if (current_token.type === TOKEN.END_EXPR) {
	    this.handle_end_expr(current_token);
	  } else if (current_token.type === TOKEN.START_BLOCK) {
	    this.handle_start_block(current_token);
	  } else if (current_token.type === TOKEN.END_BLOCK) {
	    this.handle_end_block(current_token);
	  } else if (current_token.type === TOKEN.WORD) {
	    this.handle_word(current_token);
	  } else if (current_token.type === TOKEN.RESERVED) {
	    this.handle_word(current_token);
	  } else if (current_token.type === TOKEN.SEMICOLON) {
	    this.handle_semicolon(current_token);
	  } else if (current_token.type === TOKEN.STRING) {
	    this.handle_string(current_token);
	  } else if (current_token.type === TOKEN.EQUALS) {
	    this.handle_equals(current_token);
	  } else if (current_token.type === TOKEN.OPERATOR) {
	    this.handle_operator(current_token);
	  } else if (current_token.type === TOKEN.COMMA) {
	    this.handle_comma(current_token);
	  } else if (current_token.type === TOKEN.BLOCK_COMMENT) {
	    this.handle_block_comment(current_token, preserve_statement_flags);
	  } else if (current_token.type === TOKEN.COMMENT) {
	    this.handle_comment(current_token, preserve_statement_flags);
	  } else if (current_token.type === TOKEN.DOT) {
	    this.handle_dot(current_token);
	  } else if (current_token.type === TOKEN.EOF) {
	    this.handle_eof(current_token);
	  } else if (current_token.type === TOKEN.UNKNOWN) {
	    this.handle_unknown(current_token, preserve_statement_flags);
	  } else {
	    this.handle_unknown(current_token, preserve_statement_flags);
	  }
	};

	Beautifier.prototype.handle_whitespace_and_comments = function(current_token, preserve_statement_flags) {
	  var newlines = current_token.newlines;
	  var keep_whitespace = this._options.keep_array_indentation && is_array(this._flags.mode);

	  if (current_token.comments_before) {
	    var comment_token = current_token.comments_before.next();
	    while (comment_token) {
	      // The cleanest handling of inline comments is to treat them as though they aren't there.
	      // Just continue formatting and the behavior should be logical.
	      // Also ignore unknown tokens.  Again, this should result in better behavior.
	      this.handle_whitespace_and_comments(comment_token, preserve_statement_flags);
	      this.handle_token(comment_token, preserve_statement_flags);
	      comment_token = current_token.comments_before.next();
	    }
	  }

	  if (keep_whitespace) {
	    for (var i = 0; i < newlines; i += 1) {
	      this.print_newline(i > 0, preserve_statement_flags);
	    }
	  } else {
	    if (this._options.max_preserve_newlines && newlines > this._options.max_preserve_newlines) {
	      newlines = this._options.max_preserve_newlines;
	    }

	    if (this._options.preserve_newlines) {
	      if (newlines > 1) {
	        this.print_newline(false, preserve_statement_flags);
	        for (var j = 1; j < newlines; j += 1) {
	          this.print_newline(true, preserve_statement_flags);
	        }
	      }
	    }
	  }

	};

	var newline_restricted_tokens = ['async', 'break', 'continue', 'return', 'throw', 'yield'];

	Beautifier.prototype.allow_wrap_or_preserved_newline = function(current_token, force_linewrap) {
	  force_linewrap = (force_linewrap === undefined) ? false : force_linewrap;

	  // Never wrap the first token on a line
	  if (this._output.just_added_newline()) {
	    return;
	  }

	  var shouldPreserveOrForce = (this._options.preserve_newlines && current_token.newlines) || force_linewrap;
	  var operatorLogicApplies = in_array(this._flags.last_token.text, positionable_operators) ||
	    in_array(current_token.text, positionable_operators);

	  if (operatorLogicApplies) {
	    var shouldPrintOperatorNewline = (
	        in_array(this._flags.last_token.text, positionable_operators) &&
	        in_array(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)
	      ) ||
	      in_array(current_token.text, positionable_operators);
	    shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;
	  }

	  if (shouldPreserveOrForce) {
	    this.print_newline(false, true);
	  } else if (this._options.wrap_line_length) {
	    if (reserved_array(this._flags.last_token, newline_restricted_tokens)) {
	      // These tokens should never have a newline inserted
	      // between them and the following expression.
	      return;
	    }
	    this._output.set_wrap_point();
	  }
	};

	Beautifier.prototype.print_newline = function(force_newline, preserve_statement_flags) {
	  if (!preserve_statement_flags) {
	    if (this._flags.last_token.text !== ';' && this._flags.last_token.text !== ',' && this._flags.last_token.text !== '=' && (this._flags.last_token.type !== TOKEN.OPERATOR || this._flags.last_token.text === '--' || this._flags.last_token.text === '++')) {
	      var next_token = this._tokens.peek();
	      while (this._flags.mode === MODE.Statement &&
	        !(this._flags.if_block && reserved_word(next_token, 'else')) &&
	        !this._flags.do_block) {
	        this.restore_mode();
	      }
	    }
	  }

	  if (this._output.add_new_line(force_newline)) {
	    this._flags.multiline_frame = true;
	  }
	};

	Beautifier.prototype.print_token_line_indentation = function(current_token) {
	  if (this._output.just_added_newline()) {
	    if (this._options.keep_array_indentation &&
	      current_token.newlines &&
	      (current_token.text === '[' || is_array(this._flags.mode))) {
	      this._output.current_line.set_indent(-1);
	      this._output.current_line.push(current_token.whitespace_before);
	      this._output.space_before_token = false;
	    } else if (this._output.set_indent(this._flags.indentation_level, this._flags.alignment)) {
	      this._flags.line_indent_level = this._flags.indentation_level;
	    }
	  }
	};

	Beautifier.prototype.print_token = function(current_token) {
	  if (this._output.raw) {
	    this._output.add_raw_token(current_token);
	    return;
	  }

	  if (this._options.comma_first && current_token.previous && current_token.previous.type === TOKEN.COMMA &&
	    this._output.just_added_newline()) {
	    if (this._output.previous_line.last() === ',') {
	      var popped = this._output.previous_line.pop();
	      // if the comma was already at the start of the line,
	      // pull back onto that line and reprint the indentation
	      if (this._output.previous_line.is_empty()) {
	        this._output.previous_line.push(popped);
	        this._output.trim(true);
	        this._output.current_line.pop();
	        this._output.trim();
	      }

	      // add the comma in front of the next token
	      this.print_token_line_indentation(current_token);
	      this._output.add_token(',');
	      this._output.space_before_token = true;
	    }
	  }

	  this.print_token_line_indentation(current_token);
	  this._output.non_breaking_space = true;
	  this._output.add_token(current_token.text);
	  if (this._output.previous_token_wrapped) {
	    this._flags.multiline_frame = true;
	  }
	};

	Beautifier.prototype.indent = function() {
	  this._flags.indentation_level += 1;
	  this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
	};

	Beautifier.prototype.deindent = function() {
	  if (this._flags.indentation_level > 0 &&
	    ((!this._flags.parent) || this._flags.indentation_level > this._flags.parent.indentation_level)) {
	    this._flags.indentation_level -= 1;
	    this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
	  }
	};

	Beautifier.prototype.set_mode = function(mode) {
	  if (this._flags) {
	    this._flag_store.push(this._flags);
	    this._previous_flags = this._flags;
	  } else {
	    this._previous_flags = this.create_flags(null, mode);
	  }

	  this._flags = this.create_flags(this._previous_flags, mode);
	  this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
	};


	Beautifier.prototype.restore_mode = function() {
	  if (this._flag_store.length > 0) {
	    this._previous_flags = this._flags;
	    this._flags = this._flag_store.pop();
	    if (this._previous_flags.mode === MODE.Statement) {
	      remove_redundant_indentation(this._output, this._previous_flags);
	    }
	    this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
	  }
	};

	Beautifier.prototype.start_of_object_property = function() {
	  return this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement && (
	    (this._flags.last_token.text === ':' && this._flags.ternary_depth === 0) || (reserved_array(this._flags.last_token, ['get', 'set'])));
	};

	Beautifier.prototype.start_of_statement = function(current_token) {
	  var start = false;
	  start = start || reserved_array(this._flags.last_token, ['var', 'let', 'const']) && current_token.type === TOKEN.WORD;
	  start = start || reserved_word(this._flags.last_token, 'do');
	  start = start || (!(this._flags.parent.mode === MODE.ObjectLiteral && this._flags.mode === MODE.Statement)) && reserved_array(this._flags.last_token, newline_restricted_tokens) && !current_token.newlines;
	  start = start || reserved_word(this._flags.last_token, 'else') &&
	    !(reserved_word(current_token, 'if') && !current_token.comments_before);
	  start = start || (this._flags.last_token.type === TOKEN.END_EXPR && (this._previous_flags.mode === MODE.ForInitializer || this._previous_flags.mode === MODE.Conditional));
	  start = start || (this._flags.last_token.type === TOKEN.WORD && this._flags.mode === MODE.BlockStatement &&
	    !this._flags.in_case &&
	    !(current_token.text === '--' || current_token.text === '++') &&
	    this._last_last_text !== 'function' &&
	    current_token.type !== TOKEN.WORD && current_token.type !== TOKEN.RESERVED);
	  start = start || (this._flags.mode === MODE.ObjectLiteral && (
	    (this._flags.last_token.text === ':' && this._flags.ternary_depth === 0) || reserved_array(this._flags.last_token, ['get', 'set'])));

	  if (start) {
	    this.set_mode(MODE.Statement);
	    this.indent();

	    this.handle_whitespace_and_comments(current_token, true);

	    // Issue #276:
	    // If starting a new statement with [if, for, while, do], push to a new line.
	    // if (a) if (b) if(c) d(); else e(); else f();
	    if (!this.start_of_object_property()) {
	      this.allow_wrap_or_preserved_newline(current_token,
	        reserved_array(current_token, ['do', 'for', 'if', 'while']));
	    }
	    return true;
	  }
	  return false;
	};

	Beautifier.prototype.handle_start_expr = function(current_token) {
	  // The conditional starts the statement if appropriate.
	  if (!this.start_of_statement(current_token)) {
	    this.handle_whitespace_and_comments(current_token);
	  }

	  var next_mode = MODE.Expression;
	  if (current_token.text === '[') {

	    if (this._flags.last_token.type === TOKEN.WORD || this._flags.last_token.text === ')') {
	      // this is array index specifier, break immediately
	      // a[x], fn()[x]
	      if (reserved_array(this._flags.last_token, line_starters)) {
	        this._output.space_before_token = true;
	      }
	      this.print_token(current_token);
	      this.set_mode(next_mode);
	      this.indent();
	      if (this._options.space_in_paren) {
	        this._output.space_before_token = true;
	      }
	      return;
	    }

	    next_mode = MODE.ArrayLiteral;
	    if (is_array(this._flags.mode)) {
	      if (this._flags.last_token.text === '[' ||
	        (this._flags.last_token.text === ',' && (this._last_last_text === ']' || this._last_last_text === '}'))) {
	        // ], [ goes to new line
	        // }, [ goes to new line
	        if (!this._options.keep_array_indentation) {
	          this.print_newline();
	        }
	      }
	    }

	    if (!in_array(this._flags.last_token.type, [TOKEN.START_EXPR, TOKEN.END_EXPR, TOKEN.WORD, TOKEN.OPERATOR, TOKEN.DOT])) {
	      this._output.space_before_token = true;
	    }
	  } else {
	    if (this._flags.last_token.type === TOKEN.RESERVED) {
	      if (this._flags.last_token.text === 'for') {
	        this._output.space_before_token = this._options.space_before_conditional;
	        next_mode = MODE.ForInitializer;
	      } else if (in_array(this._flags.last_token.text, ['if', 'while', 'switch'])) {
	        this._output.space_before_token = this._options.space_before_conditional;
	        next_mode = MODE.Conditional;
	      } else if (in_array(this._flags.last_word, ['await', 'async'])) {
	        // Should be a space between await and an IIFE, or async and an arrow function
	        this._output.space_before_token = true;
	      } else if (this._flags.last_token.text === 'import' && current_token.whitespace_before === '') {
	        this._output.space_before_token = false;
	      } else if (in_array(this._flags.last_token.text, line_starters) || this._flags.last_token.text === 'catch') {
	        this._output.space_before_token = true;
	      }
	    } else if (this._flags.last_token.type === TOKEN.EQUALS || this._flags.last_token.type === TOKEN.OPERATOR) {
	      // Support of this kind of newline preservation.
	      // a = (b &&
	      //     (c || d));
	      if (!this.start_of_object_property()) {
	        this.allow_wrap_or_preserved_newline(current_token);
	      }
	    } else if (this._flags.last_token.type === TOKEN.WORD) {
	      this._output.space_before_token = false;

	      // function name() vs function name ()
	      // function* name() vs function* name ()
	      // async name() vs async name ()
	      // In ES6, you can also define the method properties of an object
	      // var obj = {a: function() {}}
	      // It can be abbreviated
	      // var obj = {a() {}}
	      // var obj = { a() {}} vs var obj = { a () {}}
	      // var obj = { * a() {}} vs var obj = { * a () {}}
	      var peek_back_two = this._tokens.peek(-3);
	      if (this._options.space_after_named_function && peek_back_two) {
	        // peek starts at next character so -1 is current token
	        var peek_back_three = this._tokens.peek(-4);
	        if (reserved_array(peek_back_two, ['async', 'function']) ||
	          (peek_back_two.text === '*' && reserved_array(peek_back_three, ['async', 'function']))) {
	          this._output.space_before_token = true;
	        } else if (this._flags.mode === MODE.ObjectLiteral) {
	          if ((peek_back_two.text === '{' || peek_back_two.text === ',') ||
	            (peek_back_two.text === '*' && (peek_back_three.text === '{' || peek_back_three.text === ','))) {
	            this._output.space_before_token = true;
	          }
	        } else if (this._flags.parent && this._flags.parent.class_start_block) {
	          this._output.space_before_token = true;
	        }
	      }
	    } else {
	      // Support preserving wrapped arrow function expressions
	      // a.b('c',
	      //     () => d.e
	      // )
	      this.allow_wrap_or_preserved_newline(current_token);
	    }

	    // function() vs function ()
	    // yield*() vs yield* ()
	    // function*() vs function* ()
	    if ((this._flags.last_token.type === TOKEN.RESERVED && (this._flags.last_word === 'function' || this._flags.last_word === 'typeof')) ||
	      (this._flags.last_token.text === '*' &&
	        (in_array(this._last_last_text, ['function', 'yield']) ||
	          (this._flags.mode === MODE.ObjectLiteral && in_array(this._last_last_text, ['{', ',']))))) {
	      this._output.space_before_token = this._options.space_after_anon_function;
	    }
	  }

	  if (this._flags.last_token.text === ';' || this._flags.last_token.type === TOKEN.START_BLOCK) {
	    this.print_newline();
	  } else if (this._flags.last_token.type === TOKEN.END_EXPR || this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.END_BLOCK || this._flags.last_token.text === '.' || this._flags.last_token.type === TOKEN.COMMA) {
	    // do nothing on (( and )( and ][ and ]( and .(
	    // TODO: Consider whether forcing this is required.  Review failing tests when removed.
	    this.allow_wrap_or_preserved_newline(current_token, current_token.newlines);
	  }

	  this.print_token(current_token);
	  this.set_mode(next_mode);
	  if (this._options.space_in_paren) {
	    this._output.space_before_token = true;
	  }

	  // In all cases, if we newline while inside an expression it should be indented.
	  this.indent();
	};

	Beautifier.prototype.handle_end_expr = function(current_token) {
	  // statements inside expressions are not valid syntax, but...
	  // statements must all be closed when their container closes
	  while (this._flags.mode === MODE.Statement) {
	    this.restore_mode();
	  }

	  this.handle_whitespace_and_comments(current_token);

	  if (this._flags.multiline_frame) {
	    this.allow_wrap_or_preserved_newline(current_token,
	      current_token.text === ']' && is_array(this._flags.mode) && !this._options.keep_array_indentation);
	  }

	  if (this._options.space_in_paren) {
	    if (this._flags.last_token.type === TOKEN.START_EXPR && !this._options.space_in_empty_paren) {
	      // () [] no inner space in empty parens like these, ever, ref #320
	      this._output.trim();
	      this._output.space_before_token = false;
	    } else {
	      this._output.space_before_token = true;
	    }
	  }
	  this.deindent();
	  this.print_token(current_token);
	  this.restore_mode();

	  remove_redundant_indentation(this._output, this._previous_flags);

	  // do {} while () // no statement required after
	  if (this._flags.do_while && this._previous_flags.mode === MODE.Conditional) {
	    this._previous_flags.mode = MODE.Expression;
	    this._flags.do_block = false;
	    this._flags.do_while = false;

	  }
	};

	Beautifier.prototype.handle_start_block = function(current_token) {
	  this.handle_whitespace_and_comments(current_token);

	  // Check if this is should be treated as a ObjectLiteral
	  var next_token = this._tokens.peek();
	  var second_token = this._tokens.peek(1);
	  if (this._flags.last_word === 'switch' && this._flags.last_token.type === TOKEN.END_EXPR) {
	    this.set_mode(MODE.BlockStatement);
	    this._flags.in_case_statement = true;
	  } else if (this._flags.case_body) {
	    this.set_mode(MODE.BlockStatement);
	  } else if (second_token && (
	      (in_array(second_token.text, [':', ',']) && in_array(next_token.type, [TOKEN.STRING, TOKEN.WORD, TOKEN.RESERVED])) ||
	      (in_array(next_token.text, ['get', 'set', '...']) && in_array(second_token.type, [TOKEN.WORD, TOKEN.RESERVED]))
	    )) {
	    // We don't support TypeScript,but we didn't break it for a very long time.
	    // We'll try to keep not breaking it.
	    if (in_array(this._last_last_text, ['class', 'interface']) && !in_array(second_token.text, [':', ','])) {
	      this.set_mode(MODE.BlockStatement);
	    } else {
	      this.set_mode(MODE.ObjectLiteral);
	    }
	  } else if (this._flags.last_token.type === TOKEN.OPERATOR && this._flags.last_token.text === '=>') {
	    // arrow function: (param1, paramN) => { statements }
	    this.set_mode(MODE.BlockStatement);
	  } else if (in_array(this._flags.last_token.type, [TOKEN.EQUALS, TOKEN.START_EXPR, TOKEN.COMMA, TOKEN.OPERATOR]) ||
	    reserved_array(this._flags.last_token, ['return', 'throw', 'import', 'default'])
	  ) {
	    // Detecting shorthand function syntax is difficult by scanning forward,
	    //     so check the surrounding context.
	    // If the block is being returned, imported, export default, passed as arg,
	    //     assigned with = or assigned in a nested object, treat as an ObjectLiteral.
	    this.set_mode(MODE.ObjectLiteral);
	  } else {
	    this.set_mode(MODE.BlockStatement);
	  }

	  if (this._flags.last_token) {
	    if (reserved_array(this._flags.last_token.previous, ['class', 'extends'])) {
	      this._flags.class_start_block = true;
	    }
	  }

	  var empty_braces = !next_token.comments_before && next_token.text === '}';
	  var empty_anonymous_function = empty_braces && this._flags.last_word === 'function' &&
	    this._flags.last_token.type === TOKEN.END_EXPR;

	  if (this._options.brace_preserve_inline) // check for inline, set inline_frame if so
	  {
	    // search forward for a newline wanted inside this block
	    var index = 0;
	    var check_token = null;
	    this._flags.inline_frame = true;
	    do {
	      index += 1;
	      check_token = this._tokens.peek(index - 1);
	      if (check_token.newlines) {
	        this._flags.inline_frame = false;
	        break;
	      }
	    } while (check_token.type !== TOKEN.EOF &&
	      !(check_token.type === TOKEN.END_BLOCK && check_token.opened === current_token));
	  }

	  if ((this._options.brace_style === "expand" ||
	      (this._options.brace_style === "none" && current_token.newlines)) &&
	    !this._flags.inline_frame) {
	    if (this._flags.last_token.type !== TOKEN.OPERATOR &&
	      (empty_anonymous_function ||
	        this._flags.last_token.type === TOKEN.EQUALS ||
	        (reserved_array(this._flags.last_token, special_words) && this._flags.last_token.text !== 'else'))) {
	      this._output.space_before_token = true;
	    } else {
	      this.print_newline(false, true);
	    }
	  } else { // collapse || inline_frame
	    if (is_array(this._previous_flags.mode) && (this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.COMMA)) {
	      if (this._flags.last_token.type === TOKEN.COMMA || this._options.space_in_paren) {
	        this._output.space_before_token = true;
	      }

	      if (this._flags.last_token.type === TOKEN.COMMA || (this._flags.last_token.type === TOKEN.START_EXPR && this._flags.inline_frame)) {
	        this.allow_wrap_or_preserved_newline(current_token);
	        this._previous_flags.multiline_frame = this._previous_flags.multiline_frame || this._flags.multiline_frame;
	        this._flags.multiline_frame = false;
	      }
	    }
	    if (this._flags.last_token.type !== TOKEN.OPERATOR && this._flags.last_token.type !== TOKEN.START_EXPR) {
	      if (in_array(this._flags.last_token.type, [TOKEN.START_BLOCK, TOKEN.SEMICOLON]) && !this._flags.inline_frame) {
	        this.print_newline();
	      } else {
	        this._output.space_before_token = true;
	      }
	    }
	  }
	  this.print_token(current_token);
	  this.indent();

	  // Except for specific cases, open braces are followed by a new line.
	  if (!empty_braces && !(this._options.brace_preserve_inline && this._flags.inline_frame)) {
	    this.print_newline();
	  }
	};

	Beautifier.prototype.handle_end_block = function(current_token) {
	  // statements must all be closed when their container closes
	  this.handle_whitespace_and_comments(current_token);

	  while (this._flags.mode === MODE.Statement) {
	    this.restore_mode();
	  }

	  var empty_braces = this._flags.last_token.type === TOKEN.START_BLOCK;

	  if (this._flags.inline_frame && !empty_braces) { // try inline_frame (only set if this._options.braces-preserve-inline) first
	    this._output.space_before_token = true;
	  } else if (this._options.brace_style === "expand") {
	    if (!empty_braces) {
	      this.print_newline();
	    }
	  } else {
	    // skip {}
	    if (!empty_braces) {
	      if (is_array(this._flags.mode) && this._options.keep_array_indentation) {
	        // we REALLY need a newline here, but newliner would skip that
	        this._options.keep_array_indentation = false;
	        this.print_newline();
	        this._options.keep_array_indentation = true;

	      } else {
	        this.print_newline();
	      }
	    }
	  }
	  this.restore_mode();
	  this.print_token(current_token);
	};

	Beautifier.prototype.handle_word = function(current_token) {
	  if (current_token.type === TOKEN.RESERVED) {
	    if (in_array(current_token.text, ['set', 'get']) && this._flags.mode !== MODE.ObjectLiteral) {
	      current_token.type = TOKEN.WORD;
	    } else if (current_token.text === 'import' && in_array(this._tokens.peek().text, ['(', '.'])) {
	      current_token.type = TOKEN.WORD;
	    } else if (in_array(current_token.text, ['as', 'from']) && !this._flags.import_block) {
	      current_token.type = TOKEN.WORD;
	    } else if (this._flags.mode === MODE.ObjectLiteral) {
	      var next_token = this._tokens.peek();
	      if (next_token.text === ':') {
	        current_token.type = TOKEN.WORD;
	      }
	    }
	  }

	  if (this.start_of_statement(current_token)) {
	    // The conditional starts the statement if appropriate.
	    if (reserved_array(this._flags.last_token, ['var', 'let', 'const']) && current_token.type === TOKEN.WORD) {
	      this._flags.declaration_statement = true;
	    }
	  } else if (current_token.newlines && !is_expression(this._flags.mode) &&
	    (this._flags.last_token.type !== TOKEN.OPERATOR || (this._flags.last_token.text === '--' || this._flags.last_token.text === '++')) &&
	    this._flags.last_token.type !== TOKEN.EQUALS &&
	    (this._options.preserve_newlines || !reserved_array(this._flags.last_token, ['var', 'let', 'const', 'set', 'get']))) {
	    this.handle_whitespace_and_comments(current_token);
	    this.print_newline();
	  } else {
	    this.handle_whitespace_and_comments(current_token);
	  }

	  if (this._flags.do_block && !this._flags.do_while) {
	    if (reserved_word(current_token, 'while')) {
	      // do {} ## while ()
	      this._output.space_before_token = true;
	      this.print_token(current_token);
	      this._output.space_before_token = true;
	      this._flags.do_while = true;
	      return;
	    } else {
	      // do {} should always have while as the next word.
	      // if we don't see the expected while, recover
	      this.print_newline();
	      this._flags.do_block = false;
	    }
	  }

	  // if may be followed by else, or not
	  // Bare/inline ifs are tricky
	  // Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();
	  if (this._flags.if_block) {
	    if (!this._flags.else_block && reserved_word(current_token, 'else')) {
	      this._flags.else_block = true;
	    } else {
	      while (this._flags.mode === MODE.Statement) {
	        this.restore_mode();
	      }
	      this._flags.if_block = false;
	      this._flags.else_block = false;
	    }
	  }

	  if (this._flags.in_case_statement && reserved_array(current_token, ['case', 'default'])) {
	    this.print_newline();
	    if (!this._flags.case_block && (this._flags.case_body || this._options.jslint_happy)) {
	      // switch cases following one another
	      this.deindent();
	    }
	    this._flags.case_body = false;

	    this.print_token(current_token);
	    this._flags.in_case = true;
	    return;
	  }

	  if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.EQUALS || this._flags.last_token.type === TOKEN.OPERATOR) {
	    if (!this.start_of_object_property() && !(
	        // start of object property is different for numeric values with +/- prefix operators
	        in_array(this._flags.last_token.text, ['+', '-']) && this._last_last_text === ':' && this._flags.parent.mode === MODE.ObjectLiteral)) {
	      this.allow_wrap_or_preserved_newline(current_token);
	    }
	  }

	  if (reserved_word(current_token, 'function')) {
	    if (in_array(this._flags.last_token.text, ['}', ';']) ||
	      (this._output.just_added_newline() && !(in_array(this._flags.last_token.text, ['(', '[', '{', ':', '=', ',']) || this._flags.last_token.type === TOKEN.OPERATOR))) {
	      // make sure there is a nice clean space of at least one blank line
	      // before a new function definition
	      if (!this._output.just_added_blankline() && !current_token.comments_before) {
	        this.print_newline();
	        this.print_newline(true);
	      }
	    }
	    if (this._flags.last_token.type === TOKEN.RESERVED || this._flags.last_token.type === TOKEN.WORD) {
	      if (reserved_array(this._flags.last_token, ['get', 'set', 'new', 'export']) ||
	        reserved_array(this._flags.last_token, newline_restricted_tokens)) {
	        this._output.space_before_token = true;
	      } else if (reserved_word(this._flags.last_token, 'default') && this._last_last_text === 'export') {
	        this._output.space_before_token = true;
	      } else if (this._flags.last_token.text === 'declare') {
	        // accomodates Typescript declare function formatting
	        this._output.space_before_token = true;
	      } else {
	        this.print_newline();
	      }
	    } else if (this._flags.last_token.type === TOKEN.OPERATOR || this._flags.last_token.text === '=') {
	      // foo = function
	      this._output.space_before_token = true;
	    } else if (!this._flags.multiline_frame && (is_expression(this._flags.mode) || is_array(this._flags.mode))) ; else {
	      this.print_newline();
	    }

	    this.print_token(current_token);
	    this._flags.last_word = current_token.text;
	    return;
	  }

	  var prefix = 'NONE';

	  if (this._flags.last_token.type === TOKEN.END_BLOCK) {

	    if (this._previous_flags.inline_frame) {
	      prefix = 'SPACE';
	    } else if (!reserved_array(current_token, ['else', 'catch', 'finally', 'from'])) {
	      prefix = 'NEWLINE';
	    } else {
	      if (this._options.brace_style === "expand" ||
	        this._options.brace_style === "end-expand" ||
	        (this._options.brace_style === "none" && current_token.newlines)) {
	        prefix = 'NEWLINE';
	      } else {
	        prefix = 'SPACE';
	        this._output.space_before_token = true;
	      }
	    }
	  } else if (this._flags.last_token.type === TOKEN.SEMICOLON && this._flags.mode === MODE.BlockStatement) {
	    // TODO: Should this be for STATEMENT as well?
	    prefix = 'NEWLINE';
	  } else if (this._flags.last_token.type === TOKEN.SEMICOLON && is_expression(this._flags.mode)) {
	    prefix = 'SPACE';
	  } else if (this._flags.last_token.type === TOKEN.STRING) {
	    prefix = 'NEWLINE';
	  } else if (this._flags.last_token.type === TOKEN.RESERVED || this._flags.last_token.type === TOKEN.WORD ||
	    (this._flags.last_token.text === '*' &&
	      (in_array(this._last_last_text, ['function', 'yield']) ||
	        (this._flags.mode === MODE.ObjectLiteral && in_array(this._last_last_text, ['{', ',']))))) {
	    prefix = 'SPACE';
	  } else if (this._flags.last_token.type === TOKEN.START_BLOCK) {
	    if (this._flags.inline_frame) {
	      prefix = 'SPACE';
	    } else {
	      prefix = 'NEWLINE';
	    }
	  } else if (this._flags.last_token.type === TOKEN.END_EXPR) {
	    this._output.space_before_token = true;
	    prefix = 'NEWLINE';
	  }

	  if (reserved_array(current_token, line_starters) && this._flags.last_token.text !== ')') {
	    if (this._flags.inline_frame || this._flags.last_token.text === 'else' || this._flags.last_token.text === 'export') {
	      prefix = 'SPACE';
	    } else {
	      prefix = 'NEWLINE';
	    }

	  }

	  if (reserved_array(current_token, ['else', 'catch', 'finally'])) {
	    if ((!(this._flags.last_token.type === TOKEN.END_BLOCK && this._previous_flags.mode === MODE.BlockStatement) ||
	        this._options.brace_style === "expand" ||
	        this._options.brace_style === "end-expand" ||
	        (this._options.brace_style === "none" && current_token.newlines)) &&
	      !this._flags.inline_frame) {
	      this.print_newline();
	    } else {
	      this._output.trim(true);
	      var line = this._output.current_line;
	      // If we trimmed and there's something other than a close block before us
	      // put a newline back in.  Handles '} // comment' scenario.
	      if (line.last() !== '}') {
	        this.print_newline();
	      }
	      this._output.space_before_token = true;
	    }
	  } else if (prefix === 'NEWLINE') {
	    if (reserved_array(this._flags.last_token, special_words)) {
	      // no newline between 'return nnn'
	      this._output.space_before_token = true;
	    } else if (this._flags.last_token.text === 'declare' && reserved_array(current_token, ['var', 'let', 'const'])) {
	      // accomodates Typescript declare formatting
	      this._output.space_before_token = true;
	    } else if (this._flags.last_token.type !== TOKEN.END_EXPR) {
	      if ((this._flags.last_token.type !== TOKEN.START_EXPR || !reserved_array(current_token, ['var', 'let', 'const'])) && this._flags.last_token.text !== ':') {
	        // no need to force newline on 'var': for (var x = 0...)
	        if (reserved_word(current_token, 'if') && reserved_word(current_token.previous, 'else')) {
	          // no newline for } else if {
	          this._output.space_before_token = true;
	        } else {
	          this.print_newline();
	        }
	      }
	    } else if (reserved_array(current_token, line_starters) && this._flags.last_token.text !== ')') {
	      this.print_newline();
	    }
	  } else if (this._flags.multiline_frame && is_array(this._flags.mode) && this._flags.last_token.text === ',' && this._last_last_text === '}') {
	    this.print_newline(); // }, in lists get a newline treatment
	  } else if (prefix === 'SPACE') {
	    this._output.space_before_token = true;
	  }
	  if (current_token.previous && (current_token.previous.type === TOKEN.WORD || current_token.previous.type === TOKEN.RESERVED)) {
	    this._output.space_before_token = true;
	  }
	  this.print_token(current_token);
	  this._flags.last_word = current_token.text;

	  if (current_token.type === TOKEN.RESERVED) {
	    if (current_token.text === 'do') {
	      this._flags.do_block = true;
	    } else if (current_token.text === 'if') {
	      this._flags.if_block = true;
	    } else if (current_token.text === 'import') {
	      this._flags.import_block = true;
	    } else if (this._flags.import_block && reserved_word(current_token, 'from')) {
	      this._flags.import_block = false;
	    }
	  }
	};

	Beautifier.prototype.handle_semicolon = function(current_token) {
	  if (this.start_of_statement(current_token)) {
	    // The conditional starts the statement if appropriate.
	    // Semicolon can be the start (and end) of a statement
	    this._output.space_before_token = false;
	  } else {
	    this.handle_whitespace_and_comments(current_token);
	  }

	  var next_token = this._tokens.peek();
	  while (this._flags.mode === MODE.Statement &&
	    !(this._flags.if_block && reserved_word(next_token, 'else')) &&
	    !this._flags.do_block) {
	    this.restore_mode();
	  }

	  // hacky but effective for the moment
	  if (this._flags.import_block) {
	    this._flags.import_block = false;
	  }
	  this.print_token(current_token);
	};

	Beautifier.prototype.handle_string = function(current_token) {
	  if (current_token.text.startsWith("`") && current_token.newlines === 0 && current_token.whitespace_before === '' && (current_token.previous.text === ')' || this._flags.last_token.type === TOKEN.WORD)) ; else if (this.start_of_statement(current_token)) {
	    // The conditional starts the statement if appropriate.
	    // One difference - strings want at least a space before
	    this._output.space_before_token = true;
	  } else {
	    this.handle_whitespace_and_comments(current_token);
	    if (this._flags.last_token.type === TOKEN.RESERVED || this._flags.last_token.type === TOKEN.WORD || this._flags.inline_frame) {
	      this._output.space_before_token = true;
	    } else if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR || this._flags.last_token.type === TOKEN.EQUALS || this._flags.last_token.type === TOKEN.OPERATOR) {
	      if (!this.start_of_object_property()) {
	        this.allow_wrap_or_preserved_newline(current_token);
	      }
	    } else if ((current_token.text.startsWith("`") && this._flags.last_token.type === TOKEN.END_EXPR && (current_token.previous.text === ']' || current_token.previous.text === ')') && current_token.newlines === 0)) {
	      this._output.space_before_token = true;
	    } else {
	      this.print_newline();
	    }
	  }
	  this.print_token(current_token);
	};

	Beautifier.prototype.handle_equals = function(current_token) {
	  if (this.start_of_statement(current_token)) ; else {
	    this.handle_whitespace_and_comments(current_token);
	  }

	  if (this._flags.declaration_statement) {
	    // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
	    this._flags.declaration_assignment = true;
	  }
	  this._output.space_before_token = true;
	  this.print_token(current_token);
	  this._output.space_before_token = true;
	};

	Beautifier.prototype.handle_comma = function(current_token) {
	  this.handle_whitespace_and_comments(current_token, true);

	  this.print_token(current_token);
	  this._output.space_before_token = true;
	  if (this._flags.declaration_statement) {
	    if (is_expression(this._flags.parent.mode)) {
	      // do not break on comma, for(var a = 1, b = 2)
	      this._flags.declaration_assignment = false;
	    }

	    if (this._flags.declaration_assignment) {
	      this._flags.declaration_assignment = false;
	      this.print_newline(false, true);
	    } else if (this._options.comma_first) {
	      // for comma-first, we want to allow a newline before the comma
	      // to turn into a newline after the comma, which we will fixup later
	      this.allow_wrap_or_preserved_newline(current_token);
	    }
	  } else if (this._flags.mode === MODE.ObjectLiteral ||
	    (this._flags.mode === MODE.Statement && this._flags.parent.mode === MODE.ObjectLiteral)) {
	    if (this._flags.mode === MODE.Statement) {
	      this.restore_mode();
	    }

	    if (!this._flags.inline_frame) {
	      this.print_newline();
	    }
	  } else if (this._options.comma_first) {
	    // EXPR or DO_BLOCK
	    // for comma-first, we want to allow a newline before the comma
	    // to turn into a newline after the comma, which we will fixup later
	    this.allow_wrap_or_preserved_newline(current_token);
	  }
	};

	Beautifier.prototype.handle_operator = function(current_token) {
	  var isGeneratorAsterisk = current_token.text === '*' &&
	    (reserved_array(this._flags.last_token, ['function', 'yield']) ||
	      (in_array(this._flags.last_token.type, [TOKEN.START_BLOCK, TOKEN.COMMA, TOKEN.END_BLOCK, TOKEN.SEMICOLON]))
	    );
	  var isUnary = in_array(current_token.text, ['-', '+']) && (
	    in_array(this._flags.last_token.type, [TOKEN.START_BLOCK, TOKEN.START_EXPR, TOKEN.EQUALS, TOKEN.OPERATOR]) ||
	    in_array(this._flags.last_token.text, line_starters) ||
	    this._flags.last_token.text === ','
	  );

	  if (this.start_of_statement(current_token)) ; else {
	    var preserve_statement_flags = !isGeneratorAsterisk;
	    this.handle_whitespace_and_comments(current_token, preserve_statement_flags);
	  }

	  // hack for actionscript's import .*;
	  if (current_token.text === '*' && this._flags.last_token.type === TOKEN.DOT) {
	    this.print_token(current_token);
	    return;
	  }

	  if (current_token.text === '::') {
	    // no spaces around exotic namespacing syntax operator
	    this.print_token(current_token);
	    return;
	  }

	  if (in_array(current_token.text, ['-', '+']) && this.start_of_object_property()) {
	    // numeric value with +/- symbol in front as a property
	    this.print_token(current_token);
	    return;
	  }

	  // Allow line wrapping between operators when operator_position is
	  //   set to before or preserve
	  if (this._flags.last_token.type === TOKEN.OPERATOR && in_array(this._options.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)) {
	    this.allow_wrap_or_preserved_newline(current_token);
	  }

	  if (current_token.text === ':' && this._flags.in_case) {
	    this.print_token(current_token);

	    this._flags.in_case = false;
	    this._flags.case_body = true;
	    if (this._tokens.peek().type !== TOKEN.START_BLOCK) {
	      this.indent();
	      this.print_newline();
	      this._flags.case_block = false;
	    } else {
	      this._flags.case_block = true;
	      this._output.space_before_token = true;
	    }
	    return;
	  }

	  var space_before = true;
	  var space_after = true;
	  var in_ternary = false;
	  if (current_token.text === ':') {
	    if (this._flags.ternary_depth === 0) {
	      // Colon is invalid javascript outside of ternary and object, but do our best to guess what was meant.
	      space_before = false;
	    } else {
	      this._flags.ternary_depth -= 1;
	      in_ternary = true;
	    }
	  } else if (current_token.text === '?') {
	    this._flags.ternary_depth += 1;
	  }

	  // let's handle the operator_position option prior to any conflicting logic
	  if (!isUnary && !isGeneratorAsterisk && this._options.preserve_newlines && in_array(current_token.text, positionable_operators)) {
	    var isColon = current_token.text === ':';
	    var isTernaryColon = (isColon && in_ternary);
	    var isOtherColon = (isColon && !in_ternary);

	    switch (this._options.operator_position) {
	      case OPERATOR_POSITION.before_newline:
	        // if the current token is : and it's not a ternary statement then we set space_before to false
	        this._output.space_before_token = !isOtherColon;

	        this.print_token(current_token);

	        if (!isColon || isTernaryColon) {
	          this.allow_wrap_or_preserved_newline(current_token);
	        }

	        this._output.space_before_token = true;
	        return;

	      case OPERATOR_POSITION.after_newline:
	        // if the current token is anything but colon, or (via deduction) it's a colon and in a ternary statement,
	        //   then print a newline.

	        this._output.space_before_token = true;

	        if (!isColon || isTernaryColon) {
	          if (this._tokens.peek().newlines) {
	            this.print_newline(false, true);
	          } else {
	            this.allow_wrap_or_preserved_newline(current_token);
	          }
	        } else {
	          this._output.space_before_token = false;
	        }

	        this.print_token(current_token);

	        this._output.space_before_token = true;
	        return;

	      case OPERATOR_POSITION.preserve_newline:
	        if (!isOtherColon) {
	          this.allow_wrap_or_preserved_newline(current_token);
	        }

	        // if we just added a newline, or the current token is : and it's not a ternary statement,
	        //   then we set space_before to false
	        space_before = !(this._output.just_added_newline() || isOtherColon);

	        this._output.space_before_token = space_before;
	        this.print_token(current_token);
	        this._output.space_before_token = true;
	        return;
	    }
	  }

	  if (isGeneratorAsterisk) {
	    this.allow_wrap_or_preserved_newline(current_token);
	    space_before = false;
	    var next_token = this._tokens.peek();
	    space_after = next_token && in_array(next_token.type, [TOKEN.WORD, TOKEN.RESERVED]);
	  } else if (current_token.text === '...') {
	    this.allow_wrap_or_preserved_newline(current_token);
	    space_before = this._flags.last_token.type === TOKEN.START_BLOCK;
	    space_after = false;
	  } else if (in_array(current_token.text, ['--', '++', '!', '~']) || isUnary) {
	    // unary operators (and binary +/- pretending to be unary) special cases
	    if (this._flags.last_token.type === TOKEN.COMMA || this._flags.last_token.type === TOKEN.START_EXPR) {
	      this.allow_wrap_or_preserved_newline(current_token);
	    }

	    space_before = false;
	    space_after = false;

	    // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
	    // if there is a newline between -- or ++ and anything else we should preserve it.
	    if (current_token.newlines && (current_token.text === '--' || current_token.text === '++' || current_token.text === '~')) {
	      var new_line_needed = reserved_array(this._flags.last_token, special_words) && current_token.newlines;
	      if (new_line_needed && (this._previous_flags.if_block || this._previous_flags.else_block)) {
	        this.restore_mode();
	      }
	      this.print_newline(new_line_needed, true);
	    }

	    if (this._flags.last_token.text === ';' && is_expression(this._flags.mode)) {
	      // for (;; ++i)
	      //        ^^^
	      space_before = true;
	    }

	    if (this._flags.last_token.type === TOKEN.RESERVED) {
	      space_before = true;
	    } else if (this._flags.last_token.type === TOKEN.END_EXPR) {
	      space_before = !(this._flags.last_token.text === ']' && (current_token.text === '--' || current_token.text === '++'));
	    } else if (this._flags.last_token.type === TOKEN.OPERATOR) {
	      // a++ + ++b;
	      // a - -b
	      space_before = in_array(current_token.text, ['--', '-', '++', '+']) && in_array(this._flags.last_token.text, ['--', '-', '++', '+']);
	      // + and - are not unary when preceeded by -- or ++ operator
	      // a-- + b
	      // a * +b
	      // a - -b
	      if (in_array(current_token.text, ['+', '-']) && in_array(this._flags.last_token.text, ['--', '++'])) {
	        space_after = true;
	      }
	    }


	    if (((this._flags.mode === MODE.BlockStatement && !this._flags.inline_frame) || this._flags.mode === MODE.Statement) &&
	      (this._flags.last_token.text === '{' || this._flags.last_token.text === ';')) {
	      // { foo; --i }
	      // foo(); --bar;
	      this.print_newline();
	    }
	  }

	  this._output.space_before_token = this._output.space_before_token || space_before;
	  this.print_token(current_token);
	  this._output.space_before_token = space_after;
	};

	Beautifier.prototype.handle_block_comment = function(current_token, preserve_statement_flags) {
	  if (this._output.raw) {
	    this._output.add_raw_token(current_token);
	    if (current_token.directives && current_token.directives.preserve === 'end') {
	      // If we're testing the raw output behavior, do not allow a directive to turn it off.
	      this._output.raw = this._options.test_output_raw;
	    }
	    return;
	  }

	  if (current_token.directives) {
	    this.print_newline(false, preserve_statement_flags);
	    this.print_token(current_token);
	    if (current_token.directives.preserve === 'start') {
	      this._output.raw = true;
	    }
	    this.print_newline(false, true);
	    return;
	  }

	  // inline block
	  if (!acorn.newline.test(current_token.text) && !current_token.newlines) {
	    this._output.space_before_token = true;
	    this.print_token(current_token);
	    this._output.space_before_token = true;
	    return;
	  } else {
	    this.print_block_commment(current_token, preserve_statement_flags);
	  }
	};

	Beautifier.prototype.print_block_commment = function(current_token, preserve_statement_flags) {
	  var lines = split_linebreaks(current_token.text);
	  var j; // iterator for this case
	  var javadoc = false;
	  var starless = false;
	  var lastIndent = current_token.whitespace_before;
	  var lastIndentLength = lastIndent.length;

	  // block comment starts with a new line
	  this.print_newline(false, preserve_statement_flags);

	  // first line always indented
	  this.print_token_line_indentation(current_token);
	  this._output.add_token(lines[0]);
	  this.print_newline(false, preserve_statement_flags);


	  if (lines.length > 1) {
	    lines = lines.slice(1);
	    javadoc = all_lines_start_with(lines, '*');
	    starless = each_line_matches_indent(lines, lastIndent);

	    if (javadoc) {
	      this._flags.alignment = 1;
	    }

	    for (j = 0; j < lines.length; j++) {
	      if (javadoc) {
	        // javadoc: reformat and re-indent
	        this.print_token_line_indentation(current_token);
	        this._output.add_token(ltrim(lines[j]));
	      } else if (starless && lines[j]) {
	        // starless: re-indent non-empty content, avoiding trim
	        this.print_token_line_indentation(current_token);
	        this._output.add_token(lines[j].substring(lastIndentLength));
	      } else {
	        // normal comments output raw
	        this._output.current_line.set_indent(-1);
	        this._output.add_token(lines[j]);
	      }

	      // for comments on their own line or  more than one line, make sure there's a new line after
	      this.print_newline(false, preserve_statement_flags);
	    }

	    this._flags.alignment = 0;
	  }
	};


	Beautifier.prototype.handle_comment = function(current_token, preserve_statement_flags) {
	  if (current_token.newlines) {
	    this.print_newline(false, preserve_statement_flags);
	  } else {
	    this._output.trim(true);
	  }

	  this._output.space_before_token = true;
	  this.print_token(current_token);
	  this.print_newline(false, preserve_statement_flags);
	};

	Beautifier.prototype.handle_dot = function(current_token) {
	  if (this.start_of_statement(current_token)) ; else {
	    this.handle_whitespace_and_comments(current_token, true);
	  }

	  if (this._flags.last_token.text.match('^[0-9]+$')) {
	    this._output.space_before_token = true;
	  }

	  if (reserved_array(this._flags.last_token, special_words)) {
	    this._output.space_before_token = false;
	  } else {
	    // allow preserved newlines before dots in general
	    // force newlines on dots after close paren when break_chained - for bar().baz()
	    this.allow_wrap_or_preserved_newline(current_token,
	      this._flags.last_token.text === ')' && this._options.break_chained_methods);
	  }

	  // Only unindent chained method dot if this dot starts a new line.
	  // Otherwise the automatic extra indentation removal will handle the over indent
	  if (this._options.unindent_chained_methods && this._output.just_added_newline()) {
	    this.deindent();
	  }

	  this.print_token(current_token);
	};

	Beautifier.prototype.handle_unknown = function(current_token, preserve_statement_flags) {
	  this.print_token(current_token);

	  if (current_token.text[current_token.text.length - 1] === '\n') {
	    this.print_newline(false, preserve_statement_flags);
	  }
	};

	Beautifier.prototype.handle_eof = function(current_token) {
	  // Unwind any open statements
	  while (this._flags.mode === MODE.Statement) {
	    this.restore_mode();
	  }
	  this.handle_whitespace_and_comments(current_token);
	};

	beautifier$2.Beautifier = Beautifier;
	return beautifier$2;
}

/*jshint node:true */

var hasRequiredJavascript;

function requireJavascript () {
	if (hasRequiredJavascript) return javascript.exports;
	hasRequiredJavascript = 1;

	var Beautifier = requireBeautifier$2().Beautifier,
	  Options = requireOptions$2().Options;

	function js_beautify(js_source_text, options) {
	  var beautifier = new Beautifier(js_source_text, options);
	  return beautifier.beautify();
	}

	javascript.exports = js_beautify;
	javascript.exports.defaultOptions = function() {
	  return new Options();
	};
	return javascript.exports;
}

var css = {exports: {}};

var beautifier$1 = {};

var options$1 = {};

/*jshint node:true */

var hasRequiredOptions$1;

function requireOptions$1 () {
	if (hasRequiredOptions$1) return options$1;
	hasRequiredOptions$1 = 1;

	var BaseOptions = requireOptions$3().Options;

	function Options(options) {
	  BaseOptions.call(this, options, 'css');

	  this.selector_separator_newline = this._get_boolean('selector_separator_newline', true);
	  this.newline_between_rules = this._get_boolean('newline_between_rules', true);
	  var space_around_selector_separator = this._get_boolean('space_around_selector_separator');
	  this.space_around_combinator = this._get_boolean('space_around_combinator') || space_around_selector_separator;

	  var brace_style_split = this._get_selection_list('brace_style', ['collapse', 'expand', 'end-expand', 'none', 'preserve-inline']);
	  this.brace_style = 'collapse';
	  for (var bs = 0; bs < brace_style_split.length; bs++) {
	    if (brace_style_split[bs] !== 'expand') {
	      // default to collapse, as only collapse|expand is implemented for now
	      this.brace_style = 'collapse';
	    } else {
	      this.brace_style = brace_style_split[bs];
	    }
	  }
	}
	Options.prototype = new BaseOptions();



	options$1.Options = Options;
	return options$1;
}

/*jshint node:true */

var hasRequiredBeautifier$1;

function requireBeautifier$1 () {
	if (hasRequiredBeautifier$1) return beautifier$1;
	hasRequiredBeautifier$1 = 1;

	var Options = requireOptions$1().Options;
	var Output = requireOutput().Output;
	var InputScanner = requireInputscanner().InputScanner;
	var Directives = requireDirectives().Directives;

	var directives_core = new Directives(/\/\*/, /\*\//);

	var lineBreak = /\r\n|[\r\n]/;
	var allLineBreaks = /\r\n|[\r\n]/g;

	// tokenizer
	var whitespaceChar = /\s/;
	var whitespacePattern = /(?:\s|\n)+/g;
	var block_comment_pattern = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g;
	var comment_pattern = /\/\/(?:[^\n\r\u2028\u2029]*)/g;

	function Beautifier(source_text, options) {
	  this._source_text = source_text || '';
	  // Allow the setting of language/file-type specific options
	  // with inheritance of overall settings
	  this._options = new Options(options);
	  this._ch = null;
	  this._input = null;

	  // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
	  this.NESTED_AT_RULE = {
	    "page": true,
	    "font-face": true,
	    "keyframes": true,
	    // also in CONDITIONAL_GROUP_RULE below
	    "media": true,
	    "supports": true,
	    "document": true
	  };
	  this.CONDITIONAL_GROUP_RULE = {
	    "media": true,
	    "supports": true,
	    "document": true
	  };
	  this.NON_SEMICOLON_NEWLINE_PROPERTY = [
	    "grid-template-areas",
	    "grid-template"
	  ];

	}

	Beautifier.prototype.eatString = function(endChars) {
	  var result = '';
	  this._ch = this._input.next();
	  while (this._ch) {
	    result += this._ch;
	    if (this._ch === "\\") {
	      result += this._input.next();
	    } else if (endChars.indexOf(this._ch) !== -1 || this._ch === "\n") {
	      break;
	    }
	    this._ch = this._input.next();
	  }
	  return result;
	};

	// Skips any white space in the source text from the current position.
	// When allowAtLeastOneNewLine is true, will output new lines for each
	// newline character found; if the user has preserve_newlines off, only
	// the first newline will be output
	Beautifier.prototype.eatWhitespace = function(allowAtLeastOneNewLine) {
	  var result = whitespaceChar.test(this._input.peek());
	  var newline_count = 0;
	  while (whitespaceChar.test(this._input.peek())) {
	    this._ch = this._input.next();
	    if (allowAtLeastOneNewLine && this._ch === '\n') {
	      if (newline_count === 0 || newline_count < this._options.max_preserve_newlines) {
	        newline_count++;
	        this._output.add_new_line(true);
	      }
	    }
	  }
	  return result;
	};

	// Nested pseudo-class if we are insideRule
	// and the next special character found opens
	// a new block
	Beautifier.prototype.foundNestedPseudoClass = function() {
	  var openParen = 0;
	  var i = 1;
	  var ch = this._input.peek(i);
	  while (ch) {
	    if (ch === "{") {
	      return true;
	    } else if (ch === '(') {
	      // pseudoclasses can contain ()
	      openParen += 1;
	    } else if (ch === ')') {
	      if (openParen === 0) {
	        return false;
	      }
	      openParen -= 1;
	    } else if (ch === ";" || ch === "}") {
	      return false;
	    }
	    i++;
	    ch = this._input.peek(i);
	  }
	  return false;
	};

	Beautifier.prototype.print_string = function(output_string) {
	  this._output.set_indent(this._indentLevel);
	  this._output.non_breaking_space = true;
	  this._output.add_token(output_string);
	};

	Beautifier.prototype.preserveSingleSpace = function(isAfterSpace) {
	  if (isAfterSpace) {
	    this._output.space_before_token = true;
	  }
	};

	Beautifier.prototype.indent = function() {
	  this._indentLevel++;
	};

	Beautifier.prototype.outdent = function() {
	  if (this._indentLevel > 0) {
	    this._indentLevel--;
	  }
	};

	/*_____________________--------------------_____________________*/

	Beautifier.prototype.beautify = function() {
	  if (this._options.disabled) {
	    return this._source_text;
	  }

	  var source_text = this._source_text;
	  var eol = this._options.eol;
	  if (eol === 'auto') {
	    eol = '\n';
	    if (source_text && lineBreak.test(source_text || '')) {
	      eol = source_text.match(lineBreak)[0];
	    }
	  }


	  // HACK: newline parsing inconsistent. This brute force normalizes the this._input.
	  source_text = source_text.replace(allLineBreaks, '\n');

	  // reset
	  var baseIndentString = source_text.match(/^[\t ]*/)[0];

	  this._output = new Output(this._options, baseIndentString);
	  this._input = new InputScanner(source_text);
	  this._indentLevel = 0;
	  this._nestedLevel = 0;

	  this._ch = null;
	  var parenLevel = 0;

	  var insideRule = false;
	  // This is the value side of a property value pair (blue in the following ex)
	  // label { content: blue }
	  var insidePropertyValue = false;
	  var enteringConditionalGroup = false;
	  var insideNonNestedAtRule = false;
	  var insideScssMap = false;
	  var topCharacter = this._ch;
	  var insideNonSemiColonValues = false;
	  var whitespace;
	  var isAfterSpace;
	  var previous_ch;

	  while (true) {
	    whitespace = this._input.read(whitespacePattern);
	    isAfterSpace = whitespace !== '';
	    previous_ch = topCharacter;
	    this._ch = this._input.next();
	    if (this._ch === '\\' && this._input.hasNext()) {
	      this._ch += this._input.next();
	    }
	    topCharacter = this._ch;

	    if (!this._ch) {
	      break;
	    } else if (this._ch === '/' && this._input.peek() === '*') {
	      // /* css comment */
	      // Always start block comments on a new line.
	      // This handles scenarios where a block comment immediately
	      // follows a property definition on the same line or where
	      // minified code is being beautified.
	      this._output.add_new_line();
	      this._input.back();

	      var comment = this._input.read(block_comment_pattern);

	      // Handle ignore directive
	      var directives = directives_core.get_directives(comment);
	      if (directives && directives.ignore === 'start') {
	        comment += directives_core.readIgnored(this._input);
	      }

	      this.print_string(comment);

	      // Ensures any new lines following the comment are preserved
	      this.eatWhitespace(true);

	      // Block comments are followed by a new line so they don't
	      // share a line with other properties
	      this._output.add_new_line();
	    } else if (this._ch === '/' && this._input.peek() === '/') {
	      // // single line comment
	      // Preserves the space before a comment
	      // on the same line as a rule
	      this._output.space_before_token = true;
	      this._input.back();
	      this.print_string(this._input.read(comment_pattern));

	      // Ensures any new lines following the comment are preserved
	      this.eatWhitespace(true);
	    } else if (this._ch === '$') {
	      this.preserveSingleSpace(isAfterSpace);

	      this.print_string(this._ch);

	      // strip trailing space, if present, for hash property checks
	      var variable = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);

	      if (variable.match(/[ :]$/)) {
	        // we have a variable or pseudo-class, add it and insert one space before continuing
	        variable = this.eatString(": ").replace(/\s+$/, '');
	        this.print_string(variable);
	        this._output.space_before_token = true;
	      }

	      // might be sass variable
	      if (parenLevel === 0 && variable.indexOf(':') !== -1) {
	        insidePropertyValue = true;
	        this.indent();
	      }
	    } else if (this._ch === '@') {
	      this.preserveSingleSpace(isAfterSpace);

	      // deal with less property mixins @{...}
	      if (this._input.peek() === '{') {
	        this.print_string(this._ch + this.eatString('}'));
	      } else {
	        this.print_string(this._ch);

	        // strip trailing space, if present, for hash property checks
	        var variableOrRule = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);

	        if (variableOrRule.match(/[ :]$/)) {
	          // we have a variable or pseudo-class, add it and insert one space before continuing
	          variableOrRule = this.eatString(": ").replace(/\s+$/, '');
	          this.print_string(variableOrRule);
	          this._output.space_before_token = true;
	        }

	        // might be less variable
	        if (parenLevel === 0 && variableOrRule.indexOf(':') !== -1) {
	          insidePropertyValue = true;
	          this.indent();

	          // might be a nesting at-rule
	        } else if (variableOrRule in this.NESTED_AT_RULE) {
	          this._nestedLevel += 1;
	          if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
	            enteringConditionalGroup = true;
	          }

	          // might be a non-nested at-rule
	        } else if (parenLevel === 0 && !insidePropertyValue) {
	          insideNonNestedAtRule = true;
	        }
	      }
	    } else if (this._ch === '#' && this._input.peek() === '{') {
	      this.preserveSingleSpace(isAfterSpace);
	      this.print_string(this._ch + this.eatString('}'));
	    } else if (this._ch === '{') {
	      if (insidePropertyValue) {
	        insidePropertyValue = false;
	        this.outdent();
	      }

	      // non nested at rule becomes nested
	      insideNonNestedAtRule = false;

	      // when entering conditional groups, only rulesets are allowed
	      if (enteringConditionalGroup) {
	        enteringConditionalGroup = false;
	        insideRule = (this._indentLevel >= this._nestedLevel);
	      } else {
	        // otherwise, declarations are also allowed
	        insideRule = (this._indentLevel >= this._nestedLevel - 1);
	      }
	      if (this._options.newline_between_rules && insideRule) {
	        if (this._output.previous_line && this._output.previous_line.item(-1) !== '{') {
	          this._output.ensure_empty_line_above('/', ',');
	        }
	      }

	      this._output.space_before_token = true;

	      // The difference in print_string and indent order is necessary to indent the '{' correctly
	      if (this._options.brace_style === 'expand') {
	        this._output.add_new_line();
	        this.print_string(this._ch);
	        this.indent();
	        this._output.set_indent(this._indentLevel);
	      } else {
	        // inside mixin and first param is object
	        if (previous_ch === '(') {
	          this._output.space_before_token = false;
	        } else if (previous_ch !== ',') {
	          this.indent();
	        }
	        this.print_string(this._ch);
	      }

	      this.eatWhitespace(true);
	      this._output.add_new_line();
	    } else if (this._ch === '}') {
	      this.outdent();
	      this._output.add_new_line();
	      if (previous_ch === '{') {
	        this._output.trim(true);
	      }

	      if (insidePropertyValue) {
	        this.outdent();
	        insidePropertyValue = false;
	      }
	      this.print_string(this._ch);
	      insideRule = false;
	      if (this._nestedLevel) {
	        this._nestedLevel--;
	      }

	      this.eatWhitespace(true);
	      this._output.add_new_line();

	      if (this._options.newline_between_rules && !this._output.just_added_blankline()) {
	        if (this._input.peek() !== '}') {
	          this._output.add_new_line(true);
	        }
	      }
	      if (this._input.peek() === ')') {
	        this._output.trim(true);
	        if (this._options.brace_style === "expand") {
	          this._output.add_new_line(true);
	        }
	      }
	    } else if (this._ch === ":") {

	      for (var i = 0; i < this.NON_SEMICOLON_NEWLINE_PROPERTY.length; i++) {
	        if (this._input.lookBack(this.NON_SEMICOLON_NEWLINE_PROPERTY[i])) {
	          insideNonSemiColonValues = true;
	          break;
	        }
	      }

	      if ((insideRule || enteringConditionalGroup) && !(this._input.lookBack("&") || this.foundNestedPseudoClass()) && !this._input.lookBack("(") && !insideNonNestedAtRule && parenLevel === 0) {
	        // 'property: value' delimiter
	        // which could be in a conditional group query

	        this.print_string(':');
	        if (!insidePropertyValue) {
	          insidePropertyValue = true;
	          this._output.space_before_token = true;
	          this.eatWhitespace(true);
	          this.indent();
	        }
	      } else {
	        // sass/less parent reference don't use a space
	        // sass nested pseudo-class don't use a space

	        // preserve space before pseudoclasses/pseudoelements, as it means "in any child"
	        if (this._input.lookBack(" ")) {
	          this._output.space_before_token = true;
	        }
	        if (this._input.peek() === ":") {
	          // pseudo-element
	          this._ch = this._input.next();
	          this.print_string("::");
	        } else {
	          // pseudo-class
	          this.print_string(':');
	        }
	      }
	    } else if (this._ch === '"' || this._ch === '\'') {
	      var preserveQuoteSpace = previous_ch === '"' || previous_ch === '\'';
	      this.preserveSingleSpace(preserveQuoteSpace || isAfterSpace);
	      this.print_string(this._ch + this.eatString(this._ch));
	      this.eatWhitespace(true);
	    } else if (this._ch === ';') {
	      insideNonSemiColonValues = false;
	      if (parenLevel === 0) {
	        if (insidePropertyValue) {
	          this.outdent();
	          insidePropertyValue = false;
	        }
	        insideNonNestedAtRule = false;
	        this.print_string(this._ch);
	        this.eatWhitespace(true);

	        // This maintains single line comments on the same
	        // line. Block comments are also affected, but
	        // a new line is always output before one inside
	        // that section
	        if (this._input.peek() !== '/') {
	          this._output.add_new_line();
	        }
	      } else {
	        this.print_string(this._ch);
	        this.eatWhitespace(true);
	        this._output.space_before_token = true;
	      }
	    } else if (this._ch === '(') { // may be a url
	      if (this._input.lookBack("url")) {
	        this.print_string(this._ch);
	        this.eatWhitespace();
	        parenLevel++;
	        this.indent();
	        this._ch = this._input.next();
	        if (this._ch === ')' || this._ch === '"' || this._ch === '\'') {
	          this._input.back();
	        } else if (this._ch) {
	          this.print_string(this._ch + this.eatString(')'));
	          if (parenLevel) {
	            parenLevel--;
	            this.outdent();
	          }
	        }
	      } else {
	        var space_needed = false;
	        if (this._input.lookBack("with")) {
	          // look back is not an accurate solution, we need tokens to confirm without whitespaces
	          space_needed = true;
	        }
	        this.preserveSingleSpace(isAfterSpace || space_needed);
	        this.print_string(this._ch);

	        // handle scss/sass map
	        if (insidePropertyValue && previous_ch === "$" && this._options.selector_separator_newline) {
	          this._output.add_new_line();
	          insideScssMap = true;
	        } else {
	          this.eatWhitespace();
	          parenLevel++;
	          this.indent();
	        }
	      }
	    } else if (this._ch === ')') {
	      if (parenLevel) {
	        parenLevel--;
	        this.outdent();
	      }
	      if (insideScssMap && this._input.peek() === ";" && this._options.selector_separator_newline) {
	        insideScssMap = false;
	        this.outdent();
	        this._output.add_new_line();
	      }
	      this.print_string(this._ch);
	    } else if (this._ch === ',') {
	      this.print_string(this._ch);
	      this.eatWhitespace(true);
	      if (this._options.selector_separator_newline && (!insidePropertyValue || insideScssMap) && parenLevel === 0 && !insideNonNestedAtRule) {
	        this._output.add_new_line();
	      } else {
	        this._output.space_before_token = true;
	      }
	    } else if ((this._ch === '>' || this._ch === '+' || this._ch === '~') && !insidePropertyValue && parenLevel === 0) {
	      //handle combinator spacing
	      if (this._options.space_around_combinator) {
	        this._output.space_before_token = true;
	        this.print_string(this._ch);
	        this._output.space_before_token = true;
	      } else {
	        this.print_string(this._ch);
	        this.eatWhitespace();
	        // squash extra whitespace
	        if (this._ch && whitespaceChar.test(this._ch)) {
	          this._ch = '';
	        }
	      }
	    } else if (this._ch === ']') {
	      this.print_string(this._ch);
	    } else if (this._ch === '[') {
	      this.preserveSingleSpace(isAfterSpace);
	      this.print_string(this._ch);
	    } else if (this._ch === '=') { // no whitespace before or after
	      this.eatWhitespace();
	      this.print_string('=');
	      if (whitespaceChar.test(this._ch)) {
	        this._ch = '';
	      }
	    } else if (this._ch === '!' && !this._input.lookBack("\\")) { // !important
	      this._output.space_before_token = true;
	      this.print_string(this._ch);
	    } else {
	      var preserveAfterSpace = previous_ch === '"' || previous_ch === '\'';
	      this.preserveSingleSpace(preserveAfterSpace || isAfterSpace);
	      this.print_string(this._ch);

	      if (!this._output.just_added_newline() && this._input.peek() === '\n' && insideNonSemiColonValues) {
	        this._output.add_new_line();
	      }
	    }
	  }

	  var sweetCode = this._output.get_code(eol);

	  return sweetCode;
	};

	beautifier$1.Beautifier = Beautifier;
	return beautifier$1;
}

/*jshint node:true */

var hasRequiredCss;

function requireCss () {
	if (hasRequiredCss) return css.exports;
	hasRequiredCss = 1;

	var Beautifier = requireBeautifier$1().Beautifier,
	  Options = requireOptions$1().Options;

	function css_beautify(source_text, options) {
	  var beautifier = new Beautifier(source_text, options);
	  return beautifier.beautify();
	}

	css.exports = css_beautify;
	css.exports.defaultOptions = function() {
	  return new Options();
	};
	return css.exports;
}

var html = {exports: {}};

var beautifier = {};

var options = {};

/*jshint node:true */

var hasRequiredOptions;

function requireOptions () {
	if (hasRequiredOptions) return options;
	hasRequiredOptions = 1;

	var BaseOptions = requireOptions$3().Options;

	function Options(options) {
	  BaseOptions.call(this, options, 'html');
	  if (this.templating.length === 1 && this.templating[0] === 'auto') {
	    this.templating = ['django', 'erb', 'handlebars', 'php'];
	  }

	  this.indent_inner_html = this._get_boolean('indent_inner_html');
	  this.indent_body_inner_html = this._get_boolean('indent_body_inner_html', true);
	  this.indent_head_inner_html = this._get_boolean('indent_head_inner_html', true);

	  this.indent_handlebars = this._get_boolean('indent_handlebars', true);
	  this.wrap_attributes = this._get_selection('wrap_attributes',
	    ['auto', 'force', 'force-aligned', 'force-expand-multiline', 'aligned-multiple', 'preserve', 'preserve-aligned']);
	  this.wrap_attributes_min_attrs = this._get_number('wrap_attributes_min_attrs', 2);
	  this.wrap_attributes_indent_size = this._get_number('wrap_attributes_indent_size', this.indent_size);
	  this.extra_liners = this._get_array('extra_liners', ['head', 'body', '/html']);

	  // Block vs inline elements
	  // https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements
	  // https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements
	  // https://www.w3.org/TR/html5/dom.html#phrasing-content
	  this.inline = this._get_array('inline', [
	    'a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite',
	    'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img',
	    'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript',
	    'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', /* 'script', */ 'select', 'small',
	    'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var',
	    'video', 'wbr', 'text',
	    // obsolete inline tags
	    'acronym', 'big', 'strike', 'tt'
	  ]);
	  this.inline_custom_elements = this._get_boolean('inline_custom_elements', true);
	  this.void_elements = this._get_array('void_elements', [
	    // HTLM void elements - aka self-closing tags - aka singletons
	    // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
	    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen',
	    'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr',
	    // NOTE: Optional tags are too complex for a simple list
	    // they are hard coded in _do_optional_end_element

	    // Doctype and xml elements
	    '!doctype', '?xml',

	    // obsolete tags
	    // basefont: https://www.computerhope.com/jargon/h/html-basefont-tag.htm
	    // isndex: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/isindex
	    'basefont', 'isindex'
	  ]);
	  this.unformatted = this._get_array('unformatted', []);
	  this.content_unformatted = this._get_array('content_unformatted', [
	    'pre', 'textarea'
	  ]);
	  this.unformatted_content_delimiter = this._get_characters('unformatted_content_delimiter');
	  this.indent_scripts = this._get_selection('indent_scripts', ['normal', 'keep', 'separate']);

	}
	Options.prototype = new BaseOptions();



	options.Options = Options;
	return options;
}

var tokenizer = {};

/*jshint node:true */

var hasRequiredTokenizer;

function requireTokenizer () {
	if (hasRequiredTokenizer) return tokenizer;
	hasRequiredTokenizer = 1;

	var BaseTokenizer = requireTokenizer$2().Tokenizer;
	var BASETOKEN = requireTokenizer$2().TOKEN;
	var Directives = requireDirectives().Directives;
	var TemplatablePattern = requireTemplatablepattern().TemplatablePattern;
	var Pattern = requirePattern().Pattern;

	var TOKEN = {
	  TAG_OPEN: 'TK_TAG_OPEN',
	  TAG_CLOSE: 'TK_TAG_CLOSE',
	  ATTRIBUTE: 'TK_ATTRIBUTE',
	  EQUALS: 'TK_EQUALS',
	  VALUE: 'TK_VALUE',
	  COMMENT: 'TK_COMMENT',
	  TEXT: 'TK_TEXT',
	  UNKNOWN: 'TK_UNKNOWN',
	  START: BASETOKEN.START,
	  RAW: BASETOKEN.RAW,
	  EOF: BASETOKEN.EOF
	};

	var directives_core = new Directives(/<\!--/, /-->/);

	var Tokenizer = function(input_string, options) {
	  BaseTokenizer.call(this, input_string, options);
	  this._current_tag_name = '';

	  // Words end at whitespace or when a tag starts
	  // if we are indenting handlebars, they are considered tags
	  var templatable_reader = new TemplatablePattern(this._input).read_options(this._options);
	  var pattern_reader = new Pattern(this._input);

	  this.__patterns = {
	    word: templatable_reader.until(/[\n\r\t <]/),
	    single_quote: templatable_reader.until_after(/'/),
	    double_quote: templatable_reader.until_after(/"/),
	    attribute: templatable_reader.until(/[\n\r\t =>]|\/>/),
	    element_name: templatable_reader.until(/[\n\r\t >\/]/),

	    handlebars_comment: pattern_reader.starting_with(/{{!--/).until_after(/--}}/),
	    handlebars: pattern_reader.starting_with(/{{/).until_after(/}}/),
	    handlebars_open: pattern_reader.until(/[\n\r\t }]/),
	    handlebars_raw_close: pattern_reader.until(/}}/),
	    comment: pattern_reader.starting_with(/<!--/).until_after(/-->/),
	    cdata: pattern_reader.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
	    // https://en.wikipedia.org/wiki/Conditional_comment
	    conditional_comment: pattern_reader.starting_with(/<!\[/).until_after(/]>/),
	    processing: pattern_reader.starting_with(/<\?/).until_after(/\?>/)
	  };

	  if (this._options.indent_handlebars) {
	    this.__patterns.word = this.__patterns.word.exclude('handlebars');
	  }

	  this._unformatted_content_delimiter = null;

	  if (this._options.unformatted_content_delimiter) {
	    var literal_regexp = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);
	    this.__patterns.unformatted_content_delimiter =
	      pattern_reader.matching(literal_regexp)
	      .until_after(literal_regexp);
	  }
	};
	Tokenizer.prototype = new BaseTokenizer();

	Tokenizer.prototype._is_comment = function(current_token) { // jshint unused:false
	  return false; //current_token.type === TOKEN.COMMENT || current_token.type === TOKEN.UNKNOWN;
	};

	Tokenizer.prototype._is_opening = function(current_token) {
	  return current_token.type === TOKEN.TAG_OPEN;
	};

	Tokenizer.prototype._is_closing = function(current_token, open_token) {
	  return current_token.type === TOKEN.TAG_CLOSE &&
	    (open_token && (
	      ((current_token.text === '>' || current_token.text === '/>') && open_token.text[0] === '<') ||
	      (current_token.text === '}}' && open_token.text[0] === '{' && open_token.text[1] === '{')));
	};

	Tokenizer.prototype._reset = function() {
	  this._current_tag_name = '';
	};

	Tokenizer.prototype._get_next_token = function(previous_token, open_token) { // jshint unused:false
	  var token = null;
	  this._readWhitespace();
	  var c = this._input.peek();

	  if (c === null) {
	    return this._create_token(TOKEN.EOF, '');
	  }

	  token = token || this._read_open_handlebars(c, open_token);
	  token = token || this._read_attribute(c, previous_token, open_token);
	  token = token || this._read_close(c, open_token);
	  token = token || this._read_raw_content(c, previous_token, open_token);
	  token = token || this._read_content_word(c);
	  token = token || this._read_comment_or_cdata(c);
	  token = token || this._read_processing(c);
	  token = token || this._read_open(c, open_token);
	  token = token || this._create_token(TOKEN.UNKNOWN, this._input.next());

	  return token;
	};

	Tokenizer.prototype._read_comment_or_cdata = function(c) { // jshint unused:false
	  var token = null;
	  var resulting_string = null;
	  var directives = null;

	  if (c === '<') {
	    var peek1 = this._input.peek(1);
	    // We treat all comments as literals, even more than preformatted tags
	    // we only look for the appropriate closing marker
	    if (peek1 === '!') {
	      resulting_string = this.__patterns.comment.read();

	      // only process directive on html comments
	      if (resulting_string) {
	        directives = directives_core.get_directives(resulting_string);
	        if (directives && directives.ignore === 'start') {
	          resulting_string += directives_core.readIgnored(this._input);
	        }
	      } else {
	        resulting_string = this.__patterns.cdata.read();
	      }
	    }

	    if (resulting_string) {
	      token = this._create_token(TOKEN.COMMENT, resulting_string);
	      token.directives = directives;
	    }
	  }

	  return token;
	};

	Tokenizer.prototype._read_processing = function(c) { // jshint unused:false
	  var token = null;
	  var resulting_string = null;
	  var directives = null;

	  if (c === '<') {
	    var peek1 = this._input.peek(1);
	    if (peek1 === '!' || peek1 === '?') {
	      resulting_string = this.__patterns.conditional_comment.read();
	      resulting_string = resulting_string || this.__patterns.processing.read();
	    }

	    if (resulting_string) {
	      token = this._create_token(TOKEN.COMMENT, resulting_string);
	      token.directives = directives;
	    }
	  }

	  return token;
	};

	Tokenizer.prototype._read_open = function(c, open_token) {
	  var resulting_string = null;
	  var token = null;
	  if (!open_token) {
	    if (c === '<') {

	      resulting_string = this._input.next();
	      if (this._input.peek() === '/') {
	        resulting_string += this._input.next();
	      }
	      resulting_string += this.__patterns.element_name.read();
	      token = this._create_token(TOKEN.TAG_OPEN, resulting_string);
	    }
	  }
	  return token;
	};

	Tokenizer.prototype._read_open_handlebars = function(c, open_token) {
	  var resulting_string = null;
	  var token = null;
	  if (!open_token) {
	    if (this._options.indent_handlebars && c === '{' && this._input.peek(1) === '{') {
	      if (this._input.peek(2) === '!') {
	        resulting_string = this.__patterns.handlebars_comment.read();
	        resulting_string = resulting_string || this.__patterns.handlebars.read();
	        token = this._create_token(TOKEN.COMMENT, resulting_string);
	      } else {
	        resulting_string = this.__patterns.handlebars_open.read();
	        token = this._create_token(TOKEN.TAG_OPEN, resulting_string);
	      }
	    }
	  }
	  return token;
	};


	Tokenizer.prototype._read_close = function(c, open_token) {
	  var resulting_string = null;
	  var token = null;
	  if (open_token) {
	    if (open_token.text[0] === '<' && (c === '>' || (c === '/' && this._input.peek(1) === '>'))) {
	      resulting_string = this._input.next();
	      if (c === '/') { //  for close tag "/>"
	        resulting_string += this._input.next();
	      }
	      token = this._create_token(TOKEN.TAG_CLOSE, resulting_string);
	    } else if (open_token.text[0] === '{' && c === '}' && this._input.peek(1) === '}') {
	      this._input.next();
	      this._input.next();
	      token = this._create_token(TOKEN.TAG_CLOSE, '}}');
	    }
	  }

	  return token;
	};

	Tokenizer.prototype._read_attribute = function(c, previous_token, open_token) {
	  var token = null;
	  var resulting_string = '';
	  if (open_token && open_token.text[0] === '<') {

	    if (c === '=') {
	      token = this._create_token(TOKEN.EQUALS, this._input.next());
	    } else if (c === '"' || c === "'") {
	      var content = this._input.next();
	      if (c === '"') {
	        content += this.__patterns.double_quote.read();
	      } else {
	        content += this.__patterns.single_quote.read();
	      }
	      token = this._create_token(TOKEN.VALUE, content);
	    } else {
	      resulting_string = this.__patterns.attribute.read();

	      if (resulting_string) {
	        if (previous_token.type === TOKEN.EQUALS) {
	          token = this._create_token(TOKEN.VALUE, resulting_string);
	        } else {
	          token = this._create_token(TOKEN.ATTRIBUTE, resulting_string);
	        }
	      }
	    }
	  }
	  return token;
	};

	Tokenizer.prototype._is_content_unformatted = function(tag_name) {
	  // void_elements have no content and so cannot have unformatted content
	  // script and style tags should always be read as unformatted content
	  // finally content_unformatted and unformatted element contents are unformatted
	  return this._options.void_elements.indexOf(tag_name) === -1 &&
	    (this._options.content_unformatted.indexOf(tag_name) !== -1 ||
	      this._options.unformatted.indexOf(tag_name) !== -1);
	};


	Tokenizer.prototype._read_raw_content = function(c, previous_token, open_token) { // jshint unused:false
	  var resulting_string = '';
	  if (open_token && open_token.text[0] === '{') {
	    resulting_string = this.__patterns.handlebars_raw_close.read();
	  } else if (previous_token.type === TOKEN.TAG_CLOSE &&
	    previous_token.opened.text[0] === '<' && previous_token.text[0] !== '/') {
	    // ^^ empty tag has no content 
	    var tag_name = previous_token.opened.text.substr(1).toLowerCase();
	    if (tag_name === 'script' || tag_name === 'style') {
	      // Script and style tags are allowed to have comments wrapping their content
	      // or just have regular content.
	      var token = this._read_comment_or_cdata(c);
	      if (token) {
	        token.type = TOKEN.TEXT;
	        return token;
	      }
	      resulting_string = this._input.readUntil(new RegExp('</' + tag_name + '[\\n\\r\\t ]*?>', 'ig'));
	    } else if (this._is_content_unformatted(tag_name)) {

	      resulting_string = this._input.readUntil(new RegExp('</' + tag_name + '[\\n\\r\\t ]*?>', 'ig'));
	    }
	  }

	  if (resulting_string) {
	    return this._create_token(TOKEN.TEXT, resulting_string);
	  }

	  return null;
	};

	Tokenizer.prototype._read_content_word = function(c) {
	  var resulting_string = '';
	  if (this._options.unformatted_content_delimiter) {
	    if (c === this._options.unformatted_content_delimiter[0]) {
	      resulting_string = this.__patterns.unformatted_content_delimiter.read();
	    }
	  }

	  if (!resulting_string) {
	    resulting_string = this.__patterns.word.read();
	  }
	  if (resulting_string) {
	    return this._create_token(TOKEN.TEXT, resulting_string);
	  }
	};

	tokenizer.Tokenizer = Tokenizer;
	tokenizer.TOKEN = TOKEN;
	return tokenizer;
}

/*jshint node:true */

var hasRequiredBeautifier;

function requireBeautifier () {
	if (hasRequiredBeautifier) return beautifier;
	hasRequiredBeautifier = 1;

	var Options = requireOptions().Options;
	var Output = requireOutput().Output;
	var Tokenizer = requireTokenizer().Tokenizer;
	var TOKEN = requireTokenizer().TOKEN;

	var lineBreak = /\r\n|[\r\n]/;
	var allLineBreaks = /\r\n|[\r\n]/g;

	var Printer = function(options, base_indent_string) { //handles input/output and some other printing functions

	  this.indent_level = 0;
	  this.alignment_size = 0;
	  this.max_preserve_newlines = options.max_preserve_newlines;
	  this.preserve_newlines = options.preserve_newlines;

	  this._output = new Output(options, base_indent_string);

	};

	Printer.prototype.current_line_has_match = function(pattern) {
	  return this._output.current_line.has_match(pattern);
	};

	Printer.prototype.set_space_before_token = function(value, non_breaking) {
	  this._output.space_before_token = value;
	  this._output.non_breaking_space = non_breaking;
	};

	Printer.prototype.set_wrap_point = function() {
	  this._output.set_indent(this.indent_level, this.alignment_size);
	  this._output.set_wrap_point();
	};


	Printer.prototype.add_raw_token = function(token) {
	  this._output.add_raw_token(token);
	};

	Printer.prototype.print_preserved_newlines = function(raw_token) {
	  var newlines = 0;
	  if (raw_token.type !== TOKEN.TEXT && raw_token.previous.type !== TOKEN.TEXT) {
	    newlines = raw_token.newlines ? 1 : 0;
	  }

	  if (this.preserve_newlines) {
	    newlines = raw_token.newlines < this.max_preserve_newlines + 1 ? raw_token.newlines : this.max_preserve_newlines + 1;
	  }
	  for (var n = 0; n < newlines; n++) {
	    this.print_newline(n > 0);
	  }

	  return newlines !== 0;
	};

	Printer.prototype.traverse_whitespace = function(raw_token) {
	  if (raw_token.whitespace_before || raw_token.newlines) {
	    if (!this.print_preserved_newlines(raw_token)) {
	      this._output.space_before_token = true;
	    }
	    return true;
	  }
	  return false;
	};

	Printer.prototype.previous_token_wrapped = function() {
	  return this._output.previous_token_wrapped;
	};

	Printer.prototype.print_newline = function(force) {
	  this._output.add_new_line(force);
	};

	Printer.prototype.print_token = function(token) {
	  if (token.text) {
	    this._output.set_indent(this.indent_level, this.alignment_size);
	    this._output.add_token(token.text);
	  }
	};

	Printer.prototype.indent = function() {
	  this.indent_level++;
	};

	Printer.prototype.get_full_indent = function(level) {
	  level = this.indent_level + (level || 0);
	  if (level < 1) {
	    return '';
	  }

	  return this._output.get_indent_string(level);
	};

	var get_type_attribute = function(start_token) {
	  var result = null;
	  var raw_token = start_token.next;

	  // Search attributes for a type attribute
	  while (raw_token.type !== TOKEN.EOF && start_token.closed !== raw_token) {
	    if (raw_token.type === TOKEN.ATTRIBUTE && raw_token.text === 'type') {
	      if (raw_token.next && raw_token.next.type === TOKEN.EQUALS &&
	        raw_token.next.next && raw_token.next.next.type === TOKEN.VALUE) {
	        result = raw_token.next.next.text;
	      }
	      break;
	    }
	    raw_token = raw_token.next;
	  }

	  return result;
	};

	var get_custom_beautifier_name = function(tag_check, raw_token) {
	  var typeAttribute = null;
	  var result = null;

	  if (!raw_token.closed) {
	    return null;
	  }

	  if (tag_check === 'script') {
	    typeAttribute = 'text/javascript';
	  } else if (tag_check === 'style') {
	    typeAttribute = 'text/css';
	  }

	  typeAttribute = get_type_attribute(raw_token) || typeAttribute;

	  // For script and style tags that have a type attribute, only enable custom beautifiers for matching values
	  // For those without a type attribute use default;
	  if (typeAttribute.search('text/css') > -1) {
	    result = 'css';
	  } else if (typeAttribute.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/) > -1) {
	    result = 'javascript';
	  } else if (typeAttribute.search(/(text|application|dojo)\/(x-)?(html)/) > -1) {
	    result = 'html';
	  } else if (typeAttribute.search(/test\/null/) > -1) {
	    // Test only mime-type for testing the beautifier when null is passed as beautifing function
	    result = 'null';
	  }

	  return result;
	};

	function in_array(what, arr) {
	  return arr.indexOf(what) !== -1;
	}

	function TagFrame(parent, parser_token, indent_level) {
	  this.parent = parent || null;
	  this.tag = parser_token ? parser_token.tag_name : '';
	  this.indent_level = indent_level || 0;
	  this.parser_token = parser_token || null;
	}

	function TagStack(printer) {
	  this._printer = printer;
	  this._current_frame = null;
	}

	TagStack.prototype.get_parser_token = function() {
	  return this._current_frame ? this._current_frame.parser_token : null;
	};

	TagStack.prototype.record_tag = function(parser_token) { //function to record a tag and its parent in this.tags Object
	  var new_frame = new TagFrame(this._current_frame, parser_token, this._printer.indent_level);
	  this._current_frame = new_frame;
	};

	TagStack.prototype._try_pop_frame = function(frame) { //function to retrieve the opening tag to the corresponding closer
	  var parser_token = null;

	  if (frame) {
	    parser_token = frame.parser_token;
	    this._printer.indent_level = frame.indent_level;
	    this._current_frame = frame.parent;
	  }

	  return parser_token;
	};

	TagStack.prototype._get_frame = function(tag_list, stop_list) { //function to retrieve the opening tag to the corresponding closer
	  var frame = this._current_frame;

	  while (frame) { //till we reach '' (the initial value);
	    if (tag_list.indexOf(frame.tag) !== -1) { //if this is it use it
	      break;
	    } else if (stop_list && stop_list.indexOf(frame.tag) !== -1) {
	      frame = null;
	      break;
	    }
	    frame = frame.parent;
	  }

	  return frame;
	};

	TagStack.prototype.try_pop = function(tag, stop_list) { //function to retrieve the opening tag to the corresponding closer
	  var frame = this._get_frame([tag], stop_list);
	  return this._try_pop_frame(frame);
	};

	TagStack.prototype.indent_to_tag = function(tag_list) {
	  var frame = this._get_frame(tag_list);
	  if (frame) {
	    this._printer.indent_level = frame.indent_level;
	  }
	};

	function Beautifier(source_text, options, js_beautify, css_beautify) {
	  //Wrapper function to invoke all the necessary constructors and deal with the output.
	  this._source_text = source_text || '';
	  options = options || {};
	  this._js_beautify = js_beautify;
	  this._css_beautify = css_beautify;
	  this._tag_stack = null;

	  // Allow the setting of language/file-type specific options
	  // with inheritance of overall settings
	  var optionHtml = new Options(options, 'html');

	  this._options = optionHtml;

	  this._is_wrap_attributes_force = this._options.wrap_attributes.substr(0, 'force'.length) === 'force';
	  this._is_wrap_attributes_force_expand_multiline = (this._options.wrap_attributes === 'force-expand-multiline');
	  this._is_wrap_attributes_force_aligned = (this._options.wrap_attributes === 'force-aligned');
	  this._is_wrap_attributes_aligned_multiple = (this._options.wrap_attributes === 'aligned-multiple');
	  this._is_wrap_attributes_preserve = this._options.wrap_attributes.substr(0, 'preserve'.length) === 'preserve';
	  this._is_wrap_attributes_preserve_aligned = (this._options.wrap_attributes === 'preserve-aligned');
	}

	Beautifier.prototype.beautify = function() {

	  // if disabled, return the input unchanged.
	  if (this._options.disabled) {
	    return this._source_text;
	  }

	  var source_text = this._source_text;
	  var eol = this._options.eol;
	  if (this._options.eol === 'auto') {
	    eol = '\n';
	    if (source_text && lineBreak.test(source_text)) {
	      eol = source_text.match(lineBreak)[0];
	    }
	  }

	  // HACK: newline parsing inconsistent. This brute force normalizes the input.
	  source_text = source_text.replace(allLineBreaks, '\n');

	  var baseIndentString = source_text.match(/^[\t ]*/)[0];

	  var last_token = {
	    text: '',
	    type: ''
	  };

	  var last_tag_token = new TagOpenParserToken();

	  var printer = new Printer(this._options, baseIndentString);
	  var tokens = new Tokenizer(source_text, this._options).tokenize();

	  this._tag_stack = new TagStack(printer);

	  var parser_token = null;
	  var raw_token = tokens.next();
	  while (raw_token.type !== TOKEN.EOF) {

	    if (raw_token.type === TOKEN.TAG_OPEN || raw_token.type === TOKEN.COMMENT) {
	      parser_token = this._handle_tag_open(printer, raw_token, last_tag_token, last_token, tokens);
	      last_tag_token = parser_token;
	    } else if ((raw_token.type === TOKEN.ATTRIBUTE || raw_token.type === TOKEN.EQUALS || raw_token.type === TOKEN.VALUE) ||
	      (raw_token.type === TOKEN.TEXT && !last_tag_token.tag_complete)) {
	      parser_token = this._handle_inside_tag(printer, raw_token, last_tag_token, last_token);
	    } else if (raw_token.type === TOKEN.TAG_CLOSE) {
	      parser_token = this._handle_tag_close(printer, raw_token, last_tag_token);
	    } else if (raw_token.type === TOKEN.TEXT) {
	      parser_token = this._handle_text(printer, raw_token, last_tag_token);
	    } else {
	      // This should never happen, but if it does. Print the raw token
	      printer.add_raw_token(raw_token);
	    }

	    last_token = parser_token;

	    raw_token = tokens.next();
	  }
	  var sweet_code = printer._output.get_code(eol);

	  return sweet_code;
	};

	Beautifier.prototype._handle_tag_close = function(printer, raw_token, last_tag_token) {
	  var parser_token = {
	    text: raw_token.text,
	    type: raw_token.type
	  };
	  printer.alignment_size = 0;
	  last_tag_token.tag_complete = true;

	  printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== '', true);
	  if (last_tag_token.is_unformatted) {
	    printer.add_raw_token(raw_token);
	  } else {
	    if (last_tag_token.tag_start_char === '<') {
	      printer.set_space_before_token(raw_token.text[0] === '/', true); // space before />, no space before >
	      if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.has_wrapped_attrs) {
	        printer.print_newline(false);
	      }
	    }
	    printer.print_token(raw_token);

	  }

	  if (last_tag_token.indent_content &&
	    !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
	    printer.indent();

	    // only indent once per opened tag
	    last_tag_token.indent_content = false;
	  }

	  if (!last_tag_token.is_inline_element &&
	    !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
	    printer.set_wrap_point();
	  }

	  return parser_token;
	};

	Beautifier.prototype._handle_inside_tag = function(printer, raw_token, last_tag_token, last_token) {
	  var wrapped = last_tag_token.has_wrapped_attrs;
	  var parser_token = {
	    text: raw_token.text,
	    type: raw_token.type
	  };

	  printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== '', true);
	  if (last_tag_token.is_unformatted) {
	    printer.add_raw_token(raw_token);
	  } else if (last_tag_token.tag_start_char === '{' && raw_token.type === TOKEN.TEXT) {
	    // For the insides of handlebars allow newlines or a single space between open and contents
	    if (printer.print_preserved_newlines(raw_token)) {
	      raw_token.newlines = 0;
	      printer.add_raw_token(raw_token);
	    } else {
	      printer.print_token(raw_token);
	    }
	  } else {
	    if (raw_token.type === TOKEN.ATTRIBUTE) {
	      printer.set_space_before_token(true);
	    } else if (raw_token.type === TOKEN.EQUALS) { //no space before =
	      printer.set_space_before_token(false);
	    } else if (raw_token.type === TOKEN.VALUE && raw_token.previous.type === TOKEN.EQUALS) { //no space before value
	      printer.set_space_before_token(false);
	    }

	    if (raw_token.type === TOKEN.ATTRIBUTE && last_tag_token.tag_start_char === '<') {
	      if (this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) {
	        printer.traverse_whitespace(raw_token);
	        wrapped = wrapped || raw_token.newlines !== 0;
	      }

	      // Wrap for 'force' options, and if the number of attributes is at least that specified in 'wrap_attributes_min_attrs':
	      // 1. always wrap the second and beyond attributes
	      // 2. wrap the first attribute only if 'force-expand-multiline' is specified
	      if (this._is_wrap_attributes_force &&
	        last_tag_token.attr_count >= this._options.wrap_attributes_min_attrs &&
	        (last_token.type !== TOKEN.TAG_OPEN || // ie. second attribute and beyond
	          this._is_wrap_attributes_force_expand_multiline)) {
	        printer.print_newline(false);
	        wrapped = true;
	      }
	    }
	    printer.print_token(raw_token);
	    wrapped = wrapped || printer.previous_token_wrapped();
	    last_tag_token.has_wrapped_attrs = wrapped;
	  }
	  return parser_token;
	};

	Beautifier.prototype._handle_text = function(printer, raw_token, last_tag_token) {
	  var parser_token = {
	    text: raw_token.text,
	    type: 'TK_CONTENT'
	  };
	  if (last_tag_token.custom_beautifier_name) { //check if we need to format javascript
	    this._print_custom_beatifier_text(printer, raw_token, last_tag_token);
	  } else if (last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) {
	    printer.add_raw_token(raw_token);
	  } else {
	    printer.traverse_whitespace(raw_token);
	    printer.print_token(raw_token);
	  }
	  return parser_token;
	};

	Beautifier.prototype._print_custom_beatifier_text = function(printer, raw_token, last_tag_token) {
	  var local = this;
	  if (raw_token.text !== '') {

	    var text = raw_token.text,
	      _beautifier,
	      script_indent_level = 1,
	      pre = '',
	      post = '';
	    if (last_tag_token.custom_beautifier_name === 'javascript' && typeof this._js_beautify === 'function') {
	      _beautifier = this._js_beautify;
	    } else if (last_tag_token.custom_beautifier_name === 'css' && typeof this._css_beautify === 'function') {
	      _beautifier = this._css_beautify;
	    } else if (last_tag_token.custom_beautifier_name === 'html') {
	      _beautifier = function(html_source, options) {
	        var beautifier = new Beautifier(html_source, options, local._js_beautify, local._css_beautify);
	        return beautifier.beautify();
	      };
	    }

	    if (this._options.indent_scripts === "keep") {
	      script_indent_level = 0;
	    } else if (this._options.indent_scripts === "separate") {
	      script_indent_level = -printer.indent_level;
	    }

	    var indentation = printer.get_full_indent(script_indent_level);

	    // if there is at least one empty line at the end of this text, strip it
	    // we'll be adding one back after the text but before the containing tag.
	    text = text.replace(/\n[ \t]*$/, '');

	    // Handle the case where content is wrapped in a comment or cdata.
	    if (last_tag_token.custom_beautifier_name !== 'html' &&
	      text[0] === '<' && text.match(/^(<!--|<!\[CDATA\[)/)) {
	      var matched = /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(text);

	      // if we start to wrap but don't finish, print raw
	      if (!matched) {
	        printer.add_raw_token(raw_token);
	        return;
	      }

	      pre = indentation + matched[1] + '\n';
	      text = matched[4];
	      if (matched[5]) {
	        post = indentation + matched[5];
	      }

	      // if there is at least one empty line at the end of this text, strip it
	      // we'll be adding one back after the text but before the containing tag.
	      text = text.replace(/\n[ \t]*$/, '');

	      if (matched[2] || matched[3].indexOf('\n') !== -1) {
	        // if the first line of the non-comment text has spaces
	        // use that as the basis for indenting in null case.
	        matched = matched[3].match(/[ \t]+$/);
	        if (matched) {
	          raw_token.whitespace_before = matched[0];
	        }
	      }
	    }

	    if (text) {
	      if (_beautifier) {

	        // call the Beautifier if avaliable
	        var Child_options = function() {
	          this.eol = '\n';
	        };
	        Child_options.prototype = this._options.raw_options;
	        var child_options = new Child_options();
	        text = _beautifier(indentation + text, child_options);
	      } else {
	        // simply indent the string otherwise
	        var white = raw_token.whitespace_before;
	        if (white) {
	          text = text.replace(new RegExp('\n(' + white + ')?', 'g'), '\n');
	        }

	        text = indentation + text.replace(/\n/g, '\n' + indentation);
	      }
	    }

	    if (pre) {
	      if (!text) {
	        text = pre + post;
	      } else {
	        text = pre + text + '\n' + post;
	      }
	    }

	    printer.print_newline(false);
	    if (text) {
	      raw_token.text = text;
	      raw_token.whitespace_before = '';
	      raw_token.newlines = 0;
	      printer.add_raw_token(raw_token);
	      printer.print_newline(true);
	    }
	  }
	};

	Beautifier.prototype._handle_tag_open = function(printer, raw_token, last_tag_token, last_token, tokens) {
	  var parser_token = this._get_tag_open_token(raw_token);

	  if ((last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) &&
	    !last_tag_token.is_empty_element &&
	    raw_token.type === TOKEN.TAG_OPEN && !parser_token.is_start_tag) {
	    // End element tags for unformatted or content_unformatted elements
	    // are printed raw to keep any newlines inside them exactly the same.
	    printer.add_raw_token(raw_token);
	    parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name);
	  } else {
	    printer.traverse_whitespace(raw_token);
	    this._set_tag_position(printer, raw_token, parser_token, last_tag_token, last_token);
	    if (!parser_token.is_inline_element) {
	      printer.set_wrap_point();
	    }
	    printer.print_token(raw_token);
	  }

	  // count the number of attributes
	  if (parser_token.is_start_tag && this._is_wrap_attributes_force) {
	    var peek_index = 0;
	    var peek_token;
	    do {
	      peek_token = tokens.peek(peek_index);
	      if (peek_token.type === TOKEN.ATTRIBUTE) {
	        parser_token.attr_count += 1;
	      }
	      peek_index += 1;
	    } while (peek_token.type !== TOKEN.EOF && peek_token.type !== TOKEN.TAG_CLOSE);
	  }

	  //indent attributes an auto, forced, aligned or forced-align line-wrap
	  if (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) {
	    parser_token.alignment_size = raw_token.text.length + 1;
	  }

	  if (!parser_token.tag_complete && !parser_token.is_unformatted) {
	    printer.alignment_size = parser_token.alignment_size;
	  }

	  return parser_token;
	};

	var TagOpenParserToken = function(parent, raw_token) {
	  this.parent = parent || null;
	  this.text = '';
	  this.type = 'TK_TAG_OPEN';
	  this.tag_name = '';
	  this.is_inline_element = false;
	  this.is_unformatted = false;
	  this.is_content_unformatted = false;
	  this.is_empty_element = false;
	  this.is_start_tag = false;
	  this.is_end_tag = false;
	  this.indent_content = false;
	  this.multiline_content = false;
	  this.custom_beautifier_name = null;
	  this.start_tag_token = null;
	  this.attr_count = 0;
	  this.has_wrapped_attrs = false;
	  this.alignment_size = 0;
	  this.tag_complete = false;
	  this.tag_start_char = '';
	  this.tag_check = '';

	  if (!raw_token) {
	    this.tag_complete = true;
	  } else {
	    var tag_check_match;

	    this.tag_start_char = raw_token.text[0];
	    this.text = raw_token.text;

	    if (this.tag_start_char === '<') {
	      tag_check_match = raw_token.text.match(/^<([^\s>]*)/);
	      this.tag_check = tag_check_match ? tag_check_match[1] : '';
	    } else {
	      tag_check_match = raw_token.text.match(/^{{~?(?:[\^]|#\*?)?([^\s}]+)/);
	      this.tag_check = tag_check_match ? tag_check_match[1] : '';

	      // handle "{{#> myPartial}}" or "{{~#> myPartial}}"
	      if ((raw_token.text.startsWith('{{#>') || raw_token.text.startsWith('{{~#>')) && this.tag_check[0] === '>') {
	        if (this.tag_check === '>' && raw_token.next !== null) {
	          this.tag_check = raw_token.next.text.split(' ')[0];
	        } else {
	          this.tag_check = raw_token.text.split('>')[1];
	        }
	      }
	    }

	    this.tag_check = this.tag_check.toLowerCase();

	    if (raw_token.type === TOKEN.COMMENT) {
	      this.tag_complete = true;
	    }

	    this.is_start_tag = this.tag_check.charAt(0) !== '/';
	    this.tag_name = !this.is_start_tag ? this.tag_check.substr(1) : this.tag_check;
	    this.is_end_tag = !this.is_start_tag ||
	      (raw_token.closed && raw_token.closed.text === '/>');

	    // if whitespace handler ~ included (i.e. {{~#if true}}), handlebars tags start at pos 3 not pos 2
	    var handlebar_starts = 2;
	    if (this.tag_start_char === '{' && this.text.length >= 3) {
	      if (this.text.charAt(2) === '~') {
	        handlebar_starts = 3;
	      }
	    }

	    // handlebars tags that don't start with # or ^ are single_tags, and so also start and end.
	    this.is_end_tag = this.is_end_tag ||
	      (this.tag_start_char === '{' && (this.text.length < 3 || (/[^#\^]/.test(this.text.charAt(handlebar_starts)))));
	  }
	};

	Beautifier.prototype._get_tag_open_token = function(raw_token) { //function to get a full tag and parse its type
	  var parser_token = new TagOpenParserToken(this._tag_stack.get_parser_token(), raw_token);

	  parser_token.alignment_size = this._options.wrap_attributes_indent_size;

	  parser_token.is_end_tag = parser_token.is_end_tag ||
	    in_array(parser_token.tag_check, this._options.void_elements);

	  parser_token.is_empty_element = parser_token.tag_complete ||
	    (parser_token.is_start_tag && parser_token.is_end_tag);

	  parser_token.is_unformatted = !parser_token.tag_complete && in_array(parser_token.tag_check, this._options.unformatted);
	  parser_token.is_content_unformatted = !parser_token.is_empty_element && in_array(parser_token.tag_check, this._options.content_unformatted);
	  parser_token.is_inline_element = in_array(parser_token.tag_name, this._options.inline) || (this._options.inline_custom_elements && parser_token.tag_name.includes("-")) || parser_token.tag_start_char === '{';

	  return parser_token;
	};

	Beautifier.prototype._set_tag_position = function(printer, raw_token, parser_token, last_tag_token, last_token) {

	  if (!parser_token.is_empty_element) {
	    if (parser_token.is_end_tag) { //this tag is a double tag so check for tag-ending
	      parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name); //remove it and all ancestors
	    } else { // it's a start-tag
	      // check if this tag is starting an element that has optional end element
	      // and do an ending needed
	      if (this._do_optional_end_element(parser_token)) {
	        if (!parser_token.is_inline_element) {
	          printer.print_newline(false);
	        }
	      }

	      this._tag_stack.record_tag(parser_token); //push it on the tag stack

	      if ((parser_token.tag_name === 'script' || parser_token.tag_name === 'style') &&
	        !(parser_token.is_unformatted || parser_token.is_content_unformatted)) {
	        parser_token.custom_beautifier_name = get_custom_beautifier_name(parser_token.tag_check, raw_token);
	      }
	    }
	  }

	  if (in_array(parser_token.tag_check, this._options.extra_liners)) { //check if this double needs an extra line
	    printer.print_newline(false);
	    if (!printer._output.just_added_blankline()) {
	      printer.print_newline(true);
	    }
	  }

	  if (parser_token.is_empty_element) { //if this tag name is a single tag type (either in the list or has a closing /)

	    // if you hit an else case, reset the indent level if you are inside an:
	    // 'if', 'unless', or 'each' block.
	    if (parser_token.tag_start_char === '{' && parser_token.tag_check === 'else') {
	      this._tag_stack.indent_to_tag(['if', 'unless', 'each']);
	      parser_token.indent_content = true;
	      // Don't add a newline if opening {{#if}} tag is on the current line
	      var foundIfOnCurrentLine = printer.current_line_has_match(/{{#if/);
	      if (!foundIfOnCurrentLine) {
	        printer.print_newline(false);
	      }
	    }

	    // Don't add a newline before elements that should remain where they are.
	    if (parser_token.tag_name === '!--' && last_token.type === TOKEN.TAG_CLOSE &&
	      last_tag_token.is_end_tag && parser_token.text.indexOf('\n') === -1) ; else {
	      if (!(parser_token.is_inline_element || parser_token.is_unformatted)) {
	        printer.print_newline(false);
	      }
	      this._calcluate_parent_multiline(printer, parser_token);
	    }
	  } else if (parser_token.is_end_tag) { //this tag is a double tag so check for tag-ending
	    var do_end_expand = false;

	    // deciding whether a block is multiline should not be this hard
	    do_end_expand = parser_token.start_tag_token && parser_token.start_tag_token.multiline_content;
	    do_end_expand = do_end_expand || (!parser_token.is_inline_element &&
	      !(last_tag_token.is_inline_element || last_tag_token.is_unformatted) &&
	      !(last_token.type === TOKEN.TAG_CLOSE && parser_token.start_tag_token === last_tag_token) &&
	      last_token.type !== 'TK_CONTENT'
	    );

	    if (parser_token.is_content_unformatted || parser_token.is_unformatted) {
	      do_end_expand = false;
	    }

	    if (do_end_expand) {
	      printer.print_newline(false);
	    }
	  } else { // it's a start-tag
	    parser_token.indent_content = !parser_token.custom_beautifier_name;

	    if (parser_token.tag_start_char === '<') {
	      if (parser_token.tag_name === 'html') {
	        parser_token.indent_content = this._options.indent_inner_html;
	      } else if (parser_token.tag_name === 'head') {
	        parser_token.indent_content = this._options.indent_head_inner_html;
	      } else if (parser_token.tag_name === 'body') {
	        parser_token.indent_content = this._options.indent_body_inner_html;
	      }
	    }

	    if (!(parser_token.is_inline_element || parser_token.is_unformatted) &&
	      (last_token.type !== 'TK_CONTENT' || parser_token.is_content_unformatted)) {
	      printer.print_newline(false);
	    }

	    this._calcluate_parent_multiline(printer, parser_token);
	  }
	};

	Beautifier.prototype._calcluate_parent_multiline = function(printer, parser_token) {
	  if (parser_token.parent && printer._output.just_added_newline() &&
	    !((parser_token.is_inline_element || parser_token.is_unformatted) && parser_token.parent.is_inline_element)) {
	    parser_token.parent.multiline_content = true;
	  }
	};

	//To be used for <p> tag special case:
	var p_closers = ['address', 'article', 'aside', 'blockquote', 'details', 'div', 'dl', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'main', 'menu', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul'];
	var p_parent_excludes = ['a', 'audio', 'del', 'ins', 'map', 'noscript', 'video'];

	Beautifier.prototype._do_optional_end_element = function(parser_token) {
	  var result = null;
	  // NOTE: cases of "if there is no more content in the parent element"
	  // are handled automatically by the beautifier.
	  // It assumes parent or ancestor close tag closes all children.
	  // https://www.w3.org/TR/html5/syntax.html#optional-tags
	  if (parser_token.is_empty_element || !parser_token.is_start_tag || !parser_token.parent) {
	    return;

	  }

	  if (parser_token.tag_name === 'body') {
	    // A head element’s end tag may be omitted if the head element is not immediately followed by a space character or a comment.
	    result = result || this._tag_stack.try_pop('head');

	    //} else if (parser_token.tag_name === 'body') {
	    // DONE: A body element’s end tag may be omitted if the body element is not immediately followed by a comment.

	  } else if (parser_token.tag_name === 'li') {
	    // An li element’s end tag may be omitted if the li element is immediately followed by another li element or if there is no more content in the parent element.
	    result = result || this._tag_stack.try_pop('li', ['ol', 'ul', 'menu']);

	  } else if (parser_token.tag_name === 'dd' || parser_token.tag_name === 'dt') {
	    // A dd element’s end tag may be omitted if the dd element is immediately followed by another dd element or a dt element, or if there is no more content in the parent element.
	    // A dt element’s end tag may be omitted if the dt element is immediately followed by another dt element or a dd element.
	    result = result || this._tag_stack.try_pop('dt', ['dl']);
	    result = result || this._tag_stack.try_pop('dd', ['dl']);


	  } else if (parser_token.parent.tag_name === 'p' && p_closers.indexOf(parser_token.tag_name) !== -1) {
	    // IMPORTANT: this else-if works because p_closers has no overlap with any other element we look for in this method
	    // check for the parent element is an HTML element that is not an <a>, <audio>, <del>, <ins>, <map>, <noscript>, or <video> element,  or an autonomous custom element.
	    // To do this right, this needs to be coded as an inclusion of the inverse of the exclusion above.
	    // But to start with (if we ignore "autonomous custom elements") the exclusion would be fine.
	    var p_parent = parser_token.parent.parent;
	    if (!p_parent || p_parent_excludes.indexOf(p_parent.tag_name) === -1) {
	      result = result || this._tag_stack.try_pop('p');
	    }
	  } else if (parser_token.tag_name === 'rp' || parser_token.tag_name === 'rt') {
	    // An rt element’s end tag may be omitted if the rt element is immediately followed by an rt or rp element, or if there is no more content in the parent element.
	    // An rp element’s end tag may be omitted if the rp element is immediately followed by an rt or rp element, or if there is no more content in the parent element.
	    result = result || this._tag_stack.try_pop('rt', ['ruby', 'rtc']);
	    result = result || this._tag_stack.try_pop('rp', ['ruby', 'rtc']);

	  } else if (parser_token.tag_name === 'optgroup') {
	    // An optgroup element’s end tag may be omitted if the optgroup element is immediately followed by another optgroup element, or if there is no more content in the parent element.
	    // An option element’s end tag may be omitted if the option element is immediately followed by another option element, or if it is immediately followed by an optgroup element, or if there is no more content in the parent element.
	    result = result || this._tag_stack.try_pop('optgroup', ['select']);
	    //result = result || this._tag_stack.try_pop('option', ['select']);

	  } else if (parser_token.tag_name === 'option') {
	    // An option element’s end tag may be omitted if the option element is immediately followed by another option element, or if it is immediately followed by an optgroup element, or if there is no more content in the parent element.
	    result = result || this._tag_stack.try_pop('option', ['select', 'datalist', 'optgroup']);

	  } else if (parser_token.tag_name === 'colgroup') {
	    // DONE: A colgroup element’s end tag may be omitted if the colgroup element is not immediately followed by a space character or a comment.
	    // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
	    result = result || this._tag_stack.try_pop('caption', ['table']);

	  } else if (parser_token.tag_name === 'thead') {
	    // A colgroup element's end tag may be ommitted if a thead, tfoot, tbody, or tr element is started.
	    // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
	    result = result || this._tag_stack.try_pop('caption', ['table']);
	    result = result || this._tag_stack.try_pop('colgroup', ['table']);

	    //} else if (parser_token.tag_name === 'caption') {
	    // DONE: A caption element’s end tag may be omitted if the caption element is not immediately followed by a space character or a comment.

	  } else if (parser_token.tag_name === 'tbody' || parser_token.tag_name === 'tfoot') {
	    // A thead element’s end tag may be omitted if the thead element is immediately followed by a tbody or tfoot element.
	    // A tbody element’s end tag may be omitted if the tbody element is immediately followed by a tbody or tfoot element, or if there is no more content in the parent element.
	    // A colgroup element's end tag may be ommitted if a thead, tfoot, tbody, or tr element is started.
	    // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
	    result = result || this._tag_stack.try_pop('caption', ['table']);
	    result = result || this._tag_stack.try_pop('colgroup', ['table']);
	    result = result || this._tag_stack.try_pop('thead', ['table']);
	    result = result || this._tag_stack.try_pop('tbody', ['table']);

	    //} else if (parser_token.tag_name === 'tfoot') {
	    // DONE: A tfoot element’s end tag may be omitted if there is no more content in the parent element.

	  } else if (parser_token.tag_name === 'tr') {
	    // A tr element’s end tag may be omitted if the tr element is immediately followed by another tr element, or if there is no more content in the parent element.
	    // A colgroup element's end tag may be ommitted if a thead, tfoot, tbody, or tr element is started.
	    // A caption element's end tag may be ommitted if a colgroup, thead, tfoot, tbody, or tr element is started.
	    result = result || this._tag_stack.try_pop('caption', ['table']);
	    result = result || this._tag_stack.try_pop('colgroup', ['table']);
	    result = result || this._tag_stack.try_pop('tr', ['table', 'thead', 'tbody', 'tfoot']);

	  } else if (parser_token.tag_name === 'th' || parser_token.tag_name === 'td') {
	    // A td element’s end tag may be omitted if the td element is immediately followed by a td or th element, or if there is no more content in the parent element.
	    // A th element’s end tag may be omitted if the th element is immediately followed by a td or th element, or if there is no more content in the parent element.
	    result = result || this._tag_stack.try_pop('td', ['table', 'thead', 'tbody', 'tfoot', 'tr']);
	    result = result || this._tag_stack.try_pop('th', ['table', 'thead', 'tbody', 'tfoot', 'tr']);
	  }

	  // Start element omission not handled currently
	  // A head element’s start tag may be omitted if the element is empty, or if the first thing inside the head element is an element.
	  // A tbody element’s start tag may be omitted if the first thing inside the tbody element is a tr element, and if the element is not immediately preceded by a tbody, thead, or tfoot element whose end tag has been omitted. (It can’t be omitted if the element is empty.)
	  // A colgroup element’s start tag may be omitted if the first thing inside the colgroup element is a col element, and if the element is not immediately preceded by another colgroup element whose end tag has been omitted. (It can’t be omitted if the element is empty.)

	  // Fix up the parent of the parser token
	  parser_token.parent = this._tag_stack.get_parser_token();

	  return result;
	};

	beautifier.Beautifier = Beautifier;
	return beautifier;
}

/*jshint node:true */

var hasRequiredHtml;

function requireHtml () {
	if (hasRequiredHtml) return html.exports;
	hasRequiredHtml = 1;

	var Beautifier = requireBeautifier().Beautifier,
	  Options = requireOptions().Options;

	function style_html(html_source, options, js_beautify, css_beautify) {
	  var beautifier = new Beautifier(html_source, options, js_beautify, css_beautify);
	  return beautifier.beautify();
	}

	html.exports = style_html;
	html.exports.defaultOptions = function() {
	  return new Options();
	};
	return html.exports;
}

/*jshint node:true */

var hasRequiredSrc;

function requireSrc () {
	if (hasRequiredSrc) return src;
	hasRequiredSrc = 1;

	var js_beautify = requireJavascript();
	var css_beautify = requireCss();
	var html_beautify = requireHtml();

	function style_html(html_source, options, js, css) {
	  js = js || js_beautify;
	  css = css || css_beautify;
	  return html_beautify(html_source, options, js, css);
	}
	style_html.defaultOptions = html_beautify.defaultOptions;

	src.js = js_beautify;
	src.css = css_beautify;
	src.html = style_html;
	return src;
}

/*jshint node:true */

(function (module) {

	/**
	The following batches are equivalent:

	var beautify_js = require('js-beautify');
	var beautify_js = require('js-beautify').js;
	var beautify_js = require('js-beautify').js_beautify;

	var beautify_css = require('js-beautify').css;
	var beautify_css = require('js-beautify').css_beautify;

	var beautify_html = require('js-beautify').html;
	var beautify_html = require('js-beautify').html_beautify;

	All methods returned accept two arguments, the source string and an options object.
	**/

	function get_beautify(js_beautify, css_beautify, html_beautify) {
	  // the default is js
	  var beautify = function(src, config) {
	    return js_beautify.js_beautify(src, config);
	  };

	  // short aliases
	  beautify.js = js_beautify.js_beautify;
	  beautify.css = css_beautify.css_beautify;
	  beautify.html = html_beautify.html_beautify;

	  // legacy aliases
	  beautify.js_beautify = js_beautify.js_beautify;
	  beautify.css_beautify = css_beautify.css_beautify;
	  beautify.html_beautify = html_beautify.html_beautify;

	  return beautify;
	}

	{
	  (function(mod) {
	    var beautifier = requireSrc();
	    beautifier.js_beautify = beautifier.js;
	    beautifier.css_beautify = beautifier.css;
	    beautifier.html_beautify = beautifier.html;

	    mod.exports = get_beautify(beautifier, beautifier, beautifier);

	  })(module);
	} 
} (js));

var jsExports = js.exports;

/*!
 * is-whitespace <https://github.com/jonschlinkert/is-whitespace>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var cache;

var isWhitespace$1 = function isWhitespace(str) {
  return (typeof str === 'string') && regex().test(str);
};

function regex() {
  // ensure that runtime compilation only happens once
  return cache || (cache = new RegExp('^[\\s\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF"]+$'));
}

/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var isExtendable = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null
    && (typeof val === 'object' || typeof val === 'function');
};

var isObject$2 = isExtendable;

var extendShallow = function extend(o/*, objects*/) {
  if (!isObject$2(o)) { o = {}; }

  var len = arguments.length;
  for (var i = 1; i < len; i++) {
    var obj = arguments[i];

    if (isObject$2(obj)) {
      assign(o, obj);
    }
  }
  return o;
};

function assign(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var isBuffer_1 = function (obj) {
  return obj != null && (isBuffer$1(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
};

function isBuffer$1 (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer$1(obj.slice(0, 0))
}

var isBuffer = isBuffer_1;
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

var kindOf = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};

/*!
 * condense-newlines <https://github.com/jonschlinkert/condense-newlines>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

var isWhitespace = isWhitespace$1;
var extend$1 = extendShallow;
var typeOf = kindOf;

var condenseNewlines = function(str, options) {
  var opts = extend$1({}, options);
  var sep = opts.sep || '\n\n';
  var min = opts.min;
  var re;

  if (typeof min === 'number' && min !== 2) {
    re = new RegExp('(\\r\\n|\\n|\\u2424) {' + min + ',}');
  }
  if (typeof re === 'undefined') {
    re = opts.regex || /(\r\n|\n|\u2424){2,}/g;
  }

  // if a line is 100% whitespace it will be trimmed, so that
  // later we can condense newlines correctly
  if (opts.keepWhitespace !== true) {
    str = str.split('\n').map(function(line) {
      return isWhitespace(line) ? line.trim() : line;
    }).join('\n');
  }

  str = trailingNewline(str, opts);
  return str.replace(re, sep);
};

function trailingNewline(str, options) {
  var val = options.trailingNewline;
  if (val === false) {
    return str;
  }

  switch (typeOf(val)) {
    case 'string':
      str = str.replace(/\s+$/, options.trailingNewline);
      break;
    case 'function':
      str = options.trailingNewline(str);
      break;
    case 'undefined':
    case 'boolean':
    default: {
      str = str.replace(/\s+$/, '\n');
      break;
    }
  }
  return str;
}

/*!
 * pretty <https://github.com/jonschlinkert/pretty>
 *
 * Copyright (c) 2013-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var beautify = jsExports;
var condense = condenseNewlines;
var extend = extendShallow;
var defaults = {
  unformatted: ['code', 'pre', 'em', 'strong', 'span'],
  indent_inner_html: true,
  indent_char: ' ',
  indent_size: 2,
  sep: '\n'
};

var pretty = function pretty(str, options) {
  var opts = extend({}, defaults, options);
  str = beautify.html(str, opts);

  if (opts.ocd === true) {
    if (opts.newlines) opts.sep = opts.newlines;
    return ocd(str, opts);
  }

  return str;
};

function ocd(str, options) {
  // Normalize and condense all newlines
  return condense(str, options)
    // Remove empty whitespace the top of a file.
    .replace(/^\s+/g, '')
    // Remove extra whitespace from eof
    .replace(/\s+$/g, '\n')

    // Add a space above each comment
    .replace(/(\s*<!--)/g, '\n$1')
    // Bring closing comments up to the same line as closing tag.
    .replace(/>(\s*)(?=<!--\s*\/)/g, '> ');
}

const pretty$1 = /*@__PURE__*/getDefaultExportFromCjs(pretty);

var tasks = {};

var utils$k = {};

var array$1 = {};

Object.defineProperty(array$1, "__esModule", { value: true });
array$1.splitWhen = array$1.flatten = void 0;
function flatten(items) {
    return items.reduce((collection, item) => [].concat(collection, item), []);
}
array$1.flatten = flatten;
function splitWhen(items, predicate) {
    const result = [[]];
    let groupIndex = 0;
    for (const item of items) {
        if (predicate(item)) {
            groupIndex++;
            result[groupIndex] = [];
        }
        else {
            result[groupIndex].push(item);
        }
    }
    return result;
}
array$1.splitWhen = splitWhen;

var errno$1 = {};

Object.defineProperty(errno$1, "__esModule", { value: true });
errno$1.isEnoentCodeError = void 0;
function isEnoentCodeError(error) {
    return error.code === 'ENOENT';
}
errno$1.isEnoentCodeError = isEnoentCodeError;

var fs$7 = {};

Object.defineProperty(fs$7, "__esModule", { value: true });
fs$7.createDirentFromStats = void 0;
let DirentFromStats$1 = class DirentFromStats {
    constructor(name, stats) {
        this.name = name;
        this.isBlockDevice = stats.isBlockDevice.bind(stats);
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
        this.isDirectory = stats.isDirectory.bind(stats);
        this.isFIFO = stats.isFIFO.bind(stats);
        this.isFile = stats.isFile.bind(stats);
        this.isSocket = stats.isSocket.bind(stats);
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
    }
};
function createDirentFromStats$1(name, stats) {
    return new DirentFromStats$1(name, stats);
}
fs$7.createDirentFromStats = createDirentFromStats$1;

var path$9 = {};

Object.defineProperty(path$9, "__esModule", { value: true });
path$9.convertPosixPathToPattern = path$9.convertWindowsPathToPattern = path$9.convertPathToPattern = path$9.escapePosixPath = path$9.escapeWindowsPath = path$9.escape = path$9.removeLeadingDotSegment = path$9.makeAbsolute = path$9.unixify = void 0;
const os = require$$0$4;
const path$8 = require$$1;
const IS_WINDOWS_PLATFORM = os.platform() === 'win32';
const LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2; // ./ or .\\
/**
 * All non-escaped special characters.
 * Posix: ()*?[]{|}, !+@ before (, ! at the beginning, \\ before non-special characters.
 * Windows: (){}[], !+@ before (, ! at the beginning.
 */
const POSIX_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\()|\\(?![!()*+?@[\]{|}]))/g;
const WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()[\]{}]|^!|[!+@](?=\())/g;
/**
 * The device path (\\.\ or \\?\).
 * https://learn.microsoft.com/en-us/dotnet/standard/io/file-path-formats#dos-device-paths
 */
const DOS_DEVICE_PATH_RE = /^\\\\([.?])/;
/**
 * All backslashes except those escaping special characters.
 * Windows: !()+@{}
 * https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file#naming-conventions
 */
const WINDOWS_BACKSLASHES_RE = /\\(?![!()+@[\]{}])/g;
/**
 * Designed to work only with simple paths: `dir\\file`.
 */
function unixify(filepath) {
    return filepath.replace(/\\/g, '/');
}
path$9.unixify = unixify;
function makeAbsolute(cwd, filepath) {
    return path$8.resolve(cwd, filepath);
}
path$9.makeAbsolute = makeAbsolute;
function removeLeadingDotSegment(entry) {
    // We do not use `startsWith` because this is 10x slower than current implementation for some cases.
    // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
    if (entry.charAt(0) === '.') {
        const secondCharactery = entry.charAt(1);
        if (secondCharactery === '/' || secondCharactery === '\\') {
            return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT);
        }
    }
    return entry;
}
path$9.removeLeadingDotSegment = removeLeadingDotSegment;
path$9.escape = IS_WINDOWS_PLATFORM ? escapeWindowsPath : escapePosixPath;
function escapeWindowsPath(pattern) {
    return pattern.replace(WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE, '\\$2');
}
path$9.escapeWindowsPath = escapeWindowsPath;
function escapePosixPath(pattern) {
    return pattern.replace(POSIX_UNESCAPED_GLOB_SYMBOLS_RE, '\\$2');
}
path$9.escapePosixPath = escapePosixPath;
path$9.convertPathToPattern = IS_WINDOWS_PLATFORM ? convertWindowsPathToPattern : convertPosixPathToPattern;
function convertWindowsPathToPattern(filepath) {
    return escapeWindowsPath(filepath)
        .replace(DOS_DEVICE_PATH_RE, '//$1')
        .replace(WINDOWS_BACKSLASHES_RE, '/');
}
path$9.convertWindowsPathToPattern = convertWindowsPathToPattern;
function convertPosixPathToPattern(filepath) {
    return escapePosixPath(filepath);
}
path$9.convertPosixPathToPattern = convertPosixPathToPattern;

var pattern$1 = {};

/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

var isExtglob$1 = function isExtglob(str) {
  if (typeof str !== 'string' || str === '') {
    return false;
  }

  var match;
  while ((match = /(\\).|([@?!+*]\(.*\))/g.exec(str))) {
    if (match[2]) return true;
    str = str.slice(match.index + match[0].length);
  }

  return false;
};

/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isExtglob = isExtglob$1;
var chars = { '{': '}', '(': ')', '[': ']'};
var strictCheck = function(str) {
  if (str[0] === '!') {
    return true;
  }
  var index = 0;
  var pipeIndex = -2;
  var closeSquareIndex = -2;
  var closeCurlyIndex = -2;
  var closeParenIndex = -2;
  var backSlashIndex = -2;
  while (index < str.length) {
    if (str[index] === '*') {
      return true;
    }

    if (str[index + 1] === '?' && /[\].+)]/.test(str[index])) {
      return true;
    }

    if (closeSquareIndex !== -1 && str[index] === '[' && str[index + 1] !== ']') {
      if (closeSquareIndex < index) {
        closeSquareIndex = str.indexOf(']', index);
      }
      if (closeSquareIndex > index) {
        if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
          return true;
        }
        backSlashIndex = str.indexOf('\\', index);
        if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
          return true;
        }
      }
    }

    if (closeCurlyIndex !== -1 && str[index] === '{' && str[index + 1] !== '}') {
      closeCurlyIndex = str.indexOf('}', index);
      if (closeCurlyIndex > index) {
        backSlashIndex = str.indexOf('\\', index);
        if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
          return true;
        }
      }
    }

    if (closeParenIndex !== -1 && str[index] === '(' && str[index + 1] === '?' && /[:!=]/.test(str[index + 2]) && str[index + 3] !== ')') {
      closeParenIndex = str.indexOf(')', index);
      if (closeParenIndex > index) {
        backSlashIndex = str.indexOf('\\', index);
        if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
          return true;
        }
      }
    }

    if (pipeIndex !== -1 && str[index] === '(' && str[index + 1] !== '|') {
      if (pipeIndex < index) {
        pipeIndex = str.indexOf('|', index);
      }
      if (pipeIndex !== -1 && str[pipeIndex + 1] !== ')') {
        closeParenIndex = str.indexOf(')', pipeIndex);
        if (closeParenIndex > pipeIndex) {
          backSlashIndex = str.indexOf('\\', pipeIndex);
          if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
            return true;
          }
        }
      }
    }

    if (str[index] === '\\') {
      var open = str[index + 1];
      index += 2;
      var close = chars[open];

      if (close) {
        var n = str.indexOf(close, index);
        if (n !== -1) {
          index = n + 1;
        }
      }

      if (str[index] === '!') {
        return true;
      }
    } else {
      index++;
    }
  }
  return false;
};

var relaxedCheck = function(str) {
  if (str[0] === '!') {
    return true;
  }
  var index = 0;
  while (index < str.length) {
    if (/[*?{}()[\]]/.test(str[index])) {
      return true;
    }

    if (str[index] === '\\') {
      var open = str[index + 1];
      index += 2;
      var close = chars[open];

      if (close) {
        var n = str.indexOf(close, index);
        if (n !== -1) {
          index = n + 1;
        }
      }

      if (str[index] === '!') {
        return true;
      }
    } else {
      index++;
    }
  }
  return false;
};

var isGlob$1 = function isGlob(str, options) {
  if (typeof str !== 'string' || str === '') {
    return false;
  }

  if (isExtglob(str)) {
    return true;
  }

  var check = strictCheck;

  // optionally relax check
  if (options && options.strict === false) {
    check = relaxedCheck;
  }

  return check(str);
};

var isGlob = isGlob$1;
var pathPosixDirname = require$$1.posix.dirname;
var isWin32 = require$$0$4.platform() === 'win32';

var slash = '/';
var backslash = /\\/g;
var enclosure = /[\{\[].*[\}\]]$/;
var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/;
var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;

/**
 * @param {string} str
 * @param {Object} opts
 * @param {boolean} [opts.flipBackslashes=true]
 * @returns {string}
 */
var globParent$1 = function globParent(str, opts) {
  var options = Object.assign({ flipBackslashes: true }, opts);

  // flip windows path separators
  if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
    str = str.replace(backslash, slash);
  }

  // special case for strings ending in enclosure containing path separator
  if (enclosure.test(str)) {
    str += slash;
  }

  // preserves full path in case of trailing path separator
  str += 'a';

  // remove path parts that are globby
  do {
    str = pathPosixDirname(str);
  } while (isGlob(str) || globby.test(str));

  // remove escape chars and return result
  return str.replace(escaped, '$1');
};

var utils$j = {};

(function (exports) {

	exports.isInteger = num => {
	  if (typeof num === 'number') {
	    return Number.isInteger(num);
	  }
	  if (typeof num === 'string' && num.trim() !== '') {
	    return Number.isInteger(Number(num));
	  }
	  return false;
	};

	/**
	 * Find a node of the given type
	 */

	exports.find = (node, type) => node.nodes.find(node => node.type === type);

	/**
	 * Find a node of the given type
	 */

	exports.exceedsLimit = (min, max, step = 1, limit) => {
	  if (limit === false) return false;
	  if (!exports.isInteger(min) || !exports.isInteger(max)) return false;
	  return ((Number(max) - Number(min)) / Number(step)) >= limit;
	};

	/**
	 * Escape the given node with '\\' before node.value
	 */

	exports.escapeNode = (block, n = 0, type) => {
	  let node = block.nodes[n];
	  if (!node) return;

	  if ((type && node.type === type) || node.type === 'open' || node.type === 'close') {
	    if (node.escaped !== true) {
	      node.value = '\\' + node.value;
	      node.escaped = true;
	    }
	  }
	};

	/**
	 * Returns true if the given brace node should be enclosed in literal braces
	 */

	exports.encloseBrace = node => {
	  if (node.type !== 'brace') return false;
	  if ((node.commas >> 0 + node.ranges >> 0) === 0) {
	    node.invalid = true;
	    return true;
	  }
	  return false;
	};

	/**
	 * Returns true if a brace node is invalid.
	 */

	exports.isInvalidBrace = block => {
	  if (block.type !== 'brace') return false;
	  if (block.invalid === true || block.dollar) return true;
	  if ((block.commas >> 0 + block.ranges >> 0) === 0) {
	    block.invalid = true;
	    return true;
	  }
	  if (block.open !== true || block.close !== true) {
	    block.invalid = true;
	    return true;
	  }
	  return false;
	};

	/**
	 * Returns true if a node is an open or close node
	 */

	exports.isOpenOrClose = node => {
	  if (node.type === 'open' || node.type === 'close') {
	    return true;
	  }
	  return node.open === true || node.close === true;
	};

	/**
	 * Reduce an array of text nodes.
	 */

	exports.reduce = nodes => nodes.reduce((acc, node) => {
	  if (node.type === 'text') acc.push(node.value);
	  if (node.type === 'range') node.type = 'text';
	  return acc;
	}, []);

	/**
	 * Flatten an array
	 */

	exports.flatten = (...args) => {
	  const result = [];
	  const flat = arr => {
	    for (let i = 0; i < arr.length; i++) {
	      let ele = arr[i];
	      Array.isArray(ele) ? flat(ele) : ele !== void 0 && result.push(ele);
	    }
	    return result;
	  };
	  flat(args);
	  return result;
	}; 
} (utils$j));

const utils$i = utils$j;

var stringify$4 = (ast, options = {}) => {
  let stringify = (node, parent = {}) => {
    let invalidBlock = options.escapeInvalid && utils$i.isInvalidBrace(parent);
    let invalidNode = node.invalid === true && options.escapeInvalid === true;
    let output = '';

    if (node.value) {
      if ((invalidBlock || invalidNode) && utils$i.isOpenOrClose(node)) {
        return '\\' + node.value;
      }
      return node.value;
    }

    if (node.value) {
      return node.value;
    }

    if (node.nodes) {
      for (let child of node.nodes) {
        output += stringify(child);
      }
    }
    return output;
  };

  return stringify(ast);
};

/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */

var isNumber$2 = function(num) {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};

/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */

const isNumber$1 = isNumber$2;

const toRegexRange$1 = (min, max, options) => {
  if (isNumber$1(min) === false) {
    throw new TypeError('toRegexRange: expected the first argument to be a number');
  }

  if (max === void 0 || min === max) {
    return String(min);
  }

  if (isNumber$1(max) === false) {
    throw new TypeError('toRegexRange: expected the second argument to be a number.');
  }

  let opts = { relaxZeros: true, ...options };
  if (typeof opts.strictZeros === 'boolean') {
    opts.relaxZeros = opts.strictZeros === false;
  }

  let relax = String(opts.relaxZeros);
  let shorthand = String(opts.shorthand);
  let capture = String(opts.capture);
  let wrap = String(opts.wrap);
  let cacheKey = min + ':' + max + '=' + relax + shorthand + capture + wrap;

  if (toRegexRange$1.cache.hasOwnProperty(cacheKey)) {
    return toRegexRange$1.cache[cacheKey].result;
  }

  let a = Math.min(min, max);
  let b = Math.max(min, max);

  if (Math.abs(a - b) === 1) {
    let result = min + '|' + max;
    if (opts.capture) {
      return `(${result})`;
    }
    if (opts.wrap === false) {
      return result;
    }
    return `(?:${result})`;
  }

  let isPadded = hasPadding(min) || hasPadding(max);
  let state = { min, max, a, b };
  let positives = [];
  let negatives = [];

  if (isPadded) {
    state.isPadded = isPadded;
    state.maxLen = String(state.max).length;
  }

  if (a < 0) {
    let newMin = b < 0 ? Math.abs(b) : 1;
    negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
    a = state.a = 0;
  }

  if (b >= 0) {
    positives = splitToPatterns(a, b, state, opts);
  }

  state.negatives = negatives;
  state.positives = positives;
  state.result = collatePatterns(negatives, positives);

  if (opts.capture === true) {
    state.result = `(${state.result})`;
  } else if (opts.wrap !== false && (positives.length + negatives.length) > 1) {
    state.result = `(?:${state.result})`;
  }

  toRegexRange$1.cache[cacheKey] = state;
  return state.result;
};

function collatePatterns(neg, pos, options) {
  let onlyNegative = filterPatterns(neg, pos, '-', false) || [];
  let onlyPositive = filterPatterns(pos, neg, '', false) || [];
  let intersected = filterPatterns(neg, pos, '-?', true) || [];
  let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
  return subpatterns.join('|');
}

function splitToRanges(min, max) {
  let nines = 1;
  let zeros = 1;

  let stop = countNines(min, nines);
  let stops = new Set([max]);

  while (min <= stop && stop <= max) {
    stops.add(stop);
    nines += 1;
    stop = countNines(min, nines);
  }

  stop = countZeros(max + 1, zeros) - 1;

  while (min < stop && stop <= max) {
    stops.add(stop);
    zeros += 1;
    stop = countZeros(max + 1, zeros) - 1;
  }

  stops = [...stops];
  stops.sort(compare);
  return stops;
}

/**
 * Convert a range to a regex pattern
 * @param {Number} `start`
 * @param {Number} `stop`
 * @return {String}
 */

function rangeToPattern(start, stop, options) {
  if (start === stop) {
    return { pattern: start, count: [], digits: 0 };
  }

  let zipped = zip(start, stop);
  let digits = zipped.length;
  let pattern = '';
  let count = 0;

  for (let i = 0; i < digits; i++) {
    let [startDigit, stopDigit] = zipped[i];

    if (startDigit === stopDigit) {
      pattern += startDigit;

    } else if (startDigit !== '0' || stopDigit !== '9') {
      pattern += toCharacterClass(startDigit, stopDigit);

    } else {
      count++;
    }
  }

  if (count) {
    pattern += options.shorthand === true ? '\\d' : '[0-9]';
  }

  return { pattern, count: [count], digits };
}

function splitToPatterns(min, max, tok, options) {
  let ranges = splitToRanges(min, max);
  let tokens = [];
  let start = min;
  let prev;

  for (let i = 0; i < ranges.length; i++) {
    let max = ranges[i];
    let obj = rangeToPattern(String(start), String(max), options);
    let zeros = '';

    if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
      if (prev.count.length > 1) {
        prev.count.pop();
      }

      prev.count.push(obj.count[0]);
      prev.string = prev.pattern + toQuantifier(prev.count);
      start = max + 1;
      continue;
    }

    if (tok.isPadded) {
      zeros = padZeros(max, tok, options);
    }

    obj.string = zeros + obj.pattern + toQuantifier(obj.count);
    tokens.push(obj);
    start = max + 1;
    prev = obj;
  }

  return tokens;
}

function filterPatterns(arr, comparison, prefix, intersection, options) {
  let result = [];

  for (let ele of arr) {
    let { string } = ele;

    // only push if _both_ are negative...
    if (!intersection && !contains(comparison, 'string', string)) {
      result.push(prefix + string);
    }

    // or _both_ are positive
    if (intersection && contains(comparison, 'string', string)) {
      result.push(prefix + string);
    }
  }
  return result;
}

/**
 * Zip strings
 */

function zip(a, b) {
  let arr = [];
  for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
  return arr;
}

function compare(a, b) {
  return a > b ? 1 : b > a ? -1 : 0;
}

function contains(arr, key, val) {
  return arr.some(ele => ele[key] === val);
}

function countNines(min, len) {
  return Number(String(min).slice(0, -len) + '9'.repeat(len));
}

function countZeros(integer, zeros) {
  return integer - (integer % Math.pow(10, zeros));
}

function toQuantifier(digits) {
  let [start = 0, stop = ''] = digits;
  if (stop || start > 1) {
    return `{${start + (stop ? ',' + stop : '')}}`;
  }
  return '';
}

function toCharacterClass(a, b, options) {
  return `[${a}${(b - a === 1) ? '' : '-'}${b}]`;
}

function hasPadding(str) {
  return /^-?(0+)\d/.test(str);
}

function padZeros(value, tok, options) {
  if (!tok.isPadded) {
    return value;
  }

  let diff = Math.abs(tok.maxLen - String(value).length);
  let relax = options.relaxZeros !== false;

  switch (diff) {
    case 0:
      return '';
    case 1:
      return relax ? '0?' : '0';
    case 2:
      return relax ? '0{0,2}' : '00';
    default: {
      return relax ? `0{0,${diff}}` : `0{${diff}}`;
    }
  }
}

/**
 * Cache
 */

toRegexRange$1.cache = {};
toRegexRange$1.clearCache = () => (toRegexRange$1.cache = {});

/**
 * Expose `toRegexRange`
 */

var toRegexRange_1 = toRegexRange$1;

/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */

const util$1 = require$$0$3;
const toRegexRange = toRegexRange_1;

const isObject$1 = val => val !== null && typeof val === 'object' && !Array.isArray(val);

const transform = toNumber => {
  return value => toNumber === true ? Number(value) : String(value);
};

const isValidValue = value => {
  return typeof value === 'number' || (typeof value === 'string' && value !== '');
};

const isNumber = num => Number.isInteger(+num);

const zeros = input => {
  let value = `${input}`;
  let index = -1;
  if (value[0] === '-') value = value.slice(1);
  if (value === '0') return false;
  while (value[++index] === '0');
  return index > 0;
};

const stringify$3 = (start, end, options) => {
  if (typeof start === 'string' || typeof end === 'string') {
    return true;
  }
  return options.stringify === true;
};

const pad = (input, maxLength, toNumber) => {
  if (maxLength > 0) {
    let dash = input[0] === '-' ? '-' : '';
    if (dash) input = input.slice(1);
    input = (dash + input.padStart(dash ? maxLength - 1 : maxLength, '0'));
  }
  if (toNumber === false) {
    return String(input);
  }
  return input;
};

const toMaxLen = (input, maxLength) => {
  let negative = input[0] === '-' ? '-' : '';
  if (negative) {
    input = input.slice(1);
    maxLength--;
  }
  while (input.length < maxLength) input = '0' + input;
  return negative ? ('-' + input) : input;
};

const toSequence = (parts, options) => {
  parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);

  let prefix = options.capture ? '' : '?:';
  let positives = '';
  let negatives = '';
  let result;

  if (parts.positives.length) {
    positives = parts.positives.join('|');
  }

  if (parts.negatives.length) {
    negatives = `-(${prefix}${parts.negatives.join('|')})`;
  }

  if (positives && negatives) {
    result = `${positives}|${negatives}`;
  } else {
    result = positives || negatives;
  }

  if (options.wrap) {
    return `(${prefix}${result})`;
  }

  return result;
};

const toRange = (a, b, isNumbers, options) => {
  if (isNumbers) {
    return toRegexRange(a, b, { wrap: false, ...options });
  }

  let start = String.fromCharCode(a);
  if (a === b) return start;

  let stop = String.fromCharCode(b);
  return `[${start}-${stop}]`;
};

const toRegex = (start, end, options) => {
  if (Array.isArray(start)) {
    let wrap = options.wrap === true;
    let prefix = options.capture ? '' : '?:';
    return wrap ? `(${prefix}${start.join('|')})` : start.join('|');
  }
  return toRegexRange(start, end, options);
};

const rangeError = (...args) => {
  return new RangeError('Invalid range arguments: ' + util$1.inspect(...args));
};

const invalidRange = (start, end, options) => {
  if (options.strictRanges === true) throw rangeError([start, end]);
  return [];
};

const invalidStep = (step, options) => {
  if (options.strictRanges === true) {
    throw new TypeError(`Expected step "${step}" to be a number`);
  }
  return [];
};

const fillNumbers = (start, end, step = 1, options = {}) => {
  let a = Number(start);
  let b = Number(end);

  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    if (options.strictRanges === true) throw rangeError([start, end]);
    return [];
  }

  // fix negative zero
  if (a === 0) a = 0;
  if (b === 0) b = 0;

  let descending = a > b;
  let startString = String(start);
  let endString = String(end);
  let stepString = String(step);
  step = Math.max(Math.abs(step), 1);

  let padded = zeros(startString) || zeros(endString) || zeros(stepString);
  let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
  let toNumber = padded === false && stringify$3(start, end, options) === false;
  let format = options.transform || transform(toNumber);

  if (options.toRegex && step === 1) {
    return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
  }

  let parts = { negatives: [], positives: [] };
  let push = num => parts[num < 0 ? 'negatives' : 'positives'].push(Math.abs(num));
  let range = [];
  let index = 0;

  while (descending ? a >= b : a <= b) {
    if (options.toRegex === true && step > 1) {
      push(a);
    } else {
      range.push(pad(format(a, index), maxLen, toNumber));
    }
    a = descending ? a - step : a + step;
    index++;
  }

  if (options.toRegex === true) {
    return step > 1
      ? toSequence(parts, options)
      : toRegex(range, null, { wrap: false, ...options });
  }

  return range;
};

const fillLetters = (start, end, step = 1, options = {}) => {
  if ((!isNumber(start) && start.length > 1) || (!isNumber(end) && end.length > 1)) {
    return invalidRange(start, end, options);
  }


  let format = options.transform || (val => String.fromCharCode(val));
  let a = `${start}`.charCodeAt(0);
  let b = `${end}`.charCodeAt(0);

  let descending = a > b;
  let min = Math.min(a, b);
  let max = Math.max(a, b);

  if (options.toRegex && step === 1) {
    return toRange(min, max, false, options);
  }

  let range = [];
  let index = 0;

  while (descending ? a >= b : a <= b) {
    range.push(format(a, index));
    a = descending ? a - step : a + step;
    index++;
  }

  if (options.toRegex === true) {
    return toRegex(range, null, { wrap: false, options });
  }

  return range;
};

const fill$2 = (start, end, step, options = {}) => {
  if (end == null && isValidValue(start)) {
    return [start];
  }

  if (!isValidValue(start) || !isValidValue(end)) {
    return invalidRange(start, end, options);
  }

  if (typeof step === 'function') {
    return fill$2(start, end, 1, { transform: step });
  }

  if (isObject$1(step)) {
    return fill$2(start, end, 0, step);
  }

  let opts = { ...options };
  if (opts.capture === true) opts.wrap = true;
  step = step || opts.step || 1;

  if (!isNumber(step)) {
    if (step != null && !isObject$1(step)) return invalidStep(step, opts);
    return fill$2(start, end, 1, step);
  }

  if (isNumber(start) && isNumber(end)) {
    return fillNumbers(start, end, step, opts);
  }

  return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
};

var fillRange = fill$2;

const fill$1 = fillRange;
const utils$h = utils$j;

const compile$1 = (ast, options = {}) => {
  let walk = (node, parent = {}) => {
    let invalidBlock = utils$h.isInvalidBrace(parent);
    let invalidNode = node.invalid === true && options.escapeInvalid === true;
    let invalid = invalidBlock === true || invalidNode === true;
    let prefix = options.escapeInvalid === true ? '\\' : '';
    let output = '';

    if (node.isOpen === true) {
      return prefix + node.value;
    }
    if (node.isClose === true) {
      return prefix + node.value;
    }

    if (node.type === 'open') {
      return invalid ? (prefix + node.value) : '(';
    }

    if (node.type === 'close') {
      return invalid ? (prefix + node.value) : ')';
    }

    if (node.type === 'comma') {
      return node.prev.type === 'comma' ? '' : (invalid ? node.value : '|');
    }

    if (node.value) {
      return node.value;
    }

    if (node.nodes && node.ranges > 0) {
      let args = utils$h.reduce(node.nodes);
      let range = fill$1(...args, { ...options, wrap: false, toRegex: true });

      if (range.length !== 0) {
        return args.length > 1 && range.length > 1 ? `(${range})` : range;
      }
    }

    if (node.nodes) {
      for (let child of node.nodes) {
        output += walk(child, node);
      }
    }
    return output;
  };

  return walk(ast);
};

var compile_1 = compile$1;

const fill = fillRange;
const stringify$2 = stringify$4;
const utils$g = utils$j;

const append = (queue = '', stash = '', enclose = false) => {
  let result = [];

  queue = [].concat(queue);
  stash = [].concat(stash);

  if (!stash.length) return queue;
  if (!queue.length) {
    return enclose ? utils$g.flatten(stash).map(ele => `{${ele}}`) : stash;
  }

  for (let item of queue) {
    if (Array.isArray(item)) {
      for (let value of item) {
        result.push(append(value, stash, enclose));
      }
    } else {
      for (let ele of stash) {
        if (enclose === true && typeof ele === 'string') ele = `{${ele}}`;
        result.push(Array.isArray(ele) ? append(item, ele, enclose) : (item + ele));
      }
    }
  }
  return utils$g.flatten(result);
};

const expand$1 = (ast, options = {}) => {
  let rangeLimit = options.rangeLimit === void 0 ? 1000 : options.rangeLimit;

  let walk = (node, parent = {}) => {
    node.queue = [];

    let p = parent;
    let q = parent.queue;

    while (p.type !== 'brace' && p.type !== 'root' && p.parent) {
      p = p.parent;
      q = p.queue;
    }

    if (node.invalid || node.dollar) {
      q.push(append(q.pop(), stringify$2(node, options)));
      return;
    }

    if (node.type === 'brace' && node.invalid !== true && node.nodes.length === 2) {
      q.push(append(q.pop(), ['{}']));
      return;
    }

    if (node.nodes && node.ranges > 0) {
      let args = utils$g.reduce(node.nodes);

      if (utils$g.exceedsLimit(...args, options.step, rangeLimit)) {
        throw new RangeError('expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.');
      }

      let range = fill(...args, options);
      if (range.length === 0) {
        range = stringify$2(node, options);
      }

      q.push(append(q.pop(), range));
      node.nodes = [];
      return;
    }

    let enclose = utils$g.encloseBrace(node);
    let queue = node.queue;
    let block = node;

    while (block.type !== 'brace' && block.type !== 'root' && block.parent) {
      block = block.parent;
      queue = block.queue;
    }

    for (let i = 0; i < node.nodes.length; i++) {
      let child = node.nodes[i];

      if (child.type === 'comma' && node.type === 'brace') {
        if (i === 1) queue.push('');
        queue.push('');
        continue;
      }

      if (child.type === 'close') {
        q.push(append(q.pop(), queue, enclose));
        continue;
      }

      if (child.value && child.type !== 'open') {
        queue.push(append(queue.pop(), child.value));
        continue;
      }

      if (child.nodes) {
        walk(child, node);
      }
    }

    return queue;
  };

  return utils$g.flatten(walk(ast));
};

var expand_1 = expand$1;

var constants$4 = {
  MAX_LENGTH: 1024 * 64,

  // Digits
  CHAR_0: '0', /* 0 */
  CHAR_9: '9', /* 9 */

  // Alphabet chars.
  CHAR_UPPERCASE_A: 'A', /* A */
  CHAR_LOWERCASE_A: 'a', /* a */
  CHAR_UPPERCASE_Z: 'Z', /* Z */
  CHAR_LOWERCASE_Z: 'z', /* z */

  CHAR_LEFT_PARENTHESES: '(', /* ( */
  CHAR_RIGHT_PARENTHESES: ')', /* ) */

  CHAR_ASTERISK: '*', /* * */

  // Non-alphabetic chars.
  CHAR_AMPERSAND: '&', /* & */
  CHAR_AT: '@', /* @ */
  CHAR_BACKSLASH: '\\', /* \ */
  CHAR_BACKTICK: '`', /* ` */
  CHAR_CARRIAGE_RETURN: '\r', /* \r */
  CHAR_CIRCUMFLEX_ACCENT: '^', /* ^ */
  CHAR_COLON: ':', /* : */
  CHAR_COMMA: ',', /* , */
  CHAR_DOLLAR: '$', /* . */
  CHAR_DOT: '.', /* . */
  CHAR_DOUBLE_QUOTE: '"', /* " */
  CHAR_EQUAL: '=', /* = */
  CHAR_EXCLAMATION_MARK: '!', /* ! */
  CHAR_FORM_FEED: '\f', /* \f */
  CHAR_FORWARD_SLASH: '/', /* / */
  CHAR_HASH: '#', /* # */
  CHAR_HYPHEN_MINUS: '-', /* - */
  CHAR_LEFT_ANGLE_BRACKET: '<', /* < */
  CHAR_LEFT_CURLY_BRACE: '{', /* { */
  CHAR_LEFT_SQUARE_BRACKET: '[', /* [ */
  CHAR_LINE_FEED: '\n', /* \n */
  CHAR_NO_BREAK_SPACE: '\u00A0', /* \u00A0 */
  CHAR_PERCENT: '%', /* % */
  CHAR_PLUS: '+', /* + */
  CHAR_QUESTION_MARK: '?', /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: '>', /* > */
  CHAR_RIGHT_CURLY_BRACE: '}', /* } */
  CHAR_RIGHT_SQUARE_BRACKET: ']', /* ] */
  CHAR_SEMICOLON: ';', /* ; */
  CHAR_SINGLE_QUOTE: '\'', /* ' */
  CHAR_SPACE: ' ', /*   */
  CHAR_TAB: '\t', /* \t */
  CHAR_UNDERSCORE: '_', /* _ */
  CHAR_VERTICAL_LINE: '|', /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: '\uFEFF' /* \uFEFF */
};

const stringify$1 = stringify$4;

/**
 * Constants
 */

const {
  MAX_LENGTH: MAX_LENGTH$1,
  CHAR_BACKSLASH, /* \ */
  CHAR_BACKTICK, /* ` */
  CHAR_COMMA: CHAR_COMMA$1, /* , */
  CHAR_DOT: CHAR_DOT$1, /* . */
  CHAR_LEFT_PARENTHESES: CHAR_LEFT_PARENTHESES$1, /* ( */
  CHAR_RIGHT_PARENTHESES: CHAR_RIGHT_PARENTHESES$1, /* ) */
  CHAR_LEFT_CURLY_BRACE: CHAR_LEFT_CURLY_BRACE$1, /* { */
  CHAR_RIGHT_CURLY_BRACE: CHAR_RIGHT_CURLY_BRACE$1, /* } */
  CHAR_LEFT_SQUARE_BRACKET: CHAR_LEFT_SQUARE_BRACKET$1, /* [ */
  CHAR_RIGHT_SQUARE_BRACKET: CHAR_RIGHT_SQUARE_BRACKET$1, /* ] */
  CHAR_DOUBLE_QUOTE, /* " */
  CHAR_SINGLE_QUOTE, /* ' */
  CHAR_NO_BREAK_SPACE,
  CHAR_ZERO_WIDTH_NOBREAK_SPACE
} = constants$4;

/**
 * parse
 */

const parse$3 = (input, options = {}) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  let opts = options || {};
  let max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH$1, opts.maxLength) : MAX_LENGTH$1;
  if (input.length > max) {
    throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
  }

  let ast = { type: 'root', input, nodes: [] };
  let stack = [ast];
  let block = ast;
  let prev = ast;
  let brackets = 0;
  let length = input.length;
  let index = 0;
  let depth = 0;
  let value;

  /**
   * Helpers
   */

  const advance = () => input[index++];
  const push = node => {
    if (node.type === 'text' && prev.type === 'dot') {
      prev.type = 'text';
    }

    if (prev && prev.type === 'text' && node.type === 'text') {
      prev.value += node.value;
      return;
    }

    block.nodes.push(node);
    node.parent = block;
    node.prev = prev;
    prev = node;
    return node;
  };

  push({ type: 'bos' });

  while (index < length) {
    block = stack[stack.length - 1];
    value = advance();

    /**
     * Invalid chars
     */

    if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
      continue;
    }

    /**
     * Escaped chars
     */

    if (value === CHAR_BACKSLASH) {
      push({ type: 'text', value: (options.keepEscaping ? value : '') + advance() });
      continue;
    }

    /**
     * Right square bracket (literal): ']'
     */

    if (value === CHAR_RIGHT_SQUARE_BRACKET$1) {
      push({ type: 'text', value: '\\' + value });
      continue;
    }

    /**
     * Left square bracket: '['
     */

    if (value === CHAR_LEFT_SQUARE_BRACKET$1) {
      brackets++;
      let next;

      while (index < length && (next = advance())) {
        value += next;

        if (next === CHAR_LEFT_SQUARE_BRACKET$1) {
          brackets++;
          continue;
        }

        if (next === CHAR_BACKSLASH) {
          value += advance();
          continue;
        }

        if (next === CHAR_RIGHT_SQUARE_BRACKET$1) {
          brackets--;

          if (brackets === 0) {
            break;
          }
        }
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Parentheses
     */

    if (value === CHAR_LEFT_PARENTHESES$1) {
      block = push({ type: 'paren', nodes: [] });
      stack.push(block);
      push({ type: 'text', value });
      continue;
    }

    if (value === CHAR_RIGHT_PARENTHESES$1) {
      if (block.type !== 'paren') {
        push({ type: 'text', value });
        continue;
      }
      block = stack.pop();
      push({ type: 'text', value });
      block = stack[stack.length - 1];
      continue;
    }

    /**
     * Quotes: '|"|`
     */

    if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
      let open = value;
      let next;

      if (options.keepQuotes !== true) {
        value = '';
      }

      while (index < length && (next = advance())) {
        if (next === CHAR_BACKSLASH) {
          value += next + advance();
          continue;
        }

        if (next === open) {
          if (options.keepQuotes === true) value += next;
          break;
        }

        value += next;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Left curly brace: '{'
     */

    if (value === CHAR_LEFT_CURLY_BRACE$1) {
      depth++;

      let dollar = prev.value && prev.value.slice(-1) === '$' || block.dollar === true;
      let brace = {
        type: 'brace',
        open: true,
        close: false,
        dollar,
        depth,
        commas: 0,
        ranges: 0,
        nodes: []
      };

      block = push(brace);
      stack.push(block);
      push({ type: 'open', value });
      continue;
    }

    /**
     * Right curly brace: '}'
     */

    if (value === CHAR_RIGHT_CURLY_BRACE$1) {
      if (block.type !== 'brace') {
        push({ type: 'text', value });
        continue;
      }

      let type = 'close';
      block = stack.pop();
      block.close = true;

      push({ type, value });
      depth--;

      block = stack[stack.length - 1];
      continue;
    }

    /**
     * Comma: ','
     */

    if (value === CHAR_COMMA$1 && depth > 0) {
      if (block.ranges > 0) {
        block.ranges = 0;
        let open = block.nodes.shift();
        block.nodes = [open, { type: 'text', value: stringify$1(block) }];
      }

      push({ type: 'comma', value });
      block.commas++;
      continue;
    }

    /**
     * Dot: '.'
     */

    if (value === CHAR_DOT$1 && depth > 0 && block.commas === 0) {
      let siblings = block.nodes;

      if (depth === 0 || siblings.length === 0) {
        push({ type: 'text', value });
        continue;
      }

      if (prev.type === 'dot') {
        block.range = [];
        prev.value += value;
        prev.type = 'range';

        if (block.nodes.length !== 3 && block.nodes.length !== 5) {
          block.invalid = true;
          block.ranges = 0;
          prev.type = 'text';
          continue;
        }

        block.ranges++;
        block.args = [];
        continue;
      }

      if (prev.type === 'range') {
        siblings.pop();

        let before = siblings[siblings.length - 1];
        before.value += prev.value + value;
        prev = before;
        block.ranges--;
        continue;
      }

      push({ type: 'dot', value });
      continue;
    }

    /**
     * Text
     */

    push({ type: 'text', value });
  }

  // Mark imbalanced braces and brackets as invalid
  do {
    block = stack.pop();

    if (block.type !== 'root') {
      block.nodes.forEach(node => {
        if (!node.nodes) {
          if (node.type === 'open') node.isOpen = true;
          if (node.type === 'close') node.isClose = true;
          if (!node.nodes) node.type = 'text';
          node.invalid = true;
        }
      });

      // get the location of the block on parent.nodes (block's siblings)
      let parent = stack[stack.length - 1];
      let index = parent.nodes.indexOf(block);
      // replace the (invalid) block with it's nodes
      parent.nodes.splice(index, 1, ...block.nodes);
    }
  } while (stack.length > 0);

  push({ type: 'eos' });
  return ast;
};

var parse_1$1 = parse$3;

const stringify = stringify$4;
const compile = compile_1;
const expand = expand_1;
const parse$2 = parse_1$1;

/**
 * Expand the given pattern or create a regex-compatible string.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces('{a,b,c}', { compile: true })); //=> ['(a|b|c)']
 * console.log(braces('{a,b,c}')); //=> ['a', 'b', 'c']
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {String}
 * @api public
 */

const braces$1 = (input, options = {}) => {
  let output = [];

  if (Array.isArray(input)) {
    for (let pattern of input) {
      let result = braces$1.create(pattern, options);
      if (Array.isArray(result)) {
        output.push(...result);
      } else {
        output.push(result);
      }
    }
  } else {
    output = [].concat(braces$1.create(input, options));
  }

  if (options && options.expand === true && options.nodupes === true) {
    output = [...new Set(output)];
  }
  return output;
};

/**
 * Parse the given `str` with the given `options`.
 *
 * ```js
 * // braces.parse(pattern, [, options]);
 * const ast = braces.parse('a/{b,c}/d');
 * console.log(ast);
 * ```
 * @param {String} pattern Brace pattern to parse
 * @param {Object} options
 * @return {Object} Returns an AST
 * @api public
 */

braces$1.parse = (input, options = {}) => parse$2(input, options);

/**
 * Creates a braces string from an AST, or an AST node.
 *
 * ```js
 * const braces = require('braces');
 * let ast = braces.parse('foo/{a,b}/bar');
 * console.log(stringify(ast.nodes[2])); //=> '{a,b}'
 * ```
 * @param {String} `input` Brace pattern or AST.
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces$1.stringify = (input, options = {}) => {
  if (typeof input === 'string') {
    return stringify(braces$1.parse(input, options), options);
  }
  return stringify(input, options);
};

/**
 * Compiles a brace pattern into a regex-compatible, optimized string.
 * This method is called by the main [braces](#braces) function by default.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.compile('a/{b,c}/d'));
 * //=> ['a/(b|c)/d']
 * ```
 * @param {String} `input` Brace pattern or AST.
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces$1.compile = (input, options = {}) => {
  if (typeof input === 'string') {
    input = braces$1.parse(input, options);
  }
  return compile(input, options);
};

/**
 * Expands a brace pattern into an array. This method is called by the
 * main [braces](#braces) function when `options.expand` is true. Before
 * using this method it's recommended that you read the [performance notes](#performance))
 * and advantages of using [.compile](#compile) instead.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.expand('a/{b,c}/d'));
 * //=> ['a/b/d', 'a/c/d'];
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces$1.expand = (input, options = {}) => {
  if (typeof input === 'string') {
    input = braces$1.parse(input, options);
  }

  let result = expand(input, options);

  // filter out empty strings if specified
  if (options.noempty === true) {
    result = result.filter(Boolean);
  }

  // filter out duplicates if specified
  if (options.nodupes === true) {
    result = [...new Set(result)];
  }

  return result;
};

/**
 * Processes a brace pattern and returns either an expanded array
 * (if `options.expand` is true), a highly optimized regex-compatible string.
 * This method is called by the main [braces](#braces) function.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.create('user-{200..300}/project-{a,b,c}-{1..10}'))
 * //=> 'user-(20[0-9]|2[1-9][0-9]|300)/project-(a|b|c)-([1-9]|10)'
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces$1.create = (input, options = {}) => {
  if (input === '' || input.length < 3) {
    return [input];
  }

 return options.expand !== true
    ? braces$1.compile(input, options)
    : braces$1.expand(input, options);
};

/**
 * Expose "braces"
 */

var braces_1 = braces$1;

var utils$f = {};

const path$7 = require$$1;
const WIN_SLASH = '\\\\/';
const WIN_NO_SLASH = `[^${WIN_SLASH}]`;

/**
 * Posix glob regex
 */

const DOT_LITERAL = '\\.';
const PLUS_LITERAL = '\\+';
const QMARK_LITERAL = '\\?';
const SLASH_LITERAL = '\\/';
const ONE_CHAR = '(?=.)';
const QMARK = '[^/]';
const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
const NO_DOT = `(?!${DOT_LITERAL})`;
const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
const STAR = `${QMARK}*?`;

const POSIX_CHARS = {
  DOT_LITERAL,
  PLUS_LITERAL,
  QMARK_LITERAL,
  SLASH_LITERAL,
  ONE_CHAR,
  QMARK,
  END_ANCHOR,
  DOTS_SLASH,
  NO_DOT,
  NO_DOTS,
  NO_DOT_SLASH,
  NO_DOTS_SLASH,
  QMARK_NO_DOT,
  STAR,
  START_ANCHOR
};

/**
 * Windows glob regex
 */

const WINDOWS_CHARS = {
  ...POSIX_CHARS,

  SLASH_LITERAL: `[${WIN_SLASH}]`,
  QMARK: WIN_NO_SLASH,
  STAR: `${WIN_NO_SLASH}*?`,
  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
  NO_DOT: `(?!${DOT_LITERAL})`,
  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
};

/**
 * POSIX Bracket Regex
 */

const POSIX_REGEX_SOURCE$1 = {
  alnum: 'a-zA-Z0-9',
  alpha: 'a-zA-Z',
  ascii: '\\x00-\\x7F',
  blank: ' \\t',
  cntrl: '\\x00-\\x1F\\x7F',
  digit: '0-9',
  graph: '\\x21-\\x7E',
  lower: 'a-z',
  print: '\\x20-\\x7E ',
  punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
  space: ' \\t\\r\\n\\v\\f',
  upper: 'A-Z',
  word: 'A-Za-z0-9_',
  xdigit: 'A-Fa-f0-9'
};

var constants$3 = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE: POSIX_REGEX_SOURCE$1,

  // regular expressions
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,

  // Replace globs with equivalent patterns to reduce parsing time.
  REPLACEMENTS: {
    '***': '*',
    '**/**': '**',
    '**/**/**': '**'
  },

  // Digits
  CHAR_0: 48, /* 0 */
  CHAR_9: 57, /* 9 */

  // Alphabet chars.
  CHAR_UPPERCASE_A: 65, /* A */
  CHAR_LOWERCASE_A: 97, /* a */
  CHAR_UPPERCASE_Z: 90, /* Z */
  CHAR_LOWERCASE_Z: 122, /* z */

  CHAR_LEFT_PARENTHESES: 40, /* ( */
  CHAR_RIGHT_PARENTHESES: 41, /* ) */

  CHAR_ASTERISK: 42, /* * */

  // Non-alphabetic chars.
  CHAR_AMPERSAND: 38, /* & */
  CHAR_AT: 64, /* @ */
  CHAR_BACKWARD_SLASH: 92, /* \ */
  CHAR_CARRIAGE_RETURN: 13, /* \r */
  CHAR_CIRCUMFLEX_ACCENT: 94, /* ^ */
  CHAR_COLON: 58, /* : */
  CHAR_COMMA: 44, /* , */
  CHAR_DOT: 46, /* . */
  CHAR_DOUBLE_QUOTE: 34, /* " */
  CHAR_EQUAL: 61, /* = */
  CHAR_EXCLAMATION_MARK: 33, /* ! */
  CHAR_FORM_FEED: 12, /* \f */
  CHAR_FORWARD_SLASH: 47, /* / */
  CHAR_GRAVE_ACCENT: 96, /* ` */
  CHAR_HASH: 35, /* # */
  CHAR_HYPHEN_MINUS: 45, /* - */
  CHAR_LEFT_ANGLE_BRACKET: 60, /* < */
  CHAR_LEFT_CURLY_BRACE: 123, /* { */
  CHAR_LEFT_SQUARE_BRACKET: 91, /* [ */
  CHAR_LINE_FEED: 10, /* \n */
  CHAR_NO_BREAK_SPACE: 160, /* \u00A0 */
  CHAR_PERCENT: 37, /* % */
  CHAR_PLUS: 43, /* + */
  CHAR_QUESTION_MARK: 63, /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: 62, /* > */
  CHAR_RIGHT_CURLY_BRACE: 125, /* } */
  CHAR_RIGHT_SQUARE_BRACKET: 93, /* ] */
  CHAR_SEMICOLON: 59, /* ; */
  CHAR_SINGLE_QUOTE: 39, /* ' */
  CHAR_SPACE: 32, /*   */
  CHAR_TAB: 9, /* \t */
  CHAR_UNDERSCORE: 95, /* _ */
  CHAR_VERTICAL_LINE: 124, /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, /* \uFEFF */

  SEP: path$7.sep,

  /**
   * Create EXTGLOB_CHARS
   */

  extglobChars(chars) {
    return {
      '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
      '?': { type: 'qmark', open: '(?:', close: ')?' },
      '+': { type: 'plus', open: '(?:', close: ')+' },
      '*': { type: 'star', open: '(?:', close: ')*' },
      '@': { type: 'at', open: '(?:', close: ')' }
    };
  },

  /**
   * Create GLOB_CHARS
   */

  globChars(win32) {
    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
  }
};

(function (exports) {

	const path = require$$1;
	const win32 = process.platform === 'win32';
	const {
	  REGEX_BACKSLASH,
	  REGEX_REMOVE_BACKSLASH,
	  REGEX_SPECIAL_CHARS,
	  REGEX_SPECIAL_CHARS_GLOBAL
	} = constants$3;

	exports.isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);
	exports.hasRegexChars = str => REGEX_SPECIAL_CHARS.test(str);
	exports.isRegexChar = str => str.length === 1 && exports.hasRegexChars(str);
	exports.escapeRegex = str => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
	exports.toPosixSlashes = str => str.replace(REGEX_BACKSLASH, '/');

	exports.removeBackslashes = str => {
	  return str.replace(REGEX_REMOVE_BACKSLASH, match => {
	    return match === '\\' ? '' : match;
	  });
	};

	exports.supportsLookbehinds = () => {
	  const segs = process.version.slice(1).split('.').map(Number);
	  if (segs.length === 3 && segs[0] >= 9 || (segs[0] === 8 && segs[1] >= 10)) {
	    return true;
	  }
	  return false;
	};

	exports.isWindows = options => {
	  if (options && typeof options.windows === 'boolean') {
	    return options.windows;
	  }
	  return win32 === true || path.sep === '\\';
	};

	exports.escapeLast = (input, char, lastIdx) => {
	  const idx = input.lastIndexOf(char, lastIdx);
	  if (idx === -1) return input;
	  if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1);
	  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
	};

	exports.removePrefix = (input, state = {}) => {
	  let output = input;
	  if (output.startsWith('./')) {
	    output = output.slice(2);
	    state.prefix = './';
	  }
	  return output;
	};

	exports.wrapOutput = (input, state = {}, options = {}) => {
	  const prepend = options.contains ? '' : '^';
	  const append = options.contains ? '' : '$';

	  let output = `${prepend}(?:${input})${append}`;
	  if (state.negated === true) {
	    output = `(?:^(?!${output}).*$)`;
	  }
	  return output;
	}; 
} (utils$f));

const utils$e = utils$f;
const {
  CHAR_ASTERISK,             /* * */
  CHAR_AT,                   /* @ */
  CHAR_BACKWARD_SLASH,       /* \ */
  CHAR_COMMA,                /* , */
  CHAR_DOT,                  /* . */
  CHAR_EXCLAMATION_MARK,     /* ! */
  CHAR_FORWARD_SLASH,        /* / */
  CHAR_LEFT_CURLY_BRACE,     /* { */
  CHAR_LEFT_PARENTHESES,     /* ( */
  CHAR_LEFT_SQUARE_BRACKET,  /* [ */
  CHAR_PLUS,                 /* + */
  CHAR_QUESTION_MARK,        /* ? */
  CHAR_RIGHT_CURLY_BRACE,    /* } */
  CHAR_RIGHT_PARENTHESES,    /* ) */
  CHAR_RIGHT_SQUARE_BRACKET  /* ] */
} = constants$3;

const isPathSeparator = code => {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
};

const depth = token => {
  if (token.isPrefix !== true) {
    token.depth = token.isGlobstar ? Infinity : 1;
  }
};

/**
 * Quickly scans a glob pattern and returns an object with a handful of
 * useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
 * `glob` (the actual pattern), `negated` (true if the path starts with `!` but not
 * with `!(`) and `negatedExtglob` (true if the path starts with `!(`).
 *
 * ```js
 * const pm = require('picomatch');
 * console.log(pm.scan('foo/bar/*.js'));
 * { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {Object} Returns an object with tokens and regex source string.
 * @api public
 */

const scan$1 = (input, options) => {
  const opts = options || {};

  const length = input.length - 1;
  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
  const slashes = [];
  const tokens = [];
  const parts = [];

  let str = input;
  let index = -1;
  let start = 0;
  let lastIndex = 0;
  let isBrace = false;
  let isBracket = false;
  let isGlob = false;
  let isExtglob = false;
  let isGlobstar = false;
  let braceEscaped = false;
  let backslashes = false;
  let negated = false;
  let negatedExtglob = false;
  let finished = false;
  let braces = 0;
  let prev;
  let code;
  let token = { value: '', depth: 0, isGlob: false };

  const eos = () => index >= length;
  const peek = () => str.charCodeAt(index + 1);
  const advance = () => {
    prev = code;
    return str.charCodeAt(++index);
  };

  while (index < length) {
    code = advance();
    let next;

    if (code === CHAR_BACKWARD_SLASH) {
      backslashes = token.backslashes = true;
      code = advance();

      if (code === CHAR_LEFT_CURLY_BRACE) {
        braceEscaped = true;
      }
      continue;
    }

    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
      braces++;

      while (eos() !== true && (code = advance())) {
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          continue;
        }

        if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (braceEscaped !== true && code === CHAR_COMMA) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (code === CHAR_RIGHT_CURLY_BRACE) {
          braces--;

          if (braces === 0) {
            braceEscaped = false;
            isBrace = token.isBrace = true;
            finished = true;
            break;
          }
        }
      }

      if (scanToEnd === true) {
        continue;
      }

      break;
    }

    if (code === CHAR_FORWARD_SLASH) {
      slashes.push(index);
      tokens.push(token);
      token = { value: '', depth: 0, isGlob: false };

      if (finished === true) continue;
      if (prev === CHAR_DOT && index === (start + 1)) {
        start += 2;
        continue;
      }

      lastIndex = index + 1;
      continue;
    }

    if (opts.noext !== true) {
      const isExtglobChar = code === CHAR_PLUS
        || code === CHAR_AT
        || code === CHAR_ASTERISK
        || code === CHAR_QUESTION_MARK
        || code === CHAR_EXCLAMATION_MARK;

      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
        isGlob = token.isGlob = true;
        isExtglob = token.isExtglob = true;
        finished = true;
        if (code === CHAR_EXCLAMATION_MARK && index === start) {
          negatedExtglob = true;
        }

        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }

            if (code === CHAR_RIGHT_PARENTHESES) {
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
    }

    if (code === CHAR_ASTERISK) {
      if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_QUESTION_MARK) {
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_LEFT_SQUARE_BRACKET) {
      while (eos() !== true && (next = advance())) {
        if (next === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
          isBracket = token.isBracket = true;
          isGlob = token.isGlob = true;
          finished = true;
          break;
        }
      }

      if (scanToEnd === true) {
        continue;
      }

      break;
    }

    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
      negated = token.negated = true;
      start++;
      continue;
    }

    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
      isGlob = token.isGlob = true;

      if (scanToEnd === true) {
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_LEFT_PARENTHESES) {
            backslashes = token.backslashes = true;
            code = advance();
            continue;
          }

          if (code === CHAR_RIGHT_PARENTHESES) {
            finished = true;
            break;
          }
        }
        continue;
      }
      break;
    }

    if (isGlob === true) {
      finished = true;

      if (scanToEnd === true) {
        continue;
      }

      break;
    }
  }

  if (opts.noext === true) {
    isExtglob = false;
    isGlob = false;
  }

  let base = str;
  let prefix = '';
  let glob = '';

  if (start > 0) {
    prefix = str.slice(0, start);
    str = str.slice(start);
    lastIndex -= start;
  }

  if (base && isGlob === true && lastIndex > 0) {
    base = str.slice(0, lastIndex);
    glob = str.slice(lastIndex);
  } else if (isGlob === true) {
    base = '';
    glob = str;
  } else {
    base = str;
  }

  if (base && base !== '' && base !== '/' && base !== str) {
    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
      base = base.slice(0, -1);
    }
  }

  if (opts.unescape === true) {
    if (glob) glob = utils$e.removeBackslashes(glob);

    if (base && backslashes === true) {
      base = utils$e.removeBackslashes(base);
    }
  }

  const state = {
    prefix,
    input,
    start,
    base,
    glob,
    isBrace,
    isBracket,
    isGlob,
    isExtglob,
    isGlobstar,
    negated,
    negatedExtglob
  };

  if (opts.tokens === true) {
    state.maxDepth = 0;
    if (!isPathSeparator(code)) {
      tokens.push(token);
    }
    state.tokens = tokens;
  }

  if (opts.parts === true || opts.tokens === true) {
    let prevIndex;

    for (let idx = 0; idx < slashes.length; idx++) {
      const n = prevIndex ? prevIndex + 1 : start;
      const i = slashes[idx];
      const value = input.slice(n, i);
      if (opts.tokens) {
        if (idx === 0 && start !== 0) {
          tokens[idx].isPrefix = true;
          tokens[idx].value = prefix;
        } else {
          tokens[idx].value = value;
        }
        depth(tokens[idx]);
        state.maxDepth += tokens[idx].depth;
      }
      if (idx !== 0 || value !== '') {
        parts.push(value);
      }
      prevIndex = i;
    }

    if (prevIndex && prevIndex + 1 < input.length) {
      const value = input.slice(prevIndex + 1);
      parts.push(value);

      if (opts.tokens) {
        tokens[tokens.length - 1].value = value;
        depth(tokens[tokens.length - 1]);
        state.maxDepth += tokens[tokens.length - 1].depth;
      }
    }

    state.slashes = slashes;
    state.parts = parts;
  }

  return state;
};

var scan_1 = scan$1;

const constants$2 = constants$3;
const utils$d = utils$f;

/**
 * Constants
 */

const {
  MAX_LENGTH,
  POSIX_REGEX_SOURCE,
  REGEX_NON_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_BACKREF,
  REPLACEMENTS
} = constants$2;

/**
 * Helpers
 */

const expandRange = (args, options) => {
  if (typeof options.expandRange === 'function') {
    return options.expandRange(...args, options);
  }

  args.sort();
  const value = `[${args.join('-')}]`;

  try {
    /* eslint-disable-next-line no-new */
    new RegExp(value);
  } catch (ex) {
    return args.map(v => utils$d.escapeRegex(v)).join('..');
  }

  return value;
};

/**
 * Create the message for a syntax error
 */

const syntaxError = (type, char) => {
  return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
};

/**
 * Parse the given input string.
 * @param {String} input
 * @param {Object} options
 * @return {Object}
 */

const parse$1 = (input, options) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  input = REPLACEMENTS[input] || input;

  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;

  let len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  const bos = { type: 'bos', value: '', output: opts.prepend || '' };
  const tokens = [bos];

  const capture = opts.capture ? '' : '?:';
  const win32 = utils$d.isWindows(options);

  // create constants based on platform, for windows or posix
  const PLATFORM_CHARS = constants$2.globChars(win32);
  const EXTGLOB_CHARS = constants$2.extglobChars(PLATFORM_CHARS);

  const {
    DOT_LITERAL,
    PLUS_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOT_SLASH,
    NO_DOTS_SLASH,
    QMARK,
    QMARK_NO_DOT,
    STAR,
    START_ANCHOR
  } = PLATFORM_CHARS;

  const globstar = opts => {
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const nodot = opts.dot ? '' : NO_DOT;
  const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
  let star = opts.bash === true ? globstar(opts) : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  // minimatch options support
  if (typeof opts.noext === 'boolean') {
    opts.noextglob = opts.noext;
  }

  const state = {
    input,
    index: -1,
    start: 0,
    dot: opts.dot === true,
    consumed: '',
    output: '',
    prefix: '',
    backtrack: false,
    negated: false,
    brackets: 0,
    braces: 0,
    parens: 0,
    quotes: 0,
    globstar: false,
    tokens
  };

  input = utils$d.removePrefix(input, state);
  len = input.length;

  const extglobs = [];
  const braces = [];
  const stack = [];
  let prev = bos;
  let value;

  /**
   * Tokenizing helpers
   */

  const eos = () => state.index === len - 1;
  const peek = state.peek = (n = 1) => input[state.index + n];
  const advance = state.advance = () => input[++state.index] || '';
  const remaining = () => input.slice(state.index + 1);
  const consume = (value = '', num = 0) => {
    state.consumed += value;
    state.index += num;
  };

  const append = token => {
    state.output += token.output != null ? token.output : token.value;
    consume(token.value);
  };

  const negate = () => {
    let count = 1;

    while (peek() === '!' && (peek(2) !== '(' || peek(3) === '?')) {
      advance();
      state.start++;
      count++;
    }

    if (count % 2 === 0) {
      return false;
    }

    state.negated = true;
    state.start++;
    return true;
  };

  const increment = type => {
    state[type]++;
    stack.push(type);
  };

  const decrement = type => {
    state[type]--;
    stack.pop();
  };

  /**
   * Push tokens onto the tokens array. This helper speeds up
   * tokenizing by 1) helping us avoid backtracking as much as possible,
   * and 2) helping us avoid creating extra tokens when consecutive
   * characters are plain text. This improves performance and simplifies
   * lookbehinds.
   */

  const push = tok => {
    if (prev.type === 'globstar') {
      const isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace');
      const isExtglob = tok.extglob === true || (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'));

      if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = 'star';
        prev.value = '*';
        prev.output = star;
        state.output += prev.output;
      }
    }

    if (extglobs.length && tok.type !== 'paren') {
      extglobs[extglobs.length - 1].inner += tok.value;
    }

    if (tok.value || tok.output) append(tok);
    if (prev && prev.type === 'text' && tok.type === 'text') {
      prev.value += tok.value;
      prev.output = (prev.output || '') + tok.value;
      return;
    }

    tok.prev = prev;
    tokens.push(tok);
    prev = tok;
  };

  const extglobOpen = (type, value) => {
    const token = { ...EXTGLOB_CHARS[value], conditions: 1, inner: '' };

    token.prev = prev;
    token.parens = state.parens;
    token.output = state.output;
    const output = (opts.capture ? '(' : '') + token.open;

    increment('parens');
    push({ type, value, output: state.output ? '' : ONE_CHAR });
    push({ type: 'paren', extglob: true, value: advance(), output });
    extglobs.push(token);
  };

  const extglobClose = token => {
    let output = token.close + (opts.capture ? ')' : '');
    let rest;

    if (token.type === 'negate') {
      let extglobStar = star;

      if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
        extglobStar = globstar(opts);
      }

      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
        output = token.close = `)$))${extglobStar}`;
      }

      if (token.inner.includes('*') && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
        // Any non-magical string (`.ts`) or even nested expression (`.{ts,tsx}`) can follow after the closing parenthesis.
        // In this case, we need to parse the string and use it in the output of the original pattern.
        // Suitable patterns: `/!(*.d).ts`, `/!(*.d).{ts,tsx}`, `**/!(*-dbg).@(js)`.
        //
        // Disabling the `fastpaths` option due to a problem with parsing strings as `.ts` in the pattern like `**/!(*.d).ts`.
        const expression = parse$1(rest, { ...options, fastpaths: false }).output;

        output = token.close = `)${expression})${extglobStar})`;
      }

      if (token.prev.type === 'bos') {
        state.negatedExtglob = true;
      }
    }

    push({ type: 'paren', extglob: true, value, output });
    decrement('parens');
  };

  /**
   * Fast paths
   */

  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
    let backslashes = false;

    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
      if (first === '\\') {
        backslashes = true;
        return m;
      }

      if (first === '?') {
        if (esc) {
          return esc + first + (rest ? QMARK.repeat(rest.length) : '');
        }
        if (index === 0) {
          return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '');
        }
        return QMARK.repeat(chars.length);
      }

      if (first === '.') {
        return DOT_LITERAL.repeat(chars.length);
      }

      if (first === '*') {
        if (esc) {
          return esc + first + (rest ? star : '');
        }
        return star;
      }
      return esc ? m : `\\${m}`;
    });

    if (backslashes === true) {
      if (opts.unescape === true) {
        output = output.replace(/\\/g, '');
      } else {
        output = output.replace(/\\+/g, m => {
          return m.length % 2 === 0 ? '\\\\' : (m ? '\\' : '');
        });
      }
    }

    if (output === input && opts.contains === true) {
      state.output = input;
      return state;
    }

    state.output = utils$d.wrapOutput(output, state, options);
    return state;
  }

  /**
   * Tokenize input until we reach end-of-string
   */

  while (!eos()) {
    value = advance();

    if (value === '\u0000') {
      continue;
    }

    /**
     * Escaped characters
     */

    if (value === '\\') {
      const next = peek();

      if (next === '/' && opts.bash !== true) {
        continue;
      }

      if (next === '.' || next === ';') {
        continue;
      }

      if (!next) {
        value += '\\';
        push({ type: 'text', value });
        continue;
      }

      // collapse slashes to reduce potential for exploits
      const match = /^\\+/.exec(remaining());
      let slashes = 0;

      if (match && match[0].length > 2) {
        slashes = match[0].length;
        state.index += slashes;
        if (slashes % 2 !== 0) {
          value += '\\';
        }
      }

      if (opts.unescape === true) {
        value = advance();
      } else {
        value += advance();
      }

      if (state.brackets === 0) {
        push({ type: 'text', value });
        continue;
      }
    }

    /**
     * If we're inside a regex character class, continue
     * until we reach the closing bracket.
     */

    if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
      if (opts.posix !== false && value === ':') {
        const inner = prev.value.slice(1);
        if (inner.includes('[')) {
          prev.posix = true;

          if (inner.includes(':')) {
            const idx = prev.value.lastIndexOf('[');
            const pre = prev.value.slice(0, idx);
            const rest = prev.value.slice(idx + 2);
            const posix = POSIX_REGEX_SOURCE[rest];
            if (posix) {
              prev.value = pre + posix;
              state.backtrack = true;
              advance();

              if (!bos.output && tokens.indexOf(prev) === 1) {
                bos.output = ONE_CHAR;
              }
              continue;
            }
          }
        }
      }

      if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
        value = `\\${value}`;
      }

      if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
        value = `\\${value}`;
      }

      if (opts.posix === true && value === '!' && prev.value === '[') {
        value = '^';
      }

      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * If we're inside a quoted string, continue
     * until we reach the closing double quote.
     */

    if (state.quotes === 1 && value !== '"') {
      value = utils$d.escapeRegex(value);
      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * Double quotes
     */

    if (value === '"') {
      state.quotes = state.quotes === 1 ? 0 : 1;
      if (opts.keepQuotes === true) {
        push({ type: 'text', value });
      }
      continue;
    }

    /**
     * Parentheses
     */

    if (value === '(') {
      increment('parens');
      push({ type: 'paren', value });
      continue;
    }

    if (value === ')') {
      if (state.parens === 0 && opts.strictBrackets === true) {
        throw new SyntaxError(syntaxError('opening', '('));
      }

      const extglob = extglobs[extglobs.length - 1];
      if (extglob && state.parens === extglob.parens + 1) {
        extglobClose(extglobs.pop());
        continue;
      }

      push({ type: 'paren', value, output: state.parens ? ')' : '\\)' });
      decrement('parens');
      continue;
    }

    /**
     * Square brackets
     */

    if (value === '[') {
      if (opts.nobracket === true || !remaining().includes(']')) {
        if (opts.nobracket !== true && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('closing', ']'));
        }

        value = `\\${value}`;
      } else {
        increment('brackets');
      }

      push({ type: 'bracket', value });
      continue;
    }

    if (value === ']') {
      if (opts.nobracket === true || (prev && prev.type === 'bracket' && prev.value.length === 1)) {
        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      if (state.brackets === 0) {
        if (opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('opening', '['));
        }

        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      decrement('brackets');

      const prevValue = prev.value.slice(1);
      if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
        value = `/${value}`;
      }

      prev.value += value;
      append({ value });

      // when literal brackets are explicitly disabled
      // assume we should match with a regex character class
      if (opts.literalBrackets === false || utils$d.hasRegexChars(prevValue)) {
        continue;
      }

      const escaped = utils$d.escapeRegex(prev.value);
      state.output = state.output.slice(0, -prev.value.length);

      // when literal brackets are explicitly enabled
      // assume we should escape the brackets to match literal characters
      if (opts.literalBrackets === true) {
        state.output += escaped;
        prev.value = escaped;
        continue;
      }

      // when the user specifies nothing, try to match both
      prev.value = `(${capture}${escaped}|${prev.value})`;
      state.output += prev.value;
      continue;
    }

    /**
     * Braces
     */

    if (value === '{' && opts.nobrace !== true) {
      increment('braces');

      const open = {
        type: 'brace',
        value,
        output: '(',
        outputIndex: state.output.length,
        tokensIndex: state.tokens.length
      };

      braces.push(open);
      push(open);
      continue;
    }

    if (value === '}') {
      const brace = braces[braces.length - 1];

      if (opts.nobrace === true || !brace) {
        push({ type: 'text', value, output: value });
        continue;
      }

      let output = ')';

      if (brace.dots === true) {
        const arr = tokens.slice();
        const range = [];

        for (let i = arr.length - 1; i >= 0; i--) {
          tokens.pop();
          if (arr[i].type === 'brace') {
            break;
          }
          if (arr[i].type !== 'dots') {
            range.unshift(arr[i].value);
          }
        }

        output = expandRange(range, opts);
        state.backtrack = true;
      }

      if (brace.comma !== true && brace.dots !== true) {
        const out = state.output.slice(0, brace.outputIndex);
        const toks = state.tokens.slice(brace.tokensIndex);
        brace.value = brace.output = '\\{';
        value = output = '\\}';
        state.output = out;
        for (const t of toks) {
          state.output += (t.output || t.value);
        }
      }

      push({ type: 'brace', value, output });
      decrement('braces');
      braces.pop();
      continue;
    }

    /**
     * Pipes
     */

    if (value === '|') {
      if (extglobs.length > 0) {
        extglobs[extglobs.length - 1].conditions++;
      }
      push({ type: 'text', value });
      continue;
    }

    /**
     * Commas
     */

    if (value === ',') {
      let output = value;

      const brace = braces[braces.length - 1];
      if (brace && stack[stack.length - 1] === 'braces') {
        brace.comma = true;
        output = '|';
      }

      push({ type: 'comma', value, output });
      continue;
    }

    /**
     * Slashes
     */

    if (value === '/') {
      // if the beginning of the glob is "./", advance the start
      // to the current index, and don't add the "./" characters
      // to the state. This greatly simplifies lookbehinds when
      // checking for BOS characters like "!" and "." (not "./")
      if (prev.type === 'dot' && state.index === state.start + 1) {
        state.start = state.index + 1;
        state.consumed = '';
        state.output = '';
        tokens.pop();
        prev = bos; // reset "prev" to the first token
        continue;
      }

      push({ type: 'slash', value, output: SLASH_LITERAL });
      continue;
    }

    /**
     * Dots
     */

    if (value === '.') {
      if (state.braces > 0 && prev.type === 'dot') {
        if (prev.value === '.') prev.output = DOT_LITERAL;
        const brace = braces[braces.length - 1];
        prev.type = 'dots';
        prev.output += value;
        prev.value += value;
        brace.dots = true;
        continue;
      }

      if ((state.braces + state.parens) === 0 && prev.type !== 'bos' && prev.type !== 'slash') {
        push({ type: 'text', value, output: DOT_LITERAL });
        continue;
      }

      push({ type: 'dot', value, output: DOT_LITERAL });
      continue;
    }

    /**
     * Question marks
     */

    if (value === '?') {
      const isGroup = prev && prev.value === '(';
      if (!isGroup && opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('qmark', value);
        continue;
      }

      if (prev && prev.type === 'paren') {
        const next = peek();
        let output = value;

        if (next === '<' && !utils$d.supportsLookbehinds()) {
          throw new Error('Node.js v10 or higher is required for regex lookbehinds');
        }

        if ((prev.value === '(' && !/[!=<:]/.test(next)) || (next === '<' && !/<([!=]|\w+>)/.test(remaining()))) {
          output = `\\${value}`;
        }

        push({ type: 'text', value, output });
        continue;
      }

      if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
        push({ type: 'qmark', value, output: QMARK_NO_DOT });
        continue;
      }

      push({ type: 'qmark', value, output: QMARK });
      continue;
    }

    /**
     * Exclamation
     */

    if (value === '!') {
      if (opts.noextglob !== true && peek() === '(') {
        if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
          extglobOpen('negate', value);
          continue;
        }
      }

      if (opts.nonegate !== true && state.index === 0) {
        negate();
        continue;
      }
    }

    /**
     * Plus
     */

    if (value === '+') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('plus', value);
        continue;
      }

      if ((prev && prev.value === '(') || opts.regex === false) {
        push({ type: 'plus', value, output: PLUS_LITERAL });
        continue;
      }

      if ((prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) || state.parens > 0) {
        push({ type: 'plus', value });
        continue;
      }

      push({ type: 'plus', value: PLUS_LITERAL });
      continue;
    }

    /**
     * Plain text
     */

    if (value === '@') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        push({ type: 'at', extglob: true, value, output: '' });
        continue;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Plain text
     */

    if (value !== '*') {
      if (value === '$' || value === '^') {
        value = `\\${value}`;
      }

      const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
      if (match) {
        value += match[0];
        state.index += match[0].length;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Stars
     */

    if (prev && (prev.type === 'globstar' || prev.star === true)) {
      prev.type = 'star';
      prev.star = true;
      prev.value += value;
      prev.output = star;
      state.backtrack = true;
      state.globstar = true;
      consume(value);
      continue;
    }

    let rest = remaining();
    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
      extglobOpen('star', value);
      continue;
    }

    if (prev.type === 'star') {
      if (opts.noglobstar === true) {
        consume(value);
        continue;
      }

      const prior = prev.prev;
      const before = prior.prev;
      const isStart = prior.type === 'slash' || prior.type === 'bos';
      const afterStar = before && (before.type === 'star' || before.type === 'globstar');

      if (opts.bash === true && (!isStart || (rest[0] && rest[0] !== '/'))) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      const isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace');
      const isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren');
      if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      // strip consecutive `/**/`
      while (rest.slice(0, 3) === '/**') {
        const after = input[state.index + 4];
        if (after && after !== '/') {
          break;
        }
        rest = rest.slice(3);
        consume('/**', 3);
      }

      if (prior.type === 'bos' && eos()) {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = globstar(opts);
        state.output = prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)');
        prev.value += value;
        state.globstar = true;
        state.output += prior.output + prev.output;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && rest[0] === '/') {
        const end = rest[1] !== void 0 ? '|$' : '';

        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
        prev.value += value;

        state.output += prior.output + prev.output;
        state.globstar = true;

        consume(value + advance());

        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      if (prior.type === 'bos' && rest[0] === '/') {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
        state.output = prev.output;
        state.globstar = true;
        consume(value + advance());
        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      // remove single star from output
      state.output = state.output.slice(0, -prev.output.length);

      // reset previous token to globstar
      prev.type = 'globstar';
      prev.output = globstar(opts);
      prev.value += value;

      // reset output with globstar
      state.output += prev.output;
      state.globstar = true;
      consume(value);
      continue;
    }

    const token = { type: 'star', value, output: star };

    if (opts.bash === true) {
      token.output = '.*?';
      if (prev.type === 'bos' || prev.type === 'slash') {
        token.output = nodot + token.output;
      }
      push(token);
      continue;
    }

    if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
      token.output = value;
      push(token);
      continue;
    }

    if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
      if (prev.type === 'dot') {
        state.output += NO_DOT_SLASH;
        prev.output += NO_DOT_SLASH;

      } else if (opts.dot === true) {
        state.output += NO_DOTS_SLASH;
        prev.output += NO_DOTS_SLASH;

      } else {
        state.output += nodot;
        prev.output += nodot;
      }

      if (peek() !== '*') {
        state.output += ONE_CHAR;
        prev.output += ONE_CHAR;
      }
    }

    push(token);
  }

  while (state.brackets > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'));
    state.output = utils$d.escapeLast(state.output, '[');
    decrement('brackets');
  }

  while (state.parens > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'));
    state.output = utils$d.escapeLast(state.output, '(');
    decrement('parens');
  }

  while (state.braces > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'));
    state.output = utils$d.escapeLast(state.output, '{');
    decrement('braces');
  }

  if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
    push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` });
  }

  // rebuild the output if we had to backtrack at any point
  if (state.backtrack === true) {
    state.output = '';

    for (const token of state.tokens) {
      state.output += token.output != null ? token.output : token.value;

      if (token.suffix) {
        state.output += token.suffix;
      }
    }
  }

  return state;
};

/**
 * Fast paths for creating regular expressions for common glob patterns.
 * This can significantly speed up processing and has very little downside
 * impact when none of the fast paths match.
 */

parse$1.fastpaths = (input, options) => {
  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  const len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  input = REPLACEMENTS[input] || input;
  const win32 = utils$d.isWindows(options);

  // create constants based on platform, for windows or posix
  const {
    DOT_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOTS,
    NO_DOTS_SLASH,
    STAR,
    START_ANCHOR
  } = constants$2.globChars(win32);

  const nodot = opts.dot ? NO_DOTS : NO_DOT;
  const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
  const capture = opts.capture ? '' : '?:';
  const state = { negated: false, prefix: '' };
  let star = opts.bash === true ? '.*?' : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  const globstar = opts => {
    if (opts.noglobstar === true) return star;
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const create = str => {
    switch (str) {
      case '*':
        return `${nodot}${ONE_CHAR}${star}`;

      case '.*':
        return `${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*.*':
        return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*/*':
        return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;

      case '**':
        return nodot + globstar(opts);

      case '**/*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;

      case '**/*.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '**/.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;

      default: {
        const match = /^(.*?)\.(\w+)$/.exec(str);
        if (!match) return;

        const source = create(match[1]);
        if (!source) return;

        return source + DOT_LITERAL + match[2];
      }
    }
  };

  const output = utils$d.removePrefix(input, state);
  let source = create(output);

  if (source && opts.strictSlashes !== true) {
    source += `${SLASH_LITERAL}?`;
  }

  return source;
};

var parse_1 = parse$1;

const path$6 = require$$1;
const scan = scan_1;
const parse = parse_1;
const utils$c = utils$f;
const constants$1 = constants$3;
const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

/**
 * Creates a matcher function from one or more glob patterns. The
 * returned function takes a string to match as its first argument,
 * and returns true if the string is a match. The returned matcher
 * function also takes a boolean as the second argument that, when true,
 * returns an object with additional information.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch(glob[, options]);
 *
 * const isMatch = picomatch('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @name picomatch
 * @param {String|Array} `globs` One or more glob patterns.
 * @param {Object=} `options`
 * @return {Function=} Returns a matcher function.
 * @api public
 */

const picomatch$2 = (glob, options, returnState = false) => {
  if (Array.isArray(glob)) {
    const fns = glob.map(input => picomatch$2(input, options, returnState));
    const arrayMatcher = str => {
      for (const isMatch of fns) {
        const state = isMatch(str);
        if (state) return state;
      }
      return false;
    };
    return arrayMatcher;
  }

  const isState = isObject(glob) && glob.tokens && glob.input;

  if (glob === '' || (typeof glob !== 'string' && !isState)) {
    throw new TypeError('Expected pattern to be a non-empty string');
  }

  const opts = options || {};
  const posix = utils$c.isWindows(options);
  const regex = isState
    ? picomatch$2.compileRe(glob, options)
    : picomatch$2.makeRe(glob, options, false, true);

  const state = regex.state;
  delete regex.state;

  let isIgnored = () => false;
  if (opts.ignore) {
    const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
    isIgnored = picomatch$2(opts.ignore, ignoreOpts, returnState);
  }

  const matcher = (input, returnObject = false) => {
    const { isMatch, match, output } = picomatch$2.test(input, regex, options, { glob, posix });
    const result = { glob, state, regex, posix, input, output, match, isMatch };

    if (typeof opts.onResult === 'function') {
      opts.onResult(result);
    }

    if (isMatch === false) {
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (isIgnored(input)) {
      if (typeof opts.onIgnore === 'function') {
        opts.onIgnore(result);
      }
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (typeof opts.onMatch === 'function') {
      opts.onMatch(result);
    }
    return returnObject ? result : true;
  };

  if (returnState) {
    matcher.state = state;
  }

  return matcher;
};

/**
 * Test `input` with the given `regex`. This is used by the main
 * `picomatch()` function to test the input string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.test(input, regex[, options]);
 *
 * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
 * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp} `regex`
 * @return {Object} Returns an object with matching info.
 * @api public
 */

picomatch$2.test = (input, regex, options, { glob, posix } = {}) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected input to be a string');
  }

  if (input === '') {
    return { isMatch: false, output: '' };
  }

  const opts = options || {};
  const format = opts.format || (posix ? utils$c.toPosixSlashes : null);
  let match = input === glob;
  let output = (match && format) ? format(input) : input;

  if (match === false) {
    output = format ? format(input) : input;
    match = output === glob;
  }

  if (match === false || opts.capture === true) {
    if (opts.matchBase === true || opts.basename === true) {
      match = picomatch$2.matchBase(input, regex, options, posix);
    } else {
      match = regex.exec(output);
    }
  }

  return { isMatch: Boolean(match), match, output };
};

/**
 * Match the basename of a filepath.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.matchBase(input, glob[, options]);
 * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
 * @return {Boolean}
 * @api public
 */

picomatch$2.matchBase = (input, glob, options, posix = utils$c.isWindows(options)) => {
  const regex = glob instanceof RegExp ? glob : picomatch$2.makeRe(glob, options);
  return regex.test(path$6.basename(input));
};

/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.isMatch(string, patterns[, options]);
 *
 * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String|Array} str The string to test.
 * @param {String|Array} patterns One or more glob patterns to use for matching.
 * @param {Object} [options] See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

picomatch$2.isMatch = (str, patterns, options) => picomatch$2(patterns, options)(str);

/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const result = picomatch.parse(pattern[, options]);
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
 * @api public
 */

picomatch$2.parse = (pattern, options) => {
  if (Array.isArray(pattern)) return pattern.map(p => picomatch$2.parse(p, options));
  return parse(pattern, { ...options, fastpaths: false });
};

/**
 * Scan a glob pattern to separate the pattern into segments.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.scan(input[, options]);
 *
 * const result = picomatch.scan('!./foo/*.js');
 * console.log(result);
 * { prefix: '!./',
 *   input: '!./foo/*.js',
 *   start: 3,
 *   base: 'foo',
 *   glob: '*.js',
 *   isBrace: false,
 *   isBracket: false,
 *   isGlob: true,
 *   isExtglob: false,
 *   isGlobstar: false,
 *   negated: true }
 * ```
 * @param {String} `input` Glob pattern to scan.
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */

picomatch$2.scan = (input, options) => scan(input, options);

/**
 * Compile a regular expression from the `state` object returned by the
 * [parse()](#parse) method.
 *
 * @param {Object} `state`
 * @param {Object} `options`
 * @param {Boolean} `returnOutput` Intended for implementors, this argument allows you to return the raw output from the parser.
 * @param {Boolean} `returnState` Adds the state to a `state` property on the returned regex. Useful for implementors and debugging.
 * @return {RegExp}
 * @api public
 */

picomatch$2.compileRe = (state, options, returnOutput = false, returnState = false) => {
  if (returnOutput === true) {
    return state.output;
  }

  const opts = options || {};
  const prepend = opts.contains ? '' : '^';
  const append = opts.contains ? '' : '$';

  let source = `${prepend}(?:${state.output})${append}`;
  if (state && state.negated === true) {
    source = `^(?!${source}).*$`;
  }

  const regex = picomatch$2.toRegex(source, options);
  if (returnState === true) {
    regex.state = state;
  }

  return regex;
};

/**
 * Create a regular expression from a parsed glob pattern.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const state = picomatch.parse('*.js');
 * // picomatch.compileRe(state[, options]);
 *
 * console.log(picomatch.compileRe(state));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `state` The object returned from the `.parse` method.
 * @param {Object} `options`
 * @param {Boolean} `returnOutput` Implementors may use this argument to return the compiled output, instead of a regular expression. This is not exposed on the options to prevent end-users from mutating the result.
 * @param {Boolean} `returnState` Implementors may use this argument to return the state from the parsed glob with the returned regular expression.
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */

picomatch$2.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
  if (!input || typeof input !== 'string') {
    throw new TypeError('Expected a non-empty string');
  }

  let parsed = { negated: false, fastpaths: true };

  if (options.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
    parsed.output = parse.fastpaths(input, options);
  }

  if (!parsed.output) {
    parsed = parse(input, options);
  }

  return picomatch$2.compileRe(parsed, options, returnOutput, returnState);
};

/**
 * Create a regular expression from the given regex source string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.toRegex(source[, options]);
 *
 * const { output } = picomatch.parse('*.js');
 * console.log(picomatch.toRegex(output));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `source` Regular expression source string.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */

picomatch$2.toRegex = (source, options) => {
  try {
    const opts = options || {};
    return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''));
  } catch (err) {
    if (options && options.debug === true) throw err;
    return /$^/;
  }
};

/**
 * Picomatch constants.
 * @return {Object}
 */

picomatch$2.constants = constants$1;

/**
 * Expose "picomatch"
 */

var picomatch_1 = picomatch$2;

var picomatch$1 = picomatch_1;

const util = require$$0$3;
const braces = braces_1;
const picomatch = picomatch$1;
const utils$b = utils$f;
const isEmptyString = val => val === '' || val === './';

/**
 * Returns an array of strings that match one or more glob patterns.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm(list, patterns[, options]);
 *
 * console.log(mm(['a.js', 'a.txt'], ['*.js']));
 * //=> [ 'a.js' ]
 * ```
 * @param {String|Array<string>} `list` List of strings to match.
 * @param {String|Array<string>} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options)
 * @return {Array} Returns an array of matches
 * @summary false
 * @api public
 */

const micromatch$1 = (list, patterns, options) => {
  patterns = [].concat(patterns);
  list = [].concat(list);

  let omit = new Set();
  let keep = new Set();
  let items = new Set();
  let negatives = 0;

  let onResult = state => {
    items.add(state.output);
    if (options && options.onResult) {
      options.onResult(state);
    }
  };

  for (let i = 0; i < patterns.length; i++) {
    let isMatch = picomatch(String(patterns[i]), { ...options, onResult }, true);
    let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
    if (negated) negatives++;

    for (let item of list) {
      let matched = isMatch(item, true);

      let match = negated ? !matched.isMatch : matched.isMatch;
      if (!match) continue;

      if (negated) {
        omit.add(matched.output);
      } else {
        omit.delete(matched.output);
        keep.add(matched.output);
      }
    }
  }

  let result = negatives === patterns.length ? [...items] : [...keep];
  let matches = result.filter(item => !omit.has(item));

  if (options && matches.length === 0) {
    if (options.failglob === true) {
      throw new Error(`No matches found for "${patterns.join(', ')}"`);
    }

    if (options.nonull === true || options.nullglob === true) {
      return options.unescape ? patterns.map(p => p.replace(/\\/g, '')) : patterns;
    }
  }

  return matches;
};

/**
 * Backwards compatibility
 */

micromatch$1.match = micromatch$1;

/**
 * Returns a matcher function from the given glob `pattern` and `options`.
 * The returned function takes a string to match as its only argument and returns
 * true if the string is a match.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.matcher(pattern[, options]);
 *
 * const isMatch = mm.matcher('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @param {String} `pattern` Glob pattern
 * @param {Object} `options`
 * @return {Function} Returns a matcher function.
 * @api public
 */

micromatch$1.matcher = (pattern, options) => picomatch(pattern, options);

/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.isMatch(string, patterns[, options]);
 *
 * console.log(mm.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(mm.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String} `str` The string to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `[options]` See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch$1.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);

/**
 * Backwards compatibility
 */

micromatch$1.any = micromatch$1.isMatch;

/**
 * Returns a list of strings that _**do not match any**_ of the given `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.not(list, patterns[, options]);
 *
 * console.log(mm.not(['a.a', 'b.b', 'c.c'], '*.a'));
 * //=> ['b.b', 'c.c']
 * ```
 * @param {Array} `list` Array of strings to match.
 * @param {String|Array} `patterns` One or more glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Array} Returns an array of strings that **do not match** the given patterns.
 * @api public
 */

micromatch$1.not = (list, patterns, options = {}) => {
  patterns = [].concat(patterns).map(String);
  let result = new Set();
  let items = [];

  let onResult = state => {
    if (options.onResult) options.onResult(state);
    items.push(state.output);
  };

  let matches = new Set(micromatch$1(list, patterns, { ...options, onResult }));

  for (let item of items) {
    if (!matches.has(item)) {
      result.add(item);
    }
  }
  return [...result];
};

/**
 * Returns true if the given `string` contains the given pattern. Similar
 * to [.isMatch](#isMatch) but the pattern can match any part of the string.
 *
 * ```js
 * var mm = require('micromatch');
 * // mm.contains(string, pattern[, options]);
 *
 * console.log(mm.contains('aa/bb/cc', '*b'));
 * //=> true
 * console.log(mm.contains('aa/bb/cc', '*d'));
 * //=> false
 * ```
 * @param {String} `str` The string to match.
 * @param {String|Array} `patterns` Glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any of the patterns matches any part of `str`.
 * @api public
 */

micromatch$1.contains = (str, pattern, options) => {
  if (typeof str !== 'string') {
    throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
  }

  if (Array.isArray(pattern)) {
    return pattern.some(p => micromatch$1.contains(str, p, options));
  }

  if (typeof pattern === 'string') {
    if (isEmptyString(str) || isEmptyString(pattern)) {
      return false;
    }

    if (str.includes(pattern) || (str.startsWith('./') && str.slice(2).includes(pattern))) {
      return true;
    }
  }

  return micromatch$1.isMatch(str, pattern, { ...options, contains: true });
};

/**
 * Filter the keys of the given object with the given `glob` pattern
 * and `options`. Does not attempt to match nested keys. If you need this feature,
 * use [glob-object][] instead.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.matchKeys(object, patterns[, options]);
 *
 * const obj = { aa: 'a', ab: 'b', ac: 'c' };
 * console.log(mm.matchKeys(obj, '*b'));
 * //=> { ab: 'b' }
 * ```
 * @param {Object} `object` The object with keys to filter.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Object} Returns an object with only keys that match the given patterns.
 * @api public
 */

micromatch$1.matchKeys = (obj, patterns, options) => {
  if (!utils$b.isObject(obj)) {
    throw new TypeError('Expected the first argument to be an object');
  }
  let keys = micromatch$1(Object.keys(obj), patterns, options);
  let res = {};
  for (let key of keys) res[key] = obj[key];
  return res;
};

/**
 * Returns true if some of the strings in the given `list` match any of the given glob `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.some(list, patterns[, options]);
 *
 * console.log(mm.some(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // true
 * console.log(mm.some(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param {String|Array} `list` The string or array of strings to test. Returns as soon as the first match is found.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any `patterns` matches any of the strings in `list`
 * @api public
 */

micromatch$1.some = (list, patterns, options) => {
  let items = [].concat(list);

  for (let pattern of [].concat(patterns)) {
    let isMatch = picomatch(String(pattern), options);
    if (items.some(item => isMatch(item))) {
      return true;
    }
  }
  return false;
};

/**
 * Returns true if every string in the given `list` matches
 * any of the given glob `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.every(list, patterns[, options]);
 *
 * console.log(mm.every('foo.js', ['foo.js']));
 * // true
 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js']));
 * // true
 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // false
 * console.log(mm.every(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param {String|Array} `list` The string or array of strings to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if all `patterns` matches all of the strings in `list`
 * @api public
 */

micromatch$1.every = (list, patterns, options) => {
  let items = [].concat(list);

  for (let pattern of [].concat(patterns)) {
    let isMatch = picomatch(String(pattern), options);
    if (!items.every(item => isMatch(item))) {
      return false;
    }
  }
  return true;
};

/**
 * Returns true if **all** of the given `patterns` match
 * the specified string.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.all(string, patterns[, options]);
 *
 * console.log(mm.all('foo.js', ['foo.js']));
 * // true
 *
 * console.log(mm.all('foo.js', ['*.js', '!foo.js']));
 * // false
 *
 * console.log(mm.all('foo.js', ['*.js', 'foo.js']));
 * // true
 *
 * console.log(mm.all('foo.js', ['*.js', 'f*', '*o*', '*o.js']));
 * // true
 * ```
 * @param {String|Array} `str` The string to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch$1.all = (str, patterns, options) => {
  if (typeof str !== 'string') {
    throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
  }

  return [].concat(patterns).every(p => picomatch(p, options)(str));
};

/**
 * Returns an array of matches captured by `pattern` in `string, or `null` if the pattern did not match.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.capture(pattern, string[, options]);
 *
 * console.log(mm.capture('test/*.js', 'test/foo.js'));
 * //=> ['foo']
 * console.log(mm.capture('test/*.js', 'foo/bar.css'));
 * //=> null
 * ```
 * @param {String} `glob` Glob pattern to use for matching.
 * @param {String} `input` String to match
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Array|null} Returns an array of captures if the input matches the glob pattern, otherwise `null`.
 * @api public
 */

micromatch$1.capture = (glob, input, options) => {
  let posix = utils$b.isWindows(options);
  let regex = picomatch.makeRe(String(glob), { ...options, capture: true });
  let match = regex.exec(posix ? utils$b.toPosixSlashes(input) : input);

  if (match) {
    return match.slice(1).map(v => v === void 0 ? '' : v);
  }
};

/**
 * Create a regular expression from the given glob `pattern`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.makeRe(pattern[, options]);
 *
 * console.log(mm.makeRe('*.js'));
 * //=> /^(?:(\.[\\\/])?(?!\.)(?=.)[^\/]*?\.js)$/
 * ```
 * @param {String} `pattern` A glob pattern to convert to regex.
 * @param {Object} `options`
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */

micromatch$1.makeRe = (...args) => picomatch.makeRe(...args);

/**
 * Scan a glob pattern to separate the pattern into segments. Used
 * by the [split](#split) method.
 *
 * ```js
 * const mm = require('micromatch');
 * const state = mm.scan(pattern[, options]);
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */

micromatch$1.scan = (...args) => picomatch.scan(...args);

/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const mm = require('micromatch');
 * const state = mm.parse(pattern[, options]);
 * ```
 * @param {String} `glob`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as regex source string.
 * @api public
 */

micromatch$1.parse = (patterns, options) => {
  let res = [];
  for (let pattern of [].concat(patterns || [])) {
    for (let str of braces(String(pattern), options)) {
      res.push(picomatch.parse(str, options));
    }
  }
  return res;
};

/**
 * Process the given brace `pattern`.
 *
 * ```js
 * const { braces } = require('micromatch');
 * console.log(braces('foo/{a,b,c}/bar'));
 * //=> [ 'foo/(a|b|c)/bar' ]
 *
 * console.log(braces('foo/{a,b,c}/bar', { expand: true }));
 * //=> [ 'foo/a/bar', 'foo/b/bar', 'foo/c/bar' ]
 * ```
 * @param {String} `pattern` String with brace pattern to process.
 * @param {Object} `options` Any [options](#options) to change how expansion is performed. See the [braces][] library for all available options.
 * @return {Array}
 * @api public
 */

micromatch$1.braces = (pattern, options) => {
  if (typeof pattern !== 'string') throw new TypeError('Expected a string');
  if ((options && options.nobrace === true) || !/\{.*\}/.test(pattern)) {
    return [pattern];
  }
  return braces(pattern, options);
};

/**
 * Expand braces
 */

micromatch$1.braceExpand = (pattern, options) => {
  if (typeof pattern !== 'string') throw new TypeError('Expected a string');
  return micromatch$1.braces(pattern, { ...options, expand: true });
};

/**
 * Expose micromatch
 */

var micromatch_1 = micromatch$1;

Object.defineProperty(pattern$1, "__esModule", { value: true });
pattern$1.removeDuplicateSlashes = pattern$1.matchAny = pattern$1.convertPatternsToRe = pattern$1.makeRe = pattern$1.getPatternParts = pattern$1.expandBraceExpansion = pattern$1.expandPatternsWithBraceExpansion = pattern$1.isAffectDepthOfReadingPattern = pattern$1.endsWithSlashGlobStar = pattern$1.hasGlobStar = pattern$1.getBaseDirectory = pattern$1.isPatternRelatedToParentDirectory = pattern$1.getPatternsOutsideCurrentDirectory = pattern$1.getPatternsInsideCurrentDirectory = pattern$1.getPositivePatterns = pattern$1.getNegativePatterns = pattern$1.isPositivePattern = pattern$1.isNegativePattern = pattern$1.convertToNegativePattern = pattern$1.convertToPositivePattern = pattern$1.isDynamicPattern = pattern$1.isStaticPattern = void 0;
const path$5 = require$$1;
const globParent = globParent$1;
const micromatch = micromatch_1;
const GLOBSTAR = '**';
const ESCAPE_SYMBOL = '\\';
const COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/;
const REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[[^[]*]/;
const REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\([^(]*\|[^|]*\)/;
const GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\([^(]*\)/;
const BRACE_EXPANSION_SEPARATORS_RE = /,|\.\./;
/**
 * Matches a sequence of two or more consecutive slashes, excluding the first two slashes at the beginning of the string.
 * The latter is due to the presence of the device path at the beginning of the UNC path.
 */
const DOUBLE_SLASH_RE = /(?!^)\/{2,}/g;
function isStaticPattern(pattern, options = {}) {
    return !isDynamicPattern(pattern, options);
}
pattern$1.isStaticPattern = isStaticPattern;
function isDynamicPattern(pattern, options = {}) {
    /**
     * A special case with an empty string is necessary for matching patterns that start with a forward slash.
     * An empty string cannot be a dynamic pattern.
     * For example, the pattern `/lib/*` will be spread into parts: '', 'lib', '*'.
     */
    if (pattern === '') {
        return false;
    }
    /**
     * When the `caseSensitiveMatch` option is disabled, all patterns must be marked as dynamic, because we cannot check
     * filepath directly (without read directory).
     */
    if (options.caseSensitiveMatch === false || pattern.includes(ESCAPE_SYMBOL)) {
        return true;
    }
    if (COMMON_GLOB_SYMBOLS_RE.test(pattern) || REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) || REGEX_GROUP_SYMBOLS_RE.test(pattern)) {
        return true;
    }
    if (options.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern)) {
        return true;
    }
    if (options.braceExpansion !== false && hasBraceExpansion(pattern)) {
        return true;
    }
    return false;
}
pattern$1.isDynamicPattern = isDynamicPattern;
function hasBraceExpansion(pattern) {
    const openingBraceIndex = pattern.indexOf('{');
    if (openingBraceIndex === -1) {
        return false;
    }
    const closingBraceIndex = pattern.indexOf('}', openingBraceIndex + 1);
    if (closingBraceIndex === -1) {
        return false;
    }
    const braceContent = pattern.slice(openingBraceIndex, closingBraceIndex);
    return BRACE_EXPANSION_SEPARATORS_RE.test(braceContent);
}
function convertToPositivePattern(pattern) {
    return isNegativePattern(pattern) ? pattern.slice(1) : pattern;
}
pattern$1.convertToPositivePattern = convertToPositivePattern;
function convertToNegativePattern(pattern) {
    return '!' + pattern;
}
pattern$1.convertToNegativePattern = convertToNegativePattern;
function isNegativePattern(pattern) {
    return pattern.startsWith('!') && pattern[1] !== '(';
}
pattern$1.isNegativePattern = isNegativePattern;
function isPositivePattern(pattern) {
    return !isNegativePattern(pattern);
}
pattern$1.isPositivePattern = isPositivePattern;
function getNegativePatterns(patterns) {
    return patterns.filter(isNegativePattern);
}
pattern$1.getNegativePatterns = getNegativePatterns;
function getPositivePatterns$1(patterns) {
    return patterns.filter(isPositivePattern);
}
pattern$1.getPositivePatterns = getPositivePatterns$1;
/**
 * Returns patterns that can be applied inside the current directory.
 *
 * @example
 * // ['./*', '*', 'a/*']
 * getPatternsInsideCurrentDirectory(['./*', '*', 'a/*', '../*', './../*'])
 */
function getPatternsInsideCurrentDirectory(patterns) {
    return patterns.filter((pattern) => !isPatternRelatedToParentDirectory(pattern));
}
pattern$1.getPatternsInsideCurrentDirectory = getPatternsInsideCurrentDirectory;
/**
 * Returns patterns to be expanded relative to (outside) the current directory.
 *
 * @example
 * // ['../*', './../*']
 * getPatternsInsideCurrentDirectory(['./*', '*', 'a/*', '../*', './../*'])
 */
function getPatternsOutsideCurrentDirectory(patterns) {
    return patterns.filter(isPatternRelatedToParentDirectory);
}
pattern$1.getPatternsOutsideCurrentDirectory = getPatternsOutsideCurrentDirectory;
function isPatternRelatedToParentDirectory(pattern) {
    return pattern.startsWith('..') || pattern.startsWith('./..');
}
pattern$1.isPatternRelatedToParentDirectory = isPatternRelatedToParentDirectory;
function getBaseDirectory(pattern) {
    return globParent(pattern, { flipBackslashes: false });
}
pattern$1.getBaseDirectory = getBaseDirectory;
function hasGlobStar(pattern) {
    return pattern.includes(GLOBSTAR);
}
pattern$1.hasGlobStar = hasGlobStar;
function endsWithSlashGlobStar(pattern) {
    return pattern.endsWith('/' + GLOBSTAR);
}
pattern$1.endsWithSlashGlobStar = endsWithSlashGlobStar;
function isAffectDepthOfReadingPattern(pattern) {
    const basename = path$5.basename(pattern);
    return endsWithSlashGlobStar(pattern) || isStaticPattern(basename);
}
pattern$1.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern;
function expandPatternsWithBraceExpansion(patterns) {
    return patterns.reduce((collection, pattern) => {
        return collection.concat(expandBraceExpansion(pattern));
    }, []);
}
pattern$1.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion;
function expandBraceExpansion(pattern) {
    const patterns = micromatch.braces(pattern, { expand: true, nodupes: true, keepEscaping: true });
    /**
     * Sort the patterns by length so that the same depth patterns are processed side by side.
     * `a/{b,}/{c,}/*` – `['a///*', 'a/b//*', 'a//c/*', 'a/b/c/*']`
     */
    patterns.sort((a, b) => a.length - b.length);
    /**
     * Micromatch can return an empty string in the case of patterns like `{a,}`.
     */
    return patterns.filter((pattern) => pattern !== '');
}
pattern$1.expandBraceExpansion = expandBraceExpansion;
function getPatternParts(pattern, options) {
    let { parts } = micromatch.scan(pattern, Object.assign(Object.assign({}, options), { parts: true }));
    /**
     * The scan method returns an empty array in some cases.
     * See micromatch/picomatch#58 for more details.
     */
    if (parts.length === 0) {
        parts = [pattern];
    }
    /**
     * The scan method does not return an empty part for the pattern with a forward slash.
     * This is another part of micromatch/picomatch#58.
     */
    if (parts[0].startsWith('/')) {
        parts[0] = parts[0].slice(1);
        parts.unshift('');
    }
    return parts;
}
pattern$1.getPatternParts = getPatternParts;
function makeRe(pattern, options) {
    return micromatch.makeRe(pattern, options);
}
pattern$1.makeRe = makeRe;
function convertPatternsToRe(patterns, options) {
    return patterns.map((pattern) => makeRe(pattern, options));
}
pattern$1.convertPatternsToRe = convertPatternsToRe;
function matchAny(entry, patternsRe) {
    return patternsRe.some((patternRe) => patternRe.test(entry));
}
pattern$1.matchAny = matchAny;
/**
 * This package only works with forward slashes as a path separator.
 * Because of this, we cannot use the standard `path.normalize` method, because on Windows platform it will use of backslashes.
 */
function removeDuplicateSlashes(pattern) {
    return pattern.replace(DOUBLE_SLASH_RE, '/');
}
pattern$1.removeDuplicateSlashes = removeDuplicateSlashes;

var stream$4 = {};

/*
 * merge2
 * https://github.com/teambition/merge2
 *
 * Copyright (c) 2014-2020 Teambition
 * Licensed under the MIT license.
 */
const Stream = require$$0$1;
const PassThrough = Stream.PassThrough;
const slice = Array.prototype.slice;

var merge2_1 = merge2$1;

function merge2$1 () {
  const streamsQueue = [];
  const args = slice.call(arguments);
  let merging = false;
  let options = args[args.length - 1];

  if (options && !Array.isArray(options) && options.pipe == null) {
    args.pop();
  } else {
    options = {};
  }

  const doEnd = options.end !== false;
  const doPipeError = options.pipeError === true;
  if (options.objectMode == null) {
    options.objectMode = true;
  }
  if (options.highWaterMark == null) {
    options.highWaterMark = 64 * 1024;
  }
  const mergedStream = PassThrough(options);

  function addStream () {
    for (let i = 0, len = arguments.length; i < len; i++) {
      streamsQueue.push(pauseStreams(arguments[i], options));
    }
    mergeStream();
    return this
  }

  function mergeStream () {
    if (merging) {
      return
    }
    merging = true;

    let streams = streamsQueue.shift();
    if (!streams) {
      process.nextTick(endStream);
      return
    }
    if (!Array.isArray(streams)) {
      streams = [streams];
    }

    let pipesCount = streams.length + 1;

    function next () {
      if (--pipesCount > 0) {
        return
      }
      merging = false;
      mergeStream();
    }

    function pipe (stream) {
      function onend () {
        stream.removeListener('merge2UnpipeEnd', onend);
        stream.removeListener('end', onend);
        if (doPipeError) {
          stream.removeListener('error', onerror);
        }
        next();
      }
      function onerror (err) {
        mergedStream.emit('error', err);
      }
      // skip ended stream
      if (stream._readableState.endEmitted) {
        return next()
      }

      stream.on('merge2UnpipeEnd', onend);
      stream.on('end', onend);

      if (doPipeError) {
        stream.on('error', onerror);
      }

      stream.pipe(mergedStream, { end: false });
      // compatible for old stream
      stream.resume();
    }

    for (let i = 0; i < streams.length; i++) {
      pipe(streams[i]);
    }

    next();
  }

  function endStream () {
    merging = false;
    // emit 'queueDrain' when all streams merged.
    mergedStream.emit('queueDrain');
    if (doEnd) {
      mergedStream.end();
    }
  }

  mergedStream.setMaxListeners(0);
  mergedStream.add = addStream;
  mergedStream.on('unpipe', function (stream) {
    stream.emit('merge2UnpipeEnd');
  });

  if (args.length) {
    addStream.apply(null, args);
  }
  return mergedStream
}

// check and pause streams for pipe.
function pauseStreams (streams, options) {
  if (!Array.isArray(streams)) {
    // Backwards-compat with old-style streams
    if (!streams._readableState && streams.pipe) {
      streams = streams.pipe(PassThrough(options));
    }
    if (!streams._readableState || !streams.pause || !streams.pipe) {
      throw new Error('Only readable stream can be merged.')
    }
    streams.pause();
  } else {
    for (let i = 0, len = streams.length; i < len; i++) {
      streams[i] = pauseStreams(streams[i], options);
    }
  }
  return streams
}

Object.defineProperty(stream$4, "__esModule", { value: true });
stream$4.merge = void 0;
const merge2 = merge2_1;
function merge(streams) {
    const mergedStream = merge2(streams);
    streams.forEach((stream) => {
        stream.once('error', (error) => mergedStream.emit('error', error));
    });
    mergedStream.once('close', () => propagateCloseEventToSources(streams));
    mergedStream.once('end', () => propagateCloseEventToSources(streams));
    return mergedStream;
}
stream$4.merge = merge;
function propagateCloseEventToSources(streams) {
    streams.forEach((stream) => stream.emit('close'));
}

var string$1 = {};

Object.defineProperty(string$1, "__esModule", { value: true });
string$1.isEmpty = string$1.isString = void 0;
function isString(input) {
    return typeof input === 'string';
}
string$1.isString = isString;
function isEmpty(input) {
    return input === '';
}
string$1.isEmpty = isEmpty;

Object.defineProperty(utils$k, "__esModule", { value: true });
utils$k.string = utils$k.stream = utils$k.pattern = utils$k.path = utils$k.fs = utils$k.errno = utils$k.array = void 0;
const array = array$1;
utils$k.array = array;
const errno = errno$1;
utils$k.errno = errno;
const fs$6 = fs$7;
utils$k.fs = fs$6;
const path$4 = path$9;
utils$k.path = path$4;
const pattern = pattern$1;
utils$k.pattern = pattern;
const stream$3 = stream$4;
utils$k.stream = stream$3;
const string = string$1;
utils$k.string = string;

Object.defineProperty(tasks, "__esModule", { value: true });
tasks.convertPatternGroupToTask = tasks.convertPatternGroupsToTasks = tasks.groupPatternsByBaseDirectory = tasks.getNegativePatternsAsPositive = tasks.getPositivePatterns = tasks.convertPatternsToTasks = tasks.generate = void 0;
const utils$a = utils$k;
function generate(input, settings) {
    const patterns = processPatterns(input, settings);
    const ignore = processPatterns(settings.ignore, settings);
    const positivePatterns = getPositivePatterns(patterns);
    const negativePatterns = getNegativePatternsAsPositive(patterns, ignore);
    const staticPatterns = positivePatterns.filter((pattern) => utils$a.pattern.isStaticPattern(pattern, settings));
    const dynamicPatterns = positivePatterns.filter((pattern) => utils$a.pattern.isDynamicPattern(pattern, settings));
    const staticTasks = convertPatternsToTasks(staticPatterns, negativePatterns, /* dynamic */ false);
    const dynamicTasks = convertPatternsToTasks(dynamicPatterns, negativePatterns, /* dynamic */ true);
    return staticTasks.concat(dynamicTasks);
}
tasks.generate = generate;
function processPatterns(input, settings) {
    let patterns = input;
    /**
     * The original pattern like `{,*,**,a/*}` can lead to problems checking the depth when matching entry
     * and some problems with the micromatch package (see fast-glob issues: #365, #394).
     *
     * To solve this problem, we expand all patterns containing brace expansion. This can lead to a slight slowdown
     * in matching in the case of a large set of patterns after expansion.
     */
    if (settings.braceExpansion) {
        patterns = utils$a.pattern.expandPatternsWithBraceExpansion(patterns);
    }
    /**
     * If the `baseNameMatch` option is enabled, we must add globstar to patterns, so that they can be used
     * at any nesting level.
     *
     * We do this here, because otherwise we have to complicate the filtering logic. For example, we need to change
     * the pattern in the filter before creating a regular expression. There is no need to change the patterns
     * in the application. Only on the input.
     */
    if (settings.baseNameMatch) {
        patterns = patterns.map((pattern) => pattern.includes('/') ? pattern : `**/${pattern}`);
    }
    /**
     * This method also removes duplicate slashes that may have been in the pattern or formed as a result of expansion.
     */
    return patterns.map((pattern) => utils$a.pattern.removeDuplicateSlashes(pattern));
}
/**
 * Returns tasks grouped by basic pattern directories.
 *
 * Patterns that can be found inside (`./`) and outside (`../`) the current directory are handled separately.
 * This is necessary because directory traversal starts at the base directory and goes deeper.
 */
function convertPatternsToTasks(positive, negative, dynamic) {
    const tasks = [];
    const patternsOutsideCurrentDirectory = utils$a.pattern.getPatternsOutsideCurrentDirectory(positive);
    const patternsInsideCurrentDirectory = utils$a.pattern.getPatternsInsideCurrentDirectory(positive);
    const outsideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsOutsideCurrentDirectory);
    const insideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsInsideCurrentDirectory);
    tasks.push(...convertPatternGroupsToTasks(outsideCurrentDirectoryGroup, negative, dynamic));
    /*
     * For the sake of reducing future accesses to the file system, we merge all tasks within the current directory
     * into a global task, if at least one pattern refers to the root (`.`). In this case, the global task covers the rest.
     */
    if ('.' in insideCurrentDirectoryGroup) {
        tasks.push(convertPatternGroupToTask('.', patternsInsideCurrentDirectory, negative, dynamic));
    }
    else {
        tasks.push(...convertPatternGroupsToTasks(insideCurrentDirectoryGroup, negative, dynamic));
    }
    return tasks;
}
tasks.convertPatternsToTasks = convertPatternsToTasks;
function getPositivePatterns(patterns) {
    return utils$a.pattern.getPositivePatterns(patterns);
}
tasks.getPositivePatterns = getPositivePatterns;
function getNegativePatternsAsPositive(patterns, ignore) {
    const negative = utils$a.pattern.getNegativePatterns(patterns).concat(ignore);
    const positive = negative.map(utils$a.pattern.convertToPositivePattern);
    return positive;
}
tasks.getNegativePatternsAsPositive = getNegativePatternsAsPositive;
function groupPatternsByBaseDirectory(patterns) {
    const group = {};
    return patterns.reduce((collection, pattern) => {
        const base = utils$a.pattern.getBaseDirectory(pattern);
        if (base in collection) {
            collection[base].push(pattern);
        }
        else {
            collection[base] = [pattern];
        }
        return collection;
    }, group);
}
tasks.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory;
function convertPatternGroupsToTasks(positive, negative, dynamic) {
    return Object.keys(positive).map((base) => {
        return convertPatternGroupToTask(base, positive[base], negative, dynamic);
    });
}
tasks.convertPatternGroupsToTasks = convertPatternGroupsToTasks;
function convertPatternGroupToTask(base, positive, negative, dynamic) {
    return {
        dynamic,
        positive,
        negative,
        base,
        patterns: [].concat(positive, negative.map(utils$a.pattern.convertToNegativePattern))
    };
}
tasks.convertPatternGroupToTask = convertPatternGroupToTask;

var async$7 = {};

var async$6 = {};

var out$3 = {};

var async$5 = {};

var async$4 = {};

var out$2 = {};

var async$3 = {};

var out$1 = {};

var async$2 = {};

Object.defineProperty(async$2, "__esModule", { value: true });
async$2.read = void 0;
function read$3(path, settings, callback) {
    settings.fs.lstat(path, (lstatError, lstat) => {
        if (lstatError !== null) {
            callFailureCallback$2(callback, lstatError);
            return;
        }
        if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
            callSuccessCallback$2(callback, lstat);
            return;
        }
        settings.fs.stat(path, (statError, stat) => {
            if (statError !== null) {
                if (settings.throwErrorOnBrokenSymbolicLink) {
                    callFailureCallback$2(callback, statError);
                    return;
                }
                callSuccessCallback$2(callback, lstat);
                return;
            }
            if (settings.markSymbolicLink) {
                stat.isSymbolicLink = () => true;
            }
            callSuccessCallback$2(callback, stat);
        });
    });
}
async$2.read = read$3;
function callFailureCallback$2(callback, error) {
    callback(error);
}
function callSuccessCallback$2(callback, result) {
    callback(null, result);
}

var sync$7 = {};

Object.defineProperty(sync$7, "__esModule", { value: true });
sync$7.read = void 0;
function read$2(path, settings) {
    const lstat = settings.fs.lstatSync(path);
    if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
        return lstat;
    }
    try {
        const stat = settings.fs.statSync(path);
        if (settings.markSymbolicLink) {
            stat.isSymbolicLink = () => true;
        }
        return stat;
    }
    catch (error) {
        if (!settings.throwErrorOnBrokenSymbolicLink) {
            return lstat;
        }
        throw error;
    }
}
sync$7.read = read$2;

var settings$3 = {};

var fs$5 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
	const fs = require$$0$2;
	exports.FILE_SYSTEM_ADAPTER = {
	    lstat: fs.lstat,
	    stat: fs.stat,
	    lstatSync: fs.lstatSync,
	    statSync: fs.statSync
	};
	function createFileSystemAdapter(fsMethods) {
	    if (fsMethods === undefined) {
	        return exports.FILE_SYSTEM_ADAPTER;
	    }
	    return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
	}
	exports.createFileSystemAdapter = createFileSystemAdapter; 
} (fs$5));

Object.defineProperty(settings$3, "__esModule", { value: true });
const fs$4 = fs$5;
let Settings$2 = class Settings {
    constructor(_options = {}) {
        this._options = _options;
        this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, true);
        this.fs = fs$4.createFileSystemAdapter(this._options.fs);
        this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, false);
        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
    }
    _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value;
    }
};
settings$3.default = Settings$2;

Object.defineProperty(out$1, "__esModule", { value: true });
out$1.statSync = out$1.stat = out$1.Settings = void 0;
const async$1 = async$2;
const sync$6 = sync$7;
const settings_1$3 = settings$3;
out$1.Settings = settings_1$3.default;
function stat(path, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === 'function') {
        async$1.read(path, getSettings$2(), optionsOrSettingsOrCallback);
        return;
    }
    async$1.read(path, getSettings$2(optionsOrSettingsOrCallback), callback);
}
out$1.stat = stat;
function statSync(path, optionsOrSettings) {
    const settings = getSettings$2(optionsOrSettings);
    return sync$6.read(path, settings);
}
out$1.statSync = statSync;
function getSettings$2(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1$3.default) {
        return settingsOrOptions;
    }
    return new settings_1$3.default(settingsOrOptions);
}

/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

let promise;

var queueMicrotask_1 = typeof queueMicrotask === 'function'
  ? queueMicrotask.bind(typeof window !== 'undefined' ? window : commonjsGlobal)
  // reuse resolved promise, and allocate it lazily
  : cb => (promise || (promise = Promise.resolve()))
    .then(cb)
    .catch(err => setTimeout(() => { throw err }, 0));

/*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

var runParallel_1 = runParallel;

const queueMicrotask$1 = queueMicrotask_1;

function runParallel (tasks, cb) {
  let results, pending, keys;
  let isSync = true;

  if (Array.isArray(tasks)) {
    results = [];
    pending = tasks.length;
  } else {
    keys = Object.keys(tasks);
    results = {};
    pending = keys.length;
  }

  function done (err) {
    function end () {
      if (cb) cb(err, results);
      cb = null;
    }
    if (isSync) queueMicrotask$1(end);
    else end();
  }

  function each (i, err, result) {
    results[i] = result;
    if (--pending === 0 || err) {
      done(err);
    }
  }

  if (!pending) {
    // empty
    done(null);
  } else if (keys) {
    // object
    keys.forEach(function (key) {
      tasks[key](function (err, result) { each(key, err, result); });
    });
  } else {
    // array
    tasks.forEach(function (task, i) {
      task(function (err, result) { each(i, err, result); });
    });
  }

  isSync = false;
}

var constants = {};

Object.defineProperty(constants, "__esModule", { value: true });
constants.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0;
const NODE_PROCESS_VERSION_PARTS = process.versions.node.split('.');
if (NODE_PROCESS_VERSION_PARTS[0] === undefined || NODE_PROCESS_VERSION_PARTS[1] === undefined) {
    throw new Error(`Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`);
}
const MAJOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[0], 10);
const MINOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[1], 10);
const SUPPORTED_MAJOR_VERSION = 10;
const SUPPORTED_MINOR_VERSION = 10;
const IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION;
const IS_MATCHED_BY_MAJOR_AND_MINOR = MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= SUPPORTED_MINOR_VERSION;
/**
 * IS `true` for Node.js 10.10 and greater.
 */
constants.IS_SUPPORT_READDIR_WITH_FILE_TYPES = IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR;

var utils$9 = {};

var fs$3 = {};

Object.defineProperty(fs$3, "__esModule", { value: true });
fs$3.createDirentFromStats = void 0;
class DirentFromStats {
    constructor(name, stats) {
        this.name = name;
        this.isBlockDevice = stats.isBlockDevice.bind(stats);
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
        this.isDirectory = stats.isDirectory.bind(stats);
        this.isFIFO = stats.isFIFO.bind(stats);
        this.isFile = stats.isFile.bind(stats);
        this.isSocket = stats.isSocket.bind(stats);
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
    }
}
function createDirentFromStats(name, stats) {
    return new DirentFromStats(name, stats);
}
fs$3.createDirentFromStats = createDirentFromStats;

Object.defineProperty(utils$9, "__esModule", { value: true });
utils$9.fs = void 0;
const fs$2 = fs$3;
utils$9.fs = fs$2;

var common$6 = {};

Object.defineProperty(common$6, "__esModule", { value: true });
common$6.joinPathSegments = void 0;
function joinPathSegments$1(a, b, separator) {
    /**
     * The correct handling of cases when the first segment is a root (`/`, `C:/`) or UNC path (`//?/C:/`).
     */
    if (a.endsWith(separator)) {
        return a + b;
    }
    return a + separator + b;
}
common$6.joinPathSegments = joinPathSegments$1;

Object.defineProperty(async$3, "__esModule", { value: true });
async$3.readdir = async$3.readdirWithFileTypes = async$3.read = void 0;
const fsStat$5 = out$1;
const rpl = runParallel_1;
const constants_1$1 = constants;
const utils$8 = utils$9;
const common$5 = common$6;
function read$1(directory, settings, callback) {
    if (!settings.stats && constants_1$1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        readdirWithFileTypes$1(directory, settings, callback);
        return;
    }
    readdir$1(directory, settings, callback);
}
async$3.read = read$1;
function readdirWithFileTypes$1(directory, settings, callback) {
    settings.fs.readdir(directory, { withFileTypes: true }, (readdirError, dirents) => {
        if (readdirError !== null) {
            callFailureCallback$1(callback, readdirError);
            return;
        }
        const entries = dirents.map((dirent) => ({
            dirent,
            name: dirent.name,
            path: common$5.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
        }));
        if (!settings.followSymbolicLinks) {
            callSuccessCallback$1(callback, entries);
            return;
        }
        const tasks = entries.map((entry) => makeRplTaskEntry(entry, settings));
        rpl(tasks, (rplError, rplEntries) => {
            if (rplError !== null) {
                callFailureCallback$1(callback, rplError);
                return;
            }
            callSuccessCallback$1(callback, rplEntries);
        });
    });
}
async$3.readdirWithFileTypes = readdirWithFileTypes$1;
function makeRplTaskEntry(entry, settings) {
    return (done) => {
        if (!entry.dirent.isSymbolicLink()) {
            done(null, entry);
            return;
        }
        settings.fs.stat(entry.path, (statError, stats) => {
            if (statError !== null) {
                if (settings.throwErrorOnBrokenSymbolicLink) {
                    done(statError);
                    return;
                }
                done(null, entry);
                return;
            }
            entry.dirent = utils$8.fs.createDirentFromStats(entry.name, stats);
            done(null, entry);
        });
    };
}
function readdir$1(directory, settings, callback) {
    settings.fs.readdir(directory, (readdirError, names) => {
        if (readdirError !== null) {
            callFailureCallback$1(callback, readdirError);
            return;
        }
        const tasks = names.map((name) => {
            const path = common$5.joinPathSegments(directory, name, settings.pathSegmentSeparator);
            return (done) => {
                fsStat$5.stat(path, settings.fsStatSettings, (error, stats) => {
                    if (error !== null) {
                        done(error);
                        return;
                    }
                    const entry = {
                        name,
                        path,
                        dirent: utils$8.fs.createDirentFromStats(name, stats)
                    };
                    if (settings.stats) {
                        entry.stats = stats;
                    }
                    done(null, entry);
                });
            };
        });
        rpl(tasks, (rplError, entries) => {
            if (rplError !== null) {
                callFailureCallback$1(callback, rplError);
                return;
            }
            callSuccessCallback$1(callback, entries);
        });
    });
}
async$3.readdir = readdir$1;
function callFailureCallback$1(callback, error) {
    callback(error);
}
function callSuccessCallback$1(callback, result) {
    callback(null, result);
}

var sync$5 = {};

Object.defineProperty(sync$5, "__esModule", { value: true });
sync$5.readdir = sync$5.readdirWithFileTypes = sync$5.read = void 0;
const fsStat$4 = out$1;
const constants_1 = constants;
const utils$7 = utils$9;
const common$4 = common$6;
function read(directory, settings) {
    if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        return readdirWithFileTypes(directory, settings);
    }
    return readdir(directory, settings);
}
sync$5.read = read;
function readdirWithFileTypes(directory, settings) {
    const dirents = settings.fs.readdirSync(directory, { withFileTypes: true });
    return dirents.map((dirent) => {
        const entry = {
            dirent,
            name: dirent.name,
            path: common$4.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
        };
        if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) {
            try {
                const stats = settings.fs.statSync(entry.path);
                entry.dirent = utils$7.fs.createDirentFromStats(entry.name, stats);
            }
            catch (error) {
                if (settings.throwErrorOnBrokenSymbolicLink) {
                    throw error;
                }
            }
        }
        return entry;
    });
}
sync$5.readdirWithFileTypes = readdirWithFileTypes;
function readdir(directory, settings) {
    const names = settings.fs.readdirSync(directory);
    return names.map((name) => {
        const entryPath = common$4.joinPathSegments(directory, name, settings.pathSegmentSeparator);
        const stats = fsStat$4.statSync(entryPath, settings.fsStatSettings);
        const entry = {
            name,
            path: entryPath,
            dirent: utils$7.fs.createDirentFromStats(name, stats)
        };
        if (settings.stats) {
            entry.stats = stats;
        }
        return entry;
    });
}
sync$5.readdir = readdir;

var settings$2 = {};

var fs$1 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
	const fs = require$$0$2;
	exports.FILE_SYSTEM_ADAPTER = {
	    lstat: fs.lstat,
	    stat: fs.stat,
	    lstatSync: fs.lstatSync,
	    statSync: fs.statSync,
	    readdir: fs.readdir,
	    readdirSync: fs.readdirSync
	};
	function createFileSystemAdapter(fsMethods) {
	    if (fsMethods === undefined) {
	        return exports.FILE_SYSTEM_ADAPTER;
	    }
	    return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
	}
	exports.createFileSystemAdapter = createFileSystemAdapter; 
} (fs$1));

Object.defineProperty(settings$2, "__esModule", { value: true });
const path$3 = require$$1;
const fsStat$3 = out$1;
const fs = fs$1;
let Settings$1 = class Settings {
    constructor(_options = {}) {
        this._options = _options;
        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, false);
        this.fs = fs.createFileSystemAdapter(this._options.fs);
        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path$3.sep);
        this.stats = this._getValue(this._options.stats, false);
        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
        this.fsStatSettings = new fsStat$3.Settings({
            followSymbolicLink: this.followSymbolicLinks,
            fs: this.fs,
            throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink
        });
    }
    _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value;
    }
};
settings$2.default = Settings$1;

Object.defineProperty(out$2, "__esModule", { value: true });
out$2.Settings = out$2.scandirSync = out$2.scandir = void 0;
const async = async$3;
const sync$4 = sync$5;
const settings_1$2 = settings$2;
out$2.Settings = settings_1$2.default;
function scandir(path, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === 'function') {
        async.read(path, getSettings$1(), optionsOrSettingsOrCallback);
        return;
    }
    async.read(path, getSettings$1(optionsOrSettingsOrCallback), callback);
}
out$2.scandir = scandir;
function scandirSync(path, optionsOrSettings) {
    const settings = getSettings$1(optionsOrSettings);
    return sync$4.read(path, settings);
}
out$2.scandirSync = scandirSync;
function getSettings$1(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1$2.default) {
        return settingsOrOptions;
    }
    return new settings_1$2.default(settingsOrOptions);
}

var queue = {exports: {}};

function reusify$1 (Constructor) {
  var head = new Constructor();
  var tail = head;

  function get () {
    var current = head;

    if (current.next) {
      head = current.next;
    } else {
      head = new Constructor();
      tail = head;
    }

    current.next = null;

    return current
  }

  function release (obj) {
    tail.next = obj;
    tail = obj;
  }

  return {
    get: get,
    release: release
  }
}

var reusify_1 = reusify$1;

/* eslint-disable no-var */

var reusify = reusify_1;

function fastqueue (context, worker, concurrency) {
  if (typeof context === 'function') {
    concurrency = worker;
    worker = context;
    context = null;
  }

  if (concurrency < 1) {
    throw new Error('fastqueue concurrency must be greater than 1')
  }

  var cache = reusify(Task);
  var queueHead = null;
  var queueTail = null;
  var _running = 0;
  var errorHandler = null;

  var self = {
    push: push,
    drain: noop,
    saturated: noop,
    pause: pause,
    paused: false,
    concurrency: concurrency,
    running: running,
    resume: resume,
    idle: idle,
    length: length,
    getQueue: getQueue,
    unshift: unshift,
    empty: noop,
    kill: kill,
    killAndDrain: killAndDrain,
    error: error
  };

  return self

  function running () {
    return _running
  }

  function pause () {
    self.paused = true;
  }

  function length () {
    var current = queueHead;
    var counter = 0;

    while (current) {
      current = current.next;
      counter++;
    }

    return counter
  }

  function getQueue () {
    var current = queueHead;
    var tasks = [];

    while (current) {
      tasks.push(current.value);
      current = current.next;
    }

    return tasks
  }

  function resume () {
    if (!self.paused) return
    self.paused = false;
    for (var i = 0; i < self.concurrency; i++) {
      _running++;
      release();
    }
  }

  function idle () {
    return _running === 0 && self.length() === 0
  }

  function push (value, done) {
    var current = cache.get();

    current.context = context;
    current.release = release;
    current.value = value;
    current.callback = done || noop;
    current.errorHandler = errorHandler;

    if (_running === self.concurrency || self.paused) {
      if (queueTail) {
        queueTail.next = current;
        queueTail = current;
      } else {
        queueHead = current;
        queueTail = current;
        self.saturated();
      }
    } else {
      _running++;
      worker.call(context, current.value, current.worked);
    }
  }

  function unshift (value, done) {
    var current = cache.get();

    current.context = context;
    current.release = release;
    current.value = value;
    current.callback = done || noop;

    if (_running === self.concurrency || self.paused) {
      if (queueHead) {
        current.next = queueHead;
        queueHead = current;
      } else {
        queueHead = current;
        queueTail = current;
        self.saturated();
      }
    } else {
      _running++;
      worker.call(context, current.value, current.worked);
    }
  }

  function release (holder) {
    if (holder) {
      cache.release(holder);
    }
    var next = queueHead;
    if (next) {
      if (!self.paused) {
        if (queueTail === queueHead) {
          queueTail = null;
        }
        queueHead = next.next;
        next.next = null;
        worker.call(context, next.value, next.worked);
        if (queueTail === null) {
          self.empty();
        }
      } else {
        _running--;
      }
    } else if (--_running === 0) {
      self.drain();
    }
  }

  function kill () {
    queueHead = null;
    queueTail = null;
    self.drain = noop;
  }

  function killAndDrain () {
    queueHead = null;
    queueTail = null;
    self.drain();
    self.drain = noop;
  }

  function error (handler) {
    errorHandler = handler;
  }
}

function noop () {}

function Task () {
  this.value = null;
  this.callback = noop;
  this.next = null;
  this.release = noop;
  this.context = null;
  this.errorHandler = null;

  var self = this;

  this.worked = function worked (err, result) {
    var callback = self.callback;
    var errorHandler = self.errorHandler;
    var val = self.value;
    self.value = null;
    self.callback = noop;
    if (self.errorHandler) {
      errorHandler(err, val);
    }
    callback.call(self.context, err, result);
    self.release(self);
  };
}

function queueAsPromised (context, worker, concurrency) {
  if (typeof context === 'function') {
    concurrency = worker;
    worker = context;
    context = null;
  }

  function asyncWrapper (arg, cb) {
    worker.call(this, arg)
      .then(function (res) {
        cb(null, res);
      }, cb);
  }

  var queue = fastqueue(context, asyncWrapper, concurrency);

  var pushCb = queue.push;
  var unshiftCb = queue.unshift;

  queue.push = push;
  queue.unshift = unshift;
  queue.drained = drained;

  return queue

  function push (value) {
    var p = new Promise(function (resolve, reject) {
      pushCb(value, function (err, result) {
        if (err) {
          reject(err);
          return
        }
        resolve(result);
      });
    });

    // Let's fork the promise chain to
    // make the error bubble up to the user but
    // not lead to a unhandledRejection
    p.catch(noop);

    return p
  }

  function unshift (value) {
    var p = new Promise(function (resolve, reject) {
      unshiftCb(value, function (err, result) {
        if (err) {
          reject(err);
          return
        }
        resolve(result);
      });
    });

    // Let's fork the promise chain to
    // make the error bubble up to the user but
    // not lead to a unhandledRejection
    p.catch(noop);

    return p
  }

  function drained () {
    var previousDrain = queue.drain;

    var p = new Promise(function (resolve) {
      queue.drain = function () {
        previousDrain();
        resolve();
      };
    });

    return p
  }
}

queue.exports = fastqueue;
queue.exports.promise = queueAsPromised;

var queueExports = queue.exports;

var common$3 = {};

Object.defineProperty(common$3, "__esModule", { value: true });
common$3.joinPathSegments = common$3.replacePathSegmentSeparator = common$3.isAppliedFilter = common$3.isFatalError = void 0;
function isFatalError(settings, error) {
    if (settings.errorFilter === null) {
        return true;
    }
    return !settings.errorFilter(error);
}
common$3.isFatalError = isFatalError;
function isAppliedFilter(filter, value) {
    return filter === null || filter(value);
}
common$3.isAppliedFilter = isAppliedFilter;
function replacePathSegmentSeparator(filepath, separator) {
    return filepath.split(/[/\\]/).join(separator);
}
common$3.replacePathSegmentSeparator = replacePathSegmentSeparator;
function joinPathSegments(a, b, separator) {
    if (a === '') {
        return b;
    }
    /**
     * The correct handling of cases when the first segment is a root (`/`, `C:/`) or UNC path (`//?/C:/`).
     */
    if (a.endsWith(separator)) {
        return a + b;
    }
    return a + separator + b;
}
common$3.joinPathSegments = joinPathSegments;

var reader$1 = {};

Object.defineProperty(reader$1, "__esModule", { value: true });
const common$2 = common$3;
let Reader$1 = class Reader {
    constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._root = common$2.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator);
    }
};
reader$1.default = Reader$1;

Object.defineProperty(async$4, "__esModule", { value: true });
const events_1 = require$$0$5;
const fsScandir$2 = out$2;
const fastq = queueExports;
const common$1 = common$3;
const reader_1$4 = reader$1;
class AsyncReader extends reader_1$4.default {
    constructor(_root, _settings) {
        super(_root, _settings);
        this._settings = _settings;
        this._scandir = fsScandir$2.scandir;
        this._emitter = new events_1.EventEmitter();
        this._queue = fastq(this._worker.bind(this), this._settings.concurrency);
        this._isFatalError = false;
        this._isDestroyed = false;
        this._queue.drain = () => {
            if (!this._isFatalError) {
                this._emitter.emit('end');
            }
        };
    }
    read() {
        this._isFatalError = false;
        this._isDestroyed = false;
        setImmediate(() => {
            this._pushToQueue(this._root, this._settings.basePath);
        });
        return this._emitter;
    }
    get isDestroyed() {
        return this._isDestroyed;
    }
    destroy() {
        if (this._isDestroyed) {
            throw new Error('The reader is already destroyed');
        }
        this._isDestroyed = true;
        this._queue.killAndDrain();
    }
    onEntry(callback) {
        this._emitter.on('entry', callback);
    }
    onError(callback) {
        this._emitter.once('error', callback);
    }
    onEnd(callback) {
        this._emitter.once('end', callback);
    }
    _pushToQueue(directory, base) {
        const queueItem = { directory, base };
        this._queue.push(queueItem, (error) => {
            if (error !== null) {
                this._handleError(error);
            }
        });
    }
    _worker(item, done) {
        this._scandir(item.directory, this._settings.fsScandirSettings, (error, entries) => {
            if (error !== null) {
                done(error, undefined);
                return;
            }
            for (const entry of entries) {
                this._handleEntry(entry, item.base);
            }
            done(null, undefined);
        });
    }
    _handleError(error) {
        if (this._isDestroyed || !common$1.isFatalError(this._settings, error)) {
            return;
        }
        this._isFatalError = true;
        this._isDestroyed = true;
        this._emitter.emit('error', error);
    }
    _handleEntry(entry, base) {
        if (this._isDestroyed || this._isFatalError) {
            return;
        }
        const fullpath = entry.path;
        if (base !== undefined) {
            entry.path = common$1.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
        }
        if (common$1.isAppliedFilter(this._settings.entryFilter, entry)) {
            this._emitEntry(entry);
        }
        if (entry.dirent.isDirectory() && common$1.isAppliedFilter(this._settings.deepFilter, entry)) {
            this._pushToQueue(fullpath, base === undefined ? undefined : entry.path);
        }
    }
    _emitEntry(entry) {
        this._emitter.emit('entry', entry);
    }
}
async$4.default = AsyncReader;

Object.defineProperty(async$5, "__esModule", { value: true });
const async_1$4 = async$4;
class AsyncProvider {
    constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._reader = new async_1$4.default(this._root, this._settings);
        this._storage = [];
    }
    read(callback) {
        this._reader.onError((error) => {
            callFailureCallback(callback, error);
        });
        this._reader.onEntry((entry) => {
            this._storage.push(entry);
        });
        this._reader.onEnd(() => {
            callSuccessCallback(callback, this._storage);
        });
        this._reader.read();
    }
}
async$5.default = AsyncProvider;
function callFailureCallback(callback, error) {
    callback(error);
}
function callSuccessCallback(callback, entries) {
    callback(null, entries);
}

var stream$2 = {};

Object.defineProperty(stream$2, "__esModule", { value: true });
const stream_1$5 = require$$0$1;
const async_1$3 = async$4;
class StreamProvider {
    constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._reader = new async_1$3.default(this._root, this._settings);
        this._stream = new stream_1$5.Readable({
            objectMode: true,
            read: () => { },
            destroy: () => {
                if (!this._reader.isDestroyed) {
                    this._reader.destroy();
                }
            }
        });
    }
    read() {
        this._reader.onError((error) => {
            this._stream.emit('error', error);
        });
        this._reader.onEntry((entry) => {
            this._stream.push(entry);
        });
        this._reader.onEnd(() => {
            this._stream.push(null);
        });
        this._reader.read();
        return this._stream;
    }
}
stream$2.default = StreamProvider;

var sync$3 = {};

var sync$2 = {};

Object.defineProperty(sync$2, "__esModule", { value: true });
const fsScandir$1 = out$2;
const common = common$3;
const reader_1$3 = reader$1;
class SyncReader extends reader_1$3.default {
    constructor() {
        super(...arguments);
        this._scandir = fsScandir$1.scandirSync;
        this._storage = [];
        this._queue = new Set();
    }
    read() {
        this._pushToQueue(this._root, this._settings.basePath);
        this._handleQueue();
        return this._storage;
    }
    _pushToQueue(directory, base) {
        this._queue.add({ directory, base });
    }
    _handleQueue() {
        for (const item of this._queue.values()) {
            this._handleDirectory(item.directory, item.base);
        }
    }
    _handleDirectory(directory, base) {
        try {
            const entries = this._scandir(directory, this._settings.fsScandirSettings);
            for (const entry of entries) {
                this._handleEntry(entry, base);
            }
        }
        catch (error) {
            this._handleError(error);
        }
    }
    _handleError(error) {
        if (!common.isFatalError(this._settings, error)) {
            return;
        }
        throw error;
    }
    _handleEntry(entry, base) {
        const fullpath = entry.path;
        if (base !== undefined) {
            entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
        }
        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
            this._pushToStorage(entry);
        }
        if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
            this._pushToQueue(fullpath, base === undefined ? undefined : entry.path);
        }
    }
    _pushToStorage(entry) {
        this._storage.push(entry);
    }
}
sync$2.default = SyncReader;

Object.defineProperty(sync$3, "__esModule", { value: true });
const sync_1$3 = sync$2;
class SyncProvider {
    constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._reader = new sync_1$3.default(this._root, this._settings);
    }
    read() {
        return this._reader.read();
    }
}
sync$3.default = SyncProvider;

var settings$1 = {};

Object.defineProperty(settings$1, "__esModule", { value: true });
const path$2 = require$$1;
const fsScandir = out$2;
class Settings {
    constructor(_options = {}) {
        this._options = _options;
        this.basePath = this._getValue(this._options.basePath, undefined);
        this.concurrency = this._getValue(this._options.concurrency, Number.POSITIVE_INFINITY);
        this.deepFilter = this._getValue(this._options.deepFilter, null);
        this.entryFilter = this._getValue(this._options.entryFilter, null);
        this.errorFilter = this._getValue(this._options.errorFilter, null);
        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path$2.sep);
        this.fsScandirSettings = new fsScandir.Settings({
            followSymbolicLinks: this._options.followSymbolicLinks,
            fs: this._options.fs,
            pathSegmentSeparator: this._options.pathSegmentSeparator,
            stats: this._options.stats,
            throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink
        });
    }
    _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value;
    }
}
settings$1.default = Settings;

Object.defineProperty(out$3, "__esModule", { value: true });
out$3.Settings = out$3.walkStream = out$3.walkSync = out$3.walk = void 0;
const async_1$2 = async$5;
const stream_1$4 = stream$2;
const sync_1$2 = sync$3;
const settings_1$1 = settings$1;
out$3.Settings = settings_1$1.default;
function walk(directory, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === 'function') {
        new async_1$2.default(directory, getSettings()).read(optionsOrSettingsOrCallback);
        return;
    }
    new async_1$2.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback);
}
out$3.walk = walk;
function walkSync(directory, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    const provider = new sync_1$2.default(directory, settings);
    return provider.read();
}
out$3.walkSync = walkSync;
function walkStream(directory, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings);
    const provider = new stream_1$4.default(directory, settings);
    return provider.read();
}
out$3.walkStream = walkStream;
function getSettings(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1$1.default) {
        return settingsOrOptions;
    }
    return new settings_1$1.default(settingsOrOptions);
}

var reader = {};

Object.defineProperty(reader, "__esModule", { value: true });
const path$1 = require$$1;
const fsStat$2 = out$1;
const utils$6 = utils$k;
class Reader {
    constructor(_settings) {
        this._settings = _settings;
        this._fsStatSettings = new fsStat$2.Settings({
            followSymbolicLink: this._settings.followSymbolicLinks,
            fs: this._settings.fs,
            throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks
        });
    }
    _getFullEntryPath(filepath) {
        return path$1.resolve(this._settings.cwd, filepath);
    }
    _makeEntry(stats, pattern) {
        const entry = {
            name: pattern,
            path: pattern,
            dirent: utils$6.fs.createDirentFromStats(pattern, stats)
        };
        if (this._settings.stats) {
            entry.stats = stats;
        }
        return entry;
    }
    _isFatalError(error) {
        return !utils$6.errno.isEnoentCodeError(error) && !this._settings.suppressErrors;
    }
}
reader.default = Reader;

var stream$1 = {};

Object.defineProperty(stream$1, "__esModule", { value: true });
const stream_1$3 = require$$0$1;
const fsStat$1 = out$1;
const fsWalk$2 = out$3;
const reader_1$2 = reader;
class ReaderStream extends reader_1$2.default {
    constructor() {
        super(...arguments);
        this._walkStream = fsWalk$2.walkStream;
        this._stat = fsStat$1.stat;
    }
    dynamic(root, options) {
        return this._walkStream(root, options);
    }
    static(patterns, options) {
        const filepaths = patterns.map(this._getFullEntryPath, this);
        const stream = new stream_1$3.PassThrough({ objectMode: true });
        stream._write = (index, _enc, done) => {
            return this._getEntry(filepaths[index], patterns[index], options)
                .then((entry) => {
                if (entry !== null && options.entryFilter(entry)) {
                    stream.push(entry);
                }
                if (index === filepaths.length - 1) {
                    stream.end();
                }
                done();
            })
                .catch(done);
        };
        for (let i = 0; i < filepaths.length; i++) {
            stream.write(i);
        }
        return stream;
    }
    _getEntry(filepath, pattern, options) {
        return this._getStat(filepath)
            .then((stats) => this._makeEntry(stats, pattern))
            .catch((error) => {
            if (options.errorFilter(error)) {
                return null;
            }
            throw error;
        });
    }
    _getStat(filepath) {
        return new Promise((resolve, reject) => {
            this._stat(filepath, this._fsStatSettings, (error, stats) => {
                return error === null ? resolve(stats) : reject(error);
            });
        });
    }
}
stream$1.default = ReaderStream;

Object.defineProperty(async$6, "__esModule", { value: true });
const fsWalk$1 = out$3;
const reader_1$1 = reader;
const stream_1$2 = stream$1;
class ReaderAsync extends reader_1$1.default {
    constructor() {
        super(...arguments);
        this._walkAsync = fsWalk$1.walk;
        this._readerStream = new stream_1$2.default(this._settings);
    }
    dynamic(root, options) {
        return new Promise((resolve, reject) => {
            this._walkAsync(root, options, (error, entries) => {
                if (error === null) {
                    resolve(entries);
                }
                else {
                    reject(error);
                }
            });
        });
    }
    async static(patterns, options) {
        const entries = [];
        const stream = this._readerStream.static(patterns, options);
        // After #235, replace it with an asynchronous iterator.
        return new Promise((resolve, reject) => {
            stream.once('error', reject);
            stream.on('data', (entry) => entries.push(entry));
            stream.once('end', () => resolve(entries));
        });
    }
}
async$6.default = ReaderAsync;

var provider = {};

var deep = {};

var partial = {};

var matcher = {};

Object.defineProperty(matcher, "__esModule", { value: true });
const utils$5 = utils$k;
class Matcher {
    constructor(_patterns, _settings, _micromatchOptions) {
        this._patterns = _patterns;
        this._settings = _settings;
        this._micromatchOptions = _micromatchOptions;
        this._storage = [];
        this._fillStorage();
    }
    _fillStorage() {
        for (const pattern of this._patterns) {
            const segments = this._getPatternSegments(pattern);
            const sections = this._splitSegmentsIntoSections(segments);
            this._storage.push({
                complete: sections.length <= 1,
                pattern,
                segments,
                sections
            });
        }
    }
    _getPatternSegments(pattern) {
        const parts = utils$5.pattern.getPatternParts(pattern, this._micromatchOptions);
        return parts.map((part) => {
            const dynamic = utils$5.pattern.isDynamicPattern(part, this._settings);
            if (!dynamic) {
                return {
                    dynamic: false,
                    pattern: part
                };
            }
            return {
                dynamic: true,
                pattern: part,
                patternRe: utils$5.pattern.makeRe(part, this._micromatchOptions)
            };
        });
    }
    _splitSegmentsIntoSections(segments) {
        return utils$5.array.splitWhen(segments, (segment) => segment.dynamic && utils$5.pattern.hasGlobStar(segment.pattern));
    }
}
matcher.default = Matcher;

Object.defineProperty(partial, "__esModule", { value: true });
const matcher_1 = matcher;
class PartialMatcher extends matcher_1.default {
    match(filepath) {
        const parts = filepath.split('/');
        const levels = parts.length;
        const patterns = this._storage.filter((info) => !info.complete || info.segments.length > levels);
        for (const pattern of patterns) {
            const section = pattern.sections[0];
            /**
             * In this case, the pattern has a globstar and we must read all directories unconditionally,
             * but only if the level has reached the end of the first group.
             *
             * fixtures/{a,b}/**
             *  ^ true/false  ^ always true
            */
            if (!pattern.complete && levels > section.length) {
                return true;
            }
            const match = parts.every((part, index) => {
                const segment = pattern.segments[index];
                if (segment.dynamic && segment.patternRe.test(part)) {
                    return true;
                }
                if (!segment.dynamic && segment.pattern === part) {
                    return true;
                }
                return false;
            });
            if (match) {
                return true;
            }
        }
        return false;
    }
}
partial.default = PartialMatcher;

Object.defineProperty(deep, "__esModule", { value: true });
const utils$4 = utils$k;
const partial_1 = partial;
class DeepFilter {
    constructor(_settings, _micromatchOptions) {
        this._settings = _settings;
        this._micromatchOptions = _micromatchOptions;
    }
    getFilter(basePath, positive, negative) {
        const matcher = this._getMatcher(positive);
        const negativeRe = this._getNegativePatternsRe(negative);
        return (entry) => this._filter(basePath, entry, matcher, negativeRe);
    }
    _getMatcher(patterns) {
        return new partial_1.default(patterns, this._settings, this._micromatchOptions);
    }
    _getNegativePatternsRe(patterns) {
        const affectDepthOfReadingPatterns = patterns.filter(utils$4.pattern.isAffectDepthOfReadingPattern);
        return utils$4.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this._micromatchOptions);
    }
    _filter(basePath, entry, matcher, negativeRe) {
        if (this._isSkippedByDeep(basePath, entry.path)) {
            return false;
        }
        if (this._isSkippedSymbolicLink(entry)) {
            return false;
        }
        const filepath = utils$4.path.removeLeadingDotSegment(entry.path);
        if (this._isSkippedByPositivePatterns(filepath, matcher)) {
            return false;
        }
        return this._isSkippedByNegativePatterns(filepath, negativeRe);
    }
    _isSkippedByDeep(basePath, entryPath) {
        /**
         * Avoid unnecessary depth calculations when it doesn't matter.
         */
        if (this._settings.deep === Infinity) {
            return false;
        }
        return this._getEntryLevel(basePath, entryPath) >= this._settings.deep;
    }
    _getEntryLevel(basePath, entryPath) {
        const entryPathDepth = entryPath.split('/').length;
        if (basePath === '') {
            return entryPathDepth;
        }
        const basePathDepth = basePath.split('/').length;
        return entryPathDepth - basePathDepth;
    }
    _isSkippedSymbolicLink(entry) {
        return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink();
    }
    _isSkippedByPositivePatterns(entryPath, matcher) {
        return !this._settings.baseNameMatch && !matcher.match(entryPath);
    }
    _isSkippedByNegativePatterns(entryPath, patternsRe) {
        return !utils$4.pattern.matchAny(entryPath, patternsRe);
    }
}
deep.default = DeepFilter;

var entry$1 = {};

Object.defineProperty(entry$1, "__esModule", { value: true });
const utils$3 = utils$k;
class EntryFilter {
    constructor(_settings, _micromatchOptions) {
        this._settings = _settings;
        this._micromatchOptions = _micromatchOptions;
        this.index = new Map();
    }
    getFilter(positive, negative) {
        const positiveRe = utils$3.pattern.convertPatternsToRe(positive, this._micromatchOptions);
        const negativeRe = utils$3.pattern.convertPatternsToRe(negative, Object.assign(Object.assign({}, this._micromatchOptions), { dot: true }));
        return (entry) => this._filter(entry, positiveRe, negativeRe);
    }
    _filter(entry, positiveRe, negativeRe) {
        const filepath = utils$3.path.removeLeadingDotSegment(entry.path);
        if (this._settings.unique && this._isDuplicateEntry(filepath)) {
            return false;
        }
        if (this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry)) {
            return false;
        }
        if (this._isSkippedByAbsoluteNegativePatterns(filepath, negativeRe)) {
            return false;
        }
        const isDirectory = entry.dirent.isDirectory();
        const isMatched = this._isMatchToPatterns(filepath, positiveRe, isDirectory) && !this._isMatchToPatterns(filepath, negativeRe, isDirectory);
        if (this._settings.unique && isMatched) {
            this._createIndexRecord(filepath);
        }
        return isMatched;
    }
    _isDuplicateEntry(filepath) {
        return this.index.has(filepath);
    }
    _createIndexRecord(filepath) {
        this.index.set(filepath, undefined);
    }
    _onlyFileFilter(entry) {
        return this._settings.onlyFiles && !entry.dirent.isFile();
    }
    _onlyDirectoryFilter(entry) {
        return this._settings.onlyDirectories && !entry.dirent.isDirectory();
    }
    _isSkippedByAbsoluteNegativePatterns(entryPath, patternsRe) {
        if (!this._settings.absolute) {
            return false;
        }
        const fullpath = utils$3.path.makeAbsolute(this._settings.cwd, entryPath);
        return utils$3.pattern.matchAny(fullpath, patternsRe);
    }
    _isMatchToPatterns(filepath, patternsRe, isDirectory) {
        // Trying to match files and directories by patterns.
        const isMatched = utils$3.pattern.matchAny(filepath, patternsRe);
        // A pattern with a trailling slash can be used for directory matching.
        // To apply such pattern, we need to add a tralling slash to the path.
        if (!isMatched && isDirectory) {
            return utils$3.pattern.matchAny(filepath + '/', patternsRe);
        }
        return isMatched;
    }
}
entry$1.default = EntryFilter;

var error = {};

Object.defineProperty(error, "__esModule", { value: true });
const utils$2 = utils$k;
class ErrorFilter {
    constructor(_settings) {
        this._settings = _settings;
    }
    getFilter() {
        return (error) => this._isNonFatalError(error);
    }
    _isNonFatalError(error) {
        return utils$2.errno.isEnoentCodeError(error) || this._settings.suppressErrors;
    }
}
error.default = ErrorFilter;

var entry = {};

Object.defineProperty(entry, "__esModule", { value: true });
const utils$1 = utils$k;
class EntryTransformer {
    constructor(_settings) {
        this._settings = _settings;
    }
    getTransformer() {
        return (entry) => this._transform(entry);
    }
    _transform(entry) {
        let filepath = entry.path;
        if (this._settings.absolute) {
            filepath = utils$1.path.makeAbsolute(this._settings.cwd, filepath);
            filepath = utils$1.path.unixify(filepath);
        }
        if (this._settings.markDirectories && entry.dirent.isDirectory()) {
            filepath += '/';
        }
        if (!this._settings.objectMode) {
            return filepath;
        }
        return Object.assign(Object.assign({}, entry), { path: filepath });
    }
}
entry.default = EntryTransformer;

Object.defineProperty(provider, "__esModule", { value: true });
const path = require$$1;
const deep_1 = deep;
const entry_1 = entry$1;
const error_1 = error;
const entry_2 = entry;
class Provider {
    constructor(_settings) {
        this._settings = _settings;
        this.errorFilter = new error_1.default(this._settings);
        this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions());
        this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions());
        this.entryTransformer = new entry_2.default(this._settings);
    }
    _getRootDirectory(task) {
        return path.resolve(this._settings.cwd, task.base);
    }
    _getReaderOptions(task) {
        const basePath = task.base === '.' ? '' : task.base;
        return {
            basePath,
            pathSegmentSeparator: '/',
            concurrency: this._settings.concurrency,
            deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
            entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
            errorFilter: this.errorFilter.getFilter(),
            followSymbolicLinks: this._settings.followSymbolicLinks,
            fs: this._settings.fs,
            stats: this._settings.stats,
            throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
            transform: this.entryTransformer.getTransformer()
        };
    }
    _getMicromatchOptions() {
        return {
            dot: this._settings.dot,
            matchBase: this._settings.baseNameMatch,
            nobrace: !this._settings.braceExpansion,
            nocase: !this._settings.caseSensitiveMatch,
            noext: !this._settings.extglob,
            noglobstar: !this._settings.globstar,
            posix: true,
            strictSlashes: false
        };
    }
}
provider.default = Provider;

Object.defineProperty(async$7, "__esModule", { value: true });
const async_1$1 = async$6;
const provider_1$2 = provider;
class ProviderAsync extends provider_1$2.default {
    constructor() {
        super(...arguments);
        this._reader = new async_1$1.default(this._settings);
    }
    async read(task) {
        const root = this._getRootDirectory(task);
        const options = this._getReaderOptions(task);
        const entries = await this.api(root, task, options);
        return entries.map((entry) => options.transform(entry));
    }
    api(root, task, options) {
        if (task.dynamic) {
            return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
    }
}
async$7.default = ProviderAsync;

var stream = {};

Object.defineProperty(stream, "__esModule", { value: true });
const stream_1$1 = require$$0$1;
const stream_2 = stream$1;
const provider_1$1 = provider;
class ProviderStream extends provider_1$1.default {
    constructor() {
        super(...arguments);
        this._reader = new stream_2.default(this._settings);
    }
    read(task) {
        const root = this._getRootDirectory(task);
        const options = this._getReaderOptions(task);
        const source = this.api(root, task, options);
        const destination = new stream_1$1.Readable({ objectMode: true, read: () => { } });
        source
            .once('error', (error) => destination.emit('error', error))
            .on('data', (entry) => destination.emit('data', options.transform(entry)))
            .once('end', () => destination.emit('end'));
        destination
            .once('close', () => source.destroy());
        return destination;
    }
    api(root, task, options) {
        if (task.dynamic) {
            return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
    }
}
stream.default = ProviderStream;

var sync$1 = {};

var sync = {};

Object.defineProperty(sync, "__esModule", { value: true });
const fsStat = out$1;
const fsWalk = out$3;
const reader_1 = reader;
class ReaderSync extends reader_1.default {
    constructor() {
        super(...arguments);
        this._walkSync = fsWalk.walkSync;
        this._statSync = fsStat.statSync;
    }
    dynamic(root, options) {
        return this._walkSync(root, options);
    }
    static(patterns, options) {
        const entries = [];
        for (const pattern of patterns) {
            const filepath = this._getFullEntryPath(pattern);
            const entry = this._getEntry(filepath, pattern, options);
            if (entry === null || !options.entryFilter(entry)) {
                continue;
            }
            entries.push(entry);
        }
        return entries;
    }
    _getEntry(filepath, pattern, options) {
        try {
            const stats = this._getStat(filepath);
            return this._makeEntry(stats, pattern);
        }
        catch (error) {
            if (options.errorFilter(error)) {
                return null;
            }
            throw error;
        }
    }
    _getStat(filepath) {
        return this._statSync(filepath, this._fsStatSettings);
    }
}
sync.default = ReaderSync;

Object.defineProperty(sync$1, "__esModule", { value: true });
const sync_1$1 = sync;
const provider_1 = provider;
class ProviderSync extends provider_1.default {
    constructor() {
        super(...arguments);
        this._reader = new sync_1$1.default(this._settings);
    }
    read(task) {
        const root = this._getRootDirectory(task);
        const options = this._getReaderOptions(task);
        const entries = this.api(root, task, options);
        return entries.map(options.transform);
    }
    api(root, task, options) {
        if (task.dynamic) {
            return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
    }
}
sync$1.default = ProviderSync;

var settings = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DEFAULT_FILE_SYSTEM_ADAPTER = void 0;
	const fs = require$$0$2;
	const os = require$$0$4;
	/**
	 * The `os.cpus` method can return zero. We expect the number of cores to be greater than zero.
	 * https://github.com/nodejs/node/blob/7faeddf23a98c53896f8b574a6e66589e8fb1eb8/lib/os.js#L106-L107
	 */
	const CPU_COUNT = Math.max(os.cpus().length, 1);
	exports.DEFAULT_FILE_SYSTEM_ADAPTER = {
	    lstat: fs.lstat,
	    lstatSync: fs.lstatSync,
	    stat: fs.stat,
	    statSync: fs.statSync,
	    readdir: fs.readdir,
	    readdirSync: fs.readdirSync
	};
	class Settings {
	    constructor(_options = {}) {
	        this._options = _options;
	        this.absolute = this._getValue(this._options.absolute, false);
	        this.baseNameMatch = this._getValue(this._options.baseNameMatch, false);
	        this.braceExpansion = this._getValue(this._options.braceExpansion, true);
	        this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, true);
	        this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT);
	        this.cwd = this._getValue(this._options.cwd, process.cwd());
	        this.deep = this._getValue(this._options.deep, Infinity);
	        this.dot = this._getValue(this._options.dot, false);
	        this.extglob = this._getValue(this._options.extglob, true);
	        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, true);
	        this.fs = this._getFileSystemMethods(this._options.fs);
	        this.globstar = this._getValue(this._options.globstar, true);
	        this.ignore = this._getValue(this._options.ignore, []);
	        this.markDirectories = this._getValue(this._options.markDirectories, false);
	        this.objectMode = this._getValue(this._options.objectMode, false);
	        this.onlyDirectories = this._getValue(this._options.onlyDirectories, false);
	        this.onlyFiles = this._getValue(this._options.onlyFiles, true);
	        this.stats = this._getValue(this._options.stats, false);
	        this.suppressErrors = this._getValue(this._options.suppressErrors, false);
	        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, false);
	        this.unique = this._getValue(this._options.unique, true);
	        if (this.onlyDirectories) {
	            this.onlyFiles = false;
	        }
	        if (this.stats) {
	            this.objectMode = true;
	        }
	        // Remove the cast to the array in the next major (#404).
	        this.ignore = [].concat(this.ignore);
	    }
	    _getValue(option, value) {
	        return option === undefined ? value : option;
	    }
	    _getFileSystemMethods(methods = {}) {
	        return Object.assign(Object.assign({}, exports.DEFAULT_FILE_SYSTEM_ADAPTER), methods);
	    }
	}
	exports.default = Settings; 
} (settings));

const taskManager = tasks;
const async_1 = async$7;
const stream_1 = stream;
const sync_1 = sync$1;
const settings_1 = settings;
const utils = utils$k;
async function FastGlob(source, options) {
    assertPatternsInput(source);
    const works = getWorks(source, async_1.default, options);
    const result = await Promise.all(works);
    return utils.array.flatten(result);
}
// https://github.com/typescript-eslint/typescript-eslint/issues/60
// eslint-disable-next-line no-redeclare
(function (FastGlob) {
    FastGlob.glob = FastGlob;
    FastGlob.globSync = sync;
    FastGlob.globStream = stream;
    FastGlob.async = FastGlob;
    function sync(source, options) {
        assertPatternsInput(source);
        const works = getWorks(source, sync_1.default, options);
        return utils.array.flatten(works);
    }
    FastGlob.sync = sync;
    function stream(source, options) {
        assertPatternsInput(source);
        const works = getWorks(source, stream_1.default, options);
        /**
         * The stream returned by the provider cannot work with an asynchronous iterator.
         * To support asynchronous iterators, regardless of the number of tasks, we always multiplex streams.
         * This affects performance (+25%). I don't see best solution right now.
         */
        return utils.stream.merge(works);
    }
    FastGlob.stream = stream;
    function generateTasks(source, options) {
        assertPatternsInput(source);
        const patterns = [].concat(source);
        const settings = new settings_1.default(options);
        return taskManager.generate(patterns, settings);
    }
    FastGlob.generateTasks = generateTasks;
    function isDynamicPattern(source, options) {
        assertPatternsInput(source);
        const settings = new settings_1.default(options);
        return utils.pattern.isDynamicPattern(source, settings);
    }
    FastGlob.isDynamicPattern = isDynamicPattern;
    function escapePath(source) {
        assertPatternsInput(source);
        return utils.path.escape(source);
    }
    FastGlob.escapePath = escapePath;
    function convertPathToPattern(source) {
        assertPatternsInput(source);
        return utils.path.convertPathToPattern(source);
    }
    FastGlob.convertPathToPattern = convertPathToPattern;
    (function (posix) {
        function escapePath(source) {
            assertPatternsInput(source);
            return utils.path.escapePosixPath(source);
        }
        posix.escapePath = escapePath;
        function convertPathToPattern(source) {
            assertPatternsInput(source);
            return utils.path.convertPosixPathToPattern(source);
        }
        posix.convertPathToPattern = convertPathToPattern;
    })(FastGlob.posix || (FastGlob.posix = {}));
    (function (win32) {
        function escapePath(source) {
            assertPatternsInput(source);
            return utils.path.escapeWindowsPath(source);
        }
        win32.escapePath = escapePath;
        function convertPathToPattern(source) {
            assertPatternsInput(source);
            return utils.path.convertWindowsPathToPattern(source);
        }
        win32.convertPathToPattern = convertPathToPattern;
    })(FastGlob.win32 || (FastGlob.win32 = {}));
})(FastGlob || (FastGlob = {}));
function getWorks(source, _Provider, options) {
    const patterns = [].concat(source);
    const settings = new settings_1.default(options);
    const tasks = taskManager.generate(patterns, settings);
    const provider = new _Provider(settings);
    return tasks.map(provider.read, provider);
}
function assertPatternsInput(input) {
    const source = [].concat(input);
    const isValidSource = source.every((item) => utils.string.isString(item) && !utils.string.isEmpty(item));
    if (!isValidSource) {
        throw new TypeError('Patterns must be a string (non empty) or an array of strings');
    }
}
var out = FastGlob;

const fg = /*@__PURE__*/getDefaultExportFromCjs(out);

const _export = defineCommand({
  meta: {
    name: "export",
    description: "Generates the plain HTML files of your emails into a out directory."
  },
  args: {
    dir: {
      type: "string",
      description: "The directory where the emails are located.",
      default: "emails"
    },
    out: {
      type: "string",
      description: "The directory where the emails will be exported.",
      default: "out"
    },
    pretty: {
      type: "boolean",
      description: "Prettify the HTML output.",
      default: false
    },
    text: {
      type: "boolean",
      description: "Generate text version of the email.",
      default: false
    }
  },
  async run(ctx) {
    const cwd = resolve(".");
    const dir = resolve(cwd, ctx.args.dir);
    const out = resolve(cwd, ctx.args.out);
    const prettyArg = ctx.args.pretty;
    const textArg = ctx.args.text;
    const vueEmail = config(dir, { verbose: false });
    const emails = await fg(["**/*.vue"], { cwd: dir });
    if (!emails.length) {
      consola.error(`No Emails found in ${dir}`);
      process.exit(1);
    }
    if (textArg)
      consola.info(`\u2728 Generating text versions of emails`);
    else
      consola.info(`\u2728 Generating HTML versions of emails`);
    for (const email of emails) {
      const rendered = await vueEmail.render(email);
      const html = rendered.html;
      const text = rendered.text;
      const name = email.replace(".vue", "");
      const fileName = textArg ? `${name}.txt` : `${name}.html`;
      if (textArg)
        await lib.outputFile(resolve(out, fileName), text);
      else
        await lib.outputFile(resolve(out, fileName), prettyArg ? pretty$1(html) : html);
      consola.info(`\u{1FA84} Generated ${name}`);
    }
  }
});

export { _export as default };
