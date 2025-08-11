export default function toDate(date: string | number | Date): Date | null {
  if (date === null || date === undefined) {
    return null
  }

  if (date instanceof Date) {
    return new Date(date.getTime())
  }

  if (typeof date !== 'string' && typeof date !== 'number') {
    return null
  }

  const timestamp = Date.parse(date as any)

  if (!Number.isNaN(timestamp)) {
    return new Date(timestamp)
  }

  return null
};