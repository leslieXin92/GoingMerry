const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    extensions: ['.ts', '.js']
  },
  target: 'node',
  entry: {
    server: `${process.cwd()}/src/main.ts`
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(['production', 'prod'].includes(process.env.NODE_ENV) ? 'production' : 'development')
      }
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/app/keys/private.key', to: 'keys/private.key' },
        { from: 'src/app/keys/public.key', to: 'keys/public.key' }
      ]
    }),
    new CleanWebpackPlugin()
  ],
  externals: [nodeExternals()]
}
