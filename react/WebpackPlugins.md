## Webpack plugins

> 웹팩에는 다양한 플러그인이 있다.

* webpack.config.js 파일에 세팅한다.

```jsx
const webpack = require('webpack');

module.experts = {
    
plugins: [
    new webpack.LoaderOptionsPlugin({ debug: ture }),
],
    
}    
```

