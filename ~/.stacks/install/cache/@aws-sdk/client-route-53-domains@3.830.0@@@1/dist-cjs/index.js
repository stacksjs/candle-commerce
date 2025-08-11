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
  AcceptDomainTransferFromAnotherAwsAccountCommand: () => AcceptDomainTransferFromAnotherAwsAccountCommand,
  AcceptDomainTransferFromAnotherAwsAccountRequestFilterSensitiveLog: () => AcceptDomainTransferFromAnotherAwsAccountRequestFilterSensitiveLog,
  AssociateDelegationSignerToDomainCommand: () => AssociateDelegationSignerToDomainCommand,
  CancelDomainTransferToAnotherAwsAccountCommand: () => CancelDomainTransferToAnotherAwsAccountCommand,
  CheckDomainAvailabilityCommand: () => CheckDomainAvailabilityCommand,
  CheckDomainTransferabilityCommand: () => CheckDomainTransferabilityCommand,
  CheckDomainTransferabilityRequestFilterSensitiveLog: () => CheckDomainTransferabilityRequestFilterSensitiveLog,
  ContactDetailFilterSensitiveLog: () => ContactDetailFilterSensitiveLog,
  ContactType: () => ContactType,
  CountryCode: () => CountryCode,
  DeleteDomainCommand: () => DeleteDomainCommand,
  DeleteTagsForDomainCommand: () => DeleteTagsForDomainCommand,
  DisableDomainAutoRenewCommand: () => DisableDomainAutoRenewCommand,
  DisableDomainTransferLockCommand: () => DisableDomainTransferLockCommand,
  DisassociateDelegationSignerFromDomainCommand: () => DisassociateDelegationSignerFromDomainCommand,
  DnssecLimitExceeded: () => DnssecLimitExceeded,
  DomainAvailability: () => DomainAvailability,
  DomainLimitExceeded: () => DomainLimitExceeded,
  DuplicateRequest: () => DuplicateRequest,
  EnableDomainAutoRenewCommand: () => EnableDomainAutoRenewCommand,
  EnableDomainTransferLockCommand: () => EnableDomainTransferLockCommand,
  ExtraParamFilterSensitiveLog: () => ExtraParamFilterSensitiveLog,
  ExtraParamName: () => ExtraParamName,
  GetContactReachabilityStatusCommand: () => GetContactReachabilityStatusCommand,
  GetDomainDetailCommand: () => GetDomainDetailCommand,
  GetDomainDetailResponseFilterSensitiveLog: () => GetDomainDetailResponseFilterSensitiveLog,
  GetDomainSuggestionsCommand: () => GetDomainSuggestionsCommand,
  GetOperationDetailCommand: () => GetOperationDetailCommand,
  InvalidInput: () => InvalidInput,
  ListDomainsAttributeName: () => ListDomainsAttributeName,
  ListDomainsCommand: () => ListDomainsCommand,
  ListOperationsCommand: () => ListOperationsCommand,
  ListOperationsSortAttributeName: () => ListOperationsSortAttributeName,
  ListPricesCommand: () => ListPricesCommand,
  ListTagsForDomainCommand: () => ListTagsForDomainCommand,
  OperationLimitExceeded: () => OperationLimitExceeded,
  OperationStatus: () => OperationStatus,
  OperationType: () => OperationType,
  Operator: () => Operator,
  PushDomainCommand: () => PushDomainCommand,
  ReachabilityStatus: () => ReachabilityStatus,
  RegisterDomainCommand: () => RegisterDomainCommand,
  RegisterDomainRequestFilterSensitiveLog: () => RegisterDomainRequestFilterSensitiveLog,
  RejectDomainTransferFromAnotherAwsAccountCommand: () => RejectDomainTransferFromAnotherAwsAccountCommand,
  RenewDomainCommand: () => RenewDomainCommand,
  ResendContactReachabilityEmailCommand: () => ResendContactReachabilityEmailCommand,
  ResendContactReachabilityEmailResponseFilterSensitiveLog: () => ResendContactReachabilityEmailResponseFilterSensitiveLog,
  ResendOperationAuthorizationCommand: () => ResendOperationAuthorizationCommand,
  RetrieveDomainAuthCodeCommand: () => RetrieveDomainAuthCodeCommand,
  RetrieveDomainAuthCodeResponseFilterSensitiveLog: () => RetrieveDomainAuthCodeResponseFilterSensitiveLog,
  Route53Domains: () => Route53Domains,
  Route53DomainsClient: () => Route53DomainsClient,
  Route53DomainsServiceException: () => Route53DomainsServiceException,
  SortOrder: () => SortOrder,
  StatusFlag: () => StatusFlag,
  TLDRulesViolation: () => TLDRulesViolation,
  TransferDomainCommand: () => TransferDomainCommand,
  TransferDomainRequestFilterSensitiveLog: () => TransferDomainRequestFilterSensitiveLog,
  TransferDomainToAnotherAwsAccountCommand: () => TransferDomainToAnotherAwsAccountCommand,
  TransferDomainToAnotherAwsAccountResponseFilterSensitiveLog: () => TransferDomainToAnotherAwsAccountResponseFilterSensitiveLog,
  Transferable: () => Transferable,
  UnsupportedTLD: () => UnsupportedTLD,
  UpdateDomainContactCommand: () => UpdateDomainContactCommand,
  UpdateDomainContactPrivacyCommand: () => UpdateDomainContactPrivacyCommand,
  UpdateDomainContactRequestFilterSensitiveLog: () => UpdateDomainContactRequestFilterSensitiveLog,
  UpdateDomainNameserversCommand: () => UpdateDomainNameserversCommand,
  UpdateDomainNameserversRequestFilterSensitiveLog: () => UpdateDomainNameserversRequestFilterSensitiveLog,
  UpdateTagsForDomainCommand: () => UpdateTagsForDomainCommand,
  ViewBillingCommand: () => ViewBillingCommand,
  __Client: () => import_smithy_client.Client,
  paginateListDomains: () => paginateListDomains,
  paginateListOperations: () => paginateListOperations,
  paginateListPrices: () => paginateListPrices,
  paginateViewBilling: () => paginateViewBilling
});
module.exports = __toCommonJS(index_exports);

// src/Route53DomainsClient.ts
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
    defaultSigningName: "route53domains"
  });
}, "resolveClientEndpointParameters");
var commonParams = {
  UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
  Endpoint: { type: "builtInParams", name: "endpoint" },
  Region: { type: "builtInParams", name: "region" },
  UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
};

// src/Route53DomainsClient.ts
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

// src/Route53DomainsClient.ts
var Route53DomainsClient = class extends import_smithy_client.Client {
  static {
    __name(this, "Route53DomainsClient");
  }
  /**
   * The resolved configuration of Route53DomainsClient class. This is resolved and normalized from the {@link Route53DomainsClientConfig | constructor configuration interface}.
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
        httpAuthSchemeParametersProvider: import_httpAuthSchemeProvider.defaultRoute53DomainsHttpAuthSchemeParametersProvider,
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

// src/Route53Domains.ts


// src/commands/AcceptDomainTransferFromAnotherAwsAccountCommand.ts

var import_middleware_serde = require("@smithy/middleware-serde");


// src/models/models_0.ts


// src/models/Route53DomainsServiceException.ts

var Route53DomainsServiceException = class _Route53DomainsServiceException extends import_smithy_client.ServiceException {
  static {
    __name(this, "Route53DomainsServiceException");
  }
  /**
   * @internal
   */
  constructor(options) {
    super(options);
    Object.setPrototypeOf(this, _Route53DomainsServiceException.prototype);
  }
};

