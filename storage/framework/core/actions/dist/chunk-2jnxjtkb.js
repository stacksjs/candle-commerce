import {
  loadConfig,
  parseUrl
} from "./chunk-1rm3adsy.js";
import {
  HttpRequest,
  HttpResponse,
  NoOpLogger
} from "./chunk-jc3evtjg.js";
import {
  CONFIG_PREFIX_SEPARATOR
} from "./chunk-0be2fzx4.js";
import {
  require_dist,
  require_dist_cjs1 as require_dist_cjs2,
  require_dist_cjs3 as require_dist_cjs4
} from "./chunk-3bna256j.js";
import {
  require_dist_cjs
} from "./chunk-0rra9d59.js";
import {
  require_dist_cjs as require_dist_cjs3
} from "./chunk-v4rn7sgz.js";
import {
  __require,
  __toESM
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/@aws-sdk/middleware-host-header/dist-es/index.js
function resolveHostHeaderConfig(input) {
  return input;
}
var hostHeaderMiddleware = (options) => (next) => async (args) => {
  if (!HttpRequest.isInstance(args.request))
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
};
var hostHeaderMiddlewareOptions = {
  name: "hostHeaderMiddleware",
  step: "build",
  priority: "low",
  tags: ["HOST"],
  override: true
};
var getHostHeaderPlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(hostHeaderMiddleware(options), hostHeaderMiddlewareOptions);
  }
});

// ../../../../node_modules/@aws-sdk/middleware-logger/dist-es/loggerMiddleware.js
var loggerMiddleware = () => (next, context) => async (args) => {
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
};
var loggerMiddlewareOptions = {
  name: "loggerMiddleware",
  tags: ["LOGGER"],
  step: "initialize",
  override: true
};
var getLoggerPlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
  }
});
// ../../../../node_modules/@aws-sdk/middleware-recursion-detection/dist-es/index.js
var TRACE_ID_HEADER_NAME = "X-Amzn-Trace-Id";
var ENV_LAMBDA_FUNCTION_NAME = "AWS_LAMBDA_FUNCTION_NAME";
var ENV_TRACE_ID = "_X_AMZN_TRACE_ID";
var recursionDetectionMiddleware = (options) => (next) => async (args) => {
  const { request } = args;
  if (!HttpRequest.isInstance(request) || options.runtime !== "node") {
    return next(args);
  }
  const traceIdHeader = Object.keys(request.headers ?? {}).find((h) => h.toLowerCase() === TRACE_ID_HEADER_NAME.toLowerCase()) ?? TRACE_ID_HEADER_NAME;
  if (request.headers.hasOwnProperty(traceIdHeader)) {
    return next(args);
  }
  const functionName = process.env[ENV_LAMBDA_FUNCTION_NAME];
  const traceId = process.env[ENV_TRACE_ID];
  const nonEmptyString = (str) => typeof str === "string" && str.length > 0;
  if (nonEmptyString(functionName) && nonEmptyString(traceId)) {
    request.headers[TRACE_ID_HEADER_NAME] = traceId;
  }
  return next({
    ...args,
    request
  });
};
var addRecursionDetectionMiddlewareOptions = {
  step: "build",
  tags: ["RECURSION_DETECTION"],
  name: "recursionDetectionMiddleware",
  override: true,
  priority: "low"
};
var getRecursionDetectionPlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(recursionDetectionMiddleware(options), addRecursionDetectionMiddlewareOptions);
  }
});

// ../../../../node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js
var import_core = __toESM(require_dist_cjs2(), 1);
var DEFAULT_UA_APP_ID = undefined;
function isValidUserAgentAppId(appId) {
  if (appId === undefined) {
    return true;
  }
  return typeof appId === "string" && appId.length <= 50;
}
function resolveUserAgentConfig(input) {
  const normalizedAppIdProvider = import_core.normalizeProvider(input.userAgentAppId ?? DEFAULT_UA_APP_ID);
  const { customUserAgent } = input;
  return Object.assign(input, {
    customUserAgent: typeof customUserAgent === "string" ? [[customUserAgent]] : customUserAgent,
    userAgentAppId: async () => {
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
    }
  });
}

