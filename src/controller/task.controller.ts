import { getTaskList } from '@/service'
import { useSuccessReturn } from '@/utils'
import type { Context } from 'koa'
import type { GetTaskListParams } from '@/types'

export const handleGetTaskList = async (ctx: Context) => {
  const { time } = ctx.query as unknown as GetTaskListParams
  const taskList = await getTaskList(time)
  ctx.body = useSuccessReturn(taskList)
}
