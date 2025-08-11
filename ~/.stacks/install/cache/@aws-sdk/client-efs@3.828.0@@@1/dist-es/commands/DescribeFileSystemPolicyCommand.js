import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_DescribeFileSystemPolicyCommand, se_DescribeFileSystemPolicyCommand } from "../protocols/Aws_restJson1";
export { $Command };
export class DescribeFileSystemPolicyCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("MagnolioAPIService_v20150201", "DescribeFileSystemPolicy", {})
    .n("EFSClient", "DescribeFileSystemPolicyCommand")
    .f(void 0, void 0)
    .ser(se_DescribeFileSystemPolicyCommand)
    .de(de_DescribeFileSystemPolicyCommand)
    .build() {
}
