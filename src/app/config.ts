import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

type EnvType = 'test' | 'development' | 'production'

const dotEnvPathMap = {
  test: '.env.production.test',
  development: '.env.production.development',
  production: '.env.production.production'
} as const

dotenv.config({ path: dotEnvPathMap[process.env.NODE_ENV as EnvType] })

export const APP_HOST = process.env.APP_HOST
export const APP_PORT = process.env.APP_PORT
export const MYSQL_HOST = process.env.MYSQL_HOST

export const MYSQL_PORT = Number(process.env.MYSQL_PORT)
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE
export const MYSQL_USER = process.env.MYSQL_USER
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD

export const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
export const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

export const IMAGE_PATH = './public/images'
