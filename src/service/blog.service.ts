import { querySelect, queryInsert, queryUpdate, queryDelete } from '@/utils'
import type { BlogItem, CreateBlogParams, UpdateBlogItemParams, UserInfo } from '@/types'

export const getBlogList = async () => {
  return await querySelect<Omit<BlogItem, 'content'>[]>({
    table: 'blogs',
    columns: ['id', 'visibility', 'title', 'createdAt']
  })
}

export const getBlogItem = async (id: number) => {
  const blogs = await querySelect<BlogItem[]>({
    table: 'blogs',
    where: { id },
    columns: ['id', 'visibility', 'title', 'content', 'createdAt']
  })
  return blogs.length ? blogs[0] : null
}

export const createBlog = async (params: CreateBlogParams, user: Omit<UserInfo, 'password'>) => {
  const { title, content, visibility } = params
  await queryInsert({
    table: 'blogs',
    data: {
      title,
      content,
      visibility,
      createdBy: user.id,
      updatedBy: user.id
    }
  })
}

export const updateBlog = async (params: UpdateBlogItemParams & { id: string }, user: Omit<UserInfo, 'password'>) => {
  const { id, title, content, visibility } = params
  await queryUpdate({
    table: 'blogs',
    where: { id },
    update: {
      title,
      content,
      visibility,
      updatedBy: user.id
    }
  })
}

export const deleteBlog = async (id: string) => {
  await queryDelete({
    table: 'blogs',
    where: { id }
  })
}
