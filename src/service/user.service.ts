import { querySelect, queryInsert } from '@/utils'
import type { UserInfo, UserPermissionType } from '@/types'

export const getUserInfo = async (username: string): Promise<UserInfo | null> => {
  const users = await querySelect<UserInfo[]>({
    table: 'users',
    where: { username },
    columns: ['id', 'username', 'password', 'permission']
  })
  return users.length ? users[0] : null
}

export const createUser = async (username: string, password: string, permission: UserPermissionType) => {
  const a = await queryInsert({
    table: 'users',
    data: {
      username,
      password,
      permission
    }
  })
  console.log(a)
}
