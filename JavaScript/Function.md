## Javascript 함수

> 수납상자같은 것.
>
> 코드를 정리해주고... 가독성을 높여주고... 좋다.

```html
<input id='night_day' type='button' value='night' onclick='nightdayhandler(this);'>

<script>
  function nightdayhandler(self) {
    // 아주 긴 Javascript 코드를 여기 넣어줍니다.
  }
</script>
```



#### 반복문? 함수?

> 연속적인 반복이 아니면 반복문을 사용하지 못한다.

이 외에도 함수를 사용했을때 유리한 점이 있다.



#### 매개변수, 인자

> 입력에따른 출력값 or 실행이 다르게 해준다.

``` javascript
function onePlusOne() {						// 1+1 밖에 실행못한다. = 결과는 항상 2
  document.write(1+1);
};

function sum(left, right) {					// left, right라는 매개변수를 지정하여
  document.write(left + right);				// 둘의 합을 출력한다.
};

sum(2,3);									// 결과는 5
sum(100,20);								// 결과는 120
```



#### 리턴 = 출력

> return으로 출력값을 지정해 줄 수 있다.

```javascript
function sum(left, right) {					
  document.write(left + right);				// 둘의 합을 write 밖에 못한다.
};

function sum(left, right) {
  return left + right;						// 합의 값만 돌려받는다.
}

document.write(sum(2,3));							// 여러가지 용도로 사용 가능하다.
document.write('<div style="color:red">'+sum(2,3)+'</div>');
```

