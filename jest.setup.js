const { useDatabase } = require('./src/app/database')

const { clearDatabase, disconnectDatabase } = useDatabase()

afterEach(async () => {
  await clearDatabase()
})

afterAll(async () => {
  await disconnectDatabase()
})

jest.setTimeout(20000)
