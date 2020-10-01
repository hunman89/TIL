#### 20200923

## HDFS 명령어

> `hadoop fs - cmd [args]`

* 파일 목록보기

  ```
  [root@mainserver ~]# hadoop fs -ls /				//현재
  
  Found 1 items
  drwxr-xr-x   - root supergroup          0 2020-09-23 14:41 /usr
  
  [root@mainserver ~]# hadoop fs -lsr /				//전체
  
  drwxr-xr-x   - root supergroup          0 2020-09-23 14:41 /usr
  -rw-r--r--   1 root supergroup       1997 2020-09-23 14:41 /usr/anaconda-ks.cfg
  drwxr-xr-x   - root supergroup          0 2020-09-23 14:11 /usr/local
  drwxr-xr-x   - root supergroup          0 2020-09-23 14:11 /usr/local/hadoop-1.2.1
  drwxr-xr-x   - root supergroup          0 2020-09-23 14:11 /usr/local/hadoop-1.2.1/tmp
  drwxr-xr-x   - root supergroup          0 2020-09-23 14:11 /usr/local/hadoop-1.2.1/tmp/mapred
  drwx------   - root supergroup          0 2020-09-23 14:11 /usr/local/hadoop-1.2.1/tmp/mapred/system
  -rw-------   1 root supergroup          4 2020-09-23 14:11 /usr/local/hadoop-1.2.1/tmp/mapred/system/jobtracker.info
  ```

* 용량 확인

  ```
  [root@mainserver ~]# hadoop fs -du /				//현재
  
  Found 1 items
  2001        hdfs://mainserver:9000/usr
  
  [root@mainserver ~]# hadoop fs -dus /				//전체
  	
  hdfs://mainserver:9000/	2001
  ```

* 내용보기

  ```
  -cat
  -text
  ```

* 폴더 만들기

  ```
  -mkdir
  ```

* 파일 복사

  ```
  [root@mainserver ~]# hadoop fs -put anaconda-ks.cfg /usr
  
  -get			// 가져올때
  -getmerge		// 폴더 내부의 모든 파일을 하나로
  ```

* 이동

  ```
  -mv
  ```

* 삭제

  ```
  -rm			// 파일
  -rmr		// 디렉터리	
  ```

  

