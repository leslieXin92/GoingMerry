import { querySelect } from '@/utils'
import type { ProjectItem } from '@/types'

export const getProjectList = async () => {
  return await querySelect<ProjectItem[]>({
    table: 'projects',
    columns: ['id', 'name', 'technologyStack', 'description', 'startAt', 'status']
  })
}
