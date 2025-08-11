import {
  require_lib
} from "./chunk-41gaps3d.js";
import {
  __commonJS
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/source-map-js/lib/base64.js
var require_base64 = __commonJS((exports) => {
  var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  exports.encode = function(number) {
    if (0 <= number && number < intToCharMap.length) {
      return intToCharMap[number];
    }
    throw new TypeError("Must be between 0 and 63: " + number);
  };
  exports.decode = function(charCode) {
    var bigA = 65;
    var bigZ = 90;
    var littleA = 97;
    var littleZ = 122;
    var zero = 48;
    var nine = 57;
    var plus = 43;
    var slash = 47;
    var littleOffset = 26;
    var numberOffset = 52;
    if (bigA <= charCode && charCode <= bigZ) {
      return charCode - bigA;
    }
    if (littleA <= charCode && charCode <= littleZ) {
      return charCode - littleA + littleOffset;
    }
    if (zero <= charCode && charCode <= nine) {
      return charCode - zero + numberOffset;
    }
    if (charCode == plus) {
      return 62;
    }
    if (charCode == slash) {
      return 63;
    }
    return -1;
  };
});

// ../../../../node_modules/source-map-js/lib/base64-vlq.js
var require_base64_vlq = __commonJS((exports) => {
  var base64 = require_base64();
  var VLQ_BASE_SHIFT = 5;
  var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
  var VLQ_BASE_MASK = VLQ_BASE - 1;
  var VLQ_CONTINUATION_BIT = VLQ_BASE;
  function toVLQSigned(aValue) {
    return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
  }
  function fromVLQSigned(aValue) {
    var isNegative = (aValue & 1) === 1;
    var shifted = aValue >> 1;
    return isNegative ? -shifted : shifted;
  }
  exports.encode = function base64VLQ_encode(aValue) {
    var encoded = "";
    var digit;
    var vlq = toVLQSigned(aValue);
    do {
      digit = vlq & VLQ_BASE_MASK;
      vlq >>>= VLQ_BASE_SHIFT;
      if (vlq > 0) {
        digit |= VLQ_CONTINUATION_BIT;
      }
      encoded += base64.encode(digit);
    } while (vlq > 0);
    return encoded;
  };
  exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
    var strLen = aStr.length;
    var result = 0;
    var shift = 0;
    var continuation, digit;
    do {
      if (aIndex >= strLen) {
        throw new Error("Expected more digits in base 64 VLQ value.");
      }
      digit = base64.decode(aStr.charCodeAt(aIndex++));
      if (digit === -1) {
        throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
      }
      continuation = !!(digit & VLQ_CONTINUATION_BIT);
      digit &= VLQ_BASE_MASK;
      result = result + (digit << shift);
      shift += VLQ_BASE_SHIFT;
    } while (continuation);
    aOutParam.value = fromVLQSigned(result);
    aOutParam.rest = aIndex;
  };
});

// ../../../../node_modules/source-map-js/lib/util.js
var require_util = __commonJS((exports) => {
  function getArg(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) {
      return aArgs[aName];
    } else if (arguments.length === 3) {
      return aDefaultValue;
    } else {
      throw new Error('"' + aName + '" is a required argument.');
    }
  }
  exports.getArg = getArg;
  var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
  var dataUrlRegexp = /^data:.+\,.+$/;
  function urlParse(aUrl) {
    var match = aUrl.match(urlRegexp);
    if (!match) {
      return null;
    }
    return {
      scheme: match[1],
      auth: match[2],
      host: match[3],
      port: match[4],
      path: match[5]
    };
  }
  exports.urlParse = urlParse;
  function urlGenerate(aParsedUrl) {
    var url = "";
    if (aParsedUrl.scheme) {
      url += aParsedUrl.scheme + ":";
    }
    url += "//";
    if (aParsedUrl.auth) {
      url += aParsedUrl.auth + "@";
    }
    if (aParsedUrl.host) {
      url += aParsedUrl.host;
    }
    if (aParsedUrl.port) {
      url += ":" + aParsedUrl.port;
    }
    if (aParsedUrl.path) {
      url += aParsedUrl.path;
    }
    return url;
  }
  exports.urlGenerate = urlGenerate;
  var MAX_CACHED_INPUTS = 32;
  function lruMemoize(f) {
    var cache = [];
    return function(input) {
      for (var i = 0;i < cache.length; i++) {
        if (cache[i].input === input) {
          var temp = cache[0];
          cache[0] = cache[i];
          cache[i] = temp;
          return cache[0].result;
        }
      }
      var result = f(input);
      cache.unshift({
        input,
        result
      });
      if (cache.length > MAX_CACHED_INPUTS) {
        cache.pop();
      }
      return result;
    };
  }
  var normalize = lruMemoize(function normalize(aPath) {
    var path = aPath;
    var url = urlParse(aPath);
    if (url) {
      if (!url.path) {
        return aPath;
      }
      path = url.path;
    }
    var isAbsolute = exports.isAbsolute(path);
    var parts = [];
    var start = 0;
    var i = 0;
    while (true) {
      start = i;
      i = path.indexOf("/", start);
      if (i === -1) {
        parts.push(path.slice(start));
        break;
      } else {
        parts.push(path.slice(start, i));
        while (i < path.length && path[i] === "/") {
          i++;
        }
      }
    }
    for (var part, up = 0, i = parts.length - 1;i >= 0; i--) {
      part = parts[i];
      if (part === ".") {
        parts.splice(i, 1);
      } else if (part === "..") {
        up++;
      } else if (up > 0) {
        if (part === "") {
          parts.splice(i + 1, up);
          up = 0;
        } else {
          parts.splice(i, 2);
          up--;
        }
      }
    }
    path = parts.join("/");
    if (path === "") {
      path = isAbsolute ? "/" : ".";
    }
    if (url) {
      url.path = path;
      return urlGenerate(url);
    }
    return path;
  });
  exports.normalize = normalize;
  function join(aRoot, aPath) {
    if (aRoot === "") {
      aRoot = ".";
    }
    if (aPath === "") {
      aPath = ".";
    }
    var aPathUrl = urlParse(aPath);
    var aRootUrl = urlParse(aRoot);
    if (aRootUrl) {
      aRoot = aRootUrl.path || "/";
    }
    if (aPathUrl && !aPathUrl.scheme) {
      if (aRootUrl) {
        aPathUrl.scheme = aRootUrl.scheme;
      }
      return urlGenerate(aPathUrl);
    }
    if (aPathUrl || aPath.match(dataUrlRegexp)) {
      return aPath;
    }
    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
      aRootUrl.host = aPath;
      return urlGenerate(aRootUrl);
    }
    var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
    if (aRootUrl) {
      aRootUrl.path = joined;
      return urlGenerate(aRootUrl);
    }
    return joined;
  }
  exports.join = join;
  exports.isAbsolute = function(aPath) {
    return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
  };
  function relative(aRoot, aPath) {
    if (aRoot === "") {
      aRoot = ".";
    }
    aRoot = aRoot.replace(/\/$/, "");
    var level = 0;
    while (aPath.indexOf(aRoot + "/") !== 0) {
      var index = aRoot.lastIndexOf("/");
      if (index < 0) {
        return aPath;
      }
      aRoot = aRoot.slice(0, index);
      if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
        return aPath;
      }
      ++level;
    }
    return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
  }
  exports.relative = relative;
  var supportsNullProto = function() {
    var obj = Object.create(null);
    return !("__proto__" in obj);
  }();
  function identity(s) {
    return s;
  }
  function toSetString(aStr) {
    if (isProtoString(aStr)) {
      return "$" + aStr;
    }
    return aStr;
  }
  exports.toSetString = supportsNullProto ? identity : toSetString;
  function fromSetString(aStr) {
    if (isProtoString(aStr)) {
      return aStr.slice(1);
    }
    return aStr;
  }
  exports.fromSetString = supportsNullProto ? identity : fromSetString;
  function isProtoString(s) {
    if (!s) {
      return false;
    }
    var length = s.length;
    if (length < 9) {
      return false;
    }
    if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
      return false;
    }
    for (var i = length - 10;i >= 0; i--) {
      if (s.charCodeAt(i) !== 36) {
        return false;
      }
    }
    return true;
  }
  function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
    var cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0 || onlyCompareOriginal) {
      return cmp;
    }
    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }
    return strcmp(mappingA.name, mappingB.name);
  }
  exports.compareByOriginalPositions = compareByOriginalPositions;
  function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
    var cmp;
    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0 || onlyCompareOriginal) {
      return cmp;
    }
    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }
    return strcmp(mappingA.name, mappingB.name);
  }
  exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;
  function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0 || onlyCompareGenerated) {
      return cmp;
    }
    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) {
      return cmp;
    }
    return strcmp(mappingA.name, mappingB.name);
  }
  exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
  function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
    var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0 || onlyCompareGenerated) {
      return cmp;
    }
    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) {
      return cmp;
    }
    return strcmp(mappingA.name, mappingB.name);
  }
  exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;
  function strcmp(aStr1, aStr2) {
    if (aStr1 === aStr2) {
      return 0;
    }
    if (aStr1 === null) {
      return 1;
    }
    if (aStr2 === null) {
      return -1;
    }
    if (aStr1 > aStr2) {
      return 1;
    }
    return -1;
  }
  function compareByGeneratedPositionsInflated(mappingA, mappingB) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }
    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) {
      return cmp;
    }
    return strcmp(mappingA.name, mappingB.name);
  }
  exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
  function parseSourceMapInput(str) {
    return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
  }
  exports.parseSourceMapInput = parseSourceMapInput;
  function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
    sourceURL = sourceURL || "";
    if (sourceRoot) {
      if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
        sourceRoot += "/";
      }
      sourceURL = sourceRoot + sourceURL;
    }
    if (sourceMapURL) {
      var parsed = urlParse(sourceMapURL);
      if (!parsed) {
        throw new Error("sourceMapURL could not be parsed");
      }
      if (parsed.path) {
        var index = parsed.path.lastIndexOf("/");
        if (index >= 0) {
          parsed.path = parsed.path.substring(0, index + 1);
        }
      }
      sourceURL = join(urlGenerate(parsed), sourceURL);
    }
    return normalize(sourceURL);
  }
  exports.computeSourceURL = computeSourceURL;
});

// ../../../../node_modules/source-map-js/lib/array-set.js
var require_array_set = __commonJS((exports) => {
  var util = require_util();
  var has = Object.prototype.hasOwnProperty;
  var hasNativeMap = typeof Map !== "undefined";
  function ArraySet() {
    this._array = [];
    this._set = hasNativeMap ? new Map : Object.create(null);
  }
  ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
    var set = new ArraySet;
    for (var i = 0, len = aArray.length;i < len; i++) {
      set.add(aArray[i], aAllowDuplicates);
    }
    return set;
  };
  ArraySet.prototype.size = function ArraySet_size() {
    return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  };
  ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
    var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
    var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
    var idx = this._array.length;
    if (!isDuplicate || aAllowDuplicates) {
      this._array.push(aStr);
    }
    if (!isDuplicate) {
      if (hasNativeMap) {
        this._set.set(aStr, idx);
      } else {
        this._set[sStr] = idx;
      }
    }
  };
  ArraySet.prototype.has = function ArraySet_has(aStr) {
    if (hasNativeMap) {
      return this._set.has(aStr);
    } else {
      var sStr = util.toSetString(aStr);
      return has.call(this._set, sStr);
    }
  };
  ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
    if (hasNativeMap) {
      var idx = this._set.get(aStr);
      if (idx >= 0) {
        return idx;
      }
    } else {
      var sStr = util.toSetString(aStr);
      if (has.call(this._set, sStr)) {
        return this._set[sStr];
      }
    }
    throw new Error('"' + aStr + '" is not in the set.');
  };
  ArraySet.prototype.at = function ArraySet_at(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) {
      return this._array[aIdx];
    }
    throw new Error("No element indexed by " + aIdx);
  };
  ArraySet.prototype.toArray = function ArraySet_toArray() {
    return this._array.slice();
  };
  exports.ArraySet = ArraySet;
});

// ../../../../node_modules/source-map-js/lib/mapping-list.js
var require_mapping_list = __commonJS((exports) => {
  var util = require_util();
  function generatedPositionAfter(mappingA, mappingB) {
    var lineA = mappingA.generatedLine;
    var lineB = mappingB.generatedLine;
    var columnA = mappingA.generatedColumn;
    var columnB = mappingB.generatedColumn;
    return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
  }
  function MappingList() {
    this._array = [];
    this._sorted = true;
    this._last = { generatedLine: -1, generatedColumn: 0 };
  }
  MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };
  MappingList.prototype.add = function MappingList_add(aMapping) {
    if (generatedPositionAfter(this._last, aMapping)) {
      this._last = aMapping;
      this._array.push(aMapping);
    } else {
      this._sorted = false;
      this._array.push(aMapping);
    }
  };
  MappingList.prototype.toArray = function MappingList_toArray() {
    if (!this._sorted) {
      this._array.sort(util.compareByGeneratedPositionsInflated);
      this._sorted = true;
    }
    return this._array;
  };
  exports.MappingList = MappingList;
});

// ../../../../node_modules/source-map-js/lib/source-map-generator.js
var require_source_map_generator = __commonJS((exports) => {
  var base64VLQ = require_base64_vlq();
  var util = require_util();
  var ArraySet = require_array_set().ArraySet;
  var MappingList = require_mapping_list().MappingList;
  function SourceMapGenerator(aArgs) {
    if (!aArgs) {
      aArgs = {};
    }
    this._file = util.getArg(aArgs, "file", null);
    this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
    this._skipValidation = util.getArg(aArgs, "skipValidation", false);
    this._ignoreInvalidMapping = util.getArg(aArgs, "ignoreInvalidMapping", false);
    this._sources = new ArraySet;
    this._names = new ArraySet;
    this._mappings = new MappingList;
    this._sourcesContents = null;
  }
  SourceMapGenerator.prototype._version = 3;
  SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer, generatorOps) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator(Object.assign(generatorOps || {}, {
      file: aSourceMapConsumer.file,
      sourceRoot
    }));
    aSourceMapConsumer.eachMapping(function(mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };
      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util.relative(sourceRoot, newMapping.source);
        }
        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };
        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }
      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function(sourceFile) {
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util.relative(sourceRoot, sourceFile);
      }
      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };
  SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, "generated");
    var original = util.getArg(aArgs, "original", null);
    var source = util.getArg(aArgs, "source", null);
    var name = util.getArg(aArgs, "name", null);
    if (!this._skipValidation) {
      if (this._validateMapping(generated, original, source, name) === false) {
        return;
      }
    }
    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }
    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }
    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source,
      name
    });
  };
  SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util.relative(this._sourceRoot, source);
    }
    if (aSourceContent != null) {
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      delete this._sourcesContents[util.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };
  SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error("SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, " + `or the source map's "file" property. Both were omitted.`);
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    if (sourceRoot != null) {
      sourceFile = util.relative(sourceRoot, sourceFile);
    }
    var newSources = new ArraySet;
    var newNames = new ArraySet;
    this._mappings.unsortedForEach(function(mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util.join(aSourceMapPath, mapping.source);
          }
          if (sourceRoot != null) {
            mapping.source = util.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }
      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }
      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }
    }, this);
    this._sources = newSources;
    this._names = newNames;
    aSourceMapConsumer.sources.forEach(function(sourceFile2) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile2 = util.join(aSourceMapPath, sourceFile2);
        }
        if (sourceRoot != null) {
          sourceFile2 = util.relative(sourceRoot, sourceFile2);
        }
        this.setSourceContent(sourceFile2, content);
      }
    }, this);
  };
  SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
    if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
      var message = "original.line and original.column are not numbers -- you probably meant to omit " + "the original mapping entirely and only map the generated position. If so, pass " + "null for the original mapping instead of an object with empty or null values.";
      if (this._ignoreInvalidMapping) {
        if (typeof console !== "undefined" && console.warn) {
          console.warn(message);
        }
        return false;
      } else {
        throw new Error(message);
      }
    }
    if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
      return;
    } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
      return;
    } else {
      var message = "Invalid mapping: " + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      });
      if (this._ignoreInvalidMapping) {
        if (typeof console !== "undefined" && console.warn) {
          console.warn(message);
        }
        return false;
      } else {
        throw new Error(message);
      }
    }
  };
  SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = "";
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;
    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length;i < len; i++) {
      mapping = mappings[i];
      next = "";
      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ";";
          previousGeneratedLine++;
        }
      } else {
        if (i > 0) {
          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ",";
        }
      }
      next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;
      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;
        next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;
        next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;
        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }
      result += next;
    }
    return result;
  };
  SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function(source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util.relative(aSourceRoot, source);
      }
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
    }, this);
  };
  SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }
    return map;
  };
  SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };
  exports.SourceMapGenerator = SourceMapGenerator;
});

// ../../../../node_modules/source-map-js/lib/binary-search.js
var require_binary_search = __commonJS((exports) => {
  exports.GREATEST_LOWER_BOUND = 1;
  exports.LEAST_UPPER_BOUND = 2;
  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
    var cmp = aCompare(aNeedle, aHaystack[mid], true);
    if (cmp === 0) {
      return mid;
    } else if (cmp > 0) {
      if (aHigh - mid > 1) {
        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
      }
      if (aBias == exports.LEAST_UPPER_BOUND) {
        return aHigh < aHaystack.length ? aHigh : -1;
      } else {
        return mid;
      }
    } else {
      if (mid - aLow > 1) {
        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
      }
      if (aBias == exports.LEAST_UPPER_BOUND) {
        return mid;
      } else {
        return aLow < 0 ? -1 : aLow;
      }
    }
  }
  exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
    if (aHaystack.length === 0) {
      return -1;
    }
    var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
    if (index < 0) {
      return -1;
    }
    while (index - 1 >= 0) {
      if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
        break;
      }
      --index;
    }
    return index;
  };
});

// ../../../../node_modules/source-map-js/lib/quick-sort.js
var require_quick_sort = __commonJS((exports) => {
  function SortTemplate(comparator) {
    function swap(ary, x, y) {
      var temp = ary[x];
      ary[x] = ary[y];
      ary[y] = temp;
    }
    function randomIntInRange(low, high) {
      return Math.round(low + Math.random() * (high - low));
    }
    function doQuickSort(ary, comparator2, p, r) {
      if (p < r) {
        var pivotIndex = randomIntInRange(p, r);
        var i = p - 1;
        swap(ary, pivotIndex, r);
        var pivot = ary[r];
        for (var j = p;j < r; j++) {
          if (comparator2(ary[j], pivot, false) <= 0) {
            i += 1;
            swap(ary, i, j);
          }
        }
        swap(ary, i + 1, j);
        var q = i + 1;
        doQuickSort(ary, comparator2, p, q - 1);
        doQuickSort(ary, comparator2, q + 1, r);
      }
    }
    return doQuickSort;
  }
  function cloneSort(comparator) {
    let template = SortTemplate.toString();
    let templateFn = new Function(`return ${template}`)();
    return templateFn(comparator);
  }
  var sortCache = new WeakMap;
  exports.quickSort = function(ary, comparator, start = 0) {
    let doQuickSort = sortCache.get(comparator);
    if (doQuickSort === undefined) {
      doQuickSort = cloneSort(comparator);
      sortCache.set(comparator, doQuickSort);
    }
    doQuickSort(ary, comparator, start, ary.length - 1);
  };
});

// ../../../../node_modules/source-map-js/lib/source-map-consumer.js
var require_source_map_consumer = __commonJS((exports) => {
  var util = require_util();
  var binarySearch = require_binary_search();
  var ArraySet = require_array_set().ArraySet;
  var base64VLQ = require_base64_vlq();
  var quickSort = require_quick_sort().quickSort;
  function SourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === "string") {
      sourceMap = util.parseSourceMapInput(aSourceMap);
    }
    return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
  }
  SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
    return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
  };
  SourceMapConsumer.prototype._version = 3;
  SourceMapConsumer.prototype.__generatedMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
    configurable: true,
    enumerable: true,
    get: function() {
      if (!this.__generatedMappings) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }
      return this.__generatedMappings;
    }
  });
  SourceMapConsumer.prototype.__originalMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
    configurable: true,
    enumerable: true,
    get: function() {
      if (!this.__originalMappings) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }
      return this.__originalMappings;
    }
  });
  SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };
  SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };
  SourceMapConsumer.GENERATED_ORDER = 1;
  SourceMapConsumer.ORIGINAL_ORDER = 2;
  SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
  SourceMapConsumer.LEAST_UPPER_BOUND = 2;
  SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
    var mappings;
    switch (order) {
      case SourceMapConsumer.GENERATED_ORDER:
        mappings = this._generatedMappings;
        break;
      case SourceMapConsumer.ORIGINAL_ORDER:
        mappings = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
    }
    var sourceRoot = this.sourceRoot;
    var boundCallback = aCallback.bind(context);
    var names = this._names;
    var sources = this._sources;
    var sourceMapURL = this._sourceMapURL;
    for (var i = 0, n = mappings.length;i < n; i++) {
      var mapping = mappings[i];
      var source = mapping.source === null ? null : sources.at(mapping.source);
      if (source !== null) {
        source = util.computeSourceURL(sourceRoot, source, sourceMapURL);
      }
      boundCallback({
        source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : names.at(mapping.name)
      });
    }
  };
  SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, "line");
    var needle = {
      source: util.getArg(aArgs, "source"),
      originalLine: line,
      originalColumn: util.getArg(aArgs, "column", 0)
    };
    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }
    var mappings = [];
    var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];
      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, "generatedLine", null),
            column: util.getArg(mapping, "generatedColumn", null),
            lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
          });
          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;
        while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, "generatedLine", null),
            column: util.getArg(mapping, "generatedColumn", null),
            lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
          });
          mapping = this._originalMappings[++index];
        }
      }
    }
    return mappings;
  };
  exports.SourceMapConsumer = SourceMapConsumer;
  function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === "string") {
      sourceMap = util.parseSourceMapInput(aSourceMap);
    }
    var version = util.getArg(sourceMap, "version");
    var sources = util.getArg(sourceMap, "sources");
    var names = util.getArg(sourceMap, "names", []);
    var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
    var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
    var mappings = util.getArg(sourceMap, "mappings");
    var file = util.getArg(sourceMap, "file", null);
    if (version != this._version) {
      throw new Error("Unsupported version: " + version);
    }
    if (sourceRoot) {
      sourceRoot = util.normalize(sourceRoot);
    }
    sources = sources.map(String).map(util.normalize).map(function(source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
    });
    this._names = ArraySet.fromArray(names.map(String), true);
    this._sources = ArraySet.fromArray(sources, true);
    this._absoluteSources = this._sources.toArray().map(function(s) {
      return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
    });
    this.sourceRoot = sourceRoot;
    this.sourcesContent = sourcesContent;
    this._mappings = mappings;
    this._sourceMapURL = aSourceMapURL;
    this.file = file;
  }
  BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
  BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
  BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }
    if (this._sources.has(relativeSource)) {
      return this._sources.indexOf(relativeSource);
    }
    var i;
    for (i = 0;i < this._absoluteSources.length; ++i) {
      if (this._absoluteSources[i] == aSource) {
        return i;
      }
    }
    return -1;
  };
  BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);
    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function(s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });
    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];
    for (var i = 0, length = generatedMappings.length;i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;
      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;
        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }
        destOriginalMappings.push(destMapping);
      }
      destGeneratedMappings.push(destMapping);
    }
    quickSort(smc.__originalMappings, util.compareByOriginalPositions);
    return smc;
  };
  BasicSourceMapConsumer.prototype._version = 3;
  Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
    get: function() {
      return this._absoluteSources.slice();
    }
  });
  function Mapping() {
    this.generatedLine = 0;
    this.generatedColumn = 0;
    this.source = null;
    this.originalLine = null;
    this.originalColumn = null;
    this.name = null;
  }
  var compareGenerated = util.compareByGeneratedPositionsDeflatedNoLine;
  function sortGenerated(array, start) {
    let l = array.length;
    let n = array.length - start;
    if (n <= 1) {
      return;
    } else if (n == 2) {
      let a = array[start];
      let b = array[start + 1];
      if (compareGenerated(a, b) > 0) {
        array[start] = b;
        array[start + 1] = a;
      }
    } else if (n < 20) {
      for (let i = start;i < l; i++) {
        for (let j = i;j > start; j--) {
          let a = array[j - 1];
          let b = array[j];
          if (compareGenerated(a, b) <= 0) {
            break;
          }
          array[j - 1] = b;
          array[j] = a;
        }
      }
    } else {
      quickSort(array, compareGenerated, start);
    }
  }
  BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;
    let subarrayStart = 0;
    while (index < length) {
      if (aStr.charAt(index) === ";") {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
        sortGenerated(generatedMappings, subarrayStart);
        subarrayStart = generatedMappings.length;
      } else if (aStr.charAt(index) === ",") {
        index++;
      } else {
        mapping = new Mapping;
        mapping.generatedLine = generatedLine;
        for (end = index;end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);
        segment = [];
        while (index < end) {
          base64VLQ.decode(aStr, index, temp);
          value = temp.value;
          index = temp.rest;
          segment.push(value);
        }
        if (segment.length === 2) {
          throw new Error("Found a source, but no line and column");
        }
        if (segment.length === 3) {
          throw new Error("Found a source and line, but no column");
        }
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;
        if (segment.length > 1) {
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          mapping.originalLine += 1;
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;
          if (segment.length > 4) {
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }
        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === "number") {
          let currentSource = mapping.source;
          while (originalMappings.length <= currentSource) {
            originalMappings.push(null);
          }
          if (originalMappings[currentSource] === null) {
            originalMappings[currentSource] = [];
          }
          originalMappings[currentSource].push(mapping);
        }
      }
    }
    sortGenerated(generatedMappings, subarrayStart);
    this.__generatedMappings = generatedMappings;
    for (var i = 0;i < originalMappings.length; i++) {
      if (originalMappings[i] != null) {
        quickSort(originalMappings[i], util.compareByOriginalPositionsNoSource);
      }
    }
    this.__originalMappings = [].concat(...originalMappings);
  };
  BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
    if (aNeedle[aLineName] <= 0) {
      throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
    }
    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };
  BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0;index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];
        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }
      mapping.lastGeneratedColumn = Infinity;
    }
  };
  BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, "line"),
      generatedColumn: util.getArg(aArgs, "column")
    };
    var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
    if (index >= 0) {
      var mapping = this._generatedMappings[index];
      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, "source", null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util.getArg(mapping, "name", null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source,
          line: util.getArg(mapping, "originalLine", null),
          column: util.getArg(mapping, "originalColumn", null),
          name
        };
      }
    }
    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };
  BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
      return sc == null;
    });
  };
  BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }
    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }
    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }
    var url;
    if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
      }
      if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }
    if (nullOnMissing) {
      return null;
    } else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };
  BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, "source");
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }
    var needle = {
      source,
      originalLine: util.getArg(aArgs, "line"),
      originalColumn: util.getArg(aArgs, "column")
    };
    var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
    if (index >= 0) {
      var mapping = this._originalMappings[index];
      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, "generatedLine", null),
          column: util.getArg(mapping, "generatedColumn", null),
          lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
        };
      }
    }
    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };
  exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
  function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === "string") {
      sourceMap = util.parseSourceMapInput(aSourceMap);
    }
    var version = util.getArg(sourceMap, "version");
    var sections = util.getArg(sourceMap, "sections");
    if (version != this._version) {
      throw new Error("Unsupported version: " + version);
    }
    this._sources = new ArraySet;
    this._names = new ArraySet;
    var lastOffset = {
      line: -1,
      column: 0
    };
    this._sections = sections.map(function(s) {
      if (s.url) {
        throw new Error("Support for url field in sections not implemented.");
      }
      var offset = util.getArg(s, "offset");
      var offsetLine = util.getArg(offset, "line");
      var offsetColumn = util.getArg(offset, "column");
      if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
        throw new Error("Section offsets must be ordered and non-overlapping.");
      }
      lastOffset = offset;
      return {
        generatedOffset: {
          generatedLine: offsetLine + 1,
          generatedColumn: offsetColumn + 1
        },
        consumer: new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL)
      };
    });
  }
  IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
  IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
  IndexedSourceMapConsumer.prototype._version = 3;
  Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
    get: function() {
      var sources = [];
      for (var i = 0;i < this._sections.length; i++) {
        for (var j = 0;j < this._sections[i].consumer.sources.length; j++) {
          sources.push(this._sections[i].consumer.sources[j]);
        }
      }
      return sources;
    }
  });
  IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, "line"),
      generatedColumn: util.getArg(aArgs, "column")
    };
    var sectionIndex = binarySearch.search(needle, this._sections, function(needle2, section2) {
      var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
      if (cmp) {
        return cmp;
      }
      return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
    });
    var section = this._sections[sectionIndex];
    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }
    return section.consumer.originalPositionFor({
      line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
      bias: aArgs.bias
    });
  };
  IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function(s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };
  IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0;i < this._sections.length; i++) {
      var section = this._sections[i];
      var content = section.consumer.sourceContentFor(aSource, true);
      if (content || content === "") {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    } else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };
  IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0;i < this._sections.length; i++) {
      var section = this._sections[i];
      if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
        };
        return ret;
      }
    }
    return {
      line: null,
      column: null
    };
  };
  IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0;i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0;j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];
        var source = section.consumer._sources.at(mapping.source);
        if (source !== null) {
          source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        }
        this._sources.add(source);
        source = this._sources.indexOf(source);
        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }
        var adjustedMapping = {
          source,
          generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name
        };
        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === "number") {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }
    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util.compareByOriginalPositions);
  };
  exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
});

// ../../../../node_modules/source-map-js/lib/source-node.js
var require_source_node = __commonJS((exports) => {
  var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
  var util = require_util();
  var REGEX_NEWLINE = /(\r?\n)/;
  var NEWLINE_CODE = 10;
  var isSourceNode = "$$$isSourceNode$$$";
  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [];
    this.sourceContents = {};
    this.line = aLine == null ? null : aLine;
    this.column = aColumn == null ? null : aColumn;
    this.source = aSource == null ? null : aSource;
    this.name = aName == null ? null : aName;
    this[isSourceNode] = true;
    if (aChunks != null)
      this.add(aChunks);
  }
  SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    var node = new SourceNode;
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      var newLine = getNextLine() || "";
      return lineContents + newLine;
      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : undefined;
      }
    };
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;
    var lastMapping = null;
    aSourceMapConsumer.eachMapping(function(mapping) {
      if (lastMapping !== null) {
        if (lastGeneratedLine < mapping.generatedLine) {
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
        } else {
          var nextLine = remainingLines[remainingLinesIndex] || "";
          var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          lastMapping = mapping;
          return;
        }
      }
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex] || "";
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }
    aSourceMapConsumer.sources.forEach(function(sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });
    return node;
    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
        node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
      }
    }
  };
  SourceNode.prototype.add = function SourceNode_add(aChunk) {
    if (Array.isArray(aChunk)) {
      aChunk.forEach(function(chunk) {
        this.add(chunk);
      }, this);
    } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      if (aChunk) {
        this.children.push(aChunk);
      }
    } else {
      throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
    }
    return this;
  };
  SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
    if (Array.isArray(aChunk)) {
      for (var i = aChunk.length - 1;i >= 0; i--) {
        this.prepend(aChunk[i]);
      }
    } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      this.children.unshift(aChunk);
    } else {
      throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
    }
    return this;
  };
  SourceNode.prototype.walk = function SourceNode_walk(aFn) {
    var chunk;
    for (var i = 0, len = this.children.length;i < len; i++) {
      chunk = this.children[i];
      if (chunk[isSourceNode]) {
        chunk.walk(aFn);
      } else {
        if (chunk !== "") {
          aFn(chunk, {
            source: this.source,
            line: this.line,
            column: this.column,
            name: this.name
          });
        }
      }
    }
  };
  SourceNode.prototype.join = function SourceNode_join(aSep) {
    var newChildren;
    var i;
    var len = this.children.length;
    if (len > 0) {
      newChildren = [];
      for (i = 0;i < len - 1; i++) {
        newChildren.push(this.children[i]);
        newChildren.push(aSep);
      }
      newChildren.push(this.children[i]);
      this.children = newChildren;
    }
    return this;
  };
  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    if (lastChild[isSourceNode]) {
      lastChild.replaceRight(aPattern, aReplacement);
    } else if (typeof lastChild === "string") {
      this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
    } else {
      this.children.push("".replace(aPattern, aReplacement));
    }
    return this;
  };
  SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };
  SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length;i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }
    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length;i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };
  SourceNode.prototype.toString = function SourceNode_toString() {
    var str = "";
    this.walk(function(chunk) {
      str += chunk;
    });
    return str;
  };
  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
    var generated = {
      code: "",
      line: 1,
      column: 0
    };
    var map = new SourceMapGenerator(aArgs);
    var sourceMappingActive = false;
    var lastOriginalSource = null;
    var lastOriginalLine = null;
    var lastOriginalColumn = null;
    var lastOriginalName = null;
    this.walk(function(chunk, original) {
      generated.code += chunk;
      if (original.source !== null && original.line !== null && original.column !== null) {
        if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
        lastOriginalSource = original.source;
        lastOriginalLine = original.line;
        lastOriginalColumn = original.column;
        lastOriginalName = original.name;
        sourceMappingActive = true;
      } else if (sourceMappingActive) {
        map.addMapping({
          generated: {
            line: generated.line,
            column: generated.column
          }
        });
        lastOriginalSource = null;
        sourceMappingActive = false;
      }
      for (var idx = 0, length = chunk.length;idx < length; idx++) {
        if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
          generated.line++;
          generated.column = 0;
          if (idx + 1 === length) {
            lastOriginalSource = null;
            sourceMappingActive = false;
          } else if (sourceMappingActive) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
        } else {
          generated.column++;
        }
      }
    });
    this.walkSourceContents(function(sourceFile, sourceContent) {
      map.setSourceContent(sourceFile, sourceContent);
    });
    return { code: generated.code, map };
  };
  exports.SourceNode = SourceNode;
});

// ../../../../node_modules/source-map-js/source-map.js
var require_source_map = __commonJS((exports) => {
  exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
  exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
  exports.SourceNode = require_source_node().SourceNode;
});

