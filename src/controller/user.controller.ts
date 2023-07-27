import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '@/app/config'
import type { Context } from 'koa'
import type { LoginResult } from '@/types'

export const login = async (ctx: Context): Promise<LoginResult> => {
  const { id, username } = ctx.user
  const token = jwt.sign({ id, username }, PRIVATE_KEY, {
    expiresIn: 60 * 60 * 24,
    algorithm: 'RS384'
  })
  return ctx.body = { id, username, token }
}
