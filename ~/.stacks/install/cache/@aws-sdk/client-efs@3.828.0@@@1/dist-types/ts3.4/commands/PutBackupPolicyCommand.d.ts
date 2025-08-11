import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  BackupPolicyDescription,
  PutBackupPolicyRequest,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface PutBackupPolicyCommandInput extends PutBackupPolicyRequest {}
export interface PutBackupPolicyCommandOutput
  extends BackupPolicyDescription,
    __MetadataBearer {}
declare const PutBackupPolicyCommand_base: {
  new (
    input: PutBackupPolicyCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    PutBackupPolicyCommandInput,
    PutBackupPolicyCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutBackupPolicyCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    PutBackupPolicyCommandInput,
    PutBackupPolicyCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class PutBackupPolicyCommand extends PutBackupPolicyCommand_base {
  protected static __types: {
    api: {
      input: PutBackupPolicyRequest;
      output: BackupPolicyDescription;
    };
    sdk: {
      input: PutBackupPolicyCommandInput;
      output: PutBackupPolicyCommandOutput;
    };
  };
}
