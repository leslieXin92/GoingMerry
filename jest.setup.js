const { useDatabase } = require('./src/app/database')

const { connectDatabase, clearDatabase, disconnectDatabase } = useDatabase()

beforeAll(async () => {
  await connectDatabase()
})

beforeEach(async () => {
  await clearDatabase()
})

afterEach(async () => {
  await clearDatabase()
})

afterAll(async () => {
  await disconnectDatabase()
})
