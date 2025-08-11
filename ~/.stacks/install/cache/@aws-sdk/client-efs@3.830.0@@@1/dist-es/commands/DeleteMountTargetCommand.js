import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_DeleteMountTargetCommand, se_DeleteMountTargetCommand } from "../protocols/Aws_restJson1";
export { $Command };
export class DeleteMountTargetCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("MagnolioAPIService_v20150201", "DeleteMountTarget", {})
    .n("EFSClient", "DeleteMountTargetCommand")
    .f(void 0, void 0)
    .ser(se_DeleteMountTargetCommand)
    .de(de_DeleteMountTargetCommand)
    .build() {
}
