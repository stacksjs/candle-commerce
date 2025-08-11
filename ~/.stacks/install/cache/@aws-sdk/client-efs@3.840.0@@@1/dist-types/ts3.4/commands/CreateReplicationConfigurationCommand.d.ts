import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  CreateReplicationConfigurationRequest,
  ReplicationConfigurationDescription,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface CreateReplicationConfigurationCommandInput
  extends CreateReplicationConfigurationRequest {}
export interface CreateReplicationConfigurationCommandOutput
  extends ReplicationConfigurationDescription,
    __MetadataBearer {}
declare const CreateReplicationConfigurationCommand_base: {
  new (
    input: CreateReplicationConfigurationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CreateReplicationConfigurationCommandInput,
    CreateReplicationConfigurationCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CreateReplicationConfigurationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CreateReplicationConfigurationCommandInput,
    CreateReplicationConfigurationCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class CreateReplicationConfigurationCommand extends CreateReplicationConfigurationCommand_base {
  protected static __types: {
    api: {
      input: CreateReplicationConfigurationRequest;
      output: ReplicationConfigurationDescription;
    };
    sdk: {
      input: CreateReplicationConfigurationCommandInput;
      output: CreateReplicationConfigurationCommandOutput;
    };
  };
}
