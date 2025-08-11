import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { EFSClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../EFSClient";
import { DeleteFileSystemPolicyRequest } from "../models/models_0";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link DeleteFileSystemPolicyCommand}.
 */
export interface DeleteFileSystemPolicyCommandInput extends DeleteFileSystemPolicyRequest {
}
/**
 * @public
 *
 * The output of {@link DeleteFileSystemPolicyCommand}.
 */
export interface DeleteFileSystemPolicyCommandOutput extends __MetadataBearer {
}
declare const DeleteFileSystemPolicyCommand_base: {
    new (input: DeleteFileSystemPolicyCommandInput): import("@smithy/smithy-client").CommandImpl<DeleteFileSystemPolicyCommandInput, DeleteFileSystemPolicyCommandOutput, EFSClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (input: DeleteFileSystemPolicyCommandInput): import("@smithy/smithy-client").CommandImpl<DeleteFileSystemPolicyCommandInput, DeleteFileSystemPolicyCommandOutput, EFSClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>Deletes the <code>FileSystemPolicy</code> for the specified file system.
 *       The default <code>FileSystemPolicy</code> goes into effect once the existing policy is deleted.
 *       For more information about the default file system policy, see <a href="https://docs.aws.amazon.com/efs/latest/ug/res-based-policies-efs.html">Using Resource-based Policies with EFS</a>.</p>
 *          <p>This operation requires permissions for the <code>elasticfilesystem:DeleteFileSystemPolicy</code> action.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { EFSClient, DeleteFileSystemPolicyCommand } from "@aws-sdk/client-efs"; // ES Modules import
 * // const { EFSClient, DeleteFileSystemPolicyCommand } = require("@aws-sdk/client-efs"); // CommonJS import
 * const client = new EFSClient(config);
 * const input = { // DeleteFileSystemPolicyRequest
 *   FileSystemId: "STRING_VALUE", // required
 * };
 * const command = new DeleteFileSystemPolicyCommand(input);
 * const response = await client.send(command);
 * // {};
 *
 * ```
 *
 * @param DeleteFileSystemPolicyCommandInput - {@link DeleteFileSystemPolicyCommandInput}
 * @returns {@link DeleteFileSystemPolicyCommandOutput}
 * @see {@link DeleteFileSystemPolicyCommandInput} for command's `input` shape.
 * @see {@link DeleteFileSystemPolicyCommandOutput} for command's `response` shape.
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
 * @throws {@link IncorrectFileSystemLifeCycleState} (client fault)
 *  <p>Returned if the file system's lifecycle state is not "available".</p>
 *
 * @throws {@link InternalServerError} (server fault)
 *  <p>Returned if an error occurred on the server side.</p>
 *
 * @throws {@link EFSServiceException}
 * <p>Base exception class for all service exceptions from EFS service.</p>
 *
 *
 * @public
 */
export declare class DeleteFileSystemPolicyCommand extends DeleteFileSystemPolicyCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: DeleteFileSystemPolicyRequest;
            output: {};
        };
        sdk: {
            input: DeleteFileSystemPolicyCommandInput;
            output: DeleteFileSystemPolicyCommandOutput;
        };
    };
}
