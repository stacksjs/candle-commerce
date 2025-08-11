import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  DescribeAccountPreferencesRequest,
  DescribeAccountPreferencesResponse,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeAccountPreferencesCommandInput
  extends DescribeAccountPreferencesRequest {}
export interface DescribeAccountPreferencesCommandOutput
  extends DescribeAccountPreferencesResponse,
    __MetadataBearer {}
declare const DescribeAccountPreferencesCommand_base: {
  new (
    input: DescribeAccountPreferencesCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeAccountPreferencesCommandInput,
    DescribeAccountPreferencesCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [DescribeAccountPreferencesCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeAccountPreferencesCommandInput,
    DescribeAccountPreferencesCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DescribeAccountPreferencesCommand extends DescribeAccountPreferencesCommand_base {
  protected static __types: {
    api: {
      input: DescribeAccountPreferencesRequest;
      output: DescribeAccountPreferencesResponse;
    };
    sdk: {
      input: DescribeAccountPreferencesCommandInput;
      output: DescribeAccountPreferencesCommandOutput;
    };
  };
}
