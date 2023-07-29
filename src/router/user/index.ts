import Router from 'koa-router'
import { verifyLoginUserInfo, verifyRegisterUserInfo, encryptPassword } from '@/middleware'
import { login, register } from '@/controller'
import type { CustomContext } from '@/types'

const userRouter: Router<any, CustomContext<any>> = new Router({ prefix: '/user' })

userRouter.post('/login', verifyLoginUserInfo, login)

userRouter.post('/register', verifyRegisterUserInfo, encryptPassword, register)

export default userRouter
