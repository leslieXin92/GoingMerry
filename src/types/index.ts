import { Context, Request } from 'koa'
import { IncomingMessage } from 'http'

export * from './user.type'

export interface CustomContext<Body = unknown, File = unknown> extends Context {
  request: Request & { body: Body }
  req: IncomingMessage & { file: File }
}
