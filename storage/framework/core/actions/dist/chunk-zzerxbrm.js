// ../../../../node_modules/@smithy/property-provider/dist-es/ProviderError.js
class ProviderError extends Error {
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
    Object.setPrototypeOf(this, ProviderError.prototype);
    logger?.debug?.(`@smithy/property-provider ${tryNextLink ? "->" : "(!)"} ${message}`);
  }
  static from(error, options = true) {
    return Object.assign(new this(error.message, options), error);
  }
}

// ../../../../node_modules/@smithy/property-provider/dist-es/CredentialsProviderError.js
class CredentialsProviderError extends ProviderError {
  constructor(message, options = true) {
    super(message, options);
    this.name = "CredentialsProviderError";
    Object.setPrototypeOf(this, CredentialsProviderError.prototype);
  }
}
// ../../../../node_modules/@smithy/property-provider/dist-es/TokenProviderError.js
class TokenProviderError extends ProviderError {
  constructor(message, options = true) {
    super(message, options);
    this.name = "TokenProviderError";
    Object.setPrototypeOf(this, TokenProviderError.prototype);
  }
}
// ../../../../node_modules/@smithy/property-provider/dist-es/chain.js
var chain = (...providers) => async () => {
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
};
// ../../../../node_modules/@smithy/property-provider/dist-es/fromStatic.js
var fromStatic = (staticValue) => () => Promise.resolve(staticValue);
// ../../../../node_modules/@smithy/property-provider/dist-es/memoize.js
var memoize = (provider, isExpired, requiresRefresh) => {
  let resolved;
  let pending;
  let hasResult;
  let isConstant = false;
  const coalesceProvider = async () => {
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
  };
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
};
export { ProviderError, CredentialsProviderError, TokenProviderError, chain, fromStatic, memoize };
