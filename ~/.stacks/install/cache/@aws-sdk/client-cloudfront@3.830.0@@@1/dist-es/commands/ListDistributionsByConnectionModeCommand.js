import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { ListDistributionsByConnectionModeResultFilterSensitiveLog, } from "../models/models_1";
import { de_ListDistributionsByConnectionModeCommand, se_ListDistributionsByConnectionModeCommand, } from "../protocols/Aws_restXml";
export { $Command };
export class ListDistributionsByConnectionModeCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Cloudfront2020_05_31", "ListDistributionsByConnectionMode", {})
    .n("CloudFrontClient", "ListDistributionsByConnectionModeCommand")
    .f(void 0, ListDistributionsByConnectionModeResultFilterSensitiveLog)
    .ser(se_ListDistributionsByConnectionModeCommand)
    .de(de_ListDistributionsByConnectionModeCommand)
    .build() {
}