// src/models/models_0.ts
var DomainLimitExceeded = class _DomainLimitExceeded extends Route53DomainsServiceException {
  static {
    __name(this, "DomainLimitExceeded");
  }
  name = "DomainLimitExceeded";
  $fault = "client";
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "DomainLimitExceeded",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _DomainLimitExceeded.prototype);
  }
};
var InvalidInput = class _InvalidInput extends Route53DomainsServiceException {
  static {
    __name(this, "InvalidInput");
  }
  name = "InvalidInput";
  $fault = "client";
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "InvalidInput",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _InvalidInput.prototype);
  }
};
var OperationLimitExceeded = class _OperationLimitExceeded extends Route53DomainsServiceException {
  static {
    __name(this, "OperationLimitExceeded");
  }
  name = "OperationLimitExceeded";
  $fault = "client";
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "OperationLimitExceeded",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _OperationLimitExceeded.prototype);
  }
};
var UnsupportedTLD = class _UnsupportedTLD extends Route53DomainsServiceException {
  static {
    __name(this, "UnsupportedTLD");
  }
  name = "UnsupportedTLD";
  $fault = "client";
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "UnsupportedTLD",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _UnsupportedTLD.prototype);
  }
};
var DnssecLimitExceeded = class _DnssecLimitExceeded extends Route53DomainsServiceException {
  static {
    __name(this, "DnssecLimitExceeded");
  }
  name = "DnssecLimitExceeded";
  $fault = "client";
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "DnssecLimitExceeded",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _DnssecLimitExceeded.prototype);
  }
};
var DuplicateRequest = class _DuplicateRequest extends Route53DomainsServiceException {
  static {
    __name(this, "DuplicateRequest");
  }
  name = "DuplicateRequest";
  $fault = "client";
  /**
   * <p>ID of the request operation.</p>
   * @public
   */
  requestId;
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "DuplicateRequest",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _DuplicateRequest.prototype);
    this.requestId = opts.requestId;
  }
};
var TLDRulesViolation = class _TLDRulesViolation extends Route53DomainsServiceException {
  static {
    __name(this, "TLDRulesViolation");
  }
  name = "TLDRulesViolation";
  $fault = "client";
  /**
   * @internal
   */
  constructor(opts) {
    super({
      name: "TLDRulesViolation",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _TLDRulesViolation.prototype);
  }
};
var OperationType = {
  ADD_DNSSEC: "ADD_DNSSEC",
  CHANGE_DOMAIN_OWNER: "CHANGE_DOMAIN_OWNER",
  CHANGE_PRIVACY_PROTECTION: "CHANGE_PRIVACY_PROTECTION",
  DELETE_DOMAIN: "DELETE_DOMAIN",
  DISABLE_AUTORENEW: "DISABLE_AUTORENEW",
  DOMAIN_LOCK: "DOMAIN_LOCK",
  ENABLE_AUTORENEW: "ENABLE_AUTORENEW",
  EXPIRE_DOMAIN: "EXPIRE_DOMAIN",
  INTERNAL_TRANSFER_IN_DOMAIN: "INTERNAL_TRANSFER_IN_DOMAIN",
  INTERNAL_TRANSFER_OUT_DOMAIN: "INTERNAL_TRANSFER_OUT_DOMAIN",
  PUSH_DOMAIN: "PUSH_DOMAIN",
  REGISTER_DOMAIN: "REGISTER_DOMAIN",
  RELEASE_TO_GANDI: "RELEASE_TO_GANDI",
  REMOVE_DNSSEC: "REMOVE_DNSSEC",
  RENEW_DOMAIN: "RENEW_DOMAIN",
  RESTORE_DOMAIN: "RESTORE_DOMAIN",
  TRANSFER_IN_DOMAIN: "TRANSFER_IN_DOMAIN",
  TRANSFER_ON_RENEW: "TRANSFER_ON_RENEW",
  TRANSFER_OUT_DOMAIN: "TRANSFER_OUT_DOMAIN",
  UPDATE_DOMAIN_CONTACT: "UPDATE_DOMAIN_CONTACT",
  UPDATE_NAMESERVER: "UPDATE_NAMESERVER"
};
var DomainAvailability = {
  AVAILABLE: "AVAILABLE",
  AVAILABLE_PREORDER: "AVAILABLE_PREORDER",
  AVAILABLE_RESERVED: "AVAILABLE_RESERVED",
  DONT_KNOW: "DONT_KNOW",
  INVALID_NAME_FOR_TLD: "INVALID_NAME_FOR_TLD",
  PENDING: "PENDING",
  RESERVED: "RESERVED",
  UNAVAILABLE: "UNAVAILABLE",
  UNAVAILABLE_PREMIUM: "UNAVAILABLE_PREMIUM",
  UNAVAILABLE_RESTRICTED: "UNAVAILABLE_RESTRICTED"
};
var Transferable = {
  DOMAIN_IN_ANOTHER_ACCOUNT: "DOMAIN_IN_ANOTHER_ACCOUNT",
  DOMAIN_IN_OWN_ACCOUNT: "DOMAIN_IN_OWN_ACCOUNT",
  DONT_KNOW: "DONT_KNOW",
  PREMIUM_DOMAIN: "PREMIUM_DOMAIN",
  TRANSFERABLE: "TRANSFERABLE",
  UNTRANSFERABLE: "UNTRANSFERABLE"
};
var ContactType = {
  ASSOCIATION: "ASSOCIATION",
  COMPANY: "COMPANY",
  PERSON: "PERSON",
  PUBLIC_BODY: "PUBLIC_BODY",
  RESELLER: "RESELLER"
};
var CountryCode = {
  AC: "AC",
  AD: "AD",
  AE: "AE",
  AF: "AF",
  AG: "AG",
  AI: "AI",
  AL: "AL",
  AM: "AM",
  AN: "AN",
  AO: "AO",
  AQ: "AQ",
  AR: "AR",
  AS: "AS",
  AT: "AT",
  AU: "AU",
  AW: "AW",
  AX: "AX",
  AZ: "AZ",
  BA: "BA",
  BB: "BB",
  BD: "BD",
  BE: "BE",
  BF: "BF",
  BG: "BG",
  BH: "BH",
  BI: "BI",
  BJ: "BJ",
  BL: "BL",
  BM: "BM",
  BN: "BN",
  BO: "BO",
  BQ: "BQ",
  BR: "BR",
  BS: "BS",
  BT: "BT",
  BV: "BV",
  BW: "BW",
  BY: "BY",
  BZ: "BZ",
  CA: "CA",
  CC: "CC",
  CD: "CD",
  CF: "CF",
  CG: "CG",
  CH: "CH",
  CI: "CI",
  CK: "CK",
  CL: "CL",
  CM: "CM",
  CN: "CN",
  CO: "CO",
  CR: "CR",
  CU: "CU",
  CV: "CV",
  CW: "CW",
  CX: "CX",
  CY: "CY",
  CZ: "CZ",
  DE: "DE",
  DJ: "DJ",
  DK: "DK",
  DM: "DM",
  DO: "DO",
  DZ: "DZ",
  EC: "EC",
  EE: "EE",
  EG: "EG",
  EH: "EH",
  ER: "ER",
  ES: "ES",
  ET: "ET",
  FI: "FI",
  FJ: "FJ",
  FK: "FK",
  FM: "FM",
  FO: "FO",
  FR: "FR",
  GA: "GA",
  GB: "GB",
  GD: "GD",
  GE: "GE",
  GF: "GF",
  GG: "GG",
  GH: "GH",
  GI: "GI",
  GL: "GL",
  GM: "GM",
  GN: "GN",
  GP: "GP",
  GQ: "GQ",
  GR: "GR",
  GS: "GS",
  GT: "GT",
  GU: "GU",
  GW: "GW",
  GY: "GY",
  HK: "HK",
  HM: "HM",
  HN: "HN",
  HR: "HR",
  HT: "HT",
  HU: "HU",
  ID: "ID",
  IE: "IE",
  IL: "IL",
  IM: "IM",
  IN: "IN",
  IO: "IO",
  IQ: "IQ",
  IR: "IR",
  IS: "IS",
  IT: "IT",
  JE: "JE",
  JM: "JM",
  JO: "JO",
  JP: "JP",
  KE: "KE",
  KG: "KG",
  KH: "KH",
  KI: "KI",
  KM: "KM",
  KN: "KN",
  KP: "KP",
  KR: "KR",
  KW: "KW",
  KY: "KY",
  KZ: "KZ",
  LA: "LA",
  LB: "LB",
  LC: "LC",
  LI: "LI",
  LK: "LK",
  LR: "LR",
  LS: "LS",
  LT: "LT",
  LU: "LU",
  LV: "LV",
  LY: "LY",
  MA: "MA",
  MC: "MC",
  MD: "MD",
  ME: "ME",
  MF: "MF",
  MG: "MG",
  MH: "MH",
  MK: "MK",
  ML: "ML",
  MM: "MM",
  MN: "MN",
  MO: "MO",
  MP: "MP",
  MQ: "MQ",
  MR: "MR",
  MS: "MS",
  MT: "MT",
  MU: "MU",
  MV: "MV",
  MW: "MW",
  MX: "MX",
  MY: "MY",
  MZ: "MZ",
  NA: "NA",
  NC: "NC",
  NE: "NE",
  NF: "NF",
  NG: "NG",
  NI: "NI",
  NL: "NL",
  NO: "NO",
  NP: "NP",
  NR: "NR",
  NU: "NU",
  NZ: "NZ",
  OM: "OM",
  PA: "PA",
  PE: "PE",
  PF: "PF",
  PG: "PG",
  PH: "PH",
  PK: "PK",
  PL: "PL",
  PM: "PM",
  PN: "PN",
  PR: "PR",
  PS: "PS",
  PT: "PT",
  PW: "PW",
  PY: "PY",
  QA: "QA",
  RE: "RE",
  RO: "RO",
  RS: "RS",
  RU: "RU",
  RW: "RW",
  SA: "SA",
  SB: "SB",
  SC: "SC",
  SD: "SD",
  SE: "SE",
  SG: "SG",
  SH: "SH",
  SI: "SI",
  SJ: "SJ",
  SK: "SK",
  SL: "SL",
  SM: "SM",
  SN: "SN",
  SO: "SO",
  SR: "SR",
  SS: "SS",
  ST: "ST",
  SV: "SV",
  SX: "SX",
  SY: "SY",
  SZ: "SZ",
  TC: "TC",
  TD: "TD",
  TF: "TF",
  TG: "TG",
  TH: "TH",
  TJ: "TJ",
  TK: "TK",
  TL: "TL",
  TM: "TM",
  TN: "TN",
  TO: "TO",
  TP: "TP",
  TR: "TR",
  TT: "TT",
  TV: "TV",
  TW: "TW",
  TZ: "TZ",
  UA: "UA",
  UG: "UG",
  US: "US",
  UY: "UY",
  UZ: "UZ",
  VA: "VA",
  VC: "VC",
  VE: "VE",
  VG: "VG",
  VI: "VI",
  VN: "VN",
  VU: "VU",
  WF: "WF",
  WS: "WS",
  YE: "YE",
  YT: "YT",
  ZA: "ZA",
  ZM: "ZM",
  ZW: "ZW"
};
var ExtraParamName = {
  AU_ID_NUMBER: "AU_ID_NUMBER",
  AU_ID_TYPE: "AU_ID_TYPE",
  AU_PRIORITY_TOKEN: "AU_PRIORITY_TOKEN",
  BIRTH_CITY: "BIRTH_CITY",
  BIRTH_COUNTRY: "BIRTH_COUNTRY",
  BIRTH_DATE_IN_YYYY_MM_DD: "BIRTH_DATE_IN_YYYY_MM_DD",
  BIRTH_DEPARTMENT: "BIRTH_DEPARTMENT",
  BRAND_NUMBER: "BRAND_NUMBER",
  CA_BUSINESS_ENTITY_TYPE: "CA_BUSINESS_ENTITY_TYPE",
  CA_LEGAL_REPRESENTATIVE: "CA_LEGAL_REPRESENTATIVE",
  CA_LEGAL_REPRESENTATIVE_CAPACITY: "CA_LEGAL_REPRESENTATIVE_CAPACITY",
  CA_LEGAL_TYPE: "CA_LEGAL_TYPE",
  DOCUMENT_NUMBER: "DOCUMENT_NUMBER",
  DUNS_NUMBER: "DUNS_NUMBER",
  ES_IDENTIFICATION: "ES_IDENTIFICATION",
  ES_IDENTIFICATION_TYPE: "ES_IDENTIFICATION_TYPE",
  ES_LEGAL_FORM: "ES_LEGAL_FORM",
  EU_COUNTRY_OF_CITIZENSHIP: "EU_COUNTRY_OF_CITIZENSHIP",
  FI_BUSINESS_NUMBER: "FI_BUSINESS_NUMBER",
  FI_NATIONALITY: "FI_NATIONALITY",
  FI_ORGANIZATION_TYPE: "FI_ORGANIZATION_TYPE",
  IT_NATIONALITY: "IT_NATIONALITY",
  IT_PIN: "IT_PIN",
  IT_REGISTRANT_ENTITY_TYPE: "IT_REGISTRANT_ENTITY_TYPE",
  ONWER_FI_ID_NUMBER: "FI_ID_NUMBER",
  RU_PASSPORT_DATA: "RU_PASSPORT_DATA",
  SE_ID_NUMBER: "SE_ID_NUMBER",
  SG_ID_NUMBER: "SG_ID_NUMBER",
  UK_COMPANY_NUMBER: "UK_COMPANY_NUMBER",
  UK_CONTACT_TYPE: "UK_CONTACT_TYPE",
  VAT_NUMBER: "VAT_NUMBER"
};
var ListDomainsAttributeName = {
  DomainName: "DomainName",
  Expiry: "Expiry"
};
var Operator = {
  BEGINS_WITH: "BEGINS_WITH",
  GE: "GE",
  LE: "LE"
};
var ReachabilityStatus = {
  DONE: "DONE",
  EXPIRED: "EXPIRED",
  PENDING: "PENDING"
};
var OperationStatus = {
  ERROR: "ERROR",
  FAILED: "FAILED",
  IN_PROGRESS: "IN_PROGRESS",
  SUBMITTED: "SUBMITTED",
  SUCCESSFUL: "SUCCESSFUL"
};
var StatusFlag = {
  PENDING_ACCEPTANCE: "PENDING_ACCEPTANCE",
  PENDING_AUTHORIZATION: "PENDING_AUTHORIZATION",
  PENDING_CUSTOMER_ACTION: "PENDING_CUSTOMER_ACTION",
  PENDING_PAYMENT_VERIFICATION: "PENDING_PAYMENT_VERIFICATION",
  PENDING_SUPPORT_CASE: "PENDING_SUPPORT_CASE"
};
var SortOrder = {
  ASC: "ASC",
  DESC: "DESC"
};
var ListOperationsSortAttributeName = {
  SubmittedDate: "SubmittedDate"
};
var AcceptDomainTransferFromAnotherAwsAccountRequestFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
  ...obj,
  ...obj.Password && { Password: import_smithy_client.SENSITIVE_STRING }
}), "AcceptDomainTransferFromAnotherAwsAccountRequestFilterSensitiveLog");
var CheckDomainTransferabilityRequestFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
  ...obj,
  ...obj.AuthCode && { AuthCode: import_smithy_client.SENSITIVE_STRING }
}), "CheckDomainTransferabilityRequestFilterSensitiveLog");
var ExtraParamFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
  ...obj,
  ...obj.Value && { Value: import_smithy_client.SENSITIVE_STRING }
}), "ExtraParamFilterSensitiveLog");
var ContactDetailFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
  ...obj,
  ...obj.FirstName && { FirstName: import_smithy_client.SENSITIVE_STRING },
  ...obj.LastName && { LastName: import_smithy_client.SENSITIVE_STRING },
  ...obj.OrganizationName && { OrganizationName: import_smithy_client.SENSITIVE_STRING },
  ...obj.AddressLine1 && { AddressLine1: import_smithy_client.SENSITIVE_STRING },
  ...obj.AddressLine2 && { AddressLine2: import_smithy_client.SENSITIVE_STRING },
  ...obj.City && { City: import_smithy_client.SENSITIVE_STRING },
  ...obj.State && { State: import_smithy_client.SENSITIVE_STRING },
  ...obj.CountryCode && { CountryCode: import_smithy_client.SENSITIVE_STRING },
  ...obj.ZipCode && { ZipCode: import_smithy_client.SENSITIVE_STRING },
  ...obj.PhoneNumber && { PhoneNumber: import_smithy_client.SENSITIVE_STRING },
  ...obj.Email && { Email: import_smithy_client.SENSITIVE_STRING },
  ...obj.Fax && { Fax: import_smithy_client.SENSITIVE_STRING },
  ...obj.ExtraParams && { ExtraParams: obj.ExtraParams.map((item) => ExtraParamFilterSensitiveLog(item)) }
}), "ContactDetailFilterSensitiveLog");
var GetDomainDetailResponseFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
  ...obj,
  ...obj.AdminContact && { AdminContact: import_smithy_client.SENSITIVE_STRING },
  ...obj.RegistrantContact && { RegistrantContact: import_smithy_client.SENSITIVE_STRING },
  ...obj.TechContact && { TechContact: import_smithy_client.SENSITIVE_STRING },
  ...obj.AbuseContactEmail && { AbuseContactEmail: import_smithy_client.SENSITIVE_STRING },
  ...obj.AbuseContactPhone && { AbuseContactPhone: import_smithy_client.SENSITIVE_STRING },
  ...obj.BillingContact && { BillingContact: import_smithy_client.SENSITIVE_STRING }
}), "GetDomainDetailResponseFilterSensitiveLog");
var RegisterDomainRequestFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
  ...obj,
  ...obj.AdminContact && { AdminContact: import_smithy_client.SENSITIVE_STRING },
  ...obj.RegistrantContact && { RegistrantContact: import_smithy_client.SENSITIVE_STRING },
  ...obj.TechContact && { TechContact: import_smithy_client.SENSITIVE_STRING },
  ...obj.BillingContact && { BillingContact: import_smithy_client.SENSITIVE_STRING }
}), "RegisterDomainRequestFilterSensitiveLog");
var ResendContactReachabilityEmailResponseFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
  ...obj,
  ...obj.emailAddress && { emailAddress: import_smithy_client.SENSITIVE_STRING }
}), "ResendContactReachabilityEmailResponseFilterSensitiveLog");
var RetrieveDomainAuthCodeResponseFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
  ...obj,
  ...obj.AuthCode && { AuthCode: import_smithy_client.SENSITIVE_STRING }
}), "RetrieveDomainAuthCodeResponseFilterSensitiveLog");
var TransferDomainRequestFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
  ...obj,
  ...obj.AuthCode && { AuthCode: import_smithy_client.SENSITIVE_STRING },
  ...obj.AdminContact && { AdminContact: import_smithy_client.SENSITIVE_STRING },
  ...obj.RegistrantContact && { RegistrantContact: import_smithy_client.SENSITIVE_STRING },
  ...obj.TechContact && { TechContact: import_smithy_client.SENSITIVE_STRING },
  ...obj.BillingContact && { BillingContact: import_smithy_client.SENSITIVE_STRING }
}), "TransferDomainRequestFilterSensitiveLog");
var TransferDomainToAnotherAwsAccountResponseFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
  ...obj,
  ...obj.Password && { Password: import_smithy_client.SENSITIVE_STRING }
}), "TransferDomainToAnotherAwsAccountResponseFilterSensitiveLog");
var UpdateDomainContactRequestFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
  ...obj,
  ...obj.AdminContact && { AdminContact: import_smithy_client.SENSITIVE_STRING },
  ...obj.RegistrantContact && { RegistrantContact: import_smithy_client.SENSITIVE_STRING },
  ...obj.TechContact && { TechContact: import_smithy_client.SENSITIVE_STRING },
  ...obj.BillingContact && { BillingContact: import_smithy_client.SENSITIVE_STRING }
}), "UpdateDomainContactRequestFilterSensitiveLog");
var UpdateDomainNameserversRequestFilterSensitiveLog = /* @__PURE__ */ __name((obj) => ({
  ...obj,
  ...obj.FIAuthKey && { FIAuthKey: import_smithy_client.SENSITIVE_STRING }
}), "UpdateDomainNameserversRequestFilterSensitiveLog");

