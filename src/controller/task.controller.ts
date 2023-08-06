import { getTaskList, getTaskItem, createTask } from '@/service'
import { useSuccessReturn } from '@/utils'
import type { Context } from 'koa'
import type { GetTaskListParams, CreateTaskParams } from '@/types'

export const handleGetTaskList = async (ctx: Context) => {
  const { time } = ctx.query as unknown as GetTaskListParams
  const taskList = await getTaskList(time)
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
