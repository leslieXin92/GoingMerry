import type { Context } from 'koa'
import type { ErrorTypeKey } from '@/types'

export const useThrowError = (ctx: Context, errorType: ErrorTypeKey) => {
  ctx.app.emit('error', new Error(errorType), ctx)
}
