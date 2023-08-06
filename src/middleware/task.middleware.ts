import { useThrowError } from '@/utils'
import type { Context, Next } from 'koa'
import type { GetTaskListParams } from '@/types'
import { validateDate } from '@/utils/time'

// Verify user submitted params for getting task list
export const verifyGetTaskListParams = async (ctx: Context, next: Next) => {
  const { time } = ctx.query as Partial<GetTaskListParams>
  if (!time || (Array.isArray(time) && !time.length)) return useThrowError(ctx, 'time_is_required')
  if (!Array.isArray(time) || time.length !== 2 || !validateDate(time[0]) || !validateDate(time[1])) return useThrowError(ctx, 'invalid_time')
  await next()
}

// Verify user submitted params for getting task item
export const verifyGetTaskItemParams = async (ctx: Context, next: Next) => {
  const { id } = ctx.params
  if (!validateDate(id)) return useThrowError(ctx, 'id_is_invalid')
  await next()
}
