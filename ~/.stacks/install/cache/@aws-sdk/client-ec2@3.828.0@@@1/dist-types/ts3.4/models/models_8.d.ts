import {
  AddressAttribute,
  AddressAttributeName,
  ByoipCidr,
  ClientVpnAuthorizationRuleStatus,
  IamInstanceProfileAssociation,
  IamInstanceProfileSpecification,
  IpPermission,
  NatGatewayAddress,
  PortRange,
  RouteTableAssociationState,
  TagSpecification,
  TransitGatewayAttachmentResourceType,
  UnsuccessfulItem,
} from "./models_0";
import {
  _InstanceType,
  AmdSevSnpSpecification,
  BlockDeviceMapping,
  CreditSpecificationRequest,
  ElasticGpuSpecification,
  HostnameType,
  InstanceBandwidthWeighting,
  InstanceInterruptionBehavior,
  MarketType,
  OperatorRequest,
  Placement,
  ShutdownBehavior,
  SpotInstanceType,
} from "./models_1";
import {
  IcmpTypeCode,
  InstanceIpv6Address,
  LocalGatewayRoute,
  ManagedPrefixList,
  RuleAction,
  SnapshotState,
  SSEType,
  TransitGatewayRoute,
} from "./models_2";
import { Filter } from "./models_3";
import {
  ClientVpnConnectionStatus,
  HttpTokensState,
  InstanceAttributeName,
  InstanceAutoRecoveryState,
  InstanceMetadataEndpointState,
  InstanceMetadataProtocolState,
  InstanceMetadataTagsState,
  InstanceState,
} from "./models_4";
import {
  InstanceNetworkInterfaceSpecification,
  NetworkInsightsAccessScopeAnalysis,
  NetworkInsightsAnalysis,
  RunInstancesMonitoringEnabled,
  SnapshotAttributeName,
  SpotFleetRequestConfigData,
  SpotInstanceRequest,
  SpotPlacement,
} from "./models_5";
import {
  CapacityReservationSpecification,
  InstanceMonitoring,
  Status,
} from "./models_7";
export interface RejectVpcPeeringConnectionResult {
  Return?: boolean | undefined;
}
export interface ReleaseAddressRequest {
  AllocationId?: string | undefined;
  PublicIp?: string | undefined;
  NetworkBorderGroup?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface ReleaseHostsRequest {
  HostIds: string[] | undefined;
}
export interface ReleaseHostsResult {
  Successful?: string[] | undefined;
  Unsuccessful?: UnsuccessfulItem[] | undefined;
}
export interface ReleaseIpamPoolAllocationRequest {
  DryRun?: boolean | undefined;
  IpamPoolId: string | undefined;
  Cidr: string | undefined;
  IpamPoolAllocationId: string | undefined;
}
export interface ReleaseIpamPoolAllocationResult {
  Success?: boolean | undefined;
}
export interface ReplaceIamInstanceProfileAssociationRequest {
  IamInstanceProfile: IamInstanceProfileSpecification | undefined;
  AssociationId: string | undefined;
}
export interface ReplaceIamInstanceProfileAssociationResult {
  IamInstanceProfileAssociation?: IamInstanceProfileAssociation | undefined;
}
export interface ImageCriterionRequest {
  ImageProviders?: string[] | undefined;
}
export interface ReplaceImageCriteriaInAllowedImagesSettingsRequest {
  ImageCriteria?: ImageCriterionRequest[] | undefined;
  DryRun?: boolean | undefined;
}
export interface ReplaceImageCriteriaInAllowedImagesSettingsResult {
  ReturnValue?: boolean | undefined;
}
export interface ReplaceNetworkAclAssociationRequest {
  DryRun?: boolean | undefined;
  AssociationId: string | undefined;
  NetworkAclId: string | undefined;
}
export interface ReplaceNetworkAclAssociationResult {
  NewAssociationId?: string | undefined;
}
export interface ReplaceNetworkAclEntryRequest {
  DryRun?: boolean | undefined;
  NetworkAclId: string | undefined;
  RuleNumber: number | undefined;
  Protocol: string | undefined;
  RuleAction: RuleAction | undefined;
  Egress: boolean | undefined;
  CidrBlock?: string | undefined;
  Ipv6CidrBlock?: string | undefined;
  IcmpTypeCode?: IcmpTypeCode | undefined;
  PortRange?: PortRange | undefined;
}
export interface ReplaceRouteRequest {
  DestinationPrefixListId?: string | undefined;
  VpcEndpointId?: string | undefined;
  LocalTarget?: boolean | undefined;
  TransitGatewayId?: string | undefined;
  LocalGatewayId?: string | undefined;
  CarrierGatewayId?: string | undefined;
  CoreNetworkArn?: string | undefined;
  DryRun?: boolean | undefined;
  RouteTableId: string | undefined;
  DestinationCidrBlock?: string | undefined;
  GatewayId?: string | undefined;
  DestinationIpv6CidrBlock?: string | undefined;
  EgressOnlyInternetGatewayId?: string | undefined;
  InstanceId?: string | undefined;
  NetworkInterfaceId?: string | undefined;
  VpcPeeringConnectionId?: string | undefined;
  NatGatewayId?: string | undefined;
}
export interface ReplaceRouteTableAssociationRequest {
  DryRun?: boolean | undefined;
  AssociationId: string | undefined;
  RouteTableId: string | undefined;
}
export interface ReplaceRouteTableAssociationResult {
  NewAssociationId?: string | undefined;
  AssociationState?: RouteTableAssociationState | undefined;
}
export interface ReplaceTransitGatewayRouteRequest {
  DestinationCidrBlock: string | undefined;
  TransitGatewayRouteTableId: string | undefined;
  TransitGatewayAttachmentId?: string | undefined;
  Blackhole?: boolean | undefined;
  DryRun?: boolean | undefined;
}
export interface ReplaceTransitGatewayRouteResult {
  Route?: TransitGatewayRoute | undefined;
}
export interface ReplaceVpnTunnelRequest {
  VpnConnectionId: string | undefined;
  VpnTunnelOutsideIpAddress: string | undefined;
  ApplyPendingMaintenance?: boolean | undefined;
  DryRun?: boolean | undefined;
}
export interface ReplaceVpnTunnelResult {
  Return?: boolean | undefined;
}
export declare const ReportInstanceReasonCodes: {
  readonly instance_stuck_in_state: "instance-stuck-in-state";
  readonly not_accepting_credentials: "not-accepting-credentials";
  readonly other: "other";
  readonly password_not_available: "password-not-available";
  readonly performance_ebs_volume: "performance-ebs-volume";
  readonly performance_instance_store: "performance-instance-store";
  readonly performance_network: "performance-network";
  readonly performance_other: "performance-other";
  readonly unresponsive: "unresponsive";
};
export type ReportInstanceReasonCodes =
  (typeof ReportInstanceReasonCodes)[keyof typeof ReportInstanceReasonCodes];
export declare const ReportStatusType: {
  readonly impaired: "impaired";
  readonly ok: "ok";
};
export type ReportStatusType =
  (typeof ReportStatusType)[keyof typeof ReportStatusType];
export interface ReportInstanceStatusRequest {
  DryRun?: boolean | undefined;
  Instances: string[] | undefined;
  Status: ReportStatusType | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  ReasonCodes: ReportInstanceReasonCodes[] | undefined;
  Description?: string | undefined;
}
export interface RequestSpotFleetRequest {
  DryRun?: boolean | undefined;
  SpotFleetRequestConfig: SpotFleetRequestConfigData | undefined;
}
export interface RequestSpotFleetResponse {
  SpotFleetRequestId?: string | undefined;
}
export interface RequestSpotLaunchSpecification {
  SecurityGroupIds?: string[] | undefined;
  SecurityGroups?: string[] | undefined;
  AddressingType?: string | undefined;
  BlockDeviceMappings?: BlockDeviceMapping[] | undefined;
  EbsOptimized?: boolean | undefined;
  IamInstanceProfile?: IamInstanceProfileSpecification | undefined;
  ImageId?: string | undefined;
  InstanceType?: _InstanceType | undefined;
  KernelId?: string | undefined;
  KeyName?: string | undefined;
  Monitoring?: RunInstancesMonitoringEnabled | undefined;
  NetworkInterfaces?: InstanceNetworkInterfaceSpecification[] | undefined;
  Placement?: SpotPlacement | undefined;
  RamdiskId?: string | undefined;
  SubnetId?: string | undefined;
  UserData?: string | undefined;
}
export interface RequestSpotInstancesRequest {
  LaunchSpecification?: RequestSpotLaunchSpecification | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  InstanceInterruptionBehavior?: InstanceInterruptionBehavior | undefined;
  DryRun?: boolean | undefined;
  SpotPrice?: string | undefined;
  ClientToken?: string | undefined;
  InstanceCount?: number | undefined;
  Type?: SpotInstanceType | undefined;
  ValidFrom?: Date | undefined;
  ValidUntil?: Date | undefined;
  LaunchGroup?: string | undefined;
  AvailabilityZoneGroup?: string | undefined;
  BlockDurationMinutes?: number | undefined;
}
export interface RequestSpotInstancesResult {
  SpotInstanceRequests?: SpotInstanceRequest[] | undefined;
}
export interface ResetAddressAttributeRequest {
  AllocationId: string | undefined;
  Attribute: AddressAttributeName | undefined;
  DryRun?: boolean | undefined;
}
export interface ResetAddressAttributeResult {
  Address?: AddressAttribute | undefined;
}
export interface ResetEbsDefaultKmsKeyIdRequest {
  DryRun?: boolean | undefined;
}
export interface ResetEbsDefaultKmsKeyIdResult {
  KmsKeyId?: string | undefined;
}
export declare const ResetFpgaImageAttributeName: {
  readonly loadPermission: "loadPermission";
};
export type ResetFpgaImageAttributeName =
  (typeof ResetFpgaImageAttributeName)[keyof typeof ResetFpgaImageAttributeName];
export interface ResetFpgaImageAttributeRequest {
  DryRun?: boolean | undefined;
  FpgaImageId: string | undefined;
  Attribute?: ResetFpgaImageAttributeName | undefined;
}
export interface ResetFpgaImageAttributeResult {
  Return?: boolean | undefined;
}
export declare const ResetImageAttributeName: {
  readonly launchPermission: "launchPermission";
};
export type ResetImageAttributeName =
  (typeof ResetImageAttributeName)[keyof typeof ResetImageAttributeName];
export interface ResetImageAttributeRequest {
  Attribute: ResetImageAttributeName | undefined;
  ImageId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface ResetInstanceAttributeRequest {
  DryRun?: boolean | undefined;
  InstanceId: string | undefined;
  Attribute: InstanceAttributeName | undefined;
}
export interface ResetNetworkInterfaceAttributeRequest {
  DryRun?: boolean | undefined;
  NetworkInterfaceId: string | undefined;
  SourceDestCheck?: string | undefined;
}
export interface ResetSnapshotAttributeRequest {
  Attribute: SnapshotAttributeName | undefined;
  SnapshotId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface RestoreAddressToClassicRequest {
  DryRun?: boolean | undefined;
  PublicIp: string | undefined;
}
export interface RestoreAddressToClassicResult {
  PublicIp?: string | undefined;
  Status?: Status | undefined;
}
export interface RestoreImageFromRecycleBinRequest {
  ImageId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface RestoreImageFromRecycleBinResult {
  Return?: boolean | undefined;
}
export interface RestoreManagedPrefixListVersionRequest {
  DryRun?: boolean | undefined;
  PrefixListId: string | undefined;
  PreviousVersion: number | undefined;
  CurrentVersion: number | undefined;
}
export interface RestoreManagedPrefixListVersionResult {
  PrefixList?: ManagedPrefixList | undefined;
}
export interface RestoreSnapshotFromRecycleBinRequest {
  SnapshotId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface RestoreSnapshotFromRecycleBinResult {
  SnapshotId?: string | undefined;
  OutpostArn?: string | undefined;
  Description?: string | undefined;
  Encrypted?: boolean | undefined;
  OwnerId?: string | undefined;
  Progress?: string | undefined;
  StartTime?: Date | undefined;
  State?: SnapshotState | undefined;
  VolumeId?: string | undefined;
  VolumeSize?: number | undefined;
  SseType?: SSEType | undefined;
}
export interface RestoreSnapshotTierRequest {
  SnapshotId: string | undefined;
  TemporaryRestoreDays?: number | undefined;
  PermanentRestore?: boolean | undefined;
  DryRun?: boolean | undefined;
}
export interface RestoreSnapshotTierResult {
  SnapshotId?: string | undefined;
  RestoreStartTime?: Date | undefined;
  RestoreDuration?: number | undefined;
  IsPermanentRestore?: boolean | undefined;
}
export interface RevokeClientVpnIngressRequest {
  ClientVpnEndpointId: string | undefined;
  TargetNetworkCidr: string | undefined;
  AccessGroupId?: string | undefined;
  RevokeAllGroups?: boolean | undefined;
  DryRun?: boolean | undefined;
}
export interface RevokeClientVpnIngressResult {
  Status?: ClientVpnAuthorizationRuleStatus | undefined;
}
export interface RevokeSecurityGroupEgressRequest {
  SecurityGroupRuleIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  GroupId: string | undefined;
  SourceSecurityGroupName?: string | undefined;
  SourceSecurityGroupOwnerId?: string | undefined;
  IpProtocol?: string | undefined;
  FromPort?: number | undefined;
  ToPort?: number | undefined;
  CidrIp?: string | undefined;
  IpPermissions?: IpPermission[] | undefined;
}
export interface RevokedSecurityGroupRule {
  SecurityGroupRuleId?: string | undefined;
  GroupId?: string | undefined;
  IsEgress?: boolean | undefined;
  IpProtocol?: string | undefined;
  FromPort?: number | undefined;
  ToPort?: number | undefined;
  CidrIpv4?: string | undefined;
  CidrIpv6?: string | undefined;
  PrefixListId?: string | undefined;
  ReferencedGroupId?: string | undefined;
  Description?: string | undefined;
}
export interface RevokeSecurityGroupEgressResult {
  Return?: boolean | undefined;
  UnknownIpPermissions?: IpPermission[] | undefined;
  RevokedSecurityGroupRules?: RevokedSecurityGroupRule[] | undefined;
}
export interface RevokeSecurityGroupIngressRequest {
  CidrIp?: string | undefined;
  FromPort?: number | undefined;
  GroupId?: string | undefined;
  GroupName?: string | undefined;
  IpPermissions?: IpPermission[] | undefined;
  IpProtocol?: string | undefined;
  SourceSecurityGroupName?: string | undefined;
  SourceSecurityGroupOwnerId?: string | undefined;
  ToPort?: number | undefined;
  SecurityGroupRuleIds?: string[] | undefined;
  DryRun?: boolean | undefined;
}
export interface RevokeSecurityGroupIngressResult {
  Return?: boolean | undefined;
  UnknownIpPermissions?: IpPermission[] | undefined;
  RevokedSecurityGroupRules?: RevokedSecurityGroupRule[] | undefined;
}
export interface CpuOptionsRequest {
  CoreCount?: number | undefined;
  ThreadsPerCore?: number | undefined;
  AmdSevSnp?: AmdSevSnpSpecification | undefined;
}
export interface ElasticInferenceAccelerator {
  Type: string | undefined;
  Count?: number | undefined;
}
export interface EnclaveOptionsRequest {
  Enabled?: boolean | undefined;
}
export interface HibernationOptionsRequest {
  Configured?: boolean | undefined;
}
export interface SpotMarketOptions {
  MaxPrice?: string | undefined;
  SpotInstanceType?: SpotInstanceType | undefined;
  BlockDurationMinutes?: number | undefined;
  ValidUntil?: Date | undefined;
  InstanceInterruptionBehavior?: InstanceInterruptionBehavior | undefined;
}
export interface InstanceMarketOptionsRequest {
  MarketType?: MarketType | undefined;
  SpotOptions?: SpotMarketOptions | undefined;
}
export interface LaunchTemplateSpecification {
  LaunchTemplateId?: string | undefined;
  LaunchTemplateName?: string | undefined;
  Version?: string | undefined;
}
export interface LicenseConfigurationRequest {
  LicenseConfigurationArn?: string | undefined;
}
export interface InstanceMaintenanceOptionsRequest {
  AutoRecovery?: InstanceAutoRecoveryState | undefined;
}
export interface InstanceMetadataOptionsRequest {
  HttpTokens?: HttpTokensState | undefined;
  HttpPutResponseHopLimit?: number | undefined;
  HttpEndpoint?: InstanceMetadataEndpointState | undefined;
  HttpProtocolIpv6?: InstanceMetadataProtocolState | undefined;
  InstanceMetadataTags?: InstanceMetadataTagsState | undefined;
}
export interface InstanceNetworkPerformanceOptionsRequest {
  BandwidthWeighting?: InstanceBandwidthWeighting | undefined;
}
export interface PrivateDnsNameOptionsRequest {
  HostnameType?: HostnameType | undefined;
  EnableResourceNameDnsARecord?: boolean | undefined;
  EnableResourceNameDnsAAAARecord?: boolean | undefined;
}
export interface RunInstancesRequest {
  BlockDeviceMappings?: BlockDeviceMapping[] | undefined;
  ImageId?: string | undefined;
  InstanceType?: _InstanceType | undefined;
  Ipv6AddressCount?: number | undefined;
  Ipv6Addresses?: InstanceIpv6Address[] | undefined;
  KernelId?: string | undefined;
  KeyName?: string | undefined;
  MaxCount: number | undefined;
  MinCount: number | undefined;
  Monitoring?: RunInstancesMonitoringEnabled | undefined;
  Placement?: Placement | undefined;
  RamdiskId?: string | undefined;
  SecurityGroupIds?: string[] | undefined;
  SecurityGroups?: string[] | undefined;
  SubnetId?: string | undefined;
  UserData?: string | undefined;
  ElasticGpuSpecification?: ElasticGpuSpecification[] | undefined;
  ElasticInferenceAccelerators?: ElasticInferenceAccelerator[] | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  LaunchTemplate?: LaunchTemplateSpecification | undefined;
  InstanceMarketOptions?: InstanceMarketOptionsRequest | undefined;
  CreditSpecification?: CreditSpecificationRequest | undefined;
  CpuOptions?: CpuOptionsRequest | undefined;
  CapacityReservationSpecification?:
    | CapacityReservationSpecification
    | undefined;
  HibernationOptions?: HibernationOptionsRequest | undefined;
  LicenseSpecifications?: LicenseConfigurationRequest[] | undefined;
  MetadataOptions?: InstanceMetadataOptionsRequest | undefined;
  EnclaveOptions?: EnclaveOptionsRequest | undefined;
  PrivateDnsNameOptions?: PrivateDnsNameOptionsRequest | undefined;
  MaintenanceOptions?: InstanceMaintenanceOptionsRequest | undefined;
  DisableApiStop?: boolean | undefined;
  EnablePrimaryIpv6?: boolean | undefined;
  NetworkPerformanceOptions?:
    | InstanceNetworkPerformanceOptionsRequest
    | undefined;
  Operator?: OperatorRequest | undefined;
  DryRun?: boolean | undefined;
  DisableApiTermination?: boolean | undefined;
  InstanceInitiatedShutdownBehavior?: ShutdownBehavior | undefined;
  PrivateIpAddress?: string | undefined;
  ClientToken?: string | undefined;
  AdditionalInfo?: string | undefined;
  NetworkInterfaces?: InstanceNetworkInterfaceSpecification[] | undefined;
  IamInstanceProfile?: IamInstanceProfileSpecification | undefined;
  EbsOptimized?: boolean | undefined;
}
export interface ScheduledInstancesEbs {
  DeleteOnTermination?: boolean | undefined;
  Encrypted?: boolean | undefined;
  Iops?: number | undefined;
  SnapshotId?: string | undefined;
  VolumeSize?: number | undefined;
  VolumeType?: string | undefined;
}
export interface ScheduledInstancesBlockDeviceMapping {
  DeviceName?: string | undefined;
  Ebs?: ScheduledInstancesEbs | undefined;
  NoDevice?: string | undefined;
  VirtualName?: string | undefined;
}
export interface ScheduledInstancesIamInstanceProfile {
  Arn?: string | undefined;
  Name?: string | undefined;
}
export interface ScheduledInstancesMonitoring {
  Enabled?: boolean | undefined;
}
export interface ScheduledInstancesIpv6Address {
  Ipv6Address?: string | undefined;
}
export interface ScheduledInstancesPrivateIpAddressConfig {
  Primary?: boolean | undefined;
  PrivateIpAddress?: string | undefined;
}
export interface ScheduledInstancesNetworkInterface {
  AssociatePublicIpAddress?: boolean | undefined;
  DeleteOnTermination?: boolean | undefined;
  Description?: string | undefined;
  DeviceIndex?: number | undefined;
  Groups?: string[] | undefined;
  Ipv6AddressCount?: number | undefined;
  Ipv6Addresses?: ScheduledInstancesIpv6Address[] | undefined;
  NetworkInterfaceId?: string | undefined;
  PrivateIpAddress?: string | undefined;
  PrivateIpAddressConfigs?:
    | ScheduledInstancesPrivateIpAddressConfig[]
    | undefined;
  SecondaryPrivateIpAddressCount?: number | undefined;
  SubnetId?: string | undefined;
}
export interface ScheduledInstancesPlacement {
  AvailabilityZone?: string | undefined;
  GroupName?: string | undefined;
}
export interface ScheduledInstancesLaunchSpecification {
  BlockDeviceMappings?: ScheduledInstancesBlockDeviceMapping[] | undefined;
  EbsOptimized?: boolean | undefined;
  IamInstanceProfile?: ScheduledInstancesIamInstanceProfile | undefined;
  ImageId: string | undefined;
  InstanceType?: string | undefined;
  KernelId?: string | undefined;
  KeyName?: string | undefined;
  Monitoring?: ScheduledInstancesMonitoring | undefined;
  NetworkInterfaces?: ScheduledInstancesNetworkInterface[] | undefined;
  Placement?: ScheduledInstancesPlacement | undefined;
  RamdiskId?: string | undefined;
  SecurityGroupIds?: string[] | undefined;
  SubnetId?: string | undefined;
  UserData?: string | undefined;
}
export interface RunScheduledInstancesRequest {
  ClientToken?: string | undefined;
  DryRun?: boolean | undefined;
  InstanceCount?: number | undefined;
  LaunchSpecification: ScheduledInstancesLaunchSpecification | undefined;
  ScheduledInstanceId: string | undefined;
}
export interface RunScheduledInstancesResult {
  InstanceIdSet?: string[] | undefined;
}
export interface SearchLocalGatewayRoutesRequest {
  LocalGatewayRouteTableId: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface SearchLocalGatewayRoutesResult {
  Routes?: LocalGatewayRoute[] | undefined;
  NextToken?: string | undefined;
}
export interface SearchTransitGatewayMulticastGroupsRequest {
  TransitGatewayMulticastDomainId: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export declare const MembershipType: {
  readonly igmp: "igmp";
  readonly static: "static";
};
export type MembershipType =
  (typeof MembershipType)[keyof typeof MembershipType];
export interface TransitGatewayMulticastGroup {
  GroupIpAddress?: string | undefined;
  TransitGatewayAttachmentId?: string | undefined;
  SubnetId?: string | undefined;
  ResourceId?: string | undefined;
  ResourceType?: TransitGatewayAttachmentResourceType | undefined;
  ResourceOwnerId?: string | undefined;
  NetworkInterfaceId?: string | undefined;
  GroupMember?: boolean | undefined;
  GroupSource?: boolean | undefined;
  MemberType?: MembershipType | undefined;
  SourceType?: MembershipType | undefined;
}
export interface SearchTransitGatewayMulticastGroupsResult {
  MulticastGroups?: TransitGatewayMulticastGroup[] | undefined;
  NextToken?: string | undefined;
}
export interface SearchTransitGatewayRoutesRequest {
  TransitGatewayRouteTableId: string | undefined;
  Filters: Filter[] | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface SearchTransitGatewayRoutesResult {
  Routes?: TransitGatewayRoute[] | undefined;
  AdditionalRoutesAvailable?: boolean | undefined;
}
export interface SendDiagnosticInterruptRequest {
  InstanceId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface StartDeclarativePoliciesReportRequest {
  DryRun?: boolean | undefined;
  S3Bucket: string | undefined;
  S3Prefix?: string | undefined;
  TargetId: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
}
export interface StartDeclarativePoliciesReportResult {
  ReportId?: string | undefined;
}
export interface StartInstancesRequest {
  InstanceIds: string[] | undefined;
  AdditionalInfo?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface InstanceStateChange {
  InstanceId?: string | undefined;
  CurrentState?: InstanceState | undefined;
  PreviousState?: InstanceState | undefined;
}
export interface StartInstancesResult {
  StartingInstances?: InstanceStateChange[] | undefined;
}
export interface StartNetworkInsightsAccessScopeAnalysisRequest {
  NetworkInsightsAccessScopeId: string | undefined;
  DryRun?: boolean | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  ClientToken?: string | undefined;
}
export interface StartNetworkInsightsAccessScopeAnalysisResult {
  NetworkInsightsAccessScopeAnalysis?:
    | NetworkInsightsAccessScopeAnalysis
    | undefined;
}
export interface StartNetworkInsightsAnalysisRequest {
  NetworkInsightsPathId: string | undefined;
  AdditionalAccounts?: string[] | undefined;
  FilterInArns?: string[] | undefined;
  FilterOutArns?: string[] | undefined;
  DryRun?: boolean | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  ClientToken?: string | undefined;
}
export interface StartNetworkInsightsAnalysisResult {
  NetworkInsightsAnalysis?: NetworkInsightsAnalysis | undefined;
}
export interface StartVpcEndpointServicePrivateDnsVerificationRequest {
  DryRun?: boolean | undefined;
  ServiceId: string | undefined;
}
export interface StartVpcEndpointServicePrivateDnsVerificationResult {
  ReturnValue?: boolean | undefined;
}
export interface StopInstancesRequest {
  InstanceIds: string[] | undefined;
  Hibernate?: boolean | undefined;
  DryRun?: boolean | undefined;
  Force?: boolean | undefined;
}
export interface StopInstancesResult {
  StoppingInstances?: InstanceStateChange[] | undefined;
}
export interface TerminateClientVpnConnectionsRequest {
  ClientVpnEndpointId: string | undefined;
  ConnectionId?: string | undefined;
  Username?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface TerminateConnectionStatus {
  ConnectionId?: string | undefined;
  PreviousStatus?: ClientVpnConnectionStatus | undefined;
  CurrentStatus?: ClientVpnConnectionStatus | undefined;
}
export interface TerminateClientVpnConnectionsResult {
  ClientVpnEndpointId?: string | undefined;
  Username?: string | undefined;
  ConnectionStatuses?: TerminateConnectionStatus[] | undefined;
}
export interface TerminateInstancesRequest {
  InstanceIds: string[] | undefined;
  DryRun?: boolean | undefined;
}
export interface TerminateInstancesResult {
  TerminatingInstances?: InstanceStateChange[] | undefined;
}
export interface UnassignIpv6AddressesRequest {
  Ipv6Prefixes?: string[] | undefined;
  NetworkInterfaceId: string | undefined;
  Ipv6Addresses?: string[] | undefined;
}
export interface UnassignIpv6AddressesResult {
  NetworkInterfaceId?: string | undefined;
  UnassignedIpv6Addresses?: string[] | undefined;
  UnassignedIpv6Prefixes?: string[] | undefined;
}
export interface UnassignPrivateIpAddressesRequest {
  Ipv4Prefixes?: string[] | undefined;
  NetworkInterfaceId: string | undefined;
  PrivateIpAddresses?: string[] | undefined;
}
export interface UnassignPrivateNatGatewayAddressRequest {
  NatGatewayId: string | undefined;
  PrivateIpAddresses: string[] | undefined;
  MaxDrainDurationSeconds?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface UnassignPrivateNatGatewayAddressResult {
  NatGatewayId?: string | undefined;
  NatGatewayAddresses?: NatGatewayAddress[] | undefined;
}
export interface UnlockSnapshotRequest {
  SnapshotId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface UnlockSnapshotResult {
  SnapshotId?: string | undefined;
}
export interface UnmonitorInstancesRequest {
  InstanceIds: string[] | undefined;
  DryRun?: boolean | undefined;
}
export interface UnmonitorInstancesResult {
  InstanceMonitorings?: InstanceMonitoring[] | undefined;
}
export interface SecurityGroupRuleDescription {
  SecurityGroupRuleId?: string | undefined;
  Description?: string | undefined;
}
export interface UpdateSecurityGroupRuleDescriptionsEgressRequest {
  DryRun?: boolean | undefined;
  GroupId?: string | undefined;
  GroupName?: string | undefined;
  IpPermissions?: IpPermission[] | undefined;
  SecurityGroupRuleDescriptions?: SecurityGroupRuleDescription[] | undefined;
}
export interface UpdateSecurityGroupRuleDescriptionsEgressResult {
  Return?: boolean | undefined;
}
export interface UpdateSecurityGroupRuleDescriptionsIngressRequest {
  DryRun?: boolean | undefined;
  GroupId?: string | undefined;
  GroupName?: string | undefined;
  IpPermissions?: IpPermission[] | undefined;
  SecurityGroupRuleDescriptions?: SecurityGroupRuleDescription[] | undefined;
}
export interface UpdateSecurityGroupRuleDescriptionsIngressResult {
  Return?: boolean | undefined;
}
export interface WithdrawByoipCidrRequest {
  Cidr: string | undefined;
  DryRun?: boolean | undefined;
}
export interface WithdrawByoipCidrResult {
  ByoipCidr?: ByoipCidr | undefined;
}
export declare const ReportInstanceStatusRequestFilterSensitiveLog: (
  obj: ReportInstanceStatusRequest
) => any;
export declare const RequestSpotFleetRequestFilterSensitiveLog: (
  obj: RequestSpotFleetRequest
) => any;
export declare const RequestSpotLaunchSpecificationFilterSensitiveLog: (
  obj: RequestSpotLaunchSpecification
) => any;
export declare const RequestSpotInstancesRequestFilterSensitiveLog: (
  obj: RequestSpotInstancesRequest
) => any;
export declare const RequestSpotInstancesResultFilterSensitiveLog: (
  obj: RequestSpotInstancesResult
) => any;
export declare const RunInstancesRequestFilterSensitiveLog: (
  obj: RunInstancesRequest
) => any;
export declare const ScheduledInstancesLaunchSpecificationFilterSensitiveLog: (
  obj: ScheduledInstancesLaunchSpecification
) => any;
export declare const RunScheduledInstancesRequestFilterSensitiveLog: (
  obj: RunScheduledInstancesRequest
) => any;
