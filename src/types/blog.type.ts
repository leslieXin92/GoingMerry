export type BlogType = 'public' | 'private'

export interface CreateBlogParams {
  title: string
  content: string
  type: BlogType
}
