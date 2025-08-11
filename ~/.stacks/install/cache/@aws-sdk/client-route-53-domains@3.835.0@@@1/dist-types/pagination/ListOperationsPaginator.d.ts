import { Paginator } from "@smithy/types";
import { ListOperationsCommandInput, ListOperationsCommandOutput } from "../commands/ListOperationsCommand";
import { Route53DomainsPaginationConfiguration } from "./Interfaces";
/**
 * @public
 */
export declare const paginateListOperations: (config: Route53DomainsPaginationConfiguration, input: ListOperationsCommandInput, ...rest: any[]) => Paginator<ListOperationsCommandOutput>;
