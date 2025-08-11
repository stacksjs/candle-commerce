import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  GetManagedCertificateDetailsRequest,
  GetManagedCertificateDetailsResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface GetManagedCertificateDetailsCommandInput
  extends GetManagedCertificateDetailsRequest {}
export interface GetManagedCertificateDetailsCommandOutput
  extends GetManagedCertificateDetailsResult,
    __MetadataBearer {}
declare const GetManagedCertificateDetailsCommand_base: {
  new (
    input: GetManagedCertificateDetailsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetManagedCertificateDetailsCommandInput,
    GetManagedCertificateDetailsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: GetManagedCertificateDetailsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetManagedCertificateDetailsCommandInput,
    GetManagedCertificateDetailsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class GetManagedCertificateDetailsCommand extends GetManagedCertificateDetailsCommand_base {
  protected static __types: {
    api: {
      input: GetManagedCertificateDetailsRequest;
      output: GetManagedCertificateDetailsResult;
    };
    sdk: {
      input: GetManagedCertificateDetailsCommandInput;
      output: GetManagedCertificateDetailsCommandOutput;
    };
  };
}
