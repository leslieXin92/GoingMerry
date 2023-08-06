import Router from 'koa-router'
import { verifyGetTaskListParams } from '@/middleware'
import { handleGetTaskList } from '@/controller'

const taskRouter = new Router({ prefix: '/task' })

taskRouter.get('/', verifyGetTaskListParams, handleGetTaskList)

export default taskRouter