// ../../../../node_modules/@smithy/util-endpoints/dist-es/cache/EndpointCache.js
class EndpointCache {
  constructor({ size, params }) {
    this.data = new Map;
    this.parameters = [];
    this.capacity = size ?? 50;
    if (params) {
      this.parameters = params;
    }
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
}
// ../../../../node_modules/@smithy/util-endpoints/dist-es/lib/isIpAddress.js
var IP_V4_REGEX = new RegExp(`^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$`);
var isIpAddress = (value) => IP_V4_REGEX.test(value) || value.startsWith("[") && value.endsWith("]");
// ../../../../node_modules/@smithy/util-endpoints/dist-es/lib/isValidHostLabel.js
var VALID_HOST_LABEL_REGEX = new RegExp(`^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$`);
var isValidHostLabel = (value, allowSubDomains = false) => {
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
};
// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js
var customEndpointFunctions = {};
// ../../../../node_modules/@smithy/util-endpoints/dist-es/debug/debugId.js
var debugId = "endpoints";
// ../../../../node_modules/@smithy/util-endpoints/dist-es/debug/toDebugString.js
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
// ../../../../node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js
class EndpointError extends Error {
  constructor(message) {
    super(message);
    this.name = "EndpointError";
  }
}
// ../../../../node_modules/@smithy/util-endpoints/dist-es/lib/booleanEquals.js
var booleanEquals = (value1, value2) => value1 === value2;
// ../../../../node_modules/@smithy/util-endpoints/dist-es/lib/getAttrPathList.js
var getAttrPathList = (path) => {
  const parts = path.split(".");
  const pathList = [];
  for (const part of parts) {
    const squareBracketIndex = part.indexOf("[");
    if (squareBracketIndex !== -1) {
      if (part.indexOf("]") !== part.length - 1) {
        throw new EndpointError(`Path: '${path}' does not end with ']'`);
      }
      const arrayIndex = part.slice(squareBracketIndex + 1, -1);
      if (Number.isNaN(parseInt(arrayIndex))) {
        throw new EndpointError(`Invalid array index: '${arrayIndex}' in path: '${path}'`);
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
};

// ../../../../node_modules/@smithy/util-endpoints/dist-es/lib/getAttr.js
var getAttr = (value, path) => getAttrPathList(path).reduce((acc, index) => {
  if (typeof acc !== "object") {
    throw new EndpointError(`Index '${index}' in '${path}' not found in '${JSON.stringify(value)}'`);
  } else if (Array.isArray(acc)) {
    return acc[parseInt(index)];
  }
  return acc[index];
}, value);
// ../../../../node_modules/@smithy/util-endpoints/dist-es/lib/isSet.js
var isSet = (value) => value != null;
// ../../../../node_modules/@smithy/util-endpoints/dist-es/lib/not.js
var not = (value) => !value;
// ../../../../node_modules/@smithy/util-endpoints/dist-es/lib/parseURL.js
var import_types3 = __toESM(require_dist_cjs(), 1);
var DEFAULT_PORTS = {
  [import_types3.EndpointURLScheme.HTTP]: 80,
  [import_types3.EndpointURLScheme.HTTPS]: 443
};
var parseURL = (value) => {
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
  const isIp = isIpAddress(hostname);
  const inputContainsDefaultPort = urlString.includes(`${host}:${DEFAULT_PORTS[scheme]}`) || typeof value === "string" && value.includes(`${host}:${DEFAULT_PORTS[scheme]}`);
  const authority = `${host}${inputContainsDefaultPort ? `:${DEFAULT_PORTS[scheme]}` : ``}`;
  return {
    scheme,
    authority,
    path: pathname,
    normalizedPath: pathname.endsWith("/") ? pathname : `${pathname}/`,
    isIp
  };
};
// ../../../../node_modules/@smithy/util-endpoints/dist-es/lib/stringEquals.js
var stringEquals = (value1, value2) => value1 === value2;
// ../../../../node_modules/@smithy/util-endpoints/dist-es/lib/substring.js
var substring = (input, start, stop, reverse) => {
  if (start >= stop || input.length < stop) {
    return null;
  }
  if (!reverse) {
    return input.substring(start, stop);
  }
  return input.substring(input.length - stop, input.length - start);
};
// ../../../../node_modules/@smithy/util-endpoints/dist-es/lib/uriEncode.js
var uriEncode = (value) => encodeURIComponent(value).replace(/[!*'()]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/endpointFunctions.js
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

// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTemplate.js
var evaluateTemplate = (template, options) => {
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
};

// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/getReferenceValue.js
var getReferenceValue = ({ ref }, options) => {
  const referenceRecord = {
    ...options.endpointParams,
    ...options.referenceRecord
  };
  return referenceRecord[ref];
};

// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateExpression.js
var evaluateExpression = (obj, keyName, options) => {
  if (typeof obj === "string") {
    return evaluateTemplate(obj, options);
  } else if (obj["fn"]) {
    return callFunction(obj, options);
  } else if (obj["ref"]) {
    return getReferenceValue(obj, options);
  }
  throw new EndpointError(`'${keyName}': ${String(obj)} is not a string, function or reference.`);
};

// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/callFunction.js
var callFunction = ({ fn, argv }, options) => {
  const evaluatedArgs = argv.map((arg) => ["boolean", "number"].includes(typeof arg) ? arg : evaluateExpression(arg, "arg", options));
  const fnSegments = fn.split(".");
  if (fnSegments[0] in customEndpointFunctions && fnSegments[1] != null) {
    return customEndpointFunctions[fnSegments[0]][fnSegments[1]](...evaluatedArgs);
  }
  return endpointFunctions[fn](...evaluatedArgs);
};

// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateCondition.js
var evaluateCondition = ({ assign, ...fnArgs }, options) => {
  if (assign && assign in options.referenceRecord) {
    throw new EndpointError(`'${assign}' is already defined in Reference Record.`);
  }
  const value = callFunction(fnArgs, options);
  options.logger?.debug?.(`${debugId} evaluateCondition: ${toDebugString(fnArgs)} = ${toDebugString(value)}`);
  return {
    result: value === "" ? true : !!value,
    ...assign != null && { toAssign: { name: assign, value } }
  };
};

// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateConditions.js
var evaluateConditions = (conditions = [], options) => {
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
};

// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointHeaders.js
var getEndpointHeaders = (headers, options) => Object.entries(headers).reduce((acc, [headerKey, headerVal]) => ({
  ...acc,
  [headerKey]: headerVal.map((headerValEntry) => {
    const processedExpr = evaluateExpression(headerValEntry, "Header value entry", options);
    if (typeof processedExpr !== "string") {
      throw new EndpointError(`Header '${headerKey}' value '${processedExpr}' is not a string`);
    }
    return processedExpr;
  })
}), {});

// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperty.js
var getEndpointProperty = (property, options) => {
  if (Array.isArray(property)) {
    return property.map((propertyEntry) => getEndpointProperty(propertyEntry, options));
  }
  switch (typeof property) {
    case "string":
      return evaluateTemplate(property, options);
    case "object":
      if (property === null) {
        throw new EndpointError(`Unexpected endpoint property: ${property}`);
      }
      return getEndpointProperties(property, options);
    case "boolean":
      return property;
    default:
      throw new EndpointError(`Unexpected endpoint property type: ${typeof property}`);
  }
};

// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperties.js
var getEndpointProperties = (properties, options) => Object.entries(properties).reduce((acc, [propertyKey, propertyVal]) => ({
  ...acc,
  [propertyKey]: getEndpointProperty(propertyVal, options)
}), {});

// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointUrl.js
var getEndpointUrl = (endpointUrl, options) => {
  const expression = evaluateExpression(endpointUrl, "Endpoint URL", options);
  if (typeof expression === "string") {
    try {
      return new URL(expression);
    } catch (error) {
      console.error(`Failed to construct URL with ${expression}`, error);
      throw error;
    }
  }
  throw new EndpointError(`Endpoint URL must be a string, got ${typeof expression}`);
};

// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateEndpointRule.js
var evaluateEndpointRule = (endpointRule, options) => {
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
};

// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateErrorRule.js
var evaluateErrorRule = (errorRule, options) => {
  const { conditions, error } = errorRule;
  const { result, referenceRecord } = evaluateConditions(conditions, options);
  if (!result) {
    return;
  }
  throw new EndpointError(evaluateExpression(error, "Error", {
    ...options,
    referenceRecord: { ...options.referenceRecord, ...referenceRecord }
  }));
};

// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTreeRule.js
var evaluateTreeRule = (treeRule, options) => {
  const { conditions, rules } = treeRule;
  const { result, referenceRecord } = evaluateConditions(conditions, options);
  if (!result) {
    return;
  }
  return evaluateRules(rules, {
    ...options,
    referenceRecord: { ...options.referenceRecord, ...referenceRecord }
  });
};

// ../../../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateRules.js
var evaluateRules = (rules, options) => {
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
      throw new EndpointError(`Unknown endpoint rule: ${rule}`);
    }
  }
  throw new EndpointError(`Rules evaluation failed`);
};
// ../../../../node_modules/@smithy/util-endpoints/dist-es/resolveEndpoint.js
var resolveEndpoint = (ruleSetObject, options) => {
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
      throw new EndpointError(`Missing required parameter: '${requiredParam}'`);
    }
  }
  const endpoint = evaluateRules(rules, { endpointParams, logger, referenceRecord: {} });
  options.logger?.debug?.(`${debugId} Resolved endpoint: ${toDebugString(endpoint)}`);
  return endpoint;
};
// ../../../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/isVirtualHostableS3Bucket.js
var isVirtualHostableS3Bucket = (value, allowSubDomains = false) => {
  if (allowSubDomains) {
    for (const label of value.split(".")) {
      if (!isVirtualHostableS3Bucket(label)) {
        return false;
      }
    }
    return true;
  }
  if (!isValidHostLabel(value)) {
    return false;
  }
  if (value.length < 3 || value.length > 63) {
    return false;
  }
  if (value !== value.toLowerCase()) {
    return false;
  }
  if (isIpAddress(value)) {
    return false;
  }
  return true;
};

// ../../../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/parseArn.js
var ARN_DELIMITER = ":";
var RESOURCE_DELIMITER = "/";
var parseArn = (value) => {
  const segments = value.split(ARN_DELIMITER);
  if (segments.length < 6)
    return null;
  const [arn, partition, service, region, accountId, ...resourcePath] = segments;
  if (arn !== "arn" || partition === "" || service === "" || resourcePath.join(ARN_DELIMITER) === "")
    return null;
  const resourceId = resourcePath.map((resource) => resource.split(RESOURCE_DELIMITER)).flat();
  return {
    partition,
    service,
    region,
    accountId,
    resourceId
  };
};
// ../../../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partitions.json
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

// ../../../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partition.js
var selectedPartitionsInfo = partitions_default;
var selectedUserAgentPrefix = "";
var partition = (value) => {
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
    throw new Error("Provided region was not found in the partition array or regex," + " and default partition with id 'aws' doesn't exist.");
  }
  return {
    ...DEFAULT_PARTITION.outputs
  };
};
var getUserAgentPrefix = () => selectedUserAgentPrefix;

// ../../../../node_modules/@aws-sdk/util-endpoints/dist-es/aws.js
var awsEndpointFunctions = {
  isVirtualHostableS3Bucket,
  parseArn,
  partition
};
customEndpointFunctions.aws = awsEndpointFunctions;
// ../../../../node_modules/@aws-sdk/middleware-user-agent/dist-es/check-features.js
var import_core2 = __toESM(require_dist_cjs4(), 1);
var ACCOUNT_ID_ENDPOINT_REGEX = /\d{12}\.ddb/;
async function checkFeatures(context, config, args) {
  const request = args.request;
  if (request?.headers?.["smithy-protocol"] === "rpc-v2-cbor") {
    import_core2.setFeature(context, "PROTOCOL_RPC_V2_CBOR", "M");
  }
  if (typeof config.retryStrategy === "function") {
    const retryStrategy = await config.retryStrategy();
    if (typeof retryStrategy.acquireInitialRetryToken === "function") {
      if (retryStrategy.constructor?.name?.includes("Adaptive")) {
        import_core2.setFeature(context, "RETRY_MODE_ADAPTIVE", "F");
      } else {
        import_core2.setFeature(context, "RETRY_MODE_STANDARD", "E");
      }
    } else {
      import_core2.setFeature(context, "RETRY_MODE_LEGACY", "D");
    }
  }
  if (typeof config.accountIdEndpointMode === "function") {
    const endpointV2 = context.endpointV2;
    if (String(endpointV2?.url?.hostname).match(ACCOUNT_ID_ENDPOINT_REGEX)) {
      import_core2.setFeature(context, "ACCOUNT_ID_ENDPOINT", "O");
    }
    switch (await config.accountIdEndpointMode?.()) {
      case "disabled":
        import_core2.setFeature(context, "ACCOUNT_ID_MODE_DISABLED", "Q");
        break;
      case "preferred":
        import_core2.setFeature(context, "ACCOUNT_ID_MODE_PREFERRED", "P");
        break;
      case "required":
        import_core2.setFeature(context, "ACCOUNT_ID_MODE_REQUIRED", "R");
        break;
    }
  }
  const identity = context.__smithy_context?.selectedHttpAuthScheme?.identity;
  if (identity?.$source) {
    const credentials = identity;
    if (credentials.accountId) {
      import_core2.setFeature(context, "RESOLVED_ACCOUNT_ID", "T");
    }
    for (const [key, value] of Object.entries(credentials.$source ?? {})) {
      import_core2.setFeature(context, key, value);
    }
  }
}

// ../../../../node_modules/@aws-sdk/middleware-user-agent/dist-es/constants.js
var USER_AGENT = "user-agent";
var X_AMZ_USER_AGENT = "x-amz-user-agent";
var SPACE = " ";
var UA_NAME_SEPARATOR = "/";
var UA_NAME_ESCAPE_REGEX = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g;
var UA_VALUE_ESCAPE_REGEX = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w\#]/g;
var UA_ESCAPE_CHAR = "-";

// ../../../../node_modules/@aws-sdk/middleware-user-agent/dist-es/encode-features.js
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

// ../../../../node_modules/@aws-sdk/middleware-user-agent/dist-es/user-agent-middleware.js
var userAgentMiddleware = (options) => (next, context) => async (args) => {
  const { request } = args;
  if (!HttpRequest.isInstance(request)) {
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
  const prefix = getUserAgentPrefix();
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
};
var escapeUserAgent = (userAgentPair) => {
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
};
var getUserAgentMiddlewareOptions = {
  name: "getUserAgentMiddleware",
  step: "build",
  priority: "low",
  tags: ["SET_USER_AGENT", "USER_AGENT"],
  override: true
};
var getUserAgentPlugin = (config) => ({
  applyToStack: (clientStack) => {
    clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
  }
});
// ../../../../node_modules/@smithy/config-resolver/dist-es/regionConfig/isFipsRegion.js
var isFipsRegion = (region) => typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips"));

// ../../../../node_modules/@smithy/config-resolver/dist-es/regionConfig/getRealRegion.js
var getRealRegion = (region) => isFipsRegion(region) ? ["fips-aws-global", "aws-fips"].includes(region) ? "us-east-1" : region.replace(/fips-(dkr-|prod-)?|-fips/, "") : region;

// ../../../../node_modules/@smithy/config-resolver/dist-es/regionConfig/resolveRegionConfig.js
var resolveRegionConfig = (input) => {
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
};

// ../../../../node_modules/@smithy/util-config-provider/dist-es/booleanSelector.js
var booleanSelector = (obj, key, type) => {
  if (!(key in obj))
    return;
  if (obj[key] === "true")
    return true;
  if (obj[key] === "false")
    return false;
  throw new Error(`Cannot load ${type} "${key}". Expected "true" or "false", got ${obj[key]}.`);
};
// ../../../../node_modules/@smithy/util-config-provider/dist-es/types.js
var SelectorType;
(function(SelectorType2) {
  SelectorType2["ENV"] = "env";
  SelectorType2["CONFIG"] = "shared config entry";
})(SelectorType || (SelectorType = {}));
// ../../../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseDualstackEndpointConfigOptions.js
var ENV_USE_DUALSTACK_ENDPOINT = "AWS_USE_DUALSTACK_ENDPOINT";
var CONFIG_USE_DUALSTACK_ENDPOINT = "use_dualstack_endpoint";
var NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS = {
  environmentVariableSelector: (env) => booleanSelector(env, ENV_USE_DUALSTACK_ENDPOINT, SelectorType.ENV),
  configFileSelector: (profile) => booleanSelector(profile, CONFIG_USE_DUALSTACK_ENDPOINT, SelectorType.CONFIG),
  default: false
};
// ../../../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseFipsEndpointConfigOptions.js
var ENV_USE_FIPS_ENDPOINT = "AWS_USE_FIPS_ENDPOINT";
var CONFIG_USE_FIPS_ENDPOINT = "use_fips_endpoint";
var NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS = {
  environmentVariableSelector: (env) => booleanSelector(env, ENV_USE_FIPS_ENDPOINT, SelectorType.ENV),
  configFileSelector: (profile) => booleanSelector(profile, CONFIG_USE_FIPS_ENDPOINT, SelectorType.CONFIG),
  default: false
};
// ../../../../node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js
var import_types12 = __toESM(require_dist_cjs(), 1);
var getSmithyContext = (context) => context[import_types12.SMITHY_CONTEXT_KEY] || (context[import_types12.SMITHY_CONTEXT_KEY] = {});
// ../../../../node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js
var normalizeProvider2 = (input) => {
  if (typeof input === "function")
    return input;
  const promisified = Promise.resolve(input);
  return () => promisified;
};
// ../../../../node_modules/@smithy/config-resolver/dist-es/regionConfig/config.js
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
// ../../../../node_modules/@smithy/middleware-content-length/dist-es/index.js
var CONTENT_LENGTH_HEADER = "content-length";
function contentLengthMiddleware(bodyLengthChecker) {
  return (next) => async (args) => {
    const request = args.request;
    if (HttpRequest.isInstance(request)) {
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
var contentLengthMiddlewareOptions = {
  step: "build",
  tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
  name: "contentLengthMiddleware",
  override: true
};
var getContentLengthPlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), contentLengthMiddlewareOptions);
  }
});

