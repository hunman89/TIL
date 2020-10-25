## f-string

> 파이썬에도 변수들과 문장을 간편하게 표현하는 방법이 있다.
>
> 변수의타입에 구애받지 않는다

```python
def __str__(self):
        return f"{self.review} - {self.room}"
```

* 소문자나 대문자 f 뒤에 작은따옴표나 큰따옴표를 쓴다.
* 따옴표 안에 내용을 적는데 변수명은 중괄호 {} 안에다 쓴다

```python
name = 'Song'
sex = 'male'

f'Hi, I am {name}. I am {sex}.'
>>> 'Hi, I am song. I am male.'
```

```python
import datetime
date = datetime.datetime.now() 

f'{date:%Y-%m-%d} is on a {date:%A}' 
>>> '2020-11-25 is on a Sunday'
```

