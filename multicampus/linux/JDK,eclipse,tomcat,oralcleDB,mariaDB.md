## JDK

* download jdk x64

  ```
  [root@server ~]# cd 다운로드
  [root@server 다운로드]# ls
  jdk-8u261-linux-x64.tar.gz
  ```

*  압축풀고 이동

  ```
  [root@server 다운로드]# tar xvf jdk-8u261-linux-x64.tar.gz 
  [root@server 다운로드]# mv jdk1.8.0_261/ jdk1.8.0
[root@server 다운로드]# cp -r jdk1.8.0 /usr/local
  ```

* 기존 자바 링크 삭제

  ```
  [root@server 다운로드]# rm /usr/bin/java		// Open jdk 삭제
  rm: remove 심볼릭 링크 `/usr/bin/java'? y
  ```
  
* 링크 생성
  
    ```
    [root@server 다운로드]# cd /usr/bin
    [root@server bin]# ln -s /usr/local/jdk1.8.0/bin/java java
    [root@server bin]# ls -l java
    lrwxrwxrwx 1 root root 28  9월 28 16:33 java -> /usr/local/jdk1.8.0/bin/java
    [root@server bin]# java -version
java version "1.8.0_261"
  Java(TM) SE Runtime Environment (build 1.8.0_261-b12)
  Java HotSpot(TM) 64-Bit Server VM (build 25.261-b12, mixed mode)
  ```
  
* 세팅
  
  ```
  [root@server bin]# vi /etc/profile
  
       53 JAVA_HOME=/usr/local/jdk1.8.0
       54 CLASSPATH=/usr/local/jdk1.8.0/lib
       55 export JAVA_HOME CHASSPATH
       56 PATH=$JAVA_HOME/bin:$PATH:.
  ```



## Eclipse

eclipse download 

tar xvf eclipse-xxxx.gz

cp -r eclipse /usr/local

cd /usr/bin

ln -s /usr/local/eclipse/eclipse eclipse



## Tomcat

* tomcat.apache.org 다운로드

* 압축 해제 및 이동

  ```
  [root@server 다운로드]# tar xvf apache-tomcat-9.0.38.tar.gz
  [root@server 다운로드]# cp -r apache-tomcat-9.0.38 /usr/local
  ```

* 세팅

  ```
  [root@server 다운로드]# cd /usr/local/apache-tomcat-9.0.38/conf/
  [root@server conf]# vi server.xml
  
  	69 8080port -> 80port		//포트변경
  	
  [root@server conf]# cd /usr/bin
  [root@server bin]# ln -s /usr/local/apache-tomcat-9.0.38/bin/startup.sh starttomcat				// 시작 소프트 링크 생성
  [root@server bin]# ln -s /usr/local/apache-tomcat-9.0.38/bin/shutdown.sh stoptomcat				// 종료	
  ```

* 실행

  ```
  [root@server ~]# starttomcat
  Using CATALINA_BASE:   /usr/local/apache-tomcat-9.0.38
  Using CATALINA_HOME:   /usr/local/apache-tomcat-9.0.38
  Using CATALINA_TMPDIR: /usr/local/apache-tomcat-9.0.38/temp
  Using JRE_HOME:        /usr
  Using CLASSPATH:       /usr/local/apache-tomcat-9.0.38/bin/bootstrap.jar:/usr/local/apache-tomcat-9.0.38/bin/tomcat-juli.jar
  Using CATALINA_OPTS:   
  Tomcat started.
  ```

  

## Oracle DB



oracle express edition 11g - download

unzip oraclexxxx.zip

cd Disk1

yum -y localinstall oraclxxx.rpm

service oracle-xe configure

p618 

systemctl restart oracle-xe

systemctl status oracle-xe

p619 2-4, 2-5



## MariaDB

* download

  [링크](https://downloads.mariadb.com/MariaDB/mariadb-10.0.15/yum/centos7-amd64/rpms/)

  * client, common, server

* 설치

  ```
  [root@server 다운로드]# yum -y remove mariadb-libs // 과거 기록 삭제
  [root@server 다운로드]# yum -y localinstall Maria* // 통합 설치
  ```

* 세팅

  ```
  [root@server 다운로드]# systemctl restart mysql
  [root@server 다운로드]# systemctl status mysql
  ● mysql.service - LSB: start and stop MySQL
     Loaded: loaded (/etc/rc.d/init.d/mysql; bad; vendor preset: disabled)
     Active: active (running) since 월 2020-09-28 17:07:37 KST; 7s ago
       Docs: man:systemd-sysv-generator(8)
    Process: 5519 ExecStart=/etc/rc.d/init.d/mysql start (code=exited, status=0/SUCCESS)
      Tasks: 24
     CGroup: /system.slice/mysql.service
             ├─5524 /bin/sh /usr/bin/mysqld_safe --datadir=/var/lib/mysql --pid-file=/var/lib/mysql/hive.pid
             └─5598 /usr/sbin/mysqld --basedir=/usr --datadir=/var/lib/mysql --plugin-dir=/usr/lib64/mysql/plugin --user=mysql --log-error=...
  
   9월 28 17:07:36 hive systemd[1]: Starting LSB: start and stop MySQL...
   9월 28 17:07:37 hive mysql[5519]: Starting MySQL. SUCCESS!
   9월 28 17:07:37 hive systemd[1]: Started LSB: start and stop MySQL.
   
  [root@server 다운로드]# chkconfig mysql on			// 항상 구동 세팅
  [root@server 다운로드]# mysql						// 접속 확인
  ```

* root 계정 설정

  ```
  [root@server 다운로드]# mysqladmin -u root password '111111'	// 계정생성
  [root@server 다운로드]# mysql -h localhost -u root -p			// 접속
  ```

* 계정 확인

  ```mysql
  MariaDB [(none)]> use mysql;						// 유저들이 모인 db로 이동
  MariaDB [mysql]> SELECT  user, host  FROM  user;	// 권한들 확인
  +------+-----------+
