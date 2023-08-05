import Router from 'koa-router'
import {
  checkAuth,
  verifyAuth,
  verifyGetProjectListParams,
  verifyGetProjectDetailParams,
  verifyCreateProjectParams
} from '@/middleware'
import {
  handleGetProjectList,
  handleGetProjectDetail,
  handleCreateProject,
  handleUpdateProjectItem,
  handleDeleteProjectItem
} from '@/controller'

const projectRouter = new Router({ prefix: '/project' })

projectRouter.get('/', verifyGetProjectListParams, checkAuth, handleGetProjectList)
projectRouter.get('/:id', verifyGetProjectDetailParams, checkAuth, handleGetProjectDetail)
projectRouter.post('/', verifyAuth, verifyCreateProjectParams, handleCreateProject)
projectRouter.patch('/:id', verifyAuth, verifyCreateProjectParams, handleUpdateProjectItem)
projectRouter.delete('/:id', verifyAuth, handleDeleteProjectItem)

export default projectRouter
