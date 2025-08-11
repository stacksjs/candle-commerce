import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_UpdateDistributionTenantCommand, se_UpdateDistributionTenantCommand } from "../protocols/Aws_restXml";
export { $Command };
export class UpdateDistributionTenantCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "UpdateDistributionTenant", {})
    .n("CloudFrontClient", "UpdateDistributionTenantCommand")
    .f(void 0, void 0)
    .ser(se_UpdateDistributionTenantCommand)
    .de(de_UpdateDistributionTenantCommand)
    .build() {
}
