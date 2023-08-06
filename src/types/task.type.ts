export type TaskStatus = 'pending' | 'doing' | 'done' | 'canceled'

export interface TaskItem {
  id: number
  title: string
  category: string
  status: TaskStatus
  deadline?: string
  doneAt?: string
  canceledAt?: string
  createAt: string
  updateAt: string
}

export interface GetTaskListParams {
  time: string[]
}

export interface CreateTaskParams {
  title: string
  category: string
  deadline?: string
}
