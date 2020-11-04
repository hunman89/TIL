## Class Based View

> paginator 관련된 것들이 자동으로 구성이 되있다!! = ListView
>
> https://ccbv.co.uk/

views.py

```python
from django.views.generic import ListView
from . import models


class HomeView(ListView):
    """ HomeView Definition """

    model = models.Room
    paginate_by = 10
    paginate_orphans = 5
```

연결된 uls.py 변경

```python
urlpatterns = [path("", room_views.HomeView.as_view(), name="home")]
```

html 파일 이름 변경 = room_list.html

변수 변경 (연결된 model로 고정이 된다.)

rooms.object_list = object_list 

rooms = page_obj

```html
...
{% for room in rooms %}
<h1>{{room.name}}/${{room.price}}</h1>
{%endfor%}

<h5>
    {% if page_obj.has_previous %}
    <a href='?page={{page_obj.previous_page_number}}'>Back</a>
    {% endif %}

    Page {{page_obj.number}} of {{page_obj.paginator.num_pages}}

    {% if page_obj.has_next %}
    <a href='?page={{page_obj.next_page_number}}'>Next</a>
    {% endif %}
</h5>

{% endblock content %}
```



#### context 추가

지정된 model만 다룰 수 있는게 아니라 context를 추가할 수도 있다.

```python
from django.utils import timezone
...
class HomeView(ListView):
    ...
    def get_context_data(self, **kwargs):
            context = super().get_context_data(**kwargs)
            now = timezone.now()
            context["now"] = now  # now 라는 현재 시간 추가.
            return context
```

{{now}} 로 사용



**이해하기 위해 코드를 전부 사용할 때나, 많은 기능을 추가해야할 경우 제외하고 Class base view 를 사용하면 좋다.**