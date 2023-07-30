import { useTest, useErrorReturn, useSuccessReturn } from '@/utils'

describe('delete blog', () => {
  test('not login', async () => {
    const testFn = useTest('/blog/1', 'delete')
    const { status, body } = await testFn()
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('invalid id', async () => {
    const testFn = useTest('/blog/xxx', 'delete')
    const { status, body } = await testFn(undefined, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
  })

  test('blog not exists', async () => {
    const testFn = useTest('/blog/999', 'delete')
    const { status, body } = await testFn(undefined, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Blog Dose Not Exists!'))
  })

  test('ordinary people delete their own blog', async () => {
    const testFn = useTest('/blog/13', 'delete')
    const { status, body } = await testFn(undefined, true, { id: 13, username: 'cabbage' })
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn(null, 'Delete Success!'))
  })

  test('ordinary people delete someone else\'s blog', async () => {
    const testFn = useTest('/blog/3', 'delete')
    const { status, body } = await testFn(undefined, true, { id: 13, username: 'cabbage' })
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('leslie delete someone else\'s blog', async () => {
    const testFn = useTest('/blog/14', 'delete')
    const { status, body } = await testFn(undefined, true)
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn(null, 'Delete Success!'))
  })
})
