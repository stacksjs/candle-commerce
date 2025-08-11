import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  DescribeFileSystemsRequest,
  DescribeFileSystemsResponse,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeFileSystemsCommandInput
  extends DescribeFileSystemsRequest {}
export interface DescribeFileSystemsCommandOutput
  extends DescribeFileSystemsResponse,
    __MetadataBearer {}
declare const DescribeFileSystemsCommand_base: {
  new (
    input: DescribeFileSystemsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeFileSystemsCommandInput,
    DescribeFileSystemsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [DescribeFileSystemsCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeFileSystemsCommandInput,
    DescribeFileSystemsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DescribeFileSystemsCommand extends DescribeFileSystemsCommand_base {
  protected static __types: {
    api: {
      input: DescribeFileSystemsRequest;
      output: DescribeFileSystemsResponse;
    };
    sdk: {
      input: DescribeFileSystemsCommandInput;
      output: DescribeFileSystemsCommandOutput;
    };
  };
}
