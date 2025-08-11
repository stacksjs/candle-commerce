export default function isISIN(str: string): boolean {
  assertString(str)
  if (!isin.test(str)) {
    return false
  }

  let double = true
  let sum = 0
  for (let i = str.length - 2; i >= 0; i--) {
    if (str[i] >= 'A' && str[i] <= 'Z') {
      const value = str[i].charCodeAt(0) - 55
      const lo = value % 10
      const hi = Math.trunc(value / 10)
      for (const digit of [lo, hi]) {
        if (double) {
          if (digit >= 5) {
            sum += 1 + ((digit - 5) * 2)
          }
          else {
            sum += digit * 2
          }
        }
        else {
          sum += digit
        }
        double = !double
      }
    }
    else {
      const digit = str[i].charCodeAt(0) - '0'.charCodeAt(0)
      if (double) {
        if (digit >= 5) {
          sum += 1 + ((digit - 5) * 2)
        }
        else {
          sum += digit * 2
        }
      }
      else {
        sum += digit
      }
      double = !double
    }
  }

  const check = (Math.trunc(((sum + 9) / 10)) * 10) - sum

  return +str[str.length - 1] === check
};