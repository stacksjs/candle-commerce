export default function merge<T extends object, U extends object>(obj: T | undefined = {} as T, defaults: U): T & U {
  for (const key in defaults) {
    const objKey = key as unknown as keyof T
    if (typeof obj[objKey] === 'undefined') {
      (obj as any)[key] = defaults[key]
    }
  }

  return obj as T & U
};