import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudFrontClient";
import { GetManagedCertificateDetailsRequest, GetManagedCertificateDetailsResult } from "../models/models_1";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link GetManagedCertificateDetailsCommand}.
 */
export interface GetManagedCertificateDetailsCommandInput extends GetManagedCertificateDetailsRequest {
}
/**
 * @public
 *
 * The output of {@link GetManagedCertificateDetailsCommand}.
 */
export interface GetManagedCertificateDetailsCommandOutput extends GetManagedCertificateDetailsResult, __MetadataBearer {
}
declare const GetManagedCertificateDetailsCommand_base: {
    new (input: GetManagedCertificateDetailsCommandInput): import("@smithy/smithy-client").CommandImpl<GetManagedCertificateDetailsCommandInput, GetManagedCertificateDetailsCommandOutput, CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (input: GetManagedCertificateDetailsCommandInput): import("@smithy/smithy-client").CommandImpl<GetManagedCertificateDetailsCommandInput, GetManagedCertificateDetailsCommandOutput, CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>Gets details about the CloudFront managed ACM certificate.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudFrontClient, GetManagedCertificateDetailsCommand } from "@aws-sdk/client-cloudfront"; // ES Modules import
 * // const { CloudFrontClient, GetManagedCertificateDetailsCommand } = require("@aws-sdk/client-cloudfront"); // CommonJS import
 * const client = new CloudFrontClient(config);
 * const input = { // GetManagedCertificateDetailsRequest
 *   Identifier: "STRING_VALUE", // required
 * };
 * const command = new GetManagedCertificateDetailsCommand(input);
 * const response = await client.send(command);
 * // { // GetManagedCertificateDetailsResult
 * //   ManagedCertificateDetails: { // ManagedCertificateDetails
 * //     CertificateArn: "STRING_VALUE",
 * //     CertificateStatus: "pending-validation" || "issued" || "inactive" || "expired" || "validation-timed-out" || "revoked" || "failed",
 * //     ValidationTokenHost: "cloudfront" || "self-hosted",
 * //     ValidationTokenDetails: [ // ValidationTokenDetailList
 * //       { // ValidationTokenDetail
 * //         Domain: "STRING_VALUE", // required
 * //         RedirectTo: "STRING_VALUE",
 * //         RedirectFrom: "STRING_VALUE",
 * //       },
 * //     ],
 * //   },
 * // };
 *
 * ```
 *
 * @param GetManagedCertificateDetailsCommandInput - {@link GetManagedCertificateDetailsCommandInput}
 * @returns {@link GetManagedCertificateDetailsCommandOutput}
 * @see {@link GetManagedCertificateDetailsCommandInput} for command's `input` shape.
 * @see {@link GetManagedCertificateDetailsCommandOutput} for command's `response` shape.
 * @see {@link CloudFrontClientResolvedConfig | config} for CloudFrontClient's `config` shape.
 *
 * @throws {@link AccessDenied} (client fault)
 *  <p>Access denied.</p>
 *
 * @throws {@link EntityNotFound} (client fault)
 *  <p>The entity was not found.</p>
 *
 * @throws {@link CloudFrontServiceException}
 * <p>Base exception class for all service exceptions from CloudFront service.</p>
 *
 *
 * @public
 */
export declare class GetManagedCertificateDetailsCommand extends GetManagedCertificateDetailsCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: GetManagedCertificateDetailsRequest;
            output: GetManagedCertificateDetailsResult;
        };
        sdk: {
            input: GetManagedCertificateDetailsCommandInput;
            output: GetManagedCertificateDetailsCommandOutput;
        };
    };
}
