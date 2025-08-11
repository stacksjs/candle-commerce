import {
  ApplicationType,
  CustomizationConfig,
  CustomizationType,
  EvaluationConfig,
  EvaluationJobStatus,
  EvaluationJobType,
  EvaluationModelConfig,
  EvaluationOutputDataConfig,
  EvaluationPrecomputedRagSourceConfig,
  ExternalSourcesRetrieveAndGenerateConfiguration,
  FilterAttribute,
  GenerationConfiguration,
  OrchestrationConfiguration,
  OutputDataConfig,
  RetrieveAndGenerateType,
  SearchType,
  SortJobsBy,
  SortOrder,
  Tag,
  TermDetails,
  TrainingDataConfig,
  TrainingMetrics,
  ValidationDataConfig,
  ValidatorMetric,
  VpcConfig,
} from "./models_0";
export interface Offer {
  offerId?: string | undefined;
  offerToken: string | undefined;
  termDetails: TermDetails | undefined;
}
export interface ListFoundationModelAgreementOffersResponse {
  modelId: string | undefined;
  offers: Offer[] | undefined;
}
export interface ListTagsForResourceRequest {
  resourceARN: string | undefined;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[] | undefined;
}
export interface TagResourceRequest {
  resourceARN: string | undefined;
  tags: Tag[] | undefined;
}
export interface TagResourceResponse {}
export interface UntagResourceRequest {
  resourceARN: string | undefined;
  tagKeys: string[] | undefined;
}
export interface UntagResourceResponse {}
export interface CreateModelCustomizationJobRequest {
  jobName: string | undefined;
  customModelName: string | undefined;
  roleArn: string | undefined;
  clientRequestToken?: string | undefined;
  baseModelIdentifier: string | undefined;
  customizationType?: CustomizationType | undefined;
  customModelKmsKeyId?: string | undefined;
  jobTags?: Tag[] | undefined;
  customModelTags?: Tag[] | undefined;
  trainingDataConfig: TrainingDataConfig | undefined;
  validationDataConfig?: ValidationDataConfig | undefined;
  outputDataConfig: OutputDataConfig | undefined;
  hyperParameters?: Record<string, string> | undefined;
  vpcConfig?: VpcConfig | undefined;
  customizationConfig?: CustomizationConfig | undefined;
}
export interface CreateModelCustomizationJobResponse {
  jobArn: string | undefined;
}
export interface GetModelCustomizationJobRequest {
  jobIdentifier: string | undefined;
}
export declare const ModelCustomizationJobStatus: {
  readonly COMPLETED: "Completed";
  readonly FAILED: "Failed";
  readonly IN_PROGRESS: "InProgress";
  readonly STOPPED: "Stopped";
  readonly STOPPING: "Stopping";
};
export type ModelCustomizationJobStatus =
  (typeof ModelCustomizationJobStatus)[keyof typeof ModelCustomizationJobStatus];
export declare const JobStatusDetails: {
  readonly COMPLETED: "Completed";
  readonly FAILED: "Failed";
  readonly IN_PROGRESS: "InProgress";
  readonly NOT_STARTED: "NotStarted";
  readonly STOPPED: "Stopped";
  readonly STOPPING: "Stopping";
};
export type JobStatusDetails =
  (typeof JobStatusDetails)[keyof typeof JobStatusDetails];
export interface DataProcessingDetails {
  status?: JobStatusDetails | undefined;
  creationTime?: Date | undefined;
  lastModifiedTime?: Date | undefined;
}
export interface TrainingDetails {
  status?: JobStatusDetails | undefined;
  creationTime?: Date | undefined;
  lastModifiedTime?: Date | undefined;
}
export interface ValidationDetails {
  status?: JobStatusDetails | undefined;
  creationTime?: Date | undefined;
  lastModifiedTime?: Date | undefined;
}
export interface StatusDetails {
  validationDetails?: ValidationDetails | undefined;
  dataProcessingDetails?: DataProcessingDetails | undefined;
  trainingDetails?: TrainingDetails | undefined;
}
export interface GetModelCustomizationJobResponse {
  jobArn: string | undefined;
  jobName: string | undefined;
  outputModelName: string | undefined;
  outputModelArn?: string | undefined;
  clientRequestToken?: string | undefined;
  roleArn: string | undefined;
  status?: ModelCustomizationJobStatus | undefined;
  statusDetails?: StatusDetails | undefined;
  failureMessage?: string | undefined;
  creationTime: Date | undefined;
  lastModifiedTime?: Date | undefined;
  endTime?: Date | undefined;
  baseModelArn: string | undefined;
  hyperParameters?: Record<string, string> | undefined;
  trainingDataConfig: TrainingDataConfig | undefined;
  validationDataConfig: ValidationDataConfig | undefined;
  outputDataConfig: OutputDataConfig | undefined;
  customizationType?: CustomizationType | undefined;
  outputModelKmsKeyArn?: string | undefined;
  trainingMetrics?: TrainingMetrics | undefined;
  validationMetrics?: ValidatorMetric[] | undefined;
  vpcConfig?: VpcConfig | undefined;
  customizationConfig?: CustomizationConfig | undefined;
}
export declare const FineTuningJobStatus: {
  readonly COMPLETED: "Completed";
  readonly FAILED: "Failed";
  readonly IN_PROGRESS: "InProgress";
  readonly STOPPED: "Stopped";
  readonly STOPPING: "Stopping";
};
export type FineTuningJobStatus =
  (typeof FineTuningJobStatus)[keyof typeof FineTuningJobStatus];
