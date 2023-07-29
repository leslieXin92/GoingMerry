import { sign } from 'jsonwebtoken'
import { createUser } from '@/service'
import { useSuccessReturn } from '@/utils'
import { PRIVATE_KEY } from '@/app/config'
import type { Context } from 'koa'
import type { CustomContext, RegisterParams } from '@/types'

export const login = async (ctx: Context) => {
  const { id, username } = ctx.user
  const token = sign({ id, username }, PRIVATE_KEY, {
    expiresIn: 60 * 60 * 24,
    algorithm: 'RS384'
  })
  ctx.body = useSuccessReturn({ id, username, token }, 'Login Success!')
}

export const register = async (ctx: CustomContext<RegisterParams>) => {
  const { username, password } = ctx.request.body
  await createUser(username, password)
  ctx.body = useSuccessReturn(null, 'Register Success!')
}
