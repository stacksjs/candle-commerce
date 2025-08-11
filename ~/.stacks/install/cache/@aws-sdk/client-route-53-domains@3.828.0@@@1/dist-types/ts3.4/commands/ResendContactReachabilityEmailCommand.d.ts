import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  ResendContactReachabilityEmailRequest,
  ResendContactReachabilityEmailResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface ResendContactReachabilityEmailCommandInput
  extends ResendContactReachabilityEmailRequest {}
export interface ResendContactReachabilityEmailCommandOutput
  extends ResendContactReachabilityEmailResponse,
    __MetadataBearer {}
declare const ResendContactReachabilityEmailCommand_base: {
  new (
    input: ResendContactReachabilityEmailCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ResendContactReachabilityEmailCommandInput,
    ResendContactReachabilityEmailCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ResendContactReachabilityEmailCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    ResendContactReachabilityEmailCommandInput,
    ResendContactReachabilityEmailCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ResendContactReachabilityEmailCommand extends ResendContactReachabilityEmailCommand_base {
  protected static __types: {
    api: {
      input: ResendContactReachabilityEmailRequest;
      output: ResendContactReachabilityEmailResponse;
    };
    sdk: {
      input: ResendContactReachabilityEmailCommandInput;
      output: ResendContactReachabilityEmailCommandOutput;
    };
  };
}
