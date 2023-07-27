import Koa from 'koa'
import useRoutes from '@/router'

const app = new Koa()

useRoutes(app)

export default app