// src/protocols/Aws_json1_1.ts
var import_core2 = require("@aws-sdk/core");


var se_AcceptDomainTransferFromAnotherAwsAccountCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("AcceptDomainTransferFromAnotherAwsAccount");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_AcceptDomainTransferFromAnotherAwsAccountCommand");
var se_AssociateDelegationSignerToDomainCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("AssociateDelegationSignerToDomain");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_AssociateDelegationSignerToDomainCommand");
var se_CancelDomainTransferToAnotherAwsAccountCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("CancelDomainTransferToAnotherAwsAccount");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_CancelDomainTransferToAnotherAwsAccountCommand");
var se_CheckDomainAvailabilityCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("CheckDomainAvailability");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_CheckDomainAvailabilityCommand");
var se_CheckDomainTransferabilityCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("CheckDomainTransferability");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_CheckDomainTransferabilityCommand");
var se_DeleteDomainCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("DeleteDomain");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_DeleteDomainCommand");
var se_DeleteTagsForDomainCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("DeleteTagsForDomain");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_DeleteTagsForDomainCommand");
var se_DisableDomainAutoRenewCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("DisableDomainAutoRenew");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_DisableDomainAutoRenewCommand");
var se_DisableDomainTransferLockCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("DisableDomainTransferLock");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_DisableDomainTransferLockCommand");
var se_DisassociateDelegationSignerFromDomainCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("DisassociateDelegationSignerFromDomain");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_DisassociateDelegationSignerFromDomainCommand");
var se_EnableDomainAutoRenewCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("EnableDomainAutoRenew");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_EnableDomainAutoRenewCommand");
var se_EnableDomainTransferLockCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("EnableDomainTransferLock");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_EnableDomainTransferLockCommand");
var se_GetContactReachabilityStatusCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("GetContactReachabilityStatus");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_GetContactReachabilityStatusCommand");
var se_GetDomainDetailCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("GetDomainDetail");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_GetDomainDetailCommand");
var se_GetDomainSuggestionsCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("GetDomainSuggestions");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_GetDomainSuggestionsCommand");
var se_GetOperationDetailCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("GetOperationDetail");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_GetOperationDetailCommand");
var se_ListDomainsCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("ListDomains");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_ListDomainsCommand");
var se_ListOperationsCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("ListOperations");
  let body;
  body = JSON.stringify(se_ListOperationsRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_ListOperationsCommand");
var se_ListPricesCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("ListPrices");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_ListPricesCommand");
var se_ListTagsForDomainCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("ListTagsForDomain");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_ListTagsForDomainCommand");
var se_PushDomainCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("PushDomain");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_PushDomainCommand");
var se_RegisterDomainCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("RegisterDomain");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_RegisterDomainCommand");
var se_RejectDomainTransferFromAnotherAwsAccountCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("RejectDomainTransferFromAnotherAwsAccount");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_RejectDomainTransferFromAnotherAwsAccountCommand");
var se_RenewDomainCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("RenewDomain");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_RenewDomainCommand");
var se_ResendContactReachabilityEmailCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("ResendContactReachabilityEmail");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_ResendContactReachabilityEmailCommand");
var se_ResendOperationAuthorizationCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("ResendOperationAuthorization");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_ResendOperationAuthorizationCommand");
var se_RetrieveDomainAuthCodeCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("RetrieveDomainAuthCode");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_RetrieveDomainAuthCodeCommand");
var se_TransferDomainCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("TransferDomain");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_TransferDomainCommand");
var se_TransferDomainToAnotherAwsAccountCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("TransferDomainToAnotherAwsAccount");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_TransferDomainToAnotherAwsAccountCommand");
var se_UpdateDomainContactCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("UpdateDomainContact");
  let body;
  body = JSON.stringify(se_UpdateDomainContactRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_UpdateDomainContactCommand");
var se_UpdateDomainContactPrivacyCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("UpdateDomainContactPrivacy");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_UpdateDomainContactPrivacyCommand");
var se_UpdateDomainNameserversCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("UpdateDomainNameservers");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_UpdateDomainNameserversCommand");
var se_UpdateTagsForDomainCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("UpdateTagsForDomain");
  let body;
  body = JSON.stringify((0, import_smithy_client._json)(input));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_UpdateTagsForDomainCommand");
var se_ViewBillingCommand = /* @__PURE__ */ __name(async (input, context) => {
  const headers = sharedHeaders("ViewBilling");
  let body;
  body = JSON.stringify(se_ViewBillingRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", void 0, body);
}, "se_ViewBillingCommand");
var de_AcceptDomainTransferFromAnotherAwsAccountCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_AcceptDomainTransferFromAnotherAwsAccountCommand");
var de_AssociateDelegationSignerToDomainCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_AssociateDelegationSignerToDomainCommand");
var de_CancelDomainTransferToAnotherAwsAccountCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_CancelDomainTransferToAnotherAwsAccountCommand");
var de_CheckDomainAvailabilityCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_CheckDomainAvailabilityCommand");
var de_CheckDomainTransferabilityCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_CheckDomainTransferabilityCommand");
var de_DeleteDomainCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_DeleteDomainCommand");
var de_DeleteTagsForDomainCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_DeleteTagsForDomainCommand");
var de_DisableDomainAutoRenewCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_DisableDomainAutoRenewCommand");
var de_DisableDomainTransferLockCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_DisableDomainTransferLockCommand");
var de_DisassociateDelegationSignerFromDomainCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_DisassociateDelegationSignerFromDomainCommand");
var de_EnableDomainAutoRenewCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_EnableDomainAutoRenewCommand");
var de_EnableDomainTransferLockCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_EnableDomainTransferLockCommand");
var de_GetContactReachabilityStatusCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_GetContactReachabilityStatusCommand");
var de_GetDomainDetailCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = de_GetDomainDetailResponse(data, context);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_GetDomainDetailCommand");
var de_GetDomainSuggestionsCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_GetDomainSuggestionsCommand");
var de_GetOperationDetailCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = de_GetOperationDetailResponse(data, context);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_GetOperationDetailCommand");
var de_ListDomainsCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = de_ListDomainsResponse(data, context);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_ListDomainsCommand");
var de_ListOperationsCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = de_ListOperationsResponse(data, context);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_ListOperationsCommand");
var de_ListPricesCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = de_ListPricesResponse(data, context);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_ListPricesCommand");
var de_ListTagsForDomainCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_ListTagsForDomainCommand");
var de_PushDomainCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  await (0, import_smithy_client.collectBody)(output.body, context);
  const response = {
    $metadata: deserializeMetadata(output)
  };
  return response;
}, "de_PushDomainCommand");
var de_RegisterDomainCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_RegisterDomainCommand");
var de_RejectDomainTransferFromAnotherAwsAccountCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_RejectDomainTransferFromAnotherAwsAccountCommand");
var de_RenewDomainCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_RenewDomainCommand");
var de_ResendContactReachabilityEmailCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_ResendContactReachabilityEmailCommand");
var de_ResendOperationAuthorizationCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  await (0, import_smithy_client.collectBody)(output.body, context);
  const response = {
    $metadata: deserializeMetadata(output)
  };
  return response;
}, "de_ResendOperationAuthorizationCommand");
var de_RetrieveDomainAuthCodeCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_RetrieveDomainAuthCodeCommand");
var de_TransferDomainCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_TransferDomainCommand");
var de_TransferDomainToAnotherAwsAccountCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_TransferDomainToAnotherAwsAccountCommand");
var de_UpdateDomainContactCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_UpdateDomainContactCommand");
var de_UpdateDomainContactPrivacyCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_UpdateDomainContactPrivacyCommand");
var de_UpdateDomainNameserversCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_UpdateDomainNameserversCommand");
var de_UpdateTagsForDomainCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = (0, import_smithy_client._json)(data);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_UpdateTagsForDomainCommand");
var de_ViewBillingCommand = /* @__PURE__ */ __name(async (output, context) => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const data = await (0, import_core2.parseJsonBody)(output.body, context);
  let contents = {};
  contents = de_ViewBillingResponse(data, context);
  const response = {
    $metadata: deserializeMetadata(output),
    ...contents
  };
  return response;
}, "de_ViewBillingCommand");
var de_CommandError = /* @__PURE__ */ __name(async (output, context) => {
  const parsedOutput = {
    ...output,
    body: await (0, import_core2.parseJsonErrorBody)(output.body, context)
  };
  const errorCode = (0, import_core2.loadRestJsonErrorCode)(output, parsedOutput.body);
  switch (errorCode) {
    case "DomainLimitExceeded":
    case "com.amazonaws.route53domains#DomainLimitExceeded":
      throw await de_DomainLimitExceededRes(parsedOutput, context);
    case "InvalidInput":
    case "com.amazonaws.route53domains#InvalidInput":
      throw await de_InvalidInputRes(parsedOutput, context);
    case "OperationLimitExceeded":
    case "com.amazonaws.route53domains#OperationLimitExceeded":
      throw await de_OperationLimitExceededRes(parsedOutput, context);
    case "UnsupportedTLD":
    case "com.amazonaws.route53domains#UnsupportedTLD":
      throw await de_UnsupportedTLDRes(parsedOutput, context);
    case "DnssecLimitExceeded":
    case "com.amazonaws.route53domains#DnssecLimitExceeded":
      throw await de_DnssecLimitExceededRes(parsedOutput, context);
    case "DuplicateRequest":
    case "com.amazonaws.route53domains#DuplicateRequest":
      throw await de_DuplicateRequestRes(parsedOutput, context);
    case "TLDRulesViolation":
    case "com.amazonaws.route53domains#TLDRulesViolation":
      throw await de_TLDRulesViolationRes(parsedOutput, context);
    default:
      const parsedBody = parsedOutput.body;
      return throwDefaultError({
        output,
        parsedBody,
        errorCode
      });
  }
}, "de_CommandError");
var de_DnssecLimitExceededRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const body = parsedOutput.body;
  const deserialized = (0, import_smithy_client._json)(body);
  const exception = new DnssecLimitExceeded({
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized
  });
  return (0, import_smithy_client.decorateServiceException)(exception, body);
}, "de_DnssecLimitExceededRes");
var de_DomainLimitExceededRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const body = parsedOutput.body;
  const deserialized = (0, import_smithy_client._json)(body);
  const exception = new DomainLimitExceeded({
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized
  });
  return (0, import_smithy_client.decorateServiceException)(exception, body);
}, "de_DomainLimitExceededRes");
var de_DuplicateRequestRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const body = parsedOutput.body;
  const deserialized = (0, import_smithy_client._json)(body);
  const exception = new DuplicateRequest({
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized
  });
  return (0, import_smithy_client.decorateServiceException)(exception, body);
}, "de_DuplicateRequestRes");
var de_InvalidInputRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const body = parsedOutput.body;
  const deserialized = (0, import_smithy_client._json)(body);
  const exception = new InvalidInput({
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized
  });
  return (0, import_smithy_client.decorateServiceException)(exception, body);
}, "de_InvalidInputRes");
var de_OperationLimitExceededRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const body = parsedOutput.body;
  const deserialized = (0, import_smithy_client._json)(body);
  const exception = new OperationLimitExceeded({
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized
  });
  return (0, import_smithy_client.decorateServiceException)(exception, body);
}, "de_OperationLimitExceededRes");
var de_TLDRulesViolationRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const body = parsedOutput.body;
  const deserialized = (0, import_smithy_client._json)(body);
  const exception = new TLDRulesViolation({
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized
  });
  return (0, import_smithy_client.decorateServiceException)(exception, body);
}, "de_TLDRulesViolationRes");
var de_UnsupportedTLDRes = /* @__PURE__ */ __name(async (parsedOutput, context) => {
  const body = parsedOutput.body;
  const deserialized = (0, import_smithy_client._json)(body);
  const exception = new UnsupportedTLD({
    $metadata: deserializeMetadata(parsedOutput),
    ...deserialized
  });
  return (0, import_smithy_client.decorateServiceException)(exception, body);
}, "de_UnsupportedTLDRes");
var se_Consent = /* @__PURE__ */ __name((input, context) => {
  return (0, import_smithy_client.take)(input, {
    Currency: [],
    MaxPrice: import_smithy_client.serializeFloat
  });
}, "se_Consent");
var se_ListOperationsRequest = /* @__PURE__ */ __name((input, context) => {
  return (0, import_smithy_client.take)(input, {
    Marker: [],
    MaxItems: [],
    SortBy: [],
    SortOrder: [],
    Status: import_smithy_client._json,
    SubmittedSince: /* @__PURE__ */ __name((_) => _.getTime() / 1e3, "SubmittedSince"),
    Type: import_smithy_client._json
  });
}, "se_ListOperationsRequest");
var se_UpdateDomainContactRequest = /* @__PURE__ */ __name((input, context) => {
  return (0, import_smithy_client.take)(input, {
    AdminContact: import_smithy_client._json,
    BillingContact: import_smithy_client._json,
    Consent: /* @__PURE__ */ __name((_) => se_Consent(_, context), "Consent"),
    DomainName: [],
    RegistrantContact: import_smithy_client._json,
    TechContact: import_smithy_client._json
  });
}, "se_UpdateDomainContactRequest");
var se_ViewBillingRequest = /* @__PURE__ */ __name((input, context) => {
  return (0, import_smithy_client.take)(input, {
    End: /* @__PURE__ */ __name((_) => _.getTime() / 1e3, "End"),
    Marker: [],
    MaxItems: [],
    Start: /* @__PURE__ */ __name((_) => _.getTime() / 1e3, "Start")
  });
}, "se_ViewBillingRequest");
var de_BillingRecord = /* @__PURE__ */ __name((output, context) => {
  return (0, import_smithy_client.take)(output, {
    BillDate: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "BillDate"),
    DomainName: import_smithy_client.expectString,
    InvoiceId: import_smithy_client.expectString,
    Operation: import_smithy_client.expectString,
    Price: import_smithy_client.limitedParseDouble
  });
}, "de_BillingRecord");
var de_BillingRecords = /* @__PURE__ */ __name((output, context) => {
  const retVal = (output || []).filter((e) => e != null).map((entry) => {
    return de_BillingRecord(entry, context);
  });
  return retVal;
}, "de_BillingRecords");
var de_DomainPrice = /* @__PURE__ */ __name((output, context) => {
  return (0, import_smithy_client.take)(output, {
    ChangeOwnershipPrice: /* @__PURE__ */ __name((_) => de_PriceWithCurrency(_, context), "ChangeOwnershipPrice"),
    Name: import_smithy_client.expectString,
    RegistrationPrice: /* @__PURE__ */ __name((_) => de_PriceWithCurrency(_, context), "RegistrationPrice"),
    RenewalPrice: /* @__PURE__ */ __name((_) => de_PriceWithCurrency(_, context), "RenewalPrice"),
    RestorationPrice: /* @__PURE__ */ __name((_) => de_PriceWithCurrency(_, context), "RestorationPrice"),
    TransferPrice: /* @__PURE__ */ __name((_) => de_PriceWithCurrency(_, context), "TransferPrice")
  });
}, "de_DomainPrice");
var de_DomainPriceList = /* @__PURE__ */ __name((output, context) => {
  const retVal = (output || []).filter((e) => e != null).map((entry) => {
    return de_DomainPrice(entry, context);
  });
  return retVal;
}, "de_DomainPriceList");
var de_DomainSummary = /* @__PURE__ */ __name((output, context) => {
  return (0, import_smithy_client.take)(output, {
    AutoRenew: import_smithy_client.expectBoolean,
    DomainName: import_smithy_client.expectString,
    Expiry: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "Expiry"),
    TransferLock: import_smithy_client.expectBoolean
  });
}, "de_DomainSummary");
var de_DomainSummaryList = /* @__PURE__ */ __name((output, context) => {
  const retVal = (output || []).filter((e) => e != null).map((entry) => {
    return de_DomainSummary(entry, context);
  });
  return retVal;
}, "de_DomainSummaryList");
var de_GetDomainDetailResponse = /* @__PURE__ */ __name((output, context) => {
  return (0, import_smithy_client.take)(output, {
    AbuseContactEmail: import_smithy_client.expectString,
    AbuseContactPhone: import_smithy_client.expectString,
    AdminContact: import_smithy_client._json,
    AdminPrivacy: import_smithy_client.expectBoolean,
    AutoRenew: import_smithy_client.expectBoolean,
    BillingContact: import_smithy_client._json,
    BillingPrivacy: import_smithy_client.expectBoolean,
    CreationDate: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "CreationDate"),
    DnsSec: import_smithy_client.expectString,
    DnssecKeys: import_smithy_client._json,
    DomainName: import_smithy_client.expectString,
    ExpirationDate: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "ExpirationDate"),
    Nameservers: import_smithy_client._json,
    RegistrantContact: import_smithy_client._json,
    RegistrantPrivacy: import_smithy_client.expectBoolean,
    RegistrarName: import_smithy_client.expectString,
    RegistrarUrl: import_smithy_client.expectString,
    RegistryDomainId: import_smithy_client.expectString,
    Reseller: import_smithy_client.expectString,
    StatusList: import_smithy_client._json,
    TechContact: import_smithy_client._json,
    TechPrivacy: import_smithy_client.expectBoolean,
    UpdatedDate: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "UpdatedDate"),
    WhoIsServer: import_smithy_client.expectString
  });
}, "de_GetDomainDetailResponse");
var de_GetOperationDetailResponse = /* @__PURE__ */ __name((output, context) => {
  return (0, import_smithy_client.take)(output, {
    DomainName: import_smithy_client.expectString,
    LastUpdatedDate: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "LastUpdatedDate"),
    Message: import_smithy_client.expectString,
    OperationId: import_smithy_client.expectString,
    Status: import_smithy_client.expectString,
    StatusFlag: import_smithy_client.expectString,
    SubmittedDate: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "SubmittedDate"),
    Type: import_smithy_client.expectString
  });
}, "de_GetOperationDetailResponse");
var de_ListDomainsResponse = /* @__PURE__ */ __name((output, context) => {
  return (0, import_smithy_client.take)(output, {
    Domains: /* @__PURE__ */ __name((_) => de_DomainSummaryList(_, context), "Domains"),
    NextPageMarker: import_smithy_client.expectString
  });
}, "de_ListDomainsResponse");
var de_ListOperationsResponse = /* @__PURE__ */ __name((output, context) => {
  return (0, import_smithy_client.take)(output, {
    NextPageMarker: import_smithy_client.expectString,
    Operations: /* @__PURE__ */ __name((_) => de_OperationSummaryList(_, context), "Operations")
  });
}, "de_ListOperationsResponse");
var de_ListPricesResponse = /* @__PURE__ */ __name((output, context) => {
  return (0, import_smithy_client.take)(output, {
    NextPageMarker: import_smithy_client.expectString,
    Prices: /* @__PURE__ */ __name((_) => de_DomainPriceList(_, context), "Prices")
  });
}, "de_ListPricesResponse");
var de_OperationSummary = /* @__PURE__ */ __name((output, context) => {
  return (0, import_smithy_client.take)(output, {
    DomainName: import_smithy_client.expectString,
    LastUpdatedDate: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "LastUpdatedDate"),
    Message: import_smithy_client.expectString,
    OperationId: import_smithy_client.expectString,
    Status: import_smithy_client.expectString,
    StatusFlag: import_smithy_client.expectString,
    SubmittedDate: /* @__PURE__ */ __name((_) => (0, import_smithy_client.expectNonNull)((0, import_smithy_client.parseEpochTimestamp)((0, import_smithy_client.expectNumber)(_))), "SubmittedDate"),
    Type: import_smithy_client.expectString
  });
}, "de_OperationSummary");
var de_OperationSummaryList = /* @__PURE__ */ __name((output, context) => {
  const retVal = (output || []).filter((e) => e != null).map((entry) => {
    return de_OperationSummary(entry, context);
  });
  return retVal;
}, "de_OperationSummaryList");
var de_PriceWithCurrency = /* @__PURE__ */ __name((output, context) => {
  return (0, import_smithy_client.take)(output, {
    Currency: import_smithy_client.expectString,
    Price: import_smithy_client.limitedParseDouble
  });
}, "de_PriceWithCurrency");
var de_ViewBillingResponse = /* @__PURE__ */ __name((output, context) => {
  return (0, import_smithy_client.take)(output, {
    BillingRecords: /* @__PURE__ */ __name((_) => de_BillingRecords(_, context), "BillingRecords"),
    NextPageMarker: import_smithy_client.expectString
  });
}, "de_ViewBillingResponse");
var deserializeMetadata = /* @__PURE__ */ __name((output) => ({
  httpStatusCode: output.statusCode,
  requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
  extendedRequestId: output.headers["x-amz-id-2"],
  cfId: output.headers["x-amz-cf-id"]
}), "deserializeMetadata");
var throwDefaultError = (0, import_smithy_client.withBaseException)(Route53DomainsServiceException);
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
  if (resolvedHostname !== void 0) {
    contents.hostname = resolvedHostname;
  }
  if (body !== void 0) {
    contents.body = body;
  }
  return new import_protocol_http.HttpRequest(contents);
}, "buildHttpRpcRequest");
function sharedHeaders(operation) {
  return {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": `Route53Domains_v20140515.${operation}`
  };
}
__name(sharedHeaders, "sharedHeaders");

