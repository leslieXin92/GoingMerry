import { useTest, useErrorReturn, useSuccessReturn, queryInsert, querySelect } from '@/utils'
import type { UpdateBlogItemParams } from '@/types'
import { VisibilityType } from '@/types'

describe('update blog', () => {
  const testNotLogin = useTest<UpdateBlogItemParams>('/blog/1', 'patch')
  test('not login', async () => {
    const { status, body } = await testNotLogin()
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  const testNotWriteList = useTest<UpdateBlogItemParams>('/blog/1', 'patch')
  test('not in write list', async () => {
    const params: UpdateBlogItemParams = {
      title: 'test',
      content: 'test',
      visibility: 'public'
    }
    const { status, body } = await testNotWriteList(params, { id: '1', username: 'yahoo' })
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  const testNoTitle = useTest<UpdateBlogItemParams>('/blog/1', 'patch')
  test('no title', async () => {
    const params: UpdateBlogItemParams = {
      title: '',
      content: 'test',
      visibility: 'public'
    }
    const { status, body } = await testNoTitle(params, { id: '1', username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Title, Content And Type Cannot Be Empty!'))
  })

  const testNoContent = useTest<UpdateBlogItemParams>('/blog/1', 'patch')
  test('no content', async () => {
    const params: UpdateBlogItemParams = {
      title: 'title',
      content: '',
      visibility: 'public'
    }
    const { status, body } = await testNoContent(params, { id: '1', username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Title, Content And Type Cannot Be Empty!'))
  })

  const testNoType = useTest<UpdateBlogItemParams>('/blog/1', 'patch')
  test('no type', async () => {
    const params = {
      title: 'title',
      content: 'content',
      visibility: '' as VisibilityType
    }
    const { status, body } = await testNoType(params, { id: '1', username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Title, Content And Type Cannot Be Empty!'))
  })

  const testInvalidType = useTest<UpdateBlogItemParams>('/blog/1', 'patch')
  test('invalid type', async () => {
    const params = {
      title: 'title',
      content: 'content',
      visibility: 'otherType' as VisibilityType
    }
    const { status, body } = await testInvalidType(params, { id: '1', username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Type Is Invalid!'))
  })

  const testInvalidId = useTest<UpdateBlogItemParams>('/blog/xxx', 'patch')
  test('invalid id', async () => {
    const params: UpdateBlogItemParams = {
      title: 'title',
      content: 'content',
      visibility: 'public'
    }
    const { status, body } = await testInvalidId(params, { id: '1', username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
  })

  const testNotExists = useTest<UpdateBlogItemParams>('/blog/1', 'patch')
  test('blog not exists', async () => {
    const params: UpdateBlogItemParams = {
      title: 'title',
      content: 'content',
      visibility: 'public'
    }
    const { status, body } = await testNotExists(params, { id: '1', username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Blog Dose Not Exists!'))
  })

  const testNoChange = useTest<UpdateBlogItemParams>('/blog/1', 'patch')
  test('no change', async () => {
    await queryInsert({
      table: 'blogs',
      data: {
        id: 1,
        title: 'title',
        content: 'content',
        visibility: 'public'
      }
    })
    const params: UpdateBlogItemParams = {
      title: 'title',
      content: 'content',
      visibility: 'public'
    }
    const { status, body } = await testNoChange(params, { id: '1', username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('No Change!'))
  })


  const testUpdateSuccess = useTest<UpdateBlogItemParams>('/blog/1', 'patch')
  test('update success', async () => {
    await queryInsert({
      table: 'blogs',
      data: {
        id: 1,
        title: 'title',
        content: 'content',
        visibility: 'public'
      }
    })
    const params: UpdateBlogItemParams = {
      title: 'title',
      content: 'content',
      visibility: 'private'
    }
    const { status, body } = await testUpdateSuccess(params, { id: '1', username: 'leslie' })
    const blogs = await querySelect({
      table: 'blogs',
      where: { id: 1 },
      columns: ['id', 'title', 'content', 'type']
    })
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn(null, 'Update Success!'))
    expect(blogs).toEqual([{
      id: 1,
      title: 'title',
      content: 'content',
      visibility: 'private'
    }])
  })
})
