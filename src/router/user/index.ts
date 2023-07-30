import Router from 'koa-router'
import { verifyLoginUserInfo, verifyRegisterUserInfo, encryptPassword } from '@/middleware'
import { handleLogin, handleRegister, handleTest } from '@/controller'
import type { CustomContext } from '@/types'

const userRouter: Router<any, CustomContext<any>> = new Router({ prefix: '/user' })

userRouter.post('/login', verifyLoginUserInfo, handleLogin)

userRouter.post('/register', verifyRegisterUserInfo, encryptPassword, handleRegister)

userRouter.get('/test', handleTest)

export default userRouter
