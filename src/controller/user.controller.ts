import { sign } from 'jsonwebtoken'
import { createUser } from '@/service'
import { useSuccessReturn } from '@/utils'
import { PRIVATE_KEY } from '@/app/config'
import type { Context } from 'koa'
import type { UserInfo, RegisterParams } from '@/types'

export const handleLogin = async (ctx: Context) => {
  const { id, username } = ctx.user as UserInfo
  const token = sign({ id, username }, PRIVATE_KEY, {
    expiresIn: 60 * 60 * 24,
    algorithm: 'RS384'
  })
  ctx.body = useSuccessReturn({ id, username, token }, 'Login Success!')
}

export const handleRegister = async (ctx: Context) => {
  const { username, password } = ctx.request.body as RegisterParams
  await createUser(username, password)
  ctx.body = useSuccessReturn(null, 'Register Success!')
}
