import {
  require_dist,
  require_dist_cjs as require_dist_cjs4,
  require_dist_cjs1 as require_dist_cjs7,
  require_dist_cjs2 as require_dist_cjs8,
  require_dist_cjs3 as require_dist_cjs9,
  require_dist_cjs4 as require_dist_cjs10
} from "./chunk-mf7dh1wb.js";
import {
  require_dist_cjs as require_dist_cjs2,
  require_dist_cjs1 as require_dist_cjs3,
  require_dist_cjs3 as require_dist_cjs5,
  require_dist_cjs4 as require_dist_cjs6
} from "./chunk-7nj5y9mf.js";
import {
  require_dist_cjs
} from "./chunk-0rra9d59.js";
import {
  __commonJS,
  __require
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/@aws-sdk/middleware-host-header/dist-cjs/index.js
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
  var index_exports = {};
  __export(index_exports, {
    getHostHeaderPlugin: () => getHostHeaderPlugin,
    hostHeaderMiddleware: () => hostHeaderMiddleware,
    hostHeaderMiddlewareOptions: () => hostHeaderMiddlewareOptions,
    resolveHostHeaderConfig: () => resolveHostHeaderConfig
  });
  module.exports = __toCommonJS(index_exports);
  var import_protocol_http = require_dist_cjs3();
  function resolveHostHeaderConfig(input) {
    return input;
  }
  __name(resolveHostHeaderConfig, "resolveHostHeaderConfig");
  var hostHeaderMiddleware = /* @__PURE__ */ __name((options) => (next) => async (args) => {
    if (!import_protocol_http.HttpRequest.isInstance(args.request))
      return next(args);
    const { request } = args;
    const { handlerProtocol = "" } = options.requestHandler.metadata || {};
    if (handlerProtocol.indexOf("h2") >= 0 && !request.headers[":authority"]) {
      delete request.headers["host"];
      request.headers[":authority"] = request.hostname + (request.port ? ":" + request.port : "");
    } else if (!request.headers["host"]) {
      let host = request.hostname;
      if (request.port != null)
        host += `:${request.port}`;
      request.headers["host"] = host;
    }
    return next(args);
  }, "hostHeaderMiddleware");
  var hostHeaderMiddlewareOptions = {
    name: "hostHeaderMiddleware",
    step: "build",
    priority: "low",
    tags: ["HOST"],
    override: true
  };
  var getHostHeaderPlugin = /* @__PURE__ */ __name((options) => ({
    applyToStack: /* @__PURE__ */ __name((clientStack) => {
      clientStack.add(hostHeaderMiddleware(options), hostHeaderMiddlewareOptions);
    }, "applyToStack")
  }), "getHostHeaderPlugin");
});

// ../../../../node_modules/@aws-sdk/middleware-logger/dist-cjs/index.js
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
  var index_exports = {};
  __export(index_exports, {
    getLoggerPlugin: () => getLoggerPlugin,
    loggerMiddleware: () => loggerMiddleware,
    loggerMiddlewareOptions: () => loggerMiddlewareOptions
  });
  module.exports = __toCommonJS(index_exports);
  var loggerMiddleware = /* @__PURE__ */ __name(() => (next, context) => async (args) => {
    try {
      const response = await next(args);
      const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
      const { overrideInputFilterSensitiveLog, overrideOutputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
      const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
      const outputFilterSensitiveLog = overrideOutputFilterSensitiveLog ?? context.outputFilterSensitiveLog;
      const { $metadata, ...outputWithoutMetadata } = response.output;
      logger?.info?.({
        clientName,
        commandName,
        input: inputFilterSensitiveLog(args.input),
        output: outputFilterSensitiveLog(outputWithoutMetadata),
        metadata: $metadata
      });
      return response;
    } catch (error) {
      const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
      const { overrideInputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
      const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
      logger?.error?.({
        clientName,
        commandName,
        input: inputFilterSensitiveLog(args.input),
        error,
        metadata: error.$metadata
      });
      throw error;
    }
  }, "loggerMiddleware");
  var loggerMiddlewareOptions = {
    name: "loggerMiddleware",
    tags: ["LOGGER"],
    step: "initialize",
    override: true
  };
  var getLoggerPlugin = /* @__PURE__ */ __name((options) => ({
    applyToStack: /* @__PURE__ */ __name((clientStack) => {
      clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
    }, "applyToStack")
  }), "getLoggerPlugin");
});

// ../../../../node_modules/@aws-sdk/middleware-recursion-detection/dist-cjs/index.js
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
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var index_exports = {};
  __export(index_exports, {
    addRecursionDetectionMiddlewareOptions: () => addRecursionDetectionMiddlewareOptions,
    getRecursionDetectionPlugin: () => getRecursionDetectionPlugin,
    recursionDetectionMiddleware: () => recursionDetectionMiddleware
  });
  module.exports = __toCommonJS(index_exports);
  var import_protocol_http = require_dist_cjs3();
  var TRACE_ID_HEADER_NAME = "X-Amzn-Trace-Id";
  var ENV_LAMBDA_FUNCTION_NAME = "AWS_LAMBDA_FUNCTION_NAME";
  var ENV_TRACE_ID = "_X_AMZN_TRACE_ID";
  var recursionDetectionMiddleware = /* @__PURE__ */ __name((options) => (next) => async (args) => {
    const { request } = args;
    if (!import_protocol_http.HttpRequest.isInstance(request) || options.runtime !== "node") {
      return next(args);
    }
    const traceIdHeader = Object.keys(request.headers ?? {}).find((h) => h.toLowerCase() === TRACE_ID_HEADER_NAME.toLowerCase()) ?? TRACE_ID_HEADER_NAME;
    if (request.headers.hasOwnProperty(traceIdHeader)) {
      return next(args);
    }
    const functionName = process.env[ENV_LAMBDA_FUNCTION_NAME];
    const traceId = process.env[ENV_TRACE_ID];
    const nonEmptyString = /* @__PURE__ */ __name((str) => typeof str === "string" && str.length > 0, "nonEmptyString");
    if (nonEmptyString(functionName) && nonEmptyString(traceId)) {
      request.headers[TRACE_ID_HEADER_NAME] = traceId;
    }
    return next({
      ...args,
      request
    });
  }, "recursionDetectionMiddleware");
  var addRecursionDetectionMiddlewareOptions = {
    step: "build",
    tags: ["RECURSION_DETECTION"],
    name: "recursionDetectionMiddleware",
    override: true,
    priority: "low"
  };
  var getRecursionDetectionPlugin = /* @__PURE__ */ __name((options) => ({
    applyToStack: /* @__PURE__ */ __name((clientStack) => {
      clientStack.add(recursionDetectionMiddleware(options), addRecursionDetectionMiddlewareOptions);
    }, "applyToStack")
  }), "getRecursionDetectionPlugin");
});

