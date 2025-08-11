import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  AcceptDomainTransferFromAnotherAwsAccountRequest,
  AcceptDomainTransferFromAnotherAwsAccountResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface AcceptDomainTransferFromAnotherAwsAccountCommandInput
  extends AcceptDomainTransferFromAnotherAwsAccountRequest {}
export interface AcceptDomainTransferFromAnotherAwsAccountCommandOutput
  extends AcceptDomainTransferFromAnotherAwsAccountResponse,
    __MetadataBearer {}
declare const AcceptDomainTransferFromAnotherAwsAccountCommand_base: {
  new (
    input: AcceptDomainTransferFromAnotherAwsAccountCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    AcceptDomainTransferFromAnotherAwsAccountCommandInput,
    AcceptDomainTransferFromAnotherAwsAccountCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: AcceptDomainTransferFromAnotherAwsAccountCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    AcceptDomainTransferFromAnotherAwsAccountCommandInput,
    AcceptDomainTransferFromAnotherAwsAccountCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class AcceptDomainTransferFromAnotherAwsAccountCommand extends AcceptDomainTransferFromAnotherAwsAccountCommand_base {
  protected static __types: {
    api: {
      input: AcceptDomainTransferFromAnotherAwsAccountRequest;
      output: AcceptDomainTransferFromAnotherAwsAccountResponse;
    };
    sdk: {
      input: AcceptDomainTransferFromAnotherAwsAccountCommandInput;
      output: AcceptDomainTransferFromAnotherAwsAccountCommandOutput;
    };
  };
}
