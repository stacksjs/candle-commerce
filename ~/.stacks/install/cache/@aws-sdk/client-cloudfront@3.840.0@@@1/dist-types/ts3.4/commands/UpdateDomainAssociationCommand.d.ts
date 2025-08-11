import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  UpdateDomainAssociationRequest,
  UpdateDomainAssociationResult,
} from "../models/models_2";
export { __MetadataBearer };
export { $Command };
export interface UpdateDomainAssociationCommandInput
  extends UpdateDomainAssociationRequest {}
export interface UpdateDomainAssociationCommandOutput
  extends UpdateDomainAssociationResult,
    __MetadataBearer {}
declare const UpdateDomainAssociationCommand_base: {
  new (
    input: UpdateDomainAssociationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateDomainAssociationCommandInput,
    UpdateDomainAssociationCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: UpdateDomainAssociationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    UpdateDomainAssociationCommandInput,
    UpdateDomainAssociationCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class UpdateDomainAssociationCommand extends UpdateDomainAssociationCommand_base {
  protected static __types: {
    api: {
      input: UpdateDomainAssociationRequest;
      output: UpdateDomainAssociationResult;
    };
    sdk: {
      input: UpdateDomainAssociationCommandInput;
      output: UpdateDomainAssociationCommandOutput;
    };
  };
}
