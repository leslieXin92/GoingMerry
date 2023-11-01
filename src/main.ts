import 'module-alias/register'
import app from '@/app'
import { APP_HOST, APP_PORT } from '@/app/config'

app.listen(APP_PORT, () => {
  console.log(`【${process.env.NODE_ENV}】\x1b[42m\x1b[30m\x1b[1m 🥬 🐔 GoingMerry is sailing at \x1b[0m ${APP_HOST}:${APP_PORT}`)
})
