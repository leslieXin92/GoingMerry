import request, { Test } from 'supertest'
import { sign } from 'jsonwebtoken'
import app from '@/app'
import { PRIVATE_KEY } from '@/app/config'

type Method = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE'

const setToken = (req: Test) => {
  const token = sign({ id: 1, username: 'leslie' }, PRIVATE_KEY, {
    expiresIn: 60 * 60 * 24,
    algorithm: 'RS384'
  })
  req.set('Authorization', token)
}

export const useTest = <Params = unknown>(url: string, method: Method, params?: Params) => {
  switch (method) {
    case 'get' || 'GET':
      return (data: Partial<Params> = params ?? {}, isLogin: boolean = false) => {
        const req = request(app.callback()).get(url).query(data ?? params ?? {})
        if (isLogin) setToken(req)
        return req
      }

    case 'post' || 'POST':
      return (data: Partial<Params> = params ?? {}, isLogin: boolean = false) => {
        const req = request(app.callback()).post(url).send(data)
        if (isLogin) setToken(req)
        return req
      }

    case 'put' || 'PUT':
      return (data: Partial<Params> = params ?? {}, isLogin: boolean = false) => {
        const req = request(app.callback()).put(url).send(data ?? params ?? {})
        if (isLogin) setToken(req)
        return req
      }

    case 'delete' || 'DELETE':
      return (data: Partial<Params> = params ?? {}, isLogin: boolean = false) => {
        const req = request(app.callback()).delete(url).send(data ?? params ?? {})
        if (isLogin) setToken(req)
        return req
      }

    default:
      return (data: Partial<Params> = params ?? {}, isLogin: boolean = false) => {
        const req = request(app.callback()).get(url).query(data ?? params ?? {})
        if (isLogin) setToken(req)
        return req
      }
  }
}