// ../../../../node_modules/@smithy/util-endpoints/dist-cjs/index.js
var require_dist_cjs14 = __commonJS((exports, module) => {
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
    EndpointCache: () => EndpointCache,
    EndpointError: () => EndpointError2,
    customEndpointFunctions: () => customEndpointFunctions,
    isIpAddress: () => isIpAddress2,
    isValidHostLabel: () => isValidHostLabel,
    resolveEndpoint: () => resolveEndpoint2
  });
  module.exports = __toCommonJS(src_exports);
  var EndpointCache = class {
    constructor({ size, params }) {
      this.data = /* @__PURE__ */ new Map;
      this.parameters = [];
      this.capacity = size ?? 50;
      if (params) {
        this.parameters = params;
      }
    }
    static {
      __name(this, "EndpointCache");
    }
    get(endpointParams, resolver) {
      const key = this.hash(endpointParams);
      if (key === false) {
        return resolver();
      }
      if (!this.data.has(key)) {
        if (this.data.size > this.capacity + 10) {
          const keys = this.data.keys();
          let i = 0;
          while (true) {
            const { value, done } = keys.next();
            this.data.delete(value);
            if (done || ++i > 10) {
              break;
            }
          }
        }
        this.data.set(key, resolver());
      }
      return this.data.get(key);
    }
    size() {
      return this.data.size;
    }
    hash(endpointParams) {
      let buffer = "";
      const { parameters } = this;
      if (parameters.length === 0) {
        return false;
      }
      for (const param of parameters) {
        const val = String(endpointParams[param] ?? "");
        if (val.includes("|;")) {
          return false;
        }
        buffer += val + "|;";
      }
      return buffer;
    }
  };
  var IP_V4_REGEX = new RegExp(`^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$`);
  var isIpAddress2 = /* @__PURE__ */ __name((value) => IP_V4_REGEX.test(value) || value.startsWith("[") && value.endsWith("]"), "isIpAddress");
  var VALID_HOST_LABEL_REGEX = new RegExp(`^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$`);
  var isValidHostLabel = /* @__PURE__ */ __name((value, allowSubDomains = false) => {
    if (!allowSubDomains) {
      return VALID_HOST_LABEL_REGEX.test(value);
    }
    const labels = value.split(".");
    for (const label of labels) {
      if (!isValidHostLabel(label)) {
        return false;
      }
    }
    return true;
  }, "isValidHostLabel");
  var customEndpointFunctions = {};
  var debugId = "endpoints";
  function toDebugString(input) {
    if (typeof input !== "object" || input == null) {
      return input;
    }
    if ("ref" in input) {
      return `$${toDebugString(input.ref)}`;
    }
    if ("fn" in input) {
      return `${input.fn}(${(input.argv || []).map(toDebugString).join(", ")})`;
    }
    return JSON.stringify(input, null, 2);
  }
  __name(toDebugString, "toDebugString");
  var EndpointError2 = class extends Error {
    static {
      __name(this, "EndpointError");
    }
    constructor(message) {
      super(message);
      this.name = "EndpointError";
    }
  };
  var booleanEquals = /* @__PURE__ */ __name((value1, value2) => value1 === value2, "booleanEquals");
  var getAttrPathList = /* @__PURE__ */ __name((path) => {
    const parts = path.split(".");
    const pathList = [];
    for (const part of parts) {
      const squareBracketIndex = part.indexOf("[");
      if (squareBracketIndex !== -1) {
        if (part.indexOf("]") !== part.length - 1) {
          throw new EndpointError2(`Path: '${path}' does not end with ']'`);
        }
        const arrayIndex = part.slice(squareBracketIndex + 1, -1);
        if (Number.isNaN(parseInt(arrayIndex))) {
          throw new EndpointError2(`Invalid array index: '${arrayIndex}' in path: '${path}'`);
        }
        if (squareBracketIndex !== 0) {
          pathList.push(part.slice(0, squareBracketIndex));
        }
        pathList.push(arrayIndex);
      } else {
        pathList.push(part);
      }
    }
    return pathList;
  }, "getAttrPathList");
  var getAttr = /* @__PURE__ */ __name((value, path) => getAttrPathList(path).reduce((acc, index) => {
    if (typeof acc !== "object") {
      throw new EndpointError2(`Index '${index}' in '${path}' not found in '${JSON.stringify(value)}'`);
    } else if (Array.isArray(acc)) {
      return acc[parseInt(index)];
    }
    return acc[index];
  }, value), "getAttr");
  var isSet = /* @__PURE__ */ __name((value) => value != null, "isSet");
  var not = /* @__PURE__ */ __name((value) => !value, "not");
  var import_types3 = require_dist_cjs();
  var DEFAULT_PORTS = {
    [import_types3.EndpointURLScheme.HTTP]: 80,
    [import_types3.EndpointURLScheme.HTTPS]: 443
  };
  var parseURL = /* @__PURE__ */ __name((value) => {
    const whatwgURL = (() => {
      try {
        if (value instanceof URL) {
          return value;
        }
        if (typeof value === "object" && "hostname" in value) {
          const { hostname: hostname2, port, protocol: protocol2 = "", path = "", query = {} } = value;
          const url = new URL(`${protocol2}//${hostname2}${port ? `:${port}` : ""}${path}`);
          url.search = Object.entries(query).map(([k, v]) => `${k}=${v}`).join("&");
          return url;
        }
        return new URL(value);
      } catch (error) {
        return null;
      }
    })();
    if (!whatwgURL) {
      console.error(`Unable to parse ${JSON.stringify(value)} as a whatwg URL.`);
      return null;
    }
    const urlString = whatwgURL.href;
    const { host, hostname, pathname, protocol, search } = whatwgURL;
    if (search) {
      return null;
    }
    const scheme = protocol.slice(0, -1);
    if (!Object.values(import_types3.EndpointURLScheme).includes(scheme)) {
      return null;
    }
    const isIp = isIpAddress2(hostname);
    const inputContainsDefaultPort = urlString.includes(`${host}:${DEFAULT_PORTS[scheme]}`) || typeof value === "string" && value.includes(`${host}:${DEFAULT_PORTS[scheme]}`);
    const authority = `${host}${inputContainsDefaultPort ? `:${DEFAULT_PORTS[scheme]}` : ``}`;
    return {
      scheme,
      authority,
      path: pathname,
      normalizedPath: pathname.endsWith("/") ? pathname : `${pathname}/`,
      isIp
    };
  }, "parseURL");
  var stringEquals = /* @__PURE__ */ __name((value1, value2) => value1 === value2, "stringEquals");
  var substring = /* @__PURE__ */ __name((input, start, stop, reverse) => {
    if (start >= stop || input.length < stop) {
      return null;
    }
    if (!reverse) {
      return input.substring(start, stop);
    }
    return input.substring(input.length - stop, input.length - start);
  }, "substring");
  var uriEncode = /* @__PURE__ */ __name((value) => encodeURIComponent(value).replace(/[!*'()]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`), "uriEncode");
  var endpointFunctions = {
    booleanEquals,
    getAttr,
    isSet,
    isValidHostLabel,
    not,
    parseURL,
    stringEquals,
    substring,
    uriEncode
  };
  var evaluateTemplate = /* @__PURE__ */ __name((template, options) => {
    const evaluatedTemplateArr = [];
    const templateContext = {
      ...options.endpointParams,
      ...options.referenceRecord
    };
    let currentIndex = 0;
    while (currentIndex < template.length) {
      const openingBraceIndex = template.indexOf("{", currentIndex);
      if (openingBraceIndex === -1) {
        evaluatedTemplateArr.push(template.slice(currentIndex));
        break;
      }
      evaluatedTemplateArr.push(template.slice(currentIndex, openingBraceIndex));
      const closingBraceIndex = template.indexOf("}", openingBraceIndex);
      if (closingBraceIndex === -1) {
        evaluatedTemplateArr.push(template.slice(openingBraceIndex));
        break;
      }
      if (template[openingBraceIndex + 1] === "{" && template[closingBraceIndex + 1] === "}") {
        evaluatedTemplateArr.push(template.slice(openingBraceIndex + 1, closingBraceIndex));
        currentIndex = closingBraceIndex + 2;
      }
      const parameterName = template.substring(openingBraceIndex + 1, closingBraceIndex);
      if (parameterName.includes("#")) {
        const [refName, attrName] = parameterName.split("#");
        evaluatedTemplateArr.push(getAttr(templateContext[refName], attrName));
      } else {
        evaluatedTemplateArr.push(templateContext[parameterName]);
      }
      currentIndex = closingBraceIndex + 1;
    }
    return evaluatedTemplateArr.join("");
  }, "evaluateTemplate");
  var getReferenceValue = /* @__PURE__ */ __name(({ ref }, options) => {
    const referenceRecord = {
      ...options.endpointParams,
      ...options.referenceRecord
    };
    return referenceRecord[ref];
  }, "getReferenceValue");
  var evaluateExpression = /* @__PURE__ */ __name((obj, keyName, options) => {
    if (typeof obj === "string") {
      return evaluateTemplate(obj, options);
    } else if (obj["fn"]) {
      return callFunction(obj, options);
    } else if (obj["ref"]) {
      return getReferenceValue(obj, options);
    }
    throw new EndpointError2(`'${keyName}': ${String(obj)} is not a string, function or reference.`);
  }, "evaluateExpression");
  var callFunction = /* @__PURE__ */ __name(({ fn, argv }, options) => {
    const evaluatedArgs = argv.map((arg) => ["boolean", "number"].includes(typeof arg) ? arg : evaluateExpression(arg, "arg", options));
    const fnSegments = fn.split(".");
    if (fnSegments[0] in customEndpointFunctions && fnSegments[1] != null) {
      return customEndpointFunctions[fnSegments[0]][fnSegments[1]](...evaluatedArgs);
    }
    return endpointFunctions[fn](...evaluatedArgs);
  }, "callFunction");
  var evaluateCondition = /* @__PURE__ */ __name(({ assign, ...fnArgs }, options) => {
    if (assign && assign in options.referenceRecord) {
      throw new EndpointError2(`'${assign}' is already defined in Reference Record.`);
    }
    const value = callFunction(fnArgs, options);
    options.logger?.debug?.(`${debugId} evaluateCondition: ${toDebugString(fnArgs)} = ${toDebugString(value)}`);
    return {
      result: value === "" ? true : !!value,
      ...assign != null && { toAssign: { name: assign, value } }
    };
  }, "evaluateCondition");
  var evaluateConditions = /* @__PURE__ */ __name((conditions = [], options) => {
    const conditionsReferenceRecord = {};
    for (const condition of conditions) {
      const { result, toAssign } = evaluateCondition(condition, {
        ...options,
        referenceRecord: {
          ...options.referenceRecord,
          ...conditionsReferenceRecord
        }
      });
      if (!result) {
        return { result };
      }
      if (toAssign) {
        conditionsReferenceRecord[toAssign.name] = toAssign.value;
        options.logger?.debug?.(`${debugId} assign: ${toAssign.name} := ${toDebugString(toAssign.value)}`);
      }
    }
    return { result: true, referenceRecord: conditionsReferenceRecord };
  }, "evaluateConditions");
  var getEndpointHeaders = /* @__PURE__ */ __name((headers, options) => Object.entries(headers).reduce((acc, [headerKey, headerVal]) => ({
    ...acc,
    [headerKey]: headerVal.map((headerValEntry) => {
      const processedExpr = evaluateExpression(headerValEntry, "Header value entry", options);
      if (typeof processedExpr !== "string") {
        throw new EndpointError2(`Header '${headerKey}' value '${processedExpr}' is not a string`);
      }
      return processedExpr;
    })
  }), {}), "getEndpointHeaders");
  var getEndpointProperty = /* @__PURE__ */ __name((property, options) => {
    if (Array.isArray(property)) {
      return property.map((propertyEntry) => getEndpointProperty(propertyEntry, options));
    }
    switch (typeof property) {
      case "string":
        return evaluateTemplate(property, options);
      case "object":
        if (property === null) {
          throw new EndpointError2(`Unexpected endpoint property: ${property}`);
        }
        return getEndpointProperties(property, options);
      case "boolean":
        return property;
      default:
        throw new EndpointError2(`Unexpected endpoint property type: ${typeof property}`);
    }
  }, "getEndpointProperty");
  var getEndpointProperties = /* @__PURE__ */ __name((properties, options) => Object.entries(properties).reduce((acc, [propertyKey, propertyVal]) => ({
    ...acc,
    [propertyKey]: getEndpointProperty(propertyVal, options)
  }), {}), "getEndpointProperties");
  var getEndpointUrl = /* @__PURE__ */ __name((endpointUrl, options) => {
    const expression = evaluateExpression(endpointUrl, "Endpoint URL", options);
    if (typeof expression === "string") {
      try {
        return new URL(expression);
      } catch (error) {
        console.error(`Failed to construct URL with ${expression}`, error);
        throw error;
      }
    }
    throw new EndpointError2(`Endpoint URL must be a string, got ${typeof expression}`);
  }, "getEndpointUrl");
  var evaluateEndpointRule = /* @__PURE__ */ __name((endpointRule, options) => {
    const { conditions, endpoint } = endpointRule;
    const { result, referenceRecord } = evaluateConditions(conditions, options);
    if (!result) {
      return;
    }
    const endpointRuleOptions = {
      ...options,
      referenceRecord: { ...options.referenceRecord, ...referenceRecord }
    };
    const { url, properties, headers } = endpoint;
    options.logger?.debug?.(`${debugId} Resolving endpoint from template: ${toDebugString(endpoint)}`);
    return {
      ...headers != null && {
        headers: getEndpointHeaders(headers, endpointRuleOptions)
      },
      ...properties != null && {
        properties: getEndpointProperties(properties, endpointRuleOptions)
      },
      url: getEndpointUrl(url, endpointRuleOptions)
    };
  }, "evaluateEndpointRule");
  var evaluateErrorRule = /* @__PURE__ */ __name((errorRule, options) => {
    const { conditions, error } = errorRule;
    const { result, referenceRecord } = evaluateConditions(conditions, options);
    if (!result) {
      return;
    }
    throw new EndpointError2(evaluateExpression(error, "Error", {
      ...options,
      referenceRecord: { ...options.referenceRecord, ...referenceRecord }
    }));
  }, "evaluateErrorRule");
  var evaluateTreeRule = /* @__PURE__ */ __name((treeRule, options) => {
    const { conditions, rules } = treeRule;
    const { result, referenceRecord } = evaluateConditions(conditions, options);
    if (!result) {
      return;
    }
    return evaluateRules(rules, {
      ...options,
      referenceRecord: { ...options.referenceRecord, ...referenceRecord }
    });
  }, "evaluateTreeRule");
  var evaluateRules = /* @__PURE__ */ __name((rules, options) => {
    for (const rule of rules) {
      if (rule.type === "endpoint") {
        const endpointOrUndefined = evaluateEndpointRule(rule, options);
        if (endpointOrUndefined) {
          return endpointOrUndefined;
        }
      } else if (rule.type === "error") {
        evaluateErrorRule(rule, options);
      } else if (rule.type === "tree") {
        const endpointOrUndefined = evaluateTreeRule(rule, options);
        if (endpointOrUndefined) {
          return endpointOrUndefined;
        }
      } else {
        throw new EndpointError2(`Unknown endpoint rule: ${rule}`);
      }
    }
    throw new EndpointError2(`Rules evaluation failed`);
  }, "evaluateRules");
  var resolveEndpoint2 = /* @__PURE__ */ __name((ruleSetObject, options) => {
    const { endpointParams, logger } = options;
    const { parameters, rules } = ruleSetObject;
    options.logger?.debug?.(`${debugId} Initial EndpointParams: ${toDebugString(endpointParams)}`);
    const paramsWithDefault = Object.entries(parameters).filter(([, v]) => v.default != null).map(([k, v]) => [k, v.default]);
    if (paramsWithDefault.length > 0) {
      for (const [paramKey, paramDefaultValue] of paramsWithDefault) {
        endpointParams[paramKey] = endpointParams[paramKey] ?? paramDefaultValue;
      }
    }
    const requiredParams = Object.entries(parameters).filter(([, v]) => v.required).map(([k]) => k);
    for (const requiredParam of requiredParams) {
      if (endpointParams[requiredParam] == null) {
        throw new EndpointError2(`Missing required parameter: '${requiredParam}'`);
      }
    }
    const endpoint = evaluateRules(rules, { endpointParams, logger, referenceRecord: {} });
    options.logger?.debug?.(`${debugId} Resolved endpoint: ${toDebugString(endpoint)}`);
    return endpoint;
  }, "resolveEndpoint");
});

// ../../../../node_modules/@aws-sdk/util-endpoints/dist-cjs/index.js
var require_dist_cjs15 = __commonJS((exports, module) => {
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
  var index_exports = {};
  __export(index_exports, {
    ConditionObject: () => import_util_endpoints.ConditionObject,
    DeprecatedObject: () => import_util_endpoints.DeprecatedObject,
    EndpointError: () => import_util_endpoints.EndpointError,
    EndpointObject: () => import_util_endpoints.EndpointObject,
    EndpointObjectHeaders: () => import_util_endpoints.EndpointObjectHeaders,
    EndpointObjectProperties: () => import_util_endpoints.EndpointObjectProperties,
    EndpointParams: () => import_util_endpoints.EndpointParams,
    EndpointResolverOptions: () => import_util_endpoints.EndpointResolverOptions,
    EndpointRuleObject: () => import_util_endpoints.EndpointRuleObject,
    ErrorRuleObject: () => import_util_endpoints.ErrorRuleObject,
    EvaluateOptions: () => import_util_endpoints.EvaluateOptions,
    Expression: () => import_util_endpoints.Expression,
    FunctionArgv: () => import_util_endpoints.FunctionArgv,
    FunctionObject: () => import_util_endpoints.FunctionObject,
    FunctionReturn: () => import_util_endpoints.FunctionReturn,
    ParameterObject: () => import_util_endpoints.ParameterObject,
    ReferenceObject: () => import_util_endpoints.ReferenceObject,
    ReferenceRecord: () => import_util_endpoints.ReferenceRecord,
    RuleSetObject: () => import_util_endpoints.RuleSetObject,
    RuleSetRules: () => import_util_endpoints.RuleSetRules,
    TreeRuleObject: () => import_util_endpoints.TreeRuleObject,
    awsEndpointFunctions: () => awsEndpointFunctions,
    getUserAgentPrefix: () => getUserAgentPrefix,
    isIpAddress: () => import_util_endpoints.isIpAddress,
    partition: () => partition,
    resolveEndpoint: () => import_util_endpoints.resolveEndpoint,
    setPartitionInfo: () => setPartitionInfo,
    useDefaultPartitionInfo: () => useDefaultPartitionInfo
  });
  module.exports = __toCommonJS(index_exports);
  var import_util_endpoints = require_dist_cjs14();
  var isVirtualHostableS3Bucket = /* @__PURE__ */ __name((value, allowSubDomains = false) => {
    if (allowSubDomains) {
      for (const label of value.split(".")) {
        if (!isVirtualHostableS3Bucket(label)) {
          return false;
        }
      }
      return true;
    }
    if (!(0, import_util_endpoints.isValidHostLabel)(value)) {
      return false;
    }
    if (value.length < 3 || value.length > 63) {
      return false;
    }
    if (value !== value.toLowerCase()) {
      return false;
    }
    if ((0, import_util_endpoints.isIpAddress)(value)) {
      return false;
    }
    return true;
  }, "isVirtualHostableS3Bucket");
  var ARN_DELIMITER = ":";
  var RESOURCE_DELIMITER = "/";
  var parseArn = /* @__PURE__ */ __name((value) => {
    const segments = value.split(ARN_DELIMITER);
    if (segments.length < 6)
      return null;
    const [arn, partition2, service, region, accountId, ...resourcePath] = segments;
    if (arn !== "arn" || partition2 === "" || service === "" || resourcePath.join(ARN_DELIMITER) === "")
      return null;
    const resourceId = resourcePath.map((resource) => resource.split(RESOURCE_DELIMITER)).flat();
    return {
      partition: partition2,
      service,
      region,
      accountId,
      resourceId
    };
  }, "parseArn");
  var partitions_default = {
    partitions: [{
      id: "aws",
      outputs: {
        dnsSuffix: "amazonaws.com",
        dualStackDnsSuffix: "api.aws",
        implicitGlobalRegion: "us-east-1",
        name: "aws",
        supportsDualStack: true,
        supportsFIPS: true
      },
      regionRegex: "^(us|eu|ap|sa|ca|me|af|il|mx)\\-\\w+\\-\\d+$",
      regions: {
        "af-south-1": {
          description: "Africa (Cape Town)"
        },
        "ap-east-1": {
          description: "Asia Pacific (Hong Kong)"
        },
        "ap-east-2": {
          description: "Asia Pacific (Taipei)"
        },
        "ap-northeast-1": {
          description: "Asia Pacific (Tokyo)"
        },
        "ap-northeast-2": {
          description: "Asia Pacific (Seoul)"
        },
        "ap-northeast-3": {
          description: "Asia Pacific (Osaka)"
        },
        "ap-south-1": {
          description: "Asia Pacific (Mumbai)"
        },
        "ap-south-2": {
          description: "Asia Pacific (Hyderabad)"
        },
        "ap-southeast-1": {
          description: "Asia Pacific (Singapore)"
        },
        "ap-southeast-2": {
          description: "Asia Pacific (Sydney)"
        },
        "ap-southeast-3": {
          description: "Asia Pacific (Jakarta)"
        },
        "ap-southeast-4": {
          description: "Asia Pacific (Melbourne)"
        },
        "ap-southeast-5": {
          description: "Asia Pacific (Malaysia)"
        },
        "ap-southeast-7": {
          description: "Asia Pacific (Thailand)"
        },
        "aws-global": {
          description: "AWS Standard global region"
        },
        "ca-central-1": {
          description: "Canada (Central)"
        },
        "ca-west-1": {
          description: "Canada West (Calgary)"
        },
        "eu-central-1": {
          description: "Europe (Frankfurt)"
        },
        "eu-central-2": {
          description: "Europe (Zurich)"
        },
        "eu-north-1": {
          description: "Europe (Stockholm)"
        },
        "eu-south-1": {
          description: "Europe (Milan)"
        },
        "eu-south-2": {
          description: "Europe (Spain)"
        },
        "eu-west-1": {
          description: "Europe (Ireland)"
        },
        "eu-west-2": {
          description: "Europe (London)"
        },
        "eu-west-3": {
          description: "Europe (Paris)"
        },
        "il-central-1": {
          description: "Israel (Tel Aviv)"
        },
        "me-central-1": {
          description: "Middle East (UAE)"
        },
        "me-south-1": {
          description: "Middle East (Bahrain)"
        },
        "mx-central-1": {
          description: "Mexico (Central)"
        },
        "sa-east-1": {
          description: "South America (Sao Paulo)"
        },
        "us-east-1": {
          description: "US East (N. Virginia)"
        },
        "us-east-2": {
          description: "US East (Ohio)"
        },
        "us-west-1": {
          description: "US West (N. California)"
        },
        "us-west-2": {
          description: "US West (Oregon)"
        }
      }
    }, {
      id: "aws-cn",
      outputs: {
        dnsSuffix: "amazonaws.com.cn",
        dualStackDnsSuffix: "api.amazonwebservices.com.cn",
        implicitGlobalRegion: "cn-northwest-1",
        name: "aws-cn",
        supportsDualStack: true,
        supportsFIPS: true
      },
      regionRegex: "^cn\\-\\w+\\-\\d+$",
      regions: {
        "aws-cn-global": {
          description: "AWS China global region"
        },
        "cn-north-1": {
          description: "China (Beijing)"
        },
        "cn-northwest-1": {
          description: "China (Ningxia)"
        }
      }
    }, {
      id: "aws-us-gov",
      outputs: {
        dnsSuffix: "amazonaws.com",
        dualStackDnsSuffix: "api.aws",
        implicitGlobalRegion: "us-gov-west-1",
        name: "aws-us-gov",
        supportsDualStack: true,
        supportsFIPS: true
      },
      regionRegex: "^us\\-gov\\-\\w+\\-\\d+$",
      regions: {
        "aws-us-gov-global": {
          description: "AWS GovCloud (US) global region"
        },
        "us-gov-east-1": {
          description: "AWS GovCloud (US-East)"
        },
        "us-gov-west-1": {
          description: "AWS GovCloud (US-West)"
        }
      }
    }, {
      id: "aws-iso",
      outputs: {
        dnsSuffix: "c2s.ic.gov",
        dualStackDnsSuffix: "c2s.ic.gov",
        implicitGlobalRegion: "us-iso-east-1",
        name: "aws-iso",
        supportsDualStack: false,
        supportsFIPS: true
      },
      regionRegex: "^us\\-iso\\-\\w+\\-\\d+$",
      regions: {
        "aws-iso-global": {
          description: "AWS ISO (US) global region"
        },
        "us-iso-east-1": {
          description: "US ISO East"
        },
        "us-iso-west-1": {
          description: "US ISO WEST"
        }
      }
    }, {
      id: "aws-iso-b",
      outputs: {
        dnsSuffix: "sc2s.sgov.gov",
        dualStackDnsSuffix: "sc2s.sgov.gov",
        implicitGlobalRegion: "us-isob-east-1",
        name: "aws-iso-b",
        supportsDualStack: false,
        supportsFIPS: true
      },
      regionRegex: "^us\\-isob\\-\\w+\\-\\d+$",
      regions: {
        "aws-iso-b-global": {
          description: "AWS ISOB (US) global region"
        },
        "us-isob-east-1": {
          description: "US ISOB East (Ohio)"
        }
      }
    }, {
      id: "aws-iso-e",
      outputs: {
        dnsSuffix: "cloud.adc-e.uk",
        dualStackDnsSuffix: "cloud.adc-e.uk",
        implicitGlobalRegion: "eu-isoe-west-1",
        name: "aws-iso-e",
        supportsDualStack: false,
        supportsFIPS: true
      },
      regionRegex: "^eu\\-isoe\\-\\w+\\-\\d+$",
      regions: {
        "aws-iso-e-global": {
          description: "AWS ISOE (Europe) global region"
        },
        "eu-isoe-west-1": {
          description: "EU ISOE West"
        }
      }
    }, {
      id: "aws-iso-f",
      outputs: {
        dnsSuffix: "csp.hci.ic.gov",
        dualStackDnsSuffix: "csp.hci.ic.gov",
        implicitGlobalRegion: "us-isof-south-1",
        name: "aws-iso-f",
        supportsDualStack: false,
        supportsFIPS: true
      },
      regionRegex: "^us\\-isof\\-\\w+\\-\\d+$",
      regions: {
        "aws-iso-f-global": {
          description: "AWS ISOF global region"
        },
        "us-isof-east-1": {
          description: "US ISOF EAST"
        },
        "us-isof-south-1": {
          description: "US ISOF SOUTH"
        }
      }
    }, {
      id: "aws-eusc",
      outputs: {
        dnsSuffix: "amazonaws.eu",
        dualStackDnsSuffix: "amazonaws.eu",
        implicitGlobalRegion: "eusc-de-east-1",
        name: "aws-eusc",
        supportsDualStack: false,
        supportsFIPS: true
      },
      regionRegex: "^eusc\\-(de)\\-\\w+\\-\\d+$",
      regions: {
        "eusc-de-east-1": {
          description: "EU (Germany)"
        }
      }
    }],
    version: "1.1"
  };
  var selectedPartitionsInfo = partitions_default;
  var selectedUserAgentPrefix = "";
  var partition = /* @__PURE__ */ __name((value) => {
    const { partitions } = selectedPartitionsInfo;
    for (const partition2 of partitions) {
      const { regions, outputs } = partition2;
      for (const [region, regionData] of Object.entries(regions)) {
        if (region === value) {
          return {
            ...outputs,
            ...regionData
          };
        }
      }
    }
    for (const partition2 of partitions) {
      const { regionRegex, outputs } = partition2;
      if (new RegExp(regionRegex).test(value)) {
        return {
          ...outputs
        };
      }
    }
    const DEFAULT_PARTITION = partitions.find((partition2) => partition2.id === "aws");
    if (!DEFAULT_PARTITION) {
      throw new Error("Provided region was not found in the partition array or regex, and default partition with id 'aws' doesn't exist.");
    }
    return {
      ...DEFAULT_PARTITION.outputs
    };
  }, "partition");
  var setPartitionInfo = /* @__PURE__ */ __name((partitionsInfo, userAgentPrefix = "") => {
    selectedPartitionsInfo = partitionsInfo;
    selectedUserAgentPrefix = userAgentPrefix;
  }, "setPartitionInfo");
  var useDefaultPartitionInfo = /* @__PURE__ */ __name(() => {
    setPartitionInfo(partitions_default, "");
  }, "useDefaultPartitionInfo");
  var getUserAgentPrefix = /* @__PURE__ */ __name(() => selectedUserAgentPrefix, "getUserAgentPrefix");
  var awsEndpointFunctions = {
    isVirtualHostableS3Bucket,
    parseArn,
    partition
  };
  import_util_endpoints.customEndpointFunctions.aws = awsEndpointFunctions;
});

// ../../../../node_modules/@aws-sdk/middleware-user-agent/dist-cjs/index.js
var require_dist_cjs16 = __commonJS((exports, module) => {
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
  var index_exports = {};
  __export(index_exports, {
    DEFAULT_UA_APP_ID: () => DEFAULT_UA_APP_ID,
    getUserAgentMiddlewareOptions: () => getUserAgentMiddlewareOptions,
    getUserAgentPlugin: () => getUserAgentPlugin,
    resolveUserAgentConfig: () => resolveUserAgentConfig,
    userAgentMiddleware: () => userAgentMiddleware
  });
  module.exports = __toCommonJS(index_exports);
  var import_core = require_dist_cjs7();
  var DEFAULT_UA_APP_ID = undefined;
  function isValidUserAgentAppId(appId) {
    if (appId === undefined) {
      return true;
    }
    return typeof appId === "string" && appId.length <= 50;
  }
  __name(isValidUserAgentAppId, "isValidUserAgentAppId");
  function resolveUserAgentConfig(input) {
    const normalizedAppIdProvider = (0, import_core.normalizeProvider)(input.userAgentAppId ?? DEFAULT_UA_APP_ID);
    const { customUserAgent } = input;
    return Object.assign(input, {
      customUserAgent: typeof customUserAgent === "string" ? [[customUserAgent]] : customUserAgent,
      userAgentAppId: /* @__PURE__ */ __name(async () => {
        const appId = await normalizedAppIdProvider();
        if (!isValidUserAgentAppId(appId)) {
          const logger = input.logger?.constructor?.name === "NoOpLogger" || !input.logger ? console : input.logger;
          if (typeof appId !== "string") {
            logger?.warn("userAgentAppId must be a string or undefined.");
          } else if (appId.length > 50) {
            logger?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.");
          }
        }
        return appId;
      }, "userAgentAppId")
    });
  }
  __name(resolveUserAgentConfig, "resolveUserAgentConfig");
  var import_util_endpoints = require_dist_cjs15();
  var import_protocol_http = require_dist_cjs3();
  var import_core2 = require_dist_cjs10();
  var ACCOUNT_ID_ENDPOINT_REGEX = /\d{12}\.ddb/;
  async function checkFeatures(context, config, args) {
    const request = args.request;
    if (request?.headers?.["smithy-protocol"] === "rpc-v2-cbor") {
      (0, import_core2.setFeature)(context, "PROTOCOL_RPC_V2_CBOR", "M");
    }
    if (typeof config.retryStrategy === "function") {
      const retryStrategy = await config.retryStrategy();
      if (typeof retryStrategy.acquireInitialRetryToken === "function") {
        if (retryStrategy.constructor?.name?.includes("Adaptive")) {
          (0, import_core2.setFeature)(context, "RETRY_MODE_ADAPTIVE", "F");
        } else {
          (0, import_core2.setFeature)(context, "RETRY_MODE_STANDARD", "E");
        }
      } else {
        (0, import_core2.setFeature)(context, "RETRY_MODE_LEGACY", "D");
      }
    }
    if (typeof config.accountIdEndpointMode === "function") {
      const endpointV2 = context.endpointV2;
      if (String(endpointV2?.url?.hostname).match(ACCOUNT_ID_ENDPOINT_REGEX)) {
        (0, import_core2.setFeature)(context, "ACCOUNT_ID_ENDPOINT", "O");
      }
      switch (await config.accountIdEndpointMode?.()) {
        case "disabled":
          (0, import_core2.setFeature)(context, "ACCOUNT_ID_MODE_DISABLED", "Q");
          break;
        case "preferred":
          (0, import_core2.setFeature)(context, "ACCOUNT_ID_MODE_PREFERRED", "P");
          break;
        case "required":
          (0, import_core2.setFeature)(context, "ACCOUNT_ID_MODE_REQUIRED", "R");
          break;
      }
    }
    const identity = context.__smithy_context?.selectedHttpAuthScheme?.identity;
    if (identity?.$source) {
      const credentials = identity;
      if (credentials.accountId) {
        (0, import_core2.setFeature)(context, "RESOLVED_ACCOUNT_ID", "T");
      }
      for (const [key, value] of Object.entries(credentials.$source ?? {})) {
        (0, import_core2.setFeature)(context, key, value);
      }
    }
  }
  __name(checkFeatures, "checkFeatures");
  var USER_AGENT = "user-agent";
  var X_AMZ_USER_AGENT = "x-amz-user-agent";
  var SPACE = " ";
  var UA_NAME_SEPARATOR = "/";
  var UA_NAME_ESCAPE_REGEX = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g;
  var UA_VALUE_ESCAPE_REGEX = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w\#]/g;
  var UA_ESCAPE_CHAR = "-";
  var BYTE_LIMIT = 1024;
  function encodeFeatures(features) {
    let buffer = "";
    for (const key in features) {
      const val = features[key];
      if (buffer.length + val.length + 1 <= BYTE_LIMIT) {
        if (buffer.length) {
          buffer += "," + val;
        } else {
          buffer += val;
        }
        continue;
      }
      break;
    }
    return buffer;
  }
  __name(encodeFeatures, "encodeFeatures");
  var userAgentMiddleware = /* @__PURE__ */ __name((options) => (next, context) => async (args) => {
    const { request } = args;
    if (!import_protocol_http.HttpRequest.isInstance(request)) {
      return next(args);
    }
    const { headers } = request;
    const userAgent = context?.userAgent?.map(escapeUserAgent) || [];
    const defaultUserAgent = (await options.defaultUserAgentProvider()).map(escapeUserAgent);
    await checkFeatures(context, options, args);
    const awsContext = context;
    defaultUserAgent.push(`m/${encodeFeatures(Object.assign({}, context.__smithy_context?.features, awsContext.__aws_sdk_context?.features))}`);
    const customUserAgent = options?.customUserAgent?.map(escapeUserAgent) || [];
    const appId = await options.userAgentAppId();
    if (appId) {
      defaultUserAgent.push(escapeUserAgent([`app/${appId}`]));
    }
    const prefix = (0, import_util_endpoints.getUserAgentPrefix)();
    const sdkUserAgentValue = (prefix ? [prefix] : []).concat([...defaultUserAgent, ...userAgent, ...customUserAgent]).join(SPACE);
    const normalUAValue = [
      ...defaultUserAgent.filter((section) => section.startsWith("aws-sdk-")),
      ...customUserAgent
    ].join(SPACE);
    if (options.runtime !== "browser") {
      if (normalUAValue) {
        headers[X_AMZ_USER_AGENT] = headers[X_AMZ_USER_AGENT] ? `${headers[USER_AGENT]} ${normalUAValue}` : normalUAValue;
      }
      headers[USER_AGENT] = sdkUserAgentValue;
    } else {
      headers[X_AMZ_USER_AGENT] = sdkUserAgentValue;
    }
    return next({
      ...args,
      request
    });
  }, "userAgentMiddleware");
  var escapeUserAgent = /* @__PURE__ */ __name((userAgentPair) => {
    const name = userAgentPair[0].split(UA_NAME_SEPARATOR).map((part) => part.replace(UA_NAME_ESCAPE_REGEX, UA_ESCAPE_CHAR)).join(UA_NAME_SEPARATOR);
    const version = userAgentPair[1]?.replace(UA_VALUE_ESCAPE_REGEX, UA_ESCAPE_CHAR);
    const prefixSeparatorIndex = name.indexOf(UA_NAME_SEPARATOR);
    const prefix = name.substring(0, prefixSeparatorIndex);
    let uaName = name.substring(prefixSeparatorIndex + 1);
    if (prefix === "api") {
      uaName = uaName.toLowerCase();
    }
    return [prefix, uaName, version].filter((item) => item && item.length > 0).reduce((acc, item, index) => {
      switch (index) {
        case 0:
          return item;
        case 1:
          return `${acc}/${item}`;
        default:
          return `${acc}#${item}`;
      }
    }, "");
  }, "escapeUserAgent");
  var getUserAgentMiddlewareOptions = {
    name: "getUserAgentMiddleware",
    step: "build",
    priority: "low",
    tags: ["SET_USER_AGENT", "USER_AGENT"],
    override: true
  };
  var getUserAgentPlugin = /* @__PURE__ */ __name((config) => ({
    applyToStack: /* @__PURE__ */ __name((clientStack) => {
      clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
    }, "applyToStack")
  }), "getUserAgentPlugin");
});

// ../../../../node_modules/@smithy/util-config-provider/dist-cjs/index.js
var require_dist_cjs17 = __commonJS((exports, module) => {
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
    SelectorType: () => SelectorType,
    booleanSelector: () => booleanSelector,
    numberSelector: () => numberSelector
  });
  module.exports = __toCommonJS(src_exports);
  var booleanSelector = /* @__PURE__ */ __name((obj, key, type) => {
    if (!(key in obj))
      return;
    if (obj[key] === "true")
      return true;
    if (obj[key] === "false")
      return false;
    throw new Error(`Cannot load ${type} "${key}". Expected "true" or "false", got ${obj[key]}.`);
  }, "booleanSelector");
  var numberSelector = /* @__PURE__ */ __name((obj, key, type) => {
    if (!(key in obj))
      return;
    const numberValue = parseInt(obj[key], 10);
    if (Number.isNaN(numberValue)) {
      throw new TypeError(`Cannot load ${type} '${key}'. Expected number, got '${obj[key]}'.`);
    }
    return numberValue;
  }, "numberSelector");
  var SelectorType = /* @__PURE__ */ ((SelectorType2) => {
    SelectorType2["ENV"] = "env";
    SelectorType2["CONFIG"] = "shared config entry";
    return SelectorType2;
  })(SelectorType || {});
});

