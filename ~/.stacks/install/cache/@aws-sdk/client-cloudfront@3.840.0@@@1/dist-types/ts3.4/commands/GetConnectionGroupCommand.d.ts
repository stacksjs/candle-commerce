import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  GetConnectionGroupRequest,
  GetConnectionGroupResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface GetConnectionGroupCommandInput
  extends GetConnectionGroupRequest {}
export interface GetConnectionGroupCommandOutput
  extends GetConnectionGroupResult,
    __MetadataBearer {}
declare const GetConnectionGroupCommand_base: {
  new (
    input: GetConnectionGroupCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetConnectionGroupCommandInput,
    GetConnectionGroupCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetConnectionGroupCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetConnectionGroupCommandInput,
    GetConnectionGroupCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class GetConnectionGroupCommand extends GetConnectionGroupCommand_base {
  protected static __types: {
    api: {
      input: GetConnectionGroupRequest;
      output: GetConnectionGroupResult;
    };
    sdk: {
      input: GetConnectionGroupCommandInput;
      output: GetConnectionGroupCommandOutput;
    };
  };
}
