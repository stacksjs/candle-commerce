import {
  __commonJS,
  __require
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/@smithy/types/dist-cjs/index.js
var require_dist_cjs = __commonJS((exports, module) => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var src_exports = {};
  __export(src_exports, {
    AlgorithmId: () => AlgorithmId,
    EndpointURLScheme: () => EndpointURLScheme,
    FieldPosition: () => FieldPosition,
    HttpApiKeyAuthLocation: () => HttpApiKeyAuthLocation,
    HttpAuthLocation: () => HttpAuthLocation,
    IniSectionType: () => IniSectionType,
    RequestHandlerProtocol: () => RequestHandlerProtocol,
    SMITHY_CONTEXT_KEY: () => SMITHY_CONTEXT_KEY,
    getDefaultClientConfiguration: () => getDefaultClientConfiguration,
    resolveDefaultRuntimeConfig: () => resolveDefaultRuntimeConfig
  });
  module.exports = __toCommonJS(src_exports);
  var HttpAuthLocation = /* @__PURE__ */ ((HttpAuthLocation2) => {
    HttpAuthLocation2["HEADER"] = "header";
    HttpAuthLocation2["QUERY"] = "query";
    return HttpAuthLocation2;
  })(HttpAuthLocation || {});
  var HttpApiKeyAuthLocation = /* @__PURE__ */ ((HttpApiKeyAuthLocation2) => {
    HttpApiKeyAuthLocation2["HEADER"] = "header";
    HttpApiKeyAuthLocation2["QUERY"] = "query";
    return HttpApiKeyAuthLocation2;
  })(HttpApiKeyAuthLocation || {});
  var EndpointURLScheme = /* @__PURE__ */ ((EndpointURLScheme2) => {
    EndpointURLScheme2["HTTP"] = "http";
    EndpointURLScheme2["HTTPS"] = "https";
    return EndpointURLScheme2;
  })(EndpointURLScheme || {});
  var AlgorithmId = /* @__PURE__ */ ((AlgorithmId2) => {
    AlgorithmId2["MD5"] = "md5";
    AlgorithmId2["CRC32"] = "crc32";
    AlgorithmId2["CRC32C"] = "crc32c";
    AlgorithmId2["SHA1"] = "sha1";
    AlgorithmId2["SHA256"] = "sha256";
    return AlgorithmId2;
  })(AlgorithmId || {});
  var getChecksumConfiguration = /* @__PURE__ */ __name((runtimeConfig) => {
    const checksumAlgorithms = [];
    if (runtimeConfig.sha256 !== undefined) {
      checksumAlgorithms.push({
        algorithmId: () => "sha256",
        checksumConstructor: () => runtimeConfig.sha256
      });
    }
    if (runtimeConfig.md5 != null) {
      checksumAlgorithms.push({
        algorithmId: () => "md5",
        checksumConstructor: () => runtimeConfig.md5
      });
    }
    return {
      addChecksumAlgorithm(algo) {
        checksumAlgorithms.push(algo);
      },
      checksumAlgorithms() {
        return checksumAlgorithms;
      }
    };
  }, "getChecksumConfiguration");
  var resolveChecksumRuntimeConfig = /* @__PURE__ */ __name((clientConfig) => {
    const runtimeConfig = {};
    clientConfig.checksumAlgorithms().forEach((checksumAlgorithm) => {
      runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
    });
    return runtimeConfig;
  }, "resolveChecksumRuntimeConfig");
  var getDefaultClientConfiguration = /* @__PURE__ */ __name((runtimeConfig) => {
    return getChecksumConfiguration(runtimeConfig);
  }, "getDefaultClientConfiguration");
  var resolveDefaultRuntimeConfig = /* @__PURE__ */ __name((config) => {
    return resolveChecksumRuntimeConfig(config);
  }, "resolveDefaultRuntimeConfig");
  var FieldPosition = /* @__PURE__ */ ((FieldPosition2) => {
    FieldPosition2[FieldPosition2["HEADER"] = 0] = "HEADER";
    FieldPosition2[FieldPosition2["TRAILER"] = 1] = "TRAILER";
    return FieldPosition2;
  })(FieldPosition || {});
  var SMITHY_CONTEXT_KEY = "__smithy_context";
  var IniSectionType = /* @__PURE__ */ ((IniSectionType2) => {
    IniSectionType2["PROFILE"] = "profile";
    IniSectionType2["SSO_SESSION"] = "sso-session";
    IniSectionType2["SERVICES"] = "services";
    return IniSectionType2;
  })(IniSectionType || {});
  var RequestHandlerProtocol = /* @__PURE__ */ ((RequestHandlerProtocol2) => {
    RequestHandlerProtocol2["HTTP_0_9"] = "http/0.9";
    RequestHandlerProtocol2["HTTP_1_0"] = "http/1.0";
    RequestHandlerProtocol2["TDS_8_0"] = "tds/8.0";
    return RequestHandlerProtocol2;
  })(RequestHandlerProtocol || {});
});

// ../../../../node_modules/@smithy/protocol-http/dist-cjs/index.js
var require_dist_cjs2 = __commonJS((exports, module) => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var src_exports = {};
  __export(src_exports, {
    Field: () => Field,
    Fields: () => Fields,
    HttpRequest: () => HttpRequest,
    HttpResponse: () => HttpResponse,
    IHttpRequest: () => import_types.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => getHttpHandlerExtensionConfiguration,
    isValidHostname: () => isValidHostname,
    resolveHttpHandlerRuntimeConfig: () => resolveHttpHandlerRuntimeConfig
  });
  module.exports = __toCommonJS(src_exports);
  var getHttpHandlerExtensionConfiguration = /* @__PURE__ */ __name((runtimeConfig) => {
    return {
      setHttpHandler(handler) {
        runtimeConfig.httpHandler = handler;
      },
      httpHandler() {
        return runtimeConfig.httpHandler;
      },
      updateHttpClientConfig(key, value) {
        runtimeConfig.httpHandler?.updateHttpClientConfig(key, value);
      },
      httpHandlerConfigs() {
        return runtimeConfig.httpHandler.httpHandlerConfigs();
      }
    };
  }, "getHttpHandlerExtensionConfiguration");
  var resolveHttpHandlerRuntimeConfig = /* @__PURE__ */ __name((httpHandlerExtensionConfiguration) => {
    return {
      httpHandler: httpHandlerExtensionConfiguration.httpHandler()
    };
  }, "resolveHttpHandlerRuntimeConfig");
  var import_types = require_dist_cjs();
  var Field = class {
    static {
      __name(this, "Field");
    }
    constructor({ name, kind = import_types.FieldPosition.HEADER, values = [] }) {
      this.name = name;
      this.kind = kind;
      this.values = values;
    }
    add(value) {
      this.values.push(value);
    }
    set(values) {
      this.values = values;
    }
    remove(value) {
      this.values = this.values.filter((v) => v !== value);
    }
    toString() {
      return this.values.map((v) => v.includes(",") || v.includes(" ") ? `"${v}"` : v).join(", ");
    }
    get() {
      return this.values;
    }
  };
  var Fields = class {
    constructor({ fields = [], encoding = "utf-8" }) {
      this.entries = {};
      fields.forEach(this.setField.bind(this));
      this.encoding = encoding;
    }
    static {
      __name(this, "Fields");
    }
    setField(field) {
      this.entries[field.name.toLowerCase()] = field;
    }
    getField(name) {
      return this.entries[name.toLowerCase()];
    }
    removeField(name) {
      delete this.entries[name.toLowerCase()];
    }
    getByType(kind) {
      return Object.values(this.entries).filter((field) => field.kind === kind);
    }
  };
  var HttpRequest = class _HttpRequest {
    static {
      __name(this, "HttpRequest");
    }
    constructor(options) {
      this.method = options.method || "GET";
      this.hostname = options.hostname || "localhost";
      this.port = options.port;
      this.query = options.query || {};
      this.headers = options.headers || {};
      this.body = options.body;
      this.protocol = options.protocol ? options.protocol.slice(-1) !== ":" ? `${options.protocol}:` : options.protocol : "https:";
      this.path = options.path ? options.path.charAt(0) !== "/" ? `/${options.path}` : options.path : "/";
      this.username = options.username;
      this.password = options.password;
      this.fragment = options.fragment;
    }
    static clone(request) {
      const cloned = new _HttpRequest({
        ...request,
        headers: { ...request.headers }
      });
      if (cloned.query) {
        cloned.query = cloneQuery(cloned.query);
      }
      return cloned;
    }
    static isInstance(request) {
      if (!request) {
        return false;
      }
      const req = request;
      return "method" in req && "protocol" in req && "hostname" in req && "path" in req && typeof req["query"] === "object" && typeof req["headers"] === "object";
    }
    clone() {
      return _HttpRequest.clone(this);
    }
  };
  function cloneQuery(query) {
    return Object.keys(query).reduce((carry, paramName) => {
      const param = query[paramName];
      return {
        ...carry,
        [paramName]: Array.isArray(param) ? [...param] : param
      };
    }, {});
  }
  __name(cloneQuery, "cloneQuery");
  var HttpResponse = class {
    static {
      __name(this, "HttpResponse");
    }
    constructor(options) {
      this.statusCode = options.statusCode;
      this.reason = options.reason;
      this.headers = options.headers || {};
      this.body = options.body;
    }
    static isInstance(response) {
      if (!response)
        return false;
      const resp = response;
      return typeof resp.statusCode === "number" && typeof resp.headers === "object";
    }
  };
  function isValidHostname(hostname) {
    const hostPattern = /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/;
    return hostPattern.test(hostname);
  }
  __name(isValidHostname, "isValidHostname");
});

// ../../../../node_modules/@smithy/util-middleware/dist-cjs/index.js
var require_dist_cjs3 = __commonJS((exports, module) => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var src_exports = {};
  __export(src_exports, {
    getSmithyContext: () => getSmithyContext,
    normalizeProvider: () => normalizeProvider
  });
  module.exports = __toCommonJS(src_exports);
  var import_types = require_dist_cjs();
  var getSmithyContext = /* @__PURE__ */ __name((context) => context[import_types.SMITHY_CONTEXT_KEY] || (context[import_types.SMITHY_CONTEXT_KEY] = {}), "getSmithyContext");
  var normalizeProvider = /* @__PURE__ */ __name((input) => {
    if (typeof input === "function")
      return input;
    const promisified = Promise.resolve(input);
    return () => promisified;
  }, "normalizeProvider");
});

// ../../../../node_modules/@smithy/util-uri-escape/dist-cjs/index.js
var require_dist_cjs4 = __commonJS((exports, module) => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var src_exports = {};
  __export(src_exports, {
    escapeUri: () => escapeUri,
    escapeUriPath: () => escapeUriPath
  });
  module.exports = __toCommonJS(src_exports);
  var escapeUri = /* @__PURE__ */ __name((uri) => encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode), "escapeUri");
  var hexEncode = /* @__PURE__ */ __name((c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode");
  var escapeUriPath = /* @__PURE__ */ __name((uri) => uri.split("/").map(escapeUri).join("/"), "escapeUriPath");
});

// ../../../../node_modules/@smithy/querystring-builder/dist-cjs/index.js
var require_dist_cjs5 = __commonJS((exports, module) => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var src_exports = {};
  __export(src_exports, {
    buildQueryString: () => buildQueryString
  });
  module.exports = __toCommonJS(src_exports);
  var import_util_uri_escape = require_dist_cjs4();
  function buildQueryString(query) {
    const parts = [];
    for (let key of Object.keys(query).sort()) {
      const value = query[key];
      key = (0, import_util_uri_escape.escapeUri)(key);
      if (Array.isArray(value)) {
        for (let i = 0, iLen = value.length;i < iLen; i++) {
          parts.push(`${key}=${(0, import_util_uri_escape.escapeUri)(value[i])}`);
        }
      } else {
        let qsEntry = key;
        if (value || typeof value === "string") {
          qsEntry += `=${(0, import_util_uri_escape.escapeUri)(value)}`;
        }
        parts.push(qsEntry);
      }
    }
    return parts.join("&");
  }
  __name(buildQueryString, "buildQueryString");
});

