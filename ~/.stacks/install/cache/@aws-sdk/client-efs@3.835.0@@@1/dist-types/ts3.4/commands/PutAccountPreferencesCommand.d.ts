import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  PutAccountPreferencesRequest,
  PutAccountPreferencesResponse,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface PutAccountPreferencesCommandInput
  extends PutAccountPreferencesRequest {}
export interface PutAccountPreferencesCommandOutput
  extends PutAccountPreferencesResponse,
    __MetadataBearer {}
declare const PutAccountPreferencesCommand_base: {
  new (
    input: PutAccountPreferencesCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    PutAccountPreferencesCommandInput,
    PutAccountPreferencesCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: PutAccountPreferencesCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    PutAccountPreferencesCommandInput,
    PutAccountPreferencesCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class PutAccountPreferencesCommand extends PutAccountPreferencesCommand_base {
  protected static __types: {
    api: {
      input: PutAccountPreferencesRequest;
      output: PutAccountPreferencesResponse;
    };
    sdk: {
      input: PutAccountPreferencesCommandInput;
      output: PutAccountPreferencesCommandOutput;
    };
  };
}