// ../../../../node_modules/@smithy/middleware-serde/dist-es/deserializerMiddleware.js
var deserializerMiddleware = (options, deserializer) => (next, context) => async (args) => {
  const { response } = await next(args);
  try {
    const parsed = await deserializer(response, options);
    return {
      response,
      output: parsed
    };
  } catch (error) {
    Object.defineProperty(error, "$response", {
      value: response
    });
    if (!("$metadata" in error)) {
      const hint = `Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`;
      try {
        error.message += `
  ` + hint;
      } catch (e) {
        if (!context.logger || context.logger?.constructor?.name === "NoOpLogger") {
          console.warn(hint);
        } else {
          context.logger?.warn?.(hint);
        }
      }
      if (typeof error.$responseBodyText !== "undefined") {
        if (error.$response) {
          error.$response.body = error.$responseBodyText;
        }
      }
      try {
        if (HttpResponse.isInstance(response)) {
          const { headers = {} } = response;
          const headerEntries = Object.entries(headers);
          error.$metadata = {
            httpStatusCode: response.statusCode,
            requestId: findHeader(/^x-[\w-]+-request-?id$/, headerEntries),
            extendedRequestId: findHeader(/^x-[\w-]+-id-2$/, headerEntries),
            cfId: findHeader(/^x-[\w-]+-cf-id$/, headerEntries)
          };
        }
      } catch (e) {}
    }
    throw error;
  }
};
var findHeader = (pattern, headers) => {
  return (headers.find(([k]) => {
    return k.match(pattern);
  }) || [undefined, undefined])[1];
};

