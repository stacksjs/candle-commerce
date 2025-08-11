// @bun
import {
  DEFAULT_RETRY_MODE,
  EndpointCache,
  Hash,
  NODE_APP_ID_CONFIG_OPTIONS,
  NODE_MAX_ATTEMPT_CONFIG_OPTIONS,
  NODE_REGION_CONFIG_FILE_OPTIONS,
  NODE_REGION_CONFIG_OPTIONS,
  NODE_RETRY_MODE_CONFIG_OPTIONS,
  NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS,
  NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS,
  awsEndpointFunctions,
  calculateBodyLength,
  createDefaultUserAgentProvider,
  customEndpointFunctions,
  fromBase64,
  fromUtf8,
  getAwsRegionExtensionConfiguration,
  getContentLengthPlugin,
  getEndpointPlugin,
  getHostHeaderPlugin,
  getLoggerPlugin,
  getRecursionDetectionPlugin,
  getRetryPlugin,
  getSerdePlugin,
  getSmithyContext,
  getUserAgentPlugin,
  normalizeProvider,
  resolveAwsRegionExtensionConfiguration,
  resolveDefaultsModeConfig,
  resolveEndpoint,
  resolveEndpointConfig,
  resolveHostHeaderConfig,
  resolveRegionConfig,
  resolveRetryConfig,
  resolveUserAgentConfig,
  toBase64,
  toUtf8
} from "./chunk-2jnxjtkb.js";
import {
  loadConfig,
  parseUrl
} from "./chunk-1rm3adsy.js";
import {
  Client,
  Command,
  NoOpLogger,
  NodeHttpHandler,
  SENSITIVE_STRING,
  ServiceException,
  _json,
  decorateServiceException,
  emitWarningIfUnsupportedVersion,
  exports_dist_es,
  getDefaultExtensionConfiguration,
  getHttpHandlerExtensionConfiguration,
  isSerializableHeaderValue,
  loadConfigsForDefaultMode,
  map,
  resolveDefaultRuntimeConfig,
  resolveHttpHandlerRuntimeConfig,
  streamCollector,
  take,
  withBaseException
} from "./chunk-jc3evtjg.js";
import"./chunk-0be2fzx4.js";
import {
  require_dist_cjs1 as require_dist_cjs,
  require_dist_cjs3 as require_dist_cjs2
} from "./chunk-3bna256j.js";
import"./chunk-p8vym9ay.js";
import"./chunk-0rra9d59.js";
import"./chunk-n2a7wn2k.js";
import"./chunk-v4rn7sgz.js";
import {
  __toESM
} from "./chunk-1j66gxht.js";

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/SSOClient.js
var import_core5 = __toESM(require_dist_cjs(), 1);

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/auth/httpAuthSchemeProvider.js
var import_core = __toESM(require_dist_cjs2(), 1);
var defaultSSOHttpAuthSchemeParametersProvider = async (config, context, input) => {
  return {
    operation: getSmithyContext(context).operation,
    region: await normalizeProvider(config.region)() || (() => {
      throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
    })()
  };
};
function createAwsAuthSigv4HttpAuthOption(authParameters) {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "awsssoportal",
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
var defaultSSOHttpAuthSchemeProvider = (authParameters) => {
  const options = [];
  switch (authParameters.operation) {
    case "GetRoleCredentials": {
      options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
      break;
    }
    case "ListAccountRoles": {
      options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
      break;
    }
    case "ListAccounts": {
      options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
      break;
    }
    case "Logout": {
      options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
      break;
    }
    default: {
      options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
    }
  }
  return options;
};
var resolveHttpAuthSchemeConfig = (config) => {
  const config_0 = import_core.resolveAwsSdkSigV4Config(config);
  return Object.assign(config_0, {
    authSchemePreference: normalizeProvider(config.authSchemePreference ?? [])
  });
};

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/endpoint/EndpointParameters.js
var resolveClientEndpointParameters = (options) => {
  return Object.assign(options, {
    useDualstackEndpoint: options.useDualstackEndpoint ?? false,
    useFipsEndpoint: options.useFipsEndpoint ?? false,
    defaultSigningName: "awsssoportal"
  });
};
var commonParams = {
  UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
  Endpoint: { type: "builtInParams", name: "endpoint" },
  Region: { type: "builtInParams", name: "region" },
  UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
};
// ../../../../node_modules/@aws-sdk/client-sso/package.json
var package_default = {
  name: "@aws-sdk/client-sso",
  description: "AWS SDK for JavaScript Sso Client for Node.js, Browser and React Native",
  version: "3.835.0",
  scripts: {
    build: "concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
    "build:cjs": "node ../../scripts/compilation/inline client-sso",
    "build:es": "tsc -p tsconfig.es.json",
    "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
    "build:types": "tsc -p tsconfig.types.json",
    "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
    clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
    "extract:docs": "api-extractor run --local",
    "generate:client": "node ../../scripts/generate-clients/single-service --solo sso"
  },
  main: "./dist-cjs/index.js",
  types: "./dist-types/index.d.ts",
  module: "./dist-es/index.js",
  sideEffects: false,
  dependencies: {
    "@aws-crypto/sha256-browser": "5.2.0",
    "@aws-crypto/sha256-js": "5.2.0",
    "@aws-sdk/core": "3.835.0",
    "@aws-sdk/middleware-host-header": "3.821.0",
    "@aws-sdk/middleware-logger": "3.821.0",
    "@aws-sdk/middleware-recursion-detection": "3.821.0",
    "@aws-sdk/middleware-user-agent": "3.835.0",
    "@aws-sdk/region-config-resolver": "3.821.0",
    "@aws-sdk/types": "3.821.0",
    "@aws-sdk/util-endpoints": "3.828.0",
    "@aws-sdk/util-user-agent-browser": "3.821.0",
    "@aws-sdk/util-user-agent-node": "3.835.0",
    "@smithy/config-resolver": "^4.1.4",
    "@smithy/core": "^3.5.3",
    "@smithy/fetch-http-handler": "^5.0.4",
    "@smithy/hash-node": "^4.0.4",
    "@smithy/invalid-dependency": "^4.0.4",
    "@smithy/middleware-content-length": "^4.0.4",
    "@smithy/middleware-endpoint": "^4.1.12",
    "@smithy/middleware-retry": "^4.1.13",
    "@smithy/middleware-serde": "^4.0.8",
    "@smithy/middleware-stack": "^4.0.4",
    "@smithy/node-config-provider": "^4.1.3",
    "@smithy/node-http-handler": "^4.0.6",
    "@smithy/protocol-http": "^5.1.2",
    "@smithy/smithy-client": "^4.4.4",
    "@smithy/types": "^4.3.1",
    "@smithy/url-parser": "^4.0.4",
    "@smithy/util-base64": "^4.0.0",
    "@smithy/util-body-length-browser": "^4.0.0",
    "@smithy/util-body-length-node": "^4.0.0",
    "@smithy/util-defaults-mode-browser": "^4.0.20",
    "@smithy/util-defaults-mode-node": "^4.0.20",
    "@smithy/util-endpoints": "^3.0.6",
    "@smithy/util-middleware": "^4.0.4",
    "@smithy/util-retry": "^4.0.6",
    "@smithy/util-utf8": "^4.0.0",
    tslib: "^2.6.2"
  },
  devDependencies: {
    "@tsconfig/node18": "18.2.4",
    "@types/node": "^18.19.69",
    concurrently: "7.0.0",
    "downlevel-dts": "0.10.1",
    rimraf: "3.0.2",
    typescript: "~5.8.3"
  },
  engines: {
    node: ">=18.0.0"
  },
  typesVersions: {
    "<4.0": {
      "dist-types/*": [
        "dist-types/ts3.4/*"
      ]
    }
  },
  files: [
    "dist-*/**"
  ],
  author: {
    name: "AWS SDK for JavaScript Team",
    url: "https://aws.amazon.com/javascript/"
  },
  license: "Apache-2.0",
  browser: {
    "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser"
  },
  "react-native": {
    "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.native"
  },
  homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sso",
  repository: {
    type: "git",
    url: "https://github.com/aws/aws-sdk-js-v3.git",
    directory: "clients/client-sso"
  }
};

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/runtimeConfig.js
var import_core4 = __toESM(require_dist_cjs2(), 1);

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/runtimeConfig.shared.js
var import_core2 = __toESM(require_dist_cjs2(), 1);
var import_core3 = __toESM(require_dist_cjs(), 1);

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/endpoint/ruleset.js
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
var _data = { version: "1.0", parameters: { Region: i, UseDualStack: j, UseFIPS: j, Endpoint: i }, rules: [{ conditions: [{ [v]: b, [w]: [k] }], rules: [{ conditions: r, error: "Invalid Configuration: FIPS and custom endpoint are not supported", type: d }, { conditions: s, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", type: d }, { endpoint: { url: k, properties: n, headers: n }, type: e }], type: f }, { conditions: [{ [v]: b, [w]: t }], rules: [{ conditions: [{ [v]: "aws.partition", [w]: t, assign: g }], rules: [{ conditions: [l, m], rules: [{ conditions: [{ [v]: c, [w]: [a, o] }, q], rules: [{ endpoint: { url: "https://portal.sso-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: n, headers: n }, type: e }], type: f }, { error: "FIPS and DualStack are enabled, but this partition does not support one or both", type: d }], type: f }, { conditions: r, rules: [{ conditions: [{ [v]: c, [w]: [o, a] }], rules: [{ conditions: [{ [v]: "stringEquals", [w]: [{ [v]: h, [w]: [p, "name"] }, "aws-us-gov"] }], endpoint: { url: "https://portal.sso.{Region}.amazonaws.com", properties: n, headers: n }, type: e }, { endpoint: { url: "https://portal.sso-fips.{Region}.{PartitionResult#dnsSuffix}", properties: n, headers: n }, type: e }], type: f }, { error: "FIPS is enabled but this partition does not support FIPS", type: d }], type: f }, { conditions: s, rules: [{ conditions: [q], rules: [{ endpoint: { url: "https://portal.sso.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: n, headers: n }, type: e }], type: f }, { error: "DualStack is enabled but this partition does not support DualStack", type: d }], type: f }, { endpoint: { url: "https://portal.sso.{Region}.{PartitionResult#dnsSuffix}", properties: n, headers: n }, type: e }], type: f }], type: f }, { error: "Invalid Configuration: Missing Region", type: d }] };
var ruleSet = _data;

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/endpoint/endpointResolver.js
var cache = new EndpointCache({
  size: 50,
  params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
});
var defaultEndpointResolver = (endpointParams, context = {}) => {
  return cache.get(endpointParams, () => resolveEndpoint(ruleSet, {
    endpointParams,
    logger: context.logger
  }));
};
customEndpointFunctions.aws = awsEndpointFunctions;

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/runtimeConfig.shared.js
var getRuntimeConfig = (config) => {
  return {
    apiVersion: "2019-06-10",
    base64Decoder: config?.base64Decoder ?? fromBase64,
    base64Encoder: config?.base64Encoder ?? toBase64,
    disableHostPrefix: config?.disableHostPrefix ?? false,
    endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
    extensions: config?.extensions ?? [],
    httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultSSOHttpAuthSchemeProvider,
    httpAuthSchemes: config?.httpAuthSchemes ?? [
      {
        schemeId: "aws.auth#sigv4",
        identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
        signer: new import_core2.AwsSdkSigV4Signer
      },
      {
        schemeId: "smithy.api#noAuth",
        identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
        signer: new import_core3.NoAuthSigner
      }
    ],
    logger: config?.logger ?? new NoOpLogger,
    serviceId: config?.serviceId ?? "SSO",
    urlParser: config?.urlParser ?? parseUrl,
    utf8Decoder: config?.utf8Decoder ?? fromUtf8,
    utf8Encoder: config?.utf8Encoder ?? toUtf8
  };
};

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/runtimeConfig.js
var getRuntimeConfig2 = (config) => {
  emitWarningIfUnsupportedVersion(process.version);
  const defaultsMode = resolveDefaultsModeConfig(config);
  const defaultConfigProvider = () => defaultsMode().then(loadConfigsForDefaultMode);
  const clientSharedValues = getRuntimeConfig(config);
  import_core4.emitWarningIfUnsupportedVersion(process.version);
  const loaderConfig = {
    profile: config?.profile,
    logger: clientSharedValues.logger
  };
  return {
    ...clientSharedValues,
    ...config,
    runtime: "node",
    defaultsMode,
    authSchemePreference: config?.authSchemePreference ?? loadConfig(import_core4.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
    bodyLengthChecker: config?.bodyLengthChecker ?? calculateBodyLength,
    defaultUserAgentProvider: config?.defaultUserAgentProvider ?? createDefaultUserAgentProvider({ serviceId: clientSharedValues.serviceId, clientVersion: package_default.version }),
    maxAttempts: config?.maxAttempts ?? loadConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
    region: config?.region ?? loadConfig(NODE_REGION_CONFIG_OPTIONS, { ...NODE_REGION_CONFIG_FILE_OPTIONS, ...loaderConfig }),
    requestHandler: NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
    retryMode: config?.retryMode ?? loadConfig({
      ...NODE_RETRY_MODE_CONFIG_OPTIONS,
      default: async () => (await defaultConfigProvider()).retryMode || DEFAULT_RETRY_MODE
    }, config),
    sha256: config?.sha256 ?? Hash.bind(null, "sha256"),
    streamCollector: config?.streamCollector ?? streamCollector,
    useDualstackEndpoint: config?.useDualstackEndpoint ?? loadConfig(NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
    useFipsEndpoint: config?.useFipsEndpoint ?? loadConfig(NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
    userAgentAppId: config?.userAgentAppId ?? loadConfig(NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
  };
};

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/auth/httpAuthExtensionConfiguration.js
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
var resolveHttpAuthRuntimeConfig = (config) => {
  return {
    httpAuthSchemes: config.httpAuthSchemes(),
    httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
    credentials: config.credentials()
  };
};

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/runtimeExtensions.js
var resolveRuntimeExtensions = (runtimeConfig, extensions) => {
  const extensionConfiguration = Object.assign(getAwsRegionExtensionConfiguration(runtimeConfig), getDefaultExtensionConfiguration(runtimeConfig), getHttpHandlerExtensionConfiguration(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
  extensions.forEach((extension) => extension.configure(extensionConfiguration));
  return Object.assign(runtimeConfig, resolveAwsRegionExtensionConfiguration(extensionConfiguration), resolveDefaultRuntimeConfig(extensionConfiguration), resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
};

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/SSOClient.js
class SSOClient extends Client {
  config;
  constructor(...[configuration]) {
    const _config_0 = getRuntimeConfig2(configuration || {});
    super(_config_0);
    this.initConfig = _config_0;
    const _config_1 = resolveClientEndpointParameters(_config_0);
    const _config_2 = resolveUserAgentConfig(_config_1);
    const _config_3 = resolveRetryConfig(_config_2);
    const _config_4 = resolveRegionConfig(_config_3);
    const _config_5 = resolveHostHeaderConfig(_config_4);
    const _config_6 = resolveEndpointConfig(_config_5);
    const _config_7 = resolveHttpAuthSchemeConfig(_config_6);
    const _config_8 = resolveRuntimeExtensions(_config_7, configuration?.extensions || []);
    this.config = _config_8;
    this.middlewareStack.use(getUserAgentPlugin(this.config));
    this.middlewareStack.use(getRetryPlugin(this.config));
    this.middlewareStack.use(getContentLengthPlugin(this.config));
    this.middlewareStack.use(getHostHeaderPlugin(this.config));
    this.middlewareStack.use(getLoggerPlugin(this.config));
    this.middlewareStack.use(getRecursionDetectionPlugin(this.config));
    this.middlewareStack.use(import_core5.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
      httpAuthSchemeParametersProvider: defaultSSOHttpAuthSchemeParametersProvider,
      identityProviderConfigProvider: async (config) => new import_core5.DefaultIdentityProviderConfig({
        "aws.auth#sigv4": config.credentials
      })
    }));
    this.middlewareStack.use(import_core5.getHttpSigningPlugin(this.config));
  }
  destroy() {
    super.destroy();
  }
}

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/models/SSOServiceException.js
class SSOServiceException extends ServiceException {
  constructor(options) {
    super(options);
    Object.setPrototypeOf(this, SSOServiceException.prototype);
  }
}

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/models/models_0.js
class InvalidRequestException extends SSOServiceException {
  name = "InvalidRequestException";
  $fault = "client";
  constructor(opts) {
    super({
      name: "InvalidRequestException",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, InvalidRequestException.prototype);
  }
}

class ResourceNotFoundException extends SSOServiceException {
  name = "ResourceNotFoundException";
  $fault = "client";
  constructor(opts) {
    super({
      name: "ResourceNotFoundException",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
  }
}

class TooManyRequestsException extends SSOServiceException {
  name = "TooManyRequestsException";
  $fault = "client";
  constructor(opts) {
    super({
      name: "TooManyRequestsException",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, TooManyRequestsException.prototype);
  }
}

class UnauthorizedException extends SSOServiceException {
  name = "UnauthorizedException";
  $fault = "client";
  constructor(opts) {
    super({
      name: "UnauthorizedException",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}
var GetRoleCredentialsRequestFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.accessToken && { accessToken: SENSITIVE_STRING }
});
var RoleCredentialsFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.secretAccessKey && { secretAccessKey: SENSITIVE_STRING },
  ...obj.sessionToken && { sessionToken: SENSITIVE_STRING }
});
var GetRoleCredentialsResponseFilterSensitiveLog = (obj) => ({
  ...obj,
  ...obj.roleCredentials && { roleCredentials: RoleCredentialsFilterSensitiveLog(obj.roleCredentials) }
});

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/protocols/Aws_restJson1.js
var import_core6 = __toESM(require_dist_cjs2(), 1);
var import_core7 = __toESM(require_dist_cjs(), 1);
var se_GetRoleCredentialsCommand = async (input, context) => {
  const b2 = import_core7.requestBuilder(input, context);
  const headers = map({}, isSerializableHeaderValue, {
    [_xasbt]: input[_aT]
  });
  b2.bp("/federation/credentials");
  const query = map({
    [_rn]: [, exports_dist_es.expectNonNull(input[_rN], `roleName`)],
    [_ai]: [, exports_dist_es.expectNonNull(input[_aI], `accountId`)]
  });
  let body;
  b2.m("GET").h(headers).q(query).b(body);
  return b2.build();
};
var de_GetRoleCredentialsCommand = async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = map({
    $metadata: deserializeMetadata(output)
  });
  const data = exports_dist_es.expectNonNull(exports_dist_es.expectObject(await import_core6.parseJsonBody(output.body, context)), "body");
  const doc = take(data, {
    roleCredentials: _json
  });
  Object.assign(contents, doc);
  return contents;
};
var de_CommandError = async (output, context) => {
  const parsedOutput = {
    ...output,
    body: await import_core6.parseJsonErrorBody(output.body, context)
  };
  const errorCode = import_core6.loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "InvalidRequestException":
    case "com.amazonaws.sso#InvalidRequestException":
      throw await de_InvalidRequestExceptionRes(parsedOutput, context);
    case "ResourceNotFoundException":
    case "com.amazonaws.sso#ResourceNotFoundException":
      throw await de_ResourceNotFoundExceptionRes(parsedOutput, context);
    case "TooManyRequestsException":
    case "com.amazonaws.sso#TooManyRequestsException":
      throw await de_TooManyRequestsExceptionRes(parsedOutput, context);
    case "UnauthorizedException":
    case "com.amazonaws.sso#UnauthorizedException":
      throw await de_UnauthorizedExceptionRes(parsedOutput, context);
    default:
      const parsedBody = parsedOutput.body;
      return throwDefaultError({
        output,
        parsedBody,
        errorCode
      });
  }
};
var throwDefaultError = withBaseException(SSOServiceException);
var de_InvalidRequestExceptionRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const doc = take(data, {
    message: exports_dist_es.expectString
  });
  Object.assign(contents, doc);
  const exception = new InvalidRequestException({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var de_ResourceNotFoundExceptionRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const doc = take(data, {
    message: exports_dist_es.expectString
  });
  Object.assign(contents, doc);
  const exception = new ResourceNotFoundException({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var de_TooManyRequestsExceptionRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const doc = take(data, {
    message: exports_dist_es.expectString
  });
  Object.assign(contents, doc);
  const exception = new TooManyRequestsException({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var de_UnauthorizedExceptionRes = async (parsedOutput, context) => {
  const contents = map({});
  const data = parsedOutput.body;
  const doc = take(data, {
    message: exports_dist_es.expectString
  });
  Object.assign(contents, doc);
  const exception = new UnauthorizedException({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return decorateServiceException(exception, parsedOutput.body);
};
var deserializeMetadata = (output) => ({
  httpStatusCode: output.statusCode,
  requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
  extendedRequestId: output.headers["x-amz-id-2"],
  cfId: output.headers["x-amz-cf-id"]
});
var _aI = "accountId";
var _aT = "accessToken";
var _ai = "account_id";
var _rN = "roleName";
var _rn = "role_name";
var _xasbt = "x-amz-sso_bearer_token";

// ../../../../node_modules/@aws-sdk/client-sso/dist-es/commands/GetRoleCredentialsCommand.js
class GetRoleCredentialsCommand extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
  return [
    getSerdePlugin(config, this.serialize, this.deserialize),
    getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
  ];
}).s("SWBPortalService", "GetRoleCredentials", {}).n("SSOClient", "GetRoleCredentialsCommand").f(GetRoleCredentialsRequestFilterSensitiveLog, GetRoleCredentialsResponseFilterSensitiveLog).ser(se_GetRoleCredentialsCommand).de(de_GetRoleCredentialsCommand).build() {
}
export {
  SSOClient,
  GetRoleCredentialsCommand
};
