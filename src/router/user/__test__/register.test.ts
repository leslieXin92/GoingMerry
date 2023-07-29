import { useTest, useErrorReturn, useSuccessReturn } from '@/utils'
import type { RegisterParams } from '@/types'

describe('register', () => {
  const testFn = useTest<RegisterParams>('/user/register', 'post')

  test('no username', async () => {
    const params = {
      username: '',
      password: 'leslie',
      confirmPassword: 'leslie'
    }
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Username Or Password Cannot Be Empty!'))
  })

  test('no password', async () => {
    const params = {
      username: 'leslie',
      password: '',
      confirmPassword: ''
    }
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Username Or Password Cannot Be Empty!'))
  })

  test('no confirmPassword', async () => {
    const params = {
      username: 'leslie',
      password: 'leslie',
      confirmPassword: ''
    }
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Username Or Password Cannot Be Empty!'))
  })

  test('password is not same', async () => {
    const params = {
      username: 'leslie',
      password: 'leslie',
      confirmPassword: 'cabbage'
    }
    const { status, body } = await testFn(params)
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Password Is Not Same!'))
  })

  test('user already exists', async () => {
    const params = {
      username: 'leslie',
      password: 'leslie',
      confirmPassword: 'leslie'
    }
    const { status, body } = await testFn(params)
    expect(status).toBe(409)
    expect(body).toEqual(useErrorReturn('User Has Already Exists!'))
  })

  test('register successfully', async () => {
    const params = {
      username: 'leslie',
      password: 'leslie',
      confirmPassword: 'leslie'
    }
    const { status, body } = await testFn(params)
    expect(status).toBe(200)
    expect(body).toEqual(
      useSuccessReturn(null, 'Register Success!')
    )
  })
})
