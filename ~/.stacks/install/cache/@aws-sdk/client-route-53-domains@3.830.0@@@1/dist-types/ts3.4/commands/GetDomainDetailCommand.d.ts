import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetDomainDetailRequest,
  GetDomainDetailResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface GetDomainDetailCommandInput extends GetDomainDetailRequest {}
export interface GetDomainDetailCommandOutput
  extends GetDomainDetailResponse,
    __MetadataBearer {}
declare const GetDomainDetailCommand_base: {
  new (
    input: GetDomainDetailCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetDomainDetailCommandInput,
    GetDomainDetailCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetDomainDetailCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetDomainDetailCommandInput,
    GetDomainDetailCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class GetDomainDetailCommand extends GetDomainDetailCommand_base {
  protected static __types: {
    api: {
      input: GetDomainDetailRequest;
      output: GetDomainDetailResponse;
    };
    sdk: {
      input: GetDomainDetailCommandInput;
      output: GetDomainDetailCommandOutput;
    };
  };
}
