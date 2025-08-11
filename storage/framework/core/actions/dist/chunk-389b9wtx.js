import {
  __commonJS,
  __require,
  __toESM
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/crypto-js/core.js
var require_core = __commonJS((exports, module) => {
  (function(root, factory) {
    if (typeof exports === "object") {
      module.exports = exports = factory();
    } else if (typeof define === "function" && define.amd) {
      define([], factory);
    } else {
      root.CryptoJS = factory();
    }
  })(exports, function() {
    var CryptoJS = CryptoJS || function(Math2, undefined2) {
      var crypto;
      if (typeof window !== "undefined" && window.crypto) {
        crypto = window.crypto;
      }
      if (typeof self !== "undefined" && self.crypto) {
        crypto = self.crypto;
      }
      if (typeof globalThis !== "undefined" && globalThis.crypto) {
        crypto = globalThis.crypto;
      }
      if (!crypto && typeof window !== "undefined" && window.msCrypto) {
        crypto = window.msCrypto;
      }
      if (!crypto && typeof global !== "undefined" && global.crypto) {
        crypto = global.crypto;
      }
      if (!crypto && true) {
        try {
          crypto = __require("crypto");
        } catch (err) {}
      }
      var cryptoSecureRandomInt = function() {
        if (crypto) {
          if (typeof crypto.getRandomValues === "function") {
            try {
              return crypto.getRandomValues(new Uint32Array(1))[0];
            } catch (err) {}
          }
          if (typeof crypto.randomBytes === "function") {
            try {
              return crypto.randomBytes(4).readInt32LE();
            } catch (err) {}
          }
        }
        throw new Error("Native crypto module could not be used to get secure random number.");
      };
      var create = Object.create || function() {
        function F() {}
        return function(obj) {
          var subtype;
          F.prototype = obj;
          subtype = new F;
          F.prototype = null;
          return subtype;
        };
      }();
      var C = {};
      var C_lib = C.lib = {};
      var Base = C_lib.Base = function() {
        return {
          extend: function(overrides) {
            var subtype = create(this);
            if (overrides) {
              subtype.mixIn(overrides);
            }
            if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
              subtype.init = function() {
                subtype.$super.init.apply(this, arguments);
              };
            }
            subtype.init.prototype = subtype;
            subtype.$super = this;
            return subtype;
          },
          create: function() {
            var instance = this.extend();
            instance.init.apply(instance, arguments);
            return instance;
          },
          init: function() {},
          mixIn: function(properties) {
            for (var propertyName in properties) {
              if (properties.hasOwnProperty(propertyName)) {
                this[propertyName] = properties[propertyName];
              }
            }
            if (properties.hasOwnProperty("toString")) {
              this.toString = properties.toString;
            }
          },
          clone: function() {
            return this.init.prototype.extend(this);
          }
        };
      }();
      var WordArray = C_lib.WordArray = Base.extend({
        init: function(words, sigBytes) {
          words = this.words = words || [];
          if (sigBytes != undefined2) {
            this.sigBytes = sigBytes;
          } else {
            this.sigBytes = words.length * 4;
          }
        },
        toString: function(encoder) {
          return (encoder || Hex).stringify(this);
        },
        concat: function(wordArray) {
          var thisWords = this.words;
          var thatWords = wordArray.words;
          var thisSigBytes = this.sigBytes;
          var thatSigBytes = wordArray.sigBytes;
          this.clamp();
          if (thisSigBytes % 4) {
            for (var i = 0;i < thatSigBytes; i++) {
              var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
            }
          } else {
            for (var j = 0;j < thatSigBytes; j += 4) {
              thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
            }
          }
          this.sigBytes += thatSigBytes;
          return this;
        },
        clamp: function() {
          var words = this.words;
          var sigBytes = this.sigBytes;
          words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
          words.length = Math2.ceil(sigBytes / 4);
        },
        clone: function() {
          var clone = Base.clone.call(this);
          clone.words = this.words.slice(0);
          return clone;
        },
        random: function(nBytes) {
          var words = [];
          for (var i = 0;i < nBytes; i += 4) {
            words.push(cryptoSecureRandomInt());
          }
          return new WordArray.init(words, nBytes);
        }
      });
      var C_enc = C.enc = {};
      var Hex = C_enc.Hex = {
        stringify: function(wordArray) {
          var words = wordArray.words;
          var sigBytes = wordArray.sigBytes;
          var hexChars = [];
          for (var i = 0;i < sigBytes; i++) {
            var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
            hexChars.push((bite >>> 4).toString(16));
            hexChars.push((bite & 15).toString(16));
          }
          return hexChars.join("");
        },
        parse: function(hexStr) {
          var hexStrLength = hexStr.length;
          var words = [];
          for (var i = 0;i < hexStrLength; i += 2) {
            words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
          }
          return new WordArray.init(words, hexStrLength / 2);
        }
      };
      var Latin1 = C_enc.Latin1 = {
        stringify: function(wordArray) {
          var words = wordArray.words;
          var sigBytes = wordArray.sigBytes;
          var latin1Chars = [];
          for (var i = 0;i < sigBytes; i++) {
            var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
            latin1Chars.push(String.fromCharCode(bite));
          }
          return latin1Chars.join("");
        },
        parse: function(latin1Str) {
          var latin1StrLength = latin1Str.length;
          var words = [];
          for (var i = 0;i < latin1StrLength; i++) {
            words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
          }
          return new WordArray.init(words, latin1StrLength);
        }
      };
      var Utf8 = C_enc.Utf8 = {
        stringify: function(wordArray) {
          try {
            return decodeURIComponent(escape(Latin1.stringify(wordArray)));
          } catch (e) {
            throw new Error("Malformed UTF-8 data");
          }
        },
        parse: function(utf8Str) {
          return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
        }
      };
      var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
        reset: function() {
          this._data = new WordArray.init;
          this._nDataBytes = 0;
        },
        _append: function(data) {
          if (typeof data == "string") {
            data = Utf8.parse(data);
          }
          this._data.concat(data);
          this._nDataBytes += data.sigBytes;
        },
        _process: function(doFlush) {
          var processedWords;
          var data = this._data;
          var dataWords = data.words;
          var dataSigBytes = data.sigBytes;
          var blockSize = this.blockSize;
          var blockSizeBytes = blockSize * 4;
          var nBlocksReady = dataSigBytes / blockSizeBytes;
          if (doFlush) {
            nBlocksReady = Math2.ceil(nBlocksReady);
          } else {
            nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
          }
          var nWordsReady = nBlocksReady * blockSize;
          var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
          if (nWordsReady) {
            for (var offset = 0;offset < nWordsReady; offset += blockSize) {
              this._doProcessBlock(dataWords, offset);
            }
            processedWords = dataWords.splice(0, nWordsReady);
            data.sigBytes -= nBytesReady;
          }
          return new WordArray.init(processedWords, nBytesReady);
        },
        clone: function() {
          var clone = Base.clone.call(this);
          clone._data = this._data.clone();
          return clone;
        },
        _minBufferSize: 0
      });
      var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
        cfg: Base.extend(),
        init: function(cfg) {
          this.cfg = this.cfg.extend(cfg);
          this.reset();
        },
        reset: function() {
          BufferedBlockAlgorithm.reset.call(this);
          this._doReset();
        },
        update: function(messageUpdate) {
          this._append(messageUpdate);
          this._process();
          return this;
        },
        finalize: function(messageUpdate) {
          if (messageUpdate) {
            this._append(messageUpdate);
          }
          var hash = this._doFinalize();
          return hash;
        },
        blockSize: 512 / 32,
        _createHelper: function(hasher) {
          return function(message, cfg) {
            return new hasher.init(cfg).finalize(message);
          };
        },
        _createHmacHelper: function(hasher) {
          return function(message, key) {
            return new C_algo.HMAC.init(hasher, key).finalize(message);
          };
        }
      });
      var C_algo = C.algo = {};
      return C;
    }(Math);
    return CryptoJS;
  });
});

