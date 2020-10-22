## Meta class

> 생성한 클래스를 컨트롤 할 수 있다.

* Amenity 클래스를 만들었는데 adminpage에 Amenitys 라고 나온다.

  * 이름 변경 가능

    ```python
    class RoomType(AbstractItem):
    
        """ RoomType Object Definition """
    
        class Meta:
            verbose_name = "Room Type"		# 자동으로 s가 붙는다.
    ```

    ```python
    class Amenity(AbstractItem):
    
        """ Amenity Object Definition """
    
        class Meta:
            verbose_name_plural = "Amenities"		# s 안붙음
    ```

  * 정렬 가능

    ```python
    class Meta:
            verbose_name = "Room Type"
            ordering = ["created"]
    ```

    

## Strings

> 장고는 클래스명을 string으로 바꾸면 알아서 연결해 준다.

```python
class Photo(core_models.TimeStampedModel):

    """ Photo Model Definition """

    caption = models.CharField(max_length=80)
    file = models.ImageField
    # Room 클래스가 뒤에 있어 에러지만 string으로 바꾸면 장고가 연결해 준다.
    room = models.ForeignKey("Room", on_delete=models.CASCADE)

    def __str__(self):
        return self.caption


class Room(core_models.TimeStampedModel):
    ...
```

* 다른 앱을 import 안해도 된다.

  ```python
  host = models.ForeignKey("users.User", on_delete=models.CASCADE)
  room_type = models.ForeignKey("RoomType", on_delete=models.SET_NULL, null=True)
  amenity = models.ManyToManyField("Amenity", blank=True)
  facility = models.ManyToManyField("Facility", blank=True)
  houserule = models.ManyToManyField("HouseRule", blank=True)
  ```

  