// ../../../../node_modules/@smithy/config-resolver/dist-cjs/index.js
var require_dist_cjs18 = __commonJS((exports, module) => {
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
    CONFIG_USE_DUALSTACK_ENDPOINT: () => CONFIG_USE_DUALSTACK_ENDPOINT,
    CONFIG_USE_FIPS_ENDPOINT: () => CONFIG_USE_FIPS_ENDPOINT,
    DEFAULT_USE_DUALSTACK_ENDPOINT: () => DEFAULT_USE_DUALSTACK_ENDPOINT,
    DEFAULT_USE_FIPS_ENDPOINT: () => DEFAULT_USE_FIPS_ENDPOINT,
    ENV_USE_DUALSTACK_ENDPOINT: () => ENV_USE_DUALSTACK_ENDPOINT,
    ENV_USE_FIPS_ENDPOINT: () => ENV_USE_FIPS_ENDPOINT,
    NODE_REGION_CONFIG_FILE_OPTIONS: () => NODE_REGION_CONFIG_FILE_OPTIONS,
    NODE_REGION_CONFIG_OPTIONS: () => NODE_REGION_CONFIG_OPTIONS,
    NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS: () => NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS,
    NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS: () => NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS,
    REGION_ENV_NAME: () => REGION_ENV_NAME,
    REGION_INI_NAME: () => REGION_INI_NAME,
    getRegionInfo: () => getRegionInfo,
    resolveCustomEndpointsConfig: () => resolveCustomEndpointsConfig,
    resolveEndpointsConfig: () => resolveEndpointsConfig,
    resolveRegionConfig: () => resolveRegionConfig
  });
  module.exports = __toCommonJS(src_exports);
  var import_util_config_provider = require_dist_cjs17();
  var ENV_USE_DUALSTACK_ENDPOINT = "AWS_USE_DUALSTACK_ENDPOINT";
  var CONFIG_USE_DUALSTACK_ENDPOINT = "use_dualstack_endpoint";
  var DEFAULT_USE_DUALSTACK_ENDPOINT = false;
  var NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => (0, import_util_config_provider.booleanSelector)(env, ENV_USE_DUALSTACK_ENDPOINT, import_util_config_provider.SelectorType.ENV),
    configFileSelector: (profile) => (0, import_util_config_provider.booleanSelector)(profile, CONFIG_USE_DUALSTACK_ENDPOINT, import_util_config_provider.SelectorType.CONFIG),
    default: false
  };
  var ENV_USE_FIPS_ENDPOINT = "AWS_USE_FIPS_ENDPOINT";
  var CONFIG_USE_FIPS_ENDPOINT = "use_fips_endpoint";
  var DEFAULT_USE_FIPS_ENDPOINT = false;
  var NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => (0, import_util_config_provider.booleanSelector)(env, ENV_USE_FIPS_ENDPOINT, import_util_config_provider.SelectorType.ENV),
    configFileSelector: (profile) => (0, import_util_config_provider.booleanSelector)(profile, CONFIG_USE_FIPS_ENDPOINT, import_util_config_provider.SelectorType.CONFIG),
    default: false
  };
  var import_util_middleware = require_dist_cjs2();
  var resolveCustomEndpointsConfig = /* @__PURE__ */ __name((input) => {
    const { tls, endpoint, urlParser, useDualstackEndpoint } = input;
    return Object.assign(input, {
      tls: tls ?? true,
      endpoint: (0, import_util_middleware.normalizeProvider)(typeof endpoint === "string" ? urlParser(endpoint) : endpoint),
      isCustomEndpoint: true,
      useDualstackEndpoint: (0, import_util_middleware.normalizeProvider)(useDualstackEndpoint ?? false)
    });
  }, "resolveCustomEndpointsConfig");
  var getEndpointFromRegion = /* @__PURE__ */ __name(async (input) => {
    const { tls = true } = input;
    const region = await input.region();
    const dnsHostRegex = new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/);
    if (!dnsHostRegex.test(region)) {
      throw new Error("Invalid region in client config");
    }
    const useDualstackEndpoint = await input.useDualstackEndpoint();
    const useFipsEndpoint = await input.useFipsEndpoint();
    const { hostname } = await input.regionInfoProvider(region, { useDualstackEndpoint, useFipsEndpoint }) ?? {};
    if (!hostname) {
      throw new Error("Cannot resolve hostname from client config");
    }
    return input.urlParser(`${tls ? "https:" : "http:"}//${hostname}`);
  }, "getEndpointFromRegion");
  var resolveEndpointsConfig = /* @__PURE__ */ __name((input) => {
    const useDualstackEndpoint = (0, import_util_middleware.normalizeProvider)(input.useDualstackEndpoint ?? false);
    const { endpoint, useFipsEndpoint, urlParser, tls } = input;
    return Object.assign(input, {
      tls: tls ?? true,
      endpoint: endpoint ? (0, import_util_middleware.normalizeProvider)(typeof endpoint === "string" ? urlParser(endpoint) : endpoint) : () => getEndpointFromRegion({ ...input, useDualstackEndpoint, useFipsEndpoint }),
      isCustomEndpoint: !!endpoint,
      useDualstackEndpoint
    });
  }, "resolveEndpointsConfig");
  var REGION_ENV_NAME = "AWS_REGION";
  var REGION_INI_NAME = "region";
  var NODE_REGION_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => env[REGION_ENV_NAME],
    configFileSelector: (profile) => profile[REGION_INI_NAME],
    default: () => {
      throw new Error("Region is missing");
    }
  };
  var NODE_REGION_CONFIG_FILE_OPTIONS = {
    preferredFile: "credentials"
  };
  var isFipsRegion = /* @__PURE__ */ __name((region) => typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips")), "isFipsRegion");
  var getRealRegion = /* @__PURE__ */ __name((region) => isFipsRegion(region) ? ["fips-aws-global", "aws-fips"].includes(region) ? "us-east-1" : region.replace(/fips-(dkr-|prod-)?|-fips/, "") : region, "getRealRegion");
  var resolveRegionConfig = /* @__PURE__ */ __name((input) => {
    const { region, useFipsEndpoint } = input;
    if (!region) {
      throw new Error("Region is missing");
    }
    return Object.assign(input, {
      region: async () => {
        if (typeof region === "string") {
          return getRealRegion(region);
        }
        const providedRegion = await region();
        return getRealRegion(providedRegion);
      },
      useFipsEndpoint: async () => {
        const providedRegion = typeof region === "string" ? region : await region();
        if (isFipsRegion(providedRegion)) {
          return true;
        }
        return typeof useFipsEndpoint !== "function" ? Promise.resolve(!!useFipsEndpoint) : useFipsEndpoint();
      }
    });
  }, "resolveRegionConfig");
  var getHostnameFromVariants = /* @__PURE__ */ __name((variants = [], { useFipsEndpoint, useDualstackEndpoint }) => variants.find(({ tags }) => useFipsEndpoint === tags.includes("fips") && useDualstackEndpoint === tags.includes("dualstack"))?.hostname, "getHostnameFromVariants");
  var getResolvedHostname = /* @__PURE__ */ __name((resolvedRegion, { regionHostname, partitionHostname }) => regionHostname ? regionHostname : partitionHostname ? partitionHostname.replace("{region}", resolvedRegion) : undefined, "getResolvedHostname");
  var getResolvedPartition = /* @__PURE__ */ __name((region, { partitionHash }) => Object.keys(partitionHash || {}).find((key) => partitionHash[key].regions.includes(region)) ?? "aws", "getResolvedPartition");
  var getResolvedSigningRegion = /* @__PURE__ */ __name((hostname, { signingRegion, regionRegex, useFipsEndpoint }) => {
    if (signingRegion) {
      return signingRegion;
    } else if (useFipsEndpoint) {
      const regionRegexJs = regionRegex.replace("\\\\", "\\").replace(/^\^/g, "\\.").replace(/\$$/g, "\\.");
      const regionRegexmatchArray = hostname.match(regionRegexJs);
      if (regionRegexmatchArray) {
        return regionRegexmatchArray[0].slice(1, -1);
      }
    }
  }, "getResolvedSigningRegion");
  var getRegionInfo = /* @__PURE__ */ __name((region, {
    useFipsEndpoint = false,
    useDualstackEndpoint = false,
    signingService,
    regionHash,
    partitionHash
  }) => {
    const partition = getResolvedPartition(region, { partitionHash });
    const resolvedRegion = region in regionHash ? region : partitionHash[partition]?.endpoint ?? region;
    const hostnameOptions = { useFipsEndpoint, useDualstackEndpoint };
    const regionHostname = getHostnameFromVariants(regionHash[resolvedRegion]?.variants, hostnameOptions);
    const partitionHostname = getHostnameFromVariants(partitionHash[partition]?.variants, hostnameOptions);
    const hostname = getResolvedHostname(resolvedRegion, { regionHostname, partitionHostname });
    if (hostname === undefined) {
      throw new Error(`Endpoint resolution failed for: ${{ resolvedRegion, useFipsEndpoint, useDualstackEndpoint }}`);
    }
    const signingRegion = getResolvedSigningRegion(hostname, {
      signingRegion: regionHash[resolvedRegion]?.signingRegion,
      regionRegex: partitionHash[partition].regionRegex,
      useFipsEndpoint
    });
    return {
      partition,
      signingService,
      hostname,
      ...signingRegion && { signingRegion },
      ...regionHash[resolvedRegion]?.signingService && {
        signingService: regionHash[resolvedRegion].signingService
      }
    };
  }, "getRegionInfo");
});

