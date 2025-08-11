import {
  require_dist_cjs as require_dist_cjs2,
  require_dist_cjs1 as require_dist_cjs3,
  require_dist_cjs2 as require_dist_cjs4,
  require_dist_cjs4 as require_dist_cjs5,
  require_dist_cjs5 as require_dist_cjs6,
  require_dist_cjs6 as require_dist_cjs7,
  require_dist_cjs8,
  require_protocols,
  require_schema,
  require_serde
} from "./chunk-p8vym9ay.js";
import {
  require_dist_cjs
} from "./chunk-0rra9d59.js";
import {
  require_client
} from "./chunk-n2a7wn2k.js";
import {
  require_dist_cjs as require_dist_cjs9
} from "./chunk-v4rn7sgz.js";
import {
  __commonJS,
  __require
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/@smithy/middleware-serde/dist-cjs/index.js
var require_dist_cjs10 = __commonJS((exports, module) => {
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
    deserializerMiddleware: () => deserializerMiddleware,
    deserializerMiddlewareOption: () => deserializerMiddlewareOption,
    getSerdePlugin: () => getSerdePlugin,
    serializerMiddleware: () => serializerMiddleware,
    serializerMiddlewareOption: () => serializerMiddlewareOption
  });
  module.exports = __toCommonJS(src_exports);
  var import_protocol_http = require_dist_cjs3();
  var deserializerMiddleware = /* @__PURE__ */ __name((options, deserializer) => (next, context) => async (args) => {
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
          if (import_protocol_http.HttpResponse.isInstance(response)) {
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
  }, "deserializerMiddleware");
  var findHeader = /* @__PURE__ */ __name((pattern, headers) => {
    return (headers.find(([k]) => {
      return k.match(pattern);
    }) || [undefined, undefined])[1];
  }, "findHeader");
  var serializerMiddleware = /* @__PURE__ */ __name((options, serializer) => (next, context) => async (args) => {
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
  }, "serializerMiddleware");
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
  function getSerdePlugin(config, serializer, deserializer) {
    return {
      applyToStack: (commandStack) => {
        commandStack.add(deserializerMiddleware(config, deserializer), deserializerMiddlewareOption);
        commandStack.add(serializerMiddleware(config, serializer), serializerMiddlewareOption);
      }
    };
  }
  __name(getSerdePlugin, "getSerdePlugin");
});

// ../../../../node_modules/@smithy/core/dist-cjs/index.js
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
    DefaultIdentityProviderConfig: () => DefaultIdentityProviderConfig,
    EXPIRATION_MS: () => EXPIRATION_MS,
    HttpApiKeyAuthSigner: () => HttpApiKeyAuthSigner,
    HttpBearerAuthSigner: () => HttpBearerAuthSigner,
    NoAuthSigner: () => NoAuthSigner,
    createIsIdentityExpiredFunction: () => createIsIdentityExpiredFunction,
    createPaginator: () => createPaginator,
    doesIdentityRequireRefresh: () => doesIdentityRequireRefresh,
    getHttpAuthSchemeEndpointRuleSetPlugin: () => getHttpAuthSchemeEndpointRuleSetPlugin,
    getHttpAuthSchemePlugin: () => getHttpAuthSchemePlugin,
    getHttpSigningPlugin: () => getHttpSigningPlugin,
    getSmithyContext: () => getSmithyContext,
    httpAuthSchemeEndpointRuleSetMiddlewareOptions: () => httpAuthSchemeEndpointRuleSetMiddlewareOptions,
    httpAuthSchemeMiddleware: () => httpAuthSchemeMiddleware,
    httpAuthSchemeMiddlewareOptions: () => httpAuthSchemeMiddlewareOptions,
    httpSigningMiddleware: () => httpSigningMiddleware,
    httpSigningMiddlewareOptions: () => httpSigningMiddlewareOptions,
    isIdentityExpired: () => isIdentityExpired,
    memoizeIdentityProvider: () => memoizeIdentityProvider,
    normalizeProvider: () => normalizeProvider,
    requestBuilder: () => import_protocols.requestBuilder,
    setFeature: () => setFeature
  });
  module.exports = __toCommonJS(src_exports);
  var import_types = require_dist_cjs();
  var getSmithyContext = /* @__PURE__ */ __name((context) => context[import_types.SMITHY_CONTEXT_KEY] || (context[import_types.SMITHY_CONTEXT_KEY] = {}), "getSmithyContext");
  var import_util_middleware = require_dist_cjs2();
  var resolveAuthOptions = /* @__PURE__ */ __name((candidateAuthOptions, authSchemePreference) => {
    if (!authSchemePreference || authSchemePreference.length === 0) {
      return candidateAuthOptions;
    }
    const preferredAuthOptions = [];
    for (const preferredSchemeName of authSchemePreference) {
      for (const candidateAuthOption of candidateAuthOptions) {
        const candidateAuthSchemeName = candidateAuthOption.schemeId.split("#")[1];
        if (candidateAuthSchemeName === preferredSchemeName) {
          preferredAuthOptions.push(candidateAuthOption);
        }
      }
    }
    for (const candidateAuthOption of candidateAuthOptions) {
      if (!preferredAuthOptions.find(({ schemeId }) => schemeId === candidateAuthOption.schemeId)) {
        preferredAuthOptions.push(candidateAuthOption);
      }
    }
    return preferredAuthOptions;
  }, "resolveAuthOptions");
  function convertHttpAuthSchemesToMap(httpAuthSchemes) {
    const map = /* @__PURE__ */ new Map;
    for (const scheme of httpAuthSchemes) {
      map.set(scheme.schemeId, scheme);
    }
    return map;
  }
  __name(convertHttpAuthSchemesToMap, "convertHttpAuthSchemesToMap");
  var httpAuthSchemeMiddleware = /* @__PURE__ */ __name((config, mwOptions) => (next, context) => async (args) => {
    const options = config.httpAuthSchemeProvider(await mwOptions.httpAuthSchemeParametersProvider(config, context, args.input));
    const authSchemePreference = config.authSchemePreference ? await config.authSchemePreference() : [];
    const resolvedOptions = resolveAuthOptions(options, authSchemePreference);
    const authSchemes = convertHttpAuthSchemesToMap(config.httpAuthSchemes);
    const smithyContext = (0, import_util_middleware.getSmithyContext)(context);
    const failureReasons = [];
    for (const option of resolvedOptions) {
      const scheme = authSchemes.get(option.schemeId);
      if (!scheme) {
        failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` was not enabled for this service.`);
        continue;
      }
      const identityProvider = scheme.identityProvider(await mwOptions.identityProviderConfigProvider(config));
      if (!identityProvider) {
        failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` did not have an IdentityProvider configured.`);
        continue;
      }
      const { identityProperties = {}, signingProperties = {} } = option.propertiesExtractor?.(config, context) || {};
      option.identityProperties = Object.assign(option.identityProperties || {}, identityProperties);
      option.signingProperties = Object.assign(option.signingProperties || {}, signingProperties);
      smithyContext.selectedHttpAuthScheme = {
        httpAuthOption: option,
        identity: await identityProvider(option.identityProperties),
        signer: scheme.signer
      };
      break;
    }
    if (!smithyContext.selectedHttpAuthScheme) {
      throw new Error(failureReasons.join(`
`));
    }
    return next(args);
  }, "httpAuthSchemeMiddleware");
  var httpAuthSchemeEndpointRuleSetMiddlewareOptions = {
    step: "serialize",
    tags: ["HTTP_AUTH_SCHEME"],
    name: "httpAuthSchemeMiddleware",
    override: true,
    relation: "before",
    toMiddleware: "endpointV2Middleware"
  };
  var getHttpAuthSchemeEndpointRuleSetPlugin = /* @__PURE__ */ __name((config, {
    httpAuthSchemeParametersProvider,
    identityProviderConfigProvider
  }) => ({
    applyToStack: (clientStack) => {
      clientStack.addRelativeTo(httpAuthSchemeMiddleware(config, {
        httpAuthSchemeParametersProvider,
        identityProviderConfigProvider
      }), httpAuthSchemeEndpointRuleSetMiddlewareOptions);
    }
  }), "getHttpAuthSchemeEndpointRuleSetPlugin");
  var import_middleware_serde = require_dist_cjs10();
  var httpAuthSchemeMiddlewareOptions = {
    step: "serialize",
    tags: ["HTTP_AUTH_SCHEME"],
    name: "httpAuthSchemeMiddleware",
    override: true,
    relation: "before",
    toMiddleware: import_middleware_serde.serializerMiddlewareOption.name
  };
  var getHttpAuthSchemePlugin = /* @__PURE__ */ __name((config, {
    httpAuthSchemeParametersProvider,
    identityProviderConfigProvider
  }) => ({
    applyToStack: (clientStack) => {
      clientStack.addRelativeTo(httpAuthSchemeMiddleware(config, {
        httpAuthSchemeParametersProvider,
        identityProviderConfigProvider
      }), httpAuthSchemeMiddlewareOptions);
    }
  }), "getHttpAuthSchemePlugin");
  var import_protocol_http = require_dist_cjs3();
  var defaultErrorHandler = /* @__PURE__ */ __name((signingProperties) => (error) => {
    throw error;
  }, "defaultErrorHandler");
  var defaultSuccessHandler = /* @__PURE__ */ __name((httpResponse, signingProperties) => {}, "defaultSuccessHandler");
  var httpSigningMiddleware = /* @__PURE__ */ __name((config) => (next, context) => async (args) => {
    if (!import_protocol_http.HttpRequest.isInstance(args.request)) {
      return next(args);
    }
    const smithyContext = (0, import_util_middleware.getSmithyContext)(context);
    const scheme = smithyContext.selectedHttpAuthScheme;
    if (!scheme) {
      throw new Error(`No HttpAuthScheme was selected: unable to sign request`);
    }
    const {
      httpAuthOption: { signingProperties = {} },
      identity,
      signer
    } = scheme;
    const output = await next({
      ...args,
      request: await signer.sign(args.request, identity, signingProperties)
    }).catch((signer.errorHandler || defaultErrorHandler)(signingProperties));
    (signer.successHandler || defaultSuccessHandler)(output.response, signingProperties);
    return output;
  }, "httpSigningMiddleware");
  var httpSigningMiddlewareOptions = {
    step: "finalizeRequest",
    tags: ["HTTP_SIGNING"],
    name: "httpSigningMiddleware",
    aliases: ["apiKeyMiddleware", "tokenMiddleware", "awsAuthMiddleware"],
    override: true,
    relation: "after",
    toMiddleware: "retryMiddleware"
  };
  var getHttpSigningPlugin = /* @__PURE__ */ __name((config) => ({
    applyToStack: (clientStack) => {
      clientStack.addRelativeTo(httpSigningMiddleware(config), httpSigningMiddlewareOptions);
    }
  }), "getHttpSigningPlugin");
  var normalizeProvider = /* @__PURE__ */ __name((input) => {
    if (typeof input === "function")
      return input;
    const promisified = Promise.resolve(input);
    return () => promisified;
  }, "normalizeProvider");
  var makePagedClientRequest = /* @__PURE__ */ __name(async (CommandCtor, client, input, withCommand = (_) => _, ...args) => {
    let command = new CommandCtor(input);
    command = withCommand(command) ?? command;
    return await client.send(command, ...args);
  }, "makePagedClientRequest");
  function createPaginator(ClientCtor, CommandCtor, inputTokenName, outputTokenName, pageSizeTokenName) {
    return /* @__PURE__ */ __name(async function* paginateOperation(config, input, ...additionalArguments) {
      const _input = input;
      let token = config.startingToken ?? _input[inputTokenName];
      let hasNext = true;
      let page;
      while (hasNext) {
        _input[inputTokenName] = token;
        if (pageSizeTokenName) {
          _input[pageSizeTokenName] = _input[pageSizeTokenName] ?? config.pageSize;
        }
        if (config.client instanceof ClientCtor) {
          page = await makePagedClientRequest(CommandCtor, config.client, input, config.withCommand, ...additionalArguments);
        } else {
          throw new Error(`Invalid client, expected instance of ${ClientCtor.name}`);
        }
        yield page;
        const prevToken = token;
        token = get(page, outputTokenName);
        hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
      }
      return;
    }, "paginateOperation");
  }
  __name(createPaginator, "createPaginator");
  var get = /* @__PURE__ */ __name((fromObject, path) => {
    let cursor = fromObject;
    const pathComponents = path.split(".");
    for (const step of pathComponents) {
      if (!cursor || typeof cursor !== "object") {
        return;
      }
      cursor = cursor[step];
    }
    return cursor;
  }, "get");
  var import_protocols = require_protocols();
  function setFeature(context, feature, value) {
    if (!context.__smithy_context) {
      context.__smithy_context = {
        features: {}
      };
    } else if (!context.__smithy_context.features) {
      context.__smithy_context.features = {};
    }
    context.__smithy_context.features[feature] = value;
  }
  __name(setFeature, "setFeature");
  var DefaultIdentityProviderConfig = class {
    constructor(config) {
      this.authSchemes = /* @__PURE__ */ new Map;
      for (const [key, value] of Object.entries(config)) {
        if (value !== undefined) {
          this.authSchemes.set(key, value);
        }
      }
    }
    static {
      __name(this, "DefaultIdentityProviderConfig");
    }
    getIdentityProvider(schemeId) {
      return this.authSchemes.get(schemeId);
    }
  };
  var HttpApiKeyAuthSigner = class {
    static {
      __name(this, "HttpApiKeyAuthSigner");
    }
    async sign(httpRequest, identity, signingProperties) {
      if (!signingProperties) {
        throw new Error("request could not be signed with `apiKey` since the `name` and `in` signer properties are missing");
      }
      if (!signingProperties.name) {
        throw new Error("request could not be signed with `apiKey` since the `name` signer property is missing");
      }
      if (!signingProperties.in) {
        throw new Error("request could not be signed with `apiKey` since the `in` signer property is missing");
      }
      if (!identity.apiKey) {
        throw new Error("request could not be signed with `apiKey` since the `apiKey` is not defined");
      }
      const clonedRequest = import_protocol_http.HttpRequest.clone(httpRequest);
      if (signingProperties.in === import_types.HttpApiKeyAuthLocation.QUERY) {
        clonedRequest.query[signingProperties.name] = identity.apiKey;
      } else if (signingProperties.in === import_types.HttpApiKeyAuthLocation.HEADER) {
        clonedRequest.headers[signingProperties.name] = signingProperties.scheme ? `${signingProperties.scheme} ${identity.apiKey}` : identity.apiKey;
      } else {
        throw new Error("request can only be signed with `apiKey` locations `query` or `header`, but found: `" + signingProperties.in + "`");
      }
      return clonedRequest;
    }
  };
  var HttpBearerAuthSigner = class {
    static {
      __name(this, "HttpBearerAuthSigner");
    }
    async sign(httpRequest, identity, signingProperties) {
      const clonedRequest = import_protocol_http.HttpRequest.clone(httpRequest);
      if (!identity.token) {
        throw new Error("request could not be signed with `token` since the `token` is not defined");
      }
      clonedRequest.headers["Authorization"] = `Bearer ${identity.token}`;
      return clonedRequest;
    }
  };
  var NoAuthSigner = class {
    static {
      __name(this, "NoAuthSigner");
    }
    async sign(httpRequest, identity, signingProperties) {
      return httpRequest;
    }
  };
  var createIsIdentityExpiredFunction = /* @__PURE__ */ __name((expirationMs) => (identity) => doesIdentityRequireRefresh(identity) && identity.expiration.getTime() - Date.now() < expirationMs, "createIsIdentityExpiredFunction");
  var EXPIRATION_MS = 300000;
  var isIdentityExpired = createIsIdentityExpiredFunction(EXPIRATION_MS);
  var doesIdentityRequireRefresh = /* @__PURE__ */ __name((identity) => identity.expiration !== undefined, "doesIdentityRequireRefresh");
  var memoizeIdentityProvider = /* @__PURE__ */ __name((provider, isExpired, requiresRefresh) => {
    if (provider === undefined) {
      return;
    }
    const normalizedProvider = typeof provider !== "function" ? async () => Promise.resolve(provider) : provider;
    let resolved;
    let pending;
    let hasResult;
    let isConstant = false;
    const coalesceProvider = /* @__PURE__ */ __name(async (options) => {
      if (!pending) {
        pending = normalizedProvider(options);
      }
      try {
        resolved = await pending;
        hasResult = true;
        isConstant = false;
      } finally {
        pending = undefined;
      }
      return resolved;
    }, "coalesceProvider");
    if (isExpired === undefined) {
      return async (options) => {
        if (!hasResult || options?.forceRefresh) {
          resolved = await coalesceProvider(options);
        }
        return resolved;
      };
    }
    return async (options) => {
      if (!hasResult || options?.forceRefresh) {
        resolved = await coalesceProvider(options);
      }
      if (isConstant) {
        return resolved;
      }
      if (!requiresRefresh(resolved)) {
        isConstant = true;
        return resolved;
      }
      if (isExpired(resolved)) {
        await coalesceProvider(options);
        return resolved;
      }
      return resolved;
    };
  }, "memoizeIdentityProvider");
});

// ../../../../node_modules/@smithy/middleware-stack/dist-cjs/index.js
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
    constructStack: () => constructStack
  });
  module.exports = __toCommonJS(src_exports);
  var getAllAliases = /* @__PURE__ */ __name((name, aliases) => {
    const _aliases = [];
    if (name) {
      _aliases.push(name);
    }
    if (aliases) {
      for (const alias of aliases) {
        _aliases.push(alias);
      }
    }
    return _aliases;
  }, "getAllAliases");
  var getMiddlewareNameWithAliases = /* @__PURE__ */ __name((name, aliases) => {
    return `${name || "anonymous"}${aliases && aliases.length > 0 ? ` (a.k.a. ${aliases.join(",")})` : ""}`;
  }, "getMiddlewareNameWithAliases");
  var constructStack = /* @__PURE__ */ __name(() => {
    let absoluteEntries = [];
    let relativeEntries = [];
    let identifyOnResolve = false;
    const entriesNameSet = /* @__PURE__ */ new Set;
    const sort = /* @__PURE__ */ __name((entries) => entries.sort((a, b) => stepWeights[b.step] - stepWeights[a.step] || priorityWeights[b.priority || "normal"] - priorityWeights[a.priority || "normal"]), "sort");
    const removeByName = /* @__PURE__ */ __name((toRemove) => {
      let isRemoved = false;
      const filterCb = /* @__PURE__ */ __name((entry) => {
        const aliases = getAllAliases(entry.name, entry.aliases);
        if (aliases.includes(toRemove)) {
          isRemoved = true;
          for (const alias of aliases) {
            entriesNameSet.delete(alias);
          }
          return false;
        }
        return true;
      }, "filterCb");
      absoluteEntries = absoluteEntries.filter(filterCb);
      relativeEntries = relativeEntries.filter(filterCb);
      return isRemoved;
    }, "removeByName");
    const removeByReference = /* @__PURE__ */ __name((toRemove) => {
      let isRemoved = false;
      const filterCb = /* @__PURE__ */ __name((entry) => {
        if (entry.middleware === toRemove) {
          isRemoved = true;
          for (const alias of getAllAliases(entry.name, entry.aliases)) {
            entriesNameSet.delete(alias);
          }
          return false;
        }
        return true;
      }, "filterCb");
      absoluteEntries = absoluteEntries.filter(filterCb);
      relativeEntries = relativeEntries.filter(filterCb);
      return isRemoved;
    }, "removeByReference");
    const cloneTo = /* @__PURE__ */ __name((toStack) => {
      absoluteEntries.forEach((entry) => {
        toStack.add(entry.middleware, { ...entry });
      });
      relativeEntries.forEach((entry) => {
        toStack.addRelativeTo(entry.middleware, { ...entry });
      });
      toStack.identifyOnResolve?.(stack.identifyOnResolve());
      return toStack;
    }, "cloneTo");
    const expandRelativeMiddlewareList = /* @__PURE__ */ __name((from) => {
      const expandedMiddlewareList = [];
      from.before.forEach((entry) => {
        if (entry.before.length === 0 && entry.after.length === 0) {
          expandedMiddlewareList.push(entry);
        } else {
          expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
        }
      });
      expandedMiddlewareList.push(from);
      from.after.reverse().forEach((entry) => {
        if (entry.before.length === 0 && entry.after.length === 0) {
          expandedMiddlewareList.push(entry);
        } else {
          expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
        }
      });
      return expandedMiddlewareList;
    }, "expandRelativeMiddlewareList");
    const getMiddlewareList = /* @__PURE__ */ __name((debug = false) => {
      const normalizedAbsoluteEntries = [];
      const normalizedRelativeEntries = [];
      const normalizedEntriesNameMap = {};
      absoluteEntries.forEach((entry) => {
        const normalizedEntry = {
          ...entry,
          before: [],
          after: []
        };
        for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) {
          normalizedEntriesNameMap[alias] = normalizedEntry;
        }
        normalizedAbsoluteEntries.push(normalizedEntry);
      });
      relativeEntries.forEach((entry) => {
        const normalizedEntry = {
          ...entry,
          before: [],
          after: []
        };
        for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) {
          normalizedEntriesNameMap[alias] = normalizedEntry;
        }
        normalizedRelativeEntries.push(normalizedEntry);
      });
      normalizedRelativeEntries.forEach((entry) => {
        if (entry.toMiddleware) {
          const toMiddleware = normalizedEntriesNameMap[entry.toMiddleware];
          if (toMiddleware === undefined) {
            if (debug) {
              return;
            }
            throw new Error(`${entry.toMiddleware} is not found when adding ${getMiddlewareNameWithAliases(entry.name, entry.aliases)} middleware ${entry.relation} ${entry.toMiddleware}`);
          }
          if (entry.relation === "after") {
            toMiddleware.after.push(entry);
          }
          if (entry.relation === "before") {
            toMiddleware.before.push(entry);
          }
        }
      });
      const mainChain = sort(normalizedAbsoluteEntries).map(expandRelativeMiddlewareList).reduce((wholeList, expandedMiddlewareList) => {
        wholeList.push(...expandedMiddlewareList);
        return wholeList;
      }, []);
      return mainChain;
    }, "getMiddlewareList");
    const stack = {
      add: (middleware, options = {}) => {
        const { name, override, aliases: _aliases } = options;
        const entry = {
          step: "initialize",
          priority: "normal",
          middleware,
          ...options
        };
        const aliases = getAllAliases(name, _aliases);
        if (aliases.length > 0) {
          if (aliases.some((alias) => entriesNameSet.has(alias))) {
            if (!override)
              throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
            for (const alias of aliases) {
              const toOverrideIndex = absoluteEntries.findIndex((entry2) => entry2.name === alias || entry2.aliases?.some((a) => a === alias));
              if (toOverrideIndex === -1) {
                continue;
              }
              const toOverride = absoluteEntries[toOverrideIndex];
              if (toOverride.step !== entry.step || entry.priority !== toOverride.priority) {
                throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware with ${toOverride.priority} priority in ${toOverride.step} step cannot be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware with ${entry.priority} priority in ${entry.step} step.`);
              }
              absoluteEntries.splice(toOverrideIndex, 1);
            }
          }
          for (const alias of aliases) {
            entriesNameSet.add(alias);
          }
        }
        absoluteEntries.push(entry);
      },
      addRelativeTo: (middleware, options) => {
        const { name, override, aliases: _aliases } = options;
        const entry = {
          middleware,
          ...options
        };
        const aliases = getAllAliases(name, _aliases);
        if (aliases.length > 0) {
          if (aliases.some((alias) => entriesNameSet.has(alias))) {
            if (!override)
              throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
            for (const alias of aliases) {
              const toOverrideIndex = relativeEntries.findIndex((entry2) => entry2.name === alias || entry2.aliases?.some((a) => a === alias));
              if (toOverrideIndex === -1) {
                continue;
              }
              const toOverride = relativeEntries[toOverrideIndex];
              if (toOverride.toMiddleware !== entry.toMiddleware || toOverride.relation !== entry.relation) {
                throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware ${toOverride.relation} "${toOverride.toMiddleware}" middleware cannot be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware ${entry.relation} "${entry.toMiddleware}" middleware.`);
              }
              relativeEntries.splice(toOverrideIndex, 1);
            }
          }
          for (const alias of aliases) {
            entriesNameSet.add(alias);
          }
        }
        relativeEntries.push(entry);
      },
      clone: () => cloneTo(constructStack()),
      use: (plugin) => {
        plugin.applyToStack(stack);
      },
      remove: (toRemove) => {
        if (typeof toRemove === "string")
          return removeByName(toRemove);
        else
          return removeByReference(toRemove);
      },
      removeByTag: (toRemove) => {
        let isRemoved = false;
        const filterCb = /* @__PURE__ */ __name((entry) => {
          const { tags, name, aliases: _aliases } = entry;
          if (tags && tags.includes(toRemove)) {
            const aliases = getAllAliases(name, _aliases);
            for (const alias of aliases) {
              entriesNameSet.delete(alias);
            }
            isRemoved = true;
            return false;
          }
          return true;
        }, "filterCb");
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
      },
      concat: (from) => {
        const cloned = cloneTo(constructStack());
        cloned.use(from);
        cloned.identifyOnResolve(identifyOnResolve || cloned.identifyOnResolve() || (from.identifyOnResolve?.() ?? false));
        return cloned;
      },
      applyToStack: cloneTo,
      identify: () => {
        return getMiddlewareList(true).map((mw) => {
          const step = mw.step ?? mw.relation + " " + mw.toMiddleware;
          return getMiddlewareNameWithAliases(mw.name, mw.aliases) + " - " + step;
        });
      },
      identifyOnResolve(toggle) {
        if (typeof toggle === "boolean")
          identifyOnResolve = toggle;
        return identifyOnResolve;
      },
      resolve: (handler, context) => {
        for (const middleware of getMiddlewareList().map((entry) => entry.middleware).reverse()) {
          handler = middleware(handler, context);
        }
        if (identifyOnResolve) {
          console.log(stack.identify());
        }
        return handler;
      }
    };
    return stack;
  }, "constructStack");
  var stepWeights = {
    initialize: 5,
    serialize: 4,
    build: 3,
    finalizeRequest: 2,
    deserialize: 1
  };
  var priorityWeights = {
    high: 3,
    normal: 2,
    low: 1
  };
});