// ../../../../node_modules/@smithy/node-http-handler/dist-cjs/index.js
var require_dist_cjs6 = __commonJS((exports, module) => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var src_exports = {};
  __export(src_exports, {
    DEFAULT_REQUEST_TIMEOUT: () => DEFAULT_REQUEST_TIMEOUT,
    NodeHttp2Handler: () => NodeHttp2Handler,
    NodeHttpHandler: () => NodeHttpHandler,
    streamCollector: () => streamCollector
  });
  module.exports = __toCommonJS(src_exports);
  var import_protocol_http = require_dist_cjs2();
  var import_querystring_builder = require_dist_cjs5();
  var import_http = __require("http");
  var import_https = __require("https");
  var NODEJS_TIMEOUT_ERROR_CODES = ["ECONNRESET", "EPIPE", "ETIMEDOUT"];
  var getTransformedHeaders = /* @__PURE__ */ __name((headers) => {
    const transformedHeaders = {};
    for (const name of Object.keys(headers)) {
      const headerValues = headers[name];
      transformedHeaders[name] = Array.isArray(headerValues) ? headerValues.join(",") : headerValues;
    }
    return transformedHeaders;
  }, "getTransformedHeaders");
  var timing = {
    setTimeout: (cb, ms) => setTimeout(cb, ms),
    clearTimeout: (timeoutId) => clearTimeout(timeoutId)
  };
  var DEFER_EVENT_LISTENER_TIME = 1000;
  var setConnectionTimeout = /* @__PURE__ */ __name((request, reject, timeoutInMs = 0) => {
    if (!timeoutInMs) {
      return -1;
    }
    const registerTimeout = /* @__PURE__ */ __name((offset) => {
      const timeoutId = timing.setTimeout(() => {
        request.destroy();
        reject(Object.assign(new Error(`Socket timed out without establishing a connection within ${timeoutInMs} ms`), {
          name: "TimeoutError"
        }));
      }, timeoutInMs - offset);
      const doWithSocket = /* @__PURE__ */ __name((socket) => {
        if (socket?.connecting) {
          socket.on("connect", () => {
            timing.clearTimeout(timeoutId);
          });
        } else {
          timing.clearTimeout(timeoutId);
        }
      }, "doWithSocket");
      if (request.socket) {
        doWithSocket(request.socket);
      } else {
        request.on("socket", doWithSocket);
      }
    }, "registerTimeout");
    if (timeoutInMs < 2000) {
      registerTimeout(0);
      return 0;
    }
    return timing.setTimeout(registerTimeout.bind(null, DEFER_EVENT_LISTENER_TIME), DEFER_EVENT_LISTENER_TIME);
  }, "setConnectionTimeout");
  var DEFER_EVENT_LISTENER_TIME2 = 3000;
  var setSocketKeepAlive = /* @__PURE__ */ __name((request, { keepAlive, keepAliveMsecs }, deferTimeMs = DEFER_EVENT_LISTENER_TIME2) => {
    if (keepAlive !== true) {
      return -1;
    }
    const registerListener = /* @__PURE__ */ __name(() => {
      if (request.socket) {
        request.socket.setKeepAlive(keepAlive, keepAliveMsecs || 0);
      } else {
        request.on("socket", (socket) => {
          socket.setKeepAlive(keepAlive, keepAliveMsecs || 0);
        });
      }
    }, "registerListener");
    if (deferTimeMs === 0) {
      registerListener();
      return 0;
    }
    return timing.setTimeout(registerListener, deferTimeMs);
  }, "setSocketKeepAlive");
  var DEFER_EVENT_LISTENER_TIME3 = 3000;
  var setSocketTimeout = /* @__PURE__ */ __name((request, reject, timeoutInMs = DEFAULT_REQUEST_TIMEOUT) => {
    const registerTimeout = /* @__PURE__ */ __name((offset) => {
      const timeout = timeoutInMs - offset;
      const onTimeout = /* @__PURE__ */ __name(() => {
        request.destroy();
        reject(Object.assign(new Error(`Connection timed out after ${timeoutInMs} ms`), { name: "TimeoutError" }));
      }, "onTimeout");
      if (request.socket) {
        request.socket.setTimeout(timeout, onTimeout);
        request.on("close", () => request.socket?.removeListener("timeout", onTimeout));
      } else {
        request.setTimeout(timeout, onTimeout);
      }
    }, "registerTimeout");
    if (0 < timeoutInMs && timeoutInMs < 6000) {
      registerTimeout(0);
      return 0;
    }
    return timing.setTimeout(registerTimeout.bind(null, timeoutInMs === 0 ? 0 : DEFER_EVENT_LISTENER_TIME3), DEFER_EVENT_LISTENER_TIME3);
  }, "setSocketTimeout");
  var import_stream = __require("stream");
  var MIN_WAIT_TIME = 6000;
  async function writeRequestBody(httpRequest, request, maxContinueTimeoutMs = MIN_WAIT_TIME) {
    const headers = request.headers ?? {};
    const expect = headers["Expect"] || headers["expect"];
    let timeoutId = -1;
    let sendBody = true;
    if (expect === "100-continue") {
      sendBody = await Promise.race([
        new Promise((resolve) => {
          timeoutId = Number(timing.setTimeout(() => resolve(true), Math.max(MIN_WAIT_TIME, maxContinueTimeoutMs)));
        }),
        new Promise((resolve) => {
          httpRequest.on("continue", () => {
            timing.clearTimeout(timeoutId);
            resolve(true);
          });
          httpRequest.on("response", () => {
            timing.clearTimeout(timeoutId);
            resolve(false);
          });
          httpRequest.on("error", () => {
            timing.clearTimeout(timeoutId);
            resolve(false);
          });
        })
      ]);
    }
    if (sendBody) {
      writeBody(httpRequest, request.body);
    }
  }
  __name(writeRequestBody, "writeRequestBody");
  function writeBody(httpRequest, body) {
    if (body instanceof import_stream.Readable) {
      body.pipe(httpRequest);
      return;
    }
    if (body) {
      if (Buffer.isBuffer(body) || typeof body === "string") {
        httpRequest.end(body);
        return;
      }
      const uint8 = body;
      if (typeof uint8 === "object" && uint8.buffer && typeof uint8.byteOffset === "number" && typeof uint8.byteLength === "number") {
        httpRequest.end(Buffer.from(uint8.buffer, uint8.byteOffset, uint8.byteLength));
        return;
      }
      httpRequest.end(Buffer.from(body));
      return;
    }
    httpRequest.end();
  }
  __name(writeBody, "writeBody");
  var DEFAULT_REQUEST_TIMEOUT = 0;
  var NodeHttpHandler = class _NodeHttpHandler {
    constructor(options) {
      this.socketWarningTimestamp = 0;
      this.metadata = { handlerProtocol: "http/1.1" };
      this.configProvider = new Promise((resolve, reject) => {
        if (typeof options === "function") {
          options().then((_options) => {
            resolve(this.resolveDefaultConfig(_options));
          }).catch(reject);
        } else {
          resolve(this.resolveDefaultConfig(options));
        }
      });
    }
    static {
      __name(this, "NodeHttpHandler");
    }
    static create(instanceOrOptions) {
      if (typeof instanceOrOptions?.handle === "function") {
        return instanceOrOptions;
      }
      return new _NodeHttpHandler(instanceOrOptions);
    }
    static checkSocketUsage(agent, socketWarningTimestamp, logger = console) {
      const { sockets, requests, maxSockets } = agent;
      if (typeof maxSockets !== "number" || maxSockets === Infinity) {
        return socketWarningTimestamp;
      }
      const interval = 15000;
      if (Date.now() - interval < socketWarningTimestamp) {
        return socketWarningTimestamp;
      }
      if (sockets && requests) {
        for (const origin in sockets) {
          const socketsInUse = sockets[origin]?.length ?? 0;
          const requestsEnqueued = requests[origin]?.length ?? 0;
          if (socketsInUse >= maxSockets && requestsEnqueued >= 2 * maxSockets) {
            logger?.warn?.(`@smithy/node-http-handler:WARN - socket usage at capacity=${socketsInUse} and ${requestsEnqueued} additional requests are enqueued.
See https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-configuring-maxsockets.html
or increase socketAcquisitionWarningTimeout=(millis) in the NodeHttpHandler config.`);
            return Date.now();
          }
        }
      }
      return socketWarningTimestamp;
    }
    resolveDefaultConfig(options) {
      const { requestTimeout, connectionTimeout, socketTimeout, socketAcquisitionWarningTimeout, httpAgent, httpsAgent } = options || {};
      const keepAlive = true;
      const maxSockets = 50;
      return {
        connectionTimeout,
        requestTimeout: requestTimeout ?? socketTimeout,
        socketAcquisitionWarningTimeout,
        httpAgent: (() => {
          if (httpAgent instanceof import_http.Agent || typeof httpAgent?.destroy === "function") {
            return httpAgent;
          }
          return new import_http.Agent({ keepAlive, maxSockets, ...httpAgent });
        })(),
        httpsAgent: (() => {
          if (httpsAgent instanceof import_https.Agent || typeof httpsAgent?.destroy === "function") {
            return httpsAgent;
          }
          return new import_https.Agent({ keepAlive, maxSockets, ...httpsAgent });
        })(),
        logger: console
      };
    }
    destroy() {
      this.config?.httpAgent?.destroy();
      this.config?.httpsAgent?.destroy();
    }
    async handle(request, { abortSignal } = {}) {
      if (!this.config) {
        this.config = await this.configProvider;
      }
      return new Promise((_resolve, _reject) => {
        let writeRequestBodyPromise = undefined;
        const timeouts = [];
        const resolve = /* @__PURE__ */ __name(async (arg) => {
          await writeRequestBodyPromise;
          timeouts.forEach(timing.clearTimeout);
          _resolve(arg);
        }, "resolve");
        const reject = /* @__PURE__ */ __name(async (arg) => {
          await writeRequestBodyPromise;
          timeouts.forEach(timing.clearTimeout);
          _reject(arg);
        }, "reject");
        if (!this.config) {
          throw new Error("Node HTTP request handler config is not resolved");
        }
        if (abortSignal?.aborted) {
          const abortError = new Error("Request aborted");
          abortError.name = "AbortError";
          reject(abortError);
          return;
        }
        const isSSL = request.protocol === "https:";
        const agent = isSSL ? this.config.httpsAgent : this.config.httpAgent;
        timeouts.push(timing.setTimeout(() => {
          this.socketWarningTimestamp = _NodeHttpHandler.checkSocketUsage(agent, this.socketWarningTimestamp, this.config.logger);
        }, this.config.socketAcquisitionWarningTimeout ?? (this.config.requestTimeout ?? 2000) + (this.config.connectionTimeout ?? 1000)));
        const queryString = (0, import_querystring_builder.buildQueryString)(request.query || {});
        let auth = undefined;
        if (request.username != null || request.password != null) {
          const username = request.username ?? "";
          const password = request.password ?? "";
          auth = `${username}:${password}`;
        }
        let path = request.path;
        if (queryString) {
          path += `?${queryString}`;
        }
        if (request.fragment) {
          path += `#${request.fragment}`;
        }
        let hostname = request.hostname ?? "";
        if (hostname[0] === "[" && hostname.endsWith("]")) {
          hostname = request.hostname.slice(1, -1);
        } else {
          hostname = request.hostname;
        }
        const nodeHttpsOptions = {
          headers: request.headers,
          host: hostname,
          method: request.method,
          path,
          port: request.port,
          agent,
          auth
        };
        const requestFunc = isSSL ? import_https.request : import_http.request;
        const req = requestFunc(nodeHttpsOptions, (res) => {
          const httpResponse = new import_protocol_http.HttpResponse({
            statusCode: res.statusCode || -1,
            reason: res.statusMessage,
            headers: getTransformedHeaders(res.headers),
            body: res
          });
          resolve({ response: httpResponse });
        });
        req.on("error", (err) => {
          if (NODEJS_TIMEOUT_ERROR_CODES.includes(err.code)) {
            reject(Object.assign(err, { name: "TimeoutError" }));
          } else {
            reject(err);
          }
        });
        if (abortSignal) {
          const onAbort = /* @__PURE__ */ __name(() => {
            req.destroy();
            const abortError = new Error("Request aborted");
            abortError.name = "AbortError";
            reject(abortError);
          }, "onAbort");
          if (typeof abortSignal.addEventListener === "function") {
            const signal = abortSignal;
            signal.addEventListener("abort", onAbort, { once: true });
            req.once("close", () => signal.removeEventListener("abort", onAbort));
          } else {
            abortSignal.onabort = onAbort;
          }
        }
        timeouts.push(setConnectionTimeout(req, reject, this.config.connectionTimeout));
        timeouts.push(setSocketTimeout(req, reject, this.config.requestTimeout));
        const httpAgent = nodeHttpsOptions.agent;
        if (typeof httpAgent === "object" && "keepAlive" in httpAgent) {
          timeouts.push(setSocketKeepAlive(req, {
            keepAlive: httpAgent.keepAlive,
            keepAliveMsecs: httpAgent.keepAliveMsecs
          }));
        }
        writeRequestBodyPromise = writeRequestBody(req, request, this.config.requestTimeout).catch((e) => {
          timeouts.forEach(timing.clearTimeout);
          return _reject(e);
        });
      });
    }
    updateHttpClientConfig(key, value) {
      this.config = undefined;
      this.configProvider = this.configProvider.then((config) => {
        return {
          ...config,
          [key]: value
        };
      });
    }
    httpHandlerConfigs() {
      return this.config ?? {};
    }
  };
  var import_http22 = __require("http2");
  var import_http2 = __toESM(__require("http2"));
  var NodeHttp2ConnectionPool = class {
    constructor(sessions) {
      this.sessions = [];
      this.sessions = sessions ?? [];
    }
    static {
      __name(this, "NodeHttp2ConnectionPool");
    }
    poll() {
      if (this.sessions.length > 0) {
        return this.sessions.shift();
      }
    }
    offerLast(session) {
      this.sessions.push(session);
    }
    contains(session) {
      return this.sessions.includes(session);
    }
    remove(session) {
      this.sessions = this.sessions.filter((s) => s !== session);
    }
    [Symbol.iterator]() {
      return this.sessions[Symbol.iterator]();
    }
    destroy(connection) {
      for (const session of this.sessions) {
        if (session === connection) {
          if (!session.destroyed) {
            session.destroy();
          }
        }
      }
    }
  };
  var NodeHttp2ConnectionManager = class {
    constructor(config) {
      this.sessionCache = /* @__PURE__ */ new Map;
      this.config = config;
      if (this.config.maxConcurrency && this.config.maxConcurrency <= 0) {
        throw new RangeError("maxConcurrency must be greater than zero.");
      }
    }
    static {
      __name(this, "NodeHttp2ConnectionManager");
    }
    lease(requestContext, connectionConfiguration) {
      const url = this.getUrlString(requestContext);
      const existingPool = this.sessionCache.get(url);
      if (existingPool) {
        const existingSession = existingPool.poll();
        if (existingSession && !this.config.disableConcurrency) {
          return existingSession;
        }
      }
      const session = import_http2.default.connect(url);
      if (this.config.maxConcurrency) {
        session.settings({ maxConcurrentStreams: this.config.maxConcurrency }, (err) => {
          if (err) {
            throw new Error("Fail to set maxConcurrentStreams to " + this.config.maxConcurrency + "when creating new session for " + requestContext.destination.toString());
          }
        });
      }
      session.unref();
      const destroySessionCb = /* @__PURE__ */ __name(() => {
        session.destroy();
        this.deleteSession(url, session);
      }, "destroySessionCb");
      session.on("goaway", destroySessionCb);
      session.on("error", destroySessionCb);
      session.on("frameError", destroySessionCb);
      session.on("close", () => this.deleteSession(url, session));
      if (connectionConfiguration.requestTimeout) {
        session.setTimeout(connectionConfiguration.requestTimeout, destroySessionCb);
      }
      const connectionPool = this.sessionCache.get(url) || new NodeHttp2ConnectionPool;
      connectionPool.offerLast(session);
      this.sessionCache.set(url, connectionPool);
      return session;
    }
    deleteSession(authority, session) {
      const existingConnectionPool = this.sessionCache.get(authority);
      if (!existingConnectionPool) {
        return;
      }
      if (!existingConnectionPool.contains(session)) {
        return;
      }
      existingConnectionPool.remove(session);
      this.sessionCache.set(authority, existingConnectionPool);
    }
    release(requestContext, session) {
      const cacheKey = this.getUrlString(requestContext);
      this.sessionCache.get(cacheKey)?.offerLast(session);
    }
    destroy() {
      for (const [key, connectionPool] of this.sessionCache) {
        for (const session of connectionPool) {
          if (!session.destroyed) {
            session.destroy();
          }
          connectionPool.remove(session);
        }
        this.sessionCache.delete(key);
      }
    }
    setMaxConcurrentStreams(maxConcurrentStreams) {
      if (maxConcurrentStreams && maxConcurrentStreams <= 0) {
        throw new RangeError("maxConcurrentStreams must be greater than zero.");
      }
      this.config.maxConcurrency = maxConcurrentStreams;
    }
    setDisableConcurrentStreams(disableConcurrentStreams) {
      this.config.disableConcurrency = disableConcurrentStreams;
    }
    getUrlString(request) {
      return request.destination.toString();
    }
  };
  var NodeHttp2Handler = class _NodeHttp2Handler {
    constructor(options) {
      this.metadata = { handlerProtocol: "h2" };
      this.connectionManager = new NodeHttp2ConnectionManager({});
      this.configProvider = new Promise((resolve, reject) => {
        if (typeof options === "function") {
          options().then((opts) => {
            resolve(opts || {});
          }).catch(reject);
        } else {
          resolve(options || {});
        }
      });
    }
    static {
      __name(this, "NodeHttp2Handler");
    }
    static create(instanceOrOptions) {
      if (typeof instanceOrOptions?.handle === "function") {
        return instanceOrOptions;
      }
      return new _NodeHttp2Handler(instanceOrOptions);
    }
    destroy() {
      this.connectionManager.destroy();
    }
    async handle(request, { abortSignal } = {}) {
      if (!this.config) {
        this.config = await this.configProvider;
        this.connectionManager.setDisableConcurrentStreams(this.config.disableConcurrentStreams || false);
        if (this.config.maxConcurrentStreams) {
          this.connectionManager.setMaxConcurrentStreams(this.config.maxConcurrentStreams);
        }
      }
      const { requestTimeout, disableConcurrentStreams } = this.config;
      return new Promise((_resolve, _reject) => {
        let fulfilled = false;
        let writeRequestBodyPromise = undefined;
        const resolve = /* @__PURE__ */ __name(async (arg) => {
          await writeRequestBodyPromise;
          _resolve(arg);
        }, "resolve");
        const reject = /* @__PURE__ */ __name(async (arg) => {
          await writeRequestBodyPromise;
          _reject(arg);
        }, "reject");
        if (abortSignal?.aborted) {
          fulfilled = true;
          const abortError = new Error("Request aborted");
          abortError.name = "AbortError";
          reject(abortError);
          return;
        }
        const { hostname, method, port, protocol, query } = request;
        let auth = "";
        if (request.username != null || request.password != null) {
          const username = request.username ?? "";
          const password = request.password ?? "";
          auth = `${username}:${password}@`;
        }
        const authority = `${protocol}//${auth}${hostname}${port ? `:${port}` : ""}`;
        const requestContext = { destination: new URL(authority) };
        const session = this.connectionManager.lease(requestContext, {
          requestTimeout: this.config?.sessionTimeout,
          disableConcurrentStreams: disableConcurrentStreams || false
        });
        const rejectWithDestroy = /* @__PURE__ */ __name((err) => {
          if (disableConcurrentStreams) {
            this.destroySession(session);
          }
          fulfilled = true;
          reject(err);
        }, "rejectWithDestroy");
        const queryString = (0, import_querystring_builder.buildQueryString)(query || {});
        let path = request.path;
        if (queryString) {
          path += `?${queryString}`;
        }
        if (request.fragment) {
          path += `#${request.fragment}`;
        }
        const req = session.request({
          ...request.headers,
          [import_http22.constants.HTTP2_HEADER_PATH]: path,
          [import_http22.constants.HTTP2_HEADER_METHOD]: method
        });
        session.ref();
        req.on("response", (headers) => {
          const httpResponse = new import_protocol_http.HttpResponse({
            statusCode: headers[":status"] || -1,
            headers: getTransformedHeaders(headers),
            body: req
          });
          fulfilled = true;
          resolve({ response: httpResponse });
          if (disableConcurrentStreams) {
            session.close();
            this.connectionManager.deleteSession(authority, session);
          }
        });
        if (requestTimeout) {
          req.setTimeout(requestTimeout, () => {
            req.close();
            const timeoutError = new Error(`Stream timed out because of no activity for ${requestTimeout} ms`);
            timeoutError.name = "TimeoutError";
            rejectWithDestroy(timeoutError);
          });
        }
        if (abortSignal) {
          const onAbort = /* @__PURE__ */ __name(() => {
            req.close();
            const abortError = new Error("Request aborted");
            abortError.name = "AbortError";
            rejectWithDestroy(abortError);
          }, "onAbort");
          if (typeof abortSignal.addEventListener === "function") {
            const signal = abortSignal;
            signal.addEventListener("abort", onAbort, { once: true });
            req.once("close", () => signal.removeEventListener("abort", onAbort));
          } else {
            abortSignal.onabort = onAbort;
          }
        }
        req.on("frameError", (type, code, id) => {
          rejectWithDestroy(new Error(`Frame type id ${type} in stream id ${id} has failed with code ${code}.`));
        });
        req.on("error", rejectWithDestroy);
        req.on("aborted", () => {
          rejectWithDestroy(new Error(`HTTP/2 stream is abnormally aborted in mid-communication with result code ${req.rstCode}.`));
        });
        req.on("close", () => {
          session.unref();
          if (disableConcurrentStreams) {
            session.destroy();
          }
          if (!fulfilled) {
            rejectWithDestroy(new Error("Unexpected error: http2 request did not get a response"));
          }
        });
        writeRequestBodyPromise = writeRequestBody(req, request, requestTimeout);
      });
    }
    updateHttpClientConfig(key, value) {
      this.config = undefined;
      this.configProvider = this.configProvider.then((config) => {
        return {
          ...config,
          [key]: value
        };
      });
    }
    httpHandlerConfigs() {
      return this.config ?? {};
    }
    destroySession(session) {
      if (!session.destroyed) {
        session.destroy();
      }
    }
  };
  var Collector = class extends import_stream.Writable {
    constructor() {
      super(...arguments);
      this.bufferedBytes = [];
    }
    static {
      __name(this, "Collector");
    }
    _write(chunk, encoding, callback) {
      this.bufferedBytes.push(chunk);
      callback();
    }
  };
  var streamCollector = /* @__PURE__ */ __name((stream) => {
    if (isReadableStreamInstance(stream)) {
      return collectReadableStream(stream);
    }
    return new Promise((resolve, reject) => {
      const collector = new Collector;
      stream.pipe(collector);
      stream.on("error", (err) => {
        collector.end();
        reject(err);
      });
      collector.on("error", reject);
      collector.on("finish", function() {
        const bytes = new Uint8Array(Buffer.concat(this.bufferedBytes));
        resolve(bytes);
      });
    });
  }, "streamCollector");
  var isReadableStreamInstance = /* @__PURE__ */ __name((stream) => typeof ReadableStream === "function" && stream instanceof ReadableStream, "isReadableStreamInstance");
  async function collectReadableStream(stream) {
    const chunks = [];
    const reader = stream.getReader();
    let isDone = false;
    let length = 0;
    while (!isDone) {
      const { done, value } = await reader.read();
      if (value) {
        chunks.push(value);
        length += value.length;
      }
      isDone = done;
    }
    const collected = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
      collected.set(chunk, offset);
      offset += chunk.length;
    }
    return collected;
  }
  __name(collectReadableStream, "collectReadableStream");
});

