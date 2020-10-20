## Apps

#### Application

> 프로젝트를 이루는 폴더?  같은 것들

* function 의 집합

  * ex) room application : 생성,수정,삭제
  * 리뷰는 room app에 추가되여야 할까??
  * 연관있다고 같은 폴더에 넣을 필요가 없다
  * 한 문장으로 표현할 수 있게 그룹화 하자!
  * divide and conquer

* config 에서 조합!

* 생성

  ```shell
  $ django-admin startapp rooms
  $ rm -rf rooms			# 삭제
  ```

  * 앱 이름은 복수로 하자!!
  * 기존에 존재하는 앱과 중복 안되게 조심!

* apps 아래의 파일명을 변경하면 안된다!

  * framework기 때문.
  * url.py는 각각의 app에 생성하여 관리하기 쉽게 한다.

* 파일의 간단한 기능들 

  * admin.py : admin
  * models.py : data
  * views : html 렌더링