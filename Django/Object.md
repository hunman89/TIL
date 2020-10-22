## 객체상속 (User)

* 우리의 user 객체는 많은 기능이 필요하기 때문에

* 기존에 django에 존재하는 user 객체를 *확장*해야 한다.

* users/models.py

  ```python
  from django.contrib.auth.models import AbstractUser
  from django.db import models
  
  # 다른 객체는 Model 객체를 상속 database와 커뮤니케이션 한다.
  # user는 이미 존재하는 auth.models를 불러와 상속한다.
  
  
  class User(AbstractUser):
      pass		# 임시 코드
  
  ```

  

* setting.py 세팅

  ```python
  # Application definition
  # 보기쉽게 앱들을 구분
  # 미리 구성된 장고 앱
  DJANGO_APPS = [
      "django.contrib.admin",
      "django.contrib.auth",
      "django.contrib.contenttypes",
      "django.contrib.sessions",
      "django.contrib.messages",
      "django.contrib.staticfiles",
  ]
  
  # 프로젝트에서 생성한 앱들
  PROJECT_APPS = [
      "users.apps.UsersConfig",
  ]
  
  INSTALLED_APPS = DJANGO_APPS + PROJECT_APPS
  
  ###### 맨뒤에 추가 ######
  # users app의 user객체
  AUTH_USER_MODEL = "users.User"
  ```

* migration 생성

  ```shell
  $ python manage.py makemigrations
  	Migrations for 'users':
    	users/migrations/0001_initial.py
      - Create model User
  $ python manage.py migrate
  Operations to perform:
    Apply all migrations: admin, auth, contenttypes, sessions, users
  Running migrations:
    Applying contenttypes.0001_initial... OK
    Applying contenttypes.0002_remove_content_type_name... OK
    ...
  ```

  * sql문 대체.
  * db.sqlite3 같은거 지우고 해야 잘 된다.
  * 개발 후, migration 파일 지우고 app 별로 몰아서 한번만 migration 하는 것이 좋다.

* 런서버 하고, admin 로그인.

* [AUTHENTICATION AND AUTHORIZATION]에 User이 사라졌다!! ( 기본으로 있던.)

* admin.py

  ```python
  from django.contrib import admin
  from . import models
  
  
  @admin.register(models.User)
  class CustomUserAdmin(admin.ModelAdmin):
      pass
  ```

* Model Fields

  * database 의 columns와 비슷

  * 다양한 형식을 지정해 줄 수 있다.

  * django가 *형식에 맞는 값*이 들어가게 해 준다.

  * models.py
  
    ```python
    class User(AbstractUser):
    
        # Model field
      bio = models.TextField(default="")
    ```
  
    * user가 text로 이루어진 bio값을 지니게 하였다.
    
  * default  = 비어있는 공간의 값
    
  * or null = True 로 빈 공간 허용
    
  * migration을 재 적용하면 (db.sqlite3 삭제 불필요) admin 페이지에 적용된 것을 볼 수 있다.



#### user model 만들기

* 몇가지 유저의 field를 생성한다.

  * Imagefield엔 Pillow가 필요하다 = pipenv로 설치!

    ```python
    class User(AbstractUser):
    
        """ Custom User Model """
    
        # Model field
    
        avatar = models.ImageField(null=True)
        gender = models.CharField(max_length=10, null=True)
        bio = models.TextField(default="")
    ```

  * charfield는 textfield와는 다르게 한줄이다.

  * migrate 필수!

* 몇가지 값중에 하나만 선택하게 하자.

  ```python
  class User(AbstractUser):
      GENDER_MALE = "male"
      GENDER_FEMALE = "female"
      GENDER_OTHER = "other"
  
      GENDER_CHOICES = (
          (GENDER_MALE, "male"),
          (GENDER_FEMALE, "female"),
          (GENDER_OTHER, "other"),
      )
  
      gender = models.CharField(choices=GENDER_CHOICES, max_length=10, null=True)
     
  
  ```

  * migration 안해도 됨.

* blank

  * null=true해도 admin page에서 빈공간으로 두면 넘어가지가 않는데, input창의 blank도 허용해 줘야 한다.
  * blank=True !!

* date 와 datetime은 잘 구분해서 써야한다.

```python
from django.contrib.auth.models import AbstractUser
from django.db import models

# 다른 객체는 Model 객체를 상속 database와 커뮤니케이션 한다.
# user는 이미 존재하는 auth.models를 불러와 상속한다.


class User(AbstractUser):

    """ Custom User Model """

    # Model field
    # db colunm = django name

    GENDER_MALE = "male"
    GENDER_FEMALE = "female"
    GENDER_OTHER = "other"

    GENDER_CHOICES = (
        (GENDER_MALE, "male"),
        (GENDER_FEMALE, "female"),
        (GENDER_OTHER, "other"),
    )

    LANGUAGE_ENGLISH = "en"
    LANGUAGE_KOREAN = "ko"

    LANGUAGE_CHOICES = (
        (LANGUAGE_ENGLISH, "english"),
        (LANGUAGE_KOREAN, "korean"),
    )

    CURRENCY_USD = "usd"
    CURRENCY_KRW = "krw"

    CURRENCY_CHOICES = (
        (CURRENCY_USD, "usd"),
        (CURRENCY_KRW, "krw"),
    )

    avatar = models.ImageField(null=True, blank=True)
    gender = models.CharField(
        choices=GENDER_CHOICES, max_length=10, null=True, blank=True
    )
    bio = models.TextField(default="", blank=True)
    birthdate = models.DateField(null=True)
    language = models.CharField(
        choices=LANGUAGE_CHOICES, max_length=2, null=True, blank=True
    )
    currency = models.CharField(
        choices=CURRENCY_CHOICES, max_length=3, null=True, blank=True
    )
    superhost = models.BooleanField(default=False)
```

