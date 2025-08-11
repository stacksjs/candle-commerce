import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_DescribeLifecycleConfigurationCommand, se_DescribeLifecycleConfigurationCommand, } from "../protocols/Aws_restJson1";
export { $Command };
export class DescribeLifecycleConfigurationCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("MagnolioAPIService_v20150201", "DescribeLifecycleConfiguration", {})
    .n("EFSClient", "DescribeLifecycleConfigurationCommand")
    .f(void 0, void 0)
    .ser(se_DescribeLifecycleConfigurationCommand)
    .de(de_DescribeLifecycleConfigurationCommand)
    .build() {
}
