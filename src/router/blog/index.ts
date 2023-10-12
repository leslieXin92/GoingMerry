import Router from 'koa-router'
import {
  checkAuth,
  verifyAuth,
  verifyCreateBlogParams,
  verifyGetBlogItemParams,
  verifyGetBlogListParams
} from '@/middleware'
import {
  handleCreateBlog,
  handleGetBlogList,
  handleGetBlogItem,
  handleUpdateBlog,
  handleDeleteBlog
} from '@/controller'

const blogRouter = new Router({ prefix: '/blog' })

blogRouter.get('/', verifyGetBlogListParams, checkAuth, handleGetBlogList)
blogRouter.get('/:id', verifyGetBlogItemParams, checkAuth, handleGetBlogItem)
blogRouter.post('/', verifyAuth, verifyCreateBlogParams, handleCreateBlog)
blogRouter.patch('/:id', verifyAuth, verifyCreateBlogParams, handleUpdateBlog)
blogRouter.delete('/:id', verifyAuth, handleDeleteBlog)

export default blogRouter
