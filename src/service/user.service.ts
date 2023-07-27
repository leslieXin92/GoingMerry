import connection from '@/app/database'

export const getUserInfoByName = async (name: string) => {
  // const statement = `SELECT * FROM user WHERE name = ?;`
  // const [res] = await connection.execute(statement, [name])
  // return res
  if (name !== 'leslie') return null
  return { id: 0, username: 'leslie', password: 'leslie' }
}
