import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  RegisterDomainRequest,
  RegisterDomainResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface RegisterDomainCommandInput extends RegisterDomainRequest {}
export interface RegisterDomainCommandOutput
  extends RegisterDomainResponse,
    __MetadataBearer {}
declare const RegisterDomainCommand_base: {
  new (
    input: RegisterDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    RegisterDomainCommandInput,
    RegisterDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: RegisterDomainCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    RegisterDomainCommandInput,
    RegisterDomainCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class RegisterDomainCommand extends RegisterDomainCommand_base {
  protected static __types: {
    api: {
      input: RegisterDomainRequest;
      output: RegisterDomainResponse;
    };
    sdk: {
      input: RegisterDomainCommandInput;
      output: RegisterDomainCommandOutput;
    };
  };
}