// ../../../../node_modules/crypto-js/enc-base64.js
var require_enc_base64 = __commonJS((exports, module) => {
  (function(root, factory) {
    if (typeof exports === "object") {
      module.exports = exports = factory(require_core());
    } else if (typeof define === "function" && define.amd) {
      define(["./core"], factory);
    } else {
      factory(root.CryptoJS);
    }
  })(exports, function(CryptoJS) {
    (function() {
      var C = CryptoJS;
      var C_lib = C.lib;
      var WordArray = C_lib.WordArray;
      var C_enc = C.enc;
      var Base64 = C_enc.Base64 = {
        stringify: function(wordArray) {
          var words = wordArray.words;
          var sigBytes = wordArray.sigBytes;
          var map = this._map;
          wordArray.clamp();
          var base64Chars = [];
          for (var i = 0;i < sigBytes; i += 3) {
            var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
            var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
            var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
            var triplet = byte1 << 16 | byte2 << 8 | byte3;
            for (var j = 0;j < 4 && i + j * 0.75 < sigBytes; j++) {
              base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
            }
          }
          var paddingChar = map.charAt(64);
          if (paddingChar) {
            while (base64Chars.length % 4) {
              base64Chars.push(paddingChar);
            }
          }
          return base64Chars.join("");
        },
        parse: function(base64Str) {
          var base64StrLength = base64Str.length;
          var map = this._map;
          var reverseMap = this._reverseMap;
          if (!reverseMap) {
            reverseMap = this._reverseMap = [];
            for (var j = 0;j < map.length; j++) {
              reverseMap[map.charCodeAt(j)] = j;
            }
          }
          var paddingChar = map.charAt(64);
          if (paddingChar) {
            var paddingIndex = base64Str.indexOf(paddingChar);
            if (paddingIndex !== -1) {
              base64StrLength = paddingIndex;
            }
          }
          return parseLoop(base64Str, base64StrLength, reverseMap);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      };
      function parseLoop(base64Str, base64StrLength, reverseMap) {
        var words = [];
        var nBytes = 0;
        for (var i = 0;i < base64StrLength; i++) {
          if (i % 4) {
            var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
            var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
            var bitsCombined = bits1 | bits2;
            words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
            nBytes++;
          }
        }
        return WordArray.create(words, nBytes);
      }
    })();
    return CryptoJS.enc.Base64;
  });
});

// ../../../../node_modules/crypto-js/enc-utf8.js
var require_enc_utf8 = __commonJS((exports, module) => {
  (function(root, factory) {
    if (typeof exports === "object") {
      module.exports = exports = factory(require_core());
    } else if (typeof define === "function" && define.amd) {
      define(["./core"], factory);
    } else {
      factory(root.CryptoJS);
    }
  })(exports, function(CryptoJS) {
    return CryptoJS.enc.Utf8;
  });
});

// ../../../../node_modules/crypto-js/md5.js
var require_md5 = __commonJS((exports, module) => {
  (function(root, factory) {
    if (typeof exports === "object") {
      module.exports = exports = factory(require_core());
    } else if (typeof define === "function" && define.amd) {
      define(["./core"], factory);
    } else {
      factory(root.CryptoJS);
    }
  })(exports, function(CryptoJS) {
    (function(Math2) {
      var C = CryptoJS;
      var C_lib = C.lib;
      var WordArray = C_lib.WordArray;
      var Hasher = C_lib.Hasher;
      var C_algo = C.algo;
      var T = [];
      (function() {
        for (var i = 0;i < 64; i++) {
          T[i] = Math2.abs(Math2.sin(i + 1)) * 4294967296 | 0;
        }
      })();
      var MD5 = C_algo.MD5 = Hasher.extend({
        _doReset: function() {
          this._hash = new WordArray.init([
            1732584193,
            4023233417,
            2562383102,
            271733878
          ]);
        },
        _doProcessBlock: function(M, offset) {
          for (var i = 0;i < 16; i++) {
            var offset_i = offset + i;
            var M_offset_i = M[offset_i];
            M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
          }
          var H = this._hash.words;
          var M_offset_0 = M[offset + 0];
          var M_offset_1 = M[offset + 1];
          var M_offset_2 = M[offset + 2];
          var M_offset_3 = M[offset + 3];
          var M_offset_4 = M[offset + 4];
          var M_offset_5 = M[offset + 5];
          var M_offset_6 = M[offset + 6];
          var M_offset_7 = M[offset + 7];
          var M_offset_8 = M[offset + 8];
          var M_offset_9 = M[offset + 9];
          var M_offset_10 = M[offset + 10];
          var M_offset_11 = M[offset + 11];
          var M_offset_12 = M[offset + 12];
          var M_offset_13 = M[offset + 13];
          var M_offset_14 = M[offset + 14];
          var M_offset_15 = M[offset + 15];
          var a = H[0];
          var b = H[1];
          var c = H[2];
          var d = H[3];
          a = FF(a, b, c, d, M_offset_0, 7, T[0]);
          d = FF(d, a, b, c, M_offset_1, 12, T[1]);
          c = FF(c, d, a, b, M_offset_2, 17, T[2]);
          b = FF(b, c, d, a, M_offset_3, 22, T[3]);
          a = FF(a, b, c, d, M_offset_4, 7, T[4]);
          d = FF(d, a, b, c, M_offset_5, 12, T[5]);
          c = FF(c, d, a, b, M_offset_6, 17, T[6]);
          b = FF(b, c, d, a, M_offset_7, 22, T[7]);
          a = FF(a, b, c, d, M_offset_8, 7, T[8]);
          d = FF(d, a, b, c, M_offset_9, 12, T[9]);
          c = FF(c, d, a, b, M_offset_10, 17, T[10]);
          b = FF(b, c, d, a, M_offset_11, 22, T[11]);
          a = FF(a, b, c, d, M_offset_12, 7, T[12]);
          d = FF(d, a, b, c, M_offset_13, 12, T[13]);
          c = FF(c, d, a, b, M_offset_14, 17, T[14]);
          b = FF(b, c, d, a, M_offset_15, 22, T[15]);
          a = GG(a, b, c, d, M_offset_1, 5, T[16]);
          d = GG(d, a, b, c, M_offset_6, 9, T[17]);
          c = GG(c, d, a, b, M_offset_11, 14, T[18]);
          b = GG(b, c, d, a, M_offset_0, 20, T[19]);
          a = GG(a, b, c, d, M_offset_5, 5, T[20]);
          d = GG(d, a, b, c, M_offset_10, 9, T[21]);
          c = GG(c, d, a, b, M_offset_15, 14, T[22]);
          b = GG(b, c, d, a, M_offset_4, 20, T[23]);
          a = GG(a, b, c, d, M_offset_9, 5, T[24]);
          d = GG(d, a, b, c, M_offset_14, 9, T[25]);
          c = GG(c, d, a, b, M_offset_3, 14, T[26]);
          b = GG(b, c, d, a, M_offset_8, 20, T[27]);
          a = GG(a, b, c, d, M_offset_13, 5, T[28]);
          d = GG(d, a, b, c, M_offset_2, 9, T[29]);
          c = GG(c, d, a, b, M_offset_7, 14, T[30]);
          b = GG(b, c, d, a, M_offset_12, 20, T[31]);
          a = HH(a, b, c, d, M_offset_5, 4, T[32]);
          d = HH(d, a, b, c, M_offset_8, 11, T[33]);
          c = HH(c, d, a, b, M_offset_11, 16, T[34]);
          b = HH(b, c, d, a, M_offset_14, 23, T[35]);
          a = HH(a, b, c, d, M_offset_1, 4, T[36]);
          d = HH(d, a, b, c, M_offset_4, 11, T[37]);
          c = HH(c, d, a, b, M_offset_7, 16, T[38]);
          b = HH(b, c, d, a, M_offset_10, 23, T[39]);
          a = HH(a, b, c, d, M_offset_13, 4, T[40]);
          d = HH(d, a, b, c, M_offset_0, 11, T[41]);
          c = HH(c, d, a, b, M_offset_3, 16, T[42]);
          b = HH(b, c, d, a, M_offset_6, 23, T[43]);
          a = HH(a, b, c, d, M_offset_9, 4, T[44]);
          d = HH(d, a, b, c, M_offset_12, 11, T[45]);
          c = HH(c, d, a, b, M_offset_15, 16, T[46]);
          b = HH(b, c, d, a, M_offset_2, 23, T[47]);
          a = II(a, b, c, d, M_offset_0, 6, T[48]);
          d = II(d, a, b, c, M_offset_7, 10, T[49]);
          c = II(c, d, a, b, M_offset_14, 15, T[50]);
          b = II(b, c, d, a, M_offset_5, 21, T[51]);
          a = II(a, b, c, d, M_offset_12, 6, T[52]);
          d = II(d, a, b, c, M_offset_3, 10, T[53]);
          c = II(c, d, a, b, M_offset_10, 15, T[54]);
          b = II(b, c, d, a, M_offset_1, 21, T[55]);
          a = II(a, b, c, d, M_offset_8, 6, T[56]);
          d = II(d, a, b, c, M_offset_15, 10, T[57]);
          c = II(c, d, a, b, M_offset_6, 15, T[58]);
          b = II(b, c, d, a, M_offset_13, 21, T[59]);
          a = II(a, b, c, d, M_offset_4, 6, T[60]);
          d = II(d, a, b, c, M_offset_11, 10, T[61]);
          c = II(c, d, a, b, M_offset_2, 15, T[62]);
          b = II(b, c, d, a, M_offset_9, 21, T[63]);
          H[0] = H[0] + a | 0;
          H[1] = H[1] + b | 0;
          H[2] = H[2] + c | 0;
          H[3] = H[3] + d | 0;
        },
        _doFinalize: function() {
          var data = this._data;
          var dataWords = data.words;
          var nBitsTotal = this._nDataBytes * 8;
          var nBitsLeft = data.sigBytes * 8;
          dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
          var nBitsTotalH = Math2.floor(nBitsTotal / 4294967296);
          var nBitsTotalL = nBitsTotal;
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
          data.sigBytes = (dataWords.length + 1) * 4;
          this._process();
          var hash = this._hash;
          var H = hash.words;
          for (var i = 0;i < 4; i++) {
            var H_i = H[i];
            H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
          }
          return hash;
        },
        clone: function() {
          var clone = Hasher.clone.call(this);
          clone._hash = this._hash.clone();
          return clone;
        }
      });
      function FF(a, b, c, d, x, s, t) {
        var n = a + (b & c | ~b & d) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      function GG(a, b, c, d, x, s, t) {
        var n = a + (b & d | c & ~d) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      function HH(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      function II(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      C.MD5 = Hasher._createHelper(MD5);
      C.HmacMD5 = Hasher._createHmacHelper(MD5);
    })(Math);
    return CryptoJS.MD5;
  });
});

// ../../../../node_modules/crypto-js/sha1.js
var require_sha1 = __commonJS((exports, module) => {
  (function(root, factory) {
    if (typeof exports === "object") {
      module.exports = exports = factory(require_core());
    } else if (typeof define === "function" && define.amd) {
      define(["./core"], factory);
    } else {
      factory(root.CryptoJS);
    }
  })(exports, function(CryptoJS) {
    (function() {
      var C = CryptoJS;
      var C_lib = C.lib;
      var WordArray = C_lib.WordArray;
      var Hasher = C_lib.Hasher;
      var C_algo = C.algo;
      var W = [];
      var SHA1 = C_algo.SHA1 = Hasher.extend({
        _doReset: function() {
          this._hash = new WordArray.init([
            1732584193,
            4023233417,
            2562383102,
            271733878,
            3285377520
          ]);
        },
        _doProcessBlock: function(M, offset) {
          var H = this._hash.words;
          var a = H[0];
          var b = H[1];
          var c = H[2];
          var d = H[3];
          var e = H[4];
          for (var i = 0;i < 80; i++) {
            if (i < 16) {
              W[i] = M[offset + i] | 0;
            } else {
              var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
              W[i] = n << 1 | n >>> 31;
            }
            var t = (a << 5 | a >>> 27) + e + W[i];
            if (i < 20) {
              t += (b & c | ~b & d) + 1518500249;
            } else if (i < 40) {
              t += (b ^ c ^ d) + 1859775393;
            } else if (i < 60) {
              t += (b & c | b & d | c & d) - 1894007588;
            } else {
              t += (b ^ c ^ d) - 899497514;
            }
            e = d;
            d = c;
            c = b << 30 | b >>> 2;
            b = a;
            a = t;
          }
          H[0] = H[0] + a | 0;
          H[1] = H[1] + b | 0;
          H[2] = H[2] + c | 0;
          H[3] = H[3] + d | 0;
          H[4] = H[4] + e | 0;
        },
        _doFinalize: function() {
          var data = this._data;
          var dataWords = data.words;
          var nBitsTotal = this._nDataBytes * 8;
          var nBitsLeft = data.sigBytes * 8;
          dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
          data.sigBytes = dataWords.length * 4;
          this._process();
          return this._hash;
        },
        clone: function() {
          var clone = Hasher.clone.call(this);
          clone._hash = this._hash.clone();
          return clone;
        }
      });
      C.SHA1 = Hasher._createHelper(SHA1);
      C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
    })();
    return CryptoJS.SHA1;
  });
});

// ../../../../node_modules/crypto-js/hmac.js
var require_hmac = __commonJS((exports, module) => {
  (function(root, factory) {
    if (typeof exports === "object") {
      module.exports = exports = factory(require_core());
    } else if (typeof define === "function" && define.amd) {
      define(["./core"], factory);
    } else {
      factory(root.CryptoJS);
    }
  })(exports, function(CryptoJS) {
    (function() {
      var C = CryptoJS;
      var C_lib = C.lib;
      var Base = C_lib.Base;
      var C_enc = C.enc;
      var Utf8 = C_enc.Utf8;
      var C_algo = C.algo;
      var HMAC = C_algo.HMAC = Base.extend({
        init: function(hasher, key) {
          hasher = this._hasher = new hasher.init;
          if (typeof key == "string") {
            key = Utf8.parse(key);
          }
          var hasherBlockSize = hasher.blockSize;
          var hasherBlockSizeBytes = hasherBlockSize * 4;
          if (key.sigBytes > hasherBlockSizeBytes) {
            key = hasher.finalize(key);
          }
          key.clamp();
          var oKey = this._oKey = key.clone();
          var iKey = this._iKey = key.clone();
          var oKeyWords = oKey.words;
          var iKeyWords = iKey.words;
          for (var i = 0;i < hasherBlockSize; i++) {
            oKeyWords[i] ^= 1549556828;
            iKeyWords[i] ^= 909522486;
          }
          oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
          this.reset();
        },
        reset: function() {
          var hasher = this._hasher;
          hasher.reset();
          hasher.update(this._iKey);
        },
        update: function(messageUpdate) {
          this._hasher.update(messageUpdate);
          return this;
        },
        finalize: function(messageUpdate) {
          var hasher = this._hasher;
          var innerHash = hasher.finalize(messageUpdate);
          hasher.reset();
          var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
          return hmac;
        }
      });
    })();
  });
});

// ../../../../node_modules/crypto-js/evpkdf.js
var require_evpkdf = __commonJS((exports, module) => {
  (function(root, factory, undef) {
    if (typeof exports === "object") {
      module.exports = exports = factory(require_core(), require_sha1(), require_hmac());
    } else if (typeof define === "function" && define.amd) {
      define(["./core", "./sha1", "./hmac"], factory);
    } else {
      factory(root.CryptoJS);
    }
  })(exports, function(CryptoJS) {
    (function() {
      var C = CryptoJS;
      var C_lib = C.lib;
      var Base = C_lib.Base;
      var WordArray = C_lib.WordArray;
      var C_algo = C.algo;
      var MD5 = C_algo.MD5;
      var EvpKDF = C_algo.EvpKDF = Base.extend({
        cfg: Base.extend({
          keySize: 128 / 32,
          hasher: MD5,
          iterations: 1
        }),
        init: function(cfg) {
          this.cfg = this.cfg.extend(cfg);
        },
        compute: function(password, salt) {
          var block;
          var cfg = this.cfg;
          var hasher = cfg.hasher.create();
          var derivedKey = WordArray.create();
          var derivedKeyWords = derivedKey.words;
          var keySize = cfg.keySize;
          var iterations = cfg.iterations;
          while (derivedKeyWords.length < keySize) {
            if (block) {
              hasher.update(block);
            }
            block = hasher.update(password).finalize(salt);
            hasher.reset();
            for (var i = 1;i < iterations; i++) {
              block = hasher.finalize(block);
              hasher.reset();
            }
            derivedKey.concat(block);
          }
          derivedKey.sigBytes = keySize * 4;
          return derivedKey;
        }
      });
      C.EvpKDF = function(password, salt, cfg) {
        return EvpKDF.create(cfg).compute(password, salt);
      };
    })();
    return CryptoJS.EvpKDF;
  });
});

// ../../../../node_modules/crypto-js/cipher-core.js
var require_cipher_core = __commonJS((exports, module) => {
  (function(root, factory, undef) {
    if (typeof exports === "object") {
      module.exports = exports = factory(require_core(), require_evpkdf());
    } else if (typeof define === "function" && define.amd) {
      define(["./core", "./evpkdf"], factory);
    } else {
      factory(root.CryptoJS);
    }
  })(exports, function(CryptoJS) {
    CryptoJS.lib.Cipher || function(undefined2) {
      var C = CryptoJS;
      var C_lib = C.lib;
      var Base = C_lib.Base;
      var WordArray = C_lib.WordArray;
      var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
      var C_enc = C.enc;
      var Utf8 = C_enc.Utf8;
      var Base64 = C_enc.Base64;
      var C_algo = C.algo;
      var EvpKDF = C_algo.EvpKDF;
      var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
        cfg: Base.extend(),
        createEncryptor: function(key, cfg) {
          return this.create(this._ENC_XFORM_MODE, key, cfg);
        },
        createDecryptor: function(key, cfg) {
          return this.create(this._DEC_XFORM_MODE, key, cfg);
        },
        init: function(xformMode, key, cfg) {
          this.cfg = this.cfg.extend(cfg);
          this._xformMode = xformMode;
          this._key = key;
          this.reset();
        },
        reset: function() {
          BufferedBlockAlgorithm.reset.call(this);
          this._doReset();
        },
        process: function(dataUpdate) {
          this._append(dataUpdate);
          return this._process();
        },
        finalize: function(dataUpdate) {
          if (dataUpdate) {
            this._append(dataUpdate);
          }
          var finalProcessedData = this._doFinalize();
          return finalProcessedData;
        },
        keySize: 128 / 32,
        ivSize: 128 / 32,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function() {
          function selectCipherStrategy(key) {
            if (typeof key == "string") {
              return PasswordBasedCipher;
            } else {
              return SerializableCipher;
            }
          }
          return function(cipher) {
            return {
              encrypt: function(message, key, cfg) {
                return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
              },
              decrypt: function(ciphertext, key, cfg) {
                return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
              }
            };
          };
        }()
      });
      var StreamCipher = C_lib.StreamCipher = Cipher.extend({
        _doFinalize: function() {
          var finalProcessedBlocks = this._process(true);
          return finalProcessedBlocks;
        },
        blockSize: 1
      });
      var C_mode = C.mode = {};
      var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
        createEncryptor: function(cipher, iv) {
          return this.Encryptor.create(cipher, iv);
        },
        createDecryptor: function(cipher, iv) {
          return this.Decryptor.create(cipher, iv);
        },
        init: function(cipher, iv) {
          this._cipher = cipher;
          this._iv = iv;
        }
      });
      var CBC = C_mode.CBC = function() {
        var CBC2 = BlockCipherMode.extend();
        CBC2.Encryptor = CBC2.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            xorBlock.call(this, words, offset, blockSize);
            cipher.encryptBlock(words, offset);
            this._prevBlock = words.slice(offset, offset + blockSize);
          }
        });
        CBC2.Decryptor = CBC2.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var thisBlock = words.slice(offset, offset + blockSize);
            cipher.decryptBlock(words, offset);
            xorBlock.call(this, words, offset, blockSize);
            this._prevBlock = thisBlock;
          }
        });
        function xorBlock(words, offset, blockSize) {
          var block;
          var iv = this._iv;
          if (iv) {
            block = iv;
            this._iv = undefined2;
          } else {
            block = this._prevBlock;
          }
          for (var i = 0;i < blockSize; i++) {
            words[offset + i] ^= block[i];
          }
        }
        return CBC2;
      }();
      var C_pad = C.pad = {};
      var Pkcs7 = C_pad.Pkcs7 = {
        pad: function(data, blockSize) {
          var blockSizeBytes = blockSize * 4;
          var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
          var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
          var paddingWords = [];
          for (var i = 0;i < nPaddingBytes; i += 4) {
            paddingWords.push(paddingWord);
          }
          var padding = WordArray.create(paddingWords, nPaddingBytes);
          data.concat(padding);
        },
        unpad: function(data) {
          var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
          data.sigBytes -= nPaddingBytes;
        }
      };
      var BlockCipher = C_lib.BlockCipher = Cipher.extend({
        cfg: Cipher.cfg.extend({
          mode: CBC,
          padding: Pkcs7
        }),
        reset: function() {
          var modeCreator;
          Cipher.reset.call(this);
          var cfg = this.cfg;
          var iv = cfg.iv;
          var mode = cfg.mode;
          if (this._xformMode == this._ENC_XFORM_MODE) {
            modeCreator = mode.createEncryptor;
          } else {
            modeCreator = mode.createDecryptor;
            this._minBufferSize = 1;
          }
          if (this._mode && this._mode.__creator == modeCreator) {
            this._mode.init(this, iv && iv.words);
          } else {
            this._mode = modeCreator.call(mode, this, iv && iv.words);
            this._mode.__creator = modeCreator;
          }
        },
        _doProcessBlock: function(words, offset) {
          this._mode.processBlock(words, offset);
        },
        _doFinalize: function() {
          var finalProcessedBlocks;
          var padding = this.cfg.padding;
          if (this._xformMode == this._ENC_XFORM_MODE) {
            padding.pad(this._data, this.blockSize);
            finalProcessedBlocks = this._process(true);
          } else {
            finalProcessedBlocks = this._process(true);
            padding.unpad(finalProcessedBlocks);
          }
          return finalProcessedBlocks;
        },
        blockSize: 128 / 32
      });
      var CipherParams = C_lib.CipherParams = Base.extend({
        init: function(cipherParams) {
          this.mixIn(cipherParams);
        },
        toString: function(formatter) {
          return (formatter || this.formatter).stringify(this);
        }
      });
      var C_format = C.format = {};
      var OpenSSLFormatter = C_format.OpenSSL = {
        stringify: function(cipherParams) {
          var wordArray;
          var ciphertext = cipherParams.ciphertext;
          var salt = cipherParams.salt;
          if (salt) {
            wordArray = WordArray.create([1398893684, 1701076831]).concat(salt).concat(ciphertext);
          } else {
            wordArray = ciphertext;
          }
          return wordArray.toString(Base64);
        },
        parse: function(openSSLStr) {
          var salt;
          var ciphertext = Base64.parse(openSSLStr);
          var ciphertextWords = ciphertext.words;
          if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
            salt = WordArray.create(ciphertextWords.slice(2, 4));
            ciphertextWords.splice(0, 4);
            ciphertext.sigBytes -= 16;
          }
          return CipherParams.create({ ciphertext, salt });
        }
      };
      var SerializableCipher = C_lib.SerializableCipher = Base.extend({
        cfg: Base.extend({
          format: OpenSSLFormatter
        }),
        encrypt: function(cipher, message, key, cfg) {
          cfg = this.cfg.extend(cfg);
          var encryptor = cipher.createEncryptor(key, cfg);
          var ciphertext = encryptor.finalize(message);
          var cipherCfg = encryptor.cfg;
          return CipherParams.create({
            ciphertext,
            key,
            iv: cipherCfg.iv,
            algorithm: cipher,
            mode: cipherCfg.mode,
            padding: cipherCfg.padding,
            blockSize: cipher.blockSize,
            formatter: cfg.format
          });
        },
        decrypt: function(cipher, ciphertext, key, cfg) {
          cfg = this.cfg.extend(cfg);
          ciphertext = this._parse(ciphertext, cfg.format);
          var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
          return plaintext;
        },
        _parse: function(ciphertext, format) {
          if (typeof ciphertext == "string") {
            return format.parse(ciphertext, this);
          } else {
            return ciphertext;
          }
        }
      });
      var C_kdf = C.kdf = {};
      var OpenSSLKdf = C_kdf.OpenSSL = {
        execute: function(password, keySize, ivSize, salt, hasher) {
          if (!salt) {
            salt = WordArray.random(64 / 8);
          }
          if (!hasher) {
            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
          } else {
            var key = EvpKDF.create({ keySize: keySize + ivSize, hasher }).compute(password, salt);
          }
          var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
          key.sigBytes = keySize * 4;
          return CipherParams.create({ key, iv, salt });
        }
      };
      var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
        cfg: SerializableCipher.cfg.extend({
          kdf: OpenSSLKdf
        }),
        encrypt: function(cipher, message, password, cfg) {
          cfg = this.cfg.extend(cfg);
          var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, cfg.salt, cfg.hasher);
          cfg.iv = derivedParams.iv;
          var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
          ciphertext.mixIn(derivedParams);
          return ciphertext;
        },
        decrypt: function(cipher, ciphertext, password, cfg) {
          cfg = this.cfg.extend(cfg);
          ciphertext = this._parse(ciphertext, cfg.format);
          var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt, cfg.hasher);
          cfg.iv = derivedParams.iv;
          var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
          return plaintext;
        }
      });
    }();
  });
});

