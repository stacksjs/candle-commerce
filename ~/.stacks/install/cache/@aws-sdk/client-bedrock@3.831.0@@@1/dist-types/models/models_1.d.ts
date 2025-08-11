import { ApplicationType, EvaluationConfig, EvaluationJobStatus, EvaluationJobType, EvaluationModelConfig, EvaluationOutputDataConfig, EvaluationPrecomputedRagSourceConfig, KnowledgeBaseConfig, Tag } from "./models_0";
/**
 * <p>Contains configuration details for retrieval of information and response generation.</p>
 * @public
 */
export type RAGConfig = RAGConfig.KnowledgeBaseConfigMember | RAGConfig.PrecomputedRagSourceConfigMember | RAGConfig.$UnknownMember;
/**
 * @public
 */
export declare namespace RAGConfig {
    /**
     * <p>Contains configuration details for knowledge base retrieval and response generation.</p>
     * @public
     */
    interface KnowledgeBaseConfigMember {
        knowledgeBaseConfig: KnowledgeBaseConfig;
        precomputedRagSourceConfig?: never;
        $unknown?: never;
    }
    /**
     * <p>Contains configuration details about the RAG source used to generate inference response data for a Knowledge Base evaluation job.</p>
     * @public
     */
    interface PrecomputedRagSourceConfigMember {
        knowledgeBaseConfig?: never;
        precomputedRagSourceConfig: EvaluationPrecomputedRagSourceConfig;
        $unknown?: never;
    }
    /**
     * @public
     */
    interface $UnknownMember {
        knowledgeBaseConfig?: never;
        precomputedRagSourceConfig?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        knowledgeBaseConfig: (value: KnowledgeBaseConfig) => T;
        precomputedRagSourceConfig: (value: EvaluationPrecomputedRagSourceConfig) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: RAGConfig, visitor: Visitor<T>) => T;
}
/**
 * <p>The configuration details of the inference model for an evaluation job.</p> <p>For automated model evaluation jobs, only a single model is supported.</p> <p>For human-based model evaluation jobs, your annotator can compare the responses for up to two different models.</p>
 * @public
 */
export type EvaluationInferenceConfig = EvaluationInferenceConfig.ModelsMember | EvaluationInferenceConfig.RagConfigsMember | EvaluationInferenceConfig.$UnknownMember;
/**
 * @public
 */
