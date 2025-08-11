import {
  getProfileName,
  loadSharedConfigFiles
} from "./chunk-0be2fzx4.js";
import {
  CredentialsProviderError,
  chain,
  fromStatic,
  memoize
} from "./chunk-zzerxbrm.js";

// ../../../../node_modules/@smithy/node-config-provider/dist-es/getSelectorName.js
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

// ../../../../node_modules/@smithy/node-config-provider/dist-es/fromEnv.js
var fromEnv = (envVarSelector, options) => async () => {
  try {
    const config = envVarSelector(process.env, options);
    if (config === undefined) {
      throw new Error;
    }
    return config;
  } catch (e) {
    throw new CredentialsProviderError(e.message || `Not found in ENV: ${getSelectorName(envVarSelector.toString())}`, { logger: options?.logger });
  }
};

// ../../../../node_modules/@smithy/node-config-provider/dist-es/fromSharedConfigFiles.js
var fromSharedConfigFiles = (configSelector, { preferredFile = "config", ...init } = {}) => async () => {
  const profile = getProfileName(init);
  const { configFile, credentialsFile } = await loadSharedConfigFiles(init);
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
    throw new CredentialsProviderError(e.message || `Not found in config files w/ profile [${profile}]: ${getSelectorName(configSelector.toString())}`, { logger: init.logger });
  }
};

// ../../../../node_modules/@smithy/node-config-provider/dist-es/fromStatic.js
var isFunction = (func) => typeof func === "function";
var fromStatic2 = (defaultValue) => isFunction(defaultValue) ? async () => await defaultValue() : fromStatic(defaultValue);

// ../../../../node_modules/@smithy/node-config-provider/dist-es/configLoader.js
var loadConfig = ({ environmentVariableSelector, configFileSelector, default: defaultValue }, configuration = {}) => {
  const { signingName, logger } = configuration;
  const envOptions = { signingName, logger };
  return memoize(chain(fromEnv(environmentVariableSelector, envOptions), fromSharedConfigFiles(configFileSelector, configuration), fromStatic2(defaultValue)));
};
// ../../../../node_modules/@smithy/querystring-parser/dist-es/index.js
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

// ../../../../node_modules/@smithy/url-parser/dist-es/index.js
var parseUrl = (url) => {
  if (typeof url === "string") {
    return parseUrl(new URL(url));
  }
  const { hostname, pathname, port, protocol, search } = url;
  let query;
  if (search) {
    query = parseQueryString(search);
  }
  return {
    hostname,
    port: port ? parseInt(port) : undefined,
    protocol,
    path: pathname,
    query
  };
};

export { loadConfig, parseUrl };
