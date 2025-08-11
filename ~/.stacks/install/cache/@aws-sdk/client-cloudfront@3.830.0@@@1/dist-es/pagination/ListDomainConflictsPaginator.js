import { createPaginator } from "@smithy/core";
import { CloudFrontClient } from "../CloudFrontClient";
import { ListDomainConflictsCommand, } from "../commands/ListDomainConflictsCommand";
export const paginateListDomainConflicts = createPaginator(CloudFrontClient, ListDomainConflictsCommand, "Marker", "NextMarker", "MaxItems");
