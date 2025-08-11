import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { ListDomainsRequest, ListDomainsResponse } from "../models/models_0";
import { Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../Route53DomainsClient";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link ListDomainsCommand}.
 */
export interface ListDomainsCommandInput extends ListDomainsRequest {
}
/**
 * @public
 *
 * The output of {@link ListDomainsCommand}.
 */
export interface ListDomainsCommandOutput extends ListDomainsResponse, __MetadataBearer {
}
declare const ListDomainsCommand_base: {
    new (input: ListDomainsCommandInput): import("@smithy/smithy-client").CommandImpl<ListDomainsCommandInput, ListDomainsCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (...[input]: [] | [ListDomainsCommandInput]): import("@smithy/smithy-client").CommandImpl<ListDomainsCommandInput, ListDomainsCommandOutput, Route53DomainsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>This operation returns all the domain names registered with Amazon Route 53 for the
 * 			current Amazon Web Services account if no filtering conditions are used.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { Route53DomainsClient, ListDomainsCommand } from "@aws-sdk/client-route-53-domains"; // ES Modules import
 * // const { Route53DomainsClient, ListDomainsCommand } = require("@aws-sdk/client-route-53-domains"); // CommonJS import
 * const client = new Route53DomainsClient(config);
 * const input = { // ListDomainsRequest
 *   FilterConditions: [ // FilterConditions
 *     { // FilterCondition
 *       Name: "DomainName" || "Expiry", // required
 *       Operator: "LE" || "GE" || "BEGINS_WITH", // required
 *       Values: [ // Values // required
 *         "STRING_VALUE",
 *       ],
 *     },
 *   ],
 *   SortCondition: { // SortCondition
 *     Name: "DomainName" || "Expiry", // required
 *     SortOrder: "ASC" || "DESC", // required
 *   },
 *   Marker: "STRING_VALUE",
 *   MaxItems: Number("int"),
 * };
 * const command = new ListDomainsCommand(input);
 * const response = await client.send(command);
 * // { // ListDomainsResponse
 * //   Domains: [ // DomainSummaryList
 * //     { // DomainSummary
 * //       DomainName: "STRING_VALUE",
 * //       AutoRenew: true || false,
 * //       TransferLock: true || false,
 * //       Expiry: new Date("TIMESTAMP"),
 * //     },
 * //   ],
 * //   NextPageMarker: "STRING_VALUE",
 * // };
 *
 * ```
 *
 * @param ListDomainsCommandInput - {@link ListDomainsCommandInput}
 * @returns {@link ListDomainsCommandOutput}
 * @see {@link ListDomainsCommandInput} for command's `input` shape.
 * @see {@link ListDomainsCommandOutput} for command's `response` shape.
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
export declare class ListDomainsCommand extends ListDomainsCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: ListDomainsRequest;
            output: ListDomainsResponse;
        };
        sdk: {
            input: ListDomainsCommandInput;
            output: ListDomainsCommandOutput;
        };
    };
}
