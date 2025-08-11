import { createPaginator } from "@smithy/core";
import { ViewBillingCommand } from "../commands/ViewBillingCommand";
import { Route53DomainsClient } from "../Route53DomainsClient";
export const paginateViewBilling = createPaginator(Route53DomainsClient, ViewBillingCommand, "Marker", "NextPageMarker", "MaxItems");
