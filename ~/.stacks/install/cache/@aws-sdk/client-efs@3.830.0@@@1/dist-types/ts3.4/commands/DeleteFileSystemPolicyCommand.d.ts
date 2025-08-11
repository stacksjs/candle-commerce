import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import { DeleteFileSystemPolicyRequest } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DeleteFileSystemPolicyCommandInput
  extends DeleteFileSystemPolicyRequest {}
export interface DeleteFileSystemPolicyCommandOutput extends __MetadataBearer {}
declare const DeleteFileSystemPolicyCommand_base: {
  new (
    input: DeleteFileSystemPolicyCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteFileSystemPolicyCommandInput,
    DeleteFileSystemPolicyCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteFileSystemPolicyCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteFileSystemPolicyCommandInput,
    DeleteFileSystemPolicyCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DeleteFileSystemPolicyCommand extends DeleteFileSystemPolicyCommand_base {
  protected static __types: {
    api: {
      input: DeleteFileSystemPolicyRequest;
      output: {};
    };
    sdk: {
      input: DeleteFileSystemPolicyCommandInput;
      output: DeleteFileSystemPolicyCommandOutput;
    };
  };
}
