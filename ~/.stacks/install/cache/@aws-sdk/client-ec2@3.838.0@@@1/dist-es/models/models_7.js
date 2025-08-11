import { SENSITIVE_STRING } from "@smithy/smithy-client";
import { VerifiedAccessTrustProviderFilterSensitiveLog, } from "./models_0";
import { VpnConnectionFilterSensitiveLog, } from "./models_3";
import { ConversionTaskFilterSensitiveLog, SnapshotDetailFilterSensitiveLog, SnapshotTaskDetailFilterSensitiveLog, } from "./models_4";
export const LockMode = {
    compliance: "compliance",
    governance: "governance",
};
export const ModifyAvailabilityZoneOptInStatus = {
    not_opted_in: "not-opted-in",
    opted_in: "opted-in",
};
export const OperationType = {
    add: "add",
    remove: "remove",
};
export const UnsuccessfulInstanceCreditSpecificationErrorCode = {
    INCORRECT_INSTANCE_STATE: "IncorrectInstanceState",
    INSTANCE_CREDIT_SPECIFICATION_NOT_SUPPORTED: "InstanceCreditSpecification.NotSupported",
    INSTANCE_NOT_FOUND: "InvalidInstanceID.NotFound",
    INVALID_INSTANCE_ID: "InvalidInstanceID.Malformed",
};
export const DefaultInstanceMetadataEndpointState = {
    disabled: "disabled",
    enabled: "enabled",
    no_preference: "no-preference",
};
export const MetadataDefaultHttpTokensState = {
    no_preference: "no-preference",
    optional: "optional",
    required: "required",
};
export const DefaultInstanceMetadataTagsState = {
    disabled: "disabled",
    enabled: "enabled",
    no_preference: "no-preference",
};
export const HostTenancy = {
    dedicated: "dedicated",
    default: "default",
    host: "host",
};
export const PublicIpDnsOption = {
    public_dual_stack_dns_name: "public-dual-stack-dns-name",
    public_ipv4_dns_name: "public-ipv4-dns-name",
    public_ipv6_dns_name: "public-ipv6-dns-name",
};
export const TargetStorageTier = {
    archive: "archive",
};
export const TrafficMirrorFilterRuleField = {
    description: "description",
    destination_port_range: "destination-port-range",
    protocol: "protocol",
    source_port_range: "source-port-range",
};
export const TrafficMirrorSessionField = {
    description: "description",
    packet_length: "packet-length",
    virtual_network_id: "virtual-network-id",
};
export const VpcTenancy = {
    default: "default",
};
export const Status = {
    inClassic: "InClassic",
    inVpc: "InVpc",
    moveInProgress: "MoveInProgress",
};
export const VerificationMethod = {
    dns_token: "dns-token",
    remarks_x509: "remarks-x509",
};
export const GetVpnConnectionDeviceSampleConfigurationResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.VpnConnectionDeviceSampleConfiguration && { VpnConnectionDeviceSampleConfiguration: SENSITIVE_STRING }),
});
export const ImageDiskContainerFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Url && { Url: SENSITIVE_STRING }),
});
export const ImportImageRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.DiskContainers && {
        DiskContainers: obj.DiskContainers.map((item) => ImageDiskContainerFilterSensitiveLog(item)),
    }),
});
export const ImportImageResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.SnapshotDetails && {
        SnapshotDetails: obj.SnapshotDetails.map((item) => SnapshotDetailFilterSensitiveLog(item)),
    }),
});
export const DiskImageDetailFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.ImportManifestUrl && { ImportManifestUrl: SENSITIVE_STRING }),
});
export const DiskImageFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Image && { Image: DiskImageDetailFilterSensitiveLog(obj.Image) }),
});
export const UserDataFilterSensitiveLog = (obj) => ({
    ...obj,
});
export const ImportInstanceLaunchSpecificationFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.UserData && { UserData: SENSITIVE_STRING }),
});
export const ImportInstanceRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.LaunchSpecification && {
        LaunchSpecification: ImportInstanceLaunchSpecificationFilterSensitiveLog(obj.LaunchSpecification),
    }),
    ...(obj.DiskImages && { DiskImages: obj.DiskImages.map((item) => DiskImageFilterSensitiveLog(item)) }),
});
export const ImportInstanceResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.ConversionTask && { ConversionTask: ConversionTaskFilterSensitiveLog(obj.ConversionTask) }),
});
export const SnapshotDiskContainerFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Url && { Url: SENSITIVE_STRING }),
});
export const ImportSnapshotRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.DiskContainer && { DiskContainer: SnapshotDiskContainerFilterSensitiveLog(obj.DiskContainer) }),
});
export const ImportSnapshotResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.SnapshotTaskDetail && { SnapshotTaskDetail: SnapshotTaskDetailFilterSensitiveLog(obj.SnapshotTaskDetail) }),
});
export const ImportVolumeRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Image && { Image: DiskImageDetailFilterSensitiveLog(obj.Image) }),
});
export const ImportVolumeResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.ConversionTask && { ConversionTask: ConversionTaskFilterSensitiveLog(obj.ConversionTask) }),
});
export const ModifyVerifiedAccessNativeApplicationOidcOptionsFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.ClientSecret && { ClientSecret: SENSITIVE_STRING }),
});
export const ModifyVerifiedAccessTrustProviderOidcOptionsFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.ClientSecret && { ClientSecret: SENSITIVE_STRING }),
});
export const ModifyVerifiedAccessTrustProviderRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.OidcOptions && {
        OidcOptions: ModifyVerifiedAccessTrustProviderOidcOptionsFilterSensitiveLog(obj.OidcOptions),
    }),
    ...(obj.NativeApplicationOidcOptions && {
        NativeApplicationOidcOptions: ModifyVerifiedAccessNativeApplicationOidcOptionsFilterSensitiveLog(obj.NativeApplicationOidcOptions),
    }),
});
export const ModifyVerifiedAccessTrustProviderResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.VerifiedAccessTrustProvider && {
        VerifiedAccessTrustProvider: VerifiedAccessTrustProviderFilterSensitiveLog(obj.VerifiedAccessTrustProvider),
    }),
});
export const ModifyVpnConnectionResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.VpnConnection && { VpnConnection: VpnConnectionFilterSensitiveLog(obj.VpnConnection) }),
});
export const ModifyVpnConnectionOptionsResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.VpnConnection && { VpnConnection: VpnConnectionFilterSensitiveLog(obj.VpnConnection) }),
});
export const ModifyVpnTunnelCertificateResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.VpnConnection && { VpnConnection: VpnConnectionFilterSensitiveLog(obj.VpnConnection) }),
});
export const ModifyVpnTunnelOptionsSpecificationFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.PreSharedKey && { PreSharedKey: SENSITIVE_STRING }),
});
export const ModifyVpnTunnelOptionsRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.TunnelOptions && { TunnelOptions: SENSITIVE_STRING }),
});
export const ModifyVpnTunnelOptionsResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.VpnConnection && { VpnConnection: VpnConnectionFilterSensitiveLog(obj.VpnConnection) }),
});
