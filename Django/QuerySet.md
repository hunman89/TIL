## QuerySet

QuerySet은 object의 리스트이다.

여러가지 기능이 있다.

```python
>>> all_user = User.objects.all()
# 필터링
>>> all_user.filter(superhost=True)
<QuerySet []>
>>> all_user.filter(superhost=False)
<QuerySet [<User: hunman>]>
```

distinct

order_by