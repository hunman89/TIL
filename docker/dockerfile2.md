#### FROM
> set base image
```docker
FROM [--platform=<platform>] <image> [AS <name>]
or

FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]
or

FROM [--platform=<platform>] <image>[@<digest>] [AS <name>]
```

* 기본 시작은 `FROM`으로부터,.
* 하나의 dockerfile에 여러번 실행할 수 있다. 
    * 새로운 `FROM`앞에 커밋을 통해 마지막 이미지 ID 출력을 기록하면 된다.
    * 각 `FROM`은 이전에 생성된 모든 단계를 지운다.
    * `FROM`에 `AS` 이름을 추가하여 단계의 이름을 정한 뒤, 후속 `FROM`에 `COPY --from=<name>`으로 참고할 수 있다.
    * tag, digest는 선택적

* `ARG`가 선행될 수도 있다.
    * `FROM`명령어 전에 사용된 `ARG`변수는 `FROM`단계 다음에서 사용할 수 없다.
    * 단, 이름만 재 정의하면 사용 가능하다.
```docker
ARG VERSION=latest
FROM busybox:$VERSION
ARG VERSION             # 이름만 재정의
RUN echo $VERSION > image_version
```

#### RUN
> 한줄 한줄 실행한다.
```docker
RUN <command>  # shell form, 리눅스 윈도우 구분 필요
or
RUN ["executable", "param1", "param2"]  # exec form
```
* 현재 이미지 위의 새 레이어에서 command를 실행하고 commit한다. 결과이미지는 다음 단계에 이용된다.
* exec form은 shell string muging을 방지하고, 기본 이미지에 shell 실행 파일이 없는 경우 명령 실행을 가능하게 한다.
* '/bin/sh'이외의 shell을 사용하고 싶을 때,
```docker
RUN ["/bin/bash", "-c", "echo hello"]
```
> exec form은 json을 따르기 때문에 `"` 사용, `\` 지양. 

* `\`를 통해 줄바꿈을 가능하게 하여 가독성을 높일 수 있다.
* 캐시가 자동으로 사라지지 않기 때문에 다음 build에 사용된다.



