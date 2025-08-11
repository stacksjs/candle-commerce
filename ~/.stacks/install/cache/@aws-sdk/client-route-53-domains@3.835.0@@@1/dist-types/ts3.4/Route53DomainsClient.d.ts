import {
  HostHeaderInputConfig,
  HostHeaderResolvedConfig,
} from "@aws-sdk/middleware-host-header";
import {
  UserAgentInputConfig,
  UserAgentResolvedConfig,
} from "@aws-sdk/middleware-user-agent";
import {
  RegionInputConfig,
  RegionResolvedConfig,
} from "@smithy/config-resolver";
import {
  EndpointInputConfig,
  EndpointResolvedConfig,
} from "@smithy/middleware-endpoint";
import {
  RetryInputConfig,
  RetryResolvedConfig,
} from "@smithy/middleware-retry";
import { HttpHandlerUserInput as __HttpHandlerUserInput } from "@smithy/protocol-http";
import {
  Client as __Client,
  DefaultsMode as __DefaultsMode,
  SmithyConfiguration as __SmithyConfiguration,
  SmithyResolvedConfiguration as __SmithyResolvedConfiguration,
} from "@smithy/smithy-client";
import {
  AwsCredentialIdentityProvider,
  BodyLengthCalculator as __BodyLengthCalculator,
  CheckOptionalClientConfig as __CheckOptionalClientConfig,
  ChecksumConstructor as __ChecksumConstructor,
  Decoder as __Decoder,
  Encoder as __Encoder,
  HashConstructor as __HashConstructor,
  HttpHandlerOptions as __HttpHandlerOptions,
  Logger as __Logger,
  Provider as __Provider,
  Provider,
  StreamCollector as __StreamCollector,
  UrlParser as __UrlParser,
  UserAgent as __UserAgent,
} from "@smithy/types";
import {
  HttpAuthSchemeInputConfig,
  HttpAuthSchemeResolvedConfig,
} from "./auth/httpAuthSchemeProvider";
import {
  AcceptDomainTransferFromAnotherAwsAccountCommandInput,
  AcceptDomainTransferFromAnotherAwsAccountCommandOutput,
} from "./commands/AcceptDomainTransferFromAnotherAwsAccountCommand";
import {
  AssociateDelegationSignerToDomainCommandInput,
  AssociateDelegationSignerToDomainCommandOutput,
} from "./commands/AssociateDelegationSignerToDomainCommand";
import {
  CancelDomainTransferToAnotherAwsAccountCommandInput,
  CancelDomainTransferToAnotherAwsAccountCommandOutput,
} from "./commands/CancelDomainTransferToAnotherAwsAccountCommand";
import {
  CheckDomainAvailabilityCommandInput,
  CheckDomainAvailabilityCommandOutput,
} from "./commands/CheckDomainAvailabilityCommand";
import {
  CheckDomainTransferabilityCommandInput,
  CheckDomainTransferabilityCommandOutput,
} from "./commands/CheckDomainTransferabilityCommand";
import {
  DeleteDomainCommandInput,
  DeleteDomainCommandOutput,
} from "./commands/DeleteDomainCommand";
import {
  DeleteTagsForDomainCommandInput,
  DeleteTagsForDomainCommandOutput,
} from "./commands/DeleteTagsForDomainCommand";
import {
  DisableDomainAutoRenewCommandInput,
  DisableDomainAutoRenewCommandOutput,
} from "./commands/DisableDomainAutoRenewCommand";
import {
  DisableDomainTransferLockCommandInput,
  DisableDomainTransferLockCommandOutput,
} from "./commands/DisableDomainTransferLockCommand";
import {
  DisassociateDelegationSignerFromDomainCommandInput,
  DisassociateDelegationSignerFromDomainCommandOutput,
} from "./commands/DisassociateDelegationSignerFromDomainCommand";
import {
  EnableDomainAutoRenewCommandInput,
  EnableDomainAutoRenewCommandOutput,
} from "./commands/EnableDomainAutoRenewCommand";
import {
  EnableDomainTransferLockCommandInput,
  EnableDomainTransferLockCommandOutput,
} from "./commands/EnableDomainTransferLockCommand";
import {
  GetContactReachabilityStatusCommandInput,
  GetContactReachabilityStatusCommandOutput,
} from "./commands/GetContactReachabilityStatusCommand";
import {
  GetDomainDetailCommandInput,
  GetDomainDetailCommandOutput,
} from "./commands/GetDomainDetailCommand";
import {
  GetDomainSuggestionsCommandInput,
  GetDomainSuggestionsCommandOutput,
} from "./commands/GetDomainSuggestionsCommand";
import {
  GetOperationDetailCommandInput,
  GetOperationDetailCommandOutput,
} from "./commands/GetOperationDetailCommand";
import {
  ListDomainsCommandInput,
  ListDomainsCommandOutput,
} from "./commands/ListDomainsCommand";
import {
  ListOperationsCommandInput,
  ListOperationsCommandOutput,
} from "./commands/ListOperationsCommand";
import {
  ListPricesCommandInput,
  ListPricesCommandOutput,
} from "./commands/ListPricesCommand";
import {
  ListTagsForDomainCommandInput,
  ListTagsForDomainCommandOutput,
} from "./commands/ListTagsForDomainCommand";
import {
  PushDomainCommandInput,
  PushDomainCommandOutput,
} from "./commands/PushDomainCommand";
import {
  RegisterDomainCommandInput,
  RegisterDomainCommandOutput,
} from "./commands/RegisterDomainCommand";
import {
  RejectDomainTransferFromAnotherAwsAccountCommandInput,
  RejectDomainTransferFromAnotherAwsAccountCommandOutput,
} from "./commands/RejectDomainTransferFromAnotherAwsAccountCommand";
import {
  RenewDomainCommandInput,
  RenewDomainCommandOutput,
} from "./commands/RenewDomainCommand";
import {
  ResendContactReachabilityEmailCommandInput,
  ResendContactReachabilityEmailCommandOutput,
} from "./commands/ResendContactReachabilityEmailCommand";
import {
  ResendOperationAuthorizationCommandInput,
  ResendOperationAuthorizationCommandOutput,
} from "./commands/ResendOperationAuthorizationCommand";
import {
  RetrieveDomainAuthCodeCommandInput,
  RetrieveDomainAuthCodeCommandOutput,
} from "./commands/RetrieveDomainAuthCodeCommand";
import {
  TransferDomainCommandInput,
  TransferDomainCommandOutput,
} from "./commands/TransferDomainCommand";
import {
  TransferDomainToAnotherAwsAccountCommandInput,
  TransferDomainToAnotherAwsAccountCommandOutput,
} from "./commands/TransferDomainToAnotherAwsAccountCommand";
import {
  UpdateDomainContactCommandInput,
  UpdateDomainContactCommandOutput,
} from "./commands/UpdateDomainContactCommand";
import {
  UpdateDomainContactPrivacyCommandInput,
  UpdateDomainContactPrivacyCommandOutput,
} from "./commands/UpdateDomainContactPrivacyCommand";
import {
  UpdateDomainNameserversCommandInput,
  UpdateDomainNameserversCommandOutput,
} from "./commands/UpdateDomainNameserversCommand";
import {
  UpdateTagsForDomainCommandInput,
  UpdateTagsForDomainCommandOutput,
} from "./commands/UpdateTagsForDomainCommand";
import {
  ViewBillingCommandInput,
  ViewBillingCommandOutput,
} from "./commands/ViewBillingCommand";
import {
  ClientInputEndpointParameters,
  ClientResolvedEndpointParameters,
  EndpointParameters,
} from "./endpoint/EndpointParameters";
import { RuntimeExtension, RuntimeExtensionsConfig } from "./runtimeExtensions";
export { __Client };
export type ServiceInputTypes =
  | AcceptDomainTransferFromAnotherAwsAccountCommandInput
  | AssociateDelegationSignerToDomainCommandInput
  | CancelDomainTransferToAnotherAwsAccountCommandInput
  | CheckDomainAvailabilityCommandInput
  | CheckDomainTransferabilityCommandInput
  | DeleteDomainCommandInput
  | DeleteTagsForDomainCommandInput
  | DisableDomainAutoRenewCommandInput
  | DisableDomainTransferLockCommandInput
  | DisassociateDelegationSignerFromDomainCommandInput
  | EnableDomainAutoRenewCommandInput
  | EnableDomainTransferLockCommandInput
  | GetContactReachabilityStatusCommandInput
  | GetDomainDetailCommandInput
  | GetDomainSuggestionsCommandInput
  | GetOperationDetailCommandInput
  | ListDomainsCommandInput
  | ListOperationsCommandInput
  | ListPricesCommandInput
  | ListTagsForDomainCommandInput
  | PushDomainCommandInput
  | RegisterDomainCommandInput
  | RejectDomainTransferFromAnotherAwsAccountCommandInput
  | RenewDomainCommandInput
  | ResendContactReachabilityEmailCommandInput
  | ResendOperationAuthorizationCommandInput
  | RetrieveDomainAuthCodeCommandInput
  | TransferDomainCommandInput
  | TransferDomainToAnotherAwsAccountCommandInput
  | UpdateDomainContactCommandInput
  | UpdateDomainContactPrivacyCommandInput
  | UpdateDomainNameserversCommandInput
  | UpdateTagsForDomainCommandInput
  | ViewBillingCommandInput;
