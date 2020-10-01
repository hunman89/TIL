## Function

> 원하는 만큼 쓸수 있는, 기능을 지닌 한 조각의 코드



#### 내장함수

ex) console.log, alert



#### 만들기

```javascript
function sayHello(){
    console.log('Hello!')
}
```



#### 사용하기

```javascript
sayHello();
```



#### argument

> 변수같은것, 우리가 주는것.

```javascript
function sayHello(potato){
    console.log('Hello! ', potato)
}
sayHello("hunman");

> Hello! hunman
```
다음도 가능하다.

```javascript
function sayHello(name,age){
    return`Hello ${name} you are ${age} years old`
}

const greetNicolas = sayHello("Nicolas", 14)

console.log(greetNicolas)
```

```javascript
const calculator = {
    plus:function (a,b){
        return a + b;
    }
}
const plus = calculator.plus(5,5)
console.log(plus)
```

