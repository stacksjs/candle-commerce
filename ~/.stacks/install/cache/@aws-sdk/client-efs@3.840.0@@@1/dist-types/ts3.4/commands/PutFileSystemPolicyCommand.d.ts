import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  FileSystemPolicyDescription,
  PutFileSystemPolicyRequest,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface PutFileSystemPolicyCommandInput
  extends PutFileSystemPolicyRequest {}
export interface PutFileSystemPolicyCommandOutput
  extends FileSystemPolicyDescription,
    __MetadataBearer {}
declare const PutFileSystemPolicyCommand_base: {
  new (
    input: PutFileSystemPolicyCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    PutFileSystemPolicyCommandInput,
    PutFileSystemPolicyCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutFileSystemPolicyCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    PutFileSystemPolicyCommandInput,
    PutFileSystemPolicyCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class PutFileSystemPolicyCommand extends PutFileSystemPolicyCommand_base {
  protected static __types: {
    api: {
      input: PutFileSystemPolicyRequest;
      output: FileSystemPolicyDescription;
    };
    sdk: {
      input: PutFileSystemPolicyCommandInput;
      output: PutFileSystemPolicyCommandOutput;
    };
  };
}
