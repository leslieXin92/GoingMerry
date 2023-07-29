import { errorType, ErrorTypeKey } from '@/constants'
import { useErrorReturn } from '@/utils'
import type { Context } from 'koa'

const errorHandler = (error: Error, ctx: Context) => {
  ctx.status = errorType[error.message as ErrorTypeKey]?.status ?? 500
  ctx.body = useErrorReturn(errorType[error.message as ErrorTypeKey]?.message ?? 'Unknown Error')
}

export default errorHandler
