import { encrypt, useTest, queryInsert, useErrorReturn, useSuccessReturn, querySelect } from '@/utils'
import type { RegisterParams } from '@/types'

describe('register', () => {
  const testFn = useTest<RegisterParams>('/user/register', 'post')

  it('no username', async () => {
    const params: RegisterParams = {
      username: '',
      password: 'leslie',
      confirmPassword: 'leslie'
    }
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Username Cannot Be Empty!'))
  })

  it('no password', async () => {
    const params: RegisterParams = {
      username: 'leslie',
      password: '',
      confirmPassword: ''
    }
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Password Cannot Be Empty!'))
  })

  it('no confirmPassword', async () => {
    const params: RegisterParams = {
      username: 'leslie',
      password: 'leslie',
      confirmPassword: ''
    }
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('ConfirmPassword Cannot Be Empty!'))
  })

  it('passwords are different', async () => {
    const params: RegisterParams = {
      username: 'leslie',
      password: 'leslie',
      confirmPassword: 'cabbage'
    }
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Passwords Are Different!'))
  })

  it('user already exists', async () => {
    await queryInsert({
      table: 'users',
      data: {
        username: 'leslie',
        password: 'leslie'
      }
    })
    const params: RegisterParams = {
      username: 'leslie',
      password: 'leslie',
      confirmPassword: 'leslie'
    }
    const { status, body } = await testFn(params)
    expect(status).toBe(409)
    expect(body).toEqual(useErrorReturn('User Has Already Exists!'))
  })

  describe('register successfully', () => {
    it('normal', async () => {
      const params: RegisterParams = {
        username: 'leslie',
        password: 'leslie',
        confirmPassword: 'leslie'
      }
      const { status, body } = await testFn(params)
      const users = await querySelect({
        table: 'users',
        where: { username: 'leslie' },
        columns: ['username', 'password', 'permission']
      })
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn(null, 'Register Success!'))
      expect(users).toEqual([{
        username: 'leslie',
        password: encrypt('leslie'),
        permission: 'normal'
      }])
    })

    it('admin', async () => {
      const params: RegisterParams = {
        username: 'leslie',
        password: 'leslie',
        confirmPassword: 'leslie',
        permission: 'admin'
      }
      const { status, body } = await testFn(params)
      const users = await querySelect({
        table: 'users',
        where: { username: 'leslie' },
        columns: ['username', 'password', 'permission']
      })
      expect(status).toBe(200)
      expect(body).toEqual(useSuccessReturn(null, 'Register Success!'))
      expect(users).toEqual([{
        username: 'leslie',
        password: encrypt('leslie'),
        permission: 'admin'
      }])
    })
  })
})
