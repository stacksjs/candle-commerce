import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  TransferDomainRequest,
  TransferDomainResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface TransferDomainCommandInput extends TransferDomainRequest {}
export interface TransferDomainCommandOutput
  extends TransferDomainResponse,
    __MetadataBearer {}
declare const TransferDomainCommand_base: {
  new (
    input: TransferDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    TransferDomainCommandInput,
    TransferDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: TransferDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    TransferDomainCommandInput,
    TransferDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class TransferDomainCommand extends TransferDomainCommand_base {
  protected static __types: {
    api: {
      input: TransferDomainRequest;
      output: TransferDomainResponse;
    };
    sdk: {
      input: TransferDomainCommandInput;
      output: TransferDomainCommandOutput;
    };
  };
}
