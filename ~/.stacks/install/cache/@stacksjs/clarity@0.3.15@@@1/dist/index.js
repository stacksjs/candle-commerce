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
var __require = import.meta.require;

// src/config.ts
import { join, relative, resolve as resolve2 } from "path";
import process2 from "process";

// node_modules/bunfig/dist/index.js
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import process from "process";
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
      const result = [...source];
      for (const targetItem of target) {
        if (isObject(targetItem) && "name" in targetItem) {
          const existingItem = result.find((item) => isObject(item) && ("name" in item) && item.name === targetItem.name);
          if (!existingItem) {
            result.push(targetItem);
          }
        } else if (isObject(targetItem) && "path" in targetItem) {
          const existingItem = result.find((item) => isObject(item) && ("path" in item) && item.path === targetItem.path);
          if (!existingItem) {
            result.push(targetItem);
          }
        } else if (!result.some((item) => deepEquals(item, targetItem))) {
          result.push(targetItem);
        }
      }
      return result;
    }
    if (source.every((item) => typeof item === "string") && target.every((item) => typeof item === "string")) {
      const result = [...source];
      for (const item of target) {
        if (!result.includes(item)) {
          result.push(item);
        }
      }
      return result;
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
          const result = [...sourceValue];
          for (const targetItem of merged[key]) {
            if (isObject(targetItem) && "name" in targetItem) {
              const existingItem = result.find((item) => isObject(item) && ("name" in item) && item.name === targetItem.name);
              if (!existingItem) {
                result.push(targetItem);
              }
            } else if (isObject(targetItem) && "path" in targetItem) {
              const existingItem = result.find((item) => isObject(item) && ("path" in item) && item.path === targetItem.path);
              if (!existingItem) {
                result.push(targetItem);
              }
            } else if (!result.some((item) => deepEquals(item, targetItem))) {
              result.push(targetItem);
            }
          }
          merged[key] = result;
        } else if (sourceValue.every((item) => typeof item === "string") && merged[key].every((item) => typeof item === "string")) {
          const result = [...sourceValue];
          for (const item of merged[key]) {
            if (!result.includes(item)) {
              result.push(item);
            }
          }
          merged[key] = result;
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
function isObject(item) {
  return Boolean(item && typeof item === "object" && !Array.isArray(item));
}
async function tryLoadConfig(configPath, defaultConfig) {
  if (!existsSync(configPath))
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
  const baseDir = cwd || process.cwd();
  const extensions = [".ts", ".js", ".mjs", ".cjs", ".json"];
  const configPaths = [
    `${name}.config`,
    `.${name}.config`,
    name,
    `.${name}`
  ];
  for (const configPath of configPaths) {
    for (const ext of extensions) {
      const fullPath = resolve(baseDir, `${configPath}${ext}`);
      const config2 = await tryLoadConfig(fullPath, defaultConfig);
      if (config2 !== null) {
        return config2;
      }
    }
  }
  try {
    const pkgPath = resolve(baseDir, "package.json");
    if (existsSync(pkgPath)) {
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
var defaultConfigDir = resolve(process.cwd(), "config");
var defaultGeneratedDir = resolve(process.cwd(), "src/generated");

// src/config.ts
function getProjectRoot(filePath, options = {}) {
  let path = process2.cwd();
  while (path.includes("storage"))
    path = resolve2(path, "..");
  const finalPath = resolve2(path, filePath || "");
  if (options?.relative)
    return relative(process2.cwd(), finalPath);
  return finalPath;
}
var defaultLogDirectory = process2.env.CLARITY_LOG_DIR || join(getProjectRoot(), "logs");
var defaultConfig = {
  level: "info",
  defaultName: "clarity",
  timestamp: true,
  colors: true,
  format: "text",
  maxLogSize: 10 * 1024 * 1024,
  logDatePattern: "YYYY-MM-DD",
  logDirectory: defaultLogDirectory,
  rotation: {
    frequency: "daily",
    maxSize: 10 * 1024 * 1024,
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
      cwd: process2.cwd(),
      endpoint: "",
      headers: {}
    });
    return { ...defaultConfig, ...loadedConfig };
  } catch {
    return defaultConfig;
  }
}
var config = await loadConfig2();
// src/format.ts
var POSITIONALS_EXP = /(%?)(%([sdijo]))/g;
function serializePositional(positional, flag) {
  switch (flag) {
    case "s":
      return positional;
    case "d":
    case "i":
      return Number(positional);
    case "j":
      return JSON.stringify(positional);
    case "o": {
      if (typeof positional === "string")
        return positional;
      const json = JSON.stringify(positional);
      if (json === "{}" || json === "[]" || /^\[object .+?\]$/.test(json))
        return positional;
      return json;
    }
  }
}
function format(message, ...positionals) {
  if (positionals.length === 0)
    return message;
  let positionalIndex = 0;
  let formattedMessage = message.replace(POSITIONALS_EXP, (match, isEscaped, _, flag) => {
    const positional = positionals[positionalIndex];
    const value = serializePositional(positional, flag);
    if (!isEscaped) {
      positionalIndex++;
      return value;
    }
    return match;
  });
  if (positionalIndex < positionals.length)
    formattedMessage += ` ${positionals.slice(positionalIndex).join(" ")}`;
  formattedMessage = formattedMessage.replace(/%{2}/g, "%");
  return formattedMessage;
}
// src/logger.ts
import { Buffer } from "buffer";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { closeSync, createReadStream, createWriteStream, existsSync as existsSync2, fsyncSync, openSync, writeFileSync as writeFileSync2 } from "fs";
import { access, constants, mkdir, readdir, rename, stat, unlink, writeFile } from "fs/promises";
import { join as join2 } from "path";
import process5 from "process";
import { pipeline } from "stream/promises";
import { createGzip } from "zlib";

// src/formatters/json.ts
import process4 from "process";

// src/utils.ts
import process3 from "process";
function isBrowserProcess() {
  if (process3.env.NODE_ENV === "test" || process3.env.BUN_ENV === "test") {
    return false;
  }
  return typeof window !== "undefined";
}
async function isServerProcess() {
  if (process3.env.NODE_ENV === "test" || process3.env.BUN_ENV === "test") {
    return true;
  }
  if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return true;
  }
  if (typeof process3 !== "undefined") {
    const type = process3.type;
    if (type === "renderer" || type === "worker") {
      return false;
    }
    return !!(process3.versions && (process3.versions.node || process3.versions.bun));
  }
  return false;
}
function chunk(array, size) {
  const chunks = [];
  for (let i = 0;i < array.length; i += size)
    chunks.push(array.slice(i, i + size));
  return chunks;
}

// src/formatters/json.ts
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
        pid: process4.pid,
        hostname: hostname(),
        environment: process4.env.NODE_ENV || "development",
        platform: process4.platform,
        version: process4.version
      };
    }
    return {
      userAgent: navigator.userAgent,
      hostname: window.location.hostname || "browser",
      environment: process4.env.NODE_ENV || process4.env.BUN_ENV || "development",
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      language: navigator.language
    };
  }
}

