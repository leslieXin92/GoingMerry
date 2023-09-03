import Router from 'koa-router'
import { verifyAuth, savaImage } from '@/middleware'
import { handleSaveImage } from '@/controller'

const uploadRouter = new Router({ prefix: '/upload' })

uploadRouter.post('/image', verifyAuth, savaImage, handleSaveImage)

export default uploadRouter
