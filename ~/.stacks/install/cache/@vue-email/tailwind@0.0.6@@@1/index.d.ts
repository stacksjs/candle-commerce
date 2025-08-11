import type { Config } from 'tailwindcss'

export interface TailwindConfig {
  important?: Config['important']
  prefix?: Config['prefix']
  separator?: Config['separator']
  safelist?: Config['safelist']
  presets?: Config['presets']
  future?: Config['future']
  experimental?: Config['experimental']
  darkMode?: Config['darkMode']
  theme?: Config['theme']
  corePlugins?: Config['corePlugins']
  plugins?: Config['plugins']
}

export function cssToJsxStyle(cssText: string): Record<string, string>
export function escapeClassName(className: string): string
export function getCssForMarkup(markup: string, config: TailwindConfig | undefined): Promise<string>
export function getStylesPerClassMap(css: string): Record<string, string>
export function minifyCss(css: string): string
export function useRgbNonSpacedSyntax(css: string): string
