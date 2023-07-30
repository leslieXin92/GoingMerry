import Router from 'koa-router'
import { checkAuth, verifyAuth, verifyCreateBlogParams, verifyGetBlogListParams } from '@/middleware'
import { handleCreateBlog, handleGetBlogList } from '@/controller'

const blogRouter = new Router({ prefix: '/blog' })

blogRouter.post('/', verifyAuth, verifyCreateBlogParams, handleCreateBlog)
blogRouter.get('/', verifyGetBlogListParams ,checkAuth, handleGetBlogList)
blogRouter.get('/:id', async (ctx) => ctx.body = 'get blog detail')
blogRouter.patch('/:id', async (ctx) => ctx.body = 'update blog')
blogRouter.delete('/:id', async (ctx) => ctx.body = 'delete blog')

export default blogRouter
