## model function

admin에서 함수를 만들었지만, admin 바깥 (everywhere) 에서도 사용할 수 있게 하기 위해 model에 함수를 만들 수 있다.

```python
# 점수의 평균
# review/models.py
def rating_average(self):
        avg = (
            self.accuracy
            + self.communication
            + self.cleanliness
            + self.location
            + self.check_in
            + self.value
        ) / 6
        return round(avg, 2)
```

```python
# review/admin.py
@admin.register(models.Review)
class ReviewAdmin(admin.ModelAdmin):

    """ Review Admin Definition """

    list_display = (
        "__str__",
        "rating_average",
    )
```

