import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  CreateFileSystemRequest,
  FileSystemDescription,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface CreateFileSystemCommandInput extends CreateFileSystemRequest {}
export interface CreateFileSystemCommandOutput
  extends FileSystemDescription,
    __MetadataBearer {}
declare const CreateFileSystemCommand_base: {
  new (
    input: CreateFileSystemCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CreateFileSystemCommandInput,
    CreateFileSystemCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [CreateFileSystemCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    CreateFileSystemCommandInput,
    CreateFileSystemCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class CreateFileSystemCommand extends CreateFileSystemCommand_base {
  protected static __types: {
    api: {
      input: CreateFileSystemRequest;
      output: FileSystemDescription;
    };
    sdk: {
      input: CreateFileSystemCommandInput;
      output: CreateFileSystemCommandOutput;
    };
  };
}
