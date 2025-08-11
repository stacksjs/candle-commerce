import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import { ModifyMountTargetSecurityGroupsRequest } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface ModifyMountTargetSecurityGroupsCommandInput
  extends ModifyMountTargetSecurityGroupsRequest {}
export interface ModifyMountTargetSecurityGroupsCommandOutput
  extends __MetadataBearer {}
declare const ModifyMountTargetSecurityGroupsCommand_base: {
  new (
    input: ModifyMountTargetSecurityGroupsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ModifyMountTargetSecurityGroupsCommandInput,
    ModifyMountTargetSecurityGroupsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ModifyMountTargetSecurityGroupsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ModifyMountTargetSecurityGroupsCommandInput,
    ModifyMountTargetSecurityGroupsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ModifyMountTargetSecurityGroupsCommand extends ModifyMountTargetSecurityGroupsCommand_base {
  protected static __types: {
    api: {
      input: ModifyMountTargetSecurityGroupsRequest;
      output: {};
    };
    sdk: {
      input: ModifyMountTargetSecurityGroupsCommandInput;
      output: ModifyMountTargetSecurityGroupsCommandOutput;
    };
  };
}