// ../../../../node_modules/crypto-js/aes.js
var require_aes = __commonJS((exports, module) => {
  (function(root, factory, undef) {
    if (typeof exports === "object") {
      module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
    } else if (typeof define === "function" && define.amd) {
      define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
    } else {
      factory(root.CryptoJS);
    }
  })(exports, function(CryptoJS) {
    (function() {
      var C = CryptoJS;
      var C_lib = C.lib;
      var BlockCipher = C_lib.BlockCipher;
      var C_algo = C.algo;
      var SBOX = [];
      var INV_SBOX = [];
      var SUB_MIX_0 = [];
      var SUB_MIX_1 = [];
      var SUB_MIX_2 = [];
      var SUB_MIX_3 = [];
      var INV_SUB_MIX_0 = [];
      var INV_SUB_MIX_1 = [];
      var INV_SUB_MIX_2 = [];
      var INV_SUB_MIX_3 = [];
      (function() {
        var d = [];
        for (var i = 0;i < 256; i++) {
          if (i < 128) {
            d[i] = i << 1;
          } else {
            d[i] = i << 1 ^ 283;
          }
        }
        var x = 0;
        var xi = 0;
        for (var i = 0;i < 256; i++) {
          var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
          sx = sx >>> 8 ^ sx & 255 ^ 99;
          SBOX[x] = sx;
          INV_SBOX[sx] = x;
          var x2 = d[x];
          var x4 = d[x2];
          var x8 = d[x4];
          var t = d[sx] * 257 ^ sx * 16843008;
          SUB_MIX_0[x] = t << 24 | t >>> 8;
          SUB_MIX_1[x] = t << 16 | t >>> 16;
          SUB_MIX_2[x] = t << 8 | t >>> 24;
          SUB_MIX_3[x] = t;
          var t = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
          INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
          INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
          INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
          INV_SUB_MIX_3[sx] = t;
          if (!x) {
            x = xi = 1;
          } else {
            x = x2 ^ d[d[d[x8 ^ x2]]];
            xi ^= d[d[xi]];
          }
        }
      })();
      var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
      var AES = C_algo.AES = BlockCipher.extend({
        _doReset: function() {
          var t;
          if (this._nRounds && this._keyPriorReset === this._key) {
            return;
          }
          var key = this._keyPriorReset = this._key;
          var keyWords = key.words;
          var keySize = key.sigBytes / 4;
          var nRounds = this._nRounds = keySize + 6;
          var ksRows = (nRounds + 1) * 4;
          var keySchedule = this._keySchedule = [];
          for (var ksRow = 0;ksRow < ksRows; ksRow++) {
            if (ksRow < keySize) {
              keySchedule[ksRow] = keyWords[ksRow];
            } else {
              t = keySchedule[ksRow - 1];
              if (!(ksRow % keySize)) {
                t = t << 8 | t >>> 24;
                t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
                t ^= RCON[ksRow / keySize | 0] << 24;
              } else if (keySize > 6 && ksRow % keySize == 4) {
                t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
              }
              keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
            }
          }
          var invKeySchedule = this._invKeySchedule = [];
          for (var invKsRow = 0;invKsRow < ksRows; invKsRow++) {
            var ksRow = ksRows - invKsRow;
            if (invKsRow % 4) {
              var t = keySchedule[ksRow];
            } else {
              var t = keySchedule[ksRow - 4];
            }
            if (invKsRow < 4 || ksRow <= 4) {
              invKeySchedule[invKsRow] = t;
            } else {
              invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t & 255]];
            }
          }
        },
        encryptBlock: function(M, offset) {
          this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
        },
        decryptBlock: function(M, offset) {
          var t = M[offset + 1];
          M[offset + 1] = M[offset + 3];
          M[offset + 3] = t;
          this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
          var t = M[offset + 1];
          M[offset + 1] = M[offset + 3];
          M[offset + 3] = t;
        },
        _doCryptBlock: function(M, offset, keySchedule, SUB_MIX_02, SUB_MIX_12, SUB_MIX_22, SUB_MIX_32, SBOX2) {
          var nRounds = this._nRounds;
          var s0 = M[offset] ^ keySchedule[0];
          var s1 = M[offset + 1] ^ keySchedule[1];
          var s2 = M[offset + 2] ^ keySchedule[2];
          var s3 = M[offset + 3] ^ keySchedule[3];
          var ksRow = 4;
          for (var round = 1;round < nRounds; round++) {
            var t0 = SUB_MIX_02[s0 >>> 24] ^ SUB_MIX_12[s1 >>> 16 & 255] ^ SUB_MIX_22[s2 >>> 8 & 255] ^ SUB_MIX_32[s3 & 255] ^ keySchedule[ksRow++];
            var t1 = SUB_MIX_02[s1 >>> 24] ^ SUB_MIX_12[s2 >>> 16 & 255] ^ SUB_MIX_22[s3 >>> 8 & 255] ^ SUB_MIX_32[s0 & 255] ^ keySchedule[ksRow++];
            var t2 = SUB_MIX_02[s2 >>> 24] ^ SUB_MIX_12[s3 >>> 16 & 255] ^ SUB_MIX_22[s0 >>> 8 & 255] ^ SUB_MIX_32[s1 & 255] ^ keySchedule[ksRow++];
            var t3 = SUB_MIX_02[s3 >>> 24] ^ SUB_MIX_12[s0 >>> 16 & 255] ^ SUB_MIX_22[s1 >>> 8 & 255] ^ SUB_MIX_32[s2 & 255] ^ keySchedule[ksRow++];
            s0 = t0;
            s1 = t1;
            s2 = t2;
            s3 = t3;
          }
          var t0 = (SBOX2[s0 >>> 24] << 24 | SBOX2[s1 >>> 16 & 255] << 16 | SBOX2[s2 >>> 8 & 255] << 8 | SBOX2[s3 & 255]) ^ keySchedule[ksRow++];
          var t1 = (SBOX2[s1 >>> 24] << 24 | SBOX2[s2 >>> 16 & 255] << 16 | SBOX2[s3 >>> 8 & 255] << 8 | SBOX2[s0 & 255]) ^ keySchedule[ksRow++];
          var t2 = (SBOX2[s2 >>> 24] << 24 | SBOX2[s3 >>> 16 & 255] << 16 | SBOX2[s0 >>> 8 & 255] << 8 | SBOX2[s1 & 255]) ^ keySchedule[ksRow++];
          var t3 = (SBOX2[s3 >>> 24] << 24 | SBOX2[s0 >>> 16 & 255] << 16 | SBOX2[s1 >>> 8 & 255] << 8 | SBOX2[s2 & 255]) ^ keySchedule[ksRow++];
          M[offset] = t0;
          M[offset + 1] = t1;
          M[offset + 2] = t2;
          M[offset + 3] = t3;
        },
        keySize: 256 / 32
      });
      C.AES = BlockCipher._createHelper(AES);
    })();
    return CryptoJS.AES;
  });
});

