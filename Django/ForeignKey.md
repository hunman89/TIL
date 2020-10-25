## ForeignKey

> model 사이 연결
>
> many-to-one relationship
>
> 한 유저는 여러개의 room을 가질 수 있다.

* models.py of rooms

  * room 에만 지정하면 된다.

  ```python
  from users import models as user_models
  
  class Room(core_models.TimeStampedModel):
      host = models.ForeignKey(user_models.User, on_delete=models.CASCADE)
  ```

* on_delete
  * 여기서 연결된 User가 삭제되면 어떤 행동을 할지 결정해준다.
  * CASCADE : Room도 삭제된다. 
  * SET_NULL : NULL이 된다.
  * SET_DEFAULT
  * PROTECT : Room을 지우기 전까지 User를 지울 수 없다.



## ManyToMany

> 다대다 관계
>
> 방들은 amenity를 여러개 지니고 있다, 하나의 amenity class는 여러 방에 있을 수 있다.

```python
# 어디에나 적용 가능한 추상객체를 만든다.(rooms/models.py)
class AbstractItem(core_models.TimeStampedModel):

    """ Abstract Item """
	# 필요한 model 선언.
    name = models.CharField(max_length=80)
	# 필수!
    class Meta:
        abstract = True
	# 어떻게 불릴지.
    def __str__(self):
        return self.name

# 그것들로 이루어진 그룹 만든다. 예) Amenity, 집 사용규칙 편의시설 같은 것들
class Amenity(AbstractItem):
    pass


class Room(core_models.TimeStampedModel):

    """ Room Model Definition """

    ...
    # ManyToManyField로 가져온다.
    amenity = models.ManyToManyField(Amenity)
```



## 값 가져오기

> 모델간 연결이 있을때, 모델의 값을 가져오는 방법은 쉽다.

```python
class Reciew(core_models.TimeStampedModel):

    """ Review Model Definition """

   ...
    room = models.ForeignKey("rooms.Room", on_delete=models.CASCADE)

    def __str__(self):
        return self.room.host.username
```

* 리뷰 모델과 연결된 room 과 연결된 host 의 이름 값이 \__str\__로 출력된다.

  