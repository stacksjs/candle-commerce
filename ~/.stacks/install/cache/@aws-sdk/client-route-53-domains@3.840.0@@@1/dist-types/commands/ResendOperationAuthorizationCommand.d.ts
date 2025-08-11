import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { ResendOperationAuthorizationRequest } from "../models/models_0";
import { Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../Route53DomainsClient";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link ResendOperationAuthorizationCommand}.
 */
export interface ResendOperationAuthorizationCommandInput extends ResendOperationAuthorizationRequest {
}
/**
 * @public
 *
 * The output of {@link ResendOperationAuthorizationCommand}.
 */
export interface ResendOperationAuthorizationCommandOutput extends __MetadataBearer {
}
declare const ResendOperationAuthorizationCommand_base: {
    new (input: ResendOperationAuthorizationCommandInput): import("@smithy/smithy-client").CommandImpl<ResendOperationAuthorizationCommandInput, ResendOperationAuthorizationCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (input: ResendOperationAuthorizationCommandInput): import("@smithy/smithy-client").CommandImpl<ResendOperationAuthorizationCommandInput, ResendOperationAuthorizationCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p> Resend the form of authorization email for this operation. </p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { Route53DomainsClient, ResendOperationAuthorizationCommand } from "@aws-sdk/client-route-53-domains"; // ES Modules import
 * // const { Route53DomainsClient, ResendOperationAuthorizationCommand } = require("@aws-sdk/client-route-53-domains"); // CommonJS import
 * const client = new Route53DomainsClient(config);
 * const input = { // ResendOperationAuthorizationRequest
 *   OperationId: "STRING_VALUE", // required
 * };
 * const command = new ResendOperationAuthorizationCommand(input);
 * const response = await client.send(command);
 * // {};
 *
 * ```
 *
 * @param ResendOperationAuthorizationCommandInput - {@link ResendOperationAuthorizationCommandInput}
 * @returns {@link ResendOperationAuthorizationCommandOutput}
 * @see {@link ResendOperationAuthorizationCommandInput} for command's `input` shape.
 * @see {@link ResendOperationAuthorizationCommandOutput} for command's `response` shape.
 * @see {@link Route53DomainsClientResolvedConfig | config} for Route53DomainsClient's `config` shape.
 *
 * @throws {@link InvalidInput} (client fault)
 *  <p>The requested item is not acceptable. For example, for APIs that accept a domain name,
 * 			the request might specify a domain name that doesn't belong to the account that
 * 			submitted the request. For <code>AcceptDomainTransferFromAnotherAwsAccount</code>, the
 * 			password might be invalid.</p>
 *
 * @throws {@link Route53DomainsServiceException}
 * <p>Base exception class for all service exceptions from Route53Domains service.</p>
 *
 *
 * @public
 */
export declare class ResendOperationAuthorizationCommand extends ResendOperationAuthorizationCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: ResendOperationAuthorizationRequest;
            output: {};
        };
        sdk: {
            input: ResendOperationAuthorizationCommandInput;
            output: ResendOperationAuthorizationCommandOutput;
        };
    };
}
