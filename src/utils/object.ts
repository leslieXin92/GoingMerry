/**
 * Compare the values fo two objects by their same keys
 */
export const isEqual = (before: Record<string, any>, after: Record<string, any>) => {
  const beforeKeys = Object.keys(before)
  const afterKeys = Object.keys(after)
  const sameKeys = beforeKeys.filter(key => afterKeys.includes(key))
  return sameKeys.every(key => before[key] === after[key])
}
