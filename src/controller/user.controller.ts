import jwt from 'jsonwebtoken'
import { Context } from 'koa'
import { PRIVATE_KEY } from '@/app/config'
import { LoginResult } from '@/types'

export const login = async (ctx: Context): Promise<LoginResult> => {
  const { id, username } = ctx.user
  const token = jwt.sign({ id, username }, PRIVATE_KEY, {
    expiresIn: 60 * 60 * 24,
    algorithm: 'RS384'
  })
  return ctx.body = { id, username, token }
}
