import { useTest, useErrorReturn } from '@/utils'

describe('create project', () => {
  const testFn = useTest('/file/image', 'post')

  describe('no permission', () => {
    test('not login', async () => {
      const { body, status } = await testFn(undefined)
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('normal permission', () => {
    const userInfo = { id: 1, username: 'leslie', permission: 'normal' } as const

    test('no image', async () => {
      const { body, status } = await testFn(undefined, userInfo)
      expect(status).toBe(400)
      expect(body).toEqual(useErrorReturn('Image Is Incorrectly Formatted Or Cannot Be Empty!'))
    })

    // TODO - not image case
    test('not image', async () => {
    })

    // TODO - save success case
    test('save success', async () => {
    })
  })
})
