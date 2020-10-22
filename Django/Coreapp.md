## Coreapp

> 모든 앱들에게 재사용 가능한 common 기능을 가지고 있는것
>
> 생성,업데이트 로그 등등

* core 라는 app 생성

  ```shell
  $ django-admin startapp core
  ```

* 기능 부여해 준다.

  * 기능에 맞는 이름

    ```python
    from django.db import models
    
    
    class TimeStampedModel(models.Model):
    
        created = models.DateTimeField()
        updated = models.DateTimeField()
    	
    ## core app 자체가 데이터 베이스에 저장되는 것이 아니기 때문에 꼭 abstract 속성 부여!!
        class Meta:
            abstract = True
    ```

* 다른 앱에 TimeStampedModel 상속한다.

  ```python
  from django.db import models
  
  
  class TimeStampedModel(models.Model):
  
      created = models.DateTimeField(auto_now_add=True)
      updated = models.DateTimeField(auto_now=True)
  
      class Meta:
          abstract = True
  ```

  * auto_now_add=True
    * 생성시간을 자동 저장
  * auto_now=True
    * 저장시간을 자동 저장

