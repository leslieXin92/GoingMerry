import { queryInsert } from '@/utils'

export const savaPictureInfo = async (filename: string, mimetype: string, size: number) => {
  await queryInsert({
    table: 'files',
    data: {
      filename,
      mimetype,
      size,
      type: 'image'
    }
  })
}
