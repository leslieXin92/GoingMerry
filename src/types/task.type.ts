export type TaskStatus = 'pending' | 'doing' | 'done' | 'canceled'

export interface TaskItem {
  id: number
  title: string
  category: string
  status: TaskStatus
  deadline?: string
  doneAt?: string
  canceledAt?: string
  createdAt: string
  updatedAt: string
}

export interface GetTaskListParams {
  time: string[]
  status?: TaskStatus
}

export interface CreateTaskParams {
  title: string
  category: string
  deadline?: string
}

export interface UpdateTaskParams {
  title: string
  category: string
  deadline?: string
  status?: TaskStatus
}
