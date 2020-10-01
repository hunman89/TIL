#### 20200923

## 하둡 가상 분산 모드 세팅

* 리눅스 3개 복제  (main, second, dataserver)

* 메인에 자바 설치

* 호스트 네임, IP 설정

* ssh 설정

  ```
  [root@mainserver ~]# ssh-keygen -t dsa -P '' -f ~/.ssh/id_dsa
  [root@mainserver .ssh]# ssh-copy-id -i /root/.ssh/id_dsa.pub root@secondserver
  // main의 공용키를 secondserver에 보낸다.
  // root@ 뒤에 호스트 네임을 넣고, 공용키를 보낸다 (mainserver, dataserver)
  // 자기 자신도 가능
  
  [root@mainserver .ssh]# ssh secondserver		// 확인
  Last login: Wed Sep 23 09:51:32 2020
  [root@secondserver ~]# exit						// 나가기
  ```

* 메인 세팅을 공유 (scp)

  * 디렉토리는 안된다.

  ```
  [root@mainserver ~]# scp /etc/hosts root@secondserver:/etc/hosts	// main -> second
  
  hosts                                                                                                     100%  242   190.0KB/s   00:00    
  
  [root@mainserver ~]# scp /etc/hosts root@dataserver:/etc/hosts		// main -> data
  
  hosts                                                                                                     100%  242   280.5KB/s   00:00    
  
  [root@mainserver 다운로드]# scp ./jdk-8u261-linux-x64.tar.gz root@secondserver:/root
  // 자바 압축파일
  [root@mainserver ~]# scp /usr/bin/java root@secondserver:/usr/bin/java
  // 자바 소프트링크
  // /etc/profile 은 하둡 세팅 완료후 보냄
  
  [root@mainserver ~]# ssh root@secondserver tar xvf /root/jdk*
  // 원격으로 자바 압축파일 해제
  [root@mainserver ~]# ssh root@secondserver mv jdk1.8.0_261 jdk1.8.0
  [root@mainserver ~]# ssh root@secondserver cp -r /root/jdk1.8.0 /usr/local
  
  ```

* 하둡 다운로드 (wget)

* 하둡 압축풀기, 폴더 이동, /etc/profile 세팅

  ```
  [root@mainserver ~]# scp /etc/profile root@dataserver:/etc/profile
  [root@mainserver ~]# scp /etc/profile root@secondserver:/etc/profile
  // profile 원격으로 보내기
  ```

* 하둡 세팅

  ```
  [root@mainserver conf]# vi hadoop-env.sh 	//동일
  //9~10 라인
  export JAVA_HOME=/usr/local/jdk1.8.0
  export HADOOP_HOME_WARN_SUPPRESS="TRUE"
  
  [root@mainserver conf]# vi core-site.xml 
  
  <configuration>
  <property>
  <name>fs.default.name</name>
  <value>hdfs://mainserver:9000</value>		// 메인서버로 변경 (네임노드)
  </property>
  <property>
  <name>hadoop.tmp.dir</name>
  <value>/usr/local/hadoop-1.2.1/tmp</value>
  </property>
  </configuration>
  
  [root@mainserver conf]# vi hdfs-site.xml
  
  <configuration>
  <property>
  <name>dfs.replication</name>
  <value>2</value> 							// 데이터 저장 개수 변경
  </property>
  <property>
  <name>dfs.webhdfs.enabled</name>
  <value>true</value>
  </property>
  <property>
  <name>dfs.name.dir</name>
  <value>/usr/local/hadoop-1.2.1/name</value>
  </property>
  <property>
  <name>dfs.data.dir</name>
  <value>/usr/local/hadoop-1.2.1/data</value>
  </property>
  </configuration>
  
  [root@mainserver conf]# vi mapred-site.xml 
  
  <configuration>
  <property>
  <name>mapred.job.tracker</name>
  <value>mainserver:9001</value>				// 메인 서버로 변경 (네임노드)
  </property>
  </configuration>
  
  [root@mainserver conf]# vi masters 
  
  secondserver								// 보조 네임노드 입력
  
  [root@mainserver conf]# vi slaves
  
  secondserver								// 데이터 노드들 입력			
  dataserver
  ```

* 하둡 디렉토리 전송 (압축해서)

  ```
  //압축
  [root@mainserver ~]# cd /usr/local/
  [root@mainserver local]# tar cvfz hadoop.tar.gz ./hadoop-1.2.1
  //보내기
  [root@mainserver local]# scp hadoop.tar.gz root@secondserver:/usr/local
  [root@mainserver local]# scp hadoop.tar.gz root@dataserver:/usr/local
  //압축풀기
  [root@mainserver local]# ssh root@secondserver tar xvf /usr/local/hadoop.tar.gz
  [root@mainserver local]# ssh root@dataserver tar xvf /usr/local/hadoop.tar.gz
  //폴더 이동
  [root@mainserver local]# ssh root@secondserver mv /root/hadoop-1.2.1 /usr/local
  [root@mainserver local]# ssh root@dataserver mv /root/hadoop-1.2.1 /usr/local
  
  ```

* 하둡 실행

  ```
  [root@mainserver ~]# hadoop namenode -format
  [root@mainserver ~]# start-all.sh
  [root@mainserver ~]# jps
  3443 JobTracker
  3576 Jps
  3259 NameNode
  
  [root@secondserver ~]# jps
  3552 DataNode
  3648 SecondaryNameNode
  3830 Jps
  3754 TaskTracker
  
  [root@dataserver ~]# jps
  3782 Jps
  3048 DataNode
  3146 TaskTracker
  ```

  