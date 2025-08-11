import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  DescribeMountTargetSecurityGroupsRequest,
  DescribeMountTargetSecurityGroupsResponse,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeMountTargetSecurityGroupsCommandInput
  extends DescribeMountTargetSecurityGroupsRequest {}
export interface DescribeMountTargetSecurityGroupsCommandOutput
  extends DescribeMountTargetSecurityGroupsResponse,
    __MetadataBearer {}
declare const DescribeMountTargetSecurityGroupsCommand_base: {
  new (
    input: DescribeMountTargetSecurityGroupsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeMountTargetSecurityGroupsCommandInput,
    DescribeMountTargetSecurityGroupsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DescribeMountTargetSecurityGroupsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeMountTargetSecurityGroupsCommandInput,
    DescribeMountTargetSecurityGroupsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DescribeMountTargetSecurityGroupsCommand extends DescribeMountTargetSecurityGroupsCommand_base {
  protected static __types: {
    api: {
      input: DescribeMountTargetSecurityGroupsRequest;
      output: DescribeMountTargetSecurityGroupsResponse;
    };
    sdk: {
      input: DescribeMountTargetSecurityGroupsCommandInput;
      output: DescribeMountTargetSecurityGroupsCommandOutput;
    };
  };
}
