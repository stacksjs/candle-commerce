export default function isAbaRouting(str: string): boolean {
  assertString(str)

  if (!isRoutingReg.test(str))
    return false

  let checkSumVal = 0
  for (let i = 0; i < str.length; i++) {
    if (i % 3 === 0)
      checkSumVal += Number.parseInt(str[i]) * 3
    else if (i % 3 === 1)
      checkSumVal += Number.parseInt(str[i]) * 7
    else checkSumVal += Number.parseInt(str[i]) * 1
  }
  return (checkSumVal % 10 === 0)
};