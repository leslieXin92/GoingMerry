import { createHash } from 'crypto'

export const encrypt = (password: string) => {
  return createHash('md5')
    .update(password)
    .digest('hex')
}
