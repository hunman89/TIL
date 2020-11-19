## TAG

> 130개의 태그가 존재하지만 자주 사용하는 태그는 25개 정도 뿐이다.



#### 제목태그

h1~h6



#### 단락태그

`<p>`

끝나면 자동 개행이 되고, 내부에서 개행하고 싶을때는 `<br>` 이용



#### 텍스트표현태그

- `<b>` : bold 태그는 글자를 굵게 표현하는 태그

- `<i>` : italic 태그는 글자를 기울여서 표현하는 태그 

  ​	--> 의미가 있다. 다른 글자과 구분( 기술용어, 외국어, 인물의 생각 등)

- `<u>` : underline 태그는 글자의 밑줄을 표현하는 태그

- `<s>` : strike 태그는 글자의 중간선을 표현하는 태그

#### 시멘틱 마크업

평범하고 오래된 의미론적인 HTML, 기계(컴퓨터, 브라우저)가 잘 이해할 수 있도록 하는 것

```html
<b>굵은</b> vs <strong>중요한</strong>
<i>기울어진</i> vs <em>강조하는</em>
<u>밑줄친</u> vs <ins>새롭게 추가된</ins>
<s>중간선이 있는</s> vs <del>삭제된</del>
```

화면표현은 같지만, 뒤 태그는 컴퓨터가 의미를 해석해서 표현을 결정

`<i>`는 html 5부터 의미가 담김



#### 앵커

`<a>`

```html
<a href="http://www.naver.com/" target="_blank">네이버</a>
```

href : 목적지

target : 링크된 리소스를 어디에 표시할지 (_self, _blank, _parent, _top)

[기타속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)



#### 컨테이너

태그 자체에 아무 의미가 없으며, 단순히 요소들을 묶기 위해 사용되는 태그

div(division) 태그: 블록 레벨 태그

블록 레벨 요소는 기본적으로 한 줄을 생성해서 내용을 표현

span 태그: 인라인 레벨 태그



#### 리스트

ul(unordered list) 태그: 순서가 없는 리스트를 표현

ol(ordered list) 태그: 순서가 있는 리스트를 표현

* `<li>`를 사용해 각 항목을 나타내서 사용

dl(definition/description list) 태그: 용어와 그에 대한 정의를 표현

- `<dt>` : 용어를 나타내는 태그
- `<dd>` : 용어에 대한 정의 또는 설명을 나타내는 태그



#### 이미지

```html
<img src="./images/pizza.png" alt="피자">
```

src : 이미지의 경로

* ./ : 현재폴더
* ../ : 상위폴더
* foldername/~ : 하위폴더

alt : 이미지의 대체 텍스트

width/height 속성: 이미지의 가로/세로

* 속성이 없으면 이미지는 원본 크기대로 노출되며, 둘 중 하나만 선언하면 자동으로 비율에 맞게 변경

파일형식

- gif : 제한적인 색을 사용하고 용량이 적으며 투명 이미지와 애니메이션 이미지를 지원하는 형식
- jpg : 사진이나 일반적인 그림에 쓰이며 높은 압축률과 자연스러운 색상 표현을 지원하는 형식(투명을 지원하지 않는다.)
- png : 이미지 손실이 적으며 투명과 반투명을 모두 지원하는 형식



#### 테이블

표는 셀(내용이 들어가는 하나의 칸)로 이루어져 있고 행(가로 방향)을 row, 열(세로 방향)을 column이라 함

- `<table>` : 표를 나타내는 태그
- `<tr>` : 행을 나타내는 태그
- `<th>` : 제목 셀을 나타내는 태그
- `<td>` : 셀을 나타내는 태그

- `<caption>`: 표의 제목을 나타내는 태그
- `<thead>`: 제목 행을 그룹화하는 태그
- `<tfoot>`: 바닥 행을 그룹화하는 태그
- `<tbody>`: 본문 행을 그룹화하는 태그

* colaspan, rawspan : 셀 병합

- `<colgroup>` : 그룹을 지정해 css 속성 부여할 수 있다.
- `<col>` : 지정된 그룹
- scope 속성 : th(header) 속성의 사용자 경험을 높이기 위해 `col`, `row`를 지정
- headers 속성 : id 속성을 연결해 의미를 부여



#### Form

서버에 데이터를 전달하기 위한 요소이며 `<input>`은 대표적인 폼 요소

type="text"

* 단순한 텍스트를 입력, placeholder : 사용자가 입력하기 전 미리 화면에 노출하는 값

type="password"

* 입력할 때 값을 노출하지 않음

type="radio"

* 라디오 버튼

type="checkbox"

* 체크박스, 중복 선택이 가능

* name : 라디오버튼과 체크박스를 그룹화
* checked : 체크 되있게 하는 boolean 속성

type="file"

* 파일을 서버에 올릴 때 사용

input 버튼

- submit : form의 값을 전송하는 버튼
- reset : form의 값을 초기화하는 버튼
- image : 이미지를 삽입할 수 있는 버튼 (submit과 동작이 동일함)
- button : 아무 기능이 없는 버튼

select

* 선택 목록 상자

* `<select>`내부의 `<option>`으로 각 항목을 나타냄, selected : 선택

textarea

```html
<textarea rows="5" cols="30">
    ...
</textarea>
```

* 여러줄 가능 cols, rows

button

* input 타입의 submit, reset, button과 모두 같은 기능을 가진 버튼
* 내용을 안에 직접 넣을 수 있으므로 좀 더 자유로운 스타일 표현이 가능

label

```html
<label for="name">이름</label>: <input type="text" id="name"><br>
```

* form 요소의 이름과 form 요소를 명시적으로 연결시켜주기 위해 사용
* id 속성값과 `<label>`의 for 속성값을 같게

form

* form 요소들을 감싸는 태그로 데이터를 묶어서 실제 서버로 전송해주는 역할

- action: 데이터를 처리하기 위한 서버의 주소

- method: 데이터를 전송하는 방식을 지정 (get/post)

- get 방식은 데이터가 전송될 때 주소창에 파라미터 형태로 붙어 데이터가 노출되지만

  post 방식은 데이터가 전송될 때 데이터가 노출되지 않음

- `<fieldset>` : 여러 개의 폼 요소를 그룹화하여 구조적으로 만들기 위해 사용
- `<legend>` : 폼 요소의 제목으로 `<fieldset>` 내부에 작성

```html
<fieldset>
    <legend>기본 정보</legend>
    ... 폼 요소들 ...
</fieldset>
```

