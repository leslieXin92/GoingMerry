import { execute } from '@/app/database'

interface SelectQuery {
  table: string,
  where: Record<string, any>,
  columns: string[]
}

interface InsertQuery {
  table: string,
  data: Record<string, any>
}

interface UpdateQuery {
  table: string,
  columns: string[],
  where: Record<string, any>,
  data: Record<string, any>
}

interface DeleteQuery {
  table: string,
  where: Record<string, any>
}

export const querySelect = async <T = unknown>(query: SelectQuery) => {
  const { table, where, columns } = query
  const statement = `
    SELECT ${columns.join(',')}
    FROM ${table}
    WHERE ${Object.keys(where).map(key => `${key} = ?`).join(' AND ')}
   `
  const res = await execute(statement, Object.values(where))
  return res[0] as unknown as Promise<T[]>
}

export const queryInsert = (query: InsertQuery) => {
  const { table, data } = query
  const keys = Object.keys(data)
  const values = Object.values(data)
  const statement = `
    INSERT INTO ${table}
    (${keys.join(',')}) VALUES (${keys.map(() => '?').join(',')})
  `
  return execute(statement, values) as Promise<unknown>
}

export const queryUpdate = (query: UpdateQuery) => {
  const { table, columns, where, data } = query
  const statement = `
    UPDATE ${table}
    SET ${columns.map(column => `${column} = ?`).join(',')}
    WHERE ${Object.keys(where).map(key => `${key} = ?`).join(' AND ')}
  `
  return execute(statement, [...Object.values(data), ...Object.values(where)]) as Promise<unknown>
}

export const queryDelete = (query: DeleteQuery) => {
  const { table, where } = query
  const statement = `
    DELETE FROM ${table}
    WHERE ${Object.keys(where).map(key => `${key} = ?`).join(' AND ')}
  `
  return execute(statement, Object.values(where)) as Promise<unknown>
}
