import { throwError } from '@/utils'
import type { Context, Next } from 'koa'
import type { CreateBlogParams, GetBlogListParams } from '@/types'

/**
 * Verify user submitted params for getting blog list
 */
export const verifyGetBlogListParams = async (ctx: Context, next: Next) => {
  const { page, visibility } = ctx.query as Partial<GetBlogListParams>
  if (!page) return throwError(ctx, 'Page Cannot Be Empty!', 400)
  if (isNaN(parseInt(page))) return throwError(ctx, 'Page Is Invalid!', 400)
  if (visibility && !['public', 'private'].includes(visibility)) return throwError(ctx, 'Visibility Is Invalid!', 400)
  await next()
}

/**
 * Verify user submitted params for getting blog details
 */
export const verifyGetBlogItemParams = async (ctx: Context, next: Next) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return throwError(ctx, 'Id Is Invalid!', 400)
  await next()
}

/**
 * Verify user submitted params for creating a blog
 */
export const verifyCreateBlogParams = async (ctx: Context, next: Next) => {
  const { title, content, visibility } = ctx.request.body as Partial<CreateBlogParams>
  if (!title) return throwError(ctx, 'Title Cannot Be Empty!', 400)
  if (!content) return throwError(ctx, 'Content Cannot Be Empty!', 400)
  if (!visibility) return throwError(ctx, 'Visibility Cannot Be Empty!', 400)
  if (!['public', 'private'].includes(visibility)) return throwError(ctx, 'Visibility Is Invalid!', 400)
  await next()
}
