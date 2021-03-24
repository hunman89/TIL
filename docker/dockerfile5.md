#### ENV
```docker
ENV <key>=<value> ...

ENV MY_NAME="John Doe"
ENV MY_DOG=Rex\ The\ Dog
ENV MY_CAT=fluffy
```

> 환경변수 설정
* 이 값은 빌드 단계에서 다른 하위 명령어들에 대체 될 수 있다.

- 따옴표는 제거된다 (필요하면 escape 하자)
- 값에 빈칸을 사용하기 위해 따옴표와 백슬래시를 이용하자.
- `<key> <value> <value>`같은 형식도 가능한데, 첫번째 띄어쓰기 이후 모든 문자열은 value로 처리된다. >> *혼동때문 삭제예정*

* 환경변수는 컨테이너가 결과 이미지를 만들 때 까지 유지 된다.
* `docker inspect`를 통해 값 확인
* `docker run --env <key>=<value>`로 값을 바꿀 수 있다.

- 변수가 유지되면 예상치 못한 결과가 나오기도 한다.
- 환경변수가 final image에서는 사라지게 해야 할 수 도 있는데, 명령어에 포함시키거나 `ARG`를 이용한다.
```docker
#### setting a value for a single commend
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y ...
#### using ARG
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y ...
```


#### ARG
> 빌드시 전달 가능한 변수 정의 
```docker
ARG <name>[=<default value>]
```
* `--build-arg <varname>=<value>` 플래그를 이용하여 전달 (없으면 에러 출력)
* varname별 따로 전달이 필요하다??
* 보안 때문에 github key와 같은 것을 사용하지 않는 것이 좋다. [ “build images with BuildKit”](https://docs.docker.com/develop/develop-images/build_enhancements/#new-docker-build-secret-information)
- 디폴드 값을 가질 수 있다.
```docker
FROM busybox
ARG user1=someuser
ARG buildno=1
```
* scope : `ARG`에 의해 정의되기 전에 변수를 사용하면 비어있다.
    * 빌드단계가 끝나면 정의된 변수가 사라진다. 따라서 다시 정의해야 한다.

```docker
FROM busybox
ARG SETTINGS
RUN ./run/setup $SETTINGS

FROM busybox
ARG SETTINGS
RUN ./run/other $SETTINGS
```
- `ENV`와 `ARG`가 같은 변수를 정의하면, `ENV`의 값으로 덮어 씌운다.
    - 둘을 조합하면 유용하게 사용할 수 있다. 
    - 아래는 `ARG`를 사용하면 그 버전으로, 하지 않으면 default값인 1.0.0로 변수가 적용이 된다.

```docker  
FROM ubuntu
ARG CONT_IMG_VER
ENV CONT_IMG_VER=${CONT_IMG_VER:-v1.0.0}
RUN echo $CONT_IMG_VER
```
* Predefined ARGs
    - 미리정의된 arg 값이 있다. (HTTP_PROXY, http_proxy, HTTPS_PROXY, https_proxy, FTP_PROXY, ftp_proxy, NO_PROXY, no_proxy)
    - `docker history`에 나타나지 않기 때문에, 중요한 인증 정보가 유출될 위험이 줄어든다.
    - `ARG`를 추가하여 재정의 할 수 있다. 이 때, `docker history`에 보관되며, 변경하면 캐시가 무효화된다.
- Automatic platform ARGs in the global scope
    - BuildKit을 사용하는 경우 자동적으로 빌드 수행하는 플랫폼과 이미지의 플랫폼에 대한 ARG변수 집합이 미리 정의된다.
    - target platform은 빌드시 `--platform`으로 정의될 수 있다.
    * TARGETPLATFORM - platform of the build result. Eg linux/amd64, linux/arm/v7, windows/amd64.
    * TARGETOS - OS component of TARGETPLATFORM
    * TARGETARCH - architecture component of TARGETPLATFORM
    * TARGETVARIANT - variant component of TARGETPLATFORM
    * BUILDPLATFORM - platform of the node performing the build.
    * BUILDOS - OS component of BUILDPLATFORM
    * BUILDARCH - architecture component of BUILDPLATFORM
    * BUILDVARIANT - variant component of BUILDPLATFORM
    - `RUN` command에서 사용할 수 없으며, value없이 한번 정의하면 노출된다.
```docker
FROM alpine
ARG TARGETPLATFORM
RUN echo "I'm building for $TARGETPLATFORM"
```

* Build caching
    * 이전에 빌드와 다른 값을 dockerfile에 정의해 빌드하면, 첫번째 사용에서 'cache miss'가 발생한다.
    * `ARG`로의 변수선언 이후에 `RUN` 명령들은 `ARG`변수를 암시적으로 환경변수로 사용하기 때문에 cache miss가 발생할 수 있다.
    * 사전에 정의된 `ARG`변수는 캐싱에서 제외된다. (Docker 파일에서 정의되기 전 까지)
    * 같은 줄에서 실행되는 것으로 보기 때문에 발생한다????
```docker
FROM ubuntu
ARG CONT_IMG_VER
RUN echo hello
```    

>`ARG CONT_IMG_VER` causes the `RUN` line to be identified as the same as running `CONT_IMG_VER=<value> echo hello`, so if the <value> changes, we get a cache miss.

