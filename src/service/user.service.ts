import { execute } from '@/app/database'
import { querySelect } from '@/utils'
import type { UserInfo } from '@/types'

export const getUserInfo = async (name: string): Promise<UserInfo | null> => {
  const users = await querySelect<UserInfo>({
    table: 'users',
    where: { username: name },
    columns: ['id', 'username', 'password']
  })
  return users.length ? users[0] : null
}

export const createUser = async (name: string, password: string) => {
  const statement = `INSERT INTO users (username, password) VALUES (?, ?);`
  await execute(statement, [name, password])
}
