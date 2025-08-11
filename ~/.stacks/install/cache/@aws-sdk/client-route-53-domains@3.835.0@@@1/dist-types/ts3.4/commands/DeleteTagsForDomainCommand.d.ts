import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  DeleteTagsForDomainRequest,
  DeleteTagsForDomainResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface DeleteTagsForDomainCommandInput
  extends DeleteTagsForDomainRequest {}
export interface DeleteTagsForDomainCommandOutput
  extends DeleteTagsForDomainResponse,
    __MetadataBearer {}
declare const DeleteTagsForDomainCommand_base: {
  new (
    input: DeleteTagsForDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteTagsForDomainCommandInput,
    DeleteTagsForDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteTagsForDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteTagsForDomainCommandInput,
    DeleteTagsForDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DeleteTagsForDomainCommand extends DeleteTagsForDomainCommand_base {
  protected static __types: {
    api: {
      input: DeleteTagsForDomainRequest;
      output: {};
    };
    sdk: {
      input: DeleteTagsForDomainCommandInput;
      output: DeleteTagsForDomainCommandOutput;
    };
  };
}
