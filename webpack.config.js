module.exports = {
   watch: true,
   mode: 'development',
   module: {
      rules: [
         {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-react']
               }
            }
         },
         {
            test: /\.scss$/i,
            use: [
               'style-loader',
               'css-loader',
               'sass-loader',
            ]
         }
      ]
   }
}