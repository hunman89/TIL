#### ADD & COPY
> 로컬 파일을 컨테이너로 복사, `ADD`는 tar파일의 압축 해제나 원격 URL 지원과 같은 기능이 더 있다.

#### ADD
```docker
ADD [--chown=<user>:<group>] <src>... <dest>
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
```
- 경로에 띄어쓰기가 있을 때, 아래 form 사용
- `<src>` 에서 파일을 복사하여 이미지 안의 `<dest>`에 붙여 넣는다.
- 여러 src 지정 가능하고, 빌드 context에 따라 해석된다.
- Go 언어의 [filepath.Match](https://golang.org/pkg/path/filepath/#Match) 규칙에 의해 여러파일 선택(wildcards)이 가능하다.
    - "hom"으로 시작하는 모든 파일
```docker
ADD hom* /mydir/
```
- `<dest>`는 절대경로 혹은 `WORKDIR`와 연관된 상대경로이다.
```docker
# /absoluteDir/
ADD test.txt /absoluteDir/
```
```docker
# <WORKDIR>/relativeDir/
ADD test.txt relativeDir/
```
- 특수문자는 매칭패턴으로 처리되지 않게 escape해야 한다. (Golang rules)
```docker
# arr[0].txt
ADD arr[[]0].txt /mydir/
```
- `--chown`은 리눅스 기반에서만 사용 가능, 지정하지 않으면 UID,GID는 0으로 설정된다.
- 사용자 이름이나, UID를 그룹없이 사용하면 UID=GID
- 사용자 이름이나 그룹 이름이 제공되면, `/etc/passwd`와 `/etc/group`파일이 이름을 UID나 GID로 변환한다.
- `/etc/passwd`와 `/etc/group`파일이 없이 `--chown`플래그가 사용되면 빌드 실패
- 아이디가 숫자이면 변환 필요없다.
- url파일이 인증이 필요하면, `RUN wget` 또는 `RUN curl`을 이용해야 한다.
* `<src>` 경로는 build context 내부가 되어야 한다. : 도커 빌드의 첫 단계가 context directory와 하위 directory를 docker demon에 보내는 작업이기 때문이다. `ADD ../something .something` 불가 
* `<src>`가 URL이고 `<dest>`가 `/`로 끝나지 않으면, URL에서 파일 다운되어 `<dest>`로 복사된다.
* `<src>`가 URL이고 `<dest>`가 `/`로 끝나면, URL에서 파일 다운되어 `<dest>/<filename>`로 복사된다. filename은 유추가 가능해야 한다. 예: http://example.com/foobar/ => foobar
* `<src>`가 directory이면 파일시스템 메타데이터를 포함하여 전체 내용이 복사된다. directory자체는 복사 안됨
* `<src>`가 압축 형식이면 해제된다. `tar -x`실행/ 파일 이름이 아니라 내용에 의해 결정된다.
    * URL의 파일이 압축형식이면 해제되지 않는다.
* `<src>`가 여러개 지정이 되면, `<dest>`는 directory여야하고 `/`로 끝나야 한다.
* `<dest>`가 존재하지 않으면 모든 누락된 경로와 함께 생성이 된다.

#### COPY
```docker
COPY [--chown=<user>:<group>] <src>... <dest>
COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
```
- `ADD`와 비슷하게 경로에 띄어쓰기가 있으면 아래 사용
- 지정된 이름의 빌드 단계를 복사해 올 수 있다.
- 압축해제가 안된다는 것을 제외하고 `ADD`와 동일
