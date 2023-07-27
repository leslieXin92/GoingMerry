import { errorType, ErrorTypeKey } from '@/constants/errorType'
import { Context } from 'koa'

const errorHandler = (error: Error, ctx: Context) => {
  ctx.status = errorType[error.message as ErrorTypeKey]?.status ?? 500
  ctx.body = errorType[error.message as ErrorTypeKey]?.message ?? 'Unknown Error'
}

export default errorHandler
