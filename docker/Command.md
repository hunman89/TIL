## docker 명령어

#### run 옵션

* `-i -t`  : 컨테이너 내부 진입
* `-d` : 컨테이너를 백그라운드에서 동작
* `-e` : 컨테이너 환경변수 설정

> 민감한 정보는 직접 하지않고 쿠버네티스의 secret 기능 이용!!

* `exec` : 컨테이너 내부에서 명령어를 실행한 뒤, 결과값을 받는다. 

```sh
$ docker exec wordpressdb ls
bin
boot
dev
docker-entrypoint-initdb.d
...
```

* `--link` : 컨테이너를 "이름"으로 연결

> 도커 브리지 네트워크 권장