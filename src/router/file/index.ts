import Router from 'koa-router'
import { verifyAuth, injectImageMulter, verifyImageType } from '@/middleware'
import { handleSaveImageInfo } from '@/controller'

const uploadRouter = new Router({ prefix: '/file' })

uploadRouter.post('/image', verifyAuth, injectImageMulter(), verifyImageType, handleSaveImageInfo)

export default uploadRouter
