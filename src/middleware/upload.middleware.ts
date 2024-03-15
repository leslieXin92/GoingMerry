import multer from 'koa-multer'
import { IMAGE_PATH } from '@/app/config'
import { throwError } from '@/utils'
import type { IncomingMessage } from 'http'
import type { Context, Next } from 'koa'
import type { File } from 'koa-multer'

/**
 * Inject image's multer to ctx
 */
export const injectImageMulter = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, IMAGE_PATH),
    filename: (req, file, cb) => {
      const uniqName = `${Date.now().toString()}${Math.floor(Math.random() * 100)}`
      cb(null, `${uniqName}.${file.originalname.split('.').pop()}`)
    }
  })

  const fileFilter = (req: IncomingMessage, file: File, cb: (error: (Error | null), acceptFile: boolean) => void) => {
    const { mimetype } = file
    cb(null, mimetype.startsWith('image'))
  }

  const imagesUpload = multer({ storage, fileFilter })

  return imagesUpload.single('image')
}

/**
 * verify image file type
 */
export const verifyImageType = async (ctx: Context, next: Next) => {
  const { file } = ctx.req as IncomingMessage & { file: File }
  if (!file) return throwError(ctx, 'Image Is Incorrectly Formatted Or Cannot Be Empty!', 400)
  await next()
}
