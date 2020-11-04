## Paginator

> 페이지 만들어 준다.

view.py

```python
from django.shortcuts import render
from django.core.paginator import Paginator
from . import models


def all_rooms(request):
    page = request.GET.get("page")
    room_list = models.Room.objects.all()
    paginator = Paginator(room_list, 10)
    rooms = paginator.get_page(page)
    return render(
        request,
        "rooms/home.html",
        context={"rooms": rooms},
    )

```

home.html

```html
{%extends "base.html"%}
{%block page_name%}Home
{%endblock page_name%}
{% block content %}
{% for room in rooms.object_list %}
<h1>{{room.name}}/${{room.price}}</h1>
{%endfor%}

<h5>
{% if rooms.has_previous %}
    <a href='?page={{rooms.number|add:-1}}' >Back</a>
{% endif %}  

Page {{rooms.number}} of {{rooms.paginator.num_pages}}

{% if rooms.has_next %}
    <a href='?page={{rooms.number|add:1}}' >Next</a>
{% endif %}
</h5>

{% for page in rooms.paginator.page_range %}
    <a href='?page={{page}}' >{{page}}</a>
{% endfor %}
```



#### get_page / page

페이지가 더이상 넘어가지 않게 막았지만, url으로 접근이 가능하다. 이를 막기위해 코딩.\

get_page : 내용이없는 페이지는 1페이지로 이동, page : exception 발생

paginator의 함수중 page는 get_page보다 좀 더 유저가 세팅해야 한다.

```python
from django.shortcuts import render, redirect
from django.core.paginator import Paginator, EmptyPage
from . import models


def all_rooms(request):
    page = request.GET.get("page", 1)
    room_list = models.Room.objects.all()
    paginator = Paginator(room_list, 10, orphans=5)  # 5개 이하면 이전 페이지에 붙인다.
    try:
        rooms = paginator.page(int(page))
        return render(
            request,
            "rooms/home.html",
            context={"pages": rooms},
        )
    except EmptyPage:
        return redirect("/")
```













#### paginator 미사용

view.py

```python
from math import ceil
from django.shortcuts import render
from . import models


def all_rooms(request):
    page = int(request.GET.get("page", 1))
    page = int(page or 1)
    page_size = 10
    limit = page_size * page
    offset = limit - 10
    all_rooms = models.Room.objects.all()[offset:limit]
    page_count = ceil(models.Room.objects.count() / page_size)
    return render(
        request,
        "rooms/home.html",
        context={
            "rooms": all_rooms,
            "page": page,
            "page_count": page_count,
            "page_range": range(1, page_count),
        },
    )
```

home.html

```html
{%extends "base.html"%}
{%block page_name%}Home
{%endblock page_name%}
{% block content %}
{% for room in rooms %}
<h1>{{room.name}}/${{room.price}}</h1>
{%endfor%}

<h5>
{% if page is not 1 %}
    <a href='?page={{page|add:-1}}' >Back</a>
{% endif %}  

Page {{page}} of {{page_count}}

{% if not page == page_count %}
    <a href='?page={{page|add:1}}' >Next</a>
{% endif %}
</h5>

{% for page in page_range %}
    <a href='?page={{page}}' >{{page}}</a>
{% endfor %}
    
{% endblock content %}
```

