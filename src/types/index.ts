import { Context, Request } from 'koa'
import { IncomingMessage } from 'http'

export * from './error.type'
export * from './user.type'
export * from './blog.type'

export interface CustomContext<Body = unknown, File = unknown> extends Context {
  request: Request & { body: Body }
  req: IncomingMessage & { file: File }
}