// ../../../../node_modules/@smithy/core/dist-cjs/submodules/schema/index.js
var require_schema = __commonJS((exports, module) => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var schema_exports = {};
  __export(schema_exports, {
    ErrorSchema: () => ErrorSchema,
    ListSchema: () => ListSchema,
    MapSchema: () => MapSchema,
    NormalizedSchema: () => NormalizedSchema,
    OperationSchema: () => OperationSchema,
    SCHEMA: () => SCHEMA,
    Schema: () => Schema,
    SimpleSchema: () => SimpleSchema,
    StructureSchema: () => StructureSchema,
    TypeRegistry: () => TypeRegistry,
    deref: () => deref,
    deserializerMiddlewareOption: () => deserializerMiddlewareOption,
    error: () => error,
    getSchemaSerdePlugin: () => getSchemaSerdePlugin,
    list: () => list,
    map: () => map,
    op: () => op,
    serializerMiddlewareOption: () => serializerMiddlewareOption,
    sim: () => sim,
    struct: () => struct
  });
  module.exports = __toCommonJS(schema_exports);
  var deref = (schemaRef) => {
    if (typeof schemaRef === "function") {
      return schemaRef();
    }
    return schemaRef;
  };
  var import_protocol_http = require_dist_cjs2();
  var import_util_middleware = require_dist_cjs3();
  var schemaDeserializationMiddleware = (config) => (next, context) => async (args) => {
    const { response } = await next(args);
    const { operationSchema } = (0, import_util_middleware.getSmithyContext)(context);
    try {
      const parsed = await config.protocol.deserializeResponse(operationSchema, {
        ...config,
        ...context
      }, response);
      return {
        response,
        output: parsed
      };
    } catch (error2) {
      Object.defineProperty(error2, "$response", {
        value: response
      });
      if (!("$metadata" in error2)) {
        const hint = `Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`;
        try {
          error2.message += `
  ` + hint;
        } catch (e) {
          if (!context.logger || context.logger?.constructor?.name === "NoOpLogger") {
            console.warn(hint);
          } else {
            context.logger?.warn?.(hint);
          }
        }
        if (typeof error2.$responseBodyText !== "undefined") {
          if (error2.$response) {
            error2.$response.body = error2.$responseBodyText;
          }
        }
        try {
          if (import_protocol_http.HttpResponse.isInstance(response)) {
            const { headers = {} } = response;
            const headerEntries = Object.entries(headers);
            error2.$metadata = {
              httpStatusCode: response.statusCode,
              requestId: findHeader(/^x-[\w-]+-request-?id$/, headerEntries),
              extendedRequestId: findHeader(/^x-[\w-]+-id-2$/, headerEntries),
              cfId: findHeader(/^x-[\w-]+-cf-id$/, headerEntries)
            };
          }
        } catch (e) {}
      }
      throw error2;
    }
  };
  var findHeader = (pattern, headers) => {
    return (headers.find(([k]) => {
      return k.match(pattern);
    }) || [undefined, undefined])[1];
  };
  var import_util_middleware2 = require_dist_cjs3();
  var schemaSerializationMiddleware = (config) => (next, context) => async (args) => {
    const { operationSchema } = (0, import_util_middleware2.getSmithyContext)(context);
    const endpoint = context.endpointV2?.url && config.urlParser ? async () => config.urlParser(context.endpointV2.url) : config.endpoint;
    const request = await config.protocol.serializeRequest(operationSchema, args.input, {
      ...config,
      ...context,
      endpoint
    });
    return next({
      ...args,
      request
    });
  };
  var deserializerMiddlewareOption = {
    name: "deserializerMiddleware",
    step: "deserialize",
    tags: ["DESERIALIZER"],
    override: true
  };
  var serializerMiddlewareOption = {
    name: "serializerMiddleware",
    step: "serialize",
    tags: ["SERIALIZER"],
    override: true
  };
  function getSchemaSerdePlugin(config) {
    return {
      applyToStack: (commandStack) => {
        commandStack.add(schemaSerializationMiddleware(config), serializerMiddlewareOption);
        commandStack.add(schemaDeserializationMiddleware(config), deserializerMiddlewareOption);
        config.protocol.setSerdeContext(config);
      }
    };
  }
  var TypeRegistry = class _TypeRegistry {
    constructor(namespace, schemas = /* @__PURE__ */ new Map) {
      this.namespace = namespace;
      this.schemas = schemas;
    }
    static {
      this.registries = /* @__PURE__ */ new Map;
    }
    static for(namespace) {
      if (!_TypeRegistry.registries.has(namespace)) {
        _TypeRegistry.registries.set(namespace, new _TypeRegistry(namespace));
      }
      return _TypeRegistry.registries.get(namespace);
    }
    register(shapeId, schema) {
      const qualifiedName = this.normalizeShapeId(shapeId);
      const registry = _TypeRegistry.for(this.getNamespace(shapeId));
      registry.schemas.set(qualifiedName, schema);
    }
    getSchema(shapeId) {
      const id = this.normalizeShapeId(shapeId);
      if (!this.schemas.has(id)) {
        throw new Error(`@smithy/core/schema - schema not found for ${id}`);
      }
      return this.schemas.get(id);
    }
    getBaseException() {
      for (const [id, schema] of this.schemas.entries()) {
        if (id.startsWith("smithy.ts.sdk.synthetic.") && id.endsWith("ServiceException")) {
          return schema;
        }
      }
      return;
    }
    find(predicate) {
      return [...this.schemas.values()].find(predicate);
    }
    destroy() {
      _TypeRegistry.registries.delete(this.namespace);
      this.schemas.clear();
    }
    normalizeShapeId(shapeId) {
      if (shapeId.includes("#")) {
        return shapeId;
      }
      return this.namespace + "#" + shapeId;
    }
    getNamespace(shapeId) {
      return this.normalizeShapeId(shapeId).split("#")[0];
    }
  };
  var Schema = class {
    constructor(name, traits) {
      this.name = name;
      this.traits = traits;
    }
  };
  var ListSchema = class extends Schema {
    constructor(name, traits, valueSchema) {
      super(name, traits);
      this.name = name;
      this.traits = traits;
      this.valueSchema = valueSchema;
    }
  };
  function list(namespace, name, traits = {}, valueSchema) {
    const schema = new ListSchema(namespace + "#" + name, traits, typeof valueSchema === "function" ? valueSchema() : valueSchema);
    TypeRegistry.for(namespace).register(name, schema);
    return schema;
  }
  var MapSchema = class extends Schema {
    constructor(name, traits, keySchema, valueSchema) {
      super(name, traits);
      this.name = name;
      this.traits = traits;
      this.keySchema = keySchema;
      this.valueSchema = valueSchema;
    }
  };
  function map(namespace, name, traits = {}, keySchema, valueSchema) {
    const schema = new MapSchema(namespace + "#" + name, traits, keySchema, typeof valueSchema === "function" ? valueSchema() : valueSchema);
    TypeRegistry.for(namespace).register(name, schema);
    return schema;
  }
  var OperationSchema = class extends Schema {
    constructor(name, traits, input, output) {
      super(name, traits);
      this.name = name;
      this.traits = traits;
      this.input = input;
      this.output = output;
    }
  };
  function op(namespace, name, traits = {}, input, output) {
    const schema = new OperationSchema(namespace + "#" + name, traits, input, output);
    TypeRegistry.for(namespace).register(name, schema);
    return schema;
  }
  var StructureSchema = class extends Schema {
    constructor(name, traits, memberNames, memberList) {
      super(name, traits);
      this.name = name;
      this.traits = traits;
      this.memberNames = memberNames;
      this.memberList = memberList;
      this.members = {};
      for (let i = 0;i < memberNames.length; ++i) {
        this.members[memberNames[i]] = Array.isArray(memberList[i]) ? memberList[i] : [memberList[i], 0];
      }
    }
  };
  function struct(namespace, name, traits, memberNames, memberList) {
    const schema = new StructureSchema(namespace + "#" + name, traits, memberNames, memberList);
    TypeRegistry.for(namespace).register(name, schema);
    return schema;
  }
  var ErrorSchema = class extends StructureSchema {
    constructor(name, traits, memberNames, memberList, ctor) {
      super(name, traits, memberNames, memberList);
      this.name = name;
      this.traits = traits;
      this.memberNames = memberNames;
      this.memberList = memberList;
      this.ctor = ctor;
    }
  };
  function error(namespace, name, traits = {}, memberNames, memberList, ctor) {
    const schema = new ErrorSchema(namespace + "#" + name, traits, memberNames, memberList, ctor);
    TypeRegistry.for(namespace).register(name, schema);
    return schema;
  }
  var SCHEMA = {
    BLOB: 21,
    STREAMING_BLOB: 42,
    BOOLEAN: 2,
    STRING: 0,
    NUMERIC: 1,
    BIG_INTEGER: 17,
    BIG_DECIMAL: 19,
    DOCUMENT: 15,
    TIMESTAMP_DEFAULT: 4,
    TIMESTAMP_DATE_TIME: 5,
    TIMESTAMP_HTTP_DATE: 6,
    TIMESTAMP_EPOCH_SECONDS: 7,
    LIST_MODIFIER: 64,
    MAP_MODIFIER: 128
  };
  var SimpleSchema = class extends Schema {
    constructor(name, schemaRef, traits) {
      super(name, traits);
      this.name = name;
      this.schemaRef = schemaRef;
      this.traits = traits;
    }
  };
  function sim(namespace, name, schemaRef, traits) {
    const schema = new SimpleSchema(namespace + "#" + name, schemaRef, traits);
    TypeRegistry.for(namespace).register(name, schema);
    return schema;
  }
  var NormalizedSchema = class _NormalizedSchema {
    constructor(ref, memberName) {
      this.ref = ref;
      this.memberName = memberName;
      const traitStack = [];
      let _ref = ref;
      let schema = ref;
      this._isMemberSchema = false;
      while (Array.isArray(_ref)) {
        traitStack.push(_ref[1]);
        _ref = _ref[0];
        schema = deref(_ref);
        this._isMemberSchema = true;
      }
      if (traitStack.length > 0) {
        this.memberTraits = {};
        for (let i = traitStack.length - 1;i >= 0; --i) {
          const traitSet = traitStack[i];
          Object.assign(this.memberTraits, _NormalizedSchema.translateTraits(traitSet));
        }
      } else {
        this.memberTraits = 0;
      }
      if (schema instanceof _NormalizedSchema) {
        this.name = schema.name;
        this.traits = schema.traits;
        this._isMemberSchema = schema._isMemberSchema;
        this.schema = schema.schema;
        this.memberTraits = Object.assign({}, schema.getMemberTraits(), this.getMemberTraits());
        this.normalizedTraits = undefined;
        this.ref = schema.ref;
        this.memberName = memberName ?? schema.memberName;
        return;
      }
      this.schema = deref(schema);
      if (this.schema && typeof this.schema === "object") {
        this.traits = this.schema?.traits ?? {};
      } else {
        this.traits = 0;
      }
      this.name = (typeof this.schema === "object" ? this.schema?.name : undefined) ?? this.memberName ?? this.getSchemaName();
      if (this._isMemberSchema && !memberName) {
        throw new Error(`@smithy/core/schema - NormalizedSchema member schema ${this.getName(true)} must initialize with memberName argument.`);
      }
    }
    static of(ref, memberName) {
      if (ref instanceof _NormalizedSchema) {
        return ref;
      }
      return new _NormalizedSchema(ref, memberName);
    }
    static translateTraits(indicator) {
      if (typeof indicator === "object") {
        return indicator;
      }
      indicator = indicator | 0;
      const traits = {};
      if ((indicator & 1) === 1) {
        traits.httpLabel = 1;
      }
      if ((indicator >> 1 & 1) === 1) {
        traits.idempotent = 1;
      }
      if ((indicator >> 2 & 1) === 1) {
        traits.idempotencyToken = 1;
      }
      if ((indicator >> 3 & 1) === 1) {
        traits.sensitive = 1;
      }
      if ((indicator >> 4 & 1) === 1) {
        traits.httpPayload = 1;
      }
      if ((indicator >> 5 & 1) === 1) {
        traits.httpResponseCode = 1;
      }
      if ((indicator >> 6 & 1) === 1) {
        traits.httpQueryParams = 1;
      }
      return traits;
    }
    static memberFrom(memberSchema, memberName) {
      if (memberSchema instanceof _NormalizedSchema) {
        memberSchema.memberName = memberName;
        memberSchema._isMemberSchema = true;
        return memberSchema;
      }
      return new _NormalizedSchema(memberSchema, memberName);
    }
    getSchema() {
      if (this.schema instanceof _NormalizedSchema) {
        return this.schema = this.schema.getSchema();
      }
      if (this.schema instanceof SimpleSchema) {
        return deref(this.schema.schemaRef);
      }
      return deref(this.schema);
    }
    getName(withNamespace = false) {
      if (!withNamespace) {
        if (this.name && this.name.includes("#")) {
          return this.name.split("#")[1];
        }
      }
      return this.name || undefined;
    }
    getMemberName() {
      if (!this.isMemberSchema()) {
        throw new Error(`@smithy/core/schema - cannot get member name on non-member schema: ${this.getName(true)}`);
      }
      return this.memberName;
    }
    isMemberSchema() {
      return this._isMemberSchema;
    }
    isUnitSchema() {
      return this.getSchema() === "unit";
    }
    isListSchema() {
      const inner = this.getSchema();
      if (typeof inner === "number") {
        return inner >= SCHEMA.LIST_MODIFIER && inner < SCHEMA.MAP_MODIFIER;
      }
      return inner instanceof ListSchema;
    }
    isMapSchema() {
      const inner = this.getSchema();
      if (typeof inner === "number") {
        return inner >= SCHEMA.MAP_MODIFIER && inner <= 255;
      }
      return inner instanceof MapSchema;
    }
    isDocumentSchema() {
      return this.getSchema() === SCHEMA.DOCUMENT;
    }
    isStructSchema() {
      const inner = this.getSchema();
      return inner !== null && typeof inner === "object" && "members" in inner || inner instanceof StructureSchema;
    }
    isBlobSchema() {
      return this.getSchema() === SCHEMA.BLOB || this.getSchema() === SCHEMA.STREAMING_BLOB;
    }
    isTimestampSchema() {
      const schema = this.getSchema();
      return typeof schema === "number" && schema >= SCHEMA.TIMESTAMP_DEFAULT && schema <= SCHEMA.TIMESTAMP_EPOCH_SECONDS;
    }
    isStringSchema() {
      return this.getSchema() === SCHEMA.STRING;
    }
    isBooleanSchema() {
      return this.getSchema() === SCHEMA.BOOLEAN;
    }
    isNumericSchema() {
      return this.getSchema() === SCHEMA.NUMERIC;
    }
    isBigIntegerSchema() {
      return this.getSchema() === SCHEMA.BIG_INTEGER;
    }
    isBigDecimalSchema() {
      return this.getSchema() === SCHEMA.BIG_DECIMAL;
    }
    isStreaming() {
      const streaming = !!this.getMergedTraits().streaming;
      if (streaming) {
        return true;
      }
      return this.getSchema() === SCHEMA.STREAMING_BLOB;
    }
    getMergedTraits() {
      if (this.normalizedTraits) {
        return this.normalizedTraits;
      }
      this.normalizedTraits = {
        ...this.getOwnTraits(),
        ...this.getMemberTraits()
      };
      return this.normalizedTraits;
    }
    getMemberTraits() {
      return _NormalizedSchema.translateTraits(this.memberTraits);
    }
    getOwnTraits() {
      return _NormalizedSchema.translateTraits(this.traits);
    }
    getKeySchema() {
      if (this.isDocumentSchema()) {
        return _NormalizedSchema.memberFrom([SCHEMA.DOCUMENT, 0], "key");
      }
      if (!this.isMapSchema()) {
        throw new Error(`@smithy/core/schema - cannot get key schema for non-map schema: ${this.getName(true)}`);
      }
      const schema = this.getSchema();
      if (typeof schema === "number") {
        return _NormalizedSchema.memberFrom([63 & schema, 0], "key");
      }
      return _NormalizedSchema.memberFrom([schema.keySchema, 0], "key");
    }
    getValueSchema() {
      const schema = this.getSchema();
      if (typeof schema === "number") {
        if (this.isMapSchema()) {
          return _NormalizedSchema.memberFrom([63 & schema, 0], "value");
        } else if (this.isListSchema()) {
          return _NormalizedSchema.memberFrom([63 & schema, 0], "member");
        }
      }
      if (schema && typeof schema === "object") {
        if (this.isStructSchema()) {
          throw new Error(`cannot call getValueSchema() with StructureSchema ${this.getName(true)}`);
        }
        const collection = schema;
        if ("valueSchema" in collection) {
          if (this.isMapSchema()) {
            return _NormalizedSchema.memberFrom([collection.valueSchema, 0], "value");
          } else if (this.isListSchema()) {
            return _NormalizedSchema.memberFrom([collection.valueSchema, 0], "member");
          }
        }
      }
      if (this.isDocumentSchema()) {
        return _NormalizedSchema.memberFrom([SCHEMA.DOCUMENT, 0], "value");
      }
      throw new Error(`@smithy/core/schema - the schema ${this.getName(true)} does not have a value member.`);
    }
    getMemberSchema(member) {
      if (this.isStructSchema()) {
        const struct2 = this.getSchema();
        if (!(member in struct2.members)) {
          throw new Error(`@smithy/core/schema - the schema ${this.getName(true)} does not have a member with name=${member}.`);
        }
        return _NormalizedSchema.memberFrom(struct2.members[member], member);
      }
      if (this.isDocumentSchema()) {
        return _NormalizedSchema.memberFrom([SCHEMA.DOCUMENT, 0], member);
      }
      throw new Error(`@smithy/core/schema - the schema ${this.getName(true)} does not have members.`);
    }
    getMemberSchemas() {
      const { schema } = this;
      const struct2 = schema;
      if (!struct2 || typeof struct2 !== "object") {
        return {};
      }
      if ("members" in struct2) {
        const buffer = {};
        for (const member of struct2.memberNames) {
          buffer[member] = this.getMemberSchema(member);
        }
        return buffer;
      }
      return {};
    }
    *structIterator() {
      if (this.isUnitSchema()) {
        return;
      }
      if (!this.isStructSchema()) {
        throw new Error("@smithy/core/schema - cannot acquire structIterator on non-struct schema.");
      }
      const struct2 = this.getSchema();
      for (let i = 0;i < struct2.memberNames.length; ++i) {
        yield [struct2.memberNames[i], _NormalizedSchema.memberFrom([struct2.memberList[i], 0], struct2.memberNames[i])];
      }
    }
    getSchemaName() {
      const schema = this.getSchema();
      if (typeof schema === "number") {
        const _schema = 63 & schema;
        const container = 192 & schema;
        const type = Object.entries(SCHEMA).find(([, value]) => {
          return value === _schema;
        })?.[0] ?? "Unknown";
        switch (container) {
          case SCHEMA.MAP_MODIFIER:
            return `${type}Map`;
          case SCHEMA.LIST_MODIFIER:
            return `${type}List`;
          case 0:
            return type;
        }
      }
      return "Unknown";
    }
  };
});

