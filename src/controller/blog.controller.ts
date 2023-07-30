import { createBlog, getBlogList } from '@/service'
import { useSuccessReturn, useThrowError } from '@/utils'
import type { Context } from 'koa'
import type { BlogType, CreateBlogParams } from '@/types'

export const handleCreateBlog = async (ctx: Context) => {
  const params = {
    ...ctx.request.body as CreateBlogParams,
    author: ctx.user.id
  }
  await createBlog(params)
  ctx.body = useSuccessReturn(null, 'Create Success!')
}

export const handleGetBlogList = async (ctx: Context) => {
  const { type, page } = ctx.query
  if (type === 'public' && ctx.user) return useThrowError(ctx, 'network_error')
  if (type === 'private' && !ctx.user) return useThrowError(ctx, 'unauthorized')
  const { blogList, total } = await getBlogList(page as string, type as BlogType) // TODO - type
  ctx.body = useSuccessReturn({ blogList, total })
}
