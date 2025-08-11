import { createAggregatedClient } from "@smithy/smithy-client";
import { BedrockClient } from "./BedrockClient";
import { BatchDeleteEvaluationJobCommand, } from "./commands/BatchDeleteEvaluationJobCommand";
import { CreateCustomModelCommand, } from "./commands/CreateCustomModelCommand";
import { CreateEvaluationJobCommand, } from "./commands/CreateEvaluationJobCommand";
import { CreateFoundationModelAgreementCommand, } from "./commands/CreateFoundationModelAgreementCommand";
import { CreateGuardrailCommand, } from "./commands/CreateGuardrailCommand";
import { CreateGuardrailVersionCommand, } from "./commands/CreateGuardrailVersionCommand";
import { CreateInferenceProfileCommand, } from "./commands/CreateInferenceProfileCommand";
import { CreateMarketplaceModelEndpointCommand, } from "./commands/CreateMarketplaceModelEndpointCommand";
import { CreateModelCopyJobCommand, } from "./commands/CreateModelCopyJobCommand";
import { CreateModelCustomizationJobCommand, } from "./commands/CreateModelCustomizationJobCommand";
import { CreateModelImportJobCommand, } from "./commands/CreateModelImportJobCommand";
import { CreateModelInvocationJobCommand, } from "./commands/CreateModelInvocationJobCommand";
import { CreatePromptRouterCommand, } from "./commands/CreatePromptRouterCommand";
import { CreateProvisionedModelThroughputCommand, } from "./commands/CreateProvisionedModelThroughputCommand";
import { DeleteCustomModelCommand, } from "./commands/DeleteCustomModelCommand";
import { DeleteFoundationModelAgreementCommand, } from "./commands/DeleteFoundationModelAgreementCommand";
import { DeleteGuardrailCommand, } from "./commands/DeleteGuardrailCommand";
import { DeleteImportedModelCommand, } from "./commands/DeleteImportedModelCommand";
import { DeleteInferenceProfileCommand, } from "./commands/DeleteInferenceProfileCommand";
import { DeleteMarketplaceModelEndpointCommand, } from "./commands/DeleteMarketplaceModelEndpointCommand";
import { DeleteModelInvocationLoggingConfigurationCommand, } from "./commands/DeleteModelInvocationLoggingConfigurationCommand";
import { DeletePromptRouterCommand, } from "./commands/DeletePromptRouterCommand";
import { DeleteProvisionedModelThroughputCommand, } from "./commands/DeleteProvisionedModelThroughputCommand";
import { DeregisterMarketplaceModelEndpointCommand, } from "./commands/DeregisterMarketplaceModelEndpointCommand";
import { GetCustomModelCommand, } from "./commands/GetCustomModelCommand";
import { GetEvaluationJobCommand, } from "./commands/GetEvaluationJobCommand";
import { GetFoundationModelAvailabilityCommand, } from "./commands/GetFoundationModelAvailabilityCommand";
import { GetFoundationModelCommand, } from "./commands/GetFoundationModelCommand";
import { GetGuardrailCommand, } from "./commands/GetGuardrailCommand";
import { GetImportedModelCommand, } from "./commands/GetImportedModelCommand";
import { GetInferenceProfileCommand, } from "./commands/GetInferenceProfileCommand";
import { GetMarketplaceModelEndpointCommand, } from "./commands/GetMarketplaceModelEndpointCommand";
import { GetModelCopyJobCommand, } from "./commands/GetModelCopyJobCommand";
import { GetModelCustomizationJobCommand, } from "./commands/GetModelCustomizationJobCommand";
import { GetModelImportJobCommand, } from "./commands/GetModelImportJobCommand";
import { GetModelInvocationJobCommand, } from "./commands/GetModelInvocationJobCommand";
import { GetModelInvocationLoggingConfigurationCommand, } from "./commands/GetModelInvocationLoggingConfigurationCommand";
import { GetPromptRouterCommand, } from "./commands/GetPromptRouterCommand";
import { GetProvisionedModelThroughputCommand, } from "./commands/GetProvisionedModelThroughputCommand";
import { GetUseCaseForModelAccessCommand, } from "./commands/GetUseCaseForModelAccessCommand";
import { ListCustomModelsCommand, } from "./commands/ListCustomModelsCommand";
import { ListEvaluationJobsCommand, } from "./commands/ListEvaluationJobsCommand";
import { ListFoundationModelAgreementOffersCommand, } from "./commands/ListFoundationModelAgreementOffersCommand";
import { ListFoundationModelsCommand, } from "./commands/ListFoundationModelsCommand";
import { ListGuardrailsCommand, } from "./commands/ListGuardrailsCommand";
import { ListImportedModelsCommand, } from "./commands/ListImportedModelsCommand";
import { ListInferenceProfilesCommand, } from "./commands/ListInferenceProfilesCommand";
import { ListMarketplaceModelEndpointsCommand, } from "./commands/ListMarketplaceModelEndpointsCommand";
import { ListModelCopyJobsCommand, } from "./commands/ListModelCopyJobsCommand";
import { ListModelCustomizationJobsCommand, } from "./commands/ListModelCustomizationJobsCommand";
import { ListModelImportJobsCommand, } from "./commands/ListModelImportJobsCommand";
import { ListModelInvocationJobsCommand, } from "./commands/ListModelInvocationJobsCommand";
import { ListPromptRoutersCommand, } from "./commands/ListPromptRoutersCommand";
import { ListProvisionedModelThroughputsCommand, } from "./commands/ListProvisionedModelThroughputsCommand";
import { ListTagsForResourceCommand, } from "./commands/ListTagsForResourceCommand";
import { PutModelInvocationLoggingConfigurationCommand, } from "./commands/PutModelInvocationLoggingConfigurationCommand";
import { PutUseCaseForModelAccessCommand, } from "./commands/PutUseCaseForModelAccessCommand";
import { RegisterMarketplaceModelEndpointCommand, } from "./commands/RegisterMarketplaceModelEndpointCommand";
import { StopEvaluationJobCommand, } from "./commands/StopEvaluationJobCommand";
import { StopModelCustomizationJobCommand, } from "./commands/StopModelCustomizationJobCommand";
import { StopModelInvocationJobCommand, } from "./commands/StopModelInvocationJobCommand";
import { TagResourceCommand } from "./commands/TagResourceCommand";
import { UntagResourceCommand, } from "./commands/UntagResourceCommand";
import { UpdateGuardrailCommand, } from "./commands/UpdateGuardrailCommand";
import { UpdateMarketplaceModelEndpointCommand, } from "./commands/UpdateMarketplaceModelEndpointCommand";
import { UpdateProvisionedModelThroughputCommand, } from "./commands/UpdateProvisionedModelThroughputCommand";
const commands = {
    BatchDeleteEvaluationJobCommand,
    CreateCustomModelCommand,
    CreateEvaluationJobCommand,
    CreateFoundationModelAgreementCommand,
    CreateGuardrailCommand,
    CreateGuardrailVersionCommand,
    CreateInferenceProfileCommand,
    CreateMarketplaceModelEndpointCommand,
    CreateModelCopyJobCommand,
    CreateModelCustomizationJobCommand,
    CreateModelImportJobCommand,
    CreateModelInvocationJobCommand,
    CreatePromptRouterCommand,
    CreateProvisionedModelThroughputCommand,
    DeleteCustomModelCommand,
    DeleteFoundationModelAgreementCommand,
    DeleteGuardrailCommand,
    DeleteImportedModelCommand,
    DeleteInferenceProfileCommand,
    DeleteMarketplaceModelEndpointCommand,
    DeleteModelInvocationLoggingConfigurationCommand,
    DeletePromptRouterCommand,
    DeleteProvisionedModelThroughputCommand,
    DeregisterMarketplaceModelEndpointCommand,
    GetCustomModelCommand,
    GetEvaluationJobCommand,
    GetFoundationModelCommand,
    GetFoundationModelAvailabilityCommand,
    GetGuardrailCommand,
    GetImportedModelCommand,
    GetInferenceProfileCommand,
    GetMarketplaceModelEndpointCommand,
    GetModelCopyJobCommand,
    GetModelCustomizationJobCommand,
    GetModelImportJobCommand,
    GetModelInvocationJobCommand,
    GetModelInvocationLoggingConfigurationCommand,
    GetPromptRouterCommand,
    GetProvisionedModelThroughputCommand,
    GetUseCaseForModelAccessCommand,
    ListCustomModelsCommand,
    ListEvaluationJobsCommand,
    ListFoundationModelAgreementOffersCommand,
    ListFoundationModelsCommand,
    ListGuardrailsCommand,
    ListImportedModelsCommand,
    ListInferenceProfilesCommand,
    ListMarketplaceModelEndpointsCommand,
    ListModelCopyJobsCommand,
    ListModelCustomizationJobsCommand,
    ListModelImportJobsCommand,
    ListModelInvocationJobsCommand,
    ListPromptRoutersCommand,
    ListProvisionedModelThroughputsCommand,
    ListTagsForResourceCommand,
    PutModelInvocationLoggingConfigurationCommand,
    PutUseCaseForModelAccessCommand,
    RegisterMarketplaceModelEndpointCommand,
    StopEvaluationJobCommand,
    StopModelCustomizationJobCommand,
    StopModelInvocationJobCommand,
    TagResourceCommand,
    UntagResourceCommand,
    UpdateGuardrailCommand,
    UpdateMarketplaceModelEndpointCommand,
    UpdateProvisionedModelThroughputCommand,
};
export class Bedrock extends BedrockClient {
}
createAggregatedClient(commands, Bedrock);