// ../../../../node_modules/@smithy/middleware-content-length/dist-cjs/index.js
var require_dist_cjs19 = __commonJS((exports, module) => {
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
    contentLengthMiddleware: () => contentLengthMiddleware,
    contentLengthMiddlewareOptions: () => contentLengthMiddlewareOptions,
    getContentLengthPlugin: () => getContentLengthPlugin
  });
  module.exports = __toCommonJS(src_exports);
  var import_protocol_http = require_dist_cjs3();
  var CONTENT_LENGTH_HEADER = "content-length";
  function contentLengthMiddleware(bodyLengthChecker) {
    return (next) => async (args) => {
      const request = args.request;
      if (import_protocol_http.HttpRequest.isInstance(request)) {
        const { body, headers } = request;
        if (body && Object.keys(headers).map((str) => str.toLowerCase()).indexOf(CONTENT_LENGTH_HEADER) === -1) {
          try {
            const length = bodyLengthChecker(body);
            request.headers = {
              ...request.headers,
              [CONTENT_LENGTH_HEADER]: String(length)
            };
          } catch (error) {}
        }
      }
      return next({
        ...args,
        request
      });
    };
  }
  __name(contentLengthMiddleware, "contentLengthMiddleware");
  var contentLengthMiddlewareOptions = {
    step: "build",
    tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
    name: "contentLengthMiddleware",
    override: true
  };
  var getContentLengthPlugin = /* @__PURE__ */ __name((options) => ({
    applyToStack: (clientStack) => {
      clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), contentLengthMiddlewareOptions);
    }
  }), "getContentLengthPlugin");
});

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-cjs/getHomeDir.js
var require_getHomeDir = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getHomeDir = undefined;
  var os_1 = __require("os");
  var path_1 = __require("path");
  var homeDirCache = {};
  var getHomeDirCacheKey = () => {
    if (process && process.geteuid) {
      return `${process.geteuid()}`;
    }
    return "DEFAULT";
  };
  var getHomeDir2 = () => {
    const { HOME, USERPROFILE, HOMEPATH, HOMEDRIVE = `C:${path_1.sep}` } = process.env;
    if (HOME)
      return HOME;
    if (USERPROFILE)
      return USERPROFILE;
    if (HOMEPATH)
      return `${HOMEDRIVE}${HOMEPATH}`;
    const homeDirCacheKey = getHomeDirCacheKey();
    if (!homeDirCache[homeDirCacheKey])
      homeDirCache[homeDirCacheKey] = (0, os_1.homedir)();
    return homeDirCache[homeDirCacheKey];
  };
  exports.getHomeDir = getHomeDir2;
});

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-cjs/getSSOTokenFilepath.js
var require_getSSOTokenFilepath = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getSSOTokenFilepath = undefined;
  var crypto_1 = __require("crypto");
  var path_1 = __require("path");
  var getHomeDir_1 = require_getHomeDir();
  var getSSOTokenFilepath2 = (id) => {
    const hasher = (0, crypto_1.createHash)("sha1");
    const cacheName = hasher.update(id).digest("hex");
    return (0, path_1.join)((0, getHomeDir_1.getHomeDir)(), ".aws", "sso", "cache", `${cacheName}.json`);
  };
  exports.getSSOTokenFilepath = getSSOTokenFilepath2;
});

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-cjs/getSSOTokenFromFile.js
var require_getSSOTokenFromFile = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getSSOTokenFromFile = undefined;
  var fs_1 = __require("fs");
  var getSSOTokenFilepath_1 = require_getSSOTokenFilepath();
  var { readFile } = fs_1.promises;
  var getSSOTokenFromFile2 = async (id) => {
    const ssoTokenFilepath = (0, getSSOTokenFilepath_1.getSSOTokenFilepath)(id);
    const ssoTokenText = await readFile(ssoTokenFilepath, "utf8");
    return JSON.parse(ssoTokenText);
  };
  exports.getSSOTokenFromFile = getSSOTokenFromFile2;
});

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-cjs/slurpFile.js
var require_slurpFile = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.slurpFile = undefined;
  var fs_1 = __require("fs");
  var { readFile } = fs_1.promises;
  var filePromisesHash = {};
  var slurpFile = (path, options) => {
    if (!filePromisesHash[path] || (options === null || options === undefined ? undefined : options.ignoreCache)) {
      filePromisesHash[path] = readFile(path, "utf8");
    }
    return filePromisesHash[path];
  };
  exports.slurpFile = slurpFile;
});

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-cjs/index.js
var require_dist_cjs20 = __commonJS((exports, module) => {
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
    CONFIG_PREFIX_SEPARATOR: () => CONFIG_PREFIX_SEPARATOR,
    DEFAULT_PROFILE: () => DEFAULT_PROFILE,
    ENV_PROFILE: () => ENV_PROFILE,
    getProfileName: () => getProfileName,
    loadSharedConfigFiles: () => loadSharedConfigFiles,
    loadSsoSessionData: () => loadSsoSessionData,
    parseKnownFiles: () => parseKnownFiles
  });
  module.exports = __toCommonJS(src_exports);
  __reExport(src_exports, require_getHomeDir(), module.exports);
  var ENV_PROFILE = "AWS_PROFILE";
  var DEFAULT_PROFILE = "default";
  var getProfileName = /* @__PURE__ */ __name((init) => init.profile || process.env[ENV_PROFILE] || DEFAULT_PROFILE, "getProfileName");
  __reExport(src_exports, require_getSSOTokenFilepath(), module.exports);
  __reExport(src_exports, require_getSSOTokenFromFile(), module.exports);
  var import_types = require_dist_cjs();
  var getConfigData = /* @__PURE__ */ __name((data) => Object.entries(data).filter(([key]) => {
    const indexOfSeparator = key.indexOf(CONFIG_PREFIX_SEPARATOR);
    if (indexOfSeparator === -1) {
      return false;
    }
    return Object.values(import_types.IniSectionType).includes(key.substring(0, indexOfSeparator));
  }).reduce((acc, [key, value]) => {
    const indexOfSeparator = key.indexOf(CONFIG_PREFIX_SEPARATOR);
    const updatedKey = key.substring(0, indexOfSeparator) === import_types.IniSectionType.PROFILE ? key.substring(indexOfSeparator + 1) : key;
    acc[updatedKey] = value;
    return acc;
  }, {
    ...data.default && { default: data.default }
  }), "getConfigData");
  var import_path = __require("path");
  var import_getHomeDir = require_getHomeDir();
  var ENV_CONFIG_PATH = "AWS_CONFIG_FILE";
  var getConfigFilepath = /* @__PURE__ */ __name(() => process.env[ENV_CONFIG_PATH] || (0, import_path.join)((0, import_getHomeDir.getHomeDir)(), ".aws", "config"), "getConfigFilepath");
  var import_getHomeDir2 = require_getHomeDir();
  var ENV_CREDENTIALS_PATH = "AWS_SHARED_CREDENTIALS_FILE";
  var getCredentialsFilepath = /* @__PURE__ */ __name(() => process.env[ENV_CREDENTIALS_PATH] || (0, import_path.join)((0, import_getHomeDir2.getHomeDir)(), ".aws", "credentials"), "getCredentialsFilepath");
  var import_getHomeDir3 = require_getHomeDir();
  var prefixKeyRegex = /^([\w-]+)\s(["'])?([\w-@\+\.%:/]+)\2$/;
  var profileNameBlockList = ["__proto__", "profile __proto__"];
  var parseIni = /* @__PURE__ */ __name((iniData) => {
    const map = {};
    let currentSection;
    let currentSubSection;
    for (const iniLine of iniData.split(/\r?\n/)) {
      const trimmedLine = iniLine.split(/(^|\s)[;#]/)[0].trim();
      const isSection = trimmedLine[0] === "[" && trimmedLine[trimmedLine.length - 1] === "]";
      if (isSection) {
        currentSection = undefined;
        currentSubSection = undefined;
        const sectionName = trimmedLine.substring(1, trimmedLine.length - 1);
        const matches = prefixKeyRegex.exec(sectionName);
        if (matches) {
          const [, prefix, , name] = matches;
          if (Object.values(import_types.IniSectionType).includes(prefix)) {
            currentSection = [prefix, name].join(CONFIG_PREFIX_SEPARATOR);
          }
        } else {
          currentSection = sectionName;
        }
        if (profileNameBlockList.includes(sectionName)) {
          throw new Error(`Found invalid profile name "${sectionName}"`);
        }
      } else if (currentSection) {
        const indexOfEqualsSign = trimmedLine.indexOf("=");
        if (![0, -1].includes(indexOfEqualsSign)) {
          const [name, value] = [
            trimmedLine.substring(0, indexOfEqualsSign).trim(),
            trimmedLine.substring(indexOfEqualsSign + 1).trim()
          ];
          if (value === "") {
            currentSubSection = name;
          } else {
            if (currentSubSection && iniLine.trimStart() === iniLine) {
              currentSubSection = undefined;
            }
            map[currentSection] = map[currentSection] || {};
            const key = currentSubSection ? [currentSubSection, name].join(CONFIG_PREFIX_SEPARATOR) : name;
            map[currentSection][key] = value;
          }
        }
      }
    }
    return map;
  }, "parseIni");
  var import_slurpFile = require_slurpFile();
  var swallowError = /* @__PURE__ */ __name(() => ({}), "swallowError");
  var CONFIG_PREFIX_SEPARATOR = ".";
  var loadSharedConfigFiles = /* @__PURE__ */ __name(async (init = {}) => {
    const { filepath = getCredentialsFilepath(), configFilepath = getConfigFilepath() } = init;
    const homeDir = (0, import_getHomeDir3.getHomeDir)();
    const relativeHomeDirPrefix = "~/";
    let resolvedFilepath = filepath;
    if (filepath.startsWith(relativeHomeDirPrefix)) {
      resolvedFilepath = (0, import_path.join)(homeDir, filepath.slice(2));
    }
    let resolvedConfigFilepath = configFilepath;
    if (configFilepath.startsWith(relativeHomeDirPrefix)) {
      resolvedConfigFilepath = (0, import_path.join)(homeDir, configFilepath.slice(2));
    }
    const parsedFiles = await Promise.all([
      (0, import_slurpFile.slurpFile)(resolvedConfigFilepath, {
        ignoreCache: init.ignoreCache
      }).then(parseIni).then(getConfigData).catch(swallowError),
      (0, import_slurpFile.slurpFile)(resolvedFilepath, {
        ignoreCache: init.ignoreCache
      }).then(parseIni).catch(swallowError)
    ]);
    return {
      configFile: parsedFiles[0],
      credentialsFile: parsedFiles[1]
    };
  }, "loadSharedConfigFiles");
  var getSsoSessionData = /* @__PURE__ */ __name((data) => Object.entries(data).filter(([key]) => key.startsWith(import_types.IniSectionType.SSO_SESSION + CONFIG_PREFIX_SEPARATOR)).reduce((acc, [key, value]) => ({ ...acc, [key.substring(key.indexOf(CONFIG_PREFIX_SEPARATOR) + 1)]: value }), {}), "getSsoSessionData");
  var import_slurpFile2 = require_slurpFile();
  var swallowError2 = /* @__PURE__ */ __name(() => ({}), "swallowError");
  var loadSsoSessionData = /* @__PURE__ */ __name(async (init = {}) => (0, import_slurpFile2.slurpFile)(init.configFilepath ?? getConfigFilepath()).then(parseIni).then(getSsoSessionData).catch(swallowError2), "loadSsoSessionData");
  var mergeConfigFiles = /* @__PURE__ */ __name((...files) => {
    const merged = {};
    for (const file of files) {
      for (const [key, values] of Object.entries(file)) {
        if (merged[key] !== undefined) {
          Object.assign(merged[key], values);
        } else {
          merged[key] = values;
        }
      }
    }
    return merged;
  }, "mergeConfigFiles");
  var parseKnownFiles = /* @__PURE__ */ __name(async (init) => {
    const parsedFiles = await loadSharedConfigFiles(init);
    return mergeConfigFiles(parsedFiles.configFile, parsedFiles.credentialsFile);
  }, "parseKnownFiles");
});

// ../../../../node_modules/@smithy/node-config-provider/dist-cjs/index.js
var require_dist_cjs21 = __commonJS((exports, module) => {
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
    loadConfig: () => loadConfig
  });
  module.exports = __toCommonJS(src_exports);
  var import_property_provider = require_dist_cjs8();
  function getSelectorName(functionString) {
    try {
      const constants = new Set(Array.from(functionString.match(/([A-Z_]){3,}/g) ?? []));
      constants.delete("CONFIG");
      constants.delete("CONFIG_PREFIX_SEPARATOR");
      constants.delete("ENV");
      return [...constants].join(", ");
    } catch (e) {
      return functionString;
    }
  }
  __name(getSelectorName, "getSelectorName");
  var fromEnv = /* @__PURE__ */ __name((envVarSelector, options) => async () => {
    try {
      const config = envVarSelector(process.env, options);
      if (config === undefined) {
        throw new Error;
      }
      return config;
    } catch (e) {
      throw new import_property_provider.CredentialsProviderError(e.message || `Not found in ENV: ${getSelectorName(envVarSelector.toString())}`, { logger: options?.logger });
    }
  }, "fromEnv");
  var import_shared_ini_file_loader = require_dist_cjs20();
  var fromSharedConfigFiles = /* @__PURE__ */ __name((configSelector, { preferredFile = "config", ...init } = {}) => async () => {
    const profile = (0, import_shared_ini_file_loader.getProfileName)(init);
    const { configFile, credentialsFile } = await (0, import_shared_ini_file_loader.loadSharedConfigFiles)(init);
    const profileFromCredentials = credentialsFile[profile] || {};
    const profileFromConfig = configFile[profile] || {};
    const mergedProfile = preferredFile === "config" ? { ...profileFromCredentials, ...profileFromConfig } : { ...profileFromConfig, ...profileFromCredentials };
    try {
      const cfgFile = preferredFile === "config" ? configFile : credentialsFile;
      const configValue = configSelector(mergedProfile, cfgFile);
      if (configValue === undefined) {
        throw new Error;
      }
      return configValue;
    } catch (e) {
      throw new import_property_provider.CredentialsProviderError(e.message || `Not found in config files w/ profile [${profile}]: ${getSelectorName(configSelector.toString())}`, { logger: init.logger });
    }
  }, "fromSharedConfigFiles");
  var isFunction = /* @__PURE__ */ __name((func) => typeof func === "function", "isFunction");
  var fromStatic = /* @__PURE__ */ __name((defaultValue) => isFunction(defaultValue) ? async () => await defaultValue() : (0, import_property_provider.fromStatic)(defaultValue), "fromStatic");
  var loadConfig = /* @__PURE__ */ __name(({ environmentVariableSelector, configFileSelector, default: defaultValue }, configuration = {}) => {
    const { signingName, logger } = configuration;
    const envOptions = { signingName, logger };
    return (0, import_property_provider.memoize)((0, import_property_provider.chain)(fromEnv(environmentVariableSelector, envOptions), fromSharedConfigFiles(configFileSelector, configuration), fromStatic(defaultValue)));
  }, "loadConfig");
});

// ../../../../node_modules/@smithy/middleware-endpoint/dist-cjs/adaptors/getEndpointUrlConfig.js
var require_getEndpointUrlConfig = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getEndpointUrlConfig = undefined;
  var shared_ini_file_loader_1 = require_dist_cjs20();
  var ENV_ENDPOINT_URL = "AWS_ENDPOINT_URL";
  var CONFIG_ENDPOINT_URL = "endpoint_url";
  var getEndpointUrlConfig = (serviceId) => ({
    environmentVariableSelector: (env) => {
      const serviceSuffixParts = serviceId.split(" ").map((w) => w.toUpperCase());
      const serviceEndpointUrl = env[[ENV_ENDPOINT_URL, ...serviceSuffixParts].join("_")];
      if (serviceEndpointUrl)
        return serviceEndpointUrl;
      const endpointUrl = env[ENV_ENDPOINT_URL];
      if (endpointUrl)
        return endpointUrl;
      return;
    },
    configFileSelector: (profile, config) => {
      if (config && profile.services) {
        const servicesSection = config[["services", profile.services].join(shared_ini_file_loader_1.CONFIG_PREFIX_SEPARATOR)];
        if (servicesSection) {
          const servicePrefixParts = serviceId.split(" ").map((w) => w.toLowerCase());
          const endpointUrl2 = servicesSection[[servicePrefixParts.join("_"), CONFIG_ENDPOINT_URL].join(shared_ini_file_loader_1.CONFIG_PREFIX_SEPARATOR)];
          if (endpointUrl2)
            return endpointUrl2;
        }
      }
      const endpointUrl = profile[CONFIG_ENDPOINT_URL];
      if (endpointUrl)
        return endpointUrl;
      return;
    },
    default: undefined
  });
  exports.getEndpointUrlConfig = getEndpointUrlConfig;
});

// ../../../../node_modules/@smithy/middleware-endpoint/dist-cjs/adaptors/getEndpointFromConfig.js
var require_getEndpointFromConfig = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getEndpointFromConfig = undefined;
  var node_config_provider_1 = require_dist_cjs21();
  var getEndpointUrlConfig_1 = require_getEndpointUrlConfig();
  var getEndpointFromConfig = async (serviceId) => (0, node_config_provider_1.loadConfig)((0, getEndpointUrlConfig_1.getEndpointUrlConfig)(serviceId !== null && serviceId !== undefined ? serviceId : ""))();
  exports.getEndpointFromConfig = getEndpointFromConfig;
});

// ../../../../node_modules/@smithy/querystring-parser/dist-cjs/index.js
var require_dist_cjs22 = __commonJS((exports, module) => {
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
    parseQueryString: () => parseQueryString
  });
  module.exports = __toCommonJS(src_exports);
  function parseQueryString(querystring) {
    const query = {};
    querystring = querystring.replace(/^\?/, "");
    if (querystring) {
      for (const pair of querystring.split("&")) {
        let [key, value = null] = pair.split("=");
        key = decodeURIComponent(key);
        if (value) {
          value = decodeURIComponent(value);
        }
        if (!(key in query)) {
          query[key] = value;
        } else if (Array.isArray(query[key])) {
          query[key].push(value);
        } else {
          query[key] = [query[key], value];
        }
      }
    }
    return query;
  }
  __name(parseQueryString, "parseQueryString");
});

// ../../../../node_modules/@smithy/url-parser/dist-cjs/index.js
var require_dist_cjs23 = __commonJS((exports, module) => {
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
    parseUrl: () => parseUrl
  });
  module.exports = __toCommonJS(src_exports);
  var import_querystring_parser = require_dist_cjs22();
  var parseUrl = /* @__PURE__ */ __name((url) => {
    if (typeof url === "string") {
      return parseUrl(new URL(url));
    }
    const { hostname, pathname, port, protocol, search } = url;
    let query;
    if (search) {
      query = (0, import_querystring_parser.parseQueryString)(search);
    }
    return {
      hostname,
      port: port ? parseInt(port) : undefined,
      protocol,
      path: pathname,
      query
    };
  }, "parseUrl");
});

