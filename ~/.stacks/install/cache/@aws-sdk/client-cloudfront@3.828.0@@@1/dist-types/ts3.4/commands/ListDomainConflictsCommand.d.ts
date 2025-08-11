import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  CloudFrontClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CloudFrontClient";
import {
  ListDomainConflictsRequest,
  ListDomainConflictsResult,
} from "../models/models_1";
export { __MetadataBearer };
export { $Command };
export interface ListDomainConflictsCommandInput
  extends ListDomainConflictsRequest {}
export interface ListDomainConflictsCommandOutput
  extends ListDomainConflictsResult,
    __MetadataBearer {}
declare const ListDomainConflictsCommand_base: {
  new (
    input: ListDomainConflictsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListDomainConflictsCommandInput,
    ListDomainConflictsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    input: ListDomainConflictsCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListDomainConflictsCommandInput,
    ListDomainConflictsCommandOutput,
    CloudFrontClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListDomainConflictsCommand extends ListDomainConflictsCommand_base {
  protected static __types: {
    api: {
      input: ListDomainConflictsRequest;
      output: ListDomainConflictsResult;
    };
    sdk: {
      input: ListDomainConflictsCommandInput;
      output: ListDomainConflictsCommandOutput;
    };
  };
}
