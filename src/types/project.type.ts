export type ProjectStatus = 'pending' | 'doing' | 'done'

export interface ProjectItem {
  id: number
  name: string
  technologyStack: string[]
  description: string
  startAt: string
  status: ProjectStatus
  createdAt: string
  createdBy: string
  doneAt: string
  doneBy: string
}