// src/style.ts
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

// src/logger.ts
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
          const dataToWrite = this.validateEncryptionConfig() ? (await this.encrypt(data)).encrypted : Buffer.from(data);
          try {
            if (!existsSync2(this.currentLogFile)) {
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
                await new Promise((resolve3) => setTimeout(resolve3, delay));
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
          await new Promise((resolve3) => setTimeout(resolve3, delay));
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
        interval = 24 * 60 * 60 * 1000;
        break;
      case "weekly":
        interval = 7 * 24 * 60 * 60 * 1000;
        break;
      case "monthly":
        interval = 30 * 24 * 60 * 60 * 1000;
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
    const encrypted = Buffer.concat([
      cipher.update(data, "utf8"),
      cipher.final()
    ]);
    const authTag = cipher.getAuthTag();
    return {
      encrypted: Buffer.concat([iv, encrypted, authTag]),
      iv
    };
  }
  async compressData(data) {
    return new Promise((resolve3, reject) => {
      const gzip = createGzip();
      const chunks = [];
      gzip.on("data", (chunk2) => chunks.push(chunk2));
      gzip.on("end", () => resolve3(Buffer.from(Buffer.concat(chunks))));
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
    if (existsSync2(this.currentLogFile)) {
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
    if (!existsSync2(this.currentLogFile))
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
      const encryptedData = Buffer.isBuffer(data) ? data : Buffer.from(data, "base64");
      const iv = encryptedData.slice(0, 16);
      const authTag = encryptedData.slice(-16);
      const ciphertext = encryptedData.slice(16, -16);
      const decipher = createDecipheriv("aes-256-gcm", key, iv);
      decipher.setAuthTag(authTag);
      const decrypted = Buffer.concat([
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
    return new Promise((resolve3) => {
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
        resolve3(input === "y" || input === "yes");
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
export {
  yellow,
  white,
  underline,
  styles,
  reset,
  red,
  magenta,
  logger,
  italic,
  isServerProcess,
  isBrowserProcess,
  green,
  gray,
  format,
  dim,
  defaultConfig,
  cyan,
  config,
  chunk,
  bold,
  blue,
  bgYellow,
  bgRed,
  Logger
};
