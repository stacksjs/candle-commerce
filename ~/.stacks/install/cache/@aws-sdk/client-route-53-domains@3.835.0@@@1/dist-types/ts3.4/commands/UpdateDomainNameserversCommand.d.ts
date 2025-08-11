import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  UpdateDomainNameserversRequest,
  UpdateDomainNameserversResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface UpdateDomainNameserversCommandInput
  extends UpdateDomainNameserversRequest {}
export interface UpdateDomainNameserversCommandOutput
  extends UpdateDomainNameserversResponse,
    __MetadataBearer {}
declare const UpdateDomainNameserversCommand_base: {
  new (
    input: UpdateDomainNameserversCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateDomainNameserversCommandInput,
    UpdateDomainNameserversCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateDomainNameserversCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateDomainNameserversCommandInput,
    UpdateDomainNameserversCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class UpdateDomainNameserversCommand extends UpdateDomainNameserversCommand_base {
  protected static __types: {
    api: {
      input: UpdateDomainNameserversRequest;
      output: UpdateDomainNameserversResponse;
    };
    sdk: {
      input: UpdateDomainNameserversCommandInput;
      output: UpdateDomainNameserversCommandOutput;
    };
  };
}
