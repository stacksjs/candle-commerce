import { createPaginator } from "@smithy/core";
import { CloudFrontClient } from "../CloudFrontClient";
import { ListDistributionsByConnectionModeCommand, } from "../commands/ListDistributionsByConnectionModeCommand";
export const paginateListDistributionsByConnectionMode = createPaginator(CloudFrontClient, ListDistributionsByConnectionModeCommand, "Marker", "DistributionList.NextMarker", "MaxItems");
