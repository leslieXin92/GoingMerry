import { savaPictureInfo } from '@/service'
import { useSuccessReturn, throwError } from '@/utils'
import { APP_HOST } from '@/app/config'
import type { Context } from 'koa'
import type { IncomingMessage } from 'http'
import type { File } from 'koa-multer'

export const handleSaveImage = async (ctx: Context) => {
  if (!(ctx.req as IncomingMessage & { file: File }).file) return throwError(ctx, 'Image Cannot Be Empty!', 400)
  const { filename, mimetype, size } = (ctx.req as IncomingMessage & { file: File }).file
  const imageUrl = `${APP_HOST}/upload/images/${filename}`
  await savaPictureInfo(filename, mimetype, size)
  ctx.body = useSuccessReturn({ imageUrl }, 'Save Success!')
}
