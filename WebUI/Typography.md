## 속성 -typography

#### 구조

* em 폰트의 전체 높이를 의미
* ex ( = x-height ) 해당 폰트의 영문 소문자 x의 높이를 의미
* Baseline 소문자 x를 기준으로 하단의 라인을 의미
* Descender 소문자에서 baseline 아래로 쳐지는 영역을 의미 ( g, j, p, q, y ) 서체마다 다름
* Ascender 소문자 x의 상단 라인 위로 넘어가는 영역을 의미( b, d, h, l )



#### font-family 속성

글꼴을 지정하는 속성

```css
font-family: family-name | generic-family ( | initial | inherit );
```

**generic-family:** family-name으로 지정된 글꼴을 사용할 수 없을 경우를 대비해, 브라우저가 대체할 수 있는 폰트

```css
font-family: Helvetica, Dotum, '돋움', Apple SD Gothic Neo, sans-serif; 
```

한글을 지원하지 않는 디바이스일 경우 해당 한글 폰트를 불러올 수 없으므로 영문명으로도 선언

마지막에는 반드시 generic-family를 선언(재 선언) 해야 함, 선언된 모든 서체를 사용할 수 있다는 보장이 없기 때문



#### 행간

**line-height**라는 텍스트 라인의 높이 속성을 이용해서 조절 = 서채와 브라우저의 상태를 계산 해 주어야 한다.

| **normal** | 기본값으로 브라우저의 기본 속성을 따릅니다.폰트에 따라 브라우저에 따라 다르지만 보통 1.2 정도로 할당 |
| ---------- | ------------------------------------------------------------ |
| **number** | font-size를 기준으로 설정한 숫자만큼 배율로 적용             |
| **length** | px, em 등 고정 수치로 할당                                   |
| **%**      | font-size를 기준으로 설정한 퍼센트만큼 배율로 적용           |

- **number** 부모 요소의 숫자 값이 그대로 상속. 즉, 자식 요소에서도 또 한 번 자식 요소의 font-size를 기준으로 계산된 값을 가지게됨.
- **%** 부모 요소에서 %값이 그대로 상속되는 것이 아니고, %에 의해 이미 계산된 px값이 상속됨.



#### 크기

```css
font-size: keyword | length | initial | inherit ;
```

- **absolute size (keyword)** 기본 값인 medium에 대한 상대적인 크기로, 브라우저마다 사이즈가 다르게 정의되어있음
- **relative size (keyword)** 부모 요소의 font-size 크기에 대해 상대적. smaller는 0.8배, larger는 1.2배
- **length** px, em, rem 등의 단위를 이용하여 고정된 크기를 지정. 
  - em : 부모 요소의 font-size에 em 값을 곱한 크기 
  - rem : 루트의 font-size에 rem 값을 곱한 크기
- **percent (%)** 부모 요소의 font-size를 기준으로 백분율 계산된 값을 지정할 수 있음
- **viewport units** vw, vh 단위로 뷰포트를 기준으로 하여, 유동적인 font-size를 지정할 수 있음. vw는 뷰포트 width의 1%, vh는 뷰포트 height의 1% 값



#### 굵기

```css
font-weight: normal | bold | bolder | lighter | number | initial | inherit ;
```

| **normal**  | 기본 값 (400)                                                |
| ----------- | ------------------------------------------------------------ |
| **bold**    | 굵게 표현(700)                                               |
| **bolder**  | 부모 요소 보다 두껍게 표현                                   |
| **lighter** | 부모 요소 보다 얇게 표현                                     |
| **number**  | 100, 200, 300, 400, 500, 600, 700, 800, 900 (클수록 더 두껍게 표현) |

*기본적으로 400은 normal과 같고, 700은 bold와 동일*

*normal과 bold만 지원하는 폰트일 경우에는 100~500까지는 normal로, 600~900까지는 bold로 표현*



#### 스타일

```css
font-style: normal | italic | oblique | initial | inherit;
```

| **normal**  | font-family 내에 분류된 기본 값 |
| ----------- | ------------------------------- |
| **italic**  | italic 스타일로 표현합니다.     |
| **oblique** | oblique 스타일로 표현합니다.    |

 *oblique : 텍스트의 기울기에 대한 각도를 추가로 지정 가능*



#### 형태

```css
font-variant: normal | small-caps | initial | inherit ;
```

| **normal**     | 기본 값                            |
| -------------- | ---------------------------------- |
| **small-caps** | 소문자를 작은 대문자로 변형합니다. |



#### 축약형

```css
font: font-style font-variant font-weight font-size/line-height font-family | initial | inherit;
```

- font-size와 font-family는 반드시 선언해야 하는 필수 속성
- 빠진 속성이 있다면 기본 값으로 지정
- 각 속성의 선언 순서를 지켜야 함!



#### 웹 폰트

웹에 있는 글꼴을 사용자의 로컬 환경(컴퓨터)으로 다운로드하여 적용하는 속성

```css
@font-face { 
    font-properties 
}
```

| **font-family(필수)** | 글꼴의 이름을 지정                   |
| --------------------- | ------------------------------------ |
| **src(필수)**         | 다운로드 받을 글꼴의 경로(URL)       |
| **font-style(옵션)**  | 글꼴의 스타일 지정, 기본 값은 normal |
| **font-weight(옵션)** | 글꼴의 굵기 지정, 기본 값은 normal   |

