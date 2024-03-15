import { useTest, useErrorReturn, useSuccessReturn, querySelect } from '@/utils'
import type { VisibilityType, CreateBlogParams } from '@/types'

describe('create blog', () => {
  const testFn = useTest<CreateBlogParams>('/blog', 'post')

  test('not login', async () => {
    const { status, body } = await testFn()
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('not in write list', async () => {
    const params: CreateBlogParams = {
      title: 'title',
      content: 'test',
      visibility: 'public'
    }
    const { status, body } = await testFn(params, { id: '1', username: 'yahoo' })
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('no title', async () => {
    const params: CreateBlogParams = {
      title: '',
      content: 'test',
      visibility: 'public'
    }
    const { status, body } = await testFn(params, { id: '1', username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Title, Content And Type Cannot Be Empty!'))
  })

  test('no content', async () => {
    const params: CreateBlogParams = {
      title: 'title',
      content: '',
      visibility: 'public'
    }
    const { status, body } = await testFn(params, { id: '1', username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Title, Content And Type Cannot Be Empty!'))
  })

  test('no type', async () => {
    const params = {
      title: 'title',
      content: 'content',
      visibility: '' as VisibilityType
    }
    const { status, body } = await testFn(params, { id: '1', username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Title, Content And Type Cannot Be Empty!'))
  })

  test('invalid type', async () => {
    const params = {
      title: 'title',
      content: 'content',
      visibility: 'otherType' as VisibilityType
    }
    const { status, body } = await testFn(params, { id: '1', username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Type Is Invalid!'))
  })

  test('create success', async () => {
    const params: CreateBlogParams = {
      title: 'title',
      content: 'content',
      visibility: 'public'
    }
    const { status, body } = await testFn(params, { id: '1', username: 'leslie' })
    const blogs = await querySelect({
      table: 'blogs',
      where: { title: params.title },
      columns: ['title', 'content', 'type']
    })
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn(null, 'Create Success!'))
    expect(blogs).toEqual([params])
  })
})
