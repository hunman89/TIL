## View

> url에 대한 결과, 화면

url.py에서 연결해 준다.

config/url.py 에 모두 담지말고, 각각의 앱으로 나누고 정복하자(divide & conquer)

단, 여기서 urlpatterns 단어를 바꾸면 안된다.

room/view.py에 임시 view를 만든다.

```python
from django.shortcuts import render

# url을 클릭할 때 발생하는 request가 인자로 들어간다.
def all_rooms(request):
    pass
```

이 뷰를 root에 연결할 것이기 때문에 root를 관장하는 core/urls.py를 생성한다.

이 기준에 따라 room,user 등에도 urls.py 생성

```python
from django.urls import path
from rooms import views as room_views
# 필수
app_name = "core"
# 아무것도 붙지않은 url에 연결
urlpatterns = [path("", room_views.all_rooms, name="home")]
```

마지막으로 congif/urls.py에 연결

```python
from django.contrib import admin
from django.urls import path, include # include 추가
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # corepath 연결, 앞에서 부터 실행한다.
    path("", include("core.urls", namespace="core")),
    path("admin/", admin.site.urls),
]

```



#### HTTP request, reponse

지정한 url을 클릭하면 httprequest 가 발생하고

우리가 httpresponse를 돌려주지 않았기 때문에 아직까지는 화면에 에러가 발생한다.

httprequest 는 로그인 정보와 같은 수많은 정보가 들어간다.

rooms/views.py

```python
from datetime import datetime
from django.shortcuts import render
from django.http import HttpResponse


def all_rooms(request):
    now = datetime.now()
    return HttpResponse(content=f"<h1>{now}</h1>")
```

이렇게 하지않고 렌더링 이용! (template)



