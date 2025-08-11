import { SENSITIVE_STRING } from "@smithy/smithy-client";
import { CloudFrontServiceException as __BaseException } from "./CloudFrontServiceException";
import { DistributionConfigFilterSensitiveLog, DistributionFilterSensitiveLog, } from "./models_0";
export class TestFunctionFailed extends __BaseException {
    name = "TestFunctionFailed";
    $fault = "server";
    Message;
    constructor(opts) {
        super({
            name: "TestFunctionFailed",
            $fault: "server",
            ...opts,
        });
        Object.setPrototypeOf(this, TestFunctionFailed.prototype);
        this.Message = opts.Message;
    }
}
export const DnsConfigurationStatus = {
    Invalid: "invalid-configuration",
    Unknown: "unknown-configuration",
    Valid: "valid-configuration",
};
export const TestFunctionRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.EventObject && { EventObject: SENSITIVE_STRING }),
});
export const TestResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.FunctionExecutionLogs && { FunctionExecutionLogs: SENSITIVE_STRING }),
    ...(obj.FunctionErrorMessage && { FunctionErrorMessage: SENSITIVE_STRING }),
    ...(obj.FunctionOutput && { FunctionOutput: SENSITIVE_STRING }),
});
export const TestFunctionResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.TestResult && { TestResult: TestResultFilterSensitiveLog(obj.TestResult) }),
});
export const UpdateDistributionRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.DistributionConfig && { DistributionConfig: DistributionConfigFilterSensitiveLog(obj.DistributionConfig) }),
});
export const UpdateDistributionResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Distribution && { Distribution: DistributionFilterSensitiveLog(obj.Distribution) }),
});
export const UpdateDistributionWithStagingConfigResultFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.Distribution && { Distribution: DistributionFilterSensitiveLog(obj.Distribution) }),
});
export const UpdateFunctionRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.FunctionCode && { FunctionCode: SENSITIVE_STRING }),
});
