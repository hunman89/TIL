## 안드로이드

> 구글에서 만든 스마트폰 운영체제



1. 오픈소스
2. 자바 기반
3. 쉬운 앱 연동
4. 다양한 기능을 지원하는 플랫폼 ( 리눅스 기반 )
5. 런타임 프로그램(ART)의 뛰어난 성능



* 네이티브 앱으로 서비스 하기 힘들다 -> 안드로이드 버전 문제
* 웹으로 넘어가는 추세?



## 안드로이드 세팅





#### 휴대폰

1. 휴대폰 개발자 옵션 활성화

   * 휴대전화 정보 -> 소프트웨어 정보 -> 빌드번호 여러번 클릭 -> 개발자 옵션 활성화
2. OEM 잠금 해제
   * 영구 잠금 해제
3. USB 디버깅 실행

   * 안드로이드 스튜디오를 통해 휴대폰 디버깅 가능



#### pc

* USB 드라이버 설치

  * 사용할 휴대폰에 맞는 드라이버

* 안드로이드 스튜디오 설치

  * 폴더 변경(필요시)
  * ui 설정하고 완료

* 세팅

  * configure -> SDK manager -> SDK 플랫폼에서 맞는 버전 설치

    * show package detail 을 통해 상세 설치 가능

    * 안드로이드 플랫폼 : 버전별로 만들어진 실행 환경
  * SDK tool에서 필요한 라이브러리 설치
  
  * configure -> avd manager 에서 가상의 장치를 만들어본다.



#### 실행

* start a new Android
* Empty activity
* 경로와 이름 지정
* language : java
* Geadle build finished 가 아래에 나오면 완료





## 안드로이드 프로젝트 구조



#### Gradle ?

> mavern과 같이 라이브러리 관리하는 것



#### AndroidManifest.xml ?

> 전체 앱의 **환경 설정** 파일

```xml
<activity android:name=".MainActivity">				# 이름은 달라도 된다.
```



#### MainActivity.java ?

> 실제 실행되어지는 **코드**

```java
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
```



#### activity_main.xml

> 보여지는 **화면** 관리



#### R.java

> 모든 자원 관리 ( 손댈 일이 적다. )