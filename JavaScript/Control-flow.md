## Javascript 제어문

> HTML과 다르게 자바스크립트는 ''프로그래밍''언어이다.

program -> 순서.



#### 비교 연산자

> 조건문에 필요한 조건을 만들어준다.

* `===` : 좌우가 같은지 비교

  ```javascript
  1===1;
  ture
  ```

* boolean

  * True or false

* `<`,`>`

  ```
  html에서는 이렇게 표현한다. 
  &lt;    (= <)		
  &gt;	(= >)
  ```

  

#### 조건문

> 단순 반복뿐만 아니라 복잡한 임무 수행 가능하게 해준다.

* 간단한 구조

  ```html
  <script>
    document.write('1')
    if(true) {				// 내부 조건일 경우
      document.write('2')		// 괄호안이 실행
    }
    else {					// 아닐경우 여기가 실행
      document.write('3')
    }
  </script>
  ```

* 조건 지정

  ```html
  <input id="night_day" type="button" value="night" onclick="
  
  if(document.querySelector('#night_day').value === 'night') {	
      // input태그의 value가 night 일 경우 실행
    document.querySelector('body').style.backgroundColor = 'black';
    document.querySelector('body').style.color = 'white';
      // value를 day로 바꿔준다. (다음 클릭시 else 부분이 실행된다.)
    document.querySelector('#night_day').value = 'day';
  }
  else {
    document.querySelector('body').style.backgroundColor = 'white';
    document.querySelector('body').style.color = 'black';
    document.querySelector('#night_day').value = 'night';
  }
  ">
  ```



#### 리팩토링

> 개선한다.

```html
<input id="night_day" type="button" value="night" onclick="
var target = document.querySelector('body')		// 중복제거
if(this.value === 'night') {    				// 자기 자신 =this
  target.style.backgroundColor = 'black';
  target.style.color = 'white';    
  this.value = 'day';							
}
else {
  target.style.backgroundColor = 'white';
  target.style.color = 'black';
  this.value = 'night';
}
">
```



#### 배열

> 반복문에 없어서는 안될 요소

```javascript
var fruits = ["apple", "banana"];
```

* 값 접근

  ```javascript
  document.write(fruits[0]);
  ```

  

* 길이

  ```javascript
  document.write(fruits.length);
  ```

* 값 추가하기

  ```javascript
  fruits.push("coconut");
  ```

  

#### 반복문

> loop, 같은 코드를 일정 조건까지 여러번 반복한다.

* while 예제

  ```javascript
  document.write('<li>1</li>');
  var i = 0;
  while (i < 3) {						// i=3이 될때까지 while문 내부 반복 : 3번반복
    document.write('<li>2</li>');
    document.write('<li>3</li>');
    i = i + 1;
  }
  document.write('<li>4</li>');
  ```

  ```javascript
  fruits = ["apple", "banana", "coconut"];		// 배열
  var i = 0;
  while (i < fruits.length) {						
      	// 배열의 길이만큼 반복 => 배열의 모든 성분에 대해
    document.write('<li>'+fruits[i]+'</li>');			// li 태그를 붙여 출력한다.
    i = i + 1;
  }
  ```

* for

  ```javascript
  fruits = ["apple", "banana", "coconut"];		
  for (var i = 0; i < fruits.length; i++) {
      document.write('<li>'+fruits[i]+'</li>');
  }
  ```

  