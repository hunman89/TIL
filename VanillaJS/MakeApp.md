## 기능 구현

> 어떤 함수들이 있는지 알아두기만 하자.



#### 시간

* date 객체

  * getHours, getMinutes 와 같은 내장함수 이용

    ```javascript
    const minutes = date.getMinutes();        
    const seconds = date.getSeconds();
    ```

    

* setIntervat 함수

  * 어떤 함수를 밀리초단위 간격으로 실행

    ```javascript
    setInterval(getTime, 1000);  			// get time을 1초 간격
    ```




* 삼항 연산자

  * 여기선 한자리 수앞에 '0'을 붙이기 위해 사용

    ```javascript
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds}`;
    ```



#### Local storage

> 웹 페이지마다 가지고 있는 저장소로, 사용자의 컴퓨터에 저장된다. 다른 페이지에 영향을 주지 않는다.

* 넣기

  ```javascript
  function saveName(text) {                       // 로컬 저장소에 이름 저장하기
      localStorage.setItem(USER_LS, text);		// [USER_LS, text]	
  }
  ```

  

* 불러오기

  ```javascript
  function loadName() {
      const currentUser = localStorage.getItem(USER_LS);	// 불러온다.
      if (currentUser === null) {							// 없다면,
          askForName();
      } else {											// 있다면.
          paintGreeting(currentUser);
      }
  }
  ```



* 주의사항

  * string으로 저장하려고한다. (true => "true")

  * object는 json이용

    ```javascript
    function saveTodos() {
        localStorage.setItem(TODOS_LS, JSON.stringify(todos));  
        // 그냥 저장하면 OBJECT라고만 뜬다. 
    }
    ```

  * 불러오기

    ```javascript
    const loadTodos = localStorage.getItem(TODOS_LS);
    const parsedTodos = JSON.parse(loadTodos);          // string -> object
    ```



#### 리스팅하기

> 함수를 조건으로 사용한다.

* forEach

  ```javascript
  function loadTodos(){
      const loadTodos = localStorage.getItem(TODOS_LS);
      if (loadTodos !== null) {
          const parsedTodos = JSON.parse(loadTodos);         
          // string -> object
          parsedTodos.forEach(function(todo) {                
              // foreach = array 내부 값 하나씩 꺼내, 함수를 실행한다.
              paintTodo(todo.text);
          });
      }
  }
  ```



* filter

  ```javascript
  function deleteTodo(event) {
      const btn = event.target;
      const li = btn.parentNode;
      todoList.removeChild(li);
      const cleanTodos = todos.filter(function(todo){
          return todo.id !== parseInt(li.id);
      })               // 배열중에 함수가 true인 값만 가져온다.
      console.log(cleanTodos);
      todos = cleanTodos;
      saveTodos();
  }
  ```

  

#### 무작위 수

```javascript
const IMG_NUMBER = 5;

function genRandom() {
    const number = Math.floor(Math.random()*IMG_NUMBER);
    return number;
}
```



#### API

> 웹사이트나 다른 텀퓨터와 데이터를 주고받는것.

[날씨 API](https://openweathermap.org/)

* 자바스크립트 자체로 api를 불러올 수 있다!

  ```javascript
  function getWeather(lat, lng) {
      fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
      ).then(function(response) {             // 데이터가 오고 나서 다음 함수를 실행한다.
          return response.json();             // json으로 만든다
      }).then(function(json){                 // 만든 다음!(then) 실행
          console.log(json);
          const tmp = json.main.temp;
          const place = json.name;
          weather.innerText = `${tmp} @ ${place}`;
      });
  }
  ```

  * then : 앞의 것이 완료되고 나서 실행되도록 하는 함수