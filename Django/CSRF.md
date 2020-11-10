## Cross Site Request Forgery

웹 사이트는 Cookie를 도메인을 통해 백엔드로 보낸다.

다른 웹사이트를 방문했을때, 쿠키를 통해 이전 사이트에 접속해 비밀번호 같은것을 알아낼 수 있다.

장고에서는 그것을 차단해 준다.

다른 사이트를 통하지 않고 그 사이트에서 접속하여 로그인을 하는지

```python
<form method="POST"> {% csrf_token %}
```

붙여주면 된다.