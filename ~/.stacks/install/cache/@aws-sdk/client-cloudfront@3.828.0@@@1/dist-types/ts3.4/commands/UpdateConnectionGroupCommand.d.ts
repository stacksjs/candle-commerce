import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  UpdateConnectionGroupRequest,
  UpdateConnectionGroupResult,
} from "../models/models_2";
export { __MetadataBearer };
export { $Command };
export interface UpdateConnectionGroupCommandInput
  extends UpdateConnectionGroupRequest {}
export interface UpdateConnectionGroupCommandOutput
  extends UpdateConnectionGroupResult,
    __MetadataBearer {}
declare const UpdateConnectionGroupCommand_base: {
  new (
    input: UpdateConnectionGroupCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateConnectionGroupCommandInput,
    UpdateConnectionGroupCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateConnectionGroupCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateConnectionGroupCommandInput,
    UpdateConnectionGroupCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class UpdateConnectionGroupCommand extends UpdateConnectionGroupCommand_base {
  protected static __types: {
    api: {
      input: UpdateConnectionGroupRequest;
      output: UpdateConnectionGroupResult;
    };
    sdk: {
      input: UpdateConnectionGroupCommandInput;
      output: UpdateConnectionGroupCommandOutput;
    };
  };
}
