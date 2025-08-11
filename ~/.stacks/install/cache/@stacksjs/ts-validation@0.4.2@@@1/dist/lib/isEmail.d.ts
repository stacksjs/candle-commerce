declare const default_email_options: {
  allow_display_name: false;
  allow_underscores: false;
  require_display_name: false;
  allow_utf8_local_part: true;
  require_tld: true;
  blacklisted_chars: '';
  ignore_max_length: false;
  host_blacklist: unknown[];
  host_whitelist: unknown[]
};
declare const defaultMaxEmailLength: 254;
declare function validateDisplayName(display_name: string): boolean;

export default function isEmail(str: string, options: any = {}): boolean {
  assertString(str)
  options = merge(options, default_email_options)

  if (options.require_display_name || options.allow_display_name) {
    const display_email = str.match(splitNameAddress)
    if (display_email) {
      let display_name = display_email[1]

      str = str.replace(display_name, '').replace(/(^<|>$)/g, '')

      if (display_name.endsWith(' ')) {
        display_name = display_name.slice(0, -1)
      }

      if (!validateDisplayName(display_name)) {
        return false
      }
    }
    else if (options.require_display_name) {
      return false
    }
  }
  if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {
    return false
  }

  const parts = str.split('@')
  const domain = parts.pop()
  if (!domain)
    return false
  const lower_domain = domain.toLowerCase()

  if (options.host_blacklist.length > 0 && checkHost(lower_domain, options.host_blacklist)) {
    return false
  }

  if (options.host_whitelist.length > 0 && !checkHost(lower_domain, options.host_whitelist)) {
    return false
  }

  let user = parts.join('@')

  if (options.domain_specific_validation && (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')) {
    Previously we removed dots for gmail addresses before validating.
    This was removed because it allows `multiple..dots@gmail.com`
    to be reported as valid, but it is not.
    Gmail only normalizes single dots, removing them from here is pointless,
    should be done in normalizeEmail
    user = user.toLowerCase()

    const username = user.split('+')[0]

    if (!isByteLength(username.replace(/\./g, ''), { min: 6, max: 30 })) {
      return false
    }

    const user_parts = username.split('.')
    for (let i = 0; i < user_parts.length; i++) {
      if (!gmailUserPart.test(user_parts[i])) {
        return false
      }
    }
  }

  if (options.ignore_max_length === false && (
    !isByteLength(user, { max: 64 })
    || !isByteLength(domain, { max: 254 }))
  ) {
    return false
  }

  if (!isFQDN(domain, {
    require_tld: options.require_tld,
    ignore_max_length: options.ignore_max_length,
    allow_underscores: options.allow_underscores,
  })) {
    if (!options.allow_ip_domain) {
      return false
    }

    if (!isIP(domain)) {
      if (!domain.startsWith('[') || !domain.endsWith(']')) {
        return false
      }

      const noBracketdomain = domain.slice(1, -1)

      if (noBracketdomain.length === 0 || !isIP(noBracketdomain)) {
        return false
      }
    }
  }

  if (options.blacklisted_chars) {
    if (user.search(new RegExp(`[${options.blacklisted_chars}]+`, 'g')) !== -1)
      return false
  }

  if (user[0] === '"' && user[user.length - 1] === '"') {
    user = user.slice(1, user.length - 1)
    return options.allow_utf8_local_part
      ? quotedEmailUserUtf8.test(user)
      : quotedEmailUser.test(user)
  }

  const pattern = options.allow_utf8_local_part
    ? emailUserUtf8Part
    : emailUserPart

  const user_parts = user.split('.')
  for (let i = 0; i < user_parts.length; i++) {
    if (!pattern.test(user_parts[i])) {
      return false
    }
  }

  return true
};