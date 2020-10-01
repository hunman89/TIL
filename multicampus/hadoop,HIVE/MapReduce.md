#### 20200923

## MapReduce

> HDPS에 저장된 파일을 분산배치분석을 할 수있게 도와주는 프레임워크

* Map

  * 입력 파일을 한 줄씩 읽어 데이터를 변형

* Reduce

  * 맵의 결과 데이터를 집계

* 맵리듀스 아키텍쳐
    * 클라이언트가 NameNode내부 JobTraker에(별개로 세팅할 수 있다.) Job 실행 요청한다.
    * JobTraker는 DataNode의 TaskTraker에 Task 실행 요청한다.
    * 결과를 하트비트에 태워 보낸다.
    * JobTraker는 결과를 모아 Reduce하여 클라이언트에 보낸다.

* HIVE로 심플하게 구현

