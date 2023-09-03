import { useTest, useErrorReturn, useSuccessReturn, querySelect } from '@/utils'
import type { CreateProjectParams, ProjectStatus } from '@/types'

describe('create project', () => {
  const testFn = useTest<CreateProjectParams>('/project', 'post')

  test('not login', async () => {
    const { status, body } = await testFn({ title: 'title', status: 'pending' })
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('not in write list', async () => {
    const { status, body } = await testFn({ title: 'title', status: 'pending' }, { id: 1, username: 'yahoo' })
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('no title', async () => {
    const params = { status: 'pending' } as CreateProjectParams
    const { status, body } = await testFn(params, { id: 1, username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('title And Status Cannot Be Empty!'))
  })

  test('no status', async () => {
    const params = { title: 'title' } as CreateProjectParams
    const { status, body } = await testFn(params, { id: 1, username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('title And Status Cannot Be Empty!'))
  })

  test('invalid status', async () => {
    const params = {
      title: 'title',
      status: 'otherStatus' as ProjectStatus
    }
    const { status, body } = await testFn(params, { id: 1, username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Status Is Invalid!'))
  })

  test('create success', async () => {
    const params = {
      title: 'title',
      status: 'pending'
    } as const
    const { status, body } = await testFn(params, { id: 1, username: 'leslie' })
    const projects = await querySelect({
      table: 'projects',
      where: params,
      columns: ['title', 'status']
    })
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn(null, 'Create Success!'))
    expect(projects).toEqual([params])
  })
})
