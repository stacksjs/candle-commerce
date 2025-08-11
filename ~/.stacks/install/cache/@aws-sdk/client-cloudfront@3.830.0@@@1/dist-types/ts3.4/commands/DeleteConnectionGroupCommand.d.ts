import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import { DeleteConnectionGroupRequest } from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface DeleteConnectionGroupCommandInput
  extends DeleteConnectionGroupRequest {}
export interface DeleteConnectionGroupCommandOutput extends __MetadataBearer {}
declare const DeleteConnectionGroupCommand_base: {
  new (
    input: DeleteConnectionGroupCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteConnectionGroupCommandInput,
    DeleteConnectionGroupCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteConnectionGroupCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteConnectionGroupCommandInput,
    DeleteConnectionGroupCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DeleteConnectionGroupCommand extends DeleteConnectionGroupCommand_base {
  protected static __types: {
    api: {
      input: DeleteConnectionGroupRequest;
      output: {};
    };
    sdk: {
      input: DeleteConnectionGroupCommandInput;
      output: DeleteConnectionGroupCommandOutput;
    };
  };
}
