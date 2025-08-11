import { ShikiTransformer } from 'shiki';
import { V as VitePressPluginTwoslashOptions } from './shared/vitepress-twoslash.D_PyQzvF.mjs';
export { T as TwoslashFloatingVueOptions, a as TwoslashFloatingVueRendererOptions, b as TwoslashTypesCache, r as rendererFloatingVue } from './shared/vitepress-twoslash.D_PyQzvF.mjs';
export { defaultHoverInfoProcessor } from '@shikijs/twoslash';
import '@shikijs/twoslash/core';
import 'twoslash';
import 'twoslash-vue';

/**
 * Create a Shiki transformer for VitePress to enable twoslash integration
 *
 * Add this to `markdown.codeTransformers` in `.vitepress/config.ts`
 */
declare function transformerTwoslash(options?: VitePressPluginTwoslashOptions): ShikiTransformer;

export { VitePressPluginTwoslashOptions, transformerTwoslash };
