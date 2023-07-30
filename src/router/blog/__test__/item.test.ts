import { useTest, useErrorReturn, useSuccessReturn } from '@/utils'
import type { getBlogItemParams } from '@/types'

describe('get blog item', () => {
  test('invalid id', async () => {
    const testFn = useTest<getBlogItemParams>('/blog/testId', 'get')
    const { status, body } = await testFn()
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
  })

  test('not login view private blog', async () => {
    const testFn = useTest<getBlogItemParams>('/blog/9', 'get')
    const { status, body } = await testFn()
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('not login view public blog', async () => {
    const testFn = useTest<getBlogItemParams>('/blog/4', 'get')
    const { status, body } = await testFn()
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn({
      id: 4,
      title: expect.any(String),
      content: expect.any(String),
      type: 'public',
      createAt: expect.any(String)
    }))
  })

  test('login view private blog', async () => {
    const testFn = useTest<getBlogItemParams>('/blog/9', 'get')
    const { status, body } = await testFn(undefined, true)
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn({
      id: 9,
      title: expect.any(String),
      content: expect.any(String),
      type: 'private',
      createAt: expect.any(String)
    }))
  })

  test('login view public blog', async () => {
    const testFn = useTest<getBlogItemParams>('/blog/4', 'get')
    const { status, body } = await testFn(undefined, true)
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn({
      id: 4,
      title: expect.any(String),
      content: expect.any(String),
      type: 'public',
      createAt: expect.any(String)
    }))
  })
})
