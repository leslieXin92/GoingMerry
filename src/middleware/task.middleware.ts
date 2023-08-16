import { useThrowError, validateDate } from '@/utils'
import type { Context, Next } from 'koa'
import type { GetTaskListParams, CreateTaskParams } from '@/types'

// Verify user submitted params for getting task list
export const verifyGetTaskListParams = async (ctx: Context, next: Next) => {
  const { time, status } = ctx.query as Partial<GetTaskListParams>
  if (!time || (Array.isArray(time) && !time.length)) return useThrowError(ctx, 'time_is_required')
  if (!Array.isArray(time) || time.length !== 2 || !validateDate(time[0]) || !validateDate(time[1])) return useThrowError(ctx, 'invalid_time')
  if (status && !['pending', 'doing', 'done', 'canceled'].includes(status)) return useThrowError(ctx, 'status_is_invalid')
  await next()
}

// Verify user submitted params for getting task item
export const verifyGetTaskItemParams = async (ctx: Context, next: Next) => {
  const { id } = ctx.params
  if (!validateDate(id)) return useThrowError(ctx, 'id_is_invalid')
  await next()
}

// Verify user submitted params for creating task
export const verifyCreateTaskParams = async (ctx: Context, next: Next) => {
  const { title, category, deadline } = ctx.request.body as CreateTaskParams
  if (!title || !category) return useThrowError(ctx, 'title_category_is_required')
  if (deadline && !validateDate(deadline)) return useThrowError(ctx, 'invalid_time')
  await next()
}
