import execute from '@/app/database'
import type { TaskItem, CreateTaskParams } from '@/types'

export const getTaskList = async (time: string[]) => {
  const startTime = new Date(time[0])
  const endTime = new Date(time[1])
  const statement = `
    SELECT id, doneAt
    FROM tasks
    WHERE doneAt >= ? AND doneAt <= ?
    ORDER BY doneAt esc;
  `
  const [taskList] = await execute(statement, [startTime, endTime]) as unknown as TaskItem[][]
  return taskList
}

export const getTaskItem = async (id: string) => {
  const statement = `
    SELECT id, category, title, status, doneAt
    FROM tasks
    WHERE doneAt >= ? AND doneAt <= ?;
  `
  const [taskItem] = await execute(statement, [id]) as unknown as TaskItem[][]
  return taskItem[0]
}

export const createTask = async (params: CreateTaskParams) => {
  const { title, category, deadline = null } = params
  const statement = `INSERT INTO tasks (title, category, deadline) VALUES (?, ?, ?);`
  await execute(statement, [title, category, deadline])
}
