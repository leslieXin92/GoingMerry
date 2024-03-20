import Router from 'koa-router'
import { verifyGetProjectItemParams } from '@/middleware'
import { handleGetProjectList, handleGetProjectItem } from '@/controller'

const projectRouter = new Router({ prefix: '/project' })

projectRouter.get('/', handleGetProjectList)
projectRouter.get('/:id', verifyGetProjectItemParams, handleGetProjectItem)

export default projectRouter
