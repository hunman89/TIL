## Docker file

> 도커는 이미지를 자동으로 빌드 할 수 있는 커맨드들로 이루어진 dockerfile 기능을 제공한다.

* 클라이언트가 아닌 도커데몬에 전체 context를 (재귀적으로)보내면서 이루어진다.
* 빈 폴더에서 도커파일을 위치한 뒤 필요한 파일만 추가하여 실행하는 것이 좋다. (root 에서 하지말자)
* `-f` 와 `-t` 명령어를 이용해 다른 폴더에서 빌드할 수 있다.

#### Build kit
> 현재 (18.09 이후) 도커는 buildkit을 통해 이루어진다.
https://docs.docker.com/engine/reference/builder/#buildkit

#### Format
* 구분을 위해 convention을 대문자로 한다(실제 기능에는 대소문자 상관없음)
```docker
# comment
INSTRUCTION arguments
```
* from 명령에서 시작된다. = 부모 이미지를 지정한다.
* 주석은 무시되고 실행된다. (주석에서 줄바꿈 문자는 지원하지 않는다.)
* 공백 
    * 명령이나 주석 이전의 공백은 무시된다.
    * 인수 내부의 공백 (줄바꿈 이후의 선행공백)은 적용이 된다.

#### Parser directives
> 선택사항, 도커파일의 내용을 어떻게 처리해야 하는지 지시.
* 파일 맨 위에, 주석보다 위에 있어야 주석으로 간주되지 않는다. 
* syntax (buildkit 필요)
    * builder의 위치 정의
```docker
# syntax=[remote image reference]
```
* escape
    * 줄바꿈??, 구문에 대한 무시??
    * https://docs.docker.com/engine/reference/builder/#escape
```docker
# escape=\ (backslash)
or
# escape=` (backtick)
```

#### Environment replacement
> 도커파일 내부의 변수
* $variable_name or ${variable_name}
* 몇개의 bash 연산 지원
    * ${variable:-word} : variable이 정의되어 있으면 그 값, 없으면 word로 대체
    * ${variable:+word} : variable이 정의되어 있으면 word로 대체되고 없으면 빈 문자열

```docker
FROM busybox
ENV FOO=/bar
WORKDIR ${FOO}   # WORKDIR /bar
ADD . $FOO       # ADD . /bar
COPY \$FOO /quux # COPY $FOO /quux
```

* 다음 명령어와 적용할 수 있다. (ADD, COPY, ENV, EXPOSE, FROM, LABEL, STOPSIGNAL, USER, VOLUME, WORKDIR, ONBUILD)

* 하나의 `ENV`명령어로 여러 변수를 설정했을때, 우선순위는 모두 같다.
    * `def` 값은 `hello`, `ghi`는 `abc=bye` 이후이므로 `bye` 이다.
```docker
ENV abc=hello
ENV abc=bye def=$abc
ENV ghi=$abc
```

#### .dockerignore file
> daemon에 쓸데없는 파일이 전달되는 것을 막아준다. 

```docker
# comment
*/temp*
*/*/temp*
temp?
```
|Rule|Behavior|
|-----|------|
|#comment|	주석으로 인식하고 무시함|
|*/temp*|	루트의 서브 디렉토리 안에서 이름이 temp 로 시작하는 모든 파일과 디렉토리를 제외시킨다. 예를 들어 이름이 /somedir/temporary.txt 인 파일은 제외되고 /somedir/temp 의 디렉토리도 제외된다.|
|*/*/temp*|	루트의 두 레벨 아래 있는 서브 디렉토리 안에서 이름이 temp로 시작하는 파일과 디렉토리를 제외시킨다. 예를 들어 /somedir/subdir/temporary.txt 는 제외된다.|
|temp?|	루트 디렉토리에서 이름이 temp 로 시작하고 뒤에 한 글자가 추가된 파일과 디렉토리를 제외시킨다. 예를 들어 /tempa 와 /tempb 는 제외된다.|

* !는 예외 파일 지정가능
* `.`은 관용적으로 무시된다.

