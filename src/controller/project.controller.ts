import { getProjectList, getProjectItem, createProject, updateProject, deleteProject } from '@/service'
import { isEqual, useSuccessReturn, useThrowError } from '@/utils'
import type { Context } from 'koa'
import type { GetProjectListParams, CreateProjectParams, UpdateProjectParams } from '@/types'

export const handleGetProjectList = async (ctx: Context) => {
  const { projectList, total } = await getProjectList(ctx.query as Partial<GetProjectListParams>)
  ctx.body = useSuccessReturn({ projectList, total })
}

export const handleGetProjectDetail = async (ctx: Context) => {
  const { id } = ctx.params
  const projectItem = await getProjectItem(id)
  if (!projectItem) return useThrowError(ctx, 'project_not_exists')
  ctx.body = useSuccessReturn(projectItem)
}

export const handleCreateProject = async (ctx: Context) => {
  await createProject({ ...ctx.request.body as CreateProjectParams })
  ctx.body = useSuccessReturn(null, 'Create Success!')
}

export const handleUpdateProject = async (ctx: Context) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return useThrowError(ctx, 'id_is_invalid')
  const beforeProjectItem = await getProjectItem(id)
  if (!beforeProjectItem) return useThrowError(ctx, 'project_not_exists')
  if (ctx.user.username !== 'leslie') return useThrowError(ctx, 'unauthorized')
  const afterProjectItem = ctx.request.body as UpdateProjectParams
  if (isEqual(beforeProjectItem, afterProjectItem)) return useThrowError(ctx, 'no_change')
  await updateProject({ ...afterProjectItem, id })
  ctx.body = useSuccessReturn(null, 'Update Success!')
}

export const handleDeleteProject = async (ctx: Context) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return useThrowError(ctx, 'id_is_invalid')
  const projectItem = await getProjectItem(id)
  if (!projectItem) return useThrowError(ctx, 'project_not_exists')
  if (ctx.user.username !== 'leslie') return useThrowError(ctx, 'unauthorized')
  await deleteProject(id)
  ctx.body = useSuccessReturn(null, 'Delete Success!')
}
