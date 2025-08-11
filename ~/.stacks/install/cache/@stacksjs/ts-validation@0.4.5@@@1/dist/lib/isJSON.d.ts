declare const default_json_options: {
  allow_primitives: false
};

export default function isJSON(str: string, options: IsJSONOptions = {}): boolean {
  assertString(str)
  try {
    options = merge(options, default_json_options)
    let primitives: (null | boolean)[] = []
    if (options.allow_primitives) {
      primitives = [null, false, true]
    }

    const obj = JSON.parse(str)
    return includes(primitives, obj) || (!!obj && typeof obj === 'object')
  }
  catch {  }
  return false
};