import { useTest, queryInsert, useErrorReturn, useSuccessReturn, encrypt } from '@/utils'
import type { LoginParams } from '@/types'

describe('login', () => {
  const testFn = useTest<LoginParams>('/user/login', 'post')

  test('no username', async () => {
    const password = 'leslie'
    const { status, body } = await testFn({ password })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Username Or Password Cannot Be Empty!'))
  })

  test('no password', async () => {
    const username = 'leslie'
    const { status, body } = await testFn({ username })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Username Or Password Cannot Be Empty!'))
  })

  test('user does not exist', async () => {
    const username = 'cabbage'
    const password = 'cabbage'
    const { status, body } = await testFn({ username, password })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('User Does Not Exists!'))
  })

  test('password is incorrect', async () => {
    await queryInsert({
      table: 'users',
      data: {
        username: 'leslie',
        password: encrypt('leslie')
      }
    })
    const username = 'leslie'
    const password = 'cabbage'
    const { status, body } = await testFn({ username, password })
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Password Is Incorrect!'))
  })

  test('login successfully', async () => {
    await queryInsert({
      table: 'users',
      data: {
        username: 'leslie',
        password: encrypt('leslie')
      }
    })
    const username = 'leslie'
    const password = 'leslie'
    const { status, body } = await testFn({ username, password })
    expect(status).toBe(200)
    expect(body).toEqual(useSuccessReturn({
      id: expect.any(Number),
      username,
      token: expect.any(String)
    }, 'Login Success!'))
  })
})
