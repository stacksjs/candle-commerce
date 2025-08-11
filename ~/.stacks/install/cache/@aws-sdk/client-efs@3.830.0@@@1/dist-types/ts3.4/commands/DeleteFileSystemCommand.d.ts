import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import { DeleteFileSystemRequest } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DeleteFileSystemCommandInput extends DeleteFileSystemRequest {}
export interface DeleteFileSystemCommandOutput extends __MetadataBearer {}
declare const DeleteFileSystemCommand_base: {
  new (
    input: DeleteFileSystemCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteFileSystemCommandInput,
    DeleteFileSystemCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteFileSystemCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteFileSystemCommandInput,
    DeleteFileSystemCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DeleteFileSystemCommand extends DeleteFileSystemCommand_base {
  protected static __types: {
    api: {
      input: DeleteFileSystemRequest;
      output: {};
    };
    sdk: {
      input: DeleteFileSystemCommandInput;
      output: DeleteFileSystemCommandOutput;
    };
  };
}
