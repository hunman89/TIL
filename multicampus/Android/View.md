## 화면 꾸미기

> 컨테이너 위에 위젯(뷰) 배치



#### 레이아웃

>다양한 환경에서도 같은 배치를 보여 주게 하는 틀

* 리니어: 화면을 분할, 한쪽방향으로 차례대로 뷰를 추가하며 화면 구성

* constraint : 연결점을 통해 조절 
* 프레임 : 여러개의 뷰를 중첩한 후 전환하며 보여줌
* 테이블 : 격자모델, html방식과 유사



#### 크기

* wrap_content : 내용물의 크기에 자동 맞춤

* match_ parent : 뷰를 담고있는 뷰그룹의 여유공간을 꽉 채움

* 숫자로 지정



#### 크기 단위

| 단위    | 설명                                                         |
| ------- | ------------------------------------------------------------ |
| px      | 화면 픽셀의 수                                               |
| dp, dip | 160dpi 기준으로 한 픽셀( 해상도가 달라져도 비슷하게 보이게 한다.) |
| sp, sip | 글꼴을 기준으로 한 픽셀 : dp 와 비슷하지만 글자에는 sp 사용  |



#### 마진

> 상하좌우를 얼마나 띄울 지 

