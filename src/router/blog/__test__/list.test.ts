import { useTest, queryInsert, useErrorReturn, useSuccessReturn } from '@/utils'
import { BlogType, GetBlogListParams } from '@/types'

describe('get blog list', () => {
  const testFn = useTest<GetBlogListParams>('/blog', 'get')

  test('no page', async () => {
    const { status, body } = await testFn({ type: 'public' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Page Cannot Be Empty!'))
  })

  test('page is invalid', async () => {
    const { status, body } = await testFn({ page: 'xxx', type: 'public' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Page Is Invalid!'))
  })

  test('type is invalid', async () => {
    const { status, body } = await testFn({ page: '1', type: 'otherType' as BlogType })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Type Is Invalid!'))
  })

  test('get list success', async () => {
    await queryInsert({
      table: 'blogs',
      data: {
        id: 1,
        title: 'title',
        content: 'content',
        type: 'public',
        createdAt: '2023-09-03'
      }
    })
    const { status, body } = await testFn({ page: '1', type: 'public' })
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn({
      blogList: expect.any(Array),
      totalCount: expect.any(Number)
    }))
  })
})