// ../../../../node_modules/@smithy/middleware-endpoint/dist-cjs/index.js
var require_dist_cjs24 = __commonJS((exports, module) => {
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
    endpointMiddleware: () => endpointMiddleware,
    endpointMiddlewareOptions: () => endpointMiddlewareOptions,
    getEndpointFromInstructions: () => getEndpointFromInstructions,
    getEndpointPlugin: () => getEndpointPlugin,
    resolveEndpointConfig: () => resolveEndpointConfig,
    resolveParams: () => resolveParams,
    toEndpointV1: () => toEndpointV1
  });
  module.exports = __toCommonJS(src_exports);
  var resolveParamsForS3 = /* @__PURE__ */ __name(async (endpointParams) => {
    const bucket = endpointParams?.Bucket || "";
    if (typeof endpointParams.Bucket === "string") {
      endpointParams.Bucket = bucket.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"));
    }
    if (isArnBucketName(bucket)) {
      if (endpointParams.ForcePathStyle === true) {
        throw new Error("Path-style addressing cannot be used with ARN buckets");
      }
    } else if (!isDnsCompatibleBucketName(bucket) || bucket.indexOf(".") !== -1 && !String(endpointParams.Endpoint).startsWith("http:") || bucket.toLowerCase() !== bucket || bucket.length < 3) {
      endpointParams.ForcePathStyle = true;
    }
    if (endpointParams.DisableMultiRegionAccessPoints) {
      endpointParams.disableMultiRegionAccessPoints = true;
      endpointParams.DisableMRAP = true;
    }
    return endpointParams;
  }, "resolveParamsForS3");
  var DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
  var IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
  var DOTS_PATTERN = /\.\./;
  var isDnsCompatibleBucketName = /* @__PURE__ */ __name((bucketName) => DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName), "isDnsCompatibleBucketName");
  var isArnBucketName = /* @__PURE__ */ __name((bucketName) => {
    const [arn, partition, service, , , bucket] = bucketName.split(":");
    const isArn = arn === "arn" && bucketName.split(":").length >= 6;
    const isValidArn = Boolean(isArn && partition && service && bucket);
    if (isArn && !isValidArn) {
      throw new Error(`Invalid ARN: ${bucketName} was an invalid ARN.`);
    }
    return isValidArn;
  }, "isArnBucketName");
  var createConfigValueProvider = /* @__PURE__ */ __name((configKey, canonicalEndpointParamKey, config) => {
    const configProvider = /* @__PURE__ */ __name(async () => {
      const configValue = config[configKey] ?? config[canonicalEndpointParamKey];
      if (typeof configValue === "function") {
        return configValue();
      }
      return configValue;
    }, "configProvider");
    if (configKey === "credentialScope" || canonicalEndpointParamKey === "CredentialScope") {
      return async () => {
        const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
        const configValue = credentials?.credentialScope ?? credentials?.CredentialScope;
        return configValue;
      };
    }
    if (configKey === "accountId" || canonicalEndpointParamKey === "AccountId") {
      return async () => {
        const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
        const configValue = credentials?.accountId ?? credentials?.AccountId;
        return configValue;
      };
    }
    if (configKey === "endpoint" || canonicalEndpointParamKey === "endpoint") {
      return async () => {
        const endpoint = await configProvider();
        if (endpoint && typeof endpoint === "object") {
          if ("url" in endpoint) {
            return endpoint.url.href;
          }
          if ("hostname" in endpoint) {
            const { protocol, hostname, port, path } = endpoint;
            return `${protocol}//${hostname}${port ? ":" + port : ""}${path}`;
          }
        }
        return endpoint;
      };
    }
    return configProvider;
  }, "createConfigValueProvider");
  var import_getEndpointFromConfig = require_getEndpointFromConfig();
  var import_url_parser = require_dist_cjs23();
  var toEndpointV1 = /* @__PURE__ */ __name((endpoint) => {
    if (typeof endpoint === "object") {
      if ("url" in endpoint) {
        return (0, import_url_parser.parseUrl)(endpoint.url);
      }
      return endpoint;
    }
    return (0, import_url_parser.parseUrl)(endpoint);
  }, "toEndpointV1");
  var getEndpointFromInstructions = /* @__PURE__ */ __name(async (commandInput, instructionsSupplier, clientConfig, context) => {
    if (!clientConfig.endpoint) {
      let endpointFromConfig;
      if (clientConfig.serviceConfiguredEndpoint) {
        endpointFromConfig = await clientConfig.serviceConfiguredEndpoint();
      } else {
        endpointFromConfig = await (0, import_getEndpointFromConfig.getEndpointFromConfig)(clientConfig.serviceId);
      }
      if (endpointFromConfig) {
        clientConfig.endpoint = () => Promise.resolve(toEndpointV1(endpointFromConfig));
      }
    }
    const endpointParams = await resolveParams(commandInput, instructionsSupplier, clientConfig);
    if (typeof clientConfig.endpointProvider !== "function") {
      throw new Error("config.endpointProvider is not set.");
    }
    const endpoint = clientConfig.endpointProvider(endpointParams, context);
    return endpoint;
  }, "getEndpointFromInstructions");
  var resolveParams = /* @__PURE__ */ __name(async (commandInput, instructionsSupplier, clientConfig) => {
    const endpointParams = {};
    const instructions = instructionsSupplier?.getEndpointParameterInstructions?.() || {};
    for (const [name, instruction] of Object.entries(instructions)) {
      switch (instruction.type) {
        case "staticContextParams":
          endpointParams[name] = instruction.value;
          break;
        case "contextParams":
          endpointParams[name] = commandInput[instruction.name];
          break;
        case "clientContextParams":
        case "builtInParams":
          endpointParams[name] = await createConfigValueProvider(instruction.name, name, clientConfig)();
          break;
        case "operationContextParams":
          endpointParams[name] = instruction.get(commandInput);
          break;
        default:
          throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(instruction));
      }
    }
    if (Object.keys(instructions).length === 0) {
      Object.assign(endpointParams, clientConfig);
    }
    if (String(clientConfig.serviceId).toLowerCase() === "s3") {
      await resolveParamsForS3(endpointParams);
    }
    return endpointParams;
  }, "resolveParams");
  var import_core = require_dist_cjs7();
  var import_util_middleware = require_dist_cjs2();
  var endpointMiddleware = /* @__PURE__ */ __name(({
    config,
    instructions
  }) => {
    return (next, context) => async (args) => {
      if (config.endpoint) {
        (0, import_core.setFeature)(context, "ENDPOINT_OVERRIDE", "N");
      }
      const endpoint = await getEndpointFromInstructions(args.input, {
        getEndpointParameterInstructions() {
          return instructions;
        }
      }, { ...config }, context);
      context.endpointV2 = endpoint;
      context.authSchemes = endpoint.properties?.authSchemes;
      const authScheme = context.authSchemes?.[0];
      if (authScheme) {
        context["signing_region"] = authScheme.signingRegion;
        context["signing_service"] = authScheme.signingName;
        const smithyContext = (0, import_util_middleware.getSmithyContext)(context);
        const httpAuthOption = smithyContext?.selectedHttpAuthScheme?.httpAuthOption;
        if (httpAuthOption) {
          httpAuthOption.signingProperties = Object.assign(httpAuthOption.signingProperties || {}, {
            signing_region: authScheme.signingRegion,
            signingRegion: authScheme.signingRegion,
            signing_service: authScheme.signingName,
            signingName: authScheme.signingName,
            signingRegionSet: authScheme.signingRegionSet
          }, authScheme.properties);
        }
      }
      return next({
        ...args
      });
    };
  }, "endpointMiddleware");
  var import_middleware_serde = require_dist_cjs4();
  var endpointMiddlewareOptions = {
    step: "serialize",
    tags: ["ENDPOINT_PARAMETERS", "ENDPOINT_V2", "ENDPOINT"],
    name: "endpointV2Middleware",
    override: true,
    relation: "before",
    toMiddleware: import_middleware_serde.serializerMiddlewareOption.name
  };
  var getEndpointPlugin = /* @__PURE__ */ __name((config, instructions) => ({
    applyToStack: (clientStack) => {
      clientStack.addRelativeTo(endpointMiddleware({
        config,
        instructions
      }), endpointMiddlewareOptions);
    }
  }), "getEndpointPlugin");
  var import_getEndpointFromConfig2 = require_getEndpointFromConfig();
  var resolveEndpointConfig = /* @__PURE__ */ __name((input) => {
    const tls = input.tls ?? true;
    const { endpoint, useDualstackEndpoint, useFipsEndpoint } = input;
    const customEndpointProvider = endpoint != null ? async () => toEndpointV1(await (0, import_util_middleware.normalizeProvider)(endpoint)()) : undefined;
    const isCustomEndpoint = !!endpoint;
    const resolvedConfig = Object.assign(input, {
      endpoint: customEndpointProvider,
      tls,
      isCustomEndpoint,
      useDualstackEndpoint: (0, import_util_middleware.normalizeProvider)(useDualstackEndpoint ?? false),
      useFipsEndpoint: (0, import_util_middleware.normalizeProvider)(useFipsEndpoint ?? false)
    });
    let configuredEndpointPromise = undefined;
    resolvedConfig.serviceConfiguredEndpoint = async () => {
      if (input.serviceId && !configuredEndpointPromise) {
        configuredEndpointPromise = (0, import_getEndpointFromConfig2.getEndpointFromConfig)(input.serviceId);
      }
      return configuredEndpointPromise;
    };
    return resolvedConfig;
  }, "resolveEndpointConfig");
});

// ../../../../node_modules/@smithy/service-error-classification/dist-cjs/index.js
var require_dist_cjs25 = __commonJS((exports, module) => {
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
    isBrowserNetworkError: () => isBrowserNetworkError,
    isClockSkewCorrectedError: () => isClockSkewCorrectedError,
    isClockSkewError: () => isClockSkewError,
    isRetryableByTrait: () => isRetryableByTrait,
    isServerError: () => isServerError,
    isThrottlingError: () => isThrottlingError,
    isTransientError: () => isTransientError
  });
  module.exports = __toCommonJS(src_exports);
  var CLOCK_SKEW_ERROR_CODES = [
    "AuthFailure",
    "InvalidSignatureException",
    "RequestExpired",
    "RequestInTheFuture",
    "RequestTimeTooSkewed",
    "SignatureDoesNotMatch"
  ];
  var THROTTLING_ERROR_CODES = [
    "BandwidthLimitExceeded",
    "EC2ThrottledException",
    "LimitExceededException",
    "PriorRequestNotComplete",
    "ProvisionedThroughputExceededException",
    "RequestLimitExceeded",
    "RequestThrottled",
    "RequestThrottledException",
    "SlowDown",
    "ThrottledException",
    "Throttling",
    "ThrottlingException",
    "TooManyRequestsException",
    "TransactionInProgressException"
  ];
  var TRANSIENT_ERROR_CODES = ["TimeoutError", "RequestTimeout", "RequestTimeoutException"];
  var TRANSIENT_ERROR_STATUS_CODES = [500, 502, 503, 504];
  var NODEJS_TIMEOUT_ERROR_CODES = ["ECONNRESET", "ECONNREFUSED", "EPIPE", "ETIMEDOUT"];
  var isRetryableByTrait = /* @__PURE__ */ __name((error) => error.$retryable !== undefined, "isRetryableByTrait");
  var isClockSkewError = /* @__PURE__ */ __name((error) => CLOCK_SKEW_ERROR_CODES.includes(error.name), "isClockSkewError");
  var isClockSkewCorrectedError = /* @__PURE__ */ __name((error) => error.$metadata?.clockSkewCorrected, "isClockSkewCorrectedError");
  var isBrowserNetworkError = /* @__PURE__ */ __name((error) => {
    const errorMessages = /* @__PURE__ */ new Set([
      "Failed to fetch",
      "NetworkError when attempting to fetch resource",
      "The Internet connection appears to be offline",
      "Load failed",
      "Network request failed"
    ]);
    const isValid = error && error instanceof TypeError;
    if (!isValid) {
      return false;
    }
    return errorMessages.has(error.message);
  }, "isBrowserNetworkError");
  var isThrottlingError = /* @__PURE__ */ __name((error) => error.$metadata?.httpStatusCode === 429 || THROTTLING_ERROR_CODES.includes(error.name) || error.$retryable?.throttling == true, "isThrottlingError");
  var isTransientError = /* @__PURE__ */ __name((error, depth = 0) => isClockSkewCorrectedError(error) || TRANSIENT_ERROR_CODES.includes(error.name) || NODEJS_TIMEOUT_ERROR_CODES.includes(error?.code || "") || TRANSIENT_ERROR_STATUS_CODES.includes(error.$metadata?.httpStatusCode || 0) || isBrowserNetworkError(error) || error.cause !== undefined && depth <= 10 && isTransientError(error.cause, depth + 1), "isTransientError");
  var isServerError = /* @__PURE__ */ __name((error) => {
    if (error.$metadata?.httpStatusCode !== undefined) {
      const statusCode = error.$metadata.httpStatusCode;
      if (500 <= statusCode && statusCode <= 599 && !isTransientError(error)) {
        return true;
      }
      return false;
    }
    return false;
  }, "isServerError");
});

// ../../../../node_modules/@smithy/util-retry/dist-cjs/index.js
var require_dist_cjs26 = __commonJS((exports, module) => {
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
    AdaptiveRetryStrategy: () => AdaptiveRetryStrategy,
    ConfiguredRetryStrategy: () => ConfiguredRetryStrategy,
    DEFAULT_MAX_ATTEMPTS: () => DEFAULT_MAX_ATTEMPTS,
    DEFAULT_RETRY_DELAY_BASE: () => DEFAULT_RETRY_DELAY_BASE,
    DEFAULT_RETRY_MODE: () => DEFAULT_RETRY_MODE,
    DefaultRateLimiter: () => DefaultRateLimiter,
    INITIAL_RETRY_TOKENS: () => INITIAL_RETRY_TOKENS,
    INVOCATION_ID_HEADER: () => INVOCATION_ID_HEADER,
    MAXIMUM_RETRY_DELAY: () => MAXIMUM_RETRY_DELAY,
    NO_RETRY_INCREMENT: () => NO_RETRY_INCREMENT,
    REQUEST_HEADER: () => REQUEST_HEADER,
    RETRY_COST: () => RETRY_COST,
    RETRY_MODES: () => RETRY_MODES,
    StandardRetryStrategy: () => StandardRetryStrategy,
    THROTTLING_RETRY_DELAY_BASE: () => THROTTLING_RETRY_DELAY_BASE,
    TIMEOUT_RETRY_COST: () => TIMEOUT_RETRY_COST
  });
  module.exports = __toCommonJS(src_exports);
  var RETRY_MODES = /* @__PURE__ */ ((RETRY_MODES2) => {
    RETRY_MODES2["STANDARD"] = "standard";
    RETRY_MODES2["ADAPTIVE"] = "adaptive";
    return RETRY_MODES2;
  })(RETRY_MODES || {});
  var DEFAULT_MAX_ATTEMPTS = 3;
  var DEFAULT_RETRY_MODE = "standard";
  var import_service_error_classification = require_dist_cjs25();
  var DefaultRateLimiter = class _DefaultRateLimiter {
    constructor(options) {
      this.currentCapacity = 0;
      this.enabled = false;
      this.lastMaxRate = 0;
      this.measuredTxRate = 0;
      this.requestCount = 0;
      this.lastTimestamp = 0;
      this.timeWindow = 0;
      this.beta = options?.beta ?? 0.7;
      this.minCapacity = options?.minCapacity ?? 1;
      this.minFillRate = options?.minFillRate ?? 0.5;
      this.scaleConstant = options?.scaleConstant ?? 0.4;
      this.smooth = options?.smooth ?? 0.8;
      const currentTimeInSeconds = this.getCurrentTimeInSeconds();
      this.lastThrottleTime = currentTimeInSeconds;
      this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds());
      this.fillRate = this.minFillRate;
      this.maxCapacity = this.minCapacity;
    }
    static {
      __name(this, "DefaultRateLimiter");
    }
    static {
      this.setTimeoutFn = setTimeout;
    }
    getCurrentTimeInSeconds() {
      return Date.now() / 1000;
    }
    async getSendToken() {
      return this.acquireTokenBucket(1);
    }
    async acquireTokenBucket(amount) {
      if (!this.enabled) {
        return;
      }
      this.refillTokenBucket();
      if (amount > this.currentCapacity) {
        const delay = (amount - this.currentCapacity) / this.fillRate * 1000;
        await new Promise((resolve) => _DefaultRateLimiter.setTimeoutFn(resolve, delay));
      }
      this.currentCapacity = this.currentCapacity - amount;
    }
    refillTokenBucket() {
      const timestamp = this.getCurrentTimeInSeconds();
      if (!this.lastTimestamp) {
        this.lastTimestamp = timestamp;
        return;
      }
      const fillAmount = (timestamp - this.lastTimestamp) * this.fillRate;
      this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + fillAmount);
      this.lastTimestamp = timestamp;
    }
    updateClientSendingRate(response) {
      let calculatedRate;
      this.updateMeasuredRate();
      if ((0, import_service_error_classification.isThrottlingError)(response)) {
        const rateToUse = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
        this.lastMaxRate = rateToUse;
        this.calculateTimeWindow();
        this.lastThrottleTime = this.getCurrentTimeInSeconds();
        calculatedRate = this.cubicThrottle(rateToUse);
        this.enableTokenBucket();
      } else {
        this.calculateTimeWindow();
        calculatedRate = this.cubicSuccess(this.getCurrentTimeInSeconds());
      }
      const newRate = Math.min(calculatedRate, 2 * this.measuredTxRate);
      this.updateTokenBucketRate(newRate);
    }
    calculateTimeWindow() {
      this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 1 / 3));
    }
    cubicThrottle(rateToUse) {
      return this.getPrecise(rateToUse * this.beta);
    }
    cubicSuccess(timestamp) {
      return this.getPrecise(this.scaleConstant * Math.pow(timestamp - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
    }
    enableTokenBucket() {
      this.enabled = true;
    }
    updateTokenBucketRate(newRate) {
      this.refillTokenBucket();
      this.fillRate = Math.max(newRate, this.minFillRate);
      this.maxCapacity = Math.max(newRate, this.minCapacity);
      this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity);
    }
    updateMeasuredRate() {
      const t = this.getCurrentTimeInSeconds();
      const timeBucket = Math.floor(t * 2) / 2;
      this.requestCount++;
      if (timeBucket > this.lastTxRateBucket) {
        const currentRate = this.requestCount / (timeBucket - this.lastTxRateBucket);
        this.measuredTxRate = this.getPrecise(currentRate * this.smooth + this.measuredTxRate * (1 - this.smooth));
        this.requestCount = 0;
        this.lastTxRateBucket = timeBucket;
      }
    }
    getPrecise(num) {
      return parseFloat(num.toFixed(8));
    }
  };
  var DEFAULT_RETRY_DELAY_BASE = 100;
  var MAXIMUM_RETRY_DELAY = 20 * 1000;
  var THROTTLING_RETRY_DELAY_BASE = 500;
  var INITIAL_RETRY_TOKENS = 500;
  var RETRY_COST = 5;
  var TIMEOUT_RETRY_COST = 10;
  var NO_RETRY_INCREMENT = 1;
  var INVOCATION_ID_HEADER = "amz-sdk-invocation-id";
  var REQUEST_HEADER = "amz-sdk-request";
  var getDefaultRetryBackoffStrategy = /* @__PURE__ */ __name(() => {
    let delayBase = DEFAULT_RETRY_DELAY_BASE;
    const computeNextBackoffDelay = /* @__PURE__ */ __name((attempts) => {
      return Math.floor(Math.min(MAXIMUM_RETRY_DELAY, Math.random() * 2 ** attempts * delayBase));
    }, "computeNextBackoffDelay");
    const setDelayBase = /* @__PURE__ */ __name((delay) => {
      delayBase = delay;
    }, "setDelayBase");
    return {
      computeNextBackoffDelay,
      setDelayBase
    };
  }, "getDefaultRetryBackoffStrategy");
  var createDefaultRetryToken = /* @__PURE__ */ __name(({
    retryDelay,
    retryCount,
    retryCost
  }) => {
    const getRetryCount = /* @__PURE__ */ __name(() => retryCount, "getRetryCount");
    const getRetryDelay = /* @__PURE__ */ __name(() => Math.min(MAXIMUM_RETRY_DELAY, retryDelay), "getRetryDelay");
    const getRetryCost = /* @__PURE__ */ __name(() => retryCost, "getRetryCost");
    return {
      getRetryCount,
      getRetryDelay,
      getRetryCost
    };
  }, "createDefaultRetryToken");
  var StandardRetryStrategy = class {
    constructor(maxAttempts) {
      this.maxAttempts = maxAttempts;
      this.mode = "standard";
      this.capacity = INITIAL_RETRY_TOKENS;
      this.retryBackoffStrategy = getDefaultRetryBackoffStrategy();
      this.maxAttemptsProvider = typeof maxAttempts === "function" ? maxAttempts : async () => maxAttempts;
    }
    static {
      __name(this, "StandardRetryStrategy");
    }
    async acquireInitialRetryToken(retryTokenScope) {
      return createDefaultRetryToken({
        retryDelay: DEFAULT_RETRY_DELAY_BASE,
        retryCount: 0
      });
    }
    async refreshRetryTokenForRetry(token, errorInfo) {
      const maxAttempts = await this.getMaxAttempts();
      if (this.shouldRetry(token, errorInfo, maxAttempts)) {
        const errorType = errorInfo.errorType;
        this.retryBackoffStrategy.setDelayBase(errorType === "THROTTLING" ? THROTTLING_RETRY_DELAY_BASE : DEFAULT_RETRY_DELAY_BASE);
        const delayFromErrorType = this.retryBackoffStrategy.computeNextBackoffDelay(token.getRetryCount());
        const retryDelay = errorInfo.retryAfterHint ? Math.max(errorInfo.retryAfterHint.getTime() - Date.now() || 0, delayFromErrorType) : delayFromErrorType;
        const capacityCost = this.getCapacityCost(errorType);
        this.capacity -= capacityCost;
        return createDefaultRetryToken({
          retryDelay,
          retryCount: token.getRetryCount() + 1,
          retryCost: capacityCost
        });
      }
      throw new Error("No retry token available");
    }
    recordSuccess(token) {
      this.capacity = Math.max(INITIAL_RETRY_TOKENS, this.capacity + (token.getRetryCost() ?? NO_RETRY_INCREMENT));
    }
    getCapacity() {
      return this.capacity;
    }
    async getMaxAttempts() {
      try {
        return await this.maxAttemptsProvider();
      } catch (error) {
        console.warn(`Max attempts provider could not resolve. Using default of ${DEFAULT_MAX_ATTEMPTS}`);
        return DEFAULT_MAX_ATTEMPTS;
      }
    }
    shouldRetry(tokenToRenew, errorInfo, maxAttempts) {
      const attempts = tokenToRenew.getRetryCount() + 1;
      return attempts < maxAttempts && this.capacity >= this.getCapacityCost(errorInfo.errorType) && this.isRetryableError(errorInfo.errorType);
    }
    getCapacityCost(errorType) {
      return errorType === "TRANSIENT" ? TIMEOUT_RETRY_COST : RETRY_COST;
    }
    isRetryableError(errorType) {
      return errorType === "THROTTLING" || errorType === "TRANSIENT";
    }
  };
  var AdaptiveRetryStrategy = class {
    constructor(maxAttemptsProvider, options) {
      this.maxAttemptsProvider = maxAttemptsProvider;
      this.mode = "adaptive";
      const { rateLimiter } = options ?? {};
      this.rateLimiter = rateLimiter ?? new DefaultRateLimiter;
      this.standardRetryStrategy = new StandardRetryStrategy(maxAttemptsProvider);
    }
    static {
      __name(this, "AdaptiveRetryStrategy");
    }
    async acquireInitialRetryToken(retryTokenScope) {
      await this.rateLimiter.getSendToken();
      return this.standardRetryStrategy.acquireInitialRetryToken(retryTokenScope);
    }
    async refreshRetryTokenForRetry(tokenToRenew, errorInfo) {
      this.rateLimiter.updateClientSendingRate(errorInfo);
      return this.standardRetryStrategy.refreshRetryTokenForRetry(tokenToRenew, errorInfo);
    }
    recordSuccess(token) {
      this.rateLimiter.updateClientSendingRate({});
      this.standardRetryStrategy.recordSuccess(token);
    }
  };
  var ConfiguredRetryStrategy = class extends StandardRetryStrategy {
    static {
      __name(this, "ConfiguredRetryStrategy");
    }
    constructor(maxAttempts, computeNextBackoffDelay = DEFAULT_RETRY_DELAY_BASE) {
      super(typeof maxAttempts === "function" ? maxAttempts : async () => maxAttempts);
      if (typeof computeNextBackoffDelay === "number") {
        this.computeNextBackoffDelay = () => computeNextBackoffDelay;
      } else {
        this.computeNextBackoffDelay = computeNextBackoffDelay;
      }
    }
    async refreshRetryTokenForRetry(tokenToRenew, errorInfo) {
      const token = await super.refreshRetryTokenForRetry(tokenToRenew, errorInfo);
      token.getRetryDelay = () => this.computeNextBackoffDelay(token.getRetryCount());
      return token;
    }
  };
});

