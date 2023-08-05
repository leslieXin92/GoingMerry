import execute from '@/app/database'
import type { ProjectItem, GetProjectListParams, CreateProjectParams, UpdateProjectParams } from '@/types'

export const getProjectList = async (params: Partial<GetProjectListParams>) => {
  const { page, status = null } = params
  const getListStatement = status
    ? `
        SELECT id, title, status, technologyStack, image, startAt, endAt
        FROM projects
        WHERE status = ?
        LIMIT ?, 10;
    `
    : `
        SELECT id, title, status, image, startAt, endAt
        FROM projects
        LIMIT ?, 10;
    `
  const offset = String((Number(page) - 1) * 10)
  const [projectList] = await execute(getListStatement, [status, offset])

  const getTotalStatement = status
    ? `
        SELECT COUNT(id) AS total
        FROM projects
        WHERE status = ?;
    `
    : `
        SELECT COUNT(id) AS total
        FROM projects;
    `
  const [total] = await execute(getTotalStatement, [status]) as unknown as { total: number }[][]

  return { projectList, total: total[0].total }
}

export const getProjectItem = async (id: string) => {
  const statement = `
    SELECT id, title, status, technologyStack, introduction, image, startAt, endAt
    FROM projects
    WHERE id = ?;
  `
  const [projectItem] = await execute(statement, [id]) as unknown as ProjectItem[][]
  return projectItem[0]
}

export const createProject = async (params: CreateProjectParams) => {
  const {
    title,
    status,
    technologyStack = null,
    introduction = null,
    image = null,
    startAt = null,
    endAt = null
  } = params
  const statement = `INSERT INTO projects (title, status, technologyStack, introduction, image, startAt, endAt) VALUES (?, ?, ?, ?, ?, ?, ?);`
  await execute(statement, [title, status, technologyStack, introduction, image, startAt, endAt])
}

export const updateProject = async (params: UpdateProjectParams & { id: number }) => {
  const {
    id,
    title,
    status,
    technologyStack = null,
    introduction = null,
    image = null,
    startAt = null,
    endAt = null
  } = params
  const statement = `
    UPDATE projects
    SET title = ?, status = ?, technologyStack = ?, introduction = ?, image = ?, startAt = ?, endAt = ?
    WHERE id = ?;
  `
  await execute(statement, [title, status, technologyStack, introduction, image, startAt, endAt, id])
}

export const deleteProject = async (id: string) => {
  const statement = `
    DELETE FROM projects
    WHERE id = ?;
  `
  await execute(statement, [id])
}
