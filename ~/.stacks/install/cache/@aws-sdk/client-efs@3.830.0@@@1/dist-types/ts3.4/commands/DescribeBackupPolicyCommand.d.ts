import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  BackupPolicyDescription,
  DescribeBackupPolicyRequest,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeBackupPolicyCommandInput
  extends DescribeBackupPolicyRequest {}
export interface DescribeBackupPolicyCommandOutput
  extends BackupPolicyDescription,
    __MetadataBearer {}
declare const DescribeBackupPolicyCommand_base: {
  new (
    input: DescribeBackupPolicyCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeBackupPolicyCommandInput,
    DescribeBackupPolicyCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DescribeBackupPolicyCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeBackupPolicyCommandInput,
    DescribeBackupPolicyCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DescribeBackupPolicyCommand extends DescribeBackupPolicyCommand_base {
  protected static __types: {
    api: {
      input: DescribeBackupPolicyRequest;
      output: BackupPolicyDescription;
    };
    sdk: {
      input: DescribeBackupPolicyCommandInput;
      output: DescribeBackupPolicyCommandOutput;
    };
  };
}
