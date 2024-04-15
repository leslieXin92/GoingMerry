import Router from 'koa-router'
import {
  verifyAuth,
  verifyGetProjectItemParams,
  verifyCreateProjectParams,
  verifySuperAuth
} from '@/middleware'
import {
  handleGetProjectList,
  handleGetProjectItem,
  handleCreateProject,
  handleUpdateProject,
  handleDeleteProject
} from '@/controller'

const projectRouter = new Router({ prefix: '/project' })

projectRouter.get('/', handleGetProjectList)
projectRouter.get('/:id', verifyGetProjectItemParams, handleGetProjectItem)
projectRouter.post('/', verifyAuth, verifyCreateProjectParams, handleCreateProject)
projectRouter.patch('/:id', verifySuperAuth, verifyCreateProjectParams, handleUpdateProject)
projectRouter.delete('/:id', verifySuperAuth, handleDeleteProject)

export default projectRouter
