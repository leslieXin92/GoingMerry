import { getProjectList } from '@/service'
import { useSuccessReturn } from '@/utils'
import type { Context } from 'koa'

export const handleGetProjectList = async (ctx: Context) => {
  const projectList = await getProjectList()
  ctx.body = useSuccessReturn(projectList)
}
