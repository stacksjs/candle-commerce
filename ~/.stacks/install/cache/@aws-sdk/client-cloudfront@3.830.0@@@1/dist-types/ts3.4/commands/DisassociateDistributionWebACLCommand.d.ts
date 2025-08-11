import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  DisassociateDistributionWebACLRequest,
  DisassociateDistributionWebACLResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface DisassociateDistributionWebACLCommandInput
  extends DisassociateDistributionWebACLRequest {}
export interface DisassociateDistributionWebACLCommandOutput
  extends DisassociateDistributionWebACLResult,
    __MetadataBearer {}
declare const DisassociateDistributionWebACLCommand_base: {
  new (
    input: DisassociateDistributionWebACLCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DisassociateDistributionWebACLCommandInput,
    DisassociateDistributionWebACLCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DisassociateDistributionWebACLCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DisassociateDistributionWebACLCommandInput,
    DisassociateDistributionWebACLCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DisassociateDistributionWebACLCommand extends DisassociateDistributionWebACLCommand_base {
  protected static __types: {
    api: {
      input: DisassociateDistributionWebACLRequest;
      output: DisassociateDistributionWebACLResult;
    };
    sdk: {
      input: DisassociateDistributionWebACLCommandInput;
      output: DisassociateDistributionWebACLCommandOutput;
    };
  };
}