// src/commands/AcceptDomainTransferFromAnotherAwsAccountCommand.ts
var AcceptDomainTransferFromAnotherAwsAccountCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "AcceptDomainTransferFromAnotherAwsAccount", {}).n("Route53DomainsClient", "AcceptDomainTransferFromAnotherAwsAccountCommand").f(AcceptDomainTransferFromAnotherAwsAccountRequestFilterSensitiveLog, void 0).ser(se_AcceptDomainTransferFromAnotherAwsAccountCommand).de(de_AcceptDomainTransferFromAnotherAwsAccountCommand).build() {
  static {
    __name(this, "AcceptDomainTransferFromAnotherAwsAccountCommand");
  }
};

// src/commands/AssociateDelegationSignerToDomainCommand.ts



var AssociateDelegationSignerToDomainCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "AssociateDelegationSignerToDomain", {}).n("Route53DomainsClient", "AssociateDelegationSignerToDomainCommand").f(void 0, void 0).ser(se_AssociateDelegationSignerToDomainCommand).de(de_AssociateDelegationSignerToDomainCommand).build() {
  static {
    __name(this, "AssociateDelegationSignerToDomainCommand");
  }
};

// src/commands/CancelDomainTransferToAnotherAwsAccountCommand.ts



var CancelDomainTransferToAnotherAwsAccountCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "CancelDomainTransferToAnotherAwsAccount", {}).n("Route53DomainsClient", "CancelDomainTransferToAnotherAwsAccountCommand").f(void 0, void 0).ser(se_CancelDomainTransferToAnotherAwsAccountCommand).de(de_CancelDomainTransferToAnotherAwsAccountCommand).build() {
  static {
    __name(this, "CancelDomainTransferToAnotherAwsAccountCommand");
  }
};

