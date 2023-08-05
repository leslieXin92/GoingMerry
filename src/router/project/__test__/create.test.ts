import { useTest, useErrorReturn, useSuccessReturn } from '@/utils'
import type { CreateProjectParams, ProjectStatus } from '@/types'

describe('create project', () => {
  const testFn = useTest<CreateProjectParams>('/project', 'post')

  test('no token or invalid token', async () => {
    const { status, body } = await testFn({ title: 'title', status: 'pending' })
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('no title', async () => {
    const { status, body } = await testFn({ status: 'pending' }, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('title And Status Cannot Be Empty!'))
  })

  test('no status', async () => {
    const { status, body } = await testFn({ title: 'title' }, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('title And Status Cannot Be Empty!'))
  })

  test('invalid status', async () => {
    const { status, body } = await testFn({ title: 'title', status: 'otherStatus' as ProjectStatus }, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Status Is Invalid!'))
  })

  test('create success', async () => {
    const { status, body, error } = await testFn({ title: 'title', status: 'pending' }, true)
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn(null, 'Create Success!'))
  })
})
