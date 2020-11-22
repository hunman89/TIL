## CSS 속성

> 자주 바뀌기 때문에 검색 생활화

#### 검색하기

https://www.w3schools.com/

https://developer.mozilla.org/en-US/

W3C의 스펙문서

* 정의 : 기본값, 상속여부, 애니메이션 가능 여부, 사용가능한 CSS 버전
* 문법
* 속성값 : 해당 속성이 적용할 수 있는 값의 형태나 키워드 파악
* 지원 범위
* 예제
* 참고사항



#### 단위

절대길이

- **px** ( 1px = 1/96th of 1 inch )

  절대 길이이므로 다른 요소의 영향을 받지 않아 화면에서 고정된 크기를 가지지만, 장치의 해상도에 따라 상대적

- **pt** ( 1pt - 1/72 of 1 inch )

  컴퓨터가 없던 시절부터 있던 단위, 사용하는 기기의 해상도에 따라 차이가 있어 W3C에서도 pt는 웹개발 시 권장하는 단위가 아님

상대길이

- **%**

​    부모의 값에 대해서 백분율로 환산한 크기

- **em**

​    font-size를 기준으로 값을 환산, 소수점 3자리까지

- **rem**

​    root의 font-size를 기준으로 값을 환산

- **vw**

​    viewport의 width값을 기준으로 1%의 값으로 계산



#### 색상 (color 속성)

```html
<h1 style="color: red"> heading </h1>
<h1 style="color: #ff0000"> heading </h1>
<h1 style="color: #f00"> heading </h1>
<h1 style="color: rgb(255,0,0)"> heading </h1>    
<h1 style="color: rgba(255,0,0, 0.5)"> heading </h1>
```

- **컬러 키워드** 

  CSS 자체에서 사용 가능한 문자 식별자

  * transparent는 투명을 나타내는 키워드

- **16** **진법**  ex. **#RRGGBB**

  6자리의 16진수(0-9, A-F)는 각각 두 자리씩 세 가지 색상
  적색(RR), 녹색(GG), 청색(BB)
  각 자리의 알파벳은 대소문자를 구분하지 않음

- **16** **진법**  ex. **#RGB**

  6자리의 16진수에서 각각의 두 자리가 같은 값을 가지면 3자리로 축약

- **RGB( )**

  RGB 값은 rgb(R, G, B)의 형태로 각 변수 값(R 적색, G 녹색, B 청색)의 강도를 정의
  0~255의 정수로 된 값, 0 → 255는 검정 → 흰색으로 값의 변화를 나타냄

- **RGBA( )**

  RGBA 값은 기존 RGB에서 A값이 추가된 형태 (필수 지정)
  A 값은 0 ~ 1 사이의 값을 지정할 수 있으며, 0.5와 같이 소수점으로 표기
  0 → 1은 투명 → 불투명으로 값의 변화를 나타냄



#### 배경 속성

요소의 배경을 컬러나 이미지로 지정

- **background-color**  

  기본 값 : transparent

- **background-image**

  기본 값 : none
  배경으로 사용할 이미지의 경로를 지정하는 속성

```css
background-image: url(https://www.w3schools.com/CSSref/img_tree.gif);
```

- **background- repeat**

  기본 값 : repeat 

| **repeat**    | x, y축 으로 모두 반복  |
| ------------- | ---------------------- |
| **repeat-x**  | x 축 방향으로만 반복   |
| **repeat-y**  | y 축 방향으로만 반복   |
| **no-repeat** | 이미지를 반복하지 않음 |


- **background-position** 

  기본 값 : 0% 

  0% 요소에서 배경 이미지의 위치를 지정하는 속성( x축, y축으로부터의 위치) 

| **%**      | 기준으로부터 % 만큼 떨어진 지점과 이미지의 % 지점이 일치하는 곳에 위치 |
| ---------- | ------------------------------------------------------------ |
| **px**     | 기준으로부터 px 만큼 떨어진 지점과 이미지의 (0,0) 지점이 일치하는 곳에 위치 |
| **키워드** | top, left, right, bottom, center. 키워드는 선언 순서와 관계없이 top, bottom은 y축 기준으로 하며 left, right는 x축을 기준 |


- **background-attachment** 

  scroll 화면 스크롤에 따른 배경 이미지의 움직임 여부

