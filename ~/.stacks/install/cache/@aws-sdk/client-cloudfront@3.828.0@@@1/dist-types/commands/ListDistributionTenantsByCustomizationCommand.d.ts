import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudFrontClient";
import { ListDistributionTenantsByCustomizationRequest, ListDistributionTenantsByCustomizationResult } from "../models/models_1";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link ListDistributionTenantsByCustomizationCommand}.
 */
export interface ListDistributionTenantsByCustomizationCommandInput extends ListDistributionTenantsByCustomizationRequest {
}
/**
 * @public
 *
 * The output of {@link ListDistributionTenantsByCustomizationCommand}.
 */
export interface ListDistributionTenantsByCustomizationCommandOutput extends ListDistributionTenantsByCustomizationResult, __MetadataBearer {
}
declare const ListDistributionTenantsByCustomizationCommand_base: {
    new (input: ListDistributionTenantsByCustomizationCommandInput): import("@smithy/smithy-client").CommandImpl<ListDistributionTenantsByCustomizationCommandInput, ListDistributionTenantsByCustomizationCommandOutput, CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (...[input]: [] | [ListDistributionTenantsByCustomizationCommandInput]): import("@smithy/smithy-client").CommandImpl<ListDistributionTenantsByCustomizationCommandInput, ListDistributionTenantsByCustomizationCommandOutput, CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>Lists distribution tenants by the customization that you specify.</p> <p>You must specify either the <code>CertificateArn</code> parameter or <code>WebACLArn</code> parameter, but not both in the same request.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudFrontClient, ListDistributionTenantsByCustomizationCommand } from "@aws-sdk/client-cloudfront"; // ES Modules import
 * // const { CloudFrontClient, ListDistributionTenantsByCustomizationCommand } = require("@aws-sdk/client-cloudfront"); // CommonJS import
 * const client = new CloudFrontClient(config);
 * const input = { // ListDistributionTenantsByCustomizationRequest
 *   WebACLArn: "STRING_VALUE",
 *   CertificateArn: "STRING_VALUE",
 *   Marker: "STRING_VALUE",
 *   MaxItems: Number("int"),
 * };
 * const command = new ListDistributionTenantsByCustomizationCommand(input);
 * const response = await client.send(command);
 * // { // ListDistributionTenantsByCustomizationResult
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
 * @param ListDistributionTenantsByCustomizationCommandInput - {@link ListDistributionTenantsByCustomizationCommandInput}
 * @returns {@link ListDistributionTenantsByCustomizationCommandOutput}
 * @see {@link ListDistributionTenantsByCustomizationCommandInput} for command's `input` shape.
 * @see {@link ListDistributionTenantsByCustomizationCommandOutput} for command's `response` shape.
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
export declare class ListDistributionTenantsByCustomizationCommand extends ListDistributionTenantsByCustomizationCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: ListDistributionTenantsByCustomizationRequest;
            output: ListDistributionTenantsByCustomizationResult;
        };
        sdk: {
            input: ListDistributionTenantsByCustomizationCommandInput;
            output: ListDistributionTenantsByCustomizationCommandOutput;
        };
    };
}
