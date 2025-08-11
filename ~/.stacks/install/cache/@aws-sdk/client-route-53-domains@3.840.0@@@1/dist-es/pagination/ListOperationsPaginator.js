import { createPaginator } from "@smithy/core";
import { ListOperationsCommand, } from "../commands/ListOperationsCommand";
import { Route53DomainsClient } from "../Route53DomainsClient";
export const paginateListOperations = createPaginator(Route53DomainsClient, ListOperationsCommand, "Marker", "NextPageMarker", "MaxItems");
