import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  LifecycleConfigurationDescription,
  PutLifecycleConfigurationRequest,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface PutLifecycleConfigurationCommandInput
  extends PutLifecycleConfigurationRequest {}
export interface PutLifecycleConfigurationCommandOutput
  extends LifecycleConfigurationDescription,
    __MetadataBearer {}
declare const PutLifecycleConfigurationCommand_base: {
  new (
    input: PutLifecycleConfigurationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    PutLifecycleConfigurationCommandInput,
    PutLifecycleConfigurationCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutLifecycleConfigurationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    PutLifecycleConfigurationCommandInput,
    PutLifecycleConfigurationCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class PutLifecycleConfigurationCommand extends PutLifecycleConfigurationCommand_base {
  protected static __types: {
    api: {
      input: PutLifecycleConfigurationRequest;
      output: LifecycleConfigurationDescription;
    };
    sdk: {
      input: PutLifecycleConfigurationCommandInput;
      output: PutLifecycleConfigurationCommandOutput;
    };
  };
}
