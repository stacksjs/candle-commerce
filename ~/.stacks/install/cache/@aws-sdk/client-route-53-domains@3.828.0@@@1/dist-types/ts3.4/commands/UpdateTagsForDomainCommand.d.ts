import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  UpdateTagsForDomainRequest,
  UpdateTagsForDomainResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface UpdateTagsForDomainCommandInput
  extends UpdateTagsForDomainRequest {}
export interface UpdateTagsForDomainCommandOutput
  extends UpdateTagsForDomainResponse,
    __MetadataBearer {}
declare const UpdateTagsForDomainCommand_base: {
  new (
    input: UpdateTagsForDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateTagsForDomainCommandInput,
    UpdateTagsForDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateTagsForDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateTagsForDomainCommandInput,
    UpdateTagsForDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class UpdateTagsForDomainCommand extends UpdateTagsForDomainCommand_base {
  protected static __types: {
    api: {
      input: UpdateTagsForDomainRequest;
      output: {};
    };
    sdk: {
      input: UpdateTagsForDomainCommandInput;
      output: UpdateTagsForDomainCommandOutput;
    };
  };
}
