import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  UpdateDistributionWithStagingConfigRequest,
  UpdateDistributionWithStagingConfigResult,
} from "../models/models_2";
export { __MetadataBearer };
export { $Command };
export interface UpdateDistributionWithStagingConfigCommandInput
  extends UpdateDistributionWithStagingConfigRequest {}
export interface UpdateDistributionWithStagingConfigCommandOutput
  extends UpdateDistributionWithStagingConfigResult,
    __MetadataBearer {}
declare const UpdateDistributionWithStagingConfigCommand_base: {
  new (
    input: UpdateDistributionWithStagingConfigCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateDistributionWithStagingConfigCommandInput,
    UpdateDistributionWithStagingConfigCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateDistributionWithStagingConfigCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateDistributionWithStagingConfigCommandInput,
    UpdateDistributionWithStagingConfigCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class UpdateDistributionWithStagingConfigCommand extends UpdateDistributionWithStagingConfigCommand_base {
  protected static __types: {
    api: {
      input: UpdateDistributionWithStagingConfigRequest;
      output: UpdateDistributionWithStagingConfigResult;
    };
    sdk: {
      input: UpdateDistributionWithStagingConfigCommandInput;
      output: UpdateDistributionWithStagingConfigCommandOutput;
    };
  };
}