// src/commands/CheckDomainAvailabilityCommand.ts



var CheckDomainAvailabilityCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "CheckDomainAvailability", {}).n("Route53DomainsClient", "CheckDomainAvailabilityCommand").f(void 0, void 0).ser(se_CheckDomainAvailabilityCommand).de(de_CheckDomainAvailabilityCommand).build() {
  static {
    __name(this, "CheckDomainAvailabilityCommand");
  }
};

// src/commands/CheckDomainTransferabilityCommand.ts



var CheckDomainTransferabilityCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "CheckDomainTransferability", {}).n("Route53DomainsClient", "CheckDomainTransferabilityCommand").f(CheckDomainTransferabilityRequestFilterSensitiveLog, void 0).ser(se_CheckDomainTransferabilityCommand).de(de_CheckDomainTransferabilityCommand).build() {
  static {
    __name(this, "CheckDomainTransferabilityCommand");
  }
};

// src/commands/DeleteDomainCommand.ts



var DeleteDomainCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "DeleteDomain", {}).n("Route53DomainsClient", "DeleteDomainCommand").f(void 0, void 0).ser(se_DeleteDomainCommand).de(de_DeleteDomainCommand).build() {
  static {
    __name(this, "DeleteDomainCommand");
  }
};

// src/commands/DeleteTagsForDomainCommand.ts



var DeleteTagsForDomainCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "DeleteTagsForDomain", {}).n("Route53DomainsClient", "DeleteTagsForDomainCommand").f(void 0, void 0).ser(se_DeleteTagsForDomainCommand).de(de_DeleteTagsForDomainCommand).build() {
  static {
    __name(this, "DeleteTagsForDomainCommand");
  }
};

// src/commands/DisableDomainAutoRenewCommand.ts



var DisableDomainAutoRenewCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "DisableDomainAutoRenew", {}).n("Route53DomainsClient", "DisableDomainAutoRenewCommand").f(void 0, void 0).ser(se_DisableDomainAutoRenewCommand).de(de_DisableDomainAutoRenewCommand).build() {
  static {
    __name(this, "DisableDomainAutoRenewCommand");
  }
};

// src/commands/DisableDomainTransferLockCommand.ts



var DisableDomainTransferLockCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "DisableDomainTransferLock", {}).n("Route53DomainsClient", "DisableDomainTransferLockCommand").f(void 0, void 0).ser(se_DisableDomainTransferLockCommand).de(de_DisableDomainTransferLockCommand).build() {
  static {
    __name(this, "DisableDomainTransferLockCommand");
  }
};

// src/commands/DisassociateDelegationSignerFromDomainCommand.ts



var DisassociateDelegationSignerFromDomainCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "DisassociateDelegationSignerFromDomain", {}).n("Route53DomainsClient", "DisassociateDelegationSignerFromDomainCommand").f(void 0, void 0).ser(se_DisassociateDelegationSignerFromDomainCommand).de(de_DisassociateDelegationSignerFromDomainCommand).build() {
  static {
    __name(this, "DisassociateDelegationSignerFromDomainCommand");
  }
};

// src/commands/EnableDomainAutoRenewCommand.ts



var EnableDomainAutoRenewCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "EnableDomainAutoRenew", {}).n("Route53DomainsClient", "EnableDomainAutoRenewCommand").f(void 0, void 0).ser(se_EnableDomainAutoRenewCommand).de(de_EnableDomainAutoRenewCommand).build() {
  static {
    __name(this, "EnableDomainAutoRenewCommand");
  }
};

// src/commands/EnableDomainTransferLockCommand.ts



var EnableDomainTransferLockCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "EnableDomainTransferLock", {}).n("Route53DomainsClient", "EnableDomainTransferLockCommand").f(void 0, void 0).ser(se_EnableDomainTransferLockCommand).de(de_EnableDomainTransferLockCommand).build() {
  static {
    __name(this, "EnableDomainTransferLockCommand");
  }
};

// src/commands/GetContactReachabilityStatusCommand.ts



var GetContactReachabilityStatusCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "GetContactReachabilityStatus", {}).n("Route53DomainsClient", "GetContactReachabilityStatusCommand").f(void 0, void 0).ser(se_GetContactReachabilityStatusCommand).de(de_GetContactReachabilityStatusCommand).build() {
  static {
    __name(this, "GetContactReachabilityStatusCommand");
  }
};

// src/commands/GetDomainDetailCommand.ts



var GetDomainDetailCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "GetDomainDetail", {}).n("Route53DomainsClient", "GetDomainDetailCommand").f(void 0, GetDomainDetailResponseFilterSensitiveLog).ser(se_GetDomainDetailCommand).de(de_GetDomainDetailCommand).build() {
  static {
    __name(this, "GetDomainDetailCommand");
  }
};

// src/commands/GetDomainSuggestionsCommand.ts



var GetDomainSuggestionsCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "GetDomainSuggestions", {}).n("Route53DomainsClient", "GetDomainSuggestionsCommand").f(void 0, void 0).ser(se_GetDomainSuggestionsCommand).de(de_GetDomainSuggestionsCommand).build() {
  static {
    __name(this, "GetDomainSuggestionsCommand");
  }
};

// src/commands/GetOperationDetailCommand.ts



var GetOperationDetailCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "GetOperationDetail", {}).n("Route53DomainsClient", "GetOperationDetailCommand").f(void 0, void 0).ser(se_GetOperationDetailCommand).de(de_GetOperationDetailCommand).build() {
  static {
    __name(this, "GetOperationDetailCommand");
  }
};

// src/commands/ListDomainsCommand.ts



var ListDomainsCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "ListDomains", {}).n("Route53DomainsClient", "ListDomainsCommand").f(void 0, void 0).ser(se_ListDomainsCommand).de(de_ListDomainsCommand).build() {
  static {
    __name(this, "ListDomainsCommand");
  }
};

// src/commands/ListOperationsCommand.ts



var ListOperationsCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "ListOperations", {}).n("Route53DomainsClient", "ListOperationsCommand").f(void 0, void 0).ser(se_ListOperationsCommand).de(de_ListOperationsCommand).build() {
  static {
    __name(this, "ListOperationsCommand");
  }
};

// src/commands/ListPricesCommand.ts



var ListPricesCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "ListPrices", {}).n("Route53DomainsClient", "ListPricesCommand").f(void 0, void 0).ser(se_ListPricesCommand).de(de_ListPricesCommand).build() {
  static {
    __name(this, "ListPricesCommand");
  }
};

// src/commands/ListTagsForDomainCommand.ts



var ListTagsForDomainCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "ListTagsForDomain", {}).n("Route53DomainsClient", "ListTagsForDomainCommand").f(void 0, void 0).ser(se_ListTagsForDomainCommand).de(de_ListTagsForDomainCommand).build() {
  static {
    __name(this, "ListTagsForDomainCommand");
  }
};

// src/commands/PushDomainCommand.ts



var PushDomainCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "PushDomain", {}).n("Route53DomainsClient", "PushDomainCommand").f(void 0, void 0).ser(se_PushDomainCommand).de(de_PushDomainCommand).build() {
  static {
    __name(this, "PushDomainCommand");
  }
};

// src/commands/RegisterDomainCommand.ts



var RegisterDomainCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "RegisterDomain", {}).n("Route53DomainsClient", "RegisterDomainCommand").f(RegisterDomainRequestFilterSensitiveLog, void 0).ser(se_RegisterDomainCommand).de(de_RegisterDomainCommand).build() {
  static {
    __name(this, "RegisterDomainCommand");
  }
};

// src/commands/RejectDomainTransferFromAnotherAwsAccountCommand.ts



var RejectDomainTransferFromAnotherAwsAccountCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "RejectDomainTransferFromAnotherAwsAccount", {}).n("Route53DomainsClient", "RejectDomainTransferFromAnotherAwsAccountCommand").f(void 0, void 0).ser(se_RejectDomainTransferFromAnotherAwsAccountCommand).de(de_RejectDomainTransferFromAnotherAwsAccountCommand).build() {
  static {
    __name(this, "RejectDomainTransferFromAnotherAwsAccountCommand");
  }
};

// src/commands/RenewDomainCommand.ts



var RenewDomainCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "RenewDomain", {}).n("Route53DomainsClient", "RenewDomainCommand").f(void 0, void 0).ser(se_RenewDomainCommand).de(de_RenewDomainCommand).build() {
  static {
    __name(this, "RenewDomainCommand");
  }
};

// src/commands/ResendContactReachabilityEmailCommand.ts



var ResendContactReachabilityEmailCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "ResendContactReachabilityEmail", {}).n("Route53DomainsClient", "ResendContactReachabilityEmailCommand").f(void 0, ResendContactReachabilityEmailResponseFilterSensitiveLog).ser(se_ResendContactReachabilityEmailCommand).de(de_ResendContactReachabilityEmailCommand).build() {
  static {
    __name(this, "ResendContactReachabilityEmailCommand");
  }
};

// src/commands/ResendOperationAuthorizationCommand.ts



var ResendOperationAuthorizationCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "ResendOperationAuthorization", {}).n("Route53DomainsClient", "ResendOperationAuthorizationCommand").f(void 0, void 0).ser(se_ResendOperationAuthorizationCommand).de(de_ResendOperationAuthorizationCommand).build() {
  static {
    __name(this, "ResendOperationAuthorizationCommand");
  }
};

// src/commands/RetrieveDomainAuthCodeCommand.ts



var RetrieveDomainAuthCodeCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "RetrieveDomainAuthCode", {}).n("Route53DomainsClient", "RetrieveDomainAuthCodeCommand").f(void 0, RetrieveDomainAuthCodeResponseFilterSensitiveLog).ser(se_RetrieveDomainAuthCodeCommand).de(de_RetrieveDomainAuthCodeCommand).build() {
  static {
    __name(this, "RetrieveDomainAuthCodeCommand");
  }
};