// ../../../../node_modules/@smithy/core/dist-cjs/submodules/serde/index.js
var require_serde = __commonJS((exports, module) => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var serde_exports = {};
  __export(serde_exports, {
    LazyJsonString: () => LazyJsonString,
    NumericValue: () => NumericValue,
    copyDocumentWithTransform: () => copyDocumentWithTransform,
    dateToUtcString: () => dateToUtcString,
    expectBoolean: () => expectBoolean,
    expectByte: () => expectByte,
    expectFloat32: () => expectFloat32,
    expectInt: () => expectInt,
    expectInt32: () => expectInt32,
    expectLong: () => expectLong,
    expectNonNull: () => expectNonNull,
    expectNumber: () => expectNumber,
    expectObject: () => expectObject,
    expectShort: () => expectShort,
    expectString: () => expectString,
    expectUnion: () => expectUnion,
    handleFloat: () => handleFloat,
    limitedParseDouble: () => limitedParseDouble,
    limitedParseFloat: () => limitedParseFloat,
    limitedParseFloat32: () => limitedParseFloat32,
    logger: () => logger,
    nv: () => nv,
    parseBoolean: () => parseBoolean,
    parseEpochTimestamp: () => parseEpochTimestamp,
    parseRfc3339DateTime: () => parseRfc3339DateTime,
    parseRfc3339DateTimeWithOffset: () => parseRfc3339DateTimeWithOffset,
    parseRfc7231DateTime: () => parseRfc7231DateTime,
    quoteHeader: () => quoteHeader,
    splitEvery: () => splitEvery,
    splitHeader: () => splitHeader,
    strictParseByte: () => strictParseByte,
    strictParseDouble: () => strictParseDouble,
    strictParseFloat: () => strictParseFloat,
    strictParseFloat32: () => strictParseFloat32,
    strictParseInt: () => strictParseInt,
    strictParseInt32: () => strictParseInt32,
    strictParseLong: () => strictParseLong,
    strictParseShort: () => strictParseShort
  });
  module.exports = __toCommonJS(serde_exports);
  var import_schema = require_schema();
  var copyDocumentWithTransform = (source, schemaRef, transform = (_) => _) => {
    const ns = import_schema.NormalizedSchema.of(schemaRef);
    switch (typeof source) {
      case "undefined":
      case "boolean":
      case "number":
      case "string":
      case "bigint":
      case "symbol":
        return transform(source, ns);
      case "function":
      case "object":
        if (source === null) {
          return transform(null, ns);
        }
        if (Array.isArray(source)) {
          const newArray = new Array(source.length);
          let i = 0;
          for (const item of source) {
            newArray[i++] = copyDocumentWithTransform(item, ns.getValueSchema(), transform);
          }
          return transform(newArray, ns);
        }
        if ("byteLength" in source) {
          const newBytes = new Uint8Array(source.byteLength);
          newBytes.set(source, 0);
          return transform(newBytes, ns);
        }
        if (source instanceof Date) {
          return transform(source, ns);
        }
        const newObject = {};
        if (ns.isMapSchema()) {
          for (const key of Object.keys(source)) {
            newObject[key] = copyDocumentWithTransform(source[key], ns.getValueSchema(), transform);
          }
        } else if (ns.isStructSchema()) {
          for (const [key, memberSchema] of ns.structIterator()) {
            newObject[key] = copyDocumentWithTransform(source[key], memberSchema, transform);
          }
        } else if (ns.isDocumentSchema()) {
          for (const key of Object.keys(source)) {
            newObject[key] = copyDocumentWithTransform(source[key], ns.getValueSchema(), transform);
          }
        }
        return transform(newObject, ns);
      default:
        return transform(source, ns);
    }
  };
  var parseBoolean = (value) => {
    switch (value) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        throw new Error(`Unable to parse boolean value "${value}"`);
    }
  };
  var expectBoolean = (value) => {
    if (value === null || value === undefined) {
      return;
    }
    if (typeof value === "number") {
      if (value === 0 || value === 1) {
        logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
      }
      if (value === 0) {
        return false;
      }
      if (value === 1) {
        return true;
      }
    }
    if (typeof value === "string") {
      const lower = value.toLowerCase();
      if (lower === "false" || lower === "true") {
        logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
      }
      if (lower === "false") {
        return false;
      }
      if (lower === "true") {
        return true;
      }
    }
    if (typeof value === "boolean") {
      return value;
    }
    throw new TypeError(`Expected boolean, got ${typeof value}: ${value}`);
  };
  var expectNumber = (value) => {
    if (value === null || value === undefined) {
      return;
    }
    if (typeof value === "string") {
      const parsed = parseFloat(value);
      if (!Number.isNaN(parsed)) {
        if (String(parsed) !== String(value)) {
          logger.warn(stackTraceWarning(`Expected number but observed string: ${value}`));
        }
        return parsed;
      }
    }
    if (typeof value === "number") {
      return value;
    }
    throw new TypeError(`Expected number, got ${typeof value}: ${value}`);
  };
  var MAX_FLOAT = Math.ceil(2 ** 127 * (2 - 2 ** -23));
  var expectFloat32 = (value) => {
    const expected = expectNumber(value);
    if (expected !== undefined && !Number.isNaN(expected) && expected !== Infinity && expected !== -Infinity) {
      if (Math.abs(expected) > MAX_FLOAT) {
        throw new TypeError(`Expected 32-bit float, got ${value}`);
      }
    }
    return expected;
  };
  var expectLong = (value) => {
    if (value === null || value === undefined) {
      return;
    }
    if (Number.isInteger(value) && !Number.isNaN(value)) {
      return value;
    }
    throw new TypeError(`Expected integer, got ${typeof value}: ${value}`);
  };
  var expectInt = expectLong;
  var expectInt32 = (value) => expectSizedInt(value, 32);
  var expectShort = (value) => expectSizedInt(value, 16);
  var expectByte = (value) => expectSizedInt(value, 8);
  var expectSizedInt = (value, size) => {
    const expected = expectLong(value);
    if (expected !== undefined && castInt(expected, size) !== expected) {
      throw new TypeError(`Expected ${size}-bit integer, got ${value}`);
    }
    return expected;
  };
  var castInt = (value, size) => {
    switch (size) {
      case 32:
        return Int32Array.of(value)[0];
      case 16:
        return Int16Array.of(value)[0];
      case 8:
        return Int8Array.of(value)[0];
    }
  };
  var expectNonNull = (value, location) => {
    if (value === null || value === undefined) {
      if (location) {
        throw new TypeError(`Expected a non-null value for ${location}`);
      }
      throw new TypeError("Expected a non-null value");
    }
    return value;
  };
  var expectObject = (value) => {
    if (value === null || value === undefined) {
      return;
    }
    if (typeof value === "object" && !Array.isArray(value)) {
      return value;
    }
    const receivedType = Array.isArray(value) ? "array" : typeof value;
    throw new TypeError(`Expected object, got ${receivedType}: ${value}`);
  };
  var expectString = (value) => {
    if (value === null || value === undefined) {
      return;
    }
    if (typeof value === "string") {
      return value;
    }
    if (["boolean", "number", "bigint"].includes(typeof value)) {
      logger.warn(stackTraceWarning(`Expected string, got ${typeof value}: ${value}`));
      return String(value);
    }
    throw new TypeError(`Expected string, got ${typeof value}: ${value}`);
  };
  var expectUnion = (value) => {
    if (value === null || value === undefined) {
      return;
    }
    const asObject = expectObject(value);
    const setKeys = Object.entries(asObject).filter(([, v]) => v != null).map(([k]) => k);
    if (setKeys.length === 0) {
      throw new TypeError(`Unions must have exactly one non-null member. None were found.`);
    }
    if (setKeys.length > 1) {
      throw new TypeError(`Unions must have exactly one non-null member. Keys ${setKeys} were not null.`);
    }
    return asObject;
  };
  var strictParseDouble = (value) => {
    if (typeof value == "string") {
      return expectNumber(parseNumber(value));
    }
    return expectNumber(value);
  };
  var strictParseFloat = strictParseDouble;
  var strictParseFloat32 = (value) => {
    if (typeof value == "string") {
      return expectFloat32(parseNumber(value));
    }
    return expectFloat32(value);
  };
  var NUMBER_REGEX = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g;
  var parseNumber = (value) => {
    const matches = value.match(NUMBER_REGEX);
    if (matches === null || matches[0].length !== value.length) {
      throw new TypeError(`Expected real number, got implicit NaN`);
    }
    return parseFloat(value);
  };
  var limitedParseDouble = (value) => {
    if (typeof value == "string") {
      return parseFloatString(value);
    }
    return expectNumber(value);
  };
  var handleFloat = limitedParseDouble;
  var limitedParseFloat = limitedParseDouble;
  var limitedParseFloat32 = (value) => {
    if (typeof value == "string") {
      return parseFloatString(value);
    }
    return expectFloat32(value);
  };
  var parseFloatString = (value) => {
    switch (value) {
      case "NaN":
        return NaN;
      case "Infinity":
        return Infinity;
      case "-Infinity":
        return -Infinity;
      default:
        throw new Error(`Unable to parse float value: ${value}`);
    }
  };
  var strictParseLong = (value) => {
    if (typeof value === "string") {
      return expectLong(parseNumber(value));
    }
    return expectLong(value);
  };
  var strictParseInt = strictParseLong;
  var strictParseInt32 = (value) => {
    if (typeof value === "string") {
      return expectInt32(parseNumber(value));
    }
    return expectInt32(value);
  };
  var strictParseShort = (value) => {
    if (typeof value === "string") {
      return expectShort(parseNumber(value));
    }
    return expectShort(value);
  };
  var strictParseByte = (value) => {
    if (typeof value === "string") {
      return expectByte(parseNumber(value));
    }
    return expectByte(value);
  };
  var stackTraceWarning = (message) => {
    return String(new TypeError(message).stack || message).split(`
`).slice(0, 5).filter((s) => !s.includes("stackTraceWarning")).join(`
`);
  };
  var logger = {
    warn: console.warn
  };
  var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function dateToUtcString(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const dayOfWeek = date.getUTCDay();
    const dayOfMonthInt = date.getUTCDate();
    const hoursInt = date.getUTCHours();
    const minutesInt = date.getUTCMinutes();
    const secondsInt = date.getUTCSeconds();
    const dayOfMonthString = dayOfMonthInt < 10 ? `0${dayOfMonthInt}` : `${dayOfMonthInt}`;
    const hoursString = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
    const minutesString = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
    const secondsString = secondsInt < 10 ? `0${secondsInt}` : `${secondsInt}`;
    return `${DAYS[dayOfWeek]}, ${dayOfMonthString} ${MONTHS[month]} ${year} ${hoursString}:${minutesString}:${secondsString} GMT`;
  }
  var RFC3339 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/);
  var parseRfc3339DateTime = (value) => {
    if (value === null || value === undefined) {
      return;
    }
    if (typeof value !== "string") {
      throw new TypeError("RFC-3339 date-times must be expressed as strings");
    }
    const match = RFC3339.exec(value);
    if (!match) {
      throw new TypeError("Invalid RFC-3339 date-time value");
    }
    const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds] = match;
    const year = strictParseShort(stripLeadingZeroes(yearStr));
    const month = parseDateValue(monthStr, "month", 1, 12);
    const day = parseDateValue(dayStr, "day", 1, 31);
    return buildDate(year, month, day, { hours, minutes, seconds, fractionalMilliseconds });
  };
  var RFC3339_WITH_OFFSET = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/);
  var parseRfc3339DateTimeWithOffset = (value) => {
    if (value === null || value === undefined) {
      return;
    }
    if (typeof value !== "string") {
      throw new TypeError("RFC-3339 date-times must be expressed as strings");
    }
    const match = RFC3339_WITH_OFFSET.exec(value);
    if (!match) {
      throw new TypeError("Invalid RFC-3339 date-time value");
    }
    const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, offsetStr] = match;
    const year = strictParseShort(stripLeadingZeroes(yearStr));
    const month = parseDateValue(monthStr, "month", 1, 12);
    const day = parseDateValue(dayStr, "day", 1, 31);
    const date = buildDate(year, month, day, { hours, minutes, seconds, fractionalMilliseconds });
    if (offsetStr.toUpperCase() != "Z") {
      date.setTime(date.getTime() - parseOffsetToMilliseconds(offsetStr));
    }
    return date;
  };
  var IMF_FIXDATE = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
  var RFC_850_DATE = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
  var ASC_TIME = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/);
  var parseRfc7231DateTime = (value) => {
    if (value === null || value === undefined) {
      return;
    }
    if (typeof value !== "string") {
      throw new TypeError("RFC-7231 date-times must be expressed as strings");
    }
    let match = IMF_FIXDATE.exec(value);
    if (match) {
      const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
      return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
    }
    match = RFC_850_DATE.exec(value);
    if (match) {
      const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
      return adjustRfc850Year(buildDate(parseTwoDigitYear(yearStr), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
        hours,
        minutes,
        seconds,
        fractionalMilliseconds
      }));
    }
    match = ASC_TIME.exec(value);
    if (match) {
      const [_, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, yearStr] = match;
      return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr.trimLeft(), "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
    }
    throw new TypeError("Invalid RFC-7231 date-time value");
  };
  var parseEpochTimestamp = (value) => {
    if (value === null || value === undefined) {
      return;
    }
    let valueAsDouble;
    if (typeof value === "number") {
      valueAsDouble = value;
    } else if (typeof value === "string") {
      valueAsDouble = strictParseDouble(value);
    } else if (typeof value === "object" && value.tag === 1) {
      valueAsDouble = value.value;
    } else {
      throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
    }
    if (Number.isNaN(valueAsDouble) || valueAsDouble === Infinity || valueAsDouble === -Infinity) {
      throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
    }
    return new Date(Math.round(valueAsDouble * 1000));
  };
  var buildDate = (year, month, day, time) => {
    const adjustedMonth = month - 1;
    validateDayOfMonth(year, adjustedMonth, day);
    return new Date(Date.UTC(year, adjustedMonth, day, parseDateValue(time.hours, "hour", 0, 23), parseDateValue(time.minutes, "minute", 0, 59), parseDateValue(time.seconds, "seconds", 0, 60), parseMilliseconds(time.fractionalMilliseconds)));
  };
  var parseTwoDigitYear = (value) => {
    const thisYear = (/* @__PURE__ */ new Date()).getUTCFullYear();
    const valueInThisCentury = Math.floor(thisYear / 100) * 100 + strictParseShort(stripLeadingZeroes(value));
    if (valueInThisCentury < thisYear) {
      return valueInThisCentury + 100;
    }
    return valueInThisCentury;
  };
  var FIFTY_YEARS_IN_MILLIS = 50 * 365 * 24 * 60 * 60 * 1000;
  var adjustRfc850Year = (input) => {
    if (input.getTime() - (/* @__PURE__ */ new Date()).getTime() > FIFTY_YEARS_IN_MILLIS) {
      return new Date(Date.UTC(input.getUTCFullYear() - 100, input.getUTCMonth(), input.getUTCDate(), input.getUTCHours(), input.getUTCMinutes(), input.getUTCSeconds(), input.getUTCMilliseconds()));
    }
    return input;
  };
  var parseMonthByShortName = (value) => {
    const monthIdx = MONTHS.indexOf(value);
    if (monthIdx < 0) {
      throw new TypeError(`Invalid month: ${value}`);
    }
    return monthIdx + 1;
  };
  var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var validateDayOfMonth = (year, month, day) => {
    let maxDays = DAYS_IN_MONTH[month];
    if (month === 1 && isLeapYear(year)) {
      maxDays = 29;
    }
    if (day > maxDays) {
      throw new TypeError(`Invalid day for ${MONTHS[month]} in ${year}: ${day}`);
    }
  };
  var isLeapYear = (year) => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  };
  var parseDateValue = (value, type, lower, upper) => {
    const dateVal = strictParseByte(stripLeadingZeroes(value));
    if (dateVal < lower || dateVal > upper) {
      throw new TypeError(`${type} must be between ${lower} and ${upper}, inclusive`);
    }
    return dateVal;
  };
  var parseMilliseconds = (value) => {
    if (value === null || value === undefined) {
      return 0;
    }
    return strictParseFloat32("0." + value) * 1000;
  };
  var parseOffsetToMilliseconds = (value) => {
    const directionStr = value[0];
    let direction = 1;
    if (directionStr == "+") {
      direction = 1;
    } else if (directionStr == "-") {
      direction = -1;
    } else {
      throw new TypeError(`Offset direction, ${directionStr}, must be "+" or "-"`);
    }
    const hour = Number(value.substring(1, 3));
    const minute = Number(value.substring(4, 6));
    return direction * (hour * 60 + minute) * 60 * 1000;
  };
  var stripLeadingZeroes = (value) => {
    let idx = 0;
    while (idx < value.length - 1 && value.charAt(idx) === "0") {
      idx++;
    }
    if (idx === 0) {
      return value;
    }
    return value.slice(idx);
  };
  var LazyJsonString = function LazyJsonString2(val) {
    const str = Object.assign(new String(val), {
      deserializeJSON() {
        return JSON.parse(String(val));
      },
      toString() {
        return String(val);
      },
      toJSON() {
        return String(val);
      }
    });
    return str;
  };
  LazyJsonString.from = (object) => {
    if (object && typeof object === "object" && (object instanceof LazyJsonString || ("deserializeJSON" in object))) {
      return object;
    } else if (typeof object === "string" || Object.getPrototypeOf(object) === String.prototype) {
      return LazyJsonString(String(object));
    }
    return LazyJsonString(JSON.stringify(object));
  };
  LazyJsonString.fromObject = LazyJsonString.from;
  function quoteHeader(part) {
    if (part.includes(",") || part.includes('"')) {
      part = `"${part.replace(/"/g, "\\\"")}"`;
    }
    return part;
  }
  function splitEvery(value, delimiter, numDelimiters) {
    if (numDelimiters <= 0 || !Number.isInteger(numDelimiters)) {
      throw new Error("Invalid number of delimiters (" + numDelimiters + ") for splitEvery.");
    }
    const segments = value.split(delimiter);
    if (numDelimiters === 1) {
      return segments;
    }
    const compoundSegments = [];
    let currentSegment = "";
    for (let i = 0;i < segments.length; i++) {
      if (currentSegment === "") {
        currentSegment = segments[i];
      } else {
        currentSegment += delimiter + segments[i];
      }
      if ((i + 1) % numDelimiters === 0) {
        compoundSegments.push(currentSegment);
        currentSegment = "";
      }
    }
    if (currentSegment !== "") {
      compoundSegments.push(currentSegment);
    }
    return compoundSegments;
  }
  var splitHeader = (value) => {
    const z = value.length;
    const values = [];
    let withinQuotes = false;
    let prevChar = undefined;
    let anchor = 0;
    for (let i = 0;i < z; ++i) {
      const char = value[i];
      switch (char) {
        case `"`:
          if (prevChar !== "\\") {
            withinQuotes = !withinQuotes;
          }
          break;
        case ",":
          if (!withinQuotes) {
            values.push(value.slice(anchor, i));
            anchor = i + 1;
          }
          break;
        default:
      }
      prevChar = char;
    }
    values.push(value.slice(anchor));
    return values.map((v) => {
      v = v.trim();
      const z2 = v.length;
      if (z2 < 2) {
        return v;
      }
      if (v[0] === `"` && v[z2 - 1] === `"`) {
        v = v.slice(1, z2 - 1);
      }
      return v.replace(/\\"/g, '"');
    });
  };
  var NumericValue = class {
    constructor(string, type) {
      this.string = string;
      this.type = type;
      let dot = 0;
      for (let i = 0;i < string.length; ++i) {
        const char = string.charCodeAt(i);
        if (i === 0 && char === 45) {
          continue;
        }
        if (char === 46) {
          if (dot) {
            throw new Error("@smithy/core/serde - NumericValue must contain at most one decimal point.");
          }
          dot = 1;
          continue;
        }
        if (char < 48 || char > 57) {
          throw new Error(`@smithy/core/serde - NumericValue must only contain [0-9], at most one decimal point ".", and an optional negation prefix "-".`);
        }
      }
    }
    toString() {
      return this.string;
    }
    [Symbol.hasInstance](object) {
      if (!object || typeof object !== "object") {
        return false;
      }
      const _nv = object;
      if (typeof _nv.string === "string" && typeof _nv.type === "string" && _nv.constructor?.name === "NumericValue") {
        return true;
      }
      return false;
    }
  };
  function nv(input) {
    return new NumericValue(String(input), "bigDecimal");
  }
});

