import * as _typescript_eslint_utils_eslint_utils from '@typescript-eslint/utils/eslint-utils';

declare module '@typescript-eslint/utils/ts-eslint' {
    interface SharedConfigurationSettings {
        unocss?: {
            configPath?: string;
        };
    }
}

declare const _default: {
    configs: {
        flat: {
            plugins: {
                unocss: {
                    rules: {
                        blocklist: _typescript_eslint_utils_eslint_utils.RuleWithMeta<[], "", unknown>;
                        'enforce-class-compile': _typescript_eslint_utils_eslint_utils.RuleWithMeta<[], "", unknown>;
                        order: _typescript_eslint_utils_eslint_utils.RuleWithMeta<[], "", unknown>;
                        'order-attributify': _typescript_eslint_utils_eslint_utils.RuleWithMeta<[], "", unknown>;
                    };
                };
            };
            rules: {
                readonly 'unocss/order': "warn";
                readonly 'unocss/order-attributify': "warn";
            };
        };
        recommended: {
            plugins: string[];
            rules: {
                readonly '@unocss/order': "warn";
                readonly '@unocss/order-attributify': "warn";
            };
        };
    };
    rules: {
        blocklist: _typescript_eslint_utils_eslint_utils.RuleWithMeta<[], "", unknown>;
        'enforce-class-compile': _typescript_eslint_utils_eslint_utils.RuleWithMeta<[], "", unknown>;
        order: _typescript_eslint_utils_eslint_utils.RuleWithMeta<[], "", unknown>;
        'order-attributify': _typescript_eslint_utils_eslint_utils.RuleWithMeta<[], "", unknown>;
    };
};

export { _default as default };