// ../../../../node_modules/@smithy/middleware-serde/dist-es/serializerMiddleware.js
var serializerMiddleware = (options, serializer) => (next, context) => async (args) => {
  const endpointConfig = options;
  const endpoint = context.endpointV2?.url && endpointConfig.urlParser ? async () => endpointConfig.urlParser(context.endpointV2.url) : endpointConfig.endpoint;
  if (!endpoint) {
    throw new Error("No valid endpoint provider available.");
  }
  const request = await serializer(args.input, { ...options, endpoint });
  return next({
    ...args,
    request
  });
};

// ../../../../node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js
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
function getSerdePlugin(config2, serializer, deserializer) {
  return {
    applyToStack: (commandStack) => {
      commandStack.add(deserializerMiddleware(config2, deserializer), deserializerMiddlewareOption);
      commandStack.add(serializerMiddleware(config2, serializer), serializerMiddlewareOption);
    }
  };
}
// ../../../../node_modules/@smithy/middleware-endpoint/dist-es/endpointMiddleware.js
var import_core3 = __toESM(require_dist_cjs2(), 1);

// ../../../../node_modules/@smithy/middleware-endpoint/dist-es/service-customizations/s3.js
var resolveParamsForS3 = async (endpointParams) => {
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
};
var DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
var IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
var DOTS_PATTERN = /\.\./;
var isDnsCompatibleBucketName = (bucketName) => DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName);
var isArnBucketName = (bucketName) => {
  const [arn, partition3, service, , , bucket] = bucketName.split(":");
  const isArn = arn === "arn" && bucketName.split(":").length >= 6;
  const isValidArn = Boolean(isArn && partition3 && service && bucket);
  if (isArn && !isValidArn) {
    throw new Error(`Invalid ARN: ${bucketName} was an invalid ARN.`);
  }
  return isValidArn;
};
// ../../../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/createConfigValueProvider.js
var createConfigValueProvider = (configKey, canonicalEndpointParamKey, config2) => {
  const configProvider = async () => {
    const configValue = config2[configKey] ?? config2[canonicalEndpointParamKey];
    if (typeof configValue === "function") {
      return configValue();
    }
    return configValue;
  };
  if (configKey === "credentialScope" || canonicalEndpointParamKey === "CredentialScope") {
    return async () => {
      const credentials = typeof config2.credentials === "function" ? await config2.credentials() : config2.credentials;
      const configValue = credentials?.credentialScope ?? credentials?.CredentialScope;
      return configValue;
    };
  }
  if (configKey === "accountId" || canonicalEndpointParamKey === "AccountId") {
    return async () => {
      const credentials = typeof config2.credentials === "function" ? await config2.credentials() : config2.credentials;
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
};

// ../../../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointUrlConfig.js
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
  configFileSelector: (profile, config2) => {
    if (config2 && profile.services) {
      const servicesSection = config2[["services", profile.services].join(CONFIG_PREFIX_SEPARATOR)];
      if (servicesSection) {
        const servicePrefixParts = serviceId.split(" ").map((w) => w.toLowerCase());
        const endpointUrl2 = servicesSection[[servicePrefixParts.join("_"), CONFIG_ENDPOINT_URL].join(CONFIG_PREFIX_SEPARATOR)];
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

// ../../../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromConfig.js
var getEndpointFromConfig = async (serviceId) => loadConfig(getEndpointUrlConfig(serviceId ?? ""))();

// ../../../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/toEndpointV1.js
var toEndpointV1 = (endpoint) => {
  if (typeof endpoint === "object") {
    if ("url" in endpoint) {
      return parseUrl(endpoint.url);
    }
    return endpoint;
  }
  return parseUrl(endpoint);
};

// ../../../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromInstructions.js
var getEndpointFromInstructions = async (commandInput, instructionsSupplier, clientConfig, context) => {
  if (!clientConfig.endpoint) {
    let endpointFromConfig;
    if (clientConfig.serviceConfiguredEndpoint) {
      endpointFromConfig = await clientConfig.serviceConfiguredEndpoint();
    } else {
      endpointFromConfig = await getEndpointFromConfig(clientConfig.serviceId);
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
};
var resolveParams = async (commandInput, instructionsSupplier, clientConfig) => {
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
};

// ../../../../node_modules/@smithy/middleware-endpoint/dist-es/endpointMiddleware.js
var endpointMiddleware = ({ config: config2, instructions }) => {
  return (next, context) => async (args) => {
    if (config2.endpoint) {
      import_core3.setFeature(context, "ENDPOINT_OVERRIDE", "N");
    }
    const endpoint = await getEndpointFromInstructions(args.input, {
      getEndpointParameterInstructions() {
        return instructions;
      }
    }, { ...config2 }, context);
    context.endpointV2 = endpoint;
    context.authSchemes = endpoint.properties?.authSchemes;
    const authScheme = context.authSchemes?.[0];
    if (authScheme) {
      context["signing_region"] = authScheme.signingRegion;
      context["signing_service"] = authScheme.signingName;
      const smithyContext = getSmithyContext(context);
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
};

// ../../../../node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js
var endpointMiddlewareOptions = {
  step: "serialize",
  tags: ["ENDPOINT_PARAMETERS", "ENDPOINT_V2", "ENDPOINT"],
  name: "endpointV2Middleware",
  override: true,
  relation: "before",
  toMiddleware: serializerMiddlewareOption.name
};
var getEndpointPlugin = (config2, instructions) => ({
  applyToStack: (clientStack) => {
    clientStack.addRelativeTo(endpointMiddleware({
      config: config2,
      instructions
    }), endpointMiddlewareOptions);
  }
});

// ../../../../node_modules/@smithy/middleware-endpoint/dist-es/resolveEndpointConfig.js
var resolveEndpointConfig = (input) => {
  const tls = input.tls ?? true;
  const { endpoint, useDualstackEndpoint, useFipsEndpoint } = input;
  const customEndpointProvider = endpoint != null ? async () => toEndpointV1(await normalizeProvider2(endpoint)()) : undefined;
  const isCustomEndpoint = !!endpoint;
  const resolvedConfig = Object.assign(input, {
    endpoint: customEndpointProvider,
    tls,
    isCustomEndpoint,
    useDualstackEndpoint: normalizeProvider2(useDualstackEndpoint ?? false),
    useFipsEndpoint: normalizeProvider2(useFipsEndpoint ?? false)
  });
  let configuredEndpointPromise = undefined;
  resolvedConfig.serviceConfiguredEndpoint = async () => {
    if (input.serviceId && !configuredEndpointPromise) {
      configuredEndpointPromise = getEndpointFromConfig(input.serviceId);
    }
    return configuredEndpointPromise;
  };
  return resolvedConfig;
};
// ../../../../node_modules/@smithy/util-retry/dist-es/config.js
var RETRY_MODES;
(function(RETRY_MODES2) {
  RETRY_MODES2["STANDARD"] = "standard";
  RETRY_MODES2["ADAPTIVE"] = "adaptive";
})(RETRY_MODES || (RETRY_MODES = {}));
var DEFAULT_MAX_ATTEMPTS = 3;
var DEFAULT_RETRY_MODE = RETRY_MODES.STANDARD;

// ../../../../node_modules/@smithy/service-error-classification/dist-es/constants.js
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
var NODEJS_NETWORK_ERROR_CODES = ["EHOSTUNREACH", "ENETUNREACH", "ENOTFOUND"];

// ../../../../node_modules/@smithy/service-error-classification/dist-es/index.js
var isClockSkewCorrectedError = (error) => error.$metadata?.clockSkewCorrected;
var isBrowserNetworkError = (error) => {
  const errorMessages = new Set([
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
};
var isThrottlingError = (error) => error.$metadata?.httpStatusCode === 429 || THROTTLING_ERROR_CODES.includes(error.name) || error.$retryable?.throttling == true;
var isTransientError = (error, depth = 0) => isClockSkewCorrectedError(error) || TRANSIENT_ERROR_CODES.includes(error.name) || NODEJS_TIMEOUT_ERROR_CODES.includes(error?.code || "") || NODEJS_NETWORK_ERROR_CODES.includes(error?.code || "") || TRANSIENT_ERROR_STATUS_CODES.includes(error.$metadata?.httpStatusCode || 0) || isBrowserNetworkError(error) || error.cause !== undefined && depth <= 10 && isTransientError(error.cause, depth + 1);
var isServerError = (error) => {
  if (error.$metadata?.httpStatusCode !== undefined) {
    const statusCode = error.$metadata.httpStatusCode;
    if (500 <= statusCode && statusCode <= 599 && !isTransientError(error)) {
      return true;
    }
    return false;
  }
  return false;
};

// ../../../../node_modules/@smithy/util-retry/dist-es/DefaultRateLimiter.js
class DefaultRateLimiter {
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
      await new Promise((resolve) => DefaultRateLimiter.setTimeoutFn(resolve, delay));
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
    if (isThrottlingError(response)) {
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
}
DefaultRateLimiter.setTimeoutFn = setTimeout;

// ../../../../node_modules/@smithy/util-retry/dist-es/constants.js
var DEFAULT_RETRY_DELAY_BASE = 100;
var MAXIMUM_RETRY_DELAY = 20 * 1000;
var THROTTLING_RETRY_DELAY_BASE = 500;
var INITIAL_RETRY_TOKENS = 500;
var RETRY_COST = 5;
var TIMEOUT_RETRY_COST = 10;
var NO_RETRY_INCREMENT = 1;
var INVOCATION_ID_HEADER = "amz-sdk-invocation-id";
var REQUEST_HEADER = "amz-sdk-request";

// ../../../../node_modules/@smithy/util-retry/dist-es/defaultRetryBackoffStrategy.js
var getDefaultRetryBackoffStrategy = () => {
  let delayBase = DEFAULT_RETRY_DELAY_BASE;
  const computeNextBackoffDelay = (attempts) => {
    return Math.floor(Math.min(MAXIMUM_RETRY_DELAY, Math.random() * 2 ** attempts * delayBase));
  };
  const setDelayBase = (delay) => {
    delayBase = delay;
  };
  return {
    computeNextBackoffDelay,
    setDelayBase
  };
};

// ../../../../node_modules/@smithy/util-retry/dist-es/defaultRetryToken.js
var createDefaultRetryToken = ({ retryDelay, retryCount, retryCost }) => {
  const getRetryCount = () => retryCount;
  const getRetryDelay = () => Math.min(MAXIMUM_RETRY_DELAY, retryDelay);
  const getRetryCost = () => retryCost;
  return {
    getRetryCount,
    getRetryDelay,
    getRetryCost
  };
};

// ../../../../node_modules/@smithy/util-retry/dist-es/StandardRetryStrategy.js
class StandardRetryStrategy {
  constructor(maxAttempts) {
    this.maxAttempts = maxAttempts;
    this.mode = RETRY_MODES.STANDARD;
    this.capacity = INITIAL_RETRY_TOKENS;
    this.retryBackoffStrategy = getDefaultRetryBackoffStrategy();
    this.maxAttemptsProvider = typeof maxAttempts === "function" ? maxAttempts : async () => maxAttempts;
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
}

// ../../../../node_modules/@smithy/util-retry/dist-es/AdaptiveRetryStrategy.js
class AdaptiveRetryStrategy {
  constructor(maxAttemptsProvider, options) {
    this.maxAttemptsProvider = maxAttemptsProvider;
    this.mode = RETRY_MODES.ADAPTIVE;
    const { rateLimiter } = options ?? {};
    this.rateLimiter = rateLimiter ?? new DefaultRateLimiter;
    this.standardRetryStrategy = new StandardRetryStrategy(maxAttemptsProvider);
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
}
// ../../../../node_modules/@smithy/middleware-retry/dist-es/configurations.js
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
  default: DEFAULT_MAX_ATTEMPTS
};
var resolveRetryConfig = (input) => {
  const { retryStrategy, retryMode: _retryMode, maxAttempts: _maxAttempts } = input;
  const maxAttempts = normalizeProvider2(_maxAttempts ?? DEFAULT_MAX_ATTEMPTS);
  return Object.assign(input, {
    maxAttempts,
    retryStrategy: async () => {
      if (retryStrategy) {
        return retryStrategy;
      }
      const retryMode = await normalizeProvider2(_retryMode)();
      if (retryMode === RETRY_MODES.ADAPTIVE) {
        return new AdaptiveRetryStrategy(maxAttempts);
      }
      return new StandardRetryStrategy(maxAttempts);
    }
  });
};
var ENV_RETRY_MODE = "AWS_RETRY_MODE";
var CONFIG_RETRY_MODE = "retry_mode";
var NODE_RETRY_MODE_CONFIG_OPTIONS = {
  environmentVariableSelector: (env) => env[ENV_RETRY_MODE],
  configFileSelector: (profile) => profile[CONFIG_RETRY_MODE],
  default: DEFAULT_RETRY_MODE
};

// ../../../../node_modules/uuid/wrapper.mjs
var import_dist = __toESM(require_dist(), 1);
var v1 = import_dist.default.v1;
var v3 = import_dist.default.v3;
var v4 = import_dist.default.v4;
var v5 = import_dist.default.v5;
var NIL = import_dist.default.NIL;
var version = import_dist.default.version;
var validate = import_dist.default.validate;
var stringify = import_dist.default.stringify;
var parse = import_dist.default.parse;

// ../../../../node_modules/@smithy/middleware-retry/dist-es/isStreamingPayload/isStreamingPayload.js
import { Readable } from "stream";
var isStreamingPayload = (request) => request?.body instanceof Readable || typeof ReadableStream !== "undefined" && request?.body instanceof ReadableStream;

// ../../../../node_modules/@smithy/middleware-retry/dist-es/util.js
var asSdkError = (error) => {
  if (error instanceof Error)
    return error;
  if (error instanceof Object)
    return Object.assign(new Error, error);
  if (typeof error === "string")
    return new Error(error);
  return new Error(`AWS SDK error wrapper for ${error}`);
};

// ../../../../node_modules/@smithy/middleware-retry/dist-es/retryMiddleware.js
var retryMiddleware = (options) => (next, context) => async (args) => {
  let retryStrategy = await options.retryStrategy();
  const maxAttempts = await options.maxAttempts();
  if (isRetryStrategyV2(retryStrategy)) {
    retryStrategy = retryStrategy;
    let retryToken = await retryStrategy.acquireInitialRetryToken(context["partition_id"]);
    let lastError = new Error;
    let attempts = 0;
    let totalRetryDelay = 0;
    const { request } = args;
    const isRequest = HttpRequest.isInstance(request);
    if (isRequest) {
      request.headers[INVOCATION_ID_HEADER] = v4();
    }
    while (true) {
      try {
        if (isRequest) {
          request.headers[REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
        }
        const { response, output } = await next(args);
        retryStrategy.recordSuccess(retryToken);
        output.$metadata.attempts = attempts + 1;
        output.$metadata.totalRetryDelay = totalRetryDelay;
        return { response, output };
      } catch (e) {
        const retryErrorInfo = getRetryErrorInfo(e);
        lastError = asSdkError(e);
        if (isRequest && isStreamingPayload(request)) {
          (context.logger instanceof NoOpLogger ? console : context.logger)?.warn("An error was encountered in a non-retryable streaming request.");
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
};
var isRetryStrategyV2 = (retryStrategy) => typeof retryStrategy.acquireInitialRetryToken !== "undefined" && typeof retryStrategy.refreshRetryTokenForRetry !== "undefined" && typeof retryStrategy.recordSuccess !== "undefined";
var getRetryErrorInfo = (error) => {
  const errorInfo = {
    error,
    errorType: getRetryErrorType(error)
  };
  const retryAfterHint = getRetryAfterHint(error.$response);
  if (retryAfterHint) {
    errorInfo.retryAfterHint = retryAfterHint;
  }
  return errorInfo;
};
var getRetryErrorType = (error) => {
  if (isThrottlingError(error))
    return "THROTTLING";
  if (isTransientError(error))
    return "TRANSIENT";
  if (isServerError(error))
    return "SERVER_ERROR";
  return "CLIENT_ERROR";
};
var retryMiddlewareOptions = {
  name: "retryMiddleware",
  tags: ["RETRY"],
  step: "finalizeRequest",
  priority: "high",
  override: true
};
var getRetryPlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(retryMiddleware(options), retryMiddlewareOptions);
  }
});
var getRetryAfterHint = (response) => {
  if (!HttpResponse.isInstance(response))
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
};
// ../../../../node_modules/@aws-sdk/util-user-agent-node/dist-es/defaultUserAgent.js
import { platform, release } from "os";
import { env, versions } from "process";

// ../../../../node_modules/@aws-sdk/util-user-agent-node/dist-es/crt-availability.js
var crtAvailability = {
  isCrtAvailable: false
};

// ../../../../node_modules/@aws-sdk/util-user-agent-node/dist-es/is-crt-available.js
var isCrtAvailable = () => {
  if (crtAvailability.isCrtAvailable) {
    return ["md/crt-avail"];
  }
  return null;
};

// ../../../../node_modules/@aws-sdk/util-user-agent-node/dist-es/defaultUserAgent.js
var createDefaultUserAgentProvider = ({ serviceId, clientVersion }) => {
  return async (config3) => {
    const sections = [
      ["aws-sdk-js", clientVersion],
      ["ua", "2.1"],
      [`os/${platform()}`, release()],
      ["lang/js"],
      ["md/nodejs", `${versions.node}`]
    ];
    const crtAvailable = isCrtAvailable();
    if (crtAvailable) {
      sections.push(crtAvailable);
    }
    if (serviceId) {
      sections.push([`api/${serviceId}`, clientVersion]);
    }
    if (env.AWS_EXECUTION_ENV) {
      sections.push([`exec-env/${env.AWS_EXECUTION_ENV}`]);
    }
    const appId = await config3?.userAgentAppId?.();
    const resolvedUserAgent = appId ? [...sections, [`app/${appId}`]] : [...sections];
    return resolvedUserAgent;
  };
};

// ../../../../node_modules/@aws-sdk/util-user-agent-node/dist-es/nodeAppIdConfigOptions.js
var UA_APP_ID_ENV_NAME = "AWS_SDK_UA_APP_ID";
var UA_APP_ID_INI_NAME = "sdk_ua_app_id";
var UA_APP_ID_INI_NAME_DEPRECATED = "sdk-ua-app-id";
var NODE_APP_ID_CONFIG_OPTIONS = {
  environmentVariableSelector: (env2) => env2[UA_APP_ID_ENV_NAME],
  configFileSelector: (profile) => profile[UA_APP_ID_INI_NAME] ?? profile[UA_APP_ID_INI_NAME_DEPRECATED],
  default: DEFAULT_UA_APP_ID
};
// ../../../../node_modules/@smithy/is-array-buffer/dist-es/index.js
var isArrayBuffer = (arg) => typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer || Object.prototype.toString.call(arg) === "[object ArrayBuffer]";

// ../../../../node_modules/@smithy/util-buffer-from/dist-es/index.js
import { Buffer as Buffer2 } from "buffer";
var fromArrayBuffer = (input, offset = 0, length = input.byteLength - offset) => {
  if (!isArrayBuffer(input)) {
    throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof input} (${input})`);
  }
  return Buffer2.from(input, offset, length);
};
var fromString = (input, encoding) => {
  if (typeof input !== "string") {
    throw new TypeError(`The "input" argument must be of type string. Received type ${typeof input} (${input})`);
  }
  return encoding ? Buffer2.from(input, encoding) : Buffer2.from(input);
};

// ../../../../node_modules/@smithy/util-utf8/dist-es/fromUtf8.js
var fromUtf8 = (input) => {
  const buf = fromString(input, "utf8");
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
};
// ../../../../node_modules/@smithy/util-utf8/dist-es/toUint8Array.js
var toUint8Array = (data) => {
  if (typeof data === "string") {
    return fromUtf8(data);
  }
  if (ArrayBuffer.isView(data)) {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
  }
  return new Uint8Array(data);
};
// ../../../../node_modules/@smithy/util-utf8/dist-es/toUtf8.js
var toUtf8 = (input) => {
  if (typeof input === "string") {
    return input;
  }
  if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
    throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
  }
  return fromArrayBuffer(input.buffer, input.byteOffset, input.byteLength).toString("utf8");
};
// ../../../../node_modules/@smithy/hash-node/dist-es/index.js
import { Buffer as Buffer3 } from "buffer";
import { createHash, createHmac } from "crypto";

class Hash {
  constructor(algorithmIdentifier, secret) {
    this.algorithmIdentifier = algorithmIdentifier;
    this.secret = secret;
    this.reset();
  }
  update(toHash, encoding) {
    this.hash.update(toUint8Array(castSourceData(toHash, encoding)));
  }
  digest() {
    return Promise.resolve(this.hash.digest());
  }
  reset() {
    this.hash = this.secret ? createHmac(this.algorithmIdentifier, castSourceData(this.secret)) : createHash(this.algorithmIdentifier);
  }
}
function castSourceData(toCast, encoding) {
  if (Buffer3.isBuffer(toCast)) {
    return toCast;
  }
  if (typeof toCast === "string") {
    return fromString(toCast, encoding);
  }
  if (ArrayBuffer.isView(toCast)) {
    return fromArrayBuffer(toCast.buffer, toCast.byteOffset, toCast.byteLength);
  }
  return fromArrayBuffer(toCast);
}

// ../../../../node_modules/@smithy/util-body-length-node/dist-es/calculateBodyLength.js
import { fstatSync, lstatSync } from "fs";
var calculateBodyLength = (body) => {
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
    return lstatSync(body.path).size;
  } else if (typeof body.fd === "number") {
    return fstatSync(body.fd).size;
  }
  throw new Error(`Body Length computation failed for ${body}`);
};
// ../../../../node_modules/@smithy/util-defaults-mode-node/dist-es/resolveDefaultsModeConfig.js
var import_property_provider = __toESM(require_dist_cjs3(), 1);

// ../../../../node_modules/@smithy/util-defaults-mode-node/dist-es/constants.js
var AWS_EXECUTION_ENV = "AWS_EXECUTION_ENV";
var AWS_REGION_ENV = "AWS_REGION";
var AWS_DEFAULT_REGION_ENV = "AWS_DEFAULT_REGION";
var ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
var DEFAULTS_MODE_OPTIONS = ["in-region", "cross-region", "mobile", "standard", "legacy"];
var IMDS_REGION_PATH = "/latest/meta-data/placement/region";

// ../../../../node_modules/@smithy/util-defaults-mode-node/dist-es/defaultsModeConfig.js
var AWS_DEFAULTS_MODE_ENV = "AWS_DEFAULTS_MODE";
var AWS_DEFAULTS_MODE_CONFIG = "defaults_mode";
var NODE_DEFAULTS_MODE_CONFIG_OPTIONS = {
  environmentVariableSelector: (env2) => {
    return env2[AWS_DEFAULTS_MODE_ENV];
  },
  configFileSelector: (profile) => {
    return profile[AWS_DEFAULTS_MODE_CONFIG];
  },
  default: "legacy"
};

// ../../../../node_modules/@smithy/util-defaults-mode-node/dist-es/resolveDefaultsModeConfig.js
var resolveDefaultsModeConfig = ({ region = loadConfig(NODE_REGION_CONFIG_OPTIONS), defaultsMode = loadConfig(NODE_DEFAULTS_MODE_CONFIG_OPTIONS) } = {}) => import_property_provider.memoize(async () => {
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
});
var resolveNodeDefaultsModeAuto = async (clientRegion) => {
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
};
var inferPhysicalRegion = async () => {
  if (process.env[AWS_EXECUTION_ENV] && (process.env[AWS_REGION_ENV] || process.env[AWS_DEFAULT_REGION_ENV])) {
    return process.env[AWS_REGION_ENV] ?? process.env[AWS_DEFAULT_REGION_ENV];
  }
  if (!process.env[ENV_IMDS_DISABLED]) {
    try {
      const { getInstanceMetadataEndpoint, httpRequest } = await import("./chunk-mgjy4dwe.js");
      const endpoint = await getInstanceMetadataEndpoint();
      return (await httpRequest({ ...endpoint, path: IMDS_REGION_PATH })).toString();
    } catch (e) {}
  }
};
// ../../../../node_modules/@aws-sdk/region-config-resolver/dist-es/extensions/index.js
var getAwsRegionExtensionConfiguration = (runtimeConfig) => {
  return {
    setRegion(region) {
      runtimeConfig.region = region;
    },
    region() {
      return runtimeConfig.region;
    }
  };
};
var resolveAwsRegionExtensionConfiguration = (awsRegionExtensionConfiguration) => {
  return {
    region: awsRegionExtensionConfiguration.region()
  };
};
// ../../../../node_modules/@smithy/util-base64/dist-es/fromBase64.js
var BASE64_REGEX = /^[A-Za-z0-9+/]*={0,2}$/;
var fromBase64 = (input) => {
  if (input.length * 3 % 4 !== 0) {
    throw new TypeError(`Incorrect padding on base64 string.`);
  }
  if (!BASE64_REGEX.exec(input)) {
    throw new TypeError(`Invalid base64 string.`);
  }
  const buffer = fromString(input, "base64");
  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
};

// ../../../../node_modules/@smithy/util-base64/dist-es/toBase64.js
var toBase64 = (_input) => {
  let input;
  if (typeof _input === "string") {
    input = fromUtf8(_input);
  } else {
    input = _input;
  }
  if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
    throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
  }
  return fromArrayBuffer(input.buffer, input.byteOffset, input.byteLength).toString("base64");
};
export { resolveHostHeaderConfig, getHostHeaderPlugin, getLoggerPlugin, getRecursionDetectionPlugin, resolveUserAgentConfig, EndpointCache, customEndpointFunctions, resolveEndpoint, awsEndpointFunctions, getUserAgentPlugin, NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, getSmithyContext, normalizeProvider2 as normalizeProvider, NODE_REGION_CONFIG_OPTIONS, NODE_REGION_CONFIG_FILE_OPTIONS, resolveRegionConfig, getContentLengthPlugin, getSerdePlugin, getEndpointPlugin, resolveEndpointConfig, DEFAULT_RETRY_MODE, NODE_MAX_ATTEMPT_CONFIG_OPTIONS, resolveRetryConfig, NODE_RETRY_MODE_CONFIG_OPTIONS, getRetryPlugin, createDefaultUserAgentProvider, NODE_APP_ID_CONFIG_OPTIONS, fromUtf8, toUtf8, Hash, calculateBodyLength, fromBase64, toBase64, resolveDefaultsModeConfig, getAwsRegionExtensionConfiguration, resolveAwsRegionExtensionConfiguration };
