import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { EFSClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../EFSClient";
import { DescribeReplicationConfigurationsRequest, DescribeReplicationConfigurationsResponse } from "../models/models_0";
/**
 * @public
 */
export type { __MetadataBearer };
export { $Command };
/**
 * @public
 *
 * The input for {@link DescribeReplicationConfigurationsCommand}.
 */
export interface DescribeReplicationConfigurationsCommandInput extends DescribeReplicationConfigurationsRequest {
}
/**
 * @public
 *
 * The output of {@link DescribeReplicationConfigurationsCommand}.
 */
export interface DescribeReplicationConfigurationsCommandOutput extends DescribeReplicationConfigurationsResponse, __MetadataBearer {
}
declare const DescribeReplicationConfigurationsCommand_base: {
    new (input: DescribeReplicationConfigurationsCommandInput): import("@smithy/smithy-client").CommandImpl<DescribeReplicationConfigurationsCommandInput, DescribeReplicationConfigurationsCommandOutput, EFSClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    new (...[input]: [] | [DescribeReplicationConfigurationsCommandInput]): import("@smithy/smithy-client").CommandImpl<DescribeReplicationConfigurationsCommandInput, DescribeReplicationConfigurationsCommandOutput, EFSClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes>;
    getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
/**
 * <p>Retrieves the replication configuration for a specific file system. If a file system is
 *       not specified, all of the replication configurations for the Amazon Web Services account in an
 *         Amazon Web Services Region are retrieved.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { EFSClient, DescribeReplicationConfigurationsCommand } from "@aws-sdk/client-efs"; // ES Modules import
 * // const { EFSClient, DescribeReplicationConfigurationsCommand } = require("@aws-sdk/client-efs"); // CommonJS import
 * const client = new EFSClient(config);
 * const input = { // DescribeReplicationConfigurationsRequest
 *   FileSystemId: "STRING_VALUE",
 *   NextToken: "STRING_VALUE",
 *   MaxResults: Number("int"),
 * };
 * const command = new DescribeReplicationConfigurationsCommand(input);
 * const response = await client.send(command);
 * // { // DescribeReplicationConfigurationsResponse
 * //   Replications: [ // ReplicationConfigurationDescriptions
 * //     { // ReplicationConfigurationDescription
 * //       SourceFileSystemId: "STRING_VALUE", // required
 * //       SourceFileSystemRegion: "STRING_VALUE", // required
 * //       SourceFileSystemArn: "STRING_VALUE", // required
 * //       OriginalSourceFileSystemArn: "STRING_VALUE", // required
 * //       CreationTime: new Date("TIMESTAMP"), // required
 * //       Destinations: [ // Destinations // required
 * //         { // Destination
 * //           Status: "ENABLED" || "ENABLING" || "DELETING" || "ERROR" || "PAUSED" || "PAUSING", // required
 * //           FileSystemId: "STRING_VALUE", // required
 * //           Region: "STRING_VALUE", // required
 * //           LastReplicatedTimestamp: new Date("TIMESTAMP"),
 * //           OwnerId: "STRING_VALUE",
 * //           StatusMessage: "STRING_VALUE",
 * //           RoleArn: "STRING_VALUE",
 * //         },
 * //       ],
 * //       SourceFileSystemOwnerId: "STRING_VALUE",
 * //     },
 * //   ],
 * //   NextToken: "STRING_VALUE",
 * // };
 *
 * ```
 *
 * @param DescribeReplicationConfigurationsCommandInput - {@link DescribeReplicationConfigurationsCommandInput}
 * @returns {@link DescribeReplicationConfigurationsCommandOutput}
 * @see {@link DescribeReplicationConfigurationsCommandInput} for command's `input` shape.
 * @see {@link DescribeReplicationConfigurationsCommandOutput} for command's `response` shape.
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
 * @throws {@link ReplicationNotFound} (client fault)
 *  <p>Returned if the specified file system does not have a replication
 *             configuration.</p>
 *
 * @throws {@link ValidationException} (client fault)
 *  <p>Returned if the Backup service is not available in the Amazon Web Services Region in which the request was made.</p>
 *
 * @throws {@link EFSServiceException}
 * <p>Base exception class for all service exceptions from EFS service.</p>
 *
 *
 * @public
 */
export declare class DescribeReplicationConfigurationsCommand extends DescribeReplicationConfigurationsCommand_base {
    /** @internal type navigation helper, not in runtime. */
    protected static __types: {
        api: {
            input: DescribeReplicationConfigurationsRequest;
            output: DescribeReplicationConfigurationsResponse;
        };
        sdk: {
            input: DescribeReplicationConfigurationsCommandInput;
            output: DescribeReplicationConfigurationsCommandOutput;
        };
    };
}
