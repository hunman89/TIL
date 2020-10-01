#### 20200922

## 하둡 세팅

* 독립 실행 모드 : 아무 세팅도 안함
* 가상 분산 모드 : 네임노드, 보조네임노드, 데이터노드를 하나의 컴퓨터에 세팅
  * 실습
  * 네임노드 : 작업수행 
  * 데이터노드 : 데이터 분산 저장
* 완전 분산 모드 : 여러대의 컴퓨터에 세팅
  * 실제 현장



## 리눅스 세팅

* [리눅스복제]()

* 방화벽해제

  ```
  [root@hadoopserver ~]# systemctl stop firewalld
  [root@hadoopserver ~]# systemctl disable firewalld
  ```
* 호스트 네임 수정 (SSH)

* 자바 설치



## SSH 설정

> 내부에 설치된 노드간 통신을 위해선 SHH가 필요하다.

* 세팅(공개키생성)

  ```
  [root@hadoopserver ~]# ssh-keygen -t dsa -P '' -f ~/.ssh/id_dsa
  [root@hadoopserver ~]# cd .ssh
  [root@hadoopserver .ssh]# cat id_dsa.pub >> authorized_keys
  ```



## 하둡 설치

* 다운로드

  ```
  [root@hadoopserver 다운로드]# wget https://archive.apache.org/dist/hadoop/common/hadoop-1.2.1/hadoop-1.2.1.tar.gz
  ```

* 압축풀고 이동

  ```
  [root@hadoopserver 다운로드]# tar xvfz hadoop-1.2.1.tar.gz 
  [root@hadoopserver 다운로드]# cp -r hadoop-1.2.1 /usr/local/
  ```

* 설정

  ```
  [root@hadoopserver 다운로드]# vi /etc/profile
  ```

  ```
  JAVA_HOME=/usr/local/jdk1.8.0
  CLASSPATH=/usr/local/jdk1.8.0/lib
  HADOOP_HOME=/usr/local/hadoop-1.2.1				// 자바 세팅된 곳에 추가
  export JAVA_HOME CLASSPATH HADOOP_HOME			// 추가
  PATH=$JAVA_HOME/bin:$HADOOP_HOME/bin:.:$PATH	// 추가	
  ```



## 환경설정

> 설정할거 많다.

* 폴더

  ```
  [root@hadoopserver conf]# cd /usr/local/hadoop-1.2.1/conf
  ```

* coresite.xml

  ```
  [root@hadoopserver conf]# vi core-site.xml 
  // 내장 컴퓨터 정보 입력
  <configuration>
  <property>
  <name>fs.default.name</name>
  <value>hdfs://localhost:9000</value>
  </property>
  <property>
  <name>hadoop.tmp.dir</name>
  <value>/usr/local/hadoop-1.2.1/tmp</value>
  </property>
  </configuration>
  ```

* hdfs-site.xml

  ```
  [root@hadoopserver conf]# vi hdfs-site.xml 
  
  <configuration>
  <property>
  <name>dfs.replication</name> 		// 데이터 복사 수
  <value>1</value> 
  </property>
  <property>
  <name>dfs.webhdfs.enabled</name> 	// 웹 접근 허용 여부
  <value>true</value>
  </property>
  <property>
  <name>dfs.name.dir</name> 			// 컴퓨터들의 정보
  <value>/usr/local/hadoop-1.2.1/name</value>
  </property>
  <property>
  <name>dfs.data.dir</name>			// 데이터 경로
  <value>/usr/local/hadoop-1.2.1/data</value>
  </property>
  </configuration>
  ```

* mapred-site.xml

  ```
  [root@hadoopserver conf]# vi mapred-site.xml 
  // 분석처리 환경에 대한 세팅
  <configuration>
  <property>
  <name>mapred.job.tracker</name>		
  <value>localhost:9001</value>
  </property>
  </configuration>
  ```

* hadoop.env.sh

  ```
  [root@hadoopserver conf]# vi hadoop-env.sh 
  // 9,10 라인 수정 ==> jdk 세팅, 경고메시지 제거
  9 export JAVA_HOME=/usr/local/jdk1.8.0
  10 export HADOOP_HOME_WARN_SUPPRESS="TRUE"
  ```



## 하둡 실행

* 하둡이 사용하는 데이터형태로 포맷

  ```
  [root@hadoopserver hadoop-1.2.1]# hadoop namenode -format
  [root@hadoopserver hadoop-1.2.1]# ls
  // name 폴더 확인
  ```

* 시작

  ```
  [root@hadoopserver hadoop-1.2.1]# start-all.sh
  [root@hadoopserver hadoop-1.2.1]# jps
  
  3856 DataNode
  4305 Jps
  3988 SecondaryNameNode
  3717 NameNode
  4213 TaskTracker
  4077 JobTracker
  ```

* 끝

  ```
  [root@hadoopserver hadoop-1.2.1]# stop-all.sh
  ```

* 오류시

  ```
  [root@hadoopserver hadoop-1.2.1]# ls
  //name, tmp, data 가 생성되있는지 확인 -> 삭제하고 다시 세팅
  ```

  
