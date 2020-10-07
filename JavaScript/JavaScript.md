## Javascript



> 사용자와 상호작용 할 수 있게 한다.
>
> 우리는 웹페이지를 더 동적으로 만들 수 있다.



#### HTML과 Javascript

Javascript는 HTML위에서 동작한다. 사용하기 위해 script 태그가 필요하다.

```html
<body>
    <h1>
        1+1							// 1+1
    </h1>
</body>
<script>
	document.write(1+1);			// 2
</script>
```



#### Event

> 사용자와 상호작용하게 만들어 주는 핵심 기능 (Javascript 를 실행하는 방법중 하나)

```html
<input type="button" value="hi" onclick="alert('hi')">
```



* onclick, onchange ...
* 외울 필요없이 그때그때 검색해보자



#### Console

> 웹 사이트를 거치지 않고 Javascript를 실행할 수 있는 방법

* 브라우져에서 마우스 우클릭 > 검사
* f12키



#### Javascript의 데이터 타입

> MDN에는 6가지 타입이 있다. (boolean, null, undifined, number, string, symbol and object)

* 문자열
  * 따옴표로 나타낸다 ("java",'script')
  * 여러 기능을 지닌 함수가 있다. (str.length, str.toUpperCase())
* 숫자
  * 계산이 가능하다.

* 타입에 따라 연산이 달라진다. 

  ```javascript
  1+1					// =2
  '1' + '1'			// =11
  ```



#### 변수와 대입연산자

> 바뀔수 있는 수

* `=` : 대입 연산자

  ```javascript
  x = 1
  y = 1000
  ```

* 여러군데 흩어져 있는 값을 한번에 바꿀 수 있다.

* var 을 붙여준다. ( const, let은 나중에~)

  ```javascript
  var word = "hello"
  ```



#### 웹 브라우저 제어하기 -> CSS

> 웹페이지에 있는 요소들의 디자인을 바꿀 수 있다

```HTML
<h1>Javascript<h1>
<h1 style="color: blue">Javascript<h1>

```

* CSS property + "원하는 디자인 요소" 로 검색



#### CSS태그와 선택자

> 특정 부분에만 스타일을 주고 싶을때 사용  
>
> 식별자의 우선순위 id>class>tagmane

* Span, Div 

  * CSS나 Javascript 코드를 삽입하기 위해서 존재하는 태그
  * div는 줄바꿈된다. (가로 화면 전체 이용)

* class

  * 같은 스타일을 여러군데 부여하게 해 준다. (group)

    ```html
    <head>
      <style>
        .js {
            font-weight: bold;
        }
      </style>
    </head>
    
    ...
    <span class="js">Javascript</span> is wonderful!
    ```

* id

  * 한페이지에 하나를 식별해 준다 (예외처리)

  * class보다 우선순위 위

    ```html
    <head>
      <style>
        #js {
            font-weight: bold;
        }
      </style>
    </head>
    
    ...
    <span id="js">Javascript</span> is wonderful!
    ```

* 태그이름

  * 페이지의 모든 태그에 스타일 부여

    ```html
    <head>
      <style>
        span {
            font-weight: bold;
        }
      </style>
    </head>
    
    ...
    <span>Javascript</span> is wonderful!
    ```

    

#### 자바스크립트로 제어할 태그 선택하기

> 어떤 이벤트가 일어났을때 자바스크립트가 실행되고 -> 그 자바스크립트가 css태그를 선택해 변경한다.
>
> : 반응한다.

* querySelector

  ```javascript
  documnet.querySelector("body")			// body tag 선택
  ```

  ```java
  documnet.querySelector("body").style.backgroundColor = 'black';		
  // 선택한 tag 스타일 변경
  ```

  ```html
  <input type="button" value="night" onclick="documnet.querySelector('body').style.backgroundColor = 'black';">
  // 이벤트 부여
  ```

  