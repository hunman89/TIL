## admin.py

> app의 데이터들을 admin 패널에서 어떻게 보여줄지 설정한다.

* class를 만든다.

  ```python
  from django.contrib import admin
  from . import models
  
  class CustomUserAdmin(admin.ModelAdmin):    
  ```

* User와 연결

  ```python
  @admin.register(models.User)			# 1 : decorator
  class CustomUserAdmin(admin.ModelAdmin):
      
      
  admin.site.register(models.User, CustomUserAdmin) # 2
  ```

  * 1,2 모두 같은 기능을 한다. 1은 클래스 바로 위 라인에있어야 한다.

* setting

  ```python
  # 무엇을 보여줄지
  list_display = ("username", "gender", "language", "currency", "superhost")
  # 어떤값으로 필터링 할지
  list_filter = ("language", "currnecy", "superhost")
  ```


* many to many field인 경우 좋은 필터

  ```python
  filter_horizontal = (
      "amenity",
      "facility",
      "houserule",
  )
  ```

  



#### fieldset

> 기존에 존재하는 Useradmin을 유지하면서 custom하고 싶을때
>
> field의 집합

* 기존 Useradmin을 불러온다.

  ```python
  from django.contrib import admin
  from django.contrib.auth.admin import UserAdmin
  from . import models
  
  
  @admin.register(models.User)
  class CustomUserAdmin(UserAdmin):
  ```

* fieldset 설정

  ```python
  @admin.register(models.User)
  class CustomUserAdmin(UserAdmin):
  
      """ Custom User Admin """
  
      fieldsets = UserAdmin.fieldsets + (
          ("Custom Profile", {"fields": ("avatar", "gender", "bio")}),
      )
  ```

  * fieldset을 여러개 지정 할 수 있다.
  
  

#### Search

어떤 모델의 값을 기준으로 검색할지 결정

```python
search_fields = ("city",)
```

검색방법을 결정할 수 있다.

```python
# 정확히 일치
search_fields = ("=city",)
# 앞부분 일치
search_fields = ("^city",)
# 디폴트 = 대소문자 구분 x
```

연결된 models의 값을 가져올 수도 있다.

```python
# host의 username 가져오기
search_fields = ("city", "host__username")
```



#### Ordering

정렬하기

```python
# 순서대로 우선순위를 지니고 정렬된다.
ordering = ("name", "price", "bedrooms")
```



#### Admin function

함수로 model을 정의할 수 있다

many_to_many 관계의 경우 유용 = 개수 표시

```python
# self : class, object : 현재 row
def count_amenities(self, object):
        return object.amenity.count()
```



