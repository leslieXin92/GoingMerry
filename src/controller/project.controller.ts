import { getProjectList, getProjectItem } from '@/service'
import { throwError, useSuccessReturn } from '@/utils'
import type { Context } from 'koa'

export const handleGetProjectList = async (ctx: Context) => {
  const projectList = await getProjectList()
  ctx.body = useSuccessReturn(projectList)
}

export const handleGetProjectItem = async (ctx: Context) => {
  const { id } = ctx.params
  const projectItem = await getProjectItem(id)
  if (!projectItem) return throwError(ctx, 'Project Dose Not Exists!', 400)
  ctx.body = useSuccessReturn(projectItem)
}
