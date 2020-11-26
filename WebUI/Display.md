## 속성-Display

#### display 속성

요소의 렌더링 박스 유형을 결정하는 속성

| **none**         | 요소가 렌더링 되지 않음                                      |
| ---------------- | ------------------------------------------------------------ |
| **inline**       | inline level 요소처럼 렌더링                                 |
| **block**        | block level 요소처럼 렌더링                                  |
| **inline-block** | inline level 요소처럼 렌더링(배치)되지만 block level의 성질을 가짐 |

*list-item, flex, inline-flex, table, table-cell 등 다양한 속성 값 존재*

**display와 box model의 관계**

| **display**      | **width** | **height** | **margin** | **padding** | **border** |
| ---------------- | --------- | ---------- | ---------- | ----------- | ---------- |
| **block**        | ㅇ        | ㅇ         | ㅇ         | ㅇ          | ㅇ         |
| **inline**       | X         | X          | 좌/우      | 좌/우       | 좌/우      |
| **inline-block** | ㅇ        | ㅇ         | ㅇ         | ㅇ          | ㅇ         |

*inline의 상/하 padding 과 border는 의도한대로 적용이 안되기 때문에 사용 비추*



#### visibility

기본 값 : visible

| **visible**  | 화면에 표시                                                  |
| ------------ | ------------------------------------------------------------ |
| **hidden**   | 화면에 표시되지 않음(공간은 차지함)                          |
| **collapse** | 셀 간의 경계를 무시하고 숨김(테이블 관련 요소에만 적용 가능) |

- display: none: 요소가 렌더링 되지 않음(DOM에 존재하지 않음)
- visibility: hidden: 요소가 보이지는 않지만 렌더링 되며 화면에 공간을 가지고 있음(DOM에 존재함)



#### float

 float(요소를 보통의 흐름에서 벗어나게 함) 시킬지 지정하는 속성

| **none**  | float 시키지 않음(기본값) |
| --------- | ------------------------- |
| **left**  | 좌측으로 float 시킴       |
| **right** | 우측으로 float 시킴       |

- 요소를 보통의 흐름에서 벗어나 띄어지게 함
- 주변 텍스트나 인라인 요소가 주위를 감싸는 특징이 있음
- 대부분 요소의 display 값을 block으로 변경함 (display 값 변경 예외: inline-table, flex 등)



#### clear

floating 된 요소의 영향에서 벗어나게 하는 속성

| **none**  | 양쪽으로 floating 요소를 허용(기본값)    |
| --------- | ---------------------------------------- |
| **left**  | 왼쪽으로 floating 요소를 허용하지 않음   |
| **right** | 오른쪽으로 floating 요소를 허용하지 않음 |
| **both**  | 양쪽으로 floating 요소를 허용하지 않음   |



#### position

요소의 위치를 정하는 방법 지정

| **static**   | Normal-flow 에 따라 배치되며 offset 값이 적용되지 않는다. (기본값) |
| ------------ | ------------------------------------------------------------ |
| **absolute** | 부모 요소의 위치를 기준으로 offset 에 따라 배치. 부모가 position 값(static 제외)을 가지면 offset 값의 시작점. 부모자 static이면 조상을 찾아감. 정상 흐름에서 벗어남. |
| **fixed**    | 뷰포트(브라우저의 창)를 기준으로 offset 에 따라 배치, 부모의 위치에 영향 없음 |
| **relative** | 자신이 원래 있어야 할 위치를 기준으로 offset 에 따라 배치, Normal -flow의 흐름에 따름.주변 요소에 영향을 주지 않으면서 offset 값으로 이동. |

*sticky : 스크롤해서 올리면 화면 상단에 붙는 속성 ( 아직 완벽 지원이 안됨)*

**offset(top/left/bottom/right)**

```css
top|bottom|left|right: auto|length|initial|inherit;
```

- offset의 %단위 사용: offset은 top, bottom (상하) 는 기준이 되는 요소의 height 값 left, right (좌우) 는 width값에 대하여 계산



#### z-index

box가 겹치는 순서

| **auto**   | 쌓임 순서를 부모와 동일하게 설정(기본값) |
| ---------- | ---------------------------------------- |
| **number** | 해당 수치로 쌓임 순서를 설정(음수 허용)  |

- **position 값이 static이 아닌 경우 지정가능**
- 순서 값이 없을 경우 생성순서(코드상 순서)에 따라 쌓임
- 부모가 z-index 값이 있을 경우 부모 안에서만 의미있음
- 큰 값이 가장 위쪽(음수 사용 가능)



#### 유효성검사

[https://validator.w3.org](https://validator.w3.org/)

유효성 검사를 통해 마크업 문법상 에러가 없는지 표준에 맞게 작성되었는지 알 수 있고,

사용성과 접근성, SEO 최적화 개선에도 도움된다.