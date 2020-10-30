## Save Method

> 장고 모든 class에 저장 방법이 있는데 그 방식을 수정할 수 있다.



#### super()

> 부모 클래스에 접근 허용

```python
class Dog:
    def __init__(self):
        print("woof woof")
    def pee(self):
        print("I will pee")
       
class Puppy(Dog):
    def pee(self):
        print("go to the park")
        super().pee()
```

super().pee()를 통해 기존에 정의 되었던 pee를 유지할 수 있다.



save()

> 모델 저장 시 intercept 하여 설정할 수 있다.

```python
def save(self, *args, **kwargs):
    self.city = str.capitalize(self.city) # 맨 앞글자 대문자
    super().save(*args, **kwargs)
```



save_model()

> 좀 더 admin에 특화되고, 많은 정보를 지니고 있다.

```python
def save_model(self, request, obj, form, change):
    self.city = str.capitalize(self.city)
    super().save_model(request, obj, form, change)
```

