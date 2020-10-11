## 자바스크립트활용



#### 파일로 쪼개기

> 같은 코드가 여러페이지에 중복되면, 새 파일을 만들어 여러 페이지에서 사용할 수 있게 한다.



```html
<script src='colors.js'></script>
```



* 코드 관리가 쉬워진다.
* 서버 측면에서도 캐시에 저장되어, 부하가 걸리지 않는 장점이 있다.



#### 라이브러리와 프레임워크

> 소프트웨어는 혼자 만드는게 아니다. 다른 사람이 잘 만들어 놓은 코드를 가지고 빠르게 조립하여 우리가 원하는 코드를 만들 수 있다.
>
> 라이브러리 : 부품
>
> 프레임워크 : 틀



* jQuery 라이브러리

  ```html
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  ```

  ```javascript
  var aList = document.querySelectorAll('a');
  var i = 0;
  while(i < aList.length){
      aList[i].style.color = color;
      i = i + 1;
  }
  // 위 코드를 jQuery로 바꾸면
  // jQuery
  $('a').css("color","powderblue");
  ```

  

#### UI(User Interface) & API(Application Programming Interface)

> UI : 사용자가 시스템을 제어하기 위해 조작하는 장치
>
> API : 프로그래머들이 사용하는 조작 장치



#### 검색어들

> 나만의 프로젝트를 진행해 보자

* 태그: document, DOM 객체
* 웹브라우저 자체: windows 객체
* 웹페이지를 새로고침하지 않고도 정보를 변경하고 싶다: ajax
* 웹페이지가 새로고침되어도 현재 상태를 유지하도록 만들고 싶다: cookie
* 인터넷이 끊겨도 동작하는 웹페이지 : offline web application
* 화상 통신 웹 앱 : webRTC
* 음성 : speech로 시작되는 API들
* 3차원 그래픽 : webGL
* 가상현실 : webVR