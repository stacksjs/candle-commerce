import { ExceptionOptionType as __ExceptionOptionType } from "@smithy/smithy-client";
import { EFSServiceException as __BaseException } from "./EFSServiceException";
export declare class AccessPointAlreadyExists extends __BaseException {
  readonly name: "AccessPointAlreadyExists";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  AccessPointId: string | undefined;
  constructor(
    opts: __ExceptionOptionType<AccessPointAlreadyExists, __BaseException>
  );
}
export declare const LifeCycleState: {
  readonly AVAILABLE: "available";
  readonly CREATING: "creating";
  readonly DELETED: "deleted";
  readonly DELETING: "deleting";
  readonly ERROR: "error";
  readonly UPDATING: "updating";
};
export type LifeCycleState =
  (typeof LifeCycleState)[keyof typeof LifeCycleState];
export interface PosixUser {
  Uid: number | undefined;
  Gid: number | undefined;
  SecondaryGids?: number[] | undefined;
}
export interface CreationInfo {
  OwnerUid: number | undefined;
  OwnerGid: number | undefined;
  Permissions: string | undefined;
}
export interface RootDirectory {
  Path?: string | undefined;
  CreationInfo?: CreationInfo | undefined;
}
export interface Tag {
  Key: string | undefined;
  Value: string | undefined;
}
export interface AccessPointDescription {
  ClientToken?: string | undefined;
  Name?: string | undefined;
  Tags?: Tag[] | undefined;
  AccessPointId?: string | undefined;
  AccessPointArn?: string | undefined;
  FileSystemId?: string | undefined;
  PosixUser?: PosixUser | undefined;
  RootDirectory?: RootDirectory | undefined;
  OwnerId?: string | undefined;
  LifeCycleState?: LifeCycleState | undefined;
}
export declare class AccessPointLimitExceeded extends __BaseException {
  readonly name: "AccessPointLimitExceeded";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<AccessPointLimitExceeded, __BaseException>
  );
}
export declare class AccessPointNotFound extends __BaseException {
  readonly name: "AccessPointNotFound";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<AccessPointNotFound, __BaseException>
  );
}
export declare class AvailabilityZonesMismatch extends __BaseException {
  readonly name: "AvailabilityZonesMismatch";
  readonly $fault: "client";
  ErrorCode?: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<AvailabilityZonesMismatch, __BaseException>
  );
}
export declare const Status: {
  readonly DISABLED: "DISABLED";
  readonly DISABLING: "DISABLING";
  readonly ENABLED: "ENABLED";
  readonly ENABLING: "ENABLING";
};
export type Status = (typeof Status)[keyof typeof Status];
export interface BackupPolicy {
  Status: Status | undefined;
}
export interface BackupPolicyDescription {
  BackupPolicy?: BackupPolicy | undefined;
}
export declare class BadRequest extends __BaseException {
  readonly name: "BadRequest";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(opts: __ExceptionOptionType<BadRequest, __BaseException>);
}
export declare class ConflictException extends __BaseException {
  readonly name: "ConflictException";
  readonly $fault: "client";
  ErrorCode?: string | undefined;
  Message?: string | undefined;
  constructor(opts: __ExceptionOptionType<ConflictException, __BaseException>);
}
export interface CreateAccessPointRequest {
  ClientToken?: string | undefined;
  Tags?: Tag[] | undefined;
  FileSystemId: string | undefined;
  PosixUser?: PosixUser | undefined;
  RootDirectory?: RootDirectory | undefined;
}
export declare class FileSystemNotFound extends __BaseException {
  readonly name: "FileSystemNotFound";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(opts: __ExceptionOptionType<FileSystemNotFound, __BaseException>);
}
export declare class IncorrectFileSystemLifeCycleState extends __BaseException {
  readonly name: "IncorrectFileSystemLifeCycleState";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      IncorrectFileSystemLifeCycleState,
      __BaseException
    >
  );
}
export declare class InternalServerError extends __BaseException {
  readonly name: "InternalServerError";
  readonly $fault: "server";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<InternalServerError, __BaseException>
  );
}
export declare class ThrottlingException extends __BaseException {
  readonly name: "ThrottlingException";
  readonly $fault: "client";
  ErrorCode?: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<ThrottlingException, __BaseException>
  );
}
export declare const PerformanceMode: {
  readonly GENERAL_PURPOSE: "generalPurpose";
  readonly MAX_IO: "maxIO";
};
export type PerformanceMode =
  (typeof PerformanceMode)[keyof typeof PerformanceMode];
