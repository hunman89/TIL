#### 2020-09-21

## RAID

> 여러개의 하드디스크를 하나의 하드디스크처럼 사용
>
> 비용 절감, 신뢰성 향상, 성능 향상

* 하드웨어 RAID

  * 비싸다
* 소프트웨어 RAID



## RAID 레벨

* Linear RAID 
  * 2개 이상의 디스크를 단순히 하나로 뭉친다.
  * 디스크 1번이 채워진 후 2번이 채워진다. 
  * 신뢰성이 떨어진다.
* RAID 0
  * 여러개 하드디스크에 동시에 저장된다. -> 속도가 빠르다.
  * 신뢰성이 떨어진다.
* RAID 1
  * **미러링** = 똑같이 복제해 저장한다.
  * 결함 허용을 제공한다.
  * 비용이 두배로 든다. 저장 공간 효율이 절반
* 1+0 을 단순히 조합해서 만들 수 있다. => 많은 디스크가 필요

* RAID 5
  * **패리티** 를 사용한다.
  * 패리티 공간을 비워두고 데이터 저장시 알고리즘으로 패리티값을 생성해, 디스크 하나가 고장나도 복구 할 수 있게 한다. 
  * 어느정도 결함을 허용하며 (1대) , 저장 공간 효율이 좋다.
* RAID 6
  * 패리티 2개 사용한다.
  * 알고리즘 복잡해진다.

  

## 실습

* 파티션들을 세팅한다.

```
[root@server ~]# fdisk /dev/sdb

Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table
Building a new DOS disklabel with disk identifier 0x02b923c7.

Command (m for help): n
Partition type:
   p   primary (0 primary, 0 extended, 4 free)
   e   extended
Select (default p): p
Partition number (1-4, default 1): 1
First sector (2048-4194303, default 2048): 
Using default value 2048
Last sector, +sectors or +size{K,M,G} (2048-4194303, default 4194303): 
Using default value 4194303
Partition 1 of type Linux and of size 2 GiB is set

Command (m for help): t			// 실습을 위해 추가된 부분.
Selected partition 1
Hex code (type L to list all codes): fd
Changed type of partition 'Linux' to 'Linux raid autodetect'

Command (m for help): p

Disk /dev/sdb: 2147 MB, 2147483648 bytes, 4194304 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x02b923c7

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048     4194303     2096128   fd  Linux raid autodetect

Command (m for help): w
The partition table has been altered!

Calling ioctl() to re-read partition table.
Syncing disks.
```

* Linear RAID

  * 생성

      ```
      [root@server ~]# mdadm --create /dev/md9 --level=linear --raid-devices=2 /dev/sdb1 /dev/sdc1	// /dev/{원하는 폴더명} ... ==raid-devices={원하는 개수} {디스크 경로들}

      mdadm: Defaulting to version 1.2 metadata
      mdadm: array /dev/md9 started.
      ```

  * 확인

    ```
    [root@server ~]# mdadm --detail --scan
    
    ARRAY /dev/md9 metadata=1.2 name=server:9 UUID=edd71980:09d0eb19:3fb21887:5ce0e0d4
    ```

  * 포맷

    ```
    [root@server ~]# mkfs.ext4 /dev/md9
    
    mke2fs 1.42.9 (28-Dec-2013)
    Filesystem label=
    OS type: Linux
    Block size=4096 (log=2)
    Fragment size=4096 (log=2)
    Stride=0 blocks, Stripe width=0 blocks
    196224 inodes, 784896 blocks
    39244 blocks (5.00%) reserved for the super user
    First data block=0
    Maximum filesystem blocks=805306368
    24 block groups
    32768 blocks per group, 32768 fragments per group
    8176 inodes per group
    Superblock backups stored on blocks: 
    	32768, 98304, 163840, 229376, 294912
    
    Allocating group tables: done                            
    Writing inode tables: done                            
    Creating journal (16384 blocks): done
    Writing superblocks and filesystem accounting information: done 
    ```

  * 마운트

    ```
    [root@server ~]# mkdir /raidLinear
    [root@server ~]# mount /dev/md9 /raidLinear
    
    [root@server ~]# df
    
    Filesystem     1K-blocks    Used Available Use% Mounted on
    ...
    /dev/md9         3024752    9216   2842176   1% /raidLinear
    ```

  * 설정

    ```
    [root@server ~]# vi /etc/fstab
    ```

    ```
    /dev/md9 /raidLinear ext4 defaults 0 0		// 맨 밑에 삽입
    ```

  * STOP

    ```
    [root@server ~]# umount /dev/md9
    [root@server ~]# mdadm --stop /dev/md9
    
    mdadm: stopped /dev/md9
    ```

* RAID 0

  ```
  [root@server ~]# mdadm --create /dev/md0 --level=0 --raid-device=2 /dev/sdd1 /dev/sde1
  [root@server ~]# mkfs.ext4 /dev/md0
  [root@server ~]# mkdir /raid0
  [root@server ~]# mount /dev/md0 /raid0
  [root@server ~]# vi /etc/fstab
  
  /dev/md0 /raid0 ext4 defaults 0 0
  ```

* RAID 1

  ```
  [root@server ~]# mdadm --create /dev/md1 --level=1 --raid-devices=2 /dev/sdf1 /dev/sdg1
  [root@server ~]# mkfs.ext4 /dev/md1
  [root@server ~]# mkdir /raid1
  [root@server ~]# mount /dev/md1 /raid1
  [root@server ~]# vi /etc/fstab
  
  /dev/md1 /raid1 ext4 defaults 0 0
  ```

* RAID 5

  ```
  [root@server ~]# mdadm --create /dev/md5 --level=5 --raid-devices=3 /dev/sdh1 /dev/sdi1 /dev/sdj1
  [root@server ~]# mkfs.ext4 /dev/md5
  [root@server ~]# mkdir /raid5
  [root@server ~]# mount /dev/md5 /raid5
  [root@server ~]# vi /etc/fstab
  
  /dev/md1 /raid1 ext4 defaults 0 0
  ```

* RAID 6

  ```
  [root@server ~]# mdadm --create /dev/md6 --level=6 --raid-devices=4 /dev/sdh1 ...
  ```

* RAID 1+0

  ```
  [root@server ~]# mdadm --create /dev/md1 --level=1 --raid-devices=2 /dev/sdf1 /dev/sdg1			// RAID 1 구성
  [root@server ~]# mdadm --create /dev/md2 --level=1 --raid-devices=2 /dev/sdh1 /dev/sdi1			// RAID 1 구성
  [root@server ~]# mdadm --create /dev/md10 --level=0 --raid-devices=2 /dev/md1 /dev/md2
  // RAID 0
  
  [root@server ~]# mkfs.ext4 /dev/md10
  [root@server ~]# mkdir /raid10
  [root@server ~]# mount /dev/md10 /raid10
  [root@server ~]# vi /etc/fstab
  ```

  

## 복구 실습

* 고장난 디스크 제거

* 파티션 다시 생성

  

* Linear RAID, RAID 0 은 처음부터 다시 생성

* RAID 1, RAID 5 는 디스크 추가

  ```
  [root@server ~]# mdadm /dev/md1 --add /dev/sdg1
  
  mdadm: added /dev/sdg1
  
  [root@server ~]# mdadm /dev/md5 --add /dev/sdi1
  
  mdadm: added /dev/sdi1
  ```

  




