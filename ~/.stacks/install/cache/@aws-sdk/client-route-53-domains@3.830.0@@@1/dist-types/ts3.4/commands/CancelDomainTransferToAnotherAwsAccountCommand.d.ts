import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CancelDomainTransferToAnotherAwsAccountRequest,
  CancelDomainTransferToAnotherAwsAccountResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface CancelDomainTransferToAnotherAwsAccountCommandInput
  extends CancelDomainTransferToAnotherAwsAccountRequest {}
export interface CancelDomainTransferToAnotherAwsAccountCommandOutput
  extends CancelDomainTransferToAnotherAwsAccountResponse,
    __MetadataBearer {}
declare const CancelDomainTransferToAnotherAwsAccountCommand_base: {
  new (
    input: CancelDomainTransferToAnotherAwsAccountCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CancelDomainTransferToAnotherAwsAccountCommandInput,
    CancelDomainTransferToAnotherAwsAccountCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CancelDomainTransferToAnotherAwsAccountCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CancelDomainTransferToAnotherAwsAccountCommandInput,
    CancelDomainTransferToAnotherAwsAccountCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class CancelDomainTransferToAnotherAwsAccountCommand extends CancelDomainTransferToAnotherAwsAccountCommand_base {
  protected static __types: {
    api: {
      input: CancelDomainTransferToAnotherAwsAccountRequest;
      output: CancelDomainTransferToAnotherAwsAccountResponse;
    };
    sdk: {
      input: CancelDomainTransferToAnotherAwsAccountCommandInput;
      output: CancelDomainTransferToAnotherAwsAccountCommandOutput;
    };
  };
}
