import { useTest, useErrorReturn, useSuccessReturn, querySelect } from '@/utils'
import type { VisibilityType, CreateBlogParams } from '@/types'

describe('create blog', () => {
  const testFn = useTest<CreateBlogParams>('/blog', 'post')

  describe('no permission', () => {
    test('not login', async () => {
      const { status, body } = await testFn()
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('normal permission', () => {
    const userInfo = { id: 1, username: 'leslie', permission: 'normal' } as const

    test('no title', async () => {
      const params: CreateBlogParams = {
        title: '',
        content: 'test',
        visibility: 'public'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Title Cannot Be Empty!'))
    })

    test('no content', async () => {
      const params: CreateBlogParams = {
        title: 'title',
        content: '',
        visibility: 'public'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Content Cannot Be Empty!'))
    })

    test('no visibility', async () => {
      const params = {
        title: 'title',
        content: 'content',
        visibility: '' as VisibilityType
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Visibility Cannot Be Empty!'))
    })

    test('invalid visibility', async () => {
      const params = {
        title: 'title',
        content: 'content',
        visibility: 'otherType' as VisibilityType
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Visibility Is Invalid!'))
    })

    test('create success', async () => {
      const params: CreateBlogParams = {
        title: 'title',
        content: 'content',
        visibility: 'public'
      }
      const { status, body } = await testFn(params, userInfo)
      const blogs = await querySelect({
        table: 'blogs',
        where: { title: params.title },
        columns: ['title', 'content', 'visibility']
      })
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn(null, 'Create Success!'))
      expect(blogs).toEqual([params])
    })
  })
})
