export type BlogType = 'public' | 'private'

export interface BlogItem {
  id: number
  author: number
  type: BlogType
  title: string
  content: string
  createAt: string
}

export interface CreateBlogParams {
  title: string
  content: string
  type: BlogType
}

export interface getBlogListParams {
  page: string
  type: BlogType
}

export interface UpdateBlogItemParams {
  title: string
  content: string
  type: BlogType
}
