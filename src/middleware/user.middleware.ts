import { verify as jwtVerify } from 'jsonwebtoken'
import { getUserInfo } from '@/service'
import { useThrowError, throwError, encrypt, verifyWriteList } from '@/utils'
import { PUBLIC_KEY } from '@/app/config'
import type { Context, Next } from 'koa'
import type { JwtPayload } from 'jsonwebtoken'
import type { ErrorTypeKey, LoginParams, RegisterParams } from '@/types'

// Verify user submitted params for login
export const verifyLoginParams = async (ctx: Context, next: Next) => {
  const { username, password } = ctx.request.body as Partial<LoginParams>
  if (!username || !password) return throwError(ctx, 'Username Or Password Cannot Be Empty!', 400)
  const user = await getUserInfo(username)
  if (!user) return throwError(ctx, 'User Does Not Exists!', 400)
  if (user.password !== encrypt(password)) return throwError(ctx, 'Password Was Incorrect!', 400)
  ctx.user = user
  await next()
}

// Verify user submitted params for register
export const verifyRegisterParams = async (ctx: Context, next: Next) => {
  const { username, password, confirmPassword } = ctx.request.body as Partial<RegisterParams>
  if (!username || !password || !confirmPassword) return throwError(ctx, 'Username Or Password Cannot Be Empty!', 400)
  if (password !== confirmPassword) return throwError(ctx, 'Passwords Were Different!', 400)
  const user = await getUserInfo(username)
  if (user) return throwError(ctx, 'User Has Already Exists!', 409)
  await next()
}

// Encrypt a password before saving it to the database
export const encryptPassword = async (ctx: Context, next: Next) => {
  const { password } = ctx.request.body as RegisterParams
  (ctx.request.body as RegisterParams).password = encrypt(password)
  await next()
}

// check the user's token but don't throw an error
export const checkAuth = async (ctx: Context, next: Next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) return await next()
  try {
    const token = authorization.replace('Bearer ', '')
    ctx.user = jwtVerify(token, PUBLIC_KEY, { algorithms: ['RS384'] })
    await next()
  } catch (err) {
    return throwError(ctx, 'Unauthorized!', 401)
  }
}

// Verify the user's token and throw an error if it is invalid
export const verifyAuth = async (ctx: Context, next: Next) => {
  const { headers: { authorization } } = ctx
  if (!authorization) return throwError(ctx, 'Unauthorized!', 401)
  try {
    const token = authorization.replace('Bearer ', '')
    const user = jwtVerify(token, PUBLIC_KEY, { algorithms: ['RS384'] }) as JwtPayload
    if (!verifyWriteList(user.username)) return throwError(ctx, 'Unauthorized!', 401)
  } catch (err) {
    return throwError(ctx, 'Unauthorized!', 401)
  }
  try {
    await next()
  } catch (err) {
    return useThrowError(ctx, (err as Error).message as ErrorTypeKey)
  }
}
