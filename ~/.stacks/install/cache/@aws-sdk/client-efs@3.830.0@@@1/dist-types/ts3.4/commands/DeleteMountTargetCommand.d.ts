import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import { DeleteMountTargetRequest } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DeleteMountTargetCommandInput
  extends DeleteMountTargetRequest {}
export interface DeleteMountTargetCommandOutput extends __MetadataBearer {}
declare const DeleteMountTargetCommand_base: {
  new (
    input: DeleteMountTargetCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteMountTargetCommandInput,
    DeleteMountTargetCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteMountTargetCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteMountTargetCommandInput,
    DeleteMountTargetCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DeleteMountTargetCommand extends DeleteMountTargetCommand_base {
  protected static __types: {
    api: {
      input: DeleteMountTargetRequest;
      output: {};
    };
    sdk: {
      input: DeleteMountTargetCommandInput;
      output: DeleteMountTargetCommandOutput;
    };
  };
}
