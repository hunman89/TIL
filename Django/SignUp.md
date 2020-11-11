## Sign up

이메일체크, 비밀번호 체크

```python
class SignUpForm(forms.Form):

    first_name = forms.CharField(max_length=80)
    last_name = forms.CharField(max_length=80)
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)
    password1 = forms.CharField(widget=forms.PasswordInput, label="Confirm Password")

    def clean_email(self):
        email = self.cleaned_data.get("email")
        try:
            models.User.objects.get(email=email)	# email 존재하면 에러 발생
            raise forms.ValidationError("User already exists with that email")
        except models.User.DoesNotExist:
            return email

    def clean_password1(self):	# password1에서 실행해야 password 가 cleaned_data에 들어가 있다.
        password = self.cleaned_data.get("password")
        password1 = self.cleaned_data.get("password1")

        if password != password1:
            raise forms.ValidationError("Password cofirmation does not match")
        else:
            return password
        
    def save(self):
        first_name = self.cleaned_data.get("first_name")
        last_name = self.cleaned_data.get("last_name")
        email = self.cleaned_data.get("email")
        password = self.cleaned_data.get("password")
        user = models.User.objects.create_user(email, email, password)
        user.first_name = first_name
        user.last_name = last_name
        user.save()

```



login과 다른점은 model을 추가해야 한다는 것이다.

#### ModelForm

쉽게 추가하게 해준다.

```python
class SignUpForm(forms.ModelForm):
    class Meta:		
        model = models.User
        fields = ("first_name", "last_name", "email")	# 자동으로 field 생성

    password = forms.CharField(widget=forms.PasswordInput)
    password1 = forms.CharField(widget=forms.PasswordInput, label="Confirm Password")

    def clean_password1(self):
        password = self.cleaned_data.get("password")
        password1 = self.cleaned_data.get("password1")

        if password != password1:
            raise forms.ValidationError("Password cofirmation does not match")
        else:
            return password

    def save(self, *args, **kargs):		# 기본적으로 save 과정이 있지만, modify를 위해
        user = super().save(commit=False)	# 커밋하지 않고 데이터 불러온다
        email = self.cleaned_data.get("email")	
        password = self.cleaned_data.get("password")
        user.username = email			# username (email) 지정
        user.set_password(password)		# 비밀번호 암호화 지정
        user.save()
```



#### User Creation Form

> 비밀번호 확인, 유효성 체크가 내장되어있다

```python
from django import forms
from django.contrib.auth.forms import UserCreationForm # 추가
from . import models

class SignUpForm(UserCreationForm):
    # 이메일 = username 만 추가
	username = forms.EmailField(label="Email")

```

짧아진다.

유효성만 사용할 경우 password_validation만 불러와 사용해도 된다.