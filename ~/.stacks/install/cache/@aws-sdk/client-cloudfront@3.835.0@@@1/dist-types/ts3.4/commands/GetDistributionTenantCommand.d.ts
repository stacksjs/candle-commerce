import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  GetDistributionTenantRequest,
  GetDistributionTenantResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface GetDistributionTenantCommandInput
  extends GetDistributionTenantRequest {}
export interface GetDistributionTenantCommandOutput
  extends GetDistributionTenantResult,
    __MetadataBearer {}
declare const GetDistributionTenantCommand_base: {
  new (
    input: GetDistributionTenantCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetDistributionTenantCommandInput,
    GetDistributionTenantCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetDistributionTenantCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetDistributionTenantCommandInput,
    GetDistributionTenantCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class GetDistributionTenantCommand extends GetDistributionTenantCommand_base {
  protected static __types: {
    api: {
      input: GetDistributionTenantRequest;
      output: GetDistributionTenantResult;
    };
    sdk: {
      input: GetDistributionTenantCommandInput;
      output: GetDistributionTenantCommandOutput;
    };
  };
}
