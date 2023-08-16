import { getTaskList, getTaskItem, createTask, updateTask } from '@/service'
import { isEqual, useSuccessReturn, useThrowError, validateDate } from '@/utils'
import type { Context } from 'koa'
import type { GetTaskListParams, CreateTaskParams, UpdateTaskParams } from '@/types'

export const handleGetTaskList = async (ctx: Context) => {
  const { time, status = undefined } = ctx.query as unknown as GetTaskListParams
  const taskList = await getTaskList(time, status)
  ctx.body = useSuccessReturn(taskList)
}

export const handleGetTaskItem = async (ctx: Context) => {
  const { id } = ctx.params
  const taskItem = await getTaskItem(id)
  ctx.body = useSuccessReturn(taskItem)
}

export const handleCreateTask = async (ctx: Context) => {
  const { title, category, deadline } = ctx.request.body as CreateTaskParams
  await createTask({ title, category, deadline })
  ctx.body = useSuccessReturn(null, 'Create Success!')
}

export const handleUpdateTask = async (ctx: Context) => {
  const { id } = ctx.params
  if (!validateDate(id)) return useThrowError(ctx, 'id_is_invalid')
  const beforeTaskItem = await getTaskItem(id)
  if (!beforeTaskItem) return useThrowError(ctx, 'task_not_exists')
  if (ctx.user.username !== 'leslie') return useThrowError(ctx, 'unauthorized')
  const afterTaskItem = ctx.request.body as UpdateTaskParams
  if (isEqual(beforeTaskItem, afterTaskItem)) return useThrowError(ctx, 'no_change')
  await updateTask({ id, ...ctx.request.body as UpdateTaskParams })
  ctx.body = useSuccessReturn(null, 'Update Success!')
}
