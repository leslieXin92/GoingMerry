import { useTest, useErrorReturn, useSuccessReturn, queryInsert } from '@/utils'

describe('get project item', () => {
  const demo = useTest('/project/testId', 'get')
  test('test', async () => {
    await demo()
  })
  //
  // const testInvalidId = useTest('/project/testId', 'get')
  // test('invalid id', async () => {
  //   const { status, body } = await testInvalidId()
  //   expect(status).toBe(400)
  //   expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
  // })
  //
  // const testNotExists = useTest('/project/1', 'get')
  // test('project not exists', async () => {
  //   const { status, body } = await testNotExists()
  //   expect(status).toBe(400)
  //   expect(body).toEqual(useErrorReturn('Project Dose Not Exists!'))
  // })
  //
  // const testGetSuccess = useTest('/project/1', 'get')
  // test('get project item', async () => {
  //   await queryInsert({
  //     table: 'projects',
  //     data: {
  //       id: 1,
  //       title: 'test',
  //       status: 'pending',
  //       image: 'image',
  //       introduction: 'introduction',
  //       technologyStack: []
  //     }
  //   })
  //   const { status, body } = await testGetSuccess()
  //   expect(status).toBe(200)
  //   expect(body).toEqual(useSuccessReturn({
  //     id: 1,
  //     title: 'test',
  //     status: 'pending',
  //     image: 'image',
  //     introduction: 'introduction',
  //     technologyStack: [],
  //     startAt: null,
  //     endAt: null
  //   }))
  // })
})
