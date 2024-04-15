import { sign } from 'jsonwebtoken'
import { createUser, getUser } from '@/service'
import { throwError, useErrorReturn, useSuccessReturn } from '@/utils'
import { PRIVATE_KEY } from '@/app/config'
import type { Context } from 'koa'
import type { UserInfo, RegisterParams, AutoLoginParamsParams } from '@/types'

export const handleLogin = async (ctx: Context) => {
  try {
    const { id, username, permission } = ctx.user as UserInfo
    const token = sign({ id, username, permission }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS384'
    })
    ctx.body = useSuccessReturn({ id, username, permission, token }, 'Login Success!')
  } catch (e) {
    throwError(ctx, (e as Error).message, 500)
  }
}

export const handleRegister = async (ctx: Context) => {
  try {
    const { username, password, permission = 'normal' } = ctx.request.body as RegisterParams
    await createUser(username, password, permission)
    ctx.body = useSuccessReturn(null, 'Register Success!')
  } catch (e) {
    throwError(ctx, (e as Error).message, 500)
  }
}

export const handleAutoLogin = async (ctx: Context) => {
  const { username, id, permission } = ctx.request.body as AutoLoginParamsParams
  const user = await getUser(id)
  if (user && user.username === username && user.permission === permission) {
    const token = sign({ id, username, permission }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS384'
    })
    ctx.body = useSuccessReturn({ id, username, permission, token }, 'Auto Login Success!')
  } else {
    ctx.body = useErrorReturn('Auto Login Failed!')
  }
}
