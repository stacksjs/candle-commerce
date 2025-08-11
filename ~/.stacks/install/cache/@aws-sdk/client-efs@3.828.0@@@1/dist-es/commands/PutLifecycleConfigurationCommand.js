import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_PutLifecycleConfigurationCommand, se_PutLifecycleConfigurationCommand } from "../protocols/Aws_restJson1";
export { $Command };
export class PutLifecycleConfigurationCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("MagnolioAPIService_v20150201", "PutLifecycleConfiguration", {})
    .n("EFSClient", "PutLifecycleConfigurationCommand")
    .f(void 0, void 0)
    .ser(se_PutLifecycleConfigurationCommand)
    .de(de_PutLifecycleConfigurationCommand)
    .build() {
}
