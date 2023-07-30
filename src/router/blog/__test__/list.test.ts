import { useTest, useErrorReturn, useSuccessReturn } from '@/utils'
import { BlogType, getBlogListParams } from '@/types'

describe('get blog list', () => {
  const testFn = useTest<getBlogListParams>('/blog', 'get')

  test('no type', async () => {
    const { status, body } = await testFn({ page: 1 })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Page And Type Cannot Be Empty!'))
  })

  test('no page', async () => {
    const { status, body } = await testFn({ type: 'public' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Page And Type Cannot Be Empty!'))
  })

  test('type is invalid', async () => {
    const { status, body } = await testFn({ page: 1, type: 'otherType' as BlogType })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Type Is Invalid!'))
  })

  test('get list success', async () => {
    const { status, body } = await testFn({ page: 1, type: 'public' })
    expect(status).toBe(200)
    expect(body).toEqual({
      code: 0,
      data: {
        blogList: expect.any(Array),
        total: expect.any(Number)
      },
      msg: 'Success!'
    })
  })
})
