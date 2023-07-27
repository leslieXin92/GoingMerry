import { createPool, PoolConnection } from 'mysql2'
import {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} from './config'

const connection = createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD
})

connection.getConnection((err: Error | null, connection: PoolConnection) => {
  connection.connect((err) => {
    if (err) return console.log('database connect failure!')
    console.log('database connect success!')
  })
})

export default connection.promise()
