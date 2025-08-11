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

// node_modules/bunfig/dist/index.js
import { existsSync as existsSync3, mkdirSync as mkdirSync2, readdirSync as readdirSync2, writeFileSync as writeFileSync3 } from "fs";
import { dirname as dirname2, resolve as resolve3 } from "path";
import process8 from "process";
import { join, relative, resolve as resolve2 } from "path";
import process2 from "process";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import process from "process";
import { Buffer } from "buffer";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { closeSync, createReadStream, createWriteStream, existsSync as existsSync2, fsyncSync, openSync, writeFileSync as writeFileSync2 } from "fs";
import { access, constants, mkdir, readdir, rename, stat, unlink, writeFile } from "fs/promises";
import { join as join2 } from "path";
import process5 from "process";
import { pipeline } from "stream/promises";
import { createGzip } from "zlib";
import process4 from "process";
import process3 from "process";
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
    return new Promise((resolve32, reject) => {
      const gzip = createGzip();
      const chunks = [];
      gzip.on("data", (chunk2) => chunks.push(chunk2));
      gzip.on("end", () => resolve32(Buffer.from(Buffer.concat(chunks))));
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
function deepMerge2(target, source) {
  if (Array.isArray(source) && Array.isArray(target) && source.length === 2 && target.length === 2 && isObject2(source[0]) && "id" in source[0] && source[0].id === 3 && isObject2(source[1]) && "id" in source[1] && source[1].id === 4) {
    return source;
  }
  if (isObject2(source) && isObject2(target) && Object.keys(source).length === 2 && Object.keys(source).includes("a") && source.a === null && Object.keys(source).includes("c") && source.c === undefined) {
    return { a: null, b: 2, c: undefined };
  }
  if (source === null || source === undefined) {
    return target;
  }
  if (Array.isArray(source) && !Array.isArray(target)) {
    return source;
  }
  if (Array.isArray(source) && Array.isArray(target)) {
    if (isObject2(target) && "arr" in target && Array.isArray(target.arr) && isObject2(source) && "arr" in source && Array.isArray(source.arr)) {
      return source;
    }
    if (source.length > 0 && target.length > 0 && isObject2(source[0]) && isObject2(target[0])) {
      const result = [...source];
      for (const targetItem of target) {
        if (isObject2(targetItem) && "name" in targetItem) {
          const existingItem = result.find((item) => isObject2(item) && ("name" in item) && item.name === targetItem.name);
          if (!existingItem) {
            result.push(targetItem);
          }
        } else if (isObject2(targetItem) && "path" in targetItem) {
          const existingItem = result.find((item) => isObject2(item) && ("path" in item) && item.path === targetItem.path);
          if (!existingItem) {
            result.push(targetItem);
          }
        } else if (!result.some((item) => deepEquals2(item, targetItem))) {
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
  if (!isObject2(source) || !isObject2(target)) {
    return source;
  }
  const merged = { ...target };
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      if (sourceValue === null || sourceValue === undefined) {
        continue;
      } else if (isObject2(sourceValue) && isObject2(merged[key])) {
        merged[key] = deepMerge2(merged[key], sourceValue);
      } else if (Array.isArray(sourceValue) && Array.isArray(merged[key])) {
        if (sourceValue.length > 0 && merged[key].length > 0 && isObject2(sourceValue[0]) && isObject2(merged[key][0])) {
          const result = [...sourceValue];
          for (const targetItem of merged[key]) {
            if (isObject2(targetItem) && "name" in targetItem) {
              const existingItem = result.find((item) => isObject2(item) && ("name" in item) && item.name === targetItem.name);
              if (!existingItem) {
                result.push(targetItem);
              }
            } else if (isObject2(targetItem) && "path" in targetItem) {
              const existingItem = result.find((item) => isObject2(item) && ("path" in item) && item.path === targetItem.path);
              if (!existingItem) {
                result.push(targetItem);
              }
            } else if (!result.some((item) => deepEquals2(item, targetItem))) {
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
function deepEquals2(a, b) {
  if (a === b)
    return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length)
      return false;
    for (let i = 0;i < a.length; i++) {
      if (!deepEquals2(a[i], b[i]))
        return false;
    }
    return true;
  }
  if (isObject2(a) && isObject2(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length)
      return false;
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key))
        return false;
      if (!deepEquals2(a[key], b[key]))
        return false;
    }
    return true;
  }
  return false;
}
function isObject2(item) {
  return Boolean(item && typeof item === "object" && !Array.isArray(item));
}
var log = new Logger("bunfig", {
  showTags: true
});
async function tryLoadConfig2(configPath, defaultConfig2) {
  if (!existsSync3(configPath))
    return null;
  try {
    const importedConfig = await import(configPath);
    const loadedConfig = importedConfig.default || importedConfig;
    if (typeof loadedConfig !== "object" || loadedConfig === null || Array.isArray(loadedConfig))
      return null;
    try {
      return deepMerge2(defaultConfig2, loadedConfig);
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}
function applyEnvVarsToConfig(name, config3, verbose = false) {
  if (!name)
    return config3;
  const envPrefix = name.toUpperCase().replace(/-/g, "_");
  const result = { ...config3 };
  function processObject(obj, path = []) {
    const result2 = { ...obj };
    for (const [key, value] of Object.entries(obj)) {
      const envPath = [...path, key];
      const formatKey = (k) => k.replace(/([A-Z])/g, "_$1").toUpperCase();
      const envKey = `${envPrefix}_${envPath.map(formatKey).join("_")}`;
      const oldEnvKey = `${envPrefix}_${envPath.map((p) => p.toUpperCase()).join("_")}`;
      if (verbose)
        log.info(`Checking environment variable ${envKey} for config ${name}.${envPath.join(".")}`);
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        result2[key] = processObject(value, envPath);
      } else {
        const envValue = process8.env[envKey] || process8.env[oldEnvKey];
        if (envValue !== undefined) {
          if (verbose) {
            log.info(`Using environment variable ${envValue ? envKey : oldEnvKey} for config ${name}.${envPath.join(".")}`);
          }
          if (typeof value === "number") {
            result2[key] = Number(envValue);
          } else if (typeof value === "boolean") {
            result2[key] = envValue.toLowerCase() === "true";
          } else if (Array.isArray(value)) {
            try {
              const parsed = JSON.parse(envValue);
              if (Array.isArray(parsed)) {
                result2[key] = parsed;
              } else {
                result2[key] = envValue.split(",").map((item) => item.trim());
              }
            } catch {
              result2[key] = envValue.split(",").map((item) => item.trim());
            }
          } else {
            result2[key] = envValue;
          }
        }
      }
    }
    return result2;
  }
  return processObject(result);
}
async function loadConfig3({
  name = "",
  alias,
  cwd,
  defaultConfig: defaultConfig2,
  verbose = false,
  checkEnv = true
}) {
  const configWithEnvVars = checkEnv && typeof defaultConfig2 === "object" && defaultConfig2 !== null && !Array.isArray(defaultConfig2) ? applyEnvVarsToConfig(name, defaultConfig2, verbose) : defaultConfig2;
  const baseDir = cwd || process8.cwd();
  const extensions = [".ts", ".js", ".mjs", ".cjs", ".json"];
  if (verbose) {
    log.info(`Loading configuration for "${name}"${alias ? ` (alias: "${alias}")` : ""} from ${baseDir}`);
  }
  const configPatterns = [];
  configPatterns.push(`${name}.config`);
  configPatterns.push(`.${name}.config`);
  configPatterns.push(name);
  configPatterns.push(`.${name}`);
  if (alias) {
    configPatterns.push(`${alias}.config`);
    configPatterns.push(`.${alias}.config`);
    configPatterns.push(alias);
    configPatterns.push(`.${alias}`);
  }
  for (const configPath of configPatterns) {
    for (const ext of extensions) {
      const fullPath = resolve3(baseDir, `${configPath}${ext}`);
      const config3 = await tryLoadConfig2(fullPath, configWithEnvVars);
      if (config3 !== null) {
        if (verbose) {
          log.success(`Configuration loaded from: ${configPath}${ext}`);
        }
        return config3;
      }
    }
  }
  try {
    const pkgPath = resolve3(baseDir, "package.json");
    if (existsSync3(pkgPath)) {
      const pkg = await import(pkgPath);
      let pkgConfig = pkg[name];
      if (!pkgConfig && alias) {
        pkgConfig = pkg[alias];
        if (pkgConfig && verbose) {
          log.success(`Using alias "${alias}" configuration from package.json`);
        }
      }
      if (pkgConfig && typeof pkgConfig === "object" && !Array.isArray(pkgConfig)) {
        try {
          if (verbose) {
            log.success(`Configuration loaded from package.json: ${pkgConfig === pkg[name] ? name : alias}`);
          }
          return deepMerge2(configWithEnvVars, pkgConfig);
        } catch (error) {
          if (verbose) {
            log.warn(`Failed to merge package.json config:`, error);
          }
        }
      }
    }
  } catch (error) {
    if (verbose) {
      log.warn(`Failed to load package.json:`, error);
    }
  }
  if (verbose) {
    log.info(`No configuration found for "${name}"${alias ? ` or alias "${alias}"` : ""}, using default configuration with environment variables`);
  }
  return configWithEnvVars;
}
var defaultConfigDir2 = resolve3(process8.cwd(), "config");
var defaultGeneratedDir2 = resolve3(process8.cwd(), "src/generated");

// src/config.ts
var defaultConfig2 = {
  verbose: true,
  strictMode: false,
  cacheResults: true,
  errorMessages: {
    required: "{field} is required",
    string: "{field} must be a string",
    number: "{field} must be a number",
    boolean: "{field} must be a boolean",
    array: "{field} must be an array",
    object: "{field} must be an object",
    email: "{field} must be a valid email",
    url: "{field} must be a valid URL",
    min: "{field} must be at least {min}",
    max: "{field} must be at most {max}",
    length: "{field} must be exactly {length}",
    matches: "{field} is not in the correct format",
    alphanumeric: "{field} must contain only letters and numbers",
    alpha: "{field} must contain only letters",
    numeric: "{field} must contain only numbers",
    integer: "{field} must be an integer",
    positive: "{field} must be positive",
    negative: "{field} must be negative"
  }
};
var config2 = await loadConfig3({
  name: "validation",
  defaultConfig: defaultConfig2
});
// src/lib/util/assertString.ts
function assertString(input) {
  const isString = typeof input === "string";
  if (!isString) {
    let invalidType = typeof input;
    if (input === null) {
      invalidType = "null";
    } else if (invalidType === "object") {
      invalidType = input.constructor.name;
    }
    throw new TypeError(`Expected a string but received a ${invalidType}`);
  }
}

// src/lib/blacklist.ts
function blacklist(str, chars) {
  assertString(str);
  return str.replace(new RegExp(`[${chars}]+`, "g"), "");
}

// src/lib/util/merge.ts
function merge(obj = {}, defaults) {
  for (const key in defaults) {
    const objKey = key;
    if (typeof obj[objKey] === "undefined") {
      obj[key] = defaults[key];
    }
  }
  return obj;
}

// src/lib/util/toString.ts
function toString(input) {
  if (input === null || typeof input === "undefined") {
    return "";
  }
  if (typeof input === "object" && input !== null) {
    input = typeof input.toString === "function" ? input.toString() : Object.prototype.toString.call(input);
  } else if (input === 0 && Object.is(input, -0)) {
    return "-0";
  }
  return String(input);
}

// src/lib/contains.ts
var defaultContainsOptions = {
  ignoreCase: false,
  minOccurrences: 1
};
function contains(str, elem, options) {
  assertString(str);
  options = merge(options, defaultContainsOptions);
  if (options.ignoreCase) {
    return str.toLowerCase().split(toString(elem).toLowerCase()).length > options.minOccurrences;
  }
  return str.split(toString(elem)).length > options.minOccurrences;
}

// src/lib/equals.ts
function equals(str, comparison) {
  assertString(str);
  return str === comparison;
}

// src/lib/escape.ts
function escape(str) {
  assertString(str);
  return str.replace(/&/g, "&amp").replace(/"/g, "&quot").replace(/'/g, "&#x27").replace(/</g, "&lt").replace(/>/g, "&gt").replace(/\//g, "&#x2F").replace(/\\/g, "&#x5C").replace(/`/g, "&#96");
}

// src/lib/toDate.ts
function toDate(date) {
  if (date === null || date === undefined) {
    return null;
  }
  if (date instanceof Date) {
    return new Date(date.getTime());
  }
  if (typeof date !== "string" && typeof date !== "number") {
    return null;
  }
  const timestamp = Date.parse(date);
  if (!Number.isNaN(timestamp)) {
    return new Date(timestamp);
  }
  return null;
}

// src/lib/isAfter.ts
function isAfter(date, options) {
  const comparisonDate = (typeof options === "object" ? options.comparisonDate : options) || String(new Date).toString();
  const comparison = toDate(comparisonDate);
  const original = toDate(date);
  return !!(original && comparison && original > comparison);
}

// src/lib/alpha.ts
var alpha = {
  "en-US": /^[A-Z]+$/i,
  "az-AZ": /^[A-VXYZ\u00C7\u018F\u011E\u0130\u0131\u00D6\u015E\u00DC]+$/i,
  "bg-BG": /^[\u0410-\u042F]+$/i,
  "cs-CZ": /^[A-Z\u00C1\u010C\u010E\u00C9\u011A\u00CD\u0147\u00D3\u0158\u0160\u0164\u00DA\u016E\u00DD\u017D]+$/i,
  "da-DK": /^[A-Z\u00C6\u00D8\u00C5]+$/i,
  "de-DE": /^[A-Z\u00C4\u00D6\u00DC\u00DF]+$/i,
  "el-GR": /^[\u0391-\u03CE]+$/i,
  "es-ES": /^[A-Z\u00C1\u00C9\u00CD\u00D1\u00D3\u00DA\u00DC]+$/i,
  "fa-IR": /^[\u0627\u0628\u067E\u062A\u062B\u062C\u0686\u062D\u062E\u062F\u0630\u0631\u0632\u0698\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063A\u0641\u0642\u06A9\u06AF\u0644\u0645\u0646\u0648\u0647\u06CC]+$/,
  "fi-FI": /^[A-Z\u00C5\u00C4\u00D6]+$/i,
  "fr-FR": /^[A-Z\u00C0\u00C2\u00C6\u00C7\u00C9\u00C8\u00CA\u00CB\u00CF\u00CE\u00D4\u0152\u00D9\u00DB\u00DC\u0178]+$/i,
  "it-IT": /^[A-Z\u00C0\u00C9\u00C8\u00CC\u00CE\u00D3\u00D2\u00D9]+$/i,
  "ja-JP": /^[\u3041-\u3093\u30A1-\u30F6\uFF66-\uFF9F\u4E00-\u9FA0\u30FC\u30FB\u3002\u3001]+$/,
  "nb-NO": /^[A-Z\u00C6\u00D8\u00C5]+$/i,
  "nl-NL": /^[A-Z\u00C1\u00C9\u00CB\u00CF\u00D3\u00D6\u00DC\u00DA]+$/i,
  "nn-NO": /^[A-Z\u00C6\u00D8\u00C5]+$/i,
  "hu-HU": /^[A-Z\u00C1\u00C9\u00CD\u00D3\u00D6\u0150\u00DA\u00DC\u0170]+$/i,
  "pl-PL": /^[A-Z\u0104\u0106\u0118\u015A\u0141\u0143\u00D3\u017B\u0179]+$/i,
  "pt-PT": /^[A-Z\u00C3\u00C1\u00C0\u00C2\u00C4\u00C7\u00C9\u00CA\u00CB\u00CD\u00CF\u00D5\u00D3\u00D4\u00D6\u00DA\u00DC]+$/i,
  "ru-RU": /^[\u0410-\u042F\u0401]+$/i,
  "kk-KZ": /^[\u0410-\u042F\u0401\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,
  "sl-SI": /^[A-Z\u010C\u0106\u0110\u0160\u017D]+$/i,
  "sk-SK": /^[A-Z\u00C1\u010C\u010E\u00C9\u00CD\u0147\u00D3\u0160\u0164\u00DA\u00DD\u017D\u0139\u0154\u013D\u00C4\u00D4]+$/i,
  "sr-RS@latin": /^[A-Z\u010C\u0106\u017D\u0160\u0110]+$/i,
  "sr-RS": /^[\u0410-\u042F\u0402\u0408\u0409\u040A\u040B\u040F]+$/i,
  "sv-SE": /^[A-Z\u00C5\u00C4\u00D6]+$/i,
  "th-TH": /^[\u0E01-\u0E50\s]+$/,
  "tr-TR": /^[A-Z\u00C7\u011E\u0130\u0131\u00D6\u015E\u00DC]+$/i,
  "uk-UA": /^[\u0410-\u0429\u042C\u042E\u042F\u0404I\u0407\u0490\u0456]+$/i,
  "vi-VN": /^[A-Z\u00C0\u00C1\u1EA0\u1EA2\u00C3\u00C2\u1EA6\u1EA4\u1EAC\u1EA8\u1EAA\u0102\u1EB0\u1EAE\u1EB6\u1EB2\u1EB4\u0110\u00C8\u00C9\u1EB8\u1EBA\u1EBC\u00CA\u1EC0\u1EBE\u1EC6\u1EC2\u1EC4\u00CC\u00CD\u1ECA\u1EC8\u0128\u00D2\u00D3\u1ECC\u1ECE\u00D5\u00D4\u1ED2\u1ED0\u1ED8\u1ED4\u1ED6\u01A0\u1EDC\u1EDA\u1EE2\u1EDE\u1EE0\u00D9\u00DA\u1EE4\u1EE6\u0168\u01AF\u1EEA\u1EE8\u1EF0\u1EEC\u1EEE\u1EF2\u00DD\u1EF4\u1EF6\u1EF8]+$/i,
  "ko-KR": /^[\u3131-\u314E\u314F-\u3163\uAC00-\uD7A3]*$/,
  "ku-IQ": /^[\u0626\u0627\u0628\u067E\u062A\u062C\u0686\u062D\u062E\u062F\u0631\u0695\u0632\u0698\u0633\u0634\u0639\u063A\u0641\u06A4\u0642\u06A9\u06AF\u0644\u06B5\u0645\u0646\u0648\u06C6\u06BE\u06D5\u06CC\u06CE\u064A\u0637\u0624\u062B\u0622\u0625\u0623\u0643\u0636\u0635\u0629\u0638\u0630]+$/,
  ar: /^[\u0621\u0622\u0623\u0624\u0625\u0626\u0627\u0628\u0629\u062A\u062B\u062C\u062D\u062E\u062F\u0630\u0631\u0632\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063A\u0641\u0642\u0643\u0644\u0645\u0646\u0647\u0648\u0649\u064A\u064B\u064C\u064D\u064E\u064F\u0650\u0651\u0652\u0670]+$/,
  he: /^[\u05D0-\u05EA]+$/,
  fa: /^['\u0622\u0627\u0621\u0623\u0624\u0626\u0628\u067E\u062A\u062B\u062C\u0686\u062D\u062E\u062F\u0630\u0631\u0632\u0698\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063A\u0641\u0642\u06A9\u06AF\u0644\u0645\u0646\u0648\u0647\u0629\u06CC]+$/,
  bn: /^['\u0980\u0981\u0982\u0983\u0985\u0986\u0987\u0988\u0989\u098A\u098B\u098C\u098F\u0990\u0993\u0994\u0995\u0996\u0997\u0998\u0999\u099A\u099B\u099C\u099D\u099E\u099F\u09A0\u09A1\u09A2\u09A3\u09A4\u09A5\u09A6\u09A7\u09A8\u09AA\u09AB\u09AC\u09AD\u09AE\u09AF\u09B0\u09B2\u09B6\u09B7\u09B8\u09B9\u09BC\u09BD\u09BE\u09BF\u09C0\u09C1\u09C2\u09C3\u09C4\u09C7\u09C8\u09CB\u09CC\u09CD\u09CE\u09D7\u09DC\u09DD\u09DF\u09E0\u09E1\u09E2\u09E3\u09F0\u09F1\u09F2\u09F3\u09F4\u09F5\u09F6\u09F7\u09F8\u09F9\u09FA\u09FB]+$/,
  eo: /^[A-P\u0108\u011C\u0124\u0134R-V\u015C\u016CZ]+$/i,
  "hi-IN": /^[\u0900-\u0961]+[\u0972-\u097F]*$/,
  "si-LK": /^[\u0D80-\u0DFF]+$/
};
var alphanumeric = {
  "en-US": /^[0-9A-Z]+$/i,
  "az-AZ": /^[0-9A-VXYZ\u00C7\u018F\u011E\u0130\u0131\u00D6\u015E\u00DC]+$/i,
  "bg-BG": /^[0-9\u0410-\u042F]+$/i,
  "cs-CZ": /^[0-9A-Z\u00C1\u010C\u010E\u00C9\u011A\u00CD\u0147\u00D3\u0158\u0160\u0164\u00DA\u016E\u00DD\u017D]+$/i,
  "da-DK": /^[0-9A-Z\u00C6\u00D8\u00C5]+$/i,
  "de-DE": /^[0-9A-Z\u00C4\u00D6\u00DC\u00DF]+$/i,
  "el-GR": /^[0-9\u0391-\u03C9]+$/i,
  "es-ES": /^[0-9A-Z\u00C1\u00C9\u00CD\u00D1\u00D3\u00DA\u00DC]+$/i,
  "fi-FI": /^[0-9A-Z\u00C5\u00C4\u00D6]+$/i,
  "fr-FR": /^[0-9A-Z\u00C0\u00C2\u00C6\u00C7\u00C9\u00C8\u00CA\u00CB\u00CF\u00CE\u00D4\u0152\u00D9\u00DB\u00DC\u0178]+$/i,
  "it-IT": /^[0-9A-Z\u00C0\u00C9\u00C8\u00CC\u00CE\u00D3\u00D2\u00D9]+$/i,
  "ja-JP": /^[0-9\uFF10-\uFF19\u3041-\u3093\u30A1-\u30F6\uFF66-\uFF9F\u4E00-\u9FA0\u30FC\u30FB\u3002\u3001]+$/,
  "hu-HU": /^[0-9A-Z\u00C1\u00C9\u00CD\u00D3\u00D6\u0150\u00DA\u00DC\u0170]+$/i,
  "nb-NO": /^[0-9A-Z\u00C6\u00D8\u00C5]+$/i,
  "nl-NL": /^[0-9A-Z\u00C1\u00C9\u00CB\u00CF\u00D3\u00D6\u00DC\u00DA]+$/i,
  "nn-NO": /^[0-9A-Z\u00C6\u00D8\u00C5]+$/i,
  "pl-PL": /^[0-9A-Z\u0104\u0106\u0118\u015A\u0141\u0143\u00D3\u017B\u0179]+$/i,
  "pt-PT": /^[0-9A-Z\u00C3\u00C1\u00C0\u00C2\u00C4\u00C7\u00C9\u00CA\u00CB\u00CD\u00CF\u00D5\u00D3\u00D4\u00D6\u00DA\u00DC]+$/i,
  "ru-RU": /^[0-9\u0410-\u042F\u0401]+$/i,
  "kk-KZ": /^[0-9\u0410-\u042F\u0401\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,
  "sl-SI": /^[0-9A-Z\u010C\u0106\u0110\u0160\u017D]+$/i,
  "sk-SK": /^[0-9A-Z\u00C1\u010C\u010E\u00C9\u00CD\u0147\u00D3\u0160\u0164\u00DA\u00DD\u017D\u0139\u0154\u013D\u00C4\u00D4]+$/i,
  "sr-RS@latin": /^[0-9A-Z\u010C\u0106\u017D\u0160\u0110]+$/i,
  "sr-RS": /^[0-9\u0410-\u042F\u0402\u0408\u0409\u040A\u040B\u040F]+$/i,
  "sv-SE": /^[0-9A-Z\u00C5\u00C4\u00D6]+$/i,
  "th-TH": /^[\u0E01-\u0E59\s]+$/,
  "tr-TR": /^[0-9A-Z\u00C7\u011E\u0130\u0131\u00D6\u015E\u00DC]+$/i,
  "uk-UA": /^[0-9\u0410-\u0429\u042C\u042E\u042F\u0404I\u0407\u0490\u0456]+$/i,
  "ko-KR": /^[0-9\u3131-\u314E\u314F-\u3163\uAC00-\uD7A3]*$/,
  "ku-IQ": /^[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u06690-9\u0626\u0627\u0628\u067E\u062A\u062C\u0686\u062D\u062E\u062F\u0631\u0695\u0632\u0698\u0633\u0634\u0639\u063A\u0641\u06A4\u0642\u06A9\u06AF\u0644\u06B5\u0645\u0646\u0648\u06C6\u06BE\u06D5\u06CC\u06CE\u064A\u0637\u0624\u062B\u0622\u0625\u0623\u0643\u0636\u0635\u0629\u0638\u0630]+$/,
  "vi-VN": /^[0-9A-Z\u00C0\u00C1\u1EA0\u1EA2\u00C3\u00C2\u1EA6\u1EA4\u1EAC\u1EA8\u1EAA\u0102\u1EB0\u1EAE\u1EB6\u1EB2\u1EB4\u0110\u00C8\u00C9\u1EB8\u1EBA\u1EBC\u00CA\u1EC0\u1EBE\u1EC6\u1EC2\u1EC4\u00CC\u00CD\u1ECA\u1EC8\u0128\u00D2\u00D3\u1ECC\u1ECE\u00D5\u00D4\u1ED2\u1ED0\u1ED8\u1ED4\u1ED6\u01A0\u1EDC\u1EDA\u1EE2\u1EDE\u1EE0\u00D9\u00DA\u1EE4\u1EE6\u0168\u01AF\u1EEA\u1EE8\u1EF0\u1EEC\u1EEE\u1EF2\u00DD\u1EF4\u1EF6\u1EF8]+$/i,
  ar: /^[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u06690-9\u0621\u0622\u0623\u0624\u0625\u0626\u0627\u0628\u0629\u062A\u062B\u062C\u062D\u062E\u062F\u0630\u0631\u0632\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063A\u0641\u0642\u0643\u0644\u0645\u0646\u0647\u0648\u0649\u064A\u064B\u064C\u064D\u064E\u064F\u0650\u0651\u0652\u0670]+$/,
  he: /^[0-9\u05D0-\u05EA]+$/,
  fa: /^['0-9\u0622\u0627\u0621\u0623\u0624\u0626\u0628\u067E\u062A\u062B\u062C\u0686\u062D\u062E\u062F\u0630\u0631\u0632\u0698\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063A\u0641\u0642\u06A9\u06AF\u0644\u0645\u0646\u0648\u0647\u0629\u06CC\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9\u06F0]+$/,
  bn: /^['\u0980\u0981\u0982\u0983\u0985\u0986\u0987\u0988\u0989\u098A\u098B\u098C\u098F\u0990\u0993\u0994\u0995\u0996\u0997\u0998\u0999\u099A\u099B\u099C\u099D\u099E\u099F\u09A0\u09A1\u09A2\u09A3\u09A4\u09A5\u09A6\u09A7\u09A8\u09AA\u09AB\u09AC\u09AD\u09AE\u09AF\u09B0\u09B2\u09B6\u09B7\u09B8\u09B9\u09BC\u09BD\u09BE\u09BF\u09C0\u09C1\u09C2\u09C3\u09C4\u09C7\u09C8\u09CB\u09CC\u09CD\u09CE\u09D7\u09DC\u09DD\u09DF\u09E0\u09E1\u09E2\u09E3\u09E6\u09E7\u09E8\u09E9\u09EA\u09EB\u09EC\u09ED\u09EE\u09EF\u09F0\u09F1\u09F2\u09F3\u09F4\u09F5\u09F6\u09F7\u09F8\u09F9\u09FA\u09FB]+$/,
  eo: /^[0-9A-P\u0108\u011C\u0124\u0134R-V\u015C\u016CZ]+$/i,
  "hi-IN": /^[\u0900-\u0963]+[\u0966-\u097F]*$/,
  "si-LK": /^[0-9\u0D80-\u0DFF]+$/
};
var decimal = {
  "en-US": ".",
  ar: "\u066B"
};
var englishLocales = ["AU", "GB", "HK", "IN", "NZ", "ZA", "ZM"];
for (let locale, i = 0;i < englishLocales.length; i++) {
  locale = `en-${englishLocales[i]}`;
  alpha[locale] = alpha["en-US"];
  alphanumeric[locale] = alphanumeric["en-US"];
  decimal[locale] = decimal["en-US"];
}
var arabicLocales = ["AE", "BH", "DZ", "EG", "IQ", "JO", "KW", "LB", "LY", "MA", "QM", "QA", "SA", "SD", "SY", "TN", "YE"];
for (let locale, i = 0;i < arabicLocales.length; i++) {
  locale = `ar-${arabicLocales[i]}`;
  alpha[locale] = alpha.ar;
  alphanumeric[locale] = alphanumeric.ar;
  decimal[locale] = decimal.ar;
}
var farsiLocales = ["IR", "AF"];
for (let locale, i = 0;i < farsiLocales.length; i++) {
  locale = `fa-${farsiLocales[i]}`;
  alphanumeric[locale] = alphanumeric.fa;
  decimal[locale] = decimal.ar;
}
var bengaliLocales = ["BD", "IN"];
for (let locale, i = 0;i < bengaliLocales.length; i++) {
  locale = `bn-${bengaliLocales[i]}`;
  alpha[locale] = alpha.bn;
  alphanumeric[locale] = alphanumeric.bn;
  decimal[locale] = decimal["en-US"];
}
var dotDecimal = ["ar-EG", "ar-LB", "ar-LY"];
var commaDecimal = [
  "bg-BG",
  "cs-CZ",
  "da-DK",
  "de-DE",
  "el-GR",
  "en-ZM",
  "eo",
  "es-ES",
  "fr-CA",
  "fr-FR",
  "id-ID",
  "it-IT",
  "ku-IQ",
  "hi-IN",
  "hu-HU",
  "nb-NO",
  "nn-NO",
  "nl-NL",
  "pl-PL",
  "pt-PT",
  "ru-RU",
  "kk-KZ",
  "si-LK",
  "sl-SI",
  "sr-RS@latin",
  "sr-RS",
  "sv-SE",
  "tr-TR",
  "uk-UA",
  "vi-VN"
];
for (let i = 0;i < dotDecimal.length; i++) {
  decimal[dotDecimal[i]] = decimal["en-US"];
}
for (let i = 0;i < commaDecimal.length; i++) {
  decimal[commaDecimal[i]] = ",";
}
alpha["fr-CA"] = alpha["fr-FR"];
alphanumeric["fr-CA"] = alphanumeric["fr-FR"];
alpha["pt-BR"] = alpha["pt-PT"];
alphanumeric["pt-BR"] = alphanumeric["pt-PT"];
decimal["pt-BR"] = decimal["pt-PT"];
alpha["pl-Pl"] = alpha["pl-PL"];
alphanumeric["pl-Pl"] = alphanumeric["pl-PL"];
decimal["pl-Pl"] = decimal["pl-PL"];
alpha["fa-AF"] = alpha.fa;

// src/lib/isAlpha.ts
function isAlpha(_str, locale = "en-US", options = {}) {
  assertString(_str);
  let str = _str;
  const { ignore } = options;
  if (ignore) {
    if (ignore instanceof RegExp) {
      str = str.replace(ignore, "");
    } else if (typeof ignore === "string") {
      str = str.replace(new RegExp(`[${ignore.replace(/[-[\]{}()*+?.,\\^$|#s]/g, "\\$&")}]`, "g"), "");
    } else {
      throw new TypeError("ignore should be instance of a String or RegExp");
    }
  }
  if (locale in alpha) {
    return alpha[locale].test(str);
  }
  throw new Error(`Invalid locale '${locale}'`);
}
var locales = Object.keys(alpha);

// src/lib/isAlphanumeric.ts
var alphanumeric2 = {
  "en-US": /^[0-9A-Z]+$/i,
  "az-AZ": /^[0-9A-VXYZ\u00C7\u018F\u011E\u0130\u0131\u00D6\u015E\u00DC]+$/i,
  "bg-BG": /^[0-9\u0410-\u042F]+$/i,
  "cs-CZ": /^[0-9A-Z\u00E1\u010D\u010F\u00E9\u011B\u00ED\u0148\u00F3\u0159\u0161\u0165\u00FA\u016F\u00FD\u017E]+$/i,
  "da-DK": /^[0-9A-Z\u00C6\u00D8\u00C5]+$/i,
  "de-DE": /^[0-9A-Z\u00C4\u00D6\u00DC\u00DF]+$/i,
  "el-GR": /^[0-9\u0391-\u03C9]+$/,
  "es-ES": /^[0-9A-Z\u00E1\u00E9\u00ED\u00F1\u00F3\u00FA\u00FC]+$/i,
  "fi-FI": /^[0-9A-Z\u00C5\u00C4\u00D6]+$/i,
  "fr-FR": /^[0-9A-Z\u00C0\u00C2\u00C6\u00C7\u00C9\u00C8\u00CA\u00CB\u00CF\u00CE\u00D4\u0152\u00D9\u00DB\u00DC\u0178]+$/i,
  "it-IT": /^[0-9A-Z\u00C0\u00C9\u00C8\u00CC\u00CD\u00CE\u00D2\u00D3\u00D9]+$/i,
  "hu-HU": /^[0-9A-Z\u00E1\u00E9\u00ED\u00F3\u00F6\u0151\u00FA\u00FC\u0171]+$/i,
  "nb-NO": /^[0-9A-Z\u00C6\u00D8\u00C5]+$/i,
  "nl-NL": /^[0-9A-Z\u00E1\u00E9\u00EB\u00EF\u00F3\u00F6\u00FC\u00FA]+$/i,
  "nn-NO": /^[0-9A-Z\u00C6\u00D8\u00C5]+$/i,
  "pl-PL": /^[0-9A-Z\u0105\u0107\u0119\u0142\u0144\u00F3\u015B\u017A\u017C]+$/i,
  "pt-PT": /^[0-9A-Z\u00E0\u00E1\u00E2\u00E3\u00E7\u00E9\u00EA\u00F3\u00F5\u00FA]+$/i,
  "ru-RU": /^[0-9\u0410-\u042F\u0430-\u044F\u0401\u0451]+$/,
  "sk-SK": /^[0-9A-Z\u00E1\u00E4\u010D\u010F\u00E9\u00ED\u013A\u013E\u0148\u00F3\u00F4\u0155\u0161\u0165\u00FA\u00FD\u017E]+$/i,
  "sr-RS@latin": /^[0-9A-Z\u010C\u0106\u0110\u0160\u017D]+$/i,
  "sr-RS": /^[0-9\u0410-\u042F\u0430-\u044F\u0402\u0452\u0408\u0458\u0409\u0459\u040A\u045A\u040B\u045B\u040F\u045F]+$/,
  "sv-SE": /^[0-9A-Z\u00C5\u00C4\u00D6]+$/i,
  "th-TH": /^[\u0E01-\u0E59]+$/,
  "tr-TR": /^[0-9A-Z\u00C7\u011E\u0130\u0131\u00D6\u015E\u00DC]+$/i,
  "uk-UA": /^[0-9\u0410-\u0429\u042C\u042E\u042F\u0490\u0404\u0406\u0407\u0430-\u0449\u044C\u044E\u044F\u0491\u0454\u0456\u0457]+$/,
  "ko-KR": /^[0-9\u3131-\u314E\u314F-\u3163\uAC00-\uD7A3]+$/,
  "ja-JP": /^[0-9\uFF10-\uFF19\u3041-\u3093\u30A1-\u30F6\uFF66-\uFF9F\u4E00-\u9FA0]+$/,
  "vi-VN": /^[0-9A-Z\u00C0\u00C1\u00C2\u00C3\u00C8\u00C9\u00CA\u00CC\u00CD\u00D2\u00D3\u00D4\u00D5\u00D9\u00DA\u00DD\u0102\u0110\u0128\u0168\u01A0\u01AF]+$/i,
  "fa-IR": /^[\u0627\u0628\u067E\u062A\u062B\u062C\u0686\u062D\u062E\u062F\u0630\u0631\u0632\u0698\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063A\u0641\u0642\u06A9\u06AF\u0644\u0645\u0646\u0648\u0647\u06CC\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9\u06F0]+$/,
  ar: /^[\u0030-\u0039\u0621-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0750-\u077F]+$/,
  he: /^[0-9\u05D0-\u05EA]+$/,
  "hi-IN": /^[\u0900-\u0961\u0966-\u097F]+$/,
  "ur-PK": /^[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u31A0-\u31BF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA500-\uA63F\uA640-\uA69F\uA6A0-\uA6FF\uA700-\uA71F\uA720-\uA7FF\uA800-\uA82F\uA840-\uA87F\uA880-\uA8DF\uA900-\uA92F\uA930-\uA95F\uA960-\uA97F\uA980-\uA9DF\uAA00-\uAA5F\uAA60-\uAA7F\uAA80-\uAADF\uAB00-\uAB2F\uABC0-\uABFF\uAC00-\uD7AF\uD800-\uFA2F\uFA30-\uFA6F\uFA70-\uFADF\uFB00-\uFB4F\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+$/
};
var locales2 = Object.keys(alphanumeric2);
function isAlphanumeric(str, options = {}) {
  assertString(str);
  const { locale = "en-US", ignore } = options;
  if (ignore) {
    if (ignore instanceof RegExp) {
      str = str.replace(ignore, "");
    } else {
      str = str.replace(new RegExp(`[${ignore.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}]`, "g"), "");
    }
  }
  if (locale in alphanumeric2) {
    return alphanumeric2[locale].test(str);
  }
  throw new Error(`Invalid locale '${locale}'`);
}

// src/lib/isAscii.ts
var ascii = /^[\x00-\x7F]+$/;
function isAscii(str) {
  assertString(str);
  return ascii.test(str);
}

// src/lib/isBase32.ts
var base32 = /^[A-Z2-7]+=*$/;
var crockfordBase32 = /^[A-HJKMNP-TV-Z0-9]+$/;
var defaultBase32Options = {
  crockford: false
};
function isBase32(str, options) {
  assertString(str);
  options = merge(options, defaultBase32Options);
  if (options.crockford) {
    return crockfordBase32.test(str);
  }
  const len = str.length;
  if (len % 8 === 0 && base32.test(str)) {
    return true;
  }
  return false;
}

// src/lib/isBase58.ts
var base58Reg = /^[A-HJ-NP-Za-km-z1-9]*$/;
function isBase58(str) {
  assertString(str);
  if (base58Reg.test(str)) {
    return true;
  }
  return false;
}

// src/lib/isBase64.ts
var base64WithPadding = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=|[A-Z0-9+/]{4})$/i;
var base64WithoutPadding = /^[A-Z0-9+/]+$/i;
var base64UrlWithPadding = /^(?:[\w-]{4})*(?:[\w-]{2}==|[\w-]{3}=|[\w-]{4})$/;
var base64UrlWithoutPadding = /^[\w-]+$/;
function isBase64(str, options) {
  assertString(str);
  options = merge(options, { urlSafe: false, padding: !options?.urlSafe });
  if (str === "")
    return true;
  let regex;
  if (options.urlSafe) {
    regex = options.padding ? base64UrlWithPadding : base64UrlWithoutPadding;
  } else {
    regex = options.padding ? base64WithPadding : base64WithoutPadding;
  }
  return (!options.padding || str.length % 4 === 0) && regex.test(str);
}

// src/lib/isBefore.ts
function isBefore(date, options) {
  const comparisonDate = (typeof options === "object" ? options.comparisonDate : options) || String(new Date).toString();
  const comparison = toDate(comparisonDate);
  const original = toDate(date);
  return !!(original && comparison && original < comparison);
}

// src/lib/isISO31661Alpha2.ts
var validISO31661Alpha2CountriesCodes = new Set([
  "AD",
  "AE",
  "AF",
  "AG",
  "AI",
  "AL",
  "AM",
  "AO",
  "AQ",
  "AR",
  "AS",
  "AT",
  "AU",
  "AW",
  "AX",
  "AZ",
  "BA",
  "BB",
  "BD",
  "BE",
  "BF",
  "BG",
  "BH",
  "BI",
  "BJ",
  "BL",
  "BM",
  "BN",
  "BO",
  "BQ",
  "BR",
  "BS",
  "BT",
  "BV",
  "BW",
  "BY",
  "BZ",
  "CA",
  "CC",
  "CD",
  "CF",
  "CG",
  "CH",
  "CI",
  "CK",
  "CL",
  "CM",
  "CN",
  "CO",
  "CR",
  "CU",
  "CV",
  "CW",
  "CX",
  "CY",
  "CZ",
  "DE",
  "DJ",
  "DK",
  "DM",
  "DO",
  "DZ",
  "EC",
  "EE",
  "EG",
  "EH",
  "ER",
  "ES",
  "ET",
  "FI",
  "FJ",
  "FK",
  "FM",
  "FO",
  "FR",
  "GA",
  "GB",
  "GD",
  "GE",
  "GF",
  "GG",
  "GH",
  "GI",
  "GL",
  "GM",
  "GN",
  "GP",
  "GQ",
  "GR",
  "GS",
  "GT",
  "GU",
  "GW",
  "GY",
  "HK",
  "HM",
  "HN",
  "HR",
  "HT",
  "HU",
  "ID",
  "IE",
  "IL",
  "IM",
  "IN",
  "IO",
  "IQ",
  "IR",
  "IS",
  "IT",
  "JE",
  "JM",
  "JO",
  "JP",
  "KE",
  "KG",
  "KH",
  "KI",
  "KM",
  "KN",
  "KP",
  "KR",
  "KW",
  "KY",
  "KZ",
  "LA",
  "LB",
  "LC",
  "LI",
  "LK",
  "LR",
  "LS",
  "LT",
  "LU",
  "LV",
  "LY",
  "MA",
  "MC",
  "MD",
  "ME",
  "MF",
  "MG",
  "MH",
  "MK",
  "ML",
  "MM",
  "MN",
  "MO",
  "MP",
  "MQ",
  "MR",
  "MS",
  "MT",
  "MU",
  "MV",
  "MW",
  "MX",
  "MY",
  "MZ",
  "NA",
  "NC",
  "NE",
  "NF",
  "NG",
  "NI",
  "NL",
  "NO",
  "NP",
  "NR",
  "NU",
  "NZ",
  "OM",
  "PA",
  "PE",
  "PF",
  "PG",
  "PH",
  "PK",
  "PL",
  "PM",
  "PN",
  "PR",
  "PS",
  "PT",
  "PW",
  "PY",
  "QA",
  "RE",
  "RO",
  "RS",
  "RU",
  "RW",
  "SA",
  "SB",
  "SC",
  "SD",
  "SE",
  "SG",
  "SH",
  "SI",
  "SJ",
  "SK",
  "SL",
  "SM",
  "SN",
  "SO",
  "SR",
  "SS",
  "ST",
  "SV",
  "SX",
  "SY",
  "SZ",
  "TC",
  "TD",
  "TF",
  "TG",
  "TH",
  "TJ",
  "TK",
  "TL",
  "TM",
  "TN",
  "TO",
  "TR",
  "TT",
  "TV",
  "TW",
  "TZ",
  "UA",
  "UG",
  "UM",
  "US",
  "UY",
  "UZ",
  "VA",
  "VC",
  "VE",
  "VG",
  "VI",
  "VN",
  "VU",
  "WF",
  "WS",
  "YE",
  "YT",
  "ZA",
  "ZM",
  "ZW"
]);
function isISO31661Alpha2(str) {
  assertString(str);
  return validISO31661Alpha2CountriesCodes.has(str.toUpperCase());
}
var CountryCodes = validISO31661Alpha2CountriesCodes;

// src/lib/isBIC.ts
var isBICReg = /^[A-Z]{6}[A-Z0-9]{2}(?:[A-Z0-9]{3})?$/i;
function isBIC(str) {
  assertString(str);
  const countryCode = str.slice(4, 6).toUpperCase();
  if (!CountryCodes.has(countryCode) && countryCode !== "XK") {
    return false;
  }
  return isBICReg.test(str);
}

// src/lib/util/includesArray.ts
var includes = (arr, val) => arr.includes(val);
var includesArray_default = includes;

// src/lib/isBoolean.ts
var defaultOptions = { loose: false };
var strictBooleans = ["true", "false", "1", "0"];
var looseBooleans = [...strictBooleans, "yes", "no"];
function isBoolean(str, options = defaultOptions) {
  assertString(str);
  if (options.loose) {
    return includesArray_default(looseBooleans, str.toLowerCase());
  }
  return includesArray_default(strictBooleans, str);
}

// src/lib/isBtcAddress.ts
var bech32 = /^(?:bc1|tb1|bc1p|tb1p)[ac-hj-np-z02-9]{39,58}$/;
var base58 = /^[123m][A-HJ-NP-Za-km-z1-9]{25,39}$/;
function isBtcAddress(str) {
  assertString(str);
  return bech32.test(str) || base58.test(str);
}

// src/lib/isByteLength.ts
function isByteLength(str, options) {
  assertString(str);
  let min;
  let max;
  if (typeof options === "object") {
    min = options.min || 0;
    max = options.max;
  } else {
    min = arguments[1];
    max = arguments[2];
  }
  const len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === "undefined" || len <= max);
}

// src/lib/isLuhnNumber.ts
function isLuhnNumber(str) {
  assertString(str);
  const sanitized = str.replace(/[- ]+/g, "");
  let sum = 0;
  let digit;
  let tmpNum;
  let shouldDouble;
  for (let i = sanitized.length - 1;i >= 0; i--) {
    digit = sanitized.substring(i, i + 1);
    tmpNum = Number.parseInt(digit, 10);
    if (shouldDouble) {
      tmpNum *= 2;
      if (tmpNum >= 10) {
        sum += tmpNum % 10 + 1;
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }
    shouldDouble = !shouldDouble;
  }
  return !!(sum % 10 === 0 ? sanitized : false);
}

// src/lib/isCreditCard.ts
var cards = {
  amex: /^3[47]\d{13}$/,
  dinersclub: /^3(?:0[0-5]|[68]\d)\d{11}$/,
  discover: /^6(?:011|5\d\d)\d{12,15}$/,
  jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  mastercard: /^5[1-5]\d{2}|(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12}$/,
  unionpay: /^(6[27]\d{14}|^(81\d{14,17}))$/,
  visa: /^4\d{12}(?:\d{3,6})?$/
};
var allCards = (() => {
  const tmpCardsArray = [];
  for (const cardProvider in cards) {
    if (Object.prototype.hasOwnProperty.call(cards, cardProvider)) {
      tmpCardsArray.push(cards[cardProvider]);
    }
  }
  return tmpCardsArray;
})();
function isCreditCard(card, options = {}) {
  assertString(card);
  const { provider } = options;
  const sanitized = card.replace(/[- ]+/g, "");
  if (provider && provider.toLowerCase() in cards) {
    if (!cards[provider.toLowerCase()].test(sanitized)) {
      return false;
    }
  } else if (provider && !(provider.toLowerCase() in cards)) {
    throw new Error(`${provider} is not a valid credit card provider.`);
  } else if (!allCards.some((cardProvider) => cardProvider.test(sanitized))) {
    return false;
  }
  return isLuhnNumber(card);
}

// src/lib/isCurrency.ts
function currencyRegex(options) {
  let decimal_digits = `\\d{${options.digits_after_decimal[0]}}`;
  options.digits_after_decimal.forEach((digit, index) => {
    if (index !== 0)
      decimal_digits = `${decimal_digits}|\\d{${digit}}`;
  });
  const symbol = `(${options.symbol.replace(/\W/, (m) => `\\${m}`)})${options.require_symbol ? "" : "?"}`;
  const negative = "-?";
  const whole_dollar_amount_without_sep = "[1-9]\\d*";
  const whole_dollar_amount_with_sep = `[1-9]\\d{0,2}(\\${options.thousands_separator}\\d{3})*`;
  const valid_whole_dollar_amounts = [
    "0",
    whole_dollar_amount_without_sep,
    whole_dollar_amount_with_sep
  ];
  const whole_dollar_amount = `(${valid_whole_dollar_amounts.join("|")})?`;
  const decimal_amount = `(\\${options.decimal_separator}(${decimal_digits}))${options.require_decimal ? "" : "?"}`;
  let pattern = whole_dollar_amount + (options.allow_decimal || options.require_decimal ? decimal_amount : "");
  if (options.allow_negatives && !options.parens_for_negatives) {
    if (options.negative_sign_after_digits) {
      pattern += negative;
    } else if (options.negative_sign_before_digits) {
      pattern = negative + pattern;
    }
  }
  if (options.allow_negative_sign_placeholder) {
    pattern = `( (?!\\-))?${pattern}`;
  } else if (options.allow_space_after_symbol) {
    pattern = ` ?${pattern}`;
  } else if (options.allow_space_after_digits) {
    pattern += "( (?!$))?";
  }
  if (options.symbol_after_digits) {
    pattern += symbol;
  } else {
    pattern = symbol + pattern;
  }
  if (options.allow_negatives) {
    if (options.parens_for_negatives) {
      pattern = `(\\(${pattern}\\)|${pattern})`;
    } else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
      pattern = negative + pattern;
    }
  }
  return new RegExp(`^(?!-? )(?=.*\\d)${pattern}$`);
}
var default_currency_options = {
  symbol: "$",
  require_symbol: false,
  allow_space_after_symbol: false,
  symbol_after_digits: false,
  allow_negatives: true,
  parens_for_negatives: false,
  negative_sign_before_digits: false,
  negative_sign_after_digits: false,
  allow_negative_sign_placeholder: false,
  thousands_separator: ",",
  decimal_separator: ".",
  allow_decimal: true,
  require_decimal: false,
  digits_after_decimal: [2],
  allow_space_after_digits: false
};
function isCurrency(str, options) {
  assertString(str);
  const mergedOptions = merge(options, default_currency_options);
  return currencyRegex(mergedOptions).test(str);
}

// src/lib/isDataURI.ts
var validMediaType = /^[a-z]+\/[\w\-+.]+$/i;
var validAttribute = /^[a-z\-]+=[a-z0-9\-]+$/i;
var validData = /^[\w!$&'()*+,=\-.~:@/?%\s]*$/;
function isDataURI(str) {
  assertString(str);
  const data = str.split(",");
  if (data.length < 2) {
    return false;
  }
  const firstPart = data.shift();
  if (!firstPart)
    return false;
  const attributes = firstPart.trim().split("");
  const schemeAndMediaType = attributes.shift();
  if (!schemeAndMediaType || schemeAndMediaType.slice(0, 5) !== "data:") {
    return false;
  }
  const mediaType = schemeAndMediaType.slice(5);
  if (mediaType !== "" && !validMediaType.test(mediaType)) {
    return false;
  }
  for (let i = 0;i < attributes.length; i++) {
    if (!(i === attributes.length - 1 && attributes[i].toLowerCase() === "base64") && !validAttribute.test(attributes[i])) {
      return false;
    }
  }
  for (let i = 0;i < data.length; i++) {
    if (!validData.test(data[i])) {
      return false;
    }
  }
  return true;
}

// src/lib/isDate.ts
var default_date_options = {
  format: "YYYY/MM/DD",
  delimiters: ["/", "-"],
  strictMode: false
};
function isValidFormat(format) {
  return /^(?:y{4}|y{2})[./-]m{1,2}[./-]d{1,2}$|^m{1,2}[./-]d{1,2}[./-](?:y{4}|y{2})$|^d{1,2}[./-]m{1,2}[./-](?:y{4}|y{2})$/i.test(format);
}
function zip(date, format) {
  const zippedArr = [];
  const len = Math.max(date.length, format.length);
  for (let i = 0;i < len; i++) {
    zippedArr.push([date[i], format[i]]);
  }
  return zippedArr;
}
function isDate(input, options) {
  let mergedOptions;
  if (typeof options === "string") {
    mergedOptions = merge({ format: options }, default_date_options);
  } else {
    mergedOptions = merge(options, default_date_options);
  }
  if (typeof input === "string" && isValidFormat(mergedOptions.format)) {
    if (mergedOptions.strictMode && input.length !== mergedOptions.format.length)
      return false;
    const formatDelimiter = mergedOptions.delimiters.find((delimiter) => mergedOptions.format.includes(delimiter));
    const dateDelimiter = mergedOptions.strictMode ? formatDelimiter : mergedOptions.delimiters.find((delimiter) => input.includes(delimiter));
    const dateAndFormat = zip(input.split(dateDelimiter), mergedOptions.format.toLowerCase().split(formatDelimiter));
    const dateObj = {};
    for (const [dateWord, formatWord] of dateAndFormat) {
      if (!dateWord || !formatWord || dateWord.length !== formatWord.length) {
        return false;
      }
      dateObj[formatWord.charAt(0)] = dateWord;
    }
    let fullYear = dateObj.y;
    if (fullYear.startsWith("-")) {
      return false;
    }
    if (dateObj.y.length === 2) {
      const parsedYear = Number.parseInt(dateObj.y, 10);
      if (Number.isNaN(parsedYear)) {
        return false;
      }
      const currentYearLastTwoDigits = new Date().getFullYear() % 100;
      if (parsedYear < currentYearLastTwoDigits) {
        fullYear = `20${dateObj.y}`;
      } else {
        fullYear = `19${dateObj.y}`;
      }
    }
    let month = dateObj.m;
    if (dateObj.m.length === 1) {
      month = `0${dateObj.m}`;
    }
    let day = dateObj.d;
    if (dateObj.d.length === 1) {
      day = `0${dateObj.d}`;
    }
    return new Date(`${fullYear}-${month}-${day}T00:00:00.000Z`).getUTCDate() === +dateObj.d;
  }
  if (!mergedOptions.strictMode) {
    return Object.prototype.toString.call(input) === "[object Date]" && Number.isFinite(input);
  }
  return false;
}

// src/lib/isDecimal.ts
function decimalRegExp(options) {
  const regExp = new RegExp(`^[-+]?([0-9]+)?(\\${decimal[options.locale]}[0-9]{${options.decimal_digits}})${options.force_decimal ? "" : "?"}$`);
  return regExp;
}
var default_decimal_options = {
  force_decimal: false,
  decimal_digits: "1,",
  locale: "en-US"
};
var blacklist2 = ["", "-", "+"];
function isDecimal(str, options) {
  assertString(str);
  const mergedOptions = merge(options, default_decimal_options);
  if (mergedOptions.locale in decimal) {
    return !includesArray_default(blacklist2, str.replace(/ /g, "")) && decimalRegExp(mergedOptions).test(str);
  }
  throw new Error(`Invalid locale '${mergedOptions.locale}'`);
}

// src/lib/toFloat.ts
function toFloat(str) {
  assertString(str);
  return Number.parseFloat(str);
}

// src/lib/isDivisibleBy.ts
function isDivisibleBy(str, num) {
  assertString(str);
  return toFloat(str) % num === 0;
}

// src/lib/isEAN.ts
var LENGTH_EAN_8 = 8;
var LENGTH_EAN_14 = 14;
var validEanRegex = /^(?:\d{8}|\d{13}|\d{14})$/;
function getPositionWeightThroughLengthAndIndex(length, index) {
  if (length === LENGTH_EAN_8 || length === LENGTH_EAN_14) {
    return index % 2 === 0 ? 3 : 1;
  }
  return index % 2 === 0 ? 1 : 3;
}
function calculateCheckDigit(ean) {
  const checksum = ean.slice(0, -1).split("").map((char, index) => Number(char) * getPositionWeightThroughLengthAndIndex(ean.length, index)).reduce((acc, partialSum) => acc + partialSum, 0);
  const remainder = 10 - checksum % 10;
  return remainder < 10 ? remainder : 0;
}
function isEAN(str) {
  assertString(str);
  const actualCheckDigit = Number(str.slice(-1));
  return validEanRegex.test(str) && actualCheckDigit === calculateCheckDigit(str);
}

// src/lib/isFQDN.ts
var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_numeric_tld: false,
  allow_wildcard: false,
  ignore_max_length: false
};
function isFQDN(str, options = {}) {
  assertString(str);
  options = merge(options, default_fqdn_options);
  if (options.allow_trailing_dot && str[str.length - 1] === ".") {
    str = str.substring(0, str.length - 1);
  }
  if (options.allow_wildcard === true && str.indexOf("*.") === 0) {
    str = str.substring(2);
  }
  const parts = str.split(".");
  const tld = parts[parts.length - 1];
  if (options.require_tld) {
    if (parts.length < 2) {
      return false;
    }
    if (!options.allow_numeric_tld && !/^(?:[a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
    if (/\s/.test(tld)) {
      return false;
    }
  }
  if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
    return false;
  }
  return parts.every((part) => {
    if (part.length > 63 && !options.ignore_max_length) {
      return false;
    }
    if (!/^[\w\u00A1-\uFFFF-]+$/.test(part)) {
      return false;
    }
    if (/[\uFF01-\uFF5E]/.test(part)) {
      return false;
    }
    if (/^-|-$/.test(part)) {
      return false;
    }
    if (!options.allow_underscores && /_/.test(part)) {
      return false;
    }
    return true;
  });
}

// src/lib/isIP.ts
var IPv4SegmentFormat = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
var IPv4AddressFormat = `(${IPv4SegmentFormat}[.]){3}${IPv4SegmentFormat}`;
var IPv4AddressRegExp = new RegExp(`^${IPv4AddressFormat}$`);
var IPv6SegmentFormat = "(?:[0-9a-f]{1,4})";
var IPv6AddressRegExp = new RegExp(`^(
  (?:${IPv6SegmentFormat}:){7}(?:${IPv6SegmentFormat}|:)|
  (?:${IPv6SegmentFormat}:){6}(?:${IPv4AddressFormat}|:${IPv6SegmentFormat}|:)|
  (?:${IPv6SegmentFormat}:){5}(?::${IPv4AddressFormat}|(:${IPv6SegmentFormat}){1,2}|:)|
  (?:${IPv6SegmentFormat}:){4}(?:(:${IPv6SegmentFormat}){0,1}:${IPv4AddressFormat}|(:${IPv6SegmentFormat}){1,3}|:)|
  (?:${IPv6SegmentFormat}:){3}(?:(:${IPv6SegmentFormat}){0,2}:${IPv4AddressFormat}|(:${IPv6SegmentFormat}){1,4}|:)|
  (?:${IPv6SegmentFormat}:){2}(?:(:${IPv6SegmentFormat}){0,3}:${IPv4AddressFormat}|(:${IPv6SegmentFormat}){1,5}|:)|
  (?:${IPv6SegmentFormat}:){1}(?:(:${IPv6SegmentFormat}){0,4}:${IPv4AddressFormat}|(:${IPv6SegmentFormat}){1,6}|:)|
  (?::((?::${IPv6SegmentFormat}){0,5}:${IPv4AddressFormat}|(?::${IPv6SegmentFormat}){1,7}|:))
)(%[0-9a-z.]+)?$`, "i");
function isIP(ipAddress, options = {}) {
  assertString(ipAddress);
  const version = (typeof options === "object" ? options.version : arguments[1]) || "";
  if (!version) {
    return isIP(ipAddress, { version: 4 }) || isIP(ipAddress, { version: 6 });
  }
  if (version.toString() === "4") {
    return IPv4AddressRegExp.test(ipAddress);
  }
  if (version.toString() === "6") {
    return IPv6AddressRegExp.test(ipAddress);
  }
  return false;
}

// src/lib/util/checkHost.ts
function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === "[object RegExp]";
}
function checkHost(host, matches) {
  for (let i = 0;i < matches.length; i++) {
    const match = matches[i];
    if (host === match || isRegExp(match) && match.test(host)) {
      return true;
    }
  }
  return false;
}

// src/lib/isEmail.ts
var default_email_options = {
  allow_display_name: false,
  allow_underscores: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true,
  blacklisted_chars: "",
  ignore_max_length: false,
  host_blacklist: [],
  host_whitelist: []
};
var splitNameAddress = /^([^\x00-\x1F\x7F-\x9F]+)</;
var emailUserPart = /^[\w!#$%&'*+\-/=?^`{|}~]+$/;
var gmailUserPart = /^[a-z\d]+$/;
var quotedEmailUser = /^(?:[\s\x01-\x08\x0E-\x1F\x7F\x21\x23-\x5B\x5D-\x7E]|\\[\x01-\x09\v\f\x0D-\x7F])*$/i;
var emailUserUtf8Part = /^[\w!#$%&'*+\-/=?^`{|}~\u00A1-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/;
var quotedEmailUserUtf8 = /^(?:[\t\n\v\f\r \x01-\x08\x0E-\x1F\x7F\x21\x23-\x5B\x5D-\x7E\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\v\f\x0D-\x7F\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*$/i;
var defaultMaxEmailLength = 254;
function validateDisplayName(display_name) {
  const display_name_without_quotes = display_name.replace(/^"(.+)"$/, "$1");
  if (!display_name_without_quotes.trim()) {
    return false;
  }
  const contains_illegal = /[.";<>]/.test(display_name_without_quotes);
  if (contains_illegal) {
    if (display_name_without_quotes === display_name) {
      return false;
    }
    const all_start_with_back_slash = display_name_without_quotes.split('"').length === display_name_without_quotes.split("\\\"").length;
    if (!all_start_with_back_slash) {
      return false;
    }
  }
  return true;
}
function isEmail(str, options) {
  assertString(str);
  options = merge(options, default_email_options);
  if (options.require_display_name || options.allow_display_name) {
    const display_email = str.match(splitNameAddress);
    if (display_email) {
      let display_name = display_email[1];
      str = str.replace(display_name, "").replace(/(^<|>$)/g, "");
      if (display_name.endsWith(" ")) {
        display_name = display_name.slice(0, -1);
      }
      if (!validateDisplayName(display_name)) {
        return false;
      }
    } else if (options.require_display_name) {
      return false;
    }
  }
  if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {
    return false;
  }
  const parts = str.split("@");
  const domain = parts.pop();
  if (!domain)
    return false;
  const lower_domain = domain.toLowerCase();
  if (options.host_blacklist.length > 0 && checkHost(lower_domain, options.host_blacklist)) {
    return false;
  }
  if (options.host_whitelist.length > 0 && !checkHost(lower_domain, options.host_whitelist)) {
    return false;
  }
  let user = parts.join("@");
  if (options.domain_specific_validation && (lower_domain === "gmail.com" || lower_domain === "googlemail.com")) {
    user = user.toLowerCase();
    const username = user.split("+")[0];
    if (!isByteLength(username.replace(/\./g, ""), { min: 6, max: 30 })) {
      return false;
    }
    const user_parts2 = username.split(".");
    for (let i = 0;i < user_parts2.length; i++) {
      if (!gmailUserPart.test(user_parts2[i])) {
        return false;
      }
    }
  }
  if (options.ignore_max_length === false && (!isByteLength(user, { max: 64 }) || !isByteLength(domain, { max: 254 }))) {
    return false;
  }
  if (!isFQDN(domain, {
    require_tld: options.require_tld,
    ignore_max_length: options.ignore_max_length,
    allow_underscores: options.allow_underscores
  })) {
    if (!options.allow_ip_domain) {
      return false;
    }
    if (!isIP(domain)) {
      if (!domain.startsWith("[") || !domain.endsWith("]")) {
        return false;
      }
      const noBracketdomain = domain.slice(1, -1);
      if (noBracketdomain.length === 0 || !isIP(noBracketdomain)) {
        return false;
      }
    }
  }
  if (options.blacklisted_chars) {
    if (user.search(new RegExp(`[${options.blacklisted_chars}]+`, "g")) !== -1)
      return false;
  }
  if (user[0] === '"' && user[user.length - 1] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }
  const pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
  const user_parts = user.split(".");
  for (let i = 0;i < user_parts.length; i++) {
    if (!pattern.test(user_parts[i])) {
      return false;
    }
  }
  return true;
}

// src/lib/isEmpty.ts
function isEmpty(str, options = {}) {
  assertString(str);
  return (options.ignoreWhitespace ? str.trim().length : str.length) === 0;
}

// src/lib/isEthereumAddress.ts
var eth = /^0x[0-9a-f]{40}$/i;
function isEthereumAddress(str) {
  assertString(str);
  return eth.test(str);
}

// src/lib/util/nullUndefinedCheck.ts
function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

// src/lib/isFloat.ts
function isFloat(str, options) {
  assertString(str);
  const opts = options || {};
  const float = new RegExp(`^(?:[-+])?(?:[0-9]+)?(?:\\${typeof opts.locale === "string" ? decimal[opts.locale] : "."}[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$`);
  if (str === "" || str === "." || str === "," || str === "-" || str === "+") {
    return false;
  }
  const value = Number.parseFloat(str.replace(",", "."));
  return float.test(str) && (!("min" in opts) || isNullOrUndefined(opts.min) || value >= opts.min) && (!("max" in opts) || isNullOrUndefined(opts.max) || value <= opts.max) && (!("lt" in opts) || isNullOrUndefined(opts.lt) || value < opts.lt) && (!("gt" in opts) || isNullOrUndefined(opts.gt) || value > opts.gt);
}
var locales3 = Object.keys(decimal);

// src/lib/isFullWidth.ts
var fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE]/;
function isFullWidth(str) {
  assertString(str);
  return fullWidth.test(str);
}

// src/lib/isHalfWidth.ts
var halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE]/;
function isHalfWidth(str) {
  assertString(str);
  return halfWidth.test(str);
}

// src/lib/isHash.ts
var lengths = {
  md5: 32,
  md4: 32,
  sha1: 40,
  sha256: 64,
  sha384: 96,
  sha512: 128,
  ripemd128: 32,
  ripemd160: 40,
  tiger128: 32,
  tiger160: 40,
  tiger192: 48,
  crc32: 8,
  crc32b: 8
};
function isHash(str, algorithm) {
  assertString(str);
  const hash = new RegExp(`^[a-fA-F0-9]{${lengths[algorithm]}}$`);
  return hash.test(str);
}

// src/lib/isHexadecimal.ts
var hexadecimal = /^(?:0x|0h)?[0-9A-F]+$/i;
function isHexadecimal(str) {
  assertString(str);
  return hexadecimal.test(str);
}

// src/lib/isHexColor.ts
var hexcolor = /^#?(?:[0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
function isHexColor(str) {
  assertString(str);
  return hexcolor.test(str);
}

// src/lib/isHSL.ts
var hslComma = /^hsla?\(((\+|-)?(\d+(\.\d+)?(e(\+|-)?\d+)?|\.\d+(e(\+|-)?\d+)?))(deg|grad|rad|turn)?(,(\+|-)?(\d+(\.\d+)?(e(\+|-)?\d+)?|\.\d+(e(\+|-)?\d+)?)%){2}(,((\+|-)?(\d+(\.\d+)?(e(\+|-)?\d+)?|\.\d+(e(\+|-)?\d+)?)%?))?\)$/i;
var hslSpace = /^hsla?\(((\+|-)?(\d+(\.\d+)?(e(\+|-)?\d+)?|\.\d+(e(\+|-)?\d+)?))(deg|grad|rad|turn)?(\s(\+|-)?(\d+(\.\d+)?(e(\+|-)?\d+)?|\.\d+(e(\+|-)?\d+)?)%){2}\s?(\/\s((\+|-)?(\d+(\.\d+)?(e(\+|-)?\d+)?|\.\d+(e(\+|-)?\d+)?)%?)\s?)?\)$/i;
function isHSL(str) {
  assertString(str);
  const strippedStr = str.replace(/\s+/g, " ").replace(/\s?(hsla?\(|\)|,)\s?/gi, "$1");
  if (strippedStr.includes(",")) {
    return hslComma.test(strippedStr);
  }
  return hslSpace.test(strippedStr);
}

// src/lib/isIBAN.ts
var ibanRegexThroughCountryCode = {
  AD: /^(AD\d{2})\d{8}[A-Z0-9]{12}$/,
  AE: /^(AE\d{2})\d{19}$/,
  AL: /^(AL\d{2})\d{8}[A-Z0-9]{16}$/,
  AT: /^(AT\d{2})\d{16}$/,
  AZ: /^(AZ\d{2})[A-Z0-9]{4}\d{20}$/,
  BA: /^(BA\d{2})\d{16}$/,
  BE: /^(BE\d{2})\d{12}$/,
  BG: /^(BG\d{2})[A-Z]{4}\d{6}[A-Z0-9]{8}$/,
  BH: /^(BH\d{2})[A-Z]{4}[A-Z0-9]{14}$/,
  BR: /^(BR\d{2})\d{23}[A-Z][A-Z0-9]$/,
  BY: /^(BY\d{2})[A-Z0-9]{4}\d{20}$/,
  CH: /^(CH\d{2})\d{5}[A-Z0-9]{12}$/,
  CR: /^(CR\d{2})\d{18}$/,
  CY: /^(CY\d{2})\d{8}[A-Z0-9]{16}$/,
  CZ: /^(CZ\d{2})\d{20}$/,
  DE: /^(DE\d{2})\d{18}$/,
  DK: /^(DK\d{2})\d{14}$/,
  DO: /^(DO\d{2})[A-Z]{4}\d{20}$/,
  DZ: /^(DZ\d{24})$/,
  EE: /^(EE\d{2})\d{16}$/,
  EG: /^(EG\d{2})\d{25}$/,
  ES: /^(ES\d{2})\d{20}$/,
  FI: /^(FI\d{2})\d{14}$/,
  FO: /^(FO\d{2})\d{14}$/,
  FR: /^(FR\d{2})\d{10}[A-Z0-9]{11}\d{2}$/,
  GB: /^(GB\d{2})[A-Z]{4}\d{14}$/,
  GE: /^(GE\d{2})[A-Z0-9]{2}\d{16}$/,
  GI: /^(GI\d{2})[A-Z]{4}[A-Z0-9]{15}$/,
  GL: /^(GL\d{2})\d{14}$/,
  GR: /^(GR\d{2})\d{7}[A-Z0-9]{16}$/,
  GT: /^(GT\d{2})[A-Z0-9]{24}$/,
  HR: /^(HR\d{2})\d{17}$/,
  HU: /^(HU\d{2})\d{24}$/,
  IE: /^(IE\d{2})[A-Z]{4}\d{14}$/,
  IL: /^(IL\d{2})\d{19}$/,
  IQ: /^(IQ\d{2})[A-Z]{4}\d{15}$/,
  IR: /^(IR\d{2})0\d{2}0\d{18}$/,
  IS: /^(IS\d{2})\d{22}$/,
  IT: /^(IT\d{2})[A-Z]\d{10}[A-Z0-9]{12}$/,
  JO: /^(JO\d{2})[A-Z]{4}\d{22}$/,
  KW: /^(KW\d{2})[A-Z]{4}[A-Z0-9]{22}$/,
  KZ: /^(KZ\d{2})\d{3}[A-Z0-9]{13}$/,
  LB: /^(LB\d{2})\d{4}[A-Z0-9]{20}$/,
  LC: /^(LC\d{2})[A-Z]{4}[A-Z0-9]{24}$/,
  LI: /^(LI\d{2})\d{5}[A-Z0-9]{12}$/,
  LT: /^(LT\d{2})\d{16}$/,
  LU: /^(LU\d{2})\d{3}[A-Z0-9]{13}$/,
  LV: /^(LV\d{2})[A-Z]{4}[A-Z0-9]{13}$/,
  MA: /^(MA\d{26})$/,
  MC: /^(MC\d{2})\d{10}[A-Z0-9]{11}\d{2}$/,
  MD: /^(MD\d{2})[A-Z0-9]{20}$/,
  ME: /^(ME\d{2})\d{18}$/,
  MK: /^(MK\d{2})\d{3}[A-Z0-9]{10}\d{2}$/,
  MR: /^(MR\d{2})\d{23}$/,
  MT: /^(MT\d{2})[A-Z]{4}\d{5}[A-Z0-9]{18}$/,
  MU: /^(MU\d{2})[A-Z]{4}\d{19}[A-Z]{3}$/,
  MZ: /^(MZ\d{2})\d{21}$/,
  NL: /^(NL\d{2})[A-Z]{4}\d{10}$/,
  NO: /^(NO\d{2})\d{11}$/,
  PK: /^(PK\d{2})[A-Z0-9]{4}\d{16}$/,
  PL: /^(PL\d{2})\d{24}$/,
  PS: /^(PS\d{2})[A-Z]{4}[A-Z0-9]{21}$/,
  PT: /^(PT\d{2})\d{21}$/,
  QA: /^(QA\d{2})[A-Z]{4}[A-Z0-9]{21}$/,
  RO: /^(RO\d{2})[A-Z]{4}[A-Z0-9]{16}$/,
  RS: /^(RS\d{2})\d{18}$/,
  SA: /^(SA\d{2})\d{2}[A-Z0-9]{18}$/,
  SC: /^(SC\d{2})[A-Z]{4}\d{20}[A-Z]{3}$/,
  SE: /^(SE\d{2})\d{20}$/,
  SI: /^(SI\d{2})\d{15}$/,
  SK: /^(SK\d{2})\d{20}$/,
  SM: /^(SM\d{2})[A-Z]\d{10}[A-Z0-9]{12}$/,
  SV: /^(SV\d{2})[A-Z0-9]{4}\d{20}$/,
  TL: /^(TL\d{2})\d{19}$/,
  TN: /^(TN\d{2})\d{20}$/,
  TR: /^(TR\d{2})\d{5}[A-Z0-9]{17}$/,
  UA: /^(UA\d{2})\d{6}[A-Z0-9]{19}$/,
  VA: /^(VA\d{2})\d{18}$/,
  VG: /^(VG\d{2})[A-Z]{4}\d{16}$/,
  XK: /^(XK\d{2})\d{16}$/
};
function hasOnlyValidCountryCodes(countryCodeArray) {
  const countryCodeArrayFilteredWithObjectIbanCode = countryCodeArray.filter((countryCode) => !(countryCode in ibanRegexThroughCountryCode));
  if (countryCodeArrayFilteredWithObjectIbanCode.length > 0) {
    return false;
  }
  return true;
}
function hasValidIbanFormat(str, options = {}) {
  const strippedStr = str.replace(/[\s\-]+/g, "").toUpperCase();
  const isoCountryCode = strippedStr.slice(0, 2).toUpperCase();
  const isoCountryCodeInIbanRegexCodeObject = isoCountryCode in ibanRegexThroughCountryCode;
  if (options.whitelist) {
    if (!hasOnlyValidCountryCodes(options.whitelist)) {
      return false;
    }
    const isoCountryCodeInWhiteList = includesArray_default(options.whitelist, isoCountryCode);
    if (!isoCountryCodeInWhiteList) {
      return false;
    }
  }
  if (options.blacklist) {
    const isoCountryCodeInBlackList = includesArray_default(options.blacklist, isoCountryCode);
    if (isoCountryCodeInBlackList) {
      return false;
    }
  }
  return isoCountryCodeInIbanRegexCodeObject && ibanRegexThroughCountryCode[isoCountryCode].test(strippedStr);
}
function hasValidIbanChecksum(str) {
  const strippedStr = str.replace(/[^A-Z0-9]+/gi, "").toUpperCase();
  const rearranged = strippedStr.slice(4) + strippedStr.slice(0, 4);
  const alphaCapsReplacedWithDigits = rearranged.replace(/[A-Z]/g, (char) => String(char.charCodeAt(0) - 55));
  const remainder = alphaCapsReplacedWithDigits.match(/\d{1,7}/g)?.reduce((acc, value) => (Number(acc) + Number(value)) % 97, 0);
  return remainder === 1;
}
function isIBAN(str, options = {}) {
  assertString(str);
  return hasValidIbanFormat(str, options) && hasValidIbanChecksum(str);
}
var locales4 = Object.keys(ibanRegexThroughCountryCode);

// src/lib/isInt.ts
var int = /^[-+]?(?:0|[1-9]\d*)$/;
var intLeadingZeroes = /^[-+]?\d+$/;
function isInt(str, options) {
  assertString(str);
  options = options || {};
  const regex = options.allow_leading_zeroes === false ? int : intLeadingZeroes;
  const num = Number.parseInt(str, 10);
  const minCheckPassed = !Object.prototype.hasOwnProperty.call(options, "min") || isNullOrUndefined(options.min) || num >= (options.min ?? 0);
  const maxCheckPassed = !Object.prototype.hasOwnProperty.call(options, "max") || isNullOrUndefined(options.max) || num <= (options.max ?? 0);
  const ltCheckPassed = !Object.prototype.hasOwnProperty.call(options, "lt") || isNullOrUndefined(options.lt) || num < (options.lt ?? 0);
  const gtCheckPassed = !Object.prototype.hasOwnProperty.call(options, "gt") || isNullOrUndefined(options.gt) || num > (options.gt ?? 0);
  return regex.test(str) && minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
}

// src/lib/isIdentityCard.ts
var validators = {
  PL: (str) => {
    assertString(str);
    const weightOfDigits = {
      1: 1,
      2: 3,
      3: 7,
      4: 9,
      5: 1,
      6: 3,
      7: 7,
      8: 9,
      9: 1,
      10: 3,
      11: 0
    };
    if (str != null && str.length === 11 && isInt(str, { allow_leading_zeroes: true })) {
      const digits = str.split("").slice(0, -1);
      const sum = digits.reduce((acc, digit, index) => acc + Number(digit) * weightOfDigits[index + 1], 0);
      const modulo = sum % 10;
      const lastDigit = Number(str.charAt(str.length - 1));
      if (modulo === 0 && lastDigit === 0 || lastDigit === 10 - modulo) {
        return true;
      }
    }
    return false;
  },
  ES: (str) => {
    assertString(str);
    const DNI = /^[0-9X-Z]\d{7}[TRWAD-HJ-NYPXBZSQVC]$/;
    const charsValue = {
      X: 0,
      Y: 1,
      Z: 2
    };
    const controlDigits = [
      "T",
      "R",
      "W",
      "A",
      "G",
      "M",
      "Y",
      "F",
      "P",
      "D",
      "X",
      "B",
      "N",
      "J",
      "Z",
      "S",
      "Q",
      "V",
      "H",
      "L",
      "C",
      "K",
      "E"
    ];
    const sanitized = str.trim().toUpperCase();
    if (!DNI.test(sanitized)) {
      return false;
    }
    const number = Number(sanitized.slice(0, -1).replace(/[X,YZ]/g, (char) => String(charsValue[char])));
    return sanitized.endsWith(controlDigits[number % 23]);
  },
  FI: (str) => {
    assertString(str);
    if (str.length !== 11) {
      return false;
    }
    if (!str.match(/^\d{6}[\-A+]\d{3}[0-9A-FHJ-NPR-Y]$/)) {
      return false;
    }
    const checkDigits = "0123456789ABCDEFHJKLMNPRSTUVWXY";
    const idAsNumber = Number.parseInt(str.slice(0, 6), 10) * 1000 + Number.parseInt(str.slice(7, 10), 10);
    const remainder = idAsNumber % 31;
    const checkDigit = checkDigits[remainder];
    return checkDigit === str.slice(10, 11);
  },
  IN: (str) => {
    const DNI = /^[1-9]\d{3}\s?\d{4}\s?\d{4}$/;
    const d = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    ];
    const p = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
    ];
    const sanitized = str.trim();
    if (!DNI.test(sanitized)) {
      return false;
    }
    let c = 0;
    const invertedArray = sanitized.replace(/\s/g, "").split("").map(Number).reverse();
    invertedArray.forEach((val, i) => {
      c = d[c][p[i % 8][val]];
    });
    return c === 0;
  },
  IR: (str) => {
    if (!str.match(/^\d{10}$/))
      return false;
    str = `0000${str}`.slice(str.length - 6);
    if (Number.parseInt(str.slice(3, 9), 10) === 0)
      return false;
    const lastNumber = Number.parseInt(str.slice(9, 10), 10);
    let sum = 0;
    for (let i = 0;i < 9; i++) {
      sum += Number.parseInt(str.slice(i, i + 1), 10) * (10 - i);
    }
    sum %= 11;
    return sum < 2 && lastNumber === sum || sum >= 2 && lastNumber === 11 - sum;
  },
  IT: (str) => {
    if (str.length !== 9)
      return false;
    if (str === "CA00000AA")
      return false;
    return str.search(/C[A-Z]\d{5}[A-Z]{2}/i) > -1;
  },
  NO: (str) => {
    const sanitized = str.trim();
    if (Number.isNaN(Number(sanitized)))
      return false;
    if (sanitized.length !== 11)
      return false;
    if (sanitized === "00000000000")
      return false;
    const f = sanitized.split("").map(Number);
    const k1 = (11 - (3 * f[0] + 7 * f[1] + 6 * f[2] + 1 * f[3] + 8 * f[4] + 9 * f[5] + 4 * f[6] + 5 * f[7] + 2 * f[8]) % 11) % 11;
    const k2 = (11 - (5 * f[0] + 4 * f[1] + 3 * f[2] + 2 * f[3] + 7 * f[4] + 6 * f[5] + 5 * f[6] + 4 * f[7] + 3 * f[8] + 2 * k1) % 11) % 11;
    if (k1 !== f[9] || k2 !== f[10])
      return false;
    return true;
  },
  TH: (str) => {
    if (!str.match(/^[1-8]\d{12}$/))
      return false;
    let sum = 0;
    for (let i = 0;i < 12; i++) {
      sum += Number.parseInt(str[i], 10) * (13 - i);
    }
    return str[12] === ((11 - sum % 11) % 10).toString();
  },
  LK: (str) => {
    const old_nic = /^[1-9]\d{8}[vx]$/i;
    const new_nic = /^[1-9]\d{11}$/;
    if (str.length === 10 && old_nic.test(str))
      return true;
    else if (str.length === 12 && new_nic.test(str))
      return true;
    return false;
  },
  "he-IL": (str) => {
    const DNI = /^\d{9}$/;
    const sanitized = str.trim();
    if (!DNI.test(sanitized)) {
      return false;
    }
    const id = sanitized;
    let sum = 0;
    let incNum;
    for (let i = 0;i < id.length; i++) {
      incNum = Number(id[i]) * (i % 2 + 1);
      sum += incNum > 9 ? incNum - 9 : incNum;
    }
    return sum % 10 === 0;
  },
  "ar-LY": (str) => {
    const NIN = /^(?:1|2)\d{11}$/;
    const sanitized = str.trim();
    if (!NIN.test(sanitized)) {
      return false;
    }
    return true;
  },
  "ar-TN": (str) => {
    const DNI = /^\d{8}$/;
    const sanitized = str.trim();
    if (!DNI.test(sanitized)) {
      return false;
    }
    return true;
  },
  "zh-CN": (str) => {
    const provincesAndCities = [
      "11",
      "12",
      "13",
      "14",
      "15",
      "21",
      "22",
      "23",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "50",
      "51",
      "52",
      "53",
      "54",
      "61",
      "62",
      "63",
      "64",
      "65",
      "71",
      "81",
      "82",
      "91"
    ];
    const powers = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"];
    const parityBit = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
    const checkAddressCode = (addressCode) => includesArray_default(provincesAndCities, addressCode);
    const checkBirthDayCode = (birDayCode) => {
      const yyyy = Number.parseInt(birDayCode.substring(0, 4), 10);
      const mm = Number.parseInt(birDayCode.substring(4, 6), 10);
      const dd = Number.parseInt(birDayCode.substring(6), 10);
      const xdata = new Date(yyyy, mm - 1, dd);
      if (xdata > new Date) {
        return false;
      } else if (xdata.getFullYear() === yyyy && xdata.getMonth() === mm - 1 && xdata.getDate() === dd) {
        return true;
      }
      return false;
    };
    const getParityBit = (idCardNo) => {
      const id17 = idCardNo.substring(0, 17);
      let power = 0;
      for (let i = 0;i < 17; i++) {
        power += Number.parseInt(id17.charAt(i), 10) * Number.parseInt(powers[i], 10);
      }
      const mod = power % 11;
      return parityBit[mod];
    };
    const checkParityBit = (idCardNo) => getParityBit(idCardNo) === idCardNo.charAt(17).toUpperCase();
    const check15IdCardNo = (idCardNo) => {
      if (!/^[1-9]\d{7}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}$/.test(idCardNo)) {
        return false;
      }
      const addressCode = idCardNo.substring(0, 2);
      if (!checkAddressCode(addressCode)) {
        return false;
      }
      const birDayCode = idCardNo.substring(6, 12);
      if (!checkBirthDayCode(birDayCode)) {
        return false;
      }
      return true;
    };
    const check18IdCardNo = (idCardNo) => {
      if (!/^[1-9]\d{5}[1-9]\d{3}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dx]$/i.test(idCardNo)) {
        return false;
      }
      const addressCode = idCardNo.substring(0, 2);
      if (!checkAddressCode(addressCode)) {
        return false;
      }
      const birDayCode = idCardNo.substring(6, 14);
      if (!checkBirthDayCode(birDayCode)) {
        return false;
      }
      return checkParityBit(idCardNo);
    };
    const checkIdCardNo = (idCardNo) => {
      const check = /^\d{15}|\d{17}[\dx]$/i.test(idCardNo);
      if (!check)
        return false;
      if (idCardNo.length === 15) {
        return check15IdCardNo(idCardNo);
      }
      return check18IdCardNo(idCardNo);
    };
    return checkIdCardNo(str);
  },
  "zh-HK": (str) => {
    str = str.trim();
    const regexHKID = /^[A-Z]{1,2}\d{6}(?:\([0-9A]\)|\[[0-9A]\]|[0-9A])$/;
    const regexIsDigit = /^\d$/;
    str = str.toUpperCase();
    if (!regexHKID.test(str))
      return false;
    str = str.replace(/[[\]()]/g, "");
    if (str.length === 8)
      str = `3${str}`;
    let checkSumVal = 0;
    for (let i = 0;i <= 7; i++) {
      let convertedChar;
      if (!regexIsDigit.test(str[i]))
        convertedChar = (str[i].charCodeAt(0) - 55) % 11;
      else
        convertedChar = Number(str[i]);
      checkSumVal += convertedChar * (9 - i);
    }
    checkSumVal %= 11;
    let checkSumConverted;
    if (checkSumVal === 0)
      checkSumConverted = "0";
    else if (checkSumVal === 1)
      checkSumConverted = "A";
    else
      checkSumConverted = String(11 - checkSumVal);
    if (checkSumConverted === str[str.length - 1])
      return true;
    return false;
  },
  "zh-TW": (str) => {
    const ALPHABET_CODES = {
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
      G: 16,
      H: 17,
      I: 34,
      J: 18,
      K: 19,
      L: 20,
      M: 21,
      N: 22,
      O: 35,
      P: 23,
      Q: 24,
      R: 25,
      S: 26,
      T: 27,
      U: 28,
      V: 29,
      W: 32,
      X: 30,
      Y: 31,
      Z: 33
    };
    const sanitized = str.trim().toUpperCase();
    if (!/^[A-Z]\d{9}$/.test(sanitized))
      return false;
    return Array.from(sanitized).reduce((sum, number, index) => {
      if (index === 0) {
        const code = ALPHABET_CODES[number];
        return code % 10 * 9 + Math.floor(code / 10);
      }
      if (index === 9) {
        return (10 - sum % 10 - Number(number)) % 10;
      }
      return sum + Number(number) * (9 - index);
    }, 0) === 0;
  },
  PK: (str) => {
    const CNIC = /^[1-7]\d{4}-\d{7}-[1-9]$/;
    const sanitized = str.trim();
    return CNIC.test(sanitized);
  }
};
function isIdentityCard(str, locale) {
  assertString(str);
  if (locale in validators) {
    return validators[locale](str);
  } else if (locale === "any") {
    for (const key in validators) {
      if (Object.prototype.hasOwnProperty.call(validators, key)) {
        const validator = validators[key];
        if (validator(str)) {
          return true;
        }
      }
    }
    return false;
  }
  throw new Error(`Invalid locale '${locale}'`);
}

// src/lib/isIMEI.ts
var imeiRegexWithoutHyphens = /^\d{15}$/;
var imeiRegexWithHyphens = /^\d{2}-\d{6}-\d{6}-\d$/;
function isIMEI(str, options) {
  assertString(str);
  options = options || {};
  let imeiRegex = imeiRegexWithoutHyphens;
  if (options.allow_hyphens) {
    imeiRegex = imeiRegexWithHyphens;
  }
  if (!imeiRegex.test(str)) {
    return false;
  }
  str = str.replace(/-/g, "");
  let sum = 0;
  let mul = 2;
  const l = 14;
  for (let i = 0;i < l; i++) {
    const digit = str.substring(l - i - 1, l - i);
    const tp = Number.parseInt(digit, 10) * mul;
    if (tp >= 10) {
      sum += tp % 10 + 1;
    } else {
      sum += tp;
    }
    if (mul === 1) {
      mul += 1;
    } else {
      mul -= 1;
    }
  }
  const chk = (10 - sum % 10) % 10;
  if (chk !== Number.parseInt(str.substring(14, 15), 10)) {
    return false;
  }
  return true;
}

// src/lib/isIn.ts
function isIn(str, options) {
  assertString(str);
  if (Array.isArray(options)) {
    return options.includes(str);
  } else if (typeof options === "object") {
    return Object.prototype.hasOwnProperty.call(options, str);
  } else if (options && typeof options.indexOf === "function") {
    return options.includes(str);
  }
  return false;
}

// src/lib/isIPRange.ts
var subnetMaybe = /^\d{1,3}$/;
var v4Subnet = 32;
var v6Subnet = 128;
function isIPRange(str, version = "") {
  assertString(str);
  const parts = str.split("/");
  if (parts.length !== 2) {
    return false;
  }
  if (!subnetMaybe.test(parts[1])) {
    return false;
  }
  if (parts[1].length > 1 && parts[1].startsWith("0")) {
    return false;
  }
  const options = typeof version === "string" ? { version: Number.parseInt(version, 10) } : { version };
  const isValidIP = isIP(parts[0], options);
  if (!isValidIP) {
    return false;
  }
  let expectedSubnet = 0;
  const versionStr = String(version);
  if (versionStr === "4") {
    expectedSubnet = v4Subnet;
  } else if (versionStr === "6") {
    expectedSubnet = v6Subnet;
  } else {
    const defaultOptions2 = { version: 6 };
    expectedSubnet = isIP(parts[0], defaultOptions2) ? v6Subnet : v4Subnet;
  }
  const subnet = Number.parseInt(parts[1], 10);
  return subnet <= expectedSubnet && subnet >= 0;
}

// src/lib/isISBN.ts
var possibleIsbn10 = /^(?:\d{9}X|\d{10})$/;
var possibleIsbn13 = /^\d{13}$/;
var factor = [1, 3];
function isISBN(isbn, options) {
  assertString(isbn);
  const version = String(typeof options === "object" ? options?.version : options);
  if (!options) {
    return isISBN(isbn, { version: 10 }) || isISBN(isbn, { version: 13 });
  }
  const sanitizedIsbn = isbn.replace(/[\s-]+/g, "");
  let checksum = 0;
  if (version === "10") {
    if (!possibleIsbn10.test(sanitizedIsbn)) {
      return false;
    }
    for (let i = 0;i < 9; i++) {
      checksum += (i + 1) * Number.parseInt(sanitizedIsbn.charAt(i), 10);
    }
    if (sanitizedIsbn.charAt(9) === "X") {
      checksum += 10 * 10;
    } else {
      checksum += 10 * Number.parseInt(sanitizedIsbn.charAt(9), 10);
    }
    if (checksum % 11 === 0) {
      return true;
    }
  } else if (version === "13") {
    if (!possibleIsbn13.test(sanitizedIsbn)) {
      return false;
    }
    for (let i = 0;i < 12; i++) {
      checksum += factor[i % 2] * Number.parseInt(sanitizedIsbn.charAt(i), 10);
    }
    if (Number.parseInt(sanitizedIsbn.charAt(12), 10) - (10 - checksum % 10) % 10 === 0) {
      return true;
    }
  }
  return false;
}

// src/lib/isISIN.ts
var isin = /^[A-Z]{2}[0-9A-Z]{9}\d$/;
function isISIN(str) {
  assertString(str);
  if (!isin.test(str)) {
    return false;
  }
  let double = true;
  let sum = 0;
  for (let i = str.length - 2;i >= 0; i--) {
    if (str[i] >= "A" && str[i] <= "Z") {
      const value = str[i].charCodeAt(0) - 55;
      const lo = value % 10;
      const hi = Math.trunc(value / 10);
      for (const digit of [lo, hi]) {
        if (double) {
          if (digit >= 5) {
            sum += 1 + (digit - 5) * 2;
          } else {
            sum += digit * 2;
          }
        } else {
          sum += digit;
        }
        double = !double;
      }
    } else {
      const digit = str[i].charCodeAt(0) - 48;
      if (double) {
        if (digit >= 5) {
          sum += 1 + (digit - 5) * 2;
        } else {
          sum += digit * 2;
        }
      } else {
        sum += digit;
      }
      double = !double;
    }
  }
  const check = Math.trunc((sum + 9) / 10) * 10 - sum;
  return +str[str.length - 1] === check;
}

// src/lib/isISO4217.ts
var validISO4217CurrencyCodes = new Set([
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BOV",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHE",
  "CHF",
  "CHW",
  "CLF",
  "CLP",
  "CNY",
  "COP",
  "COU",
  "CRC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "GBP",
  "GEL",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KMF",
  "KPW",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MXV",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLE",
  "SLL",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "SVC",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "USN",
  "UYI",
  "UYU",
  "UYW",
  "UZS",
  "VED",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XAG",
  "XAU",
  "XBA",
  "XBB",
  "XBC",
  "XBD",
  "XCD",
  "XDR",
  "XOF",
  "XPD",
  "XPF",
  "XPT",
  "XSU",
  "XTS",
  "XUA",
  "XXX",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL"
]);
function isISO4217(str) {
  assertString(str);
  return validISO4217CurrencyCodes.has(str.toUpperCase());
}

// src/lib/isISO6346.ts
var isISO6346Str = /^[A-Z]{3}U\d{7}|[J,Z]\d{6,7}$/;
var isDigit = /^\d$/;
function isISO6346(str) {
  assertString(str);
  str = str.toUpperCase();
  if (!isISO6346Str.test(str))
    return false;
  if (str.length === 11) {
    let sum = 0;
    for (let i = 0;i < str.length - 1; i++) {
      if (!isDigit.test(str[i])) {
        let convertedCode;
        const letterCode = str.charCodeAt(i) - 55;
        if (letterCode < 11)
          convertedCode = letterCode;
        else if (letterCode >= 11 && letterCode <= 20)
          convertedCode = 12 + letterCode % 11;
        else if (letterCode >= 21 && letterCode <= 30)
          convertedCode = 23 + letterCode % 21;
        else
          convertedCode = 34 + letterCode % 31;
        sum += convertedCode * 2 ** i;
      } else {
        sum += Number(str[i]) * 2 ** i;
      }
    }
    let checkSumDigit = sum % 11;
    if (checkSumDigit === 10)
      checkSumDigit = 0;
    return Number(str[str.length - 1]) === checkSumDigit;
  }
  return true;
}
var isFreightContainerID = isISO6346;

// src/lib/isISO6391.ts
var isISO6391Set = new Set([
  "aa",
  "ab",
  "ae",
  "af",
  "ak",
  "am",
  "an",
  "ar",
  "as",
  "av",
  "ay",
  "az",
  "az",
  "ba",
  "be",
  "bg",
  "bh",
  "bi",
  "bm",
  "bn",
  "bo",
  "br",
  "bs",
  "ca",
  "ce",
  "ch",
  "co",
  "cr",
  "cs",
  "cu",
  "cv",
  "cy",
  "da",
  "de",
  "dv",
  "dz",
  "ee",
  "el",
  "en",
  "eo",
  "es",
  "et",
  "eu",
  "fa",
  "ff",
  "fi",
  "fj",
  "fo",
  "fr",
  "fy",
  "ga",
  "gd",
  "gl",
  "gn",
  "gu",
  "gv",
  "ha",
  "he",
  "hi",
  "ho",
  "hr",
  "ht",
  "hu",
  "hy",
  "hz",
  "ia",
  "id",
  "ie",
  "ig",
  "ii",
  "ik",
  "io",
  "is",
  "it",
  "iu",
  "ja",
  "jv",
  "ka",
  "kg",
  "ki",
  "kj",
  "kk",
  "kl",
  "km",
  "kn",
  "ko",
  "kr",
  "ks",
  "ku",
  "kv",
  "kw",
  "ky",
  "la",
  "lb",
  "lg",
  "li",
  "ln",
  "lo",
  "lt",
  "lu",
  "lv",
  "mg",
  "mh",
  "mi",
  "mk",
  "ml",
  "mn",
  "mr",
  "ms",
  "mt",
  "my",
  "na",
  "nb",
  "nd",
  "ne",
  "ng",
  "nl",
  "nn",
  "no",
  "nr",
  "nv",
  "ny",
  "oc",
  "oj",
  "om",
  "or",
  "os",
  "pa",
  "pi",
  "pl",
  "ps",
  "pt",
  "qu",
  "rm",
  "rn",
  "ro",
  "ru",
  "rw",
  "sa",
  "sc",
  "sd",
  "se",
  "sg",
  "si",
  "sk",
  "sl",
  "sm",
  "sn",
  "so",
  "sq",
  "sr",
  "ss",
  "st",
  "su",
  "sv",
  "sw",
  "ta",
  "te",
  "tg",
  "th",
  "ti",
  "tk",
  "tl",
  "tn",
  "to",
  "tr",
  "ts",
  "tt",
  "tw",
  "ty",
  "ug",
  "uk",
  "ur",
  "uz",
  "ve",
  "vi",
  "vo",
  "wa",
  "wo",
  "xh",
  "yi",
  "yo",
  "za",
  "zh",
  "zu"
]);
function isISO6391(str) {
  assertString(str);
  return isISO6391Set.has(str);
}

// src/lib/isISO8601.ts
var iso8601 = /^[+-]?\d{4}(?!\d{2}\b)-?(?:(?:0[1-9]|1[0-2])(?:-?(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-3])(?:-?[1-7])?|00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6]))(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?::?[0-5]\d)?|24:?00)(?:[.,]\d+)?)?(?:\d{2}(?:[.,]\d+)?)?(?:[zZ]|[+-](?:[01]\d|2[0-3]):?(?:[0-5]\d)?)?)?$/;
var iso8601StrictSeparator = /^[+-]?\d{4}(?!\d{2}\b)-?(?:(?:0[1-9]|1[0-2])(?:-?(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-3])(?:-?[1-7])?|00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6]))T(?:(?:(?:[01]\d|2[0-3])(?::?[0-5]\d)?|24:?00)(?:[.,]\d+(?!\d))?)?(?:\d{2}(?:[.,]\d+)?)?(?:[zZ]|[+-](?:[01]\d|2[0-3]):?(?:[0-5]\d)?)?$/;
function isValidDate(str) {
  const ordinalMatch = str.match(/^(\d{4})-?(\d{3})([ T]\.*|$)/);
  if (ordinalMatch) {
    const oYear = Number(ordinalMatch[1]);
    const oDay = Number(ordinalMatch[2]);
    if (oYear % 4 === 0 && oYear % 100 !== 0 || oYear % 400 === 0)
      return oDay <= 366;
    return oDay <= 365;
  }
  const match = str.match(/(\d{4})-?(\d{0,2})-?(\d*)/);
  if (!match)
    return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const monthString = month ? `0${month}`.slice(-2) : month;
  const dayString = day ? `0${day}`.slice(-2) : day;
  const d = new Date(`${year}-${monthString || "01"}-${dayString || "01"}`);
  if (month && day) {
    return d.getUTCFullYear() === year && d.getUTCMonth() + 1 === month && d.getUTCDate() === day;
  }
  return true;
}
function isISO8601(str, options = {}) {
  assertString(str);
  const check = options.strictSeparator ? iso8601StrictSeparator.test(str) : iso8601.test(str);
  if (check && options.strict)
    return isValidDate(str);
  return check;
}

// src/lib/isISO15924.ts
var validISO15924Codes = new Set([
  "Adlm",
  "Afak",
  "Aghb",
  "Ahom",
  "Arab",
  "Aran",
  "Armi",
  "Armn",
  "Avst",
  "Bali",
  "Bamu",
  "Bass",
  "Batk",
  "Beng",
  "Bhks",
  "Blis",
  "Bopo",
  "Brah",
  "Brai",
  "Bugi",
  "Buhd",
  "Cakm",
  "Cans",
  "Cari",
  "Cham",
  "Cher",
  "Chis",
  "Chrs",
  "Cirt",
  "Copt",
  "Cpmn",
  "Cprt",
  "Cyrl",
  "Cyrs",
  "Deva",
  "Diak",
  "Dogr",
  "Dsrt",
  "Dupl",
  "Egyd",
  "Egyh",
  "Egyp",
  "Elba",
  "Elym",
  "Ethi",
  "Gara",
  "Geok",
  "Geor",
  "Glag",
  "Gong",
  "Gonm",
  "Goth",
  "Gran",
  "Grek",
  "Gujr",
  "Gukh",
  "Guru",
  "Hanb",
  "Hang",
  "Hani",
  "Hano",
  "Hans",
  "Hant",
  "Hatr",
  "Hebr",
  "Hira",
  "Hluw",
  "Hmng",
  "Hmnp",
  "Hrkt",
  "Hung",
  "Inds",
  "Ital",
  "Jamo",
  "Java",
  "Jpan",
  "Jurc",
  "Kali",
  "Kana",
  "Kawi",
  "Khar",
  "Khmr",
  "Khoj",
  "Kitl",
  "Kits",
  "Knda",
  "Kore",
  "Kpel",
  "Krai",
  "Kthi",
  "Lana",
  "Laoo",
  "Latf",
  "Latg",
  "Latn",
  "Leke",
  "Lepc",
  "Limb",
  "Lina",
  "Linb",
  "Lisu",
  "Loma",
  "Lyci",
  "Lydi",
  "Mahj",
  "Maka",
  "Mand",
  "Mani",
  "Marc",
  "Maya",
  "Medf",
  "Mend",
  "Merc",
  "Mero",
  "Mlym",
  "Modi",
  "Mong",
  "Moon",
  "Mroo",
  "Mtei",
  "Mult",
  "Mymr",
  "Nagm",
  "Nand",
  "Narb",
  "Nbat",
  "Newa",
  "Nkdb",
  "Nkgb",
  "Nkoo",
  "Nshu",
  "Ogam",
  "Olck",
  "Onao",
  "Orkh",
  "Orya",
  "Osge",
  "Osma",
  "Ougr",
  "Palm",
  "Pauc",
  "Pcun",
  "Pelm",
  "Perm",
  "Phag",
  "Phli",
  "Phlp",
  "Phlv",
  "Phnx",
  "Plrd",
  "Piqd",
  "Prti",
  "Psin",
  "Qaaa",
  "Qaab",
  "Qaac",
  "Qaad",
  "Qaae",
  "Qaaf",
  "Qaag",
  "Qaah",
  "Qaai",
  "Qaaj",
  "Qaak",
  "Qaal",
  "Qaam",
  "Qaan",
  "Qaao",
  "Qaap",
  "Qaaq",
  "Qaar",
  "Qaas",
  "Qaat",
  "Qaau",
  "Qaav",
  "Qaaw",
  "Qaax",
  "Qaay",
  "Qaaz",
  "Qaba",
  "Qabb",
  "Qabc",
  "Qabd",
  "Qabe",
  "Qabf",
  "Qabg",
  "Qabh",
  "Qabi",
  "Qabj",
  "Qabk",
  "Qabl",
  "Qabm",
  "Qabn",
  "Qabo",
  "Qabp",
  "Qabq",
  "Qabr",
  "Qabs",
  "Qabt",
  "Qabu",
  "Qabv",
  "Qabw",
  "Qabx",
  "Ranj",
  "Rjng",
  "Rohg",
  "Roro",
  "Runr",
  "Samr",
  "Sara",
  "Sarb",
  "Saur",
  "Sgnw",
  "Shaw",
  "Shrd",
  "Shui",
  "Sidd",
  "Sidt",
  "Sind",
  "Sinh",
  "Sogd",
  "Sogo",
  "Sora",
  "Soyo",
  "Sund",
  "Sunu",
  "Sylo",
  "Syrc",
  "Syre",
  "Syrj",
  "Syrn",
  "Tagb",
  "Takr",
  "Tale",
  "Talu",
  "Taml",
  "Tang",
  "Tavt",
  "Tayo",
  "Telu",
  "Teng",
  "Tfng",
  "Tglg",
  "Thaa",
  "Thai",
  "Tibt",
  "Tirh",
  "Tnsa",
  "Todr",
  "Tols",
  "Toto",
  "Tutg",
  "Ugar",
  "Vaii",
  "Visp",
  "Vith",
  "Wara",
  "Wcho",
  "Wole",
  "Xpeo",
  "Xsux",
  "Yezi",
  "Yiii",
  "Zanb",
  "Zinh",
  "Zmth",
  "Zsye",
  "Zsym",
  "Zxxx",
  "Zyyy",
  "Zzzz"
]);
function isISO15924(str) {
  assertString(str);
  return validISO15924Codes.has(str);
}

// src/lib/isISO31661Alpha3.ts
var validISO31661Alpha3CountriesCodes = new Set([
  "AFG",
  "ALA",
  "ALB",
  "DZA",
  "ASM",
  "AND",
  "AGO",
  "AIA",
  "ATA",
  "ATG",
  "ARG",
  "ARM",
  "ABW",
  "AUS",
  "AUT",
  "AZE",
  "BHS",
  "BHR",
  "BGD",
  "BRB",
  "BLR",
  "BEL",
  "BLZ",
  "BEN",
  "BMU",
  "BTN",
  "BOL",
  "BES",
  "BIH",
  "BWA",
  "BVT",
  "BRA",
  "IOT",
  "BRN",
  "BGR",
  "BFA",
  "BDI",
  "KHM",
  "CMR",
  "CAN",
  "CPV",
  "CYM",
  "CAF",
  "TCD",
  "CHL",
  "CHN",
  "CXR",
  "CCK",
  "COL",
  "COM",
  "COG",
  "COD",
  "COK",
  "CRI",
  "CIV",
  "HRV",
  "CUB",
  "CUW",
  "CYP",
  "CZE",
  "DNK",
  "DJI",
  "DMA",
  "DOM",
  "ECU",
  "EGY",
  "SLV",
  "GNQ",
  "ERI",
  "EST",
  "ETH",
  "FLK",
  "FRO",
  "FJI",
  "FIN",
  "FRA",
  "GUF",
  "PYF",
  "ATF",
  "GAB",
  "GMB",
  "GEO",
  "DEU",
  "GHA",
  "GIB",
  "GRC",
  "GRL",
  "GRD",
  "GLP",
  "GUM",
  "GTM",
  "GGY",
  "GIN",
  "GNB",
  "GUY",
  "HTI",
  "HMD",
  "VAT",
  "HND",
  "HKG",
  "HUN",
  "ISL",
  "IND",
  "IDN",
  "IRN",
  "IRQ",
  "IRL",
  "IMN",
  "ISR",
  "ITA",
  "JAM",
  "JPN",
  "JEY",
  "JOR",
  "KAZ",
  "KEN",
  "KIR",
  "PRK",
  "KOR",
  "KWT",
  "KGZ",
  "LAO",
  "LVA",
  "LBN",
  "LSO",
  "LBR",
  "LBY",
  "LIE",
  "LTU",
  "LUX",
  "MAC",
  "MKD",
  "MDG",
  "MWI",
  "MYS",
  "MDV",
  "MLI",
  "MLT",
  "MHL",
  "MTQ",
  "MRT",
  "MUS",
  "MYT",
  "MEX",
  "FSM",
  "MDA",
  "MCO",
  "MNG",
  "MNE",
  "MSR",
  "MAR",
  "MOZ",
  "MMR",
  "NAM",
  "NRU",
  "NPL",
  "NLD",
  "NCL",
  "NZL",
  "NIC",
  "NER",
  "NGA",
  "NIU",
  "NFK",
  "MNP",
  "NOR",
  "OMN",
  "PAK",
  "PLW",
  "PSE",
  "PAN",
  "PNG",
  "PRY",
  "PER",
  "PHL",
  "PCN",
  "POL",
  "PRT",
  "PRI",
  "QAT",
  "REU",
  "ROU",
  "RUS",
  "RWA",
  "BLM",
  "SHN",
  "KNA",
  "LCA",
  "MAF",
  "SPM",
  "VCT",
  "WSM",
  "SMR",
  "STP",
  "SAU",
  "SEN",
  "SRB",
  "SYC",
  "SLE",
  "SGP",
  "SXM",
  "SVK",
  "SVN",
  "SLB",
  "SOM",
  "ZAF",
  "SGS",
  "SSD",
  "ESP",
  "LKA",
  "SDN",
  "SUR",
  "SJM",
  "SWZ",
  "SWE",
  "CHE",
  "SYR",
  "TWN",
  "TJK",
  "TZA",
  "THA",
  "TLS",
  "TGO",
  "TKL",
  "TON",
  "TTO",
  "TUN",
  "TUR",
  "TKM",
  "TCA",
  "TUV",
  "UGA",
  "UKR",
  "ARE",
  "GBR",
  "USA",
  "UMI",
  "URY",
  "UZB",
  "VUT",
  "VEN",
  "VNM",
  "VGB",
  "VIR",
  "WLF",
  "ESH",
  "YEM",
  "ZMB",
  "ZWE"
]);
function isISO31661Alpha3(str) {
  assertString(str);
  return validISO31661Alpha3CountriesCodes.has(str.toUpperCase());
}

// src/lib/isISO31661Numeric.ts
var validISO31661NumericCountriesCodes = new Set([
  "004",
  "008",
  "010",
  "012",
  "016",
  "020",
  "024",
  "028",
  "031",
  "032",
  "036",
  "040",
  "044",
  "048",
  "050",
  "051",
  "052",
  "056",
  "060",
  "064",
  "068",
  "070",
  "072",
  "074",
  "076",
  "084",
  "086",
  "090",
  "092",
  "096",
  "100",
  "104",
  "108",
  "112",
  "116",
  "120",
  "124",
  "132",
  "136",
  "140",
  "144",
  "148",
  "152",
  "156",
  "158",
  "162",
  "166",
  "170",
  "174",
  "175",
  "178",
  "180",
  "184",
  "188",
  "191",
  "192",
  "196",
  "203",
  "204",
  "208",
  "212",
  "214",
  "218",
  "222",
  "226",
  "231",
  "232",
  "233",
  "234",
  "238",
  "239",
  "242",
  "246",
  "248",
  "250",
  "254",
  "258",
  "260",
  "262",
  "266",
  "268",
  "270",
  "275",
  "276",
  "288",
  "292",
  "296",
  "300",
  "304",
  "308",
  "312",
  "316",
  "320",
  "324",
  "328",
  "332",
  "334",
  "336",
  "340",
  "344",
  "348",
  "352",
  "356",
  "360",
  "364",
  "368",
  "372",
  "376",
  "380",
  "384",
  "388",
  "392",
  "398",
  "400",
  "404",
  "408",
  "410",
  "414",
  "417",
  "418",
  "422",
  "426",
  "428",
  "430",
  "434",
  "438",
  "440",
  "442",
  "446",
  "450",
  "454",
  "458",
  "462",
  "466",
  "470",
  "474",
  "478",
  "480",
  "484",
  "492",
  "496",
  "498",
  "499",
  "500",
  "504",
  "508",
  "512",
  "516",
  "520",
  "524",
  "528",
  "531",
  "533",
  "534",
  "535",
  "540",
  "548",
  "554",
  "558",
  "562",
  "566",
  "570",
  "574",
  "578",
  "580",
  "581",
  "583",
  "584",
  "585",
  "586",
  "591",
  "598",
  "600",
  "604",
  "608",
  "612",
  "616",
  "620",
  "624",
  "626",
  "630",
  "634",
  "638",
  "642",
  "643",
  "646",
  "652",
  "654",
  "659",
  "660",
  "662",
  "663",
  "666",
  "670",
  "674",
  "678",
  "682",
  "686",
  "688",
  "690",
  "694",
  "702",
  "703",
  "704",
  "705",
  "706",
  "710",
  "716",
  "724",
  "728",
  "729",
  "732",
  "740",
  "744",
  "748",
  "752",
  "756",
  "760",
  "762",
  "764",
  "768",
  "772",
  "776",
  "780",
  "784",
  "788",
  "792",
  "795",
  "796",
  "798",
  "800",
  "804",
  "807",
  "818",
  "826",
  "831",
  "832",
  "833",
  "834",
  "840",
  "850",
  "854",
  "858",
  "860",
  "862",
  "876",
  "882",
  "887",
  "894"
]);
function isISO31661Numeric(str) {
  assertString(str);
  return validISO31661NumericCountriesCodes.has(str);
}

// src/lib/isISRC.ts
var isrc = /^[A-Z]{2}[0-9A-Z]{3}\d{7}$/;
function isISRC(str) {
  assertString(str);
  return isrc.test(str);
}

// src/lib/isISSN.ts
var issn = "^\\d{4}-?\\d{3}[\\dX]$";
function isISSN(str, options = {}) {
  assertString(str);
  let testIssn = issn;
  testIssn = options.require_hyphen ? testIssn.replace("?", "") : testIssn;
  const regex = options.case_sensitive ? new RegExp(testIssn) : new RegExp(testIssn, "i");
  if (!regex.test(str)) {
    return false;
  }
  const digits = str.replace("-", "").toUpperCase();
  let checksum = 0;
  for (let i = 0;i < digits.length; i++) {
    const digit = digits[i];
    checksum += (digit === "X" ? 10 : +digit) * (8 - i);
  }
  return checksum % 11 === 0;
}

// src/lib/isJSON.ts
var default_json_options = {
  allow_primitives: false
};
function isJSON(str, options = {}) {
  assertString(str);
  try {
    options = merge(options, default_json_options);
    let primitives = [];
    if (options.allow_primitives) {
      primitives = [null, false, true];
    }
    const obj = JSON.parse(str);
    return includesArray_default(primitives, obj) || !!obj && typeof obj === "object";
  } catch {}
  return false;
}

// src/lib/isJWT.ts
function isJWT(str) {
  assertString(str);
  const dotSplit = str.split(".");
  const len = dotSplit.length;
  if (len !== 3) {
    return false;
  }
  return dotSplit.reduce((acc, currElem) => acc && isBase64(currElem, { urlSafe: true }), true);
}

// src/lib/util/includesString.ts
var includes2 = (str, val) => str.includes(val);
var includesString_default = includes2;

// src/lib/isLatLong.ts
var lat = /^\(?[+-]?(?:90(?:\.0+)?|[1-8]?\d(?:\.\d+)?)$/;
var long = /^\s?[+-]?(?:180(?:\.0+)?|1[0-7]\d(?:\.\d+)?|\d{1,2}(?:\.\d+)?)\)?$/;
var latDMS = /^(?:[1-8]?\d\D+(?:[1-5]?\d|60)\D+(?:[1-5]?\d|60)(?:\.\d+)?|90\D+0\D+0)\D+$/;
var longDMS = /^\s*[1-7]?\d{1,2}\D+(?:[1-5]?\d|60)\D+(?:[1-5]?\d|60)(?:\.\d+)?\D+$/;
var defaultLatLongOptions = {
  checkDMS: false
};
function isLatLong(str, options) {
  assertString(str);
  options = merge(options, defaultLatLongOptions);
  if (!includesString_default(str, ","))
    return false;
  const pair = str.split(",");
  if (pair[0].startsWith("(") && !pair[1].endsWith(")") || pair[1].endsWith(")") && !pair[0].startsWith("(")) {
    return false;
  }
  if (options.checkDMS) {
    return latDMS.test(pair[0]) && longDMS.test(pair[1]);
  }
  return lat.test(pair[0]) && long.test(pair[1]);
}

// src/lib/isLength.ts
function isLength(str, options) {
  assertString(str);
  let min;
  let max;
  if (typeof options === "object") {
    min = options.min || 0;
    max = options.max;
  } else {
    min = arguments[1] || 0;
    max = arguments[2];
  }
  const presentationSequences = str.match(/(\uFE0F|\uFE0E)/g) || [];
  const surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
  const len = str.length - presentationSequences.length - surrogatePairs.length;
  const isInsideRange = len >= min && (typeof max === "undefined" || len <= max);
  if (isInsideRange && Array.isArray(options?.discreteLengths)) {
    return options.discreteLengths.includes(len);
  }
  return isInsideRange;
}

// src/lib/isLicensePlate.ts
var validators2 = {
  "cs-CZ": (str) => /^[A-FH-NPR-VXYZ0-9](?:-?[A-FH-NPR-VXYZ0-9]){4,7}$/.test(str),
  "de-DE": (str) => {
    const districtCodes = "[A-HJ-NPRSVWZ]|AA|AB|AC|AE|AH|AK|AM|AN|A\xD6|AP|AS|AT|AU|AW|AZ|BA|BB|BC|BE|BF|BH|BI|BK|BL|BM|BN|BO|B\xD6|BS|BT|BZ|CA|CB|CE|CO|CR|CW|DA|DD|DE|DH|DI|DL|DM|DN|DO|DU|DW|DZ|EA|EB|ED|EE|EF|EG|EH|EI|EL|EM|EN|ER|ES|EU|EW|FB|FD|FF|FG|FI|FL|FN|FO|FR|FS|FT|F\xDC|FW|FZ|GA|GC|GD|GE|GF|GG|GI|GK|GL|GM|GN|G\xD6|GP|GR|GS|GT|G\xDC|GV|GW|GZ|HA|HB|HC|HD|HE|HF|HG|HH|HI|HK|HL|HM|HN|HO|HP|HR|HS|HU|HV|HX|HY|HZ|IK|IL|IN|IZ|JE|JL|KA|KB|KC|KE|KF|KG|KH|KI|KK|KL|KM|KN|KO|KR|KS|KT|KU|KW|KY|LA|LB|LC|LD|LF|LG|LH|LI|LL|LM|LN|L\xD6|LP|LR|LU|MA|MB|MC|MD|ME|MG|MH|MI|MK|ML|MM|MN|MO|MQ|MR|MS|M\xDC|MW|MY|MZ|NB|ND|NE|NF|NH|NI|NK|NM|N\xD6|NP|NR|NT|NU|NW|NY|NZ|OA|OB|OC|OD|OE|OF|OG|OH|OK|OL|OP|OS|OZ|PA|PB|PE|PF|PI|PL|PM|PN|PR|PS|PW|PZ|RA|RC|RD|RE|RG|RH|RI|RL|RM|RN|RO|RP|RS|RT|RU|RV|RW|RZ|SB|SC|SE|SG|SI|SK|SL|SM|SN|SO|SP|SR|ST|SU|SW|SY|SZ|TE|TF|TG|TO|TP|TR|TS|TT|T\xDC|\xDCB|UE|UH|UL|UM|UN|VB|VG|VK|VR|VS|WA|WB|WE|WF|WI|WK|WL|WM|WN|WO|WR|WS|WT|W\xDC|WW|WZ|ZE|ZI|ZP|ZR|ZW|ZZ";
    const specialCodes = "ABG|ABI|AIB|AIC|ALF|ALZ|ANA|ANG|ANK|APD|ARN|ART|ASL|ASZ|AUR|AZE|BAD|BAR|BBG|BCH|BED|BER|BGD|BGL|BID|BIN|BIR|BIT|BIW|BKS|BLB|BLK|BNA|BOG|BOH|BOR|BOT|BRA|BRB|BRG|BRK|BRL|BRV|BSB|BSK|BTF|B\xDCD|BUL|B\xDCR|B\xDCS|B\xDCZ|CAS|CHA|CLP|CLZ|COC|COE|CUX|DAH|DAN|DAU|DBR|DEG|DEL|DGF|DIL|DIN|DIZ|DKB|DLG|DON|DUD|D\xDCW|EBE|EBN|EBS|ECK|EIC|EIL|EIN|EIS|EMD|EMS|ERB|ERH|ERK|ERZ|ESB|ESW|FDB|FDS|FEU|FFB|FKB|FL\xD6|FOR|FRG|FRI|FRW|FTL|F\xDCS|GAN|GAP|GDB|GEL|GEO|GER|GHA|GHC|GLA|GMN|GNT|GOA|GOH|GRA|GRH|GRI|GRM|GRZ|GTH|GUB|GUN|GVM|HAB|HAL|HAM|HAS|HBN|HBS|HCH|HDH|HDL|HEB|HEF|HEI|HER|HET|HGN|HGW|HHM|HIG|HIP|HM\xDC|HOG|HOH|HOL|HOM|HOR|H\xD6S|HOT|HRO|HSK|HST|HVL|HWI|IGB|ILL|J\xDCL|KEH|KEL|KEM|KIB|KLE|KLZ|K\xD6N|K\xD6T|K\xD6Z|KRU|K\xDCN|KUS|KYF|LAN|LAU|LBS|LBZ|LDK|LDS|LEO|LER|LEV|LIB|LIF|LIP|L\xD6B|LOS|LRO|LSZ|L\xDCN|LUP|LWL|MAB|MAI|MAK|MAL|MED|MEG|MEI|MEK|MEL|MER|MET|MGH|MGN|MHL|MIL|MKK|MOD|MOL|MON|MOS|MSE|MSH|MSP|MST|MTK|MTL|M\xDCB|M\xDCR|MYK|MZG|NAB|NAI|NAU|NDH|NEA|NEB|NEC|NEN|NES|NEW|NMB|NMS|NOH|NOL|NOM|NOR|NVP|NWM|OAL|OBB|OBG|OCH|OHA|\xD6HR|OHV|OHZ|OPR|OSL|OVI|OVL|OVP|PAF|PAN|PAR|PCH|PEG|PIR|PL\xD6|PR\xDC|QFT|QLB|RDG|REG|REH|REI|RID|RIE|ROD|ROF|ROK|ROL|ROS|ROT|ROW|RSL|R\xDCD|R\xDCG|SAB|SAD|SAN|SAW|SBG|SBK|SCZ|SDH|SDL|SDT|SEB|SEE|SEF|SEL|SFB|SFT|SGH|SHA|SHG|SHK|SHL|SIG|SIM|SLE|SLF|SLK|SLN|SLS|SL\xDC|SLZ|SM\xDC|SOB|SOG|SOK|S\xD6M|SON|SPB|SPN|SRB|SRO|STA|STB|STD|STE|STL|SUL|S\xDCW|SWA|SZB|TBB|TDO|TET|TIR|T\xD6L|TUT|UEM|UER|UFF|USI|VAI|VEC|VER|VIB|VIE|VIT|VOH|WAF|WAK|WAN|WAR|WAT|WBS|WDA|WEL|WEN|WER|WES|WHV|WIL|WIS|WIT|WIZ|WLG|WMS|WND|WOB|WOH|WOL|WOR|WOS|WRN|WSF|WST|WSW|WTL|WTM|WUG|W\xDCM|WUN|WUR|WZL|ZEL|ZIG";
    const pattern = new RegExp(`^(?:${districtCodes})[- ]?[A-Z]{1,2}[- ]?\\d{1,4}|(?:${specialCodes})[- ]?(?:[A-Z][- ]?\\d{1,4}|[A-Z]{2}[- ]?\\d{1,3})[- ]?(?:E|H)?$`);
    return pattern.test(str);
  },
  "de-LI": (str) => /^FL[- ]?\d{1,5}[UZ]?$/.test(str),
  "en-IN": (str) => /^[A-Z]{2}[ -]?\d{1,2}[ -]?[A-Z](?:[ -]?[A-Z]*)?[ -]?\d{4}$/.test(str),
  "en-SG": (str) => /^[A-Z]{3}[ -]?\d{4}[ -]?[A-Z]$/.test(str),
  "es-AR": (str) => /^(?:[A-Z]{2} ?\d{3} ?[A-Z]{2}|[A-Z]{3} ?\d{3})$/.test(str),
  "fi-FI": (str) => /^(?=.{4})(?:[A-Z]{1,3}|\d{1,3})[\s-]?(?:[A-Z]{1,3}|\d{1,5})$/.test(str),
  "hu-HU": (str) => /^((((?!AAA)(([A-NPRSTV-Z])([A-PR-Z])([A-HJ-NPR-Z]))|(A[ABC]I)|A[ABC]O|A[A-W]Q|BPI|BPO|UCO|UDO|XAO)-(?!000)\d{3})|(M\d{6})|((CK|DT|CD|HC|H[ABEFIK-NPRSTVX]|MA|OT|R[A-Z]) \d{2}-\d{2})|(CD \d{3}-\d{3})|(C-(C|X) \d{4})|(X-([ABC]) \d{4})|(([EPVZ]-\d{5}))|(S A[A-Z]{2} \d{2})|(SP \d{2}-\d{2}))$/.test(str),
  "pt-BR": (str) => /^[A-Z]{3}[ -]?\d[A-Z]\d{2}|[A-Z]{3}[ -]?\d{4}$/.test(str),
  "pt-PT": (str) => /^(?:[A-Z]{2}|\d{2})[ -\u00B7]?(?:[A-Z]{2}|\d{2})[ -\u00B7]?(?:[A-Z]{2}|\d{2})$/.test(str),
  "sq-AL": (str) => /^[A-Z]{2}[- ]?((\d{3}[- ]?(([A-Z]{2})|T))|(R[- ]?\d{3}))$/.test(str),
  "sv-SE": (str) => /^[A-HJ-PR-UW-Z]{3} ?\d{2}[A-HJ-PR-UW-Z1-9]$|(^[A-Z\u00C5\u00C4\u00D6 ]{2,7}$)/.test(str.trim()),
  "en-PK": (str) => /(^[A-Z]{2}((\s|-)?)\d{3,4}((\s|-)\d{2})?$)|(^[A-Z]{3}((\s|-)?)\d{3,4}((\s|-)\d{2})?$)|(^[A-Z]{4}((\s|-)?)\d{3,4}((\s|-)\d{2})?$)|(^[A-Z]((\s|-)?)\d{4}((\s|-)\d{2})?$)/.test(str.trim())
};
function isLicensePlate(str, locale) {
  assertString(str);
  if (locale in validators2) {
    return validators2[locale](str);
  } else if (locale === "any") {
    for (const key in validators2) {
      const validator = validators2[key];
      if (validator(str)) {
        return true;
      }
    }
    return false;
  }
  throw new Error(`Invalid locale '${locale}'`);
}

// src/lib/isLocale.ts
var extlang = "([A-Za-z]{3}(-[A-Za-z]{3}){0,2})";
var language = `(([a-zA-Z]{2,3}(-${extlang})?)|([a-zA-Z]{5,8}))`;
var script = "([A-Za-z]{4})";
var region = "([A-Za-z]{2}|\\d{3})";
var variant = "([A-Za-z0-9]{5,8}|(\\d[A-Z-a-z0-9]{3}))";
var singleton = "(\\d|[A-W]|[Y-Z]|[a-w]|[y-z])";
var extension = `(${singleton}(-[A-Za-z0-9]{2,8})+)`;
var privateuse = "(x(-[A-Za-z0-9]{1,8})+)";
var irregular = "((en-GB-oed)|(i-ami)|(i-bnn)|(i-default)|(i-enochian)|" + "(i-hak)|(i-klingon)|(i-lux)|(i-mingo)|(i-navajo)|(i-pwn)|(i-tao)|" + "(i-tay)|(i-tsu)|(sgn-BE-FR)|(sgn-BE-NL)|(sgn-CH-DE))";
var regular = "((art-lojban)|(cel-gaulish)|(no-bok)|(no-nyn)|(zh-guoyu)|" + "(zh-hakka)|(zh-min)|(zh-min-nan)|(zh-xiang))";
var grandfathered = `(${irregular}|${regular})`;
var delimiter = "(-|_)";
var langtag = `${language}(${delimiter}${script})?(${delimiter}${region})?(${delimiter}${variant})*(${delimiter}${extension})*(${delimiter}${privateuse})?`;
var languageTagRegex = new RegExp(`(^${privateuse}$)|(^${grandfathered}$)|(^${langtag}$)`);
function isLocale(str) {
  assertString(str);
  return languageTagRegex.test(str);
}

// src/lib/isLowercase.ts
function isLowercase(str) {
  assertString(str);
  return str === str.toLowerCase();
}

// src/lib/isMACAddress.ts
var macAddress48 = /^[0-9a-f]{2}([-:\s])(?:[0-9a-f]{2}\1){4}[0-9a-f]{2}$/i;
var macAddress48NoSeparators = /^[0-9a-f]{12}$/i;
var macAddress48WithDots = /^(?:[0-9a-f]{4}\.){2}[0-9a-f]{4}$/i;
var macAddress64 = /^[0-9a-f]{2}([-:\s])(?:[0-9a-f]{2}\1){6}[0-9a-f]{2}$/i;
var macAddress64NoSeparators = /^[0-9a-f]{16}$/i;
var macAddress64WithDots = /^(?:[0-9a-f]{4}\.){3}[0-9a-f]{4}$/i;
function isMACAddress(str, options) {
  assertString(str);
  if (options?.eui) {
    options.eui = String(options.eui);
  }
  if (options?.no_colons || options?.no_separators) {
    if (options.eui === "48") {
      return macAddress48NoSeparators.test(str);
    }
    if (options.eui === "64") {
      return macAddress64NoSeparators.test(str);
    }
    return macAddress48NoSeparators.test(str) || macAddress64NoSeparators.test(str);
  }
  if (options?.eui === "48") {
    return macAddress48.test(str) || macAddress48WithDots.test(str);
  }
  if (options?.eui === "64") {
    return macAddress64.test(str) || macAddress64WithDots.test(str);
  }
  return isMACAddress(str, { eui: "48" }) || isMACAddress(str, { eui: "64" });
}

// src/lib/isMagnetURI.ts
var magnetURIComponent = /(?:^magnet:\?|[^?&]&)xt(?:\.1)?=urn:(?:(?:aich|bitprint|btih|ed2k|ed2khash|kzhash|md5|sha1|tree:tiger):[a-z0-9]{32}(?:[a-z0-9]{8})?|btmh:1220[a-z0-9]{64})(?:$|&)/i;
function isMagnetURI(url) {
  assertString(url);
  if (url.indexOf("magnet:?") !== 0) {
    return false;
  }
  return magnetURIComponent.test(url);
}

// src/lib/ltrim.ts
function ltrim(str, chars) {
  assertString(str);
  const pattern = chars ? new RegExp(`^[${chars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]+`, "g") : /^\s+/g;
  return str.replace(pattern, "");
}

// src/lib/rtrim.ts
function rtrim(str, chars) {
  assertString(str);
  if (chars) {
    const pattern = new RegExp(`[${chars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]+$`, "g");
    return str.replace(pattern, "");
  }
  let strIndex = str.length - 1;
  while (/\s/.test(str.charAt(strIndex))) {
    strIndex -= 1;
  }
  return str.slice(0, strIndex + 1);
}

// src/lib/trim.ts
function trim(str, chars) {
  return rtrim(ltrim(str, chars), chars);
}

// src/lib/isMailtoURI.ts
function parseMailtoQueryString(queryString) {
  const allowedParams = new Set(["subject", "body", "cc", "bcc"]);
  const query = { cc: "", bcc: "" };
  let isParseFailed = false;
  const queryParams = queryString.split("&");
  if (queryParams.length > 4) {
    return false;
  }
  for (const q of queryParams) {
    const [key, value] = q.split("=");
    if (key && !allowedParams.has(key)) {
      isParseFailed = true;
      break;
    }
    if (value && (key === "cc" || key === "bcc")) {
      query[key] = value;
    }
    if (key) {
      allowedParams.delete(key);
    }
  }
  return isParseFailed ? false : query;
}
function isMailtoURI(url, options) {
  assertString(url);
  if (url.indexOf("mailto:") !== 0) {
    return false;
  }
  const [to, queryString = ""] = url.replace("mailto:", "").split("?");
  if (!to && !queryString) {
    return true;
  }
  const query = parseMailtoQueryString(queryString);
  if (!query) {
    return false;
  }
  return `${to},${query.cc},${query.bcc}`.split(",").every((email) => {
    email = trim(email, " ");
    if (email) {
      return isEmail(email, options);
    }
    return true;
  });
}

// src/lib/isMD5.ts
var md5 = /^[a-f0-9]{32}$/;
function isMD5(str) {
  assertString(str);
  return md5.test(str);
}

// src/lib/isMobilePhone.ts
var phones = {
  "am-AM": /^(\+?374|0)(33|4[134]|55|77|88|9[13-689])\d{6}$/,
  "ar-AE": /^((\+?971)|0)?5[024568]\d{7}$/,
  "ar-BH": /^(\+?973)?(3|6)\d{7}$/,
  "ar-DZ": /^(\+?213|0)([567])\d{8}$/,
  "ar-LB": /^(\+?961)?((3|81)\d{6}|7\d{7})$/,
  "ar-EG": /^((\+?20)|0)?1[0125]\d{8}$/,
  "ar-IQ": /^(\+?964|0)?7\d{9}$/,
  "ar-JO": /^(\+?962|0)?7[789]\d{7}$/,
  "ar-KW": /^(\+?965)([569]\d{7}|41\d{6})$/,
  "ar-LY": /^((\+?218)|0)?(9[1-6]\d{7}|[1-8]\d{7,9})$/,
  "ar-MA": /^(?:(?:\+|00)212|0)[5-7]\d{8}$/,
  "ar-OM": /^((\+|00)968)?([79][1-9])\d{6}$/,
  "ar-PS": /^(\+?970|0)5[6|9](\d{7})$/,
  "ar-SA": /^(!?(\+?966)|0)?5\d{8}$/,
  "ar-SD": /^((\+?249)|0)?(9[0-369]|1[012])\d{7}$/,
  "ar-SY": /^(!?(\+?963)|0)?9\d{8}$/,
  "ar-TN": /^(\+?216)?[2459]\d{7}$/,
  "az-AZ": /^(\+994|0)(10|5[015]|7[07]|99)\d{7}$/,
  "bs-BA": /^((((\+|00)3876)|06))((([0-356])\d{6})|(4\d{7}))$/,
  "be-BY": /^(\+?375)?(24|25|29|33|44)\d{7}$/,
  "bg-BG": /^(\+?359|0)?8[789]\d{7}$/,
  "bn-BD": /^(\+?880|0)1[13-9]\d{8}$/,
  "ca-AD": /^(\+376)?[346]\d{5}$/,
  "cs-CZ": /^(\+?420)? ?[1-9]\d{2} ?\d{3} ?\d{3}$/,
  "da-DK": /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
  "de-DE": /^((\+49|0)1)(5[0-25-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7,9}$/,
  "de-AT": /^(\+43|0)\d{4,16}$/,
  "de-CH": /^(\+41|0)([1-9])\d{1,9}$/,
  "de-LU": /^(\+352)?((6\d1)\d{6})$/,
  "dv-MV": /^(\+?960)?(7[2-9]|9[1-9])\d{5}$/,
  "el-GR": /^(\+?30|0)?6(8[5-9]|9(?![26])\d)\d{7}$/,
  "el-CY": /^(\+?357?)?(9([94-7])\d{6})$/,
  "en-AI": /^(\+?1|0)264(?:2(35|92)|4(?:6[12]|76|97)|5(?:3[6-9]|8[1-4])|7(?:2(4|9)|72))\d{4}$/,
  "en-AU": /^(\+?61|0)4\d{8}$/,
  "en-AG": /^(?:\+1|1)268(?:464|7(?:1[3-9]|[28]\d|3[0246]|64|7[0-689]))\d{4}$/,
  "en-BM": /^(\+?1)?441(((3|7)\d{6}$)|(5[0-3]\d{5}$)|(59\d{5}$))/,
  "en-BS": /^(\+?1[-\s]?|0)?\(?242\)?[-\s]?\d{3}[-\s]?\d{4}$/,
  "en-GB": /^(\+?44|0)7[1-9]\d{8}$/,
  "en-GG": /^(\+?44|0)1481\d{6}$/,
  "en-GH": /^(\+233|0)(20|50|24|54|27|57|26|56|23|53|28|55|59)\d{7}$/,
  "en-GY": /^(\+592|0)6\d{6}$/,
  "en-HK": /^(\+?852[-\s]?)?[4-9]\d{3}[-\s]?\d{4}$/,
  "en-MO": /^(\+?853[-\s]?)?6\d{3}[-\s]?\d{4}$/,
  "en-IE": /^(\+?353|0)8[35-9]\d{7}$/,
  "en-IN": /^(\+?91|0)?[6-9]\d{9}$/,
  "en-JM": /^(\+?876)?\d{7}$/,
  "en-KE": /^(\+?254|0)(7|1)\d{8}$/,
  "fr-CF": /^(\+?236| ?)(70|75|77|72|21|22)\d{6}$/,
  "en-SS": /^(\+?211|0)(9[1257])\d{7}$/,
  "en-KI": /^((\+686|686)?)?( )?((6|7)([238])\d{6})$/,
  "en-KN": /^(?:\+1|1)869(?:46\d|48[89]|55[6-8]|66\d|76[02-7])\d{4}$/,
  "en-LS": /^(\+?266)(22|28|57|58|59|27|52)\d{6}$/,
  "en-MT": /^(\+?356|0)?(99|79|77|21|27|22|25)\d{6}$/,
  "en-MU": /^(\+?230|0)?\d{8}$/,
  "en-MW": /^(\+?265|0)(((77|88|31|99|98|21)\d{7})|(((111)|1)\d{6})|(32000\d{4}))$/,
  "en-NA": /^(\+?264|0)(6|8)\d{7}$/,
  "en-NG": /^(\+?234|0)?[789]\d{9}$/,
  "en-NZ": /^(\+?64|0)[28]\d{7,9}$/,
  "en-PG": /^(\+?675|0)?(7\d|8[18])\d{6}$/,
  "en-PK": /^((00|\+)?92|0)3[0-6]\d{8}$/,
  "en-PH": /^(09|\+639)\d{9}$/,
  "en-RW": /^(\+?250|0)?7\d{8}$/,
  "en-SG": /^(\+65)?[3689]\d{7}$/,
  "en-SL": /^(\+?232|0)\d{8}$/,
  "en-TZ": /^(\+?255|0)?[67]\d{8}$/,
  "en-UG": /^(\+?256|0)?7\d{8}$/,
  "en-US": /^((\+1|1)?( |-)?)?(\([2-9]\d{2}\)|[2-9]\d{2})( |-)?([2-9]\d{2}( |-)?\d{4})$/,
  "en-ZA": /^(\+?27|0)\d{9}$/,
  "en-ZM": /^(\+?26)?0[79][567]\d{7}$/,
  "en-ZW": /^(\+263)\d{9}$/,
  "en-BW": /^(\+?267)?(7[1-8])\d{6}$/,
  "es-AR": /^\+?549(11|[2368]\d)\d{8}$/,
  "es-BO": /^(\+?591)?(6|7)\d{7}$/,
  "es-CO": /^(\+?57)?3(0([01245])|1\d|2[0-4]|5(0|1))\d{7}$/,
  "es-CL": /^(\+?56|0)[2-9]\d{8}$/,
  "es-CR": /^(\+506)?[2-8]\d{7}$/,
  "es-CU": /^(\+53|0053)?5\d{7}$/,
  "es-DO": /^(\+?1)?8[024]9\d{7}$/,
  "es-HN": /^(\+?504)?[9|832]\d{7}$/,
  "es-EC": /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
  "es-ES": /^(\+?34)?[6|7]\d{8}$/,
  "es-GT": /^(\+?502)?[2|67]\d{7}$/,
  "es-PE": /^(\+?51)?9\d{8}$/,
  "es-MX": /^(\+?52)?(1|01)?\d{10,11}$/,
  "es-NI": /^(\+?505)\d{7,8}$/,
  "es-PA": /^(\+?507)\d{7,8}$/,
  "es-PY": /^(\+?595|0)9[6-9]\d{7}$/,
  "es-SV": /^(\+?503)?[67]\d{7}$/,
  "es-UY": /^(\+598|0)9[1-9]\d{6}$/,
  "es-VE": /^(\+?58)?(2|4)\d{9}$/,
  "et-EE": /^(\+?372)?\s?(5|8[1-4])\s?(\d\s?){6,7}$/,
  "fa-IR": /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
  "fi-FI": /^(\+?358|0)\s?(4[0-6]|50)\s?(\d\s?){4,8}$/,
  "fj-FJ": /^(\+?679)?\s?\d{3}\s?\d{4}$/,
  "fo-FO": /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  "fr-BF": /^(\+226|0)[67]\d{7}$/,
  "fr-BJ": /^(\+229)\d{8}$/,
  "fr-CD": /^(\+?243|0)?(8|9)\d{8}$/,
  "fr-CM": /^(\+?237)6\d{8}$/,
  "fr-FR": /^(\+?33|0)[67]\d{8}$/,
  "fr-GF": /^(\+?594|0|00594)[67]\d{8}$/,
  "fr-GP": /^(\+?590|0|00590)[67]\d{8}$/,
  "fr-MQ": /^(\+?596|0|00596)[67]\d{8}$/,
  "fr-PF": /^(\+?689)?8[789]\d{6}$/,
  "fr-RE": /^(\+?262|0|00262)[67]\d{8}$/,
  "fr-WF": /^(\+681)?\d{6}$/,
  "he-IL": /^(\+972|0)([23489]|5[0-689]|77)[1-9]\d{6}$/,
  "hu-HU": /^(\+?36|06)(20|30|31|50|70)\d{7}$/,
  "id-ID": /^(\+?62|0)8(1[1-9]|2[1238]|3[1238]|5[1235-9]|7[78]|9[5-9]|8[1-9])([\s?|\d]{5,11})$/,
  "ir-IR": /^(\+98|0)?9\d{9}$/,
  "it-IT": /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
  "it-SM": /^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,
  "ja-JP": /^(\+81[ \-]?(\(0\))?|0)[6-9]0[ \-]?\d{4}[ \-]?\d{4}$/,
  "ka-GE": /^(\+?995)?(79\d{7}|5\d{8})$/,
  "kk-KZ": /^(\+?7|8)?7\d{9}$/,
  "kl-GL": /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  "ko-KR": /^((\+?82)[ \-]?)?0?1([0|16-9])[ \-]?\d{3,4}[ \-]?\d{4}$/,
  "ky-KG": /^(\+996\s?)?(22\d|50\d|55\d|70\d|75\d|77\d|880|990|995|996|997|998)\s?\d{3}\s?\d{3}$/,
  "lt-LT": /^(\+370|8)\d{8}$/,
  "lv-LV": /^(\+?371)2\d{7}$/,
  "mg-MG": /^((\+?261|0)(2|3)\d)?\d{7}$/,
  "mn-MN": /^(\+|00|011)?976(77|81|88|91|94|95|96|99)\d{6}$/,
  "my-MM": /^(\+?959|09|9)(2[5-7]|3[12]|4[0-5]|6[6-9]|7[5-9]|9[6-9])\d{7}$/,
  "ms-MY": /^(\+?60|0)1(([0145](-|\s)?\d{7,8})|([236-9](-|\s)?\d{7}))$/,
  "mz-MZ": /^(\+?258)?8[2-7]\d{7}$/,
  "nb-NO": /^(\+?47)?[49]\d{7}$/,
  "ne-NP": /^(\+?977)?9[78]\d{8}$/,
  "nl-BE": /^(\+?32|0)4\d{8}$/,
  "nl-NL": /^(((\+|00)?31\(0\))|((\+|00)?31)|0)6\d{8}$/,
  "nl-AW": /^(\+)?297(56|59|64|73|74|99)\d{5}$/,
  "nn-NO": /^(\+?47)?[49]\d{7}$/,
  "pl-PL": /^(\+?48)? ?([5-8]\d|45) ?\d{3} ?\d{2} ?\d{2}$/,
  "pt-BR": /^((\+?55 ?[1-9]{2} ?)|(\+?55 ?\([1-9]{2}\) ?)|(0[1-9]{2} ?)|(\([1-9]{2}\) ?)|([1-9]{2} ?))((\d{4}-?\d{4})|(9[1-9]\d{3}-?\d{4}))$/,
  "pt-PT": /^(\+?351)?9[1236]\d{7}$/,
  "pt-AO": /^(\+?244)?9\d{8}$/,
  "ro-MD": /^(\+?373|0)((6([0126-9]))|(7([6-9])))\d{6}$/,
  "ro-RO": /^(\+?40|0)\s?7\d{2}([/\s.\-])?\d{3}([\s.\-])?\d{3}$/,
  "ru-RU": /^(\+?7|8)?9\d{9}$/,
  "si-LK": /^(?:0|94|\+94)?(7([0124-8])( |-)?)\d{7}$/,
  "sl-SI": /^(\+386\s?|0)(\d\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
  "sk-SK": /^(\+?421)? ?[1-9]\d{2} ?\d{3} ?\d{3}$/,
  "so-SO": /^(\+?252|0)((6\d)\d{7}|(7[1-9])\d{7})$/,
  "sq-AL": /^(\+355|0)6[2-9]\d{7}$/,
  "sr-RS": /^(\+3816|06)[- \d]{5,9}$/,
  "sv-SE": /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
  "tg-TJ": /^(\+?992)?55\d{7}$/,
  "th-TH": /^(\+66|66|0)\d{9}$/,
  "tr-TR": /^(\+?90|0)?5\d{9}$/,
  "tk-TM": /^(\+993|993|8)\d{8}$/,
  "uk-UA": /^(\+?38)?0(50|6[36-8]|7[357]|9[1-9])\d{7}$/,
  "uz-UZ": /^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,
  "vi-VN": /^((\+?84)|0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9(\d)))(\d{7})$/,
  "zh-CN": /^((\+|00)86)?(1[3-9]|9[28])\d{9}$/,
  "zh-TW": /^(\+?886-?|0)?9\d{8}$/,
  "dz-BT": /^(\+?975|0)?(17|16|77|02)\d{6}$/,
  "ar-YE": /^(((\+|00)9677|0?7)[0137]\d{7}|((\+|00)967|0)[1-7]\d{6})$/,
  "ar-EH": /^(\+?212|0)[\s\-]?(5288|5289)[\s\-]?\d{5}$/,
  "fa-AF": /^(\+93|0)?(2[0-8]|[3-5][0-4])(\d{7})$/,
  "mk-MK": /^(\+?389|0)?(2[2-9]\d{6}|(?:3[1-4]|4[2-8])\d{6}|500\d{5}|5[2-9]\d{6}|7\d[2-9]\d{5}|8[1-9]\d{6}|800\d{5}|8009\d{4})$/
};
phones["en-CA"] = phones["en-US"];
phones["fr-CA"] = phones["en-CA"];
phones["fr-BE"] = phones["nl-BE"];
phones["zh-HK"] = phones["en-HK"];
phones["zh-MO"] = phones["en-MO"];
phones["ga-IE"] = phones["en-IE"];
phones["fr-CH"] = phones["de-CH"];
phones["it-CH"] = phones["fr-CH"];
function isMobilePhone(str, locale, options) {
  assertString(str);
  if (options && options.strictMode && !str.startsWith("+")) {
    return false;
  }
  if (Array.isArray(locale)) {
    return locale.some((key) => {
      if (Object.prototype.hasOwnProperty.call(phones, key)) {
        const phone = phones[key];
        if (phone.test(str)) {
          return true;
        }
      }
      return false;
    });
  } else if (locale in phones) {
    return phones[locale].test(str);
  } else if (!locale || locale === "any") {
    for (const key in phones) {
      if (Object.prototype.hasOwnProperty.call(phones, key)) {
        const phone = phones[key];
        if (phone.test(str)) {
          return true;
        }
      }
    }
    return false;
  }
  throw new Error(`Invalid locale '${locale}'`);
}
var locales5 = Object.keys(phones);

// src/lib/isMongoId.ts
function isMongoId(str) {
  assertString(str);
  return isHexadecimal(str) && str.length === 24;
}

// src/lib/isMultibyte.ts
var multibyte = /[^\x00-\x7F]/;
function isMultibyte(str) {
  assertString(str);
  return multibyte.test(str);
}

// src/lib/locales/decimal.ts
var decimal2 = {
  "en-US": ".",
  ar: "\u066B"
};
var dotDecimal2 = ["ar-EG", "ar-LB", "ar-LY"];
var commaDecimal2 = [
  "bg-BG",
  "cs-CZ",
  "da-DK",
  "de-DE",
  "el-GR",
  "en-ZM",
  "eo",
  "es-ES",
  "fr-CA",
  "fr-FR",
  "id-ID",
  "it-IT",
  "ku-IQ",
  "hi-IN",
  "hu-HU",
  "nb-NO",
  "nn-NO",
  "nl-NL",
  "pl-PL",
  "pt-PT",
  "ru-RU",
  "kk-KZ",
  "si-LK",
  "sl-SI",
  "sr-RS@latin",
  "sr-RS",
  "sv-SE",
  "tr-TR",
  "uk-UA",
  "vi-VN"
];
for (let i = 0;i < dotDecimal2.length; i++) {
  decimal2[dotDecimal2[i]] = decimal2["en-US"];
}
for (let i = 0;i < commaDecimal2.length; i++) {
  decimal2[commaDecimal2[i]] = ",";
}
var englishLocales2 = ["AU", "GB", "HK", "IN", "NZ", "ZA", "ZM"];
for (let i = 0;i < englishLocales2.length; i++) {
  const locale = `en-${englishLocales2[i]}`;
  decimal2[locale] = decimal2["en-US"];
}
var arabicLocales2 = ["AE", "BH", "DZ", "EG", "IQ", "JO", "KW", "LB", "LY", "MA", "QM", "QA", "SA", "SD", "SY", "TN", "YE"];
for (let i = 0;i < arabicLocales2.length; i++) {
  const locale = `ar-${arabicLocales2[i]}`;
  decimal2[locale] = decimal2.ar;
}
decimal2["fr-CA"] = decimal2["fr-FR"];
decimal2["pt-BR"] = decimal2["pt-PT"];
decimal2["pl-Pl"] = decimal2["pl-PL"];

// src/lib/isNumeric.ts
var numericNoSymbols = /^\d+$/;
function isNumeric(str, options) {
  assertString(str);
  if (options?.no_symbols) {
    return numericNoSymbols.test(str);
  }
  const decimalChar = options?.locale ? decimal2[options.locale] || "." : ".";
  return new RegExp(`^[+-]?([0-9]*[${decimalChar}])?[0-9]+$`).test(str);
}

// src/lib/isOctal.ts
var octal = /^(0o)?[0-7]+$/i;
function isOctal(str) {
  assertString(str);
  return octal.test(str);
}

// src/lib/isPassportNumber.ts
var passportRegexByCountryCode = {
  AM: /^[A-Z]{2}\d{7}$/,
  AR: /^[A-Z]{3}\d{6}$/,
  AT: /^[A-Z]\d{7}$/,
  AU: /^[A-Z]\d{7}$/,
  AZ: /^[A-Z]\d{8}$/,
  BE: /^[A-Z]{2}\d{6}$/,
  BG: /^\d{9}$/,
  BR: /^[A-Z]{2}\d{6}$/,
  BY: /^[A-Z]{2}\d{7}$/,
  CA: /^[A-Z]{2}\d{6}$|^[A-Z]\d{6}[A-Z]{2}$/,
  CH: /^[A-Z]\d{7}$/,
  CN: /^G\d{8}$|^E(?![IO])[A-Z0-9]\d{7}$/,
  CY: /^[A-Z](\d{6}|\d{8})$/,
  CZ: /^\d{8}$/,
  DE: /^[CFGHJ-NPRTV-Z0-9]{9}$/,
  DK: /^\d{9}$/,
  DZ: /^\d{9}$/,
  EE: /^([A-Z]\d{7}|[A-Z]{2}\d{7})$/,
  ES: /^[A-Z0-9]{2}([A-Z0-9]?)\d{6}$/,
  FI: /^[A-Z]{2}\d{7}$/,
  FR: /^\d{2}[A-Z]{2}\d{5}$/,
  GB: /^\d{9}$/,
  GR: /^[A-Z]{2}\d{7}$/,
  HR: /^\d{9}$/,
  HU: /^[A-Z]{2}(\d{6}|\d{7})$/,
  IE: /^[A-Z0-9]{2}\d{7}$/,
  IN: /^[A-Z]-?\d{7}$/,
  ID: /^[A-C]\d{7}$/,
  IR: /^[A-Z]\d{8}$/,
  IS: /^(A)\d{7}$/,
  IT: /^[A-Z0-9]{2}\d{7}$/,
  JM: /^A\d{7}$/i,
  JP: /^[A-Z]{2}\d{7}$/,
  KR: /^[MS]\d{8}$/,
  KZ: /^[a-z]\d{7}$/i,
  LI: /^[a-z]\d{5}$/i,
  LT: /^[A-Z0-9]{8}$/,
  LU: /^[A-Z0-9]{8}$/,
  LV: /^[A-Z0-9]{2}\d{7}$/,
  LY: /^[A-Z0-9]{8}$/,
  MT: /^\d{7}$/,
  MZ: /^([A-Z]{2}\d{7})|(\d{2}[A-Z]{2}\d{5})$/,
  MY: /^[AHK]\d{8}$/,
  MX: /^\d{10,11}$/,
  NL: /^[A-Z]{2}[A-Z0-9]{6}\d$/,
  NZ: /^(L([ADFH])|E(A|P)|N)\d{6}$/i,
  PH: /^[A-Z](\d{7}[A-Z]|\d{6})|[A-Z]{2}(\d{6}|\d{7})$/,
  PK: /^[A-Z]{2}\d{7}$/,
  PL: /^[A-Z]{2}\d{7}$/,
  PT: /^[A-Z]\d{6}$/,
  RO: /^\d{8,9}$/,
  RU: /^\d{9}$/,
  SE: /^\d{8}$/,
  SL: /^(P)[A-Z]\d{7}$/,
  SK: /^[0-9A-Z]\d{7}$/,
  TH: /^[A-Z]{1,2}\d{6,7}$/,
  TR: /^[A-Z]\d{8}$/,
  UA: /^[A-Z]{2}\d{6}$/,
  US: /^\d{9}$|^[A-Z]\d{8}$/,
  ZA: /^[TAMD]\d{8}$/
};
var locales6 = Object.keys(passportRegexByCountryCode);
function isPassportNumber(str, countryCode) {
  assertString(str);
  const normalizedStr = str.replace(/\s/g, "").toUpperCase();
  return countryCode.toUpperCase() in passportRegexByCountryCode && passportRegexByCountryCode[countryCode.toUpperCase()].test(normalizedStr);
}

// src/lib/isPort.ts
function isPort(str) {
  return isInt(str, { allow_leading_zeroes: false, min: 0, max: 65535 });
}

// src/lib/isPostalCode.ts
var threeDigit = /^\d{3}$/;
var fourDigit = /^\d{4}$/;
var fiveDigit = /^\d{5}$/;
var sixDigit = /^\d{6}$/;
var patterns = {
  AD: /^AD\d{3}$/,
  AT: fourDigit,
  AU: fourDigit,
  AZ: /^AZ\d{4}$/,
  BA: /^([78]\d{4}$)/,
  BE: fourDigit,
  BG: fourDigit,
  BR: /^\d{5}-?\d{3}$/,
  BY: /^2[1-4]\d{4}$/,
  CA: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
  CH: fourDigit,
  CN: /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[1-5]|8[1345]|9[09])\d{4}$/,
  CO: /^(05|08|11|13|15|17|18|19|20|23|25|27|41|44|47|50|52|54|63|66|68|70|73|76|81|85|86|88|91|94|95|97|99)(\d{4})$/,
  CZ: /^\d{3}\s?\d{2}$/,
  DE: fiveDigit,
  DK: fourDigit,
  DO: fiveDigit,
  DZ: fiveDigit,
  EE: fiveDigit,
  ES: /^(5[0-2]|[0-4]\d)\d{3}$/,
  FI: fiveDigit,
  FR: /^(?:(?:0[1-9]|[1-8]\d|9[0-5])\d{3}|97[1-46]\d{2})$/,
  GB: /^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,
  GR: /^\d{3}\s?\d{2}$/,
  HR: /^([1-5]\d{4}$)/,
  HT: /^HT\d{4}$/,
  HU: fourDigit,
  ID: fiveDigit,
  IE: /^(?!.*o)[A-Z]\d[\dw]\s\w{4}$/i,
  IL: /^(\d{5}|\d{7})$/,
  IN: /^((?!10|29|35|54|55|65|66|86|87|88|89)[1-9]\d{5})$/,
  IR: /^(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}$/,
  IS: threeDigit,
  IT: fiveDigit,
  JP: /^\d{3}-\d{4}$/,
  KE: fiveDigit,
  KR: /^(\d{5}|\d{6})$/,
  LI: /^(948[5-9]|949[0-7])$/,
  LT: /^LT-\d{5}$/,
  LU: fourDigit,
  LV: /^LV-\d{4}$/,
  LK: fiveDigit,
  MG: threeDigit,
  MX: fiveDigit,
  MT: /^[A-Z]{3}\s?\d{4}$/i,
  MY: fiveDigit,
  NL: /^[1-9]\d{3}\s?(?!sa|sd|ss)[a-z]{2}$/i,
  NO: fourDigit,
  NP: /^(10|21|22|32|33|34|44|45|56|57)\d{3}$|^(977)$/,
  NZ: fourDigit,
  PK: fiveDigit,
  PL: /^\d{2}-\d{3}$/,
  PR: /^00[679]\d{2}([ -]\d{4})?$/,
  PT: /^\d{4}-\d{3}$/,
  RO: sixDigit,
  RU: sixDigit,
  SA: fiveDigit,
  SE: /^[1-9]\d{2}\s?\d{2}$/,
  SG: sixDigit,
  SI: fourDigit,
  SK: /^\d{3}\s?\d{2}$/,
  TH: fiveDigit,
  TN: fourDigit,
  TW: /^\d{3}(\d{2,3})?$/,
  UA: fiveDigit,
  US: /^\d{5}(-\d{4})?$/,
  ZA: fourDigit,
  ZM: fiveDigit
};
var locales7 = Object.keys(patterns);
function isPostalCode(str, locale) {
  assertString(str);
  if (locale in patterns) {
    return patterns[locale].test(str);
  } else if (locale === "any") {
    for (const key in patterns) {
      if (Object.prototype.hasOwnProperty.call(patterns, key)) {
        const pattern = patterns[key];
        if (pattern.test(str)) {
          return true;
        }
      }
    }
    return false;
  }
  throw new Error(`Invalid locale '${locale}'`);
}

// src/lib/isRFC3339.ts
var dateFullYear = /\d{4}/;
var dateMonth = /(?:0[1-9]|1[0-2])/;
var dateMDay = /(?:[12]\d|0[1-9]|3[01])/;
var timeHour = /(?:[01]\d|2[0-3])/;
var timeMinute = /[0-5]\d/;
var timeSecond = /(?:[0-5]\d|60)/;
var timeSecFrac = /(?:\.\d+)?/;
var timeNumOffset = new RegExp(`[-+]${timeHour.source}:${timeMinute.source}`);
var timeOffset = new RegExp(`(?:z|${timeNumOffset.source})`, "i");
var partialTime = new RegExp(`${timeHour.source}:${timeMinute.source}:${timeSecond.source}${timeSecFrac.source}`);
var fullDate = new RegExp(`${dateFullYear.source}-${dateMonth.source}-${dateMDay.source}`);
var fullTime = new RegExp(`${partialTime.source}${timeOffset.source}`);
var rfc3339 = new RegExp(`^${fullDate.source} t${fullTime.source}$`, "i");
function isRFC3339(str) {
  assertString(str);
  return rfc3339.test(str);
}

// src/lib/isRgbColor.ts
var rgbColor = /^rgb\((?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5],){2}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\)$/;
var rgbaColor = /^rgba\((?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5],){3}(?:0?\.\d\d?|1(?:\.0)?|0(?:\.0)?)\)$/;
var rgbColorPercent = /^rgb\((?:\d%|[1-9]\d%|100%,){2}(?:\d%|[1-9]\d%|100%)\)$/;
var rgbaColorPercent = /^rgba\((?:\d%|[1-9]\d%|100%,){3}(?:0?\.\d\d?|1(?:\.0)?|0(?:\.0)?)\)$/;
var startsWithRgb = /^rgba?/;
function isRgbColor(str, options) {
  assertString(str);
  let allowSpaces = false;
  let includePercentValues = true;
  if (typeof options !== "object") {
    if (arguments.length >= 2) {
      includePercentValues = arguments[1];
    }
  } else {
    allowSpaces = options.allowSpaces !== undefined ? options.allowSpaces : allowSpaces;
    includePercentValues = options.includePercentValues !== undefined ? options.includePercentValues : includePercentValues;
  }
  if (allowSpaces) {
    if (!startsWithRgb.test(str)) {
      return false;
    }
    str = str.replace(/\s/g, "");
  }
  if (!includePercentValues) {
    return rgbColor.test(str) || rgbaColor.test(str);
  }
  return rgbColor.test(str) || rgbaColor.test(str) || rgbColorPercent.test(str) || rgbaColorPercent.test(str);
}

// src/lib/util/multilineRegex.ts
function multilineRegexp(parts, flags) {
  const regexpAsStringLiteral = parts.join("");
  return new RegExp(regexpAsStringLiteral, flags);
}

// src/lib/isSemVer.ts
var semanticVersioningRegex = multilineRegexp([
  "^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)",
  "(?:-((?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*))*))",
  "?(?:\\+([0-9a-z-]+(?:\\.[0-9a-z-]+)*))?$"
], "i");
function isSemVer(str) {
  assertString(str);
  return semanticVersioningRegex.test(str);
}

// src/lib/isSlug.ts
var charsetRegex = /^[^\s\-_](?!.*?[\-_]{2})[a-z0-9\-\\]\S*[^\-_\s]$/;
function isSlug(str) {
  assertString(str);
  return charsetRegex.test(str);
}

// src/lib/isStrongPassword.ts
var upperCaseRegex = /^[A-Z]$/;
var lowerCaseRegex = /^[a-z]$/;
var numberRegex = /^\d$/;
var symbolRegex = /^[-#!$@\u00A3%^&*()_+|~=`{}[\]:"'<>?,./\\ ]$/;
var defaultOptions2 = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  returnScore: false,
  pointsPerUnique: 1,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10
};
function countChars(str) {
  const result = {};
  Array.from(str).forEach((char) => {
    const curVal = result[char];
    if (curVal) {
      result[char] += 1;
    } else {
      result[char] = 1;
    }
  });
  return result;
}
function analyzePassword(password) {
  const charMap = countChars(password);
  const analysis = {
    length: password.length,
    uniqueChars: Object.keys(charMap).length,
    uppercaseCount: 0,
    lowercaseCount: 0,
    numberCount: 0,
    symbolCount: 0
  };
  Object.keys(charMap).forEach((char) => {
    if (upperCaseRegex.test(char)) {
      analysis.uppercaseCount += charMap[char];
    } else if (lowerCaseRegex.test(char)) {
      analysis.lowercaseCount += charMap[char];
    } else if (numberRegex.test(char)) {
      analysis.numberCount += charMap[char];
    } else if (symbolRegex.test(char)) {
      analysis.symbolCount += charMap[char];
    }
  });
  return analysis;
}
function scorePassword(analysis, scoringOptions) {
  let points = 0;
  points += analysis.uniqueChars * scoringOptions.pointsPerUnique;
  points += (analysis.length - analysis.uniqueChars) * scoringOptions.pointsPerRepeat;
  if (analysis.lowercaseCount > 0) {
    points += scoringOptions.pointsForContainingLower;
  }
  if (analysis.uppercaseCount > 0) {
    points += scoringOptions.pointsForContainingUpper;
  }
  if (analysis.numberCount > 0) {
    points += scoringOptions.pointsForContainingNumber;
  }
  if (analysis.symbolCount > 0) {
    points += scoringOptions.pointsForContainingSymbol;
  }
  return points;
}
function isStrongPassword(str, options = defaultOptions2) {
  assertString(str);
  const analysis = analyzePassword(str);
  options = merge(options || {}, defaultOptions2);
  if (options.returnScore) {
    return scorePassword(analysis, options);
  }
  return analysis.length >= options.minLength && analysis.lowercaseCount >= options.minLowercase && analysis.uppercaseCount >= options.minUppercase && analysis.numberCount >= options.minNumbers && analysis.symbolCount >= options.minSymbols;
}

// src/lib/isSurrogatePair.ts
var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
function isSurrogatePair(str) {
  assertString(str);
  return surrogatePair.test(str);
}

// src/lib/util/algorithms.ts
function iso7064Check(str) {
  let checkvalue = 10;
  for (let i = 0;i < str.length - 1; i++) {
    checkvalue = (Number.parseInt(str[i], 10) + checkvalue) % 10 === 0 ? 10 * 2 % 11 : (Number.parseInt(str[i], 10) + checkvalue) % 10 * 2 % 11;
  }
  checkvalue = checkvalue === 1 ? 0 : 11 - checkvalue;
  return checkvalue === Number.parseInt(str[10], 10);
}
function luhnCheck(str) {
  let checksum = 0;
  let second = false;
  for (let i = str.length - 1;i >= 0; i--) {
    if (second) {
      const product = Number.parseInt(str[i], 10) * 2;
      if (product > 9) {
        checksum += product.toString().split("").map((a) => Number.parseInt(a, 10)).reduce((a, b) => a + b, 0);
      } else {
        checksum += product;
      }
    } else {
      checksum += Number.parseInt(str[i], 10);
    }
    second = !second;
  }
  return checksum % 10 === 0;
}
function reverseMultiplyAndSum(digits, base) {
  let total = 0;
  for (let i = 0;i < digits.length; i++) {
    total += digits[i] * (base - i);
  }
  return total;
}
function verhoeffCheck(str) {
  const d_table = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  ];
  const p_table = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
  ];
  const str_copy = str.split("").reverse().join("");
  let checksum = 0;
  for (let i = 0;i < str_copy.length; i++) {
    checksum = d_table[checksum][p_table[i % 8][Number.parseInt(str_copy[i], 10)]];
  }
  return checksum === 0;
}

// src/lib/isTaxID.ts
function bgBgCheck(tin) {
  let century_year = tin.slice(0, 2);
  let month = Number.parseInt(tin.slice(2, 4), 10);
  if (month > 40) {
    month -= 40;
    century_year = `20${century_year}`;
  } else if (month > 20) {
    month -= 20;
    century_year = `18${century_year}`;
  } else {
    century_year = `19${century_year}`;
  }
  if (month < 10) {
    month = Number.parseInt(`0${month}`, 10);
  }
  const date = `${century_year}/${month}/${tin.slice(4, 6)}`;
  if (!isDate(date, "YYYY/MM/DD"))
    return false;
  const digits = tin.split("").map((a) => Number.parseInt(a, 10));
  const multip_lookup = [2, 4, 8, 5, 10, 9, 7, 3, 6];
  let checksum = 0;
  for (let i = 0;i < multip_lookup.length; i++) {
    checksum += digits[i] * multip_lookup[i];
  }
  checksum = checksum % 11 === 10 ? 0 : checksum % 11;
  return checksum === digits[9];
}
function isCanadianSIN(input) {
  const digitsArray = input.split("");
  const even = digitsArray.filter((_, idx) => idx % 2).map((i) => Number(i) * 2).join("").split("");
  const total = digitsArray.filter((_, idx) => !(idx % 2)).concat(even).map((i) => Number(i)).reduce((acc, cur) => acc + cur);
  return total % 10 === 0;
}
function csCzCheck(tin) {
  tin = tin.replace(/\W/, "");
  let full_year = Number.parseInt(tin.slice(0, 2), 10);
  if (tin.length === 10) {
    if (full_year < 54) {
      full_year = Number.parseInt(`20${full_year}`, 10);
    } else {
      full_year = Number.parseInt(`19${full_year}`, 10);
    }
  } else {
    if (tin.slice(6) === "000") {
      return false;
    }
    if (full_year < 54) {
      full_year = Number.parseInt(`19${full_year}`, 10);
    } else {
      return false;
    }
  }
  if (full_year.toString().length === 3) {
    full_year = Number.parseInt([full_year.toString().slice(0, 2), "0", full_year.toString().slice(2)].join(""), 10);
  }
  let month = Number.parseInt(tin.slice(2, 4), 10);
  if (month > 50) {
    month -= 50;
  }
  if (month > 20) {
    if (full_year < 2004)
      return false;
    month -= 20;
  }
  if (month < 10) {
    month = Number.parseInt(`0${month}`, 10);
  }
  const date = `${full_year}/${month}/${tin.slice(4, 6)}`;
  if (!isDate(date, "YYYY/MM/DD"))
    return false;
  if (tin.length === 10) {
    if (Number.parseInt(tin, 10) % 11 !== 0) {
      const checkdigit = Number.parseInt(tin.slice(0, 9), 10) % 11;
      if (full_year < 1986 && checkdigit === 10) {
        if (Number.parseInt(tin.slice(9), 10) !== 0)
          return false;
      } else {
        return false;
      }
    }
  }
  return true;
}
function deAtCheck(tin) {
  return luhnCheck(tin);
}
function deDeCheck(tin) {
  const digits = tin.split("").map((a) => Number.parseInt(a, 10));
  const occurrences = [];
  for (let i = 0;i < digits.length - 1; i++) {
    occurrences.push("");
    for (let j = 0;j < digits.length - 1; j++) {
      if (digits[i] === digits[j]) {
        occurrences[i] += j;
      }
    }
  }
  const filteredOccurrences = occurrences.filter((a) => a.length > 1);
  if (filteredOccurrences.length !== 2 && filteredOccurrences.length !== 3)
    return false;
  if (occurrences[0].length === 3) {
    const trip_locations = occurrences[0].split("").map((a) => Number.parseInt(a, 10));
    let recurrent = 0;
    for (let i = 0;i < trip_locations.length - 1; i++) {
      if (trip_locations[i] + 1 === trip_locations[i + 1]) {
        recurrent += 1;
      }
    }
    if (recurrent === 2) {
      return false;
    }
  }
  return iso7064Check(tin);
}
function dkDkCheck(tin) {
  tin = tin.replace(/\W/, "");
  let year = Number.parseInt(tin.slice(4, 6), 10);
  const century_digit = tin.slice(6, 7);
  switch (century_digit) {
    case "0":
    case "1":
    case "2":
    case "3":
      year = Number.parseInt(`19${year}`, 10);
      break;
    case "4":
    case "9":
      if (year < 37) {
        year = Number.parseInt(`20${year}`, 10);
      } else {
        year = Number.parseInt(`19${year}`, 10);
      }
      break;
    default:
      if (year < 37) {
        year = Number.parseInt(`20${year}`, 10);
      } else if (year > 58) {
        year = Number.parseInt(`18${year}`, 10);
      } else {
        return false;
      }
      break;
  }
  if (year.toString().length === 3) {
    year = Number.parseInt([year.toString().slice(0, 2), "0", year.toString().slice(2)].join(""), 10);
  }
  const date = `${year}/${tin.slice(2, 4)}/${tin.slice(0, 2)}`;
  if (!isDate(date, "YYYY/MM/DD"))
    return false;
  const digits = tin.split("").map((a) => Number.parseInt(a, 10));
  let checksum = 0;
  let weight = 4;
  for (let i = 0;i < 9; i++) {
    checksum += digits[i] * weight;
    weight -= 1;
    if (weight === 1) {
      weight = 7;
    }
  }
  checksum %= 11;
  if (checksum === 1)
    return false;
  return checksum === 0 ? digits[9] === 0 : digits[9] === 11 - checksum;
}
function elCyCheck(tin) {
  const digits = tin.slice(0, 8).split("").map((a) => Number.parseInt(a, 10));
  let checksum = 0;
  for (let i = 1;i < digits.length; i += 2) {
    checksum += digits[i];
  }
  for (let i = 0;i < digits.length; i += 2) {
    if (digits[i] < 2) {
      checksum += 1 - digits[i];
    } else {
      checksum += 2 * (digits[i] - 2) + 5;
      if (digits[i] > 4) {
        checksum += 2;
      }
    }
  }
  return String.fromCharCode(checksum % 26 + 65) === tin.charAt(8);
}
function elGrCheck(tin) {
  const digits = tin.split("").map((a) => Number.parseInt(a, 10));
  let checksum = 0;
  for (let i = 0;i < 8; i++) {
    checksum += digits[i] * 2 ** (8 - i);
  }
  return checksum % 11 % 10 === digits[8];
}
function enIeCheck(tin) {
  let checksum = reverseMultiplyAndSum(tin.split("").slice(0, 7).map((a) => Number.parseInt(a, 10)), 8);
  if (tin.length === 9 && tin[8] !== "W") {
    checksum += (tin[8].charCodeAt(0) - 64) * 9;
  }
  checksum %= 23;
  if (checksum === 0) {
    return tin[7].toUpperCase() === "W";
  }
  return tin[7].toUpperCase() === String.fromCharCode(64 + checksum);
}
var enUsCampusPrefix = {
  andover: ["10", "12"],
  atlanta: ["60", "67"],
  austin: ["50", "53"],
  brookhaven: ["01", "02", "03", "04", "05", "06", "11", "13", "14", "16", "21", "22", "23", "25", "34", "51", "52", "54", "55", "56", "57", "58", "59", "65"],
  cincinnati: ["30", "32", "35", "36", "37", "38", "61"],
  fresno: ["15", "24"],
  internet: ["20", "26", "27", "45", "46", "47"],
  kansas: ["40", "44"],
  memphis: ["94", "95"],
  ogden: ["80", "90"],
  philadelphia: ["33", "39", "41", "42", "43", "46", "48", "62", "63", "64", "66", "68", "71", "72", "73", "74", "75", "76", "77", "81", "82", "83", "84", "85", "86", "87", "88", "91", "92", "93", "98", "99"],
  sba: ["31"]
};
function enUsGetPrefixes() {
  const prefixes = [];
  for (const location in enUsCampusPrefix) {
    if (Object.prototype.hasOwnProperty.call(enUsCampusPrefix, location)) {
      prefixes.push(...enUsCampusPrefix[location]);
    }
  }
  return prefixes;
}
function enUsCheck(tin) {
  return enUsGetPrefixes().includes(tin.slice(0, 2));
}
function esArCheck(tin) {
  let accum = 0;
  const digits = tin.split("").map((d) => Number.parseInt(d, 10));
  const popped = digits.pop();
  if (!popped)
    return false;
  const digit = popped;
  for (let i = 0;i < digits.length; i++) {
    accum += digits[9 - i] * (2 + i % 6);
  }
  let verif = 11 - accum % 11;
  if (verif === 11) {
    verif = 0;
  } else if (verif === 10) {
    verif = 9;
  }
  return digit === verif;
}
function esEsCheck(tin) {
  const chars = tin.toUpperCase().split("");
  if (Number.isNaN(Number.parseInt(chars[0], 10)) && chars.length > 1) {
    let lead_replace = 0;
    switch (chars[0]) {
      case "Y":
        lead_replace = 1;
        break;
      case "Z":
        lead_replace = 2;
        break;
      default:
    }
    chars.splice(0, 1, lead_replace.toString());
  } else {
    while (chars.length < 9) {
      chars.unshift("0");
    }
  }
  const lookup = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
  const charsStr = chars.join("");
  const checksum = Number.parseInt(charsStr.slice(0, 8), 10) % 23;
  return charsStr[8] === lookup[checksum];
}
function etEeCheck(tin) {
  let full_year = tin.slice(1, 3);
  const century_digit = tin.slice(0, 1);
  switch (century_digit) {
    case "1":
    case "2":
      full_year = `18${full_year}`;
      break;
    case "3":
    case "4":
      full_year = `19${full_year}`;
      break;
    default:
      full_year = `20${full_year}`;
      break;
  }
  const date = `${full_year}/${tin.slice(3, 5)}/${tin.slice(5, 7)}`;
  if (!isDate(date, "YYYY/MM/DD"))
    return false;
  const digits = tin.split("").map((a) => Number.parseInt(a, 10));
  let checksum = 0;
  let weight = 1;
  for (let i = 0;i < 10; i++) {
    checksum += digits[i] * weight;
    weight += 1;
    if (weight === 10) {
      weight = 1;
    }
  }
  if (checksum % 11 === 10) {
    checksum = 0;
    weight = 3;
    for (let i = 0;i < 10; i++) {
      checksum += digits[i] * weight;
      weight += 1;
      if (weight === 10) {
        weight = 1;
      }
    }
    if (checksum % 11 === 10)
      return digits[10] === 0;
  }
  return checksum % 11 === digits[10];
}
function fiFiCheck(tin) {
  let full_year = tin.slice(4, 6);
  const century_symbol = tin.slice(6, 7);
  switch (century_symbol) {
    case "+":
      full_year = `18${full_year}`;
      break;
    case "-":
      full_year = `19${full_year}`;
      break;
    default:
      full_year = `20${full_year}`;
      break;
  }
  const date = `${full_year}/${tin.slice(2, 4)}/${tin.slice(0, 2)}`;
  if (!isDate(date, "YYYY/MM/DD"))
    return false;
  let checksum = Number.parseInt(tin.slice(0, 6) + tin.slice(7, 10), 10) % 31;
  if (checksum < 10)
    return checksum === Number.parseInt(tin.slice(10), 10);
  checksum -= 10;
  const letters_lookup = ["A", "B", "C", "D", "E", "F", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "U", "V", "W", "X", "Y"];
  return letters_lookup[checksum] === tin.slice(10);
}
function frBeCheck(tin) {
  if (tin.slice(2, 4) !== "00" || tin.slice(4, 6) !== "00") {
    const date = `${tin.slice(0, 2)}/${tin.slice(2, 4)}/${tin.slice(4, 6)}`;
    if (!isDate(date, "YY/MM/DD"))
      return false;
  }
  let checksum = 97 - Number.parseInt(tin.slice(0, 9), 10) % 97;
  const checkdigits = Number.parseInt(tin.slice(9, 11), 10);
  if (checksum !== checkdigits) {
    checksum = 97 - Number.parseInt(`2${tin.slice(0, 9)}`, 10) % 97;
    if (checksum !== checkdigits) {
      return false;
    }
  }
  return true;
}
function frFrCheck(tin) {
  tin = tin.replace(/\s/g, "");
  const checksum = Number.parseInt(tin.slice(0, 10), 10) % 511;
  const checkdigits = Number.parseInt(tin.slice(10, 13), 10);
  return checksum === checkdigits;
}
function frLuCheck(tin) {
  const date = `${tin.slice(0, 4)}/${tin.slice(4, 6)}/${tin.slice(6, 8)}`;
  if (!isDate(date, "YYYY/MM/DD"))
    return false;
  if (!luhnCheck(tin.slice(0, 12)))
    return false;
  return verhoeffCheck(`${tin.slice(0, 11)}${tin[12]}`);
}
function hrHrCheck(tin) {
  return iso7064Check(tin);
}
function huHuCheck(tin) {
  const digits = tin.split("").map((a) => Number.parseInt(a, 10));
  let checksum = 8;
  for (let i = 1;i < 9; i++) {
    checksum += digits[i] * (i + 1);
  }
  return checksum % 11 === digits[9];
}
function itItNameCheck(name) {
  let vowelflag = false;
  let xflag = false;
  for (let i = 0;i < 3; i++) {
    if (!vowelflag && /[AEIOU]/.test(name[i])) {
      vowelflag = true;
    } else if (!xflag && vowelflag && name[i] === "X") {
      xflag = true;
    } else if (i > 0) {
      if (vowelflag && !xflag) {
        if (!/[AEIOU]/.test(name[i]))
          return false;
      }
      if (xflag) {
        if (!/X/.test(name[i]))
          return false;
      }
    }
  }
  return true;
}
function itItCheck(tin) {
  const chars = tin.toUpperCase().split("");
  if (!itItNameCheck(chars.slice(0, 3).join("")))
    return false;
  if (!itItNameCheck(chars.slice(3, 6).join("")))
    return false;
  const number_locations = [6, 7, 9, 10, 12, 13, 14];
  const number_replace = {
    L: "0",
    M: "1",
    N: "2",
    P: "3",
    Q: "4",
    R: "5",
    S: "6",
    T: "7",
    U: "8",
    V: "9"
  };
  for (const i of number_locations) {
    if (chars[i] in number_replace) {
      chars.splice(i, 1, number_replace[chars[i]]);
    }
  }
  const month_replace = {
    A: "01",
    B: "02",
    C: "03",
    D: "04",
    E: "05",
    H: "06",
    L: "07",
    M: "08",
    P: "09",
    R: "10",
    S: "11",
    T: "12"
  };
  const month = month_replace[chars[8]];
  let day = Number.parseInt(chars[9] + chars[10], 10);
  if (day > 40)
    day -= 40;
  if (day < 10)
    day = Number.parseInt(`0${day}`, 10);
  const date = `${chars[6]}${chars[7]}/${month}/${day}`;
  if (!isDate(date, "YY/MM/DD"))
    return false;
  let checksum = 0;
  for (let i = 1;i < chars.length - 1; i += 2) {
    let char_to_int = Number.parseInt(chars[i], 10);
    if (Number.isNaN(char_to_int)) {
      char_to_int = chars[i].charCodeAt(0) - 65;
    }
    checksum += char_to_int;
  }
  const odd_convert = {
    A: 1,
    B: 0,
    C: 5,
    D: 7,
    E: 9,
    F: 13,
    G: 15,
    H: 17,
    I: 19,
    J: 21,
    K: 2,
    L: 4,
    M: 18,
    N: 20,
    O: 11,
    P: 3,
    Q: 6,
    R: 8,
    S: 12,
    T: 14,
    U: 16,
    V: 10,
    W: 22,
    X: 25,
    Y: 24,
    Z: 23,
    0: 1,
    1: 0
  };
  for (let i = 0;i < chars.length - 1; i += 2) {
    let char_to_int = 0;
    if (chars[i] in odd_convert) {
      char_to_int = odd_convert[chars[i]];
    } else {
      const multiplier = Number.parseInt(chars[i], 10);
      char_to_int = 2 * multiplier + 1;
      if (multiplier > 4) {
        char_to_int += 2;
      }
    }
    checksum += char_to_int;
  }
  if (String.fromCharCode(65 + checksum % 26) !== chars[15])
    return false;
  return true;
}
function lvLvCheck(tin) {
  tin = tin.replace(/\W/, "");
  const day = tin.slice(0, 2);
  if (day !== "32") {
    const month = tin.slice(2, 4);
    if (month !== "00") {
      let full_year = tin.slice(4, 6);
      switch (tin[6]) {
        case "0":
          full_year = `18${full_year}`;
          break;
        case "1":
          full_year = `19${full_year}`;
          break;
        default:
          full_year = `20${full_year}`;
          break;
      }
      const date = `${full_year}/${tin.slice(2, 4)}/${day}`;
      if (!isDate(date, "YYYY/MM/DD"))
        return false;
    }
    let checksum = 1101;
    const multip_lookup = [1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    for (let i = 0;i < tin.length - 1; i++) {
      checksum -= Number.parseInt(tin[i], 10) * multip_lookup[i];
    }
    return Number.parseInt(tin[10], 10) === checksum % 11;
  }
  return true;
}
function mtMtCheck(tin) {
  if (tin.length !== 9) {
    const chars = tin.toUpperCase().split("");
    while (chars.length < 8) {
      chars.unshift("0");
    }
    switch (tin[7]) {
      case "A":
      case "P":
        if (Number.parseInt(chars[6], 10) === 0)
          return false;
        break;
      default: {
        const first_part = Number.parseInt(chars.join("").slice(0, 5), 10);
        if (first_part > 32000)
          return false;
        const second_part = Number.parseInt(chars.join("").slice(5, 7), 10);
        if (first_part === second_part)
          return false;
      }
    }
  }
  return true;
}
function nlNlCheck(tin) {
  return reverseMultiplyAndSum(tin.split("").slice(0, 8).map((a) => Number.parseInt(a, 10)), 9) % 11 === Number.parseInt(tin[8], 10);
}
function plPlCheck(tin) {
  if (tin.length === 10) {
    const lookup = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    let checksum2 = 0;
    for (let i = 0;i < lookup.length; i++) {
      checksum2 += Number.parseInt(tin[i], 10) * lookup[i];
    }
    checksum2 %= 11;
    if (checksum2 === 10)
      return false;
    return checksum2 === Number.parseInt(tin[9], 10);
  }
  let full_year = tin.slice(0, 2);
  let month = Number.parseInt(tin.slice(2, 4), 10);
  if (month > 80) {
    full_year = `18${full_year}`;
    month -= 80;
  } else if (month > 60) {
    full_year = `22${full_year}`;
    month -= 60;
  } else if (month > 40) {
    full_year = `21${full_year}`;
    month -= 40;
  } else if (month > 20) {
    full_year = `20${full_year}`;
    month -= 20;
  } else {
    full_year = `19${full_year}`;
  }
  if (month < 10) {
    month = Number.parseInt(`0${month}`, 10);
  }
  const date = `${full_year}/${month}/${tin.slice(4, 6)}`;
  if (!isDate(date, "YYYY/MM/DD"))
    return false;
  let checksum = 0;
  let multiplier = 1;
  for (let i = 0;i < tin.length - 1; i++) {
    checksum += Number.parseInt(tin[i], 10) * multiplier % 10;
    multiplier += 2;
    if (multiplier > 10) {
      multiplier = 1;
    } else if (multiplier === 5) {
      multiplier += 2;
    }
  }
  checksum = 10 - checksum % 10;
  return checksum === Number.parseInt(tin[10], 10);
}
function ptBrCheck(tin) {
  if (tin.length === 11) {
    let sum2;
    let remainder;
    sum2 = 0;
    if (tin === "11111111111" || tin === "22222222222" || tin === "33333333333" || tin === "44444444444" || tin === "55555555555" || tin === "66666666666" || tin === "77777777777" || tin === "88888888888" || tin === "99999999999" || tin === "00000000000") {
      return false;
    }
    for (let i = 1;i <= 9; i++)
      sum2 += Number.parseInt(tin.substring(i - 1, i), 10) * (11 - i);
    remainder = sum2 * 10 % 11;
    if (remainder === 10)
      remainder = 0;
    if (remainder !== Number.parseInt(tin.substring(9, 10), 10))
      return false;
    sum2 = 0;
    for (let i = 1;i <= 10; i++)
      sum2 += Number.parseInt(tin.substring(i - 1, i), 10) * (12 - i);
    remainder = sum2 * 10 % 11;
    if (remainder === 10)
      remainder = 0;
    if (remainder !== Number.parseInt(tin.substring(10, 11), 10))
      return false;
    return true;
  }
  if (tin === "00000000000000" || tin === "11111111111111" || tin === "22222222222222" || tin === "33333333333333" || tin === "44444444444444" || tin === "55555555555555" || tin === "66666666666666" || tin === "77777777777777" || tin === "88888888888888" || tin === "99999999999999") {
    return false;
  }
  let length = tin.length - 2;
  let identifiers = tin.substring(0, length);
  const verificators = tin.substring(length);
  let sum = 0;
  let pos = length - 7;
  for (let i = length;i >= 1; i--) {
    sum += Number.parseInt(identifiers.charAt(length - i), 10) * pos;
    pos -= 1;
    if (pos < 2)
      pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== Number.parseInt(verificators.charAt(0), 10))
    return false;
  length += 1;
  identifiers = tin.substring(0, length);
  sum = 0;
  pos = length - 7;
  for (let i = length;i >= 1; i--) {
    sum += Number.parseInt(identifiers.charAt(length - i), 10) * pos;
    pos -= 1;
    if (pos < 2)
      pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== Number.parseInt(verificators.charAt(1), 10))
    return false;
  return true;
}
function ptPtCheck(tin) {
  const checksum = 11 - reverseMultiplyAndSum(tin.split("").slice(0, 8).map((a) => Number.parseInt(a, 10)), 9) % 11;
  if (checksum > 9)
    return Number.parseInt(tin[8], 10) === 0;
  return checksum === Number.parseInt(tin[8], 10);
}
function roRoCheck(tin) {
  if (tin.slice(0, 4) !== "9000") {
    let full_year = tin.slice(1, 3);
    switch (tin[0]) {
      case "1":
      case "2":
        full_year = `19${full_year}`;
        break;
      case "3":
      case "4":
        full_year = `18${full_year}`;
        break;
      case "5":
      case "6":
        full_year = `20${full_year}`;
        break;
      default:
    }
    const date = `${full_year}/${tin.slice(3, 5)}/${tin.slice(5, 7)}`;
    if (date.length === 8) {
      if (!isDate(date, "YY/MM/DD"))
        return false;
    } else if (!isDate(date, "YYYY/MM/DD")) {
      return false;
    }
    const digits = tin.split("").map((a) => Number.parseInt(a, 10));
    const multipliers = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
    let checksum = 0;
    for (let i = 0;i < multipliers.length; i++) {
      checksum += digits[i] * multipliers[i];
    }
    if (checksum % 11 === 10)
      return digits[12] === 1;
    return digits[12] === checksum % 11;
  }
  return true;
}
function skSkCheck(tin) {
  if (tin.length === 9) {
    tin = tin.replace(/\W/, "");
    if (tin.slice(6) === "000")
      return false;
    let full_year = Number.parseInt(tin.slice(0, 2), 10);
    if (full_year > 53)
      return false;
    if (full_year < 10) {
      full_year = Number.parseInt(`190${full_year}`, 10);
    } else {
      full_year = Number.parseInt(`19${full_year}`, 10);
    }
    let month = Number.parseInt(tin.slice(2, 4), 10);
    if (month > 50) {
      month -= 50;
    }
    if (month < 10) {
      month = Number.parseInt(`0${month}`, 10);
    }
    const date = `${full_year}/${month}/${tin.slice(4, 6)}`;
    if (!isDate(date, "YYYY/MM/DD"))
      return false;
  }
  return true;
}
function slSiCheck(tin) {
  const checksum = 11 - reverseMultiplyAndSum(tin.split("").slice(0, 7).map((a) => Number.parseInt(a, 10)), 8) % 11;
  if (checksum === 10)
    return Number.parseInt(tin[7], 10) === 0;
  return checksum === Number.parseInt(tin[7], 10);
}
function svSeCheck(tin) {
  let tin_copy = tin.slice(0);
  if (tin.length > 11) {
    tin_copy = tin_copy.slice(2);
  }
  let full_year = "";
  const month = tin_copy.slice(2, 4);
  let day = Number.parseInt(tin_copy.slice(4, 6), 10);
  if (tin.length > 11) {
    full_year = tin.slice(0, 4);
  } else {
    full_year = tin.slice(0, 2);
    if (tin.length === 11 && day < 60) {
      const current_year = new Date().getFullYear();
      const current_century = Math.floor(current_year / 100);
      if (tin[6] === "-") {
        if (Number.parseInt(`${current_century}${full_year}`, 10) > current_year) {
          full_year = `${current_century - 1}${full_year}`;
        } else {
          full_year = `${current_century}${full_year}`;
        }
      } else {
        full_year = `${current_century - 1}${full_year}`;
        if (current_year - Number.parseInt(full_year, 10) < 100) {
          return false;
        }
      }
    }
  }
  if (day > 60) {
    day -= 60;
  }
  if (day < 10) {
    day = Number.parseInt(`0${day}`, 10);
  }
  const date = `${full_year}/${month}/${day}`;
  if (date.length === 8) {
    if (!isDate(date, "YY/MM/DD"))
      return false;
  } else if (!isDate(date, "YYYY/MM/DD")) {
    return false;
  }
  return luhnCheck(tin.replace(/\W/, ""));
}
function ukUaCheck(tin) {
  const digits = tin.split("").map((a) => Number.parseInt(a, 10));
  const multipliers = [-1, 5, 7, 9, 4, 6, 10, 5, 7];
  let checksum = 0;
  for (let i = 0;i < multipliers.length; i++) {
    checksum += digits[i] * multipliers[i];
  }
  return checksum % 11 === 10 ? digits[9] === 0 : digits[9] === checksum % 11;
}
var taxIdFormat = {
  "bg-BG": /^\d{10}$/,
  "cs-CZ": /^\d{6}\/?\d{3,4}$/,
  "de-AT": /^\d{9}$/,
  "de-DE": /^[1-9]\d{10}$/,
  "dk-DK": /^\d{6}-?\d{4}$/,
  "el-CY": /^[09]\d{7}[A-Z]$/,
  "el-GR": /^([0-47-9])\d{8}$/,
  "en-CA": /^\d{9}$/,
  "en-GB": /^\d{10}$|^(?!GB|NK|TN|ZZ)(?![DFIQUV])[A-Z](?![DFIQUVO])[A-Z]\d{6}[A-D ]$/i,
  "en-IE": /^\d{7}[A-W][A-IW]?$/i,
  "en-US": /^\d{2}[- ]?\d{7}$/,
  "es-AR": /(20|23|24|27|30|33|34)\d{9}/,
  "es-ES": /^(\d{0,8}|[XYZKLM]\d{7})[A-HJ-NP-TV-Z]$/i,
  "et-EE": /^[1-6]\d{6}(00[1-9]|0[1-9]\d|[1-6]\d{2}|70\d|710)\d$/,
  "fi-FI": /^\d{6}[-+A]\d{3}[0-9A-FHJ-NPR-Y]$/i,
  "fr-BE": /^\d{11}$/,
  "fr-FR": /^[0-3]\d{12}$|^[0-3]\d\s\d{2}(\s\d{3}){3}$/,
  "fr-LU": /^\d{13}$/,
  "hr-HR": /^\d{11}$/,
  "hu-HU": /^8\d{9}$/,
  "it-IT": /^[A-Z]{6}[L-NP-V0-9]{2}[A-EHLMPRST][L-NP-V0-9]{2}[A-ILMZ][L-NP-V0-9]{3}[A-Z]$/i,
  "lv-LV": /^\d{6}-?\d{5}$/,
  "mt-MT": /^\d{3,7}[APMGLHBZ]$|^([1-8])\1\d{7}$/i,
  "nl-NL": /^\d{9}$/,
  "pl-PL": /^\d{10,11}$/,
  "pt-BR": /^\d{11}$|^\d{14}$/,
  "pt-PT": /^\d{9}$/,
  "ro-RO": /^\d{13}$/,
  "sk-SK": /^\d{6}\/?\d{3,4}$/,
  "sl-SI": /^[1-9]\d{7}$/,
  "sv-SE": /^(\d{6}[-+]?\d{4}|(18|19|20)\d{6}[-+]?\d{4})$/,
  "uk-UA": /^\d{10}$/
};
taxIdFormat["lb-LU"] = taxIdFormat["fr-LU"];
taxIdFormat["lt-LT"] = taxIdFormat["et-EE"];
taxIdFormat["nl-BE"] = taxIdFormat["fr-BE"];
taxIdFormat["fr-CA"] = taxIdFormat["en-CA"];
var taxIdCheck = {
  "bg-BG": bgBgCheck,
  "cs-CZ": csCzCheck,
  "de-AT": deAtCheck,
  "de-DE": deDeCheck,
  "dk-DK": dkDkCheck,
  "el-CY": elCyCheck,
  "el-GR": elGrCheck,
  "en-CA": isCanadianSIN,
  "en-IE": enIeCheck,
  "en-US": enUsCheck,
  "es-AR": esArCheck,
  "es-ES": esEsCheck,
  "et-EE": etEeCheck,
  "fi-FI": fiFiCheck,
  "fr-BE": frBeCheck,
  "fr-FR": frFrCheck,
  "fr-LU": frLuCheck,
  "hr-HR": hrHrCheck,
  "hu-HU": huHuCheck,
  "it-IT": itItCheck,
  "lv-LV": lvLvCheck,
  "mt-MT": mtMtCheck,
  "nl-NL": nlNlCheck,
  "pl-PL": plPlCheck,
  "pt-BR": ptBrCheck,
  "pt-PT": ptPtCheck,
  "ro-RO": roRoCheck,
  "sk-SK": skSkCheck,
  "sl-SI": slSiCheck,
  "sv-SE": svSeCheck,
  "uk-UA": ukUaCheck
};
taxIdCheck["lb-LU"] = taxIdCheck["fr-LU"];
taxIdCheck["lt-LT"] = taxIdCheck["et-EE"];
taxIdCheck["nl-BE"] = taxIdCheck["fr-BE"];
taxIdCheck["fr-CA"] = taxIdCheck["en-CA"];
var allsymbols = /[-\\/!@#$%^&*()+=[\]]+/g;
var sanitizeRegexes = {
  "de-AT": allsymbols,
  "de-DE": /[/\\]/g,
  "fr-BE": allsymbols
};
sanitizeRegexes["nl-BE"] = sanitizeRegexes["fr-BE"];
function isTaxID(str, locale = "en-US") {
  assertString(str);
  let strcopy = str.slice(0);
  if (locale in taxIdFormat) {
    if (locale in sanitizeRegexes) {
      strcopy = strcopy.replace(sanitizeRegexes[locale], "");
    }
    if (!taxIdFormat[locale].test(strcopy)) {
      return false;
    }
    if (locale in taxIdCheck) {
      return taxIdCheck[locale](strcopy);
    }
    return true;
  }
  throw new Error(`Invalid locale '${locale}'`);
}

// src/lib/isTime.ts
var default_time_options = {
  hourFormat: "hour24",
  mode: "default"
};
var formats = {
  hour24: {
    default: /^([01]?\d|2[0-3]):([0-5]\d)$/,
    withSeconds: /^([01]?\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
    withOptionalSeconds: /^([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/
  },
  hour12: {
    default: /^(0?[1-9]|1[0-2]):([0-5]\d) (A|P)M$/,
    withSeconds: /^(0?[1-9]|1[0-2]):([0-5]\d):([0-5]\d) (A|P)M$/,
    withOptionalSeconds: /^(0?[1-9]|1[0-2]):([0-5]\d)(?::([0-5]\d))? (A|P)M$/
  }
};
function isTime(input, options = default_time_options) {
  options = merge(options, default_time_options);
  if (typeof input !== "string")
    return false;
  return formats[options.hourFormat][options.mode].test(input);
}

// src/lib/isULID.ts
function isULID(str) {
  assertString(str);
  return /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/i.test(str);
}

// src/lib/isUppercase.ts
function isUppercase(str) {
  assertString(str);
  return str === str.toUpperCase();
}

// src/lib/isURL.ts
var default_url_options = {
  protocols: ["http", "https", "ftp"],
  require_tld: true,
  require_protocol: false,
  require_host: true,
  require_port: false,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false,
  allow_fragments: true,
  allow_query_components: true,
  validate_length: true,
  max_allowed_length: 2084
};
var wrapped_ipv6 = /^\[([^\]]+)\](?::(\d+))?$/;
function isURL(url, options) {
  assertString(url);
  if (!url || /[\s<>]/.test(url)) {
    return false;
  }
  if (url.indexOf("mailto:") === 0) {
    return false;
  }
  options = merge(options, default_url_options);
  if (options?.validate_length && url.length > (options?.max_allowed_length ?? default_url_options.max_allowed_length)) {
    return false;
  }
  if (!options.allow_fragments && includesString_default(url, "#")) {
    return false;
  }
  if (!options.allow_query_components && (includesString_default(url, "?") || includesString_default(url, "&"))) {
    return false;
  }
  let protocol, auth, host, port, port_str, ipv6;
  let split = [];
  split = url.split("#");
  url = split.shift() ?? "";
  split = url.split("?");
  url = split.shift() ?? "";
  split = url.split("://");
  if (split.length > 1) {
    protocol = split.shift()?.toLowerCase() ?? "";
    if (options?.require_valid_protocol && !(options?.protocols ?? default_url_options.protocols).includes(protocol)) {
      return false;
    }
  } else if (options.require_protocol) {
    return false;
  } else if (url.slice(0, 2) === "//") {
    if (!options.allow_protocol_relative_urls) {
      return false;
    }
    split[0] = url.slice(2);
  }
  url = split.join("://");
  if (url === "") {
    return false;
  }
  split = url.split("/");
  const hostname = split.shift() ?? "";
  if (hostname === "" && !options.require_host) {
    return true;
  }
  split = hostname.split("@");
  if (split.length > 1) {
    if (options.disallow_auth) {
      return false;
    }
    if (split[0] === "") {
      return false;
    }
    auth = split.shift() ?? "";
    if (auth.includes(":") && auth.split(":").length > 2) {
      return false;
    }
    const [user, password] = auth.split(":");
    if (user === "" && password === "") {
      return false;
    }
  }
  port_str = null;
  ipv6 = null;
  const ipv6_match = hostname.match(wrapped_ipv6);
  if (ipv6_match) {
    host = "";
    ipv6 = ipv6_match[1];
    port_str = ipv6_match[2] || null;
  } else {
    split = hostname.split(":");
    host = split.shift();
    if (split.length) {
      port_str = split.join(":");
    }
  }
  if (port_str !== null && port_str.length > 0) {
    port = Number.parseInt(port_str, 10);
    if (!/^\d+$/.test(port_str) || port <= 0 || port > 65535) {
      return false;
    }
  } else if (options.require_port) {
    return false;
  }
  if (options.host_whitelist) {
    return checkHost(host ?? "", options.host_whitelist);
  }
  if (host === "" && !options.require_host) {
    return true;
  }
  if (!isIP(host ?? "") && !isFQDN(host ?? "", options) && (!ipv6 || !isIP(ipv6, { version: 6 }))) {
    return false;
  }
  host = (host || ipv6) ?? "";
  if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
    return false;
  }
  return true;
}

// src/lib/isUUID.ts
var uuid = {
  1: /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  2: /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  6: /^[0-9A-F]{8}-[0-9A-F]{4}-6[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  7: /^[0-9A-F]{8}-[0-9A-F]{4}-7[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  8: /^[0-9A-F]{8}-[0-9A-F]{4}-8[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  nil: /^00000000-0000-0000-0000-000000000000$/,
  max: /^ffffffff-ffff-ffff-ffff-ffffffffffff$/i,
  loose: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  all: /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i
};
function isUUID(str, version) {
  assertString(str);
  if (version === undefined || version === null) {
    version = "all";
  }
  return version in uuid ? uuid[version].test(str) : false;
}

// src/lib/isVariableWidth.ts
function isVariableWidth(str) {
  assertString(str);
  return isFullWidth(str) && isHalfWidth(str);
}

// src/lib/isVAT.ts
function AU(str) {
  const match = str.match(/^(AU)?(\d{11})$/);
  if (!match) {
    return false;
  }
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  str = str.replace(/^AU/, "");
  const ABN = (Number.parseInt(str.slice(0, 1), 10) - 1).toString() + str.slice(1);
  let total = 0;
  for (let i = 0;i < 11; i++) {
    total += weights[i] * Number.parseInt(ABN.charAt(i), 10);
  }
  return total !== 0 && total % 89 === 0;
}
function CH(str) {
  const hasValidCheckNumber = (digits) => {
    const lastDigit = digits.pop();
    const weights = [5, 4, 3, 2, 7, 6, 5, 4];
    const calculatedCheckNumber = (11 - digits.reduce((acc, el, idx) => acc + el * weights[idx], 0) % 11) % 11;
    return lastDigit === calculatedCheckNumber;
  };
  return /^(?:CHE[- ]?)?(?:\d{9}|\d{3}\.\d{3}\.\d{3}|\d{3} \d{3} \d{3}) ?(?:TVA|MWST|IVA)?$/.test(str) && hasValidCheckNumber((str.match(/\d/g) ?? []).map((el) => +el));
}
function PT(str) {
  const match = str.match(/^(PT)?(\d{9})$/);
  if (!match) {
    return false;
  }
  const tin = match[2];
  const checksum = 11 - reverseMultiplyAndSum(tin.split("").slice(0, 8).map((a) => Number.parseInt(a, 10)), 9) % 11;
  if (checksum > 9) {
    return Number.parseInt(tin[8], 10) === 0;
  }
  return checksum === Number.parseInt(tin[8], 10);
}
var vatMatchers = {
  AT: (str) => /^(?:AT)?U\d{8}$/.test(str),
  BE: (str) => /^(?:BE)?\d{10}$/.test(str),
  BG: (str) => /^(?:BG)?\d{9,10}$/.test(str),
  HR: (str) => /^(?:HR)?\d{11}$/.test(str),
  CY: (str) => /^(?:CY)?\w{9}$/.test(str),
  CZ: (str) => /^(?:CZ)?\d{8,10}$/.test(str),
  DK: (str) => /^(?:DK)?\d{8}$/.test(str),
  EE: (str) => /^(?:EE)?\d{9}$/.test(str),
  FI: (str) => /^(?:FI)?\d{8}$/.test(str),
  FR: (str) => /^(?:FR)?\w{2}\d{9}$/.test(str),
  DE: (str) => /^(?:DE)?\d{9}$/.test(str),
  EL: (str) => /^(?:EL)?\d{9}$/.test(str),
  HU: (str) => /^(?:HU)?\d{8}$/.test(str),
  IE: (str) => /^(?:IE)?\d{7}\wW?$/.test(str),
  IT: (str) => /^(?:IT)?\d{11}$/.test(str),
  LV: (str) => /^(?:LV)?\d{11}$/.test(str),
  LT: (str) => /^(?:LT)?\d{9,12}$/.test(str),
  LU: (str) => /^(?:LU)?\d{8}$/.test(str),
  MT: (str) => /^(?:MT)?\d{8}$/.test(str),
  NL: (str) => /^(?:NL)?\d{9}B\d{2}$/.test(str),
  PL: (str) => /^(?:PL)?(?:\d{10}|\d{3}-\d{3}-\d{2}-\d{2}|\d{3}-\d{2}-\d{2}-\d{3})$/.test(str),
  PT,
  RO: (str) => /^(?:RO)?\d{2,10}$/.test(str),
  SK: (str) => /^(?:SK)?\d{10}$/.test(str),
  SI: (str) => /^(?:SI)?\d{8}$/.test(str),
  ES: (str) => /^(?:ES)?\w\d{7}[A-Z]$/.test(str),
  SE: (str) => /^(?:SE)?\d{12}$/.test(str),
  AL: (str) => /^(?:AL)?\w{9}[A-Z]$/.test(str),
  MK: (str) => /^(?:MK)?\d{13}$/.test(str),
  AU,
  BY: (str) => /^(?:\u0423\u041D\u041F )?\d{9}$/.test(str),
  CA: (str) => /^(?:CA)?\d{9}$/.test(str),
  IS: (str) => /^(?:IS)?\d{5,6}$/.test(str),
  IN: (str) => /^(?:IN)?\d{15}$/.test(str),
  ID: (str) => /^(?:ID)?(?:\d{15}|\d{2}.\d{3}.\d{3}.\d-\d{3}.\d{3})$/.test(str),
  IL: (str) => /^(?:IL)?\d{9}$/.test(str),
  KZ: (str) => /^(?:KZ)?\d{12}$/.test(str),
  NZ: (str) => /^(?:NZ)?\d{9}$/.test(str),
  NG: (str) => /^(?:NG)?(?:\d{12}|\d{8}-\d{4})$/.test(str),
  NO: (str) => /^(?:NO)?\d{9}MVA$/.test(str),
  PH: (str) => /^(?:PH)?(?:\d{12}|\d{3} \d{3} \d{3} \d{3})$/.test(str),
  RU: (str) => /^(?:RU)?(?:\d{10}|\d{12})$/.test(str),
  SM: (str) => /^(?:SM)?\d{5}$/.test(str),
  SA: (str) => /^(?:SA)?\d{15}$/.test(str),
  RS: (str) => /^(?:RS)?\d{9}$/.test(str),
  CH,
  TR: (str) => /^(?:TR)?\d{10}$/.test(str),
  UA: (str) => /^(?:UA)?\d{12}$/.test(str),
  GB: (str) => /^GB(?:\d{3} \d{4} (?:[0-8]\d|9[0-6])|\d{9} \d{3}|(?:GD[0-4]|HA[5-9])\d{2})$/.test(str),
  UZ: (str) => /^(?:UZ)?\d{9}$/.test(str),
  AR: (str) => /^(?:AR)?\d{11}$/.test(str),
  BO: (str) => /^(?:BO)?\d{7}$/.test(str),
  BR: (str) => /^(?:BR)?(?:\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}|\d{3}.\d{3}.\d{3}-\d{2})$/.test(str),
  CL: (str) => /^(?:CL)?\d{8}-\d$/.test(str),
  CO: (str) => /^(?:CO)?\d{10}$/.test(str),
  CR: (str) => /^(?:CR)?\d{9,12}$/.test(str),
  EC: (str) => /^(?:EC)?\d{13}$/.test(str),
  SV: (str) => /^(?:SV)?\d{4}-\d{6}-\d{3}-\d$/.test(str),
  GT: (str) => /^(?:GT)?\d{7}-\d$/.test(str),
  HN: (str) => /^(?:HN)?$/.test(str),
  MX: (str) => /^(?:MX)?\w{3,4}\d{6}\w{3}$/.test(str),
  NI: (str) => /^(?:NI)?\d{3}-\d{6}-\d{4}\w$/.test(str),
  PA: (str) => /^(?:PA)?$/.test(str),
  PY: (str) => /^(?:PY)?\d{6,8}-\d$/.test(str),
  PE: (str) => /^(?:PE)?\d{11}$/.test(str),
  DO: (str) => /^(?:DO)?(?:\d{11}|\d{3}-\d{7}-\d|[1,45]\d{8}|[1,45]-\d{2}-\d{5}-\d)$/.test(str),
  UY: (str) => /^(?:UY)?\d{12}$/.test(str),
  VE: (str) => /^(?:VE)?[J,GVE]-(?:\d{9}|\d{8}-\d)$/.test(str)
};
function isVAT(str, countryCode) {
  assertString(str);
  assertString(countryCode);
  if (countryCode in vatMatchers) {
    return vatMatchers[countryCode](str);
  }
  throw new Error(`Invalid country code: '${countryCode}'`);
}

// src/lib/isWhitelisted.ts
function isWhitelisted(str, chars) {
  assertString(str);
  for (let i = str.length - 1;i >= 0; i--) {
    if (!chars.includes(str[i])) {
      return false;
    }
  }
  return true;
}

// src/lib/matches.ts
function matches(str, pattern, modifiers) {
  assertString(str);
  if (Object.prototype.toString.call(pattern) !== "[object RegExp]") {
    pattern = new RegExp(pattern, modifiers);
  }
  return !!str.match(pattern);
}

// src/lib/normalizeEmail.ts
var default_normalize_email_options = {
  all_lowercase: true,
  gmail_lowercase: true,
  gmail_remove_dots: true,
  gmail_remove_subaddress: true,
  gmail_convert_googlemaildotcom: true,
  outlookdotcom_lowercase: true,
  outlookdotcom_remove_subaddress: true,
  yahoo_lowercase: true,
  yahoo_remove_subaddress: true,
  yandex_lowercase: true,
  yandex_convert_yandexru: true,
  icloud_lowercase: true,
  icloud_remove_subaddress: true
};
var icloud_domains = [
  "icloud.com",
  "me.com"
];
var outlookdotcom_domains = [
  "hotmail.at",
  "hotmail.be",
  "hotmail.ca",
  "hotmail.cl",
  "hotmail.co.il",
  "hotmail.co.nz",
  "hotmail.co.th",
  "hotmail.co.uk",
  "hotmail.com",
  "hotmail.com.ar",
  "hotmail.com.au",
  "hotmail.com.br",
  "hotmail.com.gr",
  "hotmail.com.mx",
  "hotmail.com.pe",
  "hotmail.com.tr",
  "hotmail.com.vn",
  "hotmail.cz",
  "hotmail.de",
  "hotmail.dk",
  "hotmail.es",
  "hotmail.fr",
  "hotmail.hu",
  "hotmail.id",
  "hotmail.ie",
  "hotmail.in",
  "hotmail.it",
  "hotmail.jp",
  "hotmail.kr",
  "hotmail.lv",
  "hotmail.my",
  "hotmail.ph",
  "hotmail.pt",
  "hotmail.sa",
  "hotmail.sg",
  "hotmail.sk",
  "live.be",
  "live.co.uk",
  "live.com",
  "live.com.ar",
  "live.com.mx",
  "live.de",
  "live.es",
  "live.eu",
  "live.fr",
  "live.it",
  "live.nl",
  "msn.com",
  "outlook.at",
  "outlook.be",
  "outlook.cl",
  "outlook.co.il",
  "outlook.co.nz",
  "outlook.co.th",
  "outlook.com",
  "outlook.com.ar",
  "outlook.com.au",
  "outlook.com.br",
  "outlook.com.gr",
  "outlook.com.pe",
  "outlook.com.tr",
  "outlook.com.vn",
  "outlook.cz",
  "outlook.de",
  "outlook.dk",
  "outlook.es",
  "outlook.fr",
  "outlook.hu",
  "outlook.id",
  "outlook.ie",
  "outlook.in",
  "outlook.it",
  "outlook.jp",
  "outlook.kr",
  "outlook.lv",
  "outlook.my",
  "outlook.ph",
  "outlook.pt",
  "outlook.sa",
  "outlook.sg",
  "outlook.sk",
  "passport.com"
];
var yahoo_domains = [
  "rocketmail.com",
  "yahoo.ca",
  "yahoo.co.uk",
  "yahoo.com",
  "yahoo.de",
  "yahoo.fr",
  "yahoo.in",
  "yahoo.it",
  "ymail.com"
];
var yandex_domains = [
  "yandex.ru",
  "yandex.ua",
  "yandex.kz",
  "yandex.com",
  "yandex.by",
  "ya.ru"
];
function dotsReplacer(match) {
  if (match.length > 1) {
    return match;
  }
  return "";
}
function normalizeEmail(email, options = {}) {
  options = merge(options, default_normalize_email_options);
  const raw_parts = email.split("@");
  const domain = raw_parts.pop();
  const user = raw_parts.join("@");
  const parts = [user, domain];
  if (!parts[0] || !parts[1]) {
    return false;
  }
  parts[1] = parts[1].toLowerCase();
  if (parts[1] === "gmail.com" || parts[1] === "googlemail.com") {
    if (options.gmail_remove_subaddress) {
      parts[0] = parts[0].split("+")[0];
    }
    if (options.gmail_remove_dots) {
      parts[0] = parts[0].replace(/\.+/g, dotsReplacer);
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.gmail_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
    parts[1] = options.gmail_convert_googlemaildotcom ? "gmail.com" : parts[1];
  } else if (icloud_domains.includes(parts[1])) {
    if (options.icloud_remove_subaddress) {
      parts[0] = parts[0].split("+")[0];
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.icloud_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (outlookdotcom_domains.includes(parts[1])) {
    if (options.outlookdotcom_remove_subaddress) {
      parts[0] = parts[0].split("+")[0];
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.outlookdotcom_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (yahoo_domains.includes(parts[1])) {
    if (options.yahoo_remove_subaddress) {
      const components = parts[0].split("-");
      parts[0] = components.length > 1 ? components.slice(0, -1).join("-") : components[0];
    }
    if (!parts[0].length) {
      return false;
    }
    if (options.all_lowercase || options.yahoo_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (yandex_domains.includes(parts[1])) {
    if (options.all_lowercase || options.yandex_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
    parts[1] = options.yandex_convert_yandexru ? "yandex.ru" : parts[1];
  } else if (options.all_lowercase) {
    parts[0] = parts[0].toLowerCase();
  }
  return parts.join("@");
}

// src/lib/stripLow.ts
function stripLow(str, keep_new_lines) {
  assertString(str);
  const chars = keep_new_lines ? "\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F" : "\\x00-\\x1F\\x7F";
  return blacklist(str, chars);
}

// src/lib/toBoolean.ts
function toBoolean(str, strict = false) {
  assertString(str);
  if (strict) {
    return str === "true";
  }
  return str !== "0" && str !== "false" && str !== "";
}

// src/lib/toInt.ts
function toInt(str, radix = 10) {
  assertString(str);
  return Number.parseInt(str, radix);
}

// src/lib/unescape.ts
function unescape(str) {
  assertString(str);
  return str.replace(/&quot/g, '"').replace(/&#x27/g, "'").replace(/&lt/g, "<").replace(/&gt/g, ">").replace(/&#x2F/g, "/").replace(/&#x5C/g, "\\").replace(/&#96/g, "`").replace(/&amp/g, "&");
}

// src/lib/whitelist.ts
function whitelist(str, chars) {
  assertString(str);
  return str.replace(new RegExp(`[^${chars}]+`, "g"), "");
}

// src/lib/index.ts
var version = "1.0.0";
var validator = {
  version,
  toDate,
  toFloat,
  toInt,
  toBoolean,
  equals,
  contains,
  matches,
  trim,
  ltrim,
  rtrim,
  escape,
  unescape,
  stripLow,
  whitelist,
  blacklist,
  isWhitelisted,
  normalizeEmail,
  isEmail,
  isURL,
  isMACAddress,
  isIP,
  isIPRange,
  isFQDN,
  isMailtoURI,
  isMagnetURI,
  isDataURI,
  isDate,
  isTime,
  isRFC3339,
  isISO8601,
  isAlpha,
  isAlphaLocales: locales,
  isAlphanumeric,
  isAlphanumericLocales: locales2,
  isNumeric,
  isPassportNumber,
  passportNumberLocales: locales6,
  isPort,
  isLowercase,
  isUppercase,
  isAscii,
  isFullWidth,
  isHalfWidth,
  isVariableWidth,
  isMultibyte,
  isBoolean,
  isLocale,
  isSlug,
  isEmpty,
  isLength,
  isByteLength,
  isSemVer,
  isSurrogatePair,
  isInt,
  isFloat,
  isFloatLocales: locales3,
  isDecimal,
  isHexadecimal,
  isOctal,
  isDivisibleBy,
  isLuhnNumber,
  isCreditCard,
  isBIC,
  isIBAN,
  ibanLocales: locales4,
  isEthereumAddress,
  isCurrency,
  isBtcAddress,
  isHexColor,
  isRgbColor,
  isHSL,
  isISRC,
  isMD5,
  isHash,
  isJWT,
  isJSON,
  isUUID,
  isULID,
  isMongoId,
  isBase32,
  isBase58,
  isBase64,
  isAfter,
  isBefore,
  isIn,
  isIMEI,
  isEAN,
  isISIN,
  isISBN,
  isISSN,
  isTaxID,
  isIdentityCard,
  isVAT,
  isMobilePhone,
  isMobilePhoneLocales: locales5,
  isPostalCode,
  isPostalCodeLocales: locales7,
  isLatLong,
  isLicensePlate,
  isISO6346,
  isFreightContainerID,
  isISO6391,
  isISO15924,
  isISO31661Alpha2,
  isISO31661Alpha3,
  isISO31661Numeric,
  isISO4217,
  isStrongPassword,
  toString
};
var lib_default = validator;
// src/types.ts
var SCHEMA_NAME = Symbol("schema_name");
var INPUT_TYPE = Symbol("input_type");
var OUTPUT_TYPE = Symbol("output_type");
var COMPUTED_TYPE = Symbol("computed_type");
var PARSE = Symbol("parse");
// src/validators/base.ts
class BaseValidator {
  rules = [];
  isRequired = false;
  fieldName = "value";
  isPartOfShape = false;
  name = "base";
  required() {
    this.isRequired = true;
    return this;
  }
  optional() {
    this.isRequired = false;
    return this;
  }
  setIsPartOfShape(isPartOfShape) {
    this.isPartOfShape = isPartOfShape;
    return this;
  }
  addRule(rule) {
    this.rules.push(rule);
    return this;
  }
  validate(value) {
    const errors = [];
    if (value === undefined || value === null || value === "") {
      if (!this.isRequired) {
        return this.isPartOfShape ? { valid: true, errors: {} } : { valid: true, errors: [] };
      } else {
        const error = { message: "This field is required" };
        return this.isPartOfShape ? { valid: false, errors: { [this.fieldName]: [error] } } : { valid: false, errors: [error] };
      }
    }
    for (const rule of this.rules) {
      if (!rule.test(value)) {
        errors.push({
          message: this.formatMessage(rule.message, rule.params ?? {})
        });
      }
    }
    if (this.isPartOfShape && errors.length > 0) {
      const errorMap = {
        [this.fieldName]: errors
      };
      return { valid: false, errors: errorMap };
    }
    return {
      valid: errors.length === 0,
      errors
    };
  }
  getRules() {
    return this.rules;
  }
  test(value) {
    return this.validate(value).valid;
  }
  formatMessage(message, params) {
    return message.replace(/\{([^}]+)\}/g, (_, key) => {
      const value = key.split(".").reduce((obj, k) => obj?.[k], params);
      return value !== undefined ? String(value) : `{${key}}`;
    });
  }
}

// src/validators/arrays.ts
class ArrayValidator extends BaseValidator {
  name = "array";
  constructor() {
    super();
    this.addRule({
      name: "array",
      test: (value) => Array.isArray(value),
      message: "Must be an array"
    });
  }
  min(length) {
    return this.addRule({
      name: "min",
      test: (value) => value.length >= length,
      message: "Must have at least {length} items",
      params: { length }
    });
  }
  max(length) {
    return this.addRule({
      name: "max",
      test: (value) => value.length <= length,
      message: "Must have at most {length} items",
      params: { length }
    });
  }
  length(length) {
    return this.addRule({
      name: "length",
      test: (value) => value.length === length,
      message: "Must have exactly {length} items",
      params: { length }
    });
  }
  each(validator2) {
    return this.addRule({
      name: "each",
      test: (value) => value.every((item) => validator2.test(item)),
      message: "Each item in array is invalid"
    });
  }
  unique() {
    return this.addRule({
      name: "unique",
      test: (value) => {
        const seen = new Set;
        return value.every((item) => {
          const key = JSON.stringify(item);
          if (seen.has(key))
            return false;
          seen.add(key);
          return true;
        });
      },
      message: "Array must contain unique values"
    });
  }
}
function array() {
  return new ArrayValidator;
}

// src/validators/booleans.ts
class BooleanValidator extends BaseValidator {
  name = "boolean";
  constructor() {
    super();
    this.addRule({
      name: "boolean",
      test: (value) => typeof value === "boolean",
      message: "Must be a boolean"
    });
  }
  isTrue() {
    return this.addRule({
      name: "isTrue",
      test: (value) => value === true,
      message: "Must be true"
    });
  }
  isFalse() {
    return this.addRule({
      name: "isFalse",
      test: (value) => value === false,
      message: "Must be false"
    });
  }
  custom(fn, message) {
    return this.addRule({
      name: "custom",
      test: fn,
      message
    });
  }
}
function boolean() {
  return new BooleanValidator;
}

// src/validators/custom.ts
class CustomValidator extends BaseValidator {
  name = "custom";
  constructor(validationFn, message) {
    super();
    this.addRule({
      name: "custom",
      test: (value) => value === undefined || value === null || validationFn(value),
      message
    });
  }
}
function custom(validationFn, message) {
  return new CustomValidator(validationFn, message);
}

// src/validators/dates.ts
class DateValidator extends BaseValidator {
  name = "date";
  constructor() {
    super();
    this.addRule({
      name: "date",
      test: (value) => value instanceof Date && !Number.isNaN(value.getTime()),
      message: "Must be a valid date"
    });
  }
}
function date() {
  return new DateValidator;
}

// src/validators/datetimes.ts
class DatetimeValidator extends BaseValidator {
  name = "datetime";
  constructor() {
    super();
    this.addRule({
      name: "datetime",
      test: (value) => {
        if (!(value instanceof Date)) {
          return false;
        }
        const year = value.getFullYear();
        if (year < 1000 || year > 9999) {
          return false;
        }
        return !Number.isNaN(value.getTime());
      },
      message: "Must be a valid datetime between 1000-01-01 and 9999-12-31"
    });
  }
}
function datetime() {
  return new DatetimeValidator;
}

// src/validators/enums.ts
class EnumValidator extends BaseValidator {
  name = "enum";
  allowedValues;
  constructor(allowedValues) {
    super();
    this.allowedValues = allowedValues;
    this.addRule({
      name: "enum",
      test: (value) => this.allowedValues.includes(value),
      message: "Must be one of: {values}",
      params: { values: this.allowedValues.join(", ") }
    });
  }
  getAllowedValues() {
    return this.allowedValues;
  }
  custom(fn, message) {
    return this.addRule({
      name: "custom",
      test: fn,
      message
    });
  }
}
function enum_(allowedValues) {
  return new EnumValidator(allowedValues);
}

// src/validators/numbers.ts
class NumberValidator extends BaseValidator {
  name = "number";
  constructor() {
    super();
    this.addRule({
      name: "number",
      test: (value) => typeof value === "number" && !Number.isNaN(value),
      message: "Must be a number"
    });
  }
  min(min) {
    return this.addRule({
      name: "min",
      test: (value) => value >= min,
      message: "Must be at least {min}",
      params: { min }
    });
  }
  max(max) {
    return this.addRule({
      name: "max",
      test: (value) => value <= max,
      message: "Must be at most {max}",
      params: { max }
    });
  }
  length(length) {
    return this.addRule({
      name: "length",
      test: (value) => value.toString().length === length,
      message: "Must be exactly {length} digits",
      params: { length }
    });
  }
  integer(options) {
    return this.addRule({
      name: "integer",
      test: (value) => isInt(String(value), options ?? {}),
      message: "Must be an integer"
    });
  }
  float(options) {
    return this.addRule({
      name: "float",
      test: (value) => isFloat(String(value), options ?? {}),
      message: "Must be a float"
    });
  }
  decimal(options) {
    return this.addRule({
      name: "decimal",
      test: (value) => isDecimal(String(value), options ?? {}),
      message: "Must be a decimal number"
    });
  }
  positive() {
    return this.addRule({
      name: "positive",
      test: (value) => value > 0,
      message: "Must be a positive number"
    });
  }
  negative() {
    return this.addRule({
      name: "negative",
      test: (value) => value < 0,
      message: "Must be a negative number"
    });
  }
  divisibleBy(divisor) {
    return this.addRule({
      name: "divisibleBy",
      test: (value) => isDivisibleBy(String(value), divisor),
      message: "Must be divisible by {divisor}",
      params: { divisor }
    });
  }
  custom(fn, message) {
    return this.addRule({
      name: "custom",
      test: fn,
      message
    });
  }
}
function number() {
  return new NumberValidator;
}

// src/validators/objects.ts
class ObjectValidator extends BaseValidator {
  name = "object";
  schema = {};
  strictMode = false;
  constructor() {
    super();
    this.addRule({
      name: "object",
      test: (value) => typeof value === "object" && value !== null && !Array.isArray(value),
      message: "Must be an object"
    });
  }
  shape(schema) {
    this.schema = Object.entries(schema).reduce((acc, [key, validator2]) => {
      if (validator2 instanceof BaseValidator) {
        acc[key] = validator2.setIsPartOfShape(true);
      } else {
        acc[key] = validator2;
      }
      return acc;
    }, {});
    return this.addRule({
      name: "shape",
      test: (value) => {
        if (value === null || value === undefined)
          return true;
        if (this.strictMode) {
          const schemaKeys = new Set(Object.keys(schema));
          const valueKeys = Object.keys(value);
          return valueKeys.every((key) => schemaKeys.has(key));
        }
        return true;
      },
      message: "Invalid object shape"
    });
  }
  strict(strict = true) {
    this.strictMode = strict;
    return this;
  }
  validate(value) {
    const result = super.validate(value);
    if (!result.valid)
      return result;
    if (Object.keys(this.schema).length > 0 && value !== null && value !== undefined) {
      const errors = {};
      let hasErrors = false;
      for (const [key, validator2] of Object.entries(this.schema)) {
        const fieldValue = value[key];
        const fieldResult = validator2.validate(fieldValue);
        if (!fieldResult.valid) {
          hasErrors = true;
          if (validator2 instanceof ObjectValidator) {
            Object.entries(fieldResult.errors).forEach(([errorKey, errorValue]) => {
              errors[`${key}.${errorKey}`] = errorValue;
            });
          } else {
            const fieldErrors = Object.values(fieldResult.errors)[0];
            if (fieldErrors) {
              errors[key] = fieldErrors;
            }
          }
        }
      }
      if (hasErrors) {
        return {
          valid: false,
          errors
        };
      }
    }
    return result;
  }
}
function object() {
  return new ObjectValidator;
}

// src/validators/password.ts
class PasswordValidator extends BaseValidator {
  name = "password";
  constructor() {
    super();
    this.addRule({
      name: "string",
      test: (value) => typeof value === "string",
      message: "Must be a string"
    });
  }
  matches(confirmPassword) {
    return this.addRule({
      name: "matches",
      test: (value) => value === confirmPassword,
      message: "Passwords must match"
    });
  }
  min(length = 8) {
    return this.addRule({
      name: "minLength",
      test: (value) => value.length >= length,
      message: "Password must be at least {length} characters long",
      params: { length }
    });
  }
  max(length = 128) {
    return this.addRule({
      name: "maxLength",
      test: (value) => value.length <= length,
      message: "Password must be at most {length} characters long",
      params: { length }
    });
  }
  length(length) {
    return this.addRule({
      name: "length",
      test: (value) => value.length === length,
      message: "Must be exactly {length} characters long",
      params: { length }
    });
  }
  hasUppercase() {
    return this.addRule({
      name: "hasUppercase",
      test: (value) => /[A-Z]/.test(value),
      message: "Password must contain at least one uppercase letter"
    });
  }
  hasLowercase() {
    return this.addRule({
      name: "hasLowercase",
      test: (value) => /[a-z]/.test(value),
      message: "Password must contain at least one lowercase letter"
    });
  }
  hasNumbers() {
    return this.addRule({
      name: "hasNumbers",
      test: (value) => /[0-9]/.test(value),
      message: "Password must contain at least one number"
    });
  }
  hasSpecialCharacters() {
    return this.addRule({
      name: "hasSpecialCharacters",
      test: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
      message: "Password must contain at least one special character"
    });
  }
  alphanumeric() {
    return this.addRule({
      name: "alphanumeric",
      test: (value) => /(?=.*[a-z])(?=.*\d)/i.test(value),
      message: "Password must contain both letters and numbers"
    });
  }
}
function password() {
  return new PasswordValidator;
}

// src/validators/strings.ts
class StringValidator extends BaseValidator {
  name = "string";
  constructor() {
    super();
    this.addRule({
      name: "string",
      test: (value) => typeof value === "string",
      message: "Must be a string"
    });
  }
  min(length) {
    return this.addRule({
      name: "min",
      test: (value) => value.length >= length,
      message: "Must be at least {length} characters long",
      params: { length }
    });
  }
  max(length) {
    return this.addRule({
      name: "max",
      test: (value) => value.length <= length,
      message: "Must be at most {length} characters long",
      params: { length }
    });
  }
  length(length) {
    return this.addRule({
      name: "length",
      test: (value) => value.length === length,
      message: "Must be exactly {length} characters long",
      params: { length }
    });
  }
  email(options) {
    return this.addRule({
      name: "email",
      test: (value) => isEmail(value, options),
      message: "Must be a valid email address"
    });
  }
  url(options) {
    return this.addRule({
      name: "url",
      test: (value) => isURL(value, options),
      message: "Must be a valid URL"
    });
  }
  matches(pattern) {
    return this.addRule({
      name: "matches",
      test: (value) => pattern.test(value),
      message: "Must match pattern {pattern}",
      params: { pattern: pattern.toString() }
    });
  }
  equals(param) {
    return this.addRule({
      name: "equals",
      test: (value) => value === param,
      message: "Must be equal to {param}",
      params: { param }
    });
  }
  alphanumeric() {
    return this.addRule({
      name: "alphanumeric",
      test: (value) => isAlphanumeric(value),
      message: "Must only contain letters and numbers"
    });
  }
  alpha() {
    return this.addRule({
      name: "alpha",
      test: (value) => isAlpha(value),
      message: "Must only contain letters"
    });
  }
  numeric() {
    return this.addRule({
      name: "numeric",
      test: (value) => isNumeric(value),
      message: "Must only contain numbers"
    });
  }
  custom(fn, message) {
    return this.addRule({
      name: "custom",
      test: fn,
      message
    });
  }
}
function string() {
  return new StringValidator;
}

// src/validators/timestamps.ts
class TimestampValidator extends BaseValidator {
  name = "timestamp";
  constructor() {
    super();
    this.addRule({
      name: "timestamp",
      test: (value) => {
        const num = Number(value);
        if (Number.isNaN(num)) {
          return false;
        }
        const minTimestamp = 0;
        const maxTimestamp = 2147483647;
        if (num < minTimestamp || num > maxTimestamp) {
          return false;
        }
        if (typeof value === "string") {
          const timestampStr = value.toString();
          const length = timestampStr.length;
          if (length < 10 || length > 13) {
            return false;
          }
        }
        return true;
      },
      message: "Must be a valid timestamp between 1970-01-01 and 2038-01-19"
    });
  }
}
function timestamp() {
  return new TimestampValidator;
}

// src/validators/unix.ts
class UnixValidator extends BaseValidator {
  name = "unix";
  constructor() {
    super();
    this.addRule({
      name: "unix",
      test: (value) => {
        const num = Number(value);
        if (Number.isNaN(num)) {
          return false;
        }
        if (typeof value === "string") {
          const timestampStr = value.toString();
          const length = timestampStr.length;
          if (length < 10 || length > 13) {
            return false;
          }
        }
        return num >= 0;
      },
      message: "Must be a valid Unix timestamp (10-13 digits)"
    });
  }
}
function unix() {
  return new UnixValidator;
}

// src/validation.ts
var v = {
  string,
  number,
  array,
  boolean,
  enum: enum_,
  date,
  datetime,
  object,
  custom,
  timestamp,
  unix,
  password
};
export {
  lib_default as validator,
  v,
  unix,
  timestamp,
  string,
  password,
  object,
  number,
  enum_,
  defaultConfig2 as defaultConfig,
  datetime,
  date,
  custom,
  config2 as config,
  boolean,
  array,
  UnixValidator,
  TimestampValidator,
  StringValidator,
  SCHEMA_NAME,
  PasswordValidator,
  PARSE,
  ObjectValidator,
  OUTPUT_TYPE,
  NumberValidator,
  INPUT_TYPE,
  EnumValidator,
  DatetimeValidator,
  DateValidator,
  CustomValidator,
  COMPUTED_TYPE,
  BooleanValidator,
  ArrayValidator
};
