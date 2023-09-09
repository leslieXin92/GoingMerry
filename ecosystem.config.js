module.exports = {
  apps: [
    {
      name: 'GoingMerry',
      script: './dist/main.js',
      watch: true,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
