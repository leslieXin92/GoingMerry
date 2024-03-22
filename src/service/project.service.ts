import { queryDelete, queryInsert, querySelect, queryUpdate } from '@/utils'
import { CreateProjectParams, ProjectItem, UpdateProjectItemParams, UserInfo } from '@/types'

export const getProjectList = async () => {
  return await querySelect<ProjectItem[]>({
    table: 'projects',
    columns: ['id', 'name', 'technologyStack', 'description', 'status']
  })
}

export const getProjectItem = async (id: number) => {
  const projectList = await querySelect<ProjectItem[]>({
    table: 'projects',
    where: { id },
    columns: ['id', 'name', 'technologyStack', 'description', 'startAt', 'status', 'createdAt']
  })
  return projectList.length ? projectList[0] : null
}

export const createProject = async (params: CreateProjectParams, user: Omit<UserInfo, 'password'>) => {
  const { name, technologyStack, description, status = 'pending', startAt, doneAt } = params
  const startBy = status !== 'pending' ? user.id : null
  const doneBy = status === 'done' ? user.id : null
  await queryInsert({
    table: 'projects',
    data: {
      name,
      technologyStack,
      description,
      status,
      startAt,
      startBy,
      doneAt,
      doneBy,
      createdBy: user.id,
      updatedBy: user.id
    }
  })
}

export const updateProject = async (
  params: UpdateProjectItemParams & { id: number },
  user: Omit<UserInfo, 'password'>
) => {
  const { id, name, technologyStack, description, status, startAt, doneAt } = params

  let update: Record<string, any> = {
    name,
    technologyStack,
    description,
    status,
    updatedBy: user.id
  }

  switch (status) {
    case 'pending':
      update.startAt = null
      update.doneAt = null
      break

    case 'doing':
      update.startAt = startAt ?? new Date()
      update.doneAt = doneAt
      break

    case 'done':
      update.startAt = startAt ?? new Date()
      update.doneAt = doneAt ?? new Date()
      break
  }

  return await queryUpdate({
    table: 'projects',
    where: { id },
    update
  })
}

export const deleteProject = async (id: number) => {
  await queryDelete({
    table: 'projects',
    where: { id }
  })
}
