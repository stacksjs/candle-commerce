import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  AssociateDistributionTenantWebACLRequest,
  AssociateDistributionTenantWebACLResult,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface AssociateDistributionTenantWebACLCommandInput
  extends AssociateDistributionTenantWebACLRequest {}
export interface AssociateDistributionTenantWebACLCommandOutput
  extends AssociateDistributionTenantWebACLResult,
    __MetadataBearer {}
declare const AssociateDistributionTenantWebACLCommand_base: {
  new (
    input: AssociateDistributionTenantWebACLCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    AssociateDistributionTenantWebACLCommandInput,
    AssociateDistributionTenantWebACLCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: AssociateDistributionTenantWebACLCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    AssociateDistributionTenantWebACLCommandInput,
    AssociateDistributionTenantWebACLCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class AssociateDistributionTenantWebACLCommand extends AssociateDistributionTenantWebACLCommand_base {
  protected static __types: {
    api: {
      input: AssociateDistributionTenantWebACLRequest;
      output: AssociateDistributionTenantWebACLResult;
    };
    sdk: {
      input: AssociateDistributionTenantWebACLCommandInput;
      output: AssociateDistributionTenantWebACLCommandOutput;
    };
  };
}