// ../../../../node_modules/@smithy/middleware-retry/dist-cjs/isStreamingPayload/isStreamingPayload.js
var require_isStreamingPayload = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.isStreamingPayload = undefined;
  var stream_1 = __require("stream");
  var isStreamingPayload = (request) => (request === null || request === undefined ? undefined : request.body) instanceof stream_1.Readable || typeof ReadableStream !== "undefined" && (request === null || request === undefined ? undefined : request.body) instanceof ReadableStream;
  exports.isStreamingPayload = isStreamingPayload;
});

// ../../../../node_modules/@smithy/middleware-retry/dist-cjs/index.js
var require_dist_cjs27 = __commonJS((exports, module) => {
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
    AdaptiveRetryStrategy: () => AdaptiveRetryStrategy,
    CONFIG_MAX_ATTEMPTS: () => CONFIG_MAX_ATTEMPTS,
    CONFIG_RETRY_MODE: () => CONFIG_RETRY_MODE,
    ENV_MAX_ATTEMPTS: () => ENV_MAX_ATTEMPTS,
    ENV_RETRY_MODE: () => ENV_RETRY_MODE,
    NODE_MAX_ATTEMPT_CONFIG_OPTIONS: () => NODE_MAX_ATTEMPT_CONFIG_OPTIONS,
    NODE_RETRY_MODE_CONFIG_OPTIONS: () => NODE_RETRY_MODE_CONFIG_OPTIONS,
    StandardRetryStrategy: () => StandardRetryStrategy,
    defaultDelayDecider: () => defaultDelayDecider,
    defaultRetryDecider: () => defaultRetryDecider,
    getOmitRetryHeadersPlugin: () => getOmitRetryHeadersPlugin,
    getRetryAfterHint: () => getRetryAfterHint,
    getRetryPlugin: () => getRetryPlugin,
    omitRetryHeadersMiddleware: () => omitRetryHeadersMiddleware,
    omitRetryHeadersMiddlewareOptions: () => omitRetryHeadersMiddlewareOptions,
    resolveRetryConfig: () => resolveRetryConfig,
    retryMiddleware: () => retryMiddleware,
    retryMiddlewareOptions: () => retryMiddlewareOptions
  });
  module.exports = __toCommonJS(src_exports);
  var import_protocol_http = require_dist_cjs3();
  var import_uuid = require_dist();
  var import_util_retry = require_dist_cjs26();
  var getDefaultRetryQuota = /* @__PURE__ */ __name((initialRetryTokens, options) => {
    const MAX_CAPACITY = initialRetryTokens;
    const noRetryIncrement = options?.noRetryIncrement ?? import_util_retry.NO_RETRY_INCREMENT;
    const retryCost = options?.retryCost ?? import_util_retry.RETRY_COST;
    const timeoutRetryCost = options?.timeoutRetryCost ?? import_util_retry.TIMEOUT_RETRY_COST;
    let availableCapacity = initialRetryTokens;
    const getCapacityAmount = /* @__PURE__ */ __name((error) => error.name === "TimeoutError" ? timeoutRetryCost : retryCost, "getCapacityAmount");
    const hasRetryTokens = /* @__PURE__ */ __name((error) => getCapacityAmount(error) <= availableCapacity, "hasRetryTokens");
    const retrieveRetryTokens = /* @__PURE__ */ __name((error) => {
      if (!hasRetryTokens(error)) {
        throw new Error("No retry token available");
      }
      const capacityAmount = getCapacityAmount(error);
      availableCapacity -= capacityAmount;
      return capacityAmount;
    }, "retrieveRetryTokens");
    const releaseRetryTokens = /* @__PURE__ */ __name((capacityReleaseAmount) => {
      availableCapacity += capacityReleaseAmount ?? noRetryIncrement;
      availableCapacity = Math.min(availableCapacity, MAX_CAPACITY);
    }, "releaseRetryTokens");
    return Object.freeze({
      hasRetryTokens,
      retrieveRetryTokens,
      releaseRetryTokens
    });
  }, "getDefaultRetryQuota");
  var defaultDelayDecider = /* @__PURE__ */ __name((delayBase, attempts) => Math.floor(Math.min(import_util_retry.MAXIMUM_RETRY_DELAY, Math.random() * 2 ** attempts * delayBase)), "defaultDelayDecider");
  var import_service_error_classification = require_dist_cjs25();
  var defaultRetryDecider = /* @__PURE__ */ __name((error) => {
    if (!error) {
      return false;
    }
    return (0, import_service_error_classification.isRetryableByTrait)(error) || (0, import_service_error_classification.isClockSkewError)(error) || (0, import_service_error_classification.isThrottlingError)(error) || (0, import_service_error_classification.isTransientError)(error);
  }, "defaultRetryDecider");
  var asSdkError = /* @__PURE__ */ __name((error) => {
    if (error instanceof Error)
      return error;
    if (error instanceof Object)
      return Object.assign(new Error, error);
    if (typeof error === "string")
      return new Error(error);
    return new Error(`AWS SDK error wrapper for ${error}`);
  }, "asSdkError");
  var StandardRetryStrategy = class {
    constructor(maxAttemptsProvider, options) {
      this.maxAttemptsProvider = maxAttemptsProvider;
      this.mode = import_util_retry.RETRY_MODES.STANDARD;
      this.retryDecider = options?.retryDecider ?? defaultRetryDecider;
      this.delayDecider = options?.delayDecider ?? defaultDelayDecider;
      this.retryQuota = options?.retryQuota ?? getDefaultRetryQuota(import_util_retry.INITIAL_RETRY_TOKENS);
    }
    static {
      __name(this, "StandardRetryStrategy");
    }
    shouldRetry(error, attempts, maxAttempts) {
      return attempts < maxAttempts && this.retryDecider(error) && this.retryQuota.hasRetryTokens(error);
    }
    async getMaxAttempts() {
      let maxAttempts;
      try {
        maxAttempts = await this.maxAttemptsProvider();
      } catch (error) {
        maxAttempts = import_util_retry.DEFAULT_MAX_ATTEMPTS;
      }
      return maxAttempts;
    }
    async retry(next, args, options) {
      let retryTokenAmount;
      let attempts = 0;
      let totalDelay = 0;
      const maxAttempts = await this.getMaxAttempts();
      const { request } = args;
      if (import_protocol_http.HttpRequest.isInstance(request)) {
        request.headers[import_util_retry.INVOCATION_ID_HEADER] = (0, import_uuid.v4)();
      }
      while (true) {
        try {
          if (import_protocol_http.HttpRequest.isInstance(request)) {
            request.headers[import_util_retry.REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
          }
          if (options?.beforeRequest) {
            await options.beforeRequest();
          }
          const { response, output } = await next(args);
          if (options?.afterRequest) {
            options.afterRequest(response);
          }
          this.retryQuota.releaseRetryTokens(retryTokenAmount);
          output.$metadata.attempts = attempts + 1;
          output.$metadata.totalRetryDelay = totalDelay;
          return { response, output };
        } catch (e) {
          const err = asSdkError(e);
          attempts++;
          if (this.shouldRetry(err, attempts, maxAttempts)) {
            retryTokenAmount = this.retryQuota.retrieveRetryTokens(err);
            const delayFromDecider = this.delayDecider((0, import_service_error_classification.isThrottlingError)(err) ? import_util_retry.THROTTLING_RETRY_DELAY_BASE : import_util_retry.DEFAULT_RETRY_DELAY_BASE, attempts);
            const delayFromResponse = getDelayFromRetryAfterHeader(err.$response);
            const delay = Math.max(delayFromResponse || 0, delayFromDecider);
            totalDelay += delay;
            await new Promise((resolve) => setTimeout(resolve, delay));
            continue;
          }
          if (!err.$metadata) {
            err.$metadata = {};
          }
          err.$metadata.attempts = attempts;
          err.$metadata.totalRetryDelay = totalDelay;
          throw err;
        }
      }
    }
  };
  var getDelayFromRetryAfterHeader = /* @__PURE__ */ __name((response) => {
    if (!import_protocol_http.HttpResponse.isInstance(response))
      return;
    const retryAfterHeaderName = Object.keys(response.headers).find((key) => key.toLowerCase() === "retry-after");
    if (!retryAfterHeaderName)
      return;
    const retryAfter = response.headers[retryAfterHeaderName];
    const retryAfterSeconds = Number(retryAfter);
    if (!Number.isNaN(retryAfterSeconds))
      return retryAfterSeconds * 1000;
    const retryAfterDate = new Date(retryAfter);
    return retryAfterDate.getTime() - Date.now();
  }, "getDelayFromRetryAfterHeader");
  var AdaptiveRetryStrategy = class extends StandardRetryStrategy {
    static {
      __name(this, "AdaptiveRetryStrategy");
    }
    constructor(maxAttemptsProvider, options) {
      const { rateLimiter, ...superOptions } = options ?? {};
      super(maxAttemptsProvider, superOptions);
      this.rateLimiter = rateLimiter ?? new import_util_retry.DefaultRateLimiter;
      this.mode = import_util_retry.RETRY_MODES.ADAPTIVE;
    }
    async retry(next, args) {
      return super.retry(next, args, {
        beforeRequest: async () => {
          return this.rateLimiter.getSendToken();
        },
        afterRequest: (response) => {
          this.rateLimiter.updateClientSendingRate(response);
        }
      });
    }
  };
  var import_util_middleware = require_dist_cjs2();
  var ENV_MAX_ATTEMPTS = "AWS_MAX_ATTEMPTS";
  var CONFIG_MAX_ATTEMPTS = "max_attempts";
  var NODE_MAX_ATTEMPT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => {
      const value = env[ENV_MAX_ATTEMPTS];
      if (!value)
        return;
      const maxAttempt = parseInt(value);
      if (Number.isNaN(maxAttempt)) {
        throw new Error(`Environment variable ${ENV_MAX_ATTEMPTS} mast be a number, got "${value}"`);
      }
      return maxAttempt;
    },
    configFileSelector: (profile) => {
      const value = profile[CONFIG_MAX_ATTEMPTS];
      if (!value)
        return;
      const maxAttempt = parseInt(value);
      if (Number.isNaN(maxAttempt)) {
        throw new Error(`Shared config file entry ${CONFIG_MAX_ATTEMPTS} mast be a number, got "${value}"`);
      }
      return maxAttempt;
    },
    default: import_util_retry.DEFAULT_MAX_ATTEMPTS
  };
  var resolveRetryConfig = /* @__PURE__ */ __name((input) => {
    const { retryStrategy, retryMode: _retryMode, maxAttempts: _maxAttempts } = input;
    const maxAttempts = (0, import_util_middleware.normalizeProvider)(_maxAttempts ?? import_util_retry.DEFAULT_MAX_ATTEMPTS);
    return Object.assign(input, {
      maxAttempts,
      retryStrategy: async () => {
        if (retryStrategy) {
          return retryStrategy;
        }
        const retryMode = await (0, import_util_middleware.normalizeProvider)(_retryMode)();
        if (retryMode === import_util_retry.RETRY_MODES.ADAPTIVE) {
          return new import_util_retry.AdaptiveRetryStrategy(maxAttempts);
        }
        return new import_util_retry.StandardRetryStrategy(maxAttempts);
      }
    });
  }, "resolveRetryConfig");
  var ENV_RETRY_MODE = "AWS_RETRY_MODE";
  var CONFIG_RETRY_MODE = "retry_mode";
  var NODE_RETRY_MODE_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => env[ENV_RETRY_MODE],
    configFileSelector: (profile) => profile[CONFIG_RETRY_MODE],
    default: import_util_retry.DEFAULT_RETRY_MODE
  };
  var omitRetryHeadersMiddleware = /* @__PURE__ */ __name(() => (next) => async (args) => {
    const { request } = args;
    if (import_protocol_http.HttpRequest.isInstance(request)) {
      delete request.headers[import_util_retry.INVOCATION_ID_HEADER];
      delete request.headers[import_util_retry.REQUEST_HEADER];
    }
    return next(args);
  }, "omitRetryHeadersMiddleware");
  var omitRetryHeadersMiddlewareOptions = {
    name: "omitRetryHeadersMiddleware",
    tags: ["RETRY", "HEADERS", "OMIT_RETRY_HEADERS"],
    relation: "before",
    toMiddleware: "awsAuthMiddleware",
    override: true
  };
  var getOmitRetryHeadersPlugin = /* @__PURE__ */ __name((options) => ({
    applyToStack: (clientStack) => {
      clientStack.addRelativeTo(omitRetryHeadersMiddleware(), omitRetryHeadersMiddlewareOptions);
    }
  }), "getOmitRetryHeadersPlugin");
  var import_smithy_client = require_dist_cjs9();
  var import_isStreamingPayload = require_isStreamingPayload();
  var retryMiddleware = /* @__PURE__ */ __name((options) => (next, context) => async (args) => {
    let retryStrategy = await options.retryStrategy();
    const maxAttempts = await options.maxAttempts();
    if (isRetryStrategyV2(retryStrategy)) {
      retryStrategy = retryStrategy;
      let retryToken = await retryStrategy.acquireInitialRetryToken(context["partition_id"]);
      let lastError = new Error;
      let attempts = 0;
      let totalRetryDelay = 0;
      const { request } = args;
      const isRequest = import_protocol_http.HttpRequest.isInstance(request);
      if (isRequest) {
        request.headers[import_util_retry.INVOCATION_ID_HEADER] = (0, import_uuid.v4)();
      }
      while (true) {
        try {
          if (isRequest) {
            request.headers[import_util_retry.REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
          }
          const { response, output } = await next(args);
          retryStrategy.recordSuccess(retryToken);
          output.$metadata.attempts = attempts + 1;
          output.$metadata.totalRetryDelay = totalRetryDelay;
          return { response, output };
        } catch (e) {
          const retryErrorInfo = getRetryErrorInfo(e);
          lastError = asSdkError(e);
          if (isRequest && (0, import_isStreamingPayload.isStreamingPayload)(request)) {
            (context.logger instanceof import_smithy_client.NoOpLogger ? console : context.logger)?.warn("An error was encountered in a non-retryable streaming request.");
            throw lastError;
          }
          try {
            retryToken = await retryStrategy.refreshRetryTokenForRetry(retryToken, retryErrorInfo);
          } catch (refreshError) {
            if (!lastError.$metadata) {
              lastError.$metadata = {};
            }
            lastError.$metadata.attempts = attempts + 1;
            lastError.$metadata.totalRetryDelay = totalRetryDelay;
            throw lastError;
          }
          attempts = retryToken.getRetryCount();
          const delay = retryToken.getRetryDelay();
          totalRetryDelay += delay;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    } else {
      retryStrategy = retryStrategy;
      if (retryStrategy?.mode)
        context.userAgent = [...context.userAgent || [], ["cfg/retry-mode", retryStrategy.mode]];
      return retryStrategy.retry(next, args);
    }
  }, "retryMiddleware");
  var isRetryStrategyV2 = /* @__PURE__ */ __name((retryStrategy) => typeof retryStrategy.acquireInitialRetryToken !== "undefined" && typeof retryStrategy.refreshRetryTokenForRetry !== "undefined" && typeof retryStrategy.recordSuccess !== "undefined", "isRetryStrategyV2");
  var getRetryErrorInfo = /* @__PURE__ */ __name((error) => {
    const errorInfo = {
      error,
      errorType: getRetryErrorType(error)
    };
    const retryAfterHint = getRetryAfterHint(error.$response);
    if (retryAfterHint) {
      errorInfo.retryAfterHint = retryAfterHint;
    }
    return errorInfo;
  }, "getRetryErrorInfo");
  var getRetryErrorType = /* @__PURE__ */ __name((error) => {
    if ((0, import_service_error_classification.isThrottlingError)(error))
      return "THROTTLING";
    if ((0, import_service_error_classification.isTransientError)(error))
      return "TRANSIENT";
    if ((0, import_service_error_classification.isServerError)(error))
      return "SERVER_ERROR";
    return "CLIENT_ERROR";
  }, "getRetryErrorType");
  var retryMiddlewareOptions = {
    name: "retryMiddleware",
    tags: ["RETRY"],
    step: "finalizeRequest",
    priority: "high",
    override: true
  };
  var getRetryPlugin = /* @__PURE__ */ __name((options) => ({
    applyToStack: (clientStack) => {
      clientStack.add(retryMiddleware(options), retryMiddlewareOptions);
    }
  }), "getRetryPlugin");
  var getRetryAfterHint = /* @__PURE__ */ __name((response) => {
    if (!import_protocol_http.HttpResponse.isInstance(response))
      return;
    const retryAfterHeaderName = Object.keys(response.headers).find((key) => key.toLowerCase() === "retry-after");
    if (!retryAfterHeaderName)
      return;
    const retryAfter = response.headers[retryAfterHeaderName];
    const retryAfterSeconds = Number(retryAfter);
    if (!Number.isNaN(retryAfterSeconds))
      return new Date(retryAfterSeconds * 1000);
    const retryAfterDate = new Date(retryAfter);
    return retryAfterDate;
  }, "getRetryAfterHint");
});

// ../../../../node_modules/@aws-sdk/region-config-resolver/dist-cjs/index.js
var require_dist_cjs28 = __commonJS((exports, module) => {
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
  var index_exports = {};
  __export(index_exports, {
    NODE_REGION_CONFIG_FILE_OPTIONS: () => NODE_REGION_CONFIG_FILE_OPTIONS,
    NODE_REGION_CONFIG_OPTIONS: () => NODE_REGION_CONFIG_OPTIONS,
    REGION_ENV_NAME: () => REGION_ENV_NAME,
    REGION_INI_NAME: () => REGION_INI_NAME,
    getAwsRegionExtensionConfiguration: () => getAwsRegionExtensionConfiguration,
    resolveAwsRegionExtensionConfiguration: () => resolveAwsRegionExtensionConfiguration,
    resolveRegionConfig: () => resolveRegionConfig
  });
  module.exports = __toCommonJS(index_exports);
  var getAwsRegionExtensionConfiguration = /* @__PURE__ */ __name((runtimeConfig) => {
    return {
      setRegion(region) {
        runtimeConfig.region = region;
      },
      region() {
        return runtimeConfig.region;
      }
    };
  }, "getAwsRegionExtensionConfiguration");
  var resolveAwsRegionExtensionConfiguration = /* @__PURE__ */ __name((awsRegionExtensionConfiguration) => {
    return {
      region: awsRegionExtensionConfiguration.region()
    };
  }, "resolveAwsRegionExtensionConfiguration");
  var REGION_ENV_NAME = "AWS_REGION";
  var REGION_INI_NAME = "region";
  var NODE_REGION_CONFIG_OPTIONS = {
    environmentVariableSelector: /* @__PURE__ */ __name((env) => env[REGION_ENV_NAME], "environmentVariableSelector"),
    configFileSelector: /* @__PURE__ */ __name((profile) => profile[REGION_INI_NAME], "configFileSelector"),
    default: /* @__PURE__ */ __name(() => {
      throw new Error("Region is missing");
    }, "default")
  };
  var NODE_REGION_CONFIG_FILE_OPTIONS = {
    preferredFile: "credentials"
  };
  var isFipsRegion = /* @__PURE__ */ __name((region) => typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips")), "isFipsRegion");
  var getRealRegion = /* @__PURE__ */ __name((region) => isFipsRegion(region) ? ["fips-aws-global", "aws-fips"].includes(region) ? "us-east-1" : region.replace(/fips-(dkr-|prod-)?|-fips/, "") : region, "getRealRegion");
  var resolveRegionConfig = /* @__PURE__ */ __name((input) => {
    const { region, useFipsEndpoint } = input;
    if (!region) {
      throw new Error("Region is missing");
    }
    return Object.assign(input, {
      region: /* @__PURE__ */ __name(async () => {
        if (typeof region === "string") {
          return getRealRegion(region);
        }
        const providedRegion = await region();
        return getRealRegion(providedRegion);
      }, "region"),
      useFipsEndpoint: /* @__PURE__ */ __name(async () => {
        const providedRegion = typeof region === "string" ? region : await region();
        if (isFipsRegion(providedRegion)) {
          return true;
        }
        return typeof useFipsEndpoint !== "function" ? Promise.resolve(!!useFipsEndpoint) : useFipsEndpoint();
      }, "useFipsEndpoint")
    });
  }, "resolveRegionConfig");
});

// ../../../../node_modules/@aws-sdk/nested-clients/package.json
var require_package = __commonJS((exports, module) => {
  module.exports = {
    name: "@aws-sdk/nested-clients",
    version: "3.828.0",
    description: "Nested clients for AWS SDK packages.",
    main: "./dist-cjs/index.js",
    module: "./dist-es/index.js",
    types: "./dist-types/index.d.ts",
    scripts: {
      build: "yarn lint && concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
      "build:cjs": "node ../../scripts/compilation/inline nested-clients",
      "build:es": "tsc -p tsconfig.es.json",
      "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
      "build:types": "tsc -p tsconfig.types.json",
      "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
      clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
      lint: "node ../../scripts/validation/submodules-linter.js --pkg nested-clients",
      test: "yarn g:vitest run",
      "test:watch": "yarn g:vitest watch"
    },
    engines: {
      node: ">=18.0.0"
    },
    author: {
      name: "AWS SDK for JavaScript Team",
      url: "https://aws.amazon.com/javascript/"
    },
    license: "Apache-2.0",
    dependencies: {
      "@aws-crypto/sha256-browser": "5.2.0",
      "@aws-crypto/sha256-js": "5.2.0",
      "@aws-sdk/core": "3.826.0",
      "@aws-sdk/middleware-host-header": "3.821.0",
      "@aws-sdk/middleware-logger": "3.821.0",
      "@aws-sdk/middleware-recursion-detection": "3.821.0",
      "@aws-sdk/middleware-user-agent": "3.828.0",
      "@aws-sdk/region-config-resolver": "3.821.0",
      "@aws-sdk/types": "3.821.0",
      "@aws-sdk/util-endpoints": "3.828.0",
      "@aws-sdk/util-user-agent-browser": "3.821.0",
      "@aws-sdk/util-user-agent-node": "3.828.0",
      "@smithy/config-resolver": "^4.1.4",
      "@smithy/core": "^3.5.3",
      "@smithy/fetch-http-handler": "^5.0.4",
      "@smithy/hash-node": "^4.0.4",
      "@smithy/invalid-dependency": "^4.0.4",
      "@smithy/middleware-content-length": "^4.0.4",
      "@smithy/middleware-endpoint": "^4.1.11",
      "@smithy/middleware-retry": "^4.1.12",
      "@smithy/middleware-serde": "^4.0.8",
      "@smithy/middleware-stack": "^4.0.4",
      "@smithy/node-config-provider": "^4.1.3",
      "@smithy/node-http-handler": "^4.0.6",
      "@smithy/protocol-http": "^5.1.2",
      "@smithy/smithy-client": "^4.4.3",
      "@smithy/types": "^4.3.1",
      "@smithy/url-parser": "^4.0.4",
      "@smithy/util-base64": "^4.0.0",
      "@smithy/util-body-length-browser": "^4.0.0",
      "@smithy/util-body-length-node": "^4.0.0",
      "@smithy/util-defaults-mode-browser": "^4.0.19",
      "@smithy/util-defaults-mode-node": "^4.0.19",
      "@smithy/util-endpoints": "^3.0.6",
      "@smithy/util-middleware": "^4.0.4",
      "@smithy/util-retry": "^4.0.5",
      "@smithy/util-utf8": "^4.0.0",
      tslib: "^2.6.2"
    },
    devDependencies: {
      concurrently: "7.0.0",
      "downlevel-dts": "0.10.1",
      rimraf: "3.0.2",
      typescript: "~5.8.3"
    },
    typesVersions: {
      "<4.0": {
        "dist-types/*": [
          "dist-types/ts3.4/*"
        ]
      }
    },
    files: [
      "./sso-oidc.d.ts",
      "./sso-oidc.js",
      "./sts.d.ts",
      "./sts.js",
      "dist-*/**"
    ],
    browser: {
      "./dist-es/submodules/sso-oidc/runtimeConfig": "./dist-es/submodules/sso-oidc/runtimeConfig.browser",
      "./dist-es/submodules/sts/runtimeConfig": "./dist-es/submodules/sts/runtimeConfig.browser"
    },
    "react-native": {},
    homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/packages/nested-clients",
    repository: {
      type: "git",
      url: "https://github.com/aws/aws-sdk-js-v3.git",
      directory: "packages/nested-clients"
    },
    exports: {
      "./sso-oidc": {
        types: "./dist-types/submodules/sso-oidc/index.d.ts",
        module: "./dist-es/submodules/sso-oidc/index.js",
        node: "./dist-cjs/submodules/sso-oidc/index.js",
        import: "./dist-es/submodules/sso-oidc/index.js",
        require: "./dist-cjs/submodules/sso-oidc/index.js"
      },
      "./sts": {
        types: "./dist-types/submodules/sts/index.d.ts",
        module: "./dist-es/submodules/sts/index.js",
        node: "./dist-cjs/submodules/sts/index.js",
        import: "./dist-es/submodules/sts/index.js",
        require: "./dist-cjs/submodules/sts/index.js"
      }
    }
  };
});

// ../../../../node_modules/@aws-sdk/util-user-agent-node/dist-cjs/index.js
var require_dist_cjs29 = __commonJS((exports, module) => {
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
  var index_exports = {};
  __export(index_exports, {
    NODE_APP_ID_CONFIG_OPTIONS: () => NODE_APP_ID_CONFIG_OPTIONS,
    UA_APP_ID_ENV_NAME: () => UA_APP_ID_ENV_NAME,
    UA_APP_ID_INI_NAME: () => UA_APP_ID_INI_NAME,
    createDefaultUserAgentProvider: () => createDefaultUserAgentProvider,
    crtAvailability: () => crtAvailability,
    defaultUserAgent: () => defaultUserAgent
  });
  module.exports = __toCommonJS(index_exports);
  var import_os = __require("os");
  var import_process = __require("process");
  var crtAvailability = {
    isCrtAvailable: false
  };
  var isCrtAvailable = /* @__PURE__ */ __name(() => {
    if (crtAvailability.isCrtAvailable) {
      return ["md/crt-avail"];
    }
    return null;
  }, "isCrtAvailable");
  var createDefaultUserAgentProvider = /* @__PURE__ */ __name(({ serviceId, clientVersion }) => {
    return async (config) => {
      const sections = [
        ["aws-sdk-js", clientVersion],
        ["ua", "2.1"],
        [`os/${(0, import_os.platform)()}`, (0, import_os.release)()],
        ["lang/js"],
        ["md/nodejs", `${import_process.versions.node}`]
      ];
      const crtAvailable = isCrtAvailable();
      if (crtAvailable) {
        sections.push(crtAvailable);
      }
      if (serviceId) {
        sections.push([`api/${serviceId}`, clientVersion]);
      }
      if (import_process.env.AWS_EXECUTION_ENV) {
        sections.push([`exec-env/${import_process.env.AWS_EXECUTION_ENV}`]);
      }
      const appId = await config?.userAgentAppId?.();
      const resolvedUserAgent = appId ? [...sections, [`app/${appId}`]] : [...sections];
      return resolvedUserAgent;
    };
  }, "createDefaultUserAgentProvider");
  var defaultUserAgent = createDefaultUserAgentProvider;
  var import_middleware_user_agent = require_dist_cjs16();
  var UA_APP_ID_ENV_NAME = "AWS_SDK_UA_APP_ID";
  var UA_APP_ID_INI_NAME = "sdk_ua_app_id";
  var UA_APP_ID_INI_NAME_DEPRECATED = "sdk-ua-app-id";
  var NODE_APP_ID_CONFIG_OPTIONS = {
    environmentVariableSelector: /* @__PURE__ */ __name((env2) => env2[UA_APP_ID_ENV_NAME], "environmentVariableSelector"),
    configFileSelector: /* @__PURE__ */ __name((profile) => profile[UA_APP_ID_INI_NAME] ?? profile[UA_APP_ID_INI_NAME_DEPRECATED], "configFileSelector"),
    default: import_middleware_user_agent.DEFAULT_UA_APP_ID
  };
});

// ../../../../node_modules/@smithy/hash-node/dist-cjs/index.js
var require_dist_cjs30 = __commonJS((exports, module) => {
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
    Hash: () => Hash
  });
  module.exports = __toCommonJS(src_exports);
  var import_util_buffer_from = require_dist_cjs5();
  var import_util_utf8 = require_dist_cjs6();
  var import_buffer = __require("buffer");
  var import_crypto = __require("crypto");
  var Hash = class {
    static {
      __name(this, "Hash");
    }
    constructor(algorithmIdentifier, secret) {
      this.algorithmIdentifier = algorithmIdentifier;
      this.secret = secret;
      this.reset();
    }
    update(toHash, encoding) {
      this.hash.update((0, import_util_utf8.toUint8Array)(castSourceData(toHash, encoding)));
    }
    digest() {
      return Promise.resolve(this.hash.digest());
    }
    reset() {
      this.hash = this.secret ? (0, import_crypto.createHmac)(this.algorithmIdentifier, castSourceData(this.secret)) : (0, import_crypto.createHash)(this.algorithmIdentifier);
    }
  };
  function castSourceData(toCast, encoding) {
    if (import_buffer.Buffer.isBuffer(toCast)) {
      return toCast;
    }
    if (typeof toCast === "string") {
      return (0, import_util_buffer_from.fromString)(toCast, encoding);
    }
    if (ArrayBuffer.isView(toCast)) {
      return (0, import_util_buffer_from.fromArrayBuffer)(toCast.buffer, toCast.byteOffset, toCast.byteLength);
    }
    return (0, import_util_buffer_from.fromArrayBuffer)(toCast);
  }
  __name(castSourceData, "castSourceData");
});

