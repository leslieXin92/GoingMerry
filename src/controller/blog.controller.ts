import { getBlogList, getBlogItem, createBlog, updateBlog, deleteBlog } from '@/service'
import { useSuccessReturn, useThrowError, isEqual } from '@/utils'
import type { Context } from 'koa'
import type { getBlogListParams, CreateBlogParams, UpdateBlogItemParams } from '@/types'

export const handleGetBlogList = async (ctx: Context) => {
  const { type, page } = ctx.query as unknown as getBlogListParams
  if (type === 'public' && ctx.user) return useThrowError(ctx, 'network_error')
  if (type === 'private' && !ctx.user) return useThrowError(ctx, 'unauthorized')
  const { blogList, total } = await getBlogList(page, type)
  ctx.body = useSuccessReturn({ blogList, total })
}

export const handleGetBlogItem = async (ctx: Context) => {
  const { id } = ctx.params
  const blogItem = await getBlogItem(id as string)
  if (!blogItem) return useThrowError(ctx, 'blog_not_exists')
  if (blogItem.type === 'private' && !ctx.user) return useThrowError(ctx, 'unauthorized')
  ctx.body = useSuccessReturn(blogItem)
}

export const handleCreateBlog = async (ctx: Context) => {
  const params = {
    ...ctx.request.body as CreateBlogParams,
    author: ctx.user.id
  }
  await createBlog(params)
  ctx.body = useSuccessReturn(null, 'Create Success!')
}

export const handleUpdateBlogItem = async (ctx: Context) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return useThrowError(ctx, 'id_is_invalid')
  const beforeBlogItem = await getBlogItem(id)
  if (!beforeBlogItem) return useThrowError(ctx, 'blog_not_exists')
  if (beforeBlogItem.author !== ctx.user.id && ctx.user.username !== 'leslie') return useThrowError(ctx, 'unauthorized')
  const afterBlogItem = ctx.request.body as UpdateBlogItemParams
  if (isEqual(beforeBlogItem, afterBlogItem)) return useThrowError(ctx, 'no_change')
  await updateBlog({ ...afterBlogItem, id })
  ctx.body = useSuccessReturn(null, 'Update Success!')
}

export const handleDeleteBlogItem = async (ctx: Context) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return useThrowError(ctx, 'id_is_invalid')
  const blogItem = await getBlogItem(id)
  if (!blogItem) return useThrowError(ctx, 'blog_not_exists')
  if (blogItem.author !== ctx.user.id && ctx.user.username !== 'leslie') return useThrowError(ctx, 'unauthorized')
  await deleteBlog(id)
  ctx.body = useSuccessReturn(null, 'Delete Success!')
}
