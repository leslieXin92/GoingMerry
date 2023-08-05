import { useThrowError } from '@/utils'
import type { Context, Next } from 'koa'
import type { CreateBlogParams, GetBlogListParams } from '@/types'

// Verify user submitted params for creating a blog
export const verifyCreateBlogParams = async (ctx: Context, next: Next) => {
  const { title, content, type } = ctx.request.body as Partial<CreateBlogParams>
  if (!title || !content || !type) return useThrowError(ctx, 'title_content_type_is_required')
  if (!['public', 'private'].includes(type)) return useThrowError(ctx, 'type_is_invalid')
  await next()
}

// Verify user submitted params for getting blog list
export const verifyGetBlogListParams = async (ctx: Context, next: Next) => {
  const { page, type } = ctx.query as Partial<GetBlogListParams>
  if (!page || !type) return useThrowError(ctx, 'page_or_type_is_required')
  if (!page) return useThrowError(ctx, 'page_or_type_is_required')
  if (isNaN(parseInt(page))) return useThrowError(ctx, 'page_is_invalid')
  if (!['public', 'private'].includes(type)) return useThrowError(ctx, 'type_is_invalid')
  await next()
}

// Verify user submitted params for getting blog detail
export const verifyGetBlogDetailParams = async (ctx: Context, next: Next) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return useThrowError(ctx, 'id_is_invalid')
  await next()
}