export interface ListModelCustomizationJobsRequest {
  creationTimeAfter?: Date | undefined;
  creationTimeBefore?: Date | undefined;
  statusEquals?: FineTuningJobStatus | undefined;
  nameContains?: string | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  sortBy?: SortJobsBy | undefined;
  sortOrder?: SortOrder | undefined;
}
export interface ModelCustomizationJobSummary {
  jobArn: string | undefined;
  baseModelArn: string | undefined;
  jobName: string | undefined;
  status: ModelCustomizationJobStatus | undefined;
  statusDetails?: StatusDetails | undefined;
  lastModifiedTime?: Date | undefined;
  creationTime: Date | undefined;
  endTime?: Date | undefined;
  customModelArn?: string | undefined;
  customModelName?: string | undefined;
  customizationType?: CustomizationType | undefined;
}
export interface ListModelCustomizationJobsResponse {
  nextToken?: string | undefined;
  modelCustomizationJobSummaries?: ModelCustomizationJobSummary[] | undefined;
}
export interface StopModelCustomizationJobRequest {
  jobIdentifier: string | undefined;
}
export interface StopModelCustomizationJobResponse {}
export type RetrievalFilter =
  | RetrievalFilter.AndAllMember
  | RetrievalFilter.EqualsMember
  | RetrievalFilter.GreaterThanMember
  | RetrievalFilter.GreaterThanOrEqualsMember
  | RetrievalFilter.InMember
  | RetrievalFilter.LessThanMember
  | RetrievalFilter.LessThanOrEqualsMember
  | RetrievalFilter.ListContainsMember
  | RetrievalFilter.NotEqualsMember
  | RetrievalFilter.NotInMember
  | RetrievalFilter.OrAllMember
  | RetrievalFilter.StartsWithMember
  | RetrievalFilter.StringContainsMember
  | RetrievalFilter.$UnknownMember;
