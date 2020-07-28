const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
	mode: 'development',
	entry: {
		main: './src/app.js' // 이 파일을 기준으로 시작점 설정,
		// main2: './src/app2.js'
	}, output: {
		path: path.resolve('./dist'), // node의 path모듈을 이용해서 절대경로를 설정해준다.
		filename: '[name].js' // 번들링 된 파일명입력 []안에는 entry에서 설정한 키값(=여기선 main)이 될 것이다.
													// entry가 만약 여러개 라면 output을 동적으로 여러개 만들 수 있는 장점이 있다.
	},
	module: { // 로더들은 module의 rules에 추가하면 읽힌다.
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,  // test : 로더가 처리해야할 파일들의 패턴(정규표현식)
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					publicPath: './dist/', // dist에 떨궈지기
					name: '[name].[ext]?[hash]', // 결과 파일의 이름
					limit: 20000, // 용량 2kb미만은 url-loader 그 이상은 file-loader
				}
			},
		]
	},
		plugins: [
			new HtmlWebpackPlugin({
				template: './index.html', // 인자로 템플릿 파일
			}),
			new CleanWebpackPlugin()
		]
};