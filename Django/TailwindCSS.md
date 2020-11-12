## TailwindCSS

> 수많은 CLASS 들로 이루어진 CSS

CSS에 대해 많이 알 필요가 없다.

단지 HTML의 class들을 조합하여 제작한다.

[참고](https://builtwithtailwind.com/)



#### 재사용은?

@apply를 이용

```html
<style>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-600;
  }
</style>
```



#### 설치

node.js와 gulp.js 를 설치한다.

```shell
$ npm i gulp gulp-postcss gulp-sass gulp-csso node-sass -D
```

tailwindCSS설치

```shell
$ npm install tailwindcss -D
$ npm i autoprefixer -D
$ npx tailwind init
```

/gulpfile.js

```javascript
const gulp = require("gulp");

const css = () => {
    const postCSS = require("gulp-postcss");
    const sass = require("gulp-sass");
    const minify = require("gulp-csso");
    sass.compiler = require("node-sass");
    return gulp	// 변환과정을 세팅
        .src("assets/scss/style.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(postCSS([
            require("tailwindcss"),
            require("autoprefixer")
        ]))
        .pipe(minify())
        .pipe(gulp.dest("static/css"));
};

exports.default = css;
```

/assets/scss/styles.scss

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

/package.json

```json
"scripts": {
    "css": "gulp"
  },
```

실행

```sh
$ npm run css
```





#### 작동

실행하면.(style.scss가 변경되었을 때만)

/assets/scss/styles.scss 에서 모든 작업이 일어난다.

다른 파일 import 하여 추가

gulp가 폴더에 위치한 scss의 tailwind rule을 실제css로 변환 (minify)

static/css/styles.css에 저장된다.



#### 장고와 연결

/config/setting.py

```python
STATIC_URL = "/static/"
# 추가하여 연결
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
```

```django
{% load static %}
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{% static 'css/styles.css' %}">
    
```

사용할 페이지에 static을 로드하고 link 걸어주면 된다.

