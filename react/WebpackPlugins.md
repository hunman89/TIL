## Webpack plugins

> 웹팩에는 다양한 플러그인이 있다.

* webpack.config.js 파일에 세팅한다.

```jsx
const webpack = require('webpack');

module.experts = {
    
plugins: [
    new webpack.LoaderOptionsPlugin({ debug: ture }),			
    // 로더 옵션에 debug: true 플러그인을 부여하는 웹팩 플러그인 
],
    
}    
```

* 참고 [공식문서](https://webpack.js.org/)