import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  RetrieveDomainAuthCodeRequest,
  RetrieveDomainAuthCodeResponse,
} from "../models/models_0";
import {
  Route53DomainsClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../Route53DomainsClient";
export { __MetadataBearer };
export { $Command };
export interface RetrieveDomainAuthCodeCommandInput
  extends RetrieveDomainAuthCodeRequest {}
export interface RetrieveDomainAuthCodeCommandOutput
  extends RetrieveDomainAuthCodeResponse,
    __MetadataBearer {}
declare const RetrieveDomainAuthCodeCommand_base: {
  new (
    input: RetrieveDomainAuthCodeCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    RetrieveDomainAuthCodeCommandInput,
    RetrieveDomainAuthCodeCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: RetrieveDomainAuthCodeCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    RetrieveDomainAuthCodeCommandInput,
    RetrieveDomainAuthCodeCommandOutput,
    Route53DomainsClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class RetrieveDomainAuthCodeCommand extends RetrieveDomainAuthCodeCommand_base {
  protected static __types: {
    api: {
      input: RetrieveDomainAuthCodeRequest;
      output: RetrieveDomainAuthCodeResponse;
    };
    sdk: {
      input: RetrieveDomainAuthCodeCommandInput;
      output: RetrieveDomainAuthCodeCommandOutput;
    };
  };
}
