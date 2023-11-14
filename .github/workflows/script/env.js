const fs = require('fs')

const env = process.env || {}

const content = `
APP_HOST=${env.APP_HOST}
APP_PROT=${env.APP_PROT}

MYSQL_HOST=${env.MYSQL_HOST}
MYSQL_PORT=${env.MYSQL_PROT}
MYSQL_USER=${env.MYSQL_USER}
MYSQL_PASSWORD=${env.MYSQL_PASSWORD}
MYSQL_NAME=${env.MYSQL_NAME}

# token key
JWT_KEY=jonlyesblog
`

fs.writeFile('../../.env', content, (err) => {
  if (err) return console.log('❌ env file created unsuccessfully!')
  console.log('✅ env file created successfully!')
})
