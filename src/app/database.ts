import { createPool, PoolConnection } from 'mysql2'
import { MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } from './config'

export const useDatabase = () => {
  const connection = createPool({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
  })

  const connectDatabase = async () => {
    connection.getConnection((err: Error | null, connection: PoolConnection) => {
      if (err) return console.log(`\x1b[41m\x1b[30m\x1b[1m ⛈️ ⛈️ GoingMerry failed to set sail! \x1b[0m \x1b[41m\x1b[30m\x1b[1m Because of ${err.message} \x1b[0m`)
      console.log('\x1b[44m\x1b[30m\x1b[1m 🐬 🐬 We arrived in All Blue! \x1b[0m')
    })
  }

  const clearDatabase = async () => {
    const tables = ['users', 'blogs', 'files', 'projects']
    await Promise.all(tables.map(async table => {
      await connection.promise().execute(`DELETE FROM ${table}`)
    }))
  }

  const disconnectDatabase = async () => {
    connection.end((err: Error | null) => {
      if (err) return console.log(`\x1b[41m\x1b[30m\x1b[1m ⛈️ ⛈️ GoingMerry failed to leave! \x1b[0m \x1b[41m\x1b[30m\x1b[1m Because of ${err.message} \x1b[0m`)
      console.log('\x1b[43m\x1b[30m\x1b[1m 🐬 🐬 It is time to say goodbye to All Blue! \x1b[0m')
    })
  }

  return {
    connectDatabase,
    clearDatabase,
    disconnectDatabase,
    execute: connection.promise().execute.bind(connection.promise())
  }
}
