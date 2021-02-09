## Docker

> 컨테이너

#### 

#### 설치

* WSL2를 설치한 뒤, 윈도우에서 Docker desktop을 설치하여 윈도우에서도 wsl를 통해 쉽게 사용할 수 있게 하였다.

``````shell
$ docker -v
Docker version 20.10.2, build 2291f61
``````



#### 실행

* 바로 실행

```shell
$ docker run -i -t ubuntu:14.04
Unable to find image 'ubuntu:14.04' locally
14.04: Pulling from library/ubuntu
2e6e20c8e2e6: Pull complete
95201152d9ff: Pull complete
5f63a3b65493: Pull complete
Digest: sha256:63fce984528cec8714c365919882f8fb64c8a3edf23fdfa0b218a2756125456f
Status: Downloaded newer image for ubuntu:14.04
```

* 생성 (이미지 없을때)

```shell
$ docker pull centos:7
7: Pulling from library/centos
2d473b07cdd5: Pull complete
Digest: sha256:0f4ec88e21daf75124b8a9e5ca03c37a5e937e0e108a255d890492430789b60e
Status: Downloaded newer image for centos:7
docker.io/library/centos:7
```

* 생성(이미지 있을때)

```shell
$ docker create -i -t --name mycentos centos:7
928e704314a387acd942edf46a3ac0ccbc8ab2e1582c0b3de33c45c2b3347ea8
```

* 실행

```shell
$ docker start mycentos
mycentos
```

* 내부로

```shell
$ docker attach mycentos
[root@928e704314a3 /]# 
```

* 종료
  * exit , `ctrl` + D
  * `ctrl` + P , Q = 종료하지 않고 빠져나온다.
* 목록

```SHELL
$ docker ps  # 실행중
CONTAINER ID   IMAGE      COMMAND       CREATED              STATUS          PORTS     NAMES
928e704314a3   centos:7   "/bin/bash"   About a minute ago   Up 46 seconds             mycentos
$ docker ps -a  # 전체
CONTAINER ID   IMAGE          COMMAND       CREATED              STATUS                     PORTS     NAMES
928e704314a3   centos:7       "/bin/bash"   About a minute ago   Up About a minute                    mycentos
848a408826e5   ubuntu:14.04   "/bin/bash"   13 minutes ago       Exited (0) 6 minutes ago             optimistic_hermann
```

* 삭제

```SHELL
$ docker rm optimistic_hermann  
optimistic_hermann
$ docker stop $(docker ps -a -q)   # 실행중인건 멈추고 삭제해야 한다. 다른 명령어를 이용해 전체 삭제도 가능
928e704314a3
$ docker rm $(docker ps -a -q)
928e704314a3
$ docker rm -f mycentos			# 한방에 멈추고 삭제 가능
```

