import Router from 'koa-router'
import {
  verifyAuth,
  verifyGetTaskListParams,
  verifyGetTaskItemParams,
  verifyCreateTaskParams
} from '@/middleware'
import {
  handleGetTaskList,
  handleGetTaskItem,
  handleCreateTask,
  handleUpdateTask
} from '@/controller'

const taskRouter = new Router({ prefix: '/task' })

taskRouter.get('/', verifyGetTaskListParams, handleGetTaskList)
taskRouter.get('/:id', verifyGetTaskItemParams, handleGetTaskItem)
taskRouter.post('/', verifyAuth, verifyCreateTaskParams, handleCreateTask)
taskRouter.patch('/:id', verifyAuth, verifyCreateTaskParams, handleUpdateTask)

export default taskRouter
