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
} from "./chunk-m5s6gec2.js";
import {
  require_dist_cjs as require_dist_cjs3,
  require_dist_cjs1 as require_dist_cjs7,
  require_dist_cjs3 as require_dist_cjs8,
  require_dist_cjs4 as require_dist_cjs9,
  require_tslib
} from "./chunk-4z2vkdqz.js";
import {
  require_dist_cjs,
  require_dist_cjs1 as require_dist_cjs2,
  require_dist_cjs4,
  require_dist_cjs5,
  require_dist_cjs7 as require_dist_cjs6
} from "./chunk-p8vym9ay.js";
import"./chunk-0rra9d59.js";
import {
  require_client
} from "./chunk-n2a7wn2k.js";
import {
  __commonJS
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/auth/httpAuthSchemeProvider.js
var require_httpAuthSchemeProvider = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.resolveHttpAuthSchemeConfig = exports.resolveStsAuthConfig = exports.defaultSTSHttpAuthSchemeProvider = exports.defaultSTSHttpAuthSchemeParametersProvider = undefined;
  var core_1 = require_dist_cjs9();
  var util_middleware_1 = require_dist_cjs();
  var STSClient_1 = require_STSClient();
  var defaultSTSHttpAuthSchemeParametersProvider = async (config, context, input) => {
    return {
      operation: (0, util_middleware_1.getSmithyContext)(context).operation,
      region: await (0, util_middleware_1.normalizeProvider)(config.region)() || (() => {
        throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
      })()
    };
  };
  exports.defaultSTSHttpAuthSchemeParametersProvider = defaultSTSHttpAuthSchemeParametersProvider;
  function createAwsAuthSigv4HttpAuthOption(authParameters) {
    return {
      schemeId: "aws.auth#sigv4",
      signingProperties: {
        name: "sts",
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
  var defaultSTSHttpAuthSchemeProvider = (authParameters) => {
    const options = [];
    switch (authParameters.operation) {
      case "AssumeRoleWithWebIdentity": {
        options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
        break;
      }
      default: {
        options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
      }
    }
    return options;
  };
  exports.defaultSTSHttpAuthSchemeProvider = defaultSTSHttpAuthSchemeProvider;
  var resolveStsAuthConfig = (input) => Object.assign(input, {
    stsClientCtor: STSClient_1.STSClient
  });
  exports.resolveStsAuthConfig = resolveStsAuthConfig;
  var resolveHttpAuthSchemeConfig = (config) => {
    const config_0 = (0, exports.resolveStsAuthConfig)(config);
    const config_1 = (0, core_1.resolveAwsSdkSigV4Config)(config_0);
    return Object.assign(config_1, {
      authSchemePreference: (0, util_middleware_1.normalizeProvider)(config.authSchemePreference ?? [])
    });
  };
  exports.resolveHttpAuthSchemeConfig = resolveHttpAuthSchemeConfig;
});

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/endpoint/EndpointParameters.js
var require_EndpointParameters = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.commonParams = exports.resolveClientEndpointParameters = undefined;
  var resolveClientEndpointParameters = (options) => {
    return Object.assign(options, {
      useDualstackEndpoint: options.useDualstackEndpoint ?? false,
      useFipsEndpoint: options.useFipsEndpoint ?? false,
      useGlobalEndpoint: options.useGlobalEndpoint ?? false,
      defaultSigningName: "sts"
    });
  };
  exports.resolveClientEndpointParameters = resolveClientEndpointParameters;
  exports.commonParams = {
    UseGlobalEndpoint: { type: "builtInParams", name: "useGlobalEndpoint" },
    UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
    Endpoint: { type: "builtInParams", name: "endpoint" },
    Region: { type: "builtInParams", name: "region" },
    UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
  };
});

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/endpoint/ruleset.js
var require_ruleset = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ruleSet = undefined;
  var F = "required";
  var G = "type";
  var H = "fn";
  var I = "argv";
  var J = "ref";
  var a = false;
  var b = true;
  var c = "booleanEquals";
  var d = "stringEquals";
  var e = "sigv4";
  var f = "sts";
  var g = "us-east-1";
  var h = "endpoint";
  var i = "https://sts.{Region}.{PartitionResult#dnsSuffix}";
  var j = "tree";
  var k = "error";
  var l = "getAttr";
  var m = { [F]: false, [G]: "String" };
  var n = { [F]: true, default: false, [G]: "Boolean" };
  var o = { [J]: "Endpoint" };
  var p = { [H]: "isSet", [I]: [{ [J]: "Region" }] };
  var q = { [J]: "Region" };
  var r = { [H]: "aws.partition", [I]: [q], assign: "PartitionResult" };
  var s = { [J]: "UseFIPS" };
  var t = { [J]: "UseDualStack" };
  var u = { url: "https://sts.amazonaws.com", properties: { authSchemes: [{ name: e, signingName: f, signingRegion: g }] }, headers: {} };
  var v = {};
  var w = { conditions: [{ [H]: d, [I]: [q, "aws-global"] }], [h]: u, [G]: h };
  var x = { [H]: c, [I]: [s, true] };
  var y = { [H]: c, [I]: [t, true] };
  var z = { [H]: l, [I]: [{ [J]: "PartitionResult" }, "supportsFIPS"] };
  var A = { [J]: "PartitionResult" };
  var B = { [H]: c, [I]: [true, { [H]: l, [I]: [A, "supportsDualStack"] }] };
  var C = [{ [H]: "isSet", [I]: [o] }];
  var D = [x];
  var E = [y];
  var _data = { version: "1.0", parameters: { Region: m, UseDualStack: n, UseFIPS: n, Endpoint: m, UseGlobalEndpoint: n }, rules: [{ conditions: [{ [H]: c, [I]: [{ [J]: "UseGlobalEndpoint" }, b] }, { [H]: "not", [I]: C }, p, r, { [H]: c, [I]: [s, a] }, { [H]: c, [I]: [t, a] }], rules: [{ conditions: [{ [H]: d, [I]: [q, "ap-northeast-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "ap-south-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "ap-southeast-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "ap-southeast-2"] }], endpoint: u, [G]: h }, w, { conditions: [{ [H]: d, [I]: [q, "ca-central-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "eu-central-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "eu-north-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "eu-west-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "eu-west-2"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "eu-west-3"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "sa-east-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, g] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "us-east-2"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "us-west-1"] }], endpoint: u, [G]: h }, { conditions: [{ [H]: d, [I]: [q, "us-west-2"] }], endpoint: u, [G]: h }, { endpoint: { url: i, properties: { authSchemes: [{ name: e, signingName: f, signingRegion: "{Region}" }] }, headers: v }, [G]: h }], [G]: j }, { conditions: C, rules: [{ conditions: D, error: "Invalid Configuration: FIPS and custom endpoint are not supported", [G]: k }, { conditions: E, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", [G]: k }, { endpoint: { url: o, properties: v, headers: v }, [G]: h }], [G]: j }, { conditions: [p], rules: [{ conditions: [r], rules: [{ conditions: [x, y], rules: [{ conditions: [{ [H]: c, [I]: [b, z] }, B], rules: [{ endpoint: { url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: v, headers: v }, [G]: h }], [G]: j }, { error: "FIPS and DualStack are enabled, but this partition does not support one or both", [G]: k }], [G]: j }, { conditions: D, rules: [{ conditions: [{ [H]: c, [I]: [z, b] }], rules: [{ conditions: [{ [H]: d, [I]: [{ [H]: l, [I]: [A, "name"] }, "aws-us-gov"] }], endpoint: { url: "https://sts.{Region}.amazonaws.com", properties: v, headers: v }, [G]: h }, { endpoint: { url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}", properties: v, headers: v }, [G]: h }], [G]: j }, { error: "FIPS is enabled but this partition does not support FIPS", [G]: k }], [G]: j }, { conditions: E, rules: [{ conditions: [B], rules: [{ endpoint: { url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: v, headers: v }, [G]: h }], [G]: j }, { error: "DualStack is enabled but this partition does not support DualStack", [G]: k }], [G]: j }, w, { endpoint: { url: i, properties: v, headers: v }, [G]: h }], [G]: j }], [G]: j }, { error: "Invalid Configuration: Missing Region", [G]: k }] };
  exports.ruleSet = _data;
});

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/endpoint/endpointResolver.js
var require_endpointResolver = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.defaultEndpointResolver = undefined;
  var util_endpoints_1 = require_dist_cjs14();
  var util_endpoints_2 = require_dist_cjs13();
  var ruleset_1 = require_ruleset();
  var cache = new util_endpoints_2.EndpointCache({
    size: 50,
    params: ["Endpoint", "Region", "UseDualStack", "UseFIPS", "UseGlobalEndpoint"]
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

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/runtimeConfig.shared.js
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
      apiVersion: "2011-06-15",
      base64Decoder: config?.base64Decoder ?? util_base64_1.fromBase64,
      base64Encoder: config?.base64Encoder ?? util_base64_1.toBase64,
      disableHostPrefix: config?.disableHostPrefix ?? false,
      endpointProvider: config?.endpointProvider ?? endpointResolver_1.defaultEndpointResolver,
      extensions: config?.extensions ?? [],
      httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? httpAuthSchemeProvider_1.defaultSTSHttpAuthSchemeProvider,
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
      serviceId: config?.serviceId ?? "STS",
      urlParser: config?.urlParser ?? url_parser_1.parseUrl,
      utf8Decoder: config?.utf8Decoder ?? util_utf8_1.fromUtf8,
      utf8Encoder: config?.utf8Encoder ?? util_utf8_1.toUtf8
    };
  };
  exports.getRuntimeConfig = getRuntimeConfig;
});

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/runtimeConfig.js
var require_runtimeConfig = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getRuntimeConfig = undefined;
  var tslib_1 = require_tslib();
  var package_json_1 = tslib_1.__importDefault(require_package());
  var core_1 = require_dist_cjs9();
  var util_user_agent_node_1 = require_dist_cjs23();
  var config_resolver_1 = require_dist_cjs16();
  var core_2 = require_dist_cjs7();
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
      httpAuthSchemes: config?.httpAuthSchemes ?? [
        {
          schemeId: "aws.auth#sigv4",
          identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4") || (async (idProps) => await config.credentialDefaultProvider(idProps?.__config || {})()),
          signer: new core_1.AwsSdkSigV4Signer
        },
        {
          schemeId: "smithy.api#noAuth",
          identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
          signer: new core_2.NoAuthSigner
        }
      ],
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

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/auth/httpAuthExtensionConfiguration.js
var require_httpAuthExtensionConfiguration = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.resolveHttpAuthRuntimeConfig = exports.getHttpAuthExtensionConfiguration = undefined;
  var getHttpAuthExtensionConfiguration = (runtimeConfig) => {
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
  };
  exports.getHttpAuthExtensionConfiguration = getHttpAuthExtensionConfiguration;
  var resolveHttpAuthRuntimeConfig = (config) => {
    return {
      httpAuthSchemes: config.httpAuthSchemes(),
      httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
      credentials: config.credentials()
    };
  };
  exports.resolveHttpAuthRuntimeConfig = resolveHttpAuthRuntimeConfig;
});

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/runtimeExtensions.js
var require_runtimeExtensions = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.resolveRuntimeExtensions = undefined;
  var region_config_resolver_1 = require_dist_cjs27();
  var protocol_http_1 = require_dist_cjs2();
  var smithy_client_1 = require_dist_cjs8();
  var httpAuthExtensionConfiguration_1 = require_httpAuthExtensionConfiguration();
  var resolveRuntimeExtensions = (runtimeConfig, extensions) => {
    const extensionConfiguration = Object.assign((0, region_config_resolver_1.getAwsRegionExtensionConfiguration)(runtimeConfig), (0, smithy_client_1.getDefaultExtensionConfiguration)(runtimeConfig), (0, protocol_http_1.getHttpHandlerExtensionConfiguration)(runtimeConfig), (0, httpAuthExtensionConfiguration_1.getHttpAuthExtensionConfiguration)(runtimeConfig));
    extensions.forEach((extension) => extension.configure(extensionConfiguration));
    return Object.assign(runtimeConfig, (0, region_config_resolver_1.resolveAwsRegionExtensionConfiguration)(extensionConfiguration), (0, smithy_client_1.resolveDefaultRuntimeConfig)(extensionConfiguration), (0, protocol_http_1.resolveHttpHandlerRuntimeConfig)(extensionConfiguration), (0, httpAuthExtensionConfiguration_1.resolveHttpAuthRuntimeConfig)(extensionConfiguration));
  };
  exports.resolveRuntimeExtensions = resolveRuntimeExtensions;
});

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/STSClient.js
var require_STSClient = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.STSClient = exports.__Client = undefined;
  var middleware_host_header_1 = require_dist_cjs10();
  var middleware_logger_1 = require_dist_cjs11();
  var middleware_recursion_detection_1 = require_dist_cjs12();
  var middleware_user_agent_1 = require_dist_cjs15();
  var config_resolver_1 = require_dist_cjs16();
  var core_1 = require_dist_cjs7();
  var middleware_content_length_1 = require_dist_cjs17();
  var middleware_endpoint_1 = require_dist_cjs20();
  var middleware_retry_1 = require_dist_cjs22();
  var smithy_client_1 = require_dist_cjs8();
  Object.defineProperty(exports, "__Client", { enumerable: true, get: function() {
    return smithy_client_1.Client;
  } });
  var httpAuthSchemeProvider_1 = require_httpAuthSchemeProvider();
  var EndpointParameters_1 = require_EndpointParameters();
  var runtimeConfig_1 = require_runtimeConfig();
  var runtimeExtensions_1 = require_runtimeExtensions();

  class STSClient extends smithy_client_1.Client {
    config;
    constructor(...[configuration]) {
      const _config_0 = (0, runtimeConfig_1.getRuntimeConfig)(configuration || {});
      super(_config_0);
      this.initConfig = _config_0;
      const _config_1 = (0, EndpointParameters_1.resolveClientEndpointParameters)(_config_0);
      const _config_2 = (0, middleware_user_agent_1.resolveUserAgentConfig)(_config_1);
      const _config_3 = (0, middleware_retry_1.resolveRetryConfig)(_config_2);
      const _config_4 = (0, config_resolver_1.resolveRegionConfig)(_config_3);
      const _config_5 = (0, middleware_host_header_1.resolveHostHeaderConfig)(_config_4);
      const _config_6 = (0, middleware_endpoint_1.resolveEndpointConfig)(_config_5);
      const _config_7 = (0, httpAuthSchemeProvider_1.resolveHttpAuthSchemeConfig)(_config_6);
      const _config_8 = (0, runtimeExtensions_1.resolveRuntimeExtensions)(_config_7, configuration?.extensions || []);
      this.config = _config_8;
      this.middlewareStack.use((0, middleware_user_agent_1.getUserAgentPlugin)(this.config));
      this.middlewareStack.use((0, middleware_retry_1.getRetryPlugin)(this.config));
      this.middlewareStack.use((0, middleware_content_length_1.getContentLengthPlugin)(this.config));
      this.middlewareStack.use((0, middleware_host_header_1.getHostHeaderPlugin)(this.config));
      this.middlewareStack.use((0, middleware_logger_1.getLoggerPlugin)(this.config));
      this.middlewareStack.use((0, middleware_recursion_detection_1.getRecursionDetectionPlugin)(this.config));
      this.middlewareStack.use((0, core_1.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config, {
        httpAuthSchemeParametersProvider: httpAuthSchemeProvider_1.defaultSTSHttpAuthSchemeParametersProvider,
        identityProviderConfigProvider: async (config) => new core_1.DefaultIdentityProviderConfig({
          "aws.auth#sigv4": config.credentials
        })
      }));
      this.middlewareStack.use((0, core_1.getHttpSigningPlugin)(this.config));
    }
    destroy() {
      super.destroy();
    }
  }
  exports.STSClient = STSClient;
});

