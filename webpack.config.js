const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'client'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },
      // {
      //   test: /\.s[ac]ss$/i,
      //   include: [
      //     path.resolve(__dirname, 'client/scss'),
      //   ],
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'sass-loader',
      //   ],
      // },
    ],
  },
  devServer: {
    proxy: {
      '/': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
    },
    contentBase: path.resolve(__dirname, './client'),
    compress: true,
    publicPath: 'http://localhost:8080/build'
  },
}
