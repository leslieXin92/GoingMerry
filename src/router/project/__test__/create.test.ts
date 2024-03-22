import { dateFormat, querySelect, useErrorReturn, useSuccessReturn, useTest } from '@/utils'
import type { CreateProjectParams, ProjectItem, ProjectStatus } from '@/types'

describe('create project', () => {
  const testFn = useTest<CreateProjectParams>('/project', 'post')

  describe('no permission', () => {
    it('not login', async () => {
      const { status, body } = await testFn()
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('normal permission', () => {
    const userInfo = { id: 1, username: 'leslie', permission: 'normal' } as const

    it('no name', async () => {
      const params: CreateProjectParams = {
        name: '',
        status: 'pending',
        startAt: 'test'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Name is required!'))
    })

    it('invalid status', async () => {
      const { status, body } = await testFn({
        name: 'test',
        status: 'xxx' as ProjectStatus,
        startAt: 'test'
      }, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Status Is Invalid!'))
    })

    it('invalid startAt', async () => {
      const params: CreateProjectParams = {
        name: 'test',
        status: 'pending',
        startAt: 'xxx'
      }
      const { status, body } = await testFn(params, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Invalid startAt format (YYYY-MM-DD) !'))
    })

    it('create success', async () => {
      const params: CreateProjectParams = {
        name: 'name',
        technologyStack: [],
        description: 'description',
        startAt: '2024-03-21',
        doneAt: '2024-03-22'
      }
      const { status, body } = await testFn(params, userInfo)
      const projectList = await querySelect<ProjectItem[]>({
        table: 'projects',
        where: { name: params.name },
        columns: ['id', 'name', 'technologyStack', 'description', 'startAt', 'doneAt']
      })
      const project = projectList[0]
      Object.entries(project).forEach(([key, value]) => {
        if (key.endsWith('At') && value) (project as any)[key as keyof typeof project] = dateFormat(value)
      })
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn(null, 'Create success!'))
      expect(project).toMatchObject(params)
    })
  })
})
