import { useTest, useErrorReturn, useSuccessReturn, queryInsert } from '@/utils'
import type { GetProjectListParams, ProjectStatus } from '@/types'

describe('get project list', () => {
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
    const params = {
      page: '1',
      status: 'otherStatus' as ProjectStatus
    }
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Status Is Invalid!'))
  })

  test('get list success', async () => {
    await queryInsert({
      table: 'projects',
      data: {
        id: 1,
        title: 'test',
        status: 'pending',
        technologyStack: []
      }
    })
    const { status, body } = await testFn({ page: '1' })
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn({
      projectList: [{
        id: 1,
        title: 'test',
        status: 'pending',
        technologyStack: [],
        image: null,
        startAt: null,
        endAt: null
      }],
      totalCount: 1
    }))
  })
})
