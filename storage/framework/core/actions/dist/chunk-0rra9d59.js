import {
  __commonJS
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

export { require_dist_cjs };
