import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_GetInvalidationForDistributionTenantCommand, se_GetInvalidationForDistributionTenantCommand, } from "../protocols/Aws_restXml";
export { $Command };
export class GetInvalidationForDistributionTenantCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "GetInvalidationForDistributionTenant", {})
    .n("CloudFrontClient", "GetInvalidationForDistributionTenantCommand")
    .f(void 0, void 0)
    .ser(se_GetInvalidationForDistributionTenantCommand)
    .de(de_GetInvalidationForDistributionTenantCommand)
    .build() {
}
