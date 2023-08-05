import Router from 'koa-router'
import {
  verifyAuth,
  verifyGetProjectListParams,
  verifyGetProjectDetailParams,
  verifyCreateProjectParams
} from '@/middleware'
import {
  handleGetProjectList,
  handleGetProjectDetail,
  handleCreateProject,
  handleUpdateProject,
  handleDeleteProject
} from '@/controller'

const projectRouter = new Router({ prefix: '/project' })

projectRouter.get('/', verifyGetProjectListParams, handleGetProjectList)
projectRouter.get('/:id', verifyGetProjectDetailParams, handleGetProjectDetail)
projectRouter.post('/', verifyAuth, verifyCreateProjectParams, handleCreateProject)
projectRouter.patch('/:id', verifyAuth, verifyCreateProjectParams, handleUpdateProject)
projectRouter.delete('/:id', verifyAuth, handleDeleteProject)

export default projectRouter
