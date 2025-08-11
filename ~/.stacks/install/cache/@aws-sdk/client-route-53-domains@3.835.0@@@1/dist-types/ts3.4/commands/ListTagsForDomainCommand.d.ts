import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  ListTagsForDomainRequest,
  ListTagsForDomainResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface ListTagsForDomainCommandInput
  extends ListTagsForDomainRequest {}
export interface ListTagsForDomainCommandOutput
  extends ListTagsForDomainResponse,
    __MetadataBearer {}
declare const ListTagsForDomainCommand_base: {
  new (
    input: ListTagsForDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListTagsForDomainCommandInput,
    ListTagsForDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ListTagsForDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListTagsForDomainCommandInput,
    ListTagsForDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListTagsForDomainCommand extends ListTagsForDomainCommand_base {
  protected static __types: {
    api: {
      input: ListTagsForDomainRequest;
      output: ListTagsForDomainResponse;
    };
    sdk: {
      input: ListTagsForDomainCommandInput;
      output: ListTagsForDomainCommandOutput;
    };
  };
}
