import { queryInsert, querySelect, useErrorReturn, useSuccessReturn, useTest } from '@/utils'
import type { ProjectItem, ProjectStatus, UpdateProjectItemParams } from '@/types'

describe('Update project', () => {
  const testFn = useTest<UpdateProjectItemParams>('/project/1', 'patch')

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
      const params: UpdateProjectItemParams = { name: 'name', coverIcon: 'coverIcon' }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('admin permission', () => {
    const userInfo = { id: 1, username: 'leslie', permission: 'admin' } as const

    it('admin permission', async () => {
      const params: UpdateProjectItemParams = { name: 'name', coverIcon: 'coverIcon' }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('super admin permission', () => {
    const userInfo = { id: 1, username: 'leslie', permission: 'superAdmin' } as const
    const testInvalidId = useTest<UpdateProjectItemParams>('/project/xxx', 'patch')

    it('invalid id', async () => {
      const { status, body } = await testInvalidId(undefined, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Name is required!'))
    })

    it('no name', async () => {
      const params: UpdateProjectItemParams = {
        name: '',
        coverIcon: '',
        technologyStack: [],
        description: 'description',
        startAt: '2024-03-21',
        doneAt: '2024-03-22'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Name is required!'))
    })

    it('no cover icon', async () => {
      const params: UpdateProjectItemParams = {
        name: 'name',
        coverIcon: '',
        technologyStack: [],
        description: 'description',
        startAt: '2024-03-21',
        doneAt: '2024-03-22'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Cover icon is required!'))
    })

    it('invalid status', async () => {
      const params = {
        name: 'name',
        coverIcon: 'coverIcon',
        technologyStack: [],
        description: 'description',
        status: 'xxx' as ProjectStatus,
        startAt: '2024-03-21',
        doneAt: '2024-03-22'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Status Is Invalid!'))
    })

    it('invalid startAt', async () => {
      const params: UpdateProjectItemParams = {
        name: 'name',
        coverIcon: 'coverIcon',
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
      const params: UpdateProjectItemParams = {
        name: 'name',
        coverIcon: 'coverIcon',
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
          coverIcon: 'coverIcon',
          technologyStack: [],
          description: 'description',
          startAt: '2024-03-21',
          doneAt: '2024-03-22',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const params: UpdateProjectItemParams = {
        name: 'name',
        coverIcon: 'coverIcon',
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
          coverIcon: 'coverIcon',
          technologyStack: [],
          description: 'description',
          status: 'doing',
          startAt: '2024-03-21',
          doneAt: '2024-03-22',
          createdBy: 1,
          updatedBy: 1
        }
      })
      const params: UpdateProjectItemParams = {
        name: 'name',
        coverIcon: 'coverIcon',
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
