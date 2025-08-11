import { Paginator } from "@smithy/types";
import {
  ListPricesCommandInput,
  ListPricesCommandOutput,
} from "../commands/ListPricesCommand";
import { Route53DomainsPaginationConfiguration } from "./Interfaces";
export declare const paginateListPrices: (
  config: Route53DomainsPaginationConfiguration,
  input: ListPricesCommandInput,
  ...rest: any[]
) => Paginator<ListPricesCommandOutput>;
