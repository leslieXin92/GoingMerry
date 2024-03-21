import { queryInsert, querySelect, useErrorReturn, useSuccessReturn, useTest } from '@/utils'
import type { ProjectItem, UpdateProjectItemParams } from '@/types'

describe('Update project', () => {
  const testFn = useTest('/project/1', 'patch')

  describe('not login', () => {
    it('not login', async () => {
      const { status, body } = await testFn()
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('normal permission', () => {
    it('normal permission', async () => {
      const params: UpdateProjectItemParams = {
        name: 'name'
      }
      const { status, body } = await testFn(params, { id: 1, username: 'leslie', permission: 'normal' })
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('admin permission', () => {
    it('admin permission', async () => {
      const params: UpdateProjectItemParams = {
        name: 'name'
      }
      const { status, body } = await testFn(params, { id: 1, username: 'leslie', permission: 'admin' })
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('super admin permission', () => {
    const userInfo = { id: 1, username: 'leslie', permission: 'superAdmin' } as const

    const testInvalidId = useTest<UpdateProjectItemParams>('/project/xxx', 'patch')

    it('Invalid id', async () => {
      const { status, body } = await testInvalidId({}, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Name is required!'))
    })

    it('no name', async () => {
      const params = {
        name: '',
        technologyStack: [],
        description: 'description',
        startAt: '2024-03-21',
        doneAt: '2024-03-22'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Name is required!'))
    })

    it('invalid status', async () => {
      const params = {
        name: 'name',
        technologyStack: [],
        description: 'description',
        status: 'xxx',
        startAt: '2024-03-21',
        doneAt: '2024-03-22'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Status Is Invalid!'))
    })

    it('invalid startAt', async () => {
      const params = {
        name: 'name',
        technologyStack: [],
        description: 'description',
        startAt: 'xxx',
        doneAt: '2024-03-22'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Invalid startAt format (YYYY-MM-DD) !'))
    })

    it('project not exists', async () => {
      const params = {
        name: 'name',
        technologyStack: [],
        description: 'description',
        startAt: '2024-03-21',
        doneAt: '2024-03-22'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Project Dose Not Exists!'))
    })

    it('no change', async () => {
      await queryInsert({
        table: 'projects',
        data: {
          id: 1,
          name: 'name',
          technologyStack: [],
          description: 'description',
          startAt: '2024-03-21',
          doneAt: '2024-03-22',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const params = {
        name: 'name',
        technologyStack: [],
        description: 'description',
        startAt: '2024-03-21',
        doneAt: '2024-03-22'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('No Change!'))
    })

    it('update success', async () => {
      await queryInsert({
        table: 'projects',
        data: {
          id: 1,
          name: 'name',
          technologyStack: [],
          description: 'description',
          status: 'doing',
          startAt: '2024-03-21',
          doneAt: '2024-03-22',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const params = {
        name: 'name',
        technologyStack: ['a', 'b', 'c'],
        description: 'description',
        status: 'doing',
        startAt: '2024-03-21',
        doneAt: '2024-03-22'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn(null, 'Update Success!'))
      const project = await querySelect<ProjectItem[]>({
        table: 'projects',
        where: { id: 1 },
        columns: ['name', 'technologyStack']
      })
      expect(project[0].technologyStack).toEqual(['a', 'b', 'c'])
    })
  })
})
