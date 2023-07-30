import { useTest, useErrorReturn, useSuccessReturn } from '@/utils'
import type { UpdateBlogItemParams } from '@/types'

describe('update blog', () => {

  test('not login', async () => {
    const testFn = useTest<UpdateBlogItemParams>('/blog/1', 'patch')
    const { status, body } = await testFn()
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('no title', async () => {
    const testFn = useTest<UpdateBlogItemParams>('/blog/1', 'patch')
    const params: UpdateBlogItemParams = {
      title: '',
      content: 'test',
      type: 'public'
    }
    const { status, body } = await testFn(params, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Title, Content And Type Cannot Be Empty!'))
  })

  test('no content', async () => {
    const testFn = useTest<UpdateBlogItemParams>('/blog/1', 'patch')
    const params: UpdateBlogItemParams = {
      title: 'title',
      content: '',
      type: 'public'
    }
    const { status, body } = await testFn(params, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Title, Content And Type Cannot Be Empty!'))
  })

  test('no type', async () => {
    const testFn = useTest<UpdateBlogItemParams>('/blog/1', 'patch')
    const params = {
      title: 'title',
      content: 'content',
      type: ''
    }
    const { status, body } = await testFn(params as UpdateBlogItemParams, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Title, Content And Type Cannot Be Empty!'))
  })

  test('invalid type', async () => {
    const testFn = useTest<UpdateBlogItemParams>('/blog/1', 'patch')
    const params = {
      title: 'title',
      content: 'content',
      type: 'otherType'
    }
    const { status, body } = await testFn(params as UpdateBlogItemParams, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Type Is Invalid!'))
  })

  test('invalid id', async () => {
    const testFn = useTest<UpdateBlogItemParams>('/blog/xxx', 'patch')
    const params: UpdateBlogItemParams = {
      title: 'title',
      content: 'content',
      type: 'public'
    }
    const { status, body } = await testFn(params, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
  })

  test('blog not exists', async () => {
    const testFn = useTest<UpdateBlogItemParams>('/blog/999', 'patch')
    const params: UpdateBlogItemParams = {
      title: 'title',
      content: 'content',
      type: 'public'
    }
    const { status, body } = await testFn(params, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Blog Dose Not Exists!'))
  })

  test('no change', async () => {
    const testFn = useTest<UpdateBlogItemParams>('/blog/3', 'patch')
    const params: UpdateBlogItemParams = {
      title: 'title',
      content: 'content',
      type: 'public'
    }
    const { status, body } = await testFn(params, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('No Change!'))
  })

  test('ordinary people change their own blog', async () => {
    const testFn = useTest<UpdateBlogItemParams>('/blog/16', 'patch')
    const params: UpdateBlogItemParams = {
      title: 'title',
      content: 'content',
      type: 'private'
    }
    const { status, body } = await testFn(params, true, { id: 13, username: 'cabbage' })
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn(null, 'Update Success!'))
  })

  test('ordinary people change someone else\'s blog', async () => {
    const testFn = useTest<UpdateBlogItemParams>('/blog/3', 'patch')
    const params: UpdateBlogItemParams = {
      title: 'title',
      content: 'content',
      type: 'public'
    }
    const { status, body } = await testFn(params, true, { id: 13, username: 'cabbage' })
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('leslie change someone else\'s blog', async () => {
    const testFn = useTest<UpdateBlogItemParams>('/blog/16', 'patch')
    const params: UpdateBlogItemParams = {
      title: 'title',
      content: 'content',
      type: 'public'
    }
    const { status, body } = await testFn(params, true)
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn(null, 'Update Success!'))
  })
})
