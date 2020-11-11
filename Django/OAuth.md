## OAuth

> open standard for access delegation

로그인 위임

OAuth를 따르는 사이트에 redirect해 verification을 진행하고 다시 redirect해 돌아온다. = callback url을 정해줘야한다.



#### 깃허브

 settings-> developer settings-> OAuth Apps

이름과 home URL을 설정하고 callback URL도 설정한다.

`http://127.0.0.1:8001/users/login/github/callback`

id와 secret key를 따로 저장한다!!

로그인방식을 지정해 준다 (user/models.py)

```python
LOGIN_EMAIL = "email"
LOGIN_GITHUB = "github"
LOGIN_KAKAO = "kakao"

LOGIN_CHOICES = (
    (LOGIN_EMAIL, "Email"),
    (LOGIN_GITHUB, "Github"),
    (LOGIN_KAKAO, "Kakao"),
)

login_method = models.CharField(
        max_length=50, choices=LOGIN_CHOICES, default=LOGIN_EMAIL
    )
```

users/view.py

크게 3단계로 나뉘어 진다. (requests 라이브러리 설치 필요)

```python
...
import requests
...


def github_login(request):  # 로그인 1단계
    client_id = os.environ.get("GH_ID") # 따로 저장한것을 불러온다(dotenv)
    redirect_uri = "http://127.0.0.1:8000/users/login/github/callback"
    return redirect(
        f"https://github.com/login/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&scope=read:user"
    )


class GithubException(Exception):
    pass


def github_callback(request):  # 2단계
    try:
        client_id = os.environ.get("GH_ID") # dotenv
        client_secret = os.environ.get("GH_SECRET") # dotenv
        code = request.GET.get("code", None) # 코드를 가지고 token을 받는다.
        if code is not None:
            token_request = requests.post(
                f"https://github.com/login/oauth/access_token?client_id={client_id}&client_secret={client_secret}&code={code}",
                headers={"Accept": "application/json"},
            )
            token_json = token_request.json()  
            error = token_json.get("error", None)  # json 에러 체크
            if error is not None:
                raise GithubException()
            else:
                access_token = token_json.get("access_token")  # json에서 가져온 토큰
                profile_request = requests.get( # requests 라는 라이브러리 이용!!
                    "https://api.github.com/user",
                    headers={
                        "Authorization": f"token {access_token}",
                        "Accept": "application/json",
                    },
                )
                profile_json = profile_request.json()  # request이용 profile을 가져온다, 3단계
                username = profile_json.get("login", None)
                if username is not None:  # profile 체크
                    name = profile_json.get("name")
                    email = profile_json.get("email")
                    bio = profile_json.get("bio")
                    try:
                        user = models.User.objects.get(email=email)
                        if (
                            user.login_method != models.User.LOGIN_GITHUB
                        ):  # 다른 방식의 로그인인 경우 = 다시 로그인하게
                            raise GithubException
                    except models.User.DoesNotExist:  # 존재하지 않는 user면 새로운거 만든다
                        user = models.User.objects.create(
                            email=email,
                            first_name=name,
                            username=email,
                            bio=bio,
                            login_method=models.User.LOGIN_GITHUB,
                        )
                        user.set_unusable_password()  # 비밀번호 사용 못하게 = 깃허브 로그인이니까
                        user.save()
                    login(request, user)  # 로그인
                    return redirect(reverse("core:home"))
                    if user is not None:
                        return redirect(reverse("users:login"))
                    else:
                        user = models.User.objects.create(
                            username=email, first_name=name, bio=bio, email=email
                        )
                        login(request, user)
                        return redirect(reverse("core:home"))
                else:
                    raise GithubException()
        else:
            raise GithubException()
    except GithubException:  # 에러를 하나로 합침
        return redirect(reverse("users:login"))
```





#### 카카오

```python
...
from django.core.files.base import ContentFile
...


def kakao_login(request):
    client_id = os.environ.get("KAKAO_ID")
    redirect_uri = "http://127.0.0.1:8000/users/login/kakao/callback"
    return redirect(
        f"http://kauth.kakao.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code"
    )


class KakaoException(Exception):
    pass


def kakao_callback(request):
    try:
        code = request.GET.get("code")
        client_id = os.environ.get("KAKAO_ID")
        redirect_uri = "http://127.0.0.1:8000/users/login/kakao/callback"
        token_request = requests.get(
            f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&redirect_urt={redirect_uri}&code={code}"
        )
        token_json = token_request.json()
        error = token_json.get("error", None)
        if error is not None:
            raise KakaoException()
        access_token = token_json.get("access_token")
        profile_request = requests.get(
            "http://kapi.kakao.com/v2/user/me",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        profile_json = profile_request.json()
        email = profile_json.get("kakao_account").get("email")
        if email is None:
            raise KakaoException()
        properties = profile_json.get("properties")
        nickname = properties.get("nickname")
        profile_image = properties.get("profile_image")
        try:
            user = models.User.objects.get(email=email)
            if user.login_method != models.User.LOGIN_KAKAO:
                raise KakaoException()
        except models.User.DoesNotExist:
            user = models.User.objects.create(
                email=email,
                username=email,
                first_name=nickname,
                login_method=models.User.LOGIN_KAKAO,
                email_verified=True,
            )
            user.set_unusable_password()
            user.save()
            if profile_image is not None:  # 사진
                photo_request = requests.get(profile_image)
                user.avatar.save(
                    f"{nickname}-avatar",
                    ContentFile(photo_request.content()),  # contentfile로 byte 형태로 옮겨 저장
                )
        login(request.user)
        return redirect(reverse("core:home"))
    except KakaoException:
        return redirect(reverse("users:login"))
```

