import { getProjectList, getProjectItem, createProject, updateProject, deleteProject } from '@/service'
import { isEqual, useSuccessReturn, useThrowError } from '@/utils'
import type { Context } from 'koa'
import type { GetProjectListParams, CreateProjectParams, UpdateProjectParams } from '@/types'

export const handleGetProjectList = async (ctx: Context) => {
  const { page, status } = ctx.query as unknown as GetProjectListParams
  const totalProjectList = await getProjectList()
  const totalCount = totalProjectList.filter(project => status ? project.status === status : true).length
  const projectList = totalProjectList
    .filter(project => status ? project.status === status : true)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice((parseInt(page) - 1) * 10, parseInt(page) * 10)
  ctx.body = useSuccessReturn({ projectList, totalCount })
}

export const handleGetProjectDetail = async (ctx: Context) => {
  const { id } = ctx.params
  const projectItem = await getProjectItem(id)
  if (!projectItem) return useThrowError(ctx, 'project_not_exists')
  ctx.body = useSuccessReturn(projectItem)
}

export const handleCreateProject = async (ctx: Context) => {
  await createProject(ctx.request.body as CreateProjectParams)
  ctx.body = useSuccessReturn(null, 'Create Success!')
}

export const handleUpdateProject = async (ctx: Context) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return useThrowError(ctx, 'id_is_invalid')
  const beforeProjectItem = await getProjectItem(id)
  if (!beforeProjectItem) return useThrowError(ctx, 'project_not_exists')
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
  await deleteProject(id)
  ctx.body = useSuccessReturn(null, 'Delete Success!')
}
