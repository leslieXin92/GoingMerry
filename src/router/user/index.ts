import Router from 'koa-router'
import { verifyLoginParams, verifyRegisterParams, encryptPassword } from '@/middleware'
import { handleLogin, handleRegister } from '@/controller'

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', verifyLoginParams, handleLogin)
userRouter.post('/register', verifyRegisterParams, encryptPassword, handleRegister)

export default userRouter
