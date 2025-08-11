import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_CreateInvalidationForDistributionTenantCommand, se_CreateInvalidationForDistributionTenantCommand, } from "../protocols/Aws_restXml";
export { $Command };
export class CreateInvalidationForDistributionTenantCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "CreateInvalidationForDistributionTenant", {})
    .n("CloudFrontClient", "CreateInvalidationForDistributionTenantCommand")
    .f(void 0, void 0)
    .ser(se_CreateInvalidationForDistributionTenantCommand)
    .de(de_CreateInvalidationForDistributionTenantCommand)
    .build() {
}
