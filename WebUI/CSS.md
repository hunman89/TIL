## CSS

> Cascading Style Sheets
>
> HTML이 뼈라면 CSS는 옷과 같은 요소

#### 구문

```css
h1 { color: yellow; font-size:2em; }
```

- 선택자(selector) - "h1"
- 속성(property) - "color"
- 값(value) - "yellow"
- 선언(declaration) - "color: yellow", "font-size: 2em"
- 선언부(declaration block) - "{ color: yellow; font-size:2em; }"
- 규칙(rule set) - "h1 { color: yellow; font-size:2em; }"

#### 주석

```CSS
/* DSFADF */
```

#### 적용

**1. Inline**

Inline은 해당 요소에 직접 스타일 속성을 이용해서 규칙들을 선언하는 방법

```CSS
<div style="color:red;"> 내용 </div>
```

**2. Internal**

Internal은 문서에 `<style>`을 활용한 방법입니다.

```CSS
<style> div {color: red;} </style>
```

**3. External**

```CSS
<link rel="stylesheet" href="css/style.css">
```

CSS 파일은 'stylesheet' 라고 명시

**4. Import**

```css
@import url("css/style.css");
```

거의 안쓰인다





## 선택자

```CSS
h1, h2, h3, h4, h5, h6 { color: yellow; font-size: 2em; background-color: gray; }
```

선택자와 선언 모두 그룹화 가능



#### Class 선택자 (.class)

```html
<style>
	.foo { font-size: 30px; }
    .bar { color: blue; }
</style>

<p class="foo bar"> ... </p>
```

class 속성은 글로벌 속성이므로 어느 태그에서도 사용

공백으로 구분하여 여러 개의 class 값을 넣을 수 있음



#### Id 선택자 (#id)

```html
<style>
    #bar { background-color: yellow; }
</style>

<p id="bar"> ... </p>
```

1. .기호가 아닌 #기호 사용
2. 태그의 class 속성이 아닌 id 속성을 참조
3. __문서 내에 유일한 요소에 사용__
4. 구체성 



#### 선택자 조합

요소, 클래스, id 다 조합할 수 있다

```css
/* 요소와 class의 조합 */
p.bar { ... }

/* 다중 class */
.foo.bar { ... }

/* id와 class의 조합 */
#foo.bar { ... }
```



#### 속성 선택자

단순속성

* 대괄호를 이용해서 선언하며 대괄호 안에 속성 이름
* 속성의 값은 상관없다

```css
p[class] { color: silver; }
p[class][id] { text-decoration: underline; }
```

정확한 속성

```css
p[class="foo"] { color: silver; }
p[id="title"] { text-decoration: underline; }
```

부분속성

- [class~="bar"] : class 속성의 값이 공백으로 구분한 "bar" 단어가 포함되는 요소 선택
- [class^="bar"] : class 속성의 값이 "bar"로 시작하는 요소 선택
- [class$="bar"] : class 속성의 값이 "bar"로 끝나는 요소 선택
- [class*="bar"] : class 속성의 값이 "bar" 문자가 포함되는 요소 선택



#### 구조에 의한 선택자



## 구조?

#### 부모와 자식

부모 요소는 그 요소를 포함하는 가장 가까운 상위 요소, 하나뿐

자식 요소는 부모 요소와 반대라고 생각하면 되며 자식 요소는 여러 개일 수도 있음

#### 조상과 자손

조상 요소는 그 요소를 포함하는 모든 요소

자손 요소는 그 반대

#### 형제

같은부모



#### 구조에 의한 선택자

자손

* 자손 선택자는 선택자 사이에 아무 기호없이 그냥 공백으로 구분

```css
div span { color: red; }
```

자식

* 꺽쇠 기호(>)

```css
div > h1 { color: red; }
```

__인접__ 형제

* `+`

```css
div + p { color: red; }
```

조합

```css
body > div table + ul { ... }
```

* body 요소의 자식인 div 요소의 자손인 table 요소 바로 뒤에 인접한 ul 요소 선택
  

* 맨 오른쪽이 실제 선택!





## 가상클래스

> 미리 정의해놓은 상황에 적용되도록 약속된 보이지 않는 클래스

