import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { EFSClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../EFSClient";
import { DescribeTagsRequest, DescribeTagsResponse } from "../models/models_0";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link DescribeTagsCommand}.
 */
export interface DescribeTagsCommandInput extends DescribeTagsRequest {
}
/**
 * @public
 *
 * The output of {@link DescribeTagsCommand}.
 */
export interface DescribeTagsCommandOutput extends DescribeTagsResponse, __MetadataBearer {
}
declare const DescribeTagsCommand_base: {
    new (input: DescribeTagsCommandInput): import("@smithy/smithy-client").CommandImpl<DescribeTagsCommandInput, DescribeTagsCommandOutput, EFSClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (input: DescribeTagsCommandInput): import("@smithy/smithy-client").CommandImpl<DescribeTagsCommandInput, DescribeTagsCommandOutput, EFSClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <note>
 *             <p>DEPRECATED - The <code>DescribeTags</code> action is deprecated and not maintained. To view
 *         tags associated with EFS resources, use the <code>ListTagsForResource</code> API
 *         action.</p>
 *          </note>
 *          <p>Returns the tags associated with a file system. The order of tags returned in the
 *       response of one <code>DescribeTags</code> call and the order of tags returned across the
 *       responses of a multiple-call iteration (when using pagination) is unspecified. </p>
 *          <p> This operation requires permissions for the
 *         <code>elasticfilesystem:DescribeTags</code> action. </p>
 *
 * @deprecated Use ListTagsForResource.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { EFSClient, DescribeTagsCommand } from "@aws-sdk/client-efs"; // ES Modules import
 * // const { EFSClient, DescribeTagsCommand } = require("@aws-sdk/client-efs"); // CommonJS import
 * const client = new EFSClient(config);
 * const input = { // DescribeTagsRequest
 *   MaxItems: Number("int"),
 *   Marker: "STRING_VALUE",
 *   FileSystemId: "STRING_VALUE", // required
 * };
 * const command = new DescribeTagsCommand(input);
 * const response = await client.send(command);
 * // { // DescribeTagsResponse
 * //   Marker: "STRING_VALUE",
 * //   Tags: [ // Tags // required
 * //     { // Tag
 * //       Key: "STRING_VALUE", // required
 * //       Value: "STRING_VALUE", // required
 * //     },
 * //   ],
 * //   NextMarker: "STRING_VALUE",
 * // };
 *
 * ```
 *
 * @param DescribeTagsCommandInput - {@link DescribeTagsCommandInput}
 * @returns {@link DescribeTagsCommandOutput}
 * @see {@link DescribeTagsCommandInput} for command's `input` shape.
 * @see {@link DescribeTagsCommandOutput} for command's `response` shape.
 * @see {@link EFSClientResolvedConfig | config} for EFSClient's `config` shape.
 *
 * @throws {@link BadRequest} (client fault)
 *  <p>Returned if the request is malformed or contains an error such as an invalid
 *             parameter value or a missing required parameter.</p>
 *
 * @throws {@link FileSystemNotFound} (client fault)
 *  <p>Returned if the specified <code>FileSystemId</code> value doesn't exist in the
 *             requester's Amazon Web Services account.</p>
 *
 * @throws {@link InternalServerError} (server fault)
 *  <p>Returned if an error occurred on the server side.</p>
 *
 * @throws {@link EFSServiceException}
 * <p>Base exception class for all service exceptions from EFS service.</p>
 *
 *
 * @example To describe the tags for a file system
 * ```javascript
 * // This operation describes all of a file system's tags.
 * const input = {
 *   FileSystemId: "fs-01234567"
 * };
 * const command = new DescribeTagsCommand(input);
 * const response = await client.send(command);
 * /* response is
 * {
 *   Tags: [
 *     {
 *       Key: "Name",
 *       Value: "MyFileSystem"
 *     }
 *   ]
 * }
 * *\/
 * ```
 *
 * @public
 */
export declare class DescribeTagsCommand extends DescribeTagsCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: DescribeTagsRequest;
            output: DescribeTagsResponse;
        };
        sdk: {
            input: DescribeTagsCommandInput;
            output: DescribeTagsCommandOutput;
        };
    };
}
