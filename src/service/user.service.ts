import { execute } from '@/app/database'
import { querySelect } from '@/utils'
import type { UserInfo } from '@/types'

export const getUserInfo = async (name: string): Promise<UserInfo | null> => {
  const user = await querySelect<UserInfo>({
    table: 'users',
    where: { username: name },
    columns: ['id', 'username', 'password']
  })
  return user[0] || null
}

export const createUser = async (name: string, password: string) => {
  const statement = `INSERT INTO users (username, password) VALUES (?, ?);`
  await execute(statement, [name, password])
}
