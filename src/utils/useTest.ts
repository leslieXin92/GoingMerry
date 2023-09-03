import request from 'supertest'
import { sign } from 'jsonwebtoken'
import app from '@/app'
import { clearDatabase } from '@/app/database'
import { PRIVATE_KEY } from '@/app/config'
import type { Test } from 'supertest'
import type { UserInfo } from '@/types'

type Method = 'get' | 'GET' | 'post' | 'POST' | 'patch' | 'PATCH' | 'delete' | 'DELETE'

const initUserInfo: Omit<UserInfo, 'password'> = {
  id: 1,
  username: 'leslie'
}

const setToken = (req: Test, userInfo?: Omit<UserInfo, any>) => {
  const token = sign(userInfo as object, PRIVATE_KEY, {
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
      return (data: Partial<Params> = params ?? {}, isLogin: boolean = false, userInfo: Omit<UserInfo, 'password'> = initUserInfo) => {
        const req = request(app.callback()).get(url).query(data ?? params ?? {})
        if (isLogin) setToken(req, userInfo)
        return req
      }

    case 'post' || 'POST':
      return (data: Partial<Params> = params ?? {}, isLogin: boolean = false, userInfo: Omit<UserInfo, 'password'> = initUserInfo) => {
        const req = request(app.callback()).post(url).send(data)
        if (isLogin) setToken(req, userInfo)
        return req
      }

    case 'patch' || 'PATCH':
      return (data: Partial<Params> = params ?? {}, isLogin: boolean = false, userInfo: Omit<UserInfo, 'password'> = initUserInfo) => {
        const req = request(app.callback()).patch(url).send(data ?? params ?? {})
        if (isLogin) setToken(req, userInfo)
        return req
      }

    case 'delete' || 'DELETE':
      return (data: Partial<Params> = params ?? {}, isLogin: boolean = false, userInfo: Omit<UserInfo, 'password'> = initUserInfo) => {
        const req = request(app.callback()).delete(url).send(data ?? params ?? {})
        if (isLogin) setToken(req, userInfo)
        return req
      }

    default:
      return (data: Partial<Params> = params ?? {}, isLogin: boolean = false, userInfo: Omit<UserInfo, 'password'> = initUserInfo) => {
        const req = request(app.callback()).get(url).query(data ?? params ?? {})
        if (isLogin) setToken(req, userInfo)
        return req
      }
  }
}
