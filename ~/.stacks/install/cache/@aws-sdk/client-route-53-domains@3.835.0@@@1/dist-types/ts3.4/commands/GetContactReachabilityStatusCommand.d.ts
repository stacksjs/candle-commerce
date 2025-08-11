import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetContactReachabilityStatusRequest,
  GetContactReachabilityStatusResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface GetContactReachabilityStatusCommandInput
  extends GetContactReachabilityStatusRequest {}
export interface GetContactReachabilityStatusCommandOutput
  extends GetContactReachabilityStatusResponse,
    __MetadataBearer {}
declare const GetContactReachabilityStatusCommand_base: {
  new (
    input: GetContactReachabilityStatusCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetContactReachabilityStatusCommandInput,
    GetContactReachabilityStatusCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [GetContactReachabilityStatusCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    GetContactReachabilityStatusCommandInput,
    GetContactReachabilityStatusCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class GetContactReachabilityStatusCommand extends GetContactReachabilityStatusCommand_base {
  protected static __types: {
    api: {
      input: GetContactReachabilityStatusRequest;
      output: GetContactReachabilityStatusResponse;
    };
    sdk: {
      input: GetContactReachabilityStatusCommandInput;
      output: GetContactReachabilityStatusCommandOutput;
    };
  };
}
