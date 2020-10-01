## Events

> html,css 뿐만 아니라 자바스크립트는 이벤트를 다룰 수 있다.

[참고](https://developer.mozilla.org/en-US/docs/Web/Events)



```javascript
function handleResize(){
    console.log("I have been resized");
}

window.addEventListener("resize", handleResize);		// resize 되면 실행
window.addEventListener("resize", handleResize());		// 지금 바로 실행!!!
```



#### if -else

```javascript
const title = document.querySelector("#title");
const BASE_COLOR = "white";				// css 값을 변수로 저장한다.
const OTHER_COLOR = "black";

function handleClick() {
    const currentColor = title.style.color;
    if (currentColor === BASE_COLOR){		// 조건
        title.style.color = OTHER_COLOR;
    } else {
        title.style.color = BASE_COLOR;
    }
}

function init(){
    title.style.color = BASE_COLOR;
    title.addEventListener("click", handleClick);
}
init();
```

```javascript
//css는 css페이지 에서 다루는게 깔끔하다. index.css
h1 {
    color: white

}

.clicked {
    color: black
}

//index.js
const title = document.querySelector("#title");
const CLICKED_CLASS = "clicked";		// 클래스를 추가하거나 제거해준다.

function handleClick() {
    const hasClass = title.classList.contains(CLICKED_CLASS);
    if (currentColor !== CLICKED_CLASS){
        title.classList.add(CLICKED_CLASS);
    } else {
        title.classList.remove(CLICKED_CLASS);
    }
}

function init(){    
    title.addEventListener("click", handleClick);
}
init();
```

```javascript
const title = document.querySelector("#title");
const CLICKED_CLASS = "clicked";

function handleClick() {
    title.classList.toggle(CLICKED_CLASS);         // 한줄로 가능하다.
}

function init(){    
    title.addEventListener("click", handleClick);
}
init();
```