export declare const ThroughputMode: {
  readonly BURSTING: "bursting";
  readonly ELASTIC: "elastic";
  readonly PROVISIONED: "provisioned";
};
export type ThroughputMode =
  (typeof ThroughputMode)[keyof typeof ThroughputMode];
export interface CreateFileSystemRequest {
  CreationToken?: string | undefined;
  PerformanceMode?: PerformanceMode | undefined;
  Encrypted?: boolean | undefined;
  KmsKeyId?: string | undefined;
  ThroughputMode?: ThroughputMode | undefined;
  ProvisionedThroughputInMibps?: number | undefined;
  AvailabilityZoneName?: string | undefined;
  Backup?: boolean | undefined;
  Tags?: Tag[] | undefined;
}
export declare class FileSystemAlreadyExists extends __BaseException {
  readonly name: "FileSystemAlreadyExists";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  FileSystemId: string | undefined;
  constructor(
    opts: __ExceptionOptionType<FileSystemAlreadyExists, __BaseException>
  );
}
export declare const ReplicationOverwriteProtection: {
  readonly DISABLED: "DISABLED";
  readonly ENABLED: "ENABLED";
  readonly REPLICATING: "REPLICATING";
};
export type ReplicationOverwriteProtection =
  (typeof ReplicationOverwriteProtection)[keyof typeof ReplicationOverwriteProtection];
export interface FileSystemProtectionDescription {
  ReplicationOverwriteProtection?: ReplicationOverwriteProtection | undefined;
}
export interface FileSystemSize {
  Value: number | undefined;
  Timestamp?: Date | undefined;
  ValueInIA?: number | undefined;
  ValueInStandard?: number | undefined;
  ValueInArchive?: number | undefined;
}
export interface FileSystemDescription {
  OwnerId: string | undefined;
  CreationToken: string | undefined;
  FileSystemId: string | undefined;
  FileSystemArn?: string | undefined;
  CreationTime: Date | undefined;
  LifeCycleState: LifeCycleState | undefined;
  Name?: string | undefined;
  NumberOfMountTargets: number | undefined;
  SizeInBytes: FileSystemSize | undefined;
  PerformanceMode: PerformanceMode | undefined;
  Encrypted?: boolean | undefined;
  KmsKeyId?: string | undefined;
  ThroughputMode?: ThroughputMode | undefined;
  ProvisionedThroughputInMibps?: number | undefined;
  AvailabilityZoneName?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  Tags: Tag[] | undefined;
  FileSystemProtection?: FileSystemProtectionDescription | undefined;
}
export declare class FileSystemLimitExceeded extends __BaseException {
  readonly name: "FileSystemLimitExceeded";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<FileSystemLimitExceeded, __BaseException>
  );
}
export declare class InsufficientThroughputCapacity extends __BaseException {
  readonly name: "InsufficientThroughputCapacity";
  readonly $fault: "server";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<InsufficientThroughputCapacity, __BaseException>
  );
}
export declare class ThroughputLimitExceeded extends __BaseException {
  readonly name: "ThroughputLimitExceeded";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<ThroughputLimitExceeded, __BaseException>
  );
}
export declare class UnsupportedAvailabilityZone extends __BaseException {
  readonly name: "UnsupportedAvailabilityZone";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<UnsupportedAvailabilityZone, __BaseException>
  );
}
export declare const IpAddressType: {
  readonly DUAL_STACK: "DUAL_STACK";
  readonly IPV4_ONLY: "IPV4_ONLY";
  readonly IPV6_ONLY: "IPV6_ONLY";
};
export type IpAddressType = (typeof IpAddressType)[keyof typeof IpAddressType];
export interface CreateMountTargetRequest {
  FileSystemId: string | undefined;
  SubnetId: string | undefined;
  IpAddress?: string | undefined;
  Ipv6Address?: string | undefined;
  IpAddressType?: IpAddressType | undefined;
  SecurityGroups?: string[] | undefined;
}
export declare class IpAddressInUse extends __BaseException {
  readonly name: "IpAddressInUse";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(opts: __ExceptionOptionType<IpAddressInUse, __BaseException>);
}
export declare class MountTargetConflict extends __BaseException {
  readonly name: "MountTargetConflict";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<MountTargetConflict, __BaseException>
  );
}
export interface MountTargetDescription {
  OwnerId?: string | undefined;
  MountTargetId: string | undefined;
  FileSystemId: string | undefined;
  SubnetId: string | undefined;
  LifeCycleState: LifeCycleState | undefined;
  IpAddress?: string | undefined;
  Ipv6Address?: string | undefined;
  NetworkInterfaceId?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  AvailabilityZoneName?: string | undefined;
  VpcId?: string | undefined;
}
export declare class NetworkInterfaceLimitExceeded extends __BaseException {
  readonly name: "NetworkInterfaceLimitExceeded";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<NetworkInterfaceLimitExceeded, __BaseException>
  );
}
export declare class NoFreeAddressesInSubnet extends __BaseException {
  readonly name: "NoFreeAddressesInSubnet";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<NoFreeAddressesInSubnet, __BaseException>
  );
}
export declare class SecurityGroupLimitExceeded extends __BaseException {
  readonly name: "SecurityGroupLimitExceeded";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<SecurityGroupLimitExceeded, __BaseException>
  );
}
export declare class SecurityGroupNotFound extends __BaseException {
  readonly name: "SecurityGroupNotFound";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<SecurityGroupNotFound, __BaseException>
  );
}
export declare class SubnetNotFound extends __BaseException {
  readonly name: "SubnetNotFound";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(opts: __ExceptionOptionType<SubnetNotFound, __BaseException>);
}
export interface DestinationToCreate {
  Region?: string | undefined;
  AvailabilityZoneName?: string | undefined;
  KmsKeyId?: string | undefined;
  FileSystemId?: string | undefined;
  RoleArn?: string | undefined;
}
export interface CreateReplicationConfigurationRequest {
  SourceFileSystemId: string | undefined;
  Destinations: DestinationToCreate[] | undefined;
}
export declare const ReplicationStatus: {
  readonly DELETING: "DELETING";
  readonly ENABLED: "ENABLED";
  readonly ENABLING: "ENABLING";
  readonly ERROR: "ERROR";
  readonly PAUSED: "PAUSED";
  readonly PAUSING: "PAUSING";
};
export type ReplicationStatus =
  (typeof ReplicationStatus)[keyof typeof ReplicationStatus];
