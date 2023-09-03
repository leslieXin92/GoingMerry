import request from 'supertest'
import { sign } from 'jsonwebtoken'
import app from '@/app'
import { clearDatabase } from '@/app/database'
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

export const useTest = <Params = unknown>(url: string, method: Method, params?: Params) => {
  beforeEach(async () => await clearDatabase())
  afterEach(async () => await clearDatabase())

  switch (method) {
    case 'get' || 'GET':
      return async (data: Partial<Params> = params ?? {}, userInfo?: Omit<UserInfo, 'password'>) => {
        const req = request(app.callback()).get(url).query(data ?? params ?? {})
        if (userInfo) await handleAuth(req, userInfo)
        return req
      }

    case 'post' || 'POST':
      return async (data: Partial<Params> = params ?? {}, userInfo?: Omit<UserInfo, 'password'>) => {
        const req = request(app.callback()).post(url).send(data ?? params ?? {})
        if (userInfo) await handleAuth(req, userInfo)
        return req
      }

    case 'patch' || 'PATCH':
      return async (data: Partial<Params> = params ?? {}, userInfo?: Omit<UserInfo, 'password'>) => {
        const req = request(app.callback()).patch(url).send(data ?? params ?? {})
        if (userInfo) await handleAuth(req, userInfo)
        return req
      }

    case 'delete' || 'DELETE':
      return async (data: Partial<Params> = params ?? {}, userInfo?: Omit<UserInfo, 'password'>) => {
        const req = request(app.callback()).delete(url).send(data ?? params ?? {})
        if (userInfo) await handleAuth(req, userInfo)
        return req
      }

    default:
      return async (data: Partial<Params> = params ?? {}, userInfo?: Omit<UserInfo, 'password'>) => {
        const req = request(app.callback()).get(url).query(data ?? params ?? {})
        if (userInfo) await handleAuth(req, userInfo)
        return req
      }
  }
}
