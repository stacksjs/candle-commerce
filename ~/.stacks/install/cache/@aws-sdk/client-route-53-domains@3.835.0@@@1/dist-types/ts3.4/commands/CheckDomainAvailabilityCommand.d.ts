import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CheckDomainAvailabilityRequest,
  CheckDomainAvailabilityResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface CheckDomainAvailabilityCommandInput
  extends CheckDomainAvailabilityRequest {}
export interface CheckDomainAvailabilityCommandOutput
  extends CheckDomainAvailabilityResponse,
    __MetadataBearer {}
declare const CheckDomainAvailabilityCommand_base: {
  new (
    input: CheckDomainAvailabilityCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CheckDomainAvailabilityCommandInput,
    CheckDomainAvailabilityCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CheckDomainAvailabilityCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CheckDomainAvailabilityCommandInput,
    CheckDomainAvailabilityCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class CheckDomainAvailabilityCommand extends CheckDomainAvailabilityCommand_base {
  protected static __types: {
    api: {
      input: CheckDomainAvailabilityRequest;
      output: CheckDomainAvailabilityResponse;
    };
    sdk: {
      input: CheckDomainAvailabilityCommandInput;
      output: CheckDomainAvailabilityCommandOutput;
    };
  };
}
