import execute from '@/app/database'
import type { BlogType, CreateBlogParams } from '@/types'

export const getBlogList = async (pageSize: number, type: BlogType) => {
  const statement = type === 'public'
    ? `
      SELECT id, title, createAt
      FROM blogs
      WHERE type = 'public'
      LIMIT 10 OFFSET 1
    `
    : `
      SELECT id, title, createAt
      FROM blogs
      LIMIT 10 OFFSET 1
    `
  const [res] = await execute(statement, [type, pageSize])
  return res
}

export const createBlog = async (params: { author: string } & CreateBlogParams) => {
  const { author, title, content, type } = params
  const statement = `INSERT INTO blogs (author, title, content, type) VALUES (?, ?, ?, ?);`
  await execute(statement, [author, title, content, type])
}
