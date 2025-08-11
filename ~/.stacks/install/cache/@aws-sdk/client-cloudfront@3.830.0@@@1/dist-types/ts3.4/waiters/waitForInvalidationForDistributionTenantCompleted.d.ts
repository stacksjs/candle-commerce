import { WaiterConfiguration, WaiterResult } from "@smithy/util-waiter";
import { CloudFrontClient } from "../CloudFrontClient";
import { GetInvalidationForDistributionTenantCommandInput } from "../commands/GetInvalidationForDistributionTenantCommand";
export declare const waitForInvalidationForDistributionTenantCompleted: (
  params: WaiterConfiguration<CloudFrontClient>,
  input: GetInvalidationForDistributionTenantCommandInput
) => Promise<WaiterResult>;
export declare const waitUntilInvalidationForDistributionTenantCompleted: (
  params: WaiterConfiguration<CloudFrontClient>,
  input: GetInvalidationForDistributionTenantCommandInput
) => Promise<WaiterResult>;
