import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import { CreateTagsRequest } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface CreateTagsCommandInput extends CreateTagsRequest {}
export interface CreateTagsCommandOutput extends __MetadataBearer {}
declare const CreateTagsCommand_base: {
  new (
    input: CreateTagsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CreateTagsCommandInput,
    CreateTagsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: CreateTagsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    CreateTagsCommandInput,
    CreateTagsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class CreateTagsCommand extends CreateTagsCommand_base {
  protected static __types: {
    api: {
      input: CreateTagsRequest;
      output: {};
    };
    sdk: {
      input: CreateTagsCommandInput;
      output: CreateTagsCommandOutput;
    };
  };
}
