import { savaPictureInfo } from '@/service'
import { useSuccessReturn } from '@/utils'
import { APP_HOST } from '@/app/config'
import type { Context } from 'koa'
import type { IncomingMessage } from 'http'
import type { File } from 'koa-multer'

export const handleSaveImageInfo = async (ctx: Context) => {
  const { filename, mimetype, size } = (ctx.req as IncomingMessage & { file: File }).file
  const imageUrl = `https://${APP_HOST}/api/images/${filename}`
  await savaPictureInfo(filename, mimetype, size)
  ctx.body = useSuccessReturn({ imageUrl }, 'Save Success!')
}
