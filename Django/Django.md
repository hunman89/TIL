## Django

> 파이썬 기반의 webframework
>
> Flask 보다 구조화가 많이 되어있고, React보다 콘텐츠 표현에 뛰어나다.



#### 파이썬 설치

* 윈도우 환경에서 깔끔한 설치? 를 위해 WSL를 설치한다
* Windows Subsystem for Linux : 윈도우에서 가볍게 리눅스 실행 가능

1. Windows terminal 설치 : Microsoft store에서

2. 관리자 권한으로 실행, 아래 명령어 실행

   ```powershell
   > dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   > dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```

   참고 : [윈도우 공식문서](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

3. 리눅스 배포판 설치 : Microsoft store에서 (Ubuntu 로 진행)

4. 리눅스 커널 업데이트 : 아래 링크

   [WSL2 Linux Kernal](https://docs.microsoft.com/ko-kr/windows/wsl/wsl2-kernel)

5. WSL2 적용

   ```powershell
   > wsl --set-version Ubuntu 2
   > wsl --set-default-version 2
   ```

6. 시작 : 윈도우 터미널에서 새탭의 오른쪽 아래 화살표 클릭해서 선택

7. *파이썬 설치* : 리눅스에서

   ```shell
   $ sudo apt-get update
   $ sudo apt-get install python3.8 python3-pip
   ```

   참고 : [How to Install Python on Linux](https://realpython.com/installing-python/#how-to-install-python-on-linux)



#### pipenv 설치 & Django 세팅

> Bubble과 같이 django 환경을 프로젝트 안에서만 구성하게 해 준다.

1. pipenv 설치

   ```shell
   $ pip3 install pip --upgrade  	# pip 업그레이드
   $ pip3 install pipenv 			# 설치	
   ```

2. 디렉터리 이동

3. 가상환경 생성

   ```shell
   $ pipenv --three 		# 파이썬3 버블
   $ pipenv shell 			# 버블 속으로
   ```

4. django 설치

   ```shell
   $ pipenv install Django				# 최신
   $ pipenv install Django==2.2.5		# 버전 지정
   
   ```

5. 확인

   ```
   $ Django-admin
   ```

6. django 시작

   ```shell
   $ django-admin startproject config
   ```

7. vscode 에서 생성된 config 폴더를 확인한 뒤 , config 폴더 내부의 config폴더와 manage.py 파일을 꺼낸다. (프로젝트 폴더 바로 아래로 위치하게) 기존의 config 폴더(이름 바꿔야 함)는 지운다 

​	

#### vscode 세팅 (개발환경)

* python extension
  * 프로젝트마다 파이썬 버전을 고를 수 있다.
* Linter
  * 에러 생길부분 미리 감지
  * flake8 사용
* formatter
  * python 권장 코드스타일(pep8)에 맞춰 변형해 준다.
  * black 사용



#### 구조 살펴보기

* \__init\__.py
  
  * 파이썬 패키지처럼 속한 폴더를 import가능하게 한다.
* settings.py
  
* 모든것이 세팅되어 있고, 공식문서 링크가 연결되어 있다.
  
* 관리자 서버시작 (manage.py)

    ```shell
    $ pipenv shell
    $ python manage.py runserver     		# ctrl+c 종료
    $ python manage.py migrate				# 임시로 에러 제거 (아래 설명)
    $ python manage.py createsuperuser		# 관리자 슈퍼계정 생성
    ```

    * 별도의 코드없이 관리자 페이지가 생성된다!!



#### Migration

* 그냥 시작하면 에러가 뜬다. (Database가 없기 때문)
* 보통 데이터를 저장,관리 할 때, SQL문을 사용한다.
* 장고는 DATA **Models**를 확인하고 migration을 생성한다. = sql문이 필요없다.
* Models 를 다루게 되면 따라온다.