export type ServiceOutputTypes =
  | AcceptDomainTransferFromAnotherAwsAccountCommandOutput
  | AssociateDelegationSignerToDomainCommandOutput
  | CancelDomainTransferToAnotherAwsAccountCommandOutput
  | CheckDomainAvailabilityCommandOutput
  | CheckDomainTransferabilityCommandOutput
  | DeleteDomainCommandOutput
  | DeleteTagsForDomainCommandOutput
  | DisableDomainAutoRenewCommandOutput
  | DisableDomainTransferLockCommandOutput
  | DisassociateDelegationSignerFromDomainCommandOutput
  | EnableDomainAutoRenewCommandOutput
  | EnableDomainTransferLockCommandOutput
  | GetContactReachabilityStatusCommandOutput
  | GetDomainDetailCommandOutput
  | GetDomainSuggestionsCommandOutput
  | GetOperationDetailCommandOutput
  | ListDomainsCommandOutput
  | ListOperationsCommandOutput
  | ListPricesCommandOutput
  | ListTagsForDomainCommandOutput
  | PushDomainCommandOutput
  | RegisterDomainCommandOutput
  | RejectDomainTransferFromAnotherAwsAccountCommandOutput
  | RenewDomainCommandOutput
  | ResendContactReachabilityEmailCommandOutput
  | ResendOperationAuthorizationCommandOutput
  | RetrieveDomainAuthCodeCommandOutput
  | TransferDomainCommandOutput
  | TransferDomainToAnotherAwsAccountCommandOutput
  | UpdateDomainContactCommandOutput
  | UpdateDomainContactPrivacyCommandOutput
  | UpdateDomainNameserversCommandOutput
  | UpdateTagsForDomainCommandOutput
  | ViewBillingCommandOutput;
