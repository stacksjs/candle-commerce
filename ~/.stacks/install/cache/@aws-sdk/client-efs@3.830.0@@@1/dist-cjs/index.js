"use strict";
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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AccessPointAlreadyExists: () => AccessPointAlreadyExists,
  AccessPointLimitExceeded: () => AccessPointLimitExceeded,
  AccessPointNotFound: () => AccessPointNotFound,
  AvailabilityZonesMismatch: () => AvailabilityZonesMismatch,
  BadRequest: () => BadRequest,
  ConflictException: () => ConflictException,
  CreateAccessPointCommand: () => CreateAccessPointCommand,
  CreateFileSystemCommand: () => CreateFileSystemCommand,
  CreateMountTargetCommand: () => CreateMountTargetCommand,
  CreateReplicationConfigurationCommand: () => CreateReplicationConfigurationCommand,
  CreateTagsCommand: () => CreateTagsCommand,
  DeleteAccessPointCommand: () => DeleteAccessPointCommand,
  DeleteFileSystemCommand: () => DeleteFileSystemCommand,
  DeleteFileSystemPolicyCommand: () => DeleteFileSystemPolicyCommand,
  DeleteMountTargetCommand: () => DeleteMountTargetCommand,
  DeleteReplicationConfigurationCommand: () => DeleteReplicationConfigurationCommand,
  DeleteTagsCommand: () => DeleteTagsCommand,
  DeletionMode: () => DeletionMode,
  DependencyTimeout: () => DependencyTimeout,
  DescribeAccessPointsCommand: () => DescribeAccessPointsCommand,
  DescribeAccountPreferencesCommand: () => DescribeAccountPreferencesCommand,
  DescribeBackupPolicyCommand: () => DescribeBackupPolicyCommand,
  DescribeFileSystemPolicyCommand: () => DescribeFileSystemPolicyCommand,
  DescribeFileSystemsCommand: () => DescribeFileSystemsCommand,
  DescribeLifecycleConfigurationCommand: () => DescribeLifecycleConfigurationCommand,
  DescribeMountTargetSecurityGroupsCommand: () => DescribeMountTargetSecurityGroupsCommand,
  DescribeMountTargetsCommand: () => DescribeMountTargetsCommand,
  DescribeReplicationConfigurationsCommand: () => DescribeReplicationConfigurationsCommand,
  DescribeTagsCommand: () => DescribeTagsCommand,
  EFS: () => EFS,
  EFSClient: () => EFSClient,
  EFSServiceException: () => EFSServiceException,
  FileSystemAlreadyExists: () => FileSystemAlreadyExists,
  FileSystemInUse: () => FileSystemInUse,
  FileSystemLimitExceeded: () => FileSystemLimitExceeded,
  FileSystemNotFound: () => FileSystemNotFound,
  IncorrectFileSystemLifeCycleState: () => IncorrectFileSystemLifeCycleState,
  IncorrectMountTargetState: () => IncorrectMountTargetState,
  InsufficientThroughputCapacity: () => InsufficientThroughputCapacity,
  InternalServerError: () => InternalServerError,
  InvalidPolicyException: () => InvalidPolicyException,
  IpAddressInUse: () => IpAddressInUse,
  IpAddressType: () => IpAddressType,
  LifeCycleState: () => LifeCycleState,
  ListTagsForResourceCommand: () => ListTagsForResourceCommand,
  ModifyMountTargetSecurityGroupsCommand: () => ModifyMountTargetSecurityGroupsCommand,
  MountTargetConflict: () => MountTargetConflict,
  MountTargetNotFound: () => MountTargetNotFound,
  NetworkInterfaceLimitExceeded: () => NetworkInterfaceLimitExceeded,
  NoFreeAddressesInSubnet: () => NoFreeAddressesInSubnet,
  PerformanceMode: () => PerformanceMode,
  PolicyNotFound: () => PolicyNotFound,
  PutAccountPreferencesCommand: () => PutAccountPreferencesCommand,
  PutBackupPolicyCommand: () => PutBackupPolicyCommand,
  PutFileSystemPolicyCommand: () => PutFileSystemPolicyCommand,
  PutLifecycleConfigurationCommand: () => PutLifecycleConfigurationCommand,
  ReplicationAlreadyExists: () => ReplicationAlreadyExists,
  ReplicationNotFound: () => ReplicationNotFound,
  ReplicationOverwriteProtection: () => ReplicationOverwriteProtection,
  ReplicationStatus: () => ReplicationStatus,
  Resource: () => Resource,
  ResourceIdType: () => ResourceIdType,
  SecurityGroupLimitExceeded: () => SecurityGroupLimitExceeded,
  SecurityGroupNotFound: () => SecurityGroupNotFound,
  Status: () => Status,
  SubnetNotFound: () => SubnetNotFound,
  TagResourceCommand: () => TagResourceCommand,
  ThrottlingException: () => ThrottlingException,
  ThroughputLimitExceeded: () => ThroughputLimitExceeded,
  ThroughputMode: () => ThroughputMode,
  TooManyRequests: () => TooManyRequests,
  TransitionToArchiveRules: () => TransitionToArchiveRules,
  TransitionToIARules: () => TransitionToIARules,
  TransitionToPrimaryStorageClassRules: () => TransitionToPrimaryStorageClassRules,
  UnsupportedAvailabilityZone: () => UnsupportedAvailabilityZone,
  UntagResourceCommand: () => UntagResourceCommand,
  UpdateFileSystemCommand: () => UpdateFileSystemCommand,
  UpdateFileSystemProtectionCommand: () => UpdateFileSystemProtectionCommand,
  ValidationException: () => ValidationException,
  __Client: () => import_smithy_client.Client,
  paginateDescribeAccessPoints: () => paginateDescribeAccessPoints,
  paginateDescribeFileSystems: () => paginateDescribeFileSystems,
  paginateDescribeMountTargets: () => paginateDescribeMountTargets,
  paginateDescribeReplicationConfigurations: () => paginateDescribeReplicationConfigurations,
  paginateDescribeTags: () => paginateDescribeTags,
  paginateListTagsForResource: () => paginateListTagsForResource
});
module.exports = __toCommonJS(index_exports);

// src/EFSClient.ts
var import_middleware_host_header = require("@aws-sdk/middleware-host-header");
var import_middleware_logger = require("@aws-sdk/middleware-logger");
var import_middleware_recursion_detection = require("@aws-sdk/middleware-recursion-detection");
var import_middleware_user_agent = require("@aws-sdk/middleware-user-agent");
var import_config_resolver = require("@smithy/config-resolver");
var import_core = require("@smithy/core");
var import_middleware_content_length = require("@smithy/middleware-content-length");
var import_middleware_endpoint = require("@smithy/middleware-endpoint");
var import_middleware_retry = require("@smithy/middleware-retry");

var import_httpAuthSchemeProvider = require("./auth/httpAuthSchemeProvider");

// src/endpoint/EndpointParameters.ts
var resolveClientEndpointParameters = /* @__PURE__ */ __name((options) => {
  return Object.assign(options, {
    useDualstackEndpoint: options.useDualstackEndpoint ?? false,
    useFipsEndpoint: options.useFipsEndpoint ?? false,
    defaultSigningName: "elasticfilesystem"
  });
}, "resolveClientEndpointParameters");
var commonParams = {
  UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
  Endpoint: { type: "builtInParams", name: "endpoint" },
  Region: { type: "builtInParams", name: "region" },
  UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
};

// src/EFSClient.ts
var import_runtimeConfig = require("././runtimeConfig");

// src/runtimeExtensions.ts
var import_region_config_resolver = require("@aws-sdk/region-config-resolver");
var import_protocol_http = require("@smithy/protocol-http");
var import_smithy_client = require("@smithy/smithy-client");

// src/auth/httpAuthExtensionConfiguration.ts
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

// src/runtimeExtensions.ts
var resolveRuntimeExtensions = /* @__PURE__ */ __name((runtimeConfig, extensions) => {
  const extensionConfiguration = Object.assign(
    (0, import_region_config_resolver.getAwsRegionExtensionConfiguration)(runtimeConfig),
    (0, import_smithy_client.getDefaultExtensionConfiguration)(runtimeConfig),
    (0, import_protocol_http.getHttpHandlerExtensionConfiguration)(runtimeConfig),
    getHttpAuthExtensionConfiguration(runtimeConfig)
  );
  extensions.forEach((extension) => extension.configure(extensionConfiguration));
  return Object.assign(
    runtimeConfig,
    (0, import_region_config_resolver.resolveAwsRegionExtensionConfiguration)(extensionConfiguration),
    (0, import_smithy_client.resolveDefaultRuntimeConfig)(extensionConfiguration),
    (0, import_protocol_http.resolveHttpHandlerRuntimeConfig)(extensionConfiguration),
    resolveHttpAuthRuntimeConfig(extensionConfiguration)
  );
}, "resolveRuntimeExtensions");

// src/EFSClient.ts
var EFSClient = class extends import_smithy_client.Client {
  static {
    __name(this, "EFSClient");
  }
  /**
   * The resolved configuration of EFSClient class. This is resolved and normalized from the {@link EFSClientConfig | constructor configuration interface}.
   */
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
    this.middlewareStack.use(
      (0, import_core.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config, {
        httpAuthSchemeParametersProvider: import_httpAuthSchemeProvider.defaultEFSHttpAuthSchemeParametersProvider,
        identityProviderConfigProvider: /* @__PURE__ */ __name(async (config) => new import_core.DefaultIdentityProviderConfig({
          "aws.auth#sigv4": config.credentials
        }), "identityProviderConfigProvider")
      })
    );
    this.middlewareStack.use((0, import_core.getHttpSigningPlugin)(this.config));
  }
  /**
   * Destroy underlying resources, like sockets. It's usually not necessary to do this.
   * However in Node.js, it's best to explicitly shut down the client's agent when it is no longer needed.
   * Otherwise, sockets might stay open for quite a long time before the server terminates them.
   */
  destroy() {
    super.destroy();
  }
};

