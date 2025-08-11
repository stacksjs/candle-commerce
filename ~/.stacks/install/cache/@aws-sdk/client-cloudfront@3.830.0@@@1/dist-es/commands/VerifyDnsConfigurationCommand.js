import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_VerifyDnsConfigurationCommand, se_VerifyDnsConfigurationCommand } from "../protocols/Aws_restXml";
export { $Command };
export class VerifyDnsConfigurationCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "VerifyDnsConfiguration", {})
    .n("CloudFrontClient", "VerifyDnsConfigurationCommand")
    .f(void 0, void 0)
    .ser(se_VerifyDnsConfigurationCommand)
    .de(de_VerifyDnsConfigurationCommand)
    .build() {
}
