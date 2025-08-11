import { WaiterConfiguration, WaiterResult } from "@smithy/util-waiter";
import { CloudFrontClient } from "../CloudFrontClient";
import { GetInvalidationForDistributionTenantCommandInput } from "../commands/GetInvalidationForDistributionTenantCommand";
/**
 * Wait until an invalidation for distribution tenant has completed.
 *  @deprecated Use waitUntilInvalidationForDistributionTenantCompleted instead. waitForInvalidationForDistributionTenantCompleted does not throw error in non-success cases.
 */
export declare const waitForInvalidationForDistributionTenantCompleted: (params: WaiterConfiguration<CloudFrontClient>, input: GetInvalidationForDistributionTenantCommandInput) => Promise<WaiterResult>;
/**
 * Wait until an invalidation for distribution tenant has completed.
 *  @param params - Waiter configuration options.
 *  @param input - The input to GetInvalidationForDistributionTenantCommand for polling.
 */
export declare const waitUntilInvalidationForDistributionTenantCompleted: (params: WaiterConfiguration<CloudFrontClient>, input: GetInvalidationForDistributionTenantCommandInput) => Promise<WaiterResult>;
