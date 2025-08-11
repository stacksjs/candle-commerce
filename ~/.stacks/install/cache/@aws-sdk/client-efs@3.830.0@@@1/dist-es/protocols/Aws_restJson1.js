import { loadRestJsonErrorCode, parseJsonBody as parseBody, parseJsonErrorBody as parseErrorBody } from "@aws-sdk/core";
import { requestBuilder as rb } from "@smithy/core";
import { _json, collectBody, decorateServiceException as __decorateServiceException, expectBoolean as __expectBoolean, expectInt32 as __expectInt32, expectLong as __expectLong, expectNonNull as __expectNonNull, expectNumber as __expectNumber, expectObject as __expectObject, expectString as __expectString, limitedParseDouble as __limitedParseDouble, map, parseEpochTimestamp as __parseEpochTimestamp, serializeFloat as __serializeFloat, take, withBaseException, } from "@smithy/smithy-client";
import { v4 as generateIdempotencyToken } from "uuid";
import { EFSServiceException as __BaseException } from "../models/EFSServiceException";
import { AccessPointAlreadyExists, AccessPointLimitExceeded, AccessPointNotFound, AvailabilityZonesMismatch, BadRequest, ConflictException, DependencyTimeout, FileSystemAlreadyExists, FileSystemInUse, FileSystemLimitExceeded, FileSystemNotFound, IncorrectFileSystemLifeCycleState, IncorrectMountTargetState, InsufficientThroughputCapacity, InternalServerError, InvalidPolicyException, IpAddressInUse, MountTargetConflict, MountTargetNotFound, NetworkInterfaceLimitExceeded, NoFreeAddressesInSubnet, PolicyNotFound, ReplicationAlreadyExists, ReplicationNotFound, SecurityGroupLimitExceeded, SecurityGroupNotFound, SubnetNotFound, ThrottlingException, ThroughputLimitExceeded, TooManyRequests, UnsupportedAvailabilityZone, ValidationException, } from "../models/models_0";
export const se_CreateAccessPointCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/2015-02-01/access-points");
    let body;
    body = JSON.stringify(take(input, {
        ClientToken: [true, (_) => _ ?? generateIdempotencyToken()],
        FileSystemId: [],
        PosixUser: (_) => _json(_),
        RootDirectory: (_) => _json(_),
        Tags: (_) => _json(_),
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
};
export const se_CreateFileSystemCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/2015-02-01/file-systems");
    let body;
    body = JSON.stringify(take(input, {
        AvailabilityZoneName: [],
        Backup: [],
        CreationToken: [true, (_) => _ ?? generateIdempotencyToken()],
        Encrypted: [],
        KmsKeyId: [],
        PerformanceMode: [],
        ProvisionedThroughputInMibps: (_) => __serializeFloat(_),
        Tags: (_) => _json(_),
        ThroughputMode: [],
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
};
export const se_CreateMountTargetCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/2015-02-01/mount-targets");
    let body;
    body = JSON.stringify(take(input, {
        FileSystemId: [],
        IpAddress: [],
        IpAddressType: [],
        Ipv6Address: [],
        SecurityGroups: (_) => _json(_),
        SubnetId: [],
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
};
export const se_CreateReplicationConfigurationCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/2015-02-01/file-systems/{SourceFileSystemId}/replication-configuration");
    b.p("SourceFileSystemId", () => input.SourceFileSystemId, "{SourceFileSystemId}", false);
    let body;
    body = JSON.stringify(take(input, {
        Destinations: (_) => _json(_),
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
};
export const se_CreateTagsCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/2015-02-01/create-tags/{FileSystemId}");
    b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
    let body;
    body = JSON.stringify(take(input, {
        Tags: (_) => _json(_),
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
};
export const se_DeleteAccessPointCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/access-points/{AccessPointId}");
    b.p("AccessPointId", () => input.AccessPointId, "{AccessPointId}", false);
    let body;
    b.m("DELETE").h(headers).b(body);
    return b.build();
};
export const se_DeleteFileSystemCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/file-systems/{FileSystemId}");
    b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
    let body;
    b.m("DELETE").h(headers).b(body);
    return b.build();
};
export const se_DeleteFileSystemPolicyCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/file-systems/{FileSystemId}/policy");
    b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
    let body;
    b.m("DELETE").h(headers).b(body);
    return b.build();
};
export const se_DeleteMountTargetCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/mount-targets/{MountTargetId}");
    b.p("MountTargetId", () => input.MountTargetId, "{MountTargetId}", false);
    let body;
    b.m("DELETE").h(headers).b(body);
    return b.build();
};
export const se_DeleteReplicationConfigurationCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/file-systems/{SourceFileSystemId}/replication-configuration");
    b.p("SourceFileSystemId", () => input.SourceFileSystemId, "{SourceFileSystemId}", false);
    const query = map({
        [_dM]: [, input[_DM]],
    });
    let body;
    b.m("DELETE").h(headers).q(query).b(body);
    return b.build();
};
export const se_DeleteTagsCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/2015-02-01/delete-tags/{FileSystemId}");
    b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
    let body;
    body = JSON.stringify(take(input, {
        TagKeys: (_) => _json(_),
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
};
export const se_DescribeAccessPointsCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/access-points");
    const query = map({
        [_MR]: [() => input.MaxResults !== void 0, () => input[_MR].toString()],
        [_NT]: [, input[_NT]],
        [_API]: [, input[_API]],
        [_FSI]: [, input[_FSI]],
    });
    let body;
    b.m("GET").h(headers).q(query).b(body);
    return b.build();
};
export const se_DescribeAccountPreferencesCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/2015-02-01/account-preferences");
    let body;
    body = JSON.stringify(take(input, {
        MaxResults: [],
        NextToken: [],
    }));
    b.m("GET").h(headers).b(body);
    return b.build();
};
export const se_DescribeBackupPolicyCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/file-systems/{FileSystemId}/backup-policy");
    b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
    let body;
    b.m("GET").h(headers).b(body);
    return b.build();
};
export const se_DescribeFileSystemPolicyCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/file-systems/{FileSystemId}/policy");
    b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
    let body;
    b.m("GET").h(headers).b(body);
    return b.build();
};
export const se_DescribeFileSystemsCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/file-systems");
    const query = map({
        [_MI]: [() => input.MaxItems !== void 0, () => input[_MI].toString()],
        [_M]: [, input[_M]],
        [_CT]: [, input[_CT]],
        [_FSI]: [, input[_FSI]],
    });
    let body;
    b.m("GET").h(headers).q(query).b(body);
    return b.build();
};
export const se_DescribeLifecycleConfigurationCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/file-systems/{FileSystemId}/lifecycle-configuration");
    b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
    let body;
    b.m("GET").h(headers).b(body);
    return b.build();
};
export const se_DescribeMountTargetsCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/mount-targets");
    const query = map({
        [_MI]: [() => input.MaxItems !== void 0, () => input[_MI].toString()],
        [_M]: [, input[_M]],
        [_FSI]: [, input[_FSI]],
        [_MTI]: [, input[_MTI]],
        [_API]: [, input[_API]],
    });
    let body;
    b.m("GET").h(headers).q(query).b(body);
    return b.build();
};
export const se_DescribeMountTargetSecurityGroupsCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/mount-targets/{MountTargetId}/security-groups");
    b.p("MountTargetId", () => input.MountTargetId, "{MountTargetId}", false);
    let body;
    b.m("GET").h(headers).b(body);
    return b.build();
};
export const se_DescribeReplicationConfigurationsCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/file-systems/replication-configurations");
    const query = map({
        [_FSI]: [, input[_FSI]],
        [_NT]: [, input[_NT]],
        [_MR]: [() => input.MaxResults !== void 0, () => input[_MR].toString()],
    });
    let body;
    b.m("GET").h(headers).q(query).b(body);
    return b.build();
};
export const se_DescribeTagsCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/tags/{FileSystemId}");
    b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
    const query = map({
        [_MI]: [() => input.MaxItems !== void 0, () => input[_MI].toString()],
        [_M]: [, input[_M]],
    });
    let body;
    b.m("GET").h(headers).q(query).b(body);
    return b.build();
};
export const se_ListTagsForResourceCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/resource-tags/{ResourceId}");
    b.p("ResourceId", () => input.ResourceId, "{ResourceId}", false);
    const query = map({
        [_MR]: [() => input.MaxResults !== void 0, () => input[_MR].toString()],
        [_NT]: [, input[_NT]],
    });
    let body;
    b.m("GET").h(headers).q(query).b(body);
    return b.build();
};
export const se_ModifyMountTargetSecurityGroupsCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/2015-02-01/mount-targets/{MountTargetId}/security-groups");
    b.p("MountTargetId", () => input.MountTargetId, "{MountTargetId}", false);
    let body;
    body = JSON.stringify(take(input, {
        SecurityGroups: (_) => _json(_),
    }));
    b.m("PUT").h(headers).b(body);
    return b.build();
};
export const se_PutAccountPreferencesCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/2015-02-01/account-preferences");
    let body;
    body = JSON.stringify(take(input, {
        ResourceIdType: [],
    }));
    b.m("PUT").h(headers).b(body);
    return b.build();
};
export const se_PutBackupPolicyCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/2015-02-01/file-systems/{FileSystemId}/backup-policy");
    b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
    let body;
    body = JSON.stringify(take(input, {
        BackupPolicy: (_) => _json(_),
    }));
    b.m("PUT").h(headers).b(body);
    return b.build();
};
export const se_PutFileSystemPolicyCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/2015-02-01/file-systems/{FileSystemId}/policy");
    b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
    let body;
    body = JSON.stringify(take(input, {
        BypassPolicyLockoutSafetyCheck: [],
        Policy: [],
    }));
    b.m("PUT").h(headers).b(body);
    return b.build();
};
export const se_PutLifecycleConfigurationCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/2015-02-01/file-systems/{FileSystemId}/lifecycle-configuration");
    b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
    let body;
    body = JSON.stringify(take(input, {
        LifecyclePolicies: (_) => _json(_),
    }));
    b.m("PUT").h(headers).b(body);
    return b.build();
};
export const se_TagResourceCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/2015-02-01/resource-tags/{ResourceId}");
    b.p("ResourceId", () => input.ResourceId, "{ResourceId}", false);
    let body;
    body = JSON.stringify(take(input, {
        Tags: (_) => _json(_),
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
};
export const se_UntagResourceCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {};
    b.bp("/2015-02-01/resource-tags/{ResourceId}");
    b.p("ResourceId", () => input.ResourceId, "{ResourceId}", false);
    const query = map({
        [_tK]: [__expectNonNull(input.TagKeys, `TagKeys`) != null, () => input[_TK] || []],
    });
    let body;
    b.m("DELETE").h(headers).q(query).b(body);
    return b.build();
};
export const se_UpdateFileSystemCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/2015-02-01/file-systems/{FileSystemId}");
    b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
    let body;
    body = JSON.stringify(take(input, {
        ProvisionedThroughputInMibps: (_) => __serializeFloat(_),
        ThroughputMode: [],
    }));
    b.m("PUT").h(headers).b(body);
    return b.build();
};
export const se_UpdateFileSystemProtectionCommand = async (input, context) => {
    const b = rb(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/2015-02-01/file-systems/{FileSystemId}/protection");
    b.p("FileSystemId", () => input.FileSystemId, "{FileSystemId}", false);
    let body;
    body = JSON.stringify(take(input, {
        ReplicationOverwriteProtection: [],
    }));
    b.m("PUT").h(headers).b(body);
    return b.build();
};
export const de_CreateAccessPointCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        AccessPointArn: __expectString,
        AccessPointId: __expectString,
        ClientToken: __expectString,
        FileSystemId: __expectString,
        LifeCycleState: __expectString,
        Name: __expectString,
        OwnerId: __expectString,
        PosixUser: _json,
        RootDirectory: _json,
        Tags: _json,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_CreateFileSystemCommand = async (output, context) => {
    if (output.statusCode !== 201 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        AvailabilityZoneId: __expectString,
        AvailabilityZoneName: __expectString,
        CreationTime: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        CreationToken: __expectString,
        Encrypted: __expectBoolean,
        FileSystemArn: __expectString,
        FileSystemId: __expectString,
        FileSystemProtection: _json,
        KmsKeyId: __expectString,
        LifeCycleState: __expectString,
        Name: __expectString,
        NumberOfMountTargets: __expectInt32,
        OwnerId: __expectString,
        PerformanceMode: __expectString,
        ProvisionedThroughputInMibps: __limitedParseDouble,
        SizeInBytes: (_) => de_FileSystemSize(_, context),
        Tags: _json,
        ThroughputMode: __expectString,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_CreateMountTargetCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        AvailabilityZoneId: __expectString,
        AvailabilityZoneName: __expectString,
        FileSystemId: __expectString,
        IpAddress: __expectString,
        Ipv6Address: __expectString,
        LifeCycleState: __expectString,
        MountTargetId: __expectString,
        NetworkInterfaceId: __expectString,
        OwnerId: __expectString,
        SubnetId: __expectString,
        VpcId: __expectString,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_CreateReplicationConfigurationCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        CreationTime: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        Destinations: (_) => de_Destinations(_, context),
        OriginalSourceFileSystemArn: __expectString,
        SourceFileSystemArn: __expectString,
        SourceFileSystemId: __expectString,
        SourceFileSystemOwnerId: __expectString,
        SourceFileSystemRegion: __expectString,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_CreateTagsCommand = async (output, context) => {
    if (output.statusCode !== 204 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    await collectBody(output.body, context);
    return contents;
};
export const de_DeleteAccessPointCommand = async (output, context) => {
    if (output.statusCode !== 204 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    await collectBody(output.body, context);
    return contents;
};
export const de_DeleteFileSystemCommand = async (output, context) => {
    if (output.statusCode !== 204 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    await collectBody(output.body, context);
    return contents;
};
export const de_DeleteFileSystemPolicyCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    await collectBody(output.body, context);
    return contents;
};
export const de_DeleteMountTargetCommand = async (output, context) => {
    if (output.statusCode !== 204 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    await collectBody(output.body, context);
    return contents;
};
export const de_DeleteReplicationConfigurationCommand = async (output, context) => {
    if (output.statusCode !== 204 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    await collectBody(output.body, context);
    return contents;
};
export const de_DeleteTagsCommand = async (output, context) => {
    if (output.statusCode !== 204 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    await collectBody(output.body, context);
    return contents;
};
export const de_DescribeAccessPointsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        AccessPoints: _json,
        NextToken: __expectString,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_DescribeAccountPreferencesCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        NextToken: __expectString,
        ResourceIdPreference: _json,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_DescribeBackupPolicyCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        BackupPolicy: _json,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_DescribeFileSystemPolicyCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        FileSystemId: __expectString,
        Policy: __expectString,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_DescribeFileSystemsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        FileSystems: (_) => de_FileSystemDescriptions(_, context),
        Marker: __expectString,
        NextMarker: __expectString,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_DescribeLifecycleConfigurationCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        LifecyclePolicies: _json,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_DescribeMountTargetsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        Marker: __expectString,
        MountTargets: _json,
        NextMarker: __expectString,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_DescribeMountTargetSecurityGroupsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        SecurityGroups: _json,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_DescribeReplicationConfigurationsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        NextToken: __expectString,
        Replications: (_) => de_ReplicationConfigurationDescriptions(_, context),
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_DescribeTagsCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        Marker: __expectString,
        NextMarker: __expectString,
        Tags: _json,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_ListTagsForResourceCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        NextToken: __expectString,
        Tags: _json,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_ModifyMountTargetSecurityGroupsCommand = async (output, context) => {
    if (output.statusCode !== 204 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    await collectBody(output.body, context);
    return contents;
};
export const de_PutAccountPreferencesCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        ResourceIdPreference: _json,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_PutBackupPolicyCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        BackupPolicy: _json,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_PutFileSystemPolicyCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        FileSystemId: __expectString,
        Policy: __expectString,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_PutLifecycleConfigurationCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        LifecyclePolicies: _json,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_TagResourceCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    await collectBody(output.body, context);
    return contents;
};
export const de_UntagResourceCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    await collectBody(output.body, context);
    return contents;
};
export const de_UpdateFileSystemCommand = async (output, context) => {
    if (output.statusCode !== 202 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        AvailabilityZoneId: __expectString,
        AvailabilityZoneName: __expectString,
        CreationTime: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        CreationToken: __expectString,
        Encrypted: __expectBoolean,
        FileSystemArn: __expectString,
        FileSystemId: __expectString,
        FileSystemProtection: _json,
        KmsKeyId: __expectString,
        LifeCycleState: __expectString,
        Name: __expectString,
        NumberOfMountTargets: __expectInt32,
        OwnerId: __expectString,
        PerformanceMode: __expectString,
        ProvisionedThroughputInMibps: __limitedParseDouble,
        SizeInBytes: (_) => de_FileSystemSize(_, context),
        Tags: _json,
        ThroughputMode: __expectString,
    });
    Object.assign(contents, doc);
    return contents;
};
export const de_UpdateFileSystemProtectionCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = map({
        $metadata: deserializeMetadata(output),
    });
    const data = __expectNonNull(__expectObject(await parseBody(output.body, context)), "body");
    const doc = take(data, {
        ReplicationOverwriteProtection: __expectString,
    });
    Object.assign(contents, doc);
    return contents;
};
const de_CommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await parseErrorBody(output.body, context),
    };
    const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
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
                errorCode,
            });
    }
};
const throwDefaultError = withBaseException(__BaseException);
const de_AccessPointAlreadyExistsRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        AccessPointId: __expectString,
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new AccessPointAlreadyExists({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_AccessPointLimitExceededRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new AccessPointLimitExceeded({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_AccessPointNotFoundRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new AccessPointNotFound({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_AvailabilityZonesMismatchRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new AvailabilityZonesMismatch({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_BadRequestRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new BadRequest({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_ConflictExceptionRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new ConflictException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_DependencyTimeoutRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new DependencyTimeout({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_FileSystemAlreadyExistsRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        FileSystemId: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new FileSystemAlreadyExists({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_FileSystemInUseRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new FileSystemInUse({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_FileSystemLimitExceededRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new FileSystemLimitExceeded({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_FileSystemNotFoundRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new FileSystemNotFound({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_IncorrectFileSystemLifeCycleStateRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new IncorrectFileSystemLifeCycleState({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_IncorrectMountTargetStateRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new IncorrectMountTargetState({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_InsufficientThroughputCapacityRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new InsufficientThroughputCapacity({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_InternalServerErrorRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new InternalServerError({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_InvalidPolicyExceptionRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new InvalidPolicyException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_IpAddressInUseRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new IpAddressInUse({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_MountTargetConflictRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new MountTargetConflict({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_MountTargetNotFoundRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new MountTargetNotFound({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_NetworkInterfaceLimitExceededRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new NetworkInterfaceLimitExceeded({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_NoFreeAddressesInSubnetRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new NoFreeAddressesInSubnet({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_PolicyNotFoundRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new PolicyNotFound({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_ReplicationAlreadyExistsRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new ReplicationAlreadyExists({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_ReplicationNotFoundRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new ReplicationNotFound({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_SecurityGroupLimitExceededRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new SecurityGroupLimitExceeded({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_SecurityGroupNotFoundRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new SecurityGroupNotFound({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_SubnetNotFoundRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new SubnetNotFound({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_ThrottlingExceptionRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new ThrottlingException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_ThroughputLimitExceededRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new ThroughputLimitExceeded({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_TooManyRequestsRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new TooManyRequests({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_UnsupportedAvailabilityZoneRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new UnsupportedAvailabilityZone({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_ValidationExceptionRes = async (parsedOutput, context) => {
    const contents = map({});
    const data = parsedOutput.body;
    const doc = take(data, {
        ErrorCode: __expectString,
        Message: __expectString,
    });
    Object.assign(contents, doc);
    const exception = new ValidationException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return __decorateServiceException(exception, parsedOutput.body);
};
const de_Destination = (output, context) => {
    return take(output, {
        FileSystemId: __expectString,
        LastReplicatedTimestamp: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        OwnerId: __expectString,
        Region: __expectString,
        RoleArn: __expectString,
        Status: __expectString,
        StatusMessage: __expectString,
    });
};
const de_Destinations = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_Destination(entry, context);
    });
    return retVal;
};
const de_FileSystemDescription = (output, context) => {
    return take(output, {
        AvailabilityZoneId: __expectString,
        AvailabilityZoneName: __expectString,
        CreationTime: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        CreationToken: __expectString,
        Encrypted: __expectBoolean,
        FileSystemArn: __expectString,
        FileSystemId: __expectString,
        FileSystemProtection: _json,
        KmsKeyId: __expectString,
        LifeCycleState: __expectString,
        Name: __expectString,
        NumberOfMountTargets: __expectInt32,
        OwnerId: __expectString,
        PerformanceMode: __expectString,
        ProvisionedThroughputInMibps: __limitedParseDouble,
        SizeInBytes: (_) => de_FileSystemSize(_, context),
        Tags: _json,
        ThroughputMode: __expectString,
    });
};
const de_FileSystemDescriptions = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_FileSystemDescription(entry, context);
    });
    return retVal;
};
const de_FileSystemSize = (output, context) => {
    return take(output, {
        Timestamp: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        Value: __expectLong,
        ValueInArchive: __expectLong,
        ValueInIA: __expectLong,
        ValueInStandard: __expectLong,
    });
};
const de_ReplicationConfigurationDescription = (output, context) => {
    return take(output, {
        CreationTime: (_) => __expectNonNull(__parseEpochTimestamp(__expectNumber(_))),
        Destinations: (_) => de_Destinations(_, context),
        OriginalSourceFileSystemArn: __expectString,
        SourceFileSystemArn: __expectString,
        SourceFileSystemId: __expectString,
        SourceFileSystemOwnerId: __expectString,
        SourceFileSystemRegion: __expectString,
    });
};
const de_ReplicationConfigurationDescriptions = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_ReplicationConfigurationDescription(entry, context);
    });
    return retVal;
};
const deserializeMetadata = (output) => ({
    httpStatusCode: output.statusCode,
    requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"],
});
const collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => context.utf8Encoder(body));
const _API = "AccessPointId";
const _CT = "CreationToken";
const _DM = "DeletionMode";
const _FSI = "FileSystemId";
const _M = "Marker";
const _MI = "MaxItems";
const _MR = "MaxResults";
const _MTI = "MountTargetId";
const _NT = "NextToken";
const _TK = "TagKeys";
const _dM = "deletionMode";
const _tK = "tagKeys";
