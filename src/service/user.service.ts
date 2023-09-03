import { execute } from '@/app/database'
import type { UserInfo } from '@/types'

export const getUserInfo = async (name: string): Promise<UserInfo | null> => {
  const statement = `
    SELECT id, username, password
    FROM users
    WHERE username = ?;
  `
  const [res] = await execute(statement, [name]) as unknown as UserInfo[][]
  return res.length ? res[0] : null
}

export const createUser = async (name: string, password: string) => {
  const statement = `INSERT INTO users (username, password) VALUES (?, ?);`
  await execute(statement, [name, password])
}