| user | host      |
  +------+-----------+
  | root | 127.0.0.1 |
  | root | ::1       |
  |      | hive      |
  | root | hive      |
  |      | localhost |
  | root | localhost |
  +------+-----------+
  6 rows in set (0.00 sec)
  ```
  
* 계정 권한 설정

  ```mariadb
  MariaDB [mysql]> GRANT ALL ON *.* TO hive@'192.168.111.%' IDENTIFIED BY '111111';
  // hive 계정 생성, ip 권한을 mainserver(도메인), localhost,127.0.0.1 도 추가해준다.
  // 혹시 몰라 현재ip, ip의 도메인, 로컬 도메인, 로컬 ip를 다 추가해줌
  
  MariaDB [mysql]> SELECT  user, host  FROM  user;
  +------+-----------------+
  | user | host            |
  +------+-----------------+
  | hive | 127.0.0.1       |
  | root | 127.0.0.1       |
  | hive | 192.168.111.130 |
  | root | ::1             |
  |      | hive            |
  | hive | hive            |
  | root | hive            |
  |      | localhost       |
  | hive | localhost       |
  | root | localhost       |
  +------+-----------------+
  10 rows in set (0.00 sec)
  ```

  ```
  [root@mainserver 다운로드]# mysql -h localhost  -u  root  -p		// hive 계정접속
  ```

* db 생성

  ```mariadb
  MariaDB [(none)]> CREATE DATABASE hive_db;	// hive_db 생성
  ```

  

* mariadb -spring 연결 코드 

  ```java
  Class.forName("org.mariadb.jdbc.Driver");
  String dbUrl = "jdbc:mariadb://localhost:3306/shopdb";
  String dbUser = "username";
  String dbPasswd = "passwd";
  Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPasswd);
  ```

  * mariadb-java-client-1.3.5.jar 파일이 필요하다.




