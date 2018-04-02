const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

const config = {
	// 入口文件，entry
	entry: './src/index.js',
	// 出口
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'bundle.js',
		publicPath: "./",
	},
	devtool: "sourcemap",
	// loader,处理非javascript文件
	module: {
		rules: [
			{ 
				test: /\.js$/,
				use: ['babel-loader?cacheDirectory=true'],
				include: path.join(__dirname, 'src')
			},
			{
				test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
					fallback:"style-loader",
					use: ['css-loader','sass-loader'],
					publicPath: "/build"  
				  })
			},
			{
		        test: /\.(png|jpg|gif)$/,
		        use: [
		          {
		            loader: 'file-loader'
		          }
		        ]
		      }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({template: './public/index.html'}),
		new ExtractTextPlugin({
			filename: "styles.css",
			disable: false,
			allChunks: true
  		})
	],
	resolve: {
        alias: {
            components: path.join(__dirname, 'src/components'),
        }
	},
	devtool: 'inline-source-map'
};

module.exports = config;