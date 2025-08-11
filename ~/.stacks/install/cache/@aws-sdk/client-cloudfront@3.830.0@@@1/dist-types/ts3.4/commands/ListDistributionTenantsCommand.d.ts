import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  ListDistributionTenantsRequest,
  ListDistributionTenantsResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface ListDistributionTenantsCommandInput
  extends ListDistributionTenantsRequest {}
export interface ListDistributionTenantsCommandOutput
  extends ListDistributionTenantsResult,
    __MetadataBearer {}
declare const ListDistributionTenantsCommand_base: {
  new (
    input: ListDistributionTenantsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListDistributionTenantsCommandInput,
    ListDistributionTenantsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ListDistributionTenantsCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    ListDistributionTenantsCommandInput,
    ListDistributionTenantsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListDistributionTenantsCommand extends ListDistributionTenantsCommand_base {
  protected static __types: {
    api: {
      input: ListDistributionTenantsRequest;
      output: ListDistributionTenantsResult;
    };
    sdk: {
      input: ListDistributionTenantsCommandInput;
      output: ListDistributionTenantsCommandOutput;
    };
  };
}
