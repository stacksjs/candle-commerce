import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import { DeleteAccessPointRequest } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DeleteAccessPointCommandInput
  extends DeleteAccessPointRequest {}
export interface DeleteAccessPointCommandOutput extends __MetadataBearer {}
declare const DeleteAccessPointCommand_base: {
  new (
    input: DeleteAccessPointCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteAccessPointCommandInput,
    DeleteAccessPointCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteAccessPointCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteAccessPointCommandInput,
    DeleteAccessPointCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DeleteAccessPointCommand extends DeleteAccessPointCommand_base {
  protected static __types: {
    api: {
      input: DeleteAccessPointRequest;
      output: {};
    };
    sdk: {
      input: DeleteAccessPointCommandInput;
      output: DeleteAccessPointCommandOutput;
    };
  };
}
