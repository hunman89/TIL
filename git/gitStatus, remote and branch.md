## git status

 ```bash
  On branch master
  # 2) 
  Changes not staged for commit:
    (use "git add/rm <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
          deleted:    1.txt
          modified:   README.md
  # 1) untracked
  Untracked files:
    (use "git add <file>..." to include in what will be committed)
          new.txt
  
  no changes added to commit (use "git add" and/or "git commit -a")
 ```

  - working directory
    - untracked - 깃이 관리하지 않고 있는 파일
      - 파일 생성(new file) 등
    - tracked - 이전 커밋에 포함된 적 있는 파일
      - modified - modified / deleted
      - unmodified - 수정 X (status에 안 뜸)

## 충돌 상황

* 원격 저장소의 이력과 로컬 저장소의 이력이 다르다.

    ```bash
    $ git push origin master
    
    To https://github.com/hunman89/remote.git
     ! [rejected]        master -> master (fetch first) 							# 에러 발생!
    error: failed to push some refs to 'https://github.com/hunman89/remote.git' 	# 원격 저장소의 작업이 로컬에 없다.
    hint: Updates were rejected because the remote contains work that you do
    hint: not have locally. This is usually caused by another repository pushing	# 원격 저장소의 변경 사항을 먼저 통합하는것을 추천
    hint: to the same ref. You may want to first integrate the remote changes
    hint: (e.g., 'git pull ...') before pushing again.
    hint: See the 'Note about fast-forwards' in 'git push --help' for details.
    ```

     * 해결 방법
    	

    ```bash
    $ git pull origin master			# vim 창으로 커밋메시지를 작성하도록 한다. 자동으로 작성된 메시지를 확인 한 뒤,`:wq`로 저장하고 나간다.

    remote: Enumerating objects: 4, done.
    remote: Counting objects: 100% (4/4), done.
    remote: Compressing objects: 100% (2/2), done.
    remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
    Unpacking objects: 100% (3/3), 685 bytes | 97.00 KiB/s, done.
    From https://github.com/hunman89/remote
     * branch            master     -> FETCH_HEAD
       67bfee1..2e08cf4  master     -> origin/master
    Merge made by the 'recursive' strategy.
     remote.txt | 1 +
     1 file changed, 1 insertion(+)
     create mode 100644 remote.txt 
    ```
    * 로그를 확인한 뒤 push 한다.
	```bash
    $ git log --oneline
        	
    1150794 (HEAD -> master) Merge branch 'master' of https://github.com/hunman89/remote into master 		#Merge !!!!
    2c38692 Create local.txt
    2e08cf4 (origin/master) Create remote.txt
    67bfee1 first commit
    ```

## Branch

> 독립적인 작업공간과 흐름이다.

* 브랜치 생성

  ```bash
  $ git branch {branch.name}
  ```

* 브랜치 목록

  ```bash
  $ git branch
  ```

* 브랜치 이동

  ```bash
  $ git checkout test
  
  Switched to branch 'test'
  
  hunma@LAPTOP-ITFN3K1M MINGW64 ~/OneDrive/바탕 화면/branch (test)
  ```

* 브랜치 생성 및 이동

  ```bash
  $ git checkout -b test2
  
  Switched to a new branch 'test2'
  ```

* 브랜치 병합 

  ```
  $ git merge test2
  
  Updating b4bf210..02300fe
  Fast-forward
   test2.txt | 0
   1 file changed, 0 insertions(+), 0 deletions(-)
   create mode 100644 test2.txt
  ```

* 브랜치 삭제

  ```bash
  $git branch -d test2
  ```

* 상황에 대한 이해가 필요하다.

  [다음](branchConflict.md)