| **scroll** | 배경 이미지는 요소 자체를 기준으로 고정되어 있으며 내용과 함께 스크롤 되지 않습니다. |
| ---------- | ------------------------------------------------------------ |
| **local**  | 배경 이미지는 요소의 내용을 기준으로 고정되어 있으며 내용과 함께 스크롤 |
| **fixed**  | 배경 이미지는 뷰포트를 기준으로 고정되어 있으며 스크롤에 영향을 받지 않음 |

​		뷰포트 : 사용자가 시각적으로 볼 수 있는 웹페이지 영역,컴퓨터나 휴대폰과 같은 장치에Display 요소가 표현되는 영역 


- **background** **축약**

```css
background: [-color] [-image] [-repeat] [-attachment] [-position];
```



#### 박스모델

문서를 배치할 때 브라우저의 렌더링 엔진은 표준 CSS 기본 박스 모델에 따라 각 요소를 나타냄

* **Content** **영역**

  요소의 실제 내용을 포함하는 영역, 내용의 너비 및 높이

- **Border** **영역**

  content 영역을 감싸는 테두리 선

- **Padding** **영역**

  content 영역과 테두리 사이의 여백
  content 영역이 배경, 색 또는 이미지가 있을 때 패딩 영역까지 영향

- **Margin** **영역**

  border 바깥쪽의 영역
  주변 요소와의 여백(간격)을 margin을 이용해 지정



#### border 관련 속성

* **border-width**

  기본 값 : medium 선의 굵기를 지정하는 속성

  border-top-width, border-bottom-width, border-right-width, border-left-width를 이용하여 상하좌우 선의 굵기를 다르게 표현가능

```css
border-width: [top] [right] [bottom] [left];
```

| **키워드** | thin, medium, thick                        |
| ---------- | ------------------------------------------ |
| **단위**   | px, em, rem ... ( % , 정수 단위 사용불가 ) |

* **border-style** 

  기본 값 : none

  선의 모양을 지정, 상하좌우 선의 모양을 다르게 표현가능

```css
border-style: [top] [right] [bottom] [left];
```

| **none**   | border를 표시 하지 않습니다.            |
| ---------- | --------------------------------------- |
| **solid**  | border를 실선 모양으로 나타냅니다.      |
| **double** | border를 이중 실선 모양으로 나타냅니다. |
| **dotted** | border를 점선 모양으로 나타냅니다.      |

*그 밖에도 dashed, double, groove, ridge, inset, outset 등.*

- **border- color** 

  기본 값 : currentColor

```css
border-color: [top] [right] [bottom] [left];
```

- **border** ***\*축약\****

```css
border: [-width] [-style] [-color];
```



#### padding 속성

| **length**  | 고정값으로 지정합니다. (ex. px, em ....)   |
| ----------- | ------------------------------------------ |
| **percent** | 요소의 width에 상대적인 크기를 지정합니다. |

```css
padding: [-top] [-right] [-bottom] [-left];
			0      10px     20px      30px   /* 상, 우, 하, 좌 다름 */
			0      10px     20px             /* 좌, 우 같음 */
			0      10px                      /* 상, 하 같음 & 좌, 우 같음 */
			0                                /* 상, 우, 하, 좌 모두 같음 */
```

상하, 좌우가 같으면 생략 가능

*참고 : CSS에서 0 값에 대해서는 단위를 따로 적지않음*



#### margin

padding과 비슷

- **margin auto**

  수평 중앙 정렬, 요소의 width가 존재해야 함

* **margin collapse(마진 병합)**

  인접한 두 개 이상의 **수직** 방향 박스의 마진이 하나로 합쳐지는 것

  1. 두 요소가 상하로 인접한 경우: 위 요소의 하단 마진과 아래 요소의 상단 마진의 병합
  2. 부모 요소와 첫 번째 자식 요소 또는 마지막 자식 요소
     1. 부모 요소의 상단 마진과 첫 번째 자식 요소의 상단 마진 병합
     2. 부모 요소의 하단 마진과 마지막 자식 요소의 하단 마진 병합
  3. 내용이 없는 빈 요소의 경우: 해당 요소의 상단 마진과 하단 마진의 병합



#### margin과 padding의 비교

|             | **+** | **-** | **auto** | **단위**  |
| ----------- | ----- | ----- | -------- | --------- |
| **margin**  | o     | o     | o        | px, % ... |
| **padding** | o     | x     | x        | px, % ... |

*%는 가로 기준*



#### width

요소의 가로 크기를 지정하는 width 속성은 인라인 레벨 요소를 제외한 모든 요소에 적용