// ../../../../node_modules/@smithy/util-body-length-node/dist-cjs/index.js
var require_dist_cjs31 = __commonJS((exports, module) => {
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
    calculateBodyLength: () => calculateBodyLength
  });
  module.exports = __toCommonJS(src_exports);
  var import_fs = __require("fs");
  var calculateBodyLength = /* @__PURE__ */ __name((body) => {
    if (!body) {
      return 0;
    }
    if (typeof body === "string") {
      return Buffer.byteLength(body);
    } else if (typeof body.byteLength === "number") {
      return body.byteLength;
    } else if (typeof body.size === "number") {
      return body.size;
    } else if (typeof body.start === "number" && typeof body.end === "number") {
      return body.end + 1 - body.start;
    } else if (typeof body.path === "string" || Buffer.isBuffer(body.path)) {
      return (0, import_fs.lstatSync)(body.path).size;
    } else if (typeof body.fd === "number") {
      return (0, import_fs.fstatSync)(body.fd).size;
    }
    throw new Error(`Body Length computation failed for ${body}`);
  }, "calculateBodyLength");
});

// ../../../../node_modules/@smithy/credential-provider-imds/dist-cjs/index.js
var require_dist_cjs32 = __commonJS((exports, module) => {
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
    DEFAULT_MAX_RETRIES: () => DEFAULT_MAX_RETRIES,
    DEFAULT_TIMEOUT: () => DEFAULT_TIMEOUT,
    ENV_CMDS_AUTH_TOKEN: () => ENV_CMDS_AUTH_TOKEN,
    ENV_CMDS_FULL_URI: () => ENV_CMDS_FULL_URI,
    ENV_CMDS_RELATIVE_URI: () => ENV_CMDS_RELATIVE_URI,
    Endpoint: () => Endpoint,
    fromContainerMetadata: () => fromContainerMetadata,
    fromInstanceMetadata: () => fromInstanceMetadata,
    getInstanceMetadataEndpoint: () => getInstanceMetadataEndpoint,
    httpRequest: () => httpRequest,
    providerConfigFromInit: () => providerConfigFromInit
  });
  module.exports = __toCommonJS(src_exports);
  var import_url = __require("url");
  var import_property_provider = require_dist_cjs8();
  var import_buffer = __require("buffer");
  var import_http = __require("http");
  function httpRequest(options) {
    return new Promise((resolve, reject) => {
      const req = (0, import_http.request)({
        method: "GET",
        ...options,
        hostname: options.hostname?.replace(/^\[(.+)\]$/, "$1")
      });
      req.on("error", (err) => {
        reject(Object.assign(new import_property_provider.ProviderError("Unable to connect to instance metadata service"), err));
        req.destroy();
      });
      req.on("timeout", () => {
        reject(new import_property_provider.ProviderError("TimeoutError from instance metadata service"));
        req.destroy();
      });
      req.on("response", (res) => {
        const { statusCode = 400 } = res;
        if (statusCode < 200 || 300 <= statusCode) {
          reject(Object.assign(new import_property_provider.ProviderError("Error response received from instance metadata service"), { statusCode }));
          req.destroy();
        }
        const chunks = [];
        res.on("data", (chunk) => {
          chunks.push(chunk);
        });
        res.on("end", () => {
          resolve(import_buffer.Buffer.concat(chunks));
          req.destroy();
        });
      });
      req.end();
    });
  }
  __name(httpRequest, "httpRequest");
  var isImdsCredentials = /* @__PURE__ */ __name((arg) => Boolean(arg) && typeof arg === "object" && typeof arg.AccessKeyId === "string" && typeof arg.SecretAccessKey === "string" && typeof arg.Token === "string" && typeof arg.Expiration === "string", "isImdsCredentials");
  var fromImdsCredentials = /* @__PURE__ */ __name((creds) => ({
    accessKeyId: creds.AccessKeyId,
    secretAccessKey: creds.SecretAccessKey,
    sessionToken: creds.Token,
    expiration: new Date(creds.Expiration),
    ...creds.AccountId && { accountId: creds.AccountId }
  }), "fromImdsCredentials");
  var DEFAULT_TIMEOUT = 1000;
  var DEFAULT_MAX_RETRIES = 0;
  var providerConfigFromInit = /* @__PURE__ */ __name(({
    maxRetries = DEFAULT_MAX_RETRIES,
    timeout = DEFAULT_TIMEOUT
  }) => ({ maxRetries, timeout }), "providerConfigFromInit");
  var retry = /* @__PURE__ */ __name((toRetry, maxRetries) => {
    let promise = toRetry();
    for (let i = 0;i < maxRetries; i++) {
      promise = promise.catch(toRetry);
    }
    return promise;
  }, "retry");
  var ENV_CMDS_FULL_URI = "AWS_CONTAINER_CREDENTIALS_FULL_URI";
  var ENV_CMDS_RELATIVE_URI = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI";
  var ENV_CMDS_AUTH_TOKEN = "AWS_CONTAINER_AUTHORIZATION_TOKEN";
  var fromContainerMetadata = /* @__PURE__ */ __name((init = {}) => {
    const { timeout, maxRetries } = providerConfigFromInit(init);
    return () => retry(async () => {
      const requestOptions = await getCmdsUri({ logger: init.logger });
      const credsResponse = JSON.parse(await requestFromEcsImds(timeout, requestOptions));
      if (!isImdsCredentials(credsResponse)) {
        throw new import_property_provider.CredentialsProviderError("Invalid response received from instance metadata service.", {
          logger: init.logger
        });
      }
      return fromImdsCredentials(credsResponse);
    }, maxRetries);
  }, "fromContainerMetadata");
  var requestFromEcsImds = /* @__PURE__ */ __name(async (timeout, options) => {
    if (process.env[ENV_CMDS_AUTH_TOKEN]) {
      options.headers = {
        ...options.headers,
        Authorization: process.env[ENV_CMDS_AUTH_TOKEN]
      };
    }
    const buffer = await httpRequest({
      ...options,
      timeout
    });
    return buffer.toString();
  }, "requestFromEcsImds");
  var CMDS_IP = "169.254.170.2";
  var GREENGRASS_HOSTS = {
    localhost: true,
    "127.0.0.1": true
  };
  var GREENGRASS_PROTOCOLS = {
    "http:": true,
    "https:": true
  };
  var getCmdsUri = /* @__PURE__ */ __name(async ({ logger }) => {
    if (process.env[ENV_CMDS_RELATIVE_URI]) {
      return {
        hostname: CMDS_IP,
        path: process.env[ENV_CMDS_RELATIVE_URI]
      };
    }
    if (process.env[ENV_CMDS_FULL_URI]) {
      const parsed = (0, import_url.parse)(process.env[ENV_CMDS_FULL_URI]);
      if (!parsed.hostname || !(parsed.hostname in GREENGRASS_HOSTS)) {
        throw new import_property_provider.CredentialsProviderError(`${parsed.hostname} is not a valid container metadata service hostname`, {
          tryNextLink: false,
          logger
        });
      }
      if (!parsed.protocol || !(parsed.protocol in GREENGRASS_PROTOCOLS)) {
        throw new import_property_provider.CredentialsProviderError(`${parsed.protocol} is not a valid container metadata service protocol`, {
          tryNextLink: false,
          logger
        });
      }
      return {
        ...parsed,
        port: parsed.port ? parseInt(parsed.port, 10) : undefined
      };
    }
    throw new import_property_provider.CredentialsProviderError(`The container metadata credential provider cannot be used unless the ${ENV_CMDS_RELATIVE_URI} or ${ENV_CMDS_FULL_URI} environment variable is set`, {
      tryNextLink: false,
      logger
    });
  }, "getCmdsUri");
  var InstanceMetadataV1FallbackError = class _InstanceMetadataV1FallbackError extends import_property_provider.CredentialsProviderError {
    constructor(message, tryNextLink = true) {
      super(message, tryNextLink);
      this.tryNextLink = tryNextLink;
      this.name = "InstanceMetadataV1FallbackError";
      Object.setPrototypeOf(this, _InstanceMetadataV1FallbackError.prototype);
    }
    static {
      __name(this, "InstanceMetadataV1FallbackError");
    }
  };
  var import_node_config_provider = require_dist_cjs21();
  var import_url_parser = require_dist_cjs23();
  var Endpoint = /* @__PURE__ */ ((Endpoint2) => {
    Endpoint2["IPv4"] = "http://169.254.169.254";
    Endpoint2["IPv6"] = "http://[fd00:ec2::254]";
    return Endpoint2;
  })(Endpoint || {});
  var ENV_ENDPOINT_NAME = "AWS_EC2_METADATA_SERVICE_ENDPOINT";
  var CONFIG_ENDPOINT_NAME = "ec2_metadata_service_endpoint";
  var ENDPOINT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => env[ENV_ENDPOINT_NAME],
    configFileSelector: (profile) => profile[CONFIG_ENDPOINT_NAME],
    default: undefined
  };
  var EndpointMode = /* @__PURE__ */ ((EndpointMode2) => {
    EndpointMode2["IPv4"] = "IPv4";
    EndpointMode2["IPv6"] = "IPv6";
    return EndpointMode2;
  })(EndpointMode || {});
  var ENV_ENDPOINT_MODE_NAME = "AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE";
  var CONFIG_ENDPOINT_MODE_NAME = "ec2_metadata_service_endpoint_mode";
  var ENDPOINT_MODE_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => env[ENV_ENDPOINT_MODE_NAME],
    configFileSelector: (profile) => profile[CONFIG_ENDPOINT_MODE_NAME],
    default: "IPv4"
  };
  var getInstanceMetadataEndpoint = /* @__PURE__ */ __name(async () => (0, import_url_parser.parseUrl)(await getFromEndpointConfig() || await getFromEndpointModeConfig()), "getInstanceMetadataEndpoint");
  var getFromEndpointConfig = /* @__PURE__ */ __name(async () => (0, import_node_config_provider.loadConfig)(ENDPOINT_CONFIG_OPTIONS)(), "getFromEndpointConfig");
  var getFromEndpointModeConfig = /* @__PURE__ */ __name(async () => {
    const endpointMode = await (0, import_node_config_provider.loadConfig)(ENDPOINT_MODE_CONFIG_OPTIONS)();
    switch (endpointMode) {
      case "IPv4":
        return "http://169.254.169.254";
      case "IPv6":
        return "http://[fd00:ec2::254]";
      default:
        throw new Error(`Unsupported endpoint mode: ${endpointMode}. Select from ${Object.values(EndpointMode)}`);
    }
  }, "getFromEndpointModeConfig");
  var STATIC_STABILITY_REFRESH_INTERVAL_SECONDS = 5 * 60;
  var STATIC_STABILITY_REFRESH_INTERVAL_JITTER_WINDOW_SECONDS = 5 * 60;
  var STATIC_STABILITY_DOC_URL = "https://docs.aws.amazon.com/sdkref/latest/guide/feature-static-credentials.html";
  var getExtendedInstanceMetadataCredentials = /* @__PURE__ */ __name((credentials, logger) => {
    const refreshInterval = STATIC_STABILITY_REFRESH_INTERVAL_SECONDS + Math.floor(Math.random() * STATIC_STABILITY_REFRESH_INTERVAL_JITTER_WINDOW_SECONDS);
    const newExpiration = new Date(Date.now() + refreshInterval * 1000);
    logger.warn(`Attempting credential expiration extension due to a credential service availability issue. A refresh of these credentials will be attempted after ${new Date(newExpiration)}.
For more information, please visit: ` + STATIC_STABILITY_DOC_URL);
    const originalExpiration = credentials.originalExpiration ?? credentials.expiration;
    return {
      ...credentials,
      ...originalExpiration ? { originalExpiration } : {},
      expiration: newExpiration
    };
  }, "getExtendedInstanceMetadataCredentials");
  var staticStabilityProvider = /* @__PURE__ */ __name((provider, options = {}) => {
    const logger = options?.logger || console;
    let pastCredentials;
    return async () => {
      let credentials;
      try {
        credentials = await provider();
        if (credentials.expiration && credentials.expiration.getTime() < Date.now()) {
          credentials = getExtendedInstanceMetadataCredentials(credentials, logger);
        }
      } catch (e) {
        if (pastCredentials) {
          logger.warn("Credential renew failed: ", e);
          credentials = getExtendedInstanceMetadataCredentials(pastCredentials, logger);
        } else {
          throw e;
        }
      }
      pastCredentials = credentials;
      return credentials;
    };
  }, "staticStabilityProvider");
  var IMDS_PATH = "/latest/meta-data/iam/security-credentials/";
  var IMDS_TOKEN_PATH = "/latest/api/token";
  var AWS_EC2_METADATA_V1_DISABLED = "AWS_EC2_METADATA_V1_DISABLED";
  var PROFILE_AWS_EC2_METADATA_V1_DISABLED = "ec2_metadata_v1_disabled";
  var X_AWS_EC2_METADATA_TOKEN = "x-aws-ec2-metadata-token";
  var fromInstanceMetadata = /* @__PURE__ */ __name((init = {}) => staticStabilityProvider(getInstanceMetadataProvider(init), { logger: init.logger }), "fromInstanceMetadata");
  var getInstanceMetadataProvider = /* @__PURE__ */ __name((init = {}) => {
    let disableFetchToken = false;
    const { logger, profile } = init;
    const { timeout, maxRetries } = providerConfigFromInit(init);
    const getCredentials = /* @__PURE__ */ __name(async (maxRetries2, options) => {
      const isImdsV1Fallback = disableFetchToken || options.headers?.[X_AWS_EC2_METADATA_TOKEN] == null;
      if (isImdsV1Fallback) {
        let fallbackBlockedFromProfile = false;
        let fallbackBlockedFromProcessEnv = false;
        const configValue = await (0, import_node_config_provider.loadConfig)({
          environmentVariableSelector: (env) => {
            const envValue = env[AWS_EC2_METADATA_V1_DISABLED];
            fallbackBlockedFromProcessEnv = !!envValue && envValue !== "false";
            if (envValue === undefined) {
              throw new import_property_provider.CredentialsProviderError(`${AWS_EC2_METADATA_V1_DISABLED} not set in env, checking config file next.`, { logger: init.logger });
            }
            return fallbackBlockedFromProcessEnv;
          },
          configFileSelector: (profile2) => {
            const profileValue = profile2[PROFILE_AWS_EC2_METADATA_V1_DISABLED];
            fallbackBlockedFromProfile = !!profileValue && profileValue !== "false";
            return fallbackBlockedFromProfile;
          },
          default: false
        }, {
          profile
        })();
        if (init.ec2MetadataV1Disabled || configValue) {
          const causes = [];
          if (init.ec2MetadataV1Disabled)
            causes.push("credential provider initialization (runtime option ec2MetadataV1Disabled)");
          if (fallbackBlockedFromProfile)
            causes.push(`config file profile (${PROFILE_AWS_EC2_METADATA_V1_DISABLED})`);
          if (fallbackBlockedFromProcessEnv)
            causes.push(`process environment variable (${AWS_EC2_METADATA_V1_DISABLED})`);
          throw new InstanceMetadataV1FallbackError(`AWS EC2 Metadata v1 fallback has been blocked by AWS SDK configuration in the following: [${causes.join(", ")}].`);
        }
      }
      const imdsProfile = (await retry(async () => {
        let profile2;
        try {
          profile2 = await getProfile(options);
        } catch (err) {
          if (err.statusCode === 401) {
            disableFetchToken = false;
          }
          throw err;
        }
        return profile2;
      }, maxRetries2)).trim();
      return retry(async () => {
        let creds;
        try {
          creds = await getCredentialsFromProfile(imdsProfile, options, init);
        } catch (err) {
          if (err.statusCode === 401) {
            disableFetchToken = false;
          }
          throw err;
        }
        return creds;
      }, maxRetries2);
    }, "getCredentials");
    return async () => {
      const endpoint = await getInstanceMetadataEndpoint();
      if (disableFetchToken) {
        logger?.debug("AWS SDK Instance Metadata", "using v1 fallback (no token fetch)");
        return getCredentials(maxRetries, { ...endpoint, timeout });
      } else {
        let token;
        try {
          token = (await getMetadataToken({ ...endpoint, timeout })).toString();
        } catch (error) {
          if (error?.statusCode === 400) {
            throw Object.assign(error, {
              message: "EC2 Metadata token request returned error"
            });
          } else if (error.message === "TimeoutError" || [403, 404, 405].includes(error.statusCode)) {
            disableFetchToken = true;
          }
          logger?.debug("AWS SDK Instance Metadata", "using v1 fallback (initial)");
          return getCredentials(maxRetries, { ...endpoint, timeout });
        }
        return getCredentials(maxRetries, {
          ...endpoint,
          headers: {
            [X_AWS_EC2_METADATA_TOKEN]: token
          },
          timeout
        });
      }
    };
  }, "getInstanceMetadataProvider");
  var getMetadataToken = /* @__PURE__ */ __name(async (options) => httpRequest({
    ...options,
    path: IMDS_TOKEN_PATH,
    method: "PUT",
    headers: {
      "x-aws-ec2-metadata-token-ttl-seconds": "21600"
    }
  }), "getMetadataToken");
  var getProfile = /* @__PURE__ */ __name(async (options) => (await httpRequest({ ...options, path: IMDS_PATH })).toString(), "getProfile");
  var getCredentialsFromProfile = /* @__PURE__ */ __name(async (profile, options, init) => {
    const credentialsResponse = JSON.parse((await httpRequest({
      ...options,
      path: IMDS_PATH + profile
    })).toString());
    if (!isImdsCredentials(credentialsResponse)) {
      throw new import_property_provider.CredentialsProviderError("Invalid response received from instance metadata service.", {
        logger: init.logger
      });
    }
    return fromImdsCredentials(credentialsResponse);
  }, "getCredentialsFromProfile");
});

