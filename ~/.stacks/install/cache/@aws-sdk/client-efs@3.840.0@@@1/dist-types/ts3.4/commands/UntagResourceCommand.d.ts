import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import { UntagResourceRequest } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface UntagResourceCommandInput extends UntagResourceRequest {}
export interface UntagResourceCommandOutput extends __MetadataBearer {}
declare const UntagResourceCommand_base: {
  new (
    input: UntagResourceCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UntagResourceCommandInput,
    UntagResourceCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UntagResourceCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UntagResourceCommandInput,
    UntagResourceCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class UntagResourceCommand extends UntagResourceCommand_base {
  protected static __types: {
    api: {
      input: UntagResourceRequest;
      output: {};
    };
    sdk: {
      input: UntagResourceCommandInput;
      output: UntagResourceCommandOutput;
    };
  };
}
