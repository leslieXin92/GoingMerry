import Router from 'koa-router'
import { verifyGetTaskListParams, verifyGetTaskItemParams, verifyCreateTaskParams } from '@/middleware'
import { handleGetTaskList, handleGetTaskItem, handleCreateTask } from '@/controller'

const taskRouter = new Router({ prefix: '/task' })

taskRouter.get('/', verifyGetTaskListParams, handleGetTaskList)
taskRouter.get('/:id', verifyGetTaskItemParams, handleGetTaskItem)
taskRouter.post('/', verifyCreateTaskParams, handleCreateTask)

export default taskRouter
