import 'module-alias/register'
import app from '@/app'
import { APP_HOST, APP_PORT } from '@/app/config'

app.listen(APP_PORT, () => {
  console.log(`🥬 🐔 GoingMerry is sailing at ${APP_HOST}:${APP_PORT}`)
})
