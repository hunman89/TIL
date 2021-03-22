#### CMD
> 실행중인 컨테이너에 기본 환경 제공
* 오직 1개만이 유효하다. 여러개면 마지막만 실행

- `CMD ["executable", "param1", "param2"]` (exec 형식, 이 형식을 자주 사용한다)
- `CMD ["param1", "param2"]` (기본 파라미터를 ENTRYPOINT 로 갖는다.)
- `CMD command param1 param2` (shell 형식)

> RUN은 실행하고 결과를 커밋하는 반면, CMD는 빌드 타임에서 실행하는 것이 아니라 이미지의 초기 명령을 특정한다. = 이미지가 실행될 때 실행할 명령어.

* exec형식은 커멘드 쉘을 통해 실행되지 않는다. shell형식을 사용하거나, 쉘의 디렉토리를 통해 실행하여야 한다. (이때는 docker의 환경변수가 아니라 쉘의 환경변수를 사용한다.)
* 만약 command를 쉘 없이 실행하고 싶다면, 실행파일의 전체 경로와 명령어를 JSON배열로 표현해야 한다. 다른 인자는 배열에 독립적으로 표현되어야 한다.

```docker
FROM ubuntu
CMD ["/usr/bin/wc","--help"]
```

* 매번 같은 실행파일을 사용하고 싶다면, `ENTRYPOINT`를 조합하자.
* `docker run`에서 매개인자를 특정했다면, `CMD`내용을 대체한다.


#### ENTRYPOINT
> `CMD`와 비슷한 기능을 하지만, 인자를 받을 수 있다, 그 인자가 `CMD`가 될 수도.
* `ENTRYPOINT`가 설정되지 않았다면, `CMD`에 설정된 명령어를 그대로 실행하지만, `ENTRYPOINT`가 설정됬다면, `CMD`는 단지 `ENTRYPOINT`에 대한 인자의 기능을 한다.
* 일반적으로 스크립트 파일을 `ENTRYPOINT`의 인자로 사용해 실행 되게 한다. (이 때, `ADD`나 `COPY`를 통해 컨테이너 내부에 존재하도록 하여야 한다.)

```docker
ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT command param1 param2
```

- `docker run`에서 매개인자를 특정했다면, `ENTRYPOINT`내용을 대체한다.
- shell에서 실행되는 것이 아니면, JSON형태로 하여야 한다.

