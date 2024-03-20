import request from 'supertest'
import { sign } from 'jsonwebtoken'
import app from '@/app'
import { queryInsert } from '@/utils'
import { PRIVATE_KEY } from '@/app/config'
import type { Test } from 'supertest'
import type { UserInfo } from '@/types'

type Method = 'get' | 'GET' | 'post' | 'POST' | 'patch' | 'PATCH' | 'delete' | 'DELETE'

const handleAuth = async (req: Test, userInfo: Omit<UserInfo, 'password'>) => {
  await queryInsert({
    table: 'users',
    data: {
      ...userInfo,
      password: 'test'
    }
  })
  const token = sign(userInfo, PRIVATE_KEY, {
    expiresIn: 60 * 60 * 24,
    algorithm: 'RS384'
  })
  req.set('Authorization', token)
}

export const useTest = <Params = unknown>(url: string, method: Method) => {
  return async (data: Partial<Params> = {}, userInfo?: Omit<UserInfo, 'password'>) => {
    const req = request(app.callback())[method](url)

    switch (method.toLowerCase()) {
      case 'get':
        req.query(data)
        break
      case 'post':
      case 'patch':
      case 'delete':
        req.send(data)
        break
    }

    if (userInfo) await handleAuth(req, userInfo)
    return req
  }
}
