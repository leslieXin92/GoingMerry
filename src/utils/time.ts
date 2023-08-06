export const validateDate = (date: string) => {
  const reg = /^\d{4}-\d{2}-\d{2}$/
  return reg.test(date)
}