export interface ClientDefaults
  extends Partial<__SmithyConfiguration<__HttpHandlerOptions>> {
  requestHandler?: __HttpHandlerUserInput;
  sha256?: __ChecksumConstructor | __HashConstructor;
  urlParser?: __UrlParser;
  bodyLengthChecker?: __BodyLengthCalculator;
  streamCollector?: __StreamCollector;
  base64Decoder?: __Decoder;
  base64Encoder?: __Encoder;
  utf8Decoder?: __Decoder;
  utf8Encoder?: __Encoder;
  runtime?: string;
  disableHostPrefix?: boolean;
  serviceId?: string;
  useDualstackEndpoint?: boolean | __Provider<boolean>;
  useFipsEndpoint?: boolean | __Provider<boolean>;
  region?: string | __Provider<string>;
  profile?: string;
  defaultUserAgentProvider?: Provider<__UserAgent>;
  credentialDefaultProvider?: (input: any) => AwsCredentialIdentityProvider;
  maxAttempts?: number | __Provider<number>;
  retryMode?: string | __Provider<string>;
  logger?: __Logger;
  extensions?: RuntimeExtension[];
  defaultsMode?: __DefaultsMode | __Provider<__DefaultsMode>;
}
export type Route53DomainsClientConfigType = Partial<
  __SmithyConfiguration<__HttpHandlerOptions>
> &
  ClientDefaults &
  UserAgentInputConfig &
  RetryInputConfig &
  RegionInputConfig &
  HostHeaderInputConfig &
  EndpointInputConfig<EndpointParameters> &
  HttpAuthSchemeInputConfig &
  ClientInputEndpointParameters;
export interface Route53DomainsClientConfig
  extends Route53DomainsClientConfigType {}
export type Route53DomainsClientResolvedConfigType =
  __SmithyResolvedConfiguration<__HttpHandlerOptions> &
    Required<ClientDefaults> &
    RuntimeExtensionsConfig &
    UserAgentResolvedConfig &
    RetryResolvedConfig &
    RegionResolvedConfig &
    HostHeaderResolvedConfig &
    EndpointResolvedConfig<EndpointParameters> &
    HttpAuthSchemeResolvedConfig &
    ClientResolvedEndpointParameters;
export interface Route53DomainsClientResolvedConfig
  extends Route53DomainsClientResolvedConfigType {}
export declare class Route53DomainsClient extends __Client<
  __HttpHandlerOptions,
  ServiceInputTypes,
  ServiceOutputTypes,
  Route53DomainsClientResolvedConfig
> {
  readonly config: Route53DomainsClientResolvedConfig;
  constructor(
    ...[configuration]: __CheckOptionalClientConfig<Route53DomainsClientConfig>
  );
  destroy(): void;
}
