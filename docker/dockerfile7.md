#### WORKDIR
> 이어지는 작업의 디렉터리 지정
```docker
WORKDIR /path/to/workdir
```
* 여러번 사용할 수 있는데 상대경로인 경우 이전 `WORKDIR`를 기준으로 한다.

```docker
WORKDIR /a
WORKDIR b
WORKDIR c
RUN pwd    # /a/b/c
```
* dockerfile에 명시된 환경 변수를 경로로 지정할 수 있다.
```docker
ENV DIRPATH=/path
WORKDIR $DIRPATH/$DIRNAME
RUN pwd   # /path/$DIRNAME
```

#### USER
> 이미지 실행의 사용자 이름(과 그룹)
```docker
USER <user>[:<group>]
or
USER <UID>[:<GID>]
```
- 지정하지 않으면 루트 계정이고, 윈도우에서는 지정해야 한다.