export type BlogType = 'public' | 'private'

export interface BlogItem {
  id: number
  type: BlogType
  title: string
  content: string
  createdAt: string
}

export interface CreateBlogParams {
  title: string
  content: string
  type: BlogType
}

export interface GetBlogListParams {
  page: string
  type: BlogType
}

export interface UpdateBlogItemParams {
  title: string
  content: string
  type: BlogType
}
