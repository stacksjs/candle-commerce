import { Paginator } from "@smithy/types";
import {
  ListDomainsCommandInput,
  ListDomainsCommandOutput,
} from "../commands/ListDomainsCommand";
import { Route53DomainsPaginationConfiguration } from "./Interfaces";
export declare const paginateListDomains: (
  config: Route53DomainsPaginationConfiguration,
  input: ListDomainsCommandInput,
  ...rest: any[]
) => Paginator<ListDomainsCommandOutput>;
