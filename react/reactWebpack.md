## Webpack

> 대량의 리액트 파일을 하나의 자바스트립트로 묶어준다.

Terminal

* npm으로 세팅하면 되는데 이는 node.js가 설치되어 있어야 한다.

  ```
  node -v
  npm -v
  ```

* 개발 폴더에서 터미널을 열고 npm을 `init`한다.

  ```
  npm init
  ```

* 폴더 내부에 pakage.json 파일 생성을 확인한다.

* React 환경을 세팅한다.

  ```
  npm i react react-dom
  ```

* Webpack을 설치한다.

  ```
  npm i -D webpack webpack-cli
  ```
  
* package.json에서 확인한다.
  
* `-D`로 설치한 webpack은 개발용이다.
  
    ```
    "dependencies": {
        "react": "^16.13.1",
        "react-dom": "^16.13.1"
      },
      "devDependencies": {
        "webpack": "^4.44.2",
        "webpack-cli": "^3.3.12"
      }
    ```

---

vsCode

* 개발 폴더에 webpack.config.js 생성하고 입력한다.

  ```javascript
  module.exports ={
  
  };
  ```

* client.jsx도 생성해 세팅한다.

    * 리액트를 script에 작성하지 않고 node.js의 모듈 시스템을 통해 불러온다.
    
    ```jsx
    const React = require('react');
const React-dom = require('react-dom');
    ```
    

* index.html을 생성해 코딩한다.

  ```html
  <html>
  <head>
      <meta charset="UTF-8">
      <title>끝말잇기</title>
  </head>
  <body>
      <div id='root'></div>
      <script src="./dist/app.js"></script>
  </body>
  </html>
  ```

* ReactDom 부분을 client.jsx에 작성한다.

  ```jsx
  ReactDom.render(<WordRelay />, document.querySelector('#root'));
  ```

* class 부분을 따로 .jsx 파일을 만들어 코딩한다.

  ```jsx
  const React = require('react');
  const { Component } = React;
  
  class WordRelay extends Component {
      state = {
  
      };
  
      render() {
          
      }
  }
  
  module.exports = WordRelay;
  ```

  * 마지막줄로 인해 client.jsx로 불러올 수 있다. (필요한 것만!)

    ```jsx
    //client.jsx
    const WordRelay = require('./WordRelay');
    ```

* index.html 에서는 하나의 js파일만 인식하기 때문에 **webpack.config.js**에서 하나로 합쳐줘야한다.

  ```js
  const path = require('path');   // 경로를 쉽게 지정해주는 node.js 의 path
  
  module.exports ={
      name: 'wordrelay-setting',  // 이름
      mode: 'development',        // 실서비스 : production
      devtool: 'eval',            // 빠르게 개발해주는?
      resolve: {
          extension: ['.js','.jsx'] // 확장자 구분
      },
  
      entry: {
          app: ['./client'],      // 들어가는 파일들, 확장자 생략 (WordRelay.jsx는 client.jsx 내부에 연결되어있다.)
      },                          // 입력
      output: {
          path: path.join(__dirname, 'dist'),     // 현재 경로내부의 dist 폴더 (생성함)
          filename: 'app.js'
      },                          // 출력
  };
  ```

* 실행하기 : package.json에서 scripts부분을 변경시켜 준다.

  ```jsx
  "scripts": {
      "dev": "webpack"
    },
  ```

  * 그리고 터미널에서 실행명령을 입력한다.

    ```
    npm run dev 또는
    npx webpack
    ```

  * dist/app.js 가 생성되면 성공!

## Babal

> 최신 문법을 동작하게 해준다.( 예전 문법으로 변형시켜 준다.)

```
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```

* 설치한 뒤 webpack.config.js에다 세팅을 한다.

  ``` jsx
  module: {
          rules: [{
              test: /\.jsx?/,
              loader: 'babel-loader',
              options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
          },
      }],
  },
  ```

  * 강사님과는 달리 설치하지 않아도 실행이 잘 됬었다.
  * 