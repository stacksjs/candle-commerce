import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  FileSystemDescription,
  UpdateFileSystemRequest,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface UpdateFileSystemCommandInput extends UpdateFileSystemRequest {}
export interface UpdateFileSystemCommandOutput
  extends FileSystemDescription,
    __MetadataBearer {}
declare const UpdateFileSystemCommand_base: {
  new (
    input: UpdateFileSystemCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateFileSystemCommandInput,
    UpdateFileSystemCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateFileSystemCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateFileSystemCommandInput,
    UpdateFileSystemCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class UpdateFileSystemCommand extends UpdateFileSystemCommand_base {
  protected static __types: {
    api: {
      input: UpdateFileSystemRequest;
      output: FileSystemDescription;
    };
    sdk: {
      input: UpdateFileSystemCommandInput;
      output: UpdateFileSystemCommandOutput;
    };
  };
}
