import { useTest } from '@/utils'
import type { LoginParams } from '@/types'

describe('User', () => {
  const testFn = useTest<LoginParams>('/user/login', 'post')

  test('no username', async () => {
    const password = 'leslie'
    const { status, text } = await testFn({ password })
    expect(status).toBe(400)
    expect(text).toEqual('Username Or Password Cannot Be Empty!')
  })

  test('no password', async () => {
    const username = 'leslie'
    const { status, text } = await testFn({ username })
    expect(status).toBe(400)
    expect(text).toEqual('Username Or Password Cannot Be Empty!')
  })

  test('user does not exist', async () => {
    const username = 'cabbage'
    const password = 'cabbage'
    const { status, text } = await testFn({ username, password })
    expect(status).toBe(400)
    expect(text).toEqual('User Does Not Exists!')
  })

  test('password is incorrect', async () => {
    const username = 'leslie'
    const password = 'cabbage'
    const { status, text } = await testFn({ username, password })
    expect(status).toBe(400)
    expect(text).toEqual('Password Is Incorrect!')
  })

  test('login successfully', async () => {
    const username = 'leslie'
    const password = 'leslie'
    const { status, body } = await testFn({ username, password })
    expect(status).toBe(200)
    expect(body).toEqual({
      id: expect.any(Number),
      username: 'leslie',
      token: expect.any(String)
    })
  })
})
