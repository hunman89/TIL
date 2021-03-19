#### CMD
> 실행중인 컨테이너에 기본 환경 제공
* 오직 1개만이 유효하다. 여러개면 마지막만 실행
- `CMD ["executable", "param1", "param2"]` (exec 형식, 이 형식을 자주 사용한다)
- `CMD ["param1", "param2"]` (기본 파라미터를 ENTRYPOINT 로 갖는다.)
- `CMD command param1 param2` (shell 형식)
