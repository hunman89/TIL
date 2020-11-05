## Form API

> room 검색기능을 구현하기 위해 많은 작업을 했지만 장고에는 form이 있다. 



model과 같이 field가 있다. [참고](https://docs.djangoproject.com/en/3.1/ref/forms/fields/)

forms.py

```python
class SearchForm(forms.Form):

    city = forms.CharField(initial="Anywhere")
    price = forms.IntegerField(required=False)
    # html의 select와 같은것
    room_type = forms.ModelChoiceField(queryset=models.RoomType.objects.all())
    
```

views.py

```python
from . import models, forms

"..."

def search(request):
	# forms.py 와 연결
    form = forms.SearchForm()

    return render(
        request,
        "rooms/search.html",
        {"form": form},
    )

```

search.html

```html
<h2>Search!</h2>

<form method="get" action="{% url "rooms:search" %}">
    {{form.as_p}} <!-- 형식을 지정해 줄 수있다. .as_p,.as_table ..등등-->

    <button>Search</button>

</form>
```



#### widget

field가 보여지는 형식 (html)을 바꿀 수 있다

```python
class SearchForm(forms.Form):

    city = forms.CharField(initial="Anywhere", widget=forms.Textarea)
    ...
    amenities = forms.ModelMultipleChoiceField(
        queryset=models.Amenity.objects.all(), widget=forms.CheckboxSelectMultiple
    )    
```



#### 데이터 저장

검색을 위한 조건을 저장할 수 있다

views.py

```PYTHON
def search(request):

    form = forms.SearchForm(request.GET)

    return render(
        request,
        "rooms/search.html",
        {"form": form},
    )
```

단, 조건을 초기화하면 (http://127.0.0.1:8001/rooms/search/ 로 접속) required=False 지정한 field 는 에러가 나지 않지만, country는 하나를 선택해야 한다. 따라서 아래로 임시방편

```python
def search(request):
    country = request.GET.get("country")

    if country:
        form = forms.SearchForm(request.GET)
    else:
        form = forms.SearchForm()

    return render(
        request,
        "rooms/search.html",
        {"form": form},
    )
```



#### cleaned_data

form을 통해 django는 입력된 모든 조건들을 filed에 지정된 형식에 맞게 반환한다~

form.clensd_data로 불러올 수 있다.

```python
city = form.cleaned_data.get("city")
country = form.cleaned_data.get("country")
room_type = form.cleaned_data.get("room_type")
price = form.cleaned_data.get("price")
guests = form.cleaned_data.get("guests")
bedrooms = form.cleaned_data.get("bedrooms")
beds = form.cleaned_data.get("beds")
baths = form.cleaned_data.get("baths")
instant_book = form.cleaned_data.get("instant_book")
superhost = form.cleaned_data.get("superhost")
amenities = form.cleaned_data.get("amenities")
facilities = form.cleaned_data.get("facilities")
```







#### field lookup

> 장고에서 지원하는 검색기능

__ startswith, \__lte, \__gte 등이 있다

```python
filter_args = {}

if city != "Anywhere":
    filter_args["city__startswith"] = city

filter_args["country"] = country

if room_type is not None:
    filter_args["room_type"] = room_type

if price is not None:
    filter_args["price__lte"] = price

if guests is not None:
    filter_args["guests__gte"] = guests

if bedrooms is not None:
    filter_args["bedrooms__gte"] = bedrooms

if beds is not None:
    filter_args["beds__gte"] = beds

if baths is not None:
    filter_args["baths__gte"] = baths    
```

