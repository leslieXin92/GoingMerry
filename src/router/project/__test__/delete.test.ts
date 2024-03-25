import { queryInsert, useErrorReturn, useSuccessReturn, useTest } from '@/utils'

describe('delete project', () => {
  const testFn = useTest('/project/1', 'delete')

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
      const { status, body } = await testFn(undefined, userInfo)
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('admin permission', () => {
    const userInfo = { id: 1, username: 'leslie', permission: 'admin' } as const

    it('admin permission', async () => {
      const { status, body } = await testFn(undefined, userInfo)
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('super admin permission', () => {
    const userInfo = { id: 1, username: 'leslie', permission: 'superAdmin' } as const
    const testInvalidId = useTest('/project/xxx', 'delete')

    it('invalid id', async () => {
      const { status, body } = await testInvalidId(undefined, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
    })

    it('project not exists', async () => {
      const { status, body } = await testFn(undefined, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Project Dose Not Exists!'))
    })

    it('delete success', async () => {
      await queryInsert({
        table: 'projects',
        data: {
          id: 1,
          name: 'name',
          coverIcon: 'coverIcon',
          status: 'pending',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const { status, body } = await testFn(undefined, userInfo)
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn(null, 'Delete Success!'))
    })
  })
})
