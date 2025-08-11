import { ExceptionOptionType as __ExceptionOptionType } from "@smithy/smithy-client";
import { CloudFrontServiceException as __BaseException } from "./CloudFrontServiceException";
import {
  CachePolicy,
  CachePolicyConfig,
  CloudFrontOriginAccessIdentity,
  CloudFrontOriginAccessIdentityConfig,
  ConnectionGroup,
  ContinuousDeploymentPolicy,
  ContinuousDeploymentPolicyConfig,
  Customizations,
  Distribution,
  DistributionConfig,
  DistributionTenant,
  DomainItem,
  FieldLevelEncryption,
  FieldLevelEncryptionConfig,
  FieldLevelEncryptionProfile,
  FieldLevelEncryptionProfileConfig,
  FunctionConfig,
  FunctionStage,
  FunctionSummary,
  KeyGroup,
  KeyGroupConfig,
  KeyValueStore,
  ManagedCertificateRequest,
  OriginAccessControl,
  OriginAccessControlConfig,
  Parameter,
  Tags,
} from "./models_0";
import {
  DistributionResourceId,
  EndPoint,
  OriginRequestPolicy,
  OriginRequestPolicyConfig,
  PublicKey,
  PublicKeyConfig,
  RealtimeLogConfig,
  ResponseHeadersPolicy,
  ResponseHeadersPolicyConfig,
  StreamingDistribution,
  StreamingDistributionConfig,
  StreamingDistributionSummary,
  VpcOrigin,
  VpcOriginEndpointConfig,
} from "./models_1";
export interface StreamingDistributionList {
  Marker: string | undefined;
  NextMarker?: string | undefined;
  MaxItems: number | undefined;
  IsTruncated: boolean | undefined;
  Quantity: number | undefined;
  Items?: StreamingDistributionSummary[] | undefined;
}
export interface ListStreamingDistributionsResult {
  StreamingDistributionList?: StreamingDistributionList | undefined;
}
export interface ListTagsForResourceRequest {
  Resource: string | undefined;
}
export interface ListTagsForResourceResult {
  Tags: Tags | undefined;
}
export interface ListVpcOriginsRequest {
  Marker?: string | undefined;
  MaxItems?: number | undefined;
}
export interface VpcOriginSummary {
  Id: string | undefined;
  Name: string | undefined;
  Status: string | undefined;
  CreatedTime: Date | undefined;
  LastModifiedTime: Date | undefined;
  Arn: string | undefined;
  OriginEndpointArn: string | undefined;
}
export interface VpcOriginList {
  Marker: string | undefined;
  NextMarker?: string | undefined;
  MaxItems: number | undefined;
  IsTruncated: boolean | undefined;
  Quantity: number | undefined;
  Items?: VpcOriginSummary[] | undefined;
}
export interface ListVpcOriginsResult {
  VpcOriginList?: VpcOriginList | undefined;
}
export interface PublishFunctionRequest {
  Name: string | undefined;
  IfMatch: string | undefined;
}
export interface PublishFunctionResult {
  FunctionSummary?: FunctionSummary | undefined;
}
export interface TagResourceRequest {
  Resource: string | undefined;
  Tags: Tags | undefined;
}
export declare class TestFunctionFailed extends __BaseException {
  readonly name: "TestFunctionFailed";
  readonly $fault: "server";
  Message?: string | undefined;
  constructor(opts: __ExceptionOptionType<TestFunctionFailed, __BaseException>);
}
export interface TestFunctionRequest {
  Name: string | undefined;
  IfMatch: string | undefined;
  Stage?: FunctionStage | undefined;
  EventObject: Uint8Array | undefined;
}
export interface TestResult {
  FunctionSummary?: FunctionSummary | undefined;
  ComputeUtilization?: string | undefined;
  FunctionExecutionLogs?: string[] | undefined;
  FunctionErrorMessage?: string | undefined;
  FunctionOutput?: string | undefined;
}
export interface TestFunctionResult {
  TestResult?: TestResult | undefined;
}
export interface TagKeys {
  Items?: string[] | undefined;
}
export interface UntagResourceRequest {
  Resource: string | undefined;
  TagKeys: TagKeys | undefined;
}
export interface UpdateCachePolicyRequest {
  CachePolicyConfig: CachePolicyConfig | undefined;
  Id: string | undefined;
  IfMatch?: string | undefined;
}
export interface UpdateCachePolicyResult {
  CachePolicy?: CachePolicy | undefined;
  ETag?: string | undefined;
}
export interface UpdateCloudFrontOriginAccessIdentityRequest {
  CloudFrontOriginAccessIdentityConfig:
    | CloudFrontOriginAccessIdentityConfig
    | undefined;
  Id: string | undefined;
  IfMatch?: string | undefined;
}
export interface UpdateCloudFrontOriginAccessIdentityResult {
  CloudFrontOriginAccessIdentity?: CloudFrontOriginAccessIdentity | undefined;
  ETag?: string | undefined;
}
export interface UpdateConnectionGroupRequest {
  Id: string | undefined;
  Ipv6Enabled?: boolean | undefined;
  IfMatch: string | undefined;
  AnycastIpListId?: string | undefined;
  Enabled?: boolean | undefined;
}
export interface UpdateConnectionGroupResult {
  ConnectionGroup?: ConnectionGroup | undefined;
  ETag?: string | undefined;
}
export interface UpdateContinuousDeploymentPolicyRequest {
  ContinuousDeploymentPolicyConfig:
    | ContinuousDeploymentPolicyConfig
    | undefined;
  Id: string | undefined;
  IfMatch?: string | undefined;
}
export interface UpdateContinuousDeploymentPolicyResult {
  ContinuousDeploymentPolicy?: ContinuousDeploymentPolicy | undefined;
  ETag?: string | undefined;
}
export interface UpdateDistributionRequest {
  DistributionConfig: DistributionConfig | undefined;
  Id: string | undefined;
  IfMatch?: string | undefined;
}
export interface UpdateDistributionResult {
  Distribution?: Distribution | undefined;
  ETag?: string | undefined;
}
export interface UpdateDistributionTenantRequest {
  Id: string | undefined;
  DistributionId?: string | undefined;
  Domains?: DomainItem[] | undefined;
  Customizations?: Customizations | undefined;
  Parameters?: Parameter[] | undefined;
  ConnectionGroupId?: string | undefined;
  IfMatch: string | undefined;
  ManagedCertificateRequest?: ManagedCertificateRequest | undefined;
  Enabled?: boolean | undefined;
}
export interface UpdateDistributionTenantResult {
  DistributionTenant?: DistributionTenant | undefined;
  ETag?: string | undefined;
}
export interface UpdateDistributionWithStagingConfigRequest {
  Id: string | undefined;
  StagingDistributionId?: string | undefined;
  IfMatch?: string | undefined;
}
export interface UpdateDistributionWithStagingConfigResult {
  Distribution?: Distribution | undefined;
  ETag?: string | undefined;
}
export interface UpdateDomainAssociationRequest {
  Domain: string | undefined;
  TargetResource: DistributionResourceId | undefined;
  IfMatch?: string | undefined;
}
export interface UpdateDomainAssociationResult {
  Domain?: string | undefined;
  ResourceId?: string | undefined;
  ETag?: string | undefined;
}
export interface UpdateFieldLevelEncryptionConfigRequest {
  FieldLevelEncryptionConfig: FieldLevelEncryptionConfig | undefined;
  Id: string | undefined;
  IfMatch?: string | undefined;
}
export interface UpdateFieldLevelEncryptionConfigResult {
  FieldLevelEncryption?: FieldLevelEncryption | undefined;
  ETag?: string | undefined;
}
export interface UpdateFieldLevelEncryptionProfileRequest {
  FieldLevelEncryptionProfileConfig:
    | FieldLevelEncryptionProfileConfig
    | undefined;
  Id: string | undefined;
  IfMatch?: string | undefined;
}
export interface UpdateFieldLevelEncryptionProfileResult {
  FieldLevelEncryptionProfile?: FieldLevelEncryptionProfile | undefined;
  ETag?: string | undefined;
}
export interface UpdateFunctionRequest {
  Name: string | undefined;
  IfMatch: string | undefined;
  FunctionConfig: FunctionConfig | undefined;
  FunctionCode: Uint8Array | undefined;
}
export interface UpdateFunctionResult {
  FunctionSummary?: FunctionSummary | undefined;
  ETag?: string | undefined;
}
export interface UpdateKeyGroupRequest {
  KeyGroupConfig: KeyGroupConfig | undefined;
  Id: string | undefined;
  IfMatch?: string | undefined;
}
export interface UpdateKeyGroupResult {
  KeyGroup?: KeyGroup | undefined;
  ETag?: string | undefined;
}
export interface UpdateKeyValueStoreRequest {
  Name: string | undefined;
  Comment: string | undefined;
  IfMatch: string | undefined;
}
export interface UpdateKeyValueStoreResult {
  KeyValueStore?: KeyValueStore | undefined;
  ETag?: string | undefined;
}
export interface UpdateOriginAccessControlRequest {
  OriginAccessControlConfig: OriginAccessControlConfig | undefined;
  Id: string | undefined;
  IfMatch?: string | undefined;
}
export interface UpdateOriginAccessControlResult {
  OriginAccessControl?: OriginAccessControl | undefined;
  ETag?: string | undefined;
}
export interface UpdateOriginRequestPolicyRequest {
  OriginRequestPolicyConfig: OriginRequestPolicyConfig | undefined;
  Id: string | undefined;
  IfMatch?: string | undefined;
}
export interface UpdateOriginRequestPolicyResult {
  OriginRequestPolicy?: OriginRequestPolicy | undefined;
  ETag?: string | undefined;
}
export interface UpdatePublicKeyRequest {
  PublicKeyConfig: PublicKeyConfig | undefined;
  Id: string | undefined;
  IfMatch?: string | undefined;
}
export interface UpdatePublicKeyResult {
  PublicKey?: PublicKey | undefined;
  ETag?: string | undefined;
}
export interface UpdateRealtimeLogConfigRequest {
  EndPoints?: EndPoint[] | undefined;
  Fields?: string[] | undefined;
  Name?: string | undefined;
  ARN?: string | undefined;
  SamplingRate?: number | undefined;
}
export interface UpdateRealtimeLogConfigResult {
  RealtimeLogConfig?: RealtimeLogConfig | undefined;
}
export interface UpdateResponseHeadersPolicyRequest {
  ResponseHeadersPolicyConfig: ResponseHeadersPolicyConfig | undefined;
  Id: string | undefined;
  IfMatch?: string | undefined;
}
export interface UpdateResponseHeadersPolicyResult {
  ResponseHeadersPolicy?: ResponseHeadersPolicy | undefined;
  ETag?: string | undefined;
}
export interface UpdateStreamingDistributionRequest {
  StreamingDistributionConfig: StreamingDistributionConfig | undefined;
  Id: string | undefined;
  IfMatch?: string | undefined;
}
export interface UpdateStreamingDistributionResult {
  StreamingDistribution?: StreamingDistribution | undefined;
  ETag?: string | undefined;
}
export interface UpdateVpcOriginRequest {
  VpcOriginEndpointConfig: VpcOriginEndpointConfig | undefined;
  Id: string | undefined;
  IfMatch: string | undefined;
}
export interface UpdateVpcOriginResult {
  VpcOrigin?: VpcOrigin | undefined;
  ETag?: string | undefined;
}
export interface VerifyDnsConfigurationRequest {
  Domain?: string | undefined;
  Identifier: string | undefined;
}
export declare const DnsConfigurationStatus: {
  readonly Invalid: "invalid-configuration";
  readonly Unknown: "unknown-configuration";
  readonly Valid: "valid-configuration";
};
export type DnsConfigurationStatus =
  (typeof DnsConfigurationStatus)[keyof typeof DnsConfigurationStatus];
export interface DnsConfiguration {
  Domain: string | undefined;
  Status: DnsConfigurationStatus | undefined;
  Reason?: string | undefined;
}
export interface VerifyDnsConfigurationResult {
  DnsConfigurationList?: DnsConfiguration[] | undefined;
}
export declare const TestFunctionRequestFilterSensitiveLog: (
  obj: TestFunctionRequest
) => any;
export declare const TestResultFilterSensitiveLog: (obj: TestResult) => any;
export declare const TestFunctionResultFilterSensitiveLog: (
  obj: TestFunctionResult
) => any;
export declare const UpdateDistributionRequestFilterSensitiveLog: (
  obj: UpdateDistributionRequest
) => any;
export declare const UpdateDistributionResultFilterSensitiveLog: (
  obj: UpdateDistributionResult
) => any;
export declare const UpdateDistributionWithStagingConfigResultFilterSensitiveLog: (
  obj: UpdateDistributionWithStagingConfigResult
) => any;
export declare const UpdateFunctionRequestFilterSensitiveLog: (
  obj: UpdateFunctionRequest
) => any;
