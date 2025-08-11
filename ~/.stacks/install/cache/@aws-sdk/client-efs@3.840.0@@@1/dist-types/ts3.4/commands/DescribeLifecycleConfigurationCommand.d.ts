import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  DescribeLifecycleConfigurationRequest,
  LifecycleConfigurationDescription,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeLifecycleConfigurationCommandInput
  extends DescribeLifecycleConfigurationRequest {}
export interface DescribeLifecycleConfigurationCommandOutput
  extends LifecycleConfigurationDescription,
    __MetadataBearer {}
declare const DescribeLifecycleConfigurationCommand_base: {
  new (
    input: DescribeLifecycleConfigurationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeLifecycleConfigurationCommandInput,
    DescribeLifecycleConfigurationCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DescribeLifecycleConfigurationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeLifecycleConfigurationCommandInput,
    DescribeLifecycleConfigurationCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DescribeLifecycleConfigurationCommand extends DescribeLifecycleConfigurationCommand_base {
  protected static __types: {
    api: {
      input: DescribeLifecycleConfigurationRequest;
      output: LifecycleConfigurationDescription;
    };
    sdk: {
      input: DescribeLifecycleConfigurationCommandInput;
      output: DescribeLifecycleConfigurationCommandOutput;
    };
  };
}
