import { SENSITIVE_STRING } from "@smithy/smithy-client";
import { EvaluationConfigFilterSensitiveLog, EvaluationInferenceConfigFilterSensitiveLog, } from "./models_0";
export const GetEvaluationJobResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.jobDescription && { jobDescription: SENSITIVE_STRING }),
    ...(obj.evaluationConfig && { evaluationConfig: EvaluationConfigFilterSensitiveLog(obj.evaluationConfig) }),
    ...(obj.inferenceConfig && { inferenceConfig: EvaluationInferenceConfigFilterSensitiveLog(obj.inferenceConfig) }),
});
