## Verify Email

> 가입하려는 사용자를 메일로 인증한다.

#### mailgun

스팸메일이 적용안되게 도메인을 준다?

sending -> domainsetting -> SMTP credentials

config/settings.py 에서 세팅

```python
# Email Configuration

EMAIL_HOST = ""  # 값 입력
EMAIL_PORT = ""
EMAIL_HOST_USER = ""
EMAIL_HOST_PASSWORD = ""

```

아래의 **Dotenv**로 아이디 비번이 깃허브에 노출되는것을 막자



#### Verify Email Code

users/models.py

```python
import uuid
from django.conf import settings
from django.db import models
from django.core.mail import send_mail
from django.utils.html import strip_tags
from django.template.loader import render_to_string

	...
    
    email_verified = models.BooleanField(default=False)		# email 확인상태
    email_secret = models.CharField(max_length=120, default="", blank=True)  # 암호

    def verify_email(self):
        if self.email_verified is False:
            secret = uuid.uuid4().hex[:20]		# 무작위 string 생성
            self.email_secret = secret
            html_message = render_to_string(	# html을 렌더링해 string으로 만들어준다
                "emails/verify_email.html", {"secret": secret}
            )
            send_mail(							# 이메일 발송 코드
                "Verify Airbnb Account",
                strip_tags(html_message),		  # html 코드를 작동하게 한다.
                settings.EMAIL_FROM,
                [self.email],
                fail_silently=False,				# 에러 메시지 뜨게
                html_message=html_message,			# html코드가 있는지 여부
            )
            self.save()							
        return
```

tamplates/emails/verify_email.html

메일로 키 확인하는 링크를 보내준다.

```html
<h4>Verify Email</h4>
<span>To verify your account click <a href="http://127.0.0.1:8001/users/verify/{{secret}}">here</a></span>
```




users/views.py

```python

def complete_verification(request, key):
    try:
        user = models.User.objects.get(email_secret=key)	# 키 확인 뒤
        user.email_verified = True						# db 값 바꾸고
        user.email_secret = ""							# 키값 초기화
        user.save()
        # to do : add success message
    except models.User.DoesNotExist:
        # to do : add error message
        pass
    return redirect(reverse("core:home"))				# 메인 화면으로
```



users/urls.py

```python
urlpatterns = [
    path("login", views.LoginView.as_view(), name="login"),
    path("logout", views.log_out, name="logout"),
    path("signup", views.SignUpView.as_view(), name="signup"),
    path("verify/<str:key>", views.complete_verification, name="complete-verification"), # 추가
]
```








#### Dotenv

설치

``` shell
$ pipenv install django-dotenv
```

import in manape.py

```python
import dotenv

if __name__ == '__main__':
    dotenv.read_dotenv() # 메인함수 직전에 추가
    main()
```

.env 파일 생성뒤 그곳에 값 입력

값 불러오고 싶은곳에

```python
os.environ.get("MAILGUN_USERNAME") # 이렇게 하면 불러온다.
```



