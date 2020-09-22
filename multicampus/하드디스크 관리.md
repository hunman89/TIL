#### 2020-09-21

## 하드디스크 관리

> 리눅스에서 하드디스크 추가하기

* 리눅스에서는 수동으로 연결시켜 줘야 하는데, 윈도우와는 다르게 폴더에 연결한다.

* 디스크 확인

  ```
  [root@server ~]# cd /dev
  [root@server dev]# ls -l sd*
  
  brw-rw---- 1 root disk 8,  0  9월 21 09:26 sda
  brw-rw---- 1 root disk 8,  1  9월 21 09:26 sda1
  brw-rw---- 1 root disk 8,  2  9월 21 09:26 sda2
  brw-rw---- 1 root disk 8, 16  9월 21 09:26 sdb   	// 파티션 만들곳
  ```

* fdisk를 이용하여 파티션을 만든다

  ```
  [root@server ~]# fdisk /dev/sdb
  
  Welcome to fdisk (util-linux 2.23.2).
  
  Changes will remain in memory only, until you decide to write them.
  Be careful before using the write command.
  
  Device does not contain a recognized partition table
  Building a new DOS disklabel with disk identifier 0x25a3b1cc.
  
  Command (m for help): n							// 새로운 파티션 분할
  Partition type:									// primary 파티션 선택
     p   primary (0 primary, 0 extended, 4 free)
     e   extended
  Select (default p): p							
  Partition number (1-4, default 1): 1			// 파티션 번호 선택		
  First sector (2048-2097151, default 2048): 		// 시작 섹터 번호 입력  (성능을 위해 2048부터 시작)
  Using default value 2048
  Last sector, +sectors or +size{K,M,G} (2048-2097151, default 2097151):  //마지막 섹터 번호 입력
  Using default value 2097151
  Partition 1 of type Linux and of size 1023 MiB is set
  ```
* 설정 내용 확인
  ```
  Command (m for help): p		// 설정된 내용 확인
  
  Disk /dev/sdb: 1073 MB, 1073741824 bytes, 2097152 sectors
  Units = sectors of 1 * 512 = 512 bytes
  Sector size (logical/physical): 512 bytes / 512 bytes
  I/O size (minimum/optimal): 512 bytes / 512 bytes
  Disk label type: dos
  Disk identifier: 0x25a3b1cc
  
     Device Boot      Start         End      Blocks   Id  System
  /dev/sdb1            2048     2097151     1047552   83  Linux
  ```
* 설정 저장
  ```
  Command (m for help): w		// 설정 저장
  The partition table has been altered!
  
  Calling ioctl() to re-read partition table.
  Syncing disks.
  [root@server ~]# 
  ```
* 포맷 하기
	*	 파일 시스템을 생성하는데, ext4 나 xfs가 권장된다.
  ```
  [root@server ~]# mkfs.ext4 /dev/sdb1		// mkfs.{파일시스템} {파티션장치경로}
  
  mke2fs 1.42.9 (28-Dec-2013)
  Filesystem label=
  OS type: Linux
  Block size=4096 (log=2)
  Fragment size=4096 (log=2)
  Stride=0 blocks, Stripe width=0 blocks
  65536 inodes, 261888 blocks
  13094 blocks (5.00%) reserved for the super user
  First data block=0
  Maximum filesystem blocks=268435456
  8 block groups
  32768 blocks per group, 32768 fragments per group
  8192 inodes per group
  Superblock backups stored on blocks: 
  	32768, 98304, 163840, 229376
  
  Allocating group tables: done                            
  Writing inode tables: done                            
  Creating journal (4096 blocks): done
  Writing superblocks and filesystem accounting information: done
  
  ```
* 디렉터리 생성하고 마운트
	* 디렉터리 안에 미리 생성한 파일이 있다면 마운트하고 나면 보이지 않는다. 	
  ```
  [root@server ~]# mkdir /mydata
  [root@server ~]# mount /dev/sdb1 /mydata
  ```
* 마운트 해제
	* 이전에 생성했던 파일이 나타난다.
  * 부팅시 마운트가 **해제**되어 다시 연결해줘야 한다.
  ```
  [root@server ~]# umount /dev/sdb1
  ```


* 상시 연결 설정 / `vi`세팅

  ```
  [root@server ~]# vi /etc/fstab
  ```

  ```
        1 
        2 #
        3 # /etc/fstab
        4 # Created by anaconda on Thu Sep 10 14:47:02 2020
        5 #
        6 # Accessible filesystems, by reference, are maintained under '/dev/disk'
        7 # See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info
        8 #
        9 UUID=e98e4e4b-d3e8-49c9-9378-a150d6c6482d /     xfs     defaults        0 0
       10 UUID=fa8580b2-fcbb-4767-b77e-2401459ce99f swap  swap    defaults        0 0
       11 
       12 /dev/sdb1 /mydata ext4 defaults 0 0		// 이부분 추가
  ```

* `df` 명령어로 확인

  ```
  [root@server ~]# df
  
  Filesystem     1K-blocks    Used Available Use% Mounted on
  devtmpfs         1914932       0   1914932   0% /dev
  tmpfs            1930652       0   1930652   0% /dev/shm
  tmpfs            1930652   12772   1917880   1% /run
  tmpfs            1930652       0   1930652   0% /sys/fs/cgroup
  /dev/sda2       37729284 5256900  32472384  14% /
  tmpfs             386132      16    386116   1% /run/user/0
  /dev/sr0         4669162 4669162         0 100% /run/media/root/CentOS 7 x86_64
  /dev/sdb1        1014680    2564    943356   1% /mydata
  ```

  