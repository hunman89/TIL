## 자바스크립트 객체

> 연관있는 변수와 객체를 수납하는 상자.
>
> 배열과 달리 순서가 없다. -> 이름 이용 (key)

```javascript
var coworkers = {
    "programmer":"egoing",
    "designer":"leezche"
}
```



* 객체에 소속된 함수 : 메소드

    ```javascript
    document.querySelector('body');				// document 객체, quertSelector 메소드
    ```



* 추가, 가져오기

  ```javascript
  // 추가하기
  coworkers.programmer = "duru";
  coworkers["book keeper"] = "duru";		// 이름에 띄어쓰기 있으면 이렇게 해야된다.
  // 가져오기
  document.write(coworkers.programmer)
  document.write(coworkers["book keeper"])
  ```

  

#### 순회 (iterate)

> 객체 안의 값을 모두 다 가져오는 것.

```javascript
for(var key in coworkers) {
  document.write(key + ' : ' coworkers[key] + '<br>');
}
```



#### Property & method

> 객체안의 함수 : 메소드
>
> 변수 : 프로퍼티

```javascript
coworkers.showAll = function() {	// coworkers 객체안에 showAll 메소드 추가
  for (var key in this) {
    document.write(key + ' : ' + this[key] + '<br>');
  }
}

coworkers {
	showAll : function() {	
  		for (var key in this) {
    		document.write(key + ' : ' + this[key] + '<br>');
  		}
	}, ...
}
```

