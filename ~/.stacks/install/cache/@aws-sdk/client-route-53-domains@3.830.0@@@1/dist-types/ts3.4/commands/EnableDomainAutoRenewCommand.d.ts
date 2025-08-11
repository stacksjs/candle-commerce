import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EnableDomainAutoRenewRequest,
  EnableDomainAutoRenewResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface EnableDomainAutoRenewCommandInput
  extends EnableDomainAutoRenewRequest {}
export interface EnableDomainAutoRenewCommandOutput
  extends EnableDomainAutoRenewResponse,
    __MetadataBearer {}
declare const EnableDomainAutoRenewCommand_base: {
  new (
    input: EnableDomainAutoRenewCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    EnableDomainAutoRenewCommandInput,
    EnableDomainAutoRenewCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: EnableDomainAutoRenewCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    EnableDomainAutoRenewCommandInput,
    EnableDomainAutoRenewCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class EnableDomainAutoRenewCommand extends EnableDomainAutoRenewCommand_base {
  protected static __types: {
    api: {
      input: EnableDomainAutoRenewRequest;
      output: {};
    };
    sdk: {
      input: EnableDomainAutoRenewCommandInput;
      output: EnableDomainAutoRenewCommandOutput;
    };
  };
}
