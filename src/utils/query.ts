import { useDatabase } from '@/app/database'
import { UserInfo } from '@/types'

type Table = 'users' | 'blogs' | 'projects' | 'files'

interface SelectQuery {
  table: Table,
  where?: Record<string, any>,
  columns: string[]
}

interface InsertQuery {
  table: Table,
  data: Record<string, any>
}

interface UpdateQuery {
  table: Table,
  where: Record<string, any>,
  update: Record<string, any>
}

interface DeleteQuery {
  table: Table,
  where: Record<string, any>
}

export const querySelect = async <T = unknown>(query: SelectQuery) => {
  const { connectDatabase, disconnectDatabase, execute } = useDatabase()
  await connectDatabase()
  const { table, where = {}, columns } = query
  const whereClause = Object.keys(where).length > 0
    ? `WHERE ${Object.keys(where).map(key => `${key} = ?`).join(' AND ')}`
    : ''
  const statement = `
    SELECT ${columns.join(',')}
    FROM ${table}
    ${whereClause}
 `
  const res = await execute(statement, Object.values(where))
  await disconnectDatabase()
  return res[0] as unknown as Promise<T>
}

export const queryInsert = async (query: InsertQuery) => { // TODO - 消费queryInsert时可以对query中的data进行类型断言
  const { connectDatabase, disconnectDatabase, execute } = useDatabase()
  await connectDatabase()
  const { table, data } = query
  const keys = Object.keys(data)
  const values = Object.values(data)
  const statement = `
    INSERT INTO ${table}
    (${keys.join(',')}) VALUES (${keys.map(() => '?').join(',')})
  `
  await execute(statement, values)
  await disconnectDatabase()
}

export const queryUpdate = async (query: UpdateQuery) => {
  const { connectDatabase, disconnectDatabase, execute } = useDatabase()
  await connectDatabase()
  const { table, where, update } = query
  const statement = `
    UPDATE ${table}
    SET ${Object.keys(update).map(key => `${key} = ?`).join(',')}
    WHERE ${Object.keys(where).map(key => `${key} = ?`).join(' AND ')}
  `
  await execute(statement, [...Object.values(update), ...Object.values(where)])
  await disconnectDatabase()
}

export const queryDelete = async (query: DeleteQuery) => {
  const { connectDatabase, disconnectDatabase, execute } = useDatabase()
  await connectDatabase()
  const { table, where } = query
  const statement = `
    DELETE FROM ${table}
    WHERE ${Object.keys(where).map(key => `${key} = ?`).join(' AND ')}
  `
  await execute(statement, Object.values(where))
  await disconnectDatabase()
}
