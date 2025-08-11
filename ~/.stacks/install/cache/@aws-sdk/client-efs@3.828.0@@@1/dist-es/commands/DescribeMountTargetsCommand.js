import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_DescribeMountTargetsCommand, se_DescribeMountTargetsCommand } from "../protocols/Aws_restJson1";
export { $Command };
export class DescribeMountTargetsCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("MagnolioAPIService_v20150201", "DescribeMountTargets", {})
    .n("EFSClient", "DescribeMountTargetsCommand")
    .f(void 0, void 0)
    .ser(se_DescribeMountTargetsCommand)
    .de(de_DescribeMountTargetsCommand)
    .build() {
}
