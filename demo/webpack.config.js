module.exports = {
  entry: {
    javascript: './src/index.js'
  },
  output: {
    path: __dirname,
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      }
    ]
  }
};
