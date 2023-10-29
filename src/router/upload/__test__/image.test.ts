import { useTest, useErrorReturn, querySelect } from '@/utils'

describe('create project', () => {
  const testFn = useTest('/upload/image', 'post')

  test('not login', async () => {
    const { body, status } = await testFn(undefined)
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('not in write list', async () => {
    const { body, status } = await testFn(undefined, { id: 1, username: 'yahoo' })
    expect(status).toBe(401)
    expect(body).toEqual(useErrorReturn('Unauthorized!'))
  })

  test('no image', async () => {
    // const { body, status } = await testFn(undefined, { id: 1, username: 'leslie' })
    // expect(status).toBe(400)
    // expect(body).toEqual(useErrorReturn('Image Cannot Be Empty!'))
  })

  test('not image', async () => {
    // const fromData = new FormData()
    // const blob = new Blob()
    // fromData.append('image', blob, 'image.jpg')
    // const { body, status } = await testFn(fromData, { id: 1, username: 'leslie' })
    // expect(status).toBe(400)
    // expect(body).toEqual(useErrorReturn('Image Format Error!'))
  })

  test('save success', async () => {
    // const { body, status } = await testFn(undefined, { id: 1, username: 'leslie' })
    // expect(status).toBe(200)
    // const images = await querySelect({
    //   table: 'files',
    //   columns: ['id']
    // })
    // expect(body).toEqual({
    //   code: 0,
    //   data: { imageUrl: expect.any(String) },
    //   msg: 'Save Success!'
    // })
    // expect(images.length).toBe(1)
  })
})
