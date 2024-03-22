import { useTest, useErrorReturn, useSuccessReturn, queryInsert } from '@/utils'

describe('get blog item', () => {
  const testFn = useTest('/blog/1', 'get')

  describe('no permission', () => {
    const testInvalidId = useTest('/blog/testId', 'get')

    test('invalid id', async () => {
      const { status, body } = await testInvalidId()
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
    })

    test('blog not exists', async () => {
      const { status, body } = await testFn()
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Blog Dose Not Exists!'))
    })

    test('view public blog', async () => {
      await queryInsert({
        table: 'blogs',
        data: {
          id: 1,
          title: 'test',
          content: 'test',
          visibility: 'public',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const { status, body } = await testFn()
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn({
        id: 1,
        title: 'test',
        content: 'test',
        visibility: 'public',
        createdAt: expect.any(String)
      }))
    })

    test('view private blog', async () => {
      await queryInsert({
        table: 'blogs',
        data: {
          id: 1,
          title: 'test',
          content: 'test',
          visibility: 'private',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const { status, body } = await testFn()
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('normal permission', () => {
    const userInfo = { id: 1, username: 'leslie', permission: 'normal' } as const

    test('view public blog', async () => {
      await queryInsert({
        table: 'blogs',
        data: {
          id: 1,
          title: 'test',
          content: 'test',
          visibility: 'public',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const { status, body } = await testFn(undefined, userInfo)
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn({
        id: 1,
        title: 'test',
        content: 'test',
        visibility: 'public',
        createdAt: expect.any(String)
      }))
    })

    test('view private blog', async () => {
      await queryInsert({
        table: 'blogs',
        data: {
          id: 1,
          title: 'test',
          content: 'test',
          visibility: 'private',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const { status, body } = await testFn(undefined, userInfo)
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn({
        id: 1,
        title: 'test',
        content: 'test',
        visibility: 'private',
        createdAt: expect.any(String)
      }))
    })
  })
})
