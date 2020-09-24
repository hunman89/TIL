#### 20200923

## HIVE

> 하둡에 저장된 데이터를 쉽게 처리할 수 있는 데이터웨어하우스 패키지
>
> **SQL**문을 자동으로 변환시켜 데이터를 출력시켜 준다.

* 메타 스토어를 활용한다. (MariaDB, OracleDB ...)
  * 구조만 저장



## 설치

* HIVE 다운로드

  ```
  [root@mainserver 다운로드]# wget https://archive.apache.org/dist/hive/hive-1.0.1/apache-hive-1.0.1-bin.tar.gz
  ```

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
  
  [root@mainserver 다운로드]# chkconfig mysql on
  ```

  * hive_db, hive 계정 생성

    ```
    [root@mainserver 다운로드]# mysqladmin -u root password '111111'	// root 계정
    [root@mainserver 다운로드]# mysql -h localhost  -u  root  -p		// root 계정접속
    ```

    ```sql
    MariaDB [(none)]> use mysql;
    MariaDB [(none)]> user, host  FROM  user;		// 계정 확인
    MariaDB [mysql]> GRANT ALL ON *.* TO hive@'192.168.111.%' IDENTIFIED BY '111111';
    // hive 계정 생성, ip 권한을 mainserver, localhost,127.0.0.1 도 추가해준다.
    MariaDB [mysql]> CREATE DATABASE hive_db CHARACTER SET utf8;	// hive_db 생성
    ```

    

    