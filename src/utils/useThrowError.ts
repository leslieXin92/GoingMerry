import type { Context } from 'koa'
import type { ErrorTypeKey } from '@/types'

// TODO - switch to throwError
export const useThrowError = (ctx: Context, errorType: ErrorTypeKey) => {
  ctx.app.emit('error', new Error(errorType), ctx)
}

// Global error emitter
export const throwError = (ctx: Context, errorMsg: string, errorStatus: number = 500) => {
  ctx.errorStatus = errorStatus
  ctx.app.emit('error', new Error(errorMsg), ctx)
}