// ../security/src/key.ts
var import_enc_base64 = __toESM(require_enc_base64(), 1);
var import_enc_utf8 = __toESM(require_enc_utf8(), 1);
import { getRandomValues } from "crypto";
function generateAppKey() {
  const random = getRandomValues(new Uint8Array(32));
  const encodedWord = import_enc_utf8.default.parse(random.toString());
  const key = import_enc_base64.default.stringify(encodedWord);
  return `base64:${key}`;
}

// ../security/src/crypt.ts
var import_aes = __toESM(require_aes(), 1);
var import_enc_utf82 = __toESM(require_enc_utf8(), 1);
import { config } from "@stacksjs/config";
function encrypt(message, customPassphrase) {
  const passphrase = customPassphrase || config.app.key;
  if (!passphrase)
    throw new Error("APP_KEY is not defined");
  return import_aes.default.encrypt(message, passphrase).toString();
}
function decrypt(encrypted, customPassphrase) {
  const passphrase = customPassphrase || config.app.key;
  if (!passphrase)
    throw new Error("APP_KEY is not defined");
  return import_aes.default.decrypt(encrypted, passphrase).toString(import_enc_utf82.default);
}
// ../security/src/hash.ts
var import_md5 = __toESM(require_md5(), 1);
import { hashing } from "@stacksjs/config";

