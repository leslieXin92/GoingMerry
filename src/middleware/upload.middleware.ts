import multer from 'koa-multer'
import { IMAGE_PATH } from '@/app/config'
import type { IncomingMessage } from 'http'
import type { File } from 'koa-multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_PATH)
  },
  filename: (req, file, cb) => {
    const uniqName = `${Date.now().toString()}${Math.floor(Math.random() * 100)}`
    cb(null, `${uniqName}.${file.originalname.split('.').pop()}`)
  }
})

const imageFilter = (req: IncomingMessage, file: File, cb: (error: (Error | null), acceptFile: boolean) => void) => {
  const { mimetype } = file
  if (mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new Error('image_format_is_invalid'), false)
  }
}

const imagesUpload = multer({ storage, fileFilter: imageFilter })

export const savaImage = imagesUpload.single('image')
