export type TaskStatus = 'pending' | 'doing' | 'done' | 'canceled'

export interface TaskItem {
  id: number
  category: string
  title: string
  status: TaskStatus
  deadline?: string
  createAt: string
  updateAt: string
  doneAt?: string
  canceledAt?: string
}

export interface GetTaskListParams {
  time: string[]
}
