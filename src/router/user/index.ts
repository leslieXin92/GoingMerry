import Router from 'koa-router'
import { verifyLoginParams, verifyRegisterParams, encryptPassword } from '@/middleware'
import { handleLogin, handleRegister } from '@/controller'

const userRouter: Router<unknown, any> = new Router({ prefix: '/user' }) // TODO - type

userRouter.post('/login', verifyLoginParams, handleLogin)
userRouter.post('/register', verifyRegisterParams, encryptPassword, handleRegister)

export default userRouter
