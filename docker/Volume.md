## 볼륨

> 도커 컨테이너는 이미지 위에 생성되고, 컨테이너 계층에 변경점을 저장하고 이미지 자체는 변하지 않는다. 컨테이너를 삭제하면 변경점이 모두 사라진다.
>
> 변경점 삭제를 방지하기 위해 볼륨을 이용하기도 한다.

volume 을 이용해서 컨테이너는 변하지 않도록 하는것을 stateless 라고 한다.



#### 1. 호스트와 볼륨 공유

* 컨테이너 생성시 호스트와 공유한다. (동기화가 아니가 완전히 같음)
* 동시에 여러개 가능하고, 디렉터리나 파일 모두 가능하다.

```shell
$ docker run -d \  																# 컨테이너 1 생성
> --name wordpressdb_hostvolume \
> -e MYSQL_ROOT_PASSWORD=password \
> -e MYSQL_DATABASE=wordpress \
> -v /home/wordpress_db:/var/lib/mysql \	### 이 명령어가 호스트와 볼륨을 공유하게 해 준다. [호스트의 공유 디렉터리 or 파일]:[컨테이너's]
> mysql:5.7
961830fc82332aa2367ba375a2b1d9da39a65a4c93e12032de90691fd7e01c24

$ docker run -d -e WORDPRESS_DB_PASSWORD=password --name wordpress_hostvolume --li  # 컨테이너 2 생성
nk wordpressdb_hostvolume:mysql -p 80 wordpress
25ea87bc15a944089e39ce520bff0520b2d505a8917e1e696a5b4f1b3db81cfe
			
$ ls /home/wordpress_db 													# 호스트에 폴더, 파일이 생성됨
auto.cnf    client-cert.pem  ib_logfile0  ibtmp1              private_key.pem  server-key.pem
ca-key.pem  client-key.pem   ib_logfile1  mysql               public_key.pem   sys
ca.pem      ib_buffer_pool   ibdata1      performance_schema  server-cert.pem  wordpress

$ docker stop wordpress_hostvolume wordpressdb_hostvolume 						# 컨테이너 삭제
wordpress_hostvolume
wordpressdb_hostvolume
$ docker rm wordpress_hostvolume wordpressdb_hostvolume
wordpress_hostvolume
wordpressdb_hostvolume

$ ls /home/wordpress_db														# 그래도 존재.			
auto.cnf    client-cert.pem  ib_logfile0  mysql               public_key.pem   sys
ca-key.pem  client-key.pem   ib_logfile1  performance_schema  server-cert.pem  wordpress
ca.pem      ib_buffer_pool   ibdata1      private_key.pem     server-key.pem
```

* 원래 존재하던 디렉터리에 공유하면 컨테이너의 디렉터리 자체가 덮어씌워진다. (마운트)



#### 2. 볼륨 컨테이너

* 볼륨을 사용하는 컨테이너를 다른 컨테이너와 공유
* `--volumes-from` 명령어를 통해 공유
* `-v` 또는 `-volume` 옵션을 적용한 컨테이너가 필요하다!

```shell
$ docker run -i -t \
--name voumes_from_container \
--volumes-from volume_overide \				# volume_overide에 -v 옵션이 적용되어 호스트와 볼륨이 공유되어 있어야 한다.
ubuntu:14.04
```



#### 3. 도커 볼륨

* 도커 자체에서 제공하는 볼륨 (도커 엔진에서 관리)

```sh
$ docker volume create --name myvolume						##생성 및 확인
myvolume
$ docker volume ls
DRIVER    VOLUME NAME
local     myvolume

$ docker run -i -t --name myvolume_1 \						## 도커볼륨 연결 [볼륨 이름]:[컨테이너 공유 디렉터리]
> -v myvolume:/root/ \
> ubuntu:14.04

root@1ccc7b36d1c0:/# echo hello, volume! >> /root/volume      ## 파일 생성
root@1ccc7b36d1c0:/# ^C
root@1ccc7b36d1c0:/# exit
exit

$ docker run -i -t --name myvolume_2 \						## 새 컨테이너 도커볼륨 연결
> -v myvolume:/root/ \
> ubuntu:14.04

root@ff94b857151a:/# cat /root/volume						## 파일 확인
hello, volume!
```

* `inspect`를 통해 정보 확인

```shell
$ docker inspect --type volume myvolume
[
    {
        "CreatedAt": "2021-02-17T09:50:53Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/myvolume/_data",
        "Name": "myvolume",
        "Options": {},
        "Scope": "local"
    }
]
```

* 따로 생성안하고 `-v`를 통해 자동 생성 가능

```shell
$ docker run -i -t --name volume_auto \
> -v /root \					# /root를 공유하는 도커 볼륨 자동 생성
> ubuntu:14.04
```

* 불필요한 볼륨 삭제

```sh
$ docker volume prune
WARNING! This will remove all local volumes not used by at least one container.
Are you sure you want to continue? [y/N] y
Total reclaimed space: 0B
```

