import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_CreateConnectionGroupCommand, se_CreateConnectionGroupCommand } from "../protocols/Aws_restXml";
export { $Command };
export class CreateConnectionGroupCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "CreateConnectionGroup", {})
    .n("CloudFrontClient", "CreateConnectionGroupCommand")
    .f(void 0, void 0)
    .ser(se_CreateConnectionGroupCommand)
    .de(de_CreateConnectionGroupCommand)
    .build() {
}
