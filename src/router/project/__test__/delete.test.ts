import { useTest, useErrorReturn, useSuccessReturn, queryInsert } from '@/utils'

describe('delete project', () => {
  const testNotLogin = useTest('/project/1', 'delete')
  test('not login', async () => {
    const { status, body } = await testNotLogin()
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  const testNotWriteList = useTest('/project/1', 'delete')
  test('not login', async () => {
    const { status, body } = await testNotWriteList(undefined, { id: 1, username: 'yahoo' })
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  const testInvalidId = useTest('/project/xxx', 'delete')
  test('invalid id', async () => {
    const { status, body } = await testInvalidId(undefined, { id: 1, username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
  })

  const testNotExists = useTest('/project/1', 'delete')
  test('project not exists', async () => {
    const { status, body } = await testNotExists(undefined, { id: 1, username: 'leslie' })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Project Dose Not Exists!'))
  })

  const testDeleteSuccess = useTest('/project/1', 'delete')
  test('delete success', async () => {
    await queryInsert({
      table: 'projects',
      data: {
        id: 1,
        title: 'test',
        status: 'pending'
      }
    })
    const { status, body } = await testDeleteSuccess(undefined, { id: 1, username: 'leslie' })
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn(null, 'Delete Success!'))
  })
})
