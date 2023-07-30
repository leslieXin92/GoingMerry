import execute from '@/app/database'
import type { BlogType, CreateBlogParams } from '@/types'
import { UpdateBlogItemParams } from '@/types'

export const createBlog = async (params: { author: string } & CreateBlogParams) => {
  const { author, title, content, type } = params
  const statement = `INSERT INTO blogs (author, title, content, type) VALUES (?, ?, ?, ?);`
  await execute(statement, [author, title, content, type])
}

export const getBlogList = async (page: string | number, type: BlogType) => {
  const getListStatement = type === 'public'
    ? `
      SELECT id, title, createAt
      FROM blogs
      WHERE type = 'public'
      LIMIT ?, 10;
    `
    : `
      SELECT id, title, createAt
      FROM blogs
      LIMIT ?, 10;
    `
  const offset = String((Number(page) - 1) * 10)
  const [blogList] = await execute(getListStatement, [offset])

  const getTotalStatement = type === 'public'
    ? `
        SELECT COUNT(id) AS total
        FROM blogs
        WHERE type = 'public';
    `
    : `
        SELECT COUNT(id) AS total
        FROM blogs;
    `
  const [total] = await execute(getTotalStatement) as any[] // TODO - type

  return { blogList, total: total[0].total }
}

export const getBlogItem = async (id: string) => {
  const statement = `
    SELECT id, author, type, title, content, createAt
    FROM blogs
    WHERE id = ?;
  `
  const [blogItem] = await execute(statement, [id]) as any[] // TODO - type
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
