import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import { DeleteDistributionTenantRequest } from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface DeleteDistributionTenantCommandInput
  extends DeleteDistributionTenantRequest {}
export interface DeleteDistributionTenantCommandOutput
  extends __MetadataBearer {}
declare const DeleteDistributionTenantCommand_base: {
  new (
    input: DeleteDistributionTenantCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteDistributionTenantCommandInput,
    DeleteDistributionTenantCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: DeleteDistributionTenantCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeleteDistributionTenantCommandInput,
    DeleteDistributionTenantCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DeleteDistributionTenantCommand extends DeleteDistributionTenantCommand_base {
  protected static __types: {
    api: {
      input: DeleteDistributionTenantRequest;
      output: {};
    };
    sdk: {
      input: DeleteDistributionTenantCommandInput;
      output: DeleteDistributionTenantCommandOutput;
    };
  };
}
