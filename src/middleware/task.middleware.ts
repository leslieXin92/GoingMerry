import { useThrowError } from '@/utils'
import type { Context, Next } from 'koa'
import type { GetTaskListParams } from '@/types'

export const verifyGetTaskListParams = async (ctx: Context, next: Next) => {
  const { time } = ctx.query as Partial<GetTaskListParams>
  if (!time || (Array.isArray(time) && !time.length)) return useThrowError(ctx, 'time_is_required')
  if (!Array.isArray(time) || time.length !== 2 || isNaN(Date.parse(time[0])) || isNaN(Date.parse(time[1]))) return useThrowError(ctx, 'invalid_time')
  await next()
}
