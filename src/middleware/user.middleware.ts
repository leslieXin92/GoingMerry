import { verify as jwtVerify } from 'jsonwebtoken'
import { getUserInfo } from '@/service'
import { useThrowError, encrypt } from '@/utils'
import { PUBLIC_KEY } from '@/app/config'
import type { Context, Next } from 'koa'
import type { CustomContext, LoginParams, RegisterParams } from '@/types'

// Verify user submitted login info
export const verifyLoginUserInfo = async (ctx: Context, next: Next) => {
  // @ts-ignore TODO - type
  const { username, password } = ctx.request.body
  if (!username || !password) return useThrowError(ctx, 'name_or_password_is_required')
  const user = await getUserInfo(username)
  if (!user) return useThrowError(ctx, 'user_does_not_exists')
  if (user.password !== encrypt(password)) return useThrowError(ctx, 'password_is_incorrect')
  ctx.user = user
  await next()
}

// Verify user submitted register info
export const verifyRegisterUserInfo = async (ctx: Context, next: Next) => {
  // @ts-ignore TODO - type
  const { username, password, confirmPassword } = ctx.request.body
  if (!username || !password || !confirmPassword) return useThrowError(ctx, 'name_or_password_is_required')
  if (password !== confirmPassword) return useThrowError(ctx, 'password_is_not_same')
  const user = await getUserInfo(username)
  if (user) return useThrowError(ctx, 'user_has_already_exists')
  await next()
}

// Encrypt a password before saving it to the database
export const encryptPassword = async (ctx: Context, next: Next) => {
  // @ts-ignore TODO - type
  const { password } = ctx.request.body
  // @ts-ignore TODO - type
  ctx.request.body.password = encrypt(password)
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
    return useThrowError(ctx, 'unauthorized')
  }
}

// Verify the user's token and throw an error if it is invalid
export const verifyAuth = async (ctx: Context, next: Next) => {
  if (ctx.user) return await next()
  const authorization = ctx.headers.authorization
  if (!authorization) return useThrowError(ctx, 'unauthorized')
  try {
    const token = authorization.replace('Bearer ', '')
    ctx.user = jwtVerify(token, PUBLIC_KEY, { algorithms: ['RS384'] })
    await next()
  } catch (err) {
    return useThrowError(ctx, 'unauthorized')
  }
}
