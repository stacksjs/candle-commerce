import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import { DeleteTagsRequest } from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DeleteTagsCommandInput extends DeleteTagsRequest {}
export interface DeleteTagsCommandOutput extends __MetadataBearer {}
declare const DeleteTagsCommand_base: {
  new (
    input: DeleteTagsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteTagsCommandInput,
    DeleteTagsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteTagsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteTagsCommandInput,
    DeleteTagsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DeleteTagsCommand extends DeleteTagsCommand_base {
  protected static __types: {
    api: {
      input: DeleteTagsRequest;
      output: {};
    };
    sdk: {
      input: DeleteTagsCommandInput;
      output: DeleteTagsCommandOutput;
    };
  };
}
