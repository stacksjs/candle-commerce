import { Paginator } from "@smithy/types";
import { ViewBillingCommandInput, ViewBillingCommandOutput } from "../commands/ViewBillingCommand";
import { Route53DomainsPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateViewBilling: (config: Route53DomainsPaginationConfiguration, input: ViewBillingCommandInput, ...rest: any[]) => Paginator<ViewBillingCommandOutput>;
