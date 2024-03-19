import Router from 'koa-router'
import { handleGetProjectList } from '@/controller'

const projectRouter = new Router({ prefix: '/project' })

projectRouter.get('/', handleGetProjectList)

export default projectRouter
