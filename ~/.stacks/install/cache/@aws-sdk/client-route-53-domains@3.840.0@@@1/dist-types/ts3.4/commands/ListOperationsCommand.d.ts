import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  ListOperationsRequest,
  ListOperationsResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface ListOperationsCommandInput extends ListOperationsRequest {}
export interface ListOperationsCommandOutput
  extends ListOperationsResponse,
    __MetadataBearer {}
declare const ListOperationsCommand_base: {
  new (
    input: ListOperationsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListOperationsCommandInput,
    ListOperationsCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ListOperationsCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    ListOperationsCommandInput,
    ListOperationsCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListOperationsCommand extends ListOperationsCommand_base {
  protected static __types: {
    api: {
      input: ListOperationsRequest;
      output: ListOperationsResponse;
    };
    sdk: {
      input: ListOperationsCommandInput;
      output: ListOperationsCommandOutput;
    };
  };
}