export interface Destination {
  Status: ReplicationStatus | undefined;
  FileSystemId: string | undefined;
  Region: string | undefined;
  LastReplicatedTimestamp?: Date | undefined;
  OwnerId?: string | undefined;
  StatusMessage?: string | undefined;
  RoleArn?: string | undefined;
}
export interface ReplicationConfigurationDescription {
  SourceFileSystemId: string | undefined;
  SourceFileSystemRegion: string | undefined;
  SourceFileSystemArn: string | undefined;
  OriginalSourceFileSystemArn: string | undefined;
  CreationTime: Date | undefined;
  Destinations: Destination[] | undefined;
  SourceFileSystemOwnerId?: string | undefined;
}
export declare class ReplicationNotFound extends __BaseException {
  readonly name: "ReplicationNotFound";
  readonly $fault: "client";
  ErrorCode?: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<ReplicationNotFound, __BaseException>
  );
}
export declare class ValidationException extends __BaseException {
  readonly name: "ValidationException";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<ValidationException, __BaseException>
  );
}
export interface CreateTagsRequest {
  FileSystemId: string | undefined;
  Tags: Tag[] | undefined;
}
export interface DeleteAccessPointRequest {
  AccessPointId: string | undefined;
}
export interface DeleteFileSystemRequest {
  FileSystemId: string | undefined;
}
export declare class FileSystemInUse extends __BaseException {
  readonly name: "FileSystemInUse";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(opts: __ExceptionOptionType<FileSystemInUse, __BaseException>);
}
export interface DeleteFileSystemPolicyRequest {
  FileSystemId: string | undefined;
}
export interface DeleteMountTargetRequest {
  MountTargetId: string | undefined;
}
export declare class DependencyTimeout extends __BaseException {
  readonly name: "DependencyTimeout";
  readonly $fault: "server";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(opts: __ExceptionOptionType<DependencyTimeout, __BaseException>);
}
export declare class MountTargetNotFound extends __BaseException {
  readonly name: "MountTargetNotFound";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<MountTargetNotFound, __BaseException>
  );
}
export declare const DeletionMode: {
  readonly ALL_CONFIGURATIONS: "ALL_CONFIGURATIONS";
  readonly LOCAL_CONFIGURATION_ONLY: "LOCAL_CONFIGURATION_ONLY";
};
export type DeletionMode = (typeof DeletionMode)[keyof typeof DeletionMode];
export interface DeleteReplicationConfigurationRequest {
  SourceFileSystemId: string | undefined;
  DeletionMode?: DeletionMode | undefined;
}
export interface DeleteTagsRequest {
  FileSystemId: string | undefined;
  TagKeys: string[] | undefined;
}
export interface DescribeAccessPointsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  AccessPointId?: string | undefined;
  FileSystemId?: string | undefined;
}
export interface DescribeAccessPointsResponse {
  AccessPoints?: AccessPointDescription[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeAccountPreferencesRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export declare const ResourceIdType: {
  readonly LongId: "LONG_ID";
  readonly ShortId: "SHORT_ID";
};
export type ResourceIdType =
  (typeof ResourceIdType)[keyof typeof ResourceIdType];
export declare const Resource: {
  readonly FileSystem: "FILE_SYSTEM";
  readonly MountTarget: "MOUNT_TARGET";
};
export type Resource = (typeof Resource)[keyof typeof Resource];
export interface ResourceIdPreference {
  ResourceIdType?: ResourceIdType | undefined;
  Resources?: Resource[] | undefined;
}
export interface DescribeAccountPreferencesResponse {
  ResourceIdPreference?: ResourceIdPreference | undefined;
  NextToken?: string | undefined;
}
export interface DescribeBackupPolicyRequest {
  FileSystemId: string | undefined;
}
export declare class PolicyNotFound extends __BaseException {
  readonly name: "PolicyNotFound";
  readonly $fault: "client";
  ErrorCode?: string | undefined;
  Message?: string | undefined;
  constructor(opts: __ExceptionOptionType<PolicyNotFound, __BaseException>);
}
export interface DescribeFileSystemPolicyRequest {
  FileSystemId: string | undefined;
}
export interface FileSystemPolicyDescription {
  FileSystemId?: string | undefined;
  Policy?: string | undefined;
}
export interface DescribeFileSystemsRequest {
  MaxItems?: number | undefined;
  Marker?: string | undefined;
  CreationToken?: string | undefined;
  FileSystemId?: string | undefined;
}
export interface DescribeFileSystemsResponse {
  Marker?: string | undefined;
  FileSystems?: FileSystemDescription[] | undefined;
  NextMarker?: string | undefined;
}
export interface DescribeLifecycleConfigurationRequest {
  FileSystemId: string | undefined;
}
export declare const TransitionToArchiveRules: {
  readonly AFTER_14_DAYS: "AFTER_14_DAYS";
  readonly AFTER_180_DAYS: "AFTER_180_DAYS";
  readonly AFTER_1_DAY: "AFTER_1_DAY";
  readonly AFTER_270_DAYS: "AFTER_270_DAYS";
  readonly AFTER_30_DAYS: "AFTER_30_DAYS";
  readonly AFTER_365_DAYS: "AFTER_365_DAYS";
  readonly AFTER_60_DAYS: "AFTER_60_DAYS";
  readonly AFTER_7_DAYS: "AFTER_7_DAYS";
  readonly AFTER_90_DAYS: "AFTER_90_DAYS";
};
export type TransitionToArchiveRules =
  (typeof TransitionToArchiveRules)[keyof typeof TransitionToArchiveRules];
export declare const TransitionToIARules: {
  readonly AFTER_14_DAYS: "AFTER_14_DAYS";
  readonly AFTER_180_DAYS: "AFTER_180_DAYS";
  readonly AFTER_1_DAY: "AFTER_1_DAY";
  readonly AFTER_270_DAYS: "AFTER_270_DAYS";
  readonly AFTER_30_DAYS: "AFTER_30_DAYS";
  readonly AFTER_365_DAYS: "AFTER_365_DAYS";
  readonly AFTER_60_DAYS: "AFTER_60_DAYS";
  readonly AFTER_7_DAYS: "AFTER_7_DAYS";
  readonly AFTER_90_DAYS: "AFTER_90_DAYS";
};
export type TransitionToIARules =
  (typeof TransitionToIARules)[keyof typeof TransitionToIARules];
export declare const TransitionToPrimaryStorageClassRules: {
  readonly AFTER_1_ACCESS: "AFTER_1_ACCESS";
};
export type TransitionToPrimaryStorageClassRules =
  (typeof TransitionToPrimaryStorageClassRules)[keyof typeof TransitionToPrimaryStorageClassRules];
export interface LifecyclePolicy {
  TransitionToIA?: TransitionToIARules | undefined;
  TransitionToPrimaryStorageClass?:
    | TransitionToPrimaryStorageClassRules
    | undefined;
  TransitionToArchive?: TransitionToArchiveRules | undefined;
}
export interface LifecycleConfigurationDescription {
  LifecyclePolicies?: LifecyclePolicy[] | undefined;
}
export interface DescribeMountTargetsRequest {
  MaxItems?: number | undefined;
  Marker?: string | undefined;
  FileSystemId?: string | undefined;
  MountTargetId?: string | undefined;
  AccessPointId?: string | undefined;
}
export interface DescribeMountTargetsResponse {
  Marker?: string | undefined;
  MountTargets?: MountTargetDescription[] | undefined;
  NextMarker?: string | undefined;
}
export interface DescribeMountTargetSecurityGroupsRequest {
  MountTargetId: string | undefined;
}
export interface DescribeMountTargetSecurityGroupsResponse {
  SecurityGroups: string[] | undefined;
}
export declare class IncorrectMountTargetState extends __BaseException {
  readonly name: "IncorrectMountTargetState";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<IncorrectMountTargetState, __BaseException>
  );
}
export interface DescribeReplicationConfigurationsRequest {
  FileSystemId?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DescribeReplicationConfigurationsResponse {
  Replications?: ReplicationConfigurationDescription[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTagsRequest {
  MaxItems?: number | undefined;
  Marker?: string | undefined;
  FileSystemId: string | undefined;
}
export interface DescribeTagsResponse {
  Marker?: string | undefined;
  Tags: Tag[] | undefined;
  NextMarker?: string | undefined;
}
export declare class InvalidPolicyException extends __BaseException {
  readonly name: "InvalidPolicyException";
  readonly $fault: "client";
  ErrorCode?: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<InvalidPolicyException, __BaseException>
  );
}
export interface ListTagsForResourceRequest {
  ResourceId: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[] | undefined;
  NextToken?: string | undefined;
}
export interface ModifyMountTargetSecurityGroupsRequest {
  MountTargetId: string | undefined;
  SecurityGroups?: string[] | undefined;
}
export interface PutAccountPreferencesRequest {
  ResourceIdType: ResourceIdType | undefined;
}
export interface PutAccountPreferencesResponse {
  ResourceIdPreference?: ResourceIdPreference | undefined;
}
export interface PutBackupPolicyRequest {
  FileSystemId: string | undefined;
  BackupPolicy: BackupPolicy | undefined;
}
export interface PutFileSystemPolicyRequest {
  FileSystemId: string | undefined;
  Policy: string | undefined;
  BypassPolicyLockoutSafetyCheck?: boolean | undefined;
}
export interface PutLifecycleConfigurationRequest {
  FileSystemId: string | undefined;
  LifecyclePolicies: LifecyclePolicy[] | undefined;
}
export interface TagResourceRequest {
  ResourceId: string | undefined;
  Tags: Tag[] | undefined;
}
export interface UntagResourceRequest {
  ResourceId: string | undefined;
  TagKeys: string[] | undefined;
}
export declare class TooManyRequests extends __BaseException {
  readonly name: "TooManyRequests";
  readonly $fault: "client";
  ErrorCode: string | undefined;
  Message?: string | undefined;
  constructor(opts: __ExceptionOptionType<TooManyRequests, __BaseException>);
}
export interface UpdateFileSystemRequest {
  FileSystemId: string | undefined;
  ThroughputMode?: ThroughputMode | undefined;
  ProvisionedThroughputInMibps?: number | undefined;
}
export declare class ReplicationAlreadyExists extends __BaseException {
  readonly name: "ReplicationAlreadyExists";
  readonly $fault: "client";
  ErrorCode?: string | undefined;
  Message?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<ReplicationAlreadyExists, __BaseException>
  );
}
export interface UpdateFileSystemProtectionRequest {
  FileSystemId: string | undefined;
  ReplicationOverwriteProtection?: ReplicationOverwriteProtection | undefined;
}
