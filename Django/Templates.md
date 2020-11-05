## Templates

> view.py에서 보여지는 것을 코딩하지 않고 tamplate를 따로 만들어 장고가 컴파일 하게 한다.

html을 작성하면 된다.

config/setting.py 세팅

```python
TEMPLATES = [
    {
        ...
        "DIRS": [os.path.join(BASE_DIR, "templates")], # 디렉토리 지정
        ...
    }
```

templates/all_rooms.html 폴더및파일 생성

```html
<h1>hello!</h1>
```

views.py

```python
def all_rooms(request):
    return render(request, "all_rooms.html")
```



#### context

> 변수를 template에 보낼 수 있다. `{{}}`

views.py

```python
from datetime import datetime
from django.shortcuts import render


def all_rooms(request):
    now = datetime.now()
    hungry = True
    return render(request, "all_rooms.html", context={"now": now, "hungry": hungry})
```

all_rooms.html

```html
<h1>Hello!!</h1>
<!-- 변수는 {{ }} 안에-->
<h4>The time right now is: {{now}} </h4>
<!-- 로직은 {% %} 안에-->
<h6>
{% if hungry  %}I'm hungry{% else %}i'm okay{% endif %}
</h6> 
```

endif 눈여겨 볼것!!



{%include%}

{%block%}

로직을 활용하여 html을 잘게 쪼갤 수 있다.

모든 html에 기본이 되는 base.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block page_name %}{% endblock page_name %}| Nbnb</title>
</head>

<body>
    {% include "partials/header.html" %}
    {% block content %}{% endblock content %}
    {% include "partials/footer.html" %}

</body>

</html>
```

header와 footer.html도 따로 생성하여 include로 연결

```html
<header>
    <a href="/">Nbnb</a>
    <ul>
        <li><a href="#">Login</a></li>
    </ul>
</header>
```

```html
<footer>
    &copy; Nbnb
</footer>
```

content는 block이 있어야 들어간다.

home.html

```html
{%extends "base.html"%}
{%block page_name%}Home{%endblock page_name%}
{% block content %}
    {% for room in rooms %}
    <h1>{{room.name}}/${{room.price}}</h1>
    {%endfor%}
{% endblock content %}
```



#### {% url %}

경로를 하드코딩하기 보다, urls.py에 지정한 이름으로 연결할 수 있다.

일일이 다 외울 필요가 없다.

```html
<header>
    <!-- root -->
    <a href="{% url "core:home" %}">Nbnb</a>
    <ul>
        <li><a href="#">Login</a></li>
    </ul>
</header>
```

```html
<h3>
    <!-- /rooms/각각 room의 pk -->
    <a href="{% url "rooms:detail" room.pk %}">
        {{room.name}}/${{room.price}}
    </a>
</h3>
```

> adminpanel에서 view 를 바로 볼 수 있는 기능이 있다.
>
> models.py 에 추가

``` python
def get_absolute_url(self):
    from django.urls import reverse

    return reverse("rooms:detail", kwargs={"pk": self.pk})
```



