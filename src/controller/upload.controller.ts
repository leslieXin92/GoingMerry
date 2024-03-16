import { savaPictureInfo } from '@/service'
import { useSuccessReturn } from '@/utils'
import { FILE_PATH } from '@/app/config'
import type { Context } from 'koa'
import type { IncomingMessage } from 'http'
import type { File } from 'koa-multer'

export const handleSaveImageInfo = async (ctx: Context) => {
  const { filename, mimetype, size } = (ctx.req as IncomingMessage & { file: File }).file
  const imageUrl = `${FILE_PATH}/${filename}`
  await savaPictureInfo({ filename, mimetype, size }, ctx.user)
  ctx.body = useSuccessReturn({ imageUrl }, 'Save Success!')
}
