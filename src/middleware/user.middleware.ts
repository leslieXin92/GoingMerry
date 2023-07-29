import { getUserInfo } from '@/service'
import { encrypt } from '@/utils'
import type { Next } from 'koa'
import type { CustomContext, LoginParams, RegisterParams } from '@/types'

export const verifyLoginUserInfo = async (ctx: CustomContext<LoginParams>, next: Next) => {
  const { username, password } = ctx.request.body
  if (!username || !password) return ctx.app.emit('error', new Error('name_or_password_is_required'), ctx)
  const user = await getUserInfo(username)
  if (!user) return ctx.app.emit('error', new Error('user_does_not_exists'), ctx)
  if (user.password !== encrypt(password)) return ctx.app.emit('error', new Error('password_is_incorrect'), ctx)
  ctx.user = user
  await next()
}

export const verifyRegisterUserInfo = async (ctx: CustomContext<RegisterParams>, next: Next) => {
  const { username, password, confirmPassword } = ctx.request.body
  if (!username || !password || !confirmPassword) return ctx.app.emit('error', new Error('name_or_password_is_required'), ctx)
  if (password !== confirmPassword) return ctx.app.emit('error', new Error('password_is_not_same'), ctx)
  const user = await getUserInfo(username)
  if (user) return ctx.app.emit('error', new Error('user_has_already_exists'), ctx)
  await next()
}

export const encryptPassword = async (ctx: CustomContext<RegisterParams>, next: Next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = encrypt(password)
  await next()
}
