import { createPaginator } from "@smithy/core";
import { CloudFrontClient } from "../CloudFrontClient";
import { ListDistributionTenantsCommand, } from "../commands/ListDistributionTenantsCommand";
export const paginateListDistributionTenants = createPaginator(CloudFrontClient, ListDistributionTenantsCommand, "Marker", "NextMarker", "MaxItems");
