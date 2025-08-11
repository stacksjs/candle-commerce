import { createPaginator } from "@smithy/core";
import { CloudFrontClient } from "../CloudFrontClient";
import { ListConnectionGroupsCommand, } from "../commands/ListConnectionGroupsCommand";
export const paginateListConnectionGroups = createPaginator(CloudFrontClient, ListConnectionGroupsCommand, "Marker", "NextMarker", "MaxItems");