// src/EFS.ts


// src/commands/CreateAccessPointCommand.ts

var import_middleware_serde = require("@smithy/middleware-serde");


// src/protocols/Aws_restJson1.ts
var import_core2 = require("@aws-sdk/core");


var import_uuid = require("uuid");

// src/models/EFSServiceException.ts

var EFSServiceException = class _EFSServiceException extends import_smithy_client.ServiceException {
  static {
    __name(this, "EFSServiceException");
  }
  /**
   * @internal
   */
  constructor(options) {
    super(options);
    Object.setPrototypeOf(this, _EFSServiceException.prototype);
  }
};

// src/models/models_0.ts
var AccessPointAlreadyExists = class _AccessPointAlreadyExists extends EFSServiceException {
  static {
    __name(this, "AccessPointAlreadyExists");
  }
  name = "AccessPointAlreadyExists";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  AccessPointId;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "AccessPointAlreadyExists",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _AccessPointAlreadyExists.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
    this.AccessPointId = opts.AccessPointId;
  }
};
var LifeCycleState = {
  AVAILABLE: "available",
  CREATING: "creating",
  DELETED: "deleted",
  DELETING: "deleting",
  ERROR: "error",
  UPDATING: "updating"
};
var AccessPointLimitExceeded = class _AccessPointLimitExceeded extends EFSServiceException {
  static {
    __name(this, "AccessPointLimitExceeded");
  }
  name = "AccessPointLimitExceeded";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "AccessPointLimitExceeded",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _AccessPointLimitExceeded.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var AccessPointNotFound = class _AccessPointNotFound extends EFSServiceException {
  static {
    __name(this, "AccessPointNotFound");
  }
  name = "AccessPointNotFound";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "AccessPointNotFound",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _AccessPointNotFound.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var AvailabilityZonesMismatch = class _AvailabilityZonesMismatch extends EFSServiceException {
  static {
    __name(this, "AvailabilityZonesMismatch");
  }
  name = "AvailabilityZonesMismatch";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "AvailabilityZonesMismatch",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _AvailabilityZonesMismatch.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var Status = {
  DISABLED: "DISABLED",
  DISABLING: "DISABLING",
  ENABLED: "ENABLED",
  ENABLING: "ENABLING"
};
var BadRequest = class _BadRequest extends EFSServiceException {
  static {
    __name(this, "BadRequest");
  }
  name = "BadRequest";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "BadRequest",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _BadRequest.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var ConflictException = class _ConflictException extends EFSServiceException {
  static {
    __name(this, "ConflictException");
  }
  name = "ConflictException";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "ConflictException",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _ConflictException.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var FileSystemNotFound = class _FileSystemNotFound extends EFSServiceException {
  static {
    __name(this, "FileSystemNotFound");
  }
  name = "FileSystemNotFound";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "FileSystemNotFound",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _FileSystemNotFound.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var IncorrectFileSystemLifeCycleState = class _IncorrectFileSystemLifeCycleState extends EFSServiceException {
  static {
    __name(this, "IncorrectFileSystemLifeCycleState");
  }
  name = "IncorrectFileSystemLifeCycleState";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "IncorrectFileSystemLifeCycleState",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _IncorrectFileSystemLifeCycleState.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var InternalServerError = class _InternalServerError extends EFSServiceException {
  static {
    __name(this, "InternalServerError");
  }
  name = "InternalServerError";
  $fault = "server";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "InternalServerError",
      $fault: "server",
      ...opts
    });
    Object.setPrototypeOf(this, _InternalServerError.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var ThrottlingException = class _ThrottlingException extends EFSServiceException {
  static {
    __name(this, "ThrottlingException");
  }
  name = "ThrottlingException";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "ThrottlingException",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _ThrottlingException.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var PerformanceMode = {
  GENERAL_PURPOSE: "generalPurpose",
  MAX_IO: "maxIO"
};
var ThroughputMode = {
  BURSTING: "bursting",
  ELASTIC: "elastic",
  PROVISIONED: "provisioned"
};
var FileSystemAlreadyExists = class _FileSystemAlreadyExists extends EFSServiceException {
  static {
    __name(this, "FileSystemAlreadyExists");
  }
  name = "FileSystemAlreadyExists";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  FileSystemId;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "FileSystemAlreadyExists",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _FileSystemAlreadyExists.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
    this.FileSystemId = opts.FileSystemId;
  }
};
var ReplicationOverwriteProtection = {
  DISABLED: "DISABLED",
  ENABLED: "ENABLED",
  REPLICATING: "REPLICATING"
};
var FileSystemLimitExceeded = class _FileSystemLimitExceeded extends EFSServiceException {
  static {
    __name(this, "FileSystemLimitExceeded");
  }
  name = "FileSystemLimitExceeded";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "FileSystemLimitExceeded",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _FileSystemLimitExceeded.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var InsufficientThroughputCapacity = class _InsufficientThroughputCapacity extends EFSServiceException {
  static {
    __name(this, "InsufficientThroughputCapacity");
  }
  name = "InsufficientThroughputCapacity";
  $fault = "server";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "InsufficientThroughputCapacity",
      $fault: "server",
      ...opts
    });
    Object.setPrototypeOf(this, _InsufficientThroughputCapacity.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var ThroughputLimitExceeded = class _ThroughputLimitExceeded extends EFSServiceException {
  static {
    __name(this, "ThroughputLimitExceeded");
  }
  name = "ThroughputLimitExceeded";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "ThroughputLimitExceeded",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _ThroughputLimitExceeded.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var UnsupportedAvailabilityZone = class _UnsupportedAvailabilityZone extends EFSServiceException {
  static {
    __name(this, "UnsupportedAvailabilityZone");
  }
  name = "UnsupportedAvailabilityZone";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "UnsupportedAvailabilityZone",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _UnsupportedAvailabilityZone.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var IpAddressType = {
  DUAL_STACK: "DUAL_STACK",
  IPV4_ONLY: "IPV4_ONLY",
  IPV6_ONLY: "IPV6_ONLY"
};
var IpAddressInUse = class _IpAddressInUse extends EFSServiceException {
  static {
    __name(this, "IpAddressInUse");
  }
  name = "IpAddressInUse";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "IpAddressInUse",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _IpAddressInUse.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var MountTargetConflict = class _MountTargetConflict extends EFSServiceException {
  static {
    __name(this, "MountTargetConflict");
  }
  name = "MountTargetConflict";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "MountTargetConflict",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _MountTargetConflict.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var NetworkInterfaceLimitExceeded = class _NetworkInterfaceLimitExceeded extends EFSServiceException {
  static {
    __name(this, "NetworkInterfaceLimitExceeded");
  }
  name = "NetworkInterfaceLimitExceeded";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "NetworkInterfaceLimitExceeded",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _NetworkInterfaceLimitExceeded.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var NoFreeAddressesInSubnet = class _NoFreeAddressesInSubnet extends EFSServiceException {
  static {
    __name(this, "NoFreeAddressesInSubnet");
  }
  name = "NoFreeAddressesInSubnet";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "NoFreeAddressesInSubnet",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _NoFreeAddressesInSubnet.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var SecurityGroupLimitExceeded = class _SecurityGroupLimitExceeded extends EFSServiceException {
  static {
    __name(this, "SecurityGroupLimitExceeded");
  }
  name = "SecurityGroupLimitExceeded";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "SecurityGroupLimitExceeded",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _SecurityGroupLimitExceeded.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var SecurityGroupNotFound = class _SecurityGroupNotFound extends EFSServiceException {
  static {
    __name(this, "SecurityGroupNotFound");
  }
  name = "SecurityGroupNotFound";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "SecurityGroupNotFound",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _SecurityGroupNotFound.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var SubnetNotFound = class _SubnetNotFound extends EFSServiceException {
  static {
    __name(this, "SubnetNotFound");
  }
  name = "SubnetNotFound";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "SubnetNotFound",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _SubnetNotFound.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var ReplicationStatus = {
  DELETING: "DELETING",
  ENABLED: "ENABLED",
  ENABLING: "ENABLING",
  ERROR: "ERROR",
  PAUSED: "PAUSED",
  PAUSING: "PAUSING"
};
var ReplicationNotFound = class _ReplicationNotFound extends EFSServiceException {
  static {
    __name(this, "ReplicationNotFound");
  }
  name = "ReplicationNotFound";
  $fault = "client";
  /**
   * <p>ReplicationNotFound</p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "ReplicationNotFound",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _ReplicationNotFound.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var ValidationException = class _ValidationException extends EFSServiceException {
  static {
    __name(this, "ValidationException");
  }
  name = "ValidationException";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "ValidationException",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _ValidationException.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var FileSystemInUse = class _FileSystemInUse extends EFSServiceException {
  static {
    __name(this, "FileSystemInUse");
  }
  name = "FileSystemInUse";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "FileSystemInUse",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _FileSystemInUse.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var DependencyTimeout = class _DependencyTimeout extends EFSServiceException {
  static {
    __name(this, "DependencyTimeout");
  }
  name = "DependencyTimeout";
  $fault = "server";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "DependencyTimeout",
      $fault: "server",
      ...opts
    });
    Object.setPrototypeOf(this, _DependencyTimeout.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var MountTargetNotFound = class _MountTargetNotFound extends EFSServiceException {
  static {
    __name(this, "MountTargetNotFound");
  }
  name = "MountTargetNotFound";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "MountTargetNotFound",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _MountTargetNotFound.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var DeletionMode = {
  ALL_CONFIGURATIONS: "ALL_CONFIGURATIONS",
  LOCAL_CONFIGURATION_ONLY: "LOCAL_CONFIGURATION_ONLY"
};
var ResourceIdType = {
  LongId: "LONG_ID",
  ShortId: "SHORT_ID"
};
var Resource = {
  FileSystem: "FILE_SYSTEM",
  MountTarget: "MOUNT_TARGET"
};
var PolicyNotFound = class _PolicyNotFound extends EFSServiceException {
  static {
    __name(this, "PolicyNotFound");
  }
  name = "PolicyNotFound";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "PolicyNotFound",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _PolicyNotFound.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var TransitionToArchiveRules = {
  AFTER_14_DAYS: "AFTER_14_DAYS",
  AFTER_180_DAYS: "AFTER_180_DAYS",
  AFTER_1_DAY: "AFTER_1_DAY",
  AFTER_270_DAYS: "AFTER_270_DAYS",
  AFTER_30_DAYS: "AFTER_30_DAYS",
  AFTER_365_DAYS: "AFTER_365_DAYS",
  AFTER_60_DAYS: "AFTER_60_DAYS",
  AFTER_7_DAYS: "AFTER_7_DAYS",
  AFTER_90_DAYS: "AFTER_90_DAYS"
};
var TransitionToIARules = {
  AFTER_14_DAYS: "AFTER_14_DAYS",
  AFTER_180_DAYS: "AFTER_180_DAYS",
  AFTER_1_DAY: "AFTER_1_DAY",
  AFTER_270_DAYS: "AFTER_270_DAYS",
  AFTER_30_DAYS: "AFTER_30_DAYS",
  AFTER_365_DAYS: "AFTER_365_DAYS",
  AFTER_60_DAYS: "AFTER_60_DAYS",
  AFTER_7_DAYS: "AFTER_7_DAYS",
  AFTER_90_DAYS: "AFTER_90_DAYS"
};
var TransitionToPrimaryStorageClassRules = {
  AFTER_1_ACCESS: "AFTER_1_ACCESS"
};
var IncorrectMountTargetState = class _IncorrectMountTargetState extends EFSServiceException {
  static {
    __name(this, "IncorrectMountTargetState");
  }
  name = "IncorrectMountTargetState";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "IncorrectMountTargetState",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _IncorrectMountTargetState.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var InvalidPolicyException = class _InvalidPolicyException extends EFSServiceException {
  static {
    __name(this, "InvalidPolicyException");
  }
  name = "InvalidPolicyException";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "InvalidPolicyException",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _InvalidPolicyException.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var TooManyRequests = class _TooManyRequests extends EFSServiceException {
  static {
    __name(this, "TooManyRequests");
  }
  name = "TooManyRequests";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "TooManyRequests",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _TooManyRequests.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};
var ReplicationAlreadyExists = class _ReplicationAlreadyExists extends EFSServiceException {
  static {
    __name(this, "ReplicationAlreadyExists");
  }
  name = "ReplicationAlreadyExists";
  $fault = "client";
  /**
   * <p>The error code is a string that uniquely identifies an error condition.
   *         It is meant to be read and understood by programs that detect and handle errors by type. </p>
   * @public
   */
  ErrorCode;
  /**
   * <p>The error message contains a generic description of the error
   *         condition in English. It is intended for a human audience. Simple programs display the message directly
   *         to the end user if they encounter an error condition they don't know how or don't care to handle.
   *         Sophisticated programs with more exhaustive error handling and proper internationalization are
   *         more likely to ignore the error message.</p>
   * @public
   */
  Message;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "ReplicationAlreadyExists",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _ReplicationAlreadyExists.prototype);
    this.ErrorCode = opts.ErrorCode;
    this.Message = opts.Message;
  }
};

// src/protocols/Aws_restJson1.ts
var se_CreateAccessPointCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {
    "content-type": "application/json"
  };
  b.bp("/2015-02-01/access-points");
  let body;
  body = JSON.stringify(
    (0, import_smithy_client.take)(input, {
      ClientToken: [true, (_) => _ ?? (0, import_uuid.v4)()],
      FileSystemId: [],
      PosixUser: /* @__PURE__ */ __name((_) => (0, import_smithy_client._json)(_), "PosixUser"),
      RootDirectory: /* @__PURE__ */ __name((_) => (0, import_smithy_client._json)(_), "RootDirectory"),
      Tags: /* @__PURE__ */ __name((_) => (0, import_smithy_client._json)(_), "Tags")
    })
  );
  b.m("POST").h(headers).b(body);
  return b.build();
}, "se_CreateAccessPointCommand");
var se_CreateFileSystemCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {
    "content-type": "application/json"
  };
  b.bp("/2015-02-01/file-systems");
  let body;
  body = JSON.stringify(
    (0, import_smithy_client.take)(input, {
      AvailabilityZoneName: [],
      Backup: [],
      CreationToken: [true, (_) => _ ?? (0, import_uuid.v4)()],
      Encrypted: [],
      KmsKeyId: [],
      PerformanceMode: [],
      ProvisionedThroughputInMibps: /* @__PURE__ */ __name((_) => (0, import_smithy_client.serializeFloat)(_), "ProvisionedThroughputInMibps"),
      Tags: /* @__PURE__ */ __name((_) => (0, import_smithy_client._json)(_), "Tags"),
      ThroughputMode: []
    })
  );
  b.m("POST").h(headers).b(body);
  return b.build();
}, "se_CreateFileSystemCommand");
var se_CreateMountTargetCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {
    "content-type": "application/json"
  };
  b.bp("/2015-02-01/mount-targets");
  let body;
  body = JSON.stringify(
    (0, import_smithy_client.take)(input, {
      FileSystemId: [],
      IpAddress: [],
      IpAddressType: [],
      Ipv6Address: [],
      SecurityGroups: /* @__PURE__ */ __name((_) => (0, import_smithy_client._json)(_), "SecurityGroups"),
      SubnetId: []
    })
  );
  b.m("POST").h(headers).b(body);
  return b.build();
}, "se_CreateMountTargetCommand");
var se_CreateReplicationConfigurationCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {
    "content-type": "application/json"
  };
  b.bp("/2015-02-01/file-systems/{SourceFileSystemId}/replication-configuration");
  b.p("SourceFileSystemId", () => input.SourceFileSystemId, "{SourceFileSystemId}", false);
  let body;
  body = JSON.stringify(
    (0, import_smithy_client.take)(input, {
      Destinations: /* @__PURE__ */ __name((_) => (0, import_smithy_client._json)(_), "Destinations")
    })
  );
  b.m("POST").h(headers).b(body);
  return b.build();
}, "se_CreateReplicationConfigurationCommand");
var se_CreateTagsCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {
    "content-type": "application/json"
  };
  b.bp("/2015-02-01/create-tags/{FileSystemId}");
  b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
  let body;
  body = JSON.stringify(
    (0, import_smithy_client.take)(input, {
      Tags: /* @__PURE__ */ __name((_) => (0, import_smithy_client._json)(_), "Tags")
    })
  );
  b.m("POST").h(headers).b(body);
  return b.build();
}, "se_CreateTagsCommand");
var se_DeleteAccessPointCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/access-points/{AccessPointId}");
  b.p("AccessPointId", () => input.AccessPointId, "{AccessPointId}", false);
  let body;
  b.m("DELETE").h(headers).b(body);
  return b.build();
}, "se_DeleteAccessPointCommand");
var se_DeleteFileSystemCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/file-systems/{FileSystemId}");
  b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
  let body;
  b.m("DELETE").h(headers).b(body);
  return b.build();
}, "se_DeleteFileSystemCommand");
var se_DeleteFileSystemPolicyCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/file-systems/{FileSystemId}/policy");
  b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
  let body;
  b.m("DELETE").h(headers).b(body);
  return b.build();
}, "se_DeleteFileSystemPolicyCommand");
var se_DeleteMountTargetCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/mount-targets/{MountTargetId}");
  b.p("MountTargetId", () => input.MountTargetId, "{MountTargetId}", false);
  let body;
  b.m("DELETE").h(headers).b(body);
  return b.build();
}, "se_DeleteMountTargetCommand");
var se_DeleteReplicationConfigurationCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/file-systems/{SourceFileSystemId}/replication-configuration");
  b.p("SourceFileSystemId", () => input.SourceFileSystemId, "{SourceFileSystemId}", false);
  const query = (0, import_smithy_client.map)({
    [_dM]: [, input[_DM]]
  });
  let body;
  b.m("DELETE").h(headers).q(query).b(body);
  return b.build();
}, "se_DeleteReplicationConfigurationCommand");
var se_DeleteTagsCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {
    "content-type": "application/json"
  };
  b.bp("/2015-02-01/delete-tags/{FileSystemId}");
  b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
  let body;
  body = JSON.stringify(
    (0, import_smithy_client.take)(input, {
      TagKeys: /* @__PURE__ */ __name((_) => (0, import_smithy_client._json)(_), "TagKeys")
    })
  );
  b.m("POST").h(headers).b(body);
  return b.build();
}, "se_DeleteTagsCommand");
var se_DescribeAccessPointsCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/access-points");
  const query = (0, import_smithy_client.map)({
    [_MR]: [() => input.MaxResults !== void 0, () => input[_MR].toString()],
    [_NT]: [, input[_NT]],
    [_API]: [, input[_API]],
    [_FSI]: [, input[_FSI]]
  });
  let body;
  b.m("GET").h(headers).q(query).b(body);
  return b.build();
}, "se_DescribeAccessPointsCommand");
var se_DescribeAccountPreferencesCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {
    "content-type": "application/json"
  };
  b.bp("/2015-02-01/account-preferences");
  let body;
  body = JSON.stringify(
    (0, import_smithy_client.take)(input, {
      MaxResults: [],
      NextToken: []
    })
  );
  b.m("GET").h(headers).b(body);
  return b.build();
}, "se_DescribeAccountPreferencesCommand");
var se_DescribeBackupPolicyCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/file-systems/{FileSystemId}/backup-policy");
  b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
  let body;
  b.m("GET").h(headers).b(body);
  return b.build();
}, "se_DescribeBackupPolicyCommand");
var se_DescribeFileSystemPolicyCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/file-systems/{FileSystemId}/policy");
  b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
  let body;
  b.m("GET").h(headers).b(body);
  return b.build();
}, "se_DescribeFileSystemPolicyCommand");
var se_DescribeFileSystemsCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/file-systems");
  const query = (0, import_smithy_client.map)({
    [_MI]: [() => input.MaxItems !== void 0, () => input[_MI].toString()],
    [_M]: [, input[_M]],
    [_CT]: [, input[_CT]],
    [_FSI]: [, input[_FSI]]
  });
  let body;
  b.m("GET").h(headers).q(query).b(body);
  return b.build();
}, "se_DescribeFileSystemsCommand");
var se_DescribeLifecycleConfigurationCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/file-systems/{FileSystemId}/lifecycle-configuration");
  b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
  let body;
  b.m("GET").h(headers).b(body);
  return b.build();
}, "se_DescribeLifecycleConfigurationCommand");
var se_DescribeMountTargetsCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/mount-targets");
  const query = (0, import_smithy_client.map)({
    [_MI]: [() => input.MaxItems !== void 0, () => input[_MI].toString()],
    [_M]: [, input[_M]],
    [_FSI]: [, input[_FSI]],
    [_MTI]: [, input[_MTI]],
    [_API]: [, input[_API]]
  });
  let body;
  b.m("GET").h(headers).q(query).b(body);
  return b.build();
}, "se_DescribeMountTargetsCommand");
var se_DescribeMountTargetSecurityGroupsCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/mount-targets/{MountTargetId}/security-groups");
  b.p("MountTargetId", () => input.MountTargetId, "{MountTargetId}", false);
  let body;
  b.m("GET").h(headers).b(body);
  return b.build();
}, "se_DescribeMountTargetSecurityGroupsCommand");
var se_DescribeReplicationConfigurationsCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/file-systems/replication-configurations");
  const query = (0, import_smithy_client.map)({
    [_FSI]: [, input[_FSI]],
    [_NT]: [, input[_NT]],
    [_MR]: [() => input.MaxResults !== void 0, () => input[_MR].toString()]
  });
  let body;
  b.m("GET").h(headers).q(query).b(body);
  return b.build();
}, "se_DescribeReplicationConfigurationsCommand");
var se_DescribeTagsCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/tags/{FileSystemId}");
  b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
  const query = (0, import_smithy_client.map)({
    [_MI]: [() => input.MaxItems !== void 0, () => input[_MI].toString()],
    [_M]: [, input[_M]]
  });
  let body;
  b.m("GET").h(headers).q(query).b(body);
  return b.build();
}, "se_DescribeTagsCommand");
var se_ListTagsForResourceCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/resource-tags/{ResourceId}");
  b.p("ResourceId", () => input.ResourceId, "{ResourceId}", false);
  const query = (0, import_smithy_client.map)({
    [_MR]: [() => input.MaxResults !== void 0, () => input[_MR].toString()],
    [_NT]: [, input[_NT]]
  });
  let body;
  b.m("GET").h(headers).q(query).b(body);
  return b.build();
}, "se_ListTagsForResourceCommand");
var se_ModifyMountTargetSecurityGroupsCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {
    "content-type": "application/json"
  };
  b.bp("/2015-02-01/mount-targets/{MountTargetId}/security-groups");
  b.p("MountTargetId", () => input.MountTargetId, "{MountTargetId}", false);
  let body;
  body = JSON.stringify(
    (0, import_smithy_client.take)(input, {
      SecurityGroups: /* @__PURE__ */ __name((_) => (0, import_smithy_client._json)(_), "SecurityGroups")
    })
  );
  b.m("PUT").h(headers).b(body);
  return b.build();
}, "se_ModifyMountTargetSecurityGroupsCommand");
var se_PutAccountPreferencesCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {
    "content-type": "application/json"
  };
  b.bp("/2015-02-01/account-preferences");
  let body;
  body = JSON.stringify(
    (0, import_smithy_client.take)(input, {
      ResourceIdType: []
    })
  );
  b.m("PUT").h(headers).b(body);
  return b.build();
}, "se_PutAccountPreferencesCommand");
var se_PutBackupPolicyCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {
    "content-type": "application/json"
  };
  b.bp("/2015-02-01/file-systems/{FileSystemId}/backup-policy");
  b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
  let body;
  body = JSON.stringify(
    (0, import_smithy_client.take)(input, {
      BackupPolicy: /* @__PURE__ */ __name((_) => (0, import_smithy_client._json)(_), "BackupPolicy")
    })
  );
  b.m("PUT").h(headers).b(body);
  return b.build();
}, "se_PutBackupPolicyCommand");
var se_PutFileSystemPolicyCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {
    "content-type": "application/json"
  };
  b.bp("/2015-02-01/file-systems/{FileSystemId}/policy");
  b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
  let body;
  body = JSON.stringify(
    (0, import_smithy_client.take)(input, {
      BypassPolicyLockoutSafetyCheck: [],
      Policy: []
    })
  );
  b.m("PUT").h(headers).b(body);
  return b.build();
}, "se_PutFileSystemPolicyCommand");
var se_PutLifecycleConfigurationCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {
    "content-type": "application/json"
  };
  b.bp("/2015-02-01/file-systems/{FileSystemId}/lifecycle-configuration");
  b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
  let body;
  body = JSON.stringify(
    (0, import_smithy_client.take)(input, {
      LifecyclePolicies: /* @__PURE__ */ __name((_) => (0, import_smithy_client._json)(_), "LifecyclePolicies")
    })
  );
  b.m("PUT").h(headers).b(body);
  return b.build();
}, "se_PutLifecycleConfigurationCommand");
var se_TagResourceCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {
    "content-type": "application/json"
  };
  b.bp("/2015-02-01/resource-tags/{ResourceId}");
  b.p("ResourceId", () => input.ResourceId, "{ResourceId}", false);
  let body;
  body = JSON.stringify(
    (0, import_smithy_client.take)(input, {
      Tags: /* @__PURE__ */ __name((_) => (0, import_smithy_client._json)(_), "Tags")
    })
  );
  b.m("POST").h(headers).b(body);
  return b.build();
}, "se_TagResourceCommand");
var se_UntagResourceCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {};
  b.bp("/2015-02-01/resource-tags/{ResourceId}");
  b.p("ResourceId", () => input.ResourceId, "{ResourceId}", false);
  const query = (0, import_smithy_client.map)({
    [_tK]: [(0, import_smithy_client.expectNonNull)(input.TagKeys, `TagKeys`) != null, () => input[_TK] || []]
  });
  let body;
  b.m("DELETE").h(headers).q(query).b(body);
  return b.build();
}, "se_UntagResourceCommand");
var se_UpdateFileSystemCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {
    "content-type": "application/json"
  };
  b.bp("/2015-02-01/file-systems/{FileSystemId}");
  b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
  let body;
  body = JSON.stringify(
    (0, import_smithy_client.take)(input, {
      ProvisionedThroughputInMibps: /* @__PURE__ */ __name((_) => (0, import_smithy_client.serializeFloat)(_), "ProvisionedThroughputInMibps"),
      ThroughputMode: []
    })
  );
  b.m("PUT").h(headers).b(body);
  return b.build();
}, "se_UpdateFileSystemCommand");
var se_UpdateFileSystemProtectionCommand = /* @__PURE__ */ __name(async (input, context) => {
  const b = (0, import_core.requestBuilder)(input, context);
  const headers = {
    "content-type": "application/json"
  };
  b.bp("/2015-02-01/file-systems/{FileSystemId}/protection");
  b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
  let body;
  body = JSON.stringify(
    (0, import_smithy_client.take)(input, {
      ReplicationOverwriteProtection: []
    })
  );
  b.m("PUT").h(headers).b(body);
  return b.build();
}, "se_UpdateFileSystemProtectionCommand");
var de_CreateAccessPointCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    AccessPointArn: import_smithy_client.expectString,
    AccessPointId: import_smithy_client.expectString,
    ClientToken: import_smithy_client.expectString,
    FileSystemId: import_smithy_client.expectString,
    LifeCycleState: import_smithy_client.expectString,
    Name: import_smithy_client.expectString,
    OwnerId: import_smithy_client.expectString,
    PosixUser: import_smithy_client._json,
    RootDirectory: import_smithy_client._json,
    Tags: import_smithy_client._json
  });
  Object.assign(contents, doc);
  return contents;
}, "de_CreateAccessPointCommand");
var de_CreateFileSystemCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 201 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    AvailabilityZoneId: import_smithy_client.expectString,
    AvailabilityZoneName: import_smithy_client.expectString,
    CreationTime: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "CreationTime"),
    CreationToken: import_smithy_client.expectString,
    Encrypted: import_smithy_client.expectBoolean,
    FileSystemArn: import_smithy_client.expectString,
    FileSystemId: import_smithy_client.expectString,
    FileSystemProtection: import_smithy_client._json,
    KmsKeyId: import_smithy_client.expectString,
    LifeCycleState: import_smithy_client.expectString,
    Name: import_smithy_client.expectString,
    NumberOfMountTargets: import_smithy_client.expectInt32,
    OwnerId: import_smithy_client.expectString,
    PerformanceMode: import_smithy_client.expectString,
    ProvisionedThroughputInMibps: import_smithy_client.limitedParseDouble,
    SizeInBytes: /* @__PURE__ */ __name((_) => de_FileSystemSize(_, context), "SizeInBytes"),
    Tags: import_smithy_client._json,
    ThroughputMode: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  return contents;
}, "de_CreateFileSystemCommand");
var de_CreateMountTargetCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    AvailabilityZoneId: import_smithy_client.expectString,
    AvailabilityZoneName: import_smithy_client.expectString,
    FileSystemId: import_smithy_client.expectString,
    IpAddress: import_smithy_client.expectString,
    Ipv6Address: import_smithy_client.expectString,
    LifeCycleState: import_smithy_client.expectString,
    MountTargetId: import_smithy_client.expectString,
    NetworkInterfaceId: import_smithy_client.expectString,
    OwnerId: import_smithy_client.expectString,
    SubnetId: import_smithy_client.expectString,
    VpcId: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  return contents;
}, "de_CreateMountTargetCommand");
var de_CreateReplicationConfigurationCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    CreationTime: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "CreationTime"),
    Destinations: /* @__PURE__ */ __name((_) => de_Destinations(_, context), "Destinations"),
    OriginalSourceFileSystemArn: import_smithy_client.expectString,
    SourceFileSystemArn: import_smithy_client.expectString,
    SourceFileSystemId: import_smithy_client.expectString,
    SourceFileSystemOwnerId: import_smithy_client.expectString,
    SourceFileSystemRegion: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  return contents;
}, "de_CreateReplicationConfigurationCommand");
var de_CreateTagsCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 204 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  await (0, import_smithy_client.collectBody)(output.body, context);
  return contents;
}, "de_CreateTagsCommand");
var de_DeleteAccessPointCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 204 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  await (0, import_smithy_client.collectBody)(output.body, context);
  return contents;
}, "de_DeleteAccessPointCommand");
var de_DeleteFileSystemCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 204 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  await (0, import_smithy_client.collectBody)(output.body, context);
  return contents;
}, "de_DeleteFileSystemCommand");
var de_DeleteFileSystemPolicyCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  await (0, import_smithy_client.collectBody)(output.body, context);
  return contents;
}, "de_DeleteFileSystemPolicyCommand");
var de_DeleteMountTargetCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 204 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  await (0, import_smithy_client.collectBody)(output.body, context);
  return contents;
}, "de_DeleteMountTargetCommand");
var de_DeleteReplicationConfigurationCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 204 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  await (0, import_smithy_client.collectBody)(output.body, context);
  return contents;
}, "de_DeleteReplicationConfigurationCommand");
var de_DeleteTagsCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 204 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  await (0, import_smithy_client.collectBody)(output.body, context);
  return contents;
}, "de_DeleteTagsCommand");
var de_DescribeAccessPointsCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    AccessPoints: import_smithy_client._json,
    NextToken: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  return contents;
}, "de_DescribeAccessPointsCommand");
var de_DescribeAccountPreferencesCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    NextToken: import_smithy_client.expectString,
    ResourceIdPreference: import_smithy_client._json
  });
  Object.assign(contents, doc);
  return contents;
}, "de_DescribeAccountPreferencesCommand");
var de_DescribeBackupPolicyCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    BackupPolicy: import_smithy_client._json
  });
  Object.assign(contents, doc);
  return contents;
}, "de_DescribeBackupPolicyCommand");
var de_DescribeFileSystemPolicyCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    FileSystemId: import_smithy_client.expectString,
    Policy: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  return contents;
}, "de_DescribeFileSystemPolicyCommand");
var de_DescribeFileSystemsCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    FileSystems: /* @__PURE__ */ __name((_) => de_FileSystemDescriptions(_, context), "FileSystems"),
    Marker: import_smithy_client.expectString,
    NextMarker: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  return contents;
}, "de_DescribeFileSystemsCommand");
var de_DescribeLifecycleConfigurationCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    LifecyclePolicies: import_smithy_client._json
  });
  Object.assign(contents, doc);
  return contents;
}, "de_DescribeLifecycleConfigurationCommand");
var de_DescribeMountTargetsCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    Marker: import_smithy_client.expectString,
    MountTargets: import_smithy_client._json,
    NextMarker: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  return contents;
}, "de_DescribeMountTargetsCommand");
var de_DescribeMountTargetSecurityGroupsCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    SecurityGroups: import_smithy_client._json
  });
  Object.assign(contents, doc);
  return contents;
}, "de_DescribeMountTargetSecurityGroupsCommand");
var de_DescribeReplicationConfigurationsCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    NextToken: import_smithy_client.expectString,
    Replications: /* @__PURE__ */ __name((_) => de_ReplicationConfigurationDescriptions(_, context), "Replications")
  });
  Object.assign(contents, doc);
  return contents;
}, "de_DescribeReplicationConfigurationsCommand");
var de_DescribeTagsCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    Marker: import_smithy_client.expectString,
    NextMarker: import_smithy_client.expectString,
    Tags: import_smithy_client._json
  });
  Object.assign(contents, doc);
  return contents;
}, "de_DescribeTagsCommand");
var de_ListTagsForResourceCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    NextToken: import_smithy_client.expectString,
    Tags: import_smithy_client._json
  });
  Object.assign(contents, doc);
  return contents;
}, "de_ListTagsForResourceCommand");
var de_ModifyMountTargetSecurityGroupsCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 204 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  await (0, import_smithy_client.collectBody)(output.body, context);
  return contents;
}, "de_ModifyMountTargetSecurityGroupsCommand");
var de_PutAccountPreferencesCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    ResourceIdPreference: import_smithy_client._json
  });
  Object.assign(contents, doc);
  return contents;
}, "de_PutAccountPreferencesCommand");
var de_PutBackupPolicyCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    BackupPolicy: import_smithy_client._json
  });
  Object.assign(contents, doc);
  return contents;
}, "de_PutBackupPolicyCommand");
var de_PutFileSystemPolicyCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    FileSystemId: import_smithy_client.expectString,
    Policy: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  return contents;
}, "de_PutFileSystemPolicyCommand");
var de_PutLifecycleConfigurationCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    LifecyclePolicies: import_smithy_client._json
  });
  Object.assign(contents, doc);
  return contents;
}, "de_PutLifecycleConfigurationCommand");
var de_TagResourceCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  await (0, import_smithy_client.collectBody)(output.body, context);
  return contents;
}, "de_TagResourceCommand");
var de_UntagResourceCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  await (0, import_smithy_client.collectBody)(output.body, context);
  return contents;
}, "de_UntagResourceCommand");
var de_UpdateFileSystemCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 202 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    AvailabilityZoneId: import_smithy_client.expectString,
    AvailabilityZoneName: import_smithy_client.expectString,
    CreationTime: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "CreationTime"),
    CreationToken: import_smithy_client.expectString,
    Encrypted: import_smithy_client.expectBoolean,
    FileSystemArn: import_smithy_client.expectString,
    FileSystemId: import_smithy_client.expectString,
    FileSystemProtection: import_smithy_client._json,
    KmsKeyId: import_smithy_client.expectString,
    LifeCycleState: import_smithy_client.expectString,
    Name: import_smithy_client.expectString,
    NumberOfMountTargets: import_smithy_client.expectInt32,
    OwnerId: import_smithy_client.expectString,
    PerformanceMode: import_smithy_client.expectString,
    ProvisionedThroughputInMibps: import_smithy_client.limitedParseDouble,
    SizeInBytes: /* @__PURE__ */ __name((_) => de_FileSystemSize(_, context), "SizeInBytes"),
    Tags: import_smithy_client._json,
    ThroughputMode: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  return contents;
}, "de_UpdateFileSystemCommand");
var de_UpdateFileSystemProtectionCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode !== 200 && output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = (0, import_smithy_client.map)({
    $metadata: deserializeMetadata(output)
  });
  const data = (0, import_smithy_client.expectNonNull)((0, import_smithy_client.expectObject)(await (0, import_core2.parseJsonBody)(output.body, context)), "body");
  const doc = (0, import_smithy_client.take)(data, {
    ReplicationOverwriteProtection: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  return contents;
}, "de_UpdateFileSystemProtectionCommand");
var de_CommandError = /* @__PURE__ */ __name(async (output, context) => {
  const parsedOutput = {
    ...output,
    body: await (0, import_core2.parseJsonErrorBody)(output.body, context)
  };
  const errorCode = (0, import_core2.loadRestJsonErrorCode)(output, parsedOutput.body);
  switch (errorCode) {
    case "AccessPointAlreadyExists":
    case "com.amazonaws.efs#AccessPointAlreadyExists":
      throw await de_AccessPointAlreadyExistsRes(parsedOutput, context);
    case "AccessPointLimitExceeded":
    case "com.amazonaws.efs#AccessPointLimitExceeded":
      throw await de_AccessPointLimitExceededRes(parsedOutput, context);
    case "BadRequest":
    case "com.amazonaws.efs#BadRequest":
      throw await de_BadRequestRes(parsedOutput, context);
    case "FileSystemNotFound":
    case "com.amazonaws.efs#FileSystemNotFound":
      throw await de_FileSystemNotFoundRes(parsedOutput, context);
    case "IncorrectFileSystemLifeCycleState":
    case "com.amazonaws.efs#IncorrectFileSystemLifeCycleState":
      throw await de_IncorrectFileSystemLifeCycleStateRes(parsedOutput, context);
    case "InternalServerError":
    case "com.amazonaws.efs#InternalServerError":
      throw await de_InternalServerErrorRes(parsedOutput, context);
    case "ThrottlingException":
    case "com.amazonaws.efs#ThrottlingException":
      throw await de_ThrottlingExceptionRes(parsedOutput, context);
    case "FileSystemAlreadyExists":
    case "com.amazonaws.efs#FileSystemAlreadyExists":
      throw await de_FileSystemAlreadyExistsRes(parsedOutput, context);
    case "FileSystemLimitExceeded":
    case "com.amazonaws.efs#FileSystemLimitExceeded":
      throw await de_FileSystemLimitExceededRes(parsedOutput, context);
    case "InsufficientThroughputCapacity":
    case "com.amazonaws.efs#InsufficientThroughputCapacity":
      throw await de_InsufficientThroughputCapacityRes(parsedOutput, context);
    case "ThroughputLimitExceeded":
    case "com.amazonaws.efs#ThroughputLimitExceeded":
      throw await de_ThroughputLimitExceededRes(parsedOutput, context);
    case "UnsupportedAvailabilityZone":
    case "com.amazonaws.efs#UnsupportedAvailabilityZone":
      throw await de_UnsupportedAvailabilityZoneRes(parsedOutput, context);
    case "AvailabilityZonesMismatch":
    case "com.amazonaws.efs#AvailabilityZonesMismatch":
      throw await de_AvailabilityZonesMismatchRes(parsedOutput, context);
    case "IpAddressInUse":
    case "com.amazonaws.efs#IpAddressInUse":
      throw await de_IpAddressInUseRes(parsedOutput, context);
    case "MountTargetConflict":
    case "com.amazonaws.efs#MountTargetConflict":
      throw await de_MountTargetConflictRes(parsedOutput, context);
    case "NetworkInterfaceLimitExceeded":
    case "com.amazonaws.efs#NetworkInterfaceLimitExceeded":
      throw await de_NetworkInterfaceLimitExceededRes(parsedOutput, context);
    case "NoFreeAddressesInSubnet":
    case "com.amazonaws.efs#NoFreeAddressesInSubnet":
      throw await de_NoFreeAddressesInSubnetRes(parsedOutput, context);
    case "SecurityGroupLimitExceeded":
    case "com.amazonaws.efs#SecurityGroupLimitExceeded":
      throw await de_SecurityGroupLimitExceededRes(parsedOutput, context);
    case "SecurityGroupNotFound":
    case "com.amazonaws.efs#SecurityGroupNotFound":
      throw await de_SecurityGroupNotFoundRes(parsedOutput, context);
    case "SubnetNotFound":
    case "com.amazonaws.efs#SubnetNotFound":
      throw await de_SubnetNotFoundRes(parsedOutput, context);
    case "ConflictException":
    case "com.amazonaws.efs#ConflictException":
      throw await de_ConflictExceptionRes(parsedOutput, context);
    case "ReplicationNotFound":
    case "com.amazonaws.efs#ReplicationNotFound":
      throw await de_ReplicationNotFoundRes(parsedOutput, context);
    case "ValidationException":
    case "com.amazonaws.efs#ValidationException":
      throw await de_ValidationExceptionRes(parsedOutput, context);
    case "AccessPointNotFound":
    case "com.amazonaws.efs#AccessPointNotFound":
      throw await de_AccessPointNotFoundRes(parsedOutput, context);
    case "FileSystemInUse":
    case "com.amazonaws.efs#FileSystemInUse":
      throw await de_FileSystemInUseRes(parsedOutput, context);
    case "DependencyTimeout":
    case "com.amazonaws.efs#DependencyTimeout":
      throw await de_DependencyTimeoutRes(parsedOutput, context);
    case "MountTargetNotFound":
    case "com.amazonaws.efs#MountTargetNotFound":
      throw await de_MountTargetNotFoundRes(parsedOutput, context);
    case "PolicyNotFound":
    case "com.amazonaws.efs#PolicyNotFound":
      throw await de_PolicyNotFoundRes(parsedOutput, context);
    case "IncorrectMountTargetState":
    case "com.amazonaws.efs#IncorrectMountTargetState":
      throw await de_IncorrectMountTargetStateRes(parsedOutput, context);
    case "InvalidPolicyException":
    case "com.amazonaws.efs#InvalidPolicyException":
      throw await de_InvalidPolicyExceptionRes(parsedOutput, context);
    case "TooManyRequests":
    case "com.amazonaws.efs#TooManyRequests":
      throw await de_TooManyRequestsRes(parsedOutput, context);
    case "ReplicationAlreadyExists":
    case "com.amazonaws.efs#ReplicationAlreadyExists":
      throw await de_ReplicationAlreadyExistsRes(parsedOutput, context);
    default:
      const parsedBody = parsedOutput.body;
      return throwDefaultError({
        output,
        parsedBody,
        errorCode
      });
  }
}, "de_CommandError");
var throwDefaultError = (0, import_smithy_client.withBaseException)(EFSServiceException);
var de_AccessPointAlreadyExistsRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    AccessPointId: import_smithy_client.expectString,
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new AccessPointAlreadyExists({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_AccessPointAlreadyExistsRes");
var de_AccessPointLimitExceededRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new AccessPointLimitExceeded({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_AccessPointLimitExceededRes");
var de_AccessPointNotFoundRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new AccessPointNotFound({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_AccessPointNotFoundRes");
var de_AvailabilityZonesMismatchRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new AvailabilityZonesMismatch({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_AvailabilityZonesMismatchRes");
var de_BadRequestRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new BadRequest({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_BadRequestRes");
var de_ConflictExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new ConflictException({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_ConflictExceptionRes");
var de_DependencyTimeoutRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new DependencyTimeout({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_DependencyTimeoutRes");
var de_FileSystemAlreadyExistsRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    FileSystemId: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new FileSystemAlreadyExists({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_FileSystemAlreadyExistsRes");
var de_FileSystemInUseRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new FileSystemInUse({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_FileSystemInUseRes");
var de_FileSystemLimitExceededRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new FileSystemLimitExceeded({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_FileSystemLimitExceededRes");
var de_FileSystemNotFoundRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new FileSystemNotFound({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_FileSystemNotFoundRes");
var de_IncorrectFileSystemLifeCycleStateRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new IncorrectFileSystemLifeCycleState({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_IncorrectFileSystemLifeCycleStateRes");
var de_IncorrectMountTargetStateRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new IncorrectMountTargetState({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_IncorrectMountTargetStateRes");
var de_InsufficientThroughputCapacityRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new InsufficientThroughputCapacity({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_InsufficientThroughputCapacityRes");
var de_InternalServerErrorRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new InternalServerError({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_InternalServerErrorRes");
var de_InvalidPolicyExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new InvalidPolicyException({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_InvalidPolicyExceptionRes");
var de_IpAddressInUseRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new IpAddressInUse({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_IpAddressInUseRes");
var de_MountTargetConflictRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new MountTargetConflict({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_MountTargetConflictRes");
var de_MountTargetNotFoundRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new MountTargetNotFound({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_MountTargetNotFoundRes");
var de_NetworkInterfaceLimitExceededRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new NetworkInterfaceLimitExceeded({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_NetworkInterfaceLimitExceededRes");
var de_NoFreeAddressesInSubnetRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new NoFreeAddressesInSubnet({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_NoFreeAddressesInSubnetRes");
var de_PolicyNotFoundRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new PolicyNotFound({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_PolicyNotFoundRes");
var de_ReplicationAlreadyExistsRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new ReplicationAlreadyExists({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_ReplicationAlreadyExistsRes");
var de_ReplicationNotFoundRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new ReplicationNotFound({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_ReplicationNotFoundRes");
var de_SecurityGroupLimitExceededRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new SecurityGroupLimitExceeded({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_SecurityGroupLimitExceededRes");
var de_SecurityGroupNotFoundRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new SecurityGroupNotFound({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_SecurityGroupNotFoundRes");
var de_SubnetNotFoundRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new SubnetNotFound({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_SubnetNotFoundRes");
var de_ThrottlingExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new ThrottlingException({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_ThrottlingExceptionRes");
var de_ThroughputLimitExceededRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new ThroughputLimitExceeded({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_ThroughputLimitExceededRes");
var de_TooManyRequestsRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new TooManyRequests({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_TooManyRequestsRes");
var de_UnsupportedAvailabilityZoneRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new UnsupportedAvailabilityZone({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_UnsupportedAvailabilityZoneRes");
var de_ValidationExceptionRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const contents = (0, import_smithy_client.map)({});
  const data = parsedOutput.body;
  const doc = (0, import_smithy_client.take)(data, {
    ErrorCode: import_smithy_client.expectString,
    Message: import_smithy_client.expectString
  });
  Object.assign(contents, doc);
  const exception = new ValidationException({
    $metadata: deserializeMetadata(parsedOutput),
    ...contents
  });
  return (0, import_smithy_client.decorateServiceException)(exception, parsedOutput.body);
}, "de_ValidationExceptionRes");
var de_Destination = /* @__PURE__ */ __name((output, context) => {
  return (0, import_smithy_client.take)(output, {
    FileSystemId: import_smithy_client.expectString,
    LastReplicatedTimestamp: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "LastReplicatedTimestamp"),
    OwnerId: import_smithy_client.expectString,
    Region: import_smithy_client.expectString,
    RoleArn: import_smithy_client.expectString,
    Status: import_smithy_client.expectString,
    StatusMessage: import_smithy_client.expectString
  });
}, "de_Destination");
var de_Destinations = /* @__PURE__ */ __name((output, context) => {
  const retVal = (output || []).filter((e) => e != null).map((entry) => {
    return de_Destination(entry, context);
  });
  return retVal;
}, "de_Destinations");
var de_FileSystemDescription = /* @__PURE__ */ __name((output, context) => {
  return (0, import_smithy_client.take)(output, {
    AvailabilityZoneId: import_smithy_client.expectString,
    AvailabilityZoneName: import_smithy_client.expectString,
    CreationTime: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "CreationTime"),
    CreationToken: import_smithy_client.expectString,
    Encrypted: import_smithy_client.expectBoolean,
    FileSystemArn: import_smithy_client.expectString,
    FileSystemId: import_smithy_client.expectString,
    FileSystemProtection: import_smithy_client._json,
    KmsKeyId: import_smithy_client.expectString,
    LifeCycleState: import_smithy_client.expectString,
    Name: import_smithy_client.expectString,
    NumberOfMountTargets: import_smithy_client.expectInt32,
    OwnerId: import_smithy_client.expectString,
    PerformanceMode: import_smithy_client.expectString,
    ProvisionedThroughputInMibps: import_smithy_client.limitedParseDouble,
    SizeInBytes: /* @__PURE__ */ __name((_) => de_FileSystemSize(_, context), "SizeInBytes"),
    Tags: import_smithy_client._json,
    ThroughputMode: import_smithy_client.expectString
  });
}, "de_FileSystemDescription");
var de_FileSystemDescriptions = /* @__PURE__ */ __name((output, context) => {
  const retVal = (output || []).filter((e) => e != null).map((entry) => {
    return de_FileSystemDescription(entry, context);
  });
  return retVal;
}, "de_FileSystemDescriptions");
var de_FileSystemSize = /* @__PURE__ */ __name((output, context) => {
  return (0, import_smithy_client.take)(output, {
    Timestamp: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "Timestamp"),
    Value: import_smithy_client.expectLong,
    ValueInArchive: import_smithy_client.expectLong,
    ValueInIA: import_smithy_client.expectLong,
    ValueInStandard: import_smithy_client.expectLong
  });
}, "de_FileSystemSize");
var de_ReplicationConfigurationDescription = /* @__PURE__ */ __name((output, context) => {
  return (0, import_smithy_client.take)(output, {
    CreationTime: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "CreationTime"),
    Destinations: /* @__PURE__ */ __name((_) => de_Destinations(_, context), "Destinations"),
    OriginalSourceFileSystemArn: import_smithy_client.expectString,
    SourceFileSystemArn: import_smithy_client.expectString,
    SourceFileSystemId: import_smithy_client.expectString,
    SourceFileSystemOwnerId: import_smithy_client.expectString,
    SourceFileSystemRegion: import_smithy_client.expectString
  });
}, "de_ReplicationConfigurationDescription");
var de_ReplicationConfigurationDescriptions = /* @__PURE__ */ __name((output, context) => {
  const retVal = (output || []).filter((e) => e != null).map((entry) => {
    return de_ReplicationConfigurationDescription(entry, context);
  });
  return retVal;
}, "de_ReplicationConfigurationDescriptions");
var deserializeMetadata = /* @__PURE__ */ __name((output) => ({
  httpStatusCode: output.statusCode,
  requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
  extendedRequestId: output.headers["x-amz-id-2"],
  cfId: output.headers["x-amz-cf-id"]
}), "deserializeMetadata");
var _API = "AccessPointId";
var _CT = "CreationToken";
var _DM = "DeletionMode";
var _FSI = "FileSystemId";
var _M = "Marker";
var _MI = "MaxItems";
var _MR = "MaxResults";
var _MTI = "MountTargetId";
var _NT = "NextToken";
var _TK = "TagKeys";
var _dM = "deletionMode";
var _tK = "tagKeys";

// src/commands/CreateAccessPointCommand.ts
var CreateAccessPointCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "CreateAccessPoint", {}).n("EFSClient", "CreateAccessPointCommand").f(void 0, void 0).ser(se_CreateAccessPointCommand).de(de_CreateAccessPointCommand).build() {
  static {
    __name(this, "CreateAccessPointCommand");
  }
};

// src/commands/CreateFileSystemCommand.ts



var CreateFileSystemCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "CreateFileSystem", {}).n("EFSClient", "CreateFileSystemCommand").f(void 0, void 0).ser(se_CreateFileSystemCommand).de(de_CreateFileSystemCommand).build() {
  static {
    __name(this, "CreateFileSystemCommand");
  }
};

// src/commands/CreateMountTargetCommand.ts



var CreateMountTargetCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "CreateMountTarget", {}).n("EFSClient", "CreateMountTargetCommand").f(void 0, void 0).ser(se_CreateMountTargetCommand).de(de_CreateMountTargetCommand).build() {
  static {
    __name(this, "CreateMountTargetCommand");
  }
};

// src/commands/CreateReplicationConfigurationCommand.ts



var CreateReplicationConfigurationCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "CreateReplicationConfiguration", {}).n("EFSClient", "CreateReplicationConfigurationCommand").f(void 0, void 0).ser(se_CreateReplicationConfigurationCommand).de(de_CreateReplicationConfigurationCommand).build() {
  static {
    __name(this, "CreateReplicationConfigurationCommand");
  }
};

// src/commands/CreateTagsCommand.ts



var CreateTagsCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "CreateTags", {}).n("EFSClient", "CreateTagsCommand").f(void 0, void 0).ser(se_CreateTagsCommand).de(de_CreateTagsCommand).build() {
  static {
    __name(this, "CreateTagsCommand");
  }
};

// src/commands/DeleteAccessPointCommand.ts



var DeleteAccessPointCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DeleteAccessPoint", {}).n("EFSClient", "DeleteAccessPointCommand").f(void 0, void 0).ser(se_DeleteAccessPointCommand).de(de_DeleteAccessPointCommand).build() {
  static {
    __name(this, "DeleteAccessPointCommand");
  }
};

// src/commands/DeleteFileSystemCommand.ts



var DeleteFileSystemCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DeleteFileSystem", {}).n("EFSClient", "DeleteFileSystemCommand").f(void 0, void 0).ser(se_DeleteFileSystemCommand).de(de_DeleteFileSystemCommand).build() {
  static {
    __name(this, "DeleteFileSystemCommand");
  }
};

// src/commands/DeleteFileSystemPolicyCommand.ts



var DeleteFileSystemPolicyCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DeleteFileSystemPolicy", {}).n("EFSClient", "DeleteFileSystemPolicyCommand").f(void 0, void 0).ser(se_DeleteFileSystemPolicyCommand).de(de_DeleteFileSystemPolicyCommand).build() {
  static {
    __name(this, "DeleteFileSystemPolicyCommand");
  }
};

// src/commands/DeleteMountTargetCommand.ts



var DeleteMountTargetCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DeleteMountTarget", {}).n("EFSClient", "DeleteMountTargetCommand").f(void 0, void 0).ser(se_DeleteMountTargetCommand).de(de_DeleteMountTargetCommand).build() {
  static {
    __name(this, "DeleteMountTargetCommand");
  }
};

// src/commands/DeleteReplicationConfigurationCommand.ts



var DeleteReplicationConfigurationCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DeleteReplicationConfiguration", {}).n("EFSClient", "DeleteReplicationConfigurationCommand").f(void 0, void 0).ser(se_DeleteReplicationConfigurationCommand).de(de_DeleteReplicationConfigurationCommand).build() {
  static {
    __name(this, "DeleteReplicationConfigurationCommand");
  }
};

// src/commands/DeleteTagsCommand.ts



var DeleteTagsCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DeleteTags", {}).n("EFSClient", "DeleteTagsCommand").f(void 0, void 0).ser(se_DeleteTagsCommand).de(de_DeleteTagsCommand).build() {
  static {
    __name(this, "DeleteTagsCommand");
  }
};

// src/commands/DescribeAccessPointsCommand.ts



var DescribeAccessPointsCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DescribeAccessPoints", {}).n("EFSClient", "DescribeAccessPointsCommand").f(void 0, void 0).ser(se_DescribeAccessPointsCommand).de(de_DescribeAccessPointsCommand).build() {
  static {
    __name(this, "DescribeAccessPointsCommand");
  }
};

// src/commands/DescribeAccountPreferencesCommand.ts



var DescribeAccountPreferencesCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DescribeAccountPreferences", {}).n("EFSClient", "DescribeAccountPreferencesCommand").f(void 0, void 0).ser(se_DescribeAccountPreferencesCommand).de(de_DescribeAccountPreferencesCommand).build() {
  static {
    __name(this, "DescribeAccountPreferencesCommand");
  }
};

// src/commands/DescribeBackupPolicyCommand.ts



var DescribeBackupPolicyCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DescribeBackupPolicy", {}).n("EFSClient", "DescribeBackupPolicyCommand").f(void 0, void 0).ser(se_DescribeBackupPolicyCommand).de(de_DescribeBackupPolicyCommand).build() {
  static {
    __name(this, "DescribeBackupPolicyCommand");
  }
};

// src/commands/DescribeFileSystemPolicyCommand.ts



var DescribeFileSystemPolicyCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DescribeFileSystemPolicy", {}).n("EFSClient", "DescribeFileSystemPolicyCommand").f(void 0, void 0).ser(se_DescribeFileSystemPolicyCommand).de(de_DescribeFileSystemPolicyCommand).build() {
  static {
    __name(this, "DescribeFileSystemPolicyCommand");
  }
};

// src/commands/DescribeFileSystemsCommand.ts



var DescribeFileSystemsCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DescribeFileSystems", {}).n("EFSClient", "DescribeFileSystemsCommand").f(void 0, void 0).ser(se_DescribeFileSystemsCommand).de(de_DescribeFileSystemsCommand).build() {
  static {
    __name(this, "DescribeFileSystemsCommand");
  }
};

// src/commands/DescribeLifecycleConfigurationCommand.ts



var DescribeLifecycleConfigurationCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DescribeLifecycleConfiguration", {}).n("EFSClient", "DescribeLifecycleConfigurationCommand").f(void 0, void 0).ser(se_DescribeLifecycleConfigurationCommand).de(de_DescribeLifecycleConfigurationCommand).build() {
  static {
    __name(this, "DescribeLifecycleConfigurationCommand");
  }
};

// src/commands/DescribeMountTargetsCommand.ts



var DescribeMountTargetsCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DescribeMountTargets", {}).n("EFSClient", "DescribeMountTargetsCommand").f(void 0, void 0).ser(se_DescribeMountTargetsCommand).de(de_DescribeMountTargetsCommand).build() {
  static {
    __name(this, "DescribeMountTargetsCommand");
  }
};

// src/commands/DescribeMountTargetSecurityGroupsCommand.ts



var DescribeMountTargetSecurityGroupsCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DescribeMountTargetSecurityGroups", {}).n("EFSClient", "DescribeMountTargetSecurityGroupsCommand").f(void 0, void 0).ser(se_DescribeMountTargetSecurityGroupsCommand).de(de_DescribeMountTargetSecurityGroupsCommand).build() {
  static {
    __name(this, "DescribeMountTargetSecurityGroupsCommand");
  }
};

// src/commands/DescribeReplicationConfigurationsCommand.ts



var DescribeReplicationConfigurationsCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DescribeReplicationConfigurations", {}).n("EFSClient", "DescribeReplicationConfigurationsCommand").f(void 0, void 0).ser(se_DescribeReplicationConfigurationsCommand).de(de_DescribeReplicationConfigurationsCommand).build() {
  static {
    __name(this, "DescribeReplicationConfigurationsCommand");
  }
};

// src/commands/DescribeTagsCommand.ts



var DescribeTagsCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "DescribeTags", {}).n("EFSClient", "DescribeTagsCommand").f(void 0, void 0).ser(se_DescribeTagsCommand).de(de_DescribeTagsCommand).build() {
  static {
    __name(this, "DescribeTagsCommand");
  }
};

// src/commands/ListTagsForResourceCommand.ts



var ListTagsForResourceCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "ListTagsForResource", {}).n("EFSClient", "ListTagsForResourceCommand").f(void 0, void 0).ser(se_ListTagsForResourceCommand).de(de_ListTagsForResourceCommand).build() {
  static {
    __name(this, "ListTagsForResourceCommand");
  }
};

// src/commands/ModifyMountTargetSecurityGroupsCommand.ts



var ModifyMountTargetSecurityGroupsCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "ModifyMountTargetSecurityGroups", {}).n("EFSClient", "ModifyMountTargetSecurityGroupsCommand").f(void 0, void 0).ser(se_ModifyMountTargetSecurityGroupsCommand).de(de_ModifyMountTargetSecurityGroupsCommand).build() {
  static {
    __name(this, "ModifyMountTargetSecurityGroupsCommand");
  }
};

// src/commands/PutAccountPreferencesCommand.ts



var PutAccountPreferencesCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "PutAccountPreferences", {}).n("EFSClient", "PutAccountPreferencesCommand").f(void 0, void 0).ser(se_PutAccountPreferencesCommand).de(de_PutAccountPreferencesCommand).build() {
  static {
    __name(this, "PutAccountPreferencesCommand");
  }
};

// src/commands/PutBackupPolicyCommand.ts



var PutBackupPolicyCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "PutBackupPolicy", {}).n("EFSClient", "PutBackupPolicyCommand").f(void 0, void 0).ser(se_PutBackupPolicyCommand).de(de_PutBackupPolicyCommand).build() {
  static {
    __name(this, "PutBackupPolicyCommand");
  }
};

// src/commands/PutFileSystemPolicyCommand.ts



var PutFileSystemPolicyCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "PutFileSystemPolicy", {}).n("EFSClient", "PutFileSystemPolicyCommand").f(void 0, void 0).ser(se_PutFileSystemPolicyCommand).de(de_PutFileSystemPolicyCommand).build() {
  static {
    __name(this, "PutFileSystemPolicyCommand");
  }
};

// src/commands/PutLifecycleConfigurationCommand.ts



var PutLifecycleConfigurationCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "PutLifecycleConfiguration", {}).n("EFSClient", "PutLifecycleConfigurationCommand").f(void 0, void 0).ser(se_PutLifecycleConfigurationCommand).de(de_PutLifecycleConfigurationCommand).build() {
  static {
    __name(this, "PutLifecycleConfigurationCommand");
  }
};

// src/commands/TagResourceCommand.ts



var TagResourceCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "TagResource", {}).n("EFSClient", "TagResourceCommand").f(void 0, void 0).ser(se_TagResourceCommand).de(de_TagResourceCommand).build() {
  static {
    __name(this, "TagResourceCommand");
  }
};

// src/commands/UntagResourceCommand.ts



var UntagResourceCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "UntagResource", {}).n("EFSClient", "UntagResourceCommand").f(void 0, void 0).ser(se_UntagResourceCommand).de(de_UntagResourceCommand).build() {
  static {
    __name(this, "UntagResourceCommand");
  }
};

// src/commands/UpdateFileSystemCommand.ts



var UpdateFileSystemCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "UpdateFileSystem", {}).n("EFSClient", "UpdateFileSystemCommand").f(void 0, void 0).ser(se_UpdateFileSystemCommand).de(de_UpdateFileSystemCommand).build() {
  static {
    __name(this, "UpdateFileSystemCommand");
  }
};

// src/commands/UpdateFileSystemProtectionCommand.ts



var UpdateFileSystemProtectionCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("MagnolioAPIService_v20150201", "UpdateFileSystemProtection", {}).n("EFSClient", "UpdateFileSystemProtectionCommand").f(void 0, void 0).ser(se_UpdateFileSystemProtectionCommand).de(de_UpdateFileSystemProtectionCommand).build() {
  static {
    __name(this, "UpdateFileSystemProtectionCommand");
  }
};

// src/EFS.ts
var commands = {
  CreateAccessPointCommand,
  CreateFileSystemCommand,
  CreateMountTargetCommand,
  CreateReplicationConfigurationCommand,
  CreateTagsCommand,
  DeleteAccessPointCommand,
  DeleteFileSystemCommand,
  DeleteFileSystemPolicyCommand,
  DeleteMountTargetCommand,
  DeleteReplicationConfigurationCommand,
  DeleteTagsCommand,
  DescribeAccessPointsCommand,
  DescribeAccountPreferencesCommand,
  DescribeBackupPolicyCommand,
  DescribeFileSystemPolicyCommand,
  DescribeFileSystemsCommand,
  DescribeLifecycleConfigurationCommand,
  DescribeMountTargetsCommand,
  DescribeMountTargetSecurityGroupsCommand,
  DescribeReplicationConfigurationsCommand,
  DescribeTagsCommand,
  ListTagsForResourceCommand,
  ModifyMountTargetSecurityGroupsCommand,
  PutAccountPreferencesCommand,
  PutBackupPolicyCommand,
  PutFileSystemPolicyCommand,
  PutLifecycleConfigurationCommand,
  TagResourceCommand,
  UntagResourceCommand,
  UpdateFileSystemCommand,
  UpdateFileSystemProtectionCommand
};
var EFS = class extends EFSClient {
  static {
    __name(this, "EFS");
  }
};
(0, import_smithy_client.createAggregatedClient)(commands, EFS);

// src/pagination/DescribeAccessPointsPaginator.ts

var paginateDescribeAccessPoints = (0, import_core.createPaginator)(EFSClient, DescribeAccessPointsCommand, "NextToken", "NextToken", "MaxResults");

// src/pagination/DescribeFileSystemsPaginator.ts

var paginateDescribeFileSystems = (0, import_core.createPaginator)(EFSClient, DescribeFileSystemsCommand, "Marker", "NextMarker", "MaxItems");

// src/pagination/DescribeMountTargetsPaginator.ts

var paginateDescribeMountTargets = (0, import_core.createPaginator)(EFSClient, DescribeMountTargetsCommand, "Marker", "NextMarker", "MaxItems");

// src/pagination/DescribeReplicationConfigurationsPaginator.ts

var paginateDescribeReplicationConfigurations = (0, import_core.createPaginator)(EFSClient, DescribeReplicationConfigurationsCommand, "NextToken", "NextToken", "MaxResults");

// src/pagination/DescribeTagsPaginator.ts

var paginateDescribeTags = (0, import_core.createPaginator)(EFSClient, DescribeTagsCommand, "Marker", "NextMarker", "MaxItems");

// src/pagination/ListTagsForResourcePaginator.ts

var paginateListTagsForResource = (0, import_core.createPaginator)(EFSClient, ListTagsForResourceCommand, "NextToken", "NextToken", "MaxResults");
// Annotate the CommonJS export names for ESM import in node:

0 && (module.exports = {
  EFSServiceException,
  __Client,
  EFSClient,
  EFS,
  $Command,
  CreateAccessPointCommand,
  CreateFileSystemCommand,
  CreateMountTargetCommand,
  CreateReplicationConfigurationCommand,
  CreateTagsCommand,
  DeleteAccessPointCommand,
  DeleteFileSystemCommand,
  DeleteFileSystemPolicyCommand,
  DeleteMountTargetCommand,
  DeleteReplicationConfigurationCommand,
  DeleteTagsCommand,
  DescribeAccessPointsCommand,
  DescribeAccountPreferencesCommand,
  DescribeBackupPolicyCommand,
  DescribeFileSystemPolicyCommand,
  DescribeFileSystemsCommand,
  DescribeLifecycleConfigurationCommand,
  DescribeMountTargetSecurityGroupsCommand,
  DescribeMountTargetsCommand,
  DescribeReplicationConfigurationsCommand,
  DescribeTagsCommand,
  ListTagsForResourceCommand,
  ModifyMountTargetSecurityGroupsCommand,
  PutAccountPreferencesCommand,
  PutBackupPolicyCommand,
  PutFileSystemPolicyCommand,
  PutLifecycleConfigurationCommand,
  TagResourceCommand,
  UntagResourceCommand,
  UpdateFileSystemCommand,
  UpdateFileSystemProtectionCommand,
  paginateDescribeAccessPoints,
  paginateDescribeFileSystems,
  paginateDescribeMountTargets,
  paginateDescribeReplicationConfigurations,
  paginateDescribeTags,
  paginateListTagsForResource,
  AccessPointAlreadyExists,
  LifeCycleState,
  AccessPointLimitExceeded,
  AccessPointNotFound,
  AvailabilityZonesMismatch,
  Status,
  BadRequest,
  ConflictException,
  FileSystemNotFound,
  IncorrectFileSystemLifeCycleState,
  InternalServerError,
  ThrottlingException,
  PerformanceMode,
  ThroughputMode,
  FileSystemAlreadyExists,
  ReplicationOverwriteProtection,
  FileSystemLimitExceeded,
  InsufficientThroughputCapacity,
  ThroughputLimitExceeded,
  UnsupportedAvailabilityZone,
  IpAddressType,
  IpAddressInUse,
  MountTargetConflict,
  NetworkInterfaceLimitExceeded,
  NoFreeAddressesInSubnet,
  SecurityGroupLimitExceeded,
  SecurityGroupNotFound,
  SubnetNotFound,
  ReplicationStatus,
  ReplicationNotFound,
  ValidationException,
  FileSystemInUse,
  DependencyTimeout,
  MountTargetNotFound,
  DeletionMode,
  ResourceIdType,
  Resource,
  PolicyNotFound,
  TransitionToArchiveRules,
  TransitionToIARules,
  TransitionToPrimaryStorageClassRules,
  IncorrectMountTargetState,
  InvalidPolicyException,
  TooManyRequests,
  ReplicationAlreadyExists
});

