import { RuntimeCompilerOptions } from 'vue';
import { I18n, VueEmailPluginOptions } from 'vue-email';

interface RenderOptions {
    props?: Record<string, unknown>;
    i18n?: I18n;
}
interface DefineConfigFunctions {
    render: (name: string, options?: RenderOptions) => Promise<Result>;
}
type DefineConfig = (dir: string, config?: Options) => DefineConfigFunctions;
interface Options {
    /**
     * Show library logger
     * @default true
     */
    verbose?: boolean;
    /**
     * VueEmailPlugin options
     * @default {}
     * @see
     * https://vuemail.net/getting-started/installation#options
     */
    options?: VueEmailPluginOptions;
    vueCompilerOptions?: RuntimeCompilerOptions;
}
interface SourceOptions {
    /**
     * The source code of the component.
     */
    source: string;
    /**
     * The components used in the component.
     */
    components: {
        name: string;
        source: string;
    }[];
}
interface Result {
    html: string;
    text: string;
}

declare function templateRender(name: string, code: SourceOptions, options?: RenderOptions, config?: Options): Promise<Result>;

declare const config: DefineConfig;

export { type DefineConfig, type DefineConfigFunctions, type Options, type RenderOptions, type Result, type SourceOptions, config, templateRender };
