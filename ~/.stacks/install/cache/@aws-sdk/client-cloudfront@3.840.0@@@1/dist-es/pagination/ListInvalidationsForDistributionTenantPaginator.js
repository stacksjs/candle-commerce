import { createPaginator } from "@smithy/core";
import { CloudFrontClient } from "../CloudFrontClient";
import { ListInvalidationsForDistributionTenantCommand, } from "../commands/ListInvalidationsForDistributionTenantCommand";
export const paginateListInvalidationsForDistributionTenant = createPaginator(CloudFrontClient, ListInvalidationsForDistributionTenantCommand, "Marker", "InvalidationList.NextMarker", "MaxItems");
