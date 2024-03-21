type DateFormat = 'YYYY' | 'YY' | 'MM' | 'DD' | 'HH' | 'hh' | 'mm' | 'ss'

/**
 * Compare the values fo two objects by their same keys
 */
export const isEqual = (before: Record<string, any>, after: Record<string, any>) => {
  const beforeKeys = Object.keys(before)
  const afterKeys = Object.keys(after)
  const sameKeys = beforeKeys.filter(key => afterKeys.includes(key))
  return sameKeys.every(key => before[key] === after[key])
}

/**
 * Format the Date object to specified format
 */
export const dateFormat = (date: Date, format: string = 'YYYY-MM-DD') => {
  const replacements: Record<DateFormat, string> = {
    YYYY: String(date.getFullYear()),
    YY: String(date.getFullYear()).slice(-2),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    DD: String(date.getDate()).padStart(2, '0'),
    HH: String(date.getHours()).padStart(2, '0'),
    hh: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0')
  }

  let originDate = format

  Object.keys(replacements).forEach(key => {
    originDate = originDate.replace(key, replacements[key as DateFormat])
  })

  return originDate
}