// ../../../../node_modules/@smithy/smithy-client/dist-cjs/index.js
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
    Client: () => Client,
    Command: () => Command,
    NoOpLogger: () => NoOpLogger,
    SENSITIVE_STRING: () => SENSITIVE_STRING,
    ServiceException: () => ServiceException,
    _json: () => _json,
    collectBody: () => import_protocols.collectBody,
    convertMap: () => convertMap,
    createAggregatedClient: () => createAggregatedClient,
    decorateServiceException: () => decorateServiceException,
    emitWarningIfUnsupportedVersion: () => emitWarningIfUnsupportedVersion,
    extendedEncodeURIComponent: () => import_protocols.extendedEncodeURIComponent,
    getArrayIfSingleItem: () => getArrayIfSingleItem,
    getDefaultClientConfiguration: () => getDefaultClientConfiguration,
    getDefaultExtensionConfiguration: () => getDefaultExtensionConfiguration,
    getValueFromTextNode: () => getValueFromTextNode,
    isSerializableHeaderValue: () => isSerializableHeaderValue,
    loadConfigsForDefaultMode: () => loadConfigsForDefaultMode,
    map: () => map,
    resolveDefaultRuntimeConfig: () => resolveDefaultRuntimeConfig,
    resolvedPath: () => import_protocols.resolvedPath,
    serializeDateTime: () => serializeDateTime,
    serializeFloat: () => serializeFloat,
    take: () => take,
    throwDefaultError: () => throwDefaultError,
    withBaseException: () => withBaseException
  });
  module.exports = __toCommonJS(src_exports);
  var import_middleware_stack = require_dist_cjs12();
  var Client = class {
    constructor(config) {
      this.config = config;
      this.middlewareStack = (0, import_middleware_stack.constructStack)();
    }
    static {
      __name(this, "Client");
    }
    send(command, optionsOrCb, cb) {
      const options = typeof optionsOrCb !== "function" ? optionsOrCb : undefined;
      const callback = typeof optionsOrCb === "function" ? optionsOrCb : cb;
      const useHandlerCache = options === undefined && this.config.cacheMiddleware === true;
      let handler;
      if (useHandlerCache) {
        if (!this.handlers) {
          this.handlers = /* @__PURE__ */ new WeakMap;
        }
        const handlers = this.handlers;
        if (handlers.has(command.constructor)) {
          handler = handlers.get(command.constructor);
        } else {
          handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
          handlers.set(command.constructor, handler);
        }
      } else {
        delete this.handlers;
        handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
      }
      if (callback) {
        handler(command).then((result) => callback(null, result.output), (err) => callback(err)).catch(() => {});
      } else {
        return handler(command).then((result) => result.output);
      }
    }
    destroy() {
      this.config?.requestHandler?.destroy?.();
      delete this.handlers;
    }
  };
  var import_protocols = require_protocols();
  var import_types = require_dist_cjs();
  var Command = class {
    constructor() {
      this.middlewareStack = (0, import_middleware_stack.constructStack)();
    }
    static {
      __name(this, "Command");
    }
    static classBuilder() {
      return new ClassBuilder;
    }
    resolveMiddlewareWithContext(clientStack, configuration, options, {
      middlewareFn,
      clientName,
      commandName,
      inputFilterSensitiveLog,
      outputFilterSensitiveLog,
      smithyContext,
      additionalContext,
      CommandCtor
    }) {
      for (const mw of middlewareFn.bind(this)(CommandCtor, clientStack, configuration, options)) {
        this.middlewareStack.use(mw);
      }
      const stack = clientStack.concat(this.middlewareStack);
      const { logger: logger2 } = configuration;
      const handlerExecutionContext = {
        logger: logger2,
        clientName,
        commandName,
        inputFilterSensitiveLog,
        outputFilterSensitiveLog,
        [import_types.SMITHY_CONTEXT_KEY]: {
          commandInstance: this,
          ...smithyContext
        },
        ...additionalContext
      };
      const { requestHandler } = configuration;
      return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
  };
  var ClassBuilder = class {
    constructor() {
      this._init = () => {};
      this._ep = {};
      this._middlewareFn = () => [];
      this._commandName = "";
      this._clientName = "";
      this._additionalContext = {};
      this._smithyContext = {};
      this._inputFilterSensitiveLog = (_) => _;
      this._outputFilterSensitiveLog = (_) => _;
      this._serializer = null;
      this._deserializer = null;
    }
    static {
      __name(this, "ClassBuilder");
    }
    init(cb) {
      this._init = cb;
    }
    ep(endpointParameterInstructions) {
      this._ep = endpointParameterInstructions;
      return this;
    }
    m(middlewareSupplier) {
      this._middlewareFn = middlewareSupplier;
      return this;
    }
    s(service, operation, smithyContext = {}) {
      this._smithyContext = {
        service,
        operation,
        ...smithyContext
      };
      return this;
    }
    c(additionalContext = {}) {
      this._additionalContext = additionalContext;
      return this;
    }
    n(clientName, commandName) {
      this._clientName = clientName;
      this._commandName = commandName;
      return this;
    }
    f(inputFilter = (_) => _, outputFilter = (_) => _) {
      this._inputFilterSensitiveLog = inputFilter;
      this._outputFilterSensitiveLog = outputFilter;
      return this;
    }
    ser(serializer) {
      this._serializer = serializer;
      return this;
    }
    de(deserializer) {
      this._deserializer = deserializer;
      return this;
    }
    sc(operation) {
      this._operationSchema = operation;
      this._smithyContext.operationSchema = operation;
      return this;
    }
    build() {
      const closure = this;
      let CommandRef;
      return CommandRef = class extends Command {
        constructor(...[input]) {
          super();
          this.serialize = closure._serializer;
          this.deserialize = closure._deserializer;
          this.input = input ?? {};
          closure._init(this);
          this.schema = closure._operationSchema;
        }
        static {
          __name(this, "CommandRef");
        }
        static getEndpointParameterInstructions() {
          return closure._ep;
        }
        resolveMiddleware(stack, configuration, options) {
          return this.resolveMiddlewareWithContext(stack, configuration, options, {
            CommandCtor: CommandRef,
            middlewareFn: closure._middlewareFn,
            clientName: closure._clientName,
            commandName: closure._commandName,
            inputFilterSensitiveLog: closure._inputFilterSensitiveLog,
            outputFilterSensitiveLog: closure._outputFilterSensitiveLog,
            smithyContext: closure._smithyContext,
            additionalContext: closure._additionalContext
          });
        }
      };
    }
  };
  var SENSITIVE_STRING = "***SensitiveInformation***";
  var createAggregatedClient = /* @__PURE__ */ __name((commands, Client2) => {
    for (const command of Object.keys(commands)) {
      const CommandCtor = commands[command];
      const methodImpl = /* @__PURE__ */ __name(async function(args, optionsOrCb, cb) {
        const command2 = new CommandCtor(args);
        if (typeof optionsOrCb === "function") {
          this.send(command2, optionsOrCb);
        } else if (typeof cb === "function") {
          if (typeof optionsOrCb !== "object")
            throw new Error(`Expected http options but got ${typeof optionsOrCb}`);
          this.send(command2, optionsOrCb || {}, cb);
        } else {
          return this.send(command2, optionsOrCb);
        }
      }, "methodImpl");
      const methodName = (command[0].toLowerCase() + command.slice(1)).replace(/Command$/, "");
      Client2.prototype[methodName] = methodImpl;
    }
  }, "createAggregatedClient");
  var ServiceException = class _ServiceException extends Error {
    static {
      __name(this, "ServiceException");
    }
    constructor(options) {
      super(options.message);
      Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype);
      this.name = options.name;
      this.$fault = options.$fault;
      this.$metadata = options.$metadata;
    }
    static isInstance(value) {
      if (!value)
        return false;
      const candidate = value;
      return _ServiceException.prototype.isPrototypeOf(candidate) || Boolean(candidate.$fault) && Boolean(candidate.$metadata) && (candidate.$fault === "client" || candidate.$fault === "server");
    }
    static [Symbol.hasInstance](instance) {
      if (!instance)
        return false;
      const candidate = instance;
      if (this === _ServiceException) {
        return _ServiceException.isInstance(instance);
      }
      if (_ServiceException.isInstance(instance)) {
        if (candidate.name && this.name) {
          return this.prototype.isPrototypeOf(instance) || candidate.name === this.name;
        }
        return this.prototype.isPrototypeOf(instance);
      }
      return false;
    }
  };
  var decorateServiceException = /* @__PURE__ */ __name((exception, additions = {}) => {
    Object.entries(additions).filter(([, v]) => v !== undefined).forEach(([k, v]) => {
      if (exception[k] == undefined || exception[k] === "") {
        exception[k] = v;
      }
    });
    const message = exception.message || exception.Message || "UnknownError";
    exception.message = message;
    delete exception.Message;
    return exception;
  }, "decorateServiceException");
  var throwDefaultError = /* @__PURE__ */ __name(({ output, parsedBody, exceptionCtor, errorCode }) => {
    const $metadata = deserializeMetadata(output);
    const statusCode = $metadata.httpStatusCode ? $metadata.httpStatusCode + "" : undefined;
    const response = new exceptionCtor({
      name: parsedBody?.code || parsedBody?.Code || errorCode || statusCode || "UnknownError",
      $fault: "client",
      $metadata
    });
    throw decorateServiceException(response, parsedBody);
  }, "throwDefaultError");
  var withBaseException = /* @__PURE__ */ __name((ExceptionCtor) => {
    return ({ output, parsedBody, errorCode }) => {
      throwDefaultError({ output, parsedBody, exceptionCtor: ExceptionCtor, errorCode });
    };
  }, "withBaseException");
  var deserializeMetadata = /* @__PURE__ */ __name((output) => ({
    httpStatusCode: output.statusCode,
    requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"]
  }), "deserializeMetadata");
  var loadConfigsForDefaultMode = /* @__PURE__ */ __name((mode) => {
    switch (mode) {
      case "standard":
        return {
          retryMode: "standard",
          connectionTimeout: 3100
        };
      case "in-region":
        return {
          retryMode: "standard",
          connectionTimeout: 1100
        };
      case "cross-region":
        return {
          retryMode: "standard",
          connectionTimeout: 3100
        };
      case "mobile":
        return {
          retryMode: "standard",
          connectionTimeout: 30000
        };
      default:
        return {};
    }
  }, "loadConfigsForDefaultMode");
  var warningEmitted = false;
  var emitWarningIfUnsupportedVersion = /* @__PURE__ */ __name((version) => {
    if (version && !warningEmitted && parseInt(version.substring(1, version.indexOf("."))) < 16) {
      warningEmitted = true;
    }
  }, "emitWarningIfUnsupportedVersion");
  var getChecksumConfiguration = /* @__PURE__ */ __name((runtimeConfig) => {
    const checksumAlgorithms = [];
    for (const id in import_types.AlgorithmId) {
      const algorithmId = import_types.AlgorithmId[id];
      if (runtimeConfig[algorithmId] === undefined) {
        continue;
      }
      checksumAlgorithms.push({
        algorithmId: () => algorithmId,
        checksumConstructor: () => runtimeConfig[algorithmId]
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
  var getRetryConfiguration = /* @__PURE__ */ __name((runtimeConfig) => {
    return {
      setRetryStrategy(retryStrategy) {
        runtimeConfig.retryStrategy = retryStrategy;
      },
      retryStrategy() {
        return runtimeConfig.retryStrategy;
      }
    };
  }, "getRetryConfiguration");
  var resolveRetryRuntimeConfig = /* @__PURE__ */ __name((retryStrategyConfiguration) => {
    const runtimeConfig = {};
    runtimeConfig.retryStrategy = retryStrategyConfiguration.retryStrategy();
    return runtimeConfig;
  }, "resolveRetryRuntimeConfig");
  var getDefaultExtensionConfiguration = /* @__PURE__ */ __name((runtimeConfig) => {
    return Object.assign(getChecksumConfiguration(runtimeConfig), getRetryConfiguration(runtimeConfig));
  }, "getDefaultExtensionConfiguration");
  var getDefaultClientConfiguration = getDefaultExtensionConfiguration;
  var resolveDefaultRuntimeConfig = /* @__PURE__ */ __name((config) => {
    return Object.assign(resolveChecksumRuntimeConfig(config), resolveRetryRuntimeConfig(config));
  }, "resolveDefaultRuntimeConfig");
  var getArrayIfSingleItem = /* @__PURE__ */ __name((mayBeArray) => Array.isArray(mayBeArray) ? mayBeArray : [mayBeArray], "getArrayIfSingleItem");
  var getValueFromTextNode = /* @__PURE__ */ __name((obj) => {
    const textNodeName = "#text";
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key][textNodeName] !== undefined) {
        obj[key] = obj[key][textNodeName];
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        obj[key] = getValueFromTextNode(obj[key]);
      }
    }
    return obj;
  }, "getValueFromTextNode");
  var isSerializableHeaderValue = /* @__PURE__ */ __name((value) => {
    return value != null;
  }, "isSerializableHeaderValue");
  var NoOpLogger = class {
    static {
      __name(this, "NoOpLogger");
    }
    trace() {}
    debug() {}
    info() {}
    warn() {}
    error() {}
  };
  function map(arg0, arg1, arg2) {
    let target;
    let filter;
    let instructions;
    if (typeof arg1 === "undefined" && typeof arg2 === "undefined") {
      target = {};
      instructions = arg0;
    } else {
      target = arg0;
      if (typeof arg1 === "function") {
        filter = arg1;
        instructions = arg2;
        return mapWithFilter(target, filter, instructions);
      } else {
        instructions = arg1;
      }
    }
    for (const key of Object.keys(instructions)) {
      if (!Array.isArray(instructions[key])) {
        target[key] = instructions[key];
        continue;
      }
      applyInstruction(target, null, instructions, key);
    }
    return target;
  }
  __name(map, "map");
  var convertMap = /* @__PURE__ */ __name((target) => {
    const output = {};
    for (const [k, v] of Object.entries(target || {})) {
      output[k] = [, v];
    }
    return output;
  }, "convertMap");
  var take = /* @__PURE__ */ __name((source, instructions) => {
    const out = {};
    for (const key in instructions) {
      applyInstruction(out, source, instructions, key);
    }
    return out;
  }, "take");
  var mapWithFilter = /* @__PURE__ */ __name((target, filter, instructions) => {
    return map(target, Object.entries(instructions).reduce((_instructions, [key, value]) => {
      if (Array.isArray(value)) {
        _instructions[key] = value;
      } else {
        if (typeof value === "function") {
          _instructions[key] = [filter, value()];
        } else {
          _instructions[key] = [filter, value];
        }
      }
      return _instructions;
    }, {}));
  }, "mapWithFilter");
  var applyInstruction = /* @__PURE__ */ __name((target, source, instructions, targetKey) => {
    if (source !== null) {
      let instruction = instructions[targetKey];
      if (typeof instruction === "function") {
        instruction = [, instruction];
      }
      const [filter2 = nonNullish, valueFn = pass, sourceKey = targetKey] = instruction;
      if (typeof filter2 === "function" && filter2(source[sourceKey]) || typeof filter2 !== "function" && !!filter2) {
        target[targetKey] = valueFn(source[sourceKey]);
      }
      return;
    }
    let [filter, value] = instructions[targetKey];
    if (typeof value === "function") {
      let _value;
      const defaultFilterPassed = filter === undefined && (_value = value()) != null;
      const customFilterPassed = typeof filter === "function" && !!filter(undefined) || typeof filter !== "function" && !!filter;
      if (defaultFilterPassed) {
        target[targetKey] = _value;
      } else if (customFilterPassed) {
        target[targetKey] = value();
      }
    } else {
      const defaultFilterPassed = filter === undefined && value != null;
      const customFilterPassed = typeof filter === "function" && !!filter(value) || typeof filter !== "function" && !!filter;
      if (defaultFilterPassed || customFilterPassed) {
        target[targetKey] = value;
      }
    }
  }, "applyInstruction");
  var nonNullish = /* @__PURE__ */ __name((_) => _ != null, "nonNullish");
  var pass = /* @__PURE__ */ __name((_) => _, "pass");
  var serializeFloat = /* @__PURE__ */ __name((value) => {
    if (value !== value) {
      return "NaN";
    }
    switch (value) {
      case Infinity:
        return "Infinity";
      case -Infinity:
        return "-Infinity";
      default:
        return value;
    }
  }, "serializeFloat");
  var serializeDateTime = /* @__PURE__ */ __name((date) => date.toISOString().replace(".000Z", "Z"), "serializeDateTime");
  var _json = /* @__PURE__ */ __name((obj) => {
    if (obj == null) {
      return {};
    }
    if (Array.isArray(obj)) {
      return obj.filter((_) => _ != null).map(_json);
    }
    if (typeof obj === "object") {
      const target = {};
      for (const key of Object.keys(obj)) {
        if (obj[key] == null) {
          continue;
        }
        target[key] = _json(obj[key]);
      }
      return target;
    }
    return obj;
  }, "_json");
  __reExport(src_exports, require_serde(), module.exports);
});

// ../../../../node_modules/tslib/tslib.js
var require_tslib = __commonJS((exports, module) => {
  var __extends;
  var __assign;
  var __rest;
  var __decorate;
  var __param;
  var __esDecorate;
  var __runInitializers;
  var __propKey;
  var __setFunctionName;
  var __metadata;
  var __awaiter;
  var __generator;
  var __exportStar;
  var __values;
  var __read;
  var __spread;
  var __spreadArrays;
  var __spreadArray;
  var __await;
  var __asyncGenerator;
  var __asyncDelegator;
  var __asyncValues;
  var __makeTemplateObject;
  var __importStar;
  var __importDefault;
  var __classPrivateFieldGet;
  var __classPrivateFieldSet;
  var __classPrivateFieldIn;
  var __createBinding;
  var __addDisposableResource;
  var __disposeResources;
  var __rewriteRelativeImportExtension;
  (function(factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
      define("tslib", ["exports"], function(exports2) {
        factory(createExporter(root, createExporter(exports2)));
      });
    } else if (typeof module === "object" && typeof exports === "object") {
      factory(createExporter(root, createExporter(exports)));
    } else {
      factory(createExporter(root));
    }
    function createExporter(exports2, previous) {
      if (exports2 !== root) {
        if (typeof Object.create === "function") {
          Object.defineProperty(exports2, "__esModule", { value: true });
        } else {
          exports2.__esModule = true;
        }
      }
      return function(id, v) {
        return exports2[id] = previous ? previous(id, v) : v;
      };
    }
  })(function(exporter) {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
      d.__proto__ = b;
    } || function(d, b) {
      for (var p in b)
        if (Object.prototype.hasOwnProperty.call(b, p))
          d[p] = b[p];
    };
    __extends = function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __);
    };
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length;i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    __rest = function(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s);i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    __decorate = function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1;i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    __param = function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    __esDecorate = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
      function accept(f) {
        if (f !== undefined && typeof f !== "function")
          throw new TypeError("Function expected");
        return f;
      }
      var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
      var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
      var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
      var _, done = false;
      for (var i = decorators.length - 1;i >= 0; i--) {
        var context = {};
        for (var p in contextIn)
          context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access)
          context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
          if (done)
            throw new TypeError("Cannot add initializers after decoration has completed");
          extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
          if (result === undefined)
            continue;
          if (result === null || typeof result !== "object")
            throw new TypeError("Object expected");
          if (_ = accept(result.get))
            descriptor.get = _;
          if (_ = accept(result.set))
            descriptor.set = _;
          if (_ = accept(result.init))
            initializers.unshift(_);
        } else if (_ = accept(result)) {
          if (kind === "field")
            initializers.unshift(_);
          else
            descriptor[key] = _;
        }
      }
      if (target)
        Object.defineProperty(target, contextIn.name, descriptor);
      done = true;
    };
    __runInitializers = function(thisArg, initializers, value) {
      var useValue = arguments.length > 2;
      for (var i = 0;i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
      }
      return useValue ? value : undefined;
    };
    __propKey = function(x) {
      return typeof x === "symbol" ? x : "".concat(x);
    };
    __setFunctionName = function(f, name, prefix) {
      if (typeof name === "symbol")
        name = name.description ? "[".concat(name.description, "]") : "";
      return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
    };
    __metadata = function(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(metadataKey, metadataValue);
    };
    __awaiter = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
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
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    __generator = function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : undefined, done: true };
      }
    };
    __exportStar = function(m, o) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
          __createBinding(o, m, p);
    };
    __createBinding = Object.create ? function(o, m, k, k2) {
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
    };
    __values = function(o) {
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
    };
    __read = function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m)
        return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === undefined || n-- > 0) && !(r = i.next()).done)
          ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"]))
            m.call(i);
        } finally {
          if (e)
            throw e.error;
        }
      }
      return ar;
    };
    __spread = function() {
      for (var ar = [], i = 0;i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
      return ar;
    };
    __spreadArrays = function() {
      for (var s = 0, i = 0, il = arguments.length;i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0;i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length;j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    __spreadArray = function(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar;i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    __await = function(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
    };
    __asyncGenerator = function(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []), i, q = [];
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
              q.push([n, v, a, b]) > 1 || resume(n, v);
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
          settle(q[0][3], e);
        }
      }
      function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
      }
      function fulfill(value) {
        resume("next", value);
      }
      function reject(value) {
        resume("throw", value);
      }
      function settle(f, v) {
        if (f(v), q.shift(), q.length)
          resume(q[0][0], q[0][1]);
      }
    };
    __asyncDelegator = function(o) {
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
    };
    __asyncValues = function(o) {
      if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator], i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
      }, i);
      function verb(n) {
        i[n] = o[n] && function(v) {
          return new Promise(function(resolve, reject) {
            v = o[n](v), settle(resolve, reject, v.done, v.value);
          });
        };
      }
      function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v2) {
          resolve({ value: v2, done: d });
        }, reject);
      }
    };
    __makeTemplateObject = function(cooked, raw) {
      if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
      } else {
        cooked.raw = raw;
      }
      return cooked;
    };
    var __setModuleDefault = Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    };
    var ownKeys = function(o) {
      ownKeys = Object.getOwnPropertyNames || function(o2) {
        var ar = [];
        for (var k in o2)
          if (Object.prototype.hasOwnProperty.call(o2, k))
            ar[ar.length] = k;
        return ar;
      };
      return ownKeys(o);
    };
    __importStar = function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k = ownKeys(mod), i = 0;i < k.length; i++)
          if (k[i] !== "default")
            __createBinding(result, mod, k[i]);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    __importDefault = function(mod) {
      return mod && mod.__esModule ? mod : { default: mod };
    };
    __classPrivateFieldGet = function(receiver, state, kind, f) {
      if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    __classPrivateFieldSet = function(receiver, state, value, kind, f) {
      if (kind === "m")
        throw new TypeError("Private method is not writable");
      if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    __classPrivateFieldIn = function(state, receiver) {
      if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function")
        throw new TypeError("Cannot use 'in' operator on non-object");
      return typeof state === "function" ? receiver === state : state.has(receiver);
    };
    __addDisposableResource = function(env, value, async) {
      if (value !== null && value !== undefined) {
        if (typeof value !== "object" && typeof value !== "function")
          throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
          if (!Symbol.asyncDispose)
            throw new TypeError("Symbol.asyncDispose is not defined.");
          dispose = value[Symbol.asyncDispose];
        }
        if (dispose === undefined) {
          if (!Symbol.dispose)
            throw new TypeError("Symbol.dispose is not defined.");
          dispose = value[Symbol.dispose];
          if (async)
            inner = dispose;
        }
        if (typeof dispose !== "function")
          throw new TypeError("Object not disposable.");
        if (inner)
          dispose = function() {
            try {
              inner.call(this);
            } catch (e) {
              return Promise.reject(e);
            }
          };
        env.stack.push({ value, dispose, async });
      } else if (async) {
        env.stack.push({ async: true });
      }
      return value;
    };
    var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };
    __disposeResources = function(env) {
      function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
      }
      var r, s = 0;
      function next() {
        while (r = env.stack.pop()) {
          try {
            if (!r.async && s === 1)
              return s = 0, env.stack.push(r), Promise.resolve().then(next);
            if (r.dispose) {
              var result = r.dispose.call(r.value);
              if (r.async)
                return s |= 2, Promise.resolve(result).then(next, function(e) {
                  fail(e);
                  return next();
                });
            } else
              s |= 1;
          } catch (e) {
            fail(e);
          }
        }
        if (s === 1)
          return env.hasError ? Promise.reject(env.error) : Promise.resolve();
        if (env.hasError)
          throw env.error;
      }
      return next();
    };
    __rewriteRelativeImportExtension = function(path, preserveJsx) {
      if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
          return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
        });
      }
      return path;
    };
    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__esDecorate", __esDecorate);
    exporter("__runInitializers", __runInitializers);
    exporter("__propKey", __propKey);
    exporter("__setFunctionName", __setFunctionName);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__createBinding", __createBinding);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__spreadArray", __spreadArray);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
    exporter("__classPrivateFieldGet", __classPrivateFieldGet);
    exporter("__classPrivateFieldSet", __classPrivateFieldSet);
    exporter("__classPrivateFieldIn", __classPrivateFieldIn);
    exporter("__addDisposableResource", __addDisposableResource);
    exporter("__disposeResources", __disposeResources);
    exporter("__rewriteRelativeImportExtension", __rewriteRelativeImportExtension);
  });
});

