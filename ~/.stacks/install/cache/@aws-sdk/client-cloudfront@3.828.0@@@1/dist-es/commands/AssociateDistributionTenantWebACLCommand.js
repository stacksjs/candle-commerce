import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_AssociateDistributionTenantWebACLCommand, se_AssociateDistributionTenantWebACLCommand, } from "../protocols/Aws_restXml";
export { $Command };
export class AssociateDistributionTenantWebACLCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "AssociateDistributionTenantWebACL", {})
    .n("CloudFrontClient", "AssociateDistributionTenantWebACLCommand")
    .f(void 0, void 0)
    .ser(se_AssociateDistributionTenantWebACLCommand)
    .de(de_AssociateDistributionTenantWebACLCommand)
    .build() {
}
