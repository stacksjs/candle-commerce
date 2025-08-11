import { SENSITIVE_STRING } from "@smithy/smithy-client";
import { EvaluationConfigFilterSensitiveLog, EvaluationModelConfigFilterSensitiveLog, KnowledgeBaseConfigFilterSensitiveLog, } from "./models_0";
export var RAGConfig;
(function (RAGConfig) {
    RAGConfig.visit = (value, visitor) => {
        if (value.knowledgeBaseConfig !== undefined)
            return visitor.knowledgeBaseConfig(value.knowledgeBaseConfig);
        if (value.precomputedRagSourceConfig !== undefined)
            return visitor.precomputedRagSourceConfig(value.precomputedRagSourceConfig);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(RAGConfig || (RAGConfig = {}));
export var EvaluationInferenceConfig;
(function (EvaluationInferenceConfig) {
    EvaluationInferenceConfig.visit = (value, visitor) => {
        if (value.models !== undefined)
            return visitor.models(value.models);
        if (value.ragConfigs !== undefined)
            return visitor.ragConfigs(value.ragConfigs);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(EvaluationInferenceConfig || (EvaluationInferenceConfig = {}));
export const RAGConfigFilterSensitiveLog = (obj) => {
    if (obj.knowledgeBaseConfig !== undefined)
        return { knowledgeBaseConfig: KnowledgeBaseConfigFilterSensitiveLog(obj.knowledgeBaseConfig) };
    if (obj.precomputedRagSourceConfig !== undefined)
        return { precomputedRagSourceConfig: obj.precomputedRagSourceConfig };
    if (obj.$unknown !== undefined)
        return { [obj.$unknown[0]]: "UNKNOWN" };
};
export const EvaluationInferenceConfigFilterSensitiveLog = (obj) => {
    if (obj.models !== undefined)
        return { models: obj.models.map((item) => EvaluationModelConfigFilterSensitiveLog(item)) };
    if (obj.ragConfigs !== undefined)
        return { ragConfigs: obj.ragConfigs.map((item) => RAGConfigFilterSensitiveLog(item)) };
    if (obj.$unknown !== undefined)
        return { [obj.$unknown[0]]: "UNKNOWN" };
};
export const CreateEvaluationJobRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.jobDescription && { jobDescription: SENSITIVE_STRING }),
    ...(obj.evaluationConfig && { evaluationConfig: EvaluationConfigFilterSensitiveLog(obj.evaluationConfig) }),
    ...(obj.inferenceConfig && { inferenceConfig: EvaluationInferenceConfigFilterSensitiveLog(obj.inferenceConfig) }),
});
export const GetEvaluationJobResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.jobDescription && { jobDescription: SENSITIVE_STRING }),
    ...(obj.evaluationConfig && { evaluationConfig: EvaluationConfigFilterSensitiveLog(obj.evaluationConfig) }),
    ...(obj.inferenceConfig && { inferenceConfig: EvaluationInferenceConfigFilterSensitiveLog(obj.inferenceConfig) }),
});
