import type { ClarityConfig, Formatter, LogEntry } from '../types';

declare const COLORS: {
  reset: '\x1B[0m';
  dim: '\x1B[2m';
  black: '\x1B[30m';
  red: '\x1B[31m';
  green: '\x1B[32m';
  yellow: '\x1B[33m';
  blue: '\x1B[34m';
  magenta: '\x1B[35m';
  cyan: '\x1B[36m';
  white: '\x1B[37m';
  brightRed: '\x1B[91m';
  brightGreen: '\x1B[92m';
  brightYellow: '\x1B[93m';
  brightBlue: '\x1B[94m';
  brightMagenta: '\x1B[95m';
  brightCyan: '\x1B[96m';
  brightWhite: '\x1B[97m';
  bgRed: '\x1B[41m';
  bgGreen: '\x1B[42m';
  bgYellow: '\x1B[43m';
  bgBlue: '\x1B[44m';
  bgMagenta: '\x1B[45m';
  bgCyan: '\x1B[46m';
  bgWhite: '\x1B[47m';
  bold: '\x1B[1m';
  underline: '\x1B[4m';
  gray: '\x1B[90m'
};
declare function isUnicodeSupported(): boolean;
declare const unicode: (...args: any[]) => unknown;
declare const ICONS: {
  debug: unknown;
  info: unknown;
  success: unknown;
  warning: unknown;
  error: unknown
};
declare interface LevelStyle {
  color: string
  label: string
  box?: boolean
  bgColor?: string
}
declare const LEVEL_STYLES: Record<string, LevelStyle>;
declare const DEFAULT_TERMINAL_WIDTH: 120;
declare function stripAnsi(str: string): string;
declare function stringWidth(str: string): number;
declare function createBox(text: string, color: string, forFile?: boolean): string;
declare function characterFormat(str: string): string;
declare function formatStack(stack: string, forFile?: boolean): string;
export declare class PrettyFormatter implements Formatter {
  private config: ClarityConfig
  private terminalWidth: number

  constructor(config: ClarityConfig) {
    this.config = config
    this.terminalWidth = DEFAULT_TERMINAL_WIDTH
  }

  async format(entry: LogEntry, forFile: boolean = false): Promise<string> {
    const { timestamp, level, message, args = [], name } = entry
    const formattedMessage = args.length ? format(message, ...args) : message

    const style = LEVEL_STYLES[level]
    const icon = ICONS[level]

    const timestampStr = timestamp.toISOString()
    const formattedTimestamp = forFile
      ? timestampStr
      : `${COLORS.dim}${timestampStr}${COLORS.reset}`

    const formattedName = forFile
      ? `[${name}]`
      : `${COLORS.brightCyan}[${name}]${COLORS.reset}`

    const levelOutput = forFile
      ? `${icon} `
      : `${style.color}${icon} ${COLORS.reset}`

    let formattedContent = formattedMessage

    if (level === 'error' && formattedMessage.includes('\n')
      && (formattedMessage.includes('at ') || formattedMessage.includes('stack:'))) {
      formattedContent = formatStack(formattedMessage, forFile)
    }
    else {
      formattedContent = forFile
        ? formattedContent
        : characterFormat(formattedContent)
    }

    if (forFile) {
      if (style.box) {
        const levelLabel = style.label
        const boxedContent = createBox(formattedContent, level === 'error' ? COLORS.red : COLORS.yellow, forFile)
        const boxLines = boxedContent.split('\n')

        return [
          `${timestampStr} ${formattedName} ${levelLabel}`,
          ...boxLines.map(line => `${timestampStr} ${' '.repeat(formattedName.length + levelLabel.length + 2)} ${line}`),
        ].join('\n')
      }

      return `${timestampStr} ${formattedName} ${levelOutput}${formattedContent}`
    }

    let logContent = ''

    if (style.box) {
      const levelLabel = `${style.color}${style.label}${COLORS.reset}`
      if (level === 'error') {
        logContent = `${formattedName} ${levelLabel}\n${createBox(formattedContent, COLORS.red, forFile)}`
      }
      else if (level === 'warning') {
        logContent = `${formattedName} ${levelLabel}\n${createBox(formattedContent, COLORS.yellow, forFile)}`
      }
    }
    else {
      logContent = `${formattedName} ${levelOutput}${formattedContent}`
    }

    if (logContent.includes('\n')) {
      const lines = logContent.split('\n')

      const firstLineVisibleLength = stringWidth(lines[0])
      const timestampVisibleLength = stringWidth(formattedTimestamp)

      const padding = Math.max(0, this.terminalWidth - firstLineVisibleLength - timestampVisibleLength - 1)

      lines[0] = `${lines[0]}${' '.repeat(padding)}${formattedTimestamp}`

      return lines.join('\n')
    }
    else {
      const logContentVisibleLength = stringWidth(logContent)
      const timestampVisibleLength = stringWidth(formattedTimestamp)

      const padding = Math.max(0, this.terminalWidth - logContentVisibleLength - timestampVisibleLength - 1)

      return `${logContent}${' '.repeat(padding)}${formattedTimestamp}`
    }
  }

  async formatForFile(entry: LogEntry): Promise<string> {
    return this.format(entry, true)
  }
}