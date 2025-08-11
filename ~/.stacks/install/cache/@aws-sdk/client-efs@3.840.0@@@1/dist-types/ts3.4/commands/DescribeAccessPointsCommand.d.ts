import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  DescribeAccessPointsRequest,
  DescribeAccessPointsResponse,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeAccessPointsCommandInput
  extends DescribeAccessPointsRequest {}
export interface DescribeAccessPointsCommandOutput
  extends DescribeAccessPointsResponse,
    __MetadataBearer {}
declare const DescribeAccessPointsCommand_base: {
  new (
    input: DescribeAccessPointsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeAccessPointsCommandInput,
    DescribeAccessPointsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [DescribeAccessPointsCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeAccessPointsCommandInput,
    DescribeAccessPointsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DescribeAccessPointsCommand extends DescribeAccessPointsCommand_base {
  protected static __types: {
    api: {
      input: DescribeAccessPointsRequest;
      output: DescribeAccessPointsResponse;
    };
    sdk: {
      input: DescribeAccessPointsCommandInput;
      output: DescribeAccessPointsCommandOutput;
    };
  };
}
