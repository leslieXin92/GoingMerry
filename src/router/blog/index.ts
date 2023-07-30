import Router from 'koa-router'
import {
  checkAuth,
  verifyAuth,
  verifyCreateBlogParams,
  verifyGetBlogDetailParams,
  verifyGetBlogListParams
} from '@/middleware'
import { handleCreateBlog, handleGetBlogList, handleGetBlogItem } from '@/controller'

const blogRouter = new Router({ prefix: '/blog' })

blogRouter.post('/', verifyAuth, verifyCreateBlogParams, handleCreateBlog)
blogRouter.get('/', verifyGetBlogListParams, checkAuth, handleGetBlogList)
blogRouter.get('/:id', verifyGetBlogDetailParams, checkAuth, handleGetBlogItem)
blogRouter.patch('/:id', async (ctx) => ctx.body = 'update blog')
blogRouter.delete('/:id', async (ctx) => ctx.body = 'delete blog')

export default blogRouter
