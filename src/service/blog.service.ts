import execute from '@/app/database'
import type { BlogItem, CreateBlogParams, UpdateBlogItemParams } from '@/types'

export const createBlog = async (params: CreateBlogParams) => {
  const { title, content, type } = params
  const statement = `INSERT INTO blogs (title, content, type) VALUES (?, ?, ?);`
  await execute(statement, [title, content, type])
}

export const getBlogList = async () => {
  const getListStatement = `
    SELECT id, type, title, createAt
    FROM blogs
  `
  const [blogList] = await execute(getListStatement, []) as unknown as Omit<BlogItem[], 'content'>[]
  return blogList
}

export const getBlogItem = async (id: string) => {
  const statement = `
    SELECT id, type, title, content, createAt
    FROM blogs
    WHERE id = ?;
  `
  const [blogItem] = await execute(statement, [id]) as unknown as BlogItem[][]
  return blogItem[0]
}

export const updateBlog = async (params: UpdateBlogItemParams & { id: string }) => {
  const { id, title, content, type } = params
  const statement = `
    UPDATE blogs
    SET title = ?, content = ?, type = ?
    WHERE id = ?;
  `
  await execute(statement, [title, content, type, id])
}

export const deleteBlog = async (id: string) => {
  const statement = `
    DELETE FROM blogs
    WHERE id = ?;
  `
  await execute(statement, [id])
}
