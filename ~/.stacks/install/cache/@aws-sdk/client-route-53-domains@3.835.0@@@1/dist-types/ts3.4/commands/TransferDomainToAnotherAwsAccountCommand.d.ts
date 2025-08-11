import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  TransferDomainToAnotherAwsAccountRequest,
  TransferDomainToAnotherAwsAccountResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface TransferDomainToAnotherAwsAccountCommandInput
  extends TransferDomainToAnotherAwsAccountRequest {}
export interface TransferDomainToAnotherAwsAccountCommandOutput
  extends TransferDomainToAnotherAwsAccountResponse,
    __MetadataBearer {}
declare const TransferDomainToAnotherAwsAccountCommand_base: {
  new (
    input: TransferDomainToAnotherAwsAccountCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    TransferDomainToAnotherAwsAccountCommandInput,
    TransferDomainToAnotherAwsAccountCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: TransferDomainToAnotherAwsAccountCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    TransferDomainToAnotherAwsAccountCommandInput,
    TransferDomainToAnotherAwsAccountCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class TransferDomainToAnotherAwsAccountCommand extends TransferDomainToAnotherAwsAccountCommand_base {
  protected static __types: {
    api: {
      input: TransferDomainToAnotherAwsAccountRequest;
      output: TransferDomainToAnotherAwsAccountResponse;
    };
    sdk: {
      input: TransferDomainToAnotherAwsAccountCommandInput;
      output: TransferDomainToAnotherAwsAccountCommandOutput;
    };
  };
}
