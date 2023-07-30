import { useThrowError } from '@/utils'
import type { Context, Next } from 'koa'

// Verify user submitted blog info
export const verifyBlogInfo = async (ctx: Context, next: Next) => {
  // @ts-ignore TODO - type
  const { title, content, type } = ctx.request.body
  if (!title || !content || !type) return useThrowError(ctx, 'title_content_type_is_required')
  if (!['public', 'private'].includes(type)) return useThrowError(ctx, 'type_is_invalid')
  await next()
}
