const path = require('path');

const config = {
	// 入口文件，entry
	entry: './src/index.js',
	// 出口
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		libraryTarget: 'commonjs2'
	},
	// loader,处理非javascript文件
	module: {
		rules: [
			{ 
				test: /\.js$/, 
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.sass$/,
				use: [{
					loader: "style-loader" // 将 JS 字符串生成为 style 节点
				},{
					loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
				},{
					loader: "sass-loader" // 将 Sass 编译成 CSS
				}]
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
	plugins: [],
	resolve: {
        alias: {
            components: path.join(__dirname, 'src/components'),
        }
    }
};

module.exports = config;