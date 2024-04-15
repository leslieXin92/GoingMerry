import Router from 'koa-router'
import { verifyLoginParams, verifyRegisterParams, encryptPassword, verifyAutoLoginParams } from '@/middleware'
import { handleLogin, handleRegister, handleAutoLogin } from '@/controller'

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', verifyLoginParams, handleLogin)
userRouter.post('/register', verifyRegisterParams, encryptPassword, handleRegister)
userRouter.post('/autoLogin', verifyAutoLoginParams, handleAutoLogin)

export default userRouter
