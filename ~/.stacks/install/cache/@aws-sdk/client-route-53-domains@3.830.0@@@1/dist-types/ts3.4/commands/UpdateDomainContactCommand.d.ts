import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  UpdateDomainContactRequest,
  UpdateDomainContactResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface UpdateDomainContactCommandInput
  extends UpdateDomainContactRequest {}
export interface UpdateDomainContactCommandOutput
  extends UpdateDomainContactResponse,
    __MetadataBearer {}
declare const UpdateDomainContactCommand_base: {
  new (
    input: UpdateDomainContactCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateDomainContactCommandInput,
    UpdateDomainContactCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateDomainContactCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateDomainContactCommandInput,
    UpdateDomainContactCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class UpdateDomainContactCommand extends UpdateDomainContactCommand_base {
  protected static __types: {
    api: {
      input: UpdateDomainContactRequest;
      output: UpdateDomainContactResponse;
    };
    sdk: {
      input: UpdateDomainContactCommandInput;
      output: UpdateDomainContactCommandOutput;
    };
  };
}
