import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  UpdateDistributionTenantRequest,
  UpdateDistributionTenantResult,
} from "../models/models_2";
export { __MetadataBearer };
export { $Command };
export interface UpdateDistributionTenantCommandInput
  extends UpdateDistributionTenantRequest {}
export interface UpdateDistributionTenantCommandOutput
  extends UpdateDistributionTenantResult,
    __MetadataBearer {}
declare const UpdateDistributionTenantCommand_base: {
  new (
    input: UpdateDistributionTenantCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateDistributionTenantCommandInput,
    UpdateDistributionTenantCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateDistributionTenantCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateDistributionTenantCommandInput,
    UpdateDistributionTenantCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class UpdateDistributionTenantCommand extends UpdateDistributionTenantCommand_base {
  protected static __types: {
    api: {
      input: UpdateDistributionTenantRequest;
      output: UpdateDistributionTenantResult;
    };
    sdk: {
      input: UpdateDistributionTenantCommandInput;
      output: UpdateDistributionTenantCommandOutput;
    };
  };
}
