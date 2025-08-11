export declare interface MessageProviderType {
  getMessage: (ruleName: string, customMessage?: string, field?: string, params?: Record<string, any>) => string
  setMessage: (ruleName: string, message: string, field?: string) => void
  setMessages: (messages: Record<string, string>) => void
}
export declare class MessageProvider implements MessageProviderType {
  private messages: Map<string, string> = new Map()

  constructor(messages?: Record<string, string>) {
    if (messages) {
      this.setMessages(messages)
    }
  }

  getMessage(ruleName: string, ruleMessage?: string, field?: string, params?: Record<string, any>): string {
    let message: string | undefined

    if (field) {
      const fieldSpecificKey = `${field}.${ruleName}`
      message = this.messages.get(fieldSpecificKey)
    }

    if (!message) {
      message = this.messages.get(ruleName)
    }

    if (!message && ruleMessage) {
      message = ruleMessage
    }

    if (message && params) {
      message = this.replaceParams(message, params)
    }

    if (!message) {
      message = this.getDefaultMessage(ruleName)
    }

    return message
  }

  setMessage(rule: string, message: string, field?: string): void {
    const key = field ? `${field}.${rule}` : rule
    this.messages.set(key, message)
  }

  setMessages(messages: Record<string, string>): void {
    Object.entries(messages).forEach(([key, message]) => {
      this.messages.set(key, message)
    })
  }

  private getDefaultMessage(rule: string): string {
    const defaults: Record<string, string> = {
      required: 'This field is required',
      string: 'Must be a string',
      number: 'Must be a number',
      integer: 'Must be an integer',
      float: 'Must be a float',
      boolean: 'Must be a boolean',
      array: 'Must be an array',
      object: 'Must be an object',
      email: 'Must be a valid email address',
      url: 'Must be a valid URL',
      min: 'Must be at least {min}',
      max: 'Must be at most {max}',
      length: 'Must be exactly {length}',
      matches: 'Must match pattern {pattern}',
      equals: 'Must be equal to {value}',
      alphanumeric: 'Must only contain letters and numbers',
      alpha: 'Must only contain letters',
      numeric: 'Must only contain numbers',
      positive: 'Must be positive',
      negative: 'Must be negative',
      date: 'Must be a valid date',
      datetime: 'Must be a valid datetime',
      time: 'Must be a valid time',
      timestamp: 'Must be a valid timestamp',
      unix: 'Must be a valid Unix timestamp',
      json: 'Must be valid JSON',
      enum: 'Must be one of: {values}',
      custom: 'Validation failed',
    }

    return defaults[rule] || 'Validation failed'
  }

  private replaceParams(message: string, params: Record<string, any>): string {
    return message.replace(/\{([^}]+)\}/g, (_, key) => {
      const value = key.split('.').reduce((obj: any, k: string) => obj?.[k], params)
      return value !== undefined ? String(value) : `{${key}}`
    })
  }
}
export declare function setCustomMessages(provider: MessageProvider): void;
export declare function getCustomMessages(): MessageProviderType;