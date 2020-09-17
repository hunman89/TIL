## React

> 사용자 인터페이스를 만들기 위한 Javascript 라이브러리

* 왜 쓰는가?

    1. 사용자 경험
    2.  재사용 컴포넌트
    3.  데이터-화면 일치



## React 세팅하기

``` html
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
```

* 두 줄만 추가하면 React를 사용할 수 있다.
* 배포 시 뒤의 `.development.js `를 `.production.js `로 바꿔준다.
* 크롬 확장 프로그램을 설치 [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)



## 예제 : like 버튼

```html
<div><button>Like</button></div>
```

* html로만 이루어진 위를 React로 바꾸면 아래와 같다
  * 초반엔 답답할 수 있으나 천천히 따라가 보자.

```html
    <div id="root"></div>
    <script>
        const e = React.createElement;				// HTML태그를 만든다고 생각
        class LikeButton extends React.Component { 	// React.Component로 부터 상속 받아 React class를 만든다.  
            constructor(props) { 					// 기본적으로 쓰는것.
                super(props);
            }
            render() {
                return e('button', null, 'like'); 	// <button>Like</button> 을 만들 것 이다.
            }
        }
    </script>
    <script>
        ReactDOM.render(e(Likebutton), document.querySelector('#root')); // 위 script를 렌더링한다.
    </script>
```

* class를 통해서 만들기로 **예정**한 다음에 ReactDOM으로 렌더링하여 실현한다.

	> 이를 컴포넌트라 하며 실현할 때 여러개 추가하면 반복 생성이된다. => **재사용**이 쉽다.



## 객체 속성 넣기

> 'onclick' 과 같은 속성을 부여할 수 있다.

* 위 코드에서 render부분을 수정하면 된다.

    ```react
    render() {
        return e('button', { onClick: () => { console.log('clicked')}, type: 'submit' }, 'like');
        // <button onclick="() => { console.log('clicked') }" type="submit">like</button>
    }
    ```

* 상태(바뀔수 있는 부분)를 설정하여 바꿀 수 있다.

  * 설정은 constructor에서 한다.

      ```react
      constructor(props) {
          super(props);
          this.state = {
              liked: false, // liked 라는 속성을 false로 정함.
          };
      }
      ```

  * 바꾸는건 rander 부분

    ```react
    render() {
        return e('button', { onClick: () => { this.setState({ liked: true})}, type: 'submit' }, this.state.liked === ? 'Liked' : 'Like',);    
    }
    ```

    * state가 true로 바뀌면 liked로 바뀐다.

> 복잡할수록 강력해 진다.



## JSX와 바벨

> React에서는 좀 더 코드를 보기 쉽게하는? JSX라는 선택지가 있다.

* JavaScript

  ```javascript
  // "좋아요" <button>을 표시
  return e(
    'button',
    { onClick: () => this.setState({ liked: true }) },
    'Like'
  );
  ```

* JSX

  ```jsx
  //  "좋아요" <button>을 표시
  return (
    <button onClick={() => this.setState({ liked: true })}>
      Like
    </button>
  );
  ```

* 세팅

  ```HTML
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  
  <script type="text/babel"></script>
  ```

  > **바벨**은 JavaScript에서 실험적인 문법을 사용할 수 있게 해준다. 



* 예제

  ```jsx
  render(){
      return <button type="submit" onClick = {() => { this.setState({ liked : true})}}> 
  	{this.state.liked === true ? 'Liked' : 'Like'}
  	</button>;		//JSX
  }
  
  <script type="text/babel">
  	ReactDOM.render(<Likebutton/>, document.querySelector('#root'));
  </script>
  ```



