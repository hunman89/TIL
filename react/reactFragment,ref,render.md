## React Fragment

> render 과정에서 쓸모없는 `<div/>`가 생성되는데 이를 바꿔준다.

```react
render() { 
    return ( 
        <div>
            <div>  
                {this.state.first}곱하기{this.state.second}는? 
            </div>
            <form onSubmit = {this.onSubmit}>
                <input ref={(c) => {this.input = c;}} type="number" value={this.state.value} onChange = {this.onChange} />
                <button>입력</button>
            </form>
            <div>{this.state.result}</div>
        </div>
    ); 
}
```

* 적용 후 
  * 바벨 버전에 따라 <></> 가 작동한다. 

```react
render() { 
    return ( 
        <React.Fragment>
            <div>  
                {this.state.first}곱하기{this.state.second}는? 
            </div>
            <form onSubmit = {this.onSubmit}>
                <input ref={(c) => {this.input = c;}} type="number" value={this.state.value} onChange = {this.onChange} />
                <button>입력</button>
            </form>
            <div>{this.state.result}</div>
        </react.Fragment>
    ); 
}
```



## Constructor

> 객체지향언어



## Function vs 화살표 함수

> 함수 내부의 this가 달라진다.



## ref

> reference, 참조
>
> dom에 직접 접근하고 싶을때(querySelector)

* ref 삽입, {input}에 다른 이름 부여 가능하며 중괄호 제거해야함.

  ```react
  <input ref={(c) => {this.{input} = c;}} ... />
  ```

* 선언 및 함수 적용

  ```react
  input;
  
  onSubmit = (e) => { // submit 시 실행
  	e.preventDefault();
      ...
      this.input.focus();
      ...
  }
  ```

  * focus 된다.



## render

* setState 마다,  render함수가 실행된다.

  * 숫자 입력 하나마다 실행된다.

* 그러므로 render안에 함수는 빼주는것이 좋다.

  ```react
  onRefInput = (c) => {this.input = c;}
  ...
  <input ref={this.onRefInput} ... />
  ```

  

## html 변경점

> html과 javascript에 겹치는 문법이 있어 JSX 작성시 유의한다. (html 태그 내부)

* class -> className
* for -> htmlFor

