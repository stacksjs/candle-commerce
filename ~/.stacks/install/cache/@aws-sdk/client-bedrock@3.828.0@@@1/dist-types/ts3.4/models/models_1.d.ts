import {
  ApplicationType,
  EvaluationConfig,
  EvaluationInferenceConfig,
  EvaluationJobStatus,
  EvaluationJobType,
  EvaluationOutputDataConfig,
} from "./models_0";
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
export declare const GetEvaluationJobResponseFilterSensitiveLog: (
  obj: GetEvaluationJobResponse
) => any;
