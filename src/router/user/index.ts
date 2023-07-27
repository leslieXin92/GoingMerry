import Router from 'koa-router'
import { verifyLogin } from '@/middleware'
import { login } from '@/controller'

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', verifyLogin, login)

export default userRouter
