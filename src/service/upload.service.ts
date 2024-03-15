import { queryInsert } from '@/utils'
import type { UserInfo } from '@/types'

interface FileData {
  filename: string
  mimetype: string
  size: number
}

export const savaPictureInfo = async (fileData: FileData, user: UserInfo) => {
  await queryInsert({
    table: 'files',
    data: {
      ...fileData,
      fileType: 'image',
      createdBy: user.id
    }
  })
}
