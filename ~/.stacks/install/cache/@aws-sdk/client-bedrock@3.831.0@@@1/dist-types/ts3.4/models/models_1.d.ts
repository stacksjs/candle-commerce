import {
  ApplicationType,
  EvaluationConfig,
  EvaluationJobStatus,
  EvaluationJobType,
  EvaluationModelConfig,
  EvaluationOutputDataConfig,
  EvaluationPrecomputedRagSourceConfig,
  KnowledgeBaseConfig,
  Tag,
} from "./models_0";
export type RAGConfig =
  | RAGConfig.KnowledgeBaseConfigMember
  | RAGConfig.PrecomputedRagSourceConfigMember
  | RAGConfig.$UnknownMember;
export declare namespace RAGConfig {
  interface KnowledgeBaseConfigMember {
    knowledgeBaseConfig: KnowledgeBaseConfig;
    precomputedRagSourceConfig?: never;
    $unknown?: never;
  }
  interface PrecomputedRagSourceConfigMember {
    knowledgeBaseConfig?: never;
    precomputedRagSourceConfig: EvaluationPrecomputedRagSourceConfig;
    $unknown?: never;
  }
  interface $UnknownMember {
    knowledgeBaseConfig?: never;
    precomputedRagSourceConfig?: never;
    $unknown: [string, any];
  }
  interface Visitor<T> {
    knowledgeBaseConfig: (value: KnowledgeBaseConfig) => T;
    precomputedRagSourceConfig: (
      value: EvaluationPrecomputedRagSourceConfig
    ) => T;
    _: (name: string, value: any) => T;
  }
  const visit: <T>(value: RAGConfig, visitor: Visitor<T>) => T;
}
export type EvaluationInferenceConfig =
  | EvaluationInferenceConfig.ModelsMember
  | EvaluationInferenceConfig.RagConfigsMember
  | EvaluationInferenceConfig.$UnknownMember;
export declare namespace EvaluationInferenceConfig {
  interface ModelsMember {
    models: EvaluationModelConfig[];
    ragConfigs?: never;
    $unknown?: never;
  }
  interface RagConfigsMember {
    models?: never;
    ragConfigs: RAGConfig[];
    $unknown?: never;
  }
  interface $UnknownMember {
    models?: never;
    ragConfigs?: never;
    $unknown: [string, any];
  }
  interface Visitor<T> {
    models: (value: EvaluationModelConfig[]) => T;
    ragConfigs: (value: RAGConfig[]) => T;
    _: (name: string, value: any) => T;
  }
  const visit: <T>(value: EvaluationInferenceConfig, visitor: Visitor<T>) => T;
}
export interface CreateEvaluationJobRequest {
  jobName: string | undefined;
  jobDescription?: string | undefined;
  clientRequestToken?: string | undefined;
  roleArn: string | undefined;
  customerEncryptionKeyId?: string | undefined;
  jobTags?: Tag[] | undefined;
  applicationType?: ApplicationType | undefined;
  evaluationConfig: EvaluationConfig | undefined;
  inferenceConfig: EvaluationInferenceConfig | undefined;
  outputDataConfig: EvaluationOutputDataConfig | undefined;
}
export interface GetEvaluationJobResponse {
  jobName: string | undefined;
  status: EvaluationJobStatus | undefined;
  jobArn: string | undefined;
  jobDescription?: string | undefined;
  roleArn: string | undefined;
  customerEncryptionKeyId?: string | undefined;
  jobType: EvaluationJobType | undefined;
  applicationType?: ApplicationType | undefined;
  evaluationConfig: EvaluationConfig | undefined;
  inferenceConfig: EvaluationInferenceConfig | undefined;
  outputDataConfig: EvaluationOutputDataConfig | undefined;
  creationTime: Date | undefined;
  lastModifiedTime?: Date | undefined;
  failureMessages?: string[] | undefined;
}
export declare const RAGConfigFilterSensitiveLog: (obj: RAGConfig) => any;
export declare const EvaluationInferenceConfigFilterSensitiveLog: (
  obj: EvaluationInferenceConfig
) => any;
export declare const CreateEvaluationJobRequestFilterSensitiveLog: (
  obj: CreateEvaluationJobRequest
) => any;
export declare const GetEvaluationJobResponseFilterSensitiveLog: (
  obj: GetEvaluationJobResponse
) => any;
