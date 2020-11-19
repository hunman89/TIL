## Extending

> tailwind CSS를 확장하여 사용할 수 있다

tailwind.config.js 파일 변경

```javascript
module.exports = {
  future: {
  },
  purge: [],
  theme: {
    extend: {
      spacing:{ // 추가
        "25vh": "25vh",
        "75vh": "75vh",
        "50vh": "50vh",
      },
      borderRadius:{
        xl: "1.5rem"
      }
    },
  },
  variants: {},
  plugins: [],
}
```

색, bodyWidth 등 바꿀 수 있다.



