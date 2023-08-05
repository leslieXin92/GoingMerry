import { useTest, useErrorReturn, useSuccessReturn } from '@/utils'

describe('delete project', () => {
  test('not login', async () => {
    const testFn = useTest('/project/1', 'delete')
    const { status, body } = await testFn()
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('invalid id', async () => {
    const testFn = useTest('/project/xxx', 'delete')
    const { status, body } = await testFn(undefined, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
  })

  test('project not exists', async () => {
    const testFn = useTest('/project/999', 'delete')
    const { status, body } = await testFn(undefined, true)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Project Dose Not Exists!'))
  })

  test('ordinary people delete project', async () => {
    const testFn = useTest('/project/1', 'delete')
    const { status, body } = await testFn(undefined, true, { id: 13, username: 'cabbage' })
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('leslie delete project', async () => {
    const testFn = useTest('/project/1', 'delete')
    const { status, body } = await testFn(undefined, true)
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn(null, 'Delete Success!'))
  })
})
