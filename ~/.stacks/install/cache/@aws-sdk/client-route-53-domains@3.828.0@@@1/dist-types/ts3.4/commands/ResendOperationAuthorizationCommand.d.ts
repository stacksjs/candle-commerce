import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { ResendOperationAuthorizationRequest } from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface ResendOperationAuthorizationCommandInput
  extends ResendOperationAuthorizationRequest {}
export interface ResendOperationAuthorizationCommandOutput
  extends __MetadataBearer {}
declare const ResendOperationAuthorizationCommand_base: {
  new (
    input: ResendOperationAuthorizationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ResendOperationAuthorizationCommandInput,
    ResendOperationAuthorizationCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ResendOperationAuthorizationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ResendOperationAuthorizationCommandInput,
    ResendOperationAuthorizationCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ResendOperationAuthorizationCommand extends ResendOperationAuthorizationCommand_base {
  protected static __types: {
    api: {
      input: ResendOperationAuthorizationRequest;
      output: {};
    };
    sdk: {
      input: ResendOperationAuthorizationCommandInput;
      output: ResendOperationAuthorizationCommandOutput;
    };
  };
}