// ../../../../node_modules/@smithy/is-array-buffer/dist-cjs/index.js
var require_dist_cjs7 = __commonJS((exports, module) => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var src_exports = {};
  __export(src_exports, {
    isArrayBuffer: () => isArrayBuffer
  });
  module.exports = __toCommonJS(src_exports);
  var isArrayBuffer = /* @__PURE__ */ __name((arg) => typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer || Object.prototype.toString.call(arg) === "[object ArrayBuffer]", "isArrayBuffer");
});

// ../../../../node_modules/@smithy/util-buffer-from/dist-cjs/index.js
var require_dist_cjs8 = __commonJS((exports, module) => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var src_exports = {};
  __export(src_exports, {
    fromArrayBuffer: () => fromArrayBuffer,
    fromString: () => fromString
  });
  module.exports = __toCommonJS(src_exports);
  var import_is_array_buffer = require_dist_cjs7();
  var import_buffer = __require("buffer");
  var fromArrayBuffer = /* @__PURE__ */ __name((input, offset = 0, length = input.byteLength - offset) => {
    if (!(0, import_is_array_buffer.isArrayBuffer)(input)) {
      throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof input} (${input})`);
    }
    return import_buffer.Buffer.from(input, offset, length);
  }, "fromArrayBuffer");
  var fromString = /* @__PURE__ */ __name((input, encoding) => {
    if (typeof input !== "string") {
      throw new TypeError(`The "input" argument must be of type string. Received type ${typeof input} (${input})`);
    }
    return encoding ? import_buffer.Buffer.from(input, encoding) : import_buffer.Buffer.from(input);
  }, "fromString");
});

// ../../../../node_modules/@smithy/util-base64/dist-cjs/fromBase64.js
var require_fromBase64 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.fromBase64 = undefined;
  var util_buffer_from_1 = require_dist_cjs8();
  var BASE64_REGEX = /^[A-Za-z0-9+/]*={0,2}$/;
  var fromBase642 = (input) => {
    if (input.length * 3 % 4 !== 0) {
      throw new TypeError(`Incorrect padding on base64 string.`);
    }
    if (!BASE64_REGEX.exec(input)) {
      throw new TypeError(`Invalid base64 string.`);
    }
    const buffer = (0, util_buffer_from_1.fromString)(input, "base64");
    return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  };
  exports.fromBase64 = fromBase642;
});

// ../../../../node_modules/@smithy/util-utf8/dist-cjs/index.js
var require_dist_cjs9 = __commonJS((exports, module) => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var src_exports = {};
  __export(src_exports, {
    fromUtf8: () => fromUtf8,
    toUint8Array: () => toUint8Array,
    toUtf8: () => toUtf8
  });
  module.exports = __toCommonJS(src_exports);
  var import_util_buffer_from = require_dist_cjs8();
  var fromUtf8 = /* @__PURE__ */ __name((input) => {
    const buf = (0, import_util_buffer_from.fromString)(input, "utf8");
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
  }, "fromUtf8");
  var toUint8Array = /* @__PURE__ */ __name((data) => {
    if (typeof data === "string") {
      return fromUtf8(data);
    }
    if (ArrayBuffer.isView(data)) {
      return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }
    return new Uint8Array(data);
  }, "toUint8Array");
  var toUtf8 = /* @__PURE__ */ __name((input) => {
    if (typeof input === "string") {
      return input;
    }
    if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
      throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
    }
    return (0, import_util_buffer_from.fromArrayBuffer)(input.buffer, input.byteOffset, input.byteLength).toString("utf8");
  }, "toUtf8");
});

// ../../../../node_modules/@smithy/util-base64/dist-cjs/toBase64.js
var require_toBase64 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.toBase64 = undefined;
  var util_buffer_from_1 = require_dist_cjs8();
  var util_utf8_1 = require_dist_cjs9();
  var toBase642 = (_input) => {
    let input;
    if (typeof _input === "string") {
      input = (0, util_utf8_1.fromUtf8)(_input);
    } else {
      input = _input;
    }
    if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
      throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
    }
    return (0, util_buffer_from_1.fromArrayBuffer)(input.buffer, input.byteOffset, input.byteLength).toString("base64");
  };
  exports.toBase64 = toBase642;
});

// ../../../../node_modules/@smithy/util-base64/dist-cjs/index.js
var require_dist_cjs10 = __commonJS((exports, module) => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var src_exports = {};
  module.exports = __toCommonJS(src_exports);
  __reExport(src_exports, require_fromBase64(), module.exports);
  __reExport(src_exports, require_toBase64(), module.exports);
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/checksum/ChecksumStream.js
var require_ChecksumStream = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ChecksumStream = undefined;
  var util_base64_1 = require_dist_cjs10();
  var stream_1 = __require("stream");

  class ChecksumStream2 extends stream_1.Duplex {
    constructor({ expectedChecksum, checksum, source, checksumSourceLocation, base64Encoder }) {
      var _a, _b;
      super();
      if (typeof source.pipe === "function") {
        this.source = source;
      } else {
        throw new Error(`@smithy/util-stream: unsupported source type ${(_b = (_a = source === null || source === undefined ? undefined : source.constructor) === null || _a === undefined ? undefined : _a.name) !== null && _b !== undefined ? _b : source} in ChecksumStream.`);
      }
      this.base64Encoder = base64Encoder !== null && base64Encoder !== undefined ? base64Encoder : util_base64_1.toBase64;
      this.expectedChecksum = expectedChecksum;
      this.checksum = checksum;
      this.checksumSourceLocation = checksumSourceLocation;
      this.source.pipe(this);
    }
    _read(size) {}
    _write(chunk, encoding, callback) {
      try {
        this.checksum.update(chunk);
        this.push(chunk);
      } catch (e) {
        return callback(e);
      }
      return callback();
    }
    async _final(callback) {
      try {
        const digest = await this.checksum.digest();
        const received = this.base64Encoder(digest);
        if (this.expectedChecksum !== received) {
          return callback(new Error(`Checksum mismatch: expected "${this.expectedChecksum}" but received "${received}"` + ` in response header "${this.checksumSourceLocation}".`));
        }
      } catch (e) {
        return callback(e);
      }
      this.push(null);
      return callback();
    }
  }
  exports.ChecksumStream = ChecksumStream2;
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/stream-type-check.js
var require_stream_type_check = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.isBlob = exports.isReadableStream = undefined;
  var isReadableStream2 = (stream) => {
    var _a;
    return typeof ReadableStream === "function" && (((_a = stream === null || stream === undefined ? undefined : stream.constructor) === null || _a === undefined ? undefined : _a.name) === ReadableStream.name || stream instanceof ReadableStream);
  };
  exports.isReadableStream = isReadableStream2;
  var isBlob2 = (blob) => {
    var _a;
    return typeof Blob === "function" && (((_a = blob === null || blob === undefined ? undefined : blob.constructor) === null || _a === undefined ? undefined : _a.name) === Blob.name || blob instanceof Blob);
  };
  exports.isBlob = isBlob2;
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/checksum/ChecksumStream.browser.js
var require_ChecksumStream_browser = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ChecksumStream = undefined;
  var ReadableStreamRef = typeof ReadableStream === "function" ? ReadableStream : function() {};

  class ChecksumStream2 extends ReadableStreamRef {
  }
  exports.ChecksumStream = ChecksumStream2;
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/checksum/createChecksumStream.browser.js
var require_createChecksumStream_browser = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createChecksumStream = undefined;
  var util_base64_1 = require_dist_cjs10();
  var stream_type_check_1 = require_stream_type_check();
  var ChecksumStream_browser_1 = require_ChecksumStream_browser();
  var createChecksumStream2 = ({ expectedChecksum, checksum, source, checksumSourceLocation, base64Encoder }) => {
    var _a, _b;
    if (!(0, stream_type_check_1.isReadableStream)(source)) {
      throw new Error(`@smithy/util-stream: unsupported source type ${(_b = (_a = source === null || source === undefined ? undefined : source.constructor) === null || _a === undefined ? undefined : _a.name) !== null && _b !== undefined ? _b : source} in ChecksumStream.`);
    }
    const encoder = base64Encoder !== null && base64Encoder !== undefined ? base64Encoder : util_base64_1.toBase64;
    if (typeof TransformStream !== "function") {
      throw new Error("@smithy/util-stream: unable to instantiate ChecksumStream because API unavailable: ReadableStream/TransformStream.");
    }
    const transform = new TransformStream({
      start() {},
      async transform(chunk, controller) {
        checksum.update(chunk);
        controller.enqueue(chunk);
      },
      async flush(controller) {
        const digest = await checksum.digest();
        const received = encoder(digest);
        if (expectedChecksum !== received) {
          const error = new Error(`Checksum mismatch: expected "${expectedChecksum}" but received "${received}"` + ` in response header "${checksumSourceLocation}".`);
          controller.error(error);
        } else {
          controller.terminate();
        }
      }
    });
    source.pipeThrough(transform);
    const readable = transform.readable;
    Object.setPrototypeOf(readable, ChecksumStream_browser_1.ChecksumStream.prototype);
    return readable;
  };
  exports.createChecksumStream = createChecksumStream2;
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/checksum/createChecksumStream.js
var require_createChecksumStream = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createChecksumStream = createChecksumStream2;
  var stream_type_check_1 = require_stream_type_check();
  var ChecksumStream_1 = require_ChecksumStream();
  var createChecksumStream_browser_1 = require_createChecksumStream_browser();
  function createChecksumStream2(init) {
    if (typeof ReadableStream === "function" && (0, stream_type_check_1.isReadableStream)(init.source)) {
      return (0, createChecksumStream_browser_1.createChecksumStream)(init);
    }
    return new ChecksumStream_1.ChecksumStream(init);
  }
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/ByteArrayCollector.js
var require_ByteArrayCollector = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ByteArrayCollector = undefined;

  class ByteArrayCollector {
    constructor(allocByteArray) {
      this.allocByteArray = allocByteArray;
      this.byteLength = 0;
      this.byteArrays = [];
    }
    push(byteArray) {
      this.byteArrays.push(byteArray);
      this.byteLength += byteArray.byteLength;
    }
    flush() {
      if (this.byteArrays.length === 1) {
        const bytes = this.byteArrays[0];
        this.reset();
        return bytes;
      }
      const aggregation = this.allocByteArray(this.byteLength);
      let cursor = 0;
      for (let i = 0;i < this.byteArrays.length; ++i) {
        const bytes = this.byteArrays[i];
        aggregation.set(bytes, cursor);
        cursor += bytes.byteLength;
      }
      this.reset();
      return aggregation;
    }
    reset() {
      this.byteArrays = [];
      this.byteLength = 0;
    }
  }
  exports.ByteArrayCollector = ByteArrayCollector;
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/createBufferedReadableStream.js
var require_createBufferedReadableStream = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createBufferedReadable = undefined;
  exports.createBufferedReadableStream = createBufferedReadableStream;
  exports.merge = merge;
  exports.flush = flush;
  exports.sizeOf = sizeOf;
  exports.modeOf = modeOf;
  var ByteArrayCollector_1 = require_ByteArrayCollector();
  function createBufferedReadableStream(upstream, size, logger) {
    const reader = upstream.getReader();
    let streamBufferingLoggedWarning = false;
    let bytesSeen = 0;
    const buffers = ["", new ByteArrayCollector_1.ByteArrayCollector((size2) => new Uint8Array(size2))];
    let mode = -1;
    const pull = async (controller) => {
      const { value, done } = await reader.read();
      const chunk = value;
      if (done) {
        if (mode !== -1) {
          const remainder = flush(buffers, mode);
          if (sizeOf(remainder) > 0) {
            controller.enqueue(remainder);
          }
        }
        controller.close();
      } else {
        const chunkMode = modeOf(chunk, false);
        if (mode !== chunkMode) {
          if (mode >= 0) {
            controller.enqueue(flush(buffers, mode));
          }
          mode = chunkMode;
        }
        if (mode === -1) {
          controller.enqueue(chunk);
          return;
        }
        const chunkSize = sizeOf(chunk);
        bytesSeen += chunkSize;
        const bufferSize = sizeOf(buffers[mode]);
        if (chunkSize >= size && bufferSize === 0) {
          controller.enqueue(chunk);
        } else {
          const newSize = merge(buffers, mode, chunk);
          if (!streamBufferingLoggedWarning && bytesSeen > size * 2) {
            streamBufferingLoggedWarning = true;
            logger === null || logger === undefined || logger.warn(`@smithy/util-stream - stream chunk size ${chunkSize} is below threshold of ${size}, automatically buffering.`);
          }
          if (newSize >= size) {
            controller.enqueue(flush(buffers, mode));
          } else {
            await pull(controller);
          }
        }
      }
    };
    return new ReadableStream({
      pull
    });
  }
  exports.createBufferedReadable = createBufferedReadableStream;
  function merge(buffers, mode, chunk) {
    switch (mode) {
      case 0:
        buffers[0] += chunk;
        return sizeOf(buffers[0]);
      case 1:
      case 2:
        buffers[mode].push(chunk);
        return sizeOf(buffers[mode]);
    }
  }
  function flush(buffers, mode) {
    switch (mode) {
      case 0:
        const s = buffers[0];
        buffers[0] = "";
        return s;
      case 1:
      case 2:
        return buffers[mode].flush();
    }
    throw new Error(`@smithy/util-stream - invalid index ${mode} given to flush()`);
  }
  function sizeOf(chunk) {
    var _a, _b;
    return (_b = (_a = chunk === null || chunk === undefined ? undefined : chunk.byteLength) !== null && _a !== undefined ? _a : chunk === null || chunk === undefined ? undefined : chunk.length) !== null && _b !== undefined ? _b : 0;
  }
  function modeOf(chunk, allowBuffer = true) {
    if (allowBuffer && typeof Buffer !== "undefined" && chunk instanceof Buffer) {
      return 2;
    }
    if (chunk instanceof Uint8Array) {
      return 1;
    }
    if (typeof chunk === "string") {
      return 0;
    }
    return -1;
  }
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/createBufferedReadable.js
var require_createBufferedReadable = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createBufferedReadable = createBufferedReadable2;
  var node_stream_1 = __require("stream");
  var ByteArrayCollector_1 = require_ByteArrayCollector();
  var createBufferedReadableStream_1 = require_createBufferedReadableStream();
  var stream_type_check_1 = require_stream_type_check();
  function createBufferedReadable2(upstream, size, logger) {
    if ((0, stream_type_check_1.isReadableStream)(upstream)) {
      return (0, createBufferedReadableStream_1.createBufferedReadableStream)(upstream, size, logger);
    }
    const downstream = new node_stream_1.Readable({ read() {} });
    let streamBufferingLoggedWarning = false;
    let bytesSeen = 0;
    const buffers = [
      "",
      new ByteArrayCollector_1.ByteArrayCollector((size2) => new Uint8Array(size2)),
      new ByteArrayCollector_1.ByteArrayCollector((size2) => Buffer.from(new Uint8Array(size2)))
    ];
    let mode = -1;
    upstream.on("data", (chunk) => {
      const chunkMode = (0, createBufferedReadableStream_1.modeOf)(chunk, true);
      if (mode !== chunkMode) {
        if (mode >= 0) {
          downstream.push((0, createBufferedReadableStream_1.flush)(buffers, mode));
        }
        mode = chunkMode;
      }
      if (mode === -1) {
        downstream.push(chunk);
        return;
      }
      const chunkSize = (0, createBufferedReadableStream_1.sizeOf)(chunk);
      bytesSeen += chunkSize;
      const bufferSize = (0, createBufferedReadableStream_1.sizeOf)(buffers[mode]);
      if (chunkSize >= size && bufferSize === 0) {
        downstream.push(chunk);
      } else {
        const newSize = (0, createBufferedReadableStream_1.merge)(buffers, mode, chunk);
        if (!streamBufferingLoggedWarning && bytesSeen > size * 2) {
          streamBufferingLoggedWarning = true;
          logger === null || logger === undefined || logger.warn(`@smithy/util-stream - stream chunk size ${chunkSize} is below threshold of ${size}, automatically buffering.`);
        }
        if (newSize >= size) {
          downstream.push((0, createBufferedReadableStream_1.flush)(buffers, mode));
        }
      }
    });
    upstream.on("end", () => {
      if (mode !== -1) {
        const remainder = (0, createBufferedReadableStream_1.flush)(buffers, mode);
        if ((0, createBufferedReadableStream_1.sizeOf)(remainder) > 0) {
          downstream.push(remainder);
        }
      }
      downstream.push(null);
    });
    return downstream;
  }
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/getAwsChunkedEncodingStream.js
var require_getAwsChunkedEncodingStream = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getAwsChunkedEncodingStream = undefined;
  var stream_1 = __require("stream");
  var getAwsChunkedEncodingStream2 = (readableStream, options) => {
    const { base64Encoder, bodyLengthChecker, checksumAlgorithmFn, checksumLocationName, streamHasher } = options;
    const checksumRequired = base64Encoder !== undefined && checksumAlgorithmFn !== undefined && checksumLocationName !== undefined && streamHasher !== undefined;
    const digest = checksumRequired ? streamHasher(checksumAlgorithmFn, readableStream) : undefined;
    const awsChunkedEncodingStream = new stream_1.Readable({ read: () => {} });
    readableStream.on("data", (data) => {
      const length = bodyLengthChecker(data) || 0;
      awsChunkedEncodingStream.push(`${length.toString(16)}\r
`);
      awsChunkedEncodingStream.push(data);
      awsChunkedEncodingStream.push(`\r
`);
    });
    readableStream.on("end", async () => {
      awsChunkedEncodingStream.push(`0\r
`);
      if (checksumRequired) {
        const checksum = base64Encoder(await digest);
        awsChunkedEncodingStream.push(`${checksumLocationName}:${checksum}\r
`);
        awsChunkedEncodingStream.push(`\r
`);
      }
      awsChunkedEncodingStream.push(null);
    });
    return awsChunkedEncodingStream;
  };
  exports.getAwsChunkedEncodingStream = getAwsChunkedEncodingStream2;
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/headStream.browser.js
var require_headStream_browser = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.headStream = headStream2;
  async function headStream2(stream, bytes) {
    var _a;
    let byteLengthCounter = 0;
    const chunks = [];
    const reader = stream.getReader();
    let isDone = false;
    while (!isDone) {
      const { done, value } = await reader.read();
      if (value) {
        chunks.push(value);
        byteLengthCounter += (_a = value === null || value === undefined ? undefined : value.byteLength) !== null && _a !== undefined ? _a : 0;
      }
      if (byteLengthCounter >= bytes) {
        break;
      }
      isDone = done;
    }
    reader.releaseLock();
    const collected = new Uint8Array(Math.min(bytes, byteLengthCounter));
    let offset = 0;
    for (const chunk of chunks) {
      if (chunk.byteLength > collected.byteLength - offset) {
        collected.set(chunk.subarray(0, collected.byteLength - offset), offset);
        break;
      } else {
        collected.set(chunk, offset);
      }
      offset += chunk.length;
    }
    return collected;
  }
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/headStream.js
var require_headStream = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.headStream = undefined;
  var stream_1 = __require("stream");
  var headStream_browser_1 = require_headStream_browser();
  var stream_type_check_1 = require_stream_type_check();
  var headStream2 = (stream, bytes) => {
    if ((0, stream_type_check_1.isReadableStream)(stream)) {
      return (0, headStream_browser_1.headStream)(stream, bytes);
    }
    return new Promise((resolve, reject) => {
      const collector = new Collector;
      collector.limit = bytes;
      stream.pipe(collector);
      stream.on("error", (err) => {
        collector.end();
        reject(err);
      });
      collector.on("error", reject);
      collector.on("finish", function() {
        const bytes2 = new Uint8Array(Buffer.concat(this.buffers));
        resolve(bytes2);
      });
    });
  };
  exports.headStream = headStream2;

  class Collector extends stream_1.Writable {
    constructor() {
      super(...arguments);
      this.buffers = [];
      this.limit = Infinity;
      this.bytesBuffered = 0;
    }
    _write(chunk, encoding, callback) {
      var _a;
      this.buffers.push(chunk);
      this.bytesBuffered += (_a = chunk.byteLength) !== null && _a !== undefined ? _a : 0;
      if (this.bytesBuffered >= this.limit) {
        const excess = this.bytesBuffered - this.limit;
        const tailBuffer = this.buffers[this.buffers.length - 1];
        this.buffers[this.buffers.length - 1] = tailBuffer.subarray(0, tailBuffer.byteLength - excess);
        this.emit("finish");
      }
      callback();
    }
  }
});

// ../../../../node_modules/@smithy/fetch-http-handler/dist-cjs/index.js
var require_dist_cjs11 = __commonJS((exports, module) => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var src_exports = {};
  __export(src_exports, {
    FetchHttpHandler: () => FetchHttpHandler,
    keepAliveSupport: () => keepAliveSupport,
    streamCollector: () => streamCollector
  });
  module.exports = __toCommonJS(src_exports);
  var import_protocol_http = require_dist_cjs2();
  var import_querystring_builder = require_dist_cjs5();
  function createRequest(url, requestOptions) {
    return new Request(url, requestOptions);
  }
  __name(createRequest, "createRequest");
  function requestTimeout(timeoutInMs = 0) {
    return new Promise((resolve, reject) => {
      if (timeoutInMs) {
        setTimeout(() => {
          const timeoutError = new Error(`Request did not complete within ${timeoutInMs} ms`);
          timeoutError.name = "TimeoutError";
          reject(timeoutError);
        }, timeoutInMs);
      }
    });
  }
  __name(requestTimeout, "requestTimeout");
  var keepAliveSupport = {
    supported: undefined
  };
  var FetchHttpHandler = class _FetchHttpHandler {
    static {
      __name(this, "FetchHttpHandler");
    }
    static create(instanceOrOptions) {
      if (typeof instanceOrOptions?.handle === "function") {
        return instanceOrOptions;
      }
      return new _FetchHttpHandler(instanceOrOptions);
    }
    constructor(options) {
      if (typeof options === "function") {
        this.configProvider = options().then((opts) => opts || {});
      } else {
        this.config = options ?? {};
        this.configProvider = Promise.resolve(this.config);
      }
      if (keepAliveSupport.supported === undefined) {
        keepAliveSupport.supported = Boolean(typeof Request !== "undefined" && "keepalive" in createRequest("https://[::1]"));
      }
    }
    destroy() {}
    async handle(request, { abortSignal } = {}) {
      if (!this.config) {
        this.config = await this.configProvider;
      }
      const requestTimeoutInMs = this.config.requestTimeout;
      const keepAlive = this.config.keepAlive === true;
      const credentials = this.config.credentials;
      if (abortSignal?.aborted) {
        const abortError = new Error("Request aborted");
        abortError.name = "AbortError";
        return Promise.reject(abortError);
      }
      let path = request.path;
      const queryString = (0, import_querystring_builder.buildQueryString)(request.query || {});
      if (queryString) {
        path += `?${queryString}`;
      }
      if (request.fragment) {
        path += `#${request.fragment}`;
      }
      let auth = "";
      if (request.username != null || request.password != null) {
        const username = request.username ?? "";
        const password = request.password ?? "";
        auth = `${username}:${password}@`;
      }
      const { port, method } = request;
      const url = `${request.protocol}//${auth}${request.hostname}${port ? `:${port}` : ""}${path}`;
      const body = method === "GET" || method === "HEAD" ? undefined : request.body;
      const requestOptions = {
        body,
        headers: new Headers(request.headers),
        method,
        credentials
      };
      if (this.config?.cache) {
        requestOptions.cache = this.config.cache;
      }
      if (body) {
        requestOptions.duplex = "half";
      }
      if (typeof AbortController !== "undefined") {
        requestOptions.signal = abortSignal;
      }
      if (keepAliveSupport.supported) {
        requestOptions.keepalive = keepAlive;
      }
      if (typeof this.config.requestInit === "function") {
        Object.assign(requestOptions, this.config.requestInit(request));
      }
      let removeSignalEventListener = /* @__PURE__ */ __name(() => {}, "removeSignalEventListener");
      const fetchRequest = createRequest(url, requestOptions);
      const raceOfPromises = [
        fetch(fetchRequest).then((response) => {
          const fetchHeaders = response.headers;
          const transformedHeaders = {};
          for (const pair of fetchHeaders.entries()) {
            transformedHeaders[pair[0]] = pair[1];
          }
          const hasReadableStream = response.body != null;
          if (!hasReadableStream) {
            return response.blob().then((body2) => ({
              response: new import_protocol_http.HttpResponse({
                headers: transformedHeaders,
                reason: response.statusText,
                statusCode: response.status,
                body: body2
              })
            }));
          }
          return {
            response: new import_protocol_http.HttpResponse({
              headers: transformedHeaders,
              reason: response.statusText,
              statusCode: response.status,
              body: response.body
            })
          };
        }),
        requestTimeout(requestTimeoutInMs)
      ];
      if (abortSignal) {
        raceOfPromises.push(new Promise((resolve, reject) => {
          const onAbort = /* @__PURE__ */ __name(() => {
            const abortError = new Error("Request aborted");
            abortError.name = "AbortError";
            reject(abortError);
          }, "onAbort");
          if (typeof abortSignal.addEventListener === "function") {
            const signal = abortSignal;
            signal.addEventListener("abort", onAbort, { once: true });
            removeSignalEventListener = /* @__PURE__ */ __name(() => signal.removeEventListener("abort", onAbort), "removeSignalEventListener");
          } else {
            abortSignal.onabort = onAbort;
          }
        }));
      }
      return Promise.race(raceOfPromises).finally(removeSignalEventListener);
    }
    updateHttpClientConfig(key, value) {
      this.config = undefined;
      this.configProvider = this.configProvider.then((config) => {
        config[key] = value;
        return config;
      });
    }
    httpHandlerConfigs() {
      return this.config ?? {};
    }
  };
  var import_util_base64 = require_dist_cjs10();
  var streamCollector = /* @__PURE__ */ __name(async (stream) => {
    if (typeof Blob === "function" && stream instanceof Blob || stream.constructor?.name === "Blob") {
      if (Blob.prototype.arrayBuffer !== undefined) {
        return new Uint8Array(await stream.arrayBuffer());
      }
      return collectBlob(stream);
    }
    return collectStream(stream);
  }, "streamCollector");
  async function collectBlob(blob) {
    const base64 = await readToBase64(blob);
    const arrayBuffer = (0, import_util_base64.fromBase64)(base64);
    return new Uint8Array(arrayBuffer);
  }
  __name(collectBlob, "collectBlob");
  async function collectStream(stream) {
    const chunks = [];
    const reader = stream.getReader();
    let isDone = false;
    let length = 0;
    while (!isDone) {
      const { done, value } = await reader.read();
      if (value) {
        chunks.push(value);
        length += value.length;
      }
      isDone = done;
    }
    const collected = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
      collected.set(chunk, offset);
      offset += chunk.length;
    }
    return collected;
  }
  __name(collectStream, "collectStream");
  function readToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onloadend = () => {
        if (reader.readyState !== 2) {
          return reject(new Error("Reader aborted too early"));
        }
        const result = reader.result ?? "";
        const commaIndex = result.indexOf(",");
        const dataOffset = commaIndex > -1 ? commaIndex + 1 : result.length;
        resolve(result.substring(dataOffset));
      };
      reader.onabort = () => reject(new Error("Read aborted"));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }
  __name(readToBase64, "readToBase64");
});

