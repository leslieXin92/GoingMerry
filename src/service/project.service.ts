import { querySelect, queryInsert, queryUpdate, queryDelete } from '@/utils'
import type { ProjectItem, CreateProjectParams, UpdateProjectParams } from '@/types'

export const getProjectList = async () => {
  return await querySelect<ProjectItem[]>({
    table: 'projects',
    columns: ['id', 'title', 'status', 'technologyStack', 'image', 'startAt', 'endAt']
  })
}

export const getProjectItem = async (id: string) => {
  const projects = await querySelect<ProjectItem[]>({
    table: 'projects',
    where: { id },
    columns: ['id', 'title', 'status', 'technologyStack', 'introduction', 'image', 'startAt', 'endAt']
  })
  return projects.length ? projects[0] : null
}

export const createProject = async (params: CreateProjectParams) => {
  const {
    title,
    status,
    technologyStack = [],
    introduction = null,
    image = null,
    startAt = null,
    endAt = null
  } = params
  await queryInsert({
    table: 'projects',
    data: { title, status, technologyStack, introduction, image, startAt, endAt }
  })
}

export const updateProject = async (params: UpdateProjectParams & { id: number }) => {
  const {
    id,
    title,
    status,
    technologyStack = [],
    introduction = null,
    image = null,
    startAt = null,
    endAt = null
  } = params
  await queryUpdate({
    table: 'projects',
    where: { id },
    update: { title, status, technologyStack, introduction, image, startAt, endAt }
  })
}

export const deleteProject = async (id: string) => {
  await queryDelete({
    table: 'projects',
    where: { id }
  })
}
