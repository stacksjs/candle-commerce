import { createPaginator } from "@smithy/core";
import { CloudFrontClient } from "../CloudFrontClient";
import { ListDistributionTenantsByCustomizationCommand, } from "../commands/ListDistributionTenantsByCustomizationCommand";
export const paginateListDistributionTenantsByCustomization = createPaginator(CloudFrontClient, ListDistributionTenantsByCustomizationCommand, "Marker", "NextMarker", "MaxItems");
