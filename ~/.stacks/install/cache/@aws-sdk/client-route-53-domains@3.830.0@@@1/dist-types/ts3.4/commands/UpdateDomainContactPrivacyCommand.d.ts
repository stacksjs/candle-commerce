import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  UpdateDomainContactPrivacyRequest,
  UpdateDomainContactPrivacyResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface UpdateDomainContactPrivacyCommandInput
  extends UpdateDomainContactPrivacyRequest {}
export interface UpdateDomainContactPrivacyCommandOutput
  extends UpdateDomainContactPrivacyResponse,
    __MetadataBearer {}
declare const UpdateDomainContactPrivacyCommand_base: {
  new (
    input: UpdateDomainContactPrivacyCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateDomainContactPrivacyCommandInput,
    UpdateDomainContactPrivacyCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateDomainContactPrivacyCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateDomainContactPrivacyCommandInput,
    UpdateDomainContactPrivacyCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class UpdateDomainContactPrivacyCommand extends UpdateDomainContactPrivacyCommand_base {
  protected static __types: {
    api: {
      input: UpdateDomainContactPrivacyRequest;
      output: UpdateDomainContactPrivacyResponse;
    };
    sdk: {
      input: UpdateDomainContactPrivacyCommandInput;
      output: UpdateDomainContactPrivacyCommandOutput;
    };
  };
}
