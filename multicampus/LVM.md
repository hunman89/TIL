#### 20200922

## LVM

> 논리 하드디스크 관리자 (Logical Volume Manager)
>
> Linear RAID와 비슷하지만, 더 많은 기능이 있다.

* 합친 다음에 원하는대로 잘라 사용한다.
  * 이를 **논리볼륨**(Logical Volume) 이라고 한다.
  * 물리볼륨(Physical Volume) : 파티션.
  * 볼륨그룹(Logical Volume) : 물리볼륨을 합친것.



## Make

* 파티션 생성

  ```
  [root@webserver ~]# fdisk /dev/sdb
  [root@webserver ~]# fdisk /dev/sdc
  
  Welcome to fdisk (util-linux 2.23.2).
  
  Changes will remain in memory only, until you decide to write them.
  Be careful before using the write command.
  
  Device does not contain a recognized partition table
  Building a new DOS disklabel with disk identifier 0x45418355.
  
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
  
  Command (m for help): t
  Selected partition 1							// *******중요********
  Hex code (type L to list all codes): 8e			// LVM을 위한 파일 시스템 유형
  Changed type of partition 'Linux' to 'Linux LVM'
  
  Command (m for help): p
  
  Disk /dev/sdb: 2147 MB, 2147483648 bytes, 4194304 sectors
  Units = sectors of 1 * 512 = 512 bytes
  Sector size (logical/physical): 512 bytes / 512 bytes
  I/O size (minimum/optimal): 512 bytes / 512 bytes
  Disk label type: dos
  Disk identifier: 0x45418355
  
     Device Boot      Start         End      Blocks   Id  System
  /dev/sdb1            2048     4194303     2096128   8e  Linux LVM
  
  Command (m for help): w
  The partition table has been altered!
  
  Calling ioctl() to re-read partition table.
  Syncing disks.
  ```

* 물리볼륨 생성

  ```
  [root@webserver ~]# pvcreate /dev/sdb1
  
  	Physical volume "/dev/sdb1" successfully created.
  	
  [root@webserver ~]# pvcreate /dev/sdc1
  ```

* 물리볼륨 묶기

  ```
  [root@webserver ~]# vgcreate myVG /dev/sdb1 /dev/sdc1
  
  	Volume group "myVG" successfully created
  ```

* 확인

  ```
  [root@webserver ~]# vgdisplay
  
    --- Volume group ---
    VG Name               myVG
    System ID             
    Format                lvm2
    Metadata Areas        2
    Metadata Sequence No  1
    VG Access             read/write
    VG Status             resizable
    MAX LV                0
    Cur LV                0
    Open LV               0
    Max PV                0
    Cur PV                2
    Act PV                2
    VG Size               4.99 GiB
    PE Size               4.00 MiB
    Total PE              1278
    Alloc PE / Size       0 / 0   
    Free  PE / Size       1278 / 4.99 GiB
    VG UUID               mrzkZX-c7pm-1CRe-etqU-xNy0-3Mq7-3P7ZJ6
  ```

* 논리 그룹 생성

  ```
  [root@webserver ~]# lvcreate --size 1G --name myLG1 myVG
  
    Logical volume "myLG1" created.			// 1G 생성
    
  [root@webserver ~]# lvcreate --size 3G --name myLG2 myVG
  
    Logical volume "myLG2" created.			// 3G 생성
    
  [root@webserver ~]# lvcreate --extents 100%FREE --name myLG3 myVG
  
    Logical volume "myLG3" created.			// 나머지 생성
  ```

* 확인

  ```
  [root@webserver ~]# ls -l /dev/myVG
  합계 0
  lrwxrwxrwx 1 root root 7  9월 22 09:28 myLG1 -> ../dm-0
  lrwxrwxrwx 1 root root 7  9월 22 09:29 myLG2 -> ../dm-1
  lrwxrwxrwx 1 root root 7  9월 22 09:29 myLG3 -> ../dm-2
  ```

*  포맷 (파일 시스템 생성)

  ```
  [root@webserver ~]# mkfs.ext4 /dev/myVG/myLG1
  [root@webserver ~]# mkfs.ext4 /dev/myVG/myLG2
  [root@webserver ~]# mkfs.ext4 /dev/myVG/myLG3
  ```

* 마운트

  ```
  [root@webserver ~]# mkdir /lvm1					// 폴더 생성
  [root@webserver ~]# mkdir /lvm2
  [root@webserver ~]# mkdir /lvm3
  [root@webserver ~]# mount /dev/myVG/myLG1 /lvm1	// 거기에 마운트
  [root@webserver ~]# mount /dev/myVG/myLG2 /lvm2
  [root@webserver ~]# mount /dev/myVG/myLG3 /lvm3
  ```

* 세팅

  ```
  [root@webserver ~]# vi /etc/fstab
  ```

  ```
  /dev/myVG/myLG1 /lvm1 ext4 defaults 0 0			// 맨 아래에 삽입
  /dev/myVG/myLG2 /lvm2 ext4 defaults 0 0
  /dev/myVG/myLG3 /lvm3 ext4 defaults 0 0
  ```

  

