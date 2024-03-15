export type VisibilityType = 'public' | 'private'

export interface BlogItem {
  id: number
  visibility: VisibilityType
  title: string
  content: string
  createdAt: string
}

export interface GetBlogListParams {
  page: string
  visibility: VisibilityType | ''
}

export interface CreateBlogParams {
  title: string
  content: string
  visibility: VisibilityType
}

export interface UpdateBlogItemParams {
  title: string
  content: string
  visibility: VisibilityType
}
