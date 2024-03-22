import { useTest, queryInsert, useErrorReturn, useSuccessReturn } from '@/utils'
import type { VisibilityType, GetBlogListParams } from '@/types'

describe('get blog list', () => {
  const testFn = useTest<GetBlogListParams>('/blog', 'get')

  describe('no permission', () => {
    test('no page', async () => {
      const params = { visibility: 'public' } as GetBlogListParams
      const { status, body } = await testFn(params)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Page Cannot Be Empty!'))
    })

    test('page is invalid', async () => {
      const params = { page: 'xxx', visibility: 'public' } as GetBlogListParams
      const { status, body } = await testFn(params)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Page Is Invalid!'))
    })

    test('type is invalid', async () => {
      const params = { page: '1', visibility: 'otherType' as VisibilityType }
      const { status, body } = await testFn(params)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Visibility Is Invalid!'))
    })

    test('public list', async () => {
      await queryInsert({
        table: 'blogs',
        data: {
          id: 1,
          title: 'title',
          content: 'content',
          visibility: 'public',
          createdAt: '2023-09-03',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const params: GetBlogListParams = { page: '1', visibility: 'public' }
      const { status, body } = await testFn(params)
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn({
        blogList: expect.any(Array),
        totalCount: expect.any(Number)
      }))
    })

    test('private list', async () => {
      await queryInsert({
        table: 'blogs',
        data: {
          id: 1,
          title: 'title',
          content: 'content',
          visibility: 'private',
          createdAt: '2023-09-03',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const params: GetBlogListParams = { page: '1', visibility: 'private' }
      const { status, body } = await testFn(params)
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })

    test('full list', async () => {
      await queryInsert({
        table: 'blogs',
        data: {
          id: 1,
          title: 'title',
          content: 'content',
          visibility: 'private',
          createdAt: '2023-09-03',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const params: GetBlogListParams = { page: '1', visibility: '' }
      const { status, body } = await testFn(params)
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('normal permission', () => {
    const userInfo = { id: 1, username: 'leslie', permission: 'normal' } as const

    test('private list', async () => {
      await queryInsert({
        table: 'blogs',
        data: {
          id: 1,
          title: 'title',
          content: 'content',
          visibility: 'private',
          createdAt: '2023-09-03',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const params: GetBlogListParams = { page: '1', visibility: 'private' }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn({
        blogList: expect.any(Array),
        totalCount: expect.any(Number)
      }))
    })

    test('full list', async () => {
      await queryInsert({
        table: 'blogs',
        data: {
          id: 1,
          title: 'title',
          content: 'content',
          visibility: 'private',
          createdAt: '2023-09-03',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const params: GetBlogListParams = { page: '1', visibility: '' }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn({
        blogList: expect.any(Array),
        totalCount: expect.any(Number)
      }))
    })
  })
})
