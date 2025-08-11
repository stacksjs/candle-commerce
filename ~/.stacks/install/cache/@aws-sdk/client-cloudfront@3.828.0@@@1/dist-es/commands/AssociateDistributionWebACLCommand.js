import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_AssociateDistributionWebACLCommand, se_AssociateDistributionWebACLCommand } from "../protocols/Aws_restXml";
export { $Command };
export class AssociateDistributionWebACLCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "AssociateDistributionWebACL", {})
    .n("CloudFrontClient", "AssociateDistributionWebACLCommand")
    .f(void 0, void 0)
    .ser(se_AssociateDistributionWebACLCommand)
    .de(de_AssociateDistributionWebACLCommand)
    .build() {
}
