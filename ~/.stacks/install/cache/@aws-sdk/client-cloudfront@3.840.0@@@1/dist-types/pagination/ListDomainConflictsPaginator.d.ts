import { Paginator } from "@smithy/types";
import { ListDomainConflictsCommandInput, ListDomainConflictsCommandOutput } from "../commands/ListDomainConflictsCommand";
import { CloudFrontPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListDomainConflicts: (config: CloudFrontPaginationConfiguration, input: ListDomainConflictsCommandInput, ...rest: any[]) => Paginator<ListDomainConflictsCommandOutput>;
