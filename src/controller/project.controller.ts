import { getProjectList, getProjectItem, createProject, updateProject, deleteProject } from '@/service'
import { dateFormat, isEqual, throwError, useSuccessReturn } from '@/utils'
import type { Context } from 'koa'
import type { CreateProjectParams, UpdateProjectItemParams } from '@/types'

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

export const handleUpdateProject = async (ctx: Context) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return throwError(ctx, 'Id Is Invalid!', 400)
  try {

    const beforeProjectItem = await getProjectItem(id)
    if (!beforeProjectItem) return throwError(ctx, 'Project Dose Not Exists!', 400)
    Object.entries(beforeProjectItem).forEach(([key, value]) => {
      if (key.endsWith('At') && value) (beforeProjectItem as any)[key as keyof typeof beforeProjectItem] = dateFormat(value)
    })
    const afterProjectItem = ctx.request.body as UpdateProjectItemParams
    if (isEqual(beforeProjectItem, afterProjectItem)) return throwError(ctx, 'No Change!', 400)
    await updateProject({ ...afterProjectItem, id }, ctx.user)
    ctx.body = useSuccessReturn(null, 'Update Success!')
  } catch (e: any) {
    console.log(e.message)
  }
}

export const handleDeleteProject = async (ctx: Context) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return throwError(ctx, 'Id Is Invalid!', 400)
  const project = await getProjectItem(id)
  if (!project) return throwError(ctx, 'Project Dose Not Exists!', 400)
  await deleteProject(id)
  ctx.body = useSuccessReturn(null, 'Delete Success!')
}
