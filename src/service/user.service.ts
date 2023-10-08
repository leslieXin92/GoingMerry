import { querySelect, queryInsert } from '@/utils'
import type { UserInfo } from '@/types'

export const getUserInfo = async (username: string): Promise<UserInfo | null> => {
  const users = await querySelect<UserInfo[]>({
    table: 'users',
    where: { username },
    columns: ['id', 'username', 'password']
  })
  return users.length ? users[0] : null
}

export const createUser = async (username: string, password: string) => {
  await queryInsert({
    table: 'users',
    data: {
      username,
      password
    }
  })
}