```css
@font-face {
    font-family: webNanumGothic; 	/* 사용자 지정 웹 폰트명 */
    src: url(NanumGothic.eot); 		/* 적용 될 웹 폰트의 경로 */
    font-weight: bold; 				/* 필요에 따라 지정 */
    font-style: italic; 			/* 필요에 따라 지정 */
}

body {
    font-family: webNanumGothic;
}
```



#### vertical-align

요소의 수직 정렬을 지정하는 속성 (인라인에만 적용)

```css
vertical-align: keyword | length | percent | initial | inherit ;
```

| **length**  | 요소를 지정한 길이만큼 올리거나 내림. 음수 허용              |
| ----------- | ------------------------------------------------------------ |
| **%**       | 요소를 line-height를 기준으로 올리거나 내림. 음수 허용       |
| **keyword** | baseline(기본 값), sub, super, top, text-top, middle, bottom, text-bottom |

*vertical-align은 기본 값이 소문자 x를 기준으로 하단 라인을 의미*

* sub : 부모 아래 첨자 기준으로 정렬
* super : 부모 위 첨자 기준으로 정렬
* text-top : 부모 텍스트의 맨 위(Ascender 제외)
* text-bottom : 부모의 텍스트의 맨 아래(Descender 제외)
* middle : 부모의 중앙에 위치
* top : 부모의 맨 위 위치
* bottom : 부모의 맨 아래 위치



#### text-align

텍스트의 가로 정렬을 지정하는 속성 (인라인)

기본 값 : left (Right to Left 언어일 경우는 right)

```css
text-align: left | right | center | justify | initial | inherit ;
```

| **left**    | 텍스트를 왼쪽으로 정렬                                       |
| ----------- | ------------------------------------------------------------ |
| **right**   | 텍스트를 오른쪽으로 정렬                                     |
| **center**  | 텍스트를 중앙으로 정렬                                       |
| **justify** | 텍스트를 라인 양쪽 끝으로 붙여서 정렬. (마지막 라인은 정렬 하지 않음) |

- **가운데 정렬** = 인라인 요소 : text-align (center) 블럭 요소 : margin (auto) 



#### text-intent

텍스트의 들여쓰기를 지정하는 속성

```css
text-indent: length | initial | inherit;
```

| **length** | px, em 등 고정 수치로 지정. 음수 허용      |
| ---------- | ------------------------------------------ |
| **%**      | 부모 요소의 width를 기준으로 퍼센트로 지정 |



#### text-decoration

장식을 지정

```css
text-decoration: text-decoration-line text-decoration-color text-decoration-style | initial | inherit;
```

- **text-decoration-line** : 텍스트 꾸밈의 종류를 지정하는 속성입니다.   

  기본 값 : none 

| **none**         | 텍스트 꾸밈을 생성하지 않음 ( 기본값 ) |
| ---------------- | -------------------------------------- |
| **underline**    | 밑줄로 꾸밈을 설정                     |
| **overline**     | 윗줄로 꾸밈을 설정                     |
| **line-through** | 중간을 지나는 줄로 꾸밈을 설정         |

- **text-decoration-color** : 텍스트 꾸밈의 색상을 지정하는 속성입니다.   

  기본 값 : currentColor

- **text-decoration-style** : 꾸밈에 사용되는 선의 스타일을 지정하는 속성입니다.   

  기본 값 : solid 

| **solid**  | 한줄 스타일 ( 기본 값 ) |
| ---------- | ----------------------- |
| **double** | 이중선 스타일           |
| **dotted** | 점선 스타일             |
| **dashed** | 파선 스타일             |
| **wavy**   | 물결 스타일             |



#### 단어 관련 속성

**white-space 속성 **: 요소 안에 공백처리

  기본 값 : normal

| **normal**   | 공백과 개행을 무시하고, 필요한 경우에 자동 줄바꿈 발생. 기본 값 |
| ------------ | ------------------------------------------------------------ |
| **nowrap**   | 공백과 개행을 무시하고, 자동 줄바꿈이 일어나지 않음.         |
| **pre**      | 공백과 개행을 표현하고, 자동 줄바꿈이 일어나지 않음.         |
| **pre-line** | 공백은 무시하고, 개행만 표현. 필요한 경우에 자동 줄바꿈 발생. |
| **pre-wrap** | 개행은 무시하고, 공백만 표현. 필요한 경우 자동 줄바꿈 발생.  |

 

**letter-spacing 속성** : 자간을 지정하는 속성

  기본 값 : normal

| **normal** | 기본 값                         |
| ---------- | ------------------------------- |
| **length** | 길이만큼 자간을 지정. 음수 허용 |

 

**word-spacing 속성** : 단어 사이의 간격을 지정하는 속성

  기본 값 : normal

| **normal** | 기본 값                                     |
| ---------- | ------------------------------------------- |
| **length** | 길이만큼 단어 사이의 간격을 지정. 음수 허용 |

 

**word-break 속성** : 중단점 지정

  기본 값 : normal

| **normal**    | 기본 값. 중단점은 공백이나 하이픈(-)(CJK는 음절)     |
| ------------- | ---------------------------------------------------- |
| **break-all** | 중단점은 음절. 모든 글자가 요소를 벗어나지 않고 개행 |
| **keep-all**  | 중단점은 공백이나 하이픈(-)(CJK는 그 외 기호도 포함) |

 

**word-wrap 속성** : 요소를 벗어난 단어의 줄바꿈을 지정하

 기본 값 : normal

| **normal**     | 기본 값. 중단점에서 개행                     |
| -------------- | -------------------------------------------- |
| **break-word** | 모든 글자가 요소를 벗어나지 않고 강제로 개행 |



