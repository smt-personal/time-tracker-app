const path = require('path')
const glob = require('glob')


console.log('dirname', __dirname)

module.exports = {
  watch: true,
  // resolve: {
  //   modules: path.resolve(__dirname, './../node_modules')
  // },
   target:'node',
  entry: path.resolve(__dirname, 'client/src/index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader' 
        },{
          loader: 'css-loader'
        },{
          loader: 'sass-loader'
        }]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'client/dist/'),
    //filename: "[name].js",
    publicPath: 'client/dist/'
  }
}

