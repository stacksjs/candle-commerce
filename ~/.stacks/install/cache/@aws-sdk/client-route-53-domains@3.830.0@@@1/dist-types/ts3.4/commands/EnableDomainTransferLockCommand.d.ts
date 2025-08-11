import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EnableDomainTransferLockRequest,
  EnableDomainTransferLockResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface EnableDomainTransferLockCommandInput
  extends EnableDomainTransferLockRequest {}
export interface EnableDomainTransferLockCommandOutput
  extends EnableDomainTransferLockResponse,
    __MetadataBearer {}
declare const EnableDomainTransferLockCommand_base: {
  new (
    input: EnableDomainTransferLockCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    EnableDomainTransferLockCommandInput,
    EnableDomainTransferLockCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: EnableDomainTransferLockCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    EnableDomainTransferLockCommandInput,
    EnableDomainTransferLockCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class EnableDomainTransferLockCommand extends EnableDomainTransferLockCommand_base {
  protected static __types: {
    api: {
      input: EnableDomainTransferLockRequest;
      output: EnableDomainTransferLockResponse;
    };
    sdk: {
      input: EnableDomainTransferLockCommandInput;
      output: EnableDomainTransferLockCommandOutput;
    };
  };
}
