import { savaPictureInfo } from '@/service'
import { useSuccessReturn, throwError } from '@/utils'
import { APP_HOST, APP_PORT } from '@/app/config'
import type { Context } from 'koa'
import type { IncomingMessage } from 'http'
import type { File } from 'koa-multer'

export const handleSaveImageInfo = async (ctx: Context) => {
  const { filename, mimetype, size } = (ctx.req as IncomingMessage & { file: File }).file
  const imageUrl = `http://${APP_HOST}:${APP_PORT}/images/${filename}`
  await savaPictureInfo(filename, mimetype, size)
  ctx.body = useSuccessReturn({ imageUrl }, 'Save Success!')
}
