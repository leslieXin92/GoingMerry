import { execute } from '@/app/database'
import type { TaskItem, TaskStatus, CreateTaskParams, UpdateTaskParams } from '@/types'

export const getTaskList = async (time: string[], status?: TaskStatus) => {
  const statement = status
    ? `
      SELECT id, title, category, status, deadline, doneAt, createdAt
      FROM tasks
      WHERE doneAt >= ?
      AND doneAt <= ?
      AND status = ?
      ORDER BY createdAt esc;
    `
    : `
      SELECT id, category, title, status, doneAt
      FROM tasks
      WHERE doneAt >= ?
      AND doneAt <= ?
      ORDER BY createdAt esc;
    `
  const [taskList] = await execute(statement, [time[0], time[1]]) as unknown as TaskItem[][]
  return taskList
}

export const getTaskItem = async (time: string) => {
  const statement = `
    SELECT id, category, title, status, doneAt
    FROM tasks
    WHERE doneAt >= ? AND doneAt <= ?;
  `
  const [taskItem] = await execute(statement, [time]) as unknown as TaskItem[][]
  return taskItem[0]
}

export const createTask = async (params: CreateTaskParams) => {
  const { title, category, deadline = null } = params
  const statement = `INSERT INTO tasks (title, category, deadline) VALUES (?, ?, ?);`
  await execute(statement, [title, category, deadline])
}

export const updateTask = async (params: UpdateTaskParams & { id: number }) => {
  const { id, title, category, deadline = null, status = 'pending' } = params
  const statement = `
    UPDATE tasks
    SET title = ?, category = ?, deadline = ?, status = ?
    WHERE id = ?;
  `
  await execute(statement, [title, category, deadline, status, id])
}
