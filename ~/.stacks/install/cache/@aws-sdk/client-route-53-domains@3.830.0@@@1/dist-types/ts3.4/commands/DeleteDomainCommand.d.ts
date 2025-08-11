import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { DeleteDomainRequest, DeleteDomainResponse } from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface DeleteDomainCommandInput extends DeleteDomainRequest {}
export interface DeleteDomainCommandOutput
  extends DeleteDomainResponse,
    __MetadataBearer {}
declare const DeleteDomainCommand_base: {
  new (
    input: DeleteDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteDomainCommandInput,
    DeleteDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteDomainCommandInput,
    DeleteDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DeleteDomainCommand extends DeleteDomainCommand_base {
  protected static __types: {
    api: {
      input: DeleteDomainRequest;
      output: DeleteDomainResponse;
    };
    sdk: {
      input: DeleteDomainCommandInput;
      output: DeleteDomainCommandOutput;
    };
  };
}
