#### 20200923

## HIVE

> 하둡에 저장된 데이터를 쉽게 처리할 수 있는 데이터웨어하우스 패키지
>
> **SQL**문을 자동으로 변환시켜 데이터를 출력시켜 준다.

* 메타 스토어를 활용한다. (MariaDB, OracleDB ...)
  * 구조만 저장



## 설치

* MariaDB 다운로드, 설치, 세팅

  [링크](https://downloads.mariadb.com/MariaDB/mariadb-10.0.15/yum/centos7-amd64/rpms/)

  * client, common, server 다운

  ```
  [root@mainserver 다운로드]# yum -y remove mariadb-libs		// 혹시 모를 라이브러리 삭제
  [root@mainserver 다운로드]# yum -y localinstall Maria*
  [root@mainserver 다운로드]# systemctl restart mysql
  [root@mainserver 다운로드]# systemctl status mysql
  
  ● mysql.service - LSB: start and stop MySQL
     Loaded: loaded (/etc/rc.d/init.d/mysql; bad; vendor preset: disabled)
     Active: active (running) since 수 2020-09-23 16:05:54 KST; 9s ago
       Docs: man:systemd-sysv-generator(8)
    Process: 10610 ExecStart=/etc/rc.d/init.d/mysql start (code=exited, status=0/SUCCESS)
      Tasks: 24
     CGroup: /system.slice/mysql.service
             ├─10615 /bin/sh /usr/bin/mysqld_safe --datadir=/var/lib/mysql --pid-file=/var/lib/mysql/mainserver.pid
             └─10689 /usr/sbin/mysqld --basedir=/usr --datadir=/var/lib/mysql --plugin-dir=/usr/lib64/mysql/plugin --user=mysql --log-error=/var/lib/m...
  
   9월 23 16:05:53 mainserver systemd[1]: Starting LSB: start and stop MySQL...
   9월 23 16:05:54 mainserver mysql[10610]: Starting MySQL. SUCCESS!
   9월 23 16:05:54 mainserver systemd[1]: Started LSB: start and stop MySQL.
  
  [root@mainserver 다운로드]# chkconfig mysql on		// 항상 구동
  ```

  * hive_db, hive 계정 생성

    ```
    [root@mainserver 다운로드]# mysqladmin -u root password '111111'	// root 계정
    [root@mainserver 다운로드]# mysql -h localhost  -u  root  -p		// root 계정접속
    ```

    ```sql
    MariaDB [(none)]> use mysql;
    MariaDB [mysql]> SELECT user, host  FROM  user;		// 계정 확인
    MariaDB [mysql]> GRANT ALL ON *.* TO hive@'192.168.111.%' IDENTIFIED BY '111111';
    // hive 계정 생성, ip 권한을 mainserver(도메인), localhost,127.0.0.1 도 추가해준다.
    // 혹시 몰라 현재ip, ip의 도메인, 로컬 도메인, 로컬 ip를 다 추가해줌
    ```

    ```\
[root@mainserver 다운로드]# mysql -h localhost  -u  root  -p		// hive 계정접속
    ```
    
    ```
    MariaDB [(none)]> CREATE DATABASE hive_db;	// hive_db 생성
    ```



* HIVE 다운로드
  
  ```
  [root@mainserver 다운로드]# wget https://archive.apache.org/dist/hive/hive-1.0.1/apache-hive-1.0.1-bin.tar.gz
  ```
  
* 설치

  ```
  [root@mainserver 다운로드]# tar xvf apache-hive-1.0.1-bin.tar.gz 
  [root@mainserver 다운로드]# mv apache-hive-1.0.1-bin hive
  [root@mainserver 다운로드]# cp -r hive /usr/local
  ```

* /etc/profile 세팅

  ```
  52 JAVA_HOME=/usr/local/jdk1.8.0
  53 CLASSPATH=/usr/local/jdk1.8.0/lib
  54 HADOOP_HOME=/usr/local/hadoop-1.2.1
  55 HIVE_HOME=/usr/local/hive										//추가
  56 
  57 export JAVA_HOME CLASSPATH HADOOP_HOME HIVE_HOME					//추가
  58 
  59 PATH=$JAVA_HOME/bin:$HADOOP_HOME/bin:$HIVE_HOME/bin:.:$PATH		//추가
  ```

* hive - mariaDB

  *  mariadb-java-client-1.3.5.jar 를 복사

      ```
      [root@mainserver 다운로드]# cp mariadb-java-client-1.3.5.jar /usr/local/hive/lib
      ```

* hive-site.xml

  ```
  [root@mainserver ~]# cd /usr/local/hive/conf/
  [root@mainserver conf]# vi hive-site.xml
  ```

  ```xml
  <?xml version="1.0"?>
  <?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
  
  <configuration>
      <property>
          <name>hive.metastore.local</name>			// 메타스토어를 하이브 자체로 안한다.
          <value>false</value>
          <description>controls whether to connect to remove metastore server or open a new metastore server in Hive Client JVM</description>
      </property>
      <property>
          <name>javax.jdo.option.ConnectionURL</name>		// 마리아 db로 한다.
          <value>jdbc:mariadb://localhost:3306/hive_db?createDatabaseIfNotExist=true</value>
          <description>JDBC connect string for a JDBC metastore</description>
      </property>
      <property>
          <name>javax.jdo.option.ConnectionDriverName</name>
          <value>org.mariadb.jdbc.Driver</value>
          <description>Driver class name for a JDBC metastore</description>
      </property>
      <property>
          <name>javax.jdo.option.ConnectionUserName</name>	
          <value>hive</value>									// 계정명
          <description>username to use against metastore database</description>
      </property>
      <property>
          <name>javax.jdo.option.ConnectionPassword</name>	
          <value>111111</value>								// 비밀번호
          <description>password to use against metastore database</description>
      </property>
  </configuration>
  ```

* 하둡 - 하이브폴더 세팅

  ```
  [root@mainserver ~]# hadoop fs -mkdir /tmp
  [root@mainserver ~]# hadoop fs -mkdir /user/root/warehouse
  [root@mainserver ~]# hadoop fs -chmod 777 /tmp
  [root@mainserver ~]# hadoop fs -chmod 777 /user/root/warehouse
  [root@mainserver ~]# hadoop fs -mkdir /tmp/hive
  [root@mainserver ~]# hadoop fs -chmod 777 /tmp/hive
  ```

  * 777로 모든 권한을 오픈

  
