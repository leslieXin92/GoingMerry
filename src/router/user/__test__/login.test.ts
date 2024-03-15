import { useTest, queryInsert, useErrorReturn, useSuccessReturn, encrypt } from '@/utils'
import type { LoginParams } from '@/types'

describe('login', () => {
  const testFn = useTest<LoginParams>('/user/login', 'post')

  test('no username', async () => {
    const params = {
      password: 'leslie'
    }
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Username Cannot Be Empty!'))
  })

  test('no password', async () => {
    const params = {
      username: 'leslie'
    }
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Password Cannot Be Empty!'))
  })

  test('user does not exist', async () => {
    const params = { username: 'leslie', password: 'leslie' }
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('User Does Not Exists!'))
  })

  test('password is incorrect', async () => {
    const params = { username: 'leslie', password: 'cabbage' }
    await queryInsert({
      table: 'users',
      data: {
        username: 'leslie',
        password: encrypt('leslie')
      }
    })
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Password Is Incorrect!'))
  })

  describe('login successfully', () => {
    test('normal', async () => {
      const params = { username: 'leslie', password: 'leslie' }
      await queryInsert({
        table: 'users',
        data: {
          username: 'leslie',
          password: encrypt('leslie')
        }
      })
      const { status, body } = await testFn(params)
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn(
        {
          id: expect.any(Number),
          username: 'leslie',
          token: expect.any(String),
          permission: 'normal'
        },
        'Login Success!'
      ))
    })

    test('admin', async () => {
      const username = 'leslie'
      const password = 'leslie'
      const permission = 'admin'
      await queryInsert({
        table: 'users',
        data: {
          username,
          password: encrypt(password),
          permission
        }
      })
      const { status, body } = await testFn({ username, password })
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn(
        {
          id: expect.any(Number),
          username,
          token: expect.any(String),
          permission
        },
        'Login Success!'
      ))
    })
  })
})
