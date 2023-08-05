import { useTest, useErrorReturn, useSuccessReturn } from '@/utils'
import type { GetProjectListParams, ProjectStatus } from '@/types'

describe('index', () => {
  const testFn = useTest<GetProjectListParams>('/project', 'get')

  test('no page', async () => {
    const { status, body } = await testFn()
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Page Cannot Be Empty!'))
  })

  test('page is invalid', async () => {
    const { status, body } = await testFn({ page: 'xxx' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Page Is Invalid!'))
  })

  test('status is invalid', async () => {
    const { status, body } = await testFn({ page: '1', status: 'otherStatus' as ProjectStatus })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Status Is Invalid!'))
  })

  test('get list success', async () => {
    const { status, body } = await testFn({ page: '1' })
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn({ projectList: expect.any(Array), total: expect.any(Number) }))
  })
})
