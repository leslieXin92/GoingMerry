import { getBlogList, getBlogItem, createBlog, updateBlog, deleteBlog } from '@/service'
import { useSuccessReturn, throwError, isEqual, verifyWriteList } from '@/utils'
import type { Context } from 'koa'
import type { GetBlogListParams, CreateBlogParams, UpdateBlogItemParams } from '@/types'

export const handleGetBlogList = async (ctx: Context) => {
  const { type, page } = ctx.query as unknown as GetBlogListParams
  const { user } = ctx
  if (type !== 'public' && (!user || !verifyWriteList(user.username))) return throwError(ctx, 'Unauthorized!', 401)
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
  if (!blogItem) return throwError(ctx, 'Blog Dose Not Exists!', 400)
  if (blogItem.type === 'private' && (!user || !verifyWriteList(user.username))) return throwError(ctx, 'Unauthorized!', 401)
  ctx.body = useSuccessReturn(blogItem)
}

export const handleCreateBlog = async (ctx: Context) => {
  await createBlog(ctx.request.body as CreateBlogParams)
  ctx.body = useSuccessReturn(null, 'Create Success!')
}

export const handleUpdateBlog = async (ctx: Context) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return throwError(ctx, 'Id Is Invalid!', 400)
  const beforeBlogItem = await getBlogItem(id)
  if (!beforeBlogItem) return throwError(ctx, 'Blog Dose Not Exists!', 400)
  const afterBlogItem = ctx.request.body as UpdateBlogItemParams
  if (isEqual(beforeBlogItem, afterBlogItem)) return throwError(ctx, 'No Change!', 400)
  await updateBlog({ ...afterBlogItem, id })
  ctx.body = useSuccessReturn(null, 'Update Success!')
}

export const handleDeleteBlog = async (ctx: Context) => {
  const { id } = ctx.params
  if (isNaN(parseInt(id))) return throwError(ctx, 'Id Is Invalid!', 400)
  try {
    const blogItem = await getBlogItem(id)
  if (!blogItem) return throwError(ctx, 'Blog Dose Not Exists!', 400)
  } catch (e) {
    console.log(e)
  }
  await deleteBlog(id)
  ctx.body = useSuccessReturn(null, 'Delete Success!')
}