// ../../../../node_modules/@smithy/signature-v4/dist-cjs/index.js
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
    ALGORITHM_IDENTIFIER: () => ALGORITHM_IDENTIFIER,
    ALGORITHM_IDENTIFIER_V4A: () => ALGORITHM_IDENTIFIER_V4A,
    ALGORITHM_QUERY_PARAM: () => ALGORITHM_QUERY_PARAM,
    ALWAYS_UNSIGNABLE_HEADERS: () => ALWAYS_UNSIGNABLE_HEADERS,
    AMZ_DATE_HEADER: () => AMZ_DATE_HEADER,
    AMZ_DATE_QUERY_PARAM: () => AMZ_DATE_QUERY_PARAM,
    AUTH_HEADER: () => AUTH_HEADER,
    CREDENTIAL_QUERY_PARAM: () => CREDENTIAL_QUERY_PARAM,
    DATE_HEADER: () => DATE_HEADER,
    EVENT_ALGORITHM_IDENTIFIER: () => EVENT_ALGORITHM_IDENTIFIER,
    EXPIRES_QUERY_PARAM: () => EXPIRES_QUERY_PARAM,
    GENERATED_HEADERS: () => GENERATED_HEADERS,
    HOST_HEADER: () => HOST_HEADER,
    KEY_TYPE_IDENTIFIER: () => KEY_TYPE_IDENTIFIER,
    MAX_CACHE_SIZE: () => MAX_CACHE_SIZE,
    MAX_PRESIGNED_TTL: () => MAX_PRESIGNED_TTL,
    PROXY_HEADER_PATTERN: () => PROXY_HEADER_PATTERN,
    REGION_SET_PARAM: () => REGION_SET_PARAM,
    SEC_HEADER_PATTERN: () => SEC_HEADER_PATTERN,
    SHA256_HEADER: () => SHA256_HEADER,
    SIGNATURE_HEADER: () => SIGNATURE_HEADER,
    SIGNATURE_QUERY_PARAM: () => SIGNATURE_QUERY_PARAM,
    SIGNED_HEADERS_QUERY_PARAM: () => SIGNED_HEADERS_QUERY_PARAM,
    SignatureV4: () => SignatureV4,
    SignatureV4Base: () => SignatureV4Base,
    TOKEN_HEADER: () => TOKEN_HEADER,
    TOKEN_QUERY_PARAM: () => TOKEN_QUERY_PARAM,
    UNSIGNABLE_PATTERNS: () => UNSIGNABLE_PATTERNS,
    UNSIGNED_PAYLOAD: () => UNSIGNED_PAYLOAD,
    clearCredentialCache: () => clearCredentialCache,
    createScope: () => createScope,
    getCanonicalHeaders: () => getCanonicalHeaders,
    getCanonicalQuery: () => getCanonicalQuery,
    getPayloadHash: () => getPayloadHash,
    getSigningKey: () => getSigningKey,
    hasHeader: () => hasHeader,
    moveHeadersToQuery: () => moveHeadersToQuery,
    prepareRequest: () => prepareRequest,
    signatureV4aContainer: () => signatureV4aContainer
  });
  module.exports = __toCommonJS(src_exports);
  var import_util_utf85 = require_dist_cjs5();
  var ALGORITHM_QUERY_PARAM = "X-Amz-Algorithm";
  var CREDENTIAL_QUERY_PARAM = "X-Amz-Credential";
  var AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
  var SIGNED_HEADERS_QUERY_PARAM = "X-Amz-SignedHeaders";
  var EXPIRES_QUERY_PARAM = "X-Amz-Expires";
  var SIGNATURE_QUERY_PARAM = "X-Amz-Signature";
  var TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
  var REGION_SET_PARAM = "X-Amz-Region-Set";
  var AUTH_HEADER = "authorization";
  var AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
  var DATE_HEADER = "date";
  var GENERATED_HEADERS = [AUTH_HEADER, AMZ_DATE_HEADER, DATE_HEADER];
  var SIGNATURE_HEADER = SIGNATURE_QUERY_PARAM.toLowerCase();
  var SHA256_HEADER = "x-amz-content-sha256";
  var TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
  var HOST_HEADER = "host";
  var ALWAYS_UNSIGNABLE_HEADERS = {
    authorization: true,
    "cache-control": true,
    connection: true,
    expect: true,
    from: true,
    "keep-alive": true,
    "max-forwards": true,
    pragma: true,
    referer: true,
    te: true,
    trailer: true,
    "transfer-encoding": true,
    upgrade: true,
    "user-agent": true,
    "x-amzn-trace-id": true
  };
  var PROXY_HEADER_PATTERN = /^proxy-/;
  var SEC_HEADER_PATTERN = /^sec-/;
  var UNSIGNABLE_PATTERNS = [/^proxy-/i, /^sec-/i];
  var ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
  var ALGORITHM_IDENTIFIER_V4A = "AWS4-ECDSA-P256-SHA256";
  var EVENT_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256-PAYLOAD";
  var UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
  var MAX_CACHE_SIZE = 50;
  var KEY_TYPE_IDENTIFIER = "aws4_request";
  var MAX_PRESIGNED_TTL = 60 * 60 * 24 * 7;
  var import_util_hex_encoding = require_dist_cjs8();
  var import_util_utf8 = require_dist_cjs5();
  var signingKeyCache = {};
  var cacheQueue = [];
  var createScope = /* @__PURE__ */ __name((shortDate, region, service) => `${shortDate}/${region}/${service}/${KEY_TYPE_IDENTIFIER}`, "createScope");
  var getSigningKey = /* @__PURE__ */ __name(async (sha256Constructor, credentials, shortDate, region, service) => {
    const credsHash = await hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId);
    const cacheKey = `${shortDate}:${region}:${service}:${(0, import_util_hex_encoding.toHex)(credsHash)}:${credentials.sessionToken}`;
    if (cacheKey in signingKeyCache) {
      return signingKeyCache[cacheKey];
    }
    cacheQueue.push(cacheKey);
    while (cacheQueue.length > MAX_CACHE_SIZE) {
      delete signingKeyCache[cacheQueue.shift()];
    }
    let key = `AWS4${credentials.secretAccessKey}`;
    for (const signable of [shortDate, region, service, KEY_TYPE_IDENTIFIER]) {
      key = await hmac(sha256Constructor, key, signable);
    }
    return signingKeyCache[cacheKey] = key;
  }, "getSigningKey");
  var clearCredentialCache = /* @__PURE__ */ __name(() => {
    cacheQueue.length = 0;
    Object.keys(signingKeyCache).forEach((cacheKey) => {
      delete signingKeyCache[cacheKey];
    });
  }, "clearCredentialCache");
  var hmac = /* @__PURE__ */ __name((ctor, secret, data) => {
    const hash = new ctor(secret);
    hash.update((0, import_util_utf8.toUint8Array)(data));
    return hash.digest();
  }, "hmac");
  var getCanonicalHeaders = /* @__PURE__ */ __name(({ headers }, unsignableHeaders, signableHeaders) => {
    const canonical = {};
    for (const headerName of Object.keys(headers).sort()) {
      if (headers[headerName] == undefined) {
        continue;
      }
      const canonicalHeaderName = headerName.toLowerCase();
      if (canonicalHeaderName in ALWAYS_UNSIGNABLE_HEADERS || unsignableHeaders?.has(canonicalHeaderName) || PROXY_HEADER_PATTERN.test(canonicalHeaderName) || SEC_HEADER_PATTERN.test(canonicalHeaderName)) {
        if (!signableHeaders || signableHeaders && !signableHeaders.has(canonicalHeaderName)) {
          continue;
        }
      }
      canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
    }
    return canonical;
  }, "getCanonicalHeaders");
  var import_is_array_buffer = require_dist_cjs4();
  var import_util_utf82 = require_dist_cjs5();
  var getPayloadHash = /* @__PURE__ */ __name(async ({ headers, body }, hashConstructor) => {
    for (const headerName of Object.keys(headers)) {
      if (headerName.toLowerCase() === SHA256_HEADER) {
        return headers[headerName];
      }
    }
    if (body == undefined) {
      return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
    } else if (typeof body === "string" || ArrayBuffer.isView(body) || (0, import_is_array_buffer.isArrayBuffer)(body)) {
      const hashCtor = new hashConstructor;
      hashCtor.update((0, import_util_utf82.toUint8Array)(body));
      return (0, import_util_hex_encoding.toHex)(await hashCtor.digest());
    }
    return UNSIGNED_PAYLOAD;
  }, "getPayloadHash");
  var import_util_utf83 = require_dist_cjs5();
  var HeaderFormatter = class {
    static {
      __name(this, "HeaderFormatter");
    }
    format(headers) {
      const chunks = [];
      for (const headerName of Object.keys(headers)) {
        const bytes = (0, import_util_utf83.fromUtf8)(headerName);
        chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
      }
      const out = new Uint8Array(chunks.reduce((carry, bytes) => carry + bytes.byteLength, 0));
      let position = 0;
      for (const chunk of chunks) {
        out.set(chunk, position);
        position += chunk.byteLength;
      }
      return out;
    }
    formatHeaderValue(header) {
      switch (header.type) {
        case "boolean":
          return Uint8Array.from([header.value ? 0 : 1]);
        case "byte":
          return Uint8Array.from([2, header.value]);
        case "short":
          const shortView = new DataView(new ArrayBuffer(3));
          shortView.setUint8(0, 3);
          shortView.setInt16(1, header.value, false);
          return new Uint8Array(shortView.buffer);
        case "integer":
          const intView = new DataView(new ArrayBuffer(5));
          intView.setUint8(0, 4);
          intView.setInt32(1, header.value, false);
          return new Uint8Array(intView.buffer);
        case "long":
          const longBytes = new Uint8Array(9);
          longBytes[0] = 5;
          longBytes.set(header.value.bytes, 1);
          return longBytes;
        case "binary":
          const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
          binView.setUint8(0, 6);
          binView.setUint16(1, header.value.byteLength, false);
          const binBytes = new Uint8Array(binView.buffer);
          binBytes.set(header.value, 3);
          return binBytes;
        case "string":
          const utf8Bytes = (0, import_util_utf83.fromUtf8)(header.value);
          const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
          strView.setUint8(0, 7);
          strView.setUint16(1, utf8Bytes.byteLength, false);
          const strBytes = new Uint8Array(strView.buffer);
          strBytes.set(utf8Bytes, 3);
          return strBytes;
        case "timestamp":
          const tsBytes = new Uint8Array(9);
          tsBytes[0] = 8;
          tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
          return tsBytes;
        case "uuid":
          if (!UUID_PATTERN.test(header.value)) {
            throw new Error(`Invalid UUID received: ${header.value}`);
          }
          const uuidBytes = new Uint8Array(17);
          uuidBytes[0] = 9;
          uuidBytes.set((0, import_util_hex_encoding.fromHex)(header.value.replace(/\-/g, "")), 1);
          return uuidBytes;
      }
    }
  };
  var UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
  var Int64 = class _Int64 {
    constructor(bytes) {
      this.bytes = bytes;
      if (bytes.byteLength !== 8) {
        throw new Error("Int64 buffers must be exactly 8 bytes");
      }
    }
    static {
      __name(this, "Int64");
    }
    static fromNumber(number) {
      if (number > 9223372036854776000 || number < -9223372036854776000) {
        throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
      }
      const bytes = new Uint8Array(8);
      for (let i = 7, remaining = Math.abs(Math.round(number));i > -1 && remaining > 0; i--, remaining /= 256) {
        bytes[i] = remaining;
      }
      if (number < 0) {
        negate(bytes);
      }
      return new _Int64(bytes);
    }
    valueOf() {
      const bytes = this.bytes.slice(0);
      const negative = bytes[0] & 128;
      if (negative) {
        negate(bytes);
      }
      return parseInt((0, import_util_hex_encoding.toHex)(bytes), 16) * (negative ? -1 : 1);
    }
    toString() {
      return String(this.valueOf());
    }
  };
  function negate(bytes) {
    for (let i = 0;i < 8; i++) {
      bytes[i] ^= 255;
    }
    for (let i = 7;i > -1; i--) {
      bytes[i]++;
      if (bytes[i] !== 0)
        break;
    }
  }
  __name(negate, "negate");
  var hasHeader = /* @__PURE__ */ __name((soughtHeader, headers) => {
    soughtHeader = soughtHeader.toLowerCase();
    for (const headerName of Object.keys(headers)) {
      if (soughtHeader === headerName.toLowerCase()) {
        return true;
      }
    }
    return false;
  }, "hasHeader");
  var import_protocol_http = require_dist_cjs3();
  var moveHeadersToQuery = /* @__PURE__ */ __name((request, options = {}) => {
    const { headers, query = {} } = import_protocol_http.HttpRequest.clone(request);
    for (const name of Object.keys(headers)) {
      const lname = name.toLowerCase();
      if (lname.slice(0, 6) === "x-amz-" && !options.unhoistableHeaders?.has(lname) || options.hoistableHeaders?.has(lname)) {
        query[name] = headers[name];
        delete headers[name];
      }
    }
    return {
      ...request,
      headers,
      query
    };
  }, "moveHeadersToQuery");
  var prepareRequest = /* @__PURE__ */ __name((request) => {
    request = import_protocol_http.HttpRequest.clone(request);
    for (const headerName of Object.keys(request.headers)) {
      if (GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) {
        delete request.headers[headerName];
      }
    }
    return request;
  }, "prepareRequest");
  var import_util_middleware = require_dist_cjs2();
  var import_util_utf84 = require_dist_cjs5();
  var import_util_uri_escape = require_dist_cjs7();
  var getCanonicalQuery = /* @__PURE__ */ __name(({ query = {} }) => {
    const keys = [];
    const serialized = {};
    for (const key of Object.keys(query)) {
      if (key.toLowerCase() === SIGNATURE_HEADER) {
        continue;
      }
      const encodedKey = (0, import_util_uri_escape.escapeUri)(key);
      keys.push(encodedKey);
      const value = query[key];
      if (typeof value === "string") {
        serialized[encodedKey] = `${encodedKey}=${(0, import_util_uri_escape.escapeUri)(value)}`;
      } else if (Array.isArray(value)) {
        serialized[encodedKey] = value.slice(0).reduce((encoded, value2) => encoded.concat([`${encodedKey}=${(0, import_util_uri_escape.escapeUri)(value2)}`]), []).sort().join("&");
      }
    }
    return keys.sort().map((key) => serialized[key]).filter((serialized2) => serialized2).join("&");
  }, "getCanonicalQuery");
  var iso8601 = /* @__PURE__ */ __name((time) => toDate(time).toISOString().replace(/\.\d{3}Z$/, "Z"), "iso8601");
  var toDate = /* @__PURE__ */ __name((time) => {
    if (typeof time === "number") {
      return new Date(time * 1000);
    }
    if (typeof time === "string") {
      if (Number(time)) {
        return new Date(Number(time) * 1000);
      }
      return new Date(time);
    }
    return time;
  }, "toDate");
  var SignatureV4Base = class {
    static {
      __name(this, "SignatureV4Base");
    }
    constructor({
      applyChecksum,
      credentials,
      region,
      service,
      sha256,
      uriEscapePath = true
    }) {
      this.service = service;
      this.sha256 = sha256;
      this.uriEscapePath = uriEscapePath;
      this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
      this.regionProvider = (0, import_util_middleware.normalizeProvider)(region);
      this.credentialProvider = (0, import_util_middleware.normalizeProvider)(credentials);
    }
    createCanonicalRequest(request, canonicalHeaders, payloadHash) {
      const sortedHeaders = Object.keys(canonicalHeaders).sort();
      return `${request.method}
${this.getCanonicalPath(request)}
${getCanonicalQuery(request)}
${sortedHeaders.map((name) => `${name}:${canonicalHeaders[name]}`).join(`
`)}

${sortedHeaders.join(";")}
${payloadHash}`;
    }
    async createStringToSign(longDate, credentialScope, canonicalRequest, algorithmIdentifier) {
      const hash = new this.sha256;
      hash.update((0, import_util_utf84.toUint8Array)(canonicalRequest));
      const hashedRequest = await hash.digest();
      return `${algorithmIdentifier}
${longDate}
${credentialScope}
${(0, import_util_hex_encoding.toHex)(hashedRequest)}`;
    }
    getCanonicalPath({ path }) {
      if (this.uriEscapePath) {
        const normalizedPathSegments = [];
        for (const pathSegment of path.split("/")) {
          if (pathSegment?.length === 0)
            continue;
          if (pathSegment === ".")
            continue;
          if (pathSegment === "..") {
            normalizedPathSegments.pop();
          } else {
            normalizedPathSegments.push(pathSegment);
          }
        }
        const normalizedPath = `${path?.startsWith("/") ? "/" : ""}${normalizedPathSegments.join("/")}${normalizedPathSegments.length > 0 && path?.endsWith("/") ? "/" : ""}`;
        const doubleEncoded = (0, import_util_uri_escape.escapeUri)(normalizedPath);
        return doubleEncoded.replace(/%2F/g, "/");
      }
      return path;
    }
    validateResolvedCredentials(credentials) {
      if (typeof credentials !== "object" || typeof credentials.accessKeyId !== "string" || typeof credentials.secretAccessKey !== "string") {
        throw new Error("Resolved credential object is not valid");
      }
    }
    formatDate(now) {
      const longDate = iso8601(now).replace(/[\-:]/g, "");
      return {
        longDate,
        shortDate: longDate.slice(0, 8)
      };
    }
    getCanonicalHeaderList(headers) {
      return Object.keys(headers).sort().join(";");
    }
  };
  var SignatureV4 = class extends SignatureV4Base {
    constructor({
      applyChecksum,
      credentials,
      region,
      service,
      sha256,
      uriEscapePath = true
    }) {
      super({
        applyChecksum,
        credentials,
        region,
        service,
        sha256,
        uriEscapePath
      });
      this.headerFormatter = new HeaderFormatter;
    }
    static {
      __name(this, "SignatureV4");
    }
    async presign(originalRequest, options = {}) {
      const {
        signingDate = /* @__PURE__ */ new Date,
        expiresIn = 3600,
        unsignableHeaders,
        unhoistableHeaders,
        signableHeaders,
        hoistableHeaders,
        signingRegion,
        signingService
      } = options;
      const credentials = await this.credentialProvider();
      this.validateResolvedCredentials(credentials);
      const region = signingRegion ?? await this.regionProvider();
      const { longDate, shortDate } = this.formatDate(signingDate);
      if (expiresIn > MAX_PRESIGNED_TTL) {
        return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
      }
      const scope = createScope(shortDate, region, signingService ?? this.service);
      const request = moveHeadersToQuery(prepareRequest(originalRequest), { unhoistableHeaders, hoistableHeaders });
      if (credentials.sessionToken) {
        request.query[TOKEN_QUERY_PARAM] = credentials.sessionToken;
      }
      request.query[ALGORITHM_QUERY_PARAM] = ALGORITHM_IDENTIFIER;
      request.query[CREDENTIAL_QUERY_PARAM] = `${credentials.accessKeyId}/${scope}`;
      request.query[AMZ_DATE_QUERY_PARAM] = longDate;
      request.query[EXPIRES_QUERY_PARAM] = expiresIn.toString(10);
      const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
      request.query[SIGNED_HEADERS_QUERY_PARAM] = this.getCanonicalHeaderList(canonicalHeaders);
      request.query[SIGNATURE_QUERY_PARAM] = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, await getPayloadHash(originalRequest, this.sha256)));
      return request;
    }
    async sign(toSign, options) {
      if (typeof toSign === "string") {
        return this.signString(toSign, options);
      } else if (toSign.headers && toSign.payload) {
        return this.signEvent(toSign, options);
      } else if (toSign.message) {
        return this.signMessage(toSign, options);
      } else {
        return this.signRequest(toSign, options);
      }
    }
    async signEvent({ headers, payload }, { signingDate = /* @__PURE__ */ new Date, priorSignature, signingRegion, signingService }) {
      const region = signingRegion ?? await this.regionProvider();
      const { shortDate, longDate } = this.formatDate(signingDate);
      const scope = createScope(shortDate, region, signingService ?? this.service);
      const hashedPayload = await getPayloadHash({ headers: {}, body: payload }, this.sha256);
      const hash = new this.sha256;
      hash.update(headers);
      const hashedHeaders = (0, import_util_hex_encoding.toHex)(await hash.digest());
      const stringToSign = [
        EVENT_ALGORITHM_IDENTIFIER,
        longDate,
        scope,
        priorSignature,
        hashedHeaders,
        hashedPayload
      ].join(`
`);
      return this.signString(stringToSign, { signingDate, signingRegion: region, signingService });
    }
    async signMessage(signableMessage, { signingDate = /* @__PURE__ */ new Date, signingRegion, signingService }) {
      const promise = this.signEvent({
        headers: this.headerFormatter.format(signableMessage.message.headers),
        payload: signableMessage.message.body
      }, {
        signingDate,
        signingRegion,
        signingService,
        priorSignature: signableMessage.priorSignature
      });
      return promise.then((signature) => {
        return { message: signableMessage.message, signature };
      });
    }
    async signString(stringToSign, { signingDate = /* @__PURE__ */ new Date, signingRegion, signingService } = {}) {
      const credentials = await this.credentialProvider();
      this.validateResolvedCredentials(credentials);
      const region = signingRegion ?? await this.regionProvider();
      const { shortDate } = this.formatDate(signingDate);
      const hash = new this.sha256(await this.getSigningKey(credentials, region, shortDate, signingService));
      hash.update((0, import_util_utf85.toUint8Array)(stringToSign));
      return (0, import_util_hex_encoding.toHex)(await hash.digest());
    }
    async signRequest(requestToSign, {
      signingDate = /* @__PURE__ */ new Date,
      signableHeaders,
      unsignableHeaders,
      signingRegion,
      signingService
    } = {}) {
      const credentials = await this.credentialProvider();
      this.validateResolvedCredentials(credentials);
      const region = signingRegion ?? await this.regionProvider();
      const request = prepareRequest(requestToSign);
      const { longDate, shortDate } = this.formatDate(signingDate);
      const scope = createScope(shortDate, region, signingService ?? this.service);
      request.headers[AMZ_DATE_HEADER] = longDate;
      if (credentials.sessionToken) {
        request.headers[TOKEN_HEADER] = credentials.sessionToken;
      }
      const payloadHash = await getPayloadHash(request, this.sha256);
      if (!hasHeader(SHA256_HEADER, request.headers) && this.applyChecksum) {
        request.headers[SHA256_HEADER] = payloadHash;
      }
      const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
      const signature = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, payloadHash));
      request.headers[AUTH_HEADER] = `${ALGORITHM_IDENTIFIER} Credential=${credentials.accessKeyId}/${scope}, SignedHeaders=${this.getCanonicalHeaderList(canonicalHeaders)}, Signature=${signature}`;
      return request;
    }
    async getSignature(longDate, credentialScope, keyPromise, canonicalRequest) {
      const stringToSign = await this.createStringToSign(longDate, credentialScope, canonicalRequest, ALGORITHM_IDENTIFIER);
      const hash = new this.sha256(await keyPromise);
      hash.update((0, import_util_utf85.toUint8Array)(stringToSign));
      return (0, import_util_hex_encoding.toHex)(await hash.digest());
    }
    getSigningKey(credentials, region, shortDate, service) {
      return getSigningKey(this.sha256, credentials, shortDate, region, service || this.service);
    }
  };
  var signatureV4aContainer = {
    SignatureV4a: null
  };
});