// ../../../../node_modules/@smithy/util-defaults-mode-node/dist-cjs/index.js
var require_dist_cjs33 = __commonJS((exports, module) => {
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
    resolveDefaultsModeConfig: () => resolveDefaultsModeConfig
  });
  module.exports = __toCommonJS(src_exports);
  var import_config_resolver = require_dist_cjs18();
  var import_node_config_provider = require_dist_cjs21();
  var import_property_provider = require_dist_cjs8();
  var AWS_EXECUTION_ENV = "AWS_EXECUTION_ENV";
  var AWS_REGION_ENV = "AWS_REGION";
  var AWS_DEFAULT_REGION_ENV = "AWS_DEFAULT_REGION";
  var ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
  var DEFAULTS_MODE_OPTIONS = ["in-region", "cross-region", "mobile", "standard", "legacy"];
  var IMDS_REGION_PATH = "/latest/meta-data/placement/region";
  var AWS_DEFAULTS_MODE_ENV = "AWS_DEFAULTS_MODE";
  var AWS_DEFAULTS_MODE_CONFIG = "defaults_mode";
  var NODE_DEFAULTS_MODE_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => {
      return env[AWS_DEFAULTS_MODE_ENV];
    },
    configFileSelector: (profile) => {
      return profile[AWS_DEFAULTS_MODE_CONFIG];
    },
    default: "legacy"
  };
  var resolveDefaultsModeConfig = /* @__PURE__ */ __name(({
    region = (0, import_node_config_provider.loadConfig)(import_config_resolver.NODE_REGION_CONFIG_OPTIONS),
    defaultsMode = (0, import_node_config_provider.loadConfig)(NODE_DEFAULTS_MODE_CONFIG_OPTIONS)
  } = {}) => (0, import_property_provider.memoize)(async () => {
    const mode = typeof defaultsMode === "function" ? await defaultsMode() : defaultsMode;
    switch (mode?.toLowerCase()) {
      case "auto":
        return resolveNodeDefaultsModeAuto(region);
      case "in-region":
      case "cross-region":
      case "mobile":
      case "standard":
      case "legacy":
        return Promise.resolve(mode?.toLocaleLowerCase());
      case undefined:
        return Promise.resolve("legacy");
      default:
        throw new Error(`Invalid parameter for "defaultsMode", expect ${DEFAULTS_MODE_OPTIONS.join(", ")}, got ${mode}`);
    }
  }), "resolveDefaultsModeConfig");
  var resolveNodeDefaultsModeAuto = /* @__PURE__ */ __name(async (clientRegion) => {
    if (clientRegion) {
      const resolvedRegion = typeof clientRegion === "function" ? await clientRegion() : clientRegion;
      const inferredRegion = await inferPhysicalRegion();
      if (!inferredRegion) {
        return "standard";
      }
      if (resolvedRegion === inferredRegion) {
        return "in-region";
      } else {
        return "cross-region";
      }
    }
    return "standard";
  }, "resolveNodeDefaultsModeAuto");
  var inferPhysicalRegion = /* @__PURE__ */ __name(async () => {
    if (process.env[AWS_EXECUTION_ENV] && (process.env[AWS_REGION_ENV] || process.env[AWS_DEFAULT_REGION_ENV])) {
      return process.env[AWS_REGION_ENV] ?? process.env[AWS_DEFAULT_REGION_ENV];
    }
    if (!process.env[ENV_IMDS_DISABLED]) {
      try {
        const { getInstanceMetadataEndpoint, httpRequest } = await Promise.resolve().then(() => __toESM(require_dist_cjs32()));
        const endpoint = await getInstanceMetadataEndpoint();
        return (await httpRequest({ ...endpoint, path: IMDS_REGION_PATH })).toString();
      } catch (e) {}
    }
  }, "inferPhysicalRegion");
});

export { require_dist_cjs11 as require_dist_cjs, require_dist_cjs12 as require_dist_cjs1, require_dist_cjs13 as require_dist_cjs2, require_dist_cjs14 as require_dist_cjs3, require_dist_cjs15 as require_dist_cjs4, require_dist_cjs16 as require_dist_cjs5, require_dist_cjs18 as require_dist_cjs6, require_dist_cjs19 as require_dist_cjs7, require_dist_cjs21 as require_dist_cjs8, require_dist_cjs23 as require_dist_cjs9, require_dist_cjs24 as require_dist_cjs10, require_dist_cjs26 as require_dist_cjs11, require_dist_cjs27 as require_dist_cjs12, require_package, require_dist_cjs29 as require_dist_cjs13, require_dist_cjs30 as require_dist_cjs14, require_dist_cjs31 as require_dist_cjs15, require_dist_cjs33 as require_dist_cjs16, require_dist_cjs28 as require_dist_cjs17 };
