import { useTest, useErrorReturn, useSuccessReturn } from '@/utils'

describe('get blog item', () => {
  test('invalid id', async () => {
    const testFn = useTest('/blog/testId', 'get')
    const { status, body } = await testFn()
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
  })

  test('blog not exists', async () => {
    const testFn = useTest('/blog/999', 'get')
    const { status, body } = await testFn()
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Blog Dose Not Exists!'))
  })

  test('not login view private blog', async () => {
    const testFn = useTest('/blog/9', 'get')
    const { status, body } = await testFn()
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('not login view public blog', async () => {
    const testFn = useTest('/blog/4', 'get')
    const { status, body } = await testFn()
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn({
      id: 4,
      author: 1,
      title: expect.any(String),
      content: expect.any(String),
      type: 'public',
      createAt: expect.any(String)
    }))
  })

  test('login view private blog', async () => {
    const testFn = useTest('/blog/9', 'get')
    const { status, body } = await testFn(undefined, true)
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn({
      id: 9,
      author: 1,
      title: expect.any(String),
      content: expect.any(String),
      type: 'private',
      createAt: expect.any(String)
    }))
  })

  test('login view public blog', async () => {
    const testFn = useTest('/blog/4', 'get')
    const { status, body } = await testFn(undefined, true)
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn({
      id: 4,
      author: 1,
      title: expect.any(String),
      content: expect.any(String),
      type: 'public',
      createAt: expect.any(String)
    }))
  })
})
