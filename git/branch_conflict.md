### 상황 1. fast-foward

> fast-foward는 feature 브랜치 생성된 이후 master 브랜치에 변경 사항이 없는 상황

1. feature/test branch 생성 및 이동

   ```bash
   $ git checkout -b feature/test
   ```

2. 작업 완료 후 commit

   ```bash
   $ touch test.html
   $ git add .
   $ git commit -m 'Complete test'
   ```


3. master 이동

   ```bash
   $ git checkout master
   ```


4. master에 병합

   ```bash
   $ git merge feature/test
   
   Updating 02300fe..8e99f35
   # Fast-forward!!!!
   Fast-forward
    test.html | 0
    1 file changed, 0 insertions(+), 0 deletions(-)
    create mode 100644 test.html
   ```


5. 결과 -> fast-foward (단순히 HEAD를 이동)

   ```bash
   $ git log --oneline
   
   8e99f35 (HEAD -> master, feature/test) Complete test
   02300fe (test2) Complete Test2
   b4bf210 init
   ```

6. branch 삭제

   ```bash
   $ git branch -d feature/test
   ```

---

### 상황 2. merge commit

> 서로 다른 이력(commit)을 병합(merge)하는 과정에서 다른 파일이 수정되어 있는 상황
>
> git이 auto merging을 진행하고, commit이 발생된다.

1. feature/signout branch 생성 및 이동

   ```bash
   $ git checkout -b feature/signout
   ```

2. 작업 완료 후 commit

   ```bash
   $ touch signout.html
   $ git add .
   $ git commit -m 'Complete signout'
   ```

3. master 이동

   ```bash
   $ git checkout master
   ```

4. *master에 추가 commit 이 발생시키기!!*

   * **다른 파일을 수정 혹은 생성하세요!**

     ```bash
     $ touch hotfix.html 
     $ git add .
     $ git commit -m 'Hotfix'
     ```

5. master에 병합

   ```bash
   $ git merge feature/signout
   ```

6. 결과 -> 자동으로 *merge commit 발생*

   * vim 편집기 화면이 나타납니다.

   * 자동으로 작성된 커밋 메시지를 확인하고, `esc`를 누른 후 `:wq`를 입력하여 저장 및 종료를 합니다.
      * `w` : write
      
      * `q` : quit
      
        ```bash
        Merge made by the 'recursive' strategy.
         signout.html | 0
         1 file changed, 0 insertions(+), 0 deletions(-)
         create mode 100644 signout.html
        ```
      
   * 커밋  확인 해봅시다.

      ```bash
      0ca9b3f (HEAD -> master) Merge branch 'feature/signout' into master
      5ee6127 Hotfix
      822727f (feature/signout) Complete signout
      8e99f35 Complete test
      02300fe Complete Test2
      b4bf210 init
      ```

7. 그래프 확인하기

   ```bash
   *   0ca9b3f (HEAD -> master) Merge branch 'feature/signout' into master
   |\
   | * 822727f (feature/signout) Complete signout
   * | 5ee6127 Hotfix
   |/
   * 8e99f35 Complete test
   * 02300fe Complete Test2
   * b4bf210 init
   ```

8. branch 삭제

   ```bash
   $ git branch -d feature/signout
   ```

---

### 상황 3. merge commit 충돌

> 서로 다른 이력(commit)을 병합(merge)하는 과정에서 동일 파일이 수정되어 있는 상황
>
> git이 auto merging을 하지 못하고, 해당 파일의 위치에 라벨링을 해준다.
>
> 원하는 형태의 코드로 직접 수정을 하고 merge commit을 발생 시켜야 한다.

1. feature/board branch 생성 및 이동

   ```bash
   $ git checkout -b feature/board
   ```

2. 작업 완료 후 commit

   ````bash
   $ touch board.html
   # README.md 파일을 열어 자유롭게 수정
   $ git add.
   $ git commit -m 'board & README'
   ````


3. master 이동

   ```bash
   $ git checkout master
   ```


4. *master에 추가 commit 이 발생시키기!!*

   * **동일 파일을 수정 혹은 생성하세요!**

   ```bash
   #README를 수정하고
   $ git add .
   $ git commit -m 'Update README'
   ```

5. master에 병합

   ```	bash
   $ git merge feature/board
   ```


6. 결과 -> *merge conflict발생*

   ```bash
   Auto-merging README.md
   CONFLICT (content): Merge conflict in README.md
   Automatic merge failed; fix conflicts and then commit the result.
   
   $ git status
   
   On branch master
   You have unmerged paths.
     (fix conflicts and run "git commit")
     (use "git merge --abort" to abort the merge)	# 병합취소
   
   Changes to be committed:			#staging area -> 충돌나지 않은 파일
           new file:   board.html
   
   Unmerged paths:
     (use "git add <file>..." to mark resolution)	# 충돌난 파일 , 해결하고 add
           both modified:   README.md
   ```


7. 충돌 확인 및 해결

   * vsCode 같은걸 통해 해결
   
   ```bash
   $ git add .
   ```


8. merge commit 진행

    ```bash
    $ git commit
    ```

   * vim 편집기 화면이 나타납니다.
   
   * 자동으로 작성된 커밋 메시지를 확인하고, `esc`를 누른 후 `:wq`를 입력하여 저장 및 종료를 합니다.
      * `w` : write
      * `q` : quit
      
   * 커밋이  확인 해봅시다.
   
9. 그래프 확인

   ```bash
   $ git log --oneline --graph
   
   *   4512e00 (HEAD -> master) Merge branch 'feature/board' into master
   |\
   | * d02fe94 (feature/board) board & README
   * | a7e96c9 Update README
   |/
   *   0ca9b3f Merge branch 'feature/signout' into master
   |\
   | * 822727f Complete signout
   * | 5ee6127 Hotfix
   |/
   * 8e99f35 Complete test
   * 02300fe Complete Test2
   * b4bf210 init
   ```


10. branch 삭제

    ```bash
    $ git branch -d feature/board
    ```
