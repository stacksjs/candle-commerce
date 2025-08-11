import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DisableDomainTransferLockRequest,
  DisableDomainTransferLockResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface DisableDomainTransferLockCommandInput
  extends DisableDomainTransferLockRequest {}
export interface DisableDomainTransferLockCommandOutput
  extends DisableDomainTransferLockResponse,
    __MetadataBearer {}
declare const DisableDomainTransferLockCommand_base: {
  new (
    input: DisableDomainTransferLockCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DisableDomainTransferLockCommandInput,
    DisableDomainTransferLockCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DisableDomainTransferLockCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DisableDomainTransferLockCommandInput,
    DisableDomainTransferLockCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DisableDomainTransferLockCommand extends DisableDomainTransferLockCommand_base {
  protected static __types: {
    api: {
      input: DisableDomainTransferLockRequest;
      output: DisableDomainTransferLockResponse;
    };
    sdk: {
      input: DisableDomainTransferLockCommandInput;
      output: DisableDomainTransferLockCommandOutput;
    };
  };
}
