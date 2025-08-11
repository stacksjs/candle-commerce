import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_DisassociateDistributionWebACLCommand, se_DisassociateDistributionWebACLCommand, } from "../protocols/Aws_restXml";
export { $Command };
export class DisassociateDistributionWebACLCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "DisassociateDistributionWebACL", {})
    .n("CloudFrontClient", "DisassociateDistributionWebACLCommand")
    .f(void 0, void 0)
    .ser(se_DisassociateDistributionWebACLCommand)
    .de(de_DisassociateDistributionWebACLCommand)
    .build() {
}
