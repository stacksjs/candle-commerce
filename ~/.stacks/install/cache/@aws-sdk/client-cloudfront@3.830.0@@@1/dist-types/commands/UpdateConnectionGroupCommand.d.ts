import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudFrontClient";
import { UpdateConnectionGroupRequest, UpdateConnectionGroupResult } from "../models/models_2";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link UpdateConnectionGroupCommand}.
 */
export interface UpdateConnectionGroupCommandInput extends UpdateConnectionGroupRequest {
}
/**
 * @public
 *
 * The output of {@link UpdateConnectionGroupCommand}.
 */
export interface UpdateConnectionGroupCommandOutput extends UpdateConnectionGroupResult, __MetadataBearer {
}
declare const UpdateConnectionGroupCommand_base: {
    new (input: UpdateConnectionGroupCommandInput): import("@smithy/smithy-client").CommandImpl<UpdateConnectionGroupCommandInput, UpdateConnectionGroupCommandOutput, CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (input: UpdateConnectionGroupCommandInput): import("@smithy/smithy-client").CommandImpl<UpdateConnectionGroupCommandInput, UpdateConnectionGroupCommandOutput, CloudFrontClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>Updates a connection group.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudFrontClient, UpdateConnectionGroupCommand } from "@aws-sdk/client-cloudfront"; // ES Modules import
 * // const { CloudFrontClient, UpdateConnectionGroupCommand } = require("@aws-sdk/client-cloudfront"); // CommonJS import
 * const client = new CloudFrontClient(config);
 * const input = { // UpdateConnectionGroupRequest
 *   Id: "STRING_VALUE", // required
 *   Ipv6Enabled: true || false,
 *   IfMatch: "STRING_VALUE", // required
 *   AnycastIpListId: "STRING_VALUE",
 *   Enabled: true || false,
 * };
 * const command = new UpdateConnectionGroupCommand(input);
 * const response = await client.send(command);
 * // { // UpdateConnectionGroupResult
 * //   ConnectionGroup: { // ConnectionGroup
 * //     Id: "STRING_VALUE",
 * //     Name: "STRING_VALUE",
 * //     Arn: "STRING_VALUE",
 * //     CreatedTime: new Date("TIMESTAMP"),
 * //     LastModifiedTime: new Date("TIMESTAMP"),
 * //     Tags: { // Tags
 * //       Items: [ // TagList
 * //         { // Tag
 * //           Key: "STRING_VALUE", // required
 * //           Value: "STRING_VALUE",
 * //         },
 * //       ],
 * //     },
 * //     Ipv6Enabled: true || false,
 * //     RoutingEndpoint: "STRING_VALUE",
 * //     AnycastIpListId: "STRING_VALUE",
 * //     Status: "STRING_VALUE",
 * //     Enabled: true || false,
 * //     IsDefault: true || false,
 * //   },
 * //   ETag: "STRING_VALUE",
 * // };
 *
 * ```
 *
 * @param UpdateConnectionGroupCommandInput - {@link UpdateConnectionGroupCommandInput}
 * @returns {@link UpdateConnectionGroupCommandOutput}
 * @see {@link UpdateConnectionGroupCommandInput} for command's `input` shape.
 * @see {@link UpdateConnectionGroupCommandOutput} for command's `response` shape.
 * @see {@link CloudFrontClientResolvedConfig | config} for CloudFrontClient's `config` shape.
 *
 * @throws {@link AccessDenied} (client fault)
 *  <p>Access denied.</p>
 *
 * @throws {@link EntityAlreadyExists} (client fault)
 *  <p>The entity already exists. You must provide a unique entity.</p>
 *
 * @throws {@link EntityLimitExceeded} (client fault)
 *  <p>The entity limit has been exceeded.</p>
 *
 * @throws {@link EntityNotFound} (client fault)
 *  <p>The entity was not found.</p>
 *
 * @throws {@link InvalidArgument} (client fault)
 *  <p>An argument is invalid.</p>
 *
 * @throws {@link InvalidIfMatchVersion} (client fault)
 *  <p>The <code>If-Match</code> version is missing or not valid.</p>
 *
 * @throws {@link PreconditionFailed} (client fault)
 *  <p>The precondition in one or more of the request fields evaluated to <code>false</code>.</p>
 *
 * @throws {@link ResourceInUse} (client fault)
 *  <p>Cannot delete this resource because it is in use.</p>
 *
 * @throws {@link CloudFrontServiceException}
 * <p>Base exception class for all service exceptions from CloudFront service.</p>
 *
 *
 * @public
 */
export declare class UpdateConnectionGroupCommand extends UpdateConnectionGroupCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: UpdateConnectionGroupRequest;
            output: UpdateConnectionGroupResult;
        };
        sdk: {
            input: UpdateConnectionGroupCommandInput;
            output: UpdateConnectionGroupCommandOutput;
        };
    };
}
