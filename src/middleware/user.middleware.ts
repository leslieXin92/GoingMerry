import { Next } from 'koa'
import { CustomContext, LoginParams } from '@/types'
import { getUserInfoByName } from '@/service/user.service'

export const verifyLogin = async (ctx: CustomContext<LoginParams>, next: Next) => {
  const { username, password } = ctx.request.body
  if (!username || !password) return ctx.app.emit('error', new Error('name_or_password_is_required'), ctx)

  const res = await getUserInfoByName(username)
  if (!res) return ctx.app.emit('error', new Error('user_does_not_exists'), ctx)
  if (password !== res.password) return ctx.app.emit('error', new Error('password_is_incorrect'), ctx)

  ctx.user = res
  await next()
}
