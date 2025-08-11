import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { PushDomainRequest } from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface PushDomainCommandInput extends PushDomainRequest {}
export interface PushDomainCommandOutput extends __MetadataBearer {}
declare const PushDomainCommand_base: {
  new (
    input: PushDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    PushDomainCommandInput,
    PushDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PushDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    PushDomainCommandInput,
    PushDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class PushDomainCommand extends PushDomainCommand_base {
  protected static __types: {
    api: {
      input: PushDomainRequest;
      output: {};
    };
    sdk: {
      input: PushDomainCommandInput;
      output: PushDomainCommandOutput;
    };
  };
}
