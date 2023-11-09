const { DefinePlugin } = require('webpack')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node',
  entry: {
    server: `${process.cwd()}/src/main.ts`
  },
  output: {
    filename: 'main.js',
    path: `${process.cwd()}/dist`
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(['production', 'prod'].includes(process.env.NODE_ENV) ? 'production' : 'development')
      }
    })
  ],
  externals: [nodeExternals()]
}
