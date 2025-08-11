import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  UpdateResponseHeadersPolicyRequest,
  UpdateResponseHeadersPolicyResult,
} from "../models/models_2";
export { __MetadataBearer };
export { $Command };
export interface UpdateResponseHeadersPolicyCommandInput
  extends UpdateResponseHeadersPolicyRequest {}
export interface UpdateResponseHeadersPolicyCommandOutput
  extends UpdateResponseHeadersPolicyResult,
    __MetadataBearer {}
declare const UpdateResponseHeadersPolicyCommand_base: {
  new (
    input: UpdateResponseHeadersPolicyCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateResponseHeadersPolicyCommandInput,
    UpdateResponseHeadersPolicyCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateResponseHeadersPolicyCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateResponseHeadersPolicyCommandInput,
    UpdateResponseHeadersPolicyCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class UpdateResponseHeadersPolicyCommand extends UpdateResponseHeadersPolicyCommand_base {
  protected static __types: {
    api: {
      input: UpdateResponseHeadersPolicyRequest;
      output: UpdateResponseHeadersPolicyResult;
    };
    sdk: {
      input: UpdateResponseHeadersPolicyCommandInput;
      output: UpdateResponseHeadersPolicyCommandOutput;
    };
  };
}