export declare namespace EvaluationInferenceConfig {
    /**
     * <p>Specifies the inference models.</p>
     * @public
     */
    interface ModelsMember {
        models: EvaluationModelConfig[];
        ragConfigs?: never;
        $unknown?: never;
    }
    /**
     * <p>Contains the configuration details of the inference for a knowledge base evaluation job, including either the retrieval only configuration or the retrieval with response generation configuration.</p>
     * @public
     */
    interface RagConfigsMember {
        models?: never;
        ragConfigs: RAGConfig[];
        $unknown?: never;
    }
    /**
     * @public
     */
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
/**
 * @public
 */
export interface CreateEvaluationJobRequest {
    /**
     * <p>A name for the evaluation job. Names must unique with your Amazon Web Services account, and your account's Amazon Web Services region.</p>
     * @public
     */
    jobName: string | undefined;
    /**
     * <p>A description of the evaluation job.</p>
     * @public
     */
    jobDescription?: string | undefined;
    /**
     * <p>A unique, case-sensitive identifier to ensure that the API request completes no more than one time. If this token matches a previous request, Amazon Bedrock ignores the request, but does not return an error. For more information, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/Run_Instance_Idempotency.html">Ensuring idempotency</a>.</p>
     * @public
     */
    clientRequestToken?: string | undefined;
    /**
     * <p>The Amazon Resource Name (ARN) of an IAM service role that Amazon Bedrock can assume to perform tasks on your behalf. To learn more about the required permissions, see <a href="https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-security.html">Required permissions for model evaluations</a>.</p>
     * @public
     */
    roleArn: string | undefined;
    /**
     * <p>Specify your customer managed encryption key Amazon Resource Name (ARN) that will be used to encrypt your evaluation job.</p>
     * @public
     */
    customerEncryptionKeyId?: string | undefined;
    /**
     * <p>Tags to attach to the model evaluation job.</p>
     * @public
     */
    jobTags?: Tag[] | undefined;
    /**
     * <p>Specifies whether the evaluation job is for evaluating a model or evaluating a knowledge base (retrieval and response generation).</p>
     * @public
     */
    applicationType?: ApplicationType | undefined;
    /**
     * <p>Contains the configuration details of either an automated or human-based evaluation job.</p>
     * @public
     */
    evaluationConfig: EvaluationConfig | undefined;
    /**
     * <p>Contains the configuration details of the inference model for the evaluation job.</p> <p>For model evaluation jobs, automated jobs support a single model or <a href="https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html">inference profile</a>, and jobs that use human workers support two models or inference profiles.</p>
     * @public
     */
    inferenceConfig: EvaluationInferenceConfig | undefined;
    /**
     * <p>Contains the configuration details of the Amazon S3 bucket for storing the results of the evaluation job.</p>
     * @public
     */
    outputDataConfig: EvaluationOutputDataConfig | undefined;
}
/**
 * @public
 */
export interface GetEvaluationJobResponse {
    /**
     * <p>The name for the evaluation job.</p>
     * @public
     */
    jobName: string | undefined;
    /**
     * <p>The current status of the evaluation job.</p>
     * @public
     */
    status: EvaluationJobStatus | undefined;
    /**
     * <p>The Amazon Resource Name (ARN) of the evaluation job.</p>
     * @public
     */
    jobArn: string | undefined;
    /**
     * <p>The description of the evaluation job.</p>
     * @public
     */
    jobDescription?: string | undefined;
    /**
     * <p>The Amazon Resource Name (ARN) of the IAM service role used in the evaluation job.</p>
     * @public
     */
    roleArn: string | undefined;
    /**
     * <p>The Amazon Resource Name (ARN) of the customer managed encryption key specified when the evaluation job was created.</p>
     * @public
     */
    customerEncryptionKeyId?: string | undefined;
    /**
     * <p>Specifies whether the evaluation job is automated or human-based.</p>
     * @public
     */
    jobType: EvaluationJobType | undefined;
    /**
     * <p>Specifies whether the evaluation job is for evaluating a model or evaluating a knowledge base (retrieval and response generation).</p>
     * @public
     */
    applicationType?: ApplicationType | undefined;
    /**
     * <p>Contains the configuration details of either an automated or human-based evaluation job.</p>
     * @public
     */
    evaluationConfig: EvaluationConfig | undefined;
    /**
     * <p>Contains the configuration details of the inference model used for the evaluation job. </p>
     * @public
     */
    inferenceConfig: EvaluationInferenceConfig | undefined;
    /**
     * <p>Contains the configuration details of the Amazon S3 bucket for storing the results of the evaluation job.</p>
     * @public
     */
    outputDataConfig: EvaluationOutputDataConfig | undefined;
    /**
     * <p>The time the evaluation job was created.</p>
     * @public
     */
    creationTime: Date | undefined;
    /**
     * <p>The time the evaluation job was last modified.</p>
     * @public
     */
    lastModifiedTime?: Date | undefined;
    /**
     * <p>A list of strings that specify why the evaluation job failed to create.</p>
     * @public
     */
    failureMessages?: string[] | undefined;
}
/**
 * @internal
 */
export declare const RAGConfigFilterSensitiveLog: (obj: RAGConfig) => any;
/**
 * @internal
 */
export declare const EvaluationInferenceConfigFilterSensitiveLog: (obj: EvaluationInferenceConfig) => any;
/**
 * @internal
 */
export declare const CreateEvaluationJobRequestFilterSensitiveLog: (obj: CreateEvaluationJobRequest) => any;
/**
 * @internal
 */
export declare const GetEvaluationJobResponseFilterSensitiveLog: (obj: GetEvaluationJobResponse) => any;
