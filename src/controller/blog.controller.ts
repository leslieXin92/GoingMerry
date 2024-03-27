import { getBlogList, getBlogItem, createBlog, updateBlog, deleteBlog } from '@/service'
import { useSuccessReturn, throwError, isEqual } from '@/utils'
import type { Context } from 'koa'
import type { GetBlogListParams, CreateBlogParams, UpdateBlogItemParams } from '@/types'

export const handleGetBlogList = async (ctx: Context) => {
  try {
    const { visibility, page } = ctx.query as unknown as GetBlogListParams
    if (visibility !== 'public' && !ctx.user) return throwError(ctx, 'Unauthorized!', 401)
    const totalBlogList = await getBlogList()
    const totalCount = totalBlogList.filter(blogItem => visibility ? blogItem.visibility === visibility : true).length
    const blogList = totalBlogList
      .filter(blogItem => visibility ? blogItem.visibility === visibility : true)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice((parseInt(page) - 1) * 10, parseInt(page) * 10)
    ctx.body = useSuccessReturn({ blogList, totalCount })
  } catch (e) {
    throwError(ctx, (e as Error).message, 500)
  }
}

export const handleGetBlogItem = async (ctx: Context) => {
  try {
    const { id } = ctx.params
    const blogItem = await getBlogItem(id)
    if (!blogItem) return throwError(ctx, 'Blog Dose Not Exists!', 400)
    if (blogItem.visibility === 'private' && !ctx.user) return throwError(ctx, 'Unauthorized!', 401)
    ctx.body = useSuccessReturn(blogItem)
  } catch (e) {
    throwError(ctx, (e as Error).message, 500)
  }
}

export const handleCreateBlog = async (ctx: Context) => {
  try {
    await createBlog(ctx.request.body as CreateBlogParams, ctx.user)
    ctx.body = useSuccessReturn(null, 'Create Success!')
  } catch (e) {
    throwError(ctx, (e as Error).message, 500)
  }
}

export const handleUpdateBlog = async (ctx: Context) => {
  try {
    const { id } = ctx.params
    if (isNaN(parseInt(id))) return throwError(ctx, 'Id Is Invalid!', 400)
    const beforeBlogItem = await getBlogItem(id)
    if (!beforeBlogItem) return throwError(ctx, 'Blog Dose Not Exists!', 400)
    const afterBlogItem = ctx.request.body as UpdateBlogItemParams
    if (isEqual(beforeBlogItem, afterBlogItem)) return throwError(ctx, 'No Change!', 400)
    await updateBlog({ ...afterBlogItem, id }, ctx.user)
    ctx.body = useSuccessReturn(null, 'Update Success!')
  } catch (e) {
    throwError(ctx, (e as Error).message, 500)
  }
}

export const handleDeleteBlog = async (ctx: Context) => {
  try {
    const { id } = ctx.params
    if (isNaN(parseInt(id))) return throwError(ctx, 'Id Is Invalid!', 400)
    const blogItem = await getBlogItem(id)
    if (!blogItem) return throwError(ctx, 'Blog Dose Not Exists!', 400)
    await deleteBlog(id)
    ctx.body = useSuccessReturn(null, 'Delete Success!')
  } catch (e) {
    throwError(ctx, (e as Error).message, 500)
  }
}
