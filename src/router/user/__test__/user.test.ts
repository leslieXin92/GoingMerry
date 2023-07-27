import request from 'supertest'
import index from '@/app'

describe('User API', () => {
  test('GET /user/:id should return user information', async () => {
    const userId = '12345' // 假设要获取的用户ID
    const response = await request(index.callback()).get(`/user/${userId}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: userId,
      name: 'John Doe',
      email: 'john@example.com'
    })
  })
})
