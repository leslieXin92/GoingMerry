import { execute } from '@/app/database'

export const querySelect = <T = unknown>(query: { table: string, where: Record<string, any>, columns: string[] }) => {
  const { table, where, columns } = query
  const statement = `
    SELECT ${columns.join(',')}
    FROM ${table}
    WHERE ${Object.keys(where).map(key => `${key} = ?`).join(' AND ')}
   `
  return execute(statement, Object.values(where)) as Promise<T[]>
}

export const queryInsert = (query: { table: string, data: Record<string, any> }) => {
  const { table, data } = query
  const keys = Object.keys(data)
  const values = Object.values(data)
  const statement = `
    INSERT INTO ${table}
    (${keys.join(',')}) VALUES (${keys.map(() => '?').join(',')})
  `
  return execute(statement, values) as Promise<unknown>
}

export const queryUpdate = (query: { table: string, keys: string[], where: Record<string, any>, data: Record<string, any> }) => {
  const { table, keys, where, data } = query
  const statement = `
    UPDATE ${table}
    SET ${keys.map(key => `${key} = ?`).join(',')}
    WHERE ${Object.keys(where).map(key => `${key} = ?`).join(' AND ')}
  `
  return execute(statement, [...Object.values(data), ...Object.values(where)]) as Promise<unknown>
}

export const queryDelete = (query: { table: string, where: Record<string, any> }) => {
  const { table, where } = query
  const statement = `
    DELETE FROM ${table}
    WHERE ${Object.keys(where).map(key => `${key} = ?`).join(' AND ')}
  `
  return execute(statement, Object.values(where)) as Promise<unknown>
}