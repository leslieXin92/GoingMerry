import { useTest, useErrorReturn, useSuccessReturn } from '@/utils'
import { ProjectStatus, UpdateBlogItemParams, UpdateProjectParams } from '@/types'

describe('update project', () => {
  test('not login', async () => {
    const testFn = useTest<UpdateProjectParams>('/project/1', 'patch')
    const { status, body } = await testFn({ title: 'title', status: 'pending' })
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('no title', async () => {
    const testFn = useTest<UpdateProjectParams>('/project/1', 'patch')
    const { status, body } = await testFn({ status: 'pending' }, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('title And Status Cannot Be Empty!'))
  })

  test('no status', async () => {
    const testFn = useTest<UpdateProjectParams>('/project/1', 'patch')
    const { status, body } = await testFn({ title: 'title' }, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('title And Status Cannot Be Empty!'))
  })

  test('invalid status', async () => {
    const testFn = useTest<UpdateProjectParams>('/project/1', 'patch')
    const { status, body } = await testFn({ title: 'title', status: 'otherStatus' as ProjectStatus }, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Status Is Invalid!'))
  })

  test('invalid id', async () => {
    const testFn = useTest<UpdateProjectParams>('/project/xxx', 'patch')
    const { status, body } = await testFn({ title: 'title', status: 'pending' }, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
  })

  test('blog not exists', async () => {
    const testFn = useTest<UpdateProjectParams>('/project/999', 'patch')
    const { status, body } = await testFn({ title: 'title', status: 'pending' }, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Project Dose Not Exists!'))
  })

  test('no change', async () => {
    const testFn = useTest<UpdateProjectParams>('/project/1', 'patch')
    const { status, body } = await testFn({ title: 'title', status: 'pending' }, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('No Change!'))
  })

  test('ordinary people change project', async () => {
    const testFn = useTest<UpdateProjectParams>('/project/1', 'patch')
    const { status, body } = await testFn({ title: 'title', status: 'pending' }, true, { id: 13, username: 'cabbage' })
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('leslie change someone else\'s blog', async () => {
    const testFn = useTest<UpdateProjectParams>('/project/1', 'patch')
    const { status, body } = await testFn({ title: 'title title', status: 'pending' }, true)
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn(null, 'Update Success!'))
  })
})