// ../../../../node_modules/@smithy/util-hex-encoding/dist-cjs/index.js
var require_dist_cjs12 = __commonJS((exports, module) => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var src_exports = {};
  __export(src_exports, {
    fromHex: () => fromHex,
    toHex: () => toHex
  });
  module.exports = __toCommonJS(src_exports);
  var SHORT_TO_HEX = {};
  var HEX_TO_SHORT = {};
  for (let i = 0;i < 256; i++) {
    let encodedByte = i.toString(16).toLowerCase();
    if (encodedByte.length === 1) {
      encodedByte = `0${encodedByte}`;
    }
    SHORT_TO_HEX[i] = encodedByte;
    HEX_TO_SHORT[encodedByte] = i;
  }
  function fromHex(encoded) {
    if (encoded.length % 2 !== 0) {
      throw new Error("Hex encoded strings must have an even number length");
    }
    const out = new Uint8Array(encoded.length / 2);
    for (let i = 0;i < encoded.length; i += 2) {
      const encodedByte = encoded.slice(i, i + 2).toLowerCase();
      if (encodedByte in HEX_TO_SHORT) {
        out[i / 2] = HEX_TO_SHORT[encodedByte];
      } else {
        throw new Error(`Cannot decode unrecognized sequence ${encodedByte} as hexadecimal`);
      }
    }
    return out;
  }
  __name(fromHex, "fromHex");
  function toHex(bytes) {
    let out = "";
    for (let i = 0;i < bytes.byteLength; i++) {
      out += SHORT_TO_HEX[bytes[i]];
    }
    return out;
  }
  __name(toHex, "toHex");
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/sdk-stream-mixin.browser.js
var require_sdk_stream_mixin_browser = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.sdkStreamMixin = undefined;
  var fetch_http_handler_1 = require_dist_cjs11();
  var util_base64_1 = require_dist_cjs10();
  var util_hex_encoding_1 = require_dist_cjs12();
  var util_utf8_1 = require_dist_cjs9();
  var stream_type_check_1 = require_stream_type_check();
  var ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED = "The stream has already been transformed.";
  var sdkStreamMixin2 = (stream) => {
    var _a, _b;
    if (!isBlobInstance(stream) && !(0, stream_type_check_1.isReadableStream)(stream)) {
      const name = ((_b = (_a = stream === null || stream === undefined ? undefined : stream.__proto__) === null || _a === undefined ? undefined : _a.constructor) === null || _b === undefined ? undefined : _b.name) || stream;
      throw new Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${name}`);
    }
    let transformed = false;
    const transformToByteArray = async () => {
      if (transformed) {
        throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
      }
      transformed = true;
      return await (0, fetch_http_handler_1.streamCollector)(stream);
    };
    const blobToWebStream = (blob) => {
      if (typeof blob.stream !== "function") {
        throw new Error(`Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.
` + "If you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/p/fetch-streaming-body");
      }
      return blob.stream();
    };
    return Object.assign(stream, {
      transformToByteArray,
      transformToString: async (encoding) => {
        const buf = await transformToByteArray();
        if (encoding === "base64") {
          return (0, util_base64_1.toBase64)(buf);
        } else if (encoding === "hex") {
          return (0, util_hex_encoding_1.toHex)(buf);
        } else if (encoding === undefined || encoding === "utf8" || encoding === "utf-8") {
          return (0, util_utf8_1.toUtf8)(buf);
        } else if (typeof TextDecoder === "function") {
          return new TextDecoder(encoding).decode(buf);
        } else {
          throw new Error("TextDecoder is not available, please make sure polyfill is provided.");
        }
      },
      transformToWebStream: () => {
        if (transformed) {
          throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
        }
        transformed = true;
        if (isBlobInstance(stream)) {
          return blobToWebStream(stream);
        } else if ((0, stream_type_check_1.isReadableStream)(stream)) {
          return stream;
        } else {
          throw new Error(`Cannot transform payload to web stream, got ${stream}`);
        }
      }
    });
  };
  exports.sdkStreamMixin = sdkStreamMixin2;
  var isBlobInstance = (stream) => typeof Blob === "function" && stream instanceof Blob;
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/sdk-stream-mixin.js
var require_sdk_stream_mixin = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.sdkStreamMixin = undefined;
  var node_http_handler_1 = require_dist_cjs6();
  var util_buffer_from_1 = require_dist_cjs8();
  var stream_1 = __require("stream");
  var sdk_stream_mixin_browser_1 = require_sdk_stream_mixin_browser();
  var ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED = "The stream has already been transformed.";
  var sdkStreamMixin2 = (stream) => {
    var _a, _b;
    if (!(stream instanceof stream_1.Readable)) {
      try {
        return (0, sdk_stream_mixin_browser_1.sdkStreamMixin)(stream);
      } catch (e) {
        const name = ((_b = (_a = stream === null || stream === undefined ? undefined : stream.__proto__) === null || _a === undefined ? undefined : _a.constructor) === null || _b === undefined ? undefined : _b.name) || stream;
        throw new Error(`Unexpected stream implementation, expect Stream.Readable instance, got ${name}`);
      }
    }
    let transformed = false;
    const transformToByteArray = async () => {
      if (transformed) {
        throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
      }
      transformed = true;
      return await (0, node_http_handler_1.streamCollector)(stream);
    };
    return Object.assign(stream, {
      transformToByteArray,
      transformToString: async (encoding) => {
        const buf = await transformToByteArray();
        if (encoding === undefined || Buffer.isEncoding(encoding)) {
          return (0, util_buffer_from_1.fromArrayBuffer)(buf.buffer, buf.byteOffset, buf.byteLength).toString(encoding);
        } else {
          const decoder = new TextDecoder(encoding);
          return decoder.decode(buf);
        }
      },
      transformToWebStream: () => {
        if (transformed) {
          throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
        }
        if (stream.readableFlowing !== null) {
          throw new Error("The stream has been consumed by other callbacks.");
        }
        if (typeof stream_1.Readable.toWeb !== "function") {
          throw new Error("Readable.toWeb() is not supported. Please ensure a polyfill is available.");
        }
        transformed = true;
        return stream_1.Readable.toWeb(stream);
      }
    });
  };
  exports.sdkStreamMixin = sdkStreamMixin2;
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/splitStream.browser.js
var require_splitStream_browser = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.splitStream = splitStream2;
  async function splitStream2(stream) {
    if (typeof stream.stream === "function") {
      stream = stream.stream();
    }
    const readableStream = stream;
    return readableStream.tee();
  }
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/splitStream.js
var require_splitStream = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.splitStream = splitStream2;
  var stream_1 = __require("stream");
  var splitStream_browser_1 = require_splitStream_browser();
  var stream_type_check_1 = require_stream_type_check();
  async function splitStream2(stream) {
    if ((0, stream_type_check_1.isReadableStream)(stream) || (0, stream_type_check_1.isBlob)(stream)) {
      return (0, splitStream_browser_1.splitStream)(stream);
    }
    const stream1 = new stream_1.PassThrough;
    const stream2 = new stream_1.PassThrough;
    stream.pipe(stream1);
    stream.pipe(stream2);
    return [stream1, stream2];
  }
});

// ../../../../node_modules/@smithy/util-stream/dist-cjs/index.js
var require_dist_cjs13 = __commonJS((exports, module) => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var src_exports = {};
  __export(src_exports, {
    Uint8ArrayBlobAdapter: () => Uint8ArrayBlobAdapter
  });
  module.exports = __toCommonJS(src_exports);
  var import_util_base64 = require_dist_cjs10();
  var import_util_utf8 = require_dist_cjs9();
  function transformToString(payload, encoding = "utf-8") {
    if (encoding === "base64") {
      return (0, import_util_base64.toBase64)(payload);
    }
    return (0, import_util_utf8.toUtf8)(payload);
  }
  __name(transformToString, "transformToString");
  function transformFromString(str, encoding) {
    if (encoding === "base64") {
      return Uint8ArrayBlobAdapter.mutate((0, import_util_base64.fromBase64)(str));
    }
    return Uint8ArrayBlobAdapter.mutate((0, import_util_utf8.fromUtf8)(str));
  }
  __name(transformFromString, "transformFromString");
  var Uint8ArrayBlobAdapter = class _Uint8ArrayBlobAdapter extends Uint8Array {
    static {
      __name(this, "Uint8ArrayBlobAdapter");
    }
    static fromString(source, encoding = "utf-8") {
      switch (typeof source) {
        case "string":
          return transformFromString(source, encoding);
        default:
          throw new Error(`Unsupported conversion from ${typeof source} to Uint8ArrayBlobAdapter.`);
      }
    }
    static mutate(source) {
      Object.setPrototypeOf(source, _Uint8ArrayBlobAdapter.prototype);
      return source;
    }
    transformToString(encoding = "utf-8") {
      return transformToString(this, encoding);
    }
  };
  __reExport(src_exports, require_ChecksumStream(), module.exports);
  __reExport(src_exports, require_createChecksumStream(), module.exports);
  __reExport(src_exports, require_createBufferedReadable(), module.exports);
  __reExport(src_exports, require_getAwsChunkedEncodingStream(), module.exports);
  __reExport(src_exports, require_headStream(), module.exports);
  __reExport(src_exports, require_sdk_stream_mixin(), module.exports);
  __reExport(src_exports, require_splitStream(), module.exports);
  __reExport(src_exports, require_stream_type_check(), module.exports);
});

// ../../../../node_modules/@smithy/core/dist-cjs/submodules/protocols/index.js
var require_protocols = __commonJS((exports, module) => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var protocols_exports = {};
  __export(protocols_exports, {
    FromStringShapeDeserializer: () => FromStringShapeDeserializer,
    HttpBindingProtocol: () => HttpBindingProtocol,
    HttpInterceptingShapeDeserializer: () => HttpInterceptingShapeDeserializer,
    HttpInterceptingShapeSerializer: () => HttpInterceptingShapeSerializer,
    RequestBuilder: () => RequestBuilder,
    RpcProtocol: () => RpcProtocol,
    ToStringShapeSerializer: () => ToStringShapeSerializer,
    collectBody: () => collectBody,
    determineTimestampFormat: () => determineTimestampFormat,
    extendedEncodeURIComponent: () => extendedEncodeURIComponent,
    requestBuilder: () => requestBuilder,
    resolvedPath: () => resolvedPath
  });
  module.exports = __toCommonJS(protocols_exports);
  var import_util_stream = require_dist_cjs13();
  var collectBody = async (streamBody = new Uint8Array, context) => {
    if (streamBody instanceof Uint8Array) {
      return import_util_stream.Uint8ArrayBlobAdapter.mutate(streamBody);
    }
    if (!streamBody) {
      return import_util_stream.Uint8ArrayBlobAdapter.mutate(new Uint8Array);
    }
    const fromContext = context.streamCollector(streamBody);
    return import_util_stream.Uint8ArrayBlobAdapter.mutate(await fromContext);
  };
  function extendedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }
  var import_schema2 = require_schema();
  var import_protocol_http2 = require_dist_cjs2();
  var import_schema = require_schema();
  var import_serde = require_serde();
  var import_protocol_http = require_dist_cjs2();
  var import_util_stream2 = require_dist_cjs13();
  var HttpProtocol = class {
    constructor(options) {
      this.options = options;
    }
    getRequestType() {
      return import_protocol_http.HttpRequest;
    }
    getResponseType() {
      return import_protocol_http.HttpResponse;
    }
    setSerdeContext(serdeContext) {
      this.serdeContext = serdeContext;
      this.serializer.setSerdeContext(serdeContext);
      this.deserializer.setSerdeContext(serdeContext);
      if (this.getPayloadCodec()) {
        this.getPayloadCodec().setSerdeContext(serdeContext);
      }
    }
    updateServiceEndpoint(request, endpoint) {
      if ("url" in endpoint) {
        request.protocol = endpoint.url.protocol;
        request.hostname = endpoint.url.hostname;
        request.port = endpoint.url.port ? Number(endpoint.url.port) : undefined;
        request.path = endpoint.url.pathname;
        request.fragment = endpoint.url.hash || undefined;
        request.username = endpoint.url.username || undefined;
        request.password = endpoint.url.password || undefined;
        for (const [k, v] of endpoint.url.searchParams.entries()) {
          if (!request.query) {
            request.query = {};
          }
          request.query[k] = v;
        }
        return request;
      } else {
        request.protocol = endpoint.protocol;
        request.hostname = endpoint.hostname;
        request.port = endpoint.port ? Number(endpoint.port) : undefined;
        request.path = endpoint.path;
        request.query = {
          ...endpoint.query
        };
        return request;
      }
    }
    setHostPrefix(request, operationSchema, input) {
      const operationNs = import_schema.NormalizedSchema.of(operationSchema);
      const inputNs = import_schema.NormalizedSchema.of(operationSchema.input);
      if (operationNs.getMergedTraits().endpoint) {
        let hostPrefix = operationNs.getMergedTraits().endpoint?.[0];
        if (typeof hostPrefix === "string") {
          const hostLabelInputs = [...inputNs.structIterator()].filter(([, member]) => member.getMergedTraits().hostLabel);
          for (const [name] of hostLabelInputs) {
            const replacement = input[name];
            if (typeof replacement !== "string") {
              throw new Error(`@smithy/core/schema - ${name} in input must be a string as hostLabel.`);
            }
            hostPrefix = hostPrefix.replace(`{${name}}`, replacement);
          }
          request.hostname = hostPrefix + request.hostname;
        }
      }
    }
    deserializeMetadata(output) {
      return {
        httpStatusCode: output.statusCode,
        requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"]
      };
    }
    async deserializeHttpMessage(schema, context, response, arg4, arg5) {
      let dataObject;
      if (arg4 instanceof Set) {
        dataObject = arg5;
      } else {
        dataObject = arg4;
      }
      const deserializer = this.deserializer;
      const ns = import_schema.NormalizedSchema.of(schema);
      const nonHttpBindingMembers = [];
      for (const [memberName, memberSchema] of ns.structIterator()) {
        const memberTraits = memberSchema.getMemberTraits();
        if (memberTraits.httpPayload) {
          const isStreaming = memberSchema.isStreaming();
          if (isStreaming) {
            const isEventStream = memberSchema.isStructSchema();
            if (isEventStream) {
              const context2 = this.serdeContext;
              if (!context2.eventStreamMarshaller) {
                throw new Error("@smithy/core - HttpProtocol: eventStreamMarshaller missing in serdeContext.");
              }
              const memberSchemas = memberSchema.getMemberSchemas();
              dataObject[memberName] = context2.eventStreamMarshaller.deserialize(response.body, async (event) => {
                const unionMember = Object.keys(event).find((key) => {
                  return key !== "__type";
                }) ?? "";
                if (unionMember in memberSchemas) {
                  const eventStreamSchema = memberSchemas[unionMember];
                  return {
                    [unionMember]: await deserializer.read(eventStreamSchema, event[unionMember].body)
                  };
                } else {
                  return {
                    $unknown: event
                  };
                }
              });
            } else {
              dataObject[memberName] = (0, import_util_stream2.sdkStreamMixin)(response.body);
            }
          } else if (response.body) {
            const bytes = await collectBody(response.body, context);
            if (bytes.byteLength > 0) {
              dataObject[memberName] = await deserializer.read(memberSchema, bytes);
            }
          }
        } else if (memberTraits.httpHeader) {
          const key = String(memberTraits.httpHeader).toLowerCase();
          const value = response.headers[key];
          if (value != null) {
            if (memberSchema.isListSchema()) {
              const headerListValueSchema = memberSchema.getValueSchema();
              let sections;
              if (headerListValueSchema.isTimestampSchema() && headerListValueSchema.getSchema() === import_schema.SCHEMA.TIMESTAMP_DEFAULT) {
                sections = (0, import_serde.splitEvery)(value, ",", 2);
              } else {
                sections = (0, import_serde.splitHeader)(value);
              }
              const list = [];
              for (const section of sections) {
                list.push(await deserializer.read([headerListValueSchema, { httpHeader: key }], section.trim()));
              }
              dataObject[memberName] = list;
            } else {
              dataObject[memberName] = await deserializer.read(memberSchema, value);
            }
          }
        } else if (memberTraits.httpPrefixHeaders !== undefined) {
          dataObject[memberName] = {};
          for (const [header, value] of Object.entries(response.headers)) {
            if (header.startsWith(memberTraits.httpPrefixHeaders)) {
              dataObject[memberName][header.slice(memberTraits.httpPrefixHeaders.length)] = await deserializer.read([memberSchema.getValueSchema(), { httpHeader: header }], value);
            }
          }
        } else if (memberTraits.httpResponseCode) {
          dataObject[memberName] = response.statusCode;
        } else {
          nonHttpBindingMembers.push(memberName);
        }
      }
      return nonHttpBindingMembers;
    }
  };
  var HttpBindingProtocol = class extends HttpProtocol {
    async serializeRequest(operationSchema, input, context) {
      const serializer = this.serializer;
      const query = {};
      const headers = {};
      const endpoint = await context.endpoint();
      const ns = import_schema2.NormalizedSchema.of(operationSchema?.input);
      const schema = ns.getSchema();
      let hasNonHttpBindingMember = false;
      let payload;
      const request = new import_protocol_http2.HttpRequest({
        protocol: "",
        hostname: "",
        port: undefined,
        path: "",
        fragment: undefined,
        query,
        headers,
        body: undefined
      });
      if (endpoint) {
        this.updateServiceEndpoint(request, endpoint);
        this.setHostPrefix(request, operationSchema, input);
        const opTraits = import_schema2.NormalizedSchema.translateTraits(operationSchema.traits);
        if (opTraits.http) {
          request.method = opTraits.http[0];
          const [path, search] = opTraits.http[1].split("?");
          if (request.path == "/") {
            request.path = path;
          } else {
            request.path += path;
          }
          const traitSearchParams = new URLSearchParams(search ?? "");
          Object.assign(query, Object.fromEntries(traitSearchParams));
        }
      }
      const _input = {
        ...input
      };
      for (const memberName of Object.keys(_input)) {
        const memberNs = ns.getMemberSchema(memberName);
        if (memberNs === undefined) {
          continue;
        }
        const memberTraits = memberNs.getMergedTraits();
        const inputMember = _input[memberName];
        if (memberTraits.httpPayload) {
          const isStreaming = memberNs.isStreaming();
          if (isStreaming) {
            const isEventStream = memberNs.isStructSchema();
            if (isEventStream) {
              throw new Error("serialization of event streams is not yet implemented");
            } else {
              payload = inputMember;
            }
          } else {
            serializer.write(memberNs, inputMember);
            payload = serializer.flush();
          }
        } else if (memberTraits.httpLabel) {
          serializer.write(memberNs, inputMember);
          const replacement = serializer.flush();
          if (request.path.includes(`{${memberName}+}`)) {
            request.path = request.path.replace(`{${memberName}+}`, replacement.split("/").map(extendedEncodeURIComponent).join("/"));
          } else if (request.path.includes(`{${memberName}}`)) {
            request.path = request.path.replace(`{${memberName}}`, extendedEncodeURIComponent(replacement));
          }
          delete _input[memberName];
        } else if (memberTraits.httpHeader) {
          serializer.write(memberNs, inputMember);
          headers[memberTraits.httpHeader.toLowerCase()] = String(serializer.flush());
          delete _input[memberName];
        } else if (typeof memberTraits.httpPrefixHeaders === "string") {
          for (const [key, val] of Object.entries(inputMember)) {
            const amalgam = memberTraits.httpPrefixHeaders + key;
            serializer.write([memberNs.getValueSchema(), { httpHeader: amalgam }], val);
            headers[amalgam.toLowerCase()] = serializer.flush();
          }
          delete _input[memberName];
        } else if (memberTraits.httpQuery || memberTraits.httpQueryParams) {
          this.serializeQuery(memberNs, inputMember, query);
          delete _input[memberName];
        } else {
          hasNonHttpBindingMember = true;
        }
      }
      if (hasNonHttpBindingMember && input) {
        serializer.write(schema, _input);
        payload = serializer.flush();
      }
      request.headers = headers;
      request.query = query;
      request.body = payload;
      return request;
    }
    serializeQuery(ns, data, query) {
      const serializer = this.serializer;
      const traits = ns.getMergedTraits();
      if (traits.httpQueryParams) {
        for (const [key, val] of Object.entries(data)) {
          if (!(key in query)) {
            this.serializeQuery(import_schema2.NormalizedSchema.of([
              ns.getValueSchema(),
              {
                ...traits,
                httpQuery: key,
                httpQueryParams: undefined
              }
            ]), val, query);
          }
        }
        return;
      }
      if (ns.isListSchema()) {
        const sparse = !!ns.getMergedTraits().sparse;
        const buffer = [];
        for (const item of data) {
          serializer.write([ns.getValueSchema(), traits], item);
          const serializable = serializer.flush();
          if (sparse || serializable !== undefined) {
            buffer.push(serializable);
          }
        }
        query[traits.httpQuery] = buffer;
      } else {
        serializer.write([ns, traits], data);
        query[traits.httpQuery] = serializer.flush();
      }
    }
    async deserializeResponse(operationSchema, context, response) {
      const deserializer = this.deserializer;
      const ns = import_schema2.NormalizedSchema.of(operationSchema.output);
      const dataObject = {};
      if (response.statusCode >= 300) {
        const bytes = await collectBody(response.body, context);
        if (bytes.byteLength > 0) {
          Object.assign(dataObject, await deserializer.read(import_schema2.SCHEMA.DOCUMENT, bytes));
        }
        await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
        throw new Error("@smithy/core/protocols - HTTP Protocol error handler failed to throw.");
      }
      for (const header in response.headers) {
        const value = response.headers[header];
        delete response.headers[header];
        response.headers[header.toLowerCase()] = value;
      }
      const nonHttpBindingMembers = await this.deserializeHttpMessage(ns, context, response, dataObject);
      if (nonHttpBindingMembers.length) {
        const bytes = await collectBody(response.body, context);
        if (bytes.byteLength > 0) {
          const dataFromBody = await deserializer.read(ns, bytes);
          for (const member of nonHttpBindingMembers) {
            dataObject[member] = dataFromBody[member];
          }
        }
      }
      const output = {
        $metadata: this.deserializeMetadata(response),
        ...dataObject
      };
      return output;
    }
  };
  var import_schema3 = require_schema();
  var import_protocol_http3 = require_dist_cjs2();
  var RpcProtocol = class extends HttpProtocol {
    async serializeRequest(operationSchema, input, context) {
      const serializer = this.serializer;
      const query = {};
      const headers = {};
      const endpoint = await context.endpoint();
      const ns = import_schema3.NormalizedSchema.of(operationSchema?.input);
      const schema = ns.getSchema();
      let payload;
      const request = new import_protocol_http3.HttpRequest({
        protocol: "",
        hostname: "",
        port: undefined,
        path: "/",
        fragment: undefined,
        query,
        headers,
        body: undefined
      });
      if (endpoint) {
        this.updateServiceEndpoint(request, endpoint);
        this.setHostPrefix(request, operationSchema, input);
      }
      const _input = {
        ...input
      };
      if (input) {
        serializer.write(schema, _input);
        payload = serializer.flush();
      }
      request.headers = headers;
      request.query = query;
      request.body = payload;
      request.method = "POST";
      return request;
    }
    async deserializeResponse(operationSchema, context, response) {
      const deserializer = this.deserializer;
      const ns = import_schema3.NormalizedSchema.of(operationSchema.output);
      const dataObject = {};
      if (response.statusCode >= 300) {
        const bytes2 = await collectBody(response.body, context);
        if (bytes2.byteLength > 0) {
          Object.assign(dataObject, await deserializer.read(import_schema3.SCHEMA.DOCUMENT, bytes2));
        }
        await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
        throw new Error("@smithy/core/protocols - RPC Protocol error handler failed to throw.");
      }
      for (const header in response.headers) {
        const value = response.headers[header];
        delete response.headers[header];
        response.headers[header.toLowerCase()] = value;
      }
      const bytes = await collectBody(response.body, context);
      if (bytes.byteLength > 0) {
        Object.assign(dataObject, await deserializer.read(ns, bytes));
      }
      const output = {
        $metadata: this.deserializeMetadata(response),
        ...dataObject
      };
      return output;
    }
  };
  var import_protocol_http4 = require_dist_cjs2();
  var resolvedPath = (resolvedPath2, input, memberName, labelValueProvider, uriLabel, isGreedyLabel) => {
    if (input != null && input[memberName] !== undefined) {
      const labelValue = labelValueProvider();
      if (labelValue.length <= 0) {
        throw new Error("Empty value provided for input HTTP label: " + memberName + ".");
      }
      resolvedPath2 = resolvedPath2.replace(uriLabel, isGreedyLabel ? labelValue.split("/").map((segment) => extendedEncodeURIComponent(segment)).join("/") : extendedEncodeURIComponent(labelValue));
    } else {
      throw new Error("No value provided for input HTTP label: " + memberName + ".");
    }
    return resolvedPath2;
  };
  function requestBuilder(input, context) {
    return new RequestBuilder(input, context);
  }
  var RequestBuilder = class {
    constructor(input, context) {
      this.input = input;
      this.context = context;
      this.query = {};
      this.method = "";
      this.headers = {};
      this.path = "";
      this.body = null;
      this.hostname = "";
      this.resolvePathStack = [];
    }
    async build() {
      const { hostname, protocol = "https", port, path: basePath } = await this.context.endpoint();
      this.path = basePath;
      for (const resolvePath of this.resolvePathStack) {
        resolvePath(this.path);
      }
      return new import_protocol_http4.HttpRequest({
        protocol,
        hostname: this.hostname || hostname,
        port,
        method: this.method,
        path: this.path,
        query: this.query,
        body: this.body,
        headers: this.headers
      });
    }
    hn(hostname) {
      this.hostname = hostname;
      return this;
    }
    bp(uriLabel) {
      this.resolvePathStack.push((basePath) => {
        this.path = `${basePath?.endsWith("/") ? basePath.slice(0, -1) : basePath || ""}` + uriLabel;
      });
      return this;
    }
    p(memberName, labelValueProvider, uriLabel, isGreedyLabel) {
      this.resolvePathStack.push((path) => {
        this.path = resolvedPath(path, this.input, memberName, labelValueProvider, uriLabel, isGreedyLabel);
      });
      return this;
    }
    h(headers) {
      this.headers = headers;
      return this;
    }
    q(query) {
      this.query = query;
      return this;
    }
    b(body) {
      this.body = body;
      return this;
    }
    m(method) {
      this.method = method;
      return this;
    }
  };
  var import_schema5 = require_schema();
  var import_serde2 = require_serde();
  var import_util_base64 = require_dist_cjs10();
  var import_util_utf8 = require_dist_cjs9();
  var import_schema4 = require_schema();
  function determineTimestampFormat(ns, settings) {
    if (settings.timestampFormat.useTrait) {
      if (ns.isTimestampSchema() && (ns.getSchema() === import_schema4.SCHEMA.TIMESTAMP_DATE_TIME || ns.getSchema() === import_schema4.SCHEMA.TIMESTAMP_HTTP_DATE || ns.getSchema() === import_schema4.SCHEMA.TIMESTAMP_EPOCH_SECONDS)) {
        return ns.getSchema();
      }
    }
    const { httpLabel, httpPrefixHeaders, httpHeader, httpQuery } = ns.getMergedTraits();
    const bindingFormat = settings.httpBindings ? typeof httpPrefixHeaders === "string" || Boolean(httpHeader) ? import_schema4.SCHEMA.TIMESTAMP_HTTP_DATE : Boolean(httpQuery) || Boolean(httpLabel) ? import_schema4.SCHEMA.TIMESTAMP_DATE_TIME : undefined : undefined;
    return bindingFormat ?? settings.timestampFormat.default;
  }
  var FromStringShapeDeserializer = class {
    constructor(settings) {
      this.settings = settings;
    }
    setSerdeContext(serdeContext) {
      this.serdeContext = serdeContext;
    }
    read(_schema, data) {
      const ns = import_schema5.NormalizedSchema.of(_schema);
      if (ns.isListSchema()) {
        return (0, import_serde2.splitHeader)(data).map((item) => this.read(ns.getValueSchema(), item));
      }
      if (ns.isBlobSchema()) {
        return (this.serdeContext?.base64Decoder ?? import_util_base64.fromBase64)(data);
      }
      if (ns.isTimestampSchema()) {
        const format = determineTimestampFormat(ns, this.settings);
        switch (format) {
          case import_schema5.SCHEMA.TIMESTAMP_DATE_TIME:
            return (0, import_serde2.parseRfc3339DateTimeWithOffset)(data);
          case import_schema5.SCHEMA.TIMESTAMP_HTTP_DATE:
            return (0, import_serde2.parseRfc7231DateTime)(data);
          case import_schema5.SCHEMA.TIMESTAMP_EPOCH_SECONDS:
            return (0, import_serde2.parseEpochTimestamp)(data);
          default:
            console.warn("Missing timestamp format, parsing value with Date constructor:", data);
            return new Date(data);
        }
      }
      if (ns.isStringSchema()) {
        const mediaType = ns.getMergedTraits().mediaType;
        let intermediateValue = data;
        if (mediaType) {
          if (ns.getMergedTraits().httpHeader) {
            intermediateValue = this.base64ToUtf8(intermediateValue);
          }
          const isJson = mediaType === "application/json" || mediaType.endsWith("+json");
          if (isJson) {
            intermediateValue = import_serde2.LazyJsonString.from(intermediateValue);
          }
          return intermediateValue;
        }
      }
      switch (true) {
        case ns.isNumericSchema():
          return Number(data);
        case ns.isBigIntegerSchema():
          return BigInt(data);
        case ns.isBigDecimalSchema():
          return new import_serde2.NumericValue(data, "bigDecimal");
        case ns.isBooleanSchema():
          return String(data).toLowerCase() === "true";
      }
      return data;
    }
    base64ToUtf8(base64String) {
      return (this.serdeContext?.utf8Encoder ?? import_util_utf8.toUtf8)((this.serdeContext?.base64Decoder ?? import_util_base64.fromBase64)(base64String));
    }
  };
  var import_schema6 = require_schema();
  var import_util_utf82 = require_dist_cjs9();
  var HttpInterceptingShapeDeserializer = class {
    constructor(codecDeserializer, codecSettings) {
      this.codecDeserializer = codecDeserializer;
      this.stringDeserializer = new FromStringShapeDeserializer(codecSettings);
    }
    setSerdeContext(serdeContext) {
      this.stringDeserializer.setSerdeContext(serdeContext);
      this.codecDeserializer.setSerdeContext(serdeContext);
      this.serdeContext = serdeContext;
    }
    read(schema, data) {
      const ns = import_schema6.NormalizedSchema.of(schema);
      const traits = ns.getMergedTraits();
      const toString = this.serdeContext?.utf8Encoder ?? import_util_utf82.toUtf8;
      if (traits.httpHeader || traits.httpResponseCode) {
        return this.stringDeserializer.read(ns, toString(data));
      }
      if (traits.httpPayload) {
        if (ns.isBlobSchema()) {
          const toBytes = this.serdeContext?.utf8Decoder ?? import_util_utf82.fromUtf8;
          if (typeof data === "string") {
            return toBytes(data);
          }
          return data;
        } else if (ns.isStringSchema()) {
          if ("byteLength" in data) {
            return toString(data);
          }
          return data;
        }
      }
      return this.codecDeserializer.read(ns, data);
    }
  };
  var import_schema8 = require_schema();
  var import_schema7 = require_schema();
  var import_serde3 = require_serde();
  var import_util_base642 = require_dist_cjs10();
  var ToStringShapeSerializer = class {
    constructor(settings) {
      this.settings = settings;
      this.stringBuffer = "";
      this.serdeContext = undefined;
    }
    setSerdeContext(serdeContext) {
      this.serdeContext = serdeContext;
    }
    write(schema, value) {
      const ns = import_schema7.NormalizedSchema.of(schema);
      switch (typeof value) {
        case "object":
          if (value === null) {
            this.stringBuffer = "null";
            return;
          }
          if (ns.isTimestampSchema()) {
            if (!(value instanceof Date)) {
              throw new Error(`@smithy/core/protocols - received non-Date value ${value} when schema expected Date in ${ns.getName(true)}`);
            }
            const format = determineTimestampFormat(ns, this.settings);
            switch (format) {
              case import_schema7.SCHEMA.TIMESTAMP_DATE_TIME:
                this.stringBuffer = value.toISOString().replace(".000Z", "Z");
                break;
              case import_schema7.SCHEMA.TIMESTAMP_HTTP_DATE:
                this.stringBuffer = (0, import_serde3.dateToUtcString)(value);
                break;
              case import_schema7.SCHEMA.TIMESTAMP_EPOCH_SECONDS:
                this.stringBuffer = String(value.getTime() / 1000);
                break;
              default:
                console.warn("Missing timestamp format, using epoch seconds", value);
                this.stringBuffer = String(value.getTime() / 1000);
            }
            return;
          }
          if (ns.isBlobSchema() && "byteLength" in value) {
            this.stringBuffer = (this.serdeContext?.base64Encoder ?? import_util_base642.toBase64)(value);
            return;
          }
          if (ns.isListSchema() && Array.isArray(value)) {
            let buffer = "";
            for (const item of value) {
              this.write([ns.getValueSchema(), ns.getMergedTraits()], item);
              const headerItem = this.flush();
              const serialized = ns.getValueSchema().isTimestampSchema() ? headerItem : (0, import_serde3.quoteHeader)(headerItem);
              if (buffer !== "") {
                buffer += ", ";
              }
              buffer += serialized;
            }
            this.stringBuffer = buffer;
            return;
          }
          this.stringBuffer = JSON.stringify(value, null, 2);
          break;
        case "string":
          const mediaType = ns.getMergedTraits().mediaType;
          let intermediateValue = value;
          if (mediaType) {
            const isJson = mediaType === "application/json" || mediaType.endsWith("+json");
            if (isJson) {
              intermediateValue = import_serde3.LazyJsonString.from(intermediateValue);
            }
            if (ns.getMergedTraits().httpHeader) {
              this.stringBuffer = (this.serdeContext?.base64Encoder ?? import_util_base642.toBase64)(intermediateValue.toString());
              return;
            }
          }
          this.stringBuffer = value;
          break;
        default:
          this.stringBuffer = String(value);
      }
    }
    flush() {
      const buffer = this.stringBuffer;
      this.stringBuffer = "";
      return buffer;
    }
  };
  var HttpInterceptingShapeSerializer = class {
    constructor(codecSerializer, codecSettings, stringSerializer = new ToStringShapeSerializer(codecSettings)) {
      this.codecSerializer = codecSerializer;
      this.stringSerializer = stringSerializer;
    }
    setSerdeContext(serdeContext) {
      this.codecSerializer.setSerdeContext(serdeContext);
      this.stringSerializer.setSerdeContext(serdeContext);
    }
    write(schema, value) {
      const ns = import_schema8.NormalizedSchema.of(schema);
      const traits = ns.getMergedTraits();
      if (traits.httpHeader || traits.httpLabel || traits.httpQuery) {
        this.stringSerializer.write(ns, value);
        this.buffer = this.stringSerializer.flush();
        return;
      }
      return this.codecSerializer.write(ns, value);
    }
    flush() {
      if (this.buffer !== undefined) {
        const buffer = this.buffer;
        this.buffer = undefined;
        return buffer;
      }
      return this.codecSerializer.flush();
    }
  };
});

export { require_dist_cjs, require_dist_cjs3 as require_dist_cjs1, require_dist_cjs2, require_dist_cjs7 as require_dist_cjs3, require_dist_cjs8 as require_dist_cjs4, require_dist_cjs9 as require_dist_cjs5, require_dist_cjs10 as require_dist_cjs6, require_dist_cjs4 as require_dist_cjs7, require_dist_cjs6 as require_dist_cjs8, require_dist_cjs12 as require_dist_cjs9, require_dist_cjs13 as require_dist_cjs10, require_schema, require_serde, require_protocols };
