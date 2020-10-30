## Connect Admin panel

> 연결된 앱이나 model을 편하게 나타낼 수 있다.

#### raw_id_field

> ForeignKey와 같은 연결된 앱의 대상이 많아질때, 리스트가 길어지는 것을 방지
>
> 새 창에 작은 admin을 만들어 준다.

 ```python
raw_id_fields = ("host",)
 ```

검색기능도 포함되기 때문에 편리하다



#### Inline

> 연결된 model의 admin을 같은 페이지에 보여지게 하여 관리를 한번에 편리하게 한다.

```python
class PhotoInline(admin.TabularInline):

    model = models.Photo


@admin.register(models.Room)
class RoomAdmin(admin.ModelAdmin):

    """ Room Admin Definition"""

    inlines = (PhotoInline,)
    ...
```

roomadmin에 room과 연결된 photo admin이 나타나고, 관리할 수 있다. 

photo에 따로 room을 지정할 필요가 없다.

TabularInline, StackedInline이 있다. 디자인 차이.



