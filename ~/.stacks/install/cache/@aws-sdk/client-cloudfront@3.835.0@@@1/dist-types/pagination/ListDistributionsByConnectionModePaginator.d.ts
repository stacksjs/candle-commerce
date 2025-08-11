import { Paginator } from "@smithy/types";
import { ListDistributionsByConnectionModeCommandInput, ListDistributionsByConnectionModeCommandOutput } from "../commands/ListDistributionsByConnectionModeCommand";
import { CloudFrontPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListDistributionsByConnectionMode: (config: CloudFrontPaginationConfiguration, input: ListDistributionsByConnectionModeCommandInput, ...rest: any[]) => Paginator<ListDistributionsByConnectionModeCommandOutput>;
