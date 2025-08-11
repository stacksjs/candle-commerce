export default function isAfter(date: string, options: IsAfterOptions): boolean {
  const comparisonDate = (typeof options === 'object' ? options.comparisonDate : options) || String(new Date()).toString()

  const comparison = toDate(comparisonDate)
  const original = toDate(date)

  return !!(original && comparison && original > comparison)
};