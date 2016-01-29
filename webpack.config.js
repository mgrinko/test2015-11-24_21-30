module.exports = {
  entry: './frontend/scripts/app',

  output: {
    path: './public',
    filename: 'compiled.js'
  },

  devtool: 'source-map',

  watch: true,

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
	    {
		    test: /\.css$/,
		    loader: 'style!css'
	    },
	    {
		    test: /\.json$/,
		    loader: 'json-loader'
	    }
    ]
  }
};
