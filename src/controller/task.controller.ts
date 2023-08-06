import { getTaskList, getTaskItem } from '@/service'
import { useSuccessReturn } from '@/utils'
import type { Context } from 'koa'
import type { GetTaskListParams } from '@/types'

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
