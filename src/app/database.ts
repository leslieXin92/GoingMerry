import { createPool, PoolConnection } from 'mysql2'
import { MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } from './config'

const connection = createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD
})

connection.getConnection((err: Error | null, connection: PoolConnection) => {
  if (err) return console.log(`\x1b[41m\x1b[30m\x1b[1m ⛈️ ⛈️ GoingMerry failed to set sail! \x1b[0m \x1b[41m\x1b[30m\x1b[1m Because of ${err.message} \x1b[0m`)
  console.log('\x1b[43m\x1b[30m\x1b[1m 🐬 🐬 We arrived in All Blue! \x1b[0m')
})

export default connection.promise().execute.bind(connection.promise())
