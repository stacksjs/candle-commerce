import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  EFSClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../EFSClient";
import {
  DescribeMountTargetsRequest,
  DescribeMountTargetsResponse,
} from "../models/models_0";
export { __MetadataBearer };
export { $Command };
export interface DescribeMountTargetsCommandInput
  extends DescribeMountTargetsRequest {}
export interface DescribeMountTargetsCommandOutput
  extends DescribeMountTargetsResponse,
    __MetadataBearer {}
declare const DescribeMountTargetsCommand_base: {
  new (
    input: DescribeMountTargetsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeMountTargetsCommandInput,
    DescribeMountTargetsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    ...[input]: [] | [DescribeMountTargetsCommandInput]
  ): import("@smithy/smithy-client").CommandImpl<
    DescribeMountTargetsCommandInput,
    DescribeMountTargetsCommandOutput,
    EFSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DescribeMountTargetsCommand extends DescribeMountTargetsCommand_base {
  protected static __types: {
    api: {
      input: DescribeMountTargetsRequest;
      output: DescribeMountTargetsResponse;
    };
    sdk: {
      input: DescribeMountTargetsCommandInput;
      output: DescribeMountTargetsCommandOutput;
    };
  };
}
