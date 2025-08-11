import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  GetInvalidationForDistributionTenantRequest,
  GetInvalidationForDistributionTenantResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface GetInvalidationForDistributionTenantCommandInput
  extends GetInvalidationForDistributionTenantRequest {}
export interface GetInvalidationForDistributionTenantCommandOutput
  extends GetInvalidationForDistributionTenantResult,
    __MetadataBearer {}
declare const GetInvalidationForDistributionTenantCommand_base: {
  new (
    input: GetInvalidationForDistributionTenantCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetInvalidationForDistributionTenantCommandInput,
    GetInvalidationForDistributionTenantCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetInvalidationForDistributionTenantCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetInvalidationForDistributionTenantCommandInput,
    GetInvalidationForDistributionTenantCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class GetInvalidationForDistributionTenantCommand extends GetInvalidationForDistributionTenantCommand_base {
  protected static __types: {
    api: {
      input: GetInvalidationForDistributionTenantRequest;
      output: GetInvalidationForDistributionTenantResult;
    };
    sdk: {
      input: GetInvalidationForDistributionTenantCommandInput;
      output: GetInvalidationForDistributionTenantCommandOutput;
    };
  };
}
