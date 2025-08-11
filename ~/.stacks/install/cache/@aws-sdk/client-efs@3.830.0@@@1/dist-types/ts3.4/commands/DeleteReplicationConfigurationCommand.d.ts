import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import { DeleteReplicationConfigurationRequest } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DeleteReplicationConfigurationCommandInput
  extends DeleteReplicationConfigurationRequest {}
export interface DeleteReplicationConfigurationCommandOutput
  extends __MetadataBearer {}
declare const DeleteReplicationConfigurationCommand_base: {
  new (
    input: DeleteReplicationConfigurationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteReplicationConfigurationCommandInput,
    DeleteReplicationConfigurationCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteReplicationConfigurationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteReplicationConfigurationCommandInput,
    DeleteReplicationConfigurationCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DeleteReplicationConfigurationCommand extends DeleteReplicationConfigurationCommand_base {
  protected static __types: {
    api: {
      input: DeleteReplicationConfigurationRequest;
      output: {};
    };
    sdk: {
      input: DeleteReplicationConfigurationCommandInput;
      output: DeleteReplicationConfigurationCommandOutput;
    };
  };
}
