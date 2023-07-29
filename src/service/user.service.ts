import execute from '@/app/database'
import type { RowDataPacket } from 'mysql2'
import type { LoginResult } from '@/types'

interface UserInfo extends RowDataPacket {
  id: number
  username: string
  password: string
}

export const getUserInfo = async (name: string): Promise<UserInfo | null> => {
  const statement = `
    SELECT
      id, username, password
    FROM users
    WHERE username = ?;
  `
  const [res] = await execute<UserInfo[]>(statement, [name])
  return res.length ? res[0] : null
}

export const createUser = async (name: string, password: string): Promise<LoginResult> => {
  const statement = `INSERT INTO users (username, password) VALUES (?, ?);`
  const [res] = await execute(statement, [name, password])
  // @ts-ignore TODO - type
  return res
}
