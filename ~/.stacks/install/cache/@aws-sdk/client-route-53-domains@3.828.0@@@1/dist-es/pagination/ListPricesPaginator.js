import { createPaginator } from "@smithy/core";
import { ListPricesCommand } from "../commands/ListPricesCommand";
import { Route53DomainsClient } from "../Route53DomainsClient";
export const paginateListPrices = createPaginator(Route53DomainsClient, ListPricesCommand, "Marker", "NextPageMarker", "MaxItems");
