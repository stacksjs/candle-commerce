import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CheckDomainTransferabilityRequest,
  CheckDomainTransferabilityResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface CheckDomainTransferabilityCommandInput
  extends CheckDomainTransferabilityRequest {}
export interface CheckDomainTransferabilityCommandOutput
  extends CheckDomainTransferabilityResponse,
    __MetadataBearer {}
declare const CheckDomainTransferabilityCommand_base: {
  new (
    input: CheckDomainTransferabilityCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CheckDomainTransferabilityCommandInput,
    CheckDomainTransferabilityCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CheckDomainTransferabilityCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CheckDomainTransferabilityCommandInput,
    CheckDomainTransferabilityCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class CheckDomainTransferabilityCommand extends CheckDomainTransferabilityCommand_base {
  protected static __types: {
    api: {
      input: CheckDomainTransferabilityRequest;
      output: CheckDomainTransferabilityResponse;
    };
    sdk: {
      input: CheckDomainTransferabilityCommandInput;
      output: CheckDomainTransferabilityCommandOutput;
    };
  };
}
