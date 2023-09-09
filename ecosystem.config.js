module.exports = {
  apps: [
    {
      name: 'GoingMerry',
      script: './dist/main.js',
      watch: true,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
