import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudFrontClient";
import { GetInvalidationForDistributionTenantRequest, GetInvalidationForDistributionTenantResult } from "../models/models_1";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link GetInvalidationForDistributionTenantCommand}.
 */
export interface GetInvalidationForDistributionTenantCommandInput extends GetInvalidationForDistributionTenantRequest {
}
/**
 * @public
 *
 * The output of {@link GetInvalidationForDistributionTenantCommand}.
 */
export interface GetInvalidationForDistributionTenantCommandOutput extends GetInvalidationForDistributionTenantResult, __MetadataBearer {
}
declare const GetInvalidationForDistributionTenantCommand_base: {
    new (input: GetInvalidationForDistributionTenantCommandInput): import("@smithy/smithy-client").CommandImpl<GetInvalidationForDistributionTenantCommandInput, GetInvalidationForDistributionTenantCommandOutput, CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (input: GetInvalidationForDistributionTenantCommandInput): import("@smithy/smithy-client").CommandImpl<GetInvalidationForDistributionTenantCommandInput, GetInvalidationForDistributionTenantCommandOutput, CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>Gets information about a specific invalidation for a distribution tenant.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudFrontClient, GetInvalidationForDistributionTenantCommand } from "@aws-sdk/client-cloudfront"; // ES Modules import
 * // const { CloudFrontClient, GetInvalidationForDistributionTenantCommand } = require("@aws-sdk/client-cloudfront"); // CommonJS import
 * const client = new CloudFrontClient(config);
 * const input = { // GetInvalidationForDistributionTenantRequest
 *   DistributionTenantId: "STRING_VALUE", // required
 *   Id: "STRING_VALUE", // required
 * };
 * const command = new GetInvalidationForDistributionTenantCommand(input);
 * const response = await client.send(command);
 * // { // GetInvalidationForDistributionTenantResult
 * //   Invalidation: { // Invalidation
 * //     Id: "STRING_VALUE", // required
 * //     Status: "STRING_VALUE", // required
 * //     CreateTime: new Date("TIMESTAMP"), // required
 * //     InvalidationBatch: { // InvalidationBatch
 * //       Paths: { // Paths
 * //         Quantity: Number("int"), // required
 * //         Items: [ // PathList
 * //           "STRING_VALUE",
 * //         ],
 * //       },
 * //       CallerReference: "STRING_VALUE", // required
 * //     },
 * //   },
 * // };
 *
 * ```
 *
 * @param GetInvalidationForDistributionTenantCommandInput - {@link GetInvalidationForDistributionTenantCommandInput}
 * @returns {@link GetInvalidationForDistributionTenantCommandOutput}
 * @see {@link GetInvalidationForDistributionTenantCommandInput} for command's `input` shape.
 * @see {@link GetInvalidationForDistributionTenantCommandOutput} for command's `response` shape.
 * @see {@link CloudFrontClientResolvedConfig | config} for CloudFrontClient's `config` shape.
 *
 * @throws {@link AccessDenied} (client fault)
 *  <p>Access denied.</p>
 *
 * @throws {@link EntityNotFound} (client fault)
 *  <p>The entity was not found.</p>
 *
 * @throws {@link NoSuchInvalidation} (client fault)
 *  <p>The specified invalidation does not exist.</p>
 *
 * @throws {@link CloudFrontServiceException}
 * <p>Base exception class for all service exceptions from CloudFront service.</p>
 *
 *
 * @public
 */
export declare class GetInvalidationForDistributionTenantCommand extends GetInvalidationForDistributionTenantCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: GetInvalidationForDistributionTenantRequest;
            output: GetInvalidationForDistributionTenantResult;
        };
        sdk: {
            input: GetInvalidationForDistributionTenantCommandInput;
            output: GetInvalidationForDistributionTenantCommandOutput;
        };
    };
}
