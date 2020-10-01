## Babel/preset-env 세팅

> 바벨은 최신 문법을 번역해주는데, 구 버전을 지원 할수록 번역할게 많아져 무거워진다.

* 제한을 해서 속도를 높히자.
  * preset을 설정.

```jsx
module: {
    rules: [{
        test: /\.jsx$/,
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env', { 							// babal/preset-env 배열 생성
                targets: {
                    browsers: ['> 5% in KR','last 2 chrome versions'], 	//조건 입력
                },
                debug: true,
            }], 
            @babel/preset-react'
            ],
            plugins: [],
        }, 
    }],
},
```

* [참고](https://github.com/browserslist/browserslist)