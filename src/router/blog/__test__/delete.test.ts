import { useTest, useErrorReturn, useSuccessReturn, queryInsert } from '@/utils'

describe('delete blog', () => {
  describe('not login', () => {
    const testFn = useTest('/blog/1', 'delete')

    test('not login', async () => {
      const { status, body } = await testFn()
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('normal permission', () => {
    const testFn = useTest('/blog/1', 'delete')

    test('normal permission', async () => {
      const { status, body } = await testFn(undefined, { id: 1, username: 'leslie', permission: 'normal' })
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('admin permission', () => {
    const testFn = useTest('/blog/1', 'delete')

    test('admin permission', async () => {
      const { status, body } = await testFn(undefined, { id: 1, username: 'leslie', permission: 'admin' })
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('superAdmin permission', () => {
    const userInfo = { id: 1, username: 'leslie', permission: 'superAdmin' } as const

    const testInvalidId = useTest('/blog/xxx', 'delete')
    const testFn = useTest('/blog/1', 'delete')

    test('invalid id', async () => {
      const { status, body } = await testInvalidId(undefined, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
    })

    test('blog not exists', async () => {
      const { status, body } = await testFn(undefined, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Blog Dose Not Exists!'))
    })

    test('delete success', async () => {
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
      const { status, body } = await testFn(undefined, {
        id: 1,
        username: 'leslie',
        permission: 'superAdmin'
      })
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn(null, 'Delete Success!'))
    })
  })
})
