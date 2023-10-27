module.exports = {
  apps: [
    {
      name: 'GoingMerry',
      script: './src/main.ts',
      interpreter: './node_modules/.bin/ts-node',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      out_file: './public/out.log',
      error_file: './public/error.log'
    }
  ]
}
