## R 함수

> 큰 데이터를 손쉽게 보기위해

* head : 앞부분
* tail : 뒷부분
* View : 시각적으로 보여준다.



#### 타입 판별

* typeof() : 데이터의 타입 확인

| 함수             | 의미                                     |
| ---------------- | ---------------------------------------- |
| class(x)         | 객체 x의 클래스                          |
| str(x)           | 객체 x의 내부 구조                       |
| is.factor(x)     | 주어진 객체 x가 팩터인가                 |
| is.numeric(x)    | 주어진 객체 x가 숫자를 저장한 벡터인가   |
| is.character(x)  | 주어진 객체 x가 문자열을 저장한 벡터인가 |
| is.matrix(x)     | 주어진 객체 x가 행렬인가                 |
| is.array(x)      | 주어진 객체 x가 배열인가                 |
| is.data.frame(x) | 주어진 객체 x가 데이터 프레임인가        |



#### 타입 변환

> 데이터 프레임은 문자열을 팩터로 인식한다.
>
> 연산의 결과는 numeric으로 저장된다.

| 함수             | 의미                                        |
| ---------------- | ------------------------------------------- |
| as.factor(x)     | 주어진 객체 x를 팩터로 변환                 |
| as.numeric(x)    | 주어진 객체 x를 숫자를 저장한 벡터로 변환   |
| as.character(x)  | 주어진 객체 x를 문자열을 저장한 벡터로 변환 |
| as.matrix(x)     | 주어진 객체 x를 행렬로 변환                 |
| as.array(x)      | 주어진 객체 x를 배열로 변환                 |
| as.data.frame(x) | 주어진 객체 x를 데이터 프레임으로 변환      |



#### 라이브러리

```R
> install.packages("package name")			# 설치
> library(package name)						# 로드
```

