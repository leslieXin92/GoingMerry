import { useTest, queryInsert, useErrorReturn, useSuccessReturn, encrypt } from '@/utils'
import type { LoginParams } from '@/types'

describe('login', () => {
  const testFn = useTest<LoginParams>('/user/login', 'post')

  it('no username', async () => {
    const params = { password: 'leslie' }
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Username Cannot Be Empty!'))
  })

  it('no password', async () => {
    const params = { username: 'leslie' }
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Password Cannot Be Empty!'))
  })

  it('user does not exist', async () => {
    const params: LoginParams = { username: 'leslie', password: 'leslie' }
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('User Does Not Exists!'))
  })

  it('password is incorrect', async () => {
    const params: LoginParams = { username: 'leslie', password: 'cabbage' }
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
    it('normal', async () => {
      const params: LoginParams = { username: 'leslie', password: 'leslie' }
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

    it('admin', async () => {
      await queryInsert({
        table: 'users',
        data: {
          username: 'leslie',
          password: encrypt('leslie'),
          permission: 'admin'
        }
      })
      const params: LoginParams = { username: 'leslie', password: 'leslie' }
      const { status, body } = await testFn(params)
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn(
        {
          id: expect.any(Number),
          username: 'leslie',
          token: expect.any(String),
          permission: 'admin'
        },
        'Login Success!'
      ))
    })
  })
})
