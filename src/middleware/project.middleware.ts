import { throwError } from '@/utils'
import type { Context, Next } from 'koa'
import type { CreateProjectParams } from '@/types'

/**
 * Verify user submitted params for getting project details
 */
export const verifyGetProjectItemParams = async (ctx: Context, next: Next) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return throwError(ctx, 'Id Is Invalid!', 400)
  await next()
}

export const verifyCreateProjectParams = async (ctx: Context, next: Next) => {
  const { name, coverIcon, status = 'pending', startAt } = ctx.request.body as Partial<CreateProjectParams>
  if (!name) return throwError(ctx, 'Name is required!', 400)
  if (!coverIcon) return throwError(ctx, 'Cover icon is required!', 400)
  if (!['pending', 'doing', 'done'].includes(status)) return throwError(ctx, 'Status Is Invalid!', 400)
  if (startAt && !/^(\d{4})-(\d{2})-(\d{2})$/.test(startAt)) return throwError(ctx, 'Invalid startAt format (YYYY-MM-DD) !', 400)
  await next()
}
