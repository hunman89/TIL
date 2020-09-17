## 20200915
---
#### mariaDB(mySQL) 설치
- 아이디마다 ip를 설정해줘야한다.
> 이클립스로 VMware와 연결해 데이터를 빼내는거 까지 성공하였다.
- 어떤 DB를 사용하더라고 각각의 특징을 알고 메뉴얼 숙지하는것이 중요하다!!

#### FTP설치와 운영
- vsftpd 설치(리눅스)
> vsftpd.conf를 수정해야한다 ;;
- 알 드라이브 설치 (다른 ip의 pc)
> vsftpd가 설치된 pc의 ip 세팅해서 파일을 올리면 그 세팅된 ip pc의 pub 폴더에 있다!

- 서버 운영
    - 이를 이용해 이클립스를 통해 html로 .war 파일을 export한 뒤 알 드라이브를 통해 리눅스로 이동시켜 톰캣의
        >/apache-tomcat-9.0.37/webapps/   

        폴더에 넣는다.
    - 폴더안의 root를 다른이름으로 바꾸고 .war를 ROOT.war로 바꾼뒤 톰캣 서버를 실행한다.
    - 다른 ip에서 리눅스의 ip로 접속하면 .war가 실행된다. 

#### 파일 찾기
- find + 디렉토리 + 옵션 +  옵션 ...
    - 최상위 디렉토리 : /
    - -exec 를 통해 여러 행동을 할 수 있으며 for문과 같은 효과? 낸다.
- which, whereis, locate...

#### 예약 실행
- at 
> 그 시간되면 실행한다.
- cron 
> 주기적으로 실행한다.
> vi /etc/crontab 을 수정하면 실행된다. (systemctl restart crond 필요)

#### 네트워크 관련 설정
- hostnamectl set-hostname __servername__
> 호스트 이름 설정
- vi /etc/hosts
> 여기 ip와 호스트이름을 적어넣어야 호스트 이름으로 ip들을 호출할 수 있다.


#### 파이프 
- | 를 이용하여 2개의 명령(프로그램)을 실행할 수 있다.
> | more : 내용을 페이지별로 끊어서
| grep : 필터
- '>' 를 이용하여 입출력을 바꾼다.

#### 프로세스
- 실행코드가 메모리에 할당되어 활성화 된 것이다.
- 작업관리자
> ps -ef | grep __프로세스이름__
- 실행종료
> kill -9 __프로세스번호__
- 포그라운드 프로세스 : 화면 바로 앞에 실행되는것
- 백그라운드 : 화면 뒤에서
    > __프로세스이름__ + & 으로 실행 할 수 있다.

#### 서비스
> systemctl start/stop/restart __서비스이름__
> status, enable/disable