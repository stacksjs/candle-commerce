import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  AccessPointDescription,
  CreateAccessPointRequest,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface CreateAccessPointCommandInput
  extends CreateAccessPointRequest {}
export interface CreateAccessPointCommandOutput
  extends AccessPointDescription,
    __MetadataBearer {}
declare const CreateAccessPointCommand_base: {
  new (
    input: CreateAccessPointCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CreateAccessPointCommandInput,
    CreateAccessPointCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CreateAccessPointCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CreateAccessPointCommandInput,
    CreateAccessPointCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class CreateAccessPointCommand extends CreateAccessPointCommand_base {
  protected static __types: {
    api: {
      input: CreateAccessPointRequest;
      output: AccessPointDescription;
    };
    sdk: {
      input: CreateAccessPointCommandInput;
      output: CreateAccessPointCommandOutput;
    };
  };
}
