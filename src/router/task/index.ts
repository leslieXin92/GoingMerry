import Router from 'koa-router'
import { verifyGetTaskListParams, verifyGetTaskItemParams } from '@/middleware'
import { handleGetTaskList, handleGetTaskItem } from '@/controller'

const taskRouter = new Router({ prefix: '/task' })

taskRouter.get('/', verifyGetTaskListParams, handleGetTaskList)
taskRouter.get('/:id', verifyGetTaskItemParams, handleGetTaskItem)

export default taskRouter
