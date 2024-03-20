import { throwError } from '@/utils'
import type { Context, Next } from 'koa'

/**
 * Verify user submitted params for getting project details
 */
export const verifyGetProjectItemParams = async (ctx: Context, next: Next) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return throwError(ctx, 'Id Is Invalid!', 400)
  await next()
}

export const verifyCreateProjectParams = () => {
}
