import type { ClarityConfig, Formatter, LogEntry } from '../types';

declare function isUnicodeSupported(): boolean;
declare const unicode: (...args: any[]) => unknown;
declare const ANSI: {
  cyan: '\x1B[36m';
  reset: '\x1B[0m';
  underline: '\x1B[4m'
};
export declare class TextFormatter implements Formatter {
  constructor(private config: ClarityConfig) { }

  async format(entry: LogEntry, forFile: boolean = false): Promise<string> {
    const timestamp = this.config.timestamp ? `${colors.colorize(entry.timestamp.toISOString(), colors.gray)} ` : ''
    const name = colors.colorize(`[${entry.name}]`, colors.gray)

    const levelSymbols: Record<LogLevel, string> = {
      debug: s('🔍', 'D'),
      info: s('ℹ️', 'i'),
      success: s('✅', '√'),
      warning: s('⚠️', '‼'),
      error: s('❌', '×'),
    }

    const levelColors: Record<LogLevel, string> = {
      debug: colors.gray,
      info: colors.blue,
      success: colors.green,
      warning: colors.yellow,
      error: colors.red,
    }

    let message = entry.message
    if (Array.isArray(entry.args))
      message = format(entry.message, ...entry.args)

    message = this.characterFormat(message)

    if (entry.level === 'error' && message.includes('\n')
      && (message.includes('at ') || message.includes('stack:'))) {
      message = this.formatStack(message)
    }

    const symbol = this.config.colors ? levelSymbols[entry.level] : ''
    message = this.config.colors
      ? colors.colorize(message, levelColors[entry.level])
      : message

    if (forFile) {
      return `${entry.timestamp.toISOString()} ${name} ${symbol} ${message}`
    }

    return `${timestamp}${name} ${symbol} ${message}`
  }

  private characterFormat(str: string): string {
    if (!this.config.colors)
      return str

    return str
      .replace(/`([^`]+)`/g, (_, m) => `${ANSI.cyan}${m}${ANSI.reset}`)
      .replace(/\s+_([^_]+)_\s+/g, (_, m) => ` ${ANSI.underline}${m}${ANSI.reset} `)
  }

  private formatStack(stack: string): string {
    if (!stack)
      return ''

    const lines = stack.split('\n')
    const formattedLines = lines.map((line, i) => {
      if (i === 0)
        return line 

      if (line.trim().startsWith('at ')) {
        const atParts = line.trim().split(/^at\s+/)
        if (atParts.length > 1) {
          const funcLocationParts = atParts[1].split(' (')
          if (funcLocationParts.length > 1) {
            const fnName = funcLocationParts[0]
            const location = funcLocationParts[1].replace(')', '')
            return `  ${colors.colorize(`at ${colors.colorize(fnName, ANSI.cyan)} (${location})`, colors.gray)}`
          }
        }
        return `  ${colors.colorize(line.trim(), colors.gray)}`
      }
      return `  ${line}`
    })

    return formattedLines.join('\n')
  }
}