// ../../../../node_modules/@vue/shared/dist/shared.cjs.js
var require_shared_cjs = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  /*! #__NO_SIDE_EFFECTS__ */
  function makeMap(str) {
    const map = /* @__PURE__ */ Object.create(null);
    for (const key of str.split(","))
      map[key] = 1;
    return (val) => (val in map);
  }
  var EMPTY_OBJ = Object.freeze({});
  var EMPTY_ARR = Object.freeze([]);
  var NOOP = () => {};
  var NO = () => false;
  var isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
  var isModelListener = (key) => key.startsWith("onUpdate:");
  var extend = Object.assign;
  var remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  };
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = (val, key) => hasOwnProperty.call(val, key);
  var isArray = Array.isArray;
  var isMap = (val) => toTypeString(val) === "[object Map]";
  var isSet = (val) => toTypeString(val) === "[object Set]";
  var isDate = (val) => toTypeString(val) === "[object Date]";
  var isRegExp = (val) => toTypeString(val) === "[object RegExp]";
  var isFunction = (val) => typeof val === "function";
  var isString = (val) => typeof val === "string";
  var isSymbol = (val) => typeof val === "symbol";
  var isObject = (val) => val !== null && typeof val === "object";
  var isPromise = (val) => {
    return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
  };
  var objectToString = Object.prototype.toString;
  var toTypeString = (value) => objectToString.call(value);
  var toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  var isPlainObject = (val) => toTypeString(val) === "[object Object]";
  var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  var isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
  var isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
  var cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  var camelizeRE = /-(\w)/g;
  var camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  var capitalize = cacheStringFunction((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  var toHandlerKey = cacheStringFunction((str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  });
  var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  var invokeArrayFns = (fns, ...arg) => {
    for (let i = 0;i < fns.length; i++) {
      fns[i](...arg);
    }
  };
  var def = (obj, key, value, writable = false) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      writable,
      value
    });
  };
  var looseToNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  var toNumber = (val) => {
    const n = isString(val) ? Number(val) : NaN;
    return isNaN(n) ? val : n;
  };
  var _globalThis;
  var getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  var identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
  function genPropsAccessExp(name) {
    return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
  }
  function genCacheKey(source, options) {
    return source + JSON.stringify(options, (_, val) => typeof val === "function" ? val.toString() : val);
  }
  var PatchFlags = {
    TEXT: 1,
    "1": "TEXT",
    CLASS: 2,
    "2": "CLASS",
    STYLE: 4,
    "4": "STYLE",
    PROPS: 8,
    "8": "PROPS",
    FULL_PROPS: 16,
    "16": "FULL_PROPS",
    NEED_HYDRATION: 32,
    "32": "NEED_HYDRATION",
    STABLE_FRAGMENT: 64,
    "64": "STABLE_FRAGMENT",
    KEYED_FRAGMENT: 128,
    "128": "KEYED_FRAGMENT",
    UNKEYED_FRAGMENT: 256,
    "256": "UNKEYED_FRAGMENT",
    NEED_PATCH: 512,
    "512": "NEED_PATCH",
    DYNAMIC_SLOTS: 1024,
    "1024": "DYNAMIC_SLOTS",
    DEV_ROOT_FRAGMENT: 2048,
    "2048": "DEV_ROOT_FRAGMENT",
    CACHED: -1,
    "-1": "CACHED",
    BAIL: -2,
    "-2": "BAIL"
  };
  var PatchFlagNames = {
    [1]: `TEXT`,
    [2]: `CLASS`,
    [4]: `STYLE`,
    [8]: `PROPS`,
    [16]: `FULL_PROPS`,
    [32]: `NEED_HYDRATION`,
    [64]: `STABLE_FRAGMENT`,
    [128]: `KEYED_FRAGMENT`,
    [256]: `UNKEYED_FRAGMENT`,
    [512]: `NEED_PATCH`,
    [1024]: `DYNAMIC_SLOTS`,
    [2048]: `DEV_ROOT_FRAGMENT`,
    [-1]: `HOISTED`,
    [-2]: `BAIL`
  };
  var ShapeFlags = {
    ELEMENT: 1,
    "1": "ELEMENT",
    FUNCTIONAL_COMPONENT: 2,
    "2": "FUNCTIONAL_COMPONENT",
    STATEFUL_COMPONENT: 4,
    "4": "STATEFUL_COMPONENT",
    TEXT_CHILDREN: 8,
    "8": "TEXT_CHILDREN",
    ARRAY_CHILDREN: 16,
    "16": "ARRAY_CHILDREN",
    SLOTS_CHILDREN: 32,
    "32": "SLOTS_CHILDREN",
    TELEPORT: 64,
    "64": "TELEPORT",
    SUSPENSE: 128,
    "128": "SUSPENSE",
    COMPONENT_SHOULD_KEEP_ALIVE: 256,
    "256": "COMPONENT_SHOULD_KEEP_ALIVE",
    COMPONENT_KEPT_ALIVE: 512,
    "512": "COMPONENT_KEPT_ALIVE",
    COMPONENT: 6,
    "6": "COMPONENT"
  };
  var SlotFlags = {
    STABLE: 1,
    "1": "STABLE",
    DYNAMIC: 2,
    "2": "DYNAMIC",
    FORWARDED: 3,
    "3": "FORWARDED"
  };
  var slotFlagsText = {
    [1]: "STABLE",
    [2]: "DYNAMIC",
    [3]: "FORWARDED"
  };
  var GLOBALS_ALLOWED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol";
  var isGloballyAllowed = /* @__PURE__ */ makeMap(GLOBALS_ALLOWED);
  var isGloballyWhitelisted = isGloballyAllowed;
  var range = 2;
  function generateCodeFrame(source, start = 0, end = source.length) {
    start = Math.max(0, Math.min(start, source.length));
    end = Math.max(0, Math.min(end, source.length));
    if (start > end)
      return "";
    let lines = source.split(/(\r?\n)/);
    const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
    lines = lines.filter((_, idx) => idx % 2 === 0);
    let count = 0;
    const res = [];
    for (let i = 0;i < lines.length; i++) {
      count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
      if (count >= start) {
        for (let j = i - range;j <= i + range || end > count; j++) {
          if (j < 0 || j >= lines.length)
            continue;
          const line = j + 1;
          res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
          const lineLength = lines[j].length;
          const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
          if (j === i) {
            const pad = start - (count - (lineLength + newLineSeqLength));
            const length = Math.max(1, end > count ? lineLength - pad : end - start);
            res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
          } else if (j > i) {
            if (end > count) {
              const length = Math.max(Math.min(end - count, lineLength), 1);
              res.push(`   |  ` + "^".repeat(length));
            }
            count += lineLength + newLineSeqLength;
          }
        }
        break;
      }
    }
    return res.join(`
`);
  }
  function normalizeStyle(value) {
    if (isArray(value)) {
      const res = {};
      for (let i = 0;i < value.length; i++) {
        const item = value[i];
        const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString(value) || isObject(value)) {
      return value;
    }
  }
  var listDelimiterRE = /;(?![^(]*\))/g;
  var propertyDelimiterRE = /:([^]+)/;
  var styleCommentRE = /\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function stringifyStyle(styles) {
    if (!styles)
      return "";
    if (isString(styles))
      return styles;
    let ret = "";
    for (const key in styles) {
      const value = styles[key];
      if (isString(value) || typeof value === "number") {
        const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
        ret += `${normalizedKey}:${value};`;
      }
    }
    return ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString(value)) {
      res = value;
    } else if (isArray(value)) {
      for (let i = 0;i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  function normalizeProps(props) {
    if (!props)
      return null;
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (style) {
      props.style = normalizeStyle(style);
    }
    return props;
  }
  var HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
  var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
  var MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
  var VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
  var isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
  var isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
  var isMathMLTag = /* @__PURE__ */ makeMap(MATH_TAGS);
  var isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
  var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  var isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  var unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
  var attrValidationCache = {};
  function isSSRSafeAttrName(name) {
    if (attrValidationCache.hasOwnProperty(name)) {
      return attrValidationCache[name];
    }
    const isUnsafe = unsafeAttrCharRE.test(name);
    if (isUnsafe) {
      console.error(`unsafe attribute name: ${name}`);
    }
    return attrValidationCache[name] = !isUnsafe;
  }
  var propsToAttrMap = {
    acceptCharset: "accept-charset",
    className: "class",
    htmlFor: "for",
    httpEquiv: "http-equiv"
  };
  var isKnownHtmlAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
  var isKnownSvgAttr = /* @__PURE__ */ makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
  var isKnownMathMLAttr = /* @__PURE__ */ makeMap(`accent,accentunder,actiontype,align,alignmentscope,altimg,altimg-height,altimg-valign,altimg-width,alttext,bevelled,close,columnsalign,columnlines,columnspan,denomalign,depth,dir,display,displaystyle,encoding,equalcolumns,equalrows,fence,fontstyle,fontweight,form,frame,framespacing,groupalign,height,href,id,indentalign,indentalignfirst,indentalignlast,indentshift,indentshiftfirst,indentshiftlast,indextype,justify,largetop,largeop,lquote,lspace,mathbackground,mathcolor,mathsize,mathvariant,maxsize,minlabelspacing,mode,other,overflow,position,rowalign,rowlines,rowspan,rquote,rspace,scriptlevel,scriptminsize,scriptsizemultiplier,selection,separator,separators,shift,side,src,stackalign,stretchy,subscriptshift,superscriptshift,symmetric,voffset,width,widths,xlink:href,xlink:show,xlink:type,xmlns`);
  function isRenderableAttrValue(value) {
    if (value == null) {
      return false;
    }
    const type = typeof value;
    return type === "string" || type === "number" || type === "boolean";
  }
  var escapeRE = /["'&<>]/;
  function escapeHtml(string) {
    const str = "" + string;
    const match = escapeRE.exec(str);
    if (!match) {
      return str;
    }
    let html = "";
    let escaped;
    let index;
    let lastIndex = 0;
    for (index = match.index;index < str.length; index++) {
      switch (str.charCodeAt(index)) {
        case 34:
          escaped = "&quot;";
          break;
        case 38:
          escaped = "&amp;";
          break;
        case 39:
          escaped = "&#39;";
          break;
        case 60:
          escaped = "&lt;";
          break;
        case 62:
          escaped = "&gt;";
          break;
        default:
          continue;
      }
      if (lastIndex !== index) {
        html += str.slice(lastIndex, index);
      }
      lastIndex = index + 1;
      html += escaped;
    }
    return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
  }
  var commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
  function escapeHtmlComment(src) {
    return src.replace(commentStripRE, "");
  }
  var cssVarNameEscapeSymbolsRE = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
  function getEscapedCssVarName(key, doubleEscape) {
    return key.replace(cssVarNameEscapeSymbolsRE, (s) => doubleEscape ? s === '"' ? "\\\\\\\"" : `\\\\${s}` : `\\${s}`);
  }
  function looseCompareArrays(a, b) {
    if (a.length !== b.length)
      return false;
    let equal = true;
    for (let i = 0;equal && i < a.length; i++) {
      equal = looseEqual(a[i], b[i]);
    }
    return equal;
  }
  function looseEqual(a, b) {
    if (a === b)
      return true;
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    }
    aValidType = isSymbol(a);
    bValidType = isSymbol(b);
    if (aValidType || bValidType) {
      return a === b;
    }
    aValidType = isArray(a);
    bValidType = isArray(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareArrays(a, b) : false;
    }
    aValidType = isObject(a);
    bValidType = isObject(b);
    if (aValidType || bValidType) {
      if (!aValidType || !bValidType) {
        return false;
      }
      const aKeysCount = Object.keys(a).length;
      const bKeysCount = Object.keys(b).length;
      if (aKeysCount !== bKeysCount) {
        return false;
      }
      for (const key in a) {
        const aHasKey = a.hasOwnProperty(key);
        const bHasKey = b.hasOwnProperty(key);
        if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
          return false;
        }
      }
    }
    return String(a) === String(b);
  }
  function looseIndexOf(arr, val) {
    return arr.findIndex((item) => looseEqual(item, val));
  }
  var isRef = (val) => {
    return !!(val && val["__v_isRef"] === true);
  };
  var toDisplayString = (val) => {
    return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
  };
  var replacer = (_key, val) => {
    if (isRef(val)) {
      return replacer(_key, val.value);
    } else if (isMap(val)) {
      return {
        [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        }, {})
      };
    } else if (isSet(val)) {
      return {
        [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
      };
    } else if (isSymbol(val)) {
      return stringifySymbol(val);
    } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
      return String(val);
    }
    return val;
  };
  var stringifySymbol = (v, i = "") => {
    var _a;
    return isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v;
  };
  exports.EMPTY_ARR = EMPTY_ARR;
  exports.EMPTY_OBJ = EMPTY_OBJ;
  exports.NO = NO;
  exports.NOOP = NOOP;
  exports.PatchFlagNames = PatchFlagNames;
  exports.PatchFlags = PatchFlags;
  exports.ShapeFlags = ShapeFlags;
  exports.SlotFlags = SlotFlags;
  exports.camelize = camelize;
  exports.capitalize = capitalize;
  exports.cssVarNameEscapeSymbolsRE = cssVarNameEscapeSymbolsRE;
  exports.def = def;
  exports.escapeHtml = escapeHtml;
  exports.escapeHtmlComment = escapeHtmlComment;
  exports.extend = extend;
  exports.genCacheKey = genCacheKey;
  exports.genPropsAccessExp = genPropsAccessExp;
  exports.generateCodeFrame = generateCodeFrame;
  exports.getEscapedCssVarName = getEscapedCssVarName;
  exports.getGlobalThis = getGlobalThis;
  exports.hasChanged = hasChanged;
  exports.hasOwn = hasOwn;
  exports.hyphenate = hyphenate;
  exports.includeBooleanAttr = includeBooleanAttr;
  exports.invokeArrayFns = invokeArrayFns;
  exports.isArray = isArray;
  exports.isBooleanAttr = isBooleanAttr;
  exports.isBuiltInDirective = isBuiltInDirective;
  exports.isDate = isDate;
  exports.isFunction = isFunction;
  exports.isGloballyAllowed = isGloballyAllowed;
  exports.isGloballyWhitelisted = isGloballyWhitelisted;
  exports.isHTMLTag = isHTMLTag;
  exports.isIntegerKey = isIntegerKey;
  exports.isKnownHtmlAttr = isKnownHtmlAttr;
  exports.isKnownMathMLAttr = isKnownMathMLAttr;
  exports.isKnownSvgAttr = isKnownSvgAttr;
  exports.isMap = isMap;
  exports.isMathMLTag = isMathMLTag;
  exports.isModelListener = isModelListener;
  exports.isObject = isObject;
  exports.isOn = isOn;
  exports.isPlainObject = isPlainObject;
  exports.isPromise = isPromise;
  exports.isRegExp = isRegExp;
  exports.isRenderableAttrValue = isRenderableAttrValue;
  exports.isReservedProp = isReservedProp;
  exports.isSSRSafeAttrName = isSSRSafeAttrName;
  exports.isSVGTag = isSVGTag;
  exports.isSet = isSet;
  exports.isSpecialBooleanAttr = isSpecialBooleanAttr;
  exports.isString = isString;
  exports.isSymbol = isSymbol;
  exports.isVoidTag = isVoidTag;
  exports.looseEqual = looseEqual;
  exports.looseIndexOf = looseIndexOf;
  exports.looseToNumber = looseToNumber;
  exports.makeMap = makeMap;
  exports.normalizeClass = normalizeClass;
  exports.normalizeProps = normalizeProps;
  exports.normalizeStyle = normalizeStyle;
  exports.objectToString = objectToString;
  exports.parseStringStyle = parseStringStyle;
  exports.propsToAttrMap = propsToAttrMap;
  exports.remove = remove;
  exports.slotFlagsText = slotFlagsText;
  exports.stringifyStyle = stringifyStyle;
  exports.toDisplayString = toDisplayString;
  exports.toHandlerKey = toHandlerKey;
  exports.toNumber = toNumber;
  exports.toRawType = toRawType;
  exports.toTypeString = toTypeString;
});

// ../../../../node_modules/entities/lib/generated/decode-data-html.js
var require_decode_data_html = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = new Uint16Array("\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\x00\x00\x00\x00\x00\x00\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\uD835\uDD04rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\uD835\uDD38plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\uD835\uDC9Cign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\uD835\uDD05pf;\uC000\uD835\uDD39eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\uD835\uDC9Ep\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\uD835\uDD07\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\x00\x00\x00\u0342\u0354\x00\u0405f;\uC000\uD835\uDD3B\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\x00\x00\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\x00\x00\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\x00\u0446\x00\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\x00\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\uD835\uDC9Frok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\uD835\uDD08rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\x00\x00\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\uD835\uDD3Csilon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\uD835\uDD09lled\u0253\u0597\x00\x00\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\x00\u05BF\x00\x00\u05C4f;\uC000\uD835\uDD3DAll;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\uD835\uDD0A;\u62D9pf;\uC000\uD835\uDD3Eeater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\uD835\uDCA2;\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\x00\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\x00\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\uD835\uDD40a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\x00\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\uD835\uDD0Dpf;\uC000\uD835\uDD41\u01E3\u07C7\x00\u07CCr;\uC000\uD835\uDCA5rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\uD835\uDD0Epf;\uC000\uD835\uDD42cr;\uC000\uD835\uDCA6\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\x00\u08C3bleBracket;\u67E6n\u01D4\u08C8\x00\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\uD835\uDD0F\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\uD835\uDD43er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\uD835\uDD10nusPlus;\u6213pf;\uC000\uD835\uDD44c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\uD835\uDD11\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\uD835\uDCA9ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\uD835\uDD12rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\uD835\uDD46enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\uD835\uDCAAash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\uD835\uDD13i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\uD835\uDCAB;\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B\"\u4022r;\uC000\uD835\uDD14pf;\u611Acr;\uC000\uD835\uDCAC\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\x00\u1005bleBracket;\u67E7n\u01D4\u100A\x00\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\uD835\uDD16ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\uD835\uDD4A\u0272\u116D\x00\x00\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\uD835\uDCAEar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\uD835\uDD17\u0100ei\u127B\u1289\u01F2\u1280\x00\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\uD835\uDD4BipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\uD835\uDCAFrok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\x00\u132C\u1331\x00\x00\x00\x00\x00\u1338\u133D\u1377\u1385\x00\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\x00\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\uD835\uDD18rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\uD835\uDD4C\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\uD835\uDCB0ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\uD835\uDD19pf;\uC000\uD835\uDD4Dcr;\uC000\uD835\uDCB1dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\uD835\uDD1Apf;\uC000\uD835\uDD4Ecr;\uC000\uD835\uDCB2\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\uD835\uDD1B;\u439Epf;\uC000\uD835\uDD4Fcr;\uC000\uD835\uDCB3\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\uD835\uDD1Cpf;\uC000\uD835\uDD50cr;\uC000\uD835\uDCB4ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\x00\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\uD835\uDCB5\u0BE1\u1583\u158A\u1590\x00\u15B0\u15B6\u15BF\x00\x00\x00\x00\u15C6\u15DB\u15EB\u165F\u166D\x00\u1695\u169B\u16B2\u16B9\x00\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\uD835\uDD1Erave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\x00\x00\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\uD835\uDD52\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\uD835\uDCB6;\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\uD835\uDD1Fg\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\x00\x00\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\x00\u1833\u01B2\u182F\x00\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\uD835\uDD53\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\uD835\uDCB7mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\x00\u19E8\u1A11\u1A15\u1A32\x00\u1A37\u1A50\x00\x00\u1AB4\x00\x00\u1AC1\x00\x00\u1B21\u1B2E\u1B4D\u1B52\x00\u1BFD\x00\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\x00\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\uD835\uDD20\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\x00\x00\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\x00\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\x00\x00\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\x00\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\uD835\uDD54o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\uD835\uDCB8\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\x00\x00\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\x00\x00\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\uD835\uDD21ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\x00\x00\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\uD835\uDD55\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\x00\x00\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\uD835\uDCB9;\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\uD835\uDD22\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\uD835\uDD56\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\x00\x00\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\x00\u1F9E\x00\u1FA1\u1FA7\x00\x00\u1FC6\u1FCC\x00\u1FD3\x00\u1FE6\u1FEA\u2000\x00\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\x00\x00\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\uD835\uDD23lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\x00\u1FF3f;\uC000\uD835\uDD57\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\x00\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\x00\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\x00\u2036;\u6154;\u6156\u02B4\u203E\u2041\x00\x00\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\x00\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\uD835\uDCBB\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\uD835\uDD24\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\uD835\uDD58\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\x00\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\uD835\uDD25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\uD835\uDD59bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\uD835\uDCBDas\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\x00\u22AA\x00\u22B8\u22C5\u22CE\x00\u22D5\u22F3\x00\x00\u22F8\u2322\u2367\u2362\u237F\x00\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\uD835\uDD26rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\uD835\uDD5Aa;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\uD835\uDCBEn\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\x00\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\uD835\uDD27ath;\u4237pf;\uC000\uD835\uDD5B\u01E3\u23EC\x00\u23F1r;\uC000\uD835\uDCBFrcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\uD835\uDD28reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\uD835\uDD5Ccr;\uC000\uD835\uDCC0\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\x00\u24AA\x00\u24B1\x00\x00\x00\x00\x00\u24B5\u24BA\x00\u24C6\u24C8\u24CD\x00\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\uD835\uDD29\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\uD835\uDD5Dus;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\uD835\uDCC1m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\uD835\uDD2Ao;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\uD835\uDD5E\u0100ct\u28F8\u28FDr;\uC000\uD835\uDCC2pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\x00\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\x00\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\uD835\uDD2B\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\uD835\uDD5F\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\uD835\uDCC3ort\u026D\u2B05\x00\x00\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u2D2D\x00\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\x00\x00\u2D8D\u2DAB\x00\u2DC8\u2DCE\x00\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\uD835\uDD2C\u036F\u2D79\x00\x00\u2D7C\x00\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\uD835\uDD60\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\x00\u2E7D\x00\u2E80\u2E9D\x00\u2EA2\u2EB9\x00\x00\u2ECB\u0E9C\x00\u2F13\x00\x00\u2F2B\u2FBC\x00\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\x00\x00\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\uD835\uDD2D\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\uD835\uDD61nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\uD835\uDCC5;\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\uD835\uDD2Epf;\uC000\uD835\uDD62rime;\u6057cr;\uC000\uD835\uDCC6\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\uD835\uDD2F\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\uD835\uDD63us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\uD835\uDCC7\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\x00\u337A\u33A4\x00\x00\u33EC\u33F0\x00\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\x00\u3616\x00\x00\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\x00\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\uD835\uDD30\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\x00\x00\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\uD835\uDD64a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\uD835\uDCC8tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\x00\u367E\u36C2\x00\x00\x00\x00\x00\u36DB\u3703\x00\u3709\u376C\x00\x00\x00\u3787\u0272\u3656\x00\x00\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\uD835\uDD31\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\x00\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\uD835\uDD65rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\uD835\uDCC9;\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\x00\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\uD835\uDD32rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\x00\x00\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\uD835\uDD66\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\x00\x00\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\uD835\uDCCA\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\uD835\uDD33tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\uD835\uDD67ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\uD835\uDCCB\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\uD835\uDD34pf;\uC000\uD835\uDD68\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\uD835\uDCCC\u0AE3\u178E\u3A87\x00\u3A8B\x00\u3A90\u3A9B\x00\x00\u3A9D\u3AA8\u3AAB\u3AAF\x00\x00\u3AC3\u3ACE\x00\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\uD835\uDD35\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\uD835\uDD69im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\uD835\uDCCD\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\uD835\uDD36cy;\u4457pf;\uC000\uD835\uDD6Acr;\uC000\uD835\uDCCE\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\uD835\uDD37cy;\u4436grarr;\u61DDpf;\uC000\uD835\uDD6Bcr;\uC000\uD835\uDCCF\u0100jn\u3B85\u3B87;\u600Dj;\u600C".split("").map(function(c) {
    return c.charCodeAt(0);
  }));
});

// ../../../../node_modules/entities/lib/generated/decode-data-xml.js
var require_decode_data_xml = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = new Uint16Array("\u0200aglq\t\x15\x18\x1B\u026D\x0F\x00\x00\x12p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022".split("").map(function(c) {
    return c.charCodeAt(0);
  }));
});

// ../../../../node_modules/entities/lib/decode_codepoint.js
var require_decode_codepoint = __commonJS((exports) => {
  var _a;
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.replaceCodePoint = exports.fromCodePoint = undefined;
  var decodeMap = new Map([
    [0, 65533],
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]);
  exports.fromCodePoint = (_a = String.fromCodePoint) !== null && _a !== undefined ? _a : function(codePoint) {
    var output = "";
    if (codePoint > 65535) {
      codePoint -= 65536;
      output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    output += String.fromCharCode(codePoint);
    return output;
  };
  function replaceCodePoint(codePoint) {
    var _a2;
    if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
      return 65533;
    }
    return (_a2 = decodeMap.get(codePoint)) !== null && _a2 !== undefined ? _a2 : codePoint;
  }
  exports.replaceCodePoint = replaceCodePoint;
  function decodeCodePoint(codePoint) {
    return (0, exports.fromCodePoint)(replaceCodePoint(codePoint));
  }
  exports.default = decodeCodePoint;
});

// ../../../../node_modules/entities/lib/decode.js
var require_decode = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports && exports.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.decodeXML = exports.decodeHTMLStrict = exports.decodeHTMLAttribute = exports.decodeHTML = exports.determineBranch = exports.EntityDecoder = exports.DecodingMode = exports.BinTrieFlags = exports.fromCodePoint = exports.replaceCodePoint = exports.decodeCodePoint = exports.xmlDecodeTree = exports.htmlDecodeTree = undefined;
  var decode_data_html_js_1 = __importDefault(require_decode_data_html());
  exports.htmlDecodeTree = decode_data_html_js_1.default;
  var decode_data_xml_js_1 = __importDefault(require_decode_data_xml());
  exports.xmlDecodeTree = decode_data_xml_js_1.default;
  var decode_codepoint_js_1 = __importStar(require_decode_codepoint());
  exports.decodeCodePoint = decode_codepoint_js_1.default;
  var decode_codepoint_js_2 = require_decode_codepoint();
  Object.defineProperty(exports, "replaceCodePoint", { enumerable: true, get: function() {
    return decode_codepoint_js_2.replaceCodePoint;
  } });
  Object.defineProperty(exports, "fromCodePoint", { enumerable: true, get: function() {
    return decode_codepoint_js_2.fromCodePoint;
  } });
  var CharCodes;
  (function(CharCodes2) {
    CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
    CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
    CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
    CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
    CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
    CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
    CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
    CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
    CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
    CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
    CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
    CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
  })(CharCodes || (CharCodes = {}));
  var TO_LOWER_BIT = 32;
  var BinTrieFlags;
  (function(BinTrieFlags2) {
    BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
    BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
    BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
  })(BinTrieFlags = exports.BinTrieFlags || (exports.BinTrieFlags = {}));
  function isNumber(code) {
    return code >= CharCodes.ZERO && code <= CharCodes.NINE;
  }
  function isHexadecimalCharacter(code) {
    return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
  }
  function isAsciiAlphaNumeric(code) {
    return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
  }
  function isEntityInAttributeInvalidEnd(code) {
    return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
  }
  var EntityDecoderState;
  (function(EntityDecoderState2) {
    EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
    EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
    EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
    EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
    EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
  })(EntityDecoderState || (EntityDecoderState = {}));
  var DecodingMode;
  (function(DecodingMode2) {
    DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
    DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
    DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
  })(DecodingMode = exports.DecodingMode || (exports.DecodingMode = {}));
  var EntityDecoder = function() {
    function EntityDecoder2(decodeTree, emitCodePoint, errors) {
      this.decodeTree = decodeTree;
      this.emitCodePoint = emitCodePoint;
      this.errors = errors;
      this.state = EntityDecoderState.EntityStart;
      this.consumed = 1;
      this.result = 0;
      this.treeIndex = 0;
      this.excess = 1;
      this.decodeMode = DecodingMode.Strict;
    }
    EntityDecoder2.prototype.startEntity = function(decodeMode) {
      this.decodeMode = decodeMode;
      this.state = EntityDecoderState.EntityStart;
      this.result = 0;
      this.treeIndex = 0;
      this.excess = 1;
      this.consumed = 1;
    };
    EntityDecoder2.prototype.write = function(str, offset) {
      switch (this.state) {
        case EntityDecoderState.EntityStart: {
          if (str.charCodeAt(offset) === CharCodes.NUM) {
            this.state = EntityDecoderState.NumericStart;
            this.consumed += 1;
            return this.stateNumericStart(str, offset + 1);
          }
          this.state = EntityDecoderState.NamedEntity;
          return this.stateNamedEntity(str, offset);
        }
        case EntityDecoderState.NumericStart: {
          return this.stateNumericStart(str, offset);
        }
        case EntityDecoderState.NumericDecimal: {
          return this.stateNumericDecimal(str, offset);
        }
        case EntityDecoderState.NumericHex: {
          return this.stateNumericHex(str, offset);
        }
        case EntityDecoderState.NamedEntity: {
          return this.stateNamedEntity(str, offset);
        }
      }
    };
    EntityDecoder2.prototype.stateNumericStart = function(str, offset) {
      if (offset >= str.length) {
        return -1;
      }
      if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
        this.state = EntityDecoderState.NumericHex;
        this.consumed += 1;
        return this.stateNumericHex(str, offset + 1);
      }
      this.state = EntityDecoderState.NumericDecimal;
      return this.stateNumericDecimal(str, offset);
    };
    EntityDecoder2.prototype.addToNumericResult = function(str, start, end, base) {
      if (start !== end) {
        var digitCount = end - start;
        this.result = this.result * Math.pow(base, digitCount) + parseInt(str.substr(start, digitCount), base);
        this.consumed += digitCount;
      }
    };
    EntityDecoder2.prototype.stateNumericHex = function(str, offset) {
      var startIdx = offset;
      while (offset < str.length) {
        var char = str.charCodeAt(offset);
        if (isNumber(char) || isHexadecimalCharacter(char)) {
          offset += 1;
        } else {
          this.addToNumericResult(str, startIdx, offset, 16);
          return this.emitNumericEntity(char, 3);
        }
      }
      this.addToNumericResult(str, startIdx, offset, 16);
      return -1;
    };
    EntityDecoder2.prototype.stateNumericDecimal = function(str, offset) {
      var startIdx = offset;
      while (offset < str.length) {
        var char = str.charCodeAt(offset);
        if (isNumber(char)) {
          offset += 1;
        } else {
          this.addToNumericResult(str, startIdx, offset, 10);
          return this.emitNumericEntity(char, 2);
        }
      }
      this.addToNumericResult(str, startIdx, offset, 10);
      return -1;
    };
    EntityDecoder2.prototype.emitNumericEntity = function(lastCp, expectedLength) {
      var _a;
      if (this.consumed <= expectedLength) {
        (_a = this.errors) === null || _a === undefined || _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      if (lastCp === CharCodes.SEMI) {
        this.consumed += 1;
      } else if (this.decodeMode === DecodingMode.Strict) {
        return 0;
      }
      this.emitCodePoint((0, decode_codepoint_js_1.replaceCodePoint)(this.result), this.consumed);
      if (this.errors) {
        if (lastCp !== CharCodes.SEMI) {
          this.errors.missingSemicolonAfterCharacterReference();
        }
        this.errors.validateNumericCharacterReference(this.result);
      }
      return this.consumed;
    };
    EntityDecoder2.prototype.stateNamedEntity = function(str, offset) {
      var decodeTree = this.decodeTree;
      var current = decodeTree[this.treeIndex];
      var valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      for (;offset < str.length; offset++, this.excess++) {
        var char = str.charCodeAt(offset);
        this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
        if (this.treeIndex < 0) {
          return this.result === 0 || this.decodeMode === DecodingMode.Attribute && (valueLength === 0 || isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
        }
        current = decodeTree[this.treeIndex];
        valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
        if (valueLength !== 0) {
          if (char === CharCodes.SEMI) {
            return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
          }
          if (this.decodeMode !== DecodingMode.Strict) {
            this.result = this.treeIndex;
            this.consumed += this.excess;
            this.excess = 0;
          }
        }
      }
      return -1;
    };
    EntityDecoder2.prototype.emitNotTerminatedNamedEntity = function() {
      var _a;
      var _b = this, result = _b.result, decodeTree = _b.decodeTree;
      var valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
      this.emitNamedEntityData(result, valueLength, this.consumed);
      (_a = this.errors) === null || _a === undefined || _a.missingSemicolonAfterCharacterReference();
      return this.consumed;
    };
    EntityDecoder2.prototype.emitNamedEntityData = function(result, valueLength, consumed) {
      var decodeTree = this.decodeTree;
      this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
      if (valueLength === 3) {
        this.emitCodePoint(decodeTree[result + 2], consumed);
      }
      return consumed;
    };
    EntityDecoder2.prototype.end = function() {
      var _a;
      switch (this.state) {
        case EntityDecoderState.NamedEntity: {
          return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
        }
        case EntityDecoderState.NumericDecimal: {
          return this.emitNumericEntity(0, 2);
        }
        case EntityDecoderState.NumericHex: {
          return this.emitNumericEntity(0, 3);
        }
        case EntityDecoderState.NumericStart: {
          (_a = this.errors) === null || _a === undefined || _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
          return 0;
        }
        case EntityDecoderState.EntityStart: {
          return 0;
        }
      }
    };
    return EntityDecoder2;
  }();
  exports.EntityDecoder = EntityDecoder;
  function getDecoder(decodeTree) {
    var ret = "";
    var decoder = new EntityDecoder(decodeTree, function(str) {
      return ret += (0, decode_codepoint_js_1.fromCodePoint)(str);
    });
    return function decodeWithTrie(str, decodeMode) {
      var lastIndex = 0;
      var offset = 0;
      while ((offset = str.indexOf("&", offset)) >= 0) {
        ret += str.slice(lastIndex, offset);
        decoder.startEntity(decodeMode);
        var len = decoder.write(str, offset + 1);
        if (len < 0) {
          lastIndex = offset + decoder.end();
          break;
        }
        lastIndex = offset + len;
        offset = len === 0 ? lastIndex + 1 : lastIndex;
      }
      var result = ret + str.slice(lastIndex);
      ret = "";
      return result;
    };
  }
  function determineBranch(decodeTree, current, nodeIdx, char) {
    var branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    var jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    if (branchCount === 0) {
      return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
    }
    if (jumpOffset) {
      var value = char - jumpOffset;
      return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
    }
    var lo = nodeIdx;
    var hi = lo + branchCount - 1;
    while (lo <= hi) {
      var mid = lo + hi >>> 1;
      var midVal = decodeTree[mid];
      if (midVal < char) {
        lo = mid + 1;
      } else if (midVal > char) {
        hi = mid - 1;
      } else {
        return decodeTree[mid + branchCount];
      }
    }
    return -1;
  }
  exports.determineBranch = determineBranch;
  var htmlDecoder = getDecoder(decode_data_html_js_1.default);
  var xmlDecoder = getDecoder(decode_data_xml_js_1.default);
  function decodeHTML(str, mode) {
    if (mode === undefined) {
      mode = DecodingMode.Legacy;
    }
    return htmlDecoder(str, mode);
  }
  exports.decodeHTML = decodeHTML;
  function decodeHTMLAttribute(str) {
    return htmlDecoder(str, DecodingMode.Attribute);
  }
  exports.decodeHTMLAttribute = decodeHTMLAttribute;
  function decodeHTMLStrict(str) {
    return htmlDecoder(str, DecodingMode.Strict);
  }
  exports.decodeHTMLStrict = decodeHTMLStrict;
  function decodeXML(str) {
    return xmlDecoder(str, DecodingMode.Strict);
  }
  exports.decodeXML = decodeXML;
});

// ../../../../node_modules/estree-walker/dist/umd/estree-walker.js
var require_estree_walker = __commonJS((exports, module) => {
  (function(global2, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = global2 || self, factory(global2.estreeWalker = {}));
  })(exports, function(exports2) {

    class WalkerBase {
      constructor() {
        this.should_skip = false;
        this.should_remove = false;
        this.replacement = null;
        this.context = {
          skip: () => this.should_skip = true,
          remove: () => this.should_remove = true,
          replace: (node) => this.replacement = node
        };
      }
      replace(parent, prop, index, node) {
        if (parent) {
          if (index !== null) {
            parent[prop][index] = node;
          } else {
            parent[prop] = node;
          }
        }
      }
      remove(parent, prop, index) {
        if (parent) {
          if (index !== null) {
            parent[prop].splice(index, 1);
          } else {
            delete parent[prop];
          }
        }
      }
    }

    class SyncWalker extends WalkerBase {
      constructor(enter, leave) {
        super();
        this.enter = enter;
        this.leave = leave;
      }
      visit(node, parent, prop, index) {
        if (node) {
          if (this.enter) {
            const _should_skip = this.should_skip;
            const _should_remove = this.should_remove;
            const _replacement = this.replacement;
            this.should_skip = false;
            this.should_remove = false;
            this.replacement = null;
            this.enter.call(this.context, node, parent, prop, index);
            if (this.replacement) {
              node = this.replacement;
              this.replace(parent, prop, index, node);
            }
            if (this.should_remove) {
              this.remove(parent, prop, index);
            }
            const skipped = this.should_skip;
            const removed = this.should_remove;
            this.should_skip = _should_skip;
            this.should_remove = _should_remove;
            this.replacement = _replacement;
            if (skipped)
              return node;
            if (removed)
              return null;
          }
          for (const key in node) {
            const value = node[key];
            if (typeof value !== "object") {
              continue;
            } else if (Array.isArray(value)) {
              for (let i = 0;i < value.length; i += 1) {
                if (value[i] !== null && typeof value[i].type === "string") {
                  if (!this.visit(value[i], node, key, i)) {
                    i--;
                  }
                }
              }
            } else if (value !== null && typeof value.type === "string") {
              this.visit(value, node, key, null);
            }
          }
          if (this.leave) {
            const _replacement = this.replacement;
            const _should_remove = this.should_remove;
            this.replacement = null;
            this.should_remove = false;
            this.leave.call(this.context, node, parent, prop, index);
            if (this.replacement) {
              node = this.replacement;
              this.replace(parent, prop, index, node);
            }
            if (this.should_remove) {
              this.remove(parent, prop, index);
            }
            const removed = this.should_remove;
            this.replacement = _replacement;
            this.should_remove = _should_remove;
            if (removed)
              return null;
          }
        }
        return node;
      }
    }

    class AsyncWalker extends WalkerBase {
      constructor(enter, leave) {
        super();
        this.enter = enter;
        this.leave = leave;
      }
      async visit(node, parent, prop, index) {
        if (node) {
          if (this.enter) {
            const _should_skip = this.should_skip;
            const _should_remove = this.should_remove;
            const _replacement = this.replacement;
            this.should_skip = false;
            this.should_remove = false;
            this.replacement = null;
            await this.enter.call(this.context, node, parent, prop, index);
            if (this.replacement) {
              node = this.replacement;
              this.replace(parent, prop, index, node);
            }
            if (this.should_remove) {
              this.remove(parent, prop, index);
            }
            const skipped = this.should_skip;
            const removed = this.should_remove;
            this.should_skip = _should_skip;
            this.should_remove = _should_remove;
            this.replacement = _replacement;
            if (skipped)
              return node;
            if (removed)
              return null;
          }
          for (const key in node) {
            const value = node[key];
            if (typeof value !== "object") {
              continue;
            } else if (Array.isArray(value)) {
              for (let i = 0;i < value.length; i += 1) {
                if (value[i] !== null && typeof value[i].type === "string") {
                  if (!await this.visit(value[i], node, key, i)) {
                    i--;
                  }
                }
              }
            } else if (value !== null && typeof value.type === "string") {
              await this.visit(value, node, key, null);
            }
          }
          if (this.leave) {
            const _replacement = this.replacement;
            const _should_remove = this.should_remove;
            this.replacement = null;
            this.should_remove = false;
            await this.leave.call(this.context, node, parent, prop, index);
            if (this.replacement) {
              node = this.replacement;
              this.replace(parent, prop, index, node);
            }
            if (this.should_remove) {
              this.remove(parent, prop, index);
            }
            const removed = this.should_remove;
            this.replacement = _replacement;
            this.should_remove = _should_remove;
            if (removed)
              return null;
          }
        }
        return node;
      }
    }
    function walk(ast, { enter, leave }) {
      const instance = new SyncWalker(enter, leave);
      return instance.visit(ast, null);
    }
    async function asyncWalk(ast, { enter, leave }) {
      const instance = new AsyncWalker(enter, leave);
      return await instance.visit(ast, null);
    }
    exports2.asyncWalk = asyncWalk;
    exports2.walk = walk;
    Object.defineProperty(exports2, "__esModule", { value: true });
  });
});

