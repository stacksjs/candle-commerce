import {
  ActiveInstance,
  ActivityStatus,
  AllocationStrategy,
  AllowedPrincipal,
  AlternatePathHint,
  BatchState,
  CurrencyCodeValues,
  Explanation,
  IamInstanceProfileSpecification,
  IpPermission,
  PathComponent,
  ReservedInstancesListing,
  ResourceType,
  SecurityGroupRule,
  SecurityGroupVpcAssociationState,
  Tag,
  TagSpecification,
  TransitGatewayAssociationState,
  TransitGatewayAttachmentResourceType,
  TransitGatewayAttachmentState,
  TransitGatewayPeeringAttachment,
  TransitGatewayVpcAttachment,
  TrunkInterfaceAssociation,
  UserIdGroupPair,
  VerifiedAccessInstance,
  VerifiedAccessTrustProvider,
  VpcPeeringConnection,
} from "./models_0";
import {
  _InstanceType,
  AttributeValue,
  BlockDeviceMapping,
  ConnectionTrackingSpecificationRequest,
  EnaSrdSpecificationRequest,
  FleetLaunchTemplateSpecification,
  FleetType,
  InstanceInterruptionBehavior,
  InstanceRequirements,
  Ipv4PrefixSpecificationRequest,
  Ipv6PrefixSpecificationRequest,
  KeyType,
  LaunchTemplate,
  MacModificationTask,
  PrivateIpAddressSpecification,
  SpotInstanceType,
  Subnet,
  TargetCapacityUnitType,
  Tenancy,
  VolumeType,
} from "./models_1";
import {
  DnsEntry,
  GroupIdentifier,
  InstanceIpv6Address,
  IpAddressType,
  LaunchTemplateVersion,
  LocalGatewayRouteTable,
  LocalGatewayRouteTableVirtualInterfaceGroupAssociation,
  LocalGatewayRouteTableVpcAssociation,
  LocalGatewayVirtualInterface,
  LocalGatewayVirtualInterfaceGroup,
  ManagedPrefixList,
  NatGateway,
  NetworkAcl,
  NetworkInsightsAccessScope,
  NetworkInsightsPath,
  NetworkInterface,
  NetworkInterfaceAttachment,
  NetworkInterfacePermission,
  PlacementGroup,
  ReplaceRootVolumeTask,
  RouteServer,
  RouteServerEndpoint,
  RouteServerPeer,
  RouteTable,
  Snapshot,
  SnapshotState,
  SpotDatafeedSubscription,
  SpotInstanceStateFault,
  State,
  StorageTier,
  TrafficMirrorFilter,
  TrafficMirrorFilterRule,
  TrafficMirrorSession,
  TrafficMirrorTarget,
  TransitGateway,
  TransitGatewayConnect,
  TransitGatewayConnectPeer,
  TransitGatewayMulticastDomain,
  TransitGatewayPolicyTable,
  TransitGatewayRouteTable,
  TransitGatewayRouteTableAnnouncement,
  VerifiedAccessEndpoint,
  VerifiedAccessGroup,
  Volume,
  VpcBlockPublicAccessExclusion,
  VpcEndpoint,
} from "./models_2";
import {
  ConnectionNotification,
  DnsNameState,
  Filter,
  IdFormat,
  PayerResponsibility,
  ServiceConfiguration,
  ServiceConnectivityType,
  ServiceTypeDetail,
} from "./models_3";
import {
  AttributeBooleanValue,
  EventInformation,
  PermissionGroup,
  ProductCode,
} from "./models_4";
export interface DescribeKeyPairsRequest {
  KeyNames?: string[] | undefined;
  KeyPairIds?: string[] | undefined;
  IncludePublicKey?: boolean | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
}
export interface KeyPairInfo {
  KeyPairId?: string | undefined;
  KeyType?: KeyType | undefined;
  Tags?: Tag[] | undefined;
  PublicKey?: string | undefined;
  CreateTime?: Date | undefined;
  KeyName?: string | undefined;
  KeyFingerprint?: string | undefined;
}
export interface DescribeKeyPairsResult {
  KeyPairs?: KeyPairInfo[] | undefined;
}
export interface DescribeLaunchTemplatesRequest {
  DryRun?: boolean | undefined;
  LaunchTemplateIds?: string[] | undefined;
  LaunchTemplateNames?: string[] | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DescribeLaunchTemplatesResult {
  LaunchTemplates?: LaunchTemplate[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLaunchTemplateVersionsRequest {
  DryRun?: boolean | undefined;
  LaunchTemplateId?: string | undefined;
  LaunchTemplateName?: string | undefined;
  Versions?: string[] | undefined;
  MinVersion?: string | undefined;
  MaxVersion?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: Filter[] | undefined;
  ResolveAlias?: boolean | undefined;
}
export interface DescribeLaunchTemplateVersionsResult {
  LaunchTemplateVersions?: LaunchTemplateVersion[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLocalGatewayRouteTablesRequest {
  LocalGatewayRouteTableIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeLocalGatewayRouteTablesResult {
  LocalGatewayRouteTables?: LocalGatewayRouteTable[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLocalGatewayRouteTableVirtualInterfaceGroupAssociationsRequest {
  LocalGatewayRouteTableVirtualInterfaceGroupAssociationIds?:
    | string[]
    | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeLocalGatewayRouteTableVirtualInterfaceGroupAssociationsResult {
  LocalGatewayRouteTableVirtualInterfaceGroupAssociations?:
    | LocalGatewayRouteTableVirtualInterfaceGroupAssociation[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLocalGatewayRouteTableVpcAssociationsRequest {
  LocalGatewayRouteTableVpcAssociationIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeLocalGatewayRouteTableVpcAssociationsResult {
  LocalGatewayRouteTableVpcAssociations?:
    | LocalGatewayRouteTableVpcAssociation[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLocalGatewaysRequest {
  LocalGatewayIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface LocalGateway {
  LocalGatewayId?: string | undefined;
  OutpostArn?: string | undefined;
  OwnerId?: string | undefined;
  State?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeLocalGatewaysResult {
  LocalGateways?: LocalGateway[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLocalGatewayVirtualInterfaceGroupsRequest {
  LocalGatewayVirtualInterfaceGroupIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeLocalGatewayVirtualInterfaceGroupsResult {
  LocalGatewayVirtualInterfaceGroups?:
    | LocalGatewayVirtualInterfaceGroup[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLocalGatewayVirtualInterfacesRequest {
  LocalGatewayVirtualInterfaceIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeLocalGatewayVirtualInterfacesResult {
  LocalGatewayVirtualInterfaces?: LocalGatewayVirtualInterface[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLockedSnapshotsRequest {
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  SnapshotIds?: string[] | undefined;
  DryRun?: boolean | undefined;
}
export declare const LockState: {
  readonly compliance: "compliance";
  readonly compliance_cooloff: "compliance-cooloff";
  readonly expired: "expired";
  readonly governance: "governance";
};
export type LockState = (typeof LockState)[keyof typeof LockState];
export interface LockedSnapshotsInfo {
  OwnerId?: string | undefined;
  SnapshotId?: string | undefined;
  LockState?: LockState | undefined;
  LockDuration?: number | undefined;
  CoolOffPeriod?: number | undefined;
  CoolOffPeriodExpiresOn?: Date | undefined;
  LockCreatedOn?: Date | undefined;
  LockDurationStartTime?: Date | undefined;
  LockExpiresOn?: Date | undefined;
}
export interface DescribeLockedSnapshotsResult {
  Snapshots?: LockedSnapshotsInfo[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeMacHostsRequest {
  Filters?: Filter[] | undefined;
  HostIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface MacHost {
  HostId?: string | undefined;
  MacOSLatestSupportedVersions?: string[] | undefined;
}
export interface DescribeMacHostsResult {
  MacHosts?: MacHost[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeMacModificationTasksRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MacModificationTaskIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeMacModificationTasksResult {
  MacModificationTasks?: MacModificationTask[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeManagedPrefixListsRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  PrefixListIds?: string[] | undefined;
}
export interface DescribeManagedPrefixListsResult {
  NextToken?: string | undefined;
  PrefixLists?: ManagedPrefixList[] | undefined;
}
export interface DescribeMovingAddressesRequest {
  DryRun?: boolean | undefined;
  PublicIps?: string[] | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
}
export declare const MoveStatus: {
  readonly movingToVpc: "movingToVpc";
  readonly restoringToClassic: "restoringToClassic";
};
export type MoveStatus = (typeof MoveStatus)[keyof typeof MoveStatus];
export interface MovingAddressStatus {
  MoveStatus?: MoveStatus | undefined;
  PublicIp?: string | undefined;
}
export interface DescribeMovingAddressesResult {
  MovingAddressStatuses?: MovingAddressStatus[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNatGatewaysRequest {
  DryRun?: boolean | undefined;
  Filter?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NatGatewayIds?: string[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNatGatewaysResult {
  NatGateways?: NatGateway[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkAclsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  NetworkAclIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeNetworkAclsResult {
  NetworkAcls?: NetworkAcl[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkInsightsAccessScopeAnalysesRequest {
  NetworkInsightsAccessScopeAnalysisIds?: string[] | undefined;
  NetworkInsightsAccessScopeId?: string | undefined;
  AnalysisStartTimeBegin?: Date | undefined;
  AnalysisStartTimeEnd?: Date | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  NextToken?: string | undefined;
}
export declare const FindingsFound: {
  readonly false: "false";
  readonly true: "true";
  readonly unknown: "unknown";
};
export type FindingsFound = (typeof FindingsFound)[keyof typeof FindingsFound];
export declare const AnalysisStatus: {
  readonly failed: "failed";
  readonly running: "running";
  readonly succeeded: "succeeded";
};
export type AnalysisStatus =
  (typeof AnalysisStatus)[keyof typeof AnalysisStatus];
export interface NetworkInsightsAccessScopeAnalysis {
  NetworkInsightsAccessScopeAnalysisId?: string | undefined;
  NetworkInsightsAccessScopeAnalysisArn?: string | undefined;
  NetworkInsightsAccessScopeId?: string | undefined;
  Status?: AnalysisStatus | undefined;
  StatusMessage?: string | undefined;
  WarningMessage?: string | undefined;
  StartDate?: Date | undefined;
  EndDate?: Date | undefined;
  FindingsFound?: FindingsFound | undefined;
  AnalyzedEniCount?: number | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeNetworkInsightsAccessScopeAnalysesResult {
  NetworkInsightsAccessScopeAnalyses?:
    | NetworkInsightsAccessScopeAnalysis[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkInsightsAccessScopesRequest {
  NetworkInsightsAccessScopeIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkInsightsAccessScopesResult {
  NetworkInsightsAccessScopes?: NetworkInsightsAccessScope[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkInsightsAnalysesRequest {
  NetworkInsightsAnalysisIds?: string[] | undefined;
  NetworkInsightsPathId?: string | undefined;
  AnalysisStartTime?: Date | undefined;
  AnalysisEndTime?: Date | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  NextToken?: string | undefined;
}
export interface NetworkInsightsAnalysis {
  NetworkInsightsAnalysisId?: string | undefined;
  NetworkInsightsAnalysisArn?: string | undefined;
  NetworkInsightsPathId?: string | undefined;
  AdditionalAccounts?: string[] | undefined;
  FilterInArns?: string[] | undefined;
  FilterOutArns?: string[] | undefined;
  StartDate?: Date | undefined;
  Status?: AnalysisStatus | undefined;
  StatusMessage?: string | undefined;
  WarningMessage?: string | undefined;
  NetworkPathFound?: boolean | undefined;
  ForwardPathComponents?: PathComponent[] | undefined;
  ReturnPathComponents?: PathComponent[] | undefined;
  Explanations?: Explanation[] | undefined;
  AlternatePathHints?: AlternatePathHint[] | undefined;
  SuggestedAccounts?: string[] | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeNetworkInsightsAnalysesResult {
  NetworkInsightsAnalyses?: NetworkInsightsAnalysis[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkInsightsPathsRequest {
  NetworkInsightsPathIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkInsightsPathsResult {
  NetworkInsightsPaths?: NetworkInsightsPath[] | undefined;
  NextToken?: string | undefined;
}
export declare const NetworkInterfaceAttribute: {
  readonly associatePublicIpAddress: "associatePublicIpAddress";
  readonly attachment: "attachment";
  readonly description: "description";
  readonly groupSet: "groupSet";
  readonly sourceDestCheck: "sourceDestCheck";
};
export type NetworkInterfaceAttribute =
  (typeof NetworkInterfaceAttribute)[keyof typeof NetworkInterfaceAttribute];
export interface DescribeNetworkInterfaceAttributeRequest {
  DryRun?: boolean | undefined;
  NetworkInterfaceId: string | undefined;
  Attribute?: NetworkInterfaceAttribute | undefined;
}
export interface DescribeNetworkInterfaceAttributeResult {
  Attachment?: NetworkInterfaceAttachment | undefined;
  Description?: AttributeValue | undefined;
  Groups?: GroupIdentifier[] | undefined;
  NetworkInterfaceId?: string | undefined;
  SourceDestCheck?: AttributeBooleanValue | undefined;
  AssociatePublicIpAddress?: boolean | undefined;
}
export interface DescribeNetworkInterfacePermissionsRequest {
  NetworkInterfacePermissionIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DescribeNetworkInterfacePermissionsResult {
  NetworkInterfacePermissions?: NetworkInterfacePermission[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkInterfacesRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  NetworkInterfaceIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeNetworkInterfacesResult {
  NetworkInterfaces?: NetworkInterface[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeOutpostLagsRequest {
  OutpostLagIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface OutpostLag {
  OutpostArn?: string | undefined;
  OwnerId?: string | undefined;
  State?: string | undefined;
  OutpostLagId?: string | undefined;
  LocalGatewayVirtualInterfaceIds?: string[] | undefined;
  ServiceLinkVirtualInterfaceIds?: string[] | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeOutpostLagsResult {
  OutpostLags?: OutpostLag[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribePlacementGroupsRequest {
  GroupIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  GroupNames?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribePlacementGroupsResult {
  PlacementGroups?: PlacementGroup[] | undefined;
}
export interface DescribePrefixListsRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  PrefixListIds?: string[] | undefined;
}
export interface PrefixList {
  Cidrs?: string[] | undefined;
  PrefixListId?: string | undefined;
  PrefixListName?: string | undefined;
}
export interface DescribePrefixListsResult {
  NextToken?: string | undefined;
  PrefixLists?: PrefixList[] | undefined;
}
export interface DescribePrincipalIdFormatRequest {
  DryRun?: boolean | undefined;
  Resources?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface PrincipalIdFormat {
  Arn?: string | undefined;
  Statuses?: IdFormat[] | undefined;
}
export interface DescribePrincipalIdFormatResult {
  Principals?: PrincipalIdFormat[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribePublicIpv4PoolsRequest {
  PoolIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: Filter[] | undefined;
}
export interface PublicIpv4PoolRange {
  FirstAddress?: string | undefined;
  LastAddress?: string | undefined;
  AddressCount?: number | undefined;
  AvailableAddressCount?: number | undefined;
}
export interface PublicIpv4Pool {
  PoolId?: string | undefined;
  Description?: string | undefined;
  PoolAddressRanges?: PublicIpv4PoolRange[] | undefined;
  TotalAddressCount?: number | undefined;
  TotalAvailableAddressCount?: number | undefined;
  NetworkBorderGroup?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribePublicIpv4PoolsResult {
  PublicIpv4Pools?: PublicIpv4Pool[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeRegionsRequest {
  RegionNames?: string[] | undefined;
  AllRegions?: boolean | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
}
export interface Region {
  OptInStatus?: string | undefined;
  RegionName?: string | undefined;
  Endpoint?: string | undefined;
}
export interface DescribeRegionsResult {
  Regions?: Region[] | undefined;
}
export interface DescribeReplaceRootVolumeTasksRequest {
  ReplaceRootVolumeTaskIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeReplaceRootVolumeTasksResult {
  ReplaceRootVolumeTasks?: ReplaceRootVolumeTask[] | undefined;
  NextToken?: string | undefined;
}
export declare const OfferingClassType: {
  readonly CONVERTIBLE: "convertible";
  readonly STANDARD: "standard";
};
export type OfferingClassType =
  (typeof OfferingClassType)[keyof typeof OfferingClassType];
export declare const OfferingTypeValues: {
  readonly All_Upfront: "All Upfront";
  readonly Heavy_Utilization: "Heavy Utilization";
  readonly Light_Utilization: "Light Utilization";
  readonly Medium_Utilization: "Medium Utilization";
  readonly No_Upfront: "No Upfront";
  readonly Partial_Upfront: "Partial Upfront";
};
export type OfferingTypeValues =
  (typeof OfferingTypeValues)[keyof typeof OfferingTypeValues];
export interface DescribeReservedInstancesRequest {
  OfferingClass?: OfferingClassType | undefined;
  ReservedInstancesIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  OfferingType?: OfferingTypeValues | undefined;
}
export declare const RIProductDescription: {
  readonly Linux_UNIX: "Linux/UNIX";
  readonly Linux_UNIX_Amazon_VPC_: "Linux/UNIX (Amazon VPC)";
  readonly Windows: "Windows";
  readonly Windows_Amazon_VPC_: "Windows (Amazon VPC)";
};
export type RIProductDescription =
  (typeof RIProductDescription)[keyof typeof RIProductDescription];
export declare const RecurringChargeFrequency: {
  readonly Hourly: "Hourly";
};
export type RecurringChargeFrequency =
  (typeof RecurringChargeFrequency)[keyof typeof RecurringChargeFrequency];
export interface RecurringCharge {
  Amount?: number | undefined;
  Frequency?: RecurringChargeFrequency | undefined;
}
export declare const Scope: {
  readonly AVAILABILITY_ZONE: "Availability Zone";
  readonly REGIONAL: "Region";
};
export type Scope = (typeof Scope)[keyof typeof Scope];
export declare const ReservedInstanceState: {
  readonly active: "active";
  readonly payment_failed: "payment-failed";
  readonly payment_pending: "payment-pending";
  readonly queued: "queued";
  readonly queued_deleted: "queued-deleted";
  readonly retired: "retired";
};
export type ReservedInstanceState =
  (typeof ReservedInstanceState)[keyof typeof ReservedInstanceState];
export interface ReservedInstances {
  CurrencyCode?: CurrencyCodeValues | undefined;
  InstanceTenancy?: Tenancy | undefined;
  OfferingClass?: OfferingClassType | undefined;
  OfferingType?: OfferingTypeValues | undefined;
  RecurringCharges?: RecurringCharge[] | undefined;
  Scope?: Scope | undefined;
  Tags?: Tag[] | undefined;
  AvailabilityZoneId?: string | undefined;
  ReservedInstancesId?: string | undefined;
  InstanceType?: _InstanceType | undefined;
  AvailabilityZone?: string | undefined;
  Start?: Date | undefined;
  End?: Date | undefined;
  Duration?: number | undefined;
  UsagePrice?: number | undefined;
  FixedPrice?: number | undefined;
  InstanceCount?: number | undefined;
  ProductDescription?: RIProductDescription | undefined;
  State?: ReservedInstanceState | undefined;
}
export interface DescribeReservedInstancesResult {
  ReservedInstances?: ReservedInstances[] | undefined;
}
export interface DescribeReservedInstancesListingsRequest {
  ReservedInstancesId?: string | undefined;
  ReservedInstancesListingId?: string | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeReservedInstancesListingsResult {
  ReservedInstancesListings?: ReservedInstancesListing[] | undefined;
}
export interface DescribeReservedInstancesModificationsRequest {
  ReservedInstancesModificationIds?: string[] | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
}
export interface ReservedInstancesConfiguration {
  AvailabilityZone?: string | undefined;
  InstanceCount?: number | undefined;
  InstanceType?: _InstanceType | undefined;
  Platform?: string | undefined;
  Scope?: Scope | undefined;
  AvailabilityZoneId?: string | undefined;
}
export interface ReservedInstancesModificationResult {
  ReservedInstancesId?: string | undefined;
  TargetConfiguration?: ReservedInstancesConfiguration | undefined;
}
export interface ReservedInstancesId {
  ReservedInstancesId?: string | undefined;
}
export interface ReservedInstancesModification {
  ClientToken?: string | undefined;
  CreateDate?: Date | undefined;
  EffectiveDate?: Date | undefined;
  ModificationResults?: ReservedInstancesModificationResult[] | undefined;
  ReservedInstancesIds?: ReservedInstancesId[] | undefined;
  ReservedInstancesModificationId?: string | undefined;
  Status?: string | undefined;
  StatusMessage?: string | undefined;
  UpdateDate?: Date | undefined;
}
export interface DescribeReservedInstancesModificationsResult {
  NextToken?: string | undefined;
  ReservedInstancesModifications?: ReservedInstancesModification[] | undefined;
}
export interface DescribeReservedInstancesOfferingsRequest {
  AvailabilityZone?: string | undefined;
  IncludeMarketplace?: boolean | undefined;
  InstanceType?: _InstanceType | undefined;
  MaxDuration?: number | undefined;
  MaxInstanceCount?: number | undefined;
  MinDuration?: number | undefined;
  OfferingClass?: OfferingClassType | undefined;
  ProductDescription?: RIProductDescription | undefined;
  ReservedInstancesOfferingIds?: string[] | undefined;
  AvailabilityZoneId?: string | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  InstanceTenancy?: Tenancy | undefined;
  OfferingType?: OfferingTypeValues | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface PricingDetail {
  Count?: number | undefined;
  Price?: number | undefined;
}
export interface ReservedInstancesOffering {
  CurrencyCode?: CurrencyCodeValues | undefined;
  InstanceTenancy?: Tenancy | undefined;
  Marketplace?: boolean | undefined;
  OfferingClass?: OfferingClassType | undefined;
  OfferingType?: OfferingTypeValues | undefined;
  PricingDetails?: PricingDetail[] | undefined;
  RecurringCharges?: RecurringCharge[] | undefined;
  Scope?: Scope | undefined;
  AvailabilityZoneId?: string | undefined;
  ReservedInstancesOfferingId?: string | undefined;
  InstanceType?: _InstanceType | undefined;
  AvailabilityZone?: string | undefined;
  Duration?: number | undefined;
  UsagePrice?: number | undefined;
  FixedPrice?: number | undefined;
  ProductDescription?: RIProductDescription | undefined;
}
export interface DescribeReservedInstancesOfferingsResult {
  NextToken?: string | undefined;
  ReservedInstancesOfferings?: ReservedInstancesOffering[] | undefined;
}
export interface DescribeRouteServerEndpointsRequest {
  RouteServerEndpointIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeRouteServerEndpointsResult {
  RouteServerEndpoints?: RouteServerEndpoint[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeRouteServerPeersRequest {
  RouteServerPeerIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeRouteServerPeersResult {
  RouteServerPeers?: RouteServerPeer[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeRouteServersRequest {
  RouteServerIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeRouteServersResult {
  RouteServers?: RouteServer[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeRouteTablesRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  RouteTableIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeRouteTablesResult {
  RouteTables?: RouteTable[] | undefined;
  NextToken?: string | undefined;
}
export interface SlotDateTimeRangeRequest {
  EarliestTime: Date | undefined;
  LatestTime: Date | undefined;
}
export interface ScheduledInstanceRecurrenceRequest {
  Frequency?: string | undefined;
  Interval?: number | undefined;
  OccurrenceDays?: number[] | undefined;
  OccurrenceRelativeToEnd?: boolean | undefined;
  OccurrenceUnit?: string | undefined;
}
export interface DescribeScheduledInstanceAvailabilityRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  FirstSlotStartTimeRange: SlotDateTimeRangeRequest | undefined;
  MaxResults?: number | undefined;
  MaxSlotDurationInHours?: number | undefined;
  MinSlotDurationInHours?: number | undefined;
  NextToken?: string | undefined;
  Recurrence: ScheduledInstanceRecurrenceRequest | undefined;
}
export interface ScheduledInstanceRecurrence {
  Frequency?: string | undefined;
  Interval?: number | undefined;
  OccurrenceDaySet?: number[] | undefined;
  OccurrenceRelativeToEnd?: boolean | undefined;
  OccurrenceUnit?: string | undefined;
}
export interface ScheduledInstanceAvailability {
  AvailabilityZone?: string | undefined;
  AvailableInstanceCount?: number | undefined;
  FirstSlotStartTime?: Date | undefined;
  HourlyPrice?: string | undefined;
  InstanceType?: string | undefined;
  MaxTermDurationInDays?: number | undefined;
  MinTermDurationInDays?: number | undefined;
  NetworkPlatform?: string | undefined;
  Platform?: string | undefined;
  PurchaseToken?: string | undefined;
  Recurrence?: ScheduledInstanceRecurrence | undefined;
  SlotDurationInHours?: number | undefined;
  TotalScheduledInstanceHours?: number | undefined;
}
export interface DescribeScheduledInstanceAvailabilityResult {
  NextToken?: string | undefined;
  ScheduledInstanceAvailabilitySet?:
    | ScheduledInstanceAvailability[]
    | undefined;
}
export interface SlotStartTimeRangeRequest {
  EarliestTime?: Date | undefined;
  LatestTime?: Date | undefined;
}
export interface DescribeScheduledInstancesRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  ScheduledInstanceIds?: string[] | undefined;
  SlotStartTimeRange?: SlotStartTimeRangeRequest | undefined;
}
export interface ScheduledInstance {
  AvailabilityZone?: string | undefined;
  CreateDate?: Date | undefined;
  HourlyPrice?: string | undefined;
  InstanceCount?: number | undefined;
  InstanceType?: string | undefined;
  NetworkPlatform?: string | undefined;
  NextSlotStartTime?: Date | undefined;
  Platform?: string | undefined;
  PreviousSlotEndTime?: Date | undefined;
  Recurrence?: ScheduledInstanceRecurrence | undefined;
  ScheduledInstanceId?: string | undefined;
  SlotDurationInHours?: number | undefined;
  TermEndDate?: Date | undefined;
  TermStartDate?: Date | undefined;
  TotalScheduledInstanceHours?: number | undefined;
}
export interface DescribeScheduledInstancesResult {
  NextToken?: string | undefined;
  ScheduledInstanceSet?: ScheduledInstance[] | undefined;
}
export interface DescribeSecurityGroupReferencesRequest {
  DryRun?: boolean | undefined;
  GroupId: string[] | undefined;
}
export interface SecurityGroupReference {
  GroupId?: string | undefined;
  ReferencingVpcId?: string | undefined;
  VpcPeeringConnectionId?: string | undefined;
  TransitGatewayId?: string | undefined;
}
export interface DescribeSecurityGroupReferencesResult {
  SecurityGroupReferenceSet?: SecurityGroupReference[] | undefined;
}
export interface DescribeSecurityGroupRulesRequest {
  Filters?: Filter[] | undefined;
  SecurityGroupRuleIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DescribeSecurityGroupRulesResult {
  SecurityGroupRules?: SecurityGroupRule[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeSecurityGroupsRequest {
  GroupIds?: string[] | undefined;
  GroupNames?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
}
export interface SecurityGroup {
  GroupId?: string | undefined;
  IpPermissionsEgress?: IpPermission[] | undefined;
  Tags?: Tag[] | undefined;
  VpcId?: string | undefined;
  SecurityGroupArn?: string | undefined;
  OwnerId?: string | undefined;
  GroupName?: string | undefined;
  Description?: string | undefined;
  IpPermissions?: IpPermission[] | undefined;
}
export interface DescribeSecurityGroupsResult {
  NextToken?: string | undefined;
  SecurityGroups?: SecurityGroup[] | undefined;
}
export interface DescribeSecurityGroupVpcAssociationsRequest {
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface SecurityGroupVpcAssociation {
  GroupId?: string | undefined;
  VpcId?: string | undefined;
  VpcOwnerId?: string | undefined;
  State?: SecurityGroupVpcAssociationState | undefined;
  StateReason?: string | undefined;
}
export interface DescribeSecurityGroupVpcAssociationsResult {
  SecurityGroupVpcAssociations?: SecurityGroupVpcAssociation[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeServiceLinkVirtualInterfacesRequest {
  ServiceLinkVirtualInterfaceIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export declare const ServiceLinkVirtualInterfaceConfigurationState: {
  readonly available: "available";
  readonly deleted: "deleted";
  readonly deleting: "deleting";
  readonly pending: "pending";
};
export type ServiceLinkVirtualInterfaceConfigurationState =
  (typeof ServiceLinkVirtualInterfaceConfigurationState)[keyof typeof ServiceLinkVirtualInterfaceConfigurationState];
export interface ServiceLinkVirtualInterface {
  ServiceLinkVirtualInterfaceId?: string | undefined;
  ServiceLinkVirtualInterfaceArn?: string | undefined;
  OutpostId?: string | undefined;
  OutpostArn?: string | undefined;
  OwnerId?: string | undefined;
  LocalAddress?: string | undefined;
  PeerAddress?: string | undefined;
  PeerBgpAsn?: number | undefined;
  Vlan?: number | undefined;
  OutpostLagId?: string | undefined;
  Tags?: Tag[] | undefined;
  ConfigurationState?:
    | ServiceLinkVirtualInterfaceConfigurationState
    | undefined;
}
export interface DescribeServiceLinkVirtualInterfacesResult {
  ServiceLinkVirtualInterfaces?: ServiceLinkVirtualInterface[] | undefined;
  NextToken?: string | undefined;
}
export declare const SnapshotAttributeName: {
  readonly createVolumePermission: "createVolumePermission";
  readonly productCodes: "productCodes";
};
export type SnapshotAttributeName =
  (typeof SnapshotAttributeName)[keyof typeof SnapshotAttributeName];
export interface DescribeSnapshotAttributeRequest {
  Attribute: SnapshotAttributeName | undefined;
  SnapshotId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface CreateVolumePermission {
  UserId?: string | undefined;
  Group?: PermissionGroup | undefined;
}
export interface DescribeSnapshotAttributeResult {
  ProductCodes?: ProductCode[] | undefined;
  SnapshotId?: string | undefined;
  CreateVolumePermissions?: CreateVolumePermission[] | undefined;
}
export interface DescribeSnapshotsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  OwnerIds?: string[] | undefined;
  RestorableByUserIds?: string[] | undefined;
  SnapshotIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeSnapshotsResult {
  NextToken?: string | undefined;
  Snapshots?: Snapshot[] | undefined;
}
export interface DescribeSnapshotTierStatusRequest {
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export declare const TieringOperationStatus: {
  readonly archival_completed: "archival-completed";
  readonly archival_failed: "archival-failed";
  readonly archival_in_progress: "archival-in-progress";
  readonly permanent_restore_completed: "permanent-restore-completed";
  readonly permanent_restore_failed: "permanent-restore-failed";
  readonly permanent_restore_in_progress: "permanent-restore-in-progress";
  readonly temporary_restore_completed: "temporary-restore-completed";
  readonly temporary_restore_failed: "temporary-restore-failed";
  readonly temporary_restore_in_progress: "temporary-restore-in-progress";
};
export type TieringOperationStatus =
  (typeof TieringOperationStatus)[keyof typeof TieringOperationStatus];
export interface SnapshotTierStatus {
  SnapshotId?: string | undefined;
  VolumeId?: string | undefined;
  Status?: SnapshotState | undefined;
  OwnerId?: string | undefined;
  Tags?: Tag[] | undefined;
  StorageTier?: StorageTier | undefined;
  LastTieringStartTime?: Date | undefined;
  LastTieringProgress?: number | undefined;
  LastTieringOperationStatus?: TieringOperationStatus | undefined;
  LastTieringOperationStatusDetail?: string | undefined;
  ArchivalCompleteTime?: Date | undefined;
  RestoreExpiryTime?: Date | undefined;
}
export interface DescribeSnapshotTierStatusResult {
  SnapshotTierStatuses?: SnapshotTierStatus[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeSpotDatafeedSubscriptionRequest {
  DryRun?: boolean | undefined;
}
export interface DescribeSpotDatafeedSubscriptionResult {
  SpotDatafeedSubscription?: SpotDatafeedSubscription | undefined;
}
export interface DescribeSpotFleetInstancesRequest {
  DryRun?: boolean | undefined;
  SpotFleetRequestId: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DescribeSpotFleetInstancesResponse {
  ActiveInstances?: ActiveInstance[] | undefined;
  NextToken?: string | undefined;
  SpotFleetRequestId?: string | undefined;
}
export declare const EventType: {
  readonly BATCH_CHANGE: "fleetRequestChange";
  readonly ERROR: "error";
  readonly INFORMATION: "information";
  readonly INSTANCE_CHANGE: "instanceChange";
};
export type EventType = (typeof EventType)[keyof typeof EventType];
export interface DescribeSpotFleetRequestHistoryRequest {
  DryRun?: boolean | undefined;
  SpotFleetRequestId: string | undefined;
  EventType?: EventType | undefined;
  StartTime: Date | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface HistoryRecord {
  EventInformation?: EventInformation | undefined;
  EventType?: EventType | undefined;
  Timestamp?: Date | undefined;
}
export interface DescribeSpotFleetRequestHistoryResponse {
  HistoryRecords?: HistoryRecord[] | undefined;
  LastEvaluatedTime?: Date | undefined;
  NextToken?: string | undefined;
  SpotFleetRequestId?: string | undefined;
  StartTime?: Date | undefined;
}
export interface DescribeSpotFleetRequestsRequest {
  DryRun?: boolean | undefined;
  SpotFleetRequestIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export declare const ExcessCapacityTerminationPolicy: {
  readonly DEFAULT: "default";
  readonly NO_TERMINATION: "noTermination";
};
export type ExcessCapacityTerminationPolicy =
  (typeof ExcessCapacityTerminationPolicy)[keyof typeof ExcessCapacityTerminationPolicy];
export interface SpotFleetMonitoring {
  Enabled?: boolean | undefined;
}
export interface InstanceNetworkInterfaceSpecification {
  AssociatePublicIpAddress?: boolean | undefined;
  DeleteOnTermination?: boolean | undefined;
  Description?: string | undefined;
  DeviceIndex?: number | undefined;
  Groups?: string[] | undefined;
  Ipv6AddressCount?: number | undefined;
  Ipv6Addresses?: InstanceIpv6Address[] | undefined;
  NetworkInterfaceId?: string | undefined;
  PrivateIpAddress?: string | undefined;
  PrivateIpAddresses?: PrivateIpAddressSpecification[] | undefined;
  SecondaryPrivateIpAddressCount?: number | undefined;
  SubnetId?: string | undefined;
  AssociateCarrierIpAddress?: boolean | undefined;
  InterfaceType?: string | undefined;
  NetworkCardIndex?: number | undefined;
  Ipv4Prefixes?: Ipv4PrefixSpecificationRequest[] | undefined;
  Ipv4PrefixCount?: number | undefined;
  Ipv6Prefixes?: Ipv6PrefixSpecificationRequest[] | undefined;
  Ipv6PrefixCount?: number | undefined;
  PrimaryIpv6?: boolean | undefined;
  EnaSrdSpecification?: EnaSrdSpecificationRequest | undefined;
  ConnectionTrackingSpecification?:
    | ConnectionTrackingSpecificationRequest
    | undefined;
  EnaQueueCount?: number | undefined;
}
export interface SpotPlacement {
  AvailabilityZone?: string | undefined;
  GroupName?: string | undefined;
  Tenancy?: Tenancy | undefined;
}
export interface SpotFleetTagSpecification {
  ResourceType?: ResourceType | undefined;
  Tags?: Tag[] | undefined;
}
export interface SpotFleetLaunchSpecification {
  AddressingType?: string | undefined;
  BlockDeviceMappings?: BlockDeviceMapping[] | undefined;
  EbsOptimized?: boolean | undefined;
  IamInstanceProfile?: IamInstanceProfileSpecification | undefined;
  ImageId?: string | undefined;
  InstanceType?: _InstanceType | undefined;
  KernelId?: string | undefined;
  KeyName?: string | undefined;
  Monitoring?: SpotFleetMonitoring | undefined;
  NetworkInterfaces?: InstanceNetworkInterfaceSpecification[] | undefined;
  Placement?: SpotPlacement | undefined;
  RamdiskId?: string | undefined;
  SpotPrice?: string | undefined;
  SubnetId?: string | undefined;
  UserData?: string | undefined;
  WeightedCapacity?: number | undefined;
  TagSpecifications?: SpotFleetTagSpecification[] | undefined;
  InstanceRequirements?: InstanceRequirements | undefined;
  SecurityGroups?: GroupIdentifier[] | undefined;
}
export interface LaunchTemplateOverrides {
  InstanceType?: _InstanceType | undefined;
  SpotPrice?: string | undefined;
  SubnetId?: string | undefined;
  AvailabilityZone?: string | undefined;
  WeightedCapacity?: number | undefined;
  Priority?: number | undefined;
  InstanceRequirements?: InstanceRequirements | undefined;
}
export interface LaunchTemplateConfig {
  LaunchTemplateSpecification?: FleetLaunchTemplateSpecification | undefined;
  Overrides?: LaunchTemplateOverrides[] | undefined;
}
export interface ClassicLoadBalancer {
  Name?: string | undefined;
}
export interface ClassicLoadBalancersConfig {
  ClassicLoadBalancers?: ClassicLoadBalancer[] | undefined;
}
export interface TargetGroup {
  Arn?: string | undefined;
}
export interface TargetGroupsConfig {
  TargetGroups?: TargetGroup[] | undefined;
}
export interface LoadBalancersConfig {
  ClassicLoadBalancersConfig?: ClassicLoadBalancersConfig | undefined;
  TargetGroupsConfig?: TargetGroupsConfig | undefined;
}
export declare const OnDemandAllocationStrategy: {
  readonly LOWEST_PRICE: "lowestPrice";
  readonly PRIORITIZED: "prioritized";
};
export type OnDemandAllocationStrategy =
  (typeof OnDemandAllocationStrategy)[keyof typeof OnDemandAllocationStrategy];
export declare const ReplacementStrategy: {
  readonly LAUNCH: "launch";
  readonly LAUNCH_BEFORE_TERMINATE: "launch-before-terminate";
};
export type ReplacementStrategy =
  (typeof ReplacementStrategy)[keyof typeof ReplacementStrategy];
export interface SpotCapacityRebalance {
  ReplacementStrategy?: ReplacementStrategy | undefined;
  TerminationDelay?: number | undefined;
}
export interface SpotMaintenanceStrategies {
  CapacityRebalance?: SpotCapacityRebalance | undefined;
}
export interface SpotFleetRequestConfigData {
  AllocationStrategy?: AllocationStrategy | undefined;
  OnDemandAllocationStrategy?: OnDemandAllocationStrategy | undefined;
  SpotMaintenanceStrategies?: SpotMaintenanceStrategies | undefined;
  ClientToken?: string | undefined;
  ExcessCapacityTerminationPolicy?: ExcessCapacityTerminationPolicy | undefined;
  FulfilledCapacity?: number | undefined;
  OnDemandFulfilledCapacity?: number | undefined;
  IamFleetRole: string | undefined;
  LaunchSpecifications?: SpotFleetLaunchSpecification[] | undefined;
  LaunchTemplateConfigs?: LaunchTemplateConfig[] | undefined;
  SpotPrice?: string | undefined;
  TargetCapacity: number | undefined;
  OnDemandTargetCapacity?: number | undefined;
  OnDemandMaxTotalPrice?: string | undefined;
  SpotMaxTotalPrice?: string | undefined;
  TerminateInstancesWithExpiration?: boolean | undefined;
  Type?: FleetType | undefined;
  ValidFrom?: Date | undefined;
  ValidUntil?: Date | undefined;
  ReplaceUnhealthyInstances?: boolean | undefined;
  InstanceInterruptionBehavior?: InstanceInterruptionBehavior | undefined;
  LoadBalancersConfig?: LoadBalancersConfig | undefined;
  InstancePoolsToUseCount?: number | undefined;
  Context?: string | undefined;
  TargetCapacityUnitType?: TargetCapacityUnitType | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
}
export interface SpotFleetRequestConfig {
  ActivityStatus?: ActivityStatus | undefined;
  CreateTime?: Date | undefined;
  SpotFleetRequestConfig?: SpotFleetRequestConfigData | undefined;
  SpotFleetRequestId?: string | undefined;
  SpotFleetRequestState?: BatchState | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeSpotFleetRequestsResponse {
  NextToken?: string | undefined;
  SpotFleetRequestConfigs?: SpotFleetRequestConfig[] | undefined;
}
export interface DescribeSpotInstanceRequestsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  SpotInstanceRequestIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface RunInstancesMonitoringEnabled {
  Enabled: boolean | undefined;
}
export interface LaunchSpecification {
  UserData?: string | undefined;
  AddressingType?: string | undefined;
  BlockDeviceMappings?: BlockDeviceMapping[] | undefined;
  EbsOptimized?: boolean | undefined;
  IamInstanceProfile?: IamInstanceProfileSpecification | undefined;
  ImageId?: string | undefined;
  InstanceType?: _InstanceType | undefined;
  KernelId?: string | undefined;
  KeyName?: string | undefined;
  NetworkInterfaces?: InstanceNetworkInterfaceSpecification[] | undefined;
  Placement?: SpotPlacement | undefined;
  RamdiskId?: string | undefined;
  SubnetId?: string | undefined;
  SecurityGroups?: GroupIdentifier[] | undefined;
  Monitoring?: RunInstancesMonitoringEnabled | undefined;
}
export declare const SpotInstanceState: {
  readonly active: "active";
  readonly cancelled: "cancelled";
  readonly closed: "closed";
  readonly disabled: "disabled";
  readonly failed: "failed";
  readonly open: "open";
};
export type SpotInstanceState =
  (typeof SpotInstanceState)[keyof typeof SpotInstanceState];
export interface SpotInstanceStatus {
  Code?: string | undefined;
  Message?: string | undefined;
  UpdateTime?: Date | undefined;
}
export interface SpotInstanceRequest {
  ActualBlockHourlyPrice?: string | undefined;
  AvailabilityZoneGroup?: string | undefined;
  BlockDurationMinutes?: number | undefined;
  CreateTime?: Date | undefined;
  Fault?: SpotInstanceStateFault | undefined;
  InstanceId?: string | undefined;
  LaunchGroup?: string | undefined;
  LaunchSpecification?: LaunchSpecification | undefined;
  LaunchedAvailabilityZone?: string | undefined;
  ProductDescription?: RIProductDescription | undefined;
  SpotInstanceRequestId?: string | undefined;
  SpotPrice?: string | undefined;
  State?: SpotInstanceState | undefined;
  Status?: SpotInstanceStatus | undefined;
  Tags?: Tag[] | undefined;
  Type?: SpotInstanceType | undefined;
  ValidFrom?: Date | undefined;
  ValidUntil?: Date | undefined;
  InstanceInterruptionBehavior?: InstanceInterruptionBehavior | undefined;
}
export interface DescribeSpotInstanceRequestsResult {
  SpotInstanceRequests?: SpotInstanceRequest[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeSpotPriceHistoryRequest {
  DryRun?: boolean | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  InstanceTypes?: _InstanceType[] | undefined;
  ProductDescriptions?: string[] | undefined;
  Filters?: Filter[] | undefined;
  AvailabilityZone?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface SpotPrice {
  AvailabilityZone?: string | undefined;
  InstanceType?: _InstanceType | undefined;
  ProductDescription?: RIProductDescription | undefined;
  SpotPrice?: string | undefined;
  Timestamp?: Date | undefined;
}
export interface DescribeSpotPriceHistoryResult {
  NextToken?: string | undefined;
  SpotPriceHistory?: SpotPrice[] | undefined;
}
export interface DescribeStaleSecurityGroupsRequest {
  DryRun?: boolean | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  VpcId: string | undefined;
}
export interface StaleIpPermission {
  FromPort?: number | undefined;
  IpProtocol?: string | undefined;
  IpRanges?: string[] | undefined;
  PrefixListIds?: string[] | undefined;
  ToPort?: number | undefined;
  UserIdGroupPairs?: UserIdGroupPair[] | undefined;
}
export interface StaleSecurityGroup {
  Description?: string | undefined;
  GroupId?: string | undefined;
  GroupName?: string | undefined;
  StaleIpPermissions?: StaleIpPermission[] | undefined;
  StaleIpPermissionsEgress?: StaleIpPermission[] | undefined;
  VpcId?: string | undefined;
}
export interface DescribeStaleSecurityGroupsResult {
  NextToken?: string | undefined;
  StaleSecurityGroupSet?: StaleSecurityGroup[] | undefined;
}
export interface DescribeStoreImageTasksRequest {
  ImageIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface StoreImageTaskResult {
  AmiId?: string | undefined;
  TaskStartTime?: Date | undefined;
  Bucket?: string | undefined;
  S3objectKey?: string | undefined;
  ProgressPercentage?: number | undefined;
  StoreTaskState?: string | undefined;
  StoreTaskFailureReason?: string | undefined;
}
export interface DescribeStoreImageTasksResult {
  StoreImageTaskResults?: StoreImageTaskResult[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeSubnetsRequest {
  Filters?: Filter[] | undefined;
  SubnetIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeSubnetsResult {
  NextToken?: string | undefined;
  Subnets?: Subnet[] | undefined;
}
export interface DescribeTagsRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface TagDescription {
  Key?: string | undefined;
  ResourceId?: string | undefined;
  ResourceType?: ResourceType | undefined;
  Value?: string | undefined;
}
export interface DescribeTagsResult {
  NextToken?: string | undefined;
  Tags?: TagDescription[] | undefined;
}
export interface DescribeTrafficMirrorFilterRulesRequest {
  TrafficMirrorFilterRuleIds?: string[] | undefined;
  TrafficMirrorFilterId?: string | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrafficMirrorFilterRulesResult {
  TrafficMirrorFilterRules?: TrafficMirrorFilterRule[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrafficMirrorFiltersRequest {
  TrafficMirrorFilterIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrafficMirrorFiltersResult {
  TrafficMirrorFilters?: TrafficMirrorFilter[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrafficMirrorSessionsRequest {
  TrafficMirrorSessionIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrafficMirrorSessionsResult {
  TrafficMirrorSessions?: TrafficMirrorSession[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrafficMirrorTargetsRequest {
  TrafficMirrorTargetIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrafficMirrorTargetsResult {
  TrafficMirrorTargets?: TrafficMirrorTarget[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayAttachmentsRequest {
  TransitGatewayAttachmentIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface TransitGatewayAttachmentAssociation {
  TransitGatewayRouteTableId?: string | undefined;
  State?: TransitGatewayAssociationState | undefined;
}
export interface TransitGatewayAttachment {
  TransitGatewayAttachmentId?: string | undefined;
  TransitGatewayId?: string | undefined;
  TransitGatewayOwnerId?: string | undefined;
  ResourceOwnerId?: string | undefined;
  ResourceType?: TransitGatewayAttachmentResourceType | undefined;
  ResourceId?: string | undefined;
  State?: TransitGatewayAttachmentState | undefined;
  Association?: TransitGatewayAttachmentAssociation | undefined;
  CreationTime?: Date | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeTransitGatewayAttachmentsResult {
  TransitGatewayAttachments?: TransitGatewayAttachment[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayConnectPeersRequest {
  TransitGatewayConnectPeerIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayConnectPeersResult {
  TransitGatewayConnectPeers?: TransitGatewayConnectPeer[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayConnectsRequest {
  TransitGatewayAttachmentIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayConnectsResult {
  TransitGatewayConnects?: TransitGatewayConnect[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayMulticastDomainsRequest {
  TransitGatewayMulticastDomainIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayMulticastDomainsResult {
  TransitGatewayMulticastDomains?: TransitGatewayMulticastDomain[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayPeeringAttachmentsRequest {
  TransitGatewayAttachmentIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayPeeringAttachmentsResult {
  TransitGatewayPeeringAttachments?:
    | TransitGatewayPeeringAttachment[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayPolicyTablesRequest {
  TransitGatewayPolicyTableIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayPolicyTablesResult {
  TransitGatewayPolicyTables?: TransitGatewayPolicyTable[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayRouteTableAnnouncementsRequest {
  TransitGatewayRouteTableAnnouncementIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayRouteTableAnnouncementsResult {
  TransitGatewayRouteTableAnnouncements?:
    | TransitGatewayRouteTableAnnouncement[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayRouteTablesRequest {
  TransitGatewayRouteTableIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayRouteTablesResult {
  TransitGatewayRouteTables?: TransitGatewayRouteTable[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewaysRequest {
  TransitGatewayIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewaysResult {
  TransitGateways?: TransitGateway[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayVpcAttachmentsRequest {
  TransitGatewayAttachmentIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayVpcAttachmentsResult {
  TransitGatewayVpcAttachments?: TransitGatewayVpcAttachment[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrunkInterfaceAssociationsRequest {
  AssociationIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DescribeTrunkInterfaceAssociationsResult {
  InterfaceAssociations?: TrunkInterfaceAssociation[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVerifiedAccessEndpointsRequest {
  VerifiedAccessEndpointIds?: string[] | undefined;
  VerifiedAccessInstanceId?: string | undefined;
  VerifiedAccessGroupId?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeVerifiedAccessEndpointsResult {
  VerifiedAccessEndpoints?: VerifiedAccessEndpoint[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVerifiedAccessGroupsRequest {
  VerifiedAccessGroupIds?: string[] | undefined;
  VerifiedAccessInstanceId?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeVerifiedAccessGroupsResult {
  VerifiedAccessGroups?: VerifiedAccessGroup[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVerifiedAccessInstanceLoggingConfigurationsRequest {
  VerifiedAccessInstanceIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export declare const VerifiedAccessLogDeliveryStatusCode: {
  readonly FAILED: "failed";
  readonly SUCCESS: "success";
};
export type VerifiedAccessLogDeliveryStatusCode =
  (typeof VerifiedAccessLogDeliveryStatusCode)[keyof typeof VerifiedAccessLogDeliveryStatusCode];
export interface VerifiedAccessLogDeliveryStatus {
  Code?: VerifiedAccessLogDeliveryStatusCode | undefined;
  Message?: string | undefined;
}
export interface VerifiedAccessLogCloudWatchLogsDestination {
  Enabled?: boolean | undefined;
  DeliveryStatus?: VerifiedAccessLogDeliveryStatus | undefined;
  LogGroup?: string | undefined;
}
export interface VerifiedAccessLogKinesisDataFirehoseDestination {
  Enabled?: boolean | undefined;
  DeliveryStatus?: VerifiedAccessLogDeliveryStatus | undefined;
  DeliveryStream?: string | undefined;
}
export interface VerifiedAccessLogS3Destination {
  Enabled?: boolean | undefined;
  DeliveryStatus?: VerifiedAccessLogDeliveryStatus | undefined;
  BucketName?: string | undefined;
  Prefix?: string | undefined;
  BucketOwner?: string | undefined;
}
export interface VerifiedAccessLogs {
  S3?: VerifiedAccessLogS3Destination | undefined;
  CloudWatchLogs?: VerifiedAccessLogCloudWatchLogsDestination | undefined;
  KinesisDataFirehose?:
    | VerifiedAccessLogKinesisDataFirehoseDestination
    | undefined;
  LogVersion?: string | undefined;
  IncludeTrustContext?: boolean | undefined;
}
export interface VerifiedAccessInstanceLoggingConfiguration {
  VerifiedAccessInstanceId?: string | undefined;
  AccessLogs?: VerifiedAccessLogs | undefined;
}
export interface DescribeVerifiedAccessInstanceLoggingConfigurationsResult {
  LoggingConfigurations?:
    | VerifiedAccessInstanceLoggingConfiguration[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVerifiedAccessInstancesRequest {
  VerifiedAccessInstanceIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeVerifiedAccessInstancesResult {
  VerifiedAccessInstances?: VerifiedAccessInstance[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVerifiedAccessTrustProvidersRequest {
  VerifiedAccessTrustProviderIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeVerifiedAccessTrustProvidersResult {
  VerifiedAccessTrustProviders?: VerifiedAccessTrustProvider[] | undefined;
  NextToken?: string | undefined;
}
export declare const VolumeAttributeName: {
  readonly autoEnableIO: "autoEnableIO";
  readonly productCodes: "productCodes";
};
export type VolumeAttributeName =
  (typeof VolumeAttributeName)[keyof typeof VolumeAttributeName];
export interface DescribeVolumeAttributeRequest {
  Attribute: VolumeAttributeName | undefined;
  VolumeId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeVolumeAttributeResult {
  AutoEnableIO?: AttributeBooleanValue | undefined;
  ProductCodes?: ProductCode[] | undefined;
  VolumeId?: string | undefined;
}
export interface DescribeVolumesRequest {
  VolumeIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DescribeVolumesResult {
  NextToken?: string | undefined;
  Volumes?: Volume[] | undefined;
}
export interface DescribeVolumesModificationsRequest {
  DryRun?: boolean | undefined;
  VolumeIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export declare const VolumeModificationState: {
  readonly completed: "completed";
  readonly failed: "failed";
  readonly modifying: "modifying";
  readonly optimizing: "optimizing";
};
export type VolumeModificationState =
  (typeof VolumeModificationState)[keyof typeof VolumeModificationState];
export interface VolumeModification {
  VolumeId?: string | undefined;
  ModificationState?: VolumeModificationState | undefined;
  StatusMessage?: string | undefined;
  TargetSize?: number | undefined;
  TargetIops?: number | undefined;
  TargetVolumeType?: VolumeType | undefined;
  TargetThroughput?: number | undefined;
  TargetMultiAttachEnabled?: boolean | undefined;
  OriginalSize?: number | undefined;
  OriginalIops?: number | undefined;
  OriginalVolumeType?: VolumeType | undefined;
  OriginalThroughput?: number | undefined;
  OriginalMultiAttachEnabled?: boolean | undefined;
  Progress?: number | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
}
export interface DescribeVolumesModificationsResult {
  NextToken?: string | undefined;
  VolumesModifications?: VolumeModification[] | undefined;
}
export interface DescribeVolumeStatusRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  VolumeIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
}
export interface VolumeStatusAction {
  Code?: string | undefined;
  Description?: string | undefined;
  EventId?: string | undefined;
  EventType?: string | undefined;
}
export interface VolumeStatusAttachmentStatus {
  IoPerformance?: string | undefined;
  InstanceId?: string | undefined;
}
export interface VolumeStatusEvent {
  Description?: string | undefined;
  EventId?: string | undefined;
  EventType?: string | undefined;
  NotAfter?: Date | undefined;
  NotBefore?: Date | undefined;
  InstanceId?: string | undefined;
}
export declare const VolumeStatusName: {
  readonly io_enabled: "io-enabled";
  readonly io_performance: "io-performance";
};
export type VolumeStatusName =
  (typeof VolumeStatusName)[keyof typeof VolumeStatusName];
export interface VolumeStatusDetails {
  Name?: VolumeStatusName | undefined;
  Status?: string | undefined;
}
export declare const VolumeStatusInfoStatus: {
  readonly impaired: "impaired";
  readonly insufficient_data: "insufficient-data";
  readonly ok: "ok";
};
export type VolumeStatusInfoStatus =
  (typeof VolumeStatusInfoStatus)[keyof typeof VolumeStatusInfoStatus];
export interface VolumeStatusInfo {
  Details?: VolumeStatusDetails[] | undefined;
  Status?: VolumeStatusInfoStatus | undefined;
}
export interface VolumeStatusItem {
  Actions?: VolumeStatusAction[] | undefined;
  AvailabilityZone?: string | undefined;
  OutpostArn?: string | undefined;
  Events?: VolumeStatusEvent[] | undefined;
  VolumeId?: string | undefined;
  VolumeStatus?: VolumeStatusInfo | undefined;
  AttachmentStatuses?: VolumeStatusAttachmentStatus[] | undefined;
  AvailabilityZoneId?: string | undefined;
}
export interface DescribeVolumeStatusResult {
  NextToken?: string | undefined;
  VolumeStatuses?: VolumeStatusItem[] | undefined;
}
export declare const VpcAttributeName: {
  readonly enableDnsHostnames: "enableDnsHostnames";
  readonly enableDnsSupport: "enableDnsSupport";
  readonly enableNetworkAddressUsageMetrics: "enableNetworkAddressUsageMetrics";
};
export type VpcAttributeName =
  (typeof VpcAttributeName)[keyof typeof VpcAttributeName];
export interface DescribeVpcAttributeRequest {
  Attribute: VpcAttributeName | undefined;
  VpcId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeVpcAttributeResult {
  EnableDnsHostnames?: AttributeBooleanValue | undefined;
  EnableDnsSupport?: AttributeBooleanValue | undefined;
  EnableNetworkAddressUsageMetrics?: AttributeBooleanValue | undefined;
  VpcId?: string | undefined;
}
export interface DescribeVpcBlockPublicAccessExclusionsRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  ExclusionIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DescribeVpcBlockPublicAccessExclusionsResult {
  VpcBlockPublicAccessExclusions?: VpcBlockPublicAccessExclusion[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcBlockPublicAccessOptionsRequest {
  DryRun?: boolean | undefined;
}
export declare const VpcBlockPublicAccessExclusionsAllowed: {
  readonly allowed: "allowed";
  readonly not_allowed: "not-allowed";
};
export type VpcBlockPublicAccessExclusionsAllowed =
  (typeof VpcBlockPublicAccessExclusionsAllowed)[keyof typeof VpcBlockPublicAccessExclusionsAllowed];
export declare const InternetGatewayBlockMode: {
  readonly block_bidirectional: "block-bidirectional";
  readonly block_ingress: "block-ingress";
  readonly off: "off";
};
export type InternetGatewayBlockMode =
  (typeof InternetGatewayBlockMode)[keyof typeof InternetGatewayBlockMode];
export declare const ManagedBy: {
  readonly account: "account";
  readonly declarative_policy: "declarative-policy";
};
export type ManagedBy = (typeof ManagedBy)[keyof typeof ManagedBy];
export declare const VpcBlockPublicAccessState: {
  readonly default_state: "default-state";
  readonly update_complete: "update-complete";
  readonly update_in_progress: "update-in-progress";
};
export type VpcBlockPublicAccessState =
  (typeof VpcBlockPublicAccessState)[keyof typeof VpcBlockPublicAccessState];
export interface VpcBlockPublicAccessOptions {
  AwsAccountId?: string | undefined;
  AwsRegion?: string | undefined;
  State?: VpcBlockPublicAccessState | undefined;
  InternetGatewayBlockMode?: InternetGatewayBlockMode | undefined;
  Reason?: string | undefined;
  LastUpdateTimestamp?: Date | undefined;
  ManagedBy?: ManagedBy | undefined;
  ExclusionsAllowed?: VpcBlockPublicAccessExclusionsAllowed | undefined;
}
export interface DescribeVpcBlockPublicAccessOptionsResult {
  VpcBlockPublicAccessOptions?: VpcBlockPublicAccessOptions | undefined;
}
export interface DescribeVpcClassicLinkRequest {
  DryRun?: boolean | undefined;
  VpcIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface VpcClassicLink {
  ClassicLinkEnabled?: boolean | undefined;
  Tags?: Tag[] | undefined;
  VpcId?: string | undefined;
}
export interface DescribeVpcClassicLinkResult {
  Vpcs?: VpcClassicLink[] | undefined;
}
export interface DescribeVpcClassicLinkDnsSupportRequest {
  VpcIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ClassicLinkDnsSupport {
  ClassicLinkDnsSupported?: boolean | undefined;
  VpcId?: string | undefined;
}
export interface DescribeVpcClassicLinkDnsSupportResult {
  NextToken?: string | undefined;
  Vpcs?: ClassicLinkDnsSupport[] | undefined;
}
export interface DescribeVpcEndpointAssociationsRequest {
  DryRun?: boolean | undefined;
  VpcEndpointIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface VpcEndpointAssociation {
  Id?: string | undefined;
  VpcEndpointId?: string | undefined;
  ServiceNetworkArn?: string | undefined;
  ServiceNetworkName?: string | undefined;
  AssociatedResourceAccessibility?: string | undefined;
  FailureReason?: string | undefined;
  FailureCode?: string | undefined;
  DnsEntry?: DnsEntry | undefined;
  PrivateDnsEntry?: DnsEntry | undefined;
  AssociatedResourceArn?: string | undefined;
  ResourceConfigurationGroupArn?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeVpcEndpointAssociationsResult {
  VpcEndpointAssociations?: VpcEndpointAssociation[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointConnectionNotificationsRequest {
  DryRun?: boolean | undefined;
  ConnectionNotificationId?: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointConnectionNotificationsResult {
  ConnectionNotificationSet?: ConnectionNotification[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointConnectionsRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface VpcEndpointConnection {
  ServiceId?: string | undefined;
  VpcEndpointId?: string | undefined;
  VpcEndpointOwner?: string | undefined;
  VpcEndpointState?: State | undefined;
  CreationTimestamp?: Date | undefined;
  DnsEntries?: DnsEntry[] | undefined;
  NetworkLoadBalancerArns?: string[] | undefined;
  GatewayLoadBalancerArns?: string[] | undefined;
  IpAddressType?: IpAddressType | undefined;
  VpcEndpointConnectionId?: string | undefined;
  Tags?: Tag[] | undefined;
  VpcEndpointRegion?: string | undefined;
}
export interface DescribeVpcEndpointConnectionsResult {
  VpcEndpointConnections?: VpcEndpointConnection[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointsRequest {
  DryRun?: boolean | undefined;
  VpcEndpointIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointsResult {
  VpcEndpoints?: VpcEndpoint[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointServiceConfigurationsRequest {
  DryRun?: boolean | undefined;
  ServiceIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointServiceConfigurationsResult {
  ServiceConfigurations?: ServiceConfiguration[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointServicePermissionsRequest {
  DryRun?: boolean | undefined;
  ServiceId: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointServicePermissionsResult {
  AllowedPrincipals?: AllowedPrincipal[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointServicesRequest {
  DryRun?: boolean | undefined;
  ServiceNames?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  ServiceRegions?: string[] | undefined;
}
export interface PrivateDnsDetails {
  PrivateDnsName?: string | undefined;
}
export interface ServiceDetail {
  ServiceName?: string | undefined;
  ServiceId?: string | undefined;
  ServiceType?: ServiceTypeDetail[] | undefined;
  ServiceRegion?: string | undefined;
  AvailabilityZones?: string[] | undefined;
  Owner?: string | undefined;
  BaseEndpointDnsNames?: string[] | undefined;
  PrivateDnsName?: string | undefined;
  PrivateDnsNames?: PrivateDnsDetails[] | undefined;
  VpcEndpointPolicySupported?: boolean | undefined;
  AcceptanceRequired?: boolean | undefined;
  ManagesVpcEndpoints?: boolean | undefined;
  PayerResponsibility?: PayerResponsibility | undefined;
  Tags?: Tag[] | undefined;
  PrivateDnsNameVerificationState?: DnsNameState | undefined;
  SupportedIpAddressTypes?: ServiceConnectivityType[] | undefined;
}
export interface DescribeVpcEndpointServicesResult {
  ServiceNames?: string[] | undefined;
  ServiceDetails?: ServiceDetail[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcPeeringConnectionsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  VpcPeeringConnectionIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeVpcPeeringConnectionsResult {
  VpcPeeringConnections?: VpcPeeringConnection[] | undefined;
  NextToken?: string | undefined;
}
export declare const DescribeLaunchTemplateVersionsResultFilterSensitiveLog: (
  obj: DescribeLaunchTemplateVersionsResult
) => any;
export declare const SpotFleetLaunchSpecificationFilterSensitiveLog: (
  obj: SpotFleetLaunchSpecification
) => any;
export declare const SpotFleetRequestConfigDataFilterSensitiveLog: (
  obj: SpotFleetRequestConfigData
) => any;
export declare const SpotFleetRequestConfigFilterSensitiveLog: (
  obj: SpotFleetRequestConfig
) => any;
export declare const DescribeSpotFleetRequestsResponseFilterSensitiveLog: (
  obj: DescribeSpotFleetRequestsResponse
) => any;
export declare const LaunchSpecificationFilterSensitiveLog: (
  obj: LaunchSpecification
) => any;
export declare const SpotInstanceRequestFilterSensitiveLog: (
  obj: SpotInstanceRequest
) => any;
export declare const DescribeSpotInstanceRequestsResultFilterSensitiveLog: (
  obj: DescribeSpotInstanceRequestsResult
) => any;
export declare const DescribeVerifiedAccessTrustProvidersResultFilterSensitiveLog: (
  obj: DescribeVerifiedAccessTrustProvidersResult
) => any;
