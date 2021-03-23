#### LABEL
> 이미지의 메타 데이터를 보관한다.
* 키-밸류 쌍이고, 띄어쓰기는 따옴표와 백슬래쉬를 사용하여 표현할 수 있다.
```docker
LABEL "com.example.vendor"="ACME Incorporated"
LABEL com.example.label-with-value="foo"
LABEL version="1.0"
LABEL description="This text illustrates \
that label-values can span multiple lines."
```

- 라벨은 상속이 되고 (`FROM`라인의 이미지인 base or parent iamges 로부터) 다른 값들이 존재한다면, 가장 최근의 값이 적용이 된다.
- 확인하기 위해 `docker image inspect`와 `--format`을 조합한다.

#### MAINTAINER
- `LABEL`로 대체.
```docker
LABEL maintainer="SvenDowideit@home.org.au"
```

#### EXPOSE
> 대기하는 네트워크 포트 설정
* UDP, TCP(default) 설정 가능
* 실제로 포트를 개방하지는 않고, 빌드한 사람과 실행하는 사람간의 소통을 위한 문서로 활용된다.
* 실제로 개방할때는 `docker run` 과 `-p`플래그를 사용하여 연결시킨다.

```docker
EXPOSE <port> [<port>/<protocol>...]
```
* 둘다 개방할 경우
```docker
EXPOSE 80/tcp
EXPOSE 80/udp
```
* 위를 `docker run`할때 `-P`와 함께 사용하면, TCP로 한번, UDP로 한번 개방한다. (한번에 개방되지 않는다.)
* `EXPOSE`와 상관없이 `-p` 플래그를 통해 런타임에서 개방할 수 있다.

```docker
docker run -p 80:80/tcp -p 80:80/udp ...
```

- `docker network`는 특정 포트 개방이 필요없는 네트워크를 만들 수 있게 해 준다.

