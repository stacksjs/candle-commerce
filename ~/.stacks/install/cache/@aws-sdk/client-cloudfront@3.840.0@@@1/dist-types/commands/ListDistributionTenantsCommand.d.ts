import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudFrontClient";
import { ListDistributionTenantsRequest, ListDistributionTenantsResult } from "../models/models_1";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link ListDistributionTenantsCommand}.
 */
export interface ListDistributionTenantsCommandInput extends ListDistributionTenantsRequest {
}
/**
 * @public
 *
 * The output of {@link ListDistributionTenantsCommand}.
 */
export interface ListDistributionTenantsCommandOutput extends ListDistributionTenantsResult, __MetadataBearer {
}
declare const ListDistributionTenantsCommand_base: {
    new (input: ListDistributionTenantsCommandInput): import("@smithy/smithy-client").CommandImpl<ListDistributionTenantsCommandInput, ListDistributionTenantsCommandOutput, CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (...[input]: [] | [ListDistributionTenantsCommandInput]): import("@smithy/smithy-client").CommandImpl<ListDistributionTenantsCommandInput, ListDistributionTenantsCommandOutput, CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>Lists the distribution tenants in your Amazon Web Services account.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudFrontClient, ListDistributionTenantsCommand } from "@aws-sdk/client-cloudfront"; // ES Modules import
 * // const { CloudFrontClient, ListDistributionTenantsCommand } = require("@aws-sdk/client-cloudfront"); // CommonJS import
 * const client = new CloudFrontClient(config);
 * const input = { // ListDistributionTenantsRequest
 *   AssociationFilter: { // DistributionTenantAssociationFilter
 *     DistributionId: "STRING_VALUE",
 *     ConnectionGroupId: "STRING_VALUE",
 *   },
 *   Marker: "STRING_VALUE",
 *   MaxItems: Number("int"),
 * };
 * const command = new ListDistributionTenantsCommand(input);
 * const response = await client.send(command);
 * // { // ListDistributionTenantsResult
 * //   NextMarker: "STRING_VALUE",
 * //   DistributionTenantList: [ // DistributionTenantList
 * //     { // DistributionTenantSummary
 * //       Id: "STRING_VALUE", // required
 * //       DistributionId: "STRING_VALUE", // required
 * //       Name: "STRING_VALUE", // required
 * //       Arn: "STRING_VALUE", // required
 * //       Domains: [ // DomainResultList // required
 * //         { // DomainResult
 * //           Domain: "STRING_VALUE", // required
 * //           Status: "active" || "inactive",
 * //         },
 * //       ],
 * //       ConnectionGroupId: "STRING_VALUE",
 * //       Customizations: { // Customizations
 * //         WebAcl: { // WebAclCustomization
 * //           Action: "override" || "disable", // required
 * //           Arn: "STRING_VALUE",
 * //         },
 * //         Certificate: { // Certificate
 * //           Arn: "STRING_VALUE", // required
 * //         },
 * //         GeoRestrictions: { // GeoRestrictionCustomization
 * //           RestrictionType: "blacklist" || "whitelist" || "none", // required
 * //           Locations: [ // LocationList
 * //             "STRING_VALUE",
 * //           ],
 * //         },
 * //       },
 * //       CreatedTime: new Date("TIMESTAMP"), // required
 * //       LastModifiedTime: new Date("TIMESTAMP"), // required
 * //       ETag: "STRING_VALUE", // required
 * //       Enabled: true || false,
 * //       Status: "STRING_VALUE",
 * //     },
 * //   ],
 * // };
 *
 * ```
 *
 * @param ListDistributionTenantsCommandInput - {@link ListDistributionTenantsCommandInput}
 * @returns {@link ListDistributionTenantsCommandOutput}
 * @see {@link ListDistributionTenantsCommandInput} for command's `input` shape.
 * @see {@link ListDistributionTenantsCommandOutput} for command's `response` shape.
 * @see {@link CloudFrontClientResolvedConfig | config} for CloudFrontClient's `config` shape.
 *
 * @throws {@link AccessDenied} (client fault)
 *  <p>Access denied.</p>
 *
 * @throws {@link EntityNotFound} (client fault)
 *  <p>The entity was not found.</p>
 *
 * @throws {@link InvalidArgument} (client fault)
 *  <p>An argument is invalid.</p>
 *
 * @throws {@link CloudFrontServiceException}
 * <p>Base exception class for all service exceptions from CloudFront service.</p>
 *
 *
 * @public
 */
export declare class ListDistributionTenantsCommand extends ListDistributionTenantsCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: ListDistributionTenantsRequest;
            output: ListDistributionTenantsResult;
        };
        sdk: {
            input: ListDistributionTenantsCommandInput;
            output: ListDistributionTenantsCommandOutput;
        };
    };
}
