import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  CreateMountTargetRequest,
  MountTargetDescription,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface CreateMountTargetCommandInput
  extends CreateMountTargetRequest {}
export interface CreateMountTargetCommandOutput
  extends MountTargetDescription,
    __MetadataBearer {}
declare const CreateMountTargetCommand_base: {
  new (
    input: CreateMountTargetCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CreateMountTargetCommandInput,
    CreateMountTargetCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CreateMountTargetCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CreateMountTargetCommandInput,
    CreateMountTargetCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class CreateMountTargetCommand extends CreateMountTargetCommand_base {
  protected static __types: {
    api: {
      input: CreateMountTargetRequest;
      output: MountTargetDescription;
    };
    sdk: {
      input: CreateMountTargetCommandInput;
      output: CreateMountTargetCommandOutput;
    };
  };
}