export declare namespace RetrievalFilter {
  interface EqualsMember {
    equals: FilterAttribute;
    notEquals?: never;
    greaterThan?: never;
    greaterThanOrEquals?: never;
    lessThan?: never;
    lessThanOrEquals?: never;
    in?: never;
    notIn?: never;
    startsWith?: never;
    listContains?: never;
    stringContains?: never;
    andAll?: never;
    orAll?: never;
    $unknown?: never;
  }
  interface NotEqualsMember {
    equals?: never;
    notEquals: FilterAttribute;
    greaterThan?: never;
    greaterThanOrEquals?: never;
    lessThan?: never;
    lessThanOrEquals?: never;
    in?: never;
    notIn?: never;
    startsWith?: never;
    listContains?: never;
    stringContains?: never;
    andAll?: never;
    orAll?: never;
    $unknown?: never;
  }
  interface GreaterThanMember {
    equals?: never;
    notEquals?: never;
    greaterThan: FilterAttribute;
    greaterThanOrEquals?: never;
    lessThan?: never;
    lessThanOrEquals?: never;
    in?: never;
    notIn?: never;
    startsWith?: never;
    listContains?: never;
    stringContains?: never;
    andAll?: never;
    orAll?: never;
    $unknown?: never;
  }
  interface GreaterThanOrEqualsMember {
    equals?: never;
    notEquals?: never;
    greaterThan?: never;
    greaterThanOrEquals: FilterAttribute;
    lessThan?: never;
    lessThanOrEquals?: never;
    in?: never;
    notIn?: never;
    startsWith?: never;
    listContains?: never;
    stringContains?: never;
    andAll?: never;
    orAll?: never;
    $unknown?: never;
  }
  interface LessThanMember {
    equals?: never;
    notEquals?: never;
    greaterThan?: never;
    greaterThanOrEquals?: never;
    lessThan: FilterAttribute;
    lessThanOrEquals?: never;
    in?: never;
    notIn?: never;
    startsWith?: never;
    listContains?: never;
    stringContains?: never;
    andAll?: never;
    orAll?: never;
    $unknown?: never;
  }
  interface LessThanOrEqualsMember {
    equals?: never;
    notEquals?: never;
    greaterThan?: never;
    greaterThanOrEquals?: never;
    lessThan?: never;
    lessThanOrEquals: FilterAttribute;
    in?: never;
    notIn?: never;
    startsWith?: never;
    listContains?: never;
    stringContains?: never;
    andAll?: never;
    orAll?: never;
    $unknown?: never;
  }
  interface InMember {
    equals?: never;
    notEquals?: never;
    greaterThan?: never;
    greaterThanOrEquals?: never;
    lessThan?: never;
    lessThanOrEquals?: never;
    in: FilterAttribute;
    notIn?: never;
    startsWith?: never;
    listContains?: never;
    stringContains?: never;
    andAll?: never;
    orAll?: never;
    $unknown?: never;
  }
  interface NotInMember {
    equals?: never;
    notEquals?: never;
    greaterThan?: never;
    greaterThanOrEquals?: never;
    lessThan?: never;
    lessThanOrEquals?: never;
    in?: never;
    notIn: FilterAttribute;
    startsWith?: never;
    listContains?: never;
    stringContains?: never;
    andAll?: never;
    orAll?: never;
    $unknown?: never;
  }
  interface StartsWithMember {
    equals?: never;
    notEquals?: never;
    greaterThan?: never;
    greaterThanOrEquals?: never;
    lessThan?: never;
    lessThanOrEquals?: never;
    in?: never;
    notIn?: never;
    startsWith: FilterAttribute;
    listContains?: never;
    stringContains?: never;
    andAll?: never;
    orAll?: never;
    $unknown?: never;
  }
  interface ListContainsMember {
    equals?: never;
    notEquals?: never;
    greaterThan?: never;
    greaterThanOrEquals?: never;
    lessThan?: never;
    lessThanOrEquals?: never;
    in?: never;
    notIn?: never;
    startsWith?: never;
    listContains: FilterAttribute;
    stringContains?: never;
    andAll?: never;
    orAll?: never;
    $unknown?: never;
  }
  interface StringContainsMember {
    equals?: never;
    notEquals?: never;
    greaterThan?: never;
    greaterThanOrEquals?: never;
    lessThan?: never;
    lessThanOrEquals?: never;
    in?: never;
    notIn?: never;
    startsWith?: never;
    listContains?: never;
    stringContains: FilterAttribute;
    andAll?: never;
    orAll?: never;
    $unknown?: never;
  }
  interface AndAllMember {
    equals?: never;
    notEquals?: never;
    greaterThan?: never;
    greaterThanOrEquals?: never;
    lessThan?: never;
    lessThanOrEquals?: never;
    in?: never;
    notIn?: never;
    startsWith?: never;
    listContains?: never;
    stringContains?: never;
    andAll: RetrievalFilter[];
    orAll?: never;
    $unknown?: never;
  }
  interface OrAllMember {
    equals?: never;
    notEquals?: never;
    greaterThan?: never;
    greaterThanOrEquals?: never;
    lessThan?: never;
    lessThanOrEquals?: never;
    in?: never;
    notIn?: never;
    startsWith?: never;
    listContains?: never;
    stringContains?: never;
    andAll?: never;
    orAll: RetrievalFilter[];
    $unknown?: never;
  }
  interface $UnknownMember {
    equals?: never;
    notEquals?: never;
    greaterThan?: never;
    greaterThanOrEquals?: never;
    lessThan?: never;
    lessThanOrEquals?: never;
    in?: never;
    notIn?: never;
    startsWith?: never;
    listContains?: never;
    stringContains?: never;
    andAll?: never;
    orAll?: never;
    $unknown: [string, any];
  }
  interface Visitor<T> {
    equals: (value: FilterAttribute) => T;
    notEquals: (value: FilterAttribute) => T;
    greaterThan: (value: FilterAttribute) => T;
    greaterThanOrEquals: (value: FilterAttribute) => T;
    lessThan: (value: FilterAttribute) => T;
    lessThanOrEquals: (value: FilterAttribute) => T;
    in: (value: FilterAttribute) => T;
    notIn: (value: FilterAttribute) => T;
    startsWith: (value: FilterAttribute) => T;
    listContains: (value: FilterAttribute) => T;
    stringContains: (value: FilterAttribute) => T;
    andAll: (value: RetrievalFilter[]) => T;
    orAll: (value: RetrievalFilter[]) => T;
    _: (name: string, value: any) => T;
  }
  const visit: <T>(value: RetrievalFilter, visitor: Visitor<T>) => T;
}
export interface KnowledgeBaseVectorSearchConfiguration {
  numberOfResults?: number | undefined;
  overrideSearchType?: SearchType | undefined;
  filter?: RetrievalFilter | undefined;
}
export interface KnowledgeBaseRetrievalConfiguration {
  vectorSearchConfiguration: KnowledgeBaseVectorSearchConfiguration | undefined;
}
export interface KnowledgeBaseRetrieveAndGenerateConfiguration {
  knowledgeBaseId: string | undefined;
  modelArn: string | undefined;
  retrievalConfiguration?: KnowledgeBaseRetrievalConfiguration | undefined;
  generationConfiguration?: GenerationConfiguration | undefined;
  orchestrationConfiguration?: OrchestrationConfiguration | undefined;
}
export interface RetrieveConfig {
  knowledgeBaseId: string | undefined;
  knowledgeBaseRetrievalConfiguration:
    | KnowledgeBaseRetrievalConfiguration
    | undefined;
}
export interface RetrieveAndGenerateConfiguration {
  type: RetrieveAndGenerateType | undefined;
  knowledgeBaseConfiguration?:
    | KnowledgeBaseRetrieveAndGenerateConfiguration
    | undefined;
  externalSourcesConfiguration?:
    | ExternalSourcesRetrieveAndGenerateConfiguration
    | undefined;
}
export type KnowledgeBaseConfig =
  | KnowledgeBaseConfig.RetrieveAndGenerateConfigMember
  | KnowledgeBaseConfig.RetrieveConfigMember
  | KnowledgeBaseConfig.$UnknownMember;
