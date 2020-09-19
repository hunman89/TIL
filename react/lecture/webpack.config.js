const path = require('path');   // 경로를 쉽게 지정해주는 node.js 의 path

module.exports ={
    name: 'wordrelay-setting',  // 이름
    mode: 'development',        // 실서비스 : production
    devtool: 'eval',            // 빠르게 개발해주는?
    resolve: {
        extensions: ['.js','.jsx'] // 확장자 구분
    },

    entry: {
        app: ['./client'],      // 들어가는 파일들, 확장자 생략 (WordRelay.jsx는 client.jsx 내부에 연결되어있다.)
    },                          // 입력

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
        }],
    },

    output: {
        path: path.join(__dirname, 'dist'),     // 현재 경로내부의 dist 폴더 (생성함)
        filename: 'app.js'
    },                          // 출력
};