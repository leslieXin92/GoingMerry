import { verify as jwtVerify } from 'jsonwebtoken'
import { getUserInfo } from '@/service'
import { throwError, encrypt } from '@/utils'
import { PUBLIC_KEY } from '@/app/config'
import type { Context, Next } from 'koa'
import type { JwtPayload } from 'jsonwebtoken'
import type { AutoLoginParamsParams, LoginParams, RegisterParams } from '@/types'

/**
 * Verify user's submitting params for login
 */
export const verifyLoginParams = async (ctx: Context, next: Next) => {
  const { username, password } = ctx.request.body as Partial<LoginParams>
  if (!username) return throwError(ctx, 'Username Cannot Be Empty!', 400)
  if (!password) return throwError(ctx, 'Password Cannot Be Empty!', 400)
  const user = await getUserInfo(username)
  if (!user) return throwError(ctx, 'User Does Not Exists!', 400)
  if (user.password !== encrypt(password)) return throwError(ctx, 'Password Is Incorrect!', 400)
  ctx.user = user
  await next()
}

/**
 * Verify user's submitting params for register
 */
export const verifyRegisterParams = async (ctx: Context, next: Next) => {
  const { username, password, confirmPassword } = ctx.request.body as Partial<RegisterParams>
  if (!username) return throwError(ctx, 'Username Cannot Be Empty!', 400)
  if (!password) return throwError(ctx, 'Password Cannot Be Empty!', 400)
  if (!confirmPassword) return throwError(ctx, 'ConfirmPassword Cannot Be Empty!', 400)
  if (password !== confirmPassword) return throwError(ctx, 'Passwords Are Different!', 400)
  const user = await getUserInfo(username)
  if (user) return throwError(ctx, 'User Has Already Exists!', 409)
  await next()
}

export const verifyAutoLoginParams = async (ctx: Context, next: Next) => {
  const { username, id, permission } = ctx.request.body as Partial<AutoLoginParamsParams>
  if (!username) return throwError(ctx, 'Username Cannot Be Empty!', 400)
  if (!id) return throwError(ctx, 'Id Cannot Be Empty!', 400)
  if (!permission) return throwError(ctx, 'Permission Cannot Be Empty!', 400)
  await next()
}

/**
 * Encrypt password before saving it to the database
 */
export const encryptPassword = async (ctx: Context, next: Next) => {
  const { password } = ctx.request.body as RegisterParams
  (ctx.request.body as RegisterParams).password = encrypt(password)
  await next()
}

/**
 * Check the user's token but don't throw an error
 */
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

/**
 * Verify the user's token and throw an error if it's invalid
 */
export const verifyAuth = async (ctx: Context, next: Next) => {
  const { headers: { authorization } } = ctx
  if (!authorization) return throwError(ctx, 'Unauthorized!', 401)
  try {
    const token = authorization.replace('Bearer ', '')
    const user = jwtVerify(token, PUBLIC_KEY, { algorithms: ['RS384'] }) as JwtPayload
    if (!user) return throwError(ctx, 'Unauthorized!', 401)
    ctx.user = user
    await next()
  } catch (e) {
    return throwError(ctx, (e as Error).message, 401)
  }
}

/**
 * Verify the user's super admin permission and throw an error if it's invalid
 */
export const verifySuperAuth = async (ctx: Context, next: Next) => {
  const { headers: { authorization } } = ctx
  if (!authorization) return throwError(ctx, 'Unauthorized!', 401)
  try {
    const token = authorization.replace('Bearer ', '')
    const user = jwtVerify(token, PUBLIC_KEY, { algorithms: ['RS384'] }) as JwtPayload
    if (user.permission !== 'superAdmin') return throwError(ctx, 'Unauthorized!', 401)
    ctx.user = user
    await next()
  } catch (err) {
    return throwError(ctx, 'Unauthorized!', 401)
  }
}
