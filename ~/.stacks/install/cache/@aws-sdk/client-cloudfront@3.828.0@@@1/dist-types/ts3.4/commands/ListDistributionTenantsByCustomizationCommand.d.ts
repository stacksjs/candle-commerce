import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  ListDistributionTenantsByCustomizationRequest,
  ListDistributionTenantsByCustomizationResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface ListDistributionTenantsByCustomizationCommandInput
  extends ListDistributionTenantsByCustomizationRequest {}
export interface ListDistributionTenantsByCustomizationCommandOutput
  extends ListDistributionTenantsByCustomizationResult,
    __MetadataBearer {}
declare const ListDistributionTenantsByCustomizationCommand_base: {
  new (
    input: ListDistributionTenantsByCustomizationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListDistributionTenantsByCustomizationCommandInput,
    ListDistributionTenantsByCustomizationCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ListDistributionTenantsByCustomizationCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    ListDistributionTenantsByCustomizationCommandInput,
    ListDistributionTenantsByCustomizationCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListDistributionTenantsByCustomizationCommand extends ListDistributionTenantsByCustomizationCommand_base {
  protected static __types: {
    api: {
      input: ListDistributionTenantsByCustomizationRequest;
      output: ListDistributionTenantsByCustomizationResult;
    };
    sdk: {
      input: ListDistributionTenantsByCustomizationCommandInput;
      output: ListDistributionTenantsByCustomizationCommandOutput;
    };
  };
}
