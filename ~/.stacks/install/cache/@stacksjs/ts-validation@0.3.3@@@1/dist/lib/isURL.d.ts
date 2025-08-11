declare const default_url_options: {
  protocols: Array<'http' | 'https' | 'ftp'>;
  require_tld: true;
  require_protocol: false;
  require_host: true;
  require_port: false;
  require_valid_protocol: true;
  allow_underscores: false;
  allow_trailing_dot: false;
  allow_protocol_relative_urls: false;
  allow_fragments: true;
  allow_query_components: true;
  validate_length: true;
  max_allowed_length: 2084
};

export default function isURL(url: string, options?: Partial<IsURLOptions>): boolean {
  assertString(url)
  if (!url || /[\s<>]/.test(url)) {
    return false
  }
  if (url.indexOf('mailto:') === 0) {
    return false
  }
  options = merge(options, default_url_options)

  if (options?.validate_length && url.length > (options?.max_allowed_length ?? default_url_options.max_allowed_length)) {
    return false
  }

  if (!options.allow_fragments && includes(url, '#')) {
    return false
  }

  if (!options.allow_query_components && (includes(url, '?') || includes(url, '&'))) {
    return false
  }

  let protocol, auth, host, port, port_str, ipv6
  let split: string[] = []

  split = url.split('#')
  url = split.shift() ?? ''

  split = url.split('?')
  url = split.shift() ?? ''

  split = url.split(':
  if (split.length > 1) {
    protocol = split.shift()?.toLowerCase() ?? ''
    if (options?.require_valid_protocol && !(options?.protocols ?? default_url_options.protocols).includes(protocol)) {
      return false
    }
  }
  else if (options.require_protocol) {
    return false
  }
  else if (url.slice(0, 2) === '
    if (!options.allow_protocol_relative_urls) {
      return false
    }
    split[0] = url.slice(2)
  }
  url = split.join(':

  if (url === '') {
    return false
  }

  split = url.split('/')
  const hostname = split.shift() ?? ''

  if (hostname === '' && !options.require_host) {
    return true
  }

  split = hostname.split('@')
  if (split.length > 1) {
    if (options.disallow_auth) {
      return false
    }
    if (split[0] === '') {
      return false
    }
    auth = split.shift() ?? ''
    if (auth.includes(':') && auth.split(':').length > 2) {
      return false
    }
    const [user, password] = auth.split(':')
    if (user === '' && password === '') {
      return false
    }
  }

  port_str = null
  ipv6 = null
  const ipv6_match = hostname.match(wrapped_ipv6)
  if (ipv6_match) {
    host = ''
    ipv6 = ipv6_match[1]
    port_str = ipv6_match[2] || null
  }
  else {
    split = hostname.split(':')
    host = split.shift()
    if (split.length) {
      port_str = split.join(':')
    }
  }

  if (port_str !== null && port_str.length > 0) {
    port = Number.parseInt(port_str, 10)
    if (!/^\d+$/.test(port_str) || port <= 0 || port > 65535) {
      return false
    }
  }
  else if (options.require_port) {
    return false
  }

  if (options.host_whitelist) {
    return checkHost(host ?? '', options.host_whitelist)
  }

  if (host === '' && !options.require_host) {
    return true
  }

  if (!isIP(host ?? '') && !isFQDN(host ?? '', options) && (!ipv6 || !isIP(ipv6, { version: 6 }))) {
    return false
  }

  host = (host || ipv6) ?? ''

  if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
    return false
  }

  return true
};