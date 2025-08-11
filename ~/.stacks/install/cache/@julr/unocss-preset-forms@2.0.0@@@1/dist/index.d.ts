import * as unocss from 'unocss';

/**
 * Options accepted by the presetForms preset
 */
interface PresetFormOptions {
    strategy?: 'base' | 'class';
}

/**
 * Forms preset for UnoCSS.
 * Port of `@tailwindcss/forms` for UnoCSS
 */
declare const presetForms: unocss.PresetFactory<object, PresetFormOptions>;

export { presetForms };
