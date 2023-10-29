import { useTest, useErrorReturn, useSuccessReturn, queryInsert, querySelect } from '@/utils'
import { ProjectStatus, UpdateProjectParams } from '@/types'

describe('update project', () => {
  const demo = useTest('/project/testId', 'get')
  test('test', async () => {
    await demo()
  })
  //
  // const testNotLogin = useTest<UpdateProjectParams>('/project/1', 'patch')
  // test('not login', async () => {
  //   const params = {
  //     title: 'title',
  //     status: 'pending'
  //   } as const
  //   const { status, body } = await testNotLogin(params)
  //   expect(status).toBe(401)
  //   expect(body).toEqual(useErrorReturn('Unauthorized!'))
  // })
  //
  // const testNotWriteList = useTest<UpdateProjectParams>('/project/1', 'patch')
  // test('not in write', async () => {
  //   const params = {
  //     title: 'title',
  //     status: 'pending'
  //   } as const
  //   const { status, body } = await testNotWriteList(params, { id: 1, username: 'yahoo' })
  //   expect(status).toBe(401)
  //   expect(body).toEqual(useErrorReturn('Unauthorized!'))
  // })
  //
  // const testNoTitle = useTest<UpdateProjectParams>('/project/1', 'patch')
  // test('no title', async () => {
  //   const params = { status: 'pending' } as UpdateProjectParams
  //   const { status, body } = await testNoTitle(params, { id: 1, username: 'leslie' })
  //   expect(status).toBe(400)
  //   expect(body).toEqual(useErrorReturn('title And Status Cannot Be Empty!'))
  // })
  //
  // const testNoStatus = useTest<UpdateProjectParams>('/project/1', 'patch')
  // test('no status', async () => {
  //   const params = { title: 'title' } as UpdateProjectParams
  //   const { status, body } = await testNoStatus(params, { id: 1, username: 'leslie' })
  //   expect(status).toBe(400)
  //   expect(body).toEqual(useErrorReturn('title And Status Cannot Be Empty!'))
  // })
  //
  // const testInvalidStatus = useTest<UpdateProjectParams>('/project/1', 'patch')
  // test('invalid status', async () => {
  //   const params = {
  //     title: 'title',
  //     status: 'otherStatus' as ProjectStatus
  //   }
  //   const { status, body } = await testInvalidStatus(params, { id: 1, username: 'leslie' })
  //   expect(status).toBe(400)
  //   expect(body).toEqual(useErrorReturn('Status Is Invalid!'))
  // })
  //
  // const testInvalidId = useTest<UpdateProjectParams>('/project/xxx', 'patch')
  // test('invalid id', async () => {
  //   const params = {
  //     title: 'title',
  //     status: 'pending'
  //   } as const
  //   const { status, body } = await testInvalidId(params, { id: 1, username: 'leslie' })
  //   expect(status).toBe(400)
  //   expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
  // })
  //
  // const testNotExists = useTest<UpdateProjectParams>('/project/1', 'patch')
  // test('blog not exists', async () => {
  //   const params = {
  //     title: 'title',
  //     status: 'pending'
  //   } as const
  //   const { status, body } = await testNotExists(params, { id: 1, username: 'leslie' })
  //   expect(status).toBe(400)
  //   expect(body).toEqual(useErrorReturn('Project Dose Not Exists!'))
  // })
  //
  // const testNoChange = useTest<UpdateProjectParams>('/project/1', 'patch')
  // test('no change', async () => {
  //   await queryInsert({
  //     table: 'projects',
  //     data: {
  //       id: 1,
  //       title: 'title',
  //       status: 'pending'
  //     }
  //   })
  //   const params = {
  //     title: 'title',
  //     status: 'pending'
  //   } as const
  //   const { status, body } = await testNoChange(params, { id: 1, username: 'leslie' })
  //   expect(status).toBe(400)
  //   expect(body).toEqual(useErrorReturn('No Change!'))
  // })
  //
  // const testUpdateSuccess = useTest<UpdateProjectParams>('/project/1', 'patch')
  // test('update success', async () => {
  //   await queryInsert({
  //     table: 'projects',
  //     data: {
  //       id: 1,
  //       title: 'title',
  //       status: 'pending'
  //     }
  //   })
  //   const params = {
  //     title: 'title',
  //     status: 'doing'
  //   } as const
  //   const { status, body } = await testUpdateSuccess(params, { id: 1, username: 'leslie' })
  //   const projects = await querySelect({
  //     table: 'projects',
  //     where: params,
  //     columns: ['title', 'status']
  //   })
  //   expect(status).toBe(200)
  //   expect(body).toEqual(useSuccessReturn(null, 'Update Success!'))
  //   expect(projects).toEqual([params])
  // })
})
