declare const default_normalize_email_options: {
  all_lowercase: true;
  gmail_lowercase: true;
  gmail_remove_dots: true;
  gmail_remove_subaddress: true;
  gmail_convert_googlemaildotcom: true;
  outlookdotcom_lowercase: true;
  outlookdotcom_remove_subaddress: true;
  yahoo_lowercase: true;
  yahoo_remove_subaddress: true;
  yandex_lowercase: true;
  yandex_convert_yandexru: true;
  icloud_lowercase: true;
  icloud_remove_subaddress: true
};
declare const icloud_domains: Array<unknown | unknown>;
declare const outlookdotcom_domains: Array<unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown>;
declare const yahoo_domains: Array<unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown | unknown>;
declare const yandex_domains: Array<unknown | unknown | unknown | unknown | unknown | unknown>;
declare function dotsReplacer(match: string): void;

export default function normalizeEmail(email: string, options: Partial<NormalizeEmailOptions> = {}): string | false {
  options = merge(options, default_normalize_email_options)

  const raw_parts = email.split('@')
  const domain = raw_parts.pop()
  const user = raw_parts.join('@')
  const parts = [user, domain]

  if (!parts[0] || !parts[1]) {
    return false
  }

  parts[1] = parts[1].toLowerCase()

  if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
    if (options.gmail_remove_subaddress) {
      parts[0] = parts[0].split('+')[0]
    }
    if (options.gmail_remove_dots) {
      parts[0] = parts[0].replace(/\.+/g, dotsReplacer)
    }
    if (!parts[0].length) {
      return false
    }
    if (options.all_lowercase || options.gmail_lowercase) {
      parts[0] = parts[0].toLowerCase()
    }
    parts[1] = options.gmail_convert_googlemaildotcom ? 'gmail.com' : parts[1]
  }
  else if (icloud_domains.includes(parts[1])) {
    if (options.icloud_remove_subaddress) {
      parts[0] = parts[0].split('+')[0]
    }
    if (!parts[0].length) {
      return false
    }
    if (options.all_lowercase || options.icloud_lowercase) {
      parts[0] = parts[0].toLowerCase()
    }
  }
  else if (outlookdotcom_domains.includes(parts[1])) {
    if (options.outlookdotcom_remove_subaddress) {
      parts[0] = parts[0].split('+')[0]
    }
    if (!parts[0].length) {
      return false
    }
    if (options.all_lowercase || options.outlookdotcom_lowercase) {
      parts[0] = parts[0].toLowerCase()
    }
  }
  else if (yahoo_domains.includes(parts[1])) {
    if (options.yahoo_remove_subaddress) {
      const components = parts[0].split('-')
      parts[0] = (components.length > 1) ? components.slice(0, -1).join('-') : components[0]
    }
    if (!parts[0].length) {
      return false
    }
    if (options.all_lowercase || options.yahoo_lowercase) {
      parts[0] = parts[0].toLowerCase()
    }
  }
  else if (yandex_domains.includes(parts[1])) {
    if (options.all_lowercase || options.yandex_lowercase) {
      parts[0] = parts[0].toLowerCase()
    }
    parts[1] = options.yandex_convert_yandexru ? 'yandex.ru' : parts[1]
  }
  else if (options.all_lowercase) {
    parts[0] = parts[0].toLowerCase()
  }
  return parts.join('@')
};