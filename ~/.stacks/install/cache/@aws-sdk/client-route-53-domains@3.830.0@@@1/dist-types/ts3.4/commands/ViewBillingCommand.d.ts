import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { ViewBillingRequest, ViewBillingResponse } from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface ViewBillingCommandInput extends ViewBillingRequest {}
export interface ViewBillingCommandOutput
  extends ViewBillingResponse,
    __MetadataBearer {}
declare const ViewBillingCommand_base: {
  new (
    input: ViewBillingCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ViewBillingCommandInput,
    ViewBillingCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ViewBillingCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    ViewBillingCommandInput,
    ViewBillingCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ViewBillingCommand extends ViewBillingCommand_base {
  protected static __types: {
    api: {
      input: ViewBillingRequest;
      output: ViewBillingResponse;
    };
    sdk: {
      input: ViewBillingCommandInput;
      output: ViewBillingCommandOutput;
    };
  };
}
