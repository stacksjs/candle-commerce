import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  GetDistributionTenantByDomainRequest,
  GetDistributionTenantByDomainResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface GetDistributionTenantByDomainCommandInput
  extends GetDistributionTenantByDomainRequest {}
export interface GetDistributionTenantByDomainCommandOutput
  extends GetDistributionTenantByDomainResult,
    __MetadataBearer {}
declare const GetDistributionTenantByDomainCommand_base: {
  new (
    input: GetDistributionTenantByDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetDistributionTenantByDomainCommandInput,
    GetDistributionTenantByDomainCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetDistributionTenantByDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetDistributionTenantByDomainCommandInput,
    GetDistributionTenantByDomainCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class GetDistributionTenantByDomainCommand extends GetDistributionTenantByDomainCommand_base {
  protected static __types: {
    api: {
      input: GetDistributionTenantByDomainRequest;
      output: GetDistributionTenantByDomainResult;
    };
    sdk: {
      input: GetDistributionTenantByDomainCommandInput;
      output: GetDistributionTenantByDomainCommandOutput;
    };
  };
}
