import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  ListInvalidationsForDistributionTenantRequest,
  ListInvalidationsForDistributionTenantResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface ListInvalidationsForDistributionTenantCommandInput
  extends ListInvalidationsForDistributionTenantRequest {}
export interface ListInvalidationsForDistributionTenantCommandOutput
  extends ListInvalidationsForDistributionTenantResult,
    __MetadataBearer {}
declare const ListInvalidationsForDistributionTenantCommand_base: {
  new (
    input: ListInvalidationsForDistributionTenantCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListInvalidationsForDistributionTenantCommandInput,
    ListInvalidationsForDistributionTenantCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ListInvalidationsForDistributionTenantCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListInvalidationsForDistributionTenantCommandInput,
    ListInvalidationsForDistributionTenantCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListInvalidationsForDistributionTenantCommand extends ListInvalidationsForDistributionTenantCommand_base {
  protected static __types: {
    api: {
      input: ListInvalidationsForDistributionTenantRequest;
      output: ListInvalidationsForDistributionTenantResult;
    };
    sdk: {
      input: ListInvalidationsForDistributionTenantCommandInput;
      output: ListInvalidationsForDistributionTenantCommandOutput;
    };
  };
}
