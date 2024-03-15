import type { Context } from 'koa'

/**
 * Global error emitter
 * @400: Bad Request
 * @401: Unauthorized
 * @403: Forbidden
 * @409: Conflict
 * @500: Internal Server Error
 */
export const throwError = (ctx: Context, errorMsg: string, errorStatus: number = 500) => {
  ctx.errorStatus = errorStatus
  ctx.app.emit('error', new Error(errorMsg), ctx)
}
