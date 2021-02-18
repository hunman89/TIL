## 네트워크

> 컨테이너의 eth0 인터페이스는 호스트의 veth... 인터페이스와 연결되어 있으며, veth.. 들은 docker0 브리지와 바인딩 되어 외부와 통신할 수 있다.

* 기본적으로 docker0 브리지를 통해 외부와 통신하지만, 여러 네트워크 드라이버를 사용할 수 있다.
  * bridge, host, none, container, overlay
  * 써드파티 플러그인 솔루션도 있다.

```shell
$ docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
f202c0104270   bridge    bridge    local
f42dbc106f3a   host      host      local
3446fc56ff98   none      null      local
```



#### bridge 네트워크

docker0이 아닌 사용자 정의 브리지를 새로 생성해 각 컨테이너 연결

* 생성

```shell
$ docker network create --driver bridge mybridge
98263a2c557d3ab74760b1a8ecc7da3d8ba403e37673a014adcb745081414eae

# 임의 설정
$ docker network create --driver=bridge \
> --subnet=172.72.0.0/16 \
> --ip-range=172.72.0.0/24 \
> --gateway=172.72.0.1 \
> my_custom_network
```

* 사용

```shell
$ docker run -i -t --name mynetwork_container \
> --net mybridge \
> ubuntu:14.04
root@c3f8aa2f67da:/#


# 컨테이너에 새로운 ip 대역이 할당된다
root@c3f8aa2f67da:/# ifconfig
eth0      Link encap:Ethernet  HWaddr 02:42:ac:12:00:02
          inet addr:172.18.0.2  Bcast:172.18.255.255  Mask:255.255.0.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:16 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:1312 (1.3 KB)  TX bytes:0 (0.0 B)

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
```

* 설정 (다른 네트워크 모드에는 적용이 안되는 것들이 많다.)

```shell
$ docker network disconnect mybridge mynetwork_container
$ docker network connect mybridge mynetwork_container
```

