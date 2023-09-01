import { writeList } from '@/constants'

export const verifyWriteList = (username: string) => {
  return writeList.map(i => i.toLowerCase()).includes(username)
}
