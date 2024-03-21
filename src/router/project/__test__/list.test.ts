import { useTest, queryInsert, useSuccessReturn } from '@/utils'

describe('get project list', () => {
  const testFn = useTest('/project', 'get')

  it('get project list success', async () => {
    await queryInsert({
      table: 'projects',
      data: {
        name: 'GoingMerry',
        technologyStack: ['a', 'b'],
        description: 'description',
        status: 'doing',
        startAt: new Date('2024-03-20'),
        createdBy: 1,
        updatedBy: 1
      }
    })

    const { status, body } = await testFn()
    expect(status).toBe(200)
    expect(body).toMatchObject(useSuccessReturn([{
      id: expect.any(Number),
      name: 'GoingMerry',
      technologyStack: ['a', 'b'],
      description: 'description',
      status: 'doing'
    }]))
  })
})