// ../../../../node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/index.js
var require_sts = __commonJS((exports, module) => {
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
  var index_exports = {};
  __export(index_exports, {
    AssumeRoleCommand: () => AssumeRoleCommand,
    AssumeRoleResponseFilterSensitiveLog: () => AssumeRoleResponseFilterSensitiveLog,
    AssumeRoleWithWebIdentityCommand: () => AssumeRoleWithWebIdentityCommand,
    AssumeRoleWithWebIdentityRequestFilterSensitiveLog: () => AssumeRoleWithWebIdentityRequestFilterSensitiveLog,
    AssumeRoleWithWebIdentityResponseFilterSensitiveLog: () => AssumeRoleWithWebIdentityResponseFilterSensitiveLog,
    ClientInputEndpointParameters: () => import_EndpointParameters3.ClientInputEndpointParameters,
    CredentialsFilterSensitiveLog: () => CredentialsFilterSensitiveLog,
    ExpiredTokenException: () => ExpiredTokenException,
    IDPCommunicationErrorException: () => IDPCommunicationErrorException,
    IDPRejectedClaimException: () => IDPRejectedClaimException,
    InvalidIdentityTokenException: () => InvalidIdentityTokenException,
    MalformedPolicyDocumentException: () => MalformedPolicyDocumentException,
    PackedPolicyTooLargeException: () => PackedPolicyTooLargeException,
    RegionDisabledException: () => RegionDisabledException,
    STS: () => STS,
    STSServiceException: () => STSServiceException,
    decorateDefaultCredentialProvider: () => decorateDefaultCredentialProvider,
    getDefaultRoleAssumer: () => getDefaultRoleAssumer2,
    getDefaultRoleAssumerWithWebIdentity: () => getDefaultRoleAssumerWithWebIdentity2
  });
  module.exports = __toCommonJS(index_exports);
  __reExport(index_exports, require_STSClient(), module.exports);
  var import_smithy_client6 = require_dist_cjs8();
  var import_middleware_endpoint = require_dist_cjs20();
  var import_middleware_serde = require_dist_cjs3();
  var import_smithy_client4 = require_dist_cjs8();
  var import_EndpointParameters = require_EndpointParameters();
  var import_smithy_client2 = require_dist_cjs8();
  var import_smithy_client = require_dist_cjs8();
  var STSServiceException = class _STSServiceException extends import_smithy_client.ServiceException {
    static {
      __name(this, "STSServiceException");
    }
    constructor(options) {
      super(options);
      Object.setPrototypeOf(this, _STSServiceException.prototype);
    }
  };
  var CredentialsFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
    ...obj,
    ...obj.SecretAccessKey && { SecretAccessKey: import_smithy_client2.SENSITIVE_STRING }
  }), "CredentialsFilterSensitiveLog");
  var AssumeRoleResponseFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
    ...obj,
    ...obj.Credentials && { Credentials: CredentialsFilterSensitiveLog(obj.Credentials) }
  }), "AssumeRoleResponseFilterSensitiveLog");
  var ExpiredTokenException = class _ExpiredTokenException extends STSServiceException {
    static {
      __name(this, "ExpiredTokenException");
    }
    name = "ExpiredTokenException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "ExpiredTokenException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _ExpiredTokenException.prototype);
    }
  };
  var MalformedPolicyDocumentException = class _MalformedPolicyDocumentException extends STSServiceException {
    static {
      __name(this, "MalformedPolicyDocumentException");
    }
    name = "MalformedPolicyDocumentException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "MalformedPolicyDocumentException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _MalformedPolicyDocumentException.prototype);
    }
  };
  var PackedPolicyTooLargeException = class _PackedPolicyTooLargeException extends STSServiceException {
    static {
      __name(this, "PackedPolicyTooLargeException");
    }
    name = "PackedPolicyTooLargeException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "PackedPolicyTooLargeException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _PackedPolicyTooLargeException.prototype);
    }
  };
  var RegionDisabledException = class _RegionDisabledException extends STSServiceException {
    static {
      __name(this, "RegionDisabledException");
    }
    name = "RegionDisabledException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "RegionDisabledException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _RegionDisabledException.prototype);
    }
  };
  var IDPRejectedClaimException = class _IDPRejectedClaimException extends STSServiceException {
    static {
      __name(this, "IDPRejectedClaimException");
    }
    name = "IDPRejectedClaimException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "IDPRejectedClaimException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _IDPRejectedClaimException.prototype);
    }
  };
  var InvalidIdentityTokenException = class _InvalidIdentityTokenException extends STSServiceException {
    static {
      __name(this, "InvalidIdentityTokenException");
    }
    name = "InvalidIdentityTokenException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "InvalidIdentityTokenException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _InvalidIdentityTokenException.prototype);
    }
  };
  var AssumeRoleWithWebIdentityRequestFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
    ...obj,
    ...obj.WebIdentityToken && { WebIdentityToken: import_smithy_client2.SENSITIVE_STRING }
  }), "AssumeRoleWithWebIdentityRequestFilterSensitiveLog");
  var AssumeRoleWithWebIdentityResponseFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
    ...obj,
    ...obj.Credentials && { Credentials: CredentialsFilterSensitiveLog(obj.Credentials) }
  }), "AssumeRoleWithWebIdentityResponseFilterSensitiveLog");
  var IDPCommunicationErrorException = class _IDPCommunicationErrorException extends STSServiceException {
    static {
      __name(this, "IDPCommunicationErrorException");
    }
    name = "IDPCommunicationErrorException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "IDPCommunicationErrorException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, _IDPCommunicationErrorException.prototype);
    }
  };
  var import_core = require_dist_cjs9();
  var import_protocol_http = require_dist_cjs2();
  var import_smithy_client3 = require_dist_cjs8();
  var se_AssumeRoleCommand = /* @__PURE__ */ __name(async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
      ...se_AssumeRoleRequest(input, context),
      [_A]: _AR,
      [_V]: _
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
  }, "se_AssumeRoleCommand");
  var se_AssumeRoleWithWebIdentityCommand = /* @__PURE__ */ __name(async (input, context) => {
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
      ...se_AssumeRoleWithWebIdentityRequest(input, context),
      [_A]: _ARWWI,
      [_V]: _
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
  }, "se_AssumeRoleWithWebIdentityCommand");
  var de_AssumeRoleCommand = /* @__PURE__ */ __name(async (output, context) => {
    if (output.statusCode >= 300) {
      return de_CommandError(output, context);
    }
    const data = await (0, import_core.parseXmlBody)(output.body, context);
    let contents = {};
    contents = de_AssumeRoleResponse(data.AssumeRoleResult, context);
    const response = {
      $metadata: deserializeMetadata(output),
      ...contents
    };
    return response;
  }, "de_AssumeRoleCommand");
  var de_AssumeRoleWithWebIdentityCommand = /* @__PURE__ */ __name(async (output, context) => {
    if (output.statusCode >= 300) {
      return de_CommandError(output, context);
    }
    const data = await (0, import_core.parseXmlBody)(output.body, context);
    let contents = {};
    contents = de_AssumeRoleWithWebIdentityResponse(data.AssumeRoleWithWebIdentityResult, context);
    const response = {
      $metadata: deserializeMetadata(output),
      ...contents
    };
    return response;
  }, "de_AssumeRoleWithWebIdentityCommand");
  var de_CommandError = /* @__PURE__ */ __name(async (output, context) => {
    const parsedOutput = {
      ...output,
      body: await (0, import_core.parseXmlErrorBody)(output.body, context)
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch (errorCode) {
      case "ExpiredTokenException":
      case "com.amazonaws.sts#ExpiredTokenException":
        throw await de_ExpiredTokenExceptionRes(parsedOutput, context);
      case "MalformedPolicyDocument":
      case "com.amazonaws.sts#MalformedPolicyDocumentException":
        throw await de_MalformedPolicyDocumentExceptionRes(parsedOutput, context);
      case "PackedPolicyTooLarge":
      case "com.amazonaws.sts#PackedPolicyTooLargeException":
        throw await de_PackedPolicyTooLargeExceptionRes(parsedOutput, context);
      case "RegionDisabledException":
      case "com.amazonaws.sts#RegionDisabledException":
        throw await de_RegionDisabledExceptionRes(parsedOutput, context);
      case "IDPCommunicationError":
      case "com.amazonaws.sts#IDPCommunicationErrorException":
        throw await de_IDPCommunicationErrorExceptionRes(parsedOutput, context);
      case "IDPRejectedClaim":
      case "com.amazonaws.sts#IDPRejectedClaimException":
        throw await de_IDPRejectedClaimExceptionRes(parsedOutput, context);
      case "InvalidIdentityToken":
      case "com.amazonaws.sts#InvalidIdentityTokenException":
        throw await de_InvalidIdentityTokenExceptionRes(parsedOutput, context);
      default:
        const parsedBody = parsedOutput.body;
        return throwDefaultError({
          output,
          parsedBody: parsedBody.Error,
          errorCode
        });
    }
  }, "de_CommandError");
  var de_ExpiredTokenExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_ExpiredTokenException(body.Error, context);
    const exception = new ExpiredTokenException({
      $metadata: deserializeMetadata(parsedOutput),
      ...deserialized
    });
    return (0, import_smithy_client3.decorateServiceException)(exception, body);
  }, "de_ExpiredTokenExceptionRes");
  var de_IDPCommunicationErrorExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_IDPCommunicationErrorException(body.Error, context);
    const exception = new IDPCommunicationErrorException({
      $metadata: deserializeMetadata(parsedOutput),
      ...deserialized
    });
    return (0, import_smithy_client3.decorateServiceException)(exception, body);
  }, "de_IDPCommunicationErrorExceptionRes");
  var de_IDPRejectedClaimExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_IDPRejectedClaimException(body.Error, context);
    const exception = new IDPRejectedClaimException({
      $metadata: deserializeMetadata(parsedOutput),
      ...deserialized
    });
    return (0, import_smithy_client3.decorateServiceException)(exception, body);
  }, "de_IDPRejectedClaimExceptionRes");
  var de_InvalidIdentityTokenExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_InvalidIdentityTokenException(body.Error, context);
    const exception = new InvalidIdentityTokenException({
      $metadata: deserializeMetadata(parsedOutput),
      ...deserialized
    });
    return (0, import_smithy_client3.decorateServiceException)(exception, body);
  }, "de_InvalidIdentityTokenExceptionRes");
  var de_MalformedPolicyDocumentExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_MalformedPolicyDocumentException(body.Error, context);
    const exception = new MalformedPolicyDocumentException({
      $metadata: deserializeMetadata(parsedOutput),
      ...deserialized
    });
    return (0, import_smithy_client3.decorateServiceException)(exception, body);
  }, "de_MalformedPolicyDocumentExceptionRes");
  var de_PackedPolicyTooLargeExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_PackedPolicyTooLargeException(body.Error, context);
    const exception = new PackedPolicyTooLargeException({
      $metadata: deserializeMetadata(parsedOutput),
      ...deserialized
    });
    return (0, import_smithy_client3.decorateServiceException)(exception, body);
  }, "de_PackedPolicyTooLargeExceptionRes");
  var de_RegionDisabledExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
    const body = parsedOutput.body;
    const deserialized = de_RegionDisabledException(body.Error, context);
    const exception = new RegionDisabledException({
      $metadata: deserializeMetadata(parsedOutput),
      ...deserialized
    });
    return (0, import_smithy_client3.decorateServiceException)(exception, body);
  }, "de_RegionDisabledExceptionRes");
  var se_AssumeRoleRequest = /* @__PURE__ */ __name((input, context) => {
    const entries = {};
    if (input[_RA] != null) {
      entries[_RA] = input[_RA];
    }
    if (input[_RSN] != null) {
      entries[_RSN] = input[_RSN];
    }
    if (input[_PA] != null) {
      const memberEntries = se_policyDescriptorListType(input[_PA], context);
      if (input[_PA]?.length === 0) {
        entries.PolicyArns = [];
      }
      Object.entries(memberEntries).forEach(([key, value]) => {
        const loc = `PolicyArns.${key}`;
        entries[loc] = value;
      });
    }
    if (input[_P] != null) {
      entries[_P] = input[_P];
    }
    if (input[_DS] != null) {
      entries[_DS] = input[_DS];
    }
    if (input[_T] != null) {
      const memberEntries = se_tagListType(input[_T], context);
      if (input[_T]?.length === 0) {
        entries.Tags = [];
      }
      Object.entries(memberEntries).forEach(([key, value]) => {
        const loc = `Tags.${key}`;
        entries[loc] = value;
      });
    }
    if (input[_TTK] != null) {
      const memberEntries = se_tagKeyListType(input[_TTK], context);
      if (input[_TTK]?.length === 0) {
        entries.TransitiveTagKeys = [];
      }
      Object.entries(memberEntries).forEach(([key, value]) => {
        const loc = `TransitiveTagKeys.${key}`;
        entries[loc] = value;
      });
    }
    if (input[_EI] != null) {
      entries[_EI] = input[_EI];
    }
    if (input[_SN] != null) {
      entries[_SN] = input[_SN];
    }
    if (input[_TC] != null) {
      entries[_TC] = input[_TC];
    }
    if (input[_SI] != null) {
      entries[_SI] = input[_SI];
    }
    if (input[_PC] != null) {
      const memberEntries = se_ProvidedContextsListType(input[_PC], context);
      if (input[_PC]?.length === 0) {
        entries.ProvidedContexts = [];
      }
      Object.entries(memberEntries).forEach(([key, value]) => {
        const loc = `ProvidedContexts.${key}`;
        entries[loc] = value;
      });
    }
    return entries;
  }, "se_AssumeRoleRequest");
  var se_AssumeRoleWithWebIdentityRequest = /* @__PURE__ */ __name((input, context) => {
    const entries = {};
    if (input[_RA] != null) {
      entries[_RA] = input[_RA];
    }
    if (input[_RSN] != null) {
      entries[_RSN] = input[_RSN];
    }
    if (input[_WIT] != null) {
      entries[_WIT] = input[_WIT];
    }
    if (input[_PI] != null) {
      entries[_PI] = input[_PI];
    }
    if (input[_PA] != null) {
      const memberEntries = se_policyDescriptorListType(input[_PA], context);
      if (input[_PA]?.length === 0) {
        entries.PolicyArns = [];
      }
      Object.entries(memberEntries).forEach(([key, value]) => {
        const loc = `PolicyArns.${key}`;
        entries[loc] = value;
      });
    }
    if (input[_P] != null) {
      entries[_P] = input[_P];
    }
    if (input[_DS] != null) {
      entries[_DS] = input[_DS];
    }
    return entries;
  }, "se_AssumeRoleWithWebIdentityRequest");
  var se_policyDescriptorListType = /* @__PURE__ */ __name((input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
      if (entry === null) {
        continue;
      }
      const memberEntries = se_PolicyDescriptorType(entry, context);
      Object.entries(memberEntries).forEach(([key, value]) => {
        entries[`member.${counter}.${key}`] = value;
      });
      counter++;
    }
    return entries;
  }, "se_policyDescriptorListType");
  var se_PolicyDescriptorType = /* @__PURE__ */ __name((input, context) => {
    const entries = {};
    if (input[_a] != null) {
      entries[_a] = input[_a];
    }
    return entries;
  }, "se_PolicyDescriptorType");
  var se_ProvidedContext = /* @__PURE__ */ __name((input, context) => {
    const entries = {};
    if (input[_PAr] != null) {
      entries[_PAr] = input[_PAr];
    }
    if (input[_CA] != null) {
      entries[_CA] = input[_CA];
    }
    return entries;
  }, "se_ProvidedContext");
  var se_ProvidedContextsListType = /* @__PURE__ */ __name((input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
      if (entry === null) {
        continue;
      }
      const memberEntries = se_ProvidedContext(entry, context);
      Object.entries(memberEntries).forEach(([key, value]) => {
        entries[`member.${counter}.${key}`] = value;
      });
      counter++;
    }
    return entries;
  }, "se_ProvidedContextsListType");
  var se_Tag = /* @__PURE__ */ __name((input, context) => {
    const entries = {};
    if (input[_K] != null) {
      entries[_K] = input[_K];
    }
    if (input[_Va] != null) {
      entries[_Va] = input[_Va];
    }
    return entries;
  }, "se_Tag");
  var se_tagKeyListType = /* @__PURE__ */ __name((input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
      if (entry === null) {
        continue;
      }
      entries[`member.${counter}`] = entry;
      counter++;
    }
    return entries;
  }, "se_tagKeyListType");
  var se_tagListType = /* @__PURE__ */ __name((input, context) => {
    const entries = {};
    let counter = 1;
    for (const entry of input) {
      if (entry === null) {
        continue;
      }
      const memberEntries = se_Tag(entry, context);
      Object.entries(memberEntries).forEach(([key, value]) => {
        entries[`member.${counter}.${key}`] = value;
      });
      counter++;
    }
    return entries;
  }, "se_tagListType");
  var de_AssumedRoleUser = /* @__PURE__ */ __name((output, context) => {
    const contents = {};
    if (output[_ARI] != null) {
      contents[_ARI] = (0, import_smithy_client3.expectString)(output[_ARI]);
    }
    if (output[_Ar] != null) {
      contents[_Ar] = (0, import_smithy_client3.expectString)(output[_Ar]);
    }
    return contents;
  }, "de_AssumedRoleUser");
  var de_AssumeRoleResponse = /* @__PURE__ */ __name((output, context) => {
    const contents = {};
    if (output[_C] != null) {
      contents[_C] = de_Credentials(output[_C], context);
    }
    if (output[_ARU] != null) {
      contents[_ARU] = de_AssumedRoleUser(output[_ARU], context);
    }
    if (output[_PPS] != null) {
      contents[_PPS] = (0, import_smithy_client3.strictParseInt32)(output[_PPS]);
    }
    if (output[_SI] != null) {
      contents[_SI] = (0, import_smithy_client3.expectString)(output[_SI]);
    }
    return contents;
  }, "de_AssumeRoleResponse");
  var de_AssumeRoleWithWebIdentityResponse = /* @__PURE__ */ __name((output, context) => {
    const contents = {};
    if (output[_C] != null) {
      contents[_C] = de_Credentials(output[_C], context);
    }
    if (output[_SFWIT] != null) {
      contents[_SFWIT] = (0, import_smithy_client3.expectString)(output[_SFWIT]);
    }
    if (output[_ARU] != null) {
      contents[_ARU] = de_AssumedRoleUser(output[_ARU], context);
    }
    if (output[_PPS] != null) {
      contents[_PPS] = (0, import_smithy_client3.strictParseInt32)(output[_PPS]);
    }
    if (output[_Pr] != null) {
      contents[_Pr] = (0, import_smithy_client3.expectString)(output[_Pr]);
    }
    if (output[_Au] != null) {
      contents[_Au] = (0, import_smithy_client3.expectString)(output[_Au]);
    }
    if (output[_SI] != null) {
      contents[_SI] = (0, import_smithy_client3.expectString)(output[_SI]);
    }
    return contents;
  }, "de_AssumeRoleWithWebIdentityResponse");
  var de_Credentials = /* @__PURE__ */ __name((output, context) => {
    const contents = {};
    if (output[_AKI] != null) {
      contents[_AKI] = (0, import_smithy_client3.expectString)(output[_AKI]);
    }
    if (output[_SAK] != null) {
      contents[_SAK] = (0, import_smithy_client3.expectString)(output[_SAK]);
    }
    if (output[_ST] != null) {
      contents[_ST] = (0, import_smithy_client3.expectString)(output[_ST]);
    }
    if (output[_E] != null) {
      contents[_E] = (0, import_smithy_client3.expectNonNull)((0, import_smithy_client3.parseRfc3339DateTimeWithOffset)(output[_E]));
    }
    return contents;
  }, "de_Credentials");
  var de_ExpiredTokenException = /* @__PURE__ */ __name((output, context) => {
    const contents = {};
    if (output[_m] != null) {
      contents[_m] = (0, import_smithy_client3.expectString)(output[_m]);
    }
    return contents;
  }, "de_ExpiredTokenException");
  var de_IDPCommunicationErrorException = /* @__PURE__ */ __name((output, context) => {
    const contents = {};
    if (output[_m] != null) {
      contents[_m] = (0, import_smithy_client3.expectString)(output[_m]);
    }
    return contents;
  }, "de_IDPCommunicationErrorException");
  var de_IDPRejectedClaimException = /* @__PURE__ */ __name((output, context) => {
    const contents = {};
    if (output[_m] != null) {
      contents[_m] = (0, import_smithy_client3.expectString)(output[_m]);
    }
    return contents;
  }, "de_IDPRejectedClaimException");
  var de_InvalidIdentityTokenException = /* @__PURE__ */ __name((output, context) => {
    const contents = {};
    if (output[_m] != null) {
      contents[_m] = (0, import_smithy_client3.expectString)(output[_m]);
    }
    return contents;
  }, "de_InvalidIdentityTokenException");
  var de_MalformedPolicyDocumentException = /* @__PURE__ */ __name((output, context) => {
    const contents = {};
    if (output[_m] != null) {
      contents[_m] = (0, import_smithy_client3.expectString)(output[_m]);
    }
    return contents;
  }, "de_MalformedPolicyDocumentException");
  var de_PackedPolicyTooLargeException = /* @__PURE__ */ __name((output, context) => {
    const contents = {};
    if (output[_m] != null) {
      contents[_m] = (0, import_smithy_client3.expectString)(output[_m]);
    }
    return contents;
  }, "de_PackedPolicyTooLargeException");
  var de_RegionDisabledException = /* @__PURE__ */ __name((output, context) => {
    const contents = {};
    if (output[_m] != null) {
      contents[_m] = (0, import_smithy_client3.expectString)(output[_m]);
    }
    return contents;
  }, "de_RegionDisabledException");
  var deserializeMetadata = /* @__PURE__ */ __name((output) => ({
    httpStatusCode: output.statusCode,
    requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"]
  }), "deserializeMetadata");
  var throwDefaultError = (0, import_smithy_client3.withBaseException)(STSServiceException);
  var buildHttpRpcRequest = /* @__PURE__ */ __name(async (context, headers, path, resolvedHostname, body) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const contents = {
      protocol,
      hostname,
      port,
      method: "POST",
      path: basePath.endsWith("/") ? basePath.slice(0, -1) + path : basePath + path,
      headers
    };
    if (resolvedHostname !== undefined) {
      contents.hostname = resolvedHostname;
    }
    if (body !== undefined) {
      contents.body = body;
    }
    return new import_protocol_http.HttpRequest(contents);
  }, "buildHttpRpcRequest");
  var SHARED_HEADERS = {
    "content-type": "application/x-www-form-urlencoded"
  };
  var _ = "2011-06-15";
  var _A = "Action";
  var _AKI = "AccessKeyId";
  var _AR = "AssumeRole";
  var _ARI = "AssumedRoleId";
  var _ARU = "AssumedRoleUser";
  var _ARWWI = "AssumeRoleWithWebIdentity";
  var _Ar = "Arn";
  var _Au = "Audience";
  var _C = "Credentials";
  var _CA = "ContextAssertion";
  var _DS = "DurationSeconds";
  var _E = "Expiration";
  var _EI = "ExternalId";
  var _K = "Key";
  var _P = "Policy";
  var _PA = "PolicyArns";
  var _PAr = "ProviderArn";
  var _PC = "ProvidedContexts";
  var _PI = "ProviderId";
  var _PPS = "PackedPolicySize";
  var _Pr = "Provider";
  var _RA = "RoleArn";
  var _RSN = "RoleSessionName";
  var _SAK = "SecretAccessKey";
  var _SFWIT = "SubjectFromWebIdentityToken";
  var _SI = "SourceIdentity";
  var _SN = "SerialNumber";
  var _ST = "SessionToken";
  var _T = "Tags";
  var _TC = "TokenCode";
  var _TTK = "TransitiveTagKeys";
  var _V = "Version";
  var _Va = "Value";
  var _WIT = "WebIdentityToken";
  var _a = "arn";
  var _m = "message";
  var buildFormUrlencodedString = /* @__PURE__ */ __name((formEntries) => Object.entries(formEntries).map(([key, value]) => (0, import_smithy_client3.extendedEncodeURIComponent)(key) + "=" + (0, import_smithy_client3.extendedEncodeURIComponent)(value)).join("&"), "buildFormUrlencodedString");
  var loadQueryErrorCode = /* @__PURE__ */ __name((output, data) => {
    if (data.Error?.Code !== undefined) {
      return data.Error.Code;
    }
    if (output.statusCode == 404) {
      return "NotFound";
    }
  }, "loadQueryErrorCode");
  var AssumeRoleCommand = class extends import_smithy_client4.Command.classBuilder().ep(import_EndpointParameters.commonParams).m(function(Command, cs, config, o) {
    return [
      (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
      (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
    ];
  }).s("AWSSecurityTokenServiceV20110615", "AssumeRole", {}).n("STSClient", "AssumeRoleCommand").f(undefined, AssumeRoleResponseFilterSensitiveLog).ser(se_AssumeRoleCommand).de(de_AssumeRoleCommand).build() {
    static {
      __name(this, "AssumeRoleCommand");
    }
  };
  var import_middleware_endpoint2 = require_dist_cjs20();
  var import_middleware_serde2 = require_dist_cjs3();
  var import_smithy_client5 = require_dist_cjs8();
  var import_EndpointParameters2 = require_EndpointParameters();
  var AssumeRoleWithWebIdentityCommand = class extends import_smithy_client5.Command.classBuilder().ep(import_EndpointParameters2.commonParams).m(function(Command, cs, config, o) {
    return [
      (0, import_middleware_serde2.getSerdePlugin)(config, this.serialize, this.deserialize),
      (0, import_middleware_endpoint2.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
    ];
  }).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {}).n("STSClient", "AssumeRoleWithWebIdentityCommand").f(AssumeRoleWithWebIdentityRequestFilterSensitiveLog, AssumeRoleWithWebIdentityResponseFilterSensitiveLog).ser(se_AssumeRoleWithWebIdentityCommand).de(de_AssumeRoleWithWebIdentityCommand).build() {
    static {
      __name(this, "AssumeRoleWithWebIdentityCommand");
    }
  };
  var import_STSClient = require_STSClient();
  var commands = {
    AssumeRoleCommand,
    AssumeRoleWithWebIdentityCommand
  };
  var STS = class extends import_STSClient.STSClient {
    static {
      __name(this, "STS");
    }
  };
  (0, import_smithy_client6.createAggregatedClient)(commands, STS);
  var import_EndpointParameters3 = require_EndpointParameters();
  var import_client = require_client();
  var ASSUME_ROLE_DEFAULT_REGION = "us-east-1";
  var getAccountIdFromAssumedRoleUser = /* @__PURE__ */ __name((assumedRoleUser) => {
    if (typeof assumedRoleUser?.Arn === "string") {
      const arnComponents = assumedRoleUser.Arn.split(":");
      if (arnComponents.length > 4 && arnComponents[4] !== "") {
        return arnComponents[4];
      }
    }
    return;
  }, "getAccountIdFromAssumedRoleUser");
  var resolveRegion = /* @__PURE__ */ __name(async (_region, _parentRegion, credentialProviderLogger) => {
    const region = typeof _region === "function" ? await _region() : _region;
    const parentRegion = typeof _parentRegion === "function" ? await _parentRegion() : _parentRegion;
    credentialProviderLogger?.debug?.("@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${region} (provider)`, `${parentRegion} (parent client)`, `${ASSUME_ROLE_DEFAULT_REGION} (STS default)`);
    return region ?? parentRegion ?? ASSUME_ROLE_DEFAULT_REGION;
  }, "resolveRegion");
  var getDefaultRoleAssumer = /* @__PURE__ */ __name((stsOptions, STSClient3) => {
    let stsClient;
    let closureSourceCreds;
    return async (sourceCreds, params) => {
      closureSourceCreds = sourceCreds;
      if (!stsClient) {
        const {
          logger = stsOptions?.parentClientConfig?.logger,
          region,
          requestHandler = stsOptions?.parentClientConfig?.requestHandler,
          credentialProviderLogger
        } = stsOptions;
        const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger);
        const isCompatibleRequestHandler = !isH2(requestHandler);
        stsClient = new STSClient3({
          profile: stsOptions?.parentClientConfig?.profile,
          credentialDefaultProvider: /* @__PURE__ */ __name(() => async () => closureSourceCreds, "credentialDefaultProvider"),
          region: resolvedRegion,
          requestHandler: isCompatibleRequestHandler ? requestHandler : undefined,
          logger
        });
      }
      const { Credentials: Credentials2, AssumedRoleUser: AssumedRoleUser2 } = await stsClient.send(new AssumeRoleCommand(params));
      if (!Credentials2 || !Credentials2.AccessKeyId || !Credentials2.SecretAccessKey) {
        throw new Error(`Invalid response from STS.assumeRole call with role ${params.RoleArn}`);
      }
      const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser2);
      const credentials = {
        accessKeyId: Credentials2.AccessKeyId,
        secretAccessKey: Credentials2.SecretAccessKey,
        sessionToken: Credentials2.SessionToken,
        expiration: Credentials2.Expiration,
        ...Credentials2.CredentialScope && { credentialScope: Credentials2.CredentialScope },
        ...accountId && { accountId }
      };
      (0, import_client.setCredentialFeature)(credentials, "CREDENTIALS_STS_ASSUME_ROLE", "i");
      return credentials;
    };
  }, "getDefaultRoleAssumer");
  var getDefaultRoleAssumerWithWebIdentity = /* @__PURE__ */ __name((stsOptions, STSClient3) => {
    let stsClient;
    return async (params) => {
      if (!stsClient) {
        const {
          logger = stsOptions?.parentClientConfig?.logger,
          region,
          requestHandler = stsOptions?.parentClientConfig?.requestHandler,
          credentialProviderLogger
        } = stsOptions;
        const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger);
        const isCompatibleRequestHandler = !isH2(requestHandler);
        stsClient = new STSClient3({
          profile: stsOptions?.parentClientConfig?.profile,
          region: resolvedRegion,
          requestHandler: isCompatibleRequestHandler ? requestHandler : undefined,
          logger
        });
      }
      const { Credentials: Credentials2, AssumedRoleUser: AssumedRoleUser2 } = await stsClient.send(new AssumeRoleWithWebIdentityCommand(params));
      if (!Credentials2 || !Credentials2.AccessKeyId || !Credentials2.SecretAccessKey) {
        throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${params.RoleArn}`);
      }
      const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser2);
      const credentials = {
        accessKeyId: Credentials2.AccessKeyId,
        secretAccessKey: Credentials2.SecretAccessKey,
        sessionToken: Credentials2.SessionToken,
        expiration: Credentials2.Expiration,
        ...Credentials2.CredentialScope && { credentialScope: Credentials2.CredentialScope },
        ...accountId && { accountId }
      };
      if (accountId) {
        (0, import_client.setCredentialFeature)(credentials, "RESOLVED_ACCOUNT_ID", "T");
      }
      (0, import_client.setCredentialFeature)(credentials, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k");
      return credentials;
    };
  }, "getDefaultRoleAssumerWithWebIdentity");
  var isH2 = /* @__PURE__ */ __name((requestHandler) => {
    return requestHandler?.metadata?.handlerProtocol === "h2";
  }, "isH2");
  var import_STSClient2 = require_STSClient();
  var getCustomizableStsClientCtor = /* @__PURE__ */ __name((baseCtor, customizations) => {
    if (!customizations)
      return baseCtor;
    else
      return class CustomizableSTSClient extends baseCtor {
        static {
          __name(this, "CustomizableSTSClient");
        }
        constructor(config) {
          super(config);
          for (const customization of customizations) {
            this.middlewareStack.use(customization);
          }
        }
      };
  }, "getCustomizableStsClientCtor");
  var getDefaultRoleAssumer2 = /* @__PURE__ */ __name((stsOptions = {}, stsPlugins) => getDefaultRoleAssumer(stsOptions, getCustomizableStsClientCtor(import_STSClient2.STSClient, stsPlugins)), "getDefaultRoleAssumer");
  var getDefaultRoleAssumerWithWebIdentity2 = /* @__PURE__ */ __name((stsOptions = {}, stsPlugins) => getDefaultRoleAssumerWithWebIdentity(stsOptions, getCustomizableStsClientCtor(import_STSClient2.STSClient, stsPlugins)), "getDefaultRoleAssumerWithWebIdentity");
  var decorateDefaultCredentialProvider = /* @__PURE__ */ __name((provider) => (input) => provider({
    roleAssumer: getDefaultRoleAssumer2(input),
    roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity2(input),
    ...input
  }), "decorateDefaultCredentialProvider");
});
export default require_sts();
