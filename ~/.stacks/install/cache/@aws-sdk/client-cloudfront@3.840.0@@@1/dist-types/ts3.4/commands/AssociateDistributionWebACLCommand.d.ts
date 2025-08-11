import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  AssociateDistributionWebACLRequest,
  AssociateDistributionWebACLResult,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface AssociateDistributionWebACLCommandInput
  extends AssociateDistributionWebACLRequest {}
export interface AssociateDistributionWebACLCommandOutput
  extends AssociateDistributionWebACLResult,
    __MetadataBearer {}
declare const AssociateDistributionWebACLCommand_base: {
  new (
    input: AssociateDistributionWebACLCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    AssociateDistributionWebACLCommandInput,
    AssociateDistributionWebACLCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: AssociateDistributionWebACLCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    AssociateDistributionWebACLCommandInput,
    AssociateDistributionWebACLCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class AssociateDistributionWebACLCommand extends AssociateDistributionWebACLCommand_base {
  protected static __types: {
    api: {
      input: AssociateDistributionWebACLRequest;
      output: AssociateDistributionWebACLResult;
    };
    sdk: {
      input: AssociateDistributionWebACLCommandInput;
      output: AssociateDistributionWebACLCommandOutput;
    };
  };
}
