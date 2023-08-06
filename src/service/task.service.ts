import execute from '@/app/database'
import type { TaskItem } from '@/types'

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
  return taskList[0]
}
