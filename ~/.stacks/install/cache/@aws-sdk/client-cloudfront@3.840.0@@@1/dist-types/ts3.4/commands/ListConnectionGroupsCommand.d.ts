import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  ListConnectionGroupsRequest,
  ListConnectionGroupsResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface ListConnectionGroupsCommandInput
  extends ListConnectionGroupsRequest {}
export interface ListConnectionGroupsCommandOutput
  extends ListConnectionGroupsResult,
    __MetadataBearer {}
declare const ListConnectionGroupsCommand_base: {
  new (
    input: ListConnectionGroupsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListConnectionGroupsCommandInput,
    ListConnectionGroupsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ListConnectionGroupsCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    ListConnectionGroupsCommandInput,
    ListConnectionGroupsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListConnectionGroupsCommand extends ListConnectionGroupsCommand_base {
  protected static __types: {
    api: {
      input: ListConnectionGroupsRequest;
      output: ListConnectionGroupsResult;
    };
    sdk: {
      input: ListConnectionGroupsCommandInput;
      output: ListConnectionGroupsCommandOutput;
    };
  };
}
