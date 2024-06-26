import { useErrorReturn } from '@/utils'
import type { Context } from 'koa'

/** Global error handler */
const errorHandler = (error: Error, ctx: Context) => {
  ctx.status = ctx.errorStatus || 500
  ctx.body = useErrorReturn(error.message)
}

export default errorHandler