// ../../../../node_modules/js-base64/base64.mjs
var version = "3.7.7";
var VERSION = version;
var _hasBuffer = typeof Buffer === "function";
var _TD = typeof TextDecoder === "function" ? new TextDecoder : undefined;
var _TE = typeof TextEncoder === "function" ? new TextEncoder : undefined;
var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64chs = Array.prototype.slice.call(b64ch);
var b64tab = ((a) => {
  let tab = {};
  a.forEach((c, i) => tab[c] = i);
  return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
var _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, "");
var btoaPolyfill = (bin) => {
  let u32, c0, c1, c2, asc = "";
  const pad = bin.length % 3;
  for (let i = 0;i < bin.length; ) {
    if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255)
      throw new TypeError("invalid character found");
    u32 = c0 << 16 | c1 << 8 | c2;
    asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
  }
  return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
var _btoa = typeof btoa === "function" ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
  const maxargs = 4096;
  let strs = [];
  for (let i = 0, l = u8a.length;i < l; i += maxargs) {
    strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
  }
  return _btoa(strs.join(""));
};
var fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
var cb_utob = (c) => {
  if (c.length < 2) {
    var cc = c.charCodeAt(0);
    return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  } else {
    var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
    return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  }
};
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var utob = (u) => u.replace(re_utob, cb_utob);
var _encode = _hasBuffer ? (s) => Buffer.from(s, "utf8").toString("base64") : _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
var encodeURI = (src) => encode(src, true);
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = (cccc) => {
  switch (cccc.length) {
    case 4:
      var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
      return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
    case 3:
      return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
    default:
      return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
  }
};
var btou = (b) => b.replace(re_btou, cb_btou);
var atobPolyfill = (asc) => {
  asc = asc.replace(/\s+/g, "");
  if (!b64re.test(asc))
    throw new TypeError("malformed base64.");
  asc += "==".slice(2 - (asc.length & 3));
  let u24, bin = "", r1, r2;
  for (let i = 0;i < asc.length; ) {
    u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
    bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
  }
  return bin;
};
var _atob = typeof atob === "function" ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
var _toUint8Array = _hasBuffer ? (a) => _U8Afrom(Buffer.from(a, "base64")) : (a) => _U8Afrom(_atob(a).split("").map((c) => c.charCodeAt(0)));
var toUint8Array = (a) => _toUint8Array(_unURI(a));
var _decode = _hasBuffer ? (a) => Buffer.from(a, "base64").toString("utf8") : _TD ? (a) => _TD.decode(_toUint8Array(a)) : (a) => btou(_atob(a));
var _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
var decode = (src) => _decode(_unURI(src));
var isValid = (src) => {
  if (typeof src !== "string")
    return false;
  const s = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
  return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
};
var _noEnum = (v) => {
  return {
    value: v,
    enumerable: false,
    writable: true,
    configurable: true
  };
};
var extendString = function() {
  const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
  _add("fromBase64", function() {
    return decode(this);
  });
  _add("toBase64", function(urlsafe) {
    return encode(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return encode(this, true);
  });
  _add("toBase64URL", function() {
    return encode(this, true);
  });
  _add("toUint8Array", function() {
    return toUint8Array(this);
  });
};
var extendUint8Array = function() {
  const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
  _add("toBase64", function(urlsafe) {
    return fromUint8Array(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return fromUint8Array(this, true);
  });
  _add("toBase64URL", function() {
    return fromUint8Array(this, true);
  });
};
var extendBuiltins = () => {
  extendString();
  extendUint8Array();
};
var gBase64 = {
  version,
  VERSION,
  atob: _atob,
  atobPolyfill,
  btoa: _btoa,
  btoaPolyfill,
  fromBase64: decode,
  toBase64: encode,
  encode,
  encodeURI,
  encodeURL: encodeURI,
  utob,
  btou,
  decode,
  isValid,
  fromUint8Array,
  toUint8Array,
  extendString,
  extendUint8Array,
  extendBuiltins
};

// ../security/src/hash.ts
async function make(password, options) {
  if (options?.algorithm === "argon2")
    return await argon2Encode(password, { type: "argon2id" });
  if (options?.algorithm === "bcrypt")
    return await bcryptEncode(password);
  if (options?.algorithm === "base64")
    return base64Encode(password);
  throw new Error("Unsupported algorithm");
}
async function verify(password, hash, algorithm) {
  if (algorithm === "argon2")
    return await argon2Verify(password, hash);
  if (algorithm === "bcrypt")
    return await bcryptVerify(password, hash);
  if (algorithm === "base64")
    return base64Verify(password, hash);
  throw new Error("Unsupported algorithm");
}
async function bcryptEncode(password) {
  if (!hashing.bcrypt)
    throw new Error("Bcrypt hashing is not configured");
  const bcryptHash = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: hashing.bcrypt.cost
  });
  return bcryptHash;
}
async function argon2Encode(password, options) {
  if (!hashing.argon2)
    throw new Error("Argon2 hashing is not configured");
  const argon2Hash = await Bun.password.hash(password, {
    algorithm: options?.type || "argon2id",
    memoryCost: hashing.argon2.memory,
    timeCost: hashing.argon2.time
  });
  return argon2Hash;
}
async function argon2Verify(password, hash) {
  return await Bun.password.verify(password, hash);
}
async function bcryptVerify(password, hash) {
  return await Bun.password.verify(password, hash);
}
function base64Encode(password) {
  return gBase64.encode(password);
}
function base64Verify(password, hash) {
  return gBase64.decode(hash) === password;
}
export { encrypt, decrypt, make, verify, generateAppKey };
