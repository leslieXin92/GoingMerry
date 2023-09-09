import { querySelect, queryInsert, queryUpdate, queryDelete } from '@/utils'
import type { BlogItem, CreateBlogParams, UpdateBlogItemParams } from '@/types'

export const getBlogList = async () => {
  return await querySelect<Omit<BlogItem, 'content'>[]>({
    table: 'blogs',
    columns: ['id', 'type', 'title', 'createdAt']
  })
}

export const getBlogItem = async (id: string) => {
  const blogs = await querySelect<BlogItem[]>({
    table: 'blogs',
    where: { id },
    columns: ['id', 'type', 'title', 'content', 'createdAt']
  })
  return blogs.length ? blogs[0] : null
}

export const createBlog = async (params: CreateBlogParams) => {
  const { title, content, type } = params
  await queryInsert({
    table: 'blogs',
    data: { title, content, type }
  })
}

export const updateBlog = async (params: UpdateBlogItemParams & { id: string }) => {
  const { id, title, content, type } = params
  await queryUpdate({
    table: 'blogs',
    where: { id },
    update: { title, content, type }
  })
}

export const deleteBlog = async (id: string) => {
  await queryDelete({
    table: 'blogs',
    where: { id }
  })
}
