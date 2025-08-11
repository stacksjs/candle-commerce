import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  DescribeReplicationConfigurationsRequest,
  DescribeReplicationConfigurationsResponse,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeReplicationConfigurationsCommandInput
  extends DescribeReplicationConfigurationsRequest {}
export interface DescribeReplicationConfigurationsCommandOutput
  extends DescribeReplicationConfigurationsResponse,
    __MetadataBearer {}
declare const DescribeReplicationConfigurationsCommand_base: {
  new (
    input: DescribeReplicationConfigurationsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeReplicationConfigurationsCommandInput,
    DescribeReplicationConfigurationsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [DescribeReplicationConfigurationsCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeReplicationConfigurationsCommandInput,
    DescribeReplicationConfigurationsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DescribeReplicationConfigurationsCommand extends DescribeReplicationConfigurationsCommand_base {
  protected static __types: {
    api: {
      input: DescribeReplicationConfigurationsRequest;
      output: DescribeReplicationConfigurationsResponse;
    };
    sdk: {
      input: DescribeReplicationConfigurationsCommandInput;
      output: DescribeReplicationConfigurationsCommandOutput;
    };
  };
}
