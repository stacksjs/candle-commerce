import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  DescribeFileSystemPolicyRequest,
  FileSystemPolicyDescription,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeFileSystemPolicyCommandInput
  extends DescribeFileSystemPolicyRequest {}
export interface DescribeFileSystemPolicyCommandOutput
  extends FileSystemPolicyDescription,
    __MetadataBearer {}
declare const DescribeFileSystemPolicyCommand_base: {
  new (
    input: DescribeFileSystemPolicyCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeFileSystemPolicyCommandInput,
    DescribeFileSystemPolicyCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DescribeFileSystemPolicyCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeFileSystemPolicyCommandInput,
    DescribeFileSystemPolicyCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DescribeFileSystemPolicyCommand extends DescribeFileSystemPolicyCommand_base {
  protected static __types: {
    api: {
      input: DescribeFileSystemPolicyRequest;
      output: FileSystemPolicyDescription;
    };
    sdk: {
      input: DescribeFileSystemPolicyCommandInput;
      output: DescribeFileSystemPolicyCommandOutput;
    };
  };
}
