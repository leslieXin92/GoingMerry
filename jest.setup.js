const { clearDatabase } = require('./src/app/database')

beforeEach(async () => await clearDatabase())
afterEach(async () => await clearDatabase())
