import { useTest, useErrorReturn, useSuccessReturn } from '@/utils'

describe('get project item', () => {
  test('invalid id', async () => {
    const testFn = useTest('/project/testId', 'get')
    const { status, body } = await testFn()
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
  })

  test('project not exists', async () => {
    const testFn = useTest('/project/999', 'get')
    const { status, body } = await testFn()
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Project Dose Not Exists!'))
  })

  test('get project item', async () => {
    const testFn = useTest('/project/1', 'get')
    const { status, body } = await testFn()
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn({
      id: 1,
      title: expect.any(String),
      status: 'pending',
      image: null,
      introduction: null,
      technologyStack: null,
      startAt: null,
      endAt: null
    }))
  })
})
