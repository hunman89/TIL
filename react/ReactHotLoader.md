## React Hot Loader

> 코드 수정시 새로 빌드해야하는 번거로움을 없애 준다

* 설치

  ```
  npm i -D react-hot-loader
  npm i -D webpack-dev-server
  ```

* 세팅 ( package.json )

  ```json
  "scripts": {
      "dev": "webpack-dev-server --hot"		//--hot 추가
  },
  ```

* 세팅 ( client.jsx )

  ```jsx
  const { hot } = require('react-hot-loader/root');
  // hot-loader 추가
  const WordRelay = require('./WordRelay');
  
  const Hot = hot(WordRelay);
  // hot 연결
  ReactDom.render(<Hot />, document.querySelector('#root'));
  // WordRelay -> Hot 변경
  ```

* 바벨로더 세팅 ( webpack.config.js )

  ```jsx
  plugins: [
  	'@babel/plugin-proposal-class-properties',
  	'react-hot-loader/babel',				// 추가         
  ],
  ```

* /dist/ 경로 추가 ( webpack.config.js )

  ```jsx
  output: {
  	path: path.join(__dirname, 'dist'),     
      filename: 'app.js',
      publicPath: '/dist/',	// app.js가 폴더안에 있을때, 경로를 추가해준다.
  },                         
  ```

  * 또는 app.js 경로 변경 ( index.html )

      ```html
      <html>
      <head>
          <meta charset="UTF-8">
          <title>끝말잇기</title>
      </head>
      <body>
          <div id='root'></div>
          <script src="./app.js"></script>			//dist 제거.
      </body>
      </html>
      ```

  