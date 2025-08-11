import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_CreateDistributionTenantCommand, se_CreateDistributionTenantCommand } from "../protocols/Aws_restXml";
export { $Command };
export class CreateDistributionTenantCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "CreateDistributionTenant", {})
    .n("CloudFrontClient", "CreateDistributionTenantCommand")
    .f(void 0, void 0)
    .ser(se_CreateDistributionTenantCommand)
    .de(de_CreateDistributionTenantCommand)
    .build() {
}
