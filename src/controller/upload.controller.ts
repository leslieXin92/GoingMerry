import { savaPictureInfo } from '@/service'
import { useErrorReturn, useSuccessReturn } from '@/utils'
import { FILE_PATH } from '@/app/config'
import type { Context } from 'koa'
import type { IncomingMessage } from 'http'
import type { File } from 'koa-multer'

export const handleSaveImageInfo = async (ctx: Context) => {
  try {
    const { filename, mimetype, size } = (ctx.req as IncomingMessage & { file: File }).file
    const imageUrl = `${FILE_PATH}/${filename}`
    await savaPictureInfo({ filename, mimetype, size }, ctx.user)
    ctx.body = useSuccessReturn({ imageUrl }, 'Save Success!')
  } catch (e) {
    ctx.status = 500
    ctx.body = useErrorReturn((e as Error).message)
  }
}
