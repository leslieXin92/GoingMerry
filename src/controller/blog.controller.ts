import { getBlogList, getBlogItem, createBlog, updateBlog, deleteBlog } from '@/service'
import { useSuccessReturn, useThrowError, isEqual, verifyWriteList } from '@/utils'
import type { Context } from 'koa'
import type { GetBlogListParams, CreateBlogParams, UpdateBlogItemParams } from '@/types'

export const handleGetBlogList = async (ctx: Context) => {
  const { type, page } = ctx.query as unknown as GetBlogListParams
  const { user } = ctx
  if (type !== 'public' && (!user || !verifyWriteList(user.username))) return useThrowError(ctx, 'unauthorized')
  const totalBlogList = await getBlogList()
  const totalCount = totalBlogList.filter(blogItem => type ? blogItem.type === type : true).length
  const blogList = totalBlogList
    .filter(blogItem => type ? blogItem.type === type : true)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice((parseInt(page) - 1) * 10, parseInt(page) * 10)
  ctx.body = useSuccessReturn({ blogList, totalCount })
}

export const handleGetBlogItem = async (ctx: Context) => {
  const { id } = ctx.params
  const { user } = ctx
  const blogItem = await getBlogItem(id)
  if (!blogItem) return useThrowError(ctx, 'blog_not_exists')
  if (blogItem.type === 'private' && (!user || !verifyWriteList(user.username))) return useThrowError(ctx, 'unauthorized')
  ctx.body = useSuccessReturn(blogItem)
}

export const handleCreateBlog = async (ctx: Context) => {
  await createBlog(ctx.request.body as CreateBlogParams)
  ctx.body = useSuccessReturn(null, 'Create Success!')
}

export const handleUpdateBlog = async (ctx: Context) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return useThrowError(ctx, 'id_is_invalid')
  const beforeBlogItem = await getBlogItem(id)
  if (!beforeBlogItem) return useThrowError(ctx, 'blog_not_exists')
  const afterBlogItem = ctx.request.body as UpdateBlogItemParams
  if (isEqual(beforeBlogItem, afterBlogItem)) return useThrowError(ctx, 'no_change')
  await updateBlog({ ...afterBlogItem, id })
  ctx.body = useSuccessReturn(null, 'Update Success!')
}

export const handleDeleteBlog = async (ctx: Context) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return useThrowError(ctx, 'id_is_invalid')
  const blogItem = await getBlogItem(id)
  if (!blogItem) return useThrowError(ctx, 'blog_not_exists')
  await deleteBlog(id)
  ctx.body = useSuccessReturn(null, 'Delete Success!')
}
