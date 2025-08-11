import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_DeleteFileSystemCommand, se_DeleteFileSystemCommand } from "../protocols/Aws_restJson1";
export { $Command };
export class DeleteFileSystemCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("MagnolioAPIService_v20150201", "DeleteFileSystem", {})
    .n("EFSClient", "DeleteFileSystemCommand")
    .f(void 0, void 0)
    .ser(se_DeleteFileSystemCommand)
    .de(de_DeleteFileSystemCommand)
    .build() {
}
