import { errorType } from '@/constants'
import { useErrorReturn } from '@/utils'
import type { Context } from 'koa'
import { ErrorTypeKey } from '@/types'

const errorHandler = (error: Error, ctx: Context) => {
  ctx.status = errorType[error.message as ErrorTypeKey]?.status ?? 500
  ctx.body = useErrorReturn(errorType[error.message as ErrorTypeKey]?.message ?? 'Unknown Error')
}

export default errorHandler
