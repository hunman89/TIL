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

__set 이란걸 확인 할 수 있는데 이건 ForenKey 관계에 장고가 자동적으로 생성해 준 것이다.



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

QuerySet은 object의 리스트이다.

여러가지 기능이 있다.

```python
>>> all_user = User.objects.all()
>>> all_user.filter(superhost=True)
<QuerySet []>
>>> all_user.filter(superhost=False)
<QuerySet [<User: hunman>]>
```