export declare namespace KnowledgeBaseConfig {
  interface RetrieveConfigMember {
    retrieveConfig: RetrieveConfig;
    retrieveAndGenerateConfig?: never;
    $unknown?: never;
  }
  interface RetrieveAndGenerateConfigMember {
    retrieveConfig?: never;
    retrieveAndGenerateConfig: RetrieveAndGenerateConfiguration;
    $unknown?: never;
  }
  interface $UnknownMember {
    retrieveConfig?: never;
    retrieveAndGenerateConfig?: never;
    $unknown: [string, any];
  }
  interface Visitor<T> {
    retrieveConfig: (value: RetrieveConfig) => T;
    retrieveAndGenerateConfig: (value: RetrieveAndGenerateConfiguration) => T;
    _: (name: string, value: any) => T;
  }
  const visit: <T>(value: KnowledgeBaseConfig, visitor: Visitor<T>) => T;
}
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
export declare const CreateModelCustomizationJobRequestFilterSensitiveLog: (
  obj: CreateModelCustomizationJobRequest
) => any;
export declare const GetModelCustomizationJobResponseFilterSensitiveLog: (
  obj: GetModelCustomizationJobResponse
) => any;
export declare const RetrievalFilterFilterSensitiveLog: (
  obj: RetrievalFilter
) => any;
export declare const KnowledgeBaseVectorSearchConfigurationFilterSensitiveLog: (
  obj: KnowledgeBaseVectorSearchConfiguration
) => any;
export declare const KnowledgeBaseRetrievalConfigurationFilterSensitiveLog: (
  obj: KnowledgeBaseRetrievalConfiguration
) => any;
export declare const KnowledgeBaseRetrieveAndGenerateConfigurationFilterSensitiveLog: (
  obj: KnowledgeBaseRetrieveAndGenerateConfiguration
) => any;
export declare const RetrieveConfigFilterSensitiveLog: (
  obj: RetrieveConfig
) => any;
export declare const RetrieveAndGenerateConfigurationFilterSensitiveLog: (
  obj: RetrieveAndGenerateConfiguration
) => any;
export declare const KnowledgeBaseConfigFilterSensitiveLog: (
  obj: KnowledgeBaseConfig
) => any;
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
