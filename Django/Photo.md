## Upload

> 사진을 그냥 ImageField()로 업로드하면 경로가 꼬인다.
>
> 경로를 지정해 줘야 한다.



#### MEDIA_ROOT

> 파일이 저장될 경로 지정

config/setting.py

절대경로 사용.

```python
# base_dir : 장고 폴더의 절대경로
# os.path.join 을 통해 경로를 합칠 수 있다. ( = 폴더 생성)
MEDIA_ROOT = os.path.join(BASE_DIR, "uploads")
```



#### 폴더 지정

경로에 어떤 폴더에 저장할지 결정

```python
# rooms/models.py
file = models.ImageField(upload_to="room_photos")
# users/models.py
avatar = models.ImageField(upload_to="avatars", blank=True)
```



#### URL 세팅

settings.py

```python
MEDIA_URL = "/media/"
# 경로 시작에 / 를 붙이면 절대경로로 root에 붙는다.
```

urls.py

```python
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
]

# 개발 모드일때
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

위 설정까지 해야 비로소 보인다.

그러나 이건 개발모드일 경우에만 적용해야 하고 (그렇지 않으면 서버의 리소스를 많이 먹는다.)

배포 이후엔 경로 지정을 다른 방식을 사용해야 한다.



#### Admin panel에 사진 보여주기

```python
@admin.register(models.Photo)
class PhotoAdmin(admin.ModelAdmin):

    """ Phot Admin Definition """

    list_display = ("__str__", "get_thumbnail")

    def get_thumbnail(self, object):
        return f'<img width="50px" src="{object.file.url}" />'

    get_thumbnail.short_description = "Thumbnail"
```

이렇게 하면 html tag가 그냥 string으로 보여진다.

보안상 코드를 읽지 못하게 하기 떄문에

django.util.html 을 이용하여 해결

```python
from django.utils.html import mark_safe

...
def get_thumbnail(self, object):
        return mark_safe(f'<img width="50px" src="{object.file.url}" />')
```

