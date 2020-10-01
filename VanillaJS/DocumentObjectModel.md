## Document Object Model

> html과 관련된 모든것을 객체화 한 것

* 함수를 통해 **자바스크립트**에서 불러올 수 있다.



#### built-in function

> 를 통해 html,css와 연동 가능하다.

* 아래 코드를 통해 다룰 수 있는 무수히 많은 값을 볼 수 있다.

```javascript
const title = document.getElementById("title");
console.dir(title);
```



#### querySelector

> css선택자를 사용하고, 가장 첫번째 값을 불러온다.

```javascript
const title = document.querySelector("#title");			//id
const title = document.querySelector(".title");			//class
```

