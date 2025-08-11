import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  FileSystemProtectionDescription,
  UpdateFileSystemProtectionRequest,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface UpdateFileSystemProtectionCommandInput
  extends UpdateFileSystemProtectionRequest {}
export interface UpdateFileSystemProtectionCommandOutput
  extends FileSystemProtectionDescription,
    __MetadataBearer {}
declare const UpdateFileSystemProtectionCommand_base: {
  new (
    input: UpdateFileSystemProtectionCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateFileSystemProtectionCommandInput,
    UpdateFileSystemProtectionCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateFileSystemProtectionCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateFileSystemProtectionCommandInput,
    UpdateFileSystemProtectionCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class UpdateFileSystemProtectionCommand extends UpdateFileSystemProtectionCommand_base {
  protected static __types: {
    api: {
      input: UpdateFileSystemProtectionRequest;
      output: FileSystemProtectionDescription;
    };
    sdk: {
      input: UpdateFileSystemProtectionCommandInput;
      output: UpdateFileSystemProtectionCommandOutput;
    };
  };
}
