import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_AssociateDelegationSignerToDomainCommand, se_AssociateDelegationSignerToDomainCommand, } from "../protocols/Aws_json1_1";
export { $Command };
export class AssociateDelegationSignerToDomainCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Route53Domains_v20140515", "AssociateDelegationSignerToDomain", {})
    .n("Route53DomainsClient", "AssociateDelegationSignerToDomainCommand")
    .f(void 0, void 0)
    .ser(se_AssociateDelegationSignerToDomainCommand)
    .de(de_AssociateDelegationSignerToDomainCommand)
    .build() {
}
