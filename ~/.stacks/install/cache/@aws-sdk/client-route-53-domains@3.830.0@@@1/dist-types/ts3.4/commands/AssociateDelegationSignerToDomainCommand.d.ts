import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  AssociateDelegationSignerToDomainRequest,
  AssociateDelegationSignerToDomainResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface AssociateDelegationSignerToDomainCommandInput
  extends AssociateDelegationSignerToDomainRequest {}
export interface AssociateDelegationSignerToDomainCommandOutput
  extends AssociateDelegationSignerToDomainResponse,
    __MetadataBearer {}
declare const AssociateDelegationSignerToDomainCommand_base: {
  new (
    input: AssociateDelegationSignerToDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    AssociateDelegationSignerToDomainCommandInput,
    AssociateDelegationSignerToDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: AssociateDelegationSignerToDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    AssociateDelegationSignerToDomainCommandInput,
    AssociateDelegationSignerToDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class AssociateDelegationSignerToDomainCommand extends AssociateDelegationSignerToDomainCommand_base {
  protected static __types: {
    api: {
      input: AssociateDelegationSignerToDomainRequest;
      output: AssociateDelegationSignerToDomainResponse;
    };
    sdk: {
      input: AssociateDelegationSignerToDomainCommandInput;
      output: AssociateDelegationSignerToDomainCommandOutput;
    };
  };
}
