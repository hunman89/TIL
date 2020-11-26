## Media Queries

> 각 미디어 매체에 따라 다른 스타일(css style)을 적용할 수 있게 만드는 것

미디어 매체는 모니터와 같은 스크린 매체, 프린트, 스크린 리더기와 같은 것들을 이야기 함

```css
@media mediaqueries { /* style rules  */ }
```



#### 미디어 타입

- all, braille, embossed, handheld, print, projection, screen, speech, tty, tv

우리가 알아야 할 타입은 **all, print, screen** 정도. screen이 거의 대부분.

 

#### 미디어 특성

- width, height, device-width, device-height, orientation, aspect-ratio, device-aspect-ratio, color, color-index, monochrome, resolution, scan, grid

미디어 특성 역시 우리가 알아야 할 특성은 **width와 orientation **정도.

width는 뷰포트의 너비, 즉 브라우저 창의 너비.

orientation은 미디어가 세로모드인지 가로모드인지를 구분.

미디어 쿼리에서는 이 구분을 width와 height 특성의 값을 비교해서 height가 width보다 같거나 크면 세로모드 반대인 경우에는 가로모드라고 해석. 세로모드에서는 portrait, 가로모드에서는 landscape 키워드와 매칭.



#### Syntax

```css
media_query_list
 : S* [media_query [ ',' S* media_query ]* ]?
 ;
media_query
 : [ONLY | NOT]? S* media_type S* [ AND S* expression ]*
 | expression [ AND S* expression ]*
 ;
expression
 : '(' S* media_feature S* [ ':' S* expr ]? ')' S*
 ;
```

* s* : 공백
* **'a'**: a
* **[ a ]** : a가 나올 수도 있고 나오지 않을 수도 있습니다.
* **a | b** : a 또는 b 둘 중에 하나를 선택합니다.
  "|"는 파이프 라인 기호로 키보드의 역슬래시(\) 키를 Shift 키를 누른 채로 누르면 나옵니다.
* **a?** : a가 0번 나오거나 1번만 나올 수 있음
* **a\*** : a가 0번 나오거나 그 이상 계속 나올 수 있음
* **media_type** : all, screen, print 등 명세에 정의된 미디어 타입
* **media_feature** : width, orientation 등 명세에 정의된 미디어 특성

<해석>

* media_query_list : 여러개의 미디어 쿼리로 이루어진 리스트로 작성 가능하며, 쉼표를 이용해서 구분
* media_query
  * A 형태 - 미디어 타입에 and 키워드를 이용해서 미디어 표현식을 붙임, 미디어 타잎 앞에는 only 또는 not 키워드가 올 수 있음, 미디어 타입 단독으로 사용 가능.
  * B 형태 - 미디어 타입 없이 미디어 표현식이 바로 나옴(미디어 타입이 명시되지 않으면 all로 간주). 미디어 표현식은 and 키워드를 이용해서 계속붙임

* expression : 미디어 표현식은 괄호로 감싸야 하며, 특성 이름과 해당하는 값으로 구성. 이름과 값은 : 기호로 연결. 값이 없이 특성 이름만으로도 작성 가능.



#### min,max-

접두사를 사용하여 범위를 지정하게 되면 훨씬 간결하게 반응형 사이트를 제작가능



#### 예제 코드

```css
@media screen { ... }
```
미디어 타입이 screen이면 적용

```css
@media screen and (min-width: 768px) { ... }
```
미디어 타입이 screen이고 width가 768px 이상이면 적용

```css
@media (min-width: 768px) and (max-width: 1024px) { ... }
```
and는 연결된 모든 표현식이 참이면 적용

```css
@media (color-index)
```
미디어 장치가 color-index를 지원하면 적용

```css
@media screen and (min-width: 768px), screen and (orientation: portrait), ...
```
쉼표로 연결된 미디어 쿼리 중 하나라도 참이면 적용

```css
@media not screen and (min-width: 768px)
```
not 키워드는 하나의 media_query 전체를 부정
not (screen and (min-width: 768px)) 올바른 해석!
```css
@media not screen and (min-width: 768px), print
```
첫 번째 미디어 쿼리에만 not 키워드가 적용되며, 두 번째 미디어 쿼리(print)에는 영향이 없음