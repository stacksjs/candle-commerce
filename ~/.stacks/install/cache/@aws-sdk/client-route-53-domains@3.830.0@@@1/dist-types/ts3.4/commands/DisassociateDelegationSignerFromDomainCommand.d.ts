import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DisassociateDelegationSignerFromDomainRequest,
  DisassociateDelegationSignerFromDomainResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface DisassociateDelegationSignerFromDomainCommandInput
  extends DisassociateDelegationSignerFromDomainRequest {}
export interface DisassociateDelegationSignerFromDomainCommandOutput
  extends DisassociateDelegationSignerFromDomainResponse,
    __MetadataBearer {}
declare const DisassociateDelegationSignerFromDomainCommand_base: {
  new (
    input: DisassociateDelegationSignerFromDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DisassociateDelegationSignerFromDomainCommandInput,
    DisassociateDelegationSignerFromDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DisassociateDelegationSignerFromDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DisassociateDelegationSignerFromDomainCommandInput,
    DisassociateDelegationSignerFromDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DisassociateDelegationSignerFromDomainCommand extends DisassociateDelegationSignerFromDomainCommand_base {
  protected static __types: {
    api: {
      input: DisassociateDelegationSignerFromDomainRequest;
      output: DisassociateDelegationSignerFromDomainResponse;
    };
    sdk: {
      input: DisassociateDelegationSignerFromDomainCommandInput;
      output: DisassociateDelegationSignerFromDomainCommandOutput;
    };
  };
}