// src/commands/TransferDomainCommand.ts



var TransferDomainCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "TransferDomain", {}).n("Route53DomainsClient", "TransferDomainCommand").f(TransferDomainRequestFilterSensitiveLog, void 0).ser(se_TransferDomainCommand).de(de_TransferDomainCommand).build() {
  static {
    __name(this, "TransferDomainCommand");
  }
};

// src/commands/TransferDomainToAnotherAwsAccountCommand.ts



var TransferDomainToAnotherAwsAccountCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "TransferDomainToAnotherAwsAccount", {}).n("Route53DomainsClient", "TransferDomainToAnotherAwsAccountCommand").f(void 0, TransferDomainToAnotherAwsAccountResponseFilterSensitiveLog).ser(se_TransferDomainToAnotherAwsAccountCommand).de(de_TransferDomainToAnotherAwsAccountCommand).build() {
  static {
    __name(this, "TransferDomainToAnotherAwsAccountCommand");
  }
};

// src/commands/UpdateDomainContactCommand.ts



var UpdateDomainContactCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "UpdateDomainContact", {}).n("Route53DomainsClient", "UpdateDomainContactCommand").f(UpdateDomainContactRequestFilterSensitiveLog, void 0).ser(se_UpdateDomainContactCommand).de(de_UpdateDomainContactCommand).build() {
  static {
    __name(this, "UpdateDomainContactCommand");
  }
};

// src/commands/UpdateDomainContactPrivacyCommand.ts



var UpdateDomainContactPrivacyCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "UpdateDomainContactPrivacy", {}).n("Route53DomainsClient", "UpdateDomainContactPrivacyCommand").f(void 0, void 0).ser(se_UpdateDomainContactPrivacyCommand).de(de_UpdateDomainContactPrivacyCommand).build() {
  static {
    __name(this, "UpdateDomainContactPrivacyCommand");
  }
};

// src/commands/UpdateDomainNameserversCommand.ts



var UpdateDomainNameserversCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "UpdateDomainNameservers", {}).n("Route53DomainsClient", "UpdateDomainNameserversCommand").f(UpdateDomainNameserversRequestFilterSensitiveLog, void 0).ser(se_UpdateDomainNameserversCommand).de(de_UpdateDomainNameserversCommand).build() {
  static {
    __name(this, "UpdateDomainNameserversCommand");
  }
};

// src/commands/UpdateTagsForDomainCommand.ts



var UpdateTagsForDomainCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "UpdateTagsForDomain", {}).n("Route53DomainsClient", "UpdateTagsForDomainCommand").f(void 0, void 0).ser(se_UpdateTagsForDomainCommand).de(de_UpdateTagsForDomainCommand).build() {
  static {
    __name(this, "UpdateTagsForDomainCommand");
  }
};

// src/commands/ViewBillingCommand.ts



var ViewBillingCommand = class extends import_smithy_client.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
  return [
    (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
    (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
  ];
}).s("Route53Domains_v20140515", "ViewBilling", {}).n("Route53DomainsClient", "ViewBillingCommand").f(void 0, void 0).ser(se_ViewBillingCommand).de(de_ViewBillingCommand).build() {
  static {
    __name(this, "ViewBillingCommand");
  }
};

// src/Route53Domains.ts
var commands = {
  AcceptDomainTransferFromAnotherAwsAccountCommand,
  AssociateDelegationSignerToDomainCommand,
  CancelDomainTransferToAnotherAwsAccountCommand,
  CheckDomainAvailabilityCommand,
  CheckDomainTransferabilityCommand,
  DeleteDomainCommand,
  DeleteTagsForDomainCommand,
  DisableDomainAutoRenewCommand,
  DisableDomainTransferLockCommand,
  DisassociateDelegationSignerFromDomainCommand,
  EnableDomainAutoRenewCommand,
  EnableDomainTransferLockCommand,
  GetContactReachabilityStatusCommand,
  GetDomainDetailCommand,
  GetDomainSuggestionsCommand,
  GetOperationDetailCommand,
  ListDomainsCommand,
  ListOperationsCommand,
  ListPricesCommand,
  ListTagsForDomainCommand,
  PushDomainCommand,
  RegisterDomainCommand,
  RejectDomainTransferFromAnotherAwsAccountCommand,
  RenewDomainCommand,
  ResendContactReachabilityEmailCommand,
  ResendOperationAuthorizationCommand,
  RetrieveDomainAuthCodeCommand,
  TransferDomainCommand,
  TransferDomainToAnotherAwsAccountCommand,
  UpdateDomainContactCommand,
  UpdateDomainContactPrivacyCommand,
  UpdateDomainNameserversCommand,
  UpdateTagsForDomainCommand,
  ViewBillingCommand
};
var Route53Domains = class extends Route53DomainsClient {
  static {
    __name(this, "Route53Domains");
  }
};
(0, import_smithy_client.createAggregatedClient)(commands, Route53Domains);

// src/pagination/ListDomainsPaginator.ts

var paginateListDomains = (0, import_core.createPaginator)(Route53DomainsClient, ListDomainsCommand, "Marker", "NextPageMarker", "MaxItems");

// src/pagination/ListOperationsPaginator.ts

var paginateListOperations = (0, import_core.createPaginator)(Route53DomainsClient, ListOperationsCommand, "Marker", "NextPageMarker", "MaxItems");

// src/pagination/ListPricesPaginator.ts

var paginateListPrices = (0, import_core.createPaginator)(Route53DomainsClient, ListPricesCommand, "Marker", "NextPageMarker", "MaxItems");

// src/pagination/ViewBillingPaginator.ts

var paginateViewBilling = (0, import_core.createPaginator)(Route53DomainsClient, ViewBillingCommand, "Marker", "NextPageMarker", "MaxItems");
// Annotate the CommonJS export names for ESM import in node:

0 && (module.exports = {
  Route53DomainsServiceException,
  __Client,
  Route53DomainsClient,
  Route53Domains,
  $Command,
  AcceptDomainTransferFromAnotherAwsAccountCommand,
  AssociateDelegationSignerToDomainCommand,
  CancelDomainTransferToAnotherAwsAccountCommand,
  CheckDomainAvailabilityCommand,
  CheckDomainTransferabilityCommand,
  DeleteDomainCommand,
  DeleteTagsForDomainCommand,
  DisableDomainAutoRenewCommand,
  DisableDomainTransferLockCommand,
  DisassociateDelegationSignerFromDomainCommand,
  EnableDomainAutoRenewCommand,
  EnableDomainTransferLockCommand,
  GetContactReachabilityStatusCommand,
  GetDomainDetailCommand,
  GetDomainSuggestionsCommand,
  GetOperationDetailCommand,
  ListDomainsCommand,
  ListOperationsCommand,
  ListPricesCommand,
  ListTagsForDomainCommand,
  PushDomainCommand,
  RegisterDomainCommand,
  RejectDomainTransferFromAnotherAwsAccountCommand,
  RenewDomainCommand,
  ResendContactReachabilityEmailCommand,
  ResendOperationAuthorizationCommand,
  RetrieveDomainAuthCodeCommand,
  TransferDomainCommand,
  TransferDomainToAnotherAwsAccountCommand,
  UpdateDomainContactCommand,
  UpdateDomainContactPrivacyCommand,
  UpdateDomainNameserversCommand,
  UpdateTagsForDomainCommand,
  ViewBillingCommand,
  paginateListDomains,
  paginateListOperations,
  paginateListPrices,
  paginateViewBilling,
  DomainLimitExceeded,
  InvalidInput,
  OperationLimitExceeded,
  UnsupportedTLD,
  DnssecLimitExceeded,
  DuplicateRequest,
  TLDRulesViolation,
  OperationType,
  DomainAvailability,
  Transferable,
  ContactType,
  CountryCode,
  ExtraParamName,
  ListDomainsAttributeName,
  Operator,
  ReachabilityStatus,
  OperationStatus,
  StatusFlag,
  SortOrder,
  ListOperationsSortAttributeName,
  AcceptDomainTransferFromAnotherAwsAccountRequestFilterSensitiveLog,
  CheckDomainTransferabilityRequestFilterSensitiveLog,
  ExtraParamFilterSensitiveLog,
  ContactDetailFilterSensitiveLog,
  GetDomainDetailResponseFilterSensitiveLog,
  RegisterDomainRequestFilterSensitiveLog,
  ResendContactReachabilityEmailResponseFilterSensitiveLog,
  RetrieveDomainAuthCodeResponseFilterSensitiveLog,
  TransferDomainRequestFilterSensitiveLog,
  TransferDomainToAnotherAwsAccountResponseFilterSensitiveLog,
  UpdateDomainContactRequestFilterSensitiveLog,
  UpdateDomainNameserversRequestFilterSensitiveLog
});

