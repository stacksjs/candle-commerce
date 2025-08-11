import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  RejectDomainTransferFromAnotherAwsAccountRequest,
  RejectDomainTransferFromAnotherAwsAccountResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface RejectDomainTransferFromAnotherAwsAccountCommandInput
  extends RejectDomainTransferFromAnotherAwsAccountRequest {}
export interface RejectDomainTransferFromAnotherAwsAccountCommandOutput
  extends RejectDomainTransferFromAnotherAwsAccountResponse,
    __MetadataBearer {}
declare const RejectDomainTransferFromAnotherAwsAccountCommand_base: {
  new (
    input: RejectDomainTransferFromAnotherAwsAccountCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    RejectDomainTransferFromAnotherAwsAccountCommandInput,
    RejectDomainTransferFromAnotherAwsAccountCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: RejectDomainTransferFromAnotherAwsAccountCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    RejectDomainTransferFromAnotherAwsAccountCommandInput,
    RejectDomainTransferFromAnotherAwsAccountCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class RejectDomainTransferFromAnotherAwsAccountCommand extends RejectDomainTransferFromAnotherAwsAccountCommand_base {
  protected static __types: {
    api: {
      input: RejectDomainTransferFromAnotherAwsAccountRequest;
      output: RejectDomainTransferFromAnotherAwsAccountResponse;
    };
    sdk: {
      input: RejectDomainTransferFromAnotherAwsAccountCommandInput;
      output: RejectDomainTransferFromAnotherAwsAccountCommandOutput;
    };
  };
}
