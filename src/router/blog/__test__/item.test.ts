import { useTest, useErrorReturn, useSuccessReturn, queryInsert } from '@/utils'

describe('get blog item', () => {
  const testInvalidId = useTest('/blog/testId', 'get')
  test('invalid id', async () => {
    const { status, body } = await testInvalidId()
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
  })

  const testNoId = useTest('/blog/1', 'get')
  test('blog not exists', async () => {
    const { status, body } = await testNoId()
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Blog Dose Not Exists!'))
  })

  const testNotLoginPublic = useTest('/blog/1', 'get')
  test('not login view public blog', async () => {
    await queryInsert({
      table: 'blogs',
      data: {
        id: 1,
        title: 'test',
        content: 'test',
        visibility: 'public'
      }
    })
    const { status, body } = await testNotLoginPublic()
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn({
      id: 1,
      title: 'test',
      content: 'test',
      visibility: 'public',
      createdAt: expect.any(String)
    }))
  })

  const testNotLoginPrivate = useTest('/blog/1', 'get')
  test('not login view private blog', async () => {
    await queryInsert({
      table: 'blogs',
      data: {
        id: 1,
        title: 'test',
        content: 'test',
        visibility: 'private'
      }
    })
    const { status, body } = await testNotLoginPrivate()
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  const testWriteListPublic = useTest('/blog/1', 'get')
  test('login view public blog', async () => {
    await queryInsert({
      table: 'blogs',
      data: {
        id: 1,
        title: 'test',
        content: 'test',
        visibility: 'public'
      }
    })
    const { status, body } = await testWriteListPublic(undefined, { id: '1', username: 'leslie' })
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn({
      id: 1,
      title: 'test',
      content: 'test',
      visibility: 'public',
      createdAt: expect.any(String)
    }))
  })

  const testWriteListPrivate = useTest('/blog/1', 'get')
  test('login view private blog', async () => {
    await queryInsert({
      table: 'blogs',
      data: {
        id: 1,
        title: 'test',
        content: 'test',
        visibility: 'private'
      }
    })
    const { status, body } = await testWriteListPrivate(undefined, { id: '1', username: 'leslie' })
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn({
      id: 1,
      title: 'test',
      content: 'test',
      visibility: 'private',
      createdAt: expect.any(String)
    }))
  })

  const testNotWriteListPublic = useTest('/blog/1', 'get')
  test('login view public blog', async () => {
    await queryInsert({
      table: 'blogs',
      data: {
        id: 1,
        title: 'test',
        content: 'test',
        visibility: 'public'
      }
    })
    const { status, body } = await testNotWriteListPublic(undefined, { id: '1', username: 'yahoo' })
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn({
      id: 1,
      title: 'test',
      content: 'test',
      visibility: 'public',
      createdAt: expect.any(String)
    }))
  })

  const testNotWriteListPrivate = useTest('/blog/1', 'get')
  test('login view private blog', async () => {
    await queryInsert({
      table: 'blogs',
      data: {
        id: 1,
        title: 'test',
        content: 'test',
        visibility: 'private'
      }
    })
    const { status, body } = await testNotWriteListPrivate(undefined, { id: '1', username: 'yahoo' })
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })
})
