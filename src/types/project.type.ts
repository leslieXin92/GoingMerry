export type ProjectStatus = 'pending' | 'doing' | 'done'

export interface Author {
  id: number
  username: string
  avatar: string
  link: string
}

export interface ProjectItem {
  id: number
  name: string
  status: ProjectStatus
  authors: Author[]
  technologyStack?: string[]
  image?: string
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
  name: string
  status: ProjectStatus
  authors: Author[]
  technologyStack?: string[]
  image?: string
  startAt?: string
  endAt?: string
}

export interface UpdateProjectParams {
  name: string
  status: ProjectStatus
  technologyStack?: string[]
  authors: Author[]
  image?: string
  startAt?: string
  endAt?: string
}
