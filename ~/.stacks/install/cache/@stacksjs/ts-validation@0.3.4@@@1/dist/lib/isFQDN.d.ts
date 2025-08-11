declare const default_fqdn_options: {
  require_tld: true;
  allow_underscores: false;
  allow_trailing_dot: false;
  allow_numeric_tld: false;
  allow_wildcard: false;
  ignore_max_length: false
};

export default function isFQDN(str: string, options: IsFQDNOptions = {}): boolean {
  assertString(str)
  options = merge(options, default_fqdn_options)

  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1)
  }

  if (options.allow_wildcard === true && str.indexOf('*.') === 0) {
    str = str.substring(2)
  }

  const parts = str.split('.')
  const tld = parts[parts.length - 1]

  if (options.require_tld) {
    if (parts.length < 2) {
      return false
    }

    if (!options.allow_numeric_tld && !/^(?:[a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false
    }

    if (/\s/.test(tld)) {
      return false
    }
  }

  if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
    return false
  }

  return parts.every((part) => {
    if (part.length > 63 && !options.ignore_max_length) {
      return false
    }

    if (!/^[\w\u00A1-\uFFFF-]+$/.test(part)) {
      return false
    }

    if (/[\uFF01-\uFF5E]/.test(part)) {
      return false
    }

    if (/^-|-$/.test(part)) {
      return false
    }

    if (!options.allow_underscores && /_/.test(part)) {
      return false
    }

    return true
  })
};