import { Paginator } from "@smithy/types";
import { ListInvalidationsForDistributionTenantCommandInput, ListInvalidationsForDistributionTenantCommandOutput } from "../commands/ListInvalidationsForDistributionTenantCommand";
import { CloudFrontPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListInvalidationsForDistributionTenant: (config: CloudFrontPaginationConfiguration, input: ListInvalidationsForDistributionTenantCommandInput, ...rest: any[]) => Paginator<ListInvalidationsForDistributionTenantCommandOutput>;
