import {
  __commonJS
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/@smithy/property-provider/dist-cjs/index.js
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
    CredentialsProviderError: () => CredentialsProviderError,
    ProviderError: () => ProviderError,
    TokenProviderError: () => TokenProviderError,
    chain: () => chain,
    fromStatic: () => fromStatic,
    memoize: () => memoize
  });
  module.exports = __toCommonJS(src_exports);
  var ProviderError = class _ProviderError extends Error {
    constructor(message, options = true) {
      let logger;
      let tryNextLink = true;
      if (typeof options === "boolean") {
        logger = undefined;
        tryNextLink = options;
      } else if (options != null && typeof options === "object") {
        logger = options.logger;
        tryNextLink = options.tryNextLink ?? true;
      }
      super(message);
      this.name = "ProviderError";
      this.tryNextLink = tryNextLink;
      Object.setPrototypeOf(this, _ProviderError.prototype);
      logger?.debug?.(`@smithy/property-provider ${tryNextLink ? "->" : "(!)"} ${message}`);
    }
    static {
      __name(this, "ProviderError");
    }
    static from(error, options = true) {
      return Object.assign(new this(error.message, options), error);
    }
  };
  var CredentialsProviderError = class _CredentialsProviderError extends ProviderError {
    constructor(message, options = true) {
      super(message, options);
      this.name = "CredentialsProviderError";
      Object.setPrototypeOf(this, _CredentialsProviderError.prototype);
    }
    static {
      __name(this, "CredentialsProviderError");
    }
  };
  var TokenProviderError = class _TokenProviderError extends ProviderError {
    constructor(message, options = true) {
      super(message, options);
      this.name = "TokenProviderError";
      Object.setPrototypeOf(this, _TokenProviderError.prototype);
    }
    static {
      __name(this, "TokenProviderError");
    }
  };
  var chain = /* @__PURE__ */ __name((...providers) => async () => {
    if (providers.length === 0) {
      throw new ProviderError("No providers in chain");
    }
    let lastProviderError;
    for (const provider of providers) {
      try {
        const credentials = await provider();
        return credentials;
      } catch (err) {
        lastProviderError = err;
        if (err?.tryNextLink) {
          continue;
        }
        throw err;
      }
    }
    throw lastProviderError;
  }, "chain");
  var fromStatic = /* @__PURE__ */ __name((staticValue) => () => Promise.resolve(staticValue), "fromStatic");
  var memoize = /* @__PURE__ */ __name((provider, isExpired, requiresRefresh) => {
    let resolved;
    let pending;
    let hasResult;
    let isConstant = false;
    const coalesceProvider = /* @__PURE__ */ __name(async () => {
      if (!pending) {
        pending = provider();
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
          resolved = await coalesceProvider();
        }
        return resolved;
      };
    }
    return async (options) => {
      if (!hasResult || options?.forceRefresh) {
        resolved = await coalesceProvider();
      }
      if (isConstant) {
        return resolved;
      }
      if (requiresRefresh && !requiresRefresh(resolved)) {
        isConstant = true;
        return resolved;
      }
      if (isExpired(resolved)) {
        await coalesceProvider();
        return resolved;
      }
      return resolved;
    };
  }, "memoize");
});

export { require_dist_cjs };
