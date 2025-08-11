import { createPaginator } from "@smithy/core";
import { ListDomainsCommand } from "../commands/ListDomainsCommand";
import { Route53DomainsClient } from "../Route53DomainsClient";
export const paginateListDomains = createPaginator(Route53DomainsClient, ListDomainsCommand, "Marker", "NextPageMarker", "MaxItems");
