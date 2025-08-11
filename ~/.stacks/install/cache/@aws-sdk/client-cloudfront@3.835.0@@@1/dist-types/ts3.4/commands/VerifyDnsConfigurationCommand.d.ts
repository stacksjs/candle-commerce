import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  VerifyDnsConfigurationRequest,
  VerifyDnsConfigurationResult,
} from "../models/models_2";
export { __MetadataBearer };
export { $Command };
export interface VerifyDnsConfigurationCommandInput
  extends VerifyDnsConfigurationRequest {}
export interface VerifyDnsConfigurationCommandOutput
  extends VerifyDnsConfigurationResult,
    __MetadataBearer {}
declare const VerifyDnsConfigurationCommand_base: {
  new (
    input: VerifyDnsConfigurationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    VerifyDnsConfigurationCommandInput,
    VerifyDnsConfigurationCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: VerifyDnsConfigurationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    VerifyDnsConfigurationCommandInput,
    VerifyDnsConfigurationCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class VerifyDnsConfigurationCommand extends VerifyDnsConfigurationCommand_base {
  protected static __types: {
    api: {
      input: VerifyDnsConfigurationRequest;
      output: VerifyDnsConfigurationResult;
    };
    sdk: {
      input: VerifyDnsConfigurationCommandInput;
      output: VerifyDnsConfigurationCommandOutput;
    };
  };
}
