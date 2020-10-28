## Console

> 콘솔로 장고 시스템을 들여다 볼 수 있다.

#### 접속하기

```shell
(airbnb-clone) hunman@LAPTOP-ITFN3K1M:/mnt/c/airbnb-clone$ python manage.py shell

Python 3.8.5 (default, Jul 28 2020, 12:59:40) 
[GCC 9.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
(InteractiveConsole)
```

```python
>>> from users.models import User
```

우리가 만든 user 앱에 접속할 수 있다.



#### dir,vars

```python
# return all properties and methods
>>> dir(users)
# returns the __dic__ attribute of an object
>>> vars(users)
```



#### 데이터베이스에서 가져오기

```python
>>> User.objects
<django.contrib.auth.models.UserManager object at 0x7f02b13e7a30>
```

데이터 모델을 생성하기만 하면 장고는 자동적으로 CRUD API를 생성해 준다!!

```python
>>> User.objects.all()
<QuerySet [<User: hunman>]>
```



#### _set (Foreignkey)

_set 이란걸 확인 할 수 있는데 이건 Foreignkey 관계 model에 장고가 자동적으로 생성해 준 것이다.

AdminPanel에 표시 안 되더라도, 데이터엔 생성 되어 있다.

```python
>>> hunman = User.objects.get(username="hunman")
>>> hunman
<User: hunman>
# 데이터를 가져올 수 있다.
>>> hunman.review_set.all()
<QuerySet [<Review: good~ - huni's room>]>
```

연결 이름을 바꿀 수 있다. (related_name)

```python
# rooms/models.py
host = models.ForeignKey("users.User", related_name="rooms" on_delete=models.CASCADE)
```

```python
# console
>>> hunman.rooms.all()
<QuerySet [<Room: huni's room>]>
```



