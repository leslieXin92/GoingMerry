import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import type Router from 'koa-router'

const useRoutes = (app: Koa) => {
  fs.readdirSync(__dirname).forEach((module) => {
    if (module === 'index.ts') return
    const router: Router = require(path.join(__dirname, module)).default
    app.use(router.routes())
    app.use(router.allowedMethods())
  })
}

export default useRoutes
