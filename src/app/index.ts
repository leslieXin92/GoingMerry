import Koa from 'koa'
import useRoutes from '@/router'
import bodyParse from 'koa-bodyparser'
import errorHandler from './errorHandler'

const app = new Koa()

app.use(bodyParse())
useRoutes(app)

app.on('error', errorHandler)

export default app
