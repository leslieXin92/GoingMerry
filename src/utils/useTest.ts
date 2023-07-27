import request from 'supertest'
import app from '@/app'

type Method = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE'

export const useTest = <Params = unknown>(url: string, method: Method, params?: Params) => {
  switch (method) {
    case 'get' || 'GET':
      return (data?: Partial<Params>) => request(app.callback()).get(url).query(data ?? params ?? {})

    case 'post' || 'POST':
      return (data?: Partial<Params>) => request(app.callback()).post(url).send(data ?? params ?? {})

    case 'put' || 'PUT':
      return (data?: Partial<Params>) => request(app.callback()).put(url).send(data ?? params ?? {})

    case 'delete' || 'DELETE':
      return (data?: Partial<Params>) => request(app.callback()).delete(url).send(data ?? params ?? {})

    default:
      return (data?: Partial<Params>) => request(app.callback()).get(url).query(data ?? params ?? {})
  }
}
