import {
  IniSectionType
} from "./chunk-rmkvxtg1.js";

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/getProfileName.js
var ENV_PROFILE = "AWS_PROFILE";
var DEFAULT_PROFILE = "default";
var getProfileName = (init) => init.profile || process.env[ENV_PROFILE] || DEFAULT_PROFILE;

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/getConfigFilepath.js
import { join } from "path";

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/getHomeDir.js
import { homedir } from "os";
import { sep } from "path";
var homeDirCache = {};
var getHomeDirCacheKey = () => {
  if (process && process.geteuid) {
    return `${process.geteuid()}`;
  }
  return "DEFAULT";
};
var getHomeDir = () => {
  const { HOME, USERPROFILE, HOMEPATH, HOMEDRIVE = `C:${sep}` } = process.env;
  if (HOME)
    return HOME;
  if (USERPROFILE)
    return USERPROFILE;
  if (HOMEPATH)
    return `${HOMEDRIVE}${HOMEPATH}`;
  const homeDirCacheKey = getHomeDirCacheKey();
  if (!homeDirCache[homeDirCacheKey])
    homeDirCache[homeDirCacheKey] = homedir();
  return homeDirCache[homeDirCacheKey];
};

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/getConfigFilepath.js
var ENV_CONFIG_PATH = "AWS_CONFIG_FILE";
var getConfigFilepath = () => process.env[ENV_CONFIG_PATH] || join(getHomeDir(), ".aws", "config");

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/loadSharedConfigFiles.js
import { join as join3 } from "path";

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/getConfigData.js
var getConfigData = (data) => Object.entries(data).filter(([key]) => {
  const indexOfSeparator = key.indexOf(CONFIG_PREFIX_SEPARATOR);
  if (indexOfSeparator === -1) {
    return false;
  }
  return Object.values(IniSectionType).includes(key.substring(0, indexOfSeparator));
}).reduce((acc, [key, value]) => {
  const indexOfSeparator = key.indexOf(CONFIG_PREFIX_SEPARATOR);
  const updatedKey = key.substring(0, indexOfSeparator) === IniSectionType.PROFILE ? key.substring(indexOfSeparator + 1) : key;
  acc[updatedKey] = value;
  return acc;
}, {
  ...data.default && { default: data.default }
});

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/getCredentialsFilepath.js
import { join as join2 } from "path";
var ENV_CREDENTIALS_PATH = "AWS_SHARED_CREDENTIALS_FILE";
var getCredentialsFilepath = () => process.env[ENV_CREDENTIALS_PATH] || join2(getHomeDir(), ".aws", "credentials");

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/parseIni.js
var prefixKeyRegex = /^([\w-]+)\s(["'])?([\w-@\+\.%:/]+)\2$/;
var profileNameBlockList = ["__proto__", "profile __proto__"];
var parseIni = (iniData) => {
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
        if (Object.values(IniSectionType).includes(prefix)) {
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
};

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/slurpFile.js
import { promises as fsPromises } from "fs";
var { readFile } = fsPromises;
var filePromisesHash = {};
var slurpFile = (path, options) => {
  if (!filePromisesHash[path] || options?.ignoreCache) {
    filePromisesHash[path] = readFile(path, "utf8");
  }
  return filePromisesHash[path];
};

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/loadSharedConfigFiles.js
var swallowError = () => ({});
var CONFIG_PREFIX_SEPARATOR = ".";
var loadSharedConfigFiles = async (init = {}) => {
  const { filepath = getCredentialsFilepath(), configFilepath = getConfigFilepath() } = init;
  const homeDir = getHomeDir();
  const relativeHomeDirPrefix = "~/";
  let resolvedFilepath = filepath;
  if (filepath.startsWith(relativeHomeDirPrefix)) {
    resolvedFilepath = join3(homeDir, filepath.slice(2));
  }
  let resolvedConfigFilepath = configFilepath;
  if (configFilepath.startsWith(relativeHomeDirPrefix)) {
    resolvedConfigFilepath = join3(homeDir, configFilepath.slice(2));
  }
  const parsedFiles = await Promise.all([
    slurpFile(resolvedConfigFilepath, {
      ignoreCache: init.ignoreCache
    }).then(parseIni).then(getConfigData).catch(swallowError),
    slurpFile(resolvedFilepath, {
      ignoreCache: init.ignoreCache
    }).then(parseIni).catch(swallowError)
  ]);
  return {
    configFile: parsedFiles[0],
    credentialsFile: parsedFiles[1]
  };
};

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/getSsoSessionData.js
var getSsoSessionData = (data) => Object.entries(data).filter(([key]) => key.startsWith(IniSectionType.SSO_SESSION + CONFIG_PREFIX_SEPARATOR)).reduce((acc, [key, value]) => ({ ...acc, [key.substring(key.indexOf(CONFIG_PREFIX_SEPARATOR) + 1)]: value }), {});

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/loadSsoSessionData.js
var swallowError2 = () => ({});
var loadSsoSessionData = async (init = {}) => slurpFile(init.configFilepath ?? getConfigFilepath()).then(parseIni).then(getSsoSessionData).catch(swallowError2);

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/mergeConfigFiles.js
var mergeConfigFiles = (...files) => {
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
};

// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/parseKnownFiles.js
var parseKnownFiles = async (init) => {
  const parsedFiles = await loadSharedConfigFiles(init);
  return mergeConfigFiles(parsedFiles.configFile, parsedFiles.credentialsFile);
};
// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/getSSOTokenFilepath.js
import { createHash } from "crypto";
import { join as join4 } from "path";
var getSSOTokenFilepath = (id) => {
  const hasher = createHash("sha1");
  const cacheName = hasher.update(id).digest("hex");
  return join4(getHomeDir(), ".aws", "sso", "cache", `${cacheName}.json`);
};
// ../../../../node_modules/@smithy/shared-ini-file-loader/dist-es/getSSOTokenFromFile.js
import { promises as fsPromises2 } from "fs";
var { readFile: readFile2 } = fsPromises2;
var getSSOTokenFromFile = async (id) => {
  const ssoTokenFilepath = getSSOTokenFilepath(id);
  const ssoTokenText = await readFile2(ssoTokenFilepath, "utf8");
  return JSON.parse(ssoTokenText);
};
export { ENV_PROFILE, getProfileName, getSSOTokenFilepath, getSSOTokenFromFile, CONFIG_PREFIX_SEPARATOR, loadSharedConfigFiles, loadSsoSessionData, parseKnownFiles };
