import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import { DescribeTagsRequest, DescribeTagsResponse } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeTagsCommandInput extends DescribeTagsRequest {}
export interface DescribeTagsCommandOutput
  extends DescribeTagsResponse,
    __MetadataBearer {}
declare const DescribeTagsCommand_base: {
  new (
    input: DescribeTagsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeTagsCommandInput,
    DescribeTagsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DescribeTagsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeTagsCommandInput,
    DescribeTagsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DescribeTagsCommand extends DescribeTagsCommand_base {
  protected static __types: {
    api: {
      input: DescribeTagsRequest;
      output: DescribeTagsResponse;
    };
    sdk: {
      input: DescribeTagsCommandInput;
      output: DescribeTagsCommandOutput;
    };
  };
}
