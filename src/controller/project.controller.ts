import { getProjectList, getProjectItem, createProject } from '@/service'
import { dateFormat, throwError, useSuccessReturn } from '@/utils'
import type { Context } from 'koa'
import type { CreateProjectParams } from '@/types'

export const handleGetProjectList = async (ctx: Context) => {
  const projectList = await getProjectList()
  ctx.body = useSuccessReturn(projectList)
}

export const handleGetProjectItem = async (ctx: Context) => {
  const { id } = ctx.params
  const projectItem = await getProjectItem(id)
  if (!projectItem) return throwError(ctx, 'Project Dose Not Exists!', 400)
  Object.entries(projectItem).forEach(([key, value]) => {
    if (key.endsWith('At') && value) (projectItem as any)[key as keyof typeof projectItem] = dateFormat(value)
  })
  ctx.body = useSuccessReturn(projectItem)
}

export const handleCreateProject = async (ctx: Context) => {
  await createProject(ctx.request.body as CreateProjectParams, ctx.user)
  ctx.body = useSuccessReturn(null, 'Create success!')
}
