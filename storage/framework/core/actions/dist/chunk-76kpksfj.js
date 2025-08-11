// @bun
import {
  require_dist_cjs as require_dist_cjs10,
  require_dist_cjs1 as require_dist_cjs11,
  require_dist_cjs10 as require_dist_cjs20,
  require_dist_cjs11 as require_dist_cjs21,
  require_dist_cjs12 as require_dist_cjs22,
  require_dist_cjs13 as require_dist_cjs23,
  require_dist_cjs14 as require_dist_cjs24,
  require_dist_cjs15 as require_dist_cjs25,
  require_dist_cjs16 as require_dist_cjs26,
  require_dist_cjs17 as require_dist_cjs27,
  require_dist_cjs2 as require_dist_cjs12,
  require_dist_cjs3 as require_dist_cjs13,
  require_dist_cjs4 as require_dist_cjs14,
  require_dist_cjs5 as require_dist_cjs15,
  require_dist_cjs6 as require_dist_cjs16,
  require_dist_cjs7 as require_dist_cjs17,
  require_dist_cjs8 as require_dist_cjs18,
  require_dist_cjs9 as require_dist_cjs19,
  require_package
} from "./chunk-8b41hapn.js";
import {
  require_dist_cjs as require_dist_cjs3,
  require_dist_cjs1 as require_dist_cjs7,
  require_dist_cjs3 as require_dist_cjs8,
  require_dist_cjs4 as require_dist_cjs9,
  require_tslib
} from "./chunk-59xy0bjy.js";
import {
  require_dist_cjs1 as require_dist_cjs,
  require_dist_cjs2,
  require_dist_cjs5 as require_dist_cjs4,
  require_dist_cjs6 as require_dist_cjs5,
  require_dist_cjs8 as require_dist_cjs6
} from "./chunk-f1zsgfmr.js";
import"./chunk-n2a7wn2k.js";
import {
  __commonJS
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/auth/httpAuthSchemeProvider.js
var require_httpAuthSchemeProvider = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.resolveHttpAuthSchemeConfig = exports.defaultSSOOIDCHttpAuthSchemeProvider = exports.defaultSSOOIDCHttpAuthSchemeParametersProvider = undefined;
  var core_1 = require_dist_cjs9();
  var util_middleware_1 = require_dist_cjs();
  var defaultSSOOIDCHttpAuthSchemeParametersProvider = async (config, context, input) => {
    return {
      operation: (0, util_middleware_1.getSmithyContext)(context).operation,
      region: await (0, util_middleware_1.normalizeProvider)(config.region)() || (() => {
        throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
      })()
    };
  };
  exports.defaultSSOOIDCHttpAuthSchemeParametersProvider = defaultSSOOIDCHttpAuthSchemeParametersProvider;
  function createAwsAuthSigv4HttpAuthOption(authParameters) {
    return {
      schemeId: "aws.auth#sigv4",
      signingProperties: {
        name: "sso-oauth",
        region: authParameters.region
      },
      propertiesExtractor: (config, context) => ({
        signingProperties: {
          config,
          context
        }
      })
    };
  }
  function createSmithyApiNoAuthHttpAuthOption(authParameters) {
    return {
      schemeId: "smithy.api#noAuth"
    };
  }
  var defaultSSOOIDCHttpAuthSchemeProvider = (authParameters) => {
    const options = [];
    switch (authParameters.operation) {
      case "CreateToken": {
        options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
        break;
      }
      default: {
        options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
      }
    }
    return options;
  };
  exports.defaultSSOOIDCHttpAuthSchemeProvider = defaultSSOOIDCHttpAuthSchemeProvider;
  var resolveHttpAuthSchemeConfig = (config) => {
    const config_0 = (0, core_1.resolveAwsSdkSigV4Config)(config);
    return Object.assign(config_0, {
      authSchemePreference: (0, util_middleware_1.normalizeProvider)(config.authSchemePreference ?? [])
    });
  };
  exports.resolveHttpAuthSchemeConfig = resolveHttpAuthSchemeConfig;
});

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/endpoint/ruleset.js
var require_ruleset = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ruleSet = undefined;
  var u = "required";
  var v = "fn";
  var w = "argv";
  var x = "ref";
  var a = true;
  var b = "isSet";
  var c = "booleanEquals";
  var d = "error";
  var e = "endpoint";
  var f = "tree";
  var g = "PartitionResult";
  var h = "getAttr";
  var i = { [u]: false, type: "String" };
  var j = { [u]: true, default: false, type: "Boolean" };
  var k = { [x]: "Endpoint" };
  var l = { [v]: c, [w]: [{ [x]: "UseFIPS" }, true] };
  var m = { [v]: c, [w]: [{ [x]: "UseDualStack" }, true] };
  var n = {};
  var o = { [v]: h, [w]: [{ [x]: g }, "supportsFIPS"] };
  var p = { [x]: g };
  var q = { [v]: c, [w]: [true, { [v]: h, [w]: [p, "supportsDualStack"] }] };
  var r = [l];
  var s = [m];
  var t = [{ [x]: "Region" }];
  var _data = { version: "1.0", parameters: { Region: i, UseDualStack: j, UseFIPS: j, Endpoint: i }, rules: [{ conditions: [{ [v]: b, [w]: [k] }], rules: [{ conditions: r, error: "Invalid Configuration: FIPS and custom endpoint are not supported", type: d }, { conditions: s, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", type: d }, { endpoint: { url: k, properties: n, headers: n }, type: e }], type: f }, { conditions: [{ [v]: b, [w]: t }], rules: [{ conditions: [{ [v]: "aws.partition", [w]: t, assign: g }], rules: [{ conditions: [l, m], rules: [{ conditions: [{ [v]: c, [w]: [a, o] }, q], rules: [{ endpoint: { url: "https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: n, headers: n }, type: e }], type: f }, { error: "FIPS and DualStack are enabled, but this partition does not support one or both", type: d }], type: f }, { conditions: r, rules: [{ conditions: [{ [v]: c, [w]: [o, a] }], rules: [{ conditions: [{ [v]: "stringEquals", [w]: [{ [v]: h, [w]: [p, "name"] }, "aws-us-gov"] }], endpoint: { url: "https://oidc.{Region}.amazonaws.com", properties: n, headers: n }, type: e }, { endpoint: { url: "https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}", properties: n, headers: n }, type: e }], type: f }, { error: "FIPS is enabled but this partition does not support FIPS", type: d }], type: f }, { conditions: s, rules: [{ conditions: [q], rules: [{ endpoint: { url: "https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: n, headers: n }, type: e }], type: f }, { error: "DualStack is enabled but this partition does not support DualStack", type: d }], type: f }, { endpoint: { url: "https://oidc.{Region}.{PartitionResult#dnsSuffix}", properties: n, headers: n }, type: e }], type: f }], type: f }, { error: "Invalid Configuration: Missing Region", type: d }] };
  exports.ruleSet = _data;
});

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/endpoint/endpointResolver.js
var require_endpointResolver = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.defaultEndpointResolver = undefined;
  var util_endpoints_1 = require_dist_cjs14();
  var util_endpoints_2 = require_dist_cjs13();
  var ruleset_1 = require_ruleset();
  var cache = new util_endpoints_2.EndpointCache({
    size: 50,
    params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
  });
  var defaultEndpointResolver = (endpointParams, context = {}) => {
    return cache.get(endpointParams, () => (0, util_endpoints_2.resolveEndpoint)(ruleset_1.ruleSet, {
      endpointParams,
      logger: context.logger
    }));
  };
  exports.defaultEndpointResolver = defaultEndpointResolver;
  util_endpoints_2.customEndpointFunctions.aws = util_endpoints_1.awsEndpointFunctions;
});

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/runtimeConfig.shared.js
var require_runtimeConfig_shared = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getRuntimeConfig = undefined;
  var core_1 = require_dist_cjs9();
  var core_2 = require_dist_cjs7();
  var smithy_client_1 = require_dist_cjs8();
  var url_parser_1 = require_dist_cjs19();
  var util_base64_1 = require_dist_cjs5();
  var util_utf8_1 = require_dist_cjs4();
  var httpAuthSchemeProvider_1 = require_httpAuthSchemeProvider();
  var endpointResolver_1 = require_endpointResolver();
  var getRuntimeConfig = (config) => {
    return {
      apiVersion: "2019-06-10",
      base64Decoder: config?.base64Decoder ?? util_base64_1.fromBase64,
      base64Encoder: config?.base64Encoder ?? util_base64_1.toBase64,
      disableHostPrefix: config?.disableHostPrefix ?? false,
      endpointProvider: config?.endpointProvider ?? endpointResolver_1.defaultEndpointResolver,
      extensions: config?.extensions ?? [],
      httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? httpAuthSchemeProvider_1.defaultSSOOIDCHttpAuthSchemeProvider,
      httpAuthSchemes: config?.httpAuthSchemes ?? [
        {
          schemeId: "aws.auth#sigv4",
          identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
          signer: new core_1.AwsSdkSigV4Signer
        },
        {
          schemeId: "smithy.api#noAuth",
          identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
          signer: new core_2.NoAuthSigner
        }
      ],
      logger: config?.logger ?? new smithy_client_1.NoOpLogger,
      serviceId: config?.serviceId ?? "SSO OIDC",
      urlParser: config?.urlParser ?? url_parser_1.parseUrl,
      utf8Decoder: config?.utf8Decoder ?? util_utf8_1.fromUtf8,
      utf8Encoder: config?.utf8Encoder ?? util_utf8_1.toUtf8
    };
  };
  exports.getRuntimeConfig = getRuntimeConfig;
});

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/runtimeConfig.js
var require_runtimeConfig = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getRuntimeConfig = undefined;
  var tslib_1 = require_tslib();
  var package_json_1 = tslib_1.__importDefault(require_package());
  var core_1 = require_dist_cjs9();
  var util_user_agent_node_1 = require_dist_cjs23();
  var config_resolver_1 = require_dist_cjs16();
  var hash_node_1 = require_dist_cjs24();
  var middleware_retry_1 = require_dist_cjs22();
  var node_config_provider_1 = require_dist_cjs18();
  var node_http_handler_1 = require_dist_cjs6();
  var util_body_length_node_1 = require_dist_cjs25();
  var util_retry_1 = require_dist_cjs21();
  var runtimeConfig_shared_1 = require_runtimeConfig_shared();
  var smithy_client_1 = require_dist_cjs8();
  var util_defaults_mode_node_1 = require_dist_cjs26();
  var smithy_client_2 = require_dist_cjs8();
  var getRuntimeConfig = (config) => {
    (0, smithy_client_2.emitWarningIfUnsupportedVersion)(process.version);
    const defaultsMode = (0, util_defaults_mode_node_1.resolveDefaultsModeConfig)(config);
    const defaultConfigProvider = () => defaultsMode().then(smithy_client_1.loadConfigsForDefaultMode);
    const clientSharedValues = (0, runtimeConfig_shared_1.getRuntimeConfig)(config);
    (0, core_1.emitWarningIfUnsupportedVersion)(process.version);
    const loaderConfig = {
      profile: config?.profile,
      logger: clientSharedValues.logger
    };
    return {
      ...clientSharedValues,
      ...config,
      runtime: "node",
      defaultsMode,
      authSchemePreference: config?.authSchemePreference ?? (0, node_config_provider_1.loadConfig)(core_1.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
      bodyLengthChecker: config?.bodyLengthChecker ?? util_body_length_node_1.calculateBodyLength,
      defaultUserAgentProvider: config?.defaultUserAgentProvider ?? (0, util_user_agent_node_1.createDefaultUserAgentProvider)({ serviceId: clientSharedValues.serviceId, clientVersion: package_json_1.default.version }),
      maxAttempts: config?.maxAttempts ?? (0, node_config_provider_1.loadConfig)(middleware_retry_1.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
      region: config?.region ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_REGION_CONFIG_OPTIONS, { ...config_resolver_1.NODE_REGION_CONFIG_FILE_OPTIONS, ...loaderConfig }),
      requestHandler: node_http_handler_1.NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
      retryMode: config?.retryMode ?? (0, node_config_provider_1.loadConfig)({
        ...middleware_retry_1.NODE_RETRY_MODE_CONFIG_OPTIONS,
        default: async () => (await defaultConfigProvider()).retryMode || util_retry_1.DEFAULT_RETRY_MODE
      }, config),
      sha256: config?.sha256 ?? hash_node_1.Hash.bind(null, "sha256"),
      streamCollector: config?.streamCollector ?? node_http_handler_1.streamCollector,
      useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
      useFipsEndpoint: config?.useFipsEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
      userAgentAppId: config?.userAgentAppId ?? (0, node_config_provider_1.loadConfig)(util_user_agent_node_1.NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
    };
  };
  exports.getRuntimeConfig = getRuntimeConfig;
});

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/index.js
var require_sso_oidc = __commonJS((exports, module) => {
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
    $Command: () => import_smithy_client6.Command,
    AccessDeniedException: () => AccessDeniedException,
    AuthorizationPendingException: () => AuthorizationPendingException,
    CreateTokenCommand: () => CreateTokenCommand,
    CreateTokenRequestFilterSensitiveLog: () => CreateTokenRequestFilterSensitiveLog,
    CreateTokenResponseFilterSensitiveLog: () => CreateTokenResponseFilterSensitiveLog,
    ExpiredTokenException: () => ExpiredTokenException,
    InternalServerException: () => InternalServerException,
    InvalidClientException: () => InvalidClientException,
    InvalidGrantException: () => InvalidGrantException,
    InvalidRequestException: () => InvalidRequestException,
    InvalidScopeException: () => InvalidScopeException,
    SSOOIDC: () => SSOOIDC,
    SSOOIDCClient: () => SSOOIDCClient,
    SSOOIDCServiceException: () => SSOOIDCServiceException,
    SlowDownException: () => SlowDownException,
    UnauthorizedClientException: () => UnauthorizedClientException,
    UnsupportedGrantTypeException: () => UnsupportedGrantTypeException,
    __Client: () => import_smithy_client2.Client
  });
  module.exports = __toCommonJS(index_exports);
  var import_middleware_host_header = require_dist_cjs10();
  var import_middleware_logger = require_dist_cjs11();
  var import_middleware_recursion_detection = require_dist_cjs12();
  var import_middleware_user_agent = require_dist_cjs15();
  var import_config_resolver = require_dist_cjs16();
  var import_core = require_dist_cjs7();
  var import_middleware_content_length = require_dist_cjs17();
  var import_middleware_endpoint = require_dist_cjs20();
  var import_middleware_retry = require_dist_cjs22();
  var import_smithy_client2 = require_dist_cjs8();
  var import_httpAuthSchemeProvider = require_httpAuthSchemeProvider();
  var resolveClientEndpointParameters = /* @__PURE__ */ __name((options) => {
    return Object.assign(options, {
      useDualstackEndpoint: options.useDualstackEndpoint ?? false,
      useFipsEndpoint: options.useFipsEndpoint ?? false,
      defaultSigningName: "sso-oauth"
    });
  }, "resolveClientEndpointParameters");
  var commonParams = {
    UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
    Endpoint: { type: "builtInParams", name: "endpoint" },
    Region: { type: "builtInParams", name: "region" },
    UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
  };
  var import_runtimeConfig = require_runtimeConfig();
  var import_region_config_resolver = require_dist_cjs27();
  var import_protocol_http = require_dist_cjs2();
  var import_smithy_client = require_dist_cjs8();
  var getHttpAuthExtensionConfiguration = /* @__PURE__ */ __name((runtimeConfig) => {
    const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
    let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
    let _credentials = runtimeConfig.credentials;
    return {
      setHttpAuthScheme(httpAuthScheme) {
        const index = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
        if (index === -1) {
          _httpAuthSchemes.push(httpAuthScheme);
        } else {
          _httpAuthSchemes.splice(index, 1, httpAuthScheme);
        }
      },
      httpAuthSchemes() {
        return _httpAuthSchemes;
      },
      setHttpAuthSchemeProvider(httpAuthSchemeProvider) {
        _httpAuthSchemeProvider = httpAuthSchemeProvider;
      },
      httpAuthSchemeProvider() {
        return _httpAuthSchemeProvider;
      },
      setCredentials(credentials) {
        _credentials = credentials;
      },
      credentials() {
        return _credentials;
      }
    };
  }, "getHttpAuthExtensionConfiguration");
  var resolveHttpAuthRuntimeConfig = /* @__PURE__ */ __name((config) => {
    return {
      httpAuthSchemes: config.httpAuthSchemes(),
      httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
      credentials: config.credentials()
    };
  }, "resolveHttpAuthRuntimeConfig");
  var resolveRuntimeExtensions = /* @__PURE__ */ __name((runtimeConfig, extensions) => {
    const extensionConfiguration = Object.assign((0, import_region_config_resolver.getAwsRegionExtensionConfiguration)(runtimeConfig), (0, import_smithy_client.getDefaultExtensionConfiguration)(runtimeConfig), (0, import_protocol_http.getHttpHandlerExtensionConfiguration)(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
    extensions.forEach((extension) => extension.configure(extensionConfiguration));
    return Object.assign(runtimeConfig, (0, import_region_config_resolver.resolveAwsRegionExtensionConfiguration)(extensionConfiguration), (0, import_smithy_client.resolveDefaultRuntimeConfig)(extensionConfiguration), (0, import_protocol_http.resolveHttpHandlerRuntimeConfig)(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
  }, "resolveRuntimeExtensions");
  var SSOOIDCClient = class extends import_smithy_client2.Client {
    static {
      __name(this, "SSOOIDCClient");
    }
    config;
    constructor(...[configuration]) {
      const _config_0 = (0, import_runtimeConfig.getRuntimeConfig)(configuration || {});
      super(_config_0);
      this.initConfig = _config_0;
      const _config_1 = resolveClientEndpointParameters(_config_0);
      const _config_2 = (0, import_middleware_user_agent.resolveUserAgentConfig)(_config_1);
      const _config_3 = (0, import_middleware_retry.resolveRetryConfig)(_config_2);
      const _config_4 = (0, import_config_resolver.resolveRegionConfig)(_config_3);
      const _config_5 = (0, import_middleware_host_header.resolveHostHeaderConfig)(_config_4);
      const _config_6 = (0, import_middleware_endpoint.resolveEndpointConfig)(_config_5);
      const _config_7 = (0, import_httpAuthSchemeProvider.resolveHttpAuthSchemeConfig)(_config_6);
      const _config_8 = resolveRuntimeExtensions(_config_7, configuration?.extensions || []);
      this.config = _config_8;
      this.middlewareStack.use((0, import_middleware_user_agent.getUserAgentPlugin)(this.config));
      this.middlewareStack.use((0, import_middleware_retry.getRetryPlugin)(this.config));
      this.middlewareStack.use((0, import_middleware_content_length.getContentLengthPlugin)(this.config));
      this.middlewareStack.use((0, import_middleware_host_header.getHostHeaderPlugin)(this.config));
      this.middlewareStack.use((0, import_middleware_logger.getLoggerPlugin)(this.config));
      this.middlewareStack.use((0, import_middleware_recursion_detection.getRecursionDetectionPlugin)(this.config));
      this.middlewareStack.use((0, import_core.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config, {
        httpAuthSchemeParametersProvider: import_httpAuthSchemeProvider.defaultSSOOIDCHttpAuthSchemeParametersProvider,
        identityProviderConfigProvider: /* @__PURE__ */ __name(async (config) => new import_core.DefaultIdentityProviderConfig({
          "aws.auth#sigv4": config.credentials
        }), "identityProviderConfigProvider")
      }));
      this.middlewareStack.use((0, import_core.getHttpSigningPlugin)(this.config));
    }
    destroy() {
      super.destroy();
    }
  };
  var import_smithy_client7 = require_dist_cjs8();
  var import_middleware_endpoint2 = require_dist_cjs20();
  var import_middleware_serde = require_dist_cjs3();
  var import_smithy_client6 = require_dist_cjs8();
  var import_smithy_client4 = require_dist_cjs8();
  var import_smithy_client3 = require_dist_cjs8();
  var SSOOIDCServiceException = class _SSOOIDCServiceException extends import_smithy_client3.ServiceException {
    static {
      __name(this, "SSOOIDCServiceException");
    }
    constructor(options) {
      super(options);
      Object.setPrototypeOf(this, _SSOOIDCServiceException.prototype);
    }
  };
  var AccessDeniedException = class _AccessDeniedException extends SSOOIDCServiceException {
    static {
      __name(this, "AccessDeniedException");
    }
    name = "AccessDeniedException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "AccessDeniedException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _AccessDeniedException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  };
  var AuthorizationPendingException = class _AuthorizationPendingException extends SSOOIDCServiceException {
    static {
      __name(this, "AuthorizationPendingException");
    }
    name = "AuthorizationPendingException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "AuthorizationPendingException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _AuthorizationPendingException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  };
  var CreateTokenRequestFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
    ...obj,
    ...obj.clientSecret && { clientSecret: import_smithy_client4.SENSITIVE_STRING },
    ...obj.refreshToken && { refreshToken: import_smithy_client4.SENSITIVE_STRING },
    ...obj.codeVerifier && { codeVerifier: import_smithy_client4.SENSITIVE_STRING }
  }), "CreateTokenRequestFilterSensitiveLog");
  var CreateTokenResponseFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
    ...obj,
    ...obj.accessToken && { accessToken: import_smithy_client4.SENSITIVE_STRING },
    ...obj.refreshToken && { refreshToken: import_smithy_client4.SENSITIVE_STRING },
    ...obj.idToken && { idToken: import_smithy_client4.SENSITIVE_STRING }
  }), "CreateTokenResponseFilterSensitiveLog");
  var ExpiredTokenException = class _ExpiredTokenException extends SSOOIDCServiceException {
    static {
      __name(this, "ExpiredTokenException");
    }
    name = "ExpiredTokenException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "ExpiredTokenException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _ExpiredTokenException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  };
  var InternalServerException = class _InternalServerException extends SSOOIDCServiceException {
    static {
      __name(this, "InternalServerException");
    }
    name = "InternalServerException";
    $fault = "server";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "InternalServerException",
        $fault: "server",
        ...opts
      });
      Object.setPrototypeOf(this, _InternalServerException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  };
  var InvalidClientException = class _InvalidClientException extends SSOOIDCServiceException {
    static {
      __name(this, "InvalidClientException");
    }
    name = "InvalidClientException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "InvalidClientException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _InvalidClientException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  };
  var InvalidGrantException = class _InvalidGrantException extends SSOOIDCServiceException {
    static {
      __name(this, "InvalidGrantException");
    }
    name = "InvalidGrantException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "InvalidGrantException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _InvalidGrantException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  };
  var InvalidRequestException = class _InvalidRequestException extends SSOOIDCServiceException {
    static {
      __name(this, "InvalidRequestException");
    }
    name = "InvalidRequestException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "InvalidRequestException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _InvalidRequestException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  };
  var InvalidScopeException = class _InvalidScopeException extends SSOOIDCServiceException {
    static {
      __name(this, "InvalidScopeException");
    }
    name = "InvalidScopeException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "InvalidScopeException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _InvalidScopeException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  };
  var SlowDownException = class _SlowDownException extends SSOOIDCServiceException {
    static {
      __name(this, "SlowDownException");
    }
    name = "SlowDownException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "SlowDownException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _SlowDownException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  };
  var UnauthorizedClientException = class _UnauthorizedClientException extends SSOOIDCServiceException {
    static {
      __name(this, "UnauthorizedClientException");
    }
    name = "UnauthorizedClientException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "UnauthorizedClientException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _UnauthorizedClientException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  };
  var UnsupportedGrantTypeException = class _UnsupportedGrantTypeException extends SSOOIDCServiceException {
    static {
      __name(this, "UnsupportedGrantTypeException");
    }
    name = "UnsupportedGrantTypeException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "UnsupportedGrantTypeException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _UnsupportedGrantTypeException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  };
  var import_core2 = require_dist_cjs9();
  var import_core3 = require_dist_cjs7();
  var import_smithy_client5 = require_dist_cjs8();
  var se_CreateTokenCommand = /* @__PURE__ */ __name(async (input, context) => {
    const b = (0, import_core3.requestBuilder)(input, context);
    const headers = {
      "content-type": "application/json"
    };
    b.bp("/token");
    let body;
    body = JSON.stringify((0, import_smithy_client5.take)(input, {
      clientId: [],
      clientSecret: [],
      code: [],
      codeVerifier: [],
      deviceCode: [],
      grantType: [],
      redirectUri: [],
      refreshToken: [],
      scope: /* @__PURE__ */ __name((_) => (0, import_smithy_client5._json)(_), "scope")
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
  }, "se_CreateTokenCommand");
  var de_CreateTokenCommand = /* @__PURE__ */ __name(async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
      return de_CommandError(output, context);
    }
    const contents = (0, import_smithy_client5.map)({
      $metadata: deserializeMetadata(output)
    });
    const data = (0, import_smithy_client5.expectNonNull)((0, import_smithy_client5.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
    const doc = (0, import_smithy_client5.take)(data, {
      accessToken: import_smithy_client5.expectString,
      expiresIn: import_smithy_client5.expectInt32,
      idToken: import_smithy_client5.expectString,
      refreshToken: import_smithy_client5.expectString,
      tokenType: import_smithy_client5.expectString
    });
    Object.assign(contents, doc);
    return contents;
  }, "de_CreateTokenCommand");
  var de_CommandError = /* @__PURE__ */ __name(async (output, context) => {
    const parsedOutput = {
      ...output,
      body: await (0, import_core2.parseJsonErrorBody)(output.body, context)
    };
    const errorCode = (0, import_core2.loadRestJsonErrorCode)(output, parsedOutput.body);
    switch (errorCode) {
      case "AccessDeniedException":
      case "com.amazonaws.ssooidc#AccessDeniedException":
        throw await de_AccessDeniedExceptionRes(parsedOutput, context);
      case "AuthorizationPendingException":
      case "com.amazonaws.ssooidc#AuthorizationPendingException":
        throw await de_AuthorizationPendingExceptionRes(parsedOutput, context);
      case "ExpiredTokenException":
      case "com.amazonaws.ssooidc#ExpiredTokenException":
        throw await de_ExpiredTokenExceptionRes(parsedOutput, context);
      case "InternalServerException":
      case "com.amazonaws.ssooidc#InternalServerException":
        throw await de_InternalServerExceptionRes(parsedOutput, context);
      case "InvalidClientException":
      case "com.amazonaws.ssooidc#InvalidClientException":
        throw await de_InvalidClientExceptionRes(parsedOutput, context);
      case "InvalidGrantException":
      case "com.amazonaws.ssooidc#InvalidGrantException":
        throw await de_InvalidGrantExceptionRes(parsedOutput, context);
      case "InvalidRequestException":
      case "com.amazonaws.ssooidc#InvalidRequestException":
        throw await de_InvalidRequestExceptionRes(parsedOutput, context);
      case "InvalidScopeException":
      case "com.amazonaws.ssooidc#InvalidScopeException":
        throw await de_InvalidScopeExceptionRes(parsedOutput, context);
      case "SlowDownException":
      case "com.amazonaws.ssooidc#SlowDownException":
        throw await de_SlowDownExceptionRes(parsedOutput, context);
      case "UnauthorizedClientException":
      case "com.amazonaws.ssooidc#UnauthorizedClientException":
        throw await de_UnauthorizedClientExceptionRes(parsedOutput, context);
      case "UnsupportedGrantTypeException":
      case "com.amazonaws.ssooidc#UnsupportedGrantTypeException":
        throw await de_UnsupportedGrantTypeExceptionRes(parsedOutput, context);
      default:
        const parsedBody = parsedOutput.body;
        return throwDefaultError({
          output,
          parsedBody,
          errorCode
        });
    }
  }, "de_CommandError");
  var throwDefaultError = (0, import_smithy_client5.withBaseException)(SSOOIDCServiceException);
  var de_AccessDeniedExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const contents = (0, import_smithy_client5.map)({});
    const data = parsedOutput.body;
    const doc = (0, import_smithy_client5.take)(data, {
      error: import_smithy_client5.expectString,
      error_description: import_smithy_client5.expectString
    });
    Object.assign(contents, doc);
    const exception = new AccessDeniedException({
      $metadata: deserializeMetadata(parsedOutput),
      ...contents
    });
    return (0, import_smithy_client5.decorateServiceException)(exception, parsedOutput.body);
  }, "de_AccessDeniedExceptionRes");
  var de_AuthorizationPendingExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const contents = (0, import_smithy_client5.map)({});
    const data = parsedOutput.body;
    const doc = (0, import_smithy_client5.take)(data, {
      error: import_smithy_client5.expectString,
      error_description: import_smithy_client5.expectString
    });
    Object.assign(contents, doc);
    const exception = new AuthorizationPendingException({
      $metadata: deserializeMetadata(parsedOutput),
      ...contents
    });
    return (0, import_smithy_client5.decorateServiceException)(exception, parsedOutput.body);
  }, "de_AuthorizationPendingExceptionRes");
  var de_ExpiredTokenExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const contents = (0, import_smithy_client5.map)({});
    const data = parsedOutput.body;
    const doc = (0, import_smithy_client5.take)(data, {
      error: import_smithy_client5.expectString,
      error_description: import_smithy_client5.expectString
    });
    Object.assign(contents, doc);
    const exception = new ExpiredTokenException({
      $metadata: deserializeMetadata(parsedOutput),
      ...contents
    });
    return (0, import_smithy_client5.decorateServiceException)(exception, parsedOutput.body);
  }, "de_ExpiredTokenExceptionRes");
  var de_InternalServerExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const contents = (0, import_smithy_client5.map)({});
    const data = parsedOutput.body;
    const doc = (0, import_smithy_client5.take)(data, {
      error: import_smithy_client5.expectString,
      error_description: import_smithy_client5.expectString
    });
    Object.assign(contents, doc);
    const exception = new InternalServerException({
      $metadata: deserializeMetadata(parsedOutput),
      ...contents
    });
    return (0, import_smithy_client5.decorateServiceException)(exception, parsedOutput.body);
  }, "de_InternalServerExceptionRes");
  var de_InvalidClientExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const contents = (0, import_smithy_client5.map)({});
    const data = parsedOutput.body;
    const doc = (0, import_smithy_client5.take)(data, {
      error: import_smithy_client5.expectString,
      error_description: import_smithy_client5.expectString
    });
    Object.assign(contents, doc);
    const exception = new InvalidClientException({
      $metadata: deserializeMetadata(parsedOutput),
      ...contents
    });
    return (0, import_smithy_client5.decorateServiceException)(exception, parsedOutput.body);
  }, "de_InvalidClientExceptionRes");
  var de_InvalidGrantExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const contents = (0, import_smithy_client5.map)({});
    const data = parsedOutput.body;
    const doc = (0, import_smithy_client5.take)(data, {
      error: import_smithy_client5.expectString,
      error_description: import_smithy_client5.expectString
    });
    Object.assign(contents, doc);
    const exception = new InvalidGrantException({
      $metadata: deserializeMetadata(parsedOutput),
      ...contents
    });
    return (0, import_smithy_client5.decorateServiceException)(exception, parsedOutput.body);
  }, "de_InvalidGrantExceptionRes");
  var de_InvalidRequestExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const contents = (0, import_smithy_client5.map)({});
    const data = parsedOutput.body;
    const doc = (0, import_smithy_client5.take)(data, {
      error: import_smithy_client5.expectString,
      error_description: import_smithy_client5.expectString
    });
    Object.assign(contents, doc);
    const exception = new InvalidRequestException({
      $metadata: deserializeMetadata(parsedOutput),
      ...contents
    });
    return (0, import_smithy_client5.decorateServiceException)(exception, parsedOutput.body);
  }, "de_InvalidRequestExceptionRes");
  var de_InvalidScopeExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const contents = (0, import_smithy_client5.map)({});
    const data = parsedOutput.body;
    const doc = (0, import_smithy_client5.take)(data, {
      error: import_smithy_client5.expectString,
      error_description: import_smithy_client5.expectString
    });
    Object.assign(contents, doc);
    const exception = new InvalidScopeException({
      $metadata: deserializeMetadata(parsedOutput),
      ...contents
    });
    return (0, import_smithy_client5.decorateServiceException)(exception, parsedOutput.body);
  }, "de_InvalidScopeExceptionRes");
  var de_SlowDownExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const contents = (0, import_smithy_client5.map)({});
    const data = parsedOutput.body;
    const doc = (0, import_smithy_client5.take)(data, {
      error: import_smithy_client5.expectString,
      error_description: import_smithy_client5.expectString
    });
    Object.assign(contents, doc);
    const exception = new SlowDownException({
      $metadata: deserializeMetadata(parsedOutput),
      ...contents
    });
    return (0, import_smithy_client5.decorateServiceException)(exception, parsedOutput.body);
  }, "de_SlowDownExceptionRes");
  var de_UnauthorizedClientExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const contents = (0, import_smithy_client5.map)({});
    const data = parsedOutput.body;
    const doc = (0, import_smithy_client5.take)(data, {
      error: import_smithy_client5.expectString,
      error_description: import_smithy_client5.expectString
    });
    Object.assign(contents, doc);
    const exception = new UnauthorizedClientException({
      $metadata: deserializeMetadata(parsedOutput),
      ...contents
    });
    return (0, import_smithy_client5.decorateServiceException)(exception, parsedOutput.body);
  }, "de_UnauthorizedClientExceptionRes");
  var de_UnsupportedGrantTypeExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const contents = (0, import_smithy_client5.map)({});
    const data = parsedOutput.body;
    const doc = (0, import_smithy_client5.take)(data, {
      error: import_smithy_client5.expectString,
      error_description: import_smithy_client5.expectString
    });
    Object.assign(contents, doc);
    const exception = new UnsupportedGrantTypeException({
      $metadata: deserializeMetadata(parsedOutput),
      ...contents
    });
    return (0, import_smithy_client5.decorateServiceException)(exception, parsedOutput.body);
  }, "de_UnsupportedGrantTypeExceptionRes");
  var deserializeMetadata = /* @__PURE__ */ __name((output) => ({
    httpStatusCode: output.statusCode,
    requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"]
  }), "deserializeMetadata");
  var CreateTokenCommand = class extends import_smithy_client6.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
    return [
      (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
      (0, import_middleware_endpoint2.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
    ];
  }).s("AWSSSOOIDCService", "CreateToken", {}).n("SSOOIDCClient", "CreateTokenCommand").f(CreateTokenRequestFilterSensitiveLog, CreateTokenResponseFilterSensitiveLog).ser(se_CreateTokenCommand).de(de_CreateTokenCommand).build() {
    static {
      __name(this, "CreateTokenCommand");
    }
  };
  var commands = {
    CreateTokenCommand
  };
  var SSOOIDC = class extends SSOOIDCClient {
    static {
      __name(this, "SSOOIDC");
    }
  };
  (0, import_smithy_client7.createAggregatedClient)(commands, SSOOIDC);
});
export default require_sso_oidc();
