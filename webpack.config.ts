import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';

const config: webpack.Configuration = {
  entry: {
    app: ['webpack-hot-middleware/client?reload=true', './client/app/app.tsx']
    // app: './client/app/app.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[id].chunk.js'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'cheap-module-source-map',

  mode: 'development',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      app: 'client/app'
    }
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        // provide array of loaders
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: ['react-hot-loader/babel']
            }
          },
          // 'babel-loader',
          'awesome-typescript-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [require('autoprefixer')];
              }
            }
          }
        ]
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     ExtractCssChunks.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: true,
      //         importLoaders: 1
      //       }
      //     }
      //   ]
      // },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      inject: 'body'
    })
    // new ExtractCssChunks({
    //   filename: 'css/style.css'
    // })
  ],

  devServer: {
    hot: true,
    contentBase: './client/public',
    historyApiFallback: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  }
};

export default config;
