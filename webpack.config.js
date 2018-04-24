const HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //单独打包css
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //压缩
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清理
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

const config = {
	// 入口文件，entry
	entry: {
		vendor: ['react', 'react-router-dom', 'react-dom'],
		app: path.join(__dirname, './src/index.js')
		
	},
	// 出口
	output: {
		path: path.resolve(__dirname, './build'),
		filename: './[name].[chunkhash:8].js',
        chunkFilename: './[name].[chunkhash].js',
	},
	devtool: "sourcemap",
	// loader,处理非javascript文件
	module: {
		rules: [
			{ 
				test: /\.js$/,
				use: ['babel-loader?cacheDirectory=true'],
				include: path.join(__dirname, 'src'),
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
					fallback:"style-loader",
					use: ['css-loader','sass-loader'],
				  })
			},
			{
		        test: /\.(png|jpg|gif|svg)$/,
		        use: [
		          {
		            loader: 'url-loader',
			        options: {
						limit: 8192,
						name: 'images/[hash:8].[name].[ext]'
					}
		          }
		        ]
		      }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({template: './public/index.html'}),
		new ExtractTextPlugin({
			filename: '[name].[contenthash:5].css',
			disable: false,
			allChunks: true
  		}),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV': JSON.stringify('production')
           }
       }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor','runtime'],
            minChunks: Infinity
        }),
       	new webpack.HashedModuleIdsPlugin(),
		new CleanWebpackPlugin(['build'])
	],
	resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
			router: path.join(__dirname, 'src/router'),
			images: path.join(__dirname, 'src/images')
        }
	},
	devtool: 'inline-source-map',
	devServer: {
        port: 8080,
        contentBase: path.join(__dirname, './build'),
        historyApiFallback: true,
    }
};

module.exports = config;