// ../../../../node_modules/@aws-sdk/core/dist-cjs/submodules/httpAuthSchemes/index.js
var require_httpAuthSchemes = __commonJS((exports, module) => {
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
    AWSSDKSigV4Signer: () => AWSSDKSigV4Signer,
    AwsSdkSigV4ASigner: () => AwsSdkSigV4ASigner,
    AwsSdkSigV4Signer: () => AwsSdkSigV4Signer,
    NODE_AUTH_SCHEME_PREFERENCE_OPTIONS: () => NODE_AUTH_SCHEME_PREFERENCE_OPTIONS,
    NODE_SIGV4A_CONFIG_OPTIONS: () => NODE_SIGV4A_CONFIG_OPTIONS,
    getBearerTokenEnvKey: () => getBearerTokenEnvKey,
    resolveAWSSDKSigV4Config: () => resolveAWSSDKSigV4Config,
    resolveAwsSdkSigV4AConfig: () => resolveAwsSdkSigV4AConfig,
    resolveAwsSdkSigV4Config: () => resolveAwsSdkSigV4Config,
    validateSigningProperties: () => validateSigningProperties
  });
  module.exports = __toCommonJS(index_exports);
  var import_protocol_http2 = require_dist_cjs3();
  var import_protocol_http = require_dist_cjs3();
  var getDateHeader = /* @__PURE__ */ __name((response) => import_protocol_http.HttpResponse.isInstance(response) ? response.headers?.date ?? response.headers?.Date : undefined, "getDateHeader");
  var getSkewCorrectedDate = /* @__PURE__ */ __name((systemClockOffset) => new Date(Date.now() + systemClockOffset), "getSkewCorrectedDate");
  var isClockSkewed = /* @__PURE__ */ __name((clockTime, systemClockOffset) => Math.abs(getSkewCorrectedDate(systemClockOffset).getTime() - clockTime) >= 300000, "isClockSkewed");
  var getUpdatedSystemClockOffset = /* @__PURE__ */ __name((clockTime, currentSystemClockOffset) => {
    const clockTimeInMs = Date.parse(clockTime);
    if (isClockSkewed(clockTimeInMs, currentSystemClockOffset)) {
      return clockTimeInMs - Date.now();
    }
    return currentSystemClockOffset;
  }, "getUpdatedSystemClockOffset");
  var throwSigningPropertyError = /* @__PURE__ */ __name((name, property) => {
    if (!property) {
      throw new Error(`Property \`${name}\` is not resolved for AWS SDK SigV4Auth`);
    }
    return property;
  }, "throwSigningPropertyError");
  var validateSigningProperties = /* @__PURE__ */ __name(async (signingProperties) => {
    const context = throwSigningPropertyError("context", signingProperties.context);
    const config = throwSigningPropertyError("config", signingProperties.config);
    const authScheme = context.endpointV2?.properties?.authSchemes?.[0];
    const signerFunction = throwSigningPropertyError("signer", config.signer);
    const signer = await signerFunction(authScheme);
    const signingRegion = signingProperties?.signingRegion;
    const signingRegionSet = signingProperties?.signingRegionSet;
    const signingName = signingProperties?.signingName;
    return {
      config,
      signer,
      signingRegion,
      signingRegionSet,
      signingName
    };
  }, "validateSigningProperties");
  var AwsSdkSigV4Signer = class {
    static {
      __name(this, "AwsSdkSigV4Signer");
    }
    async sign(httpRequest, identity, signingProperties) {
      if (!import_protocol_http2.HttpRequest.isInstance(httpRequest)) {
        throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
      }
      const validatedProps = await validateSigningProperties(signingProperties);
      const { config, signer } = validatedProps;
      let { signingRegion, signingName } = validatedProps;
      const handlerExecutionContext = signingProperties.context;
      if (handlerExecutionContext?.authSchemes?.length ?? 0 > 1) {
        const [first, second] = handlerExecutionContext.authSchemes;
        if (first?.name === "sigv4a" && second?.name === "sigv4") {
          signingRegion = second?.signingRegion ?? signingRegion;
          signingName = second?.signingName ?? signingName;
        }
      }
      const signedRequest = await signer.sign(httpRequest, {
        signingDate: getSkewCorrectedDate(config.systemClockOffset),
        signingRegion,
        signingService: signingName
      });
      return signedRequest;
    }
    errorHandler(signingProperties) {
      return (error) => {
        const serverTime = error.ServerTime ?? getDateHeader(error.$response);
        if (serverTime) {
          const config = throwSigningPropertyError("config", signingProperties.config);
          const initialSystemClockOffset = config.systemClockOffset;
          config.systemClockOffset = getUpdatedSystemClockOffset(serverTime, config.systemClockOffset);
          const clockSkewCorrected = config.systemClockOffset !== initialSystemClockOffset;
          if (clockSkewCorrected && error.$metadata) {
            error.$metadata.clockSkewCorrected = true;
          }
        }
        throw error;
      };
    }
    successHandler(httpResponse, signingProperties) {
      const dateHeader = getDateHeader(httpResponse);
      if (dateHeader) {
        const config = throwSigningPropertyError("config", signingProperties.config);
        config.systemClockOffset = getUpdatedSystemClockOffset(dateHeader, config.systemClockOffset);
      }
    }
  };
  var AWSSDKSigV4Signer = AwsSdkSigV4Signer;
  var import_protocol_http3 = require_dist_cjs3();
  var AwsSdkSigV4ASigner = class extends AwsSdkSigV4Signer {
    static {
      __name(this, "AwsSdkSigV4ASigner");
    }
    async sign(httpRequest, identity, signingProperties) {
      if (!import_protocol_http3.HttpRequest.isInstance(httpRequest)) {
        throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
      }
      const { config, signer, signingRegion, signingRegionSet, signingName } = await validateSigningProperties(signingProperties);
      const configResolvedSigningRegionSet = await config.sigv4aSigningRegionSet?.();
      const multiRegionOverride = (configResolvedSigningRegionSet ?? signingRegionSet ?? [signingRegion]).join(",");
      const signedRequest = await signer.sign(httpRequest, {
        signingDate: getSkewCorrectedDate(config.systemClockOffset),
        signingRegion: multiRegionOverride,
        signingService: signingName
      });
      return signedRequest;
    }
  };
  var getArrayForCommaSeparatedString = /* @__PURE__ */ __name((str) => typeof str === "string" && str.length > 0 ? str.split(",").map((item) => item.trim()) : [], "getArrayForCommaSeparatedString");
  var getBearerTokenEnvKey = /* @__PURE__ */ __name((signingName) => `AWS_BEARER_TOKEN_${signingName.replace(/[\s-]/g, "_").toUpperCase()}`, "getBearerTokenEnvKey");
  var NODE_AUTH_SCHEME_PREFERENCE_ENV_KEY = "AWS_AUTH_SCHEME_PREFERENCE";
  var NODE_AUTH_SCHEME_PREFERENCE_CONFIG_KEY = "auth_scheme_preference";
  var NODE_AUTH_SCHEME_PREFERENCE_OPTIONS = {
    environmentVariableSelector: /* @__PURE__ */ __name((env, options) => {
      if (options?.signingName) {
        const bearerTokenKey = getBearerTokenEnvKey(options.signingName);
        if (bearerTokenKey in env)
          return ["httpBearerAuth"];
      }
      if (!(NODE_AUTH_SCHEME_PREFERENCE_ENV_KEY in env))
        return;
      return getArrayForCommaSeparatedString(env[NODE_AUTH_SCHEME_PREFERENCE_ENV_KEY]);
    }, "environmentVariableSelector"),
    configFileSelector: /* @__PURE__ */ __name((profile) => {
      if (!(NODE_AUTH_SCHEME_PREFERENCE_CONFIG_KEY in profile))
        return;
      return getArrayForCommaSeparatedString(profile[NODE_AUTH_SCHEME_PREFERENCE_CONFIG_KEY]);
    }, "configFileSelector"),
    default: []
  };
  var import_core = require_dist_cjs11();
  var import_property_provider = require_dist_cjs9();
  var resolveAwsSdkSigV4AConfig = /* @__PURE__ */ __name((config) => {
    config.sigv4aSigningRegionSet = (0, import_core.normalizeProvider)(config.sigv4aSigningRegionSet);
    return config;
  }, "resolveAwsSdkSigV4AConfig");
  var NODE_SIGV4A_CONFIG_OPTIONS = {
    environmentVariableSelector(env) {
      if (env.AWS_SIGV4A_SIGNING_REGION_SET) {
        return env.AWS_SIGV4A_SIGNING_REGION_SET.split(",").map((_) => _.trim());
      }
      throw new import_property_provider.ProviderError("AWS_SIGV4A_SIGNING_REGION_SET not set in env.", {
        tryNextLink: true
      });
    },
    configFileSelector(profile) {
      if (profile.sigv4a_signing_region_set) {
        return (profile.sigv4a_signing_region_set ?? "").split(",").map((_) => _.trim());
      }
      throw new import_property_provider.ProviderError("sigv4a_signing_region_set not set in profile.", {
        tryNextLink: true
      });
    },
    default: undefined
  };
  var import_client = require_client();
  var import_core2 = require_dist_cjs11();
  var import_signature_v4 = require_dist_cjs14();
  var resolveAwsSdkSigV4Config = /* @__PURE__ */ __name((config) => {
    let inputCredentials = config.credentials;
    let isUserSupplied = !!config.credentials;
    let resolvedCredentials = undefined;
    Object.defineProperty(config, "credentials", {
      set(credentials) {
        if (credentials && credentials !== inputCredentials && credentials !== resolvedCredentials) {
          isUserSupplied = true;
        }
        inputCredentials = credentials;
        const memoizedProvider = normalizeCredentialProvider(config, {
          credentials: inputCredentials,
          credentialDefaultProvider: config.credentialDefaultProvider
        });
        const boundProvider = bindCallerConfig(config, memoizedProvider);
        if (isUserSupplied && !boundProvider.attributed) {
          resolvedCredentials = /* @__PURE__ */ __name(async (options) => boundProvider(options).then((creds) => (0, import_client.setCredentialFeature)(creds, "CREDENTIALS_CODE", "e")), "resolvedCredentials");
          resolvedCredentials.memoized = boundProvider.memoized;
          resolvedCredentials.configBound = boundProvider.configBound;
          resolvedCredentials.attributed = true;
        } else {
          resolvedCredentials = boundProvider;
        }
      },
      get() {
        return resolvedCredentials;
      },
      enumerable: true,
      configurable: true
    });
    config.credentials = inputCredentials;
    const {
      signingEscapePath = true,
      systemClockOffset = config.systemClockOffset || 0,
      sha256
    } = config;
    let signer;
    if (config.signer) {
      signer = (0, import_core2.normalizeProvider)(config.signer);
    } else if (config.regionInfoProvider) {
      signer = /* @__PURE__ */ __name(() => (0, import_core2.normalizeProvider)(config.region)().then(async (region) => [
        await config.regionInfoProvider(region, {
          useFipsEndpoint: await config.useFipsEndpoint(),
          useDualstackEndpoint: await config.useDualstackEndpoint()
        }) || {},
        region
      ]).then(([regionInfo, region]) => {
        const { signingRegion, signingService } = regionInfo;
        config.signingRegion = config.signingRegion || signingRegion || region;
        config.signingName = config.signingName || signingService || config.serviceId;
        const params = {
          ...config,
          credentials: config.credentials,
          region: config.signingRegion,
          service: config.signingName,
          sha256,
          uriEscapePath: signingEscapePath
        };
        const SignerCtor = config.signerConstructor || import_signature_v4.SignatureV4;
        return new SignerCtor(params);
      }), "signer");
    } else {
      signer = /* @__PURE__ */ __name(async (authScheme) => {
        authScheme = Object.assign({}, {
          name: "sigv4",
          signingName: config.signingName || config.defaultSigningName,
          signingRegion: await (0, import_core2.normalizeProvider)(config.region)(),
          properties: {}
        }, authScheme);
        const signingRegion = authScheme.signingRegion;
        const signingService = authScheme.signingName;
        config.signingRegion = config.signingRegion || signingRegion;
        config.signingName = config.signingName || signingService || config.serviceId;
        const params = {
          ...config,
          credentials: config.credentials,
          region: config.signingRegion,
          service: config.signingName,
          sha256,
          uriEscapePath: signingEscapePath
        };
        const SignerCtor = config.signerConstructor || import_signature_v4.SignatureV4;
        return new SignerCtor(params);
      }, "signer");
    }
    const resolvedConfig = Object.assign(config, {
      systemClockOffset,
      signingEscapePath,
      signer
    });
    return resolvedConfig;
  }, "resolveAwsSdkSigV4Config");
  var resolveAWSSDKSigV4Config = resolveAwsSdkSigV4Config;
  function normalizeCredentialProvider(config, {
    credentials,
    credentialDefaultProvider
  }) {
    let credentialsProvider;
    if (credentials) {
      if (!credentials?.memoized) {
        credentialsProvider = (0, import_core2.memoizeIdentityProvider)(credentials, import_core2.isIdentityExpired, import_core2.doesIdentityRequireRefresh);
      } else {
        credentialsProvider = credentials;
      }
    } else {
      if (credentialDefaultProvider) {
        credentialsProvider = (0, import_core2.normalizeProvider)(credentialDefaultProvider(Object.assign({}, config, {
          parentClientConfig: config
        })));
      } else {
        credentialsProvider = /* @__PURE__ */ __name(async () => {
          throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.");
        }, "credentialsProvider");
      }
    }
    credentialsProvider.memoized = true;
    return credentialsProvider;
  }
  __name(normalizeCredentialProvider, "normalizeCredentialProvider");
  function bindCallerConfig(config, credentialsProvider) {
    if (credentialsProvider.configBound) {
      return credentialsProvider;
    }
    const fn = /* @__PURE__ */ __name(async (options) => credentialsProvider({ ...options, callerClientConfig: config }), "fn");
    fn.memoized = credentialsProvider.memoized;
    fn.configBound = true;
    return fn;
  }
  __name(bindCallerConfig, "bindCallerConfig");
});

// ../../../../node_modules/@smithy/util-body-length-browser/dist-cjs/index.js
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
  var src_exports = {};
  __export(src_exports, {
    calculateBodyLength: () => calculateBodyLength
  });
  module.exports = __toCommonJS(src_exports);
  var TEXT_ENCODER = typeof TextEncoder == "function" ? new TextEncoder : null;
  var calculateBodyLength = /* @__PURE__ */ __name((body) => {
    if (typeof body === "string") {
      if (TEXT_ENCODER) {
        return TEXT_ENCODER.encode(body).byteLength;
      }
      let len = body.length;
      for (let i = len - 1;i >= 0; i--) {
        const code = body.charCodeAt(i);
        if (code > 127 && code <= 2047)
          len++;
        else if (code > 2047 && code <= 65535)
          len += 2;
        if (code >= 56320 && code <= 57343)
          i--;
      }
      return len;
    } else if (typeof body.byteLength === "number") {
      return body.byteLength;
    } else if (typeof body.size === "number") {
      return body.size;
    }
    throw new Error(`Body Length computation failed for ${body}`);
  }, "calculateBodyLength");
});

// ../../../../node_modules/fast-xml-parser/src/util.js
var require_util = __commonJS((exports) => {
  var nameStartChar = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
  var nameChar = nameStartChar + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
  var nameRegexp = "[" + nameStartChar + "][" + nameChar + "]*";
  var regexName = new RegExp("^" + nameRegexp + "$");
  var getAllMatches = function(string, regex) {
    const matches = [];
    let match = regex.exec(string);
    while (match) {
      const allmatches = [];
      allmatches.startIndex = regex.lastIndex - match[0].length;
      const len = match.length;
      for (let index = 0;index < len; index++) {
        allmatches.push(match[index]);
      }
      matches.push(allmatches);
      match = regex.exec(string);
    }
    return matches;
  };
  var isName = function(string) {
    const match = regexName.exec(string);
    return !(match === null || typeof match === "undefined");
  };
  exports.isExist = function(v) {
    return typeof v !== "undefined";
  };
  exports.isEmptyObject = function(obj) {
    return Object.keys(obj).length === 0;
  };
  exports.merge = function(target, a, arrayMode) {
    if (a) {
      const keys = Object.keys(a);
      const len = keys.length;
      for (let i = 0;i < len; i++) {
        if (arrayMode === "strict") {
          target[keys[i]] = [a[keys[i]]];
        } else {
          target[keys[i]] = a[keys[i]];
        }
      }
    }
  };
  exports.getValue = function(v) {
    if (exports.isExist(v)) {
      return v;
    } else {
      return "";
    }
  };
  exports.isName = isName;
  exports.getAllMatches = getAllMatches;
  exports.nameRegexp = nameRegexp;
});

