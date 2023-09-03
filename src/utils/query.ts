import { execute } from '@/app/database'

interface SelectQuery {
  table: string,
  where?: Record<string, any>,
  columns: string[]
}

interface InsertQuery {
  table: string,
  data: Record<string, any>
}

interface UpdateQuery {
  table: string,
  where: Record<string, any>,
  update: Record<string, any>
}

interface DeleteQuery {
  table: string,
  where: Record<string, any>
}

export const querySelect = async <T = unknown>(query: SelectQuery) => {
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
  return res[0] as unknown as Promise<T>
}

export const queryInsert = async (query: InsertQuery) => {
  const { table, data } = query
  const keys = Object.keys(data)
  const values = Object.values(data)
  const statement = `
    INSERT INTO ${table}
    (${keys.join(',')}) VALUES (${keys.map(() => '?').join(',')})
  `
  await execute(statement, values)
}

export const queryUpdate = async (query: UpdateQuery) => {
  const { table, where, update } = query
  const statement = `
    UPDATE ${table}
    SET ${Object.keys(update).map(key => `${key} = ?`).join(',')}
    WHERE ${Object.keys(where).map(key => `${key} = ?`).join(' AND ')}
  `
  await execute(statement, [...Object.values(update), ...Object.values(where)])
}

export const queryDelete = async (query: DeleteQuery) => {
  const { table, where } = query
  const statement = `
    DELETE FROM ${table}
    WHERE ${Object.keys(where).map(key => `${key} = ?`).join(' AND ')}
  `
  await execute(statement, Object.values(where))
}
