import { querySelect, queryInsert } from '@/utils'
import type { UserInfo } from '@/types'

export const getUserInfo = async (name: string): Promise<UserInfo | null> => {
  const users = await querySelect<UserInfo[]>({
    table: 'users',
    where: { username: name },
    columns: ['id', 'username', 'password']
  })
  return users.length ? users[0] : null
}

export const createUser = async (name: string, password: string) => {
  await queryInsert({
    table: 'users',
    data: {
      username: name,
      password
    }
  })
}
