import { queryInsert, useErrorReturn, useSuccessReturn, useTest } from '@/utils'

describe('get project item', () => {
  const testInvalidId = useTest('/project/xxx', 'get')
  const testFn = useTest('/project/1', 'get')

  it('invalid id ', async () => {
    const { status, body } = await testInvalidId()
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Id Is Invalid!'))
  })

  it('project not exists', async () => {
    const { status, body } = await testFn()
    expect(status).toBe(400)
    expect(body).toEqual(useErrorReturn('Project Dose Not Exists!'))
  })

  it('get project item success', async () => {
    await queryInsert({
      table: 'projects',
      data: {
        id: 1,
        name: 'GoingMerry',
        coverIcon: 'coverIcon',
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
    expect(body).toMatchObject(useSuccessReturn({
      id: 1,
      name: 'GoingMerry',
      coverIcon: 'coverIcon',
      technologyStack: ['a', 'b'],
      description: 'description',
      status: 'doing',
      startAt: '2024-03-20'
    }))
  })
})
