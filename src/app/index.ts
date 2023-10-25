import path from 'path'
import Koa from 'koa'
import bodyParse from 'koa-bodyparser'
import staticFiles from 'koa-static'
import cors from '@koa/cors'
import useRoutes from '@/router'
import errorHandler from './errorHandler'

const app = new Koa()

app.use(bodyParse())

app.use(staticFiles(path.resolve(__dirname, '..', '../public')))

app.use(cors({
  origin: 'http://120.25.247.55',
  allowMethods: ['GET', 'POST', 'FETCH', 'DELETE'],
  credentials: true  // 允许发送身份验证信息（例如cookies）
}))

useRoutes(app)

app.on('error', errorHandler)

export default app
