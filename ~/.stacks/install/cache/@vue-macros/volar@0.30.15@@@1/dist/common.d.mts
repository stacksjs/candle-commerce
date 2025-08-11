import * as typescript from 'typescript';
import { FeatureName, OptionsResolved } from '@vue-macros/config';
import { SFCScriptBlock } from '@vue-macros/common';
import { VueLanguagePlugin, Code, Sfc } from '@vue/language-core';

declare const REGEX_DEFINE_COMPONENT: RegExp;
declare function addProps(codes: Code[], decl: Code[], vueLibName: string): true | undefined;
declare function addEmits(codes: Code[], decl: Code[], vueLibName: string): true | undefined;
declare function addCode(codes: Code[], ...args: Code[]): void;
type VueMacrosPlugin<K extends FeatureName> = (ctx: PluginContext, options?: OptionsResolved[K]) => ReturnType<VueLanguagePlugin>;
type PluginContext = Parameters<VueLanguagePlugin>[0];
declare function getVolarOptions<K extends keyof OptionsResolved>(context: PluginContext, key: K): OptionsResolved[K];
interface VolarContext {
	ts: typeof typescript;
	ast?: typescript.SourceFile;
	sfc?: Sfc;
	source?: "script" | "scriptSetup";
}
declare function getStart(node: typescript.Node | typescript.NodeArray<typescript.Node>, { ts, ast, sfc, source }: VolarContext): number;
declare function getText(node: typescript.Node, context: VolarContext): string;
declare function isJsxExpression(node?: typescript.Node): node is typescript.JsxExpression;
declare function patchSFC(block: SFCScriptBlock | null, offset: number): void;

export { type PluginContext, REGEX_DEFINE_COMPONENT, type VolarContext, type VueMacrosPlugin, addCode, addEmits, addProps, getStart, getText, getVolarOptions, isJsxExpression, patchSFC };
