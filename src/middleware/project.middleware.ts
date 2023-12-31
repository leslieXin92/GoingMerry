import { useThrowError } from '@/utils'
import type { Context, Next } from 'koa'
import type { GetProjectListParams, CreateProjectParams } from '@/types'

// Verify user submitted params for getting project list
export const verifyGetProjectListParams = async (ctx: Context, next: Next) => {
  const { page, status } = ctx.query as Partial<GetProjectListParams>
  if (!page) return useThrowError(ctx, 'page_is_required')
  if (isNaN(parseInt(page))) return useThrowError(ctx, 'page_is_invalid')
  if (status && !['pending', 'doing', 'done'].includes(status)) return useThrowError(ctx, 'status_is_invalid')
  await next()
}

// Verify user submitted params for getting project detail
export const verifyGetProjectDetailParams = async (ctx: Context, next: Next) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return useThrowError(ctx, 'id_is_invalid')
  await next()
}

// Verify user submitted params for creating project
export const verifyCreateProjectParams = async (ctx: Context, next: Next) => {
  const { title, status } = ctx.request.body as Partial<CreateProjectParams>
  if (!title || !status) return useThrowError(ctx, 'title_or_status_is_required')
  if (!['pending', 'doing', 'done'].includes(status)) return useThrowError(ctx, 'status_is_invalid')
  await next()
}
