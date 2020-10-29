## Photo

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



#### 