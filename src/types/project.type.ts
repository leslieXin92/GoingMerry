export type ProjectStatus = 'pending' | 'doing' | 'done'

export interface ProjectItem {
  id: number
  name: string
  technologyStack: string[]
  description: string
  status: ProjectStatus
  startAt: string
  doneAt: string
  doneBy: number
  createdAt: string
  createdBy: number
  updatedAt: string
  updateBy: number
}

export interface CreateProjectParams {
  name: string
  technologyStack?: string[]
  description?: string
  status?: ProjectStatus
  startAt?: string
  doneAt?: string
}

export interface UpdateProjectItemParams {
  name: string
  technologyStack?: string[]
  description?: string
  status?: ProjectStatus
  startAt?: string
  doneAt?: string
}
