## \__str\__

> 파이썬은 class를 string으로 변환하여 읽는다.
>
> class를 어떻게 보여질지 정할 수 있다.

```python
# 클래스의 name값
def __str__(self):
        return self.name

# 그저 potato
def __str__(self):
        return "potato"
```

 

#### Join

리스트 출력 시 string으로 변환하여 준다.

```python
def __str__(self):
    usernames = []
    for user in self.participants.all():
        usernames.append(user.username)
    return ", ".join(usernames)
# 리스트 값을 ,로 구분하여 string으로 출력
```

