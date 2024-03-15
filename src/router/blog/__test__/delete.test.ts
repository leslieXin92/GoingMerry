import { useTest, useErrorReturn, useSuccessReturn, queryInsert } from '@/utils'

describe('delete blog', () => {
  const testNotLogin = useTest('/blog/1', 'delete')
  test('not login', async () => {
    const { status, body } = await testNotLogin()
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  const testNotInWriteList = useTest('/blog/1', 'delete')
  test('not in write list', async () => {
    const { status, body } = await testNotInWriteList(undefined, { id: '1', username: 'yahoo' })
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  const testInvalidId = useTest('/blog/xxx', 'delete')
  test('invalid id', async () => {
    const { status, body } = await testInvalidId(undefined, { id: '1', username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
  })

  const testNotExists = useTest('/blog/1', 'delete')
  test('blog not exists', async () => {
    const { status, body } = await testNotExists(undefined, { id: '1', username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Blog Dose Not Exists!'))
  })

  const testDeleteSuccess = useTest('/blog/1', 'delete')
  test('delete success', async () => {
    await queryInsert({
      table: 'blogs',
      data: {
        id: 1,
        title: 'test',
        content: 'test',
        visibility: 'private'
      }
    })
    const { status, body } = await testDeleteSuccess(undefined, { id: '1', username: 'leslie' })
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn(null, 'Delete Success!'))
  })
})
