import { querySelect } from '@/utils'
import { ProjectItem } from '@/types'

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
