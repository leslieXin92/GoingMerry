// 注册接口
import Router from 'koa-router'

const userRouter = new Router({ prefix: '/user' })

userRouter.get('/', async (ctx) => {
  const { id } = ctx.params
  ctx.body = { id, name: 'John Doe', email: 'john@example.com' }
})

export default userRouter
