import { Paginator } from "@smithy/types";
import { ListConnectionGroupsCommandInput, ListConnectionGroupsCommandOutput } from "../commands/ListConnectionGroupsCommand";
import { CloudFrontPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListConnectionGroups: (config: CloudFrontPaginationConfiguration, input: ListConnectionGroupsCommandInput, ...rest: any[]) => Paginator<ListConnectionGroupsCommandOutput>;
