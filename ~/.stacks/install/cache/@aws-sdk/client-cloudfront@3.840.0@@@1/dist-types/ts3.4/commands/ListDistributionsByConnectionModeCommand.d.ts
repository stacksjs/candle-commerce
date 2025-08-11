import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  ListDistributionsByConnectionModeRequest,
  ListDistributionsByConnectionModeResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface ListDistributionsByConnectionModeCommandInput
  extends ListDistributionsByConnectionModeRequest {}
export interface ListDistributionsByConnectionModeCommandOutput
  extends ListDistributionsByConnectionModeResult,
    __MetadataBearer {}
declare const ListDistributionsByConnectionModeCommand_base: {
  new (
    input: ListDistributionsByConnectionModeCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListDistributionsByConnectionModeCommandInput,
    ListDistributionsByConnectionModeCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ListDistributionsByConnectionModeCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListDistributionsByConnectionModeCommandInput,
    ListDistributionsByConnectionModeCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListDistributionsByConnectionModeCommand extends ListDistributionsByConnectionModeCommand_base {
  protected static __types: {
    api: {
      input: ListDistributionsByConnectionModeRequest;
      output: ListDistributionsByConnectionModeResult;
    };
    sdk: {
      input: ListDistributionsByConnectionModeCommandInput;
      output: ListDistributionsByConnectionModeCommandOutput;
    };
  };
}
