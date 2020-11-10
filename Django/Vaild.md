## Vaild

> 아이디 비번 체크

forms.py 에 함수를 만든다.

```python
class LoginForm(forms.Form):

    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)

    def clean_email(self):
		
    def clean_password(self):
        # clean 함수는 이메일과 pw를 확인하고 clean된 값을 돌려준다
        # 아무것도 return 안하면 none
```

```python
def clean_email(self):
    email = self.cleaned_data.get("email") # cleaned_data는 입력값
    try:
        models.User.objects.get(username=email) # 우리 데이터와 확인
        return email	# 메일 돌려준다 ( cleaned_data로 )
    except models.User.DoesNotExist:
        raise forms.ValidationError("User does not exist") # 없으면 에러 발생
    	# 에러는 raise 한 위치에서 나타내어 진다.
    
```



#### check_password

장고는 비밀번호를 저장하지 않고 해싱하여 비교한다.

```python
def clean(self):		# email과 pw를 통합해서 확인 email을 모르는데 pw 확인할 필요가 없다.
    email = self.cleaned_data.get("email")
    password = self.cleaned_data.get("password")
    try:
        user = models.User.objects.get(email=email)
        if user.check_password(password):		# 비밀번호 쳌쳌
            return self.cleaned_data		# 입력값을 그대로 리턴 (메일,pw)
        else:
            self.add_error("password", forms.ValidationError("Password is wrong")) # 통합된 경우 에러가 나타날 위치를 정해줄 수 있다.
    except models.User.DoesNotExist:
        self.add_error("email", forms.ValidationError("User does not exist"))
```



#### login/out

users/views.py

```python
from django.views import View
from django.shortcuts import render, redirect, reverse
from django.contrib.auth import authenticate, login, logout # 로그인, 로그아웃에 필요
from . import forms


class LoginView(View):
    def get(self, request):
        form = forms.LoginForm(initial={"email": "hunman89@gmail.com"})
        return render(request, "users/login.html", {"form": form})

    def post(self, request):
        form = forms.LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get("email")
            password = form.cleaned_data.get("password")	# 확인한 email, pw
            user = authenticate(request, username=email, password=password) # 로그인
            if user is not None:
                login(request, user)
                return redirect(reverse("core:home")) # 성공하면 홈화면
        return render(request, "users/login.html", {"form": form})


def log_out(request):		# 로그아웃 코드
    logout(request)
    return redirect(reverse("core:home"))

```



#### is authenticated 

로그인 되었는지 확인하는 간단한 코드

nav.html

```html
<ul>

    {% if user.is_authenticated %}
    <li><a href="{% url "users:logout" %}">Log out</a></li>
    {% else %}
    <li><a href="{% url "users:login" %}">Log in</a></li>
    {% endif %}


</ul>
```





## LoginView

> 다 해준다. 무조건 username으로 로그인 해야된다.

따라서 조금 더 가변적인 **FormView** 이용

```python
from django.views import View
from django.views.generic import FormView 	 # 추가
from django.urls import reverse_lazy		# 추가
from django.shortcuts import render, redirect, reverse
from django.contrib.auth import authenticate, login, logout
from . import forms


class LoginView(FormView):

    template_name = "users/login.html"
    form_class = forms.LoginForm
    success_url = reverse_lazy("core:home")			# reverse_lazy : 필요할때만 호출한다 => 에러 제거
    initial = {"email": "hunman89@gmail.com"}

    def form_valid(self, form):						# 아이디 비밀번호 확인
        email = form.cleaned_data.get("email")
        password = form.cleaned_data.get("password")
        user = authenticate(self.request, username=email, password=password)
        if user is not None:
            login(self.request, user)
        return super().form_valid(form)				# 성공하면 success_url 로 이동


def log_out(request):	# 그대로
    logout(request)
    return redirect(reverse("core:home"))

```



