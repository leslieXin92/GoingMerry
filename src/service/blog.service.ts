import execute from '@/app/database'
import type { BlogType, CreateBlogParams } from '@/types'

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

export const createBlog = async (params: { author: string } & CreateBlogParams) => {
  const { author, title, content, type } = params
  const statement = `INSERT INTO blogs (author, title, content, type) VALUES (?, ?, ?, ?);`
  await execute(statement, [author, title, content, type])
}
