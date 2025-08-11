import { Paginator } from "@smithy/types";
import {
  ListDistributionTenantsCommandInput,
  ListDistributionTenantsCommandOutput,
} from "../commands/ListDistributionTenantsCommand";
import { CloudFrontPaginationConfiguration } from "./Interfaces";
export declare const paginateListDistributionTenants: (
  config: CloudFrontPaginationConfiguration,
  input: ListDistributionTenantsCommandInput,
  ...rest: any[]
) => Paginator<ListDistributionTenantsCommandOutput>;
