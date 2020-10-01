## Variable

> 바꿀 수 있는것?



변수를 사용하려면..

1. create
2. initialize
3. use

    ```javascript
    let a;				//1.
    a = 221;			//2.	
    console.log(a);		//3.
    ```



#### let

> 보통의 변수, 변화 가능



#### var 

> 예전 문법 (const,let이 없었음)



#### const

> constant , 상수, 변하지 않는다.

* 바꾸려고 하면 Assignment to constant variable 에러 발생.

* __기본으로 사용하자!!!__

* String, Boolean, Number(int, float) 가능



#### Array (const)

```javascript
const monday = "Mon";
const tue = "Tue";
const wed = "Wed";
const thu = "Thu";
const fri = "Fri";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", true, 123];			//Array
```



#### Object (const)

```javascript
const nocoInfo = {
    name:"nico",
    age:33,
    gender:"Male",
    isHandsome:true,
    favMovies: ["Along the gods", "Oldboy"],
    favFood: [
    { name : kimchi, fatty: false}
    ]
};

nicoinfo.gender = "female"  // 구조는 바꿀수 없지만 값은 바꿀 수 있다. (const라도!)
```

