import { useTest, useErrorReturn } from '@/utils'

describe('create project', () => {
  const testFn = useTest('/file/image', 'post')

  describe('not login', () => {
    test('not login', async () => {
      const { body, status } = await testFn(undefined)
      expect(status).toBe(401)
      expect(body).toEqual(useErrorReturn('Unauthorized!'))
    })
  })

  describe('normal permission', () => {
    test('no image', async () => {
      const { body, status } = await testFn(undefined, { id: 1, username: 'leslie', permission: 'normal' })
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
