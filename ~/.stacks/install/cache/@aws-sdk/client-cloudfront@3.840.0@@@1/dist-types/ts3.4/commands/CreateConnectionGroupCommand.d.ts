import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  CreateConnectionGroupRequest,
  CreateConnectionGroupResult,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface CreateConnectionGroupCommandInput
  extends CreateConnectionGroupRequest {}
export interface CreateConnectionGroupCommandOutput
  extends CreateConnectionGroupResult,
    __MetadataBearer {}
declare const CreateConnectionGroupCommand_base: {
  new (
    input: CreateConnectionGroupCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CreateConnectionGroupCommandInput,
    CreateConnectionGroupCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CreateConnectionGroupCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CreateConnectionGroupCommandInput,
    CreateConnectionGroupCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class CreateConnectionGroupCommand extends CreateConnectionGroupCommand_base {
  protected static __types: {
    api: {
      input: CreateConnectionGroupRequest;
      output: CreateConnectionGroupResult;
    };
    sdk: {
      input: CreateConnectionGroupCommandInput;
      output: CreateConnectionGroupCommandOutput;
    };
  };
}