// ../../../../node_modules/fast-xml-parser/src/validator.js
var require_validator = __commonJS((exports) => {
  var util = require_util();
  var defaultOptions = {
    allowBooleanAttributes: false,
    unpairedTags: []
  };
  exports.validate = function(xmlData, options) {
    options = Object.assign({}, defaultOptions, options);
    const tags = [];
    let tagFound = false;
    let reachedRoot = false;
    if (xmlData[0] === "\uFEFF") {
      xmlData = xmlData.substr(1);
    }
    for (let i = 0;i < xmlData.length; i++) {
      if (xmlData[i] === "<" && xmlData[i + 1] === "?") {
        i += 2;
        i = readPI(xmlData, i);
        if (i.err)
          return i;
      } else if (xmlData[i] === "<") {
        let tagStartPos = i;
        i++;
        if (xmlData[i] === "!") {
          i = readCommentAndCDATA(xmlData, i);
          continue;
        } else {
          let closingTag = false;
          if (xmlData[i] === "/") {
            closingTag = true;
            i++;
          }
          let tagName = "";
          for (;i < xmlData.length && xmlData[i] !== ">" && xmlData[i] !== " " && xmlData[i] !== "\t" && xmlData[i] !== `
` && xmlData[i] !== "\r"; i++) {
            tagName += xmlData[i];
          }
          tagName = tagName.trim();
          if (tagName[tagName.length - 1] === "/") {
            tagName = tagName.substring(0, tagName.length - 1);
            i--;
          }
          if (!validateTagName(tagName)) {
            let msg;
            if (tagName.trim().length === 0) {
              msg = "Invalid space after '<'.";
            } else {
              msg = "Tag '" + tagName + "' is an invalid name.";
            }
            return getErrorObject("InvalidTag", msg, getLineNumberForPosition(xmlData, i));
          }
          const result = readAttributeStr(xmlData, i);
          if (result === false) {
            return getErrorObject("InvalidAttr", "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
          }
          let attrStr = result.value;
          i = result.index;
          if (attrStr[attrStr.length - 1] === "/") {
            const attrStrStart = i - attrStr.length;
            attrStr = attrStr.substring(0, attrStr.length - 1);
            const isValid = validateAttributeString(attrStr, options);
            if (isValid === true) {
              tagFound = true;
            } else {
              return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
            }
          } else if (closingTag) {
            if (!result.tagClosed) {
              return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
            } else if (attrStr.trim().length > 0) {
              return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
            } else if (tags.length === 0) {
              return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' has not been opened.", getLineNumberForPosition(xmlData, tagStartPos));
            } else {
              const otg = tags.pop();
              if (tagName !== otg.tagName) {
                let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
                return getErrorObject("InvalidTag", "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.", getLineNumberForPosition(xmlData, tagStartPos));
              }
              if (tags.length == 0) {
                reachedRoot = true;
              }
            }
          } else {
            const isValid = validateAttributeString(attrStr, options);
            if (isValid !== true) {
              return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
            }
            if (reachedRoot === true) {
              return getErrorObject("InvalidXml", "Multiple possible root nodes found.", getLineNumberForPosition(xmlData, i));
            } else if (options.unpairedTags.indexOf(tagName) !== -1) {} else {
              tags.push({ tagName, tagStartPos });
            }
            tagFound = true;
          }
          for (i++;i < xmlData.length; i++) {
            if (xmlData[i] === "<") {
              if (xmlData[i + 1] === "!") {
                i++;
                i = readCommentAndCDATA(xmlData, i);
                continue;
              } else if (xmlData[i + 1] === "?") {
                i = readPI(xmlData, ++i);
                if (i.err)
                  return i;
              } else {
                break;
              }
            } else if (xmlData[i] === "&") {
              const afterAmp = validateAmpersand(xmlData, i);
              if (afterAmp == -1)
                return getErrorObject("InvalidChar", "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
              i = afterAmp;
            } else {
              if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
                return getErrorObject("InvalidXml", "Extra text at the end", getLineNumberForPosition(xmlData, i));
              }
            }
          }
          if (xmlData[i] === "<") {
            i--;
          }
        }
      } else {
        if (isWhiteSpace(xmlData[i])) {
          continue;
        }
        return getErrorObject("InvalidChar", "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
      }
    }
    if (!tagFound) {
      return getErrorObject("InvalidXml", "Start tag expected.", 1);
    } else if (tags.length == 1) {
      return getErrorObject("InvalidTag", "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
    } else if (tags.length > 0) {
      return getErrorObject("InvalidXml", "Invalid '" + JSON.stringify(tags.map((t) => t.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
    }
    return true;
  };
  function isWhiteSpace(char) {
    return char === " " || char === "\t" || char === `
` || char === "\r";
  }
  function readPI(xmlData, i) {
    const start = i;
    for (;i < xmlData.length; i++) {
      if (xmlData[i] == "?" || xmlData[i] == " ") {
        const tagname = xmlData.substr(start, i - start);
        if (i > 5 && tagname === "xml") {
          return getErrorObject("InvalidXml", "XML declaration allowed only at the start of the document.", getLineNumberForPosition(xmlData, i));
        } else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
          i++;
          break;
        } else {
          continue;
        }
      }
    }
    return i;
  }
  function readCommentAndCDATA(xmlData, i) {
    if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {
      for (i += 3;i < xmlData.length; i++) {
        if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
          i += 2;
          break;
        }
      }
    } else if (xmlData.length > i + 8 && xmlData[i + 1] === "D" && xmlData[i + 2] === "O" && xmlData[i + 3] === "C" && xmlData[i + 4] === "T" && xmlData[i + 5] === "Y" && xmlData[i + 6] === "P" && xmlData[i + 7] === "E") {
      let angleBracketsCount = 1;
      for (i += 8;i < xmlData.length; i++) {
        if (xmlData[i] === "<") {
          angleBracketsCount++;
        } else if (xmlData[i] === ">") {
          angleBracketsCount--;
          if (angleBracketsCount === 0) {
            break;
          }
        }
      }
    } else if (xmlData.length > i + 9 && xmlData[i + 1] === "[" && xmlData[i + 2] === "C" && xmlData[i + 3] === "D" && xmlData[i + 4] === "A" && xmlData[i + 5] === "T" && xmlData[i + 6] === "A" && xmlData[i + 7] === "[") {
      for (i += 8;i < xmlData.length; i++) {
        if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
          i += 2;
          break;
        }
      }
    }
    return i;
  }
  var doubleQuote = '"';
  var singleQuote = "'";
  function readAttributeStr(xmlData, i) {
    let attrStr = "";
    let startChar = "";
    let tagClosed = false;
    for (;i < xmlData.length; i++) {
      if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
        if (startChar === "") {
          startChar = xmlData[i];
        } else if (startChar !== xmlData[i]) {} else {
          startChar = "";
        }
      } else if (xmlData[i] === ">") {
        if (startChar === "") {
          tagClosed = true;
          break;
        }
      }
      attrStr += xmlData[i];
    }
    if (startChar !== "") {
      return false;
    }
    return {
      value: attrStr,
      index: i,
      tagClosed
    };
  }
  var validAttrStrRegxp = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
  function validateAttributeString(attrStr, options) {
    const matches = util.getAllMatches(attrStr, validAttrStrRegxp);
    const attrNames = {};
    for (let i = 0;i < matches.length; i++) {
      if (matches[i][1].length === 0) {
        return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
      } else if (matches[i][3] !== undefined && matches[i][4] === undefined) {
        return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' is without value.", getPositionFromMatch(matches[i]));
      } else if (matches[i][3] === undefined && !options.allowBooleanAttributes) {
        return getErrorObject("InvalidAttr", "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
      }
      const attrName = matches[i][2];
      if (!validateAttrName(attrName)) {
        return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
      }
      if (!attrNames.hasOwnProperty(attrName)) {
        attrNames[attrName] = 1;
      } else {
        return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
      }
    }
    return true;
  }
  function validateNumberAmpersand(xmlData, i) {
    let re = /\d/;
    if (xmlData[i] === "x") {
      i++;
      re = /[\da-fA-F]/;
    }
    for (;i < xmlData.length; i++) {
      if (xmlData[i] === ";")
        return i;
      if (!xmlData[i].match(re))
        break;
    }
    return -1;
  }
  function validateAmpersand(xmlData, i) {
    i++;
    if (xmlData[i] === ";")
      return -1;
    if (xmlData[i] === "#") {
      i++;
      return validateNumberAmpersand(xmlData, i);
    }
    let count = 0;
    for (;i < xmlData.length; i++, count++) {
      if (xmlData[i].match(/\w/) && count < 20)
        continue;
      if (xmlData[i] === ";")
        break;
      return -1;
    }
    return i;
  }
  function getErrorObject(code, message, lineNumber) {
    return {
      err: {
        code,
        msg: message,
        line: lineNumber.line || lineNumber,
        col: lineNumber.col
      }
    };
  }
  function validateAttrName(attrName) {
    return util.isName(attrName);
  }
  function validateTagName(tagname) {
    return util.isName(tagname);
  }
  function getLineNumberForPosition(xmlData, index) {
    const lines = xmlData.substring(0, index).split(/\r?\n/);
    return {
      line: lines.length,
      col: lines[lines.length - 1].length + 1
    };
  }
  function getPositionFromMatch(match) {
    return match.startIndex + match[1].length;
  }
});

// ../../../../node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js
var require_OptionsBuilder = __commonJS((exports) => {
  var defaultOptions = {
    preserveOrder: false,
    attributeNamePrefix: "@_",
    attributesGroupName: false,
    textNodeName: "#text",
    ignoreAttributes: true,
    removeNSPrefix: false,
    allowBooleanAttributes: false,
    parseTagValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataPropName: false,
    numberParseOptions: {
      hex: true,
      leadingZeros: true,
      eNotation: true
    },
    tagValueProcessor: function(tagName, val2) {
      return val2;
    },
    attributeValueProcessor: function(attrName, val2) {
      return val2;
    },
    stopNodes: [],
    alwaysCreateTextNode: false,
    isArray: () => false,
    commentPropName: false,
    unpairedTags: [],
    processEntities: true,
    htmlEntities: false,
    ignoreDeclaration: false,
    ignorePiTags: false,
    transformTagName: false,
    transformAttributeName: false,
    updateTag: function(tagName, jPath, attrs) {
      return tagName;
    }
  };
  var buildOptions = function(options) {
    return Object.assign({}, defaultOptions, options);
  };
  exports.buildOptions = buildOptions;
  exports.defaultOptions = defaultOptions;
});

// ../../../../node_modules/fast-xml-parser/src/xmlparser/xmlNode.js
var require_xmlNode = __commonJS((exports, module) => {
  class XmlNode {
    constructor(tagname) {
      this.tagname = tagname;
      this.child = [];
      this[":@"] = {};
    }
    add(key, val2) {
      if (key === "__proto__")
        key = "#__proto__";
      this.child.push({ [key]: val2 });
    }
    addChild(node) {
      if (node.tagname === "__proto__")
        node.tagname = "#__proto__";
      if (node[":@"] && Object.keys(node[":@"]).length > 0) {
        this.child.push({ [node.tagname]: node.child, [":@"]: node[":@"] });
      } else {
        this.child.push({ [node.tagname]: node.child });
      }
    }
  }
  module.exports = XmlNode;
});

// ../../../../node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js
var require_DocTypeReader = __commonJS((exports, module) => {
  var util = require_util();
  function readDocType(xmlData, i) {
    const entities = {};
    if (xmlData[i + 3] === "O" && xmlData[i + 4] === "C" && xmlData[i + 5] === "T" && xmlData[i + 6] === "Y" && xmlData[i + 7] === "P" && xmlData[i + 8] === "E") {
      i = i + 9;
      let angleBracketsCount = 1;
      let hasBody = false, comment = false;
      let exp = "";
      for (;i < xmlData.length; i++) {
        if (xmlData[i] === "<" && !comment) {
          if (hasBody && isEntity(xmlData, i)) {
            i += 7;
            [entityName, val, i] = readEntityExp(xmlData, i + 1);
            if (val.indexOf("&") === -1)
              entities[validateEntityName(entityName)] = {
                regx: RegExp(`&${entityName};`, "g"),
                val
              };
          } else if (hasBody && isElement(xmlData, i))
            i += 8;
          else if (hasBody && isAttlist(xmlData, i))
            i += 8;
          else if (hasBody && isNotation(xmlData, i))
            i += 9;
          else if (isComment)
            comment = true;
          else
            throw new Error("Invalid DOCTYPE");
          angleBracketsCount++;
          exp = "";
        } else if (xmlData[i] === ">") {
          if (comment) {
            if (xmlData[i - 1] === "-" && xmlData[i - 2] === "-") {
              comment = false;
              angleBracketsCount--;
            }
          } else {
            angleBracketsCount--;
          }
          if (angleBracketsCount === 0) {
            break;
          }
        } else if (xmlData[i] === "[") {
          hasBody = true;
        } else {
          exp += xmlData[i];
        }
      }
      if (angleBracketsCount !== 0) {
        throw new Error(`Unclosed DOCTYPE`);
      }
    } else {
      throw new Error(`Invalid Tag instead of DOCTYPE`);
    }
    return { entities, i };
  }
  function readEntityExp(xmlData, i) {
    let entityName2 = "";
    for (;i < xmlData.length && (xmlData[i] !== "'" && xmlData[i] !== '"'); i++) {
      entityName2 += xmlData[i];
    }
    entityName2 = entityName2.trim();
    if (entityName2.indexOf(" ") !== -1)
      throw new Error("External entites are not supported");
    const startChar = xmlData[i++];
    let val2 = "";
    for (;i < xmlData.length && xmlData[i] !== startChar; i++) {
      val2 += xmlData[i];
    }
    return [entityName2, val2, i];
  }
  function isComment(xmlData, i) {
    if (xmlData[i + 1] === "!" && xmlData[i + 2] === "-" && xmlData[i + 3] === "-")
      return true;
    return false;
  }
  function isEntity(xmlData, i) {
    if (xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "N" && xmlData[i + 4] === "T" && xmlData[i + 5] === "I" && xmlData[i + 6] === "T" && xmlData[i + 7] === "Y")
      return true;
    return false;
  }
  function isElement(xmlData, i) {
    if (xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "L" && xmlData[i + 4] === "E" && xmlData[i + 5] === "M" && xmlData[i + 6] === "E" && xmlData[i + 7] === "N" && xmlData[i + 8] === "T")
      return true;
    return false;
  }
  function isAttlist(xmlData, i) {
    if (xmlData[i + 1] === "!" && xmlData[i + 2] === "A" && xmlData[i + 3] === "T" && xmlData[i + 4] === "T" && xmlData[i + 5] === "L" && xmlData[i + 6] === "I" && xmlData[i + 7] === "S" && xmlData[i + 8] === "T")
      return true;
    return false;
  }
  function isNotation(xmlData, i) {
    if (xmlData[i + 1] === "!" && xmlData[i + 2] === "N" && xmlData[i + 3] === "O" && xmlData[i + 4] === "T" && xmlData[i + 5] === "A" && xmlData[i + 6] === "T" && xmlData[i + 7] === "I" && xmlData[i + 8] === "O" && xmlData[i + 9] === "N")
      return true;
    return false;
  }
  function validateEntityName(name) {
    if (util.isName(name))
      return name;
    else
      throw new Error(`Invalid entity name ${name}`);
  }
  module.exports = readDocType;
});

// ../../../../node_modules/strnum/strnum.js
var require_strnum = __commonJS((exports, module) => {
  var hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
  var numRegex = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/;
  var consider = {
    hex: true,
    leadingZeros: true,
    decimalPoint: ".",
    eNotation: true
  };
  function toNumber(str, options = {}) {
    options = Object.assign({}, consider, options);
    if (!str || typeof str !== "string")
      return str;
    let trimmedStr = str.trim();
    if (options.skipLike !== undefined && options.skipLike.test(trimmedStr))
      return str;
    else if (str === "0")
      return 0;
    else if (options.hex && hexRegex.test(trimmedStr)) {
      return parse_int(trimmedStr, 16);
    } else if (trimmedStr.search(/[eE]/) !== -1) {
      const notation = trimmedStr.match(/^([-\+])?(0*)([0-9]*(\.[0-9]*)?[eE][-\+]?[0-9]+)$/);
      if (notation) {
        if (options.leadingZeros) {
          trimmedStr = (notation[1] || "") + notation[3];
        } else {
          if (notation[2] === "0" && notation[3][0] === ".") {} else {
            return str;
          }
        }
        return options.eNotation ? Number(trimmedStr) : str;
      } else {
        return str;
      }
    } else {
      const match = numRegex.exec(trimmedStr);
      if (match) {
        const sign = match[1];
        const leadingZeros = match[2];
        let numTrimmedByZeros = trimZeros(match[3]);
        if (!options.leadingZeros && leadingZeros.length > 0 && sign && trimmedStr[2] !== ".")
          return str;
        else if (!options.leadingZeros && leadingZeros.length > 0 && !sign && trimmedStr[1] !== ".")
          return str;
        else if (options.leadingZeros && leadingZeros === str)
          return 0;
        else {
          const num = Number(trimmedStr);
          const numStr = "" + num;
          if (numStr.search(/[eE]/) !== -1) {
            if (options.eNotation)
              return num;
            else
              return str;
          } else if (trimmedStr.indexOf(".") !== -1) {
            if (numStr === "0" && numTrimmedByZeros === "")
              return num;
            else if (numStr === numTrimmedByZeros)
              return num;
            else if (sign && numStr === "-" + numTrimmedByZeros)
              return num;
            else
              return str;
          }
          if (leadingZeros) {
            return numTrimmedByZeros === numStr || sign + numTrimmedByZeros === numStr ? num : str;
          } else {
            return trimmedStr === numStr || trimmedStr === sign + numStr ? num : str;
          }
        }
      } else {
        return str;
      }
    }
  }
  function trimZeros(numStr) {
    if (numStr && numStr.indexOf(".") !== -1) {
      numStr = numStr.replace(/0+$/, "");
      if (numStr === ".")
        numStr = "0";
      else if (numStr[0] === ".")
        numStr = "0" + numStr;
      else if (numStr[numStr.length - 1] === ".")
        numStr = numStr.substr(0, numStr.length - 1);
      return numStr;
    }
    return numStr;
  }
  function parse_int(numStr, base) {
    if (parseInt)
      return parseInt(numStr, base);
    else if (Number.parseInt)
      return Number.parseInt(numStr, base);
    else if (window && window.parseInt)
      return window.parseInt(numStr, base);
    else
      throw new Error("parseInt, Number.parseInt, window.parseInt are not supported");
  }
  module.exports = toNumber;
});

// ../../../../node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js
var require_OrderedObjParser = __commonJS((exports, module) => {
  var util = require_util();
  var xmlNode = require_xmlNode();
  var readDocType = require_DocTypeReader();
  var toNumber = require_strnum();

  class OrderedObjParser {
    constructor(options) {
      this.options = options;
      this.currentNode = null;
      this.tagsNodeStack = [];
      this.docTypeEntities = {};
      this.lastEntities = {
        apos: { regex: /&(apos|#39|#x27);/g, val: "'" },
        gt: { regex: /&(gt|#62|#x3E);/g, val: ">" },
        lt: { regex: /&(lt|#60|#x3C);/g, val: "<" },
        quot: { regex: /&(quot|#34|#x22);/g, val: '"' }
      };
      this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" };
      this.htmlEntities = {
        space: { regex: /&(nbsp|#160);/g, val: " " },
        cent: { regex: /&(cent|#162);/g, val: "\xA2" },
        pound: { regex: /&(pound|#163);/g, val: "\xA3" },
        yen: { regex: /&(yen|#165);/g, val: "\xA5" },
        euro: { regex: /&(euro|#8364);/g, val: "\u20AC" },
        copyright: { regex: /&(copy|#169);/g, val: "\xA9" },
        reg: { regex: /&(reg|#174);/g, val: "\xAE" },
        inr: { regex: /&(inr|#8377);/g, val: "\u20B9" },
        num_dec: { regex: /&#([0-9]{1,7});/g, val: (_, str) => String.fromCharCode(Number.parseInt(str, 10)) },
        num_hex: { regex: /&#x([0-9a-fA-F]{1,6});/g, val: (_, str) => String.fromCharCode(Number.parseInt(str, 16)) }
      };
      this.addExternalEntities = addExternalEntities;
      this.parseXml = parseXml;
      this.parseTextData = parseTextData;
      this.resolveNameSpace = resolveNameSpace;
      this.buildAttributesMap = buildAttributesMap;
      this.isItStopNode = isItStopNode;
      this.replaceEntitiesValue = replaceEntitiesValue;
      this.readStopNodeData = readStopNodeData;
      this.saveTextToParentTag = saveTextToParentTag;
      this.addChild = addChild;
    }
  }
  function addExternalEntities(externalEntities) {
    const entKeys = Object.keys(externalEntities);
    for (let i = 0;i < entKeys.length; i++) {
      const ent = entKeys[i];
      this.lastEntities[ent] = {
        regex: new RegExp("&" + ent + ";", "g"),
        val: externalEntities[ent]
      };
    }
  }
  function parseTextData(val2, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
    if (val2 !== undefined) {
      if (this.options.trimValues && !dontTrim) {
        val2 = val2.trim();
      }
      if (val2.length > 0) {
        if (!escapeEntities)
          val2 = this.replaceEntitiesValue(val2);
        const newval = this.options.tagValueProcessor(tagName, val2, jPath, hasAttributes, isLeafNode);
        if (newval === null || newval === undefined) {
          return val2;
        } else if (typeof newval !== typeof val2 || newval !== val2) {
          return newval;
        } else if (this.options.trimValues) {
          return parseValue(val2, this.options.parseTagValue, this.options.numberParseOptions);
        } else {
          const trimmedVal = val2.trim();
          if (trimmedVal === val2) {
            return parseValue(val2, this.options.parseTagValue, this.options.numberParseOptions);
          } else {
            return val2;
          }
        }
      }
    }
  }
  function resolveNameSpace(tagname) {
    if (this.options.removeNSPrefix) {
      const tags = tagname.split(":");
      const prefix = tagname.charAt(0) === "/" ? "/" : "";
      if (tags[0] === "xmlns") {
        return "";
      }
      if (tags.length === 2) {
        tagname = prefix + tags[1];
      }
    }
    return tagname;
  }
  var attrsRegx = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
  function buildAttributesMap(attrStr, jPath, tagName) {
    if (!this.options.ignoreAttributes && typeof attrStr === "string") {
      const matches = util.getAllMatches(attrStr, attrsRegx);
      const len = matches.length;
      const attrs = {};
      for (let i = 0;i < len; i++) {
        const attrName = this.resolveNameSpace(matches[i][1]);
        let oldVal = matches[i][4];
        let aName = this.options.attributeNamePrefix + attrName;
        if (attrName.length) {
          if (this.options.transformAttributeName) {
            aName = this.options.transformAttributeName(aName);
          }
          if (aName === "__proto__")
            aName = "#__proto__";
          if (oldVal !== undefined) {
            if (this.options.trimValues) {
              oldVal = oldVal.trim();
            }
            oldVal = this.replaceEntitiesValue(oldVal);
            const newVal = this.options.attributeValueProcessor(attrName, oldVal, jPath);
            if (newVal === null || newVal === undefined) {
              attrs[aName] = oldVal;
            } else if (typeof newVal !== typeof oldVal || newVal !== oldVal) {
              attrs[aName] = newVal;
            } else {
              attrs[aName] = parseValue(oldVal, this.options.parseAttributeValue, this.options.numberParseOptions);
            }
          } else if (this.options.allowBooleanAttributes) {
            attrs[aName] = true;
          }
        }
      }
      if (!Object.keys(attrs).length) {
        return;
      }
      if (this.options.attributesGroupName) {
        const attrCollection = {};
        attrCollection[this.options.attributesGroupName] = attrs;
        return attrCollection;
      }
      return attrs;
    }
  }
  var parseXml = function(xmlData) {
    xmlData = xmlData.replace(/\r\n?/g, `
`);
    const xmlObj = new xmlNode("!xml");
    let currentNode = xmlObj;
    let textData = "";
    let jPath = "";
    for (let i = 0;i < xmlData.length; i++) {
      const ch = xmlData[i];
      if (ch === "<") {
        if (xmlData[i + 1] === "/") {
          const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
          let tagName = xmlData.substring(i + 2, closeIndex).trim();
          if (this.options.removeNSPrefix) {
            const colonIndex = tagName.indexOf(":");
            if (colonIndex !== -1) {
              tagName = tagName.substr(colonIndex + 1);
            }
          }
          if (this.options.transformTagName) {
            tagName = this.options.transformTagName(tagName);
          }
          if (currentNode) {
            textData = this.saveTextToParentTag(textData, currentNode, jPath);
          }
          const lastTagName = jPath.substring(jPath.lastIndexOf(".") + 1);
          if (tagName && this.options.unpairedTags.indexOf(tagName) !== -1) {
            throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
          }
          let propIndex = 0;
          if (lastTagName && this.options.unpairedTags.indexOf(lastTagName) !== -1) {
            propIndex = jPath.lastIndexOf(".", jPath.lastIndexOf(".") - 1);
            this.tagsNodeStack.pop();
          } else {
            propIndex = jPath.lastIndexOf(".");
          }
          jPath = jPath.substring(0, propIndex);
          currentNode = this.tagsNodeStack.pop();
          textData = "";
          i = closeIndex;
        } else if (xmlData[i + 1] === "?") {
          let tagData = readTagExp(xmlData, i, false, "?>");
          if (!tagData)
            throw new Error("Pi Tag is not closed.");
          textData = this.saveTextToParentTag(textData, currentNode, jPath);
          if (this.options.ignoreDeclaration && tagData.tagName === "?xml" || this.options.ignorePiTags) {} else {
            const childNode = new xmlNode(tagData.tagName);
            childNode.add(this.options.textNodeName, "");
            if (tagData.tagName !== tagData.tagExp && tagData.attrExpPresent) {
              childNode[":@"] = this.buildAttributesMap(tagData.tagExp, jPath, tagData.tagName);
            }
            this.addChild(currentNode, childNode, jPath);
          }
          i = tagData.closeIndex + 1;
        } else if (xmlData.substr(i + 1, 3) === "!--") {
          const endIndex = findClosingIndex(xmlData, "-->", i + 4, "Comment is not closed.");
          if (this.options.commentPropName) {
            const comment = xmlData.substring(i + 4, endIndex - 2);
            textData = this.saveTextToParentTag(textData, currentNode, jPath);
            currentNode.add(this.options.commentPropName, [{ [this.options.textNodeName]: comment }]);
          }
          i = endIndex;
        } else if (xmlData.substr(i + 1, 2) === "!D") {
          const result = readDocType(xmlData, i);
          this.docTypeEntities = result.entities;
          i = result.i;
        } else if (xmlData.substr(i + 1, 2) === "![") {
          const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
          const tagExp = xmlData.substring(i + 9, closeIndex);
          textData = this.saveTextToParentTag(textData, currentNode, jPath);
          let val2 = this.parseTextData(tagExp, currentNode.tagname, jPath, true, false, true, true);
          if (val2 == undefined)
            val2 = "";
          if (this.options.cdataPropName) {
            currentNode.add(this.options.cdataPropName, [{ [this.options.textNodeName]: tagExp }]);
          } else {
            currentNode.add(this.options.textNodeName, val2);
          }
          i = closeIndex + 2;
        } else {
          let result = readTagExp(xmlData, i, this.options.removeNSPrefix);
          let tagName = result.tagName;
          const rawTagName = result.rawTagName;
          let tagExp = result.tagExp;
          let attrExpPresent = result.attrExpPresent;
          let closeIndex = result.closeIndex;
          if (this.options.transformTagName) {
            tagName = this.options.transformTagName(tagName);
          }
          if (currentNode && textData) {
            if (currentNode.tagname !== "!xml") {
              textData = this.saveTextToParentTag(textData, currentNode, jPath, false);
            }
          }
          const lastTag = currentNode;
          if (lastTag && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1) {
            currentNode = this.tagsNodeStack.pop();
            jPath = jPath.substring(0, jPath.lastIndexOf("."));
          }
          if (tagName !== xmlObj.tagname) {
            jPath += jPath ? "." + tagName : tagName;
          }
          if (this.isItStopNode(this.options.stopNodes, jPath, tagName)) {
            let tagContent = "";
            if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
              if (tagName[tagName.length - 1] === "/") {
                tagName = tagName.substr(0, tagName.length - 1);
                jPath = jPath.substr(0, jPath.length - 1);
                tagExp = tagName;
              } else {
                tagExp = tagExp.substr(0, tagExp.length - 1);
              }
              i = result.closeIndex;
            } else if (this.options.unpairedTags.indexOf(tagName) !== -1) {
              i = result.closeIndex;
            } else {
              const result2 = this.readStopNodeData(xmlData, rawTagName, closeIndex + 1);
              if (!result2)
                throw new Error(`Unexpected end of ${rawTagName}`);
              i = result2.i;
              tagContent = result2.tagContent;
            }
            const childNode = new xmlNode(tagName);
            if (tagName !== tagExp && attrExpPresent) {
              childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
            }
            if (tagContent) {
              tagContent = this.parseTextData(tagContent, tagName, jPath, true, attrExpPresent, true, true);
            }
            jPath = jPath.substr(0, jPath.lastIndexOf("."));
            childNode.add(this.options.textNodeName, tagContent);
            this.addChild(currentNode, childNode, jPath);
          } else {
            if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
              if (tagName[tagName.length - 1] === "/") {
                tagName = tagName.substr(0, tagName.length - 1);
                jPath = jPath.substr(0, jPath.length - 1);
                tagExp = tagName;
              } else {
                tagExp = tagExp.substr(0, tagExp.length - 1);
              }
              if (this.options.transformTagName) {
                tagName = this.options.transformTagName(tagName);
              }
              const childNode = new xmlNode(tagName);
              if (tagName !== tagExp && attrExpPresent) {
                childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
              }
              this.addChild(currentNode, childNode, jPath);
              jPath = jPath.substr(0, jPath.lastIndexOf("."));
            } else {
              const childNode = new xmlNode(tagName);
              this.tagsNodeStack.push(currentNode);
              if (tagName !== tagExp && attrExpPresent) {
                childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
              }
              this.addChild(currentNode, childNode, jPath);
              currentNode = childNode;
            }
            textData = "";
            i = closeIndex;
          }
        }
      } else {
        textData += xmlData[i];
      }
    }
    return xmlObj.child;
  };
  function addChild(currentNode, childNode, jPath) {
    const result = this.options.updateTag(childNode.tagname, jPath, childNode[":@"]);
    if (result === false) {} else if (typeof result === "string") {
      childNode.tagname = result;
      currentNode.addChild(childNode);
    } else {
      currentNode.addChild(childNode);
    }
  }
  var replaceEntitiesValue = function(val2) {
    if (this.options.processEntities) {
      for (let entityName2 in this.docTypeEntities) {
        const entity = this.docTypeEntities[entityName2];
        val2 = val2.replace(entity.regx, entity.val);
      }
      for (let entityName2 in this.lastEntities) {
        const entity = this.lastEntities[entityName2];
        val2 = val2.replace(entity.regex, entity.val);
      }
      if (this.options.htmlEntities) {
        for (let entityName2 in this.htmlEntities) {
          const entity = this.htmlEntities[entityName2];
          val2 = val2.replace(entity.regex, entity.val);
        }
      }
      val2 = val2.replace(this.ampEntity.regex, this.ampEntity.val);
    }
    return val2;
  };
  function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
    if (textData) {
      if (isLeafNode === undefined)
        isLeafNode = Object.keys(currentNode.child).length === 0;
      textData = this.parseTextData(textData, currentNode.tagname, jPath, false, currentNode[":@"] ? Object.keys(currentNode[":@"]).length !== 0 : false, isLeafNode);
      if (textData !== undefined && textData !== "")
        currentNode.add(this.options.textNodeName, textData);
      textData = "";
    }
    return textData;
  }
  function isItStopNode(stopNodes, jPath, currentTagName) {
    const allNodesExp = "*." + currentTagName;
    for (const stopNodePath in stopNodes) {
      const stopNodeExp = stopNodes[stopNodePath];
      if (allNodesExp === stopNodeExp || jPath === stopNodeExp)
        return true;
    }
    return false;
  }
  function tagExpWithClosingIndex(xmlData, i, closingChar = ">") {
    let attrBoundary;
    let tagExp = "";
    for (let index = i;index < xmlData.length; index++) {
      let ch = xmlData[index];
      if (attrBoundary) {
        if (ch === attrBoundary)
          attrBoundary = "";
      } else if (ch === '"' || ch === "'") {
        attrBoundary = ch;
      } else if (ch === closingChar[0]) {
        if (closingChar[1]) {
          if (xmlData[index + 1] === closingChar[1]) {
            return {
              data: tagExp,
              index
            };
          }
        } else {
          return {
            data: tagExp,
            index
          };
        }
      } else if (ch === "\t") {
        ch = " ";
      }
      tagExp += ch;
    }
  }
  function findClosingIndex(xmlData, str, i, errMsg) {
    const closingIndex = xmlData.indexOf(str, i);
    if (closingIndex === -1) {
      throw new Error(errMsg);
    } else {
      return closingIndex + str.length - 1;
    }
  }
  function readTagExp(xmlData, i, removeNSPrefix, closingChar = ">") {
    const result = tagExpWithClosingIndex(xmlData, i + 1, closingChar);
    if (!result)
      return;
    let tagExp = result.data;
    const closeIndex = result.index;
    const separatorIndex = tagExp.search(/\s/);
    let tagName = tagExp;
    let attrExpPresent = true;
    if (separatorIndex !== -1) {
      tagName = tagExp.substring(0, separatorIndex);
      tagExp = tagExp.substring(separatorIndex + 1).trimStart();
    }
    const rawTagName = tagName;
    if (removeNSPrefix) {
      const colonIndex = tagName.indexOf(":");
      if (colonIndex !== -1) {
        tagName = tagName.substr(colonIndex + 1);
        attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
      }
    }
    return {
      tagName,
      tagExp,
      closeIndex,
      attrExpPresent,
      rawTagName
    };
  }
  function readStopNodeData(xmlData, tagName, i) {
    const startIndex = i;
    let openTagCount = 1;
    for (;i < xmlData.length; i++) {
      if (xmlData[i] === "<") {
        if (xmlData[i + 1] === "/") {
          const closeIndex = findClosingIndex(xmlData, ">", i, `${tagName} is not closed`);
          let closeTagName = xmlData.substring(i + 2, closeIndex).trim();
          if (closeTagName === tagName) {
            openTagCount--;
            if (openTagCount === 0) {
              return {
                tagContent: xmlData.substring(startIndex, i),
                i: closeIndex
              };
            }
          }
          i = closeIndex;
        } else if (xmlData[i + 1] === "?") {
          const closeIndex = findClosingIndex(xmlData, "?>", i + 1, "StopNode is not closed.");
          i = closeIndex;
        } else if (xmlData.substr(i + 1, 3) === "!--") {
          const closeIndex = findClosingIndex(xmlData, "-->", i + 3, "StopNode is not closed.");
          i = closeIndex;
        } else if (xmlData.substr(i + 1, 2) === "![") {
          const closeIndex = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
          i = closeIndex;
        } else {
          const tagData = readTagExp(xmlData, i, ">");
          if (tagData) {
            const openTagName = tagData && tagData.tagName;
            if (openTagName === tagName && tagData.tagExp[tagData.tagExp.length - 1] !== "/") {
              openTagCount++;
            }
            i = tagData.closeIndex;
          }
        }
      }
    }
  }
  function parseValue(val2, shouldParse, options) {
    if (shouldParse && typeof val2 === "string") {
      const newval = val2.trim();
      if (newval === "true")
        return true;
      else if (newval === "false")
        return false;
      else
        return toNumber(val2, options);
    } else {
      if (util.isExist(val2)) {
        return val2;
      } else {
        return "";
      }
    }
  }
  module.exports = OrderedObjParser;
});

// ../../../../node_modules/fast-xml-parser/src/xmlparser/node2json.js
var require_node2json = __commonJS((exports) => {
  function prettify(node, options) {
    return compress(node, options);
  }
  function compress(arr, options, jPath) {
    let text;
    const compressedObj = {};
    for (let i = 0;i < arr.length; i++) {
      const tagObj = arr[i];
      const property = propName(tagObj);
      let newJpath = "";
      if (jPath === undefined)
        newJpath = property;
      else
        newJpath = jPath + "." + property;
      if (property === options.textNodeName) {
        if (text === undefined)
          text = tagObj[property];
        else
          text += "" + tagObj[property];
      } else if (property === undefined) {
        continue;
      } else if (tagObj[property]) {
        let val2 = compress(tagObj[property], options, newJpath);
        const isLeaf = isLeafTag(val2, options);
        if (tagObj[":@"]) {
          assignAttributes(val2, tagObj[":@"], newJpath, options);
        } else if (Object.keys(val2).length === 1 && val2[options.textNodeName] !== undefined && !options.alwaysCreateTextNode) {
          val2 = val2[options.textNodeName];
        } else if (Object.keys(val2).length === 0) {
          if (options.alwaysCreateTextNode)
            val2[options.textNodeName] = "";
          else
            val2 = "";
        }
        if (compressedObj[property] !== undefined && compressedObj.hasOwnProperty(property)) {
          if (!Array.isArray(compressedObj[property])) {
            compressedObj[property] = [compressedObj[property]];
          }
          compressedObj[property].push(val2);
        } else {
          if (options.isArray(property, newJpath, isLeaf)) {
            compressedObj[property] = [val2];
          } else {
            compressedObj[property] = val2;
          }
        }
      }
    }
    if (typeof text === "string") {
      if (text.length > 0)
        compressedObj[options.textNodeName] = text;
    } else if (text !== undefined)
      compressedObj[options.textNodeName] = text;
    return compressedObj;
  }
  function propName(obj) {
    const keys = Object.keys(obj);
    for (let i = 0;i < keys.length; i++) {
      const key = keys[i];
      if (key !== ":@")
        return key;
    }
  }
  function assignAttributes(obj, attrMap, jpath, options) {
    if (attrMap) {
      const keys = Object.keys(attrMap);
      const len = keys.length;
      for (let i = 0;i < len; i++) {
        const atrrName = keys[i];
        if (options.isArray(atrrName, jpath + "." + atrrName, true, true)) {
          obj[atrrName] = [attrMap[atrrName]];
        } else {
          obj[atrrName] = attrMap[atrrName];
        }
      }
    }
  }
  function isLeafTag(obj, options) {
    const { textNodeName } = options;
    const propCount = Object.keys(obj).length;
    if (propCount === 0) {
      return true;
    }
    if (propCount === 1 && (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)) {
      return true;
    }
    return false;
  }
  exports.prettify = prettify;
});

// ../../../../node_modules/fast-xml-parser/src/xmlparser/XMLParser.js
var require_XMLParser = __commonJS((exports, module) => {
  var { buildOptions } = require_OptionsBuilder();
  var OrderedObjParser = require_OrderedObjParser();
  var { prettify } = require_node2json();
  var validator = require_validator();

  class XMLParser {
    constructor(options) {
      this.externalEntities = {};
      this.options = buildOptions(options);
    }
    parse(xmlData, validationOption) {
      if (typeof xmlData === "string") {} else if (xmlData.toString) {
        xmlData = xmlData.toString();
      } else {
        throw new Error("XML data is accepted in String or Bytes[] form.");
      }
      if (validationOption) {
        if (validationOption === true)
          validationOption = {};
        const result = validator.validate(xmlData, validationOption);
        if (result !== true) {
          throw Error(`${result.err.msg}:${result.err.line}:${result.err.col}`);
        }
      }
      const orderedObjParser = new OrderedObjParser(this.options);
      orderedObjParser.addExternalEntities(this.externalEntities);
      const orderedResult = orderedObjParser.parseXml(xmlData);
      if (this.options.preserveOrder || orderedResult === undefined)
        return orderedResult;
      else
        return prettify(orderedResult, this.options);
    }
    addEntity(key, value) {
      if (value.indexOf("&") !== -1) {
        throw new Error("Entity value can't have '&'");
      } else if (key.indexOf("&") !== -1 || key.indexOf(";") !== -1) {
        throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
      } else if (value === "&") {
        throw new Error("An entity with value '&' is not permitted");
      } else {
        this.externalEntities[key] = value;
      }
    }
  }
  module.exports = XMLParser;
});

// ../../../../node_modules/fast-xml-parser/src/xmlbuilder/orderedJs2Xml.js
var require_orderedJs2Xml = __commonJS((exports, module) => {
  var EOL = `
`;
  function toXml(jArray, options) {
    let indentation = "";
    if (options.format && options.indentBy.length > 0) {
      indentation = EOL;
    }
    return arrToStr(jArray, options, "", indentation);
  }
  function arrToStr(arr, options, jPath, indentation) {
    let xmlStr = "";
    let isPreviousElementTag = false;
    for (let i = 0;i < arr.length; i++) {
      const tagObj = arr[i];
      const tagName = propName(tagObj);
      if (tagName === undefined)
        continue;
      let newJPath = "";
      if (jPath.length === 0)
        newJPath = tagName;
      else
        newJPath = `${jPath}.${tagName}`;
      if (tagName === options.textNodeName) {
        let tagText = tagObj[tagName];
        if (!isStopNode(newJPath, options)) {
          tagText = options.tagValueProcessor(tagName, tagText);
          tagText = replaceEntitiesValue(tagText, options);
        }
        if (isPreviousElementTag) {
          xmlStr += indentation;
        }
        xmlStr += tagText;
        isPreviousElementTag = false;
        continue;
      } else if (tagName === options.cdataPropName) {
        if (isPreviousElementTag) {
          xmlStr += indentation;
        }
        xmlStr += `<![CDATA[${tagObj[tagName][0][options.textNodeName]}]]>`;
        isPreviousElementTag = false;
        continue;
      } else if (tagName === options.commentPropName) {
        xmlStr += indentation + `<!--${tagObj[tagName][0][options.textNodeName]}-->`;
        isPreviousElementTag = true;
        continue;
      } else if (tagName[0] === "?") {
        const attStr2 = attr_to_str(tagObj[":@"], options);
        const tempInd = tagName === "?xml" ? "" : indentation;
        let piTextNodeName = tagObj[tagName][0][options.textNodeName];
        piTextNodeName = piTextNodeName.length !== 0 ? " " + piTextNodeName : "";
        xmlStr += tempInd + `<${tagName}${piTextNodeName}${attStr2}?>`;
        isPreviousElementTag = true;
        continue;
      }
      let newIdentation = indentation;
      if (newIdentation !== "") {
        newIdentation += options.indentBy;
      }
      const attStr = attr_to_str(tagObj[":@"], options);
      const tagStart = indentation + `<${tagName}${attStr}`;
      const tagValue = arrToStr(tagObj[tagName], options, newJPath, newIdentation);
      if (options.unpairedTags.indexOf(tagName) !== -1) {
        if (options.suppressUnpairedNode)
          xmlStr += tagStart + ">";
        else
          xmlStr += tagStart + "/>";
      } else if ((!tagValue || tagValue.length === 0) && options.suppressEmptyNode) {
        xmlStr += tagStart + "/>";
      } else if (tagValue && tagValue.endsWith(">")) {
        xmlStr += tagStart + `>${tagValue}${indentation}</${tagName}>`;
      } else {
        xmlStr += tagStart + ">";
        if (tagValue && indentation !== "" && (tagValue.includes("/>") || tagValue.includes("</"))) {
          xmlStr += indentation + options.indentBy + tagValue + indentation;
        } else {
          xmlStr += tagValue;
        }
        xmlStr += `</${tagName}>`;
      }
      isPreviousElementTag = true;
    }
    return xmlStr;
  }
  function propName(obj) {
    const keys = Object.keys(obj);
    for (let i = 0;i < keys.length; i++) {
      const key = keys[i];
      if (!obj.hasOwnProperty(key))
        continue;
      if (key !== ":@")
        return key;
    }
  }
  function attr_to_str(attrMap, options) {
    let attrStr = "";
    if (attrMap && !options.ignoreAttributes) {
      for (let attr in attrMap) {
        if (!attrMap.hasOwnProperty(attr))
          continue;
        let attrVal = options.attributeValueProcessor(attr, attrMap[attr]);
        attrVal = replaceEntitiesValue(attrVal, options);
        if (attrVal === true && options.suppressBooleanAttributes) {
          attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}`;
        } else {
          attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}="${attrVal}"`;
        }
      }
    }
    return attrStr;
  }
  function isStopNode(jPath, options) {
    jPath = jPath.substr(0, jPath.length - options.textNodeName.length - 1);
    let tagName = jPath.substr(jPath.lastIndexOf(".") + 1);
    for (let index in options.stopNodes) {
      if (options.stopNodes[index] === jPath || options.stopNodes[index] === "*." + tagName)
        return true;
    }
    return false;
  }
  function replaceEntitiesValue(textValue, options) {
    if (textValue && textValue.length > 0 && options.processEntities) {
      for (let i = 0;i < options.entities.length; i++) {
        const entity = options.entities[i];
        textValue = textValue.replace(entity.regex, entity.val);
      }
    }
    return textValue;
  }
  module.exports = toXml;
});

// ../../../../node_modules/fast-xml-parser/src/xmlbuilder/json2xml.js
var require_json2xml = __commonJS((exports, module) => {
  var buildFromOrderedJs = require_orderedJs2Xml();
  var defaultOptions = {
    attributeNamePrefix: "@_",
    attributesGroupName: false,
    textNodeName: "#text",
    ignoreAttributes: true,
    cdataPropName: false,
    format: false,
    indentBy: "  ",
    suppressEmptyNode: false,
    suppressUnpairedNode: true,
    suppressBooleanAttributes: true,
    tagValueProcessor: function(key, a) {
      return a;
    },
    attributeValueProcessor: function(attrName, a) {
      return a;
    },
    preserveOrder: false,
    commentPropName: false,
    unpairedTags: [],
    entities: [
      { regex: new RegExp("&", "g"), val: "&amp;" },
      { regex: new RegExp(">", "g"), val: "&gt;" },
      { regex: new RegExp("<", "g"), val: "&lt;" },
      { regex: new RegExp("'", "g"), val: "&apos;" },
      { regex: new RegExp('"', "g"), val: "&quot;" }
    ],
    processEntities: true,
    stopNodes: [],
    oneListGroup: false
  };
  function Builder(options) {
    this.options = Object.assign({}, defaultOptions, options);
    if (this.options.ignoreAttributes || this.options.attributesGroupName) {
      this.isAttribute = function() {
        return false;
      };
    } else {
      this.attrPrefixLen = this.options.attributeNamePrefix.length;
      this.isAttribute = isAttribute;
    }
    this.processTextOrObjNode = processTextOrObjNode;
    if (this.options.format) {
      this.indentate = indentate;
      this.tagEndChar = `>
`;
      this.newLine = `
`;
    } else {
      this.indentate = function() {
        return "";
      };
      this.tagEndChar = ">";
      this.newLine = "";
    }
  }
  Builder.prototype.build = function(jObj) {
    if (this.options.preserveOrder) {
      return buildFromOrderedJs(jObj, this.options);
    } else {
      if (Array.isArray(jObj) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1) {
        jObj = {
          [this.options.arrayNodeName]: jObj
        };
      }
      return this.j2x(jObj, 0).val;
    }
  };
  Builder.prototype.j2x = function(jObj, level) {
    let attrStr = "";
    let val2 = "";
    for (let key in jObj) {
      if (!Object.prototype.hasOwnProperty.call(jObj, key))
        continue;
      if (typeof jObj[key] === "undefined") {
        if (this.isAttribute(key)) {
          val2 += "";
        }
      } else if (jObj[key] === null) {
        if (this.isAttribute(key)) {
          val2 += "";
        } else if (key[0] === "?") {
          val2 += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
        } else {
          val2 += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
        }
      } else if (jObj[key] instanceof Date) {
        val2 += this.buildTextValNode(jObj[key], key, "", level);
      } else if (typeof jObj[key] !== "object") {
        const attr = this.isAttribute(key);
        if (attr) {
          attrStr += this.buildAttrPairStr(attr, "" + jObj[key]);
        } else {
          if (key === this.options.textNodeName) {
            let newval = this.options.tagValueProcessor(key, "" + jObj[key]);
            val2 += this.replaceEntitiesValue(newval);
          } else {
            val2 += this.buildTextValNode(jObj[key], key, "", level);
          }
        }
      } else if (Array.isArray(jObj[key])) {
        const arrLen = jObj[key].length;
        let listTagVal = "";
        let listTagAttr = "";
        for (let j = 0;j < arrLen; j++) {
          const item = jObj[key][j];
          if (typeof item === "undefined") {} else if (item === null) {
            if (key[0] === "?")
              val2 += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
            else
              val2 += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
          } else if (typeof item === "object") {
            if (this.options.oneListGroup) {
              const result = this.j2x(item, level + 1);
              listTagVal += result.val;
              if (this.options.attributesGroupName && item.hasOwnProperty(this.options.attributesGroupName)) {
                listTagAttr += result.attrStr;
              }
            } else {
              listTagVal += this.processTextOrObjNode(item, key, level);
            }
          } else {
            if (this.options.oneListGroup) {
              let textValue = this.options.tagValueProcessor(key, item);
              textValue = this.replaceEntitiesValue(textValue);
              listTagVal += textValue;
            } else {
              listTagVal += this.buildTextValNode(item, key, "", level);
            }
          }
        }
        if (this.options.oneListGroup) {
          listTagVal = this.buildObjectNode(listTagVal, key, listTagAttr, level);
        }
        val2 += listTagVal;
      } else {
        if (this.options.attributesGroupName && key === this.options.attributesGroupName) {
          const Ks = Object.keys(jObj[key]);
          const L = Ks.length;
          for (let j = 0;j < L; j++) {
            attrStr += this.buildAttrPairStr(Ks[j], "" + jObj[key][Ks[j]]);
          }
        } else {
          val2 += this.processTextOrObjNode(jObj[key], key, level);
        }
      }
    }
    return { attrStr, val: val2 };
  };
  Builder.prototype.buildAttrPairStr = function(attrName, val2) {
    val2 = this.options.attributeValueProcessor(attrName, "" + val2);
    val2 = this.replaceEntitiesValue(val2);
    if (this.options.suppressBooleanAttributes && val2 === "true") {
      return " " + attrName;
    } else
      return " " + attrName + '="' + val2 + '"';
  };
  function processTextOrObjNode(object, key, level) {
    const result = this.j2x(object, level + 1);
    if (object[this.options.textNodeName] !== undefined && Object.keys(object).length === 1) {
      return this.buildTextValNode(object[this.options.textNodeName], key, result.attrStr, level);
    } else {
      return this.buildObjectNode(result.val, key, result.attrStr, level);
    }
  }
  Builder.prototype.buildObjectNode = function(val2, key, attrStr, level) {
    if (val2 === "") {
      if (key[0] === "?")
        return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
      else {
        return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
      }
    } else {
      let tagEndExp = "</" + key + this.tagEndChar;
      let piClosingChar = "";
      if (key[0] === "?") {
        piClosingChar = "?";
        tagEndExp = "";
      }
      if ((attrStr || attrStr === "") && val2.indexOf("<") === -1) {
        return this.indentate(level) + "<" + key + attrStr + piClosingChar + ">" + val2 + tagEndExp;
      } else if (this.options.commentPropName !== false && key === this.options.commentPropName && piClosingChar.length === 0) {
        return this.indentate(level) + `<!--${val2}-->` + this.newLine;
      } else {
        return this.indentate(level) + "<" + key + attrStr + piClosingChar + this.tagEndChar + val2 + this.indentate(level) + tagEndExp;
      }
    }
  };
  Builder.prototype.closeTag = function(key) {
    let closeTag = "";
    if (this.options.unpairedTags.indexOf(key) !== -1) {
      if (!this.options.suppressUnpairedNode)
        closeTag = "/";
    } else if (this.options.suppressEmptyNode) {
      closeTag = "/";
    } else {
      closeTag = `></${key}`;
    }
    return closeTag;
  };
  Builder.prototype.buildTextValNode = function(val2, key, attrStr, level) {
    if (this.options.cdataPropName !== false && key === this.options.cdataPropName) {
      return this.indentate(level) + `<![CDATA[${val2}]]>` + this.newLine;
    } else if (this.options.commentPropName !== false && key === this.options.commentPropName) {
      return this.indentate(level) + `<!--${val2}-->` + this.newLine;
    } else if (key[0] === "?") {
      return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
    } else {
      let textValue = this.options.tagValueProcessor(key, val2);
      textValue = this.replaceEntitiesValue(textValue);
      if (textValue === "") {
        return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
      } else {
        return this.indentate(level) + "<" + key + attrStr + ">" + textValue + "</" + key + this.tagEndChar;
      }
    }
  };
  Builder.prototype.replaceEntitiesValue = function(textValue) {
    if (textValue && textValue.length > 0 && this.options.processEntities) {
      for (let i = 0;i < this.options.entities.length; i++) {
        const entity = this.options.entities[i];
        textValue = textValue.replace(entity.regex, entity.val);
      }
    }
    return textValue;
  };
  function indentate(level) {
    return this.options.indentBy.repeat(level);
  }
  function isAttribute(name) {
    if (name.startsWith(this.options.attributeNamePrefix) && name !== this.options.textNodeName) {
      return name.substr(this.attrPrefixLen);
    } else {
      return false;
    }
  }
  module.exports = Builder;
});

// ../../../../node_modules/fast-xml-parser/src/fxp.js
var require_fxp = __commonJS((exports, module) => {
  var validator = require_validator();
  var XMLParser = require_XMLParser();
  var XMLBuilder = require_json2xml();
  module.exports = {
    XMLParser,
    XMLValidator: validator,
    XMLBuilder
  };
});

// ../../../../node_modules/@aws-sdk/xml-builder/dist-cjs/index.js
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
    XmlNode: () => XmlNode,
    XmlText: () => XmlText
  });
  module.exports = __toCommonJS(index_exports);
  function escapeAttribute(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  __name(escapeAttribute, "escapeAttribute");
  function escapeElement(value) {
    return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#x0D;").replace(/\n/g, "&#x0A;").replace(/\u0085/g, "&#x85;").replace(/\u2028/, "&#x2028;");
  }
  __name(escapeElement, "escapeElement");
  var XmlText = class {
    constructor(value) {
      this.value = value;
    }
    static {
      __name(this, "XmlText");
    }
    toString() {
      return escapeElement("" + this.value);
    }
  };
  var XmlNode = class _XmlNode {
    constructor(name, children = []) {
      this.name = name;
      this.children = children;
    }
    static {
      __name(this, "XmlNode");
    }
    attributes = {};
    static of(name, childText, withName) {
      const node = new _XmlNode(name);
      if (childText !== undefined) {
        node.addChildNode(new XmlText(childText));
      }
      if (withName !== undefined) {
        node.withName(withName);
      }
      return node;
    }
    withName(name) {
      this.name = name;
      return this;
    }
    addAttribute(name, value) {
      this.attributes[name] = value;
      return this;
    }
    addChildNode(child) {
      this.children.push(child);
      return this;
    }
    removeAttribute(name) {
      delete this.attributes[name];
      return this;
    }
    n(name) {
      this.name = name;
      return this;
    }
    c(child) {
      this.children.push(child);
      return this;
    }
    a(name, value) {
      if (value != null) {
        this.attributes[name] = value;
      }
      return this;
    }
    cc(input, field, withName = field) {
      if (input[field] != null) {
        const node = _XmlNode.of(field, input[field]).withName(withName);
        this.c(node);
      }
    }
    l(input, listName, memberName, valueProvider) {
      if (input[listName] != null) {
        const nodes = valueProvider();
        nodes.map((node) => {
          node.withName(memberName);
          this.c(node);
        });
      }
    }
    lc(input, listName, memberName, valueProvider) {
      if (input[listName] != null) {
        const nodes = valueProvider();
        const containerNode = new _XmlNode(memberName);
        nodes.map((node) => {
          containerNode.c(node);
        });
        this.c(containerNode);
      }
    }
    toString() {
      const hasChildren = Boolean(this.children.length);
      let xmlText = `<${this.name}`;
      const attributes = this.attributes;
      for (const attributeName of Object.keys(attributes)) {
        const attribute = attributes[attributeName];
        if (attribute != null) {
          xmlText += ` ${attributeName}="${escapeAttribute("" + attribute)}"`;
        }
      }
      return xmlText += !hasChildren ? "/>" : `>${this.children.map((c) => c.toString()).join("")}</${this.name}>`;
    }
  };
});

// ../../../../node_modules/@aws-sdk/core/dist-cjs/submodules/protocols/index.js
var require_protocols2 = __commonJS((exports, module) => {
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
    AwsEc2QueryProtocol: () => AwsEc2QueryProtocol,
    AwsJson1_0Protocol: () => AwsJson1_0Protocol,
    AwsJson1_1Protocol: () => AwsJson1_1Protocol,
    AwsJsonRpcProtocol: () => AwsJsonRpcProtocol,
    AwsQueryProtocol: () => AwsQueryProtocol,
    AwsRestJsonProtocol: () => AwsRestJsonProtocol,
    AwsRestXmlProtocol: () => AwsRestXmlProtocol,
    JsonCodec: () => JsonCodec,
    JsonShapeDeserializer: () => JsonShapeDeserializer,
    JsonShapeSerializer: () => JsonShapeSerializer,
    XmlCodec: () => XmlCodec,
    XmlShapeDeserializer: () => XmlShapeDeserializer,
    XmlShapeSerializer: () => XmlShapeSerializer,
    _toBool: () => _toBool,
    _toNum: () => _toNum,
    _toStr: () => _toStr,
    awsExpectUnion: () => awsExpectUnion,
    loadRestJsonErrorCode: () => loadRestJsonErrorCode,
    loadRestXmlErrorCode: () => loadRestXmlErrorCode,
    parseJsonBody: () => parseJsonBody,
    parseJsonErrorBody: () => parseJsonErrorBody,
    parseXmlBody: () => parseXmlBody,
    parseXmlErrorBody: () => parseXmlErrorBody
  });
  module.exports = __toCommonJS(index_exports);
  var _toStr = /* @__PURE__ */ __name((val2) => {
    if (val2 == null) {
      return val2;
    }
    if (typeof val2 === "number" || typeof val2 === "bigint") {
      const warning = new Error(`Received number ${val2} where a string was expected.`);
      warning.name = "Warning";
      console.warn(warning);
      return String(val2);
    }
    if (typeof val2 === "boolean") {
      const warning = new Error(`Received boolean ${val2} where a string was expected.`);
      warning.name = "Warning";
      console.warn(warning);
      return String(val2);
    }
    return val2;
  }, "_toStr");
  var _toBool = /* @__PURE__ */ __name((val2) => {
    if (val2 == null) {
      return val2;
    }
    if (typeof val2 === "number") {}
    if (typeof val2 === "string") {
      const lowercase = val2.toLowerCase();
      if (val2 !== "" && lowercase !== "false" && lowercase !== "true") {
        const warning = new Error(`Received string "${val2}" where a boolean was expected.`);
        warning.name = "Warning";
        console.warn(warning);
      }
      return val2 !== "" && lowercase !== "false";
    }
    return val2;
  }, "_toBool");
  var _toNum = /* @__PURE__ */ __name((val2) => {
    if (val2 == null) {
      return val2;
    }
    if (typeof val2 === "boolean") {}
    if (typeof val2 === "string") {
      const num = Number(val2);
      if (num.toString() !== val2) {
        const warning = new Error(`Received string "${val2}" where a number was expected.`);
        warning.name = "Warning";
        console.warn(warning);
        return val2;
      }
      return num;
    }
    return val2;
  }, "_toNum");
  var import_protocols = require_protocols();
  var import_schema3 = require_schema();
  var import_util_body_length_browser = require_dist_cjs15();
  var SerdeContextConfig = class {
    static {
      __name(this, "SerdeContextConfig");
    }
    serdeContext;
    setSerdeContext(serdeContext) {
      this.serdeContext = serdeContext;
    }
  };
  var import_schema = require_schema();
  var import_serde2 = require_serde();
  var import_util_base64 = require_dist_cjs6();
  var import_serde = require_serde();
  function jsonReviver(key, value, context) {
    if (context?.source) {
      const numericString = context.source;
      if (typeof value === "number") {
        if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER || numericString !== String(value)) {
          const isFractional = numericString.includes(".");
          if (isFractional) {
            return new import_serde.NumericValue(numericString, "bigDecimal");
          } else {
            return BigInt(numericString);
          }
        }
      }
    }
    return value;
  }
  __name(jsonReviver, "jsonReviver");
  var import_smithy_client = require_dist_cjs13();
  var collectBodyString = /* @__PURE__ */ __name((streamBody, context) => (0, import_smithy_client.collectBody)(streamBody, context).then((body) => context.utf8Encoder(body)), "collectBodyString");
  var parseJsonBody = /* @__PURE__ */ __name((streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
    if (encoded.length) {
      try {
        return JSON.parse(encoded);
      } catch (e) {
        if (e?.name === "SyntaxError") {
          Object.defineProperty(e, "$responseBodyText", {
            value: encoded
          });
        }
        throw e;
      }
    }
    return {};
  }), "parseJsonBody");
  var parseJsonErrorBody = /* @__PURE__ */ __name(async (errorBody, context) => {
    const value = await parseJsonBody(errorBody, context);
    value.message = value.message ?? value.Message;
    return value;
  }, "parseJsonErrorBody");
  var loadRestJsonErrorCode = /* @__PURE__ */ __name((output, data) => {
    const findKey = /* @__PURE__ */ __name((object, key) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase()), "findKey");
    const sanitizeErrorCode = /* @__PURE__ */ __name((rawValue) => {
      let cleanValue = rawValue;
      if (typeof cleanValue === "number") {
        cleanValue = cleanValue.toString();
      }
      if (cleanValue.indexOf(",") >= 0) {
        cleanValue = cleanValue.split(",")[0];
      }
      if (cleanValue.indexOf(":") >= 0) {
        cleanValue = cleanValue.split(":")[0];
      }
      if (cleanValue.indexOf("#") >= 0) {
        cleanValue = cleanValue.split("#")[1];
      }
      return cleanValue;
    }, "sanitizeErrorCode");
    const headerKey = findKey(output.headers, "x-amzn-errortype");
    if (headerKey !== undefined) {
      return sanitizeErrorCode(output.headers[headerKey]);
    }
    if (data && typeof data === "object") {
      const codeKey = findKey(data, "code");
      if (codeKey && data[codeKey] !== undefined) {
        return sanitizeErrorCode(data[codeKey]);
      }
      if (data["__type"] !== undefined) {
        return sanitizeErrorCode(data["__type"]);
      }
    }
  }, "loadRestJsonErrorCode");
  var JsonShapeDeserializer = class extends SerdeContextConfig {
    constructor(settings) {
      super();
      this.settings = settings;
    }
    static {
      __name(this, "JsonShapeDeserializer");
    }
    async read(schema, data) {
      return this._read(schema, typeof data === "string" ? JSON.parse(data, jsonReviver) : await parseJsonBody(data, this.serdeContext));
    }
    readObject(schema, data) {
      return this._read(schema, data);
    }
    _read(schema, value) {
      const isObject = value !== null && typeof value === "object";
      const ns = import_schema.NormalizedSchema.of(schema);
      if (ns.isListSchema() && Array.isArray(value)) {
        const listMember = ns.getValueSchema();
        const out = [];
        const sparse = !!ns.getMergedTraits().sparse;
        for (const item of value) {
          if (sparse || item != null) {
            out.push(this._read(listMember, item));
          }
        }
        return out;
      } else if (ns.isMapSchema() && isObject) {
        const mapMember = ns.getValueSchema();
        const out = {};
        const sparse = !!ns.getMergedTraits().sparse;
        for (const [_k, _v] of Object.entries(value)) {
          if (sparse || _v != null) {
            out[_k] = this._read(mapMember, _v);
          }
        }
        return out;
      } else if (ns.isStructSchema() && isObject) {
        const out = {};
        for (const [memberName, memberSchema] of ns.structIterator()) {
          const fromKey = this.settings.jsonName ? memberSchema.getMergedTraits().jsonName ?? memberName : memberName;
          const deserializedValue = this._read(memberSchema, value[fromKey]);
          if (deserializedValue != null) {
            out[memberName] = deserializedValue;
          }
        }
        return out;
      }
      if (ns.isBlobSchema() && typeof value === "string") {
        return (0, import_util_base64.fromBase64)(value);
      }
      const mediaType = ns.getMergedTraits().mediaType;
      if (ns.isStringSchema() && typeof value === "string" && mediaType) {
        const isJson = mediaType === "application/json" || mediaType.endsWith("+json");
        if (isJson) {
          return import_serde2.LazyJsonString.from(value);
        }
      }
      if (ns.isTimestampSchema()) {
        const options = this.settings.timestampFormat;
        const format = options.useTrait ? ns.getSchema() === import_schema.SCHEMA.TIMESTAMP_DEFAULT ? options.default : ns.getSchema() ?? options.default : options.default;
        switch (format) {
          case import_schema.SCHEMA.TIMESTAMP_DATE_TIME:
            return (0, import_serde2.parseRfc3339DateTimeWithOffset)(value);
          case import_schema.SCHEMA.TIMESTAMP_HTTP_DATE:
            return (0, import_serde2.parseRfc7231DateTime)(value);
          case import_schema.SCHEMA.TIMESTAMP_EPOCH_SECONDS:
            return (0, import_serde2.parseEpochTimestamp)(value);
          default:
            console.warn("Missing timestamp format, parsing value with Date constructor:", value);
            return new Date(value);
        }
      }
      if (ns.isBigIntegerSchema() && (typeof value === "number" || typeof value === "string")) {
        return BigInt(value);
      }
      if (ns.isBigDecimalSchema() && value != null) {
        if (value instanceof import_serde2.NumericValue) {
          return value;
        }
        return new import_serde2.NumericValue(String(value), "bigDecimal");
      }
      if (ns.isNumericSchema() && typeof value === "string") {
        switch (value) {
          case "Infinity":
            return Infinity;
          case "-Infinity":
            return -Infinity;
          case "NaN":
            return NaN;
        }
      }
      return value;
    }
  };
  var import_schema2 = require_schema();
  var import_serde4 = require_serde();
  var import_serde5 = require_serde();
  var import_serde3 = require_serde();
  var NUMERIC_CONTROL_CHAR = String.fromCharCode(925);
  var JsonReplacer = class {
    static {
      __name(this, "JsonReplacer");
    }
    values = /* @__PURE__ */ new Map;
    counter = 0;
    stage = 0;
    createReplacer() {
      if (this.stage === 1) {
        throw new Error("@aws-sdk/core/protocols - JsonReplacer already created.");
      }
      if (this.stage === 2) {
        throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
      }
      this.stage = 1;
      return (key, value) => {
        if (value instanceof import_serde3.NumericValue) {
          const v = `${NUMERIC_CONTROL_CHAR + NaN + this.counter++}_` + value.string;
          this.values.set(`"${v}"`, value.string);
          return v;
        }
        if (typeof value === "bigint") {
          const s = value.toString();
          const v = `${NUMERIC_CONTROL_CHAR + "b" + this.counter++}_` + s;
          this.values.set(`"${v}"`, s);
          return v;
        }
        return value;
      };
    }
    replaceInJson(json) {
      if (this.stage === 0) {
        throw new Error("@aws-sdk/core/protocols - JsonReplacer not created yet.");
      }
      if (this.stage === 2) {
        throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
      }
      this.stage = 2;
      if (this.counter === 0) {
        return json;
      }
      for (const [key, value] of this.values) {
        json = json.replace(key, value);
      }
      return json;
    }
  };
  var JsonShapeSerializer = class extends SerdeContextConfig {
    constructor(settings) {
      super();
      this.settings = settings;
    }
    static {
      __name(this, "JsonShapeSerializer");
    }
    buffer;
    rootSchema;
    write(schema, value) {
      this.rootSchema = import_schema2.NormalizedSchema.of(schema);
      this.buffer = this._write(this.rootSchema, value);
    }
    flush() {
      if (this.rootSchema?.isStructSchema() || this.rootSchema?.isDocumentSchema()) {
        const replacer = new JsonReplacer;
        return replacer.replaceInJson(JSON.stringify(this.buffer, replacer.createReplacer(), 0));
      }
      return this.buffer;
    }
    _write(schema, value, container) {
      const isObject = value !== null && typeof value === "object";
      const ns = import_schema2.NormalizedSchema.of(schema);
      if (ns.isListSchema() && Array.isArray(value)) {
        const listMember = ns.getValueSchema();
        const out = [];
        const sparse = !!ns.getMergedTraits().sparse;
        for (const item of value) {
          if (sparse || item != null) {
            out.push(this._write(listMember, item));
          }
        }
        return out;
      } else if (ns.isMapSchema() && isObject) {
        const mapMember = ns.getValueSchema();
        const out = {};
        const sparse = !!ns.getMergedTraits().sparse;
        for (const [_k, _v] of Object.entries(value)) {
          if (sparse || _v != null) {
            out[_k] = this._write(mapMember, _v);
          }
        }
        return out;
      } else if (ns.isStructSchema() && isObject) {
        const out = {};
        for (const [memberName, memberSchema] of ns.structIterator()) {
          const targetKey = this.settings.jsonName ? memberSchema.getMergedTraits().jsonName ?? memberName : memberName;
          const serializableValue = this._write(memberSchema, value[memberName], ns);
          if (serializableValue !== undefined) {
            out[targetKey] = serializableValue;
          }
        }
        return out;
      }
      if (value === null && container?.isStructSchema()) {
        return;
      }
      if (ns.isBlobSchema() && (value instanceof Uint8Array || typeof value === "string")) {
        if (ns === this.rootSchema) {
          return value;
        }
        if (!this.serdeContext?.base64Encoder) {
          throw new Error("Missing base64Encoder in serdeContext");
        }
        return this.serdeContext?.base64Encoder(value);
      }
      if (ns.isTimestampSchema() && value instanceof Date) {
        const options = this.settings.timestampFormat;
        const format = options.useTrait ? ns.getSchema() === import_schema2.SCHEMA.TIMESTAMP_DEFAULT ? options.default : ns.getSchema() ?? options.default : options.default;
        switch (format) {
          case import_schema2.SCHEMA.TIMESTAMP_DATE_TIME:
            return value.toISOString().replace(".000Z", "Z");
          case import_schema2.SCHEMA.TIMESTAMP_HTTP_DATE:
            return (0, import_serde4.dateToUtcString)(value);
          case import_schema2.SCHEMA.TIMESTAMP_EPOCH_SECONDS:
            return value.getTime() / 1000;
          default:
            console.warn("Missing timestamp format, using epoch seconds", value);
            return value.getTime() / 1000;
        }
      }
      if (ns.isNumericSchema() && typeof value === "number") {
        if (Math.abs(value) === Infinity || isNaN(value)) {
          return String(value);
        }
      }
      const mediaType = ns.getMergedTraits().mediaType;
      if (ns.isStringSchema() && typeof value === "string" && mediaType) {
        const isJson = mediaType === "application/json" || mediaType.endsWith("+json");
        if (isJson) {
          return import_serde5.LazyJsonString.from(value);
        }
      }
      return value;
    }
  };
  var JsonCodec = class extends SerdeContextConfig {
    constructor(settings) {
      super();
      this.settings = settings;
    }
    static {
      __name(this, "JsonCodec");
    }
    createSerializer() {
      const serializer = new JsonShapeSerializer(this.settings);
      serializer.setSerdeContext(this.serdeContext);
      return serializer;
    }
    createDeserializer() {
      const deserializer = new JsonShapeDeserializer(this.settings);
      deserializer.setSerdeContext(this.serdeContext);
      return deserializer;
    }
  };
  var AwsJsonRpcProtocol = class extends import_protocols.RpcProtocol {
    static {
      __name(this, "AwsJsonRpcProtocol");
    }
    serializer;
    deserializer;
    codec;
    constructor({ defaultNamespace }) {
      super({
        defaultNamespace
      });
      this.codec = new JsonCodec({
        timestampFormat: {
          useTrait: true,
          default: import_schema3.SCHEMA.TIMESTAMP_EPOCH_SECONDS
        },
        jsonName: false
      });
      this.serializer = this.codec.createSerializer();
      this.deserializer = this.codec.createDeserializer();
    }
    async serializeRequest(operationSchema, input, context) {
      const request = await super.serializeRequest(operationSchema, input, context);
      if (!request.path.endsWith("/")) {
        request.path += "/";
      }
      Object.assign(request.headers, {
        "content-type": `application/x-amz-json-${this.getJsonRpcVersion()}`,
        "x-amz-target": (this.getJsonRpcVersion() === "1.0" ? `JsonRpc10.` : `JsonProtocol.`) + import_schema3.NormalizedSchema.of(operationSchema).getName()
      });
      if ((0, import_schema3.deref)(operationSchema.input) === "unit" || !request.body) {
        request.body = "{}";
      }
      try {
        request.headers["content-length"] = String((0, import_util_body_length_browser.calculateBodyLength)(request.body));
      } catch (e) {}
      return request;
    }
    getPayloadCodec() {
      return this.codec;
    }
    async handleError(operationSchema, context, response, dataObject, metadata) {
      const errorIdentifier = loadRestJsonErrorCode(response, dataObject) ?? "Unknown";
      let namespace = this.options.defaultNamespace;
      let errorName = errorIdentifier;
      if (errorIdentifier.includes("#")) {
        [namespace, errorName] = errorIdentifier.split("#");
      }
      const registry = import_schema3.TypeRegistry.for(namespace);
      let errorSchema;
      try {
        errorSchema = registry.getSchema(errorIdentifier);
      } catch (e) {
        const baseExceptionSchema = import_schema3.TypeRegistry.for("smithy.ts.sdk.synthetic." + namespace).getBaseException();
        if (baseExceptionSchema) {
          const ErrorCtor = baseExceptionSchema.ctor;
          throw Object.assign(new ErrorCtor(errorName), dataObject);
        }
        throw new Error(errorName);
      }
      const ns = import_schema3.NormalizedSchema.of(errorSchema);
      const message = dataObject.message ?? dataObject.Message ?? "Unknown";
      const exception = new errorSchema.ctor(message);
      await this.deserializeHttpMessage(errorSchema, context, response, dataObject);
      const output = {};
      for (const [name, member] of ns.structIterator()) {
        const target = member.getMergedTraits().jsonName ?? name;
        output[name] = this.codec.createDeserializer().readObject(member, dataObject[target]);
      }
      Object.assign(exception, {
        $metadata: metadata,
        $response: response,
        $fault: ns.getMergedTraits().error,
        message,
        ...output
      });
      throw exception;
    }
  };
  var AwsJson1_0Protocol = class extends AwsJsonRpcProtocol {
    static {
      __name(this, "AwsJson1_0Protocol");
    }
    constructor({ defaultNamespace }) {
      super({
        defaultNamespace
      });
    }
    getShapeId() {
      return "aws.protocols#awsJson1_0";
    }
    getJsonRpcVersion() {
      return "1.0";
    }
  };
  var AwsJson1_1Protocol = class extends AwsJsonRpcProtocol {
    static {
      __name(this, "AwsJson1_1Protocol");
    }
    constructor({ defaultNamespace }) {
      super({
        defaultNamespace
      });
    }
    getShapeId() {
      return "aws.protocols#awsJson1_1";
    }
    getJsonRpcVersion() {
      return "1.1";
    }
  };
  var import_protocols2 = require_protocols();
  var import_schema4 = require_schema();
  var import_util_body_length_browser2 = require_dist_cjs15();
  var AwsRestJsonProtocol = class extends import_protocols2.HttpBindingProtocol {
    static {
      __name(this, "AwsRestJsonProtocol");
    }
    serializer;
    deserializer;
    codec;
    constructor({ defaultNamespace }) {
      super({
        defaultNamespace
      });
      const settings = {
        timestampFormat: {
          useTrait: true,
          default: import_schema4.SCHEMA.TIMESTAMP_EPOCH_SECONDS
        },
        httpBindings: true,
        jsonName: true
      };
      this.codec = new JsonCodec(settings);
      this.serializer = new import_protocols2.HttpInterceptingShapeSerializer(this.codec.createSerializer(), settings);
      this.deserializer = new import_protocols2.HttpInterceptingShapeDeserializer(this.codec.createDeserializer(), settings);
    }
    getShapeId() {
      return "aws.protocols#restJson1";
    }
    getPayloadCodec() {
      return this.codec;
    }
    setSerdeContext(serdeContext) {
      this.codec.setSerdeContext(serdeContext);
      super.setSerdeContext(serdeContext);
    }
    async serializeRequest(operationSchema, input, context) {
      const request = await super.serializeRequest(operationSchema, input, context);
      const inputSchema = import_schema4.NormalizedSchema.of(operationSchema.input);
      const members = inputSchema.getMemberSchemas();
      if (!request.headers["content-type"]) {
        const httpPayloadMember = Object.values(members).find((m) => {
          return !!m.getMergedTraits().httpPayload;
        });
        if (httpPayloadMember) {
          const mediaType = httpPayloadMember.getMergedTraits().mediaType;
          if (mediaType) {
            request.headers["content-type"] = mediaType;
          } else if (httpPayloadMember.isStringSchema()) {
            request.headers["content-type"] = "text/plain";
          } else if (httpPayloadMember.isBlobSchema()) {
            request.headers["content-type"] = "application/octet-stream";
          } else {
            request.headers["content-type"] = "application/json";
          }
        } else if (!inputSchema.isUnitSchema()) {
          const hasBody = Object.values(members).find((m) => {
            const { httpQuery, httpQueryParams, httpHeader, httpLabel, httpPrefixHeaders } = m.getMergedTraits();
            return !httpQuery && !httpQueryParams && !httpHeader && !httpLabel && httpPrefixHeaders === undefined;
          });
          if (hasBody) {
            request.headers["content-type"] = "application/json";
          }
        }
      }
      if (request.headers["content-type"] && !request.body) {
        request.body = "{}";
      }
      if (request.body) {
        try {
          request.headers["content-length"] = String((0, import_util_body_length_browser2.calculateBodyLength)(request.body));
        } catch (e) {}
      }
      return request;
    }
    async handleError(operationSchema, context, response, dataObject, metadata) {
      const errorIdentifier = loadRestJsonErrorCode(response, dataObject) ?? "Unknown";
      let namespace = this.options.defaultNamespace;
      let errorName = errorIdentifier;
      if (errorIdentifier.includes("#")) {
        [namespace, errorName] = errorIdentifier.split("#");
      }
      const registry = import_schema4.TypeRegistry.for(namespace);
      let errorSchema;
      try {
        errorSchema = registry.getSchema(errorIdentifier);
      } catch (e) {
        const baseExceptionSchema = import_schema4.TypeRegistry.for("smithy.ts.sdk.synthetic." + namespace).getBaseException();
        if (baseExceptionSchema) {
          const ErrorCtor = baseExceptionSchema.ctor;
          throw Object.assign(new ErrorCtor(errorName), dataObject);
        }
        throw new Error(errorName);
      }
      const ns = import_schema4.NormalizedSchema.of(errorSchema);
      const message = dataObject.message ?? dataObject.Message ?? "Unknown";
      const exception = new errorSchema.ctor(message);
      await this.deserializeHttpMessage(errorSchema, context, response, dataObject);
      const output = {};
      for (const [name, member] of ns.structIterator()) {
        const target = member.getMergedTraits().jsonName ?? name;
        output[name] = this.codec.createDeserializer().readObject(member, dataObject[target]);
      }
      Object.assign(exception, {
        $metadata: metadata,
        $response: response,
        $fault: ns.getMergedTraits().error,
        message,
        ...output
      });
      throw exception;
    }
  };
  var import_smithy_client2 = require_dist_cjs13();
  var awsExpectUnion = /* @__PURE__ */ __name((value) => {
    if (value == null) {
      return;
    }
    if (typeof value === "object" && "__type" in value) {
      delete value.__type;
    }
    return (0, import_smithy_client2.expectUnion)(value);
  }, "awsExpectUnion");
  var import_protocols5 = require_protocols();
  var import_schema7 = require_schema();
  var import_util_body_length_browser3 = require_dist_cjs15();
  var import_protocols3 = require_protocols();
  var import_schema5 = require_schema();
  var import_smithy_client3 = require_dist_cjs13();
  var import_util_utf8 = require_dist_cjs5();
  var import_fast_xml_parser = require_fxp();
  var XmlShapeDeserializer = class extends SerdeContextConfig {
    constructor(settings) {
      super();
      this.settings = settings;
      this.stringDeserializer = new import_protocols3.FromStringShapeDeserializer(settings);
    }
    static {
      __name(this, "XmlShapeDeserializer");
    }
    stringDeserializer;
    setSerdeContext(serdeContext) {
      this.serdeContext = serdeContext;
      this.stringDeserializer.setSerdeContext(serdeContext);
    }
    read(schema, bytes, key) {
      const ns = import_schema5.NormalizedSchema.of(schema);
      const memberSchemas = ns.getMemberSchemas();
      const isEventPayload = ns.isStructSchema() && ns.isMemberSchema() && !!Object.values(memberSchemas).find((memberNs) => {
        return !!memberNs.getMemberTraits().eventPayload;
      });
      if (isEventPayload) {
        const output = {};
        const memberName = Object.keys(memberSchemas)[0];
        const eventMemberSchema = memberSchemas[memberName];
        if (eventMemberSchema.isBlobSchema()) {
          output[memberName] = bytes;
        } else {
          output[memberName] = this.read(memberSchemas[memberName], bytes);
        }
        return output;
      }
      const xmlString = (this.serdeContext?.utf8Encoder ?? import_util_utf8.toUtf8)(bytes);
      const parsedObject = this.parseXml(xmlString);
      return this.readSchema(schema, key ? parsedObject[key] : parsedObject);
    }
    readSchema(_schema, value) {
      const ns = import_schema5.NormalizedSchema.of(_schema);
      const traits = ns.getMergedTraits();
      const schema = ns.getSchema();
      if (ns.isListSchema() && !Array.isArray(value)) {
        return this.readSchema(schema, [value]);
      }
      if (value == null) {
        return value;
      }
      if (typeof value === "object") {
        const sparse = !!traits.sparse;
        const flat = !!traits.xmlFlattened;
        if (ns.isListSchema()) {
          const listValue = ns.getValueSchema();
          const buffer2 = [];
          const sourceKey = listValue.getMergedTraits().xmlName ?? "member";
          const source = flat ? value : (value[0] ?? value)[sourceKey];
          const sourceArray = Array.isArray(source) ? source : [source];
          for (const v of sourceArray) {
            if (v != null || sparse) {
              buffer2.push(this.readSchema(listValue, v));
            }
          }
          return buffer2;
        }
        const buffer = {};
        if (ns.isMapSchema()) {
          const keyNs = ns.getKeySchema();
          const memberNs = ns.getValueSchema();
          let entries;
          if (flat) {
            entries = Array.isArray(value) ? value : [value];
          } else {
            entries = Array.isArray(value.entry) ? value.entry : [value.entry];
          }
          const keyProperty = keyNs.getMergedTraits().xmlName ?? "key";
          const valueProperty = memberNs.getMergedTraits().xmlName ?? "value";
          for (const entry of entries) {
            const key = entry[keyProperty];
            const value2 = entry[valueProperty];
            if (value2 != null || sparse) {
              buffer[key] = this.readSchema(memberNs, value2);
            }
          }
          return buffer;
        }
        if (ns.isStructSchema()) {
          for (const [memberName, memberSchema] of ns.structIterator()) {
            const memberTraits = memberSchema.getMergedTraits();
            const xmlObjectKey = !memberTraits.httpPayload ? memberSchema.getMemberTraits().xmlName ?? memberName : memberTraits.xmlName ?? memberSchema.getName();
            if (value[xmlObjectKey] != null) {
              buffer[memberName] = this.readSchema(memberSchema, value[xmlObjectKey]);
            }
          }
          return buffer;
        }
        if (ns.isDocumentSchema()) {
          return value;
        }
        throw new Error(`@aws-sdk/core/protocols - xml deserializer unhandled schema type for ${ns.getName(true)}`);
      } else {
        if (ns.isListSchema()) {
          return [];
        } else if (ns.isMapSchema() || ns.isStructSchema()) {
          return {};
        }
        return this.stringDeserializer.read(ns, value);
      }
    }
    parseXml(xml) {
      if (xml.length) {
        const parser = new import_fast_xml_parser.XMLParser({
          attributeNamePrefix: "",
          htmlEntities: true,
          ignoreAttributes: false,
          ignoreDeclaration: true,
          parseTagValue: false,
          trimValues: false,
          tagValueProcessor: /* @__PURE__ */ __name((_, val2) => val2.trim() === "" && val2.includes(`
`) ? "" : undefined, "tagValueProcessor")
        });
        parser.addEntity("#xD", "\r");
        parser.addEntity("#10", `
`);
        let parsedObj;
        try {
          parsedObj = parser.parse(xml, true);
        } catch (e) {
          if (e && typeof e === "object") {
            Object.defineProperty(e, "$responseBodyText", {
              value: xml
            });
          }
          throw e;
        }
        const textNodeName = "#text";
        const key = Object.keys(parsedObj)[0];
        const parsedObjToReturn = parsedObj[key];
        if (parsedObjToReturn[textNodeName]) {
          parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
          delete parsedObjToReturn[textNodeName];
        }
        return (0, import_smithy_client3.getValueFromTextNode)(parsedObjToReturn);
      }
      return {};
    }
  };
  var import_protocols4 = require_protocols();
  var import_schema6 = require_schema();
  var import_serde6 = require_serde();
  var import_smithy_client4 = require_dist_cjs13();
  var import_util_base642 = require_dist_cjs6();
  var QueryShapeSerializer = class extends SerdeContextConfig {
    constructor(settings) {
      super();
      this.settings = settings;
    }
    static {
      __name(this, "QueryShapeSerializer");
    }
    buffer;
    write(schema, value, prefix = "") {
      if (this.buffer === undefined) {
        this.buffer = "";
      }
      const ns = import_schema6.NormalizedSchema.of(schema);
      if (prefix && !prefix.endsWith(".")) {
        prefix += ".";
      }
      if (ns.isBlobSchema()) {
        if (typeof value === "string" || value instanceof Uint8Array) {
          this.writeKey(prefix);
          this.writeValue((this.serdeContext?.base64Encoder ?? import_util_base642.toBase64)(value));
        }
      } else if (ns.isBooleanSchema() || ns.isNumericSchema() || ns.isStringSchema()) {
        if (value != null) {
          this.writeKey(prefix);
          this.writeValue(String(value));
        }
      } else if (ns.isBigIntegerSchema()) {
        if (value != null) {
          this.writeKey(prefix);
          this.writeValue(String(value));
        }
      } else if (ns.isBigDecimalSchema()) {
        if (value != null) {
          this.writeKey(prefix);
          this.writeValue(value instanceof import_serde6.NumericValue ? value.string : String(value));
        }
      } else if (ns.isTimestampSchema()) {
        if (value instanceof Date) {
          this.writeKey(prefix);
          const format = (0, import_protocols4.determineTimestampFormat)(ns, this.settings);
          switch (format) {
            case import_schema6.SCHEMA.TIMESTAMP_DATE_TIME:
              this.writeValue(value.toISOString().replace(".000Z", "Z"));
              break;
            case import_schema6.SCHEMA.TIMESTAMP_HTTP_DATE:
              this.writeValue((0, import_smithy_client4.dateToUtcString)(value));
              break;
            case import_schema6.SCHEMA.TIMESTAMP_EPOCH_SECONDS:
              this.writeValue(String(value.getTime() / 1000));
              break;
          }
        }
      } else if (ns.isDocumentSchema()) {
        throw new Error(`@aws-sdk/core/protocols - QuerySerializer unsupported document type ${ns.getName(true)}`);
      } else if (ns.isListSchema()) {
        if (Array.isArray(value)) {
          if (value.length === 0) {
            if (this.settings.serializeEmptyLists) {
              this.writeKey(prefix);
              this.writeValue("");
            }
          } else {
            const member = ns.getValueSchema();
            const flat = this.settings.flattenLists || ns.getMergedTraits().xmlFlattened;
            let i = 1;
            for (const item of value) {
              if (item == null) {
                continue;
              }
              const suffix = this.getKey("member", member.getMergedTraits().xmlName);
              const key = flat ? `${prefix}${i}` : `${prefix}${suffix}.${i}`;
              this.write(member, item, key);
              ++i;
            }
          }
        }
      } else if (ns.isMapSchema()) {
        if (value && typeof value === "object") {
          const keySchema = ns.getKeySchema();
          const memberSchema = ns.getValueSchema();
          const flat = ns.getMergedTraits().xmlFlattened;
          let i = 1;
          for (const [k, v] of Object.entries(value)) {
            if (v == null) {
              continue;
            }
            const keySuffix = this.getKey("key", keySchema.getMergedTraits().xmlName);
            const key = flat ? `${prefix}${i}.${keySuffix}` : `${prefix}entry.${i}.${keySuffix}`;
            const valueSuffix = this.getKey("value", memberSchema.getMergedTraits().xmlName);
            const valueKey = flat ? `${prefix}${i}.${valueSuffix}` : `${prefix}entry.${i}.${valueSuffix}`;
            this.write(keySchema, k, key);
            this.write(memberSchema, v, valueKey);
            ++i;
          }
        }
      } else if (ns.isStructSchema()) {
        if (value && typeof value === "object") {
          for (const [memberName, member] of ns.structIterator()) {
            if (value[memberName] == null) {
              continue;
            }
            const suffix = this.getKey(memberName, member.getMergedTraits().xmlName);
            const key = `${prefix}${suffix}`;
            this.write(member, value[memberName], key);
          }
        }
      } else if (ns.isUnitSchema()) {} else {
        throw new Error(`@aws-sdk/core/protocols - QuerySerializer unrecognized schema type ${ns.getName(true)}`);
      }
    }
    flush() {
      if (this.buffer === undefined) {
        throw new Error("@aws-sdk/core/protocols - QuerySerializer cannot flush with nothing written to buffer.");
      }
      const str = this.buffer;
      delete this.buffer;
      return str;
    }
    getKey(memberName, xmlName) {
      const key = xmlName ?? memberName;
      if (this.settings.capitalizeKeys) {
        return key[0].toUpperCase() + key.slice(1);
      }
      return key;
    }
    writeKey(key) {
      if (key.endsWith(".")) {
        key = key.slice(0, key.length - 1);
      }
      this.buffer += `&${(0, import_protocols4.extendedEncodeURIComponent)(key)}=`;
    }
    writeValue(value) {
      this.buffer += (0, import_protocols4.extendedEncodeURIComponent)(value);
    }
  };
  var AwsQueryProtocol = class extends import_protocols5.RpcProtocol {
    constructor(options) {
      super({
        defaultNamespace: options.defaultNamespace
      });
      this.options = options;
      const settings = {
        timestampFormat: {
          useTrait: true,
          default: import_schema7.SCHEMA.TIMESTAMP_DATE_TIME
        },
        httpBindings: false,
        xmlNamespace: options.xmlNamespace,
        serviceNamespace: options.defaultNamespace,
        serializeEmptyLists: true
      };
      this.serializer = new QueryShapeSerializer(settings);
      this.deserializer = new XmlShapeDeserializer(settings);
    }
    static {
      __name(this, "AwsQueryProtocol");
    }
    serializer;
    deserializer;
    getShapeId() {
      return "aws.protocols#awsQuery";
    }
    setSerdeContext(serdeContext) {
      this.serializer.setSerdeContext(serdeContext);
      this.deserializer.setSerdeContext(serdeContext);
    }
    getPayloadCodec() {
      throw new Error("AWSQuery protocol has no payload codec.");
    }
    async serializeRequest(operationSchema, input, context) {
      const request = await super.serializeRequest(operationSchema, input, context);
      if (!request.path.endsWith("/")) {
        request.path += "/";
      }
      Object.assign(request.headers, {
        "content-type": `application/x-www-form-urlencoded`
      });
      if ((0, import_schema7.deref)(operationSchema.input) === "unit" || !request.body) {
        request.body = "";
      }
      request.body = `Action=${operationSchema.name.split("#")[1]}&Version=${this.options.version}` + request.body;
      if (request.body.endsWith("&")) {
        request.body = request.body.slice(-1);
      }
      try {
        request.headers["content-length"] = String((0, import_util_body_length_browser3.calculateBodyLength)(request.body));
      } catch (e) {}
      return request;
    }
    async deserializeResponse(operationSchema, context, response) {
      const deserializer = this.deserializer;
      const ns = import_schema7.NormalizedSchema.of(operationSchema.output);
      const dataObject = {};
      if (response.statusCode >= 300) {
        const bytes2 = await (0, import_protocols5.collectBody)(response.body, context);
        if (bytes2.byteLength > 0) {
          Object.assign(dataObject, await deserializer.read(import_schema7.SCHEMA.DOCUMENT, bytes2));
        }
        await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
      }
      for (const header in response.headers) {
        const value = response.headers[header];
        delete response.headers[header];
        response.headers[header.toLowerCase()] = value;
      }
      const awsQueryResultKey = ns.isStructSchema() && this.useNestedResult() ? operationSchema.name.split("#")[1] + "Result" : undefined;
      const bytes = await (0, import_protocols5.collectBody)(response.body, context);
      if (bytes.byteLength > 0) {
        Object.assign(dataObject, await deserializer.read(ns, bytes, awsQueryResultKey));
      }
      const output = {
        $metadata: this.deserializeMetadata(response),
        ...dataObject
      };
      return output;
    }
    useNestedResult() {
      return true;
    }
    async handleError(operationSchema, context, response, dataObject, metadata) {
      const errorIdentifier = this.loadQueryErrorCode(response, dataObject) ?? "Unknown";
      let namespace = this.options.defaultNamespace;
      let errorName = errorIdentifier;
      if (errorIdentifier.includes("#")) {
        [namespace, errorName] = errorIdentifier.split("#");
      }
      const errorDataSource = this.loadQueryError(dataObject);
      const registry = import_schema7.TypeRegistry.for(namespace);
      let errorSchema;
      try {
        errorSchema = registry.find((schema) => import_schema7.NormalizedSchema.of(schema).getMergedTraits().awsQueryError?.[0] === errorName);
        if (!errorSchema) {
          errorSchema = registry.getSchema(errorIdentifier);
        }
      } catch (e) {
        const baseExceptionSchema = import_schema7.TypeRegistry.for("smithy.ts.sdk.synthetic." + namespace).getBaseException();
        if (baseExceptionSchema) {
          const ErrorCtor = baseExceptionSchema.ctor;
          throw Object.assign(new ErrorCtor(errorName), errorDataSource);
        }
        throw new Error(errorName);
      }
      const ns = import_schema7.NormalizedSchema.of(errorSchema);
      const message = this.loadQueryErrorMessage(dataObject);
      const exception = new errorSchema.ctor(message);
      const output = {};
      for (const [name, member] of ns.structIterator()) {
        const target = member.getMergedTraits().xmlName ?? name;
        const value = errorDataSource[target] ?? dataObject[target];
        output[name] = this.deserializer.readSchema(member, value);
      }
      Object.assign(exception, {
        $metadata: metadata,
        $response: response,
        $fault: ns.getMergedTraits().error,
        message,
        ...output
      });
      throw exception;
    }
    loadQueryErrorCode(output, data) {
      const code = (data.Errors?.[0]?.Error ?? data.Errors?.Error ?? data.Error)?.Code;
      if (code !== undefined) {
        return code;
      }
      if (output.statusCode == 404) {
        return "NotFound";
      }
    }
    loadQueryError(data) {
      return data.Errors?.[0]?.Error ?? data.Errors?.Error ?? data.Error;
    }
    loadQueryErrorMessage(data) {
      const errorData = this.loadQueryError(data);
      return errorData?.message ?? errorData?.Message ?? data.message ?? data.Message ?? "Unknown";
    }
  };
  var AwsEc2QueryProtocol = class extends AwsQueryProtocol {
    constructor(options) {
      super(options);
      this.options = options;
      const ec2Settings = {
        capitalizeKeys: true,
        flattenLists: true,
        serializeEmptyLists: false
      };
      Object.assign(this.serializer.settings, ec2Settings);
    }
    static {
      __name(this, "AwsEc2QueryProtocol");
    }
    useNestedResult() {
      return false;
    }
  };
  var import_protocols6 = require_protocols();
  var import_schema9 = require_schema();
  var import_util_body_length_browser4 = require_dist_cjs15();
  var import_smithy_client5 = require_dist_cjs13();
  var import_fast_xml_parser2 = require_fxp();
  var parseXmlBody = /* @__PURE__ */ __name((streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
    if (encoded.length) {
      const parser = new import_fast_xml_parser2.XMLParser({
        attributeNamePrefix: "",
        htmlEntities: true,
        ignoreAttributes: false,
        ignoreDeclaration: true,
        parseTagValue: false,
        trimValues: false,
        tagValueProcessor: /* @__PURE__ */ __name((_, val2) => val2.trim() === "" && val2.includes(`
`) ? "" : undefined, "tagValueProcessor")
      });
      parser.addEntity("#xD", "\r");
      parser.addEntity("#10", `
`);
      let parsedObj;
      try {
        parsedObj = parser.parse(encoded, true);
      } catch (e) {
        if (e && typeof e === "object") {
          Object.defineProperty(e, "$responseBodyText", {
            value: encoded
          });
        }
        throw e;
      }
      const textNodeName = "#text";
      const key = Object.keys(parsedObj)[0];
      const parsedObjToReturn = parsedObj[key];
      if (parsedObjToReturn[textNodeName]) {
        parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
        delete parsedObjToReturn[textNodeName];
      }
      return (0, import_smithy_client5.getValueFromTextNode)(parsedObjToReturn);
    }
    return {};
  }), "parseXmlBody");
  var parseXmlErrorBody = /* @__PURE__ */ __name(async (errorBody, context) => {
    const value = await parseXmlBody(errorBody, context);
    if (value.Error) {
      value.Error.message = value.Error.message ?? value.Error.Message;
    }
    return value;
  }, "parseXmlErrorBody");
  var loadRestXmlErrorCode = /* @__PURE__ */ __name((output, data) => {
    if (data?.Error?.Code !== undefined) {
      return data.Error.Code;
    }
    if (data?.Code !== undefined) {
      return data.Code;
    }
    if (output.statusCode == 404) {
      return "NotFound";
    }
  }, "loadRestXmlErrorCode");
  var import_xml_builder = require_dist_cjs16();
  var import_schema8 = require_schema();
  var import_serde7 = require_serde();
  var import_smithy_client6 = require_dist_cjs13();
  var import_util_base643 = require_dist_cjs6();
  var XmlShapeSerializer = class extends SerdeContextConfig {
    constructor(settings) {
      super();
      this.settings = settings;
    }
    static {
      __name(this, "XmlShapeSerializer");
    }
    stringBuffer;
    byteBuffer;
    buffer;
    write(schema, value) {
      const ns = import_schema8.NormalizedSchema.of(schema);
      if (ns.isStringSchema() && typeof value === "string") {
        this.stringBuffer = value;
      } else if (ns.isBlobSchema()) {
        this.byteBuffer = "byteLength" in value ? value : (this.serdeContext?.base64Decoder ?? import_util_base643.fromBase64)(value);
      } else {
        this.buffer = this.writeStruct(ns, value, undefined);
        const traits = ns.getMergedTraits();
        if (traits.httpPayload && !traits.xmlName) {
          this.buffer.withName(ns.getName());
        }
      }
    }
    flush() {
      if (this.byteBuffer !== undefined) {
        const bytes = this.byteBuffer;
        delete this.byteBuffer;
        return bytes;
      }
      if (this.stringBuffer !== undefined) {
        const str = this.stringBuffer;
        delete this.stringBuffer;
        return str;
      }
      const buffer = this.buffer;
      if (this.settings.xmlNamespace) {
        if (!buffer?.attributes?.["xmlns"]) {
          buffer.addAttribute("xmlns", this.settings.xmlNamespace);
        }
      }
      delete this.buffer;
      return buffer.toString();
    }
    writeStruct(ns, value, parentXmlns) {
      const traits = ns.getMergedTraits();
      const name = ns.isMemberSchema() && !traits.httpPayload ? ns.getMemberTraits().xmlName ?? ns.getMemberName() : traits.xmlName ?? ns.getName();
      if (!name || !ns.isStructSchema()) {
        throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write struct with empty name or non-struct, schema=${ns.getName(true)}.`);
      }
      const structXmlNode = import_xml_builder.XmlNode.of(name);
      const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(ns, parentXmlns);
      if (xmlns) {
        structXmlNode.addAttribute(xmlnsAttr, xmlns);
      }
      for (const [memberName, memberSchema] of ns.structIterator()) {
        const val2 = value[memberName];
        if (val2 != null) {
          if (memberSchema.getMergedTraits().xmlAttribute) {
            structXmlNode.addAttribute(memberSchema.getMergedTraits().xmlName ?? memberName, this.writeSimple(memberSchema, val2));
            continue;
          }
          if (memberSchema.isListSchema()) {
            this.writeList(memberSchema, val2, structXmlNode, xmlns);
          } else if (memberSchema.isMapSchema()) {
            this.writeMap(memberSchema, val2, structXmlNode, xmlns);
          } else if (memberSchema.isStructSchema()) {
            structXmlNode.addChildNode(this.writeStruct(memberSchema, val2, xmlns));
          } else {
            const memberNode = import_xml_builder.XmlNode.of(memberSchema.getMergedTraits().xmlName ?? memberSchema.getMemberName());
            this.writeSimpleInto(memberSchema, val2, memberNode, xmlns);
            structXmlNode.addChildNode(memberNode);
          }
        }
      }
      return structXmlNode;
    }
    writeList(listMember, array, container, parentXmlns) {
      if (!listMember.isMemberSchema()) {
        throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member list: ${listMember.getName(true)}`);
      }
      const listTraits = listMember.getMergedTraits();
      const listValueSchema = listMember.getValueSchema();
      const listValueTraits = listValueSchema.getMergedTraits();
      const sparse = !!listValueTraits.sparse;
      const flat = !!listTraits.xmlFlattened;
      const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(listMember, parentXmlns);
      const writeItem = /* @__PURE__ */ __name((container2, value) => {
        if (listValueSchema.isListSchema()) {
          this.writeList(listValueSchema, Array.isArray(value) ? value : [value], container2, xmlns);
        } else if (listValueSchema.isMapSchema()) {
          this.writeMap(listValueSchema, value, container2, xmlns);
        } else if (listValueSchema.isStructSchema()) {
          const struct = this.writeStruct(listValueSchema, value, xmlns);
          container2.addChildNode(struct.withName(flat ? listTraits.xmlName ?? listMember.getMemberName() : listValueTraits.xmlName ?? "member"));
        } else {
          const listItemNode = import_xml_builder.XmlNode.of(flat ? listTraits.xmlName ?? listMember.getMemberName() : listValueTraits.xmlName ?? "member");
          this.writeSimpleInto(listValueSchema, value, listItemNode, xmlns);
          container2.addChildNode(listItemNode);
        }
      }, "writeItem");
      if (flat) {
        for (const value of array) {
          if (sparse || value != null) {
            writeItem(container, value);
          }
        }
      } else {
        const listNode = import_xml_builder.XmlNode.of(listTraits.xmlName ?? listMember.getMemberName());
        if (xmlns) {
          listNode.addAttribute(xmlnsAttr, xmlns);
        }
        for (const value of array) {
          if (sparse || value != null) {
            writeItem(listNode, value);
          }
        }
        container.addChildNode(listNode);
      }
    }
    writeMap(mapMember, map, container, parentXmlns, containerIsMap = false) {
      if (!mapMember.isMemberSchema()) {
        throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member map: ${mapMember.getName(true)}`);
      }
      const mapTraits = mapMember.getMergedTraits();
      const mapKeySchema = mapMember.getKeySchema();
      const mapKeyTraits = mapKeySchema.getMergedTraits();
      const keyTag = mapKeyTraits.xmlName ?? "key";
      const mapValueSchema = mapMember.getValueSchema();
      const mapValueTraits = mapValueSchema.getMergedTraits();
      const valueTag = mapValueTraits.xmlName ?? "value";
      const sparse = !!mapValueTraits.sparse;
      const flat = !!mapTraits.xmlFlattened;
      const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(mapMember, parentXmlns);
      const addKeyValue = /* @__PURE__ */ __name((entry, key, val2) => {
        const keyNode = import_xml_builder.XmlNode.of(keyTag, key);
        const [keyXmlnsAttr, keyXmlns] = this.getXmlnsAttribute(mapKeySchema, xmlns);
        if (keyXmlns) {
          keyNode.addAttribute(keyXmlnsAttr, keyXmlns);
        }
        entry.addChildNode(keyNode);
        let valueNode = import_xml_builder.XmlNode.of(valueTag);
        if (mapValueSchema.isListSchema()) {
          this.writeList(mapValueSchema, val2, valueNode, xmlns);
        } else if (mapValueSchema.isMapSchema()) {
          this.writeMap(mapValueSchema, val2, valueNode, xmlns, true);
        } else if (mapValueSchema.isStructSchema()) {
          valueNode = this.writeStruct(mapValueSchema, val2, xmlns);
        } else {
          this.writeSimpleInto(mapValueSchema, val2, valueNode, xmlns);
        }
        entry.addChildNode(valueNode);
      }, "addKeyValue");
      if (flat) {
        for (const [key, val2] of Object.entries(map)) {
          if (sparse || val2 != null) {
            const entry = import_xml_builder.XmlNode.of(mapTraits.xmlName ?? mapMember.getMemberName());
            addKeyValue(entry, key, val2);
            container.addChildNode(entry);
          }
        }
      } else {
        let mapNode;
        if (!containerIsMap) {
          mapNode = import_xml_builder.XmlNode.of(mapTraits.xmlName ?? mapMember.getMemberName());
          if (xmlns) {
            mapNode.addAttribute(xmlnsAttr, xmlns);
          }
          container.addChildNode(mapNode);
        }
        for (const [key, val2] of Object.entries(map)) {
          if (sparse || val2 != null) {
            const entry = import_xml_builder.XmlNode.of("entry");
            addKeyValue(entry, key, val2);
            (containerIsMap ? container : mapNode).addChildNode(entry);
          }
        }
      }
    }
    writeSimple(_schema, value) {
      if (value === null) {
        throw new Error("@aws-sdk/core/protocols - (XML serializer) cannot write null value.");
      }
      const ns = import_schema8.NormalizedSchema.of(_schema);
      let nodeContents = null;
      if (value && typeof value === "object") {
        if (ns.isBlobSchema()) {
          nodeContents = (this.serdeContext?.base64Encoder ?? import_util_base643.toBase64)(value);
        } else if (ns.isTimestampSchema() && value instanceof Date) {
          const options = this.settings.timestampFormat;
          const format = options.useTrait ? ns.getSchema() === import_schema8.SCHEMA.TIMESTAMP_DEFAULT ? options.default : ns.getSchema() ?? options.default : options.default;
          switch (format) {
            case import_schema8.SCHEMA.TIMESTAMP_DATE_TIME:
              nodeContents = value.toISOString().replace(".000Z", "Z");
              break;
            case import_schema8.SCHEMA.TIMESTAMP_HTTP_DATE:
              nodeContents = (0, import_smithy_client6.dateToUtcString)(value);
              break;
            case import_schema8.SCHEMA.TIMESTAMP_EPOCH_SECONDS:
              nodeContents = String(value.getTime() / 1000);
              break;
            default:
              console.warn("Missing timestamp format, using http date", value);
              nodeContents = (0, import_smithy_client6.dateToUtcString)(value);
              break;
          }
        } else if (ns.isBigDecimalSchema() && value) {
          if (value instanceof import_serde7.NumericValue) {
            return value.string;
          }
          return String(value);
        } else if (ns.isMapSchema() || ns.isListSchema()) {
          throw new Error("@aws-sdk/core/protocols - xml serializer, cannot call _write() on List/Map schema, call writeList or writeMap() instead.");
        } else {
          throw new Error(`@aws-sdk/core/protocols - xml serializer, unhandled schema type for object value and schema: ${ns.getName(true)}`);
        }
      }
      if (ns.isStringSchema() || ns.isBooleanSchema() || ns.isNumericSchema() || ns.isBigIntegerSchema() || ns.isBigDecimalSchema()) {
        nodeContents = String(value);
      }
      if (nodeContents === null) {
        throw new Error(`Unhandled schema-value pair ${ns.getName(true)}=${value}`);
      }
      return nodeContents;
    }
    writeSimpleInto(_schema, value, into, parentXmlns) {
      const nodeContents = this.writeSimple(_schema, value);
      const ns = import_schema8.NormalizedSchema.of(_schema);
      const content = new import_xml_builder.XmlText(nodeContents);
      const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(ns, parentXmlns);
      if (xmlns) {
        into.addAttribute(xmlnsAttr, xmlns);
      }
      into.addChildNode(content);
    }
    getXmlnsAttribute(ns, parentXmlns) {
      const traits = ns.getMergedTraits();
      const [prefix, xmlns] = traits.xmlNamespace ?? [];
      if (xmlns && xmlns !== parentXmlns) {
        return [prefix ? `xmlns:${prefix}` : "xmlns", xmlns];
      }
      return [undefined, undefined];
    }
  };
  var XmlCodec = class extends SerdeContextConfig {
    constructor(settings) {
      super();
      this.settings = settings;
    }
    static {
      __name(this, "XmlCodec");
    }
    createSerializer() {
      const serializer = new XmlShapeSerializer(this.settings);
      serializer.setSerdeContext(this.serdeContext);
      return serializer;
    }
    createDeserializer() {
      const deserializer = new XmlShapeDeserializer(this.settings);
      deserializer.setSerdeContext(this.serdeContext);
      return deserializer;
    }
  };
  var AwsRestXmlProtocol = class extends import_protocols6.HttpBindingProtocol {
    static {
      __name(this, "AwsRestXmlProtocol");
    }
    codec;
    serializer;
    deserializer;
    constructor(options) {
      super(options);
      const settings = {
        timestampFormat: {
          useTrait: true,
          default: import_schema9.SCHEMA.TIMESTAMP_DATE_TIME
        },
        httpBindings: true,
        xmlNamespace: options.xmlNamespace,
        serviceNamespace: options.defaultNamespace
      };
      this.codec = new XmlCodec(settings);
      this.serializer = new import_protocols6.HttpInterceptingShapeSerializer(this.codec.createSerializer(), settings);
      this.deserializer = new import_protocols6.HttpInterceptingShapeDeserializer(this.codec.createDeserializer(), settings);
    }
    getPayloadCodec() {
      return this.codec;
    }
    getShapeId() {
      return "aws.protocols#restXml";
    }
    async serializeRequest(operationSchema, input, context) {
      const request = await super.serializeRequest(operationSchema, input, context);
      const ns = import_schema9.NormalizedSchema.of(operationSchema.input);
      const members = ns.getMemberSchemas();
      request.path = String(request.path).split("/").filter((segment) => {
        return segment !== "{Bucket}";
      }).join("/") || "/";
      if (!request.headers["content-type"]) {
        const httpPayloadMember = Object.values(members).find((m) => {
          return !!m.getMergedTraits().httpPayload;
        });
        if (httpPayloadMember) {
          const mediaType = httpPayloadMember.getMergedTraits().mediaType;
          if (mediaType) {
            request.headers["content-type"] = mediaType;
          } else if (httpPayloadMember.isStringSchema()) {
            request.headers["content-type"] = "text/plain";
          } else if (httpPayloadMember.isBlobSchema()) {
            request.headers["content-type"] = "application/octet-stream";
          } else {
            request.headers["content-type"] = "application/xml";
          }
        } else if (!ns.isUnitSchema()) {
          const hasBody = Object.values(members).find((m) => {
            const { httpQuery, httpQueryParams, httpHeader, httpLabel, httpPrefixHeaders } = m.getMergedTraits();
            return !httpQuery && !httpQueryParams && !httpHeader && !httpLabel && httpPrefixHeaders === undefined;
          });
          if (hasBody) {
            request.headers["content-type"] = "application/xml";
          }
        }
      }
      if (request.headers["content-type"] === "application/xml") {
        if (typeof request.body === "string") {
          request.body = '<?xml version="1.0" encoding="UTF-8"?>' + request.body;
        }
      }
      if (request.body) {
        try {
          request.headers["content-length"] = String((0, import_util_body_length_browser4.calculateBodyLength)(request.body));
        } catch (e) {}
      }
      return request;
    }
    async deserializeResponse(operationSchema, context, response) {
      return super.deserializeResponse(operationSchema, context, response);
    }
    async handleError(operationSchema, context, response, dataObject, metadata) {
      const errorIdentifier = loadRestXmlErrorCode(response, dataObject) ?? "Unknown";
      let namespace = this.options.defaultNamespace;
      let errorName = errorIdentifier;
      if (errorIdentifier.includes("#")) {
        [namespace, errorName] = errorIdentifier.split("#");
      }
      const registry = import_schema9.TypeRegistry.for(namespace);
      let errorSchema;
      try {
        errorSchema = registry.getSchema(errorIdentifier);
      } catch (e) {
        const baseExceptionSchema = import_schema9.TypeRegistry.for("smithy.ts.sdk.synthetic." + namespace).getBaseException();
        if (baseExceptionSchema) {
          const ErrorCtor = baseExceptionSchema.ctor;
          throw Object.assign(new ErrorCtor(errorName), dataObject);
        }
        throw new Error(errorName);
      }
      const ns = import_schema9.NormalizedSchema.of(errorSchema);
      const message = dataObject.Error?.message ?? dataObject.Error?.Message ?? dataObject.message ?? dataObject.Message ?? "Unknown";
      const exception = new errorSchema.ctor(message);
      await this.deserializeHttpMessage(errorSchema, context, response, dataObject);
      const output = {};
      for (const [name, member] of ns.structIterator()) {
        const target = member.getMergedTraits().xmlName ?? name;
        const value = dataObject.Error?.[target] ?? dataObject[target];
        output[name] = this.codec.createDeserializer().readSchema(member, value);
      }
      Object.assign(exception, {
        $metadata: metadata,
        $response: response,
        $fault: ns.getMergedTraits().error,
        message,
        ...output
      });
      throw exception;
    }
  };
});

// ../../../../node_modules/@aws-sdk/core/dist-cjs/index.js
var require_dist_cjs17 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require_tslib();
  tslib_1.__exportStar(require_client(), exports);
  tslib_1.__exportStar(require_httpAuthSchemes(), exports);
  tslib_1.__exportStar(require_protocols2(), exports);
});

// ../../../../node_modules/uuid/dist/rng.js
var require_rng = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = rng;
  var _crypto = _interopRequireDefault(__require("crypto"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var rnds8Pool = new Uint8Array(256);
  var poolPtr = rnds8Pool.length;
  function rng() {
    if (poolPtr > rnds8Pool.length - 16) {
      _crypto.default.randomFillSync(rnds8Pool);
      poolPtr = 0;
    }
    return rnds8Pool.slice(poolPtr, poolPtr += 16);
  }
});

// ../../../../node_modules/uuid/dist/regex.js
var require_regex = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  exports.default = _default;
});

// ../../../../node_modules/uuid/dist/validate.js
var require_validate = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _regex = _interopRequireDefault(require_regex());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function validate(uuid) {
    return typeof uuid === "string" && _regex.default.test(uuid);
  }
  var _default = validate;
  exports.default = _default;
});

// ../../../../node_modules/uuid/dist/stringify.js
var require_stringify = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  exports.unsafeStringify = unsafeStringify;
  var _validate = _interopRequireDefault(require_validate());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var byteToHex = [];
  for (let i = 0;i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
  }
  function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset);
    if (!(0, _validate.default)(uuid)) {
      throw TypeError("Stringified UUID is invalid");
    }
    return uuid;
  }
  var _default = stringify;
  exports.default = _default;
});

// ../../../../node_modules/uuid/dist/v1.js
var require_v1 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _rng = _interopRequireDefault(require_rng());
  var _stringify = require_stringify();
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var _nodeId;
  var _clockseq;
  var _lastMSecs = 0;
  var _lastNSecs = 0;
  function v1(options, buf, offset) {
    let i = buf && offset || 0;
    const b = buf || new Array(16);
    options = options || {};
    let node = options.node || _nodeId;
    let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;
    if (node == null || clockseq == null) {
      const seedBytes = options.random || (options.rng || _rng.default)();
      if (node == null) {
        node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
      }
      if (clockseq == null) {
        clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
      }
    }
    let msecs = options.msecs !== undefined ? options.msecs : Date.now();
    let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
    const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
    if (dt < 0 && options.clockseq === undefined) {
      clockseq = clockseq + 1 & 16383;
    }
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
      nsecs = 0;
    }
    if (nsecs >= 1e4) {
      throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;
    msecs += 12219292800000;
    const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
    b[i++] = tl >>> 24 & 255;
    b[i++] = tl >>> 16 & 255;
    b[i++] = tl >>> 8 & 255;
    b[i++] = tl & 255;
    const tmh = msecs / 4294967296 * 1e4 & 268435455;
    b[i++] = tmh >>> 8 & 255;
    b[i++] = tmh & 255;
    b[i++] = tmh >>> 24 & 15 | 16;
    b[i++] = tmh >>> 16 & 255;
    b[i++] = clockseq >>> 8 | 128;
    b[i++] = clockseq & 255;
    for (let n = 0;n < 6; ++n) {
      b[i + n] = node[n];
    }
    return buf || (0, _stringify.unsafeStringify)(b);
  }
  var _default = v1;
  exports.default = _default;
});

// ../../../../node_modules/uuid/dist/parse.js
var require_parse = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _validate = _interopRequireDefault(require_validate());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function parse(uuid) {
    if (!(0, _validate.default)(uuid)) {
      throw TypeError("Invalid UUID");
    }
    let v;
    const arr = new Uint8Array(16);
    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = v >>> 16 & 255;
    arr[2] = v >>> 8 & 255;
    arr[3] = v & 255;
    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v & 255;
    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v & 255;
    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v & 255;
    arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
    arr[11] = v / 4294967296 & 255;
    arr[12] = v >>> 24 & 255;
    arr[13] = v >>> 16 & 255;
    arr[14] = v >>> 8 & 255;
    arr[15] = v & 255;
    return arr;
  }
  var _default = parse;
  exports.default = _default;
});

// ../../../../node_modules/uuid/dist/v35.js
var require_v35 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.URL = exports.DNS = undefined;
  exports.default = v35;
  var _stringify = require_stringify();
  var _parse = _interopRequireDefault(require_parse());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function stringToBytes(str) {
    str = unescape(encodeURIComponent(str));
    const bytes = [];
    for (let i = 0;i < str.length; ++i) {
      bytes.push(str.charCodeAt(i));
    }
    return bytes;
  }
  var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
  exports.DNS = DNS;
  var URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  exports.URL = URL;
  function v35(name, version, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
      var _namespace;
      if (typeof value === "string") {
        value = stringToBytes(value);
      }
      if (typeof namespace === "string") {
        namespace = (0, _parse.default)(namespace);
      }
      if (((_namespace = namespace) === null || _namespace === undefined ? undefined : _namespace.length) !== 16) {
        throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
      }
      let bytes = new Uint8Array(16 + value.length);
      bytes.set(namespace);
      bytes.set(value, namespace.length);
      bytes = hashfunc(bytes);
      bytes[6] = bytes[6] & 15 | version;
      bytes[8] = bytes[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (let i = 0;i < 16; ++i) {
          buf[offset + i] = bytes[i];
        }
        return buf;
      }
      return (0, _stringify.unsafeStringify)(bytes);
    }
    try {
      generateUUID.name = name;
    } catch (err) {}
    generateUUID.DNS = DNS;
    generateUUID.URL = URL;
    return generateUUID;
  }
});

// ../../../../node_modules/uuid/dist/md5.js
var require_md5 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _crypto = _interopRequireDefault(__require("crypto"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function md5(bytes) {
    if (Array.isArray(bytes)) {
      bytes = Buffer.from(bytes);
    } else if (typeof bytes === "string") {
      bytes = Buffer.from(bytes, "utf8");
    }
    return _crypto.default.createHash("md5").update(bytes).digest();
  }
  var _default = md5;
  exports.default = _default;
});

// ../../../../node_modules/uuid/dist/v3.js
var require_v3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _v = _interopRequireDefault(require_v35());
  var _md = _interopRequireDefault(require_md5());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var v3 = (0, _v.default)("v3", 48, _md.default);
  var _default = v3;
  exports.default = _default;
});

// ../../../../node_modules/uuid/dist/native.js
var require_native = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _crypto = _interopRequireDefault(__require("crypto"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var _default = {
    randomUUID: _crypto.default.randomUUID
  };
  exports.default = _default;
});

// ../../../../node_modules/uuid/dist/v4.js
var require_v4 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _native = _interopRequireDefault(require_native());
  var _rng = _interopRequireDefault(require_rng());
  var _stringify = require_stringify();
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function v4(options, buf, offset) {
    if (_native.default.randomUUID && !buf && !options) {
      return _native.default.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || _rng.default)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0;i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return (0, _stringify.unsafeStringify)(rnds);
  }
  var _default = v4;
  exports.default = _default;
});

// ../../../../node_modules/uuid/dist/sha1.js
var require_sha1 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _crypto = _interopRequireDefault(__require("crypto"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function sha1(bytes) {
    if (Array.isArray(bytes)) {
      bytes = Buffer.from(bytes);
    } else if (typeof bytes === "string") {
      bytes = Buffer.from(bytes, "utf8");
    }
    return _crypto.default.createHash("sha1").update(bytes).digest();
  }
  var _default = sha1;
  exports.default = _default;
});

// ../../../../node_modules/uuid/dist/v5.js
var require_v5 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _v = _interopRequireDefault(require_v35());
  var _sha = _interopRequireDefault(require_sha1());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var v5 = (0, _v.default)("v5", 80, _sha.default);
  var _default = v5;
  exports.default = _default;
});

// ../../../../node_modules/uuid/dist/nil.js
var require_nil = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _default = "00000000-0000-0000-0000-000000000000";
  exports.default = _default;
});

// ../../../../node_modules/uuid/dist/version.js
var require_version = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _validate = _interopRequireDefault(require_validate());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function version(uuid) {
    if (!(0, _validate.default)(uuid)) {
      throw TypeError("Invalid UUID");
    }
    return parseInt(uuid.slice(14, 15), 16);
  }
  var _default = version;
  exports.default = _default;
});

// ../../../../node_modules/uuid/dist/index.js
var require_dist = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "NIL", {
    enumerable: true,
    get: function() {
      return _nil.default;
    }
  });
  Object.defineProperty(exports, "parse", {
    enumerable: true,
    get: function() {
      return _parse.default;
    }
  });
  Object.defineProperty(exports, "stringify", {
    enumerable: true,
    get: function() {
      return _stringify.default;
    }
  });
  Object.defineProperty(exports, "v1", {
    enumerable: true,
    get: function() {
      return _v.default;
    }
  });
  Object.defineProperty(exports, "v3", {
    enumerable: true,
    get: function() {
      return _v2.default;
    }
  });
  Object.defineProperty(exports, "v4", {
    enumerable: true,
    get: function() {
      return _v3.default;
    }
  });
  Object.defineProperty(exports, "v5", {
    enumerable: true,
    get: function() {
      return _v4.default;
    }
  });
  Object.defineProperty(exports, "validate", {
    enumerable: true,
    get: function() {
      return _validate.default;
    }
  });
  Object.defineProperty(exports, "version", {
    enumerable: true,
    get: function() {
      return _version.default;
    }
  });
  var _v = _interopRequireDefault(require_v1());
  var _v2 = _interopRequireDefault(require_v3());
  var _v3 = _interopRequireDefault(require_v4());
  var _v4 = _interopRequireDefault(require_v5());
  var _nil = _interopRequireDefault(require_nil());
  var _version = _interopRequireDefault(require_version());
  var _validate = _interopRequireDefault(require_validate());
  var _stringify = _interopRequireDefault(require_stringify());
  var _parse = _interopRequireDefault(require_parse());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
});

export { require_tslib, require_dist_cjs10 as require_dist_cjs, require_dist_cjs11 as require_dist_cjs1, require_dist_cjs13 as require_dist_cjs2, require_dist_cjs17 as require_dist_cjs3, require_dist };
