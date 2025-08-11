import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  GetConnectionGroupByRoutingEndpointRequest,
  GetConnectionGroupByRoutingEndpointResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface GetConnectionGroupByRoutingEndpointCommandInput
  extends GetConnectionGroupByRoutingEndpointRequest {}
export interface GetConnectionGroupByRoutingEndpointCommandOutput
  extends GetConnectionGroupByRoutingEndpointResult,
    __MetadataBearer {}
declare const GetConnectionGroupByRoutingEndpointCommand_base: {
  new (
    input: GetConnectionGroupByRoutingEndpointCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetConnectionGroupByRoutingEndpointCommandInput,
    GetConnectionGroupByRoutingEndpointCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetConnectionGroupByRoutingEndpointCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetConnectionGroupByRoutingEndpointCommandInput,
    GetConnectionGroupByRoutingEndpointCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class GetConnectionGroupByRoutingEndpointCommand extends GetConnectionGroupByRoutingEndpointCommand_base {
  protected static __types: {
    api: {
      input: GetConnectionGroupByRoutingEndpointRequest;
      output: GetConnectionGroupByRoutingEndpointResult;
    };
    sdk: {
      input: GetConnectionGroupByRoutingEndpointCommandInput;
      output: GetConnectionGroupByRoutingEndpointCommandOutput;
    };
  };
}
