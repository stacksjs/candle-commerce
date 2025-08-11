import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_DisassociateDistributionTenantWebACLCommand, se_DisassociateDistributionTenantWebACLCommand, } from "../protocols/Aws_restXml";
export { $Command };
export class DisassociateDistributionTenantWebACLCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "DisassociateDistributionTenantWebACL", {})
    .n("CloudFrontClient", "DisassociateDistributionTenantWebACLCommand")
    .f(void 0, void 0)
    .ser(se_DisassociateDistributionTenantWebACLCommand)
    .de(de_DisassociateDistributionTenantWebACLCommand)
    .build() {
}
