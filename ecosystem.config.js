module.exports = {
  apps: [
    {
      name: 'GoingMerry',
      script: './index.ts',
      interpreter: './node_modules/.bin/ts-node',
      watch: true,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
