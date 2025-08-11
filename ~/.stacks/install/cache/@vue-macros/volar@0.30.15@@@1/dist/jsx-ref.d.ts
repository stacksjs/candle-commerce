import { PluginReturn } from 'ts-macro';
import { OptionsResolved } from '@vue-macros/config';

declare const plugin: PluginReturn<OptionsResolved["jsxRef"] | undefined>;

export = plugin;
