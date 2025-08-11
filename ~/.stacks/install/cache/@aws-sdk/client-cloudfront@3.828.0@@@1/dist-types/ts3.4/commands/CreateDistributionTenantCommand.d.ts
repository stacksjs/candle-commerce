import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  CreateDistributionTenantRequest,
  CreateDistributionTenantResult,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface CreateDistributionTenantCommandInput
  extends CreateDistributionTenantRequest {}
export interface CreateDistributionTenantCommandOutput
  extends CreateDistributionTenantResult,
    __MetadataBearer {}
declare const CreateDistributionTenantCommand_base: {
  new (
    input: CreateDistributionTenantCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CreateDistributionTenantCommandInput,
    CreateDistributionTenantCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CreateDistributionTenantCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CreateDistributionTenantCommandInput,
    CreateDistributionTenantCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class CreateDistributionTenantCommand extends CreateDistributionTenantCommand_base {
  protected static __types: {
    api: {
      input: CreateDistributionTenantRequest;
      output: CreateDistributionTenantResult;
    };
    sdk: {
      input: CreateDistributionTenantCommandInput;
      output: CreateDistributionTenantCommandOutput;
    };
  };
}
