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