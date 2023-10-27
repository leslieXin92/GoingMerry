module.exports = {
  apps: [
    {
      name: 'GoingMerry',
      script: './src/main.ts',
      interpreter: './node_modules/.bin/ts-node',
      exec_mode: 'cluster'
    }
  ]
}
