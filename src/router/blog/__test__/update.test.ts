import { useTest, useErrorReturn, useSuccessReturn, queryInsert, querySelect } from '@/utils'
import type { UpdateBlogItemParams, VisibilityType } from '@/types'

describe('update blog', () => {
  const testFn = useTest<UpdateBlogItemParams>('/blog/1', 'patch')

  describe('no permission', () => {
    it('not login', async () => {
      const { status, body } = await testFn()
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('normal permission', () => {
    const userInfo = { id: 1, username: 'leslie', permission: 'normal' } as const

    it('normal permission', async () => {
      const params: UpdateBlogItemParams = {
        title: 'test',
        content: 'test',
        visibility: 'public'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('admin permission', () => {
    const userInfo = { id: 1, username: 'leslie', permission: 'admin' } as const

    it('admin permission', async () => {
      const params: UpdateBlogItemParams = {
        title: 'test',
        content: 'test',
        visibility: 'public'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('superAdmin permission', () => {
    const userInfo = { id: 1, username: 'leslie', permission: 'superAdmin' } as const
    const testInvalidId = useTest<UpdateBlogItemParams>('/blog/xxx', 'patch')

    it('invalid id', async () => {
      const params: UpdateBlogItemParams = {
        title: 'title',
        content: 'content',
        visibility: 'public'
      }
      const { status, body } = await testInvalidId(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
    })

    it('no title', async () => {
      const params: UpdateBlogItemParams = {
        title: '',
        content: 'test',
        visibility: 'public'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Title Cannot Be Empty!'))
    })

    it('no content', async () => {
      const params: UpdateBlogItemParams = {
        title: 'title',
        content: '',
        visibility: 'public'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Content Cannot Be Empty!'))
    })

    it('no type', async () => {
      const params = {
        title: 'title',
        content: 'content',
        visibility: '' as VisibilityType
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Visibility Cannot Be Empty!'))
    })

    it('invalid type', async () => {
      const params = {
        title: 'title',
        content: 'content',
        visibility: 'otherType' as VisibilityType
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Visibility Is Invalid!'))
    })

    it('blog not exists', async () => {
      const params: UpdateBlogItemParams = {
        title: 'title',
        content: 'content',
        visibility: 'public'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Blog Dose Not Exists!'))
    })

    it('no change', async () => {
      await queryInsert({
        table: 'blogs',
        data: {
          id: 1,
          title: 'title',
          content: 'content',
          visibility: 'public',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const params: UpdateBlogItemParams = {
        title: 'title',
        content: 'content',
        visibility: 'public'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('No Change!'))
    })

    it('update success', async () => {
      await queryInsert({
        table: 'blogs',
        data: {
          id: 1,
          title: 'title',
          content: 'content',
          visibility: 'public',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const params: UpdateBlogItemParams = {
        title: 'title',
        content: 'content',
        visibility: 'private'
      }
      const { status, body } = await testFn(params, userInfo)
      const blogs = await querySelect({
        table: 'blogs',
        where: { id: 1 },
        columns: ['id', 'title', 'content', 'visibility']
      })
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn(null, 'Update Success!'))
      expect(blogs).toEqual([{
        id: 1,
        title: 'title',
        content: 'content',
        visibility: 'private'
      }])
    })
  })
})
