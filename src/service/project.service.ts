import { queryInsert, querySelect } from '@/utils'
import { CreateProjectParams, ProjectItem, UserInfo } from '@/types'

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
