## Template filter

> 장고는 template에서 작동하는 여러가지 filter를 제공한다.
>
> 덧셈, 대문자, 가운데 정렬, 날짜 형식 등



#### add

templates/rooms/home.html

```python
<h5>
{% if page is not 1 %}
	# {{page += 1 }} 이런건 작동 안한다.    
    <a href='?page={{page|add:-1}}' >Back</a>
{% endif %}  

Page {{page}} of {{page_count}}

{% if not page == page %}
    <a href='?page={{page|add:1}}' >Next</a>
{% endif %}
</h5>
```

