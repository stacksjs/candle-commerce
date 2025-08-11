import { SENSITIVE_STRING } from "@smithy/smithy-client";
import { EvaluationConfigFilterSensitiveLog, EvaluationModelConfigFilterSensitiveLog, ExternalSourcesRetrieveAndGenerateConfigurationFilterSensitiveLog, GenerationConfigurationFilterSensitiveLog, TrainingDataConfigFilterSensitiveLog, } from "./models_0";
export const ModelCustomizationJobStatus = {
    COMPLETED: "Completed",
    FAILED: "Failed",
    IN_PROGRESS: "InProgress",
    STOPPED: "Stopped",
    STOPPING: "Stopping",
};
export const JobStatusDetails = {
    COMPLETED: "Completed",
    FAILED: "Failed",
    IN_PROGRESS: "InProgress",
    NOT_STARTED: "NotStarted",
    STOPPED: "Stopped",
    STOPPING: "Stopping",
};
export const FineTuningJobStatus = {
    COMPLETED: "Completed",
    FAILED: "Failed",
    IN_PROGRESS: "InProgress",
    STOPPED: "Stopped",
    STOPPING: "Stopping",
};
export var RetrievalFilter;
(function (RetrievalFilter) {
    RetrievalFilter.visit = (value, visitor) => {
        if (value.equals !== undefined)
            return visitor.equals(value.equals);
        if (value.notEquals !== undefined)
            return visitor.notEquals(value.notEquals);
        if (value.greaterThan !== undefined)
            return visitor.greaterThan(value.greaterThan);
        if (value.greaterThanOrEquals !== undefined)
            return visitor.greaterThanOrEquals(value.greaterThanOrEquals);
        if (value.lessThan !== undefined)
            return visitor.lessThan(value.lessThan);
        if (value.lessThanOrEquals !== undefined)
            return visitor.lessThanOrEquals(value.lessThanOrEquals);
        if (value.in !== undefined)
            return visitor.in(value.in);
        if (value.notIn !== undefined)
            return visitor.notIn(value.notIn);
        if (value.startsWith !== undefined)
            return visitor.startsWith(value.startsWith);
        if (value.listContains !== undefined)
            return visitor.listContains(value.listContains);
        if (value.stringContains !== undefined)
            return visitor.stringContains(value.stringContains);
        if (value.andAll !== undefined)
            return visitor.andAll(value.andAll);
        if (value.orAll !== undefined)
            return visitor.orAll(value.orAll);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(RetrievalFilter || (RetrievalFilter = {}));
export var KnowledgeBaseConfig;
(function (KnowledgeBaseConfig) {
    KnowledgeBaseConfig.visit = (value, visitor) => {
        if (value.retrieveConfig !== undefined)
            return visitor.retrieveConfig(value.retrieveConfig);
        if (value.retrieveAndGenerateConfig !== undefined)
            return visitor.retrieveAndGenerateConfig(value.retrieveAndGenerateConfig);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(KnowledgeBaseConfig || (KnowledgeBaseConfig = {}));
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
export const CreateModelCustomizationJobRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.trainingDataConfig && { trainingDataConfig: TrainingDataConfigFilterSensitiveLog(obj.trainingDataConfig) }),
    ...(obj.customizationConfig && { customizationConfig: obj.customizationConfig }),
});
export const GetModelCustomizationJobResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.trainingDataConfig && { trainingDataConfig: TrainingDataConfigFilterSensitiveLog(obj.trainingDataConfig) }),
    ...(obj.customizationConfig && { customizationConfig: obj.customizationConfig }),
});
export const RetrievalFilterFilterSensitiveLog = (obj) => {
    if (obj.equals !== undefined)
        return { equals: obj.equals };
    if (obj.notEquals !== undefined)
        return { notEquals: obj.notEquals };
    if (obj.greaterThan !== undefined)
        return { greaterThan: obj.greaterThan };
    if (obj.greaterThanOrEquals !== undefined)
        return { greaterThanOrEquals: obj.greaterThanOrEquals };
    if (obj.lessThan !== undefined)
        return { lessThan: obj.lessThan };
    if (obj.lessThanOrEquals !== undefined)
        return { lessThanOrEquals: obj.lessThanOrEquals };
    if (obj.in !== undefined)
        return { in: obj.in };
    if (obj.notIn !== undefined)
        return { notIn: obj.notIn };
    if (obj.startsWith !== undefined)
        return { startsWith: obj.startsWith };
    if (obj.listContains !== undefined)
        return { listContains: obj.listContains };
    if (obj.stringContains !== undefined)
        return { stringContains: obj.stringContains };
    if (obj.andAll !== undefined)
        return { andAll: SENSITIVE_STRING };
    if (obj.orAll !== undefined)
        return { orAll: SENSITIVE_STRING };
    if (obj.$unknown !== undefined)
        return { [obj.$unknown[0]]: "UNKNOWN" };
};
export const KnowledgeBaseVectorSearchConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.filter && { filter: SENSITIVE_STRING }),
});
export const KnowledgeBaseRetrievalConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.vectorSearchConfiguration && {
        vectorSearchConfiguration: KnowledgeBaseVectorSearchConfigurationFilterSensitiveLog(obj.vectorSearchConfiguration),
    }),
});
export const KnowledgeBaseRetrieveAndGenerateConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.retrievalConfiguration && {
        retrievalConfiguration: KnowledgeBaseRetrievalConfigurationFilterSensitiveLog(obj.retrievalConfiguration),
    }),
    ...(obj.generationConfiguration && {
        generationConfiguration: GenerationConfigurationFilterSensitiveLog(obj.generationConfiguration),
    }),
});
export const RetrieveConfigFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.knowledgeBaseRetrievalConfiguration && {
        knowledgeBaseRetrievalConfiguration: KnowledgeBaseRetrievalConfigurationFilterSensitiveLog(obj.knowledgeBaseRetrievalConfiguration),
    }),
});
export const RetrieveAndGenerateConfigurationFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.knowledgeBaseConfiguration && {
        knowledgeBaseConfiguration: KnowledgeBaseRetrieveAndGenerateConfigurationFilterSensitiveLog(obj.knowledgeBaseConfiguration),
    }),
    ...(obj.externalSourcesConfiguration && {
        externalSourcesConfiguration: ExternalSourcesRetrieveAndGenerateConfigurationFilterSensitiveLog(obj.externalSourcesConfiguration),
    }),
});
export const KnowledgeBaseConfigFilterSensitiveLog = (obj) => {
    if (obj.retrieveConfig !== undefined)
        return { retrieveConfig: RetrieveConfigFilterSensitiveLog(obj.retrieveConfig) };
    if (obj.retrieveAndGenerateConfig !== undefined)
        return {
            retrieveAndGenerateConfig: RetrieveAndGenerateConfigurationFilterSensitiveLog(obj.retrieveAndGenerateConfig),
        };
    if (obj.$unknown !== undefined)
        return { [obj.$unknown[0]]: "UNKNOWN" };
};
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