예를 들어, `<p>`에 마우스 커서를 올렸을 때만 특정 스타일을 주고 싶다고 한다면?

HTML과 CSS는 정적인 언어이기 때문에

CSS에서는 흔하게 사용되는 여러 패턴에 대해서 미리 정의해놓고, 가상 클래스로 제어

*  가상 클래스는 :(콜론) 기호

#### 문서 구조와 관련된 가상 클래스

:first-child : 첫 번째 자식 요소 선택

:last-child : 마지막 자식 요소 선택

#### 앵커 요소와 관련

:link : 하이퍼 링크이면서 아직 방문하지 않은 앵커

:visited : 이미 방문한 하이퍼링크를 의미

#### 사용자 동작

:focus: 현재 입력 초점을 가진 요소에 적용

:hover: 마우스 포인터가 있는 요소에 적용





## 가상 요소

> 미리 정의해 놓은 위치에 삽입이 되도록 약속

CSS3부터는 가상 클래스와 가상 요소를 구분하기 위해 가상 요소에는 ::(더블 콜론) 기호를 사용

하위 브라우저에서 상황에 따라 : 기호를 사용

:before : 가장 앞에 요소를 삽입

:after : 가장 뒤에 요소를 삽입

* contents 속성을 이용해 내용 삽입 가능

:first-line : 요소의 첫 번째 줄에 있는 텍스트

:first-letter : 블록 레벨 요소의 첫 번째 문자





## 구체성

> 요소를 선택하는 방법

구체성은 4개의 숫자 값, 좌측의 숫자가 높을수록 높은 구체성을 지님

-  0, 1, 0, 0 : 선택자에 있는 모든 id 속성값
-  0, 0, 1, 0 : 선택자에 있는 모든 class 속성값, 기타 속성, 가상 클래스
-  0, 0, 0, 1 : 선택자에 있는 모든 요소, 가상 요소
-  전체 선택자는 0, 0, 0, 0
-  조합자는 구체성에 영향을 주지 않음 (>, + 등)

```css
h1 { ... }  /* 0,0,0,1 */
body h1 { ... }  /* 0,0,0,2 */
.grape { ... }  /* 0,0,1,0 */
*.bright { ... }  /* 0,0,1,0 */
p.bright em.dark { ... }  /* 0,0,2,2 */
#page { ... }  /* 0,1,0,0 */
div#page { ... }  /* 0,1,0,1 */
```

#### 인라인 스타일

1.0.0.0 의 값

#### important

모든 구체성을 무시하고 우선권, 속성값 뒤 한 칸 공백을 주고 느낌표 기호

```css
p#page { color: red !important; }
```





## 상속

```css
h1 { color: gray; }
```

```html
<h1>Hello, <em>CSS</em></h1>
```

`<em>`은 부모인 `<h1>`의 color: gray를 상속

 margin, padding, background, border 등 박스 모델 속성들은 상속되지 않음

#### 구체성

상속되는 속성은 아무렁 구체성을 지니지 못한다.

__0.0.0.0보다 낮음__



## Cascading

> 모든 스타일 규칙들은 cascading의 단계적인 규칙에 따라 요소에 적용

1. 중요도(!important)와 출처
2. 구체성
3. 선언 순서

#### 우선순위

5. 사용자 에이전트 스타일 (브라우저 기본 제공)

4. 사용자 스타일 (옛날 브라우저 기능)

3. 제작자 스타일

2. 제작자 !important

1. 사용자 !important (옛날 브라우저 기능)

#### 규칙

모든 스타일은 아래의 규칙에 따라 단계적으로 적용

1. 중요도 선언

2. 1. 중요도가 명시적으로 선언된 규칙들은 그렇지 않은 규칙들보다 우선
   2. 중요도가 있는 규칙들끼리는 아래 다른 규칙들을 적용

3. 스타일 규칙들을 출처에 따라 분류

4. 1. 제작자 스타일 규칙이 사용자 에이전트 스타일 규칙보다 우선

5. 스타일 규칙들을 구체성에 따라 분류

6. 1. 구체성이 높은 규칙들이 우선

7. 스타일 규칙들을 선언 순서에 따라 분류

8. 1. 뒤에 선언된 규칙일수록 우선

