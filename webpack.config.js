const path = require('path');

const config = {
	// 入口文件，entry
	entry: './src/index.js',
	// 出口
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'bundle.js',
		publicPath: "/",
	},
	devtool: "sourcemap",
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
				test: /\.s?css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
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