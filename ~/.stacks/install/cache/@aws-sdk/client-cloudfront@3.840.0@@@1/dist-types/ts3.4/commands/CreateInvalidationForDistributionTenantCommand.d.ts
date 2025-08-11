import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  CreateInvalidationForDistributionTenantRequest,
  CreateInvalidationForDistributionTenantResult,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface CreateInvalidationForDistributionTenantCommandInput
  extends CreateInvalidationForDistributionTenantRequest {}
export interface CreateInvalidationForDistributionTenantCommandOutput
  extends CreateInvalidationForDistributionTenantResult,
    __MetadataBearer {}
declare const CreateInvalidationForDistributionTenantCommand_base: {
  new (
    input: CreateInvalidationForDistributionTenantCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CreateInvalidationForDistributionTenantCommandInput,
    CreateInvalidationForDistributionTenantCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CreateInvalidationForDistributionTenantCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CreateInvalidationForDistributionTenantCommandInput,
    CreateInvalidationForDistributionTenantCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class CreateInvalidationForDistributionTenantCommand extends CreateInvalidationForDistributionTenantCommand_base {
  protected static __types: {
    api: {
      input: CreateInvalidationForDistributionTenantRequest;
      output: CreateInvalidationForDistributionTenantResult;
    };
    sdk: {
      input: CreateInvalidationForDistributionTenantCommandInput;
      output: CreateInvalidationForDistributionTenantCommandOutput;
    };
  };
}
