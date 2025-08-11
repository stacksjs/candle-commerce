import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetDomainSuggestionsRequest,
  GetDomainSuggestionsResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface GetDomainSuggestionsCommandInput
  extends GetDomainSuggestionsRequest {}
export interface GetDomainSuggestionsCommandOutput
  extends GetDomainSuggestionsResponse,
    __MetadataBearer {}
declare const GetDomainSuggestionsCommand_base: {
  new (
    input: GetDomainSuggestionsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetDomainSuggestionsCommandInput,
    GetDomainSuggestionsCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetDomainSuggestionsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetDomainSuggestionsCommandInput,
    GetDomainSuggestionsCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class GetDomainSuggestionsCommand extends GetDomainSuggestionsCommand_base {
  protected static __types: {
    api: {
      input: GetDomainSuggestionsRequest;
      output: GetDomainSuggestionsResponse;
    };
    sdk: {
      input: GetDomainSuggestionsCommandInput;
      output: GetDomainSuggestionsCommandOutput;
    };
  };
}
