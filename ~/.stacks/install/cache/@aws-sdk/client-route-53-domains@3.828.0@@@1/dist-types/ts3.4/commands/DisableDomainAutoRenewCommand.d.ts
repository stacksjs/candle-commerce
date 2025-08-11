import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DisableDomainAutoRenewRequest,
  DisableDomainAutoRenewResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface DisableDomainAutoRenewCommandInput
  extends DisableDomainAutoRenewRequest {}
export interface DisableDomainAutoRenewCommandOutput
  extends DisableDomainAutoRenewResponse,
    __MetadataBearer {}
declare const DisableDomainAutoRenewCommand_base: {
  new (
    input: DisableDomainAutoRenewCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DisableDomainAutoRenewCommandInput,
    DisableDomainAutoRenewCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DisableDomainAutoRenewCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DisableDomainAutoRenewCommandInput,
    DisableDomainAutoRenewCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DisableDomainAutoRenewCommand extends DisableDomainAutoRenewCommand_base {
  protected static __types: {
    api: {
      input: DisableDomainAutoRenewRequest;
      output: {};
    };
    sdk: {
      input: DisableDomainAutoRenewCommandInput;
      output: DisableDomainAutoRenewCommandOutput;
    };
  };
}
