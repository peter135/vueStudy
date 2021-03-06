const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack');


module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: [  
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: {
                   filter: (url, resourcePath) => {
                     if (url.startsWith('data:')) {
                       return false;
                     }
                     return true;
                   },
                 },
            } 
          },
          {
            loader: 'postcss-loader',
          }
      ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader','postcss-loader','sass-loader',]
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader','postcss-loader','less-loader',]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[hash].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash].[ext]'
        }
      }
    ]
  },
  optimization: {
    minimize: true, // ?????????????????????????????????????????????????????? true??????????????????????????? false
    minimizer: [
        new TerserPlugin({
            parallel: true, // ??????????????????????????????
            terserOptions: {
                toplevel: true, // ?????????????????????????????????
                ie8: true,
                safari10: true,
            }
        }),
        new CssMinimizerPlugin({
          parallel: true, // ??????????????????????????????
          // sourceMap: true, // ????????????????????????webpack???devtool??????
          minimizerOptions: {
              // preset: 'advanced', // ???????????????
          },
      })
    ],
    // splitChunks ??????
    splitChunks: {
      cacheGroups: {
        default: {
          name: 'vendor',
          // ????????????????????? vendor ???????????? vue, vue-router, vuex ???
          // ????????????????????? node_modules ???????????????????????????????????????
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          // ??????????????????????????????
          priority: 10,
        },
        common: {
          chunks: 'all',
          name: 'common',
          // ?????? entry ?????? common ??????
          test: 'common',
        },
      },
    },
	  // runtime ???????????? runtime ?????????
    runtimeChunk: {
      name: 'runtime',
    },
  },
  resolve: {
    extensions: ['.js', '.vue','.jsx', '.ts', '.tsx', '.css', '.scss', '.sass', '.svg', '.less'],
    alias: {
        '@': path.resolve(__dirname, './src'),
    }
  },
  plugins: [
    // new CompressionPlugin({
    //   algorithm: 'gzip',
    //   threshold: 10240,
    //   minRatio: 0.8
    // }),
    
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // }),

    // new BundleAnalyzerPlugin(),

    new MiniCssExtractPlugin(),

    new MiniCssExtractPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      title: '?????? Vue ????????????',
      favicon:path.resolve(__dirname, './favicon.ico'),
    }),
    // ?????? VueLoaderPlugin ??????
    new VueLoaderPlugin(),

    new CleanWebpackPlugin(),

  ],
  devServer: {
    // contentBase: path.resolve(__dirname, './dist'),
    port: 3000,
    open:true,
    hot: true,
    proxy: {
      '/api': {
        target: 'https://other-server.example.com',
        secure: false,
        changeOrigin: true,
      },
    },
  },

}