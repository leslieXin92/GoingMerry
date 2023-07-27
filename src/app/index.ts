import Koa from 'koa'
import bodyParse from 'koa-bodyparser'
import useRoutes from '@/router'
import errorHandler from './errorHandler'

const app = new Koa()

app.use(bodyParse())
useRoutes(app)

app.on('error', errorHandler)

export default app
