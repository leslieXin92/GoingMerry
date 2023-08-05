export type ProjectStatus = 'pending' | 'doing' | 'done'

export interface ProjectItem {
  id: number
  title: string
  status: ProjectStatus
  image?: string
  technologyStack?: string[]
  introduction?: string
  startAt?: string
  endAt?: string
  createAt: string
  updateAt: string
}

export interface GetProjectListParams {
  page: string
  status?: ProjectStatus
}

export interface CreateProjectParams {
  title: string
  status: ProjectStatus
  image?: string
  technologyStack?: string[]
  introduction?: string
  startAt?: string
  endAt?: string
}

export interface UpdateProjectParams {
  title: string
  status: ProjectStatus
  image?: string
  technologyStack?: string[]
  introduction?: string
  startAt?: string
  endAt?: string
}