// ../../../../node_modules/@vue/compiler-core/dist/compiler-core.cjs.js
var require_compiler_core_cjs = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var shared = require_shared_cjs();
  var decode_js = require_decode();
  var parser = require_lib();
  var estreeWalker = require_estree_walker();
  var sourceMapJs = require_source_map();
  var FRAGMENT = Symbol(`Fragment`);
  var TELEPORT = Symbol(`Teleport`);
  var SUSPENSE = Symbol(`Suspense`);
  var KEEP_ALIVE = Symbol(`KeepAlive`);
  var BASE_TRANSITION = Symbol(`BaseTransition`);
  var OPEN_BLOCK = Symbol(`openBlock`);
  var CREATE_BLOCK = Symbol(`createBlock`);
  var CREATE_ELEMENT_BLOCK = Symbol(`createElementBlock`);
  var CREATE_VNODE = Symbol(`createVNode`);
  var CREATE_ELEMENT_VNODE = Symbol(`createElementVNode`);
  var CREATE_COMMENT = Symbol(`createCommentVNode`);
  var CREATE_TEXT = Symbol(`createTextVNode`);
  var CREATE_STATIC = Symbol(`createStaticVNode`);
  var RESOLVE_COMPONENT = Symbol(`resolveComponent`);
  var RESOLVE_DYNAMIC_COMPONENT = Symbol(`resolveDynamicComponent`);
  var RESOLVE_DIRECTIVE = Symbol(`resolveDirective`);
  var RESOLVE_FILTER = Symbol(`resolveFilter`);
  var WITH_DIRECTIVES = Symbol(`withDirectives`);
  var RENDER_LIST = Symbol(`renderList`);
  var RENDER_SLOT = Symbol(`renderSlot`);
  var CREATE_SLOTS = Symbol(`createSlots`);
  var TO_DISPLAY_STRING = Symbol(`toDisplayString`);
  var MERGE_PROPS = Symbol(`mergeProps`);
  var NORMALIZE_CLASS = Symbol(`normalizeClass`);
  var NORMALIZE_STYLE = Symbol(`normalizeStyle`);
  var NORMALIZE_PROPS = Symbol(`normalizeProps`);
  var GUARD_REACTIVE_PROPS = Symbol(`guardReactiveProps`);
  var TO_HANDLERS = Symbol(`toHandlers`);
  var CAMELIZE = Symbol(`camelize`);
  var CAPITALIZE = Symbol(`capitalize`);
  var TO_HANDLER_KEY = Symbol(`toHandlerKey`);
  var SET_BLOCK_TRACKING = Symbol(`setBlockTracking`);
  var PUSH_SCOPE_ID = Symbol(`pushScopeId`);
  var POP_SCOPE_ID = Symbol(`popScopeId`);
  var WITH_CTX = Symbol(`withCtx`);
  var UNREF = Symbol(`unref`);
  var IS_REF = Symbol(`isRef`);
  var WITH_MEMO = Symbol(`withMemo`);
  var IS_MEMO_SAME = Symbol(`isMemoSame`);
  var helperNameMap = {
    [FRAGMENT]: `Fragment`,
    [TELEPORT]: `Teleport`,
    [SUSPENSE]: `Suspense`,
    [KEEP_ALIVE]: `KeepAlive`,
    [BASE_TRANSITION]: `BaseTransition`,
    [OPEN_BLOCK]: `openBlock`,
    [CREATE_BLOCK]: `createBlock`,
    [CREATE_ELEMENT_BLOCK]: `createElementBlock`,
    [CREATE_VNODE]: `createVNode`,
    [CREATE_ELEMENT_VNODE]: `createElementVNode`,
    [CREATE_COMMENT]: `createCommentVNode`,
    [CREATE_TEXT]: `createTextVNode`,
    [CREATE_STATIC]: `createStaticVNode`,
    [RESOLVE_COMPONENT]: `resolveComponent`,
    [RESOLVE_DYNAMIC_COMPONENT]: `resolveDynamicComponent`,
    [RESOLVE_DIRECTIVE]: `resolveDirective`,
    [RESOLVE_FILTER]: `resolveFilter`,
    [WITH_DIRECTIVES]: `withDirectives`,
    [RENDER_LIST]: `renderList`,
    [RENDER_SLOT]: `renderSlot`,
    [CREATE_SLOTS]: `createSlots`,
    [TO_DISPLAY_STRING]: `toDisplayString`,
    [MERGE_PROPS]: `mergeProps`,
    [NORMALIZE_CLASS]: `normalizeClass`,
    [NORMALIZE_STYLE]: `normalizeStyle`,
    [NORMALIZE_PROPS]: `normalizeProps`,
    [GUARD_REACTIVE_PROPS]: `guardReactiveProps`,
    [TO_HANDLERS]: `toHandlers`,
    [CAMELIZE]: `camelize`,
    [CAPITALIZE]: `capitalize`,
    [TO_HANDLER_KEY]: `toHandlerKey`,
    [SET_BLOCK_TRACKING]: `setBlockTracking`,
    [PUSH_SCOPE_ID]: `pushScopeId`,
    [POP_SCOPE_ID]: `popScopeId`,
    [WITH_CTX]: `withCtx`,
    [UNREF]: `unref`,
    [IS_REF]: `isRef`,
    [WITH_MEMO]: `withMemo`,
    [IS_MEMO_SAME]: `isMemoSame`
  };
  function registerRuntimeHelpers(helpers) {
    Object.getOwnPropertySymbols(helpers).forEach((s) => {
      helperNameMap[s] = helpers[s];
    });
  }
  var Namespaces = {
    HTML: 0,
    "0": "HTML",
    SVG: 1,
    "1": "SVG",
    MATH_ML: 2,
    "2": "MATH_ML"
  };
  var NodeTypes = {
    ROOT: 0,
    "0": "ROOT",
    ELEMENT: 1,
    "1": "ELEMENT",
    TEXT: 2,
    "2": "TEXT",
    COMMENT: 3,
    "3": "COMMENT",
    SIMPLE_EXPRESSION: 4,
    "4": "SIMPLE_EXPRESSION",
    INTERPOLATION: 5,
    "5": "INTERPOLATION",
    ATTRIBUTE: 6,
    "6": "ATTRIBUTE",
    DIRECTIVE: 7,
    "7": "DIRECTIVE",
    COMPOUND_EXPRESSION: 8,
    "8": "COMPOUND_EXPRESSION",
    IF: 9,
    "9": "IF",
    IF_BRANCH: 10,
    "10": "IF_BRANCH",
    FOR: 11,
    "11": "FOR",
    TEXT_CALL: 12,
    "12": "TEXT_CALL",
    VNODE_CALL: 13,
    "13": "VNODE_CALL",
    JS_CALL_EXPRESSION: 14,
    "14": "JS_CALL_EXPRESSION",
    JS_OBJECT_EXPRESSION: 15,
    "15": "JS_OBJECT_EXPRESSION",
    JS_PROPERTY: 16,
    "16": "JS_PROPERTY",
    JS_ARRAY_EXPRESSION: 17,
    "17": "JS_ARRAY_EXPRESSION",
    JS_FUNCTION_EXPRESSION: 18,
    "18": "JS_FUNCTION_EXPRESSION",
    JS_CONDITIONAL_EXPRESSION: 19,
    "19": "JS_CONDITIONAL_EXPRESSION",
    JS_CACHE_EXPRESSION: 20,
    "20": "JS_CACHE_EXPRESSION",
    JS_BLOCK_STATEMENT: 21,
    "21": "JS_BLOCK_STATEMENT",
    JS_TEMPLATE_LITERAL: 22,
    "22": "JS_TEMPLATE_LITERAL",
    JS_IF_STATEMENT: 23,
    "23": "JS_IF_STATEMENT",
    JS_ASSIGNMENT_EXPRESSION: 24,
    "24": "JS_ASSIGNMENT_EXPRESSION",
    JS_SEQUENCE_EXPRESSION: 25,
    "25": "JS_SEQUENCE_EXPRESSION",
    JS_RETURN_STATEMENT: 26,
    "26": "JS_RETURN_STATEMENT"
  };
  var ElementTypes = {
    ELEMENT: 0,
    "0": "ELEMENT",
    COMPONENT: 1,
    "1": "COMPONENT",
    SLOT: 2,
    "2": "SLOT",
    TEMPLATE: 3,
    "3": "TEMPLATE"
  };
  var ConstantTypes = {
    NOT_CONSTANT: 0,
    "0": "NOT_CONSTANT",
    CAN_SKIP_PATCH: 1,
    "1": "CAN_SKIP_PATCH",
    CAN_CACHE: 2,
    "2": "CAN_CACHE",
    CAN_STRINGIFY: 3,
    "3": "CAN_STRINGIFY"
  };
  var locStub = {
    start: { line: 1, column: 1, offset: 0 },
    end: { line: 1, column: 1, offset: 0 },
    source: ""
  };
  function createRoot(children, source = "") {
    return {
      type: 0,
      source,
      children,
      helpers: /* @__PURE__ */ new Set,
      components: [],
      directives: [],
      hoists: [],
      imports: [],
      cached: [],
      temps: 0,
      codegenNode: undefined,
      loc: locStub
    };
  }
  function createVNodeCall(context, tag, props, children, patchFlag, dynamicProps, directives, isBlock = false, disableTracking = false, isComponent2 = false, loc = locStub) {
    if (context) {
      if (isBlock) {
        context.helper(OPEN_BLOCK);
        context.helper(getVNodeBlockHelper(context.inSSR, isComponent2));
      } else {
        context.helper(getVNodeHelper(context.inSSR, isComponent2));
      }
      if (directives) {
        context.helper(WITH_DIRECTIVES);
      }
    }
    return {
      type: 13,
      tag,
      props,
      children,
      patchFlag,
      dynamicProps,
      directives,
      isBlock,
      disableTracking,
      isComponent: isComponent2,
      loc
    };
  }
  function createArrayExpression(elements, loc = locStub) {
    return {
      type: 17,
      loc,
      elements
    };
  }
  function createObjectExpression(properties, loc = locStub) {
    return {
      type: 15,
      loc,
      properties
    };
  }
  function createObjectProperty(key, value) {
    return {
      type: 16,
      loc: locStub,
      key: shared.isString(key) ? createSimpleExpression(key, true) : key,
      value
    };
  }
  function createSimpleExpression(content, isStatic = false, loc = locStub, constType = 0) {
    return {
      type: 4,
      loc,
      content,
      isStatic,
      constType: isStatic ? 3 : constType
    };
  }
  function createInterpolation(content, loc) {
    return {
      type: 5,
      loc,
      content: shared.isString(content) ? createSimpleExpression(content, false, loc) : content
    };
  }
  function createCompoundExpression(children, loc = locStub) {
    return {
      type: 8,
      loc,
      children
    };
  }
  function createCallExpression(callee, args = [], loc = locStub) {
    return {
      type: 14,
      loc,
      callee,
      arguments: args
    };
  }
  function createFunctionExpression(params, returns = undefined, newline = false, isSlot = false, loc = locStub) {
    return {
      type: 18,
      params,
      returns,
      newline,
      isSlot,
      loc
    };
  }
  function createConditionalExpression(test, consequent, alternate, newline = true) {
    return {
      type: 19,
      test,
      consequent,
      alternate,
      newline,
      loc: locStub
    };
  }
  function createCacheExpression(index, value, needPauseTracking = false, inVOnce = false) {
    return {
      type: 20,
      index,
      value,
      needPauseTracking,
      inVOnce,
      needArraySpread: false,
      loc: locStub
    };
  }
  function createBlockStatement(body) {
    return {
      type: 21,
      body,
      loc: locStub
    };
  }
  function createTemplateLiteral(elements) {
    return {
      type: 22,
      elements,
      loc: locStub
    };
  }
  function createIfStatement(test, consequent, alternate) {
    return {
      type: 23,
      test,
      consequent,
      alternate,
      loc: locStub
    };
  }
  function createAssignmentExpression(left, right) {
    return {
      type: 24,
      left,
      right,
      loc: locStub
    };
  }
  function createSequenceExpression(expressions) {
    return {
      type: 25,
      expressions,
      loc: locStub
    };
  }
  function createReturnStatement(returns) {
    return {
      type: 26,
      returns,
      loc: locStub
    };
  }
  function getVNodeHelper(ssr, isComponent2) {
    return ssr || isComponent2 ? CREATE_VNODE : CREATE_ELEMENT_VNODE;
  }
  function getVNodeBlockHelper(ssr, isComponent2) {
    return ssr || isComponent2 ? CREATE_BLOCK : CREATE_ELEMENT_BLOCK;
  }
  function convertToBlock(node, { helper, removeHelper, inSSR }) {
    if (!node.isBlock) {
      node.isBlock = true;
      removeHelper(getVNodeHelper(inSSR, node.isComponent));
      helper(OPEN_BLOCK);
      helper(getVNodeBlockHelper(inSSR, node.isComponent));
    }
  }
  var defaultDelimitersOpen = new Uint8Array([123, 123]);
  var defaultDelimitersClose = new Uint8Array([125, 125]);
  function isTagStartChar(c) {
    return c >= 97 && c <= 122 || c >= 65 && c <= 90;
  }
  function isWhitespace(c) {
    return c === 32 || c === 10 || c === 9 || c === 12 || c === 13;
  }
  function isEndOfTagSection(c) {
    return c === 47 || c === 62 || isWhitespace(c);
  }
  function toCharCodes(str) {
    const ret = new Uint8Array(str.length);
    for (let i = 0;i < str.length; i++) {
      ret[i] = str.charCodeAt(i);
    }
    return ret;
  }
  var Sequences = {
    Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
    CdataEnd: new Uint8Array([93, 93, 62]),
    CommentEnd: new Uint8Array([45, 45, 62]),
    ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
    StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
    TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
    TextareaEnd: new Uint8Array([
      60,
      47,
      116,
      101,
      120,
      116,
      97,
      114,
      101,
      97
    ])
  };

  class Tokenizer {
    constructor(stack2, cbs) {
      this.stack = stack2;
      this.cbs = cbs;
      this.state = 1;
      this.buffer = "";
      this.sectionStart = 0;
      this.index = 0;
      this.entityStart = 0;
      this.baseState = 1;
      this.inRCDATA = false;
      this.inXML = false;
      this.inVPre = false;
      this.newlines = [];
      this.mode = 0;
      this.delimiterOpen = defaultDelimitersOpen;
      this.delimiterClose = defaultDelimitersClose;
      this.delimiterIndex = -1;
      this.currentSequence = undefined;
      this.sequenceIndex = 0;
      {
        this.entityDecoder = new decode_js.EntityDecoder(decode_js.htmlDecodeTree, (cp, consumed) => this.emitCodePoint(cp, consumed));
      }
    }
    get inSFCRoot() {
      return this.mode === 2 && this.stack.length === 0;
    }
    reset() {
      this.state = 1;
      this.mode = 0;
      this.buffer = "";
      this.sectionStart = 0;
      this.index = 0;
      this.baseState = 1;
      this.inRCDATA = false;
      this.currentSequence = undefined;
      this.newlines.length = 0;
      this.delimiterOpen = defaultDelimitersOpen;
      this.delimiterClose = defaultDelimitersClose;
    }
    getPos(index) {
      let line = 1;
      let column = index + 1;
      for (let i = this.newlines.length - 1;i >= 0; i--) {
        const newlineIndex = this.newlines[i];
        if (index > newlineIndex) {
          line = i + 2;
          column = index - newlineIndex;
          break;
        }
      }
      return {
        column,
        line,
        offset: index
      };
    }
    peek() {
      return this.buffer.charCodeAt(this.index + 1);
    }
    stateText(c) {
      if (c === 60) {
        if (this.index > this.sectionStart) {
          this.cbs.ontext(this.sectionStart, this.index);
        }
        this.state = 5;
        this.sectionStart = this.index;
      } else if (c === 38) {
        this.startEntity();
      } else if (!this.inVPre && c === this.delimiterOpen[0]) {
        this.state = 2;
        this.delimiterIndex = 0;
        this.stateInterpolationOpen(c);
      }
    }
    stateInterpolationOpen(c) {
      if (c === this.delimiterOpen[this.delimiterIndex]) {
        if (this.delimiterIndex === this.delimiterOpen.length - 1) {
          const start = this.index + 1 - this.delimiterOpen.length;
          if (start > this.sectionStart) {
            this.cbs.ontext(this.sectionStart, start);
          }
          this.state = 3;
          this.sectionStart = start;
        } else {
          this.delimiterIndex++;
        }
      } else if (this.inRCDATA) {
        this.state = 32;
        this.stateInRCDATA(c);
      } else {
        this.state = 1;
        this.stateText(c);
      }
    }
    stateInterpolation(c) {
      if (c === this.delimiterClose[0]) {
        this.state = 4;
        this.delimiterIndex = 0;
        this.stateInterpolationClose(c);
      }
    }
    stateInterpolationClose(c) {
      if (c === this.delimiterClose[this.delimiterIndex]) {
        if (this.delimiterIndex === this.delimiterClose.length - 1) {
          this.cbs.oninterpolation(this.sectionStart, this.index + 1);
          if (this.inRCDATA) {
            this.state = 32;
          } else {
            this.state = 1;
          }
          this.sectionStart = this.index + 1;
        } else {
          this.delimiterIndex++;
        }
      } else {
        this.state = 3;
        this.stateInterpolation(c);
      }
    }
    stateSpecialStartSequence(c) {
      const isEnd = this.sequenceIndex === this.currentSequence.length;
      const isMatch = isEnd ? isEndOfTagSection(c) : (c | 32) === this.currentSequence[this.sequenceIndex];
      if (!isMatch) {
        this.inRCDATA = false;
      } else if (!isEnd) {
        this.sequenceIndex++;
        return;
      }
      this.sequenceIndex = 0;
      this.state = 6;
      this.stateInTagName(c);
    }
    stateInRCDATA(c) {
      if (this.sequenceIndex === this.currentSequence.length) {
        if (c === 62 || isWhitespace(c)) {
          const endOfText = this.index - this.currentSequence.length;
          if (this.sectionStart < endOfText) {
            const actualIndex = this.index;
            this.index = endOfText;
            this.cbs.ontext(this.sectionStart, endOfText);
            this.index = actualIndex;
          }
          this.sectionStart = endOfText + 2;
          this.stateInClosingTagName(c);
          this.inRCDATA = false;
          return;
        }
        this.sequenceIndex = 0;
      }
      if ((c | 32) === this.currentSequence[this.sequenceIndex]) {
        this.sequenceIndex += 1;
      } else if (this.sequenceIndex === 0) {
        if (this.currentSequence === Sequences.TitleEnd || this.currentSequence === Sequences.TextareaEnd && !this.inSFCRoot) {
          if (c === 38) {
            this.startEntity();
          } else if (!this.inVPre && c === this.delimiterOpen[0]) {
            this.state = 2;
            this.delimiterIndex = 0;
            this.stateInterpolationOpen(c);
          }
        } else if (this.fastForwardTo(60)) {
          this.sequenceIndex = 1;
        }
      } else {
        this.sequenceIndex = Number(c === 60);
      }
    }
    stateCDATASequence(c) {
      if (c === Sequences.Cdata[this.sequenceIndex]) {
        if (++this.sequenceIndex === Sequences.Cdata.length) {
          this.state = 28;
          this.currentSequence = Sequences.CdataEnd;
          this.sequenceIndex = 0;
          this.sectionStart = this.index + 1;
        }
      } else {
        this.sequenceIndex = 0;
        this.state = 23;
        this.stateInDeclaration(c);
      }
    }
    fastForwardTo(c) {
      while (++this.index < this.buffer.length) {
        const cc = this.buffer.charCodeAt(this.index);
        if (cc === 10) {
          this.newlines.push(this.index);
        }
        if (cc === c) {
          return true;
        }
      }
      this.index = this.buffer.length - 1;
      return false;
    }
    stateInCommentLike(c) {
      if (c === this.currentSequence[this.sequenceIndex]) {
        if (++this.sequenceIndex === this.currentSequence.length) {
          if (this.currentSequence === Sequences.CdataEnd) {
            this.cbs.oncdata(this.sectionStart, this.index - 2);
          } else {
            this.cbs.oncomment(this.sectionStart, this.index - 2);
          }
          this.sequenceIndex = 0;
          this.sectionStart = this.index + 1;
          this.state = 1;
        }
      } else if (this.sequenceIndex === 0) {
        if (this.fastForwardTo(this.currentSequence[0])) {
          this.sequenceIndex = 1;
        }
      } else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
        this.sequenceIndex = 0;
      }
    }
    startSpecial(sequence, offset) {
      this.enterRCDATA(sequence, offset);
      this.state = 31;
    }
    enterRCDATA(sequence, offset) {
      this.inRCDATA = true;
      this.currentSequence = sequence;
      this.sequenceIndex = offset;
    }
    stateBeforeTagName(c) {
      if (c === 33) {
        this.state = 22;
        this.sectionStart = this.index + 1;
      } else if (c === 63) {
        this.state = 24;
        this.sectionStart = this.index + 1;
      } else if (isTagStartChar(c)) {
        this.sectionStart = this.index;
        if (this.mode === 0) {
          this.state = 6;
        } else if (this.inSFCRoot) {
          this.state = 34;
        } else if (!this.inXML) {
          if (c === 116) {
            this.state = 30;
          } else {
            this.state = c === 115 ? 29 : 6;
          }
        } else {
          this.state = 6;
        }
      } else if (c === 47) {
        this.state = 8;
      } else {
        this.state = 1;
        this.stateText(c);
      }
    }
    stateInTagName(c) {
      if (isEndOfTagSection(c)) {
        this.handleTagName(c);
      }
    }
    stateInSFCRootTagName(c) {
      if (isEndOfTagSection(c)) {
        const tag = this.buffer.slice(this.sectionStart, this.index);
        if (tag !== "template") {
          this.enterRCDATA(toCharCodes(`</` + tag), 0);
        }
        this.handleTagName(c);
      }
    }
    handleTagName(c) {
      this.cbs.onopentagname(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = 11;
      this.stateBeforeAttrName(c);
    }
    stateBeforeClosingTagName(c) {
      if (isWhitespace(c))
        ;
      else if (c === 62) {
        {
          this.cbs.onerr(14, this.index);
        }
        this.state = 1;
        this.sectionStart = this.index + 1;
      } else {
        this.state = isTagStartChar(c) ? 9 : 27;
        this.sectionStart = this.index;
      }
    }
    stateInClosingTagName(c) {
      if (c === 62 || isWhitespace(c)) {
        this.cbs.onclosetag(this.sectionStart, this.index);
        this.sectionStart = -1;
        this.state = 10;
        this.stateAfterClosingTagName(c);
      }
    }
    stateAfterClosingTagName(c) {
      if (c === 62) {
        this.state = 1;
        this.sectionStart = this.index + 1;
      }
    }
    stateBeforeAttrName(c) {
      if (c === 62) {
        this.cbs.onopentagend(this.index);
        if (this.inRCDATA) {
          this.state = 32;
        } else {
          this.state = 1;
        }
        this.sectionStart = this.index + 1;
      } else if (c === 47) {
        this.state = 7;
        if (this.peek() !== 62) {
          this.cbs.onerr(22, this.index);
        }
      } else if (c === 60 && this.peek() === 47) {
        this.cbs.onopentagend(this.index);
        this.state = 5;
        this.sectionStart = this.index;
      } else if (!isWhitespace(c)) {
        if (c === 61) {
          this.cbs.onerr(19, this.index);
        }
        this.handleAttrStart(c);
      }
    }
    handleAttrStart(c) {
      if (c === 118 && this.peek() === 45) {
        this.state = 13;
        this.sectionStart = this.index;
      } else if (c === 46 || c === 58 || c === 64 || c === 35) {
        this.cbs.ondirname(this.index, this.index + 1);
        this.state = 14;
        this.sectionStart = this.index + 1;
      } else {
        this.state = 12;
        this.sectionStart = this.index;
      }
    }
    stateInSelfClosingTag(c) {
      if (c === 62) {
        this.cbs.onselfclosingtag(this.index);
        this.state = 1;
        this.sectionStart = this.index + 1;
        this.inRCDATA = false;
      } else if (!isWhitespace(c)) {
        this.state = 11;
        this.stateBeforeAttrName(c);
      }
    }
    stateInAttrName(c) {
      if (c === 61 || isEndOfTagSection(c)) {
        this.cbs.onattribname(this.sectionStart, this.index);
        this.handleAttrNameEnd(c);
      } else if (c === 34 || c === 39 || c === 60) {
        this.cbs.onerr(17, this.index);
      }
    }
    stateInDirName(c) {
      if (c === 61 || isEndOfTagSection(c)) {
        this.cbs.ondirname(this.sectionStart, this.index);
        this.handleAttrNameEnd(c);
      } else if (c === 58) {
        this.cbs.ondirname(this.sectionStart, this.index);
        this.state = 14;
        this.sectionStart = this.index + 1;
      } else if (c === 46) {
        this.cbs.ondirname(this.sectionStart, this.index);
        this.state = 16;
        this.sectionStart = this.index + 1;
      }
    }
    stateInDirArg(c) {
      if (c === 61 || isEndOfTagSection(c)) {
        this.cbs.ondirarg(this.sectionStart, this.index);
        this.handleAttrNameEnd(c);
      } else if (c === 91) {
        this.state = 15;
      } else if (c === 46) {
        this.cbs.ondirarg(this.sectionStart, this.index);
        this.state = 16;
        this.sectionStart = this.index + 1;
      }
    }
    stateInDynamicDirArg(c) {
      if (c === 93) {
        this.state = 14;
      } else if (c === 61 || isEndOfTagSection(c)) {
        this.cbs.ondirarg(this.sectionStart, this.index + 1);
        this.handleAttrNameEnd(c);
        {
          this.cbs.onerr(27, this.index);
        }
      }
    }
    stateInDirModifier(c) {
      if (c === 61 || isEndOfTagSection(c)) {
        this.cbs.ondirmodifier(this.sectionStart, this.index);
        this.handleAttrNameEnd(c);
      } else if (c === 46) {
        this.cbs.ondirmodifier(this.sectionStart, this.index);
        this.sectionStart = this.index + 1;
      }
    }
    handleAttrNameEnd(c) {
      this.sectionStart = this.index;
      this.state = 17;
      this.cbs.onattribnameend(this.index);
      this.stateAfterAttrName(c);
    }
    stateAfterAttrName(c) {
      if (c === 61) {
        this.state = 18;
      } else if (c === 47 || c === 62) {
        this.cbs.onattribend(0, this.sectionStart);
        this.sectionStart = -1;
        this.state = 11;
        this.stateBeforeAttrName(c);
      } else if (!isWhitespace(c)) {
        this.cbs.onattribend(0, this.sectionStart);
        this.handleAttrStart(c);
      }
    }
    stateBeforeAttrValue(c) {
      if (c === 34) {
        this.state = 19;
        this.sectionStart = this.index + 1;
      } else if (c === 39) {
        this.state = 20;
        this.sectionStart = this.index + 1;
      } else if (!isWhitespace(c)) {
        this.sectionStart = this.index;
        this.state = 21;
        this.stateInAttrValueNoQuotes(c);
      }
    }
    handleInAttrValue(c, quote) {
      if (c === quote || false) {
        this.cbs.onattribdata(this.sectionStart, this.index);
        this.sectionStart = -1;
        this.cbs.onattribend(quote === 34 ? 3 : 2, this.index + 1);
        this.state = 11;
      } else if (c === 38) {
        this.startEntity();
      }
    }
    stateInAttrValueDoubleQuotes(c) {
      this.handleInAttrValue(c, 34);
    }
    stateInAttrValueSingleQuotes(c) {
      this.handleInAttrValue(c, 39);
    }
    stateInAttrValueNoQuotes(c) {
      if (isWhitespace(c) || c === 62) {
        this.cbs.onattribdata(this.sectionStart, this.index);
        this.sectionStart = -1;
        this.cbs.onattribend(1, this.index);
        this.state = 11;
        this.stateBeforeAttrName(c);
      } else if (c === 34 || c === 39 || c === 60 || c === 61 || c === 96) {
        this.cbs.onerr(18, this.index);
      } else if (c === 38) {
        this.startEntity();
      }
    }
    stateBeforeDeclaration(c) {
      if (c === 91) {
        this.state = 26;
        this.sequenceIndex = 0;
      } else {
        this.state = c === 45 ? 25 : 23;
      }
    }
    stateInDeclaration(c) {
      if (c === 62 || this.fastForwardTo(62)) {
        this.state = 1;
        this.sectionStart = this.index + 1;
      }
    }
    stateInProcessingInstruction(c) {
      if (c === 62 || this.fastForwardTo(62)) {
        this.cbs.onprocessinginstruction(this.sectionStart, this.index);
        this.state = 1;
        this.sectionStart = this.index + 1;
      }
    }
    stateBeforeComment(c) {
      if (c === 45) {
        this.state = 28;
        this.currentSequence = Sequences.CommentEnd;
        this.sequenceIndex = 2;
        this.sectionStart = this.index + 1;
      } else {
        this.state = 23;
      }
    }
    stateInSpecialComment(c) {
      if (c === 62 || this.fastForwardTo(62)) {
        this.cbs.oncomment(this.sectionStart, this.index);
        this.state = 1;
        this.sectionStart = this.index + 1;
      }
    }
    stateBeforeSpecialS(c) {
      if (c === Sequences.ScriptEnd[3]) {
        this.startSpecial(Sequences.ScriptEnd, 4);
      } else if (c === Sequences.StyleEnd[3]) {
        this.startSpecial(Sequences.StyleEnd, 4);
      } else {
        this.state = 6;
        this.stateInTagName(c);
      }
    }
    stateBeforeSpecialT(c) {
      if (c === Sequences.TitleEnd[3]) {
        this.startSpecial(Sequences.TitleEnd, 4);
      } else if (c === Sequences.TextareaEnd[3]) {
        this.startSpecial(Sequences.TextareaEnd, 4);
      } else {
        this.state = 6;
        this.stateInTagName(c);
      }
    }
    startEntity() {
      {
        this.baseState = this.state;
        this.state = 33;
        this.entityStart = this.index;
        this.entityDecoder.startEntity(this.baseState === 1 || this.baseState === 32 ? decode_js.DecodingMode.Legacy : decode_js.DecodingMode.Attribute);
      }
    }
    stateInEntity() {
      {
        const length = this.entityDecoder.write(this.buffer, this.index);
        if (length >= 0) {
          this.state = this.baseState;
          if (length === 0) {
            this.index = this.entityStart;
          }
        } else {
          this.index = this.buffer.length - 1;
        }
      }
    }
    parse(input) {
      this.buffer = input;
      while (this.index < this.buffer.length) {
        const c = this.buffer.charCodeAt(this.index);
        if (c === 10) {
          this.newlines.push(this.index);
        }
        switch (this.state) {
          case 1: {
            this.stateText(c);
            break;
          }
          case 2: {
            this.stateInterpolationOpen(c);
            break;
          }
          case 3: {
            this.stateInterpolation(c);
            break;
          }
          case 4: {
            this.stateInterpolationClose(c);
            break;
          }
          case 31: {
            this.stateSpecialStartSequence(c);
            break;
          }
          case 32: {
            this.stateInRCDATA(c);
            break;
          }
          case 26: {
            this.stateCDATASequence(c);
            break;
          }
          case 19: {
            this.stateInAttrValueDoubleQuotes(c);
            break;
          }
          case 12: {
            this.stateInAttrName(c);
            break;
          }
          case 13: {
            this.stateInDirName(c);
            break;
          }
          case 14: {
            this.stateInDirArg(c);
            break;
          }
          case 15: {
            this.stateInDynamicDirArg(c);
            break;
          }
          case 16: {
            this.stateInDirModifier(c);
            break;
          }
          case 28: {
            this.stateInCommentLike(c);
            break;
          }
          case 27: {
            this.stateInSpecialComment(c);
            break;
          }
          case 11: {
            this.stateBeforeAttrName(c);
            break;
          }
          case 6: {
            this.stateInTagName(c);
            break;
          }
          case 34: {
            this.stateInSFCRootTagName(c);
            break;
          }
          case 9: {
            this.stateInClosingTagName(c);
            break;
          }
          case 5: {
            this.stateBeforeTagName(c);
            break;
          }
          case 17: {
            this.stateAfterAttrName(c);
            break;
          }
          case 20: {
            this.stateInAttrValueSingleQuotes(c);
            break;
          }
          case 18: {
            this.stateBeforeAttrValue(c);
            break;
          }
          case 8: {
            this.stateBeforeClosingTagName(c);
            break;
          }
          case 10: {
            this.stateAfterClosingTagName(c);
            break;
          }
          case 29: {
            this.stateBeforeSpecialS(c);
            break;
          }
          case 30: {
            this.stateBeforeSpecialT(c);
            break;
          }
          case 21: {
            this.stateInAttrValueNoQuotes(c);
            break;
          }
          case 7: {
            this.stateInSelfClosingTag(c);
            break;
          }
          case 23: {
            this.stateInDeclaration(c);
            break;
          }
          case 22: {
            this.stateBeforeDeclaration(c);
            break;
          }
          case 25: {
            this.stateBeforeComment(c);
            break;
          }
          case 24: {
            this.stateInProcessingInstruction(c);
            break;
          }
          case 33: {
            this.stateInEntity();
            break;
          }
        }
        this.index++;
      }
      this.cleanup();
      this.finish();
    }
    cleanup() {
      if (this.sectionStart !== this.index) {
        if (this.state === 1 || this.state === 32 && this.sequenceIndex === 0) {
          this.cbs.ontext(this.sectionStart, this.index);
          this.sectionStart = this.index;
        } else if (this.state === 19 || this.state === 20 || this.state === 21) {
          this.cbs.onattribdata(this.sectionStart, this.index);
          this.sectionStart = this.index;
        }
      }
    }
    finish() {
      if (this.state === 33) {
        this.entityDecoder.end();
        this.state = this.baseState;
      }
      this.handleTrailingData();
      this.cbs.onend();
    }
    handleTrailingData() {
      const endIndex = this.buffer.length;
      if (this.sectionStart >= endIndex) {
        return;
      }
      if (this.state === 28) {
        if (this.currentSequence === Sequences.CdataEnd) {
          this.cbs.oncdata(this.sectionStart, endIndex);
        } else {
          this.cbs.oncomment(this.sectionStart, endIndex);
        }
      } else if (this.state === 6 || this.state === 11 || this.state === 18 || this.state === 17 || this.state === 12 || this.state === 13 || this.state === 14 || this.state === 15 || this.state === 16 || this.state === 20 || this.state === 19 || this.state === 21 || this.state === 9)
        ;
      else {
        this.cbs.ontext(this.sectionStart, endIndex);
      }
    }
    emitCodePoint(cp, consumed) {
      {
        if (this.baseState !== 1 && this.baseState !== 32) {
          if (this.sectionStart < this.entityStart) {
            this.cbs.onattribdata(this.sectionStart, this.entityStart);
          }
          this.sectionStart = this.entityStart + consumed;
          this.index = this.sectionStart - 1;
          this.cbs.onattribentity(decode_js.fromCodePoint(cp), this.entityStart, this.sectionStart);
        } else {
          if (this.sectionStart < this.entityStart) {
            this.cbs.ontext(this.sectionStart, this.entityStart);
          }
          this.sectionStart = this.entityStart + consumed;
          this.index = this.sectionStart - 1;
          this.cbs.ontextentity(decode_js.fromCodePoint(cp), this.entityStart, this.sectionStart);
        }
      }
    }
  }
  var CompilerDeprecationTypes = {
    COMPILER_IS_ON_ELEMENT: "COMPILER_IS_ON_ELEMENT",
    COMPILER_V_BIND_SYNC: "COMPILER_V_BIND_SYNC",
    COMPILER_V_BIND_OBJECT_ORDER: "COMPILER_V_BIND_OBJECT_ORDER",
    COMPILER_V_ON_NATIVE: "COMPILER_V_ON_NATIVE",
    COMPILER_V_IF_V_FOR_PRECEDENCE: "COMPILER_V_IF_V_FOR_PRECEDENCE",
    COMPILER_NATIVE_TEMPLATE: "COMPILER_NATIVE_TEMPLATE",
    COMPILER_INLINE_TEMPLATE: "COMPILER_INLINE_TEMPLATE",
    COMPILER_FILTERS: "COMPILER_FILTERS"
  };
  var deprecationData = {
    ["COMPILER_IS_ON_ELEMENT"]: {
      message: `Platform-native elements with "is" prop will no longer be treated as components in Vue 3 unless the "is" value is explicitly prefixed with "vue:".`,
      link: `https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html`
    },
    ["COMPILER_V_BIND_SYNC"]: {
      message: (key) => `.sync modifier for v-bind has been removed. Use v-model with argument instead. \`v-bind:${key}.sync\` should be changed to \`v-model:${key}\`.`,
      link: `https://v3-migration.vuejs.org/breaking-changes/v-model.html`
    },
    ["COMPILER_V_BIND_OBJECT_ORDER"]: {
      message: `v-bind="obj" usage is now order sensitive and behaves like JavaScript object spread: it will now overwrite an existing non-mergeable attribute that appears before v-bind in the case of conflict. To retain 2.x behavior, move v-bind to make it the first attribute. You can also suppress this warning if the usage is intended.`,
      link: `https://v3-migration.vuejs.org/breaking-changes/v-bind.html`
    },
    ["COMPILER_V_ON_NATIVE"]: {
      message: `.native modifier for v-on has been removed as is no longer necessary.`,
      link: `https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html`
    },
    ["COMPILER_V_IF_V_FOR_PRECEDENCE"]: {
      message: `v-if / v-for precedence when used on the same element has changed in Vue 3: v-if now takes higher precedence and will no longer have access to v-for scope variables. It is best to avoid the ambiguity with <template> tags or use a computed property that filters v-for data source.`,
      link: `https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html`
    },
    ["COMPILER_NATIVE_TEMPLATE"]: {
      message: `<template> with no special directives will render as a native template element instead of its inner content in Vue 3.`
    },
    ["COMPILER_INLINE_TEMPLATE"]: {
      message: `"inline-template" has been removed in Vue 3.`,
      link: `https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html`
    },
    ["COMPILER_FILTERS"]: {
      message: `filters have been removed in Vue 3. The "|" symbol will be treated as native JavaScript bitwise OR operator. Use method calls or computed properties instead.`,
      link: `https://v3-migration.vuejs.org/breaking-changes/filters.html`
    }
  };
  function getCompatValue(key, { compatConfig }) {
    const value = compatConfig && compatConfig[key];
    if (key === "MODE") {
      return value || 3;
    } else {
      return value;
    }
  }
  function isCompatEnabled(key, context) {
    const mode = getCompatValue("MODE", context);
    const value = getCompatValue(key, context);
    return mode === 3 ? value === true : value !== false;
  }
  function checkCompatEnabled(key, context, loc, ...args) {
    const enabled = isCompatEnabled(key, context);
    if (enabled) {
      warnDeprecation(key, context, loc, ...args);
    }
    return enabled;
  }
  function warnDeprecation(key, context, loc, ...args) {
    const val = getCompatValue(key, context);
    if (val === "suppress-warning") {
      return;
    }
    const { message, link } = deprecationData[key];
    const msg = `(deprecation ${key}) ${typeof message === "function" ? message(...args) : message}${link ? `
  Details: ${link}` : ``}`;
    const err = new SyntaxError(msg);
    err.code = key;
    if (loc)
      err.loc = loc;
    context.onWarn(err);
  }
  function defaultOnError(error) {
    throw error;
  }
  function defaultOnWarn(msg) {
    console.warn(`[Vue warn] ${msg.message}`);
  }
  function createCompilerError(code, loc, messages, additionalMessage) {
    const msg = (messages || errorMessages)[code] + (additionalMessage || ``);
    const error = new SyntaxError(String(msg));
    error.code = code;
    error.loc = loc;
    return error;
  }
  var ErrorCodes = {
    ABRUPT_CLOSING_OF_EMPTY_COMMENT: 0,
    "0": "ABRUPT_CLOSING_OF_EMPTY_COMMENT",
    CDATA_IN_HTML_CONTENT: 1,
    "1": "CDATA_IN_HTML_CONTENT",
    DUPLICATE_ATTRIBUTE: 2,
    "2": "DUPLICATE_ATTRIBUTE",
    END_TAG_WITH_ATTRIBUTES: 3,
    "3": "END_TAG_WITH_ATTRIBUTES",
    END_TAG_WITH_TRAILING_SOLIDUS: 4,
    "4": "END_TAG_WITH_TRAILING_SOLIDUS",
    EOF_BEFORE_TAG_NAME: 5,
    "5": "EOF_BEFORE_TAG_NAME",
    EOF_IN_CDATA: 6,
    "6": "EOF_IN_CDATA",
    EOF_IN_COMMENT: 7,
    "7": "EOF_IN_COMMENT",
    EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT: 8,
    "8": "EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT",
    EOF_IN_TAG: 9,
    "9": "EOF_IN_TAG",
    INCORRECTLY_CLOSED_COMMENT: 10,
    "10": "INCORRECTLY_CLOSED_COMMENT",
    INCORRECTLY_OPENED_COMMENT: 11,
    "11": "INCORRECTLY_OPENED_COMMENT",
    INVALID_FIRST_CHARACTER_OF_TAG_NAME: 12,
    "12": "INVALID_FIRST_CHARACTER_OF_TAG_NAME",
    MISSING_ATTRIBUTE_VALUE: 13,
    "13": "MISSING_ATTRIBUTE_VALUE",
    MISSING_END_TAG_NAME: 14,
    "14": "MISSING_END_TAG_NAME",
    MISSING_WHITESPACE_BETWEEN_ATTRIBUTES: 15,
    "15": "MISSING_WHITESPACE_BETWEEN_ATTRIBUTES",
    NESTED_COMMENT: 16,
    "16": "NESTED_COMMENT",
    UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME: 17,
    "17": "UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME",
    UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE: 18,
    "18": "UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE",
    UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME: 19,
    "19": "UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME",
    UNEXPECTED_NULL_CHARACTER: 20,
    "20": "UNEXPECTED_NULL_CHARACTER",
    UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME: 21,
    "21": "UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME",
    UNEXPECTED_SOLIDUS_IN_TAG: 22,
    "22": "UNEXPECTED_SOLIDUS_IN_TAG",
    X_INVALID_END_TAG: 23,
    "23": "X_INVALID_END_TAG",
    X_MISSING_END_TAG: 24,
    "24": "X_MISSING_END_TAG",
    X_MISSING_INTERPOLATION_END: 25,
    "25": "X_MISSING_INTERPOLATION_END",
    X_MISSING_DIRECTIVE_NAME: 26,
    "26": "X_MISSING_DIRECTIVE_NAME",
    X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END: 27,
    "27": "X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END",
    X_V_IF_NO_EXPRESSION: 28,
    "28": "X_V_IF_NO_EXPRESSION",
    X_V_IF_SAME_KEY: 29,
    "29": "X_V_IF_SAME_KEY",
    X_V_ELSE_NO_ADJACENT_IF: 30,
    "30": "X_V_ELSE_NO_ADJACENT_IF",
    X_V_FOR_NO_EXPRESSION: 31,
    "31": "X_V_FOR_NO_EXPRESSION",
    X_V_FOR_MALFORMED_EXPRESSION: 32,
    "32": "X_V_FOR_MALFORMED_EXPRESSION",
    X_V_FOR_TEMPLATE_KEY_PLACEMENT: 33,
    "33": "X_V_FOR_TEMPLATE_KEY_PLACEMENT",
    X_V_BIND_NO_EXPRESSION: 34,
    "34": "X_V_BIND_NO_EXPRESSION",
    X_V_ON_NO_EXPRESSION: 35,
    "35": "X_V_ON_NO_EXPRESSION",
    X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET: 36,
    "36": "X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET",
    X_V_SLOT_MIXED_SLOT_USAGE: 37,
    "37": "X_V_SLOT_MIXED_SLOT_USAGE",
    X_V_SLOT_DUPLICATE_SLOT_NAMES: 38,
    "38": "X_V_SLOT_DUPLICATE_SLOT_NAMES",
    X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN: 39,
    "39": "X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN",
    X_V_SLOT_MISPLACED: 40,
    "40": "X_V_SLOT_MISPLACED",
    X_V_MODEL_NO_EXPRESSION: 41,
    "41": "X_V_MODEL_NO_EXPRESSION",
    X_V_MODEL_MALFORMED_EXPRESSION: 42,
    "42": "X_V_MODEL_MALFORMED_EXPRESSION",
    X_V_MODEL_ON_SCOPE_VARIABLE: 43,
    "43": "X_V_MODEL_ON_SCOPE_VARIABLE",
    X_V_MODEL_ON_PROPS: 44,
    "44": "X_V_MODEL_ON_PROPS",
    X_INVALID_EXPRESSION: 45,
    "45": "X_INVALID_EXPRESSION",
    X_KEEP_ALIVE_INVALID_CHILDREN: 46,
    "46": "X_KEEP_ALIVE_INVALID_CHILDREN",
    X_PREFIX_ID_NOT_SUPPORTED: 47,
    "47": "X_PREFIX_ID_NOT_SUPPORTED",
    X_MODULE_MODE_NOT_SUPPORTED: 48,
    "48": "X_MODULE_MODE_NOT_SUPPORTED",
    X_CACHE_HANDLER_NOT_SUPPORTED: 49,
    "49": "X_CACHE_HANDLER_NOT_SUPPORTED",
    X_SCOPE_ID_NOT_SUPPORTED: 50,
    "50": "X_SCOPE_ID_NOT_SUPPORTED",
    X_VNODE_HOOKS: 51,
    "51": "X_VNODE_HOOKS",
    X_V_BIND_INVALID_SAME_NAME_ARGUMENT: 52,
    "52": "X_V_BIND_INVALID_SAME_NAME_ARGUMENT",
    __EXTEND_POINT__: 53,
    "53": "__EXTEND_POINT__"
  };
  var errorMessages = {
    [0]: "Illegal comment.",
    [1]: "CDATA section is allowed only in XML context.",
    [2]: "Duplicate attribute.",
    [3]: "End tag cannot have attributes.",
    [4]: "Illegal '/' in tags.",
    [5]: "Unexpected EOF in tag.",
    [6]: "Unexpected EOF in CDATA section.",
    [7]: "Unexpected EOF in comment.",
    [8]: "Unexpected EOF in script.",
    [9]: "Unexpected EOF in tag.",
    [10]: "Incorrectly closed comment.",
    [11]: "Incorrectly opened comment.",
    [12]: "Illegal tag name. Use '&lt;' to print '<'.",
    [13]: "Attribute value was expected.",
    [14]: "End tag name was expected.",
    [15]: "Whitespace was expected.",
    [16]: "Unexpected '<!--' in comment.",
    [17]: `Attribute name cannot contain U+0022 ("), U+0027 ('), and U+003C (<).`,
    [18]: "Unquoted attribute value cannot contain U+0022 (\"), U+0027 ('), U+003C (<), U+003D (=), and U+0060 (`).",
    [19]: "Attribute name cannot start with '='.",
    [21]: "'<?' is allowed only in XML context.",
    [20]: `Unexpected null character.`,
    [22]: "Illegal '/' in tags.",
    [23]: "Invalid end tag.",
    [24]: "Element is missing end tag.",
    [25]: "Interpolation end sign was not found.",
    [27]: "End bracket for dynamic directive argument was not found. Note that dynamic directive argument cannot contain spaces.",
    [26]: "Legal directive name was expected.",
    [28]: `v-if/v-else-if is missing expression.`,
    [29]: `v-if/else branches must use unique keys.`,
    [30]: `v-else/v-else-if has no adjacent v-if or v-else-if.`,
    [31]: `v-for is missing expression.`,
    [32]: `v-for has invalid expression.`,
    [33]: `<template v-for> key should be placed on the <template> tag.`,
    [34]: `v-bind is missing expression.`,
    [52]: `v-bind with same-name shorthand only allows static argument.`,
    [35]: `v-on is missing expression.`,
    [36]: `Unexpected custom directive on <slot> outlet.`,
    [37]: `Mixed v-slot usage on both the component and nested <template>. When there are multiple named slots, all slots should use <template> syntax to avoid scope ambiguity.`,
    [38]: `Duplicate slot names found. `,
    [39]: `Extraneous children found when component already has explicitly named default slot. These children will be ignored.`,
    [40]: `v-slot can only be used on components or <template> tags.`,
    [41]: `v-model is missing expression.`,
    [42]: `v-model value must be a valid JavaScript member expression.`,
    [43]: `v-model cannot be used on v-for or v-slot scope variables because they are not writable.`,
    [44]: `v-model cannot be used on a prop, because local prop bindings are not writable.
Use a v-bind binding combined with a v-on listener that emits update:x event instead.`,
    [45]: `Error parsing JavaScript expression: `,
    [46]: `<KeepAlive> expects exactly one child component.`,
    [51]: `@vnode-* hooks in templates are no longer supported. Use the vue: prefix instead. For example, @vnode-mounted should be changed to @vue:mounted. @vnode-* hooks support has been removed in 3.4.`,
    [47]: `"prefixIdentifiers" option is not supported in this build of compiler.`,
    [48]: `ES module mode is not supported in this build of compiler.`,
    [49]: `"cacheHandlers" option is only supported when the "prefixIdentifiers" option is enabled.`,
    [50]: `"scopeId" option is only supported in module mode.`,
    [53]: ``
  };
  function walkIdentifiers(root, onIdentifier, includeAll = false, parentStack = [], knownIds = /* @__PURE__ */ Object.create(null)) {
    const rootExp = root.type === "Program" ? root.body[0].type === "ExpressionStatement" && root.body[0].expression : root;
    estreeWalker.walk(root, {
      enter(node, parent) {
        parent && parentStack.push(parent);
        if (parent && parent.type.startsWith("TS") && !TS_NODE_TYPES.includes(parent.type)) {
          return this.skip();
        }
        if (node.type === "Identifier") {
          const isLocal = !!knownIds[node.name];
          const isRefed = isReferencedIdentifier(node, parent, parentStack);
          if (includeAll || isRefed && !isLocal) {
            onIdentifier(node, parent, parentStack, isRefed, isLocal);
          }
        } else if (node.type === "ObjectProperty" && (parent == null ? undefined : parent.type) === "ObjectPattern") {
          node.inPattern = true;
        } else if (isFunctionType(node)) {
          if (node.scopeIds) {
            node.scopeIds.forEach((id) => markKnownIds(id, knownIds));
          } else {
            walkFunctionParams(node, (id) => markScopeIdentifier(node, id, knownIds));
          }
        } else if (node.type === "BlockStatement") {
          if (node.scopeIds) {
            node.scopeIds.forEach((id) => markKnownIds(id, knownIds));
          } else {
            walkBlockDeclarations(node, (id) => markScopeIdentifier(node, id, knownIds));
          }
        } else if (node.type === "CatchClause" && node.param) {
          for (const id of extractIdentifiers(node.param)) {
            markScopeIdentifier(node, id, knownIds);
          }
        } else if (isForStatement(node)) {
          walkForStatement(node, false, (id) => markScopeIdentifier(node, id, knownIds));
        }
      },
      leave(node, parent) {
        parent && parentStack.pop();
        if (node !== rootExp && node.scopeIds) {
          for (const id of node.scopeIds) {
            knownIds[id]--;
            if (knownIds[id] === 0) {
              delete knownIds[id];
            }
          }
        }
      }
    });
  }
  function isReferencedIdentifier(id, parent, parentStack) {
    if (!parent) {
      return true;
    }
    if (id.name === "arguments") {
      return false;
    }
    if (isReferenced(id, parent)) {
      return true;
    }
    switch (parent.type) {
      case "AssignmentExpression":
      case "AssignmentPattern":
        return true;
      case "ObjectPattern":
      case "ArrayPattern":
        return isInDestructureAssignment(parent, parentStack);
    }
    return false;
  }
  function isInDestructureAssignment(parent, parentStack) {
    if (parent && (parent.type === "ObjectProperty" || parent.type === "ArrayPattern")) {
      let i = parentStack.length;
      while (i--) {
        const p = parentStack[i];
        if (p.type === "AssignmentExpression") {
          return true;
        } else if (p.type !== "ObjectProperty" && !p.type.endsWith("Pattern")) {
          break;
        }
      }
    }
    return false;
  }
  function isInNewExpression(parentStack) {
    let i = parentStack.length;
    while (i--) {
      const p = parentStack[i];
      if (p.type === "NewExpression") {
        return true;
      } else if (p.type !== "MemberExpression") {
        break;
      }
    }
    return false;
  }
  function walkFunctionParams(node, onIdent) {
    for (const p of node.params) {
      for (const id of extractIdentifiers(p)) {
        onIdent(id);
      }
    }
  }
  function walkBlockDeclarations(block, onIdent) {
    for (const stmt of block.body) {
      if (stmt.type === "VariableDeclaration") {
        if (stmt.declare)
          continue;
        for (const decl of stmt.declarations) {
          for (const id of extractIdentifiers(decl.id)) {
            onIdent(id);
          }
        }
      } else if (stmt.type === "FunctionDeclaration" || stmt.type === "ClassDeclaration") {
        if (stmt.declare || !stmt.id)
          continue;
        onIdent(stmt.id);
      } else if (isForStatement(stmt)) {
        walkForStatement(stmt, true, onIdent);
      }
    }
  }
  function isForStatement(stmt) {
    return stmt.type === "ForOfStatement" || stmt.type === "ForInStatement" || stmt.type === "ForStatement";
  }
  function walkForStatement(stmt, isVar, onIdent) {
    const variable = stmt.type === "ForStatement" ? stmt.init : stmt.left;
    if (variable && variable.type === "VariableDeclaration" && (variable.kind === "var" ? isVar : !isVar)) {
      for (const decl of variable.declarations) {
        for (const id of extractIdentifiers(decl.id)) {
          onIdent(id);
        }
      }
    }
  }
  function extractIdentifiers(param, nodes = []) {
    switch (param.type) {
      case "Identifier":
        nodes.push(param);
        break;
      case "MemberExpression":
        let object = param;
        while (object.type === "MemberExpression") {
          object = object.object;
        }
        nodes.push(object);
        break;
      case "ObjectPattern":
        for (const prop of param.properties) {
          if (prop.type === "RestElement") {
            extractIdentifiers(prop.argument, nodes);
          } else {
            extractIdentifiers(prop.value, nodes);
          }
        }
        break;
      case "ArrayPattern":
        param.elements.forEach((element) => {
          if (element)
            extractIdentifiers(element, nodes);
        });
        break;
      case "RestElement":
        extractIdentifiers(param.argument, nodes);
        break;
      case "AssignmentPattern":
        extractIdentifiers(param.left, nodes);
        break;
    }
    return nodes;
  }
  function markKnownIds(name, knownIds) {
    if (name in knownIds) {
      knownIds[name]++;
    } else {
      knownIds[name] = 1;
    }
  }
  function markScopeIdentifier(node, child, knownIds) {
    const { name } = child;
    if (node.scopeIds && node.scopeIds.has(name)) {
      return;
    }
    markKnownIds(name, knownIds);
    (node.scopeIds || (node.scopeIds = /* @__PURE__ */ new Set)).add(name);
  }
  var isFunctionType = (node) => {
    return /Function(?:Expression|Declaration)$|Method$/.test(node.type);
  };
  var isStaticProperty = (node) => node && (node.type === "ObjectProperty" || node.type === "ObjectMethod") && !node.computed;
  var isStaticPropertyKey = (node, parent) => isStaticProperty(parent) && parent.key === node;
  function isReferenced(node, parent, grandparent) {
    switch (parent.type) {
      case "MemberExpression":
      case "OptionalMemberExpression":
        if (parent.property === node) {
          return !!parent.computed;
        }
        return parent.object === node;
      case "JSXMemberExpression":
        return parent.object === node;
      case "VariableDeclarator":
        return parent.init === node;
      case "ArrowFunctionExpression":
        return parent.body === node;
      case "PrivateName":
        return false;
      case "ClassMethod":
      case "ClassPrivateMethod":
      case "ObjectMethod":
        if (parent.key === node) {
          return !!parent.computed;
        }
        return false;
      case "ObjectProperty":
        if (parent.key === node) {
          return !!parent.computed;
        }
        return true;
      case "ClassProperty":
        if (parent.key === node) {
          return !!parent.computed;
        }
        return true;
      case "ClassPrivateProperty":
        return parent.key !== node;
      case "ClassDeclaration":
      case "ClassExpression":
        return parent.superClass === node;
      case "AssignmentExpression":
        return parent.right === node;
      case "AssignmentPattern":
        return parent.right === node;
      case "LabeledStatement":
        return false;
      case "CatchClause":
        return false;
      case "RestElement":
        return false;
      case "BreakStatement":
      case "ContinueStatement":
        return false;
      case "FunctionDeclaration":
      case "FunctionExpression":
        return false;
      case "ExportNamespaceSpecifier":
      case "ExportDefaultSpecifier":
        return false;
      case "ExportSpecifier":
        return parent.local === node;
      case "ImportDefaultSpecifier":
      case "ImportNamespaceSpecifier":
      case "ImportSpecifier":
        return false;
      case "ImportAttribute":
        return false;
      case "JSXAttribute":
        return false;
      case "ObjectPattern":
      case "ArrayPattern":
        return false;
      case "MetaProperty":
        return false;
      case "ObjectTypeProperty":
        return parent.key !== node;
      case "TSEnumMember":
        return parent.id !== node;
      case "TSPropertySignature":
        if (parent.key === node) {
          return !!parent.computed;
        }
        return true;
    }
    return true;
  }
  var TS_NODE_TYPES = [
    "TSAsExpression",
    "TSTypeAssertion",
    "TSNonNullExpression",
    "TSInstantiationExpression",
    "TSSatisfiesExpression"
  ];
  function unwrapTSNode(node) {
    if (TS_NODE_TYPES.includes(node.type)) {
      return unwrapTSNode(node.expression);
    } else {
      return node;
    }
  }
  var isStaticExp = (p) => p.type === 4 && p.isStatic;
  function isCoreComponent(tag) {
    switch (tag) {
      case "Teleport":
      case "teleport":
        return TELEPORT;
      case "Suspense":
      case "suspense":
        return SUSPENSE;
      case "KeepAlive":
      case "keep-alive":
        return KEEP_ALIVE;
      case "BaseTransition":
      case "base-transition":
        return BASE_TRANSITION;
    }
  }
  var nonIdentifierRE = /^\d|[^\$\w\xA0-\uFFFF]/;
  var isSimpleIdentifier = (name) => !nonIdentifierRE.test(name);
  var validFirstIdentCharRE = /[A-Za-z_$\xA0-\uFFFF]/;
  var validIdentCharRE = /[\.\?\w$\xA0-\uFFFF]/;
  var whitespaceRE = /\s+[.[]\s*|\s*[.[]\s+/g;
  var getExpSource = (exp) => exp.type === 4 ? exp.content : exp.loc.source;
  var isMemberExpressionBrowser = (exp) => {
    const path = getExpSource(exp).trim().replace(whitespaceRE, (s) => s.trim());
    let state = 0;
    let stateStack = [];
    let currentOpenBracketCount = 0;
    let currentOpenParensCount = 0;
    let currentStringType = null;
    for (let i = 0;i < path.length; i++) {
      const char = path.charAt(i);
      switch (state) {
        case 0:
          if (char === "[") {
            stateStack.push(state);
            state = 1;
            currentOpenBracketCount++;
          } else if (char === "(") {
            stateStack.push(state);
            state = 2;
            currentOpenParensCount++;
          } else if (!(i === 0 ? validFirstIdentCharRE : validIdentCharRE).test(char)) {
            return false;
          }
          break;
        case 1:
          if (char === `'` || char === `"` || char === "`") {
            stateStack.push(state);
            state = 3;
            currentStringType = char;
          } else if (char === `[`) {
            currentOpenBracketCount++;
          } else if (char === `]`) {
            if (!--currentOpenBracketCount) {
              state = stateStack.pop();
            }
          }
          break;
        case 2:
          if (char === `'` || char === `"` || char === "`") {
            stateStack.push(state);
            state = 3;
            currentStringType = char;
          } else if (char === `(`) {
            currentOpenParensCount++;
          } else if (char === `)`) {
            if (i === path.length - 1) {
              return false;
            }
            if (!--currentOpenParensCount) {
              state = stateStack.pop();
            }
          }
          break;
        case 3:
          if (char === currentStringType) {
            state = stateStack.pop();
            currentStringType = null;
          }
          break;
      }
    }
    return !currentOpenBracketCount && !currentOpenParensCount;
  };
  var isMemberExpressionNode = (exp, context) => {
    try {
      let ret = exp.ast || parser.parseExpression(getExpSource(exp), {
        plugins: context.expressionPlugins ? [...context.expressionPlugins, "typescript"] : ["typescript"]
      });
      ret = unwrapTSNode(ret);
      return ret.type === "MemberExpression" || ret.type === "OptionalMemberExpression" || ret.type === "Identifier" && ret.name !== "undefined";
    } catch (e) {
      return false;
    }
  };
  var isMemberExpression = isMemberExpressionNode;
  var fnExpRE = /^\s*(async\s*)?(\([^)]*?\)|[\w$_]+)\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/;
  var isFnExpressionBrowser = (exp) => fnExpRE.test(getExpSource(exp));
  var isFnExpressionNode = (exp, context) => {
    try {
      let ret = exp.ast || parser.parseExpression(getExpSource(exp), {
        plugins: context.expressionPlugins ? [...context.expressionPlugins, "typescript"] : ["typescript"]
      });
      if (ret.type === "Program") {
        ret = ret.body[0];
        if (ret.type === "ExpressionStatement") {
          ret = ret.expression;
        }
      }
      ret = unwrapTSNode(ret);
      return ret.type === "FunctionExpression" || ret.type === "ArrowFunctionExpression";
    } catch (e) {
      return false;
    }
  };
  var isFnExpression = isFnExpressionNode;
  function advancePositionWithClone(pos, source, numberOfCharacters = source.length) {
    return advancePositionWithMutation({
      offset: pos.offset,
      line: pos.line,
      column: pos.column
    }, source, numberOfCharacters);
  }
  function advancePositionWithMutation(pos, source, numberOfCharacters = source.length) {
    let linesCount = 0;
    let lastNewLinePos = -1;
    for (let i = 0;i < numberOfCharacters; i++) {
      if (source.charCodeAt(i) === 10) {
        linesCount++;
        lastNewLinePos = i;
      }
    }
    pos.offset += numberOfCharacters;
    pos.line += linesCount;
    pos.column = lastNewLinePos === -1 ? pos.column + numberOfCharacters : numberOfCharacters - lastNewLinePos;
    return pos;
  }
  function assert(condition, msg) {
    if (!condition) {
      throw new Error(msg || `unexpected compiler condition`);
    }
  }
  function findDir(node, name, allowEmpty = false) {
    for (let i = 0;i < node.props.length; i++) {
      const p = node.props[i];
      if (p.type === 7 && (allowEmpty || p.exp) && (shared.isString(name) ? p.name === name : name.test(p.name))) {
        return p;
      }
    }
  }
  function findProp(node, name, dynamicOnly = false, allowEmpty = false) {
    for (let i = 0;i < node.props.length; i++) {
      const p = node.props[i];
      if (p.type === 6) {
        if (dynamicOnly)
          continue;
        if (p.name === name && (p.value || allowEmpty)) {
          return p;
        }
      } else if (p.name === "bind" && (p.exp || allowEmpty) && isStaticArgOf(p.arg, name)) {
        return p;
      }
    }
  }
  function isStaticArgOf(arg, name) {
    return !!(arg && isStaticExp(arg) && arg.content === name);
  }
  function hasDynamicKeyVBind(node) {
    return node.props.some((p) => p.type === 7 && p.name === "bind" && (!p.arg || p.arg.type !== 4 || !p.arg.isStatic));
  }
  function isText$1(node) {
    return node.type === 5 || node.type === 2;
  }
  function isVSlot(p) {
    return p.type === 7 && p.name === "slot";
  }
  function isTemplateNode(node) {
    return node.type === 1 && node.tagType === 3;
  }
  function isSlotOutlet(node) {
    return node.type === 1 && node.tagType === 2;
  }
  var propsHelperSet = /* @__PURE__ */ new Set([NORMALIZE_PROPS, GUARD_REACTIVE_PROPS]);
  function getUnnormalizedProps(props, callPath = []) {
    if (props && !shared.isString(props) && props.type === 14) {
      const callee = props.callee;
      if (!shared.isString(callee) && propsHelperSet.has(callee)) {
        return getUnnormalizedProps(props.arguments[0], callPath.concat(props));
      }
    }
    return [props, callPath];
  }
  function injectProp(node, prop, context) {
    let propsWithInjection;
    let props = node.type === 13 ? node.props : node.arguments[2];
    let callPath = [];
    let parentCall;
    if (props && !shared.isString(props) && props.type === 14) {
      const ret = getUnnormalizedProps(props);
      props = ret[0];
      callPath = ret[1];
      parentCall = callPath[callPath.length - 1];
    }
    if (props == null || shared.isString(props)) {
      propsWithInjection = createObjectExpression([prop]);
    } else if (props.type === 14) {
      const first = props.arguments[0];
      if (!shared.isString(first) && first.type === 15) {
        if (!hasProp(prop, first)) {
          first.properties.unshift(prop);
        }
      } else {
        if (props.callee === TO_HANDLERS) {
          propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
            createObjectExpression([prop]),
            props
          ]);
        } else {
          props.arguments.unshift(createObjectExpression([prop]));
        }
      }
      !propsWithInjection && (propsWithInjection = props);
    } else if (props.type === 15) {
      if (!hasProp(prop, props)) {
        props.properties.unshift(prop);
      }
      propsWithInjection = props;
    } else {
      propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
        createObjectExpression([prop]),
        props
      ]);
      if (parentCall && parentCall.callee === GUARD_REACTIVE_PROPS) {
        parentCall = callPath[callPath.length - 2];
      }
    }
    if (node.type === 13) {
      if (parentCall) {
        parentCall.arguments[0] = propsWithInjection;
      } else {
        node.props = propsWithInjection;
      }
    } else {
      if (parentCall) {
        parentCall.arguments[0] = propsWithInjection;
      } else {
        node.arguments[2] = propsWithInjection;
      }
    }
  }
  function hasProp(prop, props) {
    let result = false;
    if (prop.key.type === 4) {
      const propKeyName = prop.key.content;
      result = props.properties.some((p) => p.key.type === 4 && p.key.content === propKeyName);
    }
    return result;
  }
  function toValidAssetId(name, type) {
    return `_${type}_${name.replace(/[^\w]/g, (searchValue, replaceValue) => {
      return searchValue === "-" ? "_" : name.charCodeAt(replaceValue).toString();
    })}`;
  }
  function hasScopeRef(node, ids) {
    if (!node || Object.keys(ids).length === 0) {
      return false;
    }
    switch (node.type) {
      case 1:
        for (let i = 0;i < node.props.length; i++) {
          const p = node.props[i];
          if (p.type === 7 && (hasScopeRef(p.arg, ids) || hasScopeRef(p.exp, ids))) {
            return true;
          }
        }
        return node.children.some((c) => hasScopeRef(c, ids));
      case 11:
        if (hasScopeRef(node.source, ids)) {
          return true;
        }
        return node.children.some((c) => hasScopeRef(c, ids));
      case 9:
        return node.branches.some((b) => hasScopeRef(b, ids));
      case 10:
        if (hasScopeRef(node.condition, ids)) {
          return true;
        }
        return node.children.some((c) => hasScopeRef(c, ids));
      case 4:
        return !node.isStatic && isSimpleIdentifier(node.content) && !!ids[node.content];
      case 8:
        return node.children.some((c) => shared.isObject(c) && hasScopeRef(c, ids));
      case 5:
      case 12:
        return hasScopeRef(node.content, ids);
      case 2:
      case 3:
      case 20:
        return false;
      default:
        return false;
    }
  }
  function getMemoedVNodeCall(node) {
    if (node.type === 14 && node.callee === WITH_MEMO) {
      return node.arguments[1].returns;
    } else {
      return node;
    }
  }
  var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
  var defaultParserOptions = {
    parseMode: "base",
    ns: 0,
    delimiters: [`{{`, `}}`],
    getNamespace: () => 0,
    isVoidTag: shared.NO,
    isPreTag: shared.NO,
    isIgnoreNewlineTag: shared.NO,
    isCustomElement: shared.NO,
    onError: defaultOnError,
    onWarn: defaultOnWarn,
    comments: true,
    prefixIdentifiers: false
  };
  var currentOptions = defaultParserOptions;
  var currentRoot = null;
  var currentInput = "";
  var currentOpenTag = null;
  var currentProp = null;
  var currentAttrValue = "";
  var currentAttrStartIndex = -1;
  var currentAttrEndIndex = -1;
  var inPre = 0;
  var inVPre = false;
  var currentVPreBoundary = null;
  var stack = [];
  var tokenizer = new Tokenizer(stack, {
    onerr: emitError,
    ontext(start, end) {
      onText(getSlice(start, end), start, end);
    },
    ontextentity(char, start, end) {
      onText(char, start, end);
    },
    oninterpolation(start, end) {
      if (inVPre) {
        return onText(getSlice(start, end), start, end);
      }
      let innerStart = start + tokenizer.delimiterOpen.length;
      let innerEnd = end - tokenizer.delimiterClose.length;
      while (isWhitespace(currentInput.charCodeAt(innerStart))) {
        innerStart++;
      }
      while (isWhitespace(currentInput.charCodeAt(innerEnd - 1))) {
        innerEnd--;
      }
      let exp = getSlice(innerStart, innerEnd);
      if (exp.includes("&")) {
        {
          exp = decode_js.decodeHTML(exp);
        }
      }
      addNode({
        type: 5,
        content: createExp(exp, false, getLoc(innerStart, innerEnd)),
        loc: getLoc(start, end)
      });
    },
    onopentagname(start, end) {
      const name = getSlice(start, end);
      currentOpenTag = {
        type: 1,
        tag: name,
        ns: currentOptions.getNamespace(name, stack[0], currentOptions.ns),
        tagType: 0,
        props: [],
        children: [],
        loc: getLoc(start - 1, end),
        codegenNode: undefined
      };
    },
    onopentagend(end) {
      endOpenTag(end);
    },
    onclosetag(start, end) {
      const name = getSlice(start, end);
      if (!currentOptions.isVoidTag(name)) {
        let found = false;
        for (let i = 0;i < stack.length; i++) {
          const e = stack[i];
          if (e.tag.toLowerCase() === name.toLowerCase()) {
            found = true;
            if (i > 0) {
              emitError(24, stack[0].loc.start.offset);
            }
            for (let j = 0;j <= i; j++) {
              const el = stack.shift();
              onCloseTag(el, end, j < i);
            }
            break;
          }
        }
        if (!found) {
          emitError(23, backTrack(start, 60));
        }
      }
    },
    onselfclosingtag(end) {
      const name = currentOpenTag.tag;
      currentOpenTag.isSelfClosing = true;
      endOpenTag(end);
      if (stack[0] && stack[0].tag === name) {
        onCloseTag(stack.shift(), end);
      }
    },
    onattribname(start, end) {
      currentProp = {
        type: 6,
        name: getSlice(start, end),
        nameLoc: getLoc(start, end),
        value: undefined,
        loc: getLoc(start)
      };
    },
    ondirname(start, end) {
      const raw = getSlice(start, end);
      const name = raw === "." || raw === ":" ? "bind" : raw === "@" ? "on" : raw === "#" ? "slot" : raw.slice(2);
      if (!inVPre && name === "") {
        emitError(26, start);
      }
      if (inVPre || name === "") {
        currentProp = {
          type: 6,
          name: raw,
          nameLoc: getLoc(start, end),
          value: undefined,
          loc: getLoc(start)
        };
      } else {
        currentProp = {
          type: 7,
          name,
          rawName: raw,
          exp: undefined,
          arg: undefined,
          modifiers: raw === "." ? [createSimpleExpression("prop")] : [],
          loc: getLoc(start)
        };
        if (name === "pre") {
          inVPre = tokenizer.inVPre = true;
          currentVPreBoundary = currentOpenTag;
          const props = currentOpenTag.props;
          for (let i = 0;i < props.length; i++) {
            if (props[i].type === 7) {
              props[i] = dirToAttr(props[i]);
            }
          }
        }
      }
    },
    ondirarg(start, end) {
      if (start === end)
        return;
      const arg = getSlice(start, end);
      if (inVPre) {
        currentProp.name += arg;
        setLocEnd(currentProp.nameLoc, end);
      } else {
        const isStatic = arg[0] !== `[`;
        currentProp.arg = createExp(isStatic ? arg : arg.slice(1, -1), isStatic, getLoc(start, end), isStatic ? 3 : 0);
      }
    },
    ondirmodifier(start, end) {
      const mod = getSlice(start, end);
      if (inVPre) {
        currentProp.name += "." + mod;
        setLocEnd(currentProp.nameLoc, end);
      } else if (currentProp.name === "slot") {
        const arg = currentProp.arg;
        if (arg) {
          arg.content += "." + mod;
          setLocEnd(arg.loc, end);
        }
      } else {
        const exp = createSimpleExpression(mod, true, getLoc(start, end));
        currentProp.modifiers.push(exp);
      }
    },
    onattribdata(start, end) {
      currentAttrValue += getSlice(start, end);
      if (currentAttrStartIndex < 0)
        currentAttrStartIndex = start;
      currentAttrEndIndex = end;
    },
    onattribentity(char, start, end) {
      currentAttrValue += char;
      if (currentAttrStartIndex < 0)
        currentAttrStartIndex = start;
      currentAttrEndIndex = end;
    },
    onattribnameend(end) {
      const start = currentProp.loc.start.offset;
      const name = getSlice(start, end);
      if (currentProp.type === 7) {
        currentProp.rawName = name;
      }
      if (currentOpenTag.props.some((p) => (p.type === 7 ? p.rawName : p.name) === name)) {
        emitError(2, start);
      }
    },
    onattribend(quote, end) {
      if (currentOpenTag && currentProp) {
        setLocEnd(currentProp.loc, end);
        if (quote !== 0) {
          if (currentProp.type === 6) {
            if (currentProp.name === "class") {
              currentAttrValue = condense(currentAttrValue).trim();
            }
            if (quote === 1 && !currentAttrValue) {
              emitError(13, end);
            }
            currentProp.value = {
              type: 2,
              content: currentAttrValue,
              loc: quote === 1 ? getLoc(currentAttrStartIndex, currentAttrEndIndex) : getLoc(currentAttrStartIndex - 1, currentAttrEndIndex + 1)
            };
            if (tokenizer.inSFCRoot && currentOpenTag.tag === "template" && currentProp.name === "lang" && currentAttrValue && currentAttrValue !== "html") {
              tokenizer.enterRCDATA(toCharCodes(`</template`), 0);
            }
          } else {
            let expParseMode = 0;
            {
              if (currentProp.name === "for") {
                expParseMode = 3;
              } else if (currentProp.name === "slot") {
                expParseMode = 1;
              } else if (currentProp.name === "on" && currentAttrValue.includes(";")) {
                expParseMode = 2;
              }
            }
            currentProp.exp = createExp(currentAttrValue, false, getLoc(currentAttrStartIndex, currentAttrEndIndex), 0, expParseMode);
            if (currentProp.name === "for") {
              currentProp.forParseResult = parseForExpression(currentProp.exp);
            }
            let syncIndex = -1;
            if (currentProp.name === "bind" && (syncIndex = currentProp.modifiers.findIndex((mod) => mod.content === "sync")) > -1 && checkCompatEnabled("COMPILER_V_BIND_SYNC", currentOptions, currentProp.loc, currentProp.arg.loc.source)) {
              currentProp.name = "model";
              currentProp.modifiers.splice(syncIndex, 1);
            }
          }
        }
        if (currentProp.type !== 7 || currentProp.name !== "pre") {
          currentOpenTag.props.push(currentProp);
        }
      }
      currentAttrValue = "";
      currentAttrStartIndex = currentAttrEndIndex = -1;
    },
    oncomment(start, end) {
      if (currentOptions.comments) {
        addNode({
          type: 3,
          content: getSlice(start, end),
          loc: getLoc(start - 4, end + 3)
        });
      }
    },
    onend() {
      const end = currentInput.length;
      if (tokenizer.state !== 1) {
        switch (tokenizer.state) {
          case 5:
          case 8:
            emitError(5, end);
            break;
          case 3:
          case 4:
            emitError(25, tokenizer.sectionStart);
            break;
          case 28:
            if (tokenizer.currentSequence === Sequences.CdataEnd) {
              emitError(6, end);
            } else {
              emitError(7, end);
            }
            break;
          case 6:
          case 7:
          case 9:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
          case 21:
            emitError(9, end);
            break;
        }
      }
      for (let index = 0;index < stack.length; index++) {
        onCloseTag(stack[index], end - 1);
        emitError(24, stack[index].loc.start.offset);
      }
    },
    oncdata(start, end) {
      if (stack[0].ns !== 0) {
        onText(getSlice(start, end), start, end);
      } else {
        emitError(1, start - 9);
      }
    },
    onprocessinginstruction(start) {
      if ((stack[0] ? stack[0].ns : currentOptions.ns) === 0) {
        emitError(21, start - 1);
      }
    }
  });
  var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  var stripParensRE = /^\(|\)$/g;
  function parseForExpression(input) {
    const loc = input.loc;
    const exp = input.content;
    const inMatch = exp.match(forAliasRE);
    if (!inMatch)
      return;
    const [, LHS, RHS] = inMatch;
    const createAliasExpression = (content, offset, asParam = false) => {
      const start = loc.start.offset + offset;
      const end = start + content.length;
      return createExp(content, false, getLoc(start, end), 0, asParam ? 1 : 0);
    };
    const result = {
      source: createAliasExpression(RHS.trim(), exp.indexOf(RHS, LHS.length)),
      value: undefined,
      key: undefined,
      index: undefined,
      finalized: false
    };
    let valueContent = LHS.trim().replace(stripParensRE, "").trim();
    const trimmedOffset = LHS.indexOf(valueContent);
    const iteratorMatch = valueContent.match(forIteratorRE);
    if (iteratorMatch) {
      valueContent = valueContent.replace(forIteratorRE, "").trim();
      const keyContent = iteratorMatch[1].trim();
      let keyOffset;
      if (keyContent) {
        keyOffset = exp.indexOf(keyContent, trimmedOffset + valueContent.length);
        result.key = createAliasExpression(keyContent, keyOffset, true);
      }
      if (iteratorMatch[2]) {
        const indexContent = iteratorMatch[2].trim();
        if (indexContent) {
          result.index = createAliasExpression(indexContent, exp.indexOf(indexContent, result.key ? keyOffset + keyContent.length : trimmedOffset + valueContent.length), true);
        }
      }
    }
    if (valueContent) {
      result.value = createAliasExpression(valueContent, trimmedOffset, true);
    }
    return result;
  }
  function getSlice(start, end) {
    return currentInput.slice(start, end);
  }
  function endOpenTag(end) {
    if (tokenizer.inSFCRoot) {
      currentOpenTag.innerLoc = getLoc(end + 1, end + 1);
    }
    addNode(currentOpenTag);
    const { tag, ns } = currentOpenTag;
    if (ns === 0 && currentOptions.isPreTag(tag)) {
      inPre++;
    }
    if (currentOptions.isVoidTag(tag)) {
      onCloseTag(currentOpenTag, end);
    } else {
      stack.unshift(currentOpenTag);
      if (ns === 1 || ns === 2) {
        tokenizer.inXML = true;
      }
    }
    currentOpenTag = null;
  }
  function onText(content, start, end) {
    const parent = stack[0] || currentRoot;
    const lastNode = parent.children[parent.children.length - 1];
    if (lastNode && lastNode.type === 2) {
      lastNode.content += content;
      setLocEnd(lastNode.loc, end);
    } else {
      parent.children.push({
        type: 2,
        content,
        loc: getLoc(start, end)
      });
    }
  }
  function onCloseTag(el, end, isImplied = false) {
    if (isImplied) {
      setLocEnd(el.loc, backTrack(end, 60));
    } else {
      setLocEnd(el.loc, lookAhead(end, 62) + 1);
    }
    if (tokenizer.inSFCRoot) {
      if (el.children.length) {
        el.innerLoc.end = shared.extend({}, el.children[el.children.length - 1].loc.end);
      } else {
        el.innerLoc.end = shared.extend({}, el.innerLoc.start);
      }
      el.innerLoc.source = getSlice(el.innerLoc.start.offset, el.innerLoc.end.offset);
    }
    const { tag, ns, children } = el;
    if (!inVPre) {
      if (tag === "slot") {
        el.tagType = 2;
      } else if (isFragmentTemplate(el)) {
        el.tagType = 3;
      } else if (isComponent(el)) {
        el.tagType = 1;
      }
    }
    if (!tokenizer.inRCDATA) {
      el.children = condenseWhitespace(children);
    }
    if (ns === 0 && currentOptions.isIgnoreNewlineTag(tag)) {
      const first = children[0];
      if (first && first.type === 2) {
        first.content = first.content.replace(/^\r?\n/, "");
      }
    }
    if (ns === 0 && currentOptions.isPreTag(tag)) {
      inPre--;
    }
    if (currentVPreBoundary === el) {
      inVPre = tokenizer.inVPre = false;
      currentVPreBoundary = null;
    }
    if (tokenizer.inXML && (stack[0] ? stack[0].ns : currentOptions.ns) === 0) {
      tokenizer.inXML = false;
    }
    {
      const props = el.props;
      if (isCompatEnabled("COMPILER_V_IF_V_FOR_PRECEDENCE", currentOptions)) {
        let hasIf = false;
        let hasFor = false;
        for (let i = 0;i < props.length; i++) {
          const p = props[i];
          if (p.type === 7) {
            if (p.name === "if") {
              hasIf = true;
            } else if (p.name === "for") {
              hasFor = true;
            }
          }
          if (hasIf && hasFor) {
            warnDeprecation("COMPILER_V_IF_V_FOR_PRECEDENCE", currentOptions, el.loc);
            break;
          }
        }
      }
      if (!tokenizer.inSFCRoot && isCompatEnabled("COMPILER_NATIVE_TEMPLATE", currentOptions) && el.tag === "template" && !isFragmentTemplate(el)) {
        warnDeprecation("COMPILER_NATIVE_TEMPLATE", currentOptions, el.loc);
        const parent = stack[0] || currentRoot;
        const index = parent.children.indexOf(el);
        parent.children.splice(index, 1, ...el.children);
      }
      const inlineTemplateProp = props.find((p) => p.type === 6 && p.name === "inline-template");
      if (inlineTemplateProp && checkCompatEnabled("COMPILER_INLINE_TEMPLATE", currentOptions, inlineTemplateProp.loc) && el.children.length) {
        inlineTemplateProp.value = {
          type: 2,
          content: getSlice(el.children[0].loc.start.offset, el.children[el.children.length - 1].loc.end.offset),
          loc: inlineTemplateProp.loc
        };
      }
    }
  }
  function lookAhead(index, c) {
    let i = index;
    while (currentInput.charCodeAt(i) !== c && i < currentInput.length - 1)
      i++;
    return i;
  }
  function backTrack(index, c) {
    let i = index;
    while (currentInput.charCodeAt(i) !== c && i >= 0)
      i--;
    return i;
  }
  var specialTemplateDir = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]);
  function isFragmentTemplate({ tag, props }) {
    if (tag === "template") {
      for (let i = 0;i < props.length; i++) {
        if (props[i].type === 7 && specialTemplateDir.has(props[i].name)) {
          return true;
        }
      }
    }
    return false;
  }
  function isComponent({ tag, props }) {
    if (currentOptions.isCustomElement(tag)) {
      return false;
    }
    if (tag === "component" || isUpperCase(tag.charCodeAt(0)) || isCoreComponent(tag) || currentOptions.isBuiltInComponent && currentOptions.isBuiltInComponent(tag) || currentOptions.isNativeTag && !currentOptions.isNativeTag(tag)) {
      return true;
    }
    for (let i = 0;i < props.length; i++) {
      const p = props[i];
      if (p.type === 6) {
        if (p.name === "is" && p.value) {
          if (p.value.content.startsWith("vue:")) {
            return true;
          } else if (checkCompatEnabled("COMPILER_IS_ON_ELEMENT", currentOptions, p.loc)) {
            return true;
          }
        }
      } else if (p.name === "bind" && isStaticArgOf(p.arg, "is") && checkCompatEnabled("COMPILER_IS_ON_ELEMENT", currentOptions, p.loc)) {
        return true;
      }
    }
    return false;
  }
  function isUpperCase(c) {
    return c > 64 && c < 91;
  }
  var windowsNewlineRE = /\r\n/g;
  function condenseWhitespace(nodes, tag) {
    const shouldCondense = currentOptions.whitespace !== "preserve";
    let removedWhitespace = false;
    for (let i = 0;i < nodes.length; i++) {
      const node = nodes[i];
      if (node.type === 2) {
        if (!inPre) {
          if (isAllWhitespace(node.content)) {
            const prev = nodes[i - 1] && nodes[i - 1].type;
            const next = nodes[i + 1] && nodes[i + 1].type;
            if (!prev || !next || shouldCondense && (prev === 3 && (next === 3 || next === 1) || prev === 1 && (next === 3 || next === 1 && hasNewlineChar(node.content)))) {
              removedWhitespace = true;
              nodes[i] = null;
            } else {
              node.content = " ";
            }
          } else if (shouldCondense) {
            node.content = condense(node.content);
          }
        } else {
          node.content = node.content.replace(windowsNewlineRE, `
`);
        }
      }
    }
    return removedWhitespace ? nodes.filter(Boolean) : nodes;
  }
  function isAllWhitespace(str) {
    for (let i = 0;i < str.length; i++) {
      if (!isWhitespace(str.charCodeAt(i))) {
        return false;
      }
    }
    return true;
  }
  function hasNewlineChar(str) {
    for (let i = 0;i < str.length; i++) {
      const c = str.charCodeAt(i);
      if (c === 10 || c === 13) {
        return true;
      }
    }
    return false;
  }
  function condense(str) {
    let ret = "";
    let prevCharIsWhitespace = false;
    for (let i = 0;i < str.length; i++) {
      if (isWhitespace(str.charCodeAt(i))) {
        if (!prevCharIsWhitespace) {
          ret += " ";
          prevCharIsWhitespace = true;
        }
      } else {
        ret += str[i];
        prevCharIsWhitespace = false;
      }
    }
    return ret;
  }
  function addNode(node) {
    (stack[0] || currentRoot).children.push(node);
  }
  function getLoc(start, end) {
    return {
      start: tokenizer.getPos(start),
      end: end == null ? end : tokenizer.getPos(end),
      source: end == null ? end : getSlice(start, end)
    };
  }
  function cloneLoc(loc) {
    return getLoc(loc.start.offset, loc.end.offset);
  }
  function setLocEnd(loc, end) {
    loc.end = tokenizer.getPos(end);
    loc.source = getSlice(loc.start.offset, end);
  }
  function dirToAttr(dir) {
    const attr = {
      type: 6,
      name: dir.rawName,
      nameLoc: getLoc(dir.loc.start.offset, dir.loc.start.offset + dir.rawName.length),
      value: undefined,
      loc: dir.loc
    };
    if (dir.exp) {
      const loc = dir.exp.loc;
      if (loc.end.offset < dir.loc.end.offset) {
        loc.start.offset--;
        loc.start.column--;
        loc.end.offset++;
        loc.end.column++;
      }
      attr.value = {
        type: 2,
        content: dir.exp.content,
        loc
      };
    }
    return attr;
  }
  function createExp(content, isStatic = false, loc, constType = 0, parseMode = 0) {
    const exp = createSimpleExpression(content, isStatic, loc, constType);
    if (!isStatic && currentOptions.prefixIdentifiers && parseMode !== 3 && content.trim()) {
      if (isSimpleIdentifier(content)) {
        exp.ast = null;
        return exp;
      }
      try {
        const plugins = currentOptions.expressionPlugins;
        const options = {
          plugins: plugins ? [...plugins, "typescript"] : ["typescript"]
        };
        if (parseMode === 2) {
          exp.ast = parser.parse(` ${content} `, options).program;
        } else if (parseMode === 1) {
          exp.ast = parser.parseExpression(`(${content})=>{}`, options);
        } else {
          exp.ast = parser.parseExpression(`(${content})`, options);
        }
      } catch (e) {
        exp.ast = false;
        emitError(45, loc.start.offset, e.message);
      }
    }
    return exp;
  }
  function emitError(code, index, message) {
    currentOptions.onError(createCompilerError(code, getLoc(index, index), undefined, message));
  }
  function reset() {
    tokenizer.reset();
    currentOpenTag = null;
    currentProp = null;
    currentAttrValue = "";
    currentAttrStartIndex = -1;
    currentAttrEndIndex = -1;
    stack.length = 0;
  }
  function baseParse(input, options) {
    reset();
    currentInput = input;
    currentOptions = shared.extend({}, defaultParserOptions);
    if (options) {
      let key;
      for (key in options) {
        if (options[key] != null) {
          currentOptions[key] = options[key];
        }
      }
    }
    {
      if (currentOptions.decodeEntities) {
        console.warn(`[@vue/compiler-core] decodeEntities option is passed but will be ignored in non-browser builds.`);
      }
    }
    tokenizer.mode = currentOptions.parseMode === "html" ? 1 : currentOptions.parseMode === "sfc" ? 2 : 0;
    tokenizer.inXML = currentOptions.ns === 1 || currentOptions.ns === 2;
    const delimiters = options && options.delimiters;
    if (delimiters) {
      tokenizer.delimiterOpen = toCharCodes(delimiters[0]);
      tokenizer.delimiterClose = toCharCodes(delimiters[1]);
    }
    const root = currentRoot = createRoot([], input);
    tokenizer.parse(currentInput);
    root.loc = getLoc(0, input.length);
    root.children = condenseWhitespace(root.children);
    currentRoot = null;
    return root;
  }
  function cacheStatic(root, context) {
    walk(root, undefined, context, isSingleElementRoot(root, root.children[0]));
  }
  function isSingleElementRoot(root, child) {
    const { children } = root;
    return children.length === 1 && child.type === 1 && !isSlotOutlet(child);
  }
  function walk(node, parent, context, doNotHoistNode = false, inFor = false) {
    const { children } = node;
    const toCache = [];
    for (let i = 0;i < children.length; i++) {
      const child = children[i];
      if (child.type === 1 && child.tagType === 0) {
        const constantType = doNotHoistNode ? 0 : getConstantType(child, context);
        if (constantType > 0) {
          if (constantType >= 2) {
            child.codegenNode.patchFlag = -1;
            toCache.push(child);
            continue;
          }
        } else {
          const codegenNode = child.codegenNode;
          if (codegenNode.type === 13) {
            const flag = codegenNode.patchFlag;
            if ((flag === undefined || flag === 512 || flag === 1) && getGeneratedPropsConstantType(child, context) >= 2) {
              const props = getNodeProps(child);
              if (props) {
                codegenNode.props = context.hoist(props);
              }
            }
            if (codegenNode.dynamicProps) {
              codegenNode.dynamicProps = context.hoist(codegenNode.dynamicProps);
            }
          }
        }
      } else if (child.type === 12) {
        const constantType = doNotHoistNode ? 0 : getConstantType(child, context);
        if (constantType >= 2) {
          toCache.push(child);
          continue;
        }
      }
      if (child.type === 1) {
        const isComponent2 = child.tagType === 1;
        if (isComponent2) {
          context.scopes.vSlot++;
        }
        walk(child, node, context, false, inFor);
        if (isComponent2) {
          context.scopes.vSlot--;
        }
      } else if (child.type === 11) {
        walk(child, node, context, child.children.length === 1, true);
      } else if (child.type === 9) {
        for (let i2 = 0;i2 < child.branches.length; i2++) {
          walk(child.branches[i2], node, context, child.branches[i2].children.length === 1, inFor);
        }
      }
    }
    let cachedAsArray = false;
    const slotCacheKeys = [];
    if (toCache.length === children.length && node.type === 1) {
      if (node.tagType === 0 && node.codegenNode && node.codegenNode.type === 13 && shared.isArray(node.codegenNode.children)) {
        node.codegenNode.children = getCacheExpression(createArrayExpression(node.codegenNode.children));
        cachedAsArray = true;
      } else if (node.tagType === 1 && node.codegenNode && node.codegenNode.type === 13 && node.codegenNode.children && !shared.isArray(node.codegenNode.children) && node.codegenNode.children.type === 15) {
        const slot = getSlotNode(node.codegenNode, "default");
        if (slot) {
          slotCacheKeys.push(context.cached.length);
          slot.returns = getCacheExpression(createArrayExpression(slot.returns));
          cachedAsArray = true;
        }
      } else if (node.tagType === 3 && parent && parent.type === 1 && parent.tagType === 1 && parent.codegenNode && parent.codegenNode.type === 13 && parent.codegenNode.children && !shared.isArray(parent.codegenNode.children) && parent.codegenNode.children.type === 15) {
        const slotName = findDir(node, "slot", true);
        const slot = slotName && slotName.arg && getSlotNode(parent.codegenNode, slotName.arg);
        if (slot) {
          slotCacheKeys.push(context.cached.length);
          slot.returns = getCacheExpression(createArrayExpression(slot.returns));
          cachedAsArray = true;
        }
      }
    }
    if (!cachedAsArray) {
      for (const child of toCache) {
        slotCacheKeys.push(context.cached.length);
        child.codegenNode = context.cache(child.codegenNode);
      }
    }
    if (slotCacheKeys.length && node.type === 1 && node.tagType === 1 && node.codegenNode && node.codegenNode.type === 13 && node.codegenNode.children && !shared.isArray(node.codegenNode.children) && node.codegenNode.children.type === 15) {
      node.codegenNode.children.properties.push(createObjectProperty(`__`, createSimpleExpression(JSON.stringify(slotCacheKeys), false)));
    }
    function getCacheExpression(value) {
      const exp = context.cache(value);
      if (inFor && context.hmr) {
        exp.needArraySpread = true;
      }
      return exp;
    }
    function getSlotNode(node2, name) {
      if (node2.children && !shared.isArray(node2.children) && node2.children.type === 15) {
        const slot = node2.children.properties.find((p) => p.key === name || p.key.content === name);
        return slot && slot.value;
      }
    }
    if (toCache.length && context.transformHoist) {
      context.transformHoist(children, context, node);
    }
  }
  function getConstantType(node, context) {
    const { constantCache } = context;
    switch (node.type) {
      case 1:
        if (node.tagType !== 0) {
          return 0;
        }
        const cached = constantCache.get(node);
        if (cached !== undefined) {
          return cached;
        }
        const codegenNode = node.codegenNode;
        if (codegenNode.type !== 13) {
          return 0;
        }
        if (codegenNode.isBlock && node.tag !== "svg" && node.tag !== "foreignObject" && node.tag !== "math") {
          return 0;
        }
        if (codegenNode.patchFlag === undefined) {
          let returnType2 = 3;
          const generatedPropsType = getGeneratedPropsConstantType(node, context);
          if (generatedPropsType === 0) {
            constantCache.set(node, 0);
            return 0;
          }
          if (generatedPropsType < returnType2) {
            returnType2 = generatedPropsType;
          }
          for (let i = 0;i < node.children.length; i++) {
            const childType = getConstantType(node.children[i], context);
            if (childType === 0) {
              constantCache.set(node, 0);
              return 0;
            }
            if (childType < returnType2) {
              returnType2 = childType;
            }
          }
          if (returnType2 > 1) {
            for (let i = 0;i < node.props.length; i++) {
              const p = node.props[i];
              if (p.type === 7 && p.name === "bind" && p.exp) {
                const expType = getConstantType(p.exp, context);
                if (expType === 0) {
                  constantCache.set(node, 0);
                  return 0;
                }
                if (expType < returnType2) {
                  returnType2 = expType;
                }
              }
            }
          }
          if (codegenNode.isBlock) {
            for (let i = 0;i < node.props.length; i++) {
              const p = node.props[i];
              if (p.type === 7) {
                constantCache.set(node, 0);
                return 0;
              }
            }
            context.removeHelper(OPEN_BLOCK);
            context.removeHelper(getVNodeBlockHelper(context.inSSR, codegenNode.isComponent));
            codegenNode.isBlock = false;
            context.helper(getVNodeHelper(context.inSSR, codegenNode.isComponent));
          }
          constantCache.set(node, returnType2);
          return returnType2;
        } else {
          constantCache.set(node, 0);
          return 0;
        }
      case 2:
      case 3:
        return 3;
      case 9:
      case 11:
      case 10:
        return 0;
      case 5:
      case 12:
        return getConstantType(node.content, context);
      case 4:
        return node.constType;
      case 8:
        let returnType = 3;
        for (let i = 0;i < node.children.length; i++) {
          const child = node.children[i];
          if (shared.isString(child) || shared.isSymbol(child)) {
            continue;
          }
          const childType = getConstantType(child, context);
          if (childType === 0) {
            return 0;
          } else if (childType < returnType) {
            returnType = childType;
          }
        }
        return returnType;
      case 20:
        return 2;
      default:
        return 0;
    }
  }
  var allowHoistedHelperSet = /* @__PURE__ */ new Set([
    NORMALIZE_CLASS,
    NORMALIZE_STYLE,
    NORMALIZE_PROPS,
    GUARD_REACTIVE_PROPS
  ]);
  function getConstantTypeOfHelperCall(value, context) {
    if (value.type === 14 && !shared.isString(value.callee) && allowHoistedHelperSet.has(value.callee)) {
      const arg = value.arguments[0];
      if (arg.type === 4) {
        return getConstantType(arg, context);
      } else if (arg.type === 14) {
        return getConstantTypeOfHelperCall(arg, context);
      }
    }
    return 0;
  }
  function getGeneratedPropsConstantType(node, context) {
    let returnType = 3;
    const props = getNodeProps(node);
    if (props && props.type === 15) {
      const { properties } = props;
      for (let i = 0;i < properties.length; i++) {
        const { key, value } = properties[i];
        const keyType = getConstantType(key, context);
        if (keyType === 0) {
          return keyType;
        }
        if (keyType < returnType) {
          returnType = keyType;
        }
        let valueType;
        if (value.type === 4) {
          valueType = getConstantType(value, context);
        } else if (value.type === 14) {
          valueType = getConstantTypeOfHelperCall(value, context);
        } else {
          valueType = 0;
        }
        if (valueType === 0) {
          return valueType;
        }
        if (valueType < returnType) {
          returnType = valueType;
        }
      }
    }
    return returnType;
  }
  function getNodeProps(node) {
    const codegenNode = node.codegenNode;
    if (codegenNode.type === 13) {
      return codegenNode.props;
    }
  }
  function createTransformContext(root, {
    filename = "",
    prefixIdentifiers = false,
    hoistStatic = false,
    hmr = false,
    cacheHandlers = false,
    nodeTransforms = [],
    directiveTransforms = {},
    transformHoist = null,
    isBuiltInComponent = shared.NOOP,
    isCustomElement = shared.NOOP,
    expressionPlugins = [],
    scopeId = null,
    slotted = true,
    ssr = false,
    inSSR = false,
    ssrCssVars = ``,
    bindingMetadata = shared.EMPTY_OBJ,
    inline = false,
    isTS = false,
    onError = defaultOnError,
    onWarn = defaultOnWarn,
    compatConfig
  }) {
    const nameMatch = filename.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/);
    const context = {
      filename,
      selfName: nameMatch && shared.capitalize(shared.camelize(nameMatch[1])),
      prefixIdentifiers,
      hoistStatic,
      hmr,
      cacheHandlers,
      nodeTransforms,
      directiveTransforms,
      transformHoist,
      isBuiltInComponent,
      isCustomElement,
      expressionPlugins,
      scopeId,
      slotted,
      ssr,
      inSSR,
      ssrCssVars,
      bindingMetadata,
      inline,
      isTS,
      onError,
      onWarn,
      compatConfig,
      root,
      helpers: /* @__PURE__ */ new Map,
      components: /* @__PURE__ */ new Set,
      directives: /* @__PURE__ */ new Set,
      hoists: [],
      imports: [],
      cached: [],
      constantCache: /* @__PURE__ */ new WeakMap,
      temps: 0,
      identifiers: /* @__PURE__ */ Object.create(null),
      scopes: {
        vFor: 0,
        vSlot: 0,
        vPre: 0,
        vOnce: 0
      },
      parent: null,
      grandParent: null,
      currentNode: root,
      childIndex: 0,
      inVOnce: false,
      helper(name) {
        const count = context.helpers.get(name) || 0;
        context.helpers.set(name, count + 1);
        return name;
      },
      removeHelper(name) {
        const count = context.helpers.get(name);
        if (count) {
          const currentCount = count - 1;
          if (!currentCount) {
            context.helpers.delete(name);
          } else {
            context.helpers.set(name, currentCount);
          }
        }
      },
      helperString(name) {
        return `_${helperNameMap[context.helper(name)]}`;
      },
      replaceNode(node) {
        {
          if (!context.currentNode) {
            throw new Error(`Node being replaced is already removed.`);
          }
          if (!context.parent) {
            throw new Error(`Cannot replace root node.`);
          }
        }
        context.parent.children[context.childIndex] = context.currentNode = node;
      },
      removeNode(node) {
        if (!context.parent) {
          throw new Error(`Cannot remove root node.`);
        }
        const list = context.parent.children;
        const removalIndex = node ? list.indexOf(node) : context.currentNode ? context.childIndex : -1;
        if (removalIndex < 0) {
          throw new Error(`node being removed is not a child of current parent`);
        }
        if (!node || node === context.currentNode) {
          context.currentNode = null;
          context.onNodeRemoved();
        } else {
          if (context.childIndex > removalIndex) {
            context.childIndex--;
            context.onNodeRemoved();
          }
        }
        context.parent.children.splice(removalIndex, 1);
      },
      onNodeRemoved: shared.NOOP,
      addIdentifiers(exp) {
        {
          if (shared.isString(exp)) {
            addId(exp);
          } else if (exp.identifiers) {
            exp.identifiers.forEach(addId);
          } else if (exp.type === 4) {
            addId(exp.content);
          }
        }
      },
      removeIdentifiers(exp) {
        {
          if (shared.isString(exp)) {
            removeId(exp);
          } else if (exp.identifiers) {
            exp.identifiers.forEach(removeId);
          } else if (exp.type === 4) {
            removeId(exp.content);
          }
        }
      },
      hoist(exp) {
        if (shared.isString(exp))
          exp = createSimpleExpression(exp);
        context.hoists.push(exp);
        const identifier = createSimpleExpression(`_hoisted_${context.hoists.length}`, false, exp.loc, 2);
        identifier.hoisted = exp;
        return identifier;
      },
      cache(exp, isVNode = false, inVOnce = false) {
        const cacheExp = createCacheExpression(context.cached.length, exp, isVNode, inVOnce);
        context.cached.push(cacheExp);
        return cacheExp;
      }
    };
    {
      context.filters = /* @__PURE__ */ new Set;
    }
    function addId(id) {
      const { identifiers } = context;
      if (identifiers[id] === undefined) {
        identifiers[id] = 0;
      }
      identifiers[id]++;
    }
    function removeId(id) {
      context.identifiers[id]--;
    }
    return context;
  }
  function transform(root, options) {
    const context = createTransformContext(root, options);
    traverseNode(root, context);
    if (options.hoistStatic) {
      cacheStatic(root, context);
    }
    if (!options.ssr) {
      createRootCodegen(root, context);
    }
    root.helpers = /* @__PURE__ */ new Set([...context.helpers.keys()]);
    root.components = [...context.components];
    root.directives = [...context.directives];
    root.imports = context.imports;
    root.hoists = context.hoists;
    root.temps = context.temps;
    root.cached = context.cached;
    root.transformed = true;
    {
      root.filters = [...context.filters];
    }
  }
  function createRootCodegen(root, context) {
    const { helper } = context;
    const { children } = root;
    if (children.length === 1) {
      const child = children[0];
      if (isSingleElementRoot(root, child) && child.codegenNode) {
        const codegenNode = child.codegenNode;
        if (codegenNode.type === 13) {
          convertToBlock(codegenNode, context);
        }
        root.codegenNode = codegenNode;
      } else {
        root.codegenNode = child;
      }
    } else if (children.length > 1) {
      let patchFlag = 64;
      if (children.filter((c) => c.type !== 3).length === 1) {
        patchFlag |= 2048;
      }
      root.codegenNode = createVNodeCall(context, helper(FRAGMENT), undefined, root.children, patchFlag, undefined, undefined, true, undefined, false);
    } else
      ;
  }
  function traverseChildren(parent, context) {
    let i = 0;
    const nodeRemoved = () => {
      i--;
    };
    for (;i < parent.children.length; i++) {
      const child = parent.children[i];
      if (shared.isString(child))
        continue;
      context.grandParent = context.parent;
      context.parent = parent;
      context.childIndex = i;
      context.onNodeRemoved = nodeRemoved;
      traverseNode(child, context);
    }
  }
  function traverseNode(node, context) {
    context.currentNode = node;
    const { nodeTransforms } = context;
    const exitFns = [];
    for (let i2 = 0;i2 < nodeTransforms.length; i2++) {
      const onExit = nodeTransforms[i2](node, context);
      if (onExit) {
        if (shared.isArray(onExit)) {
          exitFns.push(...onExit);
        } else {
          exitFns.push(onExit);
        }
      }
      if (!context.currentNode) {
        return;
      } else {
        node = context.currentNode;
      }
    }
    switch (node.type) {
      case 3:
        if (!context.ssr) {
          context.helper(CREATE_COMMENT);
        }
        break;
      case 5:
        if (!context.ssr) {
          context.helper(TO_DISPLAY_STRING);
        }
        break;
      case 9:
        for (let i2 = 0;i2 < node.branches.length; i2++) {
          traverseNode(node.branches[i2], context);
        }
        break;
      case 10:
      case 11:
      case 1:
      case 0:
        traverseChildren(node, context);
        break;
    }
    context.currentNode = node;
    let i = exitFns.length;
    while (i--) {
      exitFns[i]();
    }
  }
  function createStructuralDirectiveTransform(name, fn) {
    const matches = shared.isString(name) ? (n) => n === name : (n) => name.test(n);
    return (node, context) => {
      if (node.type === 1) {
        const { props } = node;
        if (node.tagType === 3 && props.some(isVSlot)) {
          return;
        }
        const exitFns = [];
        for (let i = 0;i < props.length; i++) {
          const prop = props[i];
          if (prop.type === 7 && matches(prop.name)) {
            props.splice(i, 1);
            i--;
            const onExit = fn(node, prop, context);
            if (onExit)
              exitFns.push(onExit);
          }
        }
        return exitFns;
      }
    };
  }
  var PURE_ANNOTATION = `/*@__PURE__*/`;
  var aliasHelper = (s) => `${helperNameMap[s]}: _${helperNameMap[s]}`;
  function createCodegenContext(ast, {
    mode = "function",
    prefixIdentifiers = mode === "module",
    sourceMap = false,
    filename = `template.vue.html`,
    scopeId = null,
    optimizeImports = false,
    runtimeGlobalName = `Vue`,
    runtimeModuleName = `vue`,
    ssrRuntimeModuleName = "vue/server-renderer",
    ssr = false,
    isTS = false,
    inSSR = false
  }) {
    const context = {
      mode,
      prefixIdentifiers,
      sourceMap,
      filename,
      scopeId,
      optimizeImports,
      runtimeGlobalName,
      runtimeModuleName,
      ssrRuntimeModuleName,
      ssr,
      isTS,
      inSSR,
      source: ast.source,
      code: ``,
      column: 1,
      line: 1,
      offset: 0,
      indentLevel: 0,
      pure: false,
      map: undefined,
      helper(key) {
        return `_${helperNameMap[key]}`;
      },
      push(code, newlineIndex = -2, node) {
        context.code += code;
        if (context.map) {
          if (node) {
            let name;
            if (node.type === 4 && !node.isStatic) {
              const content = node.content.replace(/^_ctx\./, "");
              if (content !== node.content && isSimpleIdentifier(content)) {
                name = content;
              }
            }
            if (node.loc.source) {
              addMapping(node.loc.start, name);
            }
          }
          if (newlineIndex === -3) {
            advancePositionWithMutation(context, code);
          } else {
            context.offset += code.length;
            if (newlineIndex === -2) {
              context.column += code.length;
            } else {
              if (newlineIndex === -1) {
                newlineIndex = code.length - 1;
              }
              context.line++;
              context.column = code.length - newlineIndex;
            }
          }
          if (node && node.loc !== locStub && node.loc.source) {
            addMapping(node.loc.end);
          }
        }
      },
      indent() {
        newline(++context.indentLevel);
      },
      deindent(withoutNewLine = false) {
        if (withoutNewLine) {
          --context.indentLevel;
        } else {
          newline(--context.indentLevel);
        }
      },
      newline() {
        newline(context.indentLevel);
      }
    };
    function newline(n) {
      context.push(`
` + `  `.repeat(n), 0);
    }
    function addMapping(loc, name = null) {
      const { _names, _mappings } = context.map;
      if (name !== null && !_names.has(name))
        _names.add(name);
      _mappings.add({
        originalLine: loc.line,
        originalColumn: loc.column - 1,
        generatedLine: context.line,
        generatedColumn: context.column - 1,
        source: filename,
        name
      });
    }
    if (sourceMap) {
      context.map = new sourceMapJs.SourceMapGenerator;
      context.map.setSourceContent(filename, context.source);
      context.map._sources.add(filename);
    }
    return context;
  }
  function generate(ast, options = {}) {
    const context = createCodegenContext(ast, options);
    if (options.onContextCreated)
      options.onContextCreated(context);
    const {
      mode,
      push,
      prefixIdentifiers,
      indent,
      deindent,
      newline,
      scopeId,
      ssr
    } = context;
    const helpers = Array.from(ast.helpers);
    const hasHelpers = helpers.length > 0;
    const useWithBlock = !prefixIdentifiers && mode !== "module";
    const genScopeId = scopeId != null && mode === "module";
    const isSetupInlined = !!options.inline;
    const preambleContext = isSetupInlined ? createCodegenContext(ast, options) : context;
    if (mode === "module") {
      genModulePreamble(ast, preambleContext, genScopeId, isSetupInlined);
    } else {
      genFunctionPreamble(ast, preambleContext);
    }
    const functionName = ssr ? `ssrRender` : `render`;
    const args = ssr ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"];
    if (options.bindingMetadata && !options.inline) {
      args.push("$props", "$setup", "$data", "$options");
    }
    const signature = options.isTS ? args.map((arg) => `${arg}: any`).join(",") : args.join(", ");
    if (isSetupInlined) {
      push(`(${signature}) => {`);
    } else {
      push(`function ${functionName}(${signature}) {`);
    }
    indent();
    if (useWithBlock) {
      push(`with (_ctx) {`);
      indent();
      if (hasHelpers) {
        push(`const { ${helpers.map(aliasHelper).join(", ")} } = _Vue
`, -1);
        newline();
      }
    }
    if (ast.components.length) {
      genAssets(ast.components, "component", context);
      if (ast.directives.length || ast.temps > 0) {
        newline();
      }
    }
    if (ast.directives.length) {
      genAssets(ast.directives, "directive", context);
      if (ast.temps > 0) {
        newline();
      }
    }
    if (ast.filters && ast.filters.length) {
      newline();
      genAssets(ast.filters, "filter", context);
      newline();
    }
    if (ast.temps > 0) {
      push(`let `);
      for (let i = 0;i < ast.temps; i++) {
        push(`${i > 0 ? `, ` : ``}_temp${i}`);
      }
    }
    if (ast.components.length || ast.directives.length || ast.temps) {
      push(`
`, 0);
      newline();
    }
    if (!ssr) {
      push(`return `);
    }
    if (ast.codegenNode) {
      genNode(ast.codegenNode, context);
    } else {
      push(`null`);
    }
    if (useWithBlock) {
      deindent();
      push(`}`);
    }
    deindent();
    push(`}`);
    return {
      ast,
      code: context.code,
      preamble: isSetupInlined ? preambleContext.code : ``,
      map: context.map ? context.map.toJSON() : undefined
    };
  }
  function genFunctionPreamble(ast, context) {
    const {
      ssr,
      prefixIdentifiers,
      push,
      newline,
      runtimeModuleName,
      runtimeGlobalName,
      ssrRuntimeModuleName
    } = context;
    const VueBinding = ssr ? `require(${JSON.stringify(runtimeModuleName)})` : runtimeGlobalName;
    const helpers = Array.from(ast.helpers);
    if (helpers.length > 0) {
      if (prefixIdentifiers) {
        push(`const { ${helpers.map(aliasHelper).join(", ")} } = ${VueBinding}
`, -1);
      } else {
        push(`const _Vue = ${VueBinding}
`, -1);
        if (ast.hoists.length) {
          const staticHelpers = [
            CREATE_VNODE,
            CREATE_ELEMENT_VNODE,
            CREATE_COMMENT,
            CREATE_TEXT,
            CREATE_STATIC
          ].filter((helper) => helpers.includes(helper)).map(aliasHelper).join(", ");
          push(`const { ${staticHelpers} } = _Vue
`, -1);
        }
      }
    }
    if (ast.ssrHelpers && ast.ssrHelpers.length) {
      push(`const { ${ast.ssrHelpers.map(aliasHelper).join(", ")} } = require("${ssrRuntimeModuleName}")
`, -1);
    }
    genHoists(ast.hoists, context);
    newline();
    push(`return `);
  }
  function genModulePreamble(ast, context, genScopeId, inline) {
    const {
      push,
      newline,
      optimizeImports,
      runtimeModuleName,
      ssrRuntimeModuleName
    } = context;
    if (ast.helpers.size) {
      const helpers = Array.from(ast.helpers);
      if (optimizeImports) {
        push(`import { ${helpers.map((s) => helperNameMap[s]).join(", ")} } from ${JSON.stringify(runtimeModuleName)}
`, -1);
        push(`
// Binding optimization for webpack code-split
const ${helpers.map((s) => `_${helperNameMap[s]} = ${helperNameMap[s]}`).join(", ")}
`, -1);
      } else {
        push(`import { ${helpers.map((s) => `${helperNameMap[s]} as _${helperNameMap[s]}`).join(", ")} } from ${JSON.stringify(runtimeModuleName)}
`, -1);
      }
    }
    if (ast.ssrHelpers && ast.ssrHelpers.length) {
      push(`import { ${ast.ssrHelpers.map((s) => `${helperNameMap[s]} as _${helperNameMap[s]}`).join(", ")} } from "${ssrRuntimeModuleName}"
`, -1);
    }
    if (ast.imports.length) {
      genImports(ast.imports, context);
      newline();
    }
    genHoists(ast.hoists, context);
    newline();
    if (!inline) {
      push(`export `);
    }
  }
  function genAssets(assets, type, { helper, push, newline, isTS }) {
    const resolver = helper(type === "filter" ? RESOLVE_FILTER : type === "component" ? RESOLVE_COMPONENT : RESOLVE_DIRECTIVE);
    for (let i = 0;i < assets.length; i++) {
      let id = assets[i];
      const maybeSelfReference = id.endsWith("__self");
      if (maybeSelfReference) {
        id = id.slice(0, -6);
      }
      push(`const ${toValidAssetId(id, type)} = ${resolver}(${JSON.stringify(id)}${maybeSelfReference ? `, true` : ``})${isTS ? `!` : ``}`);
      if (i < assets.length - 1) {
        newline();
      }
    }
  }
  function genHoists(hoists, context) {
    if (!hoists.length) {
      return;
    }
    context.pure = true;
    const { push, newline } = context;
    newline();
    for (let i = 0;i < hoists.length; i++) {
      const exp = hoists[i];
      if (exp) {
        push(`const _hoisted_${i + 1} = `);
        genNode(exp, context);
        newline();
      }
    }
    context.pure = false;
  }
  function genImports(importsOptions, context) {
    if (!importsOptions.length) {
      return;
    }
    importsOptions.forEach((imports) => {
      context.push(`import `);
      genNode(imports.exp, context);
      context.push(` from '${imports.path}'`);
      context.newline();
    });
  }
  function isText(n) {
    return shared.isString(n) || n.type === 4 || n.type === 2 || n.type === 5 || n.type === 8;
  }
  function genNodeListAsArray(nodes, context) {
    const multilines = nodes.length > 3 || nodes.some((n) => shared.isArray(n) || !isText(n));
    context.push(`[`);
    multilines && context.indent();
    genNodeList(nodes, context, multilines);
    multilines && context.deindent();
    context.push(`]`);
  }
  function genNodeList(nodes, context, multilines = false, comma = true) {
    const { push, newline } = context;
    for (let i = 0;i < nodes.length; i++) {
      const node = nodes[i];
      if (shared.isString(node)) {
        push(node, -3);
      } else if (shared.isArray(node)) {
        genNodeListAsArray(node, context);
      } else {
        genNode(node, context);
      }
      if (i < nodes.length - 1) {
        if (multilines) {
          comma && push(",");
          newline();
        } else {
          comma && push(", ");
        }
      }
    }
  }
  function genNode(node, context) {
    if (shared.isString(node)) {
      context.push(node, -3);
      return;
    }
    if (shared.isSymbol(node)) {
      context.push(context.helper(node));
      return;
    }
    switch (node.type) {
      case 1:
      case 9:
      case 11:
        assert(node.codegenNode != null, `Codegen node is missing for element/if/for node. Apply appropriate transforms first.`);
        genNode(node.codegenNode, context);
        break;
      case 2:
        genText(node, context);
        break;
      case 4:
        genExpression(node, context);
        break;
      case 5:
        genInterpolation(node, context);
        break;
      case 12:
        genNode(node.codegenNode, context);
        break;
      case 8:
        genCompoundExpression(node, context);
        break;
      case 3:
        genComment(node, context);
        break;
      case 13:
        genVNodeCall(node, context);
        break;
      case 14:
        genCallExpression(node, context);
        break;
      case 15:
        genObjectExpression(node, context);
        break;
      case 17:
        genArrayExpression(node, context);
        break;
      case 18:
        genFunctionExpression(node, context);
        break;
      case 19:
        genConditionalExpression(node, context);
        break;
      case 20:
        genCacheExpression(node, context);
        break;
      case 21:
        genNodeList(node.body, context, true, false);
        break;
      case 22:
        genTemplateLiteral(node, context);
        break;
      case 23:
        genIfStatement(node, context);
        break;
      case 24:
        genAssignmentExpression(node, context);
        break;
      case 25:
        genSequenceExpression(node, context);
        break;
      case 26:
        genReturnStatement(node, context);
        break;
      case 10:
        break;
      default: {
        assert(false, `unhandled codegen node type: ${node.type}`);
        const exhaustiveCheck = node;
        return exhaustiveCheck;
      }
    }
  }
  function genText(node, context) {
    context.push(JSON.stringify(node.content), -3, node);
  }
  function genExpression(node, context) {
    const { content, isStatic } = node;
    context.push(isStatic ? JSON.stringify(content) : content, -3, node);
  }
  function genInterpolation(node, context) {
    const { push, helper, pure } = context;
    if (pure)
      push(PURE_ANNOTATION);
    push(`${helper(TO_DISPLAY_STRING)}(`);
    genNode(node.content, context);
    push(`)`);
  }
  function genCompoundExpression(node, context) {
    for (let i = 0;i < node.children.length; i++) {
      const child = node.children[i];
      if (shared.isString(child)) {
        context.push(child, -3);
      } else {
        genNode(child, context);
      }
    }
  }
  function genExpressionAsPropertyKey(node, context) {
    const { push } = context;
    if (node.type === 8) {
      push(`[`);
      genCompoundExpression(node, context);
      push(`]`);
    } else if (node.isStatic) {
      const text = isSimpleIdentifier(node.content) ? node.content : JSON.stringify(node.content);
      push(text, -2, node);
    } else {
      push(`[${node.content}]`, -3, node);
    }
  }
  function genComment(node, context) {
    const { push, helper, pure } = context;
    if (pure) {
      push(PURE_ANNOTATION);
    }
    push(`${helper(CREATE_COMMENT)}(${JSON.stringify(node.content)})`, -3, node);
  }
  function genVNodeCall(node, context) {
    const { push, helper, pure } = context;
    const {
      tag,
      props,
      children,
      patchFlag,
      dynamicProps,
      directives,
      isBlock,
      disableTracking,
      isComponent: isComponent2
    } = node;
    let patchFlagString;
    if (patchFlag) {
      {
        if (patchFlag < 0) {
          patchFlagString = patchFlag + ` /* ${shared.PatchFlagNames[patchFlag]} */`;
        } else {
          const flagNames = Object.keys(shared.PatchFlagNames).map(Number).filter((n) => n > 0 && patchFlag & n).map((n) => shared.PatchFlagNames[n]).join(`, `);
          patchFlagString = patchFlag + ` /* ${flagNames} */`;
        }
      }
    }
    if (directives) {
      push(helper(WITH_DIRECTIVES) + `(`);
    }
    if (isBlock) {
      push(`(${helper(OPEN_BLOCK)}(${disableTracking ? `true` : ``}), `);
    }
    if (pure) {
      push(PURE_ANNOTATION);
    }
    const callHelper = isBlock ? getVNodeBlockHelper(context.inSSR, isComponent2) : getVNodeHelper(context.inSSR, isComponent2);
    push(helper(callHelper) + `(`, -2, node);
    genNodeList(genNullableArgs([tag, props, children, patchFlagString, dynamicProps]), context);
    push(`)`);
    if (isBlock) {
      push(`)`);
    }
    if (directives) {
      push(`, `);
      genNode(directives, context);
      push(`)`);
    }
  }
  function genNullableArgs(args) {
    let i = args.length;
    while (i--) {
      if (args[i] != null)
        break;
    }
    return args.slice(0, i + 1).map((arg) => arg || `null`);
  }
  function genCallExpression(node, context) {
    const { push, helper, pure } = context;
    const callee = shared.isString(node.callee) ? node.callee : helper(node.callee);
    if (pure) {
      push(PURE_ANNOTATION);
    }
    push(callee + `(`, -2, node);
    genNodeList(node.arguments, context);
    push(`)`);
  }
  function genObjectExpression(node, context) {
    const { push, indent, deindent, newline } = context;
    const { properties } = node;
    if (!properties.length) {
      push(`{}`, -2, node);
      return;
    }
    const multilines = properties.length > 1 || properties.some((p) => p.value.type !== 4);
    push(multilines ? `{` : `{ `);
    multilines && indent();
    for (let i = 0;i < properties.length; i++) {
      const { key, value } = properties[i];
      genExpressionAsPropertyKey(key, context);
      push(`: `);
      genNode(value, context);
      if (i < properties.length - 1) {
        push(`,`);
        newline();
      }
    }
    multilines && deindent();
    push(multilines ? `}` : ` }`);
  }
  function genArrayExpression(node, context) {
    genNodeListAsArray(node.elements, context);
  }
  function genFunctionExpression(node, context) {
    const { push, indent, deindent } = context;
    const { params, returns, body, newline, isSlot } = node;
    if (isSlot) {
      push(`_${helperNameMap[WITH_CTX]}(`);
    }
    push(`(`, -2, node);
    if (shared.isArray(params)) {
      genNodeList(params, context);
    } else if (params) {
      genNode(params, context);
    }
    push(`) => `);
    if (newline || body) {
      push(`{`);
      indent();
    }
    if (returns) {
      if (newline) {
        push(`return `);
      }
      if (shared.isArray(returns)) {
        genNodeListAsArray(returns, context);
      } else {
        genNode(returns, context);
      }
    } else if (body) {
      genNode(body, context);
    }
    if (newline || body) {
      deindent();
      push(`}`);
    }
    if (isSlot) {
      if (node.isNonScopedSlot) {
        push(`, undefined, true`);
      }
      push(`)`);
    }
  }
  function genConditionalExpression(node, context) {
    const { test, consequent, alternate, newline: needNewline } = node;
    const { push, indent, deindent, newline } = context;
    if (test.type === 4) {
      const needsParens = !isSimpleIdentifier(test.content);
      needsParens && push(`(`);
      genExpression(test, context);
      needsParens && push(`)`);
    } else {
      push(`(`);
      genNode(test, context);
      push(`)`);
    }
    needNewline && indent();
    context.indentLevel++;
    needNewline || push(` `);
    push(`? `);
    genNode(consequent, context);
    context.indentLevel--;
    needNewline && newline();
    needNewline || push(` `);
    push(`: `);
    const isNested = alternate.type === 19;
    if (!isNested) {
      context.indentLevel++;
    }
    genNode(alternate, context);
    if (!isNested) {
      context.indentLevel--;
    }
    needNewline && deindent(true);
  }
  function genCacheExpression(node, context) {
    const { push, helper, indent, deindent, newline } = context;
    const { needPauseTracking, needArraySpread } = node;
    if (needArraySpread) {
      push(`[...(`);
    }
    push(`_cache[${node.index}] || (`);
    if (needPauseTracking) {
      indent();
      push(`${helper(SET_BLOCK_TRACKING)}(-1`);
      if (node.inVOnce)
        push(`, true`);
      push(`),`);
      newline();
      push(`(`);
    }
    push(`_cache[${node.index}] = `);
    genNode(node.value, context);
    if (needPauseTracking) {
      push(`).cacheIndex = ${node.index},`);
      newline();
      push(`${helper(SET_BLOCK_TRACKING)}(1),`);
      newline();
      push(`_cache[${node.index}]`);
      deindent();
    }
    push(`)`);
    if (needArraySpread) {
      push(`)]`);
    }
  }
  function genTemplateLiteral(node, context) {
    const { push, indent, deindent } = context;
    push("`");
    const l = node.elements.length;
    const multilines = l > 3;
    for (let i = 0;i < l; i++) {
      const e = node.elements[i];
      if (shared.isString(e)) {
        push(e.replace(/(`|\$|\\)/g, "\\$1"), -3);
      } else {
        push("${");
        if (multilines)
          indent();
        genNode(e, context);
        if (multilines)
          deindent();
        push("}");
      }
    }
    push("`");
  }
  function genIfStatement(node, context) {
    const { push, indent, deindent } = context;
    const { test, consequent, alternate } = node;
    push(`if (`);
    genNode(test, context);
    push(`) {`);
    indent();
    genNode(consequent, context);
    deindent();
    push(`}`);
    if (alternate) {
      push(` else `);
      if (alternate.type === 23) {
        genIfStatement(alternate, context);
      } else {
        push(`{`);
        indent();
        genNode(alternate, context);
        deindent();
        push(`}`);
      }
    }
  }
  function genAssignmentExpression(node, context) {
    genNode(node.left, context);
    context.push(` = `);
    genNode(node.right, context);
  }
  function genSequenceExpression(node, context) {
    context.push(`(`);
    genNodeList(node.expressions, context);
    context.push(`)`);
  }
  function genReturnStatement({ returns }, context) {
    context.push(`return `);
    if (shared.isArray(returns)) {
      genNodeListAsArray(returns, context);
    } else {
      genNode(returns, context);
    }
  }
  var isLiteralWhitelisted = /* @__PURE__ */ shared.makeMap("true,false,null,this");
  var transformExpression = (node, context) => {
    if (node.type === 5) {
      node.content = processExpression(node.content, context);
    } else if (node.type === 1) {
      const memo = findDir(node, "memo");
      for (let i = 0;i < node.props.length; i++) {
        const dir = node.props[i];
        if (dir.type === 7 && dir.name !== "for") {
          const exp = dir.exp;
          const arg = dir.arg;
          if (exp && exp.type === 4 && !(dir.name === "on" && arg) && !(memo && arg && arg.type === 4 && arg.content === "key")) {
            dir.exp = processExpression(exp, context, dir.name === "slot");
          }
          if (arg && arg.type === 4 && !arg.isStatic) {
            dir.arg = processExpression(arg, context);
          }
        }
      }
    }
  };
  function processExpression(node, context, asParams = false, asRawStatements = false, localVars = Object.create(context.identifiers)) {
    if (!context.prefixIdentifiers || !node.content.trim()) {
      return node;
    }
    const { inline, bindingMetadata } = context;
    const rewriteIdentifier = (raw, parent, id) => {
      const type = shared.hasOwn(bindingMetadata, raw) && bindingMetadata[raw];
      if (inline) {
        const isAssignmentLVal = parent && parent.type === "AssignmentExpression" && parent.left === id;
        const isUpdateArg = parent && parent.type === "UpdateExpression" && parent.argument === id;
        const isDestructureAssignment = parent && isInDestructureAssignment(parent, parentStack);
        const isNewExpression = parent && isInNewExpression(parentStack);
        const wrapWithUnref = (raw2) => {
          const wrapped = `${context.helperString(UNREF)}(${raw2})`;
          return isNewExpression ? `(${wrapped})` : wrapped;
        };
        if (isConst(type) || type === "setup-reactive-const" || localVars[raw]) {
          return raw;
        } else if (type === "setup-ref") {
          return `${raw}.value`;
        } else if (type === "setup-maybe-ref") {
          return isAssignmentLVal || isUpdateArg || isDestructureAssignment ? `${raw}.value` : wrapWithUnref(raw);
        } else if (type === "setup-let") {
          if (isAssignmentLVal) {
            const { right: rVal, operator } = parent;
            const rExp = rawExp.slice(rVal.start - 1, rVal.end - 1);
            const rExpString = stringifyExpression(processExpression(createSimpleExpression(rExp, false), context, false, false, knownIds));
            return `${context.helperString(IS_REF)}(${raw})${context.isTS ? ` //@ts-ignore
` : ``} ? ${raw}.value ${operator} ${rExpString} : ${raw}`;
          } else if (isUpdateArg) {
            id.start = parent.start;
            id.end = parent.end;
            const { prefix: isPrefix, operator } = parent;
            const prefix = isPrefix ? operator : ``;
            const postfix = isPrefix ? `` : operator;
            return `${context.helperString(IS_REF)}(${raw})${context.isTS ? ` //@ts-ignore
` : ``} ? ${prefix}${raw}.value${postfix} : ${prefix}${raw}${postfix}`;
          } else if (isDestructureAssignment) {
            return raw;
          } else {
            return wrapWithUnref(raw);
          }
        } else if (type === "props") {
          return shared.genPropsAccessExp(raw);
        } else if (type === "props-aliased") {
          return shared.genPropsAccessExp(bindingMetadata.__propsAliases[raw]);
        }
      } else {
        if (type && type.startsWith("setup") || type === "literal-const") {
          return `$setup.${raw}`;
        } else if (type === "props-aliased") {
          return `$props['${bindingMetadata.__propsAliases[raw]}']`;
        } else if (type) {
          return `$${type}.${raw}`;
        }
      }
      return `_ctx.${raw}`;
    };
    const rawExp = node.content;
    let ast = node.ast;
    if (ast === false) {
      return node;
    }
    if (ast === null || !ast && isSimpleIdentifier(rawExp)) {
      const isScopeVarReference = context.identifiers[rawExp];
      const isAllowedGlobal = shared.isGloballyAllowed(rawExp);
      const isLiteral = isLiteralWhitelisted(rawExp);
      if (!asParams && !isScopeVarReference && !isLiteral && (!isAllowedGlobal || bindingMetadata[rawExp])) {
        if (isConst(bindingMetadata[rawExp])) {
          node.constType = 1;
        }
        node.content = rewriteIdentifier(rawExp);
      } else if (!isScopeVarReference) {
        if (isLiteral) {
          node.constType = 3;
        } else {
          node.constType = 2;
        }
      }
      return node;
    }
    if (!ast) {
      const source = asRawStatements ? ` ${rawExp} ` : `(${rawExp})${asParams ? `=>{}` : ``}`;
      try {
        ast = parser.parseExpression(source, {
          sourceType: "module",
          plugins: context.expressionPlugins
        });
      } catch (e) {
        context.onError(createCompilerError(45, node.loc, undefined, e.message));
        return node;
      }
    }
    const ids = [];
    const parentStack = [];
    const knownIds = Object.create(context.identifiers);
    walkIdentifiers(ast, (node2, parent, _, isReferenced2, isLocal) => {
      if (isStaticPropertyKey(node2, parent)) {
        return;
      }
      if (node2.name.startsWith("_filter_")) {
        return;
      }
      const needPrefix = isReferenced2 && canPrefix(node2);
      if (needPrefix && !isLocal) {
        if (isStaticProperty(parent) && parent.shorthand) {
          node2.prefix = `${node2.name}: `;
        }
        node2.name = rewriteIdentifier(node2.name, parent, node2);
        ids.push(node2);
      } else {
        if (!(needPrefix && isLocal) && (!parent || parent.type !== "CallExpression" && parent.type !== "NewExpression" && parent.type !== "MemberExpression")) {
          node2.isConstant = true;
        }
        ids.push(node2);
      }
    }, true, parentStack, knownIds);
    const children = [];
    ids.sort((a, b) => a.start - b.start);
    ids.forEach((id, i) => {
      const start = id.start - 1;
      const end = id.end - 1;
      const last = ids[i - 1];
      const leadingText = rawExp.slice(last ? last.end - 1 : 0, start);
      if (leadingText.length || id.prefix) {
        children.push(leadingText + (id.prefix || ``));
      }
      const source = rawExp.slice(start, end);
      children.push(createSimpleExpression(id.name, false, {
        start: advancePositionWithClone(node.loc.start, source, start),
        end: advancePositionWithClone(node.loc.start, source, end),
        source
      }, id.isConstant ? 3 : 0));
      if (i === ids.length - 1 && end < rawExp.length) {
        children.push(rawExp.slice(end));
      }
    });
    let ret;
    if (children.length) {
      ret = createCompoundExpression(children, node.loc);
      ret.ast = ast;
    } else {
      ret = node;
      ret.constType = 3;
    }
    ret.identifiers = Object.keys(knownIds);
    return ret;
  }
  function canPrefix(id) {
    if (shared.isGloballyAllowed(id.name)) {
      return false;
    }
    if (id.name === "require") {
      return false;
    }
    return true;
  }
  function stringifyExpression(exp) {
    if (shared.isString(exp)) {
      return exp;
    } else if (exp.type === 4) {
      return exp.content;
    } else {
      return exp.children.map(stringifyExpression).join("");
    }
  }
  function isConst(type) {
    return type === "setup-const" || type === "literal-const";
  }
  var transformIf = createStructuralDirectiveTransform(/^(if|else|else-if)$/, (node, dir, context) => {
    return processIf(node, dir, context, (ifNode, branch, isRoot) => {
      const siblings = context.parent.children;
      let i = siblings.indexOf(ifNode);
      let key = 0;
      while (i-- >= 0) {
        const sibling = siblings[i];
        if (sibling && sibling.type === 9) {
          key += sibling.branches.length;
        }
      }
      return () => {
        if (isRoot) {
          ifNode.codegenNode = createCodegenNodeForBranch(branch, key, context);
        } else {
          const parentCondition = getParentCondition(ifNode.codegenNode);
          parentCondition.alternate = createCodegenNodeForBranch(branch, key + ifNode.branches.length - 1, context);
        }
      };
    });
  });
  function processIf(node, dir, context, processCodegen) {
    if (dir.name !== "else" && (!dir.exp || !dir.exp.content.trim())) {
      const loc = dir.exp ? dir.exp.loc : node.loc;
      context.onError(createCompilerError(28, dir.loc));
      dir.exp = createSimpleExpression(`true`, false, loc);
    }
    if (context.prefixIdentifiers && dir.exp) {
      dir.exp = processExpression(dir.exp, context);
    }
    if (dir.name === "if") {
      const branch = createIfBranch(node, dir);
      const ifNode = {
        type: 9,
        loc: cloneLoc(node.loc),
        branches: [branch]
      };
      context.replaceNode(ifNode);
      if (processCodegen) {
        return processCodegen(ifNode, branch, true);
      }
    } else {
      const siblings = context.parent.children;
      const comments = [];
      let i = siblings.indexOf(node);
      while (i-- >= -1) {
        const sibling = siblings[i];
        if (sibling && sibling.type === 3) {
          context.removeNode(sibling);
          comments.unshift(sibling);
          continue;
        }
        if (sibling && sibling.type === 2 && !sibling.content.trim().length) {
          context.removeNode(sibling);
          continue;
        }
        if (sibling && sibling.type === 9) {
          if (dir.name === "else-if" && sibling.branches[sibling.branches.length - 1].condition === undefined) {
            context.onError(createCompilerError(30, node.loc));
          }
          context.removeNode();
          const branch = createIfBranch(node, dir);
          if (comments.length && !(context.parent && context.parent.type === 1 && (context.parent.tag === "transition" || context.parent.tag === "Transition"))) {
            branch.children = [...comments, ...branch.children];
          }
          {
            const key = branch.userKey;
            if (key) {
              sibling.branches.forEach(({ userKey }) => {
                if (isSameKey(userKey, key)) {
                  context.onError(createCompilerError(29, branch.userKey.loc));
                }
              });
            }
          }
          sibling.branches.push(branch);
          const onExit = processCodegen && processCodegen(sibling, branch, false);
          traverseNode(branch, context);
          if (onExit)
            onExit();
          context.currentNode = null;
        } else {
          context.onError(createCompilerError(30, node.loc));
        }
        break;
      }
    }
  }
  function createIfBranch(node, dir) {
    const isTemplateIf = node.tagType === 3;
    return {
      type: 10,
      loc: node.loc,
      condition: dir.name === "else" ? undefined : dir.exp,
      children: isTemplateIf && !findDir(node, "for") ? node.children : [node],
      userKey: findProp(node, `key`),
      isTemplateIf
    };
  }
  function createCodegenNodeForBranch(branch, keyIndex, context) {
    if (branch.condition) {
      return createConditionalExpression(branch.condition, createChildrenCodegenNode(branch, keyIndex, context), createCallExpression(context.helper(CREATE_COMMENT), [
        '"v-if"',
        "true"
      ]));
    } else {
      return createChildrenCodegenNode(branch, keyIndex, context);
    }
  }
  function createChildrenCodegenNode(branch, keyIndex, context) {
    const { helper } = context;
    const keyProperty = createObjectProperty(`key`, createSimpleExpression(`${keyIndex}`, false, locStub, 2));
    const { children } = branch;
    const firstChild = children[0];
    const needFragmentWrapper = children.length !== 1 || firstChild.type !== 1;
    if (needFragmentWrapper) {
      if (children.length === 1 && firstChild.type === 11) {
        const vnodeCall = firstChild.codegenNode;
        injectProp(vnodeCall, keyProperty, context);
        return vnodeCall;
      } else {
        let patchFlag = 64;
        if (!branch.isTemplateIf && children.filter((c) => c.type !== 3).length === 1) {
          patchFlag |= 2048;
        }
        return createVNodeCall(context, helper(FRAGMENT), createObjectExpression([keyProperty]), children, patchFlag, undefined, undefined, true, false, false, branch.loc);
      }
    } else {
      const ret = firstChild.codegenNode;
      const vnodeCall = getMemoedVNodeCall(ret);
      if (vnodeCall.type === 13) {
        convertToBlock(vnodeCall, context);
      }
      injectProp(vnodeCall, keyProperty, context);
      return ret;
    }
  }
  function isSameKey(a, b) {
    if (!a || a.type !== b.type) {
      return false;
    }
    if (a.type === 6) {
      if (a.value.content !== b.value.content) {
        return false;
      }
    } else {
      const exp = a.exp;
      const branchExp = b.exp;
      if (exp.type !== branchExp.type) {
        return false;
      }
      if (exp.type !== 4 || exp.isStatic !== branchExp.isStatic || exp.content !== branchExp.content) {
        return false;
      }
    }
    return true;
  }
  function getParentCondition(node) {
    while (true) {
      if (node.type === 19) {
        if (node.alternate.type === 19) {
          node = node.alternate;
        } else {
          return node;
        }
      } else if (node.type === 20) {
        node = node.value;
      }
    }
  }
  var transformBind = (dir, _node, context) => {
    const { modifiers, loc } = dir;
    const arg = dir.arg;
    let { exp } = dir;
    if (exp && exp.type === 4 && !exp.content.trim()) {
      {
        context.onError(createCompilerError(34, loc));
        return {
          props: [
            createObjectProperty(arg, createSimpleExpression("", true, loc))
          ]
        };
      }
    }
    if (!exp) {
      if (arg.type !== 4 || !arg.isStatic) {
        context.onError(createCompilerError(52, arg.loc));
        return {
          props: [
            createObjectProperty(arg, createSimpleExpression("", true, loc))
          ]
        };
      }
      transformBindShorthand(dir, context);
      exp = dir.exp;
    }
    if (arg.type !== 4) {
      arg.children.unshift(`(`);
      arg.children.push(`) || ""`);
    } else if (!arg.isStatic) {
      arg.content = `${arg.content} || ""`;
    }
    if (modifiers.some((mod) => mod.content === "camel")) {
      if (arg.type === 4) {
        if (arg.isStatic) {
          arg.content = shared.camelize(arg.content);
        } else {
          arg.content = `${context.helperString(CAMELIZE)}(${arg.content})`;
        }
      } else {
        arg.children.unshift(`${context.helperString(CAMELIZE)}(`);
        arg.children.push(`)`);
      }
    }
    if (!context.inSSR) {
      if (modifiers.some((mod) => mod.content === "prop")) {
        injectPrefix(arg, ".");
      }
      if (modifiers.some((mod) => mod.content === "attr")) {
        injectPrefix(arg, "^");
      }
    }
    return {
      props: [createObjectProperty(arg, exp)]
    };
  };
  var transformBindShorthand = (dir, context) => {
    const arg = dir.arg;
    const propName = shared.camelize(arg.content);
    dir.exp = createSimpleExpression(propName, false, arg.loc);
    {
      dir.exp = processExpression(dir.exp, context);
    }
  };
  var injectPrefix = (arg, prefix) => {
    if (arg.type === 4) {
      if (arg.isStatic) {
        arg.content = prefix + arg.content;
      } else {
        arg.content = `\`${prefix}\${${arg.content}}\``;
      }
    } else {
      arg.children.unshift(`'${prefix}' + (`);
      arg.children.push(`)`);
    }
  };
  var transformFor = createStructuralDirectiveTransform("for", (node, dir, context) => {
    const { helper, removeHelper } = context;
    return processFor(node, dir, context, (forNode) => {
      const renderExp = createCallExpression(helper(RENDER_LIST), [
        forNode.source
      ]);
      const isTemplate = isTemplateNode(node);
      const memo = findDir(node, "memo");
      const keyProp = findProp(node, `key`, false, true);
      const isDirKey = keyProp && keyProp.type === 7;
      if (isDirKey && !keyProp.exp) {
        transformBindShorthand(keyProp, context);
      }
      let keyExp = keyProp && (keyProp.type === 6 ? keyProp.value ? createSimpleExpression(keyProp.value.content, true) : undefined : keyProp.exp);
      if (memo && keyExp && isDirKey) {
        {
          keyProp.exp = keyExp = processExpression(keyExp, context);
        }
      }
      const keyProperty = keyProp && keyExp ? createObjectProperty(`key`, keyExp) : null;
      if (isTemplate) {
        if (memo) {
          memo.exp = processExpression(memo.exp, context);
        }
        if (keyProperty && keyProp.type !== 6) {
          keyProperty.value = processExpression(keyProperty.value, context);
        }
      }
      const isStableFragment = forNode.source.type === 4 && forNode.source.constType > 0;
      const fragmentFlag = isStableFragment ? 64 : keyProp ? 128 : 256;
      forNode.codegenNode = createVNodeCall(context, helper(FRAGMENT), undefined, renderExp, fragmentFlag, undefined, undefined, true, !isStableFragment, false, node.loc);
      return () => {
        let childBlock;
        const { children } = forNode;
        if (isTemplate) {
          node.children.some((c) => {
            if (c.type === 1) {
              const key = findProp(c, "key");
              if (key) {
                context.onError(createCompilerError(33, key.loc));
                return true;
              }
            }
          });
        }
        const needFragmentWrapper = children.length !== 1 || children[0].type !== 1;
        const slotOutlet = isSlotOutlet(node) ? node : isTemplate && node.children.length === 1 && isSlotOutlet(node.children[0]) ? node.children[0] : null;
        if (slotOutlet) {
          childBlock = slotOutlet.codegenNode;
          if (isTemplate && keyProperty) {
            injectProp(childBlock, keyProperty, context);
          }
        } else if (needFragmentWrapper) {
          childBlock = createVNodeCall(context, helper(FRAGMENT), keyProperty ? createObjectExpression([keyProperty]) : undefined, node.children, 64, undefined, undefined, true, undefined, false);
        } else {
          childBlock = children[0].codegenNode;
          if (isTemplate && keyProperty) {
            injectProp(childBlock, keyProperty, context);
          }
          if (childBlock.isBlock !== !isStableFragment) {
            if (childBlock.isBlock) {
              removeHelper(OPEN_BLOCK);
              removeHelper(getVNodeBlockHelper(context.inSSR, childBlock.isComponent));
            } else {
              removeHelper(getVNodeHelper(context.inSSR, childBlock.isComponent));
            }
          }
          childBlock.isBlock = !isStableFragment;
          if (childBlock.isBlock) {
            helper(OPEN_BLOCK);
            helper(getVNodeBlockHelper(context.inSSR, childBlock.isComponent));
          } else {
            helper(getVNodeHelper(context.inSSR, childBlock.isComponent));
          }
        }
        if (memo) {
          const loop = createFunctionExpression(createForLoopParams(forNode.parseResult, [
            createSimpleExpression(`_cached`)
          ]));
          loop.body = createBlockStatement([
            createCompoundExpression([`const _memo = (`, memo.exp, `)`]),
            createCompoundExpression([
              `if (_cached`,
              ...keyExp ? [` && _cached.key === `, keyExp] : [],
              ` && ${context.helperString(IS_MEMO_SAME)}(_cached, _memo)) return _cached`
            ]),
            createCompoundExpression([`const _item = `, childBlock]),
            createSimpleExpression(`_item.memo = _memo`),
            createSimpleExpression(`return _item`)
          ]);
          renderExp.arguments.push(loop, createSimpleExpression(`_cache`), createSimpleExpression(String(context.cached.length)));
          context.cached.push(null);
        } else {
          renderExp.arguments.push(createFunctionExpression(createForLoopParams(forNode.parseResult), childBlock, true));
        }
      };
    });
  });
  function processFor(node, dir, context, processCodegen) {
    if (!dir.exp) {
      context.onError(createCompilerError(31, dir.loc));
      return;
    }
    const parseResult = dir.forParseResult;
    if (!parseResult) {
      context.onError(createCompilerError(32, dir.loc));
      return;
    }
    finalizeForParseResult(parseResult, context);
    const { addIdentifiers, removeIdentifiers, scopes } = context;
    const { source, value, key, index } = parseResult;
    const forNode = {
      type: 11,
      loc: dir.loc,
      source,
      valueAlias: value,
      keyAlias: key,
      objectIndexAlias: index,
      parseResult,
      children: isTemplateNode(node) ? node.children : [node]
    };
    context.replaceNode(forNode);
    scopes.vFor++;
    if (context.prefixIdentifiers) {
      value && addIdentifiers(value);
      key && addIdentifiers(key);
      index && addIdentifiers(index);
    }
    const onExit = processCodegen && processCodegen(forNode);
    return () => {
      scopes.vFor--;
      if (context.prefixIdentifiers) {
        value && removeIdentifiers(value);
        key && removeIdentifiers(key);
        index && removeIdentifiers(index);
      }
      if (onExit)
        onExit();
    };
  }
  function finalizeForParseResult(result, context) {
    if (result.finalized)
      return;
    if (context.prefixIdentifiers) {
      result.source = processExpression(result.source, context);
      if (result.key) {
        result.key = processExpression(result.key, context, true);
      }
      if (result.index) {
        result.index = processExpression(result.index, context, true);
      }
      if (result.value) {
        result.value = processExpression(result.value, context, true);
      }
    }
    result.finalized = true;
  }
  function createForLoopParams({ value, key, index }, memoArgs = []) {
    return createParamsList([value, key, index, ...memoArgs]);
  }
  function createParamsList(args) {
    let i = args.length;
    while (i--) {
      if (args[i])
        break;
    }
    return args.slice(0, i + 1).map((arg, i2) => arg || createSimpleExpression(`_`.repeat(i2 + 1), false));
  }
  var defaultFallback = createSimpleExpression(`undefined`, false);
  var trackSlotScopes = (node, context) => {
    if (node.type === 1 && (node.tagType === 1 || node.tagType === 3)) {
      const vSlot = findDir(node, "slot");
      if (vSlot) {
        const slotProps = vSlot.exp;
        if (context.prefixIdentifiers) {
          slotProps && context.addIdentifiers(slotProps);
        }
        context.scopes.vSlot++;
        return () => {
          if (context.prefixIdentifiers) {
            slotProps && context.removeIdentifiers(slotProps);
          }
          context.scopes.vSlot--;
        };
      }
    }
  };
  var trackVForSlotScopes = (node, context) => {
    let vFor;
    if (isTemplateNode(node) && node.props.some(isVSlot) && (vFor = findDir(node, "for"))) {
      const result = vFor.forParseResult;
      if (result) {
        finalizeForParseResult(result, context);
        const { value, key, index } = result;
        const { addIdentifiers, removeIdentifiers } = context;
        value && addIdentifiers(value);
        key && addIdentifiers(key);
        index && addIdentifiers(index);
        return () => {
          value && removeIdentifiers(value);
          key && removeIdentifiers(key);
          index && removeIdentifiers(index);
        };
      }
    }
  };
  var buildClientSlotFn = (props, _vForExp, children, loc) => createFunctionExpression(props, children, false, true, children.length ? children[0].loc : loc);
  function buildSlots(node, context, buildSlotFn = buildClientSlotFn) {
    context.helper(WITH_CTX);
    const { children, loc } = node;
    const slotsProperties = [];
    const dynamicSlots = [];
    let hasDynamicSlots = context.scopes.vSlot > 0 || context.scopes.vFor > 0;
    if (!context.ssr && context.prefixIdentifiers) {
      hasDynamicSlots = hasScopeRef(node, context.identifiers);
    }
    const onComponentSlot = findDir(node, "slot", true);
    if (onComponentSlot) {
      const { arg, exp } = onComponentSlot;
      if (arg && !isStaticExp(arg)) {
        hasDynamicSlots = true;
      }
      slotsProperties.push(createObjectProperty(arg || createSimpleExpression("default", true), buildSlotFn(exp, undefined, children, loc)));
    }
    let hasTemplateSlots = false;
    let hasNamedDefaultSlot = false;
    const implicitDefaultChildren = [];
    const seenSlotNames = /* @__PURE__ */ new Set;
    let conditionalBranchIndex = 0;
    for (let i = 0;i < children.length; i++) {
      const slotElement = children[i];
      let slotDir;
      if (!isTemplateNode(slotElement) || !(slotDir = findDir(slotElement, "slot", true))) {
        if (slotElement.type !== 3) {
          implicitDefaultChildren.push(slotElement);
        }
        continue;
      }
      if (onComponentSlot) {
        context.onError(createCompilerError(37, slotDir.loc));
        break;
      }
      hasTemplateSlots = true;
      const { children: slotChildren, loc: slotLoc } = slotElement;
      const {
        arg: slotName = createSimpleExpression(`default`, true),
        exp: slotProps,
        loc: dirLoc
      } = slotDir;
      let staticSlotName;
      if (isStaticExp(slotName)) {
        staticSlotName = slotName ? slotName.content : `default`;
      } else {
        hasDynamicSlots = true;
      }
      const vFor = findDir(slotElement, "for");
      const slotFunction = buildSlotFn(slotProps, vFor, slotChildren, slotLoc);
      let vIf;
      let vElse;
      if (vIf = findDir(slotElement, "if")) {
        hasDynamicSlots = true;
        dynamicSlots.push(createConditionalExpression(vIf.exp, buildDynamicSlot(slotName, slotFunction, conditionalBranchIndex++), defaultFallback));
      } else if (vElse = findDir(slotElement, /^else(-if)?$/, true)) {
        let j = i;
        let prev;
        while (j--) {
          prev = children[j];
          if (prev.type !== 3) {
            break;
          }
        }
        if (prev && isTemplateNode(prev) && findDir(prev, /^(else-)?if$/)) {
          let conditional = dynamicSlots[dynamicSlots.length - 1];
          while (conditional.alternate.type === 19) {
            conditional = conditional.alternate;
          }
          conditional.alternate = vElse.exp ? createConditionalExpression(vElse.exp, buildDynamicSlot(slotName, slotFunction, conditionalBranchIndex++), defaultFallback) : buildDynamicSlot(slotName, slotFunction, conditionalBranchIndex++);
        } else {
          context.onError(createCompilerError(30, vElse.loc));
        }
      } else if (vFor) {
        hasDynamicSlots = true;
        const parseResult = vFor.forParseResult;
        if (parseResult) {
          finalizeForParseResult(parseResult, context);
          dynamicSlots.push(createCallExpression(context.helper(RENDER_LIST), [
            parseResult.source,
            createFunctionExpression(createForLoopParams(parseResult), buildDynamicSlot(slotName, slotFunction), true)
          ]));
        } else {
          context.onError(createCompilerError(32, vFor.loc));
        }
      } else {
        if (staticSlotName) {
          if (seenSlotNames.has(staticSlotName)) {
            context.onError(createCompilerError(38, dirLoc));
            continue;
          }
          seenSlotNames.add(staticSlotName);
          if (staticSlotName === "default") {
            hasNamedDefaultSlot = true;
          }
        }
        slotsProperties.push(createObjectProperty(slotName, slotFunction));
      }
    }
    if (!onComponentSlot) {
      const buildDefaultSlotProperty = (props, children2) => {
        const fn = buildSlotFn(props, undefined, children2, loc);
        if (context.compatConfig) {
          fn.isNonScopedSlot = true;
        }
        return createObjectProperty(`default`, fn);
      };
      if (!hasTemplateSlots) {
        slotsProperties.push(buildDefaultSlotProperty(undefined, children));
      } else if (implicitDefaultChildren.length && implicitDefaultChildren.some((node2) => isNonWhitespaceContent(node2))) {
        if (hasNamedDefaultSlot) {
          context.onError(createCompilerError(39, implicitDefaultChildren[0].loc));
        } else {
          slotsProperties.push(buildDefaultSlotProperty(undefined, implicitDefaultChildren));
        }
      }
    }
    const slotFlag = hasDynamicSlots ? 2 : hasForwardedSlots(node.children) ? 3 : 1;
    let slots = createObjectExpression(slotsProperties.concat(createObjectProperty(`_`, createSimpleExpression(slotFlag + ` /* ${shared.slotFlagsText[slotFlag]} */`, false))), loc);
    if (dynamicSlots.length) {
      slots = createCallExpression(context.helper(CREATE_SLOTS), [
        slots,
        createArrayExpression(dynamicSlots)
      ]);
    }
    return {
      slots,
      hasDynamicSlots
    };
  }
  function buildDynamicSlot(name, fn, index) {
    const props = [
      createObjectProperty(`name`, name),
      createObjectProperty(`fn`, fn)
    ];
    if (index != null) {
      props.push(createObjectProperty(`key`, createSimpleExpression(String(index), true)));
    }
    return createObjectExpression(props);
  }
  function hasForwardedSlots(children) {
    for (let i = 0;i < children.length; i++) {
      const child = children[i];
      switch (child.type) {
        case 1:
          if (child.tagType === 2 || hasForwardedSlots(child.children)) {
            return true;
          }
          break;
        case 9:
          if (hasForwardedSlots(child.branches))
            return true;
          break;
        case 10:
        case 11:
          if (hasForwardedSlots(child.children))
            return true;
          break;
      }
    }
    return false;
  }
  function isNonWhitespaceContent(node) {
    if (node.type !== 2 && node.type !== 12)
      return true;
    return node.type === 2 ? !!node.content.trim() : isNonWhitespaceContent(node.content);
  }
  var directiveImportMap = /* @__PURE__ */ new WeakMap;
  var transformElement = (node, context) => {
    return function postTransformElement() {
      node = context.currentNode;
      if (!(node.type === 1 && (node.tagType === 0 || node.tagType === 1))) {
        return;
      }
      const { tag, props } = node;
      const isComponent2 = node.tagType === 1;
      let vnodeTag = isComponent2 ? resolveComponentType(node, context) : `"${tag}"`;
      const isDynamicComponent = shared.isObject(vnodeTag) && vnodeTag.callee === RESOLVE_DYNAMIC_COMPONENT;
      let vnodeProps;
      let vnodeChildren;
      let patchFlag = 0;
      let vnodeDynamicProps;
      let dynamicPropNames;
      let vnodeDirectives;
      let shouldUseBlock = isDynamicComponent || vnodeTag === TELEPORT || vnodeTag === SUSPENSE || !isComponent2 && (tag === "svg" || tag === "foreignObject" || tag === "math");
      if (props.length > 0) {
        const propsBuildResult = buildProps(node, context, undefined, isComponent2, isDynamicComponent);
        vnodeProps = propsBuildResult.props;
        patchFlag = propsBuildResult.patchFlag;
        dynamicPropNames = propsBuildResult.dynamicPropNames;
        const directives = propsBuildResult.directives;
        vnodeDirectives = directives && directives.length ? createArrayExpression(directives.map((dir) => buildDirectiveArgs(dir, context))) : undefined;
        if (propsBuildResult.shouldUseBlock) {
          shouldUseBlock = true;
        }
      }
      if (node.children.length > 0) {
        if (vnodeTag === KEEP_ALIVE) {
          shouldUseBlock = true;
          patchFlag |= 1024;
          if (node.children.length > 1) {
            context.onError(createCompilerError(46, {
              start: node.children[0].loc.start,
              end: node.children[node.children.length - 1].loc.end,
              source: ""
            }));
          }
        }
        const shouldBuildAsSlots = isComponent2 && vnodeTag !== TELEPORT && vnodeTag !== KEEP_ALIVE;
        if (shouldBuildAsSlots) {
          const { slots, hasDynamicSlots } = buildSlots(node, context);
          vnodeChildren = slots;
          if (hasDynamicSlots) {
            patchFlag |= 1024;
          }
        } else if (node.children.length === 1 && vnodeTag !== TELEPORT) {
          const child = node.children[0];
          const type = child.type;
          const hasDynamicTextChild = type === 5 || type === 8;
          if (hasDynamicTextChild && getConstantType(child, context) === 0) {
            patchFlag |= 1;
          }
          if (hasDynamicTextChild || type === 2) {
            vnodeChildren = child;
          } else {
            vnodeChildren = node.children;
          }
        } else {
          vnodeChildren = node.children;
        }
      }
      if (dynamicPropNames && dynamicPropNames.length) {
        vnodeDynamicProps = stringifyDynamicPropNames(dynamicPropNames);
      }
      node.codegenNode = createVNodeCall(context, vnodeTag, vnodeProps, vnodeChildren, patchFlag === 0 ? undefined : patchFlag, vnodeDynamicProps, vnodeDirectives, !!shouldUseBlock, false, isComponent2, node.loc);
    };
  };
  function resolveComponentType(node, context, ssr = false) {
    let { tag } = node;
    const isExplicitDynamic = isComponentTag(tag);
    const isProp = findProp(node, "is", false, true);
    if (isProp) {
      if (isExplicitDynamic || isCompatEnabled("COMPILER_IS_ON_ELEMENT", context)) {
        let exp;
        if (isProp.type === 6) {
          exp = isProp.value && createSimpleExpression(isProp.value.content, true);
        } else {
          exp = isProp.exp;
          if (!exp) {
            exp = createSimpleExpression(`is`, false, isProp.arg.loc);
            {
              exp = isProp.exp = processExpression(exp, context);
            }
          }
        }
        if (exp) {
          return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPONENT), [
            exp
          ]);
        }
      } else if (isProp.type === 6 && isProp.value.content.startsWith("vue:")) {
        tag = isProp.value.content.slice(4);
      }
    }
    const builtIn = isCoreComponent(tag) || context.isBuiltInComponent(tag);
    if (builtIn) {
      if (!ssr)
        context.helper(builtIn);
      return builtIn;
    }
    {
      const fromSetup = resolveSetupReference(tag, context);
      if (fromSetup) {
        return fromSetup;
      }
      const dotIndex = tag.indexOf(".");
      if (dotIndex > 0) {
        const ns = resolveSetupReference(tag.slice(0, dotIndex), context);
        if (ns) {
          return ns + tag.slice(dotIndex);
        }
      }
    }
    if (context.selfName && shared.capitalize(shared.camelize(tag)) === context.selfName) {
      context.helper(RESOLVE_COMPONENT);
      context.components.add(tag + `__self`);
      return toValidAssetId(tag, `component`);
    }
    context.helper(RESOLVE_COMPONENT);
    context.components.add(tag);
    return toValidAssetId(tag, `component`);
  }
  function resolveSetupReference(name, context) {
    const bindings = context.bindingMetadata;
    if (!bindings || bindings.__isScriptSetup === false) {
      return;
    }
    const camelName = shared.camelize(name);
    const PascalName = shared.capitalize(camelName);
    const checkType = (type) => {
      if (bindings[name] === type) {
        return name;
      }
      if (bindings[camelName] === type) {
        return camelName;
      }
      if (bindings[PascalName] === type) {
        return PascalName;
      }
    };
    const fromConst = checkType("setup-const") || checkType("setup-reactive-const") || checkType("literal-const");
    if (fromConst) {
      return context.inline ? fromConst : `$setup[${JSON.stringify(fromConst)}]`;
    }
    const fromMaybeRef = checkType("setup-let") || checkType("setup-ref") || checkType("setup-maybe-ref");
    if (fromMaybeRef) {
      return context.inline ? `${context.helperString(UNREF)}(${fromMaybeRef})` : `$setup[${JSON.stringify(fromMaybeRef)}]`;
    }
    const fromProps = checkType("props");
    if (fromProps) {
      return `${context.helperString(UNREF)}(${context.inline ? "__props" : "$props"}[${JSON.stringify(fromProps)}])`;
    }
  }
  function buildProps(node, context, props = node.props, isComponent2, isDynamicComponent, ssr = false) {
    const { tag, loc: elementLoc, children } = node;
    let properties = [];
    const mergeArgs = [];
    const runtimeDirectives = [];
    const hasChildren = children.length > 0;
    let shouldUseBlock = false;
    let patchFlag = 0;
    let hasRef = false;
    let hasClassBinding = false;
    let hasStyleBinding = false;
    let hasHydrationEventBinding = false;
    let hasDynamicKeys = false;
    let hasVnodeHook = false;
    const dynamicPropNames = [];
    const pushMergeArg = (arg) => {
      if (properties.length) {
        mergeArgs.push(createObjectExpression(dedupeProperties(properties), elementLoc));
        properties = [];
      }
      if (arg)
        mergeArgs.push(arg);
    };
    const pushRefVForMarker = () => {
      if (context.scopes.vFor > 0) {
        properties.push(createObjectProperty(createSimpleExpression("ref_for", true), createSimpleExpression("true")));
      }
    };
    const analyzePatchFlag = ({ key, value }) => {
      if (isStaticExp(key)) {
        const name = key.content;
        const isEventHandler = shared.isOn(name);
        if (isEventHandler && (!isComponent2 || isDynamicComponent) && name.toLowerCase() !== "onclick" && name !== "onUpdate:modelValue" && !shared.isReservedProp(name)) {
          hasHydrationEventBinding = true;
        }
        if (isEventHandler && shared.isReservedProp(name)) {
          hasVnodeHook = true;
        }
        if (isEventHandler && value.type === 14) {
          value = value.arguments[0];
        }
        if (value.type === 20 || (value.type === 4 || value.type === 8) && getConstantType(value, context) > 0) {
          return;
        }
        if (name === "ref") {
          hasRef = true;
        } else if (name === "class") {
          hasClassBinding = true;
        } else if (name === "style") {
          hasStyleBinding = true;
        } else if (name !== "key" && !dynamicPropNames.includes(name)) {
          dynamicPropNames.push(name);
        }
        if (isComponent2 && (name === "class" || name === "style") && !dynamicPropNames.includes(name)) {
          dynamicPropNames.push(name);
        }
      } else {
        hasDynamicKeys = true;
      }
    };
    for (let i = 0;i < props.length; i++) {
      const prop = props[i];
      if (prop.type === 6) {
        const { loc, name, nameLoc, value } = prop;
        let isStatic = true;
        if (name === "ref") {
          hasRef = true;
          pushRefVForMarker();
          if (value && context.inline) {
            const binding = context.bindingMetadata[value.content];
            if (binding === "setup-let" || binding === "setup-ref" || binding === "setup-maybe-ref") {
              isStatic = false;
              properties.push(createObjectProperty(createSimpleExpression("ref_key", true), createSimpleExpression(value.content, true, value.loc)));
            }
          }
        }
        if (name === "is" && (isComponentTag(tag) || value && value.content.startsWith("vue:") || isCompatEnabled("COMPILER_IS_ON_ELEMENT", context))) {
          continue;
        }
        properties.push(createObjectProperty(createSimpleExpression(name, true, nameLoc), createSimpleExpression(value ? value.content : "", isStatic, value ? value.loc : loc)));
      } else {
        const { name, arg, exp, loc, modifiers } = prop;
        const isVBind = name === "bind";
        const isVOn = name === "on";
        if (name === "slot") {
          if (!isComponent2) {
            context.onError(createCompilerError(40, loc));
          }
          continue;
        }
        if (name === "once" || name === "memo") {
          continue;
        }
        if (name === "is" || isVBind && isStaticArgOf(arg, "is") && (isComponentTag(tag) || isCompatEnabled("COMPILER_IS_ON_ELEMENT", context))) {
          continue;
        }
        if (isVOn && ssr) {
          continue;
        }
        if (isVBind && isStaticArgOf(arg, "key") || isVOn && hasChildren && isStaticArgOf(arg, "vue:before-update")) {
          shouldUseBlock = true;
        }
        if (isVBind && isStaticArgOf(arg, "ref")) {
          pushRefVForMarker();
        }
        if (!arg && (isVBind || isVOn)) {
          hasDynamicKeys = true;
          if (exp) {
            if (isVBind) {
              {
                pushMergeArg();
                {
                  const hasOverridableKeys = mergeArgs.some((arg2) => {
                    if (arg2.type === 15) {
                      return arg2.properties.some(({ key }) => {
                        if (key.type !== 4 || !key.isStatic) {
                          return true;
                        }
                        return key.content !== "class" && key.content !== "style" && !shared.isOn(key.content);
                      });
                    } else {
                      return true;
                    }
                  });
                  if (hasOverridableKeys) {
                    checkCompatEnabled("COMPILER_V_BIND_OBJECT_ORDER", context, loc);
                  }
                }
                if (isCompatEnabled("COMPILER_V_BIND_OBJECT_ORDER", context)) {
                  mergeArgs.unshift(exp);
                  continue;
                }
              }
              pushRefVForMarker();
              pushMergeArg();
              mergeArgs.push(exp);
            } else {
              pushMergeArg({
                type: 14,
                loc,
                callee: context.helper(TO_HANDLERS),
                arguments: isComponent2 ? [exp] : [exp, `true`]
              });
            }
          } else {
            context.onError(createCompilerError(isVBind ? 34 : 35, loc));
          }
          continue;
        }
        if (isVBind && modifiers.some((mod) => mod.content === "prop")) {
          patchFlag |= 32;
        }
        const directiveTransform = context.directiveTransforms[name];
        if (directiveTransform) {
          const { props: props2, needRuntime } = directiveTransform(prop, node, context);
          !ssr && props2.forEach(analyzePatchFlag);
          if (isVOn && arg && !isStaticExp(arg)) {
            pushMergeArg(createObjectExpression(props2, elementLoc));
          } else {
            properties.push(...props2);
          }
          if (needRuntime) {
            runtimeDirectives.push(prop);
            if (shared.isSymbol(needRuntime)) {
              directiveImportMap.set(prop, needRuntime);
            }
          }
        } else if (!shared.isBuiltInDirective(name)) {
          runtimeDirectives.push(prop);
          if (hasChildren) {
            shouldUseBlock = true;
          }
        }
      }
    }
    let propsExpression = undefined;
    if (mergeArgs.length) {
      pushMergeArg();
      if (mergeArgs.length > 1) {
        propsExpression = createCallExpression(context.helper(MERGE_PROPS), mergeArgs, elementLoc);
      } else {
        propsExpression = mergeArgs[0];
      }
    } else if (properties.length) {
      propsExpression = createObjectExpression(dedupeProperties(properties), elementLoc);
    }
    if (hasDynamicKeys) {
      patchFlag |= 16;
    } else {
      if (hasClassBinding && !isComponent2) {
        patchFlag |= 2;
      }
      if (hasStyleBinding && !isComponent2) {
        patchFlag |= 4;
      }
      if (dynamicPropNames.length) {
        patchFlag |= 8;
      }
      if (hasHydrationEventBinding) {
        patchFlag |= 32;
      }
    }
    if (!shouldUseBlock && (patchFlag === 0 || patchFlag === 32) && (hasRef || hasVnodeHook || runtimeDirectives.length > 0)) {
      patchFlag |= 512;
    }
    if (!context.inSSR && propsExpression) {
      switch (propsExpression.type) {
        case 15:
          let classKeyIndex = -1;
          let styleKeyIndex = -1;
          let hasDynamicKey = false;
          for (let i = 0;i < propsExpression.properties.length; i++) {
            const key = propsExpression.properties[i].key;
            if (isStaticExp(key)) {
              if (key.content === "class") {
                classKeyIndex = i;
              } else if (key.content === "style") {
                styleKeyIndex = i;
              }
            } else if (!key.isHandlerKey) {
              hasDynamicKey = true;
            }
          }
          const classProp = propsExpression.properties[classKeyIndex];
          const styleProp = propsExpression.properties[styleKeyIndex];
          if (!hasDynamicKey) {
            if (classProp && !isStaticExp(classProp.value)) {
              classProp.value = createCallExpression(context.helper(NORMALIZE_CLASS), [classProp.value]);
            }
            if (styleProp && (hasStyleBinding || styleProp.value.type === 4 && styleProp.value.content.trim()[0] === `[` || styleProp.value.type === 17)) {
              styleProp.value = createCallExpression(context.helper(NORMALIZE_STYLE), [styleProp.value]);
            }
          } else {
            propsExpression = createCallExpression(context.helper(NORMALIZE_PROPS), [propsExpression]);
          }
          break;
        case 14:
          break;
        default:
          propsExpression = createCallExpression(context.helper(NORMALIZE_PROPS), [
            createCallExpression(context.helper(GUARD_REACTIVE_PROPS), [
              propsExpression
            ])
          ]);
          break;
      }
    }
    return {
      props: propsExpression,
      directives: runtimeDirectives,
      patchFlag,
      dynamicPropNames,
      shouldUseBlock
    };
  }
  function dedupeProperties(properties) {
    const knownProps = /* @__PURE__ */ new Map;
    const deduped = [];
    for (let i = 0;i < properties.length; i++) {
      const prop = properties[i];
      if (prop.key.type === 8 || !prop.key.isStatic) {
        deduped.push(prop);
        continue;
      }
      const name = prop.key.content;
      const existing = knownProps.get(name);
      if (existing) {
        if (name === "style" || name === "class" || shared.isOn(name)) {
          mergeAsArray(existing, prop);
        }
      } else {
        knownProps.set(name, prop);
        deduped.push(prop);
      }
    }
    return deduped;
  }
  function mergeAsArray(existing, incoming) {
    if (existing.value.type === 17) {
      existing.value.elements.push(incoming.value);
    } else {
      existing.value = createArrayExpression([existing.value, incoming.value], existing.loc);
    }
  }
  function buildDirectiveArgs(dir, context) {
    const dirArgs = [];
    const runtime = directiveImportMap.get(dir);
    if (runtime) {
      dirArgs.push(context.helperString(runtime));
    } else {
      const fromSetup = resolveSetupReference("v-" + dir.name, context);
      if (fromSetup) {
        dirArgs.push(fromSetup);
      } else {
        context.helper(RESOLVE_DIRECTIVE);
        context.directives.add(dir.name);
        dirArgs.push(toValidAssetId(dir.name, `directive`));
      }
    }
    const { loc } = dir;
    if (dir.exp)
      dirArgs.push(dir.exp);
    if (dir.arg) {
      if (!dir.exp) {
        dirArgs.push(`void 0`);
      }
      dirArgs.push(dir.arg);
    }
    if (Object.keys(dir.modifiers).length) {
      if (!dir.arg) {
        if (!dir.exp) {
          dirArgs.push(`void 0`);
        }
        dirArgs.push(`void 0`);
      }
      const trueExpression = createSimpleExpression(`true`, false, loc);
      dirArgs.push(createObjectExpression(dir.modifiers.map((modifier) => createObjectProperty(modifier, trueExpression)), loc));
    }
    return createArrayExpression(dirArgs, dir.loc);
  }
  function stringifyDynamicPropNames(props) {
    let propsNamesString = `[`;
    for (let i = 0, l = props.length;i < l; i++) {
      propsNamesString += JSON.stringify(props[i]);
      if (i < l - 1)
        propsNamesString += ", ";
    }
    return propsNamesString + `]`;
  }
  function isComponentTag(tag) {
    return tag === "component" || tag === "Component";
  }
  var transformSlotOutlet = (node, context) => {
    if (isSlotOutlet(node)) {
      const { children, loc } = node;
      const { slotName, slotProps } = processSlotOutlet(node, context);
      const slotArgs = [
        context.prefixIdentifiers ? `_ctx.$slots` : `$slots`,
        slotName,
        "{}",
        "undefined",
        "true"
      ];
      let expectedLen = 2;
      if (slotProps) {
        slotArgs[2] = slotProps;
        expectedLen = 3;
      }
      if (children.length) {
        slotArgs[3] = createFunctionExpression([], children, false, false, loc);
        expectedLen = 4;
      }
      if (context.scopeId && !context.slotted) {
        expectedLen = 5;
      }
      slotArgs.splice(expectedLen);
      node.codegenNode = createCallExpression(context.helper(RENDER_SLOT), slotArgs, loc);
    }
  };
  function processSlotOutlet(node, context) {
    let slotName = `"default"`;
    let slotProps = undefined;
    const nonNameProps = [];
    for (let i = 0;i < node.props.length; i++) {
      const p = node.props[i];
      if (p.type === 6) {
        if (p.value) {
          if (p.name === "name") {
            slotName = JSON.stringify(p.value.content);
          } else {
            p.name = shared.camelize(p.name);
            nonNameProps.push(p);
          }
        }
      } else {
        if (p.name === "bind" && isStaticArgOf(p.arg, "name")) {
          if (p.exp) {
            slotName = p.exp;
          } else if (p.arg && p.arg.type === 4) {
            const name = shared.camelize(p.arg.content);
            slotName = p.exp = createSimpleExpression(name, false, p.arg.loc);
            {
              slotName = p.exp = processExpression(p.exp, context);
            }
          }
        } else {
          if (p.name === "bind" && p.arg && isStaticExp(p.arg)) {
            p.arg.content = shared.camelize(p.arg.content);
          }
          nonNameProps.push(p);
        }
      }
    }
    if (nonNameProps.length > 0) {
      const { props, directives } = buildProps(node, context, nonNameProps, false, false);
      slotProps = props;
      if (directives.length) {
        context.onError(createCompilerError(36, directives[0].loc));
      }
    }
    return {
      slotName,
      slotProps
    };
  }
  var transformOn = (dir, node, context, augmentor) => {
    const { loc, modifiers, arg } = dir;
    if (!dir.exp && !modifiers.length) {
      context.onError(createCompilerError(35, loc));
    }
    let eventName;
    if (arg.type === 4) {
      if (arg.isStatic) {
        let rawName = arg.content;
        if (rawName.startsWith("vnode")) {
          context.onError(createCompilerError(51, arg.loc));
        }
        if (rawName.startsWith("vue:")) {
          rawName = `vnode-${rawName.slice(4)}`;
        }
        const eventString = node.tagType !== 0 || rawName.startsWith("vnode") || !/[A-Z]/.test(rawName) ? shared.toHandlerKey(shared.camelize(rawName)) : `on:${rawName}`;
        eventName = createSimpleExpression(eventString, true, arg.loc);
      } else {
        eventName = createCompoundExpression([
          `${context.helperString(TO_HANDLER_KEY)}(`,
          arg,
          `)`
        ]);
      }
    } else {
      eventName = arg;
      eventName.children.unshift(`${context.helperString(TO_HANDLER_KEY)}(`);
      eventName.children.push(`)`);
    }
    let exp = dir.exp;
    if (exp && !exp.content.trim()) {
      exp = undefined;
    }
    let shouldCache = context.cacheHandlers && !exp && !context.inVOnce;
    if (exp) {
      const isMemberExp = isMemberExpression(exp, context);
      const isInlineStatement = !(isMemberExp || isFnExpression(exp, context));
      const hasMultipleStatements = exp.content.includes(`;`);
      if (context.prefixIdentifiers) {
        isInlineStatement && context.addIdentifiers(`$event`);
        exp = dir.exp = processExpression(exp, context, false, hasMultipleStatements);
        isInlineStatement && context.removeIdentifiers(`$event`);
        shouldCache = context.cacheHandlers && !context.inVOnce && !(exp.type === 4 && exp.constType > 0) && !(isMemberExp && node.tagType === 1) && !hasScopeRef(exp, context.identifiers);
        if (shouldCache && isMemberExp) {
          if (exp.type === 4) {
            exp.content = `${exp.content} && ${exp.content}(...args)`;
          } else {
            exp.children = [...exp.children, ` && `, ...exp.children, `(...args)`];
          }
        }
      }
      if (isInlineStatement || shouldCache && isMemberExp) {
        exp = createCompoundExpression([
          `${isInlineStatement ? context.isTS ? `($event: any)` : `$event` : `${context.isTS ? `
//@ts-ignore
` : ``}(...args)`} => ${hasMultipleStatements ? `{` : `(`}`,
          exp,
          hasMultipleStatements ? `}` : `)`
        ]);
      }
    }
    let ret = {
      props: [
        createObjectProperty(eventName, exp || createSimpleExpression(`() => {}`, false, loc))
      ]
    };
    if (augmentor) {
      ret = augmentor(ret);
    }
    if (shouldCache) {
      ret.props[0].value = context.cache(ret.props[0].value);
    }
    ret.props.forEach((p) => p.key.isHandlerKey = true);
    return ret;
  };
  var transformText = (node, context) => {
    if (node.type === 0 || node.type === 1 || node.type === 11 || node.type === 10) {
      return () => {
        const children = node.children;
        let currentContainer = undefined;
        let hasText = false;
        for (let i = 0;i < children.length; i++) {
          const child = children[i];
          if (isText$1(child)) {
            hasText = true;
            for (let j = i + 1;j < children.length; j++) {
              const next = children[j];
              if (isText$1(next)) {
                if (!currentContainer) {
                  currentContainer = children[i] = createCompoundExpression([child], child.loc);
                }
                currentContainer.children.push(` + `, next);
                children.splice(j, 1);
                j--;
              } else {
                currentContainer = undefined;
                break;
              }
            }
          }
        }
        if (!hasText || children.length === 1 && (node.type === 0 || node.type === 1 && node.tagType === 0 && !node.props.find((p) => p.type === 7 && !context.directiveTransforms[p.name]) && !(node.tag === "template"))) {
          return;
        }
        for (let i = 0;i < children.length; i++) {
          const child = children[i];
          if (isText$1(child) || child.type === 8) {
            const callArgs = [];
            if (child.type !== 2 || child.content !== " ") {
              callArgs.push(child);
            }
            if (!context.ssr && getConstantType(child, context) === 0) {
              callArgs.push(1 + ` /* ${shared.PatchFlagNames[1]} */`);
            }
            children[i] = {
              type: 12,
              content: child,
              loc: child.loc,
              codegenNode: createCallExpression(context.helper(CREATE_TEXT), callArgs)
            };
          }
        }
      };
    }
  };
  var seen$1 = /* @__PURE__ */ new WeakSet;
  var transformOnce = (node, context) => {
    if (node.type === 1 && findDir(node, "once", true)) {
      if (seen$1.has(node) || context.inVOnce || context.inSSR) {
        return;
      }
      seen$1.add(node);
      context.inVOnce = true;
      context.helper(SET_BLOCK_TRACKING);
      return () => {
        context.inVOnce = false;
        const cur = context.currentNode;
        if (cur.codegenNode) {
          cur.codegenNode = context.cache(cur.codegenNode, true, true);
        }
      };
    }
  };
  var transformModel = (dir, node, context) => {
    const { exp, arg } = dir;
    if (!exp) {
      context.onError(createCompilerError(41, dir.loc));
      return createTransformProps();
    }
    const rawExp = exp.loc.source.trim();
    const expString = exp.type === 4 ? exp.content : rawExp;
    const bindingType = context.bindingMetadata[rawExp];
    if (bindingType === "props" || bindingType === "props-aliased") {
      context.onError(createCompilerError(44, exp.loc));
      return createTransformProps();
    }
    const maybeRef = context.inline && (bindingType === "setup-let" || bindingType === "setup-ref" || bindingType === "setup-maybe-ref");
    if (!expString.trim() || !isMemberExpression(exp, context) && !maybeRef) {
      context.onError(createCompilerError(42, exp.loc));
      return createTransformProps();
    }
    if (context.prefixIdentifiers && isSimpleIdentifier(expString) && context.identifiers[expString]) {
      context.onError(createCompilerError(43, exp.loc));
      return createTransformProps();
    }
    const propName = arg ? arg : createSimpleExpression("modelValue", true);
    const eventName = arg ? isStaticExp(arg) ? `onUpdate:${shared.camelize(arg.content)}` : createCompoundExpression(['"onUpdate:" + ', arg]) : `onUpdate:modelValue`;
    let assignmentExp;
    const eventArg = context.isTS ? `($event: any)` : `$event`;
    if (maybeRef) {
      if (bindingType === "setup-ref") {
        assignmentExp = createCompoundExpression([
          `${eventArg} => ((`,
          createSimpleExpression(rawExp, false, exp.loc),
          `).value = $event)`
        ]);
      } else {
        const altAssignment = bindingType === "setup-let" ? `${rawExp} = $event` : `null`;
        assignmentExp = createCompoundExpression([
          `${eventArg} => (${context.helperString(IS_REF)}(${rawExp}) ? (`,
          createSimpleExpression(rawExp, false, exp.loc),
          `).value = $event : ${altAssignment})`
        ]);
      }
    } else {
      assignmentExp = createCompoundExpression([
        `${eventArg} => ((`,
        exp,
        `) = $event)`
      ]);
    }
    const props = [
      createObjectProperty(propName, dir.exp),
      createObjectProperty(eventName, assignmentExp)
    ];
    if (context.prefixIdentifiers && !context.inVOnce && context.cacheHandlers && !hasScopeRef(exp, context.identifiers)) {
      props[1].value = context.cache(props[1].value);
    }
    if (dir.modifiers.length && node.tagType === 1) {
      const modifiers = dir.modifiers.map((m) => m.content).map((m) => (isSimpleIdentifier(m) ? m : JSON.stringify(m)) + `: true`).join(`, `);
      const modifiersKey = arg ? isStaticExp(arg) ? `${arg.content}Modifiers` : createCompoundExpression([arg, ' + "Modifiers"']) : `modelModifiers`;
      props.push(createObjectProperty(modifiersKey, createSimpleExpression(`{ ${modifiers} }`, false, dir.loc, 2)));
    }
    return createTransformProps(props);
  };
  function createTransformProps(props = []) {
    return { props };
  }
  var validDivisionCharRE = /[\w).+\-_$\]]/;
  var transformFilter = (node, context) => {
    if (!isCompatEnabled("COMPILER_FILTERS", context)) {
      return;
    }
    if (node.type === 5) {
      rewriteFilter(node.content, context);
    } else if (node.type === 1) {
      node.props.forEach((prop) => {
        if (prop.type === 7 && prop.name !== "for" && prop.exp) {
          rewriteFilter(prop.exp, context);
        }
      });
    }
  };
  function rewriteFilter(node, context) {
    if (node.type === 4) {
      parseFilter(node, context);
    } else {
      for (let i = 0;i < node.children.length; i++) {
        const child = node.children[i];
        if (typeof child !== "object")
          continue;
        if (child.type === 4) {
          parseFilter(child, context);
        } else if (child.type === 8) {
          rewriteFilter(node, context);
        } else if (child.type === 5) {
          rewriteFilter(child.content, context);
        }
      }
    }
  }
  function parseFilter(node, context) {
    const exp = node.content;
    let inSingle = false;
    let inDouble = false;
    let inTemplateString = false;
    let inRegex = false;
    let curly = 0;
    let square = 0;
    let paren = 0;
    let lastFilterIndex = 0;
    let c, prev, i, expression, filters = [];
    for (i = 0;i < exp.length; i++) {
      prev = c;
      c = exp.charCodeAt(i);
      if (inSingle) {
        if (c === 39 && prev !== 92)
          inSingle = false;
      } else if (inDouble) {
        if (c === 34 && prev !== 92)
          inDouble = false;
      } else if (inTemplateString) {
        if (c === 96 && prev !== 92)
          inTemplateString = false;
      } else if (inRegex) {
        if (c === 47 && prev !== 92)
          inRegex = false;
      } else if (c === 124 && exp.charCodeAt(i + 1) !== 124 && exp.charCodeAt(i - 1) !== 124 && !curly && !square && !paren) {
        if (expression === undefined) {
          lastFilterIndex = i + 1;
          expression = exp.slice(0, i).trim();
        } else {
          pushFilter();
        }
      } else {
        switch (c) {
          case 34:
            inDouble = true;
            break;
          case 39:
            inSingle = true;
            break;
          case 96:
            inTemplateString = true;
            break;
          case 40:
            paren++;
            break;
          case 41:
            paren--;
            break;
          case 91:
            square++;
            break;
          case 93:
            square--;
            break;
          case 123:
            curly++;
            break;
          case 125:
            curly--;
            break;
        }
        if (c === 47) {
          let j = i - 1;
          let p;
          for (;j >= 0; j--) {
            p = exp.charAt(j);
            if (p !== " ")
              break;
          }
          if (!p || !validDivisionCharRE.test(p)) {
            inRegex = true;
          }
        }
      }
    }
    if (expression === undefined) {
      expression = exp.slice(0, i).trim();
    } else if (lastFilterIndex !== 0) {
      pushFilter();
    }
    function pushFilter() {
      filters.push(exp.slice(lastFilterIndex, i).trim());
      lastFilterIndex = i + 1;
    }
    if (filters.length) {
      warnDeprecation("COMPILER_FILTERS", context, node.loc);
      for (i = 0;i < filters.length; i++) {
        expression = wrapFilter(expression, filters[i], context);
      }
      node.content = expression;
      node.ast = undefined;
    }
  }
  function wrapFilter(exp, filter, context) {
    context.helper(RESOLVE_FILTER);
    const i = filter.indexOf("(");
    if (i < 0) {
      context.filters.add(filter);
      return `${toValidAssetId(filter, "filter")}(${exp})`;
    } else {
      const name = filter.slice(0, i);
      const args = filter.slice(i + 1);
      context.filters.add(name);
      return `${toValidAssetId(name, "filter")}(${exp}${args !== ")" ? "," + args : args}`;
    }
  }
  var seen = /* @__PURE__ */ new WeakSet;
  var transformMemo = (node, context) => {
    if (node.type === 1) {
      const dir = findDir(node, "memo");
      if (!dir || seen.has(node)) {
        return;
      }
      seen.add(node);
      return () => {
        const codegenNode = node.codegenNode || context.currentNode.codegenNode;
        if (codegenNode && codegenNode.type === 13) {
          if (node.tagType !== 1) {
            convertToBlock(codegenNode, context);
          }
          node.codegenNode = createCallExpression(context.helper(WITH_MEMO), [
            dir.exp,
            createFunctionExpression(undefined, codegenNode),
            `_cache`,
            String(context.cached.length)
          ]);
          context.cached.push(null);
        }
      };
    }
  };
  function getBaseTransformPreset(prefixIdentifiers) {
    return [
      [
        transformOnce,
        transformIf,
        transformMemo,
        transformFor,
        ...[transformFilter],
        ...prefixIdentifiers ? [
          trackVForSlotScopes,
          transformExpression
        ] : [],
        transformSlotOutlet,
        transformElement,
        trackSlotScopes,
        transformText
      ],
      {
        on: transformOn,
        bind: transformBind,
        model: transformModel
      }
    ];
  }
  function baseCompile(source, options = {}) {
    const onError = options.onError || defaultOnError;
    const isModuleMode = options.mode === "module";
    const prefixIdentifiers = options.prefixIdentifiers === true || isModuleMode;
    if (!prefixIdentifiers && options.cacheHandlers) {
      onError(createCompilerError(49));
    }
    if (options.scopeId && !isModuleMode) {
      onError(createCompilerError(50));
    }
    const resolvedOptions = shared.extend({}, options, {
      prefixIdentifiers
    });
    const ast = shared.isString(source) ? baseParse(source, resolvedOptions) : source;
    const [nodeTransforms, directiveTransforms] = getBaseTransformPreset(prefixIdentifiers);
    if (options.isTS) {
      const { expressionPlugins } = options;
      if (!expressionPlugins || !expressionPlugins.includes("typescript")) {
        options.expressionPlugins = [...expressionPlugins || [], "typescript"];
      }
    }
    transform(ast, shared.extend({}, resolvedOptions, {
      nodeTransforms: [
        ...nodeTransforms,
        ...options.nodeTransforms || []
      ],
      directiveTransforms: shared.extend({}, directiveTransforms, options.directiveTransforms || {})
    }));
    return generate(ast, resolvedOptions);
  }
  var BindingTypes = {
    DATA: "data",
    PROPS: "props",
    PROPS_ALIASED: "props-aliased",
    SETUP_LET: "setup-let",
    SETUP_CONST: "setup-const",
    SETUP_REACTIVE_CONST: "setup-reactive-const",
    SETUP_MAYBE_REF: "setup-maybe-ref",
    SETUP_REF: "setup-ref",
    OPTIONS: "options",
    LITERAL_CONST: "literal-const"
  };
  var noopDirectiveTransform = () => ({ props: [] });
  exports.generateCodeFrame = shared.generateCodeFrame;
  exports.BASE_TRANSITION = BASE_TRANSITION;
  exports.BindingTypes = BindingTypes;
  exports.CAMELIZE = CAMELIZE;
  exports.CAPITALIZE = CAPITALIZE;
  exports.CREATE_BLOCK = CREATE_BLOCK;
  exports.CREATE_COMMENT = CREATE_COMMENT;
  exports.CREATE_ELEMENT_BLOCK = CREATE_ELEMENT_BLOCK;
  exports.CREATE_ELEMENT_VNODE = CREATE_ELEMENT_VNODE;
  exports.CREATE_SLOTS = CREATE_SLOTS;
  exports.CREATE_STATIC = CREATE_STATIC;
  exports.CREATE_TEXT = CREATE_TEXT;
  exports.CREATE_VNODE = CREATE_VNODE;
  exports.CompilerDeprecationTypes = CompilerDeprecationTypes;
  exports.ConstantTypes = ConstantTypes;
  exports.ElementTypes = ElementTypes;
  exports.ErrorCodes = ErrorCodes;
  exports.FRAGMENT = FRAGMENT;
  exports.GUARD_REACTIVE_PROPS = GUARD_REACTIVE_PROPS;
  exports.IS_MEMO_SAME = IS_MEMO_SAME;
  exports.IS_REF = IS_REF;
  exports.KEEP_ALIVE = KEEP_ALIVE;
  exports.MERGE_PROPS = MERGE_PROPS;
  exports.NORMALIZE_CLASS = NORMALIZE_CLASS;
  exports.NORMALIZE_PROPS = NORMALIZE_PROPS;
  exports.NORMALIZE_STYLE = NORMALIZE_STYLE;
  exports.Namespaces = Namespaces;
  exports.NodeTypes = NodeTypes;
  exports.OPEN_BLOCK = OPEN_BLOCK;
  exports.POP_SCOPE_ID = POP_SCOPE_ID;
  exports.PUSH_SCOPE_ID = PUSH_SCOPE_ID;
  exports.RENDER_LIST = RENDER_LIST;
  exports.RENDER_SLOT = RENDER_SLOT;
  exports.RESOLVE_COMPONENT = RESOLVE_COMPONENT;
  exports.RESOLVE_DIRECTIVE = RESOLVE_DIRECTIVE;
  exports.RESOLVE_DYNAMIC_COMPONENT = RESOLVE_DYNAMIC_COMPONENT;
  exports.RESOLVE_FILTER = RESOLVE_FILTER;
  exports.SET_BLOCK_TRACKING = SET_BLOCK_TRACKING;
  exports.SUSPENSE = SUSPENSE;
  exports.TELEPORT = TELEPORT;
  exports.TO_DISPLAY_STRING = TO_DISPLAY_STRING;
  exports.TO_HANDLERS = TO_HANDLERS;
  exports.TO_HANDLER_KEY = TO_HANDLER_KEY;
  exports.TS_NODE_TYPES = TS_NODE_TYPES;
  exports.UNREF = UNREF;
  exports.WITH_CTX = WITH_CTX;
  exports.WITH_DIRECTIVES = WITH_DIRECTIVES;
  exports.WITH_MEMO = WITH_MEMO;
  exports.advancePositionWithClone = advancePositionWithClone;
  exports.advancePositionWithMutation = advancePositionWithMutation;
  exports.assert = assert;
  exports.baseCompile = baseCompile;
  exports.baseParse = baseParse;
  exports.buildDirectiveArgs = buildDirectiveArgs;
  exports.buildProps = buildProps;
  exports.buildSlots = buildSlots;
  exports.checkCompatEnabled = checkCompatEnabled;
  exports.convertToBlock = convertToBlock;
  exports.createArrayExpression = createArrayExpression;
  exports.createAssignmentExpression = createAssignmentExpression;
  exports.createBlockStatement = createBlockStatement;
  exports.createCacheExpression = createCacheExpression;
  exports.createCallExpression = createCallExpression;
  exports.createCompilerError = createCompilerError;
  exports.createCompoundExpression = createCompoundExpression;
  exports.createConditionalExpression = createConditionalExpression;
  exports.createForLoopParams = createForLoopParams;
  exports.createFunctionExpression = createFunctionExpression;
  exports.createIfStatement = createIfStatement;
  exports.createInterpolation = createInterpolation;
  exports.createObjectExpression = createObjectExpression;
  exports.createObjectProperty = createObjectProperty;
  exports.createReturnStatement = createReturnStatement;
  exports.createRoot = createRoot;
  exports.createSequenceExpression = createSequenceExpression;
  exports.createSimpleExpression = createSimpleExpression;
  exports.createStructuralDirectiveTransform = createStructuralDirectiveTransform;
  exports.createTemplateLiteral = createTemplateLiteral;
  exports.createTransformContext = createTransformContext;
  exports.createVNodeCall = createVNodeCall;
  exports.errorMessages = errorMessages;
  exports.extractIdentifiers = extractIdentifiers;
  exports.findDir = findDir;
  exports.findProp = findProp;
  exports.forAliasRE = forAliasRE;
  exports.generate = generate;
  exports.getBaseTransformPreset = getBaseTransformPreset;
  exports.getConstantType = getConstantType;
  exports.getMemoedVNodeCall = getMemoedVNodeCall;
  exports.getVNodeBlockHelper = getVNodeBlockHelper;
  exports.getVNodeHelper = getVNodeHelper;
  exports.hasDynamicKeyVBind = hasDynamicKeyVBind;
  exports.hasScopeRef = hasScopeRef;
  exports.helperNameMap = helperNameMap;
  exports.injectProp = injectProp;
  exports.isCoreComponent = isCoreComponent;
  exports.isFnExpression = isFnExpression;
  exports.isFnExpressionBrowser = isFnExpressionBrowser;
  exports.isFnExpressionNode = isFnExpressionNode;
  exports.isFunctionType = isFunctionType;
  exports.isInDestructureAssignment = isInDestructureAssignment;
  exports.isInNewExpression = isInNewExpression;
  exports.isMemberExpression = isMemberExpression;
  exports.isMemberExpressionBrowser = isMemberExpressionBrowser;
  exports.isMemberExpressionNode = isMemberExpressionNode;
  exports.isReferencedIdentifier = isReferencedIdentifier;
  exports.isSimpleIdentifier = isSimpleIdentifier;
  exports.isSlotOutlet = isSlotOutlet;
  exports.isStaticArgOf = isStaticArgOf;
  exports.isStaticExp = isStaticExp;
  exports.isStaticProperty = isStaticProperty;
  exports.isStaticPropertyKey = isStaticPropertyKey;
  exports.isTemplateNode = isTemplateNode;
  exports.isText = isText$1;
  exports.isVSlot = isVSlot;
  exports.locStub = locStub;
  exports.noopDirectiveTransform = noopDirectiveTransform;
  exports.processExpression = processExpression;
  exports.processFor = processFor;
  exports.processIf = processIf;
  exports.processSlotOutlet = processSlotOutlet;
  exports.registerRuntimeHelpers = registerRuntimeHelpers;
  exports.resolveComponentType = resolveComponentType;
  exports.stringifyExpression = stringifyExpression;
  exports.toValidAssetId = toValidAssetId;
  exports.trackSlotScopes = trackSlotScopes;
  exports.trackVForSlotScopes = trackVForSlotScopes;
  exports.transform = transform;
  exports.transformBind = transformBind;
  exports.transformElement = transformElement;
  exports.transformExpression = transformExpression;
  exports.transformModel = transformModel;
  exports.transformOn = transformOn;
  exports.traverseNode = traverseNode;
  exports.unwrapTSNode = unwrapTSNode;
  exports.walkBlockDeclarations = walkBlockDeclarations;
  exports.walkFunctionParams = walkFunctionParams;
  exports.walkIdentifiers = walkIdentifiers;
  exports.warnDeprecation = warnDeprecation;
});

// ../../../../node_modules/@vue/compiler-dom/dist/compiler-dom.cjs.js
var require_compiler_dom_cjs = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var compilerCore = require_compiler_core_cjs();
  var shared = require_shared_cjs();
  var V_MODEL_RADIO = Symbol(`vModelRadio`);
  var V_MODEL_CHECKBOX = Symbol(`vModelCheckbox`);
  var V_MODEL_TEXT = Symbol(`vModelText`);
  var V_MODEL_SELECT = Symbol(`vModelSelect`);
  var V_MODEL_DYNAMIC = Symbol(`vModelDynamic`);
  var V_ON_WITH_MODIFIERS = Symbol(`vOnModifiersGuard`);
  var V_ON_WITH_KEYS = Symbol(`vOnKeysGuard`);
  var V_SHOW = Symbol(`vShow`);
  var TRANSITION = Symbol(`Transition`);
  var TRANSITION_GROUP = Symbol(`TransitionGroup`);
  compilerCore.registerRuntimeHelpers({
    [V_MODEL_RADIO]: `vModelRadio`,
    [V_MODEL_CHECKBOX]: `vModelCheckbox`,
    [V_MODEL_TEXT]: `vModelText`,
    [V_MODEL_SELECT]: `vModelSelect`,
    [V_MODEL_DYNAMIC]: `vModelDynamic`,
    [V_ON_WITH_MODIFIERS]: `withModifiers`,
    [V_ON_WITH_KEYS]: `withKeys`,
    [V_SHOW]: `vShow`,
    [TRANSITION]: `Transition`,
    [TRANSITION_GROUP]: `TransitionGroup`
  });
  var parserOptions = {
    parseMode: "html",
    isVoidTag: shared.isVoidTag,
    isNativeTag: (tag) => shared.isHTMLTag(tag) || shared.isSVGTag(tag) || shared.isMathMLTag(tag),
    isPreTag: (tag) => tag === "pre",
    isIgnoreNewlineTag: (tag) => tag === "pre" || tag === "textarea",
    decodeEntities: undefined,
    isBuiltInComponent: (tag) => {
      if (tag === "Transition" || tag === "transition") {
        return TRANSITION;
      } else if (tag === "TransitionGroup" || tag === "transition-group") {
        return TRANSITION_GROUP;
      }
    },
    getNamespace(tag, parent, rootNamespace) {
      let ns = parent ? parent.ns : rootNamespace;
      if (parent && ns === 2) {
        if (parent.tag === "annotation-xml") {
          if (tag === "svg") {
            return 1;
          }
          if (parent.props.some((a) => a.type === 6 && a.name === "encoding" && a.value != null && (a.value.content === "text/html" || a.value.content === "application/xhtml+xml"))) {
            ns = 0;
          }
        } else if (/^m(?:[ions]|text)$/.test(parent.tag) && tag !== "mglyph" && tag !== "malignmark") {
          ns = 0;
        }
      } else if (parent && ns === 1) {
        if (parent.tag === "foreignObject" || parent.tag === "desc" || parent.tag === "title") {
          ns = 0;
        }
      }
      if (ns === 0) {
        if (tag === "svg") {
          return 1;
        }
        if (tag === "math") {
          return 2;
        }
      }
      return ns;
    }
  };
  var transformStyle = (node) => {
    if (node.type === 1) {
      node.props.forEach((p, i) => {
        if (p.type === 6 && p.name === "style" && p.value) {
          node.props[i] = {
            type: 7,
            name: `bind`,
            arg: compilerCore.createSimpleExpression(`style`, true, p.loc),
            exp: parseInlineCSS(p.value.content, p.loc),
            modifiers: [],
            loc: p.loc
          };
        }
      });
    }
  };
  var parseInlineCSS = (cssText, loc) => {
    const normalized = shared.parseStringStyle(cssText);
    return compilerCore.createSimpleExpression(JSON.stringify(normalized), false, loc, 3);
  };
  function createDOMCompilerError(code, loc) {
    return compilerCore.createCompilerError(code, loc, DOMErrorMessages);
  }
  var DOMErrorCodes = {
    X_V_HTML_NO_EXPRESSION: 53,
    "53": "X_V_HTML_NO_EXPRESSION",
    X_V_HTML_WITH_CHILDREN: 54,
    "54": "X_V_HTML_WITH_CHILDREN",
    X_V_TEXT_NO_EXPRESSION: 55,
    "55": "X_V_TEXT_NO_EXPRESSION",
    X_V_TEXT_WITH_CHILDREN: 56,
    "56": "X_V_TEXT_WITH_CHILDREN",
    X_V_MODEL_ON_INVALID_ELEMENT: 57,
    "57": "X_V_MODEL_ON_INVALID_ELEMENT",
    X_V_MODEL_ARG_ON_ELEMENT: 58,
    "58": "X_V_MODEL_ARG_ON_ELEMENT",
    X_V_MODEL_ON_FILE_INPUT_ELEMENT: 59,
    "59": "X_V_MODEL_ON_FILE_INPUT_ELEMENT",
    X_V_MODEL_UNNECESSARY_VALUE: 60,
    "60": "X_V_MODEL_UNNECESSARY_VALUE",
    X_V_SHOW_NO_EXPRESSION: 61,
    "61": "X_V_SHOW_NO_EXPRESSION",
    X_TRANSITION_INVALID_CHILDREN: 62,
    "62": "X_TRANSITION_INVALID_CHILDREN",
    X_IGNORED_SIDE_EFFECT_TAG: 63,
    "63": "X_IGNORED_SIDE_EFFECT_TAG",
    __EXTEND_POINT__: 64,
    "64": "__EXTEND_POINT__"
  };
  var DOMErrorMessages = {
    [53]: `v-html is missing expression.`,
    [54]: `v-html will override element children.`,
    [55]: `v-text is missing expression.`,
    [56]: `v-text will override element children.`,
    [57]: `v-model can only be used on <input>, <textarea> and <select> elements.`,
    [58]: `v-model argument is not supported on plain elements.`,
    [59]: `v-model cannot be used on file inputs since they are read-only. Use a v-on:change listener instead.`,
    [60]: `Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior.`,
    [61]: `v-show is missing expression.`,
    [62]: `<Transition> expects exactly one child element or component.`,
    [63]: `Tags with side effect (<script> and <style>) are ignored in client component templates.`
  };
  var transformVHtml = (dir, node, context) => {
    const { exp, loc } = dir;
    if (!exp) {
      context.onError(createDOMCompilerError(53, loc));
    }
    if (node.children.length) {
      context.onError(createDOMCompilerError(54, loc));
      node.children.length = 0;
    }
    return {
      props: [
        compilerCore.createObjectProperty(compilerCore.createSimpleExpression(`innerHTML`, true, loc), exp || compilerCore.createSimpleExpression("", true))
      ]
    };
  };
  var transformVText = (dir, node, context) => {
    const { exp, loc } = dir;
    if (!exp) {
      context.onError(createDOMCompilerError(55, loc));
    }
    if (node.children.length) {
      context.onError(createDOMCompilerError(56, loc));
      node.children.length = 0;
    }
    return {
      props: [
        compilerCore.createObjectProperty(compilerCore.createSimpleExpression(`textContent`, true), exp ? compilerCore.getConstantType(exp, context) > 0 ? exp : compilerCore.createCallExpression(context.helperString(compilerCore.TO_DISPLAY_STRING), [exp], loc) : compilerCore.createSimpleExpression("", true))
      ]
    };
  };
  var transformModel = (dir, node, context) => {
    const baseResult = compilerCore.transformModel(dir, node, context);
    if (!baseResult.props.length || node.tagType === 1) {
      return baseResult;
    }
    if (dir.arg) {
      context.onError(createDOMCompilerError(58, dir.arg.loc));
    }
    function checkDuplicatedValue() {
      const value = compilerCore.findDir(node, "bind");
      if (value && compilerCore.isStaticArgOf(value.arg, "value")) {
        context.onError(createDOMCompilerError(60, value.loc));
      }
    }
    const { tag } = node;
    const isCustomElement = context.isCustomElement(tag);
    if (tag === "input" || tag === "textarea" || tag === "select" || isCustomElement) {
      let directiveToUse = V_MODEL_TEXT;
      let isInvalidType = false;
      if (tag === "input" || isCustomElement) {
        const type = compilerCore.findProp(node, `type`);
        if (type) {
          if (type.type === 7) {
            directiveToUse = V_MODEL_DYNAMIC;
          } else if (type.value) {
            switch (type.value.content) {
              case "radio":
                directiveToUse = V_MODEL_RADIO;
                break;
              case "checkbox":
                directiveToUse = V_MODEL_CHECKBOX;
                break;
              case "file":
                isInvalidType = true;
                context.onError(createDOMCompilerError(59, dir.loc));
                break;
              default:
                checkDuplicatedValue();
                break;
            }
          }
        } else if (compilerCore.hasDynamicKeyVBind(node)) {
          directiveToUse = V_MODEL_DYNAMIC;
        } else {
          checkDuplicatedValue();
        }
      } else if (tag === "select") {
        directiveToUse = V_MODEL_SELECT;
      } else {
        checkDuplicatedValue();
      }
      if (!isInvalidType) {
        baseResult.needRuntime = context.helper(directiveToUse);
      }
    } else {
      context.onError(createDOMCompilerError(57, dir.loc));
    }
    baseResult.props = baseResult.props.filter((p) => !(p.key.type === 4 && p.key.content === "modelValue"));
    return baseResult;
  };
  var isEventOptionModifier = /* @__PURE__ */ shared.makeMap(`passive,once,capture`);
  var isNonKeyModifier = /* @__PURE__ */ shared.makeMap(`stop,prevent,self,ctrl,shift,alt,meta,exact,middle`);
  var maybeKeyModifier = /* @__PURE__ */ shared.makeMap("left,right");
  var isKeyboardEvent = /* @__PURE__ */ shared.makeMap(`onkeyup,onkeydown,onkeypress`);
  var resolveModifiers = (key, modifiers, context, loc) => {
    const keyModifiers = [];
    const nonKeyModifiers = [];
    const eventOptionModifiers = [];
    for (let i = 0;i < modifiers.length; i++) {
      const modifier = modifiers[i].content;
      if (modifier === "native" && compilerCore.checkCompatEnabled("COMPILER_V_ON_NATIVE", context, loc)) {
        eventOptionModifiers.push(modifier);
      } else if (isEventOptionModifier(modifier)) {
        eventOptionModifiers.push(modifier);
      } else {
        if (maybeKeyModifier(modifier)) {
          if (compilerCore.isStaticExp(key)) {
            if (isKeyboardEvent(key.content.toLowerCase())) {
              keyModifiers.push(modifier);
            } else {
              nonKeyModifiers.push(modifier);
            }
          } else {
            keyModifiers.push(modifier);
            nonKeyModifiers.push(modifier);
          }
        } else {
          if (isNonKeyModifier(modifier)) {
            nonKeyModifiers.push(modifier);
          } else {
            keyModifiers.push(modifier);
          }
        }
      }
    }
    return {
      keyModifiers,
      nonKeyModifiers,
      eventOptionModifiers
    };
  };
  var transformClick = (key, event) => {
    const isStaticClick = compilerCore.isStaticExp(key) && key.content.toLowerCase() === "onclick";
    return isStaticClick ? compilerCore.createSimpleExpression(event, true) : key.type !== 4 ? compilerCore.createCompoundExpression([
      `(`,
      key,
      `) === "onClick" ? "${event}" : (`,
      key,
      `)`
    ]) : key;
  };
  var transformOn = (dir, node, context) => {
    return compilerCore.transformOn(dir, node, context, (baseResult) => {
      const { modifiers } = dir;
      if (!modifiers.length)
        return baseResult;
      let { key, value: handlerExp } = baseResult.props[0];
      const { keyModifiers, nonKeyModifiers, eventOptionModifiers } = resolveModifiers(key, modifiers, context, dir.loc);
      if (nonKeyModifiers.includes("right")) {
        key = transformClick(key, `onContextmenu`);
      }
      if (nonKeyModifiers.includes("middle")) {
        key = transformClick(key, `onMouseup`);
      }
      if (nonKeyModifiers.length) {
        handlerExp = compilerCore.createCallExpression(context.helper(V_ON_WITH_MODIFIERS), [
          handlerExp,
          JSON.stringify(nonKeyModifiers)
        ]);
      }
      if (keyModifiers.length && (!compilerCore.isStaticExp(key) || isKeyboardEvent(key.content.toLowerCase()))) {
        handlerExp = compilerCore.createCallExpression(context.helper(V_ON_WITH_KEYS), [
          handlerExp,
          JSON.stringify(keyModifiers)
        ]);
      }
      if (eventOptionModifiers.length) {
        const modifierPostfix = eventOptionModifiers.map(shared.capitalize).join("");
        key = compilerCore.isStaticExp(key) ? compilerCore.createSimpleExpression(`${key.content}${modifierPostfix}`, true) : compilerCore.createCompoundExpression([`(`, key, `) + "${modifierPostfix}"`]);
      }
      return {
        props: [compilerCore.createObjectProperty(key, handlerExp)]
      };
    });
  };
  var transformShow = (dir, node, context) => {
    const { exp, loc } = dir;
    if (!exp) {
      context.onError(createDOMCompilerError(61, loc));
    }
    return {
      props: [],
      needRuntime: context.helper(V_SHOW)
    };
  };
  var transformTransition = (node, context) => {
    if (node.type === 1 && node.tagType === 1) {
      const component = context.isBuiltInComponent(node.tag);
      if (component === TRANSITION) {
        return () => {
          if (!node.children.length) {
            return;
          }
          if (hasMultipleChildren(node)) {
            context.onError(createDOMCompilerError(62, {
              start: node.children[0].loc.start,
              end: node.children[node.children.length - 1].loc.end,
              source: ""
            }));
          }
          const child = node.children[0];
          if (child.type === 1) {
            for (const p of child.props) {
              if (p.type === 7 && p.name === "show") {
                node.props.push({
                  type: 6,
                  name: "persisted",
                  nameLoc: node.loc,
                  value: undefined,
                  loc: node.loc
                });
              }
            }
          }
        };
      }
    }
  };
  function hasMultipleChildren(node) {
    const children = node.children = node.children.filter((c) => c.type !== 3 && !(c.type === 2 && !c.content.trim()));
    const child = children[0];
    return children.length !== 1 || child.type === 11 || child.type === 9 && child.branches.some(hasMultipleChildren);
  }
  var expReplaceRE = /__VUE_EXP_START__(.*?)__VUE_EXP_END__/g;
  var stringifyStatic = (children, context, parent) => {
    if (context.scopes.vSlot > 0) {
      return;
    }
    const isParentCached = parent.type === 1 && parent.codegenNode && parent.codegenNode.type === 13 && parent.codegenNode.children && !shared.isArray(parent.codegenNode.children) && parent.codegenNode.children.type === 20;
    let nc = 0;
    let ec = 0;
    const currentChunk = [];
    const stringifyCurrentChunk = (currentIndex) => {
      if (nc >= 20 || ec >= 5) {
        const staticCall = compilerCore.createCallExpression(context.helper(compilerCore.CREATE_STATIC), [
          JSON.stringify(currentChunk.map((node) => stringifyNode(node, context)).join("")).replace(expReplaceRE, `" + $1 + "`),
          String(currentChunk.length)
        ]);
        const deleteCount = currentChunk.length - 1;
        if (isParentCached) {
          children.splice(currentIndex - currentChunk.length, currentChunk.length, staticCall);
        } else {
          currentChunk[0].codegenNode.value = staticCall;
          if (currentChunk.length > 1) {
            children.splice(currentIndex - currentChunk.length + 1, deleteCount);
            const cacheIndex = context.cached.indexOf(currentChunk[currentChunk.length - 1].codegenNode);
            if (cacheIndex > -1) {
              for (let i2 = cacheIndex;i2 < context.cached.length; i2++) {
                const c = context.cached[i2];
                if (c)
                  c.index -= deleteCount;
              }
              context.cached.splice(cacheIndex - deleteCount + 1, deleteCount);
            }
          }
        }
        return deleteCount;
      }
      return 0;
    };
    let i = 0;
    for (;i < children.length; i++) {
      const child = children[i];
      const isCached = isParentCached || getCachedNode(child);
      if (isCached) {
        const result = analyzeNode(child);
        if (result) {
          nc += result[0];
          ec += result[1];
          currentChunk.push(child);
          continue;
        }
      }
      i -= stringifyCurrentChunk(i);
      nc = 0;
      ec = 0;
      currentChunk.length = 0;
    }
    stringifyCurrentChunk(i);
  };
  var getCachedNode = (node) => {
    if ((node.type === 1 && node.tagType === 0 || node.type === 12) && node.codegenNode && node.codegenNode.type === 20) {
      return node.codegenNode;
    }
  };
  var dataAriaRE = /^(data|aria)-/;
  var isStringifiableAttr = (name, ns) => {
    return (ns === 0 ? shared.isKnownHtmlAttr(name) : ns === 1 ? shared.isKnownSvgAttr(name) : ns === 2 ? shared.isKnownMathMLAttr(name) : false) || dataAriaRE.test(name);
  };
  var isNonStringifiable = /* @__PURE__ */ shared.makeMap(`caption,thead,tr,th,tbody,td,tfoot,colgroup,col`);
  function analyzeNode(node) {
    if (node.type === 1 && isNonStringifiable(node.tag)) {
      return false;
    }
    if (node.type === 12) {
      return [1, 0];
    }
    let nc = 1;
    let ec = node.props.length > 0 ? 1 : 0;
    let bailed = false;
    const bail = () => {
      bailed = true;
      return false;
    };
    function walk(node2) {
      const isOptionTag = node2.tag === "option" && node2.ns === 0;
      for (let i = 0;i < node2.props.length; i++) {
        const p = node2.props[i];
        if (p.type === 6 && !isStringifiableAttr(p.name, node2.ns)) {
          return bail();
        }
        if (p.type === 7 && p.name === "bind") {
          if (p.arg && (p.arg.type === 8 || p.arg.isStatic && !isStringifiableAttr(p.arg.content, node2.ns))) {
            return bail();
          }
          if (p.exp && (p.exp.type === 8 || p.exp.constType < 3)) {
            return bail();
          }
          if (isOptionTag && compilerCore.isStaticArgOf(p.arg, "value") && p.exp && !p.exp.isStatic) {
            return bail();
          }
        }
      }
      for (let i = 0;i < node2.children.length; i++) {
        nc++;
        const child = node2.children[i];
        if (child.type === 1) {
          if (child.props.length > 0) {
            ec++;
          }
          walk(child);
          if (bailed) {
            return false;
          }
        }
      }
      return true;
    }
    return walk(node) ? [nc, ec] : false;
  }
  function stringifyNode(node, context) {
    if (shared.isString(node)) {
      return node;
    }
    if (shared.isSymbol(node)) {
      return ``;
    }
    switch (node.type) {
      case 1:
        return stringifyElement(node, context);
      case 2:
        return shared.escapeHtml(node.content);
      case 3:
        return `<!--${shared.escapeHtml(node.content)}-->`;
      case 5:
        return shared.escapeHtml(shared.toDisplayString(evaluateConstant(node.content)));
      case 8:
        return shared.escapeHtml(evaluateConstant(node));
      case 12:
        return stringifyNode(node.content, context);
      default:
        return "";
    }
  }
  function stringifyElement(node, context) {
    let res = `<${node.tag}`;
    let innerHTML = "";
    for (let i = 0;i < node.props.length; i++) {
      const p = node.props[i];
      if (p.type === 6) {
        res += ` ${p.name}`;
        if (p.value) {
          res += `="${shared.escapeHtml(p.value.content)}"`;
        }
      } else if (p.type === 7) {
        if (p.name === "bind") {
          const exp = p.exp;
          if (exp.content[0] === "_") {
            res += ` ${p.arg.content}="__VUE_EXP_START__${exp.content}__VUE_EXP_END__"`;
            continue;
          }
          if (shared.isBooleanAttr(p.arg.content) && exp.content === "false") {
            continue;
          }
          let evaluated = evaluateConstant(exp);
          if (evaluated != null) {
            const arg = p.arg && p.arg.content;
            if (arg === "class") {
              evaluated = shared.normalizeClass(evaluated);
            } else if (arg === "style") {
              evaluated = shared.stringifyStyle(shared.normalizeStyle(evaluated));
            }
            res += ` ${p.arg.content}="${shared.escapeHtml(evaluated)}"`;
          }
        } else if (p.name === "html") {
          innerHTML = evaluateConstant(p.exp);
        } else if (p.name === "text") {
          innerHTML = shared.escapeHtml(shared.toDisplayString(evaluateConstant(p.exp)));
        }
      }
    }
    if (context.scopeId) {
      res += ` ${context.scopeId}`;
    }
    res += `>`;
    if (innerHTML) {
      res += innerHTML;
    } else {
      for (let i = 0;i < node.children.length; i++) {
        res += stringifyNode(node.children[i], context);
      }
    }
    if (!shared.isVoidTag(node.tag)) {
      res += `</${node.tag}>`;
    }
    return res;
  }
  function evaluateConstant(exp) {
    if (exp.type === 4) {
      return new Function(`return (${exp.content})`)();
    } else {
      let res = ``;
      exp.children.forEach((c) => {
        if (shared.isString(c) || shared.isSymbol(c)) {
          return;
        }
        if (c.type === 2) {
          res += c.content;
        } else if (c.type === 5) {
          res += shared.toDisplayString(evaluateConstant(c.content));
        } else {
          res += evaluateConstant(c);
        }
      });
      return res;
    }
  }
  var ignoreSideEffectTags = (node, context) => {
    if (node.type === 1 && node.tagType === 0 && (node.tag === "script" || node.tag === "style")) {
      context.onError(createDOMCompilerError(63, node.loc));
      context.removeNode();
    }
  };
  function isValidHTMLNesting(parent, child) {
    if (parent === "template") {
      return true;
    }
    if (parent in onlyValidChildren) {
      return onlyValidChildren[parent].has(child);
    }
    if (child in onlyValidParents) {
      return onlyValidParents[child].has(parent);
    }
    if (parent in knownInvalidChildren) {
      if (knownInvalidChildren[parent].has(child))
        return false;
    }
    if (child in knownInvalidParents) {
      if (knownInvalidParents[child].has(parent))
        return false;
    }
    return true;
  }
  var headings = /* @__PURE__ */ new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);
  var emptySet = /* @__PURE__ */ new Set([]);
  var onlyValidChildren = {
    head: /* @__PURE__ */ new Set([
      "base",
      "basefront",
      "bgsound",
      "link",
      "meta",
      "title",
      "noscript",
      "noframes",
      "style",
      "script",
      "template"
    ]),
    optgroup: /* @__PURE__ */ new Set(["option"]),
    select: /* @__PURE__ */ new Set(["optgroup", "option", "hr"]),
    table: /* @__PURE__ */ new Set(["caption", "colgroup", "tbody", "tfoot", "thead"]),
    tr: /* @__PURE__ */ new Set(["td", "th"]),
    colgroup: /* @__PURE__ */ new Set(["col"]),
    tbody: /* @__PURE__ */ new Set(["tr"]),
    thead: /* @__PURE__ */ new Set(["tr"]),
    tfoot: /* @__PURE__ */ new Set(["tr"]),
    script: emptySet,
    iframe: emptySet,
    option: emptySet,
    textarea: emptySet,
    style: emptySet,
    title: emptySet
  };
  var onlyValidParents = {
    html: emptySet,
    body: /* @__PURE__ */ new Set(["html"]),
    head: /* @__PURE__ */ new Set(["html"]),
    td: /* @__PURE__ */ new Set(["tr"]),
    colgroup: /* @__PURE__ */ new Set(["table"]),
    caption: /* @__PURE__ */ new Set(["table"]),
    tbody: /* @__PURE__ */ new Set(["table"]),
    tfoot: /* @__PURE__ */ new Set(["table"]),
    col: /* @__PURE__ */ new Set(["colgroup"]),
    th: /* @__PURE__ */ new Set(["tr"]),
    thead: /* @__PURE__ */ new Set(["table"]),
    tr: /* @__PURE__ */ new Set(["tbody", "thead", "tfoot"]),
    dd: /* @__PURE__ */ new Set(["dl", "div"]),
    dt: /* @__PURE__ */ new Set(["dl", "div"]),
    figcaption: /* @__PURE__ */ new Set(["figure"]),
    summary: /* @__PURE__ */ new Set(["details"]),
    area: /* @__PURE__ */ new Set(["map"])
  };
  var knownInvalidChildren = {
    p: /* @__PURE__ */ new Set([
      "address",
      "article",
      "aside",
      "blockquote",
      "center",
      "details",
      "dialog",
      "dir",
      "div",
      "dl",
      "fieldset",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "hgroup",
      "hr",
      "li",
      "main",
      "nav",
      "menu",
      "ol",
      "p",
      "pre",
      "section",
      "table",
      "ul"
    ]),
    svg: /* @__PURE__ */ new Set([
      "b",
      "blockquote",
      "br",
      "code",
      "dd",
      "div",
      "dl",
      "dt",
      "em",
      "embed",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "hr",
      "i",
      "img",
      "li",
      "menu",
      "meta",
      "ol",
      "p",
      "pre",
      "ruby",
      "s",
      "small",
      "span",
      "strong",
      "sub",
      "sup",
      "table",
      "u",
      "ul",
      "var"
    ])
  };
  var knownInvalidParents = {
    a: /* @__PURE__ */ new Set(["a"]),
    button: /* @__PURE__ */ new Set(["button"]),
    dd: /* @__PURE__ */ new Set(["dd", "dt"]),
    dt: /* @__PURE__ */ new Set(["dd", "dt"]),
    form: /* @__PURE__ */ new Set(["form"]),
    li: /* @__PURE__ */ new Set(["li"]),
    h1: headings,
    h2: headings,
    h3: headings,
    h4: headings,
    h5: headings,
    h6: headings
  };
  var validateHtmlNesting = (node, context) => {
    if (node.type === 1 && node.tagType === 0 && context.parent && context.parent.type === 1 && context.parent.tagType === 0 && !isValidHTMLNesting(context.parent.tag, node.tag)) {
      const error = new SyntaxError(`<${node.tag}> cannot be child of <${context.parent.tag}>, according to HTML specifications. This can cause hydration errors or potentially disrupt future functionality.`);
      error.loc = node.loc;
      context.onWarn(error);
    }
  };
  var DOMNodeTransforms = [
    transformStyle,
    ...[transformTransition, validateHtmlNesting]
  ];
  var DOMDirectiveTransforms = {
    cloak: compilerCore.noopDirectiveTransform,
    html: transformVHtml,
    text: transformVText,
    model: transformModel,
    on: transformOn,
    show: transformShow
  };
  function compile(src, options = {}) {
    return compilerCore.baseCompile(src, shared.extend({}, parserOptions, options, {
      nodeTransforms: [
        ignoreSideEffectTags,
        ...DOMNodeTransforms,
        ...options.nodeTransforms || []
      ],
      directiveTransforms: shared.extend({}, DOMDirectiveTransforms, options.directiveTransforms || {}),
      transformHoist: stringifyStatic
    }));
  }
  function parse(template, options = {}) {
    return compilerCore.baseParse(template, shared.extend({}, parserOptions, options));
  }
  exports.DOMDirectiveTransforms = DOMDirectiveTransforms;
  exports.DOMErrorCodes = DOMErrorCodes;
  exports.DOMErrorMessages = DOMErrorMessages;
  exports.DOMNodeTransforms = DOMNodeTransforms;
  exports.TRANSITION = TRANSITION;
  exports.TRANSITION_GROUP = TRANSITION_GROUP;
  exports.V_MODEL_CHECKBOX = V_MODEL_CHECKBOX;
  exports.V_MODEL_DYNAMIC = V_MODEL_DYNAMIC;
  exports.V_MODEL_RADIO = V_MODEL_RADIO;
  exports.V_MODEL_SELECT = V_MODEL_SELECT;
  exports.V_MODEL_TEXT = V_MODEL_TEXT;
  exports.V_ON_WITH_KEYS = V_ON_WITH_KEYS;
  exports.V_ON_WITH_MODIFIERS = V_ON_WITH_MODIFIERS;
  exports.V_SHOW = V_SHOW;
  exports.compile = compile;
  exports.createDOMCompilerError = createDOMCompilerError;
  exports.parse = parse;
  exports.parserOptions = parserOptions;
  exports.transformStyle = transformStyle;
  Object.keys(compilerCore).forEach(function(k) {
    if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k))
      exports[k] = compilerCore[k];
  });
});

export { require_shared_cjs, require_source_map, require_compiler_dom_cjs };
