import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { CheckDomainAvailabilityRequest, CheckDomainAvailabilityResponse } from "../models/models_0";
import { Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../Route53DomainsClient";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link CheckDomainAvailabilityCommand}.
 */
export interface CheckDomainAvailabilityCommandInput extends CheckDomainAvailabilityRequest {
}
/**
 * @public
 *
 * The output of {@link CheckDomainAvailabilityCommand}.
 */
export interface CheckDomainAvailabilityCommandOutput extends CheckDomainAvailabilityResponse, __MetadataBearer {
}
declare const CheckDomainAvailabilityCommand_base: {
    new (input: CheckDomainAvailabilityCommandInput): import("@smithy/smithy-client").CommandImpl<CheckDomainAvailabilityCommandInput, CheckDomainAvailabilityCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (input: CheckDomainAvailabilityCommandInput): import("@smithy/smithy-client").CommandImpl<CheckDomainAvailabilityCommandInput, CheckDomainAvailabilityCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>This operation checks the availability of one domain name. Note that if the
 * 			availability status of a domain is pending, you must submit another request to determine
 * 			the availability of the domain name.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { Route53DomainsClient, CheckDomainAvailabilityCommand } from "@aws-sdk/client-route-53-domains"; // ES Modules import
 * // const { Route53DomainsClient, CheckDomainAvailabilityCommand } = require("@aws-sdk/client-route-53-domains"); // CommonJS import
 * const client = new Route53DomainsClient(config);
 * const input = { // CheckDomainAvailabilityRequest
 *   DomainName: "STRING_VALUE", // required
 *   IdnLangCode: "STRING_VALUE",
 * };
 * const command = new CheckDomainAvailabilityCommand(input);
 * const response = await client.send(command);
 * // { // CheckDomainAvailabilityResponse
 * //   Availability: "AVAILABLE" || "AVAILABLE_RESERVED" || "AVAILABLE_PREORDER" || "UNAVAILABLE" || "UNAVAILABLE_PREMIUM" || "UNAVAILABLE_RESTRICTED" || "RESERVED" || "DONT_KNOW" || "INVALID_NAME_FOR_TLD" || "PENDING",
 * // };
 *
 * ```
 *
 * @param CheckDomainAvailabilityCommandInput - {@link CheckDomainAvailabilityCommandInput}
 * @returns {@link CheckDomainAvailabilityCommandOutput}
 * @see {@link CheckDomainAvailabilityCommandInput} for command's `input` shape.
 * @see {@link CheckDomainAvailabilityCommandOutput} for command's `response` shape.
 * @see {@link Route53DomainsClientResolvedConfig | config} for Route53DomainsClient's `config` shape.
 *
 * @throws {@link InvalidInput} (client fault)
 *  <p>The requested item is not acceptable. For example, for APIs that accept a domain name,
 * 			the request might specify a domain name that doesn't belong to the account that
 * 			submitted the request. For <code>AcceptDomainTransferFromAnotherAwsAccount</code>, the
 * 			password might be invalid.</p>
 *
 * @throws {@link UnsupportedTLD} (client fault)
 *  <p>Amazon Route 53 does not support this top-level domain (TLD).</p>
 *
 * @throws {@link Route53DomainsServiceException}
 * <p>Base exception class for all service exceptions from Route53Domains service.</p>
 *
 *
 * @public
 */
export declare class CheckDomainAvailabilityCommand extends CheckDomainAvailabilityCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: CheckDomainAvailabilityRequest;
            output: CheckDomainAvailabilityResponse;
        };
        sdk: {
            input: CheckDomainAvailabilityCommandInput;
            output: CheckDomainAvailabilityCommandOutput;
        };
    };
}
