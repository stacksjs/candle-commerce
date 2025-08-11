import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { RenewDomainRequest, RenewDomainResponse } from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface RenewDomainCommandInput extends RenewDomainRequest {}
export interface RenewDomainCommandOutput
  extends RenewDomainResponse,
    __MetadataBearer {}
declare const RenewDomainCommand_base: {
  new (
    input: RenewDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    RenewDomainCommandInput,
    RenewDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: RenewDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    RenewDomainCommandInput,
    RenewDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class RenewDomainCommand extends RenewDomainCommand_base {
  protected static __types: {
    api: {
      input: RenewDomainRequest;
      output: RenewDomainResponse;
    };
    sdk: {
      input: RenewDomainCommandInput;
      output: RenewDomainCommandOutput;
    };
  };
}
