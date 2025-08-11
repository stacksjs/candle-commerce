import { EFSServiceException as __BaseException } from "./EFSServiceException";
export class AccessPointAlreadyExists extends __BaseException {
    name = "AccessPointAlreadyExists";
    $fault = "client";
    ErrorCode;
    Message;
    AccessPointId;
    constructor(opts) {
        super({
            name: "AccessPointAlreadyExists",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, AccessPointAlreadyExists.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
        this.AccessPointId = opts.AccessPointId;
    }
}
export const LifeCycleState = {
    AVAILABLE: "available",
    CREATING: "creating",
    DELETED: "deleted",
    DELETING: "deleting",
    ERROR: "error",
    UPDATING: "updating",
};
export class AccessPointLimitExceeded extends __BaseException {
    name = "AccessPointLimitExceeded";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "AccessPointLimitExceeded",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, AccessPointLimitExceeded.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class AccessPointNotFound extends __BaseException {
    name = "AccessPointNotFound";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "AccessPointNotFound",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, AccessPointNotFound.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class AvailabilityZonesMismatch extends __BaseException {
    name = "AvailabilityZonesMismatch";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "AvailabilityZonesMismatch",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, AvailabilityZonesMismatch.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export const Status = {
    DISABLED: "DISABLED",
    DISABLING: "DISABLING",
    ENABLED: "ENABLED",
    ENABLING: "ENABLING",
};
export class BadRequest extends __BaseException {
    name = "BadRequest";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "BadRequest",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, BadRequest.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class ConflictException extends __BaseException {
    name = "ConflictException";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "ConflictException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ConflictException.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class FileSystemNotFound extends __BaseException {
    name = "FileSystemNotFound";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "FileSystemNotFound",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, FileSystemNotFound.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class IncorrectFileSystemLifeCycleState extends __BaseException {
    name = "IncorrectFileSystemLifeCycleState";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "IncorrectFileSystemLifeCycleState",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, IncorrectFileSystemLifeCycleState.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class InternalServerError extends __BaseException {
    name = "InternalServerError";
    $fault = "server";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "InternalServerError",
            $fault: "server",
            ...opts,
        });
        Object.setPrototypeOf(this, InternalServerError.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class ThrottlingException extends __BaseException {
    name = "ThrottlingException";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "ThrottlingException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ThrottlingException.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export const PerformanceMode = {
    GENERAL_PURPOSE: "generalPurpose",
    MAX_IO: "maxIO",
};
export const ThroughputMode = {
    BURSTING: "bursting",
    ELASTIC: "elastic",
    PROVISIONED: "provisioned",
};
export class FileSystemAlreadyExists extends __BaseException {
    name = "FileSystemAlreadyExists";
    $fault = "client";
    ErrorCode;
    Message;
    FileSystemId;
    constructor(opts) {
        super({
            name: "FileSystemAlreadyExists",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, FileSystemAlreadyExists.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
        this.FileSystemId = opts.FileSystemId;
    }
}
export const ReplicationOverwriteProtection = {
    DISABLED: "DISABLED",
    ENABLED: "ENABLED",
    REPLICATING: "REPLICATING",
};
export class FileSystemLimitExceeded extends __BaseException {
    name = "FileSystemLimitExceeded";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "FileSystemLimitExceeded",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, FileSystemLimitExceeded.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class InsufficientThroughputCapacity extends __BaseException {
    name = "InsufficientThroughputCapacity";
    $fault = "server";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "InsufficientThroughputCapacity",
            $fault: "server",
            ...opts,
        });
        Object.setPrototypeOf(this, InsufficientThroughputCapacity.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class ThroughputLimitExceeded extends __BaseException {
    name = "ThroughputLimitExceeded";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "ThroughputLimitExceeded",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ThroughputLimitExceeded.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class UnsupportedAvailabilityZone extends __BaseException {
    name = "UnsupportedAvailabilityZone";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "UnsupportedAvailabilityZone",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, UnsupportedAvailabilityZone.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export const IpAddressType = {
    DUAL_STACK: "DUAL_STACK",
    IPV4_ONLY: "IPV4_ONLY",
    IPV6_ONLY: "IPV6_ONLY",
};
export class IpAddressInUse extends __BaseException {
    name = "IpAddressInUse";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "IpAddressInUse",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, IpAddressInUse.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class MountTargetConflict extends __BaseException {
    name = "MountTargetConflict";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "MountTargetConflict",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, MountTargetConflict.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class NetworkInterfaceLimitExceeded extends __BaseException {
    name = "NetworkInterfaceLimitExceeded";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "NetworkInterfaceLimitExceeded",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, NetworkInterfaceLimitExceeded.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class NoFreeAddressesInSubnet extends __BaseException {
    name = "NoFreeAddressesInSubnet";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "NoFreeAddressesInSubnet",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, NoFreeAddressesInSubnet.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class SecurityGroupLimitExceeded extends __BaseException {
    name = "SecurityGroupLimitExceeded";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "SecurityGroupLimitExceeded",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, SecurityGroupLimitExceeded.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class SecurityGroupNotFound extends __BaseException {
    name = "SecurityGroupNotFound";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "SecurityGroupNotFound",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, SecurityGroupNotFound.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class SubnetNotFound extends __BaseException {
    name = "SubnetNotFound";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "SubnetNotFound",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, SubnetNotFound.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export const ReplicationStatus = {
    DELETING: "DELETING",
    ENABLED: "ENABLED",
    ENABLING: "ENABLING",
    ERROR: "ERROR",
    PAUSED: "PAUSED",
    PAUSING: "PAUSING",
};
export class ReplicationNotFound extends __BaseException {
    name = "ReplicationNotFound";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "ReplicationNotFound",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ReplicationNotFound.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class ValidationException extends __BaseException {
    name = "ValidationException";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "ValidationException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ValidationException.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class FileSystemInUse extends __BaseException {
    name = "FileSystemInUse";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "FileSystemInUse",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, FileSystemInUse.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class DependencyTimeout extends __BaseException {
    name = "DependencyTimeout";
    $fault = "server";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "DependencyTimeout",
            $fault: "server",
            ...opts,
        });
        Object.setPrototypeOf(this, DependencyTimeout.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class MountTargetNotFound extends __BaseException {
    name = "MountTargetNotFound";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "MountTargetNotFound",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, MountTargetNotFound.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export const DeletionMode = {
    ALL_CONFIGURATIONS: "ALL_CONFIGURATIONS",
    LOCAL_CONFIGURATION_ONLY: "LOCAL_CONFIGURATION_ONLY",
};
export const ResourceIdType = {
    LongId: "LONG_ID",
    ShortId: "SHORT_ID",
};
export const Resource = {
    FileSystem: "FILE_SYSTEM",
    MountTarget: "MOUNT_TARGET",
};
export class PolicyNotFound extends __BaseException {
    name = "PolicyNotFound";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "PolicyNotFound",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, PolicyNotFound.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export const TransitionToArchiveRules = {
    AFTER_14_DAYS: "AFTER_14_DAYS",
    AFTER_180_DAYS: "AFTER_180_DAYS",
    AFTER_1_DAY: "AFTER_1_DAY",
    AFTER_270_DAYS: "AFTER_270_DAYS",
    AFTER_30_DAYS: "AFTER_30_DAYS",
    AFTER_365_DAYS: "AFTER_365_DAYS",
    AFTER_60_DAYS: "AFTER_60_DAYS",
    AFTER_7_DAYS: "AFTER_7_DAYS",
    AFTER_90_DAYS: "AFTER_90_DAYS",
};
export const TransitionToIARules = {
    AFTER_14_DAYS: "AFTER_14_DAYS",
    AFTER_180_DAYS: "AFTER_180_DAYS",
    AFTER_1_DAY: "AFTER_1_DAY",
    AFTER_270_DAYS: "AFTER_270_DAYS",
    AFTER_30_DAYS: "AFTER_30_DAYS",
    AFTER_365_DAYS: "AFTER_365_DAYS",
    AFTER_60_DAYS: "AFTER_60_DAYS",
    AFTER_7_DAYS: "AFTER_7_DAYS",
    AFTER_90_DAYS: "AFTER_90_DAYS",
};
export const TransitionToPrimaryStorageClassRules = {
    AFTER_1_ACCESS: "AFTER_1_ACCESS",
};
export class IncorrectMountTargetState extends __BaseException {
    name = "IncorrectMountTargetState";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "IncorrectMountTargetState",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, IncorrectMountTargetState.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class InvalidPolicyException extends __BaseException {
    name = "InvalidPolicyException";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "InvalidPolicyException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidPolicyException.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class TooManyRequests extends __BaseException {
    name = "TooManyRequests";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "TooManyRequests",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, TooManyRequests.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
export class ReplicationAlreadyExists extends __BaseException {
    name = "ReplicationAlreadyExists";
    $fault = "client";
    ErrorCode;
    Message;
    constructor(opts) {
        super({
            name: "ReplicationAlreadyExists",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ReplicationAlreadyExists.prototype);
        this.ErrorCode = opts.ErrorCode;
        this.Message = opts.Message;
    }
}
