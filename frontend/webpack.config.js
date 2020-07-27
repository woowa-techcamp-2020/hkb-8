const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/app.js' // 이 파일을 기준으로 시작점 설정,
		// main2: './src/app2.js'
	}, output: {
		path: path.resolve('./dist'), // node의 path모듈을 이용해서 절대경로를 설정해준다.
		filename: '[name].js' // 번들링 된 파일명입력 []안에는 entry에서 설정한 키값(=여기선 main)이 될 것이다.
													// entry가 만약 여러개 라면 output을 동적으로 여러개 만들 수 있는 장점이 있다.
	}
}