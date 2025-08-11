import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetOperationDetailRequest,
  GetOperationDetailResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface GetOperationDetailCommandInput
  extends GetOperationDetailRequest {}
export interface GetOperationDetailCommandOutput
  extends GetOperationDetailResponse,
    __MetadataBearer {}
declare const GetOperationDetailCommand_base: {
  new (
    input: GetOperationDetailCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetOperationDetailCommandInput,
    GetOperationDetailCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetOperationDetailCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetOperationDetailCommandInput,
    GetOperationDetailCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class GetOperationDetailCommand extends GetOperationDetailCommand_base {
  protected static __types: {
    api: {
      input: GetOperationDetailRequest;
      output: GetOperationDetailResponse;
    };
    sdk: {
      input: GetOperationDetailCommandInput;
      output: GetOperationDetailCommandOutput;
    };
  };
}
