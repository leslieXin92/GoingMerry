import request, { Test } from 'supertest'
import { sign } from 'jsonwebtoken'
import app from '@/app'
import { PRIVATE_KEY } from '@/app/config'

type Method = 'get' | 'GET' | 'post' | 'POST' | 'patch' | 'PATCH' | 'delete' | 'DELETE'
type UserInfo = {
  id: number
  username: string
}

const initUserInfo: UserInfo = {
  id: 1,
  username: 'leslie'
}

const setToken = (req: Test, userInfo?: UserInfo) => {
  const token = sign(userInfo as object, PRIVATE_KEY, {
    expiresIn: 60 * 60 * 24,
    algorithm: 'RS384'
  })
  req.set('Authorization', token)
}

export const useTest = <Params = unknown>(url: string, method: Method, params?: Params) => {
  switch (method) {
    case 'get' || 'GET':
      return (data: Partial<Params> = params ?? {}, isLogin: boolean = false, userInfo: UserInfo = initUserInfo) => {
        const req = request(app.callback()).get(url).query(data ?? params ?? {})
        if (isLogin) setToken(req, userInfo)
        return req
      }

    case 'post' || 'POST':
      return (data: Partial<Params> = params ?? {}, isLogin: boolean = false, userInfo: UserInfo = initUserInfo) => {
        const req = request(app.callback()).post(url).send(data)
        if (isLogin) setToken(req, userInfo)
        return req
      }

    case 'patch' || 'PATCH':
      return (data: Partial<Params> = params ?? {}, isLogin: boolean = false, userInfo: UserInfo = initUserInfo) => {
        const req = request(app.callback()).patch(url).send(data ?? params ?? {})
        if (isLogin) setToken(req, userInfo)
        return req
      }

    case 'delete' || 'DELETE':
      return (data: Partial<Params> = params ?? {}, isLogin: boolean = false, userInfo: UserInfo = initUserInfo) => {
        const req = request(app.callback()).delete(url).send(data ?? params ?? {})
        if (isLogin) setToken(req, userInfo)
        return req
      }

    default:
      return (data: Partial<Params> = params ?? {}, isLogin: boolean = false, userInfo: UserInfo = initUserInfo) => {
        const req = request(app.callback()).get(url).query(data ?? params ?? {})
        if (isLogin) setToken(req, userInfo)
        return req
      }
  }
}
