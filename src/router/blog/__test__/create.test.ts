import { useTest, useErrorReturn, useSuccessReturn } from '@/utils'
import type { CreateBlogParams } from '@/types'

describe('create blog', () => {
  const testFn = useTest<CreateBlogParams>('/blog', 'post')

  test('no token or invalid token', async () => {
    const { status, body } = await testFn()
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('no title', async () => {
    const params: CreateBlogParams = {
      title: '',
      content: 'test',
      type: 'public'
    }
    const { status, body } = await testFn(params, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Title, Content And Type Cannot Be Empty!'))
  })

  test('no content', async () => {
    const params: CreateBlogParams = {
      title: 'title',
      content: '',
      type: 'public'
    }
    const { status, body } = await testFn(params, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Title, Content And Type Cannot Be Empty!'))
  })

  test('no type', async () => {
    const params = {
      title: 'title',
      content: 'content',
      type: ''
    }
    const { status, body } = await testFn(params as CreateBlogParams, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Title, Content And Type Cannot Be Empty!'))
  })

  test('invalid type', async () => {
    const params = {
      title: 'title',
      content: 'content',
      type: 'otherType'
    }
    const { status, body } = await testFn(params as CreateBlogParams, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Type Is Invalid!'))
  })

  test('create success', async () => {
    const params: CreateBlogParams = {
      title: 'title',
      content: 'content',
      type: 'public'
    }
    const { status, body } = await testFn(params, true)
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn(null, 'Create Success!'))
  })
})
