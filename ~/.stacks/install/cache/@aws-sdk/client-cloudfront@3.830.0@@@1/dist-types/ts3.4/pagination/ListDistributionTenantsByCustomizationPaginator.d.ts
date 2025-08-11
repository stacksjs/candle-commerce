import { Paginator } from "@smithy/types";
import {
  ListDistributionTenantsByCustomizationCommandInput,
  ListDistributionTenantsByCustomizationCommandOutput,
} from "../commands/ListDistributionTenantsByCustomizationCommand";
import { CloudFrontPaginationConfiguration } from "./Interfaces";
export declare const paginateListDistributionTenantsByCustomization: (
  config: CloudFrontPaginationConfiguration,
  input: ListDistributionTenantsByCustomizationCommandInput,
  ...rest: any[]
) => Paginator<ListDistributionTenantsByCustomizationCommandOutput>;
