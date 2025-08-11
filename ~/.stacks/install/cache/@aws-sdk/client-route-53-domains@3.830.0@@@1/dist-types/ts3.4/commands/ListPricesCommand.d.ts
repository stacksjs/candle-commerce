import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { ListPricesRequest, ListPricesResponse } from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface ListPricesCommandInput extends ListPricesRequest {}
export interface ListPricesCommandOutput
  extends ListPricesResponse,
    __MetadataBearer {}
declare const ListPricesCommand_base: {
  new (
    input: ListPricesCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListPricesCommandInput,
    ListPricesCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [ListPricesCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    ListPricesCommandInput,
    ListPricesCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListPricesCommand extends ListPricesCommand_base {
  protected static __types: {
    api: {
      input: ListPricesRequest;
      output: ListPricesResponse;
    };
    sdk: {
      input: ListPricesCommandInput;
      output: ListPricesCommandOutput;
    };
  };
}
